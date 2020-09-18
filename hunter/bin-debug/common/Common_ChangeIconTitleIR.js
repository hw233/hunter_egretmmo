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
    var Common_ChangeIconTitleIR = (function (_super) {
        __extends(Common_ChangeIconTitleIR, _super);
        function Common_ChangeIconTitleIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_ChangeIconTitleIRSkin.exml";
            zj.cachekeys(zj.UIResource["Common_ChangeIconTitleIR"], null);
            return _this;
        }
        Common_ChangeIconTitleIR.prototype.dataChanged = function () {
            var iconType = this.data.iconType;
            var titleType = this.data.titleType;
            if (this.data.changeWidth) {
                this.groupTexts.x = 142;
                this.lbInfo.x = 172;
            }
            if (iconType == zj.TableEnum.TableIconListState.GENERAL) {
                this.setInfoGENRAL(titleType);
            }
            else if (iconType == zj.TableEnum.TableIconListState.LEAGUE) {
                this.setInfoLEAGUE(titleType);
            }
            else if (iconType == 3) {
                this.SetInfoFrame(titleType);
            }
        };
        Common_ChangeIconTitleIR.prototype.setInfoGENRAL = function (titleType) {
            this.lbTitle.text = zj.TextsConfig.TextsConfig_User.name[titleType - 1];
            this.lbInfo.text = zj.TextsConfig.TextsConfig_User.name_info[titleType - 1];
        };
        Common_ChangeIconTitleIR.prototype.SetInfoFrame = function (titleType) {
            this.lbTitle.text = zj.TextsConfig.TextsConfig_User.name_frame[titleType - 1];
            this.lbInfo.text = zj.TextsConfig.TextsConfig_User.name_frame_info[titleType - 1];
        };
        Common_ChangeIconTitleIR.prototype.setInfoLEAGUE = function (titleType) {
            this.lbTitle.text = zj.TextsConfig.TextsConfig_User.name_league[titleType - 1];
            this.lbInfo.text = zj.TextsConfig.TextsConfig_User.name_league_info[titleType - 1];
        };
        return Common_ChangeIconTitleIR;
    }(eui.ItemRenderer));
    zj.Common_ChangeIconTitleIR = Common_ChangeIconTitleIR;
    __reflect(Common_ChangeIconTitleIR.prototype, "zj.Common_ChangeIconTitleIR");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIconTitleIR.js.map