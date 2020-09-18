namespace zj {
//HXH_StoryInstanceMallItem
// wangshenzhuo
// 2019-07-17
export class StoryInstanceMallItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public imageFrame: eui.Image;
    public imageIcon: eui.Image;
    public imageLogo: eui.Image;
    public labelNum: eui.BitmapLabel;
    public labelItemName: eui.Label;
    public labelItemType: eui.Label;
    public buttonNormal: eui.Button;
    public labelBuyTimes: eui.Label;
    public imageResoure: eui.Image;
    public labelResoureNum: eui.Label;
    public groupSoldOut: eui.Group;
    public imageMask: eui.Image;
    public imageSoldOut: eui.Image;


    private index: number;
    private tbl;
    private father: StoryInstanceMall;
    private rewardGoods: {
        [1]: any,
        [2]: any,
    };
    private getGoods: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceMallItemSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceMallItem"], null);
        this.buttonNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonNormal, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        
    }

    protected dataChanged() {
        this.index = this.data.index;
        this.tbl = this.data.info;
        this.father = this.data.father;
        this.rewardGoods = {
            [1]: this.tbl.act_coin,
            [2]: this.tbl.exchange_reduce_score[this.index]
        }
        this.getGoods = this.tbl.exchange_get_goods[this.index];

        this.SetLabelColor();
        this.SetInfoGetItem();
        this.SetInfoReduceGoods();
        this.SetBuyInfo();
    }


    public SetLabelColor() {
        if (this.father.activityInfo.daysIndex >= this.rewardGoods[2]) {
            this.labelResoureNum.textColor = ConstantConfig_Common.Color.green;
        } else {
            this.labelResoureNum.textColor = ConstantConfig_Common.Color.red;
        }
    }

    public SetInfoGetItem() {
        let itemSet = PlayerItemSystem.Set(this.getGoods[0]);
        let count = this.getGoods[1];
        this.imageLogo.visible = false;
        this.imageFrame.source = cachekey(itemSet.Frame, this);
        this.imageIcon.source = cachekey(itemSet.Clip, this);
        this.labelNum.text = count;
        this.labelItemName.text = itemSet.Info["name"];
        this.labelItemType.text = PlayerItemSystem.ItemTypeDesc(this.getGoods[0]);
    }

    public SetInfoReduceGoods() {
        let itemSet = PlayerItemSystem.Set(this.rewardGoods[1]);
        this.imageResoure.source = cachekey(itemSet["Path"], this);
        this.labelResoureNum.text = this.rewardGoods[2];
    }

    public SetBuyInfo() {
        let buyMax = this.tbl.exchange_count[this.index];
        let buyCur = 0;
        for (const k in this.father.activityInfo.kvInfos) {
            const v = this.father.activityInfo.kvInfos[k];
            if (v.key == (this.index + 1)) {
                buyCur = v.value;
            }
        }
        this.groupSoldOut.visible = (buyMax <= buyCur);
        this.labelBuyTimes.text = ("(" + (buyMax - buyCur) + "/" + buyMax + ")");
        this.buttonNormal.enabled = (buyMax > buyCur);
        this.SetLabelColor();
    }

    private onButtonNormal() {
        this.SetBuyInfo();
        let index = this.father.activityInfo.index;
        let zone = this.index + 1;
        let num = 1;
        this.ActivityInstanceExchangeReq(index, zone, num).then((data: message.ActivityInstanceExchangeResponse) => {
            this.father.activityInfo = otherdb.getActivityByTypeAndIndex(this.father.activityInfo.type, this.father.activityInfo.index);
            // this.father.
            let goods = Table.DeepCopy(data.body.gameInfo.getGoods);
            let hero = Table.FindR(goods, function (k, v) {
                return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
            })
            if (hero[0] != null) {
                loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                    dialog.setInfo(hero[0]["goodsId"], 0, () => {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.show();
                                dialog.init(goods);
                                dialog.setCB(() => {
                                    this.father.onAwardInfo();
                                });
                            });
                    });
                    dialog.show(UI.SHOW_FILL_OUT);
                })
            } else {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(goods);
                        dialog.setCB(() => {
                            this.father.onAwardInfo();
                        });
                    });
            }
        }).catch((reason) => { })
    }

    private ActivityInstanceExchangeReq(index, zone, num) {
        return new Promise((resolve, reject) => {
            let request = new message.ActivityInstanceExchangeRequest();
            request.body.activityIndex = index;
            request.body.num = num;
            request.body.zone = zone;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.ActivityInstanceExchangeResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let goodsinfo = new message.GoodsInfo();
        goodsinfo.goodsId = this.getGoods[0];
        goodsinfo.count = this.getGoods[1];
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }
}


//子项数据源
export class StoryInstanceMallItemData {
    index: number;
    info: any;
    father: StoryInstanceMall;
}


}