namespace zj {
/**
 * 日常活跃度奖励预览Item
 * created by Lian Lei
 * 2019.03.19
 */
export class Daily_AwardPopItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private labelNum: eui.Label;
	private labelName: eui.Label;
	private groupHead: eui.Group;

	private goodsId: number;
	private count: number;
	private noName: string | boolean;
	private needDetail: string | boolean;

	private imgMask: eui.Image;		//碎片遮罩
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/daily/Daily_AwardPopItemSkin.exml";
		cachekeys(<string[]>UIResource["Daily_AwardPopItem"], null);
		this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupHead.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(73, 70);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 0;
		this.groupHead.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupHead.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	// 物品遮罩
	private isImgMask(goodsId: number): boolean {
		if (PlayerItemSystem.ItemType(goodsId) == 4
			//||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
			|| TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
			|| Math.floor(goodsId / 1000) == 37
			|| TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
			return true; //UIConfig.UIConfig_Role.mask.soul
		}

		return false;
	}
	// 徽章遮罩
	private isRectMask(goodsId: number): boolean {
		if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
			return true;
		}
		return false;
	}

	private updateView(data: Daily_AwardPopItemData) {
		this.goodsId = data.goodsId;
		this.count = data.count;
		this.noName = data.noName;
		this.needDetail = data.needDetail;
		if (this.isImgMask(data.goodsId)) {
			this.imgMask.visible = true;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = false;
			this.imgIcon.mask = this.imgMask;
		} else if (this.isRectMask(data.goodsId)) {
			this.imgMask.visible = false;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = true;
			this.imgIcon.mask = this.rectMask;
		} else {
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.rectMaskCommon.visible = true;
			this.imgIcon.mask = this.rectMaskCommon;
		}
		this.setInfo();
	}

	private setInfo() {
		if (this.noName == null) {
			this.noName = false;
		}

		let itemSet = PlayerItemSystem.Set(this.goodsId, null, this.count) as any;
		let strName: string = Helper.StringFormat("%s", itemSet.Info.name);
		if (this.noName) {
			strName = Helper.StringFormat("x%d", this.count);
		}
		this.labelNum.visible = this.count != 0;
		this.labelNum.text = Set.NumberUnit3(this.count);


		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);
		this.labelName.text = strName;
	}

	private onShowGoodProperty(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
}

export class Daily_AwardPopItemData {
	goodsId: number;
	count: number;
	noName: string | boolean;
	needDetail: string | boolean;
	father;
}
}