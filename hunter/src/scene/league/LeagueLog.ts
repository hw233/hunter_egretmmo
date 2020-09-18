namespace zj {
//公会日志
//yuqingchao
//2018.11.29
export class LeagueLog extends Dialog {
	private btnClose: eui.Button;
	private imgTop: eui.Image;
	private lstItem: eui.List;

	private father: LeagueMain;
	private recordDay: number = 0;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueLogSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}

	public init(type: number, msg: Array<message.LeagueRecord>, father?: LeagueMain) {
		this.recordDay = 0
		this.father = father;
		this.imgTop.source = cachekey(UIConfig.UIConfig_League.logTypeTitle[type - 1], this);
		this.loadList(type, msg);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
		//判断父类是不是LeagueMain
		if (this.father instanceof LeagueMain) {
			egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300).call(() => { this.father.groupMain.touchChildren = true; });
		}
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

	private loadList(type, records: Array<message.LeagueRecord>) {
		this.lstItem.itemRendererFunction = this.logItemRendererFunction;
		let arr: eui.ArrayCollection = new eui.ArrayCollection();
		let tblLog = Game.ConfigManager.getTable(StringConfig_Table.log + ".json");
		let count = 1;
		records.sort(function (a, b) {		//通过对事件发生时间的判断对日志文件进行排序，倒序
			if (a.generate_time == b.generate_time) return a.type - b.type;
			return b.generate_time - a.generate_time;
		});
		for (let i = 0; i < records.length; i++) {

			if (tblLog[records[i].type] != null && type == tblLog[records[i].type]["type"]) {
				let recordDay = records[i].generate_time;
				let timeTblnew = this.time(recordDay);
				let timeTblold = this.time(this.recordDay);

				if (count == 1 || timeTblnew.Y != timeTblold.Y || timeTblnew.M != timeTblold.M || timeTblnew.D != timeTblold.D) {
					arr.addItem({
						itemNum: 1,		//itemNum = 1，加载显示日期的item；
						records: records[i],
						timeTblnew
					})
					this.lstItem.dataProvider = arr;
					this.recordDay = recordDay;
				}
				arr.addItem({
					i,
					itemNum: 2,		//itemNum = 2，加载显示日志内容的item；
					records: records[i],
					timeTblnew
				});
				this.lstItem.dataProvider = arr;
				count = count + 1;
			}
		}
	}

	// 根据type返回scroller加载的item
	private logItemRendererFunction(item) {
		if (item.itemNum == 1) {
			return LeagueLogTitleItem;
		} else if (item.itemNum == 2) {
			return LeagueLogContentItem;
		}
		return null;
	}
}

}