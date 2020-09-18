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
    // created by hhh in 2018/11/16
    /************** 图鉴item ****************/
    var CardPokedexItemCard = (function (_super) {
        __extends(CardPokedexItemCard, _super);
        function CardPokedexItemCard() {
            var _this = _super.call(this) || this;
            _this.isTouch = false;
            _this.touchX = 0;
            _this.touchY = 0;
            _this.skinName = "resource/skins/card/CardPokedexItemCardSkin.exml";
            zj.cachekeys(zj.UIResource["CardPokedexItemCard"], null);
            _this.init();
            return _this;
        }
        CardPokedexItemCard.prototype.init = function () {
            this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupPokedexCardBegin, this);
            this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchGroupPokedexCardMove, this);
            this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchGroupPokedexCardEnd, this);
        };
        CardPokedexItemCard.prototype.dataChanged = function () {
            this.info = this.data;
            var _a = zj.PlayerCardSystem.GetItemFrame(this.info.id), _ = _a[0], __ = _a[1], outFrame = _a[2];
            var find = false;
            var potatoHistoryIds = zj.Game.PlayerCardSystem.getAllPotatoHistoryIds();
            for (var k in potatoHistoryIds) {
                if (potatoHistoryIds[k] == this.info.id) {
                    find = true;
                    break;
                }
            }
            this.groupLock.visible = !find;
            this.labelNum.text = this.info.num;
            this.labelName.text = this.info.name;
            this.imageCardPic.source = zj.cachekey(this.info.paths, this);
            this.imageCardBoard.source = zj.cachekey(outFrame, this);
            zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 15);
        };
        CardPokedexItemCard.prototype.onTouchGroupPokedexCardBegin = function (e) {
            var _this = this;
            this.touchX = e.stageX;
            this.touchY = e.stageY;
            this.timeOut = egret.setTimeout(function () { zj.TipManager.ShowCardNotGet(_this.info); }, this, 1000);
        };
        CardPokedexItemCard.prototype.onTouchGroupPokedexCardMove = function (e) {
            if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
                return;
            egret.clearTimeout(this.timeOut);
        };
        CardPokedexItemCard.prototype.onTouchGroupPokedexCardEnd = function () {
            egret.clearTimeout(this.timeOut);
        };
        return CardPokedexItemCard;
    }(eui.ItemRenderer));
    zj.CardPokedexItemCard = CardPokedexItemCard;
    __reflect(CardPokedexItemCard.prototype, "zj.CardPokedexItemCard");
})(zj || (zj = {}));
//# sourceMappingURL=CardPokedexItemCard.js.map