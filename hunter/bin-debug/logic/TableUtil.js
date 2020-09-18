var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // TableUtil
    // hexiaowei
    // 2018-11-22
    var TableUtil = (function () {
        function TableUtil() {
            this.tableMap = {};
        }
        TableUtil.getInstance = function () {
            if (TableUtil.instance == null) {
                TableUtil.instance = new TableUtil();
            }
            return TableUtil.instance;
        };
        TableUtil.prototype.getTableByName = function (name) {
            if (this.tableMap[name] != null) {
                return this.tableMap[name];
            }
            else {
                console.log("[" + name + "] not find!");
                return null;
            }
        };
        TableUtil.instance = null;
        return TableUtil;
    }());
    zj.TableUtil = TableUtil;
    __reflect(TableUtil.prototype, "zj.TableUtil");
})(zj || (zj = {}));
//# sourceMappingURL=TableUtil.js.map