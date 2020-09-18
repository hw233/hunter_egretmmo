var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerBossSystem = (function () {
        function PlayerBossSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.ActivityBoss = {
                inZorkBoss: false,
                isZorkBossEnd: false,
                serverSceneId: 0,
                cityId: 0,
                bossInfo: new message.BossInfo(),
                roleInfo: {},
                chatInfosMini: [],
                bChatAdd: false,
                rankItems: [],
                groupName: null,
                resultInfo: {},
                myRank: 0,
                bossId: 0,
                tips: 3,
            };
        }
        //////////////////////////////////////////////////////////////////////////
        //成员方法
        PlayerBossSystem.prototype.uninit = function () {
            this.ActivityBoss = {
                inZorkBoss: false,
                isZorkBossEnd: false,
                serverSceneId: 0,
                cityId: 0,
                bossInfo: new message.BossInfo(),
                roleInfo: {},
                chatInfosMini: [],
                bChatAdd: false,
                rankItems: [],
                groupName: null,
                resultInfo: {},
                myRank: 0,
                bossId: 0,
                tips: 3,
            };
        };
        PlayerBossSystem.prototype.GetBossRankGoodsTbl = function () {
            var tblWonderBossRanks = [];
            var a = zj.Game.PlayerActivitySystem.Activities;
            for (var kk in zj.Game.PlayerActivitySystem.Activities) {
                var vv = zj.Game.PlayerActivitySystem.Activities[kk];
                if (vv.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {
                    tblWonderBossRanks = vv.rankRewards;
                    this.ActivityBoss.bossId = vv.buffValue;
                }
            }
            return tblWonderBossRanks;
        };
        /**
         * 活动BOSS开启时间，结束时间；
         * 返回值 [bOpen:boolean,lastTime:number]
        */
        PlayerBossSystem.prototype.ActivityBossOpenTime = function () {
            var bOpen = false;
            var lastTime = 0;
            var curTime = zj.Game.Controller.serverNow();
            var curSec = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
            var timePart = [];
            for (var i = 0; i < zj.CommonConfig.darkland_boss_open_time.length; i++) {
                for (var j = 0; j < 2; j++) {
                    var timeDiff = zj.CommonConfig.darkland_boss_open_time[i][j] - curSec;
                    if (timeDiff > 0) {
                        timePart.push([j, timeDiff]);
                    }
                }
            }
            timePart.sort(function (a, b) {
                return a[1] - b[1];
            });
            if (timePart[0] != null) {
                bOpen = !(timePart[0][0] == 0);
                lastTime = timePart[0][1];
            }
            else {
                bOpen = false;
                lastTime = (86400 - curSec) + zj.CommonConfig.darkland_boss_open_time[0][0];
            }
            return [bOpen, lastTime];
        };
        /**
         * 活动开启前5分钟/结束后5分钟
         * 返回值 IsStart：开始前（boolean）;
         *        IsOver：结束后（boolean）;
         *        StartFive：number;
         *        300- OverFive：number;
         */
        PlayerBossSystem.prototype.ActivityBossIsFive = function () {
            var battleNum = 0;
            var curTime = zj.Game.Controller.serverNow();
            var curSec = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
            var IsStart = false;
            var IsOver = false;
            var a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime.length == 0) {
                battleNum = 0;
            }
            else if (curSec - zj.CommonConfig.darkland_boss_open_time[0][1] > zj.CommonConfig.darkland_boss_coming_minute * 60) {
                battleNum = 1;
            }
            else {
                battleNum = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime[0].key - 1;
            }
            var StartFive = zj.CommonConfig.darkland_boss_open_time[battleNum][0] - curSec;
            var OverFive = curSec - zj.CommonConfig.darkland_boss_open_time[battleNum][1];
            //开始前5分钟
            if (StartFive < 300 && StartFive > 0) {
                IsStart = true;
            }
            //结束后5分钟
            if (OverFive <= 300 && OverFive > 0) {
                IsOver = true;
            }
            return [IsStart, IsOver, StartFive, 300 - OverFive];
        };
        PlayerBossSystem.prototype.GetBossActivityOpen = function () {
            for (var kk in zj.Game.PlayerActivitySystem.Activities) {
                var vv = zj.Game.PlayerActivitySystem.Activities[kk];
                if (vv.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {
                    return true;
                }
            }
            return false;
        };
        /**关闭活动BOSS */
        PlayerBossSystem.prototype.closeActivityBoss = function () {
            zj.Game.PlayerBossSystem.DarklandBossLeave().then(function () {
                zj.StageSceneManager.Instance.clearScene();
                zj.Game.PlayerBossSystem.ActivityBoss.inZorkBoss = false;
            }).catch(function (reason) { });
        };
        /**************************网络协议*******************/
        /**
         * 进入活动BOSS活动场景
        */
        PlayerBossSystem.prototype.darklandBossScoreRank = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.DarklandBossScoreRankRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.ActivityBoss.myRank = response.body.self_rank.rank;
                    _this.ActivityBoss.rankItems = response.body.ranks;
                    resolve(response);
                }, function (req) {
                    console.log("req:", req);
                    reject(zj.LANG("请求超时"));
                }, _this, true);
            });
        };
        /**
         * 积分加成激励
         */
        PlayerBossSystem.prototype.DarklandBossInspire = function (inspireType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.DarklandBossInspireRequest();
                request.body.inspireType = inspireType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject(zj.LANG("请求超时"));
                }, _this, false, false);
            });
        };
        /**
         * 退出场景
         */
        PlayerBossSystem.prototype.DarklandBossLeave = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.DarklandBossLeaveRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject(zj.LANG("请求超时"));
                }, _this, false, false);
            });
        };
        PlayerBossSystem.prototype.DarklandBossEnter = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.DarklandBossEnterRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.PlayerWonderLandSystem.MapHeight = 960;
                    response.body.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
                    _this.ActivityBoss.roleInfo = response.body.roleInfo;
                    _this.ActivityBoss.cityId = response.body.cityId;
                    _this.ActivityBoss.groupName = response.body.group_name;
                    _this.ActivityBoss.inZorkBoss = true;
                    zj.Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject(zj.LANG("请求超时"));
                }, _this, false, false);
            });
        };
        return PlayerBossSystem;
    }());
    zj.PlayerBossSystem = PlayerBossSystem;
    __reflect(PlayerBossSystem.prototype, "zj.PlayerBossSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerBossSystem.js.map