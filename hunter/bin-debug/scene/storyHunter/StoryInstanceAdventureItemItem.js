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
     * wangshenzhuo
     * 2019-7-24
     */
    var StoryInstanceAdventureItemItem = (function (_super) {
        __extends(StoryInstanceAdventureItemItem, _super);
        function StoryInstanceAdventureItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceAdventureItemItem"], null);
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.imgMask.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
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
        StoryInstanceAdventureItemItem.prototype.dataChanged = function () {
            this.father = this.data.father;
            this.setInfoProp(this.data.itemId, this.data.itemCount);
        };
        // 显示道具数量的
        StoryInstanceAdventureItemItem.prototype.setInfoProp = function (itemId, itemCount) {
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
        StoryInstanceAdventureItemItem.prototype.onShowGoodProperty = function (e) {
            var goodsinfo = new message.GoodsInfo();
            goodsinfo.goodsId = this.goodsId;
            goodsinfo.count = this.goodsCount;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY, isshow: false });
        };
        // 物品遮罩
        StoryInstanceAdventureItemItem.prototype.isImgMask = function (goodsId) {
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
        // 徽章遮罩
        StoryInstanceAdventureItemItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        StoryInstanceAdventureItemItem.prototype.chooseMask = function (goodsId) {
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
        return StoryInstanceAdventureItemItem;
    }(eui.ItemRenderer));
    zj.StoryInstanceAdventureItemItem = StoryInstanceAdventureItemItem;
    __reflect(StoryInstanceAdventureItemItem.prototype, "zj.StoryInstanceAdventureItemItem");
    var StoryInstanceAdventureItemItemData = (function () {
        function StoryInstanceAdventureItemItemData() {
        }
        return StoryInstanceAdventureItemItemData;
    }());
    zj.StoryInstanceAdventureItemItemData = StoryInstanceAdventureItemItemData;
    __reflect(StoryInstanceAdventureItemItemData.prototype, "zj.StoryInstanceAdventureItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceAdventureItemItem.js.map