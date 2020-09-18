namespace zj {
//工会状态——玩家信息
//yuqingchao
//2019.02.27
export class LeagueUnionStatusItem extends eui.ItemRenderer {

	private imgFrame: eui.Image;		//头像框
	private imgPlayerIcon: eui.Image;		//头像

	private ibRank: eui.Label;		//排名
	private lbUnionName: eui.Label;		//成员名称
	private lbAtkTime: eui.Label;		//剩余攻击次数
	private lbContribution: eui.Label;		//贡献值

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionStatusItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueUnionStatusItem"], null);
	}
	protected dataChanged() {
		let info: message.MemberStatic = this.data.info;
		this.imgFrame.source = cachekey(TableItemPicFrame.Item(info.frame_id).path, this);
		this.imgPlayerIcon.source = cachekey(TableItemPic.Item(info.pic_id).path,this);
		this.lbUnionName.text = info.memberName;
		this.ibRank.text = this.data.id;
		this.lbContribution.text = info.dailyMatchBattleScore.toString();
		this.lbAtkTime.text = (CommonConfig.league_match_member_attack_times - info.dailyMatchBattleWinTime).toString();
	}
}
}