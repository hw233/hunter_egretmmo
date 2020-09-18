namespace zj {
// 飞龙营地
// wangshenzhuo 创建于2019.03.06
// 对应db_groupfight.ts

export class PlayerGroupFightSystem {

    public static fightGroupExt: number = 1;

    // public static instanceId = null;
    // public static leftInfo = [];
    // public static cheerPos = [1, 2, 3];
    // public static cheerRoleInfo = [];
    // public static starBeforeBattle = 0;
    public static groupFightDetailsInfo = {
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

    public static Instance(id) {
        if (id == 0 || id == -1) return null;
        return TableInstanceGroup.Item(id);
    }

    public static AwardList() {
        let allRewards = [];
        let groupTbls = TableInstanceGroup.Table();
        for (const k in groupTbls) {
            const v = groupTbls[k];
            let curTbl: any = [];
            let firstBlood = new message.GoodsInfo;
            firstBlood.goodsId = v.first_reward[0][0];
            firstBlood.count = v.first_reward[0][1];
            firstBlood.showType = 1;

            let reward = [];
            for (const kk in v.client_reward_id) {
                const vv = v.client_reward_id[kk];
                let goods = new message.GoodsInfo;
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
        })
        return allRewards;
    }

    // 当前fightExt所有难度
    public static GetCurGroupTbl(hard) {
        let groupTbls = TableInstanceGroup.Table();
        let tbl = [];
        for (const k in groupTbls) {
            const v = groupTbls[k];
            if (Math.floor(v.id / 10000) == hard) {
                tbl[v.id] = v;
            }
        }
        return tbl;
    }

    // 当前fightExt的关卡信息（自用）
    public static GetCurGroup(hard) {
        let groupTbls = TableInstanceGroup.Table();
        let tbl = [];
        for (const k in groupTbls) {
            const v = groupTbls[k];
            if (Math.floor(v.id / 10000) == hard) {
                tbl.push(v);
            }
        }
        return tbl;
    }

    //获取当前最大关卡
    public static GetMaxCustomsByIndex(type) {
        let maxCustoms = type * 10000;
        for (const k in Game.PlayerWantedSystem.wantedInfo.groupBattleStar) {
            const v = Game.PlayerWantedSystem.wantedInfo.groupBattleStar[k];
            if ((v.key > maxCustoms && Math.floor(v.key / 10000) == type) && v.value == 3) {
                maxCustoms = v.key;
            }
        }
        if (!PlayerGroupFightSystem.IsPassMax(maxCustoms + 1)) {
            maxCustoms = maxCustoms + 1;
        }
        return maxCustoms;
    }

    //是否通关
    public static IsPassMax(index) {
        return PlayerGroupFightSystem.Instance(index) == null;
    }

    public static InitGroupBattleInfo() {
        PlayerGroupFightSystem.groupFightDetailsInfo.instanceId = null,        // 副本id
            PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo = [],            // 左侧信息
            PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos = [1, 2, 3],   // 助阵位置
            PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo = {  level: null,
                                                                            name: null,
                                                                            id: 0},       // 助阵君主信息
            PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = 0.     // 战斗前副本星级
    }

    // public static BattleStart_Visit(father) {
    //     return new Promise((resolve, reject) => {
    //         let request = new message.BattleStartRequest();
    //         request.body.type = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
    //         request.body.id = father.id;
    //         request.body.ext = father.bUsedInfo[1].id || 0;
    //         Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
    //             let response = <message.BattleStartResponse>resp;
    //             console.log(response);
    //             if (response.header.result != 0) {
    //                 return;
    //             }
    //             resolve(response);
    //             Game.PlayerRelateSystem.relationInfo();
    //             return;
    //         }, (req: aone.AoneRequest): void => {
    //             reject(LANG("请求超时"));
    //             return;
    //         }, this, false);
    //         return;
    //     });
    // }

}
}