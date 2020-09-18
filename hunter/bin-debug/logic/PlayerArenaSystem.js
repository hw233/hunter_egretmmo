var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author chen xi
     *
     * @date 2019-126
     *
     * @class 猎人格斗场系统
     */
    var PlayerArenaSystem = (function () {
        function PlayerArenaSystem() {
            this._singleTimmer = { last_time: -1, timmer: null };
        }
        PlayerArenaSystem.prototype.init = function () {
        };
        PlayerArenaSystem.prototype.uninit = function () {
        };
        /** 天梯挑战列表(刷新) */
        PlayerArenaSystem.prototype.ladderList = function (vis) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderListRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var data = response.body.ladders;
                    resolve(data);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, vis);
            });
        };
        /** 天梯挑战请求 */
        PlayerArenaSystem.prototype.ladderBattle = function (sequence, roleId, battleInfo) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderBattleRequest();
                request.body.sequence = sequence;
                request.body.roleId = roleId;
                request.body.battleInfo = battleInfo;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /** 天梯快速挑战请求 */
        PlayerArenaSystem.prototype.ladderQuickReward = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderQuickRewardRequest();
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo.getGoods);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /** 天梯挑战次数增加请求 */
        PlayerArenaSystem.prototype.ladderChallengeAdd = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderChallengeAddRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.header.result);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false, true);
            });
        };
        /** 天梯清除冷却请求 */
        PlayerArenaSystem.prototype.ladderCollingClear = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderCoolingClearRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 排行信息
         * @param type 排行类型
         * @param start 排名起始下标
         * @param num 请求数量(最多rank_list_max个)
         *
         * @description RankItemsZip
         */
        PlayerArenaSystem.prototype.rankItemInfo = function (type, start, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RankItemInfoRequest();
                request.body.type = type;
                request.body.start = start;
                request.body.num = num;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 解压RankItemsZip 信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.itemsZip, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.RankItemsZip();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 进跨服判断
         *
         * @param isRefresh // 是否是更换对手
         */
        PlayerArenaSystem.prototype.craftQureyList = function (isRefresh) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftQueryListRequest();
                request.body.is_refresh = isRefresh;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.index);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 跨服排行
         *
         * @param type 0-当前排行; 1-昨日排行; 2-天下第一; 3-本服当前排名; 4-本服上轮排名
         */
        PlayerArenaSystem.prototype.craftRankList = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftRankListRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 解压CraftRoleInfoChunk 信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.roles, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.CraftRoleInfoChunk();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items.roles);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 本服战斗
         *
         * @param type 邮件类别
         */
        PlayerArenaSystem.prototype.getMailList = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetMailListRequest();
                request.body.box_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    if (response.body.mails.length != 0) {
                        // 解压MailInfoZip 信息
                        var para = {};
                        para["index"] = 4;
                        var inflate = new Zlib.Inflate(response.body.mails, para);
                        var plain = inflate.decompress();
                        var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                        var items = new message.MailInfoZip();
                        if (!items.parse_bytes(decoder)) {
                            zj.toast(zj.LANG("游戏数据解析失败"));
                            return;
                        }
                        resolve([response.body.mailBoxs, items.mails]);
                    }
                    else {
                        resolve([response.body.mailBoxs, []]);
                    }
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 本服战斗战报
         *
         * @param type 邮件类别
         * @param ids 邮件ID
         */
        PlayerArenaSystem.prototype.getMailDetail = function (type, ids) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetMailDetailRequest();
                request.body.box_type = type;
                request.body.mailIds = ids;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 跨服排行世界精英
         */
        PlayerArenaSystem.prototype.craftElitesRankList = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftElitesRankListRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 解压CraftElitesListChunk 信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.items, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.CraftElitesListChunk();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items.items);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 跨服主界面
         * @param is_refresh 是否是更换对手
         */
        PlayerArenaSystem.prototype.craftQueryList = function (is_refresh) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftQueryListRequest();
                request.body.is_refresh = is_refresh;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 跨服增加挑战次数
         * @param
         */
        PlayerArenaSystem.prototype.craftBuyTime = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftBuyTimeRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
            });
        };
        PlayerArenaSystem.prototype.relationAdd = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationAddRequest();
                request.body.type = message.ERelationType.RELATION_TYPE_FRIEND;
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /** 加入联盟请求 */
        PlayerArenaSystem.prototype.leagueApply = function (leagueId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueApplyRequest();
                request.body.leagueid = leagueId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 跨服查看战报请求
         * @param info 信息
         */
        PlayerArenaSystem.prototype.queryBattle = function (war_id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryBattleRequest();
                request.body.battle_id = war_id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var item;
                    // 解压MultiResultInfo 信息
                    if (response.body.battleData.battleType == 16 || response.body.battleData.battleType == 22 || response.body.battleData.battleType == 23) {
                        var decoder = new aone.BinaryDecoder(new Uint8Array(response.body.battleData.battleData));
                        var items = new message.MultiResultInfo();
                        if (!items.parse_bytes(decoder)) {
                            zj.toast(zj.LANG("游戏数据解析失败"));
                            return;
                        }
                        item = response.body.battleData.battleData;
                    }
                    else {
                        var para = {};
                        para["index"] = 4;
                        var inflate = new Zlib.Inflate(response.body.battleData.battleData, para);
                        var plain = inflate.decompress();
                        var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                        var items = new message.ReplayBattleInfo();
                        if (!items.parse_bytes(decoder)) {
                            zj.toast(zj.LANG("游戏数据解析失败"));
                            return;
                        }
                        item = items;
                    }
                    // battleType 战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)
                    resolve([response.body.battleData, item]);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
        * 跨服查看战报请求
        * @param roleId
        */
        PlayerArenaSystem.prototype.craftQueryDetail = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CraftQueryDetailRequest();
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    message.QueryRoleInfoResponse;
                    resolve(response.body.formations); //对方阵型信息
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
        * 本服阵型设置请求
        * @param formations // 阵型设置(军师信息不需要设置)
        */
        PlayerArenaSystem.prototype.setFormation = function (formations) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetFormationRequest();
                request.body.formations.push(formations);
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
        * 天梯点赞请求
        * @param rank 排名
        */
        PlayerArenaSystem.prototype.ladderPraiseRank = function (rank) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LadderPraiseRankRequest();
                request.body.rank = rank;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        Object.defineProperty(PlayerArenaSystem.prototype, "singleTimmer", {
            get: function () {
                return this._singleTimmer;
            },
            set: function (v) {
                this._singleTimmer = v;
            },
            enumerable: true,
            configurable: true
        });
        return PlayerArenaSystem;
    }());
    zj.PlayerArenaSystem = PlayerArenaSystem;
    __reflect(PlayerArenaSystem.prototype, "zj.PlayerArenaSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerArenaSystem.js.map