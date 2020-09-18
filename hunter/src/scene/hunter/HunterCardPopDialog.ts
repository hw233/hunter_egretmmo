namespace zj {
/**
 * @author chen xi 
 * 
 * @date 2018-12-28
 * 
 * @class The already install card dialog.
 */
export class HunterCardPopDialog extends Dialog {
    private btnClose: eui.Button;
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
    private btnUnLoad: eui.Button;
    private btnReplace: eui.Button;
    private labelAttriMain: eui.Label;
    private listAttribute: eui.List;
    private groupTeach: eui.Group;

    private listAttributeData: eui.ArrayCollection = new eui.ArrayCollection();
    private generalId: number;
    private cardInfo: message.PotatoInfo;
    private cardType: number;
    private position: number;
    private callback: Function;
    private battleValue: number;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterCardPopDialogSkin.exml";

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnCardLock.addEventListener(tap, this.onBtnLock, this);
        this.btnCardUnlock.addEventListener(tap, this.onBtnUnLock, this);
        this.btnStrengthen.addEventListener(tap, this.onBtnStrengthen, this);
        this.btnBreak.addEventListener(tap, this.onBtnBreak, this);
        this.btnUpStar.addEventListener(tap, this.onBtnUpStar, this);
        this.btnUnLoad.addEventListener(tap, this.onBtnUnLoad, this);
        this.btnReplace.addEventListener(tap, this.onBtnReplace, this);
    }

    /**
     * Set info.
     * 
     * @param generalId The hunter's ID.
     * @param pos       The card's position(1-9).
     * @param callback  The callback Function.
     */
    public setInfo(generalId: number, cardType: number, pos: number, battleValue, callback: Function) {
        this.generalId = generalId;
        this.cardType = cardType;
        this.position = pos;
        this.battleValue = battleValue;
        this.callback = callback;

        this.refresh();
    }

    private refresh() {
        let cardMap = PlayerHunterSystem.GetHunterCardMap(this.generalId);
        this.cardInfo = cardMap[this.position];
        if (this.cardInfo == null || this.cardInfo == undefined) {
            throw Error("card info is null.");
        }

        let basePotatoInfo = TableItemPotato.Item(this.cardInfo.id);

        let [, bigFrame,] = PlayerCardSystem.GetItemFrame(this.cardInfo.id, this.cardInfo);
        let cardPath = basePotatoInfo.paths;
        let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
        let gradePath = UIConfig.UIConfig_Hunter_Card.card_difficulty[basePotatoInfo.rarity - 1];

        this.imgFrame.source = cachekey(bigFrame, this);
        this.imgCard.source = cachekey(cardPath, this);
        this.imgCardType.source = cachekey(cardTypePath, this);
        this.imgGrade.source = cachekey(gradePath, this);

        this.labelCardNum.text = basePotatoInfo.num.toString();
        this.labelCardName.text = basePotatoInfo.name;
        this.labelCardDetails.text = basePotatoInfo.des;
        if (this.cardInfo.break_level <= 0) {
            this.labelCardLevel.text = this.cardInfo.level.toString() + "/" + CommonConfig.card_star_max_level[this.cardInfo.star - 1].toString();
        } else {
            this.labelCardLevel.text = this.cardInfo.level.toString() + "/" + (CommonConfig.card_star_max_level[5] + 2 * this.cardInfo.break_level).toString();
        }

        if (this.cardInfo.add_attri.length == 4 && this.cardInfo.star < 6) {
            Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else if (this.cardInfo.add_attri.length == 5 && this.cardInfo.star >= 6) {
            Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else {
            Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
        }

        this.btnCardLock.visible = this.cardInfo.is_lock;
        this.btnCardUnlock.visible = !this.cardInfo.is_lock;
        this.btnUpStar.visible = (this.cardInfo.star != CommonConfig.card_max_star);
        this.btnBreak.visible = !this.btnUpStar.visible;

        this.setAttributeList();
    }

    private setAttributeList() {
        // let basePotatoInfo = TableItemPotato.Item(this.cardInfo.id);
        let [baseAttributeString,] = PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level);
        this.labelAttriMain.text = baseAttributeString[0];

        let addAtr = PlayerCardSystem.GetAddStr(this.cardInfo);
        this.listAttributeData.removeAll();
        for (let i = 0; i < addAtr.length; i++) {
            let v = addAtr[i];
            let data = new HunterCardAttriItemData();
            data.index = i;
            data.description = v[0];
            data.cardInfo = this.cardInfo;
            data.fatherArray = addAtr.length;
            this.listAttributeData.addItem(data);
        }
        this.listAttribute.dataProvider = this.listAttributeData;
        this.listAttribute.itemRenderer = HunterCardAttriItem;
    }

    private onBtnLock() {
        this.sendLockRequest(false);
    }

    private onBtnUnLock() {
        this.sendLockRequest(true);
    }

    private sendLockRequest(lock: boolean) {
        let info = Game.PlayerCardSystem.getCardToHunterInfo(this.cardInfo.index);
        if (info == null) {
            throw Error("card info is null");
        }
        Game.PlayerHunterSystem.potatoLock(info.cHostId, lock, this.cardInfo.pos, 0).then(() => {
            if (lock) {
                toast(TextsConfig.TextsConfig_Hunter.card_lock_tips);
            } else {
                toast(TextsConfig.TextsConfig_Hunter.card_unlock_tips);
            }
            this.refresh();
        });
    }

    private onBtnStrengthen() {
        Teach.addTeaching()
        if (this.cardInfo != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPLEVEL, true)) {
            loadUI(CardStrengthenMain).then((dialog: CardStrengthenMain) => {
                dialog.loadInfo(this.cardInfo, (isRefresh: boolean, isBreak: boolean) => {
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
    }

    private onBtnBreak() {
        loadUI(CardBreakMainDialog).then((dialog: CardBreakMainDialog) => {
            dialog.loadInfo(this.cardInfo, () => {
                this.refresh();
            }, () => {
                this.onBtnClose();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnUpStar() {
        Teach.addTeaching()
        if (this.cardInfo != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPSTAR, true)) {
            loadUI(CardUpStarNewDialog).then((dialog: CardUpStarNewDialog) => {
                dialog.setInfo(this.cardInfo, () => {
                    this.refresh();
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }
    }

    private onBtnUnLoad() {
        if (this.cardInfo != null && this.cardInfo.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
            Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = this.cardInfo.index;
        }

        Game.PlayerHunterSystem.potatoWear(this.generalId, 0, this.position, false).then(() => {
            if (this.callback) {
                this.callback();
            }
            this.close(UI.HIDE_TO_TOP);
        });
    }

    private onBtnReplace() {
        loadUI(HunterCardReplaceDialog).then((dialog: HunterCardReplaceDialog) => {
            dialog.setInfo(this.generalId, this.cardType, this.position, this.cardInfo, () => {
                if (this.callback) {
                    this.callback();
                }
                this.refresh();
            }, () => {
                this.onBtnClose();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnClose() {
        let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
        if (hunterInfo.battleValue > this.battleValue) {
            CommonTipBmfont.promptBattleValue(this.battleValue, hunterInfo.battleValue);
        }
        if (this.callback) {
            this.callback();
        }
        this.close(UI.HIDE_TO_TOP);
    }
}

}