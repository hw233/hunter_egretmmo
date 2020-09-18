namespace zj {
//开服冲级赢大奖Item
//yuqingchao
//2019.03.23
export class ActivityUplevelActivityItem extends eui.ItemRenderer {
	private imgLevel: eui.Image;			//奖品等级
	private imgBoard: eui.Image;				//头像框
	private imgIcon: eui.Image;				//头像
	private lbNum: eui.Label;				//奖励数量
	private activities;
	private index: number;
	private info;
	private i: number = 0;
	private curNum;
	private groupDown: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityUplevelActivityItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityUplevelActivityItem"], null);
		this.groupDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupGet, this);
	}
	protected dataChanged() {
		this.info = this.data.info;
		this.i = this.data.i;
		this.activities = this.data.activities;
		this.index = this.info.index;
		this.curNum = this.activities.uplevelReward;
		this.setItemInfo();
	}
	private setItemInfo() {
		for (let k in this.activities.uplevelItems) {
			let v = this.activities.uplevelItems[k];
			if (v.index < this.index) {
				this.curNum = this.curNum - v.rewardCount;
				if (this.curNum <= 0) this.curNum = 0;
			}
		}
		if (this.curNum > this.info.rewardCount) {
			this.curNum = this.info.rewardCount;
		}
		this.lbNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, this.curNum, this.info.rewardCount);
		if (this.curNum < this.info.rewardCount) {
			this.lbNum.textColor = ConstantConfig_Common.Color.white;
		}
		else {
			this.lbNum.textColor = ConstantConfig_Common.Color.red;
		}
		this.imgLevel.source = cachekey(UIConfig.UIConfig_Activity.upLevel[this.data.i], this);
		this.imgIcon.source = cachekey(UIConfig.UIConfig_Activity.giftIcon[this.info.picId], this);
		if (this.data.i == 0) {
			this.imgBoard.source = cachekey(UIConfig.UIConfig_Common.itemFrame[3], this);
		}
		else if (this.data.i == 1) {
			this.imgBoard.source = cachekey(UIConfig.UIConfig_Common.itemFrame[2], this);
		}
		else {
			this.imgBoard.source = cachekey(UIConfig.UIConfig_Common.itemFrame[1], this);
		}
	}
	private onGroupGet() {
		loadUI(Daily_AwardPop)
			.then((dialog: Daily_AwardPop) => {
				dialog.SetInfoGift(this.info.goodsInfo, null, null)
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}
}
}