namespace zj {
	/**
	 * tiledMap 副本大地图
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapTiledAdventure extends SceneMapTiledBase {

		private currDunIdx: number;// 当前副本索引,从1开始
		private chapterIdx: number;// 当前副本内小关索引
		private clouds: egret.DisplayObjectContainer[];
		private adventureList: Adventure[];// 副本小岛列表（从1开始）

		private aniManager: SceneAniManager;
		private layerCloud: egret.DisplayObjectContainer;

		private currAdventure: Adventure;

		private currArea: CustomInstanceInfo;
		private maxArea: number = -1;// 当前地图开启的最大小岛id
		private maxChapter: number = -1;// 当前地图开启的最大章节id
		private maxMob: number = -1;// 当前最大关卡bossid

		public constructor() {
			super();
			this.skinName = "resource/skins/adventure/TiledSceneAdventureSkin.exml";
		}

		// 初始化地图层级
		protected initLayers() {
			// 地图里的层列表
			this.layerList = [this["groupSurface"], this["groupUnit"], this["groupTop"], this["groupSky"]];
			let advCount = 20;// Game.PlayerMissionSystem.tableLength(TableInstanceArea.Table());
			this.adventureList = [];
			this.clouds = [this["cloud0"]];
			for (let i = 1; i <= advCount; ++i) {
				this.adventureList[i] = this["adv" + i];
				this.adventureList[i].setInfo(this, i);
				this.unitList.push(this.adventureList[i]);
				this.clouds[i] = this["cloud" + i];
			}
		}
		// 场景进入栈顶
		public onEntryTopScene() {
			super.onEntryTopScene();

			this.initAdventure();

			if (this.aniManager) {
				this.aniManager.onEntryScene();
			}
		}
		// 显示场景
		public onLeaveTopScene() {
			super.onLeaveTopScene();
			SceneManager.adventurePos.setTo(this.player.x, this.player.y);
			if (this.aniManager) {
				this.aniManager.onLeaveScene();
			}
		}

		protected parseMap() {
			super.parseMap();
			this.tiledMap = null;

			this.initPlayer();
			this.initNpc();
			this.initAdventure();

			this.initCloud();

			this.aniManager = new SceneAniManager(this);
			this.aniManager.init();

			this.refreshUnits();
		}

		public getInitPos() {
			if (!SceneManager.adventurePos) {
				let pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
				// pid = Util.randomValue(Math.max(pid - 3, 1), Math.min(pid + 1, 14));
				SceneManager.adventurePos = new egret.Point(this.adventureList[pid].bornX, this.adventureList[pid].bornY);
			}
			return SceneManager.adventurePos;
		}

		public getInitPos1() {

			let pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
			pid = Math.max(Math.floor(Util.randomValue(Math.max(pid - 6, 1), Math.min(pid, 14))), 1);
			let a = new egret.Point(this.adventureList[pid].bornX, this.adventureList[pid].bornY);

			return a;
		}

		public checkBlock() {
			let data: number[][] = this.getBlockAstar();
			let x = Math.floor(this.player.x / this.tileW);
			let y = Math.floor(this.player.y / this.tileH);
			return data[x][y] == 1;
		}


		protected initNpc() {
			let info: message.IIKVPairs[] = Game.PlayerInstanceSystem.InstanceInfo.activityRandMobs;
 			for (let i = 0; i < info.length; i++) {
				let Npc = new SceneSceneNpc(this, info[i]);
				Npc.setSceneInfo();
				let pos = this.getInitPos1();
				Npc.setPos(pos.x, pos.y);
				this.addUnit(Npc);
				this.updateMapPoint(Npc.x, Npc.y);
				this.Npcs.push(Npc);
			}
		}

		protected initPlayer() {
			this.player = new SceneMapPlayer(this);
			let scenePosInfo = SceneManager.scenePosInfo;//Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
			let dir = TableEnum.TableEnumDir.Dir_Right;
			this.player.setSceneInfo(scenePosInfo);
			let pos = this.getInitPos();
			this.player.setPos(pos.x, pos.y);
			this.addUnit(this.player);
			this.updateMapPoint(this.player.x, this.player.y);
		}

		protected initLayer(v: tiled.TMXLayer) {
			let lName = v.name;
			// if (lName.indexOf(TILEDMAP_KEY.surface) >= 0) {
			// } else 
			if (lName.indexOf(TILEDMAP_KEY.block) >= 0) {
				this.initBlock(v);
			} else if (lName.indexOf(TILEDMAP_KEY.objects) >= 0) {
				this.initObjects(v);
			}
		}

		private initBlock(layer: tiled.TMXLayer) {
			this.blocks = [];
			this.blockAstar = [];
			let layerData: tiled.TMXTile[][] = layer.layerData;
			let rows = layerData.length;
			let cols = layerData[0].length;
			let temp: tiled.TMXTile = null;
			let result: number[] = [];
			for (let i = 0; i < rows; ++i) {
				this.blocks[i] = [];
				this.blockAstar[i] = [];
				for (let j = 0; j < cols; ++j) {
					temp = layerData[i][j];
					if (temp) {
						this.addBlock(temp.tileX, temp.tileY, Number(temp.gid - temp.tileset.firstgid));
					} else {
						this.addBlock(i, j, -1);
					}
				}
			}
		}

		private initObjects(layer: tiled.TMXLayer) {
			let layerData: tiled.TMXTile[][] = layer.layerData;
			let ab: tiled.TMXObjectGroup = this.tiledMap.getObjects()[0];
			let objects = ab["_childrens"];
			let len = objects.length;
			for (let i = 0; i < len; i++) {
				let dict = objects[i].attributes;
				switch (dict["name"]) {
					case TILEDMAP_KEY.born:
						let idx = Number(dict["type"]);
						let item = this.adventureList[idx];
						if (item) {
							item.setBorn(Math.floor(Number(dict["x"]) + this.tileW / 2), Math.floor(Number(dict["y"]) + this.tileH / 2))
						}
						break;
				}
			}
		}
		private addBlock(tileX, tileY, type) {
			this.blocks[tileX][tileY] = type;
		}
		private addBlockRect(rect: MapRect) {
			let leftIdx = Math.max(0, Math.floor(rect.left / this.tileW));
			let upIdx = Math.max(0, Math.floor(rect.top / this.tileH));
			let rightIdx = Math.min(this.tileCountW, Math.floor(rect.right / this.tileW) + 1);
			let bottomIdx = Math.min(this.tileCountH, Math.floor(rect.bottom / this.tileH) + 1);
			let x;
			let y;
			let tx = this.tileW;
			let ty = this.tileH;
			for (let i = upIdx; i < bottomIdx; ++i) {
				for (let j = leftIdx; j < rightIdx; ++j) {
					x = (j + 0.5) * tx;
					y = (i + 0.5) * ty;
					if (rect.isInPoint(x, y)) {
						this.addBlock(j, i, 0);
					}
				}
			}
		}

		public setCurrAdventure(adven: Adventure) {
			this.clearCurrAdventure();
			this.currAdventure = adven;
			if (adven) {
				this.currAdventure.setTouch();
			}
		}
		public clearCurrAdventure() {
			if (this.currAdventure) {
				this.currAdventure.clearTouch();
				this.currAdventure = null;
			}
		}

		private onTouchAdventure() {
			this.setPlayerMove(this.currAdventure.bornX, this.currAdventure.bornY);
		}
		/**
		 * 单位移动中调用
		 */
		public playerMove(unit: egret.DisplayObjectContainer, offx: number, offy: number) {
			super.playerMove(unit, offx, offy);
			if (this.isMapPlayerFollow) {
				this.updateMapPoint(unit.x, unit.y, false);
			}
		}
		/**
		 * 单位移动结束
		 */
		public playerMoveFinish(unit: egret.DisplayObjectContainer) {
			if (this.currAdventure && unit == this.player) {
				(this.sceneUI as SceneMapTiledAdventureUI).showAdventureInfo(this.currAdventure.data);
			}
		}
		/**
		 * 检测是否有碰撞
		 * 下一关的区域也可以走
		 */
		protected isBlockTiledIdx(idxw: number, idxh: number): boolean {
			let type = this.blocks[idxw][idxh];
			if (type == 0 || type > SceneManager.adventureOpenMax) {
				return true;
			}
			if (type > 0) {
				return !this.isOpen(type - 1);
			}
			return false;
		}
		/**
		 * 地图状态改为拖动
		 */
		protected setMapMoveTouch() {
			super.setMapMoveTouch();
			// this.player.setStand();// 地图拖动时角色停止移动
		}

