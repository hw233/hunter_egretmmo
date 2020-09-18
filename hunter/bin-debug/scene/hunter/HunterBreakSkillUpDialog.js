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
     * @date 2018-12-19
     *
     * @class 猎人突破 技能升级 部分对话框
     */
    var HunterBreakSkillUpDialog = (function (_super) {
        __extends(HunterBreakSkillUpDialog, _super);
        function HunterBreakSkillUpDialog() {
            var _this = _super.call(this) || this;
            _this.index = null; /** 列表索引 */
            _this.skillLevel = null; /** x阶技能 1 - 3 */
            _this.skillId = null; /** 技能ID */
            _this.generalId = null; /** 猎人ID */
            _this.callback = null;
            _this.breakSelectedGenerals = [];
            _this.skinName = "resource/skins/hunter/HunterBreakSkillUpSkin.exml";
            _this.init();
            return _this;
        }
        HunterBreakSkillUpDialog.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.imgIconMaterials.addEventListener(tap, this.onBtnMaterial, this);
            this.groupSkill.addEventListener(tap, this.onBtnFragment, this);
            this.btnFirstAwaken.addEventListener(tap, this.onBtnUpLevel, this);
        };
        HunterBreakSkillUpDialog.prototype.onBtnClose = function () {
            zj.PlayerHunterSystem.breakSelectedGenerals = [];
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /** 显示材料获取界面 */
        HunterBreakSkillUpDialog.prototype.onBtnMaterial = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var skillLevel = 1;
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            var id = this.generalId % zj.CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;
            var upLevelInfos = zj.TableBreakSkillUplevel.Item(id);
            var goodId = upLevelInfos.consume_goods[skillLevel - 1];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(goodId, _this, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /** 显示技能升级界面 */
        HunterBreakSkillUpDialog.prototype.onBtnFragment = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var skillLevel = 1;
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            var id = this.generalId % zj.CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;
            zj.loadUI(zj.HunterBreakPopDialog).then(function (dialog) {
                dialog.setHunberBreakSkillUpInfo(_this.generalId, skillLevel, id, function (isClose) {
                    if (isClose) {
                        zj.PlayerHunterSystem.breakSelectedGenerals = [];
                    }
                    else {
                        _this.refresh();
                    }
                }, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            }).catch(function () {
            });
        };
        /** 点击升级按钮 */
        HunterBreakSkillUpDialog.prototype.onBtnUpLevel = function () {
            var _this = this;
            var ids = (this.generalId % zj.CommonConfig.general_id_to_index_multiple) * 10 + this.skillLevel;
            var skillLevel = 1;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            var hunterList = [];
            var breakUpSkillHunters = zj.PlayerHunterSystem.GetBreakUpSkillHunter(ids, skillLevel, this.generalId);
            if (zj.PlayerHunterSystem.breakSelectedGenerals.length != 0) {
                for (var i = 0; i < zj.PlayerHunterSystem.breakSelectedGenerals.length; i++) {
                    var v = zj.PlayerHunterSystem.breakSelectedGenerals[i];
                    for (var j = 0; j < breakUpSkillHunters.length; j++) {
                        var hunter = breakUpSkillHunters[j];
                        if (hunter.general_id == v) {
                            hunterList.push(v);
                        }
                    }
                }
            }
            var currentBattleValue = hunterInfo.battleValue;
            zj.Game.PlayerHunterSystem.breakSkillUpLevel(this.generalId, this.skillId, this.skillLevel, hunterList).then(function () {
                for (var i = 0; i < hunterList.length; i++) {
                    var v = hunterList[i];
                    zj.Game.PlayerHunterSystem.deleteHunterById(v);
                }
                zj.PlayerHunterSystem.breakSelectedGenerals = [];
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId);
                var _a = zj.PlayerHunterSystem.GeneralBreakBattleValue(hunterInfo), breakBattleValue = _a[1];
                if (breakBattleValue - currentBattleValue >= 1 && currentBattleValue > 0) {
                    zj.CommonTipBmfont.promptBattleValue(currentBattleValue, breakBattleValue);
                }
                _this.promptActive();
                _this.refresh();
                if (_this.callback)
                    _this.callback();
            });
        };
        HunterBreakSkillUpDialog.prototype.promptActive = function () {
            var _this = this;
            var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.common_hint[5], this);
            var image = new eui.Image(source);
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                }, _this);
                armatureDisplay.animation.play("000_tishi", 1);
                armatureDisplay.x = _this.groupTeach.width * 0.32;
                armatureDisplay.y = _this.groupTeach.height * 0.5;
                _this.groupTeach.addChild(armatureDisplay);
            });
        };
        /**
         * 设置基本信息
         * @param index 列表索引
         * @param breakLevel X阶技能 1 - 3
         * @param skillId 技能ID
         * @param generalId 武将ID
         * @param callback 回调函数
         * @param thisObj 回调对象
         */
        HunterBreakSkillUpDialog.prototype.setInfo = function (index, skillLevel, skillId, generalId, callback, thisObj) {
            this.index = index;
            this.skillLevel = skillLevel;
            this.skillId = skillId;
            this.generalId = generalId;
            this.callback = callback;
            // this.thisObj = thisObj;
            this.refresh();
        };
        HunterBreakSkillUpDialog.prototype.refresh = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            var skillLevel = 1;
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            var isMax = (skillLevel == zj.CommonConfig.general_break_skill_max_level);
            this.imgArrow.visible = !isMax;
            this.imgFrameMiddle.visible = isMax;
            this.imgIconMiddle.visible = isMax;
            this.labelLevelMiddle.visible = isMax;
            this.groupLeft.visible = !isMax;
            this.groupRight.visible = !isMax;
            this.groupUpLevel.visible = !isMax;
            this.spriteBreakMax.visible = isMax;
            var talentInfo = zj.TableGeneralTalent.Item(this.skillId);
            if (isMax) {
                var framePath = zj.UIConfig.UIConfig_Hunter_break.aptitude[4];
                var iconPath = talentInfo.path;
                this.imgFrameMiddle.source = zj.cachekey(framePath, this);
                this.imgIconMiddle.source = zj.cachekey(iconPath, this);
                this.labelLevelMiddle.text = skillLevel.toString();
                var des = zj.PlayerHunterSystem.GetPassiveSkillDes(this.skillId, skillLevel)[0];
                this.labelPlayerInfo.textFlow = zj.Util.RichText(des);
            }
            else {
                var frameLeft = zj.UIConfig.UIConfig_Hunter_break.aptitude[skillLevel - 1];
                var frameRight = zj.UIConfig.UIConfig_Hunter_break.aptitude[skillLevel];
                var iconPath = talentInfo.path;
                this.imgFrameLeft.source = zj.cachekey(frameLeft, this);
                this.imgIconLeft.source = zj.cachekey(iconPath, this);
                this.imgFrameRight.source = zj.cachekey(frameRight, this);
                this.imgIconRight.source = zj.cachekey(iconPath, this);
                this.labelLevelLeft.text = skillLevel.toString();
                this.labelLevelRight.text = (skillLevel + 1).toString();
                var _a = zj.PlayerHunterSystem.GetPassiveSkillEquipDes(this.skillId, skillLevel), des1 = _a[0], attribute1 = _a[1];
                var _b = zj.PlayerHunterSystem.GetPassiveSkillEquipDes(this.skillId, skillLevel + 1), attribute2 = _b[1];
                var attributeStringArray = [];
                for (var i = 0; i < attribute1.length; i++) {
                    var v = attribute1[i];
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, v, attribute2[i] - v);
                    attributeStringArray.push(str);
                }
                var des = zj.Helper.StringFormat.apply(zj.Helper, [des1].concat(attributeStringArray));
                this.labelPlayerInfo.textFlow = zj.Util.RichText(des);
                this.setConsume();
            }
        };
        HunterBreakSkillUpDialog.prototype.setConsume = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var skillLevel = 1;
            for (var i = 0; i < hunterInfo.break_skill.length; i++) {
                var v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            var id = this.generalId % zj.CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;
            var upLevelInfos = zj.TableBreakSkillUplevel.Item(id);
            var consumeGood = upLevelInfos.consume_goods[skillLevel - 1];
            var consumeCount = upLevelInfos.consume_count[skillLevel - 1];
            var count = zj.PlayerItemSystem.Count(consumeGood);
            // set skill materials info
            var materialFramePath = zj.PlayerItemSystem.ItemFrame(consumeGood);
            var materialIconPath = zj.PlayerItemSystem.ItemPath(consumeGood);
            this.imgAddMaterials.visible = (count < consumeCount);
            this.labelNumberMaterials.text = zj.Helper.StringFormat("%d/%d", count, consumeCount);
            zj.Set.LabelNumberGreenAndRed(this.labelNumberMaterials, count, consumeCount);
            // set fragment info 
            var isExange = zj.Table.FindF(upLevelInfos.exchange_ids[skillLevel - 1], function (_, v) {
                return v == 0;
            });
            var fragmentPath = (isExange) ? zj.UIConfig.UIConfig_General.hunter_donnot_know : zj.PlayerHunterSystem.Head(upLevelInfos.exchange_ids[skillLevel - 1][0]);
            var aptitude = upLevelInfos.exchange_aptitude[skillLevel - 1][0];
            var awakenPath = zj.UIConfig.UIConfig_General.hunter_grade[aptitude];
            this.imgBreakAwaken.visible = (aptitude != 0);
            this.imgFrameMaterials.source = zj.cachekey(materialFramePath, this);
            this.imgIconMaterials.source = zj.cachekey(materialIconPath, this);
            this.imgIconSkillFragment.source = zj.cachekey(fragmentPath, this);
            this.imgBreakAwaken.source = zj.cachekey(awakenPath, this);
            var level = upLevelInfos.exchange_level[skillLevel - 1][0];
            this.labelBreakLevel.visible = (level != 0);
            this.labelBreakLevel.text = level.toString();
            var star = upLevelInfos.exchange_star[skillLevel - 1][0];
            var awaken = upLevelInfos.exchange_awaken[skillLevel - 1][0];
            zj.Helper.SetHeroAwakenStar(this.groupBreakStar, star, awaken);
            this.labelNumberSkillFragment.text = zj.Helper.StringFormat("%d/%d", zj.PlayerHunterSystem.breakSelectedGenerals.length, upLevelInfos.exchange_ids[skillLevel - 1].length);
            zj.Set.LabelNumberGreenAndRed(this.labelNumberSkillFragment, zj.PlayerHunterSystem.breakSelectedGenerals.length, upLevelInfos.exchange_ids[skillLevel - 1].length);
            // set money
            this.lableGoldNum.text = upLevelInfos.consume_money[skillLevel - 1].toString();
        };
        return HunterBreakSkillUpDialog;
    }(zj.Dialog));
    zj.HunterBreakSkillUpDialog = HunterBreakSkillUpDialog;
    __reflect(HunterBreakSkillUpDialog.prototype, "zj.HunterBreakSkillUpDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakSkillUpDialog.js.map