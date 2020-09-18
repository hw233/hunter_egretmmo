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
     * @date 2018-11-14
     *
     * @class 猎人英雄界面
     */
    var HunterHero = (function (_super) {
        __extends(HunterHero, _super);
        function HunterHero() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.starArr = [];
            _this.lastSelectedGeneralId = null;
            _this.listBottomData = new eui.ArrayCollection();
            _this.callback = null;
            _this.thisObj = null;
            _this.generalId = null;
            _this.soulId = null;
            _this.canEquip = false;
            _this.index = 0; //为于list里的猎人索引;
            _this.skinName = "resource/skins/hunter/HunterHeroSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.Up, _this);
            _this.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.begain, _this);
            _this.init();
            _this.hiddenBottomList();
            if (zj.Device.isReviewSwitch) {
                _this.btnHelp.visible = false;
            }
            return _this;
        }
        HunterHero.prototype.bubbleSort = function (array) {
            var tmp = 0;
            var lastExchangeIndex = 0;
            var sortBorder = array.length - 1;
            for (var i = 0; i < array.length; i++) {
                var isSorted = true;
                for (var j = 0; j < sortBorder; j++) {
                    if (array[j] > array[j + 1]) {
                        tmp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = tmp;
                        isSorted = false;
                        lastExchangeIndex = j;
                    }
                }
                sortBorder = lastExchangeIndex;
                if (isSorted)
                    break;
            }
            return array;
        };
        HunterHero.prototype.init = function () {
            var _this = this;
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnHelp.addEventListener(tap, this.onBtnHelp, this);
            this.btnBreak.addEventListener(tap, this.onBtnBreak, this);
            this.btnUpLevel.addEventListener(tap, this.onBtnUpLevel, this);
            this.btnUpStar.addEventListener(tap, this.onbtnUpStar, this);
            this.btnPlayerSkill.addEventListener(tap, this.onBtnPlayerSkill, this);
            this.btnViewFate.addEventListener(tap, this.onBtnViewFate, this);
            this.btnHaveHunter.addEventListener(tap, this.onBtnHaveHunter, this);
            this.btnLeft.addEventListener(tap, this.onBtnLeft, this);
            this.btnRight.addEventListener(tap, this.onBtnRight, this);
            this.groupCallHunter.addEventListener(tap, this.onCallHunter, this);
            // this.btnAvata.addEventListener(tap, this.onBtnAvata, this);
            // this.spriteType2
            this.btnAvata.addEventListener(tap, function () {
                if (_this.isHasAvata()) {
                    zj.loadUI(zj.Hunterskin).then(function (dialog) {
                        dialog.setInfo(_this.generalId);
                        dialog.CB(function () {
                            _this.refreshHunterInfo();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning("该猎人没有皮肤");
                }
            }, this);
            for (var i = 1; i < 7; i++) {
                var img = this.nodeGet.getChildByName("spriteStar" + i);
                this.starArr.push(img);
            }
            this.currentHunterSortType = zj.Tips.GetSaveTimeForGeneralSort(zj.TableEnum.Enum.HXHHunterEnum.Level);
        };
        HunterHero.prototype.isHasAvata = function () {
            var _this = this;
            /**是否有皮肤 */
            var vis = zj.Table.FindF(zj.PlayerFashionSystem.GetHunterListWithFashion(), function (k, v) {
                return v.general_id == _this.generalId % 100000;
            });
            // /**是否可变身 */
            // let vis1 = Table.FindF(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
            //     return v.general_id == this.generalId % 100000;
            // })
            return vis; //|| vis1;
        };
        HunterHero.prototype.setCallBack = function (cb, thisObj) {
            this.callback = cb;
            this.thisObj = thisObj;
            this.father = thisObj;
        };
        HunterHero.prototype.onBtnHelp = function () {
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.loadBySmallType(101);
            });
        };
        HunterHero.prototype.onBtnBreak = function () {
            var _this = this;
            var breakLevel = zj.TableFunctionOpen.Item(zj.FUNC.HUNTERBREAK).condition;
            if (zj.Game.PlayerInfoSystem.Level >= breakLevel) {
                zj.Tips.tips_HunterBreak_set(1);
            }
            zj.loadUI(zj.HunterBreak)
                .then(function (dialog) {
                dialog.setInfo(_this.generalId, function (isBreakSuccess, isUpLevelSuccess) {
                    if (!_this.callback)
                        return;
                    if (isBreakSuccess) {
                        _this.callback.call(_this.thisObj, 3 /* BreakSuccess */);
                    }
                    if (isUpLevelSuccess) {
                        _this.callback.call(_this.thisObj, 1 /* UpLevelSuccess */);
                    }
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHero.prototype.onBtnUpLevel = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.level <= 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.add_exp_soul);
                return;
            }
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROLEVEL, true) == false)
                return;
            zj.loadUI(zj.HunterUpLevel).then(function (dialog) {
                dialog.setInfo(_this.generalId, function (isUpLevelSuccess, isAdvance) {
                    if (_this.callback) {
                        if (isUpLevelSuccess) {
                            _this.callback.call(_this.thisObj, 1 /* UpLevelSuccess */);
                        }
                        else if (isAdvance) {
                            _this.callback.call(_this.thisObj, 2 /* Advance */);
                        }
                    }
                }, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /** 点击 升星 */
        HunterHero.prototype.onbtnUpStar = function () {
            var _this = this;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROSTAR, true) == false)
                return;
            zj.loadUI(zj.HunterUpStar)
                .then(function (dialog) {
                dialog.setInfo(_this.generalId, _this.father.battleValue, function (type) {
                    // 升星成功，刷新界面.
                    if (_this.callback) {
                        _this.callback.call(_this.thisObj, 0 /* UpGradeSuccess */);
                    }
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHero.prototype.onBtnPlayerSkill = function () {
            console.log("点击攻略");
        };
        HunterHero.prototype.onBtnViewFate = function () {
            var _this = this;
            zj.loadUI(zj.HunterSeeDetail)
                .then(function (dialog) {
                dialog.setInfo((_this.soulId - 30000), function () { });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHero.prototype.onBtnHaveHunter = function () {
            var _this = this;
            zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                dialog.setInfo((_this.soulId), _this, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            }).catch(function () {
                // can't load UI
            });
        };
        HunterHero.prototype.onBtnLeft = function () {
            if (this.callback) {
                this.callback.call(this.thisObj, 4 /* BottomListLeft */);
            }
        };
        HunterHero.prototype.onBtnRight = function () {
            if (this.callback) {
                this.callback.call(this.thisObj, 5 /* BottomListRight */);
            }
        };
        HunterHero.prototype.showUnLock = function () {
            this.nodeUnLock.visible = true;
        };
        HunterHero.prototype.hiddenUnlock = function () {
            this.nodeUnLock.visible = false;
        };
        HunterHero.prototype.showBottomList = function (type) {
            if (this.nodeSelectList.visible == false)
                this.nodeSelectList.visible = true;
            this.btnHelp.visible = false;
            if (type)
                this.currentHunterSortType = type;
            var hunterList = zj.PlayerHunterSystem.GetHunterList(this.currentHunterSortType);
            if (hunterList.length <= 0)
                return;
            this.listBottomData.removeAll();
            for (var i = 0; i < hunterList.length; i++) {
                var v = hunterList[i];
                var data = new zj.HeroItemData();
                data.generalId = v;
                data.type = 2 /* HeroBottom */;
                data.isSelected = (v == this.generalId);
                this.listBottomData.addItem(data);
                if (v == this.generalId) {
                    this.index = i;
                }
            }
            this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onHeroBottomListTap, this);
            this.listBottom.dataProvider = this.listBottomData;
            this.listBottom.itemRenderer = zj.HunterHeroItem;
            this.lastSelectedGeneralId = this.generalId;
            this.scrollList(this.getHunterIndex(this.generalId));
        };
        HunterHero.prototype.onHeroBottomListTap = function (e, Index) {
            if (e != null) {
                this.index = e.itemIndex;
            }
            if (Index != null) {
                this.index = Index;
            }
            var data = this.listBottomData.getItemAt(this.index);
            if (data === null || data.generalId === null || data.generalId === 0) {
                return;
            }
            zj.Tips.SetTipsOfHero(data.generalId);
            var lastSelectedIndex = this.getHunterIndex(this.lastSelectedGeneralId);
            if (lastSelectedIndex >= 0) {
                var lastData = this.listBottomData.getItemAt(lastSelectedIndex);
                lastData.isSelected = false;
                this.listBottomData.replaceItemAt(lastData, lastSelectedIndex);
            }
            data.isSelected = true;
            this.listBottomData.replaceItemAt(data, this.index);
            this.lastSelectedGeneralId = data.generalId;
            this.father.heroBottomListSelected(this.index, data);
        };
        HunterHero.prototype.getHunterIndex = function (id) {
            var index = -1;
            if (id == null || id == undefined || id == 0) {
                return index;
            }
            // binary search
            // let low = 0;
            // let high = this.listBottomData.length - 1;
            // while (low <= high) {
            //     let middle = Math.floor((high - low) / 2);
            //     let data = this.listBottomData.getItemAt(middle) as HeroItemData;
            //     if (data == null || data == undefined) break;
            //     if (data.generalId == id) {
            //         return middle;
            //     } else if (data.generalId > id) {
            //         high = middle - 1;
            //     } else {
            //         low = middle + 1;
            //     }
            // }
            // return index;
            for (var i = 0; i < this.listBottomData.length; i++) {
                var data = this.listBottomData.getItemAt(i);
                if (data != null && data.generalId === id) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        HunterHero.prototype.scrollList = function (selectedIndex) {
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            if (this.listBottomData.length > 4 && this.listBottomData.length - selectedIndex <= 3) {
                selectedIndex = this.listBottomData.length - 3.5;
            }
            var item = new zj.HunterHeroItem();
            var gap = 0; // get the value from the skin
            var scrollWidth = (item.width + gap) * selectedIndex;
            egret.Tween.get(this.listBottom)
                .to({ scrollH: scrollWidth }, 350, egret.Ease.backIn);
        };
        HunterHero.prototype.updateBottomList = function () {
            if (this.nodeSelectList.visible == false || this.listBottom.visible == false)
                return;
            var index = this.getHunterIndex(this.lastSelectedGeneralId);
            var data = this.listBottomData.getItemAt(index);
            if (data) {
                this.listBottomData.replaceItemAt(data, index);
            }
        };
        HunterHero.prototype.hiddenBottomList = function () {
            this.nodeSelectList.visible = false;
            this.btnHelp.visible = true;
            if (zj.Device.isReviewSwitch) {
                this.btnHelp.visible = false;
            }
        };
        HunterHero.prototype.onBtnHero = function () {
            this.nodeUnLock.visible = true;
            this.nodeGet.visible = true;
            this.nodeIcon.visible = true;
            this.nodeLock.visible = false;
            this.nodeRecruit.visible = false;
        };
        HunterHero.prototype.onBtnFragment = function () {
            this.nodeUnLock.visible = false;
            this.nodeGet.visible = false;
            this.nodeIcon.visible = true;
            this.nodeLock.visible = true;
            this.nodeRecruit.visible = true;
        };
        HunterHero.prototype.setGeneralId = function (id, isEntryHeros) {
            // console.log("--- hero set general id = ", id);
            this.generalId = id;
            this.refreshHunterInfo();
            // this.updateBottomList();
            if (isEntryHeros) {
                this.showBottomList(this.currentHunterSortType);
            }
        };
        HunterHero.prototype.setSoulId = function (id, canEquip) {
            // console.log("--- hero set soul id = ", id);
            this.soulId = id;
            this.canEquip = canEquip;
            this.refreshSoulInfo();
        };
        HunterHero.prototype.refreshHunterInfo = function () {
            this.btnAvata.visible = this.isHasAvata();
            var baseInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var roleInfoId = zj.PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
            var roleInfo = zj.PlayerHunterSystem.MapInstance(roleInfoId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseInfo == null || roleInfo == null || hunterInfo == null) {
                throw Error("hunter info or role info can't be null");
            }
            // console.log("\nrefreshHunterInfo --- baseInfo = ", baseInfo, "\nroleInfoId = ", roleInfoId, "\nroleInfo = ", roleInfo, "\n hunterInfo = ", hunterInfo);
            if (hunterInfo.battleValue > 100000) {
                this.labelPlayerPower.text = (hunterInfo.battleValue / 10000).toFixed(1) + "万";
            }
            else {
                this.labelPlayerPower.text = hunterInfo.battleValue.toString();
            }
            // handle level
            var max_level = 0;
            var level = null;
            var levelNext = null;
            if (hunterInfo.break_level != 0 && hunterInfo.level >= 60) {
                _a = zj.PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level), level = _a[0], levelNext = _a[1];
                max_level = 60 + levelNext;
            }
            else {
                max_level = zj.PlayerHunterSystem.GetStep(this.generalId).max_level;
            }
            this.labelLevel.text = hunterInfo.level + "/" + max_level;
            // 设置猎人觉醒星级
            var star = 0;
            if (hunterInfo.level == 0) {
                star = baseInfo.init_star;
            }
            else {
                star = hunterInfo.star;
            }
            for (var i = 1; i <= zj.CommonConfig.general_max_star; i++) {
                var img = this.starArr[i - 1];
                if (img == null || img == undefined)
                    throw Error("star image is null");
                if (i <= star) {
                    var source = zj.UIConfig.UIConfig_Role.heroAwakenStar[hunterInfo.awakePassive.level + 1];
                    img.source = zj.cachekey(source, this);
                }
                else {
                    img.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroAwakenStar[0], this);
                }
            }
            var halfPath = roleInfo.half_path;
            var namePath = baseInfo.name_pic;
            if (hunterInfo.transfer_level && hunterInfo.transfer_level > 0 && hunterInfo.is_show_transfer) {
                var transferTab = zj.TableGeneralTransfer.Table();
                var transformInfo = transferTab[baseInfo.general_id];
                var picRoleInfo = zj.PlayerHunterSystem.MapInstance(transformInfo.transfer_role);
                halfPath = picRoleInfo.half_path;
                namePath = transformInfo.name_pic;
            }
            else {
                namePath = baseInfo.name_pic;
                halfPath = roleInfo.half_path;
            }
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            var typePath = zj.UIConfig.UIConfig_General.hunter_type1[baseInfo.type];
            var type2Path = zj.UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            var titlePath = zj.PlayerHunterSystem.GetStep(this.generalId).name_path;
            this.spriteHunterHalfDraw.source = zj.cachekey(halfPath, this);
            zj.Helper.SetImageFilterColor(this.spriteHunterHalfDraw);
            if (this.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                this.spriteHunterHalfDraw.x = -181;
                this.spriteHunterHalfDraw.y = -204;
            }
            else {
                this.spriteHunterHalfDraw.x = -113;
                this.spriteHunterHalfDraw.y = -107;
            }
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.spriteHunterName.source = zj.cachekey("wx_" + namePath, this);
            }
            else {
                this.spriteHunterName.source = zj.cachekey(namePath, this);
            }
            this.spriteGrade.source = zj.cachekey(gradePath, this);
            this.spriteType.source = zj.cachekey(typePath, this);
            this.spriteType2.source = zj.cachekey(type2Path, this);
            this.spriteTitle.source = zj.cachekey(titlePath, this);
            this.setHunterBreak();
            var _a;
        };
        HunterHero.prototype.refreshSoulInfo = function () {
            var _this = this;
            var generalId = zj.PlayerHunterSystem.SoulIdFindGeneral(this.soulId).general_id;
            var baseInfo = zj.PlayerHunterSystem.Table(generalId);
            var roleInfo = zj.PlayerHunterSystem.MapInstance(baseInfo.general_roleId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            this.btnAvata.visible = false;
            var halfPath = roleInfo.half_path;
            var namePath = baseInfo.name_pic;
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            var typePath = zj.UIConfig.UIConfig_General.hunter_type1[baseInfo.type];
            var type2Path = zj.UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            var titlePath = zj.PlayerHunterSystem.GetStep(this.generalId).name_path;
            this.spriteHunterHalfDraw.source = zj.cachekey(halfPath, this);
            zj.Helper.SetImageFilterColor(this.spriteHunterHalfDraw, 'cool');
            if (this.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                this.spriteHunterHalfDraw.x = -181;
                this.spriteHunterHalfDraw.y = -204;
            }
            else {
                this.spriteHunterHalfDraw.x = -113;
                this.spriteHunterHalfDraw.y = -107;
            }
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.spriteHunterRecruitName.source = zj.cachekey("wx_" + namePath, this);
            }
            else {
                this.spriteHunterRecruitName.source = zj.cachekey(namePath, this);
            }
            this.spriteGrade.source = zj.cachekey(gradePath, this);
            this.spriteType.source = zj.cachekey(typePath, this);
            this.spriteType2.source = zj.cachekey(type2Path, this);
            this.spriteTitle.source = zj.cachekey(titlePath, this);
            var star = baseInfo.init_star;
            var awakenLevel = 0;
            if (hunterInfo != null) {
                awakenLevel = hunterInfo.awakePassive.level;
            }
            zj.Helper.SetAwakeSpriteStar(this.gRecruitStar, star, awakenLevel);
            var obj = this.groupCallHunter.getChildByName("000_zhaomu");
            if (obj)
                this.groupCallHunter.removeChild(obj);
            var callCount = zj.PlayerHunterSystem.SoulIdFindGeneral(this.soulId).soul_count;
            var count = zj.PlayerItemSystem.Count(this.soulId);
            if (callCount <= count) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_zhaomu_eff", null, "000_zhaomu", 0).then(function (display) {
                    display.x = _this.groupCallHunter.width * 0.5 - 10;
                    display.y = _this.groupCallHunter.height * 0.5;
                    display.scaleX = 0.88;
                    display.scaleY = 0.88;
                    display.name = "000_zhaomu";
                    _this.groupCallHunter.addChild(display);
                });
            }
        };
        HunterHero.prototype.onBtnAvata = function () {
            zj.loadUI(zj.FashionMain)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init();
            });
        };
        HunterHero.prototype.onCallHunter = function () {
            var _this = this;
            if (!this.canEquip)
                return;
            // Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), PlayerHunterSystem.Table(generalId).general_id) != -1
            var info = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            zj.Game.PlayerHunterSystem.generalRecruit(this.soulId).then(function (callGeneralId) {
                var generalId = zj.PlayerHunterSystem.GetGeneralId(callGeneralId);
                zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                    dialog.setInfo(generalId, _this.soulId, function () {
                        if (_this.callback) {
                            _this.callback.call(_this.thisObj, 6 /* RecruitSuccess */, callGeneralId);
                        }
                    }, info);
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            });
        };
        HunterHero.prototype.setHunterBreak = function () {
            // 小于6星，显示升星，隐藏突破
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var showBreak = (hunterInfo.star >= 6 && zj.PlayerHunterSystem.Table(this.generalId).aptitude >= 13);
            this.btnBreak.visible = showBreak;
            this.btnUpStar.visible = !showBreak;
            var tips = false;
            var breakLevel = zj.TableFunctionOpen.Item(zj.FUNC.HUNTERBREAK).condition;
            if (zj.Game.PlayerInfoSystem.Level >= breakLevel) {
                tips = zj.Tips.tips_HunterBreak_get(1);
            }
            var using = zj.Table.FindF(hunterInfo.using_break_skill, function (_, v) {
                return v == 0;
            });
            if (tips && hunterInfo.star >= 6 && zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.TableFunctionOpen.Item(zj.FUNC.HUNTERBREAK).condition) {
                this.imgBreakRedDot.visible = true;
            }
            else if (using) {
                this.imgBreakRedDot.visible = true;
            }
            else if (hunterInfo.break_level == zj.CommonConfig.general_max_break) {
                this.imgBreakRedDot.visible = false;
            }
            else {
                this.imgBreakRedDot.visible = false;
            }
        };
        HunterHero.prototype.begain = function (e) {
            if (this.nodeSelectList.visible == false) {
                return;
            }
            this.cx = e.stageX;
            this.cy = e.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
        };
        HunterHero.prototype.Up = function (e) {
            var _this = this;
            if (this.nodeSelectList.visible == false) {
                return;
            }
            var thisOne = this; //缓动动画里this指针会改变
            this.spriteHunterHalfDraw.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begain, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
            var ax = zj.Table.DeepCopy(this.spriteHunterHalfDraw.x);
            var ay = zj.Table.DeepCopy(this.spriteHunterHalfDraw.y);
            if (this.cx - e.stageX > 30) {
                console.log("1111111111111");
                egret.Tween.get(this.spriteHunterHalfDraw)
                    .to({ x: ax - 50, y: ay - 50, alpha: 0 }, 300)
                    .call(function () {
                    if ((thisOne.index + 1) < thisOne.listBottomData.length) {
                        thisOne.onHeroBottomListTap(null, thisOne.index + 1);
                        if (thisOne.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                            ax = -181;
                            ay = -204;
                        }
                        else {
                            ax = -113;
                            ay = -107;
                        }
                    }
                    else {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_HeroMain.beLastHero);
                    }
                    egret.Tween.get(_this.spriteHunterHalfDraw)
                        .to({ x: ax + 50, y: ay + 50, alpha: 0 }, 1)
                        .to({ x: ax, y: ay, alpha: 1 }, 300)
                        .call(function () {
                        thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
                    });
                });
            }
            else if (this.cx - e.stageX < -30) {
                console.log("222222222222");
                egret.Tween.get(this.spriteHunterHalfDraw)
                    .to({ x: ax + 50, y: ay + 50, alpha: 0 }, 300)
                    .call(function () {
                    if ((thisOne.index - 1) >= 0) {
                        thisOne.onHeroBottomListTap(null, thisOne.index - 1);
                        if (thisOne.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                            ax = -181;
                            ay = -204;
                        }
                        else {
                            ax = -113;
                            ay = -107;
                        }
                    }
                    else {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_HeroMain.beFirstHero);
                    }
                    egret.Tween.get(_this.spriteHunterHalfDraw)
                        .to({ x: ax - 50, y: ay - 50, alpha: 0 }, 1)
                        .to({ x: ax, y: ay, alpha: 1 }, 300)
                        .call(function () {
                        thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
                    });
                });
            }
            else {
                thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
            }
        };
        return HunterHero;
    }(zj.UI));
    zj.HunterHero = HunterHero;
    __reflect(HunterHero.prototype, "zj.HunterHero");
})(zj || (zj = {}));
//# sourceMappingURL=HunterHero.js.map