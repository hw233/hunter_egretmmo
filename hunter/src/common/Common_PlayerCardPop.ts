namespace zj {
// PlayerCardPopDialog
// lizhengqiang
// 20190523

export class Common_PlayerCardPop extends UI {
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
    private imageRect: eui.Rect;

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
    private confirmCB: Function = null;

    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_PlayerCardPopSkin.exml";
        cachekeys(<string[]>UIResource["Common_PlayerCardPop"], null);
        this.imageRect.alpha = 0;
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.imageRect.width = UIManager.StageWidth;
        this.imageRect.height = UIManager.StageHeight;
        this.init();
    }

    private init() {
        this.labelMainAttriConst.text = LANG("主属性：");
        this.labelDeputyAttriConst.text = LANG("副属性：");
        this.labelRaityConst.text = LANG("稀有度：");


        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchClose, this);

        egret.Tween.get(this.imageRect)
            .to({ alpha: 0 }, 0)
            .to({ alpha: 0.65 }, 300);
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
        this.listAttriData.removeAll();
        for (let i = 0; i < addStr.length; i++) {
            let itemData = new CardAttriItemData();
            itemData.index = i;
            itemData.info = addStr[i];
            itemData.cardInfo = this.info;
            itemData.width = this.scroAttri.width;
            itemData.addStrlength = addStr.length;
            itemData.type = 0;
            this.listAttriData.addItem(itemData);
        }
        this.listAttri.dataProvider = this.listAttriData;
        this.listAttri.itemRenderer = CardAttriItem;
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
        // let FullNum: string = baseStrFullNum[0];
        // let pointNum: number = FullNum.indexOf(".");
        // if (pointNum != -1) {
        //     let tmp = FullNum.substr(0, pointNum + 3);
        //     if (FullNum.lastIndexOf("%") != -1) {
        //         if (tmp.charAt(tmp.length - 1) != "%") FullNum = tmp + "%";
        //     }
        //     else {
        //         FullNum = tmp;
        //     }
        // }
        this.labelAttriMainFull.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_full_attr, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0]);

        let addStr = PlayerCardSystem.GetAddStrNotGet(this.curTbl);
        if (this.purple)
            addStr[0] = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.unidTipes, 4);

        this.listAttriData.removeAll();
        for (let i = 0; i < addStr.length; i++) {
            let itemData = new CardAttriItemData();
            itemData.index = i;
            itemData.info = addStr[i];
            itemData.width = this.scroAttri.width;
            itemData.type = 1;
            this.listAttriData.addItem(itemData);
        }
        this.listAttri.dataProvider = this.listAttriData;
        this.listAttri.itemRenderer = CardAttriItem;
    }

    public onTouchClose() {
        if (this.callBack) {
            this.callBack();
        }
        this.close();
    }

    public setCB() {
        let a = () => {
            this.close();
        }
        return a;
    }
}

}