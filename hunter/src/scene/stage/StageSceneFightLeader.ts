namespace zj {
	//联盟战斗主角
	export class StageSceneFightLeader extends StageScenePersonPath {
		public constructor(node, order) {
			super(node, order);
			this.setPlayerState(EnumPlayerState.PLAYER_STATE_FIGHT_LEADER);

			this.moveTouchId = -1;
			this.moveTouchPoint = new egret.Point(0, 0);
			this.doThingsTag = false;

			this.netFrame = 0;
			this.netMax = ConstantConfig_RoleBattle.SYNC_POS_MAX_TIME;

			this.moveNetFrame = 0;
			this.moveNetMax = ConstantConfig_RoleBattle.MOVE_NET_MAX_TIME;

			this.bossNetFrame = 0;
			this.bossNetMax = ConstantConfig_RoleBattle.BOSS_SYNC_MAX_TIME;

			this.bFightAuto = false;
			this.bCommonAtk = false;
			this.bBombAtk = false;
			this.nCommonAtkFrame = 0;
			this.nBombAtkFrame = 0;
			this.tiggerAreaEventTbl = [];
		}
		public moveTouchId;
		public moveTouchPoint;
		public doThingsTag;
		public netFrame;
		public netMax;
		public moveNetFrame;
		public moveNetMax;
		public bossNetFrame;
		public bossNetMax;
		public bFightAuto;
		public bCommonAtk;
		public bBombAtk;
		public nCommonAtkFrame;
		public nBombAtkFrame;
		public tiggerAreaEventTbl = [];

		public resetMoveNet() {
			this.netFrame = 0;
		}
		public setFightAuto(tag) {
			this.bFightAuto = tag;
		}
		public startFightAuto() {
			this.setFightAuto(true);
		}
		public endFightAuto() {
			if (this.targetCB != null) {
				this.targetCB = null;
			}
			this.setFightAuto(false);
			this.curScene.dealFightUi(false);
		}
		public procBombTime(tick) {
			let rt = tick * 1000;
			this.bombLeftTime = this.bombLeftTime - rt;
			if (this.bombLeftTime <= 0) {
				this.bombLeftTime = 0;
			}
		}
		public procAutoFight(tick) {
			let cb = function () {
				this.bBombAtk = false;
			}
			let cb1 = function () {
				this.bCommonAtk = false;
			}
			if (this.bFightAuto == false) {
				return;
			}
			let rt = tick * 1000;
			if (this.bBombAtk == false) {
				if (this.bombLeftTime <= 0 && this.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
					this.bBombAtk = true
					this.curScene.reqLeaderAttack(TableEnum.Enum.ZorkSkill.Bomb, cb, true);
				}
			} else {
				this.nBombAtkFrame = this.nBombAtkFrame + rt;
				if (this.nBombAtkFrame >= ConstantConfig_ZorkBoss.boss_attack_delay_atk) {
					this.nBombAtkFrame = 0;
					this.bBombAtk = false;
				}
			}
			if (this.bCommonAtk == false) {
				this.attackLeftTime = this.attackLeftTime - rt;
				if (this.attackLeftTime <= 0 && this.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
					this.bCommonAtk = true
					this.curScene.reqLeaderAttack(TableEnum.Enum.ZorkSkill.Attack, cb1, false);
				}
			} else {
				this.nCommonAtkFrame = this.nCommonAtkFrame + rt;
				if (this.nCommonAtkFrame >= ConstantConfig_ZorkBoss.boss_attack_delay_atk) {
					this.nCommonAtkFrame = 0;
					this.bCommonAtk = false;
				}
			}
		}
		public isAgreeEnter(){
			return true;
		}
		public dealTips(type, value) {
			if (type == TableEnum.Enum.SceneBuffType.Frozen) {
				this.curScene.mainMenu.dealBuffTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buff_tips_frozen, value));
			} else if (type == TableEnum.Enum.SceneBuffType.Bomb) {
				this.curScene.mainMenu.dealBuffTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buff_tips_bomb, value));
			} else if (type == TableEnum.Enum.SceneBuffType.Fast) {
				this.curScene.mainMenu.dealBuffTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buff_tips_fast, 50));
			} else if (type == TableEnum.Enum.SceneBuffType.RecoverBlood) {
				this.curScene.mainMenu.dealBuffTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buff_tips_recover, value));
			} else if (type == TableEnum.Enum.SceneBuffType.CollectDouble) {
				this.curScene.mainMenu.dealBuffTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buff_tips_collectDouble, value));
			}
		}
		public savePreDis(moveDis, verDis) {
			this.preMoveDis = moveDis;
			this.preVerDis = verDis;
		}
		public isNoMoveing() {
			let tag = true;
			if (this.preMoveDis != this.moveDistance || this.preVerDis != this.verDistance) {
				tag = false;
			}
			return tag;
		}
		public procSyncPos(tick) {
			let rt = tick * 1000;
			if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
				if (this.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
					this.netFrame = this.netFrame + rt;
					if (this.netFrame >= this.netMax) {
						this.netFrame = 0;
						this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
					}
				}
			} else {
				if (this.bProgressing == false && this.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
					this.netFrame = this.netFrame + rt;
				}
				if (this.bProgressing == false && this.otherState == TableEnum.TableEnumOtherState.OtherState_None && this.netFrame >= this.netMax) {
					this.netFrame = 0;
					this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
				}
			}
		}
		public isCanTouchGround(x, y) {
			let map_x = x + (this.moveDistance - this.x);
			let map_y = y + (this.verDistance - this.y);
			return this.isCanPath(map_x, map_y);
		}
		public Update(tick) {
			super.Update(tick);
			this.procCooling(tick);
			this.procSyncPos(tick);
			this.procMoveNet(tick);
			this.proTriggerArea();
		}
		public procMoveNet(tick) {
			let rt = tick * 1000;
			this.moveNetFrame = this.moveNetFrame + rt;
		}
		public proTriggerArea() {
			if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
				let eventTbl = this.tiggerAreaEventTbl;
				this.tiggerAreaEventTbl = this.curScene.dealTriggerAreaThings(this.x, this.y, eventTbl);
			}
		}
		public OnTouchDown(touchs: egret.TouchEvent) {
			this.OnTouchDownPos(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
		}
		private locationDown = new egret.Point();
		public OnTouchDownPos(stageX: number, stageY: number) {
			if (this.otherState != TableEnum.TableEnumOtherState.OtherState_None && this.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
				return;
			}
			if ((this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].finish == false)) {
				return;
			}
			let b_break = this.endProgress();
			if (b_break == true) {
				this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
				return;
			}
			// let arr = [stageX, stageY];
			// let tableSize = arr.length;
			// for (let i = 0; i < tableSize; i += 2) {
			let location = this.locationDown.setTo(stageX, stageY);
			this.moveTouchId = 0//touchs[3] 
			this.moveTouchPoint = location;

			let doSomeThing = false;
			if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS ||
				this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
				this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				if (this.isValidEventDis(location.x, location.y) == true) {
					doSomeThing = this.curScene.checkEventThings(location.x, location.y);
					this.doThingsTag = doSomeThing;
				}
			}

			if (doSomeThing == true) {
				let [map_x, map_y] = this.convertMapPos(location);
				this.changeDir(this.getClickDir(new egret.Point(map_x, map_y)));
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			} else {
				this.touchMove(location, true, false);
			}
			// }
		}
		private thisPos = new egret.Point();
		private mapPos = new egret.Point();
		public touchMove(location, tag, bTip) {
			let endAutoFightAtk = function () {
				//点击的时候立马置为正常状态
				if (this.bFightAuto == true) {
					this.endFightAuto();
				}
				if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
					this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
				}
			}
			let [map_x, map_y] = this.convertMapPos(location);
			if (this.isCanTouchGround(location.x, location.y)) {
				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
					endAutoFightAtk();
				}
				this.startStarPath(location.x, location.y, null);
				if (this.curScene.sceneType != message.ESceneType.SCENE_TYPE_BOSS) {
					if (this.moveNetFrame >= this.moveNetMax || tag == true) {
						this.moveNetFrame = 0
						this.curScene.reqLeaderPos(map_x, map_y, null);
					}
				}
			} else {
				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
					endAutoFightAtk();
				}
				let key = Helper.findNearCrossBlock(this.thisPos.setTo(this.moveDistance, this.verDistance), this.mapPos.setTo(map_x, map_y), this.curScene.blocks, this.curScene.Block_Width);
				let pos = this.curScene.blocks[key].pos;
				let [screen_x, screen_y] = this.converScreenPos(pos);
				this.startStarPath(screen_x, screen_y, null);
				if (this.curScene.sceneType != message.ESceneType.SCENE_TYPE_BOSS) {
					if (this.moveNetFrame >= this.moveNetMax || tag == true) {
						this.moveNetFrame = 0;
						this.curScene.reqLeaderPos(pos.x, pos.y, null);
					}
				}
			}
		}
		private location = new egret.Point();
		public OnTouchMove(touchs: egret.TouchEvent) {
			this.OnTouchMovePos(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
		}
		public OnTouchMovePos(stageX, stageY) {
			if (this.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
				return;
			}
			if (this.moveTouchId == 0) {
				let x = stageX;
				let y = stageY;
				this.location.setTo(x, y);
				this.touchMove(this.location, false, false);

				if (this.doThingsTag == true) {
					if (Math.abs(x - this.moveTouchPoint.x) >= 20 || Math.abs(y - this.moveTouchPoint.y) >= 20) {
						this.doThingsTag = false;
					}
				}
			}
			return false;
		}
		public OnTouchUp(touchs: egret.TouchEvent) {
			this.OnTouchUpPos(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
		}
		private touchUpPos = new egret.Point();
		public OnTouchUpPos(stageX: number, stageY: number) {
			if (this.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
				return;
			}
			let location = null;
			if (this.moveTouchId == 0) {
				let x = stageX;
				let y = stageY;

				let [map_x, map_y] = this.convertMapPos(this.touchUpPos.setTo(x, y));
				let [_, needMove] = this.curScene.getEventThings(x, y);
				if (this.isCanTouchGround(x, y)) {
					this.curScene.reqLeaderPos(map_x, map_y, null);
				}
				if (this.doThingsTag == true) {
					this.curScene.dealEventThings(this.moveTouchPoint.x, this.moveTouchPoint.y);
				}
				this.moveTouchPoint = null;
				this.moveTouchId = -1;
				this.doThingsTag = false;
			}
		}
		public startStarPath(end_x, end_y, cb, thisobj?) {
			// if (end_x <= 0) {
			// 	end_x = 0;
			// }
			this.setTargetCB(cb, thisobj);
			let beginPos = new egret.Point(this.moveDistance, this.verDistance);
			let endPos = new egret.Point(end_x + (this.moveDistance - this.x), end_y + (this.verDistance - this.y));
			if (endPos.x < 0) {
				endPos.x = 0;
			}
			// let beginPos = new egret.Point(this.moveDistance,this.verDistance );
			// let endPos = new egret.Point(end_x+(this.moveDistance-this.x), end_y+(this.verDistance - this.y));
			let path = PathFinder.calculate(beginPos, endPos, this.curScene.blocks, false, this.path);
			this.path = path;
			if (this.path != null) {
				this.targetEndPoint = endPos;
				this.goToWalk();
			}
		}
		public convertMapPos(screenPos) {
			let map_x = screenPos.x + (this.moveDistance - this.x);
			let map_y = screenPos.y + (this.verDistance - this.y);
			return [map_x, map_y];
		}
		public converScreenPos(pos) {
			let screen_x = pos.x - (this.moveDistance - this.x);
			let screen_y = pos.y - (this.verDistance - this.y);
			return [screen_x, screen_y];
		}
		public converPetPos(pos) {
			let pet_x = pos.x - (this.moveDistance - this.x);
			let pet_y = pos.y - (this.verDistance - this.y);
			return [pet_x, pet_y];
		}
		public getMapPos() {
			return [this.moveDistance, this.verDistance];
		}
		public getNameColor() {
			if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
				return ConstantConfig_Common.Color.wonderland_color.leader_color;
			} else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				return ConstantConfig_Common.Color.wonderland_color.leader_color;
			} else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
				return ConstantConfig_Common.Color.wonderland_color.leader_color;
			}
		}
		public setPos(x, y) {
			super.setPos(x, y);
		}
		public getMapY() {
			return this.verDistance;
		}
		public dealRevive() {
			if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE) {
				this.path = null;
				if (this.bFightAuto == true) {
					this.endFightAuto();
				}
				this.curScene.proofLeaderPos(this.scenePosInfo.posItem);
			}
		}
		public isValidEventDis(x, y) {
			let tag = false;
			let point = new egret.Point(x, y);
			let center = new egret.Point(this.x, this.y - this.bodyHeight / 2);
			if (Helper.isPointInCircle(point, center, ConstantConfig_Rpg.EVENT_VALID_CIRCLE_RAD) == true) {
				tag = true;
			}
			return tag;
		}
		public endFightShow() {
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			if (this.showCB != null) {
				this.showCB();
				this.showCB = null;
			}
		}
		public startControl() {
			this.curScene.addCollectMenu(this.controlMaxFrame, this.controlType);
		}
		public endControl() {
			this.curScene.deleteCollectMenu();
		}
		public leaveControl() {

		}
		public dealDead() {
			if (Gmgr.Instance.bInLoading == true) {
				if (this.sceneHpPercent == 0) {
					this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
				}
			} else {
				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
					if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
						this.path = null;
						this.bRunAstar = false
						this.saveDir = TableEnum.TableEnumDir.Dir_None
						this.walkDir = TableEnum.EnumDepthDir.Dir_None

						//this.changeOtherState(TableEnumOtherState.OtherState_FallDown)
						this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED
						this.stirSpeedX = 0.2
						this.showY = this.y
						this.changeDir(TableEnum.TableEnumDir.Dir_Right)
						this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp)

						this.endFightAuto()
					}
				}
			}
		}
		public dealHurt() {
			if (Gmgr.Instance.bInLoading == false) {
				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
					if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BOSS_HURTED || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
						if (this.scenePosInfo.evil_value != 0 && this.uiHp != this.sceneHpPercent) {
							this.dealHit(8001);
							this.dealHurtValue(0, this.scenePosInfo.evil_value);
						}
					}
				}
			}
		}
		public setPlayerPet(pet) {
			this.playerPet = pet;
		}
	}
}