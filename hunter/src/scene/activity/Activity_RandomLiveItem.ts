namespace zj {
// wang shen zhuo
// 娃娃机---兑换礼物--item
// 2019 04 12
export class Activity_RandomLiveItem extends eui.ItemRenderer {

    public labelItemName: eui.Label;
    public imageFrame: eui.Image;
    public imageClip: eui.Image;
    public labelNum: eui.BitmapLabel;
    public imageGet: eui.Image;
    public labelChangeNum: eui.Label;
    public labelChangeCore: eui.Label;
    public buttonChange: eui.Button;
    public groupMain: eui.Group;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;
    public score: any;
    public exchange_times: any;
    public exchange_times2 : number;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_RandomLiveItemSkin.exml";
        cachekeys(<string[]>UIResource["Activity_RandomLiveItem"], null);
        this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChange, this);

        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as Activity_RandomLiveItemData).father.onChooseItemTap(true, this.data);
        }, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as Activity_RandomLiveItemData).father.onChooseItemTap(false, this.data);
        }, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    protected dataChanged() {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        this.score = this.data.father.curTopicInfo.exchange_integral[this.data.index];
        this.exchange_times = this.data.father.curTopicInfo.exchange_count[this.data.index];
        this.SetInfoGoods();
        this.SetInfoOther();
        this.SetInfoCoreColor();

        if (this.isImgMask(this.data.goods.goodsId)) {
            this.imgMask.visible = true;
            this.imageClip.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageClip.mask = this.rectMaskCommon;
        }
    }

    private SetInfoGoods() {
        if (this.data.goods.goodsId != 0) {
            let itemSet = PlayerItemSystem.Set(this.data.goods.goodsId, this.data.goods.showType, this.data.goods.count);
            this.imageClip.source = cachekey(itemSet.Clip , this) ;
            this.imageFrame.source = cachekey(itemSet.Frame , this) ;
            this.labelNum.text = "x" + this.data.goods.count;
            this.labelItemName.text = itemSet["name"];
            this.labelChangeCore.text = Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.jifen, this.score);
        } else {

        }
    }

    private SetInfoCoreColor() {
        if (this.score == null) {
            return;
        }
        let a = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
        if (this.score <= Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore) {
            this.labelChangeCore.textColor = Helper.RGBToHex("r:255,g:255,b:255");
        } else {
            this.labelChangeCore.textColor = Helper.RGBToHex("r:255,g:38,b:0");
        }
    }

    private SetInfoOther() {
        if (this.data.goods.goodsId == 0) {
            return;
        }
        let a: any = this.data.index;
        let aa = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone;
        let buy_times: any = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone, function (k, v) {
            return v.key == a;
        })
        let color_green = [60, 255, 0];
        let color_red = [200, 38, 0];
        if (buy_times[0] == null) {
            this.labelChangeNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.last_times, color_green[0], color_green[1], color_green[2], this.exchange_times, this.exchange_times));
            this.buttonChange.enabled = true;
            this.imageGet.visible = false;
            this.exchange_times2 = this.exchange_times;
        } else {
            let can_exchange = buy_times[0].value < this.exchange_times;
            if ((this.exchange_times - buy_times[0].value) > 0) {
                this.labelChangeNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.last_times, color_green[0], color_green[1], color_green[2], this.exchange_times - buy_times[0].value, this.exchange_times));
            } else {
                this.labelChangeNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.last_times, color_red[0], color_red[1], color_red[2], this.exchange_times - buy_times[0].value, this.exchange_times));
            }
            this.exchange_times2 = this.exchange_times - buy_times[0].value;
            this.buttonChange.enabled = can_exchange;
            this.imageGet.visible = !can_exchange;
        }
        this.SetInfoCoreColor();
    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true;
        }
        return false;
    }

    // 点击 兑换按钮 
    private onButtonChange() {
        loadUI(Activity_RandomLiveExchange)
            .then((dialog: Activity_RandomLiveExchange) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.SetInfo(this);
            });
    }

    public ExchangeReq(count) {
        this.IntegralExchangeReqBody_Visit(count).then((data: any) => {
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.init(data.body.gameInfo.getGoods);
                    dialog.show();
                    dialog.setCB(()=>{this.data.father.SetInfoList();});
                });
                this.data.father.RefreshScoreList();
        }).catch(reason => { });
    }

    public IntegralExchangeReqBody_Visit(count) {
        return new Promise((resolve, reject) => {
            let request = new message.IntegralExchangeRequest();
            request.body.exchangeId = this.data.index;
            request.body.exchange_time = count || 1;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.IntegralExchangeResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
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

}

export class Activity_RandomLiveItemData {
    father: Activity_RandomLive;
    goods: any;
    index: number;
}
}