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
     * 冒险通关奖励Item
     * created by Lian Lei
     * 2019.1.16
     */
    var HXH_InstancePassDropInfoItem = (function (_super) {
        __extends(HXH_InstancePassDropInfoItem, _super);
        function HXH_InstancePassDropInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/HXH_InstancePassDropInfoItemSkin.exml";
            _this.btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAwardBegin1, _this);
            _this.btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAwardBegin2, _this);
            _this.btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAwardBegin3, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAwardEnd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            zj.cachekeys(zj.UIResource["HXH_InstancePassDropInfoItem"], null);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.width = _this.imgIcon1.width;
            _this.imgMask.height = _this.imgIcon1.height;
            _this.groupAnimate1.addChild(_this.imgMask);
            _this.groupAnimate2.addChild(_this.imgMask);
            _this.groupAnimate3.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(53, 53);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 2;
            _this.groupAnimate1.addChild(_this.rectMask);
            _this.groupAnimate2.addChild(_this.rectMask);
            _this.groupAnimate3.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(53, 53);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate1.addChild(_this.rectMaskCommon);
            _this.groupAnimate2.addChild(_this.rectMaskCommon);
            _this.groupAnimate3.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        HXH_InstancePassDropInfoItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_InstancePassDropInfoItem.prototype.updateView = function (data) {
            this.groupAni1.removeChildren();
            this.groupAni2.removeChildren();
            this.groupAni3.removeChildren();
            for (var i = 0; i < 3; i++) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this["groupAni" + (i + 1)]);
            }
            this.id = data.id;
            this.info = data.info;
            this.index = data.index;
            this.father = data.father;
            // if (data.info.area_search.length == 0) {
            // 	this.groupAward3.visible = false;
            // }
            // else {
            // 	this.groupAward3.visible = true;
            // }
            if (data.info.area_id == 1 || data.info.area_id == 2) {
                this.groupAward2.alpha = 0;
                this.groupAward3.x = this.groupAward1.x + 170;
            }
            else {
                this.groupAward2.alpha = 1;
                this.groupAward3.x = this.groupAward1.x + 170 * 2;
            }
            if (data.info.area_id == 8 || data.info.area_id == 9) {
                this.groupAward3.alpha = 0;
            }
            else {
                this.groupAward3.alpha = 1;
            }
            var namePic = zj.Game.PlayerInstanceSystem.AreaInstance(data.id).area_name_pic_big;
            this.imgInstanceName.source = zj.cachekey(namePic, this);
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(data.id);
            if (instanceData == null) {
                return;
            }
            var chapterList = instanceData.area_normal;
            var eliteList = instanceData.area_elite;
            var instanceList = [];
            var instanceListElite = [];
            for (var i = 0; i < chapterList.length; i++) {
                var vv = chapterList[i];
                var chapterData = null;
                chapterData = zj.Game.PlayerInstanceSystem.ChapterInstance(vv);
                instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }
            for (var i = 0; i < eliteList.length; i++) {
                var vv = eliteList[i];
                var eliteData = null;
                eliteData = zj.Game.PlayerInstanceSystem.EliteInstance(vv);
                instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
            }
            for (var i = 0; i < instanceList.length; i++) {
                var vv = instanceList[i];
                this.goodsTblNormal = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
                this.countTblNormal = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
                var itemSet = zj.PlayerItemSystem.Set(this.goodsTblNormal[0], 1, this.countTblNormal[0]);
                if (i > instanceList.length) {
                    this["groupClip" + (i + 1)].visible = false;
                    this["imgFrame" + (i + 1)].visible = false;
                    this["imgIcon" + (i + 1)].visible = false;
                    this["labelItemNum" + (i + 1)].visible = false;
                    this["imgName" + (i + 1)].visible = false;
                }
                else {
                    this["groupClip" + (i + 1)].visible = true;
                    this["imgFrame" + (i + 1)].visible = true;
                    this["imgIcon" + (i + 1)].visible = true;
                    this["labelItemNum" + (i + 1)].visible = true;
                    this["imgName" + (i + 1)].visible = true;
                    this["imgFrame" + (i + 1)].source = zj.cachekey(itemSet.Frame, this);
                    this["groupClip" + (i + 1)].removeChildren();
                    this["labelItemNum" + (i + 1)].text = this.countTblNormal[0].toString();
                    this["imgIcon" + (i + 1)].source = zj.cachekey(itemSet.Path, this);
                    if (this.isImgMask(this.goodsTblNormal[0])) {
                        this.imgMask.visible = true;
                        this.rectMask.visible = false;
                        this.rectMaskCommon.visible = false;
                        this["imgIcon" + (i + 1)].mask = this.imgMask;
                    }
                    else if (this.isRectMask(this.goodsTblNormal[0])) {
                        this.rectMask.visible = true;
                        this.rectMaskCommon.visible = false;
                        this.imgMask.visible = false;
                        this["imgIcon" + (i + 1)].mask = this.rectMask;
                    }
                    else {
                        this.imgMask.visible = false;
                        this.rectMask.visible = false;
                        this.rectMaskCommon.visible = true;
                        this["imgIcon" + (i + 1)].mask = this.rectMaskCommon;
                    }
                }
                var num = 0;
                if ((i + 1) == 1) {
                    num = 3;
                }
                else if ((i + 1) == 2) {
                    num = 2;
                }
                if (data.id <= 2) {
                    this["imgName" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.instance_chapter[data.id + i - 1], this);
                }
                else {
                    this["imgName" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.instance_chapter[(2 * data.id) - num - 1], this);
                }
            }
            for (var i = 0; i < instanceListElite.length; i++) {
                var vv = instanceListElite[i];
                var ids = i + 3;
                this.goodsTblElite = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
                this.countTblElite = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
                var itemSet = zj.PlayerItemSystem.Set(this.goodsTblElite[0], 1, this.countTblElite[0]);
                this["imgFrame" + ids].source = zj.cachekey(itemSet.Frame, this);
                this["groupClip" + ids].removeChildren();
                this["imgIcon" + ids].visible = true;
                this["labelItemNum" + ids].text = this.countTblElite[0].toString();
                this["imgIcon" + ids].source = zj.cachekey(itemSet.Path, this);
            }
            // if (instanceList.length == 1 && instanceListElite.length != 0) {
            // 	this.groupAward3.visible = true;
            // 	this.groupAward2.visible = false;
            // 	this.groupAward3.x = this.groupAward1.x + 170;
            // }
        };
        //添加龙骨动画
        HXH_InstancePassDropInfoItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.7;
                display.scaleY = 0.7;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        // 物品遮罩
        HXH_InstancePassDropInfoItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        // 徽章遮罩
        HXH_InstancePassDropInfoItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        HXH_InstancePassDropInfoItem.prototype.onBtnAwardBegin1 = function (e) {
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(this.id);
            if (instanceData == null)
                return;
            var chapterList = instanceData.area_normal;
            var instanceList = [];
            for (var i = 0; i < chapterList.length; i++) {
                var chapterData = null;
                chapterData = zj.Game.PlayerInstanceSystem.ChapterInstance(chapterList[i]);
                instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }
            var newThis = this;
            var _loop_1 = function (i) {
                var goodsTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_ids;
                var countTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_counts;
                var _type = zj.PlayerItemSystem.ItemType(goodsTbl[0]);
                var groupY;
                var type = 0;
                if (e.stageY >= this_1.father.height / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY - e.localY + this_1.height;
                }
                if (i == 0) {
                    if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                        zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.init(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < instanceList.length; i++) {
                _loop_1(i);
            }
        };
        HXH_InstancePassDropInfoItem.prototype.onBtnAwardBegin2 = function (e) {
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(this.id);
            if (instanceData == null)
                return;
            var chapterList = instanceData.area_normal;
            var instanceList = [];
            for (var i = 0; i < chapterList.length; i++) {
                var chapterData = null;
                chapterData = zj.Game.PlayerInstanceSystem.ChapterInstance(chapterList[i]);
                instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }
            var newThis = this;
            var _loop_2 = function (i) {
                var goodsTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_ids;
                var countTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_counts;
                var _type = zj.PlayerItemSystem.ItemType(goodsTbl[0]);
                var groupY;
                var type = 0;
                if (e.stageY >= this_2.father.height / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY - e.localY + this_2.height;
                }
                if (i == 1) {
                    if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 150;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                        zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 150;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 150;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.init(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < instanceList.length; i++) {
                _loop_2(i);
            }
        };
        HXH_InstancePassDropInfoItem.prototype.onBtnAwardBegin3 = function (e) {
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(this.id);
            if (instanceData == null)
                return;
            var eliteList = instanceData.area_elite;
            var instanceListElite = [];
            for (var i = 0; i < eliteList.length; i++) {
                var eliteData = null;
                eliteData = zj.Game.PlayerInstanceSystem.EliteInstance(eliteList[i]);
                instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
            }
            var newThis = this;
            var _loop_3 = function (i) {
                var goodsTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceListElite[i]).goods_ids;
                var countTbl = zj.Game.PlayerInstanceSystem.ChestItem(instanceListElite[i]).goods_counts;
                var _type = zj.PlayerItemSystem.ItemType(goodsTbl[0]);
                var groupY;
                var type = 0;
                if (e.stageY >= this_3.father.height / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY - e.localY + this_3.height;
                }
                if (i == 0) {
                    if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 300;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                        zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 300;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.setInfo(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                            dialog.x = newThis.data.father.groupDesProp.x + 300;
                            if (type == 1) {
                                dialog.y = groupY - dialog.height;
                            }
                            else {
                                dialog.y = groupY;
                            }
                            dialog.name = "Award";
                            dialog.init(goodsTbl[0], countTbl[0]);
                            newThis.father.addChild(dialog);
                        });
                    }
                }
            };
            var this_3 = this;
            for (var i = 0; i < instanceListElite.length; i++) {
                _loop_3(i);
            }
        };
        HXH_InstancePassDropInfoItem.prototype.onBtnAwardEnd = function () {
            this.data.father.onRemoveDialog();
        };
        return HXH_InstancePassDropInfoItem;
    }(eui.ItemRenderer));
    zj.HXH_InstancePassDropInfoItem = HXH_InstancePassDropInfoItem;
    __reflect(HXH_InstancePassDropInfoItem.prototype, "zj.HXH_InstancePassDropInfoItem");
    /**
     * 冒险通关奖励Item数据
     */
    var HXH_InstancePassDropInfoItemData = (function () {
        function HXH_InstancePassDropInfoItemData() {
        }
        return HXH_InstancePassDropInfoItemData;
    }());
    zj.HXH_InstancePassDropInfoItemData = HXH_InstancePassDropInfoItemData;
    __reflect(HXH_InstancePassDropInfoItemData.prototype, "zj.HXH_InstancePassDropInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstancePassDropInfoItem.js.map