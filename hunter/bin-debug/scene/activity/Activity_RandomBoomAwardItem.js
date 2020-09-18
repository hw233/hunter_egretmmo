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
    // wang shen zhuo
    // Activity_RandomBoomAwardItem
    // 20190411
    var Activity_RandomBoomAwardItem = (function (_super) {
        __extends(Activity_RandomBoomAwardItem, _super);
        function Activity_RandomBoomAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_RandomBoomAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_RandomBoomAwardItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onChooseItemTap(true, _this.data);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onChooseItemTap(false, _this.data);
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        Activity_RandomBoomAwardItem.prototype.dataChanged = function () {
            this.groupMain1.removeChildren();
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain1);
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            if (this.data.good.goodsId < 10000) {
                return;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.data.good.goodsId, this.data.good.showType, this.data.good.count);
            if (itemSet["Type"] == message.EGoodsType.GOODS_TYPE_GENERAL) {
                var gnritem = zj.PlayerHunterSystem.Table(this.data.good.goodsId);
                var gnr_aptitude = gnritem.aptitude;
                this.imageBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.itemFrame[gnr_aptitude % 10 + 1], this);
                this.imageTip.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[gnr_aptitude], this);
            }
            else {
                this.imageTip.visible = false;
                this.imageBoard.source = zj.cachekey(itemSet.Frame, this);
            }
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelNum.text = "x" + zj.Set.NumberUnit2(this.data.good.count);
            if (this.isImgMask(this.data.good.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        // 物品遮罩
        Activity_RandomBoomAwardItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        //添加龙骨动画
        Activity_RandomBoomAwardItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return Activity_RandomBoomAwardItem;
    }(eui.ItemRenderer));
    zj.Activity_RandomBoomAwardItem = Activity_RandomBoomAwardItem;
    __reflect(Activity_RandomBoomAwardItem.prototype, "zj.Activity_RandomBoomAwardItem");
    var Activity_RandomBoomAwardItemData = (function () {
        function Activity_RandomBoomAwardItemData() {
        }
        return Activity_RandomBoomAwardItemData;
    }());
    zj.Activity_RandomBoomAwardItemData = Activity_RandomBoomAwardItemData;
    __reflect(Activity_RandomBoomAwardItemData.prototype, "zj.Activity_RandomBoomAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomBoomAwardItem.js.map