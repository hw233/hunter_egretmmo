namespace zj {
//公会BOSS-庆功宴
//yuqingchao
//2019.03.11
export class LeagueBossCelebrate extends Dialog {
	private btnClose: eui.Button;
	private lbTime: eui.Label;
	private lstFood: eui.List;
	private process: message.ProgressInfo = null;
	private timer: egret.Timer;
	private arrayCollection: eui.ArrayCollection;
	private type = [TableEnum.Enum.League_CelebrateType.NORMAL, TableEnum.Enum.League_CelebrateType.ADD];

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossCelebrateSkin.exml"
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

		Game.EventManager.on(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);

			if (this.timer) this.timer.stop();
		}, null);

		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
		this.timer.start();
		this.process = Table.FindR(Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
			if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
				return true;
			}
		})[0];

		this.initList();
	}
	private upDate() {
		this.setTimeDes();
		if (this.process && this.process.leftTime * 1000 - egret.getTimer() <= 0) {
			if (this.timer) this.timer.stop;
			this.close(UI.HIDE_TO_TOP);
		}
	}
	private setTimeDes() {
		let time = this.process.leftTime - Math.floor(egret.getTimer() / 1000);
		this.lbTime.text = Helper.GetTimeStr(time <= 0 ? 0 : time, false);
	}
	private tableLength(table: Object): number {
		let len = 0;
		for (let k in table) {
			len++;
		}
		return len;
	}
	public initList() {
		this.arrayCollection = new eui.ArrayCollection();
		let num = this.tableLength(TableEnum.Enum.League_CelebrateType);
		let tip: number = 0;
		for (let i = 0; i < this.tableLength(TableEnum.Enum.League_CelebrateType); i++) {
			this.arrayCollection.addItem({
				i,
				type: i + 1,
				num: tip++,
				father: this
			})
		}
		this.lstFood.dataProvider = this.arrayCollection;
		this.lstFood.itemRenderer = LeagueBossCelebrateFood;

	}

	private showCommonMessgae(ev: egret.Event) {
		setTimeout(() => {
			let ui = <CommonMessage>newUI(CommonMessage);
			this.addChild(ui);
			ui.init(ev.data.source, ev.data.text, 0.5, 0.7, false);
		}, 300);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
		this.timer.stop();
	}
}
}