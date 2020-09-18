namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-21
 * 
 * @class 执照主界面奖励list子项
 */
export class licenseProgressItem extends eui.ItemRenderer {
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	private labelNum: eui.BitmapLabel;
	private groupIcon: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/skins/license/licenseProgressItemSkin.exml";
		cachekeys(<string[]>UIResource["licenseProgressItem"], null);
	}

	/** 修改数据源被动执行*/
	protected dataChanged() {
		let data = this.data as licenseProgressItemData
		let itemSet = PlayerItemSystem.Set(data.goods, 0, data.count);
		this.imgBoard.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		this.labelNum.text = "x" + Set.NumberUnit2(data.count);
		if (data.count > 10000 && data.count < 100000) {
			// this.labelNum
		}

		function call() {
			let info = new message.GoodsInfo;
			info.goodsId = data.goods;
			info.count = data.count;
			TipManager.ShowProp(info, this, 0, 0, 0);
		}
	}
}
export class licenseProgressItemData {
	index: number
	goods: number;
	count: number;
	// father: licenseMain;
}
}