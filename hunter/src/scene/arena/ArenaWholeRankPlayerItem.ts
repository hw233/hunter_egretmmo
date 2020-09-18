namespace zj {
/** 
 * @author 
 * 
 * @date 2019-1-29
 * 
 * @class 跨服排行今日昨日排名子项界面
 */
export class ArenaWholeRankPlayerItem extends eui.ItemRenderer {
	private labelRank: eui.Label;
	private labelPlayerName: eui.Label;
	private labelQu: eui.Label;
	private labelGrade: eui.Label;
	private labelJiFen: eui.Label;
	private labelChangehao: eui.Label;
	private imgTitle: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWoleRankPlayerItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaWholeRankPlayerItem"], null);
	}
	protected dataChanged() {
		let data = this.data as ArenaWholeRankPlayerItemData;
		if (data.info == null) { return }
		let colorIndex = ConstantConfig_Common.Color.pk_older_color.length;
		if (data.father.type == 1 || data.father.type == 2) {
			let [_, findk] = Table.FindR(ConstantConfig_Common.Color.pk_older_color, function (k, v) {
				return data.info.craft_rank >= v[1] && data.info.craft_rank <= v[2];
			});
			if (findk != null) {
				colorIndex = findk;
			}
		} else if (data.father.type == 4) {
			let [_, findk] = Table.FindR(ConstantConfig_Common.Color.pk_older_color, function (k, v) {
				return data.info.craft_rank_self >= v[1] && data.info.craft_rank_self <= v[2];
			});
			if (findk != null) {
				colorIndex = findk;
			}
		}
		let level = singLecraft.GetLevel(data.info.craft_score);
		let levelStr = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.level, TextsConfig.TextsConfig_Common.numCH[level - 1] || 0);
		let groupStr = "";

		if (data.info.group_name != "") {
			groupStr = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(data.info.group_name, "&", false),
				singLecraft.decodeGroupName(data.info.group_name, "&", true));
		}
		if (data.father.type == 1 || data.father.type == 2) {
			this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.order, data.info.craft_rank);
		}
		this.labelPlayerName.text = data.info.role_name;
		this.labelQu.text = groupStr;
		this.labelGrade.text = levelStr;
		this.labelJiFen.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.score, data.info.craft_score);
		if (data.info.title_id == 0) {
			this.labelChangehao.text = TextsConfig.TextsConfig_Pk.rank.noTitile;
			this.imgTitle.visible = false;
		} else {
			this.labelChangehao.visible = data.info.title_id == 160001;
			this.imgTitle.visible = data.info.title_id != 160001;
			let name = TableItemTitle.Item(data.info.title_id).name;
			let logo = TableItemTitle.Item(data.info.title_id).logo;
			this.labelChangehao.text = name;
			if (data.info.title_id != 160001) {
				this.imgTitle.source = cachekey(logo, this);
			}
		}
		if (colorIndex >= 0 && colorIndex < 5) {
			this.labelRank.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
			this.labelPlayerName.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
			this.labelQu.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
			this.labelGrade.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
			this.labelJiFen.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
			this.labelChangehao.textColor = ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
		}

	}
}
/**子项数据源 */
export class ArenaWholeRankPlayerItemData {
	/**信息  */
	info: message.CraftRoleInfo;
	/**索引 */
	index: number;
	/**父类 */
	father: ArenaWholeRank;

}
}