namespace zj {
	let WORK_QUALITY = {
		[1]: ["ui_instance_search_IconWrodsCard1_png", "ui_instance_search_board_renwu_1_png"],   // 绿
		[2]: ["ui_instance_search_IconWrodsCard1_png", "ui_instance_search_board_renwu_1_png"],   // 绿
		[3]: ["ui_instance_search_IconWrodsCard2_png", "ui_instance_search_board_renwu_2_png"],   // 蓝
		[4]: ["ui_instance_search_IconWrodsCard2_png", "ui_instance_search_board_renwu_2_png"],   // 蓝
		[5]: ["ui_instance_search_IconWrodsCard3_png", "ui_instance_search_board_renwu_3_png"],  // 紫
		[6]: ["ui_instance_search_IconWrodsCard3_png", "ui_instance_search_board_renwu_3_png"],  // 紫
		[7]: ["ui_instance_search_IconWrodsCard4_png", "ui_instance_search_board_renwu_4_png"],  // 橙
		[8]: ["ui_instance_search_IconWrodsCard4_png", "ui_instance_search_board_renwu_4_png"],  // 橙
		[9]: ["ui_instance_search_IconWrodsCard5_png", "ui_instance_search_board_renwu_5_png"],  // 红
		[10]: ["ui_instance_search_IconWrodsCard5_png", "ui_instance_search_board_renwu_5_png"]  // 红
	}
	/**
	 * @class 工作派遣Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-08
	 */
	export class WorkSendMainItem extends eui.ItemRenderer {
		private imgBoard: eui.Image;
		private imgQuality: eui.Image;
		private labelDes: eui.Label;
		private btnUnlock: eui.Button;
		private btnLock: eui.Button;
		private btnGetAward: eui.Button;
		private btnChooleHero: eui.Button;
		private groupSpeedFinish: eui.Group;
		private btnSpeedFinish: eui.Button;
		private labelCostJewel: eui.Label;
		private groupProgress: eui.Group;
		private imgProgressBar: eui.Image;
		private labelProgress: eui.Label;
		private groupCondition: eui.Group;
		private imgCondition1: eui.Image;
		private imgCondition2: eui.Image;
		private imgCondition3: eui.Image;
		private imgCondition4: eui.Image;
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;

		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();
		private condition: { [key: string]: number } = {};
		private workInfo: message.InstanceSearch;
		private remainTime: number; // 剩余时间
		private time: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/WorkSendMainItemSkin.exml";
			cachekeys(<string[]>UIResource["WorkSendMainItem"], null);
			this.btnLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLock, this);
			this.btnUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnLock, this);
			this.btnGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetAward, this);
			this.btnChooleHero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChooleHero, this);
			this.btnSpeedFinish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSpeedFinish, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: WorkSendMainItemData) {
			if (data.workInfo == null) return;
			this.workInfo = data.workInfo;

			this.imgBoard.source = cachekey(WORK_QUALITY[data.workInfo.index][1], this);
			this.imgQuality.source = cachekey(WORK_QUALITY[data.workInfo.index][0], this);
			this.labelDes.text = TableWorkSend.Item(data.workInfo.des_id).work_des;

			this.listAwardData.removeAll();
			for (let i = 0; i < data.workInfo.goodInfos.length; i++) {
				let itemData = new WorkSendAwardItemData();
				itemData.goodsInfo = data.workInfo.goodInfos[i];
				this.listAwardData.addItem(itemData);
			}
			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = WorkSendAwardItem;

			this.btnGetAward.visible = false;
			this.btnLock.visible = !data.islock
			this.btnUnlock.visible = data.islock;
			this.btnChooleHero.visible = true;
			this.groupSpeedFinish.visible = false;
			this.groupProgress.visible = false;

			this.setConditionPos();

			if (this.workInfo.start_time != 0) this.setWorkStartUI();
		}

		private setWorkStartUI() {
			this.time = Game.Controller.curServerTime - this.workInfo.start_time;
			this.remainTime = this.workInfo.time - this.time;
			let percent = (this.workInfo.time - this.remainTime) / this.workInfo.time;
			let num = CommonConfig.speed_search_comsume_token(this.remainTime);
			this.labelCostJewel.text = num.toString();
			if (this.remainTime <= 0) {
				this.btnGetAward.visible = true;
				this.btnChooleHero.visible = false;
				this.groupSpeedFinish.visible = false;
				this.groupProgress.visible = true;
				this.imgProgressBar.width = 122;
				this.labelProgress.text = "完成";

			}
			else {
				if (this.remainTime > this.workInfo.time) this.remainTime = this.workInfo.time;
				this.btnGetAward.visible = false;
				this.btnChooleHero.visible = false;
				this.groupSpeedFinish.visible = true;
				this.groupProgress.visible = true;
				this.imgProgressBar.width = 122 * percent;
				this.labelProgress.text = Helper.GetTimeStr(this.remainTime, false);
			}
		}

		private setConditionPos() {
			this.condition = {};
			for (let i = 1; i <= 4; i++) (this[`imgCondition${i}`] as eui.Image).visible = false;
			for (let [k, v] of HelpUtil.GetKV(this.workInfo)) {
				if (k == "general_aptitude" && v != 0) this.condition["GENERAL_APTITUDE"] = v;
				if (k == "general_star" && v != 0) this.condition["GENERAL_STAR"] = v;
				if (k == "general_type" && v.length != 0) {
					for (let i = 0; i < v.length; i++) this.condition["GENERAL_TYPE" + (i + 1)] = v[i];
				}
			}
			let conditions = Object.keys(this.condition);
			let i: number = 1;
			for (const key of conditions) {
				(this[`imgCondition${i}`] as eui.Image).visible = true;
				(this[`imgCondition${i}`] as eui.Image).source = cachekey(this.workInfo.start_time == 0 ? zj[key][this.condition[key]][0] : zj[key][this.condition[key]][1], this);
				i++;
			}
		}

		private onBtnLock() { // 锁定任务
			Game.EventManager.event(GameEvent.RERESH_WORKLOCK_STATE, { islock: true, id: this.workInfo.id, index: this.data.index });
			this.btnLock.visible = this.data.islock;
			this.btnUnlock.visible = !this.data.islock;
		}

		private onBtnUnLock() { // 解锁任务
			if (this.workInfo.start_time != 0) { // 已经开始的任务不可解锁
				toast_warning("工作状态不可解锁！");
				return;
			}
			Game.EventManager.event(GameEvent.RERESH_WORKLOCK_STATE, { islock: false, id: this.workInfo.id, index: this.data.index });
			this.btnLock.visible = this.data.islock;
			this.btnUnlock.visible = !this.data.islock;
		}

		private onBtnGetAward() {
			let self = this;
			Game.PlayerInstanceSystem.RewardSearchingReq(this.workInfo.id).then((value: message.RewardSearchingResponse) => {
				loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
					dialog.init(value.body.gameInfo.getGoods);
					dialog.show(UI.SHOW_FILL_OUT);
					dialog.setCB(() => { Game.EventManager.event(GameEvent.WORK_END_REFRESH); });
				});
			});
		}

		private onBtnChooleHero() {
			loadUI(WorkSend_SelectHero).then((dialog: WorkSend_SelectHero) => {
				dialog.init(this.data.workInfo, this.itemIndex);
				dialog.show(UI.SHOW_FILL_OUT);
			});
		}

		private onBtnSpeedFinish() {
			let self = this;
			Game.PlayerInstanceSystem.SpeedSearchingReqBody(this.workInfo.id).then((value: message.SpeedSearchingResponse) => {
				Game.EventManager.event(GameEvent.WORK_END_REFRESH);
			});
		}
	}
	export class WorkSendMainItemData {
		workInfo: message.InstanceSearch;
		index: number;
		islock: boolean;
	}
}