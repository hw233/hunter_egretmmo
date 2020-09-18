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
    // 20190402
    var GiftTime = (function (_super) {
        __extends(GiftTime, _super);
        function GiftTime() {
            var _this = _super.call(this) || this;
            _this.adverse = false;
            _this.father = null;
            _this.isActivity = false;
            _this.allBackToken = 0;
            _this.allProducts = [];
            _this.change = false;
            _this.thisBuy = false;
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
            _this.synGiftInfo = function () {
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    _this.checkGiftExit();
                });
            };
            _this.checkGiftExit = function () {
                zj.Game.PlayerGiftSystem.newGiftExist(_this.info["index"]).then(function () {
                    _this.requestButtonBuy();
                });
            };
            _this.skinName = "resource/skins/gift/GiftTimeSkin.exml";
            _this.btnGiftGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftGo, _this);
            _this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftGet, _this);
            _this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftBuy, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            }, _this);
            _this.loadPayProducts();
            return _this;
        }
        GiftTime.prototype.setInfo = function (adverse, info, father, isActivity) {
            if (isActivity === void 0) { isActivity = false; }
            // adverse 广告页，需要光效
            this.adverse = adverse;
            this.info = info;
            this.father = father;
            // 活动界面购买月卡活动
            this.isActivity = isActivity;
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.setInfoAward();
        };
        GiftTime.prototype.setInfoItem = function () {
            var _this = this;
            if (this.adverse) {
                this.groupAni.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0).then(function (display) {
                    _this.groupAni.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
            }
            // 通用
            var info = this.giftInfo;
            this.lbNameType.text = this.giftInfo.name_str;
            this.lbBuyAward.text = zj.TextsConfig.TextsConfig_Gift.first_get_award[info.pay_type];
            this.imgBuyTypeBoard.source = zj.cachekey(info.push_big_path, this);
            if (this.giftInfo.is_op == 0) {
                this.imgBuyType.visible = false;
            }
            if (info.pay_type == 3) {
                // 免费领取类型
                var firstDailyIndex = Number(info.daily_index);
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex + 1);
                var rewardKey = zj.Table.FindR(firstDailyTbl.goods_id, function (k, v) {
                    return v == _this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    var dayCount = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1 + this.allBackToken);
                }
                this.imgTypeTop.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type2[5], this);
                this.lbDayAward.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1);
                // this.lbDay.visible = false;
                // Button
                this.groupBuy.visible = false;
                if (this.adverse) {
                    // 广告页
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        // 第一天未领取
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        // 第一天未领取
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                }
                else {
                    // 通用界面
                    this.btnGiftGo.visible = false;
                    if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 0) {
                        // 第一天未领取
                        this.btnGiftGet.enabled = true;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        // 第一天未领取
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
                        this.lbGetNum.text = strMoney.toString();
                    }
                    else {
                        this.lbGetNum.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbGetNum.text = info.price.toString();
                    this.lbGetNum.visible = true;
                }
                this.groupBuy.visible = true;
                this.btnGiftGo.visible = false;
                this.btnGiftGet.visible = false;
                this.imgTypeTop.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type2[4], this);
                this.imgGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[info.pay_type - 1], this);
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // end time
                    var soldOut = zj.PlayerGiftSystem.UpToOpTime(this.info["trigger_time"] + info.duration - zj.Game.Controller.serverNow().valueOf() / 1000);
                    if (info.duration == 0) {
                        // 月卡类型不限制时间
                        this.imgTypeTop.visible = false;
                        //this.lbDay.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.get_after_buy, info.daily_num);
                    }
                    else {
                        //this.lbDay.text = soldOut;
                    }
                    this.btnGiftBuy.enabled = true;
                }
                else {
                    // 已购买
                    //this.lbDay.text = TextsConfig.TextsConfig_Gift.has_bought;
                    // 无操作
                    if (this.adverse) {
                        // 广告界面
                        this.groupBuy.visible = false;
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                    else {
                        // 弹出界面
                        this.btnGiftBuy.enabled = false;
                    }
                }
            }
        };
        GiftTime.prototype.setInfoAward = function () {
            var _this = this;
            var rewards = [];
            if (this.giftInfo.pay_type == 3) {
                // 免费类型
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
                // 付费类型
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
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = zj.GiftCommonAwardItem;
        };
        GiftTime.prototype.onBtnGiftGo = function () {
            zj.Game.PlayerGiftSystem.JumpToGiftById(this.info["index"], this.info["gift_index"]);
        };
        GiftTime.prototype.onBtnGiftGet = function () {
            var _this = this;
            this.btnGiftGet.enabled = false;
            zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                _this.simulateCharge(gameInfo, 0);
            }).catch(function (err) {
                _this.simulateCharge(null, err);
            });
        };
        GiftTime.prototype.onBtnGiftBuy = function () {
            this.btnGiftBuy.enabled = false;
            this.dealBuy();
        };
        GiftTime.prototype.dealBuy = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.pay_type == 1) {
                this.synGiftInfo();
            }
            else {
                this.requestButtonBuy();
            }
        };
        GiftTime.prototype.requestButtonBuy = function () {
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
        GiftTime.prototype.refreshInfo = function (ev) {
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
                        this.father.info = this.info;
                        break;
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
                    if (zj.CommonConfig.month_card_fit.indexOf(_this.info["gift_index"]) != -1 && _this.father.father != null) {
                        _this.father.father.type = 3;
                        var tbl = zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos);
                        for (var _i = 0, tbl_1 = tbl; _i < tbl_1.length; _i++) {
                            var v = tbl_1[_i];
                            var num = Number(v["gift_index"] + v["index"]);
                            if (zj.Tips.tips_oneday_get(num)) {
                                zj.Tips.tips_oneday_set(num, true);
                            }
                        }
                        _this.father.father.setInfoTypeList();
                    }
                    ;
                    var cbFather = function () {
                        if (_this.father.father == null)
                            return;
                        if (zj.CommonConfig.month_card_fit.indexOf(_this.info["gift_index"]) == -1 && _this.father.father != null) {
                            _this.father.father.setInfoItemList();
                        }
                    };
                    _this.father.cb = cbFather;
                    _this.father.onBtnClose();
                };
                if (this.isActivity) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(msg.gameInfo.getGoods);
                        dialog.setCB(function () {
                            _this.father.onBtnClose();
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
        GiftTime.prototype.followUp = function (runAnimation) {
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
        GiftTime.prototype.loadPayProducts = function () {
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
                _this.setInfoItem();
            });
        };
        return GiftTime;
    }(zj.UI));
    zj.GiftTime = GiftTime;
    __reflect(GiftTime.prototype, "zj.GiftTime");
})(zj || (zj = {}));
//# sourceMappingURL=GiftTime.js.map