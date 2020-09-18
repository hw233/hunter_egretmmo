namespace zj {

    // lizhengqiang
    // 2018/11/08

    export class PackageMainItemIR extends eui.ItemRenderer {
        private groupCache: eui.Group;
        private groupItem: eui.Group;
        private imgNode: eui.Image;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private imgTips: eui.Image;
        private lbNum: eui.Label;
        private lbCount: eui.BitmapLabel;
        private groupAnimation: eui.Group;

        private imgMask: eui.Image;
        private rectMask: eui.Image;

        public constructor() {
            super();
            this.skinName = "resource/skins/package/PackageMainItemIRSkin.exml";
            cachekeys(<string[]>UIResource["PackageMainItemIR"], null);

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.imgMask.scaleX = 0.9;
            this.imgMask.scaleY = 0.9;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;

            // 遮罩
            this.rectMask = Util.getMaskImgBlack(75, 78);
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupItem.addChild(this.rectMask);
            this.rectMask.visible = false;
        }

        protected dataChanged() {
            this.groupAnimation.visible = false;
            this.groupAnimation.removeChildren();

            if (!this.data.isEmpty) {
                let config = PlayerItemSystem.ItemConfig(this.data.itemId);
                this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.data.itemId), this);
                this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.data.itemId), this);
                this.imgTips.visible = (config.hasOwnProperty("red_tips") && config["red_tips"] != 0) ? true : false;
                this.lbNum.text = this.data.labelNum;
                this.lbCount.text = Game.PlayerItemSystem.itemCount(this.data.itemId).toString();

                // 遮罩
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMask.verticalCenter = 0;

                this.imgIcon.mask = null;
                this.imgIcon.scaleX = 0.9;
                this.imgIcon.scaleY = 0.9;


                if (PlayerItemSystem.IsImgMask(this.data.itemId)) {
                    this.imgMask.visible = true;
                    this.imgIcon.mask = this.imgMask;
                } else if (PlayerItemSystem.IsRectMask(this.data.itemId)) {
                    this.rectMask.visible = true;
                    this.rectMask.verticalCenter = -1;
                    this.rectMask.scaleX = 0.85;
                    this.rectMask.scaleY = 0.83;

                    this.imgIcon.scaleX = 0.75;
                    this.imgIcon.scaleY = 0.75;
                    this.imgIcon.mask = this.rectMask;
                } else {
                    this.rectMask.visible = true;
                    this.rectMask.scaleX = 1;
                    this.rectMask.scaleY = 1;
                    this.imgIcon.mask = this.rectMask;
                }

                if (this.selected) {
                    this.groupAnimation.visible = true;
                    Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                        .then(display => {
                            this.groupAnimation.addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });
                }
            }
            else {
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
                this.imgIcon.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
                this.imgTips.visible = false;
                this.lbNum.text = "";
                this.lbCount.text = "";
            }
        }

    }
}