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
    //查询结果
    //yuqingchao
    //2019.05.28
    var DoubleColorViewEnd = (function (_super) {
        __extends(DoubleColorViewEnd, _super);
        function DoubleColorViewEnd() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/DoubleColorViewEndSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        DoubleColorViewEnd.prototype.setInfo = function (msg) {
            zj.closeCache(this.groupCache);
            var info = msg;
            info.sort(function (a, b) {
                return b.creatTime - a.creatTime;
            });
            this.viewArr = new eui.ArrayCollection();
            for (var i = 0; i < info.length; i++) {
                this.viewArr.addItem({
                    info: info[i],
                });
            }
            this.lstRed.dataProvider = this.viewArr;
            this.lstRed.itemRenderer = zj.DoubleColorViewEndItem;
            // this.lstRed.removeChildren();
            // for (let i = 0; i < info.length; i++) {
            // 	let item = new DoubleColorViewEndItem();
            // 	item.dataChanged(info[i]);
            // 	this.lstRed.addChild(item);
            // }
            zj.setCache(this.groupCache);
        };
        DoubleColorViewEnd.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return DoubleColorViewEnd;
    }(zj.Dialog));
    zj.DoubleColorViewEnd = DoubleColorViewEnd;
    __reflect(DoubleColorViewEnd.prototype, "zj.DoubleColorViewEnd");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewEnd.js.map