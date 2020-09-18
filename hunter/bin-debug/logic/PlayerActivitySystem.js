var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 活动
    // yuqingchao
    // 20190322
    var PlayerActivitySystem = (function () {
        function PlayerActivitySystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            this.shareInfo = [];
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.activities = []; // 所有活动信息(不覆盖)
        }
        PlayerActivitySystem.Decompress = function (data) {
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(data, para);
            return inflate.decompress();
        };
        // 解压 ActivityInfoZip 信息
        PlayerActivitySystem.DecompressActivityInfoZip = function (data) {
            if (data.length == 0)
                return null;
            var plain = PlayerActivitySystem.Decompress(data);
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var activityInfoZip = new message.ActivityInfoZip();
            if (!activityInfoZip.parse_bytes(decoder)) {
                zj.toast("decompress fail");
                return null;
            }
            return activityInfoZip;
        };
        PlayerActivitySystem.GetActivityUI = function () {
            var data = [];
            var arr = zj.Game.PlayerActivitySystem.Activities;
            for (var k in zj.Game.PlayerActivitySystem.Activities) {
                var v = zj.Game.PlayerActivitySystem.Activities[k];
                if (v.stopTime > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    if (v.type == message.ActivityType.ACT_TYPE_UPLEVEL //冲级
                        || v.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN //连续七天登陆
                        || v.type == message.ActivityType.ACT_TYPE_BUFFS //BUFF
                        || v.type == message.ActivityType.ACT_TYPE_OTHER //线下活动
                        || v.type == message.ActivityType.ACT_TYPE_ADVERTISEMENT //广告
                        || v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING //酒馆积分
                        || v.type == message.ActivityType.ACT_TYPE_CHARGEDAILY //每日充值
                        || v.type == message.ActivityType.ACT_TYPE_RED_PACKET //红包活动
                        || v.type == message.ActivityType.ACT_TYPE_INSTANCE_RAND //随机副本(鼠崽闹春)
                    ) {
                        data.push(v);
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MISSION) {
                        if (v.rewardIndex.length != v.missions.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CHARGEADD) {
                        if (v.rankRewards.length != v.rewardZone.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_COLLECT) {
                        var _loop_1 = function (kk) {
                            var vv = v.exchanges[kk];
                            var bIsGet = zj.Table.FindF(v.kvInfos, function (key, vvv) {
                                //已兑换完
                                return vvv.key == vv.index && vvv.value >= vv.exchangeCount;
                            });
                            if (!bIsGet) {
                                data.push(v);
                                return "break";
                            }
                        };
                        for (var kk in v.exchanges) {
                            var state_1 = _loop_1(kk);
                            if (state_1 === "break")
                                break;
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MONTHFIT) {
                        var reward_has_get = zj.Table.FindF(v.rewardIndex, function (_k, _v) {
                            return _v == 1;
                        });
                        if (!reward_has_get) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CONSUME) {
                        if (v.rewardIndex.length != v.rewardZone.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_END) {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length != v.rewardZone.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {
                        data.push(v);
                    }
                }
            }
            return data;
        };
        /**
         * 检测是否需要弹出红包
         */
        PlayerActivitySystem.prototype.checkShowRedPackage = function () {
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET]; // 红包进程信息
            var info = zj.Activity_redWarsDialogMain.returnAwardNums(); // 奖励数量 超越人数 当前红包是否领取
            var redPackageInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
            })[0];
            var redPackageTime = zj.Game.Controller.Activity_redpackage_countdown - zj.Game.Controller.curServerTime; // 红包开始后倒计时
            if (!redPackageInfo || progress.leftTime == 0)
                return false;
            for (var key in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab.hasOwnProperty(key)) {
                    var element = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab[key];
                    if (element.key == progress.info) {
                        zj.Activity_redWarsDialogMain.showRedPackageMap[progress.info] = progress.info;
                    }
                }
            }
            var isShow = redPackageInfo != null && zj.Game.Controller.curServerTime > redPackageInfo.openTime && zj.Game.Controller.curServerTime < redPackageInfo.closeTime && redPackageTime > 0;
            if (isShow && info[2] == zj.RED_PACKAGE.UNDONE && zj.Activity_redWarsDialogMain.showRedPackageMap[progress.info] == null && !zj.Teach.teachingNow && zj.Game.PlayerInfoSystem.BaseInfo.level >= 10) {
                zj.Activity_redWarsDialogMain.showRedPackageMap[progress.info] = progress.info;
                return true;
            }
            return false;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerActivitySystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, this.onActivityInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.onLoginGameOK, this);
        };
        PlayerActivitySystem.prototype.uninit = function () {
            this.activities = [];
        };
        PlayerActivitySystem.prototype.onActivityInfoChange = function (ev) {
            var activities = ev.data;
            var _loop_2 = function (v) {
                var _a = zj.Table.FindR(this_1.activities, function (kk, vv) {
                    return (vv.type == v.type && vv.index == v.index);
                }), info = _a[0], index = _a[1];
                if (info != null && index != null) {
                    this_1.activities[index] = v;
                }
                else {
                    this_1.activities.push(v);
                }
            };
            var this_1 = this;
            for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                var v = activities_1[_i];
                _loop_2(v);
            }
        };
        Object.defineProperty(PlayerActivitySystem.prototype, "Activities", {
            get: function () {
                return this.activities;
            },
            enumerable: true,
            configurable: true
        });
        PlayerActivitySystem.prototype.onLoginGameOK = function () {
            console.log("受邀请查询");
            var shareID = zj.Controller.getGlobalStorageItem("shareID");
            var shareRoleID = Number(zj.Game.Controller.shareRoleID());
            if (shareRoleID == 0) {
                if (shareID && shareID.length > 0) {
                    zj.Game.PlayerActivitySystem.QueryShareInfo(shareID).then(function (data) {
                        var roleId = parseInt(data.user_data);
                        if (!roleId)
                            roleId = 0;
                        if (roleId != 0)
                            zj.Game.PlayerActivitySystem.ShareRelation(roleId).then(function () {
                                zj.Controller.removeGlobalStorageItem("shareID");
                            }).catch(function () { });
                    });
                }
            }
        };
        // 每日领取体力
        PlayerActivitySystem.prototype.recievePower = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RecievePowerRequest();
                request.body.index = index;
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
                }, _this, false, true);
            });
        };
        // 领取升级奖励
        PlayerActivitySystem.prototype.upLevelReward = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UpLevelRewardRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        //
        PlayerActivitySystem.prototype.activityReward = function (type, index, rewardIndex, is_gift) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ActivityRewardRequest();
                request.body.type = type;
                request.body.index = index;
                request.body.rewardIndex = rewardIndex;
                request.body.is_gift = is_gift;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        //查看奖励名单
        PlayerActivitySystem.prototype.upLevelRankReward = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UpLevelRankRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.rankItem);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        //
        PlayerActivitySystem.prototype.queryActivitysReward = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryActivitysRequest();
                request.body.type = type;
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
                }, _this, false);
            });
        };
        //
        PlayerActivitySystem.prototype.sPgeneralReward = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SPgeneralRewardRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        PlayerActivitySystem.prototype.queryActivitys = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryActivitysRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    // update activities
                    var activityInfoZip = PlayerActivitySystem.DecompressActivityInfoZip(response.body.activities);
                    _this.activities = activityInfoZip.activities;
                    resolve(activityInfoZip.activities);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        PlayerActivitySystem.prototype.ShareTaskReward = function (type, count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareTaskRewardRequest();
                request.body.type = type;
                request.body.count = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        PlayerActivitySystem.prototype.ShareUrl = function (share_url) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareUrlRequest();
                request.body.share_url = share_url;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        PlayerActivitySystem.prototype.PublishShareInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var data = new message.PublishShareInfoReqBody();
                data.device_info = zj.Util.getDeviceInfo();
                data.version_info = zj.Util.getAppVersionInfo();
                data.user_data = zj.Game.Controller.roleID().toString();
                var body = JSON.stringify(data);
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.setRequestHeader("Content-Type", "application/json");
                request.open(zj.AppConfig.ApiUrlRoot + "/api/publish_share_info.do", egret.HttpMethod.POST);
                request.send(body);
                request.addEventListener(egret.Event.COMPLETE, function (event) {
                    var request = event.currentTarget;
                    var json = JSON.parse(request.response);
                    if (json.retcode != 0) {
                        reject(json.retcode);
                        return;
                    }
                    var response = json.body;
                    resolve(response);
                }, _this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    reject(-1);
                }, _this);
            });
        };
        PlayerActivitySystem.prototype.QueryShareInfo = function (shareID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var data = new message.QueryShareInfoReqBody();
                data.device_info = zj.Util.getDeviceInfo();
                data.version_info = zj.Util.getAppVersionInfo();
                data.code = "/share/" + shareID;
                var body = JSON.stringify(data);
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.setRequestHeader("Content-Type", "application/json");
                request.open(zj.AppConfig.ApiUrlRoot + "/api/query_share_info.do", egret.HttpMethod.POST);
                request.send(body);
                request.addEventListener(egret.Event.COMPLETE, function (event) {
                    var request = event.currentTarget;
                    var json = JSON.parse(request.response);
                    if (json.retcode != 0) {
                        reject(json.retcode);
                        return;
                    }
                    var response = json.body;
                    resolve(response);
                }, _this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    reject(-1);
                }, _this);
            });
        };
        PlayerActivitySystem.prototype.ShareRelation = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareRelationRequest();
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, true);
            });
        };
        /**
         * 领取在线时长奖励协议
         *
         * @param {index} number 在线时长奖励索引(从1开始)
         */
        PlayerActivitySystem.prototype.OnlineTimeRewardReq = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.OnlineTimeRewardRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        PlayerActivitySystem.activityBattleCurPos = -1;
        return PlayerActivitySystem;
    }());
    zj.PlayerActivitySystem = PlayerActivitySystem;
    __reflect(PlayerActivitySystem.prototype, "zj.PlayerActivitySystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerActivitySystem.js.map