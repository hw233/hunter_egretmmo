namespace zj {
	export class Activity_DailyFirstCharge extends Dialog {
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;
		private btnCharge: eui.Button;
		private btnGet: eui.Button;
		private btnClose: eui.Button;


		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_DailyFirstChargeSkin.exml";
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCharge, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);

			this.setInfo();
		}

		private setInfo() {
			this.btnCharge.visible = !Game.PlayerInfoSystem.BaseInfo.is_chargeToday; // 判断今天是否充值
			this.btnCharge.enabled = !Game.PlayerInfoSystem.BaseInfo.is_chargeToday;
			this.btnGet.enabled = !Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay; // 每日首充奖励是否领取
			this.btnGet.visible = Game.PlayerInfoSystem.BaseInfo.is_chargeToday;

			let gap = 6;
			this.scrollerAward.width = CommonConfig.charge_everyday_reward.length * 95 + gap * (CommonConfig.charge_everyday_reward.length - 1);

			this.listAwardData.removeAll();
			for (let i = 0; i < CommonConfig.charge_everyday_reward.length; i++) {
				this.listAwardData.addItem({ goodsId: CommonConfig.charge_everyday_reward[i][0], count: CommonConfig.charge_everyday_reward[i][1] });
			}
			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Activity_DailyFirstChargeItem;
		}

		private onBtnGet() {
			let req = new message.RewardEverydayChargeRequest();
			Game.Controller.send(req, this.GetRewardEverydayCharge_Visit, null, this, false);
		}

		private GetRewardEverydayCharge_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.RewardPermitMissionResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}

			if (response.body.gameInfo.goodsInfo.length != 0) {
				let arr: Array<message.GoodsInfo> = [];
				for (let i = 0; i < CommonConfig.charge_everyday_reward.length; i++) {
					let goodsInfo = new message.GoodsInfo();
					goodsInfo.goodsId = CommonConfig.charge_everyday_reward[i][0];
					goodsInfo.count = CommonConfig.charge_everyday_reward[i][1];
					arr.push(goodsInfo);
				}
				loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
					dialog.show();
					dialog.init(arr);
					dialog.setCB(() => {
						this.close(UI.HIDE_TO_TOP);
						Game.EventManager.event(GameEvent.CLOSE_DAILYFIRSTCHARGE);
					});
				})
			}
		}

		private onBtnCharge() {
			this.close();
			loadUI(PayMallScene).then((scene: PayMallScene) => {
				scene.show(UI.SHOW_FROM_TOP);
				scene.init(false);
			});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) this.removeChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
	}
}