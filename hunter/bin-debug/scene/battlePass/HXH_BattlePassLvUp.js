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
     * @class 通行证恭喜升级UI
     *
     * @author LianLei
     *
     * @date 2019-11-22
     */
    var HXH_BattlePassLvUp = (function (_super) {
        __extends(HXH_BattlePassLvUp, _super);
        function HXH_BattlePassLvUp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassLvUpSkin.exml";
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        HXH_BattlePassLvUp.prototype.setInfo = function (level) {
            this.level = level;
            this.labelLevel.text = level.toString();
            this.imgPass.source = zj.cachekey(zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? zj.UIConfig.UIConfig_BattlePass.iconHighPass : zj.UIConfig.UIConfig_BattlePass.iconLowPass, this);
            egret.Tween.get(this.labelClose, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
        };
        HXH_BattlePassLvUp.prototype.onBtnClose = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_GIFT);
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level % 10 == 0) {
                this.close();
                zj.loadUI(zj.HXH_BattlePassGetReward).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.level);
                });
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && this.level % 10 == 0) {
                zj.loadUI(zj.HXH_BattlePassGetGood).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.level);
                    _this.close();
                });
            }
            else {
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        return HXH_BattlePassLvUp;
    }(zj.Dialog));
    zj.HXH_BattlePassLvUp = HXH_BattlePassLvUp;
    __reflect(HXH_BattlePassLvUp.prototype, "zj.HXH_BattlePassLvUp");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassLvUp.js.map