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
    var CommonPlayerCardItem = (function (_super) {
        __extends(CommonPlayerCardItem, _super);
        function CommonPlayerCardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonPlayerCardItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonPlayerCardItem"], null);
            return _this;
        }
        CommonPlayerCardItem.prototype.dataChanged = function () {
            var data = this.data;
            var unlock = data.father.data.level >= data.level;
            this.groupLock.visible = !unlock;
            this.groupUnLock.visible = unlock;
            this.groupGetCard.visible = (data.info != null);
            this.groupDontGet.visible = (data.info == null);
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (data.info != null) {
                var tbl = zj.TableItemPotato.Item(data.info.id);
                var _a = zj.PlayerCardSystem.GetItemFrame(data.info.id, data.info), bigFramePic = _a[2];
                var typePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[tbl.type - 1];
                var cardPath = tbl.paths;
                this.imgCardBoard.source = zj.cachekey(bigFramePic, this);
                this.imgCard.source = zj.cachekey(cardPath, this);
                this.imgCardType.source = zj.cachekey(typePath, this);
                this.labelName.text = tbl.name;
                this.labelNumber.text = tbl.num.toString();
                this.labelLevel.text = data.level.toString();
                if (data.info.add_attri.length + 1 == 5 && data.info.star < 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                }
                else if (data.info.add_attri.length == 5 && data.info.star >= 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                }
                else {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
                }
            }
            else if (unlock && data.info == null) {
                var path = zj.UIConfig.UIConfig_Hunter_Card.card_type[data.type - 1];
                this.imgTypeBig.source = zj.cachekey(path, this);
            }
            else {
                this.labelLock.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_unlock, data.level);
            }
        };
        return CommonPlayerCardItem;
    }(eui.ItemRenderer));
    zj.CommonPlayerCardItem = CommonPlayerCardItem;
    __reflect(CommonPlayerCardItem.prototype, "zj.CommonPlayerCardItem");
    var CommonPlayerCardItemData = (function () {
        function CommonPlayerCardItemData() {
        }
        return CommonPlayerCardItemData;
    }());
    zj.CommonPlayerCardItemData = CommonPlayerCardItemData;
    __reflect(CommonPlayerCardItemData.prototype, "zj.CommonPlayerCardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPlayerCardItem.js.map