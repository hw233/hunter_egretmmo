namespace zj {
	/**
	 * @class 通行证解锁X级大奖UI(已升级通行证)
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-22
	 */
	export class HXH_BattlePassGetReward extends Dialog {
		private groupTouch: eui.Group;
		private labelLevel: eui.BitmapLabel;
		private groupCache: eui.Group;
		private imgNode: eui.Image;
		private groupItem: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelCount: eui.BitmapLabel;
		private labelName: eui.Label;
		private btnToGet: eui.Button;

		private goodId: number;
		private count: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassGetRewardSkin.exml";
			this.groupCache.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			this.btnToGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		}

		public setInfo(level: number) {
			let rewardList: Array<TablePermitReward> = [];
			let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
			let tblInfo = TablePermitReward.Table();
			for (const key in tblInfo) {
				if (tblInfo.hasOwnProperty(key)) {
					const element = tblInfo[key];
					if (element.season == season) rewardList.push(element);
				}
			}

			rewardList.sort((a, b) => { return a.level - b.level; });
			this.goodId = rewardList[level - 1].pay_reward[0];
			this.count = rewardList[level - 1].pay_reward[1];

			let itemSet = PlayerItemSystem.Set(this.goodId) as any;
			this.labelLevel.text = level.toString();
			this.labelName.text = itemSet.Info.name;

			if (this.goodId == 0) {
				this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
				this.imgIcon.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
				this.labelCount.text = "";
			}
			else {
				this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.goodId), this);
				this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.goodId), this);
				this.labelCount.text = this.count.toString();
			}
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.goodId;
			goodsInfo.count = this.count;

			let show = TipManager.ShowProp(goodsInfo, this, e.localY * 0.75, e.stageX, e.stageY);
			show.name = "goods";
			this.addChild(show);
		}

		private removeShow() {
			let show = this.getChildByName("goods");
			if (show) this.removeChild(show);
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}	