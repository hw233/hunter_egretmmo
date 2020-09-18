namespace zj {
	/**
	 * 移动角色类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapPlayer extends egret.DisplayObjectContainer {
		private owner: any;
		public playerInfo;
		public mapRoleId;
		public name;
		public body: Spx;
		public auraBack: dragonBones.EgretArmatureDisplay;
		public auraFront: dragonBones.EgretArmatureDisplay;
		public actionId;
		public lastDir;
		public speed: number; // 移动速度
		public shadow;// 脚底黑圈
		private state: number;// 0-站立；1-移动
		private toPosList: egret.Point[];// 移动目标X坐标
		private toY: number;// 移动目标Y坐标
		
		public constructor(owner: any) {
			super();
			this.owner = owner;
			this.toPosList = [];
			this.loadSlots();
		}

		public setSceneInfo(scenePosInfo, dir = TableEnum.TableEnumDir.Dir_Right) {
			this.speed = 6;
			this.lastDir = dir;
			this.setPlayerInfo(scenePosInfo.roleBase);
			this.loadBody();
			this.loadAura();
		}

		public setPlayerInfo(playerInfo) {
			this.playerInfo = playerInfo;
			this.name = this.playerInfo.name;
			this.mapRoleId = PlayerVIPSystem.GetMapRoleInfo(this.playerInfo);
		}

		public loadBody() {
			if (this.body) {
				this.body.clearSpine();
				this.body = null;
			}
			let bodySpxId = TableMapRole.Item(this.mapRoleId).body_spx_id;
			if (bodySpxId != -1) {
				let bodyUI = this.owner.sceneUI;
				let scale = 0.4;

				let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);
				Game.DragonBonesManager.getArmatureDisplayAsync(bodyUI, spineTable.json)
					.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
						let spx = new Spx();
						spx.spineScaleX = armatureDisplay.scaleX;
						spx.spineScaleY = armatureDisplay.scaleY;
						armatureDisplay.scaleX *= scale;
						armatureDisplay.scaleY *= scale;
						spx.scale = armatureDisplay.scaleY;
						spx.spine = armatureDisplay;
						spx.name = spineTable.json;
                		setDragonBonesRemove(armatureDisplay);
						spx.init();
						this.body = spx;
						this.addChild(this.body.spine);
						this.actionId = -1;
						this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
					});
				// [this.body] = HunterSpineX(bodySpxId, scale, null, null, false, bodyUI);
				// if (this.body) {
				// 	this.addChild(this.body.spine);
				// 	this.actionId = -1;
				// 	this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
				// } else {
				// 	[this.body] = HunterSpineX(0, scale, null, MapSceneLoading.BlackRole, false, bodyUI);
				// 	let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);
				// 	Game.DragonBonesManager.preloadDragonbone(bodyUI, spineTable.json)
				// 		.then(() => {
				// 			if (this.body) {
				// 				this.body.clearSpine();
				// 				this.body = null;
				// 			}
				// 			[this.body] = HunterSpineX(bodySpxId, scale, null, null, false, bodyUI);
				// 			this.addChild(this.body.spine);
				// 			this.actionId = -1;
				// 			this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
				// 		});
				// }
			}
		}
		//脚底光环
		public loadAura() {
			if (this.auraBack) {
				this.auraBack.parent.removeChild(this.auraBack);
				this.auraBack = null;
			}
			if (this.auraFront) {
				this.auraFront.parent.removeChild(this.auraFront);
				this.auraFront = null;
			}
			if (this.playerInfo == null || this.playerInfo.haloId == null) {
				return;
			}
			//光环 是否生效
			if (this.playerInfo.haloId == 0 || !TableHalo.Item(this.playerInfo.haloId)) {
				return;
			}
			let scale = 0.8;
			let haloTbl = TableHalo.Item(this.playerInfo.haloId);
			let auraCssIdFront = haloTbl.halo_front_aniId;
			let auraCssIdBack = haloTbl.halo_back_aniId;
			if (auraCssIdFront != null) {
				let ccitem = TableClientAniUi.Item(auraCssIdFront);
				let item = TableClientAniCssSource.Item(ccitem.css_id);
				let name = item.name + "_" + item.number;
				Game.DragonBonesManager.playAnimation(this, name, null, ccitem.index, 0).then((display) => {
					display.scaleX *= scale;
					display.scaleY *= scale;
					this.addChildAt(display, 1);
					this.auraFront = display;
				});
			}
			if (auraCssIdBack != null) {
				let ccitem = TableClientAniUi.Item(auraCssIdBack);
				let item = TableClientAniCssSource.Item(ccitem.css_id);
				let name = item.name + "_" + item.number;
				Game.DragonBonesManager.playAnimation(this, name, null, ccitem.index, 0).then((display) => {
					display.scaleX *= scale;
					display.scaleY *= scale;
					this.addChildAt(display, 0);
					this.auraBack = display;
				});
			}
		}
		public setPos(x: number, y: number) {
			this.x = x;
			this.y = y;
		}
		public setMove(posList: egret.Point[]) {
			this.stopMove();
			this.toPosList = posList;
			let dir = posList[0].x > this.x ? TableEnum.TableEnumDir.Dir_Right : TableEnum.TableEnumDir.Dir_Left;
			this.changeAction(TableEnum.TableEnumBaseState.State_Walk, dir);
		}

		public stopMove(){
			this.setStand();
			while(this.toPosList.length > 0){
				PoolManager.getInstance().addPoint(this.toPosList.shift());
			}
		}

		public setStand(){
			this.changeAction(TableEnum.TableEnumBaseState.State_None, this.lastDir);
		}

		//脚底黑圈
		public loadSlots() {
			if (this.shadow == null) {
				this.shadow = new eui.Image(UIConfig.UIConfig_CommonBattle.common_shadow);
				this.addChild(this.shadow);
				this.shadow.x = -55;
				this.shadow.y = -10;
			}
		}
		public changeAction(actionId, dir) {
			if (this.actionId == actionId && this.lastDir == dir) {
				return;
			}
			this.actionId = actionId;
			this.lastDir = dir;
			if (this.body != null) {
				let bFlipX = yuan3(dir == TableEnum.TableEnumDir.Dir_Right, false, true);
				this.body.setFlipX(bFlipX);
				this.body.SetLoop(true);
				this.body.ChangeAction(actionId);
			}
		}

		public Update(dt){
			switch(this.actionId){
				case TableEnum.TableEnumBaseState.State_Walk:
				this.onMove();
				break;
			}
		}

		private onMoveRun(offx: number, offy: number){
			if(this.owner){
				this.owner.playerMove(this, offx, offy);
			}
		}

		private onMoveFinish(){
			this.setStand();
			if(this.owner){
				this.owner.playerMoveFinish(this);
			}
		}

		private onMove(){
			let pos = this.toPosList[0];
			if(this.move(pos.x, pos.y)){
				PoolManager.getInstance().addPoint(this.toPosList.shift());
				if(this.toPosList.length == 0){
					this.onMoveFinish();
				} else if(this.toPosList[0].x != this.x){
					let dir = this.toPosList[0].x > this.x ? TableEnum.TableEnumDir.Dir_Right : TableEnum.TableEnumDir.Dir_Left;
					this.changeAction(TableEnum.TableEnumBaseState.State_Walk, dir);
				}
			}
		}
		private move(tox: number, toy: number): boolean{
			let [isFinish, offx, offy] = Util.moveObj(this, this.speed, tox, toy);
			if(!this.checkBlock(this.x + offx, this.y + offy)){
				this.x += offx;
				this.y += offy;
				this.onMoveRun(offx, offy);
			}
			return isFinish;
		}

		private checkBlock(nx: number, ny: number): boolean{
			return false;
		}
	}
}