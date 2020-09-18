namespace zj {
/**
 * 主线任务弹窗
 * created by Lian Lei
 * 2019.03.20
 */
export class HXH_GrowUp extends Dialog {
	private btnClose: eui.Button;
	private labelMission: eui.Label;
	private labelState: eui.Label;
	private labelDes: eui.Label;
	private scrollerViewAttach: eui.Scroller;
	private listViewAttach: eui.List;
	private imgGet: eui.Image;
	private btnGet: eui.Button;
	private btnGo: eui.Button;

	private mission: message.MissionInfo;
	private mTable: TableMissionMain;
	private listViewAttachData: eui.ArrayCollection = new eui.ArrayCollection();

	public constructor() {
		super();
		this.skinName = "resource/skins/daily/HXH_GrowUpSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);

		this.setInfo();
	}

	/**
	 * 任务数据 任务表
	 */
	private setInfo() {
		this.mission = Game.PlayerMissionSystem.listForTask();
		this.mTable = Game.PlayerMissionSystem.itemMain(this.mission.missionId);
		let mIndex: number = Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);

		Device.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.main_mission_first, false);
		this.setTitle(this.mTable.name);
		let tb = Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
		this.setState(tb);
		this.setDes(this.mTable.description);
		this.setReward(this.mTable.reward_goods);

	}

	/**标题 */
	private setTitle(str: string) {
		this.labelMission.text = str;
	}

	/**状态 */
	private setState(tb) {
		let finish = tb.finish;
		this.imgGet.visible = finish;
		this.btnGo.visible = finish;
		this.btnGo.visible = !finish;

		let str = "(" + tb.isDo + "/" + tb.toDo + ")";
		if (finish) {
			str = TextsConfig.TextsConfig_Mission.completed;
			Device.SetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.main_mission_over_view, this.mission.missionId);
		}
		this.labelState.text = str;
	}

	/**描述 */
	private setDes(str: string) {
		this.labelDes.text = str;
	}

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

		this.listViewAttachData.removeAll();
		for (let i = 0; i < goods.length; i++) {
			let itemData = new Mail_AttachItemData();
			itemData.goodsId = goods[i][0];
			itemData.count = goods[i][1];
			this.listViewAttachData.addItem(itemData);
		}
		this.listViewAttach.dataProvider = this.listViewAttachData;
		this.listViewAttach.itemRenderer = Mail_AttachItem;
	}

	/**领取奖励 */
	private onBtnGet() {
		this.btnGet.enabled = false;
		Game.PlayerMissionSystem.ReqReward(this.mission.type, this.mission.subType)
			.then((value: message.MissionRewardResponse) => {
				this.close(UI.HIDE_TRAIL_OFF);
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(value.body.gameInfo.getGoods);
						dialog.setCB(() => {
							loadUI(HXH_GrowUp)
								.then((dialogB: HXH_GrowUp) => {
									dialogB.show(UI.SHOW_FILL_OUT);
								});
						});
						dialog.show(UI.SHOW_FROM_TOP);
					});
			})
			.catch(reason => {
				toast_warning(reason);
			});
		Game.EventManager.event(GameEvent.REFRESH_MAINCITY_BUBBLE);
	}

	/**跳转 */
	private onBtnGo() {
		this.btnGo.enabled = false;
		this.close(UI.HIDE_TRAIL_OFF);

		if (this.mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES) {
			Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)(this.mTable.condition);
		}
		else {
			Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)();
		}
	}

	private onBtnClose() {
		Game.EventManager.event(GameEvent.REFRESH_MAINCITY_BUBBLE);
		this.close(UI.HIDE_TRAIL_OFF);
	}
}
}