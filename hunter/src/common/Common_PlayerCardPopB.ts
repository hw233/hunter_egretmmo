namespace zj {
// 物品卡片预览
// wangshenzhuo
// 2019/3/1
export class Common_PlayerCardPopB extends UI {

    private imageFrame1: eui.Image;
    private imageIcon: eui.Image;
    private labelTextNum: eui.BitmapLabel;
    private labelNumID: eui.Label;
    private labelTextName: eui.Label;
    private labelTextType: eui.Label;
    private labelTextOwn: eui.Label;
    private labelTextInfo: eui.Label;
    private imageFrame: eui.Image;
    private labelCardNum: eui.Label;
    private labelCardName: eui.Label;
    private imageCard: eui.Image;
    private imageCardType: eui.Image;
    private imageBoardStar: eui.Image;
    private groupStar: eui.Group;
    private labelLevel: eui.BitmapLabel;
    private imageCardGrad: eui.Image;
    private labelCardDetails: eui.Label;
    private LabelAttriMain: eui.Label;
    private groupAddAttri: eui.Group;
    private groupFull: eui.Group;
    private labelAttriMainFull: eui.Label;
    private listAttri: eui.List;
    private groupClip: eui.Group;
    private maskimage: eui.Image;
    private groupMain: eui.Group;
    private listScroller : eui.Scroller;
    private listAttributeData: eui.ArrayCollection = new eui.ArrayCollection();
    public cur_tbl: any = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_PlayerCardPopBSkin.exml";

        //物品遮罩
        this.maskimage = new eui.Image;
        this.maskimage.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.maskimage.horizontalCenter = 0;
        this.maskimage.verticalCenter = 0;
        this.groupMain.addChild(this.maskimage);
        this.maskimage.visible = false;
    }

    public SetInfo(id, count?) {
        this.cur_tbl = [];
        let pieceTbl: any = PlayerItemSystem.Table(id);
        this.cur_tbl = TableItemPotato.Item(pieceTbl.compose_cards[1]);
        let ItemSet = PlayerItemSystem.Set(id, 1, null);
        let bigFramePic: any = PlayerCardSystem.GetItemFrame(this.cur_tbl.id);
        this.labelNumID.visible = false;
        this.imageIcon.source = cachekey(ItemSet["Path"] , this) ;
        this.maskimage.visible = true;
        this.imageIcon.mask = this.maskimage;
        this.imageFrame1.source = cachekey(ItemSet.Frame , this) ;
        this.labelTextName.text = ItemSet.Info["name"];
        this.labelTextNum.text = ItemSet["Count"];
        this.labelTextOwn.text = ItemSet["Count"];
        this.labelTextType.text = TextsConfig.TextsConfig_Hunter_Card.card_Piece;
        this.labelTextInfo.text = ItemSet.Info["des"];

        //卡片预览
        this.labelCardName.text = this.cur_tbl.name;
        this.labelCardNum.text = this.cur_tbl.num;
        this.imageCard.source = cachekey(this.cur_tbl.paths , this) ;
        this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[this.cur_tbl.type] , this) ;

        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
            .then(display => {
                display.width = this.groupClip.width;
                display.height = this.groupClip.height;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                display.x = this.groupClip.width / 2;
                display.y = this.groupClip.height / 2;
                this.groupClip.addChild(display);
            })
            .catch(reason => {
                // toast(reason);
            });

        //添加星星
        Helper.NodeStarByAlignLeft(this.groupStar, this.cur_tbl.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);

        this.labelLevel.text = "1";
        this.labelCardDetails.text = this.cur_tbl.des;
        this.imageFrame.source = cachekey(bigFramePic[1] , this) ;

        //主属性
        let baseStr = PlayerCardSystem.GetCardBaseAttri(this.cur_tbl.id, this.cur_tbl.star, 1);
        this.LabelAttriMain.text = baseStr[0].toString();
        this.groupFull.visible = true;
        this.groupAddAttri.y += 20;

        let baseStrFullNum = PlayerCardSystem.GetCardBaseAttri(this.cur_tbl.id, CommonConfig.card_max_star, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1]);
        this.labelAttriMainFull.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_full_attr, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1], baseStrFullNum[1]);
        let addStr = PlayerCardSystem.GetAddStrNotGet(this.cur_tbl);

        this.listAttributeData.removeAll();
        for (let i = 0; i < addStr.length; i++) {
            let itemData = new CardAttriItemData();
            itemData.index = i;
            itemData.info = addStr[i];
            itemData.width = this.listScroller.width;
            itemData.type = 1;
            this.listAttributeData.addItem(itemData);
        }
        this.listAttri.dataProvider = this.listAttributeData;
        this.listAttri.itemRenderer = CardAttriItem;

        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain);
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                display.x = group.explicitWidth / 2
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

}

}