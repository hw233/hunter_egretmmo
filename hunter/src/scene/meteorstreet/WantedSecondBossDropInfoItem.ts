namespace zj {
// 首领奖励item
// lizhengiang
// 20190325
export class WantedSecondBossDropInfoItem extends eui.ItemRenderer {
    private imgInstanceName: eui.Image;
    private lbName1: eui.Label;
    private groupItem1: eui.Group;
    private imgFrame1: eui.Image;
    private imgIcon1: eui.Image;
    private lbItemNum1: eui.BitmapLabel;
    private groupAnimation1: eui.Group;
    private lbName2: eui.Label;
    private groupItem2: eui.Group;
    private imgFrame2: eui.Image;
    private imgIcon2: eui.Image;
    private lbItemNum2: eui.BitmapLabel;
    private groupAnimation2: eui.Group;
    private lbName3: eui.Label;
    private groupItem3: eui.Group;
    private imgFrame3: eui.Image;
    private imgIcon3: eui.Image;
    private lbItemNum3: eui.BitmapLabel;
    private groupAnimation3: eui.Group;

    private goodsInfo: { [index: number]: message.GoodsInfo } = null;

    private rectMask1: eui.Image;
    private rectMask2: eui.Image;
    private rectMask3: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/meteorstreet/WantedSecondBossDropInfoItemSkin.exml";
        this.imgIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty1, this);
        this.imgIcon2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty2, this);
        this.imgIcon3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty3, this);

        // 遮罩
        this.rectMask1 = Util.getMaskImgBlack(67, 61);
        this.rectMask1.horizontalCenter = 0;
        this.rectMask1.verticalCenter = -1;
        this.groupItem1.addChild(this.rectMask1);
        this.rectMask2 = Util.getMaskImgBlack(67, 61);
        this.rectMask2.horizontalCenter = 0;
        this.rectMask2.verticalCenter = -1;
        this.groupItem2.addChild(this.rectMask2);
        this.rectMask3 = Util.getMaskImgBlack(67, 61);
        this.rectMask3.horizontalCenter = 0;
        this.rectMask3.verticalCenter = -1;
        this.groupItem3.addChild(this.rectMask3);
    }

    protected dataChanged() {
        let index: number = this.data.index;
        let info: { [id: number]: Array<message.GoodsInfo> } = this.data.info;

        this.imgInstanceName.source = cachekey(PlayerWantedSystem.Instance(10000 * index + 1).boss_name_client, this);

        let bossFloor: Array<number> = [];
        for (let k in info) {
            bossFloor.push(Number(k));
        }

        this.goodsInfo = {};

        for (let i = 0; i < 3; i++) {
            if (bossFloor[i] != null) {
                let floorId: number = index * 10000 + bossFloor[i];
                let bossName: string = PlayerWantedSystem.Instance(floorId).Instance_name;

                let currentFloorInfo = info[bossFloor[i]][0];
                let itemSet = PlayerItemSystem.Set(currentFloorInfo.goodsId, currentFloorInfo.showType, currentFloorInfo.count);
                this.goodsInfo[i + 1] = currentFloorInfo;

                this[`imgFrame${i + 1}`].source = cachekey(itemSet.Frame, this);
                this[`imgIcon${i + 1}`].source = cachekey(PlayerItemSystem.ItemPath(currentFloorInfo.goodsId), this);
                this[`lbItemNum${i + 1}`].text = "x" + currentFloorInfo.count;
                this[`lbName${i + 1}`].text = Helper.StringFormat(TextsConfig.TextsConfig_Wanted.level, bossFloor[i]);

                this[`groupAnimation${i + 1}`].removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
                    this[`groupAnimation${i + 1}`].addChild(display);
                }).catch(reason => {
                    toast(reason);
                });

                // 遮罩
                this[`rectMask${i + 1}`].visible = true;
                this[`imgIcon${i + 1}`].mask = this[`rectMask${i + 1}`];
            } else {
                this[`imgFrame${i + 1}`].visible = false;
                this[`imgIcon${i + 1}`].visible = false;
                this[`lbItemNum${i + 1}`].visible = false;
                this[`lbName${i + 1}`].visible = false;

                // 遮罩
                this[`rectMask${i + 1}`].visible = false;
                this[`imgIcon${i + 1}`].mask = null;
            }

        }
    }

    private onShowGoodProperty1(e: egret.TouchEvent) {
        if (this.goodsInfo[1] != null) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[1], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
    }

    private onShowGoodProperty2(e: egret.TouchEvent) {
        if (this.goodsInfo[2] != null) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[2], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
    }

    private onShowGoodProperty3(e: egret.TouchEvent) {
        if (this.goodsInfo[3] != null) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[3], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
    }
}
}