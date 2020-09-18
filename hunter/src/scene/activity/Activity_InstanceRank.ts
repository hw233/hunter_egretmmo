namespace zj {
	/**
	 * @class 随机副本
	 * 
	 * @author LianLei
	 * 
	 * @date 2020-01-08
	 */
	export class Activity_InstanceRank extends UI {
		private labelTime: eui.Label;
		private labelDes: eui.Label;
		private info: any;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_InstanceRankSkin.exml";
			cachekeys(<string[]>UIResource["Activity_redPackage"], null);
		}
		public setInfo(info, father) {
			this.info = info;
			this.setInfoText();
		}

		public getActivityTime(sec: number): string {
			let time = sec;
			if (time == null || time == undefined) return;

			let date = new Date(time * 1000);
			return Helper.StringFormat("%s-%s-%s  %s:%s",
				date.getFullYear(),
				date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1,
				date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate(),
				date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours(),
				date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()
			);
		}

		private setInfoText() {
			let dateStart = this.getActivityTime(this.info.openTime);
			let dateClose = this.getActivityTime(this.info.closeTime);

			this.labelTime.text = dateStart + " 至 " + dateClose;

			this.labelDes.text = this.info.des;
		}
	}
}