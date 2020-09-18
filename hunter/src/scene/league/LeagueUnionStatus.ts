namespace zj {
//公会状态
//yuqingchao
//2019.02.27
export class LeagueUnionStatus extends Dialog {
	private btnMemberInfo: eui.Button;
	private btnDefensiveStatus: eui.Button;
	private btnClose: eui.Button;

	private group0: eui.Group;
	private group1: eui.Group;

	private lstView0: eui.List;
	private lstView1: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private arrayCollection1: eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionStatusSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnMemberInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMemberInfo, this);
		this.btnDefensiveStatus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDefensiveStatus, this);

		this.onBtnMemberInfo();
	}
	//玩家信息	默认
	private onBtnMemberInfo() {
		this.btnMemberInfo.currentState = "down";
		this.btnDefensiveStatus.currentState = "up";
		this.group0.visible = true;
		this.group1.visible = false;
		Game.PlayerLeagueSystem.leagueMemberStatic()
			.then((arr: Array<message.MemberStatic>) => {
				this.loadList(arr);
			})
	}
	//防守状态
	private onBtnDefensiveStatus() {
		this.btnDefensiveStatus.currentState = "down";
		this.btnMemberInfo.currentState = "up";
		this.group0.visible = false;
		this.group1.visible = true;
		Game.PlayerLeagueSystem.leagueMatchOpponentFortress(Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo.leagueId, 0, true)
			.then((resp: { matchInfo: message.LeagueMatchInfo, battleInfo: message.LeagueMatchBattleFortressInfo, selfInfo: message.LeagueMatchInfo, leagueBattles: Array<message.leagueBattleName> }) => {
				let enemyInfoTB = {};
				let enemyinfo = resp.matchInfo.fortressStar;
				for (let v of enemyinfo) {
					enemyInfoTB[v.key] = v.value
				}
				let selfInfoTB = [[], [], [], [], []];
				let selfInfo = resp.selfInfo.leagueFortress;
				for (let v of selfInfo) {
					let temp = v;
					temp["isBreak"] = (enemyInfoTB[v.index] != null);
					selfInfoTB[v.type - 1].push(temp);
				}
				for (let i = selfInfoTB.length - 1; i > 0; i--) {
					if (selfInfoTB[i] == null) {
						selfInfoTB[i].splice(i, 1);
					}
				}
				this.loadList1(selfInfoTB);
			})
	}

	private loadList(arr: Array<message.MemberStatic>) {
		arr.sort(function (a, b) {
			return b.dailyMatchBattleScore - a.dailyMatchBattleScore;
		});
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < arr.length; i++) {
			this.arrayCollection.addItem({
				info: arr[i],
				id: i + 1
			})
		}
		this.lstView0.dataProvider = this.arrayCollection;
		this.lstView0.itemRenderer = LeagueUnionStatusItem;
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
	private loadList1(selfInfoTB) {
		this.arrayCollection1 = new eui.ArrayCollection();
		for (let i = 0; i < selfInfoTB.length; i++) {
			let height:number = selfInfoTB[i].length * 65;
			this.arrayCollection1.addItem({
				i,
				info: selfInfoTB[i],
				height
			})
		}
		this.lstView1.dataProvider = this.arrayCollection1;
		this.lstView1.itemRenderer = LeagueUnionStatusItemB;
	}
}
}