var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 黑暗大陆系统
    // hexiaowei 创建于2019.03.05
    // 对应darkdb
    var PlayerDarkSystem = (function () {
        function PlayerDarkSystem() {
        }
        PlayerDarkSystem.RelicInstance = function (mapid) {
            return zj.TableInstanceRelic.Item(mapid);
        };
        PlayerDarkSystem.RelicInstanceChest = function (chestId) {
            return zj.TableInstanceRelicChest.Item(chestId);
        };
        PlayerDarkSystem.GetRelicAwardByType = function (curHard, mainType) {
            var awardTbl = PlayerDarkSystem.RelicInstance(curHard);
            var maxStar = awardTbl.max_step;
            var allGoods = [];
            if (mainType == 1) {
                for (var i = 0; i < awardTbl.relic_goods_client.length; i++) {
                    var goods = new message.GoodsInfo;
                    //goods.def = null;
                    goods.goodsId = awardTbl.relic_goods_client[i];
                    goods.count = 0;
                    goods.showType = 1;
                    allGoods.push(goods);
                }
            }
            else if (mainType == 2) {
                for (var i = 0; i < maxStar; i++) {
                    var goods = new message.GoodsInfo;
                    //goods.def = null
                    goods.goodsId = awardTbl.first_rewards[i][0];
                    goods.count = awardTbl.first_rewards[i][1];
                    goods.showType = 1;
                    allGoods.push(goods);
                }
            }
            return allGoods;
        };
        PlayerDarkSystem.GetLevelByHurt = function (hard, hurt) {
            var instanceTbl = PlayerDarkSystem.RelicInstance(hard);
            var level = 1;
            for (var k in instanceTbl.damage_zone) {
                var v = instanceTbl.damage_zone[k];
                if (hurt >= v) {
                    level = Number(k);
                }
            }
            return level;
        };
        PlayerDarkSystem.CanOpenByRelicId = function (relicId) {
            var chestTbl = [];
            var relicInfo = PlayerDarkSystem.RelicInstance(relicId);
            for (var i = 0; i < relicInfo.open_chest.length; i++) {
                if (PlayerDarkSystem.CanOpenByChestId(relicInfo.open_chest[i])[0]) {
                    chestTbl.push(relicInfo.open_chest[i]);
                }
            }
            return chestTbl;
        };
        PlayerDarkSystem.CanOpenByChestId = function (chestId) {
            var chestInfo = PlayerDarkSystem.RelicInstanceChest(chestId);
            var canOpen = false;
            var bGet = true;
            var freeTime = zj.Table.Count(chestInfo.price, function (k, v) {
                var count = v == 0 ? 1 : 0;
                return count;
            });
            var m = zj.Game.PlayerInstanceSystem.RelicChest;
            var chestOpenInfo = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicChest, function (_k, _v) {
                return _v.key == chestId;
            });
            if (chestOpenInfo[0] != null) {
                if (freeTime > chestOpenInfo[0].value) {
                    canOpen = true;
                }
            }
            else {
                bGet = false;
            }
            return [canOpen, bGet];
        };
        PlayerDarkSystem.LastChallengeTime = function (relicId) {
            var relicTbl = PlayerDarkSystem.RelicInstance(relicId);
            var date = zj.Game.Controller.serverNow();
            var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 4, date.getMinutes(), date.getSeconds()));
            var wDay = humanDate.getDay();
            if (wDay == 0) {
                wDay = 7;
            }
            else {
                wDay = wDay;
            }
            if (zj.Table.VIn(relicTbl.open_day, wDay)) {
                var allTime = zj.CommonConfig.relic_max_battle_time;
                var userTime = 0;
                var useInfo = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicBattleTimes, function (k, v) {
                    return v.key == relicId;
                });
                if (useInfo[0] != null) {
                    userTime = useInfo[0].value;
                }
                return allTime - userTime;
            }
            else {
                return 0;
            }
        };
        PlayerDarkSystem.PortOpenTime = function () {
            var bOpen = false;
            var lastTime = 0;
            var currentTime = zj.Game.Controller.serverNow();
            var currentSecond = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
            var timePart = [];
            for (var i = 0; i < zj.CommonConfig.port_open_time.length; i++) {
                for (var j = 0; j < 2; j++) {
                    var timeDiff = zj.CommonConfig.port_open_time[i][j] - currentSecond;
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
                lastTime = (86400 - currentSecond) + zj.CommonConfig.port_open_time[0][0];
            }
            return [bOpen, lastTime];
        };
        //遗迹探索排行帮
        PlayerDarkSystem.GetServerRankInfo = function (relicId, rankType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelicRankInfoRequest();
                request.body.rank_type = rankType;
                request.body.instead_type = relicId;
                request.body.start = 0;
                request.body.num = zj.CommonConfig.rank_list_max - 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        //晶石商店信息
        PlayerDarkSystem.reqMall = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MallListRequest();
                request.body.type = 7;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //验证倒计时请求
        PlayerDarkSystem.ReqProcess = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CheckProcessRequest();
                request.body.types = [message.EProcessType.PROCESS_TYPE_MALL_RELIC];
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 贪婪之岛 -- 港口
        PlayerDarkSystem.SceneQueryScoreRankReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneQueryScoreRankRequest();
                request.body.get_all = false;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        PlayerDarkSystem.SetFormationReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetFormationRequest();
                var formation = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
                formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
                request.body.formations.push(formation);
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        PlayerDarkSystem.prototype.SceneEnterRespBody = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneEnterRequest();
                request.body.id = 0;
                // Player:willGoRpg();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    _this.enterScene(response);
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
        PlayerDarkSystem.prototype.enterScene = function (data) {
            var msg = data.body;
            msg.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - msg.roleInfo.posInfo.posItem.scene_y;
            zj.Game.PlayerWonderLandSystem.darkland.roleInfo = msg.roleInfo;
            zj.Game.PlayerWonderLandSystem.loadRpgScenePos(msg.posInfos);
            zj.Game.PlayerWonderLandSystem.darkland.inDarkland = true;
            zj.Game.PlayerWonderLandSystem.darkland.serverSceneId = msg.sceneId;
            zj.Game.PlayerWonderLandSystem.darkland.channelId = msg.sceneId;
            zj.Game.PlayerWonderLandSystem.darkland.cityId = msg.cityId;
            zj.Game.PlayerWonderLandSystem.darkland.cityServerInfo = msg.group_name;
        };
        return PlayerDarkSystem;
    }());
    zj.PlayerDarkSystem = PlayerDarkSystem;
    __reflect(PlayerDarkSystem.prototype, "zj.PlayerDarkSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerDarkSystem.js.map