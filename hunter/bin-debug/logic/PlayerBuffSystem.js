var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerBuffSystem = (function () {
        function PlayerBuffSystem() {
            this.MAX_BUFF_SHOW = 8;
        }
        PlayerBuffSystem.prototype.init = function () {
        };
        PlayerBuffSystem.prototype.uninit = function () {
        };
        PlayerBuffSystem.prototype.SetBuffLayer = function (tbl) {
            var show_tbl = [];
            var index = 0;
            var _loop_1 = function (k) {
                var v = tbl[k];
                if (v.is_showIcon) {
                    var shieldNum = 0;
                    if (v.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_NUM) {
                        shieldNum = v.sec_value;
                    }
                    if (v.is_foldIcon == -1) {
                        if (show_tbl.length != 0) {
                            if (index > this_1.MAX_BUFF_SHOW) {
                                index = index % this_1.MAX_BUFF_SHOW;
                            }
                            show_tbl[index] = [];
                            show_tbl[index].push([v.buff_type, 1, shieldNum]);
                            index = index + 1;
                        }
                        else {
                            show_tbl[index] = [];
                            show_tbl[index].push([v.buff_type, 1, shieldNum]);
                            index = index + 1;
                        }
                    }
                    else {
                        if (show_tbl.length != 0) {
                            if (index > this_1.MAX_BUFF_SHOW) {
                                index = index % this_1.MAX_BUFF_SHOW;
                            }
                            var _a = zj.Table.FindR(show_tbl, function (kk, vv) {
                                return v.buff_type == vv[0][0];
                            }), buffInfo = _a[0], buffKey = _a[1];
                            if (buffInfo == null) {
                                show_tbl[index] = [];
                                show_tbl[index].push([v.buff_type, 1, shieldNum]);
                                index = index + 1;
                            }
                            else {
                                if (buffInfo[0][1] < v.is_foldIcon) {
                                    show_tbl[buffKey][0][1] = buffInfo[0][1] + 1;
                                }
                                show_tbl[buffKey][0][2] = buffInfo[0][2] + shieldNum;
                            }
                        }
                        else {
                            show_tbl[index] = [];
                            show_tbl[index].push([v.buff_type, 1, shieldNum]);
                            index = index + 1;
                        }
                    }
                }
            };
            var this_1 = this;
            for (var k in tbl) {
                _loop_1(k);
            }
            return show_tbl;
        };
        PlayerBuffSystem.prototype.FindDiffer = function (tbl1, tbl2) {
            var tbl = [];
            if (tbl1.length != 0 && tbl2.length != 0) {
                var more = tbl1.length >= tbl2.length && tbl1.length || tbl2.length;
                var use = tbl1.length >= tbl2.length;
                var index = 0;
                for (var i = 0; i < more; i++) {
                    if (tbl1[i] != null && tbl2[i]) {
                        if ((tbl1[i][0][0] != tbl2[i][0][0]) || (tbl1[i][0][1] != tbl2[i][0][1]) || (tbl1[i][0][2] != tbl2[i][0][2])) {
                            tbl[index] = [i, tbl2[i]];
                            index = index + 1;
                        }
                    }
                    else {
                        if (use) {
                            tbl[index] = [i, [[-1, 0, 0]]];
                            index = index + 1;
                        }
                        else {
                            tbl[index] = [i, tbl2[i]];
                            index = index + 1;
                        }
                    }
                }
            }
            else if (tbl1.length != 0) {
                var index = 0;
                for (var i = 0; i < tbl1.length; i++) {
                    tbl[index] = [i, [[-1, 0, 0]]];
                    index = index + 1;
                }
            }
            else if (tbl2.length != 0) {
                var index = 0;
                for (var i = 0; i < tbl2.length; i++) {
                    tbl[index] = [i, tbl2[i]];
                    index = index + 1;
                }
            }
            return tbl;
        };
        PlayerBuffSystem.prototype.GetBuffsAttribTbl = function (buffs) {
            var result = zj.Helper.CreateGeneralAttrTbl0();
            for (var j = 0; j < buffs.length; j++) {
                var tblAttrib = this.GetAttribTbl(buffs[j]);
                for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                    result[i] = result[i] + tblAttrib[i];
                }
            }
            return result;
        };
        PlayerBuffSystem.prototype.GetAttribTbl = function (id) {
            var result = zj.Helper.CreateGeneralAttrTbl0();
            var tbl = zj.TableBuff.Item(id);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i]];
                if (value != null) {
                    result[i] = value;
                }
            }
            return result;
        };
        return PlayerBuffSystem;
    }());
    zj.PlayerBuffSystem = PlayerBuffSystem;
    __reflect(PlayerBuffSystem.prototype, "zj.PlayerBuffSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerBuffSystem.js.map