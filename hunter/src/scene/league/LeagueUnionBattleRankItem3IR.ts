namespace zj {
//公会战-公会排行-世界排行
//yuqingchao
//2019.02.21
export class LeagueUnionBattleRankItem3IR extends eui.ItemRenderer {
	private lbSeverName: eui.Label;		//服务器名
	private lbUnion1: eui.Label;		//第一公会名
	private lbUnion2: eui.Label;		//第二公会名
	private lbUnion3: eui.Label;		//第三工会名
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleRankItem3Skin.exml";
	}

	protected dataChanged() {
		let info = this.data.info;
		this.lbSeverName.text = info["server"];
		this.lbUnion1.text = info["union1"];
		this.lbUnion2.text = info["union2"];
		this.lbUnion3.text = info["union3"];
	}
}
}