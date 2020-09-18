namespace zj {
	/**
		 * @author xing li wei
		 * 
		 * @date 2019-4-5
		 * 
		 * @class 冒险副本 流星街 执照 天空竞技场 成功结算
		 */
	export class BattleEnd_Win extends BattleSettleWinDrop {
		public ButtonNextMob: eui.Button
		public bTenContinue;
		public bHasStart;
		public ButtonGoOn: eui.Button;
		// public update;
		public constructor() {
			super();
			this.ui_name = "BattleEnd_Win";
			this.skinName = "resource/skins/battleEnd/BattleEndWinSkin.exml";
			this.bHasStart = false;
			this.bTenContinue = false;
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGoOn, this);
			this.ButtonNextMob.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonNextMob_CallBack, this);
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
				this.ButtonNextMob.scaleX = 0;
				this.ButtonNextMob.touchEnabled = false;
			}
		}

		public Init() {
			super.Init();
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				if (this.scene.bEliteReview) {
					Set.ButtonBackgroud(this.ButtonNextMob, UIConfig.UIConfig_BattleSettleResult.againButton[0], UIConfig.UIConfig_BattleSettleResult.againButton[1]);
				} else {

				}
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
				if (Gmgr.Instance.isKeepContinueUI()) {
					if (Gmgr.Instance.bContinueBattle && Gmgr.Instance.isContinueNumMax()) {
						this.bTenContinue = true;
					}
					if (this.bTenContinue) {
						Set.ButtonBackgroud(this.ButtonNextMob, UIConfig.UIConfig_BattleSettleResult.againTen[0], UIConfig.UIConfig_BattleSettleResult.againTen[1]);
					} else {
						Set.ButtonBackgroud(this.ButtonNextMob, UIConfig.UIConfig_BattleSettleResult.againButton[0], UIConfig.UIConfig_BattleSettleResult.againButton[1]);
					}
				} else {
					if (this.scene.bWantedReview) {
						Set.ButtonBackgroud(this.ButtonNextMob, UIConfig.UIConfig_BattleSettleResult.againButton[0], UIConfig.UIConfig_BattleSettleResult.againButton[1]);
					} else {

					}
				}
			}
		}
		public Load() {
			super.Load();
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				//下一个怪ID，继续攻打有用
				this.nextMobID = Game.PlayerTowerSystem.towerInfo.towerCur;
				if (Gmgr.Instance.bContinueBattle) {
					if (TableTower.Item(this.nextMobID) == null) {
						Gmgr.Instance.bStopContinueFromBattle = true;
					}
				}
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				//下一个怪ID，继续攻打有用
				// this.nextMobID = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
				if (Gmgr.Instance.bContinueBattle) {
					if (TableTower.Item(this.nextMobID) == null) {
						Gmgr.Instance.bStopContinueFromBattle = true
					}
				}
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				//下一个怪ID，继续攻打有用
				this.nextMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID + 1;
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				//再战
				if (this.scene.bEliteReview) {
					this.nextMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
				} else {
					this.nextMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID + 1;
				}
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
				if (Gmgr.Instance.isKeepContinueUI()) {
					this.nextMobID = Game.PlayerWantedSystem.wantedCurPos;
				} else {
					if (this.scene.bWantedReview) {
						this.nextMobID = Game.PlayerWantedSystem.wantedCurPos;
					} else {
						this.nextMobID = Game.PlayerWantedSystem.wantedCurPos + 1;
					}
				}
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				//下一个怪ID，继续攻打有用
				this.nextMobID = Game.PlayerMissionSystem.licenseCurPos;
			}
		}

		public Update(tick) {
			super.Update(tick);
		}

		private isTeachAni() {
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				let info: CustomInstanceInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
				if (info.curMobID >= info.maxMobID - 1) {
					let areaId = Number(Game.PlayerInstanceSystem.getAreaIdByLastMobId(info.curMobID));
					if (areaId > 0) {
						if (info.mobsMap[info.curMobID] && info.mobsMap[info.curMobID].allTime == 1) return true;
					}
				}
			}
			return false;
		}

		//成功点击返回到到xx界面
		public clickGoOn() {
			if (this.isTeachAni()) Game.TeachSystem.playAreaAnimate = true;
			Game.TeachSystem.battleEndOpenTeach = false;
			//关闭战斗
			StageSceneManager.Instance.clearScene();
			this.close();

			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				this.clickGoOn_Instance()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				this.clickGoOn_Tower()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				this.clickGoOn_Tower()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
				this.clickGoOn_Wanted()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				this.clickGoOn_License()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
				//this.BossEntryReq()
				this.QuitBossFight()
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
				Gmgr.Instance.bPause = false
				Gmgr.Instance.bReplay = false
				Game.UIManager.popAllScenesAndDialogs(() => {
					loadUI(LeagueHomeScene)
						.then((scene: LeagueHomeScene) => {
							scene.init();
							scene.show(UI.SHOW_FROM_TOP);
							scene.onGroupAnimal();
							Game.TeachSystem.battleEndOpenTeach = true;
						});
				});

			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
				Gmgr.Instance.bPause = false
				Gmgr.Instance.bReplay = false
				Game.UIManager.popAllScenesAndDialogs(() => {
					loadUI(LeagueHomeScene)
						.then((scene: LeagueHomeScene) => {
							scene.init();
							scene.show(UI.SHOW_FROM_TOP);
							scene.onGroupInstance();
							Game.TeachSystem.battleEndOpenTeach = true;
						});
				});
			} else {
				Gmgr.Instance.bPause = false;
				Gmgr.Instance.bReplay = false;
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						loadUI(SkyAreanMainScene)
							.then((scene: SkyAreanMainScene) => {
								scene.show(UI.SHOW_FROM_TOP);
								scene.Init();
								Game.TeachSystem.battleEndOpenTeach = true;
							});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						loadUI(licenseMain)
							.then((scene: licenseMain) => {
								scene.show(UI.SHOW_FROM_TOP);
								Game.TeachSystem.battleEndOpenTeach = true;
							});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
							Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
								dialog.setInfo(data, () => {
								});
								dialog.show(UI.SHOW_FROM_TOP);
								Game.TeachSystem.battleEndOpenTeach = true;
							});
						});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						loadUI(WantedSecondMeteorstanceScene)
							.then((scene: WantedSecondMeteorstanceScene) => {
								scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
								scene.show(UI.SHOW_FROM_TOP);
								Game.TeachSystem.battleEndOpenTeach = true;
							});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						loadUI(WantedSecondMeteorstanceScene)
							.then((scene: WantedSecondMeteorstanceScene) => {
								scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
								scene.show(UI.SHOW_FROM_TOP);
								Game.TeachSystem.battleEndOpenTeach = true;
							});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
					toast_warning("错误");
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
					toast_warning("经验或游戏币副本");
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
					Game.UIManager.popAllScenesAndDialogs(() => {
						this.checkAreaFinish();
					});
					return;
				}
			}
			this.checkAreaFinish();
		}

		private checkAreaFinish() {
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				let info: CustomInstanceInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
				if (info.curMobID >= info.maxMobID - 1) {
					let areaId = Number(Game.PlayerInstanceSystem.getAreaIdByLastMobId(info.curMobID));
					if (areaId > 0) {
						let mob = info.mobsMap[info.curMobID];
						if (mob && mob.allTime == 1) {
							Game.TeachSystem.playAreaAnimate = true;
							Common_AnimationB.initResCachekeys(areaId);
							loadUI(Common_AnimationB)
								.then((dailog: Common_AnimationB) => {
									dailog.LoadAni(areaId);
									dailog.show();
								});
						}
					}
				}
			}
		}

		public clickNext() {
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				this.clickNext_Tower();
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				this.clickNext_Tower();
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
				this.clickNext_Wanted();
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				this.clickNext_Instance();
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				this.clickNext_License();
			}
		}

		//爬塔
		//----------------------------------------------------------------------------------
		public returnFromTower() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(SkyAreanMainScene)
					.then((scene: SkyAreanMainScene) => {
						scene.show(UI.SHOW_FROM_TOP);
						scene.Init();
					});
			});
		}
		public clickGoOn_Tower() {
			if (Gmgr.Instance.bContinueBattle && Gmgr.Instance.isContinueNumMax()) {
				return;
			}
			if (Gmgr.Instance.bContinueBattle) {
				Game.UIManager.popAllScenesAndDialogs(() => {
					loadUI(HunterMainScene)
						.then((scene: HunterMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							Game.TeachSystem.battleEndOpenTeach = true;
						});
				});
				// loadUI(HunterMainScene)
				// .then((scene: ) => {
				//     scene.show(UI.SHOW_FROM_TOP);
				// });
				// TipMgr:ShowSuccessionBattlePopTip(true, self,
				//     function()
				//         Gmgr.bContinueBattle = false
				//         Gmgr:clearContinueBattleData()
				//         this.returnFromTower()
				//     end
			} else {
				this.returnFromTower();
			}

		}
		//下一关
		public clickNext_Tower() {
			if (TableTower.Item(this.nextMobID) == null) {
				toast_warning(TextsConfig.TextConfig_Tower.errClear);
				return;
			}
			if (Gmgr.Instance.bContinueBattle && Gmgr.Instance.isContinueNumMax()) {
				return;
			}
			let stages = null;
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				stages = TableTower.Item(this.nextMobID).tower_pack[Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2 + 1];
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				// stages = TableTower.Item(this.nextMobID).tower_pack[Game.PlayerInstanceSystem.InstanceInfo.high_monsterTowerIndex % 2 + 1];
			}

			if (stages instanceof Array) {

			} else {
				stages = [stages];
			}
			if (Game.PlayerStageSystem.haveStages(stages)) {
				this.LoadEnemys()
				this.BattleStartTower_Req()
			} else {
				this.MobsInfoTower_Req()
			}
		}
		//拉取副本怪信息
		public MobsInfoTower_Req() {
			let request = new message.MobsInfoRequest();
			request.body.battleType = Game.PlayerInstanceSystem.curInstanceType;
			request.body.mobsId = this.nextMobID;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				//console.log(response);
				if (response.header.result != 0) {
					//reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.MobsInfoTower_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public MobsInfoTower_Visit() {
			this.LoadEnemys();
			this.BattleStartTower_Req();
		}
		//发起战斗
		public BattleStartTower_Req() {
			if (this.bHasStart) {
				return;
			}
			let id = Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER && Game.PlayerTowerSystem.towerInfo.towerCur //|| Game.PlayerTowerSystem.towerInfo.high_tower_cur;

			let request = new message.BattleStartRequest();
			request.body.type = Game.PlayerInstanceSystem.curInstanceType;
			request.body.id = id
			request.body.ext = 0

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				this.BattleStartTower_Visit(response.header.result);
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public BattleStartTower_Visit(result) {
			if (result == message.EC.SUCCESS) {
				if (Gmgr.Instance.autoContinueBattleNum()) {
					this.bHasStart = true;
				}

				let FightCB = () => {
					this.CacheSkillSpineId(Game.PlayerInstanceSystem.curInstanceType);
					StageSceneManager.Instance.ChangeScene(StageSceneFightTower);
				}
				FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, FightCB, this);
				this.close();
				//gmsound.Ui_GOTO_FIGHT()
			} else if (result == message.EC.XG_LACK_POWER) {
				loadUI(HXH_HunterUserStrength)
					.then((dialog: HXH_HunterUserStrength) => {
						dialog.SetInfo();
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				toast_warning(Game.ConfigManager.getAone2CodeReason(result));
			}
		}
		public enemys = [];
		public CacheSkillSpineId(type) {
			Gmgr.Instance.relatedAsynDataId = [];
			for (let i = 0; i < this.enemys.length; i++) {
				let v = this.enemys[i];
				let info = Game.PlayerMobSystem.Instance(v.id);
				Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
			}
		}
		//执照
		//--------------------------------------------------------------------------------------------
		public clickGoOn_License() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(licenseMain)
					.then((scene: licenseMain) => {
						scene.show(UI.SHOW_FROM_TOP);
						Game.TeachSystem.battleEndOpenTeach = true;
					});
			});
		}
		public clickNext_License() {
			if (Game.PlayerMissionSystem.itemLicense(this.nextMobID) == null) {
				return;
			}
			let stages = Game.PlayerMissionSystem.itemLicense(this.nextMobID).battle_id;
			if (Game.PlayerStageSystem.haveStages(stages)) {
				this.BattleStartLicense_Req();
			} else {
				this.MobsInfoLicense_Req();
			}
		}
		//拉取怪信息
		public MobsInfoLicense_Req() {
			let request = new message.MobsInfoRequest();
			request.body.battleType = Game.PlayerInstanceSystem.curInstanceType;
			request.body.mobsId = this.nextMobID;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				//console.log(response);
				if (response.header.result != 0) {
					Game.ConfigManager.getAone2CodeReason(response.header.result)
					return;
				}
				this.MobsInfoLicense_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public MobsInfoLicense_Visit() {
			this.LoadEnemys();
			this.BattleStartLicense_Req();
		}
		//发起战斗
		public BattleStartLicense_Req() {
			let request = new message.BattleStartRequest();
			request.body.type = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
			request.body.id = Game.PlayerMissionSystem.licenseCurPos;
			request.body.ext = 0;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				//console.log(response);
				if (response.header.result != 0) {
					return;
				}
				this.BattleStartLicese_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public BattleStartLicese_Visit() {
			this.CacheSkillSpineId(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);
			// StageSceneManager.Instance.ChangeScene(StageSceneFightLicense);
			//gmsound.Ui_GOTO_FIGHT();
			this.close();
		}
		//通缉令
		//---------------------------------------------------------------------------------
		public returnFromWanted() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(WantedSecondMeteorstanceScene)
					.then((scene: WantedSecondMeteorstanceScene) => {
						scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
						scene.show(UI.SHOW_FROM_TOP);
						Game.TeachSystem.battleEndOpenTeach = true;
					});
			});
		}
		public clickGoOn_Wanted() {
			if (Gmgr.Instance.bContinueBattle && Gmgr.Instance.isContinueNumMax()) {
				return;
			}
			if (Gmgr.Instance.bContinueBattle) {
				// TipManager.Show
				//连续战斗界面
			} else {
				this.returnFromWanted();
			}
		}
		public clickNext_Wanted() {
			if (Gmgr.Instance.bContinueBattle && Gmgr.Instance.isContinueNumMax()) {
				return;
			}
			//通缉令类型返回界面
			let cost = [Game.PlayerInfoSystem.BaseInfo.wantedCoin, Game.PlayerInfoSystem.BaseInfo.arrestCoin];
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
				let floor_info = otherdb.WantedInstance(this.nextMobID);
				let bFirstReward = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_info.wanted_id) == -1;

				if (Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume && !bFirstReward) {
					if (!Gmgr.Instance.checkContinueBattleSettle(true, null)) {
						//增加体力
						loadUI(HXH_HunterUserStrength)
							.then((dialog: HXH_HunterUserStrength) => {
								dialog.SetInfo();
								dialog.show(UI.SHOW_FROM_TOP);
							});
					}
				} else if ((Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_EASY || Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_HARD) && (cost[Game.PlayerMissionSystem.fightExt]) < 0) {
					toast_warning(TextsConfig.TextConfig_Instance.errorCountWanted);
				} else {
					if (this.bTenContinue) {
						// TipManager.Show
						// 连续战斗界面
					} else {
						Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED;
						this.ReqGetWantedMobsInfo();
					}
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
				Gmgr.Instance.bPause = false;
				Gmgr.Instance.bReplay = false;
				Game.UIManager.popAllScenesAndDialogs(() => {
					loadUI(WantedSecondMeteorstanceScene)
						.then((scene: WantedSecondMeteorstanceScene) => {
							scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
							scene.show(UI.SHOW_FROM_TOP);
						});
				});
			}



		}
		//拉怪
		public ReqGetWantedMobsInfo() {
			let request = new message.MobsInfoRequest();
			request.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED
			request.body.mobsId = this.nextMobID;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				if (response.header.result != 0) {
					return;
				}
				this.ReqGetWantedMobsInfo_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public ReqGetWantedMobsInfo_Visit() {
			Game.PlayerWantedSystem.wantedCurPos = this.nextMobID;
			this.LoadEnemys();
			this.BattleStartWanted_Req();
		}
		//通缉令战斗
		public BattleStartWanted_Req() {
			if (this.bHasStart) {
				return;
			}
			let request = new message.BattleStartRequest();
			request.body.type = Game.PlayerInstanceSystem.curInstanceType;
			request.body.id = Game.PlayerWantedSystem.wantedCurPos;
			request.body.ext = 0

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				this.BattleStartWanted_Visit(response.header.result);
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public BattleStartWanted_Visit(result) {
			if (result == message.EC.SUCCESS) {
				if (Gmgr.Instance.autoContinueBattleNum()) {
					this.bHasStart = true;
				}
				let FightCB = () => {
					this.CacheSkillSpineId(message.EFormationType.FORMATION_TYPE_WANTED);
					Game.SoundManager.playEffect(SoundManager.SoundOpen(30058), 100);
					StageSceneManager.Instance.ChangeScene(StageSceneFightWanted)
				}
				FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_WANTED, FightCB, this);
				this.close();
				//gmsound.Ui_GOTO_FIGHT()
			} else {
				toast_warning(Game.ConfigManager.getAone2CodeReason(result));
			}
		}
		//副本
		//---------------------------------------------------------------------------------
		//胜利返回到到xx界面
		public clickGoOn_Instance() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.EventManager.event(GameEvent.PLAYER_HUNTER_BADGE);
			Game.TeachSystem.battleEndOpenTeach = true;
			// let bMaxChapter = !Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview;
			// if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.NORMAL) {
			// 	// Game.UIManager.popAllScenesAndDialogs();
			// 	loadUI(Adventurems)
			// 		.then((scene: Adventurems) => {
			// 			scene.show(UI.SHOW_FROM_TOP);
			// 			scene.LoadFromBattleNormal(bMaxChapter);
			// 		});
			// } else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.ELITE) {
			// 	// Game.UIManager.popAllScenesAndDialogs();
			// 	loadUI(Adventurems)
			// 		.then((scene: Adventurems) => {
			// 			scene.show(UI.SHOW_FROM_TOP);
			// 			scene.LoadFromBattleElite(bMaxChapter);
			// 		});
			// }

		}
		//继续攻打下一关
		public clickNext_Instance() {
			if (Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear == true && Game.PlayerInstanceSystem.InstanceFun(this.nextMobID) == null) {
				toast_warning(TextsConfig.TextConfig_Instance.errClear);
			} else if (Game.PlayerInstanceSystem.CheckCount(this.nextMobID) == false) {
				// this.Buy
			} else if (Game.PlayerInstanceSystem.CheckPower(this.nextMobID) == false) {
				loadUI(HXH_HunterUserStrength)
					.then((dialog: HXH_HunterUserStrength) => {
						dialog.SetInfo();
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				let stages = Game.PlayerInstanceSystem.InstanceFun(this.nextMobID).instance_pack;
				if (Game.PlayerStageSystem.haveStages(stages)) {
					this.BattleStartInstance_Req();
				} else {
					this.MobsInfoInstance_Req();
				}
			}
		}

		//发起战斗
		public BattleStartInstance_Req() {
			//设置当前怪物信息
			Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID = this.nextMobID;

			let request = new message.BattleStartRequest();

			let type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				type = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
			}
			request.body.type = type
			request.body.id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
			request.body.ext = 0;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				//console.log(response);
				if (response.header.result != 0) {
					return;
				}
				this.BattleStartInstance_Visit(response.header.result);
				return;
			}, (req: aone.AoneRequest): void => {
				// reject(LANG("请求超时"));
				return;
			}, this, false);
		}

		public BattleStartInstance_Visit(result: number) {
			if (result == message.EC.SUCCESS) {
				if (Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID == Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID) {
					Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = false;
				} else {
					Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
				}
				if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
					Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
				}

				let FightCB = () => {
					Game.PlayerFormationSystem.saveFormations();
					StageSceneManager.Instance.ChangeScene(StageSceneFightNormal);
				}
				FightLoading.getInstance().loadFightRes(Game.PlayerInstanceSystem.curInstanceType, FightCB, this);
				this.close();
			}
		}

		public MobsInfoInstance_Req() {
			this.MobsInfo(Game.PlayerInstanceSystem.curInstanceType, this.nextMobID)
				.then(() => {
					this.LoadEnemys();
					this.BattleStartInstance_Req();
				}).catch(() => {

				})
		}



		private LoadEnemys() {
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				let cell = Game.PlayerTowerSystem.towerInfo.towerCur;
				let stages = TableTower.Item(cell).tower_pack[Game.PlayerInstanceSystem.MonsterTowerIndex % 2];
				this.enemys = getEnemyFomation([stages - 1]);
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				// let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
				// let stages = TableTower.Item(cell).tower_pack[Game.PlayerInstanceSystem.High_monsterTowerIndex % 2];
				// this.enemys = getEnemyFomation([stages]);
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				let stages = TableInstance.Item(Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID).instance_pack;
				this.enemys = getEnemyFomation(stages);
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
				let cell = Game.PlayerWantedSystem.wantedCurPos;
				let stages = TableWanted.Item(cell).instance_pack;
				this.enemys = getEnemyFomation(stages);
			} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				let stages = TableMissionLicence.Item(Game.PlayerMissionSystem.licenseCurPos).battle_id;
				this.enemys = getEnemyFomation([stages]);
			}
		}

		public MobsInfo(type: number, nextMobId: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.MobsInfoRequest();
				request.body.battleType = type;
				request.body.mobsId = nextMobId;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.MobsInfoResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve();
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}


	}
}