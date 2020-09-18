namespace zj {
	/**
	 * @class 活动--现时兑换
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-12-18
	 */
	export class ActivityAwardItemB extends eui.ItemRenderer {
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.Label;
		private groupAni: eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityAwardItemBSkin.exml";
			cachekeys(<string[]>UIResource["ActivityAwardItemB"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			let itemSet = PlayerItemSystem.Set(this.data.info.goodsId, this.data.info.showType, this.data.info.count) as any;
			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);


			if (this.data.index == 0) {
				let item01_get = Game.PlayerItemSystem.itemCount(this.data.info.goodsId);
				let item01_getStr = "";
				let item01_num = this.data.info.count;

				if (item01_get > 100000) {
					if (((item01_get / 1000) >>> 0) % 10 == 0) {
						item01_getStr = ((item01_get / 10000) >>> 0) + "万";
					} else {
						item01_getStr = (item01_get / 10000).toFixed(1) + "万";
					}
				} else {
					item01_getStr = item01_get.toString();
				}

				this.labelNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, item01_num, item01_getStr);
				if (item01_get < item01_num) {
					this.labelNum.textColor = ConstantConfig_Common.Color.red;
				} else {
					this.labelNum.textColor = ConstantConfig_Common.Color.green;
				}
			}
			else if (this.data.index == 1) {
				this.labelNum.text = this.data.info.count;
			}

			if (this.groupAni.getChildByName("ani") != null) {
				let ani = this.groupAni.getChildByName("ani");
				this.groupAni.removeChild(ani);
			}
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAni);
		}

		//添加龙骨动画
		private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
			Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes).then(display => {
				group.addChild(display);
				display.scaleX = 0.8;
				display.scaleY = 0.8;
				display.name = "ani";
			});
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}