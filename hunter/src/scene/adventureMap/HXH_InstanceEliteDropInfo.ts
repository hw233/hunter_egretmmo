namespace zj {
/**
 * 冒险---挑战列表掉落弹窗
 * created by Lian Lei
 * 2019.1.25
 */
export class HXH_InstanceEliteDropInfo extends Dialog {
	private groupAll: eui.Group;
	private btnClose: eui.Button;
	private scrollerDrop: eui.Scroller;
	private listDrop: eui.List;
	private listData: eui.ArrayCollection = new eui.ArrayCollection();

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstanceEliteDropInfoSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
	}

	public setInfo(index: number) {
		// let goodsId: Array<string> = Game.PlayerInstanceSystem.EliteInstance(index).elite_drop_des;
		// let goods = [];
		// for (let i = 0; i < goodsId.length; i++) {
		// 	let v: string = goodsId[i];
		// 	// v.split("&");
		// 	let vv: Array<string> = v.split("&");
		// 	goods.push({
		// 		goodsId: parseInt(vv[0]),
		// 		des: vv[1],
		// 	});
		// }
		let goods = [];
		let instances: number[] = Game.PlayerInstanceSystem.EliteInstance(index).chapter_pack;
		for (let i = 0; i < instances.length; i++) {
			let instance = TableInstance.Item(instances[i]);
			if(instance){
				let randItems = instance.rand_items;
				for(let j = 0; j < randItems.length; ++j){
					let randItem = TableRandItem.Item(randItems[j]);
					if(randItem){
						let goodids = randItem.item_ids;
						for(let n = 0; n < goodids.length; ++n){
							if(goods.indexOf(goodids[n]) == -1){
								goods.push(goodids[n]);
							}
						}
					}
				}
			}
		}

		this.listData.removeAll();
		for (let i = 0; i < goods.length; i++) {
			let itemData = new HXH_InstanceEliteDropInfoItemData();
			itemData.index = i;
			itemData.goodsId = goods[i];
			itemData.des = "";
			itemData.father = this;

			this.listData.addItem(itemData);
		}
		this.listDrop.dataProvider = this.listData;
		this.listDrop.itemRenderer = HXH_InstanceEliteDropInfoItem;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private onRemoveDialog() {
		let dialog = this.getChildByName("Drop") as HXH_InstanceEliteDropInfoItem;
		if (dialog) this.removeChild(dialog);
	}
}

}