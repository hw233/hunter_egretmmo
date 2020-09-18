namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-5-8
 * 
 * @class 跨服格斗结算面板上的人物展示子项类
 */
export class ArenaStarcraftHeroItem extends UI {
	public LayerName: eui.Group;
	public SpriteBoard: eui.Image;
	public NodeVoid: eui.Group;
	public SpriteHead: eui.Image;
	public LabelLevel: eui.BitmapLabel;
	public SpriteStar1: eui.Image;

	private generalInfo = null;
	private bEnemy = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaStarcraftHeroItemSkin.exml";
		// this.SpriteSupport.visible = false
		cachekeys(<string[]>UIResource["ArenaStarcraftHeroItem"], null);
	}

	public setInfo(id: number, isSupport) {
		this.NodeVoid.visible = (id != 0)
		// this.SpriteSupport.visible = isSupport;
		if (id == 0) {
			return;
		}
		this.generalInfo = Game.PlayerHunterSystem.allHuntersMap()[id];
		this.fresh();
	}

	private fresh() {
		let headPath = PlayerHunterSystem.Head(this.generalInfo);
		if (this.bEnemy == true) {
			// this.SpriteHead
		}

		this.SpriteHead.source = cachekey(headPath, this);
		this.SpriteBoard.source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.generalInfo.step], this);
		this.LabelLevel.text = this.generalInfo.level;
		this.SpriteStar1.source = cachekey(UIConfig.UIConfig_Role.heroStar[this.generalInfo.star], this);
	}

	public getGroup() {
		return this.LayerName;
	}

	public setGeneralInfo(generalInfo, isSupport, bEnemy) {
		this.generalInfo = generalInfo;
		this.bEnemy = bEnemy;
		let id = 0;
		if (this.generalInfo != null) {
			id = this.generalInfo.general_id;
		}
		this.NodeVoid.visible = (id != 0);
		if (!isSupport) {
			// this.SpriteSupport.visible = false;
		} else {
			// this.SpriteSupport.source = UIConfig.UIConfig_Role.inFormationSimpleWord[3];
		}
		if (id == 0) {
			return;
		}
		this.fresh();

	}
}
}