		private getMaxAreaId() {
			return Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
			// return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
		}

		private getMaxEliteId() {
			return Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
			// return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID;
		}

		private initAdventure() {
			let maxId = this.getMaxAreaId();
			let maxEliteId = this.getMaxEliteId();
			let datas = TableInstanceArea.Table();// 表，一共20个小岛
			let list = this.adventureList;
			let temp: Adventure = null;
			for (let id in list) {
				temp = list[id];
				if (datas[id] && temp.id <= SceneManager.adventureOpenMax) {
					temp.setData(datas[id]);
					temp.setMaxArea(maxId);
					temp.setMaxElite(maxEliteId);
				} else {
					temp.visible = false;
				}
			}
		}

		private initCloud() {
			let maxId = this.getMaxAreaId();
			let datas = TableInstanceArea.Table();// 表，一共20个小岛
			let temp: TableInstanceArea = null;
			for (let id in datas) {
				temp = datas[id];
				if (temp.area_id <= maxId + 1 && temp.area_id <= SceneManager.adventureOpenMax) {
					this.clouds[id].visible = false;
				} else {
					this.clouds[id].visible = true;
				}
			}
		}
		/**
		 * 移动地图到指定小岛
		 * areaId： 小岛id
		 */
		public moveMapToArea(areaId: number, callback: Function, thisObj) {
			let adv = this.adventureList[areaId];
			if (adv) {
				let self = this;
				let [x, y] = this.getMapPosToCenter(adv.x, adv.y);
				this.mapX = x;
				this.mapY = y;
				let tw = egret.Tween.get(this.layerMap);
				tw.to({ x: -x, y: -y }, 400);
				tw.call(() => {
					egret.Tween.removeTweens(this.layerMap);
					if (callback) {
						callback.call(thisObj);
					}
				}, self);
			}
		}

