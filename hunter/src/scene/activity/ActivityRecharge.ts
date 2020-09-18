namespace zj {
	/**
	 * 2019.12.3
	 * xingliwei
	 * @class 累天充值
	 */
	export class ActivityRecharge extends UI {
		public lstAward: eui.List;
		public labelday: eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityRechargeSkin.exml";
		}

		public init() {
			Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
			let array = new eui.ArrayCollection();
			let table = TableContinuePay.Table();
			for (let i = 1; i <= Object.keys(table).length; i++) {
				let data = new ActivityRechargeItemData();
				data.index = i;
				data.info = TableContinuePay.Item(i);
				data.father = this;
				array.addItem(data);
			}
			let array1 = new eui.ArrayCollection();
			let b = [];
			for (let i = 0; i < array.length; i++) {
				let a = array.source[i] as ActivityRechargeItemData;
				let find = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, (k, v) => {
					return v >= array.source[i].info.id;
				})
				if (find) {
					b.push(a);
				} else {
					array1.addItem(a);
				}
			}
			for (let k = 0; k < b.length; k++) {
				array1.addItem(b[k]);
			}
			this.lstAward.dataProvider = array1;
			this.lstAward.itemRenderer = ActivityRechargeItem;
			this.labelday.text = Game.PlayerInfoSystem.BaseInfo.pay_day + "/" + Object.keys(table).length;
		}
	}
}
