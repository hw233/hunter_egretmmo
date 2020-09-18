namespace zj {
/** 
 * @author xingliwei
 * 
 * @date 2019-2-22
 * 
 * @class 格斗场战报详情list子项
 */
export class CommonBattleMailThreeItem extends eui.ItemRenderer {
	private imgResult: eui.Image;
	private imgTeamNumber: eui.Image;
	private listSupport: eui.List;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/CommonBattleMailThreeItemSkin.exml";
		cachekeys(<string[]>UIResource["CommonBattleMailThreeItem"], null);
	}
	protected dataChanged() {
		let data1 = this.data as CommonBattleMailThreeItemData;
		if (data1.bWin == null) {
			this.imgResult.visible = false;
		} else {
			this.imgResult.source = cachekey(UIConfig.UIConfig_RpgScene.resultWinOrLose[data1.bWin], this);
		}
		this.imgTeamNumber.source = cachekey(UIConfig.UIConfig_RpgScene.resultTeam[data1.index], this);

		let array = new eui.ArrayCollection();
		for (let i = 0; i < Object.keys(data1.info).length; i++) {
			let data = new CommonArenaEnemyTeamItemData();
			data.index = i
			data.showTeam = false;
			data.simpleInfo = data1.info[i];
			array.addItem(data)
		}
		this.listSupport.dataProvider = array;
		this.listSupport.itemRenderer = CommonArenaEnemyTeamItem;
	}
}
/**子项数据源 */
export class CommonBattleMailThreeItemData {
	/**索引 */
	index: number;
	info = [];
	bWin: number;
}
}