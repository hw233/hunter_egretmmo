namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-28
     */
    export class HunterCardMainItem extends eui.ItemRenderer {
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
        private imgAdd: eui.Image;
        private imgRed: eui.Image;
        private groupLock: eui.Group;
        private imgTypeBigLock: eui.Image;
        private imgLock: eui.Image;
        private labelLock: eui.Label;

        public uiType: CardUIType;

        constructor() {
            super();

            this.skinName = "resource/skins/hunter/HunterCardMainItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterCardMainItem"], null);
            // this.cacheAsBitmap = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this);
        }

        protected dataChanged() {
            this.updateView(this.data);
        }

        private updateView(data: HunterCardMainItemData) {
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
        private setUICard(data: HunterCardMainItemData) {
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
        private setUINoCard(data: HunterCardMainItemData) {
            this.imgRed.visible = PlayerCardSystem.GetHaveCardByType(data.cardType);
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBig.source = cachekey(cardTypePath, this);
        }

        // set group lock
        private setUILock(data: HunterCardMainItemData) {
            this.labelLock.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_unlock, data.cardLevel);
            let cardTypePath = UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBigLock.source = cachekey(cardTypePath, this);
        }
    }

    export enum CardUIType {
        LOCK = 0,
        NOCARD = 1,
        CARD = 2
    }

    export class HunterCardMainItemData {
        generalId: number;

        cardType: number;

        cardLevel: number;

        /** The current hunter's potato's info, may be null. */
        cardInfo: message.PotatoInfo = null;

        father: HunterCardMain = null;
    }
}