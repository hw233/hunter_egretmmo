namespace zj {
// created by hhh in 2018/11/14

/************** 碎片界面 ****************/

export class CardCompose extends CardBase {
    private groupFull: eui.Group;
    private groupAddAttri: eui.Group;
    private groupRandom: eui.Group;
    private groupStar: eui.Group;
    private groupSelectLeft: eui.Group;
    private groupSelectRight: eui.Group;
    private groupIcon: eui.Group;

    private listCardChip: eui.List;

    private btnCompose: eui.Button;
    private btnAddCardChip: eui.Button;

    private labelCardNum: eui.Label;
    private labelCardName: eui.Label;
    private labelCardDes: eui.Label;
    private labelLevel: eui.BitmapLabel;
    private labelMainAttribute: eui.Label;
    private labelMaxAttribute: eui.Label;
    private labelMainAttriConst: eui.Label;
    private labelDeputyAttriConst: eui.Label;
    private labelRealConst: eui.Label;
    private labelCardChipNum: eui.Label;
    private labelRandomCardDes: eui.Label;
    private labelRandomCost: eui.Label;

    private imageCardPic: eui.Image;
    private imageCardType: eui.Image;
    private imageRare: eui.Image;
    private imageCardFrame: eui.Image;
    private imageExpBar: eui.Image;
    private imageBoard: eui.Image;
    private imageSmallCard: eui.Image;
    private imageCardGrade: eui.Image;

    private imageExpBarWidth: number = 0;

    private scrollerAttribute: eui.Scroller;
    private listAttribute: eui.List;

    private isFirstOpen: boolean = true;

    private listCardChipData: eui.ArrayCollection = new eui.ArrayCollection();

    private cardComposeGoods: Array<{ product_id: number, need_ids: Array<number>, need_counts: Array<number>, have_counts: Array<number>, counts_per: Array<number>, can_compose: number, randomCard: number, isSel: boolean }> = [];

    private curSel: number = 0;
    private lastSel: number = 0;

    private curTbl: TableItemPotato = null;
    private pieceTbl: TableItemProp = null;

    private groupAnimate: eui.Group;
    private imgMask: eui.Image;

        private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardComposeSkin.exml";

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = false;

        this.init();
    }

    private init() {
        this.labelMainAttriConst.text = LANG("主属性：");
        this.labelDeputyAttriConst.text = LANG("副属性：");
        this.labelRealConst.text = LANG("稀有度：");

        this.imageExpBarWidth = this.imageExpBar.width;

        this.listCardChip.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);
        this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCompose, this);
        this.btnAddCardChip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddCardChip, this);

        Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0)
            .then(display => {
                display.skewY = 180;
                display.x = this.groupSelectLeft.width / 2;
                display.y = this.groupSelectLeft.height / 2;
                this.groupSelectLeft.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0)
            .then(display => {
                display.x = this.groupSelectRight.width / 2;
                display.y = this.groupSelectRight.height / 2;
                this.groupSelectRight.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        this.setUI();
    }

    public setUI() {
        this.cardComposeGoods = PlayerCardSystem.GetComposeTbl();

        this.curSel = 0;

        if (this.curTbl != null && this.pieceTbl != null) {
            for (let k in this.cardComposeGoods) {
                let v = this.cardComposeGoods[k];
                if (v.need_ids[0] == this.pieceTbl.id) {
                    this.curSel = Number(k);
                    break;
                }
            }
        }

        this.curSel = this.curSel || 0;
        this.lastSel = this.curSel;

        this.setBottomList();
    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            //||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true; //UIConfig.UIConfig_Role.mask.soul
        }

        return false;
    }

    private setBottomList() {
        this.listCardChip.itemRenderer = CardComposeItem;
        this.listCardChipData.source = this.cardComposeGoods;
        this.listCardChip.dataProvider = this.listCardChipData;
        this.listCardChip.selectedIndex = this.curSel;

        this.setBigCard(this.curSel);
        this.setPieceInfo(this.curSel);

        this.scrollList(this.getCardIndex(this.cardComposeGoods[this.curSel].product_id));
    }

    private getCardIndex(id: number) {
        let index: number = -1;
        if (id == null || id == undefined || id == 0) {
            return index;
        }

        for (let i = 0; i < this.listCardChipData.length; i++) {
            let data = this.listCardChipData.getItemAt(i) as any;
            if (data.product_id != null && data.product_id === id) {
                index = i;
            }
        }
        return index;
    }

    private scrollList(selectedIndex: number) {
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }

        if (selectedIndex >= 6) {
            let item = new CardComposeItem();
            let gap = 0;
            let scrollWidth = (item.width + gap) * selectedIndex;

            if (selectedIndex > this.cardComposeGoods.length - 6)
                scrollWidth = (item.width + gap) * (this.cardComposeGoods.length - 6);

            egret.Tween.get(this.listCardChip)
                .to({ scrollH: scrollWidth }, 350, egret.Ease.backIn);
        }
    }

    private cardType: number = 1;
    private cardPath: string;

    private setBigCard(index: number) {
        if (this.cardComposeGoods[index].randomCard == 0) {
            this.cardType = 1;
            this.imageCardType.visible = true;
            this.groupFull.visible = true;
            this.groupAddAttri.visible = true;
            this.groupRandom.visible = false;

            let itemId = this.cardComposeGoods[index].product_id;
            this.pieceTbl = TableItemProp.Item(this.cardComposeGoods[index].need_ids[0]);
            this.curTbl = TableItemPotato.Item(itemId);
            let [_, bigFramePic, __] = PlayerCardSystem.GetItemFrame(itemId);
            let baseAttri = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curTbl.star, 1)[0];
            this.labelMainAttribute.text = baseAttri[0];

            this.labelCardName.text = this.curTbl.name;
            this.labelCardNum.text = this.curTbl.num;
            this.labelLevel.text = "1";
            this.labelCardDes.text = this.curTbl.des;
            let baseAttriFull = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, CommonConfig.card_max_star, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1])[1];
            this.labelMaxAttribute.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_full_attr, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1], baseAttriFull[0]);

            let imgCardPicPath = this.curTbl.paths;
            let imgCardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1];
            let imgRarePath = UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1];
            let imgCardFramePath = bigFramePic;

            this.imageCardPic.source = cachekey(imgCardPicPath, this);
            this.imageCardType.source = cachekey(imgCardTypePath, this);
            this.imageRare.source = cachekey(imgRarePath, this);
            this.imageCardFrame.source = cachekey(imgCardFramePath, this);

            Helper.SetStar(this.groupStar, this.curTbl.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);

            let addStr = PlayerCardSystem.GetAddStrNotGet(this.curTbl);

                this.listAttriData.removeAll();
            for (let i = 0; i < addStr.length; i++) {
                    let itemData = new CardAttriItemData();
                    itemData.index = i;
                    itemData.info = addStr[i];
                    itemData.width = this.scrollerAttribute.width;
                    itemData.type = 1;
                    itemData.isHideBG = true;
                    this.listAttriData.addItem(itemData);
            }
                this.listAttribute.dataProvider = this.listAttriData;
                this.listAttribute.itemRenderer = CardAttriItem;
        }
        // 当卡片为随机生成
        else {
            this.cardType = 2;
            this.imageCardType.visible = false;
            this.groupFull.visible = false;
            this.groupAddAttri.visible = false;
            this.groupRandom.visible = true;

            let cardInfo: TableItemProp = <TableItemProp>PlayerItemSystem.ItemConfig(this.cardComposeGoods[index].need_ids[0]);
            this.pieceTbl = TableItemProp.Item(this.cardComposeGoods[index].need_ids[0]);
            let picRaity = UIConfig.UIConfig_Hunter_Card.card_difficulty[Number(cardInfo.compose_rarity) - 1];
            let bigPath = UIConfig.UIConfig_Role.cardFrame[cardInfo.compose_quality];

            this.labelCardNum.text = "X";
            this.labelCardName.text = cardInfo.compose_name;
            this.labelLevel.text = "1";
            this.labelCardDes.textFlow = Util.RichText(cardInfo.extra);
            this.labelRandomCardDes.textFlow = Util.RichText(cardInfo.otherDes);
            this.labelRandomCost.text = this.cardComposeGoods[index].need_counts[0] + "";

            this.imageCardGrade.source = cachekey(picRaity, this);
            this.imageCardFrame.source = cachekey(bigPath, this);
            this.imageCardPic.source = cachekey(cardInfo.compose_path, this);

            this.cardPath = cardInfo.path;
            if (cardInfo.compose_purple != "")
                Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            else
                Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
        }
    }

    private setPieceInfo(index: number) {
        // 此处动画改好后 需要将注释打开
        // Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "001_daojuguang_02", null, 0)
        //     .then(display => {
        //         display.x =  this.groupIcon.width / 2;
        //         display.y = this.groupIcon.height / 2;
        //         this.groupIcon.addChild(display);
        //     })
        //     .catch(reason => {
        //         toast(reason);
        //     });

        let curTbl = this.cardComposeGoods[index];
        let strPercent = curTbl.have_counts[0] + "/" + curTbl.need_counts[0];

        let itemInfo = <TableItemProp>PlayerItemSystem.ItemConfig(curTbl.need_ids[0]);
        this.imageBoard.source = cachekey(UIConfig.UIConfig_Soul[itemInfo.quality], this);
        if (this.cardType == 1) {
            this.imageSmallCard.source = cachekey(this.curTbl.path, this);
            this.imageSmallCard.scaleX = 1;
            this.imageSmallCard.scaleY = 1;
            this.imageSmallCard.horizontalCenter = 3;
            this.imageSmallCard.verticalCenter = 0.5
        }
        else {
            this.imageSmallCard.source = cachekey(this.cardPath, this);
            this.imageSmallCard.scaleX = 0.7;
            this.imageSmallCard.scaleY = 0.8;
            this.imageSmallCard.horizontalCenter = 0;
            this.imageSmallCard.verticalCenter = -3;
        }

        if (this.isImgMask(curTbl.need_ids[0])) {
            this.imgMask.visible = true;
            this.imageSmallCard.mask = this.imgMask;
        }

        this.imageExpBar.width = curTbl.counts_per[0] * this.imageExpBarWidth;
        this.labelCardChipNum.text = strPercent;
    }

    private onCardSelChange() {
        this.curSel = this.listCardChip.selectedIndex;

        this.setBigCard(this.curSel);
        this.setPieceInfo(this.curSel);

        this.lastSel = this.curSel;

        // let data = this.listCardChipData.getItemAt(this.curSel);
        // for (let i = 0; i < this.listCardChipData.length; i++) {
        //     if (i == this.listCardChip.selectedIndex) {
        //         data.isSel = true;
        //         this.listCardChipData.replaceItemAt(this.cardComposeGoods[this.curSel], this.listCardChip.selectedIndex);
        //     }
        //     else {
        //         data.isSel = false;
        //         this.listCardChipData.replaceItemAt(this.cardComposeGoods[i], i);
        //     }
        // }
    }

    private onBtnCompose() {
        // Game.PlayerInfoSystem.playAnnouce = false
        if (this.cardComposeGoods[this.curSel] != null) {
            let itemId = this.cardComposeGoods[this.curSel].need_ids[0];
            Game.PlayerCardSystem.cardCompose(itemId)
                .then((value) => {
                    this.playBreakBag(value);
                })
                .catch((reason) => {
                    // Game.PlayerInfoSystem.playAnnouce = true;
                });
        }
    }

    private playBreakBag(cardInfo) {
        loadUI(CardComposeEndDialog)
            .then((dialog: CardComposeEndDialog) => {
                dialog.playAni(cardInfo[0], this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnAddCardChip() {
        let cb = () => {
            let getId = this.cardComposeGoods[this.curSel].product_id;
            let canCompose = 1;
            for (let k in this.cardComposeGoods[this.curSel].need_ids) {
                let havaCount = PlayerItemSystem.Count(this.cardComposeGoods[this.curSel].need_ids[k]);
                let needCounts = this.cardComposeGoods[this.curSel].need_counts[k];
                let perCounts = havaCount / needCounts >= 1 ? 1 : havaCount / needCounts;
                this.cardComposeGoods[this.curSel].have_counts[k] = havaCount;
                if (this.cardComposeGoods[this.curSel].can_compose && needCounts != null && havaCount < needCounts)
                    this.cardComposeGoods[this.curSel].can_compose = 0;

                this.listCardChipData.replaceItemAt(this.cardComposeGoods[this.curSel], this.curSel);
                this.listCardChip.selectedIndex = this.curSel;
                this.lastSel = this.curSel;

                this.setPieceInfo(this.curSel);
            }
        };

        let itemId: number = this.cardComposeGoods[this.curSel].need_ids[0];

        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(itemId, this, cb);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }
}

}