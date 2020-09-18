namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-1-4
 */
export class HunterCardReplaceDialog extends Dialog {
    private btnScreen: eui.Button;
    private listCard: eui.List;
    private groupRight: eui.Group;
    private groupEquipe: eui.Group;
    private btnClose: eui.Button;
    private imgEquipFrame: eui.Image;
    private labelEquipCardNumber: eui.Label;
    private labelEquipCardName: eui.Label;
    private imgEquipCard: eui.Image;
    private imgEquipCardType: eui.Image;
    private labelEquipCardDetails: eui.Label;
    private labelEquipLevel: eui.Label;
    private groupEquipStar: eui.Group;
    private labelEquipAttribute: eui.Label;
    private listEquipAttribute: eui.List;
    private groupReplace: eui.Group;
    private imgReplaceFrame: eui.Image;
    private labelReplaceCardNumber: eui.Label;
    private labelReplaceCardName: eui.Label;
    private imgReplaceCard: eui.Image;
    private imgReplaceCardType: eui.Image;
    private labelReplaceCardDetails: eui.Label;
    private labelReplaceLevel: eui.Label;
    private groupReplaceStar: eui.Group;
    private labelReplaceAttribute: eui.Label;
    private listReplaceAttribute: eui.List;
    private groupButton: eui.Group;
    private btnReplace: eui.Button;
    private btnCloseCard: eui.Button;

