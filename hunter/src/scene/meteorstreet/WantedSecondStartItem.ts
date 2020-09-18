namespace zj {
    //WantedSecondStartItem
    //hexiaowei
    // 2019/02/14
    export class WantedSecondStartItem extends eui.ItemRenderer {
        private groupMain: eui.Group;
        private imgFrame: eui.Image;
        private rectMask: eui.Rect;
        private imgIcon: eui.Image;
        private labelTextNum: eui.BitmapLabel;

        public constructor() {
            super();
            this.skinName = "resource/skins/meteorstreet/WantedSecondStartItemSkin.exml";
            cachekeys(<string[]>UIResource["WantedSecondStartItem"], null);
            this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
            this.imgIcon.mask = this.rectMask;
        }

        protected dataChanged() {
            let info = PlayerWantedSystem.InstanceMobsFeature(this.data.talent);
            this.imgIcon.source = cachekey(info.path, this);
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }

    }

    //子项数据源
    export class WantedSecondStartItemData {
        index: number;
        //数据源
        talent: number;

        father: any;

        key: number;

    }

}