namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-3
 * 
 * @class 工会战战斗结算界面
 */
export class BattleEnd_WinMatchServer extends BattleSettleWinDrop {
	public NodeBoard: eui.Group;
	public SpriteGet: eui.Image;
	public SpriteMoney: eui.Image;
	public LabelMoney: eui.Label;
	public ButtonGoOn: eui.Button;
	public ButtonShare: eui.Button;
	public TableViewHeros: eui.List;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public SpriteWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;

	private bRankCome: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinMatchServerSkin.exml";
		this.ui_name = "BattleEnd_WinMatchServer";
		this.Init();
	}
	public Init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this)
	}

	public Update(tick) {
		super.Update(tick);
		this.updateArena();
		this.ButtonShare.visible = false;
	}
	public Load() {
		super.Load();
	}

	private onBtnGoOn() {
		this.close();
		StageSceneManager.Instance.clearScene();
		egret.clearInterval(this.update);
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		Game.UIManager.popAllScenesAndDialogs(() => {
			loadUI(LeagueHomeScene)
				.then((scene: LeagueHomeScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init();
					scene.onGroupUnionBattle();
				});
		});
	}

	private FadeInGet() {
		this.LabelMoney.text = this.scene.getItemInfo.league;
	}

	private updateArena() {
		if (this.bRankCome == false) {
			this.bRankCome = true;
			this.FadeInGet();
		}
	}

	public SetSettleCb(cb){
		super.SetSettleCb(cb);
	}
	
}
}