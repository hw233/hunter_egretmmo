namespace zj {
//双色果主界面
//yuqingchao
//2019.05.28
export class DoubleColorSence extends Dialog {
	private lbTime: eui.Label;				//投注时间
	private lbOpenAwardTime: eui.Label;		//开奖时间
	private lbInfo: eui.Label;				//投注要求
	private lbOpenAwardDay: eui.IDisplayText;		//距离开奖时间
	private lbMy: eui.Label;				//我的投注结果
	private groupAll: eui.Group;
	private groupTouzhu: eui.Group
	public btnOK: eui.Button;				//投注按钮
	private btnAwardView: eui.Button;		//奖励预览
	private btnViewEnd: eui.Button;			//查询结果
	private btnClose: eui.Button;
	private groupFruit1_1: eui.Group;
	private groupFruit1_2: eui.Group;
	private groupFruit1_3: eui.Group;
	private groupFruit1_4: eui.Group;
	private groupFruit1_5: eui.Group;
	private groupFruit2_1: eui.Group;
	private groupFruit2_2: eui.Group;
	private groupFruit2_3: eui.Group;
	private groupFruit2_4: eui.Group;
	private groupFruit2_5: eui.Group;
	private state = null;
	private preState;
	private enableBet: boolean = false;
	public timer: egret.Timer = new egret.Timer(990, 0);
	private myItemArr = [];
	private publicItemArr = [];
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorSenceSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.btnAwardView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAwardView, this);
		this.btnViewEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBnViewEnd, this);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
		this.timer.start();
		for (let i = 1; i < 6; i++) {
			this[`groupFruit1_${i}`].removeChildren();
		}
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			if (this.timer) this.timer.stop();
		}, null);
		this.init();
	}

	private init() {
		this.state = null;
		this.enableBet = false;
		this.preState = this.stage;

		this.setInfo();
		this.setInfoMyFruitList();
		this.setInfoPublicFruitList();

		this.upDate();

		//Teach
		if (Teach.isDone(teachBattle.teachPartID_DoubleFruit) == false) {
			Teach.CheckAndSetTeach(teachBattle.teachPartID_DoubleFruit)
		}
	}

	private setInfo() {
		let inTime = Helper.FormatDaysTimeChs(CommonConfig.double_fruit_bet_time[2]);
		let waitTime = Helper.FormatDaysTimeChs(CommonConfig.double_fruit_bet_time[0]);
		let runTime = Helper.FormatDaysTimeChs(CommonConfig.double_fruit_bet_time[1]);
		let str1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.start_time, inTime, waitTime);
		let str2 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.run_time, runTime);
		this.lbTime.text = str1;
		this.lbOpenAwardTime.text = str2;
	}

	public upDate() {
		this.setInfoState();
		this.setInfoTime();

	}

	private setInfoState() {
		let cur = this.time(Date.parse(Game.Controller.serverNow().toString()) / 1000);
		let sec = cur.h * 3600 + cur.m * 60 + cur.s;
		if (CommonConfig.double_fruit_bet_time[2] <= sec && sec < CommonConfig.double_fruit_bet_time[0]) {
			this.state = 0;			//可投注
		} else if ((CommonConfig.double_fruit_bet_time[0] - 86400) <= sec && sec < CommonConfig.double_fruit_bet_time[1]) {
			this.state = 1;			//不可投注，等待开奖（24点至早上7点）
		} else {
			this.state = 2;			//不可投注，等待活动下期开始
		}
		if (this.state != this.preState) {
			this.preState = this.state;
			this.setInfoUI();
		}
	}

	private setInfoTime() {
		let cur = this.time(Date.parse(Game.Controller.serverNow().toString()) / 1000);
		let sec = cur.h * 3600 + cur.m * 60 + cur.s;
		let time = null;
		let lastTime: string = null;
		if (this.state == 0) {
			lastTime = Helper.FormatMsTime3(CommonConfig.double_fruit_bet_time[1] + 86400 - sec);
			time = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.next_run, lastTime);
		} else if (this.state == 1) {
			if (CommonConfig.double_fruit_bet_time[1] > sec) {
				lastTime = Helper.FormatMsTime3(CommonConfig.double_fruit_bet_time[1] - sec);
			} else {
				lastTime = Helper.FormatMsTime3(CommonConfig.double_fruit_bet_time[1] + 24 * 3600 - sec);
			}
			time = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.next_run, lastTime);
		} else if (this.state == 2) {
			let lastTime = ((24 + 4) * 3600 - sec) % (24 * 3600);
			time = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.next_turn, Helper.FormatMsTime3(lastTime));
		}
		this.lbOpenAwardDay.text = time;
	}
	private setInfoButton() {
		let b_enbaled: boolean = false;
		if (this.state == 2 || this.state == 1) {
			b_enbaled = false;
		} else {
			b_enbaled = Game.PlayerDoubleBallSystem.my_id[1] == 0;
		}
		this.btnOK.enabled = b_enbaled;
	}
	private setInfoUI() {
		this.setInfoButton();
		if (this.state == 0) {
			this.setInfoMyFruitList();
		}
		this.setInfoPublicFruitList();

	}
	public onAbovePop() {
		this.setInfoButton();
		this.setInfoPublicFruitList();
		this.setInfoMyFruitList();
	}
	private setInfoMyFruitList() {
		for (let i = 1; i < 6; i++) {
			let item = new DoubleColorItem();
			this[`groupFruit1_${i}`].addChild(item);
			item.setInfo(i - 1, this, true, this.btnOK.enabled);
			this.myItemArr.push(item);
		}
	}

	private setInfoPublicFruitList() {
		for (let i = 1; i < 6; i++) {
			let item = new DoubleColorItem();
			this[`groupFruit2_${i}`].addChild(item);
			item.setInfo(i - 1, this);
			this.publicItemArr.push(item);
		}
		if (this.state == 2) {
			let setPublicInfo = () => {
				let betReward = Game.PlayerDoubleBallSystem.betReward(Game.PlayerDoubleBallSystem.my_id, Game.PlayerDoubleBallSystem.public_id);
				if (Game.PlayerDoubleBallSystem.my_id[0] == 0) {
					this.lbMy.text = TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + TextsConfig.TextsConfig_Hunter_DoubleColor.not_in;
				} else {
					this.lbMy.text = TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + TextsConfig.TextsConfig_Hunter_DoubleColor.reward[betReward.length];
				}
				let any = this.myItemArr;
				for (let i = 0; i < 5; i++) {
					this.myItemArr[i].upDate();
					this.publicItemArr[i].upDate();
				}
			}
			if (Game.PlayerDoubleBallSystem.public_id[0] == 0) {
				Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit()
					.then((data: message.GetLotteryFruitInfoResponse) => {
						Game.PlayerDoubleBallSystem.my_id = Game.PlayerDoubleBallSystem.serverFruit(Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
						let idMy = Game.PlayerDoubleBallSystem.my_id;
						Game.PlayerDoubleBallSystem.public_id = Game.PlayerDoubleBallSystem.serverFruit(data.body.fruitInfo.dailyLotteryFruit.redFruit, data.body.fruitInfo.dailyLotteryFruit.blueFruit);
						let idPublic = Game.PlayerDoubleBallSystem.public_id;
						setPublicInfo();
					}).catch(() => {

					});
			} else {
				setPublicInfo();
			}
		} else if (this.state == 0) {
			this.lbMy.text = TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + TextsConfig.TextsConfig_Hunter_DoubleColor.not_bet;
		} else if (this.state == 1) {
			this.lbMy.text = TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + TextsConfig.TextsConfig_Hunter_DoubleColor.not_bet;
		}
	}

	//奖励预览
	private onBtnAwardView() {
		loadUI(DoubleColorViewAward)
			.then((dialog: DoubleColorViewAward) => {
				dialog.show(UI.SHOW_FROM_TOP);
			})
	}

	//查询结果
	private onBnViewEnd() {
		Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit()
			.then((data: message.GetLotteryFruitInfoResponse) => {
				Game.PlayerDoubleBallSystem.my_id = Game.PlayerDoubleBallSystem.serverFruit(Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
				Game.PlayerDoubleBallSystem.public_id = Game.PlayerDoubleBallSystem.serverFruit(data.body.fruitInfo.dailyLotteryFruit.redFruit, data.body.fruitInfo.dailyLotteryFruit.blueFruit);
				loadUI(DoubleColorViewEnd)
					.then((dialog: DoubleColorViewEnd) => {
						dialog.show(UI.SHOW_FROM_TOP);
						let any = data.body.fruitInfo;
						dialog.setInfo(data.body.fruitInfo.historyLotteryFruit);
					});
			});
	}

	//投注
	public onBtnOk() {
		if (Game.PlayerDoubleBallSystem.canPour()) {
			loadUI(DoubleColorPop)
				.then((dialog: DoubleColorPop) => {
					dialog.init(this);
					dialog.show(UI.SHOW_FROM_TOP);
				})
		} else {
			toast_warning(TextsConfig.TextsConfig_Hunter_DoubleColor.not_enough);
		}
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

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
		this.timer.stop();
	}
}
}