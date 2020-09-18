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
     * @author lilou
     *
     * @date 2018-11-13
     *
     * @class 猎人详情界面
     *
     * @description modified by chen xi
     */
    var HunterDetail = (function (_super) {
        __extends(HunterDetail, _super);
        function HunterDetail() {
            var _this = _super.call(this) || this;
            _this.arrAttrs = [];
            _this.arrAttrsAdd = [];
            _this.fateHolesMap = {};
            _this.groupAttrMap = {};
            _this.currentSelectedIndex = null;
            _this.oldBattleValue = null;
            _this.animationEnd = true;
            /**记录上次点击的按钮 */
            _this.btnIndex = 1;
            _this.skinName = "resource/skins/hunter/HunterDetailsSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            // this.groupAttribute.cacheAsBitmap = true;
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnHelp.visible = false;
            }
            return _this;
        }
        HunterDetail.prototype.init = function () {
            this.arrAttrs = [];
            this.arrAttrsAdd = [];
            for (var i = 1; i <= 10; i++) {
                var labelAttri = this["labelAttri" + i];
                if (labelAttri == null || labelAttri == undefined) {
                    throw Error("label attri is undefined, please check the spell.");
                }
                this.arrAttrs.push(labelAttri);
                var labelAttriAdd = this["labelAttriAdd" + i];
                if (labelAttriAdd == null || labelAttriAdd == undefined) {
                    throw Error("label attri add is undefined, please check the spell.");
                }
                this.arrAttrsAdd.push(labelAttriAdd);
            }
            this.fateHolesMap = [];
            this.groupAttrMap = [];
            for (var i = 1; i <= 4; i++) {
                var hole = new HunterDetailFateHole();
                hole.btnFate = this["btnFate" + i];
                hole.imgFate = this["imgFate" + i];
                hole.imgIcon = this["imgIcon" + i];
                hole.imgActive = this["imgActive" + i];
                hole.imgRed = this["imgRed" + i];
                hole.labelFate = this["labelFate" + i];
                this.fateHolesMap[i] = hole;
                var group = this.groupTeach.getChildByName("groupAttr" + i);
                group.touchEnabled = true;
                group.touchChildren = true;
                group.addEventListener(egret.TouchEvent.TOUCH_TAP, this["onBtnGroupAttr" + i], this);
                this.groupAttrMap[i] = group;
                this["btnFate" + i].addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                    zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
                }, this);
                this["imgFate" + i].addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                    zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
                }, this);
            }
            this.btnObtain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnObtain, this);
            this.btnActive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActive, this);
            this.btnPromtion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPromtion, this);
            this.btnGoUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoUpLevel, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
            this.btnActive.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);
            this.btnObtain.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_HUNTER_BADGE, this.reloadGeneral, this);
            zj.Game.EventManager.on(zj.GameEvent.SET_HUNTER_ITEM, this.udpateInfo, this);
        };
        HunterDetail.prototype.udpateInfo = function () {
            if (this.generalId) {
                this.setCurrentHole();
            }
        };
        // implement the function from the super class
        HunterDetail.prototype.reloadGeneral = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.labelPower.text = hunterInfo.battleValue.toString();
            var stepInfo = zj.PlayerHunterSystem.GetNextStep(this.generalId);
            if (stepInfo != null) {
                this.labelTitleLevel.text = stepInfo.name;
                this.labelTitleLevel.textColor = zj.Helper.GetStepColor(hunterInfo.step + 1);
                this.labelGold.text = zj.PlayerHunterSystem.GetStep(this.generalId).consume_money.toString();
            }
            else {
                this.labelTitleLevel.text = zj.TextsConfig.TextsConfig_Error.wait;
                this.labelGold.text = "0";
            }
            this.animationEnd = true;
            this.holeSelect();
        };
        HunterDetail.prototype.onBtnGroupAttr1 = function () {
            this.holeSelect(1);
            this.btnIndex = 1;
        };
        HunterDetail.prototype.onBtnGroupAttr2 = function () {
            this.holeSelect(2);
            this.btnIndex = 2;
        };
        HunterDetail.prototype.onBtnGroupAttr3 = function () {
            this.holeSelect(3);
            this.btnIndex = 3;
        };
        HunterDetail.prototype.onBtnGroupAttr4 = function () {
            this.holeSelect(4);
            this.btnIndex = 4;
        };
        HunterDetail.prototype.holeSelect = function (selectedIndex) {
            if (selectedIndex == null) {
                if (this.currentSelectedIndex != null) {
                    // if reload general or refresh, keep the same as the last selected index 
                    this.setCurrentHole();
                    return;
                }
                else {
                    selectedIndex = 1;
                }
            }
            this.currentSelectedIndex = selectedIndex;
            this.setCurrentHole();
        };
        HunterDetail.prototype.setCurrentHole = function () {
            // current selected hole show selected image, and don't response tap event
            for (var i = 1; i <= 4; i++) {
                this.setHoleInfo(i);
            }
            this.setAttributeInfo();
            this.setCurrentHoleAttributeInfo();
            this.setButtons();
            this.setActiveState();
        };
        HunterDetail.prototype.setHoleInfo = function (index) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var partnerInfo = zj.PlayerHunterSystem.GetPartner(this.generalId, index);
            var partnerLevel = zj.PlayerHunterSystem.GetPartnerLv(this.generalId, index);
            var holeInfo = zj.PlayerHunterSystem.GetHole(this.generalId, index);
            // 是否激活
            var bActive = (hunterInfo.step < partnerLevel);
            // 是否够数量激活
            var currentCount = zj.Game.PlayerItemSystem.itemCount(partnerInfo.id);
            var activateNumber = holeInfo.activate_num;
            var bNumberEnough = (currentCount >= activateNumber);
            // 是否够等级激活
            var bLevel = (hunterInfo.level >= zj.PlayerHunterSystem.GetHoleLevel(this.generalId, index));
            var fateHole = this.fateHolesMap[index];
            fateHole.imgFate.visible = (index == this.currentSelectedIndex);
            fateHole.imgIcon.source = zj.cachekey(partnerInfo.path, this);
            fateHole.labelFate.visible = !bActive;
            fateHole.labelFate.text = currentCount.toString() + "/" + activateNumber.toString();
            fateHole.labelFate.textColor = (!bActive && bNumberEnough) ? zj.ConstantConfig_Common.Color.green : zj.ConstantConfig_Common.Color.red;
            var masureWidth = fateHole.labelFate.textWidth;
            fateHole.labelFate.width = masureWidth + 5;
            fateHole.imgActive.visible = bActive;
            fateHole.imgRed.visible = (!bActive && bNumberEnough);
            var group = this.groupAttrMap[index];
            group.touchChildren = (index != this.currentSelectedIndex);
            var childName = "hui-zhang-sao-guang";
            var display = group.getChildByName(childName);
            if (display) {
                group.removeChild(display);
            }
            if (bActive) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_lieren_huizhang", "armatureName", "000_saoguang", 0).then(function (display) {
                    display.x = group.width * 0.5;
                    display.y = group.height * 0.5;
                    display.name = childName;
                    group.addChild(display);
                });
            }
            return !bActive && bLevel && bNumberEnough;
        };
        HunterDetail.prototype.setAttributeInfo = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            var info = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfo)[0];
            var attrsAddInfo = zj.PlayerHunterSystem.HXHCalcGelOtherAttrToShow(hunterInfo);
            var attriShow = zj.TableEnum.EnumHunterAttriShow.slice();
            for (var i = 0; i < attriShow.length; i++) {
                var index = attriShow[i] - 1;
                var attrStr = Math.ceil(info[index]).toString();
                var attrAddStr = "";
                if (zj.TableEnum.EnumHunterAttriShowFloat[index]) {
                    if (attrsAddInfo[index] % 1 >= 0.1) {
                        attrAddStr = "+" + attrsAddInfo[index].toFixed(1);
                    }
                    else {
                        attrAddStr = "+" + attrsAddInfo[index].toFixed(0);
                    }
                }
                else {
                    attrAddStr = "+" + Math.ceil(attrsAddInfo[index]);
                }
                if (i >= 4) {
                    attrStr += "%";
                    attrAddStr += "%";
                }
                // if (!Device.isDebug) { // -- 服务器数据
                //     let serverInfo = Helper.AttriConvertTbl(hunterInfo.attri);
                //     attrAddStr += " s: " + Math.ceil(serverInfo[index]).toString();
                // }
                this.arrAttrs[i].text = attrStr;
                this.arrAttrsAdd[i].text = attrAddStr;
            }
            var path = "ui_hunter_OrnLine_png";
            for (var i = 1; i <= 4; i++) {
                this["labelLine" + i].source = zj.cachekey(path, this);
            }
        };
        HunterDetail.prototype.setCurrentHoleAttributeInfo = function () {
            var partnerInfo = zj.PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex);
            this["labelCourage"].text = partnerInfo.name;
            this["labelCourage"].textColor = zj.ConstantConfig_Common.Color.quality_level_color[partnerInfo.quality - 1];
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var holeInfo = zj.PlayerHunterSystem.GetHoleValueTbl(this.generalId, hunterInfo.step, this.currentSelectedIndex);
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriShow.length; i++) {
                var v = zj.TableEnum.EnumHunterAttriShow[i];
                if (holeInfo[v - 1] != 0) {
                    var text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.Attri[v - 1], holeInfo[v - 1]);
                    this["labelAddAtt1"].text = text;
                    break;
                }
            }
        };
        HunterDetail.prototype.setButtons = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var partnerInfo = zj.PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex);
            var partnerLevel = zj.PlayerHunterSystem.GetPartnerLv(this.generalId, this.currentSelectedIndex);
            var holeLevel = zj.PlayerHunterSystem.GetHoleLevel(this.generalId, this.currentSelectedIndex);
            var holeInfo = zj.PlayerHunterSystem.GetHole(this.generalId, this.currentSelectedIndex);
            // 是否激活
            var bActive = (hunterInfo.step < partnerLevel);
            // 是否够等级激活
            var bLevel = (hunterInfo.level >= holeLevel);
            // 是否够数量激活
            var bNumberEnough = zj.Game.PlayerItemSystem.itemCount(partnerInfo.id) >= holeInfo.activate_num;
            this.groupLowLevel.visible = (bNumberEnough && !bLevel);
            this.labelLowLevel.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.hunter_act_low_level, holeLevel);
            this.groupActive.visible = true;
            this.btnObtain.visible = (!bActive && !bNumberEnough);
            this.btnActive.visible = !this.btnObtain.visible;
            this.btnActive.enabled = (!bActive && bLevel);
            this.groupPromtion.visible = !(bNumberEnough && !bLevel);
            this.btnGoUpLevel.visible = !this.groupPromtion.visible;
            this.playAnimationInActive((!bActive && bNumberEnough && bLevel));
        };
        HunterDetail.prototype.setActiveState = function () {
            var gnr = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var allActived = true;
            for (var i = 1; i <= 4; i++) {
                var partnerLv = zj.PlayerHunterSystem.GetPartnerLv(this.generalId, i);
                if (gnr.step >= partnerLv || gnr.step == zj.CommonConfig.general_max_quality) {
                    allActived = false;
                    break;
                }
            }
            this.btnPromtion.enabled = allActived;
            this.imgPromotionRed.visible = allActived;
            this.playAnimationInPromtion(allActived);
        };
        HunterDetail.prototype.playAnimationInActive = function (play) {
            var childName = "hunter-detail-active-button";
            this.playAnimaionInButton(this.groupActive, childName, "001_xuanzhong_anniu1", play);
        };
        HunterDetail.prototype.playAnimationInPromtion = function (play) {
            var childName = "hunter-detail-promtion-button";
            this.playAnimaionInButton(this.groupPromtion, childName, "002_xuanzhong_anniu2", play);
        };
        HunterDetail.prototype.playAnimaionInButton = function (group, childName, animationName, play) {
            var child = group.getChildByName(childName);
            if (child)
                group.removeChild(child);
            if (play) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", animationName, 0).then(function (display) {
                    display.x = group.width * 0.5;
                    display.y = group.height * 0.5;
                    display.name = childName;
                    group.addChild(display);
                });
            }
        };
        HunterDetail.prototype.onBtnActive = function () {
            var _this = this;
            if (this.animationEnd == false)
                return;
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.Game.PlayerHunterSystem.activatePartner(this.generalId, this.currentSelectedIndex)
                .then(function () {
                zj.Game.SoundManager.playEffect("ui_yinzhang_mp3", 500);
                _this.promptBattleValue(function () {
                    var visible = true;
                    for (var i = 1; i <= 5; i++) {
                        if (visible == true) {
                            if (_this.currentSelectedIndex == null || _this.currentSelectedIndex >= 4) {
                                _this.currentSelectedIndex = 1;
                            }
                            else {
                                _this.currentSelectedIndex += 1;
                            }
                            if (_this.fateHolesMap[_this.currentSelectedIndex].labelFate.textColor == zj.ConstantConfig_Common.Color.green && _this.fateHolesMap[_this.currentSelectedIndex].imgActive.visible == false) {
                                if (i != 4) {
                                    visible = false;
                                }
                            }
                        }
                    }
                    for (var i = 1; i <= 4; i++) {
                        if (visible == true) {
                            if (_this.fateHolesMap[_this.currentSelectedIndex].labelFate.textColor == zj.ConstantConfig_Common.Color.red && _this.fateHolesMap[_this.currentSelectedIndex].imgActive.visible == false) {
                                visible = false;
                                break;
                            }
                            if (_this.currentSelectedIndex == null || _this.currentSelectedIndex >= 4) {
                                _this.currentSelectedIndex = 1;
                            }
                            else {
                                _this.currentSelectedIndex += 1;
                            }
                        }
                    }
                    _this.reloadGeneral();
                });
                _this.promptActive();
            });
        };
        HunterDetail.prototype.onBtnObtain = function () {
            var _this = this;
            var holeInfo = zj.PlayerHunterSystem.GetHole(this.generalId, this.currentSelectedIndex);
            // loadUI(Common_OutPutDialog)
            //     .then((dialog: Common_OutPutDialog) => {
            //         let id = PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex).id;
            //         dialog.setInfo(id, this, () => {
            //             this.holeSelect(this.currentSelectedIndex);
            //         });
            //         dialog.setNeedNum(holeInfo.activate_num);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            var itemId = zj.PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex).id;
            var mobIds = zj.Game.PlayerInstanceSystem.GetProp(itemId);
            if (mobIds && mobIds.length > 0) {
                var mobMax = zj.Game.PlayerInstanceSystem.curInstances[1].maxMobID;
                var mobMin = 9000000;
                for (var i = 0; i < mobIds.length; ++i) {
                    if (mobIds[i] <= mobMax) {
                        zj.Game.PlayerInstanceSystem.StartFast(mobIds[0], itemId, holeInfo.activate_num, this, function () {
                            _this.holeSelect(_this.currentSelectedIndex);
                        });
                        return;
                    }
                    mobMin = Math.min(mobIds[i], mobMin);
                }
                var maxMobId = zj.Game.PlayerInstanceSystem.getLastInstance(20);
                if (mobMin <= maxMobId) {
                    var table = zj.TableInstance.Item(mobMin);
                    if (table) {
                        var _a = zj.Game.PlayerInstanceSystem.ChapterIdx(mobMin), areaId = _a[0], chapIdx = _a[1];
                        var instanceName = areaId + "-" + (Number(chapIdx) + 1) + table.instance_name;
                        zj.toast(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.SweepNoOpen, instanceName));
                    }
                    else {
                        console.error("sweep fast error: " + mobMin);
                    }
                }
                else {
                    // toast("副本未开启");
                }
            }
        };
        HunterDetail.prototype.onBtnGoUpLevel = function () {
            var _this = this;
            if (zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level > 0) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROLEVEL, true)) {
                    zj.loadUI(zj.HunterUpLevel).then(function (dialog) {
                        dialog.setInfo(_this.generalId, function (isUpLevelSuccess, isAdvance) {
                            if (isUpLevelSuccess) {
                                _this.father.onSubUIEvent(zj.HunterSubUIEvent.Refresh);
                                _this.reloadGeneral();
                            }
                            else if (isAdvance) {
                                // to 
                            }
                        }, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.add_exp_soul);
            }
            zj.Teach.addTeaching();
        };
        HunterDetail.prototype.addAnimatoin = function (dbName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            var thisOne = this;
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, "002_jinjie2", 1)
                .then(function (display) {
                display.x = _this["groupTeach"].width / 2 - 410;
                display.y = _this["groupTeach"].height / 2 - 140;
                _this["groupTeach"].addChild(display);
                display.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    var ui = thisOne.father.getChildByName("shade");
                    if (ui) {
                        thisOne.father.removeChild(ui);
                    }
                    _this.currentSelectedIndex = 1;
                    _this.reloadGeneral();
                    zj.loadUI(zj.HunterUpAdvanced)
                        .then(function (dialog) {
                        dialog.setInfo(_this.generalId, _this.oldBattleValue, function () {
                            egret.setTimeout(function () {
                                _this.promptBattleValue(function () {
                                });
                            }, _this, 600);
                            _this.animationEnd = true;
                        });
                        dialog.show();
                    }).
                        catch(function () {
                        _this.animationEnd = true;
                    });
                }, _this);
            }).catch(function () {
                _this.animationEnd = true;
            });
        };
        HunterDetail.prototype.onBtnPromtion = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROGRADE, true)) {
                if (this.animationEnd == false)
                    return;
                this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
                this.animationEnd = false;
                var thisOne = this;
                zj.Game.PlayerHunterSystem.upQuality(this.generalId)
                    .then(function () {
                    zj.Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);
                    //添加遮罩
                    if (thisOne.shade == null) {
                        thisOne.shade = new zj.CommonShade();
                        thisOne.shade.name = "shade";
                    }
                    thisOne.father.addChild(thisOne.shade);
                    // egret.Tween.get(this).wait(3000).call(() => {
                    //     let ui = this.father.getChildByName("shade");
                    //     if (ui) {
                    //         this.father.removeChild(ui);
                    //     }
                    // })
                    thisOne.father.onSubUIEvent(zj.HunterSubUIEvent.Refresh);
                    zj.Game.DragonBonesManager.playAnimation(thisOne, "ui_lieren_jinjie", "armatureName", "001_jinjie1", 1)
                        .then(function (display) {
                        display.x = thisOne["groupTeach"].width / 2;
                        display.y = thisOne["groupTeach"].height / 2;
                        thisOne["groupTeach"].addChild(display);
                        display.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                            thisOne.addAnimatoin("ui_lieren_jinjie", "armatureName");
                            var ui = thisOne.father.getChildByName("shade");
                            if (ui) {
                                thisOne.father.removeChild(ui);
                            }
                        }, thisOne);
                    }).catch(function () {
                        thisOne.animationEnd = true;
                    });
                }).catch(function (msg) {
                    thisOne.animationEnd = true;
                    if (msg == 10304) {
                        thisOne.btnActive.enabled = false;
                        thisOne.btnPromtion.enabled = false;
                        thisOne.imgPromotionRed.visible = false;
                        thisOne.playAnimationInPromtion(false);
                    }
                });
            }
        };
        HunterDetail.prototype.promptBattleValue = function (cb) {
            // 当前武将战斗力
            var oldValue = this.oldBattleValue;
            var newValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            console.log("---- 猎人信息最新战力 ", newValue);
            zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
            if (cb)
                cb();
        };
        HunterDetail.prototype.promptActive = function () {
            var _this = this;
            var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.common_hint[4], this);
            var image = new eui.Image(source);
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                }, _this);
                armatureDisplay.animation.play("000_tishi", 1);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.x = _this.groupTeach.width * 0.2;
                armatureDisplay.y = _this.groupTeach.height * 0.4;
                _this.groupTeach.addChild(armatureDisplay);
            });
        };
        HunterDetail.prototype.onBtnHelp = function () {
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.loadBySmallType(301);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        return HunterDetail;
    }(zj.HunterSubUI));
    zj.HunterDetail = HunterDetail;
    __reflect(HunterDetail.prototype, "zj.HunterDetail");
    var HunterDetailFateHole = (function () {
        function HunterDetailFateHole() {
        }
        return HunterDetailFateHole;
    }());
    zj.HunterDetailFateHole = HunterDetailFateHole;
    __reflect(HunterDetailFateHole.prototype, "zj.HunterDetailFateHole");
})(zj || (zj = {}));
//# sourceMappingURL=HunterDetail.js.map