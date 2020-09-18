namespace zj {
	/**
	 * @class 猎人传记奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-10-24
	 */
	export class BiographyAwardItem extends eui.ItemRenderer {
		public imgFrame: eui.Image;
		public imgIcon: eui.Image;
		public labelNum: eui.BitmapLabel;
		public groupAni: eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/skins/biography/BiographyAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["BiographyAwardItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: BiographyAwardItemData) {
			let itemSet = PlayerItemSystem.Set(data.goodsInfo.goodsId, null, data.goodsInfo.count) as any;
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.labelNum.text = data.goodsInfo.count.toString();

			if (data.goodsInfo.goodsId != 20001) {
				if (!this.groupAni.getChildByName("ani")) {
					this.addAnimation();
				}
			}
			else {
				let ani = this.groupAni.getChildByName("ani");
				if (ani) this.groupAni.removeChild(ani);
			}
		}

		private addAnimation() {
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", null, "001_daojuguang_02", 0).then(display => {
				display.name = "ani";
				display.scaleX = 0.8;
				display.scaleY = 0.8;
				this.groupAni.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}

	export class BiographyAwardItemData {
		goodsInfo: message.GoodsInfo;
	}
}