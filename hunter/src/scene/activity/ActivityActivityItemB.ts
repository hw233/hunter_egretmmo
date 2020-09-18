namespace zj {
    // 
    // lizhengiang
    // 20190323
    export class ActivityActivityItemB extends eui.ItemRenderer {
        private groupCache: eui.Group;
        private groupItem: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private imgLogo: eui.Image;
        private lbNum: eui.BitmapLabel;
        private imgGet: eui.Image;

        private imgMask: eui.Image;

        private goods: number = 0;
        private count: number = 0;
        private isGet: boolean = false;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivityActivityItemBSkin.exml";
            cachekeys(<string[]>UIResource["ActivityActivityItemB"], null);
            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

            this.imgMask = new eui.Image();
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;
        }

        protected dataChanged() {
            closeCache(this.groupCache);
            this.goods = this.data.goods;
            this.count = this.data.count;
            this.isGet = this.data.isGet;

            this.imgMask.visible = false;
            if (PlayerItemSystem.IsImgMask(this.goods)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }

            let itemSet = PlayerItemSystem.Set(this.goods, null, this.count);
            this.imgFrame.source = cachekey(itemSet.Frame, this);
            this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.data.goods), this);
            this.imgLogo.source = "";
            this.lbNum.text = Set.NumberUnit2(this.count);
            this.imgGet.visible = this.isGet;
            setCache(this.groupCache);
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.data.goods;
            goodsInfo.count = this.data.count;
        
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
    }
}