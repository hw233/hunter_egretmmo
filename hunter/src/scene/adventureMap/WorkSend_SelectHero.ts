namespace zj {
	export let GENERAL_APTITUDE = {
		[11]: ["ui_instance_search_quality3_1_png", "ui_instance_search_quality3_2_png", "C级猎人"],
		[12]: ["ui_instance_search_quality2_1_png", "ui_instance_search_quality2_2_png", "B级猎人"],
		[13]: ["ui_instance_search_quality1_1_png", "ui_instance_search_quality1_2_png", "A级猎人"],
		[14]: ["ui_instance_search_quality4_1_png", "ui_instance_search_quality4_2_png", "S级猎人"]
	}

	export let GENERAL_STAR = {
		[1]: ["ui_instance_search_star_star1_1_png", "ui_instance_search_star_star1_2_png", "1星猎人"],
		[2]: ["ui_instance_search_star_star2_1_png", "ui_instance_search_star_star2_2_png", "2星猎人"],
		[3]: ["ui_instance_search_star_star3_1_png", "ui_instance_search_star_star3_2_png", "3星猎人"],
		[4]: ["ui_instance_search_star_star4_1_png", "ui_instance_search_star_star4_2_png", "4星猎人"],
		[5]: ["ui_instance_search_star_star5_1_png", "ui_instance_search_star_star5_2_png", "5星猎人"],
		[6]: ["ui_instance_search_star_star6_1_png", "ui_instance_search_star_star6_2_png", "6星猎人"],
	}

	export let GENERAL_TYPE1 = {
		[1]: ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
		[2]: ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
		[3]: ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
		[4]: ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
		[5]: ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
		[6]: ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"]
	}

	export let GENERAL_TYPE2 = {
		[1]: ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
		[2]: ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
		[3]: ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
		[4]: ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
		[5]: ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
		[6]: ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"]
	}

	export let GENERAL_TYPE3 = {
		[1]: ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
		[2]: ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
		[3]: ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
		[4]: ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
		[5]: ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
		[6]: ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"]
	}

	export enum HERO_TYPE {
		QIANGHUA = 1,
		FANGCHU = 2,
		JUXIAN = 3,
		TEZHI = 4,
		BIANHUA = 5,
		CAOZUO = 6,
		ALLHERO = 7
	}

	/**
	 * @class 工作派遣选择猎人
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-09
	 */
	export class WorkSend_SelectHero extends Dialog {
		private groupTouch: eui.Group;
		private scrollerHero: eui.Scroller;
		private listHero: eui.List;
		private btnType1: eui.Button;
		private btnType2: eui.Button;
		private btnType3: eui.Button;
		private btnType4: eui.Button;
		private btnType5: eui.Button;
		private btnType6: eui.Button;
		private imgTypeSel: eui.Image;
		private imgTip: eui.Image;
		private groupHero1: eui.Group;
		private imgFrame1: eui.Image;
		private imgIcon1: eui.Image;
		private groupHero2: eui.Group;
		private imgFrame2: eui.Image;
		private imgIcon2: eui.Image;
		private groupHero3: eui.Group;
		private imgFrame3: eui.Image;
		private imgIcon3: eui.Image;
		private groupHero4: eui.Group;
		private imgFrame4: eui.Image;
		private imgIcon4: eui.Image;
		private imgCondition1: eui.Image;
		private imgCondition2: eui.Image;
		private imgCondition3: eui.Image;
		private imgCondition4: eui.Image;
		private labelTime: eui.Label;
		private btnAkeyChoose: eui.Button;
		private btnStart: eui.Button;
		private labelNone: eui.Label;

		private listHeroData: eui.ArrayCollection = new eui.ArrayCollection();
		private workInfo: message.InstanceSearch;
		private itemIndex: number;
		private condition: { [key: string]: number } = {};
		private hunterSelArr: Array<message.GeneralInfo> = []; // 选中的猎人
		private allHunterArr: Array<number> = []; // 所有可选的猎人
		private conditionSelArr: Array<number> = []; // 一键上阵猎人满足的条件
		private index: number;
		private type: number = HERO_TYPE.ALLHERO;

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/WorkSend_SelectHeroSkin.exml";
			this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeHeroList, this);
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStart, this);
			this.btnAkeyChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAkeyChoose, this);
			for (let i = 1; i <= 4; i++) (this[`groupHero${i}`] as eui.Group).addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnGroupHero${i}`], this);
			for (let i = 1; i <= 6; i++) (this[`btnType${i}`] as eui.Button).addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnType${i}`], this);
		}

		public init(info: message.InstanceSearch, index: number) {
			this.itemIndex = 0;
			this.index = index;
			this.workInfo = info;
			for (let i = 1; i <= 4; i++) {
				(this[`groupHero${i}`] as eui.Group).visible = false;
				(this[`imgCondition${i}`] as eui.Image).visible = false;
			}
			this.condition = {};
			this.hunterSelArr = [];
			this.allHunterArr = [];
			this.labelTime.text = "所需时间: " + Helper.GetTimeStr(info.time, false);

			this.setConditionPos();
			this.setHeroPos();
			this.changeHeroList(this.type);
			egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
		}

		private changeHeroList(type: number) {
			this.scrollerHero.stopAnimation();
			this.scrollerHero.viewport.scrollV = 0;
			this.type = type;
			this.setHeroList(type);
			if (this.type == HERO_TYPE.ALLHERO) {
				for (let i = 1; i <= 6; i++) (this[`btnType${i}`] as eui.Button).currentState = "up";
				this.imgTypeSel.visible = false;
			}
			else {
				for (let i = 1; i <= 6; i++) {
					if (i == type) (this[`btnType${i}`] as eui.Button).currentState = "down";
					if (i != type) (this[`btnType${i}`] as eui.Button).currentState = "up";
				}
				this.imgTypeSel.visible = true;
				this.imgTypeSel.x = (this[`btnType${type}`] as eui.Button).left + (this[`btnType${type}`] as eui.Button).width / 2;
			}
		}

		private setHeroList(type: number) {
			let hunterList = PlayerHunterSystem.GetHunterList();
			this.allHunterArr = [];

			let generalInfoArr: Array<message.GeneralInfo> = [];
			for (let i = 0; i < hunterList.length; i++) {
				if (Game.PlayerInstanceSystem.GetHunterBeInSearch(hunterList[i]) != -1) continue;
				generalInfoArr.push(Game.PlayerHunterSystem.queryHunter(hunterList[i]))
			}

			generalInfoArr.sort((a, b) => { // 优先星级 星级相同排品质
				if (a.star == b.star) {
					return PlayerHunterSystem.Table(b.general_id).aptitude - PlayerHunterSystem.Table(a.general_id).aptitude;
				} else {
					return b.star - a.star;
				}
			});

			for (let i = 0; i < generalInfoArr.length; i++) this.allHunterArr.push(generalInfoArr[i].general_id);

			let arr = [];
			if (type != HERO_TYPE.ALLHERO) {
				for (let i = 0; i < this.allHunterArr.length; i++) {
					let baseInfo = PlayerHunterSystem.Table(this.allHunterArr[i]);
					if (baseInfo.type == type) arr.push(this.allHunterArr[i]);
				}
				this.labelNone.text = "暂无" + GENERAL_TYPE1[type][2];
			}
			else {
				arr = this.allHunterArr;
			}

			this.labelNone.visible = arr.length == 0;

			this.listHeroData.removeAll();
			for (let i = 0; i < arr.length; i++) {
				let info = Game.PlayerHunterSystem.queryHunter(arr[i]);
				let itemData = new WorkSendHeroItemData();
				itemData.generalInfo = Game.PlayerHunterSystem.allHuntersMap()[arr[i]];
				itemData.isSel = this.hunterSelArr.indexOf(info) != -1;
				this.listHeroData.addItem(itemData);
			}
			this.listHero.dataProvider = this.listHeroData;
			this.listHero.itemRenderer = WorkSendHeroItem;
			this.listHero.selectedIndex = this.itemIndex == -1 ? 0 : this.itemIndex;
		}

		private setConditionPos() {
			for (let [k, v] of HelpUtil.GetKV(this.workInfo)) {
				if (k == "general_aptitude" && v != 0) this.condition["GENERAL_APTITUDE"] = v;
				if (k == "general_star" && v != 0) this.condition["GENERAL_STAR"] = v;
				if (k == "general_type" && v.length != 0) {
					for (let i = 0; i < v.length; i++) this.condition["GENERAL_TYPE" + (i + 1)] = v[i];
				}
			}
			let keys = Object.keys(this.condition);
			let i = 1;
			for (const key of keys) {
				(this[`imgCondition${i}`] as eui.Image).visible = true;
				(this[`imgCondition${i}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][0], this);
				i++;
			}

			if (this.conditionSelArr.length == 0) {
				for (let i = 0; i < Object.keys(this.condition).length; i++) this.conditionSelArr.push(null);
			}
		}

		private setHeroPos() {
			for (let i = 1; i <= Object.keys(this.condition).length; i++) {
				(this[`groupHero${i}`] as eui.Group).visible = true;
				if (i == 1) continue;
				(this[`groupHero${i}`] as eui.Group).x += (this[`groupHero${i}`] as eui.Group).width + 10 + (this[`groupHero${i - 1}`] as eui.Group).x;
			}
		}

		private onChangeHeroList(e: eui.ItemTapEvent) {
			if (this.hunterSelArr.length == Object.keys(this.condition).length && this.hunterSelArr.indexOf(null) == -1 && this.conditionSelArr.indexOf(null) != -1) return;
			let item = this.listHero.getElementAt(e.itemIndex) as WorkSendHeroItem;
			let data = this.listHeroData.getItemAt(e.itemIndex) as WorkSendHeroItemData;

			this.listHeroData.itemUpdated(this.listHeroData.source[e.itemIndex]);
			this.listHeroData.itemUpdated(this.listHeroData.source[this.itemIndex]);
			this.itemIndex = e.itemIndex;

			this.chooleOneHero(data);
		}

		private chooleOneHero(data: WorkSendHeroItemData) {
			if (this.hunterSelArr.indexOf(data.generalInfo) != -1) return;
			let fun = (data: message.GeneralInfo, self: WorkSend_SelectHero) => {
				for (let i = 0; i < self.hunterSelArr.length; i++) {
					if (self.hunterSelArr[i] == null && self.hunterSelArr.indexOf(data) == -1) {
						self.hunterSelArr[i] = data;
						break;
					}
				}
			}
			this.hunterSelArr.length < Object.keys(this.condition).length && this.hunterSelArr.indexOf(null) == -1 ? this.hunterSelArr.push(data.generalInfo) : fun(data.generalInfo, this);

			let isStar: boolean = this.workInfo.general_star != 0;
			let baseInfo = PlayerHunterSystem.Table(data.generalInfo.general_id)
			let typeIndex = this.workInfo.general_type.indexOf(baseInfo.type);

			if (isStar) { // 星级条件
				if (data.generalInfo.star >= this.workInfo.general_star) this.conditionSelArr[0] = 1;
			}
			else { // 品质条件
				if (baseInfo.aptitude >= this.workInfo.general_aptitude) this.conditionSelArr[0] = 1;
			}
			if (typeIndex != -1) this.conditionSelArr[typeIndex + 1] = typeIndex + 2;

			this.setHeroInfo();
			this.setConditionSel(data.generalInfo.general_id);
		}

		private onBtnAkeyChoose() {
			let isStar: boolean = this.workInfo.general_star != 0;
			let arrConditionHunter = []; // 星级或者资质满足条件的猎人
			let arrAll = Table.DeepCopy(this.allHunterArr); // 所有猎人
			let arrSelHunter = []; // 上阵猎人
			this.conditionSelArr = [];
			for (let i = 0; i < Object.keys(this.condition).length; i++) {
				arrSelHunter.push(null);
				this.conditionSelArr.push(null);
			}
			for (let i = 0; i < this.allHunterArr.length; i++) {
				let generalInfo = Game.PlayerHunterSystem.queryHunter(this.allHunterArr[i]);
				let baseInfo = PlayerHunterSystem.Table(this.allHunterArr[i]);
				if (isStar) {
					if (generalInfo.star >= this.workInfo.general_star) arrConditionHunter.push(this.allHunterArr[i]);
				}
				else {
					if (baseInfo.aptitude >= this.workInfo.general_aptitude) arrConditionHunter.push(this.allHunterArr[i]);
				}
			}
			arrConditionHunter.sort((a, b) => {
				let generalInfoA = Game.PlayerHunterSystem.queryHunter(a);
				let baseInfoA = PlayerHunterSystem.Table(a);
				let generalInfoB = Game.PlayerHunterSystem.queryHunter(b);
				let baseInfoB = PlayerHunterSystem.Table(b);
				if (isStar) {
					if (generalInfoA.star == generalInfoB.star) {
						if (baseInfoA.aptitude == baseInfoB.aptitude) {
							return generalInfoA.level - generalInfoB.level;
						}
						else {
							return baseInfoA.aptitude - baseInfoB.aptitude;
						}
					}
					else {
						return generalInfoA.star - generalInfoB.star
					}
				}
				else {
					if (baseInfoA.aptitude == baseInfoB.aptitude) {
						if (generalInfoA.star == generalInfoB.star) {
							return generalInfoA.level - generalInfoB.level;
						}
						else {
							return generalInfoA.star - generalInfoB.star;
						}
					}
					else {
						return baseInfoA.aptitude - baseInfoB.aptitude
					}
				}
			});

			if (arrConditionHunter.length != 0) {
				arrAll.sort((a, b) => {
					let generalInfoA = Game.PlayerHunterSystem.queryHunter(a);
					let baseInfoA = PlayerHunterSystem.Table(a);
					let generalInfoB = Game.PlayerHunterSystem.queryHunter(b);
					let baseInfoB = PlayerHunterSystem.Table(b);

					if (isStar) {
						if (generalInfoA.star == generalInfoB.star) {
							if (baseInfoA.aptitude == baseInfoB.aptitude) {
								return generalInfoA.level - generalInfoB.level;
							}
							else {
								return baseInfoA.aptitude - baseInfoB.aptitude;
							}
						}
						else {
							return generalInfoA.star - generalInfoB.star
						}
					}
					else {
						if (baseInfoA.aptitude == baseInfoB.aptitude) {
							if (generalInfoA.star == generalInfoB.star) {
								return generalInfoA.level - generalInfoB.level;
							}
							else {
								return generalInfoA.star - generalInfoB.star;
							}
						}
						else {
							return baseInfoA.aptitude - baseInfoB.aptitude
						}
					}
				});

				let starOrQualityNum: number;
				if (isStar) {
					starOrQualityNum = Game.PlayerHunterSystem.queryHunter(arrConditionHunter[0]).star;
				}
				else {
					starOrQualityNum = PlayerHunterSystem.Table(arrConditionHunter[0]).aptitude;
				}
				// arrSelHunter.push(arrConditionHunter[0]);
				arrSelHunter[0] = arrConditionHunter[0];
				this.conditionSelArr[0] = 1;
				if (this.conditionSelArr.length == Object.keys(this.condition).length && this.conditionSelArr.indexOf(null) == -1) return;
				for (let i = 0; i < arrConditionHunter.length; i++) {
					if (isStar) {
						if (Game.PlayerHunterSystem.queryHunter(arrConditionHunter[i]).star > starOrQualityNum) break;
					}
					else {
						if (PlayerHunterSystem.Table(arrConditionHunter[i]).aptitude > starOrQualityNum) break;
					}
					let type = PlayerHunterSystem.Table(arrConditionHunter[i]).type;
					let typeIndex = this.workInfo.general_type.indexOf(type);
					if (typeIndex != -1) {
						// this.conditionSelArr.push(typeIndex + 2);
						if (this.conditionSelArr[typeIndex + 1] == null) this.conditionSelArr[typeIndex + 1] = typeIndex + 2;
						if (arrSelHunter.indexOf(arrConditionHunter[i]) == -1) {
							arrSelHunter[0] = arrConditionHunter[i];
						}
						break;
					}
				}
			}

			let num = 0;
			let arrr = []; // 临时存放
			for (let j = 0; j < this.workInfo.general_type.length; j++) {
				for (let i = num; i < arrAll.length; i++) {
					let type = PlayerHunterSystem.Table(arrAll[i]).type;
					arrr.push(type);
					let typeIndex = this.workInfo.general_type.indexOf(type);
					if (typeIndex != -1 && this.conditionSelArr.indexOf(typeIndex + 2) == -1) {
						// this.conditionSelArr[j] == null ? this.conditionSelArr[j] = typeIndex + 2 : this.conditionSelArr.push(typeIndex + 2);
						// this.conditionSelArr.push(typeIndex + 2);
						if (this.conditionSelArr[j + 1] == null) {
							this.conditionSelArr[j + 1] = typeIndex + 2;
							// if (arrSelHunter[j + 1] == null) arrSelHunter[j + 1] = arrAll[i];
							if (arrSelHunter.indexOf(null) != -1) arrSelHunter[arrSelHunter.indexOf(null)] = arrAll[i];
						}
						// if (arrSelHunter[j + 1] == null) arrSelHunter[j + 1] = arrAll[i];
						// arrSelHunter.push(arrAll[i]);

						break;
					}
					num = i;
				}
			}

			if (arrSelHunter.length == 0) {
				toast_warning("没有满足条件的猎人！");
				return;
			}
			this.hunterSelArr = [];
			for (let i = 0; i < arrSelHunter.length; i++) {
				if (arrSelHunter[i] != null) {
					let generalinfo = Game.PlayerHunterSystem.queryHunter(arrSelHunter[i]);
					this.hunterSelArr[i] = generalinfo;
					this.setConditionSel(generalinfo.general_id);
					this.setHeroInfo();
				}
				else {
					this.hunterSelArr[i] = null;
					this.setHeroInfo();
				}
			}
			this.setHeroList(this.type);
		}

		private setHeroInfo() {
			for (let i = 1; i <= this.hunterSelArr.length; i++) {
				if (this.hunterSelArr[i - 1] != null) {
					// let baseInfo = PlayerHunterSystem.Table(this.hunterSelArr[i - 1].general_id);
					(this[`imgFrame${i}`] as eui.Image).source = cachekey(PlayerHunterSystem.Frame(this.hunterSelArr[i - 1].general_id), this);
					(this[`imgIcon${i}`] as eui.Image).source = cachekey(PlayerHunterSystem.Head(this.hunterSelArr[i - 1].general_id), this);
					(this[`imgFrame${i}`] as eui.Image).horizontalCenter = 0;
					if ((this[`imgIcon${i}`] as eui.Image).source == "hero_icon_head_gw_moguguai_png") (this[`imgFrame${i}`] as eui.Image).horizontalCenter = -2;
					// if (this.selected) {
					// this[`imgType${i}`].source = cachekey(UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
					// this[`labelLevel${i}`].text = this.hunterSelArr[i - 1].level.toString();
					// Helper.SetHeroAwakenStar(this[`groupStar${i}`], this.hunterSelArr[i - 1].star, this.hunterSelArr[i - 1].awakePassive.level);
					// Helper.GetBreakLevelToPath(this[`imgBreak${i}`], this.hunterSelArr[i - 1].break_level);
					// this[`imgQuality${i}`].source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(this.hunterSelArr[i - 1].general_id).aptitude], this);
				}
				else {
					(this[`imgFrame${i}`] as eui.Image).source = cachekey("ui_frame_FrameHunterAsh_png", this);
					(this[`imgIcon${i}`] as eui.Image).source = null;
					(this[`imgFrame${i}`] as eui.Image).horizontalCenter = 0;
					// this[`imgType${i}`].source = null;
					// this[`labelLevel${i}`].text = "";
					// this[`groupStar${i}`].removeChildren();
					// this[`imgBreak${i}`].source = null;
					// this[`imgQuality${i}`].source = null;
				}
			}
			this.setHeroList(this.type);
		}

		/**选中猎人刷新条件 */
		private setConditionSel(generalId: number) {
			let baseInfo = PlayerHunterSystem.Table(generalId);
			let generalInfo = Game.PlayerHunterSystem.queryHunter(generalId);
			let index: number = 1;
			let keys = Object.keys(this.condition);
			for (const key of keys) {
				const v = this.condition[key];
				let isShow: boolean = false;
				if (key == "GENERAL_APTITUDE") {
					if (v && baseInfo.aptitude >= v) isShow = true;
					if (isShow) (this[`imgCondition${index}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][1], this);
					++index;
				}
				if (key == "GENERAL_STAR") {
					if (v && generalInfo.star >= v) isShow = true;
					if (isShow) (this[`imgCondition${index}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][1], this);
					++index;
				}
				if (key == "GENERAL_TYPE1") {
					if (v && baseInfo.type == v) isShow = true;
					if (isShow) (this[`imgCondition${index}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][1], this);
					++index;
				}
				if (key == "GENERAL_TYPE2") {
					if (v && baseInfo.type == v) isShow = true;
					if (isShow) (this[`imgCondition${index}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][1], this);
					++index;
				}
				if (key == "GENERAL_TYPE3") {
					if (v && baseInfo.type == v) isShow = true;
					if (isShow) (this[`imgCondition${index}`] as eui.Image).source = cachekey(zj[key][this.condition[key]][1], this);
					++index;
				}
			}
		}

		/**取消选中猎人刷新条件 */
		private setConditionUnSel() {
			let keys = Object.keys(this.condition);
			let indexArr = [];
			let generals = this.hunterSelArr;
			for (let generalInfo of generals) {
				if (!generalInfo) continue;
				let index: number = 1;
				let baseInfo = PlayerHunterSystem.Table(generalInfo.general_id);

				for (const key of keys) {
					if (indexArr.indexOf(index) != -1) {
						index++;
						continue;
					}
					const v = this.condition[key];
					let isShow: boolean = false;
					let typeIsShow: boolean = false;
					if (key == "GENERAL_APTITUDE") if (v && baseInfo.aptitude >= v) isShow = true;
					if (key == "GENERAL_STAR") if (v && generalInfo.star >= v) isShow = true;
					if (key == "GENERAL_TYPE1") if (v && baseInfo.type == v) isShow = true;
					if (key == "GENERAL_TYPE2") if (v && baseInfo.type == v) isShow = true;
					if (key == "GENERAL_TYPE3") if (v && baseInfo.type == v) isShow = true;
					if (isShow) indexArr.push(index);
					index++;
				}
			}
			let allCondition = [1, 2, 3, 4];
			for (const v of allCondition) {
				if (indexArr.indexOf(v) != -1) continue;
				let keys = Object.keys(this.condition);
				if ((this[`imgCondition${v}`] as eui.Image).visible) {
					(this[`imgCondition${v}`] as eui.Image).source = cachekey(zj[keys[v - 1]][this.condition[keys[v - 1]]][0], this);
					for (let i = 0; i < this.conditionSelArr.length; i++) {
						if (v == this.conditionSelArr[i]) {
							this.conditionSelArr[i] = null;
						}
					}
				}

			}
		}


		private onBtnGroupHero1() {
			if (this.hunterSelArr.length >= 1 && this.hunterSelArr[0] != null) {
				this.hunterSelArr[0] = null;
				this.setConditionUnSel();
				this.setHeroInfo();
			}
		}

		private onBtnGroupHero2() {
			if (this.hunterSelArr.length >= 2 && this.hunterSelArr[1] != null) {
				this.hunterSelArr[1] = null;
				this.setConditionUnSel();
				this.setHeroInfo();
			}
		}

		private onBtnGroupHero3() {
			if (this.hunterSelArr.length >= 3 && this.hunterSelArr[2] != null) {
				this.hunterSelArr[2] = null;
				this.setConditionUnSel();
				this.setHeroInfo();
			}
		}

		private onBtnGroupHero4() {
			if (this.hunterSelArr.length >= 4 && this.hunterSelArr[3] != null) {
				this.hunterSelArr[3] = null;
				this.setConditionUnSel();
				this.setHeroInfo();
			}
		}

		private onBtnType1() {
			if (this.type == HERO_TYPE.QIANGHUA) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.QIANGHUA;
			}
			this.changeHeroList(this.type);
		}

		private onBtnType2() {
			if (this.type == HERO_TYPE.FANGCHU) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.FANGCHU;
			}
			this.changeHeroList(this.type);
		}

		private onBtnType3() {
			if (this.type == HERO_TYPE.JUXIAN) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.JUXIAN;
			}
			this.changeHeroList(this.type);
		}

		private onBtnType4() {
			if (this.type == HERO_TYPE.TEZHI) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.TEZHI;
			}
			this.changeHeroList(this.type);
		}

		private onBtnType5() {
			if (this.type == HERO_TYPE.BIANHUA) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.BIANHUA
			}
			this.changeHeroList(this.type);
		}

		private onBtnType6() {
			if (this.type == HERO_TYPE.CAOZUO) {
				this.type = HERO_TYPE.ALLHERO;
			}
			else {
				this.type = HERO_TYPE.CAOZUO;
			}
			this.changeHeroList(this.type);
		}

		private onBtnStart() {
			let condition: number = 0;
			for (let i = 0; i < Object.keys(this.condition).length; i++) {
				if (this.conditionSelArr[i] == null) {
					for (let key in this.condition) {
						if (key == Object.keys(this.condition)[i]) {
							condition = this.condition[key];
							break;
						}
					}
					let str = zj[Object.keys(this.condition)[i]][condition][2];
					toast_warning("请选择一个" + str);
					return;
				}
			}
			let arr = [];
			let self = this;
			for (let i = 0; i < this.hunterSelArr.length; i++) {
				if (this.hunterSelArr[i] != null) arr.push(this.hunterSelArr[i].general_id);
			}
			Game.PlayerInstanceSystem.StartSearchingReq(this.workInfo.id, arr).then((value: message.StartSearchingResponse) => {
				self.close(UI.HIDE_TO_TOP);
				Game.EventManager.event(GameEvent.WORK_SEND_START, self.workInfo.id);
			});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}