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
    //VipLowItemB
    //yuqingchao
    //2019.04.12
    var VipLowItemB = (function (_super) {
        __extends(VipLowItemB, _super);
        function VipLowItemB() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.j = 0;
            _this.skinName = "resource/skins/vip/VipLowItemBSkin.exml";
            zj.cachekeys(zj.UIResource["VipLowItemB"], null);
            _this.groupTap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image();
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMask.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupMask.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMask.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                _this.data.father = null;
                _this.groupTap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupTap, _this);
            }, null);
            return _this;
        }
        VipLowItemB.prototype.init = function () {
            this.imgFrame.visible = true;
            this.imgIcon.visible = true;
            this.imgMask.visible = true;
            this.groupMask.visible = true;
            this.groupTap.visible = true;
            this.groupAnimal.visible = true;
            // this.groupMask.cacheAsBitmap = true;
            this.imgMask.visible = false;
        };
        VipLowItemB.prototype.dataChanged = function () {
            zj.closeCache(this.groupMask);
            this.init();
            if (this.data.father == null)
                return;
            this.rectMaskCommon.visible = false;
            this.rectMask.visible = false;
            this.imgMask.visible = false;
            this.good = this.data.good;
            this.count = this.data.count;
            this.i = this.data.i;
            this.father = this.data.father;
            if (this.i >= 0 && this.i < 3) {
                this.i = this.i;
                this.j = 0;
            }
            else if (this.i >= 3) {
                this.i = this.i - 3;
                this.j = 1;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.good, 1, this.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.lbNum.text = this.count.toString();
            if (this.isImgMask(this.good)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(this.good)) {
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            this.groupAnimal.removeChildren();
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimal);
            zj.setCache(this.groupMask);
        };
        //添加龙骨动画
        VipLowItemB.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        // 物品遮罩
        VipLowItemB.prototype.isImgMask = function (goodsId) {
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
        VipLowItemB.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        VipLowItemB.prototype.onGroupTap = function (e) {
            // this.onChooseItemTap(e);
        };
        VipLowItemB.prototype.onShowGoodProperty = function (e) {
            var info = new message.GoodsInfo();
            info.goodsId = this.good;
            info.count = this.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return VipLowItemB;
    }(eui.ItemRenderer));
    zj.VipLowItemB = VipLowItemB;
    __reflect(VipLowItemB.prototype, "zj.VipLowItemB");
})(zj || (zj = {}));
//# sourceMappingURL=VipLowItemB.js.map