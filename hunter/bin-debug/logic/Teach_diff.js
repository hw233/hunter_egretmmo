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
    var onTouchAddStep = (function (_super) {
        __extends(onTouchAddStep, _super);
        function onTouchAddStep() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                zj.Teach.addTeaching();
            }, _this);
            return _this;
        }
        return onTouchAddStep;
    }(egret.EventDispatcher));
    zj.onTouchAddStep = onTouchAddStep;
    __reflect(onTouchAddStep.prototype, "zj.onTouchAddStep");
    /**副本跳转猎人 */
    var onTouchToHero = (function (_super) {
        __extends(onTouchToHero, _super);
        function onTouchToHero(cb) {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    if (cb) {
                        cb();
                        cb = null;
                    }
                });
                zj.Teach.addOperateTeachStep();
            }, _this);
            return _this;
        }
        return onTouchToHero;
    }(egret.EventDispatcher));
    zj.onTouchToHero = onTouchToHero;
    __reflect(onTouchToHero.prototype, "zj.onTouchToHero");
    /**
     * 新手引导主逻辑
     * created by Lian Lei
     */
    var Teach_diff = (function () {
        function Teach_diff() {
        }
        /**教学操作 */
        Teach_diff.OperateTeach = function (roleType_, curPart_, curStep_, leaderX_) {
            zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
            console.log("——————————————————新手引导ID + step:  " + "curPart:" + curPart_ + ", curStep:" + curStep_ + "——————————————————————");
            if (curPart_ == 3013) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) {
                    var ui = void 0;
                    if (zj.Game.UIManager.topDialog() == null) {
                        ui = zj.Game.UIManager.topScene();
                    }
                    else {
                        ui = zj.Game.UIManager.topDialog();
                    }
                    if (egret.getQualifiedClassName(ui) != "zj.HunterMainScene") {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.PlayerHunterSystem.GetGeneralId(ui['generalId']) != this._ID_XIAOJIE)
                        return;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    zj.Teach.addMask();
                    var ui_1 = zj.Game.UIManager.topScene();
                    ui_1['rectMask'].visible = true;
                    if (ui_1['btnMainDetail'].visible) {
                        setTimeout(function () {
                            zj.Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_1['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        }, 400);
                        setTimeout(function () {
                            ui_1['rectMask'].visible = false;
                            zj.Teach.openUiName = "zj.HunterDetail";
                            return;
                        }, 700);
                    }
                    else {
                        return;
                    }
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_2 = scene.getChildByName("detail");
                    if (ui_2 == null || ui_2.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_2['groupTeach'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 200);
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                    if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](3) == true) {
                        if (ui['btnFate3'].enabled) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnFate3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate3']);
                            zj.Teach.addOnceEvent(ui['btnFate3']);
                        }
                        else {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnFate3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate3']);
                            zj.Teach.addOnceEvent(ui['btnFate3']);
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(12);
                    }
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_3 = scene.getChildByName("detail");
                    if (ui_3 == null || ui_3.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_3['btnActive']);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_3['btnActive'], true, true, false, 1, 0.7, false, false);
                        zj.Teach.addOnceEvent(ui_3['btnActive']);
                    }, 100);
                }
                else if (curStep_ == 12) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                    if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](4) == true) {
                        if (ui['btnFate4'].enabled) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnFate4'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate4']);
                            zj.Teach.addOnceEvent(ui['btnFate4']);
                        }
                        else {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnFate4'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate4']);
                            zj.Teach.addOnceEvent(ui['btnFate4']);
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(14);
                    }
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_4 = scene.getChildByName("detail");
                    if (ui_4 == null || ui_4.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_4['btnActive']);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_4['btnActive'], true, true, false, 1, 0.7, false, false);
                        zj.Teach.addOnceEvent(ui_4['btnActive']);
                    }, 100);
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 15) {
                    // Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_5 = scene.getChildByName("detail");
                    zj.Teach.addMask();
                    setTimeout(function () {
                        var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                        if (generalsMap[ui_5['generalId']].step < 1 && ui_5['btnPromtion'].enabled == true && zj.Game.PlayerInfoSystem.BaseInfo.money >= Number(ui_5['labelGold'].text)) {
                            zj.Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_5['btnPromtion'], true, true, false, 1, 0.7, false, false, true);
                            if (ui_5['btnPromtion'].enabled) {
                                zj.Teach.addOnceEvent(ui_5['btnPromtion']);
                            }
                            else {
                                ui_5['btnPromtion'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                    zj.Teach.setOperateTeachStep(22);
                                }, null);
                            }
                        }
                        else {
                            zj.Teach.removeMask();
                            zj.Teach.SaveTeachPart();
                            zj.Teach.SaveTeachPartLocal(curPart_);
                            zj.Teach.setOperateTeachStep(21);
                        }
                    }, 300);
                }
                else if (curStep_ == 16) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) {
                    zj.Teach.addMask();
                    var _a = zj.Teach.GetDstUI("zj.HunterUpAdvanced"), ui_6 = _a[0], bLoading = _a[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterUpAdvanced";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui_6['groupAttributes'].visible == true) {
                        setTimeout(function () {
                            zj.Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_6['mainGroup'], true, true, false, 0, 0.7, false, false, true);
                            ui_6.once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                                zj.Teach.addOperateTeachStep();
                            }, null);
                        }, 200);
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 18) {
                    zj.Game.UIManager.GroupTeachUI.removeChildren();
                    zj.Teach.setOperateTeachStep(21);
                }
                else if (curStep_ == 19) {
                    zj.Teach.delTouchTipSpx();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    zj.Teach.removeMask();
                    var _b = zj.Teach.GetDstUI("zj.HunterMainScene"), ui = _b[0], bLoading = _b[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeSceneName = "zj.HunterMainScene";
                        return;
                    }
                }
                else if (curStep_ == 21) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 1003) {
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, "zj.ArenaMainScene", "btnHunterCambatfield", "rectHunterCambatfield");
                }
                else if (curStep_ == 4) {
                    var _c = zj.Teach.GetDstUI("zj.ArenaMainScene"), ui = _c[0], bLoading = _c[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.ArenaMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnLadder'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnLadder']);
                    zj.Teach.addOnceEvent(ui['btnLadder']);
                }
                else if (curStep_ == 5) {
                    var _d = zj.Teach.GetDstUI("zj.ArenaLadder"), ui_7 = _d[0], bLoading = _d[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.ArenaLadder";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_7['scroll'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 500);
                }
                else if (curStep_ == 6) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getitemList']();
                    if (ui['rivalItems'].length == 0)
                        return;
                    // 是否有攻打次数 是否在冷却中
                    var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
                    if (ui['buttonState'] != 2 /* ButtonBuy */ && info != null && info.leftTime > 0) {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.EndCurPart(false);
                        zj.Teach.SaveTeachPartLocal(curPart_);
                    }
                    else {
                        var item = ui['rivalItems'][ui['rivalItems'].length - 1];
                        if (item['btnFight'].visible) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(item['btnFight'], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(item['btnFight']);
                            zj.Teach.addOnceEvent(item['btnFight']);
                        }
                        else {
                            zj.Teach.setOperateTeachStep(18);
                        }
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topDialog();
                    zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 8) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.teachingNow = false;
                    var ui_8 = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui_8) == "zj.CommonFormatePveMain") {
                        setTimeout(function () {
                            ui_8['down']['getItemList']();
                            zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                            zj.Teach.Format_ClickIdx(1, null, null);
                        }, 1000);
                    }
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        zj.Teach.Format_ClickIdx(2, null, null);
                    }, 300);
                }
                else if (curStep_ == 15) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        zj.Teach.Format_ClickIdx(3, null, null);
                    }, 300);
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        zj.Teach.Format_ClickIdx(4, null, null);
                    }, 300);
                }
                else if (curStep_ == 17) {
                    var ui = zj.Game.UIManager.topDialog(); // CommonFormatePveMain
                    if (zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals[0] == 0) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                        zj.Teach.addOnceEvent(ui['ButtonFight']);
                    }
                }
                else if (curStep_ == 18) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1004) {
                if (curStep_ == 0) {
                    zj.Teach.removeMask();
                    var _e = zj.Teach.GetDstUI("zj.ArenaLadder"), ui_9 = _e[0], bLoading = _e[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.ArenaLadder";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_9['listGeneral'], true, true, false, 0, 0.7, false, false, false, false, [0.7, 0.7]);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 1) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.setOperateTeachStep(14);
                }
                else if (curStep_ == 2) {
                    var ui = zj.Game.UIManager.topDialog(); // ArenaLadder
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnFormat'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFormat']);
                    zj.Teach.addOnceEvent(ui['btnFormat']);
                }
                else if (curStep_ == 3) {
                    var _f = zj.Teach.GetDstUI("zj.CommonFormationPvpArena"), ui = _f[0], bLoading = _f[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listTableViewMine'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 4) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupAll'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 5) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnConfirimTean'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnConfirimTean']);
                    zj.Teach.addOnceEvent(ui['btnConfirimTean']);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    var _g = zj.Teach.GetDstUI("zj.ArenaLadder"), ui = _g[0], bLoading = _g[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    if (ui['btnRule'].visible == false) {
                        zj.Teach.setOperateTeachStep(11);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnRule'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnRule']);
                        zj.Teach.addOnceEvent(ui['btnRule']);
                    }
                }
                else if (curStep_ == 8) {
                    var _h = zj.Teach.GetDstUI("zj.Common_RuleDialog"), ui = _h[0], bLoading = _h[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupView'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btClose']);
                }
                else if (curStep_ == 10) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    var _j = zj.Teach.GetDstUI("zj.ArenaLadder"), ui = _j[0], bLoading = _j[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnShop'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnShop']);
                    zj.Teach.addOnceEvent(ui['btnShop']);
                }
                else if (curStep_ == 12) {
                    var _l = zj.Teach.GetDstUI("zj.ShopMallDialog"), ui = _l[0], bLoading = _l[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listGoods'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 13) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1005) {
                if (curStep_ < 4) {
                    // 因为日常任务有跳转 如果网络不好的情况 会导致网络回来打开公会界面延迟
                    // if (GameCommon.IsLock("Net")) return;
                    if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0) {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.EndCurPart(true);
                    }
                    else {
                        if (zj.Game.UIManager.topDialog() == null) {
                            zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, ["zj.LeagueChooseScene", "zj.LeagueMain"], "btnUnion", "rectUnion");
                        }
                        else {
                            zj.Teach.removeMask();
                            zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                            zj.Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                }
                else if (curStep_ == 4) {
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueChooseScene") {
                        zj.Teach.ProcTeachStory();
                    }
                    else {
                        zj.Teach.openSceneName = "zj.LeagueChooseScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1007) {
                zj.Teach.removeMask();
                zj.Teach.SaveTeachPart();
                zj.Teach.SaveTeachPartLocal(curPart_);
                zj.Teach.EndCurPart(false);
                // Teach.GoWonderland(curStep_, true, (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs || zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_NPC)), 1, 1007);
            }
            else if (curPart_ == 6003) {
                // if (curStep_ == 0) {
                //     let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.WonderLandChoose";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (zj.Game.PlayerWonderLandSystem.wonderlandId != 1) {
                //         Teach.setOperateTeachStep(17);
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 1) {
                //     Teach.addMask();
                //     let hasClick = Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isCollectFruit, function (k, v) {
                //         return v == zj.Game.PlayerWonderLandSystem.wonderlandId;
                //     });
                //     if (hasClick) { // --采集过去兑换
                //         Teach.setOperateTeachStep(6);
                //     }
                //     else {
                //         let scene = StageSceneManager.Instance.GetCurScene();
                //         scene.goNearTree();
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 2) {
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     let tree = scene.getNearTree();
                //     let rect = tree.getVisibleRt();
                //     let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                //         x: rect.x,
                //         y: rect.y - rect.height,
                //         width: rect.width,
                //         height: rect.height
                //     };
                //     Teach.removeMask();
                //     if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                //     scene.once(egret.TouchEvent.TOUCH_END, () => {
                //         // Teach.bAsyncContinue = true;
                //         Teach.addOperateTeachStep();
                //     }, null);
                // }
                // else if (curStep_ == 3) { // 采果子协议
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     Teach.setStopTeachUpdata(true);
                //     Teach.setTeaching(true);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 4) { // 确认领取
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                //     Teach.addOnceEvent(ui['btnClose']);
                // }
                // else if (curStep_ == 5) { // 引导对话
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(ui) != "zj.WonderLandChoose") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(ui);
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 6) { // 仙境 走向果实兑换者
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     scene.goToNpc(1035);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 7) { // 聚焦果实兑换者
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     let npc = scene.getNpcById(1035);
                //     if (npc == null) {
                //         Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC)
                //         Teach.SaveTeachPart()
                //         Teach.SaveTeachPartLocal(6003);
                //         Teach.setOperateTeachStep(15)
                //     }
                //     else {
                //         let rect = npc.getVisibleRt();
                //         let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                //             x: rect.x,
                //             y: rect.y - rect.height,
                //             width: rect.width,
                //             height: rect.height
                //         };
                //         Teach.removeMask();
                //         if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                //         scene.once(egret.TouchEvent.TOUCH_END, () => {
                //             Teach.delTouchTipSpx();
                //         }, null);
                //         Teach.openDialogName = "zj.ExchangeMainSence";
                //         return;
                //     }
                // }
                // else if (curStep_ == 8) { // 判断兑换,聚焦对应左侧列表
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.ExchangeMainSence");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.ExchangeMainSence";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 9) {
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let [canConvert, button_name] = ui['CheckTeach'](10001);
                //     if (!canConvert) {
                //         Teach.delTouchTipSpx();
                //         Teach.SaveTeachPart(false, teachBattle.teachPartID_WONDER_NPC)
                //         Teach.SaveTeachPartLocal(6003);
                //         Teach.SaveTeachPart(false, 1007);
                //         Teach.SaveTeachPartLocal(1007);
                //         Teach.setOperateTeachStep(15)
                //     }
                //     else {
                //         if (button_name == null) {
                //             Teach.addOperateTeachStep();
                //         }
                //         else {
                //             if (Teach.isHaveTip() == true) Teach._reuse_rect(ui[button_name], true, true, false, 1, 0.7, false, false);
                //             zj.Game.UIManager.setMaskAttachedTapObj(ui[button_name]);
                //             Teach.addOnceEvent(ui[button_name]);
                //         }
                //     }
                // }
                // else if (curStep_ == 10) { // 聚焦对应子项
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let index = ui['FindIndexById'](10001);
                //     if (index == null) {
                //         Teach.delTouchTipSpx();
                //         Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC);
                //         Teach.SaveTeachPart();
                //         Teach.SaveTeachPartLocal(curPart_);
                //         Teach.setOperateTeachStep(15);
                //     }
                //     else {
                //         (<eui.Scroller>ui['scrollerGoods']).scrollPolicyV = eui.ScrollPolicy.OFF;
                //         ui['getItemList']();
                //         if (ui['itemList'][index]) {
                //             if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][index], true, true, false, 1, 0.7, false, false);
                //             zj.Game.UIManager.setMaskAttachedTapObj(ui['listGood']);
                //             Teach.addOnceEvent(ui['listGood']);
                //         }
                //     }
                // }
                // else if (curStep_ == 11) { // 聚焦兑换按钮
                //     Teach.addMask();
                //     let dialog: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let ui = dialog['groupRight'].getChildByName('rightui');
                //     if (ui == null) {
                //         Teach.openUiName = "zj.ExchangeMainRight";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonExchange'], true, true, false, 1, 0.7, false, false, true);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonExchange']);
                //     Teach.addOnceEvent(ui['buttonExchange']);
                // }
                // else if (curStep_ == 12) { // 等待动画结束
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC);
                //     Teach.delTouchTipSpx();
                //     Teach.SaveTeachPart();
                //     Teach.SaveTeachPartLocal(curPart_);
                //     Teach.SaveTeachPart(null, 1007);
                //     Teach.SaveTeachPartLocal(1007);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 13) { // 获得物品
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['lstItem'], true, true, false, 0, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                // }
                // else if (curStep_ == 14) { // 领取
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                //     // Teach.addOnceEvent(ui['btnClose']);
                //     Teach.closeDialogName = "zj.CommonGetDialog";
                //     return;
                // }
                // else if (curStep_ == 15) { // 关闭兑换
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     setTimeout(function () {
                //         if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonReturn'], true, true, false, 1, 0.7, false, false);
                //         zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonReturn']);
                //         // Teach.addOnceEvent(ui['buttonReturn']);
                //         Teach.addOnceEvent(ui);
                //     }, 200);
                // }
                // else if (curStep_ == 16) { // 
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     ui['onButtonClsse']();
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 17) { // 对话
                //     let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                //     if (bLoading) {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 18) {
                //     Teach.removeMask();
                //     Teach.delTouchTipSpx();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     Teach.SaveTeachPart(false, 1007);
                //     Teach.SaveTeachPart(false, 6003);
                //     Teach.SaveTeachPartLocal(1007);
                //     Teach.SaveTeachPartLocal(6003);
                //     if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                //         Teach.removeMask();
                //         scene.WonderlandEnter_Req(2);
                //     }
                //     Teach.removeMask();
                //     Teach.delTouchTipSpx();
                //     Teach.EndCurPart(false);
                // }
                zj.Teach.removeMask();
                zj.Teach.delTouchTipSpx();
                zj.Teach.SaveTeachPart();
                zj.Teach.SaveTeachPartLocal(curPart_);
                zj.Teach.EndCurPart(false);
            }
            else if (curPart_ == 1008) {
                if (curStep_ == 0) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        zj.Teach.openDialogName = "zj.MoraMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['SetTeach']();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (ui['group3'].visible == true) {
                        zj.Teach.setOperateTeachStep(11);
                        return;
                    }
                    else if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null && zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != 0) {
                        zj.Teach.setOperateTeachStep(14);
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listMy'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 2) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listEnemy'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (ui['group3'].visible == true) {
                        zj.Teach.setOperateTeachStep(11);
                    }
                    else if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null && zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != 0) {
                        zj.Teach.setOperateTeachStep(14);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 4) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonStartMora'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonStartMora']);
                    zj.Teach.addOnceEvent(ui['buttonStartMora']);
                }
                else if (curStep_ == 5) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['group3'].visible == false || ui['buttonGetAward'].enabled == false) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 7) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['buttonMoraAgain'].enabled) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['buttonMoraAgain'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonMoraAgain']);
                        zj.Teach.addOnceEvent(ui['buttonMoraAgain']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonGetAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonGetAward']);
                    zj.Teach.addOnceEvent(ui['buttonGetAward']);
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    var _m = zj.Teach.GetDstUI("zj.CommonGetDialog"), ui = _m[0], bLoading = _m[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonGetDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.CommonGetDialog") {
                        zj.Teach.openDialogName = "zj.CommonGetDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.setStopTeachUpdata(true);
                    zj.Teach.setTeaching(true);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonViewAward'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonViewAward']);
                    zj.Teach.addOnceEvent(ui['buttonViewAward']);
                }
                else if (curStep_ == 15) {
                    zj.Teach.addMask();
                    var _o = zj.Teach.GetDstUI("zj.MoraMainAwardDialog"), ui_10 = _o[0], bLoading = _o[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.MoraMainAwardDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_10['listViewList'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 350);
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainAwardDialog") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    zj.Teach.addOnceEvent(ui['buttonClose']);
                }
                else if (curStep_ == 17) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    var _p = zj.Teach.GetDstUI("zj.MoraMainScene"), ui = _p[0], bLoading = _p[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    zj.Teach.addOnceEvent(ui['buttonClose']);
                }
                else if (curStep_ == 20) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1009) {
                zj.Teach.GoWonderland(curStep_, true, (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs || zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_1)), 4, 1009);
            }
            else if (curPart_ == 6001) {
                if (curStep_ == 0) {
                    var _q = zj.Teach.GetDstUI("zj.WonderLandChoose"), ui = _q[0], bLoading = _q[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.WonderLandChoose";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs) {
                        zj.Teach.setOperateTeachStep(18);
                    }
                    else if (scene.getNearMob() == null) {
                        scene.goNearTree();
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 2) {
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    var tree = scene.getNearTree();
                    var rect = tree.getVisibleRt();
                    var xywh = {
                        x: rect.x,
                        y: rect.y - rect.height,
                        width: rect.width,
                        height: rect.height
                    };
                    zj.Teach.removeMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                    scene.once(egret.TouchEvent.TOUCH_END, function () {
                        zj.Teach.delTouchTipSpx();
                        zj.Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    scene.collectNearTree();
                    zj.Teach.setStopTeachUpdata(true);
                    zj.Teach.setTeaching(true);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.WonderLandChoose") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var hasClick = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isCollectFruit, function (k, v) {
                        return v == zj.Game.PlayerWonderLandSystem.wonderlandId;
                    });
                    if (hasClick && ui['btnFruit'].visible == false) {
                        // 已经使用过果子，就不再出果子了，直接去打怪
                        zj.Teach.setOperateTeachStep(9);
                    }
                    else {
                        // 没使用过果子，等待引导使用果子
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    zj.Teach.addMask();
                    var _r = zj.Teach.GetDstUI("zj.WonderLandChoose"), ui = _r[0], bLoading = _r[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    zj.Teach.addMask();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    var _s = zj.Teach.GetDstUI("zj.WonderLandChoose"), ui = _s[0], bLoading = _s[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    scene.goNearMob();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    // 没有怪再走一遍流程
                    if (scene.getNearMob() == null) {
                        zj.Teach.setOperateTeachStep(1);
                    }
                    else {
                        var tree = scene.getNearMob();
                        var rect = tree.getVisibleRt();
                        var xywh = {
                            x: rect.x,
                            y: rect.y - rect.height,
                            width: rect.width,
                            height: rect.height
                        };
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                        scene.once(egret.TouchEvent.TOUCH_END, function () {
                            // Teach.bAsyncContinue = true;
                            zj.Teach.delTouchTipSpx();
                            zj.Teach.addOperateTeachStep();
                        }, null);
                    }
                }
                else if (curStep_ == 11) {
                    zj.Teach.SaveTeachPart(false, zj.teachBattle.teachPartID_WONDER_ENTER_1);
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.SaveTeachPart(false, zj.teachBattle.teachPartID_WONDER_ENTER_3);
                    zj.Teach.SaveTeachPartLocal(zj.teachBattle.teachPartID_WONDER_ENTER_3);
                    zj.Teach.SaveTeachPart(false, 1009);
                    zj.Teach.SaveTeachPart(false, 6001);
                    zj.Teach.SaveTeachPartLocal(1009);
                    zj.Teach.SaveTeachPartLocal(6001);
                    if (zj.Device.fastBattleSwitch) {
                        // 快速战斗开启
                        zj.Teach.setOperateTeachStep(18);
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    var ui_11 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                            zj.Teach.addMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_11['lstItem'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                        else if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueWarPop") {
                            zj.Teach.addMask();
                            zj.Teach.setOperateTeachStep(15);
                        }
                        else {
                            zj.Teach.openDialogName = "zj.LeagueWarPop" || "zj.CommonGetDialog";
                            zj.Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }, 500);
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    var _t = zj.Teach.GetDstUI("zj.CommonGetDialog"), ui = _t[0], bLoading = _t[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonGetDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    ui['onBtnClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) {
                    zj.Teach.addMask();
                    var ui_12 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueWarPop") {
                            if (ui_12['isEndL'] && ui_12['isEndR']) {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_12['groupTeach'], true, true, false, 0, 0.6, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                            }
                            else {
                                zj.Teach.needIsEndAni = true;
                                return;
                            }
                        }
                        else if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                            zj.Teach.setOperateTeachStep(12);
                        }
                    }, 500);
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.LeagueWarPop") {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['ButtonSwitch'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonSwitch']);
                        zj.Teach.addOnceEvent(ui['ButtonSwitch']);
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.CommonGetDialog") {
                        zj.Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 17) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 18) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.WonderLandChoose") {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 19) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 20) {
                    zj.Teach.addMask();
                    var scene = zj.StageSceneManager.Instance.GetCurScene();
                    var _u = zj.Teach.GetDstUI("zj.WonderLandChoose"), ui = _u[0], bLoading = _u[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                        zj.Game.PlayerWonderLandSystem.wonderlandId = 3;
                        zj.Teach.removeMask();
                        scene.WonderlandEnter_Req(3);
                    }
                    zj.Teach.SaveTeachPart(false, 1009);
                    zj.Teach.SaveTeachPart(false, 6001);
                    zj.Teach.SaveTeachPartLocal(1009);
                    zj.Teach.SaveTeachPartLocal(6001);
                    zj.Teach.EndCurPart(false);
                    zj.SceneManager.teachId = null;
                }
            }
            else if (curPart_ == 1010) {
                if (curStep_ == 0) {
                    var _w = zj.Teach.GetDstUI("zj.FishingMain"), ui = _w[0], bLoading = _w[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.FishingMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui == null) {
                        zj.Teach.openDialogName = "zj.FishingMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.PlayerVIPSystem.Level().league_fishing == zj.Game.PlayerVIPSystem.vipInfo.league_fishing && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                        // 无钓鱼次数且可下竿（退出）
                        zj.Teach.setOperateTeachStep(4);
                    }
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0) {
                        // 钓鱼中(退出)
                        zj.Teach.setOperateTeachStep(4);
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length != 0) {
                        // 可领取(领取，退出)
                        zj.Teach.setOperateTeachStep(5);
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                        // 可下杆（刷新，下杆，退出）
                        if (zj.CommonConfig.league_fishing_free_refresh > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh) {
                            // 免费
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnFresh'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFresh']);
                            zj.Teach.addOnceEvent(ui['btnFresh']);
                        }
                        else {
                            // 收费
                            var cost = zj.CommonConfig.league_fishing_refresh_money;
                            if (zj.Game.PlayerInfoSystem.BaseInfo.money >= cost) {
                                //  金钱足够（聚焦刷新）
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui['btnFresh'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFresh']);
                                zj.Teach.addOnceEvent(ui['btnFresh']);
                            }
                            else {
                                //  金币不足（下杆）
                                zj.Teach.setOperateTeachStep(2);
                            }
                        }
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
                        // 可收杆（收杆，领奖，退出）
                        zj.Teach.setOperateTeachStep(6);
                    }
                }
                else if (curStep_ == 2) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnPush'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnPush']);
                    zj.Teach.addOnceEvent(ui['btnPush']);
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 4) {
                    zj.Teach.addMask();
                    var ui_13 = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_13['btnClose'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_13['btnClose']);
                        zj.Teach.addOnceEvent(ui_13['btnClose']);
                    }, 200);
                }
                else if (curStep_ == 5) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (ui['btnPull'].visible == false || ui['btnPull'].enabled == false) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnPull'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnPull']);
                    zj.Teach.addOnceEvent(ui['btnPull']);
                }
                else if (curStep_ == 7) {
                    var _x = zj.Teach.GetDstUI("zj.FishingEnd"), ui = _x[0], bLoading = _x[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.FishingEnd";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnGet'].visible == false) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    // 聚焦收了或者奖励翻倍
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var cost = zj.CommonConfig.refresh_double_token(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_double_time + 1);
                    if (zj.Game.PlayerInfoSystem.BaseInfo.token >= cost) {
                        // 可以翻倍
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnDouble'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDouble']);
                        zj.Teach.addOnceEvent(ui['btnDouble']);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnGet'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGet']);
                        zj.Teach.addOnceEvent(ui['btnGet']);
                    }
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getDefinitionByName(ui) != "zj.FishingMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.setOperateTeachStep(4);
                }
            }
            else if (curPart_ == 1011) {
                if (curStep_ < 4) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER, "zj.SkyAreanMainScene", "btnSkyArena", "rectSkyArena");
                }
                else if (curStep_ == 4) {
                    var _y = zj.Teach.GetDstUI("zj.SkyAreanMainScene"), ui = _y[0], bLoading = _y[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.SkyAreanMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['scrollerPassAward'], true, true, false, 0, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonChange'], true, true, false, 0, 0.7, false, false, false, true);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonChange']);
                    ui['buttonChange'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Teach.delTouchTipSpx();
                        zj.Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 7) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1015) {
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED, "zj.WantedSecondMeteorstanceScene", "btnMeteorStreet", "rectMeteorStreet");
                }
                else if (curStep_ == 4) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    var _z = zj.Teach.GetDstUI("zj.WantedSecondMeteorstanceScene"), ui = _z[0], bLoading = _z[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.WantedSecondMeteorstanceScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui_14 = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_14['listSelectedBoss'], true, true, false, 0, 0.7, false, false, false, false, [0.7, 0.7]);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 600);
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listBoss'], true, true, false, 0, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false, false, false, [0.85, 0.85]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 9) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1016) {
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED, "zj.WantedSecondMeteorstanceScene", "btnMeteorStreet", "rectMeteorStreet");
                }
                if (curStep_ == 4) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    var _0 = zj.Teach.GetDstUI("zj.WantedSecondMeteorstanceScene"), ui = _0[0], bLoading = _0[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.WantedSecondMeteorstanceScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    var ui_15 = zj.Game.UIManager.topScene();
                    ui_15['getItemList']();
                    if (ui_15['itemList'][3] == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_15['itemList'][3], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_15['listSelectedBoss']);
                        zj.Teach.addOnceEvent(ui_15['listSelectedBoss']);
                    }, 500);
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listBossAward'], true, true, false, 1, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.removeMask();
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1019) {
                if (curStep_ == 0) {
                    zj.Teach.setOperateTeachStep(6);
                }
                else if (curStep_ == 1) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Game.PlayerAdviserSystem.petMap[ui['index']].step >= zj.CommonConfig.pet_step_max) {
                        zj.Teach.setOperateTeachStep(5);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnControlShow'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnControlShow']);
                        zj.Teach.addOnceEvent(ui['btnControlShow']);
                    }
                }
                else if (curStep_ == 3) {
                    var _1 = zj.Teach.GetDstUI("zj.PetEvolution"), ui = _1[0], bLoading = _1[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.PetEvolution";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) {
                    var ui = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        zj.Teach.ProcTeachStory();
                    }, 200);
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        ui['onBtnclose']();
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    var _2 = zj.Teach.GetDstUI("zj.PetMainScene"), top_1 = _2[0], bLoading = _2[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(top_1['btnRest'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(top_1['btnRest']);
                    zj.Teach.addOnceEvent(top_1['btnRest']);
                }
                else if (curStep_ == 6) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1021) {
                if (curStep_ < 6) {
                    var generals = zj.Game.PlayerHunterSystem.queryAllHunters();
                    generals.sort(function (a, b) {
                        return b.level - a.level;
                    });
                    zj.Teach.LevelUpToHero(curStep_, generals[0].general_id, null, true);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui_16 = zj.Game.UIManager.topScene();
                    ui_16['rectMask'].visible = true;
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_16['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                    }, 400);
                    setTimeout(function () {
                        ui_16['rectMask'].visible = false;
                        zj.Teach.openUiName = "zj.HunterDetail";
                        return;
                    }, 700);
                }
                else if (curStep_ == 7) {
                    zj.Teach.delTouchTipSpx();
                    var scene_1 = zj.Game.UIManager.topScene();
                    var ui = scene_1.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (scene_1['btnCollection'].visible) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(scene_1['btnCollection'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(scene_1['btnCollection']);
                            zj.Teach.addOnceEvent(scene_1['btnCollection']);
                        }, 300);
                    }
                }
                else if (curStep_ == 8) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listAttribute'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupActivation'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 13) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    var generalId = ui['generalId'];
                    var equipId_1 = zj.Game.PlayerHunterSystem.Table(generalId).equip_info[0];
                    var equipInfo = zj.TableGeneralEquip.Item(equipId_1);
                    var bEquip = zj.Table.FindF(zj.Game.PlayerHunterSystem.queryHunter(generalId).equipInfo, function (_k, _v) {
                        return _v.equipId == equipId_1;
                    });
                    var canEquip = equipInfo.compose_money <= zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                    if (zj.Game.PlayerHunterSystem.queryHunter(generalId).level >= zj.CommonConfig.general_equip_one_openlevel) {
                        if (!bEquip) {
                            if (canEquip) {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui['btnCompound'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCompound']);
                                zj.Teach.addOnceEvent(ui['btnCompound']);
                            }
                            else {
                                zj.Teach.setOperateTeachStep(21);
                            }
                        }
                        else {
                            zj.Teach.setOperateTeachStep(17);
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(21);
                    }
                }
                else if (curStep_ == 14) {
                    var _3 = zj.Teach.GetDstUI("zj.HunterCollectPopStep"), ui = _3[0], bLoading = _3[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterCollectPopStep";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) {
                    var _4 = zj.Teach.Dst_Hero(), ui = _4[0], bLoading = _4[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                    zj.Teach.addOnceEvent(ui['groupTeach']);
                }
                else if (curStep_ == 17) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("collection");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnIntensify'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnIntensify']);
                    zj.Teach.addOnceEvent(ui['btnIntensify']);
                }
                else if (curStep_ == 18) {
                    var _5 = zj.Teach.GetDstUI("zj.HunterCollectionStrength"), ui = _5[0], bLoading = _5[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterCollectionStrength";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 20) {
                    var ui = zj.Game.UIManager.topDialog();
                    var bMax = !ui['groupUpLevel'].visible;
                    var equipId = zj.PlayerHunterSystem.Table(ui['generalId']).equip_info[ui['index']];
                    var equipTbl = zj.TableGeneralEquip.Item(equipId);
                    var level = zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).equipInfo[ui['_id']].level;
                    var needGoods = equipTbl.uplevel_goods[level] || [];
                    var needCounts = equipTbl.uplevel_count[level] || [];
                    var needMoney = equipTbl.uplevel_money[level] || 0;
                    var canUpLevel = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY) >= needMoney;
                    for (var _i = 0, _6 = zj.HelpUtil.GetKV(needGoods); _i < _6.length; _i++) {
                        var _7 = _6[_i], k = _7[0], v = _7[1];
                        var itemSet = zj.PlayerItemSystem.Set(needGoods[k]);
                        if (itemSet.Count < needCounts[k]) {
                            canUpLevel = false;
                        }
                    }
                    if (bMax) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        if (canUpLevel) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnIntensify'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnIntensify']);
                            zj.Teach.addOnceEvent(ui['btnIntensify']);
                        }
                        else {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnIntensify'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                    }
                }
                else if (curStep_ == 21) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1020) {
                if (curStep_ < 4) {
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2, "zj.DarkLandHomeScene", "btnDarkContinent", "rectDarkContinent");
                }
                else if (curStep_ == 4) {
                    var _8 = zj.Teach.GetDstUI("zj.DarkLandHomeScene"), top_2 = _8[0], bLoading = _8[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.DarkLandHomeScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui_17 = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_17['groupTeach1'], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        ui_17.once(egret.TouchEvent.TOUCH_END, function () {
                            zj.Teach.setOperateTeachStep(8);
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 400);
                }
                else if (curStep_ == 7) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    var _9 = zj.Teach.GetDstUI("zj.RelicMain"), top_3 = _9[0], bLoading = _9[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.RelicMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['itemList'][ui['teachOpenIndex']] == null) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['teachOpenIndex'] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']]['imageBossPic'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][0]['imageBossPic'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 11) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['teachOpenIndex'] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']]['buttonAward'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemList'][ui['teachOpenIndex']]['buttonAward']);
                        zj.Teach.addOnceEvent(ui['itemList'][ui['teachOpenIndex']]['buttonAward']);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][0]['buttonAward'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemList'][0]['buttonAward']);
                        zj.Teach.addOnceEvent(ui['itemList'][0]['buttonAward']);
                    }
                }
                else if (curStep_ == 12) {
                    var _10 = zj.Teach.GetDstUI("zj.RelicAwardMain"), top_4 = _10[0], bLoading = _10[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.RelicAwardMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listTableView1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 15) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listTableView2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 16) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['onButtonClose']();
                    var _11 = zj.Teach.GetDstUI("zj.RelicMain"), top_5 = _11[0], bLoading = _11[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = "zj.RelicAwardMain";
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.setOperateTeachStep(22);
                }
                else if (curStep_ == 17) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['teachOpenIndex'] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listTableView']);
                        zj.Teach.addOnceEvent(ui['listTableView']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 24) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1017) {
                if (curStep_ < 4) {
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2, "zj.DarkLandHomeScene", "btnDarkContinent", "rectDarkContinent");
                }
                else if (curStep_ == 4) {
                    var _12 = zj.Teach.GetDstUI("zj.DarkLandHomeScene"), ui = _12[0], bLoading = _12[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.DarkLandHomeScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['SetTeachOpen']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    var ui = zj.Game.UIManager.topScene();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        ui['SetTeachClose']();
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) {
                    var ui_18 = zj.Game.UIManager.topScene();
                    var button_name = null;
                    button_name = ui_18['SetTeach'](5);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui_18[button_name], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTouchObj(ui_18);
                    ui_18.once(egret.TouchEvent.TOUCH_END, function () {
                        ui_18['onGroupEnd5']();
                        zj.Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 7) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    var _13 = zj.Teach.GetDstUI("zj.HXH_GroupFightMain"), ui = _13[0], bLoading = _13[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.HXH_GroupFightMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonLevel'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonLevel']);
                    zj.Teach.addOnceEvent(ui['buttonLevel']);
                }
                else if (curStep_ == 14) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['groupYinCang'].alpha == 1) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['listTableView'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 15) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['listAniClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    var ui_19 = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_19['buttonDropList'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_19['buttonDropList']);
                        zj.Teach.addOnceEvent(ui_19['buttonDropList']);
                    }, 200);
                }
                else if (curStep_ == 17) {
                    var _14 = zj.Teach.GetDstUI("zj.HXH_GroupFightDropInfo"), ui_20 = _14[0], bLoading = _14[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HXH_GroupFightDropInfo";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_20['listViewDrop'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 18) {
                    var _15 = zj.Teach.GetDstUI("zj.HXH_GroupFightMain"), ui = _15[0], bLoading = _15[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = "zj.HXH_GroupFightDropInfo";
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var times = zj.Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (_k, _v) {
                        return _k == zj.PlayerGroupFightSystem.fightGroupExt - 1;
                    })[0];
                    // let times: number = 1;
                    for (var _16 = 0, _17 = zj.HelpUtil.GetKV(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime); _16 < _17.length; _16++) {
                        var _18 = _17[_16], k = _18[0], v = _18[1];
                        if (k == zj.PlayerGroupFightSystem.fightGroupExt) {
                            times = zj.PlayerGroupFightSystem.fightGroupExt - 1;
                            break;
                        }
                    }
                    if (times == null) {
                        times = 0;
                    }
                    else {
                        times = times.value;
                    }
                    times = 0;
                    if (times >= 1) {
                        // 次数足够
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['buttonChallenge'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonChallenge']);
                        zj.Teach.addOnceEvent(ui['buttonChallenge']);
                    }
                    else {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.EndCurPart(false);
                    }
                }
                else if (curStep_ == 19) {
                    var _19 = zj.Teach.GetDstUI("zj.HXH_GroupFightFormate"), ui = _19[0], bLoading = _19[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    ui['SetTeach']();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 20) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 21) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonSet1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 22) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach3'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 23) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonSet3'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 24) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['uiState'] == 2) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['groupBoss1'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 25) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listFriendTeam'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 26) {
                    var ui_21 = zj.Game.UIManager.topScene();
                    ui_21['getItemList']();
                    if (ui_21['getListAllFri'][0] == null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_21['buttonSet3'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_21['buttonSet3']);
                        zj.Teach.addOnceEvent(ui_21['buttonSet3']);
                    }
                    else {
                        var hasBeenUsed = zj.Table.FindF(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed, function (_k, _v) {
                            return _v == ui_21['getListAllFri'][0]['dataItem'].info.baseInfo.id;
                        });
                        if (hasBeenUsed) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_21['buttonSet3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_21['buttonSet3']);
                            zj.Teach.addOnceEvent(ui_21['buttonSet3']);
                        }
                        else if (ui_21['getListAllFri'].bSelected) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_21.ButtonSet3, true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_21['buttonSet3']);
                            zj.Teach.addOnceEvent(ui_21['buttonSet3']);
                        }
                        else {
                            var useTime = zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
                            var allTime = zj.PlayerVIPSystem.Level().assist_time;
                            if (useTime >= allTime) {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_21['buttonSet3'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui_21['buttonSet3']);
                                zj.Teach.addOnceEvent(ui_21['buttonSet3']);
                            }
                            else {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_21['getListAllFri'][0]['buttonUse'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui_21['getListAllFri'][0]['buttonUse']);
                                zj.Teach.addOnceEvent(ui_21['getListAllFri'][0]['buttonUse']);
                            }
                        }
                    }
                }
                else if (curStep_ == 27) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 28) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui.uiState == 1) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['buttonfight'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonfight']);
                        zj.Teach.addOnceEvent(ui['buttonfight']);
                    }
                }
                else if (curStep_ == 29) {
                    var _20 = zj.Teach.GetDstUI("zj.HXH_GroupFightCombat"), ui = _20[0], bLoading = _20[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    ui['SetTeach']();
                    if (ui['buttonChange1'].visible) {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 30) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 31) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonChange1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonChange1']);
                    zj.Teach.addOnceEvent(ui['buttonChange1']);
                }
                else if (curStep_ == 32) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonCombat'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonCombat']);
                    zj.Teach.addOnceEvent(ui['buttonCombat']);
                }
                else if (curStep_ == 33) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.EndCurPart(false);
                    zj.Teach.SaveTeachPartLocal(curPart_);
                }
            }
            else if (curPart_ == 4001) {
                // -- 切换会主界面，保存进度
                // 去掉演示关特殊处理
                if (zj.Game.TeachSystem.isEndCommonAnimation == null || zj.Game.TeachSystem.isEndCommonAnimation == false) {
                    zj.Teach.needIsEndAni = true;
                    return;
                }
                else if (zj.Game.TeachSystem.isEndCommonAnimation == true) {
                    zj.Teach.setStopTeachUpdata(true);
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(true);
                    zj.Teach.teachingNow = false;
                    zj.SceneManager.instance.EnterMainCityNew();
                }
            }
            else if (curPart_ == 3001) {
                if (curStep_ < 4) {
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBuild(curStep_, 0, "zj.TavernScene", "btnPub", "rectPub");
                }
                else if (curStep_ == 4) {
                    var _21 = zj.Teach.GetDstUI("zj.TavernScene"), ui = _21[0], bLoading = _21[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.TavernScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    var _22 = zj.Teach.GetDstUI("zj.TavernScene"), ui_22 = _22[0], bLoading = _22[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.TavernScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui_22['setGroupVisible'](3);
                    var find_KULAPIKA = zj.Table.FindF(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_k, _v) {
                        return zj.PlayerHunterSystem.GetGeneralId(_v.general_id) == this._ID_WUTONG;
                    });
                    if (find_KULAPIKA /* || zj.Game.PlayerInfoSystem.BaseInfo.soda < 1*/) {
                        zj.Teach.setOperateTeachStep(13);
                        return;
                    }
                    else if (zj.Game.PlayerInfoSystem.BaseInfo.soda >= 1) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_22['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_22['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                        ui_22['groupTeachSoda'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            ui_22['reqFindHero'](4, 1);
                        });
                    }
                }
                else if (curStep_ == 6) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['_teach_pop']) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['group5'].visible) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDrinkOneSoda']);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnDrinkOneSoda'], true, true, false, 1, 0.7, false, false);
                    }
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['onBtnDrinkOneSoda']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    if (scene.getChildByName("getGeneral") != null) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.openUiName = "getGeneral";
                        return;
                    }
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("getGeneral");
                    if (ui == null || ui == undefined) {
                        zj.Teach.openUiName = "getGeneral";
                        return;
                    }
                    if (ui['imageHunLevel'].visible == false) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    console.log("——————————————————————————" + "新手引导剧情对话bFinish: " + zj.Story.bFinish + "——————————————————————————");
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) {
                    var scene = zj.Game.UIManager.topScene(); // 酒馆
                    if (scene.getChildByName("getGeneral") != null) {
                        var ui = scene.getChildByName("getGeneral");
                        ui['onGroupParent']();
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 12) {
                    var _23 = zj.Teach.GetDstUI("zj.TavernGet"), ui = _23[0], bLoading = _23[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.TavernGet";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                    var btn = ui['btnClose'];
                    zj.Teach.closeDialogName = "zj.TavernGet";
                    return;
                }
                else if (curStep_ == 13) {
                    var _24 = zj.Teach.GetDstUI("zj.TavernScene"), ui = _24[0], bLoading = _24[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.TavernScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['setGroupVisible'](2);
                    var find_BANZANG = zj.Table.FindF(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_k, _v) {
                        return zj.PlayerHunterSystem.GetGeneralId(_v.general_id) == this._ID_SACI;
                    });
                    if (find_BANZANG || !(zj.Game.PlayerInfoSystem.BaseInfo.beer > 0 || zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer == false)) {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(20);
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 14) {
                    var ui = zj.Game.UIManager.topScene();
                    var aa = ui.getChildByName("tavernmask");
                    if (aa != null) {
                        ui.removeChild(aa);
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                }
                else if (curStep_ == 15) {
                    zj.Teach.addMask();
                    zj.Teach.SaveTeachPart();
                    var scene = zj.Game.UIManager.topScene();
                    if (scene.getChildByName("getGeneral") == null) {
                        zj.Teach.openUiName = "getGeneral";
                        return;
                    }
                    else {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("getGeneral");
                    if (ui == null || ui == undefined) {
                        zj.Teach.openUiName = "getGeneral";
                        return;
                    }
                    if (ui['imageHunLevel'].visible == false) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    console.log("——————————————————————————" + "新手引导剧情对话bFinish: " + zj.Story.bFinish + "——————————————————————————");
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 17) {
                    var scene = zj.Game.UIManager.topScene(); // 酒馆
                    if (scene.getChildByName("getGeneral") != null) {
                        var ui = scene.getChildByName("getGeneral");
                        ui['onGroupParent']();
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 18) {
                    var _25 = zj.Teach.GetDstUI("zj.TavernGet"), ui = _25[0], bLoading = _25[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.TavernGet";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                    var btn = ui['btnClose'];
                    zj.Teach.closeDialogName = "zj.TavernGet";
                    return;
                }
                else if (curStep_ == 19) {
                    zj.Teach.addMask();
                    var _26 = zj.Teach.GetDstUI("zj.TavernScene"), ui = _26[0], bLoading = _26[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.TavernScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    zj.Teach.addMask();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 21) {
                    zj.Teach.addMask();
                    var ui_23 = zj.Game.UIManager.topScene();
                    var aa = ui_23.getChildByName("tavernmask");
                    if (aa != null) {
                        ui_23.removeChild(aa);
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_23['btnReturn']);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_23['btnReturn'], true, true, false, 1, 0.7, false, false);
                        var btn = ui_23['btnReturn'];
                        zj.Teach.closeSceneName = "zj.TavernScene";
                        return;
                    }, 200);
                }
                else if (curStep_ == 22) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 3002) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToInstance(curStep_, null);
                }
                else if (curStep_ == 6) {
                    var _27 = zj.Teach.GetDstUI(zj.SceneManager.adventureClassStr), ui = _27[0], bLoading = _27[1];
                    zj.Teach.addMask();
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                    // ui['SetTeach']();
                    // if (ui['ani_end']) {
                    //     ui['ani_end'] = false;
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     // return;
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                }
                else if (curStep_ == 7) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 8) {
                    // Teach.addMask();
                    // let ui: any = zj.Game.UIManager.topScene();
                    // ui['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    // Teach.addMask();
                    // let ui: any = zj.Game.UIManager.topScene();
                    // // if (ui['topShadow'].visible == false) {
                    // if (ui['isAniEnd'] == true) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else { // 等待对话结束回调事件
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    // Teach.addMask();
                    var ui_24 = zj.Game.UIManager.topScene();
                    ui_24.SetMapCanTouch(false);
                    ui_24['btnCloseTop'].enabled = false;
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_24.sceneMap.getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        return;
                    }, 700);
                    ui_24.sceneMap.getAdventureById(1).once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    // let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    // ui['isLock'][0] = false;
                    // // if (ui['topShadow'].visible == false) {
                    // if (ui['isAniEnd'] == true) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    var adventureMapScene = zj.Game.UIManager.topScene();
                    // adventureMapScene['isLock'][0] = true;
                    adventureMapScene.SetMapCanTouch(true);
                    adventureMapScene['btnCloseTop'].enabled = true;
                    if (adventureMapScene == null) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (adventureMapScene.dialogInfo.parent.visible == false) {
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (adventureMapScene.dialogInfo.parent.visible == true) {
                        var ui = adventureMapScene.dialogInfo;
                        zj.Teach.addMask();
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['scrollerAdventure'], true, true, false, 0, 0.7, false, false, false, false, [1.2, 1.2]);
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 13) {
                    var adventure = zj.Game.UIManager.topScene();
                    if (!adventure.dialogInfo.parent.visible)
                        return;
                    adventure.dialogInfo['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(adventure.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                    if (adventure.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1]) {
                        adventure.dialogInfo['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.ON;
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var scene_2 = zj.Game.UIManager.topScene();
                    if (scene_2.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1]) {
                        setTimeout(function () {
                            zj.Teach.removeMask();
                            zj.Game.UIManager.setMaskAttachedTapObj(scene_2.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1].btnDekaron);
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(scene_2.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0].btnDekaron, true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                            zj.Teach.addOnceEvent(scene_2.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0].btnDekaron);
                        }, 200);
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 15) {
                    var _28 = zj.Teach.GetDstUI("zj.CommonFormatePveMain"), ui = _28[0], bLoading = _28[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    var ui_25 = zj.Game.UIManager.topDialog();
                    ui_25['down'].scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_25['groupDown'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 200);
                }
                else if (curStep_ == 19) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['down']['getItemList']();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        zj.Teach.Format_ClickIdx(1, null, this._ID_XIAOJIE);
                    }
                    else {
                        zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 21) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        zj.Teach.Format_ClickIdx(2, null, this._ID_WUTONG);
                    }
                }
                else if (curStep_ == 22) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        zj.Teach.Format_ClickIdx(3, null, this._ID_SACI);
                    }
                }
                else if (curStep_ == 23) {
                    for (var i = 0; i < zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL - 1].generals.length - 1; i++) {
                        if (zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL - 1].generals[i] == 0) {
                            zj.Teach.setOperateTeachStep(20);
                            return;
                        }
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 24) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui == null || egret.getQualifiedClassName(ui) != "zj.CommonFormatePveMain") {
                        zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['down'].scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                    ui['ButtonFight'].once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                    zj.Teach.closeDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 25) {
                    // Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 4002) {
                if (curStep_ == 0) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    if (ui['ButtonSend'] != null) {
                        ui['ButtonSend'].enabled = false;
                    }
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    if (fightScene['eStageState'] == 2) {
                        zj.Teach.setOperateTeachStep(17);
                        return;
                    }
                    var bTag = false;
                    var general_id = 0;
                    for (var _29 = 0, _30 = zj.HelpUtil.GetKV(ui.tableRoles); _29 < _30.length; _29++) {
                        var _31 = _30[_29], k = _31[0], v = _31[1];
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id = v['eTeamNum'] + 1;
                            break;
                        }
                    }
                    if (bTag) {
                        fightScene['pauseAll']();
                        zj.Teach.origChild = ui['tableTouch'][general_id];
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['tableTouch'][general_id], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 2) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui_26 = fightScene['mainmenu']['roleMsg'];
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    if (fightScene['eStageState'] == 2) {
                        zj.Teach.setOperateTeachStep(17);
                        return;
                    }
                    // 技能好了发招
                    var bTag = false;
                    var general_id_1 = 0;
                    for (var _32 = 0, _33 = zj.HelpUtil.GetKV(ui_26.tableRoles); _32 < _33.length; _32++) {
                        var _34 = _33[_32], k = _34[0], v = _34[1];
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id_1 = v['eTeamNum'] + 1;
                            break;
                        }
                    }
                    if (bTag) {
                        zj.Teach.setLimitOperate(true);
                        zj.Teach.setLimitOperate(false);
                        fightScene['pauseAll']();
                        zj.Teach.origChild = ui_26['tableTouch'][general_id_1];
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_26['tableTouch'][general_id_1], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        }, 150);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 4) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    // 限制操作
                    zj.Teach.setLimitOperate(true);
                    if (fightScene['isWin']()) {
                        zj.Teach.setOperateTeachStep(8);
                        return;
                    }
                    if (fightScene['eStageState'] == 2) {
                        zj.Teach.setOperateTeachStep(17);
                        return;
                    }
                    if (fightScene.comboLv >= 4 && fightScene['comboEffect']['isTeach']() == true) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 5) {
                    zj.Teach.PauseAddStep();
                }
                else if (curStep_ == 6) {
                    var fightScene_1 = zj.Game.UIManager.topScene();
                    if (fightScene_1['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(fightScene_1['comboEffect']['spriteBg'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep()); // 聚焦无双
                    }, 200);
                }
                else if (curStep_ == 7) {
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 8) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui_27 = fightScene['mainmenu']['roleMsg'];
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    if (fightScene.eStageState == 2) {
                        zj.Teach.setOperateTeachStep(17);
                        return;
                    }
                    // 技能好了发招
                    var bTag = false;
                    var general_id_2 = 0;
                    for (var _35 = 0, _36 = zj.HelpUtil.GetKV(ui_27['tableRoles']); _35 < _36.length; _35++) {
                        var _37 = _36[_35], k = _37[0], v = _37[1];
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id_2 = v['eTeamNum'] + 1;
                            break;
                        }
                    }
                    if (bTag) {
                        zj.Teach.setLimitOperate(true);
                        zj.Teach.setLimitOperate(false);
                        fightScene['pauseAll']();
                        zj.Teach.origChild = ui_27['tableTouch'][general_id_2];
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_27['tableTouch'][general_id_2], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        }, 150);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 14) {
                    zj.Teach.removeMask();
                    var fightScene_2 = zj.Game.UIManager.topScene();
                    if (fightScene_2['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene_2['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene_2['mainmenu']['roleMsg'];
                    if (fightScene_2['eStageState'] == 1 && fightScene_2['checkAllFriendIsState'](zj.TableEnum.TableEnumOtherState.OtherState_None)) {
                        if (zj.Gmgr.Instance.bPause == false) {
                            setTimeout(function () {
                                fightScene_2['pauseAll']();
                                zj.Teach.setOperateTeachStep(15);
                            }, 1000);
                        }
                        else if (fightScene_2['eStageState'] == 2) {
                            zj.Teach.setOperateTeachStep(17);
                        }
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 15) {
                    var fightScene = zj.Game.UIManager.topScene();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) {
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 17) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    fightScene['resumeAll']();
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    if (ui['ButtonSend'] != null) {
                        ui['ButtonSend'].enabled = false;
                    }
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    var key = void 0;
                    for (var k in fightScene['tableAllys']) {
                        if (zj.PlayerHunterSystem.GetGeneralId(Number(k)) == this._ID_XIAOJIE) {
                            key = Number(k);
                        }
                    }
                    if (key == null) {
                        zj.Teach.setOperateTeachStep(20); // 跳转结束
                        return;
                    }
                    // 凯特上场
                    var ret = fightScene['tableAllys'][key];
                    var blood = ret['getHp']() / ret['getMaxHp']();
                    if (ret['relySupportRole'] == null) {
                        zj.Teach.setOperateTeachStep(20);
                        return;
                    }
                    if (blood <= 0.3 || ret['getRage']() == ret['relySupportRole']['getSupportConsume']()) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 18) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    var auto = true; // 是否在自动战斗
                    if (zj.Gmgr.Instance.bFightAuto == false) {
                        if (ui['autoAni'] != null) {
                            auto = false;
                        }
                    }
                    else {
                        if (ui['autoAni'] != null) {
                            auto = true;
                        }
                    }
                    var general_index = null;
                    for (var _38 = 0, _39 = zj.HelpUtil.GetKV(ui['tableRoles']); _38 < _39.length; _38++) {
                        var _40 = _39[_38], k = _40[0], v = _40[1];
                        if (zj.PlayerHunterSystem.GetGeneralId(k) == this._ID_XIAOJIE) {
                            general_index = v['eTeamNum'] + 1;
                        }
                    }
                    zj.Teach.origChild = ui['tableHead']['general_index'];
                    if (!auto) {
                        var key = void 0;
                        for (var k in fightScene['tableAllys']) {
                            if (zj.PlayerHunterSystem.GetGeneralId(Number(k)) == this._ID_XIAOJIE) {
                                key = Number(k);
                            }
                        }
                        // 凯特上场
                        var ret = fightScene.tableAllys[key];
                        if (ret['getRage']() == ret['relySupportRole']['getSupportConsume']()) {
                            fightScene['pauseAll']();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['tableSupportHead'][general_index], true, true, false, 1, 0.7, false, false);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['tableSupportHead'][general_index]);
                            zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                            ui.once(egret.TouchEvent.TOUCH_END, function () {
                                zj.Teach.addTeaching();
                            }, null);
                            // Teach.setOperateTeachStep(22);
                        }
                        else {
                            zj.Teach.setOperateTeachStep(21);
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(21);
                    }
                }
                else if (curStep_ == 19) {
                    zj.Teach.removeMask();
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 20) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) {
                    var mobInfo = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].mobsMap[100001];
                    var get_first = false;
                    if (mobInfo != null) {
                        get_first = mobInfo.firstReward; // 首杀
                    }
                    if (get_first) {
                        // 获得首杀
                        zj.Teach.setOperateTeachStep(24); // 升级    
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui == null) {
                        zj.Teach.openDialogName = ["zj.Common_FirstBlood", "zj.BattleEnd_Lose"];
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    else {
                        if (egret.getQualifiedClassName(ui) == "zj.BattleEnd_Lose") {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['ButtonGoOn'], true, false, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                            ui['ButtonGoOn'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                                zj.Teach.SaveTeachPart();
                                zj.Teach.SaveTeachPartLocal(curPart_);
                                zj.Teach.EndCurPart(true);
                            }, null);
                        }
                        else if (egret.getQualifiedClassName(ui) == "zj.Common_FirstBlood") {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOk']);
                            zj.Teach.closeDialogName = "zj.Common_FirstBlood";
                            return;
                        }
                    }
                }
                else if (curStep_ == 24) {
                    var _41 = zj.Teach.GetDstUI("zj.CommonLevelUp2"), ui = _41[0], bLoading = _41[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonLevelUp2";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonLevelUp2") {
                        if (zj.Game.PlayerInfoSystem.BaseInfo.level != 1 && zj.Game.PlayerInfoSystem.BaseInfo.level != 2 && egret.getQualifiedClassName(zj.Game.UIManager.topDialog) != "zj.CommonLevelUp2") {
                            zj.Teach.addOperateTeachStep();
                            return;
                        }
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = "zj.CommonLevelUp2";
                        return;
                    }
                }
                else if (curStep_ == 25) {
                    zj.Teach.removeMask();
                    var _42 = zj.Teach.Dst_BattleEnd(), ui = _42[0], bLoading = _42[1];
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 26) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['ButtonGoOn'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                    zj.Teach.closeDialogName = "zj.BattleEnd_Win";
                    return;
                }
                else if (curStep_ == 27) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 28) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 3003) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToInstance(curStep_, curPart_);
                }
                else if (curStep_ == 6) {
                    var _43 = zj.Teach.GetDstUI(zj.SceneManager.adventureClassStr), top_6 = _43[0], bLoading = _43[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui = zj.Game.UIManager.topScene();
                    ui.SetMapCanTouch(false);
                    if (ui.dialogInfo.parent.visible == false) {
                        zj.Teach.setOperateTeachStep(10);
                    }
                    else {
                        if (zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID == 1) {
                            zj.Teach.setOperateTeachStep(13);
                        }
                        else {
                            zj.Teach.addOperateTeachStep();
                        }
                    }
                }
                else if (curStep_ == 7) {
                    var scene = zj.Game.UIManager.topScene();
                    if (scene == null) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui = scene.dialogInfo;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCloseAdventure']);
                }
                else if (curStep_ == 8) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.dialogInfo;
                    var btn = ui['btnCloseAdventure'];
                    zj.Teach.addOnceEvent(btn);
                }
                else if (curStep_ == 9) {
                    // let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI
                    // ui['SetTeachMoveBack']();
                    // if (ui['ani_end']) {
                    //     Teach.addOperateTeachStep()
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['SetMapCanTouch'](false);
                    ui['btnCloseTop'].enabled = false;
                    zj.Teach.removeMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui.sceneMap.getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                    zj.Teach.openUiName = "zj.AdventureDialog";
                    ui.sceneMap.getAdventureById(1).once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                    return;
                }
                else if (curStep_ == 11) {
                    var ui = zj.Game.UIManager.topScene();
                    // if (ui['topShadow'].visible == false) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    // let ui: any = zj.Game.UIManager.topScene();
                    // if (ui['topShadow'].visible == false) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    var scene = zj.Game.UIManager.topScene();
                    scene.SetMapCanTouch(true);
                    scene['btnCloseTop'].enabled = true;
                    var ui = scene.dialogInfo;
                    if (ui == null || ui.parent.visible != true) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    ui['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0]) {
                        if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[1]) {
                            zj.Teach.addOperateTeachStep();
                        }
                        else {
                            if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0]['imgMask'] == false) {
                                ui['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.OFF;
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                                zj.Teach.addOnceEvent(ui['listAdventure']);
                            }
                            else {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                                zj.Teach.addOnceEvent(ui['listAdventure']);
                            }
                        }
                    }
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    if (scene.dialogInfo.parent.visible == false) {
                        zj.Teach.setOperateTeachStep(13);
                        return;
                    }
                    var ui_28 = scene.dialogInfo;
                    ui_28['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.ON;
                    if (ui_28.parent.visible == true && ui_28.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[1]) {
                        setTimeout(function () {
                            zj.Teach.removeMask();
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_28.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron);
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_28.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron, true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                            zj.Teach.addOnceEvent(ui_28.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron);
                        }, 200);
                    }
                }
                else if (curStep_ == 15) {
                    var _44 = zj.Teach.GetDstUI("zj.CommonFormatePveMain"), ui = _44[0], bLoading = _44[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonConfirm") {
                        zj.Teach.EndCurPart(false);
                        zj.Teach.SaveTeachPartLocal(curPart_);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) {
                    var ui_29 = zj.Game.UIManager.topDialog();
                    egret.Tween.get(ui_29).wait(200).call(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_29['encircle'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    });
                }
                else if (curStep_ == 17) {
                    // Teach.Format_ClickIdx(1, this._ID_KATE, this._ID_XIAOJIE);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    // Teach.Format_ClickIdx(2, this._ID_KATE, this._ID_XIAOJIE);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    // Teach.Format_ClickIdx(3, this._ID_KATE, this._ID_XIAOJIE);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    // zj.Game.TeachSystem.isTimerOpen = true;
                    var fightScene = zj.Game.UIManager.topScene();
                    var key = -1; // 判断是否有小杰
                    for (var _45 = 0, _46 = zj.HelpUtil.GetKV(zj.Game.PlayerFormationSystem.bootCamp); _45 < _46.length; _45++) {
                        var _47 = _46[_45], k = _47[0], v = _47[1];
                        if (zj.PlayerHunterSystem.GetGeneralId(v.generalId) == this._ID_XIAOJIE) {
                            key = k;
                        }
                    }
                    if (key == -1) {
                        zj.Teach.setOperateTeachStep(23);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 21) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 23) {
                    // Teach.addMask();
                    var _48 = zj.Teach.GetDstUI("zj.CommonFormatePveMain"), ui = _48[0], bLoading = _48[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain")
                        zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                    ui['ButtonFight'].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Teach.addTeaching();
                    }, null);
                }
                else if (curStep_ == 24) {
                    // Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3005) {
                zj.Teach.ActivatePartner(curStep_, 1, this._ID_XIAOJIE, false, true);
            }
            else if (curPart_ == 4003) {
                if (curStep_ == 0) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui_30 = fightScene['mainmenu']['roleMsg'];
                    // 屏蔽聊天
                    if (ui_30['ButtonSend'] != null) {
                        ui_30['ButtonSend'].enabled = false;
                    }
                    // 胜利了 直接跳到下一步
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    fightScene['pauseAll']();
                    if (zj.Gmgr.Instance.bFightAuto) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_30['ButtonAuto'], true, true, false, 0, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_30['ButtonAuto']);
                        }, 280);
                    }
                    else {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_30['ButtonAuto'], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_30['ButtonAuto']);
                        }, 280);
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.removeMask();
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    if (ui['speedActioning'] == false) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 0, 0.7, false, false);
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 1, 0.7, false, false);
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 2) {
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 3) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3017) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var scene_3 = zj.Game.UIManager.topScene();
                    scene_3['rectMask'].visible = true;
                    var ui = scene_3.getChildByName("detail");
                    if (ui != null && ui.alpha == 1) {
                        scene_3['rectMask'].visible = false;
                        zj.Teach.isShowHunter = true;
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        setTimeout(function () {
                            zj.Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(scene_3['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        }, 400);
                        setTimeout(function () {
                            scene_3['rectMask'].visible = false;
                            zj.Teach.addOnceEvent(scene_3['btnMainDetail']);
                        }, 700);
                    }
                }
                else if (curStep_ == 7) {
                    zj.Teach.removeMask();
                    var _49 = zj.Teach.Dst_Hero(), ui_31 = _49[0], bLoading = _49[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var skill = ui_31.getChildByName("skill");
                    if (skill == null && skill.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (zj.PlayerHunterSystem.GetGeneralId(ui_31['generalId']) == this._ID_XIAOJIE && ui_31['gRightSideBar'].visible) {
                        if (zj.Teach.isShowHunter) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_31['btnSkill'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_31['btnSkill']);
                            zj.Teach.addOnceEvent(ui_31['btnSkill']);
                        }
                        else {
                            setTimeout(function () {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_31['btnSkill'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui_31['btnSkill']);
                                zj.Teach.addOnceEvent(ui_31['btnSkill']);
                            }, 200);
                        }
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 8) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_32 = scene.getChildByName("skill");
                    if (ui_32 == null || ui_32.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    ui_32['SelectSkill'](1);
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_32['groupMain'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene")
                        return;
                    var ui = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene")
                        return;
                    var ui = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['btnUpLevel'].visible && zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).skill_num >= 1) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnUpLevel']);
                        zj.Teach.addOnceEvent(ui['btnUpLevel']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    ui['getItemList']();
                    if (ui['itemList'][3] == null) {
                        zj.Teach.setOperateTeachStep(19);
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 21) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui != null) {
                        if (egret.getQualifiedClassName(ui) == "zj.HunterUpAdvanced") {
                            ui['onBtnClose']();
                            zj.Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    var scene = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(scene['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(scene['btnClose']);
                    // Teach.addOnceEvent(scene['btnClose']);
                    zj.Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 23) {
                    var hunterui = zj.Game.UIManager.topDialog();
                    if (hunterui != null) {
                        if (egret.getQualifiedClassName(hunterui) == "zj.HunterUpAdvanced") {
                            hunterui['onBtnClose']();
                        }
                    }
                    zj.Teach.addMask();
                    var _50 = zj.Teach.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui = _50[0], bLoading = _50[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var topUI_1 = (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) ? zj.Game.UIManager.topScene() : null;
                    if (topUI_1 != null) {
                        topUI_1.SetMapCanTouch(false);
                        topUI_1['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(topUI_1.sceneMap.getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(function () { topUI_1.sceneMap['topShadow'].visible = false; });
                        topUI_1.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        zj.Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (zj.SceneManager.instance.isMainCityScene()) {
                        zj.Teach.setOperateTeachStep(25);
                    }
                    else {
                        zj.Teach.removeMask();
                        zj.Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 24) {
                    var ui = zj.Game.UIManager.topScene();
                    ui.SetMapCanTouch(true);
                    if (ui.dialogInfo && ui.dialogInfo.visible == true) {
                        ui['btnCloseTop'].enabled = true;
                        zj.Teach.setOperateTeachStep(25);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 25) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3007) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui_33 = scene.getChildByName("hero");
                    if (ui_33 == null || ui_33.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_33['btnUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_33['btnUpLevel']);
                        // Teach.addOnceEvent(ui['btnUpLevel']);
                        zj.Teach.openDialogName = "zj.HunterUpLevel";
                        ui_33['btnUpLevel'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            // Teach.DoOperateTeach();
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 500);
                }
                else if (curStep_ == 7) {
                    var _51 = zj.Teach.GetDstUI("zj.HunterUpLevel"), ui_34 = _51[0], bLoading = _51[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterUpLevel";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_34['groupTeach'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        ui_34['groupTeach'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topDialog();
                    var itemTbl = [30001, 30002, 30003, 30004];
                    var indexTag = -1;
                    for (var i = 0; i < itemTbl.length; i++) {
                        if (zj.PlayerItemSystem.Count(itemTbl[i]) > 0) {
                            indexTag = i;
                            if (indexTag >= 1) {
                                break;
                            }
                        }
                    }
                    if (ui['canTeach'] != true || indexTag == -1) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getItemList']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['item_list'][indexTag]['HeroLevelPop'], true, true, false, 1, 0.7, false, false, true);
                        zj.Teach.addOnceEvent(ui['listExpPill']);
                    }
                }
                else if (curStep_ == 9) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    zj.Teach.closeDialogName = "zj.HunterUpLevel";
                    return;
                }
                else if (curStep_ == 10) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    var scene = zj.Game.UIManager.topScene(); //HunterMainScene
                    zj.Game.UIManager.setMaskAttachedTapObj(scene['btnClose']);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(scene['btnClose'], true, true, false, 1, 0.7, false, false);
                    // Teach.addOnceEvent(scene['btnClose']);
                    zj.Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    var _52 = zj.Teach.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui = _52[0], bLoading = _52[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var topUI_2 = (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) ? zj.Game.UIManager.topScene() : null;
                    if (topUI_2 != null) {
                        topUI_2.sceneMap['topShadow'].visible = true;
                        topUI_2.SetMapCanTouch(false);
                        topUI_2['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(topUI_2.sceneMap.getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(function () { topUI_2.sceneMap['topShadow'].visible = false; });
                        topUI_2.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        return;
                    }
                    else if (egret.getQualifiedClassName(topUI_2) == "zj.HunterMainScene") {
                        zj.Teach.setOperateTeachStep(14);
                    }
                    else {
                        zj.Teach.removeMask();
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    var ui = zj.Game.UIManager.topScene();
                    ui.SetMapCanTouch(true);
                    if (ui['btnCloseTop'].enabled == false) {
                        ui['btnCloseTop'].enabled = true;
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    // 第一次自由操作
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 9001 || curPart_ == 9002 || curPart_ == 9003 || curPart_ == 9004 || curPart_ == 9005 || curPart_ == 9006 || curPart_ == 9007 || curPart_ == 9008 || curPart_ == 9009) {
                // 新区域解锁
                // let graph = 100 + curPart_ % 10;
                // Teach.AddAreaAnimation(curStep_, graph);
                zj.Teach.removeMask();
                zj.Teach.SaveTeachPart();
                zj.Teach.SaveTeachPartLocal();
                zj.Teach.EndCurPart(false);
            }
            else if (curPart_ == 3008 || curPart_ == 3014 || curPart_ == 3020) {
                var pass = 100001;
                if (curPart_ == 3014) {
                    pass = 100007;
                }
                else if (curPart_ == 3020) {
                    pass = 100021;
                }
                zj.Teach.GetBox(curStep_, false, pass, curPart_);
            }
            else if (curPart_ == 8005) {
                if (curStep_ < 5) {
                    zj.Teach.addMask();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) {
                        zj.Teach.setOperateTeachStep(14);
                    }
                    else if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.mainCityClassStr) {
                        zj.Teach.setOperateTeachStep(16);
                    }
                    // Teach.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene", true);
                }
                else if (curStep_ == 5) {
                    zj.Teach.addMask();
                    var _53 = zj.Teach.Dst_Hero(), scene = _53[0], bLoading = _53[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui_35 = scene.getChildByName("hunterHero");
                    if (ui_35 == null) {
                        console.log("++++++++++++++++++++++++HunterHeroList加载中++++++++++++++++++++++++++");
                        ;
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        console.log("++++++++++++++++++++++++HunterHeroList加载成功++++++++++++++++++++++++++");
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_35['btnFragment'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_35['btnFragment']);
                        zj.Teach.addOnceEvent(ui_35['btnFragment']);
                    }, 1000);
                }
                else if (curStep_ == 6) {
                    var scene_4 = zj.Game.UIManager.topScene();
                    var ui_36 = scene_4.getChildByName("hunterHero");
                    if (ui_36['currentListType'] != 1 /* Fragment */) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    var soulId = zj.TableBaseGeneral.Item(this._ID_BANZANG);
                    setTimeout(function () {
                        scene_4.getChildByName("hunterHero")['getItemList']();
                    }, 500);
                    // if (ui['itemList'][0] == null || ui['itemList'][0] == undefined) return;
                    setTimeout(function () {
                        scene_4.getChildByName("hunterHero")['listFragment'].scrollEnabled = false;
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(scene_4.getChildByName("hunterHero")['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                        zj.Teach.addOnceEvent(ui_36['listFragment']);
                    }, 600);
                }
                else if (curStep_ == 7) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("hunterHero");
                    ui['listFragment'].scrollEnabled = true;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("hunterHero"); // 左边碎片ui
                    var ui1 = scene.getChildByName("hero"); // 右边招募ui
                    if (ui == null || ui1 == null) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui1['groupCallHunter'].visible == false) {
                        zj.Teach.setOperateTeachStep(13);
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui1['groupCallHunter'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui1['groupCallHunter']);
                    zj.Teach.addOnceEvent(ui1['groupCallHunter']);
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var _54 = zj.Teach.GetDstUI("zj.CommonGetGeneral"), ui = _54[0], bLoading = _54[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CommonGetGeneral";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['imgHunterLevel'].visible) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 10) {
                    // Teach.addOperateTeachStep();
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                    zj.Teach.addOnceEvent(ui['groupTeach']);
                }
                else if (curStep_ == 11) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['onClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    // let [ui, bLoading] = Teach.GetDstUI("zj.HunterMainScene");
                    // if (bLoading) return;
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    ui['btnClose'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Teach.delTouchTipSpx();
                    }, null);
                    zj.Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 14) {
                    var _55 = zj.Teach.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui = _55[0], bLoading = _55[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var adventure = zj.Game.UIManager.topScene();
                    if (adventure.sceneMap.isOpenAniRun) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    // let topUI: any = zj.Game.UIManager.topScene();
                    var topUI_3 = (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) ? zj.Game.UIManager.topScene() : null;
                    if (topUI_3 && zj.SceneManager.instance.isAdventureScene(topUI_3)) {
                        zj.Teach.addMask();
                        topUI_3.SetMapCanTouch(false);
                        topUI_3.sceneMap.moveMapToArea(2, function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(topUI_3.sceneMap.getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                            topUI_3.sceneMap.getAdventureById(2).once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                            zj.Teach.openUiName = "zj.AdventureDialog";
                            return;
                        }, this);
                    }
                    else if (zj.SceneManager.instance.isMainCityScene()) {
                        zj.Teach.setOperateTeachStep(16);
                    }
                }
                else if (curStep_ == 15) {
                    var scene = zj.Game.UIManager.topScene();
                    scene.SetMapCanTouch(true);
                    if (!zj.SceneManager.instance.isAdventureScene(scene)) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3015 || curPart_ == 3019) {
                var pass = 100001;
                if (curPart_ == 3019) {
                    pass = 100014;
                }
                zj.Teach.GetBox(curStep_, true, pass, curPart_);
            }
            else if (curPart_ == 2001) {
                if (curStep_ == 0) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    zj.Teach.setStopTeachUpdata(true);
                    zj.Teach.setTeaching(true);
                    zj.Teach.removeMask();
                    zj.loadUI(zj.Dialog_Name)
                        .then(function (dailog) {
                        dailog.show();
                    });
                }
                else if (curStep_ == 2) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8023) {
                if (curStep_ == 0) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    zj.Teach.openDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    var ui_37 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui_37['down']['getItemList']();
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[0]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[1]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[2]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[3]) == 10005) {
                            zj.Teach.setOperateTeachStep(5);
                        }
                        else {
                            zj.Teach.Format_ClickIdx(1, null, this._ID_KATE);
                        }
                    }, 500);
                }
                else if (curStep_ == 2) {
                    zj.Teach.addMask();
                    var ui_38 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui_38['down']['getItemList']();
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[0]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[1]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[2]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[3]) == 10005) {
                            zj.Teach.setOperateTeachStep(5);
                        }
                        else {
                            zj.Teach.Format_ClickIdx(2, null, this._ID_KATE);
                        }
                    }, 500);
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    var ui_39 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui_39['down']['getItemList']();
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[0]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[1]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[2]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[3]) == 10005) {
                            zj.Teach.setOperateTeachStep(5);
                        }
                        else {
                            zj.Teach.Format_ClickIdx(3, null, this._ID_KATE);
                        }
                    }, 500);
                }
                else if (curStep_ == 4) {
                    zj.Teach.addMask();
                    var ui_40 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui_40['down']['getItemList']();
                        zj.Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[0]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[1]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[2]) == 10005 || zj.PlayerHunterSystem.GetGeneralId(zj.Teach.generals[3]) == 10005) {
                            zj.Teach.setOperateTeachStep(5);
                        }
                        else {
                            zj.Teach.Format_ClickIdx(4, null, this._ID_KATE);
                        }
                    }, 500);
                }
                else if (curStep_ == 5) {
                    // zj.Game.TeachSystem.isTimerOpen = true;
                    zj.Teach.removeMask();
                    zj.Teach.delTouchTipSpx();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 2005) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_41 = scene.getChildByName("hero");
                    if (ui_41 == null || ui_41.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui_41['btnUpStar'].enabled) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_41['btnUpStar'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_41['btnUpStar']);
                            // Teach.addOnceEvent(ui['btnUpStar']);
                            zj.Teach.openDialogName = "zj.HunterUpStar";
                            ui_41['btnUpStar'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                            }, null);
                        }, 500);
                    }
                    else {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 7) {
                    var _56 = zj.Teach.GetDstUI("zj.HunterUpStar"), ui_42 = _56[0], bLoading = _56[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterUpStar";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui_42['TeachFindMet']();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_42['groupRight'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_42['groupRight']);
                        zj.Teach.addOnceEvent(ui_42['groupRight']);
                    }, 300);
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.HunterUpStar") {
                        zj.Teach.openDialogName = "zj.HunterUpStar";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupLeft'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupLeft']);
                    zj.Teach.addOnceEvent(ui['groupLeft']);
                }
                else if (curStep_ == 9) {
                    // let ui: any = zj.Game.UIManager.topDialog();
                    // if (zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star != 3) {
                    //     Teach.SaveTeachPart();
                    //     Teach.SaveTeachPartLocal(curPart_);
                    //     Teach.setOperateTeachStep(25);
                    // }
                    // else {
                    //     Teach.addOperateTeachStep();
                    // }
                    zj.Teach.setOperateTeachStep(25);
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][0] != null) {
                        ui['scrollerHero'].scrollPolicyV = eui.ScrollPolicy.OFF;
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][0];
                        var types = ui['itemList'][ui['indexTbl'][0]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['itemList'][ui['indexTbl'][0]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            // Teach.addOnceEvent(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                                zj.Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            zj.Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 11) {
                    // Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][1] != null) {
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][1];
                        var types = ui['itemList'][ui['indexTbl'][1]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['itemList'][ui['indexTbl'][1]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                                zj.Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            zj.Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 12) {
                    // Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][2] != null) {
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][2];
                        var types = ui['itemList'][ui['indexTbl'][2]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['itemList'][ui['indexTbl'][2]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            // Teach.addOnceEvent(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                                zj.Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            zj.Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 13) {
                    var ui = zj.Game.UIManager.topDialog();
                    var met_tbl = [];
                    ui['getItemList']();
                    for (var _57 = 0, _58 = zj.HelpUtil.GetKV(ui['indexTbl']); _57 < _58.length; _57++) {
                        var _59 = _58[_57], k = _59[0], v = _59[1];
                        var types = ui['itemList'][v].type;
                        if (types != 4 && types != 6) {
                            met_tbl.push(v);
                        }
                    }
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    // if (met_tbl.length == zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star && zj.Game.PlayerInfoSystem.BaseInfo.money >= 1000) {
                    //     Teach.setOperateTeachStep(16); // 成功
                    // }
                    // else {
                    //     Teach.addOperateTeachStep(); // 失败
                    // }
                    var count = 0;
                    for (var i = 0; i < zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star; i++) {
                        if (ui['materialGeneralIdList'][i] != 0 && ui['materialGeneralIdList'][i] != -1) {
                            count += 1;
                        }
                    }
                    if (count == zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star && zj.Game.PlayerInfoSystem.BaseInfo.money >= 1000) {
                        zj.Teach.setOperateTeachStep(16); // 满足升星条件
                    }
                    else {
                        zj.Teach.addOperateTeachStep(); // 不满足升星条件
                    }
                }
                else if (curStep_ == 14) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['rectAddStar'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddStar']);
                    // Teach.addOnceEvent(ui['btnAddStar']);
                    ui['btnAddStar'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Teach.delTouchTipSpx();
                        zj.Teach.removeMask();
                        zj.Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 15) {
                    zj.Teach.setOperateTeachStep(25);
                }
                else if (curStep_ == 16) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['rectAddStar'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddStar']);
                    ui['btnAddStar'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Teach.delTouchTipSpx();
                    }, null);
                    // Teach.addOnceEvent(ui['btnAddStar']);
                    zj.Teach.openDialogName = "zj.HunterUpStarSuccess";
                    return;
                }
                else if (curStep_ == 17) {
                    var _60 = zj.Teach.GetDstUI("zj.HunterUpStarSuccess"), top_7 = _60[0], bLoading = _60[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterUpStarSuccess";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (top_7['animationEnd'] == true) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 18) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 19) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog(); // 升星成功界面
                    ui['touchClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    var _61 = zj.Teach.GetDstUI("zj.HunterUpStar"), ui = _61[0], bLoading = _61[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = "zj.HunterUpStarSuccess";
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    ui['scrollerHero'].scrollPolicyV = eui.ScrollPolicy.ON;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnReturn'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnReturn']);
                    zj.Teach.addOnceEvent(ui['btnReturn']);
                }
                else if (curStep_ == 22) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 23) {
                    zj.Teach.addMask();
                    zj.Teach.addMask();
                    var _62 = zj.Teach.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui = _62[0], bLoading = _62[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var topUI_4 = (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) ? zj.Game.UIManager.topScene() : null;
                    if (topUI_4 != null) {
                        topUI_4.SetMapCanTouch(false);
                        topUI_4['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(topUI_4.sceneMap.getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(function () { topUI_4.sceneMap['topShadow'].visible = false; });
                        topUI_4.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        zj.Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.HunterMainScene") {
                        zj.Teach.setOperateTeachStep(25);
                    }
                    else {
                        zj.Teach.removeMask();
                        zj.Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 24) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['SetMapCanTouch'](true);
                    ui['btnCloseTop'].enabled = true;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 25) {
                    zj.Teach.delTouchTipSpx();
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8006) {
                if (curStep_ < 6) {
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, true, null);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui_43 = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui_43) != "zj.HunterMainScene") {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui_43['rectMask'].visible = true;
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_43['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        ui_43['btnMainDetail'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 400);
                    setTimeout(function () {
                        ui_43['rectMask'].visible = false;
                        zj.Teach.openUiName = "zj.HunterDetail";
                        // Teach.isNeedOpenAddStep = false;
                        return;
                    }, 700);
                    // Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    // Teach.delTouchTipSpx();
                    zj.Teach.addMask();
                    var scene_5 = zj.Game.UIManager.topScene();
                    var ui = scene_5.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(scene_5['btnCard'], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTapObj(scene['btnCard']);
                        // Teach.openUiName = "zj.HunterCardMain";
                        return;
                    }, 300);
                }
                else if (curStep_ == 8) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("card");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_44 = scene.getChildByName("card");
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_44['groupMain'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var rect = new eui.Rect(zj.UIManager.StageWidth, zj.UIManager.StageHeight, 0x00ff00);
                    rect.name = "maskHero";
                    rect.alpha = 0;
                    zj.Game.UIManager.pushTeachUI(rect);
                    var scene = zj.Game.UIManager.topScene();
                    var ui_45 = scene.getChildByName("card");
                    ui_45['getItemList']();
                    ui_45['listCard'].scrollEnabled = false;
                    if (ui_45['itemList'][0]['groupLock'].visible) {
                        zj.Teach.removeMask();
                        var mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(24);
                    }
                    else if (ui_45['itemList'][0]['groupGetCard'].visible) {
                        zj.Teach.removeMask();
                        var mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(24);
                    }
                    else if (ui_45['itemList'][0]['groupDontGet'].visible) {
                        // Teach.removeMask();
                        zj.Teach.addMask();
                        var mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_45['itemList'][0]['groupAll'], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                            // Teach.addOnceEvent(ui['listCard']);
                            // ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            //     Teach.delTouchTipSpx();
                            // }, null);
                        }, 300);
                    }
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    // Teach.addOperateTeachStep();
                    zj.Teach.setOperateTeachStep(14);
                }
                else if (curStep_ == 13) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("hunterCardEmptyPopDialog");
                    // Teach.addOperateTeachStep();
                    zj.Teach.openUiName = "zj.HunterCardEmptyPopDialog";
                    return;
                }
                else if (curStep_ == 14) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui_46 = scene.getChildByName("hunterCardEmptyPopDialog"); // HunterCardEmptyPopDialog
                    if (ui_46 == null || ui_46 == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    ui_46['scrollerCardBag'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    zj.Teach.addMask();
                    ui_46['getItemList']();
                    if (ui_46['itemList'][0] == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui_46['itemList'][0].data.info.id == null) {
                        zj.Teach.removeMask();
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(24);
                    }
                    else {
                        egret.Tween.get(ui_46).wait(400).call(function () {
                            // Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_46['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                            // Teach.addOnceEvent(ui['listCardBag']);
                        });
                    }
                }
                else if (curStep_ == 15) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_47 = scene.getChildByName("hunterCardEmptyPopDialog");
                    ui_47['scrollerCardBag'].scrollPolicyV = eui.ScrollPolicy.ON;
                    egret.Tween.get(ui_47).wait(500).call(function () {
                        if (ui_47['isEnd']) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_47['groupRight'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                        else {
                            zj.Teach.needIsEndAni = true;
                            return;
                        }
                    });
                }
                else if (curStep_ == 16) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("hunterCardEmptyPopDialog");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnInstall'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnInstall']);
                    zj.Teach.addOnceEvent(ui['btnInstall']);
                }
                else if (curStep_ == 17) {
                    var top_8 = zj.Game.UIManager.topScene();
                    var ui_48 = top_8.getChildByName("card");
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_48['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 18) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("card");
                    ui['listCard'].scrollEnabled = true;
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 20) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['onBtnClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 22) {
                    zj.Teach.addMask();
                    var _63 = zj.Teach.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui = _63[0], bLoading = _63[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var topUI_5 = (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.adventureClassStr) ? zj.Game.UIManager.topScene() : null;
                    if (topUI_5 != null) {
                        topUI_5.SetMapCanTouch(false);
                        topUI_5['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(topUI_5.sceneMap.getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(function () { topUI_5.sceneMap['topShadow'].visible = false; });
                        topUI_5.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                        zj.Teach.openUiName = "zj.AdventureDialog";
                        zj.Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.HunterMainScene") {
                        zj.Teach.setOperateTeachStep(24);
                    }
                    else {
                        zj.Teach.removeMask();
                        zj.Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 23) {
                    var ui = zj.Game.UIManager.topScene();
                    ui.SetMapCanTouch(true);
                    ui['btnCloseTop'].enabled = true;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 24) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8022) {
                if (curStep_ < 6) {
                    if (zj.Game.TeachSystem.playAreaAnimate) {
                        zj.Teach.removeMask();
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, true, null);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var ui_49 = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui_49) != "zj.HunterMainScene") {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui_49['rectMask'].visible = true;
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_49['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        ui_49['btnMainDetail'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 400);
                    setTimeout(function () {
                        ui_49['rectMask'].visible = false;
                        zj.Teach.openUiName = "zj.HunterDetail";
                        // Teach.isNeedOpenAddStep = false;
                        return;
                    }, 700);
                }
                else if (curStep_ == 7) {
                    // Teach.delTouchTipSpx();
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(scene['btnCard'], true, true, false, 1, 0.7, false, false, true);
                    // zj.Game.UIManager.setMaskAttachedTapObj(scene['btnCard']);
                    // Teach.addOnceEvent(scene['btnCard']);
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.getChildByName("card");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var rect = new eui.Rect(zj.UIManager.StageWidth, zj.UIManager.StageHeight, 0x00ff00);
                    rect.name = "maskHeroCard";
                    rect.alpha = 0;
                    zj.Game.UIManager.pushTeachUI(rect);
                    var scene = zj.Game.UIManager.topScene();
                    var ui_50 = scene.getChildByName("card");
                    ui_50['listCard'].scrollEnabled = false;
                    ui_50['getItemList']();
                    if (ui_50['itemList'][0] == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui_50['itemList'][0]['groupLock'].visible) {
                        zj.Teach.removeMask();
                        var mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHeroCard");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(25);
                    }
                    else if (ui_50['itemList'][0]['groupGetCard'].visible) {
                        zj.Teach.setOperateTeachStep(15);
                    }
                    else if (ui_50['itemList'][0]['groupDontGet'].visible) {
                        // Teach.addMask();
                        // setTimeout(function () {
                        //     Teach.removeMask();
                        //     let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHeroCard");
                        //     if (mask != null) {
                        //         zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        //     }
                        //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                        //     zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                        //     Teach.addOnceEvent(ui['listCard']);
                        // }, 500);
                        zj.Game.UIManager.GroupTeachUI.removeChildren();
                        zj.Teach.addMask();
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_50['itemList'][0]['groupAll'], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                            // Teach.addOnceEvent(ui['listCard']);
                            // ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            //     Teach.delTouchTipSpx();
                            // }, null);
                        }, 300);
                    }
                }
                else if (curStep_ == 11) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui_51 = scene.getChildByName("hunterCardEmptyPopDialog"); // HunterCardEmptyPopDialog
                    if (ui_51 == null || ui_51 == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    ui_51['scrollerCardBag'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    zj.Teach.addMask();
                    ui_51['getItemList']();
                    if (ui_51['itemList'][0] == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui_51['itemList'][0].data.info.id == null) {
                        zj.Teach.removeMask();
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(24);
                    }
                    else {
                        egret.Tween.get(ui_51).wait(400).call(function () {
                            // Teach.removeMask();
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_51['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                            // Teach.addOnceEvent(ui['listCardBag']);
                        });
                    }
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_52 = scene.getChildByName("hunterCardEmptyPopDialog");
                    ui_52['scrollerCardBag'].scrollPolicyV = eui.ScrollPolicy.ON;
                    egret.Tween.get(ui_52).wait(500).call(function () {
                        if (ui_52['isEnd']) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_52['btnInstall'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_52['btnInstall']);
                            zj.Teach.addOnceEvent(ui_52['btnInstall']);
                        }
                        else {
                            zj.Teach.needIsEndAni = true;
                            return;
                        }
                    });
                }
                else if (curStep_ == 13) {
                    var top_9 = zj.Game.UIManager.topScene();
                    var ui_53 = top_9.getChildByName("card");
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_53['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_53['listCard']);
                        // Teach.addOnceEvent(ui['listCard']);
                        ui_53['listCard'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                            zj.Teach.setOperateTeachStep(16);
                            return;
                        }, null);
                        zj.Game.UIManager.GroupTeachUI.once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                            zj.Teach.setOperateTeachStep(16);
                            return;
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 14) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui_54 = scene.getChildByName("card");
                    ui_54['getItemList']();
                    setTimeout(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_54['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_54['listCard']);
                        zj.Teach.addOnceEvent(ui_54['listCard']);
                        ui_54['listCard'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Teach.delTouchTipSpx();
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 15) {
                    var top_10 = zj.Game.UIManager.topScene();
                    var ui_55 = top_10.getChildByName("card");
                    var CARD_UI_TYPE = void 0;
                    ui_55['getItemList']();
                    if (ui_55['itemList'][0].data.cardInfo == null || ui_55['itemList'][0].data.cardInfo == undefined) {
                        zj.Teach.setOperateTeachStep(10);
                    }
                    else {
                        // Teach.addMask();
                        zj.Game.UIManager.GroupTeachUI.removeChildren();
                        zj.Teach.removeMask();
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_55['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_55['listCard']);
                            zj.Teach.addOnceEvent(ui_55['listCard']);
                        }, 500);
                    }
                }
                else if (curStep_ == 16) {
                    var _64 = zj.Teach.GetDstUI("zj.HunterCardPopDialog"), ui_56 = _64[0], bLoading = _64[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterCardPopDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_56['groupTeach'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_56['groupTeach']);
                        zj.Teach.addOnceEvent(ui_56['groupTeach']);
                    }, 500);
                }
                else if (curStep_ == 17) {
                    var ui = zj.Game.UIManager.topDialog(); // HunterCardPopDialog
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnStrengthen'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnStrengthen']);
                    // Teach.addOnceEvent(ui['btnStrengthen']);
                    zj.Teach.openDialogName = "zj.CardStrengthenMain";
                    return;
                }
                else if (curStep_ == 18) {
                    var _65 = zj.Teach.GetDstUI("zj.CardStrengthenMain"), top_11 = _65[0], bLoading = _65[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CardStrengthenMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(top_11['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(top_11['groupTeach']);
                    zj.Teach.addOnceEvent(top_11['groupTeach']);
                }
                else if (curStep_ == 19) {
                    var dialog = zj.Game.UIManager.topDialog(); // CardStrengthenMain
                    var ui = dialog['groupNodeAdd'].getChildByName("cardStrengthen");
                    if (ui == null) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['groupUpLevel'].visible) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['groupUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(22);
                    }
                }
                else if (curStep_ == 20) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    zj.Teach.closeDialogName = "zj.CardStrengthenMain";
                    return;
                }
                else if (curStep_ == 23) {
                    var _66 = zj.Teach.GetDstUI("zj.HunterCardPopDialog"), ui_57 = _66[0], bLoading = _66[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterCardPopDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_57['btnUpStar'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_57['btnUpStar']);
                        zj.Teach.addOnceEvent(ui_57['btnUpStar']);
                    }, 300);
                }
                else if (curStep_ == 24) {
                    var _67 = zj.Teach.GetDstUI("zj.CardUpStarNewDialog"), ui = _67[0], bLoading = _67[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CardUpStarNewDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 25) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8002) {
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBtn(curStep_, "btnCard", "zj.CardMainScene");
                }
                else if (curStep_ == 5) {
                    var _68 = zj.Teach.GetDstUI("zj.CardMainScene"), ui_58 = _68[0], bLoading = _68[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.CardMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_58['btnCardBag'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_58['btnCardBag']);
                        zj.Teach.addOnceEvent(ui_58['btnCardBag']);
                    }, 300);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    var scene = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.CardMainScene") {
                        zj.Teach.openSceneName = "zj.CardMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui = scene['groupCenter'].getChildByName("cardBag");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.openUiName = "zj.CardBag";
                        return;
                    }
                }
                else if (curStep_ == 8) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['groupCenter'].getChildByName("cardBag");
                    // let index = ui['_teachIndex'] == null ? 1 : ui['_teachIndex'];
                    var index = 1;
                    ui["getItemList"]();
                    if (ui['itemList'][index - 1] == null) {
                        // Teach.setOperateTeachStep(12);
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    else {
                        ui['listCardBag'].selectedIndex = (index - 1);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][index - 1], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                        zj.Teach.addOnceEvent(ui['listCardBag']);
                    }
                }
                else if (curStep_ == 9) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['groupCenter'].getChildByName("cardBag");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnOpenCard'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOpenCard']);
                    zj.Teach.addOnceEvent(ui['btnOpenCard']);
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var _69 = zj.Teach.GetDstUI("zj.CardBagPopDialog"), ui = _69[0], bLoading = _69[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.CardBagPopDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnGetCard'].alpha == 1) {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        if (ui['btnGetCard'].enabled == true && ui['btnGetCard'].alpha == 1) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                            ui.once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Teach.delTouchTipSpx();
                            }, null);
                        }
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.CardBagPopDialog") {
                        zj.Teach.openDialogName = "zj.CardBagPopDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnGetCard'], true, true, false, 1, 0.7, false, false);
                    // zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGetCard']);
                    zj.Teach.addOnceEvent(ui['btnGetCard']);
                }
                else if (curStep_ == 12) {
                    var ui = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui) == "zj.CardMainScene") {
                        if (zj.Game.UIManager.GroupTeachUI.getChildByName(zj.ConstantConfig_Teach.Tag.LayerUp.toString()) != null) {
                            zj.Teach.delTouchTipSpx();
                        }
                    }
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8007) {
                if (curStep_ < 6) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.LevelUpToInstance(curStep_, curPart_);
                }
                else if (curStep_ == 6) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.SceneManager.instance.isAdventureScene(ui)) {
                        zj.Teach.ProcTeachStory();
                        if (zj.Story.isFinish()) {
                            zj.Story.bFinish = false;
                            zj.Teach.addOperateTeachStep();
                            zj.Teach.setOperateTeachStep(7);
                        }
                    }
                }
                else if (curStep_ == 7) {
                    var topUI = zj.Game.UIManager.topScene();
                    topUI.SetMapCanTouch(false);
                    if (topUI.dialogInfo.parent.visible == false) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.setOperateTeachStep(10);
                    }
                }
                else if (curStep_ == 8) {
                    zj.Teach.addMask();
                    var ui_59 = zj.Game.UIManager.topScene();
                    if (zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID >= 1) {
                        ui_59.SetMapCanTouch(false);
                        ui_59['btnCloseTop'].enabled = false;
                        ui_59.sceneMap.moveMapToArea(1, function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_59.sceneMap.getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                            ui_59.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () {
                                zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                                zj.Teach.addMask();
                            }, null);
                            zj.Teach.openUiName = "zj.AdventureDialog";
                            zj.Teach.isNeedOpenAddStep = true;
                            return;
                        }, null);
                    }
                    else {
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.setOperateTeachStep(19);
                    }
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topScene();
                    ui.SetMapCanTouch(true);
                    if (ui['btnCloseTop'].enabled == false)
                        ui['btnCloseTop'].enabled = true;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    zj.Teach.delTouchTipSpx();
                    var complete2 = zj.Game.PlayerInstanceSystem.ElitePackCanChallenge(1);
                    var scene = zj.Game.UIManager.topScene();
                    if (!scene.dialogInfo.parent.visible) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (complete2[0]) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(scene.dialogInfo['tagBtn1'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                        zj.Game.UIManager.setMaskAttachedTapObj(scene.dialogInfo['tagBtn1']);
                        zj.Teach.addOnceEvent(scene.dialogInfo['tagBtn1']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(19);
                    }
                }
                else if (curStep_ == 11) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene.dialogInfo;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['scrollerAdventure'], true, true, false, 0, 0.7, false, false, false, false, [1.2, 1.2]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    zj.Teach.setOperateTeachStep(18);
                }
                else if (curStep_ == 13) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['dialog'];
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listElite'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['dialog'];
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnDrop'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDrop']);
                    zj.Teach.addOnceEvent(ui['btnDrop']);
                }
                else if (curStep_ == 15) {
                    var _70 = zj.Teach.GetDstUI("zj.HXH_InstanceEliteDropInfo"), ui = _70[0], bLoading = _70[1];
                    if (bLoading)
                        return;
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupAll'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupAll']);
                    zj.Teach.addOnceEvent(ui['groupAll']);
                }
                else if (curStep_ == 16) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 17) {
                    if (zj.Game.UIManager.IsAnimation)
                        return;
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    zj.Teach.addMask();
                    var top_12 = zj.Game.UIManager.topScene();
                    top_12.SetMapCanTouch(false);
                    var ui = top_12.dialogInfo;
                    if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, 0)[0]) {
                        ui['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.OFF;
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, 0)[0], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 19) {
                    var top_13 = zj.Game.UIManager.topScene();
                    top_13.SetMapCanTouch(true);
                    var ui = top_13.dialogInfo;
                    ui['scrollerAdventure'].scrollPolicyV = eui.ScrollPolicy.ON;
                    zj.Teach.SaveTeachPart();
                    zj.Teach.EndCurPart(false);
                    zj.Teach.SaveTeachPartLocal(curPart_);
                }
            }
            else if (curPart_ == 8008) {
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (!zj.SceneManager.instance.isMainCityScene()) {
                        zj.Teach.removeMask();
                        zj.Teach.closeSceneName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                }
                else if (curStep_ == 5) {
                    zj.Teach.openDialogName = "zj.licenseMain";
                    return;
                }
                else if (curStep_ == 6) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.openDialogName = "zj.licenseMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['listInfo'].visible) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getItemListInfo']();
                    if (ui['itemListInfo'][0] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][0]['btnTransfer'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getItemListInfo']();
                    if (ui['itemListInfo'][0] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][0]['btnPlayer'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][0]['btnPlayer']);
                        zj.Teach.addOnceEvent(ui['itemListInfo'][0]['btnPlayer']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 10) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.openDialogName = "zj.CommonGetDialog";
                    return;
                }
                else if (curStep_ == 11) {
                    zj.Teach.removeMask();
                    var _71 = zj.Teach.GetDstUI("zj.licenseMain"), top_14 = _71[0], bLoading = _71[1];
                    if (bLoading) {
                        zj.Teach.closeDialogName = "zj.CommonGetDialog";
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                        zj.Teach.closeDialogName = "zj.CommonGetDialog";
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(top_14['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8010) {
                if (curStep_ < 6) {
                    // let topScene = zj.Game.UIManager.topScene()
                    // if (SceneManager.instance.isAdventureScene(topScene)) { // 最上层scene是冒险
                    //     if (Story.bFinish != true) Story.playStory(curPart_, 2);
                    //     if (Story.isFinish()) {
                    //         Story.bFinish = false;
                    //         Teach.setOperateTeachStep(7);
                    //     }
                    // }
                    // else {
                    //     Teach.LevelUpToInstance(curStep_, curPart_);
                    // }
                    zj.Teach.setOperateTeachStep(24);
                }
                else if (curStep_ == 6) {
                    var _72 = zj.Teach.GetDstUI(zj.SceneManager.adventureClassStr), top_15 = _72[0], bLoading = _72[1];
                    if (bLoading)
                        return;
                    top_15['SetMapCanTouch'](false);
                    if (top_15['groupDialog'].numChildren == 0) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 7) {
                    zj.Teach.addMask();
                    var ui_60 = zj.Game.UIManager.topScene();
                    ui_60['topShadow'].visible = true;
                    ui_60['SetAreaLockInfo']();
                    ui_60['SetMapCanTouch'](false);
                    egret.Tween.get(ui_60).wait(300).call(function () {
                        zj.Teach.removeMask();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_60['imgMapSelect4'], true, true, false, 1, 0.7, false, false, true);
                    }).wait(300).call(function () {
                        ui_60['topShadow'].visible = false;
                    });
                    // ui.once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     Teach.delTouchTipSpx();
                    // }, null)
                    zj.Teach.openUiName = "zj.HXH_InstanceDialog";
                    return;
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topScene();
                    // ui['isLock'][3] = false;
                    ui['SetMapCanTouch'](true);
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    var scene_6 = zj.Game.UIManager.topScene();
                    if (scene_6['groupDialog'].alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(scene_6['groupRightButton3'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(scene_6['btnSearch']);
                        zj.Teach.addOnceEvent(scene_6['btnSearch']);
                    }, 300);
                }
                else if (curStep_ == 10) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_61 = scene['dialog'];
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_61['listSearch'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 350);
                }
                else if (curStep_ == 11) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0] != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListSearch'][0], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listSearch']);
                        zj.Teach.addOnceEvent(ui['listSearch']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 12) {
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0]['btnSetLineup'].enabled) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListSearch'][0]['btnSetLineup'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListSearch'][0]['btnSetLineup']);
                        zj.Teach.addOnceEvent(ui['itemListSearch'][0]['btnSetLineup']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 13) {
                    zj.Teach.addMask();
                    var _73 = zj.Teach.GetDstUI("zj.HXH_InstanceTeam"), ui_62 = _73[0], bLoading = _73[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HXH_InstanceTeam";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_62['listFormat'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 14) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listHero'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 15) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][0] == null) {
                        // Teach.addOperateTeachStep();
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    else {
                        ui['getHunterList']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][0]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        zj.Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 16) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][1] == null) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getHunterList']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][1]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        zj.Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 17) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][2] == null) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getHunterList']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][2]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        zj.Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 18) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnOk'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOk']);
                    // Teach.addOnceEvent(ui['btnOk']);
                    zj.Teach.closeDialogName = "zj.HXH_InstanceTeam";
                    return;
                }
                else if (curStep_ == 20) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui_63 = scene['dialog'];
                    ui_63['getITemListSearch']();
                    var power = ui_63['itemListSearch'][0].tblInfo.consume_power;
                    if (ui_63['itemListSearch'][0]['btnStart'].visible && zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_POWER) >= power) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_63['itemListSearch'][0]['btnStart'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui_63['itemListSearch'][0]['btnStart']);
                            zj.Teach.addOnceEvent(ui_63['itemListSearch'][0]['btnStart']);
                        }, 300);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    zj.Teach.addMask();
                    var dialog = zj.Game.UIManager.topDialog();
                    if (dialog != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(dialog);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var scene = zj.Game.UIManager.topScene();
                    var ui_64 = scene['dialog'];
                    ui_64['getITemListSearch']();
                    if (ui_64['itemListSearch'][0]['btnStart'].visible) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_64['itemListSearch'][0]['groupUI'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }, 1800);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0]['btnStart'].visible) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListSearch'][0]['groupUI'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 24) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8003) {
                if (curStep_ == 0) {
                    var _74 = zj.Teach.GetDstUI("zj.LeagueInstanceMain"), ui = _74[0], bLoading = _74[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.LeagueInstanceMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['groupBoss1'].getChildByName("item1") != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['groupBoss1'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.setOperateTeachStep(7);
                    }
                }
                else if (curStep_ == 2) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 3) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui);
                    zj.Teach.addOnceEvent(ui);
                }
                else if (curStep_ == 4) {
                    var ui = zj.Game.UIManager.topScene();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnViewAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnViewAward']);
                    zj.Teach.addOnceEvent(ui['btnViewAward']);
                }
                else if (curStep_ == 5) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    var _75 = zj.Teach.GetDstUI("zj.LeagueInstanceViewAward"), ui = _75[0], bLoading = _75[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.LeagueInstanceViewAward";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8004) {
                if (curStep_ == 0) {
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueBossFighting") {
                        var _76 = zj.Teach.GetDstUI("zj.LeagueBossFighting"), ui = _76[0], bLoading = _76[1];
                        if (bLoading) {
                            zj.Teach.openDialogName = "zj.LeagueBossFighting";
                            zj.Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                    else if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueBossInfo") {
                        var _77 = zj.Teach.GetDstUI("zj.LeagueBossInfo"), ui = _77[0], bLoading = _77[1];
                        if (bLoading) {
                            zj.Teach.openSceneName = "zj.LeagueBossInfo";
                            zj.Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8009) {
                if (curStep_ < 5) {
                    zj.Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                }
                else if (curStep_ == 5) {
                    var _78 = zj.Teach.GetDstUI("zj.licenseMain"), top_16 = _78[0], bLoading = _78[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.licenseMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (ui['groupExamination'].visible) {
                        if (ui['groupTalk1'].visible) {
                            zj.Teach.setOperateTeachStep(11); // 可以考试
                        }
                        else {
                            zj.Teach.addOperateTeachStep(); // 领取奖励
                        }
                    }
                    else {
                        zj.Teach.addOperateTeachStep(); // 领取奖励
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    if (ui['teachNotGetTbl'][0]) {
                        ui['getItemListInfo']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][0]['btnPlayer'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][0]['btnPlayer']);
                        zj.Teach.addOnceEvent(ui['itemListInfo'][0]['btnPlayer']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var dialog = zj.Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 1) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][1]) {
                        ui['getItemListInfo']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][1]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][1]['btnPlayer']);
                        zj.Teach.addOnceEvent(ui['itemListInfo'][1]['btnPlayer']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var dialog = zj.Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 2) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][2]) {
                        ui['getItemListInfo']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][2]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][2]['btnPlayer']);
                        zj.Teach.addOnceEvent(ui['itemListInfo'][2]['btnPlayer']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    var dialog = zj.Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 3) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][1]) {
                        ui['getItemListInfo']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListInfo'][3]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][3]['btnPlayer']);
                        zj.Teach.addOnceEvent(ui['itemListInfo'][3]['btnPlayer']);
                    }
                    else {
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) {
                    var ui_65 = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui_65) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.SaveTeachPart(false, 8009);
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    setTimeout(function () {
                        if (ui_65['groupExamination'].visible) {
                            if (ui_65['groupTalk1'].visible) {
                                if (egret.getQualifiedClassName(ui_65) == "zj.licenseMain") {
                                    if (zj.Teach.isHaveTip() == true)
                                        zj.Teach._reuse_button(ui_65['btnHunterExamination'], true, true, false, 1, 0.7, false, false);
                                    zj.Game.UIManager.setMaskAttachedTapObj(ui_65['btnHunterExamination']);
                                    zj.Teach.addOnceEvent(ui_65['btnHunterExamination']);
                                }
                            }
                            else {
                                zj.Teach.setOperateTeachStep(14);
                            }
                        }
                        else {
                            zj.Teach.setOperateTeachStep(14);
                        }
                    }, 300);
                }
                else if (curStep_ == 12) {
                    var _79 = zj.Teach.GetDstUI("zj.licenseExamination"), top_17 = _79[0], bLoading = _79[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.licenseExamination";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8011) {
                if (curStep_ == 0) {
                    var _80 = zj.Teach.GetDstUI("zj.LeagueHomeScene"), ui = _80[0], bLoading = _80[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.LeagueHomeScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8012) {
                if (curStep_ < 5) {
                    // if (zj.Game.UIManager.topDialog() != null) {
                    //     Teach.removeMask();
                    //     Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                    //     Teach.isNeedCloseAddStep = false;
                    //     return;
                    // }
                    // Teach.addMask();
                    // Teach.LevelUpToBtn(curStep_, "btnPet", "zj.PetMainScene");
                    zj.Teach.setOperateTeachStep(7);
                }
                else if (curStep_ == 5) {
                    var _81 = zj.Teach.GetDstUI("zj.PetMainScene"), ui = _81[0], bLoading = _81[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.PetMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8013) {
                if (curStep_ < 5) {
                    // Teach.LevelUpToBtn(curStep_, "btnPet", "zj.PetMainScene");
                    zj.Teach.setOperateTeachStep(7);
                }
                else if (curStep_ == 5) {
                    zj.Teach.addMask();
                    var _82 = zj.Teach.GetDstUI("zj.PetMainScene"), top_18 = _82[0], bLoading = _82[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.PetMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var index = void 0;
                    index = zj.PlayerAdviserSystem.Haves();
                    if (index == false) {
                        zj.Teach.setOperateTeachStep(7);
                    }
                    else {
                        var ui_66 = zj.Game.UIManager.topScene();
                        var findk_1;
                        for (var _83 = 0, _84 = zj.HelpUtil.GetKV(ui_66['info']); _83 < _84.length; _83++) {
                            var _85 = _84[_83], k = _85[0], v = _85[1];
                            if (v.adviser_id == index) {
                                findk_1 = Number(k);
                                break;
                            }
                        }
                        if (findk_1 == null) {
                            zj.Teach.setOperateTeachStep(7);
                            return;
                        }
                        ui_66['listAdviser'].selectedIndex = findk_1;
                        ui_66['getItemList']();
                        setTimeout(function () {
                            if (ui_66['itemList'][findk_1]['btnPetName'].enabled) {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_66['itemList'][findk_1], true, true, false, 1, 0.7, false, false, true);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui_66['listAdviser']);
                                zj.Teach.addOnceEvent(ui_66['listAdviser']);
                            }
                            else {
                                if (zj.Teach.isHaveTip() == true)
                                    zj.Teach._reuse_button(ui_66['itemList'][findk_1], true, true, false, 1, 0.7, false, false, true);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui_66['listAdviser']);
                                zj.Teach.addOnceEvent(ui_66['listAdviser']);
                            }
                        }, 1000);
                    }
                }
                else if (curStep_ == 6) {
                    var scene = zj.Game.UIManager.topScene();
                    var ui = scene['groupProperty'].getChildByName("DontGet");
                    if (ui == null) {
                        zj.Teach.openUiName = "zj.PetDontGet";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnAddFragment'] == null) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['btnAddFragment'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddFragment']);
                        zj.Teach.addOnceEvent(ui['btnAddFragment']);
                    }
                }
                else if (curStep_ == 7) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.delTouchTipSpx();
                    zj.Teach.removeMask();
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8018) {
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    zj.Teach.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene");
                }
                else if (curStep_ == 5) {
                    var _86 = zj.Teach.GetDstUI("zj.HunterMainScene"), top_19 = _86[0], bLoading = _86[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui_67 = top_19.getChildByName("hunterHero");
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_67['btnCompound'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_67['btnCompound']);
                        zj.Teach.addOnceEvent(ui_67['btnCompound']);
                    }, 300);
                }
                else if (curStep_ == 6) {
                    var _87 = zj.Teach.GetDstUI("zj.HunterCompound"), ui = _87[0], bLoading = _87[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterCompound";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupleft'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupleft']);
                    zj.Teach.addOnceEvent(ui['groupleft']);
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupRight']);
                    zj.Teach.addOnceEvent(ui['groupRight']);
                }
                else if (curStep_ == 8) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach3'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach3']);
                    zj.Teach.addOnceEvent(ui['groupTeach3']);
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['getItemListMaterial']();
                    if (ui['itemListMaterial'][0] == undefined) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['itemListMaterial'][0].data.id != null) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemListMaterial'][0], true, true, false, 1, 0.7, false, false, true);
                        zj.Teach.addOnceEvent(ui['listMaterial']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(12);
                    }
                }
                else if (curStep_ == 10) {
                    var _88 = zj.Teach.GetDstUI("zj.HunterBreakPopDialog"), ui = _88[0], bLoading = _88[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.HunterBreakPopDialog";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['listHunter'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 11) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    zj.Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 12) {
                    var _89 = zj.Teach.GetDstUI("zj.HunterCompound"), ui_68 = _89[0], bLoading = _89[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_68['btnConpound'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 13) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8014) {
                if (curStep_ == 0) {
                    var scene = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") {
                        zj.Teach.openSceneName = "zj.HunterMainScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    var ui = scene.getChildByName("awaken");
                    if (ui == null || ui.alpha != 1) {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8015) {
                if (curStep_ < 5) {
                    zj.Teach.addMask();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.licenseMain") {
                            zj.Teach.setOperateTeachStep(5);
                        }
                        else {
                            zj.Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                        }
                    }, 300);
                }
                else if (curStep_ == 5) {
                    var _90 = zj.Teach.GetDstUI("zj.licenseMain"), top_20 = _90[0], bLoading = _90[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.licenseMain";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (ui['groupExamination'].visible) {
                        if (ui['groupTalk2'].visible) {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui['btnGetLicence'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGetLicence']);
                            zj.Teach.addOnceEvent(ui['btnGetLicence']);
                        }
                        else {
                            zj.Teach.setOperateTeachStep(11);
                        }
                    }
                    else {
                        zj.Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 8) {
                    var _91 = zj.Teach.GetDstUI("zj.licenseHunterUpStar"), top_21 = _91[0], bLoading = _91[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.licenseHunterUpStar";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (top_21['aniEnd']) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 9) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) {
                    var ui = zj.Game.UIManager.topDialog();
                    ui['onClose']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    zj.Teach.SaveTeachPart(false, 8015);
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8016) {
                if (curStep_ == 0) {
                    var _92 = zj.Teach.GetDstUI("zj.HeroesPokedexScene"), top_22 = _92[0], bLoading = _92[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.HeroesPokedexScene";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['currPageIndex'] != 5) {
                        ui['HunterGroup5']();
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 2) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 3) {
                    var ui = zj.Game.UIManager.topScene();
                    var index = void 0;
                    for (var _93 = 0, _94 = zj.HelpUtil.GetKV(ui['retMap']); _93 < _94.length; _93++) {
                        var _95 = _94[_93], k = _95[0], v = _95[1];
                        if (zj.PlayerHunterSystem.GetGeneralId(v.generalInfo.general_id) == this._ID_XIAOJIE) {
                            index = Number(k);
                            break;
                        }
                    }
                    if (index != null) {
                        ui['listType0'].selectedIndex = index;
                        ui['getItemList']();
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['itemList'][0], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        zj.Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 4) {
                    var ui = zj.Game.UIManager.topScene();
                    var index = void 0;
                    for (var _96 = 0, _97 = zj.HelpUtil.GetKV(ui['retMap']); _96 < _97.length; _96++) {
                        var _98 = _97[_96], k = _98[0], v = _98[1];
                        if (zj.PlayerHunterSystem.GetGeneralId(v.generalInfo.general_id) == this._ID_XIAOJIE) {
                            index = Number(k);
                            break;
                        }
                    }
                    ui['getItemList']();
                    ui['scorllertype'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                    zj.Teach.addOnceEvent(ui['listType0']);
                }
                else if (curStep_ == 5) {
                    var ui = zj.Game.UIManager.topScene();
                    var dialog = ui.getChildByName("HeroesPokedexInfo");
                    if (ui != null && ui.scaleX == 1 && ui.scaleY == 1) {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.openUiName = "zj.HeroesPokedexInfo";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 6) {
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    var ui = zj.Game.UIManager.topScene();
                    var dialog = ui.getChildByName("HeroesPokedexInfo");
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(dialog['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(dialog['btnClose']);
                    zj.Teach.addOnceEvent(dialog['btnClose']);
                }
                else if (curStep_ == 8) {
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    var ui = zj.Game.UIManager.topScene();
                    ui['scorllertype'].scrollPolicyV = eui.ScrollPolicy.ON;
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 10) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8017) {
                if (curStep_ == 0) {
                    zj.Teach.addMask();
                    var _99 = zj.Teach.GetDstUI("zj.DoubleColorSence"), top_23 = _99[0], bLoading = _99[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.DoubleColorSence";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.DoubleColorSence") {
                        zj.Teach.addOperateTeachStep();
                    }
                    else {
                        zj.Teach.openDialogName = "zj.DoubleColorSence";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.DoubleColorSence") {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addMask();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnAwardView'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAwardView']);
                    zj.Teach.addOnceEvent(ui['btnAwardView']);
                }
                else if (curStep_ == 3) {
                    zj.Teach.addMask();
                    var _100 = zj.Teach.GetDstUI("zj.DoubleColorViewAward"), top_24 = _100[0], bLoading = _100[1];
                    if (bLoading) {
                        zj.Teach.openDialogName = "zj.DoubleColorViewAward";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) {
                    zj.Teach.addMask();
                    zj.Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        zj.Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    zj.Teach.addMask();
                    var ui_69 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_69['btnClose'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui_69['btnClose']);
                        zj.Teach.addOnceEvent(ui_69['btnClose']);
                    }, 200);
                }
                else if (curStep_ == 6) {
                    zj.Teach.addMask();
                    var _101 = zj.Teach.GetDstUI("zj.DoubleColorSence"), top_25 = _101[0], bLoading = _101[1];
                    if (bLoading) {
                        zj.Teach.removeMask();
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    zj.Teach.addMask();
                    var ui = zj.Game.UIManager.topDialog();
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['btnOK'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 4004) {
                if (curStep_ == 0) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    if (ui['ButtonSend'] != null) {
                        ui['ButtonSend'].enabled = false;
                    }
                    if (fightScene['isWin']()) {
                        zj.Teach.addOperateTeachStep();
                        return;
                    }
                    fightScene['pauseAll']();
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui_70 = fightScene['mainmenu']['roleMsg'];
                    if (zj.Gmgr.Instance.bakeSpeedIndex == 1 || zj.Gmgr.Instance.bakeSpeedIndex == 2) {
                        setTimeout(function () {
                            if (zj.Teach.isHaveTip() == true)
                                zj.Teach._reuse_button(ui_70['ButtonSpeed'], true, true, false, 0, 0.7, false, false, true);
                            zj.Teach.addOnceEvent(ui_70['ButtonSpeed']);
                        }, 300);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(3);
                    }
                }
                else if (curStep_ == 2) {
                    var fightScene = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        zj.Teach.openSceneName = "zj.StageSceneFightNormal";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        zj.Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    var ui = fightScene['mainmenu']['roleMsg'];
                    if (zj.Gmgr.Instance.bakeSpeedIndex == 2) {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 0, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonSpeed']);
                        zj.Teach.addOnceEvent(ui['ButtonSpeed']);
                    }
                    else {
                        zj.Teach.setOperateTeachStep(3);
                    }
                }
                else if (curStep_ == 3) {
                    zj.Teach.ResumeAddStep();
                }
                else if (curStep_ == 4) {
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8024) {
                if (curStep_ == 0) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        zj.Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        zj.Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    zj.loadUI(zj.HXH_FirstChargeMainNew).then(function (scene) {
                        scene.show();
                        zj.Teach.removeMask();
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.EndCurPart(false);
                        zj.Teach.delTouchTipSpx();
                    });
                }
            }
            else if (curPart_ == 8025) {
                var gifts = zj.PlayerGiftSystem.ShowInCity();
                if (gifts.length == 0) {
                    zj.Teach.removeMask();
                    zj.Teach.SaveTeachPart();
                    zj.Teach.SaveTeachPartLocal(curPart_);
                    zj.Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8026) {
                if (curStep_ == 0) {
                    if (zj.SceneManager.instance.isMainCityScene()) {
                        zj.Teach.addMask();
                        var ui = zj.Game.UIManager.topScene();
                        // Game.UIManager.setMaskAttachedTapObj(ui.sceneUI['btnFriend']);
                        if (zj.Teach.isHaveTip() == true) {
                            zj.Teach.removeMask();
                            // Game.UIManager['maskRect'].visible = false;
                            // Game.UIManager['maskCount'] = 0;
                            zj.Teach._reuse_button(ui.sceneUI['btnFriend'], true, true, false, 1, 0.7, false, false, true);
                        }
                        zj.Teach.openSceneName = "zj.Friend_MainFriendSence";
                        zj.Teach.isNeedOpenAddStep = true;
                        return;
                    }
                }
                else if (curStep_ == 1) {
                    zj.Teach.addMask();
                    // let ui = Game.UIManager.topScene() as Friend_MainFriendSence;
                    var _102 = zj.Teach.GetDstUI("zj.Friend_MainFriendSence"), ui_71 = _102[0], bLoading = _102[1];
                    if (bLoading) {
                        zj.Teach.openSceneName = "zj.Friend_MainFriendSence";
                        zj.Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    // Game.UIManager.setMaskAttachedTapObj(ui['buttonAdd']);
                    setTimeout(function () {
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_71['buttonAdd'], true, true, false, 1, 0.7, false, false, true);
                        zj.Teach.openDialogName = "zj.Friend_AddFriend";
                        zj.Teach.isNeedOpenAddStep = true;
                        ui_71['buttonAdd'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                        }, null);
                    }, 500);
                    return;
                }
                else if (curStep_ == 2) {
                    zj.Teach.addMask();
                    var ui_72 = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        // Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                        if (zj.Teach.isHaveTip() == true)
                            zj.Teach._reuse_button(ui_72['buttonClose'], true, true, false, 1, 0.7, false, false, true);
                        ui_72['buttonClose'].once(egret.TouchEvent.TOUCH_TAP, function () {
                            zj.Game.PlayerInfoSystem.checkAgreeEnter();
                            zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                        }, null);
                        zj.Teach.closeDialogName = "zj.Friend_AddFriend";
                        zj.Teach.isNeedCloseAddStep = true;
                    }, 500);
                    return;
                }
                else if (curStep_ == 3) {
                    var ui = zj.Game.UIManager.topScene();
                    // Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    if (zj.Teach.isHaveTip() == true)
                        zj.Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false, true);
                    zj.Teach.closeSceneName = "zj.Friend_MainFriendSence";
                    zj.Teach.isNeedCloseAddStep = true;
                    ui['buttonClose'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                        zj.Teach.removeMask();
                        zj.Teach.SaveTeachPart();
                        zj.Teach.SaveTeachPartLocal(curPart_);
                        zj.Teach.EndCurPart(false);
                        zj.Teach.delTouchTipSpx();
                    }, null);
                    return;
                }
            }
        };
        Teach_diff._ID_XIAOJIE = 10032;
        Teach_diff._ID_WUTONG = 10053;
        Teach_diff._ID_SACI = 10006;
        Teach_diff._ID_KATE = 10005;
        Teach_diff._ID_KULAPIKA = 10034;
        Teach_diff._ID_BANZANG = 10008;
        return Teach_diff;
    }());
    zj.Teach_diff = Teach_diff;
    __reflect(Teach_diff.prototype, "zj.Teach_diff");
})(zj || (zj = {}));
//# sourceMappingURL=Teach_diff.js.map