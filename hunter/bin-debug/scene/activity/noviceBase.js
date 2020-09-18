var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @author xing li wei
     *
     * @date 2019-
     *
     * @class 新手狂欢 强者之路 高手进阶 父类
     */
    var noviceBase = (function (_super) {
        __extends(noviceBase, _super);
        function noviceBase() {
            var _this = _super.call(this) || this;
            _this.noviceType = 1;
            /**任务一1 任务二2 礼包3 */
            _this.typeId = 1;
            _this.tokenNow = 0;
            _this.tokenAll = 0;
            _this.array = new eui.ArrayCollection();
            _this.index = 3;
            _this.vislist = true;
            _this.TableEnumNoviceGift = (_a = {},
                _a[0] = zj.CommonConfig.missionnew_goods,
                _a[1] = zj.CommonConfig.missionnew_reward_one,
                _a[2] = zj.CommonConfig.missionnew_reward_two,
                _a[3] = zj.CommonConfig.missionnew_reward_maqi,
                _a[4] = zj.CommonConfig.missionnew_reward_kubi,
                _a);
            _this.NoviceMissionType = (_b = {},
                _b[1] = zj.TableEnum.Enum.NoviceType0,
                _b[2] = zj.TableEnum.Enum.NoviceType1,
                _b[3] = zj.TableEnum.Enum.NoviceType2,
                _b[4] = zj.TableEnum.Enum.NoviceTypeMAQI,
                _b[5] = zj.TableEnum.Enum.NoviceTypeKUBI,
                _b);
            _this.timenpc = [];
            _this.btnIndex = 1;
            _this.setInfoData = function () {
                var thisOne = _this;
                var data = zj.Table.initi(zj.Game.PlayerMissionSystem.missionMap, function (k, v) {
                    if (v.type == _this.missionType) {
                        _this.type = zj.Game.PlayerMissionSystem.itemType(v.type, v.subType); //8//4
                        var data_ = { mission: null, typeInfo: null, _ROW_ITEM: null, index: null, dataInfo: null, sort: null, lock: null, state: null, finishs: null, finish: null };
                        data_.mission = v;
                        data_.typeInfo = _this.type;
                        //计算任务数量
                        data_._ROW_ITEM;
                        while (true) {
                            data_._ROW_ITEM = data_._ROW_ITEM + 1;
                            var missionInfo = zj.Game.PlayerMissionSystem.itemInfo(_this.type.start_id + data_._ROW_ITEM);
                            if (missionInfo == null) {
                                break;
                            }
                        }
                        data_.index = zj.Table.Init(data_._ROW_ITEM, function (i) {
                            return _this.type.start_id + i;
                        });
                        data_.dataInfo = zj.Table.Init(data_._ROW_ITEM, function (i) {
                            return zj.Game.PlayerMissionSystem.itemInfo(thisOne.type.start_id + i);
                            // return i + 1;
                        });
                        data_.sort = zj.Game.PlayerMissionSystem.itemSubType(_this.missionType * 10000 + v.subType).sort;
                        return data_;
                    }
                    else {
                        return null;
                    }
                });
                data.sort(function (a, b) {
                    return a.sort - b.sort;
                });
                var _loop_1 = function (k) {
                    var v = data[Number(k)];
                    thisOne.c = (v.mission.missionId % 10) == 0 ? 10 : v.mission.missionId % 10; // 任务id(type1\2\4\5读type表，3\6读main表)  //mission =  message.MissionInfo
                    var valu = v.mission.value; //当前任务状态
                    var cond = v.dataInfo[thisOne.c - 1].condition;
                    var valGen = thisOne.missionProgress(v.mission.valueEx, Math.floor(v.dataInfo[thisOne.c - 1].condition / 10000));
                    //是否开放
                    var bLock = false;
                    v.lock = bLock;
                    //状态
                    v.state = zj.Table.Init(v._ROW_ITEM, function (i) {
                        var type = v.mission.subType; // thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
                        if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG) {
                            if ((i + 1) < thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) == thisOne.c && valu < cond) {
                                return zj.TableEnum.Enum.NoviceState.OPEN;
                            }
                            else if ((i + 1) == thisOne.c && valu >= cond && !v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.REWARD;
                            }
                            else if ((i + 1) == thisOne.c && valu >= cond && v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) > thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.LOCK;
                            }
                            else {
                                return zj.TableEnum.Enum.NoviceState.ERROR;
                            }
                        }
                        else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                            type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX) {
                            if ((i + 1) < thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) == thisOne.c && valu % 10000 < cond) {
                                return zj.TableEnum.Enum.NoviceState.OPEN;
                            }
                            else if ((i + 1) == thisOne.c && valu % 10000 >= cond && !v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.REWARD;
                            }
                            else if ((i + 1) == thisOne.c && valu % 10000 >= cond && v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) > thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.LOCK;
                            }
                            else {
                                return zj.TableEnum.Enum.NoviceState.ERROR;
                            }
                        }
                        else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                            if ((i + 1) < thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) == thisOne.c && valu > cond) {
                                return zj.TableEnum.Enum.NoviceState.OPEN;
                            }
                            else if ((i + 1) == thisOne.c && valu <= cond && !v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.REWARD;
                            }
                            else if ((i + 1) == thisOne.c && valu <= cond && v.mission.isFinish) {
                                return zj.TableEnum.Enum.NoviceState.OVER;
                            }
                            else if ((i + 1) > thisOne.c) {
                                return zj.TableEnum.Enum.NoviceState.LOCK;
                            }
                            else {
                                return zj.TableEnum.Enum.NoviceState.ERROR;
                            }
                        }
                        else {
                            if (data[Number(k)].mission.valueEx.length != 0) {
                                var enum1 = zj.TableEnum.Enum.NoviceState;
                                if ((i + 1) < thisOne.c) {
                                    return enum1.OVER;
                                }
                                else if ((i + 1) == _this.c && valGen < cond % 10000) {
                                    return enum1.OPEN;
                                }
                                else if ((i + 1) == _this.c && valGen >= cond % 10000 && !data[Number(k)].mission.isFinish) {
                                    return enum1.REWARD;
                                }
                                else if ((i + 1) == _this.c && valGen >= cond % 10000 && data[Number(k)].mission.isFinish) {
                                    return enum1.OVER;
                                }
                                else if ((i + 1) > thisOne.c) {
                                    return enum1.LOCK;
                                }
                                else {
                                    return enum1.ERROR;
                                }
                            }
                            else {
                                return zj.TableEnum.Enum.NoviceState.OPEN;
                            }
                        }
                    });
                    //进度文字
                    data[Number(k)].finish = zj.Table.Init(data[Number(k)]._ROW_ITEM, function (i) {
                        var str = null;
                        // let condition = data[Number(k)][4].dataInfo[i].condition;
                        var type = data[Number(k)].mission.subType; // thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
                        var type1 = message.MissionSubType;
                        if (type == type1.MISSION_SUB_TYPE_LOTTERY_BEER ||
                            type == type1.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                            type == type1.MISSION_SUB_TYPE_WANTED ||
                            type == type1.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                            type == type1.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
                            type == type1.MISSION_SUB_TYPE_LADDER_NUMBER ||
                            type == type1.MISSION_SUB_TYPE_LEAGUE_DONATE ||
                            type == type1.MISSION_SUB_TYPE_EGG_TIMES ||
                            type == type1.MISSION_SUB_TYPE_WANTED_HUNT ||
                            type == type1.MISSION_SUB_TYPE_LADDER ||
                            type == type1.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
                            type == type1.MISSION_SUB_TYPE_USE_POWER ||
                            type == type1.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
                            type == type1.MISSION_SUB_TYPE_BUY_POWER ||
                            type == type1.MISSION_SUB_TYPE_TOWER ||
                            type == type1.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
                            type == type1.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
                            type == type1.MISSION_SUB_TYPE_GET_RUNES ||
                            type == type1.MISSION_SUB_TYPE_GENERAL_BREAK ||
                            type == type1.MISSION_SUB_TYPE_WANTED_FIVE ||
                            type == type1.MISSION_SUB_TYPE_WANTED_FOUR ||
                            type == type1.MISSION_SUB_TYPE_CARD_HONG ||
                            type == type1.MISSION_SUB_TYPE_SEARCH_ZI ||
                            type == type1.MISSION_SUB_TYPE_SEARCH_HONG ||
                            type == type1.MISSION_SUB_TYPE_WANTED_SIX ||
                            type == type1.MISSION_SUB_TYPE_CARD_ZI ||
                            type == type1.MISSION_SUB_TYPE_CARD_CHENG ||
                            type == type1.MISSION_SUB_TYPE_SEARCH_CHENG) {
                            str = data[Number(k)].mission.value;
                        }
                        else if (type == type1.MISSION_SUB_TYPE_GENERAL_STAR ||
                            type == type1.MISSION_SUB_TYPE_AWAKEN_TIME ||
                            type == type1.MISSION_SUB_TYPE_CARD_NUM ||
                            type == type1.MISSION_SUB_TYPE_CARD_UPLEVEL ||
                            type == type1.MISSION_SUB_TYPE_CARD_FA_NUM ||
                            type == type1.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
                            type == type1.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
                            type == type1.MISSION_SUB_TYPE_CARD_JIAN_LEVEL ||
                            type == type1.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
                            type == type1.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
                            type == type1.MISSION_SUB_TYPE_END ||
                            type == type1.MISSION_SUB_TYPE_ELITE_INSTANCE) {
                            str = data[Number(k)].mission.valueEx;
                        }
                        return str;
                    });
                    data[Number(k)].finishs = zj.Table.Init(data[Number(k)]._ROW_ITEM, function (i) {
                        var str = 0;
                        var str1 = 0;
                        var condition = data[Number(k)].dataInfo[i].condition;
                        var type = data[Number(k)].mission.subType; // data[this.typeId - 1 + ((this.btnIndex - 1) * 2)].typeInfo.sub_type// thisOne.NoviceMissionType[thisOne.noviceType][Number(k) + 1];
                        var type1 = message.MissionSubType;
                        // if (type == type1.MISSION_SUB_TYPE_LOTTERY_BEER ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                        // 	type == type1.MISSION_SUB_TYPE_WANTED ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_STAR ||
                        // 	type == type1.MISSION_SUB_TYPE_AWAKEN_TIME ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_NUM ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_UPLEVEL ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_FA_NUM ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
                        // 	type == type1.MISSION_SUB_TYPE_CARD_JIAN_LEVEL ||
                        // 	type == type1.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                        // 	type == type1.MISSION_SUB_TYPE_ELITE_INSTANCE ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
                        // 	type == type1.MISSION_SUB_TYPE_LADDER_NUMBER ||
                        // 	type == type1.MISSION_SUB_TYPE_LEAGUE_DONATE ||
                        // 	type == type1.MISSION_SUB_TYPE_EGG_TIMES ||
                        // 	type == type1.MISSION_SUB_TYPE_WANTED_HUNT ||
                        // 	type == type1.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
                        // 	type == type1.MISSION_SUB_TYPE_USE_POWER ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
                        // 	type == type1.MISSION_SUB_TYPE_BUY_POWER ||
                        // 	type == type1.MISSION_SUB_TYPE_TOWER ||
                        // 	type == type1.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
                        // 	type == type1.MISSION_SUB_TYPE_LADDER ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
                        // 	type == type1.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
                        // 	type == type1.MISSION_SUB_TYPE_END ||
                        // 	type == type1.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
                        // 	type == type1.MISSION_SUB_TYPE_GET_RUNES ||
                        // 	type == type1.MISSION_SUB_TYPE_GENERAL_BREAK
                        // ) {
                        str1 = condition;
                        // } else {
                        // console.log();
                        // }
                        return str1;
                    });
                };
                for (var k in data) {
                    _loop_1(k);
                }
                thisOne.data = data;
                thisOne.setProcessBarData();
            };
            return _this;
            var _a, _b;
        }
        ;
        noviceBase.prototype.init = function () {
            var _this = this;
            if (this.imgbg) {
                if (this.imgbg.width < zj.UIManager.StageWidth) {
                    this.imgbg.width = zj.UIManager.StageWidth;
                }
            }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                egret.Tween.removeTweens(_this);
            }, this);
            egret.Tween.get(this).wait(10).call(function () {
                _this.Update();
            });
        };
        noviceBase.prototype.Update = function () {
            var infotime = zj.Game.PlayerProgressesSystem.progressMap[this.procType].leftTime - Math.floor(egret.getTimer() / 1000);
            var day = Math.floor(infotime / 3600 / 24);
            var hour = Math.floor(infotime / 3600 % 24);
            var min = Math.floor(infotime / 60 % 60);
            var miao = Math.floor(infotime % 60);
            this.labelTime.textFlow = zj.Util.RichText("<text>结束时间：</text><color>r:255,g:208,b:2</color><text>" + day + "</text><text>天</text><color>r:255,g:208,b:2</color><text>" + hour + "</text><text>:</text><color>r:255,g:208,b:2</color><text>" + min + "</text><text>:</text><color>r:255,g:208,b:2</color><text>" + miao + "</text>");
            this.setInfoData();
        };
        noviceBase.prototype.setType = function (type) {
            this.noviceType = type;
            this.procType = zj.TableEnum.Enum.TableEnumNovice[this.noviceType - 1];
            this.missionType = zj.TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1];
            this.initAfterSetType();
        };
        noviceBase.prototype.initAfterSetType = function () {
            this.setInfoData();
            this.loadBtnList();
            this.setList(this.typeId - 1);
            this.setInfoCost();
        };
        noviceBase.prototype.setProcessBarData = function () {
            //计算领取元宝
            this.tokenNow = 0;
            this.tokenAll = 0;
            if (this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL || this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE) {
                for (var k in this.data) {
                    if (this.data.hasOwnProperty(k)) {
                        var data = this.data[Number(k)];
                        for (var i in data.dataInfo) {
                            if (data.dataInfo.hasOwnProperty(i)) {
                                var reward = data.dataInfo[Number(i)];
                                var rewardAll = reward.reward_goods[0][1];
                                var rewardGet = data.state[Number(i)] == zj.TableEnum.Enum.NoviceState.OVER && rewardAll || 0;
                                this.tokenNow = this.tokenNow + rewardGet;
                                this.tokenAll += rewardAll;
                            }
                        }
                    }
                }
            }
            else if (this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO ||
                this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI ||
                this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI) {
                for (var k in this.data) {
                    if (this.data.hasOwnProperty(k)) {
                        var data = this.data[Number(k)];
                        this.tokenAll += data._ROW_ITEM;
                        for (var i in data.dataInfo) {
                            if (data.dataInfo.hasOwnProperty(i)) {
                                var reward = data.dataInfo[Number(i)];
                                if (data.state[Number(i)] == zj.TableEnum.Enum.NoviceState.OVER) {
                                    this.tokenNow = this.tokenNow + 1;
                                }
                            }
                        }
                    }
                }
            }
        };
        noviceBase.prototype.missionProgress = function (tableCur, type) {
            var ret = 0;
            if (typeof tableCur == "number") {
                if (tableCur >= 10000) {
                    if (Math.floor(tableCur / 10000) == type) {
                        ret = tableCur % 10000;
                    }
                }
                else {
                    if (Math.floor(tableCur % 10000) >= type) {
                        ret = tableCur % 10000;
                    }
                }
            }
            else {
                for (var i in tableCur) {
                    if (tableCur.hasOwnProperty(i)) {
                        var v = tableCur[i];
                        if (Math.floor(v / 10000) == type) {
                            ret = v % 10000;
                        }
                    }
                }
            }
            return ret;
        };
        ;
        noviceBase.prototype.isSubTypeCurType = function (subType) {
            var a = [];
            for (var k in this.NoviceMissionType[this.noviceType]) {
                var v = this.NoviceMissionType[this.noviceType][Number(k)];
                a.push(v);
            }
            return zj.Table.FindK(a, subType) != -1;
        };
        noviceBase.prototype.loadBtnList = function () {
            // this.array.removeAll();
            // for (let i = 0; i < 3; i++) {
            // 	let data = new ActivityNoviceTagData();
            // 	data.index = i;
            // 	// data.father = this;
            // 	this.array.addItem(data);
            // }
            // this.listViewTag.dataProvider = this.array;
            // this.listViewTag.itemRenderer = ActivityNoviceTag;
            // this.listViewTag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListViewTag, this);
        };
        noviceBase.prototype.SetInfoButton = function (index) {
        };
        noviceBase.prototype.onListViewTag = function (e) {
            // this.typeId = e.itemIndex + 1;
            this.array.refresh();
            this.setList(e.itemIndex);
        };
        noviceBase.prototype.setList = function (type) {
            // if (type != null) {
            // 	this.typeId = type + 1;
            // }
            // let array = new eui.ArrayCollection();
            // for (let i = 0; i < this.data[this.typeId - 1]._ROW_ITEM; i++) {
            // 	let data = new ActivityNoviceItemData();
            // 	data.index = i;
            // 	data.TypeId = 1;
            // 	// data.father = this;
            // 	array.addItem(data);
            // }
            // this.listViewItem.dataProvider = array;
            // this.listViewItem.itemRenderer = ActivityNoviceItem;
        };
        noviceBase.prototype.setInfoCost = function () {
            var percent = this.tokenNow / this.tokenAll;
            var bFinish = zj.Table.alltrue(this.data, function (k, v) {
                return (v.mission.missionId % 10 == v._ROW_ITEM && v.mission.isFinish);
            });
            var bReward = null;
            if (this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
                bReward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
            }
            else {
                bReward = zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, zj.TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1]) != -1;
            }
            var path = zj.UIConfig.UIConfig_Novice[this.noviceType].gift;
            var bEffect = (bFinish && !bReward);
        };
        noviceBase.prototype.btnGo = function (type1) {
            var type = type1; // this.data[this.typeId - 1 + ((this.btnIndex - 1) * 2)].typeInfo.sub_type;// this.NoviceMissionType[this.noviceType][this.typeId]
            if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER) {
                zj.loadUI(zj.TavernScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST, true)) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (dialog) {
                        dialog.Init(1);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
                type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK //猎人突破
            ) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX // 流星街第六个副本最大层
            ) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST, true)) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (dialog) {
                        dialog.Init(1);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL //// 把几张坚系卡片升到几级（等级*10000+数量）
            ) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO, true)) {
                    zj.loadUI(zj.CardMainScene)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
                type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER) {
                // loadUI(AdventureMapScene)
                // 	.then((scene: AdventureMapScene) => {
                // 		scene.show(UI.SHOW_FROM_TOP);
                // 	});
                zj.SceneManager.instance.EnterAdventure();
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_TOWER) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.TOWER, true)) {
                    zj.loadUI(zj.SkyAreanMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.Init();
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER_NUMBER) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level < 8) {
                    zj.toast_warning("8级开启");
                    return;
                }
                zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                    zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                        zj.ArenaMainScene.roleFormationInfo = data;
                        dialog.setInfo(data, function () {
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level < 12) {
                    zj.toast_warning("12级开启");
                    return;
                }
                if (zj.Game.PlayerInfoSystem.LeagueId == 0) {
                    zj.loadUI(zj.LeagueChooseScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                    });
                }
                else {
                    zj.loadUI(zj.LeagueHomeScene)
                        .then(function (scene) {
                        scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUY_POWER) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.SetInfo();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level < 8) {
                    zj.toast_warning("8级开启");
                    return;
                }
                zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                    zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                        zj.ArenaMainScene.roleFormationInfo = data;
                        dialog.setInfo(data, function () {
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES) {
                if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.Rank_Charge.over);
                    return;
                }
                this.QueryIntegralReqBody_Visit()
                    .then(function (data) {
                    zj.loadUI(zj.Activity_RandomBoomSence)
                        .then(function (scene) {
                        scene.Init();
                        scene.show(zj.UI.SHOW_FILL_OUT);
                    });
                }).catch(function (reason) { });
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_END) {
                if (this.btnIndex == 6 && this.typeId == 1) {
                    if (zj.PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
                        zj.loadUI(zj.WorkSendMain).then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG // 获得几张红卡
            ) {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST, true)) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (dialog) {
                        dialog.Init(1);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_ZI ||
                type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG ||
                type == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_HONG // 探索红色品质几次
            ) {
                if (zj.PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
                    zj.loadUI(zj.WorkSendMain).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES // 猜拳
            ) {
                zj.SceneManager.instance.EnterSceneZorkBoss();
            }
            this.onBtnClose();
        };
        noviceBase.prototype.onBtnGift = function () {
            var bFinish = zj.Table.alltrue(this.data, function (k, v) {
                return (v.mission.missionId % 10 == v._ROW_ITEM && v.mission.isFinish);
            });
            var goods = [];
            for (var k in this.TableEnumNoviceGift[this.noviceType - 1]) {
                if (this.TableEnumNoviceGift[this.noviceType - 1].hasOwnProperty(k)) {
                    var v = this.TableEnumNoviceGift[this.noviceType - 1][k];
                    var item = new message.GoodsInfo();
                    item.goodsId = v[0];
                    item.count = v[1];
                    goods.push(item);
                }
            }
            var bReward = null;
            if (this.noviceType == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
                bReward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
            }
            else {
                bReward = zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, zj.TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1]) != -1;
            }
        };
        /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
        noviceBase.prototype.up = function () {
            // if (this.commonDesSkillvis == true) {                                                                      
            var dialogDrop = this.getChildByName("UI");
            if (dialogDrop) {
                this.removeChild(dialogDrop);
            }
            // this.commonDesSkillvis = false;
            // }
        };
        noviceBase.prototype.typerEffect = function (obj, content, interval, backFun) {
            if (content === void 0) { content = ""; }
            if (interval === void 0) { interval = 200; }
            if (backFun === void 0) { backFun = null; }
            var strArr = content.split("");
            var len = strArr.length;
            obj.text = "";
            this.timenpc = [];
            for (var i = 0; i < len; i++) {
                var timenum = egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);
                this.timenpc.push(timenum);
            }
        };
        /**奖励详情 */
        noviceBase.prototype.awardParticulars = function (xy, cx, cy, info) {
            var dialogDrop = this.getChildByName("UI");
            if (dialogDrop) {
                return;
            }
            var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            if (zj.PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                commonDesSkill.reSetGeneral();
            }
            commonDesSkill.name = "UI";
            this.addChild(commonDesSkill);
        };
        noviceBase.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        noviceBase.prototype.Close = function () {
            var _this = this;
            egret.Tween.get(this).wait(300).call(function () {
                _this.onBtnClose();
            });
        };
        //扭蛋机
        noviceBase.prototype.QueryIntegralReqBody_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryIntegralRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
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
        return noviceBase;
    }(zj.Dialog));
    zj.noviceBase = noviceBase;
    __reflect(noviceBase.prototype, "zj.noviceBase");
})(zj || (zj = {}));
//# sourceMappingURL=noviceBase.js.map