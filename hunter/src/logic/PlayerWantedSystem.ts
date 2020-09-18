namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-1-9
 * 
 * @class 通缉令.
 */
export class PlayerWantedSystem {

    ///////////////////////////////////////////////////////////////////////////
    // 静态方法


    ///////////////////////////////////////////////////////////////////////////
    // 变量
    private wantedInfo_: message.WantedInfo;

    /**通缉令当前怪索引 */
    public wantedCurPos;

    /**Boss难度 */
    public wantedBossDifficulty;

    /**挑战次数 */
    private challengeNumber: number = 0;

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法
    public init() {
        Game.EventManager.on(GameEvent.PLAYER_WANTED_INFO_CHANGE, this.onWantedInfoChange, this);
    }

    public uninit() {
        this.wantedInfo_ = null;
        this.wantedCurPos = 0;
        this.wantedBossDifficulty = 0;
        this.wantedBossDifficulty = 0;
    }

    private onWantedInfoChange(ev: egret.Event) {
        this.wantedInfo_ = <message.WantedInfo>ev.data;
    }

    public get wantedInfo(): message.WantedInfo {
        return this.wantedInfo_;
    }

    public get ChallengeNumber() {
        return this.challengeNumber;
    }
    public set ChallengeNumber(e) {
        this.challengeNumber = e;
    }

    public static Instance(id): TableWanted {
        if (id == null || id == -1) {
            return null;
        }
        return TableWanted.Item(id);
    }

    public static EnemyInstance(id): TableWantedEnemyCamp {
        if (id == null || id == -1) {
            return null;
        }
        return TableWantedEnemyCamp.Item(id);
    }

    public static GetLimitLevel(index) {

        return PlayerWantedSystem.Instance(10000 * index + 1).limit_level
    }

    public static GetenemyLimitLevel(index) {
        //return WantedSystem.EnemyInstance(1000 * index +1).limit_level
    }

    public static GetMobInfo(type, index) {

        return PlayerWantedSystem.Instance(10000 * type + index)
    }

    public static GetEnemyMobInfo(type, index) {
        return PlayerWantedSystem.EnemyInstance(1000 * type + index)
    }

