namespace zj {
/**
 * 帮助界面
 * created by Lian Lei
 * 2018.12.19
 */

export class HelpDialog extends Dialog {
	private imageBackground: eui.Image;
	private group: eui.Group;
	private btnClose: eui.Button;
	private listButton: eui.List;
	private listDes: eui.List;
	private scrollerButton: eui.Scroller;
	private scrollerDes: eui.Scroller;
	private curBigType: number;
	private curSmallType: number;
	private curItem: HelpButtonItem;
	private curDesId: number;
	private buttonListInfo = [];
	private desListInfo = [];
	private ButtonItemList;
	public groupAddHelpButtonItem: eui.Group;
	private listButtonData: eui.ArrayCollection = new eui.ArrayCollection();
	private listDesData: eui.ArrayCollection = new eui.ArrayCollection();

	public constructor() {
		super();
		this.skinName = "resource/skins/help/HelpDialogSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.loadByBigType(1);
	}

	public loadBySmallType(smallType) {
		this.imageBackground.visible = false;
		this.curSmallType = smallType;
		this.curBigType = Math.floor(this.curSmallType / 100);
		this.loadHelpData();

	}

	public isFullScreen(){
		return this.imageBackground.visible;
	}

	public loadByBigType(bigType) {
		if (this.curBigType != bigType) {
			this.curBigType = bigType;
			this.curSmallType = HelpOther.helpBigTypeInstance(this.curBigType).small_ids[0];
			this.loadHelpData();
		}
	}

	private loadHelpData() {
		this.setButtonList();
		this.setDesList();
	}

	private setButtonList() {// 左边list
		this.curItem = null;
		this.buttonListInfo = HelpOther.getHelpListByBigType(this.curBigType);
		this.listButton.itemRenderer = HelpButtonItem;

		this.listButtonData.removeAll();

		for (let i = 0; i < this.buttonListInfo.length; i++) {
			let itemData = new HelpButttonItemData();
			itemData.bigType = this.curBigType;
			itemData.father = this;
			itemData.index = this.buttonListInfo[i];
			itemData.info = this.buttonListInfo[i];
			itemData.smallType = this.curSmallType;

			this.listButtonData.addItem(itemData);
		}
		this.listButton.dataProvider = this.listButtonData;

	}

	public selButtonItem(item: HelpButtonItem) {
		this.curSmallType = item.getInfo().small_id;
		if (this.curItem != null) {
			this.curItem.unSel(this.curSmallType);
		}
		this.curItem = item;
		this.curItem.sel();
		this.setDesList();
	}

	private setDesList() {// 右边list
		if (this.curDesId == this.curSmallType) {
			return;
		}
		this.curDesId = this.curSmallType;
		this.desListInfo = HelpOther.getHelpBySmallType(this.curSmallType);

		this.listDes.itemRenderer = HelpDesItem;

		this.listDesData.removeAll();
		this.listDes.scrollH = 0;
		this.listDes.scrollV = 0;

		for (let i = 0; i < this.desListInfo.length; i++) {
			let itemData = new HelpDesItemData();
			itemData.info = this.desListInfo[i];
			this.listDesData.addItem(itemData);
		}
		this.listDes.dataProvider = this.listDesData;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TRAIL_OFF);
	}

}

}