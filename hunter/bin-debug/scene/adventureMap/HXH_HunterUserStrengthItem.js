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
    //WantedSecondChooseItem
    //wangshenzhuo
    // 2019/02/20
    var HXH_HunterUserStrengthItem = (function (_super) {
        __extends(HXH_HunterUserStrengthItem, _super);
        function HXH_HunterUserStrengthItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/HXH_HunterUserStrengthItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_HunterUserStrengthItem"], null);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnBuyStrengthNum.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuyStrengthNum, _this);
            _this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onItemTap(true, _this.data);
            }, _this);
            _this.groupHead.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onItemTap(false, _this.data);
            }, _this);
            if (zj.Device.isReviewSwitch) {
                _this.jewel.width = 40;
                _this.jewel.height = 40;
                _this.groupBuyStrength.y = 240;
            }
            return _this;
        }
        HXH_HunterUserStrengthItem.prototype.dataChanged = function () {
            this.SetInfo();
        };
        HXH_HunterUserStrengthItem.prototype.SetInfo = function () {
            if (this.data.index < 3) {
                this.itemSet = zj.PlayerItemSystem.Set(this.data.info.id);
                this.labelTextNum.text = zj.PlayerItemSystem.Count(this.data.info.id).toString();
                this.labelPropName.text = this.data.info.name;
            }
            else {
                this.itemSet = zj.PlayerItemSystem.Set(this.data.info.id, zj.CommonConfig.role_buy_add_power);
                this.labelTextNum.text = zj.CommonConfig.role_buy_add_power.toString();
                this.labelPropName.text = zj.TextsConfig.TextsConfig_User.name_power;
            }
            this.imgIcon.source = zj.cachekey(this.itemSet.Path, this);
            this.imgFrame.source = zj.cachekey(this.itemSet.Frame, this);
            if (this.data.index < 3) {
                this.groupUse.visible = true;
                this.btnBuyStrengthNum.visible = false;
                if (this.itemSet.Count > 0) {
                    this.btnAdd.enabled = true;
                    this.imgMask.visible = false;
                }
                else {
                    this.btnAdd.enabled = false;
                    var path = zj.UIConfig.UIConfig_Package.use[3];
                    zj.Set.ButtonBackgroud(this.btnAdd, path, path, path);
                    this.imgMask.visible = true;
                }
                var resCost = this.data.info.power;
                this.groupBuyStrength.visible = false;
                this.labelBuyStrengthNum.visible = false;
                this.labelPropExp.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Friend.getPower, resCost);
            }
            else {
                this.btnBuyStrengthNum.visible = true;
                this.groupUse.visible = false;
                this.labelBuyStrengthNum.visible = true;
                //剩余次数
                this.groupBuyStrength.visible = true;
                var time = zj.PlayerVIPSystem.LowLevel().buy_power - zj.Game.PlayerVIPSystem.vipInfo.buyPower;
                if (time == 0) {
                    this.labelBuyStrengthNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_User.daytime_power1, zj.PlayerVIPSystem.LowLevel().buy_power - zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power));
                }
                else {
                    this.labelBuyStrengthNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_User.daytime_power2, zj.PlayerVIPSystem.LowLevel().buy_power - zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power));
                }
                this.labelPropExp.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Friend.getPower, zj.CommonConfig.role_buy_add_power);
                this.labelBuyNum.text = zj.CommonConfig.power_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPower).toString();
            }
        };
        //道具兑换体力值
        HXH_HunterUserStrengthItem.prototype.onBtnAdd = function () {
            var _this = this;
            var goods = new message.GoodsInfo;
            // goods.def = null;
            goods.goodsId = this.data.info.id;
            goods.count = 1;
            goods.index = 0;
            goods.showType = 0;
            this.ReqGetMobsInfo(goods)
                .then(function (data) {
                var resCost = _this.data.info.power;
                var resType = zj.PlayerItemSystem.UseOfResource(_this.data.info.id);
                _this.resType = resType;
                var str_Resource = "+" + resCost;
                _this.SetInfo();
                zj.Common_ShortMsg.promptBattleValue(str_Resource, resType, _this.data.father.height);
                // TipManager.GetResource(str_Resource , resCost);
                // toast("体力值+" + str_Resource);
            })
                .catch(function (reason) { });
        };
        HXH_HunterUserStrengthItem.prototype.ReqGetMobsInfo = function (goods) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UsePropRequest();
                request.body.goodses = [goods];
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //快速购买体力值
        HXH_HunterUserStrengthItem.prototype.onBtnBuyStrengthNum = function () {
            this.BuyPower();
        };
        HXH_HunterUserStrengthItem.prototype.BuyPower = function () {
            var _this = this;
            if (zj.Game.PlayerInfoSystem.BaseInfo.vipLevel == zj.PlayerVIPSystem.GetMaxLevel() && zj.Game.PlayerVIPSystem.vipInfo.buyPower == zj.PlayerVIPSystem.LowLevel().buy_power) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.buy_power_error);
            }
            else if (zj.PlayerVIPSystem.LowLevel().buy_power > zj.Game.PlayerVIPSystem.vipInfo.buyPower) {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_User.buy_power, zj.CommonConfig.power_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPower), zj.CommonConfig.role_buy_add_power, zj.PlayerVIPSystem.LowLevel().buy_power - zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power);
                zj.TipManager.ShowConfirmCancel(str, function () { _this.ReqBuyPower_Visit2(); });
            }
            else {
                if (zj.Device.isVipOpen) {
                    if (zj.Device.isVipOpen) {
                        var str1 = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.replenishPhysicalPower, zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power);
                        zj.TipManager.ShowConfirmCancel(str1, function () { _this.GoPayMallScene(); });
                    }
                    else {
                        var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.errBuyPower, zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power);
                        zj.TipManager.ShowConfirmCancel(str, function () { _this.GoPayMallScene(); });
                    }
                }
                else {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Error.buy_power_error);
                }
            }
        };
        HXH_HunterUserStrengthItem.prototype.GoPayMallScene = function () {
            // this.data.father.onBtnClose();
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        HXH_HunterUserStrengthItem.prototype.ReqBuyPower_Visit2 = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyPowerRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result == message.EC.XG_POWER_BUY_LIMIT) {
                        if (zj.Device.isVipOpen) {
                            var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.errBuyPower, zj.Game.PlayerVIPSystem.vipInfo.buyPower, zj.PlayerVIPSystem.LowLevel().buy_power);
                            _this.GoPayMallScene();
                            //---------------------------------   
                        }
                        else {
                            zj.toast_warning(zj.TextsConfig.TextsConfig_Wanted.noTimes);
                        }
                    }
                    else if (response.header.result == message.EC.XG_LACK_TOKEN) {
                        var a = zj.CommonConfig.power_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPower);
                        var b = zj.Game.PlayerInfoSystem.Token;
                        if (zj.Game.PlayerInfoSystem.Token < zj.CommonConfig.power_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPower)) {
                            var str = zj.TextsConfig.TextsConfig_Money.demstone;
                            zj.TipManager.ShowConfirmCancel(str, function () { _this.GoPayMallScene(); });
                        }
                        else {
                            _this.GoPayMallScene();
                        }
                    }
                    else if (response.header.result == 0) {
                        var str_power = "+" + zj.CommonConfig.role_buy_add_power;
                        var a = _this.data.info.id;
                        var b = zj.PlayerItemSystem.UseOfResource(_this.data.info.id);
                        // toast_warning("str_power");
                        zj.Common_ShortMsg.promptBattleValue(str_power, _this.data.info.id, _this.data.father.height);
                    }
                    // resolve(response);
                    _this.SetInfo();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        return HXH_HunterUserStrengthItem;
    }(eui.ItemRenderer));
    zj.HXH_HunterUserStrengthItem = HXH_HunterUserStrengthItem;
    __reflect(HXH_HunterUserStrengthItem.prototype, "zj.HXH_HunterUserStrengthItem");
    //子项数据源
    var HXH_HunterUserStrengthItemData = (function () {
        function HXH_HunterUserStrengthItemData() {
        }
        return HXH_HunterUserStrengthItemData;
    }());
    zj.HXH_HunterUserStrengthItemData = HXH_HunterUserStrengthItemData;
    __reflect(HXH_HunterUserStrengthItemData.prototype, "zj.HXH_HunterUserStrengthItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_HunterUserStrengthItem.js.map