namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-8
	 * 
	 * @class 跨服格斗场阵容
	 */
	export class CommonFormationPvpArenaB extends Dialog {
		public groupAllFather: eui.Group;
		public groupTeam1: eui.Group;
		public btnTeam1: eui.Button;
		public lbHunterNum1: eui.Label;
		public lstTeam1: eui.List;
		public groupTeam2: eui.Group;
		public btnTeam2: eui.Button;
		public lbHunterNum2: eui.Label;
		public lstTeam2: eui.List;
		public groupTeam3: eui.Group;
		public btnTeam3: eui.Button;
		public lbHunterNum3: eui.Label;
		public lstTeam3: eui.List;
		public groupUp: eui.Group;
		public groupAll: eui.Group;
		public group4: eui.Group;
		public imgDownFrame8: eui.Image;
		public imgUpLock4: eui.Image;
		public imgUpYuan4: eui.Image;
		public groupPos8: eui.Group;
		public imgUpIcon4: eui.Image;
		public imgUpNum4: eui.BitmapLabel;
		public imgArrow4: eui.Image;
		public clearanceLock4: eui.Image;
		public groupPos4: eui.Group;
		public grouphunter4: eui.Group;
		public imgPos4: eui.Image;
		public group3: eui.Group;
		public imgDownFrame7: eui.Image;
		public imgUpLock3: eui.Image;
		public imgUpYuan3: eui.Image;
		public groupPos7: eui.Group;
		public imgUpIcon3: eui.Image;
		public imgUpNum3: eui.BitmapLabel;
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
		// 上阵所有武将列表
		public generalss: Array<PosState> = [];
		// 拖动图片
		public moveImg = new eui.Image;
		public moveGId = null;
		public moveIndex = 0;
		private groupPosRect = [];
		private imgpath: string;
		private father: ArenaWhole;
		private formation: Array<message.FormationInfo> = [];
		private idType: number = 0;
		private scene;
		private vis: boolean = true;
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/CommonFormationPvpArenaBSkin.exml";
			this.scene = new GoFightMap();
			this.scene.LoadMap(17);//这里是不同功能的地图ID
			this.addChildAt(this.scene, 0);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
				this.scene.close();
			}, null);
			this.init();
		}
		private init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnConfirimTean.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirimTean, this);
			this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.btnTeam1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam1, this);
			this.btnTeam2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam2, this);
			this.btnTeam3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam3, this);
			Game.EventManager.on(GameEvent.ON_MOVE, this.onMove, this);
			for (let i = 0; i < 8; i++) {
				this["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {

					Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });

				}, this);
				//给上面group添加监听，当点击时将本group对应的ID信息置为0，然后重新刷新信息
				this["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

					if (i < 4) {
						this.generals[i].generalId = 0;
						this.generals[i + 4].generalId = 0;
						this.generals[i + 4].state = 0
					} else {
						this.generals[i].generalId = 0;
					}
					this.refreshOverallInfo();
					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST);
					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
				}, this);
			}
			Game.EventManager.on(GameEvent.MOUSE_BEGIN, (e) => {
				let objectData = e.data;
				this.moveImg.width = 95;
				this.moveImg.height = 93;
				this.moveImg.visible = false;
				this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
				this.moveImg.x = e.stageX - 95 / 2;
				this.moveImg.y = e.stageY - 93 / 2;
				this.moveGId = objectData.generalId;
				this.moveIndex = objectData.index;
			}, this);
			this.addChild(this.moveImg);
			this.loadDownListInfo();
			for (let i = 0; i < 24; i++) {
				let posState = new PosState();
				this.generalss.push(posState);
			}
			// 1-4号位置文字图片
			for (let i = 1; i <= 4; i++) {
				this[`imgPos${i}`].source = cachekey(UIConfig.UIConfig_Role.formationPosWord[i - 1], this);
			}
		}

		public isFullScreen() {
			return true;
		}
		private up() {
			this.vis = true;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.ON
			this.moveImg.visible = false;
			this.moveImg.source = "";
		}
		public setInfo(father: ArenaWhole, cb: () => void) {
			this.callback = cb;
			this.father = father;
			this.formation = Table.DeepCopy(this.father.formats);
			for (let i = 0; i < this.formation.length; i++) {
				for (let j = 0; j < 8; j++) {
					if (j < 4) {
						this.generalss[i * 8 + j].generalId = this.formation[i].generals[j];
					} else {
						this.generalss[i * 8 + j].generalId = this.formation[i].supports[j - 4];
					}

				}
			}
			this.refreshInfo(0);
		}

		private refreshInfo(id: number) {

			this.generals = [];
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					if (this.formation[id].generals[i] != null && this.formation[id].generals[i] != 0) {
						posState.generalId = this.formation[id].generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (this.formation[id].supports[i - 4] != null && this.formation[id].generals[i - 4] != 0) {
						posState.generalId = this.formation[id].supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}
			}
			this.cartoon();
			this.refreshOverallInfo();
		}

		private hunterInfo(id: number) {
			if (id == 0) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i] = this.generals[i];
				}
			} else if (id == 1) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i + 8] = this.generals[i];
				}
			} else if (id == 2) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i + 16] = this.generals[i];
				}
			}
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.formation[id].generals[i] = this.generals[i].generalId;
				} else {
					this.formation[id].supports[i - 4] = this.generals[i].generalId;
				}
			}
		}

		private onBtnTeam1() {
			this.hunterInfo(this.idType);
			this.idType = 0;
			this.refreshInfo(0);
			this.btnColour();
			Set.ButtonBackgroud(this.btnTeam1, "ui_arena_ButtonNumTeamBigSel_png", );
		}

		private onBtnTeam2() {
			this.hunterInfo(this.idType);
			this.idType = 1;
			this.refreshInfo(1);
			this.btnColour();
			Set.ButtonBackgroud(this.btnTeam2, "ui_arena_ButtonNumTeamBigSel_png", );
		}

		private onBtnTeam3() {
			this.hunterInfo(this.idType);
			this.idType = 2;
			this.refreshInfo(2);
			this.btnColour();
			Set.ButtonBackgroud(this.btnTeam3, "ui_arena_ButtonNumTeamBigSel_png", );
		}

		/**将所有按钮颜色变暗 */
		private btnColour() {
			Set.ButtonBackgroud(this.btnTeam1, "ui_arena_ButtonNumTeamBigNor_png", );
			Set.ButtonBackgroud(this.btnTeam2, "ui_arena_ButtonNumTeamBigNor_png", );
			Set.ButtonBackgroud(this.btnTeam3, "ui_arena_ButtonNumTeamBigNor_png", );
		}


		public getSelectGenIds() {
			if (this.idType == 0) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i] = this.generals[i];
				}
			} else if (this.idType == 1) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i + 8] = this.generals[i];
				}
			} else if (this.idType == 2) {
				for (let i = 0; i < 8; i++) {
					this.generalss[i + 16] = this.generals[i];
				}
			}
			return this.generalss;
		}

		public mouseUp(e: egret.TouchEvent) {
			this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
			Game.EventManager.event(GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
			this.moveImg.visible = false;
			this.moveImg.source = "";
			this.init();

			Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);
		}

		/**刷新全局信息 */
		private refreshOverallInfo() {
			this.drawUI();
			this.hunterInfo(this.idType);
			// this.loadDownListInfo();
			this.loadlistInfo();
		}

		/**装备猎人项刷新动画 */
		private cartoon() {
			let a = 400;
			for (let i = 1; i < 5; i++) {
				a -= 100;
				this["group" + i].alpha = 0;
				this["group" + i].scaleY = 1.1;
				this["group" + i].scaleX = 1.1;
				egret.Tween.get(this["group" + i]).wait(a).to({ alpha: 1 }, 10).to({ scaleX: 1, scaleY: 1 }, 200);
			}
		}

		private loadlistInfo() {
			for (let i = 0; i < 3; i++) {
				this.loadList(i + 1);
				let curNumR = 0;
				let maxNumR = 0;
				for (let j = 0; j < 4; j++) {
					if (this.generalss[i * 8 + j] != null && this.generalss[i * 8 + j].generalId != 0) {
						curNumR += 1;
					}
					maxNumR += 1;
				}
				this["lbHunterNum" + (i + 1)].text = curNumR + "/" + maxNumR;
			}
		}

		private loadList(index: number) {
			if (!this["lstTeam" + index]) return;
			let a: number;
			let arrCollection = new eui.ArrayCollection();
			for (let i = 0; i < 4; i++) {
				a = this.generalss[(index - 1) * 8 + i] != null ? this.generalss[(index - 1) * 8 + i].generalId : this.formation[index - 1].generals[i]
				arrCollection.addItem({
					generalId: a
				})
			}
			this["lstTeam" + index].itemRenderer = CommonTeamAddHunterItem;
			this["lstTeam" + index].dataProvider = arrCollection;
		}

		/**刷新底部list信息 */
		private loadDownListInfo() {
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

		public onListHerosTap(e: eui.ItemTapEvent) {
			let index = e.itemIndex;
			if (this.general(e.item)) {
				return;
			}
			let point = this.listTableViewMine.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
			point.x -= Game.UIManager.x;
			this.moveImg.x = point.x;
			this.moveImg.y = point.y;
			if (!e.item.isCanTouch) {
				return;
			}

			this.addGeneral(e.item.generalId);

			Game.EventManager.on(GameEvent.FORMATE_REFRESH_LIST, (e) => {
				this.refreshOverallInfo();
				if (e.data != null && e.data != undefined) {
					this.moveImg.visible = true;
					this.moveImg.source = cachekey(e.data.id, this);
					let objectData = e.data;
					egret.Tween.get(this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300)
						.call(() => {
							this.moveImg.visible = false;
						});
				} else {
					this.moveImg.visible = false;
					this.moveImg.source = "";
				}
			}, this);
			Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
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

		public addGeneral(generalId) {
			for (let i = 0; i < 8; i++) {
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
					let worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
					worldPointUp.x -= Game.UIManager.x;
					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST, { x: worldPointUp.x, y: worldPointUp.y, id: PlayerHunterSystem.Head(generalId) });
					this.refreshOverallInfo();
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

				if (i < 4) {
					if (pS.generalId) {

						// this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
						// this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
						// this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
						// Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);
						this["clearanceLock" + (i + 1)].visible = false;
						this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
						this["groupPos" + (i + 1)].visible = true;
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
					} else {
						this["clearanceLock" + (i + 1)].visible = true;
						this["groupPos" + (i + 1)].visible = false;
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
					}
				} else {
					if (pS.generalId) {
						this["imgUpIcon" + ((i + 1) - 4)].source = cachekey(iconPath, this);
						this["imgUpNum" + ((i + 1) - 4)].text = hunterInfo.level.toString();
						this["groupPos" + (i + 1)].visible = true;
					} else {
						this["groupPos" + (i + 1)].visible = false;
						if (pS.state == 0) {
							this["imgUpLock" + ((i + 1) - 4)].visible = true;
							this["imgUpYuan" + ((i + 1) - 4)].visible = false;
						} else {
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
				if (this.groupPosRect[i].contains(objectData.x, objectData.y)) {//  // 
					let pTarget = this.generals[i];
					if (i < 4) {
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
					// this.drawUI();
					// this.hunterInfo(this.idType);
					this.refreshOverallInfo();
					break;
				}
			}
			Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
		}

		private onBtnConfirimTean() {
			let info = Table.DeepCopy(this.formation);
			Game.PlayerLeagueSystem.setFormation(this.formation)
				.then(() => {
					toast_success(TextsConfig.TextsConfig_Arena.formationSuc);
					//如果协议成功，将本地数据改变
					Game.PlayerFormationSystem.formatsSingleDefine = info;

					this.callback();
					this.close(UI.HIDE_TO_TOP);
				})
				.then(() => {

				})
		}
		private onBtnClose() {
			TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Pk.DoYouGoOut, () => {
				egret.Tween.get(this).wait(300).call(() => {
					this.close(UI.HIDE_TO_TOP);
				});
			})
		}
		private general(objectData) {
			for (let i = 0; i < this.generalss.length; i++) {
				if (objectData.generalId == this.generalss[i].generalId) {
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