    private listCardData = new eui.ArrayCollection();
    private listEquipAttributeData = new eui.ArrayCollection();
    private listReplaceAttributeData = new eui.ArrayCollection();
    /** The main attribute id for screen. */
    private screenMain = [0];
    /** The addition attribute id for screen */
    private screenAddition = [0, 0, 0];
    private generalId: number;
    private cardType: number;
    /** card's location 1 - 9 */
    private position: number;
    private cardInfo: message.PotatoInfo = null;
    private selectedCardInfo: message.PotatoInfo = null;
    private callback: Function;
    /** The unique id for card. */
    private currentSelectedIndex: number;
    private cb;
    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterCardReplaceDialogSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.init();
    }

    private init() {
        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnCloseCard.addEventListener(tap, this.onBtnClose, this);
        this.btnScreen.addEventListener(tap, this.onBtnScreen, this);
        this.btnReplace.addEventListener(tap, this.onBtnReplace, this);

        this.hideAnimation();
    }

    /** 
     * 设置基本信息
     * 
     * @param callback 替换成功，调用该回调函数
     */
    public setInfo(generalId: number, cardType: number, position: number, info: message.PotatoInfo, callback: Function, cb) {
        this.generalId = generalId;
        this.cardType = cardType;
        this.position = position;
        this.cardInfo = info;
        this.callback = callback;
        this.cb = cb;
        this.refresh();
    }

    private refresh() {
        this.loadCardList();
        this.setCurrenCardInfo();
    }

    private loadCardList() {
        let cardList = PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);

        this.listCardData.removeAll();
        for (let i = 0; i < cardList.length; i++) {
            let v = cardList[i];
            let data = new HunterCardPopItemData();
            data.info = v;
            data.cardType = this.cardType;
            if (this.currentSelectedIndex != null && v instanceof message.PotatoInfo) {
                data.isSelected = (this.currentSelectedIndex == v.index);
            }
            this.listCardData.addItem(data);
        }
        this.listCard.dataProvider = this.listCardData;
        this.listCard.itemRenderer = HunterCardPopItem;
        this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
    }

    private onCardListTap(e: eui.ItemTapEvent) {
        let data = this.listCardData.getItemAt(e.itemIndex) as HunterCardPopItemData;
        if ((data.info instanceof message.PotatoInfo) == false) { // click button to get
            loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
                // set item id
                let goodsId = TableEnum.Enum.CardTypeDropId[this.cardType - 1];
                dialog.setInfo(goodsId, this, () => {
                    this.refresh();
                    this.onBtnClose();
                    if (this.cb) {
                        this.cb();
                    }
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
            return;
        }

        data.isSelected = true;
        this.listCardData.replaceItemAt(data, e.itemIndex);

        if (this.currentSelectedIndex != e.itemIndex) {
            let [lastIndex, lastData] = this.getSelectedCard();
            if (lastIndex != null && lastData != null) {
                lastData.isSelected = false;
                this.listCardData.replaceItemAt(lastData, lastIndex);
            }
        }

        if (this.currentSelectedIndex == null) {
            this.showAnimation();
        }

        this.currentSelectedIndex = (data.info as message.PotatoInfo).index;

        this.setReplaceCardInfo(data.info);
    }

    private getSelectedCard(): [number, HunterCardPopItemData] {
        let index = null;
        let selectedData = null;
        for (let i = 0; i < this.listCardData.length; i++) {
            let data = this.listCardData.getItemAt(i) as HunterCardPopItemData;
            if (data.info instanceof message.PotatoInfo) {
                if (data.info.index == this.currentSelectedIndex) {
                    index = i;
                    selectedData = data;
                    break;
                }
            }
        }
        return [index, selectedData];
    }

    private setCurrenCardInfo() {
        let basePotatoInfo = TableItemPotato.Item(this.cardInfo.id);
        let [, framePath,] = PlayerCardSystem.GetItemFrame(this.cardInfo.id, this.cardInfo);
        let cardPath = basePotatoInfo.paths;
        let typePath = UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
        this.imgEquipFrame.source = cachekey(framePath, this);
        this.imgEquipCard.source = cachekey(cardPath, this);
        this.imgEquipCardType.source = cachekey(typePath, this);

        this.labelEquipCardName.text = basePotatoInfo.name;
        this.labelEquipCardNumber.text = basePotatoInfo.num.toString();
        this.labelEquipLevel.text = this.cardInfo.level.toString();
        this.labelEquipCardDetails.text = basePotatoInfo.des;

        if (this.cardInfo.add_attri.length == 4 && this.cardInfo.star < 6) {
            Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else if (this.cardInfo.add_attri.length == 5 && this.cardInfo.star >= 6) {
            Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else {
            Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
        }

        let baseStr = PlayerCardSystem.GetCardBaseAttri(basePotatoInfo.id, this.cardInfo.star, this.cardInfo.level)[0];
        this.labelEquipAttribute.text = baseStr[0];

        let addAtr = PlayerCardSystem.GetAddStr(this.cardInfo);
        this.listEquipAttributeData.removeAll();
        for (let i = 0; i < addAtr.length; i++) {
            let v = addAtr[i];
            let data = new HunterCardAttriItemData();
            data.index = i;
            data.description = v[0];
            data.cardInfo = this.cardInfo;
            data.fatherArray = addAtr.length;
            this.listEquipAttributeData.addItem(data);
        }
        this.listEquipAttribute.dataProvider = this.listEquipAttributeData;
        this.listEquipAttribute.itemRenderer = HunterCardReplaceItem;
    }

    private setReplaceCardInfo(info: message.PotatoInfo) {
        this.selectedCardInfo = info;

        let basePotatoInfo = TableItemPotato.Item(info.id);
        let [, framePath,] = PlayerCardSystem.GetItemFrame(info.id, info);
        let cardPath = basePotatoInfo.paths;
        let typePath = UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
        this.imgReplaceFrame.source = cachekey(framePath, this);
        this.imgReplaceCard.source = cachekey(cardPath, this);
        this.imgReplaceCardType.source = cachekey(typePath, this);

        this.labelReplaceCardName.text = basePotatoInfo.name;
        this.labelReplaceCardNumber.text = basePotatoInfo.num.toString();
        this.labelReplaceLevel.text = info.level.toString();
        this.labelReplaceCardDetails.text = basePotatoInfo.des;

        if (info.add_attri.length == 4 && info.star < 6) {
            Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else if (info.add_attri.length == 5 && info.star >= 6) {
            Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else {
            Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
        }

        let baseStr = PlayerCardSystem.GetCardBaseAttri(basePotatoInfo.id, info.star, info.level)[0];
        this.labelReplaceAttribute.text = baseStr[0];

        let addAtr = PlayerCardSystem.GetAddStr(info);
        this.listReplaceAttributeData.removeAll();
        for (let i = 0; i < addAtr.length; i++) {
            let v = addAtr[i];
            let data = new HunterCardAttriItemData();
            data.description = v[0];
            data.index = i;
            data.cardInfo = info;
            data.fatherArray = addAtr.length;
            this.listReplaceAttributeData.addItem(data);
        }
        this.listReplaceAttribute.dataProvider = this.listReplaceAttributeData;
        this.listReplaceAttribute.itemRenderer = HunterCardReplaceItem;
    }

    private showAnimation() {
        if (this.groupReplace.visible == true) return;

        egret.Tween.get(this.groupEquipe).to({ y: 0 }, 500, egret.Ease.backInOut);
        let groupButtonY = this.groupRight.height - this.groupButton.height;
        egret.Tween.get(this.groupButton).to({ y: groupButtonY }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.groupReplace).
            wait(500).
            call(() => {
                this.groupReplace.x = this.groupReplace.width;
                this.groupReplace.y = this.groupEquipe.height;
            }).
            to({ visible: true }, 0).
            to({ x: 0 }, 500, egret.Ease.sineOut);
    }

    private hideAnimation() {
        this.groupReplace.visible = false;
        let totalHeight = this.groupEquipe.height + this.groupButton.height;
        let equipY = this.groupRight.height * 0.5 - totalHeight * 0.5;
        this.groupEquipe.y = equipY;
        this.groupButton.y = equipY + this.groupEquipe.height;
    }

    private onBtnScreen() {
        loadUI(CommonPotatoScreen).then((dialog: CommonPotatoScreen) => {
            dialog.setInfo(this.screenMain, this.screenAddition, (selectedMain: number[], selectedAddition: number[]) => {
                let changed = false;
                if (selectedMain[0] != this.screenMain[0]) {
                    changed = true;
                }
                this.screenMain = selectedMain;

                for (let i = 0; i < selectedAddition.length; i++) {
                    let v = selectedAddition[i];
                    if (v == this.screenAddition[i]) {
                        changed = true;
                        break;
                    }
                }
                this.screenAddition = selectedAddition;

                if (changed) {
                    this.currentSelectedIndex = null;
                    this.selectedCardInfo = null;
                    this.hideAnimation();
                }
                this.refresh();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnReplace() {
        if (this.selectedCardInfo == null) {
            toast(TextsConfig.TextsConfig_Hunter.not_choose_card);
            return;
        }

        Game.PlayerHunterSystem.potatoWear(this.generalId, this.selectedCardInfo.index, this.position, false).
            then(() => {
                Game.PlayerCardSystem.deleteCardByIndex(this.selectedCardInfo.index);
                if (this.callback) {
                    this.callback();
                }
                this.onBtnClose();
            });
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}

}