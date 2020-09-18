namespace zj {
//活动主界面左列表Item
//yuqingchao
//2019.03.23
export class ActivityMainItem extends eui.ItemRenderer {
	private lbName: eui.Label;
	private lbTime: eui.Label;
	private imgIcon: eui.Image;
	private imgTag: eui.Image;
	private imgTrue: eui.Image;
	private imgLogo: eui.Image;				//活动程度
	private imgTip: eui.Image;				//红点
	private str: string = "";
	private color: number;
	private info;
	private index: number = 0;
	private double: boolean = null;
	private setTip;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityMainItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityMainItem"], null);
		this.imgIcon.visible = false;
		this.imgTag.visible = true;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
		}, null);
	}
	protected dataChanged() {
		this.imgTrue.visible = false;
		this.index = this.data.k;
		this.info = this.data.info;
		if (this.info == "double token") {
			this.dealDoubleTokenInfo();
			if (this.double) {
				this.lbTime.textFlow = Util.RichText(this.str);
			} else {
				this.lbTime.text = this.str;
				this.lbTime.textColor = this.color;
			}
			this.imgTrue.visible = this.selected;
		} else if (this.info == "gift bag") {

		}
		else {
			if (this.info.type == message.ActivityType.ACT_TYPE_COLLECT && this.info.bClient) {
				this.lbName.text = TextsConfig.TextsConfig_Activity.collectClientTitle;
			} else {
				this.lbName.text = this.info.name;
			}
			this.getLoginTime(this.info.openTime, this.info.closeTime);
			this.lbTime.textColor = this.color;
			this.lbTime.text = this.str;
			this.imgTrue.visible = this.selected;
		}
		this.setInfoType();
		this.setinfoTip();
	}
	//钻石双倍
	private dealDoubleTokenInfo() {
		this.imgIcon.visible = false;
		this.lbName.text = TextsConfig.TextsConfig_Activity.doubleTokenName;
		let curTime = this.time(Date.parse(Game.Controller.serverNow().toString()) / 1000);
		let wDay = PlayerLeagueSystem.GetDay();
		let start_time = null;
		let end_time = null;
		if (wDay == 1 && (curTime.h * 3600 + curTime.m * 60 + curTime.s) < 4 * 3600) {
			let nextWeekStartTime = Date.parse(Game.Controller.serverNow().toString()) / 1000 - (curTime.h * 3600 + curTime.m * 60 + curTime.s) + 4 * 3600;
			start_time = nextWeekStartTime - 7 * 86400;
			end_time = start_time - 1;
		} else {
			start_time = Date.parse(Game.Controller.serverNow().toString()) / 1000 - (curTime.h * 3600 + curTime.m * 60 + curTime.s + (wDay - 1) * 86400) + 4 * 3600
			end_time = start_time + 7 * 86400 - 1;
		}
		this.getLoginTime(start_time, end_time);
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
	private getLoginTime(open, close) {
		let time = Date.parse(Game.Controller.serverNow().toString());
		let start = open - Date.parse(Game.Controller.serverNow().toString()) / 1000;
		let stop = close - Date.parse(Game.Controller.serverNow().toString()) / 1000;
		if (start > 0) {
			this.color = ConstantConfig_Common.Color.red;
		} else {
			this.color = ConstantConfig_Common.Color.green;
		}
		if (3600 * 24 < start) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.openDay, Math.floor(start / 3600 / 24));
			this.double = false;
		} else if (3600 < start && start <= 3600 * 24) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.openHour, Math.floor(start / 3600));
			this.double = false;
		} else if (60 < start && start <= 3600) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.openMin, Math.floor(start / 60));
			this.double = false;
		} else if (0 < start && start <= 60) {
			this.str = TextsConfig.TextsConfig_Time.openNow;
			this.double = false;
		} else if (3600 * 24 < stop) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.closeDay, Math.floor(stop / 3600 / 24));
			this.double = false;
		} else if (3600 < stop && stop <= 3600 * 24) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.closeHour, Math.floor(stop / 3600));
			this.double = false;
		} else if (0 < stop && stop <= 3600) {
			this.str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.closeMin, Math.floor(stop / 60));
			this.double = false;
		} else if (0 < stop && stop <= 60) {
			this.str = TextsConfig.TextsConfig_Time.closeNow;
			this.double = false;
		} else if (start < 0 && stop <= 0) {
			this.str = TextsConfig.TextsConfig_Time.closed;
			this.double = true;
		}
	}
	private setInfoType() {
		this.imgLogo.visible = false;
		if (this.info.noticeType == 1) {
			if (this.info.openTime > Date.parse(Game.Controller.serverNow().toString()) / 1000) {
				this.imgLogo.visible = true;
				this.imgLogo.source = cachekey(UIConfig.UIConfig_Activity.notice[0], this);
			} else if (this.info.closeTime < Date.parse(Game.Controller.serverNow().toString()) / 1000) {
				this.imgLogo.visible = true;
				this.imgLogo.source = cachekey(UIConfig.UIConfig_Activity.notice[2], this);
			} else {
				this.imgLogo.visible = false;
			}
		} else if (this.info.noticeType == 2 || this.info.noticeType == 3) {
			if (this.info.openTime > Date.parse(Game.Controller.serverNow().toString()) / 1000) { }
			else if (this.info.openTime < Date.parse(Game.Controller.serverNow().toString()) / 1000) {
				this.imgLogo.visible = true;
				this.imgLogo.source = cachekey(UIConfig.UIConfig_Activity.notice[2], this);
			} else {
				this.imgLogo.visible = true;
				this.imgLogo.source = cachekey(UIConfig.UIConfig_Activity.notice[this.info.noticeType], this);
			}
		}
	}
	//设置红点
	public setinfoTip() {
		let a: any = this.info;
		let activity_index = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
			return a.index == v.index && a.type == v.type;
		})[1];
		if (activity_index == null) {
			if (this.index == 0) {
				this.imgTip.visible = Tips.GetTipsOfId(Tips.TAG.AWARD, 1);				//可签到，领奖
			} else {
				if (this.info == "double token") {
					//双倍钻石
					let bTips = Tips.tips_useTime_get(Tips.SAVE.DOUBLE_TOKEN_ACTIVITY);
					this.imgTip.visible = bTips;
				} else if (this.info == "gift bag") {

				}
			}
		} else if (this.info.type == message.ActivityType.ACT_TYPE_COLLECT && this.info.bClient) {
			let tip_index = this.info.openTime;
			this.imgTip.visible = Tips.tips_oneday_get(tip_index);
		} else {
			let any = activity_index;
			let info = Game.PlayerActivitySystem.Activities[activity_index];
			//活动本身红点
			let bTips1 = Tips.GetTipsOfActivity(info.type, info.index);
			//活动是否开启和点击
			let bTips2 = Tips.tips_activity_get(info.type, info.index);
			//活动期间
			let timeNow = Date.parse(Game.Controller.serverNow().toString()) / 1000;
			let bDuring = info.openTime < timeNow && info.closeTime > timeNow;
			let bTips: boolean = (bTips1 ? bTips1 : bTips2) && bDuring;
			this.imgTip.visible = bTips;
		}
	}
}
}