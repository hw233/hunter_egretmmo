namespace zj {
//公会BOSS-击杀成功
//yuqingchao
//2019.03.11
export class LeagueBossSccessful extends Dialog {
	private btnGo: eui.Button;		//“走了”按钮
	private btnGoCele: eui.Button;		//“去庆功”按钮
	private groupAdd: eui.Group;
	private leagueBossRank: LeagueBossRank = null;
	private lbKillName: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossSccessfulSkin.exml"
		this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
		this.btnGoCele.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoCele, this);
		let nm = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_killName, Game.PlayerLeagueSystem.leagueBoss.KillName);
		let arr = Game.PlayerLeagueSystem.leagueBoss.RankList;
		this.lbKillName.textFlow = Util.RichText(nm);
		this.leagueBossRank = new LeagueBossRank();
		this.groupAdd.addChild(this.leagueBossRank);
		this.leagueBossRank.refreash();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.leagueBossRank = null;
		}, null);
	}
	private onBtnGo() {
		this.close(UI.SHOW_FROM_BOTTON)
	}
	private onBtnGoCele() {
		let a = Game.PlayerLeagueSystem.Member.is_boss_join;
		if (Game.PlayerLeagueSystem.Member.is_party_join) {
			this.close();
			Game.PlayerLeagueSystem.leaguePartyScene().then(() => {
				loadUI(LeagueBossCelebrate)
					.then((dialog: LeagueBossCelebrate) => {
						dialog.show(UI.SHOW_FROM_TOP);
					});
			})

		} else {
			if (Game.PlayerLeagueSystem.Member.is_boss_join) {
				this.close();
				Game.PlayerLeagueSystem.leaguePartyScene().then(() => {
					loadUI(LeagueBossCelebrate)
						.then((dialog: LeagueBossCelebrate) => {
							dialog.show(UI.SHOW_FROM_TOP);
						});
				})

			} else {
				let des = Helper.StringFormat(TextsConfig.TextConfig_League.animal_goCele, CommonConfig.league_party_consume);
				TipManager.ShowConfirmCancel(des, () => {
					Game.PlayerLeagueSystem.leaguePartyScene().then(() => {
						loadUI(LeagueBossCelebrate)
							.then((dialog: LeagueBossCelebrate) => {
								dialog.show(UI.SHOW_FROM_TOP);
							});
					});
					this.close();
				})

			}
		}

	}
}
}