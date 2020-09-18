namespace zj {
	//ActivityAwardItem1
	//yuqingchao
	export class ActivityAwardItem1 extends eui.ItemRenderer {
		private groupCache: eui.Group;
		private imgFrame: eui.Image;			//头像框
		private imgIcon: eui.Image;				//头像
		private imgLogo: eui.Image;
		private lbNumID: eui.Label;
		private lbNum: eui.Label;				//数量
		private groupClip: eui.Group;
		private info;
		private i: number;
		private j: number;
		private displayAnimatoin = null; // 添加龙骨动画
		private main: null;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityAwardItem1"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTap, this);

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.main = null;
				let displayAnimatoin = this.displayAnimatoin;
				this.displayAnimatoin = null;
				if (displayAnimatoin && displayAnimatoin.parent) {
					displayAnimatoin.parent.removeChild(displayAnimatoin);
				}
			}, null);
		}
		private init() {
			this.imgFrame.visible = true;
			this.imgIcon.visible = true;
		}
		protected dataChanged() {
			closeCache(this.groupCache);
			this.init();
			if (this.data == null) return;
			this.info = this.data.info;
			this.i = this.data.i;
			this.j = this.data.j;
			this.main = this.data.main;

			this.imgFrame.source = cachekey(PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count).Frame, this);
			this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.goodsId), this);
			if (Number(this.info.count) >= 10000) {
				this.lbNum.text = "x" + (Number(this.info.count) / 10000) + "万";
			} else {
				this.lbNum.text = "x" + this.info.count;
			}
			this.imgLogo.visible = false;
			if (this.info.goodsId == 20001) {
				this.groupClip.removeChildren();
				this.displayAnimatoin = null;
			} else {
				this.groupClip.removeChildren();
				this.displayAnimatoin = null;
				this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupClip);
			}
			setCache(this.groupCache);
		}
		//添加龙骨动画
		private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
			Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
				.then(display => {
					display.x = group.explicitWidth / 2 + 1;
					display.y = group.explicitHeight / 2;
					group.addChild(display);
					display.scaleX = 0.8;
					display.scaleY = 0.8;
					this.displayAnimatoin = display;
				})
				.catch(reason => {
					toast(reason);
				});
		}
		private touchTap(e: egret.TouchEvent) {
			if (this.info.goodsId == 195001 || this.info.goodsId == 195002) {
				loadUI(ActivityPotato)
					.then((dialog: ActivityPotato) => {
						dialog.init(this.info.goodsId, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
			}
			else {
				this.onChooseItemTap(e);
			}

		}
		// 鼠标点击 掉落 材料说明
		private onChooseItemTap(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}