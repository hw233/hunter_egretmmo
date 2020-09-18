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
    /**猎人合成
     *
     *邢利伟
     *
     *2018.12.19
     *
     * @class HunterHeroeUpCompound
     * @extends {eui.ItemRenderer}
     */
    var HunterCompoundItemRight = (function (_super) {
        __extends(HunterCompoundItemRight, _super);
        function HunterCompoundItemRight() {
            var _this = _super.call(this) || this;
            /**武将ID */
            _this.generalId = 0;
            /**选中的英雄 */
            _this.breakSelectedGenerals = [];
            _this.skinName = "resource/skins/hunter/HunterCompoundItemRightSkin.exml";
            _this.init();
            zj.cachekeys(zj.UIResource["HunterCompoundItemRight"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            return _this;
        }
        /**初始化 */
        HunterCompoundItemRight.prototype.init = function () {
            this.groupIcon.visible = true;
            this.imgLock.visible = false;
            this.imgShadow.visible = true;
            this.imgGrade.visible = true;
            this.type = 2 /* Empty */;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this);
        };
        /**数据源刷新被动执行 */
        HunterCompoundItemRight.prototype.dataChanged = function () {
            zj.closeCache(this.groupFather);
            this.setType(this.data);
            this.updateViews(this.data);
            zj.setCache(this.groupFather);
        };
        /**设置类型 */
        HunterCompoundItemRight.prototype.setType = function (data) {
            var bSelect = this.data.father.composeTable[data.index] != null;
            /**是否有武将合成材料(武将，等级，星级，觉醒等级) */
            var canSelect = false;
            var selectInfos = [];
            if (data.composeId != -1) {
                selectInfos[0] = data.id;
                selectInfos[1] = data.level;
                selectInfos[2] = data.star;
                selectInfos[3] = data.awaken;
                selectInfos[4] = data.aptitude;
            }
            canSelect = zj.PlayerHunterSystem.haveCompose(this.data.father.composeTable, selectInfos, true, zj.PlayerHunterSystem.GeneralsIdInDefence());
            if (data.composeId == -1) {
                this.type = 2 /* Empty */;
            }
            else if (bSelect) {
                this.type = 1 /* MetSelect */;
            }
            else if (canSelect) {
                this.type = 2 /* MetNoSelect */;
            }
            else {
                this.type = 3 /* NoMaterials */;
            }
        };
        /**更新视图 */
        HunterCompoundItemRight.prototype.updateViews = function (data) {
            egret.Tween.get(this.groupFather).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
            if (data.composeId == -1) {
                this.groupIcon.visible = false;
                this.imgLock.visible = true;
                return;
            }
            var hunterInfo; //= Game.PlayerHunterSystem.queryHunter(data.composeId);
            if (this.generalId == 0 || this.generalId == null) {
                if (this.data.father.composeTable[data.index] != null) {
                    this.generalId = this.data.father.composeTable[data.index];
                }
                else if (data.id != 0) {
                    this.generalId = data.id;
                }
                else {
                    this.generalId = 0;
                }
            }
            if (this.generalId < zj.CommonConfig.general_id_to_index_multiple) {
                hunterInfo = new message.GeneralInfo();
                hunterInfo.star = data.star;
                hunterInfo.level = data.level;
                hunterInfo.step = 1;
                hunterInfo.awakePassive.level = data.awaken;
            }
            else {
                hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            }
            var pathHead = null;
            var pathAptitude = "";
            if (this.generalId == 0) {
                pathHead = zj.UIConfig.UIConfig_General.hunter_donnot_know;
                pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[data.aptitude];
                this.imgGrade.source = zj.cachekey(pathAptitude, this);
            }
            else {
                pathHead = zj.PlayerHunterSystem.Head(this.generalId);
                pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(this.generalId).aptitude];
                this.imgGrade.source = zj.cachekey(pathAptitude, this);
            }
            this.imgIcon.source = zj.cachekey(pathHead, this);
            this.labelLevel.text = String(hunterInfo.level);
            zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            zj.Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            this.imgLock.visible = false;
            if (this.type == 3 /* NoMaterials */) {
                //无材料，显示普通框，遮罩，无对号
                this.imgShadow.visible = true;
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.selFrame[0], this);
                this.imgBingo.visible = false;
            }
            else if (this.type == 2 /* MetNoSelect */) {
                //未选择，显示普通框，无遮罩，无对号
                this.imgShadow.visible = false;
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.selFrame[0], this);
                this.imgBingo.visible = false;
            }
            else if (this.type == 1 /* MetSelect */) {
                //已选择，显示特殊框，无遮罩，有对号
                this.imgShadow.visible = false;
                this.imgFrame.source = zj.UIConfig.UIConfig_Role.selFrame[1];
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.selFrame[1], this);
                this.imgBingo.visible = true;
            }
            this.generalId = 0;
        };
        HunterCompoundItemRight.prototype.onTouchTap = function () {
            var _this = this;
            zj.loadUI(zj.HunterBreakPopDialog)
                .then(function (dialog) {
                var data = _this.data;
                dialog.setHunterCompoundInfo(data, function () {
                    // if (isClose) {
                    //     this.data.father.composeTable[data.index] = [];
                    // } else {
                    if (_this.data.father.composeTable.length > 0) {
                        _this.generalId = _this.data.father.composeTable[data.index];
                    }
                    data.father.listMaterialData.refresh();
                    // this.setType(data);
                    // this.updateViews(data);
                    // }
                    // egret.Tween.get(this).wait(1000).call(() => { data.father.load(); });
                }, _this);
                zj.Game.UIManager.pushDialog(dialog, zj.UI.SHOW_FROM_TOP);
            });
        };
        /**合成时出现的龙骨动画 */
        HunterCompoundItemRight.prototype.donghua = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_lieren_hecheng", "armatureName", "0000_guang1", 1)
                .then(function (display) {
                display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                }, _this);
                display.x = _this.group.width / 2;
                display.y = _this.group.height / 2;
                _this.group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HunterCompoundItemRight;
    }(eui.ItemRenderer));
    zj.HunterCompoundItemRight = HunterCompoundItemRight;
    __reflect(HunterCompoundItemRight.prototype, "zj.HunterCompoundItemRight");
    var HunterCompoundItemRightData = (function () {
        function HunterCompoundItemRightData() {
        }
        return HunterCompoundItemRightData;
    }());
    zj.HunterCompoundItemRightData = HunterCompoundItemRightData;
    __reflect(HunterCompoundItemRightData.prototype, "zj.HunterCompoundItemRightData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCompoundItemRight.js.map