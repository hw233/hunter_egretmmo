namespace zj {
	/**
	 * @class 年兽BOSS 进入战场地图
	 * 
	 * @author Yu Qingchao
	 * 
	 * 2019.07.20
	 */
	export class StageSceneActivityBoss extends StageSceneRpg {
		public constructor() {
			super();
			this.floor = 100;
			this.playersNum = 0;

			this.playerLeader = null;
			this.tableBosses = {};
			this.orderCnt = 1;
		}
		public floor;
		public playersNum;
		public orderCnt;
		public OnLoading(percent) {
			super.OnLoading(percent);
			if (percent == 51) {
				this.InitRes();
			} else if (percent == 71) {
				this.initMapBlock();
			} else if (percent == 76) {
				this.initBosses();
			} else if (percent == 81) {
				this.initMember();
			} else if (percent == 86) {
				this.proofLeaderPos(Game.PlayerBossSystem.ActivityBoss.roleInfo["posInfo"].posItem);
				this.bPosFinished = true
			} else if (percent == 91) {
				// this.loadPrepare();
				this.mainMenu = newUI(Activity_Boss);
				this.mainMenu.show();
			} else if (percent == 96) {
				// uicache.Add("Common_Annouce", null, true);
			}
		}
		public bHidePerson;
		public bHideEffect;
		public count;
		public prepareTime;
		public deathAni;
		public bEnding;
		public InitRes() {
			Gmgr.Instance.preLayerId = Gmgr.Instance.layerId;
			Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_ZORKBOSS);
			Gmgr.Instance.bInSceneFight = false;
			Game.PlayerZorkSystem.zorkBoss.isZorkBossEnd = false;

			this.bHidePerson = false;
			this.bHideEffect = false;

			this.mainMenu = null;
			this.sceneType = Game.PlayerBossSystem.ActivityBoss.roleInfo["posInfo"].posItem.sceneType;
			this.count = 0;
			this.prepareTime = 0;
			this.deathAni = null;
			this.bEnding = false;

			// this.InitScene();

			this.LoadMap(19)
			this.initCellNode()
			this.initTmx()

			this.initLeader();
			this.initBuilds(StringConfig_Table.activityBossMap, 1)
		}

		public Init() {
			super.Init();
			Helper.PlaybgmByID(100006);
			//更新时间差值
			this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
			this.proofTime();
			Game.PlayerWonderLandSystem.loadingPosInfo = {};
			// this.prepareFun();
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
			// Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, this.SceneBossResultNotice_Visit, this);
			// Game.EventManager.on(GameEvent.SERVER_NOTICE_BOSS_HP_CHANGE, this.BossHpChangeNotice_Visit, this);
		}

		public release() {
			super.release();
			CC_SAFE_DELETE(this.playerLeader);
			this.playerLeader = null;
			for (let k in this.tableBosses) {
				let v = this.tableBosses[k];
				CC_SAFE_DELETE(v);
				v = null;
			}
			this.tableBosses = null;
		}

		public initLeader() {
			let order = this.orderCnt;
			let leader = new StageSceneFightLeader(this.map, this.MapBlockH);
			let x = 0;
			let y = 0;
			let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
			let dir = TableEnum.TableEnumDir.Dir_Right;
			leader.createZorkPlayer(scenePosInfo, this.floor, x, y, dir, x, y);
			leader.dealZorkRoleInfo(Game.PlayerBossSystem.ActivityBoss.roleInfo);
			leader.dealSceneNotice(scenePosInfo);
			if (scenePosInfo.hpPre == 0) {
				leader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
			}
			this.playerLeader = leader;
			this.orderCnt = this.orderCnt + 1;
		}

		public initBosses() {
			let a = Game.PlayerWonderLandSystem.scenePosInfo;
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_BOSS) {
					continue;
				}
				if (this.tableBosses[v.roleBase.id] != null) {
					continue;
				}
				if (Helper.getObjLen(this.tableBosses) != 0) {
					continue;
				}
				this.addZorkBoss(v, null, null);
			}
		}

		public addZorkBoss(scenePosInfo, x, y) {
			let order = this.orderCnt;
			let boss = new StageSceneFightBoss(this.map, this.MapBlockH);
			let floor = 200
			let dir = TableEnum.TableEnumDir.Dir_Left

			let screen_x = scenePosInfo.build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let screen_y = scenePosInfo.build_y - (this.playerLeader.verDistance - this.playerLeader.y);
			screen_y = PlayerWonderLandSystem.MapHeight - screen_y;

			boss.createActivityBoss(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			boss.dealSceneNotice(scenePosInfo);
			boss.setHidden(true);
			this.tableBosses[scenePosInfo.build_id] = boss;
			this.orderCnt = this.orderCnt + 1;
		}

		public addMember(scenePosInfo, x, y) {
			let order = this.orderCnt;
			let member = new StageSceneFightInLeauge(this.map, this.MapBlockH);
			let floor = 200;
			let dir = TableEnum.TableEnumDir.Dir_Right;

			let screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y);


			member.createZorkPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			member.dealSceneNotice(scenePosInfo);
			this.tableMembers[scenePosInfo.roleBase.id] = member;
			this.orderCnt = this.orderCnt + 1;
			//如果隐藏玩家设置为开启状态，则每次进入需要判定
			if (this.bHidePerson == true) {
				member.setHidden(true);
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
			} else if (this.cacheMembers[key_id] != null) {
				CC_SAFE_DELETE(this.cacheMembers[key_id]);
			}
			delete this.tableMembers[key_id];
			delete this.cacheMembers[key_id];
			delete Game.PlayerWonderLandSystem.scenePosInfo[key_id];
		}

		public Update(tick) {
			super.Update(tick);
			if (this.playerLeader != null) {
				this.playerLeader.Update(tick);
				this.updateLeaderDieUi();
			}
			this.updateBosses(tick);
			this.updateMember(tick);
			this.updateBuilds(tick);
			this.updateCd(tick);
			// this.updatePrepareTime(tick);
			this.updateEndEvent();
		}

		public updateMember(tick) {
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v.bCanRemove == true) {
					CC_SAFE_DELETE(v)
					v = null;
					delete this.tableMembers[k];
					delete this.cacheMembers[k];
					continue;
				}
				v.Update(tick);
			}
		}

		public updateNoticePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_BOSS) {
					let key_id = v.roleBase.id;
					if (this.tableBosses[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.addZorkBoss(v, null, null);
					} else if (this.tableBosses[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.tableBosses[key_id].joinView();
						this.tableBosses[key_id].dealSceneNotice(v);
					} else if (this.tableBosses[key_id] != null) {
						this.tableBosses[key_id].dealSceneNotice(v);
					}
				} else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
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
							delete this.cacheMembers[key_id];
							this.tableMembers[key_id].joinView();
							this.tableMembers[key_id].dealSceneNotice(v);
						} else if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
							this.addMember(v, null, null);
						} else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null)
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
							this.delMember(key_id);
						} else if (this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
							this.tableMembers[key_id].leaveView()
							this.cacheMembers[key_id] = this.tableMembers[key_id]
							delete this.tableMembers[key_id];
						} else if (this.tableMembers[key_id] != null) {
							this.tableMembers[key_id].dealSceneNotice(v);
						}
					}
				}
			}
		}

		public updateBosses(tick) {
			for (let k in this.tableBosses) {
				let v = this.tableBosses[k];
				v.Update(tick);
			}
		}

		public updateBuilds(tick) {
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				v.Update(tick);
			}
		}

		public updateCd(tick) {
			SkillCdMgr.Instance.update(tick);
		}

		public UpdateMap(base_x, base_y) {
			let [moveX, moveY] = this.ComputeMapXY(base_x, base_y);
			super.UpdateMap(moveX, moveY);
			this.updateMapBosses(moveX, moveY);
		}

		public updateMapBosses(base_x, base_y) {
			for (let k in this.tableBosses) {
				let v = this.tableBosses[k];
				let [x, y] = v.getPos();
				v.setPos(x - base_x, y - base_y);
			}
		}

		public getUpNode() {
			return this.nodeUp;
		}

		public OnTouchDown(touchs: egret.TouchEvent) {
			if (this.playerLeader != null && this.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				return false;
			}
			if (this.playerLeader != null) {
				this.playerLeader.OnTouchDown(touchs);
			}
		}

		public OnTouchMove(touchs: egret.TouchEvent) {
			if (this.playerLeader != null) {
				this.playerLeader.OnTouchMove(touchs);
			}
		}

		public OnTouchUp(touchs: egret.TouchEvent) {
			if (this.playerLeader != null) {
				this.playerLeader.OnTouchUp(touchs);
			}
		}

		public getLeader() {
			return this.playerLeader;
		}

		public updateEndEvent() {
			let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]
			if (progress.info == 0 && Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd == false) {
				Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd = true;
				this.playerLeader.endFightAuto();
			}
		}

		public reqLeaderPos(x, y, successCB, force) {
			if (Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd == true) {
				return;
			}
			if (x <= 0) {
				x = 1;
			}

			let visit_func = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
				let msg = <message.BossMoveResponse>resp;
				if (msg.header.result == 0) {
					if (successCB != null) {
						successCB(this);
					}
					if (this.playerLeader != null) {
						this.playerLeader.resetMoveNet();
					}
					if (msg.body.roleInfo.length != 0) {
						Game.PlayerBossSystem.ActivityBoss.roleInfo = msg.body.roleInfo[0];
						if ((this.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_None || this.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Attack)) {
							this.playerLeader.dealZorkRoleInfo(Game.PlayerBossSystem.ActivityBoss.roleInfo);
							if (this.playerLeader.sceneHpPercent == 0) {
								this.playerLeader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
							}
						}
					}
				}
			}

			let req = new message.DarklandBossMoveRequest();
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

		public revivePersonReq(successCB) {
			let visit_func = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
				let msg = <message.BossDeadCoolingResponse>resp;
				if (msg.header.result == 0 || msg.header.result == 11307) {
					//弹出结算界面试试
					if (successCB != null) {
						successCB();
					}
					if (this.playerLeader != null) {
						this.playerLeader.path = null;
						this.playerLeader.dealZorkRoleInfo(Game.PlayerBossSystem.ActivityBoss.roleInfo);
						this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem);
						this.playerLeader.reSafe();
					}
				} else if (msg.header.result == 10209) {
					TipManager.ShowAddGemStone();
				}
			}
			let req = new message.BossDeadCoolingRequest();
			Game.Controller.send(req, visit_func, null, this, false);
		}

		public SceneItemPosInfoNotice_Visit(e) {
			let data: message.SceneItemPosInfoNoticeRequest = e.data;
			if (Helper.getObjLen(Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
				this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
				Game.PlayerWonderLandSystem.loadingPosInfo = {};
			}
			this.updateNoticePos(Game.PlayerWonderLandSystem.timePosInfo)
			Game.PlayerWonderLandSystem.timePosInfo = {};
		}

		public SceneItemPosNotice_Visit(e) {
			let data: message.SceneItemPosNoticeRequest = e.data;
			this.updateSimplePos(Game.PlayerWonderLandSystem.noticePosInfo);
			Game.PlayerWonderLandSystem.noticePosInfo = {};
		}

		public updateSimplePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				if (this.tableMembers[k] != null) {
					this.tableMembers[k].dealSimpleMoveNotice(v);
				}
			}
		}

		public getEventThings(x, y) {
			let t = [];
			let tbl_move = [];
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

				let tree_x, tree_y = v.getEventPos();
				if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
					continue;
				}
				let info: any = []
				info.type = TableEnum.Enum.LeagueWarTouchType.Npc
				info.data = v
				t.push(info);
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
				let value = tbl_move[rand_value];
				if (Table.VIn(tbl_rand, value) == false) {
					tbl_rand.push(value);
					let info = {};
					let bMember = yuan3(this.tableMembers[value].getLegId() != 0 && this.playerLeader.getLegId() == this.tableMembers[value].getLegId(), true, false);
					info["type"] = Helper.getWonderlandPlayerType(null, bMember);
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
			return yuan3(t.length == 0, false, true)
		}

		public dealEventThings(x, y) {
			let t = this.getEventThings(x, y);
			let doSomeThing = false;
			if (t.length > 1) {
				// let ui = PushUI("League_WarSelectThings")
				// ui:SetInfo( t )
				// ui:SetFather(this)
				// ui:SetPressOutExit()
				doSomeThing = true;
			} else if (t.length == 1) {
				if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Partner) {
					this.pushPersonInterface(t[0].data.playerInfo);
					doSomeThing = true;
				}
			}
			return doSomeThing;
		}

		public pushNpcUi(info) {
			if (info.build_id == TableEnum.Enum.ActivityNpc.ActivityBoss) {
				this.ReqGetMobsInfo();
				if (this.isTouchUiEnabled() == false) {
					toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips);
				}
			}
		}

		public ReqGetMobsInfo() {
			let ReqGetMobsInfo_Visit = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
				let msg = <message.MobsInfoResponse>resp;
				if (msg.header.result == 0) {
					Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
					this.dealFight();
				}
			}
			let req = new message.MobsInfoRequest();
			req.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
			req.body.mobsId = Game.PlayerBossSystem.ActivityBoss.bossId;
			Game.Controller.send(req, ReqGetMobsInfo_Visit, null, this, false);
		}

		public pushPersonInterface(info) {
			// let ui = PushUI("Wonderland_SelectPlayer");
			// ui:SetInfo( info );
			// ui:SetFather(this);
			// ui:SetPressOutExit();
		}

		public addCollectMenu(time, type) {
			this.mainMenu.addControlPop(time, type);
		}

		public deleteCollectMenu() {
			this.mainMenu.deleteControlPop();
		}

		public getLiveBoss() {
			for (let k in this.tableBosses) {
				let v = this.tableBosses[k];
				return v;
			}
			return null;
		}

		public goNearBoss() {
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.activityBossMap);
			let _center_x = tbl[TableEnum.Enum.ActivityNpc.ActivityBoss].build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let _center_y = tbl[TableEnum.Enum.ActivityNpc.ActivityBoss].build_y - (this.playerLeader.verDistance - this.playerLeader.y);

			let _radius = ConstantConfig_ZorkBoss.career_atk_dis[this.playerLeader.profession].max;
			let _in_radius = ConstantConfig_ZorkBoss.career_atk_dis[this.playerLeader.profession].min;
			let [x, y] = [null, null]
			let [mapX, mapY] = [null, null]
			let pi = Math.sin(this.angleToRadian(45));
			let dif = Math.abs(this.playerLeader.y - _center_y);
			let map_x;
			let map_y;
			while (true) {
				//取舍范围
				x = Helper.getRandom2(_center_x, _center_x - _radius);
				let _tmp = yuan3(dif >= _radius, _radius, dif);
				if (dif < 30) {
					y = this.playerLeader.y;
				} else {
					if (_center_y > this.playerLeader.y) {
						let scope_y1 = _center_y - _tmp * pi;
						let scope_y2 = _center_y;
						y = Helper.getRandom2(scope_y1, scope_y2);
					} else {
						let scope_y1 = _center_y;
						let scope_y2 = _center_y + _tmp * pi;
						y = Helper.getRandom2(scope_y1, scope_y2);
					}
				}
				map_x = x + (this.playerLeader.moveDistance - this.playerLeader.x);
				map_y = y + (this.playerLeader.verDistance - this.playerLeader.y);
				let i = Math.floor(map_x / this.Block_Width);
				let j = Math.floor(map_y / this.Block_Width);
				let key = Helper.StringFormat("%d_%d", i, j);
				//判断区间
				let num = Math.abs(y - _center_y) / _radius;
				if (map_x > 0 && map_y > 0 && num <= pi
					&& isPointInCircle(new egret.Point(x, y), new egret.Point(_center_x, _center_y), _radius) == true
					&& isPointInCircle(new egret.Point(x, y), new egret.Point(_center_x, _center_y), _in_radius) == false
					&& this.blocks[key] != null
					&& this.blocks[key].couldCross == true) {
					break;
				}
				[map_x, map_y] = [null, null];
			}
			return [map_x, map_y, x, y];
		}

		public angleToRadian(angle: number): number {
			return angle * (Math.PI / 180);
		}

		public isNeedGoBoss() {
			let tag = null
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.activityBossMap);
			let _center_x = tbl[TableEnum.Enum.ActivityNpc.ActivityBoss].build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let _center_y = tbl[TableEnum.Enum.ActivityNpc.ActivityBoss].build_y - (this.playerLeader.verDistance - this.playerLeader.y);
			let _radius = ConstantConfig_ZorkBoss.boss_attack_outer_radius;
			let inCircle = isPointInCircle(new egret.Point(this.playerLeader.x, this.playerLeader.y), new egret.Point(_center_x, _center_y), _radius);
			if (inCircle == true) {
				tag = false;
			} else {
				tag = true;
			}
			return tag;
		}

		public loadFormation() {
			Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
			loadUI(CommonFormatePveMain).then((dialog: CommonFormatePveMain) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(1);
			});
		}

		public dealFight() {
			let cb = function (thisobj) {
				let cb_child = function (thisobj) {
					thisobj.loadFormation();
				}
				thisobj.reqLeaderPos(thisobj.playerLeader.moveDistance, thisobj.playerLeader.verDistance, cb_child, true);
			}
			this.startAutoFight(cb);
		}

		public startAutoFight(cb) {
			let tag = this.isNeedGoBoss();
			if (tag == null) {
				return;
			}
			if (tag == false) {
				cb(this);
			} else {
				let [mapX, mapY, x, y] = this.goNearBoss();
				if (x != null && y != null) {
					this.playerLeader.startStarPath(x, y, cb, this);
				}
			}
		}

		public hidePerson(hidden) {
			this.bHidePerson = hidden;
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				v.setHidden(hidden);
			}
		}

		public dealFightUi(tag) {
			if (this.mainMenu) {
				this.mainMenu.dealFightUi(tag);
			}
		}

		public hideEffect(hidden) {
			this.bHideEffect = hidden;
			for (let k in this.tableEffects) {
				let v = this.tableEffects[k];
				if (v.belong_role.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_OTHER) {
					v.setVisible(!hidden);
				}
			}
		}

		public ReConnetFun() {
			//BOSS处理
			let boss = this.getLiveBoss();
			if (boss == null) return;
			//判断血量对boss形态进行判断
			boss.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		}

		public testMove(x, y) {
			let visit_func = function () {

			}
			let req = new message.DarklandBossMoveRequest();
			req.body.scene_x = x;
			req.body.scene_y = y;
			Game.Controller.send(req, visit_func, null, this, false);
		}

		public loadPrepare() {
			let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
			let curTime = Game.Controller.serverNow();
			let curSec: number = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
			let num = (progress.info - 1) % 10;
			let dif = curSec - CommonConfig.darkland_boss_open_time[num][0];
			this.prepareTime = dif;
		}

		public updatePrepareTime(tick) {
			if (this.prepareTime <= 0) {
				return;
			}
			let rt = tick * 1000;
			this.prepareTime = this.prepareTime - rt;
			if (this.prepareTime <= 30) {
				// this.mainMenu.BossAppearUi();
				this.bossAppear();
				this.prepareTime = 0
			}
		}

		public bossAppear() {
			let boss = this.getLiveBoss();
			boss.setHidden(false)
			boss.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Appear);
			boss.procState(0)
		}

		public OnExit() {
			this.release();
			if (this.mainMenu) {
				this.mainMenu.close();
				this.mainMenu = null;
			}
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
		}

	}
}