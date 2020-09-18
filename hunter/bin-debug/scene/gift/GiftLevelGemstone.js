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
    // 
    // lizhengqiang
    // 20190410
    var GiftLevelGemstone = (function (_super) {
        __extends(GiftLevelGemstone, _super);
        function GiftLevelGemstone() {
            var _this = _super.call(this) || this;
            _this.cb = null;
            _this.change = false;
            _this._TOKEN = message.EResourceType.RESOURCE_TOKEN;
            _this.setInfoButton = function () {
                _this.btnGiftBuy.enabled = (_this.info["buy_times"] < _this.giftInfo.buy_times);
            };
            _this.skinName = "resource/skins/gift/GiftLevelGemstoneSkin.exml";
            _this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftBuy, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.lbTipClose); // 因为是循环播放，需要特别处理
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        GiftLevelGemstone.prototype.setInfo = function (info, father, cb) {
            this.info = info;
            this.father = father;
            this.cb = cb;
            if (this.father != null) {
                this.father.openDown();
            }
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(info["gift_index"]);
            this.allLevelInfo = zj.PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
            this.setInfoOther();
            this.setInfoList();
            this.setInfoButton();
            egret.Tween.get(this.lbTipClose, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        GiftLevelGemstone.prototype.setInfoOther = function () {
            // tips
            var tipIndex = Number(this.info["gift_index"] + this.info["index"]);
            if (zj.Tips.tips_oneday_get(tipIndex)) {
                zj.Tips.tips_oneday_set(tipIndex, true);
                this.change = true;
            }
            var price = this.giftInfo.price;
            var allGet = 0;
            for (var i = 0; i < this.allLevelInfo.length; i++) {
                for (var j = 0; j < this.allLevelInfo[i].goods_id.length; j++) {
                    if (this.allLevelInfo[i].goods_id[j] == this._TOKEN)
                        allGet = allGet + this.allLevelInfo[i].goods_count[j];
                }
            }
            this.lbNameType.text = this.giftInfo.name_str;
            this.lbCurrentLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.cur_level, zj.Game.PlayerInfoSystem.BaseInfo.level));
            this.lbBuyNeedNum.text = price.toString();
            this.lbDayAwardNum.text = allGet.toString();
            this.lbGetNum.text = price.toString();
        };
        GiftLevelGemstone.prototype.setInfoList = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = this.allLevelInfo; _i < _a.length; _i++) {
                var v = _a[_i];
                arrCollection.addItem(v);
            }
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = zj.GiftLevelGemstoneItem;
        };
        GiftLevelGemstone.prototype.onBtnGiftBuy = function () {
            var _this = this;
            if (zj.Game.PlayerInfoSystem.BaseInfo.vipLevel < 3) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_Instance.vip3BuyGift));
            }
            else {
                this.btnGiftBuy.enabled = false;
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                    _this.change = true;
                    var cb = function () {
                        _this.setInfoButton();
                        zj.toast_success(zj.LANG(zj.TextsConfig.TextConfig_Tower.mallBuy));
                        _this.onBtnClose();
                    };
                    if (gameInfo.giftInfos.length > 0) {
                        for (var _i = 0, _a = gameInfo.giftInfos; _i < _a.length; _i++) {
                            var v = _a[_i];
                            if (v.index == _this.info["index"]) {
                                _this.info = zj.Table.DeepCopy(v);
                                if (_this.info["buy_times"] >= _this.giftInfo.buy_times) {
                                    cb();
                                }
                            }
                        }
                    }
                }).catch(function (result) {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                });
            }
        };
        GiftLevelGemstone.prototype.onClickClose = function (e) {
            var global = this.groupMain.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose(false);
            }
        };
        GiftLevelGemstone.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftLevelGemstone.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        GiftLevelGemstone.prototype.onBtnClose = function (isPop) {
            if (isPop === void 0) { isPop = true; }
            if (this.father != null) {
                this.father.closeUp();
            }
            if (this.change && this.cb != null) {
                this.cb();
            }
            if (isPop) {
                this.father.popItem(this.info["index"]);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return GiftLevelGemstone;
    }(zj.Dialog));
    zj.GiftLevelGemstone = GiftLevelGemstone;
    __reflect(GiftLevelGemstone.prototype, "zj.GiftLevelGemstone");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelGemstone.js.map