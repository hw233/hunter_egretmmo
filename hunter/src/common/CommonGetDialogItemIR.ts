namespace zj {

// lizhengqiang
// 2018/12/06

export class CommonGetDialogItemIR extends eui.ItemRenderer {

        private groupItem: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private lbPropID: eui.Label;
        private lbCount: eui.BitmapLabel;
        private lbName: eui.Label;
        private groupAnimation: eui.Group;

        private imgMask: eui.Image;
    private rectMask: eui.Rect;
    private rectMaskCommon: eui.Rect;

        private goods: message.GoodsInfo;
        private i: number = 0;
        private father: CommonGetDialog;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/CommonGetDialogItemIRSkin.exml";
            cachekeys(<string[]>UIResource["CommonGetDialogItemIR"], null);

            this.groupItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;

            // 徽章遮罩
        this.rectMask = new eui.Rect(73, 70, 0x000000);
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupItem.addChild(this.rectMask);
            this.rectMask.visible = false;

            //普通物品遮罩
        this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            this.rectMaskCommon.horizontalCenter = 0;
            this.rectMaskCommon.verticalCenter = -2;
            this.groupItem.addChild(this.rectMaskCommon);
            this.rectMaskCommon.visible = false;

            this.groupAnimation.removeChildren();
            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", null, "001_daojuguang_02", 0)
                .then(display => {
                    display.scaleX = 0.8;
                    display.scaleY = 0.8;
                    this.groupAnimation.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        protected dataChanged() {
            this.rectMaskCommon.visible = false;
            this.rectMask.visible = false;
            this.imgMask.visible = false;
            this.goods = this.data.info;
            this.i = this.data.index;
            this.father = this.data.father;
            let aniBoolean = this.data.aniBoolean;
            this.imgFrame.source = cachekey(PlayerItemSystem.Set(this.goods.goodsId, null, this.goods.count).Frame, this);
            this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.goods.goodsId), this);
            if (this.goods.count >= 100000) {
                this.lbCount.text = (this.goods.count / 10000) + "万";
            } else {
                this.lbCount.text = this.goods.count.toString();
            }
            this.lbName.text = PlayerItemSystem.ItemConfig(this.goods.goodsId)["name"];
            this.lbPropID.text = PlayerItemSystem.GoodsNumID(this.goods.goodsId);

            // 遮罩
            if (PlayerItemSystem.IsImgMask(this.goods.goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            } else if (PlayerItemSystem.IsRectMask(this.goods.goodsId)) {
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            } else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }

            this.groupAnimation.visible = false;
            if (aniBoolean && this.goods.goodsId != 20001) {
                this.groupAnimation.visible = true;
            }

            if (PlayerItemSystem.ItemType(this.goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.reSetGeneral();
            }
            if (this.goods.goodsId == 20012) {
                this.imgFrame.source = cachekey("ui_frame_FrameHunterUpStar_png", this);
            }
        }

        public reSetGeneral() {
            let info = Otherdb.MissionGeneral(this.goods.goodsId);
            if (info == null) {
                return;
            }

            this.imgFrame.source = cachekey(TableGeneralStep.Item(info.step).frame_path, this);
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY_1, { info: this.goods, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
}

//子项数据源
export class CommonGetDialogItemIRData {
        index: number;
        //数据源
        info: any;

        father: CommonGetDialog;

        aniBoolean: boolean;

}

}