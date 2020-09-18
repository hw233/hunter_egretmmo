namespace zj {
// HXH_StoryInstanceSelectStageItem
// wangshenzhuo
// 2019-07-22
export class StoryInstanceSelectStageItem extends eui.ItemRenderer {

    public labelInfo: eui.Label;
    public labelStarNum: eui.Label;
    public groupFirstAward: eui.Group;
    public imageFrameFirstBlood: eui.Image;
    public imageIconFirstBlood: eui.Image;
    public lebelFirstBlood: eui.BitmapLabel;
    public imageGetFirstBlood: eui.Image;
    public imageGet: eui.Image;
    public groupGiftAni: eui.Group;
    public imageShadow: eui.Image;

    private tbl: TableActivityBattle;
    private index: number;
    private curInfo: message.ActivityInfo;
    private curStar: number;
    private getGoods: {
        [1]: any,
        [2]: any
    }
    private bIsGet: boolean;
    private canGet: boolean;
    public father: StoryInstanceSelectStage;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceSelectStageItemSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceSelectStageItem"], null);
        this.groupFirstAward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        this.groupFirstAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapGorupFirst, this);
    }

    protected dataChanged() {
        this.tbl = this.data.table;
        this.index = this.data.index;
        this.curInfo = this.data.info;
        this.curStar = this.data.star;
        this.father = this.data.father;

        this.labelStarNum.text = "X" + this.tbl.star_zone[this.index];
        this.labelInfo.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.battleStarDes, this.tbl.star_zone[this.index]);

        let itemSet = PlayerItemSystem.Set(this.tbl.star_rewards[this.index][0]);
        let count = this.tbl.star_rewards[this.index][1];
        this.getGoods = {
            [1]: this.tbl.star_rewards[this.index][0],
            [2]: this.tbl.star_rewards[this.index][1]
        }
        // this.imageIconFirstBlood.visible = false;

        this.imageFrameFirstBlood.source = cachekey(itemSet.Frame, this);
        this.imageIconFirstBlood.source = cachekey(itemSet.Clip, this);
        this.lebelFirstBlood.text = count.toString();
        this.SetInfoAward();

    }

    private SetInfoAward() {
        let curInforewardIndex = otherdb.getActivityByTypeAndIndex(this.father.activity_info.type, this.father.activity_info.index);
        this.bIsGet = Table.VIn(curInforewardIndex.rewardIndex, this.index + 1);
        this.canGet = this.curStar >= this.tbl.star_zone[this.index];
        this.imageGet.visible = this.bIsGet;
        this.imageShadow.visible = !this.canGet;
        this.groupGiftAni.removeChildren();
        this.addAnimatoin("ui_tongyong_lingqu", this.groupGiftAni, (!this.bIsGet && this.canGet))
    }

    private onTapGorupFirst() {
        if (!this.bIsGet && this.canGet) {
            this.ReqReward();
        }
    }

    private ReqReward() {
        Game.PlayerActivitySystem.activityReward(this.curInfo.type, this.curInfo.index, this.index + 1, false).then((resp: message.GameInfo) => {
            this.curInfo = otherdb.getActivityByTypeAndIndex(this.curInfo.type, this.curInfo.index);
            let goods = Table.DeepCopy(resp.getGoods);

            if (goods[0].goodsId == 0) {
                goods[0].goodsId = this.getGoods[1];
                goods[0].count = this.getGoods[2];
            }

            let hero = Table.FindR(goods, function (key, value) {
                return PlayerItemSystem.Type2(value.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
            })

            if (hero[0] != null) {
                loadUI(CommonGetGeneral)
                    .then((dialog: CommonGetGeneral) => {
                        dialog.setInfo(hero[0].goodsId, null, () => {
                            loadUI(CommonGetDialog)
                                .then((dialog: CommonGetDialog) => {
                                    dialog.init(goods);
                                    dialog.setCB(() => {
                                        this.SetInfoAward();
                                    });
                                    dialog.show(UI.SHOW_FROM_TOP);
                                });
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.init(goods);
                        dialog.setCB(() => {
                            this.SetInfoAward();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }).catch(() => { })
    }



    private onShowGoodProperty(e: egret.TouchEvent) {
        if (!this.bIsGet && this.canGet) {
            return;
        }
        let goodsinfo = new message.GoodsInfo();
        goodsinfo.goodsId = this.getGoods[1];
        // goodsinfo.count = PlayerItemSystem.Count()
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private

    //添加龙骨动画
    private addAnimatoin(dbName: string, groupAni: eui.Group, isShow: boolean) {
        if (isShow) {
            Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", null, 0)
                .then(display => {
                    display.x = groupAni.explicitWidth / 2
                    display.y = groupAni.explicitHeight - 6;
                    groupAni.addChild(display);
                    display.scaleX = 0.85;
                    display.scaleY = 0.85;
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }
}


//子项数据源
export class StoryInstanceSelectStageItemData {
    //数据源
    table: any;
    index: number;
    star: number;
    info: any;
    father;
}


}