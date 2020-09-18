var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 社交好友 系统
    // wangshenzhuo 创建于2019.03.19
    // 对应db_relate.ts
    //关系成员排序
    var PlayerRelateSystemSORT;
    (function (PlayerRelateSystemSORT) {
        PlayerRelateSystemSORT[PlayerRelateSystemSORT["NONE"] = 1] = "NONE";
        PlayerRelateSystemSORT[PlayerRelateSystemSORT["MAIN"] = 2] = "MAIN";
        PlayerRelateSystemSORT[PlayerRelateSystemSORT["MINE"] = 3] = "MINE";
    })(PlayerRelateSystemSORT = zj.PlayerRelateSystemSORT || (zj.PlayerRelateSystemSORT = {}));
    var PlayerRelateSystem = (function () {
        function PlayerRelateSystem() {
            this.relatInfo = null; // 关系信息
            this.relateResp = null; // 我的关系信息
            this.givepowerMap = [];
            this.TipFirend = false; // 主场景好友红点
        }
        PlayerRelateSystem.prototype.givepower = function () {
            for (var k in zj.Game.PlayerRelateSystem.relateResp.givepower) {
                var v = zj.Game.PlayerRelateSystem.relateResp.givepower[k];
                this.givepowerMap[v] = v;
            }
            return this.givepowerMap;
        };
        PlayerRelateSystem.prototype.init = function () {
            if (!zj.Device.isReviewSwitch) {
                zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.onRelatInfoChange, this);
            }
        };
        PlayerRelateSystem.prototype.uninit = function () {
            this.relatInfo = null;
            this.relateResp = null;
            this.givepowerMap = [];
            this.serverName = "";
        };
        PlayerRelateSystem.prototype.onRelatInfoChange = function (ev) {
            var _this = this;
            this.relationInfo().then(function (data) {
                _this.relateResp = data;
                for (var _i = 0, _a = data.relations; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (zj.Game.PlayerInfoSystem.BaseInfo.id == v.roleInfo.id) {
                        _this.relatInfo = v;
                        break;
                    }
                }
            });
        };
        PlayerRelateSystem.Instance = function (id) {
            if (id == 0 || id == -1)
                return null;
            return zj.TableGeneralSkill.Item(id);
        };
        PlayerRelateSystem.Insert = function (relate) {
            var data = zj.Table.DeepCopy(relate);
            var bFind = false;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.roleInfo.id == data.roleInfo.id && !bFind) {
                    zj.Game.PlayerRelateSystem.relateResp.relations[k] = data;
                    bFind = true;
                }
            }
            //新的关系信息直接添加
            if (!bFind) {
                zj.Game.PlayerRelateSystem.relateResp.relations.push(data);
            }
        };
        PlayerRelateSystem.Delete = function (relate) {
            var data = zj.Table.DeepCopy(relate);
            var bFind = false;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.roleInfo.id == data.roleInfo.id && !bFind) {
                    var a = zj.Game.PlayerRelateSystem.relateResp.relations;
                    zj.Game.PlayerRelateSystem.relateResp.relations.splice(Number(k), 1);
                    bFind = true;
                }
            }
        };
        PlayerRelateSystem.Count = function (relateType) {
            var ret = 0;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == relateType) {
                    ret = ret + 1;
                }
            }
            return ret;
        };
        //排序比较函数
        PlayerRelateSystem.sort_func = function (sort_type) {
            //排序类型
            if (sort_type == null) {
                sort_type = PlayerRelateSystemSORT.NONE;
            }
            if (sort_type == PlayerRelateSystemSORT.MAIN) {
            }
        };
        PlayerRelateSystem.Map = function (relateType, sort_type) {
            var ret = [];
            var a = zj.Game.PlayerRelateSystem.relateResp;
            //原始数据
            if (zj.Game.PlayerRelateSystem.relateResp) {
                for (var i = 0; i < zj.Game.PlayerRelateSystem.relateResp.relations.length; i++) {
                    if (zj.Game.PlayerRelateSystem.relateResp.relations[i].type == relateType) {
                        ret.push(zj.Game.PlayerRelateSystem.relateResp.relations[i]);
                    }
                }
                //排序
                ret.sort(function (a, b) {
                    if (a.roleInfo.logoutTime == b.roleInfo.logoutTime) {
                        return b.roleInfo.logoutTime - a.roleInfo.logoutTime;
                    }
                    else {
                        return a.roleInfo.logoutTime - b.roleInfo.logoutTime;
                    }
                });
            }
            return ret;
        };
        PlayerRelateSystem.prototype.IsFriend = function (roleId) {
            var ret = false;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_FRIEND && v.roleInfo.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };
        PlayerRelateSystem.prototype.IsEnemy = function (roleId) {
            var ret = false;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_ENEMY && v.roleInfo.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };
        PlayerRelateSystem.prototype.IsLeague = function (roleId) {
            var ret = false;
            for (var k in zj.Game.PlayerLeagueSystem.LeagueInfo.info[0].members) {
                var v = zj.Game.PlayerLeagueSystem.LeagueInfo.info[0].members[k];
                if (v.monarchbase.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };
        //获取数据
        PlayerRelateSystem.prototype.relationInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        return;
                    }
                    // 解压其他gameinfo信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.relationInfo, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var RelationInfo = new message.RelationInfoZip();
                    if (!RelationInfo.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("其他游戏数据解析失败"));
                        return;
                    }
                    _this.relateResp = RelationInfo;
                    for (var _i = 0, _a = RelationInfo.relations; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (zj.Game.PlayerInfoSystem.BaseInfo.id == v.roleInfo.id) {
                            _this.relatInfo = v;
                            break;
                        }
                    }
                    zj.Game.PlayerRelateSystem.givepower();
                    resolve(RelationInfo);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerRelateSystem.RelationGivePower_Req = function (data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationGivePowerRequest();
                request.body.roleIds = data;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerRelateSystem.RelationRewardPower_Req = function (data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationRewardPowerRequest();
                request.body.roleIds = data;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerRelateSystem.RelationApplyListReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationApplyListRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    zj.Game.PlayerRelateSystem.TipFirend = response.body.applys.length > 0;
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerRelateSystem.RelationAnswerFriend_Visit = function (data, bAgree) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationAnswerFriendRequest();
                request.body.roleIds = data;
                request.body.is_agree = bAgree;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerRelateSystem.RelationSearchList_Visit = function (serchId, serchName, beginPos, numEach) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationSearchListRequest();
                request.body.roleId = serchId;
                request.body.roleName = serchName;
                request.body.beginPos = beginPos;
                request.body.num = numEach;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerRelateSystem;
    }());
    zj.PlayerRelateSystem = PlayerRelateSystem;
    __reflect(PlayerRelateSystem.prototype, "zj.PlayerRelateSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerRelateSystem.js.map