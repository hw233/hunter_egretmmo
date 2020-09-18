namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-25
	 * 
	 * @class 新手狂欢list子项
	 */
	export class ActivityNoviceItem extends eui.ItemRenderer {
		public imgFloor: eui.Image;
		public labelTitle: eui.Label;
		public listViewAward: eui.List;
		public imgGet: eui.Image;
		public btnGet: eui.Button;
		public btnGet1: eui.Button;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityNoviceItem"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		}

		protected dataChanged() {
			let data = this.data as ActivityNoviceItemData;
			this.setInfoTask(data);
			this.setInfoAward(data);
		}

		private setInfoTask(data: ActivityNoviceItemData) {
			let item = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
			let strText = data.father.data[data.TypeId - 1].finish[data.index];
			// if (data.type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) {
			// 	strText = strText[strText.length - 1] || 0;
			// }
			let strTexts = data.father.data[data.TypeId - 1].finishs[data.index];
			let missionId = data.father.data[data.TypeId - 1].mission.missionId % 1000000 % 100 - 1;

			let state = 1;
			let novice1 = null;
			let novice2 = null;
			let type = data.type;
			let vis = (Helper.day()) >= data.father.btnIndex;
			if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX
			) {
				state = vis ? data.father.data[data.TypeId - 1].state[data.index] : TableEnum.Enum.NoviceState.LOCK;
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
				if (strText <= strTexts && data.index == missionId && !data.father.data[data.TypeId - 1].mission.isFinish) {
					state = TableEnum.Enum.NoviceState.REWARD
				} else if (strText <= strTexts && data.index <= missionId) {
					state = TableEnum.Enum.NoviceState.OVER;
				} else {
					state = TableEnum.Enum.NoviceState.OPEN;
				}
			} else {
				novice1 = strTexts >= 10000 ? Math.floor(strTexts / 10000) : Math.floor(strTexts % 10000);
				novice2 = data.father.missionProgress(strText, novice1);
				if (data.father.data[data.TypeId - 1].finish.length != 0) {
					if (novice2 >= strTexts % 10000 && !data.father.data[data.TypeId - 1].mission.isFinish && novice2 != 0 && data.index == missionId) {//
						state = TableEnum.Enum.NoviceState.REWARD
					} else if (novice2 >= strTexts % 10000 && data.index < missionId || data.father.data[data.TypeId - 1].mission.isFinish && novice2 != 0) {
						state = TableEnum.Enum.NoviceState.OVER;
					} else if (novice2 < strTexts % 10000 && vis && data.index == missionId) {//
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
			let strTitle = data.father.data[data.TypeId - 1].dataInfo[data.index].des;

			if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||// 累积啤酒次数
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY// 武将最大品质
			) {
				if (strText > strTexts) {
					strText = strTexts;
				}
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, strText, strTexts);
				this.labelTitle.textFlow = Util.RichText(str);
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX
			) {// 通过某一关流星街
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, (Math.floor(strText % 10000) || 0), (Math.floor(strTexts % 10000) || 0));
				this.labelTitle.textFlow = Util.RichText(str);
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE) {
				novice1 = Math.floor(strTexts / 10000);
				novice2 = data.father.missionProgress(strText, novice1);
				if (novice2 > strTexts % 10000) {
					novice2 = strTexts % 10000;
				}
				let novice3 = strTexts % 10000;
				let a = novice2 % 7 == 0 ? Math.floor(novice2 / 7) : Math.floor(novice2 / 7) + 1;
				let b = novice2 % 7 == 0 && novice2 != 0 ? 7 : novice2 % 7;
				let a1 = novice3 % 7 == 0 ? Math.floor(novice3 / 7) : Math.floor(novice3 / 7) + 1;
				let b1 = novice3 % 7 == 0 && novice3 != 0 ? 7 : novice3 % 7;
				this.labelTitle.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, a + "-" + b, a1 + "-" + b1)); //novice2, strTexts % 10000)
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
				novice1 = Math.floor(strTexts / 10000);
				novice2 = data.father.missionProgress(strText, novice1);
				this.labelTitle.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
			}
			// else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) {
			// 	novice1 = Math.floor(strTexts % 10000);
			// 	novice2 = strText;    //data.father.missionProgress(strText, novice1);
			// 	if (novice2 > novice1) {
			// 		novice2 = novice1;
			// 	}
			// 	this.labelTitle.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
			// } 
			else {
				novice1 = Math.floor(strTexts / 10000);
				novice2 = data.father.missionProgress(strText, novice1);
				if (novice2 > strTexts % 10000) {
					novice2 = strTexts % 10000;
				}
				this.labelTitle.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
			}

			if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||  // 累积啤酒次数
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||// 武将最大品质
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED || // 通过某一关流星街
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||// 流星街第四个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE || // 流星街第五个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX // 流星街第六个副本最大层
			) {
				if (state == TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {//领取 
					this.btnGet.enabled = true;
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					this.btnGet1.visible = false;
				} else if (state == TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {//前往   
					this.btnGet.enabled = true;
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					this.btnGet1.visible = true;
				} else if (state == TableEnum.Enum.NoviceState.OVER) { // 已领取
					this.btnGet.visible = false;
					this.btnGet1.visible = false;
					this.imgGet.visible = true;
				} else {
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					this.btnGet.enabled = false;
					this.btnGet1.visible = false;
				}
				//  else if (state == TableEnum.Enum.NoviceState.LOCK && data.index == missionId + 1) {//前往//
				// 	this.btnGet.enabled = true;
				// 	this.btnGet.visible = false;
				// 	this.imgGet.visible = false;
				// 	this.btnGet1.visible = true;
				// }
			} else {
				if (state == TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {//领取   
					this.btnGet.enabled = true;
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					this.btnGet1.visible = false;
				} else if (state == TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {//前往//
					this.btnGet.enabled = true;
					this.btnGet.visible = false;
					this.imgGet.visible = false;
					this.btnGet1.visible = true;
				} else if (state == TableEnum.Enum.NoviceState.OVER) {//已领取
					this.btnGet.enabled = false;
					this.btnGet.visible = false;
					this.imgGet.visible = true;
					this.btnGet1.visible = false;
				} else {
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					this.btnGet.enabled = false;
					this.btnGet1.visible = false;
				}
				// else if (state == TableEnum.Enum.NoviceState.LOCK && data.index == missionId + 1) {//前往//
				// 	this.btnGet.enabled = true;
				// 	this.btnGet.visible = false;
				// 	this.imgGet.visible = false;
				// 	this.btnGet1.visible = true;
				// } 
			}
		}

		private setInfoAward(data: ActivityNoviceItemData) {
			let itemInfo = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
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
			let data = this.data as ActivityNoviceItemData;
			let strText = data.father.data[data.TypeId - 1].finish[data.index];
			let strTexts = data.father.data[data.TypeId - 1].finishs[data.index];
			let missionId = data.father.data[data.TypeId - 1].mission.missionId % 1000000 % 100 - 1;

			let state: number;
			let type = data.type;
			if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED || // 通过某一关流星街
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||// 流星街第四个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE || // 流星街第五个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX // 流星街第六个副本最大层
			) {
				state = data.father.data[data.TypeId - 1].state[data.index];
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
				if (strText <= strTexts && data.index == missionId && !data.father.data[data.TypeId - 1].mission.isFinish) {
					state = TableEnum.Enum.NoviceState.REWARD
				} else if (strText <= strTexts && data.index <= missionId) {
					state = TableEnum.Enum.NoviceState.OVER;
				} else {
					state = TableEnum.Enum.NoviceState.OPEN;
				}
			}
			//  else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) {
			// 	if (strText % 10000 >= strTexts % 10000 && data.index == missionId) {
			// 		state = TableEnum.Enum.NoviceState.REWARD
			// 	} else if (strText % 10000 <= strTexts % 10000 && data.index < missionId) {
			// 		state = TableEnum.Enum.NoviceState.OVER;
			// 	} else {
			// 		state = TableEnum.Enum.NoviceState.OPEN;
			// 	}
			// }
			else {
				let novice1 = Math.floor(strTexts / 10000);
				let novice2 = data.father.missionProgress(strText, novice1);
				if ((typeof strText == "object" && strText.length != 0) || strText != 0) {
					if (novice2 >= strTexts % 10000) {// && data.index == missionId
						state = TableEnum.Enum.NoviceState.REWARD;
					} else if (novice2 >= strTexts % 10000 && data.index < missionId) {
						state = TableEnum.Enum.NoviceState.OVER;
					} else if (novice2 < strTexts % 10000) {//&& data.index == missionId
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
				data.father.btnGo(data.type);
			}
		}
		private reqReward() {
			let data = this.data as ActivityNoviceItemData;
			let info = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
			Game.PlayerMissionSystem.missionReward(data.father.missionType, data.type)
				.then((gameInfo: message.GameInfo) => {
					let a = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
					let goods: message.GoodsInfo[] = [];
					for (let i = 0; i < a.length; i++) {
						let v = a[i];
						let b = new message.GoodsInfo();
						b.goodsId = v[0];
						b.count = v[1];
						goods.push(b);
					}
					let hero = Table.FindR(goods, (k: number, v: message.GoodsInfo) => {
						return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
					})
					data.father.loadPmgressbarInfo();
					if (hero[0] != null) {
						loadUI(CommonGetGeneral)
							.then((dialog: CommonGetGeneral) => {
								dialog.setInfo(hero[0].goodsId, null, () => {
									loadUI(CommonGetDialog)
										.then((dialog: CommonGetDialog) => {
											dialog.init(goods);
											dialog.setCB(() => {
												// this.setInfoTask(this.data);
											})
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
									// this.setInfoTask(this.data);
								})
								dialog.show(UI.SHOW_FROM_TOP);
							});
					}
					data.father.initAfterSetType();
					// this.setInfoTask(this.data);
				})
				.catch((res) => {
					// toast_success(res);
				})
		}
	}
	export class ActivityNoviceItemData {
		index: number;
		TypeId: number;
		father: ActivityNovice;
		type: number;
	}
}