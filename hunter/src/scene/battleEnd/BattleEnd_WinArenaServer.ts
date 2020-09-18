namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-2
 * 
 * @class 格斗场战斗结算界面
 */
export class BattleEnd_WinArenaServer extends BattleSettleWinDrop {
	public NodeBoard: eui.Group;
	public SpriteNoDropTip: eui.Image;
	public LabelOldRanl: eui.Label;
	public LabelCurRank: eui.Label;
	public LabelCurRaise: eui.Label;
	public SpriteGet: eui.Image;
	public SpriteMoney: eui.Image;
	public LabelMoney: eui.Label;
	public SpriteArena: eui.Image;
	public LabelArena: eui.Label;
	public ButtonGoOn: eui.Button;
	public ButtonShare: eui.Button;
	public TableViewHeros: eui.List;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public SpriteWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;

	private bRankCome: boolean = false;
	private father: licenseMain;
	private ranking: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinArenaServerSkin.exml";
		this.ui_name = "BattleEnd_WinArenaServer";
		if (Device.isReviewSwitch) {
			this.ranking.visible = false;
			this.SpriteMoney.x = 40;
			this.SpriteMoney.y = 40;
		}
	}


	public Init() {
		// ArenaMainScene.roleFormationInfo = null;
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
		// Game.PlayerArenaSystem.ladderList(true).then((data: any) => {
		// 	ArenaMainScene.roleFormationInfo = data;
		// });
		super.Init();
	}

	public setInfo(father: licenseMain) {
		this.father = father;
	}
	public FadeInCur() {
		if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			this.LabelOldRanl.visible = false;
			this.LabelCurRank.visible = false;
			this.LabelCurRaise.visible = false;
			this.SpriteNoDropTip.visible = false;
		} else {
			this.LabelOldRanl.visible = true;
			this.LabelCurRank.visible = true;
			this.LabelCurRaise.visible = true;
			this.SpriteNoDropTip.visible = true;
		}
		this.LabelOldRanl.text = Gmgr.Instance.arenaRank.toString();
		if (Gmgr.Instance.arenaRank != Game.PlayerInfoSystem.BaseInfo.ladderRank || Game.PlayerInfoSystem.BaseInfo.ladderRank == 1) {
			this.bRankCome = true;
		}
		let cur = yuan3(Gmgr.Instance.arenaRank - Game.PlayerInfoSystem.BaseInfo.ladderMax < 0, Gmgr.Instance.arenaRank, Game.PlayerInfoSystem.BaseInfo.ladderMax);
		this.LabelCurRank.text = cur;
		let raise = yuan3(Gmgr.Instance.arenaRank - Game.PlayerInfoSystem.BaseInfo.ladderMax < 0, 0, Gmgr.Instance.arenaRank - Game.PlayerInfoSystem.BaseInfo.ladderMax);
		this.LabelCurRaise.text = raise;
	}
	private FadeInGet() {
		if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			this.LabelMoney.visible = false;
			this.LabelArena.visible = false;
			this.SpriteMoney.visible = false;
			this.SpriteGet.visible = false;
			this.SpriteArena.visible = false;
		} else {
			this.LabelMoney.visible = true;
			this.LabelArena.visible = true;
			this.SpriteMoney.visible = true;
			this.SpriteGet.visible = true;
			this.SpriteArena.visible = true;
		}
		this.LabelMoney.text = this.scene.getItemInfo.coin;
		this.LabelArena.text = this.scene.getItemInfo.arena;
	}

	public Load() {
		super.Load();
	}

	public Update(tick) {
		super.Update(tick);
		this.updateArena();
		if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			this.ButtonShare.visible = false;
		}
	}

	private onButtonGoOn() {
		egret.clearInterval(this.update);
		this.close();
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
			let tmp = () => {
				// Game.UIManager.popAllScenesAndDialogs();
				//关闭战斗
				loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
					Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
						ArenaMainScene.roleFormationInfo = data;
						dialog.setInfo(data, () => {
						});
					});
					dialog.show(UI.SHOW_FROM_TOP);
				});
			}
			StageSceneManager.Instance.clearScene();
			SceneManager.instance.EnterMainCityNew(tmp);
		} else {
			Game.UIManager.popAllScenesAndDialogs();
		}
	}

	private updateArena() {
		if (this.bRankCome == false) {
			this.FadeInCur();
			this.FadeInGet();
		}
	}
	public SetSettleCb(cb) {
		super.SetSettleCb(cb);
	}
}
}