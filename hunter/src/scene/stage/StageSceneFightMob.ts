namespace zj {
export class StageSceneFightMob extends StageSceneFightInLeauge{
	public constructor(node, order) {
		super(node, order);
		this.setPlayerState( EnumPlayerState.PLAYER_STATE_FIGHT_OTHER );
	}
	public createWonderlandMob( scenePosInfo, floor, x, y, dir, moveDis, verDis ){
		this.setPlayerInfo( scenePosInfo.roleBase )
		this.commonCreate( floor, x, y, dir, moveDis, verDis )
		this.dealSceneNotice(scenePosInfo);
	}
	public init(){
		this.parseInfo();
		this.loadDB();
		this.loadNormalSpx();
		this.loadBody();
		this.loadLedAni();
		this.loadBloodBar();   
		this.loadLvTitle();
		this.loadNameTitle();
		this.loadSpeed();
		this.loadScale();
	}
	public loadBloodBar(){
		this.loadBloodBarBoard()
    	this.loadBloodBarProgress(UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar);
	}
	public getNameColor(){
		return ConstantConfig_Common.Color.red;
	}
	public parseInfo(){
		this.mapRoleId = this.playerInfo.picId;
		let lang = Game.LanguageManager.getLang();
		if(TableLanguage.Item(this.playerInfo.name)){
			this.name = TableLanguage.Item(this.playerInfo.name)[lang];
		}
	}
	public procDieProtect( tick ){

	}
	public procOtherDie( tick ){
		super.procOtherDie(tick);
		this.procStay( tick );
		return false;
	}
	public procStay( tick ){
		let rt = tick * 1000;
		if(this.dieStayMs > 0){
			this.dieStayMs = this.dieStayMs - rt;
			if(this.dieStayMs <= 0){
				this.setCanRemove();
			}
		}
	}
	public isAgreeEnter(){
		return true;
	}
}
}