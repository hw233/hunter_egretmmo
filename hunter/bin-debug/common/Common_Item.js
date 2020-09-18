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
     * 掉落奖励Item
     * created by Lian Lei
     */
    var Common_Item = (function (_super) {
        __extends(Common_Item, _super);
        function Common_Item() {
            var _this = _super.call(this) || this;
            _this.CurState = {
                /**加载冒险列表掉落物品 */
                Drop: 1,
                /**扫荡副本 */
                Sweep: 2,
                /**探索奖励预览 */
                Reward: 3,
                /**猎人获取徽章 */
                GetBadge: 4
            };
            _this.skinName = "resource/skins/common/Common_ItemSkin.exml";
            _this.imgMask.visible = false;
            _this.type = _this.CurState.Drop;
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnTouchBeginShow, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            zj.cachekeys(zj.UIResource["Common_Item"], null);
            // 碎片遮罩
            _this.imageMask = new eui.Image;
            _this.imageMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imageMask.horizontalCenter = 0;
            _this.imageMask.verticalCenter = 0;
            _this.imageMask.width = _this.imgIcon.width;
            _this.imageMask.height = _this.imgIcon.height;
            _this.imgMask.visible = false;
            return _this;
        }
        Common_Item.prototype.dataChanged = function () {
            this.setInfo(this.data);
        };
        Common_Item.prototype.setInfo = function (data) {
            this.father = data.father;
            this.type = data.type;
            if (data.type == data.CurState.Drop || data.type == data.CurState.GetBadge) {
                this.setInfoProp(data.info, null);
                this.scaleX = 0.5;
                this.scaleY = 0.5;
            }
            else if (data.type == data.CurState.Sweep) {
                this.setInfoProp(data.info, null);
                this.setWipeTenDropInfo(data.index);
                this.scaleX = 1;
                this.scaleY = 1;
            }
            else if (data.type == data.CurState.Reward) {
                this.setInfoProp(data.info, data.count);
                this.scaleX = 0.5;
                this.scaleY = 0.5;
            }
            if (data.scale > 0) {
                this.scaleX = data.scale;
                this.scaleY = data.scale;
            }
        };
        // 显示数量的
        Common_Item.prototype.setInfoItem = function (itemId, itemCount) {
            this.goodsId = itemId;
            this.goodsCount = itemCount;
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.imgFrame = itemSet.Frame;
            this.groupLight.removeChildren();
            this.imgPiece.source = zj.cachekey(itemSet.Logo, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.chooseMask(this.goodsId);
            this.labelTextNum.visible = (itemCount != null);
            this.labelTextNum.text = itemCount.toString();
        };
        // 显示道具数量的
        Common_Item.prototype.setInfoProp = function (itemId, itemCount) {
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.goodsId = itemId;
            this.goodsCount = itemCount;
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.groupLight.removeChildren();
            this.imgPiece.source = zj.cachekey(itemSet.Logo, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.chooseMask(this.goodsId);
            this.labelTextNum.visible = (itemCount != null);
            if (itemCount != null) {
                this.labelTextNum.text = itemCount.toString();
            }
        };
        // 伏牛寨用 
        Common_Item.prototype.setInfoAdd = function (path, name, award, info) {
            this.imgIcon.source = zj.cachekey(path, this);
            this.chooseMask(this.goodsId);
            this.imgPiece.visible = false;
            this.labelTextNum.text = "";
        };
        // 武将界面羁绊卡用
        Common_Item.prototype.setInfoPartner = function (itemId) {
            this.goodsId = itemId;
            this.goodsCount = zj.PlayerItemSystem.Count(itemId);
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.visible = false;
            this.imgMask.source = zj.cachekey(itemSet.Mask, this);
            this.imgPiece.source = zj.cachekey(itemSet.Logo, this);
            this.chooseMask(this.goodsId);
            this.labelTextNum.visible = false;
        };
        // 扫荡副本专用
        Common_Item.prototype.setWipeTenDropInfo = function (index) {
            var goods = this.father.father.sweepDrps[this.father.id][index];
            this.setInfoItem(goods.goodsId, goods.count);
            this.idx = index;
            this.goodsId = goods.goodsId;
            this.goodsCount = goods.count;
        };
        // 不显示道具数量的
        Common_Item.prototype.setInfoPropNoNum = function (itemId) {
            this.goodsId = itemId;
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.visible = false;
            this.imgPiece.source = zj.cachekey(itemSet.Logo, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.chooseMask(this.goodsId);
            this.labelTextNum.visible = false;
        };
        // 物品遮罩
        Common_Item.prototype.isImgMask = function (goodsId) {
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
        Common_Item.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        Common_Item.prototype.chooseMask = function (goodsId) {
            this.groupAnimate.removeChildren();
            if (this.isImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imageMask;
                this.groupAnimate.addChild(this.imageMask);
            }
            else if (this.isRectMask(goodsId)) {
                this.rect.visible = true;
                this.imgMask.visible = false;
                this.imgIcon.mask = this.rect;
                this.groupAnimate.addChild(this.rect);
            }
        };
        Common_Item.prototype.onBtnTouchBeginShow = function (e) {
            if (zj.Game.TeachSystem.curPart == 3002)
                return;
            var newThis = this;
            var touchX = e.stageX;
            var groupY;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            var _type = zj.PlayerItemSystem.ItemType(newThis.goodsId);
            if (egret.getQualifiedClassName(newThis.data.father) == "zj.HXH_InstanceAdventureItem") {
                newThis.data.father.data.isOpen = !newThis.data.father.data.isOpen;
            }
            if (newThis.type == newThis.CurState.Sweep) {
                if (e.stageY >= this.data.father.father.height / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY + 10;
                }
            }
            else if (newThis.type == newThis.CurState.GetBadge) {
                if (e.stageY >= this.data.father.height / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY + 10;
                }
            }
            else {
                // if (e.stageY >= this.data.father.father.father.height / 2) {
                if (e.stageY >= zj.UIManager.StageHeight / 2) {
                    groupY = e.stageY - e.localY;
                    type = 1;
                }
                else {
                    groupY = e.stageY + 10;
                }
            }
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                    dialog.name = "DropOrAward";
                    dialog.x = touchX - dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, newThis.goodsCount);
                    if (newThis.type == newThis.CurState.Sweep) {
                        newThis.data.father.father.addChild(dialog);
                    }
                    else if (newThis.type == newThis.CurState.GetBadge) {
                        newThis.data.father.addChild(dialog);
                    }
                    else {
                        newThis.data.father.father.father.addChild(dialog);
                    }
                });
            }
            else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.name = "DropOrAward";
                    dialog.x = touchX - dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, newThis.goodsCount);
                    if (newThis.type == newThis.CurState.Sweep) {
                        newThis.data.father.father.addChild(dialog);
                    }
                    else if (newThis.type == newThis.CurState.GetBadge) {
                        newThis.data.father.addChild(dialog);
                    }
                    else {
                        newThis.data.father.father.father.addChild(dialog);
                    }
                });
            }
            else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    dialog.name = "DropOrAward";
                    dialog.x = touchX - dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, newThis.goodsCount);
                    if (newThis.type == newThis.CurState.Sweep) {
                        newThis.data.father.father.addChild(dialog);
                    }
                    else if (newThis.type == newThis.CurState.GetBadge) {
                        newThis.data.father.addChild(dialog);
                    }
                    else {
                        newThis.data.father.father.father.addChild(dialog);
                    }
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    dialog.name = "DropOrAward";
                    dialog.x = touchX;
                    dialog.x = touchX - dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.init(newThis.goodsId, newThis.goodsCount);
                    if (newThis.type == newThis.CurState.Sweep) {
                        newThis.data.father.father.addChild(dialog);
                    }
                    else if (newThis.type == newThis.CurState.GetBadge) {
                        newThis.data.father.addChild(dialog);
                    }
                    else {
                        newThis.data.father.father.father.addChild(dialog);
                    }
                });
            }
        };
        Common_Item.prototype.onRemoveDialog = function () {
            if (this.type == this.CurState.Sweep) {
                this.data.father.father.onRemoveDialog();
            }
            else if (this.type == this.CurState.GetBadge) {
                this.data.father.onRemoveDialog();
            }
            else {
                this.data.father.father.father.onRemoveDialog();
            }
        };
        return Common_Item;
    }(eui.ItemRenderer));
    zj.Common_Item = Common_Item;
    __reflect(Common_Item.prototype, "zj.Common_Item");
    var Common_ItemData = (function () {
        function Common_ItemData() {
            this.CurState = {
                /**加载冒险列表掉落物品 */
                Drop: 1,
                /**扫荡副本 */
                Sweep: 2,
                /**探索奖励预览 */
                Reward: 3,
                /**猎人获得徽章 */
                GetBadge: 4
            };
        }
        return Common_ItemData;
    }());
    zj.Common_ItemData = Common_ItemData;
    __reflect(Common_ItemData.prototype, "zj.Common_ItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_Item.js.map