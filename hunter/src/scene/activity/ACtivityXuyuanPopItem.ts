namespace zj {

// yuqingchao
// 许愿屋---抽取成功--item
// 2019 05 14
export class ACtivityXuyuanPopItem extends eui.ItemRenderer {

	public imageFrame: eui.Image;
	public imageIcon: eui.Image;
	public labelTextNum: eui.BitmapLabel;
	public groupMain: eui.Group;
	private groupAni: eui.Group;
	private groupShow: eui.Group;

	private imgMask: eui.Image;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;
	private info = null;
	private displayAnimatoin = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanPopItemSkin.exml";
		cachekeys(<string[]>UIResource["ACtivityXuyuanPopItem"], null);
		this.groupShow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupMain.addChild(this.imgMask);
		this.imgMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupMain.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;

		this.groupMain.alpha = 1;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			let displayAnimatoin = this.displayAnimatoin;
			this.displayAnimatoin = null;
			if (displayAnimatoin && displayAnimatoin.parent) {
				displayAnimatoin.parent.removeChild(displayAnimatoin);
			}
		}, null);
	}

	public SetInfo(index, goods, father) {
		this.imgMask.visible = false;
		this.rectMaskCommon.visible = false;
		this.info = goods;
		if (PlayerItemSystem.ItemType(goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
			this.SetInfoHero(goods);
		} else {
			this.SetInfoItem(goods);
		}
		if (this.isImgMask(goods.goodsId)) {
			this.imgMask.visible = true;
			this.imageIcon.mask = this.imgMask;
		} else {
			this.imgMask.visible = false;
			this.rectMaskCommon.visible = true;
			this.imageIcon.mask = this.rectMaskCommon;
		}
		this.daojuguangAnimatoin();
	}
	//添加龙骨动画背景发光
	public daojuguangAnimatoin() {
		if (PlayerItemSystem.ItemQuality(this.info.goodsId) >= 5) {
			this.displayAnimatoin = null;
			this.addBackdropAnimatoin("ui_wawaji02_eff", null, "002_daojuguang_01", 0, this.groupAni);
		} else if (PlayerItemSystem.ItemQuality(this.info.goodsId) == 4) {
			this.displayAnimatoin = null;
			this.addBackdropAnimatoin("ui_wawaji02_eff", null, "004_daojuguang_03", 0, this.groupAni);
		} else { }
	}
	private addBackdropAnimatoin(dbName: string, armatureName: string, animationName: string, playTimes: number, group: eui.Group) {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
				this.displayAnimatoin = display;
			})
			.catch(reason => {
				toast(reason);
			});
	}

	private SetInfoHero(goods) {

		let itemSet = PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
		this.imageIcon.source = cachekey(itemSet.Clip, this);
		this.imageFrame.source = cachekey(itemSet.Frame, this);
		this.labelTextNum.text = "x" + goods.count;
	}

	private SetInfoItem(goods) {
		let itemSet = PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
		this.imageIcon.source = cachekey(itemSet.Clip, this);
		this.imageFrame.source = cachekey(itemSet.Frame, this);
		this.labelTextNum.text = "x" + goods.count;

	}

	// 物品遮罩
	private isImgMask(goodsId: number): boolean {
		if (PlayerItemSystem.ItemType(goodsId) == 4
			|| TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
			|| Math.floor(goodsId / 1000) == 37
			|| TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
			return true;
		}
		return false;
	}
	private onShowGoodProperty(e: egret.TouchEvent) {
		let info = new message.GoodsInfo();
		info.goodsId = this.info.goodsId;
		info.count = this.info.count;
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
}

}