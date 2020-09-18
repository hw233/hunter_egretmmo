namespace zj {
	/**
	 * @class 通行证主界面任务UI Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-19
	 */
	export class HXH_BattlePassMissionItem extends eui.ItemRenderer {
		private labelMission: eui.Label;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.BitmapLabel;
		private btnToDo: eui.Button;
		private labelMissionNum: eui.Label;
		private imgGet: eui.Image;

		private id: number;
		private infoPermit: TablePermitMission;
		private infoMission: TableMissionItem;
		private type: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassMissionItemSkin.exml";
			cachekeys(<string[]>UIResource["HXH_BattlePassMissionItem"], null);
			this.btnToDo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnToDo, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: HXH_BattlePassMissionItemData) {
			this.id = data.id;
			this.type = data.type;
			if (data.type == 1) {
				this.infoMission = null;
				this.infoPermit = data.info as TablePermitMission;
				let itemSet = PlayerItemSystem.Set(this.infoPermit.reward_goods[0]) as any;
				this.labelMission.text = data.id + "." + this.infoPermit.des;
				this.labelMissionNum.text = Game.PlayerMissionSystem.missionActive.activeScore + "/" + this.infoPermit.value;
				this.labelNum.text = data.info.reward_goods[1].toString();
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.labelMissionNum.visible = this.infoPermit.value != 0;
				this.SetButtonState1(this.infoPermit);
			}
			else if (data.type == 2 || data.type == 3) {
				this.infoPermit = null;
				this.infoMission = data.info as TableMissionItem;
				let mission: TableMissionType;
				for (const key in TableMissionType.Table()) {
					if (TableMissionType.Table().hasOwnProperty(key)) {
						const element = TableMissionType.Table()[key];
						if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
							mission = element;
							break;
						}
					}
				}

				let itemSet = PlayerItemSystem.Set(data.info.reward_goods[0][0]) as any;
				this.labelMission.text = (data.id + 1) + "." + data.info.des;
				let tb = Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);
				this.labelMissionNum.text = tb.isDo + "/" + tb.toDo;
				this.labelNum.text = data.info.reward_goods[0][1].toString();
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.labelMissionNum.visible = true;
				this.SetButtonState2(tb);
			}
			// let itemSet = PlayerItemSystem.Set(data.info.reward_goods[0]) as any;
			// this.labelMission.text = data.id + "." + data.info.des;
			// this.labelMissionNum.text = Game.PlayerMissionSystem.missionActive.activeScore + "/" + data.info.value;
			// this.labelNum.text = data.info.reward_goods[1].toString();
			// this.imgIcon.source = cachekey(itemSet.Path, this);
			// this.imgFrame.source = cachekey(itemSet.Frame, this);
			// this.labelMissionNum.visible = data.info.value != 0;


		}

		private SetButtonState1(info: TablePermitMission) {
			let isGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(info.id) != -1

			// 判断按钮状态
			if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && isGet) {
				this.btnToDo.visible = false;
				this.imgGet.visible = true;
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet) {
				this.btnToDo.visible = true;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissGetRewardNor, UIConfig.UIConfig_BattlePass.passMissGetRewardSel, UIConfig.UIConfig_BattlePass.passMissGetRewardSel);
				this.imgGet.visible = false;
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && isGet) {
				this.btnToDo.visible = false;
				this.imgGet.visible = true;
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissFinishedNor, UIConfig.UIConfig_BattlePass.passMissFinishedSel, UIConfig.UIConfig_BattlePass.passMissFinishedSel) // 去完成
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissGetRewardNor, UIConfig.UIConfig_BattlePass.passMissGetRewardSel, UIConfig.UIConfig_BattlePass.passMissGetRewardSel) // 领取
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && isGet) {
				this.btnToDo.visible = false;
				this.imgGet.visible = true;
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore < info.value) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissFinishedNor, UIConfig.UIConfig_BattlePass.passMissFinishedSel, UIConfig.UIConfig_BattlePass.passMissFinishedSel) // 去完成
			}
			else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= info.value) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissGetRewardNor, UIConfig.UIConfig_BattlePass.passMissGetRewardSel, UIConfig.UIConfig_BattlePass.passMissGetRewardSel) // 领取
			}
			else {
				this.btnToDo.visible = true;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissFinishedNor, UIConfig.UIConfig_BattlePass.passMissFinishedSel, UIConfig.UIConfig_BattlePass.passMissFinishedSel) // 去完成
			}
		}

		private SetButtonState2(tb) {
			if (tb.isDo >= tb.toDo && tb.finish) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissGetRewardNor, UIConfig.UIConfig_BattlePass.passMissGetRewardSel, UIConfig.UIConfig_BattlePass.passMissGetRewardSel) // 领取
			}
			else if (tb.isDo >= tb.toDo && !tb.finish) {
				this.btnToDo.visible = false;
				this.imgGet.visible = true;
			}
			else if (tb.isDo < tb.toDo) {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissFinishedNor, UIConfig.UIConfig_BattlePass.passMissFinishedSel, UIConfig.UIConfig_BattlePass.passMissFinishedSel) // 去完成
			}
			else {
				this.btnToDo.visible = true;
				this.imgGet.visible = false;
				Set.ButtonBackgroud(this.btnToDo, UIConfig.UIConfig_BattlePass.passMissFinishedNor, UIConfig.UIConfig_BattlePass.passMissFinishedSel, UIConfig.UIConfig_BattlePass.passMissFinishedSel) // 去完成
			}
		}

		private onBtnToDo() {
			if (this.type == 1 && this.infoPermit != null) {
				let isGet = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward, function (k, v) { return v == this.id; });
				if (this.infoPermit.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
					loadUI(HXH_BattlePassPay).then((dialog: HXH_BattlePassPay) => {
						dialog.show(UI.SHOW_FROM_TOP);
					});
				}
				else if (this.infoPermit.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && Game.PlayerMissionSystem.missionActive.activeScore < this.infoPermit.value) {
					if (PlayerMissionSystem.FunOpenTo(FUNC.DAILY, true)) {
						// Game.EventManager.event(GameEvent.CLOSE_BATTLEPASS);
						loadUI(Daily_Main).then((dialog: Daily_Main) => {
							dialog.show(UI.SHOW_FILL_OUT);
							dialog.hideBackGround();
						});
					}
				}
				else {
					this.ContendQueryListReqData();
				}
			}
			else if ((this.type == 2 || this.type == 3) && this.infoMission != null) {
				let mission: TableMissionType;
				for (const key in TableMissionType.Table()) {
					if (TableMissionType.Table().hasOwnProperty(key)) {
						const element = TableMissionType.Table()[key];
						if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
							mission = element;
							break;
						}
					}
				}
				let tb = Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);
				if (tb.isDo >= tb.toDo && tb.finish) {
					this.GetRewardReqData(this.infoMission);
				}
				else {
					let info = Game.PlayerMissionSystem.missionMap[mission.index];
					Game.EventManager.event(GameEvent.CLOSE_BATTLEPASS);
					Game.PlayerMissionSystem.getMission(info.type, info.subType)();
				}
			}
		}

		private ContendQueryListReqData() {
			let req = new message.RewardPermitMissionRequest();
			req.body.id = this.infoPermit.id;
			Game.Controller.send(req, this.ContendQueryListReqData_Visit, null, this, false);
		}

		private ContendQueryListReqData_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.RewardPermitMissionResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}

			this.SetButtonState1(this.infoPermit);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REDTIP);
			toast_success(TextsConfig.TextsConfig_Adviser.adviser_success);
		}

		private GetRewardReqData(info: TableMissionItem) {
			let mission: TableMissionType;
			for (const key in TableMissionType.Table()) {
				if (TableMissionType.Table().hasOwnProperty(key)) {
					const element = TableMissionType.Table()[key];
					if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
						mission = element;
						break;
					}
				}
			}
			let req = new message.MissionRewardRequest();
			req.body.type = mission.type
			req.body.subType = mission.sub_type;
			Game.Controller.send(req, this.GetRewardReqData_Visit, null, this, false);
		}

		private GetRewardReqData_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.MissionRewardResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REDTIP);
			let mission: TableMissionType;
			for (const key in TableMissionType.Table()) {
				if (TableMissionType.Table().hasOwnProperty(key)) {
					const element = TableMissionType.Table()[key];
					if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
						mission = element;
						break;
					}
				}
			}
			let tb = Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);

			this.SetButtonState2(tb);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REDTIP);
			toast_success(TextsConfig.TextsConfig_Adviser.adviser_success);
		}
	}

	export class HXH_BattlePassMissionItemData {
		id: number;
		info: TablePermitMission | TableMissionItem;
		type: number;
	}
}