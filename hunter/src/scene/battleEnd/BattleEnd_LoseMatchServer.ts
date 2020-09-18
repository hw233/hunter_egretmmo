namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-3
	 * 
	 * @class 工会战战斗结算界面
	 */
	export class BattleEnd_LoseMatchServer extends BattleSettleLose {
		public NodeBoard: eui.Group;
		public ButtonGoOn: eui.Button;
		public ButtonShare: eui.Button;
		public TableViewHeros: eui.List;
		public ButtonCause1: eui.Group;
		public SpriteCauseIcon1: eui.Image;
		public SpriteCauseWord1: eui.Image;
		public SpriteBoardNode: eui.Group;
		public ButtonCause2: eui.Group;
		public SpriteCauseIcon2: eui.Image;
		public SpriteCauseWord2: eui.Image;
		public ButtonDetail: eui.Button;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public SpriteWordTime: eui.Image;
		public LabelInstanceTime: eui.Label;
		public SpriteStarNode: eui.Group;
		public SpriteFireNode: eui.Group;
		public SpriteFanNode: eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEnd_LoseMatchServerSkin.exml";
			this.ui_name = "BattleEnd_LoseMatchServer";
		}

		public Init() {
			super.Init();
			// this.loadSinleItem();
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
		}
		public Update(tick) {
			super.Update(tick);
			this.ButtonShare.visible = false;
		}

		public FadeInGet() {

		}

		public Load() {
			super.Load();
		}

		private onBtnGoOn() {
			this.close();
			egret.clearInterval(this.update);
			StageSceneManager.Instance.clearScene();
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(LeagueHomeScene)
					.then((scene: LeagueHomeScene) => {
						scene.init();
						scene.show(UI.SHOW_FROM_TOP);
						scene.onGroupUnionBattle();
					});
			});
		}
	}
}