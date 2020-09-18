namespace zj {
//战斗记录——贡献排名
//yuqingchao
//2019.02.27
export class LeagueMatchBattleRecordItemB extends eui.ItemRenderer {

	private ibRank: eui.Label;		//排名
	private imgFrame: eui.Image;		//头像框
	private imgPlayerIcon: eui.Image;		//头像

	private lbUnionName: eui.Label;		//玩家姓名
	private lbAtkTime: eui.Label;		//胜利次数
	private lbContribution: eui.Label;		//本场贡献值

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMatchBattleRecordItemBSkin.exml"
		cachekeys(<string[]>UIResource["LeagueMatchBattleRecordItemB"], null);
	}
	protected dataChanged() {
		let info: message.MemberStatic = this.data.info;
		this.ibRank.text = this.data.id;
		this.imgFrame.source = cachekey(TableItemPicFrame.Item(info.frame_id).path, this);
		this.imgPlayerIcon.source = cachekey(TableItemPic.Item(info.pic_id).path, this);
		this.lbUnionName.text = info.memberName;
		this.lbAtkTime.text = info.dailyMatchBattleWinTime.toString();
		this.lbContribution.text = info.dailyMatchBattleScore.toString();
	}
}
}