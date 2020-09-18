namespace zj {
//钓鱼--开奖一览
//yuqingchao
//2019.05.15
export class FishingAwardView extends Dialog {
	private lstItem: eui.List;				//下方列表
	private arrLstItem: eui.ArrayCollection;
	private lstTypeItem: eui.List;			//上方列表
	private arrLstTypeItem: eui.ArrayCollection;
	private btnClose: eui.Button;
	private groupAll: eui.Group;
	private curType: any = null;
	private fishTable: any;
	private itemTable: any;
	private goodsArr = [];

	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingAwardViewSkin.exml";
		this.lstTypeItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstTypeItem, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
		Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		}, null);
		this.init();
	}

	private init() {
		this.curType = TableEnum.Enum.LeagueFishType.White;
		this.lstTypeItem.selectedIndex = 0;
		this.initButtonList();
		this.initList();
	}

	private initButtonList() {
		this.fishTable = Game.ConfigManager.getTable(StringConfig_Table.leagueFish + ".json");
		this.arrLstTypeItem = new eui.ArrayCollection();
		for (let i = 0; i < Object.keys(this.fishTable).length; i++) {
			this.arrLstTypeItem.addItem({
				info: this.fishTable[i + 1],
				id: i,
				father: this
			})
		}
		this.lstTypeItem.dataProvider = this.arrLstTypeItem;
		this.lstTypeItem.itemRenderer = FishingAwardViewTypeItem;
		let index = this.fishTable[this.lstTypeItem.selectedIndex + 1].rand_items[0];
		this.itemTable = Game.ConfigManager.getTable(StringConfig_Table.randItem + ".json")[index];
		this.goodsArr.splice(0, this.goodsArr.length);
		for (let i = 0; i < this.itemTable.item_ids.length; i++) {
			let goods = new message.GoodsInfo();
			goods.goodsId = this.itemTable.item_ids[i];
			goods.count = this.itemTable.item_count[i];
			this.goodsArr.push(goods)
		}
	}

	private initList() {
		this.arrLstItem = new eui.ArrayCollection();
		this.arrLstItem.removeAll();
		for (let i = 0; i < 14; i++) {
			this.arrLstItem.addItem({
				info: this.goodsArr[i],
				id: i,
				father: this
			})
		}
		this.lstItem.dataProvider = this.arrLstItem;
		this.lstItem.itemRenderer = FishingAwardViewItem;
	}

	private onLstTypeItem(e: eui.ItemTapEvent) {
		this.lstTypeItem.selectedIndex = e.itemIndex;
		this.initButtonList();
		this.initList();
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private removeShow() {
		let show = this.getChildByName("details");
		if (show) {
			this.removeChild(show);
		}
	}

	private showGoodsProperty(ev: egret.Event) {
		let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
		show.name = "details";
		this.addChild(show);
	}
}
}