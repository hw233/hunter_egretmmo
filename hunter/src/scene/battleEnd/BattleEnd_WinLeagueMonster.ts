namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-4
 * 
 * @class 公会Boos
 */
export class BattleEnd_WinLeagueMonster extends BattleSettleWinDrop {
	public BattleEnd_Win: eui.Group;
	public AdaptBoard: eui.Group;
	public NodeBoard: eui.Group;
	public ButtonGoOn: eui.Button;
	public ButtonNextMob: eui.Button;
	public TableViewHeros: eui.List;
	public LabelHurt: eui.Label;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public SpriteWordName: eui.Image;
	public LabelInstanceName: eui.Label;
	public SpriteWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;

	public bRankCome = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinLeagueMonsterSkin.exml";
		this.ui_name = "BattleEnd_WinLeagueMonster";
	}
	public Init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);

	}
	public Load() {
		super.Load();
	}

	public loadLabel(father: Fight_LeagueBoss) {
		this.LabelHurt.text = Math.floor(father.totalSum).toString();
	}

	public onButtonGoOn() {
		this.close();
		StageSceneManager.Instance.clearScene();
		egret.clearInterval(this.update);
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		Game.PlayerLeagueSystem.leagueBoss.KillName = Game.PlayerInfoSystem.BaseInfo.name;
		Game.UIManager.popAllScenesAndDialogs(() => {
			loadUI(LeagueHomeScene)
				.then((scene: LeagueHomeScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init();
					loadUI(LeagueBossSccessful)
						.then((dialog: LeagueBossSccessful) => {
							dialog.show(UI.SHOW_FROM_TOP);
						})
				});
		});
	}

	public Update(tick) {
		super.Update(tick);
		this.updateWanted();
	}

	public updateWanted() {
		if (this.total_tick >= ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
			this.bRankCome = true;
		}
	}
}
}