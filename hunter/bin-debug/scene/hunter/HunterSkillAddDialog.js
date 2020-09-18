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
     * @date 2018-12-25
     *
     * @class 猎人技能 -> 添加技能 dialog
     */
    var HunterSkillAddDialog = (function (_super) {
        __extends(HunterSkillAddDialog, _super);
        function HunterSkillAddDialog() {
            var _this = _super.call(this) || this;
            _this.callback = null;
            _this.itemId = 30507;
            _this.skinName = "resource/skins/hunter/HunterSkillAddDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChange, _this);
            _this.imgChangeSkill.mask = _this.imgChangeSkillMask;
            _this.imgChangeTime.mask = _this.imgChangeTimeMask;
            return _this;
        }
        HunterSkillAddDialog.prototype.setInfo = function (generalId, callback) {
            this.generalId = generalId;
            this.callback = callback;
            this.refresh();
        };
        HunterSkillAddDialog.prototype.refresh = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.setChangeTimeProgress(hunterInfo.use_skillItem, zj.CommonConfig.general_skill_prop_limit);
            var currentStep = zj.PlayerHunterSystem.GetCurStepSkillPoint(hunterInfo.step);
            var maxStep = zj.PlayerHunterSystem.GetMaxStepSkillPoint();
            this.setChangeSkillProgress(currentStep, maxStep);
            this.labelInfo2.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.skillChangeTexts, maxStep);
            this.labelInfo3.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.stepChangeTexts, zj.CommonConfig.general_skill_prop_limit);
            var framePath = zj.PlayerItemSystem.ItemFrame(this.itemId);
            var path = zj.PlayerItemSystem.ItemPath(this.itemId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIconSkill.source = zj.cachekey(path, this);
            var count = zj.PlayerItemSystem.Count(this.itemId);
            this.labelOwn.text = count.toString();
        };
        HunterSkillAddDialog.prototype.onBtnClose = function () {
            this.close();
        };
        HunterSkillAddDialog.prototype.onBtnChange = function () {
            var _this = this;
            var goods = new message.GoodsInfo();
            goods.goodsId = this.itemId;
            goods.count = 1;
            zj.Game.PlayerHunterSystem.generalAddSkill(this.generalId, [goods]).then(function () {
                zj.toast(zj.Helper.convertStringWithColor(zj.TextsConfig.TextsConfig_Hunter.add_skill_point, "green"));
                _this.refresh();
                if (_this.callback)
                    _this.callback();
            }).catch(function () {
            });
        };
        HunterSkillAddDialog.prototype.setChangeTimeProgress = function (current, enough) {
            this.labelChangeTime.text = (current.toString() + "/" + enough.toString());
            var x = this.imgChangeTime.parent.width * (current / enough);
            this.imgChangeTimeMask.width = x;
            // this.imgChangeTime.width = this.imgChangeTime.parent.width * (current/enough);
        };
        HunterSkillAddDialog.prototype.setChangeSkillProgress = function (current, enough) {
            this.labelChangeSkill.text = (current.toString() + "/" + enough.toString());
            var x = this.imgChangeTime.parent.width * (current / enough);
            ;
            this.imgChangeSkillMask.width = x;
            // this.imgChangeSkill.width = this.imgChangeTime.parent.width * (current / enough);
        };
        return HunterSkillAddDialog;
    }(zj.Dialog));
    zj.HunterSkillAddDialog = HunterSkillAddDialog;
    __reflect(HunterSkillAddDialog.prototype, "zj.HunterSkillAddDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSkillAddDialog.js.map