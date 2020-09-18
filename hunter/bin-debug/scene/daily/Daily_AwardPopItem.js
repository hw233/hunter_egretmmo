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
     * 日常活跃度奖励预览Item
     * created by Lian Lei
     * 2019.03.19
     */
    var Daily_AwardPopItem = (function (_super) {
        __extends(Daily_AwardPopItem, _super);
        function Daily_AwardPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/daily/Daily_AwardPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["Daily_AwardPopItem"], null);
            _this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupHead.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupHead.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupHead.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        Daily_AwardPopItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        // 物品遮罩
        Daily_AwardPopItem.prototype.isImgMask = function (goodsId) {
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
        Daily_AwardPopItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        Daily_AwardPopItem.prototype.updateView = function (data) {
            this.goodsId = data.goodsId;
            this.count = data.count;
            this.noName = data.noName;
            this.needDetail = data.needDetail;
            if (this.isImgMask(data.goodsId)) {
                this.imgMask.visible = true;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = false;
                this.imgIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(data.goodsId)) {
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
            this.setInfo();
        };
        Daily_AwardPopItem.prototype.setInfo = function () {
            if (this.noName == null) {
                this.noName = false;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.goodsId, null, this.count);
            var strName = zj.Helper.StringFormat("%s", itemSet.Info.name);
            if (this.noName) {
                strName = zj.Helper.StringFormat("x%d", this.count);
            }
            this.labelNum.visible = this.count != 0;
            this.labelNum.text = zj.Set.NumberUnit3(this.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelName.text = strName;
        };
        Daily_AwardPopItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Daily_AwardPopItem;
    }(eui.ItemRenderer));
    zj.Daily_AwardPopItem = Daily_AwardPopItem;
    __reflect(Daily_AwardPopItem.prototype, "zj.Daily_AwardPopItem");
    var Daily_AwardPopItemData = (function () {
        function Daily_AwardPopItemData() {
        }
        return Daily_AwardPopItemData;
    }());
    zj.Daily_AwardPopItemData = Daily_AwardPopItemData;
    __reflect(Daily_AwardPopItemData.prototype, "zj.Daily_AwardPopItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_AwardPopItem.js.map