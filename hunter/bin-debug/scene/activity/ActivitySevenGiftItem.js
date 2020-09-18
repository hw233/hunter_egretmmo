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
    var ActivitySevenGiftItem = (function (_super) {
        __extends(ActivitySevenGiftItem, _super);
        function ActivitySevenGiftItem() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.info = null;
            _this.day = null;
            _this.father = null;
            _this.skinName = "resource/skins/activity/ActivitySevenGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivitySevenGiftItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            return _this;
        }
        ActivitySevenGiftItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.info = this.data.info;
            this.day = this.data.day;
            this.father = this.data.father;
            this.setInfoItem();
            this.setInfoGet();
            this.imgDay.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.day[this.index], this);
        };
        ActivitySevenGiftItem.prototype.setInfoItem = function () {
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
        ActivitySevenGiftItem.prototype.setInfoGet = function () {
            var _this = this;
            var bReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven, function (k, v) {
                return v == _this.index;
            });
            var token = 0;
            if (this.index <= this.day && !bReward) {
                if (zj.PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                    token = zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
                }
            }
            else if (this.index > this.day) {
                if (zj.PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.index <= zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                    token = zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.index - 1];
                }
            }
            else if (this.index == this.day && bReward) {
                if (zj.PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                    token = zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
                }
            }
            else if (this.index <= this.day && bReward) {
                if (zj.PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                    token = zj.PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
                }
            }
            var primer;
            if (zj.PlayerGiftSystem.Instance_sevenGift(this.index) != null) {
                primer = zj.PlayerGiftSystem.Instance_sevenGift(this.index).primer;
            }
            if (this.day <= 7) {
                this.imgStop.visible = (token == 0);
                this.imgGet.visible = (bReward && this.index <= this.day && token != 0);
                this.btnGet.visible = (token != 0 && !bReward);
                this.btnGet.enabled = (this.index <= this.day);
                this.groupPrice.visible = (!bReward && this.index <= this.day && token != 0);
                this.groupPrimer.visible = (!bReward && this.index <= this.day && token != 0);
                this.imgNoSell.visible = (this.index > this.day);
                if (this.index == this.day && token != primer && !bReward) {
                    this.imgSale.visible = true;
                }
                else {
                    this.imgSale.visible = false;
                }
                this.lbToken.text = (typeof token == "number" ? token.toString() : "0");
                this.lbPrimer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.primer, primer);
            }
            else {
                this.imgStop.visible = true;
                this.imgGet.visible = false;
                this.btnGet.visible = false;
                this.btnGet.enabled = false;
                this.groupPrice.visible = false;
                this.groupPrimer.visible = false;
                this.imgNoSell.visible = false;
                this.imgSale.visible = false;
            }
            if ((token == 0 || bReward && this.index <= this.day) || this.day > 7) {
                this.imgSelect.visible = false;
                this.imgSelects.visible = true;
            }
            else {
                this.imgSelect.visible = true;
                this.imgSelects.visible = false;
            }
        };
        ActivitySevenGiftItem.prototype.onBtnGet = function () {
            var _this = this;
            var allGeneralHistory = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            zj.Game.PlayerMixUnitInfoSystem.buySevenNewGift(this.index).then(function (gameInfo) {
                _this.father.setInfoTips();
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
                                    });
                                });
                            });
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                            // let general = Table.FindK(allGeneralHistory, PlayerHunterSystem.Table(goods.goodsId).general_id);
                            // if (general == -1) {
                            //     setTimeout(() => {
                            //         // 图鉴解锁成功
                            //         let ui = <TavernGetGeneralPop>newUI(TavernGetGeneralPop);
                            //         ui.setInof(goods);
                            //         this.addChild(ui);
                            //         egret.Tween.get(ui.group1)
                            //             .to({ alpha: 1 }, 100)
                            //             .to({ y: 10 }, 150, egret.Ease.sineInOut)
                            //             .wait(300, false)
                            //             .to({ y: -10 }, 150, egret.Ease.sineInOut)
                            //             .wait(300, false)
                            //             .call(() => { ui.close(); });
                            //     }, 300);
                            // }
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(function () {
                                _this.setInfoGet();
                            });
                        });
                    }
                }
            });
        };
        return ActivitySevenGiftItem;
    }(eui.ItemRenderer));
    zj.ActivitySevenGiftItem = ActivitySevenGiftItem;
    __reflect(ActivitySevenGiftItem.prototype, "zj.ActivitySevenGiftItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySevenGiftItem.js.map