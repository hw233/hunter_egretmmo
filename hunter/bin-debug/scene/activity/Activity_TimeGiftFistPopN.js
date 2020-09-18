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
    // 人偶礼包 Activity_TimeGiftFistPopN
    // lizhengqiang
    // 20190429
    var Activity_TimeGiftFistPopN = (function (_super) {
        __extends(Activity_TimeGiftFistPopN, _super);
        function Activity_TimeGiftFistPopN() {
            var _this = _super.call(this) || this;
            _this.allProducts = [];
            _this.cb = null;
            _this.info = null;
            _this.buy = null;
            _this.payTbl = null;
            _this.TOKEN = 20002;
            _this.followUp = function () {
                _this.setInfoUpdate();
            };
            _this.onBtnClose = function () {
                _this.close(zj.UI.HIDE_TO_TOP);
            };
            _this.skinName = "resource/skins/activity/Activity_TimeGiftFistPopNSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.btnGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet_2, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                if (_this.timer) {
                    _this.timer.stop();
                    _this.timer = null;
                }
            }, _this);
            return _this;
        }
        Activity_TimeGiftFistPopN.prototype.loadPayProducts = function () {
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
                    if (itemA.sort_index == itemB.sort_index) {
                        return b.amount - a.amount;
                    }
                    else {
                        return itemA.sort_index - itemB.sort_index;
                    }
                });
                _this.setInfoItem();
            });
        };
        Activity_TimeGiftFistPopN.prototype.setInfo = function (giftIndex, cb) {
            this.loadPayProducts();
            this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.index == giftIndex;
            })[0];
            this.cb = cb;
            this.buy = false;
            this.setInfoUpdate();
            this.setInfoList();
            this.setInfoTime();
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoTime, this);
            this.timer.start();
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
        };
        Activity_TimeGiftFistPopN.prototype.setInfoTime = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.duration != 0 && giftInfo.duration != null) {
                var lastTime = this.info["trigger_time"] + giftInfo.duration - zj.Game.Controller.curServerTime;
                lastTime = lastTime >= 0 ? lastTime : 0;
                var timeStr = zj.TextsConfig.TextsConfig_Hunter_NewGift.last_time + zj.Helper.FormatDaysTimeCh(lastTime);
                this.lbCanBuy.text = timeStr;
            }
            else {
                this.lbCanBuy.visible = false;
            }
        };
        Activity_TimeGiftFistPopN.prototype.setInfoUpdate = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.btnGet_2.enabled = this.info["buy_times"] < giftInfo.buy_times;
            var str = "";
            if (giftInfo.gift_form == 1) {
                var getStr = "";
                // 限时限购 时间永久
                var curStr = "";
                if (giftInfo.buy_times > this.info["buy_times"]) {
                    curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                }
                else {
                    curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                }
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[1], curStr);
            }
            else if (giftInfo.gift_form == 2) {
                if (giftInfo.buy_times < 100) {
                    var curStr = "";
                    if (giftInfo.buy_times > this.info["buy_times"]) {
                        curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                    }
                    else {
                        curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                    }
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[2], curStr);
                }
                else {
                    str = zj.TextsConfig.TextsConfig_Gift.gift.popc[5];
                }
            }
            else if (giftInfo.gift_form == 4) {
                if (giftInfo.buy_times < 100) {
                    var curStr = "";
                    if (giftInfo.buy_times > this.info["buy_times"]) {
                        curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                    }
                    else {
                        curStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                    }
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[4], curStr);
                }
                else {
                    str = zj.TextsConfig.TextsConfig_Gift.gift.popc[5];
                }
            }
            this.lbSurplusTimes.textFlow = zj.Util.RichText(str);
        };
        Activity_TimeGiftFistPopN.prototype.setInfoItem = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.payTbl = {};
            if (giftInfo.pay_type == 1 && this.payTbl != null) {
                var payIndex = zj.TablePayIndex.Item(giftInfo.pay_index);
                for (var _i = 0, _a = this.allProducts; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.coin == payIndex.raw_token) {
                        this.payTbl = zj.Table.DeepCopy(v);
                        break;
                    }
                }
                if (Object.keys(this.payTbl).length > 0) {
                    var strUnit = zj.Set.CashUnit(this.payTbl["currency"]);
                    var strMoney = this.payTbl["amount"];
                    this.lbValue_2.text = strMoney;
                    this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[1 - 1], this);
                    this.lbValue_1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.yuan, strMoney);
                }
                else {
                    this.lbValue_2.text = ""; // TextsConfig.TextsConfig_Gift.no_point;
                }
            }
            else {
                this.lbValue_2.text = giftInfo.price.toString();
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[2 - 1], this);
                this.lbValue_1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.zuan, giftInfo.price);
            }
        };
        Activity_TimeGiftFistPopN.prototype.refreshInfo = function (ev) {
            var _this = this;
            this.buy = true;
            this.btnGet_2.enabled = true;
            var msg = ev.data.body;
            if (msg.gameInfo.giftInfos.length > 0) {
                for (var _i = 0, _a = msg.gameInfo.giftInfos; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.index == this.info["index"]) {
                        setTimeout(function () {
                            var payTbl = _this.payTbl;
                            _this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                                return v.index == _this.info["index"];
                            })[0];
                            _this.payTbl = payTbl;
                        }, 500);
                    }
                }
            }
            if (msg.gameInfo.getGoods.length > 0) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(_this.followUp);
                });
            }
            else {
                this.followUp();
            }
        };
        Activity_TimeGiftFistPopN.prototype.setInfoList = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            var rewardList = [];
            for (var i = 0; i < giftInfo.goods_id.length; i++) {
                var good_1 = new message.GoodsInfo();
                good_1.goodsId = giftInfo.goods_id[i];
                if (giftInfo.goods_id[i] == this.TOKEN) {
                    good_1.count = giftInfo.goods_count[i] + giftInfo.raw_token;
                }
                else {
                    good_1.count = giftInfo.goods_count[i];
                }
                rewardList.push(good_1);
            }
            var good = new message.GoodsInfo();
            good.goodsId = 20002;
            good.count = giftInfo.raw_token;
            var findToken = zj.Table.FindF(rewardList, function (k, v) {
                return v.goodsId == 20002;
            });
            if (!findToken && good.count != 0) {
                rewardList.splice(0, 0, good);
            }
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, rewardList_1 = rewardList; _i < rewardList_1.length; _i++) {
                var v = rewardList_1[_i];
                arrCollection.addItem(v);
            }
            var layout = new eui.HorizontalLayout();
            layout.verticalAlign = "middle";
            layout.horizontalAlign = "center";
            if (68 * arrCollection.length < this.scroller.width) {
                layout.paddingLeft = (this.scroller.width - 68 * arrCollection.length) / 2;
            }
            this.lstTableViewList.layout = layout;
            this.lstTableViewList.dataProvider = arrCollection;
            this.lstTableViewList.itemRenderer = zj.GiftCommonAwardItem;
        };
        Activity_TimeGiftFistPopN.prototype.onBtnGet_2 = function () {
            this.reqButtonBuy();
        };
        Activity_TimeGiftFistPopN.prototype.reqButtonBuy = function () {
            var _this = this;
            this.btnGet_2.enabled = false;
            var gift_info = zj.PlayerGiftSystem.Instance_item(this.info.gift_index);
            if (gift_info.pay_type == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(this.info["index"]).then(function (gameInfo) {
                        _this.simulateCharge(gameInfo, 0);
                    }).catch(function (err) {
                        _this.simulateCharge(null, err);
                    });
                }
                else {
                    var strIndex = this.info["index"];
                    if (this.payTbl) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(gift_info.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
            }
            else {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                    _this.simulateCharge(gameInfo, 0);
                }).catch(function (err) {
                    _this.simulateCharge(null, err);
                });
            }
        };
        Activity_TimeGiftFistPopN.prototype.simulateCharge = function (gameInfo, result) {
            var _this = this;
            this.btnGet_2.enabled = true;
            if (result == message.EC.SUCCESS) {
                this.buy = true;
                if (gameInfo.giftInfos.length > 0) {
                    for (var _i = 0, _a = gameInfo.giftInfos; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.index == this.info["index"]) {
                            var payTbl = this.info["pay_tbl"];
                            this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                                return v.index == _this.info["index"];
                            })[0];
                            this.payTbl = payTbl;
                        }
                    }
                }
            }
            else {
                this.btnGet_2.enabled = true;
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
            }
        };
        Activity_TimeGiftFistPopN.prototype.onClickClose = function (e) {
            var global = this.groupMain.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose();
            }
        };
        Activity_TimeGiftFistPopN.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        Activity_TimeGiftFistPopN.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Activity_TimeGiftFistPopN;
    }(zj.Scene));
    zj.Activity_TimeGiftFistPopN = Activity_TimeGiftFistPopN;
    __reflect(Activity_TimeGiftFistPopN.prototype, "zj.Activity_TimeGiftFistPopN");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_TimeGiftFistPopN.js.map