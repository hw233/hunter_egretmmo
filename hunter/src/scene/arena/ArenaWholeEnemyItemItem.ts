namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-29
 * 
 * @class 跨服对手防守阵容子项的子项
 */
export class ArenaWholeEnemyItemItem extends eui.ItemRenderer {
	private imgBoard: eui.Image;
	private imgHead: eui.Image;
	private labelLevel: eui.BitmapLabel;
	private groupStar: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeEnemyItemItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWholeEnemyItemItem"], null);
	}
	protected dataChanged() {
		let data = this.data as ArenaWholeEnemyItemItemData;
		let tableGeneral = TableBaseGeneral.Table();
		let headPath = PlayerHunterSystem.Head(data.info);
		this.imgHead.source = cachekey(headPath, this);
		this.imgBoard.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.info.step], this)
		this.labelLevel.text = data.info.level.toString();
		let awakeLevel = data.info.awaken_level;
		Helper.SetHeroAwakenStar(this.groupStar, data.info.star, awakeLevel);
	}
}
/**子项数据源 */
export class ArenaWholeEnemyItemItemData {
	info: message.GeneralSimpleInfo;
	bReserves: boolean;
}
}