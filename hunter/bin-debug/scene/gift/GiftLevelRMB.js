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
    var GiftLevelRMB = (function (_super) {
        __extends(GiftLevelRMB, _super);
        function GiftLevelRMB() {
            var _this = _super.call(this) || this;
            _this.cb = null;
            _this.change = false;
            _this.allProducts = [];
            _this._TOKEN = message.EResourceType.RESOURCE_TOKEN;
            _this.skinName = "resource/skins/gift/GiftLevelRMBSkin.exml";
            _this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftBuy, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.lbTipClose); // 因为是循环播放，需要特别处理
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, _this);
            _this.loadPayProducts();
            return _this;
        }
        GiftLevelRMB.prototype.setInfo = function (info, father, cb) {
            this.info = info;
            this.father = father;
            this.cb = cb;
            if (this.father != null) {
                this.father.openDown();
            }
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(info["gift_index"]);
            this.allLevelInfo = zj.PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
            this.setInfoList();
            this.setInfoButton();
            egret.Tween.get(this.lbTipClose, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        GiftLevelRMB.prototype.setInfoOther = function () {
            // tips
            var tipIndex = Number(this.info["gift_index"] + this.info["index"]);
            if (zj.Tips.tips_oneday_get(tipIndex)) {
                zj.Tips.tips_oneday_set(tipIndex, true);
                this.change = true;
            }
            var price = 0;
            var payIndex = zj.TablePayIndex.Item(this.giftInfo.pay_index);
            for (var _i = 0, _a = this.allProducts; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.coin == payIndex.raw_token) {
                    price = v.amount;
                    break;
                }
            }
            var canBuyLevel = this.giftInfo.limit_level;
            var allGet = 0;
            for (var _b = 0, _c = this.allLevelInfo; _b < _c.length; _b++) {
                var v = _c[_b];
                for (var _d = 0, _e = v.goods_id; _d < _e.length; _d++) {
                    var vv = _e[_d];
                    allGet = allGet + Number(v.value);
                }
            }
            this.lbNameType.text = this.giftInfo.name_str;
            this.lbCurrentLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.cur_level, zj.Game.PlayerInfoSystem.BaseInfo.level));
            this.lbBuyNeed.text = price.toString();
            this.lbGiftAwardNum.text = allGet.toString();
            this.lbLevelNum.text = canBuyLevel.toString() + "级"; //Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.get_level, canBuyLevel);
            this.lbGetNeedNum.text = price.toString();
        };
        GiftLevelRMB.prototype.setInfoList = function () {
            var _this = this;
            // 成長禮包C購買後可獲得
            var msg = new zj.TableNewgiftDaily();
            msg.reward_level = zj.TextsConfig.TextsConfig_Gift.get_after_buy2;
            for (var i = 0; i < this.giftInfo.goods_id.length; i++) {
                var count = 0;
                if (this.giftInfo.goods_id[i] == this._TOKEN) {
                    count = this.giftInfo.goods_count[i] + this.giftInfo.raw_token;
                }
                else {
                    count = this.giftInfo.goods_count[i];
                }
                msg.goods_id.push(this.giftInfo.goods_id[i]);
                msg.goods_count.push(count);
            }
            var tokenCount = this.giftInfo.raw_token;
            var findToken = zj.Table.FindF(msg["goods_id"], function (k, v) {
                return v == _this._TOKEN;
            });
            if (!findToken && tokenCount != 0) {
                msg.goods_id.push(this._TOKEN);
                msg.goods_count.push(tokenCount);
            }
            this.allLevelInfo.splice(0, 0, msg);
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.allLevelInfo.length; i++) {
                if (i == 0) {
                    arrCollection.addItem({ info: this.allLevelInfo[i], bOne: true });
                    continue;
                }
                arrCollection.addItem({ info: this.allLevelInfo[i] });
            }
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = zj.GiftLevelRMBItem;
        };
        GiftLevelRMB.prototype.setInfoButton = function () {
            this.btnGiftBuy.enabled = (this.info["buy_times"] < this.giftInfo.buy_times);
        };
        GiftLevelRMB.prototype.onBtnGiftBuy = function () {
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
        GiftLevelRMB.prototype.requestButtonBuy = function () {
            this.btnGiftBuy.enabled = false;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (zj.Util.getAppVersionInfo().channel == "test") {
                zj.Game.PlayerPaySystem.simulateCharge(this.info["index"]);
            }
            else {
                var strIndex = this.info["index"];
                if (this.info["pay_tbl"]) {
                    zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                }
            }
        };
        GiftLevelRMB.prototype.loadPayProducts = function () {
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
                _this.setInfoOther();
            });
        };
        GiftLevelRMB.prototype.refreshInfo = function (ev) {
            var _this = this;
            this.btnGiftBuy.enabled = true;
            this.change = true;
            var cb = function () {
                _this.setInfoButton();
                zj.toast_success(zj.LANG(zj.TextsConfig.TextConfig_Tower.mallBuy));
                _this.onBtnClose();
            };
            var msg = ev.data.body;
            if (msg.gameInfo.giftInfos.length > 0) {
                for (var _i = 0, _a = msg.gameInfo.giftInfos; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.index == this.info["index"]) {
                        this.info = zj.Table.DeepCopy(v);
                        if (this.info["buy_times"] >= this.giftInfo.buy_times) {
                            if (msg.gameInfo.getGoods.length > 0) {
                                zj.loadUI(zj.CommonGetDialog)
                                    .then(function (dialog) {
                                    dialog.show();
                                    dialog.init(msg.gameInfo.getGoods);
                                    dialog.setCB(cb);
                                });
                            }
                            else {
                                cb();
                            }
                        }
                    }
                }
            }
        };
        GiftLevelRMB.prototype.onClickClose = function (e) {
            var global = this.groupMain.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose(false);
            }
        };
        GiftLevelRMB.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftLevelRMB.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        GiftLevelRMB.prototype.onBtnClose = function (isPop) {
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
        return GiftLevelRMB;
    }(zj.Dialog));
    zj.GiftLevelRMB = GiftLevelRMB;
    __reflect(GiftLevelRMB.prototype, "zj.GiftLevelRMB");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelRMB.js.map