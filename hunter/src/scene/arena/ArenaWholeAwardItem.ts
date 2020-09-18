namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-28
 * 
 * @class 跨服奖励list界面
 */
export class ArenaWholeAwardItem extends eui.ItemRenderer {
	private imgGradeIcon: eui.Image;
	private imgGradeName: eui.Image;
	private labelJiFen: eui.Label;
	private listAward: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeAwardItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWholeAwardItem"], null);
		this.init();
	}
	private init() {

	}
	protected dataChanged() {
		let data: ArenaWholeAwardItemData = this.data;
		if (data == null) return;
		this.imgGradeIcon.source = cachekey(data.info.logo, this);
		this.imgGradeName.source = cachekey(data.info.icon, this);
		this.labelJiFen.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.show_jifen, data.info.min);

		let array = new eui.ArrayCollection();
		for (let i = 0; i < data.info.good.length; i++) {
			let data1 = new ArenaWholeAwardItemItemData();
			data1.info = data.info.good[i];
			data1.father = this;
			data.index = i;
			array.addItem(data1);
		}
		this.listAward.dataProvider = array;
		this.listAward.itemRenderer = ArenaWholeAwardItemItem;
	}

}
export class ArenaWholeAwardItemData {
	index: number;
	info;
	forcus: boolean;
	father: ArenaWholeAward;
}
}