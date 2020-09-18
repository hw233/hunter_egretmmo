var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 贪婪之岛活动 系统
    // wangshenzhuo 创建于2019.05.18
    // 对应db_convert.ts
    var PlayerConvertSystem = (function () {
        function PlayerConvertSystem() {
        }
        PlayerConvertSystem.Instance = function (id) {
            if (id == null || id == "") {
                return;
            }
            return zj.TableExchangeMall.Item(id);
        };
        PlayerConvertSystem.SortType = function (type) {
            var base_tbl = zj.TableExchangeMall.Table();
            var tbl = zj.Table.DeepCopy(base_tbl);
            var select_tbl = [];
            var _loop_1 = function (k) {
                var v = tbl[k];
                if (v.type == type && v.level_min <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                    var has_get = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                        return value.key == k;
                    });
                    var is_only = PlayerConvertSystem.Instance(k).is_only == 1;
                    if (has_get != null) {
                        if (is_only) {
                            v["get"] = 0;
                        }
                        else {
                            if (has_get["value"] >= v.exchange_times) {
                                v["get"] = 1;
                            }
                            else {
                                if (PlayerConvertSystem.CanConvert(v.id)) {
                                    v["get"] = 3;
                                }
                                else {
                                    v["get"] = 2;
                                }
                            }
                        }
                    }
                    else {
                        if (PlayerConvertSystem.CanConvert(v.id)) {
                            v["get"] = 3;
                        }
                        else {
                            v["get"] = 2;
                        }
                    }
                    select_tbl.push(v);
                }
            };
            for (var k in tbl) {
                _loop_1(k);
            }
            select_tbl.sort(function (a, b) {
                if (a.get == b.get) {
                    return a.quality - b.quality;
                }
                else {
                    return b.get - a.get;
                }
            });
            return select_tbl;
        };
        // public static Tips(index) {
        //     let exchange = TableExchangeMall.Table();
        //     let fit = [];
        //     let fit_tbl = [];
        //     for(const k in exchange) {
        //         const v = exchange[k];
        //         let fit_type = v.type == index;
        //         let fit_level = Game.PlayerInfoSystem.BaseInfo.level >= v.level_min;
        //         if(fit_type && fit_level) {
        //             fit.push(v);
        //         }
        //     }
        //     for(const k in fit){
        //         const v = fit[k];
        //         let is_fit = true;
        //         let fit_show = !Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls , function(k , v){
        //             return v.key == v.id;
        //         })
        //         let fit_material = PlayerConvertSystem.CanConvert(v.id);
        //         is_fit = fit_show && fit_material;
        //         fit_tbl.push(is_fit);   
        //     }
        //     return Table.FindF(fit_tbl , function(key , value){
        //         return value == true;
        //     })
        // }
        PlayerConvertSystem.Tips = function (index) {
            var exchange = zj.TableExchangeMall.Table();
            var fit = [];
            var fit_tbl = [];
            for (var k in exchange) {
                var v = exchange[k];
                var fit_type = v.type == index;
                var fit_level = zj.Game.PlayerInfoSystem.Level >= v.level_min;
                if (fit_type && fit_level) {
                    fit.push(v);
                }
            }
            var _loop_2 = function (k) {
                var v = fit[k];
                var is_fit = true;
                var fit_show = !zj.Table.FindFCall(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (_k, _v) {
                    return _v.key == v.id;
                }, this_1);
                var fit_material = PlayerConvertSystem.CanConvert(v.id);
                is_fit = fit_show && fit_material;
                fit_tbl.push(is_fit);
            };
            var this_1 = this;
            for (var k = 0; k < fit.length; k++) {
                _loop_2(k);
            }
            return zj.Table.FindFCall(fit_tbl, function (key, value) {
                return value == true;
            }, this);
        };
        PlayerConvertSystem.Tip = function () {
            var exchange = zj.TableExchangeMall.Table();
            var types = [];
            var _loop_3 = function (k) {
                var v = exchange[k];
                var typeExit = zj.Table.FindF(types, function (_k, _v) {
                    return _v == v.type;
                });
                if (!typeExit) {
                    types.push(v.type);
                    var b_convert = PlayerConvertSystem.Tips(v.type);
                    if (b_convert) {
                        return { value: true };
                    }
                }
                return { value: false };
            };
            for (var k in exchange) {
                var state_1 = _loop_3(k);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        PlayerConvertSystem.CheckPotato = function (n_tbl, h_tbl) {
            var is_check = [];
        };
        PlayerConvertSystem.NumCanConvert = function (id) {
            var info = PlayerConvertSystem.Instance(id);
            var count = 0;
            for (var k in info.exchange_goods) {
                var v = info.exchange_goods[k];
                var type = zj.PlayerItemSystem.ItemType(v[0]);
                if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    if (zj.PlayerItemSystem.Resource(v[0]) >= v[1]) {
                        count = count + 1;
                    }
                }
                else {
                    if (zj.PlayerItemSystem.Count(v[0]) >= v[1]) {
                        count = count + 1;
                    }
                }
            }
            return count;
        };
        PlayerConvertSystem.needMaterials = function (info) {
            var tbl_need = [];
            var seat = (_a = {},
                _a[1] = "exchange_one",
                _a[2] = "exchange_two",
                _a[3] = "exchange_three",
                _a);
            var use = 0;
            for (var i = 0; i < 3; i++) {
                if (info[seat[1]].length != 0) {
                    var goods = [];
                    goods.id = info[seat[i]][0];
                    goods.count = 1;
                    goods.level = info[seat[i]][1] || -1;
                    tbl_need.push(goods);
                }
                else if (info.exchange_goods.length > 0) {
                    if (info.exchange_goods[use] != null) {
                        var goods = [];
                        goods.id = info.exchange_goods[use][0];
                        goods.count = info.exchange_goods[use][1];
                        goods.level = info.exchange_goods[use][2] || -1;
                        tbl_need.push(goods);
                        use = use + 1;
                    }
                    else {
                        var goods = [];
                        goods.id = -2;
                        goods.count = -2;
                        goods.elvel = -2;
                        tbl_need.push(goods);
                    }
                }
                else {
                    var goods = [];
                    goods.id = -2;
                    goods.count = -2;
                    goods.elvel = -2;
                    tbl_need.push(goods);
                }
            }
            return tbl_need;
            var _a;
        };
        PlayerConvertSystem.fitPotato = function (info, exist, has) {
            var fit_tbl = [];
            // for(const k in Game.PlayerInfoSystem.BaseInfo.po)
        };
        PlayerConvertSystem.prototype.upToTime = function (time) {
            var str = "";
            var day = Math.floor(time / 86400);
            var hour = Math.floor((time % 86400) / 3600);
            var min = Math.floor(((time % 86400) % 3600) / 60);
            if (day == 0) {
                if (hour == 0) {
                    if (min == 0) {
                        str = zj.TextsConfig.TextsConfig_Convert.upToStock[4];
                    }
                    else {
                        str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[3], min);
                    }
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[2], hour, min);
                }
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[1], day, hour, min);
            }
            return str;
        };
        PlayerConvertSystem.CanConvert = function (id) {
            var info = zj.TableExchangeMall.Item(id);
            var can_convert = true;
            for (var k = 0; k < info.exchange_goods.length; k++) {
                var v = info.exchange_goods[k];
                if (zj.Game.PlayerItemSystem.queryItem(v[0]) == null) {
                    return false;
                }
                if (zj.Game.PlayerItemSystem.itemCount(v[0]) < v[1]) {
                    can_convert = false;
                    return false;
                }
            }
            var find = zj.Table.FindRcall(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                return value.key == id;
            }, this)[0];
            var can_convert1 = find == null && true || (find.value < info.exchange_times);
            return can_convert1;
        };
        PlayerConvertSystem.ExchangeMall_Visit = function (type, id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ExchangeMallRequest();
                request.body.type = type;
                request.body.mallId = id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerConvertSystem;
    }());
    zj.PlayerConvertSystem = PlayerConvertSystem;
    __reflect(PlayerConvertSystem.prototype, "zj.PlayerConvertSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerConvertSystem.js.map