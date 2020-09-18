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
    //公会BOSS-击杀失败
    //yuqingchao
    //2019.03.11
    var LeagueBossLose = (function (_super) {
        __extends(LeagueBossLose, _super);
        function LeagueBossLose() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBossLoseSkin.exml";
            _this.btnKnow.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnKnow, _this);
            _this.groupAdd.addChild(new zj.LeagueBossRank());
            _this.groupBG.visible = true;
            _this.imgInstance.visible = true;
            _this.imgTip.visible = true;
            _this.imgInstance.source = zj.cachekey("ui_instance_LayerInstance_png", _this);
            _this.imgTip.source = zj.cachekey("ui_instance_BoardTopTip_png", _this);
            return _this;
        }
        LeagueBossLose.prototype.onBtnKnow = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueBossLose;
    }(zj.Dialog));
    zj.LeagueBossLose = LeagueBossLose;
    __reflect(LeagueBossLose.prototype, "zj.LeagueBossLose");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossLose.js.map