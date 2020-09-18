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
     * @date 2019-3-29
     *
     * @class  君主升级
     *
     */
    var CommonLevelUp = (function (_super) {
        __extends(CommonLevelUp, _super);
        function CommonLevelUp() {
            var _this = _super.call(this) || this;
            _this.textValue = [[], []];
            _this.groupFunc = [];
            _this.skinName = "resource/skins/common/CommonLevelUpSkin.exml";
            _this.init();
            zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30069), 500);
            return _this;
        }
        CommonLevelUp.prototype.init = function () {
            var _this = this;
            for (var i = 0; i < 2; i++) {
                this.textValue[i][0] = this["labelValue" + (i + 1)];
                this.textValue[i][1] = this["labelUp" + (i + 1)];
            }
            for (var i = 0; i < 2; i++) {
                this.groupFunc[i] = aone;
                this.groupFunc[i].group = this["groupFunc" + (i + 1)];
                this.groupFunc[i].icon = this["imgFunc" + (i + 1)];
                this.groupFunc[i].text = this["labelFunc" + (i + 1)];
            }
            this.setInfoAttr();
            this.setInfoOpen();
            egret.Tween.get(this).to(400).call(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            });
            egret.Tween.get(this.labelClose).to({ alpha: 0 }, 400).to({ alpha: 1 }, 400);
            zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.58;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "001_beijignguang_02", 0)
                .then(function (display) {
                _this.groupAdd.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_diban", "armatureName", "005_diban3_xunhuan", 0)
                .then(function (display) {
                _this.groupAdd.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupUp);
                egret.Tween.removeTweens(_this);
            }, this);
            egret.Tween.get(this.groupUp, { loop: true }).to({ y: 139 }, 500).to({ y: 129 }, 1000).to({ y: 134 }, 500);
        };
        CommonLevelUp.prototype.setInfoAttr = function () {
            var string = "wowowo";
            var str = [[string, string], [string, string]];
            try {
                str[0][0] = zj.Helper.StringFormat("%d", zj.Game.PlayerInfoSystem.baseInfo_pre.power);
                str[0][1] = zj.Helper.StringFormat("%d", zj.PlayerVIPSystem.Item(zj.Game.PlayerInfoSystem.baseInfo_pre.level).role_power);
                str[1][0] = zj.Helper.StringFormat("%d", zj.Game.PlayerInfoSystem.BaseInfo.power);
                str[1][1] = zj.Helper.StringFormat("%d", zj.PlayerVIPSystem.Item().role_power);
            }
            catch (e) {
                str[0][0] = "00";
                str[0][1] = "00";
                str[1][0] = "00";
                str[1][1] = "00";
            }
            this.labelLevel.text = zj.Game.PlayerInfoSystem.BaseInfo.level.toString();
            for (var i = 0; i < this.textValue.length; i++) {
                for (var j = 0; j < this.textValue[i].length; j++) {
                    this.textValue[i][j].text = str[j][i];
                }
            }
        };
        CommonLevelUp.prototype.setInfoOpen = function () {
            var open = zj.Game.PlayerMissionSystem.FunOpen();
            for (var i = 0; i < this.groupFunc.length; i++) {
                if (open[i]) {
                    this["labelFunc" + (i + 1)].text = open[i].name;
                    this["imgFunc" + (i + 1)].source = zj.cachekey(open[i].path, this);
                }
                else {
                    this["groupFunc" + (i + 1)].visible = false;
                }
            }
        };
        CommonLevelUp.prototype.setCB = function (cb) {
            this.callBack = cb;
        };
        CommonLevelUp.prototype.onBtnClose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            if (this.callBack) {
                this.callBack();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return CommonLevelUp;
    }(zj.Dialog));
    zj.CommonLevelUp = CommonLevelUp;
    __reflect(CommonLevelUp.prototype, "zj.CommonLevelUp");
})(zj || (zj = {}));
//# sourceMappingURL=CommonLevelUp.js.map