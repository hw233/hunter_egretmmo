namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-2
	 * 
	 * @class 格斗场战斗结算界面
	 */
	export class BattleEnd_LoseLeagueMonster extends BattleSettleLose {
		public NodeBoard: eui.Group;
		public SpriteBoardNode: eui.Group;
		public LabelHurt: eui.BitmapLabel;
		public ButtonGoOn: eui.Button;
		public ButtonNextMob: eui.Button;
		public ButtonDetail: eui.Button;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public imgWordTime: eui.Image;
		public LabelInstanceName: eui.Label;
		public imgWordTime1: eui.Image;
		public LabelInstanceTime: eui.Label;
		public TableViewHeros: eui.List;

		private bRankCome: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEnd_LoseLeagueMonsterSkin.exml";
			this.ui_name = "BattleEnd_LoseLeagueMonster";
		}

		public Init() {
			super.Init();
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this)
		}

		public Load() {
			super.Load();
		}

		public loadLabel(father: Fight_LeagueBoss) {
			this.LabelHurt.text = Math.floor(father.totalSum).toString();
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

		public onButtonGoOn() {
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
						scene.onGroupAnimal();
					});
			});

		}

		public FadeInGet() {

		}
	}
}