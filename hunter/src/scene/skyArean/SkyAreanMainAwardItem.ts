namespace zj {
    //SkyAreanMainAwardItem
    //wangshenzhuo
    // 2019/02/25
    export class SkyAreanMainAwardItem extends eui.ItemRenderer {

        public imageBoard: eui.Image;
        public imageIcon: eui.Image;
        public labelAwardNum: eui.BitmapLabel;
        public groupMain: eui.Group;

        public constructor() {
            super();
            this.skinName = "resource/skins/skyArean/SkyAreanMainAwardItemSkin.exml";
            cachekeys(<string[]>UIResource["SkyAreanMainAwardItem"], null);
            this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
                // (this.data as WantedSecondStartItemData).father.onChooseItemTap(true, this.data);
            }, this);
            // this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            //     (this.data as WantedSecondStartItemData).father.onChooseItemTap(false, this.data);
            // }, this);
        }

        protected dataChanged() {
            let itemSet = PlayerItemSystem.Set(this.data.good.goodsId, this.data.good.showType, this.data.good.count);

            this.imageBoard.source = cachekey(itemSet.Frame, this);
            this.imageIcon.source = cachekey(itemSet.Clip, this);
            this.labelAwardNum.text = "x" + Set.NumberUnit3(this.data.good.count);

            // if (itemSet["Type"] == 3 && this.data.goodsId <= 30003) {
            //     return;
            // } else {
            //     this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain);
            // }

        }
    }



    //子项数据源
    export class SkyAreanMainAwardItemData {
        index: number;
        good: any;
        father: any;
        goodsId: number;

    }
}