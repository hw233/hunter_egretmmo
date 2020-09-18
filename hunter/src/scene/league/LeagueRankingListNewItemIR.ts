namespace zj {
// lizhengqiang
// 20181227
export class LeagueRankingListItemNewIR extends eui.ItemRenderer {
	private groupItem: eui.Group;
	private lbLeagueNo: eui.Label;
	private lbLeagueName: eui.Label;
	private lbLeagueLevel: eui.Label;
	private lbMemberNum: eui.Label;
	private imgStar: eui.Image;
	private lbLeaderStrength: eui.Label;
	private lbLeaderName: eui.Label;

	private isFirst: boolean = true;
	private father: LeagueRankingListNew;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueRankingListNewItemIRSkin.exml";
		cachekeys(<string[]>UIResource["LeagueRankingListItemNewIR"], null);
		this.lbLeaderName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLbLeaderName, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}

	protected dataChanged() {
		closeCache(this.groupItem);
		this.father = this.data.father;
		let leagueBase: message.LeagueBase = this.data.leagueBase;
		let rankNo: number = this.data.rankNo;
		if (leagueBase.leagueId == 0) return;
		// 排名
		this.lbLeagueNo.text = rankNo.toString();
		// 公会名称
		this.lbLeagueName.text = leagueBase.name;
		// 等级
		this.lbLeagueLevel.text = leagueBase.level.toString();
		// 人数
		this.lbMemberNum.text = leagueBase.curNum + "/" + TableLevel.Item(leagueBase.level).league_people;
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
		// 总战力
		this.lbLeaderStrength.text = leagueBase.battle_value >= 10000 ? ((Math.floor(leagueBase.battle_value / 10000)).toString() + "万") : leagueBase.battle_value.toString();
		// 会长
		this.lbLeaderName.text = leagueBase.leaderName;
		
		setCache(this.groupItem);

		if (this.isFirst && rankNo < 8) {
			let groupItemX: number = this.groupItem.x;
			this.groupItem.x = this.groupItem.width;

			egret.Tween.get(this.groupItem)
				.wait(rankNo * 10)
				.to({ x: groupItemX }, 260)
				.call(() => {
					this.isFirst = false;
				});
		}
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