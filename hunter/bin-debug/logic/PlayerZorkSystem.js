var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerZorkSystem = (function () {
        function PlayerZorkSystem() {
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.zorkBoss = {
                inZorkBoss: false,
                isZorkBossEnd: false,
                serverSceneId: 0,
                bossInfo: new message.BossInfo(),
                roleInfo: {},
                chatInfosMini: [],
                bChatAdd: false,
                rankItems: [],
                resultInfo: {},
                myRank: 0,
            };
            this.zork = {
                playersMap: {},
                timePlayersMap: {},
                chatInfosMini: {},
                bChatAdd: false,
                roleInfo: new message.BossRoleInfo()
            };
        }
        // 静态函数
        PlayerZorkSystem.GetWonderlandBossRankGoodsTbl = function (level) {
            if (level == null) {
                level = 40;
            }
            var tblWonderBossRank = zj.TableSceneBossReward.Table(); //魔域BOSS伤害统计表
            var tbl = {};
            var index = 0;
            for (var k in tblWonderBossRank) {
                var v = tblWonderBossRank[k];
                var goods = [];
                if (level <= v.bosslevel_max && level >= v.bosslevel_min) {
                    var l_reward = [];
                    var length_1 = Object.keys(v.reward_goods).length;
                    for (var j = 0; j < length_1; j++) {
                        goods[j] = [];
                        var good = new message.GoodsInfo();
                        good.goodsId = tblWonderBossRank[k].reward_goods[j];
                        good.count = tblWonderBossRank[k].reward_count[j];
                        goods[j] = good;
                    }
                    l_reward.push(v.rank_min + 1);
                    l_reward.push(v.rank_max);
                    l_reward.push(goods);
                    var a = l_reward;
                    tbl[index] = l_reward;
                    index = index + 1;
                }
            }
            return tbl;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerZorkSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, this.sceneBossResult, this);
        };
        PlayerZorkSystem.prototype.sceneBossResult = function (e) {
            var request = e.data;
            this.zorkBoss.isZorkBossEnd = true;
            this.zorkBoss.resultInfo = request.body;
            this.zorkBoss.rankItems = request.body.items;
            zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS] = request.body.progresses[0];
        };
        PlayerZorkSystem.randomHead = function () {
            var heroTbl = zj.TableBaseGeneral.Table();
            var idTbl = [];
            for (var k in heroTbl) {
                var v = heroTbl[k];
                idTbl.push(v.general_id);
            }
            idTbl.sort(function (a, b) {
                return a - b;
            });
            var leftTbl = [];
            var rightTbl = [];
            for (var i = 0; i < 12; i++) {
                var id = Math.floor(Math.random() * idTbl.length);
                if (i <= 5) {
                    leftTbl.push(idTbl[id]);
                }
                else {
                    rightTbl.push(idTbl[id]);
                }
                idTbl.splice(id, 1);
            }
            return [leftTbl, rightTbl];
        };
        PlayerZorkSystem.RewardLevel = function (index) {
            if (index == null) {
                index == 0;
            }
            var tblReward = zj.TableRunes.Table();
            if (tblReward == null) {
                return;
            }
            var tbl = [];
            var goods = [];
            for (var kk in tblReward[index].reward_goods) {
                var vv = tblReward[index].reward_goods[kk];
                goods[kk] = [];
                var good = new message.GoodsInfo();
                good.goodsId = tblReward[index].reward_goods[kk];
                good.count = tblReward[index].reward_count[kk] > 0 && tblReward[index].reward_count[kk] || 0;
                goods[kk] = good;
            }
            tbl = goods;
            return tbl;
        };
        PlayerZorkSystem.RunesAllGoods = function () {
            var tblReward = zj.TableRunes.Table();
            if (tblReward == null) {
                return;
            }
            var tbl = [];
            var max = zj.CommonConfig.gain_runes_number;
            var num = 0;
            for (var i = 0; i < max; i++) {
                var goods = [];
                var id = max - num;
                tbl[i] = [];
                for (var kk in tblReward[id].reward_goods) {
                    var vv = tblReward[id].reward_goods[kk];
                    goods[kk] = [];
                    var good = new message.GoodsInfo();
                    good.goodsId = tblReward[id].reward_goods[kk];
                    good.count = tblReward[id].reward_count[kk] > 0 && tblReward[id].reward_count[kk] || 0;
                    goods[kk] = good;
                }
                tbl[i] = goods;
                num = num + 1;
            }
            return tbl;
        };
        PlayerZorkSystem.prototype.uninit = function () {
            this.zorkBoss = {
                inZorkBoss: false,
                isZorkBossEnd: false,
                serverSceneId: 0,
                bossInfo: new message.BossInfo(),
                roleInfo: [],
                chatInfosMini: [],
                bChatAdd: false,
                rankItems: [],
                resultInfo: {},
                myRank: 0,
            };
            this.zork = {
                playersMap: {},
                timePlayersMap: {},
                chatInfosMini: {},
                bChatAdd: false,
                roleInfo: new message.BossRoleInfo()
            };
        };
        /**关闭世界boss */
        PlayerZorkSystem.prototype.closeZorkBoss = function (callback, thisObj) {
            zj.Game.PlayerZorkSystem.BossExitReq()
                .then(function (value) {
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                zj.StageSceneManager.Instance.clearScene();
                zj.Game.PlayerZorkSystem.zorkBoss.inZorkBoss = false;
                callback.call(thisObj);
            })
                .catch(function (reason) {
            });
        };
        // 拉取boss信息
        PlayerZorkSystem.prototype.bossInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BossInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    _this.zorkBoss.bossInfo = response.body.bossInfo;
                    _this.zorkBoss.rankItems = response.body.items;
                    zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS] = response.body.progresses[0];
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, true, false);
            });
        };
        // 进入boss界面
        PlayerZorkSystem.prototype.bossEntry = function (scene_x, scene_y) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                zj.PlayerWonderLandSystem.MapHeight = 960;
                var request = new message.BossEntryRequest();
                request.body.scene_x = scene_x;
                request.body.scene_y = scene_y;
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.PlayerWonderLandSystem.MapHeight = 960;
                    response.body.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
                    _this.zorkBoss.inZorkBoss = true;
                    _this.zorkBoss.roleInfo = response.body.roleInfo;
                    _this.zorkBoss.serverSceneId = response.body.sceneId;
                    zj.Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 伤害排行
        PlayerZorkSystem.prototype.bossRank = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BossRankRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.zorkBoss.rankItems = response.body.items;
                    _this.zorkBoss.myRank = response.body.rank;
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, true, false);
            });
        };
        PlayerZorkSystem.GainRunesReqBody_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GainRunesRequest();
                request.body.isNovice = zj.Teach.bInTeaching && zj.Teach.m_bOpenTeach;
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
        PlayerZorkSystem.RunesRewardReqBody_Visit = function (isget) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RunesRewardRequest();
                request.body.isNovice = isget;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    // if (response.header.result != 0) {
                    //     return;
                    // }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerZorkSystem.ChangeRunesReqBody_Visit = function (bteach) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ChangeRunesRequest();
                request.body.isNovice = (bteach);
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
        PlayerZorkSystem.prototype.BossExitReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BossExitRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerZorkSystem.moraFormatEnemy = [];
        PlayerZorkSystem.moraFormatMy = [];
        return PlayerZorkSystem;
    }());
    zj.PlayerZorkSystem = PlayerZorkSystem;
    __reflect(PlayerZorkSystem.prototype, "zj.PlayerZorkSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerZorkSystem.js.map