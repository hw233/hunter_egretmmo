namespace zj {
	/**
	 * @class 通行证大奖一览Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-21
	 */
	export class HXH_BattlePassAllRewardItem extends eui.ItemRenderer {
		private groupCache: eui.Group;
		private imgNode: eui.Image;
		private groupItem: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelCount: eui.BitmapLabel;
		private groupAni: eui.Group;

		private imgMask: eui.Image;
		private rectMask: eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassAllRewardItemSkin.exml";

			cachekeys(<string[]>UIResource["HXH_BattlePassAllRewardItem"], null);

			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

			// 碎片遮罩
			this.imgMask = new eui.Image;
			this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
			this.imgMask.horizontalCenter = 0;
			this.imgMask.verticalCenter = 0;
			this.imgMask.scaleX = 0.9;
			this.imgMask.scaleY = 0.9;
			this.groupItem.addChild(this.imgMask);
			this.imgMask.visible = false;

			// 遮罩
			this.rectMask = Util.getMaskImgBlack(75, 78);
			this.rectMask.horizontalCenter = 0;
			this.rectMask.verticalCenter = 0;
			this.groupItem.addChild(this.rectMask);
			this.rectMask.visible = false;
		}

		protected dataChanged() {
			this.updateView(this.data.goodsId, this.data.count);
		}

		private updateView(goodsId: number, count: number) {
			if (goodsId == 0) {
				this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
				this.imgIcon.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
				this.labelCount.text = "";
			}
			else {
				let itemSet = PlayerItemSystem.Set(goodsId, null, count) as any;
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.labelCount.text = count.toString();
			}

			// 遮罩
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.rectMask.verticalCenter = 0;

			this.imgIcon.mask = null;
			this.imgIcon.scaleX = 0.9;
			this.imgIcon.scaleY = 0.9;


			if (PlayerItemSystem.IsImgMask(goodsId)) {
				this.imgMask.visible = true;
				this.imgIcon.mask = this.imgMask;
			} else if (PlayerItemSystem.IsRectMask(goodsId)) {
				this.rectMask.visible = true;
				this.rectMask.verticalCenter = -1;
				this.rectMask.scaleX = 0.85;
				this.rectMask.scaleY = 0.83;

				this.imgIcon.scaleX = 0.75;
				this.imgIcon.scaleY = 0.75;
				this.imgIcon.mask = this.rectMask;
			} else {
				this.rectMask.visible = true;
				this.rectMask.scaleX = 1;
				this.rectMask.scaleY = 1;
				this.imgIcon.mask = this.rectMask;
			}
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.data.goodsId;
			goodsInfo.count = this.data.count;
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}