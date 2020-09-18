namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-5
	 * 
	 * @class 飞龙营地失败结算
	 */
	export class BattleEnd_LoseGroupFight extends BattleSettleLose {
		public BattleEnd_LoseGroupFight: eui.Group;
		public AdaptBoard: eui.Group;
		public NodeBoard: eui.Group;
		public ButtonGoOn: eui.Button;
		public ButtonNextMob: eui.Button;
		public LabelTeamName1: eui.Label;
		public SpriteResult1: eui.Image;
		public LabelTeamName2: eui.Label;
		public SpriteResult2: eui.Image;
		public LabelTeamName3: eui.Label;
		public SpriteResult3: eui.Image;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public SpriteWordName: eui.Image;
		public LabelInstanceName: eui.Label;
		public LabelTips: eui.Label;
		private bRankCome: boolean = false;

		private labelRoleInfo;
		private spriteIsWin;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEndLoseGroupFightSkin.exml";
			this.ui_name = "BattleEnd_LoseGroupFight";
		}
		public Init() {
			super.Init();

			this.labelRoleInfo = {
				[0]: this.LabelTeamName1,
				[1]: this.LabelTeamName2,
				[2]: this.LabelTeamName3,
			}

			this.spriteIsWin = {
				[0]: this.SpriteResult1,
				[1]: this.SpriteResult2,
				[2]: this.SpriteResult3,
			}

			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
		};

		public FadeInGet() {

		}

		public Load() {
			super.Load();
			this.SetFormationInfos();
		}

		public Update(tick) {
			super.Update(tick);
			this.UpdateZorkBoss()
		}

		public UpdateZorkBoss() {
			if (this.total_tick >= ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
				this.bRankCome = true;
				this.FadeInGet();
			}
		}

		private onButtonGoOn() {
			Gmgr.Instance.bPause = false;
			Gmgr.Instance.bReplay = false;
			StageSceneManager.Instance.clearScene();
			this.close();
			Game.UIManager.popAllScenesAndDialogs(() => {
				loadUI(HXH_GroupFightMain)
					.then((scene: HXH_GroupFightMain) => {
						scene.Init();
						scene.show(UI.SHOW_FROM_TOP);
					});
			});
		}

		public SetFormationInfos() {
			for (let k in this.labelRoleInfo) {
				if (this.labelRoleInfo.hasOwnProperty(k)) {
					let v = this.labelRoleInfo[k];
					let str = "";
					let index = PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos[Number(k)];
					if (index == 3) {
						if (PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.name || Object.keys(PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo).length != 0) {
							str = "Lv." + PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.level + " " + Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.teamName, PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.name)
						} else {
							str = TextsConfig.TextsConfig_GroupFight.noFriend
						}
					} else {
						str = "Lv." + Game.PlayerInfoSystem.BaseInfo.level + " " + TextsConfig.TextsConfig_GroupFight.myTeamName[index - 1];
					}
					v.text = str;
				}
			}
			for (let k in this.spriteIsWin) {
				if (this.spriteIsWin.hasOwnProperty(k)) {
					let v = this.spriteIsWin[k];
					let result = Game.PlayerBattleSystem.battleSingleInfo[Number(k) + 1].battleResult;
					if (result == 0 || result == null) {
						v.visible = false;
					} else {
						v.source = cachekey(UIConfig.UIConfig_Mail.win[result - 1], this);
					}
				}
			}
		};


	}
}