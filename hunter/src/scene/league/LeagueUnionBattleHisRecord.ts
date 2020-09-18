namespace zj {
//历史战绩
//YUQINGCHAO
export class LeagueUnionBattleHisRecord extends Dialog {
	private btnBattleRecord: eui.Button;			//战斗记录
	private btnContributionRanking: eui.Button;		//贡献排名
	private btnClose: eui.Button;					//关闭按钮
	private groupRecord: eui.Group;					//战斗记录
	private groupRanking: eui.Group;				//贡献排名
	private lstView: eui.List;
	private lstView1: eui.List;

	private arrayCollection: eui.ArrayCollection;
	private arrayCollection1: eui.ArrayCollection;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordSkin.exml";

		this.btnBattleRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBattleRecord, this);
		this.btnContributionRanking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContrbutionRanking, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

		this.onBtnBattleRecord();
	}

	private onBtnBattleRecord() {
		//战斗记录  默认
		this.btnBattleRecord.currentState = "down";
		this.btnContributionRanking.currentState = "up";
		this.groupRecord.visible = true;
		this.groupRanking.visible = false;
		Game.PlayerLeagueSystem.leagueMatchFortressRecord(true, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_HISTORY, 0)
			.then((arr: Array<message.LeagueRecord>) => {
				this.loadList(arr);
			});
	}

	private onBtnContrbutionRanking() {
		//贡献排名
		this.btnBattleRecord.currentState = "up";
		this.btnContributionRanking.currentState = "down";
		this.groupRecord.visible = false;
		this.groupRanking.visible = true;
		Game.PlayerLeagueSystem.leagueMemberStatic()
			.then((arr: Array<message.MemberStatic>) => {
				this.loadList1(arr);
			});
	}

	/*************************战斗记录**************************/
	private loadList(arr: Array<message.LeagueRecord>) {
		arr.sort(function (a, b) {
			return a.generate_time - b.generate_time;
		})
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < arr.length; i++) {
			this.arrayCollection.addItem({
				value: arr[i],
			});
		}

		this.lstView.itemRenderer = LeagueUnionBattleHisRecordItem;
		this.lstView.dataProvider = this.arrayCollection;
	}

	/*************************贡献排名**************************/
	private loadList1(arr: Array<message.MemberStatic>) {
		arr.sort(function (a, b) {
			return b.weekMatchBattleScore - a.weekMatchBattleScore
		})
		this.arrayCollection1 = new eui.ArrayCollection();
		for (let i = 0; i < arr.length; i++) {
			this.arrayCollection1.addItem({
				info: arr[i],
				id: i + 1
			});
		}

		this.lstView1.itemRenderer = LeagueUnionBattleHisRecordItem1;
		this.lstView1.dataProvider = this.arrayCollection1;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}