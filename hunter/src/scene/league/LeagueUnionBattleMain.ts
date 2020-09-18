namespace zj {
// 公会战主界面
// lizhengqiang
// 20190117
export class LeagueUnionBattleMain extends Scene {
	private imgReady: eui.Image;
	private imgBattle: eui.Image;
	private imgSphere: eui.Image;

	private groupTopLeft: eui.Group;
	private btnClose: eui.Button;
	private imgBookmark7: eui.Image;
	private lbBookmark7: eui.Label;
	private imgBookmark6: eui.Image;
	private lbBookmark6: eui.Label;
	private imgBookmark5: eui.Image;
	private lbBookmark5: eui.Label;
	private imgBookmark4: eui.Image;
	private lbBookmark4: eui.Label;
	private imgBookmark3: eui.Image;
	private lbBookmark3: eui.Label;
	private imgBookmark2: eui.Image;
	private lbBookmark2: eui.Label;
	private imgBookmark1: eui.Image;
	private lbBookmark1: eui.Label;
	private btnLastSettlement: eui.Button;
	private imgReadyState: eui.Image;
	private imgBattleState: eui.Image;
	private imgBattleEmpty: eui.Image;
	private btnPlayDes: eui.Button;

	private groupBattleTimeDisplay: eui.Group;
	private imgTimeDisplay: eui.Image;
	private lbStartCountingDown: eui.Label;

	private groupBattleSide: eui.Group;
	private imgBattleSideBG: eui.Image;
	private groupBattleOurLoadingBar: eui.Group;
	private imgBattleOurLoadingBar: eui.Image;
	private rectBattleOurLoadingBarMask: eui.Image;
	private groupBattleEnemyLoadingBar: eui.Group;
	private imgBattleEnemyLoadingBar: eui.Image;
	private rectBattleEnemyLoadingBarMask: eui.Image;
	private imgBattleStateLogo: eui.Image;
	private lbBattleOurScore: eui.Label;
	private lbBattleEnemyScore: eui.Label;
	private lbAtkTime: eui.Label;

	private groupUnionInfo: eui.Group;
	private imgUnionInfoBG: eui.Image;
	private imgUnionInfoName: eui.Image;
	private imgUnionInfoServer: eui.Image;
	private imgUnionInfoSegment: eui.Image;
	private imgUnionInfoScore: eui.Image;
	private imgUnionInfoRank: eui.Image;
	private lbInfoUnionName: eui.Label;
	private lbInfoServerName: eui.Label;
	private imgInfoSegment: eui.Image;
	private lbInfoRankScore: eui.Label;
	private lbInfoThisSerRank: eui.Label;

	private groupReady: eui.Group;
	private lbDefendTeam: eui.Label;
	private lbUnionTeamCount: eui.Label;
	private groupBigAirship: eui.Group;
	private imgAirship1: eui.Image;
	private lbAirship1: eui.Label;
	private groupAirshipLeft: eui.Group;
	private imgAirship2: eui.Image;
	private lbAirship2: eui.Label;
	private groupAirshipRight: eui.Group;
	private imgAirship3: eui.Image;
	private lbAirship3: eui.Label;
	private groupSmallAirshipLeft: eui.Group;
	private imgAirship4: eui.Image;
	private lbAirship4: eui.Label;
	private groupSmallAirshipRight: eui.Group;
	private imgAirship5: eui.Image;
	private lbAirship5: eui.Label;

	private groupInfoGray: eui.Group;
	private lbInfoName: eui.Label;
	private lbInfoLevel: eui.Label;
	private lbInfoNumber: eui.Label;
	private lbInfoDefend: eui.Label;
	private btnViewDetails: eui.Button;
	private btnViewSet: eui.Button;

	private groupBattle: eui.Group;
	private groupAirship1: eui.Group;
	private groupAirship2: eui.Group;
	private groupAirship3: eui.Group;
	private groupAirship4: eui.Group;
	private groupAirship5: eui.Group;
	private groupSpine1: eui.Group;
	private groupSpine2: eui.Group;
	private groupSpine3: eui.Group;
	private groupSpine4: eui.Group;
	private groupSpine5: eui.Group;
	private imgBattleAirship1: eui.Image;
	private imgBattleAirship2: eui.Image;
	private imgBattleAirship3: eui.Image;
	private imgBattleAirship4: eui.Image;
	private imgBattleAirship5: eui.Image;
	private imgBattleLoadingBar1: eui.Image;
	private imgBattleLoadingBar2: eui.Image;
	private imgBattleLoadingBar3: eui.Image;
	private imgBattleLoadingBar4: eui.Image;
	private imgBattleLoadingBar5: eui.Image;
	private lbGetStarNum1: eui.Label;
	private lbGetStarNum2: eui.Label;
	private lbGetStarNum3: eui.Label;
	private lbGetStarNum4: eui.Label;
	private lbGetStarNum5: eui.Label;

	private groupBottomMin: eui.Group;
	private groupSetLineUp: eui.Group;
	private btnSetLineUp: eui.Button;
	private imgTip1: eui.Image;
	private groupPop: eui.Group;
	private groupPop2: eui.Group;
	private btnUnionRank: eui.Button;
	private btnRewardPreview: eui.Button;
	private imgRegistered: eui.Image;
	private btnBattleRecord: eui.Button;
	private btnBattleSate: eui.Button;
	private groupSignUp: eui.Group;
	private btnSignUP: eui.Button;
	private lbSignUpConsume: eui.Label;

	private groupBottomLeft: eui.Group;
	private btnMall: eui.Button;
	private imgTip2: eui.Image;

	private groupBottomRight: eui.Group;
	private groupMyFormation: eui.Group;
	private btnMyFormation: eui.Button;
	private imgTip3: eui.Image;

	private timer: egret.Timer;
	private timer2: egret.Timer;
	private userOfID: number = Game.PlayerLeagueSystem.Member.officialId; // 官职;
	private shipFocus: number = 1;
	private isPop: boolean = false;
	private isPop2: boolean = false;

	private readyDefendInfo: { [key: number]: {}[] } = {};
	private readyAirship: { [key: number]: UnionBattleAirshipOur } = {};
	private enemyUnionInfo: message.CraftLeagueInfo = null;
	private status: number;
	private starred: Array<Array<number>> = [[], [], [], [], []];// 获得星星信息
	private enemyStarred: Array<Array<number>> = [[], [], [], [], []];// 敌方获得星星信息
	private currentShipType: number = 0;
	private ourCurrentScore: number = 0;
	private enemyCurrentScore: number = 0;

	private imgReadyScaleX: number = 1;
	private imgReadyScaleY: number = 1;
	private imgBattleScaleX: number = 1;
	private imgBattleScaleY: number = 1;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleMainSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnPlayDes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlayDes, this);
		this.btnLastSettlement.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLastSettlement, this);

		this.groupBigAirship.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupBigAirship, this);
		this.groupAirshipLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAirshipLeft, this);
		this.groupAirshipRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAirshipRight, this);
		this.groupSmallAirshipLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSmallAirshipLeft, this);
		this.groupSmallAirshipRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSmallAirshipRight, this);
		this.btnViewDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnViewDetails, this);
		this.btnViewSet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnViewSet, this);

		this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMall, this);
		this.btnSetLineUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSetLineUp, this);
		this.btnUnionRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnionRank, this);
		this.btnRewardPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRewardPreview, this);
		this.btnSignUP.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSignUP, this);

		this.groupSpine1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSpine1, this);
		this.groupSpine2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSpine2, this);
		this.groupSpine3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSpine3, this);
		this.groupSpine4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSpine4, this);
		this.groupSpine5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSpine5, this);

		this.rectBattleOurLoadingBarMask = Util.getMaskImgBlack(this.imgBattleOurLoadingBar.width, this.imgBattleOurLoadingBar.height);
		this.rectBattleOurLoadingBarMask.left = 0;
		this.rectBattleOurLoadingBarMask.verticalCenter = 0;
		this.groupBattleOurLoadingBar.addChild(this.rectBattleOurLoadingBarMask);
		this.rectBattleOurLoadingBarMask.visible = false;

		this.rectBattleEnemyLoadingBarMask = Util.getMaskImgBlack(this.imgBattleEnemyLoadingBar.width, this.imgBattleEnemyLoadingBar.height);
		this.rectBattleEnemyLoadingBarMask.right = 0;
		this.rectBattleEnemyLoadingBarMask.verticalCenter = 0;
		this.groupBattleEnemyLoadingBar.addChild(this.rectBattleEnemyLoadingBarMask);
		this.rectBattleEnemyLoadingBarMask.visible = false;

		this.btnBattleRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBattleRecord, this);
		this.btnBattleSate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBattleSate, this);
		this.btnMyFormation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMyFormation, this);

		Game.EventManager.on(GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2, this.update2, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			if (this.timer) this.timer.stop();
			if (this.timer2) this.timer2.stop();
			Game.EventManager.off(GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2, this.update2, this);
		}, null);
	}

	public init() {
		this.imgTip1.visible = false;
		this.imgTip2.visible = false;
		this.imgTip3.visible = false;

		this.imgReadyScaleX = this.imgReady.scaleX;
		this.imgReadyScaleY = this.imgReady.scaleY;
		this.imgBattleScaleX = this.imgBattle.scaleX;
		this.imgBattleScaleY = this.imgBattle.scaleY;

		this.applyData();

		this.timer = new egret.Timer(0.4 * 1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
		this.timer.start();

		this.timer2 = new egret.Timer(60 * 1000, 0);
		this.timer2.addEventListener(egret.TimerEvent.TIMER, this.update2, this);
		this.timer2.start();

		this.adaptScene();
	}

	private adaptScene() {
		let imgBackgroundScaleX: number = UIManager.StageWidth - 1400 > 0 ? UIManager.StageWidth / 1400 : 1;
		let imgBackgroundScaleY: number = UIManager.StageHeight - 697 > 0 ? UIManager.StageHeight / 697 : 1;

		this.imgReady.scaleX = this.imgReadyScaleX * imgBackgroundScaleX;
		this.imgReady.scaleY = this.imgReadyScaleY * imgBackgroundScaleY;

		this.imgBattle.scaleX = this.imgBattleScaleX * imgBackgroundScaleX;
		this.imgBattle.scaleY = this.imgBattleScaleY * imgBackgroundScaleY;


		let imgSphereScaleX: number = UIManager.StageWidth - 960 > 0 ? UIManager.StageWidth / 960 : 1;
		let imgSphereScaleY: number = UIManager.StageHeight - 640 > 0 ? UIManager.StageHeight / 640 : 1;

		this.imgSphere.scaleX = imgSphereScaleX;
		this.imgSphere.scaleY = imgSphereScaleY + 0.05;

		let left: number = 50 * (UIManager.StageWidth - 1080 > 0 ? UIManager.StageWidth / 960 * 1.2 : 1);
		let right: number = 50 * (UIManager.StageWidth - 1080 > 0 ? UIManager.StageWidth / 960 * 2.2 : 1);

		this.groupUnionInfo.left = left;
		this.groupReady.right = right;
		this.groupBattle.right = right;
	}

	private update() {
		this.adaptScene();

		this.updateTips();

		if (this.status != TableEnum.Enum.UnionBattleStatus.LadderNotRegistered && this.status != TableEnum.Enum.UnionBattleStatus.FinalFourRegistered) {

			this.lbStartCountingDown.text = PlayerLeagueSystem.GetTimeDiffShow(this.status)[0];

			let curSecond = PlayerLeagueSystem.GetCurSecond();
			if (curSecond >= CommonConfig.league_match_start_close_time[0] &&
				curSecond < CommonConfig.league_match_start_close_time[0] + CommonConfig.league_match_match_opponent_time &&
				PlayerLeagueSystem.GetDay() != 7 && // 周日下午休战
				Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon == false // 报名时间不是下午
			) {
				this.lbStartCountingDown.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.timeDiff[2], PlayerLeagueSystem.GetMatchOpponentTime()); // 匹配倒计时
			} else if (curSecond == CommonConfig.league_match_start_close_time[0] + CommonConfig.league_match_match_opponent_time + 1) {
				this.applyData(); // 匹配倒计时结束刷新面板
			} else if (curSecond == CommonConfig.league_match_start_close_time[1]) { // 23点

				Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = false;
				Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon = false;

				if (PlayerLeagueSystem.GetDay() == 6) { // 周六
					Game.PlayerLeagueSystem.BaseInfo.match_join = false;
				}

				Game.PlayerLeagueSystem.leagueInfo().then(() => {
					this.applyData();
				});
			}
		}
	}

	// 一分钟刷新一次界面
	private update2() {
		this.applyData();
	}

	// 红点刷新
	private updateTips() {
		let bTips = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_DEFENCE_FORMATE);
		this.imgTip1.visible = bTips;
		this.imgTip3.visible = bTips;

		if (this.isPop == false && bTips && !this.groupPop.visible) {
			this.groupPop.visible = true;
			this.isPop = true;

			setTimeout(() => {
				this.groupPop.visible = false;
			}, 3000);
		}

		if (this.isPop2 == false && Game.PlayerLeagueSystem.BaseInfo && !Game.PlayerLeagueSystem.BaseInfo.match_join && !this.groupPop.visible &&
			(this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER || this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER)) {
			this.groupPop2.visible = true;
			this.isPop2 = true;

			setTimeout(() => {
				this.groupPop2.visible = false;
			}, 3000);
		}

		let bTips2 = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.MATCH_MALL);
		this.imgTip2.visible = bTips2;
	}

	// 申请数据
	private applyData() {
		let total: number = 0; // 计数
		let current: number = 0;

		if (PlayerLeagueSystem.IsTimeInBattle()) {
			total = total + 1;
		}

		if (total == 0) this.setInfo();

		if (PlayerLeagueSystem.IsTimeInBattle()) {
			Game.PlayerLeagueSystem.leagueMatchOpponentInfo().then((resp: { opponentInfo: message.CraftLeagueInfo, is_air: boolean }) => {
				if (resp.is_air) { // 轮空
					Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = true;
				} else {
					Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = false;
					Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo = resp.opponentInfo;
				}
				current = current + 1;
				if (current == total) this.setInfo();
			}).catch(() => {
				current = current + 1;
				if (current == total) this.setInfo();
			});
		}
	}


	private setInfo() {
		this.setBookmarks();

		this.status = PlayerLeagueSystem.getStatus();
		Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus = this.status;

		// 判断是否需要弹出上场结算
		if (PlayerLeagueSystem.PushLastSettle()) {
			Game.PlayerLeagueSystem.leagueMatchBattleResult(0).then((resp: message.LeagueMatchBattleResultResponse) => {
				if (resp.header.result != 0) {
					loadUI(LeagueUnionDailySettlement)
						.then((dialog: LeagueUnionDailySettlement) => {
							dialog.show(UI.SHOW_FROM_TOP);
							dialog.updatePanel(resp.body.battleResult);
						});
				}
			});
		}

		this.setPanel();

		Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_ENTRANCE);
	}

	private setPanel() {
		let isLadderNotRegistered = (this.status == TableEnum.Enum.UnionBattleStatus.LadderNotRegistered);
		let isLadderRegistered = (this.status == TableEnum.Enum.UnionBattleStatus.LadderRegistered);
		let isBattle = (this.status == TableEnum.Enum.UnionBattleStatus.Battle);
		let isFinalFourRegistered = (this.status == TableEnum.Enum.UnionBattleStatus.FinalFourRegistered);
		let isFinalFourNotRegistered = (this.status == TableEnum.Enum.UnionBattleStatus.FinalFourNotRegistered);

		// 提示气泡
		this.groupPop.visible = false;
		// 提示气泡2
		this.groupPop2.visible = false;
		// 战斗背景
		this.imgBattle.visible = isBattle;
		// 战斗时的红色遮罩
		this.imgSphere.visible = isBattle;
		// 战斗积分条
		this.groupBattleSide.visible = isBattle;
		// 非战斗背景
		this.imgReady.visible = !isBattle;
		// 战斗group
		this.groupBattle.visible = isBattle;
		// 非战斗group
		this.groupReady.visible = !isBattle;
		// 公会状态按钮
		this.btnBattleSate.visible = isBattle;
		// 设置阵容按钮group
		this.groupSetLineUp.visible = !isBattle;
		// 准备状态
		this.imgReadyState.visible = (isLadderRegistered && !Game.PlayerLeagueSystem.unionBattleInfo.isEmpty); // 准备状态并且没有轮空
		// 战斗状态
		this.imgBattleState.visible = isBattle;
		// 轮空状态
		this.imgBattleEmpty.visible = Game.PlayerLeagueSystem.unionBattleInfo.isEmpty;
		// 我的阵容
		this.groupMyFormation.visible = isBattle;
		// 战斗记录按钮
		this.btnBattleRecord.visible = isBattle;
		// 已报名图标
		this.imgRegistered.visible = isLadderRegistered;
		// 报名按钮group
		this.groupSignUp.visible = isLadderNotRegistered;
		// 报名消耗
		this.lbSignUpConsume.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.SignUpConsume, CommonConfig.league_match_sign_consume_enliven)

		// 倒计时
		if (isBattle || isLadderRegistered) {
			this.groupBattleTimeDisplay.visible = true;
			this.lbStartCountingDown.text = PlayerLeagueSystem.GetTimeDiffShow(this.status)[0];
		} else {
			this.groupBattleTimeDisplay.visible = false;
		}

		// 信息面板设置
		if (isBattle) {
			this.imgUnionInfoBG.source = cachekey(UIConfig.UIConfig_Union.main.BattleHoloInfoBboard, this);
			this.imgUnionInfoName.source = cachekey(UIConfig.UIConfig_Union.infoPanel[6], this);
			this.imgUnionInfoServer.source = cachekey(UIConfig.UIConfig_Union.infoPanel[7], this);
			this.imgUnionInfoSegment.source = cachekey(UIConfig.UIConfig_Union.infoPanel[8], this);
			this.imgUnionInfoScore.source = cachekey(UIConfig.UIConfig_Union.infoPanel[9], this);
			this.imgUnionInfoRank.source = cachekey(UIConfig.UIConfig_Union.infoPanel[10], this);

			this.stageOfBattle()

		} else {
			this.imgUnionInfoBG.source = cachekey(UIConfig.UIConfig_Union.main.HoloInfoBboard, this);
			this.imgUnionInfoName.source = cachekey(UIConfig.UIConfig_Union.infoPanel[1], this);
			this.imgUnionInfoServer.source = cachekey(UIConfig.UIConfig_Union.infoPanel[2], this);
			this.imgUnionInfoSegment.source = cachekey(UIConfig.UIConfig_Union.infoPanel[3], this);
			this.imgUnionInfoScore.source = cachekey(UIConfig.UIConfig_Union.infoPanel[4], this);
			this.imgUnionInfoRank.source = cachekey(UIConfig.UIConfig_Union.infoPanel[5], this);

			this.stageOfReady();
		}
	}

	/* ************************** 通用 ************************** */

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	// 设置顶部页签
	private setBookmarks() {
		let wDay = PlayerLeagueSystem.GetDay();
		let textColor = 0x5B2205;
		switch (wDay) {
			case 1:
				this.imgBookmark1.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark1.textColor = textColor;
				break;
			case 2:
				this.imgBookmark2.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark2.textColor = textColor;
				break;
			case 3:
				this.imgBookmark3.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark3.textColor = textColor;
				break;
			case 4:
				this.imgBookmark4.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark4.textColor = textColor;
				break;
			case 5:
				this.imgBookmark5.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark5.textColor = textColor;
				break;
			case 6:
				this.imgBookmark6.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark6.textColor = textColor;
				break;
			case 7:
				this.imgBookmark7.source = cachekey(UIConfig.UIConfig_Union.main.curBookmark, this);
				this.lbBookmark7.textColor = textColor;
				break;
		}
	}

	// 玩法说明
	private onBtnPlayDes() {
		egret.Tween.get(this.btnPlayDes).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(Common_RuleDialog)
				.then((dialog: Common_RuleDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.init(RuleConfig.UnionBattle);
				});
			egret.Tween.get(this.btnPlayDes).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 历史战绩
	private onBtnLastSettlement() {
		egret.Tween.get(this.btnLastSettlement).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueUnionBattleHisRecord)
				.then((dialog: LeagueUnionBattleHisRecord) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnLastSettlement).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 战功商店
	private onBtnMall() {
		egret.Tween.get(this.btnMall).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueMatchMallMain)
				.then((dialog: LeagueMatchMallMain) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnMall).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 公会排行
	private onBtnUnionRank() {
		// toast("公会排行");
		egret.Tween.get(this.btnUnionRank).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueUnionBattleRank)
				.then((dialog: LeagueUnionBattleRank) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnUnionRank).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 奖励预览
	private onBtnRewardPreview() {
		egret.Tween.get(this.btnRewardPreview).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueUnionRewardPreview)
				.then((dialog: LeagueUnionRewardPreview) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnRewardPreview).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	/* ********************************************************* */

	/* ************************ 准备阶段 ************************ */
	private stageOfReady() {
		this.readySetUnionInfoPanel();
		this.applyShipInfo();
	}

	private readySetUnionInfoPanel() {
		let leagueBase = Game.PlayerLeagueSystem.BaseInfo;
		this.lbInfoUnionName.text = leagueBase.name;
		this.lbInfoServerName.text = PlayerLeagueSystem.GetServerName(Game.Controller.selectedGroup().group_name);
		this.imgInfoSegment.source = cachekey(PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4], this);
		this.lbInfoRankScore.text = leagueBase.match_score.toString();
		this.lbInfoThisSerRank.text = leagueBase.match_rank.toString();
	}

	private applyShipInfo() {
		Game.PlayerLeagueSystem.leagueMatchFortress(6, false).then((resp: { leagueFortress: message.LeagueMatchInfo, member_formations: message.SimpleMemberFormationZip }) => {
			let info: Array<message.LeagueMatchFortress> = resp.leagueFortress.leagueFortress;
			this.readyDefendInfo = {};
			for (let v of info) {
				if (this.readyDefendInfo[v.type] == undefined) {
					this.readyDefendInfo[v.type] = [];
				}
				this.readyDefendInfo[v.type].push(v);
			}
			this.setAirshipOur();
		});
	}

	private setAirshipOur(bool: boolean = false) {
		this.readyAirship = {};
		for (let i = 1; i <= CommonConfig.league_match_fortress_team_num.length; i++) {
			let airship = new UnionBattleAirshipOur(i, this.readyDefendInfo[i] == undefined ? 0 : this.readyDefendInfo[i].length);

			switch (i) {
				case 1:
					this.lbAirship1.textFlow = Util.RichText(airship.getDefendLabelString());
					break;
				case 2:
					this.lbAirship2.textFlow = Util.RichText(airship.getDefendLabelString());
					break;
				case 3:
					this.lbAirship3.textFlow = Util.RichText(airship.getDefendLabelString());
					break;
				case 4:
					this.lbAirship4.textFlow = Util.RichText(airship.getDefendLabelString());
					break;
				case 5:
					this.lbAirship5.textFlow = Util.RichText(airship.getDefendLabelString());
					break;
			}

			this.readyAirship[i] = airship;
		};

		this.selectShip(this.shipFocus);
	}

	private playAnimation(index: number) {
		Game.DragonBonesManager.playAnimation(this, "xuanzhong_eff", "armatureName", null, 0)
			.then(display => {
				switch (index) {
					case 1:
						let ani1 = this.groupBigAirship.getChildByName("ani1");
						if (!ani1) {
							display.x = this.groupBigAirship.width / 2;
							display.y = this.groupBigAirship.height / 2;
							display.name = "ani1";
							this.groupBigAirship.addChild(display);
						}
						break;
					case 2:
						let ani2 = this.groupAirshipLeft.getChildByName("ani2");
						if (!ani2) {
							display.x = this.groupAirshipLeft.width / 2;
							display.y = this.groupAirshipLeft.height / 2;
							display.scaleX = 0.9;
							display.scaleY = 0.9;
							display.name = "ani2";
							this.groupAirshipLeft.addChild(display);
						}
						break;
					case 3:
						let ani3 = this.groupAirshipRight.getChildByName("ani3");
						if (!ani3) {
							display.x = this.groupAirshipRight.width / 2;
							display.y = this.groupAirshipRight.height / 2;
							display.scaleX = 0.9;
							display.scaleY = 0.9;
							display.name = "ani3";
							this.groupAirshipRight.addChild(display);
						}
						break;
					case 4:
						let ani4 = this.groupSmallAirshipLeft.getChildByName("ani4");
						if (!ani4) {
							display.x = this.groupSmallAirshipLeft.width / 2;
							display.y = this.groupSmallAirshipLeft.height / 2;
							display.scaleX = 0.7;
							display.scaleY = 0.7;
							display.name = "ani4";
							this.groupSmallAirshipLeft.addChild(display);
						}
						break;
					case 5:
						let ani5 = this.groupSmallAirshipRight.getChildByName("ani5");
						if (!ani5) {
							display.x = this.groupSmallAirshipRight.width / 2;
							display.y = this.groupSmallAirshipRight.height / 2;
							display.scaleX = 0.7;
							display.scaleY = 0.7;
							display.name = "ani5";
							this.groupSmallAirshipRight.addChild(display);
						}
						break;
				}
			});
	}

	private stopAnimation(index: number) {
		switch (index) {
			case 1:
				let ani1 = this.groupBigAirship.getChildByName("ani1");
				if (ani1) this.groupBigAirship.removeChild(ani1);
				break;
			case 2:
				let ani2 = this.groupAirshipLeft.getChildByName("ani2");
				if (ani2) this.groupAirshipLeft.removeChild(ani2);
				break;
			case 3:
				let ani3 = this.groupAirshipRight.getChildByName("ani3");
				if (ani3) this.groupAirshipRight.removeChild(ani3);
				break;
			case 4:
				let ani4 = this.groupSmallAirshipLeft.getChildByName("ani4");
				if (ani4) this.groupSmallAirshipLeft.removeChild(ani4);
				break;
			case 5:
				let ani5 = this.groupSmallAirshipRight.getChildByName("ani5");
				if (ani5) this.groupSmallAirshipRight.removeChild(ani5);
				break;
		}
	}

	private readyAirShipSelect(index: number) {
		for (let k in this.readyAirship) {
			this.stopAnimation(Number(k));
			switch (Number(k)) {
				case 1:
					this.imgAirship1.source = cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
					break;
				case 2:
					this.imgAirship2.source = cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
					break;
				case 3:
					this.imgAirship3.source = cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
					break;
				case 4:
					this.imgAirship4.source = cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
					break;
				case 5:
					this.imgAirship5.source = cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
					break;
			}
		}

		switch (index) {
			case 1:
				this.imgAirship1.source = cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
				break;
			case 2:
				this.imgAirship2.source = cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
				break;
			case 3:
				this.imgAirship3.source = cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
				break;
			case 4:
				this.imgAirship4.source = cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
				break;
			case 5:
				this.imgAirship5.source = cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
				break;
		}

		this.playAnimation(index);
	}

	// 刷新飞艇信息面板
	private updateAirshipInfoPanel(index: number) {
		let airship: UnionBattleAirshipOur = this.readyAirship[index];
		this.currentShipType = index;
		this.lbInfoName.textFlow = Util.RichText(airship.getName());//Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.airshipInfo[0], airship.getName()));
		this.lbInfoLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.airshipInfo[1], airship.getLevel());
		this.lbInfoNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.airshipInfo[2], PlayerLeagueSystem.GetMaxScore(airship.getIndex()), PlayerLeagueSystem.GetMaxScore(airship.getIndex()));
		this.lbInfoDefend.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.airshipInfo[3], airship.getDefendInfo()));

		// 是否是会长和副会长
		let isLeader: boolean = (this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER || this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER);
		this.btnViewSet.visible = isLeader;
		this.btnViewDetails.visible = !isLeader;

		let defendCount: number = 0;
		for (let k in this.readyDefendInfo) {
			defendCount = defendCount + this.readyDefendInfo[k].length;
		}
		this.lbDefendTeam.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.defendTeams, defendCount.toString());
	}

	private selectShip(index: number) {
		this.shipFocus = index;
		this.readyAirShipSelect(index);
		this.updateAirshipInfoPanel(index);
	}

	private onGroupBigAirship() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD;
		this.selectShip(index);
	}

	private onGroupAirshipLeft() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE;
		this.selectShip(index);
	}

	private onGroupAirshipRight() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO;
		this.selectShip(index);
	}

	private onGroupSmallAirshipLeft() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE;
		this.selectShip(index);
	}

	private onGroupSmallAirshipRight() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO;
		this.selectShip(index);
	}

	// 查看详情
	private onBtnViewDetails() {
		// toast("查看详情");
		egret.Tween.get(this.btnViewDetails).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueMatchMemberFormation)
				.then((dialog: LeagueMatchMemberFormation) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.currentShipType);
				});
			egret.Tween.get(this.btnViewDetails).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 布置防守
	private onBtnViewSet() {
		// toast("布置防守");
		egret.Tween.get(this.btnViewSet).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueMatchSelectDefenceFormation)
				.then((dialog: LeagueMatchSelectDefenceFormation) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.currentShipType);
				});
			egret.Tween.get(this.btnViewSet).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 设置阵容
	private onBtnSetLineUp() {
		// toast("我的阵容");
		egret.Tween.get(this.btnSetLineUp).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			// "HXH_CommonFormationPvpMatch"
			Game.PlayerInstanceSystem.curInstanceType = 25;
			loadUI(CommonFormationPvpMatch)
				.then((dialog: CommonFormationPvpMatch) => {
					let isBattle: boolean = (this.status == TableEnum.Enum.UnionBattleStatus.Battle);
					dialog.setState(isBattle);
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnSetLineUp).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	// 报名
	private onBtnSignUP() {
		egret.Tween.get(this.lbSignUpConsume).to({ scaleX: 1.1, scaleY: 1.1 }, 120);
		egret.Tween.get(this.btnSignUP).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			if (this.userOfID != message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER && this.userOfID != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) { // 会长或者副会长
				toast_warning(LANG(TextsConfig.TextsConfig_Match.sign_conditions[0]));
				return;
			}

			if (Game.PlayerLeagueSystem.BaseInfo.curNum < CommonConfig.league_match_limit_members) { // 参赛人数
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Match.sign_conditions[1], CommonConfig.league_match_limit_members);
				toast_warning(str);
				return;
			}

			if (Game.PlayerLeagueSystem.BaseInfo.enliven_all < CommonConfig.league_match_sign_consume_enliven) { // 活跃度
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Match.sign_conditions[3], CommonConfig.league_match_sign_consume_enliven);
				toast_warning(str);
				return;
			}

			let count: number = 0;
			for (let k in this.readyAirship) {
				if (this.readyAirship[k].getDefendNumber() == 0) {
					toast_warning(LANG(TextsConfig.TextsConfig_Match.sign_conditions[4]));
					return;
				}

				count = count + this.readyAirship[k].getDefendNumber();
			}

			if (Game.PlayerLeagueSystem.BaseInfo.level < CommonConfig.league_match_join_limit_level) { // 解锁等级
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Match.sign_conditions[5], CommonConfig.league_match_join_limit_level);
				toast_warning(str);
				return;
			}

			Game.PlayerLeagueSystem.leagueMatchSign().then(() => {
				this.update2();
				toast(LANG(TextsConfig.TextsConfig_Match.sign_success));
				let currentSecond: number = PlayerLeagueSystem.GetCurSecond(true);
				if (currentSecond >= CommonConfig.league_match_start_close_time[0]) { // 12点以后
					Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon = true;
				}
			});

			egret.Tween.get(this.lbSignUpConsume).to({ scaleX: 1, scaleY: 1 }, 100);
			egret.Tween.get(this.btnSignUP).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	/* ********************************************************* */

	/* ************************ 战斗阶段 ************************ */

	private stageOfBattle(bool: boolean = false) {
		this.enemyUnionInfo = Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo;
		this.battleSetUnionInfoPanel(bool);
	}

	private applyBattleInfo(bool: boolean = false) {
		this.starred = [[], [], [], [], []]; // 获得星星信息
		this.enemyStarred = [[], [], [], [], []]; // 敌方获得星星信息
		Game.PlayerLeagueSystem.leagueMatchOpponentFortress(this.enemyUnionInfo.leagueId, 1).then((resp: { matchInfo: message.LeagueMatchInfo, battleInfo: message.LeagueMatchBattleFortressInfo, selfInfo: message.LeagueMatchInfo, leagueBattles: Array<message.leagueBattleName> }) => {
			let battleInfo: Array<message.IIKVPairs> = resp.battleInfo.fortressStar;
			let enemyInfo: Array<message.IIKVPairs> = resp.matchInfo.fortressStar;

			// 筛选重复数据
			let enemyDataFilter: Array<message.IIKVPairs> = [];
			for (let v of enemyInfo) {
				let has: boolean = false;
				for (let vv of enemyDataFilter) {
					if (v.key == vv.key) {
						has = true;
					}
				}

				if (!has) {
					enemyDataFilter.push(v);
				}
			}

			let ourDataFilter: Array<message.IIKVPairs> = [];
			for (let v of battleInfo) {
				let has: boolean = false;
				for (let vv of ourDataFilter) {
					if (v.key == vv.key) {
						has = true;
					}
				}

				if (!has) {
					ourDataFilter.push(v);
				}
			}

			// 格式化
			for (let v of ourDataFilter) {
				this.starred[Math.floor(v.key / 100) - 1].push(v.value);
			}
			for (let v of enemyDataFilter) {
				this.enemyStarred[Math.floor(v.key / 100) - 1].push(v.value);
			}

			this.setAirshipEnemy(bool);
			this.setScoreBar();
		});
	}

	// 信息面板
	private battleSetUnionInfoPanel(bool: boolean = false) {
		let info = this.enemyUnionInfo;
		this.lbInfoUnionName.text = info.leagueName;
		this.lbInfoServerName.text = PlayerLeagueSystem.GetServerName(info.group_name);
		this.imgInfoSegment.source = cachekey(PlayerLeagueSystem.GetSegment(info.score)[4], this);
		this.lbInfoRankScore.text = info.score.toString();
		this.lbInfoThisSerRank.text = info.rank_self.toString();

		this.applyBattleInfo(bool);
	}

	// 顶部积分条
	private setScoreBar() {
		let ourScore: number = PlayerLeagueSystem.ScoreCalculation(this.starred); // 我方得分
		let enemyScore: number = PlayerLeagueSystem.ScoreCalculation(this.enemyStarred); // 敌方得分
		this.ourCurrentScore = ourScore;
		this.enemyCurrentScore = enemyScore;

		let leagueBase = Game.PlayerLeagueSystem.BaseInfo;
		this.rectBattleOurLoadingBarMask.width = (PlayerLeagueSystem.GetMaxScore() - enemyScore) / PlayerLeagueSystem.GetMaxScore() * this.imgBattleOurLoadingBar.width;
		this.rectBattleEnemyLoadingBarMask.width = (PlayerLeagueSystem.GetMaxScore() - ourScore) / PlayerLeagueSystem.GetMaxScore() * this.imgBattleEnemyLoadingBar.width;
		this.rectBattleOurLoadingBarMask.visible = true;
		this.rectBattleEnemyLoadingBarMask.visible = true;
		this.imgBattleOurLoadingBar.mask = this.rectBattleOurLoadingBarMask;
		this.imgBattleEnemyLoadingBar.mask = this.rectBattleEnemyLoadingBarMask;

		this.lbBattleOurScore.text = (PlayerLeagueSystem.GetMaxScore() - enemyScore).toString();
		this.lbBattleEnemyScore.text = (PlayerLeagueSystem.GetMaxScore() - ourScore).toString();

		if (ourScore == enemyScore) {
			this.imgBattleStateLogo.source = cachekey(UIConfig.UIConfig_Union.main.VS_draw, this);
		} else if (ourScore < enemyScore) {
			this.imgBattleStateLogo.source = cachekey(UIConfig.UIConfig_Union.main.VS_enemyWin, this);
		} else {
			this.imgBattleStateLogo.source = cachekey(UIConfig.UIConfig_Union.main.VS_ourWin, this);
		}

		this.lbAtkTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.scoreBar[0], CommonConfig.league_match_member_attack_times - Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime, CommonConfig.league_match_member_attack_times);
	}

	private playBattleAnimation(index: number) {
		let animation: string = "";
		switch (index) {
			case 1: animation = "battle"; break;
			case 2: animation = "battle2"; break;
			case 3: animation = "battle3"; break;
			case 4: animation = "battle4"; break;
			case 5: animation = "battle5"; break;
		}

		Game.DragonBonesManager.playAnimation(this, "cj_bangzhan_feiting", "armatureName", animation, 0)
			.then(display => {
				switch (index) {
					case 1:
						let ani1 = this.groupSpine1.getChildByName("ani1");
						if (!ani1) {
							display.x = this.groupSpine1.width / 2;
							display.y = this.groupSpine1.height / 2;
							display.name = "ani1";
							this.groupSpine1.addChildAt(display, 0);
							this.imgBattleAirship1.visible = false;
						}
						break;
					case 2:
						let ani2 = this.groupSpine2.getChildByName("ani2");
						if (!ani2) {
							display.x = this.groupSpine2.width / 2;
							display.y = this.groupSpine2.height / 2;
							display.name = "ani2";
							this.groupSpine2.addChildAt(display, 0);
							this.imgBattleAirship2.visible = false;
						}
						break;
					case 3:
						let ani3 = this.groupSpine3.getChildByName("ani3");
						if (!ani3) {
							display.x = this.groupSpine3.width / 2;
							display.y = this.groupSpine3.height / 2;
							display.name = "ani3";
							this.groupSpine3.addChildAt(display, 0);
							this.imgBattleAirship3.visible = false;
						}
						break;
					case 4:
						let ani4 = this.groupSpine4.getChildByName("ani4");
						if (!ani4) {
							display.x = this.groupSpine4.width / 2;
							display.y = this.groupSpine4.height / 2;
							display.name = "ani4";
							this.groupSpine4.addChildAt(display, 0);
							this.imgBattleAirship4.visible = false;
						}
						break;
					case 5:
						let ani5 = this.groupSpine5.getChildByName("ani5");
						if (!ani5) {
							display.x = this.groupSpine5.width / 2;
							display.y = this.groupSpine5.height / 2;
							display.name = "ani5";
							this.groupSpine5.addChildAt(display, 0);
							this.imgBattleAirship5.visible = false;
						}
						break;
				}
			});

		Game.DragonBonesManager.playAnimation(this, "xuanzhong_eff", "armatureName", "001_xuanzhong2", 0)
			.then(display => {
				switch (index) {
					case 1:
						let ani1 = this.groupSpine1.getChildByName("ani11");
						if (!ani1) {
							display.x = this.groupSpine1.width / 2;
							display.y = this.groupSpine1.height / 2;
							display.name = "ani11";
							this.groupSpine1.addChild(display);
						}
						break;
					case 2:
						let ani2 = this.groupSpine2.getChildByName("ani21");
						if (!ani2) {
							display.x = this.groupSpine2.width / 2;
							display.y = this.groupSpine2.height / 2;
							display.scaleX = 0.9;
							display.scaleY = 0.9;
							display.name = "ani21";
							this.groupSpine2.addChild(display);
						}
						break;
					case 3:
						let ani3 = this.groupSpine3.getChildByName("ani31");
						if (!ani3) {
							display.x = this.groupSpine3.width / 2;
							display.y = this.groupSpine3.height / 2;
							display.scaleX = 0.9;
							display.scaleY = 0.9;
							display.name = "ani31";
							this.groupSpine3.addChild(display);
						}
						break;
					case 4:
						let ani4 = this.groupSpine4.getChildByName("ani41");
						if (!ani4) {
							display.x = this.groupSpine4.width / 2;
							display.y = this.groupSpine4.height / 2;
							display.scaleX = 0.7;
							display.scaleY = 0.7;
							display.name = "ani41";
							this.groupSpine4.addChild(display);
						}
						break;
					case 5:
						let ani5 = this.groupSpine5.getChildByName("ani51");
						if (!ani5) {
							display.x = this.groupSpine5.width / 2;
							display.y = this.groupSpine5.height / 2;
							display.scaleX = 0.7;
							display.scaleY = 0.7;
							display.name = "ani51";
							this.groupSpine5.addChild(display);
						}
						break;
				}
			});
	}

	private setAirshipEnemy(bool: boolean) {
		let setStarInfo = (index: number, starInfo: Array<number>): [number, number] => {
			let starNumber = 0; // 当前已被打星星数
			let currentScore = 0; // 当前已被打分数

			for (let v of starInfo) {
				starNumber = starNumber + v;
				currentScore = currentScore + CommonConfig.league_match_fortress_star_socre[index - 1][v - 1];
			}
			if (starInfo.length == CommonConfig.league_match_fortress_team_num[index - 1]) {
				currentScore = currentScore + CommonConfig.league_match_fortress_extra_socre[index - 1];
			}

			return [starNumber, currentScore]
		}

		for (let i = 1; i <= CommonConfig.league_match_fortress_team_num.length; i++) {
			this.playBattleAnimation(i);
			switch (i) {
				case 1:
					this.lbGetStarNum1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.starInfoGreen, PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], PlayerLeagueSystem.GetMaxScore(i)));
					break;
				case 2:
					this.lbGetStarNum2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.starInfoGreen, PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], PlayerLeagueSystem.GetMaxScore(i)));
					break;
				case 3:
					this.lbGetStarNum3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.starInfoGreen, PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], PlayerLeagueSystem.GetMaxScore(i)));
					break;
				case 4:
					this.lbGetStarNum4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.starInfoGreen, PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], PlayerLeagueSystem.GetMaxScore(i)));
					break;
				case 5:
					this.lbGetStarNum5.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.starInfoGreen, PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], PlayerLeagueSystem.GetMaxScore(i)));
					break;
			}
		};
	}

	private onBtnBattleRecord() {
		// "HXH_MatchBattleRecord"
		egret.Tween.get(this.btnBattleRecord).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueMatchBattleRecord)
				.then((dialog: LeagueMatchBattleRecord) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.enemyUnionInfo.leagueId);
				});
			egret.Tween.get(this.btnBattleRecord).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	private onGroupSpine1() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD;
		this.selectOpponent(index);
	}

	private onGroupSpine2() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE;
		this.selectOpponent(index);
	}

	private onGroupSpine3() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO;
		this.selectOpponent(index);
	}

	private onGroupSpine4() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE;
		this.selectOpponent(index);
	}

	private onGroupSpine5() {
		let index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO;
		this.selectOpponent(index);
	}
	//公会状态
	private onBtnBattleSate() {
		// "HXH_UnionStatus"
		egret.Tween.get(this.btnBattleSate).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			loadUI(LeagueUnionStatus)
				.then((dialog: LeagueUnionStatus) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnBattleSate).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	private onBtnMyFormation() {
		// toast("我的阵容");
		egret.Tween.get(this.btnMyFormation).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(() => {
			// "HXH_CommonFormationPvpMatch"
			Game.PlayerInstanceSystem.curInstanceType = 25;
			loadUI(CommonFormationPvpMatch)
				.then((dialog: CommonFormationPvpMatch) => {
					let isBattle: boolean = (this.status == TableEnum.Enum.UnionBattleStatus.Battle);
					dialog.setState(isBattle);
					dialog.show(UI.SHOW_FROM_TOP);
				});
			egret.Tween.get(this.btnMyFormation).to({ scaleX: 1, scaleY: 1 }, 100);
		});
	}

	private selectOpponent(index: number) {
		if (this.enemyUnionInfo != null) {
			loadUI(LeagueMatchSelectOpponent)
				.then((dialog: LeagueMatchSelectOpponent) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(index, this.enemyUnionInfo, this.ourCurrentScore, this.enemyCurrentScore);
				});
		}
	}

	/* ********************************************************* */

}

