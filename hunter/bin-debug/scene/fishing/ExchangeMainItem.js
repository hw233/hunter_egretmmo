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
    // wang shen zhuo
    // HXH_ExchangeMainItem
    // 2019.05.21
    var ExchangeMainItem = (function (_super) {
        __extends(ExchangeMainItem, _super);
        function ExchangeMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/ExchangeMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["ExchangeMainItem"], null);
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ExchangeMainItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            if (this.selected) {
                this.imageBg.visible = true;
            }
            else {
                this.imageBg.visible = false;
            }
            this.father = this.data.father;
            this.index = this.data.index;
            this.info = this.data.good;
            this.SetInfoItem();
            zj.setCache(this.groupCache);
        };
        ExchangeMainItem.prototype.SetInfoItem = function () {
            if (this.info.reward_goods == 0 || this.info.reward_goods == null) {
                return;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.info.reward_goods, this.info.showType, this.info.reward_count);
            var need = this.info.exchange_goods.length;
            var has = zj.PlayerConvertSystem.NumCanConvert(this.info.id);
            this.imageBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelName.text = itemSet.Info["name"];
            var infoid = this.info.id;
            var converts = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (k, v) {
                return infoid == v.key;
            });
            var title = "";
            var str_gap = "";
            var num = 0;
            if (converts[0] != null) {
                num = converts[0].value;
            }
            var can_convert_times = converts[0] == null && this.info.exchange_times || (this.info.exchange_times - num);
            // let can_convert_times = 5 ;
            if (this.info.is_only == 1) {
                title = zj.TextsConfig.TextsConfig_Convert.convert_gap[1];
                str_gap = zj.TextsConfig.TextsConfig_Convert.once_convert;
            }
            else if (this.info.daily_refresh == 1) {
                title = zj.TextsConfig.TextsConfig_Convert.convert_gap[2];
                if (can_convert_times <= 0) {
                    str_gap = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
                }
                else {
                    str_gap = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr, can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
                }
            }
            else if (this.info.week_refresh == 1) {
                title = zj.TextsConfig.TextsConfig_Convert.convert_gap[3];
                if (can_convert_times <= 0) {
                    str_gap = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
                }
                else {
                    str_gap = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr, can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
                }
            }
            this.labelTime.textFlow = zj.Util.RichText(str_gap);
            this.labelTimeTip.text = title;
            if (has >= need) {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr, has + "<text>/" + need + "</text>");
                this.labelBur.textFlow = zj.Util.RichText(str);
            }
            else {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, has + "<text>/" + need + "</text>");
                this.labelBur.textFlow = zj.Util.RichText(str);
            }
            var info_id = this.info.id;
            var _a = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                return value.key == info_id;
            }), _v = _a[0], _k = _a[1];
            var can_convert = _v == null && true || (_v.value < this.info.exchange_times);
            this.imageCD.visible = !can_convert;
            var tips = zj.PlayerConvertSystem.CanConvert(this.info.id);
            this.imageTips.visible = tips;
            if (this.isImgMask(this.info.reward_goods)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        // 物品遮罩
        ExchangeMainItem.prototype.isImgMask = function (goodsId) {
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
        ExchangeMainItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ExchangeMainItem;
    }(eui.ItemRenderer));
    zj.ExchangeMainItem = ExchangeMainItem;
    __reflect(ExchangeMainItem.prototype, "zj.ExchangeMainItem");
    var ExchangeMainItemData = (function () {
        function ExchangeMainItemData() {
        }
        return ExchangeMainItemData;
    }());
    zj.ExchangeMainItemData = ExchangeMainItemData;
    __reflect(ExchangeMainItemData.prototype, "zj.ExchangeMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ExchangeMainItem.js.map