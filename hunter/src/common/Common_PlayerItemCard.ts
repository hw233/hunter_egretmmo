namespace zj {
    /**
     * @author chen xi 
     * 
     * @date 2018-12-3
     * 
     * @class  详情卡片item
     */
    export class Common_PlayerItemCard extends eui.ItemRenderer {
        private groupMain: eui.Group;
        private groupUnLock: eui.Group;
        private groupGetCard: eui.Group;
        private imgCardBoard: eui.Image;
        private imgCard: eui.Image;
        private labelNumber: eui.Label;
        private labelName: eui.Label;
        private labelLevel: eui.BitmapLabel;
        private imgCardType: eui.Image;
        private groupStar: eui.Group;
        private groupDontGet: eui.Group;
        private imgTypeBig: eui.Image;
        // private imgAdd: eui.Image;
        // private imgRed: eui.Image;
        private groupLock: eui.Group;
        private imgTypeBigLock: eui.Image;
        private imgLock: eui.Image;
        private labelLock: eui.Label;
        private uiType: CardUIType;

        constructor() {
            super();
            this.skinName = "resource/skins/common/Common_PlayerItemCardSkin.exml";
            // this.groupMain.cacheAsBitmap = true;
        }

        protected dataChanged() {
            this.updateView(this.data);
        }

        private updateView(data: Common_PlayerItemCardData) {
            let unLock = (Game.PlayerInfoSystem.Level >= data.cardLevel);

            this.groupLock.visible = !unLock;
            this.groupUnLock.visible = unLock;
            this.groupGetCard.visible = (data.cardInfo != null);
            this.groupDontGet.visible = (data.cardInfo == null);

            if (unLock) {
                if (data.cardInfo != null) {
                    this.uiType = CardUIType.CARD;
                    this.setUICard(data);
                } else {
                    this.uiType = CardUIType.NOCARD;
                    this.setUINoCard(data);
                }
            } else {
                this.uiType = CardUIType.LOCK;
                this.setUILock(data);
            }
        }

        // set group un lock
        private setUICard(data: Common_PlayerItemCardData) {
            let potatoInfo = TableItemPotato.Item(data.cardInfo.id);

            this.labelName.text = potatoInfo.name;
            this.labelNumber.text = potatoInfo.num;
            this.labelLevel.text = data.cardInfo.level.toString();

            let cardPath = potatoInfo.paths;
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_small[potatoInfo.type - 1];
            let [, , framePath] = PlayerCardSystem.GetItemFrame(potatoInfo.id);
            this.imgCard.source = cachekey(cardPath, this);
            this.imgCardType.source = cachekey(cardTypePath, this);
            this.imgCardBoard.source = cachekey(framePath, this);

            if (data.cardInfo.add_attri.length + 1 == 5 && data.cardInfo.star < 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else if (data.cardInfo.add_attri.length == 5 && data.cardInfo.star >= 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else {
                Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
            }


        }

        // set group dont get card
        private setUINoCard(data: Common_PlayerItemCardData) {
            // this.imgRed.visible = PlayerCardSystem.GetHaveCardByType(data.cardType);
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBig.source = cachekey(cardTypePath, this);
        }

        // set group lock
        private setUILock(data: Common_PlayerItemCardData) {
            this.labelLock.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_unlock, data.cardLevel);
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBigLock.source = cachekey(cardTypePath, this);
        }

        // private updateView(data: Common_PlayerItemCardData) {
        //     let index = data.index;
        //     let tableInfo = PlayerHunterSystem.Table(data.generalId);
        //     let type = tableInfo.card_type[index];
        //     let unlockLevel = tableInfo.card_level[index];
        //     let info = data.potatoInfo;

        //     let unLock:boolean;
        //     if (data.heroData == null) {
        //         unLock = (Game.PlayerInfoSystem.Level >= unlockLevel);
        //     } else {
        //         unLock = (data.heroData.Level >= unlockLevel);
        //     }

        //     this.visible = (type != null);
        //     this.groupLock.visible = !unLock;
        //     this.groupUnLock.visible = unLock;
        //     this.groupGetCard.visible = (info != null);
        //     this.groupDontGet.visible = (info == null);

        //     if (info != null) {
        //         this.labelLevel.text = String(info.level);

        //         let tbl = TableItemPotato.Item(info.id);
        //         this.labelName.text = tbl.name;
        //         this.labelNumber.text = tbl.num;
        //         this.imgCardType.source = UIConfig.UIConfig_Hunter_Card.card_type_small[tbl.type];
        //         this.imgCard.source = tbl.paths;

        //         if (info.add_attri.length + 1 == 5) {
        //             Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        //         } else {
        //             Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
        //         }

        //         let [, , bigFramePic] = PlayerCardSystem.GetItemFrame(info.id);
        //         this.imgCardBoard.source = bigFramePic;
        //     } else if(unLock == true && info == null) {
        //         this.imgTypeBigLock.source = UIConfig.UIConfig_Hunter_Card.card_type[type - 1];
        //     } else {
        //         this.labelLock.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_unlock, unlockLevel);
        //     }
        // }
    }



    export class Common_PlayerItemCardData {
        // /** 索引下标 */
        // index: number;

        // /** 武将ID */
        // generalId: number;

        // /** 宝物信息 */
        // potatoInfo: message.PotatoInfo;

        // /** 是否从查看详情进入 */
        // isShowFromDetail: boolean = false;

        // heroData: any = null;

        generalId: number;

        cardType: number;

        cardLevel: number;

        /** The current hunter's potato's info, may be null. */
        cardInfo: message.PotatoInfo = null;

        father: Common_ViewHeroDetail = null;
    }
}