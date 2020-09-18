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
     * @author chen xi
     *
     * @date 2018-1-4
     */
    var HunterCardReplaceItem = (function (_super) {
        __extends(HunterCardReplaceItem, _super);
        function HunterCardReplaceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCardReplaceItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterCardReplaceItem"], null);
            return _this;
        }
        HunterCardReplaceItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterCardReplaceItem.prototype.updateView = function (data) {
            this.imgBack.source = zj.cachekey("ui_hunter_card_CardAttriBack_png", this);
            var range_growth;
            if (data.index != data.fatherArray - 1) {
                range_growth = zj.TablePotatoAttri.Item(data.cardInfo.add_attri[data.index].attriId).range_growth;
            }
            var str = null;
            var type = 1;
            if (data.index != data.fatherArray - 1 && range_growth[0][0] == 0) {
                str = zj.PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0];
            }
            else if (data.index != data.fatherArray - 1 && range_growth.length != 0) {
                if (data.cardInfo.add_attri[data.index].growthValue <= range_growth[0][1]) {
                    type = 1;
                }
                else {
                    type = 2;
                }
                str = zj.PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0];
            }
            else if (data.index == data.fatherArray - 1) {
                str = data.description;
            }
            var star = data.cardInfo.star;
            var growthValue = null;
            if (star == 6) {
                var range = zj.TablePotatoAttri.Item(data.cardInfo.add_attri[data.index].attriId).range_growth;
                var type_ = 1;
                if (range[0][0] != 0) {
                    growthValue = data.cardInfo.add_attri[data.index].growthValue;
                    if (growthValue <= range[0][1]) {
                        type_ = 1;
                    }
                    else {
                        type_ = 2;
                    }
                    str = zj.PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0];
                    this.labelAttri.textColor = 0x1E1E1E;
                }
            }
            else if (zj.CommonConfig.card_addattri_awake_star[data.index] <= star && (data.index != data.fatherArray - 1 || star == 6)) {
                this.labelAttri.textColor = 0x000000;
            }
            else if (data.index == data.fatherArray - 1) {
                this.labelAttri.textColor = 0x787878;
            }
            else {
                str = data.description + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_star_act, zj.Helper.GetNumCH(zj.CommonConfig.card_addattri_awake_star[data.index].toString()));
                this.labelAttri.textColor = 0x787878;
            }
            this.labelAttri.textFlow = zj.Util.RichText(str);
            egret.setTimeout(this.aaaaa, this, 5);
        };
        HunterCardReplaceItem.prototype.aaaaa = function () {
            this.height = this.labelAttri.textHeight + 4;
            this.imgBack.height = this.height;
        };
        HunterCardReplaceItem.prototype.getStrlineNum = function (info, width) {
            var lineNum = 1;
            var richStrArr = zj.Util.RichText(info);
            var richStr = "";
            for (var i = 0; i < richStrArr.length; i++) {
                richStr = richStr = richStrArr[i].text;
            }
            var chineseNum = 0;
            for (var i = 0; i < richStr.length; i++) {
                if (richStr.charCodeAt(i) > 255 || richStr.charAt(i) == "）" || richStr.charAt(i) == "（")
                    chineseNum++;
            }
            lineNum = Math.ceil(((richStr.length - chineseNum) / 2 + chineseNum) / (width / 16));
            return lineNum;
        };
        return HunterCardReplaceItem;
    }(eui.ItemRenderer));
    zj.HunterCardReplaceItem = HunterCardReplaceItem;
    __reflect(HunterCardReplaceItem.prototype, "zj.HunterCardReplaceItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardReplaceItem.js.map