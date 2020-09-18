namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-7-19
	 * 
	 * @class 猎人念力修炼
	 */
	export class HunterPsychicRefreshNew extends Dialog {
		private imgSkillTip: eui.Image;
		private btnClose: eui.Button;
		private groupPsychic1: eui.Group;
		private groupPsychic2: eui.Group;
		private groupPsychic3: eui.Group;
		private groupPsychic4: eui.Group;
		private groupPsychic5: eui.Group;
		private groupPsychic6: eui.Group;
		private groupPsychicBefore: eui.Group;
		private groupPsychicAfter: eui.Group;
		private groupMeterials: eui.Group;
		private imgFrameMeterials: eui.Image;
		private imgIconMeterials: eui.Image;
		private imgAddSkillMeterials: eui.Image;
		private labelNumMeterials: eui.Label;
		private groupAddSkillFragmentBig: eui.Group;
		private imgFrameSkillFrag: eui.Image;
		private imgIconSkillFrag: eui.Image;
		private imgAddSkillFragment: eui.Image;
		private labelBreakLevel: eui.BitmapLabel;
		private labelNumSkillFrag: eui.Label;
		private imgMakeSkillFragment: eui.Image;
		private groupBreakStar: eui.Group;
		private imgBreakAwaken: eui.Image;
		private btnFirstAwaken: eui.Button;
		private labelGoldNum: eui.Label;
		private groupAni: eui.Group;
		private groupAniBefore: eui.Group;
		private groupAniAfter: eui.Group;
		private groupMax: eui.Group;
		private groupPsychicMax: eui.Group;
		private groupRefresh: eui.Group;


		private showName = true;
		private showProp = true;
		private general_id = 0;
		private groupType = 0;
		private curSelectIndex = null;
		private nextSelectIndex = null;
		private aniItemCBFunc = null;
		private groupCBFunc = null;
		public commonHunterConsume: commonHunterConsume = new commonHunterConsume();
		private psyInfo = {};
		private groupInfo = {};
		private generalPsys = [];
		private selecteInfo = null;
		private psy_items = [];
		private upgrade_items = [];
		private curSelect = null;
		private nextSelect = null;
		private father: HunterPsychic;
		private cb: Function;
		private effAfterAni = null;
		private effMidAni = null;
		private effBeforeAni = null;
		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewSkin.exml";
			this.init();
			// Game.EventManager.on(GameEvent.PLAYER_BASE_INFO_CHANGE, this.reloadSelecte, this);
		}

		private init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnFirstAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFirstAwaken, this);
			this.groupMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMeterials, this);
			this.groupAddSkillFragmentBig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAddSkillFragmentBig, this);
			this.initTeach()
			this.initView()
			this.initUpgradeAni();

			this.commonHunterConsume.CB(() => {
				this.updateSelecteView();
			});
		}

		public setInfo(father, cb) {
			this.father = father;
			this.cb = cb;
			this.SetData();
			this.ReloadInfo();
		}

		private initTeach() {
			if (Teach.isDone(teachBattle.teachPartID_Psychic2) == false) {
				Teach.CheckAndSetTeach(teachBattle.teachPartID_Psychic2)
			}
		}

		private initView() {
			this.initPsychicItem()
		}

		private initUpgradeAni() {
			let thisOne = this;
			let initAfterAni = () => {
				let animationAfter_cb = () => {//armatureBack, movementType, movementID
					// if (movementType == ccs.MovementEventType.complete) {
					if (!this.groupAniBefore.visible) {
						this.groupAniBefore.visible = true;
						this.groupAni.visible = true;
						this.groupAniAfter.visible = true;
					}
					if (this.groupCBFunc != null) {
						this.groupCBFunc()
					}
					// }
				}
				if (this.effAfterAni == null) {
					Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							// this.remove(armatureDisplay);
							thisOne.effAfterAni = armatureDisplay;
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.stop();
								animationAfter_cb();
							}, thisOne)
							thisOne.effAfterAni.animation.play("001_jihuo", 1);
							thisOne.groupAniAfter.addChild(thisOne.effAfterAni);
						});
				} else {
					this.effAfterAni.animation.play("001_jihuo", 1);
				}
			}

			let initMidAni = () => {
				let animationMid_cb = () => {//armatureBack, movementType, movementID
					// if movementType == ccs.MovementEventType.complete then
					if (this.aniItemCBFunc != null && typeof (this.aniItemCBFunc) == "function") {
						this.aniItemCBFunc()
					}
					initAfterAni()
				}
				if (this.effMidAni == null) {
					Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							// this.remove(armatureDisplay);
							thisOne.effMidAni = armatureDisplay;
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.stop();
								animationMid_cb();
							}, thisOne)
							thisOne.effMidAni.animation.play("010_jiantou", 1);
							thisOne.groupAni.addChild(thisOne.effMidAni);
						});
				} else {
					this.effMidAni.animation.play("010_jiantou", 1);
				}
			}

			let animationBefore_cb = () => {
				initMidAni()
			}

			if (this.effBeforeAni == null) {
				Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
					.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
						// this.remove(armatureDisplay);
						thisOne.effBeforeAni = armatureDisplay;
						armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
							armatureDisplay.animation.stop();
							animationBefore_cb();
						}, thisOne)
						thisOne.effBeforeAni.animation.play("009_shanshuo", 1);
						thisOne.groupAniBefore.addChild(thisOne.effBeforeAni);
					});
			} else {
				this.effBeforeAni.animation.play("009_shanshuo", 1);
			}
			this.groupAniBefore.visible = false;
			this.groupAni.visible = false;
			this.groupAniAfter.visible = false;
		}

		// private remove(armatureDisplay) {
		// 	armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
		// 		armatureDisplay.animation.stop();
		// 		armatureDisplay.animation.reset();
		// 		armatureDisplay.armature.dispose();
		// 		armatureDisplay.dbClear();
		// 		armatureDisplay.dispose(true);
		// 		if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
		// 	}, null);
		// }

		private SetData() {
			this.general_id = this.father.generalId
			this.generalPsys = Game.PlayerHunterSystem.getGeneralPsychicAttri(this.general_id)
		}

		private ReloadInfo() {
			this.reloadData()
			this.reloadRight()
			this.reloadSelecte()
		}

		private reloadData() {
			let groupInfo = PlayerHunterSystem.getGeneralPsychicCurGroup(this.general_id)
			this.groupType = 0
			if ((this.groupInfo != null && Object.keys(this.groupInfo).length > 0) && groupInfo[1].psychic.level > this.groupInfo[1].psychic.level) {
				this.groupType = 1
			} else if ((this.groupInfo != null && Object.keys(this.groupInfo).length > 0) && groupInfo[2].psychic.level > this.groupInfo[2].psychic.level) {
				this.groupType = 2
			}
			this.groupInfo = groupInfo;
			this.psyInfo = PlayerHunterSystem.GetGeneralPsychicData(this.general_id)
		}

		private reloadRight() {
			if (this.curSelectIndex == null) {
				for (let i = 0; i < 6; i++) {
					this.psy_items[i].SetMainItemUI(this.generalPsys[i], this.psyInfo[i], true)
				}
			} else {
				this.psy_items[this.curSelectIndex - 1].SetMainItemUI(this.selecteInfo, this.psyInfo[this.curSelectIndex - 1], true, true);
			}
		}

		public reloadSelecte(index?) {
			this.updateSelecteData(index)
			this.updateSelecteView()
		}

		private updateSelecteData(index) {
			this.commonHunterConsume.SetConsumeSelection()
			this.nextSelectIndex = this.curSelectIndex || 1;
			this.curSelectIndex = index || this.curSelectIndex || 1
			this.selecteInfo = this.generalPsys[this.curSelectIndex - 1]

			this.curSelect = Table.DeepCopy(this.psyInfo[this.curSelectIndex - 1])
			this.nextSelect = Table.DeepCopy(this.curSelect)
			this.nextSelect.level += 1;
		}

		private updateSelecteView() {
			this.psy_items[this.nextSelectIndex - 1].SetSelectVisible(false)
			this.psy_items[this.curSelectIndex - 1].SetSelectVisible(true)

			if (this.psyInfo[this.curSelectIndex - 1].level >= CommonConfig.general_psychic_attri_max_level) {
				this.groupRefresh.visible = false;
				this.groupMax.visible = true;
			} else {
				this.groupRefresh.visible = true;
				this.groupMax.visible = false;

				this.upgrade_items[0].SetMainItemUI(this.selecteInfo, this.curSelect, true)
				this.upgrade_items[1].SetMainItemUI(this.selecteInfo, this.nextSelect, true)

				this.updateMaterials()
			}
		}

		private updateMaterials() {
			let curLevel = this.psyInfo[this.curSelectIndex - 1].level - 1;
			let goodsId = this.selecteInfo.consume_fridge[curLevel][0]
			let goods = PlayerItemSystem.Item(goodsId) as any;
			this.imgIconMeterials.source = goods.path;
			let count1 = Game.PlayerItemSystem.queryItem(goodsId).count;
			if (goodsId == 20006) {
				count1 = Game.PlayerInfoSystem.BaseInfo.psychicFruit;
			}
			let count2 = this.selecteInfo.consume_fridge[curLevel][1]
			let str_count1 = Helper.StringFormat("%d/%d", count1, count2)
			this.labelNumMeterials.text = str_count1;

			Set.LabelNumberGreenAndRed(this.labelNumMeterials, count1, count2)
			if (count1 >= count2) {
				this.imgAddSkillMeterials.visible = false
			} else {
				this.imgAddSkillMeterials.visible = true;
			}

			let general_id = this.selecteInfo.consume_general[curLevel]
			let level = this.selecteInfo.general_level[curLevel]
			let star = this.selecteInfo.general_star[curLevel]
			let awaken = this.selecteInfo.general_awaken[curLevel]
			count1 = this.commonHunterConsume.GetConsumeSelectionCount()
			count2 = this.selecteInfo.general_count[curLevel]
			str_count1 = Helper.StringFormat("%d/%d", count1, count2);
			this.labelNumSkillFrag.text = str_count1;
			Set.LabelNumberGreenAndRed(this.labelNumSkillFrag, count1, count2);

			let path_head = ""
			if (general_id == 0) {
				path_head = UIConfig.UIConfig_General.hunter_donnot_know
			}

			else {
				path_head = PlayerHunterSystem.Head(this.selecteInfo.consume_general[curLevel])
				let genTal = PlayerHunterSystem.Table(general_id)
				let path_aptitude = UIConfig.UIConfig_General.hunter_grade[genTal.aptitude]
				this.imgBreakAwaken.source = path_aptitude;
			}
			this.imgIconSkillFrag.source = path_head;
			this.imgBreakAwaken.visible = (general_id > 0)
			this.labelBreakLevel.text = (level) as string;
			this.labelBreakLevel.visible = (level > 0);
			Helper.SetHeroAwakenStar(this.groupBreakStar, star, awaken);
			if (count1 >= count2) {
				this.imgAddSkillFragment.visible = false;
				this.imgMakeSkillFragment.visible = false;
			} else {
				this.imgAddSkillFragment.visible = true;
				this.imgMakeSkillFragment.visible = true;
			}
			let goldNum = this.selecteInfo.consume_money[curLevel]
			this.labelGoldNum.text = goldNum
		}

		private initPsychicItem() {
			for (let i = 1; i <= 6; i++) {
				let item = newUI(HunterPsychicItem) as HunterPsychicItem;
				this.psy_items.push(item)
				item.setInfo(this, i, null);
				item.x = -(115 / 2);
				item.y = -(115 / 2);
				this["groupPsychic" + i].addChild(item);
			}

			let before = newUI(HunterPsychicItem) as HunterPsychicItem;
			this.upgrade_items.push(before)
			before.setInfo(this, 1, true);
			before.SetSelectVisible(true)
			before.x = -before.width / 2;
			before.y = -before.height / 2;
			this.groupPsychicBefore.addChild(before);

			let after = newUI(HunterPsychicItem) as HunterPsychicItem;
			this.upgrade_items.push(after)
			after.setInfo(this, 1, true);
			after.x = -after.width / 2;
			after.y = -after.height / 2;
			this.groupPsychicAfter.addChild(after);
		}

		/**点击修炼 */
		private onBtnFirstAwaken() {
			if (this.imgAddSkillMeterials.visible) {
				toast_warning(TextsConfig.TextsConfig_Hunter_psychic.psychic_fruits_insufficient);
				return;
			}
			if (this.imgAddSkillFragment.visible) {
				toast_warning(TextsConfig.TextsConfig_Hunter_psychic.psychic_material_insufficient);
				return;
			}


			let generals = this.commonHunterConsume.GetConsumeSelection()
			Game.PlayerHunterSystem.generalPsychicRefresh(this.general_id, (this.curSelectIndex - 1), generals)
				.then(() => {
					for (let i = 0; i < generals.length; i++) {
						Game.PlayerHunterSystem.deleteHunterById(generals[i]);
					}
					this.deleteGeneral();
					this.checkPsychicUpdate();
					// this.DoUpgradeGroup();

					this.SetData();
					this.ReloadInfo();
					if (this.cb) {
						this.cb();
					}
				}).catch(() => {

				})
		}

		private DoUpgradeGroup() {
			if (this.groupType > 0) {
				TipManager.GetPsychicGroup(this, this.groupInfo[this.groupType], () => { })
			}
		}

		private deleteGeneral() {
			let refreshGeneral = () => {
				// this.father.father.heroesUI.CallGeneralToGeneral()
			}
			this.commonHunterConsume.DeleteConsumedGeneral(() => { refreshGeneral(); })
		}

		private checkPsychicUpdate() {
			// _lock(this)
			if (this.groupCBFunc == null || this.aniItemCBFunc == null) {
				this.groupCBFunc = this.DoUpgradeGroup;
				// this.aniItemCBFunc = ccbk(this, this.ReloadInfo)
			}
			this.effBeforeAni.animation.play("009_shanshuo", 1);
		}

		/**点击念力果 */
		private onGroupMeterials() {
			let goodsId = this.selecteInfo.consume_fridge[this.curSelect.level][0];
			loadUI(Common_OutPutDialog)
				.then((dialog: Common_OutPutDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(goodsId, this, () => {
						// this.onBtnClose();
					});
				});
		}

		/**点击修炼材料 */
		private onGroupAddSkillFragmentBig() {
			let cur_level = this.curSelect.level;
			let csmCounts = this.selecteInfo.general_count[cur_level - 1];
			let defaultInfo = {
				general_id: this.selecteInfo.consume_general[cur_level - 1],
				level: this.selecteInfo.general_level[cur_level - 1],
				star: this.selecteInfo.general_star[cur_level - 1],
				awaken: this.selecteInfo.general_awaken[cur_level - 1],
			}
			let hunterInfo = PlayerHunterSystem.getCanRefinePsychicHunter(this.general_id, this.selecteInfo, cur_level)
			hunterInfo.unshift(defaultInfo);

			this.commonHunterConsume.OpenHunterConsumeUI(hunterInfo, csmCounts)
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}

	export class commonHunterConsume {
		private consumeSels = [11];
		private hunterInfo = [];
		private csmCounts = 0;
		private cb: Function;
		public initData() {

		}

		public CB(cb?) {
			this.cb = cb;
		}

		public OpenHunterConsumeUI(hunterInfo, csmCounts) {
			loadUI(HunterPsychicRefreshNewPop).then((dialog: HunterPsychicRefreshNewPop) => {
				dialog.SetInfo(this.consumeSels, hunterInfo, csmCounts, this);
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		public GetConsumeSelection() {
			return this.consumeSels;
		}

		public SetConsumeSelection(consumeSels?) {
			this.consumeSels = consumeSels || [];
			if (this.cb && consumeSels) {
				this.cb();
			}
		}

		public GetConsumeSelectionCount() {
			return Object.keys(this.consumeSels).length;
		}

		public DeleteConsumedGeneral(cb) {
			for (let k in this.consumeSels) {
				if (this.consumeSels.hasOwnProperty(k)) {
					let v = this.consumeSels[k];

					if (v != 0 && v != -1) {
						let [_, general_k] = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (_k, _v) => {
							return _v.general_id == v
						})
						if (general_k != null) {
							Game.PlayerHunterSystem.queryAllHunters().splice(general_k)
						}
						Game.PlayerHunterSystem.allHuntersMap()[v] = null;
					}
				}
			}
			if (cb != null) {//and type(cb) == "function" 
				cb()
			}
			this.consumeSels = null;
		}
	}
}