    public static GetInstanceName(index) {

        let main = Math.floor(index / 10000)
        let mission = index % 10000
        let str = TextsConfig.TextsConfig_Wanted.name[main] + " " + HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Wanted.level, Helper.GetNumCH(mission.toString()));
        return str;
    }

    public static GetEnemyInstanceName(index) {

        let main = Math.floor(index / 1000);
        let mission = index % 1000;
        let str = TextsConfig.TextsConfig_Wanted.sname[main] + " " + HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Wanted.level, Helper.GetNumCH(mission.toString()));
        return str;
    }

    public static InstanceMobsFeature(id) {
        if (id == null || id == -1) {
            return null;
        }
        return TableClientWantedMobsFeature.Item(id);
    }

    public static DropInstanceItem(index) {
        let tbl = TableWantedRand.Table();

        let list1 = [];
        for (const k in tbl) {
            const v = tbl[k];
            if (index == v.type) {
                for (const kk in v.rand_items) {
                    const vv = v.rand_items[kk];
                    if (Table.FindK(list1, vv) == -1) {
                        list1.push(vv);
                    }
                }
            }
        }

        let list2 = [];
        for (const k in list1) {
            const v = list1[k];
            let item = TableRandItem.Item(v);
            for (const kk in item.item_ids) {
                const vv = item.item_ids[kk];
                let itemSet: any = PlayerItemSystem.Set(item.item_ids[kk]);
                let listgood = {
                    goodsId: null,
                    count: null,
                    index: null,
                    quality: null,
                }
                listgood.goodsId = item.item_ids[kk];
                listgood.count = item.item_count[kk];
                listgood.index = item.index;
                listgood.quality = itemSet.Info.quality;

                list2.push(listgood);
            }
        }

        list2.sort(function (a: any, b: any) {
            if (a.quality == b.quality) {
                return a.quality - b.quality;
            } else {
                return b.quality - a.quality;
            }
        });

        return list2;
    }

    public static GetClientDrop(index) {
        let static_goods = PlayerWantedSystem.Instance(index).static_goods;
        let prob_goods = PlayerWantedSystem.Instance(index).drop_items;
        let goods = [];
        for (const k in static_goods) {
            const v = static_goods[k];
            let good = new message.GoodsInfo();
            //good.def = null;
            good.goodsId = v[0];
            good.count = v[1];
            goods.push(good);
        }

        for (const k in prob_goods) {
            const v = prob_goods[k];
            let good = new message.GoodsInfo();
            //good.def = null;
            good.goodsId = v;
            good.count = 0;
            goods.push(good);
        }

        return goods
    }

    public GetClientDropHaveCard(index) {

        let static_goods = PlayerWantedSystem.Instance(index).static_goods;
        let prob_goods = PlayerWantedSystem.Instance(index).drop_items;
        let goods = [];
        for (const k in static_goods) {
            const v = static_goods[k];
            let itemInfo: any = PlayerItemSystem.Item(v[0]);
            if (itemInfo.is_card == 1) {
                return true;
            }
        }

        for (const k in prob_goods) {
            const v = prob_goods[k];
            let itemInfo: any = PlayerItemSystem.Item(v);
            if (itemInfo.is_card == 1) {
                return true;
            }
        }

        return false
    }

    //遍历对应类型最大层
    public static Maxfloor(type) {

        let tbl = TableWantedEnemyCamp.Table();
        let maxfloor = 1
        for (const k in tbl) {
            const v = tbl[k];
            if (v.type == type && v.id % 100 > maxfloor) {
                maxfloor = v.id % 100;
            }
        }

        return maxfloor + type * 1000
    }

    public static BossFloorReward() {
        let maxBossNum = message.EWantedType.WANTED_TYPE_END - 1;

        let bossFloor = [];
        for (let i = 1; i <= maxBossNum; i++) {
            let currentBossTbl: Array<TableWanted> = otherdb.WantedTypeInfo(i);
            let bossFloorInfo = {};
            for (let v of currentBossTbl) {
                if (v.boss_floor == "1") {
                    let good: Array<message.GoodsInfo> = [];
                    for (let i = 0; i < v.first_reward.length; i++) {
                        let goods: message.GoodsInfo = new message.GoodsInfo();
                        goods.goodsId = v.first_reward[i][0];
                        goods.count = v.first_reward[i][1];
                        goods.showType = 1;
                        good.push(goods);
                    }
                    bossFloorInfo[v.wanted_id % 100] = good;
                }
            }
            bossFloor.push(bossFloorInfo);
        }

        return bossFloor;
    }

    //挑战流星街Boss
    public static ReqGetMobsInfo(wantedId: number) {
        return new Promise((resolve, reject) => {
            let request = new message.MobsInfoRequest();
            request.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED;
            request.body.mobsId = wantedId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MobsInfoResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }



    public static reqMobRoles(diff) {
        return new Promise((resolve, reject) => {
            let request = new message.WantedQueryRequest();
            request.body.type = diff;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.WantedQueryResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }
    public WantedInstanceIsLast(wantedId) {
        //关底(无此关卡)为true
        return TableWanted.Item(wantedId) == null;
    }
    public WantedInstanceGetFirstBlood(wantedId) {
        //是否为首杀
        let getFirstBlood = -1;
        if (this.wantedInfo.wantedFirstReward != null) {
            getFirstBlood = Table.FindK(this.wantedInfo.wantedFirstReward, wantedId);
        }
        return getFirstBlood == -1;
    }
    public WantedBuyTicketReq_Visit(consumeType) {
        return new Promise((resolve, reject) => {
            let request = new message.WantedBuyTicketRequest();
            request.body.ticketId = consumeType;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.WantedBuyTicketResponse>resp;
                console.log(response);

                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }
}
}