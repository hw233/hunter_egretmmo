namespace zj {
export class Fight_Train extends UI {
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_Instance.exml";
		this.scene = StageSceneManager.Instance.GetCurScene();
	}
	public scene;
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
    public battleQuality = message.EQuality.QUALITY_NONE;
    public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	public update;
	public Init(){
		//this.update = egret.setInterval(this.Update,this,0);
		this.LoadTable();
    	//this.HandleUi();
	}
	public combo_total;
	public combo;

	public LoadTable(){
		let index = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID
		//let tbl = traindb.Table()
		//let dataTbl = tbl[index]

		// this.combo_total = dataTbl.combo_count;
		// this.combo = this.scene.maxCombo;
	}
}
}