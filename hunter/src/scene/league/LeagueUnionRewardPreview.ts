namespace zj {
//公会战奖励预览
//YUQINGCHAO
export class LeagueUnionRewardPreview extends Dialog {

	private btnClose: eui.Button;
	private btnSegment: eui.Button;
	private btnRank: eui.Button;
	private groupSegment: eui.Group;
	private groupRank: eui.Group;
	private arrCollection: eui.ArrayCollection;
	private arrCollection1: eui.ArrayCollection;
	private lstAward: eui.List;
	private lstAward0: eui.List;
	private lbLins: eui.Label;
	private lbLins0: eui.Label;
	private lbMyScore: eui.Label;
	private lbMyRank: eui.Label;
	private imgMysegment: eui.Image;
	private lbDes: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionRewardPreviewSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnSegment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSegment, this);
		this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRank, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.onBtnSegment();
	}

	//段位奖励  默认
	private onBtnSegment() {
		this.btnSegment.currentState = "down";
		this.btnRank.currentState = "up";
		this.groupSegment.visible = true;
		this.groupRank.visible = false;
		this.imgMysegment.source = cachekey(PlayerLeagueSystem.GetSegment(Game.PlayerLeagueSystem.BaseInfo.match_score)[4], this);
		this.lbDes.text = TextsConfig.TextsConfig_Match.rank[7];

		this.setInfo();
	}

	//排位奖励
	private onBtnRank() {
		this.btnSegment.currentState = "up";
		this.btnRank.currentState = "down";
		this.groupSegment.visible = false;
		this.groupRank.visible = true;
		this.lbDes.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.rank[8], Game.PlayerLeagueSystem.Member.weekMatchBattleTime);

		this.setInfo1();
	}

	/************************段位奖励************************/
	private setInfo() {
		let dee = TextsConfig.TextsConfig_Match.rank[2];
		this.lbLins.textFlow = Util.RichText(dee);
		this.lbMyScore.text = Game.PlayerLeagueSystem.BaseInfo.match_score.toString();

		this.loadList();
	}

	private loadList() {
		let tbScore = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchScore + ".json");		//公会战段位奖励表
		this.arrCollection = new eui.ArrayCollection();
		for (let i = Object.keys(tbScore).length; i > 0; i--) {
			this.arrCollection.addItem({
				i,
				father: this
			});
		}

		this.lstAward.itemRenderer = LeagueUnionRewarPreviewItem;
		this.lstAward.dataProvider = this.arrCollection;
	}
	/************************排位奖励************************/
	private setInfo1() {
		let dee = TextsConfig.TextsConfig_Match.rank[3];
		this.lbLins0.textFlow = Util.RichText(dee);
		this.lbMyRank.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Contend.mineRank, Game.PlayerLeagueSystem.BaseInfo.match_rank)
		this.loadList1();
	}

	private loadList1() {
		let tbRank = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchRank + ".json");		//公会战排位奖励表
		this.arrCollection1 = new eui.ArrayCollection();
		for (let i = 0; i < Object.keys(tbRank).length; i++) {
			this.arrCollection1.addItem({
				i,
				father: this
			});
		}

		this.lstAward0.itemRenderer = LeagueUnionRewarPreviewItem1;
		this.lstAward0.dataProvider = this.arrCollection1;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	//鼠标抬起，移除  掉落 材料说明
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}

}
}