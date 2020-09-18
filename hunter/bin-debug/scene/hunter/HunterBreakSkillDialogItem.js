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
     * @author chen xi
     *
     * @date 2018-12-6
     *
     * @class 猎人突破显示技能对话框Item
     */
    var HunterBreakSkillDialogItem = (function (_super) {
        __extends(HunterBreakSkillDialogItem, _super);
        function HunterBreakSkillDialogItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterBreakSkillDialogItemSkin.exml";
            _this.btnUsing.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUsing, _this);
            _this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUpLevel, _this);
            _this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onListItemTouch(true, _this.data);
            }, _this);
            _this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onListItemTouch(false, _this.data);
            }, _this);
            zj.cachekeys(zj.UIResource["HunterBreakSkillDialogItem"], null);
            return _this;
        }
        HunterBreakSkillDialogItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterBreakSkillDialogItem.prototype.updateView = function (data) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            var skillLevel = 1;
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key === data.skillId) {
                    skillLevel = v.value;
                }
            }
            var desText = zj.PlayerHunterSystem.GetPassiveSkillDes(data.skillId, skillLevel)[0];
            this.labelDescribe.textFlow = zj.Util.RichText(desText);
            var talentInfo = zj.TableGeneralTalent.Item(data.skillId);
            this.labelName.text = talentInfo.talent_name;
            var framePath = zj.UIConfig.UIConfig_Hunter_break.aptitude[((hunterInfo.break_level - (data.skillLevel - 1) * 3) > 0 ? (hunterInfo.break_level - (data.skillLevel - 1) * 3) : 1) - 1];
            var iconPath = talentInfo.path;
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.labelLevel.text = (hunterInfo.break_level - (data.skillLevel - 1) * 3) > 0 ? (hunterInfo.break_level - (data.skillLevel - 1) * 3).toString() : "1"; // skillLevel);
            this.setButtonState(data);
        };
        HunterBreakSkillDialogItem.prototype.setButtonState = function (data) {
            if (data.breakLevel < data.skillLevel) {
                this.btnUsing.visible = true;
                this.btnUsing.enabled = false;
                this.btnUpLevel.enabled = false;
                this.imgUsing.visible = false;
            }
            else {
                var usingSkills = zj.Game.PlayerHunterSystem.queryHunter(data.generalId).using_break_skill;
                var using = zj.Table.FindF(usingSkills, function (_, v) {
                    return v === data.skillId;
                });
                this.btnUsing.visible = !using;
                this.imgUsing.visible = using;
                this.btnUpLevel.enabled = true;
            }
        };
        HunterBreakSkillDialogItem.prototype.onBtnUsing = function () {
            this.data.father.onBtnUsing(this.data);
        };
        HunterBreakSkillDialogItem.prototype.onBtnUpLevel = function () {
            this.data.father.onBtnUpLevel(this.data);
        };
        return HunterBreakSkillDialogItem;
    }(eui.ItemRenderer));
    zj.HunterBreakSkillDialogItem = HunterBreakSkillDialogItem;
    __reflect(HunterBreakSkillDialogItem.prototype, "zj.HunterBreakSkillDialogItem");
    var HunterBreakSkillDialogItemData = (function () {
        function HunterBreakSkillDialogItemData() {
            this.father = null;
        }
        return HunterBreakSkillDialogItemData;
    }());
    zj.HunterBreakSkillDialogItemData = HunterBreakSkillDialogItemData;
    __reflect(HunterBreakSkillDialogItemData.prototype, "zj.HunterBreakSkillDialogItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakSkillDialogItem.js.map