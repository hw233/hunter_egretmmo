namespace zj {
/** 
 * @author xingliwei
 * 
 * @date 2019-2-22
 * 
 * @class 格斗场战报详情list子项的子项
 */
export class CommonArenaEnemyTeamItem extends eui.ItemRenderer {
	private imgHunterFrame: eui.Image;
	private imgNo: eui.Image;
	private imgHeroHead: eui.Image;
	private imgStatus: eui.Image;
	private groupStar: eui.Group;
	private labelLevel: eui.BitmapLabel;
	private imgIconAwaken: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/CommonArenaEnemyTeamItemSkin.exml";
		cachekeys(<string[]>UIResource["CommonArenaEnemyTeamItem"], null);
	}

	protected dataChanged() {
		this.imgNo.source = cachekey("ui_instance_WordsIconNode_png", this);
		this.imgNo.visible = true;
		this.imgStatus.visible = true;
		this.imgHeroHead.visible = true;
		this.labelLevel.visible = true;
		this.groupStar.removeChildren();
		this.imgHunterFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[0], this);
		let data = this.data as CommonArenaEnemyTeamItemData;

		if (data == null) return;

		if (data.simpleInfo == 0) {
			this.visiblefalse();
		} else {
			let info;
			if (data.simpleInfo instanceof message.BattleGeneralInfo) {
				info = data.simpleInfo as message.BattleGeneralInfo;
				if (info.generalInfo == null || info.generalInfo.general_id == 0) {
					this.visiblefalse();
				} else {
					this.imgNo.visible = false;
					let headPath = PlayerHunterSystem.Head(info.generalInfo);
					this.imgHeroHead.source = cachekey(headPath, this);
					this.imgHunterFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[info.generalInfo.step], this);
					this.labelLevel.text = info.generalInfo.level.toString();
					let awakeLevel = info.generalInfo.awakePassive.level ? info.generalInfo.awakePassive.level : 0;
					Helper.SetHeroAwakenStar(this.groupStar, info.generalInfo.star, awakeLevel);
					if (this.imgIconAwaken != null) {
						this.imgIconAwaken.visible = false;
					}
				}
			} else if (data.simpleInfo instanceof message.GeneralSimpleInfo) {
				info = data.simpleInfo as message.GeneralSimpleInfo;
				if (info == null || info.general_id == 0) {
					this.visiblefalse();
				} else {
					this.imgNo.visible = false;
					let headPath = PlayerHunterSystem.Head(info);
					this.imgHeroHead.source = cachekey(headPath, this);
					this.imgHunterFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[info.step], this);
					this.labelLevel.text = info.level.toString();
					let awakeLevel = info.awake_Level ? info.awake_Level : 0;
					Helper.SetHeroAwakenStar(this.groupStar, info.star, awakeLevel);
					if (this.imgIconAwaken != null) {
						this.imgIconAwaken.visible = false;
					}
				}
			} else if (data.simpleInfo instanceof message.GeneralInfo) {
				info = data.simpleInfo as message.GeneralInfo;
				if (info == null || info == 0) {
					this.visiblefalse();
				} else if (info.general_id == 0 || info.general_id == null) {
					this.visiblefalse();
				} else {
					this.imgNo.visible = false;
					let headPath = PlayerHunterSystem.Head(info);
					this.imgHeroHead.source = cachekey(headPath, this);
					this.imgHunterFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[info.step], this);
					this.labelLevel.text = info.level;

					// let awakeLevel = 0;
					// if(info.awakePassive == null){
					// 	awakeLevel = info.awaken_level || 0;
					// }else{
					// 	awakeLevel = info.awakePassIve.level || 0;
					// }
					let awakeLevel = info.awake_Level ? info.awake_Level : 0;
					Helper.SetHeroAwakenStar(this.groupStar, info.star, awakeLevel);
					if (this.imgIconAwaken != null) {
						this.imgIconAwaken.visible = false;
					}
				}
			}
		}

		if (data.index > 4) {
			this.imgStatus.source = cachekey(Game.UIManager.cacheKey(UIConfig.UIConfig_Role.inFormationIcon[0], this), this);
			this.imgStatus.bottom = -6;
			this.imgStatus.right = -6;
		} else {
			this.imgStatus.source = cachekey(Game.UIManager.cacheKey(UIConfig.UIConfig_Role.inFormationIcon[2], this), this);
			this.imgStatus.bottom = 8;
			this.imgStatus.right = 5;
		}
		this.imgStatus.visible = (data.showTeam != false);
	}

	private visiblefalse() {
		this.imgHeroHead.visible = false;
		this.labelLevel.visible = false;
		this.imgIconAwaken.visible = false;
	}
}
/**子项数据源 */
export class CommonArenaEnemyTeamItemData {
	/**索引 */
	index: number;
	simpleInfo: number | message.BattleGeneralInfo | message.GeneralSimpleInfo | message.GeneralInfo;
	showTeam: boolean;
}
}