namespace zj {
//开服冲级赢大奖
//yuqingchao
//2019.03.23
export class ActivityUplevelActivity extends UI {
	private info;
	private saveStart: boolean;
	private lbTime: eui.Label;				//活动时间
	private lbInfo: eui.Label;				//活动内容
	private lbLevel: eui.Label;
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private btnInfo: eui.Button;				//获奖名单按钮
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityUplevelActivitySkin.exml";
		cachekeys(<string[]>UIResource["ActivityUplevelActivity"], null);
		this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInfo, this);
	}
	public setInfo(info, father) {
		this.info = info;
		this.setInfoText();
		this.setInfoAward();
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
		let curLevel = "LV" + Game.PlayerInfoSystem.Level;
		this.saveStart = bStart;
		this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		this.lbInfo.text = this.info.des;
		this.lbLevel.text = curLevel;
	}
	private setInfoAward() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.info.uplevelItems.length; i++) {
			this.arrayCollection.addItem({
				i,
				activities: this.info,
				info: this.info.uplevelItems[i],
			})
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityUplevelActivityItem;
	}
	private onBtnInfo() {
		loadUI(ACtivityUplevelActivityPop)
			.then((scene: ACtivityUplevelActivityPop) => {
				scene.init(this.info.index, this.info.uplevelItems, this.info.uplevel);
				scene.show(UI.SHOW_FROM_TOP);
			});
	}
}
}