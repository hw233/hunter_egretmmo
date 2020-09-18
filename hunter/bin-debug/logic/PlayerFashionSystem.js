var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 时装信息系统
    // lizhengqiang
    // 20190318
    var PlayerFashionSystem = (function () {
        function PlayerFashionSystem() {
        }
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        PlayerFashionSystem.FashionWithId = function (id) {
            var info1 = zj.PlayerHunterSystem.Table(id);
            var info2 = zj.TableItemFashion.Item(info1.fashion_id[0]);
            return info2;
        };
        // 获取拥有时装猎人列表（无论是否有此猎人）
        PlayerFashionSystem.GetHunterListWithFashion = function () {
            var tbl = zj.TableBaseGeneral.Table();
            var list = [];
            for (var k in tbl) {
                if (tbl[k].fashion_id[0] != null && tbl[k].fashion_id[0] != 0 && PlayerFashionSystem.FashionWithId(tbl[k].general_id) != null) {
                    list.push(tbl[k]);
                }
            }
            list.sort(function (a, b) {
                if (a.aptitude == b.aptitude) {
                    return b.general_id - a.general_id;
                }
                else {
                    return b.aptitude - a.aptitude;
                }
            });
            return list;
        };
        // 查询一个武将id所有的时装
        PlayerFashionSystem.GetAllFashionByGeneralId = function (generalId) {
            // 0未购买 1已购买未使用 2已购买已使用 3原皮肤
            var fashionList = [];
            var generalTbl = zj.PlayerHunterSystem.Table(generalId % 100000);
            var tmp = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) { return generalId == v.general_id; });
            var generalInfo = tmp[0] != null ? tmp[0] : null;
            var equipFashionId = 0;
            if (generalInfo != null) {
                equipFashionId = generalInfo.fashionId;
            }
            for (var i = 0; i <= generalTbl.fashion_id.length; i++) {
                var tempTbl = {};
                if (i == 0) {
                    tempTbl["id"] = generalId % 100000;
                    tempTbl["state"] = 3;
                }
                else {
                    tempTbl["id"] = generalTbl.fashion_id[i - 1];
                    if (tempTbl["id"] == equipFashionId) {
                        tempTbl["state"] = 2;
                    }
                    else if (zj.Game.PlayerItemSystem.itemCount(tempTbl["id"]) > 0) {
                        tempTbl["state"] = 1;
                    }
                    else {
                        tempTbl["state"] = 0;
                    }
                }
                fashionList.push(tempTbl);
            }
            // fashionList.sort(function (a, b) {
            //     return b.state - a.state;
            // });
            var _a = zj.Table.FindR(fashionList, function (k, v) {
                return (PlayerFashionSystem.GetFashionIsNews(v.id) == false && v.state == 1) || v.id == equipFashionId || zj.PlayerItemSystem.Type2(v.id) == message.EGoodsType.GOODS_TYPE_FASHION;
            }), _ = _a[0], focusIndex = _a[1];
            return [fashionList, focusIndex != null ? focusIndex - 1 : 0];
        };
        PlayerFashionSystem.GetHunterFashionTips = function (generalId) {
            var fashionList = zj.PlayerHunterSystem.Table(generalId).fashion_id;
            for (var _i = 0, fashionList_1 = fashionList; _i < fashionList_1.length; _i++) {
                var v = fashionList_1[_i];
                if (this.GetFashionIsNews(v) == false && zj.Game.PlayerItemSystem.itemCount(v) > 0) {
                    return true;
                }
            }
            return false;
        };
        PlayerFashionSystem.GetFashionIsNews = function (fashionId) {
            if (zj.Game.PlayerItemSystem.itemCount(fashionId) > 0) {
                // 已拥有时装
                var showTips = zj.Tips.GetSaveBoolForFashionNewGet(fashionId);
                if (showTips) {
                    return true;
                }
            }
            return false;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 变量
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerFashionSystem.prototype.init = function () {
        };
        PlayerFashionSystem.prototype.uninit = function () {
        };
        // 武将时装激活
        PlayerFashionSystem.prototype.fashionWear = function (isUnwear, id, generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.FashionWearRequest();
                request.body.is_unwear = isUnwear;
                request.body.fashion_id = id;
                request.body.general_id = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 变身标识设置请求
        PlayerFashionSystem.prototype.GeneralTransferTab = function (isUnwear, id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralTransferTabRequest();
                request.body.generalId = id;
                request.body.is_show_transfer = isUnwear;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        //  购买时装
        PlayerFashionSystem.prototype.fashionBuy = function (fashionId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.FashionBuyRequest();
                request.body.fashionId = fashionId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerFashionSystem;
    }());
    zj.PlayerFashionSystem = PlayerFashionSystem;
    __reflect(PlayerFashionSystem.prototype, "zj.PlayerFashionSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerFashionSystem.js.map