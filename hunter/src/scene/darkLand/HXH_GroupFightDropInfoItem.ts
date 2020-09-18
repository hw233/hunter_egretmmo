namespace zj {
// HXH_GroupFightDropInfoItem
// wangshenzhuo
// 2019/03/06
export class HXH_GroupFightDropInfoItem extends eui.ItemRenderer {

    private groupCache: eui.Group;

    public labelCurrentLayerNum: eui.BitmapLabel;
    public listDorpItem: eui.List;
    public imageFrame: eui.Image;
    public labelItemNum: eui.BitmapLabel;
    public imageIcon: eui.Image;
    public groupFrist: eui.Group;
    public getlist = [];

    private dropItem: eui.ArrayCollection;
    private dropIndex: number = 0;



    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightDropInfoItemSkin.exml";
        cachekeys(<string[]>UIResource["HXH_GroupFightDropInfoItem"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        this.groupFrist.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
    }

    protected dataChanged() {
        closeCache(this.groupCache);
        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFrist);
        this.labelCurrentLayerNum.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.hard, this.data.id % 10000);

        let tbl = PlayerTowerSystem.Item(this.data.id);

        this.listDorpItem.selectedIndex = 0; // 默认选中
        this.listDorpItem.itemRenderer = SkyAreanDropInfoItemAward;//
        this.dropItem = new eui.ArrayCollection();

        for (let i = 0; i < this.data.reward.length; i++) {
            let data = new SkyAreanDropInfoItemAwardData();
            data.index = i;
            data.father = this;
            data.reward_good_count = this.data.reward[i].count;
            data.reward_good_id = this.data.reward[i].goodsId;
            data.reward_good_show_type = this.data.reward[i].showType;
            this.dropItem.addItem(data);
        }

        this.listDorpItem.dataProvider = this.dropItem;
        this.dropIndex = this.listDorpItem.selectedIndex;

        let itemSet = PlayerItemSystem.Set(this.data.first.goodsId, 1, this.data.first.count);
        this.imageFrame.source = cachekey(itemSet.Frame, this);
        this.imageIcon.source = cachekey(itemSet.Clip, this);
        this.labelItemNum.text = Set.NumberUnit2(this.data.first.count);

        setCache(this.groupCache);
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let goodsi = new message.GoodsInfo();
        goodsi.goodsId = this.data.first.goodsId;
        goodsi.count = this.data.first.count;
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>goodsi, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.width / 2
                //display.y =this.height*0.25;
                display.y = group.height / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }
}

//子项数据源
export class HXH_GroupFightDropInfoItemData {
    reward: number;
    id: number;
    father: any;
    first: any;
    index: number;
}
}