namespace zj {
/**
 * @class 黑暗大陆更换宠物形象
 * 
 * @author LianLei
 * 
 * 2019.05.31
 */
export class DarkLand_SelectPet extends Dialog {

	private btnClose: eui.Button;
	private scrollerViewImage: eui.Scroller;
	private listViewImage: eui.List;
	private btnOk: eui.Button;

	private petInfo: Array<message.PetInfo>;
	private callBack: (petInfo: message.PetInfo) => void;
	private focusCur: number = -1;
	private focusCurBefore: number = 0;
	private listViewImageData: eui.ArrayCollection = new eui.ArrayCollection();

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLand_SelectPetSkin.exml";
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.listViewImage.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeList, this);

		this.SetInfoList();
	}

	private SetInfoList() {
		this.petInfo = [];
		for (let [k, v] of HelpUtil.GetKV(Game.PlayerAdviserSystem.petMap)) {
			if (PlayerAdviserSystem.PetBase(v.pet_id).is_open == 1) {
				this.petInfo.push(v);
			}
		}

		this.petInfo.sort((a: message.PetInfo, b: message.PetInfo) => {
			let a_value = a.step + a.star;
			let b_value = b.step + b.star;

			if (a.situtation == b.situtation) {
				if (a_value == b_value) {
					return a.pet_id - b.pet_id;
				}
				else {
					return b_value - a_value;
				}
			}
			else {
				return b.situtation - a.situtation;
			}
		});

		this.listViewImageData.removeAll();
		for (let i = 0; i < this.petInfo.length; i++) {
			let itemData = new DarkLand_SelectPetItemData();
			itemData.index = i;
			itemData.info = this.petInfo[i];
			itemData.father = this;
			this.listViewImageData.addItem(itemData);

		}
		this.listViewImage.itemRenderer = DarkLand_SelectPetItem;
		this.listViewImage.dataProvider = this.listViewImageData;

		if (this.petInfo[0].situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
			this.listViewImage.selectedIndex = 0;
			this.focusCur = 0;
		}

	}

	public setCB(cb: (petInfo: message.PetInfo) => void) {
		this.callBack = cb;
	}

	private onBtnOk() {
		if (this.callBack != null && this.focusCur != null) {
			this.callBack(this.petInfo[this.focusCur]);
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
		}
		else if (this.callBack != null && this.focusCur == null) {
			this.callBack(null);
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
		}
		this.close(UI.HIDE_TO_TOP);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private onChangeList(e: eui.ItemTapEvent) {
		let item = this.listViewImage.getElementAt(e.itemIndex) as DarkLand_SelectPetItem;
		let data = this.listViewImageData.getItemAt(e.itemIndex) as DarkLand_SelectPetItemData;
		let dataBefore = this.listViewImageData.getItemAt(this.focusCurBefore) as DarkLand_SelectPetItemData;

		if (data.info.star == 0) return;
		if (e.itemIndex == this.focusCur) {
			if (this.listViewImage.selectedIndex == null) {
				this.listViewImage.selectedIndex = e.itemIndex;
				this.focusCur = e.itemIndex;
			}
			else {
				this.listViewImage.selectedIndex = null;
				this.focusCur = null;
			}
			
			this.listViewImageData.replaceItemAt(data, e.itemIndex);
			return;
		}

		this.listViewImage.selectedIndex = e.itemIndex;
		this.focusCur = this.listViewImage.selectedIndex;

		this.listViewImageData.replaceItemAt(data, e.itemIndex);
		this.listViewImageData.replaceItemAt(dataBefore, this.focusCurBefore);

		this.focusCurBefore = e.itemIndex;
	}
}
}