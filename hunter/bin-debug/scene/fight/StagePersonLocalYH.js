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
    /**本地特殊援助类,继承人物类 */
    var StagePersonLocalYH = (function (_super) {
        __extends(StagePersonLocalYH, _super);
        function StagePersonLocalYH(node, aiTag) {
            return _super.call(this, node, aiTag) || this;
        }
        // public procAi(tick) {
        // 	super.procAi(tick);
        // }
        StagePersonLocalYH.prototype.creatAi = function (aiId) {
            this.myAI = new zj.AiBrainYH(this, aiId);
        };
        StagePersonLocalYH.prototype.loadBaseData = function () {
            _super.prototype.loadBaseData.call(this);
            this.SetAttrib("maxRage", 200);
        };
        return StagePersonLocalYH;
    }(zj.StagePersonLocalHelp));
    zj.StagePersonLocalYH = StagePersonLocalYH;
    __reflect(StagePersonLocalYH.prototype, "zj.StagePersonLocalYH");
})(zj || (zj = {}));
//# sourceMappingURL=StagePersonLocalYH.js.map