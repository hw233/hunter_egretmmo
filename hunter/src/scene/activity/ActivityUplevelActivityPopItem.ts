namespace zj {
//ActivityUplevelActivityPopItem
//yuqingchao
//2019.04.01
export class ActivityUplevelActivityPopItem extends eui.ItemRenderer {
	private lbLevel: eui.Label;				//排名
	private lbName: eui.Label;				//玩家名字
	private lbTime: eui.Label;				//时间
	private imgAwardRank: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityUplevelActivityPopItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityUplevelActivityPopItem"], null);
	}
	protected dataChanged() {
		let info = this.data.info;
		let i = this.data.i + 1;
		let find = this.data.find;
		if (info != null) {
			this.lbName.text = info.name;
			this.lbTime.text = info.rewardTime;
		} else {
			this.lbName.text = TextsConfig.TextsConfig_Activity.Rank_Charge.nobody;
			this.lbTime.text = "";
		}
		this.lbLevel.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.uplevelRank, i);
		this.imgAwardRank.source = cachekey(UIConfig.UIConfig_Activity.levelRank[find], this);
	}
}
}