namespace zj {
	/**
	 * 场景地图基类（单机类型场景地图）
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapBase extends Scene {
		public sceneUI: SceneMapUIBase;

		protected layerMap: egret.DisplayObjectContainer;// 整个地图层
		protected layerList: egret.DisplayObjectContainer[];// 位于地表上层的层列表，地表层，单位层（计算遮挡关系），上层，天空层

		protected mapMovePos: egret.Point;// 地图移动临时变量：移动记录点
		protected isMapMove: boolean;// 地图移动临时变量：地图是否拖动移动
		private isTouchMap: boolean;// 是否触碰地图
		private isLockMap: boolean;// 锁定地图，不可拖动

		protected unitList: egret.DisplayObjectContainer[];// 单位层里的单位列表(排序)

		protected speed: number = 10;// 地图移动速度

		protected mapWidth: number = 0;// 整个地图宽
		protected mapHeight: number = 0;// 整个地图高
		protected mapXMax: number = 0;// 地图移动最大X坐标
		protected mapYMax: number = 0;// 地图移动最大Y坐标

		protected mapX: number = 0;// 地图X坐标
		protected mapY: number = 0;// 地图Y坐标

		protected player: SceneMapPlayer;
		protected Npcs: SceneSceneNpc[] = [];
		protected isMapPlayerFollow: boolean;// 地图是否跟随玩家移动
		public isOpenAniRun: boolean;// 地图开启动画是否正在运行

		public constructor() {
			super();
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
		}
		public show() {
		}
		protected initUI() {
			this.isMapMove = false;
			this.isTouchMap = false;
			this.isLockMap = false;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
			this.mapMovePos = new egret.Point();
		}
		public init(ui: SceneMapUIBase, param: any = null) {
			this.sceneUI = ui;
			this.initUI();
			// 遮挡单位列表
			this.unitList = [];
			// 初始化地图层
			this.initLayers();
		}
		// 初始化地图层级
		protected initLayers() {
			// 整个地图容器
			this.layerMap = new egret.DisplayObjectContainer();
			this.addChildAt(this.layerMap, 0);
			// 地图里的层列表
			this.layerList = [];
			for (let i = 0; i < LAYER_TYPE.max; ++i) {
				let layer = new egret.DisplayObjectContainer();
				this.layerList[i] = layer;
				this.layerMap.addChild(layer);
			}
		}

		protected initPlayer() {
			// 初始化地图角色
		}

		protected onStart(anima?: string) {
			if (this.sceneUI) {
				this.sceneUI.mapLoadFinish(anima);
			} else {
				egret.error("SceneMapBase - onStart - error: sceneUI is null");
			}
		}
		public setLockMap(isLock: boolean) {
			this.isLockMap = isLock;
		}
		public resize() {
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.mapXMax = this.mapWidth - UIManager.StageWidth;
			this.mapYMax = this.mapHeight - UIManager.StageHeight;
			this.updateMapOut();
			this.layerMap.x = -this.mapX;
			this.layerMap.y = -this.mapY;
		}
		public getMapX() {
			return this.mapX;
		}
		public getMapY() {
			return this.mapY;
		}
		public getMapWidth() {
			return this.mapWidth;
		}
		public getMapHeight() {
			return this.mapHeight;
		}
		/**
		 * 获取地图中心点
		 */
		public getMapCenterPos() {
			return [this.mapX + UIManager.StageWidth / 2, this.mapY + UIManager.StageHeight / 2];
		}
		/**
		 * 通过点获得地图坐标
		 */
		public getMapPosToCenter(centerx: number, centery: number) {
			let mapX = centerx - UIManager.StageWidth / 2;
			let mapY = centery - UIManager.StageHeight / 2;
			mapX = mapX > this.mapXMax ? this.mapXMax : mapX;
			mapX = mapX < 0 ? 0 : mapX;
			mapY = mapY > this.mapYMax ? this.mapYMax : mapY;
			mapY = mapY < 0 ? 0 : mapY;
			return [mapX, mapY];
		}
		/**
		 * 更新地图坐标(角色移动时调用,更新地图坐标跟随角色)
		 * cx，cy： 地图中心点坐标
		 * isUpdate: 是否马上更新坐标
		 */
		protected updateMapPoint(cx: number, cy: number, isUpdate: boolean = true) {
			let [x, y] = this.getMapPosToCenter(cx, cy);
			this.mapX = x;
			this.mapY = y;
			if (isUpdate) {
				this.layerMap.x = -this.mapX;
				this.layerMap.y = -this.mapY;
			}
		}
		/**
		 * 检测地图是否出屏幕
		 */
		private updateMapOut() {
			this.mapX = this.mapX > this.mapXMax ? this.mapXMax : this.mapX;
			this.mapX = this.mapX < 0 ? 0 : this.mapX;
			this.mapY = this.mapY > this.mapYMax ? this.mapYMax : this.mapY;
			this.mapY = this.mapY < 0 ? 0 : this.mapY;
		}
		public Update(tick) {
			if (this.player) {
				this.player.Update(tick);
			}
			if (this.Npcs && this.Npcs.length != 0) {
				for (let i = 0; i < this.Npcs.length; i++) {
					if (this.Npcs[i]) {
						this.Npcs[i].Update(tick);
					}
				}
			}
			if (this.layerMap.x != -this.mapX || this.layerMap.y != -this.mapY) {
				let [isFinish, offx, offy] = Util.moveObj(this.layerMap, this.speed, -this.mapX, -this.mapY);
				this.layerMap.x += offx;
				this.layerMap.y += offy;
			}
		}
		public getLayer(type: LAYER_TYPE): egret.DisplayObjectContainer {
			return this.layerList[type];
		}
		/**
		 * 添加元素
		 */
		public addUnit(unit: egret.DisplayObjectContainer) {
			for (let i = 0; i < this.unitList.length; ++i) {
				if (unit.y < this.unitList[i].y) {
					this.unitList.splice(i, 0, unit);
					this.layerList[LAYER_TYPE.unit].addChildAt(unit, i);
					return;
				}
			}
			this.unitList.push(unit);
			this.layerList[LAYER_TYPE.unit].addChild(unit);
		}
		/**
		 * 删除元素
		 */
		public removeUnit(unit: egret.DisplayObjectContainer) {
			let idx = this.unitList.indexOf(unit);
			if (idx >= 0) {
				this.unitList.splice(idx, 1);
			}
			unit.parent.removeChild(unit);
		}
		public refreshUnits() {
			let sort = function (a, b) {
				return a.y - b.y;
			}
			this.unitList.sort(sort);
			let layer = this.layerList[LAYER_TYPE.unit];
			for (let i = 0; i < this.unitList.length; ++i) {
				layer.setChildIndex(this.unitList[i], i);
			}
		}
		public updateUnitY(unit: egret.DisplayObjectContainer, offy: number) {
			let idx = this.unitList.indexOf(unit);
			if (idx >= 0) {
				let temp = null;
				let layer = this.layerList[LAYER_TYPE.unit];
				if (offy > 0) {// 向下移动
					for (let i = idx + 1; i < this.unitList.length; ++i) {
						temp = this.unitList[i];
						if (unit.y >= temp.y) {
							layer.setChildIndex(unit, i);
							this.unitList[i] = unit;
							this.unitList[i - 1] = temp;
						} else {
							break;
						}
					}
					
				} else {// 向上移动
					for (let i = idx - 1; i >= 0; --i) {
						temp = this.unitList[i];
						if (unit.y < temp.y) {
							layer.setChildIndex(unit, i);
							this.unitList[i] = unit;
							this.unitList[i + 1] = temp;
						} else {
							break;
						}
					}
				}
			}
		}

