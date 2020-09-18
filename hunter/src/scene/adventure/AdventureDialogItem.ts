namespace zj {

	/**
	 * 副本界面-关卡列表
	 * zhaiweili
	 * 2019.11.7
	 */
	export class AdventureDialogItem extends UI {
		public static colorPass: number = 0x16fa5b;
		public static colorCurr: number = 0xe84f33;
		public static colorNo: number = 0xaaaaaa;
		private groupTop: eui.Group;
		private groupBottom: eui.Group;
		private imgCurrTitilBG: eui.Image;
		private imgCurrIcon: eui.Image;
		private lbTitle: eui.Label;
		private lbName: eui.Label;

		private listDrag: eui.List;
		private listDragData: eui.ArrayCollection = new eui.ArrayCollection();
		private imgPassStars: eui.Image[];

		private groupFirst: eui.Group;// 首杀group
		private imgFrameFirst: eui.Image;// 首杀奖励框
		private imgIconFirst: eui.Image;// 首杀奖励图标
		private groupFirstBlood: eui.Group;// 首杀动画group
		private labelFirstBlood: eui.BitmapLabel;// 首杀奖励数量
		private imgGiftGet: eui.Image;

		private groupFirst1: eui.Group;// 首杀group
		private imgFrameFirst1: eui.Image;// 首杀奖励框
		private imgIconFirst1: eui.Image;// 首杀奖励图标
		private labelFirstBlood1: eui.BitmapLabel;// 首杀奖励数量

		private btnSweep5: eui.Button;// 扫荡N次
		// private labelLeftTimes: eui.BitmapLabel;// 扫荡次数
		private btnSweep: eui.Button;// 扫荡
		private btnDekaron: eui.Button;// 进入战斗
		// private labelStrengthNum: eui.BitmapLabel;// 战斗消耗体力

		private groupLeftTimes: eui.Group;
		private labelTimeNum: eui.Label;
		private btnTimeAdd: eui.Button;

		private imgMask: eui.Image;

		private currArea: TableInstanceArea;
		private currChapter: TableChapterNormal;
		private currData: TableInstance;
		private curMobInfo: message.MobInfo;
		private father;

		private topHeight: number;
		private bottomHeight: number;

		private isOpen: boolean;
		public constructor() {
			super();
			this.skinName = "resource/skins/adventure/AdventureDialogItemSkin.exml";
			this.onInit();
		}

		public onInit(){// 本类构造函数调用，外部组件时，不调用构造函数，需外部调用
			this.topHeight = this.groupTop.height;
			this.bottomHeight = this.groupBottom.height;
			this.isOpen = false;
			this.imgPassStars = [this["imgPassStar0"], this["imgPassStar1"], this["imgPassStar2"]];
			this.initClose();
		}

		public init(father, area: TableInstanceArea, chapter: TableChapterNormal, data: TableInstance, idx: number) {
			this.father = father;
			this.currArea = area;
			this.currChapter = chapter;
			this.currData = data;
			this.lbTitle.text = chapter.chapter_id + "-" + (idx + 1);
			this.lbName.text = data.instance_name;

			this.btnDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDekaron, this);
			this.btnSweep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSweep, this);
			this.btnSweep5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSweep5, this);
			this.btnTimeAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTimeAdd, this);
			this.groupFirst.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
			this.groupFirst1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
			this.groupTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
			this.updateUI();
		}
		public getBottomHeight(){
			return this.bottomHeight;
		}
		public getTopHeight(){
			return this.topHeight;
		}
		private onTouchItem(){
			if(this.isOpen){
				this.father.onTouchItem(this);
			}
		}
		public startAniOpen(){
			this.groupBottom.visible = true;
			let tw = egret.Tween.get(this.groupBottom);
			tw.to({scaleY: 1}, AdventureDialog.aniTime);

			let twt = egret.Tween.get(this);
			twt.to({height: this.bottomHeight + this.topHeight}, AdventureDialog.aniTime);
			tw.call(this.openFinish, this);
		}
		public startAniClose(){
			let tw = egret.Tween.get(this.groupBottom);
			tw.to({scaleY: 0}, AdventureDialog.aniTime);

			let twt = egret.Tween.get(this);
			twt.to({height: this.topHeight}, AdventureDialog.aniTime);
			tw.call(this.closeFinish, this);
		}

		private openFinish(){
			egret.Tween.removeTweens(this);
			egret.Tween.removeTweens(this.groupBottom);
			this.father.onItemAniFinish(1);
		}
		private closeFinish(){
			this.groupBottom.visible = false;
			egret.Tween.removeTweens(this);
			egret.Tween.removeTweens(this.groupBottom);
			this.father.onItemAniFinish(0);
		}

		public initOpen(){
			// 初始为打开状态
			this.groupBottom.scaleY = 1;
			this.groupBottom.visible = true;
			this.height = this.topHeight + this.bottomHeight;
		}
		public initClose(){
			// 初始为关闭状态
			this.groupBottom.scaleY = 0;
			this.groupBottom.visible = false;
			this.height = this.topHeight;
		}

		private getCurrInstanceInfo(): CustomInstanceInfo{
			return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
		}

		public updateUI() {
			let data = this.currData;

			let currInfo = this.getCurrInstanceInfo();
			let maxMobId = currInfo.maxMobID;
			let myMobId = data.instance_id;
			let mobInfo: message.MobInfo = currInfo.mobsMap[myMobId];
			this.curMobInfo = mobInfo;

			let type = -1;// 类型：0-已打完，1-当前关卡，2-未开启
			let star = 0;
			this.imgMask.visible = false;
			let color = 0;
			if (myMobId < maxMobId) {// 已打完
				type = 0;
				star = mobInfo ? mobInfo.star : 0;
				// 星数
				for(let i = 0; i < 3; ++i){
					if(i < star){
						this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_png", this.father);
					} else {
						this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_gary_png", this.father);
					}
				}
				this.groupLeftTimes.visible = data.challenge_num > 0;
				color = AdventureDialogItem.colorPass;
			} else if (myMobId == maxMobId) {// 当前关卡
				type = 1;
				// this.groupLeftTimes.visible = data.challenge_num > 0;
				this.groupLeftTimes.visible = false;
				color = AdventureDialogItem.colorCurr;
				for(let i = 0; i < 3; ++i){
					this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_gary_png", this.father);
				}
			} else {// 未开启
				type = 2;
				// this.imgMask.visible = true;
				this.groupLeftTimes.visible = false;
				color = AdventureDialogItem.colorNo;
				for(let i = 0; i < 3; ++i){
					this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_gary_png", this.father);
				}
			}
			this.lbName.textColor = type == 2 ? color : 0xFFFFFF;
			this.isOpen = type != 2;
			this.imgCurrIcon.visible = type == 1;
			this.lbTitle.textColor = color;
			if(type == 1){// 当前关卡
				this.imgCurrTitilBG.source = cachekey("ui_instancenew_dialog_item_title_bg1_png", this.father);
			} else {
				this.imgCurrTitilBG.source = cachekey("ui_instancenew_dialog_item_title_bg0_png", this.father);
			}
			this.imgGiftGet.visible = false;
			let itemSet = PlayerItemSystem.Set(data.first_reward[0][0], 1, data.first_reward[0][1]) as any;
			if(type != 0){
				this.imgFrameFirst1.source = cachekey(itemSet.Frame, this.father);
				this.imgIconFirst1.source = cachekey(itemSet.Path, this.father);
				let num = data.first_reward[0][1];
				this.labelFirstBlood1.text = num > 1 ? ("x" + num) : "";
				this.groupFirst1.visible = true;
			} else {
				this.groupFirst1.visible = false;
			}
			
			if (type != 2) {
				// 首杀
				this.imgFrameFirst.source = cachekey(itemSet.Frame, this.father);
				this.imgIconFirst.source = cachekey(itemSet.Path, this.father);
				this.labelFirstBlood.text = "x" + Set.NumberUnit3(data.first_reward[0][1]);
				this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
				this.groupFirst.visible = true;

				if (mobInfo && mobInfo.firstReward) {
					this.imgGiftGet.visible = true;
				}

				this.btnSweep5.enabled = (star > 0);
				this.btnSweep.enabled = (star > 0);
				// this.labelLeftTimes.visible = (star > 0);
				// 挑战次数
				if (data.challenge_num > 0) {
					let count: number = data.challenge_num * (1 + mobInfo.buyTime) - mobInfo.dayTime;
					this.labelTimeNum.text = TextsConfig.TextsConfig_Common.remainder + ":" + (count + "/" + data.challenge_num);
					if (count <= 0) {
						this.labelTimeNum.textColor = 0xFF0000;
						this.btnTimeAdd.visible = true;
						// this.labelLeftTimes.text = data.challenge_num.toString();
						this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, data.challenge_num);
					} else {
						this.labelTimeNum.textColor = AdventureDialogItem.colorPass;
						this.btnTimeAdd.visible = false;
						this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, count);
						// this.labelLeftTimes.text = count.toString();
					}
				} else if (mobInfo) {
					// 不限次数
					this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, 5);
				}
				// 体力
				// this.labelStrengthNum.text = "" + (data.challenge_win + data.challenge_start);
				(this.btnDekaron["labelCount"] as eui.Label).text = "" + (data.challenge_win + data.challenge_start);
				// 掉落
				this.updateDrag(data);
			}
		}
		private updateDrag(data: TableInstance) {
			this.listDragData.removeAll();
			for (let i = 0; i < data.challenge_goods.length; i++) {
				let itemData = new Common_ItemData();
				itemData.info = data.challenge_goods[i];
				itemData.father = this;
				itemData.type = itemData.CurState.Drop;
				itemData.scale = 0.74;
				this.listDragData.addItem(itemData);
			}
			this.listDrag.dataProvider = this.listDragData;
			this.listDrag.itemRenderer = Common_Item;
		}

		//添加龙骨动画
		private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, aniName: string) {
			Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animationName, playTimes)
				.then(display => {
					display.x = group.explicitWidth / 2 + 1;
					display.y = group.explicitHeight / 2;
					display.name = aniName;
					if (group.getChildByName(aniName) == null) {
						group.addChild(display);
					}
					display.scaleX = 0.5;
					display.scaleY = 0.5;
				})
				.catch(reason => {
					// toast(reason);
				});
		}
		private onBtnDekaron() {
			let power: number = Game.PlayerInfoSystem.BaseInfo.power;
			let num: number = this.currData.challenge_win + this.currData.challenge_start;
			if (power < num) {
				loadUI(HXH_HunterUserStrength)
					.then((dialog: HXH_HunterUserStrength) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.SetInfo();
					});
			}
			else {
				let info = this.getCurrInstanceInfo();
				info.curMobID = this.curMobInfo.mobId;
				info.curChapterID = this.currChapter.chapter_id;
				info.curAreaID = this.currArea.area_id;
				let id = this.currData.instance_id;
				Game.PlayerInstanceSystem.MobsInfo_Req(id)
					.then((value: {}) => {
						Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
						Game.PlayerFormationSystem.blowGuide = id;
						loadUI(CommonFormatePveMain)
							.then((dialog: CommonFormatePveMain) => {
								dialog.show(UI.SHOW_FROM_TOP);
								dialog.setInfo(id);
							});
					})
					.catch((reason) => {
						// toast(Helper.GetErrorString(reason));
					});
				// Teach.addTeaching();
			}
		}

		private onBtnSweep() {
			if (Game.PlayerInstanceSystem.CheckPower(this.currData.instance_id, 0) == false) {
				this.buyPower();
			}
			else {
				this.goSweep(1, false);
			}
		}

		private buyPower() {
			loadUI(HXH_HunterUserStrength)
				.then((dialog: HXH_HunterUserStrength) => {
					dialog.SetInfo();
					dialog.show(UI.SHOW_FROM_TOP);
				});
			// this.updateUI();
		}
		private goSweep(times: number, is_down: boolean) {
			// this.CheckChallengeTime();
			if (times == 0) {
				times = 5;
			}
			let mobInfo = this.curMobInfo;
			if (mobInfo.star < message.EBattleStar.BATTLE_STAR_3) {
				let costUnit = CommonConfig.instance_normal_sweep_consume_token;
				let des = Helper.StringFormat(TextsConfig.TextConfig_Instance.warnWipe, costUnit * times, times);
				TipManager.ShowConfirmCancel(des, () => {
					this.SweepMobsReq(times, is_down, mobInfo);
				});
			}
			else if (!this.CheckChallengeTime()) {
				this.onBtnTimeAdd();
			}
			else {
				this.SweepMobsReq(times, is_down, mobInfo);
				// Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
				// 	.then((value: message.SweepMobsResponse) => {
				// 		Game.PlayerInstanceSystem.canSyncLevel = false;
				// 		loadUI(HXH_InstanceSweepFive)
				// 			.then((dialog: HXH_InstanceSweepFive) => {
				// 				dialog.father = this;
				// 				dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
				// 				dialog.show(UI.SHOW_FROM_TOP);
				// 				self.updateUI();
				// 			});
				// 	})
				// 	.catch((reason) => {
				// 		// toast(Helper.GetErrorString(reason));
				// 	})
			}
		}
		private SweepMobsReq(times, is_down, mobInfo) {
			let self = this;
			Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
				.then((value: any) => {
					Game.PlayerInstanceSystem.canSyncLevel = false;
					loadUI(HXH_InstanceSweepFive)
						.then((dialog: HXH_InstanceSweepFive) => {
							dialog.father = this;
							dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods)
							dialog.show(UI.SHOW_FROM_TOP);
							self.updateUI();
						});
				})
				.catch((reason) => {

				})
		}
		private CheckChallengeTime() {
			if (this.currData.challenge_num > 0 && this.getCurrInstanceInfo().maxMobID >= this.currData.instance_id) {
				if (this.curMobInfo) {
					return this.currData.challenge_num * (1 + this.curMobInfo.buyTime) - this.curMobInfo.dayTime > 0;
				}
			}
			return true;
		}
		private onBtnTimeAdd() {
			this.buyMobsTime();
		}

		private buyMobsTime() {
			let str = Helper.StringFormat(TextsConfig.TextConfig_Instance.errCount, CommonConfig.changlle_time(this.curMobInfo.buyTime),
				// Game.PlayerInstanceSystem.Level(null).buy_mobs - Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime,
				// Game.PlayerInstanceSystem.Level(null).buy_mobs);
				PlayerVIPSystem.Level().buy_mobs - this.curMobInfo.buyTime,
				PlayerVIPSystem.Level().buy_mobs);
			TipManager.ShowConfirmCancel(str, () => {
				this.buyMobsTime_Req();
			});
		}

		private buyMobsTime_Req() {
			Game.PlayerInstanceSystem.BuyMobsTime_Req(this.currData.instance_id)
				.then((value: any) => {
					this.updateUI();
				})
				.catch((reason) => {
					if (reason == message.EC.XG_INSTANCE_BUY_TIMES_MAX) {
						toast_warning(TextsConfig.TextsConfig_Error.buy_mobs_error);
					}
					else if (reason == "钻石不足") {
						TipManager.ShowAddGemStone()
					}
					else {
						toast_warning(reason);
					}
				});
		}

		private onBtnSweep5() {
			// if (Game.PlayerInstanceSystem.LowLevel().is_sweep == 1 || Game.PlayerInfoSystem.BaseInfo.level >= 30) {
			// 	this.call();
			// }
			if (PlayerVIPSystem.LowLevel().is_sweep == 1 || Game.PlayerInfoSystem.BaseInfo.level >= 30) {
				this.call();
			}
			// else {
			// let str = TextsConfig.TextConfig_Instance.errWipeTen;
			// TipMgr:ShowTipsAndGoVip(str, self, Enum.Vip.CHARGE, self._cb)跳转到充值界面
			// }
		}

		private call() {
			let mobInfo = this.curMobInfo;
			if (this.currData.challenge_num == 0) {
				let times = 5;
				if (Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, times) == false) {
					this.buyPower();
				} else {
					this.goSweep(times, true);
				}
			} else {
				let cur = this.curMobInfo.dayTime;
				let total = Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num * (1 + this.curMobInfo.buyTime);
				if (!Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, total - cur)) {
					this.buyPower();
				} else {
					this.goSweep(total - cur, true);
				}
			}
		}

		private onBtnTouchBeginFirstBlood(e: egret.TouchEvent) {
			if (Game.TeachSystem.curPart == 3002) return;
			let newThis = this;
			let touchX = e.stageX;
			let groupY: number;
			let type: number = 0;// type == 1 点击位置大于父类高度的一半
			if (e.stageY >= this.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY + 10;
			}

			let cardInfo = TableItemPotato.Table();
			let cardId: boolean = Table.FindF(cardInfo, (_k, _v) => {
				return _v.id == this.currData.first_reward[0][0];
			});

			if (!cardId) {
				let _type = PlayerItemSystem.ItemType(this.currData.first_reward[0][0]);
				if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
					loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
						dialog.name = "First_Blood";
						dialog.x = touchX - dialog.width / 2 - 20;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.setInfo(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
						newThis.father.father.addChild(dialog);
					});
				} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
					loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
						dialog.name = "First_Blood";
						dialog.x = touchX - dialog.width / 2 - 20;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.setInfo(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
						newThis.father.father.addChild(dialog);
					});
				} else {
					loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
						dialog.name = "First_Blood";
						dialog.x = touchX - dialog.width / 2 - 20;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.init(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
						newThis.father.father.addChild(dialog);
					});
				}
			}
			else {
				let showCardInfo: TableItemPotato = cardInfo[this.currData.first_reward[0][0]];
				loadUI(PlayerCardPopDialog)
					.then((dialog: PlayerCardPopDialog) => {
						dialog.loadNotGet(showCardInfo, false, () => {
							dialog.close();
						});
						dialog.name = "First_Blood";
						dialog.show();
					});
			}
		}
	}

}