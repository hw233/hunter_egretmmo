namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-
	 * 
	 * @class 新手狂欢 强者之路 高手进阶 父类
	 */
	export class noviceBase extends Dialog {
		public imgbg: eui.Image;
		public btnClose: eui.Button;
		public listbtn: eui.List;
		public labelTime: eui.Label;
		public listViewTag: eui.List;
		public listViewItem: eui.List;
		public imgBar: eui.Image;
		public imgBarMask: eui.Image;
		public labelTag1: eui.Label;
		public labelTag2: eui.Label;
		public labelTag3: eui.Label;
		public labelTag4: eui.Label;
		public groupLight1: eui.Group;
		public imgBg1: eui.Image;
		public GoodsIcon1: eui.Image;
		public imgGet1: eui.Image;
		public groupLight2: eui.Group;
		public imgBg2: eui.Image;
		public GoodsIcon2: eui.Image;
		public imgGet2: eui.Image;
		public groupLight3: eui.Group;
		public imgBg3: eui.Image;
		public GoodsIcon3: eui.Image;
		public imgGet3: eui.Image;
		public groupLight4: eui.Group;
		public imgBg4: eui.Image;
		public GoodsIcon4: eui.Image;
		public imgGet4: eui.Image;

		public noviceType: number = 1;
		/**任务一1 任务二2 礼包3 */
		public typeId: number = 1;
		public procType: number;
		public missionType: number;
		public data: Array<{ mission: message.MissionInfo, typeInfo: TableMissionType, _ROW_ITEM: number, index: number, dataInfo: Array<TableMissionItem>, sort: number, lock: boolean, state: Array<number>, finishs: Array<any> | Array<Array<any>>, finish }>;;
		public tokenNow: number = 0;
		public tokenAll: number = 0;
		public sizeCount;
		public c: number;
		public array = new eui.ArrayCollection();
		public index: number = 3;
		public vislist: boolean = true;
		private imgBar1width;
		public TableEnumNoviceGift = {
			[0]: CommonConfig.missionnew_goods, [1]: CommonConfig.missionnew_reward_one, [2]: CommonConfig.missionnew_reward_two,
			[3]: CommonConfig.missionnew_reward_maqi, [4]: CommonConfig.missionnew_reward_kubi
		}
		public NoviceMissionType = {
			[1]: TableEnum.Enum.NoviceType0,
			[2]: TableEnum.Enum.NoviceType1,
			[3]: TableEnum.Enum.NoviceType2,
			[4]: TableEnum.Enum.NoviceTypeMAQI,
			[5]: TableEnum.Enum.NoviceTypeKUBI,
		}
		public type;
		public timenpc: Array<number> = [];
		public btnNpc: eui.Button;
		public update: number;
		public btnIndex: number = 1;
		public constructor() {
			super();
		}
		public init() {
			if (this.imgbg) {
				if (this.imgbg.width < UIManager.StageWidth) {
					this.imgbg.width = UIManager.StageWidth;
				}
			}
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.update = egret.setInterval(this.Update, this, 1000);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
				egret.Tween.removeTweens(this);
			}, this);
			egret.Tween.get(this).wait(10).call(() => {
				this.Update();
			})
		}

		public Update() {
			let infotime = Game.PlayerProgressesSystem.progressMap[this.procType].leftTime - Math.floor(egret.getTimer() / 1000);
			let day = Math.floor(infotime / 3600 / 24);
			let hour = Math.floor(infotime / 3600 % 24);
			let min = Math.floor(infotime / 60 % 60);
			let miao = Math.floor(infotime % 60);
			this.labelTime.textFlow = Util.RichText("<text>结束时间：</text><color>r:255,g:208,b:2</color><text>" + day + "</text><text>天</text><color>r:255,g:208,b:2</color><text>" + hour + "</text><text>:</text><color>r:255,g:208,b:2</color><text>" + min + "</text><text>:</text><color>r:255,g:208,b:2</color><text>" + miao + "</text>")
			this.setInfoData();
		}

		public setType(type: number) {
			this.noviceType = type;
			this.procType = TableEnum.Enum.TableEnumNovice[this.noviceType - 1];
			this.missionType = TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1];
			this.initAfterSetType();
		}

		public initAfterSetType() {
			this.setInfoData();
			this.loadBtnList();
			this.setList(this.typeId - 1);
			this.setInfoCost();
		}

		public setInfoData = () => {
			let thisOne = this;
			let data: Array<{ mission: message.MissionInfo, typeInfo: TableMissionType, _ROW_ITEM: number, index: number, dataInfo: Array<TableMissionItem>, sort: number, lock: boolean, state: Array<number>, finishs: Array<any> | Array<Array<any>>, finish }> = Table.initi(Game.PlayerMissionSystem.missionMap, (k: number, v: message.MissionInfo) => {
				if (v.type == this.missionType) {//&& this.isSubTypeCurType(v.subType)
					this.type = Game.PlayerMissionSystem.itemType(v.type, v.subType);//8//4
					let data_ = { mission: null, typeInfo: null, _ROW_ITEM: null, index: null, dataInfo: null, sort: null, lock: null, state: null, finishs: null, finish: null };
					data_.mission = v;
					data_.typeInfo = this.type;
					//计算任务数量
					data_._ROW_ITEM;
					while (true) {
						data_._ROW_ITEM = data_._ROW_ITEM + 1;
						let missionInfo = Game.PlayerMissionSystem.itemInfo(this.type.start_id + data_._ROW_ITEM);
						if (missionInfo == null) {
							break;
						}
					}
					data_.index = Table.Init(data_._ROW_ITEM, (i: number) => {
						return this.type.start_id + i;
					})
					data_.dataInfo = Table.Init(data_._ROW_ITEM, (i: number) => {
						return Game.PlayerMissionSystem.itemInfo(thisOne.type.start_id + i);
						// return i + 1;
					})
					data_.sort = Game.PlayerMissionSystem.itemSubType(this.missionType * 10000 + v.subType).sort;
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
				thisOne.c = (v.mission.missionId % 10) == 0 ? 10 : v.mission.missionId % 10; // 任务id(type1\2\4\5读type表，3\6读main表)  //mission =  message.MissionInfo
				let valu = v.mission.value;  //当前任务状态
				let cond = v.dataInfo[thisOne.c - 1].condition;
				let valGen = thisOne.missionProgress(v.mission.valueEx, Math.floor(v.dataInfo[thisOne.c - 1].condition / 10000));

				//是否开放
				let bLock = false;
				v.lock = bLock;
				//状态

				v.state = Table.Init(v._ROW_ITEM, (i: number) => {
					let type = v.mission.subType// thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
					if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
						type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
						type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
						type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
						type == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||
						type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE ||
						type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
						type == message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES ||
						type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER ||
						type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
						type == message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES ||
						type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK ||
						type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG ||
						type == message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG ||
						type == message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI ||
						type == message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG
					) {
						if ((i + 1) < thisOne.c) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) == thisOne.c && valu < cond) {
							return TableEnum.Enum.NoviceState.OPEN;
						} else if ((i + 1) == thisOne.c && valu >= cond && !v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.REWARD;
						} else if ((i + 1) == thisOne.c && valu >= cond && v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) > thisOne.c) {
							return TableEnum.Enum.NoviceState.LOCK;
						} else {
							return TableEnum.Enum.NoviceState.ERROR;
						}
					} else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
						type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
						type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX
					) {
						if ((i + 1) < thisOne.c) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) == thisOne.c && valu % 10000 < cond) {
							return TableEnum.Enum.NoviceState.OPEN;
						} else if ((i + 1) == thisOne.c && valu % 10000 >= cond && !v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.REWARD;
						} else if ((i + 1) == thisOne.c && valu % 10000 >= cond && v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) > thisOne.c) {
							return TableEnum.Enum.NoviceState.LOCK;
						} else {
							return TableEnum.Enum.NoviceState.ERROR;
						}
					} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
						if ((i + 1) < thisOne.c) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) == thisOne.c && valu > cond) {
							return TableEnum.Enum.NoviceState.OPEN;
						} else if ((i + 1) == thisOne.c && valu <= cond && !v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.REWARD;
						} else if ((i + 1) == thisOne.c && valu <= cond && v.mission.isFinish) {
							return TableEnum.Enum.NoviceState.OVER;
						} else if ((i + 1) > thisOne.c) {
							return TableEnum.Enum.NoviceState.LOCK;
						} else {
							return TableEnum.Enum.NoviceState.ERROR;
						}
					} else {
						if (data[Number(k)].mission.valueEx.length != 0) {
							let enum1 = TableEnum.Enum.NoviceState;
							if ((i + 1) < thisOne.c) {
								return enum1.OVER;
							} else if ((i + 1) == this.c && valGen < cond % 10000) {
								return enum1.OPEN;
							} else if ((i + 1) == this.c && valGen >= cond % 10000 && !data[Number(k)].mission.isFinish) {
								return enum1.REWARD;
							} else if ((i + 1) == this.c && valGen >= cond % 10000 && data[Number(k)].mission.isFinish) {
								return enum1.OVER;
							} else if ((i + 1) > thisOne.c) {
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
				data[Number(k)].finish = Table.Init(data[Number(k)]._ROW_ITEM, (i: number) => {
					let str: number | Array<number> = null;
					// let condition = data[Number(k)][4].dataInfo[i].condition;
					let type = data[Number(k)].mission.subType// thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
					let type1 = message.MissionSubType;
					if (type == type1.MISSION_SUB_TYPE_LOTTERY_BEER ||
						type == type1.MISSION_SUB_TYPE_GENERAL_QUALITY ||
						type == type1.MISSION_SUB_TYPE_WANTED ||
						type == type1.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
						type == type1.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
						type == type1.MISSION_SUB_TYPE_LADDER_NUMBER ||
						type == type1.MISSION_SUB_TYPE_LEAGUE_DONATE ||
						type == type1.MISSION_SUB_TYPE_EGG_TIMES ||
						type == type1.MISSION_SUB_TYPE_WANTED_HUNT ||
						type == type1.MISSION_SUB_TYPE_LADDER ||
						type == type1.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
						type == type1.MISSION_SUB_TYPE_USE_POWER ||
						type == type1.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
						type == type1.MISSION_SUB_TYPE_BUY_POWER ||
						type == type1.MISSION_SUB_TYPE_TOWER ||
						type == type1.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
						type == type1.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
						type == type1.MISSION_SUB_TYPE_GET_RUNES ||
						type == type1.MISSION_SUB_TYPE_GENERAL_BREAK ||
						type == type1.MISSION_SUB_TYPE_WANTED_FIVE ||
						type == type1.MISSION_SUB_TYPE_WANTED_FOUR ||
						type == type1.MISSION_SUB_TYPE_CARD_HONG ||
						type == type1.MISSION_SUB_TYPE_SEARCH_ZI ||
						type == type1.MISSION_SUB_TYPE_SEARCH_HONG ||
						type == type1.MISSION_SUB_TYPE_WANTED_SIX ||
						type == type1.MISSION_SUB_TYPE_CARD_ZI ||
						type == type1.MISSION_SUB_TYPE_CARD_CHENG ||
						type == type1.MISSION_SUB_TYPE_SEARCH_CHENG
					) {
						str = data[Number(k)].mission.value;
					} else if (type == type1.MISSION_SUB_TYPE_GENERAL_STAR ||
						type == type1.MISSION_SUB_TYPE_AWAKEN_TIME ||
						type == type1.MISSION_SUB_TYPE_CARD_NUM ||
						type == type1.MISSION_SUB_TYPE_CARD_UPLEVEL ||
						type == type1.MISSION_SUB_TYPE_CARD_FA_NUM ||
						type == type1.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
						type == type1.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
						type == type1.MISSION_SUB_TYPE_CARD_JIAN_LEVEL ||
						type == type1.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
						type == type1.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
						type == type1.MISSION_SUB_TYPE_END ||
						type == type1.MISSION_SUB_TYPE_ELITE_INSTANCE
					) {
						str = data[Number(k)].mission.valueEx;
					}
					return str;
				});

				data[Number(k)].finishs = Table.Init(data[Number(k)]._ROW_ITEM, (i: number) => {
					let str = 0;
					let str1 = 0;
					let condition = data[Number(k)].dataInfo[i].condition;
					let type = data[Number(k)].mission.subType// data[this.typeId - 1 + ((this.btnIndex - 1) * 2)].typeInfo.sub_type// thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
					let type1 = message.MissionSubType;
					// if (type == type1.MISSION_SUB_TYPE_LOTTERY_BEER ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_QUALITY ||
					// 	type == type1.MISSION_SUB_TYPE_WANTED ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_STAR ||
					// 	type == type1.MISSION_SUB_TYPE_AWAKEN_TIME ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_NUM ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_UPLEVEL ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_FA_NUM ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
					// 	type == type1.MISSION_SUB_TYPE_CARD_JIAN_LEVEL ||
					// 	type == type1.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
					// 	type == type1.MISSION_SUB_TYPE_ELITE_INSTANCE ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
					// 	type == type1.MISSION_SUB_TYPE_LADDER_NUMBER ||
					// 	type == type1.MISSION_SUB_TYPE_LEAGUE_DONATE ||
					// 	type == type1.MISSION_SUB_TYPE_EGG_TIMES ||
					// 	type == type1.MISSION_SUB_TYPE_WANTED_HUNT ||
					// 	type == type1.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
					// 	type == type1.MISSION_SUB_TYPE_USE_POWER ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
					// 	type == type1.MISSION_SUB_TYPE_BUY_POWER ||
					// 	type == type1.MISSION_SUB_TYPE_TOWER ||
					// 	type == type1.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
					// 	type == type1.MISSION_SUB_TYPE_LADDER ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
					// 	type == type1.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
					// 	type == type1.MISSION_SUB_TYPE_END ||
					// 	type == type1.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
					// 	type == type1.MISSION_SUB_TYPE_GET_RUNES ||
					// 	type == type1.MISSION_SUB_TYPE_GENERAL_BREAK
					// ) {
					str1 = condition;
					// } else {
					// console.log();
					// }
					return str1;
				})
			}

			thisOne.data = data;
			thisOne.setProcessBarData();

		}

		public setProcessBarData() {
			//计算领取元宝
			this.tokenNow = 0;
			this.tokenAll = 0;
			if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL || this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE) {
				for (let k in this.data) {
					if (this.data.hasOwnProperty(k)) {
						let data = this.data[Number(k)];
						for (let i in data.dataInfo) {
							if (data.dataInfo.hasOwnProperty(i)) {
								let reward = data.dataInfo[Number(i)];
								let rewardAll = reward.reward_goods[0][1];
								let rewardGet = data.state[Number(i)] == TableEnum.Enum.NoviceState.OVER && rewardAll || 0;
								this.tokenNow = this.tokenNow + rewardGet;
								this.tokenAll += rewardAll;
							}
						}
					}
				}
			} else if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO ||
				this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI ||
				this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI
			) {
				for (let k in this.data) {
					if (this.data.hasOwnProperty(k)) {
						let data = this.data[Number(k)];
						this.tokenAll += data._ROW_ITEM;
						for (let i in data.dataInfo) {
							if (data.dataInfo.hasOwnProperty(i)) {
								let reward = data.dataInfo[Number(i)];
								if (data.state[Number(i)] == TableEnum.Enum.NoviceState.OVER) {
									this.tokenNow = this.tokenNow + 1;
								}
							}
						}
					}
				}
			}
		}

		public missionProgress(tableCur, type: number) {
			let ret = 0;
			if (typeof tableCur == "number") {
				if (tableCur >= 10000) {
					if (Math.floor(tableCur / 10000) == type) {
						ret = tableCur % 10000
					}
				} else {
					if (Math.floor(tableCur % 10000) >= type) {
						ret = tableCur % 10000
					}
				}

			} else {
				for (let i in tableCur) {
					if (tableCur.hasOwnProperty(i)) {
						let v = tableCur[i];
						if (Math.floor(v / 10000) == type) {
							ret = v % 10000
						}
					}
				}
			}

			return ret;
		};

		public isSubTypeCurType(subType: number) {
			let a = [];
			for (let k in this.NoviceMissionType[this.noviceType]) {
				let v = this.NoviceMissionType[this.noviceType][Number(k)];
				a.push(v);
			}
			return Table.FindK(a, subType) != -1;
		}

		public loadBtnList() {
			// this.array.removeAll();
			// for (let i = 0; i < 3; i++) {
			// 	let data = new ActivityNoviceTagData();
			// 	data.index = i;
			// 	// data.father = this;
			// 	this.array.addItem(data);
			// }
			// this.listViewTag.dataProvider = this.array;
			// this.listViewTag.itemRenderer = ActivityNoviceTag;
			// this.listViewTag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListViewTag, this);
		}

		public SetInfoButton(index?: number) {
		}

		public onListViewTag(e: eui.ItemTapEvent) {
			// this.typeId = e.itemIndex + 1;
			this.array.refresh();
			this.setList(e.itemIndex);
		}

		public setList(type?: number) {
			// if (type != null) {
			// 	this.typeId = type + 1;
			// }
			// let array = new eui.ArrayCollection();
			// for (let i = 0; i < this.data[this.typeId - 1]._ROW_ITEM; i++) {
			// 	let data = new ActivityNoviceItemData();
			// 	data.index = i;
			// 	data.TypeId = 1;
			// 	// data.father = this;
			// 	array.addItem(data);
			// }
			// this.listViewItem.dataProvider = array;
			// this.listViewItem.itemRenderer = ActivityNoviceItem;
		}

		public setInfoCost() {
			let percent = this.tokenNow / this.tokenAll;

			let bFinish = Table.alltrue(this.data, (k, v) => {
				return (v.mission.missionId % 10 == v._ROW_ITEM && v.mission.isFinish)
			})

			let bReward = null;
			if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
				bReward = Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
			} else {
				bReward = Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1]) != -1;
			}
			let path = UIConfig.UIConfig_Novice[this.noviceType].gift;

			let bEffect = (bFinish && !bReward);
		}

		public btnGo(type1) {
			let type = type1 // this.data[this.typeId - 1 + ((this.btnIndex - 1) * 2)].typeInfo.sub_type;// this.NoviceMissionType[this.noviceType][this.typeId]
			if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {// 获得几星以上武将数量
				loadUI(HunterMainScene)
					.then((scene: HunterMainScene) => {
						scene.show(UI.SHOW_FROM_TOP)
					})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) {// 武将最大品质
				loadUI(HunterMainScene)
					.then((scene: HunterMainScene) => {
						scene.show(UI.SHOW_FROM_TOP)
					})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER) { // 累积啤酒次数
				loadUI(TavernScene)
					.then((scene: TavernScene) => {
						scene.show(UI.SHOW_FROM_TOP)
					})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED) {// 通过某一关流星街
				if (PlayerMissionSystem.FunOpenTo(FUNC.ARREST, true)) {
					loadUI(WantedSecondMeteorstanceScene)
						.then((dialog: WantedSecondMeteorstanceScene) => {
							dialog.Init(1);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME ||// 觉醒什么级猎人次数（级别*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||// 武将升星次数
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_AWAKEN || // 武将觉醒次数
				type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
				type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK //猎人突破
				) { // 猎人升几星几次（星级*10000+数量）
				loadUI(HunterMainScene)
					.then((scene: HunterMainScene) => {
						scene.show(UI.SHOW_FROM_TOP)
					})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM ||//// 获得什么颜色的卡片数量（颜色*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM ||//// 获得什么资质的发系卡片数量（资质*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM ||// 获得什么资质的坚系卡片数量（资质*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||// 流星街第四个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||// 流星街第五个副本最大层
				type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX// 流星街第六个副本最大层
			) {
				if (PlayerMissionSystem.FunOpenTo(FUNC.ARREST, true)) {
					loadUI(WantedSecondMeteorstanceScene)
						.then((dialog: WantedSecondMeteorstanceScene) => {
							dialog.Init(1);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL ||//// 卡片升几级几次（级别*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL ||//// 把几张发系卡片升到几级（等级*10000+数量）
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL//// 把几张坚系卡片升到几级（等级*10000+数量）
			) {
				if (PlayerMissionSystem.FunOpenTo(FUNC.POTATO, true)) {
					loadUI(CardMainScene)
						.then((dialog: CardMainScene) => {
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||//通关副本
				type == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE ||	// 精英副本
				type == message.MissionSubType.MISSION_SUB_TYPE_INSTANCE_SEARCH ||// 探索副本成功次数
				type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER) {// 消耗体力

				// loadUI(AdventureMapScene)
				// 	.then((scene: AdventureMapScene) => {
				// 		scene.show(UI.SHOW_FROM_TOP);
				// 	});
				SceneManager.instance.EnterAdventure();
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_TOWER) {// 普通爬塔最高层
				if (PlayerMissionSystem.FunOpenTo(FUNC.TOWER, true)) {
					loadUI(SkyAreanMainScene)
						.then((scene: SkyAreanMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.Init();
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER_NUMBER) {// 竞技场挑战次数
				if (Game.PlayerInfoSystem.BaseInfo.level < 8) {
					toast_warning("8级开启");
					return;
				}
				loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
					Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
						ArenaMainScene.roleFormationInfo = data;
						dialog.setInfo(data, () => {
						});
						dialog.show(UI.SHOW_FROM_TOP);
					});
				})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE ||
				type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE
			) {// 帮会捐献
				if (Game.PlayerInfoSystem.BaseInfo.level < 12) {
					toast_warning("12级开启");
					return;
				}
				if (Game.PlayerInfoSystem.LeagueId == 0) {
					loadUI(LeagueChooseScene)
						.then((scene: LeagueChooseScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init();
						});
				} else {
					loadUI(LeagueHomeScene)
						.then((scene: LeagueHomeScene) => {
							scene.init();
							scene.show(UI.SHOW_FROM_TOP);
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUY_POWER) { // 购买体力次数
				loadUI(HXH_HunterUserStrength)
					.then((dialog: HXH_HunterUserStrength) => {
						dialog.SetInfo();
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {// 格斗场
				if (Game.PlayerInfoSystem.BaseInfo.level < 8) {
					toast_warning("8级开启");
					return;
				}
				loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
					Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
						ArenaMainScene.roleFormationInfo = data;
						dialog.setInfo(data, () => {
						});
						dialog.show(UI.SHOW_FROM_TOP);
					});
				})
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES) {// 抓娃娃
				if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0) {
					toast_warning(TextsConfig.TextsConfig_Activity.Rank_Charge.over);
					return;
				}
				this.QueryIntegralReqBody_Visit()
					.then((data: any) => {
						loadUI(Activity_RandomBoomSence)
							.then((scene: Activity_RandomBoomSence) => {
								scene.Init();
								scene.show(UI.SHOW_FILL_OUT);
							});
					}).catch(reason => { });
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_END) {// 帮会捐献
				if (this.btnIndex == 6 && this.typeId == 1) {
					if (PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
						loadUI(WorkSendMain).then((scene: WorkSendMain) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
					}
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI ||  // 获得几张紫卡
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG || // 获得几张橙卡
				type == message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG// 获得几张红卡
			) {
				if (PlayerMissionSystem.FunOpenTo(FUNC.ARREST, true)) {
					loadUI(WantedSecondMeteorstanceScene)
						.then((dialog: WantedSecondMeteorstanceScene) => {
							dialog.Init(1);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_ZI ||  // 探索紫色品质几次
				type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG ||// 探索橙色品质几次
				type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_HONG// 探索红色品质几次
			) {
				if (PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
					loadUI(WorkSendMain).then((scene: WorkSendMain) => {
						scene.show(UI.SHOW_FROM_TOP);
					});
				}
			} else if (type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||  // 采果子
				type == message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES // 猜拳
			) {
				SceneManager.instance.EnterSceneZorkBoss();
			}
			this.onBtnClose();
		}
		public onBtnGift() {
			let bFinish = Table.alltrue(this.data, (k, v) => {
				return (v.mission.missionId % 10 == v._ROW_ITEM && v.mission.isFinish);
			})
			let goods = [];
			for (let k in this.TableEnumNoviceGift[this.noviceType - 1]) {
				if (this.TableEnumNoviceGift[this.noviceType - 1].hasOwnProperty(k)) {
					let v = this.TableEnumNoviceGift[this.noviceType - 1][k];
					let item = new message.GoodsInfo();
					item.goodsId = v[0];
					item.count = v[1];
					goods.push(item);
				}
			}
			let bReward = null;
			if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
				bReward = Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
			} else {
				bReward = Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1]) != -1;
			}
		}

		/**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
		public up() {
			// if (this.commonDesSkillvis == true) {                                                                      
			let dialogDrop = this.getChildByName("UI");
			if (dialogDrop) {
				this.removeChild(dialogDrop);
			}
			// this.commonDesSkillvis = false;
			// }
		}
		public typerEffect(obj, content: string = "", interval: number = 200, backFun: Function = null): void {
			var strArr: Array<any> = content.split("");
			var len: number = strArr.length;
			obj.text = "";
			this.timenpc = [];
			for (let i = 0; i < len; i++) {

				let timenum = egret.setTimeout(function () {
					obj.appendText(strArr[Number(this)]);
				}, i, interval * i);

				this.timenpc.push(timenum);
			}
		}

		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			let dialogDrop = this.getChildByName("UI");
			if (dialogDrop) {
				return;
			}
			let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
			if (PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
				(<CommonDesGeneral>commonDesSkill).reSetGeneral();
			}
			commonDesSkill.name = "UI";
			this.addChild(commonDesSkill);
		}

		public onBtnClose() {
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
			this.close(UI.HIDE_TO_TOP);
		}

		public Close() {
			egret.Tween.get(this).wait(300).call(() => {
				this.onBtnClose();
			})
		}
		//扭蛋机
		public QueryIntegralReqBody_Visit() {
			return new Promise((resolve, reject) => {
				let request = new message.QueryIntegralRequest();
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.QueryIntegralResponse>resp;
					console.log(response);
					if (response.header.result != 0) {
						return;
					}
					resolve(response);
					Game.PlayerRelateSystem.relationInfo();
					Game.PlayerRelateSystem.givepower();
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}
	}
}