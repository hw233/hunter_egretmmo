namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-26
 * 
 * @class 跨服格斗场主界面
 */
export class ArenaWhole extends Dialog {
	private imgbg: eui.Image;
	private btnClose: eui.Button;
	private btnInfor: eui.Button;
	private labelTimesTitle: eui.Label;
	private labelTimes: eui.Label;
	private btnAddGemsTone: eui.Button;
	private imgGrade: eui.Image;
	private iconLevel: eui.Image;
	private iconLevel1: eui.Image;
	private imgExpNull: eui.Image;
	private imgExp: eui.Image;
	private imgExpOne: eui.Image;
	private labelJiFen: eui.Label;
	private labelMyRankServer: eui.Label;
	private labelMyRank: eui.Label;
	private labelMyHonor: eui.Label;
	private btnTeam: eui.Button;
	private btnMall: eui.Button;
	private imgTips1: eui.Image;
	private btnRankServer: eui.Button;
	private btnRank: eui.Button;
	private btnGetAward: eui.Button;
	private btnBattleView: eui.Button;
	private imgTips2: eui.Image;
	private btnSelectEnemy: eui.Button;
	private labelChangeTime: eui.Label;
	private labelSeasonNumber: eui.BitmapLabel;
	private labelJiFenNeed: eui.Label;
	private groupHero0: eui.Group;
	private groupHero1: eui.Group;
	private groupHero2: eui.Group;
	private groupTai1: eui.Group;
	private groupTai2: eui.Group;
	private clickBtn: boolean = false;
	private challengeTableNumber = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).singlecraft_buy;
	public myInfo = { craft_rank: null, craft_score: null, craft_rank_self: null, titleId: null, groupName: null };
	private singleTimmer = { last_time: null, timmer: null }
	public enemyInfo: Array<message.CraftRoleInfo>;
	public index: number = 0;
	private times: number = 0;
	public formats = [];
	private formatsData = [];
	private update;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeSkin.exml";
		if (this.imgbg.width < UIManager.StageWidth) {
			this.imgbg.width = UIManager.StageWidth;
		}
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.clearInterval(this.update);
			egret.Tween.removeTweens(this.iconLevel1); // 因为是循环播放，需要特别处理
		}, null);
		this.update = egret.setInterval(this.Update, this, 500);
		this.init();
		this.Update();
	}
	private init() {
		let tap = egret.TouchEvent.TOUCH_TAP;
		this.btnClose.addEventListener(tap, this.onBtnClose, this);
		this.btnInfor.addEventListener(tap, this.onBtnInfor, this);
		this.btnTeam.addEventListener(tap, this.onBtnTeam, this);
		this.btnMall.addEventListener(tap, this.onBtnShop, this);
		this.btnRankServer.addEventListener(tap, this.onBtnRankServer, this);
		this.btnRank.addEventListener(tap, this.onBtnRank, this);
		this.btnGetAward.addEventListener(tap, this.onBtnGetAward, this);
		this.btnBattleView.addEventListener(tap, this.onBtnBattleView, this);
		this.btnAddGemsTone.addEventListener(tap, this.onBtnAddGemsTone, this);
		this.btnSelectEnemy.addEventListener(tap, this.onBtnSelectEnemy, this);
		this.imgExp.mask = this.imgExpOne;
		this.singleTimmer.last_time = -1;
		this.singleTimmer.timmer = null;
		egret.Tween.removeTweens(this.iconLevel1);
		egret.Tween.get(this.iconLevel1, { loop: true }).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1500).wait(1000).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1);

		this.req();
		this.initDefineFormation();

	}
	
	public isFullScreen(){
		return true;
	}
	/**点击阵容 */
	private onBtnTeam() {
		Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_CRAFT;
		loadUI(CommonFormationPvpArenaB)
			.then((dialog: CommonFormationPvpArenaB) => {
				dialog.setInfo(this, () => {
					this.initDefineFormation();
				});
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**循环 */
	private Update() {
		this.updateNumber();
		this.updateTimmer();
		this.updateTips();
	}

	private setInfo() {
		this.setInfoMy();
		this.setInfoEnemy();
	}

	private setInfoMy() {

		let strScore = TextsConfig.TextsConfig_Pk.norank.score;
		let strRank = TextsConfig.TextsConfig_Pk.norank.rangking;
		let strRankSelf = TextsConfig.TextsConfig_Pk.norank.rangking;
		let preCore = [];
		preCore = singLecraft.LevelProgresBar(this.myInfo.craft_score);
		let strHonor = "";
		this.imgExpOne.x = this.imgExp.x - this.imgExpOne.width + preCore[2] * this.imgExpOne.width;

		if (this.myInfo != null) {
			let level = singLecraft.GetLevel(this.myInfo.craft_score);
			let info = singLecraft.InstanceScore(level);

			strScore = Helper.StringFormat(TextsConfig.TextsConfig_Pk.grade, this.myInfo.craft_score);
			strRank = Helper.StringFormat(TextsConfig.TextsConfig_Pk.order, this.myInfo.craft_rank);
			strRankSelf = Helper.StringFormat(TextsConfig.TextsConfig_Pk.order, this.myInfo.craft_rank_self);
			strHonor = Set.NumberUnit3(Game.PlayerInfoSystem.BaseInfo.honorCoin);

			this.imgGrade.source = cachekey(info.icon_num, this);
			this.iconLevel.source = cachekey(info.title, this);
			this.iconLevel1.source = cachekey(info.title, this);

			if (preCore[3]) {
				this.labelJiFenNeed.text = TextsConfig.TextsConfig_Pk.getMaxLevel;
			} else {
				this.labelJiFenNeed.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.otherNeedScore, (preCore[1] - this.myInfo.craft_score), (level + 1))
			}
			this.labelJiFen.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.curScores, this.myInfo.craft_score, preCore[1]);
		}
		this.labelMyRank.text = strRank;
		this.labelMyRankServer.text = strRankSelf;
		this.labelMyHonor.text = strHonor;
		let process = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
		let season = Math.floor(process.info / 1000);
		this.labelSeasonNumber.text = season.toString();
	}

	/**龙骨 */
	private setInfoEnemy() {
		for (let i = 1; i <= 2; i++) {
			this["groupTai" + i].removeChildren();
			let cssName = TableClientAniCssSource.Item(2001);
			Game.DragonBonesManager.playAnimation(this, "ui_gedou_01", "armatureName", "003_dianti_xunhuan", 0)
				.then(display => {
					if (i == 2) {
						display.scaleX = -1;
					}
					this["groupTai" + i].addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			Game.DragonBonesManager.playAnimation(this, "ui_gedou_01", "armatureName", "001_dianti_chuxian", 1)
				.then(display => {
					if (i == 2) {
						display.scaleX = -1;
					}
					this["groupTai" + i].addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
		}
		let thisOne = this;
		for (let i = 0; i < 3; i++) {
			thisOne["groupHero" + i].removeChildren();
			loadUI(ArenaWholeHead)
				.then((arenaWholeHead: ArenaWholeHead) => {
					arenaWholeHead.anchorOffsetX = arenaWholeHead.width / 2;
					arenaWholeHead.anchorOffsetY = arenaWholeHead.height / 2;
					arenaWholeHead.setInfo(thisOne.enemyInfo[i], i + 1);
					thisOne["groupHero" + i].addChild(arenaWholeHead);
				});
		}
	}

	/**移除龙骨 */
	private removeKeel() {
		for (let i = 0; i < 3; i++) {
			this["groupHero" + i].removeChildren();
		}
	}

	/**按钮更换对手倒计时 */
	private updateTimmer() {
		let date = Game.Controller.serverNow();
		let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
		let a = humanDate.getTime() / 1000 - 8 * 60 * 60;

		let times = Game.PlayerArenaSystem.singleTimmer.last_time - a;  //Math.ceil(Game.PlayerArenaSystem.singleTimmer.last_time - a);
		if (times < 0) {
			times = 0;
		}
		let pointNumber = 3 - (times % 3);
		let str = Helper.StringFormat(TextsConfig.TextsConfig_Pk.freshTime, times);
		for (let i = 0; i < pointNumber; i++) {
			str += "."
		}
		this.labelChangeTime.visible = (times > 0);
		this.btnSelectEnemy.enabled = (times <= 0);
		this.labelChangeTime.text = str;
	}

	/**红点显示判断 */
	private updateTips() {
		this.imgTips1.visible = false;
		let tips = Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
		this.imgTips2.visible = tips;
	}

	/**挑战次数更新 */
	private updateNumber() {
		let curNumber = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).singlecraft_free + (Game.PlayerVIPSystem.vipInfo.craft_buy * CommonConfig.singlecraft_buy_time) - Game.PlayerVIPSystem.vipInfo.craft_time;
		let max = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).singlecraft_free;
		this.labelTimes.text = curNumber + "/" + max;
	}

	private initDefineFormation() {
		for (let i = 0; i < 3; i++) {
			this.formats[i] = new message.FormationInfo();
		}
		let buttonNames = ["generals", "reserves", "supports"]
		let a = Game.PlayerFormationSystem.formatsSingleDefine;
		for (var kk in Game.PlayerFormationSystem.formatsSingleDefine) {
			if (Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(kk)) {
				var vv: message.FormationInfo = Game.PlayerFormationSystem.formatsSingleDefine[kk];
				if (vv.formationIndex <= 3) {
					this.formats[vv.formationIndex - 1] = vv;
				}
			}
		}
		for (var fk in this.formats) {
			if (this.formats.hasOwnProperty(fk)) {
				var fv = this.formats[fk];
				for (var k in buttonNames) {
					if (buttonNames.hasOwnProperty(k)) {
						var v = buttonNames[k];
						for (let i = 0; i < 4; i++) {
							if (fv[v][i] == null) {
								fv[v][i] = 0;
							}
						}
					}
				}
				this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT;
				this.formats[fk].formationIndex = Number(fk) + 1;
				this.formatsData[fk] = [0, 0, 0];
				for (let i = 0; i < this.formats[fk].generals.length; i++) {
					if (this.formats[fk].generals[i] != null) {
						this.formatsData[fk][i] == this.formats[fk].generals[i];
					}
				}
				if (this.formats[fk].supports[0] != null) {
					this.formatsData[fk][2] = this.formats[fk].supports[0];
				}
			}
		}
		Game.PlayerFormationSystem.formatsSingleDefine = this.formats;
	}

	//暂存
	private updateFormationShow() {
		function setGeneral() {
			let noGeneral = true;
			for (const k in Game.PlayerFormationSystem.formatsSingleDefine) {
				if (Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(k)) {
					const v = Game.PlayerFormationSystem.formatsSingleDefine[k];
					for (const kk in v.generals) {
						if (v.generals.hasOwnProperty(kk)) {
							const vv = v.generals[kk];
							if (vv != 0) {
								noGeneral = false;
								return noGeneral;
							}
						}
					}
				}
			}
			return noGeneral;
		}
	}


	/**点击规则 */
	private onBtnInfor() {
		loadUI(Common_RuleDialog)
			.then((dialog: Common_RuleDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(RuleConfig.singlePk);
			});
	}

	/**点击格斗商店 */
	private onBtnShop() {
		loadUI(ShopMallDialog)
			.then((dialog: ShopMallDialog) => {
				dialog.load(4);
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**点击本服排行 */
	private onBtnRankServer() {
		loadUI(ArenaWholeRank)
			.then((dialog: ArenaWholeRank) => {
				dialog.setInfo(this, 1);
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**点击世界排行 */
	private onBtnRank() {
		loadUI(ArenaWholeRank)
			.then((dialog: ArenaWholeRank) => {
				dialog.setInfo(this, 2);
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**点击奖励 */
	private onBtnGetAward() {
		loadUI(ArenaWholeAward)
			.then((dialog: ArenaWholeAward) => {
				dialog.setInfo(this);
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**点击战报 */
	private onBtnBattleView() {
		loadUI(MailMainReport)
			.then((dialog: MailMainReport) => {
				dialog.loadFrom(this, TableEnum.Enum.Mail.PK);
				dialog.show(UI.SHOW_FROM_TOP);

			});
	}

	/**点击挑战次数增加按钮 */
	private onBtnAddGemsTone() {
		let lowVip: TableVipinfo = null;
		if (!ckid(Game.PlayerInfoSystem.BaseInfo.vipLevel)) {
			lowVip = TableVipinfo.Item(Game.PlayerInfoSystem.BaseInfo.vipLevel);
		}
		if (Game.PlayerVIPSystem.vipInfo.craft_buy >= this.challengeTableNumber + lowVip.craft_buy_time && !Device.isDebug) {
			if (Device.isReviewSwitch) {
				toast_warning(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty);
			} else {
				TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty, () => {
					return;
				});
			}
		} else {
			let a = CommonConfig.singlecraft_buy_time_consume(Game.PlayerVIPSystem.vipInfo.craft_buy);
			let b = CommonConfig.singlecraft_buy_time;
			let c = this.challengeTableNumber + lowVip.craft_buy_time - Game.PlayerVIPSystem.vipInfo.craft_buy;
			let d = this.challengeTableNumber + lowVip.craft_buy_time;
			let NumberMsg = Helper.StringFormat(TextsConfig.TextsConfig_Pk.buyNumTip, a, b, c, d);
			TipManager.ShowConfirmCancel(NumberMsg, () => {
				this.buyNumberReq();
			}, null);


		}
	}

	/**确认增加条件次数时发协议 */
	private buyNumberReq() {
		Game.PlayerArenaSystem.craftBuyTime()
			.then((roles: message.CraftQueryListResponse) => {
				toast_success(TextsConfig.TextsConfig_Pk.buyChallengeNumSuccessTip);
			})
			.catch((reason) => {
				if (reason == "钻石不足") {
					TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
						return;
					});
				} else {
					toast_warning(reason);
				}

			})

	}

	private buyNumReqVisit(msg, result) {
		if (result == message.EC.SUCCESS) {
			toast("<font color=0x00ff00>" + TextsConfig.TextsConfig_Pk.buyChallengeNumSuccessTip + "</font>");
		} else if (result == message.EC.XG_LACK_TOKEN) {
			// TipManager.sho
		} else {
			// toast(getError);
		}
	}

	/**点击更换对手按钮 */
	private onBtnSelectEnemy() {
		this.clickBtn = true;
		this.btnSelectEnemy.enabled = false;
		let date = Game.Controller.serverNow();
		let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
		let a = humanDate.getTime() / 1000 - 8 * 60 * 60;
		Game.PlayerArenaSystem.singleTimmer.last_time = a + 10;
		this.times = 10;
		this.req();
	}

	private req() {
		let process = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
		if (process != null) {
			if (process.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_NONO) {
				if (this.clickBtn) {
					toast(TextsConfig.TextsConfig_Pk.disenter.skip);
					this.btnSelectEnemy.enabled = true;
					return;
				} else {
					this.setInfo();
					return;
				}
			} else if (process.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_READY) {
				if (this.clickBtn) {
					toast(TextsConfig.TextsConfig_Pk.disenter.close);
					this.btnSelectEnemy.enabled = true;
					return;
				} else {
					this.setInfo();
					return;
				}
			}
		}

		//发协议
		let thisOne = this;
		Game.PlayerArenaSystem.craftQueryList(thisOne.clickBtn)
			.then((roles: message.CraftQueryListRespBody) => {
				if (thisOne.clickBtn) {
					thisOne.singleTimmer.last_time = Game.PlayerInstanceSystem.curServerTime + 10;
				}
				thisOne.enemyInfo = [];
				thisOne.myInfo;
				thisOne.index = roles.index;
				thisOne.enemyInfo = Table.DeepCopy(roles.roleinfos);
				thisOne.myInfo.craft_rank = roles.rank;
				thisOne.myInfo.craft_score = roles.score;
				thisOne.myInfo.craft_rank_self = roles.rank_self || 0;
				thisOne.setInfo();
			})
			.catch((reason) => {
				thisOne.btnSelectEnemy.$setEnabled(true);
				toast(reason);
			})
	}

	/**关闭弹窗*/
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}