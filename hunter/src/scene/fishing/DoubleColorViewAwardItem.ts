namespace zj {
//DoubleColorViewAwardItem
//yuqingchao
//2019.05.28
export class DoubleColorViewAwardItem extends eui.ItemRenderer {
	private groupCache: eui.Group;
	private imgRank: eui.Image;
	private imgOr: eui.Image;
	private lstFirst: eui.List;
	private lstFirstArr: eui.ArrayCollection;
	private lstA: eui.List;
	private lstaArr: eui.ArrayCollection;
	private lstB: eui.List;
	private lstbArr: eui.ArrayCollection;
	private lstAward: eui.List;
	private awardArr: eui.ArrayCollection;
	private groupDouble: eui.Group;
	private info;
	private id: number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewAwardItemSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorViewAwardItem"], null);
	}

	protected dataChanged() {
		closeCache(this.groupCache);
		this.imgRank.visible = true;
		this.info = this.data.info;
		this.id = this.data.i;
		this.imgRank.source = cachekey(this.info.pic, this);
		let double: boolean = this.id != 0 && this.id != 4;
		this.groupDouble.visible = double;
		this.lstFirst.visible = !double;

		this.setInfo(double);
		setCache(this.groupCache);
	}
	private setInfo(double) {
		let num = this.info.all_balls;
		this.imgOr.visible = double;
		let list_a = [];
		let list_b = [];
		let list = [];
		if (double) {
			for (let i = 1; i <= num + 1; i++) {
				if (i < num) {
					list_a.push(2);
				} else if (i == num) {
					list_a.push(0);
				} else if (i == num + 1) {
					list_a.push(1);
				}
			}
			for (let i = 1; i <= num + 1; i++) {
				list_b.push(2);
			}
		} else {
			for (let i = 1; i <= num + 1; i++) {
				if (i < num) {
					list.push(2);
				} else if (i == num && num != 1) {
					list.push(0);
				} else if (i == num + 1) {
					list.push(1);
				}
			}
		}

		this.lstaArr = new eui.ArrayCollection();
		for (let i = 0; i < list_a.length; i++) {
			this.lstaArr.addItem({
				num: list_a[i]
			})
		}
		this.lstA.dataProvider = this.lstaArr;
		this.lstA.itemRenderer = DoubleColorViewAwardGroupItem;

		this.lstbArr = new eui.ArrayCollection;
		for (let i = 0; i < list_b.length; i++) {
			this.lstbArr.addItem({
				num: list_b[i]
			})
		}
		this.lstB.dataProvider = this.lstbArr;
		this.lstB.itemRenderer = DoubleColorViewAwardGroupItem;

		this.lstFirstArr = new eui.ArrayCollection();
		for (let i = 0; i < list.length; i++) {
			this.lstFirstArr.addItem({
				num: list[i]
			})
		}
		this.lstFirst.dataProvider = this.lstFirstArr;
		this.lstFirst.itemRenderer = DoubleColorViewAwardGroupItem;

		let goods = [];
		for (let k in this.info.reward_goods) {
			let v = this.info.reward_goods[k];
			let good = new message.GoodsInfo();
			good.goodsId = v;
			good.count = this.info.reward_count[k];
			goods.push(good);
		}
		this.awardArr = new eui.ArrayCollection();
		for (let i = 0; i < goods.length; i++) {
			this.awardArr.addItem({
				info: goods[i],
			})
		}
		this.lstAward.dataProvider = this.awardArr;
		this.lstAward.itemRenderer = DoubleColorViewAwardAwardItem;
	}
}
}