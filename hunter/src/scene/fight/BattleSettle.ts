namespace zj {
	/**结算基类 */
	export class BattleSettle extends Dialog {
		public constructor() {
			super();
			// UIManager.Stage.frameRate = UIManager.InitFrameRate;
			// console.log("到结算基类");
			this.scene = StageSceneManager.Instance.GetCurScene();
			//数据整合
			if (Gmgr.Instance.bReplay == false) {
				if (Game.PlayerBattleSystem.cacheBattleResult.battleType == 16) {
					// console.log("到结算基类1");
					Game.PlayerBattleSystem.UncompressBattleData(Game.PlayerBattleSystem.cacheBattleResult, false);
				} else {
					// console.log("到结算基类2");
					Game.PlayerBattleSystem.UncompressBattleData(Game.PlayerBattleSystem.cacheBattleResult);
				}
			} //console.log("结算基类super执行完");
		}
		public nextMobID;
		public uiName = "";
		public scene = StageSceneManager.Instance.GetCurScene();
		public tableHeroItem = [];
		public settleCB: Function;

		public bHerosCome = false;
		public bButtonCome = false;

		public bNotice = false;

		public bPopWin = false;
		public bCheckPopWin = false;

		public total_tick = 0;
		public hero_come_time = 0;
		public AdaptBoard;
		public ButtonDetail: eui.Button;
		public ButtonGoOn;
		public ButtonNextMob;
		public ButtonShare;
		public tableDetail = [];
		public tableButton = [this.ButtonGoOn, this.ButtonNextMob, this.ButtonShare];
		public TableViewHeros: eui.List;
		public TableViewDrops: eui.List;
		public LabelInstanceTime: eui.Label;
		public LabelInstanceName: eui.Label;
		public ui_name: string;
		public LabelPoints: eui.Label;
		public LabelPointsB: eui.Label;
		public LabelReward: eui.Label;
		public SpriteRewardIcon: eui.Image;
		public SingleInfo = { score: null };
		public update;
		public NodeTitle: eui.Group;
		public NodeBgAni: eui.Group;
		public NodeAni: eui.Group;
		public NodeName: eui.Group;
		public SpriteName: eui.Image;
		public NodeCountent2: eui.Group;
		public HeroNodeBule1_4: eui.Group;
		public HeroNodeBule1_3: eui.Group;
		public HeroNodeBule1_2: eui.Group;
		public HeroNodeBule1_1: eui.Group;
		public BlueWord1: eui.Image;
		public HeroNodeRed1_1: eui.Group;
		public HeroNodeRed1_2: eui.Group;
		public HeroNodeRed1_3: eui.Group;
		public HeroNodeRed1_4: eui.Group;
		public RedWord1: eui.Image;
		public SpriteTeamNum1: eui.Image;
		public NodeCountent3: eui.Group;
		public HeroNodeBule2_4: eui.Group;
		public HeroNodeBule2_3: eui.Group;
		public HeroNodeBule2_2: eui.Group;
		public HeroNodeBule2_1: eui.Group;
		public BlueWord2: eui.Image;
		public HeroNodeRed2_1: eui.Group;
		public HeroNodeRed2_2: eui.Group;
		public HeroNodeRed2_3: eui.Group;
		public HeroNodeRed2_4: eui.Group;
		public RedWord2: eui.Image;
		public SpriteTeamNum2: eui.Image;
		public NodeCountent4: eui.Group;
		public HeroNodeBule3_4: eui.Group;
		public HeroNodeBule3_3: eui.Group;
		public HeroNodeBule3_2: eui.Group;
		public HeroNodeBule3_1: eui.Group;
		public BlueWord3: eui.Image;
		public HeroNodeRed3_1: eui.Group;
		public HeroNodeRed3_2: eui.Group;
		public HeroNodeRed3_3: eui.Group;
		public HeroNodeRed3_4: eui.Group;
		public RedWord3: eui.Image;
		public SpriteTeamNum3: eui.Image;
		public NodeTeamAni1: eui.Group;
		public NodeTeamAni2: eui.Group;
		public NodeTeamAni3: eui.Group;

		public static updates = [];

		//结算基类初始化
		public Init() {
			Game.EventManager.event(GameEvent.CLOSE_CHAT);
			this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
			this.AddBackShadow();
			if (this.AdaptBoard != null) {
				this.AdaptBoard.scaleX = Device.scaleFactor;
				this.AdaptBoard.scaleY = Device.scaleFactor;
			}

			this.tableButton = [this.ButtonGoOn, this.ButtonNextMob, this.ButtonShare];
			this.SetLock(true);
			if (this.ButtonDetail != null || this.ButtonDetail != undefined) {
				this.ButtonDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDetail, this);
				this.tableDetail = [this.ButtonDetail];
			}
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.Tween.removeTweens(this);
				egret.clearInterval(this.update);
				this.scene = null;
			}, this);
		}
		public SetLock(boo) {

		}
		public AddBackShadow() {

		}
		// private _father;
		public SetFather(father) {
			// this._father = father;
		}
		public Load() {
			this.SetDetailVisible(false);
			this.SetButtonVisible(false);

			this.LoadDetail();
		}
		//实时更新
		public Update(tick) {
			this.total_tick = this.total_tick + tick * 1000;
			this.UpdateGeneral(tick);
			this.UpdateButton(tick);
			this.Notice_Update();
			this.UpdatePopWin(tick);
		}
		public Notice_Update() {
			if (this.bButtonCome == false) {
				return;
			}
			if (Gmgr.Instance.bReplay == true || this.bNotice == true) {
				return;
			}
			this.bNotice = true;

			let cb = () => {
				if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID == 100002) {
					Teach.CheckTeachName();
				}
			}
			if (Game.PlayerInfoSystem.BaseInfo.level > Game.PlayerInfoSystem.baseInfo_pre.level && Game.PlayerInfoSystem.BaseInfo.level < 60 && Game.PlayerInfoSystem.baseInfo_pre.level != 0) {
				egret.Tween.get(this).wait(600).call(() => {
					TipManager.LevelUp(cb);
				});

			} else {
				this.OnAbovePop();
			}
		}


		
		public OnAbovePop() {
			this.bCheckPopWin = true;
		}
		public UpdatePopWin(tick) {
			if (this.bCheckPopWin == false) {
				return;
			}
		}
		public UpdateGeneral(tick) {
			if (this.total_tick >= this.hero_come_time * 1000 && this.bHerosCome == false) {
				this.bHerosCome = true;
				this.scene.hideAllAlly();
				this.HerosComeIn();
			}
		}
		public UpdateButton(tick) {
			if (this.CheckHerosFinished() == true && this.bButtonCome == false) {
				this.bButtonCome = true;
				this.DetailFadeIn();
				this.ButtonFadeIn();
			}
		}
		private listData: eui.ArrayCollection = new eui.ArrayCollection();
		public LoadHerosList() {
			if (this.TableViewHeros == null) {
				return;
			}
			let viewSizeW = this.TableViewHeros.width;
			let viewSizeH = this.TableViewHeros.height;

			// let tag = yuan3(this._father.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN, true, false);
			let generals = [];

			for (let i = TableEnum.TableTeamNum.TEAM_NUM_A; i <= TableEnum.TableTeamNum.TEAM_NUM_D; i++) {
				let key = this.scene.tablePosKey[i];
				if (key != null) {
					generals.push(key);
				}
			}
			if (generals.length == 0) {
				generals = Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.formation.generals;
			}
			this.TableViewHeros.itemRenderer = BattleEnd_HeroItemUpgrade;
			this.listData.removeAll();
			for (let i = generals.length - 1; i >= 0; i--) {
				let info = this.scene.getPlayerGelBtlInfo(generals[i]);
				if (info) {
					this.listData.addItem(info);
				}
			}
			this.TableViewHeros.dataProvider = this.listData;
		}
		//检测武将动作是否已经完成
		public CheckHerosFinished() {
			for (let i = 0; i < this.tableHeroItem.length; i++) {
				let v = this.tableHeroItem[i];
				if (v.isFinished() == false) {
					return false
				}
			}
			return true;
		}
		//武将进场
		public HerosComeIn() {
			for (let i = 0; i < this.tableHeroItem.length; i++) {
				let v = this.tableHeroItem[i];
				v.Playing();
			}
		}
		//点击详情
		public SetDetailVisible(tag) {
			for (let i = 0; i < this.tableDetail.length; i++) {
				let v = this.tableDetail[i];
				if (v != null) {
					v.visible = tag;
				}
			}
		}
		//详情出现action
		public DetailFadeIn() {
			this.SetDetailVisible(true);
			for (let i = 0; i < this.tableDetail.length; i++) {
				let v = this.tableDetail[i];
				if (v != null) {
					v.alpha = 0;
					egret.Tween.get(v).to({ alpha: 1 }, ConstantConfig_BattleSettle.buttonFadeTime);
				}
			}
		}
		public SetButtonVisible(tag) {
			for (let i = 0; i < this.tableButton.length; i++) {
				let v = this.tableButton[i];
				if (v != null) {
					v.visible = tag;
				}
			}
		}
		public SetButtonSpec() {
			if (Gmgr.Instance.isTeachBattleEnd()) {
				this.SetButtonVisible(false);
				this.ButtonGoOn.visible = true;
			}
		}
		public LoadDetail() {
			if (this.LabelInstanceTime) {
				let ret = Set.FormatMsTime2(Math.floor(this.scene.realTime / 1000));
				this.LabelInstanceTime.text = ret;
			}
			if (this.LabelInstanceName) {
				let ret = "";
				let a = Game.PlayerBattleSystem.multiResultInfo as any;
				if (a.battleType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
					ret = Helper.getInstanceDetailName(a.battleType, TableInstanceGroup.Item(PlayerGroupFightSystem.groupFightDetailsInfo.instanceId).instance_name)
				} else {
					ret = Helper.getInstanceDetailName(a.battleType, Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo);
				}
				this.LabelInstanceName.text = ret;
			}
		}

		public SetSettleCb(cb) {
			this.settleCB = cb;
		}
		//public ButtonGoOn;
		//public ButtonNextMob;
		public ButtonFadeIn() {
			let thisOne = this;
			let tmp = () => {
				thisOne.SetLock(false);
				if (thisOne.settleCB) {
					thisOne.settleCB();
					thisOne.settleCB = null;
				}
			}
			if (this.GetUIName() == "BattleEnd_Lose") {
				//除了副本、爬塔，其余战斗失败不显示再战
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
					|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
					|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER
					|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER
					|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED
				) {
					this.tableButton = [this.ButtonGoOn, this.ButtonNextMob];
				} else {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_Win") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
					if (PlayerTowerSystem.isTopFloor(Game.PlayerTowerSystem.towerInfo.towerCur - 1)) {
						this.tableButton = [this.ButtonGoOn];
					}
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
					// if (PlayerTowerSystem.isTopFloor((Game.PlayerTowerSystem.towerInfo.high_tower_cur - 1) % 10000)) {
					// 	this.tableButton = [this.ButtonGoOn];
					// }
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
					if (!TableInstance.Item(this.nextMobID)) {
						this.tableButton = [this.ButtonGoOn];
					} else {
						if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {

						} else {
							if (Game.PlayerInstanceSystem.isLastMob(Game.PlayerInstanceSystem.curInstanceType)) {
								// if (Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID == Game.PlayerInstanceSystem.ChapterBossInstanceID()) {
								this.tableButton = [this.ButtonGoOn];
							} else if (Game.PlayerInstanceSystem.TeachNoNextButton()) {
								// 新手教学
								this.tableButton = [this.ButtonGoOn];
							}
						}
					}
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
					this.tableButton = [this.ButtonGoOn];
				} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_WinArenaServer") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_WinArenaServer") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_WinMatchServer") {
				this.tableButton = [this.ButtonGoOn];
			} else if (this.GetUIName() == "BattleEnd_LoseArenaServer") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_LoseArenaServer") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_LoseLeagueMonster" || this.GetUIName() == "BattleEnd_WinLeagueMonster") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_LoseLeagueInstance" || this.GetUIName() == "BattleEnd_WinLeagueInstance") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_LoseZorkBoss" || this.GetUIName() == "BattleEnd_WinZorkBoss") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (this.GetUIName() == "BattleEnd_WinGroupFight" || this.GetUIName() == "BattleEnd_LoseGroupFight") {
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
					this.tableButton = [this.ButtonGoOn];
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
				this.tableButton = [this.ButtonGoOn];
			}
			this.SetButtonVisible(true);
			this.SetButtonSpec();
			for (let i = 0; i < this.tableButton.length; i++) {
				let v = this.tableButton[i];
				if (v != null) {
					v.alpha = 0;
					egret.Tween.get(v).to({ alpha: 1 }, ConstantConfig_BattleSettle.buttonFadeTime)
						.call(() => {
							egret.Tween.removeTweens(v);
							tmp();
						});
				}
			}
		}
		public GetUIName() {
			return this.ui_name;
		}
		public close() {
			super.close();
			egret.Tween.removeTweens(this);
			egret.clearInterval(this.update);
			for (let i = 0; i < BattleSettle.updates.length; i++) {
				egret.clearInterval(BattleSettle.updates[i]);
			}
			BattleSettle.updates = [];
			this.scene = null;
		}
		//继续
		public ButtonGoOn_CallBack() {
			Game.PlayerInstanceSystem.canSyncLevel = true;
			//this.clickGoOn();
		}
		// 详情
		public ButtonDetail_CallBack() {
			this.clickDetail();
		}
		//继续下一关
		public ButtonNextMob_CallBack() {
			this.clickNext();
		}
		//分享
		public ButtonShare_CallBack() {
			this.clickShare();
		}
		//重播方法需重载
		public clickReplay() {

		}
		//详情方法需重载
		public clickDetail() {
			loadUI(BattleEnd_StatsPop)
				.then((dialog: BattleEnd_StatsPop) => {
					dialog.show(UI.SHOW_FROM_TOP);
				})
			//PushUI("BattleEnd_StatsPop");
		}
		//分享方法重载
		public clickShare() {

		}
		//下一关方法重载
		public clickNext() {

		}
		//战败战力分析
		public analyseResult() {
			//4个值来确定上阵武将
			let format = Game.PlayerFormationSystem.maxFormat();
			let formatPosNum = (format["generals"] + format["reserves"] + format["supports"]);

			let current = Helper.getObjLen(this.scene.tableGeneralsPower);
			let own = Game.PlayerHunterSystem.queryAllHunters().length;
			let max = Helper.getObjLen(TableBaseGeneral.Table());

			let tblResult = [];
			let visitTag = false;
			if (own >= formatPosNum && current < formatPosNum) {
				let info = {};
				info["type"] = TableEnum.EnumAnalyseResult.RESULT_FORMAT;
				info["general_id"] = null;
				tblResult.push(info);
			} else if (own < formatPosNum && own < max && current < formatPosNum) {
				let info = {};
				info["type"] = TableEnum.EnumAnalyseResult.RESULT_VISIT;
				info["general_id"] = null;
				tblResult.push(info);
				visitTag = true;
			}
			//大方面去分
			let tblTotal = {};

			let name = ["lands", "partner"];
			for (let i = 0; i < name.length; i++) {
				tblTotal[name[i]] = 0;
			}
			let idTbl = [];
			for (let i = 0; i < current; i++) {
				let generalId = this.scene.tableGeneralsPower[i].general_id;
				idTbl.push(generalId);
				tblTotal["lands"] = tblTotal["lands"] + this.scene.tableGeneralsPower[i].lvAndStarPower;
				tblTotal["partner"] = tblTotal["partner"] + this.scene.tableGeneralsPower[i].partnerPower;
			}
			//取平均值
			let tblAverage = [];
			let fullValue = 0;
			for (let k in tblTotal) {
				let v = tblTotal[k];
				let info = {};
				info["type"] = k;
				if (k == "lands") {
					for (let i = 0; i < idTbl.length; i++) {
						fullValue = fullValue + Game.PlayerHunterSystem.getLvAndStarFullValue(idTbl[i])
					}
				} else if (k == "partner") {
					for (let i = 0; i < idTbl.length; i++) {
						fullValue = fullValue + Game.PlayerHunterSystem.getPartnerFullPower(idTbl[i])
					}
				}
				info["value"] = v / fullValue;
				tblAverage.push(info);
			}
			tblAverage.sort((a, b) => {
				return a.value - b.value;
			});
			for (let i = 0; i < tblAverage.length; i++) {
				let info = {};
				if (tblAverage[i].type == "lands" && tblAverage[i].value < 1) {
					this.scene.tableGeneralsPower.sort((a, b) => {
						return a.lvAndStarPower - b.lvAndStarPower;
					});
					info["type"] = 0; //TableEnum.EnumAnalyseResult.RESULT_UPGRADE_LEVEL_OR_STAR  
					info["general_id"] = this.scene.tableGeneralsPower[0].general_id;
					tblResult.push(info);
				} else if (tblAverage[i].type == "partner" && tblAverage[i].value < 1) {
					this.scene.tableGeneralsPower.sort((a, b) => {
						return a.partnerPower - b.partnerPower;
					});
					info["type"] = 0//TableEnum.EnumAnalyseResult.RESULT_UPGRADE_STEP;
					info["general_id"] = this.scene.tableGeneralsPower[0].general_id;
					tblResult.push(info);
				}
			}
			if (visitTag == false && tblResult.length == 1 && own < max) {
				let info = {};
				info["type"] = TableEnum.EnumAnalyseResult.RESULT_VISIT;
				info["general_id"] = null;
				tblResult.push(info);
			}
			return tblResult;
		}
		//适用于联赛
		public loadItem() {
			//先左后右
			let addItem = (node: eui.Group, generalInfo, des, isSupport, bEnemy) => {
				let item = newUI(ArenaStarcraftHeroItem) as ArenaStarcraftHeroItem;
				item.setGeneralInfo(generalInfo, isSupport, bEnemy);
				node.addChild(item);
			}

			let setFlag = (flag: eui.Image, word: eui.Image, result, bLeft) => {
				if (bLeft == true) {
					if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						flag.source = cachekey(UIConfig.UIConfig_BattleStarcraft.flag.win, this);
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.win, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
						flag.source = cachekey(UIConfig.UIConfig_BattleStarcraft.flag.fail, this);
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.fail, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
						flag.visible = false;
						word.visible = false;
					}
				} else {
					if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
						flag.source = cachekey(UIConfig.UIConfig_BattleStarcraft.flag.win, this);
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.win, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						flag.source = cachekey(UIConfig.UIConfig_BattleStarcraft.flag.fail, this);
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.fail, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
						flag.visible = false;
						word.visible = false;
					}
				}
			}

			for (let i = 0; i < 3; i++) {
				//主将
				let generals = Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.generals;
				for (let j = 0; j < 3; j++) {
					let generalInfo = generals[j];
					let key = Helper.StringFormat("HeroNodeBule%s_%s", (i + 1), (j + 1));
					let des = Helper.StringFormat("blue%s_%s", (i + 1), (j + 1));
					addItem(this[key], generalInfo, des, true, false);
				}
				//援护
				let supports = Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.supports;
				let generalInfo = supports[0];
				let key = Helper.StringFormat("HeroNodeBule%s%s", (i + 1), 4);
				let des = Helper.StringFormat("bule%s_%s", (i + 1), 4);
				addItem(this[key], generalInfo, des, true, false);
				setFlag(this["BlueFlag" + i], this["BlueWord" + (i + 1)], Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, true);
			}

			for (let i = 0; i < 3; i++) {
				//主将
				let generals = Game.PlayerBattleSystem.battleSingleInfo[i + 1].rightInfo.generals;

				for (let j = 0; j < 3; j++) {
					let generalInfo = generals[j];
					let key = Helper.StringFormat("HeroNodeRed%s_%s", (i + 1), (j + 1));
					let des = Helper.StringFormat("red%s_%s", (i + 1), (j + 1));
					addItem(this[key], generalInfo, des, false, true);
				}
				//援护
				let supports = Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.supports;
				let generalInfo = supports[0];
				let key = Helper.StringFormat("HeroNodeRed%s%s", (i + 1), 4);
				let des = Helper.StringFormat("red%s_%s", (i + 1), 4);
				addItem(this[key], generalInfo, des, true, true);
				setFlag(this["RedFlag" + i], this["RedWord" + (i + 1)], Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, false);
			}
		}
		/**适用联赛设置UI */
		public setStarcraftUi() {
			// let a = 
			// let  b = Game.PlayerInfoSystem.BaseInfo.contend
		}

		public loadSinleItem(args?) {
			if (this.LabelPointsB) {
				this.LabelPointsB.visible = false;
			}
			this.LabelPoints.visible = false;
			this.LabelReward.visible = false;
			this.SpriteRewardIcon.visible = false;

			//先左后右
			let addItem = (node: eui.Group, generalInfo, des, isSupport, bEnemy) => {
				let item = newUI(ArenaStarcraftHeroItem) as ArenaStarcraftHeroItem;
				item.setGeneralInfo(generalInfo, isSupport, bEnemy);
				node.anchorOffsetX = 24;
				node.anchorOffsetY = 24;
				node.addChild(item.getGroup());
			}

			let setFlag = (word: eui.Image, result, bLeft) => {
				if (bLeft == true) {
					if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.win, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.fail, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
						word.visible = false;
					}
				} else {
					if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.win, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						word.source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.fail, this);
					} else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
						word.visible = false;
					}
				}
			}
			for (let i = 0; i < 3; i++) {
				//主将
				let generals = Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.generals;
				for (let j = 0; j < 4; j++) {
					let generalInfo = generals[j];
					// let key = Helper.StringFormat("HeroNodeBule%s_%s", (i + 1), (j + 1));
					let des = Helper.StringFormat("blue%s_%s", (i + 1), (j + 1));
					addItem(this["HeroNodeBule" + (i + 1) + "_" + (j + 1)], generalInfo, des, false, false);
				}
				setFlag(this["BlueWord" + (i + 1)], Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, true);
			}

			for (let i = 0; i < 3; i++) {
				//主将
				let generals = Game.PlayerBattleSystem.battleSingleInfo[i + 1].rightInfo.generals;
				for (let j = 0; j < 4; j++) {
					let generalInfo = generals[j];
					// let key = Helper.StringFormat("HeroNodeRed%s_%s",, );
					let des = Helper.StringFormat("red%s_%s", (i + 1), (j + 1));
					addItem(this["HeroNodeRed" + (i + 1) + "_" + (j + 1)], generalInfo, des, false, true);
				}
				setFlag(this["RedWord" + (i + 1)], Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, false);
			}

			let delay = 0.2;
			for (let i = 0; i < 3; i++) {
				if (this["SpriteTeamNum" + (i + 1)] != null) {
					// this["SpriteTeamNum" + (i + 1)].removeFromParent();
					let bones = [
						"004_xiaobiaoqian1",
						"003_duiwu",
						"005_xiaobiaoqian2",
						"006_touxiang1_4",
						"006_touxiang1_3",
						"006_touxiang1_2",
						"006_touxiang1_1",
						"007_touxiang2_1",
						"007_touxiang2_2",
						"007_touxiang2_3",
						"007_touxiang2_4",
					]
					let paths = [
						this["BlueWord" + (i + 1)],
						this["SpriteTeamNum" + (i + 1)],
						this["RedWord" + (i + 1)]
					]

					for (let j = 4; j > 0; j--) {
						paths.push(this["HeroNodeBule" + (i + 1) + "_" + j]);
					}

					for (let k = 4; k > 0; k--) {
						paths.push(this["HeroNodeRed" + (i + 1) + "_" + k]);
					}

					// let action = () => {
					// 	let animationEventBox = (armatureBack, movementType, movementId) => {
					// if(movementType ){
					if (i == 2) {
						if (Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
							this.setSingleUi();
						}
					}
					// }
					// 	}
					// }

					this["NodeTeamAni" + (i + 1)].removeChildren();
					if (Game.PlayerBattleSystem.battleSingleInfo[3].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_NO && i == 2) {
						let node1 = new eui.Group();
						let node2 = new eui.Group();
						// this.rootNode
						paths[0] = node1;
						paths[2] = node2;
					}
					Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_gedou_02", null, paths, bones)
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.stop();
							}, this)
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							armatureDisplay.animation.play("0001_biaoqian_01", 1);
							this["NodeTeamAni" + (i + 1)].addChild(armatureDisplay);
						});
				}
			}
		}

		/**适用跨服战设置UI */
		public setSingleUi() {
			let plevel = singLecraft.GetLevel(Gmgr.Instance.singleScore);
			let nlevel = singLecraft.GetLevel(this.SingleInfo.score);
			let diffhonor = Game.PlayerInfoSystem.BaseInfo.honorCoin - Gmgr.Instance.singleHonor || 0;

			this.LabelReward.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.battleReward, diffhonor);
			this.LabelPoints.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.battlePoints, Gmgr.Instance.singleScore);
			this.LabelPointsB.visible = false;
			this.SpriteRewardIcon.visible = true;
			let cb = () => {
				loadUI(ArenaWholeGradeUp)
					.then((dialog: ArenaWholeGradeUp) => {
						dialog.setInfo(plevel, nlevel);
						dialog.show();
					})
			}
			if (plevel != nlevel) {
				this.SetLevelUpUI(cb);
			} else {
				this.SetLevelUpUI();
			}
		}
		public SetLevelUpUI(cb?: Function) {
			this.LabelPointsB.visible = true;
			this.LabelPoints.visible = true;
			this.LabelReward.visible = true;
			this.SpriteRewardIcon.visible = true;
			let diffScore = this.SingleInfo.score - Gmgr.Instance.singleScore;
			let scoreStr = diffScore >= 0 && "+" + diffScore || diffScore;
			let t = 5;
			let a = Gmgr.Instance.singleScore;
			let b = this.SingleInfo.score;
			let curScore = a;
			this.LabelPoints.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.battlePoints, curScore);
			let scalesold = this.LabelPointsB.scaleX;


			if (diffScore >= 0) {
				this.LabelPointsB.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, scoreStr));
			} else {
				this.LabelPointsB.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, scoreStr));
			}

			// this.LabelPointsB

			let preTime = Game.PlayerInstanceSystem.curServerTime;
			let isdone = 0;

			let action = () => {
				if (Game.PlayerInstanceSystem.curServerTime >= preTime + 0.9) {
					if (a >= b) {
						curScore -= Math.ceil((a - b) / (t / 0.5));
						if (curScore < b) {
							curScore = b;
						}
					} else {
						curScore += Math.ceil((b - a) / (t / 0.5));
						if (curScore > b) {
							curScore = b;
						}
					}
					this.LabelPoints.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.battlePoints, curScore);
					if (curScore == b && cb != null && isdone == 0) {
						isdone = 1;
						cb();
					}
				}
			}
		}

		public BossEntryReq() {
			let zork = Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem;
			this.bossEntry(zork.scene_x, zork.scene_y)
				.then((response: message.BossEntryResponse) => {

				})
				.catch((result) => {
					TipManager.ShowBattleError(result, this, this.QuitBossFight)
				});
		}

		public bossEntry(scenex: number, sceney: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.BossEntryRequest();
				request.body.scene_x = scenex;
				request.body.scene_y = sceney;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.BossEntryResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false);
			})
		}

		public QuitBossFight() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(WonderlandScene)
					.then((scene: WonderlandScene) => {
						scene.show(UI.SHOW_FILL_OUT);
						scene.init();
						scene.onClick6_2();
						Game.TeachSystem.battleEndOpenTeach = true;
					});
			});
		}
	}
}