		private openAnimaFinish() {
			this.isOpenAniRun = false;
			// if (Teach.m_bOpenTeach && !Teach.isDone(8005)) Teach.SetTeachPart(8005);
			Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
		}

		public openAnimation(openArea: boolean, openElit: boolean) {
			this.isOpenAniRun = openArea || openElit;
			this.isMapPlayerFollow = false;
			if (openArea) {
				if (openElit) {
					this.openAniArea(this.openAniElit, this);
				} else {
					this.openAniArea(this.openAnimaFinish, this);
				}
			} else if (openElit) {
				this.openAniElit();
			}
		}

		private openAniArea(callback = null, objThis: any = null) {
			(this.sceneUI as SceneMapTiledAdventureUI).setCanTouch(false);
			let maxId = this.getMaxAreaId();
			let adv = this.adventureList[maxId];
			if (adv) {
				let self = this;
				this.moveMapToArea(maxId, () => {
					self.startAni(adv, 1, () => {
						(this.sceneUI as SceneMapTiledAdventureUI).setCanTouch(true);
						if (callback && objThis) {
							callback.call(objThis);
						}
					}, self);
				}, this);
			}
			let nextMobId = maxId + 1;
			let max = Math.min(SceneManager.adventureOpenMax + 1, this.clouds.length);
			if (nextMobId < max) {
				let cloud = this.clouds[nextMobId];
				let adv = this.adventureList[nextMobId];
				if (cloud && cloud.visible && adv) {
					let tw = egret.Tween.get(cloud);
					tw.to({ alpha: 0 }, 400);
					tw.call(() => {
						egret.Tween.removeTweens(cloud);
						cloud.visible = false;
						adv.setMaxArea(maxId);
					}, this);
				}
			}
		}

