namespace zj {
/**
 * 冒险通关奖励
 * created by Lian Lei
 * 2019.1.16
 */
export class HXH_InstancePassDropInfo extends Dialog {
	private btnClose: eui.Button;
	private groupViewDrop: eui.Group;
	private scrollerViewDrop: eui.Scroller;
	private listViewDrop: eui.List;
	private listViewDropData: eui.ArrayCollection = new eui.ArrayCollection();
	public groupDesProp: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstancePassDropInfoSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
		this.setInfo();
	}

	private setInfo() {
		let tableChapter: { [key: string]: TableInstanceArea; } = TableInstanceArea.Table();
		let list: Array<TableInstanceArea> = [];
		for (let [kk, vv] of HelpUtil.GetKV(tableChapter)) {
			if (vv.area_normal.length != 0 && kk < 10) {
				list.push(vv);
			}
		}

		// list.sort(function(a, b){
		// 	return b.area_id - a.area_id;
		// });

		this.listViewDropData.removeAll();
		for (let i = 0; i < list.length; i++) {
			let itemData = new HXH_InstancePassDropInfoItemData();
			itemData.id = i + 1;
			itemData.info = list[i];
			itemData.father = this;
			itemData.index = i;
			this.listViewDropData.addItem(itemData);
		}
		this.listViewDrop.dataProvider = this.listViewDropData;
		this.listViewDrop.itemRenderer = HXH_InstancePassDropInfoItem;

	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private onRemoveDialog() {
		let dialog = this.getChildByName("Award") as HXH_InstancePassDropInfoItem;
		if (dialog) this.removeChild(dialog);
	}
}

}