namespace zj {
	//累计充值送大礼(特效卡，累计充值)
	//yuqingchao
	//2019.03.23
	export class ActivityTopUpActivity extends UI {
		public info: any;
		private lbTime: eui.Label;			//时间
		private lbMoney: eui.Label;			//充值金额
		private lbInfo: eui.Label;			//活动内容
		private btnGoCharge: eui.Button;		//充值按钮
		private lstView: eui.List;
		private arrayCollection: eui.ArrayCollection;
		private saveStart;
		public index: number = 0;
		private father: null;
		private scrollerInfo: eui.Scroller;
		private moveLocation: number = 0;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityTopUpActivitySkin.exml";
			cachekeys(<string[]>UIResource["ActivityTopUpActivity"], null);
			this.btnGoCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoCharge, this);
			this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLstView, this);
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
			this.setInfoAward();
		}
		public upData() {
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
			let curMoney = this.info.itemCount;
			let chargeDaily = this.info.chargeDaily;
			let bRes = this.info.consumeType == message.ConsumeType.CONSUME_TYPE_TOKEN
				|| this.info.consumeType == message.ConsumeType.CONSUME_TYPE_POWER
				|| this.info.consumeType == message.ConsumeType.CONSUME_TYPE_MONEY
			let str_count = bRes
				&& this.info.itemCount
				|| this.info.itemCount
			this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
			this.lbMoney.text = str_count;
			this.lbInfo.text = this.info.des;
			this.saveStart = this.info.openTime < Date.parse(Game.Controller.serverNow().toString());
			//对应充值项送武将
			// let picId = this.info.picId
		}
		public setInfoAward() {
			this.arrayCollection = new eui.ArrayCollection();
			if (this.info == "double token") return;
			for (let i = 0; i < this.info.rankRewards.length; i++) {
				this.arrayCollection.addItem({
					i,
					activities: this.info,
					info: this.info.rankRewards[i],
					father: this,
					main: this.father,
				})
			}
			this.lstView.dataProvider = this.arrayCollection;
			this.lstView.itemRenderer = ActivityTopUpActivityItem;

			this.scrollerInfo.viewport = this.lstView;
			this.scrollerInfo.validateNow();
			if (this.info.index == 1) {
				this.scrollerInfo.viewport.scrollV = this.moveLocation;
			} else {
				this.scrollerInfo.viewport.scrollV = 0;
			}

		}
		public onLstView() {
			this.scrollerInfo.viewport = this.lstView;
			this.scrollerInfo.validateNow();
			this.moveLocation = this.scrollerInfo.viewport.scrollV;
			this.info = (this.father as ActivityMain).dataList[(this.father as ActivityMain).lstViewType.selectedIndex];
			this.setInfoAward();
			(this.father as ActivityMain).setInit(true);
		}
		//跳转充值
		private onBtnGoCharge() {
			loadUI(PayMallScene)
				.then((dialog: PayMallScene) => {
					dialog.show(UI.SHOW_FILL_OUT);
					dialog.init();
					dialog.setCB(() => {
						this.onLstView();
						this.setInfoText();
					});
				});
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