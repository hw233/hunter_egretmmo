namespace zj {
	/**
	 * @class 通行证主界面
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-16
	 */
	export class HXH_BattlePass extends Scene {
		private btnClose: eui.Button;
		private btnDetails: eui.Button;
		private btnCheck: eui.Button;
		private btnExpUp: eui.Button;
		private imgTip1: eui.Image;
		private imgTip2: eui.Image;
		private groupBtnItem: eui.Group;
		private btnTaskDaily: eui.Button;
		private btnTaskWeek: eui.Button;
		private btnTaskMonth: eui.Button;
		private imgTip3: eui.Image;
		private imgTip4: eui.Image;
		private imgTip5: eui.Image;
		private groupViewAdd: eui.Group;

		private timer: number;
		private battlePassGift: HXH_BattlePassGift;
		private battlePassMission: HXH_BattlePassMission;
		public static missionIndex: number = 1;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this);
			this.btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnExpUp, this);
			this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDetails, this);
			this.btnTaskWeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTaskWeek, this);
			this.btnTaskDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTaskDaily, this);
			this.btnTaskMonth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTaskMonth, this);
			Game.EventManager.on(GameEvent.UPDATE_BATTLEPASS_REDTIP, this.SetTips, this);
			Game.EventManager.on(GameEvent.PLAYER_PERMITLEVEL_CHANGE, this.setLevelUp, this);
			Game.EventManager.on(GameEvent.CLOSE_BATTLEPASS, this.close, this);
			this.init();
		}

		private setLevelUp(ev: egret.Event) {
			loadUI(HXH_BattlePassLvUp).then((dialog: HXH_BattlePassLvUp) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(ev.data);
			})
		}

		private init() {
			this.battlePassGift = null;
			this.battlePassMission = null;
			this.initUI();
			this.setButtonState();
			this.timer = egret.setInterval(this.RefreshInfo, this, 1000);
		}

		private initUI() {
			this.initUIOfItemsList();
		}

		private initUIOfItemsList() {
			this.battlePassGift = newUI(HXH_BattlePassGift);
			this.groupViewAdd.addChild(this.battlePassGift);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_GIFT);
			this.SetTips();

			this.groupBtnItem.scaleY = 0;
		}

		private SetTips() {
			// this.imgTip1.visible = Tips.GetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD);
			// this.imgTip2.visible = Tips.GetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION);
			let tip1: boolean = false;
			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0) { // 未购买高级通行证
				if (Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) tip1 = true;
			}
			else {
				if (Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length || Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) tip1 = true;
			}
			this.imgTip1.visible = tip1;
			let [tip3, tip4, tip5] = [this.missionComplete(TablePermitMission.Table()), this.missionComplete(Game.PlayerMissionSystem.GetBattlePassWeekMission()), this.missionComplete(Game.PlayerMissionSystem.GetBattlePassMonthMission())];
			this.imgTip2.visible = tip3 || tip4 || tip5;
			this.imgTip3.visible = tip3;
			this.imgTip4.visible = tip4;
			this.imgTip5.visible = tip5;
		}

		/**
		 * @description 判断通行证任务是否完成
		 * 
		 * @param itemList 任务表
		 */
		private missionComplete(itemList: Array<TableMissionItem> | { [key: string]: TablePermitMission }): boolean {
			if (itemList instanceof Array) {
				for (let i = 0; i < itemList.length; i++) {
					let mission: TableMissionType;
					for (const key in TableMissionType.Table()) {
						if (TableMissionType.Table().hasOwnProperty(key)) {
							const element = TableMissionType.Table()[key];
							if (itemList[i].id >= element.start_id && itemList[i].id <= element.end_id) {
								mission = element;
								break;
							}
						}
					}
					let tb = Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, itemList[i].id);
					if (tb.isDo >= tb.toDo && tb.finish) return true; // 可以领取
				}
				return false;
			}
			else if (itemList instanceof Object) {
				for (const key in itemList) {
					if (itemList.hasOwnProperty(key)) {
						const element = itemList[key];
						let isGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(element.id) != -1
						if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet) return true;
						if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1) return true;
						if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= element.value) return true;
					}
				}
				return false;
			}
			return false;
		}

		// info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1
		// info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= info.value

		private setButtonState() {
			this.btnCheck.enabled = false;
			this.btnExpUp.enabled = true;
		}

		private RefreshInfo() {
			let hour = Set.TimeFormatBeijing().getHours();
			let min = Set.TimeFormatBeijing().getMinutes();
			let sec = Set.TimeFormatBeijing().getSeconds();

			if (hour == 4 && min == 2 && sec == 0) {
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_GIFT);
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
			}
		}

		/**
		 * @description 场景进入栈顶
		 * @description 刚放进去时
		 * @description 上层场景弹出，该场景被弹到栈顶时
		 */
		public onEntryTopScene() {
			if (this.battlePassGift != null) Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_GIFT);
			if (this.battlePassMission != null) Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
		}

		private onBtnClose() {
			HXH_BattlePass.missionIndex = 1;
			this.close(UI.HIDE_TO_TOP);
		}

		private onBtnCheck() {
			if (this.battlePassMission != null) {
				this.groupViewAdd.removeChild(this.battlePassMission);
				this.battlePassMission = null;
			}

			this.battlePassGift = newUI(HXH_BattlePassGift);
			this.groupViewAdd.addChild(this.battlePassGift);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_GIFT);

			this.btnCheck.enabled = false;
			this.btnExpUp.enabled = true;
			egret.Tween.removeTweens(this.groupBtnItem);
			egret.Tween.get(this.groupBtnItem).to({ scaleY: 0 }, 300, egret.Ease.backIn);
			HXH_BattlePass.missionIndex = 1;
		}

		private onBtnExpUp() {
			if (this.battlePassGift != null) {
				this.groupViewAdd.removeChild(this.battlePassGift);
				this.battlePassGift = null;
			}

			this.battlePassMission = newUI(HXH_BattlePassMission);
			this.groupViewAdd.addChild(this.battlePassMission);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);

			this.btnCheck.enabled = true;
			this.btnExpUp.enabled = false;

			this.btnTaskDaily.enabled = false;
			this.btnTaskWeek.enabled = true;
			this.btnTaskMonth.enabled = true;

			egret.Tween.removeTweens(this.groupBtnItem);
			egret.Tween.get(this.groupBtnItem).to({ scaleY: 1 }, 300, egret.Ease.backOut);
		}

		private onBtnTaskDaily() {
			this.btnTaskDaily.enabled = false;
			this.btnTaskWeek.enabled = true;
			this.btnTaskMonth.enabled = true;
			HXH_BattlePass.missionIndex = 1;
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
		}

		private onBtnTaskWeek() {
			this.btnTaskWeek.enabled = false;
			this.btnTaskDaily.enabled = true;
			this.btnTaskMonth.enabled = true;
			HXH_BattlePass.missionIndex = 2;
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
		}

		private onBtnTaskMonth() {
			this.btnTaskMonth.enabled = false;
			this.btnTaskDaily.enabled = true;
			this.btnTaskWeek.enabled = true;
			HXH_BattlePass.missionIndex = 3;
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
		}

		private onBtnDetails() {
			loadUI(Common_RuleDialog).then((dialog: Common_RuleDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(RuleConfig.battlepass);
			});
		}
	}
}