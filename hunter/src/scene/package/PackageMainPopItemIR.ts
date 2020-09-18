namespace zj {

// lizhengqiang
// 2018/11/27

export class PackageMainPopItemIR extends eui.ItemRenderer {
    private groupMain: eui.Group;
    private btnItem: eui.Button;
    private groupItem: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private lbNum: eui.Label;
    private lbName: eui.Label;

    private imgMask: eui.Image; // 碎片遮罩
    private rectMask: eui.Image; // 徽章遮罩

    private isFirst: boolean = true;

    public constructor() {
        super();
        this.skinName = "resource/skins/package/PackageMainPopItemIRSkin.exml";
        cachekeys(<string[]>UIResource["PackageMainPopItemIR"], null);
        this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupItem.addChild(this.imgMask);
        this.imgMask.visible = false;

        // 徽章遮罩
        this.rectMask = Util.getMaskImgBlack(73, 70);
        this.rectMask.horizontalCenter = 0;
        this.rectMask.verticalCenter = 0;
        this.groupItem.addChild(this.rectMask);
        this.rectMask.visible = false;
    }

    protected dataChanged() {
        let config = PlayerItemSystem.ItemConfig(this.data.goodsId);
        this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.data.goodsId), this);
        this.imgIcon.source = cachekey(config["path"], this);
        this.lbNum.text = "x" + this.data.count;
        this.lbName.text = config["name"];
        if (this.selected) {
            this.btnItem.currentState = "down";
        }
        else {
            this.btnItem.currentState = "up";
        }

        // 遮罩
        this.imgMask.visible = false;
        this.rectMask.visible = false;
        this.imgIcon.mask = null;
        if (PlayerItemSystem.IsImgMask(this.data.goodsId)) {
            this.imgMask.visible = true;
            this.imgIcon.mask = this.imgMask;
        } else if (PlayerItemSystem.IsRectMask(this.data.goodsId)) {
            this.rectMask.visible = true;
            this.imgIcon.mask = this.rectMask;
        }

        if (this.isFirst) {
            egret.Tween.get(this.groupMain)
                .wait(this.data.index * 100)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 150)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 150)
                .to({ scaleX: 1, scaleY: 1 }, 150)
                .call(() => {
                    this.isFirst = false;
                });

            let type: number = PlayerItemSystem.Type2(this.data.goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL || type == message.EGoodsType.GOODS_TYPE_POTATO) {
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                    .then(display => {
                        display.x = this.groupItem.width / 2;
                        display.y = this.groupItem.height / 2;
                        this.groupItem.addChild(display);
                    })
                    .catch(reason => {
                        toast(reason);
                    });
            }
        }
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

}