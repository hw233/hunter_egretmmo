namespace zj {
//Activity_BossMainPopHitItem
//yuqingchao
//2019.07.16 
export class Activity_BossMainPopHitItem extends eui.ItemRenderer {
	private lbRank: eui.Label;			//排名
	private lbServer: eui.Label;
	private lbName: eui.Label;			//猎人名
	private lbHit: eui.Label;			//伤害
	public constructor() {
		super();
		this.skinName = this.skinName = "resource/skins/activity/Activity_BossMainPopHitItemSkin.exml";
	}
	protected dataChanged() {
		let info = this.data.info;
		let i = this.data.i;

		this.lbName.text = info.roleName;
		this.lbRank.text = info.rank;
		this.lbHit.text = info.score;

		let sn = Set.DecodeJson(info.groupName);
		let splitList = sn.split("&");
		this.lbServer.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesBoss, splitList[0]);
	}
}
}