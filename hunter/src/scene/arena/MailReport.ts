namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-2-20
 * 
 * @class 战报详情界面
 */
export class MailReport extends Dialog {
	private btnClose: eui.Button;
	private labelTitle: eui.Label;
	private labelFrom: eui.Label;
	private labelTime: eui.Label;
	private imgWin: eui.Image;
	private labelContent: eui.Label;
	private btnViewEnemyTeam: eui.Button;
	private groupHide: eui.Group;
	private groupOneTeam: eui.Group;
	private listSupport: eui.List;
	private groupThreeTean: eui.Group;
	private listHunter: eui.List;
	private btnReplay: eui.Button;
	private btnEnemy: eui.Button;
	private btnFoe: eui.Button;
	private btnShare: eui.Button;
	private father: MailMainReport | Mail_Main;
	private info: message.MailInfo;
	private cb: Function;
	private formate = {
		isMutiFormate: null,
		enemyFormation: {
			generals: null,
			supports: null
		},
		bWin: {},
		show_enemy: null
	}
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/MailReportSkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
		this.init();
		if (Device.isReviewSwitch) {
			this.btnViewEnemyTeam.visible = false;
		}
	}
	private init() {
		let tap = egret.TouchEvent.TOUCH_TAP;
		this.btnClose.addEventListener(tap, this.onBtnClose, this);
		if (Device.isReviewSwitch) {
			this.btnViewEnemyTeam.visible = false;
		} else {
			this.btnViewEnemyTeam.addEventListener(tap, this.onBtnViewEnemyTeam, this);
		}
		this.formate.isMutiFormate = false;
		this.formate.show_enemy = false;
		this.formate.enemyFormation.generals = [];
		this.formate.enemyFormation.supports = [];
		this.groupHide.alpha = 0;
	}

	public setInfo(info: message.MailInfo, father: MailMainReport | Mail_Main, cb: Function) {
		this.father = father;
		this.info = info;
		this.cb = cb;
		let path = UIConfig.UIConfig_Mail.winLogo[info.battleResult - 1];
		this.labelTitle.text = info.title;
		this.labelFrom.text = TextsConfig.TextsConfig_Mail.system;

		this.labelTime.text = Set.TimeForMail(info.createtime);
		this.labelContent.textFlow = Util.RichText(info.content);
		this.imgWin.source = cachekey(path, this);

		this.btnReplay.visible = false;
		this.btnShare.visible = false;
		this.btnEnemy.visible = false;
		this.btnFoe.visible = false;

		if (this.father.mailType == message.MailType.MAIL_TYPE_LADDER || this.father.mailType == message.MailType.MAIL_TYPE_SINGLECRAFT || this.father.mailType == message.MailType.MAIL_TYPE_PVP) {
			this.btnViewEnemyTeam.visible = (this.info.war_id != "0");
		}
	}

	private onBtnViewEnemyTeam() {
		if (Object.keys(this.formate.enemyFormation.generals).length > 0) {
			if (!this.formate.show_enemy) {
				this.AniOpen();
			} else {
				this.AniClose();
			}
			this.formate.show_enemy = !this.formate.show_enemy;
		} else {
			if (this.father.mailType == message.MailType.MAIL_TYPE_PVP) {
				if (this.info.battleDate == null || this.info.battleDate.length == 0) {
					toast_warning(TextsConfig.TextsConfig_Replay.ReplayMsg_Error);
					return;
				}
				if (Number(this.info.war_id) == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
					let extrate = function (s) {
						let msg = new message.MultiResultInfo();
						if (true) {
							let decoder = new aone.BinaryDecoder(new Uint8Array(s));
							if (!msg.parse_bytes(decoder)) {
								toast_warning("单队切磋数据解析失败!");
								return null;
							}
						}
						return msg;
					}
					Game.PlayerBattleSystem.multiResultInfo.battleData = this.info.battleDate;
					Game.PlayerBattleSystem.multiResultInfo.newMultiResultInfo = extrate(this.info.battleDate);
					if (Game.PlayerBattleSystem.multiResultInfo.battleData.length) {
						this.setInfoFormateList(Number(this.info.war_id));
						this.AniOpen();
						this.formate.show_enemy = !this.formate.show_enemy;
					} else {
						toast_warning(LANG(TextsConfig.TextsConfig_Replay.ReplayMsg_Error));
					}
				} else if (Number(this.info.war_id) == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
					let extrate = function (s) {
						let msg = new message.MoreSimpleFormationInfo();
						if (true) {
							let decoder = new aone.BinaryDecoder(new Uint8Array(s))
							if (!msg.parse_bytes(decoder)) {
								toast_warning("三队切磋数据解析失败!");
								return null;
							}
						}
						return msg;
					}
					Game.PlayerBattleSystem.multiResultInfo.battleData = this.info.battleDate;
					Game.PlayerBattleSystem.multiResultInfo.newMoreSimpleFormationInfo = extrate(this.info.battleDate);
					if (Game.PlayerBattleSystem.multiResultInfo.battleData.length) {
						this.setInfoFormateList(Number(this.info.war_id));
						this.AniOpen();
						this.formate.show_enemy = !this.formate.show_enemy;
					} else {
						toast_warning(LANG(TextsConfig.TextsConfig_Replay.ReplayMsg_Error));
					}
				}
			} else {
				this.queryBattleReportReq();
			}
		}
	}

	private queryBattleReportReq() {
		Game.PlayerArenaSystem.queryBattle(this.info.war_id)
			.then((battleData) => {
				let success = Game.PlayerBattleSystem.UncompressBattleData(battleData[0], true)
				if (success) {
					this.setInfoFormateList(battleData[0].battleType);
					this.AniOpen();
					this.formate.show_enemy = !this.formate.show_enemy;
				} else {
					toast_warning(TextsConfig.TextsConfig_Replay.ReplayMsg_Error);
				}
			}).catch((result) => {
				toast_warning(Helper.GetErrorString(result));
			});
	}

	private setInfoFormateList(formationtype: number) {

		let formate: message.ReplayDetailInfo = null;
		let generalsNumber = Formate.Instence(formationtype).generals + Formate.Instence(formationtype).generals_limit_number[0];
		let resultInfo = Game.PlayerBattleSystem.multiResultInfo;
		if (formationtype == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || (formationtype == message.EFormationType.FORMATION_TYPE_CRAFT)) {
			this.formate.isMutiFormate = true;
			let beLeft = null;
			for (let i = 0; i < 3; i++) {

				this.formate.enemyFormation.generals[i] = [];
				formate = null;

				if (resultInfo.newMultiResultInfo.results[i] != null) {

					Game.PlayerBattleSystem.UncompressBattleData(resultInfo.newMultiResultInfo.results[i], false);
					resultInfo = Game.PlayerBattleSystem.multiResultInfo;
					if (beLeft == null) {
						if (resultInfo.newReplayBattleInfo.leftReplayInfo.roleInfo.id != Game.PlayerInfoSystem.BaseInfo.id) {
							beLeft = true;
							formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
						} else if (resultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo.id != Game.PlayerInfoSystem.BaseInfo.id) {
							beLeft = false;
							formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
						}
					} else if (beLeft == false) {
						formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
					} else {
						formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
					}

					if (formate != null) {
						for (let k = 0; k < formate.formation.generals.length; k++) {
							let v = formate.formation.generals[k];
							if (v == 0) {
								this.formate.enemyFormation.generals[i][k] = 0;
							} else {
								let [generalInfo,] = Table.FindR(formate.generals, (_, _v: message.BattleGeneralInfo) => {
									return _v.generalInfo.general_id == v;
								});
								if (generalInfo != null) {
									this.formate.enemyFormation.generals[i][k] = generalInfo; //generalInfo.generalInfo 有错误
								} else {
									this.formate.enemyFormation.generals[i][k] = 0;
								}
							}
						}
					}

					this.formate.bWin[i] = resultInfo.battleResult;
				} else {
					let formateOne: message.SimpleFormationInfo = null;
					if (beLeft) {
						formateOne = resultInfo.newMultiResultInfo.leftFormation[0];
					} else if (beLeft == false) {
						formateOne = resultInfo.newMultiResultInfo.rightFormation[0];
					}

					if (formateOne != null) {
						for (let k = 0; k < formateOne.generals.length; k++) {
							let v = formateOne.generals[k];
							if (v.general_id != 0) {
								this.formate.enemyFormation.generals[i][k] = v;
							}
						}
					}

				}

				for (let j = 0; j < generalsNumber; j++) {
					if (this.formate.enemyFormation.generals[i][j] == null) {
						this.formate.enemyFormation.generals[i][j] = 0;
					}
				}
			}
		} else if (formationtype == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
			this.formate.isMutiFormate = true;
			for (let i = 0; i < 3; i++) {
				this.formate.enemyFormation.generals[i] = {};
				let formateTwo: message.SimpleFormationInfo = null
				if (resultInfo.battleData != null) {
					formateTwo = resultInfo.newMoreSimpleFormationInfo.simpleFormation[i];
					if (formateTwo != null) {
						for (let j = 0; j < generalsNumber; j++) {
							if ((formateTwo.generals[j].general_id == 0) || (formateTwo.generals[j].general_id == null)) {
								this.formate.enemyFormation.generals[i][j] = 0;
							} else {
								this.formate.enemyFormation.generals[i][j] = formateTwo.generals[j];
							}
						}
					}
					if (resultInfo.newMoreSimpleFormationInfo.battle_result[i] != null) {
						this.formate.bWin[i] = resultInfo.newMoreSimpleFormationInfo.battle_result[i];
					}
				}
				for (let j = 0; j < generalsNumber; j++) {
					if (this.formate.enemyFormation.generals[i][j] == null) {
						this.formate.enemyFormation.generals[i][j] = 0;
					}
				}
			}
		} else if (formationtype == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			this.formate.isMutiFormate = false;
			this.formate.enemyFormation.generals = {};
			let formateTwo: message.SimpleFormationInfo = null
			if (resultInfo.battleData != null) {
				formateTwo = resultInfo.newMultiResultInfo.leftFormation[0];
				if (formateTwo != null) {
					for (let j = 0; j < generalsNumber; j++) {
						if ((formateTwo.generals[j].general_id == 0) || (formateTwo.generals[j].general_id == null)) {
							this.formate.enemyFormation.generals[j] = 0;
						} else {
							this.formate.enemyFormation.generals[j] = formateTwo.generals[j];
						}
					}
					for (let j = 0; j < generalsNumber; j++) {
						if (formateTwo.supports[j].general_id == 0 || formateTwo.supports[j].general_id == null) {
							this.formate.enemyFormation.supports[j] = 0;
						} else {
							this.formate.enemyFormation.supports[j] = formateTwo.supports[j];
						}

					}
				}
			}
			for (let j = 0; j < generalsNumber; j++) {
				if (this.formate.enemyFormation.generals[j] == null) {
					this.formate.enemyFormation.generals[j] = 0;
				}
			}
			for (let j = 0; j < generalsNumber; j++) {
				if (this.formate.enemyFormation.supports[j] == null) {
					this.formate.enemyFormation.supports[j] = 0;
				}
			}
		} else {
			this.formate.isMutiFormate = false;
			if (resultInfo.battleData != null) {
				if (resultInfo.newReplayBattleInfo.leftReplayInfo.roleInfo.id != Game.PlayerInfoSystem.BaseInfo.id) {
					formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
				} else if (resultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo.id != Game.PlayerInfoSystem.BaseInfo.id) {
					formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
				}
			}
			if (formate != null) {
				let thisOne = this;
				for (let k = 0; k < formate.formation.generals.length; k++) {
					let v = formate.formation.generals[k];
					if (v == 0) {
						thisOne.formate.enemyFormation.generals[k] = 0;
					} else {
						let [generalInfo,] = Table.FindR(formate.generals, (_, _v: message.BattleGeneralInfo) => {
							return _v.generalInfo.general_id == v;
						});
						if (generalInfo != null) {
							thisOne.formate.enemyFormation.generals[k] = generalInfo; // .generalInfo; 有问题
						} else {
							thisOne.formate.enemyFormation.generals[k] = 0;
						}
					}
				}
				for (let k = 0; k < formate.formation.supports.length; k++) {
					let v = formate.formation.supports[k];
					if (v == 0) {
						thisOne.formate.enemyFormation.supports[k] = 0;
					} else {
						let [generalInfo,] = Table.FindR(formate.generals, (_k, _v) => {
							return _v.generalInfo.general_id == v;
						})
						if (generalInfo != null) {
							thisOne.formate.enemyFormation.supports[k] = generalInfo; // .generalInfo; 有问题
						} else {
							thisOne.formate.enemyFormation.generals[k] = 0;
						}
					}
				}
			}
			for (let i = 0; i < generalsNumber; i++) {
				if (this.formate.enemyFormation.generals[i] == null) {
					this.formate.enemyFormation.generals[i] = 0;
				}
			}
			for (let i = 0; i < generalsNumber; i++) {
				if (this.formate.enemyFormation.supports[i] == null) {
					this.formate.enemyFormation.supports[i] = 0;
				}
			}
		}
		this.LoadList();
	}

	/**动画打开防守阵容List */
	private AniOpen() {
		this.groupHide.alpha = 1;
		this.groupHide.scaleX = 0;
		this.groupHide.visible = true;
		egret.Tween.get(this.groupHide).to({ scaleX: 1.1 }, 400).to({ scaleX: 1 }, 150).call(() => {
			Set.ButtonBackgroud(this.btnViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNor_png", "ui_arena_ButtonConsealEnemyTeamSel_png");
		});
	}
	/**动画关闭防守阵容List */
	private AniClose() {
		egret.Tween.get(this.groupHide).to({ scaleX: 1.1 }, 150).to({ scaleX: 0 }, 400).call(() => {
			this.groupHide.visible = false;
			Set.ButtonBackgroud(this.btnViewEnemyTeam, "ui_arena_ButtonViewEnemyTeamNor_png", "ui_arena_ButtonViewEnemyTeamSel_png");
		});
	}

	private LoadList() {
		if (!this.formate.isMutiFormate) {
			// this.groupThreeTean.visible = false;
			let generalInfos = [];
			for (let k = 0; k < this.formate.enemyFormation.supports.length; k++) {
				let v = this.formate.enemyFormation.supports[k];
				generalInfos.push(v);
			}
			for (let i = 0; i < Object.keys(this.formate.enemyFormation.generals).length; i++) {
				let vv = this.formate.enemyFormation.generals[i];
				generalInfos.push(vv);
			}

			let array = new eui.ArrayCollection();
			for (let i = 0; i < generalInfos.length; i++) {
				let data = new CommonArenaEnemyTeamItemData();
				data.index = i + 1;
				data.simpleInfo = generalInfos[i];
				array.addItem(data)
			}
			this.listSupport.dataProvider = array;
			this.listSupport.itemRenderer = CommonArenaEnemyTeamItem;

		} else {
			// this.groupOneTeam.visible = false;

			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.formate.enemyFormation.generals.length; i++) {
				let data = new CommonBattleMailThreeItemData();
				data.index = i + 1;
				data.info = this.formate.enemyFormation.generals[i];
				data.bWin = this.formate.bWin[i];
				array.addItem(data)
			}
			this.listHunter.dataProvider = array;
			this.listHunter.itemRenderer = CommonBattleMailThreeItem;

		}
	}

	/**关闭弹窗*/
	private onBtnClose() {
		this.cb();
		this.close(UI.HIDE_TO_TOP);
	}
}
}