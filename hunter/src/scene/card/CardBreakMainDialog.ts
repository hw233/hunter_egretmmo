namespace zj {
// created by hhh in 2018/12/10

/************** 卡片部分 突破界面 ****************/

export class CardBreakMainDialog extends Dialog {
    private groupStar: eui.Group;
    private groupMax: eui.Group;
    private groupUse: eui.Group;
    private groupStarMax: eui.Group;
    private groupStarBefore: eui.Group;
    private groupStarAfter: eui.Group;
    private groupItem: eui.Group;
    private groupCard: eui.Group;
    private groupItemCard: eui.Group;
    private groupMeterials: eui.Group;
    private groupMetarialDes: eui.Group;

    private btnClose: eui.Button;
    private btnBreak: eui.Button;

    private labelCardNum: eui.Label;
    private labelCardName: eui.Label;
    private labelCardDetails: eui.Label;
    private labelLevel: eui.BitmapLabel;
    private labelGoldNum: eui.Label;

    private labelLevelMax: eui.BitmapLabel;
    private labelMaxLevel: eui.Label;
    private labelBreakNum: eui.Label;
    private labelLevelBefore: eui.BitmapLabel;
    private labelLevelAfter: eui.BitmapLabel;
    private labelCurrentLevel: eui.Label;
    private labelNextLevel: eui.Label;
    private labelNumCard: eui.Label;
    private labelLevelItemCard: eui.BitmapLabel;
    private labelNumMeterials: eui.Label;

    private imageFrame: eui.Image;
    private imageCard: eui.Image;
    private imageCardType: eui.Image;

    private imageFrameMax: eui.Image;
    private imageCardTypeMax: eui.Image;
    private imageIconMax: eui.Image;
    private imageFrameBefore: eui.Image;
    private imageCardTypeBefore: eui.Image;
    private imageIconBefore: eui.Image;
    private imageFrameAfter: eui.Image;
    private imageCardTypeAfter: eui.Image;
    private imageIconAfter: eui.Image;
    private imageCardBreakType: eui.Image;
    private imageShadow: eui.Image;
    private imageIconCard: eui.Image;
    private imageFrameCard: eui.Image;
    private imageIconMeterials: eui.Image;
    private imageFrameMeterials: eui.Image;
    private imageAddMeterials: eui.Image;

    private info: message.PotatoInfo = null;
    private curCard: message.PotatoInfo = null;
    private curTbl: TableItemPotato = null;
    private callBack: Function;
    private cb: Function;

    private desPropId: number;
    private desPropCount: number;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBreakMainDialogSkin.exml";

        this.init();
    }

    private init() {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBreak, this);

        this.groupItemCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemCard, this);
        this.groupMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMeterials, this);

        this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchImageIconMeterialsBegin, this);
        this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchImageIconMeterialsEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchImageIconMeterialsEnd, this);

        Game.PlayerCardSystem.initBreakPotatoSel();
    }

    public loadInfo(info: message.PotatoInfo, cb: Function, cb2?: Function) {
        this.info = info;
        this.callBack = cb;
        this.cb = cb2;

        this.setCardUI();
        this.setCardBreak();
    }

    // 设置左侧ui
    private setCardUI() {
        this.curCard = this.info;
        this.curTbl = TableItemPotato.Item(this.curCard.id);
        let [_, bigFramePic, __] = PlayerCardSystem.GetItemFrame(this.curCard.id);

        this.labelCardNum.text = this.curTbl.num;
        this.labelCardName.text = this.curTbl.name;
        this.labelCardDetails.text = this.curTbl.des;
        this.labelLevel.text = this.curCard.level + "";

        let str = Game.PlayerInfoSystem.Coin.toString();
        this.labelGoldNum.text = LANG("拥有数量：") + str;

        let imageCardPath = this.curTbl.paths;
        let imageCardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1];
        let imageFramePath = bigFramePic;

        this.imageCard.source = cachekey(imageCardPath, this);
        this.imageCardType.source = cachekey(imageCardTypePath, this);
        this.imageFrame.source = cachekey(imageFramePath, this);

        if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
            Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 18);
        else
            Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 18);
    }

    // 设置右侧ui
    public setCardBreak() {
        this.labelLevelMax.visible = false;
        let framePic = PlayerCardSystem.GetItemFrame(this.info.id)[0];
        let tbl: TableItemPotato = TableItemPotato.Item(this.info.id);
        if (this.info.break_level == CommonConfig.card_break_through_max_level) {
            this.groupMax.visible = true;
            this.groupUse.visible = false;

            let imageFrameMaxPath = framePic;
            let imageCardTypeMaxPath = UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
            let imageIconMaxPath = tbl.path;

            this.imageFrameMax.source = cachekey(imageFrameMaxPath, this);
            this.imageCardTypeMax.source = cachekey(imageCardTypeMaxPath, this);
            this.imageIconMax.source = cachekey(imageIconMaxPath, this);

            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                Helper.SetStar(this.groupStarMax, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
            else
                Helper.SetStar(this.groupStarMax, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);

            this.labelMaxLevel.text = LANG("等级上限：") + (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.info.break_level);
        }
        else {
            this.groupMax.visible = false;
            this.groupUse.visible = true;

            let imageIconBeforePath = tbl.path;
            let imageFrameBeforePath = framePic;
            let imageCardTypeBeforePath = UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];

            this.imageIconBefore.source = cachekey(imageIconBeforePath, this);
            this.imageFrameBefore.source = cachekey(imageFrameBeforePath, this);
            this.imageCardTypeBefore.source = cachekey(imageCardTypeBeforePath, this);
            this.labelLevelBefore.text = this.info.level + "";

            let imageIconAfterPath = tbl.path;
            let imageFrameAfterPath = framePic;
            let imageCardTypeAfterPath = UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];

            this.imageIconAfter.source = cachekey(imageIconAfterPath, this);
            this.imageFrameAfter.source = cachekey(imageFrameAfterPath, this);
            this.imageCardTypeAfter.source = cachekey(imageCardTypeAfterPath, this);
            this.labelLevelAfter.text = this.info.level + "";

            this.labelCurrentLevel.text = LANG("等级上限：") + (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.info.break_level);
            this.labelNextLevel.text = CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * (this.info.break_level + 1) + "";

            let potatoBreakItem = TablePotatoBreak.Item(this.info.break_level + 1);
            this.labelBreakNum.text = potatoBreakItem.consume + "";
            if (potatoBreakItem.exchange_count == 0) {
                this.groupCard.visible = false;
                this.groupItem.x = 126;
            }
            else {
                this.groupCard.visible = true;
                this.groupItem.x = 66;
            }

            let id = potatoBreakItem.exchange_prop[0];
            let count1 = PlayerItemSystem.Count(id);
            let count11 = potatoBreakItem.exchange_prop[1];
            if (count1 > count11) {
                this.imageAddMeterials.visible = false;
                this.groupMeterials.touchEnabled = false;
            }
            else {
                this.imageAddMeterials.visible = true;
                this.groupMeterials.touchEnabled = true;
            }
            this.desPropId = id;
            this.desPropCount = count11;

            this.labelNumMeterials.text = count1 + "/" + count11;
            let itemInfo = <TableItemProp>PlayerItemSystem.ItemConfig(id);

            let imageIconMeterialsPath = PlayerItemSystem.ItemPath(id);
            let imageFrameMeterialsPath = UIConfig.UIConfig_Role.itemFrame[itemInfo.quality];
            let imageCardBreakTypePath = UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];

            this.imageIconMeterials.source = cachekey(imageIconMeterialsPath, this);
            this.imageFrameMeterials.source = cachekey(imageFrameMeterialsPath, this);
            this.imageCardBreakType.source = cachekey(imageCardBreakTypePath, this);

            let num = potatoBreakItem.exchange_count;
            let count2 = Game.PlayerCardSystem.getBreakPotatoSel().length;
            let count22 = num;
            this.labelNumCard.text = count2 + "/" + count22;

            this.imageShadow.visible = count2 < num;

            this.imageIconCard.source = cachekey(tbl.path, this);
            this.imageFrameCard.source = cachekey(framePic, this);

            if (potatoBreakItem.exchange_level == 0) {
                this.labelLevelItemCard.visible = false;
            }
            else {
                this.labelLevelItemCard.visible = true;
                this.labelLevelItemCard.text = potatoBreakItem.exchange_level + "";
            }

            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                Helper.SetStar(this.groupStarBefore, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
            else
                Helper.SetStar(this.groupStarBefore, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);

            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                Helper.SetStar(this.groupStarAfter, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
            else
                Helper.SetStar(this.groupStarAfter, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);
        }
    }

    private onBtnBreak() {
        let list = [];
        let tbl = PlayerCardSystem.GetAllCardByName(this.info, this.info.id, this.info.index, TablePotatoBreak.Item(this.info.break_level + 1).exchange_level);
        let index = this.info.index;
        let generalId = 0;
        let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(this.info.index).cHostId;
        if (cHostId != null && this.info.pos != 0) {
            generalId = cHostId;
            index = 0;
        }
        for (let kk in Game.PlayerCardSystem.getBreakPotatoSel()) {
            let vv = Game.PlayerCardSystem.getBreakPotatoSel()[kk];
            for (let k in tbl) {
                if (Number(k) == vv)
                    list.push(tbl[k].index);
            }
        }

        Game.PlayerCardSystem.potatoBreak(index, generalId, this.info.pos, list)
            .then((value) => {
                this.info = PlayerCardSystem.RefreshCard(this.info);
                this.setCardBreak();
                this.setCardUI();
                if (this.callBack) {
                    this.callBack();// 调用回调函数刷新列表
                }
                toast(TextsConfig.TextsConfig_Hunter_Card.break_success);
            })
            .catch((reason) => {
            })
    }

    private onTouchItemCard() {
        loadUI(CardBreakSelectDialog)
            .then((dialog: CardBreakSelectDialog) => {
                dialog.setInfo(this.info.id, this.info.index, this.info.break_level + 1, this.info, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onTouchMeterials() {
        let goodId = TablePotatoBreak.Item(this.info.break_level + 1).exchange_prop[0]
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.setInfo(goodId, this, () => {
                    this.onBtnClose();
                    if (this.cb) {
                        this.cb();
                    }
                });
            });
    }

    private onTouchImageIconMeterialsBegin() {
        loadUI(Common_DesProp)
            .then((desProp: Common_DesProp) => {
                desProp.verticalCenter = true;
                desProp.setInfo(this.desPropId, this.desPropCount);
                this.groupMetarialDes.addChild(desProp);
            });
    }

    private onTouchImageIconMeterialsEnd() {
        this.groupMetarialDes.removeChildren();
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}

}