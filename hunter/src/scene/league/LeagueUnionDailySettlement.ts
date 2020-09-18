namespace zj {
//公会战查看详情
//yuqingchao
export class LeagueUnionDailySettlement extends Dialog {
	private btnEnsure: eui.Button;		//确定按钮

	private imgWinLogo: eui.Image;		//比赛结果图标（胜利、失败...）
	private imgSegLogoLeft: eui.Image;		//段位图标（me）
	private imgSegLogoRight: eui.Image;		//段位图标（敌）
	private imgSegLeft: eui.Image;		//段位（me）
	private imgSegRight: eui.Image;		//段位（敌）

	private lbNameLeft: eui.Label;		//公会名（me）
	private lbNameRight: eui.Label;		//公会名（敌）
	private lbLeft: eui.Label;		//天梯分（me）
	private lbRight: eui.Label;		//天梯分（敌）
	private lbCon1Left: eui.Label;		//指挥艇生命（me）
	private lbCon2Left: eui.Label;		//护卫艇左生命（me）
	private lbCon3Left: eui.Label;		//护卫艇右生命（me）
	private lbCon4Left: eui.Label;		//先锋艇左生命（me）
	private lbCon5Left: eui.Label;		//先锋艇右生命（me）
	private lbCon1Right: eui.Label;		//指挥艇生命（敌）
	private lbCon2Right: eui.Label;		//护卫艇左生命（敌）
	private lbCon3Right: eui.Label;		//护卫艇右生命（敌）
	private lbCon4Right: eui.Label;		//先锋艇左生命（敌）
	private lbCon5Right: eui.Label;		//先锋艇右生命（敌）
	private lbScoreTotalRight: eui.Label;		//剩余总分数（me）
	private lbScoreTotalLeft: eui.Label;		//剩余总分数（敌）

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionDailySettlementSkin.exml";
		cachekeys(<string[]>UIResource["LeagueUnionDailySettlement"], null);
		this.btnEnsure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnsure, this);

		this.init();
	}

	private init() {
		let dayStr = PlayerLeagueSystem.GetLastSettleData();
		Tips.SetSaveUnionBattlePushRecord(Number(dayStr));
	}

	public updatePanel(battleResult: message.CraftLeagueBattleResultInfo) {

		let isWin = battleResult.result == 1

		this.lbNameLeft.text = Game.PlayerLeagueSystem.BaseInfo.name;		//公会名称（me）
		this.lbNameRight.text = battleResult.opponent_name;		//公会名称（敌）
		let scoreL = "";
		let scoreR = "";
		let scoreLeft = battleResult.self_score_changge;
		let scoreRight = battleResult.opponent_score_changge;

		if (battleResult.result == 1) {
			scoreL = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[1], scoreLeft);
			scoreR = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[2], scoreRight);
		}
		else {
			scoreL = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[2], scoreLeft);
			scoreR = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[1], scoreRight);
		}

		//天梯分
		this.lbLeft.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[0], battleResult.self_old_score, scoreL));
		this.lbRight.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.settlement[0], battleResult.opponent_old_score, scoreR));

		//判断是否轮空
		let isEmpty = battleResult.opponent_old_score == 0 && battleResult.opponent_score_changge == 0

		// 详细积分
		let scoreInfoFilterLeft = [{}, {}, {}, {}, {}];
		if (battleResult.self_star != "") {
			let scoreInfoLeft = battleResult.self_star.split("|");
			for (let i = 0; i < scoreInfoLeft.length; i++) {
				let v = scoreInfoLeft[i].split("&");
				if (v != null && v.length >= 2) {
					scoreInfoFilterLeft[i][Math.floor(Number(v[0]) / 100)] = Number(v[1]);
				}
			}
		}
		scoreInfoFilterLeft = this.transToScore(scoreInfoFilterLeft);

		let scoreInfoFilterRight = [{}, {}, {}, {}, {}];
		if (battleResult.opponent_star != "") {
			let scoreInfoRight = battleResult.opponent_star.split("|");
			for (let i = 0; i < scoreInfoRight.length; i++) {
				let v = scoreInfoRight[i].split("&");
				if (v != null && v.length >= 2) {
					scoreInfoFilterRight[i][Math.floor(Number(v[0]) / 100)] = Number(v[1]);
				}
			}
		}
		scoreInfoFilterRight = this.transToScore(scoreInfoFilterRight);

		let scoreTotalLeft = 0
		let scoreTotalRight = 0
		let add = function (t) {
			let count = 0
			for (let i = 0; i < t.length; i++) {
				count = count + t[i]
			}
			return count;
		}
		//我方剩余分数  总分数   -  对方获得分数
		let set = (index) => {
			let ll: number = 0;
			if (scoreInfoFilterLeft[index - 1] == CommonConfig.league_match_fortress_team_num[index - 1]) {
				ll = ll + CommonConfig.league_match_fortress_extra_socre[index];
			} else {
				ll = PlayerLeagueSystem.GetMaxScore(index) - ll;
			}
			scoreTotalLeft = scoreTotalLeft + ll;
			switch (index) {
				case 1:
					this.lbCon1Left.text = ll.toString();
					break;
				case 2:
					this.lbCon2Left.text = ll.toString();
					break;
				case 3:
					this.lbCon3Left.text = ll.toString();
					break;
				case 4:
					this.lbCon4Left.text = ll.toString();
					break;
				case 5:
					this.lbCon5Left.text = ll.toString();
					break;
			}
			let rr: number = 0;
			if (scoreInfoFilterRight[index - 1] == CommonConfig.league_match_fortress_team_num[index - 1]) {
				rr = rr + CommonConfig.league_match_fortress_extra_socre[index]
			}
			rr = PlayerLeagueSystem.GetMaxScore(index) - rr;
			//判断轮空
			if (isEmpty) {
				rr = 0;
			}
			scoreTotalRight = scoreTotalRight + rr;
			switch (index) {
				case 1:
					this.lbCon1Right.text = rr.toString();
					break;
				case 2:
					this.lbCon2Right.text = rr.toString();
					break;
				case 3:
					this.lbCon3Right.text = rr.toString();
					break;
				case 4:
					this.lbCon4Right.text = rr.toString();
					break;
				case 5:
					this.lbCon5Right.text = rr.toString();
					break;
			}
		}
		for (let i = 1; i <= scoreInfoFilterLeft.length; i++) {
			set(i);
		}
		if (isEmpty) {
			scoreTotalRight = 0;
		}
		this.lbScoreTotalLeft.text = scoreTotalLeft.toString();
		this.lbScoreTotalRight.text = scoreTotalRight.toString();

		//战斗结果图片
		if (isEmpty) {
			this.imgWinLogo.source = cachekey(UIConfig.UIConfig_Union.battle_evaluation[3], this);		//轮空显示小胜
		}
		let scoreDiff = scoreTotalLeft - scoreTotalRight;
		let iswin: boolean = false;
		if (battleResult.result == 1) {
			iswin = true;
		}
		let resultIndex = CommonConfig.league_match_score_change1(iswin, battleResult.self_old_score, Math.abs(scoreDiff));
		let evaTex = UIConfig.UIConfig_Union.battle_evaluation[Number(resultIndex[1])];
		this.imgWinLogo.source = cachekey(evaTex, this);

		this.imgSegLogoLeft.source = cachekey(PlayerLeagueSystem.GetSegment(battleResult.self_old_score)[2], this);
		this.imgSegLeft.source = cachekey(PlayerLeagueSystem.GetSegment(battleResult.self_old_score)[3], this);
		this.imgSegLogoRight.source = cachekey(PlayerLeagueSystem.GetSegment(battleResult.opponent_old_score)[2], this);
		this.imgSegRight.source = cachekey(PlayerLeagueSystem.GetSegment(battleResult.opponent_old_score)[3], this);

		this.imgSegLeft.visible = false;
		this.imgSegRight.visible = false;

	}

	private onBtnEnsure() {
		this.close(UI.HIDE_TRAIL_OFF);
	}

	private transToScore(score_data) {
		let tb = [[], [], [], [], []];
		for (let i = 0; i < score_data.length; i++) {
			let t = score_data[i];
			for (let j = 0; j < t.length; j++) {
				tb[i][j].text = CommonConfig.league_match_fortress_extra_socre[i][j];
			}
		}
		return tb;
	}

}

}