namespace zj {
/**
 * @author chen xi 
 * 
 * @date 2018-12-28
 * 
 * @class The uninstall card dialog.
 */
export class HunterCardEmptyPopDialog extends UI {
    private groupLeft: eui.Group;
    private btnScreen: eui.Button;
    private btnLeftClose: eui.Button;
    private imgCardTypeName: eui.Image;
    private listCardBag: eui.List;
    private groupRight: eui.Group;
    private btnRightClose: eui.Button;
    private imgFrame: eui.Image;
    private labelCardNum: eui.Label;
    private labelCardName: eui.Label;
    private imgCard: eui.Image;
    private imgCardType: eui.Image;
    private labelCardDetails: eui.Label;
    private btnCardUnlock: eui.Button;
    private btnCardLock: eui.Button;
    private imgGrade: eui.Image;
    private groupStar: eui.Group;
    private labelCardLevel: eui.Label;
    private btnStrengthen: eui.Button;
    private btnBreak: eui.Button;
    private btnUpStar: eui.Button;
    private btnInstall: eui.Button;
    private labelAttriMain: eui.Label;
    private listAttribute: eui.List;

    private generalId: number;
    private cardType: number;
    /** card's location 1 - 9 */
    private position: number;
    private callback: Function;
    private listCardBagData: eui.ArrayCollection = new eui.ArrayCollection();
    private listAttributeData: eui.ArrayCollection = new eui.ArrayCollection();
    /** The main attribute id for screen. */
    private screenMain = [0];
    /** The addition attribute id for screen */
    private screenAddition = [0, 0, 0];
    /** The unique id for card. */
    private currentSelectedIndex: number = null;
    private cb;
    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterCardEmptyPopDialogSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this);
		}, this)
        this.init();
    }

    private init() {
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.groupRight.visible = false;
        this.groupLeft.visible = true;
        this.groupLeft.x = (this.width - this.groupLeft.width) * 0.5;
        this.groupLeft.y = (this.height - this.groupLeft.height) * 0.5;

        this.btnLeftClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnRightClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnScreen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnScreen, this);
        this.btnCardLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLock, this);
        this.btnCardUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnLock, this);
        this.btnStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrengthen, this)
        this.btnBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBreak, this);
        this.btnUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpStar, this);
        this.btnInstall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInstall, this);
    }

    /**
     * Set info.
     * 
     * @param generalId The hunter's ID.
     * @param cardType  The card's Type(1-6). 
     * @param pos       The card's position(1-9).
     * @param callback  The callback Function.
     */
    public setInfo(generalId: number, cardType: number, pos: number, callback: Function, cb: Function) {

        // 添加背景
        let rect_back = new eui.Rect();
        rect_back.fillAlpha = 0;
        egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
        rect_back.name = "__rect_back";
        this.addChildAt(rect_back, 0);
        rect_back.width = UIManager.StageWidth;
        rect_back.height = UIManager.StageHeight * 1.5;
        rect_back.x = 0;
        rect_back.y = -UIManager.StageHeight * 0.5;
        this.y = -UIManager.StageHeight;
        egret.Tween.get(this).to({ y: 0 }, 300, egret.Ease.backOut).call(()=>{
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
        });

        this.generalId = generalId;
        this.cardType = cardType;
        this.position = pos;
        this.callback = callback;
        this.cb = cb;
        this.refresh();
        Game.EventManager.event(GameEvent.SHOW_UI, {typeName: "zj.HunterCardEmptyPopDialog"});
    }

    private refresh() {
        let namePath = UIConfig.UIConfig_Hunter_Card.card_type_title[this.cardType - 1];
        this.imgCardTypeName.source = cachekey(namePath, this);

        this.loadCardBagList();

        // fix bug: lock or unlock success, refresh the right ui
        if (this.currentSelectedIndex != null) {
            this.setRightUI();
        }
    }

    private loadCardBagList() {
        let cardList = PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);

        this.listCardBagData.removeAll();
        for (let i = 0; i < cardList.length; i++) {
            let v = cardList[i];
            let data = new HunterCardPopItemData();
            data.info = v;
            data.cardType = this.cardType;
            if (this.currentSelectedIndex != null && v instanceof message.PotatoInfo) {
                data.isSelected = (this.currentSelectedIndex == v.index);
            }
            this.listCardBagData.addItem(data);
        }
        this.listCardBag.dataProvider = this.listCardBagData;
        this.listCardBag.itemRenderer = HunterCardPopItem;
        this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
    }

    private onCardListTap(e: eui.ItemTapEvent) {
        let data = this.listCardBagData.getItemAt(e.itemIndex) as HunterCardPopItemData;
        if (data == null || data == undefined) return;
        let thisOne = this;
        if ((data.info instanceof message.PotatoInfo) == false) { // click button to get
            loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
                // set item id
                let goodsId = TableEnum.Enum.CardTypeDropId[thisOne.cardType - 1];
                dialog.setInfo(goodsId, thisOne, () => {
                    thisOne.refresh();
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
            return;
        }

        data.isSelected = true;
        this.listCardBagData.replaceItemAt(data, e.itemIndex);

        if (this.currentSelectedIndex != e.itemIndex) {
            let [lastIndex, lastData] = this.getSelectedCard();
            if (lastIndex != null && lastData != null) {
                lastData.isSelected = false;
                this.listCardBagData.replaceItemAt(lastData, lastIndex);
            }
        }

        if (this.currentSelectedIndex == null) {
            this.showAnimation();
        }

        this.currentSelectedIndex = (data.info as message.PotatoInfo).index;

        this.setRightUI();
        if (Game.TeachSystem.curPart == 8006 || Game.TeachSystem.curPart == 8022) Teach.addTeaching();
    }

    private getSelectedCard(): [number, HunterCardPopItemData] {
        let index = null;
        let selectedData = null;
        for (let i = 0; i < this.listCardBagData.length; i++) {
            let data = this.listCardBagData.getItemAt(i) as HunterCardPopItemData;
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

    private isEnd: boolean = false;

    private showAnimation() {
        let centerX = this.width * 0.5;
        let centerY = this.height * 0.5;
        let space = 0;
        let leftDestX = centerX - this.groupLeft.width - space;

        egret.Tween.get(this.groupLeft).
            to({ x: leftDestX }, 500, egret.Ease.backInOut).
            call(() => {
                this.groupRight.visible = true;
                let rightDestX = centerX + space;
                let rightDestY = centerY - this.groupRight.height * 0.5;

                this.groupRight.x = rightDestX;
                this.groupRight.y = 0 - this.groupRight.height;

                egret.Tween.get(this.groupRight).to({ y: rightDestY }, 350, egret.Ease.sineOut).call(() => {
                    this.isEnd = true;
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
                });
            });
    }

    private hideAnimation() {
        if (this.groupRight.visible == false) return;

        let centerX = this.width * 0.5;
        let space = 0;
        let leftDestX = centerX - this.groupLeft.width * 0.5;
        let rightDestX = centerX + space;
        let rightDestY = 0 - this.groupRight.height * 0.5;
        egret.Tween.get(this.groupRight).call(() => {
            this.groupRight.x = rightDestX;
            this.groupRight.y = rightDestY;
            this.groupRight.visible = false;

            this.currentSelectedIndex = null;

            egret.Tween.get(this.groupLeft).to({ x: leftDestX }, 200);
        });
    }

    private setRightUI() {
        let [, data] = this.getSelectedCard();

        if (data.info instanceof message.PotatoInfo) {
            let potatoInfo = TableItemPotato.Item(data.info.id);
            if (potatoInfo == null) {
                toast_warning("potato info is null");
                return;
            }
            let [, framePath,] = PlayerCardSystem.GetItemFrame(data.info.id, data.info);
            let cardPath = potatoInfo.paths;
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_small[potatoInfo.type - 1];
            let gradePath = UIConfig.UIConfig_Hunter_Card.card_difficulty[potatoInfo.rarity - 1];
            this.imgFrame.source = cachekey(framePath, this);
            this.imgCard.source = cachekey(cardPath, this);
            this.imgCardType.source = cachekey(cardTypePath, this);
            this.imgGrade.source = cachekey(gradePath, this);

            this.labelCardNum.text = potatoInfo.num.toString();
            this.labelCardName.text = potatoInfo.name;
            this.labelCardDetails.text = potatoInfo.des;
            this.btnCardLock.visible = data.info.is_lock;
            this.btnCardUnlock.visible = !data.info.is_lock;

            if (data.info.add_attri.length == 4 && data.info.star < 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else if (data.info.add_attri.length == 5 && data.info.star >= 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
            }

            if (data.info.break_level <= 0) {
                this.labelCardLevel.text = data.info.level.toString() + "/" + CommonConfig.card_star_max_level[data.info.star - 1].toString();
            } else {
                this.labelCardLevel.text = data.info.level.toString() + "/" + (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * data.info.break_level).toString();
            }

            this.btnUpStar.visible = (data.info.star != CommonConfig.card_max_star);
            this.btnBreak.visible = !this.btnUpStar.visible;

            this.setAttributeList();
        } else {
            throw Error("type error");
        }
    }

    private setAttributeList() {
        let [, data] = this.getSelectedCard();
        let info = data.info as message.PotatoInfo;

        let [baseAttribute,] = PlayerCardSystem.GetCardBaseAttri(info.id, info.star, info.level);
        this.labelAttriMain.text = baseAttribute[0];

        let addAtr = PlayerCardSystem.GetAddStr(info);
        this.listAttributeData.removeAll();
        for (let i = 0; i < addAtr.length; i++) {
            let v = addAtr[i];
            let data = new HunterCardAttriItemData();
            data.index = i;
            data.description = v[0];
            data.fatherArray = addAtr.length;
            data.cardInfo = info;
            this.listAttributeData.addItem(data);
        }
        this.listAttribute.dataProvider = this.listAttributeData;
        this.listAttribute.itemRenderer = HunterCardAttriItem;
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
                    if (v != 0) {
                        changed = true;
                        break;
                    }
                }
                this.screenAddition = selectedAddition;

                if (changed) {
                    this.hideAnimation();
                }
                this.loadCardBagList();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnStrengthen() {
        loadUI(CardStrengthenMain).then((dialog: CardStrengthenMain) => {
            let [, data] = this.getSelectedCard();
            if (data == null) {
                throw Error("potato info is null");
            }
            let info = data.info as message.PotatoInfo;

            dialog.loadInfo(info, (isRefresh: boolean, isBreak: boolean) => {
                if (isRefresh) {
                    this.refresh();
                }
                if (isBreak) {
                    egret.setTimeout(() => {
                        this.onBtnBreak();
                    }, this, 500);
                }
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnBreak() {
        loadUI(CardBreakMainDialog).then((dialog: CardBreakMainDialog) => {
            let [, data] = this.getSelectedCard();
            if (data == null) {
                throw Error("potato info is null");
            }
            let info = data.info as message.PotatoInfo;

            dialog.loadInfo(info, () => {
                this.refresh();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnUpStar() {
        loadUI(CardUpStarNewDialog).then((dialog: CardUpStarNewDialog) => {
            let [, data] = this.getSelectedCard();
            if (data == null) {
                throw Error("potato info is null");
            }
            let info = data.info as message.PotatoInfo;

            dialog.setInfo(info, () => {
                this.refresh();
            });

            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnInstall() {
        let [, data] = this.getSelectedCard();
        if (data == null) {
            throw Error("potato info is null");
        }
        let info = data.info as message.PotatoInfo;

        Game.PlayerHunterSystem.potatoWear(this.generalId, info.index, this.position, false).then(() => {
            Game.PlayerCardSystem.deleteCardByIndex(info.index);

            Game.SoundManager.playEffect(SoundManager.SoundOpen(30055));
            this.close(UI.HIDE_TO_TOP);
            if (this.callback) {
                this.callback(true);
            }
        });
        if (Teach.m_bOpenTeach && Game.TeachSystem.curPart == 8006) {
            // Teach.addTeaching();
        }
    }

    private onBtnLock() {
        this.sendLockRequest(false);
    }

    private onBtnUnLock() {
        this.sendLockRequest(true);
    }

    private sendLockRequest(lock: boolean) {
        let [, data] = this.getSelectedCard();
        if (data == null) {
            throw Error("potato info is null");
        }
        let info = data.info as message.PotatoInfo;

        Game.PlayerHunterSystem.potatoLock(0, lock, 0, info.index).
            then(() => {
                if (lock) {
                    toast(TextsConfig.TextsConfig_Hunter.card_lock_tips);
                } else {
                    toast(TextsConfig.TextsConfig_Hunter.card_unlock_tips);
                }
                this.refresh();
            });
    }

    private onBtnClose() {
        let rect_back = this.getChildByName("__rect_back");
        if (rect_back && rect_back.parent) rect_back.parent.removeChild(rect_back);
        egret.Tween.get(this).to({ y: -UIManager.StageHeight }, 500, egret.Ease.backIn).call(() => {
            this.cb();
        });

    }

    private itemList: Array<HunterCardPopItem> = [];

    private getItemList() {
        this.itemList = [];
        let cardList = PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);
        for (let i = 0; i < cardList.length; i++) {
            let item = this.listCardBag.getElementAt(i) as HunterCardPopItem;
            this.itemList.push(item);
        }
    }
}

}