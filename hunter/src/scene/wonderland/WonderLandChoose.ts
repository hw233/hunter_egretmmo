namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-6-13
	 * 
	 * @class 贪婪之岛大草原安多尼拔
	 */
	export class WonderLandChoose extends Dialog {
		private labelPlant: eui.Label;
		private btnPlant: eui.Button;
		private labelGold: eui.Label;
		private btnGold: eui.Button;
		private groupCurrency: eui.Group;
		private labelLeagueName: eui.Label;
		private leagueName: eui.Label;
		private labelPlayerPower: eui.Label;
		private imgHead: eui.Image;
		private imgFrame: eui.Image;
		private labelLevel: eui.Label;
		private imgBar: eui.Image;
		private imgBarBg: eui.Image;
		private btnEvilClear: eui.Button;
		private btnEvil: eui.Button;
		private labelEvillValue: eui.Label;
		private imgButton3: eui.Image;
		private btn1: eui.Button;
		private imgSml3: eui.Image;
		private labelBtn3: eui.Label;
		private imgSpeedCdBoard: eui.Image;
		private labelSpeedCd: eui.Label;
		private labelSpeedFree: eui.Label;
		private imgButton4: eui.Image;
		private btn2: eui.Button;
		private imgSml4: eui.Image;
		private labelBtn4: eui.Label;
		private imgBloodCdBoard: eui.Image;
		private labelBloodCd: eui.Label;
		private labelBloodFree: eui.Label;
		private btnFruit: eui.Button;
		private btnReport: eui.Button;
		private btnTeam: eui.Button;
		private btnRogue: eui.Button;
		private groupRogue: eui.Group;
		private imgFruitNum: eui.Image;
		private labelFruitNum: eui.BitmapLabel;
		private layerDie: eui.Group;
		private btnRevive: eui.Button;
		private btnCancel: eui.Button;
		private groupDieCost: eui.Group;
		private labelConsume: eui.Label;
		private labelDieTips: eui.Label;
		private labelLeftTime: eui.Label;
		private btnChange: eui.Button;
		private btnClose: eui.Button;
		private btnChat: eui.Button;
		private groupBattleArray: eui.Group;//阵容
		private groupParcel: eui.Group;//包裹
		private imgRightBg: eui.Image;//阵容包裹底下的背景图

		/**当前场景 */
		private scene;
		private speedCdProgress = null;
		private bloodCdProgress = null;

		private honorInspireNum: number = -1;
		private tokenInspireNum: number = -1;

		private bFreeSpeed: boolean = false;
		private bFreeBlood: boolean = false;
		private showDie: boolean = true;
		private thisHp: number = 0;
		private tokenBefore: number = -1;
		private plateBefore: number = -1;
		private evilValue: number = 0;
		private time_id: number = 0;
		private update: number;
		private time_meter: number;
		private _toMode;
		private time;

		private RimgGroup: eui.Group;
		private jewel2: eui.Image;
		private jewel: eui.Image;

		private description: eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/skins/wonderland/WonderLandChooseSkin.exml";
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.time = egret.setTimeout(this.timeFun, this, 200);
			this.init();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.Tween.removeTweens(this);
			}, null);

		}
		private timeFun() {
			egret.clearTimeout(this.time);
			let ui = this.getChildByName("__rect_back");
			if (ui) {
				this.removeChild(ui);
			}
		}

		private init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnPlant.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlant, this);
			this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGold, this);
			this.btnRogue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRogue, this);
			this.btnTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam, this);
			this.btnReport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReport, this);
			this.btnFruit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFruit, this);
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
			this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
			this.btnRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRevive, this);
			this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
			this.btnEvilClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvilClear, this);
			this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTest, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
				this.scene = null;
				egret.Tween.removeTweens(this.groupRogue);
				Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.RoleInfoNotice_Visit, this);
			}, this);
			this.scene = StageSceneManager.Instance.GetCurScene();
			this.update = egret.setInterval(this.Update, this, 999, 1 / 60);

			Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.RoleInfoNotice_Visit, this);

			this.imgBar.mask = this.imgBarBg;
			this.layerDie.visible = false;

			this.playerInfo();
			this.restsInfo();
			this.initCd();
			this.SetInfoUpdate();
			this.RefreshRes();
			this.RunAni();
			this.flashModel();
			this.flashEvilNumber();
			// this.AddChatMini();
			this.Update();

			if (Device.isReviewSwitch) {
				this.groupBattleArray.visible = false;
				this.RimgGroup.x = 585;
				this.groupParcel.right = 338;
				this.imgRightBg.width = 390;

				this.jewel2.width = 40;
				this.jewel2.height = 40;

				this.jewel.width = 40;
				this.jewel.height = 40;
				this.jewel.y = -8;


				this.imgSml3.width = 40;
				this.imgSml3.height = 40;

				this.imgSml4.width = 40;
				this.imgSml4.height = 40;

				this.groupDieCost.visible = false;
				this.btnRevive.visible = false;
				this.description.visible = false;
			}
		}

		public close() {
			super.close();
			egret.clearInterval(this.update);
			this.scene = null;
			egret.Tween.removeTweens(this.groupRogue);
			if (this.bar) {
				this.bar.release();
				this.bar.close();
			}
		}

		private Update() {
			this.SetInfoUpdate();
			this.RefreshRes();
			this.updateCd()
			this.updateEvil(null);
			this.setFastRogueButton()
		}


		/**左上角玩家信息 */
		private playerInfo() {
			if (Device.isReviewSwitch && Util.isWxMiniGame()) {
				this.imgHead.source = cachekey("wx_" + PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
			} else {
				this.imgHead.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
			}
			this.imgFrame.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
			this.labelLevel.text = Game.PlayerInfoSystem.BaseInfo.level.toString();
			this.labelLeagueName.text = Game.PlayerInfoSystem.BaseInfo.leagueName;
			this.labelLeagueName.textColor = ConstantConfig_Common.Color.rpg_color.league_title_color;
			this.leagueName.text = Game.PlayerInfoSystem.BaseInfo.name;
			this.leagueName.textColor = ConstantConfig_Common.Color.wonderland_color.leader_color;
			this.imgBar.source = cachekey((yuan3(this.scene.getWonderlandMode() == TableEnum.Enum.WonderlandType.WondType_Fight, UIConfig.UIConfig_LeagueWarScene.roleBloodFightBarUi, UIConfig.UIConfig_LeagueWarScene.roleBloodPeaceBarUi)), this)

			this.btnReport.visible = true;
			this.CalcFormateBattle();
		}

		/**其他信息 */
		private restsInfo() {
			//加速或加血钻石
			for (let i = 3; i <= 4; i++) {
				this["imgSml" + i].source = cachekey(UIConfig.UIConfig_LeagueWarScene.warHomeIcon[i], this);
			}
			//加速或加血需要的钻石数
			this.labelBtn3.text = CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();
			this.labelBtn4.text = CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();

			//显不显示罪恶值
			let can_fight = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).is_battle == 1;
			this.SetModelShow(can_fight)
		}

		/**加速加血信息初始化 */
		private initCd() {
			let cur = this.scene.playerLeader.addSpeedLeftTime
			if (cur > 0) {
				this.dealSpeed(false, cur)
			} else {
				this.dealSpeed(true, null)
			}

			let cur1 = this.scene.playerLeader.addBloodLeftTime
			if (cur1 > 0) {
				this.dealBlood(false, cur1)
			} else {
				this.dealBlood(true, null)
			}
		}

		/**加速加血信息循环刷新 */
		private updateCd() {
			let cur = this.scene.playerLeader.addSpeedLeftTime
			if (cur > 0) {
				this.dealSpeed(false, cur)
			} else {
				if (this.bFreeSpeed == false) {
					this.dealSpeed(true, null)
				}
			}

			let cur1 = this.scene.playerLeader.addBloodLeftTime
			if (cur1 > 0) {
				this.dealBlood(false, cur1)
			} else {
				if (this.bFreeBlood == false) {
					this.dealBlood(true, null)
				}
			}
		}

		/**加速信息刷新 */
		private dealSpeed(tag: boolean, value1: number) {
			if (tag == false) {
				let value = Math.floor(value1 / 1000) + 1;
				this.bFreeSpeed = false;
				this.imgSpeedCdBoard.visible = true;
				this.labelSpeedCd.visible = true;
				this.labelSpeedCd.textColor = ConstantConfig_Rpg.Color.button_speed;

				this.labelBtn3.visible = true;
				this["imgSml" + 3].visible = true;
				this.labelSpeedCd.text = (value + "s");
				this.labelBtn3.text = CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();

				this.labelSpeedFree.visible = false;
			} else {
				this.bFreeSpeed = true
				this.imgSpeedCdBoard.visible = false;
				this.labelSpeedCd.visible = false;

				this.labelBtn3.visible = false;
				this["imgSml" + 3].visible = false;

				this.labelSpeedFree.visible = true;
				this.labelSpeedFree.text = TextsConfig.TextsConfig_Rpg.free;
			}
		}

		/**加血信息刷新 */
		private dealBlood(tag: boolean, value1: number) {
			if (tag == false) {
				let value = Math.floor(value1 / 1000) + 1;
				this.bFreeBlood = false;
				this.imgBloodCdBoard.visible = true;
				this.labelBloodCd.visible = true;
				this.labelBloodCd.textColor = ConstantConfig_Rpg.Color.button_blood;

				this.labelBtn4.visible = true;
				this["imgSml" + 4].visible = true;
				this.labelBloodCd.text = (value + "s")
				this.labelBtn4.text = CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();

				this.labelBloodFree.visible = false;
			} else {
				this.bFreeBlood = true;
				this.imgBloodCdBoard.visible = false;
				this.labelBloodCd.visible = false;

				this.labelBtn4.visible = false;
				this["imgSml" + 4].visible = false;

				this.labelBloodFree.visible = true;
				this.labelBloodFree.text = TextsConfig.TextsConfig_Rpg.free;
			}
		}

		/**关闭页面 */
		private onBtnClose() {
			Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.RoleInfoNotice_Visit, this);
			if (StageSceneManager.Instance.GetCurScene().playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_success(TextsConfig.TextsConfig_Wonderland.die_error_tips);
				return
			}
			if (StageSceneManager.Instance.GetCurScene().isTouchUiEnabled() == false) {
				toast_success(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return;
			}
			let [tag, code] = StageSceneManager.Instance.GetCurScene().isCanLeaveScene()
			if (tag == true) {
				TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip, () => {
					Game.PlayerWonderLandSystem.prairieClose(this.closeFinish, this);
				});
			} else {
				if (TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
					toast_success(TextsConfig.TextsConfig_Rpg.leave_error[code]);
				}
			}
		}

		public closeFinish() {
			SceneManager.initType = 2;
			SceneManager.instance.EnterMainCityNew();
		}

		/**胶囊加号按钮点击 */
		private onBtnPlant() {
			let viplevel = TableVipinfo.Table()[Object.keys(TableVipinfo.Table()).length - 1].level;
			let Licence = (vipLv?) => {
				let lv = vipLv ? vipLv : Game.PlayerInfoSystem.BaseInfo.licenceLevel;
				return TableLicence.Item(lv);
			}
			if (Game.PlayerInfoSystem.BaseInfo.vipLevel == viplevel || Licence().buy_plate > Game.PlayerVIPSystem.vipInfo.buyPlate || Licence(Game.PlayerInfoSystem.BaseInfo.licenceLevel + 1).buy_plate <= Licence().buy_plate) {
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.buy_plate,
					CommonConfig.plate_buy_token(Game.PlayerVIPSystem.vipInfo.buyPlate),
					CommonConfig.role_buy_add_plate,
					Licence().buy_plate - Game.PlayerVIPSystem.vipInfo.buyPlate,
					Licence().buy_plate)
				TipManager.ShowConfirmCancel(str, () => {
					Game.PlayerWonderLandSystem.BuyPlate().then(() => {
						let str_power = Helper.StringFormat("+%d", CommonConfig.role_buy_add_plate);
						TipManager.GetResource(str_power, message.EResourceType.RESOURCE_GOLD_PLATE, this.height / 2);
						// if this._cb then this._cb() end
					}).catch((result) => {
						if (result == message.EC.XG_POWER_BUY_LIMIT) {
							let str = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.err_buy_plate,
								Game.PlayerVIPSystem.vipInfo.buyPlate,
								Licence().buy_plate)
							TipManager.ShowTipsAndGoVip(str, this, TableEnum.Enum.Vip.CHARGE, null)
						} else if (result == message.EC.XG_LACK_TOKEN) {
							TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
								loadUI(PayMallScene)
									.then((scene: PayMallScene) => {
										scene.show(UI.SHOW_FROM_TOP);
										scene.init(false);
										scene.loadFrom(StageSceneManager.Instance.GetCurScene().mm || TableEnum.Enum.HXHChargeType.Charge);
									});
							})
						} else {

						}
					})
				})
			} else {
				let str = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.err_buy_plate, Game.PlayerVIPSystem.vipInfo.buyPlate, Licence().buy_plate)
				TipManager.ShowTipsAndGoVip(str, TableEnum.Enum.Vip.CHARGE)
			}
		}

		/**钻石加号按钮点击 */
		private onBtnGold() {
			loadUI(PayMallScene)
				.then((scene: PayMallScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init(false);
				});
		}

		/**右上角胶囊钻石数据刷新 */
		private RefreshRes() {
			if (this.tokenBefore != Game.PlayerInfoSystem.BaseInfo.token) {
				this.tokenBefore = Game.PlayerInfoSystem.BaseInfo.token;
				if (Game.PlayerInfoSystem.BaseInfo.token > 100000) {
					this.labelGold.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
				} else {
					this.labelGold.text = Game.PlayerInfoSystem.BaseInfo.token.toString();
				}
			}
			if (this.plateBefore != Game.PlayerInfoSystem.BaseInfo.goldPlate) {
				this.plateBefore = Game.PlayerInfoSystem.BaseInfo.goldPlate
				this.labelPlant.text = (Game.PlayerInfoSystem.BaseInfo.goldPlate + "/" + CommonConfig.role_gold_plate_max)
			}
		}

		/**战斗力 */
		private CalcFormateBattle() {
			let serverFormat = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND]
			let generalList = Game.PlayerHunterSystem.getWonderlandGeneral(serverFormat)[0];
			let battle = 0;
			for (let k in generalList) {
				if (generalList.hasOwnProperty(k)) {
					let v = generalList[k] as any;
					battle += v.battle;
				}
			}
			this.labelPlayerPower.text = (Set.NumberUnit3(battle))
		}

		/**罪恶值 加速 加血显示 */
		private SetModelShow(enable: boolean) {
			this.btnEvil.visible = enable;
			this.labelEvillValue.visible = enable;
			this.btnEvilClear.visible = enable;
		}

		private onBtnTest() {
			// let scene: StageSceneWonderland = this.scene;
			// scene.onPrint();
		}
		/**清除罪恶值 */
		private onBtnEvilClear() {
			if (this.evilValue == 0) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.clear_zero);
			} else {
				let cost = this.evilValue * CommonConfig.wonderland_evil_token;
				TipManager.ShowConfirmCancel(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.clear_tips, cost, this.evilValue), () => {
					Game.PlayerWonderLandSystem.WonderlandClearEvil().then(() => {
						toast_success(TextsConfig.TextsConfig_Wonderland.clear_success_tips);
						this.updateEvil(true);
						Game.PlayerWonderLandSystem.roleInfo.evil_value = 0;
					}).catch((result) => {
						if (result == message.EC.XG_LACK_TOKEN) {
							TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
								loadUI(PayMallScene)
									.then((scene: PayMallScene) => {
										scene.show(UI.SHOW_FROM_TOP);
										scene.init(true);
									});
							})
						}
					})
				})
			}
		}

		private updateEvil(notShow: boolean) {
			if (Game.PlayerWonderLandSystem.roleInfo.evil_value != this.evilValue) {
				if (this.evilValue > Game.PlayerWonderLandSystem.roleInfo.evil_value) {
					let subnum = this.evilValue - Game.PlayerWonderLandSystem.roleInfo.evil_value
					if (!notShow) {
						Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.evil_tips_sub, subnum), UIManager.StageHeight, UIManager.StageWidth);
					}
				} else {
					let addnum = Game.PlayerWonderLandSystem.roleInfo.evil_value - this.evilValue
					// Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.evil_tips_add, addnum), UIManager.StageHeight, UIManager.StageWidth);
				}
				this.evilValue = Game.PlayerWonderLandSystem.roleInfo.evil_value;
				this.flashEvilNumber()
			}
		}

		/**罪恶值赋值 */
		private flashEvilNumber() {
			this.labelEvillValue.text = Game.PlayerWonderLandSystem.roleInfo.evil_value;
		}

		/**玩家信息右边圆形图标（战斗或和平）切换 */
		private flashModel() {
			if (Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_PEACE) {
				Set.ButtonBackgroud(this.btnChange, UIConfig.UIConfig_Wonderland.peace[1], UIConfig.UIConfig_Wonderland.peace[2], UIConfig.UIConfig_Wonderland.peace[3])
			} else if (Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_FIGHTING) {
				Set.ButtonBackgroud(this.btnChange, UIConfig.UIConfig_Wonderland.battle[1], UIConfig.UIConfig_Wonderland.battle[2], UIConfig.UIConfig_Wonderland.battle[3])
			} else if (Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_KILLING) {
				Set.ButtonBackgroud(this.btnChange, UIConfig.UIConfig_Wonderland.kill[1], UIConfig.UIConfig_Wonderland.kill[2], UIConfig.UIConfig_Wonderland.kill[3])
			}
		}

		/**包裹 */
		private onBtnRogue() {
			let rogue = Game.PlayerItemSystem.GetWonderlandRogue()
			let bPush = Table.FindF(rogue, function (k, v) {
				return Game.PlayerCardSystem.goodsMap[v].count > 0;
			})
			if (bPush) {
				TipManager.OneKeySell(TableEnum.Enum.OneKeySell.Rogue, null);
			} else {
				toast_warning(TextsConfig.TextsConfig_Wonderland.no_Rogue)
			}
		}

		/**阵容 */
		private onBtnTeam() {
			Game.UIManager.loadUI(Wonderland_Formate)
				.then((scene: Wonderland_Formate) => {
					scene.SetFather(this);
					scene.show(UI.SHOW_FROM_TOP);
				})
		}

		/**战报 */
		private onBtnReport() {
			loadUI(WonderlandFastBattle)
				.then((dialog: WonderlandFastBattle) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		/**果实背包 */
		private onBtnFruit() {
			loadUI(HXH_WonderlandFruitBag)
				.then((dialog: HXH_WonderlandFruitBag) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			Teach.addTeaching()
		}

		/**时时刷新经验条与包裹上的数量小提示 */
		private SetInfoUpdate() {
			this.thisHp = this.scene.playerLeader.uiHp;
			let size_bar = getPercentSize(this.imgBar, this.thisHp / 100)
			this.imgBarBg.width = size_bar.width;
		}

		/**包裹上面的小提示 */
		private setFastRogueButton() {
			let resType = Game.PlayerItemSystem.GetWonderlandRogue()
			let count = 0;
			for (let k in resType) {
				if (resType.hasOwnProperty(k)) {
					let v = resType[k];
					count = count + Game.PlayerCardSystem.goodsMap[v].count;
				}
			}
			// if (count > 99) {
			// 	this.labelFruitNum.text = "99+";
			// } else {
			this.labelFruitNum.text = count.toString();
			// }
			this.imgFruitNum.visible = (count > 0);
			this.labelFruitNum.visible = (count > 0);
		}

		/**加速按钮点击 */
		private onBtn1() {
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips)
				return
			}
			if (this.scene.isTouchUiEnabled() == false) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return
			}
			Game.PlayerWonderLandSystem.WonderlandFaster().then(() => {
				toast_success(Helper.StringFormat(TextsConfig.TextConfig_League.war_buff_speed, (ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - 1) * 100, CommonConfig.scene_add_speed_duration[1]))
				this.RefreshRes()
				this.scene.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo)
			}).catch(() => {

			})
		}

		/**加血按钮点击 */
		private onBtn2() {
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips)
				return
			}
			if (this.scene.isTouchUiEnabled() == false) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return
			}
			Game.PlayerWonderLandSystem.WonderlandAddBlood().then(() => {
				toast_success(TextsConfig.TextConfig_League.war_buff_blood)
				this.RefreshRes();
				this.scene.playerLeader.addSceneBuff(TableEnum.Enum.SceneBuffType.RecoverBlood, -1)
				this.scene.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo)
			}).catch(() => {

			})
		}

		/**立即复活 */
		private onBtnRevive() {
			this.scene.revivePersonReq(() => {
				this.time_id = -1;
				egret.clearInterval(this.time_id);//取消指定的定时器
				this.layerDie.visible = false;
			})
		}

		/**外部调用 */
		public SetDieTime(time) {
			this.layerDie.visible = (this.showDie)
			this.time_meter = this.scene.playerLeader.dieProtectTime;
			this.labelLeftTime.text = (Math.ceil(this.time_meter / 1000 - TableVipinfo.Item(Game.PlayerInfoSystem.BaseInfo.vipLevel).scene_revive_time)).toString();
			this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 0.33);
			if (CommonConfig.wonderland_rebirth_token_comsume(Game.PlayerMixUnitInfoSystem.mixunitinfo.wonderlandRebirthTime) == 0) {
				this.labelConsume.text = TextsConfig.TextsConfig_Wonderland.first_free;
			} else {
				this.labelConsume.text = CommonConfig.wonderland_rebirth_token_comsume(Game.PlayerMixUnitInfoSystem.mixunitinfo.wonderlandRebirthTime).toString();
			}
		}

		private OnthisTimeKeeper() {
			if (this.time_id == -1 || this.scene.playerLeader == null) {
				return;
			}
			this.time_meter = this.scene.playerLeader.dieProtectTime;
			let _posState = this.scene.playerLeader.posState;
			let realTime = Math.ceil(this.time_meter / 1000 - TableVipinfo.Item(Game.PlayerInfoSystem.BaseInfo.vipLevel).scene_revive_time)

			if (realTime >= 0 && this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				this.labelLeftTime.text = (realTime).toString();
			} else {
				egret.clearInterval(this.time_id);
				this.showDie = true;
				this.layerDie.visible = false;
				this.time_id = -1;
			}
		}

		/**获得物品时弹提示 */
		public RoleInfoNotice_Visit(e) {
			let request: message.RoleInfoNoticeRequest = e.data;
			// if (request.header.id) {
			let goodsList = request.body.gameInfo.getGoods;
			if (goodsList && goodsList.length > 0) {
				let getGold = false
				let loseGold = false
				let lose_good = []
				let good = []
				let fightGoods = [];

				for (let k in goodsList) {
					if (goodsList.hasOwnProperty(k)) {
						let v = goodsList[k];
						if (Game.PlayerWonderLandSystem.wonderlandId == 1 || Game.PlayerWonderLandSystem.wonderlandId == 4) {  // 新手仙境都变为1
							getGold = true
							good.push(v)
							fightGoods.push(v);
						} else {
							if (v.index == 1) {  //1打人获得，2打人损失，0打怪获得
								getGold = true
								good.push(v)
								fightGoods.push(v)
							} else if (v.index == 2) {
								loseGold = true
								lose_good.push(v)
								fightGoods.push(v)
							}
						}
					}
				}
				if (Game.PlayerWonderLandSystem.resultList.length != 0 && Game.PlayerWonderLandSystem.resultList != null && fightGoods != null && fightGoods.length != 0) {
					if (Game.PlayerWonderLandSystem.resultList[0].goods == null) {
						Game.PlayerWonderLandSystem.resultList[0].goods = Table.DeepCopy(Game.PlayerWonderLandSystem.getGoods)
					}
				}
				if (getGold) {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(good);
							dialog.show();
						});
				}
				if (lose_good) {
					let i = 0;
					for (let k in lose_good) {
						if (lose_good.hasOwnProperty(k)) {
							let v = lose_good[k];
							let name = (PlayerItemSystem.ItemConfig(v.goodsId) as any).name;
							egret.setTimeout(() => {
								Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[1])
							}, this, i * 1000);
							i++;
						}
					}
				}
				WonderLandChoose.onTipGet(goodsList);
				// let i = 0;
				// for (let k in request.body.gameInfo.getGoods) {
				// 	if (request.body.gameInfo.getGoods.hasOwnProperty(k)) {
				// 		let v = request.body.gameInfo.getGoods[k];
				// 		if (v.index != 1 && v.index != 2) {
				// 			let tblInfo = (PlayerItemSystem.Item(v.goodsId) as any)
				// 			egret.setTimeout(() => {
				// 				let rgb = Helper.HexToRGB(ConstantConfig_Common.Color.quality_color[tblInfo.quality - 1]);
				// 				rgb.r = Math.floor(rgb.r);
				// 				rgb.g = Math.floor(rgb.g);
				// 				rgb.b = Math.floor(rgb.b);
				// 				Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, tblInfo.name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[0])
				// 			}, this, i * 1000);
				// 			i++;
				// 		}
				// 	}
			}
			// }
		}

		public static onTipGet(list: any[]) {
			let i = 0;
			for (let k in list) {
				let v = list[k];
				if (v.index != 1 && v.index != 2) {
					let tblInfo = (PlayerItemSystem.Item(v.goodsId) as any)
					egret.setTimeout(() => {
						let rgb = Helper.HexToRGB(ConstantConfig_Common.Color.quality_color[tblInfo.quality - 1]);
						rgb.r = Math.floor(rgb.r);
						rgb.g = Math.floor(rgb.g);
						rgb.b = Math.floor(rgb.b);
						Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, tblInfo.name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[0])
					}, this, i * 1000);
					i++;
				}
			}
		}

		private ChangeModeReq(_tmpMode: number) {
			//切换模式
			Game.PlayerWonderLandSystem.WonderlandBattleMode(_tmpMode).then(() => {
				if (Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_KILLING) {
					toast_success(TextsConfig.TextsConfig_Wonderland.change_to_kill);
				} else if (Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_FIGHTING) {
					toast_success(TextsConfig.TextsConfig_Wonderland.change_to_battle);
				} else {
					toast_success(TextsConfig.TextsConfig_Wonderland.change_to_peace);
				}
				this.RefreshRes()
				this.flashModel()
				this.scene.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo)
			}).catch(() => {

			})
			this.PopChange()
		}

		private PopChange() {
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips)
				return
			}
			if (this.scene.isTouchUiEnabled() == false) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return
			}
		}

		/**包裹上的小提示动画 */
		private RunAni() {
			let roguey = this.groupRogue.y;
			egret.Tween.get(this.groupRogue, { loop: true }).to({ y: roguey - 10 }, 1000, egret.Ease.sineInOut).to({ y: roguey }, 1000, egret.Ease.sineInOut);
		}

		public BattleCB() {
			if (Game.PlayerWonderLandSystem.resultInfo.battleType == message.EFormationType.FORMATION_TYPE_WONDERLAND && Game.PlayerWonderLandSystem.getGoods != null) {
				let getGold = false
				let loseGold = false
				let lose_good = []
				let good = []
				let fightGoods = []
				for (let k in Game.PlayerWonderLandSystem.getGoods) {
					if (Game.PlayerWonderLandSystem.getGoods.hasOwnProperty(k)) {
						let v = Game.PlayerWonderLandSystem.getGoods[k];
						if (v.index == 2) {
							loseGold = true
							lose_good.push(v)
							fightGoods.push(v)
						} else if (v.index == 1) {
							getGold = true
							good.push(v)
							fightGoods.push(v)
						} else if (v.index == 0) {
						}
					}
				}
				if ((Game.PlayerWonderLandSystem.resultList) && (fightGoods)) {
					if (Game.PlayerWonderLandSystem.resultList[0].goods == null) {
						Game.PlayerWonderLandSystem.resultList[0].goods = Table.DeepCopy(Game.PlayerWonderLandSystem.getGoods)
					}
				}
				if (getGold) {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(good);
							dialog.show();
						});
				}
				if (lose_good) {
					let i = 0;
					for (let k in lose_good) {
						let v = lose_good[k];
						let itemSet = PlayerItemSystem.Set(v.goodsId, v.showType) as any;
						egret.setTimeout(() => {
							Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, itemSet.Info.name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[1]);
						}, this, i * 1000);
						i++;
					}
				}
				if (Game.PlayerWonderLandSystem.mobsDebuffTips) {
					toast_success(TextsConfig.TextsConfig_Wonderland.mobs_debuff)
					Game.PlayerWonderLandSystem.mobsDebuffTips = false;
				}

				WonderLandChoose.onTipGet(Game.PlayerWonderLandSystem.getGoods);
				Game.PlayerWonderLandSystem.getGoods = [];
			}
		}
		private bar: HXH_WonderlandFruitCollection;
		public addControlPop(time, type) {
			if (!this.bar) {
				this.bar = newUI(HXH_WonderlandFruitCollection);
				this.addChild(this.bar);
			}
			this.bar.visible = true;
			this.bar.x = (UIManager.StageWidth - this.bar.width) / 2;
			this.bar.setInfo(time, type);
		}

		public deleteControlPop() {
			if (this.bar && this.bar.parent) {
				this.bar.clearTime();
				this.bar.visible = false;
			}
		}

		public AddChatMini() {
			loadUI(Chat_Main)
				.then((dialog: Chat_Main) => {
					dialog.show();
				});
		}
	}
}