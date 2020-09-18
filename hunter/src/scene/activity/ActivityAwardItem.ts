namespace zj {
	//
	//	yuqingchao
	// 
	export class ActivityAwardItem extends eui.ItemRenderer {
		private groupCache: eui.Group;
		private groupItem: eui.Group;
		private imgFrame: eui.Image;			//头像框
		private imgIcon: eui.Image;				//头像
		private imgLogo: eui.Image;
		private lbNumID: eui.Label;
		private lbNum: eui.Label;				//数量
		private groupClip: eui.Group;
		private info;
		private displayAnimatoin = null; // 添加龙骨动画

		private rectMask: eui.Rect;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityAwardItem"], null);
			// this.groupClip.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.data = null;
				let displayAnimatoin = this.displayAnimatoin;
				this.displayAnimatoin = null;
				if (displayAnimatoin && displayAnimatoin.parent) {
					displayAnimatoin.parent.removeChild(displayAnimatoin);
				}

			}, null);

			// 遮罩
			this.rectMask = new eui.Rect(79, 83, 0x000000);
			this.rectMask.horizontalCenter = 0;
			this.rectMask.verticalCenter = -2;
			this.groupItem.addChild(this.rectMask);
		}

		private init() {
			this.groupClip.visible = true;
			this.groupItem.visible = true;
			this.imgIcon.visible = true;
			this.imgFrame.visible = true;
			this.imgLogo.visible = true;

			this.imgLogo.visible = false;

		}

		protected dataChanged() {
			closeCache(this.groupCache);
			if (this.data == null) return;
			this.info = this.data.info;
			this.imgFrame.source = cachekey(PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count).Frame, this);
			this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.goodsId), this);
			this.lbNum.text = "x" + this.info.count;
			this.imgLogo.visible = false;
			if (this.info.goodsId == 20001) {
				this.groupClip.removeChildren();
				this.displayAnimatoin = null;
			} else {
				this.groupClip.removeChildren();
				this.displayAnimatoin = null;
				this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupClip);
			}

			// 遮罩
			this.imgIcon.mask = this.rectMask;
			this.init();
			setCache(this.groupCache);
		}

		private touchBegin(e: egret.TouchEvent) {
			if (this.data.main != null) {
				// this.onChooseItemTap(e);
			} else {
				let info = new message.GoodsInfo();
				info.goodsId = this.info.goodsId;
				info.count = this.info.count;

				Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
			}
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

		private onShowGoodProperty(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}

		// 鼠标点击 掉落 材料说明
		private onChooseItemTap(e) {
			let info = new message.GoodsInfo();
			info.goodsId = this.info.goodsId;
			info.count = this.info.count;
			this.data.main.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
		}
	}
}