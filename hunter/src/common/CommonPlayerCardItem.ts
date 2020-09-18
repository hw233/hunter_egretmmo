namespace zj {

export class CommonPlayerCardItem extends eui.ItemRenderer {
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
    private groupLock: eui.Group;
    // private imgTypeBigLock: eui.Image;
    // private imgLock: eui.Image;
    private labelLock: eui.Label;

    constructor() {
        super();

        this.skinName = "resource/skins/common/CommonPlayerCardItemSkin.exml";
        cachekeys(<string[]>UIResource["CommonPlayerCardItem"], null);
    }

    protected dataChanged() {
        let data = this.data as CommonPlayerCardItemData;
            let unlock = data.father.data.level >= data.level;

        this.groupLock.visible = !unlock;
        this.groupUnLock.visible = unlock;
        this.groupGetCard.visible = (data.info != null);
        this.groupDontGet.visible = (data.info == null);
        this.scaleX = 0.9;
        this.scaleY = 0.9;
        if (data.info != null) {
            let tbl = TableItemPotato.Item(data.info.id);
            let [, , bigFramePic] = PlayerCardSystem.GetItemFrame(data.info.id, data.info);
            let typePath = UIConfig.UIConfig_Hunter_Card.card_type_small[tbl.type - 1];
            let cardPath = tbl.paths;
            this.imgCardBoard.source = cachekey(bigFramePic , this) ;
            this.imgCard.source = cachekey(cardPath , this) ;
            this.imgCardType.source = cachekey(typePath , this) ;

            this.labelName.text = tbl.name;
            this.labelNumber.text = tbl.num.toString();
            this.labelLevel.text = data.level.toString();

            if (data.info.add_attri.length + 1 == 5 && data.info.star < 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else if (data.info.add_attri.length == 5 && data.info.star >= 6) {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
            } else {
                Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
            }
        } else if (unlock && data.info == null) {
            let path = UIConfig.UIConfig_Hunter_Card.card_type[data.type - 1];
            this.imgTypeBig.source = cachekey(path , this) ;

        } else {
            this.labelLock.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_unlock, data.level);
        }
    }

}

export class CommonPlayerCardItemData {
    info: message.PotatoInfo;
    type: number;
    level: number;
        father: CommonPlayer;
}
}