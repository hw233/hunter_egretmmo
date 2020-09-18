namespace zj {
	/**
	 * @class 累计在线赢大奖
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-10-29
	 */
	export class Activity_OnlineGetAwards extends Dialog {
		private labelCountTime: eui.Label;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.Label;
		private listAward: eui.List;
		private btnClose: eui.Button;

		private listAwardData: eui.ArrayCollection;
		private awardInfo: { [key: string]: TableOnlineReward };
		private timer: number;
		private last_logintime: number; // 本次游戏登录时间
		private server_Time: number; // 服务器时间
		private total_login_time: number; // 累计登录时间
		private awardIndex: number; // 上方显示奖励索引

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_OnlineGetAwardsSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.listAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeList, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
			Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.updateLoginTime, this);
			this.timer = egret.setInterval(this.update, this, 0);
			this.init();
		}

		private init() {
			this.last_logintime = Game.UIManager.topScene()['sceneUI']['last_logintime']; //Game.Controller.curServerTime;//this.timeFormatConversion(Game.Controller.roleInfo().last_logintime);
			this.server_Time = Game.Controller.curServerTime;
			this.total_login_time = Game.UIManager.topScene()['sceneUI']['total_login_time'];
			this.awardIndex = 0;
			this.update();
			this.listAwardData = new eui.ArrayCollection();
			this.awardInfo = TableOnlineReward.Table();

			this.setInfoList();
		}

		private setInfoList() {
			this.listAwardData.removeAll();
			for (const key in this.awardInfo) {
				if (this.awardInfo.hasOwnProperty(key)) {
					const element = this.awardInfo[key];
					let info = { goods_id: element.goods_id[0], count: element.goods_count[0], countTime: element.online_time }
					let itemData = new Activity_OnlineGetAwardsItemData();
					itemData.goodsInfo = info;
					itemData.index = Number(key);
					this.listAwardData.addItem(itemData);
				}
			}

			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Activity_OnlineGetAwardsItem;
			this.listAward.selectedIndex = 0;
		}

		private setInfoListEnd() {
			this.listAwardData.removeAll();
			for (const key in this.awardInfo) {
				if (this.awardInfo.hasOwnProperty(key)) {
					const element = this.awardInfo[key];
					let info = { goods_id: element.goods_id[0], count: element.goods_count[0], countTime: 0 }
					let itemData = new Activity_OnlineGetAwardsItemData();
					itemData.goodsInfo = info;
					itemData.index = Number(key);
					this.listAwardData.addItem(itemData);
				}
			}

			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Activity_OnlineGetAwardsItem;
			this.listAward.selectedIndex = 0;
		}

		private setAward(index: number) {
			if (this.awardIndex == index) return;
			this.awardIndex = index;
			let award = TableOnlineReward.Item(index);
			let itemSet = PlayerItemSystem.Set(award.goods_id[0], null, award.goods_count[0]) as any;
			// this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.labelNum.text = "x" + award.goods_count;
		}

		private updateLoginTime() {
			this.last_logintime = Game.UIManager.topScene()['sceneUI']['last_logintime'];
			this.total_login_time = Game.UIManager.topScene()['sceneUI']['total_login_time'];
			this.update();
		}

		private update() {
			this.server_Time = Game.Controller.curServerTime;
			let onlineTime = this.total_login_time + (this.server_Time - this.last_logintime); // 登录总时长

			if (this.listAwardData == null) return;

			let timeAll = 0;
			for (let i = 1; i <= Object.keys(TableOnlineReward.Table()).length; i++) {
				timeAll += TableOnlineReward.Item(i).online_time;
			}

			if (onlineTime >= timeAll) {
				this.labelCountTime.text = "00:00:00";
				this.setInfoListEnd();
				egret.clearInterval(this.timer);
				this.timer = -1;
				let len = Helper.getObjLen(TableOnlineReward.Table());
				let info = TableOnlineReward.Item(len);
				let itemSet = PlayerItemSystem.Set(info.goods_id[0], null, info.goods_count[0]) as any;
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.labelNum.text = "x" + info.goods_count[0];
				return;
			}

			for (let i = 1; i <= Helper.getObjLen(TableOnlineReward.Table()); i++) {
				let a = 0;
				for (let j = 0; j < i; j++) {
					a += TableOnlineReward.Item(j + 1).online_time;
				}
				if (a - onlineTime > 0) {
					this.setAward(i);
					this.labelCountTime.text = Helper.GetTimeStr(a - onlineTime, false);
					this.listAwardData.source[i - 1].goodsInfo.countTime = a - onlineTime;
					this.listAwardData.source[i - 1].isShowTime = true;
					this.listAwardData.replaceItemAt(this.listAwardData.source[i - 1], i - 1);
					return;
				}
				else {
					let index = i;
					if (index + 1 > Object.keys(TableOnlineReward.Table()).length) index = Object.keys(TableOnlineReward.Table()).length;
					this.setAward(index);
					this.listAwardData.source[i - 1].goodsInfo.countTime = 0;
					this.listAwardData.source[i - 1].isShowTime = false;
					this.listAwardData.replaceItemAt(this.listAwardData.source[i - 1], i - 1);
				}
			}
		}

		private onChangeList(e: eui.ItemTapEvent) {
			let item = this.listAward.getElementAt(e.itemIndex) as Activity_OnlineGetAwardsItem;
			let data = this.listAwardData.getItemAt(e.itemIndex) as Activity_OnlineGetAwardsItemData;

			if (data.goodsInfo.countTime <= 0 && Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(e.itemIndex + 1) == -1) {
				let self = this;
				Game.PlayerActivitySystem.OnlineTimeRewardReq(e.itemIndex + 1).then((value: message.OnlineTimeRewardResponse) => {
					loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
						dialog.init(value.body.gameInfo.getGoods);
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setCB(() => {
							self.listAwardData.replaceItemAt(this.listAwardData.source[e.itemIndex], e.itemIndex);
						});
					});
				});
			}
		}

		private onBtnClose() {
			egret.clearInterval(this.timer);
			this.timer = -1;
			this.close(UI.HIDE_TRAIL_OFF);
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) this.removeChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			// if (Game.UIManager.dialogCount() > 0) return;
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
			show.touchChildren = show.touchEnabled = false;
		}
	}
}