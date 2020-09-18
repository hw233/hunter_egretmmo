namespace zj {
	//酒馆双倍积分
	//yuqingchao
	//2019.04.04
	export class ActivityDoubleTaver extends UI {
		private info;
		private lbTime: eui.Label;							//活动时间
		private lbInfo: eui.Label;							//活动内容
		private btnGetPartnerPoint: eui.Button;				//领取按钮
		private btnUsepartherPoint: eui.Button;				//前往按钮
		private father: ActivityMain;
		// private father: ActivityMain;
		private groupAnimal: eui.Group;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityDoubleTaverSkin.exml";
			cachekeys(<string[]>UIResource["ActivityDoubleTaver"], null);
			this.btnGetPartnerPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetPartnerPoint, this);
			this.btnUsepartherPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUsepartherPoint, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=>{
				this.father = null;
			}, null);
		}

		public setInfo(info, father) {
			this.info = info;
			this.father = father;
			this.setInfoTime();
			this.setInfoUI();
			this.info.rewards;
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
		public init() {
			// Game.DragonBonesManager.playAnimation(this, "ui_tongyong_huodongguang_eff", "armatureName", null, 0).then(display => {
			// 	this.groupAnimal.addChild(display);
			// }).catch(reason => {
			// 	toast(reason);
			// });
		}
		private setInfoTime() {
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
		}
		private setInfoUI() {
			let has_get = Table.FindF(this.info.rewardIndex, (_k, _v) => {
				return _v == 1;
			})
			this.btnGetPartnerPoint.enabled = !has_get;
		}
		private onBtnGetPartnerPoint() {
			Game.PlayerActivitySystem.queryActivitysReward(message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING).then(() => {
				if (this.info != null && this.info.closeTime > Date.parse(Game.Controller.serverNow().toString()) / 1000) {
					let type = this.info.type;
					let index = this.info.index;
					let rewardIndex = 1;
					Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then((resp: message.GameInfo) => {
						this.btnGetPartnerPoint.enabled = false;
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(resp.getGoods);
								dialog.setCB(() => {
									if (this.father) {
										this.father.setInit();
									}
								})
								dialog.show();
							})
					})
				}
			});
		}
		private onBtnUsepartherPoint() {
			loadUI(TavernScene)
				.then((scene: TavernScene) => {
					scene.show(UI.SHOW_FILL_OUT);
					scene.nPCDialog();
				});
			this.father.close(UI.HIDE_TO_TOP);
		}
	}
}