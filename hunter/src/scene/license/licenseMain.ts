namespace zj {
	/** 
 * @author xing li wei
 * 
 * @date 2019-3-20
 * 
 * @class 执照主界面
 */
	export class licenseMain extends Dialog {
		private imgbg: eui.Image;
		private groupMoney1: eui.Group;
		private labelIntegrate: eui.Label;
		private btnAddGold: eui.Button;
		private btnClose: eui.Button;
		private groupTeach1: eui.Group;
		private imgLevelAssess: eui.Image;
		private listInfo: eui.List;
		private groupExamination: eui.Group;
		private groupNpcTalk1: eui.Group;
		private groupTalk1: eui.Group;
		private labelExaminationInfo1: eui.BitmapLabel;
		private btnHunterExamination: eui.Button;
		private groupNpcTalk2: eui.Group;
		private groupTalk2: eui.Group;
		private labelExaminationInfo2: eui.BitmapLabel;
		private btnGetLicence: eui.Button;
		private labelLicenseTip: eui.Label;
		private groupTeach2: eui.Group;
		private imgLevelAward: eui.Image;
		private groupStar: eui.Group;
		private imgLicenseLevel: eui.Image;
		private labelLicenseLevelInfo: eui.Label;
		private imgHunterTitle: eui.Image;
		private listStarAward: eui.List;
		private imgLevelPrerogative: eui.Image;
		private listHunterInfo: eui.List;
		private listAllHunter: eui.List;
		private groupTeach0: eui.Group;
		private imgLevelAssessH: eui.Image;
		private listInfoH: eui.List;
		private groupExaminationH: eui.Group;
		private groupNpcTalkH: eui.Group;
		private groupTalk0: eui.Group;
		private labelExaminationInfoH: eui.BitmapLabel;
		private btnHunterExaminationH: eui.Button;
		private groupNpcTalk3: eui.Group;
		private groupTalk3: eui.Group;
		private labelExaminationInfo2H: eui.BitmapLabel;
		private btnGetLicenceH: eui.Button;
		private labelLicenseTip0: eui.Label;
		private groupTeach3: eui.Group;
		private imgLevelAwardH: eui.Image;
		private groupStarH: eui.Group;
		private imgLicenseLevelH: eui.Image;
		private labelLicenseLevelInfoH: eui.Label;
		private imgHunterTitleH: eui.Image;
		private listStarAwardH: eui.List;
		private imgLevelPrerogativeH: eui.Image;
		private listHunterInfoH: eui.List;
		private listAllHunterH: eui.List;
		private btnNorMal: eui.Button;
		private btnHight: eui.Button;
		private btnNone: eui.Button;
		private groupCommon: eui.Group;
		private groupHight: eui.Group;

		public focusCur: number = 0;
		public focusCurH: number = 0;
		private type;
		private Canse: Boolean = false;
		private CanseH: Boolean = false;
		/**教学获取未领取奖励 */
		public teachNotGetTbl;
		/**星级按钮数据源 */
		private array: eui.ArrayCollection = new eui.ArrayCollection();
		/**星级按钮数据源高级 */
		private arrayH: eui.ArrayCollection = new eui.ArrayCollection();
		/**只点击一次点击按钮 */
		private boolean: boolean = true;
		private cb: Function;//回调
		private update: number;
		private index: number = 1;
		public constructor() {
			super();
			this.skinName = "resource/skins/license/licenseMainSkin.exml";
			if (this.imgbg.width < UIManager.StageWidth) {
				this.imgbg.width = UIManager.StageWidth;
			}
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnGetLicence.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetLicence, this);
			this.btnHunterExamination.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterExamination, this);
			this.btnNone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetLicence1, this);
			this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
			this.btnNorMal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNorMal, this);
			this.btnHight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHight, this);
			this.btnGetLicenceH.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetLicenceH, this);
			this.btnHunterExaminationH.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterExaminationH, this);
			this.update = egret.setInterval(this.Update, this, 1000);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
				egret.Tween.removeTweens(this);
			}, this);
			this.Update();
			this.groupHight.visible = false;
			this.info();
		}

		private info() {

			if (Game.PlayerMissionSystem.missionActive.licence == 0) {
				this.focusCur = 1;
			} else if (Game.PlayerMissionSystem.missionActive.licence == 7) {
				this.focusCur = 7;
			} else {
				this.focusCur = Game.PlayerMissionSystem.missionActive.licence + 1;
				if (this.focusCur > 7) {
					this.focusCur = 1;
				}
			}

			if (Game.PlayerMissionSystem.missionActive.licence == CommonConfig.licence_max_level) {
				this.focusCurH = 1;
			} else if (Game.PlayerMissionSystem.missionActive.licence == CommonConfig.high_licence_max_level + CommonConfig.licence_max_level) {
				this.focusCurH = CommonConfig.high_licence_max_level
			} else {
				this.focusCurH = Game.PlayerMissionSystem.missionActive.licence + 1 - CommonConfig.licence_max_level;
			}
			let licenseID = Game.PlayerMissionSystem.SetExamination(this.focusCur);

			if (licenseID.length == 4) {
				this.Canse = true;
			} else {
				this.Canse = false;
			}

			let licenseIDH = Game.PlayerMissionSystem.SetExaminationHigh(this.focusCurH);
			if (licenseIDH.length == 4) {
				this.CanseH = true;
			} else {
				this.CanseH = false;
			}

			this.SetListButtonInfo();
			this.setListInfo();
			this.setLabelList();
			this.setAwardList();
			this.setLicenseRight();

			if (Game.PlayerMissionSystem.missionActive.licence >= CommonConfig.licence_max_level) {
				this.groupCommon.visible = false;
				this.groupHight.visible = true;
				this.setAwardListH();
				this.SetLicenseRightH();
				this.setListInfoH();
				this.setLabelListH();
				this.SetListButtonInfoH();
			}
		}

		public CB(cb) {
			this.cb = cb;
		}

		private onBtnAddGold() {
			loadUI(HelpGoldDialog)
				.then((dialog: HelpGoldDialog) => {
					dialog.SetInfoList();
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		private Update() {
			//钻石数量
			if (Game.PlayerInfoSystem.Coin > 100000) {
				this.labelIntegrate.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
			} else {
				this.labelIntegrate.text = Game.PlayerInfoSystem.Coin.toString();
			}
			if (this.labelIntegrate.width < 60) {
				this.labelIntegrate.width = 60;
			}
		}

		/**科目进度 */
		private setListInfo() {
			let thisOne = this;
			let licenceReward = Game.PlayerMissionSystem.missionActive.licenceReward;
			let bGet = Table.FindF(licenceReward, (k, v) => {
				return v == thisOne.focusCur;
			});

			let licence = Game.PlayerMissionSystem.missionActive.licence;

			if (this.teachNotGetTbl == null) {
				this.teachNotGetTbl = [];
			}

			this.listInfo.visible = true;
			if (!this.Canse || (bGet && this.focusCur <= licence)) {
				let missions = Game.PlayerMissionSystem.listForLicence();
				this.groupExamination.visible = false;

				let array = new eui.ArrayCollection();
				for (let i = 0; i < missions.length; i++) {
					let data = new licenseProgressInfoItemData();
					data.index = i;
					data.father = this;
					data.focusCur = this.focusCur;
					data.mission = missions[i];
					data.type = 1;
					array.addItem(data);
				}
				this.listInfo.dataProvider = array;
				this.listInfo.itemRenderer = licenseProgressInfoItem;
			} else {
				this.listInfo.visible = false;
				this.setExeam();
			}
		}

		/**猎人考试 */
		private setExeam() {
			this.groupExamination.visible = true;
			let licence = Game.PlayerMissionSystem.missionActive.licence;
			let info = TableMissionLicence.Table();
			let thisOne = this;
			let licenceReward = Game.PlayerMissionSystem.missionActive.licenceReward;
			let bGet = Table.FindF(licenceReward, (k, v) => {
				return v == thisOne.focusCur;
			});

			let list = [];
			let infos = Game.PlayerMissionSystem.listForLicence();

			for (let kk in infos) {
				if (infos.hasOwnProperty(kk)) {
					let vv = infos[kk];
					let tbl = Game.PlayerMissionSystem.missionMap[vv.index];
					let starId = Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
					let start = starId + this.focusCur - 1;
					if (vv.type == message.MissionType.MISSION_TYPE_LICENCE && tbl.missionId >= start && licence == this.focusCur - 1) {
						list.push(tbl.missionId);
					}
				}
			}
			//领取执照
			if (bGet && licence <= this.focusCur) {
				this.groupNpcTalk1.visible = false;
				this.groupNpcTalk2.visible = true;
				this.labelExaminationInfo2.text = this.focusCur.toString();
			} else {//考试
				this.groupNpcTalk1.visible = true;
				this.groupNpcTalk2.visible = false;
				this.labelExaminationInfo1.text = this.focusCur.toString();
			}
		}

		/**选择星级按钮列表 */
		public SetListButtonInfo() {
			this.array.removeAll();
			for (let i = 0; i < 7; i++) {
				let data = new licenseProgressLevelInfoData();
				data.isSel = (i == this.focusCur - 1);
				data.index = i;
				data.father = this;
				data.type = 1;
				this.array.addItem(data);
			}
			this.type = 1;
			this.listAllHunter.dataProvider = this.array;
			this.listAllHunter.itemRenderer = licenseProgressLevelInfo;
			this.listAllHunter.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListAllHunter1, this);
		}

		private onListAllHunter1() {
			let data;
			if (this.type == 1) {
				data = this.listAllHunter.getElementAt(this.focusCur - 1) as licenseProgressLevelInfo;
			} else {
				data = this.listAllHunterH.getElementAt(this.focusCurH - 1) as licenseProgressLevelInfo;
			}

			data.down();
			this.array.refresh();
		}

		public setSelect(index: number, Canse: boolean) {
			this.focusCur = index;
			this.Canse = Canse;
			this.setListInfo();
			this.setLicenseRight();
			this.setAwardList();
			this.SetListButtonInfo();
			this.setLabelList();
		}

		/**执照特权信息 */
		private setLabelList() {
			let strVip = PlayerVIPSystem.StrVip(this.focusCur);
			let array = new eui.ArrayCollection();
			for (let i = 0; i < strVip.length; i++) {
				let data = new licenseProgressInfoItemBData();
				data.id = strVip[i];
				array.addItem(data);
			}
			this.listHunterInfo.dataProvider = array;
			this.listHunterInfo.itemRenderer = licenseProgressInfoItemB;
		}

		private setLicenseRight() {
			//执照ID
			this.labelLicenseLevelInfo.text = "NO." + Game.PlayerInfoSystem.BaseInfo.id;

			//几星猎人
			let licence = Game.PlayerMissionSystem.missionActive.licence;
			this.imgHunterTitle.source = cachekey(UIConfig.UIConfig_Task.Title[this.focusCur], this);
			Helper.SetStar(this.groupStar, this.focusCur, UIConfig.UIConfig_Role.heroAwakenStar[1], 0.8, 18);
			this.imgLevelAssess.source = cachekey(UIConfig.UIConfig_Task.num[this.focusCur], this);
			this.imgLevelAward.source = cachekey(UIConfig.UIConfig_Task.num[this.focusCur], this);
			this.imgLevelPrerogative.source = cachekey(UIConfig.UIConfig_Task.num[this.focusCur], this);
		}

		/**奖励 */
		private setAwardList() {
			let goods = Game.PlayerMissionSystem.itemLicense(this.focusCur).reward_goods;
			let count = Game.PlayerMissionSystem.itemLicense(this.focusCur).reward_count;
			let array: eui.ArrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < goods.length; i++) {
				let data = new licenseProgressItemData();
				data.goods = goods[i];
				data.count = count[i];
				data.index = i;
				// data.father = this;
				array.addItem(data);
			}
			this.listStarAward.dataProvider = array;
			this.listStarAward.itemRenderer = licenseProgressItem;
			this.listStarAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistStarAward, this);
		}

		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			if (Math.floor(info.goodsId / 1000) == 195) {

			} else {
				let ui = this.getChildByName("UI");
				if (ui) {
					return;
				}
				let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
				commonDesSkill.name = "UI";
				this.addChild(commonDesSkill);
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
			}
		}
		/**抬起移除奖励详情界面 */
		private awardUp() {
			let ui = this.getChildByName("UI");
			if (ui) {
				this.removeChild(ui);
			}
		}

		private onlistStarAward() {

		}

		/**领取执照 */
		private onBtnGetLicence() {
			Game.PlayerMissionSystem.MissionRewardLicence(this.focusCur)
				.then((msg: message.GameInfo) => {
					loadUI(licenseHunterUpStar)
						.then((dialog: licenseHunterUpStar) => {
							dialog.setInfo(this.focusCur, msg, this, () => {

							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
					this.setListInfo();
					this.SetListButtonInfo();
				})
				.catch(() => {

				})
		}

		/**猎人考试 */
		private onBtnHunterExamination() {
			if (Game.PlayerMissionSystem.missionActive.licence == this.focusCur - 1) {
				loadUI(licenseExamination)
					.then((dialog: licenseExamination) => {
						dialog.setInfo(Game.PlayerMissionSystem.missionActive.licence, this.focusCur, 1, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				toast_warning(TextsConfig.TextsConfig_Task.tishi);
			}
		}

		/**猎人社区 */
		private onBtnGetLicence1() {
			// loadUI(ZorkBossEnd).then((dialog: ZorkBossEnd) => {
			// 	dialog.show(UI.SHOW_FROM_TOP);
			// });
		}

		public btnCloseAndGo(maintype, subType) {
			if (this.cb) {
				this.cb();
			}
			Game.PlayerMissionSystem.getMission(maintype, subType)();
			egret.Tween.get(this).wait(200).call(() => {
				Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
				this.close();
			})
		}

		private onBtnClose() {
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
			this.close(UI.HIDE_TO_TOP);
		}

		private itemListInfo: Array<licenseProgressInfoItem> = [];
		private getItemListInfo() {
			this.itemListInfo = [];
			let missions = Game.PlayerMissionSystem.listForLicence();
			for (let i = 0; i < missions.length; i++) {
				let item = this.listInfo.getElementAt(i) as licenseProgressInfoItem;
				this.itemListInfo.push(item);
			}
		}

		////////////////////////////////////高级执照//////////////////////////////

		/**点击普通执照 */
		private onBtnNorMal() {
			this.groupHight.visible = false;
			this.groupCommon.visible = true;
			this.index = 1;
		}

		/**点击高级执照 */
		private onBtnHight() {
			if (Game.PlayerMissionSystem.missionActive.licence >= CommonConfig.licence_max_level) {
				this.index = 2;
				if (Game.PlayerMissionSystem.missionActive.licence == CommonConfig.licence_max_level) {
					this.focusCurH = 1;
				} else if (Game.PlayerMissionSystem.missionActive.licence == CommonConfig.high_licence_max_level + CommonConfig.licence_max_level) {
					this.focusCurH = CommonConfig.high_licence_max_level
				} else {
					this.focusCurH = Game.PlayerMissionSystem.missionActive.licence + 1 - CommonConfig.licence_max_level;
				}
			} else {
				toast_warning(TextsConfig.TextsConfig_Task.getSeven);
				return;
			}
			this.groupCommon.visible = false;
			this.groupHight.visible = true;
			this.setAwardListH();
			this.SetLicenseRightH();
			this.setListInfoH();
			this.setLabelListH();
			this.SetListButtonInfoH();
		}

		private SetLicenseRightH() {
			this.labelLicenseLevelInfoH.text = ("NO." + Game.PlayerInfoSystem.BaseInfo.id);
			let licence = Game.PlayerMissionSystem.missionActive.licence;
			this.imgHunterTitleH.source = (UIConfig.UIConfig_Task.Title[this.focusCurH + CommonConfig.licence_max_level]);
			Helper.SetStar(this.groupStarH, this.focusCurH, UIConfig.UIConfig_Task.highStarSmall, 1, 18);
			this.imgLevelAssessH.source = (UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
			this.imgLevelAwardH.source = (UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
			this.imgLevelPrerogativeH.source = (UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
		}
		/**奖励 */
		private setAwardListH() {
			let goods = Game.PlayerMissionSystem.itemLicense(this.focusCurH + CommonConfig.licence_max_level).reward_goods;
			let count = Game.PlayerMissionSystem.itemLicense(this.focusCurH + CommonConfig.licence_max_level).reward_count;
			let array: eui.ArrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < goods.length; i++) {
				let data = new licenseProgressItemData();
				data.goods = goods[i];
				data.count = count[i];
				data.index = i;
				// data.father = this;
				array.addItem(data);
			}
			this.listStarAwardH.dataProvider = array;
			this.listStarAwardH.itemRenderer = licenseProgressItem;
			this.listStarAwardH.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistStarAward, this);
		}

		/**领取执照 */
		private onBtnGetLicenceH() {
			Game.PlayerMissionSystem.MissionRewardLicence(this.focusCurH + CommonConfig.licence_max_level)
				.then((msg: message.GameInfo) => {
					Game.SoundManager.playEffect(SoundManager.SoundOpen(30016), 200);
					loadUI(licenseHunterUpStarHight)
						.then((dialog: licenseHunterUpStarHight) => {
							dialog.setInfo(this.focusCurH, msg, this, () => {

							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
					this.setListInfoH();
					this.SetListButtonInfoH();
				}).catch(() => {

				})
		}

		/**科目进度 */
		private setListInfoH() {
			let thisOne = this;
			let licenceReward = Game.PlayerMissionSystem.missionActive.licenceReward;
			let bGet = Table.FindF(licenceReward, (k, v) => {
				return v == thisOne.focusCurH + CommonConfig.licence_max_level;
			});

			let licence = Game.PlayerMissionSystem.missionActive.licence;

			if (this.teachNotGetTbl == null) {
				this.teachNotGetTbl = [];
			}

			this.listInfoH.visible = true;
			if (!this.CanseH || (bGet && this.focusCurH + CommonConfig.licence_max_level <= licence)) {
				let missions = Game.PlayerMissionSystem.listForHighLicence();
				this.groupExaminationH.visible = false;

				let array = new eui.ArrayCollection();
				for (let i = 0; i < missions.length; i++) {
					let data = new licenseProgressInfoItemData();
					data.index = i;
					data.father = this;
					data.focusCur = this.focusCurH;
					data.mission = missions[i];
					data.type = 2;
					array.addItem(data);
				}
				this.listInfoH.dataProvider = array;
				this.listInfoH.itemRenderer = licenseProgressInfoItem;
			} else {
				this.listInfoH.visible = false;
				this.setExeamH();
			}
		}

		/**猎人考试 */
		private setExeamH() {
			this.groupExaminationH.visible = true;
			let licence = Game.PlayerMissionSystem.missionActive.licence;
			let info = TableMissionLicence.Table();
			let thisOne = this;
			let licenceReward = Game.PlayerMissionSystem.missionActive.licenceReward;
			let bGet = Table.FindF(licenceReward, (k, v) => {
				return v == thisOne.focusCurH + CommonConfig.licence_max_level;
			});
			let infos = Game.PlayerMissionSystem.listForLicence();
			for (let kk in infos) {
				if (infos.hasOwnProperty(kk)) {
					let vv = infos[kk];
					let tbl = Game.PlayerMissionSystem.missionMap[vv.index];
					let starId = Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
					let start = starId + this.focusCurH - 1;
				}
			}
			//领取执照
			if (bGet && licence <= this.focusCurH + CommonConfig.licence_max_level) {
				this.groupNpcTalkH.visible = false;
				this.groupNpcTalk3.visible = true;
				this.labelExaminationInfo2.text = this.focusCurH.toString();
			} else {//考试
				this.groupNpcTalkH.visible = true;
				this.groupNpcTalk3.visible = false;
				this.labelExaminationInfo1.text = this.focusCurH.toString();
			}
		}

		/**高级执照特权信息 */
		private setLabelListH() {
			let strVip = PlayerVIPSystem.StrVip(this.focusCurH + CommonConfig.licence_max_level);
			let array = new eui.ArrayCollection();
			for (let i = 0; i < strVip.length; i++) {
				let data = new licenseProgressInfoItemBData();
				data.id = strVip[i];
				array.addItem(data);
			}
			this.listHunterInfoH.dataProvider = array;
			this.listHunterInfoH.itemRenderer = licenseProgressInfoItemB;
		}

		/**选择星级按钮列表高级 */
		public SetListButtonInfoH() {
			this.arrayH.removeAll();
			for (let i = 0; i < 5; i++) {
				let data = new licenseProgressLevelInfoData();
				data.isSel = (i == this.focusCurH - 1);
				data.index = i;
				data.father = this;
				data.type = 2;
				this.arrayH.addItem(data);
			}
			this.type = 2;
			this.listAllHunterH.dataProvider = this.arrayH;
			this.listAllHunterH.itemRenderer = licenseProgressLevelInfo;
			this.listAllHunterH.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListAllHunter1, this);
		}

		public setSelectH(index: number, Canse: boolean) {
			this.focusCurH = index;
			this.CanseH = Canse;
			this.setListInfoH();
			this.SetLicenseRightH();
			this.setAwardListH();
			this.SetListButtonInfoH();
			this.setLabelListH();
		}

		/**猎人考试高级 */
		private onBtnHunterExaminationH() {
			if (Game.PlayerMissionSystem.missionActive.licence == this.focusCurH + CommonConfig.licence_max_level - 1) {
				loadUI(licenseExamination)
					.then((dialog: licenseExamination) => {
						dialog.setInfo(Game.PlayerMissionSystem.missionActive.licence, this.focusCurH, 2, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				toast_warning(TextsConfig.TextsConfig_Task.tishi)
			}
		}

	}
}