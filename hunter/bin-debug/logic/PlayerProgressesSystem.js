var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 进程系统
    // hexiaowei 创建于2019.01.02
    var PlayerProgressesSystem = (function () {
        function PlayerProgressesSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.progressInfo = []; //  进程信息
            this.progressMap = {};
            this.progressTime1057 = 0; // 许愿屋倒计时
            this.newEProcessType = (_a = {},
                _a[0] = message.EProcessType.PROCESS_TYPE_NONO,
                _a[1] = message.EProcessType.PROCESS_TYPE_NEXTDAY,
                _a[101] = message.EProcessType.PROCESS_TYPE_ACTIVITIES,
                _a[1001] = message.EProcessType.PROCESS_TYPE_LADDER,
                _a[1002] = message.EProcessType.PROCESS_TYPE_LOTTERY_DOUBLE,
                _a[1003] = message.EProcessType.PROCESS_TYPE_LEAGUE_MATCH,
                _a[1004] = message.EProcessType.PROCESS_TYPE_IMPEACH,
                _a[1005] = message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE,
                _a[1006] = message.EProcessType.PROCESS_TYPE_CHAT_FORBID,
                _a[1007] = message.EProcessType.PROCESS_TYPE_REWARD_POWER,
                _a[1008] = message.EProcessType.PROCESS_TYPE_OPEN_POWER,
                _a[1009] = message.EProcessType.PROCESS_TYPE_MALL_LADDER,
                _a[1010] = message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,
                _a[1011] = message.EProcessType.PROCESS_TYPE_MALL_NORMAL,
                _a[1012] = message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,
                _a[1013] = message.EProcessType.PROCESS_TYPE_MISSION_SEVEN,
                _a[1014] = message.EProcessType.PROCESS_TYPE_GAMBLE_NORMAL,
                _a[1015] = message.EProcessType.PROCESS_TYPE_GAMBLE_SENIOR,
                _a[1016] = message.EProcessType.PROCESS_TYPE_SCENE_BOSS,
                _a[1018] = message.EProcessType.PROCESS_TYPE_MALL_HONOR,
                _a[1019] = message.EProcessType.PROCESS_TYPE_SINGLECRAFT,
                _a[1020] = message.EProcessType.PROCESS_TYPE_POST_FORBID,
                _a[1021] = message.EProcessType.PROCESS_TYPE_MALL_RELIC,
                _a[1050] = message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS,
                _a[1051] = message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY,
                _a[1052] = message.EProcessType.PROCESS_TYPE_LEAGUE_FISHING,
                _a[1053] = message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE,
                _a[1054] = message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG,
                _a[1055] = message.EProcessType.PROCESS_TYPE_COMMENT_FORBID,
                _a[1056] = message.EProcessType.PROCESS_TYPE_FIRST_REWARD,
                _a[1057] = message.EProcessType.PROCESS_TYPE_XUYUAN,
                _a[1058] = message.EProcessType.PROCESS_TYPE_MISSION_ONE,
                _a[1059] = message.EProcessType.PROCESS_TYPE_MISSION_TWO,
                _a[1060] = message.EProcessType.PROCESS_TYPE_MISSION_MAQI,
                _a[1061] = message.EProcessType.PROCESS_TYPE_MISSION_KUBI,
                _a[1062] = message.EProcessType.PROCESS_TYPE_INSTANCE_POWER,
                _a[1063] = message.EProcessType.PROCESS_TYPE_MISSION_WEEK // 周任务显示进程
            ,
                _a);
            var _a;
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        // 初始化系统
        PlayerProgressesSystem.prototype.init = function () {
            // this.getprogressMap();
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_PROGRESS_INFO_CHANGE, this.onMixUnitInfoChange, this);
        };
        PlayerProgressesSystem.prototype.uninit = function () {
            this.progressInfo = [];
            this.progressMap = [];
        };
        PlayerProgressesSystem.prototype.setProcesses = function () {
            if (!this.progressInfo)
                return;
            var time = Math.floor(egret.getTimer() / 1000);
            for (var _i = 0, _a = this.progressInfo; _i < _a.length; _i++) {
                var v = _a[_i];
                v.leftTime = v.leftTime + time;
            }
        };
        PlayerProgressesSystem.prototype.onMixUnitInfoChange = function (ev) {
            this.progressInfo = ev.data;
            this.getprogressMap();
            if (this.progressInfo.length <= 0)
                return;
            // this.setProcesses();
            for (var k in this.progressInfo) {
                var v = this.progressInfo[k];
                //if (!this.progressMap[v.type]) {
                //    this.progressMap[v.type] = v;
                //} else if (v.type == this.progressMap[v.type].type) {
                this.progressMap[v.type] = v;
                if (v.type == message.EProcessType.PROCESS_TYPE_XUYUAN) {
                    this.progressTime1057 = new Date().getTime() + v.leftTime * 1000;
                }
                //}
            }
        };
        PlayerProgressesSystem.prototype.getprogressMap = function () {
            for (var k in this.newEProcessType) {
                var v = this.newEProcessType[k];
                if (v != message.EProcessType.PROCESS_TYPE_NONO) {
                    var prog = new message.ProgressInfo;
                    prog.type = Number(k);
                    if (!this.progressMap[k]) {
                        this.progressMap[k] = prog;
                    }
                }
            }
        };
        //刷新普通商店
        PlayerProgressesSystem.ReqRefresh = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MallListRefreshRequest();
                request.body.type = type;
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
        //购买商品
        PlayerProgressesSystem.ReqBuy = function (type, mallId, count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MallBuyRequest();
                request.body.type = type;
                request.body.mallId = mallId;
                request.body.count = count;
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
        //获取各个类型商店的数据
        PlayerProgressesSystem.ReqGain = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MallListRequest();
                request.body.type = type;
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
        // 验证倒计时
        PlayerProgressesSystem.prototype.checkProcess = function (types) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CheckProcessRequest();
                request.body.types = types;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    for (var i in response.body.processes) {
                        for (var j in _this.progressInfo) {
                            if (_this.progressInfo[j].type == response.body.processes[i].type) {
                                _this.progressInfo[j] = response.body.processes[i];
                                break;
                            }
                        }
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerProgressesSystem;
    }());
    zj.PlayerProgressesSystem = PlayerProgressesSystem;
    __reflect(PlayerProgressesSystem.prototype, "zj.PlayerProgressesSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerProgressesSystem.js.map