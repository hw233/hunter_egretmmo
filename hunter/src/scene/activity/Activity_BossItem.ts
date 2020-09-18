namespace zj {
// Activity_BossItem
//yuqingchao
//2019.07.19
export class Activity_BossItem extends eui.ItemRenderer {
	private lbText: eui.Label;//排名
	private lbName: eui.Label;//名字
	private lbValue: eui.Label;//分数
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_BossItemSkin.exml";
	}
	protected dataChanged() {
		let info = this.data.info;
		this.lbName.text = info.roleName;
		this.lbText.text = info.rank;
		this.lbValue.text = info.score;
	}
}
}