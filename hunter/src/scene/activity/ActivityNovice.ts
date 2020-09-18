namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-25
	 * 
	 * @class 新手狂欢
	 */
	export class ActivityNovice extends noviceBase {
		public imgbg: eui.Image;
		public btnClose: eui.Button;
		public listbtn: eui.List;
		public labelTime: eui.Label;
		public listViewTag: eui.List;
		public listViewItem: eui.List;
		public imgBar: eui.Image;
		public imgBarMask: eui.Image;
		public imgbg1: eui.Image;
		public labelTag1: eui.Label;
		public imgbg2: eui.Image;
		public labelTag2: eui.Label;
		public imgbg3: eui.Image;
		public labelTag3: eui.Label;
		public imgbg4: eui.Image;
		public labelTag4: eui.Label;
		public groupLight1: eui.Group;
		public imgBg1: eui.Image;
		public GoodsIcon1: eui.Image;
		public imgGet1: eui.Image;
		public labelCont1: eui.Label;
		public groupLight2: eui.Group;
		public imgBg2: eui.Image;
		public GoodsIcon2: eui.Image;
		public imgGet2: eui.Image;
		public labelCont2: eui.Label;
		public groupLight3: eui.Group;
		public imgBg3: eui.Image;
		public GoodsIcon3: eui.Image;
		public imgGet3: eui.Image;
		public labelCont3: eui.Label;
		public groupLight4: eui.Group;
		public imgBg4: eui.Image;
		public GoodsIcon4: eui.Image;
		public imgGet4: eui.Image;
		public labelCont4: eui.Label;
		public imglabelBg: eui.Image;
		public labeljindu: eui.Label;
		public imgyiwancheng: eui.Image;

		/**按钮列表数据源 */
		public array: eui.ArrayCollection = new eui.ArrayCollection();
		/**顶部按钮列表数据源 */
		public array1: eui.ArrayCollection = new eui.ArrayCollection();
		/**第几天*/
		public btnIndex: number = 1;
		/** */
		public missionType: number;
		public data: Array<{ mission: message.MissionInfo, typeInfo: TableMissionType, _ROW_ITEM: number, index: number, dataInfo: Array<TableMissionItem>, sort: number, lock: boolean, state: Array<number>, finishs: Array<any> | Array<Array<any>>, finish }>;
		public noviceType = TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL;
		public missionGift = [];
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceSkin.exml";
			this.imgBar.mask = this.imgBarMask;
			//虚拟布局
			this.listViewTag.useVirtualLayout = false;
			super.setType(this.noviceType);
			super.init();
			this.init();
			for (let i = 1; i <= 7; i++) {
				let a = [];
				for (let j = 1; j <= 4; j++) {
					a.push(TableMissionGift.Table()[(j + "0" + i)]);
				}
				this.missionGift.push(a);
			}

		}

		public init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.groupLight1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight1, this);
			this.groupLight2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight2, this);
			this.groupLight3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight3, this);
			this.groupLight4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight4, this);
			this.loadBtnList();
			this.setBtnList();
			this.setList(1);
			this.loadPmgressbarInfo();
		}

		/**加载头部礼包类型按钮 */
		public loadBtnList() {
			this.array1.removeAll();
			for (let i = 0; i < 3; i++) {
				let data = new ActivityNoviceTagData();
				data.index = i;
				data.father = this;
				this.array1.addItem(data);
			}
			this.listViewTag.dataProvider = this.array1;
			this.listViewTag.itemRenderer = ActivityNoviceTag;
			this.listViewTag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListViewTag, this);
		}

		public setType(a) {

		}

		/**任务列表list */
		public setList(type?: number) {
			if (type != 2) {
				let array = new eui.ArrayCollection();
				let a = (index, array) => {
					let length = this.data[index - 1].dataInfo.length;//this.typeId - 1 + ((this.btnIndex - 1) * 2)
					for (let i = 0; i < length; i++) {
						let data = new ActivityNoviceItemData();
						data.index = i;
						data.TypeId = index;
						data.type = this.data[index - 1].typeInfo.sub_type;
						data.father = this;
						array.addItem(data);
					}
				}
				if (this.btnIndex == 1 && this.typeId == 1) {
					a(1, array);
				} else if (this.btnIndex == 1 && this.typeId == 2) {
					a(2, array);
				} else if (this.btnIndex == 2 && this.typeId == 1) {
					a(3, array);
				} else if (this.btnIndex == 2 && this.typeId == 2) {
					a(4, array);
					a(5, array);
				} else if (this.btnIndex == 3 && this.typeId == 1) {
					a(6, array);
				} else if (this.btnIndex == 3 && this.typeId == 2) {
					a(7, array);
					a(8, array);
				} else if (this.btnIndex == 4 && this.typeId == 1) {
					a(9, array);
					a(10, array);
				} else if (this.btnIndex == 4 && this.typeId == 2) {
					a(11, array);
				} else if (this.btnIndex == 5 && this.typeId == 1) {
					a(12, array);
				} else if (this.btnIndex == 5 && this.typeId == 2) {
					a(13, array);
					a(14, array);
					a(15, array);
				} else if (this.btnIndex == 6 && this.typeId == 1) {
					a(16, array);
					a(17, array);
					a(18, array);
				} else if (this.btnIndex == 6 && this.typeId == 2) {
					a(19, array);
				} else if (this.btnIndex == 7 && this.typeId == 1) {
					a(20, array);
					a(21, array);
				} else if (this.btnIndex == 7 && this.typeId == 2) {
					a(22, array);
					a(23, array);
				}
				// array
				let array1 = new eui.ArrayCollection();
				let aa = [];
				let bb = [];
				for (let i = 0; i < array.length; i++) {
					let missionId = this.data[array.source[i].TypeId - 1].mission.missionId % 1000000 % 100 - 1;
					if (array.source[i].index < missionId || (array.source[i].index <= missionId && array.source[i].index == this.data[array.source[i].TypeId - 1].dataInfo.length - 1 && this.data[array.source[i].TypeId - 1].mission.isFinish)) {
						aa.push(array.source[i]);
					} else {
						bb.push(array.source[i]);
					}
				}
				for (let i = 0; i < bb.length; i++) {
					array1.addItem(bb[i])
				}
				for (let i = 0; i < aa.length; i++) {
					array1.addItem(aa[i])
				}
				this.listViewItem.dataProvider = array1;
				this.listViewItem.itemRenderer = ActivityNoviceItem;
			} else {
				let array = new eui.ArrayCollection();
				let length = this.missionGift[this.btnIndex - 1];
				for (let i = 0; i < length.length; i++) {
					let data = new ActivityNoviceItemBData();
					data.index = i;
					data.info = length[i];
					data.father = this;
					array.addItem(data);
				}
				let array1 = new eui.ArrayCollection();
				let aa = [];
				let bb = [];
				for (let i = 0; i < length.length; i++) {
					let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, (k, v: number) => {
						return v == length[i].index;
					})
					if (vis) {
						aa.push(array.source[i]);
					} else {
						bb.push(array.source[i]);
					}
				}

				for (let i = 0; i < bb.length; i++) {
					array1.addItem(bb[i])
				}
				for (let i = 0; i < aa.length; i++) {
					array1.addItem(aa[i])
				}

				this.listViewItem.dataProvider = array1;
				this.listViewItem.itemRenderer = ActivityNoviceItemB;
			}
			this.array.refresh();
		}

		/**加载第几天按钮 */
		public setBtnList() {
			this.array.removeAll();
			for (let i = 1; i <= 7; i++) {
				let data = new ActivityNoviceBtnItmData();
				data.index = i;
				data.father = this;
				this.array.addItem(data);
			}
			this.listbtn.dataProvider = this.array;
			this.listbtn.itemRenderer = ActivityNoviceBtnItm;
			this.listbtn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListbtn, this);
		}

		public onListViewTag(e: eui.ItemTapEvent) {
			this.typeId = e.itemIndex + 1;
			if (e.itemIndex == 2) {
				this.setList(2);
			} else {
				this.array.refresh();
				this.setList(e.itemIndex);
			}
			this.array1.refresh()
		}

		/**点击第几天按钮 */
		public onListbtn(e: eui.ItemTapEvent) {
			if (Helper.day() < e.itemIndex + 1) {
				toast_warning("第" + (e.itemIndex + 1) + "天开启");
				return;
			}
			this.btnIndex = e.itemIndex + 1;
			this.array1.refresh();
			this.array.refresh();
			this.setList(this.typeId - 1);
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

		/**抬起移除奖励详情界面 */
		public up() {
			let dialogDrop = this.getChildByName("UI");
			if (dialogDrop) {
				this.removeChild(dialogDrop);
			}
		}

		/**加载右上进度条及其礼包相关信息 */
		public loadPmgressbarInfo() {
			for (let i = 1; i <= 4; i++) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] >= i) {//已领取
					this["imgGet" + i].visible = true;
					this["imgbg" + i].visible = true;
					this["labelTag" + i].textColor = 0x8E5308;
				} else {
					this["imgGet" + i].visible = false;
					this["imgbg" + i].visible = false;
					this["labelTag" + i].textColor = 0xFFFFFF
				}
			}
			this.labeljindu.text = Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken.toString();
			let scx = Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken / 100 <= 1 ? Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken / 100 : 1;
			this.imgBarMask.width = 239 * scx;
			// this.imgyiwancheng.visible = false;
			// this.imglabelBg.visible = false;
			for (let i = 1; i <= 4; i++) {
				let table = TableMissionReward.Item(i);
				this["imgBg" + i].visible = false;
				let source = PlayerItemSystem.ItemConfig(table.reward_goods[0]) as any;
				this["GoodsIcon" + i].source = cachekey(source.path, this);
				this["labelCont" + i].text = table.reward_count[i];
				Helper.SetImageFilterColor(this["GoodsIcon" + i])
				let index = Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] || 0;
				if (index < i && (Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken) >= table.condition) {//可领取
					this["imgBg" + i].visible = true;
					this["imgGet" + i].visible = true;
					this["imgGet" + i].source = "ui_acitivity_serverseven_canget_png"
					Helper.SetImageFilterColor(this["GoodsIcon" + i])
					// this.imgyiwancheng.visible = true;
					// this.imglabelBg.visible = true;
				} else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] >= i) {
					Helper.SetImageFilterColor(this["GoodsIcon" + i], "gray")
					this["imgBg" + i].visible = false;
					this["imgGet" + i].source = "ui_acitivity_serverseven_get_png"
				}
			}
		}

		public ongroupLight1(e: egret.TouchEvent) {
			this.bthGift(e, 1);
		}
		public ongroupLight2(e: egret.TouchEvent) {
			this.bthGift(e, 2);
		}
		public ongroupLight3(e: egret.TouchEvent) {
			this.bthGift(e, 3);
		}
		public ongroupLight4(e: egret.TouchEvent) {
			this.bthGift(e, 4);
		}

		public bthGift(e: egret.TouchEvent, index: number) {
			let table = TableMissionReward.Item(index);
			let index1 = Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] || 0;
			if (index1 < index && (Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken) >= table.condition) {
				this.missionNew(index).then((gameInfo: message.GameInfo) => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(gameInfo.getGoods);
							dialog.show();
						});
					this.loadPmgressbarInfo();
				}).catch(() => {

				});
				return;
			}
			let info = new message.GoodsInfo();
			info.goodsId = table.reward_goods[0];
			info.count = table.reward_count[0];
			this.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
		}

		public isFullScreen() {
			return true;
		}

		public onBtnClose() {
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
			this.close(UI.HIDE_TO_TOP);
		}

		public a() {
			interface Person {
				firstName: string;
				lastName: string;
			}

			function greeter(person: Person) {
				return "Hello, " + person.firstName + " " + person.lastName;
			}

			let user = { firstName: "Jane", lastName: "User" };

			document.body.innerHTML = greeter(user);
		}

		public missionNew(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.MissionNewRequest()
				request.body.mission_type = 4;
				request.body.index = index;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.MissionNewResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						// reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body.gameInfo);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}
	}
}