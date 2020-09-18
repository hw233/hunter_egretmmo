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
    // 礼包 Activity_TimeGiftFirstPopC
    // hexiaowei
    // 2018-12-06
    var GiftFirstPopC = (function (_super) {
        __extends(GiftFirstPopC, _super);
        function GiftFirstPopC() {
            var _this = _super.call(this) || this;
            _this.TOKEN = 20002;
            _this.skinName = "resource/skins/gift/GiftFirstPopCSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGet_2, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTheTip); // 因为是循环播放，需要特别处理
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        // 初始化礼包
        GiftFirstPopC.prototype.setInfo = function (info, father, tavernShow) {
            if (tavernShow === void 0) { tavernShow = false; }
            this.imageEight.visible = false;
            this.info = info;
            this.father = father;
            this.change = false;
            this.buy = false;
            this.tavernShow = tavernShow;
            if (this.father != null && !this.tavernShow) {
                this.father.openDown();
            }
            this.req();
            this.setInfoItem();
            this.setInfoUpdate();
            this.setInfoList();
            //点击任意区域关闭
            egret.Tween.get(this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        // 更新礼包的可购买次数
        GiftFirstPopC.prototype.setInfoUpdate = function () {
            var gift_info = zj.PlayerGiftSystem.Instance_item(this.info.gift_index);
            this.buttonGet_2.enabled = (this.info["buy_times"] < gift_info.buy_times);
            // 限购一次
            if (gift_info.buy_times == 1) {
                this.imageLimit.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type3[1], this);
            }
            else if (gift_info.buy_times > 100) {
                this.imageLimit.visible = false;
            }
            else {
                this.imageLimit.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type3[2], this);
            }
            var str = "";
            // gift_info.gift_form => 1.限时限次2.每日限购3.无需购买-触发每日领取4.每周限购5.购买后每日领取6.买后按等级领取
            if (gift_info.gift_form == 1) {
                var get_str = null;
                //限时限购 时间永久
                var cur_str = "";
                if (gift_info.buy_times > this.info.buy_times) {
                    cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                }
                else {
                    cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                    this.buttonGet_2.enabled = false;
                }
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[1], cur_str);
            }
            else if (gift_info.gift_form == 2) {
                if (gift_info.buy_times < 100) {
                    var cur_str = "";
                    if (gift_info.buy_times > this.info.buy_times) {
                        cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                    }
                    else {
                        cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                    }
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[2], cur_str);
                }
                else {
                    str = zj.TextsConfig.TextsConfig_Gift.gift.popc[5];
                }
            }
            else if (gift_info.gift_form == 4) {
                if (gift_info.buy_times < 100) {
                    var cur_str = "";
                    if (gift_info.buy_times > this.info.buy_times) {
                        cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                    }
                    else {
                        cur_str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                    }
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.popc[4], cur_str);
                }
                else {
                    str = zj.TextsConfig.TextsConfig_Gift.gift.popc[5];
                }
            }
            this.labelCanBuy.textFlow = zj.Util.RichText(str);
        };
        // 赋值
        GiftFirstPopC.prototype.setInfoItem = function () {
            // tip
            var tip_index = Number(this.info.gift_index + this.info.index);
            if (zj.Tips.tips_oneday_get(tip_index)) {
                zj.Tips.tips_oneday_set(tip_index, true);
                this.change = true;
            }
            var gift_info = zj.PlayerGiftSystem.Instance_item(this.info.gift_index);
            if (this.info.mark == 0) {
                this.labelTipname.text = gift_info.name;
            }
            else {
                this.labelTipname.text = gift_info.name + zj.PlayerHunterSystem.Table(this.info.mark).general_name;
            }
            this.imageInfolcon.source = zj.cachekey(gift_info.path, this);
            if (gift_info.pay_type == 1 && this.info.pay_tbl != null && this.info.pay_tbl != undefined) {
                var str_money = this.info.pay_tbl["amount"];
                this.labelValue_2.text = str_money;
                this.imageIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[0], this);
            }
            else {
                this.labelValue_2.text = (gift_info.price).toString();
                this.imageIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[1], this);
            }
            // 元宝付费类型 折扣
            if (gift_info.pay_type == 2 && (gift_info.price != gift_info.primer)) {
                this.imageEight.visible = true;
            }
        };
        //赋值
        GiftFirstPopC.prototype.setInfoList = function () {
            var gift_info = zj.PlayerGiftSystem.Instance_item(this.info.gift_index);
            var reward_list = [];
            for (var k in gift_info.goods_id) {
                if (gift_info.goods_id.hasOwnProperty(k)) {
                    var v = gift_info.goods_id[k];
                    var good_1 = new message.GoodsInfo();
                    good_1.goodsId = v;
                    if (v == this.TOKEN) {
                        good_1.count = gift_info.goods_count[k] + gift_info.raw_token;
                    }
                    else {
                        good_1.count = gift_info.goods_count[k];
                    }
                    reward_list.push(good_1);
                }
            }
            var good = new message.GoodsInfo();
            good.goodsId = 20002;
            good.count = gift_info.raw_token;
            var find_token = zj.Table.FindF(reward_list, function (_k, _v) {
                return _v.goodsId == 20002;
            });
            if (!find_token && good.count != 0) {
                reward_list.splice(0, 0, good);
            }
            var arrayCollection = new eui.ArrayCollection();
            for (var _i = 0, reward_list_1 = reward_list; _i < reward_list_1.length; _i++) {
                var v = reward_list_1[_i];
                arrayCollection.addItem(v);
            }
            this.listItem.dataProvider = arrayCollection;
            this.listItem.itemRenderer = zj.GiftCommonAwardItem;
        };
        GiftFirstPopC.prototype.req = function () {
            var _this = this;
            zj.Game.PlayerGiftSystem.getNewGift().then(function (gameInfo) {
                if (gameInfo.giftInfos.length > 0) {
                    var pay_tbl = _this.info["pay_tbl"];
                    var currentInfo = zj.Table.FindR(gameInfo.giftInfos, function (k, v) {
                        return v.index == _this.info["index"];
                    });
                    if (currentInfo[1] != null) {
                        _this.info = currentInfo[0];
                    }
                    _this.info["pay_tbl"] = pay_tbl;
                    _this.setInfoUpdate();
                }
            });
        };
        ;
        //购买礼包
        GiftFirstPopC.prototype.onButtonGet_2 = function () {
            var _this = this;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.pay_type == 1) {
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    zj.Game.PlayerGiftSystem.newGiftExist(_this.info["index"]).then(function () {
                        _this.reqButtonBuy();
                    });
                });
            }
            else {
                this.reqButtonBuy();
            }
        };
        //购买礼包方式（目前就一种测试的）
        GiftFirstPopC.prototype.reqButtonBuy = function () {
            var _this = this;
            this.buttonGet_2.enabled = false;
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
                    if (this.info["pay_tbl"]) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(gift_info.pay_index), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
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
        GiftFirstPopC.prototype.simulateCharge = function (gameInfo, result) {
            var _this = this;
            this.buttonGet_2.enabled = true;
            if (result == message.EC.SUCCESS) {
                if (gameInfo.giftInfos.length > 0) {
                    for (var _i = 0, _a = gameInfo.giftInfos; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.index == this.info["index"]) {
                            zj.Game.PlayerGiftSystem.giftInfos = gameInfo.giftInfos;
                            var pay_tbl = this.info["pay_tbl"];
                            this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                                return v.index == _this.info["index"];
                            })[0];
                            this.info["pay_tbl"] = pay_tbl;
                            if (this.info["buy_times"] == 0) {
                                this.change = true;
                            }
                        }
                    }
                }
                var bExit = zj.Table.FindF(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.index == _this.info["index"];
                });
                if (!bExit) {
                    var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
                    this.info["buy_times"] = giftInfo.buy_times;
                }
                if (gameInfo.getGoods.length > 0) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(gameInfo.getGoods);
                        dialog.setCB(function () {
                            _this.followUp();
                        });
                    });
                }
            }
            else if (result == message.EC.XG_LACK_TOKEN) {
                zj.loadUI(zj.ConfirmCancelDialog)
                    .then(function (dialog) {
                    dialog.setInfo(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Money.demstone));
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.setCB(function () {
                        setTimeout(function () {
                            zj.loadUI(zj.PayMallScene)
                                .then(function (scene) {
                                scene.show(zj.UI.SHOW_FROM_TOP);
                                scene.init();
                            });
                        }, 500);
                    });
                });
            }
            else {
                this.buttonGet_2.enabled = true;
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
            }
        };
        //更新页面
        GiftFirstPopC.prototype.followUp = function () {
            var _this = this;
            var gift_info = zj.PlayerGiftSystem.Instance_item(this.info.gift_index);
            if (this.info.buy_times == gift_info.buy_times) {
                var cb = function () {
                    _this.setInfoUpdate();
                    if (_this.father != null && _this.tavernShow != true) {
                        _this.father.updateItemList();
                    }
                    else if (_this.tavernShow) {
                        _this.father.setUI();
                    }
                };
                cb();
            }
            else {
                this.setInfoUpdate();
                if (this.tavernShow) {
                    this.father.setUI();
                }
            }
        };
        GiftFirstPopC.prototype.refreshInfo = function (ev) {
            var _this = this;
            this.buy = true;
            this.buttonGet_2.enabled = true;
            var msg = ev.data.body;
            if (msg.gameInfo.giftInfos.length > 0) {
                for (var _i = 0, _a = msg.gameInfo.giftInfos; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.index == this.info["index"]) {
                        zj.Game.PlayerGiftSystem.giftInfos = msg.gameInfo.giftInfos;
                        var pay_tbl = this.info["pay_tbl"];
                        this.info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                            return v.index == _this.info["index"];
                        })[0];
                        this.info["pay_tbl"] = pay_tbl;
                        if (this.info["buy_times"] == 0) {
                            this.change = true;
                        }
                    }
                }
            }
            var bExit = zj.Table.FindF(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.index == _this.info["index"];
            });
            if (!bExit) {
                var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
                this.info["buy_times"] = giftInfo.buy_times;
            }
            if (msg.gameInfo.getGoods.length > 0) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(function () {
                        _this.followUp();
                    });
                });
            }
            else {
                this.followUp();
            }
        };
        GiftFirstPopC.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftFirstPopC.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        // 关闭页面
        GiftFirstPopC.prototype.onButtonClose = function () {
            if (this.father) {
                if (this.father.setUI)
                    this.father.setUI();
                if (this.father.updateItemList)
                    this.father.updateItemList();
                if (this.father.closeUp)
                    this.father.closeUp();
            }
            zj.Game.EventManager.event(zj.GameEvent.ON_ABOVE_POP);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return GiftFirstPopC;
    }(zj.Dialog));
    zj.GiftFirstPopC = GiftFirstPopC;
    __reflect(GiftFirstPopC.prototype, "zj.GiftFirstPopC");
})(zj || (zj = {}));
//# sourceMappingURL=GiftFirstPopC.js.map