		private openAniElit() {
			(this.sceneUI as SceneMapTiledAdventureUI).setCanTouch(false);
			let maxEliteId = this.getMaxEliteId();
			// 关闭上一个小岛的图标
			if (maxEliteId > 1) {
				let advLast = this.adventureList[maxEliteId - 1];
				if (advLast) {
					advLast.setMaxElite(maxEliteId);
				}
			}
			// 开启新小岛的图标
			let adv = this.adventureList[maxEliteId];
			if (adv) {
				let self = this;
				this.moveMapToArea(maxEliteId, () => {
					self.startAni(adv, 2, () => {
						adv.setMaxElite(maxEliteId);
						(this.sceneUI as SceneMapTiledAdventureUI).setCanTouch(true);
						this.openAnimaFinish();
					}, self);
				}, this);
			}
		}

		private startAni(adv: Adventure, type, callback, thisobj) {
			let x = adv.getAniX();
			let y = adv.getAniY();
			let ui = newUI(AdventureOpenAni);
			ui.x = x - ui.width / 2;
			ui.y = y - ui.height / 2;
			this.layerList[LAYER_TYPE.top].addChild(ui);
			ui.startAni(type, adv.data, callback, thisobj);
		}

		private isOpen(idx: number) {
			return (this.sceneUI as SceneMapTiledAdventureUI).isOpen(idx);
		}
		/**
		 * 地图被移出屏幕时调用
		 */
		protected onRemoveFromStage() {
			super.onRemoveFromStage();
			if (this.aniManager) {
				this.aniManager.release();
				this.aniManager = null;
			}
		}
		/**
		 * 获取副本对象
		 */
		private getTouchAdventure(x: number, y: number): Adventure {
			let list = this.adventureList;
			for (let i = list.length - 1; i >= 0; --i) {
				if (list[i] && this.isOpen(list[i].id) && list[i].isTouch(x, y)) {
					return list[i];
				}
			}
			return null;
		}
		/**
		 * id:小岛id（从1开始）
		 */
		public getAdventureById(id: number) {
			return this.adventureList[id];
		}

		protected touchBegan(touchUIX: number, touchUIY: number, touchMapX: number, touchMapY: number) {
			this.clearCurrAdventure();
			this.isMapPlayerFollow = false;
			let adven: Adventure = this.getTouchAdventure(touchMapX, touchMapY);
			if (adven) {
				this.setCurrAdventure(adven);
			}
			super.touchBegan(touchUIX, touchUIY, touchMapX, touchMapY);
		}
		protected touchMoved(touchUIX: number, touchUIY: number) {
			if (this.currAdventure) {
				return;
			}
			super.touchMoved(touchUIX, touchUIY);
		}

		protected touchEnded(touchUIX: number, touchUIY: number, touchMapX: number, touchMapY: number) {
			if (this.currAdventure) {
				let adven: Adventure = this.getTouchAdventure(touchMapX, touchMapY);
				if (this.currAdventure == adven) {
					this.currAdventure.clearTouch();
					this.onTouchAdventure();
				} else {
					this.clearCurrAdventure();
				}
				return;
			}
			super.touchEnded(touchUIX, touchUIY, touchMapX, touchMapY);
		}
		public Update(tick) {
			super.Update(tick);
			if (this.aniManager) {
				this.aniManager.Update(tick);
			}
		}
	}
}