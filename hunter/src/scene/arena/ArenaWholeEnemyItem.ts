namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-29
 * 
 * @class 跨服对手防守阵容子项界面
 */
export class ArenaWholeEnemyItem extends eui.ItemRenderer {
	private imgGradeName: eui.Image;
	private listViewEnemy: eui.List;
	private enemyItems: eui.ArrayCollection = new eui.ArrayCollection();
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeEnemyItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWholeEnemyItem"], null);
	}

	protected dataChanged() {
		let data = this.data;
		let generals;
		let supports;
		if (data.enemyInfo.simpleInfo != null) {
			generals = data.enemyInfo.simpleInfo.generals;
			supports = data.enemyInfo.simpleInfo.supports;
		} else {
			generals = data.enemyInfo.generals;
			supports = data.enemyInfo.supports;
		}

		this.enemyItems.removeAll();
		for (let i = 0; i < generals.length; i++) {
			if (generals[i].general_id != 0) {
				this.createItem(generals[i]);
			}
		}
		this.imgGradeName.source = cachekey(UIConfig.UIConfig_Pk.TeamIndex[data.index + 1], this);

	}

	private createItem(info: message.GeneralSimpleInfo, supports?: boolean) {
		let data = new ArenaWholeEnemyItemItemData();
		data.info = info;
		this.enemyItems.addItem(data);
		this.listViewEnemy.dataProvider = this.enemyItems;
		this.listViewEnemy.itemRenderer = ArenaWholeEnemyItemItem;
	}
}
/**子项数据源 */
export class ArenaWholeEnemyItemData {
	index: number;
	enemyInfo: message.CraftFormationInfo;
}
}