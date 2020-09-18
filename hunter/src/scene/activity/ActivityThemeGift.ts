namespace zj {
//周末大挑战，周一开工，猎人任务，猎人养成计划，升星挑战，开服献礼
//yuqingchao
//2019.03.23
export class ActivityThemeGift extends UI {
	private lbTimeOpen: eui.Label;			//开始时间
	private lbTimeClose: eui.Label;			//结束时间
	private LstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	public info;
	private father: null;
	public saveStart: boolean;
	private scrollerInfo: eui.Scroller;
	public moveLocation: number = 0;		//列表下拉移动位置
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityThemeGiftSkin.exml";
		cachekeys(<string[]>UIResource["ActivityThemeGift"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;
		}, null);
	}
	//时间戳转换为字符串格式
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
	public setInfo(info, father) {
		this.info = info;
		this.father = father;
		this.setInfoText();
		this.itemSort();
		this.setInfoAward();
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
	}
	private itemSort() {
		for (let k in this.info.missions) {
			let v = this.info.missions[k];
			let alnum = 0;
			for (let kk in this.info.kvInfos) {
				let vv = this.info.kvInfos[kk];
				if (vv.key == v.mission_type)
					alnum = vv.value;
			}
			let bIsGet = Table.VIn(this.info.rewardIndex, v.mission_type);
			if (bIsGet) {
				v.sort = -1;
			} else {
				if (alnum / v.mission_condition >= 1) {
					v.sort = 1
				} else {
					v.sort = alnum / v.mission_condition
				}
			}

		}
		let sortByValue = (a, b) => {
			if (a.sort == b.sort) {
				return a.mission_type - b.mission_type
			} else {
				return b.sort - a.sort
			}
		}
		this.info.missions.sort(sortByValue);
	}
	public setInfoAward() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.info.missions.length; i++) {
			this.arrayCollection.addItem({
				i,
				activities: this.info,
				info: this.info.missions[i],
				father: this,
				main: this.father
			})
		}
		this.LstView.dataProvider = this.arrayCollection;
		this.LstView.itemRenderer = ActivityThemeGiftItem;

		this.scrollerInfo.viewport = this.LstView;
		this.scrollerInfo.validateNow();
		this.scrollerInfo.viewport.scrollV = this.moveLocation;
	}
	public onLstView() {
		this.scrollerInfo.viewport = this.LstView;
		this.scrollerInfo.validateNow();
		this.moveLocation = this.scrollerInfo.viewport.scrollV;
		this.info = (this.father as ActivityMain).dataList[(this.father as ActivityMain).lstViewType.selectedIndex];
		this.itemSort();
		this.setInfoAward();
		(this.father as ActivityMain).setInit(true);
	}
	public getInfoStart() {
		return this.saveStart;
	}
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}
}
}