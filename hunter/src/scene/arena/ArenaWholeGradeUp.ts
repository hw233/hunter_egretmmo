namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2018-4-8
 * 
 * @class 格斗场段位提升提示窗口
 */
export class ArenaWholeGradeUp extends Dialog {
	private SpriteGrade: eui.Image;
	private TextClose: eui.Label;
	private SpriteGet: eui.Image;
	private SpriteGetB: eui.Image;
	private imgBG: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholeGradeUpSkin.exml";
		this.init();
	}

	public init() {
		egret.Tween.get(this).wait(1000).call(() => {
			this.imgBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callBack, this)
		});
	}

	public setInfo(plevel, nlevel) {
		let bincrease = nlevel > plevel;
		let nincrease = bincrease && 1 || 2;

		let path = UIConfig.UIConfig_Pk.level_change[nincrease];
		if (bincrease) {
			this.AddAni(this.SpriteGet, path)
		} else {
			this.SpriteGet.source = cachekey(path, this);
			this.SpriteGetB.source = cachekey(path, this);
		}

		let ppic = TableSinglecraftScore.Item(plevel).title;
		let npic = TableSinglecraftScore.Item(nlevel).title;

		this.SpriteGrade.source = cachekey(ppic, this);
		if (bincrease) {
			this.SetGradeChangeUp(npic);
		} else {
			this.SetGradeChangeDown(npic);
		}
	}

	private callBack() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callBack, this);
		this.close();
	}

	private AddAni(node: eui.Image, path, scaling?, seconds?) {
		node.visible = false;
		let scaleSold = node.scaleX;
		let cx = node.x;
		let cy = node.y;
		let spriteBg = this.SpriteGetB;
		node.source = cachekey(path, this);
		spriteBg.source = cachekey(path, this);
		spriteBg.visible = false;
		spriteBg.scaleX = spriteBg.scaleY = 0.85 * scaleSold;
	}

	public SetGradeChangeUp(path) {

	}

	private SetGradeChangeDown(path) {

	}
}
}