		protected setPlayerMove(x: number, y: number, isMapFollow = true) {
			if (this.player && !this.isBlockPos(x, y)) {
				this.player.setMove([PoolManager.getInstance().getPoint(x, y)]);
				this.isMapPlayerFollow = isMapFollow;
			}
		}
		/**
		 * 单位移动中调用
		 */
		protected playerMove(unit: egret.DisplayObjectContainer, offx: number, offy: number) {
			if (offy != 0) {
				this.updateUnitY(unit, offy);
			}
		}
		/**
		 * 单位移动完成调用
		 */
		public playerMoveFinish(unit) { }

		/**
		 * 检测坐标是否有碰撞
		 */
		protected isBlockPos(x: number, y: number): boolean {
			return x < 0 || x > this.mapWidth || y < 0 || y > this.mapHeight;
		}
		/**
		 * 地图被移出屏幕时调用
		 */
		protected onRemoveFromStage() {
			if (this.player) {
				dragonBonesPool.getInstance().dbArr.push(this.player.body);
				this.player = null;
			}
			for (let i = 0; i < this.Npcs.length; i++) {
				if (this.Npcs[i]) {
					dragonBonesPool.getInstance().dbArr.push(this.Npcs[i].body);
					this.Npcs[i] = null;
				}
			}
			this.Npcs = null;
		}

