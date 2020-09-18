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
    // lizhengiang
    // 20190413
    var ActivityHappySevenDayItem = (function (_super) {
        __extends(ActivityHappySevenDayItem, _super);
        function ActivityHappySevenDayItem() {
            var _this = _super.call(this) || this;
            _this.day = null;
            _this.info = null;
            _this.father = null;
            _this.skinName = "resource/skins/activity/ActivityHappySevenDayItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityHappySevenDayItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            return _this;
        }
        ActivityHappySevenDayItem.prototype.dataChanged = function () {
            this.day = this.data.day;
            this.info = this.data.info;
            this.father = this.data.father;
            this.setInfoItem();
            this.setInfoDay();
            this.setInfoGet();
        };
        ActivityHappySevenDayItem.prototype.setInfoItem = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info["reward_goods"].length; i++) {
                var goods = new message.GoodsInfo;
                goods.goodsId = this.info["reward_goods"][i];
                goods.count = this.info["reward_count"][i];
                goods.index = 0;
                goods.showType = this.info["show_type"][i];
                arrCollection.addItem({ info: goods });
            }
            this.lstViewAward.dataProvider = arrCollection;
            this.lstViewAward.itemRenderer = zj.ActivityAwardItem;
        };
        ActivityHappySevenDayItem.prototype.setInfoDay = function () {
            this.imgDay.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.day[this.day], this);
        };
        ActivityHappySevenDayItem.prototype.setInfoGet = function () {
            var _this = this;
            var bReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (k, v) {
                return k == (_this.day - 1) && v == 1;
            });
            this.btnGet.visible = !bReward;
            this.btnGet.enabled = (this.day <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length && !bReward);
            this.imgGet.visible = (this.day <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length && bReward);
            if (bReward) {
                this.imgSelect.visible = false;
                this.imgSelects.visible = true;
            }
            else {
                this.imgSelect.visible = true;
                this.imgSelects.visible = false;
            }
        };
        ActivityHappySevenDayItem.prototype.onBtnGet = function () {
            var _this = this;
            var allGeneralHistory = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            zj.Game.PlayerMixUnitInfoSystem.loginReward(this.day).then(function (gameInfo) {
                if (gameInfo.getGoods.length > 0) {
                    var hasGeneral = false;
                    var goods_1 = null;
                    for (var _i = 0, _a = gameInfo.getGoods; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            hasGeneral = true;
                            goods_1 = v;
                            break;
                        }
                    }
                    if (hasGeneral && goods_1 != null) {
                        zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                            dialog.setInfo(goods_1.goodsId, 0, function () {
                                zj.loadUI(zj.CommonGetDialog)
                                    .then(function (dialog) {
                                    dialog.show();
                                    dialog.init(gameInfo.getGoods);
                                    dialog.setCB(function () {
                                        _this.setInfoGet();
                                        _this.father.setInfoReward();
                                        _this.btnGet.visible = false;
                                    });
                                });
                            });
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                            var general = zj.Table.FindK(allGeneralHistory, zj.PlayerHunterSystem.Table(goods_1.goodsId).general_id);
                            if (general == -1) {
                                // setTimeout(() => {
                                //     // 图鉴解锁成功
                                //     let ui = <TavernGetGeneralPop>newUI(TavernGetGeneralPop);
                                //     ui.setInof(goods);
                                //     this.addChild(ui);
                                //     egret.Tween.get(ui.group1)
                                //         .to({ alpha: 1 }, 100)
                                //         .to({ y: 10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .to({ y: -10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .call(() => { ui.close(); });
                                // }, 300);
                            }
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(function () {
                                _this.setInfoGet();
                                _this.father.setInfoReward();
                                _this.btnGet.visible = false;
                            });
                        });
                    }
                }
                _this.father.setInfoTipReward();
            });
        };
        return ActivityHappySevenDayItem;
    }(eui.ItemRenderer));
    zj.ActivityHappySevenDayItem = ActivityHappySevenDayItem;
    __reflect(ActivityHappySevenDayItem.prototype, "zj.ActivityHappySevenDayItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityHappySevenDayItem.js.map