namespace zj {
	/**
	 * @class 累计在线赢大奖Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-10-29
	 */
	export class Activity_OnlineGetAwardsItem extends eui.ItemRenderer {
		private groupAll: eui.Group;
		private groupTouch: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.BitmapLabel;
		private imgCanGetAward: eui.Image;
		private imgGetAwardEnd: eui.Image;
		private imgBalck: eui.Image;

		private lastPercent: number = -1;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_OnlineGetAwardsItemSkin.exml";
			cachekeys(<string[]>UIResource["Activity_OnlineGetAwardsItem"], null);
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Activity_OnlineGetAwardsItemData) {
			if (data.goodsInfo.goods_id == null || data.goodsInfo.goods_id == 0) return;
			let itemSet = PlayerItemSystem.Set(data.goodsInfo.goods_id, null, data.goodsInfo.count) as any;
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.labelNum.text = "x" + data.goodsInfo.count;
			this.imgCanGetAward.visible = false;
			this.imgGetAwardEnd.visible = false;
			if (data.goodsInfo.countTime <= 0) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(data.index) == -1) {
					this.imgCanGetAward.visible = true;
					this.imgGetAwardEnd.visible = false;
				}
				else {
					this.imgCanGetAward.visible = false;
					this.imgGetAwardEnd.visible = true;
					Helper.SetImageFilterColor(this.imgFrame, "gray");
					Helper.SetImageFilterColor(this.imgIcon, "gray");
				}
			}

			if (data.isShowTime) {
				this.imgBalck.visible = true;
				if (data.goodsInfo.countTime >= 0) {
					this.addArcMask(this.imgBalck, this.imgBalck.width / 2, (TableOnlineReward.Item(data.index).online_time - data.goodsInfo.countTime) / TableOnlineReward.Item(data.index).online_time);
				}
				else {
					this.imgBalck.mask = null;
				}
			} else {
				this.imgBalck.visible = false;
			}
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.data.goodsInfo.goods_id;
			goodsInfo.count = this.data.goodsInfo.count;
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}

		/**设置图片扇形遮罩(环形,圆形进度条)
         * img: 目标图片
         * radius: 半径
         * percent: 进度(0-1)
         * startAngle: 起始位置, 默认为12点方向
         */
		private addArcMask(img: eui.Image, radius: number, percent: number, startAngle: number = -Math.PI / 2) {
			let temp = percent;
			if (percent >= 1) {
				percent = 1;
				temp = 0;
			}
			else if (percent <= 0) {
				percent = 0;
				temp = 1;
			}
			if (this.lastPercent == temp) return;
			this.lastPercent = temp;

			if (temp > 1) temp = 1
			let endAngle = Math.PI * 2 * temp + startAngle;
			let shp: egret.Shape = null;
			if (img.mask != null) {
				shp = <egret.Shape>img.mask;
				shp.graphics.clear();
			}
			else {
				shp = new egret.Shape();
				shp.x = img.x + img.width / 2;
				shp.y = img.y + img.height / 2;
				img.parent.addChild(shp);
				shp.touchEnabled = false;
				img.mask = shp;
			}
			shp.graphics.beginFill(0xff00ff);
			shp.graphics.moveTo(0, 0);
			shp.graphics.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
			shp.graphics.drawArc(0, 0, 110, startAngle, endAngle, true);
			shp.graphics.lineTo(0, 0);
			shp.graphics.endFill();
		}
	}

	export class Activity_OnlineGetAwardsItemData {
		goodsInfo: { goods_id: number, count: number, countTime: number }; // 物品id count 倒计时时长
		isShowTime: boolean; // 是否显示倒计时
		index: number; // 从1开始
	}
}