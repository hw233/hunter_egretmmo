var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @author wang shen zhuo
     *
     * @date 2019-05-21
     *
     * @class
     */
    var ExchangeNeedItem = (function (_super) {
        __extends(ExchangeNeedItem, _super);
        function ExchangeNeedItem() {
            var _this = _super.call(this) || this;
            _this.itemcount = 0;
            _this.itemgoodsId = 0;
            _this.itemIndex = 0;
            _this.skinName = "resource/skins/fishing/ExchangeNeedItemSkin.exml";
            zj.cachekeys(zj.UIResource["ExchangeNeedItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.father.father.onChooseItemTap(true, _this.itemgoodsId, _this.itemcount, _this.itemIndex);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.father.father.onChooseItemTap(false, _this.itemgoodsId, _this.itemcount, _this.itemIndex);
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.9;
            _this.imgMask.scaleY = 0.9;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(74.7, 75.6);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ExchangeNeedItem.prototype.SetFather = function (father) {
            this.father = father;
        };
        ExchangeNeedItem.prototype.SetInfo = function (index, need, itemIndex) {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.itemIndex = itemIndex;
            if (this.father.father.getList != null) {
                var info = new message.GoodsInfo();
                if (index == null) {
                    info.goodsId = this.father.father.getList.reward_goods;
                    info.count = this.father.father.getList.reward_count;
                    this.itemcount = info.count;
                    this.itemgoodsId = info.goodsId;
                }
                else {
                    if (this.father.father.getList.exchange_goods[index] == null) {
                        return;
                    }
                    info.goodsId = this.father.father.getList.exchange_goods[index][0];
                    info.count = this.father.father.getList.exchange_goods[index][1];
                    this.itemcount = info.count;
                    this.itemgoodsId = info.goodsId;
                }
                var itemSet = zj.PlayerItemSystem.Set(info.goodsId, info.showType, info.count);
                var count_str = "";
                if (itemSet.Count >= info.count) {
                    count_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, " (" + zj.Set.NumberUnit3(itemSet.Count) + "/" + zj.Set.NumberUnit3(info.count) + ")");
                    // this.LabelPotatoNum.textColor = Helper.RGBToHex("r:60,g:255,b:0");
                }
                else {
                    count_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, " (" + zj.Set.NumberUnit3(itemSet.Count) + "/" + zj.Set.NumberUnit3(info.count) + ")");
                    // this.LabelPotatoNum.textColor = Helper.RGBToHex("r:255,g:38,b:0");
                }
                this.LabelPotatoNum.text = count_str;
                this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
                this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
                if (this.isImgMask(info.goodsId)) {
                    this.imgMask.visible = true;
                    this.imageIcon.mask = this.imgMask;
                }
                else {
                    this.imgMask.visible = false;
                    this.rectMaskCommon.visible = true;
                    this.imageIcon.mask = this.rectMaskCommon;
                }
                if (need) {
                    this.labemName.textFlow = zj.Util.RichText(itemSet.Info["name"] + " x" + info.count);
                    this.imageBigon.visible = false;
                    var idnum_1 = this.father.father.getList.id;
                    var _a = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                        return value.key == idnum_1;
                    }), _v = _a[0], _k = _a[1];
                    var vValue = 0;
                    if (_v != null) {
                        vValue = _v.value;
                    }
                    var can_convert = _v == null && true || (vValue < this.father.father.getList.exchange_times);
                    this.imageCD.visible = !can_convert;
                    var progress = null;
                    if (itemSet["Type"] == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) {
                        progress = zj.UIConfig.UIConfig_Random.cdPng2;
                    }
                    else {
                        progress = zj.UIConfig.UIConfig_Random.cdPng;
                    }
                    this.imageFrame.visible = true;
                    //  ////////////////////////////////////
                }
                else {
                    this.labemName.textFlow = zj.Util.RichText("<text>" + itemSet.Info["name"] + " </text>" + this.LabelPotatoNum.text);
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
        };
        // 物品遮罩
        ExchangeNeedItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        return ExchangeNeedItem;
    }(zj.UI));
    zj.ExchangeNeedItem = ExchangeNeedItem;
    __reflect(ExchangeNeedItem.prototype, "zj.ExchangeNeedItem");
})(zj || (zj = {}));
//# sourceMappingURL=ExchangeNeedItem.js.map