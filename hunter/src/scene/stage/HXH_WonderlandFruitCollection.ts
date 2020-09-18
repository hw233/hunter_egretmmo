namespace zj {
export class HXH_WonderlandFruitCollection extends UI{
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/HXH_WonderlandFruitCollectionSkin.exml";
		this.scene = StageSceneManager.Instance.GetCurScene();
		this.sceneType = this.scene.sceneType;
		this.Init();
	}
	public SpriteCollectBoard:eui.Image;
	public SpriteCollectBar:eui.Image;
	public SpriteCollectType:eui.Image;



	public scene;
	public sceneType;
	public curFrame = 0;
    public maxFrame = 0;
    public barWidth = 0;
    public barHeight = 0;
    public bUpdate = true;
	public release(){
		this.clearTime();
		this.scene = null;
	}

	public Init(){
		
		this.barWidth = this.SpriteCollectBar.width;
		this.barHeight = this.SpriteCollectBar.height;
		this.SpriteCollectBar.scrollRect = new egret.Rectangle(0,0,0,0);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }, this);
	}
	private Ticktimer;
	public setInfo(frame, type){
		this.clearTime();
		this.SpriteCollectBar.scrollRect = new egret.Rectangle(0,0,0,0);
		this.Ticktimer = egret.getTimer();
		this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
		this.maxFrame = frame || 0;
		this.SpriteCollectType.source = cachekey(UIConfig.UIConfig_RpgScene.controlProgressPic[type],this);
	}
	public Update(tick){
		tick = (egret.getTimer() - this.Ticktimer)/1000;
		this.Ticktimer = egret.getTimer();
		if(this.bUpdate == false || Game.PlayerWonderLandSystem.wonderlandId == 4){
			return;
		}
		this.curFrame = this.curFrame + tick * 1000;
		if(this.curFrame >= this.maxFrame){
			this.curFrame = this.curFrame - this.maxFrame;
			if(this.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
		  	this.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND){
				this.bUpdate = false;     
            	this.scene.playerLeader.endProgress();
				this.clearTime();
		  	}
		}
		let tempRect = new egret.Rectangle(0,0,this.curFrame / this.maxFrame * this.barWidth,this.barHeight);
		this.SpriteCollectBar.scrollRect = tempRect;
	}
	public clearTime(){
		this.bUpdate = true;
		this.curFrame = 0;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
	}
}
}