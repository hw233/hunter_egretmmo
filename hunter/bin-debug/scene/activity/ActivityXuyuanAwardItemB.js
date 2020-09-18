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
    //ActivityXuyuanAwardItemB
    //yuqingchao
    //2019.05.07
    var ActivityXuyuanAwardItemB = (function (_super) {
        __extends(ActivityXuyuanAwardItemB, _super);
        function ActivityXuyuanAwardItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityXuyuanAwardItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityXuyuanAwardItemB"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimal.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupAnimal.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimal.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ActivityXuyuanAwardItemB.prototype.dataChanged = function () {
            this.groupClip.removeChildren();
            var info = this.data.info;
            var index = this.data.i;
            var itemSet = zj.PlayerItemSystem.Set(info.goodsId, info.showType, info.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(info.goodsId), this);
            if (this.isImgMask(info.goodsId)) {
                this.imgMask.visible = true;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = false;
                this.imgIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(info.goodsId)) {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            if (info.showType == 1) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupClip);
            }
        };
        // 物品遮罩
        ActivityXuyuanAwardItemB.prototype.isImgMask = function (goodsId) {
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
        ActivityXuyuanAwardItemB.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        ActivityXuyuanAwardItemB.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        //添加龙骨动画
        ActivityXuyuanAwardItemB.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
            });
        };
        return ActivityXuyuanAwardItemB;
    }(eui.ItemRenderer));
    zj.ActivityXuyuanAwardItemB = ActivityXuyuanAwardItemB;
    __reflect(ActivityXuyuanAwardItemB.prototype, "zj.ActivityXuyuanAwardItemB");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanAwardItemB.js.map