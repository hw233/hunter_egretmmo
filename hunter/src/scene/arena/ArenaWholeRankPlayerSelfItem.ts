namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-1-29
 * 
 * @class 跨服排行世界精英子项界面
 */
export class ArenaWholeRankPlayerSelfItem extends eui.ItemRenderer {
	private labelSeveName: eui.Label;
	private labelPlayerName1: eui.Label;
	private labelPlayerName2: eui.Label;
	private labelPlayerName3: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeRankPlayerSelfItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWholeRankPlayerSelfItem"], null);
	}
	protected dataChanged() {
		let data = this.data as ArenaWholeRankPlayerSelfItemData;
		this.labelSeveName.text = this.data.info.serverName;
		for (let i = 0; i < 3; i++) {
			let name = TextsConfig.TextsConfig_Pk.norank.name;
			if (data.info.serverData[i + 1] != 0 && data.info.serverData[i + 1] != null) {
				name = data.info.serverData[i + 1].role_name;
			}
			this["labelPlayerName" + (i + 1)].text = name;
		}

	}
}
/**子项数据源 */
export class ArenaWholeRankPlayerSelfItemData {
	/**索引 */
	index: number;
	/** 数据*/
	info;

}
}