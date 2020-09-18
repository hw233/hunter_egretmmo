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
     * @class 执照考试
     */
    var licenseExamination = (function (_super) {
        __extends(licenseExamination, _super);
        function licenseExamination() {
            var _this = _super.call(this) || this;
            _this.licenseArray = [];
            _this.skinName = "resource/skins/license/licenseExaminationSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnStar.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStar, _this);
            return _this;
        }
        licenseExamination.prototype.setInfo = function (level, index, type, father) {
            this.level = level + 1;
            this.type = type;
            var tbl = zj.Game.PlayerMissionSystem.itemLicense(level + 1);
            this.labelExamination1.text = tbl.examination_name;
            this.labelExamination2.text = tbl.examination_des;
            this.labelStarNumber.text = index.toString();
            var path = zj.TableMapRole.Item(tbl.boss_roleId[0]).half_path;
            this.imgNpc.source = zj.cachekey(path, this);
            this.father = father;
            this.loadList(level + 1);
            if (type == 2) {
                this.labelStarNumber.x = 290;
                this.labelStarNumber.y = -3;
            }
            this.licenseArray = [tbl.examination_name, tbl.boss_roleId[0], this.level];
            this.imgTitle.source = zj.UIConfig.UIConfig_Task.titleEH[type];
        };
        licenseExamination.prototype.loadList = function (level) {
            var array = new eui.ArrayCollection();
            var feature = zj.TableMissionLicence.Item(level).feature;
            for (var i = 0; i < feature.length; i++) {
                var data = new zj.licenseExaminationSkillData;
                data.feature = feature[i];
                array.addItem(data);
            }
            this.listSkill.dataProvider = array;
            this.listSkill.itemRenderer = zj.licenseExaminationSkill;
        };
        licenseExamination.prototype.onBtnStar = function () {
            var _this = this;
            zj.Game.PlayerMissionSystem.MobsInfo(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, this.level)
                .then(function () {
                zj.Game.PlayerMissionSystem.licenseCurPos = _this.level;
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    zj.Game.EventManager.event(zj.GameEvent.LICENSE_ITEM, { licenseArray: _this.licenseArray });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    if (_this.type == 1) {
                        dialog.setInfo(_this.father.focusCur);
                    }
                    else if (_this.type == 2) {
                        dialog.setInfo(_this.father.focusCurH + zj.CommonConfig.licence_max_level);
                    }
                });
            })
                .catch(function () {
            });
        };
        licenseExamination.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return licenseExamination;
    }(zj.Dialog));
    zj.licenseExamination = licenseExamination;
    __reflect(licenseExamination.prototype, "zj.licenseExamination");
})(zj || (zj = {}));
//# sourceMappingURL=licenseExamination.js.map