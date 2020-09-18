namespace zj {
/**
 * 扫荡Item(掉落物品)
 * created by Lian Lei
 * 2019.1.19
 */
export class HXH_InstanceSweepFiveItem extends eui.ItemRenderer {
	private labelTitle: eui.Label;
	private groupTableViewDrops: eui.Group;
	private scroller: eui.Scroller;
	private list: eui.List;
	private labelTextNone: eui.Label;

	private totalTick: number;
	private listIdx: number;
	private id: number;
	private listMax: number;
	private father: HXH_InstanceSweepFive;
	private listData: eui.ArrayCollection = new eui.ArrayCollection();

	private timer: egret.Timer = new egret.Timer(300, 0); // 创建一个计时器对象


	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveItemSkin.exml";
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
		this.timer.start();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
			if (this.timer) {
				this.timer.stop();
				this.timer = null;
			}
		}, null);

		cachekeys(<string[]>UIResource["AwardSignItem"], null);
	}

	protected dataChanged() {
		this.listMax = 0;
		this.i = 0;
		// this.father = null;
		this.listData.removeAll();
		if (this.timer) {
			this.timer.stop();
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
		}
		this.updataView(this.data);
	}

	private updataView(data: HXH_InstanceSweepFiveItemData) {
		this.id = data.index;
		this.father = data.father;
		this.listMax = data.father.sweepDrps[data.index].length;

		if ((data.index + 1) == (this.father.sweepDrps.length - 1)) {
			this.labelTitle.text = TextsConfig.TextConfig_Instance.wipeExp;
		}
		else {
			this.labelTitle.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_Instance.wipeTitle, (data.index + 1));
		}

		this.labelTextNone.visible = false;

		if (this.listMax == 0) {
			this.labelTextNone.visible = true;
		}
		else {
			this.labelTextNone.visible = false;
		}

		if(this.father == null || this.father == undefined) return;
		if(this.father.listSize > 0){
			// this.updateOne();
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
			this.timer.start();
		} else {
			this.loadList();
		}

		// this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
		// this.timer.start();
	}

	private i: number = 0;

	private update111() {
		if(this.father == null || this.father == undefined) return;
		if(this.father.listSize > 0){
			this.updateOne();
		} else {
			this.loadList();
		}
	}

	private loadList() {
		this.listData.removeAll();
		for (let i = 0; i < this.listMax; i++) {
			let itemData = new Common_ItemData();
			itemData.info = this.father.sweepDrps[this.data.index][i].goodsId;
			itemData.index = i;
			itemData.type = itemData.CurState.Sweep;
			itemData.father = this;
			this.listData.addItem(itemData);
		}
		this.list.dataProvider = this.listData;
		this.list.itemRenderer = Common_Item;
		this.father.bNeedAdd = true;
	}

	private updateOne(){
		if ((this.listMax - this.i) > 0) {
			let itemData = new Common_ItemData();
			if(this.father == null || this.father == undefined) return;
			let temp = this.father.sweepDrps[this.data.index][this.i];
			itemData.info = temp.goodsId;
			itemData.index = this.i;
			itemData.type = itemData.CurState.Sweep;
			itemData.father = this;
			this.listData.addItem(itemData);
			this.list.dataProvider = this.listData;
			this.list.itemRenderer = Common_Item;
			this.i += 1;
			if (this.listMax == this.i) {
				this.i = 0;
				this.timer.stop();
				this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
				this.father.bNeedAdd = true;
			}
		}
	}

}

export class HXH_InstanceSweepFiveItemData {
	index: number;
	father;
}
}