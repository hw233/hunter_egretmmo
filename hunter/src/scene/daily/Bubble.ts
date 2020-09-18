namespace zj {
	/**
	 * @author Lian Lei
	 * 
	 * date 2019-07-03
	 * 
	 * @class 主线任务气泡
	 */
	export class Bubble extends UI {
		public groupAll: eui.Group;
		private groupOpen: eui.Group;
		private labelState: eui.Label;
		private labelMission: eui.Label;
		private labelAward1: eui.Label;
		private imgGet: eui.Image;
		private groupAni: eui.Group;
		private groupTurn: eui.Group;
		private btnTurnClose: eui.Button;
		private btnTurnOpen: eui.Button;

		private timestop: number;

		private goods: Array<Array<number>>;
		private mission: any;
		private mTable: TableMissionMain;

		private isOpen: boolean;
		private leftX: number;
		private rightX: number;

		private initData: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/daily/BubbleSkin.exml";
		}

		private init() {
			if(!this.initData){
				this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
				this.btnTurnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTurn, this);
				this.btnTurnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTurn, this);
				this.rightX = this.x;
				this.leftX = -this.groupAll.width;
				this.isOpen = true;
				this.initData = true;
			}
			this.updateTurnBtn();
			this.mission = Game.PlayerMissionSystem.listForTask();
			this.mTable = Game.PlayerMissionSystem.itemMain(this.mission.missionId);
		}
		private updateTurnBtn(){
			this.groupTurn.visible = !this.isOpen;
			this.btnTurnClose.visible = this.isOpen;
		}
		// 主线任务相关 回到主城界面
		public SetMainMissionOnComeBack() { // 主城弹到栈顶调用
			this.init();
			let mIndex: number = Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);
			let tb = Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
			// let aa = "完成一次“窝金の试炼”，并对敌方施加一次中毒效果";
			// this.StartTalk(this.mTable.name);
			this.labelMission.text = this.mTable.name;
			// this.timestop = egret.setTimeout(function () {
			// 	this.StopTalk();
			// }, this, 5000);
			this.setState(tb);
			this.setReward(this.mTable.reward_goods);
			this.playAni();
		}


		public SetMainMissionAfterLogin() { // 主城初始化调用

			// if (this.mission != null && !this.mission.isFinish) {
			this.SetMainMissionOnComeBack();
			// }
			// else {
			// 	this.groupAll.visible = false;
			// }
		}

		// private StartTalk(text: string) {
		// 	egret.Tween.removeTweens(this.groupAll);
		// 	this.labelMission.text = "";
		// 	this._cur = 0;
		// 	this._count = text.length;

		// 	let _time = 150;
		// 	let _delayTime = 70;

		// 	egret.Tween.get(this.groupAll)
		// 		.call(() => { this.groupAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this) })
		// 		.to({ alpha: 0 }, 0).wait(300)
		// 		.to({ scaleX: 0.3, scaleY: 0.3 }, 0)
		// 		.to({ scaleX: 1.05, scaleY: 1.05 }, _time)
		// 		.to({ scaleX: 0.95, scaleY: 0.95 }, _time)
		// 		.to({ scaleX: 1, scaleY: 1 }, _time)
		// 		.to({ alpha: 1 }, _time)
		// 		.call(() => {
		// 			this.Talking(text);
		// 		});

		// }


		// private Talking(text: string) {
		// 	egret.Tween.removeTweens(this.groupAll);
		// 	this.groupAll.alpha = 1;
		// 	this.groupAll.visible = true;
		// 	this.groupOpen.alpha = 1;
		// 	this.groupOpen.visible = true;

		// 	for (let i = 0; i <= text.length; i++) {
		// 		let timenum = egret.setTimeout(function () {
		// 			this.labelMission.text = text.substr(0, this._cur);
		// 			this._cur += 1;
		// 		}, this, 30 * i);
		// 		this.timenpc.push(timenum);
		// 	}

		// 	this._cur = 0;
		// 	this._count = 0;

		// 	let _time = 150;
		// 	let _delay = 500;

		// 	egret.Tween.get(this.groupAll)
		// 		.to({ alpha: 1 }, _time * 2);
		// }

		// private StopTalk() {
		// 	this.clearAll();
		// }

		// private clearAll() {
		// 	if (this.timenpc.length > 0) {
		// 		for (let i = 0; i < this.timenpc.length; i++) {
		// 			egret.clearTimeout(this.timenpc[i]);
		// 		}
		// 	}
		// 	egret.clearTimeout(this.timestop);
		// }

		/**奖励 */
		private setReward(rewards: Array<Array<number>>) {
			let goods = [];
			for (let i = 0; i < rewards.length; i++) {
				goods.push([]);
			}

			for (let i = 0; i < rewards.length; i++) {
				let v = rewards[i];
				if (goods.length == 1) {
					goods[i].push(v[0], v[1]);
				}
				else {
					for (let j = 0; j < rewards[i].length; j++) {
						goods[i].push(v[j]);
					}
				}
			}
			this.goods = goods;
			this.awardDescription();
		}

		/**显示奖励描述 */
		private awardDescription() {
			if (this.goods.length != 0) {
				let des = [];
				for (let i = 0; i < this.goods.length; i++) {
					let goodsItem = PlayerItemSystem.ItemConfig(this.goods[i][0]); // 物品信息
					// (<eui.Label>this[`labelAward${i + 1}`]).text = goodsItem['name'] + "x" + this.goods[i][1];
					des.push(goodsItem['name'] + "x" + this.goods[i][1]);
				}
				this.labelAward1.text = TextsConfig.TextsConfig_Common.reward + "：" + (des.length == 2 ? des[0] + "，" + des[1] : des[0]);
			}
		}

		/**状态 */
		private setState(tb) {
			let finish = tb.finish;
			this.imgGet.visible = false;
			this.labelState.visible = true;
			let str = "(" + tb.isDo + "/" + tb.toDo + ")";
			if (finish) {
				this.labelState.text = "(已完成)"
				// this.labelState.textColor = Helper.RGBToHex("r:0,g:255,b:0");
				egret.Tween.get(this.labelState).to({ alpha: 0 }, 0).wait(300).to({ alpha: 1 }, 300);
			}
			else {
				this.labelState.text = str;
				// this.labelState.textColor = Helper.RGBToHex("r:255,g:0,b:0");
				egret.Tween.get(this.labelState).to({ alpha: 0 }, 0).wait(500).to({ alpha: 1 }, 300);
			}
		}

		private onBtnTurn(){
			this.isOpen = !this.isOpen;
			let tw = egret.Tween.get(this);
			tw.to({x: this.isOpen ? this.rightX : this.leftX}, 200, this.isOpen ? egret.Ease.backOut : egret.Ease.backIn);
			tw.call(()=>{
				egret.Tween.removeTweens(this);
				this.updateTurnBtn();
			}, this);
		}

		/**跳转 */
		private onBtnGo() {
			let mIndex: number = Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);
			let tb = Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
			//if (Teach.teachingNow == false) {
				if (!tb.finish) {
					// this.groupAll.alpha = 0;
					if (this.mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES) {
						Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)(this.mTable.condition);
					}
					else {
						Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)();
					}
				}
				else {
					Game.PlayerMissionSystem.ReqReward(this.mission.type, this.mission.subType).then((value: message.MissionRewardResponse) => {
						loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
							dialog.init(value.body.gameInfo.getGoods);
							dialog.show(UI.SHOW_FROM_TOP);
						});
					}).catch(reason => {
						toast_warning(reason);
					});
				}
			//}
		}

		private playAni() {
			if (this.mTable.id < 10 && this.groupAni.getChildByName("hand") == null && Teach.isDone(3005)) {
				zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", 1, 0).then(display => {
					display.name = "hand";
					// display.x = this.width - display.width;
					// display.y = this.height / 2 + 10;
					display.touchEnabled = false;
					display.scaleX = 0.6;
					display.scaleY = 0.6;
					this.groupAni.addChild(display);
				});
			}
			else if (this.mTable.id >= 10) {
				let ani = this.groupAni.getChildByName("hand");
				if (ani) {
					this.groupAni.removeChild(ani);
				}
			}
		}
	}
}