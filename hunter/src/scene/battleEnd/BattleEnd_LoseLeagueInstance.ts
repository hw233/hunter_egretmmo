namespace zj {
export class BattleEnd_LoseLeagueInstance extends BattleSettleLose {
	public BattleEnd_Win: eui.Group;
	public AdaptBoard: eui.Group;
	public NodeBoard: eui.Group;
	public TableViewDrops: eui.List;
	public ButtonGoOn: eui.Button;
	public ButtonNextMob: eui.Button;
	public TableViewHeros: eui.List;
	public LabelHurt: eui.BitmapLabel;
	public ButtonDetail: eui.Button;
	public NodeStar0: eui.Group;
	public NodeWin0: eui.Group;
	public SpriteWordName: eui.Image;
	public LabelInstanceName: eui.Label;
	public SpriteWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;
	private bRankCome: boolean;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_LoseLeagueInstanceSkin.exml";
		this.ui_name = "BattleEnd_LoseLeagueInstance";
	}

	public Init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
		let damageValue = this.scene.getTotalDamageValue();
		this.LabelHurt.text = Math.floor(damageValue).toString();
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
	}

	public Load() {
		super.Load();
		// this.LabelHurt.text = Math.floor(this.total)
	}

	public Update(tick) {
		super.Update(tick);
	}

	public UpdateLeagueBoss(tick) {
		if (this.total_tick >= ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
			this.bRankCome = true;
			this.FadeInGet();
		}
	}

	private onButtonGoOn() {
		this.close();
		StageSceneManager.Instance.clearScene();
		// Game.UIManager.popAllScenesAndDialogs();
		egret.clearInterval(this.update);
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		// loadUI(LeagueHomeScene)
		// 	.then((scene: LeagueHomeScene) => {
		// 		scene.show(UI.SHOW_FROM_TOP);
		// 		scene.init();
		// 		scene.onGroupInstance();
		// 	});
	}

	private FadeInGet() {

	}
}
}