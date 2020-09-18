namespace zj {

/**
 * 
 */
export class League_WarSelectThings extends Dialog {
	private things: Array<any> = [];
	private imgBackGround: eui.Image;
	private TableViewList: eui.List;
	private touchRect: eui.Rect;
	private TableViewListData: eui.ArrayCollection = new eui.ArrayCollection();

	public constructor() {
		super();
		this.skinName = "resource/skins/fight/League_WarSelectThingsSkin.exml";
		this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
	}

	public SetInfo(things: Array<any>) {
		this.things = things;
		this.LoadList(things);
	}

	public LoadList(things) {
		this.TableViewListData.removeAll();
		for (let i = 0; i < things.length; i++) {
			let itemData = new League_WarSelectThingItemData();
			itemData.index = i;
			itemData.thing = this.things[i];
			itemData.father = this;
			this.TableViewListData.addItem(itemData);
		}

		this.TableViewList.dataProvider = this.TableViewListData;
		this.TableViewList.itemRenderer = League_WarSelectThingItem;
	}

	public onBtnClose() {
		this.close();
	}
}
}