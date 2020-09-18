namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-5
	 * 
	 * @class 冒险副本 流星街 执照 天空竞技场 失败结算
	 */
	export class BattleEnd_Lose extends BattleSettleLose {
		public constructor() {
			super();
			this.ui_name = "BattleEnd_Lose";
			this.skinName = "resource/skins/battleEnd/BattleEndLoseSkin.exml";
		}
		public BattleEnd_Lose: eui.Group;
		public AdaptBoard: eui.Group;
		public NodeBoard: eui.Group;
		public ButtonGoOn: eui.Button;
		public ButtonNextMob: eui.Button;
		public ButtonCause1: eui.Group;
		public SpriteCauseIcon1: eui.Image;
		public SpriteCauseWord1: eui.Image;
		public ButtonCause2: eui.Group;
		public SpriteCauseIcon2: eui.Image;
		public SpriteCauseWord2: eui.Image;
		public ButtonDetail: eui.Button;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public SpriteWordName: eui.Image;
		public LabelInstanceName: eui.Label;
		public SpriteWordTime: eui.Image;
		public LabelInstanceTime: eui.Label;
		public nextMobID;

		public Init() {
			super.Init();
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGoOn, this);
			this.ButtonNextMob.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonNextMob_CallBack, this);
		}
		public Load() {
			super.Load();
			//再战的怪信息
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
			) {
				this.nextMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				this.nextMobID = Game.PlayerTowerSystem.towerInfo.towerCur;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				// this.nextMobID = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
				this.nextMobID = Game.PlayerWantedSystem.wantedCurPos;
			}
		}
		public Update(tick) {
			super.Update(tick)
		}
		//失败返回到到xx界面
		public clickGoOn() {
			this.close();
			egret.clearInterval(this.update);
			Game.UIManager.popAllScenesAndDialogs(() => {
				this.onJump();
			});
		}

		private onJump() {
			// StageSceneManager.Instance.clearScene();
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
				Gmgr.Instance.bPause = false;
				Gmgr.Instance.bReplay = false;
				loadUI(LeagueHomeScene)
					.then((scene: LeagueHomeScene) => {
						scene.init();
						scene.show(UI.SHOW_FROM_TOP);
					});
				loadUI(LeagueBossInfo)
					.then((dialog: LeagueBossInfo) => {
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
				Gmgr.Instance.bPause = false;
				Gmgr.Instance.bReplay = false;
				loadUI(LeagueHomeScene)
					.then((scene: LeagueHomeScene) => {
						scene.init();
						scene.show(UI.SHOW_FROM_TOP);
						scene.onGroupInstance();
					});
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
				this.BossEntryReq();
			} else {
				Gmgr.Instance.bPause = false;
				Gmgr.Instance.bReplay = false;
				Gmgr.Instance.bContinueBattle = false;
				Gmgr.Instance.bStopContinueFromBattle = false;

				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
					let bMaxChapter = !Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType - 1].bReview;
					if (Game.PlayerFormationSystem.saveFrom) {
						Game.PlayerFormationSystem.saveFrom = [];
					} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
						loadUI(LeagueInstanceMain)
							.then((scene: LeagueInstanceMain) => {
								scene.init();
								scene.show(UI.SHOW_FROM_TOP);
							});
					} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
						loadUI(LeagueInstanceMain)
							.then((scene: LeagueInstanceMain) => {
								scene.init();
								scene.show(UI.SHOW_FROM_TOP);
							});
					}
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
					loadUI(SkyAreanMainScene)
						.then((scene: SkyAreanMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.Init();
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
					loadUI(SkyAreanMainScene)
						.then((scene: SkyAreanMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.Init();
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
					loadUI(licenseMain)
						.then((scene: licenseMain) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
					loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
						Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
							dialog.setInfo(data, () => {
							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
					});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {

				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
					loadUI(WantedSecondMeteorstanceScene)
						.then((scene: WantedSecondMeteorstanceScene) => {
							scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
					loadUI(WantedSecondMeteorstanceScene)
						.then((scene: WantedSecondMeteorstanceScene) => {
							scene.Init(Game.PlayerWantedSystem.wantedBossDifficulty + 1);
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {

				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {

				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT) {
					Game.PlayerArenaSystem.craftQureyList(false)
						.then(() => {
							loadUI(ArenaWhole).then((dialog: ArenaWhole) => {
								dialog.show(UI.SHOW_FROM_TOP);
							});
						})
						.catch((reason) => {
							toast(reason);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
					loadUI(HXH_GroupFightMain)
						.then((scene: HXH_GroupFightMain) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
					Game.PlayerArenaSystem.craftQureyList(false)
						.then(() => {
							loadUI(ArenaWhole).then((dialog: ArenaWhole) => {
								dialog.show(UI.SHOW_FROM_TOP);
							});
						})
						.catch((reason) => {
							toast(reason);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
					//有问题
					// loadUI(ArenaWhole)
					// 	.then((scene: ArenaWhole) => {
					// 		scene.show(UI.SHOW_FROM_TOP);
					// 	});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
					loadUI(LeagueHomeScene)
						.then((scene: LeagueHomeScene) => {
							scene.init();
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
					// loadUI(LeagueHomeScene)
					// 	.then((scene: Basti) => {
					// 		scene.init();
					// 		scene.show(UI.SHOW_FROM_TOP);
					// 	});
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT) {

				}
			}
		}
		public clickNext() {
			if (Gmgr.Instance.bContinueBattle) {
				Gmgr.Instance.bContinueBattle = false;
			}
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
			) {
				if (Game.PlayerInstanceSystem.CheckCount(this.nextMobID) == false) {
					this.BuyMobsTime();
				} else if (Game.PlayerInstanceSystem.CheckPower(this.nextMobID, null) == false) {
					loadUI(HXH_HunterUserStrength)
						.then((dialog: HXH_HunterUserStrength) => {
							dialog.SetInfo();
							dialog.show(UI.SHOW_FROM_TOP);
						});
					return;
				} else {
					let stages = TableInstance.Item(this.nextMobID).instance_pack;
					if (Game.PlayerStageSystem.haveStages(stages)) {
						this.BattleStart_Req();
					} else {
						this.MobsInfo_Req();
					}
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				let stages = TableTower.Item(this.nextMobID).tower_pack;
				if (Game.PlayerStageSystem.haveStages(stages)) {
					this.BattleStart_Req();
				} else {
					this.MobsInfo_Req();
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				let stages = TableTower.Item(this.nextMobID).tower_pack;
				if (Game.PlayerStageSystem.haveStages(stages)) {
					this.BattleStart_Req();
				} else {
					this.MobsInfo_Req();
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
				//通缉令类型返回界面
				let cost = [
					Game.PlayerInfoSystem.BaseInfo.wantedCoin,
					Game.PlayerInfoSystem.BaseInfo.arrestCoin
				];
				let floor_info = TableWanted.Item(this.nextMobID);
				if (Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume) {
					loadUI(HXH_HunterUserStrength)
						.then((dialog: HXH_HunterUserStrength) => {
							dialog.SetInfo();
							dialog.show(UI.SHOW_FROM_TOP);
						});
				} else if ((Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_EASY || Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_HARD) && (cost[Game.PlayerMissionSystem.fightExt] < 0)) {
					toast_warning(TextsConfig.TextConfig_Instance.errorCountWanted);
				} else {
					Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED
					this.ReqGetWantedMobsInfo();
				}
			}
			this.close();
		}
		//购买副本挑战次数
		public BuyMobsTime() {

		}
		//拉取副本怪信息
		public MobsInfo_Req() {

			let request = new message.MobsInfoRequest();
			request.body.battleType = Game.PlayerInstanceSystem.curInstanceType;
			request.body.mobsId = this.nextMobID
			Game.Controller.send(request, (request: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				if (response.header.result != 0) {
					//reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.MobsInfo_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				//reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public MobsInfo_Visit() {
			this.BattleStart_Req();
		}
		//发起战斗
		public BattleStart_Req() {
			let req = new message.BattleStartRequest();
			req.body.type = Game.PlayerInstanceSystem.curInstanceType;
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
			) {
				req.body.id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
				req.body.id = Game.PlayerTowerSystem.towerInfo.towerCur;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
				// req.body.id = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				//req.body.id = Player.licenseCurPos;
			}
			req.body.ext = 0;

			Game.Controller.send(req, (request: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				if (response.header.result != 0) {
					//reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.BattleStart_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				//reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public BattleStart_Visit() {
			Game.PlayerFormationSystem.saveFormations();
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
			) {
				StageSceneManager.Instance.ChangeScene(StageSceneFightNormal);
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER
			) {
				StageSceneManager.Instance.ChangeScene(StageSceneFightTower)
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
				// StageSceneManager.Instance.ChangeScene(StageSceneFightLicense);
			}
		}
		//拉怪
		public ReqGetWantedMobsInfo() {
			let req = new message.MobsInfoRequest();
			req.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED;
			req.body.mobsId = this.nextMobID;
			Game.Controller.send(req, (request: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				if (response.header.result != 0) {
					//reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.ReqGetWantedMobsInfo_Visit();
				return;
			}, (req: aone.AoneRequest): void => {
				//reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public ReqGetWantedMobsInfo_Visit() {
			// Player.wantedCurPos = self.nextMobID;
			this.BattleStartWanted_Req();
		}
		//通缉令战斗
		public BattleStartWanted_Req() {
			let req = new message.BattleStartRequest();
			req.body.type = message.EFormationType.FORMATION_TYPE_WANTED
			req.body.id = this.nextMobID;
			req.body.ext = 0;
			Game.Controller.send(req, (request: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BattleStartResponse>resp;
				if (response.header.result != 0) {
					//reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.BattleStartWanted_Visit(response);
				return;
			}, (req: aone.AoneRequest): void => {
				//reject(LANG("请求超时"));
				return;
			}, this, false);
		}
		public BattleStartWanted_Visit(response: message.BattleStartResponse) {
			if (response.header.result == message.EC.SUCCESS) {
				StageSceneManager.Instance.ChangeScene(StageSceneFightWanted)
				// gmsound.Ui_GOTO_FIGHT()
			} else {
				// GameCommon: ShowMessage(getErrorString(result))
			}
		}
	}
}