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
     * @class 猎人突破显示技能对话框, X阶突破技
     */
    var HunterBreakSkillDialog = (function (_super) {
        __extends(HunterBreakSkillDialog, _super);
        function HunterBreakSkillDialog() {
            var _this = _super.call(this) || this;
            _this.listData = new eui.ArrayCollection();
            /** 技能等级， 1-3 */
            _this.index = null;
            _this.generalId = null;
            _this.skinName = "resource/skins/hunter/HunterBreakSkillDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            return _this;
        }
        HunterBreakSkillDialog.prototype.onBtnUsing = function (data) {
            var _this = this;
            var battleValue = zj.Game.PlayerHunterSystem.queryHunter(data.generalId).battleValue;
            zj.Game.PlayerHunterSystem.breakSkillUsing(data.generalId, data.skillId, data.skillLevel).then(function () {
                _this.promptBattle(battleValue);
                _this.refresh();
                if (_this.callback)
                    _this.callback();
            });
        };
        // 显示技能升级界面
        HunterBreakSkillDialog.prototype.onBtnUpLevel = function (data) {
            var _this = this;
            var battleValue = zj.Game.PlayerHunterSystem.queryHunter(data.generalId).battleValue;
            zj.loadUI(zj.HunterBreakSkillUpDialog)
                .then(function (upDialog) {
                upDialog.setInfo(data.index, data.skillLevel, data.skillId, data.generalId, function () {
                    // 升级技能成功
                    _this.refresh();
                    _this.promptBattle(battleValue);
                    if (_this.callback)
                        _this.callback(true);
                }, _this);
                upDialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterBreakSkillDialog.prototype.promptBattle = function (lastBattleValue) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.battleValue > lastBattleValue) {
                zj.CommonTipBmfont.promptBattleValue(lastBattleValue, hunterInfo.battleValue);
            }
        };
        HunterBreakSkillDialog.prototype.onTouchEnd = function () {
            var obj = this.getChildByName("hunter-break-skill-talent-des");
            if (obj)
                this.removeChild(obj);
        };
        HunterBreakSkillDialog.prototype.onListItemTouch = function (begin, data) {
            var _this = this;
            if (!begin) {
                var obj = this.getChildByName("hunter-break-skill-talent-des");
                if (obj)
                    this.removeChild(obj);
                return;
            }
            var point = this.localToGlobal(this["group"].x, this["group"].y);
            point.x -= zj.Game.UIManager.x;
            zj.loadUI(zj.CommonDesTalent).then(function (ui) {
                ui.setInfoByBreak(data.skillId, data.breakLevel);
                ui.name = "hunter-break-skill-talent-des";
                ui.x = point.x - 115;
                if (data.index == 0 || data.index == 1) {
                    ui.y = point.y + 50 + 106 * (data.index + 1);
                }
                else {
                    ui.y = point.y + 70 + 106 * data.index - ui.height;
                }
                _this.addChild(ui);
            });
        };
        /**
         * 设置信息
         * @param index X阶技能, 1-3
         * @param generalId 武将ID
         * @param callback 回调函数， 使用技能成功回调该函数
         * @param thisObj 回调this对象
         */
        HunterBreakSkillDialog.prototype.setInfo = function (index, generalId, callback, thisObj) {
            this.callback = callback;
            this.index = index;
            this.generalId = generalId;
            this.refresh();
        };
        HunterBreakSkillDialog.prototype.refresh = function () {
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseGeneralInfo == null || hunterInfo == null)
                return;
            // 标题
            var titlePath = zj.UIConfig.UIConfig_Hunter_break.breakTitle[this.index - 1];
            this.imgTitle.source = zj.cachekey(titlePath, this);
            // 列表信息
            this.listData.removeAll();
            var currentSkills = zj.Table.DeepCopy(baseGeneralInfo.break_skill[this.index - 1]); // 取本地表里当前技能等级(1-3)下的技能id数组
            for (var i = 0; i < currentSkills.length; i++) {
                var v = currentSkills[i];
                var data = new zj.HunterBreakSkillDialogItemData();
                data.index = i;
                data.generalId = this.generalId;
                data.skillId = v;
                data.breakLevel = hunterInfo.break_level;
                data.skillLevel = this.index;
                data.father = this;
                this.listData.addItem(data);
            }
            this.listStarAward.dataProvider = this.listData;
            this.listStarAward.itemRenderer = zj.HunterBreakSkillDialogItem;
            // 标签
            var currentBreakSkills = baseGeneralInfo.break_skill[this.index - 1];
            var skillList = [];
            for (var i = 0; i < currentBreakSkills.length; i++) {
                var v = currentBreakSkills[i];
                for (var j = 0; j < hunterInfo.using_break_skill.length; j++) {
                    var vv = hunterInfo.using_break_skill[j];
                    if (v === vv) {
                        skillList.push(v);
                    }
                }
            }
            if (hunterInfo.break_level + 3 > this.index * 3) {
                if (skillList.length == 0) {
                    this.labelCondition.text = zj.TextsConfig.TextsConfig_Hunter_Break.condition1;
                }
                else {
                    this.labelCondition.text = zj.TextsConfig.TextsConfig_Hunter_Break.condition2;
                }
            }
            else {
                this.labelCondition.text = zj.TextsConfig.TextsConfig_Hunter_Break.condition3;
            }
        };
        HunterBreakSkillDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterBreakSkillDialog;
    }(zj.Dialog));
    zj.HunterBreakSkillDialog = HunterBreakSkillDialog;
    __reflect(HunterBreakSkillDialog.prototype, "zj.HunterBreakSkillDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakSkillDialog.js.map