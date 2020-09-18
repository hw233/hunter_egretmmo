namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-17
 * 
 * @class 贪婪之岛港口积分排行子项
 */
export class DarkLandPortRankItem extends eui.ItemRenderer {
	private labelLevel: eui.Label;
	private labelName: eui.Label;
	private labelServer: eui.Label;
	private labelValue: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLandPortRankItemSkin.exml";
	}
	protected dataChanged() {
		let data = this.data as DarkLandPortRankItemData;
		this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, data.info.rank);
		this.labelName.text = data.info.roleName;
		this.labelServer.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(data.info.groupName, "&", false), singLecraft.decodeGroupName(data.info.groupName, "&", true));
		this.labelValue.text = Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.score, data.info.score);
	}
}
export class DarkLandPortRankItemData {
	index: number;
	info: message.DarklandRankInfo;
	father: DarkLandPortRank;
}
}