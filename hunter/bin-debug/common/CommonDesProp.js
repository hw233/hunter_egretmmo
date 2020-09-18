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
    // lizhengqiang
    // 2018/11/30
    var CommonDesProp = (function (_super) {
        __extends(CommonDesProp, _super);
        function CommonDesProp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonDesPropSkin.exml";
            //物品遮罩
            _this.maskimage = zj.Util.getMaskImgBlack(84.6, 85);
            _this.maskimage.horizontalCenter = 0;
            _this.maskimage.verticalCenter = -1;
            _this.groupMack.addChild(_this.maskimage);
            _this.maskimage.visible = false;
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMack.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        CommonDesProp.prototype.init = function (goodsId, count) {
            var config = zj.PlayerItemSystem.ItemConfig(goodsId);
            var iteminfo = zj.PlayerItemSystem.Set(goodsId, 0, count);
            var num = 0;
            if (zj.TableClientTypePackage.Item(6)["itemId"].indexOf(goodsId) != -1) {
                num = goodsId % 100;
            }
            this.imgFrame.source = zj.cachekey(iteminfo.Frame, this);
            this.imgIcon.source = zj.cachekey(config["path"], this);
            if (count != null) {
                this.lbNum.visible = true;
                this.lbNumID.visible = true;
                this.lbNum.text = count.toString();
                this.lbNumID.text = num == 0 ? "" : num.toString();
            }
            else {
                this.lbNum.visible = false;
                this.lbNumID.visible = false;
            }
            this.lbName.text = config["name"];
            this.lbType.text = zj.PlayerItemSystem.ItemTypeDesc(goodsId);
            this.lbOwn.text = zj.Game.PlayerItemSystem.itemCount(goodsId).toString();
            var str = config["des"];
            if (str.indexOf("_") != -1) {
                var string = str.split('_');
                var a = "";
                for (var i = 0; i < string.length; i++) {
                    a += string[i] + "\n";
                }
                this.lbInfo.textFlow = zj.Util.RichText(a);
            }
            else {
                this.lbInfo.textFlow = zj.Util.RichText(config["des"]);
            }
            //this.lbInfo.text = config["des"];
            // this.maskimage.visible = true;
            // this.imgIcon.mask = this.maskimage;
            if (this.isImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.maskimage.visible = false;
                this.imgIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.maskimage.visible = true;
                this.imgIcon.mask = this.maskimage;
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
        CommonDesProp.prototype.isImgMask = function (goodsId) {
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
        CommonDesProp.ID = "CommonDesProp";
        return CommonDesProp;
    }(zj.UI));
    zj.CommonDesProp = CommonDesProp;
    __reflect(CommonDesProp.prototype, "zj.CommonDesProp");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesProp.js.map