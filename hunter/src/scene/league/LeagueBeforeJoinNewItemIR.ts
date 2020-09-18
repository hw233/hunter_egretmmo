namespace zj {
// lizhengqiang
// 20181213
export class LeagueBeforeJoinItemNewIR extends eui.ItemRenderer {
	private lbLeagueName: eui.Label;
	private lbLeagueLevel: eui.Label;
	private lbMemberNum: eui.Label;
	private imgStar: eui.Image;
	private lbLeaderName: eui.Label;
	private lbLimit: eui.Label;
	private btnJoin: eui.Button;

	private father: LeagueBeforeJoinNew;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBeforeJoinNewItemIRSkin.exml";
		cachekeys(<string[]>UIResource["LeagueBeforeJoinItemNewIR"], null);
		this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJoin, this);
		this.lbLeaderName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLbLeaderName, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}

	protected dataChanged() {
		this.father = this.data.father;
		let leagueBase: message.LeagueBase = this.data.leagueBase;
		if (leagueBase.leagueId == 0) return;
		// 公会名称
		this.lbLeagueName.text = leagueBase.name;
		// 等级
		this.lbLeagueLevel.text = Helper.StringFormat(TextsConfig.TextConfig_League.levelDes, leagueBase.level);
		// 人数
		this.lbMemberNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberDesRank, leagueBase.curNum, TableLevel.Item(leagueBase.level).league_people);
		this.lbMemberNum.textColor = ConstantConfig_Common.Color.black;
		if (leagueBase.curNum >= TableLevel.Item(leagueBase.level).league_people) {
			this.lbMemberNum.textColor = ConstantConfig_Common.Color.red;
		}
		// 段位
		let starPath = PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4];
		if (starPath != "") {
			this.imgStar.source = cachekey(starPath, this);
		} else {
			this.imgStar.visible = false;
		}
		// 会长
		this.lbLeaderName.text = leagueBase.leaderName;

		// 限制
		if (leagueBase.join_condition == 1 && leagueBase.join_level == 0) {
			this.lbLimit.text = TextsConfig.TextConfig_League.limitNone;
		} else if (leagueBase.join_condition == 2 || leagueBase.join_condition == 3) {
			this.lbLimit.text = TextsConfig.TextConfig_League.limitCondition[leagueBase.join_condition - 1];
			if (leagueBase.join_condition == 3) {
				this.lbLimit.textColor = ConstantConfig_Common.Color.red;
			}
		} else {
			this.lbLimit.text = Helper.StringFormat(TextsConfig.TextConfig_League.limitDes, leagueBase.join_level);
			if (leagueBase.join_level > Game.PlayerInfoSystem.Level) {
				this.lbLimit.textColor = ConstantConfig_Common.Color.red;
			}
		}
	}

	private onBtnJoin() {
		Game.PlayerProgressesSystem.checkProcess([message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE]).then(() => {
			Game.PlayerLeagueSystem.leagueApply(this.data.leagueBase.leagueId).then((resp) => {
				if (resp["status"] == 0) {
					loadUI(LeagueHomeScene)
						.then((scene: LeagueHomeScene) => {
							Game.EventManager.event(GameEvent.LEAGUE_BEFORE_JOIN_CLOSE);
							Game.EventManager.event(GameEvent.LEAGUE_CHOOSE_CLOSE);

							scene.init();
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (resp["status"] == 1) {
					this.btnJoin.touchEnabled = false;
					this.btnJoin.currentState = "disabled";
					toast_warning(LANG(TextsConfig.TextConfig_League.applySend));
				}
			}).catch((result) => {
				if (result == message.EC.XG_LEAGUE_QUIT_TIME_TOO_SHORT) {
					if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime > 0) {
						let strTime = Helper.FormatMsTime(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime)
						let str = Helper.StringFormat(TextsConfig.TextConfig_League.join_league_next, strTime)
						toast_warning(str);
					}
				} else {
					toast_warning(Game.ConfigManager.getAone2CodeReason(result));
				}
			});
		});
	}

	private onLbLeaderName() {
		// toast("会长信息");
		Game.PlayerInfoSystem.queryRoleInfo(this.data.leagueBase.leaderId, Game.Controller.lastLoginGroupID()).then((msg: message.RoleInfoZip) => {
			if (msg.baseInfo.id == Game.PlayerInfoSystem.BaseInfo.id) return;
			// "Chat_UserPopB"
			let point = this.lbLeaderName.localToGlobal();
			point.x -= Game.UIManager.x;
			this.father.managePop(msg, point);
		});
	}
}
}