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
     * @author xingliwei
     *
     * @date 2019-7-23
     *
     * @class 猎人念力修炼选择猎人材料界面list子项
     */
    var HunterPsychicRefreshNewPopItem = (function (_super) {
        __extends(HunterPsychicRefreshNewPopItem, _super);
        function HunterPsychicRefreshNewPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewPopItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.data.father = null;
            }, _this);
            _this.init();
            return _this;
        }
        HunterPsychicRefreshNewPopItem.prototype.init = function () {
            this.imgBigon.visible = false;
            this.imgShadow.visible = false;
            this.imgLock.visible = false;
            this.btnClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        HunterPsychicRefreshNewPopItem.prototype.dataChanged = function () {
            if (this.data.index == 0) {
                this.setDefault(this.data);
            }
            else {
                this.setHunterInfo(this.data);
            }
        };
        HunterPsychicRefreshNewPopItem.prototype.setDefault = function (data) {
            var general_id = data.hunterInfo.general_id;
            var level = data.hunterInfo.level;
            var star = data.hunterInfo.star;
            var awaken = data.hunterInfo.awaken;
            var str = zj.Helper.StringFormat("条件：%s级； %s星； %s次觉醒", level, star, awaken);
            this.labelMeterialsTip.text = str;
            if (general_id == 0) {
                this.labelNoMet.text = zj.TextsConfig.TextsConfig_Hunter_Break.noMet;
                this.imgHeroGrade.visible = (false);
                this.imgIcon.source = zj.UIConfig.UIConfig_General.hunter_donnot_know;
            }
            else {
                var genTal = zj.PlayerHunterSystem.Table(general_id);
                var path_aptitude = zj.UIConfig.UIConfig_General.hunter_grade[genTal.aptitude];
                var path_head = zj.PlayerHunterSystem.Head(general_id);
                this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.hunterMet, genTal.general_name);
                this.imgHeroGrade.visible = true;
                this.imgHeroGrade.source = path_aptitude;
                this.imgIcon.source = path_head;
            }
            this.imgShadow.visible = false;
            this.imgLock.visible = false;
            this.labelItemNum.text = level.toString();
            this.labelItemNum.visible = (level > 0);
            zj.Helper.SetHeroAwakenStar(this.groupStar, star, awaken);
            this.groupNo.visible = true;
            this.groupHave.visible = false;
        };
        HunterPsychicRefreshNewPopItem.prototype.setHunterInfo = function (data) {
            var general_id = data.hunterInfo.general_id;
            var level = data.hunterInfo.level;
            var star = data.hunterInfo.star;
            var awaken = data.hunterInfo.awakePassive.level;
            var general = zj.Game.PlayerHunterSystem.queryHunter(general_id);
            var path_aptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(general_id).aptitude];
            var path_head = zj.PlayerHunterSystem.Head(general_id);
            var path_frame = zj.PlayerHunterSystem.Frame(general_id);
            var tag = 0;
            var isSel = zj.Table.FindF(data.consumeSels, function (k, v) {
                if (v == data.hunterInfo.general_id) {
                    tag = k;
                }
                return v == data.hunterInfo.general_id;
            });
            this.labelMeterialsPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.battleValue, zj.Set.NumberUnit3(general.battleValue));
            this.labelMeterialsNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.cardNum, general.potatoInfo.length);
            this.imgBigon.visible = isSel;
            this.imgShadow.visible = (data.hunterInfo.defenceInfo != null);
            this.imgLock.visible = (data.hunterInfo.defenceInfo != null);
            this.imgFrame.source = path_frame;
            this.imgIcon.source = path_head;
            this.imgHeroGrade.source = path_aptitude;
            this.imgHeroGrade.visible = true;
            this.labelItemNum.visible = (level > 0);
            this.labelItemNum.text = level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupStar, star, awaken);
            this.groupNo.visible = false;
            this.groupHave.visible = true;
        };
        HunterPsychicRefreshNewPopItem.prototype.onBtnClick = function () {
            var data = this.data;
            if (data.hunterInfo.defenceInfo != null) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_defence_general[data.hunterInfo.defenceInfo[0][1]]);
            }
            else {
                if (this.imgBigon.visible) {
                    // let tag = this.imgBigon.getTag()
                    for (var i = 0; i < data.consumeSels.length; i++) {
                        if (data.consumeSels[i] == data.hunterInfo.general_id) {
                            data.consumeSels.splice(i);
                            i--;
                        }
                    }
                    // table.remove(self._consumeSels, tag)
                    this.imgBigon.visible = false;
                }
                else {
                    if (data.consumeSels.length >= data.csmCounts) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_psychic.selectPsychic);
                    }
                    else {
                        data.consumeSels.push(data.hunterInfo.general_id);
                        this.imgBigon.visible = true;
                    }
                    // this.imgBigon:setTag(#self._consumeSels)
                }
            }
        };
        return HunterPsychicRefreshNewPopItem;
    }(eui.ItemRenderer));
    zj.HunterPsychicRefreshNewPopItem = HunterPsychicRefreshNewPopItem;
    __reflect(HunterPsychicRefreshNewPopItem.prototype, "zj.HunterPsychicRefreshNewPopItem");
    var HunterPsychicRefreshNewPopItemData = (function () {
        function HunterPsychicRefreshNewPopItemData() {
        }
        return HunterPsychicRefreshNewPopItemData;
    }());
    zj.HunterPsychicRefreshNewPopItemData = HunterPsychicRefreshNewPopItemData;
    __reflect(HunterPsychicRefreshNewPopItemData.prototype, "zj.HunterPsychicRefreshNewPopItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicRefreshNewPopItem.js.map