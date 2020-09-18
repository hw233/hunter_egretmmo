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
     * @date 2019-3-20
     *
     * @class 执照考试界面考试特性
     */
    var licenseExaminationSkill = (function (_super) {
        __extends(licenseExaminationSkill, _super);
        function licenseExaminationSkill() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/license/licenseExaminationSkillSkin.exml";
            zj.cachekeys(zj.UIResource["licenseExaminationSkill"], null);
            return _this;
        }
        /** 修改数据源被动执行*/
        licenseExaminationSkill.prototype.dataChanged = function () {
            var data = this.data;
            var info = zj.TableClientWantedMobsFeature.Item(data.feature);
            var frame = zj.PlayerItemSystem.QualityFrame(info.quality);
            this.imgBoard.source = zj.cachekey(frame, this);
            this.imgIcon.source = zj.cachekey(info.path, this);
        };
        return licenseExaminationSkill;
    }(eui.ItemRenderer));
    zj.licenseExaminationSkill = licenseExaminationSkill;
    __reflect(licenseExaminationSkill.prototype, "zj.licenseExaminationSkill");
    var licenseExaminationSkillData = (function () {
        function licenseExaminationSkillData() {
        }
        return licenseExaminationSkillData;
    }());
    zj.licenseExaminationSkillData = licenseExaminationSkillData;
    __reflect(licenseExaminationSkillData.prototype, "zj.licenseExaminationSkillData");
})(zj || (zj = {}));
//# sourceMappingURL=licenseExaminationSkill.js.map