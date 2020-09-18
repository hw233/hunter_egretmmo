namespace zj {
/**
 * @class 年兽BOSS()
 * 
 * @author Yu Qingchao
 * 
 * 2019.08.02
 */
export class Activity_ActivityBoss extends UI {
	private lbTime: eui.Label;
	private lbTimeStop: eui.Label;
	private lbTextInfo: eui.Label;
	private btnGo: eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_ActivityBossSkin.exml";
		this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
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
		this.lbTextInfo.text = info.des;
		let strOpen = this.time(info.openTime);
		let timeOpen;
		if (strOpen.m < 10) {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
		} else {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
		}
		let strClose = this.time(info.closeTime);
		let timeClose;
		if (strClose.m < 10) {
			timeClose = strClose.Y + "-" + strClose.M + "-" + strClose.D + "  " + strClose.h + ":" + "0" + strClose.m;
		} else {
			timeClose = strClose.Y + "-" + strClose.M + "-" + strClose.D + "  " + strClose.h + ":" + strClose.m;
		}
		this.lbTime.text = timeOpen;
		this.lbTimeStop.text = timeClose;
	}
	private onBtnGo() {
		let GoActivityBoss = () => {
			if (PlayerMissionSystem.FunOpenTo(FUNC.ACTIVITYBOSS, true)) {
				Game.PlayerBossSystem.darklandBossScoreRank().then(() => {
					loadUI(Activity_BossMainPop)
						.then((scene: Activity_BossMainPop) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init();
						});
				}).catch(reason => {
					toast(reason);
				})
			}
		}

		let [bOpen, time] = Game.PlayerBossSystem.ActivityBossOpenTime()
		if (!bOpen) {
			toast_warning(TextsConfig.TextsConfig_Activity.battleNotStart);
		} else {
			GoActivityBoss()
		}
	}
}
}