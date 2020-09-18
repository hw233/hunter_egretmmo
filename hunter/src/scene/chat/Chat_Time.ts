namespace zj {
    /**
     * 聊天界面时间戳
     */
	export class Chat_Time extends UI {
		private lbTime: eui.Label;
		public constructor(time: number, dataCur: Date) {
			super();
			this.skinName = "resource/skins/chat/Chat_TimeSkin.exml";
			let data = new Date(time * 1000);
			let year = data.getFullYear();
			let month = data.getMonth() + 1;
			let date = data.getDate();
			let hour = data.getHours();
			let minute = data.getMinutes();// 分钟

			let curryear = dataCur.getFullYear();
			let currmonth = dataCur.getMonth() + 1;
			let currdate = dataCur.getDate();

			if (dataCur.getTime() > data.getTime() && dataCur.getTime() - data.getTime() < 24 * 60 * 60 * 1000) {// 小于24小时
				if (date == currdate) {
					this.setCurrDate(hour, minute);
				} else {
					this.setTimeYesterday(hour, minute);
				}
			} else {
				this.setTimeAll(year, month, date, hour, minute);
			}
		}

		private setTimeAll(year: number, month: number, date: number, hour: number, minute: number) {
			let str = Helper.StringFormat(TextsConfig.TextsConfig_Time.timeStr, year, month, date)
				 + " " +this.getTime(hour, minute);
			this.lbTime.text = str;
		}
		private setTimeYesterday(hour: number, minute: number) {
			this.lbTime.text = TextsConfig.TextsConfig_Time.yesterday + " " + this.getTime(hour, minute);
		}
		private setCurrDate(hour: number, minute: number) {
			this.lbTime.text = this.getTime(hour, minute);
		}
		private getTime(hour: number, minute: number){
			return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
		}
	}
}