namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-5-6
	 * 
	 * @class 猎人特训父类
	 */
	export class weekActBase extends Scene {
		public SpriteTitle: eui.Image;
		public SpriteNpc: eui.Image;
		public SpriteTitleGift: eui.Image;
		public LabelFreeAwardNum: eui.BitmapLabel;
		public ButtonGetFree: eui.Button;
		public SpriteFreeAwardTips: eui.Image;
		public NodeFreeAward: eui.Group;
		public TableViewTag: eui.List;
		public TableViewItem: eui.List;
		public ButtonClose: eui.Button;
		public labelTime: eui.Label;
		public labelTime1: eui.Label;
		public labelTime2: eui.Label;
		public labelTime3: eui.Label;
		public imgbg: eui.Image;
		/**猎人特训类型 */
		public noviceType: number = 1;
		private typeId: number = 1;
		public weekTable: TableMissionWeek;
		private payAward: {
			goods: Array<{ id: number, count: number }>,
			canBuyTimes: number,
			token: number,
			buyTimes: number,
			id: number,
		}[];
		private freeAward: {
			goods: Array<{ id: number, count: number }>,
			canBuyTimes: number,
			token: number,
			buyTimes: number,
			id: number,
		};
		public data: Array<{
			mission: message.MissionInfo,
			typeInfo: TableMissionType,
			_ROW_ITEM: number,
			index: number,
			dataInfo: Array<TableMissionItem>,
			sort: number, lock: boolean,
			state: Array<number>,
			finishs: Array<any> | Array<Array<any>>,
			finish: number | Array<number>
		}>
		public missionType: number;
		private update: number = -1;
		private update1: number = -1;
		private update2: number = -1;
		private update3: number = -1;
		private updatetime: number = -1;
		private cb: Function;
		private cb1: Function;
		private cb2: Function;
		private cb3: Function;
		public constructor() {
			super();
			if (this.imgbg) {
				if (this.imgbg.width < UIManager.StageWidth) {
					this.imgbg.width = UIManager.StageWidth;
				}
			}
			this.init();
		}

		public init() {

		}

		public SetType(type: number) {
			this.noviceType = type;
			this.weekTable = Game.PlayerMissionSystem.itemMissionWeek(type);
			this.payAward = Game.PlayerMissionSystem.getWeekAwardPay(this.noviceType, 0);
			this.freeAward = Game.PlayerMissionSystem.getWeekAwardPay(this.noviceType, 1)[0];
			this.ButtonGetFree.enabled = (this.freeAward.canBuyTimes - this.freeAward.buyTimes > 0);
			this.SpriteFreeAwardTips.visible = (this.freeAward.canBuyTimes - this.freeAward.buyTimes > 0);
			this.LabelFreeAwardNum.text = ("x" + this.freeAward.goods[0].count);
			this.missionType = message.MissionType.MISSION_TYPE_WEEK;

			this.initAfterSetType();
		}

		private initAfterSetType() {
			//设置活动底部时间
			let leftTime = Game.PlayerMissionSystem.missionActive.missionWeekStart + this.weekTable.duration * 3600 * 24 - Game.Controller.curServerTime;
			let day = Math.floor(leftTime / 3600 / 24)
			let hour = Math.floor(leftTime / 3600 % 24)
			let min = Math.floor(leftTime / 60 % 60)
			this.labelTime.textFlow = Util.RichText("<text>距离活动结束还有</text><color>r:255,g:208,b:2</color><text>" + day + "</text><text>天</text><color>r:255,g:208,b:2</color><text>" + hour + "</text><text>小时</text><color>r:255,g:208,b:2</color><text>" + min + "</text><text>分</text>")
			this.labelTime1.visible = false;
			this.labelTime2.visible = false;
			this.labelTime3.visible = false;

			this.setInfoData();
			this.loadListViewTag();
			this.setList();
			this.setInfoType();
			this.setSelectType();
			this.updatetime = egret.setInterval(this.setProcessTime, this, 0);
		}

		/**任务list */
		private setList() {
			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.data[this.typeId - 1]._ROW_ITEM; i++) {
				let data = new ActivityWeekMissionItemData();
				data.index = i;
				data.typeId = this.typeId;
				data.father = this;
				array.addItem(data);
			}
			this.TableViewItem.dataProvider = array;
			this.TableViewItem.itemRenderer = ActivityWeekMissionItem;
		}

		/**按钮list */
		private loadListViewTag() {
			let array = new eui.ArrayCollection();
			for (let i = 0; i < 4; i++) {
				let data = new ActivityWeekMissionTagData();
				data.index = i;
				data.father = this;
				array.addItem(data);
			}
			this.TableViewTag.dataProvider = array;
			this.TableViewTag.itemRenderer = ActivityWeekMissionTag;
		}

		public SetInfoItem() {
			this.cb1 = () => {
				for (let i = 0; i < this.TableViewItem.dataProvider.length; i++) {
					let item = this.TableViewItem.getElementAt(i) as ActivityWeekMissionItem;
					if (item != null) {
						item.setInfoTag(this.typeId);
						if (i == 3) {
							egret.clearInterval(this.update1);
							this.update1 = -1;
							return;
						}
					}
				}
			}
			this.update1 = egret.setInterval(this.Update1, this, 0);
		}

		public setInfoType() {
			this.cb = () => {
				for (let i = 0; i < 4; i++) {
					let item = this.TableViewTag.getElementAt(i) as ActivityWeekMissionTag;
					if (item != null) {
						item.setInfoTag();
						if (i == 3) {
							egret.clearInterval(this.update);
							this.update = -1;
							return;
						}
					}
				}
			}
			this.update = egret.setInterval(this.Update, this, 0);
		}

		public setSelectType(tag?: number) {
			if (tag != null) {
				tag += 1;
			}
			this.typeId = tag || this.typeId || 1;
			this.cb2 = () => {
				for (let i = 0; i < 4; i++) {
					let item = this.TableViewTag.getElementAt(i) as ActivityWeekMissionTag;
					if (item != null) {
						item.setSelect(item.data.index + 1 == this.typeId)
						if (i == 3) {
							egret.clearInterval(this.update2);
							this.update2 = -1;
							return;
						}
					}
				}
			}
			this.update2 = egret.setInterval(this.Update2, this, 0);
		}

		private Update() {
			this.cb();
		}

		private Update1() {
			this.cb1();
		}

		private Update2() {
			this.cb2();
		}

		private Update3() {
			this.cb3();
		}

		public SetInfoButton(tag: number) {
			if (this.typeId != 4 && tag == 3) {
				this.setSelectType(tag);
				this.setListAward()
				this.NodeFreeAward.visible = false;
				this.SpriteTitleGift.visible = true;
			} else if (this.typeId == 4 && tag != 3) {
				this.setSelectType(tag)
				this.setList()
				this.NodeFreeAward.visible = true;
				this.SpriteTitleGift.visible = false;
			} else {
				this.setSelectType(tag)
				this.setInfoItem()
			}
		}

		private setListAward() {
			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.payAward.length; i++) {
				let data = new ActivityWeekMissionGiftItemData();
				data.index = i;
				data.payAward = this.payAward[i];
				data.father = this;
				array.addItem(data);
			}
			this.TableViewItem.dataProvider = array;
			this.TableViewItem.itemRenderer = ActivityWeekMissionGiftItem;
		}

		public setInfoItem() {
			this.cb3 = () => {
				for (let i = 0; i < 5; i++) {
					let item = this.TableViewItem.getElementAt(i) as ActivityWeekMissionItem;
					if (item != null) {
						item.setInfoTag(this.typeId);
						if (i == 4) {
							egret.clearInterval(this.update3);
							this.update3 = -1;
							return;
						}
					}
				}
			}
			this.update3 = egret.setInterval(this.Update3, this, 0);
		}

		/**子项调刷新 */
		public setInfoReward() {
			this.setInfoData();
			this.setInfoType();
			this.setInfoItem();
		}

		/**一直刷新活动的时间 */
		private setProcessTime() {
			//设置活动底部时间
			let leftTime = Game.PlayerMissionSystem.missionActive.missionWeekStart + this.weekTable.duration * 3600 * 24 - Game.Controller.curServerTime;
			let day = Math.floor(leftTime / 3600 / 24)
			let hour = Math.floor(leftTime / 3600 % 24)
			let min = Math.floor(leftTime / 60 % 60)

			this.labelTime1.text = day.toString();
			this.labelTime2.text = hour.toString();
			this.labelTime3.text = min.toString();
		}

		public setInfoData() {
			let thisOne = this;
			let a = [];
			for (let i = 0; i < 3; i++) {
				for (var k in Game.PlayerMissionSystem.missionMap) {
					if (Game.PlayerMissionSystem.missionMap.hasOwnProperty(k)) {
						var v = Game.PlayerMissionSystem.missionMap[k];
						if (this.weekTable.mission_types[i] == Number(k)) {
							a.push({
								index: Number(k),
								value: v
							});
						}
					}
				}

			}
			let data: Array<{ mission: message.MissionInfo, typeInfo: TableMissionType, _ROW_ITEM: number, index: number, dataInfo: Array<TableMissionItem>, sort: number, lock: boolean, state: Array<number>, finishs: Array<any> | Array<Array<any>>, finish: number | Array<number> }> =
				Table.initi(a, (k, v) => {
					if (this.isSubTypeCurType(Number(v.index))) {
						let type = Game.PlayerMissionSystem.itemSubType(Number(v.index));
						let data_ = { mission: null, typeInfo: null, _ROW_ITEM: null, index: null, dataInfo: null, sort: null, lock: null, state: null, finishs: null, finish: null };
						data_.mission = v.value;
						data_.typeInfo = type;
						//计算任务数量
						data_._ROW_ITEM = 0;
						while (true) {
							data_._ROW_ITEM = data_._ROW_ITEM + 1;
							let missionInfo = Game.PlayerMissionSystem.itemInfo(type.start_id + data_._ROW_ITEM);
							if (missionInfo == null) {
								break;
							}
						}
						data_.index = Table.Init(data_._ROW_ITEM, (i: number) => {
							return type.start_id + i;
						})
						data_.dataInfo = Table.Init(data_._ROW_ITEM, (i: number) => {
							return Game.PlayerMissionSystem.itemInfo(type.start_id + i);
							// return i + 1;
						})
						data_.sort = Table.FindK(this.weekTable.mission_types, v.index);
						return data_;
					} else {
						return null;
					}
				});

			data.sort((a, b) => {
				return a.sort - b.sort;
			});

			for (let k in data) {
				let v = data[Number(k)];
				let now = v.mission.missionId % 10;
				let value = v.mission.value;
				let condition = v.dataInfo[now - 1].condition;
				let valueGen = this.missionProgress(v.mission.valueEx, Math.floor(v.dataInfo[now - 1].condition / 10000));

				//是否开放
				v.lock = false;
				//状态
				v.state = Table.Init(v._ROW_ITEM, (i: number) => {
					if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(this.weekTable.mission_types[k])) {
						if ((i + 1) < now) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) == now && value < condition) {
							return TableEnum.Enum.NoviceState.OPEN;
						} else if ((i + 1) == now && value >= condition && !v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.REWARD;
						} else if ((i + 1) == now && value >= condition && v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) > now) {
							return TableEnum.Enum.NoviceState.LOCK;
						} else {
							return TableEnum.Enum.NoviceState.ERROR;
						}
					} else {
						if (v.mission.valueEx.length != 0) {
							let enum1 = TableEnum.Enum.NoviceState;
							if ((i + 1) < now) {
								return enum1.OVER;
							} else if ((i + 1) == now && valueGen < condition % 10000) {
								return enum1.OPEN;
							} else if ((i + 1) == now && valueGen >= condition % 10000 && !v.mission.isFinish) {
								return enum1.REWARD;
							} else if ((i + 1) == now && valueGen >= condition % 10000 && v.mission.isFinish) {
								return enum1.OVER;
							} else if ((i + 1) > now) {
								return enum1.LOCK
							} else {
								return enum1.ERROR;
							}
						} else {
							return TableEnum.Enum.NoviceState.OPEN;
						}
					}
				})

				//进度文字
				v.finish = Table.Init(v._ROW_ITEM, (i: number) => {
					let str: number | Array<number> = null;
					if (Game.PlayerMissionSystem.itemMissionWeekValNormalType(this.weekTable.mission_types[k])) {
						str = v.mission.value
					} else {
						str = v.mission.valueEx
					}
					return str;
				});

				v.finishs = Table.Init(v._ROW_ITEM, (i: number) => {
					return v.dataInfo[i].condition;
				})

			}
			this.data = data;
		}

		public missionProgress(tableCur, type: number) {
			let ret = 0;
			for (let i in tableCur) {
				if (tableCur.hasOwnProperty(i)) {
					let v = tableCur[i];
					if (Math.floor(v / 10000) == type) {
						ret = v % 10000
					}
				}
			}
			return ret;
		};

		private isSubTypeCurType(index: number) {
			return Table.FindK(this.weekTable.mission_types, index) != -1;
		}

		public btnGetFree() {
			this.MissionWeekMallReqBody(this.freeAward.id)
				.then((getGoods: message.GoodsInfo[]) => {
					this.freeAward.buyTimes += 1;
					let goods = Table.DeepCopy(getGoods);
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
											dialog.show(UI.SHOW_FROM_TOP);
										});
								}, this);
								dialog.show(UI.SHOW_FROM_TOP);
							});
					} else {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(goods);
								dialog.show(UI.SHOW_FROM_TOP);
							});
					}
					let vis = (this.freeAward.canBuyTimes - this.freeAward.buyTimes > 0)
					this.ButtonGetFree.enabled = vis;
					this.SpriteFreeAwardTips.visible = vis;

				}).catch(() => {

				});
		}

		public MissionWeekMallReqBody(id: number) {
			return new Promise((resolve, reject) => {
				let request = new message.MissionWeekMallRequest();
				request.body.index = id;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.MissionWeekMallResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body.gameInfo.getGoods);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false, true);
			});
		}

		/**子项点击跳转 */
		public btnGo() {
			let call = Game.PlayerMissionSystem.itemMissionWeekJump(this.weekTable.mission_types[this.typeId - 1]);
			if (call != null) {
				this.btnClose();
				call();
			} else {
				this.btnClose();
			}
		}

		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			let ui = this.getChildByName("UI");
			if (ui) {
				return;
			}
			let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
			if (PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
				(<CommonDesGeneral>commonDesSkill).reSetGeneral();
			}
			commonDesSkill.name = "UI"
			this.addChild(commonDesSkill);
		}

		/**抬起移除奖励详情界面 */
		public up() {
			let ui = this.getChildByName("UI");
			if (ui) {
				this.removeChild(ui);
			}
		}

		public btnClose() {
			if (this.update != -1) {
				egret.clearInterval(this.update);
			}
			if (this.update1 != -1) {
				egret.clearInterval(this.update1);
			}
			if (this.update2 != -1) {
				egret.clearInterval(this.update2);
			}
			if (this.update3 != -1) {
				egret.clearInterval(this.update3);
			}
			egret.clearInterval(this.updatetime);
			this.close(UI.HIDE_TO_TOP);
		}
	}
}