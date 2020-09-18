namespace zj {
//对战记录
//yuqingchao
//2019.02.27
export interface curTable {
	index: string;
	leftInfo: string[];
	rightInfo: string[];
	leftResult: [boolean, number];
	rightResult: [boolean, number];
	time: number;
}
export const enum RecordEnum {
	Attack = 1,
	Define = 2,
	Devote = 3,
}
export class LeagueMatchBattleRecord extends Dialog {
	private btn1: eui.Button;
	private btn2: eui.Button;
	private btn3: eui.Button;
	private btnClose: eui.Button;

	private group1: eui.Group;
	private group2: eui.Group;
	private group3: eui.Group;

	private lstRank: eui.List;
	private lstRank1: eui.List;
	private lstRank2: eui.List;

	private arrayCollection: eui.ArrayCollection;
	private arrayCollection1: eui.ArrayCollection;
	private arrayCollection2: eui.ArrayCollection;
	private stateInfo = {}
	private state: number;
	private leagueId:number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMatchBattleRecordSkin.exml";

		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.state = RecordEnum.Attack;
		this.onBtn1();
	}
	public setInfo(leagueId){
		this.leagueId = leagueId;
	}
	//攻击记录	默认
	private onBtn1() {
		this.btn1.currentState = "down";
		this.btn2.currentState = "up";
		this.btn3.currentState = "up";
		this.group1.visible = true;
		this.group2.visible = false;
		this.group3.visible = false;
		Game.PlayerLeagueSystem.leagueMatchFortressRecord(true, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_BATTLE, this.leagueId)
			.then((arr: Array<message.LeagueRecord>) => {
				let tbl = [];
				for (let v of arr) {
					let splitTbl = v.operate_object.split("&")
					let curTbl: curTable = {
						index: v.operater,
						leftInfo: [],
						rightInfo: [],
						leftResult: [true, 0],
						rightResult: [false, 0],
						time: v.generate_time
					}
					for (let i = 0; i < 6; i++) {
						if (i <= 2) {
							curTbl.leftInfo.push(splitTbl[i])
						}
						else {
							curTbl.rightInfo.push(splitTbl[i])
						}
					}
					if ((v.operate_result) == 0) {
						curTbl.leftResult = [false, 0];
						curTbl.rightResult = [true, 0];
					}
					if ((v.operate_result) != 0)  {
						curTbl.leftResult = [true, v.operate_result];
						curTbl.rightResult = [false, 0];
					}
					tbl.push(curTbl);
				}
				tbl.sort(function (a, b) {
					return b.time - a.time;
				})
				this.loadList(tbl);
			})
	}

	//防守记录
	private onBtn2() {
		this.btn1.currentState = "up";
		this.btn2.currentState = "down";
		this.btn3.currentState = "up";
		this.group1.visible = false;
		this.group2.visible = true;
		this.group3.visible = false;
		Game.PlayerLeagueSystem.leagueMatchFortressRecord(false, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_BATTLE, this.leagueId)
			.then((arr: Array<message.LeagueRecord>) => {
				let tbl = [];
				for (let v of arr) {
					let splitTbl = v.operate_object.split("&")
					let curTbl: curTable = {
						index: v.operater,
						leftInfo: [],
						rightInfo: [],
						leftResult: [false, 0],
						rightResult: [true, 0],
						time: v.generate_time
					}
					for (let i = 0; i < 6; i++) {
						if (i <= 2) {
							curTbl.rightInfo.push(splitTbl[i])
						}
						else {
							curTbl.leftInfo.push(splitTbl[i])
						}
					}
					if ((v.operate_result) == 0) {
						curTbl.leftResult = [true, 0];
						curTbl.rightResult = [false, 0];
					}
					else {
						curTbl.leftResult = [false, 0];
						curTbl.rightResult = [true, v.operate_result];
					}
					tbl.push(curTbl);
				}
				tbl.sort(function (a, b) {
					return b.time - a.time;
				})
				this.loadList1(tbl);
		})
	}

	//贡献排名
	private onBtn3() {
		this.btn1.currentState = "up";
		this.btn2.currentState = "up";
		this.btn3.currentState = "down";
		this.group1.visible = false;
		this.group2.visible = false;
		this.group3.visible = true;
		Game.PlayerLeagueSystem.leagueMemberStatic()
			.then((arr: Array<message.MemberStatic>) => {
				this.loadList2(arr);
			})
	}

	/********************攻击记录*********************/
	private loadList(tbl) {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < tbl.length; i++) {
			this.arrayCollection.addItem({
				info: tbl[i]
			})
		}
		this.lstRank.dataProvider = this.arrayCollection;
		this.lstRank.itemRenderer = LeagueMatchBattleRecordItem;
	}

	/********************防守记录*********************/
	private loadList1(tbl) {
		this.arrayCollection1 = new eui.ArrayCollection();
		for (let i = 0; i < tbl.length; i++) {
			this.arrayCollection1.addItem({
				info: tbl[i]
			})
		}
		this.lstRank1.dataProvider = this.arrayCollection1;
		this.lstRank1.itemRenderer = LeagueMatchBattleRecordItem;
	}

	/********************贡献排名*******************/
	private loadList2(arr: Array<message.MemberStatic>) {
		arr.sort(function (a, b) {
			return b.dailyMatchBattleScore - a.dailyMatchBattleScore;
		});
		this.arrayCollection2 = new eui.ArrayCollection();
		for (let i = 0; i < arr.length; i++) {
			this.arrayCollection2.addItem({
				id: i + 1,
				info: arr[i]
			})
		}
		this.lstRank2.dataProvider = this.arrayCollection2;
		this.lstRank2.itemRenderer = LeagueMatchBattleRecordItemB;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}