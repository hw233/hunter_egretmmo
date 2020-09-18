namespace zj {
	/**
	 * 成就任务Item
	 * created by Lian Lei
	 * 2019.03.19
	 */
	export class Daily_AchieveItem extends eui.ItemRenderer {
		private groupAll: eui.Group;
		private groupFrame: eui.Group;
		private btnGet: eui.Group;
		private labelName: eui.Label;
		private labelContent: eui.Label;
		private imgBar: eui.Image;
		private labelCount: eui.Label;
		private scrollerViewAward: eui.Scroller;
		private listViewAward: eui.List;
		private imgAward1: eui.Image;
		private imgDone: eui.Image;
		private imgGet: eui.Image;
		private imgMask: eui.Image;
		private imgLock: eui.Image;
		private labelLevel: eui.Label;
		private groupGet: eui.Group;
		private imgScroMask: eui.Image;

		private indexId: number;
		private lock: Array<any> = [];
		private complete: Array<any> = [];
		private saveIndexId: number;
		private saveMissionId: number;
		private listViewAwardData: eui.ArrayCollection = new eui.ArrayCollection();
		private rectMask: eui.Rect;

		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Daily_AchieveItemSkin.exml";
			this.groupGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			cachekeys(<string[]>UIResource["Daily_AchieveItem"], null);
			this.init();
		}

		private init() {
			this.lock = [this.labelLevel, this.imgMask, this.imgLock];
			this.complete = [this.imgAward1, this.listViewAward, this.labelCount];
			this.scrollerViewAward.mask = this.imgScroMask;
			this.imgBar.mask = this.rectMask;
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Daily_AchieveItemData) {
			this.indexId = data.indexId;
			this.refreshInfo();
		}

		private refreshInfo() {
			if (this.saveIndexId != null &&
				this.saveMissionId != null &&
				this.saveIndexId == this.indexId &&
				this.saveMissionId != Game.PlayerMissionSystem.missionMap[this.indexId].missionId) {
				this.setInfoCome();
			}
			else if (this.saveIndexId != null && this.saveMissionId != null && this.saveIndexId != this.indexId) {
				this.setInfoNew();
			}
			else {
				this.setInfoMission();
			}

			this.saveIndexId = this.indexId;
			this.saveMissionId = Game.PlayerMissionSystem.missionMap[this.indexId].missionId;
		}

		private setInfoCome() {
			this.setInfoMission();
			egret.Tween.get(this).to({ x: this.x + this.width }, 500, egret.Ease.backInOut);
		}

		private setInfoNew() {
			this.setInfoMission();
		}

		private setInfoGet = () => {
			egret.Tween.get(this.groupAll)
				.to({ x: this.x + this.width }, 500, egret.Ease.backInOut)
				.to({ x: 0 }, 500, egret.Ease.backInOut)
				.call(() => {
					this.data.father.setInfo();
				});

		}

		private setInfoMission() {
			let mission: message.MissionInfo = Game.PlayerMissionSystem.missionMap[this.indexId];
			let tbl: TableMissionItem = Game.PlayerMissionSystem.itemInfo(mission.missionId);
			let tblType: TableMissionType = Game.PlayerMissionSystem.itemType(mission.type, mission.subType);
			// let isLock = tblType.open_level > Game.PlayerInfoSystem.BaseInfo.level;
			let [isdo, todo, isLock, isOver, percent] = Game.PlayerMissionSystem.itemComplete(this.indexId);
			let isNotGet: boolean;

			if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR) {
				isNotGet = (isdo == todo && !mission.isFinish && tblType.open_level <= Game.PlayerInfoSystem.BaseInfo.level);
			}
			else {
				isNotGet = (isdo >= todo && !mission.isFinish && tblType.open_level <= Game.PlayerInfoSystem.BaseInfo.level);
			}

			let strName: string = Helper.StringFormat("%s", tbl.name);
			let strDes: string = Helper.StringFormat("%s", yuan3(isOver, TextsConfig.TextsConfig_Daily.over, tbl.des));
			let strDo: string = Helper.StringFormat("%d/%d", isdo, todo);
			let strLock: string = Helper.StringFormat(TextsConfig.TextsConfig_Daily.lock, tblType.open_level);

			// this.imgBar.width = 422 * percent;
			this.rectMask.width = 422 * percent;

			this.labelName.text = strName;
			this.labelContent.text = strDes;
			this.labelCount.text = strDo;
			this.imgDone.visible = isOver;
			this.lock[0].text = strLock;
			this.groupGet.touchEnabled = isNotGet;
			this.imgGet.visible = isNotGet;

			for (let i = 0; i < this.lock.length; i++) {
				this.lock[i].visible = isLock;
			}

			for (let i = 0; i < this.complete.length; i++) {
				this.complete[i].visible = !isOver;
			}

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

			this.listViewAwardData.removeAll();
			for (let i = 0; i < goods.length; i++) {
				let itemData = new Daily_AwardItemData();
				itemData.goodsId = goods[i][0];
				itemData.count = goods[i][1];
				itemData.father = this;
				itemData.Ffather = this.data.father;
				itemData.type = itemData.CurState.daily_achieve;
				this.listViewAwardData.addItem(itemData);
			}
			this.listViewAward.dataProvider = this.listViewAwardData;
			this.listViewAward.itemRenderer = Daily_AwardItem;
		}

		private onBtnGet() {
			let mission: message.MissionInfo = Game.PlayerMissionSystem.missionMap[this.indexId];
			let tbl: TableMissionItem = Game.PlayerMissionSystem.itemInfo(mission.missionId);
			let tblType: TableMissionType = Game.PlayerMissionSystem.itemType(mission.type, mission.subType);
			
			let [isdo, todo, isLock, isOver, percent] = Game.PlayerMissionSystem.itemComplete(this.indexId);
			let isNotGet: boolean;

			if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR) {
				isNotGet = (isdo == todo && !mission.isFinish && tblType.open_level <= Game.PlayerInfoSystem.BaseInfo.level);
			}
			else {
				isNotGet = (isdo >= todo && !mission.isFinish && tblType.open_level <= Game.PlayerInfoSystem.BaseInfo.level);
			}
			
			if (!isNotGet) return;
			
			Game.PlayerMissionSystem.ReqReward(mission.type, mission.subType)
				.then((value: message.MissionRewardResponse) => {
					Game.PlayerInstanceSystem.canSyncLevel = false;
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(value.body.gameInfo.getGoods)
							dialog.setCB(() => {
								this.setInfoGet();
							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
				})
				.catch((reason) => {
					// toast_warning(Helper.GetErrorString(reason));
				});
		}
	}

	export class Daily_AchieveItemData {
		indexId: number;
		father: Daily_Main;
	}
}