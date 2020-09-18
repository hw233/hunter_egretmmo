namespace zj {
//DoubleColorPush
//yuqingchao
export class DoubleColorPush extends Dialog {
	private btnClose: eui.Button;
	private lstA: eui.List;
	private arrA: eui.ArrayCollection;
	private lstB: eui.List;
	private arrB: eui.ArrayCollection;
	private lbMy: eui.Label;
	private historyBetInfo: any = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorPushSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
	}
	public init() {
		this.AskForDoubleInfo();
	}
	private AskForDoubleInfo() {
		// this.setInfo();
		Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit().then((data: message.GetLotteryFruitInfoResponse) => {
			Game.PlayerDoubleBallSystem.lastDoubleInfo.bPushed = true;
			Game.PlayerDoubleBallSystem.SaveLastDoubleInfo();
			let historyInfo = data.body.fruitInfo.historyLotteryFruit;
			let sortByValue = (a, b) => {
				return a.creatTime - b.creatTime;
			};
			historyInfo.sort(sortByValue);
			this.historyBetInfo = historyInfo[0];
			if (this.historyBetInfo == null) {
				return;
			};
			this.setInfo();
		})
	}
	private setInfo() {
		let historyTbl = [];		//上期开奖记录
		historyTbl.push(this.historyBetInfo.redFruit);
		this.historyBetInfo.blueFruit.sort(function (a, b) {
			return a - b;
		});
		for (let i = 0; i < this.historyBetInfo.blueFruit.length; i++) {
			historyTbl.push(this.historyBetInfo.blueFruit[i]);
		};
		let any = Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo;
		let lastTbl = Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo.split("&");
		lastTbl.sort(function (a, b) {
			return Number(a) - Number(b);
		});
		let lstTbl = [];		//投注记录
		for (let i = 1; i < 6; i++) {
			lstTbl.push(Number(lastTbl[i]));
		}

		//Red
		this.arrA = new eui.ArrayCollection();
		for (let i = 0; i < historyTbl.length; i++) {
			this.arrA.addItem({
				i,
				id: historyTbl[i],
				bPrize: false,
			})
		}
		this.lstA.dataProvider = this.arrA;
		this.lstA.itemRenderer = DoubleColorPushItem;

		//Blue
		this.arrB = new eui.ArrayCollection();
		for (let i = 0; i < lstTbl.length; i++) {
			let bPrize = Table.VIn(historyTbl, lstTbl[i]);
			this.arrB.addItem({
				i,
				id: lstTbl[i],
				bPrize: bPrize
			})
		}
		this.lstB.dataProvider = this.arrB;
		this.lstB.itemRenderer = DoubleColorPushItem;

		let bet_reward = Game.PlayerDoubleBallSystem.betReward(lstTbl, historyTbl);			//判断是否中奖
		this.lbMy.text = TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + TextsConfig.TextsConfig_Hunter_DoubleColor.reward[bet_reward.length];
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}