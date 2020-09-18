namespace zj {
	/** 
	 * @author 
	 * 
	 * @date 2019-1-29
	 * 
	 * @class 对手防守阵容界面
	 */
	export class ArenaWholeEnemy extends Dialog {
		private btnClose: eui.Button;
		private listHeopTeam: eui.List;
		private btnFight: eui.Button;
		private info;
		private flag;
		private fatner;
		public enemyInfo;
		private enemyItems: eui.ArrayCollection = new eui.ArrayCollection();
		private id: number = 0;
		private playerInfo = [];
		public num: number = 0;
		public nameChat;
		public typeChat;
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeEnemySkin.exml";
			this.init();
		}
		public setInfo(info, enemyInfo, name?, type?, playerInfo?, father?, flag?) {
			this.nameChat = name;
			this.typeChat = type;
			this.playerInfo = playerInfo;
			this.info = info;
			this.enemyInfo = enemyInfo;
			if (father != null) {
				this.fatner = father;
			}
			this.flag = flag;
			this.checkEnemInfo();
			if (!this.flag) {
				this.setInfoList();
			}
		}

		public EFormationType(num: number) {
			this.num = num;
		}

		private init() {
			let tap = egret.TouchEvent.TOUCH_TAP;
			this.btnClose.addEventListener(tap, this.onBtnClose, this);
			this.btnFight.addEventListener(tap, this.onBtnFight, this);

		}

		private checkEnemInfo() {
			for (let i = 0; i < 3; i++) {
				if (this.enemyInfo[i] == null) {
					let tbl = new message.CraftFormationInfo();
					tbl.simpleInfo = null;
					tbl.index = i;
					let formats = new message.SimpleFormationInfo();
					let buttonName = ["generals", "supports"];
					for (let j = 0; j < buttonName.length; j++) {
						for (let k = 1; k <= 3; k++) {
							if (buttonName[j] == "supports" && k >= 2) {
								break;
							}
							let generalInfo = new message.GeneralSimpleInfo();
							formats[buttonName[j]].push(generalInfo);
						}
					}
					tbl.simpleInfo = formats;
					this.enemyInfo.push(tbl);
				}
			}
		}

		private onBtnFight() {
			let thisOne = this;
			if (this.flag != true) {
				let curTime = PlayerVIPSystem.Level().singlecraft_free + (Game.PlayerVIPSystem.vipInfo.craft_buy * CommonConfig.singlecraft_buy_time) - Game.PlayerVIPSystem.vipInfo.craft_time;
				if (curTime > 0) {
					if (this.num == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
						if (this.typeChat == 100) {
							Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
							loadUI(CommonFormatePveMain)
								.then((dialog: CommonFormatePveMain) => {
									Game.EventManager.event(GameEvent.MSGINFOP_DATA, { msgInfoName: this.info.name, msgInfoLevel: this.info.level, msgInfoArea: this.nameChat });
									//Game.EventManager.event(GameEvent.MANY_TEAMS, { manyTeamsFormations: this.enemyInfo, manyTeamsInfo: this.info });
									dialog.show(UI.SHOW_FROM_TOP);
									dialog.setInfo(thisOne.id);
								});
						} else {
							Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
							loadUI(CommonFormatePveMain)
								.then((dialog: CommonFormatePveMain) => {

									Game.EventManager.event(GameEvent.MANY_TEAMS, { manyTeamsFormations: this.enemyInfo, manyTeamsInfo: this.info });
									dialog.show(UI.SHOW_FROM_TOP);
									dialog.setInfo(thisOne.id);
								});
						}
					} else {
						Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
						loadUI(CommonFormatePveMain)
							.then((dialog: CommonFormatePveMain) => {
								Game.EventManager.event(GameEvent.CROSS_SERVER_COMBAT_ITEM, { playerInfo: thisOne.playerInfo, crossRealminfo: thisOne.info, father: thisOne });
								dialog.show(UI.SHOW_FROM_TOP);
								dialog.setInfo(thisOne.id);
							});
					}

				} else {

					let challengeTableNumber = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).singlecraft_buy;
					let lowVip = TableVipinfo.Item(Game.PlayerInfoSystem.BaseInfo.vipLevel);

					let a = CommonConfig.singlecraft_buy_time_consume(Game.PlayerVIPSystem.vipInfo.craft_buy);
					let b = CommonConfig.singlecraft_buy_time;
					let c = challengeTableNumber + lowVip.craft_buy_time - Game.PlayerVIPSystem.vipInfo.craft_buy;
					let d = challengeTableNumber + lowVip.craft_buy_time;
					let NumberMsg = Helper.StringFormat(TextsConfig.TextsConfig_Pk.buyNumTip, a, b, c, d);
					TipManager.ShowConfirmCancel(NumberMsg, () => {
						this.buyNumberReq();
					}, null);
				}
			} else {
				Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
				loadUI(CommonFormatePveMain)
					.then((dialog: CommonFormatePveMain) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo(this.id);
					});
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
		private setInfoList() {
			this.enemyItems.removeAll();
			for (let i = 0; i < this.enemyInfo.length; i++) {
				let data = new ArenaWholeEnemyItemData();
				data.index = i;
				data.enemyInfo = this.enemyInfo[i];
				this.enemyItems.addItem(data);
			}
			this.listHeopTeam.dataProvider = this.enemyItems;
			this.listHeopTeam.itemRenderer = ArenaWholeEnemyItem;

		}

		/**关闭弹窗*/
		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}

}