namespace zj {
	export class BattleSettleLose extends BattleSettle {
		public constructor() {
			super();
		}
		public tblAnalyseResult = [];
		public boardActionIndex = -1;
		public bBoardAniCome = false;
		public bContinueBattleSettleCome = false;
		public bCauseCome = false;
		public reason_num = 2;
		public tableDropItem = {};
		public tableAniNode = [];
		public NodeBoard;
		public NodeStar;
		public NodeWin;
		public ButtonCause1: eui.Group;
		public ButtonCause2: eui.Group;
		public Init() {
			super.Init();
			this.hero_come_time = ConstantConfig_BattleSettle.loseGeneralComeTime;
			if (this.ButtonCause1 != null) {
				this.ButtonCause1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCause1_CallBack, this);
			}
			if (this.ButtonCause2 != null) {
				this.ButtonCause2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCause2_CallBack, this);
			}
		}

		public Load() {
			super.Load();
			Game.SoundManager.playMusic(SoundManager.playbgmByID(100004), 1);
			this.InitAni();
			if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK && Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT && Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
				if (Gmgr.Instance.bReplay == false) {
					this.tblAnalyseResult = Game.PlayerFormationSystem.analyseResult(this.scene.formationType);
					Game.PlayerBattleSystem.cacheBattleResultInfo = this.tblAnalyseResult;
				} else {
					this.tblAnalyseResult = Game.PlayerBattleSystem.cacheBattleResultInfo;
				}
			}
			if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_ZORK
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
				// && Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CONTEND 
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
				&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD
			) {
				this.SetCauseInfoVisible(false, 2);
			}
		}
		public Update(tick) {
			super.Update(tick);
			this.UpdateReason(tick);
		}
		public UpdateLoseAni(tick) {
			if (this.total_tick >= 0 && this.bBoardAniCome == false) {
				this.bBoardAniCome = true;
				//this.boardMove();
			}
		}
		public UpdateReason(tick) {
			if (this.bCauseCome == false) { //this.total_tick >= ConstantConfig_BattleSettle.loseCasueBoardComeTime * 1000 && 
				this.bCauseCome = true;
				if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_ZORK
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
					// && Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CONTEND
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
					&& Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD
				) {
					this.CauseFadeIn();
				}
				this.DropFadeIn();
			}
			if (this.total_tick >= ConstantConfig_BattleSettle.continueBattleSettleTime * 1000 && this.bContinueBattleSettleCome == false) {
				this.bContinueBattleSettleCome = true;
				Gmgr.Instance.checkContinueBattleSettle(false, this.nextMobID);
			}
		}
		public InitAni() {
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
				this.InitSingleAni();
			} else {
				this.InitNormalAni();
			}
		}
		public InitSingleAni() {

		}
		public InitNormalAni() {
			this.tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
			let boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];
			let winAniName = ["012_shibai_chuxian", "013_shibai_xunhuan"];
			let starAniName = ["002_lingxing_chuxian", "003_lingxing_xunhuan"];
			let thisOne = this;

			Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						armatureDisplay.animation.play(boardAniName[1], 0);
					}, thisOne)
					armatureDisplay.animation.play(boardAniName[0], 1);
					armatureDisplay.x = thisOne.NodeBoard.width / 2;
					armatureDisplay.y = thisOne.NodeBoard.height / 2;
					thisOne.NodeBoard.addChild(armatureDisplay);
				});


			Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						armatureDisplay.animation.play(starAniName[1], 0);
					}, thisOne)
					armatureDisplay.animation.play(starAniName[0], 1);
					armatureDisplay.x = thisOne.NodeStar.width / 2;
					armatureDisplay.y = thisOne.NodeStar.height / 2;
					thisOne.NodeStar.addChild(armatureDisplay);
				});

			Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						armatureDisplay.animation.play(winAniName[1], 0);
					}, thisOne)
					armatureDisplay.animation.play(winAniName[0], 1);
					armatureDisplay.x = thisOne.NodeWin.width / 2;
					armatureDisplay.y = thisOne.NodeWin.height / 2;
					thisOne.NodeWin.addChild(armatureDisplay);
				});
		}
		public SetCauseInfoVisible(tag, num) {
			if (num > 2) {
				console.assert(false);
			}
			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseIcon" + (i + 1)] != null) {
					this["SpriteCauseIcon" + (i + 1)].visible = tag;
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseWord" + (i + 1)] != null) {
					this["SpriteCauseWord" + (i + 1)].visible = tag;
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["ButtonCause" + (i + 1)] != null) {
					this["ButtonCause" + (i + 1)].visible = tag;
				}
			}
		}
		public BattleResultTip() {
			let num = yuan3(this.tblAnalyseResult.length >= 2, 2, this.tblAnalyseResult.length);
			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseIcon" + (i + 1)] != null) {
					this["SpriteCauseIcon" + (i + 1)].visible = true;
					this["SpriteCauseIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_BattleSettleResult[this.tblAnalyseResult[i].type].icon, this);
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseWord" + (i + 1)] != null) {
					this["SpriteCauseWord" + (i + 1)].visible = true;
					this["SpriteCauseWord" + (i + 1)].source = cachekey(UIConfig.UIConfig_BattleSettleResult[this.tblAnalyseResult[i].type].path, this);
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["ButtonCause" + (i + 1)] != null) {
					this["ButtonCause" + (i + 1)].visible = true;
				}
			}
		}
		public CauseFadeIn() {
			this.BattleResultTip();
			let num = yuan3(this.tblAnalyseResult.length >= 2, 2, this.tblAnalyseResult.length);

			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseIcon" + (i + 1)] != null) {
					this["SpriteCauseIcon" + (i + 1)].alpha = 0;
					egret.Tween.get(this["SpriteCauseIcon" + (i + 1)]).to({ alpha: 1 }, ConstantConfig_BattleSettle.loseCauseBoardFadeIconTime);
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["SpriteCauseWord" + (i + 1)] != null) {
					this["SpriteCauseWord" + (i + 1)].alpha = 0;
					egret.Tween.get(this["SpriteCauseWord" + (i + 1)]).to({ alpha: 1 }, ConstantConfig_BattleSettle.loseCauseBoardFadeWordTime);
				}
			}
			for (let i = 0; i < num; i++) {
				if (this["ButtonCause" + (i + 1)] != null) {
					this["ButtonCause" + (i + 1)].alpha = 0;
					egret.Tween.get(this["ButtonCause" + (i + 1)]).to({ alpha: 1 }, ConstantConfig_BattleSettle.loseCauseBoardFadeButtonTime);
				}
			}
		}
		public resultSkip(type, generalId) {
			Game.UIManager.popAllScenesAndDialogs(() => {
				Gmgr.Instance.bReplay = false;
				if (type == TableEnum.EnumAnalyseResult.RESULT_FORMAT) {
					Gmgr.Instance.bPause = false;
					Gmgr.Instance.bReplay = false;
					if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
						if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
							let bMaxChapter = !Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview;
							// loadUI(Adventurems)
							// 	.then((scene: Adventurems) => {
							// 		scene.LoadFromBattleNormal(bMaxChapter);
							// 		scene.show(UI.SHOW_FROM_TOP);
							// 	});
							SceneManager.instance.EnterAdventure(bMaxChapter ? 1 : 0);
						} else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
							let bMaxChapter = !Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview;
							// loadUI(Adventurems)
							// 	.then((scene: Adventurems) => {
							// 		scene.LoadFromBattleElite(bMaxChapter);
							// 		scene.show(UI.SHOW_FROM_TOP);
							// 	});
							SceneManager.instance.EnterAdventure(bMaxChapter ? 2 : 0);
						}
					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
						loadUI(SkyAreanMainScene)
							.then((scene: SkyAreanMainScene) => {
								scene.show(UI.SHOW_FROM_TOP);
								scene.Init();
							});
					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
						loadUI(licenseMain)
							.then((scene: licenseMain) => {
								scene.show(UI.SHOW_FROM_TOP);
							});
					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
						loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
							Game.PlayerArenaSystem.ladderList(true).then((data: any) => {
								dialog.setInfo(data, () => {
								});
								dialog.show(UI.SHOW_FROM_TOP);
							});
						});
					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {

					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
						loadUI(WantedSecondMeteorstanceScene)
							.then((scene: WantedSecondMeteorstanceScene) => {
								scene.Init(1);
								scene.show(UI.SHOW_FROM_TOP);
							});
					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {

					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {

					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {

					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {

					} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT) {

					}
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_VISIT) {
					loadUI(TavernScene)
						.then((scene: TavernScene) => {
							scene.show(UI.SHOW_FILL_OUT);
							scene.nPCDialog();
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_CARD_NUM) {
					loadUI(CardMainScene)
						.then((scene: CardMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_LEVEL) {
					loadUI(HunterMainScene)
						.then((scene: HunterMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STAR) {
					loadUI(HunterMainScene)
						.then((scene: HunterMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STEP) {
					loadUI(HunterMainScene)
						.then((scene: HunterMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_UPGRADE_SKILLS) {
					loadUI(HunterMainScene)
						.then((scene: HunterMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
						});
				} else if (type == TableEnum.EnumAnalyseResult.RESULT_UPGRADE_ADVISER) {
					loadUI(PetMainScene)
						.then((dialog: PetMainScene) => {
							dialog.inIt(1);
							dialog.show(UI.SHOW_FILL_OUT);
						});
				}
			});
		}
		public ButtonCause1_CallBack() {
			let num = this.tblAnalyseResult.length;
			if (num >= 1) {
				this.resultSkip(this.tblAnalyseResult[0].type, this.tblAnalyseResult[0].general_id);
			}
		}
		public ButtonCause2_CallBack() {
			let num = this.tblAnalyseResult.length;
			if (num >= 2) {
				this.resultSkip(this.tblAnalyseResult[1].type, this.tblAnalyseResult[1].general_id);
			}
		}
		public DropFadeIn() {
			this.LoadDropsList();
		}

		public LoadDropsList() {
			if (this.TableViewDrops == null) {
				return;
			}
			let TableViewDrops: eui.ArrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < this.scene.getItemInfo.items.length; i++) {
				if (this.scene.getItemInfo.items[i].goodsId != 0) {
					let data = new BattleEndDropItemData();
					data.index = i;
					data.itemInfo = this.scene.getItemInfo.items[i];
					data.father = this;
					TableViewDrops.addItem(data);
				}
			}
			this.TableViewDrops.dataProvider = TableViewDrops;
			this.TableViewDrops.itemRenderer = BattleEndDropItem;
		};
		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			let ui = this.getChildByName("UI");
			if (ui) {
				return;
			}
			let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
			if (PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
				(<CommonDesGeneral>commonDesSkill).reSetGeneral();
			}
			commonDesSkill.name = "UI";
			this.addChild(commonDesSkill);
		}
		/**抬起时将按钮缩回��?*/ /**抬起移除奖励详情界面 */
		public up() {
			let ui = this.getChildByName("UI");
			if (ui) {
				this.removeChild(ui);
			}
		}
	}
}