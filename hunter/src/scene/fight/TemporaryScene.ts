namespace zj {
export class TemporaryScene extends Scene{
	public constructor() {
		super();
		// this.skinName = "resource/skins/fight/Fight_Instance.exml";
	}
	public close(animation?: string) {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
		Game.UIManager.removeScene(this);
	}
}
}