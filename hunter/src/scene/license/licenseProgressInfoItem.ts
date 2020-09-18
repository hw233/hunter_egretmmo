namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-20
	 * 
	 * @class 执照主界面考核list子项
	 */
	export class licenseProgressInfoItem extends eui.ItemRenderer {
		private imgMap: eui.Image;
		private imgName: eui.Image;
		private imgTips: eui.Image;
		private labelInfo: eui.Label;
		private groupAward: eui.Group;
		private imgItemFrame: eui.Image;
		private imgItemIcon: eui.Image;
		private labelItemNum: eui.BitmapLabel;
		private imgItemGet: eui.Image;
		private groupAni: eui.Group;
		private btnAward: eui.Button;
		private btnGetAward: eui.Button;
		private imgGetAward: eui.Image;
		private btnTransfer: eui.Button;
		private btnPlayer: eui.Button;
		private GroupCartoon: eui.Group;
		/**教学 */
		private teachCanGet: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/license/licenseProgressInfoItemSkin.exml";
			cachekeys(<string[]>UIResource["licenseProgressInfoItem"], null);
			let tap = egret.TouchEvent.TOUCH_TAP;
			this.btnAward.addEventListener(tap, this.onBtnAward, this);
			this.btnGetAward.addEventListener(tap, this.onBtnGetAward, this);
			this.btnPlayer.addEventListener(tap, this.onBtnPlayer, this);
			this.btnTransfer.addEventListener(tap, this.onBtnTransfer, this);
			this.groupAward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupAward, this)
		}

		/** 修改数据源被动执行*/
		protected dataChanged() {
			let data = this.data as licenseProgressInfoItemData;
			let tbl = Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
			this.imgTips.visible = false;
			if (data.type == 2) {
				this.imgName.source = cachekey(UIConfig.UIConfig_Task.ExaminationHigh[data.index + 1], this);
				this.imgMap.source = cachekey(UIConfig.UIConfig_Task.HighMap[data.index + 1], this);
			} else {
				this.imgName.source = cachekey(UIConfig.UIConfig_Task.Examination[data.index + 1], this);
				this.imgMap.source = cachekey(UIConfig.UIConfig_Task.Map[data.index + 1], this);
			}


			let list = Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
			let list_1 = Game.PlayerMissionSystem.GetMaxCondition(data.mission.index);
			let star = Game.PlayerMissionSystem.GetMaxStar(data.mission.index);
			let mission = Game.PlayerMissionSystem.missionMap[data.mission.index];
			let starId = Game.PlayerMissionSystem.itemSubType(data.mission.index).start_id;
			let missionId = mission.missionId;
			let start = starId + data.focusCur - 1;
			let endId = Game.PlayerMissionSystem.itemSubType(data.mission.index).end_id;
			let subId = Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
			let condition = 0;
			if (data.type == 1) {
				condition = Game.PlayerMissionSystem.itemInfo(700000 + (data.index + 1) * 10000 + data.focusCur).condition;
			} else {
				condition = Game.PlayerMissionSystem.itemInfo(13000000 + subId * 100 + data.focusCur).condition;
			}

			let max = 0;
			let instaned = 0;
			let map = TableInstance.Table();
			for (let kk in map) {
				if (map.hasOwnProperty(kk)) {
					let vv = map[kk];
					if (Number(kk) > instaned) {
						instaned = Number(kk);
					}
				}
			}
			let value: number = 200002;
			let condition_be;
			let condition_naxe;
			let valuebe: number;
			let valueNext;
			if (subId == 25 || subId == 97 || subId == 96) {
				value = mission.value;
			} else if (subId == 55 || subId == 69) {
				value = mission.value % 10000;
			} else if (subId == 2) {
				value = mission.value;
				if (value > 100112 && data.type == 1) {
					value = 100112;
				}
				//条件
				[condition_be, condition_naxe] = this.ChapterIdx(condition);
				//进度
				if (value == 100000) {
					valuebe = 0;
					valueNext = 0;
				} else {
					[valuebe, valueNext] = this.ChapterIdx(value);
				}
			} else {
				if (mission.valueEx.length == 0) {
					value = 0;
				} else {
					let IsHave: boolean;
					for (let [kk, vv] of HelpUtil.GetKV(list)) {
						IsHave = Table.FindF(mission.valueEx, (k, v) => {
							return vv.condition == v;
						})
					}
					if (IsHave == true || IsHave == null) {
						for (let kk in mission.valueEx) {
							if (mission.valueEx.hasOwnProperty(kk)) {
								let vv1 = mission.valueEx[kk];
								if (vv1 > max) {
									max = vv1;
									value = max;
								}
							}
						}
					} else {
						for (let kk in list_1) {
							if (list_1.hasOwnProperty(kk)) {
								let vv2 = list_1[kk];
								if (vv2.id > max) {
									max = vv2.id;
									value = vv2.condition;
								}
							}
						}
					}
				}
				let conditionEnd = Game.PlayerMissionSystem.itemInfo(endId).condition;
				if (value > conditionEnd) {
					value = conditionEnd;
				}
				if (value > instaned) {
					value = instaned;
				}

				[condition_be, condition_naxe] = this.ChapterIdx(condition);

				let maxIndex = -1;
				let listNaxt = [];
				for (let kk in list_1) {
					if (list_1.hasOwnProperty(kk)) {
						let vv = list_1[kk];
						if (vv.id == 720001) {
							listNaxt.push(kk);
							if (listNaxt.length == 2) {
								if (Number(kk) > maxIndex) {
									maxIndex = Number(kk);
									list_1.splice(maxIndex);
								}
							}
						}
					}
				}

				if (list_1.length == 0) {
					if (value == 0) {
						valuebe = 0;
						valueNext = 0;
					} else if (data.focusCur == list_1.length + 1 && data.focusCur == 1) {
						[valuebe, valueNext] = this.ChapterIdx(value);
					} else {
						valueNext = 0;
					}
				} else {
					if (value == 0) {
						valuebe = 0;
						valueNext = 0;
					} else if (data.focusCur <= list_1.length || data.focusCur == 1) {
						valueNext = 5;
					} else if (value % 100000 % 10 != 5 && data.focusCur == list_1.length + 1) {
						[valuebe, valueNext] = this.ChapterIdx(value);
					} else {
						valueNext = 0;
					}
				}
			}

			let level_val = 1;
			let level_con = 1;

			let value_str = TextsConfig.TextsConfig_DarkLand.levelDes[level_val];
			let cond_str = TextsConfig.TextsConfig_DarkLand.levelDes[level_con];
			if (data.type == 2 && data.index == 1) {
				level_val = PlayerDarkSystem.GetLevelByHurt(1, value);
				level_con = PlayerDarkSystem.GetLevelByHurt(1, condition);
				value_str = TextsConfig.TextsConfig_DarkLand.levelDes[level_val + 1];
				cond_str = TextsConfig.TextsConfig_DarkLand.levelDes[level_con + 1];
			}
			let des = 0;
			if (data.type == 2 && data.index == 2 && value >= condition) {
				if (value - 10000 < 0) {
					des = 0;
				} else {
					des = value - 10000;
				}
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioned, des, condition - 10000));
			} else if (data.type == 2 && data.index == 2 && value < condition) {
				if (value - 10000 < 0) {
					des = 0;
				} else {
					des = value - 10000;
				}
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioning, des, condition - 10000));
			} else if (data.index >= 2 && value >= condition) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioned, value, condition));
			} else if (data.index >= 2 && value < condition) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioning, value, condition));
			} else if (data.index == 0 && valuebe > condition_be) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.instanced, valuebe, valueNext, condition_be, condition_naxe));
			} else if (data.index == 0 && valuebe == condition_be && valueNext >= condition_naxe) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.instanced, valuebe, valueNext, condition_be, condition_naxe));
			} else if ((data.index == 0 && valuebe < condition_be) || (data.index == 0 && valuebe == condition_be && valueNext < condition_naxe)) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.instancing, valuebe, valueNext, condition_be, condition_naxe));
			} else if (data.index == 1 && valueNext >= condition_naxe && valueNext != 0) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioned, valueNext, condition_naxe));
			} else if (data.type == 2 && data.index == 1 && value >= condition) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioned, value_str, cond_str));
			} else if (data.type == 2 && data.index == 1 && value < condition) {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioning, value_str, cond_str));
			} else {
				this.labelInfo.textFlow = Util.RichText(list[data.focusCur - 1].des + Helper.StringFormat(TextsConfig.TextsConfig_Task.conditioning, valueNext, condition_naxe));
			}

			if (data.index > 1 || (data.type == 2 && data.index == 1)) {
				if (value >= condition && missionId < start) {//可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (value >= condition && missionId == start && mission.isFinish == false) { //可领取
					this.groupAward.visible = true;
					this.btnTransfer.visible = false;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (value >= condition && missionId >= start) { //已完成
					this.groupAward.visible = false;
					this.imgGetAward.visible = true;
					this.imgGetAward.source = cachekey(UIConfig.UIConfig_Task.ActivityType.Typeed, this);
					this.btnPlayer.visible = false;
					this.btnTransfer.visible = false;
					this.btnAward.visible = false;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = false;
				} else {
					this.btnTransfer.visible = true;
					this.btnPlayer.visible = false;
					this.imgGetAward.visible = false;
					this.btnGetAward.visible = true;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = false;
				}
			} else if (data.index == 0) {
				if (valuebe > condition_be && missionId < start && star + 1 != data.focusCur) { //可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (valuebe > condition_be && missionId == start && mission.isFinish == false) {//可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (valuebe == condition_be && valueNext >= condition_naxe && missionId <= start && mission.isFinish == false) {//可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if ((valuebe >= condition_be && missionId > start) || (valuebe == condition_be && valueNext >= condition_naxe && missionId > start) || mission.isFinish) {//已完成
					this.groupAward.visible = false;
					this.imgGetAward.visible = true;
					this.imgGetAward.source = cachekey(UIConfig.UIConfig_Task.ActivityType.Typeed, this);
					this.btnPlayer.visible = false;
					this.btnTransfer.visible = false;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = false;
				} else {
					this.imgGetAward.visible = false;
					this.btnTransfer.visible = true;
					this.btnPlayer.visible = false;
					this.btnAward.visible = true;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = false;
				}
			} else if (data.type == 1 && data.index == 1) {
				if (valueNext >= condition_naxe && missionId < start && star + 1 != data.focusCur) {//可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (valueNext >= condition_naxe && missionId == start && mission.isFinish == false) { //可领取
					this.groupAward.visible = true;
					this.groupAward.x = this.width / 2;
					this.groupAward.y = this.height / 2;
					this.btnTransfer.visible = false;
					this.btnPlayer.visible = true;
					this.imgGetAward.visible = false;
					this.btnAward.visible = true;
					this.lingqu();
					this.teachCanGet = true;
				} else if (valueNext >= condition_naxe && missionId >= start) {//已完成
					this.groupAward.visible = false;
					this.imgGetAward.visible = true;
					this.btnTransfer.visible = false;
					this.imgGetAward.source = cachekey(UIConfig.UIConfig_Task.ActivityType.Typeed, this);
					this.btnPlayer.visible = false;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = true;
				} else {
					this.imgGetAward.visible = false;
					this.btnTransfer.visible = true;
					this.btnAward.visible = true;
					this.btnPlayer.visible = false;
					this.GroupCartoon.removeChildren();
					this.teachCanGet = false;
				}
			} else {
				this.groupAward.visible = false;
				this.imgGetAward.visible = false;
				this.btnTransfer.visible = true;
				this.btnAward.visible = true;
				this.teachCanGet = false;
			}

			let subMission = Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
			for (let kk in subMission) {
				if (subMission.hasOwnProperty(kk)) {
					let vv = subMission[kk];
					if (Number(kk) == data.focusCur - 1) {
						let itemSet = PlayerItemSystem.Set(vv.reward_goods[0][0]) as any;
						this.imgItemFrame.source = cachekey(itemSet.Frame, this);
						this.imgItemIcon.source = cachekey(itemSet.Path, this);
						this.labelItemNum.text = vv.reward_goods[0][1].toString();
					}
				}
			}
			if (data.father.teachNotGetTbl[data.index] == null) {
				data.father.teachNotGetTbl[data.index] = this.teachCanGet;
			}
		}

		public ChapterIdx(id) {
			let chapterNormal = TableChapterNormal.Table();
			let chapterElite = TableChapterElite.Table();
			if (ckid(id)) {
				return null;
			}
			let tbl;
			if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				tbl = chapterNormal;
			} else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				tbl = chapterElite;
			} else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
				return null;
			} else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				return null;
			}

			for (let v in tbl) {
				if (tbl.hasOwnProperty(v)) {
					let k = tbl[v];
					for (let vv in k.chapter_pack) {
						if (k.chapter_pack.hasOwnProperty(vv)) {
							let kk = k.chapter_pack[vv];
							if (id == kk) {
								return [Number(v), Number(vv) + 1];
							}
						}
					}
				}
			}
			return null;
		}

		private lingqu() {
			//ui_tongyong_lingqu
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_lingqu", "armatureName", "000_lingqu", 0)
				.then(display => {
					display.touchEnabled = false;
					this.GroupCartoon.addChild(display);
					this.btnAward.touchEnabled = false;
					this.groupAward.touchEnabled = false;
					this.btnGetAward.touchEnabled = false;
					this.GroupCartoon.touchEnabled = false;
				}).catch(reason => {

				});
		}

		private onBtnAward() {
			this.btnTransfer.enabled = false;
			// TipManager.ShowProp();
			console.log();

		}

		private onBtnGetAward() {
			console.log();

		}

		private onBtnPlayer() {
			let data = this.data as licenseProgressInfoItemData;
			let info = Game.PlayerMissionSystem.missionMap[data.mission.index];
			let missionId = info.missionId;
			let starId = Game.PlayerMissionSystem.itemSubType(data.mission.index).start_id;
			let tbl = Game.PlayerMissionSystem.itemInfo(starId + data.focusCur - 1);
			let subId = Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
			let start = starId + data.focusCur - 1;
			let missionIdNaxt = missionId - starId;
			let canGet = data.focusCur - missionIdNaxt;
			let value = info.value;
			let star = Game.PlayerMissionSystem.GetMaxStar(data.mission.index);
			let conditionItem = Game.PlayerMissionSystem.itemInfo(starId).condition;
			let list = Game.PlayerMissionSystem.GetMaxCondition(data.mission.index);
			let condition
			if (data.type == 1) {
				condition = Game.PlayerMissionSystem.itemInfo(700000 + (data.index + 1) * 10000 + data.focusCur).condition;
			} else {
				condition = Game.PlayerMissionSystem.itemInfo(13000000 + subId * 100 + data.focusCur).condition;
			}
			let max = 0;
			if (subId == 55 || subId == 69) {
				value = info.value % 10000;
			} else if (subId == 3) {
				if (info.valueEx.length == 0) {
					value = 0;
				} else {
					let IsHave: boolean;
					for (let [kk, vv] of HelpUtil.GetKV(list)) {
						IsHave = Table.FindF(info.valueEx, (k, v) => {
							return vv.condition == v;
						})
					}
					if (IsHave == true || IsHave == null) {
						for (let kk in info.valueEx) {
							if (info.valueEx.hasOwnProperty(kk)) {
								let vv = info.valueEx[kk];
								if (vv > max) {
									max = vv
									value = max;
								}
							}
						}
					} else {
						for (let kk in list) {
							if (list.hasOwnProperty(kk)) {
								let vv = list[kk];
								if (vv.id > max) {
									max = vv.id;
									value = vv.condition;
								}
							}
						}
					}
				}
			}

			if (value >= condition && missionId < start && canGet < 2 && value != 0) {
				this.reqReward();
			} else if (value >= condition && missionId == start && info.isFinish == false) {
				this.reqReward();
			} else if (value >= tbl.condition && canGet >= 2) {
				toast_warning(TextsConfig.TextsConfig_Task.canGet)
			} else {
				return;
			}
		}

		private reqReward() {
			let data = this.data as licenseProgressInfoItemData;
			let subType = Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
			let type;
			if (data.type == 1) {
				type = message.MissionType.MISSION_TYPE_LICENCE;
			} else {
				type = message.MissionType.MISSION_TYPE_HIGH_LICENCE;
			}
			Game.PlayerMissionSystem.ReqReward(type, subType)
				.then((response: message.MissionRewardResponse) => {
					if (!Teach.BeInTeaching() || (Teach.nOperateTeachPart != teachBattle.teachPartID_Lisence_Exam)) {
						loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
							dialog.init(response.body.gameInfo.getGoods);
							dialog.show();
						});
					}
					let licenseID
					if (data.type == 1) {
						licenseID = Game.PlayerMissionSystem.SetExamination(data.focusCur);
						data.father.setSelect(data.focusCur, licenseID.length == 4);
					} else {
						licenseID = Game.PlayerMissionSystem.SetExaminationHigh(data.focusCur);
						data.father.setSelectH(data.focusCur, licenseID.length == 4);
					}
					this.btnTransfer.visible = false;
				})
				.catch((resule) => {
					toast_warning(resule);
				})
		}

		private onGroupAward(e: egret.TouchEvent) {
			if (this.groupAward.x == this.width / 2) {
				this.onBtnPlayer();
				return;
			}
			let data = this.data as licenseProgressInfoItemData;
			let info = new message.GoodsInfo();
			let subMission = Game.PlayerMissionSystem.GetItemMissionId(data.mission.index)[data.focusCur - 1];
			info.goodsId = subMission.reward_goods[0][0];
			info.count = subMission.reward_goods[0][1];
			data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
		}

		private onBtnTransfer() {
			let data = this.data as licenseProgressInfoItemData;
			let info = Game.PlayerMissionSystem.missionMap[this.data.mission.index];
			data.father.btnCloseAndGo(info.type, info.subType);
		}
	}

	export class licenseProgressInfoItemData {
		index: number;
		mission: TableMissionType;
		father: licenseMain;
		focusCur: number;
		type: number;
	}
}