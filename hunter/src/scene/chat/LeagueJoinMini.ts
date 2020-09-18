namespace zj {
export class LeagueJoinMini extends Dialog {
	public JoinGuild: eui.Group;
	public ButtonClose: eui.Button;
	public SpriteFrame: eui.Image;
	public SpriteHead: eui.Image;
	public TextUnionName: eui.Label;
	public SpriteUnionRank: eui.Image;
	public UnionLevel: eui.Label;
	public TextUnionLevel: eui.Label;
	public UnionNumber: eui.Label;
	public TextUnionNum: eui.Label;
	public UnionLimit: eui.Label;
	public TextUnionLimit: eui.Label;
	public SpriteSelect: eui.Image;
	public TextNotice: eui.Label;
	public UnionLeader: eui.Label;
	public TextUnionLeader: eui.Label;
	public ButtonApplication: eui.Button;

	private callBack: () => void;

	public _leagueBase;
	public _sameServer;

	public constructor() {
		super();
		this.skinName = "resource/skins/chat/LeagueJoinMiniSkin.exml";
		this.init();
		this.monitorEvent();
	}

	public init() {
		this.JoinGuild.visible = true;
	}

	public monitorEvent() {
		this.ButtonApplication.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonApplication, this);// 申请加入
		this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClose, this);// 关闭
	}

	public SetInfo(leagueBase: message.LeagueBase, sameServer: boolean) {
		this._leagueBase = leagueBase;
		this._sameServer = sameServer;
		this.SetOtherInfo();
		this.SetButtonState();
	}

	public SetOtherInfo() {
		if (this._leagueBase.leagueId == 0) {
			return;
		}
		let leagueName = this._leagueBase.name;
		let leagueLv = this._leagueBase.level;
		this.TextUnionName.text = leagueName;
		let tblHead = TableItemPic.Table();
		let notice = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.introduceDes, this._leagueBase.introduce);

		this.TextNotice.text = notice;
		this.SpriteHead.source = tblHead[this._leagueBase.picId].path;
		this.TextUnionLevel.text = leagueLv;
		this.TextUnionLeader.text = this._leagueBase.leaderName;
		this.TextUnionNum.text = Helper.StringFormat("%s/%s", this._leagueBase.curNum, TableLevel.Item(this._leagueBase.level).league_people);

		let limit2 = null;
		if (this._leagueBase.join_level <= 1) {
			limit2 = TextsConfig.TextConfig_League.limitLevelNone;
		} else {
			limit2 = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.limitLevel, this._leagueBase.join_level);
		}
		this.TextUnionLimit.text = limit2;

		// 帮会积分星级
		if (this._leagueBase.leagueName != "" && this._leagueBase.match_score != null) {
			let leagueStarPath = PlayerLeagueSystem.GetSegment(this._leagueBase.match_score)[2];
			this.SpriteUnionRank.source = leagueStarPath;
		} else {
			this.SpriteUnionRank.visible = false;
		}
	}

	public SetButtonState() {
		let bInLeague = Game.PlayerInfoSystem.BaseInfo.leagueId == 0 && this._sameServer;
		this.ButtonApplication.enabled = bInLeague;
	}

	public SetCB(cb: () => void) {
		this.callBack = cb;
	}

	/**
	 * 申请加入
	 */
	public onButtonApplication() {
		if (PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE, true)) {
			let visit_func = (host, msg, result) => {
				if (result == 0) {
					toast_success(TextsConfig.TextConfig_League.applySend);
					this.SetButtonState();
				}
			}
			if (this._leagueBase.leagueId == 0) {
				toast_success(TextsConfig.TextsConfig_Error.no_league_to_join);
			} else if (Game.PlayerInfoSystem.BaseInfo.leagueId == 0) {
				Game.PlayerChatDataSystem.applyJoin(this._leagueBase)
					.then((msg) => {
						visit_func;
					});
			} else {
				toast_success(TextsConfig.TextsConfig_Error.league_already);
			}
		}
		this.onButtonClose();
	}

	/**
	 * 获取角色数据
	 */
	public ReqRoleInfo() {
		Game.PlayerChatDataSystem.RoleDate(this._leagueBase)
			.then((msg) => {
				this.ManagePop(msg);
			});
	}

	public ManagePop(msg) {
		if (msg.baseInfo.id == Game.PlayerInfoSystem.BaseInfo.id) {
			return;
		}
		let pop = new Chat_UserPopB();
		pop.name = "Chat_UserPopB";
		pop.setMsgInfo(msg);
		this.addChild(pop);
	}

	public onButtonClose() {
		if (this.callBack) {
			this.callBack();
		}
		this.close();
	}
}
}