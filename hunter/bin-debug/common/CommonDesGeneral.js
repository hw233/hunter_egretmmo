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
    // CommonDesGeneral
    // hexiaowei 
    // 2018/12/5
    var CommonDesGeneral = (function (_super) {
        __extends(CommonDesGeneral, _super);
        function CommonDesGeneral() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonDesGeneralSkin.exml";
            return _this;
        }
        CommonDesGeneral.prototype.setInfo = function (id, count) {
            this.id = id;
            this.setInfoGeneral(id);
        };
        CommonDesGeneral.prototype.setInfoGeneral = function (id) {
            var itemSet = zj.PlayerItemSystem.Set(id);
            var hero = zj.PlayerHunterSystem.Table(id);
            var strName = itemSet.Info["name"];
            var gnrInfo = zj.PlayerHunterSystem.Table(id);
            var strDes = gnrInfo.extra;
            var strSkill = gnrInfo.des;
            var strInfo = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.intrAndDes, strDes, strSkill);
            var pathType = zj.UIConfig.UIConfig_General.hunter_type2[gnrInfo.features];
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.imgIcon.source = zj.cachekey("wx_" + itemSet.Clip, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            }
            this.lbNameLv.text = strName;
            this.lbInfo.text = strInfo;
            this.imgGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[hero.aptitude], this);
            this.imgType.source = zj.cachekey(pathType, this);
            zj.Helper.NodeStarByAlignLeft(this.groupStar, hero.init_star, zj.CommonConfig.general_max_star, null, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[1]);
        };
        CommonDesGeneral.prototype.reSetGeneral = function () {
            var info = zj.Otherdb.MissionGeneral(this.id);
            if (info == null) {
                return;
            }
            zj.Helper.NodeStarByAlignLeft(this.groupStar, info.star, zj.CommonConfig.general_max_star, null, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[info.awaken_level + 1]);
            this.imgGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.Game.PlayerHunterSystem.Table(this.id).aptitude], this);
            this.imgFrame.source = zj.cachekey(zj.TableGeneralStep.Item(info.step).frame_path, this); //table_general_ste , this) p
            this.lbNameLv.text = this.lbNameLv.$getText() + " Lv" + info.level;
        };
        return CommonDesGeneral;
    }(zj.UI));
    zj.CommonDesGeneral = CommonDesGeneral;
    __reflect(CommonDesGeneral.prototype, "zj.CommonDesGeneral");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesGeneral.js.map