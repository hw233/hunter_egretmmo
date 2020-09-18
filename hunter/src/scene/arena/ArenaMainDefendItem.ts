namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-28
 * 
 * @class 本服格斗场防守阵容List子项
 */
export class ArenaMainDefendItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgHead: eui.Image;
	private groupStar: eui.Group;
	// private imgPos: eui.Image;
	private labelLevel: eui.BitmapLabel;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaMainDefendItemSkin.exml";
		cachekeys(<string[]>UIResource["ArenaMainDefendItem"], null);
	}

	protected dataChanged() {
		if (this.data.isEmpty == true) {
			this.updataView(this.data);
		} else {
			this.setEmptyInfo(this.data);
		}

	}

	private updataView(data: ArenaMainDefendItemData) {
		let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[data.generalId];
		let headPath = PlayerHunterSystem.Head(data.generalId);
		if(Device.isReviewSwitch && Util.isWxMiniGame) {
			this.imgHead.source = cachekey("wx_" + headPath, this);
		}else{
			this.imgHead.source = cachekey(headPath, this);
		}
		this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[generalInfo.step], this);
		this.labelLevel.text = generalInfo.level.toString();
		let awakeLevel = generalInfo.awakePassive.level;
		Helper.SetHeroAwakenStar(this.groupStar, generalInfo.star, awakeLevel);
		if (data.isMain == true) {

		} else {
			this.scaleX = 0.8;
			this.scaleY = 0.8;
		}
	}

	private setEmptyInfo(data: ArenaMainDefendItemData) {
		this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[0], this);
		this.imgHead.visible = false;
		this.labelLevel.visible = false;
		this.groupStar.visible = false;
		if (data.isMain == true) {
			// this.
			UIConfig.UIConfig_Role.inFormationIcon
		} else {
			this.scaleX = 0.8;
			this.scaleY = 0.8;
		}
	}
}

export class ArenaMainDefendItemData {
	index: number;
	isEmpty: boolean = false;
	isMain: boolean = false;
	generalId: number = null;
}
}