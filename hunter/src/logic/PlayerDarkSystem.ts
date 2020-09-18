namespace zj {
// 黑暗大陆系统
// hexiaowei 创建于2019.03.05
// 对应darkdb

export class PlayerDarkSystem {

    public static RelicInstance(mapid: number) {

        return TableInstanceRelic.Item(mapid);
    }

    public static RelicInstanceChest(chestId) {
        return TableInstanceRelicChest.Item(chestId);
    }

    public static GetRelicAwardByType(curHard, mainType) {
        let awardTbl = PlayerDarkSystem.RelicInstance(curHard);
        let maxStar = awardTbl.max_step;

        let allGoods = [];
        if (mainType == 1) {
            for (var i = 0; i < awardTbl.relic_goods_client.length; i++) {
                let goods = new message.GoodsInfo;
                //goods.def = null;
                goods.goodsId = awardTbl.relic_goods_client[i];
                goods.count = 0;
                goods.showType = 1;
                allGoods.push(goods);
            }
        }
        else if (mainType == 2) {
            for (var i = 0; i < maxStar; i++) {
                let goods = new message.GoodsInfo;
                //goods.def = null
                goods.goodsId = awardTbl.first_rewards[i][0]
                goods.count = awardTbl.first_rewards[i][1]
                goods.showType = 1
                allGoods.push(goods);
            }
        }
        return allGoods
    }

    public static GetLevelByHurt(hard, hurt) {
        let instanceTbl = PlayerDarkSystem.RelicInstance(hard);
        let level: number = 1;
        for (const k in instanceTbl.damage_zone) {
            const v = instanceTbl.damage_zone[k];
            if (hurt >= v) {
                level = Number(k);
            }
        }
        return level;
    }


    public static CanOpenByRelicId(relicId) {
        let chestTbl = [];
        let relicInfo = PlayerDarkSystem.RelicInstance(relicId);
        for (var i = 0; i < relicInfo.open_chest.length; i++) {
            if (PlayerDarkSystem.CanOpenByChestId(relicInfo.open_chest[i])[0]) {
                chestTbl.push(relicInfo.open_chest[i]);
            }
        }
        return chestTbl;
    }


    public static CanOpenByChestId(chestId) {
        let chestInfo = PlayerDarkSystem.RelicInstanceChest(chestId)
        let canOpen = false
        let bGet = true
        let freeTime = Table.Count(chestInfo.price, function (k, v) {
            let count = v == 0 ? 1 : 0;
            return count
        })

        let m = Game.PlayerInstanceSystem.RelicChest;
        let chestOpenInfo = Table.FindR(Game.PlayerInstanceSystem.RelicChest, function (_k, _v) {
            return _v.key == chestId
        })
        if (chestOpenInfo[0] != null) {
            if (freeTime > chestOpenInfo[0].value) {
                canOpen = true
            }
        }
        else {
            bGet = false
        }
        return [canOpen, bGet]
    }

    public static LastChallengeTime(relicId) {
        let relicTbl = PlayerDarkSystem.RelicInstance(relicId);
        let date: Date = Game.Controller.serverNow();
        let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 4, date.getMinutes(), date.getSeconds()));  
        let wDay = humanDate.getDay();

        if (wDay == 0) {
            wDay = 7;
        } else {
            wDay = wDay;
        }
        if (Table.VIn(relicTbl.open_day, wDay)) {
            let allTime = CommonConfig.relic_max_battle_time;
            let userTime = 0;
            let useInfo = Table.FindR(Game.PlayerInstanceSystem.RelicBattleTimes, function (k, v) {
                return v.key == relicId;
            });

            if (useInfo[0] != null) {
                userTime = useInfo[0].value;
            }

            return allTime - userTime;
        } else {
            return 0;
        }


    }

    public static PortOpenTime(): [boolean, number] {
        let bOpen: boolean = false;
        let lastTime: number = 0;
        let currentTime = Game.Controller.serverNow();
        let currentSecond: number = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
        let timePart = [];
        for (let i = 0; i < CommonConfig.port_open_time.length; i++) {
            for (let j = 0; j < 2; j++) {
                let timeDiff = CommonConfig.port_open_time[i][j] - currentSecond;
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
        } else {
            bOpen = false;
            lastTime = (86400 - currentSecond) + CommonConfig.port_open_time[0][0];
        }

        return [bOpen, lastTime];
    }

    //遗迹探索排行帮
    public static GetServerRankInfo(relicId, rankType) {
        return new Promise((resolve, reject) => {
            let request = new message.RelicRankInfoRequest();
            request.body.rank_type = rankType;
            request.body.instead_type = relicId;
            request.body.start = 0;
            request.body.num = CommonConfig.rank_list_max - 1;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.RelicRankInfoResponse>resp;
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

    //晶石商店信息
    public static reqMall() {
        return new Promise((resolve, reject) => {
            let request = new message.MallListRequest();
            request.body.type = 7;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MallListResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response.body);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }


    //验证倒计时请求
    public static ReqProcess() {
        return new Promise((resolve, reject) => {
            let request = new message.CheckProcessRequest();
            request.body.types = [message.EProcessType.PROCESS_TYPE_MALL_RELIC];
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.CheckProcessResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response.body);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    // 贪婪之岛 -- 港口
    public static SceneQueryScoreRankReq() {
        return new Promise((resolve, reject) => {
            let request = new message.SceneQueryScoreRankRequest();
            request.body.get_all = false;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SceneQueryScoreRankResponse>resp;
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

    public static SetFormationReq() {
        return new Promise((resolve, reject) => {
            let request = new message.SetFormationRequest();
            let formation = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
            request.body.formations.push(formation);
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SetFormationResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                Game.PlayerRelateSystem.relationInfo();
                Game.PlayerRelateSystem.givepower();
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    public SceneEnterRespBody() {
        return new Promise((resolve, reject) => {
            let request = new message.SceneEnterRequest();
            request.body.id = 0;
            // Player:willGoRpg();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SceneEnterResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                this.enterScene(response);
                Game.PlayerRelateSystem.relationInfo();
                Game.PlayerRelateSystem.givepower();
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }
    public enterScene(data:message.SceneEnterResponse){
        let msg = data.body;
        msg.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - msg.roleInfo.posInfo.posItem.scene_y;
        Game.PlayerWonderLandSystem.darkland.roleInfo = msg.roleInfo
        Game.PlayerWonderLandSystem.loadRpgScenePos(msg.posInfos)
        Game.PlayerWonderLandSystem.darkland.inDarkland = true
        Game.PlayerWonderLandSystem.darkland.serverSceneId = msg.sceneId

        Game.PlayerWonderLandSystem.darkland.channelId = msg.sceneId
        Game.PlayerWonderLandSystem.darkland.cityId = msg.cityId
        Game.PlayerWonderLandSystem.darkland.cityServerInfo = msg.group_name
    }

}
}