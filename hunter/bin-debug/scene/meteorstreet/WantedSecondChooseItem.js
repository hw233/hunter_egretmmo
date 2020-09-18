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
    //WantedSecondChooseItem
    //hexiaowei
    // 2019/02/14
    var WantedSecondChooseItem = (function (_super) {
        __extends(WantedSecondChooseItem, _super);
        function WantedSecondChooseItem() {
            var _this = _super.call(this) || this;
            _this.isFirst = true;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondChooseItemSkin.exml";
            zj.cachekeys(zj.UIResource["WantedSecondChooseItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onChooseItemTap(true, _this.data);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onChooseItemTap(false, _this.data);
            }, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupMain);
            }, null);
            //遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.scaleX = 0.8;
            _this.imgMask.scaleY = 0.8;
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        WantedSecondChooseItem.prototype.dataChanged = function () {
            var _this = this;
            zj.closeCache(this.groupMain);
            //this.imgSpriteHunterBoard.source=this.data;
            var itemSet = zj.PlayerItemSystem.Set(this.data.tableWanted.goodsId, 0, this.data.tableWanted.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelTextNum.visible = true;
            if (this.data.tableWanted.count == 0) {
                this.labelTextNum.visible = false;
            }
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            //this.imgLogo.source = itemSet.Logo;
            var mnb = zj.PlayerItemSystem.Item(this.data.tableWanted.goodsId);
            if (mnb.client_star != null) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, mnb.client_star, 6, 1.2, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[1]);
            }
            var itemInfo = itemSet.Info;
            if (itemInfo.is_piece == 1) {
                if (this.isRectMask(this.data.tableWanted.goodsId)) {
                    this.imgMask.visible = true;
                    this.imgIcon.mask = this.imgMask;
                }
                else {
                    this.imgMask.visible = false;
                    this.imgIcon.mask = null;
                }
            }
            if (10000 <= this.data.tableWanted.count && this.data.tableWanted.count <= 99999) {
                this.labelTextNum.text = this.data.tableWanted.count;
            }
            else {
                this.labelTextNum.text = ("x" + zj.Set.NumberUnit2(this.data.tableWanted.count));
            }
            //this.labelTextNum.text = "x" + this.data.tableWanted.count;
            if (this.isFirst) {
                egret.Tween.get(this.groupMain)
                    .wait(this.data.index * 100)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 150)
                    .to({ scaleX: 0.95, scaleY: 0.95 }, 150)
                    .to({ scaleX: 1, scaleY: 1 }, 150)
                    .call(function () {
                    _this.isFirst = false;
                });
            }
            zj.setCache(this.groupMain);
        };
        WantedSecondChooseItem.prototype.isRectMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 20) {
                return true;
            }
            return false;
        };
        return WantedSecondChooseItem;
    }(eui.ItemRenderer));
    zj.WantedSecondChooseItem = WantedSecondChooseItem;
    __reflect(WantedSecondChooseItem.prototype, "zj.WantedSecondChooseItem");
    //子项数据源
    var WantedSecondChooseItemData = (function () {
        function WantedSecondChooseItemData() {
        }
        return WantedSecondChooseItemData;
    }());
    zj.WantedSecondChooseItemData = WantedSecondChooseItemData;
    __reflect(WantedSecondChooseItemData.prototype, "zj.WantedSecondChooseItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondChooseItem.js.map