namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-1-25
 * 
 * @class 奖励说明list的List子项
 */
export class ArenaLadderAwardItemB extends eui.ItemRenderer {
	private imgBoard: eui.Image;	//头像框
	private imgIcon: eui.Image;		//头像
	private lbNum: eui.Label;		//奖励数量
	private groupAll: eui.Group;
	private imgMask: eui.Image;
	private rectMaskCommon: eui.Rect;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaLadderAwardItemB"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.imgMask.scaleX = 0.7;
		this.imgMask.scaleY = 0.7;
		this.groupAll.addChild(this.imgMask);
		this.imgMask.anchorOffsetX = this.imgMask.width / 2;
		this.imgMask.anchorOffsetY = this.imgMask.height / 2;
		this.imgMask.x = this.groupAll.width / 2;
		this.imgMask.y = this.groupAll.height / 2;
		this.imgMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.rectMaskCommon.scaleX = 0.7;
		this.rectMaskCommon.scaleY = 0.7;
		this.rectMaskCommon.anchorOffsetX = this.rectMaskCommon.width / 2;
		this.rectMaskCommon.anchorOffsetY = this.rectMaskCommon.height / 2;
		this.rectMaskCommon.x = this.groupAll.width / 2;
		this.rectMaskCommon.y = this.groupAll.height / 2;
		this.groupAll.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
	}

	protected dataChanged() {

		let data = this.data as ArenaLadderAwardItemBData;
		let goodsId = data.goodsId;
		let count = data.count;
		let itemSet = PlayerItemSystem.Set(goodsId, null, count) as any;
		this.imgBoard.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);
		this.lbNum.text = "x" + Set.NumberUnit3(count);
		if (this.isRectMask(goodsId)) {
			this.imgMask.visible = true;
			this.imgIcon.mask = this.imgMask;
		} else {
			this.imgMask.visible = false;
			this.imgIcon.mask = this.rectMaskCommon;
		}
		if (data.goodsId == 33011) {
			this.imgIcon.scaleX = 0.9;
			this.imgIcon.scaleY = 0.9;
		}
	}

	private touchBegin(e: egret.TouchEvent) {
		let data = this.data as ArenaLadderAwardItemBData;
		let info = new message.GoodsInfo();
		info.goodsId = data.goodsId;
		info.count = data.count;
		data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
	}

	//根据奖励类型判断是否添加遮罩
	private isRectMask(goodsId: number): boolean {

		let m = PlayerItemSystem.ItemType(goodsId);
		if (PlayerItemSystem.ItemType(goodsId) == 6 || PlayerItemSystem.ItemType(goodsId) == 3 && goodsId != 39101 && goodsId != 39102 && goodsId != 39103 && goodsId != 34002 && goodsId != 34003) {
			return true;
		}

		return false;
	}
}

export class ArenaLadderAwardItemBData {
	goodsId: number;
	count: number;
	index: number;
	father: ArenaLadderAwardItem;
}
}