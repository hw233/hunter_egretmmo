namespace zj {
	export class BattleEnd_WinLeagueInstance extends BattleSettleWinDrop {
		public NodeBoard: eui.Group;
		public SpriteBoardNode: eui.Group;
		public ButtonGoOn: eui.Button;
		public ButtonNextMob: eui.Button;
		public LabelHurt: eui.Label;
		public TableViewDrops: eui.List;
		public ButtonDetail: eui.Button;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public imgWordTime0: eui.Image;
		public LabelInstanceName: eui.Label;
		public imgWordTime2: eui.Image;
		public LabelInstanceTime: eui.Label;
		private bRankCome: boolean;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEnd_WinLeagueInstanceSkin.exml";
			this.ui_name = "BattleEnd_WinLeagueInstance";
		}
		public Init() {
			super.Init();
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
		};
		public Load() {
			super.Load();
			this.LabelHurt.text = Math.floor(this.scene.getTotalDamageValue()).toString();
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
			egret.clearInterval(this.update);
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(LeagueHomeScene)
					.then((scene: LeagueHomeScene) => {
						scene.show(UI.SHOW_FROM_TOP);
						scene.init();
						scene.onGroupInstance();
					});
			});

		}

		private FadeInGet() {

		}
	}
}