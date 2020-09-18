namespace zj {
	enum INDEX {
		/**日常 */
		LIVE = 0,
		/**成就 */
		Main = 1,
		/**主线 */
		Task = 2,
	}

	/**
	 * 日常主界面
	 * created by Lian lei
	 * 2019.03.12
	 */
	export class Daily_Main extends Dialog {
		private groupAddDialog: eui.Group;
		private btnTagAchieve: eui.Image; // 2
		private btnTagLive: eui.Image; // 1
		private btnTagTask: eui.Image; // 3
		private btnClose: eui.Button;

		private imgAchieve: eui.Image;
		private imgNode1: eui.Image;
		private imgNode3: eui.Image;
		private imgNode2: eui.Image;
		private imgDaily: eui.Image;
		private groupAdd: eui.Group;

		// 日常
		private labelCount: eui.Label;
		private groupLive: eui.Group;
		private groupTop: eui.Group;
		private labelTag1: eui.Label;
		private labelTag2: eui.Label;
		private labelTag3: eui.Label;
		private labelTag4: eui.Label;
		private labelTag5: eui.Label;

		private groupLight1: eui.Group;
		private groupLight2: eui.Group;
		private groupLight3: eui.Group;
		private groupLight4: eui.Group;
		private groupLight5: eui.Group;

		private imgBag1: eui.Image;
		private imgBag2: eui.Image;
		private imgBag3: eui.Image;
		private imgBag4: eui.Image;
		private imgBag5: eui.Image;
		private imgGet1: eui.Image;
		private imgGet2: eui.Image;
		private imgGet3: eui.Image;
		private imgGet4: eui.Image;
		private imgGet5: eui.Image;
		private btnGet1: eui.Group;
		private btnGet2: eui.Group;
		private btnGet3: eui.Group;
		private btnGet4: eui.Group;
		private btnGet5: eui.Group;

		private scrollerViewLive: eui.Scroller;
		private groupViewGirl: eui.Group;
		private listViewLive: eui.List;
		private groupBottom: eui.Group;
		private imgBarMask: eui.Image;

		private imgDone: eui.Image;
		private imgBar: eui.Image;

		// 
		private groupTask: eui.Group;
		private scrollerViewTask: eui.Scroller;
		private listViewTask: eui.List;

		// 成就
		private groupAchieve: eui.Group;
		private scrollerViewAchieve: eui.Scroller;
		private listViewAchieve: eui.List;


		private buttons: Array<eui.Image> = [];
		private imgTipsArr: Array<eui.Image> = [];
		// private timer: egret.Timer = new egret.Timer(1000, 0);
		private missionType: number = null;
		private saveWeek: number = null; // 服务器星期几
		private ACTIVE_COUNT: number = 5; // 活跃度(5段)
		private _JumpByInstance: boolean;
		private mission: Array<number> = [];

		/////////////////////Live///////////////////////
		private indexSend: number;
		private listViewLiveData: eui.ArrayCollection = new eui.ArrayCollection();

		////////////////////Task ///////////////////////



		///////////////////Achieve//////////////////////
		private listViewAchieveData: eui.ArrayCollection = new eui.ArrayCollection();

		private timer: number;

		private groupCache1: eui.Group;
		private groupCache2: eui.Group;
		private imageBackground: eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Daily_MainSkin.exml";
			/////////////////////////common////////////////////////////
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnTagLive.name = "" + INDEX.LIVE;
			this.btnTagTask.name = "" + INDEX.Task;
			this.btnTagAchieve.name = "" + INDEX.Main;
			this.btnTagLive.touchEnabled = this.btnTagTask.touchEnabled = this.btnTagAchieve.touchEnabled = true;
			this.btnTagLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRadio, this);
			this.btnTagTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRadio, this);
			this.btnTagAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRadio, this);
			// this.btnTagLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagLive, this);
			// this.btnTagTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagTask, this);
			// this.btnTagAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagAchieve, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
			this.timer = egret.setInterval(this.update, this, 1000);

			//////////////////////////Daily_Live//////////////////////////
			this.groupLight1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
			this.groupLight2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
			this.groupLight3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
			this.groupLight4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet4, this);
			this.groupLight5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet5, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.timer);
			}, this);

			this.init();
			// this._JumpByInstance = this.isInstanceMain();

			// this.groupCache1.cacheAsBitmap = true;
			// this.groupCache2.cacheAsBitmap = true;
		}

		public hideBackGround() {
			this.imageBackground.visible = false;
		}

		public isFullScreen() {
			return this.imageBackground.visible;
		}

		public isInstanceMain(isInstanceMain?: boolean): boolean {
			if (isInstanceMain == null) {
				this._JumpByInstance = isInstanceMain;
				return false;
			}
			this._JumpByInstance = isInstanceMain;
			return isInstanceMain;
		}

		private init() {
			this.buttons.push(this.btnTagLive, this.btnTagAchieve, this.btnTagTask);
			this.imgTipsArr.push(this.imgNode1, this.imgNode2, this.imgNode3);

			this.setInfoType(INDEX.LIVE);
			// this.setSelectType();
			if (true) {
				this.btnTagTask.visible = false;
				this.imgNode2.visible = false;
			}

			if (this.missionType == INDEX.LIVE) {
				this.mission = [];

				let tbl: { [key: string]: TableMissionActive } = TableMissionActive.Table();

				for (let i = 1; i <= this.ACTIVE_COUNT; i++) {
					(<eui.Label>this[`labelTag${i}`]).text = tbl[i].score.toString();
					(<eui.Image>this[`imgBag${i}`]).source = cachekey(tbl[i].path, this);
					(<eui.Image>this[`imgGet${i}`]).visible = false;
				}
				this.imgDone.visible = false;
			}
			else if (this.missionType == INDEX.Main) {
				this.mission = [];
			}
			else if (this.missionType == INDEX.Task) {

			}

			this.update();
		}

		////////////////////////////////Daily_Main///////////////////////////////////////////

		private initUI(index: number) {
			if (index == INDEX.LIVE) {
				this.groupLive.visible = true;
				this.groupTask.visible = false;
				this.groupAchieve.visible = false;
			} else if (index == INDEX.Main) {
				this.groupLive.visible = false;
				this.groupTask.visible = false;
				this.groupAchieve.visible = true;
			} else if (index == INDEX.Task) {
				this.groupTask.visible = true;
				this.groupLive.visible = false;
				this.groupAchieve.visible = false;
			}
		}

		private update() {
			this.setInfoTips();
			this.setInfoUpdate();
		}

		private setInfoTips() {
			let bTips11 = Tips.GetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_GIFT);
			let bTips12 = Tips.GetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_ACTIVE);
			this.imgNode1.visible = bTips11 || bTips12;

			let bTips2 = Tips.GetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_ACHIEVE);

			let bTips3 = Tips.GetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_ACHIEVE);
			this.imgNode3.visible = bTips3;
		}

		private setInfoUpdate() {
			if (this.saveWeek == null && this.saveWeek != Game.PlayerMissionSystem.curServerWeek) {
				Game.PlayerMissionSystem.ReqMission()
					.then((value: {}) => {
						this.setInfo();
					})
					.catch((reason) => {
						toast_warning(Helper.GetErrorString(reason));
					});
			}
			this.saveWeek = Game.PlayerMissionSystem.curServerWeek;
		}

		private setInfoType(index: number) {
			this.missionType = index;
			this.setSelectType();
			this.setSelectInfo();

			// Teach.addTeaching();
		}

		private setSelectType() {
			for (let i = 0; i < this.buttons.length; i++) {
				let btn: eui.Image = this.buttons[i];
				btn.source = i == this.missionType ? "ui_license_ButtonHunterStarOpneSel_png" : "ui_license_ButtonHunterStarOpneNor_png";
			}
			// for (let i = 0; i < this.buttons.length; i++) {
			// 	let btn: eui.Button = this.buttons[i];
			// 	btn.enabled = (i != this.missionType);
			// }
			// for (let i = 0; i < this.buttons.length; i++) {
			// 	this.buttons[i].selected = i == this.missionType;
			// }
		}

		private setSelectInfo() {
			this.initUI(this.missionType);
			// v.setSelect(i == this.missionType);
			// this.setSelect(this.missionType);
		}

		////////////////////////Daily_Live  Daily_Task  Daily_Achieve//////////////////////////

		private setInfo() {
			if (this.missionType == INDEX.LIVE) {
				this.setInfoActive();
				this.setInfoMission();
				this.setInfoComplete();
				this.groupViewGirl.visible = true;
			}
			else if (this.missionType == INDEX.Main) {
				this.setInfoMission();
				this.groupViewGirl.visible = false;
			}
			else if (this.missionType == INDEX.Task) {

			}
		}

		private setInfoActive() {
			let score: number = Game.PlayerMissionSystem.missionActive.activeScore;
			let index: Array<number> = Game.PlayerMissionSystem.missionActive.activeIndex;
			let tbl: { [key: string]: TableMissionActive } = TableMissionActive.Table();

			let count: number = Table.tableLength(tbl);
			let max: number = tbl[count].score;
			let percent: number = yuan3(score > max, 1, score / max);

			this.labelCount.text = TextsConfig.TextsConfig_Daily.has + score + "/" + max;
			if (611 * score / max < 611) {
				this.imgBar.width = 611 * score / max;
			}
			else {
				this.imgBar.width = 611;
			}

			for (let i = 0; i < index.length; i++) {
				let v = index[i];
				(<eui.Image>this[`imgGet${v}`]).visible = true;
			}

			for (let i = 0; i < this.ACTIVE_COUNT; i++) {
				let v = i + 1;
				if (percent * count >= v) {
					if (!(<eui.Image>this[`imgGet${v}`]).visible && (<eui.Group>this[`groupLight${v}`]).numChildren == 0) {
						Game.DragonBonesManager.playAnimation(this, "ui_tongyong_lingqu", "armatureName", null, 0)
							.then(display => {
								display.x = (<eui.Group>this[`groupLight${v}`]).explicitWidth / 2 + 5;
								display.y = (<eui.Group>this[`groupLight${v}`]).explicitHeight / 2 + 20;
								(<eui.Group>this[`groupLight${v}`]).addChild(display);
								display.scaleX = 1;
								display.scaleY = 1;
							})
							.catch(reason => {
								toast(reason);
							});
					}
					else if ((<eui.Image>this[`imgGet${v}`]).visible && (<eui.Group>this[`groupLight${v}`]).numChildren > 0) {
						(<eui.Group>this[`groupLight${v}`]).visible = false;
					}
				}
			}
		}

		private setInfoMission(index?: number) {
			if (index != null) {
				this.missionType = index;
			}
			if (this.missionType == INDEX.LIVE) {
				this.mission = Game.PlayerMissionSystem.listForLive();
				this.listViewLiveData.removeAll();
				for (let i = 0; i < this.mission.length; i++) {
					let itemData = new Daily_LiveItemData();
					itemData.index = this.mission[i];
					itemData.missionType = this.missionType;
					itemData._JumpByInstance = this._JumpByInstance;
					itemData.father = this;
					this.listViewLiveData.addItem(itemData);
				}
				this.listViewLive.dataProvider = this.listViewLiveData;
				this.listViewLive.itemRenderer = Daily_LiveItem;
			}
			else if (this.missionType == INDEX.Main) {
				this.mission = Game.PlayerMissionSystem.listForAchieve();
				this.listViewAchieveData.removeAll();
				for (let i = 0; i < this.mission.length; i++) {
					let itemData = new Daily_AchieveItemData();
					itemData.indexId = Number(this.mission[i]);
					itemData.father = this;
					this.listViewAchieveData.addItem(itemData);
				}
				this.listViewAchieve.dataProvider = this.listViewAchieveData;
				this.listViewAchieve.itemRenderer = Daily_AchieveItem;
			}
			else if (this.missionType == INDEX.Task) {

			}
		}

		/**活跃度满后播放龙骨 */
		private setInfoComplete() {
			let ani = this.groupViewGirl.getChildByName("npc_bisiji");
			if (Game.PlayerMissionSystem.tableLength(this.mission) == 0) {
				Game.DragonBonesManager.playAnimation(this, "npc_bisiji", "armatureName", null, 0)
					.then(display => {
						// display.x = this.groupViewGirl.x;
						// display.y = this.groupViewGirl.y + this.groupViewGirl.height;
						display.x = 0;
						display.y = this.groupViewGirl.explicitHeight;
						display.name = "npc_bisiji";
						if (ani == null) {
							this.groupViewGirl.addChild(display);
						}
						display.scaleX = 0.7;
						display.scaleY = 0.7;
						display.touchEnabled = false;
					})
					.catch(reason => {
						toast(reason);
					});
				this.imgDone.visible = true;
			}
		}

		private onBtnGet1() {
			this.onBtnGet(1);
		}

		private onBtnGet2() {
			this.onBtnGet(2);
		}

		private onBtnGet3() {
			this.onBtnGet(3);
		}

		private onBtnGet4() {
			this.onBtnGet(4);
		}

		private onBtnGet5() {
			this.onBtnGet(5);
		}

		private onBtnGet(index: number) {
			let score: number = Game.PlayerMissionSystem.missionActive.activeScore;
			let tbl: { [key: string]: TableMissionActive } = TableMissionActive.Table();
			let newThis = this;
			let bGet: boolean = Table.FindF(Game.PlayerMissionSystem.missionActive.activeIndex, function (key, val) {
				return val == index;
			});
			if (score < tbl[index].score || (score >= tbl[index].score && bGet)) {
				loadUI(Daily_AwardPop)
					.then((dialog: Daily_AwardPop) => {
						dialog.setInfoActive(index)
						dialog.show(UI.SHOW_FROM_TOP);
					});
			}
			else if (score >= tbl[index].score && !bGet) {
				this.indexSend = index;
				Game.PlayerMissionSystem.ReqActive(index)
					.then((value: message.MissionActiveResponse) => {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(value.body.gameInfo.getGoods);
								dialog.setCB(() => {
									newThis.setInfoActive();
								});
								dialog.show(UI.SHOW_FROM_TOP);
							});
					})
					.catch((reason) => {
						toast_warning(Helper.GetErrorString(reason));
					});
			}
		}

		/**第二天刷新 */
		private ReqNextDay() {
			Game.PlayerMissionSystem.ReqMission()
				.then((value: {}) => {
					this.setInfo();
				})
				.catch((reason) => {
					toast_warning(Helper.GetErrorString(reason));
				});
		}






		/////////////////////////////////Common////////////////////////////////////////
		private onBtnRadio(e: egret.TouchEvent) {
			let type = parseInt(e.currentTarget.name);
			this.setInfoType(type);
			this.setInfo();
		}
		// private onBtnTagLive() {
		// 	this.setInfoType(INDEX.LIVE);
		// 	this.setInfo();
		// }

		// private onBtnTagAchieve() {
		// 	this.setInfoType(INDEX.Main);
		// 	this.setInfo();
		// }

		// private onBtnTagTask() {
		// 	this.setInfoType(INDEX.Task);
		// 	this.setInfo();
		// }

		private onBtnClose() {
			this.close(UI.HIDE_TRAIL_OFF);
			if (egret.getQualifiedClassName(Game.UIManager.topScene()) == "zj.HXH_BattlePass") Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_MISSION);
		}

		private onRemoveDialog() {
			let dialog = this.groupAddDialog.getChildByName("award") as Daily_AwardItem;
			if (dialog) this.groupAddDialog.removeChild(dialog);
		}

	}
}