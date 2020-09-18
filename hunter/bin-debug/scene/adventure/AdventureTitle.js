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
    var AdventureTitle = (function (_super) {
        __extends(AdventureTitle, _super);
        // public imgLock: eui.Image;// 锁定（未开启）
        // public imgFlag: eui.Image;// 新开启
        function AdventureTitle() {
            return _super.call(this) || this;
            // this.skinName = "resource/skins/adventure/AdventureTitleSkin.exml";
        }
        AdventureTitle.prototype.setData = function (ui, _data) {
            var idx = _data.area_id;
            this.lbName.text = _data.area_id + "." + _data.area_name;
            this.setState(0);
        };
        AdventureTitle.prototype.setState = function (state, param) {
            if (param === void 0) { param = null; }
            switch (state) {
                case 0:
                    this.visible = false;
                    break;
                case 1:
                    this.currentState = "pass";
                    this.visible = true;
                    break;
                case 2:
                    this.currentState = "curr";
                    this.visible = true;
                    break;
                case 3:
                    this.currentState = "lock";
                    this.lbLock.text = param;
                    this.visible = true;
                    break;
            }
        };
        return AdventureTitle;
    }(zj.UI));
    zj.AdventureTitle = AdventureTitle;
    __reflect(AdventureTitle.prototype, "zj.AdventureTitle");
})(zj || (zj = {}));
//# sourceMappingURL=AdventureTitle.js.map