		private OnTouchBegan(touchs: egret.TouchEvent): void {
			this.touchBegan(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y, touchs.stageX - Game.UIManager.x - this.layerMap.x, touchs.stageY - Game.UIManager.y - this.layerMap.y);
		}
		private OnTouchMoved(touchs: egret.TouchEvent) {
			this.touchMoved(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
		}
		private OnTouchEnded(touchs: egret.TouchEvent) {
			this.touchEnded(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y, touchs.stageX - Game.UIManager.x - this.layerMap.x, touchs.stageY - Game.UIManager.y - this.layerMap.y);
		}
		/**
		 * 地图状态改为拖动
		 */
		protected setMapMoveTouch() {
			this.isMapMove = true;
		}
		protected touchBegan(touchUIX: number, touchUIY: number, touchMapX: number, touchMapY: number): void {
			if (this.isLockMap) {
				return;
			}
			this.isTouchMap = true;
			this.isMapMove = false;
			this.mapX = -this.layerMap.x;
			this.mapY = -this.layerMap.y;
			if (this.mapMovePos) {
				this.mapMovePos.setTo(touchUIX, touchUIY);
			}
		}
		protected touchMoved(touchUIX: number, touchUIY: number) {
			if (this.isLockMap) {
				return;
			}
			if (this.isTouchMap && this.mapMovePos) {
				if (this.isMapMove) {
					this.updateMapDrag(touchUIX, touchUIY);
				} else if (Util.pDisPoint(this.mapMovePos.x, this.mapMovePos.y, touchUIX, touchUIY) > 10) {
					this.mapMovePos.setTo(touchUIX, touchUIY);
					this.setMapMoveTouch();
				}
			}
		}
		protected touchEnded(touchUIX: number, touchUIY: number, touchMapX: number, touchMapY: number) {
			if (this.isLockMap) {
				return;
			}
			if (this.isTouchMap) {
				this.isTouchMap = false;
				if (!this.isMapMove) {
					this.setPlayerMove(touchMapX, touchMapY);
				}
				if (this.isMapMove) {
					this.isMapMove = false;
					this.updateMapDrag(touchUIX, touchUIY);
				}
			}
		}

		protected updateMapDrag(x: number, y: number) {
			let offx = this.mapMovePos.x - x;
			let offy = this.mapMovePos.y - y;
			this.mapMovePos.setTo(x, y);
			this.mapDrag(offx, offy);
		}

		private mapDrag(offx: number, offy: number) {
			this.mapX += offx;
			this.mapY += offy;
			if (offx > 0) {
				this.mapX = this.mapX > this.mapXMax ? this.mapXMax : this.mapX;
			} else {
				this.mapX = this.mapX < 0 ? 0 : this.mapX;
			}
			if (offy > 0) {
				this.mapY = this.mapY > this.mapYMax ? this.mapYMax : this.mapY;
			} else {
				this.mapY = this.mapY < 0 ? 0 : this.mapY;
			}
			this.layerMap.x = -this.mapX;
			this.layerMap.y = -this.mapY;
		}
	}
}