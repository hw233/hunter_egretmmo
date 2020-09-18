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
    //DoubleColorPopItemTop
    //yuqingchao
    var DoubleColorPopItemTop = (function (_super) {
        __extends(DoubleColorPopItemTop, _super);
        function DoubleColorPopItemTop() {
            var _this = _super.call(this) || this;
            _this.curFruitID = null;
            _this.id = null;
            _this.color = null;
            _this.skinName = "resource/skins/fishing/DoubleColorPopItemTopSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorPopItemTop"], null);
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupAll, _this);
            _this.init();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        DoubleColorPopItemTop.prototype.init = function () {
            this.groupIcon.visible = false;
            this.curFruitID = null;
            this.groupAll.scaleX = 0.8;
            this.groupAll.scaleY = 0.8;
            // this.groupAll.anchorOffsetX = this.groupAll.width / 2;
            // this.groupAll.anchorOffsetY = this.groupAll.height / 2;
        };
        DoubleColorPopItemTop.prototype.setInfo = function (id, color, _father) {
            this.id = id;
            this.color = color;
            this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[color], this);
            this.father = _father;
        };
        DoubleColorPopItemTop.prototype.Add = function (num) {
            this.groupIcon.visible = true;
            this.lbNunID.text = zj.Game.PlayerDoubleBallSystem.fruitId(num).toString();
            this.curFruitID = num;
        };
        DoubleColorPopItemTop.prototype.Change = function (num) {
            this.lbNunID.text = zj.Game.PlayerDoubleBallSystem.fruitId(num).toString();
            this.curFruitID = num;
        };
        DoubleColorPopItemTop.prototype.Delete = function () {
            this.groupIcon.visible = false;
            this.curFruitID = null;
        };
        DoubleColorPopItemTop.prototype.SetAni = function (index) {
            var _this = this;
            var cb = function () {
                if (_this.id == 3) {
                    _this.father.btnViewEnd.enabled = true;
                }
            };
            if (this.curFruitID == null) {
                cb();
            }
        };
        DoubleColorPopItemTop.prototype.onGroupAll = function () {
            this.father.DeleteFromMyBet(this.curFruitID, this.color);
            this.father.SetBetAni();
        };
        return DoubleColorPopItemTop;
    }(eui.ItemRenderer));
    zj.DoubleColorPopItemTop = DoubleColorPopItemTop;
    __reflect(DoubleColorPopItemTop.prototype, "zj.DoubleColorPopItemTop");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorPopItemTop.js.map