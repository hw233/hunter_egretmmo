namespace zj {
// 转圈等待动画
// guosh

export class NetLoading extends eui.Component {

	private rect_mask: eui.Image; // 背景遮罩
	private display: dragonBones.EgretArmatureDisplay = null; // 动画

	public constructor() {
		super();

		this.width = UIManager.StageWidth;
		this.height = UIManager.StageHeight;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		// 添加半透明背景
		this.rect_mask = Util.getMaskImgBlack(UIManager.StageWidth, UIManager.StageHeight);
		this.rect_mask.alpha = 0;
		this.rect_mask.verticalCenter = 0;
		this.rect_mask.horizontalCenter = 0;
		this.addChild(this.rect_mask);

		// 增加动画
		Game.DragonBonesManager.getArmatureDisplayAsync(this, "ui_tongyong_loading")
		.then((display: dragonBones.EgretArmatureDisplay)=>{
			this.display = display;
			this.display.x = this.width / 2;
			this.display.y = this.height / 2;
			this.addChild(this.display);
			this.display.animation.play("002_jiazai_3", 0);
		});
	}
}
}