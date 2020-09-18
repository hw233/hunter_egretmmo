namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-17
 * 
 * @class 贪婪之岛港口积分排行
 */
export class DarkLandPortRank extends Dialog {
	private btnClose: eui.Button;
	private listViewRank: eui.List;
	private labelLevel: eui.Label;
	private labelName: eui.Label;
	private labelServer: eui.Label;
	private labelValue: eui.Label;
	private imgRankIcon: eui.Image;
	private labelLast: eui.Label;

	private rankInfo: message.DarklandRankInfo[];
	private myRankInfo: message.DarklandRankInfo;
	private update: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLandPortRankSkin.exml";
		this.init();
	}

	private init() {
		this.ReqRank();
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.clearInterval(this.update);
		}, this)
		this.update = egret.setInterval(this.Update, this, 999);
		this.Update();
	}

	/**获取排行信息 */
	private ReqRank() {
		Game.PlayerWonderLandSystem.SceneQueryScoreRank(true)
			.then((msg: message.SceneQueryScoreRankRespBody) => {
				this.rankInfo = msg.ranks;
				this.myRankInfo = msg.self_rank;
				this.SetInfoMy()
				this.SetInfoAll()
			}).catch(() => {

			})
	}

	/**底部倒计时刷新 */
	private Update() {
		let [bOpen, lastTime] = PlayerDarkSystem.PortOpenTime()
		let str_time = Set.timeLeaveSec(lastTime)
		if (!bOpen) {
			str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, str_time)
			this.labelLast.textFlow = Util.RichText(str_time);
		} else {
			str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, str_time)
			this.labelLast.textFlow = Util.RichText(str_time);
		}
	}

	/**设置页面基本信息 */
	private SetInfoMy() {
		this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.myRankInfo.rank)
		this.labelName.text = this.myRankInfo.roleName;
		this.labelServer.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(this.myRankInfo.groupName, "&", false), singLecraft.decodeGroupName(this.myRankInfo.groupName, "&", true))
		this.labelValue.text = Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.score, this.myRankInfo.score)

		if (this.myRankInfo.rank == 0 || this.myRankInfo.score < CommonConfig.darkland_rank_base_score) {
			this.labelLevel.text = (TextsConfig.TextsConfig_WonderlandBoss.disAttend)
		} else if (this.myRankInfo.rank > 100) {
			this.labelLevel.text = ("100+")
		}
	}

	/**加载list */
	private SetInfoAll() {
		let array = new eui.ArrayCollection();
		for (let i = 0; i < this.rankInfo.length; i++) {
			let data = new DarkLandPortRankItemData();
			data.father = this;
			data.index = i;
			data.info = this.rankInfo[i];
			array.addItem(data);
		}
		this.listViewRank.dataProvider = array;
		this.listViewRank.itemRenderer = DarkLandPortRankItem;
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}