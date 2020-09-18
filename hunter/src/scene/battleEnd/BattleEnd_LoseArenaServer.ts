namespace zj {
export class BattleEnd_LoseArenaServer extends BattleSettleLose {
	public NodeBoard: eui.Group;
	public ButtonGoOn: eui.Button;
	public ButtonShare: eui.Button;
	public TableViewHeros: eui.List;
	// public ButtonCause1: eui.Group;
	public SpriteCauseIcon1: eui.Image;
	public SpriteCauseWord1: eui.Image;
	// public ButtonCause2: eui.Group;
	public SpriteCauseIcon2: eui.Image;
	public SpriteCauseWord2: eui.Image;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public SpriteWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_LoseArenaServerSkin.exml";
		this.ui_name = "BattleEnd_LoseArenaServer";
	}


	public Init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
	}
	public Update(tick) {
		super.Update(tick);
		// this.updateArena();
		if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			this.ButtonShare.visible = false;
		}
	}

	public Load() {
		super.Load();
	}


	private onBtnGoOn() {
		this.close();
		StageSceneManager.Instance.clearScene();
		if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
				if (ArenaMainScene.roleFormationInfo) {
					dialog.setInfo(ArenaMainScene.roleFormationInfo, () => {
					});
				} else {
					Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
						ArenaMainScene.roleFormationInfo = data;
						dialog.setInfo(data, () => {
							
						});
					});
				}
				dialog.show(UI.SHOW_FROM_TOP);
			});


		} else {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs();
		}
		egret.clearInterval(this.update);
	}

}
}