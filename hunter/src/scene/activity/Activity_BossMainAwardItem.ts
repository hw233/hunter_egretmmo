namespace zj {
/**
 * @class Activity_BossMainAwardItem
 * 
 * @author Yu Qingchao
 * 
 * 2019.07.20
 */
export class Activity_BossMainAwardItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;//头像框
	private imgIcon: eui.Image;//头像
	private imgLogo: eui.Image;
	private lbNum: eui.Label;//数量
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_BossMainAwardItemSkin.exml";
	}
	protected dataChanged() {
		let good = this.data.info;
		let bln = this.data.bln;
		let itemSet: any = PlayerItemSystem.Set(good.goodsId, good.showType, good.count);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		this.imgLogo.source = cachekey(itemSet.Logo, this);
		this.lbNum.text = "X" + good.count;
		if (bln) {
			this.scaleX = 0.8;
			this.scaleY = 0.8;
		}
	}
}
}