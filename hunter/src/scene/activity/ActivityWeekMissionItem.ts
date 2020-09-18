namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-5-6
 * 
 * @class 赏金特训list子项
 */
export class ActivityWeekMissionItem extends eui.ItemRenderer {
	private imgFloor: eui.Image;
	private labelTitle: eui.Label;
	private listViewAward: eui.List;
	private imgGet: eui.Image;
	private btnGet: eui.Button;
	private imgShaDow: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityWeekMissionItemSkin.exml";
		this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		cachekeys(<string[]>UIResource["ActivityWeekMissionItem"], null);
	}

	protected dataChanged() {
		let data = this.data as ActivityWeekMissionItemData;
		this.setBtn(data);
		this.setInfoTask(data);
		this.setInfoAward(data);
	}
	private setBtn(data: ActivityWeekMissionItemData) {
		// let path = UIConfig.UIConfig_Novice[data.father.noviceType].getItem;
		// 	this.imgGet.source = cachekey(path);
		// 	let path1 = UIConfig.UIConfig_Novice[data.father.noviceType].floor;
		// 	this.imgFloor.source = cachekey(path1);
	}

	private setInfoTask(data: ActivityWeekMissionItemData) {
		let item = data.father.data[data.typeId - 1].dataInfo[data.index].reward_goods;
		let strText = data.father.data[data.typeId - 1].finish[data.index];
		let strTexts = data.father.data[data.typeId - 1].finishs[data.index];
		let missionId = data.father.data[data.typeId - 1].mission.missionId % 1000000 % 100 - 1;

		let state = 1;
		let novice1 = null;
		let novice2 = null;

		if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
			state = data.father.data[data.typeId - 1].state[data.index];
		} else {
			novice1 = Math.floor(strTexts / 10000);
			novice2 = data.father.missionProgress(strText, novice1);
			if (strText.length != 0) {
				if (novice2 >= strTexts % 10000 && data.index == missionId && !data.father.data[data.typeId - 1].mission.isFinish) {
					state = TableEnum.Enum.NoviceState.REWARD
				} else if (novice2 >= strTexts % 10000 && data.index < missionId || data.father.data[data.typeId - 1].mission.isFinish) {
					state = TableEnum.Enum.NoviceState.OVER;
				} else if (novice2 < strTexts % 10000 && data.index == missionId) {
					state = TableEnum.Enum.NoviceState.OPEN;
				} else {
					state = TableEnum.Enum.NoviceState.LOCK;
				}
			} else {
				if (data.index == 0) {
					state = TableEnum.Enum.NoviceState.OPEN;
				} else {
					state = TableEnum.Enum.NoviceState.LOCK;
				}
			}
		}
		let bShowShaDow = state == TableEnum.Enum.NoviceState.OVER;
		let bShowGet = state == TableEnum.Enum.NoviceState.OVER;
		let bReward = state == TableEnum.Enum.NoviceState.REWARD;
		let strTitle = data.father.data[data.typeId - 1].dataInfo[data.index].des;

		this.imgShaDow.visible = false;

		if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
			if (strText > strTexts) {
				strText = strTexts;
			}
			let str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, strText, strTexts);
			this.labelTitle.textFlow = Util.RichText(str);
		} else {
			novice1 = Math.floor(strTexts / 10000);
			novice2 = data.father.missionProgress(strText, novice1);
			if (novice2 > strTexts % 10000) {
				novice2 = strTexts % 10000;
			}
			this.labelTitle.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
		}

		if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
			if (state == TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {//领取
				this.btnGet.enabled = true;
				this.btnGet.visible = true;
				this.imgGet.visible = false;
				let path1 = UIConfig.UIConfig_Novice[1].get[0];
				let path2 = UIConfig.UIConfig_Novice[1].get[1];
				Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
				this.imgShaDow.visible = false;
			} else if (state == TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {//前往
				this.btnGet.enabled = true;
				this.btnGet.visible = true;
				this.imgGet.visible = false;
				let path1 = UIConfig.UIConfig_Novice[1].go[0];
				let path2 = UIConfig.UIConfig_Novice[1].go[1];
				Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
				this.imgShaDow.visible = false;
			} else if (state == TableEnum.Enum.NoviceState.OVER) { // 已领取
				this.btnGet.enabled = false;
				this.btnGet.visible = false;
				this.imgGet.visible = true;
				this.imgShaDow.visible = true;
			} else {
				this.btnGet.visible = false;
				this.imgGet.visible = false;
				this.imgShaDow.visible = true;
			}
		} else {
			if (state == TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {//领取
				this.btnGet.enabled = true;
				this.btnGet.visible = true;
				this.imgGet.visible = false;
				let path1 = UIConfig.UIConfig_Novice[1].get[0];
				let path2 = UIConfig.UIConfig_Novice[1].get[1];
				Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
				this.imgShaDow.visible = false;
			} else if (state == TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {//前往
				this.btnGet.enabled = true;
				this.btnGet.visible = true;
				this.imgGet.visible = false;
				let path1 = UIConfig.UIConfig_Novice[1].go[0];
				let path2 = UIConfig.UIConfig_Novice[1].go[1];
				Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
				this.imgShaDow.visible = false;
			} else if (state == TableEnum.Enum.NoviceState.OVER) {//已领取
				this.btnGet.enabled = false;
				this.btnGet.visible = false;
				this.imgGet.visible = true;
				this.imgShaDow.visible = true;
			} else {
				this.btnGet.visible = false;
				this.imgGet.visible = false;
				this.imgShaDow.visible = true;
			}
		}
	}

	private setInfoAward(data: ActivityWeekMissionItemData) {
		let itemInfo = data.father.data[data.typeId - 1].dataInfo[data.index].reward_goods;
		let array = new eui.ArrayCollection();
		for (let i = 0; i < itemInfo.length; i++) {
			let data = new ActivityNoviceItemItemData();
			data.index = i;
			data.itemInfo = itemInfo[i];
			data.father = this;
			array.addItem(data);
		}
		this.listViewAward.dataProvider = array;
		this.listViewAward.itemRenderer = ActivityNoviceItemItem;
	}

	private onBtnGet() {
		let data = this.data as ActivityWeekMissionItemData;
		let strText = data.father.data[data.typeId - 1].finish[data.index];
		let strTexts = data.father.data[data.typeId - 1].finishs[data.index];
		let missionId = data.father.data[data.typeId - 1].mission.missionId % 1000000 % 100 - 1;

		let state: number;

		if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
			state = data.father.data[data.typeId - 1].state[data.index];
		} else {
			let novice1 = Math.floor(strTexts / 10000);
			let novice2 = data.father.missionProgress(strText, novice1);
			if (strText.length != 0) {
				if (novice2 >= strTexts % 10000 && data.index == missionId) {
					state = TableEnum.Enum.NoviceState.REWARD;
				} else if (novice2 >= strTexts % 10000 && data.index < missionId) {
					state = TableEnum.Enum.NoviceState.OVER;
				} else if (novice2 < strTexts % 10000 && data.index == missionId) {
					state = TableEnum.Enum.NoviceState.OPEN;
				} else {
					state = TableEnum.Enum.NoviceState.LOCK;
				}
			} else {
				if (data.index == 0) {
					state = TableEnum.Enum.NoviceState.OPEN
				} else {
					state = TableEnum.Enum.NoviceState.LOCK;
				}
			}
		}
		if (state == TableEnum.Enum.NoviceState.REWARD) {
			this.reqReward();
		} else if (state == TableEnum.Enum.NoviceState.OVER) {
			return;
		} else {
			data.father.btnGo();
		}
	}


	private reqReward() {
		let data = this.data as ActivityWeekMissionItemData;
		let info = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
		Game.PlayerMissionSystem.missionReward(data.father.missionType, data.father.weekTable.mission_types[data.typeId - 1] % 10000)
			.then((gameInfo: message.GameInfo) => {
				let goods = Table.DeepCopy(gameInfo.getGoods);
				let hero = Table.FindR(goods, (k: number, v: message.GoodsInfo) => {
					return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
				})
				if (hero[0] != null) {
					loadUI(CommonGetGeneral)
						.then((dialog: CommonGetGeneral) => {
							dialog.setInfo(hero[0].goodsId, null, () => {
								loadUI(CommonGetDialog)
									.then((dialog: CommonGetDialog) => {
										dialog.init(goods);
										dialog.setCB(() => {
											data.father.setInfoReward();
										});
										dialog.show(UI.SHOW_FROM_TOP);
									});
							}, info);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				} else {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(goods);
							dialog.setCB(() => {
								data.father.setInfoReward();
							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
				data.father.setInfoData();
			})
			.catch((res) => {
				toast_success(res);
			})
	}

	public setInfoTag(typeId: number) {
		let data = this.data as ActivityWeekMissionItemData;
		data.typeId = typeId;
		this.setInfoTask(data);
		this.setInfoArrow(data);
		this.setInfoAward(data);
	}

	private setInfoArrow(data: ActivityWeekMissionItemData) {

	}
}
export class ActivityWeekMissionItemData {
	index: number;
	typeId: number;
	father: weekActBase;
}
}