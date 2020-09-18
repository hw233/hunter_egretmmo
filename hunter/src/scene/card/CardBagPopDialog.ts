namespace zj {
// created by hhh in 2018/11/15

/************** 卡包部分 卡片获取界面 ****************/

export class CardBagPopDialog extends Dialog {
    private groupTeach: eui.Group;
    private groupGetCard: eui.Group;
    private groupCard1: eui.Group;
    private groupCard2: eui.Group;
    private groupCard3: eui.Group;
    private groupCardAni1: eui.Group;
    private groupCardAni2: eui.Group;
    private groupCardAni3: eui.Group;
    private groupCardContent1: eui.Group;
    private groupCardContent2: eui.Group;
    private groupCardContent3: eui.Group;
    private groupCardAniFront1: eui.Group;
    private groupCardAniFront2: eui.Group;
    private groupCardAniFront3: eui.Group;
    private groupAniBack1: eui.Group;
    private groupAniBack2: eui.Group;
    private groupAniBack3: eui.Group;
    private groupStar1: eui.Group;
    private groupStar2: eui.Group;
    private groupStar3: eui.Group;

    private groupCardArr: Array<eui.Group> = [];
    private groupCardAniArr: Array<eui.Group> = [];
    private groupCardContentArr: Array<eui.Group> = [];
    private groupCardAniFrontArr: Array<eui.Group> = [];
    private groupCardAniBackArr: Array<eui.Group> = [];
    private groupStarArr: Array<eui.Group> = [];

    private labelCardId1: eui.Label;
    private labelCardId2: eui.Label;
    private labelCardId3: eui.Label;
    private labelCardName1: eui.Label;
    private labelCardName2: eui.Label;
    private labelCardName3: eui.Label;
    private labelLevel1: eui.BitmapLabel;
    private labelLevel2: eui.BitmapLabel;
    private labelLevel3: eui.BitmapLabel;
    private labelCardInfo1: eui.Label;
    private labelCardInfo2: eui.Label;
    private labelCardInfo3: eui.Label;
    private labelConstRarity1: eui.Label;
    private labelConstRarity2: eui.Label;
    private labelConstRarity3: eui.Label;

    private labelCardIdArr: Array<eui.Label> = [];
    private labelCardNameArr: Array<eui.Label> = [];
    private labelLevelArr: Array<eui.BitmapLabel> = [];
    private labelCardInfoArr: Array<eui.Label> = [];

    private imageIcon1: eui.Image;
    private imageIcon2: eui.Image;
    private imageIcon3: eui.Image;
    private imageCardType1: eui.Image;
    private imageCardType2: eui.Image;
    private imageCardType3: eui.Image;
    private imageFrame1: eui.Image;
    private imageFrame2: eui.Image;
    private imageFrame3: eui.Image;
    private imageGradeLevel1: eui.Image;
    private imageGradeLevel2: eui.Image;
    private imageGradeLevel3: eui.Image;
    private imageBack1: eui.Image;
    private imageBack2: eui.Image;
    private imageBack3: eui.Image;

    private imageIconArr: Array<eui.Image> = [];
    private imageCardTypeArr: Array<eui.Image> = [];
    private imageFrameArr: Array<eui.Image> = [];
    private imageGradeLevelArr: Array<eui.Image> = [];
    private imageBackArr: Array<eui.Image> = [];

    private btnGetCard: eui.Button;

    private groupCardCenterX: number;

    private father: CardBag;
    private cardInfo: Array<message.PotatoInfo>;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBagPopDialogSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);

        this.init();
    }

    private init() {
        this.labelConstRarity1.text = LANG("稀有度：");
        this.labelConstRarity2.text = LANG("稀有度：");
        this.labelConstRarity3.text = LANG("稀有度：");

        this.btnGetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCard, this);
        // this.groupCard1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard1, this);
        // this.groupCard2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard2, this);
        // this.groupCard3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard3, this);

        egret.Tween.get(this.btnGetCard).to({ alpha: 0 });
        this.btnGetCard.enabled = false;

        this.groupCardArr = [
            this.groupCard1,
            this.groupCard2,
            this.groupCard3
        ];
        this.groupCardAniArr = [
            this.groupCardAni1,
            this.groupCardAni2,
            this.groupCardAni3
        ];
        this.groupCardContentArr = [
            this.groupCardContent1,
            this.groupCardContent2,
            this.groupCardContent3
        ];
        this.groupCardAniFrontArr = [
            this.groupCardAniFront1,
            this.groupCardAniFront2,
            this.groupCardAniFront3
        ];
        this.groupCardAniBackArr = [
            this.groupAniBack1,
            this.groupAniBack2,
            this.groupAniBack3
        ];
        this.groupStarArr = [
            this.groupStar1,
            this.groupStar2,
            this.groupStar3,
        ];

        this.labelCardIdArr = [
            this.labelCardId1,
            this.labelCardId2,
            this.labelCardId3
        ];
        this.labelCardNameArr = [
            this.labelCardName1,
            this.labelCardName2,
            this.labelCardName3
        ];
        this.labelLevelArr = [
            this.labelLevel1,
            this.labelLevel2,
            this.labelLevel3
        ];
        this.labelCardInfoArr = [
            this.labelCardInfo1,
            this.labelCardInfo2,
            this.labelCardInfo3
        ];

        this.imageIconArr = [
            this.imageIcon1,
            this.imageIcon2,
            this.imageIcon3
        ];
        this.imageCardTypeArr = [
            this.imageCardType1,
            this.imageCardType2,
            this.imageCardType3
        ];
        this.imageFrameArr = [
            this.imageFrame1,
            this.imageFrame2,
            this.imageFrame3
        ];
        this.imageGradeLevelArr = [
            this.imageGradeLevel1,
            this.imageGradeLevel2,
            this.imageGradeLevel3
        ];
        this.imageBackArr = [
            this.imageBack1,
            this.imageBack2,
            this.imageBack3
        ];

        this.groupCard1.touchEnabled = false;
        this.groupCard2.touchEnabled = false;
        this.groupCard3.touchEnabled = false;

        this.groupGetCard.alpha = 0;
        this.groupGetCard.scaleX = 0;
        this.groupGetCard.scaleY = 0;

        this.groupCardCenterX = this.groupCard2.x;

        for (let i = 0; i < 3; i++) {
            this.groupCardArr[i].x = this.groupCardCenterX;
            // this.groupCardAniArr[i].alpha = 0;
            this.groupCardContentArr[i].alpha = 0;
            this.groupCardContentArr[i].visible = false;
            // this.groupCardAniFrontArr[i].visible = false;
        }
    }

    private setCardInfo(info) {
        this.cardInfo = info;

        for (let i = 0; i < 3; i++) {
            let curCard: message.PotatoInfo = info[i];
            let curTbl = TableItemPotato.Item(curCard.id);
            let [_, bigFramePic, __] = PlayerCardSystem.GetItemFrame(curCard.id);

            this.labelCardIdArr[i].text = curTbl.num;
            this.labelCardNameArr[i].text = curTbl.name;
            this.labelLevelArr[i].text = curCard.level + "";
            this.labelCardInfoArr[i].text = curTbl.des;

            let iconArrPath = curTbl.paths;
            let cardTypeArrPath = UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1];
            let frameArrPath = bigFramePic;
            let gradeLevelArrPath = UIConfig.UIConfig_Hunter_Card.card_difficulty[curTbl.rarity - 1];

            this.imageIconArr[i].source = cachekey(iconArrPath, this);
            this.imageCardTypeArr[i].source = cachekey(cardTypeArrPath, this);
            this.imageFrameArr[i].source = cachekey(frameArrPath, this);
            this.imageGradeLevelArr[i].source = cachekey(gradeLevelArrPath, this);

            if (curCard.add_attri.length + 1 == 5 && curCard.star < 6 || curCard.add_attri.length + 1 == 5 && curCard.star >= 6) {
                Helper.SetStar(this.groupStarArr[i], curCard.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            }
            else {
                Helper.SetStar(this.groupStarArr[i], curCard.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }
        }
    }

    public playAni(cardInfo, father: CardBag) {
        let aniNameArr = [
            "kapai_baise",
            "kapai_zise",
            "kapai_chengse",
            "kapai_hongse"
        ];
        this.father = father;

        this.setCardInfo(cardInfo);

        let cardMoveBy = (index, node, posX) => {
            let curCard = cardInfo[index];
            let curTbl = TableItemPotato.Item(curCard.id);
            let aniName = "kapai_baise";
            if (curTbl.quality >= 3) {
                // 3蓝 4紫 5橙 6红
                aniName = aniNameArr[curTbl.quality - 3];
            }

            egret.Tween.get(this.groupCardAniBackArr[index])
                .to({ x: node.x + posX }, 350, egret.Ease.sineInOut);

            egret.Tween.get(node)
                .to({ x: node.x + posX }, 350, egret.Ease.sineInOut)
                .wait(850 * (index + 1))
                .call(() => {
                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "000_chuxian", 1)
                        .then(display => {
                            display.scaleX = 1.2;
                            display.scaleY = 1.24;
                            display.x = this.groupCardArr[index].width / 2;
                            display.y = this.groupCardArr[index].height / 2 - 30;
                            this.groupCardArr[index].addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "001_xunhuan_qian", 0)
                        .then(display => {
                            display.x = this.groupCardAniFrontArr[index].width / 2;
                            display.y = this.groupCardAniFrontArr[index].height / 2;
                            this.groupCardAniFrontArr[index].addChild(display);
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

                                .to({ x: node.x - 1, y: node.y + 2 }, 30)
                                .to({ x: node.x + 1, y: node.y - 2 }, 20)
                        }
                    }
                })
                .wait(800)
                .wait((22 / 60 + index * 3 / 60) * 100)
                .call(() => {
                    this.groupCardContentArr[index].visible = true;
                    this.groupCardContentArr[index].alpha = 1;
                    this.imageBackArr[index].visible = false;

                    Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "002_xunhuan_hou", 0)
                        .then(display => {
                            display.scaleX = 1.2;
                            display.scaleY = 1.2;
                            display.x = this.groupCardAniBackArr[index].width / 2;
                            display.y = this.groupCardAniBackArr[index].height / 2;
                            this.groupCardAniBackArr[index].addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });
                })
            Game.PlayerInfoSystem.playAnnouce = true;
        };

        egret.Tween.get(this.groupGetCard)
            .to({ alpha: 1 }, 450)
            .to({ scaleX: 1, scaleY: 1, }, 450, egret.Ease.backOut)
            .call(() => {
                for (let i = 0; i < 3; i++) {
                    cardMoveBy(i, this.groupCardArr[i], (i + 1) * 300 - 2 * 305);
                }
            })
            .wait(3500)
            .call(() => {
                egret.Tween.get(this.btnGetCard).to({ alpha: 1 }, 300).call(()=>{
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
                });
                this.btnGetCard.enabled = true;
                this.groupCard1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard1, this);
                this.groupCard2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard2, this);
                this.groupCard3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard3, this);
            })
    }

    private onTouchGroupCard1() {
        TipManager.ShowCard(this.cardInfo[0]);
    }

    private onTouchGroupCard2() {
        TipManager.ShowCard(this.cardInfo[1]);
    }

    private onTouchGroupCard3() {
        TipManager.ShowCard(this.cardInfo[2]);
    }

    private onBtnGetCard() {
        this.father.setUI();
        this.close(UI.HIDE_TO_TOP);
    }
}

}