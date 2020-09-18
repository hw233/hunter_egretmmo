var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 帮助界面---获取表中数据
     * created by Lian Lei
     * 2018.12.19
     */
    var HelpOther = (function () {
        function HelpOther() {
        }
        HelpOther.helpSmallTypeInstance = function (id) {
            var info = zj.TableClientHelpSmallType.Item(id);
            return info;
        };
        HelpOther.helpBigTypeInstance = function (id) {
            var info = zj.TableClientHelpBigType.Item(id);
            return info;
        };
        HelpOther.helpInstance = function (id) {
            var info = zj.TableClientHelp.Item(id);
            return info;
        };
        HelpOther.getHelpBySmallType = function (smallType) {
            var ret = [];
            var smallTypeTbl = this.helpSmallTypeInstance(smallType).help_ids;
            if (typeof (smallTypeTbl) == "number" || typeof (smallTypeTbl) == "string") {
                ret.push(this.helpInstance(smallTypeTbl));
            }
            else {
                for (var k in smallTypeTbl) {
                    if (smallTypeTbl.hasOwnProperty(k)) {
                        var v = smallTypeTbl[k];
                        ret.push(this.helpInstance(v));
                    }
                }
            }
            return ret;
        };
        HelpOther.getHelpListByBigType = function (bigType) {
            var ret = [];
            // let _table_big_type = TableUtil.getInstance().getTableByName(StringConfig_Table.help_big_type);
            var _table_big_type = zj.TableClientHelpBigType.Table();
            //let _cur_small_types = this.helpBigTypeInstance(bigType).small_ids.split("|");
            var _cur_small_types = this.helpBigTypeInstance(bigType).small_ids;
            for (var i in _table_big_type) {
                if (_table_big_type.hasOwnProperty(i)) {
                    var v = _table_big_type[i];
                    ret.push(v);
                    if (v.big_id == bigType) {
                        for (var ii in _cur_small_types) {
                            if (_cur_small_types.hasOwnProperty(ii)) {
                                var vv = _cur_small_types[ii];
                                ret.push(this.helpSmallTypeInstance(vv));
                            }
                        }
                    }
                }
            }
            return ret;
        };
        return HelpOther;
    }());
    zj.HelpOther = HelpOther;
    __reflect(HelpOther.prototype, "zj.HelpOther");
})(zj || (zj = {}));
//# sourceMappingURL=HelpOther.js.map