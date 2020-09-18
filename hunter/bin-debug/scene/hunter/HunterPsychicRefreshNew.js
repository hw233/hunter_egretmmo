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
     * @date 2019-7-19
     *
     * @class 猎人念力修炼
     */
    var HunterPsychicRefreshNew = (function (_super) {
        __extends(HunterPsychicRefreshNew, _super);
        function HunterPsychicRefreshNew() {
            var _this = _super.call(this) || this;
            _this.showName = true;
            _this.showProp = true;
            _this.general_id = 0;
            _this.groupType = 0;
            _this.curSelectIndex = null;
            _this.nextSelectIndex = null;
            _this.aniItemCBFunc = null;
            _this.groupCBFunc = null;
            _this.commonHunterConsume = new commonHunterConsume();
            _this.psyInfo = {};
            _this.groupInfo = {};
            _this.generalPsys = [];
            _this.selecteInfo = null;
            _this.psy_items = [];
            _this.upgrade_items = [];
            _this.curSelect = null;
            _this.nextSelect = null;
            _this.effAfterAni = null;
            _this.effMidAni = null;
            _this.effBeforeAni = null;
            _this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewSkin.exml";
            _this.init();
            return _this;
            // Game.EventManager.on(GameEvent.PLAYER_BASE_INFO_CHANGE, this.reloadSelecte, this);
        }
        HunterPsychicRefreshNew.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnFirstAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFirstAwaken, this);
            this.groupMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMeterials, this);
            this.groupAddSkillFragmentBig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAddSkillFragmentBig, this);
            this.initTeach();
            this.initView();
            this.initUpgradeAni();
            this.commonHunterConsume.CB(function () {
                _this.updateSelecteView();
            });
        };
        HunterPsychicRefreshNew.prototype.setInfo = function (father, cb) {
            this.father = father;
            this.cb = cb;
            this.SetData();
            this.ReloadInfo();
        };
        HunterPsychicRefreshNew.prototype.initTeach = function () {
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_Psychic2) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_Psychic2);
            }
        };
        HunterPsychicRefreshNew.prototype.initView = function () {
            this.initPsychicItem();
        };
        HunterPsychicRefreshNew.prototype.initUpgradeAni = function () {
            var _this = this;
            var thisOne = this;
            var initAfterAni = function () {
                var animationAfter_cb = function () {
                    // if (movementType == ccs.MovementEventType.complete) {
                    if (!_this.groupAniBefore.visible) {
                        _this.groupAniBefore.visible = true;
                        _this.groupAni.visible = true;
                        _this.groupAniAfter.visible = true;
                    }
                    if (_this.groupCBFunc != null) {
                        _this.groupCBFunc();
                    }
                    // }
                };
                if (_this.effAfterAni == null) {
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "nianli2_eff", null, [], [])
                        .then(function (armatureDisplay) {
                        // this.remove(armatureDisplay);
                        thisOne.effAfterAni = armatureDisplay;
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.stop();
                            animationAfter_cb();
                        }, thisOne);
                        thisOne.effAfterAni.animation.play("001_jihuo", 1);
                        thisOne.groupAniAfter.addChild(thisOne.effAfterAni);
                    });
                }
                else {
                    _this.effAfterAni.animation.play("001_jihuo", 1);
                }
            };
            var initMidAni = function () {
                var animationMid_cb = function () {
                    // if movementType == ccs.MovementEventType.complete then
                    if (_this.aniItemCBFunc != null && typeof (_this.aniItemCBFunc) == "function") {
                        _this.aniItemCBFunc();
                    }
                    initAfterAni();
                };
                if (_this.effMidAni == null) {
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "nianli2_eff", null, [], [])
                        .then(function (armatureDisplay) {
                        // this.remove(armatureDisplay);
                        thisOne.effMidAni = armatureDisplay;
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.stop();
                            animationMid_cb();
                        }, thisOne);
                        thisOne.effMidAni.animation.play("010_jiantou", 1);
                        thisOne.groupAni.addChild(thisOne.effMidAni);
                    });
                }
                else {
                    _this.effMidAni.animation.play("010_jiantou", 1);
                }
            };
            var animationBefore_cb = function () {
                initMidAni();
            };
            if (this.effBeforeAni == null) {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
                    .then(function (armatureDisplay) {
                    // this.remove(armatureDisplay);
                    thisOne.effBeforeAni = armatureDisplay;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        armatureDisplay.animation.stop();
                        animationBefore_cb();
                    }, thisOne);
                    thisOne.effBeforeAni.animation.play("009_shanshuo", 1);
                    thisOne.groupAniBefore.addChild(thisOne.effBeforeAni);
                });
            }
            else {
                this.effBeforeAni.animation.play("009_shanshuo", 1);
            }
            this.groupAniBefore.visible = false;
            this.groupAni.visible = false;
            this.groupAniAfter.visible = false;
        };
        // private remove(armatureDisplay) {
        // 	armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
        // 		armatureDisplay.animation.stop();
        // 		armatureDisplay.animation.reset();
        // 		armatureDisplay.armature.dispose();
        // 		armatureDisplay.dbClear();
        // 		armatureDisplay.dispose(true);
        // 		if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
        // 	}, null);
        // }
        HunterPsychicRefreshNew.prototype.SetData = function () {
            this.general_id = this.father.generalId;
            this.generalPsys = zj.Game.PlayerHunterSystem.getGeneralPsychicAttri(this.general_id);
        };
        HunterPsychicRefreshNew.prototype.ReloadInfo = function () {
            this.reloadData();
            this.reloadRight();
            this.reloadSelecte();
        };
        HunterPsychicRefreshNew.prototype.reloadData = function () {
            var groupInfo = zj.PlayerHunterSystem.getGeneralPsychicCurGroup(this.general_id);
            this.groupType = 0;
            if ((this.groupInfo != null && Object.keys(this.groupInfo).length > 0) && groupInfo[1].psychic.level > this.groupInfo[1].psychic.level) {
                this.groupType = 1;
            }
            else if ((this.groupInfo != null && Object.keys(this.groupInfo).length > 0) && groupInfo[2].psychic.level > this.groupInfo[2].psychic.level) {
                this.groupType = 2;
            }
            this.groupInfo = groupInfo;
            this.psyInfo = zj.PlayerHunterSystem.GetGeneralPsychicData(this.general_id);
        };
        HunterPsychicRefreshNew.prototype.reloadRight = function () {
            if (this.curSelectIndex == null) {
                for (var i = 0; i < 6; i++) {
                    this.psy_items[i].SetMainItemUI(this.generalPsys[i], this.psyInfo[i], true);
                }
            }
            else {
                this.psy_items[this.curSelectIndex - 1].SetMainItemUI(this.selecteInfo, this.psyInfo[this.curSelectIndex - 1], true, true);
            }
        };
        HunterPsychicRefreshNew.prototype.reloadSelecte = function (index) {
            this.updateSelecteData(index);
            this.updateSelecteView();
        };
        HunterPsychicRefreshNew.prototype.updateSelecteData = function (index) {
            this.commonHunterConsume.SetConsumeSelection();
            this.nextSelectIndex = this.curSelectIndex || 1;
            this.curSelectIndex = index || this.curSelectIndex || 1;
            this.selecteInfo = this.generalPsys[this.curSelectIndex - 1];
            this.curSelect = zj.Table.DeepCopy(this.psyInfo[this.curSelectIndex - 1]);
            this.nextSelect = zj.Table.DeepCopy(this.curSelect);
            this.nextSelect.level += 1;
        };
        HunterPsychicRefreshNew.prototype.updateSelecteView = function () {
            this.psy_items[this.nextSelectIndex - 1].SetSelectVisible(false);
            this.psy_items[this.curSelectIndex - 1].SetSelectVisible(true);
            if (this.psyInfo[this.curSelectIndex - 1].level >= zj.CommonConfig.general_psychic_attri_max_level) {
                this.groupRefresh.visible = false;
                this.groupMax.visible = true;
            }
            else {
                this.groupRefresh.visible = true;
                this.groupMax.visible = false;
                this.upgrade_items[0].SetMainItemUI(this.selecteInfo, this.curSelect, true);
                this.upgrade_items[1].SetMainItemUI(this.selecteInfo, this.nextSelect, true);
                this.updateMaterials();
            }
        };
        HunterPsychicRefreshNew.prototype.updateMaterials = function () {
            var curLevel = this.psyInfo[this.curSelectIndex - 1].level - 1;
            var goodsId = this.selecteInfo.consume_fridge[curLevel][0];
            var goods = zj.PlayerItemSystem.Item(goodsId);
            this.imgIconMeterials.source = goods.path;
            var count1 = zj.Game.PlayerItemSystem.queryItem(goodsId).count;
            if (goodsId == 20006) {
                count1 = zj.Game.PlayerInfoSystem.BaseInfo.psychicFruit;
            }
            var count2 = this.selecteInfo.consume_fridge[curLevel][1];
            var str_count1 = zj.Helper.StringFormat("%d/%d", count1, count2);
            this.labelNumMeterials.text = str_count1;
            zj.Set.LabelNumberGreenAndRed(this.labelNumMeterials, count1, count2);
            if (count1 >= count2) {
                this.imgAddSkillMeterials.visible = false;
            }
            else {
                this.imgAddSkillMeterials.visible = true;
            }
            var general_id = this.selecteInfo.consume_general[curLevel];
            var level = this.selecteInfo.general_level[curLevel];
            var star = this.selecteInfo.general_star[curLevel];
            var awaken = this.selecteInfo.general_awaken[curLevel];
            count1 = this.commonHunterConsume.GetConsumeSelectionCount();
            count2 = this.selecteInfo.general_count[curLevel];
            str_count1 = zj.Helper.StringFormat("%d/%d", count1, count2);
            this.labelNumSkillFrag.text = str_count1;
            zj.Set.LabelNumberGreenAndRed(this.labelNumSkillFrag, count1, count2);
            var path_head = "";
            if (general_id == 0) {
                path_head = zj.UIConfig.UIConfig_General.hunter_donnot_know;
            }
            else {
                path_head = zj.PlayerHunterSystem.Head(this.selecteInfo.consume_general[curLevel]);
                var genTal = zj.PlayerHunterSystem.Table(general_id);
                var path_aptitude = zj.UIConfig.UIConfig_General.hunter_grade[genTal.aptitude];
                this.imgBreakAwaken.source = path_aptitude;
            }
            this.imgIconSkillFrag.source = path_head;
            this.imgBreakAwaken.visible = (general_id > 0);
            this.labelBreakLevel.text = (level);
            this.labelBreakLevel.visible = (level > 0);
            zj.Helper.SetHeroAwakenStar(this.groupBreakStar, star, awaken);
            if (count1 >= count2) {
                this.imgAddSkillFragment.visible = false;
                this.imgMakeSkillFragment.visible = false;
            }
            else {
                this.imgAddSkillFragment.visible = true;
                this.imgMakeSkillFragment.visible = true;
            }
            var goldNum = this.selecteInfo.consume_money[curLevel];
            this.labelGoldNum.text = goldNum;
        };
        HunterPsychicRefreshNew.prototype.initPsychicItem = function () {
            for (var i = 1; i <= 6; i++) {
                var item = zj.newUI(zj.HunterPsychicItem);
                this.psy_items.push(item);
                item.setInfo(this, i, null);
                item.x = -(115 / 2);
                item.y = -(115 / 2);
                this["groupPsychic" + i].addChild(item);
            }
            var before = zj.newUI(zj.HunterPsychicItem);
            this.upgrade_items.push(before);
            before.setInfo(this, 1, true);
            before.SetSelectVisible(true);
            before.x = -before.width / 2;
            before.y = -before.height / 2;
            this.groupPsychicBefore.addChild(before);
            var after = zj.newUI(zj.HunterPsychicItem);
            this.upgrade_items.push(after);
            after.setInfo(this, 1, true);
            after.x = -after.width / 2;
            after.y = -after.height / 2;
            this.groupPsychicAfter.addChild(after);
        };
        /**点击修炼 */
        HunterPsychicRefreshNew.prototype.onBtnFirstAwaken = function () {
            var _this = this;
            if (this.imgAddSkillMeterials.visible) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_fruits_insufficient);
                return;
            }
            if (this.imgAddSkillFragment.visible) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_material_insufficient);
                return;
            }
            var generals = this.commonHunterConsume.GetConsumeSelection();
            zj.Game.PlayerHunterSystem.generalPsychicRefresh(this.general_id, (this.curSelectIndex - 1), generals)
                .then(function () {
                for (var i = 0; i < generals.length; i++) {
                    zj.Game.PlayerHunterSystem.deleteHunterById(generals[i]);
                }
                _this.deleteGeneral();
                _this.checkPsychicUpdate();
                // this.DoUpgradeGroup();
                _this.SetData();
                _this.ReloadInfo();
                if (_this.cb) {
                    _this.cb();
                }
            }).catch(function () {
            });
        };
        HunterPsychicRefreshNew.prototype.DoUpgradeGroup = function () {
            if (this.groupType > 0) {
                zj.TipManager.GetPsychicGroup(this, this.groupInfo[this.groupType], function () { });
            }
        };
        HunterPsychicRefreshNew.prototype.deleteGeneral = function () {
            var refreshGeneral = function () {
                // this.father.father.heroesUI.CallGeneralToGeneral()
            };
            this.commonHunterConsume.DeleteConsumedGeneral(function () { refreshGeneral(); });
        };
        HunterPsychicRefreshNew.prototype.checkPsychicUpdate = function () {
            // _lock(this)
            if (this.groupCBFunc == null || this.aniItemCBFunc == null) {
                this.groupCBFunc = this.DoUpgradeGroup;
                // this.aniItemCBFunc = ccbk(this, this.ReloadInfo)
            }
            this.effBeforeAni.animation.play("009_shanshuo", 1);
        };
        /**点击念力果 */
        HunterPsychicRefreshNew.prototype.onGroupMeterials = function () {
            var _this = this;
            var goodsId = this.selecteInfo.consume_fridge[this.curSelect.level][0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(goodsId, _this, function () {
                    // this.onBtnClose();
                });
            });
        };
        /**点击修炼材料 */
        HunterPsychicRefreshNew.prototype.onGroupAddSkillFragmentBig = function () {
            var cur_level = this.curSelect.level;
            var csmCounts = this.selecteInfo.general_count[cur_level - 1];
            var defaultInfo = {
                general_id: this.selecteInfo.consume_general[cur_level - 1],
                level: this.selecteInfo.general_level[cur_level - 1],
                star: this.selecteInfo.general_star[cur_level - 1],
                awaken: this.selecteInfo.general_awaken[cur_level - 1],
            };
            var hunterInfo = zj.PlayerHunterSystem.getCanRefinePsychicHunter(this.general_id, this.selecteInfo, cur_level);
            hunterInfo.unshift(defaultInfo);
            this.commonHunterConsume.OpenHunterConsumeUI(hunterInfo, csmCounts);
        };
        HunterPsychicRefreshNew.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterPsychicRefreshNew;
    }(zj.Dialog));
    zj.HunterPsychicRefreshNew = HunterPsychicRefreshNew;
    __reflect(HunterPsychicRefreshNew.prototype, "zj.HunterPsychicRefreshNew");
    var commonHunterConsume = (function () {
        function commonHunterConsume() {
            this.consumeSels = [11];
            this.hunterInfo = [];
            this.csmCounts = 0;
        }
        commonHunterConsume.prototype.initData = function () {
        };
        commonHunterConsume.prototype.CB = function (cb) {
            this.cb = cb;
        };
        commonHunterConsume.prototype.OpenHunterConsumeUI = function (hunterInfo, csmCounts) {
            var _this = this;
            zj.loadUI(zj.HunterPsychicRefreshNewPop).then(function (dialog) {
                dialog.SetInfo(_this.consumeSels, hunterInfo, csmCounts, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        commonHunterConsume.prototype.GetConsumeSelection = function () {
            return this.consumeSels;
        };
        commonHunterConsume.prototype.SetConsumeSelection = function (consumeSels) {
            this.consumeSels = consumeSels || [];
            if (this.cb && consumeSels) {
                this.cb();
            }
        };
        commonHunterConsume.prototype.GetConsumeSelectionCount = function () {
            return Object.keys(this.consumeSels).length;
        };
        commonHunterConsume.prototype.DeleteConsumedGeneral = function (cb) {
            var _loop_1 = function (k) {
                if (this_1.consumeSels.hasOwnProperty(k)) {
                    var v_1 = this_1.consumeSels[k];
                    if (v_1 != 0 && v_1 != -1) {
                        var _a = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_k, _v) {
                            return _v.general_id == v_1;
                        }), _ = _a[0], general_k = _a[1];
                        if (general_k != null) {
                            zj.Game.PlayerHunterSystem.queryAllHunters().splice(general_k);
                        }
                        zj.Game.PlayerHunterSystem.allHuntersMap()[v_1] = null;
                    }
                }
            };
            var this_1 = this;
            for (var k in this.consumeSels) {
                _loop_1(k);
            }
            if (cb != null) {
                cb();
            }
            this.consumeSels = null;
        };
        return commonHunterConsume;
    }());
    zj.commonHunterConsume = commonHunterConsume;
    __reflect(commonHunterConsume.prototype, "zj.commonHunterConsume");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicRefreshNew.js.map