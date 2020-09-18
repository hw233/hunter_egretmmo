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
     * yuqingchao
     * 2018.12.10
     * 公会建设List
     */
    var LeagueDonateItem = (function (_super) {
        __extends(LeagueDonateItem, _super);
        function LeagueDonateItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueDonateItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityXuyuanLiveItem"], null);
            return _this;
        }
        LeagueDonateItem.prototype.dataChanged = function () {
            var tblDonate = zj.TableLeagueDonate.Table();
            var num = this.data.num;
            if (tblDonate[num].consume_token == 0) {
                this.imgCost.source = zj.cachekey(zj.UIConfig.UIConfig_League.donate[0], this);
                this.lbCost.text = tblDonate[num].consume_money.toString();
            }
            else {
                this.imgCost.source = zj.cachekey(zj.UIConfig.UIConfig_League.donate[1], this);
                this.lbCost.text = tblDonate[num].consume_token.toString();
            }
            this.lbGetExp.text = tblDonate[num].reward_exp.toString();
            this.lbGetToken.text = tblDonate[num].reward_token.toString();
            this.imgTypeName.source = zj.cachekey(zj.UIConfig.UIConfig_League.donateNmae[num - 1], this);
            this.imglcon.source = zj.cachekey(zj.UIConfig.UIConfig_League.donateIcon[num - 1], this);
            this.imgBoardFrame.visible = this.selected;
        };
        return LeagueDonateItem;
    }(eui.ItemRenderer));
    zj.LeagueDonateItem = LeagueDonateItem;
    __reflect(LeagueDonateItem.prototype, "zj.LeagueDonateItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueDonateItem.js.map