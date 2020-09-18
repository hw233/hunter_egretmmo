namespace zj {
//SkeArenaDropInfoItem
//hexiaowei
// 2019/02/14
export class SkeArenaDropInfoItem extends eui.ItemRenderer {
    
    private labelCurrentLayerNum:eui.BitmapLabel;
    private listDorpItem:eui.List;
    private imageFrame:eui.Image;
    private imageIcon:eui.Image;
    private labelItemNum:eui.BitmapLabel;
    private groupFirstKill : eui.Group;
    private rectMask : eui.Rect;
    private groupMain : eui.Group;
    private groupFirst :eui.Group;

    private dropItem: eui.ArrayCollection;
    private dropIndex: number = 0;

    
    private imgMask: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/skyArean/SkeArenaDropInfoItemSkin.exml";
        cachekeys(<string[]>UIResource["SkeArenaDropInfoItem"], null);
        this.imageIcon.mask = this.rectMask;

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        this.groupFirstKill.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {
        this.groupFirst.removeChildren();
         this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirst);
         this.labelCurrentLayerNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Wanted.floor,this.data.dropInfo.id % 10000);
         let tbl = PlayerTowerSystem.Item(this.data.dropInfo.id);
         let goods = [];
         let count = [];
         let show_type = [];
         for(const k in tbl.reward_good_id){
             const v = tbl.reward_good_id[k];
             let poledex = {
                goodsId : null,
                
            };
            poledex.goodsId = v;
            goods.push(poledex);
         }

         for(const k in tbl.reward_good_count){
             const v = tbl.reward_good_count[k];
             let poledex = {
                count : null,
                
            };
            poledex.count= v;
            count.push(poledex);
         }

         for(const k in tbl.reward_good_show_type){
             const v = tbl.reward_good_show_type[k];
             let poledex = {
                show_type : null,
                
            };
            poledex.show_type = v;
            show_type.push(poledex);
         }

        this.listDorpItem.selectedIndex = 0; // 默认选中
        this.listDorpItem.itemRenderer = SkyAreanDropInfoItemAward;//
        this.dropItem = new eui.ArrayCollection();

        for (let i = 0; i < goods.length; i++) {
            let data = new  SkyAreanDropInfoItemAwardData();
            data.index = i;
            data.father =this;
            data.reward_good_count = count[i].count;
            data.reward_good_id =goods[i].goodsId;
            data.reward_good_show_type = show_type[i].show_type;
            this.dropItem.addItem(data);
        }

        this.listDorpItem.dataProvider = this.dropItem;
        this.dropIndex = this.listDorpItem.selectedIndex;



         let itemSet = PlayerItemSystem.Set(this.data.dropInfo.first_reward[0][0],1,this.data.dropInfo.first_reward[0][1]);
         this.imageFrame.source = cachekey(itemSet.Frame , this) ;
         this.imageIcon.source = cachekey(itemSet.Clip , this) ;
         this.labelItemNum.text = this.data.dropInfo.first_reward[0][1];   

    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let goodsi = new message.GoodsInfo();
        goodsi.goodsId = this.data.dropInfo.first_reward[0][0];
        goodsi.count = this.data.dropInfo.first_reward[0][1];
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>goodsi, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

}

//子项数据源
export class SkeArenaDropInfoItemData {
    index : number;
    dropInfo : any;
    father : SkeArenaDropInfoDialog;
}


}