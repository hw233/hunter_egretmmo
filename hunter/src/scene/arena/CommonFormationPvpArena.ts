namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-5
	 * 
	 * @class 本服格斗场调整阵容
	 */
	export class CommonFormationPvpArena extends Dialog {
		public ColorBG: eui.Image;
		public groupAllFather: eui.Group;
		public groupUp: eui.Group;
		public groupAll: eui.Group;
		public group4: eui.Group;
		public imgDownFrame8: eui.Image;
		public imgUpLock4: eui.Image;
		public imgUpYuan4: eui.Image;
		public groupPos8: eui.Group;
		public imgUpIcon4: eui.Image;
		public imgUpNum4: eui.BitmapLabel;
		public restrict30: eui.Label;
		public imgArrow4: eui.Image;
		public clearanceLock4: eui.Image;
		public groupPos4: eui.Group;
		public grouphunter4: eui.Group;
		public censorshipRestrict: eui.Label;
		public imgPos4: eui.Image;
		public group3: eui.Group;
		public imgDownFrame7: eui.Image;
		public imgUpLock3: eui.Image;
		public imgUpYuan3: eui.Image;
		public groupPos7: eui.Group;
		public imgUpIcon3: eui.Image;
		public imgUpNum3: eui.BitmapLabel;
		public restrict20: eui.Label;
		public imgArrow3: eui.Image;
		public clearanceLock3: eui.Image;
		public groupPos3: eui.Group;
		public grouphunter3: eui.Group;
		public imgPos3: eui.Image;
		public group2: eui.Group;
		public imgDownFrame6: eui.Image;
		public imgUpLock2: eui.Image;
		public imgUpYuan2: eui.Image;
		public groupPos6: eui.Group;
		public imgUpIcon2: eui.Image;
		public imgUpNum2: eui.BitmapLabel;
		public restrict10: eui.Label;
		public imgArrow2: eui.Image;
		public clearanceLock2: eui.Image;
		public groupPos2: eui.Group;
		public grouphunter2: eui.Group;
		public imgPos2: eui.Image;
		public group1: eui.Group;
		public imgDownFrame5: eui.Image;
		public imgUpLock1: eui.Image;
		public imgUpYuan1: eui.Image;
		public groupPos5: eui.Group;
		public imgUpIcon1: eui.Image;
		public imgUpNum1: eui.BitmapLabel;
		public imgArrow1: eui.Image;
		public clearanceLock1: eui.Image;
		public groupPos1: eui.Group;
		public grouphunter1: eui.Group;
		public imgPos1: eui.Image;
		public groupDown: eui.Group;
		public scroller: eui.Scroller;
		public listTableViewMine: eui.List;
		public btnArrowLeft: eui.Button;
		public btnArrowRight: eui.Button;
		public btnConfirimTean: eui.Button;
		public btnClose: eui.Button;


		// 底部数据data
		private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
		/**回调方法 */
		private callback: () => void;
		// 上阵武将列表
		public generals: Array<PosState> = [];
		// 拖动图片
		public moveImg = new eui.Image;
		public moveGId = null;
		public moveIndex = 0;
		private groupPosRect = [];
		private imgpath: string;

		// 等级限制开启
		public Level = Game.PlayerInfoSystem.Level;

		/**列表滑出去之后再回去不能滑动 */
		private vis: boolean = true;
		private scene;
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/CommonFormationPvpArenaSkin.exml";
			// this.groupUp.cacheAsBitmap = true;
			this.scene = new GoFightMap();
			this.scene.LoadMap(17);//这里是不同功能的地图ID
			this.addChildAt(this.scene, 1);
			Game.EventManager.on(GameEvent.DELAY_EXECUTE, this.ontouchBeginTime, this);
			this.init();
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnConfirimTean.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirimTean, this);
			this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
				this.close();
				this.scene.close();
			}, this)
			let a = Game.PlayerFormationSystem.curFormations;
			let formation = new message.FormationInfo();
			for (let i = 0; i < a.length; i++) {
				if (a[i] != null) {
					if (a[i].formationType == Game.PlayerInstanceSystem.curInstanceType) {
						formation = a[i];
					}
				}
			}
			if (formation.generals.length == 0 || formation.generals == null) {
				for (let i = 0; i < 4; i++) {
					formation.generals[i] = 0;
					formation.supports[i] = 0;
					formation.reserves[i] = 0;
				}
			}
			for (let i = 1; i <= 4; i++) {
				this["imgUpLock" + i].source = cachekey("ui_currencyicon_IconLock_png", this);
			}

			for (let i = 0; i < 8; i++) {
				let posState = new PosState();

				if (i < 4) {
					if (formation.generals[i] != null && formation.generals[i] != 0) {
						posState.generalId = formation.generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (formation.supports[i - 4] != null && formation.generals[i - 4] != 0) {
						posState.generalId = formation.supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}

			}
			this.drawUI();
			Game.EventManager.on(GameEvent.ON_MOVE, this.onMove, this);
			for (let i = 0; i < 8; i++) {
				this["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
					Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				}, this);
				//给上面group添加监听，当点击时将本group对应的ID信息置为0，然后重新刷新信息
				this["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST, { id: PlayerHunterSystem.Head(this.generals[i].generalId) });
					if (i < 4) {
						this.generals[i].generalId = 0;
						this.generals[i + 4].generalId = 0;
						this.generals[i + 4].state = 0;
					} else {
						this.generals[i].generalId = 0;
					}

					this.drawUI();
					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);


				}, this);
			}
			Game.EventManager.on(GameEvent.MOUSE_BEGIN, (e) => {
				let objectData = e.data;
				this.moveImg.width = 95;
				this.moveImg.height = 93;
				this.moveImg.visible = false;
				if (Device.isReviewSwitch && Util.isWxMiniGame) {
					this.moveImg.source = cachekey("wx_" + PlayerHunterSystem.Head(objectData.generalId), this);
				} else {
					this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
				}
				this.moveImg.x = e.stageX - 95 / 2;
				this.moveImg.y = e.stageY - 93 / 2;
				this.moveGId = objectData.generalId;
				this.moveIndex = objectData.index;
			}, this);
			this.addChild(this.moveImg);
		}

		private up() {
			this.vis = true;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
			this.moveImg.visible = false;
			this.moveImg.source = "";
		}

		public isFullScreen() {
			return true;
		}
		/**
		 * 关闭滑动bug
		 */
		public ontouchBeginTime(e) {
			if (e.data.isInLongPress == true) {
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			} else {
				// this.onAddToStage();
			}
		}

		public mouseMove(e: egret.TouchEvent) {
			this.moveImg.x = e.stageX - 95 / 2;
			this.moveImg.y = e.stageY - 93 / 2;
			if (this.moveImg.x > this.groupDown.x && this.moveImg.x < this.groupDown.x + this.groupDown.width && this.moveImg.y > this.groupDown.y && this.moveImg.y < this.groupDown.y + this.groupDown.height) {
				this.moveImg.visible = false;
				if (this.vis == true) {
					this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
				}
			} else {
				this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
				this.moveImg.visible = true;
				this.vis = false;
			}

		}

		public mouseUp(e: egret.TouchEvent) {
			this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
			Game.EventManager.event(GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
			this.moveImg.visible = false;
			this.moveImg.source = "";
			this.init();

			Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);
		}

		/**刷新底部list信息 */
		private init() {
			// 1-4号位置文字图片
			for (let i = 1; i <= 4; i++) {
				this[`imgPos${i}`].source = cachekey(UIConfig.UIConfig_Role.formationPosWord[i - 1], this);
			}
			let hunterList = PlayerHunterSystem.GetHunterList();
			this.listBottomData.removeAll();
			for (let i = 0; i < hunterList.length; i++) {
				const v = hunterList[i];
				let data = new FormatChooseHeroData();
				data.father = this;
				data.generalId = v;
				data.isCanTouch = true;
				this.listBottomData.addItem(data);
			}
			this.listTableViewMine.dataProvider = this.listBottomData;
			this.listTableViewMine.itemRenderer = FormatChooseHeroItem;
			this.listTableViewMine.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
			this.listTableViewMine.allowMultipleSelection = true;
		}
		public getSelectGenIds() {
			return this.generals;
		}
		public onListHerosTap(e: eui.ItemTapEvent) {
			let index = e.itemIndex;
			if (this.general(e.item)) {
				return;
			}
			let point = this.listTableViewMine.localToGlobal(e.itemRenderer.x, e.itemRenderer.y)
			point.x -= Game.UIManager.x;
			this.moveImg.x = point.x;
			this.moveImg.y = point.y;
			// this.imgpath = PlayerHunterSystem.Head(this.listBottomData[index].generalId);
			if (!e.item.isCanTouch) {
				return;
			}

			this.addGeneral(e.item.generalId);
			Game.EventManager.on(GameEvent.FORMATE_REFRESH_LIST, (e) => {
				this.init();

				this.moveImg.source = cachekey(e.data.id, this);
				if (e.data != null && e.data != undefined) {
					this.moveImg.visible = true;
					let objectData = e.data;
					egret.Tween.get(this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300)
						.call(() => {
							this.moveImg.visible = false;
						});
				}

			}, this);
			Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
		}

		public setInfo(cb: () => void) {
			this.callback = cb;
		}

		public addGeneral(generalId) {
			for (let i = 0; i < 8; i++) {
				if (this.generals[i].grade == 1) {
					if (i < 4) {
						this[`groupPos${i + 1}`].visible = false;
						this[`imgUpLock${i + 1}`].visible = true;// 锁头
						this[`imgUpYuan${i + 1}`].visible = false;// 援助 
					} else {
						this[`groupPos${i + 1}`].visible = false;
						this[`imgUpLock${i - 3}`].visible = true;// 锁头
						this[`imgUpYuan${i - 3}`].visible = false;// 援助 
					}
					this.generals[i].generalId == 0;
				} else
					if (this.generals[i].generalId == 0) {
						this.generals[i].generalId = generalId;
						if (i < 4) {
							if (this.generals[i + 4].state == 0) {
								this.generals[i + 4].state = 1;
							}
						}
						let j = i + 1;
						if (i + 1 > 4) {
							j = i + 1 - 4;
						}
						this.drawUI();

						let worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
						worldPointUp.x -= Game.UIManager.x;
						Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST, { x: worldPointUp.x, y: worldPointUp.y, id: PlayerHunterSystem.Head(generalId) });
						this.init();
						break;
					}
			}
		}

		public drawUI() {
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];

				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);
					iconPath = PlayerHunterSystem.Head(pS.generalId);
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				this.guidance();
				if (i < 4) {
					if (this.generals[i].grade == 1) {
						this[`groupPos${i + 1}`].visible = false;
						// this[`imgUpLock${i + 1}`].visible = true;// 锁头
						// this[`imgUpYuan${i + 1}`].visible = false;// 援助
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
					} else if (pS.generalId && pS.grade == 0) {

						// this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
						if (Device.isReviewSwitch && Util.isWxMiniGame) {
							// this["imgDownIcon" + (i + 1)].source = cachekey("wx_" + iconPath, this);
						} else {
							// this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
							this["clearanceLock" + (i + 1)].visible = false;
							this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
						}
						// this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
						Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);

						this["groupPos" + (i + 1)].visible = true;
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
					} else {
						this["clearanceLock" + (i + 1)].visible = true;
						this["groupPos" + (i + 1)].visible = false;
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
					}
				} else {
					if (this.generals[i].grade == 1) {
						this[`groupPos${i + 1}`].visible = false;
						this[`imgUpLock${i - 3}`].visible = true;// 锁头
						this[`imgUpYuan${i - 3}`].visible = false;// 援助
						// this["imgArrow" + (i - 3)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
					} else if (pS.generalId && pS.grade == 0) {
						this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
						if (Device.isReviewSwitch && Util.isWxMiniGame) {
							this["imgUpIcon" + ((i + 1) - 4)].source = cachekey("wx_" + iconPath, this);
						} else {
							this["imgUpIcon" + ((i + 1) - 4)].source = cachekey(iconPath, this);
						}

						this["imgUpNum" + ((i + 1) - 4)].text = hunterInfo.level.toString();
						this["groupPos" + (i + 1)].visible = true;
					} else {
						this["imgDownFrame" + (i + 1)].source = cachekey("ui_frame_FrameHunterAsh_png", this);
						this["groupPos" + (i + 1)].visible = false;
						if (pS.state == 0) {
							this["imgUpLock" + ((i + 1) - 4)].visible = true;
							this["imgUpYuan" + ((i + 1) - 4)].visible = false;
						}
						else {
							this["imgUpLock" + ((i + 1) - 4)].visible = false;
							this["imgUpYuan" + ((i + 1) - 4)].visible = true;
						}
					}
				}
			}
			Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);
		}
		/**获取放人物位置的相对位置 */
		public onAddToStage() {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.addChild(this.moveImg);
			for (let i = 0; i < 8; i++) {
				let j = i + 1;
				if (i + 1 > 4) {
					j = i + 1 - 4;
				}
				let worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
				worldPointUp.x -= Game.UIManager.x;
				this.groupPosRect[i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this["groupPos" + j].width, this["groupPos" + j].height);
			}
		}
		/**拖动图片松开时 */
		public onMove(e) {
			let objectData = e.data;
			// if (this.general(objectData)) {
			// 	return;
			// }
			for (let i = 0; i < 8; i++) {
				//组在面板上的位置x              //组在面板上的位置y
				if (this.groupPosRect[i].contains(objectData.x, objectData.y)) {
					let pTarget = this.generals[i];
					if (i < 4) {
						if (this.generals[i].grade == 1) {
							return;
						}
						if (objectData.index == -1) {
							pTarget.generalId = objectData.generalId;
						}
						else {
							if (objectData.index < 4) {
								[pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
								[this.generals[i + 4].generalId, this.generals[objectData.index + 4].generalId] = [this.generals[objectData.index + 4].generalId, this.generals[i + 4].generalId];
								[this.generals[i + 4].state, this.generals[objectData.index + 4].state] = [this.generals[objectData.index + 4].state, this.generals[i + 4].state];
							}
							else {
								[pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
							}
						}
						if (this.generals[i + 4].state == 0) {
							this.generals[i + 4].state = 1
						}
					}
					else {
						if (this.generals[i].grade == 1) {
							return;
						}
						if (pTarget.state != 0 && !(i == objectData.index + 4 && pTarget.state == 1 && pTarget.generalId == 0)) {
							if (objectData.index == -1) {
								pTarget.generalId = objectData.generalId;
							}
							else {
								[pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
								if (objectData.index < 4) {
									if (this.generals[objectData.index].generalId == 0) {
										this.generals[objectData.index + 4].generalId = 0;
										this.generals[objectData.index + 4].state = 0;
									}
								}
								else {
									[pTarget.state, this.generals[objectData.index].state] = [this.generals[objectData.index].state, pTarget.state];
								}
							}
						}
					}
					this.drawUI();
					this.guidance();
					break;
				}
			}
			Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
		}

		private onBtnConfirimTean() {
			//深拷贝获取阵容信息
			let a = Table.DeepCopy(Game.PlayerFormationSystem.curFormations);
			let formation = new message.FormationInfo();
			for (let i = 0; i < a.length; i++) {
				if (a[i] != null) {
					if (a[i].formationType == Game.PlayerInstanceSystem.curInstanceType) {
						if (a[i] instanceof message.FormationInfo) {
							formation = a[i];
						}
					}
				}
			}
			if (formation.generals.length == 0) {
				formation.formationType = Game.PlayerInstanceSystem.curInstanceType;
				Game.PlayerFormationSystem.curFormations.push(formation);
			}
			//将获取的阵容信息重新赋值并发送协议
			formation.generals = [];
			formation.supports = [];
			for (let i = 0; i < 8; i++) {
				if (i < 4) {
					formation.generals[i] = this.generals[i].generalId;
					// formation.formationIndex = this.generals[i].
				} else {
					formation.supports[i - 4] = this.generals[i].generalId;
				}
			}

			Game.PlayerArenaSystem.setFormation(formation)
				.then(() => {
					toast_success(TextsConfig.TextsConfig_Arena.formationSuc);
					//如果协议成功，将本地数据改变
					for (let i = 0; i < Game.PlayerFormationSystem.curFormations.length; i++) {
						if (Game.PlayerFormationSystem.curFormations[i] != null) {
							if (Game.PlayerFormationSystem.curFormations[i].formationType == Game.PlayerInstanceSystem.curInstanceType) {
								Game.PlayerFormationSystem.curFormations[i] = formation;
							}
						}
					}

					//执行回调，刷新本服格斗场主界面阵容信息
					this.callback();
					this.close(UI.HIDE_TO_TOP);
				})
				.catch((toast: string) => {
					// toast_success(toast) //TextsConfig.TextsConfig_Arena.formationSuc);
				})
		}

		private onBtnClose() {
			TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Pk.DoYouGoOut, () => {
				egret.Tween.get(this).wait(300).call(() => {
					this.close(UI.HIDE_TO_TOP);
				});
			})
		}

		/**
		 * 新手引导卡座等级开启限制
		 */
		public guidance() {
			for (let i = 5; i < 8; i++) {
				this.generals[i].grade = 1;
			}

			if (this.Level < 10) {// 10级开启
				this.restrict10.visible = true;
				this.restrict20.visible = true;
				this.restrict30.visible = true;
				this.generals[5].grade = 1;
				this.generals[6].grade = 1;
				this.generals[7].grade = 1;
				this.generals[5].generalId = 0;
				this.generals[6].generalId = 0;
				this.generals[7].generalId = 0;
			}
			if (this.Level == 10) {
				this.restrict10.visible = false;
				this.restrict20.visible = true;
				this.restrict30.visible = true;
				this.generals[5].grade = 0;
				this.generals[6].generalId = 0;
				this.generals[7].generalId = 0;
			}
			if (this.Level > 10 && this.Level < 20) {// 20级开启
				this.restrict10.visible = false;
				this.restrict20.visible = true;
				this.restrict30.visible = true;
				this.generals[5].grade = 0;
				this.generals[6].grade = 1;
				this.generals[7].grade = 1;
				this.generals[6].generalId = 0;
				this.generals[7].generalId = 0;
			}
			if (this.Level == 20) {
				this.restrict10.visible = false;
				this.restrict20.visible = false;
				this.restrict30.visible = true;
				this.generals[5].grade = 0;
				this.generals[6].grade = 0;
				this.generals[7].grade = 1;
				this.generals[7].generalId = 0;
			}
			if (this.Level > 20 && this.Level < 30) {// 30级开启
				this.restrict10.visible = false;
				this.restrict20.visible = false;
				this.restrict30.visible = true;
				this.generals[5].grade = 0;
				this.generals[6].grade = 0;
				this.generals[7].grade = 1;
				this.generals[7].generalId = 0;
			}
			if (this.Level >= 30) {// 大于30级
				this.restrict10.visible = false;
				this.restrict20.visible = false;
				this.restrict30.visible = false;
				this.generals[5].grade = 0;
				this.generals[6].grade = 0;
				this.generals[7].grade = 0;
			}
		}

		private general(objectData) {
			for (let i = 0; i < this.generals.length; i++) {
				if (objectData.generalId == this.generals[i].generalId) {
					return true;
				}
			}
		}

		private hunterFashionableDress(generalId: number, group: eui.Group) {
			let generalInfo = Game.PlayerHunterSystem.queryHunter(generalId);
			let mapRoleId: number = null;
			if (generalInfo.fashionId != 0) {
				mapRoleId = PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId).fashion_roleId;
			} else {
				mapRoleId = PlayerHunterSystem.Table(PlayerHunterSystem.GetGeneralId(generalId)).general_roleId;
			}
			let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
			let scale = TableMapRole.Item(mapRoleId).spine_scale;
			let body = TableClientFightAniSpineSource.Item(bodySpxId).json;
			Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
				.then(display => {
					group.removeChildren();
					display.scaleX = scale*0.9;
					display.scaleY = scale*0.9;
					display.name = "fashion";
					group.addChild(display);
				});
		}
	}
}