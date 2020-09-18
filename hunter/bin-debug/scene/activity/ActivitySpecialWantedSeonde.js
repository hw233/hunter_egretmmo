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
    // 福利-成长礼包
    // lizhengqiang
    // 20190323
    var ActivitySpecialWantedSeonde = (function (_super) {
        __extends(ActivitySpecialWantedSeonde, _super);
        function ActivitySpecialWantedSeonde() {
            var _this = _super.call(this) || this;
            _this.allProducts = [];
            _this.setInfoButton = function () {
                _this.btn.enabled = (_this.info["buy_times"] < _this.giftInfo.buy_times);
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialWantedSeondeSkin.exml";
            return _this;
        }
        ActivitySpecialWantedSeonde.prototype.playerGiftInfoChange = function () {
            var _this = this;
            egret.Tween.get(this).wait(100).call(function () {
                _this.init();
            });
        };
        ActivitySpecialWantedSeonde.prototype.init = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.playerGiftInfoChange, this);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtn, this);
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(100303);
            this.info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100303;
            })[0];
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.info.buy_times == 0) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 1, 0)
                    .then(function (display) {
                    display.touchEnabled = false;
                    _this.groupHand.addChild(display);
                });
            }
            else {
                this.groupHand.removeChildren();
            }
            this.payTbl = {};
            this.loadPayProducts(function () {
                var payIndex = zj.TablePayIndex.Item(giftInfo.pay_index);
                for (var _i = 0, _a = _this.allProducts; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.coin == payIndex.raw_token) {
                        _this.payTbl = zj.Table.DeepCopy(v);
                        break;
                    }
                }
                _this.allLevelInfo = zj.PlayerGiftSystem.GetGiftFate(Number(_this.giftInfo.daily_index));
                _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
                var arrCollection = new eui.ArrayCollection();
                for (var i = 0; i < _this.allLevelInfo.length; i++) {
                    var data = new zj.ActivitySpecialWonderlandItemData();
                    data.father = _this;
                    data.index = i;
                    data.info = _this.allLevelInfo[i];
                    data.id = 100303;
                    arrCollection.addItem(data);
                }
                var array = new eui.ArrayCollection();
                var b = [];
                var _loop_1 = function (i) {
                    var a = arrCollection.source[i];
                    var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                        return v.gift_index == a.id;
                    })[0];
                    var find = info && zj.Table.FindF(info["markIndex"], function (k, v) {
                        return v == zj.PlayerGiftSystem.GetGiftFate(Number(zj.PlayerGiftSystem.Instance_item(info["gift_index"]).daily_index))[a.index].index;
                    });
                    if (find) {
                        b.push(a);
                    }
                    else {
                        array.addItem(a);
                    }
                };
                for (var i = 0; i < arrCollection.length; i++) {
                    _loop_1(i);
                }
                for (var k = 0; k < b.length; k++) {
                    array.addItem(b[k]);
                }
                _this.lstAward.dataProvider = array;
                _this.lstAward.itemRenderer = zj.ActivitySpecialWonderlandItem;
                _this.lbCurrencyLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.baselevel, zj.Game.PlayerInfoSystem.BaseInfo.level));
            });
        };
        Object.defineProperty(ActivitySpecialWantedSeonde.prototype, "vis", {
            get: function () {
                if (this.info.buy_times == 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        ActivitySpecialWantedSeonde.prototype.onbtn = function () {
            var _this = this;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.pay_type == 1) {
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    zj.Game.PlayerGiftSystem.newGiftExist(_this.info["index"]).then(function () {
                        _this.requestButtonBuy();
                    });
                });
            }
            else {
                this.requestButtonBuy();
            }
        };
        ActivitySpecialWantedSeonde.prototype.requestButtonBuy = function () {
            var _this = this;
            // this.btn.enabled = false;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (zj.Util.getAppVersionInfo().channel == "test") {
                zj.Game.PlayerPaySystem.simulateCharge(this.info["index"]).then(function () {
                    _this.init();
                });
            }
            else {
                var strIndex = this.info["index"];
                if (this.payTbl) {
                    zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                }
            }
        };
        ActivitySpecialWantedSeonde.prototype.loadPayProducts = function (cb) {
            var _this = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                    var v = _a[_i];
                    for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                        var vv = _c[_b];
                        if (v.id == vv.id) {
                            var tmp = {
                                id: "",
                                name: "",
                                describe: "",
                                currency: "",
                                amount: 0,
                                amount_usd: 0,
                                coin: 0,
                                type: "",
                                discount: "",
                                cp_product_id: "",
                            };
                            for (var k in tmp) {
                                tmp[k] = v[k];
                            }
                            tmp.cp_product_id = vv.cp_product_id;
                            _this.allProducts.push(tmp);
                            break;
                        }
                    }
                }
                var i = 0;
                while (i < _this.allProducts.length) {
                    if (zj.PlayerPaySystem.PayItemByID(_this.allProducts[i].cp_product_id) == null) {
                        _this.allProducts.splice(i, 1);
                    }
                    else {
                        i = i + 1;
                    }
                }
                _this.allProducts.sort(function (a, b) {
                    var itemA = zj.PlayerPaySystem.PayItemByID(a.cp_product_id);
                    var itemB = zj.PlayerPaySystem.PayItemByID(b.cp_product_id);
                    return itemA.sort_index - itemB.sort_index;
                });
                if (cb)
                    cb();
                // this.setInfoOther();
            });
        };
        /**抬起移除奖励详情界面 */
        ActivitySpecialWantedSeonde.prototype.up = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        ActivitySpecialWantedSeonde.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return ActivitySpecialWantedSeonde;
    }(zj.UI));
    zj.ActivitySpecialWantedSeonde = ActivitySpecialWantedSeonde;
    __reflect(ActivitySpecialWantedSeonde.prototype, "zj.ActivitySpecialWantedSeonde");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialWantedSeonde.js.map