namespace zj {
export class Fight_Pop extends Dialog{
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/FightPopSkin.exml";
		this.scene = StageSceneManager.Instance.GetCurScene();
		this.init();
	}
	public scene;
	public ButtonReturn:eui.Button;
	public ButtonQuit:eui.Button;

	public init(){
		this.ButtonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ButtonReturn_CallBack,this);
		this.ButtonQuit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ButtonQuit_CallBack,this);
	}
	public ButtonReturn_CallBack(){
		this.scene.resumeAll();
		this.scene = null;
		this.close();
	}
	public ButtonQuit_CallBack(){
		this.close();
		StageSceneManager.Instance.clearScene();
		SceneManager.instance.checkFightOver();
	}

}
}