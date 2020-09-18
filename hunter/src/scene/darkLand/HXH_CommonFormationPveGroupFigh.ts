namespace zj {
	/**
	 * wangshenzhuo
	 * 2019/03/11
	 * 飞龙营地上阵
	 */
	export class HXH_CommonFormationPveGroupFigh extends Scene {
		public groupAllFather: eui.Group;
		public groupMain: eui.Group;
		public groupDown: eui.Group;
		public scroller: eui.Scroller;
		public listMyHero: eui.List;
		public buttonArrowLeft: eui.Button;
		public buttonArrowRight: eui.Button;
		public buttonConfirmTeam: eui.Button;
		public groupUp: eui.Group;
		public groupAll: eui.Group;
		public group4: eui.Group;
		public imgDownFrame4: eui.Image;
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
		public buttonTeam1: eui.Button;
		public buttonTeam2: eui.Button;
		public groupSelect1: eui.Group;
		public buttonSelect1: eui.Button;
		public imageBigonBoard: eui.Image;
		public imageBigonName1: eui.Image;
		public groupSelect2: eui.Group;
		public buttonSelect2: eui.Button;
		public imageBigonBoard1: eui.Image;
		public imageBigonName2: eui.Image;
		public buttonclose: eui.Button;

		public tmp_formation: any = [];
		public buttonIndex: number = 1;
		private formation = [];

		// 上阵武将列表
		public generals: Array<PosState> = [];
		// 上阵所有武将列表
		public generalss: Array<PosState> = [];

		// 拖动图片
		public moveImg = new eui.Image;
		public moveGId = null;
		public moveIndex = 0;

		public button = [];
		public buttonSelect = [];
		public imageSelect = [];
		private groupPosRect = [];
		public formats: any = [];

		public father: HXH_GroupFightFormate;
		private idType: number = 0;
		// 底部数据data
		private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
		private scene;
		/**列表滑出去之后再回去不能滑动 */
		private vis: boolean = true;

		public constructor() {
			super();
			this.skinName = "resource/skins/darkLand/HXH_CommonFormationPveGroupFightSkin.exml";
			this.scene = new GoFightMap();
			this.scene.LoadMap(17);//这里是不同功能的地图ID
			this.addChildAt(this.scene, 0);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.buttonclose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
			this.buttonTeam1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam1, this);
			this.buttonTeam2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam2, this);
			this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			this.buttonConfirmTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonConfirmTeam, this);
			this.buttonSelect1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSelect1, this);
			this.buttonSelect2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSelect2, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			Game.EventManager.on(GameEvent.ON_MOVE, this.onMove, this);
			this.init();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
				this.close();
				egret.Tween.removeTweens(this);
			}, this)
			this.loadDownListInfo();
		}

		public init() {

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

			for (let i = 0; i < 24; i++) {
				let posState = new PosState();
				this.generalss.push(posState);
			}

			this.tmp_formation = Table.DeepCopy(Game.PlayerFormationSystem.formatsGroupFight);

			this.buttonIndex = 1;
			this.button = [
				this.buttonTeam1,
				this.buttonTeam2
			];

			this.buttonSelect = [
				this.buttonSelect1,
				this.buttonSelect2,
			];

			this.imageSelect = [
				this.imageBigonName1,
				this.imageBigonName2,
			];

			this.SetInfoSelect();

		}

		private up() {
			this.vis = true;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.ON
			this.moveImg.visible = false;
			this.moveImg.source = "";
		}

		public SetInfo(father: HXH_GroupFightFormate) {
			this.father = father;
			this.formats = Game.PlayerFormationSystem.formatsGroupFight;
			this.formation = Table.DeepCopy(this.formats);
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

		public SetInfoSelect(num?) {
			let index = this.GetFriendSelectIndex();
			let aa = this.formation;
			for (const k in this.buttonSelect) {
				const v = this.buttonSelect[k];
				v.touchEnabled = (Number(index) != Number(k));
			}


			for (const kk in this.imageSelect) {
				const vv = this.imageSelect[kk];
				vv.visible = (index == kk);
			}
		}

		private refreshInfo(id: number) {

			this.generals = [];
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					let a = this.formation[id].generals[i];
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

		/**刷新全局信息 */
		private refreshOverallInfo() {
			this.drawUI();
			this.hunterInfo(this.idType);
			// this.loadDownListInfo();
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
			this.listMyHero.dataProvider = this.listBottomData;
			this.listMyHero.itemRenderer = FormatChooseHeroItem;
			this.listMyHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
			this.listMyHero.allowMultipleSelection = true;
		}

		public GetFriendSelectIndex() {
			let formation: any = Game.PlayerFormationSystem.formatsGroupFight;
			this.formation = Table.DeepCopy(formation)
			for (const k in formation) {
				const v = formation[k];
				if (v.adviserSkill == 1) {
					return k;
				}
			}
			return 0;
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
			}
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.formation[id].generals[i] = this.generals[i].generalId;
				} else {
					this.formation[id].supports[i - 4] = this.generals[i].generalId;
				}
			}
		}


		public onListHerosTap(e: eui.ItemTapEvent) {
			let index = e.itemIndex;
			if (this.general(e.item)) {
				return;
			}
			let point = this.listMyHero.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
			point.x -= Game.UIManager.x;
			this.moveImg.x = point.x;
			this.moveImg.y = point.y;
			if (!e.item.isCanTouch) {
				return;
			}

			this.addGeneral(e.item.generalId);

			Game.EventManager.on(GameEvent.FORMATE_REFRESH_LIST, (e) => {
				this.refreshOverallInfo();
				if (e.data == null || e.data == undefined) {
					return;
				}
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
					Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
					break;
				}
			}
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
			}
			return this.generalss;
		}

		public SetInfoButtonClick(index) {
			this.buttonIndex = index;
			if (index == 1) {
				this.onBtnTeam1();
			} else if (index == 2) {
				this.onBtnTeam2();
			}
		}

		//点击 “主队阵容”  按钮
		private onBtnTeam1() {
			this.hunterInfo(this.idType);
			this.idType = 0;
			this.refreshInfo(0);
			this.buttonIndex = 1;
			this.buttonTeam1.touchEnabled = false;
			this.buttonTeam2.touchEnabled = true;
			Set.ButtonBackgroud(this.buttonTeam1, "ui_groupfight_ButtonTeamNameSel_png", );
			Set.ButtonBackgroud(this.buttonTeam2, "ui_groupfight_ButtonTeamNameNor_png", );
		}

		//点击 “二队阵容”  按钮
		private onBtnTeam2() {
			this.hunterInfo(this.idType);
			this.idType = 1;
			this.refreshInfo(1);
			this.buttonIndex = 2;
			this.buttonTeam1.touchEnabled = true;
			this.buttonTeam2.touchEnabled = false;
			Set.ButtonBackgroud(this.buttonTeam1, "ui_groupfight_ButtonTeamNameNor_png", );
			Set.ButtonBackgroud(this.buttonTeam2, "ui_groupfight_ButtonTeamNameSel_png", );
		}

		//保存阵型
		public onButtonConfirmTeam() {
			let info = Table.DeepCopy(this.formation);
			let errorId = this.JudgeCanBat();
			if (errorId == 0) {
				// for(const fk in this.formation){
				// 	const fv = this.formats[fk];
				// 	if (this.formats[fk].generals.length == 0) {
				// 		this.formats[fk].formationType = Game.PlayerInstanceSystem.curInstanceType;
				// 		Game.PlayerFormationSystem.formatsGroupFight = this.formats[fk];
				// 	}
				// }
				this.SetFormatReq(this.formation)
					.then(() => {
						toast_success(TextsConfig.TextsConfig_Contend.formationSave);
						//如果协议成功，将本地数据改变
						Game.PlayerFormationSystem.formatsGroupFight = info;
						this.close(UI.HIDE_TO_TOP);
						this.scene.close();
						this.father.SetInfoMyFormate();
					})
					.then(() => {

					})
			} else {
				toast_warning(TextsConfig.TextsConfig_GroupFight.needGeneral2[errorId - 1]);
			}

		}

		//点击 关闭 按钮
		private onButtonClose() {
			TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Pk.DoYouGoOut, () => {
				egret.Tween.get(this).wait(300).call(() => {
					this.scene.close();
					this.close(UI.HIDE_TO_TOP);
					Game.PlayerFormationSystem.curFormationIndex = 1;
					Game.PlayerFormationSystem.formatsGroupFight = this.tmp_formation;
					// this.father.SetInfoMyFormate();
				});
			})
		}

		public onButtonSelect1() {
			this.ReqSetSelect(1);
		}

		public onButtonSelect2() {
			this.ReqSetSelect(2);
		}

		public ReqSetSelect(index) {
			let otherIndex = index == 1 && 2 || 1;
			let a = Game.PlayerFormationSystem.formatsGroupFight;
			Game.PlayerFormationSystem.formatsGroupFight[index - 1].adviserSkill = 1;
			Game.PlayerFormationSystem.formatsGroupFight[otherIndex - 1].adviserSkill = 0;

			this.SetFormatReq(this.formation)
				.then(() => {
					toast_success(TextsConfig.TextsConfig_GroupFight.makeSuccess);
					this.SetInfoSelect(2);
				})
				.then(() => {

				})

		}

		public mouseUp(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupMain.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupMain.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
			this.moveImg.visible = false;
			this.moveImg.source = "";
			// this.loadDownListInfo();
			Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);
		}

		//鼠标点击拖动人物
		public mouseMove(e: egret.TouchEvent) {
			this.moveImg.x = e.stageX - 95 / 2;
			this.moveImg.y = e.stageY - 93 / 2;
			if (this.moveImg.x > this.groupDown.x + this.groupMain.x && this.moveImg.x < this.groupDown.x + this.groupMain.x + this.groupDown.width && this.moveImg.y > this.groupDown.y + this.groupMain.y && this.moveImg.y < this.groupDown.y + this.groupMain.y + this.groupDown.height) {
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

		public JudgeCanBat() {
			let info = Table.DeepCopy(this.formation);
			// this.SetFormatReq(this.formation);

			Game.PlayerFormationSystem.formatsGroupFight = info;

			let bat1 = Table.FindF(Game.PlayerFormationSystem.formatsGroupFight[0].generals, function (k, v) {
				return v != 0;
			})
			let bat2 = Table.FindF(Game.PlayerFormationSystem.formatsGroupFight[1].generals, function (k, v) {
				return v != 0;
			})

			if (bat1 && bat2) {
				return 0;
			} else {
				if (this.buttonIndex == 1) {
					if (bat1) {
						return 2;
					} else {
						return 1;
					}
				} else {
					if (bat2) {
						return 1;
					} else {
						return 2;
					}
				}
			}
		}


		//保存阵容
		public SetFormatReq(formations: Array<message.FormationInfo>): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SetFormationRequest();
				request.body.formations = formations
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SetFormationResponse>resp;
					console.log(response);
					if (response.header.result != 0) {
						return;
					}
					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}


		//
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
					if (hunterInfo == null) {
						pS.generalId = 0;
					}
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}

				if (i < 4) {
					if (pS.generalId) {

						// this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
						// this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
						// this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
						// Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);

						this["groupPos" + (i + 1)].visible = true;
						// this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
						this["clearanceLock" + (i + 1)].visible = false;
						this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
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
			for (let i = 0; i < 8; i++) {
				//组在面板上的位置x              //组在面板上的位置y
				if (this.groupPosRect[i].contains(objectData.x, objectData.y)) {//- this.groupMain.x - this.groupUp.x   - this.groupMain.y - this.groupUp.y
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
					this.refreshOverallInfo();
					break;
				}
			}
			Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
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