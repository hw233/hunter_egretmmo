namespace zj {
//充值送好礼
//yuqingchao
//2019.03.23
export class ActivityChargeActivity extends UI {
	private info;
	private father: null;
	private lbTime: eui.Label;					//活动时间
	private lbMoney: eui.Label;					//充值金额
	private groupBag1: eui.Group;
	private groupBag2: eui.Group;
	private groupBag3: eui.Group;
	private groupBag4: eui.Group;
	private groupBag5: eui.Group;
	private imgGet1: eui.Image;					//可领取图片
	private imgGet2: eui.Image;					//可领取图片
	private imgGet3: eui.Image;					//可领取图片
	private imgGet4: eui.Image;					//可领取图片
	private imgGet5: eui.Image;					//可领取图片
	private imgBag1: eui.Image;					//已领取图片
	private imgBag2: eui.Image;					//已领取图片
	private imgBag3: eui.Image;					//已领取图片
	private imgBag4: eui.Image;					//已领取图片
	private imgBag5: eui.Image;					//已领取图片
	private imgMask1: eui.Image;				//遮罩
	private imgMask2: eui.Image;				//遮罩
	private imgMask3: eui.Image;				//遮罩
	private imgMask4: eui.Image;				//遮罩
	private imgMask5: eui.Image;				//遮罩
	private btnGoCharge: eui.Button;			//充值按钮
	private saveStart: boolean;
	private canGet: boolean;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityChargeActivitySkin.exml";
		cachekeys(<string[]>UIResource["ActivityChargeActivity"], null);
		this.btnGoCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoCharge, this);
		this.groupBag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBroupBag1, this);
		this.groupBag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBroupBag2, this);
		this.groupBag3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBroupBag3, this);
		this.groupBag4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBroupBag4, this);
		this.groupBag5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBroupBag5, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;
		}, null);
	}
	public setInfo(info, father) {
		this.info = info;
		this.father = father;
		for (let i = 0; i < this.info.rewards.length; i++) {
			(<eui.Image>this[`imgMask${i + 1}`]).visible = false;
		}
		this.setInfoText();
		this.setInfoAward();
	}
	private time(timestamp: number) {
		let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return { Y: Y, M: M, D: D, h: h, m: m, s: s };		//年月日时分秒
	}
	private setInfoText() {
		let strOpen = this.time(this.info.openTime);
		let timeOpen;
		if (strOpen.m < 10) {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
		} else {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
		}
		let strColse = this.time(this.info.closeTime);
		let timeColse;
		if (strColse.m < 10) {
			timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
		} else {
			timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
		}
		let curMoney = this.info.itemCount + "";
		let chargeDaily = this.info.chargeDaily;
		this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		this.lbMoney.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.chargeToday, curMoney, chargeDaily);
		this.canGet = this.info.itemCount >= this.info.chargeDaily;
		this.saveStart = this.info.openTime < Date.parse(Game.Controller.serverNow().toString());
	}
	private setInfoAward() {
		for (let i = 0; i < this.info.rewards.length; i++) {
			let [today, isGFet] = this.getInfoToday();
			let bStart = this.getInfoStart();
			let bNotGet = i + 1 == today && !isGFet && bStart && this.canGet;
			let bIsGet = i + 1 < today || (i + 1 == today && isGFet);
			let bCanGet = i + 1 == today && !isGFet && bStart;
			(<eui.Image>this[`imgGet${i + 1}`]).visible = bNotGet;
			(<eui.Image>this[`imgBag${i + 1}`]).visible = bIsGet;
			if (!(<eui.Image>this[`imgBag${i + 1}`]) && bIsGet) {
				(<eui.Image>this[`imgBag${i + 1}`]).visible = bIsGet;
			}
			(<eui.Image>this[`imgBag${i + 1}`]).visible = bIsGet;
			(<eui.Image>this[`imgMask${i + 1}`]).visible = bIsGet;
		}
	}
	private getInfoToday() {
		let reward = this.info.todayReward;
		let today = this.info.daysIndex;
		today = yuan3(reward, today, today + 1)
		return [today, reward];
	}
	private getInfoStart() {
		return this.saveStart;
	}
	private onGroupGet(i) {
		let [today, isGFet] = this.getInfoToday();
		let bStart = this.getInfoStart();
		let bNotGet = i == today - 1 && !isGFet && bStart && this.canGet;
		let bIsGet = i < today - 1 || (i == today - 1 && isGFet);
		let type = this.info.type;
		let index = this.info.index;
		let rewardIndex = index;
		// this.curIndex = index;
		if (bNotGet) {
			Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, true).then((resp: message.GameInfo) => {
				(this.father as ActivityMain).setInit(true);
				this.info = (this.father as ActivityMain).dataList[(this.father as ActivityMain).lstViewType.selectedIndex];
				this.setInfoAward();
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(resp.getGoods);
						dialog.show();
						dialog.setCB(() => {
							(this.father as ActivityMain).setInit(true);
							Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
						})
					})
			})
		}
		else {
			loadUI(Daily_AwardPop)
				.then((dialog: Daily_AwardPop) => {
					Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
					dialog.SetInfoGift(this.info.rewards[i].goodsInfo, null, null);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}
	}
	private onBroupBag1() {
		this.onGroupGet(0);
	}
	private onBroupBag2() {
		this.onGroupGet(1);
	}
	private onBroupBag3() {
		this.onGroupGet(2);
	}
	private onBroupBag4() {
		this.onGroupGet(3);
	}
	private onBroupBag5() {
		this.onGroupGet(4);
	}
	//跳转支付
	private onBtnGoCharge() {
		loadUI(PayMallScene)
			.then((dialog: PayMallScene) => {
				dialog.show(UI.SHOW_FILL_OUT);
				dialog.init();
				dialog.setCB(() => {
					(this.father as ActivityMain).setInit(true);
					this.info = (this.father as ActivityMain).dataList[(this.father as ActivityMain).lstViewType.selectedIndex];
					this.setInfoAward();
					this.setInfoText();
				})
			});
	}
}
}