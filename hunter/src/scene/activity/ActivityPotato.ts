namespace zj {
//ActivityPotato
//yuqingchao
//2019.04.02
export class ActivityPotato extends Dialog {
	private id: number = 0;
	private father;
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private btnClose: eui.Button;
	public potatoList;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityPotatoSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
	}
	public init(id, father) {
		this.id = id;
		this.father = father;
		this.setInfoList();
	}
	private setInfoList() {
		let list = Game.ConfigManager.getTable(StringConfig_Table.itemTransfer + ".json");

		let goodsList = [];
		let goodsId: number;
		let count;
		let index: number;
		let showType;
		let num = list[this.id].items_id.length;
		for (let i = 0; i < list[this.id].items_id.length; i++) {
			let goods = [
				goodsId = list[this.id].items_id[i],
				count = list[this.id].items_count[i],
				index = 0,
				showType = list[this.id].show_type
			]
			goodsList.push(goods);
		}
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < goodsList.length; i++) {
			this.arrayCollection.addItem({
				info: goodsList[i],
			});
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityPotatoItem;
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}