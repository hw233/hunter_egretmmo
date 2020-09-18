namespace zj {
export class PlayerLogingSystem {
	public constructor() {
	}
	private panel;
	private isclose = true;
	public init(){
		Game.EventManager.on(GameEvent.OPEN_LOGING_SCENE, this.openPanel, this);//打开事件
        Game.EventManager.on(GameEvent.CLOSE_LOGING_SCENE, this.closePanel, this);//关闭事件
		Game.EventManager.on(GameEvent.LOGING_SCENE_PROGRESS, this.progressHandler, this);//进度事件
	}

	public uninit() {
		this.panel = null;
		this.isclose = true;
	}
	private progressHandler(e){
		if(this.panel){
			this.panel.setImgBar(e.data);
		}
	}
	//开启
	public openPanel(){
		//界面加载
		this.isclose = false;
		loadUI(LodingScene).then((dialog: LodingScene) => {
				this.panel = dialog;
				if(this.isclose == true){
					this.panel.close();
					this.panel = null;
				}else{
					 while (Game.UIManager.dialogCount() > 0) Game.UIManager.popDialog();
					this.panel.show();
					Game.EventManager.event(GameEvent.LOGING_SCENE);
				}
        });
	}
	//关闭
	public closePanel(){
		this.isclose = true;
		if(this.panel){
			this.panel.closeFun();
			this.panel = null;
		}
		
	}
}
}