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
    // created by hhh in 2018/12/5
    var Common_DesProp = (function (_super) {
        __extends(Common_DesProp, _super);
        function Common_DesProp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesPropSkin.exml";
            _this.labelConst.text = zj.LANG("拥有          件");
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = new eui.Rect(73, 70, 0x000000);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupItem.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        Common_DesProp.prototype.setInfo = function (goodsId, count) {
            var info = zj.PlayerItemSystem.ItemConfig(goodsId);
            var iteminfo = zj.PlayerItemSystem.Set(goodsId, 0, count);
            var frame = zj.UIConfig.UIConfig_Role.itemFrame[info.quality];
            var typeDes = zj.PlayerItemSystem.ItemTypeDesc(goodsId);
            var countOwn = zj.PlayerItemSystem.Count(goodsId);
            var fruitId = "";
            this.imageFrame.source = zj.cachekey(iteminfo.Frame, this);
            this.imageIcon.source = zj.cachekey(info.path, this);
            this.labelNum.text = count;
            this.labelNum.visible = count != "" && count != 0;
            this.labelName.text = info.name;
            this.labelType.text = typeDes;
            this.labelOwn.text = countOwn + "";
            var str = info.des;
            if (str.indexOf("_") != -1) {
                var string = str.split('_');
                var a = "";
                for (var i = 0; i < string.length; i++) {
                    a += string[i] + "\n";
                }
                this.labelInfo.textFlow = zj.Util.RichText(a);
            }
            else {
                this.labelInfo.textFlow = zj.Util.RichText(info.des);
            }
            this.labelNumId.text = fruitId;
            // 遮罩
            if (this.isImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(goodsId)) {
                this.rectMask.visible = true;
                this.imageIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            var type = zj.PlayerItemSystem.ItemType(goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true;
            }
            else {
                this.imgpifu.visible = false;
            }
        };
        // 物品遮罩
        Common_DesProp.prototype.isImgMask = function (goodsId) {
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
        Common_DesProp.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        return Common_DesProp;
    }(zj.UI));
    zj.Common_DesProp = Common_DesProp;
    __reflect(Common_DesProp.prototype, "zj.Common_DesProp");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesProp.js.map