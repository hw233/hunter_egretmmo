namespace zj {
//VipLowItemB
//yuqingchao
//2019.04.12
export class VipLowItemB extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private lbNum: eui.Label;
	private groupTap: eui.Group;
	private good: number;
	private count: number;
	private groupMask: eui.Group;
	private groupAnimal: eui.Group;
	private i: number = 0;
	private j: number = 0;
	private father: VipLowGift;

	private imgMask: eui.Image;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/vip/VipLowItemBSkin.exml";
		cachekeys(<string[]>UIResource["VipLowItemB"], null);
		this.groupTap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		// 碎片遮罩
		this.imgMask = new eui.Image();
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupMask.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(73, 70);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 0;
		this.groupMask.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupMask.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
			this.data.father = null;
			this.groupTap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupTap, this);
		}, null);
	}
	private init() {
		this.imgFrame.visible = true;
		this.imgIcon.visible = true;
		this.imgMask.visible = true;
		this.groupMask.visible = true;
		this.groupTap.visible = true;
		this.groupAnimal.visible = true;
		// this.groupMask.cacheAsBitmap = true;

		this.imgMask.visible = false;
	}
	protected dataChanged() {
		closeCache(this.groupMask);
		this.init();
		if (this.data.father == null) return;
		this.rectMaskCommon.visible = false;
		this.rectMask.visible = false;
		this.imgMask.visible = false;
		this.good = this.data.good;
		this.count = this.data.count;
		this.i = this.data.i;
		this.father = this.data.father;
		if (this.i >= 0 && this.i < 3) {
			this.i = this.i;
			this.j = 0;
		} else if (this.i >= 3) {
			this.i = this.i - 3;
			this.j = 1;
		}
		let itemSet = PlayerItemSystem.Set(this.good, 1, this.count);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		this.lbNum.text = this.count.toString();
		if (this.isImgMask(this.good)) {
			this.imgMask.visible = true;
			this.imgIcon.mask = this.imgMask;
		} else if (this.isRectMask(this.good)) {
			this.rectMask.visible = true;
			this.imgIcon.mask = this.rectMask;
		} else {
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.rectMaskCommon.visible = true;
			this.imgIcon.mask = this.rectMaskCommon;
		}

		this.groupAnimal.removeChildren();
		this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimal);

		setCache(this.groupMask);
	}
	//添加龙骨动画
	private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2 + 1;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
				display.scaleX = 0.8;
				display.scaleY = 0.8;
			})
			.catch(reason => {
				toast(reason);
			});
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

	private onGroupTap(e: egret.TouchEvent) {
		// this.onChooseItemTap(e);
	}
	private onShowGoodProperty(e: egret.TouchEvent) {
		let info = new message.GoodsInfo();
		info.goodsId = this.good;
		info.count = this.count;
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
	// 鼠标点击 掉落 材料说明
	// private onChooseItemTap(e) {
	// 	let info = new message.GoodsInfo();
	// 	info.goodsId = this.good;
	// 	info.count = this.count;
	// 	this.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
	// }
}
}