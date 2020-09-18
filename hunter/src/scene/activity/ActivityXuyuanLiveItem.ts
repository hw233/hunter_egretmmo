namespace zj {
// ActivityXuyuanLiveItem
// yuqingchao
// 2019.05.10
export class ActivityXuyuanLiveItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private btnDown: eui.Button;
	private groupDown: eui.Group;
	private groupFrame: eui.Group;
	private imgFrame: eui.Image;				//头像框
	private imgClip: eui.Image;					//头像
	private imgGet: eui.Image;					//已领取图片
	private lbNum: eui.Label;					//数量
	private lbChangeNum: eui.Label;				//剩余次数
	private lbChangeCore: eui.Label;			//星星数量
	public index: number = null;
	public goods;
	public father: ActivityXuyuanLive;
	public score: number = null;
	public exchangeTimes: number = null;
	private btnChange: eui.Button;
	private imgMask: eui.Image;		//碎片遮罩
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanLiveItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityXuyuanLiveItem"], null);
		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange, this);

		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupDown.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(73, 70);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 0;
		this.groupDown.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupDown.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}
	protected dataChanged() {
		closeCache(this.groupAll);
		this.index = this.data.i;
		this.goods = this.data.info;
		this.father = this.data.father;
		this.score = this.father.curTopicInfo.exchange_xuyuan[this.index];
		this.exchangeTimes = this.father.curTopicInfo.exchange_count[this.index];
		if (this.goods.goodsId == 0) {
			this.groupAll.touchEnabled = false;
		}

		if (this.isImgMask(this.goods.goodsId)) {
			this.imgMask.visible = true;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = false;
			this.imgClip.mask = this.imgMask;
		} else if (this.isRectMask(this.goods.goodsId)) {
			this.imgMask.visible = false;
			this.rectMaskCommon.visible = false;
			this.rectMask.visible = true;
			this.imgClip.mask = this.rectMask;
		} else {
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.rectMaskCommon.visible = true;
			this.imgClip.mask = this.rectMaskCommon;
		}

		this.setInfoGoods();
		this.setInfoOther();
		setCache(this.groupAll);
	}
	private setInfoGoods() {
		if (this.goods.goodsId != 0) {
			let itemSet = PlayerItemSystem.Set(this.goods.goodsId, this.goods.showType, this.goods.count);
			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgClip.source = cachekey(itemSet.Clip, this);
			this.lbNum.text = "x" + this.goods.count;
			this.resume();
			this.lbChangeCore.text = this.score.toString();
			this.groupFrame.visible = true;
		} else  {
			this.groupFrame.visible = false;
		}
	}
	public setInfoOther() {
		if (this.goods.goodsId == 0) return;
		let buyTimes = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, (k, v) => {
			return v.key == this.index;
		})[0];
		let colorGreen = [60, 255, 0];//0x3CFF00;
		let colorRed = [200, 38, 0]//0xC82600;
		if (buyTimes == null) {
			let str = HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorGreen[0], colorGreen[1], colorGreen[2], this.exchangeTimes, this.exchangeTimes);
			this.lbChangeNum.textFlow = Util.RichText(str);
			this.btnChange.enabled = true;
			this.imgGet.visible = false;
		} else {
			let canExchange = buyTimes.value < this.exchangeTimes;
			if ((this.exchangeTimes - buyTimes.value) > 0) {
				let str = HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorGreen[0], colorGreen[1], colorGreen[2], this.exchangeTimes - buyTimes.value, this.exchangeTimes);
				this.lbChangeNum.textFlow = Util.RichText(str);
			} else {
				let str = HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorRed[0], colorRed[1], colorRed[2], this.exchangeTimes - buyTimes.value, this.exchangeTimes);
				this.lbChangeNum.textFlow = Util.RichText(str);
			}
			this.btnChange.enabled = canExchange;
			this.imgGet.visible = !canExchange;
		}
	}
	private resume() {
		// local function call()
		// if self._goods == nil then return end
		// TipMgr: ShowProp(self._goods.goodsId, self._goods.count, self.SpriteClip)
		// self: AddLongPressCB(call, 0.1, self.SpriteClip)
	}
	private onBtnChange() {
		if (this.btnChange.enabled == true) {
			if (this.goods.goodsId == 0) return;
			loadUI(ActivityXuyuanLiveExchange)
				.then((dialog: ActivityXuyuanLiveExchange) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this);
				});
		}
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

	// 徽章遮罩
	private isRectMask(goodsId: number): boolean {
		if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
			return true;
		}
		return false;
	}
}
}