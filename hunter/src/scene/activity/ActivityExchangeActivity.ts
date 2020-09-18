namespace zj {
	//道具兑换
	//yuqingchao
	// 2019.04.24
	export class ActivityExchangeActivity extends UI {
		private info;
		private lbTime: eui.Label;					//活动时间
		private lbInfo: eui.Label;					//活动内容
		private lstView: eui.List;
		private item: eui.ArrayCollection;
		private itemB: eui.ArrayCollection;
		private imgHunter: eui.Image;
		private imgTip: eui.Image;
		private rewardZoneList = [];
		private saveStart: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityExchangeActivitySkin.exml";
			cachekeys(<string[]>UIResource["ActivityExchangeActivity"], null);
		}
		public setInfo(info, father) {
			this.info = info;
			// this.rewardZoneList = null;

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
			this.lbInfo.text = singLecraft.decodeGroupName(this.info.des, "&", false);
			let bStart = this.info.openTime < Date.parse(Game.Controller.serverNow().toString());
			this.saveStart = bStart;
			let picId = this.info.picId;
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.pic + ".json"); 			//读表
			let pathinfo = tbl[picId];
			if (pathinfo != null) {
				if (pathinfo.path != null) {
					this.imgTip.source = cachekey(pathinfo.path, this);
				}
				if (pathinfo.path2 != null) {
					this.imgHunter.source = cachekey(pathinfo.path2, this);
				}
			}
		}
		private setInfoAward() {
			if (this.rewardZoneList.length == 0) {
				this.item = new eui.ArrayCollection();
				this.itemB = new eui.ArrayCollection();
				let itemNum: number = 0;
				for (let i = 0; i < this.info.exchanges.length; i++) {
					if (this.info.exchanges[i].exchangeInfo[1] == null) {
						itemNum = 0;
						this.itemB.addItem({
							i,
							info: this.info,
							father: this,
						})
					} else {
						itemNum = 1;
						this.item.addItem({
							i,
							info: this.info,
							father: this,
						})
					}
				}
				if (itemNum == 0) {
					this.lstView.dataProvider = this.itemB;
					this.lstView.itemRenderer = ActivityExchangeActivityItemB;
				} else if (itemNum == 1) {
					this.lstView.dataProvider = this.item;
					this.lstView.itemRenderer = ActivityExchangeActivityItem;
				}
			}
		}
		public getInfoStart() {
			return this.saveStart;
		}
	}
}