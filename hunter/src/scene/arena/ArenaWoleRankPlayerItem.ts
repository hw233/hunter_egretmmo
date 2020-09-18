namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-29
 * 
 * @class 跨服排行今日昨日排名子项界面
 */
export class ArenaWoleRankPlayerItem extends eui.ItemRenderer {
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWoleRankPlayerItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWoleRankPlayerItem"], null);
	}
	protected dataChanged() {
		let data = this.data as ArenaWoleRankPlayerItemData;


	}
}
/**子项数据源 */
export class ArenaWoleRankPlayerItemData {
	/**父类  */
	info;

}
}