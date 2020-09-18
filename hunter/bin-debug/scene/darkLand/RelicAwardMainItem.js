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
    //RelicAwardMainItem
    //hexiaowei
    // 2019/03/06
    var RelicAwardMainItem = (function (_super) {
        __extends(RelicAwardMainItem, _super);
        function RelicAwardMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/RelicAwardMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["RelicAwardMainItem"], null);
            _this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onDropInfoItemTap(true, _this.data);
            }, _this);
            _this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onDropInfoItemTap(false, _this.data);
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.6;
            _this.imgMask.scaleY = 0.6;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        //添加龙骨动画
        RelicAwardMainItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        RelicAwardMainItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.bool) {
                var pathurl = "ui_darkland_relic_WordsStage" + (data.index + 1) + "_png";
                this.imageStage.source = zj.cachekey(pathurl, this);
            }
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            this.imageStage.visible = data.bool;
            var itemSet = zj.PlayerItemSystem.Set(data.tableAward.goodsId, data.tableAward.showType, data.tableAward.count);
            //this.imageIcon.visible = false;
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelNum.text = "x" + data.tableAward.count;
            this.labelNum.visible = data.tableAward.count != 0;
            if (this.isImgMask(this.data.tableAward.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.imageIcon.mask = null;
            }
        };
        // 物品遮罩
        RelicAwardMainItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1
                || goodsId == 202009 || goodsId == 202008 || goodsId == 202010) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        return RelicAwardMainItem;
    }(eui.ItemRenderer));
    zj.RelicAwardMainItem = RelicAwardMainItem;
    __reflect(RelicAwardMainItem.prototype, "zj.RelicAwardMainItem");
    //子项数据源
    var RelicAwardMainItemData = (function () {
        function RelicAwardMainItemData() {
        }
        return RelicAwardMainItemData;
    }());
    zj.RelicAwardMainItemData = RelicAwardMainItemData;
    __reflect(RelicAwardMainItemData.prototype, "zj.RelicAwardMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=RelicAwardMainItem.js.map