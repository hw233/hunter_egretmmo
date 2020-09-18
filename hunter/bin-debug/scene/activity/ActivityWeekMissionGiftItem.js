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
     * @author xing li wei
     *
     * @date 2019-5-6
     *
     * @class 赏金特训list子项
     */
    var ActivityWeekMissionGiftItem = (function (_super) {
        __extends(ActivityWeekMissionGiftItem, _super);
        function ActivityWeekMissionGiftItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityWeekMissionGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityWeekMissionGiftItem"], null);
            _this.ButtonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy, _this);
            return _this;
        }
        ActivityWeekMissionGiftItem.prototype.dataChanged = function () {
            var data = this.data;
            this.buyTimes = data.payAward.buyTimes;
            this.SpriteTips5.visible = false;
            this.freshUI();
            this.setInfoAward(data);
        };
        ActivityWeekMissionGiftItem.prototype.freshUI = function () {
            var data = this.data;
            this.LabelToken.text = data.payAward.token.toString();
            if (data.payAward.buyTimes >= data.payAward.canBuyTimes) {
                this.LabelTimes.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.r_lastTimes, data.payAward.canBuyTimes - this.buyTimes, data.payAward.canBuyTimes));
                this.SpriteBuy.visible = true;
                this.ButtonBuy.enabled = false;
            }
            else {
                this.LabelTimes.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.g_lastTimes, data.payAward.canBuyTimes - this.buyTimes, data.payAward.canBuyTimes));
                this.SpriteBuy.visible = false;
                this.ButtonBuy.enabled = true;
            }
        };
        ActivityWeekMissionGiftItem.prototype.setInfoAward = function (data) {
            var itemInfo = data.payAward.goods;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < itemInfo.length; i++) {
                var data_1 = new zj.ActivityNoviceItemItemData();
                data_1.index = i;
                var a = [];
                a[0] = itemInfo[i].id;
                a[1] = itemInfo[i].count;
                data_1.itemInfo = a;
                data_1.father = this;
                array.addItem(data_1);
            }
            this.TableViewAward.dataProvider = array;
            this.TableViewAward.itemRenderer = zj.ActivityNoviceItemItem;
        };
        ActivityWeekMissionGiftItem.prototype.setInfoTag = function (id) {
        };
        ActivityWeekMissionGiftItem.prototype.onBtnBuy = function () {
            var _this = this;
            var data = this.data;
            var info = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            data.father.MissionWeekMallReqBody(data.payAward.id)
                .then(function (getGoods) {
                data.payAward.buyTimes += 1;
                var goods = zj.Table.DeepCopy(getGoods);
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    _this.freshUI();
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        }, info);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(goods);
                        dialog.setCB(function () {
                            _this.freshUI();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }).catch(function (result) {
                if (result == "钻石不足") {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        zj.loadUI(zj.PayMallScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init(true);
                        });
                    });
                }
                else {
                    zj.toast_warning(result);
                }
            });
        };
        return ActivityWeekMissionGiftItem;
    }(eui.ItemRenderer));
    zj.ActivityWeekMissionGiftItem = ActivityWeekMissionGiftItem;
    __reflect(ActivityWeekMissionGiftItem.prototype, "zj.ActivityWeekMissionGiftItem");
    var ActivityWeekMissionGiftItemData = (function () {
        function ActivityWeekMissionGiftItemData() {
        }
        return ActivityWeekMissionGiftItemData;
    }());
    zj.ActivityWeekMissionGiftItemData = ActivityWeekMissionGiftItemData;
    __reflect(ActivityWeekMissionGiftItemData.prototype, "zj.ActivityWeekMissionGiftItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityWeekMissionGiftItem.js.map