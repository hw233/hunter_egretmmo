namespace zj {
/**
 * 卡片升星信息界面
 * created by Lian Lei
 * 2018.12.11
 */
export class CardUpStar extends UI {
	private groupStar0: eui.Group;
	public groupStar: eui.Group;
	private btnHelp: eui.Button;
	public groupYincang: eui.Group;
	private labelCurrentLevelStar: eui.Label;
	private labelNextLevelStar: eui.Label;
	private labelCurrentLevelAtt: eui.Label;
	private labelNextAtt: eui.Label;
	private labelCurrentLevelAtt2: eui.Label;
	private labelNextAtt2: eui.Label;
	private labelActivationAtt: eui.Label;
	private imageSpriteAttType: eui.Image;
	public imgMax: eui.Image;
	public imgUpStarAtt: eui.Image;
	private groupNodeUpStar: eui.Group;

	private info;

	public constructor() {
		super();
		this.skinName = "resource/skins/card/CardUpStarSkin.exml";
		
		this.init()
	}

	private init() {
		this.imgUpStarAtt.visible = false;
		this.imgMax.visible = false;
		this.imgUpStarAtt.visible = false;
		this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnHelp,this);
	}

	public setInfo(info?) {
		this.info = info;
		Helper.SetStar(this.groupStar0, CommonConfig.card_max_star, UIConfig.UIConfig_General.hunter_juexing_dark_star, 1.1, 25);
		if (this.info.star < CommonConfig.card_max_star) {
			this.setUi();
			this.groupYincang.visible = true;
			this.imgMax.visible = false;
		} else {
			this.groupYincang.visible = false;
			this.imgMax.visible = true;
			if (this.info.add_attri.length + 1 == 5 && this.info.star < 6) {
				Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[0], UIConfig.UIConfig_General.hunter_juexing_dark_star);
			} else if (this.info.add_attri.length == 5 && this.info.star >= 6) {
				Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[0], UIConfig.UIConfig_General.hunter_juexing_dark_star);
			} else {
				Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[1], UIConfig.UIConfig_General.hunter_juexing_dark_star);
			}
		}
	}

	private setUi() {
		Helper.SetStar(this.groupStar0, CommonConfig.card_max_star, UIConfig.UIConfig_General.hunter_juexing_dark_star, 1.1, 25);
		this.labelCurrentLevelStar.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_star, this.info.star);
		this.labelNextLevelStar.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_star, this.info.star + 1);
		this.labelCurrentLevelAtt.text = PlayerCardSystem.GetCardBaseAttri(this.info.id, this.info.star, this.info.level)[0][0].toString();
		this.labelNextAtt.text = PlayerCardSystem.GetCardBaseAttri(this.info.id, this.info.star + 1, this.info.level)[0][0].toString();
		this.labelCurrentLevelAtt2.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level, CommonConfig.card_star_max_level[this.info.star - 1]);
		this.labelNextAtt2.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level, CommonConfig.card_star_max_level[this.info.star]);

		let nextStar = this.info.star + 1;
		this.labelActivationAtt.text = TextsConfig.TextsConfig_Common.nothing;
		this.imageSpriteAttType.visible = false;

		if (this.info.star == 5) {
			this.labelActivationAtt.text = TextsConfig.TextsConfig_Hunter.conditionCan;
			this.imageSpriteAttType.visible = true;
		}

		for (let [kk, vv] of HelpUtil.GetKV(this.info.add_attri)) {
			if (CommonConfig.card_addattri_awake_star[kk] == nextStar) {
				let addStr = PlayerCardSystem.GetAddStr(this.info);
				this.labelActivationAtt.text = addStr[kk][0];
				this.imageSpriteAttType.visible = true;
				break;
			}
		}

		this.groupYincang.visible = (this.info.level < CommonConfig.card_star_max_level[this.info.star]);
		this.groupNodeUpStar.visible = (this.info.level >= CommonConfig.card_star_max_level[this.info.star]);

		if (this.info.add_attri.length + 1 == 5 && this.info.star < 6) {
			Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[0], UIConfig.UIConfig_General.hunter_juexing_dark_star);
		} else if (this.info.add_attri.length == 5 && this.info.star >= 6) {
			Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[0], UIConfig.UIConfig_General.hunter_juexing_dark_star);
		} else {
			Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, CommonConfig.card_max_star, 1, true, UIConfig.UIConfig_General.hunter_juexing_star[1], UIConfig.UIConfig_General.hunter_juexing_dark_star);
		}

		if (this.info.star == CommonConfig.card_max_star) {
			this.imgMax.visible = true;
		}
		else {
			this.imgMax.visible = false;
		}
	}

	private onBtnHelp() {
		loadUI(HelpDialog)
		.then((dialog: HelpDialog) => {
			dialog.show(UI.SHOW_FILL_OUT);
			dialog.loadBySmallType(202);
		});
    }
}

}