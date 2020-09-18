namespace zj {
	export class StageSceneWonderland extends StageSceneRpg {
		public constructor() {
			super();
			this.floor = 100
			this.playersNum = 0

			this.playerLeader = null
			this.orderCnt = 1
			// 教学
			// Game.TeachSystem.curPart = -1
			Teach.bFirstTeachUpdata = true

			this.timer_tick = 0;
		}
		public OnTouchDown(touchs: egret.TouchEvent) {
			if (this.playerLeader != null) {
				// let yy = UIManager.StageWidth - touchs.localY;
				this.playerLeader.OnTouchDown(touchs);
			}
			this.dealWithNpcButton(0, [touchs.stageX, touchs.stageY]);
		}
		public OnTouchMove(touchs: egret.TouchEvent) {
			if (this.playerLeader != null) {
				this.playerLeader.OnTouchMove(touchs);
			}
			this.dealWithNpcButton(1, [touchs.stageX, touchs.stageY]);
		}
		public OnTouchUp(touchs: egret.TouchEvent) {
			if (this.playerLeader != null) {
				// let yy = UIManager.StageWidth - touchs.localY;
				this.playerLeader.OnTouchUp(touchs);
			}
			this.dealWithNpcButton(2, [touchs.stageX, touchs.stageY]);
		}
		public testNum = 100;
		public floor;
		public playersNum;
		public orderCnt;
		public timer_tick;
		public count;
		public OnLoading(percent) {
			super.OnLoading(percent);
			switch (percent) {
				case 51:
					this.InitRes();
					this.dealTeachMobs();
					break;
				case 56:

					break;
				case 61:

					break;
				case 66:

					break;
				case 71:
					this.initMapBlock();
					break;
				case 76:
					this.initMobs();
					break;
				case 81:
					this.initMember();
					break;
				case 86:
					let posItem = Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem;
					if(SceneManager.initType == 3){// 从世界boss场景进入
						SceneManager.initType = 0;
						posItem.scene_x = Util.randomValue(1800, 1970);
						posItem.scene_y = Util.randomValue(366, 422);
					}
					this.proofLeaderPos(posItem);
					this.bPosFinished = true;
					break;
				case 91:
					this.mainMenu = newUI(WonderLandChoose);
					this.mainMenu.show();
					break;
				case 96:
					// uicache.Add("Common_Annouce", nil, true)
					break;
			}
		}
		public InitRes() {
			Gmgr.Instance.preLayerId = Gmgr.Instance.layerId;
			Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_WONDERLAND);
			Gmgr.Instance.bInSceneFight = false;
			this.mainMenu = null;
			this.sceneType = Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem.sceneType;
			this.count = 0;
			// this.InitScene();
			let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
			this.LoadMap(MapId);

			this.initCellNode()
			this.initTmx();

			this.initLeader();
			this.initLeaderPet();
			this.initTrees();
			//this.initBuilds() 
			this.initBuilds(StringConfig_Table.wonderlandMap, Game.PlayerWonderLandSystem.wonderlandId);

			this.flashSceneLeaderColor();
		}
		public release() {
			super.release();
			CC_SAFE_DELETE(this.playerLeader);
			this.playerLeader = null;
		}
		public Init() {
			super.Init();
			Helper.PlaybgmByID(100001);
			//更新时间差值
			this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
			this.proofTime();
			Game.PlayerWonderLandSystem.loadingPosInfo = {};
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
		}

		public SceneItemPosNotice_Visit(ev: egret.Event) {
			let body = (<message.SceneItemPosNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			this.updateSimplePos(Game.PlayerWonderLandSystem.noticePosInfo);
			Game.PlayerWonderLandSystem.noticePosInfo = {};
		}
		public SceneItemPosInfoNotice_Visit(ev: egret.Event) {
			let body = (<message.SceneItemPosInfoNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			if (Helper.getObjLen(Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
				this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
				Game.PlayerWonderLandSystem.loadingPosInfo = {};
			}
			// Game.PlayerWonderLandSystem.timePosInfo
			this.updateNoticePos(Game.PlayerWonderLandSystem.timePosInfo);
			Game.PlayerWonderLandSystem.timePosInfo = {};
		}
		public LeagueWarBattleResultNotice_Visit(ev: egret.Event) {
			let body = (<message.BattleImitateResultNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			this.beAtkNoticeResult();
		}
		public initLeader() {
			let order = this.orderCnt
			let leader = new StageSceneFightLeader(this.map, this.MapBlockH);
			let x = 0;
			let y = 0;
			let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
			let dir = TableEnum.TableEnumDir.Dir_Right;
			leader.createWonderlandPlayer(scenePosInfo, this.floor, x, y, dir, x, y);
			leader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
			leader.dealSceneNotice(scenePosInfo);
			if (scenePosInfo.hpPre == 0) {
				leader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
			}
			this.playerLeader = leader;
			this.orderCnt = this.orderCnt + 1;
		}
		public initLeaderPet() {
			let pet = new StageScenePlayerPet(this.map, this.MapBlockH);
			let x = -70
			let y = 0
			let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
			let dir = TableEnum.TableEnumDir.Dir_Right;

			pet.createPlayerPet(this.playerLeader, x, y, dir);
			this.playerLeaderPet = pet;

			this.orderCnt = this.orderCnt + 1

			this.playerLeader.setPlayerPet(pet);
		}
		public initTrees() {
			let y = 0;
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
					continue;
				}
				this.addTree(v);
			}
		}
		public addTree(scenePosInfo) {
			let tbl = TableWonderlandTree.Table();
			let tree_id = scenePosInfo.buildId;
			if (scenePosInfo.posItem.scene_x > this.mapWidth || scenePosInfo.posItem.scene_y > this.mapHeight) {
				return;
			}
			let v = tbl[tree_id];
			if (v == null) {
				return;
			}
			let key = scenePosInfo.roleBase.id;
			let tree = new StageRpgTree(this.map, this.MapBlockH);
			tree.InitTree(v, scenePosInfo);
			this.tableTrees[key] = tree;
			return tree;
		}
		public initMobs() {
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					continue;
				}
				if (this.tableMembers[v.roleBase.id] != null) {
					continue;
				}
				this.addMob(v, null, null);
			}
		}
		public isModExist(t) {
			for (let k in t) {
				let v = t[k];
				if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					return true;
				}
			}
			return false;
		}
		public addMob(scenePosInfo, x, y) {
			let order = this.orderCnt;
			let mob = new StageSceneFightMob(this.map, this.MapBlockH);
			let floor = 200;
			let dir = TableEnum.TableEnumDir.Dir_Left;

			let [map_x, map_y] = this.proofMobPos(scenePosInfo.posItem.scene_x, scenePosInfo.posItem.scene_y);
			let screen_x = map_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let screen_y = map_y - (this.playerLeader.verDistance - this.playerLeader.y);
			mob.createWonderlandMob(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			mob.setPos(screen_x, screen_y);
			this.tableMembers[scenePosInfo.roleBase.id] = mob;
			this.orderCnt = this.orderCnt + 1;
			this.willDelMobs[scenePosInfo.roleBase.id] = false;
		}
		public addMember(scenePosInfo, x, y) {
			let order = this.orderCnt
			let member = new StageSceneFightInLeauge(this.map, this.MapBlockH);
			let floor = 200
			let dir = TableEnum.TableEnumDir.Dir_Right

			let screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x)
			let screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y)

			// if(scenePosInfo.roleBase.picId < 100){
			// 	scenePosInfo.roleBase.picId = "1400" + scenePosInfo.roleBase.picId;
			// }
			// scenePosInfo.roleBase.picId = 140001

			member.createWonderlandPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			member.dealSceneNotice(scenePosInfo);

			this.tableMembers[scenePosInfo.roleBase.id] = member;
			this.orderCnt = this.orderCnt + 1;
			this.addmemberPet(member);
		}
		public addmemberPet(member) {
			let carry = member.getCarryPet();
			if (carry) {
				let pet = new StageScenePlayerPet(this.map, this.MapBlockH);
				let x = -70
				let y = 0
				let dir = TableEnum.TableEnumDir.Dir_Right

				pet.createPlayerPet(member, x, y, dir)
				this.tableMemberPets[member.scenePosInfo.roleBase.id] = pet

				this.orderCnt = this.orderCnt + 1;

				this.tableMembers[member.scenePosInfo.roleBase.id].setPlayerPet(pet);
			}
		}
		public initMember() {
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
					continue;
				}
				if (v.roleBase.id == Game.PlayerInfoSystem.RoleID) {
					continue;
				}
				if (this.tableMembers[v.roleBase.id] != null) {
					continue;
				}
				this.addMember(v, null, null);
			}
		}
		public delMember(key_id) {
			if (this.tableMembers[key_id] != null) {
				CC_SAFE_DELETE(this.tableMembers[key_id]);
				CC_SAFE_DELETE(this.tableMemberPets[key_id]);
			} else if (this.cacheMembers[key_id] != null) {
				CC_SAFE_DELETE(this.cacheMembers[key_id]);
			}
			delete this.tableMembers[key_id];
			delete this.tableMemberPets[key_id];
			delete this.cacheMembers[key_id];
			delete Game.PlayerWonderLandSystem.scenePosInfo[key_id];
		}
		public Update(tick) {
			// tick = 0.03;
			super.Update(tick);
			if (this.playerLeader != null) {
				this.playerLeader.Update(tick);
				this.updateLeaderDieUi();
				this.updateLeaderFish();
			}
			if (this.playerLeaderPet != null) {
				this.playerLeaderPet.Update(tick);
			}

			this.updateMember(tick)
			this.updateBuilds(tick)
			this.updateTrees(tick)
			this.updateNpcs(tick)
			this.updateTreeTrans(null);
			this.flashTree();

			//教学
			// Teach.procTeach();
			Teach.checkTeachId();
			Teach.proOperateTeach();
		}
		public updateMember(tick) {
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v.bCanRemove == true) {
					CC_SAFE_DELETE(v);
					delete this.tableMembers[k];
					delete this.cacheMembers[k];
					v = null;
					continue;
				}
				v.Update(tick)
				this.flashMemberColor(v);
			}

			for (let k in this.tableMemberPets) {
				let v = this.tableMemberPets[k];
				if (v.master.bCanRemove == true) {
					CC_SAFE_DELETE(v);
					delete this.tableMemberPets[k];
					v = null;
					continue;
				}
				v.Update(tick);
			}
		}
		public updateSimplePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				if (this.tableMembers[k] != null) {
					this.tableMembers[k].dealSimpleMoveNotice(v);
				}
			}
		}
		private mobBattle(v, key_id) {
			if (this.tableMembers[key_id].isVisible() == true
				&& v.otherBase.length != 0
				&& ((this.tableMembers[v.otherBase[0].id] != null
				) || v.otherBase[0].id == Game.PlayerInfoSystem.RoleID)) {
				this.tableMembers[key_id].dealSceneNotice(v)
				this.memberNoticeResult(key_id, v.otherBase[0].id);
				return true;
			}
			return false;
		}
		public updateNoticePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
					let key_id = v.roleBase.id;
					if (this.tableTrees[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						let tree = this.addTree(v);
						if (tree != null) {
							this.SetTreeBlock(tree);
							Astar.getInstance().clear_cached_paths();
						}
					} else if (this.tableTrees[key_id] != null) {
						this.tableTrees[key_id].dealSceneNotice(v);
					}
				} else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					let key_id = v.roleBase.id;
					if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.tableMembers[key_id] = this.cacheMembers[key_id];
						delete this.cacheMembers[key_id];
						this.tableMembers[key_id].joinView();
						this.tableMembers[key_id].dealSceneNotice(v);
					} else if (this.tableMembers[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.addMob(v, null, null);
					} else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) && ((v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE))) {
						if (!this.willDelMobs[key_id]) {
							this.delMember(key_id);
						}
					} else if (this.tableMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && v.otherBase.length == 0)) {
						this.tableMembers[key_id].leaveView();
						this.cacheMembers[key_id] = this.tableMembers[key_id];
						delete this.tableMembers[key_id]
					} else if (this.tableMembers[key_id] != null) {
						//死亡和被动战斗

						if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
							if (this.mobBattle(v, key_id) == false) {
								this.delMember(key_id);
							} else {
								this.willDelMobs[key_id] = true;
							}
						} else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED) {
							this.mobBattle(v, key_id)
						} else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
							this.tableMembers[key_id].dealSceneNotice(v)
						}
					} else if (this.cacheMembers[key_id] != null) {
						if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
							this.delMember(key_id);
						}
					}
				} else {
					if (v.roleBase.id == Game.PlayerInfoSystem.RoleID) {
						if (v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
							if (this.playerLeader != null) {
								this.playerLeader.dealSceneNotice(v);
							}
						}
					} else {
						let key_id = v.roleBase.id;
						if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
							this.tableMembers[key_id] = this.cacheMembers[key_id];
							delete this.cacheMembers[key_id]
							this.tableMembers[key_id].joinView();
							this.tableMembers[key_id].dealSceneNotice(v);
						} else if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE
								|| v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
							this.addMember(v, null, null);
						} else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null)
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
							this.delMember(key_id);
						} else if (this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
							this.tableMembers[key_id].leaveView();
							this.cacheMembers[key_id] = this.tableMembers[key_id];
							delete this.tableMembers[key_id];
						} else if (this.tableMembers[key_id] != null) {
							this.tableMembers[key_id].dealSceneNotice(v);
							if (this.tableMembers[key_id].bVisible == true && this.tableMembers[key_id].otherState == TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0) {
								this.memberNoticeResult(key_id, v.otherBase[0].id);
							}
						}
					}
				}
			}
		}
		public updateBuilds(tick) {
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				if (v.isCanRemove() == true && v.buildHp <= 0) {
					this.ClearBlock(v);
					CC_SAFE_DELETE(v);
					delete this.tableBuilds[k];
					continue;
				}
				v.Update(tick);
			}
		}
		public UpdateMap(base_x, base_y) {
			let [moveX, moveY] = this.ComputeMapXY(base_x, base_y);
			super.UpdateMap(moveX, moveY);
		}
		public getUpNode() {
			return this.nodeUp;
		}
		public dealWithNpcButton(tag, pos) {
			// let x = pos[0];
			// let y = pos[1];
			// for(let k in this.tableNpcs){
			// 	let v = this.tableNpcs[k];
			// 	let rect:egret.Rectangle = new egret.Rectangle(v.x + v.info.touch_rt[0], v.y + v.info.touch_rt[1], v.info.touch_rt[2], v.info.touch_rt[3]);
			// 	if(rect.containsPoint(new egret.Point(x,y)) == true){
			// 		if(tag == 0 && v.back1 != null){
			// 			//getNodeScaleByClick(v.back1, true);
			// 		}
			// 	}
			// }
		}
		public getLeader() {
			return this.playerLeader;
		}
		public reqLeaderPos(x, y, successCB) {
			if (x <= 0) {
				x = 1;
			}
			let visit_func = function func(req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandMoveResponse>resp;
				if (response.header.result != 0) {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				if (successCB != null) {
					successCB();
				}
				if (this.playerLeader) {
					this.playerLeader.resetMoveNet();
				}
				if (response.body.roleInfo.length != 0) {
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo[0];
					this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
					if (this.playerLeader.sceneHpPercent == 0) {
						this.playerLeader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
					}
				}
			}
			let req = new message.WonderlandMoveRequest();
			req.body.scene_x = x;
			y = PlayerWonderLandSystem.MapHeight - y;
			req.body.scene_y = y;
			Game.Controller.send(req, visit_func, null, this, true);
		}
		public updateLeaderDieUi() {
			if (this.playerLeader.otherState != TableEnum.TableEnumOtherState.OtherState_Die) {
				return;
			}
			if (this.playerLeader.dieProtectTime <= 0) {
				return;
			}
			if (this.isCanPushWarUi() == false) {
				return;
			}
			if (this.mainMenu != null) {
				this.mainMenu.SetDieTime(this.playerLeader.dieProtectTime);
			}
		}
		public updateLeaderFish() {
			this.playerLeader.pre_fish_state = this.playerLeader.bInFish;
			if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0) {
				//下杆中
				if (this.playerLeader.bInFish != 1) {
					this.playerLeader.bInFish = 1;
				}
			} else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
				//可收杆
				if (this.playerLeader.bInFish != 2) {
					this.playerLeader.bInFish = 2;
				}
			} else {
				if (this.playerLeader.bInFish != 0) {
					this.playerLeader.bInFish = 0;
				}
			}
		}
		public declareReq(roleId, successCB) {
			// let visit_func = function func(host, msg, result){
			// 	if(result == EC.SUCCESS){
			// 		//弹出结算界面试试
			// 		if(successCB != null){
			// 			successCB();
			// 		}
			// 		this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
			// 	}
			// }

		}
		public collideObjectReq(other_id, successCB) {
			let visit_func = function func(req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandCollideResponse>resp;
				if (response.header.result != 0) {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					if (response.header.result == message.EC.XG_ROLE_NOT_FINDED) {
						this.delMember(Gmgr.Instance.rpgObjectId);
					}
					return;
				} else {
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
					Game.PlayerWonderLandSystem.getGoods = response.body.gameInfo.getGoods;
					Game.PlayerWonderLandSystem.battleResult(response);
					//弹出结算界面试试
					if (successCB != null) {
						successCB();
					}
					this.atkNoticeResult();
				}
			}
			let req = new message.WonderlandCollideRequest();
			req.body.objectId = other_id;
			Gmgr.Instance.rpgObjectId = other_id;
			Game.Controller.send(req, visit_func, null, this, false);
		}
		public wonderlandCollectionReq(tree_id, successCB) {
			let visit_func = function func(req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandMoveResponse>resp;
				if (response.header.result != 0) {
					if (response.header.result == message.EC.XG_LACK_GOLDPLATE) {
						// Player.BuyPlate();购买盘子提示
						let viplevel = TableVipinfo.Table()[Object.keys(TableVipinfo.Table()).length - 1].level;
						let Licence = (vipLv?) => {
							let lv = vipLv ? vipLv : Game.PlayerInfoSystem.BaseInfo.licenceLevel;
							return TableLicence.Item(lv);
						}
						if (Game.PlayerInfoSystem.BaseInfo.vipLevel == viplevel || Licence().buy_plate > Game.PlayerVIPSystem.vipInfo.buyPlate || Licence(Game.PlayerInfoSystem.BaseInfo.licenceLevel + 1).buy_plate <= Licence().buy_plate) {
							let str = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buy_plate,
								CommonConfig.plate_buy_token(Game.PlayerVIPSystem.vipInfo.buyPlate),
								CommonConfig.role_buy_add_plate,
								Licence().buy_plate - Game.PlayerVIPSystem.vipInfo.buyPlate,
								Licence().buy_plate)
							TipManager.ShowConfirmCancel(str, () => {
								Game.PlayerWonderLandSystem.BuyPlate().then(() => {
									let str_power = Helper.StringFormat("+%d", CommonConfig.role_buy_add_plate);
									TipManager.GetResource(str_power, message.EResourceType.RESOURCE_GOLD_PLATE, this.height / 2);
								}).catch((result) => {
									if (result == message.EC.XG_POWER_BUY_LIMIT) {
										let str = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.err_buy_plate,
											Game.PlayerVIPSystem.vipInfo.buyPlate,
											Licence().buy_plate)
										TipManager.ShowTipsAndGoVip(str, this, TableEnum.Enum.Vip.CHARGE, null)
									} else if (result == message.EC.XG_LACK_TOKEN) {
										TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
											loadUI(PayMallScene)
												.then((scene: PayMallScene) => {
													scene.show(UI.SHOW_FROM_TOP);
													scene.init(false);
													scene.loadFrom(StageSceneManager.Instance.GetCurScene().mm || TableEnum.Enum.HXHChargeType.Charge);
												});
										})
									} else {
									}
								})
							})
						}
					} else {
						toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					}
					return;
				} else {
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
					if (successCB != null) {
						successCB();
					}
					if(this.playerLeader){
						this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
					}
				}
			}
			let req = new message.WonderlandCollectionRequest();
			req.body.treeId = tree_id;
			Game.Controller.send(req, visit_func, null, this, false, true);
		}
		public revivePersonReq(successCB) {
			let visit_func = function func(req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandDeadCoolingResponse>resp;
				if (response.header.result == 0 || response.header.result == message.EC.XG_SCENE_OWNER_NOT_DEAD) {
					//弹出结算界面试试
					if (successCB != null) {
						successCB();
					}
					if (this.playerLeader != null) {
						this.playerLeader.path = null;
						this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
						this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem)
						this.playerLeader.reSafe();
					}
				} else if (response.header.result == message.EC.XG_LACK_TOKEN) {
					TipManager.ShowAddGemStone();
				}
			}
			let req = new message.WonderlandDeadCoolingRequest();
			Game.Controller.send(req, visit_func, null, this, false);
		}
		public getEventThings(x, y) {
			let t = [];
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				if (v.isCanBeAtk() == false) {
					continue;
				}
				if (v.beInScope(x, y) == true) {
					let info = {};
					info["type"] = TableEnum.Enum.LeagueWarTouchType.Building;
					info["data"] = v;
					t.push(info);
				}
			}
			for (let k in this.tableMapCells) {
				let v = this.tableMapCells[k];
				if (v.info.build_type != 5) {
					continue;
				}
				if (v.isCanBeTouch() == false) {
					continue;
				}
				if (v.beInScope(x, y) == false) {
					continue;
				}
				let [tree_x, tree_y] = v.getEventPos();
				if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
					continue;
				}
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Npc;
				info["data"] = v;
				t.push(info);
			}
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				if (v.beInScope(x, y) == false) {
					continue;
				}
				let [tree_x, tree_y] = v.getEventPos();
				if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
					continue;
				}
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Grass;
				info["data"] = v;
				t.push(info);
			}
			let tbl_move = [];
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v.beInScope(x, y) == false) {
					continue;
				}
				if (v.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
					continue;
				}
				if (v.otherState != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					let info = {};
					info["type"] = TableEnum.Enum.LeagueWarTouchType.Mob;
					info["data"] = v;
					t.push(info);
					continue;
				}
				tbl_move.push(k);
			}

			let still_len = t.length;
			let move_len = tbl_move.length;
			let real_person = Math.min(move_len, ConstantConfig_RoleBattle.OVERLAP_SELECT_MAX_NUM - still_len);
			let tbl_rand = [];
			while (true) {
				if (tbl_rand.length >= real_person) {
					break;
				}
				let rand = TsMtirand();
				let rand_value = rand % move_len + 1;
				let value = tbl_move[rand_value - 1];
				if (Table.VIn(tbl_rand, value) == false) {
					tbl_rand.push(value);
					let info = {};
					let bMember = yuan3(this.tableMembers[value].getLegId() != 0 && this.tableMembers[value].getLegId() == this.playerLeader.getLegId(), true, false);
					info["type"] = Helper.getWonderlandPlayerType(this.playerLeader.getBattleMode(), bMember);
					info["data"] = this.tableMembers[value];
					t.push(info);
				}
			}
			t.sort((a, b) => {
				return a.type - b.type;
			});
			return t;
		}
		public checkEventThings(x, y) {
			let t = this.getEventThings(x, y);
			return yuan3(t.length == 0, false, true);
		}
		public dealEventThings(x, y) {
			let t = this.getEventThings(x, y);
			let doSomeThing = false;
			if (t.length > 1) {
				loadUI(League_WarSelectThings).then((dialog: League_WarSelectThings) => {
					dialog.SetInfo(t);
					dialog.show();
					doSomeThing = true;
				});

			} else if (t.length == 1) {
				if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Person) {
					//碰撞人物
					this.collideObjectReq(t[0].data.playerInfo.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Mob) {
					//碰撞怪物 
					this.collideObjectReq(t[0].data.playerInfo.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Building) {

				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Grass) {
					//采集
					this.wonderlandCollectionReq(t[0].data.scenePosInfo.roleBase.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Partner) {
					this.pushPersonInterface(t[0].data.playerInfo);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Npc) {
					//采集
					this.pushNpcUi(t[0].data.info);
					doSomeThing = true;
				}
			}
			return doSomeThing;
		}
		//安全区操作检测
		public delSafeAreaCheck(touch_type, id) {
			let canDo = true;
			return canDo;
		}
		public dealTriggerAreaThings(x, y, trigger_Tbl) {
			return [];
		}
		public pushNpcUi(info) {
			if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Port) {// 港口
				if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, true)) {
					loadUI(DarkLandPortMainSence)
						.then((Scene: DarkLandPortMainSence) => {
							Scene.Init();
							Scene.show(UI.SHOW_FROM_TOP);
						});
				}
				// Teach.addTeaching();
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Boss) {// 世界boss
				if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, true)) {
					Game.PlayerZorkSystem.bossInfo().then(() => {
						loadUI(ZorkBossMainPop)
							.then((scene: ZorkBossMainPop) => {
								scene.show(UI.SHOW_FROM_TOP);
							});
					});
				}
				// Teach.addTeaching();
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Exchange) {//兑换
				loadUI(ExchangeMainSence).then((scene: ExchangeMainSence) => {
					scene.show(UI.SHOW_FROM_TOP);
				});
				// Teach.addTeaching();
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Mora) {//猜拳
				loadUI(MoraMainScene).then((scene: MoraMainScene) => {
					scene.Init();
					scene.show(UI.SHOW_FROM_TOP);
				});
				// Teach.addTeaching();
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Fish) {//钓鱼
				loadUI(FishingMain).then((dialog: FishingMain) => {
					dialog.show(UI.SHOW_FROM_TOP);
				})
				// Teach.addTeaching();
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Door) {
				// let LeaveWonderlandSceneReq = function Func() {
				// 	let Response = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
				// 		let response = <message.WonderlandLeaveResponse>resp;

				// 		if (response.header.result == message.EC.SUCCESS) {
				// 			// let cb = function(){
				// 			// 	if(!Device.isReviewSwitch){
				// 			// 		// PushUI("HXH_Wonderland")//退出去走这里  目前有问题
				// 			// 	}
				// 			// }
				// 			Game.PlayerWonderLandSystem.prairieClose();

				// 		} else {
				// 			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				// 		}
				// 	}
				// 	let req = new message.WonderlandLeaveRequest();
				// 	Game.Controller.send(req, Response, null, this, false);
				// }
				if (this.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
					toast(TextsConfig.TextsConfig_Wonderland.die_error_tips);
					return
				}
				if (this.isTouchUiEnabled() == false) {
					toast(TextsConfig.TextsConfig_Wonderland.battle_error_tips);
					return
				}
				let [tag, code] = this.isCanLeaveScene();
				if (tag == true && !Device.isReviewSwitch) {
					TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip, () => {
						// LeaveWonderlandSceneReq();
						Game.PlayerWonderLandSystem.prairieClose(this.mainMenu.closeFinish, this.mainMenu);
					});
				} else {
					if (TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")] != null) {
						toast(TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")]);
					}
				}
			} else if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {//双色球
				let Response = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
					let response = <message.GetLotteryFruitInfoResponse>resp;
					if (response.header.result == message.EC.SUCCESS) {
						Game.PlayerDoubleBallSystem.my_id = Game.PlayerDoubleBallSystem.serverFruit(Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
						Game.PlayerDoubleBallSystem.public_id = Game.PlayerDoubleBallSystem.serverFruit(response.body.fruitInfo.dailyLotteryFruit.redFruit, response.body.fruitInfo.dailyLotteryFruit.blueFruit);
						loadUI(DoubleColorSence).then((scene: DoubleColorSence) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
					} else {
						toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					}
				}
				let req = new message.GetLotteryFruitInfoRequest();
				Game.Controller.send(req, Response, null, this, false);
			} else {
				return;
			}
		}
		public pushPersonInterface(info) {
			// local ui = PushUI("Wonderland_SelectPlayer")
			// ui:SetInfo( info )
			// ui:SetFather(self)
			// ui:SetPressOutExit();
		}
		public flashSceneLeaderColor() {
			let _path = Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
			let _color = ConstantConfig_Common.Color.wonderland_color.leader_color;
			this.playerLeader.flashTtfNameColor(_color);
			this.playerLeader.flashBarTexture(_path);
		}
		public flashTree() {
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				let _tag = false;
				let _action = -1;
				let [x, y] = v.getEventPos();
				if (this.playerLeader.isValidEventDis(x, y) == true) {
					_tag = true;
					_action = TableEnum.Enum.LeagueWarTouchType.Grass;
				}
				if (v.fruitCnt <= 0) {
					_action = -1;
				}
				let isPeace = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).is_battle == 0;
				let can_pick = Otherdb.inPeaceWonderlandNotPick(v.treeId);
				if (isPeace) {
					if (!can_pick) {
						_action = -1;
					}
				}
				v.flashTree(_tag, _action);
			}
		}
		public getWonderlandMode() {
			let model = TableEnum.Enum.WonderlandType.WondType_Peace;
			if (Game.PlayerWonderLandSystem.wonderlandId == 3 || Game.PlayerWonderLandSystem.wonderlandId == 4) {
				model = TableEnum.Enum.WonderlandType.WondType_Fight
			}
			return model;
		}
		public flashMemberColor(v) {
			if (v.bVisible == false) {
				return;
			}
			if (v.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
				let _action = -1;
				if (this.playerLeader.isValidEventDis(v.x, v.y + v.bodyHeight / 2) == true && v.isFightShowing() == false) {
					_action = TableEnum.Enum.LeagueWarTouchType.Mob;
				}
				v.flashLedAni(_action);
			} else {
				let myMode = this.playerLeader.getBattleMode();
				let otherMode = v.getBattleMode();
				let bMember = yuan3(v.getLegId() != 0 && v.getLegId() == this.playerLeader.getLegId(), true, false);
				let _action = Helper.getWonderlandPlayerType(myMode, bMember);
				let _path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
				let _color = ConstantConfig_Common.Color.wonderland_color.memeber_color;
				if (this.getWonderlandMode() == TableEnum.Enum.WonderlandType.WondType_Fight) {
					if (bMember) {
						_path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
					} else {
						_path = UIConfig.UIConfig_LeagueWarScene.roleBloodFightBar;
					}
					if (_action == TableEnum.Enum.LeagueWarTouchType.Person) {
						_color = ConstantConfig_Common.Color.wonderland_color.other_kill_color;
					}
				}
				if (v.otherState == TableEnum.TableEnumOtherState.OtherState_Die || this.playerLeader.isValidEventDis(v.x, v.y + v.bodyHeight / 2) == false) {
					_action = -1;
				}
				v.flashBarTexture(_path);
				v.flashTtfNameColor(_color);
				v.flashLedAni(_action);
			}
		}
		public addCollectMenu(time, type) {
			if (this.mainMenu != null) {
				this.mainMenu.addControlPop(time, type);
			}
		}
		public deleteCollectMenu() {
			this.mainMenu.deleteControlPop();
		}
		//仙境教学相关
		//获得最近的树
		public getNearTree() {
			let near = null;
			let dis = 999999;
			let leaderCenter = this.playerLeader.getBodyCenter();
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				if (v != null) {
					let [_x, _y] = v.getEventPos();
					let _temp = Helper.getTwoPointsDis(leaderCenter, new egret.Point(_x, _y));
					if (_temp < dis) {
						dis = _temp;
						near = v;
					}
				}
			}
			return near;
		}
		public getNpcById(id) {
			let near = null;
			let dis = 999999;
			let leaderCenter = this.playerLeader.getBodyCenter();
			for (let k in this.tableNpcs) {
				let v = this.tableNpcs[k];
				if (v != null) {
					if (v.info.build_id == id) {
						near = v;
					}
				}
			}
			return near;
		}
		//获得出现的怪
		public getNearMob() {
			let near = null;
			let dis = 999999;
			let leaderCenter = this.playerLeader.getBodyCenter();
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v != null && v.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					let mobCenter = v.getBodyCenter();
					let _temp = Helper.getTwoPointsDis(leaderCenter, mobCenter);
					if (_temp < dis) {
						dis = _temp;
						near = v;
					}
				}
			}
			return near;
		}
		//获得去最近的数的位置
		public getGoingPosByTree(tree) {
			let going_x = tree.x - this.Block_Width;
			let going_y = tree.y;
			return [going_x, going_y];
		}
		//去最近的树行为
		public goNearTree() {
			let tree = this.getNearTree();
			if (tree != null) {
				let [x, y] = this.getGoingPosByTree(tree);
				this.playerLeader.startStarPath(x, y);
			}
		}
		//特定NPC行为
		public goToNpc(npcId) {
			let npc = this.getNpcById(npcId);
			if (npc != null) {
				let [x, y] = this.getGoingPosByTree(npc);
				this.playerLeader.startStarPath(x, y);
			}
		}
		public collectNearTree() {
			let tree = this.getNearTree();
			if (tree != null) {
				this.wonderlandCollectionReq(tree.scenePosInfo.roleBase.id, null);
			}
		}
		public collideNearMob() {
			let mob = this.getNearMob();
			if (mob) {
				this.collideObjectReq(mob.playerInfo.id, null);
			}
		}
		//去最近的怪行为
		public goNearMob() {
			let mob = this.getNearMob();
			if (mob) {
				let [x, y] = [mob.x - this.Block_Width, mob.y];
				this.playerLeader.startStarPath(x, y);
			}
		}
		//发协议切换场景
		public WonderlandEnter_Req(id) {
			let WonderlandEnter_Resp = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandEnterResponse>resp;
				if (response.header.result == message.EC.SUCCESS) {
					Game.PlayerWonderLandSystem.mapBlockIndex = id;
					Game.PlayerWonderLandSystem.wonderlandId = id;
					Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
					let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
					MapSceneLoading.getInstance().loadFightRes(MapId, this.openWonderLand, this);
				} else {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				}
				// Teach.addTeaching();
			}
			let req = new message.WonderlandEnterRequest();
			req.body.id = id;
			Game.PlayerWonderLandSystem.willGoRpg();
			Game.Controller.send(req, WonderlandEnter_Resp, null, this, false);
		}
		private openWonderLand() {
			StageSceneManager.Instance.ChangeScene(StageSceneWonderland);
		}
		public dealTeachMobs() {
			if (Game.PlayerWonderLandSystem.wonderlandId == 4) {
				//战斗新手特殊处理，入场召唤怪物
				if (!this.isModExist(Game.PlayerWonderLandSystem.scenePosInfo)) {
					this.collectNearTree();
				}
			}
		}
		public initTestMember() {
			for (let i = 0; i < this.testNum; i++) {
				let model = 140001 + Helper.getRandom2(0, 16);
				let x = Helper.getRandom2(0, 3520);
				let y = Helper.getRandom2(0, 1680);
				let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
				scenePosInfo.roleBase.id = Game.PlayerInfoSystem.RoleID + i;
				scenePosInfo.roleBase.picId = model;
				scenePosInfo.posItem.scene_x = x;
				scenePosInfo.posItem.scene_y = y;
				this.addMember(scenePosInfo, null, null);
			}
		}
		public simulateMove() {
			for (let i = 0; i < 50; i++) {
				let a = Helper.getRandom2(1, this.testNum);
				let id = Game.PlayerInfoSystem.RoleID + a;
				if (this.tableMembers[id] != null) {
					let x = Helper.getRandom2(0, 3520);
					let y = Helper.getRandom2(0, 1680);
					let scenePosInfo = this.tableMembers[id].scenePosInfo;
					scenePosInfo.posItem.posState = message.ESceneItemState.SCENE_ITEM_STATE_MOVE;
					scenePosInfo.posItem.scene_x = x;
					scenePosInfo.posItem.scene_y = y;
					this.tableMembers[id].dealSceneNotice(scenePosInfo);
				}
			}
		}
		public OnExit() {
			this.release();
			if (this.mainMenu) {
				this.mainMenu.close();
				this.mainMenu = null;
			}
			this.playerLeaderPet = null;
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
		}
		// public onPrint(){
		// 	let x = this.playerLeader.moveDistance;
		// 	let y = this.playerLeader.verDistance;
		// 	console.log(x + " - "+ y);// 120,605 -> 1864,378
		// }
	}
}