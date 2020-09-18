namespace zj {
	/**
	 * @class 排行榜
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-26
	 */
	export class Activity_RanklistMain extends Dialog {
		private imgTitle: eui.Image;
		private imgLeft: eui.Image;
		private btnClose: eui.Button;
		private btnRule: eui.Button;
		private labelActivityDes: eui.Label;
		private labelActivityTime: eui.Label;
		private labelOwnNum: eui.Label;
		private labelOwnRank: eui.Label;
		private labelTimes: eui.Label;
		private scrollerRank: eui.Scroller;
		private listRank: eui.List;

		private listRankData: eui.ArrayCollection = new eui.ArrayCollection();
		private itemInfo: Array<message.RankBaseItemInfo> = [];
		private rankInfo: Array<message.ActivityRankItem> = [];
		private activityInfo: message.ActivityInfo;
		private itemOwn: message.RankBaseItemInfo = null;
		private rankArr: Array<message.RankBaseItemInfo> = [];

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_RanklistMainSkin.exml";
			this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRule, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);

			this.init();
		}

		private init() {
			// 活动开启
			this.activityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
				return v.type == message.ActivityType.ACT_TYPE_RANK;
			})[0];

			if (this.activityInfo == null || this.activityInfo.rankRewards == null) return;

			this.rankInfo = this.activityInfo.rankRewards;

			let req = new message.QueryActivityRankRequest();
			req.body.index = this.activityInfo.index;
			Game.Controller.send(req, this.QueryActivityRankReqData_Visit, null, this, false);
		}

		private QueryActivityRankReqData_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.QueryActivityRankResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			this.itemOwn = response.body.items[response.body.items.length - 1];
			this.itemInfo = Table.DeepCopy(response.body.items);
			this.itemInfo.splice(this.itemInfo.length - 1, 1);

			// let isOnList: boolean = this.itemInfo.length <= 0 ? false : this.itemInfo[0].value >= this.rankInfo[0].ext
			// if (!isOnList) {
			// 	let info = new message.RankBaseItemInfo();
			// 	info.rank = 0;
			// 	info.value = this.rankInfo[0].ext;
			// 	info.baseInfo = null;
			// 	this.itemInfo.splice(0, 0, info)

			// 	for (let i = 0; i < this.itemInfo.length; i++) {
			// 		this.itemInfo[i].rank = this.itemInfo[i].rank + 1;
			// 	}
			// }
			this.loadList();
			this.setInfo();
		}

		private setInfo() {
			this.labelActivityDes.text = this.activityInfo.des;

			let rank: number = 0;
			for (let i = 0; i < this.rankArr.length; i++) {
				if (this.rankArr[i].baseInfo != null && this.rankArr[i].baseInfo.id == this.itemOwn.baseInfo.id) {
					rank = this.rankArr[i].rank;
					break;
				}
			}

			this.labelOwnRank.text = rank == 0 ? "我的排名：未上榜" : "我的排名：" + rank;
			// this.labelOwnRank.text = (this.itemInfo[this.itemInfo.length - 1].rank == 0 || (this.itemInfo[this.itemInfo.length - 1].rank != 0 && this.itemInfo[this.itemInfo.length - 1].value == 0)) ?
			// 	"我的排名：未上榜" : "我的排名：" + this.itemInfo[this.itemInfo.length - 1].rank;

			let dateClose = new Date(this.activityInfo.closeTime * 1000);
			let dateStart = new Date(this.activityInfo.openTime * 1000);

			let strClose = Helper.StringFormat("%s/%s/%s",
				dateClose.getFullYear(),
				dateClose.getMonth() + 1 < 10 ? "0" + (dateClose.getMonth() + 1).toString() : dateClose.getMonth() + 1,
				dateClose.getDate() < 10 ? "0" + dateClose.getDate().toString() : dateClose.getDate(),
			);
			let strStart = Helper.StringFormat("%s/%s/%s",
				dateStart.getFullYear(),
				dateStart.getMonth() + 1 < 10 ? "0" + (dateStart.getMonth() + 1).toString() : dateStart.getMonth() + 1,
				dateStart.getDate() < 10 ? "0" + dateStart.getDate().toString() : dateStart.getDate(),
			);

			this.labelActivityTime.text = strStart + " - " + strClose;

			this.imgTitle.source = cachekey("ui_acitivity_rankinglist_title" + this.activityInfo.consumeType + "_png", this);
			this.imgLeft.source = cachekey("ui_acitivity_rankinglist_tupian" + this.activityInfo.consumeType + "_png", this);

			let value = this.itemOwn.value > 100000 ? (((this.itemOwn.value / 1000) >>> 0) % 10 == 0 ? ((this.itemOwn.value / 10000) >>> 0) + "万" : (this.itemOwn.value / 10000).toFixed(1) + "万") : this.itemOwn.value.toString();
			switch (this.activityInfo.consumeType) {
				case 1:
					this.labelTimes.text = "钻石消耗";
					this.labelOwnNum.text = "我的消耗数量：" + value;
					break;
				case 2:
					this.labelTimes.text = "体力消耗";
					this.labelOwnNum.text = "我的消耗数量：" + value;
					break;
				case 3:
					this.labelTimes.text = "金币消耗";
					this.labelOwnNum.text = "我的消耗数量：" + value;
					break;
				case 4:
					this.labelTimes.text = "流星街总次数";
					this.labelOwnNum.text = "我的次数：" + value;
					break;
				case 6:
					this.labelTimes.text = "本服格斗次数";
					this.labelOwnNum.text = "我的格斗次数：" + value;
					break;
				case 9:
					this.labelTimes.text = "采果子次数";
					this.labelOwnNum.text = "我的采集数量：" + value;
					break;
				case 10:
					this.labelTimes.text = "啤酒抽卡次数";
					this.labelOwnNum.text = "我的抽卡次数：" + value;
					break;
				case 12:
					this.labelTimes.text = "大草原杀人数量";
					this.labelOwnNum.text = "我的击杀数量：" + value;
					break;
				case 16:
					this.labelTimes.text = "娃娃机抽奖次数";
					this.labelOwnNum.text = "我的抽奖次数：" + value;
					break;
				case 17:
					this.labelTimes.text = "许愿次数";
					this.labelOwnNum.text = "我的许愿次数：" + value;
					break;
			}
		}

		private loadList() {
			let zone: { [key: number]: [number, number] } = {}
			for (const v of this.rankInfo) {
				zone[v.ext] = [v.rankZone[0], v.rankZone[1]];
			}

			let item: { [key: number]: Array<message.RankBaseItemInfo> } = {};
			for (const v of this.itemInfo) {
				for (const w of this.rankInfo) {
					if (v.value >= w.ext) {
						if (!item[w.ext]) item[w.ext] = [];
						item[w.ext].push(v);
						break;
					}
				}
			}

			let keys = Object.keys(item);
			for (const k of keys) {
				item[k].sort((a, b) => {
					return a.rank - b.rank;
				});
			}

			keys.reverse();
			let rank: number = 0;
			for (const k of keys) {
				if (rank < zone[k][0]) { // 此区间排名人不够
					rank = zone[k][0];
				}
				// let rank = zone[k][0];
				for (let v of item[k]) {
					v.rank = rank;
					++rank;
				}
			}

			let fun = (rank: number): number => {
				for (const key in zone) {
					if (zone.hasOwnProperty(key)) {
						let element = zone[key];
						if (element[0] <= rank && element[1] >= rank) {
							return Number(key);
						}
					}
				}
				return -1;
			}

			this.listRankData.removeAll();
			for (let i = 0; i < 50; ++i) {
				let rank = i + 1;
				let info = new message.RankBaseItemInfo();
				info.rank = rank;
				info.value = fun(rank);
				info.baseInfo = null;
				this.listRankData.addItem(info);
				this.rankArr.push(info);
			}

			for (const key in item) {
				if (item.hasOwnProperty(key)) {
					const element = item[key];
					for (const v of element) {
						if (v.rank > this.listRankData.source.length) continue;
						this.listRankData.source[v.rank - 1] = v;
						this.rankArr[v.rank - 1] = v;
					}
				}
			}

			this.listRank.dataProvider = this.listRankData;
			this.listRank.itemRenderer = Activity_RanklistMainItem;
		}

		private onBtnRule() {
			loadUI(Activity_RanklistRule).then((dialog: Activity_RanklistRule) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}

		private removeShow() {
			let show = this.getChildByName("awards");
			if (show) this.removeChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "awards";
			this.addChild(show);
		}
	}
}