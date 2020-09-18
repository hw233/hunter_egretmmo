namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-5-25
 * 
 * @class 贪婪之岛包裹list子项
 */
export class CommonOneKeySellItem extends eui.ItemRenderer {
	public btnCllck: eui.Button;
	public groupItem: eui.Group;
	public imgFrame: eui.Image;
	public imgIcon: eui.Image;
	public labelName: eui.Label;
	public labelCount: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonOneKeySellItemSkin.exml"
		cachekeys(<string[]>UIResource["CommonOneKeySellItem"], null);
	}

	protected dataChanged() {
		let data = this.data as CommonOneKeySellItemData;
		if (data.goods == 0) {
			this.groupItem.visible = (false);
			return;
		}
		let goods = data.goods as message.GoodsInfo
		let itemSet = PlayerItemSystem.Set(goods.goodsId);

		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		let info = itemSet.Info as any;
		this.labelName.text = info.name;
		this.labelCount.text = "x" + goods.count;
	}


}
export class CommonOneKeySellItemData {
	goods: message.GoodsInfo | number;
}

}