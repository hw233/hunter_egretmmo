namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-17
 * 
 * @class 贪婪之岛世界Boos结算子项
 */
export class ZorkBossEndItem extends eui.ItemRenderer {
	private labelRank: eui.Label;
	private imgHeroFrame: eui.Image;
	private imgHeroIcon: eui.Image;
	private labelHeroMyAtk: eui.Label;
	private labelHeroName: eui.Label;
	private imgPer: eui.Image;
	private imgPerBg: eui.Image;
	private labelPer: eui.Label;


	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/ZorkBossEndItemSkin.exml";
		this.imgPer.mask = this.imgPerBg;
	}

	protected dataChanged() {
		let data = this.data as ZorkBossEndItemData;
		this.labelHeroName.text = (data.info.baseInfo.name)
		this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank, data.info.rank)
		this.imgHeroIcon.source = PlayerItemSystem.ItemPath(data.info.baseInfo.picId)
		this.imgHeroFrame.source = PlayerItemSystem.ItemPath(data.info.baseInfo.picFrameId)
		this.labelHeroMyAtk.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.role_level, data.info.baseInfo.level);
		let percent = data.info.value / data.blood * 100;
		if (percent >= 100) {
			percent = 100;
		}

		this.imgPerBg.width = percent * this.imgPer.width / 100;
		this.labelPer.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.NumberUnit4(data.info.value), percent.toFixed(2));
	}
}
export class ZorkBossEndItemData {
	info;
	blood;
}
}