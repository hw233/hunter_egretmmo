namespace zj {
/**
 * @author wang shen zhuo
 * 
 * @date 2019-05-21
 * 
 * @class 
 */
export class ExchangeNeedItem extends UI {

    public labemName: eui.Label;
    public LabelPotatoNum: eui.Label;
    public imageFrame: eui.Image;
    public imageIcon: eui.Image;
    public labelNum: eui.Label;
    public imageCD: eui.Image;
    public imageBigon: eui.Image;
    public groupMain: eui.Group;
    public itemcount: number = 0;
    public itemgoodsId: number = 0;
    private itemIndex: number = 0;

    private father: ExchangeMainRight;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/ExchangeNeedItemSkin.exml";
        cachekeys(<string[]>UIResource["ExchangeNeedItem"], null);

        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.father as ExchangeMainRight).father.onChooseItemTap(true, this.itemgoodsId, this.itemcount, this.itemIndex);
        }, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.father as ExchangeMainRight).father.onChooseItemTap(false, this.itemgoodsId, this.itemcount, this.itemIndex);
        }, this);


        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.imgMask.scaleX = 0.9;
        this.imgMask.scaleY = 0.9;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(74.7, 75.6);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    public SetFather(father: ExchangeMainRight) {
        this.father = father;
    }

    public SetInfo(index, need, itemIndex?) {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        this.itemIndex = itemIndex;
        if (this.father.father.getList != null) {
            let info = new message.GoodsInfo();
            if (index == null) {
                info.goodsId = this.father.father.getList.reward_goods;
                info.count = this.father.father.getList.reward_count;
                this.itemcount = info.count;
                this.itemgoodsId = info.goodsId;
            } else {
                if (this.father.father.getList.exchange_goods[index] == null) {
                    return;
                }
                info.goodsId = this.father.father.getList.exchange_goods[index][0];
                info.count = this.father.father.getList.exchange_goods[index][1];
                this.itemcount = info.count;
                this.itemgoodsId = info.goodsId;
            }
            let itemSet = PlayerItemSystem.Set(info.goodsId, info.showType, info.count);
            let count_str = "";
            if (itemSet.Count >= info.count) {
                count_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, " (" + Set.NumberUnit3(itemSet.Count) + "/" + Set.NumberUnit3(info.count) + ")");
                // this.LabelPotatoNum.textColor = Helper.RGBToHex("r:60,g:255,b:0");
            } else {
                count_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, " (" + Set.NumberUnit3(itemSet.Count) + "/" + Set.NumberUnit3(info.count) + ")");
                // this.LabelPotatoNum.textColor = Helper.RGBToHex("r:255,g:38,b:0");
            }
            this.LabelPotatoNum.text = count_str;

            this.imageFrame.source = cachekey(itemSet.Frame, this);
            this.imageIcon.source = cachekey(itemSet.Clip, this);

            if (this.isImgMask(info.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            } else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            if (need) {
                this.labemName.textFlow = Util.RichText(itemSet.Info["name"] + " x" + info.count);
                this.imageBigon.visible = false;
                let idnum = this.father.father.getList.id;
                let [_v, _k] = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                    return value.key == idnum;
                })
                let vValue: number = 0;
                if (_v != null) {
                    vValue = _v.value;
                }
                let can_convert = _v == null && true || (vValue < this.father.father.getList.exchange_times);
                this.imageCD.visible = !can_convert;

                let progress = null;
                if (itemSet["Type"] == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) {
                    progress = UIConfig.UIConfig_Random.cdPng2;
                } else {
                    progress = UIConfig.UIConfig_Random.cdPng;
                }
                this.imageFrame.visible = true;
                //  ////////////////////////////////////
            } else {
                this.labemName.textFlow = Util.RichText("<text>" + itemSet.Info["name"] + " </text>" + this.LabelPotatoNum.text);
                this.imageCD.visible = false;
                // this.mask
                this.imageFrame.visible = false;
                this.imageBigon.visible = (itemSet.Count >= info.count);
            }

            if (itemSet["FruitID"] != null) {
                this.labelNum.visible = true;
                this.labelNum.text = itemSet["FruitID"];
            }


        }

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
}
}