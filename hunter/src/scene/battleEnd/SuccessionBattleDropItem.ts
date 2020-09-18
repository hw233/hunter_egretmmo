namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-19
 * 
 * @class 奖励子项
 */
export class SuccessionBattleDropItem extends eui.ItemRenderer {
	public SpriteWhite: eui.Image;
	public SpriteItemFrame: eui.Image;
	public SpriteItemIcon: eui.Image;
	public SpriteNode: eui.Group;
	public LabelNum: eui.BitmapLabel;

	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/SuccessionBattleDropItemSkin.exml";
		cachekeys(<string[]>UIResource["SuccessionBattleDropItem"], null);
	}

	protected dataChanged() {
		let data = this.data as SuccessionBattleDropItemData;
		let itemSet = PlayerItemSystem.Set(data.itemInfo.goodsId, null, data.itemInfo.count);
		this.SpriteItemIcon.source = cachekey(itemSet.Clip, this);
		this.SpriteItemFrame.source = cachekey(itemSet.Frame, this);
		// this.Labe

		//叠加数量
		this.LabelNum.text = data.itemInfo.count.toString();
		let cardInfo = TableItemPotato.Table();
		let cardId = Table.FindF(CardInfo, (k, v) => {
			return v.id == data.itemInfo.goodsId;
		});

		if (data.showWhite == false) {
			this.SpriteWhite.visible = false;
		}
	}
}
export class SuccessionBattleDropItemData {
	index: number;
	itemInfo: message.GoodsInfo;
	father: Relic_BigEnd;
	showWhite: boolean;
}
}