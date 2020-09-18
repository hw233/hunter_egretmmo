namespace zj {
// created by hhh in 2018/11/15

/************** 合成部分子界面 ****************/

export class CardComposeEndDialog extends Dialog {
    private groupAll: eui.Group;
    private groupSpineAni: eui.Group;
    private groupSpineAni2: eui.Group;
    private groupCard: eui.Group;
    private groupCardAni: eui.Group;
    private groupCardInfo: eui.Group;
    private groupCardContent: eui.Group;
    private groupCardAniFront: eui.Group;
    private groupCardBackAni: eui.Group;
    private groupStar: eui.Group;

    private scroAttribute: eui.Scroller;
    private listAttribute: eui.List;

    private imageBackBoard: eui.Image;
    private imageCardBack: eui.Image;
    private imageCardFrame: eui.Image;
    private imageIcon: eui.Image;
    private imageCardType: eui.Image;

    private labelMainAttriConst: eui.Label;
    private labelDeputyAttriConst: eui.Label;
    private labelRealConst: eui.Label;
    private labelMainAttribute: eui.Label;
    private labelCardName: eui.Label;
    private labelCardNum: eui.Label;
    private labelCardDetails: eui.Label;
    private labelLevel: eui.BitmapLabel;
    private labelEnd: eui.Label;

    private bAniEnd: boolean;
    private posInfoX: number;
    private posInfoY: number;
    private posConX: number;
    private posConY: number;
    private posMainX: number;
    private posMainY: number;
    private posBackX: number;
    private posBackY: number;
    private posBoardX: number;
    private posBoardY: number;

    private curTbl: TableItemPotato;
    private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();
    private addStr = [];

    private info: message.PotatoInfo;
    private father: CardCompose;

    private aniNameArr = [
        "kapai_baise",
        "kapai_zise",
        "kapai_chengse",
        "kapai_hongse"
    ];

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardComposeEndDialogSkin.exml"
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);

        this.init();
    }

    private init() {
        this.labelMainAttriConst.text = LANG("主属性：");
        this.labelDeputyAttriConst.text = LANG("副属性：");
        this.labelRealConst.text = LANG("稀有度：");

        this.groupCardContent.alpha = 0;
        this.groupCardContent.visible = false;
        this.groupCardInfo.visible = false;

        this.labelMainAttribute.visible = false;
        this.imageBackBoard.visible = false;

        this.bAniEnd = false;
        this.posInfoX = UIManager.StageWidth / 2 - this.groupCardInfo.width / 2;
        this.posConX = UIManager.StageWidth / 2 - this.groupCardContent.width / 2;
        this.posMainX = this.labelMainAttribute.x;
        this.posMainY = this.labelMainAttribute.y;
        this.posBackX = this.imageCardBack.x;
        this.posBackY = this.imageCardBack.y;
        this.posBoardX = this.imageBackBoard.x;
        this.posBoardY = this.imageBackBoard.y;

        this.labelEnd.text = TextsConfig.TextsConfig_Activity.skipAni;
    }

    private setCardInfo(info: message.PotatoInfo) {
        let curCard: message.PotatoInfo = info;
        let curTbl = TableItemPotato.Item(curCard.id);
        let bigFramePic = PlayerCardSystem.GetItemFrame(curCard.id)[1];

        this.labelCardNum.text = curTbl.num;
        this.labelCardName.text = curTbl.name;
        this.labelLevel.text = curCard.level + "";
        this.labelCardDetails.text = curTbl.des;

        this.imageIcon.source = cachekey(curTbl.paths, this);
        this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1], this);
        this.imageCardFrame.source = cachekey(bigFramePic, this);

        if (curCard.add_attri.length + 1 == 5 && curCard.star < 6 || curCard.add_attri.length == 5 && curCard.star >= 6)
            Helper.SetStar(this.groupStar, curCard.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 14);
        else
            Helper.SetStar(this.groupStar, curCard.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 14);
    }

    private setCardAttri(info: message.PotatoInfo) {
        let curCard: message.PotatoInfo = info;
        this.curTbl = TableItemPotato.Item(curCard.id);

        let baseStr = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, curCard.star, curCard.level)[0];
        this.labelMainAttribute.text = baseStr[0];

        this.addStr = PlayerCardSystem.GetAddStr(curCard);

            this.listAttriData.removeAll();
        for (let i = 0; i < this.addStr.length; i++) {
                let itemData = new CardAttriItemData();
                itemData.index = i;
                itemData.info = this.addStr[i];
                itemData.cardInfo = this.info;
                itemData.width = this.scroAttribute.width;
                itemData.addStrlength = this.addStr.length;
                itemData.type = 0;
                itemData.isHideBG = true;
                this.listAttriData.addItem(itemData);
        }
        this.listAttribute.dataProvider = this.listAttriData;
            this.listAttribute.itemRenderer = CardAttriItem;
    }

    public playAni(cardInfo: message.PotatoInfo, father: CardCompose) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);

        this.info = cardInfo;
        this.father = father;
        this.setCardInfo(cardInfo);
        this.setCardAttri(cardInfo);

        Game.DragonBonesManager.playAnimation(this, "cardopen", "armatureName", null, 1)
            .then(display => {
                display.x = 0;
                display.y = this.groupSpineAni.height;
                this.groupSpineAni.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        Game.DragonBonesManager.playAnimation(this, "cardopen2", "armatureName", null, 1)
            .then(display => {
                display.x = 0;
                display.y = this.groupSpineAni2.height;
                this.groupSpineAni2.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        let centerPosX = this.groupAll.x;
        let centerPosY = this.groupAll.y;
        let gap = 0;

        let cardMoveBy = (index, node, posX) => {
            let curCard: message.PotatoInfo = cardInfo;
            let curTbl = TableItemPotato.Item(curCard.id);
            let aniName = "kapai_baise";
            if (curTbl.quality >= 3) {
                // 3蓝 4紫 5橙 6红
                aniName = this.aniNameArr[curTbl.quality - 3];
            }

            egret.Tween.get(node)
                .to({ x: node.x + posX }, 250, egret.Ease.sineInOut)
                .call(() => {

                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "000_chuxian", 1)
                        .then(display => {
                            display.scaleX = 1.2;
                            display.scaleY = 1.24;
                            display.x = this.groupCardAni.width / 2;
                            display.y = this.groupCardAni.height / 2;
                            this.groupCardAni.addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "001_xunhuan_qian", 0)
                        .then(display => {
                            display.x = this.groupCardAniFront.width / 2;
                            display.y = this.groupCardAniFront.height / 2;
                            this.groupCardAniFront.addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                    if (curTbl.quality >= 4) {
                        if (curTbl.quality >= 5) {
                            egret.Tween.get(node)
                                .to({ x: node.x - 2, y: node.y - 3 }, 30)
                                .to({ x: node.x + 3, y: node.y + 2 }, 50)
                                .to({ x: node.x + 3, y: node.y - 2 }, 30)
                                .to({ x: node.x - 4, y: node.y + 3 }, 50)

                                .to({ x: node.x + 2, y: node.y + 1 }, 40)
                                .to({ x: node.x - 3, y: node.y - 2 }, 50)
                                .to({ x: node.x + 2, y: node.y - 1 }, 30)
                                .to({ x: node.x - 1, y: node.y + 2 }, 50)

                                .to({ x: node.x + 2, y: node.y - 1 }, 30)
                                .to({ x: node.x - 2, y: node.y + 1 }, 20)

                                .to({ x: node.x - 1, y: node.y + 2 }, 20)
                                .to({ x: node.x + 1, y: node.y - 2 }, 20)
                        }
                    }
                })
                .wait(800)
                .wait(22 / 60 * 100)
                .call(() => {
                    this.groupCardContent.visible = true;
                    this.groupCardContent.alpha = 1;
                    this.imageCardBack.visible = false;

                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "002_xunhuan_hou", 0)
                        .then(display => {
                            display.scaleX = 1.2;
                            display.scaleY = 1.2;
                            display.x = this.groupCardBackAni.width / 2;
                            display.y = this.groupCardBackAni.height / 2;
                            this.groupCardBackAni.addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });
                });
        };

        egret.Tween.get(this.imageBackBoard)
            .to({ x: this.posBoardX - UIManager.StageWidth }, 0)
            .wait(1420)
            .call(() => { this.imageBackBoard.visible = true; })
            .to({ x: this.posBoardX }, 300);

        egret.Tween.get(this.imageCardBack)
            .wait(1620)
            .call(() => { this.imageCardBack.visible = true; })
            .wait(500)
            .call(() => {
                egret.Tween.get(this.groupCard)
                    .to({ alpha: 1 }, 300)
                    .to({ scaleX: 1 }, 500, egret.Ease.backOut)
                    .call(() => {
                        cardMoveBy(1, this.groupCard, 0);
                    })
                    .wait(1500)
                    .call(() => {
                        this.setInfoAttriAni();
                    })
            });
        Game.PlayerInfoSystem.playAnnouce = true;
    }

    private setInfoAttriAni() {
        let moveTime = 350;
        let moveTime2 = 90;

        egret.Tween.get(this.groupCardInfo)
            .call(() => { this.groupCardInfo.visible = true; })
            .to({ x: this.posInfoX + 130 }, moveTime)
            .call(() => {
                egret.Tween.get(this.labelMainAttribute)
                    .to({ x: this.posMainX + 100 }, 0)
                    .call(() => { this.labelMainAttribute.visible = true; })
                    .to({ x: this.posMainX }, moveTime2);

                for (let i = 0; i < this.addStr.length; i++) {
                    this.listAttriData.replaceItemAt({ stopAni: false, isVisible: true, type: 3, colorWhite: true, index: i, info: this.addStr[i], star: this.curTbl.star, length: this.addStr.length, width: this.scroAttribute.width }, i);
                }

                this.bAniEnd = true;
                this.labelEnd.text = TextsConfig.TextsConfig_Activity.closeUI;
            });

        egret.Tween.get(this.groupCardContent)
            .to({ x: this.posConX - 130 }, moveTime);
        egret.Tween.get(this.groupCardBackAni)
            .to({ x: this.posConX - 130 }, moveTime);
    }

    private onTouchDialog() {
        if (this.bAniEnd) {
            this.father.setUI();
            this.close();
        }
        else {
            this.bAniEnd = true;
            this.labelEnd.text = TextsConfig.TextsConfig_Activity.closeUI;

            this.groupSpineAni.visible = false;
            this.groupSpineAni2.visible = false;

            egret.Tween.pauseTweens(this.groupCard);
            egret.Tween.pauseTweens(this.groupCardInfo);
            egret.Tween.pauseTweens(this.labelMainAttribute);
            egret.Tween.pauseTweens(this.imageCardBack);
            egret.Tween.pauseTweens(this.groupCardContent);
            egret.Tween.pauseTweens(this.imageBackBoard);
            egret.Tween.pauseTweens(this.groupCardBackAni);

            for (let i = 0; i < this.addStr.length; i++) {
                this.listAttriData.replaceItemAt({ stopAni: true, isVisible: true, type: 3, colorWhite: true, index: i, info: this.addStr[i], star: this.curTbl.star, length: this.addStr.length, width: this.scroAttribute.width }, i);
            }

            this.imageBackBoard.visible = true;
            this.imageCardBack.visible = false;
            this.groupCardContent.visible = true;
            this.groupCardContent.alpha = 1;
            this.groupCardInfo.visible = true;

            this.imageBackBoard.x = this.posBoardX;
            this.imageBackBoard.y = this.posBoardY;
            this.labelMainAttribute.visible = true;
            this.labelMainAttribute.x = this.posMainX;
            this.labelMainAttribute.y = this.posMainY;
            this.groupCardInfo.x = this.posInfoX + 130;
            this.groupCardContent.x = this.posConX - 130;
            this.groupCardBackAni.x = this.posConX - 130;

            let aniName = "kapai_baise";
            if (this.curTbl.quality >= 3) {
                aniName = this.aniNameArr[this.curTbl.quality - 3];
            }

            Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "002_xunhuan_hou", 0)
                .then(display => {
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    display.x = this.groupCardBackAni.width / 2;
                    display.y = this.groupCardBackAni.height / 2;
                    this.groupCardBackAni.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }
}

}