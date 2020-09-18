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
     * @class 卡片显示文字Item
     *
     * @author hao hui hui
     *
     * @date 2018.11.21
     *
     * @description modified by Lian Lei
     *
     * @date 2019.07.20
     */
    var CardAttriItem = (function (_super) {
        __extends(CardAttriItem, _super);
        function CardAttriItem() {
            var _this = _super.call(this) || this;
            _this.oldData = null;
            _this.skinName = "resource/skins/card/CardAttriItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardAttriItem"], null);
            return _this;
        }
        CardAttriItem.prototype.dataChanged = function () {
            if (this.oldData == this.data)
                return;
            this.updateView(this.data);
        };
        CardAttriItem.prototype.updateView = function (data) {
            if (data.type == 0 || data.type == null) {
                var range_growth = void 0;
                if ((data.index + 1) != data.addStrlength) {
                    range_growth = zj.Game.PlayerCardSystem.attriInstance(data.cardInfo.add_attri[data.index].attriId).range_growth;
                }
                var str = null;
                var _type = 1;
                if ((data.index + 1) != data.addStrlength && range_growth[0][0] == 0) {
                    str = zj.PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0];
                }
                else if ((data.index + 1) != data.addStrlength && range_growth.length != 0) {
                    if (data.cardInfo.add_attri[data.index].growthValue <= range_growth[0][1]) {
                        _type = 1;
                    }
                    else {
                        _type = 2;
                    }
                    str = zj.PlayerCardSystem.GetAddStr(data.cardInfo, data.cardInfo.add_attri[data.index].growthValue, 1)[data.index][0];
                }
                else if ((data.index + 1) == data.addStrlength) {
                    str = data.info[0];
                }
                var star = data.cardInfo.star;
                var growthValue = null;
                if (star == 6) {
                    var range = zj.Game.PlayerCardSystem.attriInstance(data.cardInfo.add_attri[data.index].attriId).range_growth;
                    var _type_1 = 1;
                    if (range[0][0] != 0) {
                        growthValue = data.cardInfo.add_attri[data.index].growthValue;
                        if (growthValue <= range[0][1]) {
                            _type_1 = 1;
                        }
                        else {
                            _type_1 = 2;
                        }
                    }
                    str = zj.PlayerCardSystem.GetAddStr(data.cardInfo, growthValue, _type_1)[data.index][0];
                    var labelColor = zj.Helper.RGBToHex("r:30,g:30,b:30");
                    this.labelAttri.textColor = labelColor;
                }
                else if (zj.CommonConfig.card_addattri_awake_star[data.index] <= star && ((data.index + 1) != data.addStrlength || star == 6)) {
                    var labelColor = zj.Helper.RGBToHex("r:30,g:30,b:30");
                    this.labelAttri.textColor = labelColor;
                }
                else if ((data.index + 1) == data.addStrlength) {
                    var labelColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                    this.labelAttri.textColor = labelColor;
                }
                else {
                    var labelColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                    this.labelAttri.textColor = labelColor;
                    str = data.info[0] + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_star_act, (zj.Helper.GetNumCH(zj.CommonConfig.card_addattri_awake_star[data.index].toString())));
                }
                this.labelAttri.width = data.width;
                this.imageBack.width = data.width;
                this.groupAttri.width = data.width;
                this.width = data.width;
                this.labelAttri.textFlow = zj.Util.RichText(str);
                this.imageBack.height = this.labelAttri.textHeight + 4;
                this.groupAttri.height = this.labelAttri.textHeight + 4;
                this.height = this.labelAttri.textHeight + 4;
                if (data.isHideBG) {
                    var labelColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
                    this.imageBack.visible = false;
                    this.labelAttri.textColor = labelColor;
                    if (data.index + 1 == data.addStrlength) {
                        this.labelAttri.textColor = zj.Helper.RGBToHex("r:120,g:120,b:120");
                    }
                }
            }
            else if (data.type == 1) {
                this.SetInfoNotGet(data.index, data.info, data.width);
            }
        };
        CardAttriItem.prototype.SetInfoNotGet = function (index, info, width) {
            var str = info;
            this.labelAttri.width = width;
            this.imageBack.width = width;
            this.groupAttri.width = width;
            this.width = width;
            this.labelAttri.textFlow = zj.Util.RichText(str);
            this.imageBack.visible = (index + 1) > 2;
            this.imageBack.height = this.labelAttri.textHeight + 4;
            this.groupAttri.height = this.labelAttri.textHeight + 4;
            this.height = this.labelAttri.textHeight + 4;
            var labelColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            if (this.data.isHideBG) {
                this.imageBack.visible = false;
                this.labelAttri.textColor = labelColor;
            }
        };
        CardAttriItem.prototype.getStrlineNum = function (info, width) {
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
        return CardAttriItem;
    }(eui.ItemRenderer));
    zj.CardAttriItem = CardAttriItem;
    __reflect(CardAttriItem.prototype, "zj.CardAttriItem");
    var CardAttriItemData = (function () {
        function CardAttriItemData() {
            this.isHideBG = false;
        }
        return CardAttriItemData;
    }());
    zj.CardAttriItemData = CardAttriItemData;
    __reflect(CardAttriItemData.prototype, "zj.CardAttriItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CardAttriItem.js.map