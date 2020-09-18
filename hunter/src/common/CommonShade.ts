namespace zj {
//遮罩类  xingliwie 2019-4-10
export class CommonShade extends Dialog {
	public shade: eui.Rect;
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonShadeSkin.exml";

		this.init();
	}
	public init() {
		this.shade.width = UIManager.StageWidth;
		this.shade.height = UIManager.StageHeight;
	}
}
}