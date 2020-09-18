namespace zj {
	/**
	 * @class 通行证大奖一览
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-20
	 */
	export class HXH_BattlePassAllReward extends Dialog {
		private scrollerAwardTop: eui.Scroller;
		private listAwardTop: eui.List;
		private scrollerAwardBottom: eui.Scroller;
		private listAwardBottom: eui.List;
		private btnLvUp: eui.Button;
		private btnClose: eui.Button;

		private listAwardTopData: eui.ArrayCollection = new eui.ArrayCollection();
		private listAwardBottomData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassAllRewardSkin.exml";
			this.btnLvUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLvUp, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
			this.setInfo();
		}

		private setInfo() {
			let rewardList: Array<TablePermitReward> = [];
			let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
			let tblInfo = TablePermitReward.Table();
			for (let [k, v] of HelpUtil.GetKV(tblInfo)) {
				if (v.season == season && v.id % 10 == 0 && v.free_reward[0] != null) {
					rewardList.push(v);
				}
			}

			rewardList.sort((a, b) => { return a.level - b.level; });

			this.listAwardTopData.removeAll();
			this.listAwardBottomData.removeAll();
			for (let i = 0; i < rewardList.length; i++) {
				this.listAwardTopData.addItem({ goodsId: rewardList[i].free_reward[0], count: rewardList[i].free_reward[1] });
				this.listAwardBottomData.addItem({ goodsId: rewardList[i].pay_reward[0], count: rewardList[i].pay_reward[1] });
			}
			this.listAwardTop.dataProvider = this.listAwardTopData;
			this.listAwardTop.itemRenderer = HXH_BattlePassAllRewardItem;
			this.listAwardBottom.dataProvider = this.listAwardBottomData;
			this.listAwardBottom.itemRenderer = HXH_BattlePassAllRewardItem;

			this.btnLvUp.visible = Game.PlayerInfoSystem.BaseInfo.permitPay < 1;
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

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) this.removeChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
	}
}