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
    var Activity_DailyFirstCharge = (function (_super) {
        __extends(Activity_DailyFirstCharge, _super);
        function Activity_DailyFirstCharge() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/activity/Activity_DailyFirstChargeSkin.exml";
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCharge, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.setInfo();
            return _this;
        }
        Activity_DailyFirstCharge.prototype.setInfo = function () {
            this.btnCharge.visible = !zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday; // 判断今天是否充值
            this.btnCharge.enabled = !zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday;
            this.btnGet.enabled = !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay; // 每日首充奖励是否领取
            this.btnGet.visible = zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday;
            var gap = 6;
            this.scrollerAward.width = zj.CommonConfig.charge_everyday_reward.length * 95 + gap * (zj.CommonConfig.charge_everyday_reward.length - 1);
            this.listAwardData.removeAll();
            for (var i = 0; i < zj.CommonConfig.charge_everyday_reward.length; i++) {
                this.listAwardData.addItem({ goodsId: zj.CommonConfig.charge_everyday_reward[i][0], count: zj.CommonConfig.charge_everyday_reward[i][1] });
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Activity_DailyFirstChargeItem;
        };
        Activity_DailyFirstCharge.prototype.onBtnGet = function () {
            var req = new message.RewardEverydayChargeRequest();
            zj.Game.Controller.send(req, this.GetRewardEverydayCharge_Visit, null, this, false);
        };
        Activity_DailyFirstCharge.prototype.GetRewardEverydayCharge_Visit = function (req, resp) {
            var _this = this;
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            if (response.body.gameInfo.goodsInfo.length != 0) {
                var arr_1 = [];
                for (var i = 0; i < zj.CommonConfig.charge_everyday_reward.length; i++) {
                    var goodsInfo = new message.GoodsInfo();
                    goodsInfo.goodsId = zj.CommonConfig.charge_everyday_reward[i][0];
                    goodsInfo.count = zj.CommonConfig.charge_everyday_reward[i][1];
                    arr_1.push(goodsInfo);
                }
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.show();
                    dialog.init(arr_1);
                    dialog.setCB(function () {
                        _this.close(zj.UI.HIDE_TO_TOP);
                        zj.Game.EventManager.event(zj.GameEvent.CLOSE_DAILYFIRSTCHARGE);
                    });
                });
            }
        };
        Activity_DailyFirstCharge.prototype.onBtnCharge = function () {
            this.close();
            zj.loadUI(zj.PayMallScene).then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        Activity_DailyFirstCharge.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Activity_DailyFirstCharge.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        Activity_DailyFirstCharge.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Activity_DailyFirstCharge;
    }(zj.Dialog));
    zj.Activity_DailyFirstCharge = Activity_DailyFirstCharge;
    __reflect(Activity_DailyFirstCharge.prototype, "zj.Activity_DailyFirstCharge");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_DailyFirstCharge.js.map