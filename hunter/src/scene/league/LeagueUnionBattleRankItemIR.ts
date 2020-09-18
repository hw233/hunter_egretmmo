namespace zj {
//公会战-公会排行-本服排行
//yuqingchao
//2019.02.21
export class LeagueUnionBattleRankItemIR extends eui.ItemRenderer {
	private lbMyRank: eui.Label;		//排名
	private lbSegment: eui.Label;		//段位（文字）
	private imgMySegment: eui.Image;		//段位（图片）
	private lbMyUnionName: eui.Label;		//公会名称
	private lbMyRankScore: eui.Label;		//排位积分
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleRankItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueUnionBattleRankItemIR"], null);
		this.lbSegment.visible = false;
	}

	protected dataChanged() {
		let info = this.data.info;
		this.lbMyRank.text = info.rank;
		this.imgMySegment.source = cachekey(PlayerLeagueSystem.GetSegment(info.score)[4], this);
		this.lbMyUnionName.text = info.leagueName;
		this.lbMyRankScore.text = info.score;

		this.SetRowColor(info.rank);
	}
	private SetRowColor(rank) {
		let color = ConstantConfig_Common.Color.ub_rank_color;
		let tcolor;
		if (rank < 4) {
			tcolor = color[rank - 1];
		} else if (rank >= 4 && rank <= 20) {
			tcolor = color[3];
		}

		this.lbMyRank.textColor = tcolor;
		this.lbMyUnionName.textColor = tcolor;
		this.lbMyRankScore.textColor = tcolor;
	}
}
}