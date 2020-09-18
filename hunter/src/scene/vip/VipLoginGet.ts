namespace zj {
	/**
	 * 2019-9-4
	 * xingliwei
	 * @class 登录送VIP
	 */
	export class VipLoginGet extends Dialog {
		private imgBackground: eui.Image;
		private groupImg: eui.Group;
		private groupAni: eui.Group;
		private groupExp: eui.Group;
		private imgExpNull: eui.Image;
		private imgExp: eui.Image;
		private imgExpbg: eui.Image;
		private lbPay: eui.Label;
		private imgVipLevel: eui.Image;
		private btnGo: eui.Button;
		private btnClose: eui.Button;
		private btnGet1: eui.Group;
		private imgGet1: eui.Image;
		private imgTodayGer1: eui.Image;
		private btnGet2: eui.Group;
		private imgGet2: eui.Image;
		private imgTodayGer2: eui.Image;
		private btnGet3: eui.Group;
		private imgGet3: eui.Image;
		private imgTodayGer3: eui.Image;
		private btnGet4: eui.Group;
		private imgGet4: eui.Image;
		private imgTodayGer4: eui.Image;

		private MAX: number = 12;

		public static PlayerInfo: message.RoleShortInfo;
		public constructor() {
			super();
			this.skinName = "resource/skins/vip/VipLoginGetSkin.exml";
			this.imgExp.mask = this.imgExpbg;
			this.init();
		}

		private init() {
			this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
			this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
			this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
			this.btnGet4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet4, this);

			this.setInfo();
		}

		private setInfo() {
			this.imgVipLevel.source = "ui_mall_new_VIP" + Game.PlayerInfoSystem.VipLevel + "_png";

			//经验
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.LowVip + ".json"); 		//读表
			let percent: number = 0;
			let levelCur = Game.PlayerInfoSystem.VipLevel
			if (levelCur != this.MAX) {
				percent = Number((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / (tbl[levelCur].charge + tbl[levelCur].sum));
				this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + (tbl[levelCur].charge + tbl[levelCur].sum) / 10).toString();
			} else {
				percent = Number((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / tbl[levelCur].sum);
				this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + tbl[levelCur].sum / 10).toString();
			}
			if (percent > 1) {
				percent = 1;
			}
			if (percent < 0) {
				percent = 0;
			}
			this.imgExpbg.width = 341 * percent;

			for (let i = 1; i <= 4; i++) {
				this["imgGet" + i].visible = false;
			}


			var date = Game.PlayerInfoSystem.BaseInfo.createTime;
			let a = Game.Controller.curServerTime;

			let newDate = new Date(date * 1000);
			let diff = newDate.getHours() * 3600 + newDate.getMinutes() * 60 + newDate.getSeconds();
			let start = date - diff;
			let time = (((a - start) / (24 * 3600)) >> 0) + 1;


			if (time >= 1) {
				this.imgTodayGer1.visible = true;
			}
			if (time >= 2) {
				this.imgTodayGer2.visible = true;
				this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
			} else {
				this.imgTodayGer2.visible = false;
				this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
			}
			if (time >= 3) {
				this.imgTodayGer3.visible = true;
				this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
			} else {
				this.imgTodayGer3.visible = false;
				this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
			}

			for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
				if (key == 20001) {
					this.btnGet4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet4, this);
					this.imgTodayGer4.visible = false;
					this.imgGet4.visible = true;
				}
				if (key == 20002) {
					this.btnGet1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
					this.imgTodayGer1.visible = false;
					this.imgGet1.visible = true;
				}
				if (key == 20003) {
					this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
					this.imgTodayGer2.visible = false;
					this.imgGet2.visible = true;
				}
				if (key == 20004) {
					this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
					this.imgTodayGer3.visible = false;
					this.imgGet3.visible = true;
				}
			}

			if (this.imgTodayGer1.visible == true) {
				this.imgTodayGer2.visible = false;
				this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
			}
			if (this.imgTodayGer2.visible == true || this.imgGet2.visible == false) {
				this.imgTodayGer3.visible = false;
				this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
			}
		}

		private onBtnGet1() {
			this.receive(20002);
		}

		private onBtnGet2() {
			this.receive(20003);
		}

		private onBtnGet3() {
			this.receive(20004);
		}

		private onBtnGet4() {
			this.receive(20001);
		}

		private receive(type: number) {
			this.receiveAward(type).then((gameInfo: message.GameInfo) => {
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						for (let i = 0; i < gameInfo.getGoods.length; i++) {
							gameInfo.getGoods[i].count /= 10;
						}
						dialog.init(gameInfo.getGoods);
						dialog.show();
						dialog.setCB(() => {
							this.setInfo();
						})
					})
			}).catch(() => {

			})
		}

		/**领取奖励发协议 */
		public receiveAward(type: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ShareRewardRequest();
				request.body.share_type = type
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ShareRewardResponse>resp;
					if (response.header.result != 0) {
						return;
					}
					resolve(response.body.gameInfo);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false);

			});
		}

		private onBtnGo() {
			loadUI(VipLow)
				.then((dialog: VipLow) => {
					dialog.show(UI.SHOW_FILL_OUT);
					dialog.init(true);
				});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
			if (Teach.m_bOpenTeach == true && Teach.teachingNow == false && !Teach.isDone(teachBattle.teachPartID_First_Charge) && Teach.isDone(3005)) {
                Teach.SetTeachPart(teachBattle.teachPartID_First_Charge);
            }
			else if (Teach.m_bOpenTeach == true && Teach.teachingNow == false && Teach.isDone(teachBattle.teachPartID_First_Charge) && Teach.isDone(3005) && !Teach.isDone(teachBattle.teachPartID_GiftBag)) {
				// Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);
				Game.TeachSystem.isShowGetVip = false;
				Game.EventManager.event(GameEvent.START_NEW_TEACHING, {curPart: teachBattle.teachPartID_GiftBag});
				let ui: any = Game.UIManager.topScene();
                if (ui instanceof MainCityUI) {
					(ui as MainCityUI).sceneUI.setInfoGiftList();
                }
			}
		}
	}
}