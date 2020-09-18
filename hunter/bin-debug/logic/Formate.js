var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author xingliwei
     *
     * @date 2019-2-23
     *
     * @class 帮助类，辅助做一些计算
     */
    var Formate = (function () {
        function Formate() {
        }
        Formate.Instence = function (id) {
            if (id == null) {
                id = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            }
            if (zj.ckid(id)) {
                return null;
            }
            return zj.TableFormations.Item(id);
        };
        return Formate;
    }());
    zj.Formate = Formate;
    __reflect(Formate.prototype, "zj.Formate");
})(zj || (zj = {}));
//# sourceMappingURL=Formate.js.map