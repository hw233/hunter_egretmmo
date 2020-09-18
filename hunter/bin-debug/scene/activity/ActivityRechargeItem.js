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
     * 2019.12.3
     * xingliwei
     * @class 累天充值子项
     */
    var ActivityRechargeItem = (function (_super) {
        __extends(ActivityRechargeItem, _super);
        function ActivityRechargeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityRechargeItemSkin.exml";
            _this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMonthCard, _this);
            return _this;
        }
        ActivityRechargeItem.prototype.dataChanged = function () {
            var data = this.data;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < data.info.reward_goods.length; i++) {
                arrCollection.addItem({
                    "goods": data.info.reward_goods[i],
                    "count": data.info.reward_count[i],
                    "isGet": false
                });
            }
            this.lstAward.dataProvider = arrCollection;
            this.lstAward.itemRenderer = zj.ActivityActivityItemB;
            var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, function (k, v) {
                return v == data.info.id;
            });
            this.imgGet.visible = false;
            if (data.info.id == zj.Game.PlayerInfoSystem.BaseInfo.pay_day && !vis) {
                this.btnMonthCard.visible = true;
                // this.btnMonthCard.enabled = true;
                this.btnMonthCard.currentState = "up";
            }
            else if (data.info.id >= zj.Game.PlayerInfoSystem.BaseInfo.pay_day && vis == false) {
                this.btnMonthCard.visible = true;
                // this.btnMonthCard.enabled = false;
                this.btnMonthCard.currentState = "disabled";
            }
            else {
                this.btnMonthCard.visible = false;
                this.imgGet.visible = true;
            }
            this.lbPlayerday.text = "" + data.info.id;
        };
        ActivityRechargeItem.prototype.onBtnMonthCard = function () {
            var _this = this;
            // 今天是否充值
            var isCharge = zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday;
            if (this.btnMonthCard.currentState == "disabled" && !isCharge) {
                var str_1 = "<text>任意充值即可领取，是否前往？</text>";
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.HelpUtil.textConfigFormat(str_1, 3));
                    dialog.setCB(function () {
                        zj.Game.EventManager.event(zj.GameEvent.CLOSE_ACTIVITY_SCENE);
                        zj.loadUI(zj.PayMallScene).then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init(true);
                            scene.loadFrom(zj.TableEnum.Enum.HXHChargeType.Gift);
                        });
                    });
                });
            }
            else if (this.btnMonthCard.currentState == "disabled" && isCharge) {
                zj.toast_success("今天的累充任务已达成！");
            }
            else {
                this.ContinuePayReward(this.data.info.id).then(function (gameInfo) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        var a = [];
                        for (var i = 0; i < _this.data.info.reward_goods.length; i++) {
                            var b = new message.GoodsInfo;
                            b.goodsId = _this.data.info.reward_goods[i];
                            b.count = _this.data.info.reward_count[i];
                            a.push(b);
                        }
                        dialog.init(a);
                        dialog.setCB(function () {
                            _this.dataChanged();
                            _this.data.father.init();
                        });
                        dialog.show();
                    });
                });
            }
        };
        ActivityRechargeItem.prototype.ContinuePayReward = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ContinuePayRewardRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        return ActivityRechargeItem;
    }(eui.ItemRenderer));
    zj.ActivityRechargeItem = ActivityRechargeItem;
    __reflect(ActivityRechargeItem.prototype, "zj.ActivityRechargeItem");
    var ActivityRechargeItemData = (function () {
        function ActivityRechargeItemData() {
        }
        return ActivityRechargeItemData;
    }());
    zj.ActivityRechargeItemData = ActivityRechargeItemData;
    __reflect(ActivityRechargeItemData.prototype, "zj.ActivityRechargeItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityRechargeItem.js.map