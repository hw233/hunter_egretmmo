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
     * @author
     *
     * @date 2019-1-29
     *
     * @class 奖励说明List子项的子项
     */
    var ArenaWholeAwardItemItem = (function (_super) {
        __extends(ArenaWholeAwardItemItem, _super);
        function ArenaWholeAwardItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeAwardItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeAwardItemItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAll.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAll.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ArenaWholeAwardItemItem.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            var itemSet = zj.PlayerItemSystem.Set(data.info.goodsId, data.info.showType, data.info.count);
            if (!itemSet)
                return;
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.imgIcon.scaleX = 1.1;
            this.imgIcon.scaleY = 1.1;
            this.labelNum.text = "x" + zj.Set.NumberUnit3(data.info.count);
            this.imgLogo.source = zj.cachekey(itemSet.Logo, this);
            if (this.isRectMask(data.info.goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            if (Number(data.info.goodsId) == 33006) {
                this.imgIcon.scaleX = 1.3;
                this.imgIcon.scaleY = 1.3;
            }
            var type = zj.PlayerItemSystem.ItemType(data.info.goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_TITLE) {
                this.groupClip.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                    .then(function (display) {
                    display.width = _this.groupClip.width;
                    display.height = _this.groupClip.height;
                    display.x = _this.groupClip.width / 2;
                    display.y = _this.groupClip.height / 2;
                    _this.groupClip.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        ArenaWholeAwardItemItem.prototype.touchBegin = function (e) {
            var data = this.data;
            data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, data.info);
        };
        //根据奖励类型判断是否添加遮罩
        ArenaWholeAwardItemItem.prototype.isRectMask = function (goodsId) {
            var m = zj.PlayerItemSystem.ItemType(goodsId);
            if (zj.PlayerItemSystem.ItemType(goodsId) == 6 || zj.PlayerItemSystem.ItemType(goodsId) == 3 && goodsId != 39101 && goodsId != 39102 && goodsId != 39103 && goodsId != 34002 && goodsId != 34003) {
                return true;
            }
            return false;
        };
        return ArenaWholeAwardItemItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeAwardItemItem = ArenaWholeAwardItemItem;
    __reflect(ArenaWholeAwardItemItem.prototype, "zj.ArenaWholeAwardItemItem");
    var ArenaWholeAwardItemItemData = (function () {
        function ArenaWholeAwardItemItemData() {
        }
        return ArenaWholeAwardItemItemData;
    }());
    zj.ArenaWholeAwardItemItemData = ArenaWholeAwardItemItemData;
    __reflect(ArenaWholeAwardItemItemData.prototype, "zj.ArenaWholeAwardItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeAwardItemItem.js.map