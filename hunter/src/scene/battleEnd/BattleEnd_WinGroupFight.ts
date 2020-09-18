namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-5
	 * 
	 * @class 飞龙营地胜利结算
	 */
	export class BattleEnd_WinGroupFight extends BattleSettleWinDrop {
		public BattleEnd_WinGroupFight: eui.Group;
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
		public TableViewDrops: eui.List;
		public NodeStar: eui.Group;
		public NodeWin: eui.Group;
		public SpriteWordName: eui.Image;
		public LabelInstanceName: eui.Label;
		public LabelTips: eui.Label;

		private labelRoleInfo;
		private spriteIsWin;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEndWinGroupFightSkin.exml";
			this.ui_name = "BattleEnd_WinGroupFight";
			// this.init();
		}
		public Init() {
			super.Init();
			this.labelRoleInfo = [this.LabelTeamName1, this.LabelTeamName2, this.LabelTeamName3];
			this.spriteIsWin = [this.SpriteResult1, this.SpriteResult2, this.SpriteResult3];
			this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
		};

		public Load() {
			super.Load();
			this.SetFormationInfos();
		}

		private SetFormationInfos() {
			for (let k in this.labelRoleInfo) {
				if (this.labelRoleInfo.hasOwnProperty(k)) {
					let v = this.labelRoleInfo[k];
					let str = "";
					let index = PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos[Number(k)];
					if (index == 3) {
						if (PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo && Object.keys(PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo).length != 0) {
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
			let win_num = 0;
			for (let k in Game.PlayerBattleSystem.battleSingleInfo) {
				if (Game.PlayerBattleSystem.battleSingleInfo.hasOwnProperty(k)) {
					let v = Game.PlayerBattleSystem.battleSingleInfo[k];
					if (v.battleResult == 1) {
						win_num += 1;
					}
				}
			}
			let bLast = TableInstanceGroup.Item(PlayerGroupFightSystem.groupFightDetailsInfo.instanceId + 1) == null;    //  StringConfig_Table.groupFight
			if (PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle == 3 || bLast) {
				//战斗通关或者最后一关
				this.LabelTips.visible = false;
				// this.Spri
			} else {
				let str = "";
				let nextId = (PlayerGroupFightSystem.groupFightDetailsInfo.instanceId + 1) % 10000;
				if (win_num == 2) {
					str = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.win2, nextId);
				} else if (win_num == 3) {
					str = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.win3, nextId)
				}
				this.LabelTips.text = str;
			}
			for (let k in this.spriteIsWin) {
				if (this.spriteIsWin.hasOwnProperty(k)) {
					let v = this.spriteIsWin[k];
					let result = Game.PlayerBattleSystem.battleSingleInfo[Number(k) + 1].battleResult;
					if (result == 0 || result == null) {
						v.visible = false;
					} else {
						v.source = cachekey(UIConfig.UIConfig_Mail.win2[result - 1], this);
					}
				}
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
	}
}