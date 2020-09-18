namespace zj {
//历史战绩-战斗记录
//yuqingchao
export class LeagueUnionBattleHisRecordItem extends eui.ItemRenderer {
	private lbUnionTime: eui.Label;		//战斗时间
	private lbUnionName: eui.Label;		//敌方公会名
	private lbCompetitionSystem: eui.Label;		//比赛类型
	private imgWin: eui.Image;		//比赛结果
	private btnView: eui.Button;		//查看详情

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueUnionBattleHisRecordItem"], null);
		this.btnView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnView, this);
	}

	protected dataChanged() {
		let info: message.LeagueRecord = this.data.value;
		let day = new Date(info.generate_time * 1000).getDay();
		let weekend = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

		this.lbUnionTime.text = weekend[day];		//时间显示
		this.imgWin.source = cachekey(UIConfig.UIConfig_Mail.win[info.operate_result - 1], this);		//比赛结果 图片
		this.lbUnionName.text = info.operater;
	}

	private onBtnView() {
		egret.Tween.get(this.btnView).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
		Game.PlayerLeagueSystem.leagueMatchBattleResult(this.data.value.operate_object)
			.then((cra: message.LeagueMatchBattleResultResponse) => {
				loadUI(LeagueUnionDailySettlement)
					.then((dialog: LeagueUnionDailySettlement) => {
						dialog.show(UI.SHOW_FILL_OUT);
						dialog.updatePanel(cra.body.battleResult);
					});
			});
	}
}
}