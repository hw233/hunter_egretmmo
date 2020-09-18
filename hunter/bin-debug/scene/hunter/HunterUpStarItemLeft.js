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
     * @date 2018-12-11
     *
     * @class 猎人升星左侧猎人item
     */
    var HunterState;
    (function (HunterState) {
        /** 主角 */
        HunterState[HunterState["Base"] = 1] = "Base";
        /** 材料且选中 */
        HunterState[HunterState["Select"] = 2] = "Select";
        /** 空项 */
        HunterState[HunterState["Empty"] = 3] = "Empty";
        /** 非材料 */
        HunterState[HunterState["NoUse"] = 4] = "NoUse";
        /** 材料未选中  */
        HunterState[HunterState["NoSelect"] = 5] = "NoSelect";
        /** 星级相同但是，材料在防守阵容 */
        HunterState[HunterState["Defence"] = 6] = "Defence";
        /** 首次进入武将 */
        HunterState[HunterState["BFirst"] = 7] = "BFirst";
    })(HunterState = zj.HunterState || (zj.HunterState = {}));
    var HunterUpStarItemLeft = (function (_super) {
        __extends(HunterUpStarItemLeft, _super);
        function HunterUpStarItemLeft() {
            var _this = _super.call(this) || this;
            _this.type = HunterState.Empty;
            _this.defenceType = 0;
            _this.skinName = "resource/skins/hunter/HunterUpStarItemLeftSkin.exml";
            zj.cachekeys(zj.UIResource["HunterUpStarItemLeft"], null);
            return _this;
        }
        /** 长按 */
        HunterUpStarItemLeft.prototype.onLongPress = function (data) {
            if (data == null || data.generalId == 0 || data.generalId == null)
                return;
            this.isInLongPress = true;
            if (zj.Game.PlayerHunterSystem.huntervis == true) {
                zj.Game.PlayerHunterSystem.huntervis = false;
                zj.loadUI(zj.Common_ViewHeroDetail)
                    .then(function (dialog) {
                    dialog.setInfo(data.generalId, function () {
                        zj.Game.PlayerHunterSystem.huntervis = true;
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 恢复按钮状态
        HunterUpStarItemLeft.prototype.resumeLongPressState = function () {
            this.isInLongPress = false;
        };
        HunterUpStarItemLeft.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterUpStarItemLeft.prototype.updateView = function (data) {
            zj.closeCache(this.groupCache);
            this.initBase();
            this.setType(data);
            this.setItemInfo(data);
            // RES.addEventListener(egret.Event.COMPLETE, () => {
            zj.setCache(this.groupCache);
            // }, this);
        };
        HunterUpStarItemLeft.prototype.initBase = function () {
            this.groupAll.visible = true;
            this.groupStar.removeChildren();
            this.imgSelectedFrame.visible = false;
            this.imgFrame.visible = true;
            this.groupBingo.visible = false;
            this.imgShadow.visible = true;
            this.imgBingo.visible = false;
            var path = zj.UIConfig.UIConfig_Hunter.upStarColor[1];
            this.imgBingo.source = zj.cachekey(path, this);
            this.imgLock.visible = false;
            this.type = HunterState.Empty;
            this.defenceType = 0;
        };
        HunterUpStarItemLeft.prototype.setType = function (data) {
            if (data.fatherGeneralId == 0 || data.fatherGeneralId == null) {
                if (data.generalId == 0 || data.generalId == null) {
                    this.type = HunterState.Empty;
                }
                else {
                    this.type = HunterState.NoSelect;
                }
            }
            else {
                if (data.generalId == 0 || data.generalId == null) {
                    this.type = HunterState.Empty;
                }
                else if (data.fatherGeneralId == data.generalId) {
                    this.type = HunterState.Base;
                }
                else if (zj.Game.PlayerHunterSystem.queryHunter(data.generalId).star == zj.Game.PlayerHunterSystem.queryHunter(data.fatherGeneralId).star) {
                    var defenceList = zj.PlayerHunterSystem.GeneralsIdInDefence();
                    var _a = zj.Table.FindR(defenceList, function (_, _v) {
                        return _v[0] == data.generalId;
                    }), findv = _a[0], index = _a[1];
                    if (index != null) {
                        this.type = HunterState.Defence;
                        this.defenceType = findv[1];
                    }
                    else {
                        this.type = (data.isSelected) ? HunterState.Select : HunterState.NoSelect;
                    }
                }
                else {
                    this.type = HunterState.NoUse;
                }
            }
        };
        HunterUpStarItemLeft.prototype.setItemInfo = function (data) {
            if (data.generalId == 0 || data.generalId == null || data.generalId == undefined) {
                this.type = HunterState.Empty;
                this.groupAll.visible = false;
                return;
            }
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
            this.labelLevel.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            zj.Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            var framePath = zj.PlayerHunterSystem.Frame(data.generalId);
            var iconPath = zj.PlayerHunterSystem.Head(data.generalId);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.imgFrame.source = zj.cachekey(framePath, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgIcon.source = zj.cachekey("wx_" + iconPath, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(iconPath, this);
            }
            this.imgGrade.source = zj.cachekey(gradePath, this);
            if (this.type == HunterState.Base || this.type == HunterState.Select) {
                // show bingo
                this.groupBingo.visible = true;
                this.imgBingo.visible = true;
                this.imgShadow.visible = false;
                this.imgLock.visible = false;
                this.imgSelectedFrame.visible = true;
                this.imgFrame.visible = false;
                var path = "";
                if (this.type == HunterState.Base) {
                    path = zj.UIConfig.UIConfig_Hunter.upStarColor[0];
                }
                else {
                    path = zj.UIConfig.UIConfig_Hunter.upStarColor[1];
                }
                this.imgBingo.source = zj.cachekey(path, this);
            }
            else if (this.type == HunterState.Empty || this.type == HunterState.NoSelect) {
                // all not show
                this.imgLock.visible = false;
                this.groupBingo.visible = false;
                this.imgBingo.visible = true;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;
            }
            else if (this.type == HunterState.NoUse) {
                // show shadow
                this.imgLock.visible = false;
                this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;
            }
            else if (this.type == HunterState.Defence || this.type == HunterState.BFirst) {
                // show shadow and lock
                this.imgLock.visible = true;
                this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;
            }
        };
        return HunterUpStarItemLeft;
    }(zj.HunterBaseItem));
    zj.HunterUpStarItemLeft = HunterUpStarItemLeft;
    __reflect(HunterUpStarItemLeft.prototype, "zj.HunterUpStarItemLeft");
    /** 数据类 */
    var HunterUpStarItemLeftData = (function () {
        function HunterUpStarItemLeftData() {
            /** 父类 */
            // father: HunterUpStar;
            /** 是否选中 */
            this.isSelected = false;
        }
        return HunterUpStarItemLeftData;
    }());
    zj.HunterUpStarItemLeftData = HunterUpStarItemLeftData;
    __reflect(HunterUpStarItemLeftData.prototype, "zj.HunterUpStarItemLeftData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpStarItemLeft.js.map