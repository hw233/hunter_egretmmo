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
     * @date 2019-1-5
     *
     * @class hunter awaken.
     */
    var HunterAwaken = (function (_super) {
        __extends(HunterAwaken, _super);
        function HunterAwaken() {
            var _this = _super.call(this) || this;
            _this.selectedHunterId = [];
            _this.selectedDollIndex = [];
            _this.skillInfoList = [];
            _this.touchBeginPoint = new egret.Point(0, 0);
            _this.skinName = "resource/skins/hunter/HunterAwakenSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            // this.groupMain.cacheAsBitmap = true;
            _this.groupGetMaterial.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMaterial, _this);
            _this.groupSkillFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSkill, _this);
            _this.btnAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAwake, _this);
            _this.groupAwakenSkillInfo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                _this.touchBeginPoint.x = e.stageX;
                _this.touchBeginPoint.y = e.stageY;
                _this.onHideAwakenSkillInfo();
                _this.onShowAwakenSkillInfo();
            }, _this);
            _this.groupAwakenSkillInfo.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
                // let maxX = this.touchBeginPoint.x + this.groupAwakenSkillInfo.width;
                // let minX = this.touchBeginPoint.x - this.groupAwakenSkillInfo.width;
                // let maxY = this.touchBeginPoint.y + this.groupAwakenSkillInfo.height;
                // let minY = this.touchBeginPoint.y - this.groupAwakenSkillInfo.height;
                // if (e.stageX > maxX || e.stageX < minX) {
                //     if (e.stageY > maxY || e.stageY < minY) {
                //         this.touchBeginPoint.x = 0;
                //         this.touchBeginPoint.y = 0;
                if (Math.abs(_this.touchBeginPoint.x - e.stageX) > 10) {
                    _this.onHideAwakenSkillInfo();
                }
                // }
                // }
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onHideAwakenSkillInfo, _this);
            return _this;
        }
        HunterAwaken.prototype.reloadGeneral = function () {
            this.skillInfoList = zj.PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            if (this.skillInfoList.length < 4) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.noawaken);
                this.father.onSubUIEvent(zj.HunterSubUIEvent.UnableAwaken);
                return;
            }
            this.selectedDollIndex = [];
            this.selectedHunterId = [];
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.awakePassive.level < 5) {
                this.groupHunter.visible = true;
                this.groupUpLevel.visible = true;
                this.groupAwakenMax.visible = !this.groupUpLevel.visible;
                this.setHunterInfo();
                this.setAttributeInfo();
                this.setConsumeInfo();
            }
            else {
                this.groupHunter.visible = false;
                this.groupUpLevel.visible = false;
                this.groupAwakenMax.visible = !this.groupUpLevel.visible;
                this.setAwakenMaxInfo();
            }
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_Awake) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_Awake);
            }
        };
        HunterAwaken.prototype.setHunterInfo = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            var time = zj.UIConfig.UIConfig_Hunter.awakenTime[hunterInfo.awakePassive.level];
            ;
            this.imgCurrentFrame.source = zj.cachekey(framePath, this);
            this.imgCurrentIcon.source = zj.cachekey(headPath, this);
            this.imgNextFrame.source = zj.cachekey(framePath, this);
            this.imgNextIcon.source = zj.cachekey(headPath, this);
            this.imgAwakenTime.source = zj.cachekey(time, this);
            this.imgAwakenSkillFrame.source = zj.cachekey("ui_frame_FrameSkillAwaken5_png", this);
            this.labelCurrentLevel.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupCurrentStar, hunterInfo.star, hunterInfo.awakePassive.level);
            this.labelNextLevel.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupNextStar, hunterInfo.star, hunterInfo.awakePassive.level + 1);
        };
        HunterAwaken.prototype.setAttributeInfo = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            var _a = zj.PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level), attriCurrent = _a[0], desCurrent = _a[1];
            var _b = zj.PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level + 1), attriNext = _b[0], desNext = _b[1];
            var attri3 = zj.PlayerHunterSystem.AttriAdd(this.generalId, 3)[0];
            var _c = zj.PlayerHunterSystem.AttriAdd(this.generalId, 5), attri5 = _c[0], des5 = _c[1];
            for (var i = 1; i <= 3; i++) {
                var imgArrowLeft = this["imgArrowLeft" + i];
                var imgArrowUp = this["imgArrowUp" + i];
                var labelAtt = this["labelAtt" + i];
                var labelAttAdd = this["labelAttAdd" + i];
                var labelAttAddNext = this["labelAttAddNext" + i];
                if (hunterInfo.awakePassive.level == 0) {
                    imgArrowLeft.visible = false;
                    imgArrowUp.visible = false;
                    labelAttAdd.visible = false;
                    if (i == 1) {
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desNext[0]], attriNext[0]);
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.unlock);
                    }
                    else {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                        if (i == 2) {
                            labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri3[i - 1]);
                        }
                        else {
                            labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        }
                        var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1);
                        labelAttAddNext.textFlow = zj.Util.RichText(str);
                    }
                }
                else if (hunterInfo.awakePassive.level == 1) {
                    imgArrowLeft.visible = (i < 2);
                    imgArrowUp.visible = (i < 2);
                    labelAttAdd.visible = (i < 2);
                    if (i == 1) {
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[0].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    }
                    else {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                        if (i == 2) {
                            labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri3[i - 1]);
                        }
                        else {
                            labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        }
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                }
                else if (hunterInfo.awakePassive.level == 2) {
                    imgArrowLeft.visible = (i < 2);
                    imgArrowUp.visible = (i < 2);
                    labelAttAdd.visible = (i < 2);
                    if (i == 1) {
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[0].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    }
                    else if (i == 2) {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desNext[i - 1]], attriNext[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.unlock);
                    }
                    else {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                }
                else if (hunterInfo.awakePassive.level == 3) {
                    imgArrowLeft.visible = (i <= 2);
                    imgArrowUp.visible = (i <= 2);
                    labelAttAdd.visible = (i <= 2);
                    if (i == 1) {
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    }
                    else if (i == 2) {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[i - 1]], attriCurrent[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[i - 1] - attriCurrent[i - 1]).toString() + "%";
                    }
                    else {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                }
                else if (hunterInfo.awakePassive.level == 4) {
                    imgArrowLeft.visible = (i <= 2);
                    imgArrowUp.visible = (i <= 2);
                    labelAttAdd.visible = (i <= 2);
                    if (i == 1) {
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    }
                    else if (i == 2) {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[i - 1]], attriCurrent[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[i - 1] - attriCurrent[i - 1]).toString() + "%";
                    }
                    else {
                        labelAtt.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        labelAttAddNext.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.unlock);
                    }
                }
            }
            var baseGeneral = zj.PlayerHunterSystem.Table(this.generalId);
            var baseTalent = zj.TableGeneralTalent.Item(baseGeneral.awake_passive);
            this.labelInfoAwakenSkill.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.unlock1, baseTalent.talent_name, hunterInfo.awakePassive.level + 1));
            var skillIconPath = baseTalent.path;
            this.imgAwakenSkillIcon.source = zj.cachekey(baseTalent.path, this);
            this.labelAwakenSkillLevel.text = (hunterInfo.awakePassive.level + 1).toString();
        };
        HunterAwaken.prototype.setConsumeInfo = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var lastSkillInfo = this.skillInfoList[3];
            var itemId = 0;
            if (hunterInfo.awakePassive.level >= 5) {
                itemId = this.skillInfoList[3].info.uplevel_consume[hunterInfo.awakePassive.level - 1][0];
            }
            else {
                itemId = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level][0];
            }
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.imgMaterialIcon.source = zj.cachekey(itemSet.Path, this);
            this.itemId = itemSet.Info.id;
            var count = itemSet.Count;
            var materialNumber = 0;
            if (hunterInfo.awakePassive.level >= 5) {
                materialNumber = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level - 1][1];
                this.consumeNumber = lastSkillInfo.info.uplevel_generals[hunterInfo.awakePassive.level - 1];
            }
            else {
                materialNumber = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level][1];
                this.consumeNumber = lastSkillInfo.info.uplevel_generals[hunterInfo.awakePassive.level];
            }
            this.labelMaterialNumber.text = zj.Helper.StringFormat("%d/%d", count, materialNumber);
            zj.Set.LabelNumberGreenAndRed(this.labelMaterialNumber, count, materialNumber);
            this.imgMaterialAdd.visible = (count < materialNumber);
            var length = this.selectedHunterId.length + this.selectedDollIndex.length;
            this.labelSkillNumber.text = zj.Helper.StringFormat("%d/%d", length, this.consumeNumber);
            zj.Set.LabelNumberGreenAndRed(this.labelSkillNumber, length, this.consumeNumber);
            this.imgSkillIcon.source = zj.cachekey(zj.PlayerHunterSystem.Head(this.generalId), this);
        };
        HunterAwaken.prototype.setAwakenMaxInfo = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.labelAwakenLevel.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupAwakenStar, hunterInfo.star, hunterInfo.awakePassive.level);
            var _a = zj.PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level), attri = _a[0], des = _a[1];
            for (var i = 1; i <= 3; i++) {
                var imgArrowLeft = this["imgArrowLeft" + i];
                var imgArrowUp = this["imgArrowUp" + i];
                var labelAtt = this["labelAtt" + i];
                var labelAttAdd = this["labelAttAdd" + i];
                var labelAttAddNext = this["labelAttAddNext" + i];
                imgArrowLeft.visible = false;
                imgArrowUp.visible = false;
                labelAttAdd.visible = false;
                labelAtt.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
                labelAtt.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.Attri1[des[i - 1]], attri[i - 1]);
                labelAttAddNext.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.final);
            }
            var baseGeneral = zj.PlayerHunterSystem.Table(this.generalId);
            var baseTalent = zj.TableGeneralTalent.Item(baseGeneral.awake_passive);
            this.labelInfoAwakenSkill.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.unlock2, baseTalent.talent_name, hunterInfo.awakePassive.level));
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            var skillIconPath = baseTalent.path;
            this.imgAwakenFrame.source = zj.cachekey(framePath, this);
            this.imgAwakenIcon.source = zj.cachekey(headPath, this);
            this.imgAwakenSkillIcon.source = zj.cachekey(skillIconPath, this);
            this.labelAwakenSkillLevel.text = hunterInfo.awakePassive.level.toString();
        };
        HunterAwaken.prototype.onShowAwakenSkillInfo = function () {
            var _this = this;
            zj.loadUI(zj.Common_DesSkill).then(function (dialog) {
                var baseGeneralInfo = zj.PlayerHunterSystem.Table(_this.generalId);
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId);
                var level = hunterInfo.awakePassive.level + 1;
                if (hunterInfo.awakePassive.level == 5) {
                    level -= 1;
                }
                dialog.setInfoLevelSkill(baseGeneralInfo.awake_passive, _this.generalId, 3, level);
                dialog.name = "groupAwakenSkillInfoDialog";
                var x = (_this.groupAwakenSkillInfo.width - dialog.width) * 0.5;
                var y = 0 - dialog.height;
                dialog.x = x;
                dialog.y = y;
                _this.groupAwakenSkillInfo1.addChild(dialog);
            });
        };
        HunterAwaken.prototype.onHideAwakenSkillInfo = function () {
            var dialog = this.groupAwakenSkillInfo1.getChildByName("groupAwakenSkillInfoDialog");
            if (dialog)
                this.groupAwakenSkillInfo1.removeChild(dialog);
        };
        // 获取觉醒石
        HunterAwaken.prototype.onBtnMaterial = function () {
            var _this = this;
            var tbl = zj.TableItemProp.Table();
            var have = zj.Table.FindF(tbl, function (_, v) {
                return _this.itemId == v.id && v.client_transfer[0] != 0 && v.client_transfer[1] != null;
            });
            if (have) {
                zj.loadUI(zj.CommonOutExchangeDialog).then(function (dialog) {
                    dialog.setInfo(_this.itemId, function () {
                        _this.reloadGeneral();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                    dialog.setInfo(_this.itemId, _this, function () {
                        _this.reloadGeneral();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 选择觉醒材料
        HunterAwaken.prototype.onBtnSkill = function () {
            var _this = this;
            zj.loadUI(zj.HunterAwakenSelectDialog).then(function (dialog) {
                dialog.setInfo(_this.generalId, _this.consumeNumber, zj.Table.DeepCopy(_this.selectedHunterId), zj.Table.DeepCopy(_this.selectedDollIndex), function (hunterIds, dollIndex) {
                    _this.selectedHunterId = [];
                    _this.selectedHunterId = hunterIds;
                    _this.selectedDollIndex = [];
                    _this.selectedDollIndex = dollIndex;
                    _this.setConsumeInfo();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterAwaken.prototype.onBtnAwake = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            var isStudy = true;
            var isUpLevel = false;
            if (hunterInfo.awakePassive.level != 0) {
                isStudy = false;
                isUpLevel = true;
            }
            var baseGeneral = zj.PlayerHunterSystem.Table(this.generalId);
            var hunterList = [];
            for (var i = 0; i < this.selectedHunterId.length; i++) {
                var v = this.selectedHunterId[i];
                var consumeList = zj.PlayerHunterSystem.SkillConsume(this.generalId);
                for (var i_1 = 0; i_1 < consumeList.length; i_1++) {
                    var vv = consumeList[i_1];
                    if (vv instanceof message.GeneralInfo) {
                        if (v == vv.general_id && vv.general_id != zj.CommonConfig.same_aptitude_doll[baseGeneral.aptitude - 13]) {
                            hunterList.push(vv.general_id);
                        }
                    }
                }
            }
            zj.Game.PlayerHunterSystem.awakenPassiveToDo(this.generalId, hunterList, this.selectedDollIndex.length, isStudy, isUpLevel).then(function () {
                for (var i = 0; i < hunterList.length; i++) {
                    var v = hunterList[i];
                    zj.Game.PlayerHunterSystem.deleteHunterById(v);
                }
                _this.selectedDollIndex = [];
                _this.selectedHunterId = [];
                _this.reloadGeneral();
                zj.loadUI(zj.HunterAwakenSuccess).then(function (successDialog) {
                    successDialog.setInfo(_this.generalId, function () {
                    });
                    successDialog.show();
                    zj.Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);
                });
                _this.father.onSubUIEvent(zj.HunterSubUIEvent.Refresh);
            }).catch(function () {
            });
        };
        return HunterAwaken;
    }(zj.HunterSubUI));
    zj.HunterAwaken = HunterAwaken;
    __reflect(HunterAwaken.prototype, "zj.HunterAwaken");
})(zj || (zj = {}));
//# sourceMappingURL=HunterAwaken.js.map