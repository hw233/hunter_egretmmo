namespace zj {
//历史战绩-贡献排名
//yuqingchao
export class LeagueUnionBattleHisRecordItem1 extends eui.ItemRenderer {
	private ibRank: eui.Label;			//贡献排名
	private imgFrame: eui.Image;			//头像框
	private imgPlayerIcon: eui.Image;	//头像
	private lbUnionName: eui.Label;		//公会名称
	private lbAtkTime: eui.Label;		//进攻次数
	private lbContribution: eui.Label;	//贡献值

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordItemSkin1.exml";
		cachekeys(<string[]>UIResource["LeagueUnionBattleHisRecordItem1"], null);
	}

	protected dataChanged() {
		let info: message.MemberStatic = this.data.info;
		this.ibRank.text = this.data.id;
		this.imgFrame.source = cachekey(TableItemPicFrame.Item(info.frame_id).path, this);
		this.imgPlayerIcon.source = cachekey(TableItemPic.Item(info.pic_id).path,this);
		this.lbUnionName.text = info.memberName;
		this.lbAtkTime.text = info.weekMatchBattleWinTime.toString();
		this.lbContribution.text = info.weekMatchBattleScore.toString();
	}
}
}