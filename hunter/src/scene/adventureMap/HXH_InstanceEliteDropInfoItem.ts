namespace zj {
/**
 * 冒险---挑战列表掉落弹窗Item
 * created by Lian Lei
 * 2019.1.25
 */
export class HXH_InstanceEliteDropInfoItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private labelNum: eui.BitmapLabel;
	private groupStar: eui.Group;
	private groupRes: eui.Group;
	private labelTextInfo: eui.Label;
	private goodsId: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstanceEliteDropInfoItemSkin.exml";
		this.groupRes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginIcon, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnTouchEndIcon, this);
		cachekeys(<string[]>UIResource["HXH_InstanceEliteDropInfoItem"], null);
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: HXH_InstanceEliteDropInfoItemData) {
		this.goodsId = data.goodsId;
		let itemSet = PlayerItemSystem.Set(data.goodsId) as any;
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);
		this.labelNum.text = itemSet.Count;
		this.labelNum.visible = false;
		// this.labelTextInfo.text = data.des;

		if (itemSet.Info.client_star != null) {
			Helper.NodeStarByAlignLeft(this.groupStar, itemSet.Info.client_star, 6, null, false, UIConfig.UIConfig_Role.heroAwakenStar[1]);;
		}
	}

	private onBtnTouchBeginIcon(e: egret.TouchEvent) {
		let newThis = this;
		let _type: number = PlayerItemSystem.ItemType(this.data.goodsId);
		let touchX = e.stageX;
		let groupY: number;
		let type: number = 0;// type == 1 点击位置大于父类高度的一半

		if (e.stageY >= newThis.data.father.height / 2) {
			groupY = e.stageY - e.localY;
			type = 1;
		}
		else {
			groupY = e.stageY + 10;
		}

		if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
			loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
				dialog.name = "Drop";
				dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, null);
				newThis.data.father.addChild(dialog);
			});
		} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
			loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
				dialog.name = "Drop";
				dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, null);
				newThis.data.father.addChild(dialog);
			});
		} else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
			loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
				dialog.name = "Drop";
				dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, null);
				newThis.data.father.addChild(dialog);
			});
		} else {
			loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
				dialog.name = "Drop";
				dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.init(newThis.goodsId, null);
				newThis.data.father.addChild(dialog);
			});
		}
	}

	private onBtnTouchEndIcon() {
		this.data.father.onRemoveDialog();
	}
}

export class HXH_InstanceEliteDropInfoItemData {
	index: number;
	goodsId: number;
	des: string;
	father: HXH_InstanceEliteDropInfo;
}
}