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
     * xingliwei
     * 2019.11.6
     * 信长礼包
     */
    var Activity_HunterGift = (function (_super) {
        __extends(Activity_HunterGift, _super);
        function Activity_HunterGift() {
            var _this = _super.call(this) || this;
            _this.allProducts = [];
            _this.vis = true;
            _this.goods = [];
            _this.skinName = "resource/skins/activity/Activity_HunterGiftSkin.exml";
            // this.groupMain.cacheAsBitmap = true;
            _this.init();
            return _this;
        }
        Activity_HunterGift.prototype.init = function () {
            var _this = this;
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
            this.loadPayProducts(function () {
                zj.setCache(_this.groupMain);
                _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy, _this);
                _this.update = egret.setInterval(_this.Update, _this, 1000);
                _this.loadKeel(2);
                _this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.gift_index == 101507;
                })[0];
                _this.payTbl = {};
                var giftInfo = zj.PlayerGiftSystem.Instance_item(_this.info["gift_index"]);
                var payIndex = zj.TablePayIndex.Item(giftInfo.pay_index);
                for (var _i = 0, _a = _this.allProducts; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.coin == payIndex.raw_token) {
                        _this.payTbl = zj.Table.DeepCopy(v);
                        break;
                    }
                }
                _this.tableinfo = zj.TableNewgiftItem.Item(101507);
                _this.Update();
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                    egret.clearInterval(_this.update);
                }, _this);
                var array = new eui.ArrayCollection();
                for (var i = 0; i < 2; i++) {
                    var data = new zj.Activity_HunterGiftItemData();
                    data.goodsId = _this.tableinfo.goods_id[i];
                    data.count = _this.tableinfo.goods_count[i];
                    array.addItem(data);
                }
                _this.list.dataProvider = array;
                _this.list.itemRenderer = zj.Activity_HunterGiftItem;
                _this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListTap, _this);
                var array1 = new eui.ArrayCollection();
                for (var i = 2; i < _this.tableinfo.goods_id.length; i++) {
                    var data = new zj.Activity_HunterGiftItemData();
                    data.goodsId = _this.tableinfo.goods_id[i];
                    data.count = _this.tableinfo.goods_count[i];
                    array1.addItem(data);
                }
                _this.list1.dataProvider = array1;
                _this.list1.itemRenderer = zj.Activity_HunterGiftItem;
            });
        };
        /**点击list */
        Activity_HunterGift.prototype.onListTap = function (e) {
            if (e.itemIndex == 0) {
                this.loadKeel(1);
            }
            else if (e.itemIndex == 1) {
                this.loadKeel(2);
            }
        };
        Activity_HunterGift.prototype.Update = function () {
            if (this.info) {
                var time = this.info.trigger_time + this.tableinfo.duration - zj.Game.Controller.curServerTime;
                if (Math.floor(time / 86400) != 0) {
                    this.labeltime.text = Math.floor(time / 86400) + "天 " + Math.floor(time / 3600) % 24 + ":" + Math.floor((time % 3600) / 60) + ":" + Math.floor(time % 60);
                }
                else {
                    this.labeltime.text = Math.floor(time / 3600) % 24 + ":" + Math.floor((time % 3600) / 60) + ":" + Math.floor(time % 60);
                }
            }
        };
        /**加载龙骨 */
        Activity_HunterGift.prototype.loadKeel = function (type) {
            var _this = this;
            this.groupKeel.removeChildren();
            var body = type == 1 ? "wj_027_xinchang" : "wj_000_xinchang_bssz";
            zj.Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                .then(function (display) {
                display.scaleX = 1;
                display.scaleY = 1;
                display.name = "fashion";
                _this.groupKeel.addChild(display);
            });
        };
        Activity_HunterGift.prototype.onBtnBuy = function () {
            var _this = this;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(101507);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GOODS_INFO_CHANGE, this.getGoods, this);
            if (this.tableinfo.pay_type == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(this.info["index"]).then(function (resp) {
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
                else {
                    var strIndex = this.info["index"];
                    if (this.payTbl) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
            }
            else if (this.tableinfo.pay_type == 2) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"]).then(function (gameInfo) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        dialog.init(gameInfo.goodsInfo);
                        dialog.show();
                        dialog.setCB(function () {
                            zj.Game.EventManager.off(zj.GameEvent.PLAYER_GOODS_INFO_CHANGE, _this.getGoods, _this);
                            _this.onBtnClose();
                        });
                    });
                }).catch(function (err) {
                    console.log(err);
                });
            }
        };
        Activity_HunterGift.prototype.getGoods = function () {
            var _this = this;
            this.goods.length = 0;
            for (var i = 0; i < this.tableinfo.goods_id.length; i++) {
                var a = new message.GoodsInfo();
                a.goodsId = this.tableinfo.goods_id[i];
                a.count = this.tableinfo.goods_count[i];
                this.goods.push(a);
            }
            zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                dialog.init(_this.goods);
                dialog.show();
                dialog.setCB(function () {
                    _this.onBtnClose();
                });
            });
        };
        Activity_HunterGift.prototype.loadPayProducts = function (cb) {
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
                    if (itemA == null)
                        return 1;
                    if (itemB == null)
                        return -1;
                    return itemA.sort_index - itemB.sort_index;
                });
                if (cb)
                    cb();
            });
        };
        Activity_HunterGift.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        Activity_HunterGift.prototype.showGoodsProperty = function (ev) {
            // if (Game.UIManager.dialogCount() >= 1) return;
            var ui = this.getChildByName("details");
            if (ui) {
                return;
            }
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        Activity_HunterGift.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Activity_HunterGift;
    }(zj.Dialog));
    zj.Activity_HunterGift = Activity_HunterGift;
    __reflect(Activity_HunterGift.prototype, "zj.Activity_HunterGift");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_HunterGift.js.map