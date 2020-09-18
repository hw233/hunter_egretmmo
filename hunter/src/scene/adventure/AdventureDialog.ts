namespace zj {

	/**
	 * 副本界面-关卡列表
	 * zhaiweili
	 * 2019.11.7
	 */
	export class AdventureDialog extends UI {
		public static aniTime: number = 150;
		private father: SceneMapTiledAdventureUI;

		private imgDialogBG: eui.Image;
		private groupAll: eui.Group;
		private imgName: eui.Image
		private imgTitleBg: eui.Image;
		private lbDesc: eui.Label;

		private btnCloseAdventure: eui.Button;
		private scrollerAdventure: eui.Scroller;
		private listAdventure: eui.Group;

		private tagBtns: eui.RadioButton[];
		// private btnMap: eui.Button;
		private btnBox: eui.Button;
		private imgEliteLock: eui.Image;

		private gorupDrop: eui.Group;

		// private currInfo: CustomInstanceInfo;
		private currArea: TableInstanceArea;
		private type: message.EFormationType;//message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
		private itemList: any[][];
		private currItem: AdventureDialogItem | AdventureDialogItemElite;
		private isAni: boolean;

		private giftId: number;
		private giftCount: number;
		private giftType: number;// 0-已领取，1-领取，2-未通关
		private giftRunTime: number;// 宝箱抖动倒计时
		private giftMobId: number;
		public constructor() {
			super();
			this.skinName = "resource/skins/adventure/AdventureDialogSkin.exml";
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.init();
		}

		private init() {
			this.itemList = [];
			this.tagBtns = [this["tagBtn0"], this["tagBtn1"]];
			let types = [message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE];
			for (let i = 0; i < this.tagBtns.length; ++i) {
				this.tagBtns[i].value = types[i];
				this.tagBtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTag, this);
				this.itemList[types[i]] = [];
			}

			// this.imgDialogBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.btnCloseAdventure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.gorupDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDrop, this);
			// this.btnMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMap, this);
			this.btnBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnBox, this);
			this.type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
		}

		public setOwner(_owner: SceneMapTiledAdventureUI) {
			this.father = _owner;
		}

		public getCurrAreaId() {
			return this.currArea.area_id;
		}

		public setData(data: TableInstanceArea, type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
			this.currArea = data;
			let isHasElite = data.area_elite && data.area_elite.length > 0;
			if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && !isHasElite) {
				type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
			}
			this.tagBtns[1].visible = isHasElite;
			this.type = type;
			this.tagBtns[type - 1].selected = true;
			this.giftRunTime = 3;
			this.updateUI(true);
		}

		public updateUI(isInit: boolean = false) {
			Game.PlayerInstanceSystem.curInstanceType = this.type;
			this.gorupDrop.visible = this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
			let complete2 = Game.PlayerInstanceSystem.ElitePackCanChallenge(this.currArea.area_id);
			this.imgEliteLock.visible = !complete2[0];
			// this.tagBtns[1].enabled = complete2[0];

			this.isAni = false;
			this.imgName.source = cachekey("ui_instancenew_area_name_" + this.currArea.area_id + "_png", this);
			this.imgTitleBg.source = cachekey("ui_instancenew_dialog_cover_" + this.currArea.area_id + "_png", this);
			// this.imgTitleBg.source = cachekey("ui_instancenew_dialog_cover_" + 1 + "_png", this);
			this.lbDesc.text = this.currArea.des;// this.currArea.elite_drop_des;

			this.listAdventure.removeChildren();
			this.listAdventure.scrollV = 0;

			this.updateList(isInit);

			if (!isInit && this.currItem) {
				let item = this.currItem;
				this.currItem = null;
				this.onTouchItem(item);
			}
		}
		private updateList(isInit: boolean = false) {
			let model = this.getChapterList(this.type);
			let chapterIds = model.chapter_pack;
			let items: any[] = this.itemList[this.type];
			let currInfo = Game.PlayerInstanceSystem.curInstances[this.type];
			let classz = this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE ? AdventureDialogItemElite : AdventureDialogItem;

			let gap = 2;// item之间的间隔（在exml中设置）
			let maxMobId = currInfo.maxMobID;
			let gheight = 0;
			for (let i = 0; i < chapterIds.length; ++i) {
				let data = TableInstance.Item(chapterIds[i]);
				let mobInfo: message.MobInfo = currInfo.mobsMap[chapterIds[i]];
				let item = items[i];
				if (!item) {
					item = new classz();
					items.push(item);
				}
				item.init(this, this.currArea, model, data, i);
				item.initClose();

				if (isInit) {
					if (gheight > 0) {
						gheight += gap;
					}
					gheight += item.getTopHeight();
					if (!this.isTeachCloseAll() && maxMobId == data.instance_id || (i == chapterIds.length - 1 && data.instance_id < maxMobId)) {
						item.initOpen();
						this.currItem = item;
						gheight += item.getBottomHeight();
					}
				}

				this.listAdventure.addChild(item);

				// 奖励
				if (i == chapterIds.length - 1) {
					this.giftMobId = -1;
					this.giftType = 2;
					if (!mobInfo || mobInfo.star == 0) {// 未通关
						this.giftType = 2;
					} else if (mobInfo.chestReward) {// 已领取
						this.giftType = 0;
					} else {// 可领取
						this.giftMobId = mobInfo.mobId;
						this.giftType = 1;
					}
					this.giftId = Game.PlayerInstanceSystem.ChestItem(chapterIds[i]).goods_ids[0];
					this.giftCount = Game.PlayerInstanceSystem.ChestItem(chapterIds[i]).goods_counts[0];
				}
			}
			// 奖励显示
			this.updateGift();

			if (isInit) {
				this.updateInitY(gap, gheight);
			}
		}

		private setGiftAni() {
			let daley = 3;
			egret.Tween.get(this.btnBox)
				.to({ rotation: -20 }, 20 * daley)
				.to({ rotation: 18 }, 38 * daley)
				.to({ rotation: -16 }, 34 * daley)
				.to({ rotation: 14 }, 30 * daley)
				.to({ rotation: -12 }, 26 * daley)
				.to({ rotation: 10 }, 22 * daley)
				.to({ rotation: -8 }, 18 * daley)
				.to({ rotation: 6 }, 14 * daley)
				.to({ rotation: -4 }, 10 * daley)
				.to({ rotation: 0 }, 4 * daley)
				.call(() => {
					egret.Tween.removeTweens(this.btnBox);
				});
		}

		public Update(dt) {
			if (this.giftType == 1) {
				this.giftRunTime -= dt;
				if (this.giftRunTime <= 0) {
					this.giftRunTime = 3;
					this.setGiftAni();
				}
			}
		}
		/**
		 * 如果有新手需要关闭所有item
		 */
		private isTeachCloseAll() {
			return Game.TeachSystem.curPart == 3002;
		}
		private updateGift() {
			// 奖励显示
			// 0-已领取，1-领取，2-未通关
			let lab = this["lbGift"] as eui.Label;
			switch (this.giftType) {
				case 0:
					lab.text = "已领取";
					this.btnBox.icon = cachekey("ui_instancenew_dialog_box_" + this.type + "_1_png", this);
					break;
				case 1:
					lab.text = "领取";
					this.btnBox.icon = cachekey("ui_instancenew_dialog_box_" + this.type + "_0_png", this);
					break;
				case 2:
					lab.text = "未通关";
					this.btnBox.icon = cachekey("ui_instancenew_dialog_box_" + this.type + "_0_png", this);
					break;
			}
		}
		private updateInitY(gap, gheight) {
			if (this.currItem) {
				let idx = this.itemList[this.type].indexOf(this.currItem);
				let itemy = (this.currItem.getTopHeight() + gap) * idx;
				this.listAdventure.scrollV = Math.min(itemy, Math.max(0, gheight - this.scrollerAdventure.height));
			}
		}
		public getItem(type, idx) {
			let item = this.itemList[type][idx];
			if (item) {
				return [item, item == this.currItem];
			}
			return null;
		}
		/**
		 * 获取关卡列表
		 */
		private getChapterList(type: message.EFormationType): TableChapterNormal | TableChapterElite {
			if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				return Game.PlayerInstanceSystem.EliteInstance(this.currArea.area_elite[0]);
			}
			return Game.PlayerInstanceSystem.ChapterInstance(this.currArea.area_normal[0]);
		}

		public onItemAniFinish(type) {// 0-guanbi,1-kaiqi
			this.isAni = false;
			if (type == 1) {
				Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
			}
		}
		public onTouchItem(item: AdventureDialogItem | AdventureDialogItemElite) {
			if (!this.isAni) {
				let type = 0;
				let temp = null;
				if (this.currItem) {
					this.currItem.startAniClose();
					type--;
					temp = this.currItem;
					this.isAni = true;
					if (this.currItem == item) {
						this.currItem = null;
					} else {
						this.currItem = item;
					}
				} else {
					this.currItem = item;
				}
				if (this.currItem) {
					item.startAniOpen();
					type++;
					temp = item;
					this.isAni = true;
				}
				this.startAni(type, temp);
			}
		}

		private startAni(type: number, item: AdventureDialogItem) {
			if (type != 0) {
				let groupY = this.listAdventure.scrollV;
				let aniHeight = item.getBottomHeight();
				if (type == -1) {// 关闭
					let groupHei = this.listAdventure.contentHeight - aniHeight;
					if (groupHei - groupY < this.scrollerAdventure.height) {
						let mot = groupY - (this.scrollerAdventure.height - (groupHei - groupY));
						if (mot < 0) {
							mot = 0;
						}
						let tw = egret.Tween.get(this.listAdventure);
						tw.to({ scrollV: mot }, AdventureDialog.aniTime);
						tw.call(() => {
							egret.Tween.removeTweens(this.listAdventure);
						}, this);
					}
				} else if (type == 1) {// 开启
					let bottom = item.y + item.getTopHeight() + aniHeight;
					if (bottom - groupY > this.scrollerAdventure.height) {
						let tw = egret.Tween.get(this.listAdventure);
						tw.to({ scrollV: bottom - this.scrollerAdventure.height }, AdventureDialog.aniTime);
						tw.call(() => {
							egret.Tween.removeTweens(this.listAdventure);
						}, this);
					}
				}
			}
		}

		private onTouchTag(event: egret.Event): void {
			let radioBtn: eui.RadioButton = event.currentTarget as eui.RadioButton;
			if (this.type != radioBtn.value) {
				if (this.checkIsOpen(radioBtn.value)) {
					this.type = radioBtn.value;
					this.currItem = null;
					this.updateUI();
				} else {
					this.tagBtns[0].selected = true;
				}
			}
		}
		private checkIsOpen(type) {
			if (this.imgEliteLock.visible) {
				let [complete2, error_code] = Game.PlayerInstanceSystem.ElitePackCanChallenge(this.currArea.area_id);
				if (!complete2) {
					if (error_code == 2) {
						toast_warning(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[error_code - 1]);
						return;
					}
					else {
						let chapter_info: TableInstance = TableInstance.Item(error_code);
						if (chapter_info != null) {
							let [value1, value2] = Game.PlayerInstanceSystem.ChapterIdx(error_code);
							value2 = Number(value2) + 1;
							toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[0], value1, value2, false));
							return;
						}
					}
				}
				// let currInfo = Game.PlayerInstanceSystem.curInstances[this.type];
				// let chapterIds = this.getChapterList(this.type).chapter_pack;
				// let maxMobId = chapterIds[chapterIds.length - 1];
				// if(currInfo.maxMobID >= maxMobId){
				// 	if(this.currArea.area_id == 1){

				// 	} else {
				// 		toast_warning(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[1]);
				// 	}
				// } else {
				// 	toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[0], this.currArea.area_id, chapterIds.length, false));
				// }
				return false;
			}
			return true;
		}
		private onBtnDrop() {
			loadUI(HXH_InstanceEliteDropInfo)
				.then((dialog: HXH_InstanceEliteDropInfo) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.currArea.area_id);
				})
		}
		private onBtnBox(e: egret.TouchEvent) {
			// 0-已领取，1-领取，2-未通关
			switch (this.giftType) {
				case 1:
					this.onGetGift();
					break;
				case 0:
				case 2:
					this.onLookBox(e);
					break;
			}
		}
		private onGetGift() {
			let mobsId: number = this.giftMobId;
			Game.PlayerInstanceSystem.InstanceChestReq(mobsId)
				.then((value: message.InstanceChestResponse) => {
					this.currItem = null;
					this.updateUI();
					let [hero, index] = Table.FindR(value.body.gameInfo.getGoods, (k, v) => {
						return PlayerItemSystem.Type2(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
					});
					if (hero != null) {
						loadUI(TavernGetGeneral)
							.then((taverngetgeneral: TavernGetGeneral) => {
								taverngetgeneral.init(this);
								taverngetgeneral.setInfo(hero.goodsId, hero.index, 1, true, () => {
									loadUI(CommonGetDialog)
										.then((dialog: CommonGetDialog) => {
											dialog.init(value.body.gameInfo.getGoods);
											dialog.show();
										});
								});
								this.addChild(taverngetgeneral);
								Game.EventManager.event(GameEvent.SHOW_UI, { typeName: "zj.TavernGetGeneral" });
							});

					}
					else {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(value.body.gameInfo.getGoods);
								dialog.show();
							});
					}
				})
				.catch((reason) => {
					toast_warning(reason);
				});
		}
		private onLookBox(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.giftId;
			goodsInfo.count = this.giftCount;
			let show = TipManager.ShowProp(goodsInfo, this, 30, e.stageX, e.stageY);
			show.name = "award";
			this.father.addChild(show);
		}

		// private onBtnMap() {
		// 	this.father.enterMap(this.currArea);
		// }

		public show() {
			let scaleHeight = 1.2;
			this.groupAll.scaleX = this.groupAll.scaleY = 0.1;
			let tw = egret.Tween.get(this.groupAll);
			tw.to({ scaleX: scaleHeight, scaleY: scaleHeight }, 400, egret.Ease.backOut);
			tw.call(() => {
				egret.Tween.removeTweens(this.groupAll);
			}, this);

			this.imgDialogBG.alpha = 0.01;
			let twImg = egret.Tween.get(this.imgDialogBG);
			twImg.wait(400);
			twImg.to({ alpha: 0.4 }, 600);
			twImg.call(() => {
				egret.Tween.removeTweens(this.imgDialogBG);
				Game.EventManager.event(GameEvent.SHOW_UI, { typeName: "zj.AdventureDialog" });
			}, this);
		}

		private onClose() {
			this.currItem = null;
			this.isAni = false;

			let twImg = egret.Tween.get(this.imgDialogBG);
			twImg.to({ alpha: 0 }, 400);
			twImg.call(() => {
				egret.Tween.removeTweens(this.imgDialogBG);
			}, this);

			let tw = egret.Tween.get(this.groupAll);
			tw.to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.sineIn);
			tw.call(() => {
				egret.Tween.removeTweens(this.groupAll);
				this.father.closeAdventureInfo();
				Game.EventManager.event(GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(this) });
			}, this);
		}
	}

}