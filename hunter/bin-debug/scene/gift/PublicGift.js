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
    // 神秘商店 HXH_PublicGift
    // lizhengqiang
    // 20190420
    var PublicGift = (function (_super) {
        __extends(PublicGift, _super);
        function PublicGift() {
            var _this = _super.call(this) || this;
            _this.canBuy = true;
            _this.allProducts = [];
            _this.giftInfo = null;
            _this.activityInfo = null;
            _this.giftInfos = [];
            _this.buyIndex = null;
            _this.followUp = function () {
                _this.freshList();
            };
            _this.skinName = "resource/skins/gift/PublicGiftSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.scroller.addEventListener(eui.UIEvent.CHANGE_END, _this.onScrollerEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, _this);
            return _this;
        }
        PublicGift.prototype.init = function () {
            var _this = this;
            this.loadPayProducts();
            this.groupNpc.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "mysticalstore", "armatureName", null, 0).then(function (display) {
                _this.groupNpc.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.setInfoAni();
            this.setActivityInfo();
            this.dealMallOpen();
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.dealMallOpen, this);
            this.timer.start();
        };
        PublicGift.prototype.setInfoAni = function () {
            var _this = this;
            this.groupLight1.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "001_deng_zuo", 0).then(function (display) {
                _this.groupLight1.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupLight2.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "000_deng_you", 0).then(function (display) {
                _this.groupLight2.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupStar1.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "002_xingxing_zuo", 0).then(function (display) {
                _this.groupStar1.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupStar2.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "003_xingxing_you", 0).then(function (display) {
                _this.groupStar2.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupSelectLeft.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(function (display) {
                _this.groupSelectLeft.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupSelectRight.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(function (display) {
                _this.groupSelectRight.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        PublicGift.prototype.setActivityInfo = function () {
            this.activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
            })[0];
            if (this.activityInfo == null)
                return;
            var time1 = zj.Helper.GetTMStrForActivity(this.activityInfo.openTime);
            var time2 = zj.Helper.GetTMStrForActivity(this.activityInfo.closeTime);
            var timeStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.wishing_tree_time, time1, time2);
            this.lbTime.text = timeStr;
        };
        PublicGift.prototype.dealMallOpen = function () {
            if (this.activityInfo == null || (!((this.activityInfo.openTime < zj.Game.Controller.curServerTime) && (zj.Game.Controller.curServerTime <= this.activityInfo.closeTime)))) {
                this.canBuy = false;
            }
        };
        PublicGift.prototype.setInfoList = function () {
            this.giftInfos = zj.otherdb.GetSecretMallInfo();
            this.arrCollection = new eui.ArrayCollection();
            for (var k in this.giftInfos) {
                this.arrCollection.addItem({ index: Number(k) + 1, info: this.giftInfos[k], father: this });
            }
            this.lstAddGift.dataProvider = this.arrCollection;
            this.lstAddGift.itemRenderer = zj.PublicGiftItem;
        };
        PublicGift.prototype.freshList = function () {
            var newGiftInfos = zj.otherdb.GetSecretMallInfo();
            if (newGiftInfos.length == 0 || newGiftInfos.length != this.giftInfos.length) {
                this.setInfoList();
            }
            else {
                var refreshAll = false;
                for (var i = 0; i < newGiftInfos.length; i++) {
                    if (i != this.buyIndex - 1 && newGiftInfos[i]["tribute_id"] != this.giftInfos[i]["tribute_id"]) {
                        refreshAll = true;
                        break;
                    }
                }
                if (refreshAll) {
                    this.setInfoList();
                }
                else {
                    this.giftInfos = newGiftInfos;
                    this.arrCollection.replaceItemAt({ index: this.buyIndex, info: newGiftInfos[this.buyIndex - 1], father: this }, this.buyIndex - 1);
                }
            }
        };
        PublicGift.prototype.refreshInfo = function (ev) {
            var _this = this;
            var msg = ev.data.body;
            if (msg.gameInfo.getGoods.length > 0) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(_this.followUp);
                });
            }
        };
        PublicGift.prototype.loadPayProducts = function () {
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
                _this.setInfoList();
            });
        };
        PublicGift.prototype.reqActivity = function (index) {
            var _this = this;
            if (!this.canBuy) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Activity.Rank_Charge.over));
                return;
            }
            this.buyIndex = index;
            zj.Game.PlayerActivitySystem.queryActivitys(message.ActivityType.ACT_TYPE_NONO).then(function (activities) {
                _this.activityInfo = zj.Table.FindR(activities, function (k, v) {
                    return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
                })[0];
                if (_this.activityInfo == null || !((_this.activityInfo.openTime < zj.Game.Controller.curServerTime) && (zj.Game.Controller.curServerTime <= _this.activityInfo.closeTime))) {
                    var curActivityIndex = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                        return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
                    })[1];
                    if (curActivityIndex != null) {
                        zj.Game.PlayerActivitySystem.Activities.splice(curActivityIndex, 1);
                    }
                    _this.canBuy = false;
                }
                if (!_this.canBuy) {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Activity.Rank_Charge.over));
                }
                else {
                    _this.reqButtonBuy();
                }
            });
        };
        PublicGift.prototype.reqButtonBuy = function () {
            var _this = this;
            var index = this.buyIndex - 1;
            if (this.giftInfos[index]["buy_type"] == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(this.giftInfos[index]["reference"], this.activityInfo.daysIndex, this.activityInfo.index).then(function (gameInfo) {
                        if (gameInfo.getGoods.length > 0) {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.show();
                                dialog.init(gameInfo.getGoods);
                                dialog.setCB(_this.followUp);
                            });
                        }
                    });
                }
                else {
                    var strIndex = this.giftInfos[index]["reference"];
                    zj.platform.pay(zj.PlayerPaySystem.GetProductId(this.giftInfos[index]["pay_index"], this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex, this.activityInfo.daysIndex, this.activityInfo.index));
                }
            }
            else if (this.giftInfos[index]["buy_type"] == 2) {
                zj.Game.PlayerGiftSystem.secretMallBuy(this.activityInfo.index, this.activityInfo.daysIndex, this.giftInfos[index]["reference"]).then(function (gameInfo) {
                    if (gameInfo.getGoods.length > 0) {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(_this.followUp);
                        });
                    }
                });
            }
        };
        PublicGift.prototype.onScrollerEnd = function () {
            if (this.lstAddGift.scrollH == 0) {
                this.groupSelectLeft.visible = false;
                this.groupSelectRight.visible = true;
            }
            else if (this.lstAddGift.scrollH + this.scroller.width >= this.lstAddGift.contentWidth) {
                this.groupSelectLeft.visible = true;
                this.groupSelectRight.visible = false;
            }
            else {
                this.groupSelectLeft.visible = true;
                this.groupSelectRight.visible = true;
            }
        };
        PublicGift.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        PublicGift.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        PublicGift.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return PublicGift;
    }(zj.Scene));
    zj.PublicGift = PublicGift;
    __reflect(PublicGift.prototype, "zj.PublicGift");
})(zj || (zj = {}));
//# sourceMappingURL=PublicGift.js.map