namespace zj {
/**
 * yuqingchao
 * 2018.12.10
 * 公会建设List
 */
export class LeagueDonateItem extends eui.ItemRenderer {
	private imgTypeName: eui.Image;
	private lbCost: eui.Label; // 消耗金币或者代币
	private lbGetExp: eui.Label; // 获得经验	
	private lbGetToken: eui.Label; // 获得公会贡献值
	private imgBoardFrame: eui.Image;
	private imgCost: eui.Image; // 小金币
	private imglcon: eui.Image; // 大金币

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueDonateItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityXuyuanLiveItem"], null);
	}

	protected dataChanged() {
		let tblDonate = TableLeagueDonate.Table();
		let num: number = this.data.num;

		if (tblDonate[num].consume_token == 0) {
			this.imgCost.source = cachekey(UIConfig.UIConfig_League.donate[0], this);
			this.lbCost.text = tblDonate[num].consume_money.toString();
		}
		else {
			this.imgCost.source = cachekey(UIConfig.UIConfig_League.donate[1], this);
			this.lbCost.text = tblDonate[num].consume_token.toString();
		}

		this.lbGetExp.text = tblDonate[num].reward_exp.toString();
		this.lbGetToken.text = tblDonate[num].reward_token.toString();
		this.imgTypeName.source = cachekey(UIConfig.UIConfig_League.donateNmae[num - 1], this);
		this.imglcon.source = cachekey(UIConfig.UIConfig_League.donateIcon[num - 1], this);
		this.imgBoardFrame.visible = this.selected;
	}
}
}