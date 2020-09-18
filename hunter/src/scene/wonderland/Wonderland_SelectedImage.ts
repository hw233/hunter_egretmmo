namespace zj {
/**
 * @class 贪婪之岛更换猎人形象
 * 
 * @author LianLei
 * 
 * 2019.05.29
 */
export class Wonderland_SelectedImage extends Dialog {

	private btnClose: eui.Button;
	private scrollerViewImage: eui.Scroller;
	private listViewImage: eui.List;
	private btnOk: eui.Button;

	private callBack: (picId: number) => void;
	private picIds: Array<number>;
	private listViewImageData: eui.ArrayCollection = new eui.ArrayCollection();
	private focusCur: number = -1;
	private focusCurBefore: number = 0;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/Wonderland_SelectedImageSkin.exml";
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.listViewImage.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeList, this);
		this.loadList();
	}

	private loadList() {
		this.loadListGeneral();
	}

	private loadListGeneral() {
		let picIds_normal: Array<number> = PlayerItemSystem.GetNormalPic(1);
		let picIds_other: Array<number> = Table.DeepCopy(Game.PlayerWonderLandSystem.otherAttri.picIds);

		for (let [kk, vv] of HelpUtil.GetKV(picIds_other)) {
			let find = Table.FindF(picIds_normal, (k, v) => {
				return v == vv;
			});

			if (!find) {
				picIds_normal.push(vv);
			}
		}

		this.picIds = picIds_normal;
		this.SetReptition();

		this.listViewImageData.removeAll();
		for (let i = 0; i < this.picIds.length; i++) {
			let itemData = new Wonderland_SelectedImageItemData();
			itemData.index = i;
			itemData.id = Number(this.picIds[i]);
			itemData.father = this;
			this.listViewImageData.addItem(itemData);
		}
		this.listViewImage.selectedIndex = 0;
		this.listViewImage.itemRenderer = Wonderland_SelectedImageItem;
		this.listViewImage.dataProvider = this.listViewImageData;
	}

	private SetReptition() {
		let aa: { [id: number]: number } = {}
		let bb: Array<number> = [];
		for (let [kk, vv] of HelpUtil.GetKV(this.picIds)) {
			if (aa[vv] == null && vv != Game.PlayerInfoSystem.BaseInfo.picId) {
				aa[vv] = vv;
			}
		}

		for (let [kk, vv] of HelpUtil.GetKV(aa)) {
			bb.push(vv);
		}

		bb.sort((a: number, b: number) => {
			return a - b;
		});

		bb.splice(0, 0, Game.PlayerInfoSystem.BaseInfo.picId);

		this.picIds = bb;
	}

	private onChangeList(e: eui.ItemTapEvent) {
		if (e.itemIndex == this.focusCurBefore) return;
		let data = this.listViewImageData.getItemAt(e.itemIndex) as League_WarBattleLineupItemData;
		let dataBefore = this.listViewImageData.getItemAt(this.focusCurBefore) as League_WarBattleLineupItemData;

		this.listViewImage.selectedIndex = e.itemIndex;
		this.focusCur = this.listViewImage.selectedIndex;

		this.listViewImageData.replaceItemAt(data, e.itemIndex);
		this.listViewImageData.replaceItemAt(dataBefore, this.focusCurBefore);

		this.focusCurBefore = e.itemIndex;
	}



	public setCB(cb: (picId: number) => void) {
		this.callBack = cb;
	}

	private onBtnOk() {
		if (this.callBack != null && this.focusCur != -1) {
			this.callBack(this.picIds[this.focusCur]);
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
		}
		this.close(UI.HIDE_TO_TOP);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}