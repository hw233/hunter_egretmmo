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
     * @date 2018-12-7
     *
     * @class 猎人突破添加技能Item
     */
    var HunterBreakPopDialogItem = (function (_super) {
        __extends(HunterBreakPopDialogItem, _super);
        function HunterBreakPopDialogItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterBreakPopDialogItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterBreakPopDialogItem"], null);
            return _this;
        }
        HunterBreakPopDialogItem.prototype.dataChanged = function () {
            this.updataView(this.data);
        };
        HunterBreakPopDialogItem.prototype.updataView = function (data) {
            // 在防守阵容的猎人
            var defenceList = zj.PlayerHunterSystem.GeneralsIdInDefence();
            var defenceInfo = zj.Table.FindR(defenceList, function (_, v) {
                return v[0] == data.generalId;
            });
            // 上锁
            if (defenceInfo != null &&
                defenceInfo[0] != null &&
                defenceInfo[1] != null &&
                data.index != 0) {
                this.imgShadow.visible = true;
                this.imgLock.visible = true;
                this.defenceType = defenceInfo[1];
            }
            else {
                this.imgShadow.visible = false;
                this.imgLock.visible = false;
                this.defenceType = 0;
            }
            // 隐藏或者显示
            this.groupHave.visible = (data.index != 0);
            this.groupNo.visible = (data.index == 0);
            // 通用设置
            if (data.index != 0 && data.index != null) {
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
                if (hunterInfo == null)
                    return;
                // 设置战斗力提示
                this.labelMaterialPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.battleValue, zj.Set.NumberUnit3(hunterInfo.battleValue));
                // 设置数量
                this.labelMaterialNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.cardNum, hunterInfo.potatoInfo.length);
                // 设置选中
                this.imgBingoSelect.visible = data.isSelected;
                // 设置边框
                var framePath = zj.PlayerHunterSystem.Frame(data.generalId);
                this.imgFrame.source = zj.cachekey(framePath, this);
            }
            if (data.type == 0 /* HunterBreak */) {
                this.updateHunterBreakInfo(data);
            }
            else if (data.type == 1 /* SkillUpLevel */) {
                this.updateSkillUpLevelInfo(data);
            }
            else if (data.type == 2 /* HunterCompound */) {
                this.updateHunterCompoundInfo(data);
            }
        };
        // 更新猎人突破
        HunterBreakPopDialogItem.prototype.updateHunterBreakInfo = function (data) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(data.breakLevel);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
            if (hunterInfo == null || breakInfo == null || baseGeneralInfo == null)
                return;
            if (data.index == 0) {
                // 设置材料满足提示
                if (data.father.type1 == 0) {
                    this.labelNoMet.text = zj.TextsConfig.TextsConfig_Hunter_Break.noMet;
                }
                else {
                    this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.hunterMet, baseGeneralInfo.general_name);
                }
                // 设置材料满足条件
                var level = breakInfo.exchange_level[0];
                var star_1 = breakInfo.exchange_star[0];
                var awaken = breakInfo.exchange_awaken[0];
                if (data.father.type1 == 0) {
                    this.labelMaterialsTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.needConditionNoAwake, breakInfo.exchange_star[breakInfo.exchange_star.length - 1], breakInfo.exchange_break[breakInfo.exchange_break.length - 1]);
                }
                else {
                    this.labelMaterialsTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.needCondition, breakInfo.exchange_star[0], breakInfo.exchange_break[0]);
                }
                // this.imgGrade.visible = false
                // this.imgBreak.visible = false;
            }
            // 设置头像信息
            var headPath = zj.PlayerHunterSystem.Head(data.generalId);
            var aptitudePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            if (data.father.type1 == 0 && data.index === 0) {
                headPath = zj.UIConfig.UIConfig_General.hunter_donnot_know;
                this.imgGrade.visible = false;
            }
            else {
                this.imgGrade.visible = true;
            }
            this.imgIcon.source = zj.cachekey(headPath, this);
            this.imgGrade.source = zj.cachekey(aptitudePath, this);
            var star = breakInfo.exchange_star[0];
            if (data.index == 0) {
                this.labelNumber.text = String(breakInfo.exchange_level[0]);
                if (data.father.type1 == 0) {
                    zj.Helper.SetHeroAwakenStar(this.groupStar, breakInfo.exchange_star[breakInfo.exchange_star.length - 1], breakInfo.exchange_awaken[0]);
                }
                else {
                    zj.Helper.SetHeroAwakenStar(this.groupStar, star, breakInfo.exchange_awaken[0]);
                }
            }
            else {
                this.labelNumber.text = String(hunterInfo.level);
                zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            }
            zj.Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            // this.imgBreak.visible = false;
        };
        // 更新技能升级
        HunterBreakPopDialogItem.prototype.updateSkillUpLevelInfo = function (data) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            var upLevelInfo = zj.TableBreakSkillUplevel.Item(data.id);
            var exchangeAptitude = upLevelInfo.exchange_aptitude[data.skillLevel - 1][0];
            var exchangeLevel = upLevelInfo.exchange_level[data.skillLevel - 1][0];
            var exchangeStar = upLevelInfo.exchange_star[data.skillLevel - 1][0];
            var exchangeAwaken = upLevelInfo.exchange_star[data.skillLevel - 1][0];
            var exchangeId = upLevelInfo.exchange_ids[data.skillLevel - 1][0];
            if (data.index == 0) {
                // 设置材料满足提示
                if (exchangeAptitude == 0) {
                    this.labelNoMet.text = zj.TextsConfig.TextsConfig_Hunter_Break.noMet;
                }
                else {
                    var grade = zj.TextsConfig.TextsConfig_Hunter_Compound.hunter_grade[exchangeAptitude];
                    this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.noMet2, grade);
                }
                // 设置材料满足条件
                if (exchangeAwaken == 0) {
                    var materialTipString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.needConditionNoAwake, exchangeLevel, exchangeStar);
                    this.labelMaterialsTip.textFlow = zj.Util.RichText(materialTipString);
                }
                else {
                    var materialTipString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.needCondition, exchangeLevel, exchangeStar, exchangeAwaken);
                    this.labelMaterialsTip.textFlow = zj.Util.RichText(materialTipString);
                }
            }
            // 设置头像信息
            var headPath = zj.PlayerHunterSystem.Head(data.generalId);
            if (data.index == 0 && exchangeId == 0) {
                headPath = zj.UIConfig.UIConfig_General.hunter_donnot_know;
            }
            var gradePath = "";
            if (data.index == 0) {
                this.imgGrade.visible = (exchangeAptitude != 0);
                gradePath = zj.UIConfig.UIConfig_General.hunter_grade[exchangeAptitude];
                // set yellow color star
                zj.Helper.SetHeroAwakenStar(this.groupStar, exchangeStar, exchangeLevel - 1);
                this.labelNumber.text = exchangeLevel.toString();
            }
            else {
                this.imgGrade.visible = true;
                gradePath = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.generalId).aptitude];
                zj.Helper.SetHeroAwakenStar(this.groupStar, exchangeStar, hunterInfo.awakePassive.level);
                this.labelNumber.text = hunterInfo.level.toString();
            }
            this.imgIcon.source = zj.cachekey(headPath, this);
            this.imgGrade.source = zj.cachekey(gradePath, this);
        };
        /** 猎人合成 */
        HunterBreakPopDialogItem.prototype.updateHunterCompoundInfo = function (data) {
            // 设置头像信息
            var pathHead = "";
            var pathAptitude = "";
            if (data.generalId == data.father.selectInfos[0]) {
                var hunterInfo = new message.GeneralInfo;
                var hunter = data.father.selectInfos;
                hunterInfo.general_id = hunter[0];
                hunterInfo.star = hunter[2];
                hunterInfo.level = hunter[1];
                hunterInfo.awakePassive = hunter[3];
                if (data.generalId == 0) {
                    pathHead = zj.UIConfig.UIConfig_General.hunter_donnot_know;
                    pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[data.father.selectInfos[4]];
                }
                else {
                    pathHead = zj.PlayerHunterSystem.Head(data.generalId);
                    pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.generalId).aptitude];
                }
                this.labelNumber.text = String(hunterInfo.level);
                var condition = data.father.selectInfos;
                var level = condition[1];
                var star = condition[2];
                var awaken = condition[3];
                var strAwaken = zj.Helper.GetNumCH(awaken);
                if (data.father.type == 2 /* HunterCompound */) {
                    var gen = { star: Number, level: Number };
                    gen.star = data.father.selectInfos[2];
                    gen.level = data.father.selectInfos[3];
                    zj.Helper.SetHeroAwakenStar(this.groupStar, gen.star, gen.level);
                }
                if (awaken == 0) {
                    this.labelMaterialsTip.text = zj.Helper.StringFormat("条件:%s级;%s星", level, star);
                }
                else {
                    this.labelMaterialsTip.text = zj.Helper.StringFormat("条件:%s级;%s星;%s次觉醒", level, star, strAwaken);
                }
                var grade = null;
                zj.Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
                if (data.index == 0) {
                    if (data.generalId == 0) {
                        grade = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.hunter_grade[data.father.selectInfos[4]]);
                        this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.noMet, grade);
                    }
                    else {
                        this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.hunterMet, zj.PlayerHunterSystem.Table(hunterInfo.general_id).general_name);
                    }
                }
            }
            else {
                pathHead = zj.PlayerHunterSystem.Head(data.generalId);
                pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.generalId).aptitude];
                var general = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
                this.labelNumber.text = String(general.level);
                zj.Helper.SetHeroAwakenStar(this.groupStar, general.star, general.awakePassive.level);
                zj.Helper.GetBreakLevelToPath(this.imgBreak, general.break_level);
                var battleValue = general.battleValue;
                var cardNum = general.potatoInfo.length;
                this.labelMaterialPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.battleValue, zj.Set.NumberUnit3(battleValue));
                this.labelMaterialNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.cardNum, cardNum);
            }
            this.imgGrade.source = zj.cachekey(pathAptitude, this);
            this.imgIcon.source = zj.cachekey(pathHead, this);
        };
        return HunterBreakPopDialogItem;
    }(eui.ItemRenderer));
    zj.HunterBreakPopDialogItem = HunterBreakPopDialogItem;
    __reflect(HunterBreakPopDialogItem.prototype, "zj.HunterBreakPopDialogItem");
    var HunterBreakPopDialogItemData = (function () {
        function HunterBreakPopDialogItemData() {
            /** 突破等级 -- 突破升级界面 */
            this.breakLevel = null;
            /** 技能等级 -- 技能升级界面 */
            this.skillLevel = null;
            /** 显示猎人总数  */
            // length: number;
            /** 是否选中 */
            this.isSelected = false;
            /** 查表ID -- 技能升级界面 */
            this.id = null;
            /** 类型 */
            this.type = 0;
            this.father = null;
        }
        return HunterBreakPopDialogItemData;
    }());
    zj.HunterBreakPopDialogItemData = HunterBreakPopDialogItemData;
    __reflect(HunterBreakPopDialogItemData.prototype, "zj.HunterBreakPopDialogItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakPopDialogItem.js.map