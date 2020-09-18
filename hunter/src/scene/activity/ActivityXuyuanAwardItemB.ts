namespace zj {
//ActivityXuyuanAwardItemB
//yuqingchao
//2019.05.07
export class ActivityXuyuanAwardItemB extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private groupClip: eui.Group;
	private imgMask: eui.Image;		//碎片遮罩
	private groupAnimal: eui.Group;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanAwardItemBSkin.exml";
		cachekeys(<string[]>UIResource["ActivityXuyuanAwardItemB"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupAnimal.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(73, 70);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 0;
		this.groupAnimal.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupAnimal.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
	}
	protected dataChanged() {
		this.groupClip.removeChildren();
		let info = this.data.info;
		let index = this.data.i;
		let itemSet = PlayerItemSystem.Set(info.goodsId, info.showType, info.count);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(info.goodsId), this);

		if (this.isImgMask(info.goodsId)) {
			this.imgMask.visible = true;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = false;
			this.imgIcon.mask = this.imgMask;
		} else if (this.isRectMask(info.goodsId)) {
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
		if (info.showType == 1) {
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupClip);
		}
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
	private onShowGoodProperty(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
	//添加龙骨动画
	public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2
				//display.y =this.height*0.25;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
			})
			.catch(reason => {
			});
	}
}
}