namespace zj {
//LeagueBossRankItem
//yuqingchao
//2019.03.06
export class LeagueBossRankItem extends eui.ItemRenderer {
	private lbRank: eui.Label;
	private lbName: eui.Label;
	private lbNum: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossRankItemSkin.exml"
	}
	protected dataChanged() {
		let i = this.data.i;
		let info = this.data.info;

		let mem = Table.FindR(Game.PlayerLeagueSystem.Members, function (k, v) {
			if (v.monarchbase.id == info.roleId) {
				return true
			}
		})
		this.lbRank.text = info.rank.toString();
		if (mem != null) {
			this.lbName.text = mem[0].monarchbase.name.toString();
		}
		this.lbNum.text = info.value.toString();
	}
}
}