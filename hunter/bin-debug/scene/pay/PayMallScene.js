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
    // 商城
    // lizhengqiang
    // 20190326
    var PayMallScene = (function (_super) {
        __extends(PayMallScene, _super);
        function PayMallScene() {
            var _this = _super.call(this) || this;
            _this.typeIndex = 0;
            _this.type = zj.TableEnum.Enum.HXHChargeType.Charge;
            _this.allProducts = [];
            _this.confirmCB = null;
            _this.index = null;
            _this.updateItemList = function () {
                if (_this.allProducts.length == 0)
                    return;
                var arrCollectionItem = new eui.ArrayCollection();
                if (_this.type == zj.TableEnum.Enum.HXHChargeType.Charge) {
                    var giftList = zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos);
                    var tbl = [];
                    for (var _i = 0, giftList_1 = giftList; _i < giftList_1.length; _i++) {
                        var v = giftList_1[_i];
                        if (v.gift_index == 100203 || v.gift_index == 100204)
                            continue;
                        tbl.push(v);
                    }
                    for (var _a = 0, _b = _this.allProducts; _a < _b.length; _a++) {
                        var v = _b[_a];
                        tbl.push(v);
                    }
                    for (var _c = 0, tbl_1 = tbl; _c < tbl_1.length; _c++) {
                        var v = tbl_1[_c];
                        arrCollectionItem.addItem({ "info": v, "type": _this.type, "allProducts": _this.allProducts, "father": _this });
                    }
                }
                else if (_this.type == zj.TableEnum.Enum.HXHChargeType.Gift) {
                    var giftList = zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos);
                    for (var _d = 0, giftList_2 = giftList; _d < giftList_2.length; _d++) {
                        var v = giftList_2[_d];
                        if (v.gift_index == 100203 ||
                            v.gift_index == 100204 ||
                            v.gift_index == 100302 ||
                            v.gift_index == 100303 ||
                            v.gift_index == 101507 ||
                            v.gift_index == 100211)
                            continue;
                        arrCollectionItem.addItem({ "info": v, "type": _this.type, "allProducts": _this.allProducts, "father": _this });
                    }
                }
                else if (_this.type == zj.TableEnum.Enum.HXHChargeType.First) {
                    // "HXH_FirstChargeMain"
                    zj.loadUI(zj.HXH_FirstChargeMainNew)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
                else if (_this.type == zj.TableEnum.Enum.HXHChargeType.Op) {
                    var giftList = zj.PlayerGiftSystem.SortOp(zj.Game.PlayerGiftSystem.giftInfos);
                    for (var _e = 0, giftList_3 = giftList; _e < giftList_3.length; _e++) {
                        var v = giftList_3[_e];
                        arrCollectionItem.addItem({ "info": v, "type": _this.type, "allProducts": _this.allProducts, "father": _this });
                    }
                }
                if (arrCollectionItem.source.length == 0)
                    return;
                _this.arrCollectionItem.replaceAll(arrCollectionItem.source);
            };
            _this.openDown = function () {
                egret.Tween.get(_this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
            };
            _this.closeUp = function () {
                egret.Tween.get(_this.groupMain).to({ scaleX: 1, scaleY: 1 }, 200);
            };
            _this.skinName = "resource/skins/pay/PayMallSceneSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPay, _this);
            _this.lstViewType.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedType, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfoLowVip, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.tween)
                    _this.tween.stop();
                if (_this.timer)
                    _this.timer.stop();
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfoLowVip, _this);
            }, null);
            return _this;
        }
        PayMallScene.prototype.init = function (isBackground) {
            var _this = this;
            if (isBackground === void 0) { isBackground = false; }
            if (zj.Util.isDisabledPay()) {
                this.close();
            }
            this.imgBackground.visible = isBackground;
            this.groupBgAni.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(function (display) {
                _this.groupBgAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.tween.items[0].props = { loop: true };
            this.tween.play();
            this.rectMask = zj.Util.getMaskImgBlack(this.imgExp.width, this.imgExp.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoRes, this);
            this.timer.start();
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_title_texiao, this);
            this.imgTips6.visible = false;
            this.imgPay.visible = false;
            this.loadPayProducts();
            this.setInfoLowVip();
            this.setInfoRes();
            if (zj.Device.isReviewSwitch) {
                this.btnPay.visible = false;
                this.groupTitle.visible = false;
                this.btnRecharge.visible = true;
                this.groupInfo.visible = false;
                this.scrollViewType.visible = false;
            }
            else {
                this.btnRecharge.visible = false;
            }
        };
        PayMallScene.prototype.isFullScreen = function () {
            return this.imgBackground.visible;
        };
        PayMallScene.prototype.loadFrom = function (type, index) {
            var _this = this;
            if (zj.Util.isDisabledPay()) {
                this.close();
            }
            this.groupBgAni.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(function (display) {
                _this.groupBgAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.tween.items[0].props = { loop: true };
            this.tween.play();
            this.rectMask = zj.Util.getMaskImgBlack(341, 25);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoRes, this);
            this.timer.start();
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_title_texiao, this);
            this.imgTips6.visible = false;
            this.imgPay.visible = false;
            if (type) {
                this.type = type;
            }
            this.index = index;
            this.loadPayProducts();
            this.setInfoLowVip();
            this.setInfoRes();
        };
        PayMallScene.prototype.setInfoRes = function () {
            this.lbToken.text = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        };
        PayMallScene.prototype.setInfoLowVip = function () {
            var MAX = 12;
            var tbl = zj.TableVipinfo.Table();
            var levelCur = zj.Game.PlayerInfoSystem.VipLevel;
            // 当前星耀等级名称
            this.imgVip.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[levelCur], this);
            if (levelCur != MAX) {
                this.imgVipNext.visible = true;
                // 下一星耀等级名称
                this.imgVipNext.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[levelCur + 1], this);
                // 需要充值
                this.lbNeed.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[levelCur + 1].sum - zj.Game.PlayerInfoSystem.BaseInfo.vipExp) / 10);
            }
            else {
                this.imgVipNext.visible = false;
                this.lbNeed.text = zj.TextsConfig.TextsConfig_Common.expMax;
            }
            // 进度条
            var percent = 0;
            if (levelCur != MAX) {
                percent = (zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / (tbl[levelCur].charge + tbl[levelCur].sum);
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + (tbl[levelCur].charge + tbl[levelCur].sum) / 10).toString();
            }
            else {
                percent = (zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / tbl[levelCur].sum;
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + tbl[levelCur].sum / 10).toString();
                ;
            }
            if (percent > 1) {
                percent = 1;
            }
            else if (percent <= 0) {
                percent = 0;
            }
            this.rectMask.visible = true;
            this.rectMask.width = 341 * percent;
            this.imgExp.mask = this.rectMask;
            this.updateItemList();
        };
        PayMallScene.prototype.setInfoTypeList = function () {
            var showType = [];
            showType.push(zj.TableEnum.Enum.HXHChargeType.Charge);
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var info = zj.PlayerGiftSystem.Instance_item(v.gift_index);
                if (info.is_op == 1) {
                    showType.push(zj.TableEnum.Enum.HXHChargeType.Op);
                    break;
                }
            }
            for (var _b = 0, _c = zj.Game.PlayerGiftSystem.giftInfos; _b < _c.length; _b++) {
                var v = _c[_b];
                var info = zj.PlayerGiftSystem.Instance_item(v.gift_index);
                if (info.is_op == 0) {
                    // 新手礼包购买后才显示
                    if (info.gift_form == 5 && info.tips[0] != 0) {
                        if (v.buy_times >= 1 && zj.CommonConfig.month_card_fit.indexOf(v.gift_index) == -1) {
                            showType.push(zj.TableEnum.Enum.HXHChargeType.Gift);
                            break;
                        }
                    }
                    else {
                        showType.push(zj.TableEnum.Enum.HXHChargeType.Gift);
                        break;
                    }
                }
            }
            this.arrCollectionType = new eui.ArrayCollection();
            for (var _d = 0, showType_1 = showType; _d < showType_1.length; _d++) {
                var v = showType_1[_d];
                this.arrCollectionType.addItem({ index: v, father: this });
            }
            this.lstViewType.dataProvider = this.arrCollectionType;
            this.lstViewType.itemRenderer = zj.PayMallType;
            this.typeIndex = showType.indexOf(this.type) != -1 ? showType.indexOf(this.type) : 0;
            this.lstViewType.selectedIndex = this.typeIndex;
            this.setInfoItemList();
        };
        PayMallScene.prototype.onLstSelectedType = function (e) {
            if (this.typeIndex != this.lstViewType.selectedIndex) {
                this.arrCollectionType.itemUpdated(this.arrCollectionType.source[this.typeIndex]);
                this.arrCollectionType.itemUpdated(this.arrCollectionType.source[this.lstViewType.selectedIndex]);
                this.typeIndex = this.lstViewType.selectedIndex;
                this.type = this.lstViewType.selectedItem.index;
                this.setInfoItemList();
            }
        };
        PayMallScene.prototype.setInfoItemList = function () {
            if (this.type == zj.TableEnum.Enum.HXHChargeType.Charge) {
                var giftList = zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos);
                var tbl = [];
                for (var _i = 0, giftList_4 = giftList; _i < giftList_4.length; _i++) {
                    var v = giftList_4[_i];
                    if (v.gift_index == 100203 || v.gift_index == 100204)
                        continue;
                    tbl.push(v);
                }
                for (var _a = 0, _b = this.allProducts; _a < _b.length; _a++) {
                    var v = _b[_a];
                    tbl.push(v);
                }
                this.arrCollectionItem = new eui.ArrayCollection();
                for (var _c = 0, tbl_2 = tbl; _c < tbl_2.length; _c++) {
                    var v = tbl_2[_c];
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            }
            else if (this.type == zj.TableEnum.Enum.HXHChargeType.Gift) {
                var giftList = zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos);
                this.arrCollectionItem = new eui.ArrayCollection();
                for (var _d = 0, giftList_5 = giftList; _d < giftList_5.length; _d++) {
                    var v = giftList_5[_d];
                    if (v.gift_index == 100203 ||
                        v.gift_index == 100204 ||
                        v.gift_index == 100302 ||
                        v.gift_index == 100303 ||
                        v.gift_index == 101507 ||
                        v.gift_index == 100211)
                        continue;
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            }
            else if (this.type == zj.TableEnum.Enum.HXHChargeType.First) {
                // "HXH_FirstChargeMain"
                zj.loadUI(zj.HXH_FirstChargeMainNew)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                });
            }
            else if (this.type == zj.TableEnum.Enum.HXHChargeType.Op) {
                var giftList = zj.PlayerGiftSystem.SortOp(zj.Game.PlayerGiftSystem.giftInfos);
                this.arrCollectionItem = new eui.ArrayCollection();
                for (var _e = 0, giftList_6 = giftList; _e < giftList_6.length; _e++) {
                    var v = giftList_6[_e];
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            }
            if (this.arrCollectionItem.source.length == 0)
                return;
            this.lstViewItem.dataProvider = this.arrCollectionItem;
            this.lstViewItem.itemRenderer = zj.PayMallItem;
            // this.lstViewItem.useVirtualLayout = false;
            if (this.index)
                this.popItem(this.index);
        };
        PayMallScene.prototype.popItem = function (index) {
            var _this = this;
            this.index = null;
            if (index == null || index == undefined)
                return;
            setTimeout(function () {
                var popIndex;
                for (var k in _this.arrCollectionItem.source) {
                    var v = _this.arrCollectionItem.source[k];
                    if (v.info.index == index) {
                        popIndex = Number(k);
                        break;
                    }
                }
                var row = Math.floor(popIndex / 3);
                if (row > 2) {
                    var move = row * (182 + 6);
                    if (move + 390 < _this.lstViewItem.contentHeight) {
                        _this.lstViewItem.scrollV = move;
                    }
                    else {
                        _this.lstViewItem.scrollV = _this.lstViewItem.contentHeight - 390;
                    }
                    _this.lstViewItem.validateNow();
                }
                if (popIndex != null && popIndex != undefined) {
                    _this.lstViewItem.getElementAt(popIndex).onBtnItem();
                }
            }, 800);
        };
        PayMallScene.prototype.loadPayProducts = function () {
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
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    _this.setInfoTypeList();
                });
            }).catch(function (err) {
                zj.toast_warning(err);
            });
        };
        PayMallScene.prototype.onBtnPay = function () {
            var _this = this;
            // "HXH_VipLow"
            this.btnPay.touchEnabled = false;
            setTimeout(function () {
                _this.onBtnClose();
            }, 500);
            setTimeout(function () {
                zj.loadUI(zj.VipLow)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.init(true);
                });
            }, 1000);
        };
        PayMallScene.prototype.onBtnClose = function () {
            if (this.type == zj.TableEnum.Enum.HXHChargeType.Gift) {
                var tbl = zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _i = 0, tbl_3 = tbl; _i < tbl_3.length; _i++) {
                    var v = tbl_3[_i];
                    var num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            else if (this.type == zj.TableEnum.Enum.HXHChargeType.Op) {
                var tbl = zj.PlayerGiftSystem.SortOp(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _a = 0, tbl_4 = tbl; _a < tbl_4.length; _a++) {
                    var v = tbl_4[_a];
                    var num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            else if (this.type == zj.TableEnum.Enum.HXHChargeType.Charge) {
                var tbl = zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _b = 0, tbl_5 = tbl; _b < tbl_5.length; _b++) {
                    var v = tbl_5[_b];
                    var num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            // 设置红点
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NEWGIFT);
            if (this.confirmCB != null) {
                this.confirmCB();
            }
            egret.Tween.get(this.imgBackground).to({ alpha: 0 }, 180);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        PayMallScene.prototype.setCB = function (confirmCB) {
            this.confirmCB = confirmCB;
        };
        return PayMallScene;
    }(zj.Dialog));
    zj.PayMallScene = PayMallScene;
    __reflect(PayMallScene.prototype, "zj.PayMallScene");
})(zj || (zj = {}));
//# sourceMappingURL=PayMallScene.js.map