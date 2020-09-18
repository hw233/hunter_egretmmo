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
    //DoubleColorPopItemSkin
    //yuqingchao
    var DoubleColorPopItem = (function (_super) {
        __extends(DoubleColorPopItem, _super);
        function DoubleColorPopItem() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.color = null;
            _this.fruitId = 0;
            _this.count = 0;
            _this.skinName = "resource/skins/fishing/DoubleColorPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorPopItem"], null);
            _this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupDown, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.groupAll.scaleX = _this.groupAll.scaleY = 0.8;
            return _this;
        }
        DoubleColorPopItem.prototype.dataChanged = function () {
            this.id = this.data.id;
            this.fruitId = this.data.info.goodsId;
            this.count = this.data.info.count;
            this.color = this.data.color;
            this.father = this.data.father;
            this.lbNum.visible = false;
            this.imgShadow.visible = false;
            this.lbNumID.text = zj.Game.PlayerDoubleBallSystem.fruitId(this.fruitId).toString();
            this.lbNum.text = this.count.toString();
            this.imgicon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[this.color], this);
            this.btnDown.enabled = true;
        };
        DoubleColorPopItem.prototype.addNum = function () {
            this.imgShadow.visible = false;
            this.count = this.count + 1;
            this.lbNum.text = this.count.toString();
            this.btnDown.enabled = true;
        };
        DoubleColorPopItem.prototype.MinusNum = function () {
            this.imgShadow.visible = true;
            this.count = this.count - 1;
            this.lbNum.text = this.count.toString();
            this.btnDown.enabled = false;
        };
        DoubleColorPopItem.prototype.onGroupDown = function () {
            var find = zj.Table.FindF(this.father._my_bet_blue_id, function (_k, _v) {
                return _v == 0;
            });
            if (this.color == 0 && this.father._my_bet_red_id == 0) {
                this.father.insertIntoMyBet(this.fruitId, this.color);
                this.father.SetBetAni();
            }
            else if (this.color == 1 && find) {
                this.father.insertIntoMyBet(this.fruitId, this.color);
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.pos_not_enough);
            }
        };
        return DoubleColorPopItem;
    }(eui.ItemRenderer));
    zj.DoubleColorPopItem = DoubleColorPopItem;
    __reflect(DoubleColorPopItem.prototype, "zj.DoubleColorPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorPopItem.js.map