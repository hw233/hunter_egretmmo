namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-14
	 * 
	 * @class 玩家详情
	 */
	export class userMainSense extends Dialog {
		private bg: eui.Image;
		private groupMain: eui.Group;
		private btnClose: eui.Button;
		private groupLeft: eui.Group;
		private imgFrame: eui.Image;
		private imgHead: eui.Image;
		private boardTitle: eui.Image;
		private imgTitle: eui.Image;
		private labelPlayerPower: eui.Label;
		private btnVip: eui.Button;
		private btnChangeHead: eui.Button;
		private groupRightTop: eui.Group;
		private labelUserName: eui.Label;
		private labelUserId: eui.Label;
		private labelUserLevel: eui.Label;
		private imgExpBar: eui.Image;
		private imgExpBarBg: eui.Image;
		private labelExp: eui.Label;
		private labelMax: eui.Label;
		private btnChangeName: eui.Button;
		private labelTitle1: eui.Label;
		private labelEffext1: eui.Label;
		private btnReLogin: eui.Button;
		private btnSystem: eui.Button;
		private bthKey: eui.Button;
		private btnProtocol: eui.Button;
		private imgbg: eui.Image;
		private groupLicense: eui.Group;
		public update;
		private cb;
		public constructor() {
			super();
			this.skinName = "resource/skins/user/userMainSenseSkin.exml";
			if (this.imgbg) {
				if (this.imgbg.width < UIManager.StageWidth) {
					this.imgbg.width = UIManager.StageWidth;
				}
			}
			this.init()
		}

		private init() {
			//打开时缓动动画
			this.groupMain.alpha = 0;
			this.imgbg.alpha = 0;
			this.width = this.groupMain.width = UIManager.StageWidth;
			this.height = this.groupMain.height = UIManager.StageHeight;
			this.groupMain.scaleX = this.groupMain.scaleY = 0;
			egret.Tween.get(this.imgbg).to({ alpha: 1 }, 100).call(() => {
				let top_scene = Game.UIManager.topScene();
				if (top_scene) {
					top_scene.visible = false;
				}
			});
			egret.Tween.get(this.groupMain).to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 50);
			this.update = egret.setInterval(this.Update, this, 1000);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnVip, this);
			this.btnChangeHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeHead, this);
			this.btnChangeName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeName, this);
			this.btnReLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReLogin, this);
			this.btnSystem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSystem, this);
			this.bthKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBthKey, this);

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
			}, this);
			this.Update();
			//用户协议屏蔽
			this.btnProtocol.visible = false;

			this.imgExpBar.mask = this.imgExpBarBg;

			this.SetInfoUser();
			this.setName();
			if (Device.isReviewSwitch) {
				this.groupLicense.visible = false;
				this.btnVip.visible = false;
				this.btnChangeHead.visible = false;
				this.btnSystem.visible = false;
				this.bthKey.visible = false;
				this.btnProtocol.visible = false;
			}

			if (Device.isReviewSwitch) {
				this.btnClose.x = 630;
			}
		}

		public isFullScreen() {
			return true;
		}
		private Update() {
			this.setName();
		}

		private setName() {
			let strName = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_name, Game.PlayerInfoSystem.BaseInfo.name);
			if (Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
				strName = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_name, TextsConfig.TextsConfig_Common.nameDefault);
			}
			this.labelUserName.text = strName;
			this.labelPlayerPower.text = Set.NumberUnit3(Game.PlayerInfoSystem.BaseInfo.battleValue);
			if (Game.PlayerMissionSystem.missionActive.licence == 0) {
				if (this.boardTitle.source != UIConfig.UIConfig_Task.board[2]) {
					this.boardTitle.source = cachekey(UIConfig.UIConfig_Task.board[2], this);
				}
			} else if (Game.PlayerMissionSystem.missionActive.licence > CommonConfig.licence_max_level) {
				if (this.boardTitle.source != UIConfig.UIConfig_Task.board[3]) {
					this.boardTitle.source = cachekey(UIConfig.UIConfig_Task.board[3], this);
				}
			} else {
				if (this.boardTitle.source != UIConfig.UIConfig_Task.board[1]) {
					this.boardTitle.source = cachekey(UIConfig.UIConfig_Task.board[1], this);
				}
			}
			if (this.imgTitle.source != UIConfig.UIConfig_Task.Title[Game.PlayerMissionSystem.missionActive.licence]) {
				this.imgTitle.source = cachekey(UIConfig.UIConfig_Task.Title[Game.PlayerMissionSystem.missionActive.licence], this)
			}
		}

		private SetInfoUser() {
			let level = TableLevel.Item(Game.PlayerInfoSystem.BaseInfo.level);
			let title1;
			if (Game.PlayerInfoSystem.BaseInfo.titleId == 0) {
				title1 = TextsConfig.TextsConfig_User.text_no_title;
			} else {
				let a = PlayerItemSystem.Table(Game.PlayerInfoSystem.BaseInfo.titleId) as any;
				title1 = a.name;
			}
			let effect1;
			if (Game.PlayerInfoSystem.BaseInfo.titleId == 0) {
				effect1 = TextsConfig.TextsConfig_User.text_no_effect;
			} else {
				let a = PlayerItemSystem.Table(Game.PlayerInfoSystem.BaseInfo.titleId) as any;
				effect1 = a.effect;
			}

			let pathVip = UIConfig.UIConfig_User.vip[Game.PlayerInfoSystem.BaseInfo.licenceLevel - 1];
			let pathHead = PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId);
			let pathFrame = PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picFrameId);
			let strName = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_name, Game.PlayerInfoSystem.BaseInfo.name);
			let strUid = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_id, Game.PlayerInfoSystem.BaseInfo.id);
			let strLevel = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_level, Game.PlayerInfoSystem.BaseInfo.level);
			let strExp = Helper.StringFormat("%s/%s", Game.PlayerInfoSystem.BaseInfo.cur_exp, level.role_exp);
			let strTitle1 = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_title[1], title1);
			let strEffect1 = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.text_effect, effect1);
			let bMax = Game.PlayerInfoSystem.BaseInfo.level == CommonConfig.role_max_level;

			this.imgExpBarBg.width = 393 * Game.PlayerInfoSystem.BaseInfo.cur_exp / level.role_exp;
			this.imgHead.source = cachekey(pathHead, this);
			this.imgFrame.source = cachekey(pathFrame, this);
			if (Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
				// this.labelUserName.text = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.name, TextsConfig.TextsConfig_Common.nameDefault);
			} else {
				// this.labelUserName.text = strName;
			}
			this.labelUserId.text = strUid;
			this.labelUserLevel.text = strLevel;
			this.labelExp.text = strExp;
			this.labelTitle1.text = strTitle1;
			this.labelEffext1.text = strEffect1;
			this.labelMax.visible = bMax;
			this.labelExp.visible = !bMax;

			//发事件通知主城改头像
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
		}

		/**查看特权 */
		private onBtnVip() {
			if (PlayerMissionSystem.FunOpenTo(FUNC.LICENSE, true)) {
				loadUI(licenseMain)
					.then((scene: licenseMain) => {
						scene.CB(() => {
							this.close();
						});
						scene.show(UI.SHOW_FROM_TOP);
					});
			}
		}

		/**个性装扮 */
		private onBtnChangeHead() {
			loadUI(Common_ChangeIcon)
				.then((dialog: Common_ChangeIcon) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setCB((head, frame) => {
						if (frame) {
							if (head != 0) {
								this.ReqModifyUserHeadBefore(Number(head), frame);
							}
						} else {
							if (head != 0) {
								this.ReqModifyUserHeadBefore(Number(head), frame);
							}
						}
					});
					dialog.loadList(TableEnum.TableIconListState.GENERAL);
				});
		}

		/**改名字 */
		private onBtnChangeName() {
			let propId = CommonConfig.role_modify_name_prop_id;
			let strNew = TextsConfig.TextsConfig_User.name_new;
			let strTip = "";
			if (Game.PlayerItemSystem.itemCount(propId) > 0) {
				let a = PlayerItemSystem.Table(Game.PlayerInfoSystem.BaseInfo.titleId) as any;
				strTip = Helper.StringFormat(TextsConfig.TextsConfig_User.name_prop, a.name);
			} else if (Game.PlayerInfoSystem.BaseInfo.token > CommonConfig.modify_role_name_consume) {
				strTip = Helper.StringFormat(TextsConfig.TextsConfig_User.name_token, CommonConfig.modify_role_name_consume);
			}

			loadUI(Common_InputShortDialog)
				.then((dialog: Common_InputShortDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setCB((name, cb) => {
						this.cb = cb;
						this.ReqModifyUserNameBefore(name);
					});
					dialog.SetInfo(null, message.EResourceType.RESOURCE_TOKEN);
					if (message.EResourceType.RESOURCE_TOKEN == CommonConfig.league_modify_name_prop_id) {
						dialog.btnRand.visible = false;
						dialog.btnRand.enabled = false;
					}
				});
		}

		/**重新登录 */
		private onBtnReLogin() {
			Game.PlayerWonderLandSystem.WonderlandLeave().then(() => {
				StageSceneManager.Instance.GetCurScene().delMember(Game.PlayerInfoSystem.BaseInfo.id);
				StageSceneManager.Instance.clearScene();
				Game.PlayerWonderLandSystem.scenePosInfo = {};
				Game.PlayerWonderLandSystem.timePosInfo = {};
				this.gotoLogin();
			}).catch(() => {

			})
		}

		private gotoLogin() {
			egret.clearInterval(this.update);
			Game.uninit();
			loadUI(LoginScene)
				.then((scene: LoginScene) => {
					Game.UIManager.popAllUIs();
					scene.show();
				})
		}

		/**系统设置 */
		private onBtnSystem() {
			loadUI(userSystem)
				.then((scene: userSystem) => {
					scene.show(UI.SHOW_FROM_TOP);
				})
		}

		/**激活码 */
		private onBthKey() {
			loadUI(CommonInputCode)
				.then((scene: CommonInputCode) => {
					scene.show(UI.SHOW_FROM_TOP);
				})
		}

		private onBtnClose() {
			let top_scene = Game.UIManager.topScene();
			if (top_scene) {
				top_scene.visible = true;
			}
			egret.Tween.get(this.imgbg).to({ alpha: 0 }, 100);
			egret.Tween.get(this.groupMain).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 200).call(() => {
				this.close();
			});
			Game.EventManager.event(GameEvent.RESET_PLAYER_AVATA);
		}

		private ReqModifyUserHeadBefore(head: number, frame: boolean) {
			if (head != Game.PlayerInfoSystem.BaseInfo.picId) {
				this.ModifyRolePicReqBody(head, frame).then(() => {
					this.SetInfoUser()
				}).catch((result) => {

				})
			}
		}

		private ModifyRolePicReqBody(head: number, frame: boolean): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ModifyRolePicRequest();
				if (frame) {
					request.body.picId = Game.PlayerInfoSystem.BaseInfo.picId;
					request.body.picFrame = head;
				} else {
					request.body.picId = head;
					request.body.picFrame = Game.PlayerInfoSystem.BaseInfo.picFrameId;
				}
				request.body.titleId = Game.PlayerInfoSystem.BaseInfo.titleId;
				request.body.viceTitleId = Game.PlayerInfoSystem.BaseInfo.viceTitleId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ModifyRolePicResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve();
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}


		private ReqModifyUserNameBefore(name: string) {
			if (name == undefined) {
				return;
			} else if (name == "" || name == null || name.length > CommonConfig.limit_role_name_max * 2) {
				toast_warning(TextsConfig.TextsConfig_User.error_name);
			} else if (name == Game.PlayerInfoSystem.BaseInfo.name) {
				toast_warning(TextsConfig.TextsConfig_User.same_name);
			} else {
				this.modifyRoleNameRespBody(name).then(() => {
					if (this.cb) {
						this.cb();
					}
					this.ReqModifyUserInfo_Visit();
				}).catch((result) => {
					if (result == message.EC.XG_LACK_TOKEN) {
						TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
							loadUI(PayMallScene)
								.then((scene: PayMallScene) => {
									scene.show(UI.SHOW_FROM_TOP);
									scene.init(false);
								});
						}, () => {
						});
					}
				})
			}
		}

		private ReqModifyUserInfo_Visit() {
			this.SetInfoUser();
		}

		public modifyRoleNameRespBody(name: string): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ModifyRoleNameRequest();
				request.body.name = name;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ModifyRoleNameResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve();
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}
	}
}