namespace zj {
/**
 * 果实背包
 * created by Lianlei
 * 2019.05.21
 */
export class HXH_WonderlandFruitBag extends Dialog {
	private btnCloseB: eui.Button;
	private btnWhole: eui.Button;
	private btnRed: eui.Button;
	private btnBlue: eui.Button;
	private btnPurple: eui.Button;
	private scrollerFruitBag: eui.Scroller;
	private listFruitBag: eui.List;
	private groupDown: eui.Group;
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	private labelFruitNum: eui.BitmapLabel;
	private labelFruitName: eui.Label;
	private labelFruitValue: eui.Label;
	private labelFruitInfo: eui.Label;
	private btnSell: eui.Button;
	private btnUse: eui.Button;
	private labelNumID: eui.Label;
	private imgNodeBag: eui.Image;

	private button: Array<eui.Button> = [];
	private type: number;
	private index: number;
	private info: message.GoodsInfo;
	private infos: Array<message.GoodsInfo> = [];
	private listFruitBagData: eui.ArrayCollection = new eui.ArrayCollection();
	public itemId: number;
	private itemList: Array<HXH_WonderlandFruitBagItem> = [];
	private itemIndex: number = 0;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/HXH_WonderlandFruitBagSkin.exml";
		this.btnWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWhole, this);
		this.btnRed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRed, this);
		this.btnBlue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBlue, this);
		this.btnPurple.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPurple, this);
		this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell, this);
		this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
		this.btnCloseB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.listFruitBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChangeTap, this);

		this.init();
	}

	private init() {
		this.button = [
			this.btnWhole,
			this.btnRed,
			this.btnBlue,
			this.btnPurple
		];
		this.type = 0;
		this.index = 0;
		this.info = null;
		this.btnUse.visible = false;
		this.btnSell.visible = false;
		this.setInfo();
	}

	private setInfo() {
		this.setButton();
		this.setInfoList();
		this.setInfoDown();
	}

	private setIndex(type: number, index: number) {
		this.type = type;
		this.index = index;
		this.setInfo();
	}

	private setButton() {
		for (let i = 0; i < this.button.length; i++) {
			if (i == this.type) {
				this.button[i].enabled = false;
			}
			else {
				this.button[i].enabled = true;
			}
		}
	}

	private setInfoList() {
		this.itemIndex = 0;
		this.infos = Game.PlayerItemSystem.GetWonderlandFruitByType(this.type - 1);
		this.info = null;
		if (this.infos[this.index] != null) {
			this.info = this.infos[this.index];
		}
		let count = PlayerItemSystem.FixCount(this.infos.length, 18, 6);
		let goods = this.infos;
		let good = new message.GoodsInfo();
		for (let i = 0; i < count; i++) {
			if (goods[i] == null) {
				goods[i] = good;
			}
		}

		this.listFruitBagData = new eui.ArrayCollection();
		for (let i = 0; i < goods.length; i++) {
			let itemData = new HXH_WonderlandFruitBagItemData();
			itemData.index = i;
			itemData.info = goods[i];
			itemData.father = this;
			this.listFruitBagData.addItem(itemData);
		}
		this.listFruitBag.selectedIndex = 0;
		this.listFruitBag.dataProvider = this.listFruitBagData;
		this.listFruitBag.itemRenderer = HXH_WonderlandFruitBagItem;
	}

	private setInfoDown() {
		// if (this.info != null) {
		if (this.info != null && this.info.goodsId != 0) {
			this.groupDown.visible = true;
			let itemSet = PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count) as any;
			let bUse = itemSet.Use;
			let bSell = itemSet.Info.price != 0;

			this.btnUse.enabled = bUse;
			this.btnSell.enabled = bSell;
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.imgBoard.source = cachekey(itemSet.Frame, this);
			cachekeys([itemSet.Path, itemSet.Frame], this);
			this.labelFruitNum.text = this.info.count.toString();
			this.labelNumID.text = itemSet.FruitID;
			this.labelFruitName.text = itemSet.Info.name;
			this.labelFruitValue.text = itemSet.Info.price;
			this.labelFruitInfo.text = itemSet.Info.des;
		}
		else {
			this.groupDown.visible = false;
		}
	}

	private onBtnWhole() {
		this.setIndex(0, 0);
	}

	private onBtnRed() {
		this.setIndex(1, 0);
	}

	private onBtnBlue() {
		this.setIndex(2, 0);
	}

	private onBtnPurple() {
		this.setIndex(3, 0);
	}

	private SetInfoSell() {
		let count = PlayerItemSystem.Count(this.info.goodsId);
		if (count > 0) {
			let item = this.listFruitBag.getElementAt(this.index) as HXH_WonderlandFruitBagItem;
			item.setInfoItem();
			this.setInfoList();
			this.setInfoDown();
		}
		else {
			let count = Table.Count(this.infos, function (k, v) {
				return v.goodsId > 0 ? 1 : 0;
			});
			if (count > 1 && count == this.index) {
				this.index = this.index - 1;
			}

			this.setInfoList();
			this.setInfoDown();
		}
	}

	private onBtnSell() {
		this.itemId = this.info.goodsId;
		loadUI(PackagePopSell)
			.then((dialog: PackagePopSell) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(this);
			});
	}

	private onBtnUse() {
		this.itemId = this.info.goodsId;
		loadUI(PackagePopUse)
			.then((dialog: PackagePopUse) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(this);
			});
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP)
	}

	private onListChangeTap(e: eui.ItemTapEvent) {
		if (e.itemIndex == this.itemIndex) return;
		let item = this.listFruitBag.getElementAt(e.itemIndex) as HXH_WonderlandFruitBagItem;
		let data = this.listFruitBagData.getItemAt(e.itemIndex) as HXH_WonderlandFruitBagItemData;

		this.index = data.index;
		this.info = this.infos[this.index];

		this.setInfoDown();

		// this.listFruitBagData.replaceItemAt(data, e.itemIndex);
		// this.listFruitBagData.replaceItemAt(data, this.itemIndex);
		this.listFruitBagData.itemUpdated(this.listFruitBagData.source[e.itemIndex]);
		this.listFruitBagData.itemUpdated(this.listFruitBagData.source[this.itemIndex]);
		this.itemIndex = e.itemIndex;
	}
}
}