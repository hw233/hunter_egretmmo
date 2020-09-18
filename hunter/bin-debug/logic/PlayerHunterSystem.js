var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 玩家猎人(武将)系统
    // guoshanhe 创建于2018.11.13
    // 对应db_general.ts
    var PlayerHunterSystem = (function () {
        function PlayerHunterSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.mapHunters = {}; // 猎人（武将）列表
            this.generals = []; // 猎人数组
            this.huntervis = true;
        }
        /**
         * 查询map_role模型映射表
         *
         * @returns 对应ID的映射表， 如果ID为空或者-1，返回null
         */
        PlayerHunterSystem.MapInstance = function (id) {
            if (id == null || id == -1 || id == undefined)
                return null;
            return zj.TableMapRole.Item(id);
        };
        // 武将UID对应武将ID
        PlayerHunterSystem.GetGeneralId = function (id) {
            return id % zj.CommonConfig.general_id_to_index_multiple;
        };
        PlayerHunterSystem.Table = function (generalId, trnsfer) {
            var transfer_level = trnsfer || 0;
            var id = PlayerHunterSystem.GetGeneralId(Number(generalId));
            var info = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) {
                return v.general_id == generalId;
            })[0];
            if (id == null || id == 0) {
                return null;
            }
            if (transfer_level > 0 && info.is_show_transfer) {
                return zj.TableGeneralTransfer.Item(id);
            }
            else {
                return zj.TableBaseGeneral.Item(id);
            }
        };
        /** 根据碎片id查找武将表 */
        PlayerHunterSystem.SoulIdFindGeneral = function (soulId) {
            var id = soulId - 30000;
            return PlayerHunterSystem.Table(id);
        };
        /**
         * 查询玩家武将碎片值占比
         * @param soulId 碎片ID
         */
        PlayerHunterSystem.SoulCount = function (soulId) {
            var count = zj.Game.PlayerItemSystem.itemCount(soulId);
            var callCount = PlayerHunterSystem.SoulIdFindGeneral(soulId).soul_count;
            var percent = (count / callCount >= 1) ? 1 : count / callCount;
            return [count, callCount, percent];
        };
        /**
         * 获取猎人ID列表
         *
         * @param type TableEnum.Enum.HXHHunterEnum  猎人卡片分类, 默认按照等级分类
         *
         * @returns Array 经过排序之后的猎人ID数组
         */
        PlayerHunterSystem.GetHunterList = function (type) {
            var _type = (type == null) ? zj.TableEnum.Enum.HXHHunterEnum.Level : type;
            var _hunters = [];
            for (var k in zj.Game.PlayerHunterSystem.mapHunters) {
                if (zj.Game.PlayerHunterSystem.mapHunters.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerHunterSystem.mapHunters[k];
                    if (v != null
                        && v.level > 0
                        && v.is_ware == false) {
                        var table = PlayerHunterSystem.Table(k);
                        if (table != null &&
                            table != undefined &&
                            table.is_open == 1) {
                            _hunters.push(v);
                        }
                    }
                }
            }
            if (_type == zj.TableEnum.Enum.HXHHunterEnum.Level) {
                // descend
                _hunters.sort(function (a, b) {
                    if (a.level == b.level) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                if (gnr_a.aptitude == gnr_b.aptitude) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                }
                                else {
                                    return gnr_b.aptitude - gnr_a.aptitude;
                                }
                            }
                            else {
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        }
                        else {
                            return b.star - a.star;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                });
            }
            else if (_type == zj.TableEnum.Enum.HXHHunterEnum.Star) {
                _hunters.sort(function (a, b) {
                    if (a.star == b.star) {
                        if (a.awakePassive.level == b.awakePassive.level) {
                            if (a.level == b.level) {
                                var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                if (gnr_a.aptitude == gnr_b.aptitude) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                }
                                else {
                                    return gnr_b.aptitude - gnr_a.aptitude;
                                }
                            }
                            else {
                                return b.level - a.level;
                            }
                        }
                        else {
                            return b.awakePassive.level - a.awakePassive.level;
                        }
                    }
                    else {
                        return b.star - a.star;
                    }
                });
            }
            else if (_type == zj.TableEnum.Enum.HXHHunterEnum.Quality) {
                _hunters.sort(function (a, b) {
                    var gnr_a = PlayerHunterSystem.Table(a.general_id);
                    var gnr_b = PlayerHunterSystem.Table(b.general_id);
                    if (gnr_a.aptitude == gnr_b.aptitude) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                }
                                else {
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            }
                            else {
                                return b.star - a.star;
                            }
                        }
                        else {
                            return b.level - a.level;
                        }
                    }
                    else {
                        return gnr_b.aptitude - gnr_a.aptitude;
                    }
                });
            }
            var result = [];
            for (var i = 0; i < _hunters.length; i++) {
                var v = _hunters[i];
                result.push(v.general_id);
            }
            return result;
        };
        /**
         * 获取碎片ID列表
         *
         * @param level 等级，默认0
         *
         * @returns Array 经过排序之后的碎片ID数组
         *
         * @description 武将碎片排序（开启 > 可召唤 > 武将品质 > 武将ID）
         */
        PlayerHunterSystem.GetHunterSoulList = function (level) {
            if (level === void 0) { level = 0; }
            var generalSoul = zj.TableItemGeneralSoul.Table();
            var _souls = [];
            for (var k in generalSoul) {
                if (generalSoul.hasOwnProperty(k)) {
                    var v = generalSoul[k];
                    var soulTbl = PlayerHunterSystem.SoulIdFindGeneral(v.id);
                    var count = zj.Game.PlayerItemSystem.itemCount(v.id);
                    if (count == null)
                        count = 0;
                    var is_open = soulTbl.is_open;
                    var soul_count = soulTbl.soul_count;
                    var can_call = (count >= soul_count) ? 1 : 0;
                    var _tbl = {
                        id: v.id,
                        count: count,
                        is_open: is_open,
                        soul_count: soul_count,
                        can_call: can_call
                    };
                    if (level == 0) {
                        _souls.push(_tbl);
                    }
                    else {
                        if (soulTbl.aptitude == level) {
                            _souls.push(_tbl);
                        }
                    }
                }
            }
            _souls.sort(function (a, b) {
                if (a.is_open == b.is_open) {
                    if (a.can_call == b.can_call) {
                        var soul_a = PlayerHunterSystem.SoulIdFindGeneral(a.id);
                        var soul_b = PlayerHunterSystem.SoulIdFindGeneral(b.id);
                        if (soul_a.aptitude == soul_b.aptitude) {
                            if (soul_a.client_sort == soul_b.client_sort) {
                                return b.id - a.id;
                            }
                            else {
                                return soul_a.client_sort - soul_b.client_sort;
                            }
                        }
                        else {
                            return soul_b.aptitude - soul_a.aptitude;
                        }
                    }
                    else {
                        return b.can_call - a.can_call;
                    }
                }
                else {
                    return b.is_open - a.is_open;
                }
            });
            var result = [];
            for (var i = 0; i < _souls.length; i++) {
                var v = _souls[i];
                result.push(v.id);
            }
            return result;
        };
        /**
         * 获取所属武将头像
         * */
        PlayerHunterSystem.Head = function (generalId) {
            function _get_head(generalId, transfer, vis) {
                if (transfer === void 0) { transfer = null; }
                var info_gnr = PlayerHunterSystem.Table(generalId, transfer);
                var hero_head = "";
                var bTransfer = transfer > 0;
                if (bTransfer && vis) {
                    var info_map = zj.TableMapRole.Item(info_gnr.transfer_role);
                    hero_head = info_map.head_path;
                }
                else {
                    var info_map = zj.TableMapRole.Item(info_gnr.general_roleId);
                    var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
                    var fashion_id = generalInfo == null ? null : (generalInfo.fashionId == 0 ? false : true);
                    var bFashionWear = fashion_id;
                    var bFashionHave = true; // info_map.fashion != -1;
                    var bFashionSame = true;
                    var bFashion = bFashionWear && bFashionHave && bFashionSame;
                    hero_head = bFashion && zj.TableMapRole.Item(zj.TableItemFashion.Item(generalInfo.fashionId).fashion_roleId).head_path || info_map.head_path;
                }
                return hero_head;
            }
            if (typeof generalId != "number") {
                // 服务器透传部分
                // let info = generalId;
                var info = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) {
                    return v.general_id == generalId.general_id;
                })[0];
                if (info) {
                    return _get_head(info.general_id, info.transfer_level, info.fashionId);
                }
                else {
                    return _get_head(generalId.general_id);
                }
            }
            else {
                // 默认自己武将的头像fashionId
                var info = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) {
                    return v.general_id == generalId;
                })[0];
                if (info) {
                    return _get_head(generalId, info.transfer_level, info.fashionId);
                }
                else {
                    return _get_head(generalId);
                }
            }
        };
        PlayerHunterSystem.prototype.GeneralTransferLevel = function (generalId) {
            var generalMsg = this.queryHunter(generalId);
            var transfer_level = 0;
            if (generalMsg != null) {
                transfer_level = generalMsg.transfer_level;
            }
            return transfer_level;
        };
        /** 返回英雄品质框（圆） */
        PlayerHunterSystem.Frame = function (generalId) {
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            if (hunter == null)
                return "";
            var stepTable = zj.TableGeneralStep.Table();
            return stepTable[hunter.step].frame_path;
        };
        /**
         * 武将信息对应形象 ID
         */
        PlayerHunterSystem.GetGeneralRoleInfoID = function (id) {
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(id);
            var generalTbl = PlayerHunterSystem.Table(id);
            var picMapRoleId = generalTbl.general_roleId;
            if (generalInfo == null)
                return picMapRoleId;
            var fashionMapRoleInfo = PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId);
            var fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return fashionMapRoleId ? fashionMapRoleId : picMapRoleId;
        };
        /**
         * 获取突破信息
         * @param id 突破阶级, 范围1 - 9
         */
        PlayerHunterSystem.HunterBreak = function (id) {
            return zj.TableGeneralBreakup.Item(id);
        };
        /**
         * 获取突破属性信息
         *
         * @param id 武将ID, 范围10001 - 100774
         */
        PlayerHunterSystem.HunterBreakAttri = function (id) {
            return zj.TableGeneralBreak.Item(id);
        };
        /**
         * 获取突破等级上限
         * @param level 突破等级 1- 3
         *
         * @returns 元祖 [增加等级上限, 下一等级， 上一等级];
         */
        PlayerHunterSystem.GetBreakHunterLevel = function (level) {
            var tbl = zj.TableGeneralBreakup.Table();
            var levelAdd = PlayerHunterSystem.HunterBreak(level).add_level;
            var levelNext = zj.Table.Add(1, level + 1, function (i) {
                return tbl[i].add_level;
            });
            var levelPre = zj.Table.Add(1, level + 1, function (i) {
                return tbl[i].add_level;
            });
            return [levelAdd, levelNext, levelPre];
        };
        /**
         * 猎人时装
         */
        PlayerHunterSystem.GetFahionInfo = function (id) {
            if (id == null || id == undefined || id == -1)
                return null;
            return zj.TableItemFashion.Item(id);
        };
        /**
         * 羁绊洞提升属性获取
         * @param generalId
         * @param step
         * @param pos
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetHoleValueTbl = function (generalId, step, pos) {
            var result = zj.Helper.CreateGeneralAttrTbl();
            var quality_partner = PlayerHunterSystem.Table(generalId).quality_partner;
            var holeId = quality_partner[step][pos - 1];
            var tbl = zj.TableGeneralHole.Item(holeId);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i <= zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i - 1]];
                if (value != null) {
                    result[i - 1] = value;
                }
            }
            return result;
        };
        /**
         *
         * @param generalId
         * @param step
         * @param holeId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetHoleValueText = function (generalId, step, holeId) {
        };
        /**
         *
         * @param generalId
         * @param holeId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetHole = function (generalId, holeId) {
            var partner_lv = zj.Game.PlayerHunterSystem.queryHunter(generalId).step;
            partner_lv = partner_lv + 1;
            var table = PlayerHunterSystem.Table(generalId);
            if (table == null)
                return null;
            var hole_ids = table.quality_partner;
            var hole_id = hole_ids[partner_lv - 1][holeId - 1];
            return zj.TableGeneralHole.Item(hole_id);
        };
        /**
         * 查询羁绊卡洞激活等级
         * @param generalId
         * @param holeId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetHoleLevel = function (generalId, holeId) {
            return PlayerHunterSystem.GetStep(generalId).general_pos[holeId - 1];
        };
        /**
         * 查询品阶
         * @param generalId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetStep = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            return zj.TableGeneralStep.Item(hunterInfo.step);
        };
        /**
         * 查询下一品阶
         * @param generalId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetNextStep = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            return zj.TableGeneralStep.Item(hunterInfo.step + 1);
        };
        /**
         * 查询羁绊卡洞最大等级阶数
         * @param lv
         *
         * @default from db_hole.lua
         */
        PlayerHunterSystem.GetHoleLevelMax = function (lv) {
        };
        /**
         * 查询羁绊卡表格
         * @param generalId
         * @param holeId 1 - 4
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetPartner = function (generalId, holeId) {
            var partner_lv = zj.Game.PlayerHunterSystem.mapHunters[generalId].step + 1;
            var table = PlayerHunterSystem.Table(generalId);
            if (table == null)
                return null;
            var hole_ids = table.quality_partner;
            var hole_id = hole_ids[partner_lv - 1][holeId - 1];
            var hole_info = zj.TableGeneralHole.Item(hole_id);
            var partner_info = zj.TableItemPartner.Item(hole_info.partner_id);
            return partner_info;
        };
        /**
         * 查询羁绊卡碎片表格
         * @param partnerId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetPartnerSplit = function (partnerId) {
        };
        /**
         * 查询武将羁绊卡等级
         *
         * @param generalId
         * @param partnerId
         *
         * @description from db_hole.lua
         */
        PlayerHunterSystem.GetPartnerLv = function (generalId, partnerId) {
            var general = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            if (general.partner.length == 0 && general.step == zj.CommonConfig.general_max_quality) {
                return general.step;
            }
            else {
                for (var i = 0; i < general.partner.length; i++) {
                    var v = general.partner[i];
                    if (v == partnerId) {
                        return general.step + 1;
                    }
                }
                return general.step;
            }
        };
        /**
         * 查询玩家武将经验值
         *
         * 元组返回 当前经验值 总经验值 当前经验值于总经验值百分比
         * */
        PlayerHunterSystem.Exp = function (generalId) {
            var general = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var generalInfo = PlayerHunterSystem.Table(generalId);
            var level = null;
            if (general.level != null) {
                level = zj.TableLevel.Item(general.level);
            }
            var expNow = general.exp;
            var expNext = (level != null) ? level.general_exp[generalInfo.aptitude % 10 - 1] : 0;
            var expPercent = (expNow / expNext > 1.0) ? 1.0 : expNow / expNext;
            return [expNow, expNext, expPercent];
        };
        /**
         *升多级查询经验
         *
         * @static
         * @param {number} generalId 武将等级
         * @param {number} maxLevel 当前阶级最大等级与最大等级中小的一个
         * @memberof PlayerHunterSystem
         */
        PlayerHunterSystem.ExpFive = function (generalId, maxLevel) {
            var general = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var upLevel = Math.min(general.level + 5, maxLevel);
            var generalInfo = PlayerHunterSystem.Table(generalId);
            var expNow = general.exp;
            var expNext = 0;
            for (var i = general.level; i < upLevel; i++) {
                var level = null;
                if (general.level != null) {
                    level = zj.TableLevel.Item(i);
                    expNext += (level != null) ? level.general_exp[generalInfo.aptitude % 10 - 1] : 0;
                }
            }
            return [expNow, expNext];
        };
        /** 查询玩家武将碎片值 */
        PlayerHunterSystem.Soul = function (generaId) {
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(generaId);
            var baseGeneral = PlayerHunterSystem.Table(generaId);
            var soulNow = zj.Game.PlayerItemSystem.itemCount(generaId);
            if (hunter.star == zj.CommonConfig.general_max_star) {
                return [soulNow, 0, 1];
            }
            var soulNext = (hunter.level == 0) ? baseGeneral.soul_count : baseGeneral.up_star_soul[hunter.star];
            var soulPercent = (soulNow / soulNext) > 1.0 ? 1.0 : (soulNow / soulNext);
            return [soulNow, soulNext, soulPercent];
        };
        /**
         * 在防守阵容中的猎人
         *
         * @returns 二维数组 [[],[]], 小数组里面有两个值，第一个是id，第二个值是类型
         */
        PlayerHunterSystem.GeneralsIdInDefence = function () {
            var defenceList = [];
            var curFormations = zj.Game.PlayerFormationSystem.curFormations;
            // if (curFormations == null || curFormations.length < 7) {
            //     return defenceList;
            // }
            var formation = curFormations[message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE - 1];
            var _loop_1 = function (index) {
                var v = formation.generals[index];
                if (v != 0) {
                    var find = zj.Table.FindF(defenceList, function (_k, _v) {
                        return _v[0] == v;
                    });
                    if (!find) {
                        defenceList.push([v, 1]);
                    }
                }
            };
            for (var index = 0; index < formation.generals.length; index++) {
                _loop_1(index);
            }
            var _loop_2 = function (index) {
                var v = formation.supports[index];
                if (v != 0) {
                    var find = zj.Table.FindF(defenceList, function (_k, _v) {
                        return _v[0] == v;
                    });
                    if (!find) {
                        defenceList.push([v, 1]);
                    }
                }
            };
            for (var index = 0; index < formation.supports.length; index++) {
                _loop_2(index);
            }
            for (var k in zj.Game.PlayerFormationSystem.formatsSingleDefine) {
                if (zj.Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleDefine[k];
                    var _loop_3 = function (index) {
                        var vv = v.generals[index];
                        if (vv != 0) {
                            var find = zj.Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 2]);
                            }
                        }
                    };
                    for (var index = 0; index < v.generals.length; index++) {
                        _loop_3(index);
                    }
                    var _loop_4 = function (index) {
                        var vv = v.supports[index];
                        if (vv != 0) {
                            var find = zj.Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 2]);
                            }
                        }
                    };
                    for (var index = 0; index < v.supports.length; index++) {
                        _loop_4(index);
                    }
                }
            }
            for (var k in zj.Game.PlayerFormationSystem.formatsGroupFight) {
                if (zj.Game.PlayerFormationSystem.formatsGroupFight.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerFormationSystem.formatsGroupFight[k];
                    var _loop_5 = function (index) {
                        var vv = v.generals[index];
                        if (vv != 0) {
                            var find = zj.Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 4]);
                            }
                        }
                    };
                    for (var index = 0; index < v.generals.length; index++) {
                        _loop_5(index);
                    }
                    var _loop_6 = function (index) {
                        var vv = v.supports[index];
                        if (vv != 0) {
                            var find = zj.Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 4]);
                            }
                        }
                    };
                    for (var index = 0; index < v.supports.length; index++) {
                        _loop_6(index);
                    }
                }
            }
            for (var _ in zj.Game.PlayerInstanceSystem.SearchInfo) {
                if (zj.Game.PlayerInstanceSystem.SearchInfo.hasOwnProperty(_)) {
                    var v = zj.Game.PlayerInstanceSystem.SearchInfo[_];
                    var _loop_7 = function (_1) {
                        if (v.generalId.hasOwnProperty(_1)) {
                            var vv_1 = v.generalId[_1];
                            if (vv_1 != 0) {
                                var find = zj.Table.FindF(defenceList, function (_k, _v) {
                                    return _v[0] == vv_1;
                                });
                                if (!find) {
                                    defenceList.push([vv_1, 3]);
                                }
                            }
                        }
                    };
                    for (var _1 in v.generalId) {
                        _loop_7(_1);
                    }
                }
            }
            // TO DO
            // 副本信息 
            return defenceList;
        };
        /**
         * 武将出售排序
         *
         * @param type 排序类型
         *
         * 返回经过排序的武将ID
         */
        PlayerHunterSystem.GetSellHunterList = function (type) {
            type = type == null ? zj.TableEnum.Enum.HXHHunterEnum.Level : type;
            var max_star_limit = 5;
            var hunters = [];
            var defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            var generalsMap = zj.Table.DeepCopy(zj.Game.PlayerHunterSystem.allHuntersMap());
            var _loop_8 = function (k) {
                if (generalsMap.hasOwnProperty(k)) {
                    var v_1 = generalsMap[k];
                    var baseGeneralInfo = PlayerHunterSystem.Table(Number(k));
                    if (v_1 != null
                        && baseGeneralInfo != null
                        && v_1.level > 0
                        && v_1.star < max_star_limit
                        && !v_1.is_ware
                        && baseGeneralInfo.is_open == 1
                        && baseGeneralInfo.aptitude != 14) {
                        var findInDefence = zj.Table.FindF(defenceGenerals, function (_k, _v) {
                            return _v[0] == v_1.general_id;
                        });
                        var sellGeneralInfo = zj.Table.DeepCopy(v_1);
                        sellGeneralInfo.b_defence = findInDefence ? 1 : 0;
                        hunters.push(sellGeneralInfo);
                    }
                }
            };
            for (var k in generalsMap) {
                _loop_8(k);
            }
            if (type === zj.TableEnum.Enum.HXHHunterEnum.Level) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) {
                                        return gnr_a.general_id - gnr_b.general_id;
                                    }
                                    else {
                                        return gnr_a.aptitude - gnr_b.aptitude;
                                    }
                                }
                                else {
                                    return a.awakePassive.level - b.awakePassive.level;
                                }
                            }
                            else {
                                return a.star - b.star;
                            }
                        }
                        else {
                            return a.level - b.level;
                        }
                    }
                    else {
                        return a.b_defence - b.b_denfence;
                    }
                });
            }
            else if (type === zj.TableEnum.Enum.HXHHunterEnum.Star) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) {
                                        return gnr_a.general_id - gnr_b.general_id;
                                    }
                                    else {
                                        return gnr_a.aptitude - gnr_b.aptitude;
                                    }
                                }
                                else {
                                    return a.level - b.level;
                                }
                            }
                            else {
                                return a.awakePassive.level - b.awakePassive.level;
                            }
                        }
                        else {
                            return a.star - b.star;
                        }
                    }
                    else {
                        return a.b_defence - b.b_defence;
                    }
                });
            }
            else if (type === zj.TableEnum.Enum.HXHHunterEnum.Quality) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        var gnr_a = PlayerHunterSystem.Table(a.general_id);
                        var gnr_b = PlayerHunterSystem.Table(b.general_id);
                        if (gnr_a.aptitude == gnr_b.aptitude) {
                            if (a.level == b.level) {
                                if (a.star == b.star) {
                                    if (a.awakePassive.level == b.awakePassive.level) {
                                        return gnr_a.general_id - gnr_b.general_id;
                                    }
                                    else {
                                        return a.awakePassive.level - b.awakePassive.level;
                                    }
                                }
                                else {
                                    return a.star - b.star;
                                }
                            }
                            else {
                                return a.level - b.level;
                            }
                        }
                        else {
                            return gnr_a.aptitude - gnr_b.aptitude;
                        }
                    }
                    else {
                        return a.b_defence - b.b_defence;
                    }
                });
            }
            var result = [];
            for (var index = 0; index < hunters.length; index++) {
                var v = hunters[index];
                result.push(v.general_id);
            }
            return result;
        };
        /**
         * 武将仓库排序
         * @param type 类型
         * @param beWare 是否在仓库中
         */
        PlayerHunterSystem.GetWareHunterList = function (type, beWare) {
            if (type === void 0) { type = zj.TableEnum.Enum.HXHHunterEnum.Level; }
            var hunters = [];
            var defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            message.GeneralInfo;
            var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
            var _loop_9 = function (k) {
                if (generalsMap.hasOwnProperty(k)) {
                    var v_2 = generalsMap[k];
                    var baseGeneralInfo = PlayerHunterSystem.Table(Number(k));
                    if (v_2 != null
                        && v_2.level > 0
                        && v_2.is_ware == beWare
                        && baseGeneralInfo != null
                        && baseGeneralInfo.is_open == 1) {
                        var findInDefence = zj.Table.FindF(defenceGenerals, function (_, _v) {
                            return _v[0] == v_2.general_id;
                        });
                        v_2.b_defence = findInDefence ? 1 : 0;
                        hunters.push(v_2);
                    }
                }
            };
            for (var k in generalsMap) {
                _loop_9(k);
            }
            if (type == zj.TableEnum.Enum.HXHHunterEnum.Level) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) {
                                        return gnr_b.general_id - gnr_a.general_id;
                                    }
                                    else {
                                        return gnr_b.aptitude - gnr_a.aptitude;
                                    }
                                }
                                else {
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            }
                            else {
                                return b.star - a.star;
                            }
                        }
                        else {
                            return b.level - a.level;
                        }
                    }
                    else {
                        return a.b_defence - b.b_defence;
                    }
                });
            }
            else if (type == zj.TableEnum.Enum.HXHHunterEnum.Star) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    var gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    var gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) {
                                        return gnr_b.general_id - gnr_a.general_id;
                                    }
                                    else {
                                        return gnr_b.aptitude - gnr_a.aptitude;
                                    }
                                }
                                else {
                                    return b.level - a.level;
                                }
                            }
                            else {
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        }
                        else {
                            return b.star - a.star;
                        }
                    }
                    else {
                        return a.b_defence - b.b_defence;
                    }
                });
            }
            else if (type == zj.TableEnum.Enum.HXHHunterEnum.Quality) {
                hunters.sort(function (a, b) {
                    if (a.b_defence == b.b_defence) {
                        var gnr_a = PlayerHunterSystem.Table(a.general_id);
                        var gnr_b = PlayerHunterSystem.Table(b.general_id);
                        if (gnr_a.aptitude == gnr_b.aptitude) {
                            if (a.level == b.level) {
                                if (a.star == b.star) {
                                    if (a.awakePassive.level == b.awakePassive.level) {
                                        return gnr_b.general_id - gnr_a.general_id;
                                    }
                                    else {
                                        return b.awakePassive.level - a.awakePassive.level;
                                    }
                                }
                                else {
                                    return b.star - a.star;
                                }
                            }
                            else {
                                return b.level - a.level;
                            }
                        }
                        else {
                            return gnr_b.aptitude - gnr_a.aptitude;
                        }
                    }
                    else {
                        return a.b_defence - b.b_defence;
                    }
                });
            }
            var result = [];
            for (var i = 0; i < hunters.length; i++) {
                var v = hunters[i];
                result.push(v.general_id);
            }
            return result;
        };
        /** 单个武将的升星系数表 */
        PlayerHunterSystem.GetGelStarRatioTbl = function (generalId, star) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (star == 0) {
                return result;
            }
            var tbl = zj.TableGeneralStar.Item(generalId);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i <= zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var t = tbl[zj.TableEnum.EnumGelAttribName[i - 1]];
                if (t != null) {
                    result[i - 1] = t[star - 1];
                }
            }
            return result;
        };
        /** 单个武将的基础属性输出 */
        PlayerHunterSystem.GetGelBaseValueTbl = function (generalId) {
            var tbl = PlayerHunterSystem.Table(generalId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i <= zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i - 1]];
                if (value != null) {
                    result[i - 1] = value;
                }
            }
            return result;
        };
        /** 单个武将的进阶数值表 */
        PlayerHunterSystem.GetGelQualityValueTbl = function (generalId, quality) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (quality == 0) {
                return result;
            }
            var tbl = zj.TableGeneralQuality.Item(generalId);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i <= zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var t = tbl[zj.TableEnum.EnumGelAttribName[i - 1]];
                if (t != null) {
                    result[i - 1] = t[quality - 1];
                }
            }
            return result;
        };
        /** 单个武将所有羁绊洞提升数值表 */
        PlayerHunterSystem.GetGelHoleValueTbl = function (generalId, partners, step) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            //if ( step == 0 ){ return result }
            if (partners != null) {
                for (var _i = 0, _a = zj.HelpUtil.GetKV(partners); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    if (v > 0) {
                        var holeTbl = PlayerHunterSystem.GetHoleValueTbl(generalId, step, v);
                        for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i <= zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                            result[i - 1] = result[i - 1] + holeTbl[i - 1];
                        }
                    }
                }
            }
            return result;
        };
        /** 单个武将工会技能附加数值 */
        PlayerHunterSystem.getGelLeagueValueTbl = function (baseAttr, generalId) {
            var result = zj.Helper.CreateGeneralAttrTbl();
            var list = zj.Game.PlayerLeagueSystem.getSkillList();
            if (list) {
                var features = PlayerHunterSystem.Table(generalId).features; // 1-攻击，2-防御，3-辅助
                var typeList = zj.Game.PlayerLeagueSystem.getSkillValueType(features);
                for (var i = 0; i < list.length; i++) {
                    if (typeList.indexOf(list[i].key) >= 0) {
                        var _a = zj.Game.PlayerLeagueSystem.getSkillValue(list[i].key, list[i].value), attType = _a[0], value = _a[1];
                        if (value != 0) {
                            result[attType - 1] += value;
                        }
                    }
                }
                // 如果是百分比，则转换为加成后的数值
                for (var i = 0; i < result.length; ++i) {
                    if (zj.Game.PlayerLeagueSystem.isSkillPercent(i + 1)) {
                        result[i] = baseAttr[i] * result[i] / 100;
                    }
                }
            }
            return result;
        };
        PlayerHunterSystem.HXHCalcCelCardAttr = function (baseAttr, cardsInfo) {
            var ret = zj.Helper.CreateGeneralAttrTbl();
            var talentSet = [];
            for (var k = 0; k < cardsInfo.length; k++) {
                var v = cardsInfo[k];
                var _a = zj.PlayerCardSystem.GetBaseAttri(v.id, v.star, v.level), value = _a[0], percent = _a[1];
                var _b = zj.PlayerCardSystem.GetExtraAttriTbl(v), extraValue = _b[0], extraPercent = _b[1], eTalent = _b[4];
                for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                    if (value[i] != 0) {
                        ret[i] += value[i];
                    }
                    else if (percent[i] != 0) {
                        ret[i] += percent[i] / 100 * baseAttr[i];
                    }
                    if (extraValue[i] != 0) {
                        ret[i] += extraValue[i];
                    }
                    else if (extraPercent[i] != 0) {
                        ret[i] += extraPercent[i] / 100 * baseAttr[i];
                    }
                }
                for (var i = 0; i < eTalent.length; i++) {
                    var v_3 = eTalent[i];
                    talentSet.push(v_3);
                }
            }
            return [ret, talentSet];
        };
        PlayerHunterSystem.GetAwakeLevelAttr = function (generalId, level) {
            var baseGelId = PlayerHunterSystem.GetGeneralId(generalId);
            var tbl = zj.TableHunterAwake.Item(baseGelId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (level == 0 || tbl == null) {
                return result;
            }
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i]];
                if (value != null && value[level - 1] != null) {
                    result[i] = value[level - 1];
                }
            }
            return result;
        };
        PlayerHunterSystem.GetBreakLevelAttr = function (generalId, level) {
            var baseGelId = PlayerHunterSystem.GetGeneralId(generalId);
            var tbl = zj.TableGeneralBreak.Item(baseGelId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (level == 0 || tbl == null) {
                return result;
            }
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i]];
                if (value != null && value[level - 1] != null) {
                    result[i] = value[level - 1];
                }
            }
            return result;
        };
        PlayerHunterSystem.IsAwakeProPercent = function (eAttr) {
            return (eAttr == zj.TableEnum.EnumGelAttrib.ATTR_HP || eAttr == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK || eAttr == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF);
        };
        PlayerHunterSystem.HXHCalcAwakeAttrValue = function (baseAttr, generalId, awakenPassive) {
            var attrTbl = PlayerHunterSystem.GetAwakeLevelAttr(generalId, awakenPassive.level);
            var result = zj.Helper.CreateGeneralAttrTbl();
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (PlayerHunterSystem.IsAwakeProPercent(i + 1)) {
                    result[i] = baseAttr[i] * attrTbl[i] / 100;
                }
                else {
                    result[i] = attrTbl[i];
                }
            }
            return result;
        };
        PlayerHunterSystem.HXHCalcCelPsychicAttr = function (baseAttr, generalId, psyInfos) {
            var ret = zj.Helper.CreateGeneralAttrTbl();
            var genTbl = PlayerHunterSystem.Table(generalId);
            for (var i = 0; i < psyInfos.length; i++) {
                var psyId = genTbl.psychic_unlock_six[i];
                var tblInfo = zj.TableGeneralPsychicAttri.Item(psyId);
                if (tblInfo.object_type == 1) {
                    ret[tblInfo.attri_type - 1] = ret[tblInfo.attri_type - 1] + tblInfo.attri_value[psyInfos[i].level - 1];
                }
                else if (tblInfo.object_type == 2) {
                    ret[tblInfo.attri_type - 1] = ret[tblInfo.attri_type - 1] + tblInfo.attri_value[psyInfos[i].level - 1] / 100 * baseAttr[tblInfo.attri_type - 1];
                }
            }
            return ret;
        };
        PlayerHunterSystem.HXHCalcCelBreakUpAttr = function (baseAttr, generalId, breakLevel) {
            var attrTbl = PlayerHunterSystem.GetBreakLevelAttr(generalId, breakLevel);
            var result = zj.Helper.CreateGeneralAttrTbl();
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                result[i] = attrTbl[i];
            }
            return result;
        };
        /**
         * from db_equip.lua
         */
        PlayerHunterSystem.GetLevelAttri = function (attrId, level) {
            var tbl = zj.TableGeneralEquipAttri.Item(attrId);
            var attri = zj.Table.Add(0, level, function (id) {
                return tbl.attri_add[id];
            });
            return attri;
        };
        PlayerHunterSystem.GetStepAttri1 = function (generalInfo, attrId, step) {
            var tbl = zj.TableGeneralEquipAttri.Item(attrId);
            var info = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(generalInfo)[0];
            var attri_type = tbl.attri_type;
            var value = info[attri_type - 1];
            var attri = zj.Table.Add(0, step, function (id) {
                return tbl.attri_add[id];
            });
            return value * (attri / 100);
        };
        /**
         * from db_equip.lua
         */
        PlayerHunterSystem.GetBaseAttri = function (generalInfo, id, step, level) {
            var tbl = zj.TableGeneralEquip.Item(id);
            var result = zj.Helper.CreateGeneralAttrTbl();
            var percent = zj.Helper.CreateGeneralAttrTbl();
            if (tbl == null) {
                return [result, percent];
            }
            var levelAttri = 0;
            for (var i = 0; i < level; i++) {
                levelAttri = PlayerHunterSystem.GetLevelAttri(tbl.main_attri, level);
            }
            var _a = [0, 0], stepAttri1 = _a[0], stepAttri2 = _a[1];
            for (var i = 1; i <= step; i++) {
                stepAttri1 = PlayerHunterSystem.GetStepAttri1(generalInfo, tbl.add_attri_one, step);
                if (tbl.add_attri_two != null && tbl.add_attri_two != "") {
                    stepAttri2 = PlayerHunterSystem.GetStepAttri1(generalInfo, tbl.add_attri_two, step);
                }
            }
            var attriTbl = zj.TableGeneralEquipAttri.Item(tbl.main_attri);
            var main_attri_type = attriTbl.attri_type;
            var add_attri1 = zj.TableGeneralEquipAttri.Item(tbl.add_attri_one).attri_type;
            var add_attri2 = null;
            if (tbl.add_attri_two != null && tbl.add_attri_two != "") {
                add_attri2 = zj.TableGeneralEquipAttri.Item(tbl.add_attri_two).attri_type;
            }
            if (add_attri2 == null) {
                if (main_attri_type == add_attri1) {
                    result[attriTbl.attri_type - 1] = levelAttri + stepAttri1 + stepAttri2;
                }
                else {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri1 - 1] = stepAttri1;
                }
            }
            else {
                if (main_attri_type == add_attri1 && main_attri_type == add_attri2) {
                    result[attriTbl.attri_type - 1] = levelAttri + stepAttri1 + stepAttri2;
                }
                else if (main_attri_type == add_attri1 && main_attri_type != add_attri2) {
                    result[main_attri_type - 1] = levelAttri + stepAttri1;
                    result[add_attri2 - 1] = stepAttri2;
                }
                else if (main_attri_type == add_attri2 && main_attri_type != add_attri1) {
                    result[main_attri_type - 1] = levelAttri + stepAttri2;
                    result[add_attri1 - 1] = stepAttri1;
                }
                else if (main_attri_type != add_attri2 && main_attri_type != add_attri1 && add_attri2 == add_attri1) {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri2 - 1] = stepAttri1 + stepAttri2;
                }
                else if (main_attri_type != add_attri2 && main_attri_type != add_attri1 && add_attri2 != add_attri1) {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri1 - 1] = stepAttri1;
                    result[add_attri2 - 1] = stepAttri2;
                }
            }
            return [result, percent];
        };
        PlayerHunterSystem.HXHCalcCelEquipAttr = function (generalInfo, baseAttr, equipInfo) {
            var ret = zj.Helper.CreateGeneralAttrTbl();
            for (var i = 0; i < equipInfo.length; i++) {
                var v = equipInfo[i];
                var value = PlayerHunterSystem.GetBaseAttri(generalInfo, v.equipId, v.step, v.level)[0];
                for (var i_1 = 0; i_1 < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i_1++) {
                    if (value[i_1] && value[i_1] != 0) {
                        ret[i_1] += value[i_1];
                    }
                }
            }
            return ret;
        };
        /** 突破等级 */
        PlayerHunterSystem.GetLevelByBreak = function (generalInfo) {
            var _a = [0, 0, 0], breakLevel1 = _a[0], breakLevel2 = _a[1], breakLevel3 = _a[2];
            var _loop_10 = function (i) {
                var skill = generalInfo.using_break_skill[i] ? generalInfo.using_break_skill[i] : 0;
                var levelInfo = zj.Table.FindR(generalInfo.break_skill, function (_k, _v) {
                    return _v.key == skill;
                })[0];
                if (levelInfo != null) {
                    if (i == 0) {
                        breakLevel1 = levelInfo.value;
                    }
                    else if (i == 1) {
                        breakLevel2 = levelInfo.value;
                    }
                    else if (i == 2) {
                        breakLevel3 = levelInfo.value;
                    }
                }
            };
            for (var i = 0; i < 3; i++) {
                _loop_10(i);
            }
            return [breakLevel1, breakLevel2, breakLevel3];
        };
        /**
         * 猎人统一战力测试用计算
         *
         * @param attrTbl 属性信息
         * @param generalInfo 武将信息
         *
         * @description 自动技等级，手动技等级，被动技等级，觉醒技等级，突破技能1,2,3,攻击，暴击，暴击伤害，生命值，防御，暴击抵抗，速度，效果命中，效果抵抗，格挡率.
         */
        PlayerHunterSystem.CalcHXHHeroPower = function (attrTbl, generalInfo) {
            var power = 0;
            if (attrTbl == null)
                return power;
            var _a = [0, 0, 0], skillLevel1 = _a[0], skillLevel2 = _a[1], initPassive = _a[2];
            if (generalInfo.skills[0] != null) {
                skillLevel1 = generalInfo.skills[0].level;
            }
            if (generalInfo.skills[1] != null) {
                skillLevel2 = generalInfo.skills[1].level;
            }
            if (generalInfo.passives[0] != null) {
                initPassive = generalInfo.passives[0].level;
            }
            var _b = PlayerHunterSystem.GetLevelByBreak(generalInfo), breakLevel1 = _b[0], breakLevel2 = _b[1], breakLevel3 = _b[2];
            var awakePassive = generalInfo.awakePassive.level;
            var equipInfo = PlayerHunterSystem.Table(generalInfo.general_id).equip_info;
            var equipId = equipInfo[equipInfo.length - 1];
            var _c = [0, 0], skillActivaLevel = _c[0], equip_level = _c[1];
            if (equipId != 0) {
                var baseEquipInfo = zj.TableGeneralEquip.Item(equipId);
                var skillLevel = baseEquipInfo.skillLevel;
                if (baseEquipInfo.skillActivaLevel.length > 0) {
                    skillActivaLevel = baseEquipInfo.skillActivaLevel[0];
                }
                for (var i = 0; i < generalInfo.equipInfo.length; i++) {
                    var v = generalInfo.equipInfo[i];
                    if (v.equipId == equipId && v.step >= skillActivaLevel) {
                        equip_level = skillLevel[v.step - 1];
                    }
                }
            }
            var general_hp = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_HP - 1]);
            var general_atk = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK - 1]);
            var general_def = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF - 1]);
            var atk_crit = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT - 1]);
            var crit_extra = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA - 1]);
            var crit_resistance = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS - 1]);
            var cd_speed = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED - 1]);
            var skill_atk = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_HTV - 1]);
            var skill_def = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_EVA - 1]);
            var dodge_rate = Math.ceil(attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE - 1]);
            power = zj.CommonConfig.hunter_calc_battervalue(skillLevel1, skillLevel2, initPassive, awakePassive, breakLevel1, breakLevel2, breakLevel3, equip_level, general_atk, atk_crit, crit_extra, general_hp, general_def, crit_resistance, cd_speed, skill_atk, skill_def, dodge_rate, zj.Game.PlayerAdviserSystem.adviser);
            return Math.ceil(power);
        };
        /**
         * 猎人 获得武将8种属性基础值(武将界面显示用)
         *
         * @return 元祖 [属性信息， 战斗值]
         */
        PlayerHunterSystem.HXHCalcGelBaseAttrToShow = function (generalInfo) {
            var result = PlayerHunterSystem.HXHGetGelBaseAttrByArgument(generalInfo.general_id, generalInfo.level, generalInfo.star, generalInfo.step, generalInfo.partner);
            return [result, PlayerHunterSystem.CalcHXHHeroPower(result, generalInfo)];
        };
        /**  猎人 获得武将8种属性基础值(战斗用 ) */
        PlayerHunterSystem.HXHCalcGelBaseAttrToBattle = function (generalInfo) {
            return PlayerHunterSystem.HXHGetGelBaseBattleAttrByArgument(generalInfo.general_id, generalInfo.level, generalInfo.star, generalInfo.step, generalInfo.partner);
        };
        PlayerHunterSystem.HXHGetGelBaseBattleAttrByArgument = function (id, level, star, step, partner) {
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (id == null || level == null || star == null || step == null) {
                return result;
            }
            var starRatioTbl = PlayerHunterSystem.GetGelStarRatioTbl(id, star);
            var baseValueTbl = PlayerHunterSystem.GetGelBaseValueTbl(id);
            var stepValueTbl = PlayerHunterSystem.GetGelQualityValueTbl(id, step);
            var holeTbl = PlayerHunterSystem.GetGelHoleValueTbl(id, partner, step);
            // 计算附加具体数值
            for (var j = 0; j < zj.TableEnum.EnumAttriReal.length; j++) {
                var i = zj.TableEnum.EnumAttriReal[j];
                var value = (10 + level / 1.2) * starRatioTbl[i - 1] +
                    stepValueTbl[i - 1] +
                    holeTbl[i - 1] +
                    baseValueTbl[i - 1];
                result[i - 1] = value;
            }
            result.unshift(0);
            return result;
        };
        /**
        * 计算猎人属性
        *
        * @param id 武将ID
        * @param level 等级
        * @param star 星级
        * @param step 阶级
        * @param partner 羁绊激活(1-4)
        */
        PlayerHunterSystem.HXHGetGelBaseAttrByArgument = function (id, level, star, step, partner) {
            var result = zj.Helper.CreateGeneralAttrTbl();
            if (id == null || level == null || star == null || step == null) {
                return result;
            }
            //    基础属性：包括等级、星级、进阶属性（1+2+3）
            //    基础属性：包括等级、星级、进阶属性（1+2+3
            //    1.等级、星级属性：等级*星级属性  （星级属性由Star表读取）
            //    2.进阶属性： 当前阶属性（由quality表读取） + 激活的孔所加总属性 （由hole表读取）
            //    3.武将基本属性（basegeneral表读取）
            var starRatioTbl = PlayerHunterSystem.GetGelStarRatioTbl(id, star);
            var baseValueTbl = PlayerHunterSystem.GetGelBaseValueTbl(id);
            var stepValueTbl = PlayerHunterSystem.GetGelQualityValueTbl(id, step);
            var holeTbl = PlayerHunterSystem.GetGelHoleValueTbl(id, partner, step);
            /**
             * 10种基础属性
             * 1-生命值, 2-攻击, 3-防御, 24-防御, 6-暴击率, 8-暴击率, 10-格挡率, 5-格挡率, 4-格挡率, 9-格挡率
             */
            for (var j = 0; j < zj.TableEnum.EnumHunterAttriShow.length; j++) {
                var i = zj.TableEnum.EnumHunterAttriShow[j] - 1;
                var value = (10 + level / 1.2) * starRatioTbl[i] + stepValueTbl[i] + holeTbl[i] + baseValueTbl[i];
                result[i] = value;
            }
            return result;
        };
        PlayerHunterSystem.Str_NameGr = function (generalId, generalStep) {
            var gnr = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var info = PlayerHunterSystem.Table(generalId);
            var step = (generalStep != null) ? generalStep : gnr.step;
            var strStep = zj.TableGeneralStep.Item(step).name;
            var str_name = "";
            if (gnr.level > 0) {
                str_name = zj.HelpUtil.textConfigFormat("%s Lv%d", strStep, gnr.level);
            }
            else {
                str_name = zj.HelpUtil.textConfigFormat("%s", info.general_name);
            }
            var color_name = zj.Helper.GetStepColor(step);
            return [str_name, color_name];
        };
        /** 查询是否拥有武将 */
        PlayerHunterSystem.GetHasGeneral = function (id) {
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(id);
            return id != 0 && hunter != null && hunter.level > 0;
        };
        /**
         * 出售武将（星级价格，养成消耗徽章价值，进阶花费）
         */
        PlayerHunterSystem.SellGeneralPrice = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var starNum = zj.CommonConfig.sell_general_money(hunterInfo.star);
            var holeNum = 0;
            var stepNum = 0;
            var generalInfo = PlayerHunterSystem.Table(generalId);
            for (var i = 0; i < hunterInfo.step; i++) {
                for (var k in generalInfo.quality_partner[i]) {
                    if (generalInfo.quality_partner[i].hasOwnProperty(k)) {
                        var v = generalInfo.quality_partner[i][k];
                        var holeInfo = zj.TableGeneralHole.Item(v);
                        if (holeInfo != null) {
                            var partnerId = holeInfo.partner_id;
                            var activateNum = holeInfo.activate_num;
                            var partnerInfo = zj.TableItemPartner.Item(partnerId);
                            holeNum += activateNum * partnerInfo.price;
                        }
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                var partnerLv = PlayerHunterSystem.GetPartnerLv(generalId, i);
                if (hunterInfo.step < partnerLv) {
                    // hole id
                    var partner_lv = hunterInfo.step + 1;
                    var hole_id = generalInfo.quality_partner[partner_lv][i];
                    // hole info
                    var hole_info = zj.TableGeneralHole.Item(hole_id);
                    var hole_num = hole_info.activate_num;
                    // partner info
                    var partner_price = zj.TableItemPartner.Item(hole_info.partner_id).price;
                    holeNum += partner_price * hole_num;
                }
            }
            // step 
            var stepTbl = zj.TableGeneralStep.Table();
            for (var i = 0; i < hunterInfo.step; i++) {
                stepNum += stepTbl[i].consume_money;
            }
            return (starNum + holeNum + stepNum);
        };
        /**
         * 猎人 获得武将8种属性附加值(武将界面显示用) 卡片属性、缘分属性
         * @param generalInfo 猎人信息
         */
        PlayerHunterSystem.HXHCalcGelOtherAttrToShow = function (generalInfo) {
            var generalId = generalInfo.general_id;
            var baseAttr = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(generalInfo)[0];
            var cardAttr = PlayerHunterSystem.HXHCalcCelCardAttr(baseAttr, generalInfo.potatoInfo)[0]; // 正在改
            var awakenAttr = PlayerHunterSystem.HXHCalcAwakeAttrValue(baseAttr, generalId, generalInfo.awakePassive);
            var psyAttr = PlayerHunterSystem.HXHCalcCelPsychicAttr(baseAttr, generalId, generalInfo.psychicInfo);
            var breakAttr = PlayerHunterSystem.HXHCalcCelBreakUpAttr(baseAttr, generalId, generalInfo.break_level);
            var equipAttr = PlayerHunterSystem.HXHCalcCelEquipAttr(generalInfo, baseAttr, generalInfo.equipInfo); //已改
            var transAttr = PlayerHunterSystem.HXHCalcCelTranAttr(generalInfo);
            var skinAttr = PlayerHunterSystem.getSkinProperty(baseAttr, generalInfo); //皮肤属性加成
            var league = PlayerHunterSystem.getGelLeagueValueTbl(baseAttr, generalId); // 工会技能加成
            var ret = zj.Helper.CreateGeneralAttrTbl();
            var attriArray = zj.TableEnum.EnumHunterAttriShow.slice();
            for (var j = 0; j < attriArray.length; j++) {
                var i = attriArray[j] - 1;
                var value = cardAttr[i] + awakenAttr[i] + psyAttr[i] + breakAttr[i] + equipAttr[i] + transAttr[i] + skinAttr[i] + league[i];
                ret[i] = value;
            }
            return ret;
        };
        /**
         * 查询npc
         *
         * from db_other.lua
         */
        PlayerHunterSystem.NpcDialog = function (npcId, talkId) {
            var talkInfo = zj.TableClientUiTalk.Item(npcId);
            var index = talkId ? talkId : Math.floor((Math.random() * talkInfo.dialog.length));
            var text = talkInfo.dialog[index];
            return text;
        };
        /**
        * -- 1、首先读general_skill表des字段，数值部分读skill_hurt_ratio字段，需要判断技能等级，计算当前等级下的数值 （基础数值+等级*成长数值）。
        * -- 2、在读取des字段的基本描述后需要判断是否有附加效果描述，新增两个字段：des_type  add_des
        * -- Des_type用来判断是否有附加效果及附加效果类型：
        * -- -1表示无附加效果，
        * -- 1表示有天赋效果，需要读取table_general_talent表中的talent_describe字段，
        * -- 2表示有BUFF效果，需要读取table_skill_buff中skill_des字段。
        * -- 可能会有多种情况，如一个技能既有天赋效果又有BUFF效果，或有两个BUFF效果等，Des_type可配多个，描述直接按顺序依次衔接。
        * -- Add_des 对应天赋或BUFF的ID，可配多个。
        * -- 3、升级效果
        * -- 基础升级效果直接读general_skill表upgrade_des字段，附加效果的升级效果描述需要读取下一级的des_type和add_des字段（没有就不加），两段描述直接衔接。
    
         * from db_skill.lua
         */
        PlayerHunterSystem.GetPassiveSkillDes = function (talendId, level) {
            var skillLevel = level ? level : 1;
            var talentInfo = zj.TableGeneralTalent.Item(talendId);
            var prob = talentInfo.trigger_rate[1]; // 触发基础概率及升级参数
            var des = "";
            if (prob != 0) {
                des += zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.talent_des_trigger, talentInfo.trigger_rate[0] + prob * skillLevel);
            }
            var param = [];
            // 天赋效果
            var effectInfo = zj.TableGeneralTalentEffect.Item(talentInfo.talent_effect[0]);
            if (effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2 ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON) {
                var buffId = effectInfo.effect_buffId;
                var buffInfo = zj.TableSkillBuff.Item(buffId);
                var paramList = [];
                if (buffInfo.des_param2.length > 0) {
                    for (var i = 0; i < buffInfo.des_param2.length; i++) {
                        var v = buffInfo.des_param2[i];
                        var value = v[0] + skillLevel * v[1];
                        paramList.push(Number((value).toFixed(1)));
                    }
                }
                else {
                    for (var i = 0; i < buffInfo.des_param.length; i++) {
                        var v = buffInfo.des_param[i];
                        var value = v[0] + skillLevel * v[1];
                        paramList.push(Number((value).toFixed(1)));
                    }
                }
                des += zj.Helper.StringFormat.apply(zj.Helper, [buffInfo.skill_des].concat(paramList));
                param = paramList.concat();
            }
            else {
                var paramList = [];
                for (var i = 0; i < talentInfo.talent_effect.length; i++) {
                    var v = talentInfo.talent_effect[i];
                    var effectTbl = zj.TableGeneralTalentEffect.Item(v);
                    var value = 0;
                    if (effectTbl.effect_value2.length > 0) {
                        value = effectTbl.effect_value2[0] + skillLevel * effectTbl.effect_value2[1];
                    }
                    else {
                        value = effectTbl.effect_value[0] + skillLevel * effectTbl.effect_value[1];
                    }
                    paramList.push(Number((value).toFixed(1)));
                }
                des += zj.Helper.StringFormat.apply(zj.Helper, [talentInfo.talent_describe].concat(paramList));
                param = paramList.concat();
            }
            return [des, param];
        };
        PlayerHunterSystem.GetPassiveSkillDesByType = function (talendId) {
            var info = zj.TableGeneralTalent.Item(talendId);
            return info ? info.skill_des : "";
        };
        /**
         * 被动技能显示（装备用）
         * @param id 技能ID
         * @param level 技能等级
         *
         * from db_skill.lua
         */
        PlayerHunterSystem.GetPassiveSkillEquipDes = function (id, level) {
            if (level === void 0) { level = 1; }
            var talentInfo = zj.TableGeneralTalent.Item(id);
            if (talentInfo == null) {
                return ["", []];
            }
            var value = talentInfo.trigger_rate[0];
            var prob = talentInfo.trigger_rate[1];
            var des = "";
            if (prob != 0) {
                des += zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.talent_des_trigger, value + prob * level);
            }
            var paramList = [];
            var effectInfo = zj.TableGeneralTalentEffect.Item(talentInfo.talent_effect[0]);
            if (effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2 ||
                effectInfo.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON) {
                var buffId = effectInfo.effect_buffId;
                var buffInfo = zj.TableSkillBuff.Item(buffId);
                if (buffInfo.des_param2.length > 0) {
                    for (var i = 0; i < buffInfo.des_param2.length; i++) {
                        var v = buffInfo.des_param2[i];
                        var value_1 = v[0] + level * v[1];
                        paramList.push(value_1);
                    }
                }
                else {
                    for (var i = 0; i < buffInfo.des_param.length; i++) {
                        var v = buffInfo.des_param[i];
                        var value_2 = v[0] + level * v[1];
                        paramList.push(value_2);
                    }
                }
                des = buffInfo.skill_des;
            }
            else {
                for (var i = 0; i < talentInfo.talent_effect.length; i++) {
                    var v = talentInfo.talent_effect[i];
                    var effectTbl = zj.TableGeneralTalentEffect.Item(v);
                    if (effectTbl.effect_value2.length > 0) {
                        var value_3 = effectTbl.effect_value2[0] + level * effectTbl.effect_value2[1];
                        paramList.push(value_3);
                    }
                    else {
                        var value_4 = effectTbl.effect_value[0] + level * effectTbl.effect_value[1];
                        paramList.push(value_4);
                    }
                }
                des = talentInfo.talent_describe;
            }
            return [des, paramList];
        };
        /**
         * 获取主动技能升级描述信息
         * from db_skill.lua
         */
        PlayerHunterSystem.GetActiveSkillUpgradeDes = function (skillId, level) {
            var skillLevel = level ? level : 1;
            var skillInfo = zj.TableGeneralSkill.Item(skillId);
            // 升级描速
            var upgradeDes = zj.Helper.StringFormat(skillInfo.upgrade_des, skillInfo.skill_hurt_ratio[0] + skillLevel * skillInfo.skill_hurt_ratio[1]);
            // 附加描述
            var talentDes = "";
            for (var i = 0; i < skillInfo.talent_des.length; i++) {
                var v = skillInfo.talent_des[i];
                var str = PlayerHunterSystem.GetPassiveSkillDes(Number(v), skillLevel)[0];
                talentDes += str;
            }
            // BUFF描述
            var buffDes = "";
            for (var i = 0; i < skillInfo.buff_des.length; i++) {
                var v = skillInfo.buff_des[i];
                var buffInfo = zj.TableSkillBuff.Item(v);
                var paramList = [];
                if (buffInfo.des_param2.length > 0) {
                    for (var i_2 = 0; i_2 < buffInfo.des_param2.length; i_2++) {
                        var vv = buffInfo.des_param2[i_2];
                        var value = vv[0] + skillLevel * vv[1];
                        if (Object.keys(value.toString()).length > 10) {
                            paramList.push(value.toFixed(1));
                        }
                        else {
                            paramList.push(value);
                        }
                    }
                }
                else {
                    for (var i_3 = 0; i_3 < buffInfo.des_param.length; i_3++) {
                        var vv = buffInfo.des_param[i_3];
                        var value = vv[0] + skillLevel * vv[1];
                        if (Object.keys(value.toString()).length > 10) {
                            paramList.push(value.toFixed(1));
                        }
                        else {
                            paramList.push(value);
                        }
                    }
                }
                buffDes += zj.Helper.StringFormat.apply(zj.Helper, [buffInfo.skill_des].concat(paramList));
            }
            return upgradeDes + talentDes + buffDes;
        };
        /**
         * 获取主动技能描述信息
         *
         * from db_skill.lua
         */
        PlayerHunterSystem.GetActiveSkillDes = function (skill_id, level) {
            if (level === void 0) { level = 1; }
            var skillInfo = zj.TableGeneralSkill.Item(skill_id);
            var des = zj.Helper.StringFormat(skillInfo.des, skillInfo.skill_hurt_ratio[0] + level * skillInfo.skill_hurt_ratio[1]);
            var talentDes = "";
            for (var i = 0; i < skillInfo.talent_des.length; i++) {
                var v = skillInfo.talent_des[i];
                var str = PlayerHunterSystem.GetPassiveSkillDes(Number(v), level)[0];
                talentDes += str;
            }
            var buffDes = "";
            for (var i = 0; i < skillInfo.buff_des.length; i++) {
                var v = skillInfo.buff_des[i];
                var buffInfo = zj.TableSkillBuff.Item(v);
                var paramList = [];
                if (buffInfo.des_param2.length != 0) {
                    for (var j = 0; j < buffInfo.des_param2.length; j++) {
                        var vv = buffInfo.des_param2[j];
                        var value = vv[0] + level * vv[1];
                        paramList.push(value);
                    }
                }
                else {
                    for (var j = 0; j < buffInfo.des_param.length; j++) {
                        var vv = buffInfo.des_param[j];
                        var value = vv[0] + level * vv[1];
                        paramList.push(value);
                    }
                }
                buffDes += zj.Helper.StringFormat.apply(zj.Helper, [buffInfo.skill_des].concat(paramList));
            }
            return des + talentDes + buffDes;
        };
        /**
         * 被动技能
         * from db_skill.lua
         */
        PlayerHunterSystem.GetTalentSkillLvList = function (talentId) {
            var ret = [];
            for (var i = 1; i <= zj.CommonConfig.general_max_skill_level; i++) {
                ret.push(PlayerHunterSystem.GetPassiveSkillDes(talentId, i)[0]);
            }
            return ret;
        };
        /**
         * 获取每一个等级技能信息列表
         * @param generalId 猎人ID
         *
         * @returns Array<any> any 字段描述
         * des: string,
         * name: string,
         * upList: Array<string>,
         * info: TableGeneralSkill or TableGeneralTalent
         *
         * from db_skill.lua
         */
        PlayerHunterSystem.GetSkillEachLvList = function (generalId, biographyShow) {
            var getNextLevel = function (info, id) {
                var skillId = Number(id);
                if (skillId != 0) {
                    var result = PlayerHunterSystem.GetActiveSkillUpgradeDes(skillId, Math.floor(skillId / 1000000));
                    info.upList.push(result);
                    return getNextLevel(info, zj.TableGeneralSkill.Item(skillId).uplevel_Id);
                }
                else {
                    return info;
                }
            };
            var baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var skillIdNext = 1000000;
            var ret = [];
            for (var i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                var v = baseGeneralInfo.skill_ids[i];
                var skillId = void 0;
                var des = "";
                if (biographyShow) {
                    skillId = v;
                    des = PlayerHunterSystem.GetActiveSkillDes(skillId, 0);
                }
                else {
                    skillId = hunterInfo.skills[i].level * skillIdNext + v % skillIdNext;
                    des = PlayerHunterSystem.GetActiveSkillDes(skillId, hunterInfo.skills[i].level);
                }
                var upList = [];
                upList.push(PlayerHunterSystem.GetActiveSkillUpgradeDes(v, 1));
                var info = zj.TableGeneralSkill.Item(v);
                var name_1 = info.skill_name;
                var result = getNextLevel({
                    "des": des,
                    "name": name_1,
                    "upList": upList,
                    "info": info
                }, info.uplevel_Id);
                ret.push(result);
            }
            if (baseGeneralInfo.init_passive[0] != 0) {
                var talTbl = zj.TableGeneralTalent.Item(baseGeneralInfo.init_passive[0]);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(talTbl.talent_id),
                    "info": talTbl
                });
            }
            if (baseGeneralInfo.awake_passive != 0) {
                var talTbl = zj.TableGeneralTalent.Item(baseGeneralInfo.awake_passive);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(talTbl.talent_id),
                    "info": talTbl
                });
            }
            var transferTbl = zj.TableGeneralTransfer.Item(generalId % zj.CommonConfig.general_id_to_index_multiple);
            //（猎人有变身技 and  变身技等级不是0 ） 显示变身技 
            if (transferTbl.transfer_skill != 0 && hunterInfo.transfer_level != 0) {
                var talTbl = zj.TableGeneralTalent.Item(transferTbl.transfer_skill);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(transferTbl.transfer_skill),
                    "info": talTbl
                });
            }
            return ret;
        };
        /**
         * AttriAdd
         * @param id The hunter's ID.
         * @param level The array's index.
         *
         * from db_skill.lua
         */
        PlayerHunterSystem.AttriAdd = function (id, level) {
            var generalId = id % zj.CommonConfig.general_id_to_index_multiple;
            var awakeInfo = zj.TableHunterAwake.Item(generalId);
            var result = zj.Helper.CreateGeneralAttrTbl();
            // if (level == 0) { // 0级 不显示当前属性信息
            //     return [result, []];
            // }
            level -= 1; // almost all array has 5 element, level range is 1 - 5,
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                var v = awakeInfo[zj.TableEnum.EnumGelAttribName[i]];
                if (v != null && v[level] != null) {
                    result[i] = v[level];
                }
            }
            var des = [];
            var attri = [];
            for (var i = 0; i < result.length; i++) {
                var v = result[i];
                if (v != 0) {
                    attri.push(v);
                    des.push(i);
                }
            }
            return [attri, des];
        };
        /**
         * SkillConsume
         * @param generalId The hunter's ID.
         *
         * @returns Object {"general_id": aptitude}
         * from db_skill.lua
         */
        PlayerHunterSystem.SkillConsume = function (generalId) {
            var aptitude = null;
            var baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo.aptitude > 12) {
                aptitude = zj.CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];
            }
            var result = [];
            var allHunterMap = zj.Game.PlayerHunterSystem.allHuntersMap();
            for (var kk in allHunterMap) {
                if (allHunterMap.hasOwnProperty(kk)) {
                    var vv = allHunterMap[kk];
                    if (vv != null &&
                        vv.general_id != generalId &&
                        vv.is_ware == false &&
                        vv.general_id % zj.CommonConfig.general_id_to_index_multiple == generalId % zj.CommonConfig.general_id_to_index_multiple) {
                        result.push(vv);
                    }
                }
            }
            var list = [[], [], []];
            var _loop_11 = function (i) {
                var v = result[i];
                var defenceTbl = PlayerHunterSystem.GeneralsIdInDefence();
                var isDefence = zj.Table.FindF(defenceTbl, function (_, _v) {
                    return _v[0] == v.general_id;
                });
                if (isDefence) {
                    list[1].push(v);
                }
                else {
                    list[0].push(v);
                }
            };
            for (var i = 0; i < result.length; i++) {
                _loop_11(i);
            }
            list[0].sort(PlayerHunterSystem.SkillSortGeneral);
            list[1].sort(PlayerHunterSystem.SkillSortGeneral);
            var count = null;
            if (aptitude != null) {
                count = zj.PlayerItemSystem.Count(aptitude);
            }
            if (count != null && count != 0) {
                for (var i = 0; i < count; i++) {
                    if (baseGeneralInfo.aptitude > 12) {
                        list[2].push({ "general_id": aptitude });
                    }
                }
            }
            var ret = [];
            for (var i = 0; i < list.length; i++) {
                var v = list[i];
                for (var j = 0; j < v.length; j++) {
                    var vv = v[j];
                    ret.push(vv);
                }
            }
            return ret;
        };
        PlayerHunterSystem.SkillSortGeneral = function (a, b) {
            var gnrA = PlayerHunterSystem.Table(a.general_id);
            var gnrB = PlayerHunterSystem.Table(b.general_id);
            if (gnrA.is_open != gnrB.is_open) {
                if (gnrA.is_open == 0)
                    return 1;
                if (gnrB.is_open == 0)
                    return -1;
            }
            if (a.step == b.step) {
                if (a.star == b.star) {
                    if (gnrA.aptitude == gnrB.aptitude) {
                        if (a.battleValue == b.battleValue) {
                            return PlayerHunterSystem.GetGeneralId(b.general_id) - PlayerHunterSystem.GetGeneralId(a.general_id);
                        }
                        else {
                            return b.battleValue - a.battleValue;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.star - a.star;
                }
            }
            else {
                return b.step - a.step;
            }
        };
        /**
         * 判断满足突破材料的猎人
         *
         * @param level 等级
         * @param generalId 猎人ID
         * @param break1所需突破数
         * @param type0:任意猎人 1：同名猎人
         * @returns Array 所有满足条件的猎人信息数组
         */
        PlayerHunterSystem.GetCanBreakHunter = function (level, generalId, break1) {
            var breakInfo = PlayerHunterSystem.HunterBreak(level);
            var zero = zj.Table.FindF(breakInfo.exchange_generals, function (_, v) {
                return v == 0;
            });
            var exchange_gnr = zero ? 0 : 1;
            var generalList = [];
            var allHunters = zj.Game.PlayerHunterSystem.allHuntersMap();
            var vis = true;
            if (level == 4) {
                vis = false;
            }
            var _loop_12 = function (kk) {
                if (allHunters.hasOwnProperty(kk)) {
                    var vv_2 = allHunters[kk];
                    if (vv_2 != null &&
                        vv_2.general_id != generalId &&
                        vv_2.break_level >= break1 &&
                        vv_2.star >= level &&
                        vv_2.awakePassive.level >= breakInfo.exchange_awaken[0]) {
                        if (vis) {
                            var vis_1 = zj.Table.FindF(PlayerHunterSystem.breakSelectedGenerals1, function (k, v) {
                                return vv_2.general_id == v;
                            });
                            if (!vis_1) {
                                generalList.push(vv_2);
                            }
                        }
                        else if (!vis &&
                            vv_2.general_id % zj.CommonConfig.general_id_to_index_multiple == generalId % zj.CommonConfig.general_id_to_index_multiple) {
                            var vis_2 = zj.Table.FindF(PlayerHunterSystem.breakSelectedGenerals, function (k, v) {
                                return vv_2.general_id == v;
                            });
                            if (!vis_2) {
                                generalList.push(vv_2);
                            }
                        }
                    }
                }
            };
            for (var kk in allHunters) {
                _loop_12(kk);
            }
            var list = [[], []];
            var defenceList = PlayerHunterSystem.GeneralsIdInDefence();
            var _loop_13 = function (i) {
                var vv = generalList[i];
                var def = zj.Table.FindF(defenceList, function (k, v) {
                    return v[0] == vv.general_id;
                });
                if (def) {
                    list[1].push(vv);
                }
                else {
                    list[0].push(vv);
                }
            };
            for (var i = 0; i < generalList.length; i++) {
                _loop_13(i);
            }
            var ret = [];
            for (var i = 0; i < list.length; i++) {
                var v = list[i];
                for (var j = 0; j < v.length; j++) {
                    var vv = v[j];
                    if (vv != null) {
                        ret.push(vv);
                    }
                }
            }
            return ret;
        };
        /**
         * 属性加成
         *
         * @param generalId 猎人ID
         * @param level 等级 1 - 3
         *
         * @returns 元祖 [猎人属性数组， 猎人描述数组]
         */
        PlayerHunterSystem.GetAttri = function (generalId, level) {
            var general_id = generalId % zj.CommonConfig.general_id_to_index_multiple;
            var tbl = PlayerHunterSystem.HunterBreakAttri(general_id);
            var result = zj.Helper.CreateGeneralAttrTbl();
            // if (level < 0) level = 0;
            // if (level > 2) level = 2;
            var index = level - 1;
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i]];
                if (level <= 3) {
                    if (value != null && level != null && value[index] != null) {
                        result[i] = value[index];
                    }
                }
                else {
                    if (value != null && level != null && value[index] != null && value[index] != value[index - 1]) {
                        result[i] = value[index];
                    }
                }
            }
            var des = [];
            var attri = [];
            for (var i = 0; i < result.length; i++) {
                var v = result[i];
                if (v != 0) {
                    attri.push(v);
                    des.push(i);
                }
            }
            return [attri, des];
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBItem = function (level) {
            return zj.TableLevel.Item(level);
        };
        /**
         * 等级开启的功能
         *
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpen = function (level) {
        };
        // 判断功能是否开启
        PlayerHunterSystem.checkFuncOpen = function (fun_item) {
            if (fun_item) {
                var level = fun_item.id;
                //军师阵法特殊处理
                if (level == message.FunctionOpen.FUNCTION_OPEN_TYPE_ARTIFACT) {
                    return true;
                }
                if (level == message.FunctionOpen.FUNCTION_OPEN_TYPE_ADVISER_FORMATION) {
                    return true;
                }
                if (typeof (fun_item.condition) == "number" && fun_item.condition != 0 && zj.Game.PlayerInfoSystem.BaseInfo != null && zj.Game.PlayerInfoSystem.Level != null && zj.Game.PlayerInfoSystem.Level >= fun_item.condition) {
                    return true;
                }
                if (typeof (fun_item.condition_instance) == "number" && fun_item.condition_instance != 0) {
                    return true;
                }
                return false;
            }
        };
        /**
         * 功能开启
         *
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpenTo = function (level, bool) {
            var dbitem = zj.TableFunctionOpen.Item(level);
            if (dbitem == null) {
                return false;
            }
            var bOpen = this.checkFuncOpen(dbitem);
            if (!bOpen) {
                if (bool)
                    zj.toast_warning(dbitem.unopen_tip);
            }
            return bOpen;
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBOpenLeague = function (bTips) {
            var bOpen = zj.Game.PlayerInfoSystem.LeagueId > 0;
            if (!bOpen && bTips) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.league_not_open);
            }
            return bOpen;
        };
        /**
         * 开启等级
         *
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpenLevel = function (funcType) {
            return zj.TableFunctionOpen.Item(funcType);
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpenToPlayer = function (level, funcType, bShowTip) {
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBOpenList = function () {
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpenListInMaincity = function () {
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBNextFastFormatOpenLevel = function () {
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBGetOpen = function (fromId, itemId) {
        };
        /**
         * @description from db_level.lua
         */
        PlayerHunterSystem.LevelDBFunOpenLeague = function (bTips) {
            var bOpen = zj.Game.PlayerInfoSystem.BaseInfo.leagueId > 0;
            if (!bOpen && bTips) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.league_not_open);
            }
            return bOpen;
        };
        /**
         * 武将升级所需要的等级
         *
         * @param currentStep 当前阶级
         *
         * @returns 元祖 [等级描述字符创， 等级上限]
         */
        PlayerHunterSystem.UpLevelNeedGrade = function (currentStep) {
            var stepTbl = zj.TableGeneralStep.Table();
            var stepInfo = zj.TableGeneralStep.Item(currentStep);
            var step = "";
            var level = 1;
            for (var k in stepTbl) {
                if (stepTbl.hasOwnProperty(k)) {
                    var v = stepTbl[k];
                    if (v.max_level > stepInfo.max_level) {
                        step = zj.Helper.GetLevelColorStr(v.name, v.general_quality);
                        level = v.max_level;
                        break;
                    }
                }
            }
            return [step, level];
        };
        /**
         * 获取最大等级
         * @param generalId 武将ID
         */
        PlayerHunterSystem.GetMaxLevel = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            var level = 0;
            for (var i = 0; i < hunterInfo.star - 1; i++) {
                level += baseGeneralInfo.up_star_add_skillLevel[i];
            }
            if (hunterInfo.break_level > 0) {
                for (var i = 1; i <= hunterInfo.break_level; i++) {
                    level += PlayerHunterSystem.HunterBreak(i).add_skillLevel;
                }
            }
            return level;
        };
        /**
         * 武将升星同星级武将材料
         *
         * @param generalId 武将ID
         * @param type 排序类型值（品质，星级，等级) 默认按照等级排序
         *
         * @returns Array 请过排序之后的武将ID数组
         */
        PlayerHunterSystem.ChooseUpStarMeterial = function (generalId, type) {
            if (type === void 0) { type = zj.TableEnum.Enum.HXHHunterEnum.Level; }
            var meterials = [];
            var defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            var _loop_14 = function (k) {
                if (allHunters.hasOwnProperty(k)) {
                    var v_4 = allHunters[k];
                    if (v_4 != null && v_4.level > 0 && v_4.is_ware == false) {
                        var findInDefence = zj.Table.FindF(defenceGenerals, function (_, _v) {
                            return _v[0] == v_4.general_id;
                        });
                        var starGeneralInfo = zj.Table.DeepCopy(v_4);
                        starGeneralInfo.b_defence = (findInDefence != null) ? 1 : 0;
                        meterials.push(starGeneralInfo);
                    }
                }
            };
            for (var k in allHunters) {
                _loop_14(k);
            }
            meterials.sort(function (a, b) {
                var gnrA = PlayerHunterSystem.Table(a.general_id);
                var gnrB = PlayerHunterSystem.Table(b.general_id);
                var baseA = (a.general_id == generalId) ? 1 : 0;
                var baseB = (b.general_id == generalId) ? 1 : 0;
                if (type == zj.TableEnum.Enum.HXHHunterEnum.Quality) {
                    if (a.star == b.star) {
                        if (a.b_defence == b.b_defence) {
                            if (baseA == baseB) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    if (gnrA.aptitude == gnrB.aptitude) {
                                        if (a.level == b.level) {
                                            return gnrB.general_id - gnrA.general_id;
                                        }
                                        else {
                                            return b.level - a.level;
                                        }
                                    }
                                    else {
                                        return gnrB.aptitude - gnrA.aptitude;
                                    }
                                }
                                else {
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            }
                            else {
                                return baseB - baseA;
                            }
                        }
                        else {
                            return a.b_defence - b.b_defence;
                        }
                    }
                    else {
                        return b.star - a.star;
                    }
                }
                else if (type == zj.TableEnum.Enum.HXHHunterEnum.Star) {
                    if (a.awakePassive.level == b.awakePassive.level) {
                        if (a.step == b.step) {
                            if (a.level == b.level) {
                                if (gnrA.aptitude == gnrB.aptitude) {
                                    return gnrB.general_id - gnrA.general_id;
                                }
                                else {
                                    return gnrB.aptitude - gnrA.aptitude;
                                }
                            }
                            else {
                                return b.level - a.level;
                            }
                        }
                        else {
                            return b.step - a.step;
                        }
                    }
                    else {
                        return b.awakePassive.level - a.awakePassive.level;
                    }
                }
                else if (type == zj.TableEnum.Enum.HXHHunterEnum.Level) {
                    if (a.star == b.star) {
                        if (a.b_defence == b.b_defence) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    if (gnrA.aptitude == gnrB.aptitude) {
                                        return gnrB.general_id - gnrA.general_id;
                                    }
                                    else {
                                        return gnrB.aptitude - gnrA.aptitude;
                                    }
                                }
                                else {
                                    return b.level - a.level;
                                }
                            }
                            else {
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        }
                        else {
                            return a.b_defence - b.b_defence;
                        }
                    }
                    else {
                        return b.star - a.star;
                    }
                }
            });
            var result = [];
            for (var i = 0; i < meterials.length; i++) {
                var v = meterials[i];
                result.push(v.general_id);
            }
            return result;
        };
        /**
         * 获得战斗武将15种属性
         * @param general
         * @param info 武将信息
         *
         * @returns [Array, Array] [属性信息数组(下标0-24)，天赋信息]
         */
        PlayerHunterSystem.CalcBattleGelAttr = function (general, info) {
            var result = zj.Helper.CreateGeneralAttrTbl();
            var roleInfo = null;
            if (info != null) {
                roleInfo = info;
            }
            else if (general != null) {
                roleInfo = general.roleInfo;
            }
            if (roleInfo == null)
                return [null, null];
            var generalId = roleInfo.general_id;
            var baseAttr = PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(roleInfo); //////
            baseAttr.shift();
            var _a = PlayerHunterSystem.HXHCalcCelCardAttr(baseAttr, roleInfo.potatoInfo), cardAttr = _a[0], talentSet = _a[1];
            var awakeAttr = PlayerHunterSystem.HXHCalcAwakeAttrValue(baseAttr, generalId, roleInfo.awakePassive);
            var psyAttr = PlayerHunterSystem.HXHCalcCelPsychicAttr(baseAttr, generalId, roleInfo.psychicInfo);
            var breakAttr = PlayerHunterSystem.HXHCalcCelBreakUpAttr(baseAttr, generalId, roleInfo.break_level);
            var equipAttr = PlayerHunterSystem.HXHCalcCelEquipAttr(roleInfo, baseAttr, roleInfo.equipInfo);
            var transAttr = PlayerHunterSystem.HXHCalcCelTranAttr(roleInfo);
            // let skinAttr = PlayerHunterSystem.getSkinProperty(roleInfo);//皮肤属性加成
            psyAttr.push(0);
            for (var i = 0; i < zj.TableEnum.EnumAttriReal.length; i++) {
                var j = zj.TableEnum.EnumAttriReal[i] - 1;
                result[j + 1] = baseAttr[j] + cardAttr[j] + awakeAttr[j] + psyAttr[j] + breakAttr[j] + equipAttr[j] + transAttr[j]; // + skinAttr[j];
            }
            return [result, talentSet];
        };
        PlayerHunterSystem.HXHCalcCelTranAttr = function (generalInfo) {
            var ret = PlayerHunterSystem.createGeneralAttrTbl();
            var value = PlayerHunterSystem.getTranAttr(generalInfo);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP - 1; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (value[i] != 0) {
                    ret[i] = ret[i] + value[i];
                }
            }
            return ret;
        };
        /**变身技面板属性 */
        PlayerHunterSystem.getTranAttr = function (generalInfo) {
            var attrInfo = zj.TableGeneralTransfer.Item(generalInfo.general_id % zj.CommonConfig.general_id_to_index_multiple);
            var result = PlayerHunterSystem.createGeneralAttrTbl();
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP - 1; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                var value = attrInfo[zj.TableEnum.EnumGelAttribName[i]];
                if (value[generalInfo.transfer_level - 1] != null && value[generalInfo.transfer_level - 1] != 0 && generalInfo.transfer_level != 0) {
                    result[i] = value[0];
                }
            }
            return result;
        };
        /**皮肤面板属性 */
        PlayerHunterSystem.getSkinProperty = function (baseAttr, generalInfo) {
            var a = [];
            for (var k in zj.TableItemFashion.Table()) {
                var v = zj.TableItemFashion.Table()[k];
                a.push(v);
            }
            var attrInfo = zj.Table.FindR(a, function (k, v) {
                return v.match_general == generalInfo.general_id % zj.CommonConfig.general_id_to_index_multiple;
            })[0];
            var result = PlayerHunterSystem.createGeneralAttrTbl();
            if (attrInfo) {
                var isHas = PlayerHunterSystem.Table(generalInfo.general_id).fashion_id.indexOf(generalInfo.fashionId) >= 0;
                if (isHas && zj.Game.PlayerItemSystem.itemCount(generalInfo.fashionId) > 0) {
                    for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP - 1; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                        var value = attrInfo[zj.TableEnum.EnumGelAttribName[i]];
                        if (value) {
                            result[i] = value;
                        }
                    }
                }
                // 添加属性值
                for (var i = 0; i < result.length; i++) {
                    if (result[i] != 0) {
                        // 判断属性是否为百分比加成或者直接加数值
                        if (zj.Game.PlayerLeagueSystem.isSkillPercent(i + 1)) {
                            result[i] = baseAttr[i] * result[i] / 100;
                        }
                    }
                }
            }
            return result;
        };
        /**获取变身猎人列表 */
        PlayerHunterSystem.getGeneralTransfer = function () {
            var data_list = [];
            for (var k in zj.TableGeneralTransfer.Table()) {
                var v = zj.TableGeneralTransfer.Table()[k];
                if (v.general_add != 0) {
                    data_list.push(v);
                }
            }
            return data_list;
        };
        PlayerHunterSystem.createGeneralAttrTbl = function () {
            var result = [];
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP - 1; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                result[i] = 0;
            }
            return result;
        };
        /**
         * 猎人 获得武将附加額外屬性（勇於突破）
         *
         * @param generalInfo 武将信息
         *
         * @returns [Array, number] [属性信息， 战斗力值]
         */
        PlayerHunterSystem.HXHCalcGelExternAttrToShow = function (generalInfo) {
            var result = PlayerHunterSystem.CalcBattleGelAttr(null, generalInfo)[0];
            return [result, PlayerHunterSystem.CalcHXHHeroPower(result, generalInfo)];
        };
        /**
         * 突破等级
         * @param generalInfo 武将信息
         */
        PlayerHunterSystem.GeneralBreakBattleValue = function (generalInfo) {
            var tmp1 = zj.Table.DeepCopy(generalInfo);
            var tmp2 = zj.Table.DeepCopy(generalInfo);
            tmp1.break_level -= 1;
            var _a = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp1), battleValue1 = _a[1];
            var _b = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp2), battleValue2 = _b[1];
            var diff = battleValue2 - battleValue1;
            if (diff < 0)
                diff = -diff;
            return [generalInfo.battleValue - diff, generalInfo.battleValue];
        };
        PlayerHunterSystem.generalBreakBattleValue2 = function (generalInfo, breakSkillId) {
            var tmp1 = zj.Table.DeepCopy(generalInfo);
            var tmp2 = zj.Table.DeepCopy(generalInfo);
            var _a = [null, null], skillKey = _a[0], skill = _a[1];
            for (var i = 0; i < tmp2.break_skill.length; i++) {
                var v = tmp2.break_skill[i];
                if (v.key == breakSkillId) {
                    skillKey = i;
                    skill = v.value;
                }
            }
            tmp2.break_skill[skillKey].value = skill - 1;
            var _b = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp1), battleValue1 = _b[1];
            var _c = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp2), battleValue2 = _c[1];
            var diff = battleValue1 - battleValue2;
            return [generalInfo.battleValue - diff, generalInfo.battleValue];
        };
        /**
         * 获取满足突破技升级的猎人
         *
         * @param id 表`table_break_skill_uplevel.json`内索引ID， 范围(100011 - 100743), 组成形式武将id*10 + 技能等级(1-3)
         * @param level  技能等级(1-3)
         * @param generalId 武将id
         *
         * @return Array 经过排序的猎人列表
         */
        PlayerHunterSystem.GetBreakUpSkillHunter = function (id, level, generalId) {
            if (level > 0) {
                level -= 1;
            }
            var upLevelInfo = zj.TableBreakSkillUplevel.Item(id);
            var generalIds = upLevelInfo.exchange_ids[level];
            var aptitudes = upLevelInfo.exchange_aptitude[level];
            var levels = upLevelInfo.exchange_level[level];
            var stars = upLevelInfo.exchange_star[level];
            var awakens = upLevelInfo.exchange_awaken[level];
            var generalList = [];
            var allHunters = zj.Game.PlayerHunterSystem.allHuntersMap();
            for (var k in allHunters) {
                if (allHunters.hasOwnProperty(k)) {
                    var v = allHunters[k];
                    var aptitude = PlayerHunterSystem.Table(v.general_id).aptitude;
                    var condition1 = (v != null &&
                        v.general_id != generalId &&
                        generalIds[0] != 0 &&
                        v.general_id % zj.CommonConfig.general_id_to_index_multiple == generalIds[0] && aptitude >= aptitudes[0] &&
                        v.level >= levels[0] &&
                        v.star >= stars[0] &&
                        v.awakePassive.level >= awakens[0]);
                    var condition2 = (v != null &&
                        v.general_id != generalId &&
                        generalIds[0] == 0 &&
                        aptitude >= aptitudes[0] &&
                        v.level >= levels[0] &&
                        v.star >= stars[0] &&
                        v.awakePassive.level >= awakens[0]);
                    if (condition1 || condition2) {
                        generalList.push(v);
                    }
                }
            }
            var defenceList = PlayerHunterSystem.GeneralsIdInDefence();
            var list1 = [];
            var list2 = [];
            var _loop_15 = function (i) {
                var v = generalList[i];
                var find = zj.Table.FindF(defenceList, function (_, _v) {
                    return _v[0] == v.general_id;
                });
                if (find) {
                    list2.push(v);
                }
                else {
                    list1.push(v);
                }
            };
            for (var i = 0; i < generalList.length; i++) {
                _loop_15(i);
            }
            // 先按品阶由高到低排，然后星级，再后战力，再后等级，最后ID
            list1.sort(function (a, b) {
                var generalA = PlayerHunterSystem.Table(a.general_id);
                var generalB = PlayerHunterSystem.Table(b.general_id);
                if (generalA.is_open != generalB.is_open) {
                    if (generalA.is_open == 0)
                        return 1;
                    if (generalB.is_open == 0)
                        return -1;
                }
                if (a.step == b.step) {
                    if (a.star == b.star) {
                        if (generalA.aptitude == generalB.aptitude) {
                            if (a.level == b.level) {
                                if (a.battleValue == b.battleValue) {
                                    return PlayerHunterSystem.GetGeneralId(a.general_id) - PlayerHunterSystem.GetGeneralId(b.general_id);
                                }
                                else {
                                    return b.battleValue - a.battleValue;
                                }
                            }
                            else {
                                return b.level - a.level;
                            }
                        }
                        else {
                            return generalB.aptitude - generalA.aptitude;
                        }
                    }
                    else {
                        return b.star - a.star;
                    }
                }
                else {
                    return b.step - a.step;
                }
            });
            var list = [];
            list.push(list1, list2);
            var ret = [];
            for (var i = 0; i < list.length; i++) {
                var v = list[i];
                for (var k in v) {
                    if (v.hasOwnProperty(k)) {
                        var vv = v[k];
                        ret.push(vv);
                    }
                }
            }
            return ret;
        };
        /**
         * 先按品阶由高到低排，然后星级，再后战力，再后等级，最后ID
         */
        PlayerHunterSystem.SortGeneral = function (a, b) {
            var generalA = PlayerHunterSystem.Table(a.general_id);
            var generalB = PlayerHunterSystem.Table(b.general_id);
            if (generalA.is_open != generalB.is_open) {
                if (generalA.is_open == 0)
                    return 1;
                if (generalB.is_open == 0)
                    return -1;
            }
            if (a.step == b.step) {
                if (a.star == b.star) {
                    if (generalA.aptitude == generalB.aptitude) {
                        if (a.level == b.level) {
                            if (a.battleValue == b.battleValue) {
                                return PlayerHunterSystem.GetGeneralId(a.general_id) - PlayerHunterSystem.GetGeneralId(b.general_id);
                            }
                            else {
                                return b.battleValue - a.battleValue;
                            }
                        }
                        else {
                            return b.level - a.level;
                        }
                    }
                    else {
                        return generalB.aptitude - generalA.aptitude;
                    }
                }
                else {
                    return b.star - a.star;
                }
            }
            else {
                return b.step - a.step;
            }
        };
        /**
         * 武将合成材料排序(武将，等级，星级，觉醒等级)
         *
         * @param exceptIds
         * @param conditions 合成条件数组 [id, level, star, awakePassiveLevel, aptitude]
         * @param exceptDefence
         * @param defenceGenerals 防守阵容的猎人数组
         */
        PlayerHunterSystem.GetComposeHunter = function (exceptIds, conditions, exceptDefence, defenceGenerals) {
            if (exceptIds === void 0) { exceptIds = []; }
            if (conditions.length == 0)
                return [];
            if (defenceGenerals == null) {
                defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            }
            var hunters = [];
            var allHunterMap = zj.Game.PlayerHunterSystem.allHuntersMap();
            var _loop_16 = function (k) {
                if (allHunterMap.hasOwnProperty(k)) {
                    var v_5 = allHunterMap[k];
                    if (v_5 == null || v_5 == undefined) {
                        return "continue";
                    }
                    var baseGeneralInfo = zj.TableBaseGeneral.Item(Number(k) % zj.CommonConfig.general_id_to_index_multiple);
                    // 基本条件判断
                    if (v_5.level > 0 && baseGeneralInfo.is_open == 1 && !v_5.is_ware) {
                        // 合成条件判断
                        if ((conditions[0] == 0 || PlayerHunterSystem.GetGeneralId(conditions[0]) == PlayerHunterSystem.GetGeneralId(v_5.general_id)) &&
                            conditions[1] <= v_5.level &&
                            conditions[2] <= v_5.star &&
                            conditions[3] <= v_5.awakePassive.level &&
                            (conditions[4] == 0 || baseGeneralInfo.aptitude == conditions[4])) {
                            // 搜索去除ID
                            var findExcept = zj.Table.FindK(exceptIds, v_5.general_id);
                            if (findExcept == -1) {
                                var insertGeneralInfo = zj.Table.DeepCopy(v_5);
                                var findInDefence = zj.Table.FindF(defenceGenerals, function (_, _v) {
                                    return _v[0] == v_5.general_id;
                                });
                                if (exceptDefence) {
                                    if (findInDefence == false) {
                                        insertGeneralInfo.b_defence = 0;
                                        hunters.push(insertGeneralInfo);
                                    }
                                }
                                else {
                                    insertGeneralInfo.b_defence = findInDefence ? 1 : 0;
                                    hunters.push(insertGeneralInfo);
                                }
                            }
                        }
                    }
                }
            };
            for (var k in allHunterMap) {
                _loop_16(k);
            }
            hunters.sort(function (a, b) {
                if (a.b_defence == b.b_defence) {
                    if (a.battleValue == b.battleValue) {
                        return a.general_id - b.general_id;
                    }
                    else {
                        return a.battleValue - b.battleValue;
                    }
                }
                else {
                    return a.b_defence - b.b_defence;
                }
            });
            var result = [];
            for (var k in hunters) {
                if (hunters.hasOwnProperty(k)) {
                    var v = hunters[k];
                    result.push(v.general_id);
                }
            }
            return hunters;
        };
        /**
         * 获取武将头像边框图片
         *
         * @param generalId 武将ID
         *
         * @description db_compound.lua
         */
        PlayerHunterSystem.GetGeneralFrame = function (generalId) {
            var baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo == null) {
                return "";
            }
            var aptitude = baseGeneralInfo.aptitude;
            var path = "";
            if (aptitude == 11) {
                path = zj.UIConfig.UIConfig_Role.heroFrame[1];
            }
            else if (aptitude == 12) {
                path = zj.UIConfig.UIConfig_Role.heroFrame[3];
            }
            else if (aptitude == 13) {
                path = zj.UIConfig.UIConfig_Role.heroFrame[6];
            }
            else if (aptitude == 14) {
                path = zj.UIConfig.UIConfig_Role.heroFrame[9];
            }
            else if (aptitude == 15) {
                path = zj.UIConfig.UIConfig_Role.heroFrame[13];
            }
            return path;
        };
        /**
         * 合成索引
         *
         * @param index 索引
         * @param defenceList 防守阵容猎人
         *
         * @description db_compound.lua
         */
        PlayerHunterSystem.IndexTips = function (index, defenceList) {
            var compoundInfo = zj.TableGeneralMake.Item(index);
            if (compoundInfo == null)
                return false;
            var composeInfo = [];
            for (var i = 0; i < compoundInfo.exchange_ids.length; i++) {
                var id = compoundInfo.exchange_ids[i];
                var level = compoundInfo.exchange_level[i];
                var star = compoundInfo.exchange_star[i];
                var awaken = compoundInfo.exchange_awaken[i];
                var aptitude = compoundInfo.exchange_aptitude[i];
                var info = [];
                info.push(id);
                info.push(level);
                info.push(star);
                info.push(awaken);
                info.push(aptitude);
                composeInfo.push(info);
            }
            composeInfo.sort(function (a, b) {
                if (a[0] == b[0]) {
                    if (a[1] == b[1]) {
                        if (a[2] == b[2]) {
                            return a[3] - b[3];
                        }
                        else {
                            return a[2] - b[2];
                        }
                    }
                    else {
                        return a[1] - b[1];
                    }
                }
                else {
                    return a[0] - b[0];
                }
            });
            var storageTbl = [];
            for (var i = 0; i < composeInfo.length; i++) {
                var v = composeInfo[i];
                var composeTbl = PlayerHunterSystem.GetComposeHunter(storageTbl, v, true, defenceList);
                if (composeTbl[0] == null) {
                    return false;
                }
                else {
                    storageTbl.push(composeTbl[0]);
                }
            }
            return true;
        };
        /**
         * 是否有武将合成材料(武将，等级，星级，觉醒等级)
          * @param exceptIds
         * @param conditions 合成条件数组 [id, level, star, awakePassiveLevel, aptitude]
         * @param exceptDefence
         * @param defenceGenerals 防守阵容的猎人数组
         *
         * @description db_compound.lua
         */
        PlayerHunterSystem.haveCompose = function (exceptIds, conditions, exceptDefence, defenceGenerals) {
            if (exceptIds === void 0) { exceptIds = []; }
            if (defenceGenerals == null) {
                defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            }
            var allHunterMap = zj.Game.PlayerHunterSystem.allHuntersMap();
            var _loop_17 = function (k) {
                if (allHunterMap.hasOwnProperty(k)) {
                    var v_6 = allHunterMap[Number(k)];
                    if (v_6 == null || v_6 == undefined) {
                        return "continue";
                    }
                    var baseGeneralInfo = PlayerHunterSystem.Table(k);
                    // 基本条件判断
                    if (v_6.level > 0 && baseGeneralInfo.is_open == 1 && v_6.is_ware == false) {
                        // 合成条件判断
                        if ((conditions[0] == 0 || PlayerHunterSystem.GetGeneralId(conditions[0]) == PlayerHunterSystem.GetGeneralId(v_6.general_id)) &&
                            conditions[1] <= v_6.level &&
                            conditions[2] <= v_6.star &&
                            conditions[3] <= v_6.awakePassive.level &&
                            (conditions[4] == 0 || baseGeneralInfo.aptitude == conditions[4])) {
                            // 搜索去除ID
                            var findExcept = zj.Table.FindK(exceptIds, v_6.general_id);
                            if (findExcept == -1) {
                                var findInDefence = zj.Table.FindF(defenceGenerals, function (_, _v) {
                                    return _v[0] == v_6.general_id;
                                });
                                if (exceptDefence) {
                                    if (findInDefence == false) {
                                        return { value: true };
                                    }
                                }
                                else {
                                    return { value: true };
                                }
                            }
                        }
                    }
                }
            };
            for (var k in allHunterMap) {
                var state_1 = _loop_17(k);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        };
        PlayerHunterSystem.MapFightID = function (generalInfo) {
            var generalId = generalInfo.general_id;
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId);
            if (!generalId) {
                return 0;
            }
            // let table_base = TableBaseGeneral.Table();
            // let table_mapRole = TableMapRole.Table();
            var mapRoleID = zj.TableBaseGeneral.Item(generalId).general_roleId;
            var fashionInfo = zj.TableItemFashion.Item(generalInfo.fashionId);
            var bFashionWear = generalInfo.fashionId != 0;
            return (bFashionWear && fashionInfo != null) ? fashionInfo.fashion_roleId : mapRoleID;
        };
        PlayerHunterSystem.GetCurStepSkillPoint = function (step) {
            var number = 0;
            var stepTable = zj.TableGeneralStep.Table();
            for (var k in stepTable) {
                if (stepTable.hasOwnProperty(k)) {
                    var v = stepTable[k];
                    if (step >= v.general_step) {
                        number += v.add_skill;
                    }
                }
            }
            return number;
        };
        PlayerHunterSystem.GetMaxStepSkillPoint = function () {
            var number = 0;
            var stepTable = zj.TableGeneralStep.Table();
            for (var k in stepTable) {
                if (stepTable.hasOwnProperty(k)) {
                    var v = stepTable[k];
                    number += v.add_skill;
                }
            }
            return number;
        };
        PlayerHunterSystem.GetHunterCardMap = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            if (hunterInfo == null)
                return null;
            var cardMap = {};
            if (hunterInfo == null)
                return cardMap;
            for (var i = 0; i < hunterInfo.potatoInfo.length; i++) {
                var v = hunterInfo.potatoInfo[i];
                cardMap[v.pos] = v;
            }
            return cardMap;
        };
        /**
         * 装备可升品
         *
         * @param generalId The hunter's ID.
         * @param equipId The equip's ID.
         */
        PlayerHunterSystem.equipCanUpStep = function (generalId, equipId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var equipInfo = hunterInfo.equipInfo;
            var step = 0;
            var index = -1;
            for (var i = 0; i < equipInfo.length; i++) {
                var v = equipInfo[i];
                if (v.equipId == equipId) {
                    step = v.step;
                    // index = i;
                }
            }
            var baseEquipInfo = zj.TableGeneralEquip.Item(equipId);
            var _a = [null, null, null], goods1 = _a[0], goods2 = _a[1], count1 = _a[2];
            if (step != zj.CommonConfig.general_equip_max_step) {
                var steps = baseEquipInfo.upstep_goods[step];
                goods1 = steps[0];
                goods2 = steps[1];
                count1 = baseEquipInfo.upstep_count[step][0];
            }
            else {
                var steps = baseEquipInfo.upstep_goods[step - 1];
                goods1 = steps[0];
                goods2 = steps[1];
                count1 = baseEquipInfo.upstep_count[step - 1][0];
            }
            var goods1Count = zj.PlayerItemSystem.Count(goods1);
            var goods2Count = 0;
            var count2 = 0;
            if (goods2 != null) {
                goods2Count = zj.PlayerItemSystem.Count(goods2);
                if (step == zj.CommonConfig.general_equip_max_step) {
                    count2 = baseEquipInfo.upstep_count[step - 1][0];
                }
                else {
                    count2 = baseEquipInfo.upstep_count[step][1];
                }
            }
            var money = 0;
            if (step == zj.CommonConfig.general_equip_max_step) {
                money = baseEquipInfo.upstep_money[step - 1];
            }
            else {
                money = baseEquipInfo.upstep_money[step];
            }
            var currentMoney = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var flag = true;
            index = zj.Table.FindK(equipInfo, equipId);
            if (index == 0) {
                if (hunterInfo.level >= zj.CommonConfig.general_equip_one_openlevel) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            }
            else if (index == 1) {
                if (hunterInfo.level >= zj.CommonConfig.general_equip_two_openlevel) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            }
            if (step < zj.CommonConfig.general_equip_max_step &&
                count1 <= goods1Count &&
                count2 <= goods2Count &&
                currentMoney >= money &&
                flag) {
                return true;
            }
            return false;
        };
        /**
         * 装备可强化
         *
         * @param generalId The hunter's ID.
         * @param equipId The equip's ID.
         */
        PlayerHunterSystem.equipCanStrengthen = function (generalId, equipId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var equipInfo = hunterInfo.equipInfo;
            var level = 0;
            var index = -1;
            for (var i = 0; i < equipInfo.length; i++) {
                var v = equipInfo[i];
                if (v.equipId == equipId) {
                    level = v.level;
                }
            }
            var baseEquipInfo = zj.TableGeneralEquip.Item(equipId);
            var goods1 = 0, goods2 = 0, count1 = 0;
            if (level == zj.CommonConfig.general_equip_max_level) {
                goods1 = baseEquipInfo.uplevel_goods[level - 1][0];
                goods2 = baseEquipInfo.uplevel_goods[level - 1][1];
                count1 = baseEquipInfo.uplevel_count[level - 1][0];
            }
            else {
                goods1 = baseEquipInfo.uplevel_goods[level][0];
                goods2 = baseEquipInfo.uplevel_goods[level][1];
                count1 = baseEquipInfo.uplevel_count[level][0];
            }
            var goodsCount1 = zj.PlayerItemSystem.Count(goods1);
            var count2 = 0, goodsCount2 = 0;
            if (goods2 != null) {
                goodsCount2 = zj.PlayerItemSystem.Count(goods2);
                if (level == zj.CommonConfig.general_equip_max_level) {
                    count2 = baseEquipInfo.uplevel_count[level - 1][1];
                }
                else {
                    count2 = baseEquipInfo.uplevel_count[level][1];
                }
            }
            var money = 0;
            if (level == zj.CommonConfig.general_equip_max_level) {
                money = baseEquipInfo.uplevel_money[level - 1];
            }
            else {
                money = baseEquipInfo.uplevel_money[level];
            }
            var currentMoney = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var flag = true;
            index = zj.Table.FindK(equipInfo, equipId);
            if (index == 0) {
                if (hunterInfo.level >= zj.CommonConfig.general_equip_one_openlevel) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            }
            else if (index == 1) {
                if (hunterInfo.level >= zj.CommonConfig.general_equip_two_openlevel) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            }
            if (level < zj.CommonConfig.general_equip_max_level &&
                count1 <= goodsCount1 &&
                count2 <= goodsCount2 &&
                currentMoney >= money &&
                flag == true) {
                return true;
            }
            return false;
        };
        /**
         * 装备可激活
         *
         * @param generalId The hunter's ID.
         * @param equipIds The equip ids, from `table_base_general.json` -> `equip_info`.
         * @param equipId The equip's ID.
         */
        PlayerHunterSystem.equipCanActive = function (generalId, equipIds, equipId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var have = zj.Table.FindF(hunterInfo.equipInfo, function (_, _v) {
                return _v.equipId == equipId;
            });
            var condition = false;
            if (equipId == equipIds[0]) {
                condition = hunterInfo.level >= zj.CommonConfig.general_equip_one_openlevel;
            }
            else if (equipId == equipIds[1]) {
                condition = hunterInfo.level >= zj.CommonConfig.general_equip_two_openlevel;
            }
            var baseEquipInfo = zj.TableGeneralEquip.Item(equipId);
            var money = baseEquipInfo.compose_money;
            var currentMoney = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            return (condition && !have && money <= currentMoney);
        };
        /**
         * 装备可合成
         *
         * @param generalId The hunter's ID.
         * @param equipIds The equip ids, from `table_base_general.json` -> `equip_info`.
         */
        PlayerHunterSystem.equipCanCompound = function (generalId, equipIds) {
            if (equipIds.length == 3 && equipIds[2] != 0) {
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
                var have = zj.Table.FindF(hunterInfo.equipInfo, function (_, _v) {
                    return _v.equipId == equipIds[2];
                });
                var baseEquipInfo = zj.TableGeneralEquip.Item(equipIds[2]);
                var goods = Number(baseEquipInfo.compose_goods);
                var count = Number(baseEquipInfo.compose_count);
                var count1 = zj.PlayerItemSystem.Count(goods);
                var baseGeneralInfo = PlayerHunterSystem.Table(generalId);
                return (!have &&
                    baseGeneralInfo.aptitude != 11 &&
                    hunterInfo.equipInfo[2] == null &&
                    count1 >= count);
            }
            return false;
        };
        PlayerHunterSystem.equipGetStarNumber = function (step) {
            return Math.floor((step - 1) / 5 + 1);
        };
        PlayerHunterSystem.equipGetLevelAttribute = function (attriId, level) {
            var info = zj.TableGeneralEquipAttri.Item(attriId);
            var attri = zj.Table.Add(0, level, function (id) {
                return info.attri_add[id];
            });
            return attri;
        };
        PlayerHunterSystem.equipGetStepAttribute = function (attriId, step) {
            var info = zj.TableGeneralEquipAttri.Item(attriId);
            var attri = zj.Table.Add(0, step, function (id) {
                return info.attri_add[id];
            });
            return attri;
        };
        /** 获取猎人念力数据 */
        PlayerHunterSystem.GetGeneralPsychicData = function (generalId, generalinfo) {
            var genTbl = PlayerHunterSystem.Table(generalId);
            var genInfo = generalinfo;
            if (genInfo == null) {
                genInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            }
            var data = [];
            if (genInfo.star >= 6 && genInfo.psychicInfo.length != 0) {
                data = genInfo.psychicInfo;
            }
            else {
                data = genTbl.psychic_unlock_six;
            }
            var ret = {};
            for (var kk in data) {
                var vv = data[kk];
                ret[kk] = vv;
            }
            return ret;
        };
        PlayerHunterSystem.GetGeneralPsychicByPos = function (generalId, pos) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            for (var i = 0; i < hunterInfo.psychicInfo.length; i++) {
                var v = hunterInfo.psychicInfo[i];
                if (v.pos == pos) {
                    return v;
                }
            }
            return null;
        };
        PlayerHunterSystem.GeneralPsychicHaveNext = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            // for (let i = 0; i < hunterInfo.psychicInfo.length; i++) {
            //     let v = hunterInfo.psychicInfo[i];
            //     if (v.psychicId_back != 0) {
            //         return true;
            //     }
            // }
            return true; //???
        };
        PlayerHunterSystem.getGeneralPsychicCurGroup = function (general_Id, generalInfo) {
            var genInfo = null;
            var generalId = general_Id;
            if (generalInfo != null) {
                genInfo = generalInfo;
            }
            else {
                genInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            }
            if (generalId == null) {
                generalId = genInfo.general_id;
            }
            var _psychics = [];
            var genTbl = PlayerHunterSystem.Table(generalId);
            for (var kk in genTbl.psychic_unlock_six) {
                var vv = genTbl.psychic_unlock_six[kk];
                _psychics[kk] = vv;
            }
            var psyGroupMap = [];
            if (genInfo.psychicInfo.length != 0) {
                zj.StringConfig_Table.general_psychic;
                psyGroupMap[1] = zj.Table.DeepCopy(zj.TableGeneralPsychic.Item(Math.floor(_psychics[0] / 10000)));
                psyGroupMap[2] = zj.Table.DeepCopy(zj.TableGeneralPsychic.Item(Math.floor(_psychics[4] / 10000)));
                psyGroupMap[1]["psychic"] = zj.Table.DeepCopy(genInfo.psychicInfo[0]);
                for (var i = 2; i <= 4; i++) {
                    if (psyGroupMap[1]["psychic"].level > genInfo.psychicInfo[i].level) {
                        psyGroupMap[1]["psychic"] = zj.Table.DeepCopy(genInfo.psychicInfo[i]);
                    }
                }
                psyGroupMap[2]["psychic"] = zj.Table.DeepCopy(genInfo.psychicInfo[4]);
                if (genInfo.psychicInfo[4].level > genInfo.psychicInfo[5].level) {
                    psyGroupMap[2]["psychic"] = zj.Table.DeepCopy(genInfo.psychicInfo[5]);
                }
            }
            else {
                psyGroupMap[1] = 0;
                psyGroupMap[2] = 0;
            }
            return psyGroupMap;
        };
        PlayerHunterSystem.getCanRefinePsychicHunter = function (generalId, selecteInfo, level) {
            var _ret = [];
            var _generalId = generalId;
            var _selecteInfo = selecteInfo;
            var _curLevel = level;
            var _consumeId = _selecteInfo.consume_general[_curLevel - 1];
            var _level = _selecteInfo.general_level[_curLevel - 1];
            var _star = _selecteInfo.general_star[_curLevel - 1];
            var _awaken = _selecteInfo.general_awaken[_curLevel - 1];
            var _bAny = zj.yuan3(_consumeId == 0, true, false);
            var _grn_list = [];
            var _defance_list = [[], []];
            var hunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in hunters) {
                if (hunters.hasOwnProperty(k)) {
                    var v = hunters[k];
                    if (v.general_id != _generalId && v.level >= _level && v.star >= _star && v.awakePassive.level >= _awaken && (v.general_id % zj.CommonConfig.general_id_to_index_multiple == _consumeId || _bAny)) {
                        _grn_list.push(v);
                    }
                }
            }
            var defencelist = this.GeneralsIdInDefence();
            var _loop_18 = function (k) {
                if (_grn_list.hasOwnProperty(k)) {
                    var v_7 = _grn_list[k];
                    var def = zj.Table.FindR(defencelist, function (k, _v) {
                        return _v[0] == v_7.general_id;
                    });
                    for (var i = 0; i < def.length; i++) {
                        if (def[i] != null) {
                            v_7.defenceInfo = def;
                        }
                        else {
                            v_7.defenceInfo = null;
                        }
                    }
                    if (def != null) {
                        _defance_list[1].push(v_7);
                    }
                    else {
                        _defance_list[0].push(v_7);
                    }
                }
            };
            for (var k in _grn_list) {
                _loop_18(k);
            }
            for (var k in _defance_list) {
                if (_defance_list.hasOwnProperty(k)) {
                    var v = _defance_list[k];
                    for (var kk in v) {
                        if (v.hasOwnProperty(kk)) {
                            var vv = v[kk];
                            _ret.push(vv);
                        }
                    }
                }
            }
            return _ret;
        };
        PlayerHunterSystem.GetGeneralPsychicNextGroup = function (generalId, lockPos, generalInfo) {
            var ret = [];
            var genInfo = null;
            ;
            if (generalInfo != null) {
                genInfo = generalInfo;
            }
            else {
                genInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            }
            var psyInfo = genInfo.psychicInfo;
            var psyGroupMap = {};
            var psyGroupLockMap = {};
            var isRefresh = false;
            var next = function (map) {
                var length = 0;
                for (var k in map) {
                    if (map.hasOwnProperty(k)) {
                        length += 1;
                    }
                }
                return length > 0;
            };
            // 无锁定，已刷新
            if (isRefresh && next(psyGroupLockMap) == false) {
                for (var k in psyGroupMap) {
                    if (psyGroupMap.hasOwnProperty(k)) {
                        var v = psyGroupMap[k];
                        var num = zj.TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                        }
                    }
                }
            }
            // 有锁定，已经刷新
            if (isRefresh && next(psyGroupLockMap) == true) {
                for (var k in psyGroupLockMap) {
                    if (psyGroupLockMap.hasOwnProperty(k)) {
                        var v = psyGroupLockMap[k];
                        var num = zj.TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                            psyGroupLockMap[k] = [];
                            psyGroupMap[k] = [];
                        }
                    }
                }
                for (var k in psyGroupLockMap) {
                    if (psyGroupLockMap.hasOwnProperty(k)) {
                        var v = psyGroupLockMap[k];
                        var num = zj.TableGeneralPsychic.Item(k).group_num;
                        var vv = psyGroupMap[k];
                        if (vv != null && (v.length + vv.length) >= num) {
                            ret.push(Number(k));
                            psyGroupMap[k] = [];
                        }
                    }
                }
                for (var k in psyGroupMap) {
                    if (psyGroupMap.hasOwnProperty(k)) {
                        var v = psyGroupMap[k];
                        var num = zj.TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                        }
                    }
                }
            }
            for (var i = 0; i < 3; i++) {
                if (ret[i] == null) {
                    ret[i] = 0;
                }
            }
            return [ret, psyGroupMap];
        };
        PlayerHunterSystem.GetNextPsychicAttriChange = function (generalId) {
            var ret = (_a = {},
                _a[1] = 0,
                _a[2] = 0,
                _a[4] = 0,
                _a[5] = 0,
                _a[8] = 0,
                _a[9] = 0,
                _a);
            var retLast = (_b = {},
                _b[1] = 0,
                _b[2] = 0,
                _b[4] = 0,
                _b[5] = 0,
                _b[8] = 0,
                _b[9] = 0,
                _b);
            var calcAttri = function (type, value) {
                if (ret[type] == null) {
                    ret[type] = 0;
                }
                ret[type] += value;
            };
            var calcAttriLast = function (type, value) {
                if (retLast[type] == null) {
                    ret[type] = 0;
                }
                retLast[type] += value;
            };
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            // for (let i = 0; i < hunterInfo.psychicInfo.length; i++) {
            //     let v = hunterInfo.psychicInfo[i];
            //     let psychicInfo = TableGeneralPsychicAttri.Item(v.attriId);
            //     if (v.psychicId_back != 0) {
            //         let psychicBackInfo = TableGeneralPsychicAttri.Item(v.attriId_back);
            //         calcAttri(psychicInfo.attri_type, -v.attriValue);
            //         calcAttri(psychicBackInfo.attri_type, v.attriId_back);
            //         calcAttriLast(psychicBackInfo.attri_type, v.attriValue_back);
            //     } else {
            //         calcAttriLast(psychicInfo.attri_type, v.attriValue);
            //     }
            // }
            return [ret, retLast];
            var _a, _b;
        };
        PlayerHunterSystem.GetPsychicGroupIllustrateData = function () {
            var ret = {};
            var psychicTable = zj.TableGeneralPsychic.Table();
            for (var k in psychicTable) {
                if (psychicTable.hasOwnProperty(k)) {
                    var v = psychicTable[k];
                    if (ret[v.group_num] == null) {
                        ret[v.group_num] = [];
                    }
                    ret[v.group_num].push(v);
                }
            }
            return ret;
        };
        PlayerHunterSystem.GetPsychicGroupAttriType = function (id) {
            var itemInfo = zj.TableGeneralPsychic.Item(id);
            var retMap = {};
            for (var i = 0; i < itemInfo.rand_attri.length; i++) {
                var v = itemInfo.rand_attri[i];
                var attriInfo = zj.TableGeneralPsychicAttri.Item(v);
                retMap[attriInfo.attri_type] = true;
            }
            var str = "";
            var ret = [];
            for (var k in retMap) {
                if (retMap.hasOwnProperty(k)) {
                    ret.push(Number(k));
                    str += " " + zj.TextsConfig.TextsConfig_Hunter_psychic.attri_type[k];
                }
            }
            return [ret, str];
        };
        PlayerHunterSystem.SpineID = function (info) {
            var _get_spine = function (generalId, fashionId) {
                var bFashionWear = (fashionId != null) && (fashionId != 0) && (fashionId != 1);
                var bFashionHave = true;
                // --此处暂不检查, 这个fashionId是否对应英雄的
                var bFashionSame = true;
                var bFashion = bFashionWear && bFashionHave && bFashionSame;
                var fashionRoleId = 0;
                if (bFashion)
                    fashionRoleId = zj.TableItemFashion.Item(fashionId).fashion_roleId;
                var baseHunterInfo = PlayerHunterSystem.Table(generalId);
                var info_map = zj.TableMapRole.Item(baseHunterInfo.general_roleId);
                var spine = (bFashion) ? zj.TableMapRole.Item(fashionRoleId).body_spx_id : info_map.body_spx_id;
                var scale = (bFashion) ? zj.TableMapRole.Item(fashionRoleId).spine_scale : info_map.spine_scale;
                var path = info_map.name_path;
                return [spine, scale, path];
            };
            return _get_spine(info.general_id, info.fashionId);
        };
        PlayerHunterSystem.Activity_Hero = function () {
            // let SP_MIN = 1;
            // let SP_MAX = Table.tableLength(TableSpgeneralReward.Table());
            // let ret = [];
            // for (let i = SP_MIN - 1; i <= SP_MAX - 1; ++i) {
            //     ret[i] = TableSpgeneralReward.Item(i + 1);
            // }
            // return ret;
            var ret = [];
            for (var key in zj.TableSpgeneralInformation.Table()) {
                if (zj.TableSpgeneralInformation.Table().hasOwnProperty(key)) {
                    var element = zj.TableSpgeneralInformation.Table()[key];
                    ret.push(element);
                }
            }
            return ret;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerHunterSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GENERALS_CHANGE, this.onGeneralsChange, this);
            zj.Tips.InitTipHero();
        };
        PlayerHunterSystem.prototype.uninit = function () {
            this.mapHunters = {};
            this.generals = [];
        };
        PlayerHunterSystem.prototype.onGeneralsChange = function (ev) {
            var generals = ev.data;
            for (var index = 0; index < generals.length; index++) {
                var curGeneralInfo = generals[index];
                var curGeneralID = curGeneralInfo.general_id;
                var bFind = false;
                for (var i = 0; i < this.generals.length; i++) {
                    var v = this.generals[i];
                    if (v.general_id == curGeneralID && bFind == false) {
                        bFind = true;
                        console.log("---- modify general_id = ", curGeneralID);
                        this.generals[i] = curGeneralInfo;
                        console.log("---- 猎人信息 ", curGeneralInfo);
                    }
                }
                if (bFind == false) {
                    this.generals.push(curGeneralInfo);
                }
                this.mapHunters[curGeneralID] = curGeneralInfo;
                if (curGeneralID > zj.CommonConfig.general_id_to_index_multiple) {
                    var index_1 = PlayerHunterSystem.GetGeneralId(curGeneralID);
                    //console.log("---- delete general id, index = ", index, "current general ID = ", curGeneralID);
                    delete this.mapHunters[index_1];
                }
                // 
                zj.Tips.SetTipsOfHero(curGeneralID);
                zj.Game.EventManager.event(zj.HUNTER_REFRESH_TIP);
            }
            zj.Game.PlayerCardSystem.setCardToHunterInfo();
        };
        // 查询玩家猎人信息
        PlayerHunterSystem.prototype.queryHunter = function (id) {
            var hunter = this.mapHunters[id];
            if (hunter == null || hunter == undefined)
                return null;
            return hunter;
        };
        /**
         * 获取所有猎人列表
         */
        PlayerHunterSystem.prototype.queryAllHunters = function () {
            return this.generals;
        };
        /**
         * 删除猎人
         * @param generalId 猎人ID
         */
        PlayerHunterSystem.prototype.deleteHunterById = function (generalId) {
            if (generalId == undefined || generalId == null || generalId <= 0)
                return;
            var _a = zj.Table.FindR(this.generals, function (_, _v) {
                return _v.general_id == generalId;
            }), _ = _a[0], index = _a[1];
            if (index >= 0) {
                this.generals.splice(index, 1);
            }
            delete this.mapHunters[generalId];
        };
        PlayerHunterSystem.prototype.allHuntersMap = function () {
            return this.mapHunters;
        };
        PlayerHunterSystem.prototype.Table = function (generalId, transfer) {
            // generalId = PlayerHunterSystem.GetGeneralId(generalId);
            // if (ckid(generalId)) {
            //     return null;
            // }
            // return TableBaseGeneral.Item(generalId);
            return PlayerHunterSystem.Table(generalId, transfer);
        };
        PlayerHunterSystem.prototype.HasIncreaseStar = function () {
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.mapHunters); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.level != 0 && v.star > this.Table(k).init_star) {
                    return false;
                }
            }
            return true;
        };
        PlayerHunterSystem.prototype.getSortGeneralByPower = function () {
            var sort_data = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.Game.PlayerHunterSystem.mapHunters); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.level > 0) {
                    var general = {
                        level: v.level,
                        star: v.star,
                        step: v.step,
                        battle: v.battleValue,
                        id: v.general_id,
                        hp: 1,
                        rage: 0,
                        maxHp: v.attri.general_hp,
                        isNew: true
                    };
                    sort_data.push(general);
                }
            }
            sort_data.sort(function (a, b) {
                if (a.battle == b.battle) {
                    if (a.level == b.level) {
                        if (a.star == b.star) {
                            if (a.step == b.step) {
                                return a.id - b.id;
                            }
                            else {
                                return b.step - a.step;
                            }
                        }
                        else {
                            return b.star - a.star;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.battle - a.battle;
                }
            });
            return sort_data;
        };
        PlayerHunterSystem.prototype.sceneHaloAndPetAttri = function (baseAttr, petInfo, haloId) {
            var preAttr = zj.Table.DeepCopy(baseAttr);
            var attriResult = zj.Helper.AttriConvertTbl(preAttr); // 从1开始 
            var haloAttriResult = zj.Helper.CreateGeneralAttrTbl();
            var petStarAttriResult = zj.Helper.CreateGeneralAttrTbl();
            var petStepAttriResult = zj.Helper.CreateGeneralAttrTbl();
            var allAttrResult = zj.Helper.CreateGeneralAttrTbl(); // 从1开始
            // 光环属性
            if (haloId != null && haloId != 0 && zj.PlayerVIPSystem.HaloItem(haloId) != null) {
                var haloTbl = zj.PlayerVIPSystem.HaloItem(haloId);
                for (var _i = 0, _a = zj.HelpUtil.GetKV(haloTbl.add_type); _i < _a.length; _i++) {
                    var _b = _a[_i], mk = _b[0], mv = _b[1];
                    var addType = mv;
                    haloAttriResult[addType - 1] = attriResult[addType] * (haloTbl.add_crit[mk] / 100);
                }
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(petInfo); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                var petTbl = zj.PlayerAdviserSystem.PetBase(v.pet_id);
                if (petTbl != null) {
                    // 宠物升星增加属性
                    for (var i = 1; i <= zj.TableEnum.EnumGelAttribName.length; i++) {
                        var typeName = zj.TableEnum.EnumGelAttribName[i - 1];
                        if (petTbl[typeName] != null) {
                            for (var j = 1; j <= v.star; j++) {
                                if (i == zj.TableEnum.EnumGelAttrib.ATTR_HP || i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK || i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                                    petStarAttriResult[i - 1] = petStarAttriResult[i - 1] + attriResult[i] * petTbl[typeName][j - 1] / 100;
                                }
                                else {
                                    petStarAttriResult[i - 1] = petStarAttriResult[i - 1] + petTbl[typeName][j - 1];
                                }
                            }
                        }
                    }
                    // 宠物进化被动增加属性
                    for (var i = 1; i <= v.step + 1; i++) {
                        var skillId = petTbl.skill_island[i - 1];
                        if (skillId != null && skillId != 0) {
                            var skillTbl = zj.PlayerAdviserSystem.petSkill(skillId);
                            if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
                                var attrKey = skillTbl.attri_add[0];
                                var attrValue = skillTbl.attri_add[1];
                                if (attrKey == zj.TableEnum.EnumGelAttrib.ATTR_HP || attrKey == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK || attrKey == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                                    petStepAttriResult[attrKey - 1] = petStepAttriResult[attrKey - 1] + attriResult[attrKey] * attrValue / 100;
                                }
                                else {
                                    petStepAttriResult[attrKey - 1] = petStepAttriResult[attrKey - 1] + attrValue;
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 1; i <= zj.TableEnum.EnumGelAttribName.length; i++) {
                allAttrResult[i] = attriResult[i] + haloAttriResult[i - 1] + petStarAttriResult[i - 1] + petStepAttriResult[i - 1];
            }
            return allAttrResult;
        };
        PlayerHunterSystem.prototype.getWonderlandGeneral = function (serverFormation) {
            var sort_data = [];
            var cur_data = [];
            var baseGeneralTbl = [];
            var gCount = zj.TableLevel.Item(zj.Game.PlayerInfoSystem.BaseInfo.level).scene_formation;
            var allGen = zj.Game.PlayerHunterSystem.getSortGeneralByPower();
            var isChange = false;
            var serverList = [];
            var clientList = [];
            var serverFormat = serverFormation;
            if (serverFormat != null) {
                for (var i = 0; i < serverFormat.generals.length; i++) {
                    var v = serverFormat.generals[i];
                    if (v != 0) {
                        serverList.push(v);
                    }
                }
                for (var i = 0; i < serverFormat.reserves.length; i++) {
                    var v = serverFormat.reserves[i];
                    serverList.push(v);
                }
            }
            for (var i = 0; i < allGen.length; i++) {
                var v = allGen[i];
                if (clientList.length < gCount && v.id != 0) {
                    if (!zj.Table.VIn(baseGeneralTbl, PlayerHunterSystem.GetGeneralId(v.id))) {
                        baseGeneralTbl.push(PlayerHunterSystem.GetGeneralId(v.id));
                        clientList.push(v.id);
                    }
                }
            }
            var hasNewGeneral = function () {
                for (var i = 0; i < clientList.length; i++) {
                    var v = clientList[i];
                    if (!zj.Table.VIn(serverList, v))
                        return true;
                }
            };
            if (serverList == null || serverList.length == 0 || serverList.length > gCount || hasNewGeneral()) {
                for (var i = 0; i < clientList.length; i++) {
                    var v = clientList[i];
                    cur_data.push(v);
                }
                isChange = true;
            }
            else {
                for (var i = 0; i < serverList.length; i++) {
                    var v = serverList[i];
                    cur_data.push(v);
                }
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(cur_data); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(zj.Game.PlayerHunterSystem.mapHunters); _c < _d.length; _c++) {
                    var _e = _d[_c], v = _e[0], k = _e[1];
                    if (k.general_id == vv) {
                        var newGeneralInfo = zj.Table.DeepCopy(k);
                        // 重新计算战斗力
                        var petInfo = zj.Game.PlayerAdviserSystem.petInfo != null ? zj.Game.PlayerAdviserSystem.petInfo : [];
                        var haloId = zj.Game.PlayerInfoSystem.BaseInfo.haloId != 0 ? zj.Game.PlayerInfoSystem.BaseInfo.haloId : 0;
                        var attriResult = zj.Game.PlayerHunterSystem.sceneHaloAndPetAttri(newGeneralInfo.attri, petInfo, haloId);
                        newGeneralInfo.attri = zj.Helper.tblConvertAttri(attriResult);
                        var newAttriResult = attriResult;
                        newAttriResult.splice(0, 1);
                        var newBbattleValue = PlayerHunterSystem.CalcHXHHeroPower(attriResult, newGeneralInfo);
                        newGeneralInfo.battleValue = newBbattleValue;
                        var general = {
                            level: newGeneralInfo.level,
                            star: newGeneralInfo.star,
                            step: newGeneralInfo.step,
                            battle: newGeneralInfo.battleValue,
                            id: newGeneralInfo.general_id,
                            hp: 1,
                            rage: 0,
                            maxHp: newGeneralInfo.attri.general_hp,
                            preBattle: k.battleValue,
                            isNew: false
                        };
                        sort_data.push(general);
                        break;
                    }
                }
            }
            if (serverList.length == sort_data.length) {
                for (var i = 0; i < sort_data.length; i++) {
                    var v = sort_data[i];
                    if (v.id != serverList[i]) {
                        isChange = true;
                    }
                }
            }
            else {
                isChange = true;
            }
            return [sort_data, isChange];
        };
        /**--------------------------------------------------------- */
        //猎人变身
        PlayerHunterSystem.hunterTransform = function (id) {
            // return TableGeneralTransfer.Item(id);
        };
        /**变身猎人第五个技能升级 */
        PlayerHunterSystem.GeneralTransferSkillUp = function (generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralTransferSkillUpRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
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
        PlayerHunterSystem.replaceGeneralID = function (generalId) {
            for (var kk in zj.Game.PlayerHunterSystem.mapHunters) {
                var vv = zj.Game.PlayerHunterSystem.mapHunters[kk];
                if (vv.general_id % zj.CommonConfig.general_id_to_index_multiple == generalId % zj.CommonConfig.general_id_to_index_multiple && !vv.is_ware) {
                    return vv.general_id;
                }
            }
        };
        PlayerHunterSystem.getCanTransformHunter = function (info) {
            if (info) {
                var generalId = PlayerHunterSystem.replaceGeneralID(info.general_id);
                var transList = [];
                var defance_list = (_a = {},
                    _a[1] = [],
                    _a[2] = [],
                    _a);
                for (var kk in zj.Game.PlayerHunterSystem.mapHunters) {
                    var vv = zj.Game.PlayerHunterSystem.mapHunters[kk];
                    if (vv.level >= info.general_level && vv.star >= info.general_star
                        && vv.general_id % zj.CommonConfig.general_id_to_index_multiple == info.general_id % zj.CommonConfig.general_id_to_index_multiple
                        && vv.transfer_level < 1) {
                        transList.push(vv);
                    }
                }
                //判断猎人是否在上阵状态
                var defencelist = PlayerHunterSystem.GeneralsIdInDefence();
                var ret = [];
                var _loop_19 = function (kk) {
                    var vv = transList[kk];
                    var listid = vv.general_id;
                    var def = zj.Table.FindF(defencelist, function (k, v) {
                        return v[0] == listid;
                    });
                    if (def) {
                        defance_list[2].push(vv);
                    }
                    else {
                        defance_list[1].push(vv);
                    }
                };
                for (var kk in transList) {
                    _loop_19(kk);
                }
                for (var _ in defance_list) {
                    var k = defance_list[_];
                    for (var _2 in k) {
                        var kk = k[_2];
                        kk.staticGeneralId = info.general_id;
                        ret.push(kk);
                    }
                }
                return ret;
            }
            var _a;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 发送网络请求
        /**
         * 出售猎人
         * @param generalIds 武将ID列表
         */
        PlayerHunterSystem.prototype.sellGeneral = function (generalIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralSellRequest();
                request.body.general_ids = generalIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
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
         * 猎人出库、入库
         * @param generalIds 物件ID
         * @param isInWare 是否入库, true放入仓库 false移除仓库
         */
        PlayerHunterSystem.prototype.generalWareHouse = function (generalIds, isInWare) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralWareHouseRequest();
                request.body.general_ids = generalIds;
                request.body.is_ware = isInWare;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
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
         * 使用武将技能
         *
         * @param generalId 武将ID
         * @param skillId 技能ID
         * @param index 解锁该突破技对应的突破等级
         */
        PlayerHunterSystem.prototype.breakSkillUsing = function (generalId, skillId, index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UseBreakSkillRequest();
                request.body.generalId = generalId;
                request.body.skillId = skillId;
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
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
         * 猎人突破
         *
         * @param generalId 武将DI
         * @param exchangeIds 突破武将ID集合
         */
        PlayerHunterSystem.prototype.generalBreak = function (generalId, exchangeIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralBreakRequest();
                request.body.generalId = generalId;
                request.body.exchange_ids = exchangeIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    for (var i = 0; i < exchangeIds.length; i++) {
                        var v = exchangeIds[i];
                        _this.deleteHunterById(v);
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        PlayerHunterSystem.prototype.requsteExperienceUpdate = function (generalId, goods) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                /**发协议 */
                var request = new message.GeneralExpPropRequest();
                request.body.generalId = generalId;
                request.body.goods = goods;
                zj.Game.Controller.send(request, function (req, resp) {
                    /**收协议 */
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 猎人升星
         *
         * @param generalId 武将ID
         * @param itemId 物品id列表
         */
        PlayerHunterSystem.prototype.upStar = function (generalId, itemId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralUpStarRequest();
                request.body.generalId = generalId;
                request.body.itemId = itemId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.header.result);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        // 激活徽章
        PlayerHunterSystem.prototype.activatePartner = function (generalId, pos) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PartnerActivateRequest();
                request.body.generalId = generalId;
                request.body.pos = pos;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    zj.Tips.SetTipsOfHero(generalId, zj.Tips.TAG.GENERAL_GRADE_STEP);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 进阶
        PlayerHunterSystem.prototype.upQuality = function (generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralUpQualityRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        var msg = zj.Game.ConfigManager.getAone2CodeReason(response.header.result);
                        if (response.header.result == 10304) {
                            reject(response.header.result);
                        }
                        else {
                            reject(msg);
                        }
                        return;
                    }
                    resolve({});
                    zj.Tips.SetTipsOfHero(generalId, zj.Tips.TAG.GENERAL_GRADE);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**
         * 突破技能升级
         *
         * @param generalId 武将ID
         * @param skillId 技能ID
         * @param index x阶 技能
         * @param consumeGeneralIds 消耗的武将ID列表
         */
        PlayerHunterSystem.prototype.breakSkillUpLevel = function (generalId, skillId, index, consumeGeneralIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BreakSkillUplevelRequest();
                request.body.generalId = generalId;
                request.body.skillId = skillId;
                request.body.index = index;
                request.body.consume_generalIds = consumeGeneralIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
         * 猎人合成
         *
         * @param compoundIndex 合成索引
         * @param generalIds 合成猎人ID数组
         *
         * @description 合成之后，自动把已经合成的猎人从本地删除
         */
        PlayerHunterSystem.prototype.generalCompound = function (compoundIndex, generalIds, cd) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralComposeRequest();
                request.body.compose_index = compoundIndex + 1;
                request.body.general_ids = generalIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 删除猎人
                    for (var i = 0; i < generalIds.length; i++) {
                        var v = generalIds[i];
                        _this.deleteHunterById(v);
                    }
                    resolve();
                    //弹出获得猎人界面
                    cd();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**
         * 技能重置
         *
         * @param generalId 猎人ID
         */
        PlayerHunterSystem.prototype.skillReset = function (generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SkillResetRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 被动技能升级
         */
        PlayerHunterSystem.prototype.passiveUpLevel = function (generalId, pos) {
            var _this = this;
            if (pos === void 0) { pos = 1; }
            return new Promise(function (resolve, reject) {
                var request = new message.PassiveUpLevelRequest();
                request.body.generalId = generalId;
                request.body.pos = pos;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 技能升级
         * @param generalId 猎人ID
         * @param pos 技能位置(1-3)
         */
        PlayerHunterSystem.prototype.skillUpLevel = function (generalId, pos, isQuick) {
            var _this = this;
            if (isQuick === void 0) { isQuick = false; }
            return new Promise(function (resolve, reject) {
                var request = new message.SkillUpLevelRequest();
                request.body.generalId = generalId;
                request.body.isQuick = isQuick;
                request.body.pos = pos;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        PlayerHunterSystem.prototype.generalAddSkill = function (generalId, goods) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralAddSkillRequest();
                request.body.generalId = generalId;
                request.body.goods = goods;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * Lock or Unlock card.
         * @param generalId The hunter's ID.
         * @param lock Indicate lock or unlock.
         * @param pos The card's position(1-9).
         * @param index The potatoInfo.index.
         *
         * @description if not install, the generalId and potatoPos are both 0, if install, the index is 0, and generalId are the cHostId, pos are the message.potatoInfo.pos
         */
        PlayerHunterSystem.prototype.potatoLock = function (generalId, lock, pos, index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoLockRequest();
                request.body.generalId = generalId;
                request.body.is_lock = lock;
                request.body.potatoPos = pos;
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * Install card
         * @param generalId The hunter's ID.
         * @param index The potatoInfo.index.
         * @param pos The card's position(1-9).
         * @param replaceJade Should replace the jade, default is false.
         */
        PlayerHunterSystem.prototype.potatoWear = function (generalId, index, pos, replaceJade) {
            var _this = this;
            if (replaceJade === void 0) { replaceJade = false; }
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoWearRequest();
                request.body.generalId = generalId;
                request.body.index = index;
                request.body.potatoPos = pos;
                request.body.replaceJade = replaceJade;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        PlayerHunterSystem.prototype.unLoadAllPotato = function (generaId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoUnloadAllRequest();
                request.body.generalId = generaId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 武将合成装备请求
         *
         * @param generalId 武将ID
         * @param type  通用1，2，专属3
         */
        PlayerHunterSystem.prototype.generalSelectEquip = function (generalId, type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralSelectEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 武将装备升级请求
         *
         * @param generalId 武将ID
         * @param type 通用1，2，专属3
         */
        PlayerHunterSystem.prototype.generalUpLevelEquip = function (generalId, type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralUplevelEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 武将装备升品请求
         *
         * @param generalId 武将ID
         * @param type 通用1，2，专属3
         */
        PlayerHunterSystem.prototype.generalUpStepEquip = function (generalId, type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralUpstepEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 觉醒
         *
         * @param generalId 武将ID
         * @param sameGeneralList 同名猎人id
         * @param dollNumber 玩偶数量
         * @param isStudy 是否觉醒
         * @param isUpLevel 是否技能升级
         */
        PlayerHunterSystem.prototype.awakenPassiveToDo = function (generalId, sameGeneralList, dollNumber, isStudy, isUpLevel) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.AwakenPassiveToDoRequest();
                request.body.generalId = generalId;
                request.body.general = sameGeneralList;
                request.body.doll_num = dollNumber;
                request.body.is_study = isStudy;
                request.body.is_upLevel = isUpLevel;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 快速购买请求
         *
         * @param itemId 物品id
         * @param count  购买物品数量
         */
        PlayerHunterSystem.prototype.quickMall = function (itemId, count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QuickMallRequest();
                request.body.item_id = itemId;
                request.body.item_num = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
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
         * 武将念力激活请求
         *
         * @param generalId 武将ID
         * @param isTeach   是否新手
         * @param page      念力方案
         */
        PlayerHunterSystem.prototype.psychicActivate = function (generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralPsychicActivateRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 武将更换念力方案请求
         *
         * @param generaId 武将id
         * @param index    方案索引
         */
        PlayerHunterSystem.prototype.generalPsychicUse = function (generaId, index) {
            return new Promise(function (resolve, reject) {
                // let request = new message.GeneralPsychicUseRequest();
                // request.body.generalId = generaId;
                // request.body.use_index = index;
                // Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                //     let response = <message.GeneralPsychicUseResponse>resp;
                //     if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                //         reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                //         return;
                //     }
                //     resolve();
                // },
                //     (req: aone.AoneRequest): void => {
                //         reject(LANG("请求超时"));
                //     }, this, false);
            });
        };
        /**
         * 武将解锁新念力请求
         *
         * @param generalId   武将id
         * @param unlockIndex 方案索引
         */
        PlayerHunterSystem.prototype.generalPsychicUnlock = function (generalId, unlockIndex) {
            return new Promise(function (resolve, reject) {
                // let request = new message.GeneralPsychicUnlockRequest();
                // request.body.generalId = generalId;
                // request.body.unlock_index = unlockIndex;
                // Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                //     let response = <message.GeneralPsychicUnlockResponse>resp;
                //     if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                //         reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                //         return;
                //     }
                //     resolve();
                // },
                //     (req: aone.AoneRequest): void => {
                //         reject(LANG("请求超时"));
                //     }, this, false);
            });
        };
        /**
         * 武将念力修炼请求
         *
         * @param generalId  武将id
         * @param pos        锁定位子
         * @param page       念力方案
         */
        PlayerHunterSystem.prototype.generalPsychicRefresh = function (generalId, pos, consume_generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralPsychicRefreshRequest();
                request.body.generalId = generalId;
                request.body.pos = pos;
                request.body.consume_generalId = consume_generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**
         * 武将念力修炼确认请求
         *
         * @param generalId 武将id
         * @param isReplace 是否替换
         * @param page      念力方案
         */
        PlayerHunterSystem.prototype.generalPsychicReplace = function (generalId, isReplace, page) {
            return new Promise(function (resolve, reject) {
                // let request = new message.GeneralPsychicReplaceRequest();
                // request.body.generalId = generalId;
                // request.body.is_replace = isReplace;
                // request.body.page = page;
                // Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                //     let response = <message.GeneralPsychicReplaceResponse>resp;
                //     if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                //         reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                //         return;
                //     }
                //     resolve();
                // },
                //     (req: aone.AoneRequest): void => {
                //         reject(LANG("请求超时"));
                //     }, this, false);
            });
        };
        PlayerHunterSystem.prototype.generalRecruit = function (soulId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var generalId = PlayerHunterSystem.SoulIdFindGeneral(soulId).general_id;
                var request = new message.GeneralRecruitRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var callGeneralId = response.body.gameInfo.generals[0].general_id;
                    resolve(callGeneralId);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        //单个武将最大升星升级战力值
        PlayerHunterSystem.prototype.getLvAndStarFullValue = function (general_id) {
            var result = 0;
            result = this.getLvAndStarPower(general_id, zj.CommonConfig.role_max_level, zj.CommonConfig.general_max_star);
            return result;
        };
        //单个武将升星升级战力值
        PlayerHunterSystem.prototype.getLvAndStarPower = function (general_id, level, star) {
            var result = 0;
            var aptitude = PlayerHunterSystem.Table(general_id).aptitude;
            result = (250 + level * 250 * (1 + 0.5 * (star - 1))) * aptitude / 10;
            return result;
        };
        //羁绊卡和品阶提供的最大战力值
        PlayerHunterSystem.prototype.getPartnerFullPower = function (general_id) {
            var aptitude = PlayerHunterSystem.Table(general_id).aptitude;
            var result = this.partnerPower(aptitude, zj.CommonConfig.general_max_quality, 4);
            return result;
        };
        //羁绊卡通用计算
        PlayerHunterSystem.prototype.partnerPower = function (aptitude, step, num) {
            var result = (36 * 5 * step ^ 2 + 290 * 5 * step + (36 * 5 * (step + 1) ^ 2 + 290 * 5 * (step + 1) - 36 * 5 * step ^ 2 - 290 * 5 * step) * 0.9 * num / 4) * aptitude / 10;
            return result;
        };
        PlayerHunterSystem.prototype.GetAttriByPotatos = function (potatos) {
            var generalValue = zj.Helper.CreateGeneralAttrTbl();
            var generalPercent = zj.Helper.CreateGeneralAttrTbl();
            var talentSet = [];
            var result = zj.Helper.CreateGeneralAttrTbl();
            for (var i = 0; i < potatos.length; i++) {
                var _a = zj.PlayerCardSystem.GetExtraAttriTbl(potatos[i]), gEValue = _a[0], gEPercent = _a[1], pEValue = _a[2], pEPercent = _a[3], eTalent = _a[4];
                gEValue = zj.Helper.integrateAttri(gEValue);
                gEPercent = zj.Helper.integrateAttri(gEPercent);
                pEValue = zj.Helper.integrateAttri(pEValue);
                pEPercent = zj.Helper.integrateAttri(pEPercent);
                var baseTbl1 = this.getBaseAttriTbl(potatos[i]);
                var baseTbl = zj.Helper.integrateAttri(baseTbl1);
                for (var j = 0; j < zj.TableEnum.EnumAttriReal.length; j++) {
                    var i_4 = zj.TableEnum.EnumAttriReal[j];
                    result[i_4] = result[i_4] + baseTbl[i_4] * (100 + pEPercent[i_4]) / 100 + pEValue[i_4];
                    generalValue[i_4] = generalValue[i_4] + gEValue[i_4];
                    generalPercent[i_4] = generalPercent[i_4] + gEPercent[i_4];
                }
                for (var i_5 = 0; i_5 < eTalent.length; i_5++) {
                    talentSet.push(eTalent[i_5]);
                }
            }
            return [result, generalValue, generalPercent, talentSet];
        };
        //基础属性
        PlayerHunterSystem.prototype.getBaseAttriTbl = function (potato) {
            return zj.PlayerCardSystem.GetBaseAttri(potato.id, potato.star, potato.level);
        };
        //突破技能信息
        PlayerHunterSystem.prototype.GetBreakInfo = function (generalInfo) {
            function f(v, _v) {
                return _v.key == v;
            }
            var breakInfo = {};
            for (var k in generalInfo.using_break_skill) {
                var v = generalInfo.using_break_skill[k];
                if (v != 0) {
                    var value = [null, null][0];
                    for (var i = 0; i < generalInfo.break_skill.length; i++) {
                        if (f(v, generalInfo.break_skill[i])) {
                            value = [generalInfo.break_skill[i], i][0];
                        }
                    }
                    if (value != null) {
                        breakInfo[v] = value.value;
                    }
                }
            }
            return breakInfo;
        };
        PlayerHunterSystem.prototype.getSortGeneralFormat = function () {
            var sort_data = [];
            var hunter = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(hunter); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (!v.is_ware) {
                    sort_data.push(v);
                }
            }
            sort_data.sort(PlayerHunterSystem.SortGeneral);
            return sort_data;
        };
        PlayerHunterSystem.prototype.getSortGeneral = function () {
            var sort_data = [];
            var hunters = zj.Game.PlayerHunterSystem.allHuntersMap();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.HunterSkillInfoItem); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.level > 0) {
                    sort_data.push(v);
                }
            }
            sort_data.sort(PlayerHunterSystem.SortGeneral);
            return sort_data;
        };
        //新手查看第三章奖励是否领取
        PlayerHunterSystem.prototype.TeachCondition8009 = function () {
            //图鉴中存在
            var LEIOULIID = 10031;
            var getLEIOULI = zj.Table.VIn(zj.Game.PlayerHunterHistorySystem.getGeneralHistoryIds, LEIOULIID);
            //奖励领取
            var canGetAward = false;
            var mobId = 100021;
            var instances = zj.Table.FindR(zj.Game.PlayerInstanceSystem.mobInfos, function (k, v) {
                if (v.mobId == mobId) {
                    return true;
                }
            });
            if (instances != null && instances[0].star) {
                mobId = instances;
            }
            if (mobId instanceof Number || mobId[0].star == 0) {
            }
            else if (mobId[0].chestReward == false) {
                canGetAward = true;
            }
            return canGetAward && !getLEIOULI;
        };
        PlayerHunterSystem.prototype.getGeneralPsychicAttri = function (general_id) {
            var ret = [];
            var psyTbl = this.Table(general_id).psychic_unlock_six;
            for (var k in psyTbl) {
                if (psyTbl.hasOwnProperty(k)) {
                    var v = psyTbl[k];
                    ret[k] = this.InstancePsychicAttri(Number(v));
                }
            }
            return ret;
        };
        PlayerHunterSystem.prototype.InstancePsychicAttri = function (id) {
            if (zj.ckid(id)) {
                return null;
            }
            return zj.TableGeneralPsychicAttri.Item(id);
        };
        PlayerHunterSystem.transformSel = 1;
        /**任意猎人突破选中的猎人材料 */
        PlayerHunterSystem.breakSelectedGenerals = []; //突破选中的猎人材料
        /**同名猎人突破选中的猎人材料 */
        PlayerHunterSystem.breakSelectedGenerals1 = []; //突破选中的猎人材料
        return PlayerHunterSystem;
    }());
    zj.PlayerHunterSystem = PlayerHunterSystem;
    __reflect(PlayerHunterSystem.prototype, "zj.PlayerHunterSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerHunterSystem.js.map