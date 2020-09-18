var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 飞龙营地
    // wangshenzhuo 创建于2019.03.06
    // 对应db_groupfight.ts
    var PlayerGroupFightSystem = (function () {
        function PlayerGroupFightSystem() {
        }
        PlayerGroupFightSystem.Instance = function (id) {
            if (id == 0 || id == -1)
                return null;
            return zj.TableInstanceGroup.Item(id);
        };
        PlayerGroupFightSystem.AwardList = function () {
            var allRewards = [];
            var groupTbls = zj.TableInstanceGroup.Table();
            for (var k in groupTbls) {
                var v = groupTbls[k];
                var curTbl = [];
                var firstBlood = new message.GoodsInfo;
                firstBlood.goodsId = v.first_reward[0][0];
                firstBlood.count = v.first_reward[0][1];
                firstBlood.showType = 1;
                var reward = [];
                for (var kk in v.client_reward_id) {
                    var vv = v.client_reward_id[kk];
                    var goods = new message.GoodsInfo;
                    goods.goodsId = vv;
                    goods.count = v.client_reward_count[kk];
                    goods.showType = v.client_reward_show[kk];
                    reward.push(goods);
                }
                curTbl.id = v.id;
                curTbl.firstBlood = firstBlood;
                curTbl.reward = reward;
                allRewards.push(curTbl);
            }
            allRewards.sort(function (a, b) {
                return a.id - b.id;
            });
            return allRewards;
        };
        // 当前fightExt所有难度
        PlayerGroupFightSystem.GetCurGroupTbl = function (hard) {
            var groupTbls = zj.TableInstanceGroup.Table();
            var tbl = [];
            for (var k in groupTbls) {
                var v = groupTbls[k];
                if (Math.floor(v.id / 10000) == hard) {
                    tbl[v.id] = v;
                }
            }
            return tbl;
        };
        // 当前fightExt的关卡信息（自用）
        PlayerGroupFightSystem.GetCurGroup = function (hard) {
            var groupTbls = zj.TableInstanceGroup.Table();
            var tbl = [];
            for (var k in groupTbls) {
                var v = groupTbls[k];
                if (Math.floor(v.id / 10000) == hard) {
                    tbl.push(v);
                }
            }
            return tbl;
        };
        //获取当前最大关卡
        PlayerGroupFightSystem.GetMaxCustomsByIndex = function (type) {
            var maxCustoms = type * 10000;
            for (var k in zj.Game.PlayerWantedSystem.wantedInfo.groupBattleStar) {
                var v = zj.Game.PlayerWantedSystem.wantedInfo.groupBattleStar[k];
                if ((v.key > maxCustoms && Math.floor(v.key / 10000) == type) && v.value == 3) {
                    maxCustoms = v.key;
                }
            }
            if (!PlayerGroupFightSystem.IsPassMax(maxCustoms + 1)) {
                maxCustoms = maxCustoms + 1;
            }
            return maxCustoms;
        };
        //是否通关
        PlayerGroupFightSystem.IsPassMax = function (index) {
            return PlayerGroupFightSystem.Instance(index) == null;
        };
        PlayerGroupFightSystem.InitGroupBattleInfo = function () {
            PlayerGroupFightSystem.groupFightDetailsInfo.instanceId = null,
                PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo = [],
                PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos = [1, 2, 3],
                PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo = { level: null,
                    name: null,
                    id: 0 },
                PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = 0.; // 战斗前副本星级
        };
        PlayerGroupFightSystem.fightGroupExt = 1;
        // public static instanceId = null;
        // public static leftInfo = [];
        // public static cheerPos = [1, 2, 3];
        // public static cheerRoleInfo = [];
        // public static starBeforeBattle = 0;
        PlayerGroupFightSystem.groupFightDetailsInfo = {
            instanceId: null,
            leftInfo: [],
            cheerPos: [1, 2, 3],
            cheerRoleInfo: {
                level: null,
                name: null,
                id: 0
            },
            starBeforeBattle: 0
        };
        return PlayerGroupFightSystem;
    }());
    zj.PlayerGroupFightSystem = PlayerGroupFightSystem;
    __reflect(PlayerGroupFightSystem.prototype, "zj.PlayerGroupFightSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerGroupFightSystem.js.map