namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-21
	 * 
	 * @class 贪婪之岛战报详情展示
	 */
	export class LeagueWarPop extends Dialog {
		public btnClose: eui.Button;
		public SpriteOrnTip: eui.Image;
		public SpriteBoardTip: eui.Image;
		public groupRoot: eui.Group;
		public SpriteResult: eui.Image;
		public SpriteZhan: eui.Image;
		public SpriteFire: eui.Image;
		public NodeLeft: eui.Group;
		public SpriteLeftHpBar: eui.Image;
		public TextHpLeft: eui.Label;
		public SpriteLeftHead: eui.Image;
		public LabelLevelNumA: eui.BitmapLabel;
		public LabelLeftName: eui.Label;
		public LabelPlayerPowerLeft: eui.Label;
		public NodeRight: eui.Group;
		public SpriteRightHpBar: eui.Image;
		public TextHpRight: eui.Label;
		public SpriteRightHead: eui.Image;
		public LabelLevelNumB: eui.BitmapLabel;
		public LabelRightName: eui.Label;
		public LabelPlayerPowerRight: eui.Label;
		public TableViewMine: eui.List;
		public TableViewOpp: eui.List;
		public NodeAdd: eui.Group;
		public ButtonHurt: eui.Button;
		public ButtonBlood: eui.Button;
		public ButtonSwitch: eui.Group;
		public SpriteHook0: eui.Image;
		public SpritePetFrameLeft: eui.Image;
		public SpriteIconLeft: eui.Image;
		public NodeStarLeft: eui.Group;
		public SpritePetFrameRight: eui.Image;
		public SpriteIconRight: eui.Image;
		public NodeStarRight: eui.Group;
		public groupTeach: eui.Group;
		public groupPetLeft: eui.Group;
		public groupPetRight: eui.Group;
		private SpriteLeftHpBarbg: eui.Image;
		private SpriteRightHpBarbg: eui.Image;

		private rpgInfo;
		private LeftIsEnd: boolean = false;
		private RightIsEnd: boolean = false;
		private barType: number = TableEnum.Enum.FastResultBarType.HP;
		private firstPlay: boolean = true;
		public leftData = [];
		public rightData = [];
		public leftGeneralsData = [];
		public rightGeneralsData = [];

		private itemsMineGeneral = [];
		private itemsOppGeneral = [];
		private array1 = new eui.ArrayCollection();
		private array2 = new eui.ArrayCollection();
		private leftnumber: number = 0;
		private rightnumber: number = 0;
		public maxValue: number = 0;
		private minNum: number = 0;
		/**判断子项显示战斗力还是血条 true是血条 false 是伤害*/
		public vis: boolean = true;

		private leftMaxHp;
		private leftBeforeHp;
		private leftCurHp;
		private rightMaxHp;
		private rightBeforeHp;
		private rightCurHp;
		private update;
		private scene = StageSceneManager.Instance.GetCurScene();
		public goodShow: boolean = false;
		public isClose: boolean = false;

		private isEndL: boolean = false;
		private isEndR: boolean = false;

		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueWarPopSkin.exml";
			this.SpriteLeftHpBar.mask = this.SpriteLeftHpBarbg;
			this.SpriteRightHpBar.mask = this.SpriteRightHpBarbg;
			this.firstPlay = true;
		}

		private init() {
			this.ButtonSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSwitch, this);
			this.ButtonBlood.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBlood, this);
			this.ButtonHurt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHurt, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.setSwitch();
			// this.PlayFirstAni();
			this.NodeLeft.x -= 480;
			this.NodeLeft.alpha = 0;
			this.NodeRight.x += 480;
			this.NodeRight.alpha = 0;
			this.SpriteZhan.alpha = 0;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
			}, this);
			// this.goodShow = false;
			// this.isClose = false;
		}

		public PlayLastReport() {
			this.rpgInfo = Table.DeepCopy(Game.PlayerWonderLandSystem.resultInfo)
			this.LoadReport()
			this.btnClose.visible = true;
			this.InitBeforePlay()
			this.update = egret.setInterval(this.RefreshPlayerState, this, 999);
			this.init();
		}

		public RefreshPlayerState() {
			if (TableEnum.TableEnumOtherState.OtherState_Die != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_FightShowAtk != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_FallDown != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_StirUp != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_StirDown != this.scene.playerLeader.otherState &&
				this.rpgInfo.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
				// PopUIUntil(this:GetUIName())
				// UICloseAndUp(this)
			}
			if (TableEnum.TableEnumOtherState.OtherState_FightShowAtk != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_FallDown != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_StirUp != this.scene.playerLeader.otherState &&
				TableEnum.TableEnumOtherState.OtherState_StirDown != this.scene.playerLeader.otherState) {
				this.btnClose.visible = (true)
			}
		}

		public PlayReport(info) {
			this.rpgInfo = Table.copy(info);
			this.LoadReport();
			this.InitBeforePlay();
			this.init();
		}

		private LoadReport() {
			[this.rpgInfo.leftAllHp, ,] = this.getAllHp(this.rpgInfo.leftArmy);
			[this.rpgInfo.rightAllHp, ,] = this.getAllHp(this.rpgInfo.rightArmy);

			if (this.rpgInfo.leftRoleBase.id != Game.PlayerInfoSystem.BaseInfo.id) {
				let a = Table.DeepCopy(this.rpgInfo.leftRoleBase);
				let b = Table.DeepCopy(this.rpgInfo.rightRoleBase);
				this.rpgInfo.leftRoleBase = b;
				this.rpgInfo.rightRoleBase = a;
				let c = Table.DeepCopy(this.rpgInfo.leftArmy);
				let d = Table.DeepCopy(this.rpgInfo.rightArmy);
				this.rpgInfo.leftArmy = d;
				this.rpgInfo.rightArmy = c;
				let e = Table.DeepCopy(this.rpgInfo.leftGenerals);
				let f = Table.DeepCopy(this.rpgInfo.rightGenerals);
				this.rpgInfo.leftGenerals = f;
				this.rpgInfo.rightGenerals = e;
				let g = Table.DeepCopy(this.rpgInfo.leftAllHp);
				let h = Table.DeepCopy(this.rpgInfo.rightAllHp);
				this.rpgInfo.leftAllHp = h;
				this.rpgInfo.rightAllHp = g;
				if (this.rpgInfo.battleResult == 1) {
					this.rpgInfo.battleResult = 2;
				} else if (this.rpgInfo.battleResult == 2) {
					this.rpgInfo.battleResult = 1;
				}
			}
			this.leftData = Table.copy(this.rpgInfo.leftArmy)
			this.rightData = Table.copy(this.rpgInfo.rightArmy)
			this.leftGeneralsData = Table.copy(this.rpgInfo.leftGenerals)
			this.rightGeneralsData = Table.copy(this.rpgInfo.rightGenerals)


			this.minNum = 0
			if (this.leftData.length > this.rightData.length) {
				this.minNum = this.rightData.length
			} else {
				this.minNum = this.leftData.length
			}
			this.LeftIsEnd = false;
			this.RightIsEnd = false;
			this.barType = TableEnum.Enum.FastResultBarType.HP;
			this.firstPlay = true;

			this.maxValue = 0;

			for (let i = 0; i < this.rightData.length; i++) {
				if (this.rightData[i] != null && this.rightData[i] != undefined) {
					if (this.maxValue < this.rightData[i].cur_pos) {
						this.maxValue = this.rightData[i].cur_pos
					}
				}
			}
			for (let i = 1; i < this.leftData.length; i++) {
				if (this.leftData[i] != null && this.leftData[i] != undefined) {
					if (this.maxValue < this.leftData[i].cur_pos) {
						this.maxValue = this.leftData[i].cur_pos
					}
				}
			}
			let a = [];
			this.leftData.splice(0, 0, a);
			this.leftData.splice(0, 0, a);
			this.rightData.splice(0, 0, a);
			this.rightData.splice(0, 0, a);
		};
		private InitBeforePlay() {
			this.initUi();
			this.initBar();
			this.PlayFirstAni()
		}


		private initUi() {
			if (PlayerItemSystem.ItemType(this.rpgInfo.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.Item(this.rpgInfo.rightRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.rpgInfo.rightRoleBase.picId);
				if (mpr != null) {
					this.SpriteRightHead.source = cachekey(mpr.head_path, this);
				}
			} else {
				this.SpriteRightHead.source = cachekey(PlayerItemSystem.ItemPath(this.rpgInfo.rightRoleBase.picId), this);
			}

			if (PlayerItemSystem.ItemType(this.rpgInfo.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.Item(this.rpgInfo.leftRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.rpgInfo.leftRoleBase.picId);
				if (mpr != null) {
					this.SpriteLeftHead.source = cachekey(mpr.head_path, this);
				}
			} else {
				this.SpriteLeftHead.source = cachekey(PlayerItemSystem.ItemPath(this.rpgInfo.leftRoleBase.picId), this);
			}

			this.LabelLeftName.text = this.rpgInfo.leftRoleBase.name;
			this.LabelLevelNumA.text = ("Lv" + this.rpgInfo.leftRoleBase.level)
			let right_name = ""
			if (this.rpgInfo.rightRoleBase.name_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
				right_name = Game.PlayerWonderLandSystem.Des(Number(this.rpgInfo.rightRoleBase.name));
			} else {
				right_name = this.rpgInfo.rightRoleBase.name;
			}

			this.LabelRightName.text = right_name
			this.LabelLevelNumB.text = ("Lv" + this.rpgInfo.rightRoleBase.level)
			this.LabelPlayerPowerLeft.text = (Set.NumberUnit3(this.getGeneralPower(this.rpgInfo.leftGenerals)))
			this.LabelPlayerPowerRight.text = (Set.NumberUnit3(this.getGeneralPower(this.rpgInfo.rightGenerals)))

			this.NodeLeft.x -= 480;
			this.NodeLeft.alpha = 0;
			this.NodeRight.x += 480;
			this.NodeRight.alpha = 0;
			this.SpriteZhan.alpha = 0;

			this.ButtonBlood.visible = false;
			this.ButtonHurt.visible = false;

			this.SpriteResult.visible = false;

			this.SpriteBoardTip.visible = false;
			this.SpriteOrnTip.visible = false;

			let noLeftPet = () => {
				this.groupPetLeft.visible = (false)
			}

			let noRightsPet = () => {
				this.groupPetRight.visible = (false);
			}

			if (this.rpgInfo.leftRoleBase.petInfo != null && this.rpgInfo.leftRoleBase.petInfo.length > 0 && this.rpgInfo.leftRoleBase.petInfo != undefined) {
				let leftPetCarryInfo = Table.FindR(this.rpgInfo.leftRoleBase.petInfo, (_k, _v) => {
					return _v.situtation == 1;
				})

				if (leftPetCarryInfo != null && leftPetCarryInfo[0] != null) {
					let dat_tbl = TableBasePet.Item(leftPetCarryInfo[0].pet_id)
					this.SpriteIconLeft.source = dat_tbl.frame_path
					PetEvolution.GetNodeStarByAlignmentsPet(this.NodeStarLeft, 5, 5, 1, leftPetCarryInfo[0].star, null)
				} else {
					noLeftPet()
				}
			} else {
				noLeftPet()
			}

			if ((this.rpgInfo.rightRoleBase.petInfo) != null && this.rpgInfo.rightRoleBase.petInfo.length > 0 && this.rpgInfo.rightRoleBase.petInfo != undefined) {
				let rightPetCarryInfo = Table.FindR(this.rpgInfo.rightRoleBase.petInfo, function (_k, _v) {
					return _v.situtation == 1
				})

				if (rightPetCarryInfo != null && rightPetCarryInfo[0] != null) {
					let dat_tbl = TableBasePet.Item(rightPetCarryInfo[0].pet_id)
					this.SpriteIconRight.source = dat_tbl.frame_path
					PetEvolution.GetNodeStarByAlignmentsPet(this.NodeStarRight, 5, 5, 1, rightPetCarryInfo[0].star, null);
				} else {
					noRightsPet()
				}
			} else {
				noRightsPet()
			}
		}

		private getGeneralPower(generalList) {
			let generalPowerSub = 0
			for (let k in generalList) {
				if (generalList.hasOwnProperty(k)) {
					let v = generalList[k];
					generalPowerSub = generalPowerSub + v.battleValue
				}
			}
			return generalPowerSub;
		}

		/**子类调动，子项特效都结束后调用，本类播放动画 */
		public LeftEnd() {
			this.LeftIsEnd = true;
			this.isEndL = true;
			if (this.RightIsEnd) {
				this.AniResult();
				Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
				this.RightIsEnd = false;
			}
		}

		public RightEnd() {
			this.RightIsEnd = true;
			this.isEndR = true;
			if (this.LeftIsEnd) {
				this.AniResult();
				Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
				this.LeftIsEnd = false;
			}
		}

		private AniCall(close?) {
			if (this.goodShow) {
				return;
			}
			this.goodShow = true;
			let sceneGoods = [];
			let resultList = [];
			if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
				sceneGoods = Game.PlayerWonderLandSystem.getGoods;
				resultList = Game.PlayerWonderLandSystem.resultList;
			} else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				sceneGoods = Game.PlayerWonderLandSystem.darkland.getGoods;
				resultList = Game.PlayerWonderLandSystem.darkland.resultList;
			}
			if (Game.PlayerWonderLandSystem.resultInfo.battleType == message.EFormationType.FORMATION_TYPE_WONDERLAND && sceneGoods != null && !this.isClose) {
				let getGold = false
				let loseGold = false
				let lose_good = [];
				let good = [];
				let fightGoods = [];

				//仙境新手处理  
				if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
					for (let k in sceneGoods) {
						if (sceneGoods.hasOwnProperty(k)) {
							let v = sceneGoods[k];
							if (Game.PlayerWonderLandSystem.wonderlandId == 1 || Game.PlayerWonderLandSystem.wonderlandId == 4) {
								getGold = true;
								good.push(v);
								fightGoods.push(v);
							} else {
								if (v.index == 2) {//1显示在恭喜获得，2显示失去
									loseGold = true
									lose_good.push(v)
									fightGoods.push(v)
								} else if (v.index == 1) {
									getGold = true
									good.push(v);
									fightGoods.push(v);
								}
							}
						}
					}
				}
				if ((resultList) && (fightGoods)) {
					if (resultList.length > 0) {
						if (resultList[0].goods == null) {
							resultList[0].goods = Table.DeepCopy(sceneGoods)
						}
					}
				}
				if (getGold && !close) {
					if (!Teach.m_bOpenTeach) {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(good);
								dialog.show();
							});
					}
				}
				if (lose_good && !close) {
					for (let k in lose_good) {
						if (lose_good.hasOwnProperty(k)) {
							let v = lose_good[k];
							let itemSet = PlayerItemSystem.Set(v.goodsId, v.showType) as any;
							Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, itemSet.Info.name, v.count), this.height, this.width, null, UIConfig.UIConfig_Wonderland.tipBoard[1]);
						}
					}
				}

				for (let k in sceneGoods) {
					if (sceneGoods.hasOwnProperty(k)) {
						let v = sceneGoods[k];
						if (v.index != 1 && v.index != 2 && !close) {
							let itemSet = PlayerItemSystem.Set(v.goodsId, v.showType) as any;
							let rgb = Helper.HexToRGB(ConstantConfig_Common.Color.quality_color[itemSet.Info.quality - 1]);
							rgb.r = Math.floor(rgb.r);
							rgb.g = Math.floor(rgb.g);
							rgb.b = Math.floor(rgb.b);
							// Common_Tip.AddTip(Helper.StringFormat("%s%s", itemSet.Info.name, v.count), this.height, this.width, null, UIConfig.UIConfig_Wonderland.tipBoard[0]);
							Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, itemSet.Info.name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[0])
						}
					}
				}
				if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
					Game.PlayerWonderLandSystem.getGoods = [];
				} else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
					Game.PlayerWonderLandSystem.darkland.getGoods = [];
				}
				if (Game.PlayerWonderLandSystem.mobsDebuffTips) {
					toast_warning(TextsConfig.TextsConfig_Wonderland.mobs_debuff);
					Game.PlayerWonderLandSystem.mobsDebuffTips = false;
				}

			}
		}

		private setSwitch() {
			this.SpriteHook0.visible = zj.Device.fastBattleSwitch;
		}

		private AniResult() {
			if (this.firstPlay) {
				let NodeResult = new eui.Group();
				let NodeBoardTip = new eui.Group();
				let NodeOrnTip = new eui.Group();
				this.groupRoot.addChild(NodeOrnTip);
				this.groupRoot.addChild(NodeBoardTip);
				this.groupRoot.addChild(NodeResult);
				if (this.rpgInfo.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
					this.AniCall()
					this.RightHpSub(this.rightBeforeHp);
					Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "002_beijingguang_03", 0)
						.then(display => {
							display.y = 5;
							display.name = "ui_tongyong_beijingguang";
							if (!NodeOrnTip.getChildByName("ui_tongyong_beijingguang")) {
								NodeOrnTip.addChild(display);
							}
						}).catch(reason => {
							toast(reason);
						});
					Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_diban", null, [], [])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.play("009_diban5_xunhuan", 0);
							}, this)
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							armatureDisplay.animation.play("008_diban5_chuxian", 1);
							NodeBoardTip.addChild(armatureDisplay);
						});
					cachekey(UIConfig.UIConfig_League.WarResultWin, this);
					let img = new eui.Image(UIConfig.UIConfig_League.WarResultWin);
					img.anchorOffsetX = 98;
					img.anchorOffsetY = 42;
					Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [img], ["003_wenzi"])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.play("001_xunhuan", 0);
							}, this)
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							armatureDisplay.animation.play("000_chuxian", 1);
							NodeResult.addChild(armatureDisplay);
						});
					// this.firstPlay = false;
				} else {
					this.AniCall()
					this.LeftHpSub(this.leftBeforeHp);
					Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_diban", null, [], [])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.play("011_diban6_xunhuan", 0);
							}, this)
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							armatureDisplay.animation.play("010_diban6_chuxian", 1);
							NodeBoardTip.addChild(armatureDisplay);
						});
					cachekey(UIConfig.UIConfig_League.WarResultLose, this);
					let img = new eui.Image(UIConfig.UIConfig_League.WarResultLose);
					img.anchorOffsetX = 98;
					img.anchorOffsetY = 42;
					Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [img], ["003_wenzi"])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.play("001_xunhuan", 0);
							}, this)
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							armatureDisplay.animation.play("000_chuxian", 1);
							NodeResult.addChild(armatureDisplay);
						});

				}

			}
			this.firstPlay = false;
			this.ButtonBlood.visible = this.barType == TableEnum.Enum.FastResultBarType.HURT;
			this.ButtonHurt.visible = this.barType == TableEnum.Enum.FastResultBarType.HP;
		}

		private onBtnBlood() {
			this.ButtonBlood.visible = false;
			this.ButtonHurt.visible = false;
			this.barType = TableEnum.Enum.FastResultBarType.HP;
			this.ResetListAni();
			this.vis = true;
			this.lodelist();

		}

		private onBtnHurt() {
			this.ButtonBlood.visible = false;
			this.ButtonHurt.visible = false;
			this.barType = TableEnum.Enum.FastResultBarType.HURT;
			this.ResetListAni()
			this.vis = false;
			this.lodelist();
		}

		private lodelist() {
			// [this.leftMaxHp, this.leftBeforeHp, this.leftCurHp] = this.getAllHp(this.leftData);
			// [this.rightMaxHp, this.rightBeforeHp, this.rightCurHp] = this.getAllHp(this.rightData);
			// this.leftMaxHp = this.rpgInfo.leftAllHp;
			// this.rightMaxHp = this.rpgInfo.rightAllHp;
			this.leftnumber = 0;
			this.rightnumber = 0;
			this.TableViewMine.scrollV = 0;
			this.TableViewOpp.scrollV = 0;
			this.array1.removeAll();
			this.array2.removeAll();
			this.LoadLeftGeneral();
			this.LoadRightGeneral();
		}

		private ResetListAni() {
			this.LeftIsEnd = false
			this.RightIsEnd = false
			if (this.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.initBar()
			}
		}

		private initBar() {
			[this.leftMaxHp, this.leftBeforeHp, this.leftCurHp] = this.getAllHp(this.leftData);
			[this.rightMaxHp, this.rightBeforeHp, this.rightCurHp] = this.getAllHp(this.rightData);

			this.leftMaxHp = this.rpgInfo.leftAllHp;
			this.rightMaxHp = this.rpgInfo.rightAllHp;

			this.ResetBar();
		}

		private ResetBar() {
			this.TextHpLeft.text = (Set.NumberUnit3(Math.floor(this.leftBeforeHp)) + "/" + Set.NumberUnit3(Math.floor(Math.floor(this.leftMaxHp))))
			this.TextHpRight.text = (Set.NumberUnit3(Math.floor(this.rightBeforeHp)) + "/" + Set.NumberUnit3(Math.floor(Math.floor(this.rightMaxHp))))
			egret.Tween.get(this.SpriteLeftHpBarbg).to({ width: (this.SpriteLeftHpBar.width * this.leftBeforeHp / this.leftMaxHp) }, 400)
			egret.Tween.get(this.SpriteRightHpBarbg).to({ width: (this.SpriteRightHpBar.width * this.rightBeforeHp / this.rightMaxHp) }, 400)
			if (this.leftBeforeHp <= 0) {
				egret.Tween.removeTweens(this.SpriteLeftHpBarbg);
				this.SpriteLeftHpBarbg.width = 0;
			}
			if (this.rightBeforeHp <= 0) {
				egret.Tween.removeTweens(this.SpriteRightHpBarbg);
				this.SpriteRightHpBarbg.width = 0;
			}
		}

		public LeftHpSub(hp) {
			if (hp < 0) {
				hp = 0;
			}
			if (this.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.leftBeforeHp -= hp;
				if (this.leftBeforeHp < 0) {
					this.leftBeforeHp = 0;
				}
				this.ResetBar()
			}
		}

		public RightHpSub(hp) {
			if (hp < 0) {
				hp = 0;
			}
			if (this.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.rightBeforeHp -= hp;
				if (this.rightBeforeHp < 0) {
					this.rightBeforeHp = 0;
				}
				this.ResetBar()
			}
		}

		private PlayFirstAni() {
			let paths = [];
			if (PlayerItemSystem.ItemType(this.rpgInfo.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.Table(this.rpgInfo.rightRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.rpgInfo.rightRoleBase.picId)
				if (mpr != null) {
					paths[1] = mpr.half_path;
				}
			} else {
				let table = PlayerItemSystem.Table(this.rpgInfo.rightRoleBase.picId) as any
				paths[1] = TableMapRole.Item(table.mapRole_id).half_path;
			}
			if (PlayerItemSystem.ItemType(this.rpgInfo.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.Item(this.rpgInfo.leftRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.rpgInfo.leftRoleBase.picId)
				if (mpr != null) {
					paths[0] = mpr.half_path;
				}
			} else {
				let table = PlayerItemSystem.Table(this.rpgInfo.leftRoleBase.picId) as any
				paths[0] = TableMapRole.Item(table.mapRole_id).half_path;
			}
			let pathNodes = [];
			for (let i = 0; i < 2; i++) {
				cachekey(paths[i], this);
				let img = new eui.Image(paths[i]);
				let sx = i == 0 ? 1 : -1;
				// img.scaleX = sx * 0.6;
				// img.scaleY = 0.6;
				img.width = 502 * 0.6;
				img.height = 487 * 0.6;
				img.anchorOffsetX = img.width / 2;
				img.anchorOffsetY = img.height / 2;
				pathNodes.push(img);
			}

			let bones = ["006_juese1", "007_juese2"]//[]//
			Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tanlanzhidao_03", null, pathNodes, bones)
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
						this.Show();
					}, this)
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.animation.play("000_juese", 1);
					this.NodeAdd.addChild(armatureDisplay);
				});



		}

		private Show() {
			egret.Tween.get(this.NodeLeft).to({ alpha: 1 }, 1).to({ x: 135 }, 400).to({ x: 85 }, 100).call(() => {
				this.LoadLeftGeneral();
				this.LoadRightGeneral();
			});
			egret.Tween.get(this.NodeRight).to({ alpha: 1 }, 1).to({ x: 510 }, 400).to({ x: 560 }, 100);
			egret.Tween.get(this.SpriteZhan).to({ alpha: 1 }, 1).to({ scaleX: 1.2, scaleY: 1.2 }, 350).to({ scaleX: 1, scaleY: 1 }, 150);
			// this.AniResult();
		}

		/**加载左侧list */
		public LoadLeftGeneral() {
			let array = new eui.ArrayCollection();
			if (this.leftnumber < 12) {
				if (this.leftnumber >= this.leftData.length) {
					return;
				}
				let data = new LeagueWarPopItemMineData();
				data.index = this.leftnumber;
				data.barType = this.barType;
				data.itemInfo = this.leftData[this.leftnumber];
				data.maxValue = this.maxValue;
				data.oppNum = this.minNum;
				data.generalInfo = this.leftGeneralsData[this.leftnumber - 2];
				data.itemtype = 0;
				data.father = this;
				this.leftnumber++;
				this.array1.addItemAt(data, 0);
			}
			this.TableViewMine.dataProvider = this.array1;
			this.TableViewMine.itemRenderer = LeagueWarPopItemMine;
		}

		/**加载右侧list */
		public LoadRightGeneral() {
			if (this.rightnumber < 12) {
				if (this.rightnumber >= this.rightData.length) {
					return;
				}
				let data = new LeagueWarPopItemEnemyData();
				data.index = this.rightnumber;
				data.barType = this.barType;
				data.itemInfo = this.rightData[this.rightnumber];
				data.maxValue = this.maxValue;
				data.oppNum = this.minNum;
				data.generalInfo = this.rightGeneralsData[this.rightnumber - 2];
				data.itemtype = 0;
				data.father = this;
				this.rightnumber++;
				this.array2.addItemAt(data, 0);
			}
			this.TableViewOpp.dataProvider = this.array2;
			this.TableViewOpp.itemRenderer = LeagueWarPopItemEnemy;
		}

		private onBtnSwitch() {
			zj.Device.fastBattleSwitch = !zj.Device.fastBattleSwitch;
			zj.Device.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch, zj.Device.fastBattleSwitch)
			zj.Device.fastBattleHideTips = 0;
			zj.Device.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleHideTips, zj.Device.fastBattleSwitch)
			this.setSwitch();
		}

		private getAllHp(tableDate) {
			let maxHp = 0
			let curHp = 0
			let beforeHp = 0

			for (let k in tableDate) {
				if (tableDate.hasOwnProperty(k)) {
					let v = tableDate[k];
					if (v && Object.keys(v).length > 0) {
						maxHp = maxHp + v.cur_bean
					}
				}
			}
			for (let k in tableDate) {
				if (tableDate.hasOwnProperty(k)) {
					let v = tableDate[k];
					if (v && Object.keys(v).length > 0) {
						beforeHp = beforeHp + v.cur_rage
						curHp = curHp + v.cur_hp
					}
				}
			}
			return [maxHp, beforeHp, curHp];
		}

		private onBtnClose() {
			this.AniCall(true);
			this.isClose = true;
			if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
				Game.PlayerWonderLandSystem.getGoods = [];
			} else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				Game.PlayerWonderLandSystem.darkland.getGoods = [];
			}
			Teach.addTeaching()
			this.close(UI.HIDE_TO_TOP);
		}
	}
}