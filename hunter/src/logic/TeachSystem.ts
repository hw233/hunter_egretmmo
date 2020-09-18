namespace zj {
	/**
	 * 新手教学系统
	 * created by Lian Lei
	 * 2019.03.28
	 */
	export class TeachSystem {

		/**是否播放区域解锁动画 */
		public playAreaAnimate: boolean = false;

		public static nodeOrStageID: number = null;

		/**第一次进入loading界面 */
		public loadnum: number = 0;

		public openTime: number = 0;

		public curPart: number; // 事件驱动大步骤

		public battleEndOpenTeach: boolean = true; // 战斗结算后会默认打开原始界面 在打开之前新手不触发 打开之后触发

		public isEndCommonAnimation: boolean = false;
		public isShowGetVip: boolean = true;

		public init() {
			Teach.m_bOpenTeach = true; // 新手引导开启标志
			Teach.nServerPartLocal = Teach.nServerPart;
			Game.EventManager.on(GameEvent.START_NEW_TEACHING, this.teach, this);

			Game.EventManager.on(GameEvent.SHOW_SCENE, Teach.showScene, this);
			Game.EventManager.on(GameEvent.SHOW_DIALOG, Teach.showDialog, this);
			Game.EventManager.on(GameEvent.SHOW_UI, Teach.showUi, this);
			Game.EventManager.on(GameEvent.CLOSE_SCENE, Teach.closeScene, this);
			Game.EventManager.on(GameEvent.CLOSE_DIALOG, Teach.closeDialog, this);
			Game.EventManager.on(GameEvent.CLOSE_UI, Teach.closeUi, this);
			Game.EventManager.on(GameEvent.NUMBER_OF_DIALOG, Teach.dialogCount, this);
			Game.EventManager.on(GameEvent.END_OF_THE_ANIMATION, Teach.isEndAnimation, this);
			Game.EventManager.on(GameEvent.CLEAR_TIP_SPX, Teach.delTouchTipSpx, this);
			Game.EventManager.on(GameEvent.IS_END_LAST_TEACH, Teach.checkTeachId, this);
			Game.EventManager.on(GameEvent.SHOW_FIGHT_UI, Teach.showFightUi, this);
			Game.EventManager.on(GameEvent.SKILL_CD_OK, Teach.skillIsOk, this);
			Game.EventManager.on(GameEvent.GET_MOUDLE_SIZE, Teach.getMoudleSize, this);
			Game.EventManager.on(GameEvent.PLAYER_LEVEL_UP, Teach.checkTeachId, this);
		}

		private teach(ev: egret.Event) {
			if (ev.data != null) {
				if (this.curPart != ev.data.curPart) {
					Teach.teachingNow = true;
					this.curPart = ev.data.curPart;
					console.log("——————————————————新手引导执行:  " + Game.TeachSystem.curPart + "——————————————————————");
					RolePointTracker.track(30000 + (Game.TeachSystem.curPart * 10));
					// let num = (30000 + (Game.TeachSystem.curPart * 10));
					// console.log("—————————————————————— 新手引导任务开始打点" + num + "——————————————————————");
					Teach.nOperateTeachStep = 0;
					Teach.addMask();
					Teach_diff.OperateTeach(null, this.curPart, Teach.nOperateTeachStep, 0);
				} else {
					this.curPart = ev.data.curPart;
				}
			}
		}

		public uninit() {
			this.playAreaAnimate = false;
			this.openTime = 0;
			this.loadnum = 0;
			this.curPart = -1;
			Teach.teachingNow = false;
		}

		public endTeach() {
			Teach.m_bOpenTeach = false;
			if (Teach.isMask) {
				Game.UIManager.unmaskAllUIs();
				Teach.isMask = false;
			}
		}

		public getAniFocus(w: number, h: number, bHand: boolean): eui.Group {
			let node = new eui.Group();

			let node1 = Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
				.then(display => {
					display.x = -w / 2;
					display.y = -h / 2;
					display.rotation = 90;
					node.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			let node2 = Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
				.then(display => {
					display.x = w / 2;
					display.y = -h / 2;
					display.rotation = 180;
					node.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			let node3 = Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
				.then(display => {
					display.x = w / 2;
					display.y = h / 2;
					display.rotation = 270;
					node.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			let node4 = Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
				.then(display => {
					display.x = -w / 2;
					display.y = h / 2;
					display.rotation = 0;
					node.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});

			if (bHand == true) {
				let hand = Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
					.then(display => {
						display.rotation = 270;
						node.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			}
			return node;
		}

		/////////////////////////////// 发协议 ////////////////////////////////////
		public SaveTeach() {
			return new Promise((resolve, reject) => {
				let request = new message.SaveTeachInfoRequest;
				request.body.teachItems = Teach.nServerPart;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SaveTeachInfoResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve();
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		/**拉取新手引导回复 */
		public QueryTeach() {
			return new Promise((resolve, reject) => {
				let request = new message.QueryTeachInfoRequest;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.QueryTeachInfoResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response.body.teachItems);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		public ModifyRoleName_Req(edit: string) {
			return new Promise((resolve, reject) => {
				let request = new message.ModifyRoleNameRequest;
				request.body.name = edit;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ModifyRoleNameResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve();
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}
	}
}