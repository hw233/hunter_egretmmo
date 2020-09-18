namespace zj {
	//VIP礼包
	//yuqingchao
	//2019.04.12
	export class VipLowGift extends Scene {
		private index: number = 0;
		private btnClose: eui.Button;
		private btnGo: eui.Button;
		private lstView: eui.List;
		private imgVipLevel: eui.Image;
		private arrayCollection: eui.ArrayCollection;
		private groupAni: eui.Group;
		private scrollerInfo: eui.Scroller;
		public moveLocation: number = 0;		//列表下拉移动位置
		private groupImg: eui.Group;			//图片
		private imgBackground: eui.Image;		//背景图
		public constructor() {
			super();
			this.skinName = "resource/skins/vip/VipLowGiftSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
			// this.init();
		}
		public init(vipID?: number) {
			this.index = 0;
			if (vipID != null) {
				this.moveLocation = vipID;
			}
			Game.DragonBonesManager.playAnimation(this, "stars", "armatureName", null, 0)
				.then(display => {
					display.x = this.groupAni.width / 2;
					display.y = this.groupAni.height;
					display.scaleX = 1.1;
					display.scaleY = 1.1;
					this.groupAni.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			Game.DragonBonesManager.playAnimation(this, "viprole", "armatureName", null, 0)
				.then(display => {
					display.x = this.groupAni.width / 2;
					display.y = this.groupAni.height;
					display.scaleX = 1.1;
					display.scaleY = 1.1;
					this.groupAni.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});
			// this.imgBackground.cacheAsBitmap = true;
			this.setLevelGiftInfo();
		}
		public load(i) {
			this.index = i + 1;
			this.setLevelGiftInfo();
		}
		private setLevelGiftInfo() {
			closeCache(this.groupImg);
			let giftTbl = Game.ConfigManager.getTable(StringConfig_Table.LowVipWeal + ".json");			//读表
			this.arrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < Object.keys(giftTbl).length; i++) {
				this.arrayCollection.addItem({
					i,
					info: giftTbl[i],
					father: this,
				});
			};
			this.lstView.dataProvider = this.arrayCollection;
			this.lstView.itemRenderer = VipLowGiftItem;

			setTimeout(() => {
				this.scrollerInfo.viewport = this.lstView;
				this.scrollerInfo.viewport.scrollV = this.moveLocation;
				this.scrollerInfo.validateNow();
			}, 200);
			this.imgVipLevel.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[Game.PlayerInfoSystem.VipLevel], this);

			setCache(this.groupImg);
		}
		private onBtnGo() {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			loadUI(VipLow)
				.then((dialog: VipLow) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.CB(() => {
						Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
					})
					dialog.init();
				});
		}
		/**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
		public up() {
			let show = this.getChildByName("UI");
			if (show) {
				this.removeChild(show);
			}
		}

		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			let show = this.getChildByName("UI");
			if (show) {
				return;
			}
			let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
			this.addChild(commonDesSkill);
			commonDesSkill.name = "UI";
		}
		//点击移除
		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

		private showGoodsProperty(ev: egret.Event) {
			if (Game.UIManager.dialogCount() > 1) return;

			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
		public onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}