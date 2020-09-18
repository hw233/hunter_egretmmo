namespace zj {
	export enum RED_PACKAGE {
		DONE = 1,
		UNDONE = 2,

	}
	/**
	 * @class 红包活动(主城界面)
	 * 
	 * @author LianLei
	 * 
	 * @date 2020-01-08
	 */
	export class Activity_redWarsDialogMain extends Dialog {
		public static showRedPackageMap: { [key: number]: number } = {};
		private groupTouch: eui.Group;
		private imgTip: eui.Image;
		private imgNum: eui.Image;
		private groupOpen: eui.Group;
		private imgOpen: eui.Image;
		private labelNum: eui.BitmapLabel;
		private groupTip: eui.Group;
		private labelTips: eui.Label;
		private timer: number = 0;
		private redpackageStage: number = RED_PACKAGE.UNDONE;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_redWarsDialogMainSkin.exml";
			this.groupOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpen, this);
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.timer = egret.setInterval(this.update, this, 1000);
			this.setInfo();
			this.update();
		}

		private setInfo() {
			let ret: Array<number> = Activity_redWarsDialogMain.returnAwardNums();
			this.redpackageStage = ret[2];

			if (this.redpackageStage == RED_PACKAGE.DONE) {
				this.setStatus(ret[0], ret[1]);
			}
			else if (this.redpackageStage == RED_PACKAGE.UNDONE) {
				this.setStatus();
			}

			egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
			egret.Tween.get(this.imgOpen, { loop: true }).to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
		}

		/**
		 * @description 设置红包状态
		 * @param awardNum {number} 奖励数量
		 * @param beyondNum {number} 超越人数百分比
		 */
		private setStatus(awardNum: number = 0, beyondNum: number = 0) {
			switch (this.redpackageStage) {
				case RED_PACKAGE.DONE: // 已经抢过
					this.groupOpen.visible = false;
					this.groupTip.visible = true;
					this.labelNum.text = awardNum.toString();
					this.labelTips.text = beyondNum + "%";
					this.imgNum.source = cachekey("ui_acitivity_redWars_Get_png", this);
					break;
				case RED_PACKAGE.UNDONE: // 没有抢过
					let redPackageInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
						return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
					})[0];
					this.groupTip.visible = false;
					this.groupOpen.visible = true;

					let dayIndex = redPackageInfo.rewardZone[Math.floor((Game.Controller.curServerTime - redPackageInfo.openTime) / (3600 * 24))];
					let isBigPackage: boolean = dayIndex == 1;
					this.labelNum.text = (isBigPackage ? 188888 : 28888).toString();
					break;
			}
		}

		private onBtnOpen() {
			let req = new message.ActivityRedPacketGrabRequest();
			Game.Controller.send(req, this.ActivityRedPacketGrabReq_Visit, null, this, false);
		}

		private ActivityRedPacketGrabReq_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.ActivityRedPacketGrabResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			this.setInfo();
		}

		/**
		 * @description 返回红包中奖数量 超越人数 当前红包是否领取
		 */
		public static returnAwardNums(): [number, number, number] {
			let infoTimes: number = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET].info; // 第几轮红包

			let [awardNum, beyondNum, state] = [0, 0, RED_PACKAGE.UNDONE];

			for (const key in Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab.hasOwnProperty(key)) {
					const element = Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab[key];
					if (element.key == infoTimes) {
						awardNum = element.value;
						state = RED_PACKAGE.DONE;
						break;
					}
				}
			}

			for (const key in Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes.hasOwnProperty(key)) {
					const element = Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes[key];
					if (element.key == infoTimes) {
						beyondNum = element.value;
						break;
					}
				}
			}
			return [awardNum, beyondNum, state];
		}

		private update() {
			let time = Game.Controller.Activity_redpackage_countdown - Game.Controller.curServerTime;
			if (time <= 0) this.onBtnClose();
		}

		private onBtnClose() {
			egret.clearInterval(this.timer);
			this.timer = -1;
			egret.Tween.removeTweens(this.imgTip);
			egret.Tween.removeTweens(this.imgOpen);
			this.close(UI.HIDE_TO_TOP);
		}
	}
}