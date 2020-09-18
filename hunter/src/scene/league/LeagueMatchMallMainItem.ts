namespace zj {
//战功商店Item
//yuqingchao
//2019.01.26
export class LeagueMatchMallMainItem extends eui.ItemRenderer {
	private btnItem: eui.Button;
	private imgFrame: eui.Image;		//头像框
	private imgIcon: eui.Image;		//头像
	private imgLogo: eui.Image;
	private lbNum: eui.Label;		//商品数量
	private lbName: eui.Label;		//商品名
	private lbCost: eui.Label;		//商品价格
	private lbBuyNum: eui.Label;		//商品限购
	private groupShadow: eui.Group;		//售罄
	private imgMask: eui.Image;		//碎片遮罩
	private groupAnimate: eui.Group;
	private imgDiscount: eui.Image;
	private lbDis: eui.Label;
	private num: number = 0;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;
	private animatoin: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMatchMallMainItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueMatchMallMainItem"], null);
		this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnItem, this);
		this.groupShadow.visible = false;
		this.imgDiscount.visible = false;
		this.lbDis.visible = false;

		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupAnimate.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(73, 70);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 0;
		this.groupAnimate.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupAnimate.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;


	}

	private onBtnItem() {

	}

	//龙骨动画
	public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		this.animatoin = true;
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2
				//display.y =this.height*0.25;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
	}

	protected dataChanged() {
		let mall = this.data.malldata;
		let itemSet: any = PlayerItemSystem.Set(mall.goods_id[0], mall.show_type[0], mall.goods_count[0]);
		if (mall.show_type[0] == 1 && this.animatoin == false) {
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
		}
		this.imgFrame.source = cachekey(cachekey(itemSet.Frame, this), this);
		this.imgLogo.source = cachekey(cachekey(itemSet.Logo, this), this);
		this.lbName.text = itemSet.Info.name;
		this.lbBuyNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Mall.mall_limit, mall.remain);
		this.lbNum.text = mall.goods_count[0];
		this.lbCost.text = mall.discount_price;
		this.imgIcon.source = cachekey(cachekey(PlayerItemSystem.ItemPath(mall.goods_id), this), this);

		if (this.isImgMask(mall.goods_id[0])) {
			this.imgMask.visible = true;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = false;
			this.imgIcon.mask = this.imgMask;
		} else if (this.isRectMask(mall.goods_id[0])) {
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

		if (Number(mall.remain) <= 0) {
			this.groupShadow.visible = true;
			this.btnItem.currentState = "down";
		}
		else {
			this.groupShadow.visible = false;
			this.btnItem.currentState = "";
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

}
}