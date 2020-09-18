var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author chen xi
     *
     * @date 2019-1-9
     *
     * @class 通缉令.
     */
    var PlayerWantedSystem = (function () {
        function PlayerWantedSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态方法
            /**挑战次数 */
            this.challengeNumber = 0;
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerWantedSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_WANTED_INFO_CHANGE, this.onWantedInfoChange, this);
        };
        PlayerWantedSystem.prototype.uninit = function () {
            this.wantedInfo_ = null;
            this.wantedCurPos = 0;
            this.wantedBossDifficulty = 0;
            this.wantedBossDifficulty = 0;
        };
        PlayerWantedSystem.prototype.onWantedInfoChange = function (ev) {
            this.wantedInfo_ = ev.data;
        };
        Object.defineProperty(PlayerWantedSystem.prototype, "wantedInfo", {
            get: function () {
                return this.wantedInfo_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWantedSystem.prototype, "ChallengeNumber", {
            get: function () {
                return this.challengeNumber;
            },
            set: function (e) {
                this.challengeNumber = e;
            },
            enumerable: true,
            configurable: true
        });
        PlayerWantedSystem.Instance = function (id) {
            if (id == null || id == -1) {
                return null;
            }
            return zj.TableWanted.Item(id);
        };
        PlayerWantedSystem.EnemyInstance = function (id) {
            if (id == null || id == -1) {
                return null;
            }
            return zj.TableWantedEnemyCamp.Item(id);
        };
        PlayerWantedSystem.GetLimitLevel = function (index) {
            return PlayerWantedSystem.Instance(10000 * index + 1).limit_level;
        };
        PlayerWantedSystem.GetenemyLimitLevel = function (index) {
            //return WantedSystem.EnemyInstance(1000 * index +1).limit_level
        };
        PlayerWantedSystem.GetMobInfo = function (type, index) {
            return PlayerWantedSystem.Instance(10000 * type + index);
        };
        PlayerWantedSystem.GetEnemyMobInfo = function (type, index) {
            return PlayerWantedSystem.EnemyInstance(1000 * type + index);
        };
        PlayerWantedSystem.GetInstanceName = function (index) {
            var main = Math.floor(index / 10000);
            var mission = index % 10000;
            var str = zj.TextsConfig.TextsConfig_Wanted.name[main] + " " + zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Wanted.level, zj.Helper.GetNumCH(mission.toString()));
            return str;
        };
        PlayerWantedSystem.GetEnemyInstanceName = function (index) {
            var main = Math.floor(index / 1000);
            var mission = index % 1000;
            var str = zj.TextsConfig.TextsConfig_Wanted.sname[main] + " " + zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Wanted.level, zj.Helper.GetNumCH(mission.toString()));
            return str;
        };
        PlayerWantedSystem.InstanceMobsFeature = function (id) {
            if (id == null || id == -1) {
                return null;
            }
            return zj.TableClientWantedMobsFeature.Item(id);
        };
        PlayerWantedSystem.DropInstanceItem = function (index) {
            var tbl = zj.TableWantedRand.Table();
            var list1 = [];
            for (var k in tbl) {
                var v = tbl[k];
                if (index == v.type) {
                    for (var kk in v.rand_items) {
                        var vv = v.rand_items[kk];
                        if (zj.Table.FindK(list1, vv) == -1) {
                            list1.push(vv);
                        }
                    }
                }
            }
            var list2 = [];
            for (var k in list1) {
                var v = list1[k];
                var item = zj.TableRandItem.Item(v);
                for (var kk in item.item_ids) {
                    var vv = item.item_ids[kk];
                    var itemSet = zj.PlayerItemSystem.Set(item.item_ids[kk]);
                    var listgood = {
                        goodsId: null,
                        count: null,
                        index: null,
                        quality: null,
                    };
                    listgood.goodsId = item.item_ids[kk];
                    listgood.count = item.item_count[kk];
                    listgood.index = item.index;
                    listgood.quality = itemSet.Info.quality;
                    list2.push(listgood);
                }
            }
            list2.sort(function (a, b) {
                if (a.quality == b.quality) {
                    return a.quality - b.quality;
                }
                else {
                    return b.quality - a.quality;
                }
            });
            return list2;
        };
        PlayerWantedSystem.GetClientDrop = function (index) {
            var static_goods = PlayerWantedSystem.Instance(index).static_goods;
            var prob_goods = PlayerWantedSystem.Instance(index).drop_items;
            var goods = [];
            for (var k in static_goods) {
                var v = static_goods[k];
                var good = new message.GoodsInfo();
                //good.def = null;
                good.goodsId = v[0];
                good.count = v[1];
                goods.push(good);
            }
            for (var k in prob_goods) {
                var v = prob_goods[k];
                var good = new message.GoodsInfo();
                //good.def = null;
                good.goodsId = v;
                good.count = 0;
                goods.push(good);
            }
            return goods;
        };
        PlayerWantedSystem.prototype.GetClientDropHaveCard = function (index) {
            var static_goods = PlayerWantedSystem.Instance(index).static_goods;
            var prob_goods = PlayerWantedSystem.Instance(index).drop_items;
            var goods = [];
            for (var k in static_goods) {
                var v = static_goods[k];
                var itemInfo = zj.PlayerItemSystem.Item(v[0]);
                if (itemInfo.is_card == 1) {
                    return true;
                }
            }
            for (var k in prob_goods) {
                var v = prob_goods[k];
                var itemInfo = zj.PlayerItemSystem.Item(v);
                if (itemInfo.is_card == 1) {
                    return true;
                }
            }
            return false;
        };
        //遍历对应类型最大层
        PlayerWantedSystem.Maxfloor = function (type) {
            var tbl = zj.TableWantedEnemyCamp.Table();
            var maxfloor = 1;
            for (var k in tbl) {
                var v = tbl[k];
                if (v.type == type && v.id % 100 > maxfloor) {
                    maxfloor = v.id % 100;
                }
            }
            return maxfloor + type * 1000;
        };
        PlayerWantedSystem.BossFloorReward = function () {
            var maxBossNum = message.EWantedType.WANTED_TYPE_END - 1;
            var bossFloor = [];
            for (var i = 1; i <= maxBossNum; i++) {
                var currentBossTbl = zj.otherdb.WantedTypeInfo(i);
                var bossFloorInfo = {};
                for (var _i = 0, currentBossTbl_1 = currentBossTbl; _i < currentBossTbl_1.length; _i++) {
                    var v = currentBossTbl_1[_i];
                    if (v.boss_floor == "1") {
                        var good = [];
                        for (var i_1 = 0; i_1 < v.first_reward.length; i_1++) {
                            var goods = new message.GoodsInfo();
                            goods.goodsId = v.first_reward[i_1][0];
                            goods.count = v.first_reward[i_1][1];
                            goods.showType = 1;
                            good.push(goods);
                        }
                        bossFloorInfo[v.wanted_id % 100] = good;
                    }
                }
                bossFloor.push(bossFloorInfo);
            }
            return bossFloor;
        };
        //挑战流星街Boss
        PlayerWantedSystem.ReqGetMobsInfo = function (wantedId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED;
                request.body.mobsId = wantedId;
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
        PlayerWantedSystem.reqMobRoles = function (diff) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WantedQueryRequest();
                request.body.type = diff;
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
        PlayerWantedSystem.prototype.WantedInstanceIsLast = function (wantedId) {
            //关底(无此关卡)为true
            return zj.TableWanted.Item(wantedId) == null;
        };
        PlayerWantedSystem.prototype.WantedInstanceGetFirstBlood = function (wantedId) {
            //是否为首杀
            var getFirstBlood = -1;
            if (this.wantedInfo.wantedFirstReward != null) {
                getFirstBlood = zj.Table.FindK(this.wantedInfo.wantedFirstReward, wantedId);
            }
            return getFirstBlood == -1;
        };
        PlayerWantedSystem.prototype.WantedBuyTicketReq_Visit = function (consumeType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WantedBuyTicketRequest();
                request.body.ticketId = consumeType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerWantedSystem;
    }());
    zj.PlayerWantedSystem = PlayerWantedSystem;
    __reflect(PlayerWantedSystem.prototype, "zj.PlayerWantedSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerWantedSystem.js.map