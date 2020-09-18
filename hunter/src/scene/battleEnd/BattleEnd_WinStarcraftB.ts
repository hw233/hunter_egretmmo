namespace zj {
/**
 * @author xingliwei 
 * 
 * @date 2019-5-9
 * 
 * @class 跨服战斗结算胜利
 */
export class BattleEnd_WinStarcraftB extends BattleSettleWinDrop {
	public NodeTitle: eui.Group;
	public NodeBgAni: eui.Group;
	public NodeAni: eui.Group;
	public NodeName: eui.Group;
	public SpriteName: eui.Image;
	public NodeCountent2: eui.Group;
	public HeroNodeBule1_4: eui.Group;
	public HeroNodeBule1_3: eui.Group;
	public HeroNodeBule1_2: eui.Group;
	public HeroNodeBule1_1: eui.Group;
	public BlueWord1: eui.Image;
	public HeroNodeRed1_1: eui.Group;
	public HeroNodeRed1_2: eui.Group;
	public HeroNodeRed1_3: eui.Group;
	public HeroNodeRed1_4: eui.Group;
	public RedWord1: eui.Image;
	public SpriteTeamNum1: eui.Image;
	public NodeCountent3: eui.Group;
	public HeroNodeBule2_4: eui.Group;
	public HeroNodeBule2_3: eui.Group;
	public HeroNodeBule2_2: eui.Group;
	public HeroNodeBule2_1: eui.Group;
	public BlueWord2: eui.Image;
	public HeroNodeRed2_1: eui.Group;
	public HeroNodeRed2_2: eui.Group;
	public HeroNodeRed2_3: eui.Group;
	public HeroNodeRed2_4: eui.Group;
	public RedWord2: eui.Image;
	public SpriteTeamNum2: eui.Image;
	public NodeCountent4: eui.Group;
	public HeroNodeBule3_4: eui.Group;
	public HeroNodeBule3_3: eui.Group;
	public HeroNodeBule3_2: eui.Group;
	public HeroNodeBule3_1: eui.Group;
	public BlueWord3: eui.Image;
	public HeroNodeRed3_1: eui.Group;
	public HeroNodeRed3_2: eui.Group;
	public HeroNodeRed3_3: eui.Group;
	public HeroNodeRed3_4: eui.Group;
	public RedWord3: eui.Image;
	public SpriteTeamNum3: eui.Image;
	public LabelPoints: eui.Label;
	public LabelPointsB: eui.Label;
	public SpriteRewardIcon: eui.Image;
	public LabelReward: eui.Label;
	public ButtonGoOn: eui.Button;
	public NodeTeamAni1: eui.Group;
	public NodeTeamAni2: eui.Group;
	public NodeTeamAni3: eui.Group;


	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinStarcraftBSkin.exml";
		this.ui_name = "BattleEnd_WinStarcraftB";
	}
	public Init() {
		super.Init();
		this.loadSinleItem();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
	}
	public Update(tick) {
		super.Update(tick);
	}

	public SetUI(info) {
		this.SingleInfo = info;
	}

	public FadeInGet() {

	}

	public Load() {
		super.Load();
	}

	private onBtnGoOn() {
		this.close();
		StageSceneManager.Instance.clearScene();
		if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.PlayerArenaSystem.craftQureyList(false)
				.then(() => {
					loadUI(ArenaWhole)
						.then((dialog: ArenaWhole) => {
							dialog.show(UI.SHOW_FROM_TOP);
						});
				})
				.catch((reason) => {
					toast(reason);
				});
		} else {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			// Game.UIManager.popAllScenesAndDialogs();
		}
		egret.clearInterval(this.update);
	}
}
}