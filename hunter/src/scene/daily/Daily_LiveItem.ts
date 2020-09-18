namespace zj {
	/**
	 * 日常任务item
	 * created by Lian Lei
	 * 2019.03.15
	 */
	export class Daily_LiveItem extends eui.ItemRenderer {
		private groupAll: eui.Group;
		private labelName: eui.Label;
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelAward: eui.Label;
		private btnGo: eui.Button;
		private btnDone: eui.Button;
		private btnCharge: eui.Button;
		private btnReward: eui.Button;
		private imgDone: eui.Image;
		private imgMask: eui.Image;
		private imgLock: eui.Image;
		private labelLevel: eui.Label;

		private indexId: number;
		private missionType: number;
		private _JumpByInstance: boolean;
		private father: Daily_Main;
		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Daily_LiveItemSkin.exml";
			cachekeys(<string[]>UIResource["Daily_LiveItem"], null);
			this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
			this.btnDone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDone, this);
			this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReward, this);
			this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCharge, this);

		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Daily_LiveItemData) {
			this.indexId = data.index;
			this.missionType = data.missionType;
			this.father = data.father;
			this._JumpByInstance = data._JumpByInstance;
			this.refreshInfo();
		}

		private refreshInfo() {
			this.setInfoState();
			this.setInfoName();
			this.setInfoReward();
		}

		/**按钮显示 */
		private setInfoState() {
			let mission: message.MissionInfo = Game.PlayerMissionSystem.missionMap[this.indexId];
			let state = Game.PlayerMissionSystem.itemComplete(this.indexId);
			let id: number = mission.type;
			let subId: number = mission.subType;
			let info: TableMissionType = Game.PlayerMissionSystem.itemType(id, subId);
			let strLevel: string = info.open_level > 0 ?
				(Helper.StringFormat(TextsConfig.TextsConfig_Daily.lock, info.open_level)) :
				(Helper.StringFormat(TextsConfig.TextsConfig_Daily.inst, Game.PlayerInstanceSystem.Set(info.open_instance).Stage));

			// 累计消费特殊处理 不配到表里 此处会是坑
			let bShowGo: boolean = !(id == message.MissionType.MISSION_TYPE_DAILY && subId == message.MissionSubType.MISSION_SUB_TYPE_ADD_CHARGE);
			let bMonth: boolean = subId == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH || subId == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH;
			let bCharge: boolean = bMonth && ((mission.value >> 31) == 0);
			let bReward: boolean = bMonth && ((mission.value >> 31) == 1);

			this.btnDone.visible = (state == TableEnum.EnumDailyLive.finished && !bMonth);
			this.btnGo.visible = (state == TableEnum.EnumDailyLive.unfinished && !bMonth && bShowGo && !this._JumpByInstance);
			this.btnCharge.visible = (state == TableEnum.EnumDailyLive.unfinished && !bMonth && bCharge);
			this.btnReward.visible = (state == TableEnum.EnumDailyLive.finished && bMonth && bReward);
			this.imgDone.visible = (state == TableEnum.EnumDailyLive.rewarded);
			this.imgMask.visible = (state == TableEnum.EnumDailyLive.unOpened);
			this.imgLock.visible = (state == TableEnum.EnumDailyLive.unOpened);
			this.labelLevel.visible = (state == TableEnum.EnumDailyLive.unOpened);
			this.labelLevel.text = strLevel;
		}

		/**描述 已完成 完成条件 */
		private setInfoName() {
			let mission: message.MissionInfo = Game.PlayerMissionSystem.missionMap[this.indexId];
			let tbl: TableMissionItem = Game.PlayerMissionSystem.itemInfo(mission.missionId);
			let todo: number = tbl.condition;
			let isdo: number = yuan3(mission.value >= tbl.condition, tbl.condition, mission.value);
			let strName: string = Helper.StringFormat(tbl.des + "(%d/%d)", isdo, todo);

			// VIP工资特殊处理
			if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LICENCE_DAILY_REWARD) {
				strName = tbl.des;
			}
			else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH) {
				if ((mission.value >> 31) == 0) {
					strName = Helper.StringFormat(TextsConfig.TextsConfig_Daily.token, tbl.des, mission.value, CommonConfig.month_normal_activity_token);
				}
				else {
					let day = ((mission.value << 1) >> 1);
					strName = Helper.StringFormat(TextsConfig.TextsConfig_Daily.month, tbl.des, day, CommonConfig.month_days_duration);
				}
			}
			else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH) {
				if ((mission.value >> 31) == 0) {
					strName = Helper.StringFormat(TextsConfig.TextsConfig_Daily.token, tbl.des, mission.value, CommonConfig.month_senior_activity_token)
				}
				else {
					let day = ((mission.value << 1) >> 1);
					strName = Helper.StringFormat(TextsConfig.TextsConfig_Daily.month, tbl.des, day, CommonConfig.month_days_duration)
				}
			}

			this.imgIcon.source = cachekey(tbl.path, this);
			this.labelName.text = strName;
			cachekey(tbl.path, this);
		}

		/**奖励列表 */
		private setInfoReward() {
			let mission: message.MissionInfo = Game.PlayerMissionSystem.missionMap[this.indexId];
			let tbl: TableMissionItem = Game.PlayerMissionSystem.itemInfo(mission.missionId);

			let goods = [];
			for (let i = 0; i < tbl.reward_goods.length; i++) {
				goods.push([]);
			}

			for (let i = 0; i < tbl.reward_goods.length; i++) {
				let v = tbl.reward_goods[i];
				if (goods.length == 1) {
					goods[i].push(v[0], v[1]);
				}
				else {
					for (let j = 0; j < tbl.reward_goods[i].length; j++) {
						goods[i].push(v[j]);
					}
				}
			}

			if (Number(tbl.reward_active) > 0) {
				goods.push([]);
				goods[tbl.reward_goods.length].push(0, Number(tbl.reward_active));
			}

			this.listAwardData.removeAll();
			for (let i = 0; i < goods.length; i++) {
				let itemData = new Daily_AwardItemData();
				itemData.goodsId = goods[i][0];
				itemData.count = goods[i][1];
				itemData.Ffather = this.father;
				itemData.father = this;
				itemData.type = itemData.CurState.daily_live;
				this.listAwardData.addItem(itemData);
			}
			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Daily_AwardItem;
		}

		private setInfoGet() {
			let moveFun = () => {
				egret.Tween.get(this.groupAll)
					.call(() => {
						if (Game.PlayerInfoSystem.BaseInfo.level > Game.PlayerInfoSystem.baseInfo_pre.level) {
							TipManager.LevelUp();
						}
					})
					.to({ x: this.x + this.width + 100 }, 500, egret.Ease.backInOut)
					.to({ x: 0 }, 0, egret.Ease.backInOut).wait(10)
					.call(() => {
						this.data.father.setInfo();
					});
				if (Game.TeachSystem.curPart != -1 && Game.TeachSystem.curPart != 0 && Teach.teachingNow == false) {
					this.btnGo.visible = true;
				}
				else {
					this.btnGo.visible = false;
				}
			}
			this.imgDone.visible = true;
			this.btnDone.visible = false;
			this.btnGo.visible = false;
			this.btnCharge.visible = false;
			this.btnReward.visible = false;
			egret.Tween.get(this.imgDone).to({ scaleX: 3, scaleY: 3 }, 0)
				.to({ scaleX: 0.9, scaleY: 0.9 }, 150)
				.to({ scaleX: 1, scaleY: 1 }, 150)
				.call(() => {
					moveFun();
				});
		}

		private onBtnCharge() {
			// loadUI(Vip_Main)
			// 	.then((dialog: Vip_Main) => {
			// 		SetInfoActive(index)
			// 		dialog.show(UI.SHOW_FROM_TOP);
			// 	});
		}

		private onBtnReward() {
			let type: number = Game.PlayerMissionSystem.missionMap[this.indexId].type;
			let subType: number = Game.PlayerMissionSystem.missionMap[this.indexId].subType;

			Game.PlayerMissionSystem.ReqReward(type, subType)
				.then((value: message.MissionRewardResponse) => {
					Game.PlayerInstanceSystem.canSyncLevel = false;
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(value.body.gameInfo.getGoods)
							dialog.show(UI.SHOW_FROM_TOP);
						});
				})
				.catch((reason) => {
					toast_warning(Helper.GetErrorString(reason));
				});
		}

		private onBtnGo() {
			let info = Game.PlayerMissionSystem.missionMap[this.indexId];
			this.father.close();
			if (Game.TeachSystem.curPart != -1 && Teach.teachingNow) {
				return;
			}
			else {
				Game.PlayerMissionSystem.getMission(info.type, info.subType)();
			}
		}

		private onBtnDone() {
			let info = Game.PlayerMissionSystem.missionMap[this.indexId];
			Game.PlayerMissionSystem.ReqReward(info.type, info.subType).then((value: message.MissionRewardResponse) => {
				Game.PlayerInstanceSystem.canSyncLevel = false;
				loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
					dialog.init(value.body.gameInfo.getGoods)
					dialog.setCB(() => {
						this.setInfoGet();
					});
					dialog.show(UI.SHOW_FROM_TOP);
				});
			}).catch((reason) => {
				toast_warning(Helper.GetErrorString(reason));
			});
		}
	}

	export class Daily_LiveItemData {
		index: number;
		missionType: number;
		_JumpByInstance: boolean;
		father: Daily_Main;
	}
}