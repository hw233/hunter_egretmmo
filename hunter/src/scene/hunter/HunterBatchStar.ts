namespace zj {
	/**
	* @author xingliwei
	* 
	* @date 2019-11-4
	* 
	* @class 猎人批量升星
	*/
	export class HunterBatchStar extends Dialog {
		public groupLeft: eui.Group;
		public labelHunterTip: eui.Label;
		public scrollerHero: eui.Scroller;
		public listHeros: eui.List;
		public groupBtn1: eui.Group;
		public imgvisible1: eui.Image;
		public groupBtn2: eui.Group;
		public imgvisible2: eui.Image;
		public groupBtn3: eui.Group;
		public imgvisible3: eui.Image;
		public btnAddStar: eui.Button;
		public labelUpStarNumber: eui.Label;
		public groupLeft1: eui.Group;
		public scrollerHero1: eui.Scroller;
		public listHeros1: eui.List;
		public btnClose1: eui.Button;
		public groupMoney: eui.Group;
		public groupMoney1: eui.Group;
		public gold: eui.Image;
		public labelIntegrate: eui.Label;
		public btnAddGold: eui.Button;
		public groupMoney2: eui.Group;
		public jewel: eui.Image;
		public labelToken: eui.Label;
		public btnAdddiamond: eui.Button;
		public btnClose: eui.Button;


		public hunterInfo: Array<message.GeneralInfo> = [];
		private generalInfo: Array<message.GeneralInfo> = [];
		public CB: Function;
		private update: number;
		private fatherGeneralId: number;

		private generals
		private generals1
		private money = TableBaseGeneral.Item(10001).up_star_money;
		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterBatchStarSkin.exml";
			this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.init, this);
		}

		public init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.groupBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible1, this);
			this.groupBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible2, this);
			this.groupBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible3, this);
			this.btnAddStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStar, this);
			this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
			this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
			this.btnClose1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.init() }, this);
			this.imgvisible1.alpha = 1;
			this.imgvisible2.alpha = 1;
			this.imgvisible3.alpha = 0.01;

			this.sethunterinfo();
			this.countGeneralInfo();
			this.groupLeft1.visible = false;
			Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.Update, this);
			Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.Update, this);
			this.Update();
		}

		private Update() {
			//钻石数量
			if (Game.PlayerInfoSystem.Coin > 100000) {
				this.labelIntegrate.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
			} else {
				this.labelIntegrate.text = Game.PlayerInfoSystem.Coin.toString();
			}
			//钻石数量
			if (Game.PlayerInfoSystem.Token > 100000) {
				this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
			} else {
				this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
			}
			if (this.labelIntegrate.width < 60) {
				this.labelIntegrate.width = 60;
			}
			if (this.labelToken.width < 60) {
				this.labelToken.width = 60;
			}
		}

		private onBtnAddGold() {
			loadUI(HelpGoldDialog)
				.then((dialog: HelpGoldDialog) => {
					dialog.SetInfoList();
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		private onBtnAddGemstone() {
			// toast_success("加钻石功能未开启");
			loadUI(PayMallScene)
				.then((scene: PayMallScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init(false);
				});
		}

		public cb(cb, generalId: number) {
			this.CB = cb;
			this.fatherGeneralId = generalId;
		}

		/**点击C品质按钮 */
		public onBtnvisible1() {
			if (this.imgvisible1.alpha == 1) {
				this.imgvisible1.alpha = 0.01;
			} else {
				this.imgvisible1.alpha = 1;
			}
			this.countGeneralInfo();
		}
		/**点击B品质按钮 */
		public onBtnvisible2() {
			if (this.imgvisible2.alpha == 1) {
				this.imgvisible2.alpha = 0.01;
			} else {
				this.imgvisible2.alpha = 1;
			}
			this.countGeneralInfo();
		}
		/**点击A品质按钮 */
		public onBtnvisible3() {
			if (this.imgvisible3.alpha == 1) {
				this.imgvisible3.alpha = 0.01;
			} else {
				this.imgvisible3.alpha = 1;
			}
			this.countGeneralInfo();
		}

		/**把符合升星条件的猎人筛选出来(未在阵容，) */
		public sethunterinfo() {
			this.hunterInfo = [];
			let hunterinfo = Game.PlayerHunterSystem.queryAllHunters();
			for (let i = 0; i < hunterinfo.length; i++) {
				let a = Table.FindF(PlayerHunterSystem.GeneralsIdInDefence(), (k, v) => {
					return hunterinfo[i].general_id == v.general_id;
				});
				if (!a && Game.PlayerHunterSystem.Table(hunterinfo[i].general_id).aptitude >= 11
					&& Game.PlayerHunterSystem.Table(hunterinfo[i].general_id).aptitude <= 13 && hunterinfo[i].level == 1 && hunterinfo[i].star <= 4) {
					this.hunterInfo.push(hunterinfo[i]);
				}
			}
			this.hunterInfo.sort(function (a: message.GeneralInfo, b: message.GeneralInfo) {
				let gnr_a = PlayerHunterSystem.Table(a.general_id);
				let gnr_b = PlayerHunterSystem.Table(b.general_id);
				if (gnr_a.aptitude == gnr_b.aptitude) {
					if (a.level == b.level) {
						if (a.star == b.star) {
							if (a.awakePassive.level == b.awakePassive.level) {
								return gnr_b.general_id - gnr_a.general_id;
							} else {
								return b.awakePassive.level - a.awakePassive.level;
							}
						} else {
							return b.star - a.star;
						}
					} else {
						return b.level - a.level;
					}
				} else {
					return gnr_b.aptitude - gnr_a.aptitude;
				}
			});
		}

		public countGeneralInfo() {
			this.generalInfo = [];
			let a1 = [];
			let a2 = [];
			let a3 = [];
			for (let i = 0; i < this.hunterInfo.length; i++) {
				if (this.imgvisible1.alpha == 1) {
					if (Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 11 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
						this.generalInfo.push(this.hunterInfo[i]);
						a1.push(this.hunterInfo[i]);
					}
				}
				if (this.imgvisible2.alpha == 1) {
					if (Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 12 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
						this.generalInfo.push(this.hunterInfo[i]);
						a2.push(this.hunterInfo[i]);
					}
				}
				if (this.imgvisible3.alpha == 1) {
					if (Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 13 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
						this.generalInfo.push(this.hunterInfo[i]);
						a3.push(this.hunterInfo[i]);
					}
				}
			}

			this.loadMoney(a1, a2, a3);
			this.loadList();
		}
		/**计算金币 */
		private loadMoney(a: message.GeneralInfo[], b: message.GeneralInfo[], c: message.GeneralInfo[]) {
			let a1 = 0;
			let a2 = 0;
			let a3 = 0;

			let money = 0;
			a1 = Math.floor((a.length) / 3);
			money += a1 * this.money[1];

			a2 = Math.floor((b.length + a1) / 4);
			money += a2 * this.money[2];

			a3 = Math.floor((c.length + a2) / 5);
			money += a3 * this.money[3];
			this.labelUpStarNumber.text = Set.NumberUnit2(money);
		}

		/**加载猎人列表 */
		public loadList() {
			let array = new eui.ArrayCollection();
			let fix = PlayerItemSystem.FixCount(this.generalInfo.length, 18, 6);
			for (let i = 0; i < fix; i++) {
				this.generalInfo.push(new message.GeneralInfo());
			}

			for (let i = 0; i < this.generalInfo.length; i++) {
				let data = new HunterBatchStarItemData;
				data.info = this.generalInfo[i];
				array.addItem(data);
			}
			this.listHeros.dataProvider = array;
			this.listHeros.itemRenderer = HunterBatchStarItem;
		}

		/**点击升星 */
		private onBtnAddStar() {
			this.generals = null;
			Game.EventManager.on(GameEvent.PLAYER_GENERALS_CHANGE, this.onGeneralsChange, this);
			if (this.generalInfo.length > 0) {
				let a = [];
				for (let i = 0; i < this.generalInfo.length; i++) {
					if (this.generalInfo[i].general_id != 0) {
						a.push(this.generalInfo[i].general_id);
					}
				}
				if (a.length > 0) {
					let vis = Table.FindF(a, (k, v) => {
						return Game.PlayerHunterSystem.Table(v).aptitude == 13;
					})
					this.generals = a;
					let star = () => {
						this.GeneralUpStarBatch(a).then((info: message.GameInfo) => {
							let vis = Table.FindF(info.generals, (k, v: message.GeneralInfo) => {
								return v.star == 5;
							})
							if (vis) {
								toast_success("猎人批量升星成功");
							}
							if (info.generals.length != 0) {
								for (let i = 0; i < a.length; i++) {
									let b = Table.FindF(info.generals, (k, v: message.GeneralInfo) => {
										return a[i] == v.general_id;
									});
									if (!b && info.generals.length > 0) {
										Game.PlayerHunterSystem.deleteHunterById(a[i])
									};
								}

								if (info.generals.length != this.generals.length) {
									this.groupLeft1.visible = true;
									let array = new eui.ArrayCollection();
									info.generals.sort(function (a: message.GeneralInfo, b: message.GeneralInfo) {
										return b.star - a.star;
									});
									let fix = PlayerItemSystem.FixCount(info.generals, 24, 6);
									for (let i = 0; i < fix; i++) {
										this.generalInfo.push(new message.GeneralInfo());
									}
									for (let i = 0; i < info.generals.length; i++) {
										let data = new HunterBatchStarItemData;
										data.info = info.generals[i];
										data.vis = false;
										array.addItem(data);
									}
									this.listHeros1.dataProvider = array;
									this.listHeros1.itemRenderer = HunterBatchStarItem;
								} else {
									toast_warning("所选猎人不足，未有猎人升星")
								}
								this.sethunterinfo();
								this.countGeneralInfo();
							}
						}).catch(() => {

						})
					}
					if (vis) {
						TipManager.ShowConfirmCancel("所选猎人中包含A级猎人是否继续？", () => {
							star();
						}, () => { })
					} else {
						star();
					}
				} else {
					toast_warning("数量不足，请选择");
				}
			} else {
				toast_warning("数量不足，请选择");
			}
		}

		private onGeneralsChange() {

		}

		/** 批量升星协议 */
		private GeneralUpStarBatch(info): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.GeneralUpStarBatchRequest();
				request.body.generalIds = info;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.GeneralUpStarBatchResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					let data = response.body.gameInfo;
					resolve(data);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		public onBtnClose() {
			if (this.CB) {
				this.CB();
			}
			this.close(UI.HIDE_TO_TOP);
		}
	}
}
