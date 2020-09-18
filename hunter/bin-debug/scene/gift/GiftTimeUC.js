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
    // 新手礼包 HXH_GiftTimeUC
    // lizhengqiang
    // 20190419
    var GiftTimeUC = (function (_super) {
        __extends(GiftTimeUC, _super);
        function GiftTimeUC() {
            var _this = _super.call(this) || this;
            _this.adverse = false;
            _this.info = null;
            _this.father = null;
            _this.bActivity = false;
            _this.giftInfo = null;
            _this.cb = null;
            _this.allBackToken = 0;
            _this.change = false;
            _this.thisBuy = false;
            _this.allProducts = [];
            _this.TOKEN = message.EResourceType.RESOURCE_TOKEN;
            _this.simulateCharge = function (gameInfo, result) {
                _this.btnGiftGet.enabled = true;
                if (result == message.EC.SUCCESS) {
                    _this.btnGiftBuy.enabled = false;
                }
                else {
                    _this.btnGiftBuy.enabled = true;
                }
            };
            _this.onBtnClose = function () {
                if (_this.cb != null) {
                    _this.cb();
                }
                _this.close(zj.UI.HIDE_TO_TOP);
            };
            _this.skinName = "resource/skins/gift/GiftTimeUCSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftGet, _this);
            _this.btnGiftGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftGo, _this);
            _this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftBuy, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.USER_PAY_RESULT, function () {
                _this.btnGiftBuy.enabled = true;
            }, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                _this.father = null;
            }, _this);
            return _this;
        }
        GiftTimeUC.prototype.setInfo = function (adverse, info, father, bActivity) {
            if (adverse === void 0) { adverse = false; }
            if (bActivity === void 0) { bActivity = false; }
            this.groupMain.visible = false;
            this.loadPayProducts();
            this.adverse = adverse;
            this.info = info;
            this.father = father;
            this.bActivity = false;
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        };
        GiftTimeUC.prototype.setInfoItem = function () {
            var _this = this;
            var info = this.giftInfo;
            this.lbNameType.text = this.giftInfo.name_str;
            this.imgBuyTypeBoard.source = zj.cachekey(info.push_big_path, this);
            if (info.pay_type == 3) {
                var firstDailyIndex = Number(info.daily_index);
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex + 1);
                var rewardKey = zj.Table.FindR(firstDailyTbl.goods_id, function (k, v) {
                    return v == _this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    var dayCount = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = (dayCount * Number(info.daily_num) - 1 + this.allBackToken).toString();
                }
                this.imgTypeTop.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type2[5], this);
                this.lbDayAward.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1);
                this.groupBuy.visible = false;
                if (this.adverse) {
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                }
                else {
                    this.btnGiftGo.visible = false;
                    if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 0) {
                        this.btnGiftGet.enabled = true;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        this.btnGiftGet.enabled = false;
                    }
                    else {
                        this.btnGiftGet.enabled = false;
                    }
                }
            }
            else {
                var firstDailyIndex = info.daily_index;
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex);
                var rewardKey = zj.Table.FindR(firstDailyTbl.goods_id, function (k, v) {
                    return v == _this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    var dayCount = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = (dayCount * Number(info.daily_num) + this.allBackToken).toString();
                }
                this.lbDayAward.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.after_get_award, info.daily_num);
                // tip
                var tipIndex = Number(this.info["gift_index"] + this.info["index"]);
                if (zj.Tips.tips_oneday_get(tipIndex)) {
                    zj.Tips.tips_oneday_set(tipIndex, true);
                    this.change = true;
                }
                // price
                if (info.pay_type == 1) {
                    // rmb
                    var payIndex = zj.TablePayIndex.Item(info.pay_index);
                    var payTbl = null;
                    for (var _i = 0, _a = this.allProducts; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.coin == payIndex.raw_token) {
                            payTbl = zj.Table.DeepCopy(v);
                            break;
                        }
                    }
                    if (payTbl != null) {
                        this.info["pay_tbl"] = {};
                        this.info["pay_tbl"] = payTbl;
                        var strUnit = zj.Set.CashUnit(payTbl.currency);
                        var strMoney = payTbl.amount;
                        this.lbGetNum.visible = true;
                        this.lbGetNum1.visible = false;
                        this.lbGetNum.text = strMoney.toString();
                    }
                    else {
                        this.lbGetNum.visible = false;
                        this.lbGetNum1.visible = true;
                        this.lbGetNum1.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbGetNum.text = info.price.toString();
                    this.lbGetNum.visible = true;
                    this.lbGetNum1.visible = false;
                }
                this.groupBuy.visible = true;
                this.btnGiftGo.visible = false;
                this.btnGiftGet.visible = false;
                this.imgTypeTop.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type2[4], this);
                this.imgGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[info.pay_type - 1], this);
                if (this.info["buy_times"] < info.buy_times) {
                    if (info.duration == 0) {
                        this.imgTypeTop.visible = false;
                    }
                    this.btnGiftBuy.enabled = true;
                }
                else {
                    if (this.adverse) {
                        this.groupBuy.visible = false;
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else {
                        this.btnGiftBuy.enabled = false;
                    }
                }
            }
        };
        GiftTimeUC.prototype.setInfoAward = function () {
            var _this = this;
            var rewards = [];
            if (this.giftInfo.pay_type == 3) {
                var firstDailyIndex = this.giftInfo.daily_index;
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex);
                for (var i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    var good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewards.push(good);
                    if (good.goodsId == this.TOKEN) {
                        this.allBackToken = good.count;
                    }
                }
            }
            else {
                for (var i = 0; i < this.giftInfo.goods_id.length; i++) {
                    var good_1 = new message.GoodsInfo();
                    good_1.goodsId = this.giftInfo.goods_id[i];
                    if (this.giftInfo.goods_id[i] == this.TOKEN) {
                        good_1.count = this.giftInfo.goods_count[i] + this.giftInfo.raw_token;
                        this.allBackToken = good_1.count;
                    }
                    else {
                        good_1.count = this.giftInfo.goods_count[i];
                    }
                    rewards.push(good_1);
                }
                var good = new message.GoodsInfo();
                good.goodsId = this.TOKEN;
                good.count = this.giftInfo.raw_token;
                var findToken = zj.Table.FindF(rewards, function (k, v) {
                    return v.goodId == _this.TOKEN;
                });
                if (!findToken && good.count != 0) {
                    this.allBackToken = good.count;
                    rewards.splice(0, 0, good);
                }
            }
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                var v = rewards_1[_i];
                arrCollection.addItem(v);
            }
            var layout = new eui.HorizontalLayout();
            layout.verticalAlign = "middle";
            layout.horizontalAlign = "center";
            if (68 * arrCollection.length < this.scroller.width) {
                layout.paddingLeft = (this.scroller.width - 68 * arrCollection.length) / 2;
            }
            this.lstBuyAward.layout = layout;
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = zj.GiftCommonAwardItem;
        };
        GiftTimeUC.prototype.onBtnGiftGo = function () {
            this.onBtnClose();
            zj.Game.PlayerGiftSystem.JumpToGiftById(this.info["index"], this.info["gift_index"]);
        };
        GiftTimeUC.prototype.onBtnGiftGet = function () {
            this.btnGiftGet.enabled = false;
            this.dealGet();
        };
        GiftTimeUC.prototype.onBtnGiftBuy = function () {
            this.btnGiftBuy.enabled = false;
            this.dealBuy();
        };
        GiftTimeUC.prototype.dealBuy = function () {
            var _this = this;
            this.thisBuy = true;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.giftInfo.pay_type == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(this.info["index"]).then(function (resp) {
                        _this.simulateCharge(resp, 0);
                    }).catch(function (err) {
                        _this.simulateCharge(null, err);
                    });
                }
                else {
                    var strIndex = this.info["index"];
                    if (this.info["pay_tbl"]) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
            }
            else if (this.giftInfo.pay_type == 2) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"]).then(function (gameInfo) {
                    _this.simulateCharge(gameInfo, 0);
                }).catch(function (err) {
                    _this.simulateCharge(null, err);
                });
            }
        };
        GiftTimeUC.prototype.dealGet = function () {
            var _this = this;
            zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                _this.simulateCharge(gameInfo, 0);
            }).catch(function (err) {
                _this.simulateCharge(null, err);
            });
        };
        GiftTimeUC.prototype.refreshInfo = function (ev) {
            var _this = this;
            if (!this.thisBuy) {
                return;
            }
            else {
                this.change = true;
            }
            this.btnGiftBuy.enabled = false;
            this.btnGiftGet.enabled = true;
            var msg = ev.data.body;
            if (msg.gameInfo.giftInfos.length > 0) {
                for (var _i = 0, _a = msg.gameInfo.giftInfos; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.index == this.info["index"]) {
                        this.info = zj.Table.DeepCopy(v);
                    }
                }
            }
            if (msg.gameInfo.getGoods.length > 0) {
                var adCb_1 = function () {
                    _this.btnGiftBuy.enabled = false;
                    _this.followUp(true);
                };
                var cb_1 = function () {
                    _this.btnGiftBuy.enabled = false;
                    _this.onBtnClose();
                };
                if (this.bActivity) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(msg.gameInfo.getGoods);
                        dialog.setCB(function () {
                            _this.onBtnClose();
                        });
                    });
                }
                else {
                    if (this.adverse) {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.show();
                            dialog.init(msg.gameInfo.getGoods);
                            dialog.setCB(adCb_1);
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.show();
                            dialog.init(msg.gameInfo.getGoods);
                            dialog.setCB(cb_1);
                        });
                    }
                }
            }
            else {
                this.followUp(false);
            }
        };
        GiftTimeUC.prototype.followUp = function (runAnimation) {
            if (runAnimation === void 0) { runAnimation = false; }
            if (this.adverse) {
                if (runAnimation) {
                    // ???
                    this.thisBuy = false;
                    this.setInfo(this.adverse, this.info, this.father);
                }
                else {
                    this.setInfo(this.adverse, this.info, this.father);
                }
            }
            else {
                this.setInfo(this.adverse, this.info, this.father);
            }
        };
        GiftTimeUC.prototype.loadPayProducts = function () {
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
                _this.groupMain.visible = true;
                _this.setInfoAward();
                _this.setInfoItem();
            });
        };
        GiftTimeUC.prototype.setCB2 = function (cb) {
            this.cb = cb;
        };
        GiftTimeUC.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftTimeUC.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return GiftTimeUC;
    }(zj.Scene));
    zj.GiftTimeUC = GiftTimeUC;
    __reflect(GiftTimeUC.prototype, "zj.GiftTimeUC");
})(zj || (zj = {}));
//# sourceMappingURL=GiftTimeUC.js.map