namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-5-10
 * 
 * @class 公会战斗结算界面弹出的战斗结果详情界面
 */
export class MatchWinPop extends Dialog {
	// private TextClose: eui.Label;
	private btnClose: eui.Button;
	private SpriteGet: eui.Image;
	private group1: eui.Group;
	private Label1: eui.Label;
	private group2: eui.Group;
	private Label2: eui.Label;
	private group3: eui.Group;
	private SpriteStar1: eui.Image;
	private SpriteStar2: eui.Image;
	private SpriteStar3: eui.Image;
	private LabelOpen: eui.Label;
	private group4: eui.Group;
	private Label3: eui.Label;
	private group5: eui.Group;
	private bg1: eui.Image;
	private bg1bg: eui.Image;
	private bg2: eui.Image;
	private bg2bg: eui.Image;
	private Label4: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/MatchWinPopSkin.exml";
		this.init();
	}

	private init() {
		this.btnClose.visible = false;
		egret.Tween.get(this).wait(1000).call(() => {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnClose.visible = true;
		})

		// egret.Tween.get(this.TextClose, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		let split = (str, delimiter) => {
			if (str == null || str == "" || delimiter == null) {
				return null;
			}
			let result = [];
			// for (var k in Gmgr.Instance.matchEnemyName ) {
			// 	if ([str+delimiter]..hasOwnProperty(k)) {
			// 		var element = [str+delimiter].[k];

			// 	}
			// }
		}

		for (let i = 1; i <= 5; i++) {
			this["group" + i].alpha = 0;
			egret.Tween.get(this["group" + i]).to({ alpha: 1 }, 300 * i);
		}

		this.bg1.mask = this.bg1bg;
		this.bg2.mask = this.bg2bg;
		let name = Gmgr.Instance.matchEnemyName.split("&")[0];
		let index = Gmgr.Instance.matchHard || 101;
		let enemyName = name || TextsConfig.TextsConfig_Match.no;
		let preScore = Gmgr.Instance.matchMyScore || 0;
		let preStar = Gmgr.Instance.preStar || 0;
		let bAdd = Game.PlayerBattleSystem.multiResultInfo.battleStar > preStar;
		this.LabelOpen.visible = bAdd;

		let addScore = 0;
		if (bAdd) {
			if (preStar == 0) {
				addScore = CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][Game.PlayerBattleSystem.multiResultInfo.battleStar - 1]
			} else {
				addScore = CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][Game.PlayerBattleSystem.multiResultInfo.battleStar - 1] - CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][preStar - 1];
			}
		}
		let maxScore = PlayerLeagueSystem.GetMaxScore();

		let per2 = (maxScore - preScore - addScore) / maxScore >= 1 && 1 || (maxScore - preScore - addScore) / maxScore
		let per1 = (maxScore - preScore) / maxScore >= 1 && 1 || (maxScore - preScore) / maxScore

		let pos = Math.floor(index / 100);
		this.Label1.text = enemyName;
		this.Label2.textFlow = Util.RichText(TextsConfig.TextsConfig_Match.flyName[pos - 1]);
		this.Label3.text = addScore.toString();
		this.Label4.text = (maxScore - preScore - addScore) + "/" + maxScore;
		for (let i = 1; i <= 3; i++) {
			if (i <= Game.PlayerBattleSystem.multiResultInfo.battleStar) {
				this["SpriteStar" + i].source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			} else {
				this["SpriteStar" + i].source = cachekey(UIConfig.UIConfig_Union.star[1], this);
			}
		}
		this.bg1bg.width = 320 * per1;
		this.bg2bg.width = 320 * per2;
	}

	private onBtnClose() {
		// egret.Tween.removeTweens(this.TextClose);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.close();
	}
}
}