namespace zj {
export class BattleEnd_WinZorkBoss extends BattleSettle {
	public NodeBoard: eui.Group;
	public SpriteBoardNode: eui.Group;
	public ButtonGoOn: eui.Button;
	public ButtonNextMob: eui.Button;
	public LabelHurt: eui.Label;
	public TableViewHeros: eui.List;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public imgWordTime1: eui.Image;
	public LabelInstanceName: eui.Label;
	public imgWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;

	private bRankCome: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinZorkBossSkin.exml";
		this.ui_name = "BattleEnd_WinZorkBoss";
		this.init();
	}

	private init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this)
	}

	public Load() {
		super.Load();
		this.LabelHurt.text = Math.floor(1).toString();//this.father.total;
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
		this.QuitBossFight();
	}

	private FadeInGet() {

	}
}
}