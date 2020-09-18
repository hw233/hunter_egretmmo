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
     * @class 副本神秘海域通关奖励Item
     *
     * @author LianLei
     *
     * @date 2019.07.16
     */
    var HXH_InstanceAwardItem = (function (_super) {
        __extends(HXH_InstanceAwardItem, _super);
        function HXH_InstanceAwardItem() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceAwardItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBeginShowAward, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEndRemoveAward, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.width = 60;
            _this.imgMask.height = 60;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = new eui.Rect(52, 47, 0x000000);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 2;
            _this.groupAnimate.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(60, 60, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        HXH_InstanceAwardItem.prototype.dataChanged = function () {
            this.setInfo(this.data);
        };
        HXH_InstanceAwardItem.prototype.setInfo = function (data) {
            var itemSet = zj.PlayerItemSystem.Set(data.info);
            this.goodsId = data.info;
            this.goodsCount = data.count;
            this.father = data.father;
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelTextNum.visible = (data.count != null);
            if (data.count != null) {
                this.labelTextNum.text = data.count.toString();
            }
            if (data.scale == null || data.scale == 0) {
                data.scale = 1;
            }
            this.groupAll.scaleX = data.scale;
            this.groupAll.scaleY = data.scale;
            if (this.isImgMask(this.goodsId)) {
                this.imgMask.visible = true;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = false;
                this.imgIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(this.goodsId)) {
                this.rectMask.visible = true;
                this.rectMaskCommon.visible = false;
                this.imgMask.visible = false;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }
        };
        // 物品遮罩
        HXH_InstanceAwardItem.prototype.isImgMask = function (goodsId) {
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
        HXH_InstanceAwardItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        HXH_InstanceAwardItem.prototype.touchBeginShowAward = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.goodsId;
            goodsInfo.count = this.goodsCount;
            var show = zj.TipManager.ShowProp(goodsInfo, this.father, 30, e.stageX, e.stageY);
            show.name = "award";
            this.father.addChild(show);
        };
        HXH_InstanceAwardItem.prototype.touchEndRemoveAward = function () {
            this.data.father.touchEndRemoveShowSkill();
        };
        return HXH_InstanceAwardItem;
    }(eui.ItemRenderer));
    zj.HXH_InstanceAwardItem = HXH_InstanceAwardItem;
    __reflect(HXH_InstanceAwardItem.prototype, "zj.HXH_InstanceAwardItem");
    var HXH_InstanceAwardItemData = (function () {
        function HXH_InstanceAwardItemData() {
        }
        return HXH_InstanceAwardItemData;
    }());
    zj.HXH_InstanceAwardItemData = HXH_InstanceAwardItemData;
    __reflect(HXH_InstanceAwardItemData.prototype, "zj.HXH_InstanceAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceAwardItem.js.map