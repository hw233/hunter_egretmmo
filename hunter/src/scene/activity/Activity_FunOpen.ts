namespace zj {
	/**
	 * @class 功能开启得奖
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-02
	 */
	export class Activity_FunOpen extends Dialog {
		private scrollerFunOpen: eui.Scroller;
		private listFunOpen: eui.List;
		private btnClose: eui.Button;

		private funOpenInfo: Array<TableFunctionOpen> = [];
		private listFunOpenData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_FunOpenSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
			this.init();
			this.setInfoList();
		}

		private init() {
			for (const key in TableFunctionOpen.Table()) {
				if (TableFunctionOpen.Table().hasOwnProperty(key)) {
					const element = TableFunctionOpen.Table()[key];
					if (element.condition == 0 || element.condition == 999 || element.show == 0) continue;
					this.funOpenInfo.push(element);
				}
			}
		}

		public setInfoList() {
			let rewardIdArr = [];
			for (const key in Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.hasOwnProperty(key)) {
					const element = Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward[key];
					if (element < 1000) continue;
					rewardIdArr.push(element);
				}
			}

			this.funOpenInfo.sort((a, b) => { return a.condition - b.condition; });

			let funOpenArr: Array<TableFunctionOpen> = []; // 已经领奖的功能

			let getLevelArr = [];
			for (let i = 0; i < rewardIdArr.length; i++) {
				for (const key in TableUplevelReward.Table()) {
					const element = TableUplevelReward.Table()[key];
					if (rewardIdArr[i] == element.index) getLevelArr.push(element.level);
				}
			}

			for (let i = 0; i < this.funOpenInfo.length; i++) {
				for (let j = 0; j < getLevelArr.length; j++) {
					if (this.funOpenInfo[i].condition == getLevelArr[j]) funOpenArr.push(this.funOpenInfo[i]);
				}
			}


			funOpenArr.sort((a, b) => { return a.condition - b.condition; });

			let self = this;
			this.funOpenInfo = this.funOpenInfo.filter(function (v) { return !(funOpenArr.indexOf(v) > -1) }).concat(funOpenArr.filter(function (v) { return !(self.funOpenInfo.indexOf(v) > -1) })); // 求补集

			for (let i = 0; i < funOpenArr.length; i++) this.funOpenInfo.push(funOpenArr[i]);

			this.listFunOpenData.removeAll();
			for (let i = 0; i < this.funOpenInfo.length; i++) {
				let itemData = new Activity_FunOpenItemData();
				itemData.index = i;
				itemData.info = this.funOpenInfo[i];
				itemData.father = this;
				this.listFunOpenData.addItem(itemData);
			}
			this.listFunOpen.dataProvider = this.listFunOpenData;
			this.listFunOpen.itemRenderer = Activity_FunOpenItem;
		}

		private onBtnClose() {
			this.close(UI.HIDE_TRAIL_OFF);
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