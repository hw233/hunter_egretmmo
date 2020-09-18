namespace zj {
//钻石商城双倍狂欢
//yuqingchao
//2019.03.23
export class ActivityDoublGemstone extends UI {
	private lbTime: eui.Label;
	private lbInfo: eui.Label;
	private info;
	private btnBuyGemstone: eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityDoublGemstoneSkin.exml";
		this.btnBuyGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyGemstone, this);
		cachekeys(<string[]>UIResource["ActivityDoublGemstone"], null);
	}
	public setInfo(info, father) {
		this.info = info;
		this.setInfoTime();
		this.lbInfo.text = TextsConfig.TextsConfig_Activity.doubleDemDes;
	}
	//时间戳转换为字符串格式
	private time(timestamp: number) {
		let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return { Y: Y, M: M, D: D, h: h, m: m, s: s };		//年月日时分秒
	}
	private setInfoTime() {
		let str = "";
		let wDay = PlayerLeagueSystem.GetDay();
		let tim = Date.parse(Game.Controller.serverNow().toString());
		let curTime = this.time(Date.parse(Game.Controller.serverNow().toString()));
		if (wDay == 1 && (curTime.h * 3600 + curTime.m * 60 + curTime.s) < 4 * 3600) {
			let nextWeekStartTime = Date.parse(Game.Controller.serverNow().toString()) - (curTime.h * 3600 + curTime.m * 60 + curTime.s) + 4 * 3600;
			let start_time = (nextWeekStartTime / 1000 - 7 * 86400) * 1000;
			let end_time = nextWeekStartTime - 1;
			let beginTimeC = this.time(start_time);
			let timeOpen = beginTimeC.Y + "." + beginTimeC.M + "." + beginTimeC.D + "  " + "4:00";
			let endTimec = this.time(end_time);
			let timeColse = endTimec.Y + "." + endTimec.M + "-" + endTimec.D + "  " + "3:59";
			this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		} else {
			let start_time = Date.parse(Game.Controller.serverNow().toString()) - (curTime.h * 3600 + curTime.m * 60 + curTime.s + (wDay - 1) * 86400) + 4 * 3600
			let end_time = start_time + 7 * 86400 - 1;
			let beginTimeC = this.time(start_time);
			let timeOpen = beginTimeC.Y + "." + beginTimeC.M + "." + beginTimeC.D + "  " + "4:00";
			let endTimec = this.time(end_time);
			let timeColse = endTimec.Y + "." + endTimec.M + "-" + endTimec.D + "  " + "3:59";
			this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		}
	}
	private onBtnBuyGemstone() {
		setTimeout(function () {
			loadUI(PayMallScene)
				.then((dialog: PayMallScene) => {
					dialog.show(UI.SHOW_FILL_OUT);
					dialog.init();
				});
		}, 500);
	}
}
}