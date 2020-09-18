namespace zj {
	export class Fight_Main extends UI {
		public constructor() {
			super();
			this.skinName = "resource/skins/fight/Fight_MainSkin.exml";

			this.scene = StageSceneManager.Instance.GetCurScene();
			this.roleMsg = null

			this.itemBoss = null;
			this.bMeetBoss = false

			this.tableEnemyUi = []
			this.time_id = -1
			this.time_step = 0
			this.move_step = 0

			this.load_id = -1
			this.load_step = 0

			this.tableUiPos = [];
		}
		public ButtonTowerBack: eui.Button;
		public scene;
		public roleMsg;
		public itemBoss;
		public relicFight;
		public bMeetBoss;
		public tableEnemyUi = [];
		public time_id;
		public time_step;
		public move_step;
		public load_id;
		public load_step;
		public tableUiPos = [];

		//初始化ui
		public Init() {
			this.ShowTansFunc();
			this.CheckTeachNetError();
		}
		public CheckTeachNetError() {
			if (Gmgr.Instance.bDisconnectNet == true && Gmgr.Instance.bInAIFightType() == 5) {
				TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Reconnect.disconnect, () => {
					//GameCommon.ReLogin()
				});
			}
		}
		private update;
		public ShowTansFunc() {
			this.ButtonTowerBack.visible = false;
			// this.update = egret.setInterval(this.Update, this, 0);
			this.doLoad();
		}
		public preLoadMonsterPic() {

		}
		public NoticeMsgInfo(general) {
			if (general.bEnemy == true) {

			} else {
				if (this.roleMsg != null) {
					this.roleMsg.FreshBlood(general);
				}
			}
		}
		public Update(dt) {

		}
		public ConfirmCallB() {

		}
		public doDieUi(pos, isBoss) {
			if (isBoss == true) {
				//this.bossDie();
			}
		}
		public doBossAppear() {
			let des_y = Device.screenHeight - 95 - 32;
			let bossIndex = this.scene.bossPosIndex;
			this.creatBossUi(bossIndex, 0);
			this.doAction(this.itemBoss, 500, new egret.Point(Device.screenWidth - 524, 0), null);
		}
		public doFillUi(role) {
			let pos = role.getTeamNum() + 1;
			if (role.bEnemy == false) {

			} else {
				if (this.scene.isBossAppear() && pos == this.scene.bossPosIndex) {
					this.doBossAppear();
				}
			}
		}
		public doSingleBossAppear() {
			this.creatBossUi(2, 0);
			this.doAction(this.itemBoss, 0.5, new egret.Point(Device.screenWidth - 524, 0), null);
		}
		public doSingleMonsterAppear(pos, bossAppear) {
			this.creatBossUi(pos, bossAppear);
		}
		private timer_id;
		public loadMeetMonsterUi() {
			for (let i = 3; i >= 0; i--) {
				if (this.scene.tableEnemyKey[i] != null) {
					if (this.scene.isBossAppear() == true && i == this.scene.bossPosIndex) {
						this.creatBossUi(i, 0);
					}
				}
			}
			this.timer_id = egret.setInterval(this.doStep, this, 250);
		}
		public doLoad() {
			this.load_id = egret.setInterval(this.doLoadStep, this, 300);
		}
		public doTeach() {
			if (this.load_step == 2) {
				this.loadMeetMonsterUi();
			} else if (this.load_step == 4) {
				egret.clearInterval(this.load_id);
				this.load_step = -1;
			}
		}
		public doNormal() {
			if (this.load_step == 1) {
				this.scene.judgeFightStart();
			} else if (this.load_step == 2) {
				this.roleMsg = this.AddSubWin(Fight_RoleMsg);
				Game.EventManager.event(GameEvent.SHOW_FIGHT_UI, { typeName: "zj.Fight_RoleMsg" });
			} else if (this.load_step == 3) {
				this.loadMeetMonsterUi();
			} else if (this.load_step == 4) {
				if (Gmgr.Instance.bReplay == false) {
					if (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == Gmgr.Instance.fightType ||
						message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == Gmgr.Instance.fightType ||
						message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND == Gmgr.Instance.fightType ||
						message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND == Gmgr.Instance.fightType) {
						//普通副本和精英副本
						let fight = this.AddSubWin(Fight_InstanceUI);
					}
					else if (message.EFormationType.FORMATION_TYPE_LADDER_ATTACK == Gmgr.Instance.fightType) {
						//竞技场
						let itemArenaUi = this.AddSubWin(Fight_Arena);
					}
					// else if(message.EFormationType.FORMATION_TYPE_MINE_SNATCH == Gmgr.Instance.fightType){
					// 	//抢矿
					// 	let itemSnatchMine = this.AddSubWin(Fight_Mine);
					// }
					else if (message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER == Gmgr.Instance.fightType) {
						//爬塔
						let instanceTower = this.AddSubWin(Fight_Tower);
					}
					else if (message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER == Gmgr.Instance.fightType) {
						//高级爬塔
						let instanceTower = this.AddSubWin(Fight_Tower);
					}
					else if (message.EFormationType.FORMATION_TYPE_INSTANCE_EXP == Gmgr.Instance.fightType) {
						//经验或游戏币副本
						let expOrCoin = this.AddSubWin(Fight_Bastille);
					}
					else if (message.EFormationType.FORMATION_TYPE_WANTED == Gmgr.Instance.fightType) {
						//通缉令类型
						let itemWantedUi = this.AddSubWin(Fight_Wanted);
					}
					else if (message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP == Gmgr.Instance.fightType) {
						//通缉令山洞类型
						let itemWantedUi = this.AddSubWin(Fight_WantedSecondEnemy);
					}
					// else if(message.EFormationType.FORMATION_TYPE_TRAINING == Gmgr.Instance.fightType){
					// 	//训练副本
					// 	let trainUi = this.AddSubWin("Fight_Train");
					// }
					else if (message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS == Gmgr.Instance.fightType) {
						//联盟boss
						let leagueBoss = this.AddSubWin(Fight_LeagueBoss);
					}
					else if (message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE == Gmgr.Instance.fightType) {
						//联盟副本
						let leagueBoss = this.AddSubWin(Fight_LeagueInstance);
					}
					else if (message.EFormationType.FORMATION_TYPE_ZORK == Gmgr.Instance.fightType) {
						//世界boss
						let zorkBoss = this.AddSubWin(Fight_ZorkBoss);
					}
					// else if(message.EFormationType.FORMATION_TYPE_CONTEND == Gmgr.Instance.fightType){
					// 	//竞技场联赛
					// 	let arenaStarcraft = this.AddSubWin(Fight_Starcraft);
					// }
					else if (message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK == Gmgr.Instance.fightType) {
						//跨服战
						let arenaStarcraft = this.AddSubWin(Fight_Single);
					}
					else if (message.EFormationType.FORMATION_TYPE_MATCH_ATTACK == Gmgr.Instance.fightType) {
						//联赛工会战斗
						let arenaStarcraft = this.AddSubWin(Fight_Match);
					}
					else if (message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT == Gmgr.Instance.fightType) {
						//天命
						//let lifeUi = this.AddSubWin(Fight_Life);
					}
					else if (message.EFormationType.FORMATION_TYPE_MISSION_LICENCE == Gmgr.Instance.fightType) {
						//执照
						let LicenseUi = this.AddSubWin(Fight_License);
					}
					else if (message.EFormationType.FORMATION_TYPE_PVP_SIMPLE == Gmgr.Instance.fightType) {
						//1v1 切磋
						let SingleBattle = this.AddSubWin(Fight_SingleBattle);
					}
					else if (message.EFormationType.FORMATION_TYPE_PVP_THIRD == Gmgr.Instance.fightType) {
						//3v3 切磋
						let ThreeBattle = this.AddSubWin(Fight_ThreeBattle);
					}
					else if (message.EFormationType.FORMATION_TYPE_GROUP_FIGHT == Gmgr.Instance.fightType) {
						//组队战飞龙营地
						let GroupFight = this.AddSubWin(Fight_GroupFight);
					}
					else if (message.EFormationType.FORMATION_TYPE_RELIC == Gmgr.Instance.fightType) {
						//遗迹战 遗迹探索
						this.relicFight = this.AddSubWin(Fight_Relic);
					}
					else if (message.EFormationType.FORMATION_TYPE_ACTIVITY == Gmgr.Instance.fightType) {
						// 活动副本 猎人故事副本
						let activityFight = this.AddSubWin(Fight_Activity)
					}
					else if (message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS == Gmgr.Instance.fightType) {
						// 活动Boss 年兽
						let activityFight = this.AddSubWin(Fight_ActivityBoss); // 打年兽积分显示
					}
				} else {
					//let replayUi = this.AddSubWin(Fight_Replay);
				}
			} else if (this.load_step == 8) {

			} else if (this.load_step == 10) {

			} else if (this.load_step == 12) {
				egret.clearInterval(this.load_id);
				this.load_step = -1;
			}
		}
		private viewArr = [];
		public AddSubWin(claName) {

			let view: any = newUI(claName);
			//view.ui_name = claName;
			view.height = UIManager.StageHeight;
			view.width = UIManager.StageWidth;
			view.Init();
			this.addChild(view);
			this.viewArr.push(view);
			return view;
		}
		public DeleteSubWin(cla) {
			if (cla && cla.parent) {
				cla.OnExit();
				cla.parent.removeChild(cla);
				cla.close();
				cla = null;
			}
		}
		public doLoadStep() {
			if (this.load_step == -1) {
				return;
			}
			this.load_step = this.load_step + 1;
			if (TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH == Gmgr.Instance.fightType) {
				this.doTeach();
			} else {
				this.doNormal();
			}
		}
		public doAction(ui, _time, moveByPos, callBack) {
			let _tmp = ConstantConfig_BattleTbl.BATTLE_AUTO_SPEED_UI[Gmgr.Instance.bakeSpeedIndex];
			let time = _time / _tmp;
			function callNil() {
				ui.actionTag = false;
			}
			// egret.Tween.get(ui).to({ x: moveByPos.x}, time,callNil);
			ui.moveTag = true;
			ui.actionTag = true;
		}
		public doStep() {
			if (this.time_step == -1) {
				return;
			}
			this.time_step = this.time_step + 1;
			if (this.scene.isBossAppear() == true) {
				if (this.itemBoss.moveTag == false) {
					let index = this.searchNearMove();
					if (index == -1) {
						this.doAction(this.itemBoss, 500, new egret.Point(Device.screenWidth - 524, 0), null);
					} else {
						this.move_step = this.move_step + 1;
						let moveByX = -(82 + this.move_step * 152 + (this.move_step - 1) * 10);
						this.doAction(this.tableEnemyUi[index], 300, new egret.Point(moveByX, 0), null);
					}
				} else {
					egret.clearInterval(this.load_id);
					this.load_id = -1;
				}
			} else {
				let index = this.searchNearMove();
				if (index == -1) {
					egret.clearInterval(this.time_id);
					this.time_id = -1;
				} else {
					this.move_step = this.move_step + 1;
					let moveByX = -(20 + this.move_step * 152 + (this.move_step - 1) * 10);
					this.doAction(this.tableEnemyUi[index], 300, new egret.Point(moveByX, 0), null);
				}
			}
		}
		public searchNearMove() {
			for (let i = 3; i < 0; i--) {
				if (this.tableEnemyUi[i] != null && this.tableEnemyUi[i].moveTag == false) {
					return i;
				}
			}
			return -1;
		}
		public creatBossUi(pos, y) {
			this.DeleteSubWin(this.itemBoss);
			this.itemBoss = this.AddSubWin(Fight_ItemBoss);
			if (this.itemBoss == null) {
				return;
			}
			let t = this.scene.getEnemys();
			let boss = t[this.scene.tableEnemyKey[pos]];
			this.itemBoss.SetInfo(boss);
			this.itemBoss.Load();
			//this.itemBoss.SetFather(this);
		}
		private itemEnemy;
		public creatMonsterUi(pos, bBossStep) {
			let y = yuan3(bBossStep == false, -15, -95);
			this.DeleteSubWin(this.itemEnemy);
			//this.itemEnemy = this.AddSubWin(Fight_ItemEnemy);
			if (this.itemEnemy == null) {
				return;
			}
			let t = this.scene.getEnemys();
			let monster = t[this.scene.tableEnemyKey[pos]];
			this.itemEnemy.SetInfo(monster);
			this.itemEnemy.Load();
			this.itemEnemy.SetBossStep(bBossStep);
			this.itemEnemy.x = Device.screenWidth;
			this.itemEnemy.y = Device.screenHeight - y;
			//this.itemEnemy.SetFather(this);
			this.tableEnemyUi[pos] = this.itemEnemy;
		}
		public Pause() {
			if (this.roleMsg != null) {
				this.roleMsg.Pause();
			}
		}
		public resume() {
			if (this.roleMsg != null) {
				this.roleMsg.resume();
			}
		}
		public OpenWeekUI() {
			if (this.relicFight != null) {
				this.relicFight.OpenWeek();
			}
		}
		public CloseWeekUI() {
			if (this.relicFight != null) {
				this.relicFight.CloseWeek();
			}
		}
		public EndCurrChap() {
			if (this.relicFight != null) {
				this.relicFight.SetStageEnd();
			}
		}
		public StartNextChap() {
			if (this.relicFight != null) {
				this.relicFight.SetStageBegin();
			}
		}
		public ResetCurrBossInfo() {
			if (this.itemBoss != null) {
				this.itemBoss.ResetCurrBossInfo();
			}
		}
		public DealSkillUiEffect(general, index) {
			if (this.roleMsg != null) {
				this.roleMsg.TouchSkillUiEffect(general, index);
			}
		}
		public DealDeathUiEffect(general, index) {
			if (this.roleMsg != null) {
				this.roleMsg.TouchDeathUiEffect(general, index);
			}
		}
		public FreshDeadUi(role) {
			if (role.bEnemy == false) {
				if (this.roleMsg != null) {
					this.roleMsg.FreshDeadUi(role);
				}
			}
		}
		public FreshNewUi(role) {
			if (this.roleMsg != null) {
				this.roleMsg.FreshNewUi(role);
			}
		}
		public ReloadHelp() {
			if (this.roleMsg != null) {
				this.roleMsg.ReloadHelp();
			}
		}
		public FreshHelp(role) {
			if (this.roleMsg != null) {
				this.roleMsg.ClickHelp();
			}
		}
		public FreshReviveMenu(role) {
			if (role != null && role.bEnemy == false) {
				if (this.roleMsg != null) {
					this.roleMsg.FreshReviveUi(role);
				}
			}

		}
		public CloseAni(role) {
			if (this.roleMsg != null) {
				this.roleMsg.CloseAni();
			}
		}
		public GetCdTipPos(num, type) {
			let x = 0;
			let y = 0;
			if (this.roleMsg != null) {
				let arr = this.roleMsg.GetCdTipPos(num, type);
				x = arr[0];
				y = arr[1];
			}
			return [x, y];
		}
		public LockPauseUi() {
			if (this.roleMsg != null) {
				this.roleMsg.ForceLockPause();
			}
		}
		public getLoadStep() {
			if (this.roleMsg != null) {
				return this.roleMsg.load_step;
			}
		}
		public OnExit() {
			egret.clearInterval(this.load_id);
			this.load_step = -1;
			egret.clearInterval(this.update);
			this.update = -1;
			egret.clearInterval(this.timer_id);
			this.timer_id = -1;

			for (let i = 0; i < this.viewArr.length; i++) {
				this.DeleteSubWin(this.viewArr[i]);
			}
			this.roleMsg = null;
			this.itemBoss = null;
			this.relicFight = null;
			this.viewArr = [];
			this.scene = null;
		}
		public CommonSettleWin(msg: message.WantedBattleResponse, rewardCB, thisObj) {

			let scene = StageSceneManager.Instance.GetCurScene();
			scene.getItemInfo.items = Helper.hideSpecialGoods(msg.body.gameInfo.getGoods);
			[scene.getItemInfo.turnItems, scene.getItemInfo.extraItems] = Helper.getTurnGoods(msg.body.gameInfo.getGoods, Gmgr.Instance.fightType);
			scene.getItemInfo.firstBloodItems = Helper.getFirstBloodGoods(msg.body.gameInfo.getGoods, Gmgr.Instance.fightType);
			scene.potatos = msg.body.gameInfo.potatos;
			if (Gmgr.Instance.bContinueBattle) {
				for (let k in msg.body.gameInfo.getGoods) {
					let v = msg.body.gameInfo.getGoods[k];
					if (v.goodsId != 0) {
						let [entity, index] = Table.FindR(Game.PlayerBattleSystem.continueBattleDropItems, function (_k, _v) {
							return _v.goodsId == v.goodsId;
						});

						if (entity != null && PlayerItemSystem.ItemIsOverlap(v.goodsId) && PlayerItemSystem.Type2(v.goodsId) != message.EGoodsType.GOODS_TYPE_POTATO) {
							Game.PlayerBattleSystem.continueBattleDropItems[index].count = entity.count + v.count;
						} else {
							Game.PlayerBattleSystem.continueBattleDropItems.push(v);
						}
					}
				}
				for (let k in msg.body.gameInfo.potatos) {
					let v = msg.body.gameInfo.potatos[k];
					Game.PlayerBattleSystem.continueBattleDropItems.push(v);
				}
			}
			if (scene.getItemInfo.firstBloodItems.length != 0
				&& (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == Gmgr.Instance.fightType
					|| message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == Gmgr.Instance.fightType
					|| message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER == Gmgr.Instance.fightType
					|| message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER == Gmgr.Instance.fightType
					|| message.EFormationType.FORMATION_TYPE_GROUP_FIGHT == Gmgr.Instance.fightType
					|| message.EFormationType.FORMATION_TYPE_WANTED == Gmgr.Instance.fightType)
			) {
				let show_first = true;
				for (let i = 0; i < scene.getItemInfo.firstBloodItems.length; i++) {
					let v = scene.getItemInfo.firstBloodItems[i];
					if (v.goodsId == 0) {
						show_first = false;
						break;
					}
				}
				if (show_first) {
					// TipMgr:GetFirstBlood(self.scene.getItemInfo.firstBloodItems ,self, cb1);、
					loadUI(Common_FirstBlood)
						.then((dialog: Common_FirstBlood) => {
							dialog.SetInfoGet(scene.getItemInfo.firstBloodItems);
							dialog.SetCB(() => {
								this.cb1(rewardCB, thisObj);
							});
							dialog.show();
						});

				} else {
					this.cb1(rewardCB, thisObj);
				}
			} else {
				this.cb1(rewardCB, thisObj);
			}

		}
		public loseSubUi;
		public setUI(rewardCB?, thisObj?) {
			if (rewardCB == null) {
				// toast("成功调取成功结算")
				loadUI(BattleEnd_Win)
					.then((dialog: BattleEnd_Win) => {
						this.loseSubUi = dialog;
						this.loseSubUi.show();
						this.loseSubUi.Init();
						this.loseSubUi.SetFather(this);
						this.loseSubUi.Load();
					});
			} else {
				rewardCB.call(thisObj);
			}
		}
		public cb1(rewardCB, thisObj) {
			let scene = StageSceneManager.Instance.GetCurScene();
			if (Helper.getObjLen(scene.getItemInfo.turnItems) != 0) {
				let show_turn = true;
				for (let i = 0; i < scene.getItemInfo.turnItems.length; i++) {
					let v = scene.getItemInfo.turnItems[i];
					if (v.goodsId == 0) {
						show_turn = false;
						break;
					}
				}
				if (show_turn) {
					let a = () => {
						this.setUI(rewardCB, thisObj);
					}
					loadUI(CardBagPopItem)
						.then((dialog: CardBagPopItem) => {
							dialog.playAni(null, scene.getItemInfo.turnItems, scene.getItemInfo.extraItems, this, a, scene.potatos);
							dialog.show(UI.SHOW_FROM_TOP);
						});
					// this.setUI(rewardCB, thisObj);
				} else {
					this.setUI(rewardCB, thisObj);
				}
			} else {
				this.setUI(rewardCB, thisObj);
			}
		}
	}
}