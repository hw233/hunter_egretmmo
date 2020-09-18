namespace zj {
// other 对应 otherdb
// hexiaowei
// 2019-02-13
export class otherdb {

    public static WantedTypeInfo(type) {
        let tbl = TableWanted.Table();
        let wanted_tbl = [];
        for (const k in tbl) {
            const v = tbl[k];
            if (Math.floor(v.wanted_id / 10000) == type) {
                wanted_tbl.push(v);
            }
        }
        wanted_tbl.sort(function (a: any, b: any) {
            return a.wanted_id - b.wanted_id;
        });
        return wanted_tbl
    }

    public static WantedInstance(wantedId) {
        return TableWanted.Item(wantedId);
    }

    public static GetSecretMallInfo() {
        let giftInfos = [];
        let mallInfo: message.ActivitySecretMall = null;
        // 活动开启
        let activityInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
            return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
        })[0];

        if (activityInfo == null || Game.PlayerInfoSystem.Level < 10) {
            return giftInfos;
        }

        if (!((activityInfo.openTime < Game.Controller.curServerTime) && (Game.Controller.curServerTime <= activityInfo.closeTime))) {
            return giftInfos;
        }

        if (activityInfo.secretMalls == null) {
            return giftInfos;
        }

        mallInfo = Table.FindR(activityInfo.secretMalls, function (k, v) {
            return v.mall_id == activityInfo.daysIndex;
        })[0];

        if (mallInfo == null) {
            return giftInfos;
        }

        for (const k in mallInfo.items) {
            const v = mallInfo.items[k];
            let buyInfo: message.IIKVPairs = Table.FindR(activityInfo.kvInfos, function (kk, vv) {
                return vv.key == Number(k);
            })[0];

            if (buyInfo != null) {
                let nextGiftInfo = v.tributeInfo[buyInfo.value + 1];
                if (nextGiftInfo == null) {
                    let currentGiftInfo = v.tributeInfo[buyInfo.value];

                    // 最后一个显示当前礼包
                    if (currentGiftInfo != null) {
                        let tmp = {
                            tribute_id: currentGiftInfo.tribute_id,
                            tribute_name: currentGiftInfo.tribute_name,
                            buy_type: currentGiftInfo.buy_type,
                            pay_index: currentGiftInfo.pay_index,
                            discount: currentGiftInfo.discount,
                            goodses: currentGiftInfo.goodses,
                            sort_power: currentGiftInfo.sort_power,

                            bBought: 1,
                            reference: Number(k),
                            gift_pay_index: buyInfo.value,
                        };

                        giftInfos.push(tmp);
                    }
                } else {
                    // 下一个礼包
                    let tmp = {
                        tribute_id: nextGiftInfo.tribute_id,
                        tribute_name: nextGiftInfo.tribute_name,
                        buy_type: nextGiftInfo.buy_type,
                        pay_index: nextGiftInfo.pay_index,
                        discount: nextGiftInfo.discount,
                        goodses: nextGiftInfo.goodses,
                        sort_power: nextGiftInfo.sort_power,

                        bBought: 0,
                        reference: Number(k),
                        gift_pay_index: buyInfo.value + 1,
                    };

                    giftInfos.push(tmp);
                }
            } else {
                //  第一个礼包
                let nextGiftInfo = v.tributeInfo[0];
                if (nextGiftInfo != null) {
                    let tmp = {
                        tribute_id: nextGiftInfo.tribute_id,
                        tribute_name: nextGiftInfo.tribute_name,
                        buy_type: nextGiftInfo.buy_type,
                        pay_index: nextGiftInfo.pay_index,
                        discount: nextGiftInfo.discount,
                        goodses: nextGiftInfo.goodses,
                        sort_power: nextGiftInfo.sort_power,

                        bBought: 0,
                        reference: Number(k),
                        gift_pay_index: 0,
                    };

                    giftInfos.push(tmp);
                }
            }
        }

        giftInfos.sort(function (a, b) {
            if (a.bBought == b.bBought) {
                return a.reference - b.reference;
            } else {
                return a.bBought - b.bBought;
            }
        });
        return giftInfos;
    }

    public static exchangeTips() {
        let exchange = TableExchangeMall.Table();
        let types = [];
        for (let k in exchange) {
            let v = exchange[k];
            let typeExit = Table.FindFCall(types, function (_k, _v) {
                return _v == v.type;
            }, this);
            if (!typeExit) {
                types.push(v.type);
                let b_convert = PlayerConvertSystem.Tips(v.type);
                if (b_convert) {
                    return true;
                }
            }
        }
        return false;
    }

    public static checkOpenTransformAndActivityStatus() : number {
        let transferTab = TableGeneralTransfer.Table();
        let transformData = [];
        if (PlayerMissionSystem.FunOpenTo(FUNC.TRANSFORM)) {
            for (const k in transferTab) {
                const v = transferTab[k];
                if (v.general_add == 1) {
                    transformData.push(v);
                }
            }
            if (transformData.length != 0) {
                //开启转至新界面
                return TableEnum.Enum.TableTransformStatus.ShowTransform;
            }else{
                if(otherdb.getActivityBattle().length != 0) {
                    return TableEnum.Enum.TableTransformStatus.OnlyShowActivity;
                }else{
                    return TableEnum.Enum.TableTransformStatus.AllClosed;
                }
            }
        }else{
            if(otherdb.getActivityBattle().length != 0) {
                return TableEnum.Enum.TableTransformStatus.OnlyShowActivity;
            }else{
                return TableEnum.Enum.TableTransformStatus.AllClosed;
            }
        }
    }

    public static getActivityBattle () {
        let data = [];
        for (const k in Game.PlayerActivitySystem.Activities) {
            const v = Game.PlayerActivitySystem.Activities[k];
            let curTime = Game.Controller.serverNow();
            let timestamp = Date.parse(curTime.toString()) / 1000;
            if (v.stopTime > timestamp) {
                if (v.type == message.ActivityType.ACT_TYPE_INSTANCE_BATTLE) {
                    let tbl = TableActivityBattle.Item(v.buffValue);;
                    if (tbl.open_level <= Game.PlayerInfoSystem.BaseInfo.level) {
                        data.push(v);
                    }
                }
            }
        }
        return data;
    }

    public static ActivityBattleGetCurStar(info) {
        let starInfo = info.dailyAddItems;
        let curStar = 0;
        for (const k in starInfo) {
            const v = starInfo[k];
            curStar = curStar + v.rewardIndex.length;
        }
        return curStar;
    }

    public static getActivityByTypeAndIndex(type, index) {
        for (const k in Game.PlayerActivitySystem.Activities) {
            const v = Game.PlayerActivitySystem.Activities[k];
            if (v.index == index && v.type == type) {
                return v;
            }
        }
        return null;
    }

    public static ActivityBattleGetInstanceStarDes(id: number) {
        let tbl: TableActivityBattleInstance = TableActivityBattleInstance.Item(id);
        let ret = [];
        for (const k in tbl.check_type) {
            const v = tbl.check_type[k];
            if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_BATTLE_WIN) {
                if (Number(k) == 0) {
                    ret.push(TextsConfig.TextsConfig_Activity.battleStar1);
                } else {
                    ret.push(TextsConfig.TextsConfig_Activity.battleStarX);
                }
            } else if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_GENERAL_TYPE) {
                ret.push(Helper.StringFormat(TextsConfig.TextsConfig_Activity.battleStar2, TextsConfig.TextsConfig_Hunter.hunter_type[tbl.check_value[Number(k) - 1] - 1]));
            } else if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_GENERAL_ID) {
                ret.push(Helper.StringFormat(TextsConfig.TextsConfig_Activity.battleStar3, PlayerHunterSystem.Table(tbl.check_value[k]).general_name));
            }
        }
        return ret;
    }

    public static ActivityBattleGetCurStarById(info , instanceId) {
        let starInfo = info.dailyAddItems;
        for(const k in starInfo) {
            const v = starInfo[k];
            if(v.index == instanceId) {
                return v.rewardIndex;
            }
        }
        return [];
    }

}
}