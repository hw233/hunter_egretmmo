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
     * @class 升级通行证
     *
     * @author LianLei
     *
     * @date 2019-11-19
     */
    var HXH_BattlePassPay = (function (_super) {
        __extends(HXH_BattlePassPay, _super);
        function HXH_BattlePassPay() {
            var _this = _super.call(this) || this;
            _this.isGetMonthCard = [false, false]; // [初级月卡, 高级月卡]
            _this.allProducts = [];
            _this.synGiftInfo = function () {
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    _this.checkGiftExit();
                });
            };
            _this.checkGiftExit = function () {
                zj.Game.PlayerGiftSystem.newGiftExist(_this.giftInfo.index).then(function () {
                    _this.requestButtonBuy();
                });
            };
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassPaySkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDetails, _this);
            _this.btnUpLow.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUpLow, _this);
            _this.btnUpHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUpHigh, _this);
            _this.init();
            return _this;
        }
        HXH_BattlePassPay.prototype.init = function () {
            var _a = [100203, 100204], monthCardNormal = _a[0], monthCardSenior = _a[1];
            this.isGetMonthCard[0] = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(monthCardNormal) != -1;
            this.isGetMonthCard[1] = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(monthCardSenior) != -1;
            this.imgMonthCardLow.visible = this.isGetMonthCard[0];
            this.imgMonthCardHigh.visible = this.isGetMonthCard[1];
            var high_gift_id = 100210;
            var info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) { return v.gift_index == high_gift_id; })[0];
            // if (info.buy_times >= 1) this.btnUpHigh.enabled = false;
            // this.btnUpHigh.enabled = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1;
            var isBuyHigh = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1 ? (info != null && info.buy_times < 1) : false;
            this.btnUpHigh.enabled = isBuyHigh;
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(zj.TableNewgiftItem.Item(high_gift_id).goods_id[1]).path, this);
            this.btnUpLow.visible = !(this.isGetMonthCard[0] && this.isGetMonthCard[1]);
            this.btnUpHigh.horizontalCenter = this.btnUpLow.visible ? 136 : 0;
            this.giftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == high_gift_id;
            })[0];
            this.setAward();
            this.loadPayProducts();
        };
        HXH_BattlePassPay.prototype.setAward = function () {
            var level = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel;
            var rewardList = [];
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            for (var key in tblInfo) {
                if (tblInfo.hasOwnProperty(key)) {
                    var element = tblInfo[key];
                    if (element.season == season)
                        rewardList.push(element);
                }
            }
            rewardList.sort(function (a, b) { return a.level - b.level; });
            var list = [];
            for (var key in rewardList) {
                if (rewardList.hasOwnProperty(key)) {
                    var element = rewardList[key];
                    if (element.level >= level && list.length < 5)
                        list.push(element);
                }
            }
            list.sort(function (a, b) { return a.level - b.level; });
            var nameArr = [];
            for (var i = 0; i < 5; i++) {
                var itemSet = zj.PlayerItemSystem.Set(list[i].pay_reward[0]);
                if (itemSet != null)
                    nameArr.push(itemSet.Info.name);
            }
            // this.labelAward.text = "还可获得" + nameArr.join(",") + "...等超级大奖"
        };
        // private isBuyMonthCard(index: number): boolean {
        // 	let advancedId: number = CommonConfig.month_card_fit[index];
        // 	let advancedInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
        // 		return v.gift_index == advancedId;
        // 	});
        // 	let isBought: boolean = false;
        // 	if (advancedInfo[0] != null) isBought = (advancedInfo[0].buy_times >= 1);
        // 	return isBought;
        // }
        HXH_BattlePassPay.prototype.onBtnDetails = function () {
            zj.loadUI(zj.Common_RuleDialog).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.battlepass);
            });
        };
        HXH_BattlePassPay.prototype.onBtnUpLow = function () {
            var self = this;
            if (!this.isGetMonthCard[0] || !this.isGetMonthCard[1]) {
                var str_1 = "<text>购买</text><color>r=200,g=38,b=0</color><text>双月卡</text><text>方可激活</text><color>r=200,g=38,b=0</color><text>高级通行证</text><text>，是否前往购买？</text>";
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(str_1);
                    dialog.setCB(function () {
                        self.close();
                        zj.loadUI(zj.ActivitySpecialMainScene).then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.jump(3);
                        });
                    });
                });
            }
        };
        HXH_BattlePassPay.prototype.onBtnUpHigh = function () {
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
                zj.toast_warning("请先激活高级通行证！");
                return;
            }
            if (this.giftInfo.buy_times >= 1)
                return;
            this.synGiftInfo();
        };
        HXH_BattlePassPay.prototype.requestButtonBuy = function () {
            var _this = this;
            var self = this;
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.giftInfo.gift_index);
            if (giftInfo.pay_type == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(this.giftInfo.index).then(function (resp) {
                        _this.btnUpHigh.enabled = false;
                    });
                }
                else {
                    var strIndex = this.giftInfo.index;
                    if (this.giftInfo['pay_tbl']) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
            }
        };
        HXH_BattlePassPay.prototype.loadPayProducts = function () {
            var self = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                self.pay(resp);
            });
        };
        HXH_BattlePassPay.prototype.pay = function (resp) {
            for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                    var vv = _c[_b];
                    if (v.id == vv.id) {
                        var tmp = { id: "", name: "", describe: "", currency: "", amount: 0, amount_usd: 0, coin: 0, type: "", discount: "", cp_product_id: "", };
                        for (var k in tmp) {
                            tmp[k] = v[k];
                        }
                        tmp.cp_product_id = vv.cp_product_id;
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }
            var i = 0;
            while (i < this.allProducts.length) {
                if (zj.PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
            this.allProducts.sort(function (a, b) {
                var itemA = zj.PlayerPaySystem.PayItemByID(a.cp_product_id);
                var itemB = zj.PlayerPaySystem.PayItemByID(b.cp_product_id);
                return itemA.sort_index - itemB.sort_index;
            });
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.giftInfo.gift_index);
            var payIndex = zj.TablePayIndex.Item(giftInfo.pay_index);
            for (var _d = 0, _e = this.allProducts; _d < _e.length; _d++) {
                var v = _e[_d];
                if (v.coin == payIndex.raw_token) {
                    this.giftInfo['pay_tbl'] = zj.Table.DeepCopy(v);
                    break;
                }
            }
        };
        HXH_BattlePassPay.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HXH_BattlePassPay;
    }(zj.Scene));
    zj.HXH_BattlePassPay = HXH_BattlePassPay;
    __reflect(HXH_BattlePassPay.prototype, "zj.HXH_BattlePassPay");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassPay.js.map