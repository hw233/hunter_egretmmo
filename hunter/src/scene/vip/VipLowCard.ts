namespace zj {
// created by yuqingchao in 2019/04/11

export class VipLowCard extends UI {
	private groupTouch: eui.Group;
	private groupStar: eui.Group;
	private groupAddAttri: eui.Group;

	private labelMainAttriConst: eui.Label;
	private labelDeputyAttriConst: eui.Label;
	private labelRaityConst: eui.Label;
	private labelAttriMainFull: eui.Label;
	private labelAttriMain: eui.Label;
	private labelCardNum: eui.Label;
	private labelCardName: eui.Label;
	private labelCardDetails: eui.Label;
	private labelLevel: eui.BitmapLabel;

	private imageCard: eui.Image;
	private imageCardType: eui.Image;
	private imageFrame: eui.Image;
	private imageCardGrad: eui.Image;

	private listAttri: eui.List;
	private scroAttri: eui.Scroller;

	private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();

	private info: message.PotatoInfo;
	private curTbl;
	private curCard;

	private purple: boolean;

	public constructor() {
		super();

		this.skinName = "resource/skins/common/PlayerCardPopDialogSkin.exml";
		this.width = this.skin.width * 1.2;
		this.height = this.skin.height * 1.2;
		this.init();
	}

	private init() {
		this.labelMainAttriConst.text = LANG("主属性：");
		this.labelDeputyAttriConst.text = LANG("副属性：");
		this.labelRaityConst.text = LANG("稀有度：");

		this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
	}

	public loadGet(info: message.PotatoInfo) {
		this.info = info;

		this.labelAttriMainFull.visible = false;

		this.setUI();
	}

	private setUI() {
		this.curCard = this.info;
		this.curTbl = TableItemPotato.Item(this.curCard.id);
		let bigFramePic = PlayerCardSystem.GetItemFrame(this.curCard.id)[1];

		this.labelCardNum.text = this.curTbl.num;
		this.labelCardName.text = this.curTbl.name;
		this.labelCardDetails.text = this.curTbl.des;
		this.labelLevel.text = this.curTbl.level;

		this.imageCard.source = cachekey(this.curTbl.paths, this);
		this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
		this.imageCardGrad.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);
		this.imageFrame.source = cachekey(bigFramePic, this);
	
		if (this.curCard.add_attri.length + 1 == 5 && this.curCard.star < 6 || this.curCard.add_attri.length == 5 && this.curCard.star >= 6) {
			Helper.SetStar(this.groupStar, this.curTbl.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
		}
		else {
			Helper.SetStar(this.groupStar, this.curTbl.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
		}

		this.setAttriUI();
	}

	private setAttriUI() {
		let baseStr = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curCard.star, this.curCard.level)[0];
		this.labelAttriMain.text = baseStr[0];

		let addStr = PlayerCardSystem.GetAddStr(this.curCard);
		this.listAttri.itemRenderer = CardAttriItem;
		let collection = [];
		for (let i = 0; i < addStr.length; i++) {
			collection[i] = { type: 1, colorWhite: false, index: i, info: addStr[i], star: this.curTbl.star, length: addStr.length, width: this.scroAttri.width };
		}
		this.listAttri.dataProvider = new eui.ArrayCollection(collection);
	}

	private callBack: () => void;
	public loadNotGet(info, bShowPurple = false, cb?: () => void) {
		this.info = info;
		this.purple = bShowPurple;
		this.callBack = cb;

		this.labelAttriMainFull.visible = true;

		this.setUINotGet();
	}

	private setUINotGet() {
		this.curTbl = this.info;
		let [_, bigFramePic, __] = PlayerCardSystem.GetItemFrame(this.info.id);
		this.labelCardNum.text = this.curTbl.num;
		this.labelCardName.text = this.curTbl.name;
		this.labelCardDetails.text = this.curTbl.des;
		this.labelLevel.text = "1";

		this.imageCard.source = cachekey(this.curTbl.paths, this);
		this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
		this.imageCardGrad.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);
		this.imageFrame.source = cachekey(bigFramePic, this);

		if (this.purple) {
			Helper.SetStar(this.groupStar, this.curTbl.star, UIConfig.UIConfig_Hunter_Card.card_Star_awaken, 0.7, 14);
		}
		else {
			Helper.SetStar(this.groupStar, this.curTbl.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
		}

		this.setAttriUINotGet();
	}

	private setAttriUINotGet() {
		let baseStr = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curTbl.star, 1)[0];
		this.labelAttriMain.text = baseStr[0];
		let baseStrFullNum = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, CommonConfig.card_max_star, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1])[1];
		this.labelAttriMainFull.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_full_attr, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0]);

		let addStr = PlayerCardSystem.GetAddStrNotGet(this.curTbl);
		if (this.purple)
			addStr[0] = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.unidTipes, 4);

		this.listAttri.itemRenderer = CardAttriItem;
		let collection = [];
		for (let i = 0; i < addStr.length; i++) {
			collection[i] = { type: 4, colorWhite: false, index: i, info: addStr[i], star: this.curTbl.star, length: addStr.length, width: this.scroAttri.width };
		}
		this.listAttri.dataProvider = new eui.ArrayCollection(collection);


		// this.listAttriData.removeAll();
		// for (let i = 0; i < addStr.length; i++) {
		//     let v = addStr[i];
		//     let data = new HunterCardAttriItemData();
		//     data.index = i;
		//     data.description = v;
		//     data.fatherArray = addStr.length;
		//     data.cardInfo = this.info;
		//     data.width = this.groupAddAttri.width - 7;

		//     this.listAttriData.addItem(data);
		// }
		// this.listAttri.dataProvider = this.listAttriData;
		// this.listAttri.itemRenderer = HunterCardAttriItem;
	}

	private onTouchClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private onRemoveDialog() {
		if (this.callBack) {
			this.callBack();
		}
	}
}

}