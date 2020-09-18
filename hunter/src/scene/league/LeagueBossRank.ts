namespace zj {
//公会BOSS挑战成功或失败后结算
//yuqingchao
//2019.03.06
export class LeagueBossRank extends Dialog {
	private lstView: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossRankSkin.exml"
	}

	public refreash() {
		this.setInfo(Game.PlayerLeagueSystem.leagueBoss.RankList);
	}

	public setInfo(msg) {
		let arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < msg.length; i++) {
			arrayCollection.addItem({
				i,
				info: msg[i]
			})
		}
		this.lstView.dataProvider = arrayCollection;
		this.lstView.itemRenderer = LeagueBossRankItem;
	}
}
}