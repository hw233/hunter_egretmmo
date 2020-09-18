namespace zj {
	// 主城banner界面
	// 翟伟利
	// 2019.12.17

	export class MainCityBanner extends UI {
		private bannerW = 200;
		private bannerAniTime: number = 5;// banner自动切换时间
		private group: eui.Group;
		private imgMask: eui.Image;
		private banners: eui.Image[];
		private dotgs: eui.Group[];
		private dots: eui.Image[];
		private currIdx: number;// 位置索引，不是类型索引
		private groupWidth: number;
		private types: number[];
		private posXList: number[];
		public isTouchDown: boolean;
		private isTouchMove: boolean;
		private touchX: number;
		private downX: number;
		private isRightMove: boolean;
		private autoTime: number;
		public constructor() {
			super();
			this.skinName = "resource/skins/main/MainCityBannerSkin.exml";
			cachekeys(UIResource["MainCityBanner"], this);
		}
		public init() {
			this.mask = this.imgMask;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEnded, this);
			this.banners = [];
			this.dots = [];
			this.dotgs = [];
			this.types = [];
			this.posXList = [];
			this.currIdx = 0;
			let idx = 0;
			while (this["banner" + idx]) {
				this.banners[idx] = this["banner" + idx];
				this.banners[idx].name = idx + "";
				this.posXList[idx] = -idx * this.bannerW;
				this.dots[idx] = this["dot" + idx];
				this.dotgs[idx] = this["dotg" + idx];
				if (idx > 0) {
					this.setVisible(idx, false);
				}
				++idx;
			}
			this.autoTime = this.bannerAniTime;
			this.isRightMove = true;
		}

		private checkRandomMove() {
			if (this.types && this.types.length > 1) {
				if (this.isRightMove) {
					if (this.currIdx >= this.types.length - 1) {
						this.isRightMove = false;
					}
				} else {
					if (this.currIdx <= 0) {
						this.isRightMove = true;
					}
				}
				this.setMoveAni(this.isRightMove ? this.currIdx + 1 : this.currIdx - 1);
			}
		}

		public Update(dt) {
			if (!this.isTouchDown) {
				this.autoTime -= dt;
				if (this.autoTime <= 0) {
					this.autoTime = this.bannerAniTime;
					this.checkRandomMove();
				}
			}
		}

		public updateUIStates() {
			this.updateJNH();
			this.updateXinChang();
			this.updateUp();
			this.resetInfo();
		}

		private resetInfo() {
			this.groupWidth = 0;
			this.types.length = 0;
			for (let i = 0; i < this.banners.length; ++i) {
				if (this.banners[i].visible) {
					this.groupWidth += this.bannerW;
					this.types.push(i);
				}
			}
			if (this.currIdx >= this.types.length) {
				this.group.x = 0;
				this.currIdx = 0;
				this.setDot(this.currIdx);
			}
		}

		private setDot(idx: number) {
			for (let i = 0; i < this.types.length; ++i) {
				this.dots[this.types[i]].source = cachekey(i == idx ? "ui_line_dot_1_t_png" : "ui_line_dot_2_t_png", this);
			}
		}

		private updateJNH() {// 嘉年华
			//新手狂欢
			let bReward = !Device.isReviewSwitch && Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, TableEnum.Enum.TableNoviceMissionType[TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE - 1]) != -1;
			let bNovice = !bReward
				&& (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0
					|| Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0);
			this.setVisible(1, bNovice);
		}

		private updateXinChang() {// 信长
			let visible = false;
			let xinchanginfo = <message.GiftInfo>Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v: message.GiftInfo) => {
				return v.gift_index == 101507;
			})[0];
			if (xinchanginfo) {
				if (Game.PlayerInfoSystem.BaseInfo.level >= 15 && xinchanginfo.buy_times == 0) {
					visible = true;
				}
			}
			this.setVisible(2, visible);
		}

		private updateUp() {// up
			let vis = false;
			let RumInfo = Table.FindR(Game.PlayerActivitySystem.Activities, (k, v: message.ActivityInfo) => {
				return v.type == 23;
			})[0];
			if (RumInfo && RumInfo.closeTime - Game.Controller.curServerTime > 0) {
				vis = true;
			}
			this.setVisible(3, vis);
		}

		private setVisible(type: number, visible: boolean) {
			this.banners[type].visible = this.dotgs[type].visible = visible;
			if (visible) {
				this.banners[type].scaleX = this.dotgs[type].scaleX = 1;
			} else {
				this.banners[type].scaleX = this.dotgs[type].scaleX = 0;
			}
		}

		private setMoveGroup(offx: number) {
			this.group.x += offx;
			this.group.x = this.group.x > 0 ? 0 : this.group.x;
			this.group.x = Math.max(this.group.x, -(this.groupWidth - this.bannerW));
		}

		private setMoveGroupOver(offX: number) {
			if (Math.abs(offX) < 30) {
				if (this.types.length > 1) {
					let idx = 0;
					for (let i = 1; i < this.types.length; ++i) {
						if (Math.abs(this.posXList[i] - this.group.x) < Math.abs(this.posXList[idx] - this.group.x)) {
							idx = i;
						}
					}
					this.setMoveAni(idx);
				}
			} else {
				let idx = Math.floor(Math.abs(this.group.x / this.bannerW));
				if (offX < 0) {
					idx += 1;
				}
				idx = Math.min(idx, this.types.length - 1);
				this.setMoveAni(idx);
			}
		}

		private setMoveAni(idx: number) {
			this.currIdx = idx;
			if (this.posXList[idx] - this.group.x != 0) {
				egret.Tween.get(this.group)
					.to({ x: this.posXList[idx] }, 400)
					.call(() => {
						egret.Tween.removeTweens(this.group);
						this.setDot(this.currIdx);
					});
			} else {
				this.setDot(this.currIdx);
			}
		}

		private onJump(type: number) {
			switch (type) {
				case 0:// 商城
					loadUI(PayMallScene)
						.then((scene: PayMallScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init(true);
						});
					break;
				case 1:// 嘉年华
					MainCitySceneNew.onBtnNovice1();
					break;
				case 2:// 信长
					loadUI(Activity_HunterGift)
						.then((dialog: Activity_HunterGift) => {
							dialog.show(UI.SHOW_FROM_TOP);
						})
					break;
				case 3:// 酒馆
					loadUI(TavernScene)
						.then((scene: TavernScene) => {
							scene.show(UI.SHOW_FILL_OUT);
							scene.nPCDialog();
						});
					break;
			}
		}

		private OnTouchBegan(touchs: egret.TouchEvent) {
			this.setDot(this.currIdx);
			this.autoTime = this.bannerAniTime;
			this.isTouchDown = true;
			this.isTouchMove = false;
			this.touchX = touchs.stageX;
			this.downX = touchs.stageX;
		}
		public OnTouchMoved(touchs: egret.TouchEvent) {
			if (this.isTouchDown) {
				if (this.isTouchMove) {
					this.setMoveGroup(touchs.stageX - this.touchX);
					this.touchX = touchs.stageX;
				} else if (Math.abs(touchs.stageX - this.touchX) > 20) {
					this.isTouchMove = true;
					this.touchX = touchs.stageX;
				}
			}
		}
		private OnTouchTap(touchs: egret.TouchEvent) {
			if (!this.isTouchMove) {
				this.onJump(Number(touchs.target.name));
			}
		}

		public setTouchEnded(touchs: egret.TouchEvent) {
			if (this.isTouchDown) {
				this.isTouchDown = false;
				this.setMoveGroupOver(touchs.stageX - this.downX);
			}
		}
	}
}