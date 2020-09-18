namespace zj {
	/**RPG类，继承场景类 */
	export class StageSceneRpg extends StageScene {
		public constructor() {
			super();
			this.loadSpxTbl();
		}
		public bShake = false;
		public shakeId = 0;
		public shakeMaxFrame = 0
		public shakeFrame = 0
		public isShakePlusX = false;
		public isShakePlusY = false;
		public shakeOrignX = 0
		public shakeOrignY = 0

		public tableEffects = [];
		public cacheMembers = {}

		public bPosFinished = false

		public map: egret.Sprite = null;
		// public mapBlockLayer:tiled.TMXLayer = null;
		// public spriteBlocks  = []
		public blocks = {}

		public tableMapCells = {}
		public tableNpcs = {}
		public tableBuilds = {}
		public tableMembers = {}
		public tableMemberPets = {}
		public tableTrees = {}
		public willDelMobs = {}
		public tableBosses = {};

		public screenMoveDistanceX = 0
		public screenMoveDistanceY = 0;

		public nodeUp;
		public playerLeader;
		public mainMenu;
		public sceneType;
		public playerLeaderPet;
		public Block_Width;
		public idMap;
		public nodeRole;


		public box;
		public release() {
			Game.EventManager.off(GameEvent.LOOK_OTHER_PLAYER, this.checkPlayerVisible, this);
			super.release();
			for (let k in this.cacheMembers) {
				let v = this.cacheMembers[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.cacheMembers = {};

			for (let k in this.tableMapCells) {
				let v = this.tableMapCells[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableMapCells = {};

			for (let k in this.tableNpcs) {
				let v = this.tableNpcs[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableNpcs = {};

			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableBuilds = {};

			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableMembers = {};

			for (let k in this.tableMemberPets) {
				let v = this.tableMemberPets[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableMemberPets = {};

			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableTrees = {};

			this.tableTrees = {};
			this.willDelMobs = {};
			if (this.playerLeader) {
				this.playerLeader.release();
				this.playerLeader = null;
			}
			if (this.playerLeaderPet) {
				this.playerLeaderPet.release();
				this.playerLeaderPet = null;
			}
		}
		public Init() {
			Gmgr.Instance.bWillGoRpg = false;
			Game.EventManager.on(GameEvent.LOOK_OTHER_PLAYER, this.checkPlayerVisible, this);
		}
		public checkPlayerVisible() {
			let isLook = Game.PlayerInfoSystem.getIsLookOtherPlayer() && Game.PlayerInfoSystem.IsAgreeEnter;
			for (let k in this.tableMembers) {
				this.tableMembers[k].setPlayerVisible(isLook);
			}
			for (let k in this.tableMemberPets) {
				this.tableMemberPets[k].setPlayerVisible(isLook);
			}
		}
		public Update(tick) {
			this.playerDepth();
		}
		public playerDepth() {
			let arr = [];
			if (this.playerLeader) {
				arr.push(this.playerLeader);
			}
			if (this.playerLeaderPet) {
				arr.push(this.playerLeaderPet);
			}
			for (let k in this.tableTrees) {
				if (this.tableTrees[k]) {
					arr.push(this.tableTrees[k]);
				}
			}
			for (let k in this.tableMembers) {
				if (this.tableMembers[k]) {
					arr.push(this.tableMembers[k]);
				}
			}
			for (let k in this.tableNpcs) {
				if (this.tableNpcs[k]) {
					arr.push(this.tableNpcs[k]);
				}
			}
			for (let k in this.tableMemberPets) {
				if (this.tableMemberPets[k]) {
					arr.push(this.tableMemberPets[k]);
				}
			}
			for (let k in this.tableBosses) {
				if (this.tableBosses[k]) {
					arr.push(this.tableBosses[k]);
				}
			}
			arr.sort((a, b) => {
				return a.y - b.y;//更改显示列表顺序
			});
			for (let i = 0; i < arr.length; i++) {//重新显示
				// this.map.addChild(arr[i].nodeRoot);
				this.map.setChildIndex(arr[i].nodeRoot, i);
			}
		}
		public getEffectLayer(role) {
			return this.nodeUp;
		}
		public isCanPushWarUi() {
			//有问题
			let tag = true;
			// local mm = GetUIByName("League_WarPop")
			// if mm ~= nil then
			// 	tag = false
			// end
			// local nn = GetUIByName("League_WarDie")
			// if nn ~= nil then
			// 	tag = false
			// end

			// local xx = GetUIByName("League_WarEndPop")
			// if xx ~= nil then
			// 	tag = false
			// end
			return tag;
		}
		public atkNoticeResult() {
			let key = Game.PlayerWonderLandSystem.resultInfo["rightRoleBase"].id;
			this.pushLeague_WarPop();
			if (this.tableMembers[key] != null) {
				this.startFight(this.playerLeader, this.tableMembers[key], true, this.mainMenu.BattleCB, null);
			}
		}
		public beAtkNoticeResult() {
			let key = Game.PlayerWonderLandSystem.resultInfo["rightRoleBase"].id;
			this.pushLeague_WarPop();
			if (this.tableMembers[key] != null) {
				this.startFight(this.tableMembers[key], this.playerLeader, false, null, null);
			}
		}
		public pushLeague_WarPop() {
			Device.fastBattleSwitch = Device.GetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch);
			if (Device.fastBattleSwitch == null) Device.fastBattleSwitch = false;
			if (Device.fastBattleSwitch) {
				if (this.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
					this.DarklandFastAward();
				} else {
					this.WonderlandFastAward();
				}
				return;
			}
			if (this.mainMenu == null) {
				return;
			}
			//有问题
			// local mm = GetUIByName("HXH_PayMall") --若在充值界面则什么也不做
			// if mm ~= nil then
			// 	return
			// end
			// local xx = GetUIByName("HXH_ExchangeMain") --若在充值界面则什么也不做
			// if xx ~= nil then
			// 	return
			// end
			// local xx = GetUIByName("HXH_MoraMain") --若在充值界面则什么也不做
			// if xx ~= nil then
			// 	return
			// end
			// local xx = GetUIByName("HXH_FishingMain") --若在充值界面则什么也不做
			// if xx ~= nil then
			// 	return
			// end
			// local nn = GetUIByName("League_WarEndPop")--帮战结束不再结算
			// if nn ~= nil then
			// 	return
			// end
			// PopUIUntil(self.mainMenu:GetUIName())
			// PushUI("League_WarPop"):PlayLastReport()
			// GameCommon:EventLockUI(false)
			loadUI(LeagueWarPop)
				.then((dialog: LeagueWarPop) => {
					dialog.show();
					dialog.PlayLastReport();
				})
		}
		public WonderlandFastAward() {
			//有问题
			if (Game.PlayerWonderLandSystem.resultInfo["battleType"] == message.EFormationType.FORMATION_TYPE_WONDERLAND) {

			}
		}
		public DarklandFastAward() {
			//有问题
		}
		public memberNoticeResult(left_key, right_key) {
			if (right_key == Game.PlayerInfoSystem.RoleID) {
				return;
			}
			if (this.tableMembers[right_key] == null) {
				return;
			}
			this.startFight(this.tableMembers[left_key], this.tableMembers[right_key], false, null, null);
		}
		public startFight(left, right, datum, leftCB, rightCB) {
			let [atk_x, atk_y] = left.getPos();
			let atk_dir = left.getDir();

			let [beAtk_x, beAtk_y] = right.getPos();
			let beAtk_dir = right.getDir();
			//障碍物的问题后续再处理吧。
			if (datum == true) {
				if (atk_x >= beAtk_x) {
					let tmp = atk_x;
					atk_dir = TableEnum.TableEnumDir.Dir_Left;
					beAtk_x = tmp - 200
					beAtk_y = atk_y
					beAtk_dir = TableEnum.TableEnumDir.Dir_Right;
				}
				if (atk_x < beAtk_x) {
					let tmp = atk_x;
					atk_dir = TableEnum.TableEnumDir.Dir_Right;
					beAtk_x = tmp + 200
					beAtk_y = atk_y
					beAtk_dir = TableEnum.TableEnumDir.Dir_Left;
				}
			} else {
				if (beAtk_x >= atk_x) {
					let tmp = beAtk_x;
					beAtk_dir = TableEnum.TableEnumDir.Dir_Left;
					atk_x = tmp - 200
					atk_y = beAtk_y
					atk_dir = TableEnum.TableEnumDir.Dir_Right;
				}
				if (beAtk_x < atk_x) {
					let tmp = beAtk_x;
					beAtk_dir = TableEnum.TableEnumDir.Dir_Right;
					atk_x = tmp + 200
					atk_y = beAtk_y
					atk_dir = TableEnum.TableEnumDir.Dir_Left;
				}
			}
			left.changeFightShowAtk(atk_dir, atk_x, atk_y, leftCB);
			right.changeFightShowBeAtk(beAtk_dir, beAtk_x, beAtk_y, rightCB);
		}
		public proofLeaderPos(posItem) {
			if (this.playerLeader == null) {
				return;
			}
			let dir_x = yuan3(posItem.scene_x - this.playerLeader.moveDistance > 0, 1, -1);
			let dir_y = yuan3(posItem.scene_y - this.playerLeader.verDistance > 0, 1, -1);

			let dis_x = Math.abs(posItem.scene_x - this.playerLeader.moveDistance);
			let dis_y = Math.abs(posItem.scene_y - this.playerLeader.verDistance);
			// dis_y = 864

			function move_x(x, w, thisobj) {
				let a_div = x / w;
				let a_mod = x % w;
				for (let i = 1; i < a_div; i++) {
					thisobj.playerLeader.moveMap(dir_x * w, 0);
				}
				return a_mod;
			}
			function move_y(y, h, thisobj) {
				let a_div = y / h;
				let a_mod = y % h;
				for (let i = 1; i < a_div; i++) {
					thisobj.playerLeader.moveMap(0, dir_y * h);
				}
				return a_mod;
			}
			if (dis_x > Device.screenWidth / 2) {
				let mod = move_x(dis_x - Device.screenWidth / 2, Device.screenWidth / 2, this);
				dis_x = Device.screenWidth / 2 + mod;
			}
			let x_mod = move_x(dis_x, 320, this);
			this.playerLeader.moveMap(dir_x * x_mod, 0);
			if (dis_y > Device.screenHeight / 10) {
				let mod = move_y(dis_y - Device.screenHeight / 10, Device.screenHeight / 10, this);
				dis_y = Device.screenHeight / 10 + mod;
			}
			let y_mod = move_y(dis_y, 320, this);
			this.playerLeader.moveMap(0, dir_y * y_mod);

			this.playerLeader.setPos(this.playerLeader.x, this.playerLeader.y);

			if (this.playerLeaderPet != null) {
				this.playerLeaderPet.setFirstPetPos();
			}
		}
		public isCanLeaveScene() {
			let tag = true;
			let code = -1;
			if (this.playerLeader.bProgressing == true) {
				tag = false;
				//code = yuan3(this.sceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR, 1, 2);
			} else {
				if (this.playerLeader.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
					tag = false;
					code = 3;
				}
			}
			return [tag, code];
		}
		public proofTime() {
			// if (Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID]) {
			// 	// let date = new Date();
			// 	let difTime = egret.getTimer() - Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID]//date.getTime() - Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID];
			// 	if (difTime <= 0) {
			// 		difTime = 0;
			// 	}
			// 	let _tick = difTime / 1000;
			// 	this.playerLeader.Update(_tick);
			// }
			this.proofMemberTime();
		}
		public proofMemberTime() {
			// for (let k in this.tableMembers) {
			// 	let v = this.tableMembers[k];
			// 	if (Game.PlayerWonderLandSystem.joinTimeInfo[k] != null) {
			// 		let difTime = egret.getTimer() - Game.PlayerWonderLandSystem.joinTimeInfo[k];
			// 		if (difTime <= 0) {
			// 			difTime = 0;
			// 		}
			// 		let _tick = difTime / 1000;
			// 		v.Update(_tick);
			// 	}
			// }
		}
		public proofMobPos(map_x, map_y) {
			if (Game.PlayerWonderLandSystem.wonderlandId == 4) {
				let x = map_x;
				let y = map_y;
				let i = Math.floor((map_x - this.Block_Width) / this.Block_Width);
				let j = Math.floor((map_y - this.Block_Width) / this.Block_Width);
				let key = Helper.StringFormat("%d_%d", i, j);
				if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
					x = map_x - this.Block_Width;
					y = map_y - this.Block_Width;
				}
				return [x, y];
			} else {
				let i = Math.floor(map_x / this.Block_Width);
				let j = Math.floor(map_y / this.Block_Width);
				let key_src = Helper.StringFormat("%d_%d", i, j);
				if (this.blocks[key_src] != null && this.blocks[key_src].couldCross == true) {
					return [map_x, map_y];
				} else {
					// let x = map_x;
					// let y = map_y;
					// while (true) {
					// 	let radio_x = getRandom(-2, 2);
					// 	let radio_y = getRandom(-1, 1);
					// 	x = map_x + radio_x * this.Block_Width;
					// 	y = map_y + radio_y * this.Block_Width;
					// 	let i = x / this.Block_Width;
					// 	let j = y / this.Block_Width;
					// 	let key = Helper.StringFormat("%d_%d", i, j);
					// 	if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
					// 		break;
					// 	}
					// }
					// return [x, y];
					return this.getInitPos(map_x, map_y);
				}
			}
		}

		private getInitPos(map_x, map_y){
			map_y = Math.abs(map_y);
			let y = map_y;
			let n = Math.floor(map_x / this.Block_Width);
			for(let i = 1; i <= 22; ++i){
				let p = Math.floor(y / this.Block_Width);
				let key = Helper.StringFormat("%d_%d", n, p);
				if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
					return [map_x, y];
				}
				y += this.Block_Width;
			}
			return [map_x, map_y];
		}

		public preLoad1() {

		}
		public preLoad2() {

		}
		public preLoadSpxBody(tbl) {

		}
		public ICONTYPE = { NORMAL: 1, HIGH: 2 }
		public loadSpxTbl() {
			this.idMap = {};
			//主角
			let picIds_normal = Game.PlayerWonderLandSystem.GetNormalPic(1);
			this.idMap[this.ICONTYPE.NORMAL] = picIds_normal;
			let picIds_high = Game.PlayerWonderLandSystem.GetHighPic();
			//高级头像
			this.idMap[this.ICONTYPE.HIGH] = picIds_high;
		}
		public isTouchUiEnabled() {
			let tag = true;
			if (this.playerLeader == null || this.playerLeader.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
				tag = false;
			}
			return tag;
		}
		public procEffects(tick) {
			let i = 0;
			while (i < this.tableEffects.length) {
				this.tableEffects[i].update(tick);
				i = i + 1;
			}
			i = 0;
			while (i < this.tableEffects.length) {
				let tEffect = this.tableEffects[i];
				let bFinish = tEffect.getIsFinish();
				if (bFinish == true) {
					CC_SAFE_DELETE(tEffect);
					this.tableEffects.splice(i, 1);
				} else {
					i = i + 1;
				}
			}
		}
		public addEffect(effect) {
			this.tableEffects.push(effect);
		}
		public clearAllEffects() {
			let i = 0;
			while (i < this.tableEffects.length) {
				CC_SAFE_DELETE(this.tableEffects[i]);
				this.tableEffects.splice(i, 1);
			}
		}
		public ComputeMapXY(base_x, base_y) {
			let maxMoveX = this.mapWidth - Device.screenWidth;
			let maxMoveY = this.mapHeight - Device.screenHeight;
			let minMoveX = 0;
			let minMoveY = 0;
			let moveX = 0;
			let moveY = 0;
			if (this.screenMoveDistanceX + base_x > maxMoveX) {
				moveX = maxMoveX - this.screenMoveDistanceX;
			} else if (this.screenMoveDistanceX + base_x < minMoveX) {
				moveX = minMoveX - this.screenMoveDistanceX;
			} else {
				moveX = base_x;
			}
			let b = this.screenMoveDistanceY;
			if (this.screenMoveDistanceY + base_y > maxMoveY) {
				moveY = maxMoveY - this.screenMoveDistanceY;
			} else if (this.screenMoveDistanceY + base_y < minMoveY) {
				moveY = minMoveY - this.screenMoveDistanceY;
			} else {
				moveY = base_y;
			}
			moveX = Math.floor(moveX * 100) / 100;
			moveY = Math.floor(moveY * 100) / 100;
			this.screenMoveDistanceX = this.screenMoveDistanceX + moveX;
			this.screenMoveDistanceY = this.screenMoveDistanceY + moveY;
			return [moveX, moveY];
		}
		public UpdateMap(moveX, moveY) {
			super.UpdateMap(moveX, moveY);
			this.updateMapEffects(moveX, moveY);
			this.updateBlockChilden(moveX, moveY);
			this.updateMapBuildings(moveX, moveY);
			this.updateMapMember(moveX, moveY);
			this.updateMapTrees(moveX, moveY);
			this.updateMapCells(moveX, moveY);
			this.updataBox(moveX, moveY);
		}
		public updataBox(base_x, base_y) {
			this.box.x = this.box.x - base_x;
			this.box.y = this.box.y - base_y;
		}
		public updateMapEffects(base_x, base_y) {
			for (let i = 0; i < this.tableEffects.length; i++) {
				let v = this.tableEffects[i];
				let [x, y] = v.getPos();
				v.setPos(x - base_x, y - base_y);
			}
		}
		public startShake(id) {
			if (GlobalBattleConfig.shake == false) {
				return;
			}
			this.nodeContainer.x = this.shakeOrignX;
			this.nodeContainer.y = this.shakeOrignY;
			function rand() {
				if (TsMtirand() % 2 == 1) {
					return true;
				} else {
					return false;
				}
			}
			this.bShake = true;
			this.shakeId = id;
			this.shakeFrame = 0;
			this.isShakePlusX = rand();
			this.isShakePlusY = rand();
			let tableShake = TableClientSkillShake.Table();
			this.shakeMaxFrame = tableShake[this.shakeId].screen_shake_frame;
		}
		public updateShake(tick) {
			if (this.bShake == false) {
				return;
			}
			if (this.shakeFrame >= this.shakeMaxFrame) {
				this.bShake = false;
				this.shakeFrame = 0;
				this.shakeId = -1;
				this.nodeContainer.x = this.shakeOrignX;
				this.nodeContainer.y = this.shakeOrignY;
			} else {
				let tableShake = TableClientSkillShake.Table();
				this.isShakePlusX = turnBool(this.isShakePlusX);
				this.isShakePlusY = turnBool(this.isShakePlusY);
				let randX = 0;
				let randY = 0;
				let maxX = tableShake[this.shakeId].range_x[1];
				let minX = tableShake[this.shakeId].range_x[0];
				let maxY = tableShake[this.shakeId].range_y[1];
				let minY = tableShake[this.shakeId].range_y[0];
				if (maxX == 0 && minX == 0) {
					randX = 0;
				} else if (maxX == minX) {
					randX = minX;
				} else {
					randX = minX + TsMtirand() % (maxX - minX);
				}
				if (randX > 10 || randX < 0) {
					randX = 0;
				}
				if (maxY == 0 && minY == 0) {
					randY = 0;
				} else if (maxY == minY) {
					randY = minY;
				} else {
					randY = minY + TsMtirand() % (maxY - minY);
				}
				if (randY > 10 || randY < 0) {
					randY = 0;
				}
				this.nodeContainer.x = this.shakeOrignX + yuan3(this.isShakePlusX, randX, -randX);
				this.nodeContainer.y = this.shakeOrignY + yuan3(this.isShakePlusY, randY, -randY);
				this.shakeFrame = this.shakeFrame + tick * 1000;
			}
		}
		public initTmx() {

			this.box = new eui.Group();
			this.nodeRole.addChild(this.box);
			let mapdata: egret.XML = MapSceneLoading.getInstance().data;
			//当前地图整个地图格子数据
			let currmapdata = mapdata.attributes;
			let mapArr = [];
			for (let i = 0; i < mapdata.children.length; i++) {
				let currxml: any = mapdata.children[i];
				if (currxml.$name == "block") {
					mapArr = currxml.children[0].children.concat();
				}
			}
			this.MapBlockW = parseInt(currmapdata.width) * parseInt(currmapdata.tilewidth);
			this.MapBlockH = parseInt(currmapdata.height) * parseInt(currmapdata.tilewidth);
			this.Block_Width = parseInt(currmapdata.tilewidth);
			let hor = this.MapBlockW / this.Block_Width;
			let ver = this.MapBlockH / this.Block_Width;
			/*初始化地图*/
			this.map = new egret.Sprite();
			this.map.name = "map";
			/*将地图添加到显示列表*/
			this.nodeRole.addChild(this.map);
			for (let i = 0; i < ver; i++) {
				for (let j = 0; j < hor; j++) {
					let node = mapArr[0];
					let block = {};
					block["w"] = j;
					block["h"] = i;
					block["pos"] = new egret.Point((j) * this.Block_Width + this.Block_Width / 2, (i) * this.Block_Width + this.Block_Width / 2);
					if (node.$gid == "1") {
						block["couldCross"] = false;
					} else {
						block["couldCross"] = true;
					}
					let key = Helper.StringFormat("%d_%d", block["w"], block["h"]);
					this.blocks[key] = block;
					mapArr.splice(0, 1);
				}
			}
		}
		/**绘制地图格子数据 */
		public drawBox() {
			let hor = this.MapBlockW / this.Block_Width;
			let ver = this.MapBlockH / this.Block_Width;

			for (let i = 0; i < hor; i++) {
				for (let j = 0; j < ver; j++) {
					let key = Helper.StringFormat("%d_%d", i, j);
					let sprite = this.blocks[i + "_" + j];
					let block = {};
					block["w"] = i;
					block["h"] = j;
					block["pos"] = new egret.Point((i) * this.Block_Width + this.Block_Width / 2, (j) * this.Block_Width + this.Block_Width / 2);

					let leftCage: egret.Sprite = new egret.Sprite();
					this.box.addChild(leftCage);
					if (sprite.couldCross == true) {
						leftCage.graphics.beginFill(0x00ff00, 0.1);
					} else {
						leftCage.graphics.beginFill(0xff0000, 0.1);
					}


					leftCage.graphics.drawRect(0, 0, 80, 80);

					leftCage.graphics.lineStyle(1, 0xffffff);
					leftCage.graphics.lineTo(0, 0);
					leftCage.graphics.lineTo(80, 0);
					leftCage.graphics.lineTo(80, 80);
					leftCage.graphics.lineTo(0, 80);
					leftCage.graphics.lineTo(0, 0);
					leftCage.graphics.endFill();
					leftCage.x = block["pos"].x = i * 80;
					leftCage.y = block["pos"].y = j * 80;
					let leftTF = new egret.TextField;
					leftTF.size = 20;
					leftTF.textAlign = egret.HorizontalAlign.CENTER;
					leftTF.textColor = 0xffffff;
					leftTF.background = true;
					leftTF.backgroundColor = 0xd71345;
					leftTF.text = i + "," + j;
					leftTF.touchEnabled = true;
					leftCage.addChild(leftTF);
				}
			}

		}
		public loadTmxBlock() {

		}
		public updateBlockChilden(moveX, moveY) {
			// for(let i = 0;i<this.spriteBlocks.length;i++){
			// 	let child = this.spriteBlocks[i];
			// 	let x = child.x;
			// 	let y = child.y;
			// 	child.x = x-moveX;
			// 	child.y = y-moveY;
			// }
		}
		public initCellNode() {

			let layerName = ["far", "mid2", "mid1", "group", "close"];
			for (let k = 0; k < layerName.length; k++) {
				let v = layerName[k];
				if (v == "group") {
					this[v + "_nodeRole"] = this.addChildEx(this[v + "_node_other"], new eui.Group());
					this[v + "_nodeUp"] = this.addChildEx(this[v + "_node_other"], new eui.Group());
					// this[v + "_nodeCheckButton"] = this.addChildEx(this[v + "_node_other"],new eui.Group());

					this.nodeRole = this["group_nodeRole"];
					this.nodeUp = this["group_nodeUp"];
					// this.nodeCheckButton = this["group_nodeCheckButton"];
				}
			}
		}
		public addChildEx(node1, node2) {
			node1.addChild(node2);
			return node2;
		}
		public initBuilds(csvName, sceneId) {
			let tbl = Game.ConfigManager.getTable(csvName + ".json");//table_wonderland_map_block
			let _temp = [];
			for (let k in tbl) {
				let v = tbl[k];
				_temp.push(v);
			}
			_temp.sort((a, b) => {
				return a.build_id - b.build_id;
			});
			for (let i = 0; i < _temp.length; i++) {
				let v = _temp[i];
				if (v.build_type == 5) {//npc
					let key = v.build_id;
					let find = Table.FindFCall(v.show_scene, function (key, value) {
						return sceneId == value;
					}, this);
					if (find) {
						let _cell = new StageRpgNpc(this.map, this.MapBlockH);
						if (_cell) {
							_cell.InitNpc(v, null)
							this.tableMapCells[key] = _cell;
							this.tableNpcs[key] = _cell;
						}
					}
				}
			}
		}
		public initMapBlock() {
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				this.SetBlock(v);
			}
			for (let k in this.tableMapCells) {
				let v = this.tableMapCells[k];
				this.SetBlock(v);
			}
			for (let k in this.tableNpcs) {
				let v = this.tableNpcs[k];
				this.SetBlock(v);
			}
			//    this.drawBox();
		}
		public SetBlock(build) {
			let hor = (build.x + build.info.balk_rt[0]) / this.Block_Width;
			let ver = (build.y + build.info.balk_rt[1]) / this.Block_Width;
			ver = ver - 1;
			let grid_w = build.info.balk_rt[2] / this.Block_Width;
			let grid_h = build.info.balk_rt[3] / this.Block_Width;
			for (let i = hor; i <= hor + grid_w - 1; i++) {
				for (let j = ver; j <= ver + grid_h - 1; j++) {
					i = Math.floor(i);
					j = Math.floor(j);
					let key = Helper.StringFormat("%d_%d", i, j);
					this.blocks[key].couldCross = false;
				}
			}
		}
		public ClearBlock(build) {
			let hor = (build.info.build_x + build.info.balk_rt[0]) / this.Block_Width;
			let ver = (PlayerWonderLandSystem.MapHeight - build.info.build_y + build.info.balk_rt[1]) / this.Block_Width;
			let grid_w = build.info.balk_rt[2] / this.Block_Width;
			let grid_h = build.info.balk_rt[3] / this.Block_Width;
			for (let i = hor; i <= hor + grid_w - 1; i++) {
				for (let j = ver; j <= ver + grid_h - 1; j++) {
					i = Math.floor(i);
					j = Math.floor(j);
					let key = Helper.StringFormat("%d_%d", i, j);
					this.blocks[key].couldCross = true;
				}
			}
			Astar.getInstance().clear_cached_paths();
		}
		public SetTreeBlock(tree) {
			let hor = (tree.map_x - tree.info.balk_rt[2] / 1) / this.Block_Width;
			let ver = tree.map_y / this.Block_Width;
			let grid_w = tree.info.balk_rt[2] / this.Block_Width;
			let grid_h = tree.info.balk_rt[3] / this.Block_Width;
			for (let i = hor; i < hor + grid_w - 1; i++) {
				for (let j = ver; j < ver + grid_h - 1; j++) {
					i = Math.floor(i);
					j = Math.floor(j);
					let key = Helper.StringFormat("%d_%d", i, j);
					this.blocks[key].couldCross = false;
				}
			}
		}
		public updateMapBuildings(base_x, base_y) {
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				let [x, y] = v.getPos();
				v.setPos(x - base_x, y - base_y);
			}
		}
		public updateMapMember(base_x, base_y) {
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				let [x, y] = v.getPos();
				v.setPos(x - base_x, y - base_y);
			}
		}
		public updateMapTrees(base_x, base_y) {
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				let [x, y] = v.getPos();
				v.setPos(x - base_x, y - base_y);
			}
		}
		public updateMapCells(base_x, base_y) {
			let layerName = ["far", "mid2", "mid1", "group", "close"];
			for (let k in this.tableMapCells) {
				let v = this.tableMapCells[k];
				let offset = this.mapData[layerName[v.info.block_cell] + "_v"];
				let [x, y] = v.getPos();
				v.setPos(x - base_x * offset[0], y - base_y * offset[1]);
			}
		}
		public updateTrees(tick) {
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				v.Update(tick)
			}
		}
		public updateNpcs(tick) {
			for (let k in this.tableNpcs) {
				let v = this.tableNpcs[k];
				v.Update(tick)
			}
		}
		public updateTreeTrans(tick) {
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				let tran = 1;
				if (v.isExitShelter(this.playerLeader.x, this.playerLeader.y) == true) {
					tran = 1 * 0.6;
				}
				v.setTrans(tran);
			}
		}
	}
}