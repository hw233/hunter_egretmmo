namespace zj {
//周末登陆活动
//yuqingchao
//2019.03.23
export class ActivityStarSever extends UI {
	private info;
	private father: null;
	private lbTimeOpen: eui.Label;			//活动开始时间
	private lbTimeClose: eui.Label;			//活动结束时间
	private lbInfo: eui.Label;				//活动内容
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private saveStart: boolean;
	private scrollerInfo: eui.Scroller;
	private moveLocation: number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityStarSeverSkin.exml";
		cachekeys(<string[]>UIResource["ActivityStarSever"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLstView, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;		
		}, null);
	}
	public setInfo(info, father) {
		this.info = info;
		this.father = father;
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
		let bStart = this.info.openTime < Date.parse(Game.Controller.serverNow().toString());
		this.saveStart = bStart;
		this.lbTimeOpen.text = timeOpen;
		this.lbTimeClose.text = timeColse;
		this.lbInfo.text = this.info.des;
	}
	private setInfoAward() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.info.rewardZone.length; i++) {
			this.arrayCollection.addItem({
				i,
				activities: this.info,
				info: this.info.rewards[i].goodsInfo,
				father: this,
				main: this.father,
			})
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityStarSeverItem;

		this.scrollerInfo.viewport = this.lstView;
		this.scrollerInfo.validateNow();
		this.scrollerInfo.viewport.scrollV = this.moveLocation;
	}
	public onLstView() {
		this.scrollerInfo.viewport = this.lstView;
		this.scrollerInfo.validateNow();
		this.moveLocation = this.scrollerInfo.viewport.scrollV;
		this.info = (this.father as ActivityMain).dataList[(this.father as ActivityMain).lstViewType.selectedIndex];
		this.setInfoAward();
		this.getInfoToday();
		(this.father as ActivityMain).setInit(true);
	}
	public getInfoStart() {
		return this.saveStart;
	}
	public getInfoToday() {
		let info = Game.PlayerActivitySystem.Activities;
		let reward = this.info.todayReward;
		let today = this.info.daysIndex;
		today = yuan3(reward, today, today + 1);
		return [today, reward];
	}
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}
}
}