// 己方飞艇
export class UnionBattleAirshipOur {
	private index: number;
	private infoNumber: number = 0;
	private infoDefend: number = 0;
	private defaultTexturePath: string = "";
	private selectedTexturePath: string = "";

	public constructor(index: number, infoDefend: number) {
		this.index = index;
		this.infoDefend = infoDefend;
		this.setInfo();
	}

	private setInfo() {
		if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD) {
			this.defaultTexturePath = UIConfig.UIConfig_Union.main.bigAirshipPic;
			this.selectedTexturePath = UIConfig.UIConfig_Union.main.bigAirshipSelect;
			this.infoNumber = CommonConfig.league_match_fortress_star_times[0];
		} else if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE || this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO) {
			this.defaultTexturePath = UIConfig.UIConfig_Union.main.AirshipPic;
			this.selectedTexturePath = UIConfig.UIConfig_Union.main.AirshipSelect;
			this.infoNumber = CommonConfig.league_match_fortress_star_times[1];
		} else if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE || this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO) {
			this.defaultTexturePath = UIConfig.UIConfig_Union.main.smallAirshipPic;
			this.selectedTexturePath = UIConfig.UIConfig_Union.main.smallAirshipSelect;
			this.infoNumber = CommonConfig.league_match_fortress_star_times[3];
		}
	}

	public getIndex(): number {
		return this.index;
	}

	public getName(): string {
		return TextsConfig.TextsConfig_Match.flyName[this.index - 1];
	}

	public getLevel(): string {
		return TextsConfig.TextsConfig_Match.level[this.index - 1];
	}

	public getNumber(): number {
		return this.infoNumber;
	}

	public getDefendInfo(): string {
		let str: string = "";
		if (this.infoDefend < CommonConfig.league_match_fortress_team_num[this.index - 1]) {
			str = Helper.StringFormat(TextsConfig.TextsConfig_Match.defendPeopleRed, this.infoDefend, CommonConfig.league_match_fortress_team_num[this.index - 1]);
		} else {
			str = Helper.StringFormat(TextsConfig.TextsConfig_Match.defendPeople, this.infoDefend, CommonConfig.league_match_fortress_team_num[this.index - 1]);
		}

		return str;
	}

	public getDefendNumber(): number {
		return this.infoDefend;
	}

	public getSelectedTexturePath(): string {
		return this.selectedTexturePath;
	}

	public getDefaultTexturePath(): string {
		return this.defaultTexturePath;
	}

	public getDefendLabelString(): string {
		if (this.infoDefend < CommonConfig.league_match_fortress_team_num[this.index - 1]) {
			return (Helper.StringFormat(TextsConfig.TextsConfig_Match.defendPeopleRed, this.infoDefend, CommonConfig.league_match_fortress_team_num[this.index - 1]));
		} else {
			return (Helper.StringFormat(TextsConfig.TextsConfig_Match.defendPeople, this.infoDefend, CommonConfig.league_match_fortress_team_num[this.index - 1]));
		}
	}
}

}