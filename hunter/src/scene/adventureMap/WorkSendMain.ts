namespace zj {
	/**
	 * @class 工作派遣
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-08
	 */
	export class WorkSendMain extends Scene {
		private btnClose: eui.Button;
		private groupTR: eui.Group;
		private groupbtnAddGold: eui.Group;
		private lbGold: eui.Label;
		private btnAddGold: eui.Button;
		private groupbtnAddGemstone: eui.Group;
		private lbGemstone: eui.Label;
		private jewel: eui.Image;
		private btnAddGemstone: eui.Button;
		private groupbtnAddStrength: eui.Group;
		private lbStrength: eui.Label;
		private energy: eui.Image;
		private btnAddStrength: eui.Button;
		private labelWorkNum: eui.Label;
		private labelEnd: eui.Label;
		private scrollerWork: eui.Scroller;
		private listWork: eui.List;
		private btnFresh: eui.Button;
		private labelRefreshNum: eui.Label;
		private groupFresh: eui.Group;

		private workInfo: Array<message.InstanceSearch> = [];
		private listWorkData: eui.ArrayCollection = new eui.ArrayCollection();
		private infoArr: Array<message.InstanceSearch> = []; // 只有没领取或者没开始的任务
		private timer: egret.Timer = new egret.Timer(1000, 0);
		private workNum: number = 0;
		private canGetArr: Array<message.InstanceSearch> = [];

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/WorkSendMainSkin.exml";
			this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFresh, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
			this.timer.start();
			Game.EventManager.on(GameEvent.RERESH_WORKLOCK_STATE, this.freshLockState, this);
			Game.EventManager.on(GameEvent.WORK_END_REFRESH, this.reFreshWork, this);
			Game.EventManager.on(GameEvent.WORK_SEND_START, this.startWork, this);
			Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.updateRes, this);
			Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.updateRes, this);
			Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateRes, this);
			this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
			this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
			this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);

			Game.EventManager.on(GameEvent.PLAYER_VIPLEVEL_CHANGE, this.reFreshWork, this);
			Game.EventManager.on(GameEvent.PLAYER_LICENCELEVEL_CHANGE, this.reFreshWork, this);

			this.init();
		}

		private init() {
			this.workInfo = [];
			this.workNum = CommonConfig.init_search_count + TableVipinfo.Item(Game.PlayerInfoSystem.VipLevel).search_count + TableLicence.Item(Game.PlayerInfoSystem.BaseInfo.licenceLevel).search_count;
			for (let i = 0; i < Game.PlayerInstanceSystem.InstanceInfo.searchInfo.length; i++) {
				if (Game.PlayerInstanceSystem.InstanceInfo.searchInfo[i].order_id <= this.workNum) this.workInfo.push(Game.PlayerInstanceSystem.InstanceInfo.searchInfo[i]);
			}
			this.workInfo.sort((a, b) => { return b.index - a.index; });

			this.infoArr = []; // 没开始和没有领取的任务
			for (let i = 0; i < this.workInfo.length; i++) {
				if (!this.workInfo[i].is_reward) this.infoArr.push(this.workInfo[i]);
			}

			this.indexArr = []; // 已开始的任务Id
			for (let i = 0; i < this.infoArr.length; i++) {
				let time = Game.Controller.curServerTime - this.infoArr[i].start_time;
				let remainTime = this.infoArr[i].time - time;
				if (this.infoArr[i].start_time != 0 && !this.infoArr[i].is_reward && remainTime > 0) this.indexArr.push(this.infoArr[i].id);
			}

			this.canGetArr = [];
			for (let i = 0; i < this.workInfo.length; i++) {
				if (this.workInfo[i].start_time == 0) continue;
				let time = Game.Controller.curServerTime - this.workInfo[i].start_time;
				let remainTime = this.workInfo[i].time - time;
				if (!this.workInfo[i].is_reward && remainTime <= 0) { // 可以领取奖励但未领取的任务
					this.canGetArr.push(this.workInfo[i]);
				}
			}

			this.arrSort();
			this.setInfoList();
			this.setUI();
			this.updateRes();
		}

		private arrSort() {
			let self = this;
			let startArr: Array<message.InstanceSearch> = []; // 已经开始的任务信息
			for (let i = 0; i < this.indexArr.length; i++) {
				for (let j = 0; j < this.infoArr.length; j++) {
					if (this.indexArr[i] == this.infoArr[j].id) {
						startArr.push(this.infoArr[j]);
						break;
					}
				}
			}

			this.infoArr = this.infoArr.filter(function (v) { return !(startArr.indexOf(v) > -1) }).concat(startArr.filter(function (v) { return !(self.infoArr.indexOf(v) > -1) })); // 求补集
			this.infoArr = this.infoArr.filter(function (v) { return !(self.canGetArr.indexOf(v) > -1) }).concat(self.canGetArr.filter(function (v) { return !(self.infoArr.indexOf(v) > -1) })); // 求补集
			for (let i = 0; i < startArr.length; i++) {
				if (this.infoArr.indexOf(startArr[i]) == -1 && this.canGetArr.indexOf(startArr[i]) == -1) this.infoArr.push(startArr[i]);
			}
			for (let i = 0; i < this.canGetArr.length; i++) {
				if (this.infoArr.indexOf(this.canGetArr[i]) == -1) this.infoArr.push(this.canGetArr[i]);
			}
		}

		private update() {
			for (let i = 0; i < this.indexArr.length; i++) {
				for (let j = 0; j < this.infoArr.length; j++) {
					if (this.indexArr[i] == this.infoArr[j].id) {
						this.listWorkData.replaceItemAt(this.listWorkData.source[j], j);
						let time = Game.Controller.curServerTime - this.infoArr[j].start_time;
						let remainTime = this.infoArr[j].time - time - 1;
						if (remainTime <= 0) {
							this.indexArr.splice(i, 1);
							if (this.canGetArr.indexOf(this.infoArr[j]) == -1) this.canGetArr.push(this.infoArr[j]);
							this.init();
						}
						break;
					}
				}
			}
		}

		private indexArr: Array<number> = []; // 开始的任务id
		private startWork(ev: egret.Event) {
			let self = this;
			Game.PlayerInstanceSystem.LockSearchingReq(ev.data, true).then((value) => {
				if (self.indexArr.indexOf(ev.data.index) == -1) self.indexArr.push(ev.data);
				self.init();
			});
		}

		private setInfoList() {
			this.listWorkData.removeAll();
			for (let i = 0; i < this.infoArr.length; i++) {
				let itemData = new WorkSendMainItemData();
				itemData.workInfo = this.infoArr[i];
				itemData.index = i;
				itemData.islock = this.infoArr[i].is_lock;
				this.listWorkData.addItem(itemData);
			}
			this.listWork.dataProvider = this.listWorkData;
			this.listWork.itemRenderer = WorkSendMainItem;
		}

		private setUI() {
			let remainWorkNum: number = 0; // 剩余任务数量
			let refreshNum: number = 0;

			for (let i = 0; i < this.workInfo.length; i++) {
				if (this.workInfo[i].start_time == 0 && !this.workInfo[i].is_reward) remainWorkNum++;
				if (this.workInfo[i].start_time == 0 && this.workInfo[i].is_lock == false && !this.workInfo[i].is_reward) refreshNum++;
			}
			this.labelWorkNum.text = remainWorkNum + "/" + this.workNum;

			let finishCount: number = 0;
			for (let i = 0; i < this.workInfo.length; i++) {
				if (this.workInfo[i].is_reward == true) finishCount++;
			}
			this.labelEnd.visible = finishCount == this.workInfo.length;

			this.groupFresh.visible = !(remainWorkNum == 0);

			this.labelRefreshNum.text = (10 * refreshNum).toString();
		}

		private reFreshWork() {
			this.init();
		}

		private onBtnFresh() {
			let self = this;
			let arr = [];
			for (let i = 0; i < this.infoArr.length; i++) {
				if (this.infoArr[i].is_lock || this.infoArr[i].start_time != 0) continue;
				arr.push(this.infoArr[i].id);
			}
			if (arr.length == 0) {
				toast_warning("无可刷新任务！");
				return;
			}
			Game.PlayerInstanceSystem.RefreshSearchingReq(arr).then((value: message.RefreshSearchingResponse) => {
				self.reFreshWork();
			});
		}

		private freshLockState(ev: egret.Event) {
			let self = this;
			Game.PlayerInstanceSystem.LockSearchingReq(ev.data.id, ev.data.islock).then((value) => {
				self.reFreshWork();
				let data = self.listWorkData.getItemAt(ev.data.index) as WorkSendMainItemData;
				self.listWorkData.replaceItemAt(data, ev.data.index);
			});
		}

		private onBtnClose() {
			this.timer.stop();
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.update, this);
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

		private updateRes() {
			if (Game.PlayerInfoSystem.Coin > 100000) {
				if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
					this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
				} else {
					this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
				}
			} else {
				this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
			}
			if (Game.PlayerInfoSystem.Token > 100000) {
				if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
					this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
				} else {
					this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
				}
			} else {
				this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
			}
			let str = "";
			if (Game.PlayerInfoSystem.Power > 100000) {
				if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
					str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
				} else {
					str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
				}
			} else {
				str += Game.PlayerInfoSystem.Power.toString();
			}
			let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
			this.lbStrength.text = str_energy;
		}

		private onBtnAddGold() {
			loadUI(HelpGoldDialog).then((dialog: HelpGoldDialog) => {
				dialog.SetInfoList(true);
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnAddGemstone() {
			loadUI(PayMallScene).then((scene: PayMallScene) => {
				scene.show(UI.SHOW_FROM_TOP);
				scene.init(true);
			});
		}

		private onBtnAddStrength() {
			loadUI(HXH_HunterUserStrength).then((dialog: HXH_HunterUserStrength) => {
				dialog.SetInfo();
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}
	}
}