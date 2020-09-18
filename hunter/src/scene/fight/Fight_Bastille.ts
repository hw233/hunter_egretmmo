namespace zj {
export class Fight_Bastille extends UI{
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_Instance.exml";
	}
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;

	public totalDamage = 0;
	public maxCombo = 0;
	public rewardAdd = 0;
	public formation = {};

	public tblDamage = {};
	public tblMaxCombo = {};
	public addMax = -1

	public uiCombo = 0
	public uiDamage = Helper.StringFormat("%d", 0);
	public uiNumberScale = 1.0

	public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
	public battleQuality = message.EQuality.QUALITY_NONE;
	public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	public update;

	public Init(){
		//this.update = egret.setInterval(this.Update,this,0);

		this.LoadTable();
		this.LoadData();
		this.HandleUi();
	}
	public baseCount;
	public LoadTable(){
		let scene = StageSceneManager.Instance.GetCurScene();
		let tableInstance = TableInstanceVillage.Table();
		this.tblDamage = tableInstance[scene.instanceId].total_damage;
		this.tblMaxCombo = tableInstance[scene.instanceId].max_combo;
		this.addMax = tableInstance[scene.instanceId].add_max;

		if(Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY){
			this.baseCount = tableInstance[scene.instanceId].goodses[0][1];
		}else if(Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP){
			let exp_id = tableInstance[scene.instanceId].goodses[0][0];
			let exp_count = tableInstance[scene.instanceId].goodses[0][1];
			let obj = PlayerItemSystem.Item(exp_id);
			this.baseCount = obj["general_exp"] * exp_count;
		}
	}
	public LoadData(){
		let scene = StageSceneManager.Instance.GetCurScene();
		this.formation = Game.PlayerFormationSystem.curFormations[scene.formationType];
	}
	public HandleUi(){
		//伤害转转钱
		// if(Game.PlayerInstanceSystem.curInstanceType == message.EInstanceType.MONEY){
		// 	this.LabelTitle1st:setString(TextsConfig_Bastille.btl_total_damage)
		// 	local tmp = getMillionNum(self.baseCount)
		// 	self.LabelBase:setString(tmp..TextsConfig_Bastille.btl_money)
		// }
	}
}
}