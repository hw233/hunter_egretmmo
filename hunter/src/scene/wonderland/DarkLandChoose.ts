namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-6-14
	 * 
	 * @class 贪婪之岛港口
	 */
	export class DarkLandChoose extends Dialog {
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
		private btnChange: eui.Button;
		private labelLevel: eui.Label;
		private imgBar: eui.Image;
		private imgBarBg: eui.Image;
		private btnEvilClear: eui.Button;
		private btnEvil: eui.Button;
		private labelEvillValue: eui.Label;
		private btnAllRank: eui.Button;
		private labelMyRank: eui.Label;
		private imgButton3: eui.Image;
		private btn1: eui.Button;
		private imgBtn3: eui.Image;
		private imgSml3: eui.Image;
		private labelBtn3: eui.Label;
		private imgSpeedCdBoard: eui.Image;
		private labelSpeedCd: eui.Label;
		private labelSpeedFree: eui.Label;
		private imgButton4: eui.Image;
		private btn2: eui.Button;
		private imgBtn4: eui.Image;
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
		private btnCancel0: eui.Button;
		private groupDieCost: eui.Group;
		private labelConsume: eui.Label;
		private labelDieTips: eui.Label;
		private labelLeftTime: eui.Label;
		private btnClose: eui.Button;
		private labelSelectedChannel: eui.Label;
		private btnSeeChannel: eui.Button;
		private labelChangChannelTime: eui.Label;
		private TextCity: eui.Label;
		private btnCity: eui.Button;
		private LayerChannelList: eui.Group;
		private listChannel: eui.List;
		private groupCityServer: eui.Group;
		private TableViewCityServer: eui.List;
		private btnChat: eui.Button;

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
		private evilValue: number = -1;
		private time_id: number = 0;
		private update: number;
		private update1: number;
		private update2: number;
		private update3: number;
		private time_meter: number;
		private _toMode;
		private playerModel: number;
		private leaveSuccessful: boolean = false;
		/**0动画中 1展开 2收起 */
		private channelShow: number;
		public selectChannelId: number;
		private channelInfo = [];
		public generalIdList = [];
		private time;

		public constructor() {
			super();
			this.skinName = "resource/skins/wonderland/DarkLandChooseSkin.exml";
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.imgBar.mask = this.imgBarBg;
			this.init();
			this.time = egret.setTimeout(this.timeFun, this, 200);
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
			this.btnAllRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAllRank, this);
			this.btnCity.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnCityBegin, this);
			this.btnCity.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnCityUp, this);
			this.btnCity.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnCityUp, this);
			this.btnSeeChannel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSeeChannel, this);
			this.btnEvil.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvil, this);
			this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
			this.btnEvilClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvilClear, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
			this.scene = StageSceneManager.Instance.GetCurScene();
			this.update = egret.setInterval(this.Update, this, 999, );
			this.update1 = egret.setInterval(this.ReqMyRank, this, 5000);
			this.update2 = egret.setInterval(this.updateModel, this, 200);
			this.layerDie.visible = false;

			this.playerInfo();
			this.restsInfo();
			this.initCd();
			this.SetInfoUpdate();
			this.RefreshRes();
			this.RunAni();
			this.ReqMyRank();
			this.CalcFormateBattle();
			this.updateFreshChannelTime();
			this.SetInfoCityAndChannel();
			this.Update();
		}

		public close() {
			super.close();
			egret.clearInterval(this.update);
			egret.clearInterval(this.update1);
			egret.clearInterval(this.update2);
			egret.Tween.removeTweens(this.groupRogue);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
			let UI = this.getChildByName("WonderlandChooseEvilEnergy") as WonderlandChooseEvilEnergy;
			if (UI) {
				UI.close();
				UI = null;
			}
			if (this.bar) {
				this.bar.close();
			}
		}

		private Update() {
			this.SetInfoUpdate();
			this.RefreshRes();
			this.updateCd()
			this.updateEvil(null);
			this.setFastRogueButton();
			this.updateFreshChannelTime();
		}

		/**积分排名刷新 */
		private ReqMyRank() {
			Game.PlayerWonderLandSystem.SceneQueryScoreRank(false)
				.then((msg: message.SceneQueryScoreRankRespBody) => {
					this.labelMyRank.text = msg.self_rank.rank.toString();
					if (msg.self_rank.rank == 0 || msg.self_rank.score < CommonConfig.darkland_rank_base_score) {
						this.labelMyRank.text = TextsConfig.TextsConfig_WonderlandBoss.disAttend
					} else if (msg.self_rank.rank >= 100) {
						this.labelMyRank.text = ("100+")
					}
				}).catch(() => {

				})
		}

		/**安全区域与非安全区域切换时左上角头像上的图标切换 */
		private updateModel() {
			if (this.playerModel == null) {
				this.playerModel = message.EBattleMode.BATTLE_MODE_PEACE;
				Set.ButtonBackgroud(this.btnChange, UIConfig.UIConfig_DarkLand.peace[1])
			}
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
				this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
				return;
			}
			let paths1, paths2, nextModel;
			if (Table.VIn(this.scene.playerLeader.tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine) && this.playerModel == message.EBattleMode.BATTLE_MODE_FIGHTING) {
				paths1 = UIConfig.UIConfig_DarkLand.battle;
				paths2 = UIConfig.UIConfig_DarkLand.peace;
				nextModel = message.EBattleMode.BATTLE_MODE_PEACE;
			} else if ((!Table.VIn(this.scene.playerLeader.tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine)) && this.playerModel == message.EBattleMode.BATTLE_MODE_PEACE) {
				paths1 = UIConfig.UIConfig_DarkLand.peace;
				paths2 = UIConfig.UIConfig_DarkLand.battle;
				nextModel = message.EBattleMode.BATTLE_MODE_FIGHTING;
			}

			if (paths1 == null) {
				return;
			}
			egret.Tween.get(this.btnChange)
				.to({ scaleX: 0 }, 300)
				.call(() => {
					Set.ButtonBackgroud(this.btnChange, paths2[1]);
					this.playerModel = nextModel;
				})
				.to({ scaleX: 1 }, 300);
		}

		/**左上角玩家信息 */
		private playerInfo() {
			this.imgHead.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
			this.imgFrame.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
			this.labelLevel.text = Game.PlayerInfoSystem.BaseInfo.level.toString();
			this.labelLeagueName.text = Game.PlayerInfoSystem.BaseInfo.leagueName;
			this.labelLeagueName.textColor = ConstantConfig_Common.Color.rpg_color.league_title_color;
			this.leagueName.text = Game.PlayerInfoSystem.BaseInfo.name;
			this.leagueName.textColor = ConstantConfig_Common.Color.wonderland_color.leader_color;
			this.imgBar.source = cachekey(yuan3(this.scene.getDarklandMode() == TableEnum.Enum.WonderlandType.WondType_Fight, UIConfig.UIConfig_LeagueWarScene.roleBloodFightBarUi, UIConfig.UIConfig_LeagueWarScene.roleBloodPeaceBarUi), this);

			this.btnReport.visible = true;
			this.CalcFormateBattle();
		}

		/**其他信息 */
		private restsInfo() {
			//加速或加血钻石
			for (let i = 3; i <= 4; i++) {
				this["imgSml" + i].source = UIConfig.UIConfig_LeagueWarScene.warHomeIcon[i];
			}
			//加速或加血需要的钻石数
			this.labelBtn3.text = CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();
			this.labelBtn4.text = CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();

			//显不显示罪恶值
			let can_fight = TableDarkland.Item(Game.PlayerWonderLandSystem.darkland.darklandId).is_battle == 1;
			this.SetModelShow(can_fight)
		}

		/**时时刷新经验条与包裹上的数量小提示 */
		private SetInfoUpdate() {
			if (this.thisHp != this.scene.playerLeader.uiHp) {
				this.thisHp = this.scene.playerLeader.uiHp;
				let size_bar = getPercentSize(this.imgBar, this.thisHp / 100)
				this.imgBarBg.width = size_bar.width;
			}
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

		/**包裹上的小提示动画 */
		private RunAni() {
			let roguey = this.groupRogue.y;
			egret.Tween.get(this.groupRogue, { loop: true }).to({ y: roguey - 10 }, 1000, egret.Ease.sineInOut).to({ y: roguey }, 1000, egret.Ease.sineInOut);
		}

		/**积分排名详情 */
		private onBtnAllRank() {
			Game.UIManager.loadUI(DarkLandPortRank)
				.then((dialog: DarkLandPortRank) => {
					dialog.show(UI.SHOW_FROM_TOP);
				})
		}

		private updateEvil(notShow: boolean) {
			if (Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] != this.evilValue) {
				if (this.evilValue > Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"]) {
					let subnum = this.evilValue - Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"]
					if (!notShow) {
						Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.evil_tips_sub, subnum), this.height, this.width);
					}
				} else {
					let addnum = Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] - this.evilValue
					Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.evil_tips_add, addnum), this.height, this.width);
				}
				this.evilValue = Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"];
				this.flashEvilNumber()
			}
		}

		/**点击罪恶值显示详情 */
		private onBtnEvil() {
			let UI = this.getChildByName("WonderlandChooseEvilEnergy");
			if (UI) {
				UI.visible = true;
				return;
			}
			let ui = newUI(WonderlandChooseEvilEnergy);
			ui.name = "WonderlandChooseEvilEnergy";
			ui.x = 200;
			ui.y = 200;
			this.addChild(ui);
		}

		private box = new egret.Shape();
		private Up(e) {
			let UI = this.getChildByName("WonderlandChooseEvilEnergy") as WonderlandChooseEvilEnergy;
			if (UI) {
				UI.visible = false;
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

		/**罪恶值 加速 加血显示 */
		private SetModelShow(enable: boolean) {
			this.btnEvil.visible = enable;
			this.labelEvillValue.visible = enable;
			this.btnEvilClear.visible = enable;
		}

		/**清除罪恶值 */
		private onBtnEvilClear() {
			if (this.evilValue == 0) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.clear_zero);
			} else {
				let cost = this.evilValue * CommonConfig.wonderland_evil_token;
				TipManager.ShowConfirmCancel(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.clear_tips, cost, this.evilValue), () => {
					Game.PlayerWonderLandSystem.SceneClearEvil().then(() => {
						toast_success(TextsConfig.TextsConfig_Wonderland.clear_success_tips);
						this.updateEvil(true);
						Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] = 0;
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

		/**罪恶值赋值 */
		private flashEvilNumber() {
			this.labelEvillValue.text = Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"];
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
			Game.PlayerWonderLandSystem.SceneFaster().then(() => {
				toast_success(Helper.StringFormat(TextsConfig.TextConfig_League.war_buff_speed, (ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - 1) * 100, CommonConfig.scene_add_speed_duration[1]))
				this.RefreshRes()
				this.scene.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo)
			}).catch(() => {

			})
		}

		/**加血按钮点击 */
		private onBtn2() {
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips)
				return;
			}
			if (this.scene.isTouchUiEnabled() == false) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return;
			}
			Game.PlayerWonderLandSystem.SceneAddBlood().then(() => {
				toast_success(TextsConfig.TextConfig_League.war_buff_blood)
				this.RefreshRes();
				this.scene.playerLeader.addSceneBuff(TableEnum.Enum.SceneBuffType.RecoverBlood, -1)
				this.scene.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo)
			}).catch(() => {

			})
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

		/**立即复活 */
		private onBtnRevive() {
			this.scene.revivePersonReq(() => {
				this.time_id = -1;
				egret.clearInterval(this.time_id);//取消指定的定时器
				this.layerDie.visible = false;
			})
		}



		/**关闭页面 */
		private onBtnClose() {
			let scene = StageSceneManager.Instance.GetCurScene()
			if (scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_success(TextsConfig.TextsConfig_Wonderland.die_error_tips);
				return
			}
			if (scene.isTouchUiEnabled() == false) {
				toast_success(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return;
			}
			let [tag, code] = scene.isCanLeaveScene()
			if (tag == true) {
				TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip, () => {
					Game.PlayerWonderLandSystem.havenClose();
				});
			} else {
				if (TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
					toast_success(TextsConfig.TextsConfig_Rpg.leave_error[code])
				}
			}

		}

		/**阵容战斗力 */
		private CalcFormateBattle() {
			this.generalIdList = []

			let serverFormat = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND]

			let serverFormatTogether = [];

			for (let k in serverFormat.generals) {
				if (serverFormat.generals.hasOwnProperty(k)) {
					let v = serverFormat.generals[k];
					serverFormatTogether.push(v);
				}
			}

			for (let k in serverFormat.reserves) {
				if (serverFormat.reserves.hasOwnProperty(k)) {
					let v = serverFormat.reserves[k];
					serverFormatTogether.push(v);
				}
			}

			let hasServerFormat = Table.FindF(serverFormatTogether, (k, v) => {
				let haveSame = false;
				for (let kk in serverFormat.generals) {
					if (serverFormat.generals.hasOwnProperty(k)) {
						let vv = serverFormat.generals[k];
						if (vv != 0 && vv != v && PlayerHunterSystem.GetGeneralId(vv) == PlayerHunterSystem.GetGeneralId(v)) {
							haveSame = true;
						}
						if (v != 0 && !haveSame) {
							return true;
						}
						return false;
					}
				}
			})
			let generalList, isChange
			if (hasServerFormat) {
				for (let k in serverFormat.generals) {
					if (serverFormat.generals.hasOwnProperty(k)) {
						let v = serverFormat.generals[k];
						if (v != 0) {
							this.generalIdList.push(v);
						}
					}
				}
				for (let k in serverFormat.reserves) {
					if (serverFormat.reserves.hasOwnProperty(k)) {
						let v = serverFormat.reserves[k];
						this.generalIdList.push(v);
					}
				}
				let a = new message.FormationInfo();
				a.generals = this.generalIdList;
				[generalList, isChange] = Game.PlayerHunterSystem.getWonderlandGeneral(a);
			} else {
				[generalList, isChange] = Game.PlayerHunterSystem.getWonderlandGeneral(null);
			}
			let battle = 0;
			for (let k in generalList) {
				if (generalList.hasOwnProperty(k)) {
					let v = generalList[k];
					battle += v.battle;
				}
			}
			this.labelPlayerPower.text = (Set.NumberUnit3(battle));
		}

		private AddChatMini() {
			loadUI(Chat_Main)
				.then((dialog: Chat_Main) => {
					dialog.show();
				});
		}

		public SetDieTime(time) {
			this.layerDie.visible = (this.showDie);
			this.time_meter = this.scene.playerLeader.dieProtectTime
			this.labelLeftTime.text = Math.floor(this.time_meter / 1000).toString();
			this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 333);
			this.labelConsume.text = CommonConfig.scene_clear_dead_cooling_consume[this.scene.sceneType - 1].toString();
			// this.isPushChange = false
			// this.LayerChange:setOpacity(0)
			// this.LayerChange:setScale(0)
			function getWonderlandDieTimeAdd(value) {
				let table = TableEvilZone.Table();
				for (let k in table) {
					if (table.hasOwnProperty(k)) {
						let v = table[k];
						if (value >= v.evil_min && value <= v.evil_max) {
							return v.revived_time
						}
					}
				}
			}
			let info = Game.PlayerWonderLandSystem.darkland.roleInfo as any
			let addTime = getWonderlandDieTimeAdd(info.evil_value);
		}

		private OnthisTimeKeeper() {
			if (this.time_id == -1) {
				return
			}
			if (this.scene.playerLeader == null) {
				return
			}
			this.time_meter = this.scene.playerLeader.dieProtectTime;
			let _posState = this.scene.playerLeader.posState;
			let realTime = Math.floor(this.time_meter / 1000);
			if (realTime >= 0 && this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				this.labelLeftTime.text = (realTime).toString();
			} else {
				egret.clearInterval(this.time_id);
				this.showDie = true;
				this.layerDie.visible = false;
				this.time_id = -1;
			}
		}


		/**退出场景协议 */
		private LeaveDarkSceneReq() {

		}



		//////////////////////////////////////////////////////////////////////////
		/////////////////////////////////城市分区相关//////////////////////////////
		//////////////////////////////////////////////////////////////////////////

		private updateFreshChannelTime() {
			if (Game.PlayerWonderLandSystem.darkland.freshChannelTime <= Game.PlayerInstanceSystem.curServerTime) {
				this.labelChangChannelTime.visible = (false)
				this.btnSeeChannel.enabled = (true)
			} else {
				let lastTime = Game.PlayerWonderLandSystem.darkland.freshChannelTime - Game.PlayerInstanceSystem.curServerTime;
				this.labelChangChannelTime.visible = (true)
				this.btnSeeChannel.enabled = (false)
				this.labelChangChannelTime.text = Math.floor(lastTime).toString();
			}
		}

		private SetInfoCityAndChannel() {
			let channelID = Game.PlayerWonderLandSystem.darkland.channelId % 100;
			this.TextCity.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.curPortCity, Game.PlayerWonderLandSystem.darkland.cityId)
			this.labelSelectedChannel.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.curPortChannel, channelID)

			// this.ChannelList = {}
			// this.CityServerList = {}

			this.SetCityServerList()

			// this.groupCityServer.visible = false;

			this.channelInfo = [];
			// this.selectChannelId = -1;
			this.channelShow = 2;
			// this.channelListScale = this.LayerChannelList:getScale()
			// this.LayerChannelList.setScaleY(0)
		}

		private SetCityServerList() {
			let info = Game.PlayerWonderLandSystem.darkland.cityServerInfo;
			for (let k in info) {
				if (info.hasOwnProperty(k)) {
					let v = info[k];
					if (v == "") {
						info.splice(Number(k));
					}
				}
			}
			let array = new eui.ArrayCollection();
			for (let i = 0; i < info.length; i++) {
				let data = new DarkLandChooseCityItemData();
				data.index = i;
				data.info = info[i];
				array.addItem(data);
			}
			this.TableViewCityServer.dataProvider = array;
			this.TableViewCityServer.itemRenderer = DarkLandChooseCityItem;
		}

		/**切换分线 */
		public ChangeChannel() {
			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips)
				return;
			}
			if (this.selectChannelId == -1) {
				toast_warning(TextsConfig.TextsConfig_DarkLand.pleaseChooseChannel)
				return;
			}
			if (this.selectChannelId == Game.PlayerWonderLandSystem.darkland.channelId) {
				let ChannelId = this.selectChannelId % 100
				toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.inThisChannel, ChannelId))
				return;
			}
			if (this.scene.isTouchUiEnabled() == false) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.battle_error_tips)
				return;
			}
			let [tag, code] = this.scene.isCanLeaveScene();
			if (tag == true) {
				this.ChangeBranchReq()
			} else {
				if (TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
					toast_warning(TextsConfig.TextsConfig_Rpg.leave_error[code])
				}
			}
		}

		private ChangeBranchReq() {
			Game.PlayerWonderLandSystem.SceneChangeBranchInfo(this.selectChannelId).then(() => {
				let ChannelId = this.selectChannelId % 100
				Game.PlayerWonderLandSystem.darkland.freshChannelTime = Game.Controller.curServerTime + 30
				toast_success(Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.successChannel, ChannelId));
				StageSceneManager.Instance.ChangeScene(StageSceneDarkland)
			}).catch(() => {
				//拉取分线列表
				this.ReqChannelList()
			})
		}

		private ReqChannelList() {
			Game.PlayerWonderLandSystem.SceneGetBranchInfo().then((msg: message.SceneGetBranchInfoRespBody) => {
				this.channelInfo = [];
				for (let k in msg.branchInfo) {
					if (msg.branchInfo.hasOwnProperty(k)) {
						let v = msg.branchInfo[k];
						this.channelInfo.push(v);
					}
				}
				this.channelInfo.sort((a, b) => {
					return a.key - b.key;
				})

				this.SetChannelList()
			}).catch(() => {

			})
		}

		private SetChannelList() {
			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.channelInfo.length; i++) {
				let data = new DarkLandChooseChannelItemData();
				data.index = i;
				data.info = this.channelInfo[i];
				data.father = this;
				array.addItem(data);
			}
			this.listChannel.dataProvider = array;
			this.listChannel.itemRenderer = DarkLandChooseChannelItem;
		}

		private onBtnCityBegin() {
			this.groupCityServer.visible = true;
		}

		private onBtnCityUp() {
			this.groupCityServer.visible = false;
		}

		private onBtnSeeChannel() {
			this.ReqChannelList();

			if (this.channelShow == 0) {
				return;
			}
			if (this.channelShow == 1) {//收缩
				this.channelShow = 0;
				egret.Tween.get(this.LayerChannelList).to({ scaleY: 0 }, 300).call(() => {
					this.channelShow = 2;
					this.LayerChannelList.visible = false;
				});
			} else if (this.channelShow == 2) {//展开
				this.channelShow = 0;
				this.LayerChannelList.visible = true;
				egret.Tween.get(this.LayerChannelList).to({ scaleY: 1 }, 300).call(() => {
					this.channelShow = 1;
				});
			}
		}
		private bar: HXH_WonderlandFruitCollection;
		public addControlPop(time, type) {
			if (!this.bar) {
				this.bar = newUI(HXH_WonderlandFruitCollection);
			}
			this.addChild(this.bar);
			this.bar.setInfo(time, type);
		}

		public deleteControlPop() {
			if (this.bar && this.bar.parent) {
				this.bar.clearTime();
				this.bar.parent.removeChild(this.bar);
			}
		}
	}
}