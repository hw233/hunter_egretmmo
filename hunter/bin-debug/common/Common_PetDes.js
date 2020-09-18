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
    // （宠物/念兽）信息
    //  wangshenzhuo
    //  2019/1/16
    var Common_PetDes = (function (_super) {
        __extends(Common_PetDes, _super);
        function Common_PetDes() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_PetDesSkin.exml";
            return _this;
        }
        Common_PetDes.prototype.Load = function (text) {
            this.labelTalent.text = text;
        };
        Common_PetDes.prototype.UICloseAndUp = function () {
        };
        Common_PetDes.ID = "Common_PetDes";
        return Common_PetDes;
    }(zj.UI));
    zj.Common_PetDes = Common_PetDes;
    __reflect(Common_PetDes.prototype, "zj.Common_PetDes");
})(zj || (zj = {}));
//# sourceMappingURL=Common_PetDes.js.map