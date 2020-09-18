namespace zj {
	/**
	 * @class 通行证解锁X级大奖UI(未升级通行证)
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-22
	 */
	export class HXH_BattlePassGetGood extends Dialog {
		private groupTouch: eui.Group;
		private labelDetail: eui.Label;
		private groupCache: eui.Group;
		private imgNode: eui.Image;
		private groupItem: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelCount: eui.BitmapLabel;
		private scrollerItem: eui.Scroller;
		private listItem: eui.List;
		private btnLvUp: eui.Button;

		private listItemData: eui.ArrayCollection = new eui.ArrayCollection();
		private goodId: number;
		private count: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassGetGoodSkin.exml";
			this.btnLvUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLvUp, this);
			this.groupCache.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
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

			let list: Array<TablePermitReward> = [];
			for (const key in rewardList) {
				if (rewardList.hasOwnProperty(key)) {
					const element = rewardList[key];
					if (element.level <= level) list.push(element);
				}
			}
			list.sort((a, b) => { return a.level - b.level; });

			this.listItemData.removeAll();
			for (let i = 0; i < list.length; i++) {
				this.listItemData.addItem({ goodsId: list[i].pay_reward[0], count: list[i].pay_reward[1] });
			}
			this.listItem.dataProvider = this.listItemData;
			this.listItem.itemRenderer = HXH_BattlePassAllRewardItem;

			this.goodId = rewardList[level - 1].pay_reward[0];
			this.count = rewardList[level - 1].pay_reward[1];

			let itemSet = PlayerItemSystem.Set(this.goodId) as any;

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

			this.btnLvUp.visible = Game.PlayerInfoSystem.BaseInfo.permitPay != 1;
			egret.Tween.get(this.labelDetail, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.goodId;
			goodsInfo.count = this.count;

			let show = TipManager.ShowProp(goodsInfo, this, e.localY * 0.75, e.stageX, e.stageY);
			show.name = "goods";
			this.addChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "goods";
			this.addChild(show);
		}

		private removeShow() {
			let show = this.getChildByName("goods");
			if (show) this.removeChild(show);
		}

		private onBtnLvUp() {
			this.close();
			loadUI(HXH_BattlePassPay).then((dialog: HXH_BattlePassPay) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}