namespace zj {
export class StageRpgBuild extends StageRpgObject{
	public constructor(node, order) {
		super(node, order);
	}
	public bloodBoard = null
    public bloodBar = null
    public bloodBarWidth = 0
    public bloodBarHeight = 0

    public lastHp = 0
    public buildHp = 0
    public uiHp = -1;

	public release(){
		super.release();
		this.nodeNormal.removeChild(this.bloodBoard);
		this.nodeNormal.removeChild(this.bloodBar);
	}
	public LoadData(){
		this.map_x = this.info.build_x;
		this.map_y = this.info.build_y;
		let screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
		let screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
		this.x = screen_x;
		this.y = screen_y;
	}
	public LoadView(){

	}
	public InitFightBuild( info, scenePosInfo, eType ){
		this.info = info
		this.scenePosInfo = scenePosInfo;
		this.setPositionType(eType);
		this.LoadData();
		this.LoadView();
		this.loadOther();
		this.setRoot(this.x, this.y);
	}
	public loadBloodBar(){

	}
	public loadOther(){
		
	}
}
}