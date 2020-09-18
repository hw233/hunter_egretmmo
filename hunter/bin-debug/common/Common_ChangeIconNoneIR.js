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
    // lizhengqiang
    // 20190112
    var Common_ChangeIconNoneIR = (function (_super) {
        __extends(Common_ChangeIconNoneIR, _super);
        function Common_ChangeIconNoneIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_ChangeIconNoneIRSkin.exml";
            zj.cachekeys(zj.UIResource["Common_ChangeIconNoneIR"], null);
            return _this;
        }
        Common_ChangeIconNoneIR.prototype.dataChanged = function () {
            var iconType = this.data.iconType;
            var titleType = this.data.titleType;
            if (iconType == zj.TableEnum.TableIconListState.GENERAL) {
                this.setInfoGENRAL(titleType);
            }
            else if (iconType == zj.TableEnum.TableIconListState.LEAGUE) {
                this.setInfoLEAGUE(titleType);
            }
        };
        Common_ChangeIconNoneIR.prototype.setInfoGENRAL = function (titleType) {
            this.lbTitle.text = zj.TextsConfig.TextsConfig_User.name_none[titleType - 1];
        };
        Common_ChangeIconNoneIR.prototype.setInfoLEAGUE = function (titleType) {
            this.lbTitle.text = zj.TextsConfig.TextsConfig_User.name_none_league[titleType - 1];
        };
        return Common_ChangeIconNoneIR;
    }(eui.ItemRenderer));
    zj.Common_ChangeIconNoneIR = Common_ChangeIconNoneIR;
    __reflect(Common_ChangeIconNoneIR.prototype, "zj.Common_ChangeIconNoneIR");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIconNoneIR.js.map