namespace zj {
export class Fight_ZorkBoss extends UI {
	public constructor() {
	super();
		this.skinName = "resource/skins/fight/Fight_Instance.exml";
	}
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
    public battleQuality = message.EQuality.QUALITY_NONE;
    public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	public update;
	public bossHp = 0;
	public timer = 2000;
	public totalSum = 0;

	public Init(){
		let scene = StageSceneManager.Instance.GetCurScene();
		this.update = egret.setInterval(this.Update,this,0);
		this.bossHp = scene.bossInstance.getHp();
	}
	public getSumHurt( bclear ){
		let scene = StageSceneManager.Instance.GetCurScene();
		let sumHurt = 0;
		for(let k in scene.tableAllys){
			let v = scene.tableAllys[k];
			if(v != null){
				sumHurt = sumHurt + v.bossHurtValue;
				if(bclear == true){
					v.bossHurtValue = 0;
				}
			}
		}

		for(let k in scene.tableAllySupports){
			let v = scene.tableAllySupports[k];
			if(v != null){
				sumHurt = sumHurt + v.bossHurtValue;
				if(bclear == true){
					v.bossHurtValue = 0;
				}
			}
		}
		return sumHurt;
	}
	public timeHp( tick ){
		let scene = StageSceneManager.Instance.GetCurScene();
		if(scene.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		this.timer = this.timer + tick * 1000;
		if(this.timer >= 2000){
			this.timer = 0;
			let sumHurt = this.getSumHurt(true);
			this.timeReq(sumHurt);
		}
	}
	public timeReq( value ){
		let req = new message.BossSynchronousHurtRequest();
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
    	req.body.hurtValue = value;
		this.totalSum = this.totalSum + value;
		Game.Controller.send(req, this.ZorkBossHurt_Visit, null, this, false);
	}
	public ZorkBossHurt_Visit(req: aone.AoneRequest, resp: aone.AoneResponse){
		let response = <message.BossSynchronousHurtResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		this.freshBossHp(response.body.value);
	}
	public freshBossHp( hp ){
		let scene = StageSceneManager.Instance.GetCurScene();
		if(scene.bBossDead == true){
			return;
		}
		if(scene.bossInstance != null){
			let curHp = scene.bossInstance.getHp();
			let a = hp - this.getSumHurt(false);
			if(a < 0){
				a = 0;
			}
			scene.bossInstance.setHp( a );
		}
	}
	public Update(dt){
		dt = 1/30;
		let scene = StageSceneManager.Instance.GetCurScene();
		if(Gmgr.Instance.bInLoading == true){
			return;
		}
		this.timeHp( dt );
		if(scene.bBalance == false){
			return;
		}
		if(this.stopChannelTag == false && scene.bBossEnding == false){
            this.NetData();
            this.OpenBattleNet();
			this.stopChannelTag = true;
		}
	}
	private time_id;
	public OpenBattleNet(){
		// this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
	}
	public EndBattleNet(){
		egret.clearInterval(this.time_id);
		this.time_id = -1;
	}
	public NetData(){
		if(Gmgr.Instance.bDisconnectNet == true){
			return;
		}
		this.DealLoseData();
		this.ChallengeMobReq();
	}
	public DealWinData(){
		let scene = StageSceneManager.Instance.GetCurScene();
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN; 
		this.battleQuality = message.EQuality.QUALITY_F;
		this.battleStar = message.EBattleStar.BATTLE_STAR_3;
		let battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = battleInfo;
	}
	public DealLoseData(){
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_B;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}
	public ChallengeMobReq(){
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.BossBattleRequest();
		let sum = this.getSumHurt(true);
		this.totalSum = this.totalSum + sum;
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		req.body.totalDamage = this.totalSum;
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
		Game.Controller.send(req, this.BossBattle_Visit, null, this, false);
	}
	public BossBattle_Visit(req: aone.AoneRequest, resp: aone.AoneResponse){
		let scene = StageSceneManager.Instance.GetCurScene();
		this.EndBattleNet();
		let response = <message.BossBattleResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerZorkSystem.zork.roleInfo = response.body.roleInfo;
		if(scene.bBossEnding == false && response.body.is_kill == false){
			this.BossEntryReq();
		}
	}
	public quit(){
		Game.PlayerBattleSystem.goBattleBefore();
	}
	public BossEntryReq(){
		let req = new message.BossEntryRequest();
		req.body.scene_x = Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem.scene_x;
    	req.body.scene_y = Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem.scene_y;
		// Game.PlayerWonderLandSystem.willGoRpg();
		Game.Controller.send(req, this.BossEntryReqBody_Visit, null, this, false);
	}
	public BossEntryReqBody_Visit(req: aone.AoneRequest, resp: aone.AoneResponse){
		let response = <message.BossEntryResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerWonderLandSystem.scenePosInfo = {};
		Game.PlayerWonderLandSystem.timePosInfo = {};
		PlayerWonderLandSystem.MapHeight = 960;
		response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
		Game.PlayerZorkSystem.zorkBoss.inZorkBoss = true
		Game.PlayerZorkSystem.zorkBoss.roleInfo = response.body.roleInfo;
		Game.PlayerZorkSystem.zorkBoss.serverSceneId = response.body.sceneId;
		Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
		StageSceneManager.Instance.ChangeScene(StageSceneZorkBoss);
	}
	public QuitBossFight(){
	// 	local function tmp()
    //     Gmgr.bPause = false
    //     Gmgr.bReplay = false
        
    //     PushUI("HXH_Wonderland")
    //     --PushUI("Zork_BossMainPop") 
    // end        
    // StageSceneManager:ChangeScene(StageSceneCity, tmp)
	}
	public OnExit(){
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
	}
}
}