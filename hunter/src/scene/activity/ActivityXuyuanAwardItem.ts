namespace zj {
//ActivityXuyuanAwardItem
//yuqingchao
//2019.05.07
export class ActivityXuyuanAwardItem extends eui.ItemRenderer {
	private imgPic: eui.Image;
	private imgFloor: eui.Image;
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private scrollerView: eui.Scroller;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanAwardItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityXuyuanAwardItem"], null);
	}
	protected dataChanged() {
		let i = this.data.i;
		let info = this.data.info;
		let pic = this.data.pic;
		let height = this.data.height;
		let cellHight = this.data.cellHight;
		this.height = height;
		this.imgFloor.height = height;
		this.scrollerView.height = height - 10;
		this.imgPic.source = cachekey(pic[0], this);
		this.imgFloor.source = cachekey(pic[1], this);
		let goodsMap = [];
		for (let i = 0; i < info.length; i++) {
			let goods = new message.GoodsInfo();
			goods.goodsId = info[i];
			goods.showType = PlayerItemSystem.ItemQuality(goods.goodsId) >= 5 && 1 || 0;
			goodsMap.push(goods);
		}
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < goodsMap.length; i++) {
			this.arrayCollection.addItem({
				i,
				info: goodsMap[i],
				bln: false,
			});
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityXuyuanAwardItemB;
	}
}
}