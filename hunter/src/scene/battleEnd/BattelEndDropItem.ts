namespace zj {
/** 
 * @author xingliwei
 * 
 * @date 2019-4-11
 * 
 * @class 结算界面掉落物品
 */
export class BattleEndDropItem extends eui.ItemRenderer {
	public BattleEnd_DropItem: eui.Group;
	public SpriteItemFrame: eui.Image;
	public SpriteItemIcon: eui.Image;
	public SpriteNode: eui.Group;
	public LabelNumber: eui.BitmapLabel;
	public SpritePiece: eui.Image;
	private SpriteItemFrame1: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEndDropItemSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		cachekeys(<string[]>UIResource["BattleEndDropItem"], null);
	}
	protected dataChanged() {
		let data = this.data as BattleEndDropItemData;
		let itemSet = PlayerItemSystem.Set(data.itemInfo.goodsId, null, data.itemInfo.count) as any;
		this.SpriteItemIcon.source = cachekey(itemSet.Clip, this);
		this.SpriteItemFrame.source = cachekey(itemSet.Frame, this);
		this.SpriteItemFrame1.source = cachekey(itemSet.Frame, this);
		this.SpritePiece.source = cachekey(itemSet.Logo, this);
		this.SpriteItemIcon.mask = this.SpriteItemFrame1;

		//叠加数量
		this.LabelNumber.text = data.itemInfo.count.toString();
		let cardInfo = TableItemPotato.Table();
		let cardId = Table.FindF(CardInfo, (k, v) => {
			return v.id == data.itemInfo.goodsId;
		})

		let Resume = () => {

		}
	}
	private touchBegin(e: egret.TouchEvent) {
		let data = this.data as BattleEndDropItemData;
		data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, data.itemInfo);
	}
}

export class BattleEndDropItemData {
	index: number;
	itemInfo: message.GoodsInfo;
	father;
}
}