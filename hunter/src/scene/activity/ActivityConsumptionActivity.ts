namespace zj {
//累计消耗
//yuqingchao
//2019.04.04
export class ActivityConsumptionActivity extends UI {
	private info;
	private father: null;
	private lbTime: eui.Label;				//活动时间
	private lbInfo: eui.Label;				//活动内容
	private lbMoney: eui.Label;				//活动条件
	private lstView: eui.List;
	private imgType: eui.Image;				//累计单位
	private imgTitle: eui.Image;			//标题
	public saveInfo;
	private saveStart: boolean = false;
	private arrayCollection: eui.ArrayCollection;
	private scrollerInfo: eui.Scroller;
	private moveLocation: number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityConsumptionActivitySkin.exml";
		cachekeys(<string[]>UIResource["ActivityConsumptionActivity"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLstView, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
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
		this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		this.lbInfo.text = this.info.des;
		let bRes = this.info.consumeType == message.ConsumeType.CONSUME_TYPE_TOKEN
			|| this.info.consumeType == message.ConsumeType.CONSUME_TYPE_POWER
			|| this.info.consumeType == message.ConsumeType.CONSUME_TYPE_MONEY
		let strCount = bRes && this.info.itemCount;
		let tblConsume = Game.ConfigManager.getTable("client_table_consume.json");
		let tbl = tblConsume[this.info.consumeType];
		let pathTitle = tbl.path;
		let pathCount = tbl.path_count;
		if (tbl.resource == -1) {
			this.imgType.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
		}
		this.saveStart = this.info.openTime < Date.parse(Game.Controller.serverNow().toString());
		this.saveInfo = tbl;
		this.imgTitle.source = cachekey(pathTitle, this);
		this.lbMoney.text = HelpUtil.textConfigFormat(tbl.count, strCount);
	}
	private setInfoAward() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 1; i <= this.info.rewardZone.length; i++) {
			this.arrayCollection.addItem({
				i,
				info: this.info,
				father: this,
				main: this.father,
			});
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityConsumptionActivityItem;

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