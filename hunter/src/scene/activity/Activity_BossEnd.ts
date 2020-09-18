namespace zj {
/**
 * @class 年兽BOSS 活动结束
 * 
 * @author Yu Qingchao
 * 
 * 2019.07.20
 */
export class Activity_BossEnd extends Dialog {
	private btnReturn: eui.Button;//退出场景按钮
	private lbRank: eui.Label;//排名
	private lbPoints: eui.Label;//获得积分
	private lstHit: eui.List;
	private arrHit: eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_BossEndSkin.exml";
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
	}

	public init() {
		this.UpdateRank();
	}

	private SetInfoItem(info) {
		let rank = 0;
		if (info.rank == 0) {
			this.lbRank.text = TextsConfig.TextsConfig_Activity.Rank_Charge.out;
		} else {
			this.lbRank.text = info.rank;
		}
		this.lbPoints.text = info.score;
		let rewardList = [];
		let tbl = Game.PlayerBossSystem.GetBossRankGoodsTbl();
		for (let kk in tbl) {
			let vv = tbl[kk];
			if (info.rank > vv.rankZone[0] && info.rank <= vv.rankZone[1])
				rewardList = vv.goodsInfo
		}
		this.arrHit = new eui.ArrayCollection();
		for (let i = 0; i < rewardList.length; i++) {
			this.arrHit.addItem({
				info: rewardList[i],
				bln: true,
			})
		}
		this.lstHit.dataProvider = this.arrHit;
		this.lstHit.itemRenderer = Activity_BossMainAwardItem;
	}

	/**更新个人积分 */
	private UpdateRank() {
		Game.PlayerBossSystem.darklandBossScoreRank().then((msg: message.DarklandBossScoreRankResponse) => {
			this.SetInfoItem(msg.body.self_rank);
		}).catch(reason => { });
	}

	/**退出场景 */
	private onBtnReturn() {
		this.close(UI.HIDE_TO_TOP);
		//关闭活动BOSS Map
		Game.PlayerBossSystem.closeActivityBoss();
	}
}
}