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
     * @class 猎人升星
     */
    var HunterUpStar = (function (_super) {
        __extends(HunterUpStar, _super);
        function HunterUpStar() {
            var _this = _super.call(this) || this;
            _this.callback = null;
            /** 武将ID */
            _this.generalId = null;
            /** 初始武将ID */
            _this.firstGeneralId = null;
            _this.listHerosData = new eui.ArrayCollection();
            /** 材料列表 */
            _this.materialList = [];
            /** 材料武将ID列表 */
            _this.materialGeneralIdList = [];
            _this.isUpStarSuccess = true;
            _this.indexTbl = [];
            _this.itemList = [];
            _this.skinName = "resource/skins/hunter/HunterUpStarSkin.exml";
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnAddGold.visible = false;
                _this.gold.width = 40;
                _this.gold.height = 40;
                _this.jewel.width = 40;
                _this.jewel.height = 40;
                _this.btnAdddiamond.width = 30;
                _this.btnAdddiamond.height = 30;
                _this.btnAdddiamond.y = 7;
            }
            return _this;
        }
        HunterUpStar.prototype.init = function () {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            var leftX = this.width * 0.5 + 40 - this.groupLeft.width;
            this.groupLeft.x = (leftX > 0) ? leftX : 0;
            var rightX = this.width * 0.5 + 80;
            if (rightX + this.groupRight.width >= this.width) {
                this.groupRight.x = this.width - this.groupRight.width;
            }
            else {
                this.groupRight.x = rightX;
            }
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnReturn.addEventListener(tap, this.onBtnReturn, this);
            this.btnAddStar.addEventListener(tap, this.onBtnAddStar, this);
            this.imgIcon.addEventListener(tap, this.onIconTap, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, this.Update, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.Update, this);
            this.Update();
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnBatchStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBatchStar, this);
            for (var i = 0; i < 6; i++) {
                this.materialGeneralIdList.push(0);
            }
            this.listHeros.allowMultipleSelection = true;
            this.listHeros.itemRenderer = zj.HunterUpStarItemLeft;
            this.listHeros.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            this.isUpStarSuccess = false;
            this.loadMaterials();
        };
        HunterUpStar.prototype.isFullScreen = function () {
            return true;
        };
        HunterUpStar.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterUpStar.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        HunterUpStar.prototype.Update = function () {
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelIntegrate.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            //this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        };
        /** 加载升星材料 */
        HunterUpStar.prototype.loadMaterials = function () {
            var _this = this;
            for (var i = 0; i < zj.CommonConfig.general_max_star - 1; i++) {
                var item = new zj.HunterUpStarItemRight();
                var gaps = (this.groupMaterial.width - item.width * 5) / 6;
                item.y = (this.groupMaterial.height - item.height) * 0.5;
                item.x = item.width * i + gaps * (i + 1);
                // 设置回调
                item.setInfo(i, function (index, deselectedId) {
                    _this.onMaterialDeselected(index, deselectedId);
                });
                this.groupMaterial.addChild(item);
                this.materialList.push(item);
            }
        };
        /**
         * 初始化基本信息
         *
         * @description 左侧Base item 取消选中 是调用
         */
        HunterUpStar.prototype.initBaseGeneral = function () {
            this.generalId = 0;
            this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarHunter;
            this.labelHunterTip.textColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            this.labelUpStarNumber.text = "  0";
            this.imgFrame.visible = false;
            this.imgIcon.visible = false;
            this.labelLevel.text = "";
            this.groupCurrentStar.removeChildren();
            this.setNextStarInfo();
            for (var i = 0; i < this.materialList.length; i++) {
                var v = this.materialList[i];
                v.initBaseInfo(i);
            }
            this.showUpStarImage();
            this.groupAttribute.visible = false;
            this.loadList(false);
        };
        HunterUpStar.prototype.setInfo = function (id, battleValue, cb) {
            this.generalId = id;
            this.firstGeneralId = id;
            this.battleValue = battleValue;
            this.callback = cb;
            this.refreshInfo();
        };
        HunterUpStar.prototype.refreshInfo = function (focus) {
            if (focus === void 0) { focus = true; }
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.battleValue = generalInfo.battleValue;
            this.setHeroInfo();
            this.setMaterialLock();
            this.setAttributeInfo();
            this.loadList(focus);
        };
        // 设置英雄信息
        HunterUpStar.prototype.setHeroInfo = function () {
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            // set left group
            this.labelHunterTip.textColor = zj.Helper.GetStepColor(generalInfo.step);
            this.labelHunterTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.starHunter, generalInfo.star, baseGeneralInfo.general_name);
            // set right group
            this.imgFrame.visible = true;
            this.imgIcon.visible = true;
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgIcon.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(headPath, this);
            }
            zj.Helper.SetHeroAwakenStar(this.groupCurrentStar, generalInfo.star, generalInfo.awakePassive.level);
            this.labelLevel.text = generalInfo.level.toString();
            var showChangeGeneral = zj.Tips.GetSaveBoolForGeneralUpStar();
            this.imgHunterUpStarTip.visible = !showChangeGeneral;
            // 设置星星显示
            this.setNextStarInfo();
            var cost = baseGeneralInfo.up_star_money[generalInfo.star - 1];
            // 新手处理
            if (cost == null || cost == undefined) {
                cost = 0;
            }
            this.labelUpStarNumber.text = zj.Set.NumberUnit2(cost);
        };
        // 设置右侧属性信息
        HunterUpStar.prototype.setAttributeInfo = function () {
            if (this.generalId == null || this.generalId == 0)
                return;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            // let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            if (hunterInfo.star == zj.CommonConfig.general_max_star || this.hunterMaxStar(this.generalId, hunterInfo.star) == true) {
                this.showUpStarImage(false, true);
                this.groupAttribute.visible = false;
            }
            else {
                this.showUpStarImage(true);
                this.groupAttribute.visible = true;
            }
            this.groupAttribute.removeChildren();
            var _a = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(zj.Table.DeepCopy(hunterInfo)), attr1 = _a[0], battleValue1 = _a[1];
            var nextHunterInfo = zj.Table.DeepCopy(hunterInfo);
            nextHunterInfo.star += 1;
            var _b = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(nextHunterInfo), attr2 = _b[0], battleValue2 = _b[1];
            // sort as descend
            var attriShow = zj.TableEnum.EnumHunterAttriShow2.slice();
            var attriArray = attriShow.sort(function (a, b) {
                return b - a;
            });
            for (var i = 0; i <= attriArray.length; i++) {
                var v = attriArray[i];
                var item = new zj.HunterUpStarAttributeItem();
                var name_1 = void 0, value = void 0, nextValue = void 0;
                if (i == attriArray.length) {
                    name_1 = zj.Helper.StringFormat("%s", zj.TextsConfig.TextsConfig_Hunter.battleValue);
                    value = zj.Helper.StringFormat("%s", zj.Set.NumberUnit3(Number(battleValue1)));
                    nextValue = zj.Helper.StringFormat("%s", zj.Set.NumberUnit3(Number(battleValue2)));
                }
                else {
                    name_1 = zj.Helper.StringFormat("%s", zj.TextsConfig.TextsConfig_HeroMain.attr[v]);
                    value = zj.Helper.StringFormat("+%s", Math.ceil(attr1[v - 1]));
                    nextValue = zj.Helper.StringFormat("+%s", Math.ceil(attr2[v - 1]));
                    if (v == zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || v == zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA) {
                        value += "%";
                        nextValue += "%";
                    }
                }
                item.x = 0;
                item.y = (item.height) * i;
                item.setInfo(name_1, value, nextValue);
                this.groupAttribute.addChild(item);
            }
            var uplevel = zj.TableBaseGeneral.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple).up_star_add_skillLevel[hunterInfo.star - 1];
            if (uplevel != 0) {
                var item = new zj.HunterUpStarAttributeItem();
                var name_2, value = void 0, nextValue = void 0;
                name_2 = zj.TextsConfig.TextsConfig_Hunter.level_max;
                value = zj.Helper.StringFormat("          " + zj.TextsConfig.TextsConfig_Hunter.skill_level, zj.PlayerHunterSystem.GetMaxLevel(this.generalId));
                nextValue = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.skill_level, zj.PlayerHunterSystem.GetMaxLevel(this.generalId) + uplevel);
                item.setInfo(name_2, value, nextValue);
                item.x = 0;
                item.y = item.height * (attriArray.length + 1);
                this.groupAttribute.addChild(item);
            }
        };
        /** 设置猎人列表 */
        HunterUpStar.prototype.loadList = function (focus) {
            this.propTbl = zj.PlayerHunterSystem.ChooseUpStarMeterial(this.firstGeneralId);
            var localTbl = zj.Table.DeepCopy(this.propTbl);
            var fix = zj.PlayerItemSystem.FixCount(this.propTbl.length, 25, 5);
            for (var i = 0; i < fix; i++) {
                localTbl.push(0);
            }
            this.listHerosData.removeAll();
            var index = -1;
            for (var i = 0; i < localTbl.length; i++) {
                var v = localTbl[i];
                var itemData = new zj.HunterUpStarItemLeftData();
                itemData.generalId = v;
                itemData.fatherGeneralId = this.generalId;
                if (this.generalId != 0 && this.generalId != null && v == this.generalId) {
                    itemData.isSelected = true;
                    index = i;
                }
                else {
                    itemData.isSelected = false;
                }
                // itemData.father = this;
                this.listHerosData.addItem(itemData);
            }
            this.listHeros.dataProvider = this.listHerosData;
            if (focus == true) {
                this.scrollList(index);
            }
        };
        HunterUpStar.prototype.scrollList = function (selectedIndex) {
            if (selectedIndex < 0)
                return;
            var row = Math.floor(selectedIndex / 5);
            var gap = 3;
            var item = new zj.HunterUpStarItemLeft();
            var maxRow = Math.floor(this.listHerosData.length / 5);
            if (maxRow - row <= 5) {
                row = maxRow - 5;
            }
            var scrolHeight = (item.height + gap) * row;
            egret.Tween.get(this.listHeros)
                .to({ scrollV: scrolHeight }, 350, egret.Ease.backIn);
        };
        HunterUpStar.prototype.onListHerosTap = function (e) {
            var data = this.listHerosData.getItemAt(e.itemIndex);
            var item = this.listHeros.getElementAt(e.itemIndex);
            if (data == null || item == null)
                return;
            if (item.isInLongPress == true) {
                item.resumeLongPressState();
                return;
            }
            if (data.fatherGeneralId == 0 || data.fatherGeneralId == null) {
                if (data.generalId == 0 || data.generalId == null) {
                    return;
                }
                else {
                    // first tap regard as the base item
                    // to be base general
                    this.generalId = data.generalId;
                    this.refreshInfo(false);
                    return;
                }
            }
            else {
                if (data.generalId == 0 || data.generalId == null) {
                    return;
                }
                if (data.fatherGeneralId == data.generalId) {
                    // item base deselected
                    // unload base general
                    this.initBaseGeneral();
                }
                else if (item.type == zj.HunterState.Defence) {
                    var msg = zj.TextsConfig.TextsConfig_Hunter.defence_general;
                    if (item.defenceType == 1) {
                        msg = zj.TextsConfig.TextsConfig_Hunter.defence_general1;
                    }
                    else if (item.defenceType == 2) {
                        msg = zj.TextsConfig.TextsConfig_Hunter.defence_general2;
                    }
                    else if (item.defenceType == 3) {
                        msg = zj.TextsConfig.TextsConfig_Hunter.defence_general3;
                    }
                    else if (item.defenceType == 4) {
                        msg = zj.TextsConfig.TextsConfig_Hunter.defence_general4;
                    }
                    zj.toast_warning(msg);
                    return;
                }
                else if (item.type == zj.HunterState.BFirst) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.hunter_be_first);
                }
                else if (zj.Game.PlayerHunterSystem.queryHunter(data.generalId).star == zj.Game.PlayerHunterSystem.queryHunter(data.fatherGeneralId).star) {
                    // judge material is full or not
                    var full = zj.Table.FindF(this.materialGeneralIdList, function (_, _v) {
                        return _v == 0;
                    });
                    if (full == false && data.isSelected == false) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.general_upstar_num_max);
                        return;
                    }
                    data.isSelected = !data.isSelected;
                    this.listHerosData.replaceItemAt(data, e.itemIndex);
                    this.setMaterialLock(data.generalId);
                }
            }
        };
        /** 设置下一级别显示的星星 */
        HunterUpStar.prototype.setNextStarInfo = function () {
            this.groupNextStar.visible = true;
            // 取消选中，只显示暗星
            var star = 0;
            var level = 0;
            if (this.generalId != null && this.generalId != 0) {
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
                star = hunterInfo.star + 1;
                level = hunterInfo.awakePassive.level + 1;
            }
            zj.Helper.NodeStarByAlignLeft(this.groupNextStar, star, zj.CommonConfig.general_max_star, null, true, zj.UIConfig.UIConfig_Role.heroAwakenStar[level]);
        };
        /**
         * 设置材料锁
         *
         * @param generalId 武将ID
         *
         * @description 子类材料选中或者取消选中
         */
        HunterUpStar.prototype.setMaterialLock = function (generalId) {
            if (generalId == null || generalId == undefined) {
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
                var star = hunterInfo.star;
                var copyGeneralIdList = this.materialGeneralIdList.concat(); // 数组浅拷贝
                for (var i = 0; i < copyGeneralIdList.length; i++) {
                    if (this.hunterMaxStar(this.generalId, star) == true) {
                        this.materialGeneralIdList[i] = -1;
                    }
                    else {
                        var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
                        var pos = baseGeneralInfo.up_star_soul[star - 1];
                        if (pos == null || pos == undefined) {
                            this.materialGeneralIdList[i] = -1;
                        }
                        else {
                            if (pos == zj.CommonConfig.general_max_star) {
                                this.materialGeneralIdList[i] = -1;
                            }
                            else {
                                // 设置是否上锁
                                this.materialGeneralIdList[i] = ((i + 1) > pos) ? -1 : 0;
                            }
                        }
                    }
                }
                // 刷新材料项
                for (var i = 0; i < this.materialList.length; i++) {
                    var v = this.materialList[i];
                    v.refresh(this.materialGeneralIdList[i], this.generalId);
                }
            }
            else {
                // 判断材料列表 是否已经选中，选中则需要取消选中，反之选中
                var _a = zj.Table.FindR(this.materialGeneralIdList, function (_, _v) {
                    return _v == generalId;
                }), _ = _a[0], index = _a[1];
                if (index == null) {
                    var emptyIndex = null;
                    for (var i = 0; i < this.materialGeneralIdList.length; i++) {
                        var v = this.materialGeneralIdList[i];
                        if (v == 0) {
                            emptyIndex = i;
                            break;
                        }
                    }
                    if (emptyIndex != null) {
                        // selected material
                        this.materialGeneralIdList[emptyIndex] = generalId;
                        this.materialList[emptyIndex].refresh(generalId, this.generalId);
                    }
                }
                else {
                    // deselected material
                    this.materialGeneralIdList[index] = 0;
                    this.materialList[index].refresh(0, this.generalId);
                }
            }
        };
        /** 猎人是否满级 */
        HunterUpStar.prototype.hunterMaxStar = function (generalId, star) {
            var mushrooms = [10057, 10058, 10059, 10074]; // 5星蘑菇不升级
            var ret = (star >= 5) && (zj.Table.VIn(mushrooms, zj.PlayerHunterSystem.GetGeneralId(generalId)) == true || zj.PlayerHunterSystem.Table(generalId).aptitude == 11);
            return ret;
        };
        /**
         * 材料取消选中的点击事件
         * @param index 索引
         * @param id 武将ID
         */
        HunterUpStar.prototype.onMaterialDeselected = function (index, id) {
            if (id <= 0 || id == null) {
                return;
            }
            var i = this.materialGeneralIdList.indexOf(id);
            if (i >= 0) {
                // 刷新材料
                this.materialGeneralIdList[i] = 0;
                this.materialList[i].refresh(0, this.generalId);
                // list 取消选中
                var itemIndex = -1;
                for (var i_1 = 0; i_1 < this.listHerosData.length; i_1++) {
                    var v = this.listHerosData.getItemAt(i_1);
                    if (v.generalId == id) {
                        itemIndex = i_1;
                        break;
                    }
                }
                if (itemIndex < 0) {
                    return;
                }
                var itemData = this.listHerosData.getItemAt(itemIndex);
                itemData.isSelected = false;
                this.listHerosData.replaceItemAt(itemData, itemIndex);
            }
        };
        /** 点击头像 */
        HunterUpStar.prototype.onIconTap = function () {
            if (this.generalId != null && this.generalId != 0) {
                zj.Tips.SetSaveBoolForGeneralUpStar(true);
                this.imgHunterUpStarTip.visible = false;
                this.initBaseGeneral();
            }
        };
        /**
         * 升星图片
         * @param hide 是否隐藏
         * @param isMax 是否满级
         */
        HunterUpStar.prototype.showUpStarImage = function (hide, isMax) {
            if (hide === void 0) { hide = false; }
            if (isMax === void 0) { isMax = false; }
            this.imgUpStar.visible = !hide;
            var max = "ui_hunter_WordsTipUpStarMax_png";
            var attri = "ui_hunter_WordsTipUpStarAtt_png";
            this.imgUpStar.source = (isMax) ? zj.cachekey(max, this) : zj.cachekey(attri, this);
        };
        HunterUpStar.prototype.onBtnReturn = function () {
            if (this.isUpStarSuccess == true) {
                if (this.callback) {
                    this.callback();
                }
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /** 点击升星 */
        HunterUpStar.prototype.onBtnAddStar = function () {
            var _this = this;
            if (this.generalId == 0 || this.generalId == null) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.chooseUpStarHunter);
                return;
            }
            if (zj.Table.VIn(this.materialGeneralIdList, 0)) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Convert.not_enough);
                return;
            }
            var overA = zj.Table.FindF(this.materialGeneralIdList, function (_, _v) {
                if (_v != -1 && _v != 0) {
                    return (zj.PlayerHunterSystem.Table(_v).aptitude == 13);
                }
                return false;
            });
            var overS = zj.Table.FindF(this.materialGeneralIdList, function (_, _v) {
                if (_v != -1 && _v != 0) {
                    return (zj.PlayerHunterSystem.Table(_v).aptitude == 14);
                }
                return false;
            });
            if (overA == true) {
                var msg = zj.TextsConfig.TextsConfig_HeroMain.AddStar_OverA;
                zj.TipManager.ShowConfirmCancel(msg, function () {
                    egret.setTimeout(function () {
                        _this.requestUpStar();
                    }, _this, 500);
                });
            }
            else if (overS == true) {
                var msg = zj.TextsConfig.TextsConfig_HeroMain.AddStar_OverS;
                zj.TipManager.ShowConfirmCancel(msg, function () {
                    egret.setTimeout(function () {
                        _this.requestUpStar();
                    }, _this, 500);
                });
            }
            else {
                this.requestUpStar();
            }
        };
        HunterUpStar.prototype.requestUpStar = function () {
            var _this = this;
            var materials = [];
            for (var i = 0; i < this.materialGeneralIdList.length; i++) {
                var v = this.materialGeneralIdList[i];
                if (v != null && v != -1 && v != 0) {
                    materials.push(v);
                }
            }
            var p = zj.Game.PlayerHunterSystem.upStar(this.generalId, materials);
            p.then(function (code) {
                if (code == 0) {
                    for (var i = 0; i < _this.materialGeneralIdList.length; i++) {
                        var v = _this.materialGeneralIdList[i];
                        zj.Game.PlayerHunterSystem.deleteHunterById(v);
                    }
                    _this.setInfoAddStar();
                }
                else if (code == message.EC.XG_LACK_MONEY) {
                    zj.loadUI(zj.HelpGoldDialog)
                        .then(function (dialog) {
                        dialog.SetInfoList();
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
            });
        };
        HunterUpStar.prototype.setInfoAddStar = function () {
            var _this = this;
            zj.Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);
            zj.loadUI(zj.HunterUpStarSuccess)
                .then(function (dialog) {
                dialog.setInfo(_this.generalId, _this.closeUpStarSuccessDialog, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterUpStar.prototype.closeUpStarSuccessDialog = function () {
            var _this = this;
            this.isUpStarSuccess = true;
            egret.setTimeout(function () {
                _this.promptBattleValue(function () {
                    _this.refreshInfo();
                });
            }, this, 450);
        };
        HunterUpStar.prototype.promptBattleValue = function (cb) {
            // 当前武将战斗力
            var oldValue = this.battleValue;
            var newValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
            if (cb)
                cb();
        };
        HunterUpStar.prototype.TeachFindMet = function () {
            this.indexTbl = [];
            for (var k in this.propTbl) {
                if (this.propTbl.hasOwnProperty(k)) {
                    var v = this.propTbl[k];
                    if (zj.PlayerHunterSystem.GetGeneralId(v) == 10058) {
                        this.indexTbl.push(Number(k));
                        if (this.indexTbl.length >= 3) {
                            return;
                        }
                    }
                }
            }
        };
        HunterUpStar.prototype.getItemList = function () {
            this.itemList = [];
            for (var i = 0; i < zj.PlayerHunterSystem.ChooseUpStarMeterial(this.firstGeneralId).length; i++) {
                var item = this.listHeros.getElementAt(i);
                this.itemList.push(item);
            }
        };
        HunterUpStar.prototype.onBtnBatchStar = function () {
            var _this = this;
            zj.loadUI(zj.HunterBatchStar).then(function (dialog) {
                dialog.cb(function () {
                    _this.isUpStarSuccess = true;
                    if (_this.generalId != 0) {
                        _this.refreshInfo();
                    }
                    if (zj.Game.PlayerHunterSystem.queryHunter(_this.firstGeneralId)) {
                        _this.loadList();
                    }
                    else {
                        _this.firstGeneralId = 0;
                        _this.loadList();
                    }
                }, _this.generalId);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return HunterUpStar;
    }(zj.Dialog));
    zj.HunterUpStar = HunterUpStar;
    __reflect(HunterUpStar.prototype, "zj.HunterUpStar");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpStar.js.map