namespace zj {
export class Dialog_Simple extends UI {
	public btnOk: eui.Rect;
	public NodeBG: eui.Group;
	public labelContent: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/teach/Dialog_SimpleSkin.exml";
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
	}

	public RunAction() {
		this.NodeBG.visible = true;
		let x0 = this.NodeBG.x;
		let y0 = this.NodeBG.y;
		let time = 150;
		egret.Tween.get(this.NodeBG).
			to({ alpha: 0 }, 0).
			to({ x: x0, y: y0 }).
			to({ alpha: 1 }, time * 3);
	}

	public onBtnOk() {
		let scene = StageSceneManager.Instance.GetCurScene();
		if (scene != null && scene.pauseAll != null) {
			scene.resumeAll();
		}
		Teach.bAsyncContinue = true;
	}
}
}