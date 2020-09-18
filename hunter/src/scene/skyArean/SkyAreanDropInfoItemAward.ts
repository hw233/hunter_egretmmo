namespace zj {
//SkyAreanDropInfoItemAward
//hexiaowei
// 2019/02/14
export class SkyAreanDropInfoItemAward extends eui.ItemRenderer {
    DisplayObjectContainer
    
    private imageBoard:eui.Image;
    private imageIcon:eui.Image;
    private labelAwardNum:eui.BitmapLabel;
    private groupSum : eui.Group;
    // private rectMask : eui.Image;
    private groupAnimas: eui.Group;
    private imgMask: eui.Image;

    

    public constructor() {
        super();
        this.skinName = "resource/skins/skyArean/SkyAreanDropInfoItemAwardSkin.exml";
        cachekeys(<string[]>UIResource["SkyAreanDropInfoItemAward"], null);
        this.groupSum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        // this.groupSum.cacheAsBitmap = true;
    }

     //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {
        closeCache(this.groupSum);
        // this.imageIcon.mask = this.rectMask;
        this.groupAnimas.removeChildren();
        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimas);
    
        let itemSet= PlayerItemSystem.Set(this.data.reward_good_id,this.data.reward_good_show_type,this.data.reward_good_count)
        this.imageBoard.source = cachekey( itemSet.Frame , this);
        this.imageIcon.source = cachekey(itemSet.Clip , this);
        this.labelAwardNum.text = Set.NumberUnit2(this.data.reward_good_count);
        setCache(this.groupSum);
    }

    private isRectMask(goodsId: number): boolean {
        if ( PlayerItemSystem.ItemType(goodsId) == 20 ) {
            return true;
        }
        return false;
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let good = new message.GoodsInfo();
        good.goodsId = this.data.reward_good_id;
        good.count = this.data.reward_good_count;
        good.showType = this.data.reward_good_show_type;
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>good, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

//子项数据源
export class SkyAreanDropInfoItemAwardData {
    index : number;
    isshow: number;
    reward_good_id : number;
    reward_good_count : number;
    reward_good_show_type : number;
    father : any;

}


}