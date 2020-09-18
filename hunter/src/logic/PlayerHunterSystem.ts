namespace zj {
    // 玩家猎人(武将)系统
    // guoshanhe 创建于2018.11.13
    // 对应db_general.ts

    export class PlayerHunterSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        /**
         * 查询map_role模型映射表
         * 
         * @returns 对应ID的映射表， 如果ID为空或者-1，返回null
         */
        public static MapInstance(id: number | string): TableMapRole {
            if (id == null || id == -1 || id == undefined) return null
            return TableMapRole.Item(id);
        }

        // 武将UID对应武将ID
        public static GetGeneralId(id: number) {
            return id % CommonConfig.general_id_to_index_multiple;
        }

        public static Table(generalId: number | string, trnsfer?: number): any {
            let transfer_level = trnsfer || 0;
            let id = PlayerHunterSystem.GetGeneralId(Number(generalId));
            let info = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v: message.GeneralInfo) => {
                return v.general_id == generalId;
            })[0]
            if (id == null || id == 0) {
                return null;
            }
            if (transfer_level > 0 && info.is_show_transfer) {
                return TableGeneralTransfer.Item(id);
            } else {
                return TableBaseGeneral.Item(id);
            }

        }

        /** 根据碎片id查找武将表 */
        public static SoulIdFindGeneral(soulId: number): TableBaseGeneral {
            let id = soulId - 30000;
            return PlayerHunterSystem.Table(id);
        }

        /**
         * 查询玩家武将碎片值占比
         * @param soulId 碎片ID
         */
        public static SoulCount(soulId: number): [number, number, number] {
            let count = Game.PlayerItemSystem.itemCount(soulId);
            let callCount = PlayerHunterSystem.SoulIdFindGeneral(soulId).soul_count;
            let percent = (count / callCount >= 1) ? 1 : count / callCount;
            return [count, callCount, percent];
        }

        /**
         * 获取猎人ID列表
         * 
         * @param type TableEnum.Enum.HXHHunterEnum  猎人卡片分类, 默认按照等级分类
         * 
         * @returns Array 经过排序之后的猎人ID数组
         */
        public static GetHunterList(type?: number): Array<number> {
            let _type = (type == null) ? TableEnum.Enum.HXHHunterEnum.Level : type;

            let _hunters: Array<message.GeneralInfo> = [];
            for (let k in Game.PlayerHunterSystem.mapHunters) {
                if (Game.PlayerHunterSystem.mapHunters.hasOwnProperty(k)) {
                    let v = Game.PlayerHunterSystem.mapHunters[k];
                    if (v != null
                        && v.level > 0
                        && v.is_ware == false) {
                        let table = PlayerHunterSystem.Table(k);
                        if (table != null &&
                            table != undefined &&
                            table.is_open == 1) {
                            _hunters.push(v);
                        }
                    }
                }
            }

            if (_type == TableEnum.Enum.HXHHunterEnum.Level) {
                // descend
                _hunters.sort(function (a: message.GeneralInfo, b: message.GeneralInfo) {
                    if (a.level == b.level) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                if (gnr_a.aptitude == gnr_b.aptitude) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                } else {
                                    return gnr_b.aptitude - gnr_a.aptitude;
                                }
                            } else {
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        } else {
                            return b.star - a.star;
                        }
                    } else {
                        return b.level - a.level;
                    }
                });

            } else if (_type == TableEnum.Enum.HXHHunterEnum.Star) {
                _hunters.sort(function (a: message.GeneralInfo, b: message.GeneralInfo) {
                    if (a.star == b.star) {
                        if (a.awakePassive.level == b.awakePassive.level) {
                            if (a.level == b.level) {
                                let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                if (gnr_a.aptitude == gnr_b.aptitude) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                } else {
                                    return gnr_b.aptitude - gnr_a.aptitude;
                                }
                            } else {
                                return b.level - a.level;
                            }
                        } else {
                            return b.awakePassive.level - a.awakePassive.level;
                        }
                    } else {
                        return b.star - a.star;
                    }

                });

            } else if (_type == TableEnum.Enum.HXHHunterEnum.Quality) {
                _hunters.sort(function (a: message.GeneralInfo, b: message.GeneralInfo) {
                    let gnr_a = PlayerHunterSystem.Table(a.general_id);
                    let gnr_b = PlayerHunterSystem.Table(b.general_id);
                    if (gnr_a.aptitude == gnr_b.aptitude) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    return gnr_b.general_id - gnr_a.general_id;
                                } else {
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            } else {
                                return b.star - a.star;
                            }
                        } else {
                            return b.level - a.level;
                        }
                    } else {
                        return gnr_b.aptitude - gnr_a.aptitude;
                    }
                });
            }

            let result = [];
            for (let i = 0; i < _hunters.length; i++) {
                let v = _hunters[i];
                result.push(v.general_id);
            }
            return result;
        }

        /**
         * 获取碎片ID列表
         * 
         * @param level 等级，默认0
         * 
         * @returns Array 经过排序之后的碎片ID数组
         * 
         * @description 武将碎片排序（开启 > 可召唤 > 武将品质 > 武将ID）
         */
        public static GetHunterSoulList(level: number = 0): Array<number> {
            let generalSoul = TableItemGeneralSoul.Table();
            let _souls = [];
            for (let k in generalSoul) {
                if (generalSoul.hasOwnProperty(k)) {
                    let v: TableItemGeneralSoul = generalSoul[k];
                    let soulTbl = PlayerHunterSystem.SoulIdFindGeneral(v.id);

                    let count = Game.PlayerItemSystem.itemCount(v.id);
                    if (count == null) count = 0;

                    let is_open = soulTbl.is_open;
                    let soul_count = soulTbl.soul_count;
                    let can_call = (count >= soul_count) ? 1 : 0;
                    let _tbl = {
                        id: v.id,
                        count: count,
                        is_open: is_open,
                        soul_count: soul_count,
                        can_call: can_call
                    };
                    if (level == 0) {
                        _souls.push(_tbl);
                    } else {
                        if (soulTbl.aptitude == level) {
                            _souls.push(_tbl);
                        }
                    }
                }
            }

            _souls.sort(function (a, b) { // descend
                if (a.is_open == b.is_open) {
                    if (a.can_call == b.can_call) {
                        let soul_a = PlayerHunterSystem.SoulIdFindGeneral(a.id);
                        let soul_b = PlayerHunterSystem.SoulIdFindGeneral(b.id);
                        if (soul_a.aptitude == soul_b.aptitude) {
                            if (soul_a.client_sort == soul_b.client_sort) {
                                return b.id - a.id;
                            } else { // ascend
                                return soul_a.client_sort - soul_b.client_sort;
                            }
                        } else {
                            return soul_b.aptitude - soul_a.aptitude;
                        }
                    } else {
                        return b.can_call - a.can_call;
                    }
                } else {
                    return b.is_open - a.is_open;
                }
            });

            let result = [];
            for (let i = 0; i < _souls.length; i++) {
                let v = _souls[i];
                result.push(v.id);
            }
            return result;
        }

        /**
         * 获取所属武将头像
         * */
        public static Head(generalId: number | message.GeneralSimpleInfo | message.GeneralInfo) {

            function _get_head(generalId: any, transfer = null, vis?) {
                let info_gnr = PlayerHunterSystem.Table(generalId, transfer);
                let hero_head = "";
                let bTransfer = transfer > 0;
                if (bTransfer && vis) {
                    let info_map = TableMapRole.Item(info_gnr.transfer_role);
                    hero_head = info_map.head_path
                } else {
                    let info_map = TableMapRole.Item(info_gnr.general_roleId);
                    let generalInfo = Game.PlayerHunterSystem.queryHunter(generalId);
                    let fashion_id = generalInfo == null ? null : (generalInfo.fashionId == 0 ? false : true);
                    let bFashionWear = fashion_id;
                    let bFashionHave = true;// info_map.fashion != -1;
                    let bFashionSame = true;
                    let bFashion = bFashionWear && bFashionHave && bFashionSame;
                    hero_head = bFashion && TableMapRole.Item(TableItemFashion.Item(generalInfo.fashionId).fashion_roleId).head_path || info_map.head_path;
                }
                return hero_head;
            }

            if (typeof generalId != "number") {
                // 服务器透传部分
                // let info = generalId;
                let info = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v: message.GeneralInfo) => {
                    return v.general_id == generalId.general_id;
                })[0];
                if (info) {
                    return _get_head(info.general_id, info.transfer_level, info.fashionId);
                } else {
                    return _get_head(generalId.general_id);
                }

            } else {
                // 默认自己武将的头像fashionId
                let info = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v: message.GeneralInfo) => {
                    return v.general_id == generalId;
                })[0];
                if (info) {
                    return _get_head(generalId, info.transfer_level, info.fashionId);
                } else {
                    return _get_head(generalId);
                }
            }
        }

        public GeneralTransferLevel(generalId) {
            let generalMsg = this.queryHunter(generalId);
            let transfer_level = 0;
            if (generalMsg != null) {
                transfer_level = generalMsg.transfer_level;
            }
            return transfer_level;
        }

        /** 返回英雄品质框（圆） */
        public static Frame(generalId: number) {
            let hunter = Game.PlayerHunterSystem.queryHunter(generalId);
            if (hunter == null) return "";
            let stepTable = TableGeneralStep.Table();
            return stepTable[hunter.step].frame_path;
        }

        /**
         * 武将信息对应形象 ID
         */
        public static GetGeneralRoleInfoID(id: number) {
            let generalInfo = Game.PlayerHunterSystem.queryHunter(id);
            let generalTbl = PlayerHunterSystem.Table(id);
            let picMapRoleId = generalTbl.general_roleId;
            if (generalInfo == null) return picMapRoleId;

            let fashionMapRoleInfo = PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId);

            let fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return fashionMapRoleId ? fashionMapRoleId : picMapRoleId;
        }

        /**
         * 获取突破信息
         * @param id 突破阶级, 范围1 - 9
         */
        public static HunterBreak(id: number): TableGeneralBreakup {
            return TableGeneralBreakup.Item(id);
        }

        /**
         * 获取突破属性信息
         * 
         * @param id 武将ID, 范围10001 - 100774
         */
        public static HunterBreakAttri(id: number): TableGeneralBreak {
            return TableGeneralBreak.Item(id);
        }

        /**
         * 获取突破等级上限
         * @param level 突破等级 1- 3
         * 
         * @returns 元祖 [增加等级上限, 下一等级， 上一等级];
         */
        public static GetBreakHunterLevel(level: number) {
            let tbl = TableGeneralBreakup.Table();
            let levelAdd = PlayerHunterSystem.HunterBreak(level).add_level;
            let levelNext = Table.Add(1, level + 1, function (i) {
                return tbl[i].add_level;
            });
            let levelPre = Table.Add(1, level + 1, function (i) {
                return tbl[i].add_level;
            });
            return [levelAdd, levelNext, levelPre];
        }

        /**
         * 猎人时装
         */
        public static GetFahionInfo(id: number): TableItemFashion {
            if (id == null || id == undefined || id == -1) return null;
            return TableItemFashion.Item(id);
        }

        /**
         * 羁绊洞提升属性获取
         * @param generalId 
         * @param step 
         * @param pos 
         * 
         * @description from db_hole.lua
         */
        public static GetHoleValueTbl(generalId: number, step: number, pos: number): number[] {
            let result = Helper.CreateGeneralAttrTbl();
            let quality_partner = PlayerHunterSystem.Table(generalId).quality_partner;
            let holeId = quality_partner[step][pos - 1];
            let tbl = TableGeneralHole.Item(holeId);
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i <= TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = tbl[TableEnum.EnumGelAttribName[i - 1]];
                if (value != null) {
                    result[i - 1] = value;
                }
            }
            return result;
        }

        /**
         * 
         * @param generalId 
         * @param step 
         * @param holeId 
         * 
         * @description from db_hole.lua
         */
        public static GetHoleValueText(generalId, step, holeId) {

        }

        /**
         * 
         * @param generalId 
         * @param holeId 
         * 
         * @description from db_hole.lua
         */
        public static GetHole(generalId: number, holeId: number) {
            let partner_lv = Game.PlayerHunterSystem.queryHunter(generalId).step;
            partner_lv = partner_lv + 1;
            let table = PlayerHunterSystem.Table(generalId);
            if (table == null) return null;
            let hole_ids = table.quality_partner;
            let hole_id = hole_ids[partner_lv - 1][holeId - 1];

            return TableGeneralHole.Item(hole_id);
        }

        /**
         * 查询羁绊卡洞激活等级
         * @param generalId 
         * @param holeId 
         * 
         * @description from db_hole.lua
         */
        public static GetHoleLevel(generalId: number, holeId: number) {
            return PlayerHunterSystem.GetStep(generalId).general_pos[holeId - 1];
        }

        /**
         * 查询品阶
         * @param generalId 
         * 
         * @description from db_hole.lua
         */
        public static GetStep(generalId: number): TableGeneralStep {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            return TableGeneralStep.Item(hunterInfo.step);
        }

        /**
         * 查询下一品阶
         * @param generalId 
         * 
         * @description from db_hole.lua
         */
        public static GetNextStep(generalId: number): TableGeneralStep {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            return TableGeneralStep.Item(hunterInfo.step + 1);
        }

        /**
         * 查询羁绊卡洞最大等级阶数
         * @param lv 
         * 
         * @default from db_hole.lua
         */
        public static GetHoleLevelMax(lv) {

        }

        /**
         * 查询羁绊卡表格
         * @param generalId 
         * @param holeId 1 - 4
         *
         * @description from db_hole.lua
         */
        public static GetPartner(generalId: number, holeId: number) {
            let partner_lv = Game.PlayerHunterSystem.mapHunters[generalId].step + 1;
            let table = PlayerHunterSystem.Table(generalId);
            if (table == null) return null;
            let hole_ids = table.quality_partner;
            let hole_id = hole_ids[partner_lv - 1][holeId - 1];

            let hole_info = TableGeneralHole.Item(hole_id);

            let partner_info = TableItemPartner.Item(hole_info.partner_id);

            return partner_info;
        }

        /**
         * 查询羁绊卡碎片表格
         * @param partnerId 
         * 
         * @description from db_hole.lua
         */
        public static GetPartnerSplit(partnerId) {

        }

        /**
         * 查询武将羁绊卡等级
         * 
         * @param generalId 
         * @param partnerId 
         * 
         * @description from db_hole.lua
         */
        public static GetPartnerLv(generalId: number, partnerId: number): number {
            let general = Game.PlayerHunterSystem.queryHunter(generalId);
            if (general.partner.length == 0 && general.step == CommonConfig.general_max_quality) {
                return general.step;
            } else {
                for (let i = 0; i < general.partner.length; i++) {
                    let v = general.partner[i];
                    if (v == partnerId) {
                        return general.step + 1;
                    }
                }
                return general.step;
            }

        }

        /** 
         * 查询玩家武将经验值 
         * 
         * 元组返回 当前经验值 总经验值 当前经验值于总经验值百分比
         * */
        public static Exp(generalId: number) {
            let general = Game.PlayerHunterSystem.queryHunter(generalId);
            let generalInfo = PlayerHunterSystem.Table(generalId);
            let level: TableLevel = null;
            if (general.level != null) {
                level = TableLevel.Item(general.level);
            }
            let expNow = general.exp;
            let expNext = (level != null) ? level.general_exp[generalInfo.aptitude % 10 - 1] : 0;

            let expPercent = (expNow / expNext > 1.0) ? 1.0 : expNow / expNext;
            return [expNow, expNext, expPercent];
        }

        /**
         *升多级查询经验
         *
         * @static
         * @param {number} generalId 武将等级
         * @param {number} maxLevel 当前阶级最大等级与最大等级中小的一个
         * @memberof PlayerHunterSystem 
         */
        public static ExpFive(generalId: number, maxLevel: number) {
            let general = Game.PlayerHunterSystem.queryHunter(generalId);
            let upLevel = Math.min(general.level + 5, maxLevel);
            let generalInfo = PlayerHunterSystem.Table(generalId);
            let expNow = general.exp;
            let expNext = 0;
            for (let i = general.level; i < upLevel; i++) {
                let level: TableLevel = null;
                if (general.level != null) {
                    level = TableLevel.Item(i);
                    expNext += (level != null) ? level.general_exp[generalInfo.aptitude % 10 - 1] : 0;
                }
            }
            return [expNow, expNext];
        }

        /** 查询玩家武将碎片值 */
        public static Soul(generaId: number): [number, number, number] {
            let hunter = Game.PlayerHunterSystem.queryHunter(generaId);
            let baseGeneral = PlayerHunterSystem.Table(generaId);
            let soulNow = Game.PlayerItemSystem.itemCount(generaId);
            if (hunter.star == CommonConfig.general_max_star) {
                return [soulNow, 0, 1];
            }

            let soulNext = (hunter.level == 0) ? baseGeneral.soul_count : baseGeneral.up_star_soul[hunter.star];
            let soulPercent = (soulNow / soulNext) > 1.0 ? 1.0 : (soulNow / soulNext);
            return [soulNow, soulNext, soulPercent];
        }

        /**
         * 在防守阵容中的猎人
         * 
         * @returns 二维数组 [[],[]], 小数组里面有两个值，第一个是id，第二个值是类型
         */
        public static GeneralsIdInDefence(): Array<[number, number]> {
            let defenceList: Array<[number, number]> = [];

            let curFormations = Game.PlayerFormationSystem.curFormations;
            // if (curFormations == null || curFormations.length < 7) {
            //     return defenceList;
            // }

            let formation = curFormations[message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE - 1];

            for (let index = 0; index < formation.generals.length; index++) {
                let v = formation.generals[index];
                if (v != 0) {
                    let find = Table.FindF(defenceList, function (_k, _v) {
                        return _v[0] == v;
                    });
                    if (!find) {
                        defenceList.push([v, 1]);
                    }
                }
            }

            for (let index = 0; index < formation.supports.length; index++) {
                let v = formation.supports[index];
                if (v != 0) {
                    let find = Table.FindF(defenceList, function (_k, _v) {
                        return _v[0] == v;
                    });
                    if (!find) {
                        defenceList.push([v, 1]);
                    }
                }
            }

            for (let k in Game.PlayerFormationSystem.formatsSingleDefine) {
                if (Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(k)) {
                    let v = Game.PlayerFormationSystem.formatsSingleDefine[k];

                    for (let index = 0; index < v.generals.length; index++) {
                        let vv = v.generals[index];
                        if (vv != 0) {
                            let find = Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 2]);
                            }
                        }
                    }

                    for (let index = 0; index < v.supports.length; index++) {
                        let vv = v.supports[index];
                        if (vv != 0) {
                            let find = Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 2]);
                            }
                        }
                    }
                }
            }

            for (let k in Game.PlayerFormationSystem.formatsGroupFight) {
                if (Game.PlayerFormationSystem.formatsGroupFight.hasOwnProperty(k)) {
                    let v = Game.PlayerFormationSystem.formatsGroupFight[k];
                    for (let index = 0; index < v.generals.length; index++) {
                        let vv = v.generals[index];
                        if (vv != 0) {
                            let find = Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 4]);
                            }
                        }
                    }

                    for (let index = 0; index < v.supports.length; index++) {
                        let vv = v.supports[index];
                        if (vv != 0) {
                            let find = Table.FindF(defenceList, function (_k, _v) {
                                return _v[0] == vv;
                            });
                            if (!find) {
                                defenceList.push([vv, 4]);
                            }
                        }
                    }
                }
            }

            for (let _ in Game.PlayerInstanceSystem.SearchInfo) {
                if (Game.PlayerInstanceSystem.SearchInfo.hasOwnProperty(_)) {
                    let v = Game.PlayerInstanceSystem.SearchInfo[_];
                    for (let _ in v.generalId) {
                        if (v.generalId.hasOwnProperty(_)) {
                            let vv = v.generalId[_];
                            if (vv != 0) {
                                let find = Table.FindF(defenceList, (_k, _v) => {
                                    return _v[0] == vv;
                                })
                                if (!find) {
                                    defenceList.push([vv, 3]);
                                }
                            }
                        }
                    }
                }
            }

            // TO DO
            // 副本信息 
            return defenceList;
        }

        /** 
         * 武将出售排序 
         * 
         * @param type 排序类型
         * 
         * 返回经过排序的武将ID
         */
        public static GetSellHunterList(type) {
            type = type == null ? TableEnum.Enum.HXHHunterEnum.Level : type;
            let max_star_limit = 5;
            let hunters = [];

            let defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            let generalsMap: any = Table.DeepCopy(Game.PlayerHunterSystem.allHuntersMap());
            for (let k in generalsMap) {
                if (generalsMap.hasOwnProperty(k)) {
                    let v = generalsMap[k];
                    let baseGeneralInfo = PlayerHunterSystem.Table(Number(k));
                    if (v != null
                        && baseGeneralInfo != null
                        && v.level > 0
                        && v.star < max_star_limit
                        && !v.is_ware
                        && baseGeneralInfo.is_open == 1
                        && baseGeneralInfo.aptitude != 14) {
                        let findInDefence = Table.FindF(defenceGenerals, function (_k, _v) {
                            return _v[0] == v.general_id;
                        });
                        let sellGeneralInfo = Table.DeepCopy(v);
                        sellGeneralInfo.b_defence = findInDefence ? 1 : 0;
                        hunters.push(sellGeneralInfo);
                    }
                }
            }

            if (type === TableEnum.Enum.HXHHunterEnum.Level) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) { // ascend
                                        return gnr_a.general_id - gnr_b.general_id
                                    } else { // ascend
                                        return gnr_a.aptitude - gnr_b.aptitude;
                                    }
                                } else { // ascend
                                    return a.awakePassive.level - b.awakePassive.level;
                                }
                            } else { // ascend
                                return a.star - b.star;
                            }
                        } else { // ascend
                            return a.level - b.level;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_denfence;
                    }
                });
            } else if (type === TableEnum.Enum.HXHHunterEnum.Star) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) { // ascend
                                        return gnr_a.general_id - gnr_b.general_id;
                                    } else { // ascend
                                        return gnr_a.aptitude - gnr_b.aptitude;
                                    }
                                } else { // ascend
                                    return a.level - b.level;
                                }
                            } else { // ascend
                                return a.awakePassive.level - b.awakePassive.level;
                            }
                        } else { // ascend
                            return a.star - b.star;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_defence;
                    }
                }
                );
            } else if (type === TableEnum.Enum.HXHHunterEnum.Quality) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        let gnr_a = PlayerHunterSystem.Table(a.general_id);
                        let gnr_b = PlayerHunterSystem.Table(b.general_id);
                        if (gnr_a.aptitude == gnr_b.aptitude) {
                            if (a.level == b.level) {
                                if (a.star == b.star) {
                                    if (a.awakePassive.level == b.awakePassive.level) { // ascend
                                        return gnr_a.general_id - gnr_b.general_id;
                                    } else { // ascend
                                        return a.awakePassive.level - b.awakePassive.level;
                                    }
                                } else { // ascend
                                    return a.star - b.star;
                                }
                            } else { // ascend
                                return a.level - b.level;
                            }
                        } else { // ascend
                            return gnr_a.aptitude - gnr_b.aptitude;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_defence;
                    }
                });
            }

            let result = [];
            for (let index = 0; index < hunters.length; index++) {
                let v = hunters[index];
                result.push(v.general_id);
            }
            return result;
        }

        /**
         * 武将仓库排序
         * @param type 类型
         * @param beWare 是否在仓库中
         */
        public static GetWareHunterList(type = TableEnum.Enum.HXHHunterEnum.Level, beWare: boolean) {
            let hunters = [];
            let defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            message.GeneralInfo
            let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
            for (let k in generalsMap) {
                if (generalsMap.hasOwnProperty(k)) {
                    let v = generalsMap[k];
                    let baseGeneralInfo = PlayerHunterSystem.Table(Number(k));
                    if (v != null
                        && v.level > 0
                        && v.is_ware == beWare
                        && baseGeneralInfo != null
                        && baseGeneralInfo.is_open == 1) {
                        let findInDefence = Table.FindF(defenceGenerals, function (_, _v) {
                            return _v[0] == v.general_id;
                        });
                        v.b_defence = findInDefence ? 1 : 0;
                        hunters.push(v);
                    }
                }
            }

            if (type == TableEnum.Enum.HXHHunterEnum.Level) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        if (a.level == b.level) {
                            if (a.star == b.star) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) { // descend
                                        return gnr_b.general_id - gnr_a.general_id;
                                    } else { // descend
                                        return gnr_b.aptitude - gnr_a.aptitude;
                                    }
                                } else { // descend
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            } else { // descend
                                return b.star - a.star;
                            }
                        } else { // descend
                            return b.level - a.level;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_defence;
                    }
                });
            } else if (type == TableEnum.Enum.HXHHunterEnum.Star) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    let gnr_a = PlayerHunterSystem.Table(a.general_id);
                                    let gnr_b = PlayerHunterSystem.Table(b.general_id);
                                    if (gnr_a.aptitude == gnr_b.aptitude) { // descend
                                        return gnr_b.general_id - gnr_a.general_id;
                                    } else { // descend  资质(11/12/13/14)
                                        return gnr_b.aptitude - gnr_a.aptitude;
                                    }
                                } else { // descend
                                    return b.level - a.level;
                                }
                            } else { // descend
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        } else { // descend
                            return b.star - a.star;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_defence;
                    }
                });
            } else if (type == TableEnum.Enum.HXHHunterEnum.Quality) {
                hunters.sort(function (a: any, b: any) {
                    if (a.b_defence == b.b_defence) {
                        let gnr_a = PlayerHunterSystem.Table(a.general_id);
                        let gnr_b = PlayerHunterSystem.Table(b.general_id);
                        if (gnr_a.aptitude == gnr_b.aptitude) {
                            if (a.level == b.level) {
                                if (a.star == b.star) {
                                    if (a.awakePassive.level == b.awakePassive.level) { // descend
                                        return gnr_b.general_id - gnr_a.general_id;
                                    } else { // descend
                                        return b.awakePassive.level - a.awakePassive.level;
                                    }
                                } else { // descend
                                    return b.star - a.star;
                                }
                            } else { // descend
                                return b.level - a.level;
                            }
                        } else { // descend
                            return gnr_b.aptitude - gnr_a.aptitude;
                        }
                    } else { // ascend
                        return a.b_defence - b.b_defence;
                    }
                });
            }

            let result = [];
            for (let i = 0; i < hunters.length; i++) {
                let v = hunters[i];
                result.push(v.general_id);
            }
            return result;
        }

        /** 单个武将的升星系数表 */
        public static GetGelStarRatioTbl(generalId: number, star: number) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId)

            let result = Helper.CreateGeneralAttrTbl()
            if (star == 0) {
                return result;
            }

            let tbl = TableGeneralStar.Item(generalId);
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i <= TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let t = tbl[TableEnum.EnumGelAttribName[i - 1]]
                if (t != null) {
                    result[i - 1] = t[star - 1]
                }

            }
            return result
        }

        /** 单个武将的基础属性输出 */
        public static GetGelBaseValueTbl(generalId: number) {

            let tbl = PlayerHunterSystem.Table(generalId)
            let result = Helper.CreateGeneralAttrTbl()
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i <= TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = tbl[TableEnum.EnumGelAttribName[i - 1]]
                if (value != null) {
                    result[i - 1] = value
                }
            }
            return result
        }

        /** 单个武将的进阶数值表 */
        public static GetGelQualityValueTbl(generalId: number, quality: number) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId)

            let result = Helper.CreateGeneralAttrTbl()
            if (quality == 0) { return result }
            let tbl = TableGeneralQuality.Item(generalId)
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i <= TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let t = tbl[TableEnum.EnumGelAttribName[i - 1]]
                if (t != null) {
                    result[i - 1] = t[quality - 1]
                }
            }
            return result
        }

        /** 单个武将所有羁绊洞提升数值表 */
        public static GetGelHoleValueTbl(generalId: number, partners: Array<number>, step: number) {
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId)

            let result = Helper.CreateGeneralAttrTbl()
            //if ( step == 0 ){ return result }
            if (partners != null) {
                for (let [k, v] of HelpUtil.GetKV(partners)) {
                    if (v > 0) {
                        let holeTbl = PlayerHunterSystem.GetHoleValueTbl(generalId, step, v)
                        for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i <= TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                            result[i - 1] = result[i - 1] + holeTbl[i - 1]
                        }
                    }
                }
            }
            return result
        }

        /** 单个武将工会技能附加数值 */
        public static getGelLeagueValueTbl(baseAttr: number[], generalId: number) {
            let result = Helper.CreateGeneralAttrTbl();
            let list = Game.PlayerLeagueSystem.getSkillList();
            if (list) {
                let features = PlayerHunterSystem.Table(generalId).features;// 1-攻击，2-防御，3-辅助
                let typeList = Game.PlayerLeagueSystem.getSkillValueType(features);
                for (let i = 0; i < list.length; i++) {
                    if (typeList.indexOf(list[i].key) >= 0) {
                        let [attType, value] = Game.PlayerLeagueSystem.getSkillValue(list[i].key, list[i].value);
                        if (value != 0) {
                            result[attType - 1] += value;
                        }
                    }
                }
                // 如果是百分比，则转换为加成后的数值
                for (let i = 0; i < result.length; ++i) {
                    if (Game.PlayerLeagueSystem.isSkillPercent(i + 1)) {
                        result[i] = baseAttr[i] * result[i] / 100;
                    }
                }
            }
            return result;
        }

        public static HXHCalcCelCardAttr(baseAttr: Array<number>, cardsInfo: Array<message.PotatoInfo>) {
            let ret = Helper.CreateGeneralAttrTbl();
            let talentSet = [];
            for (let k = 0; k < cardsInfo.length; k++) {
                let v = cardsInfo[k];
                let [value, percent] = PlayerCardSystem.GetBaseAttri(v.id, v.star, v.level);
                let [extraValue, extraPercent, , , eTalent] = PlayerCardSystem.GetExtraAttriTbl(v);
                for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                    if (value[i] != 0) {
                        ret[i] += value[i];
                    } else if (percent[i] != 0) {
                        ret[i] += percent[i] / 100 * baseAttr[i];
                    }
                    if (extraValue[i] != 0) {
                        ret[i] += extraValue[i];
                    } else if (extraPercent[i] != 0) {
                        ret[i] += extraPercent[i] / 100 * baseAttr[i];
                    }
                }
                for (let i = 0; i < eTalent.length; i++) {
                    let v = eTalent[i];
                    talentSet.push(v);
                }
            }
            return [ret, talentSet];
        }

        public static GetAwakeLevelAttr(generalId: number, level: number) {
            let baseGelId = PlayerHunterSystem.GetGeneralId(generalId);
            let tbl = TableHunterAwake.Item(baseGelId);
            let result = Helper.CreateGeneralAttrTbl();
            if (level == 0 || tbl == null) {
                return result;
            }
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = tbl[TableEnum.EnumGelAttribName[i]];
                if (value != null && value[level - 1] != null) {
                    result[i] = value[level - 1];
                }
            }
            return result;
        }

        public static GetBreakLevelAttr(generalId, level) {
            let baseGelId = PlayerHunterSystem.GetGeneralId(generalId);

            let tbl = TableGeneralBreak.Item(baseGelId);
            let result = Helper.CreateGeneralAttrTbl();
            if (level == 0 || tbl == null) {
                return result;
            }
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = tbl[TableEnum.EnumGelAttribName[i]];
                if (value != null && value[level - 1] != null) {
                    result[i] = value[level - 1];
                }
            }
            return result;
        }

        public static IsAwakeProPercent(eAttr: number): boolean {
            return (eAttr == TableEnum.EnumGelAttrib.ATTR_HP || eAttr == TableEnum.EnumGelAttrib.ATTR_PHY_ATK || eAttr == TableEnum.EnumGelAttrib.ATTR_PHY_DEF);
        }

        public static HXHCalcAwakeAttrValue(baseAttr: Array<number>, generalId: number, awakenPassive: message.PassiveInfo) {
            let attrTbl = PlayerHunterSystem.GetAwakeLevelAttr(generalId, awakenPassive.level);
            let result = Helper.CreateGeneralAttrTbl();
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (PlayerHunterSystem.IsAwakeProPercent(i + 1)) {
                    result[i] = baseAttr[i] * attrTbl[i] / 100;
                } else {
                    result[i] = attrTbl[i];
                }
            }
            return result;
        }

        public static HXHCalcCelPsychicAttr(baseAttr: Array<number>, generalId: number, psyInfos: Array<message.PsychicInfo>) {
            let ret = Helper.CreateGeneralAttrTbl();
            let genTbl = PlayerHunterSystem.Table(generalId);
            for (let i = 0; i < psyInfos.length; i++) {
                let psyId = genTbl.psychic_unlock_six[i];
                let tblInfo = TableGeneralPsychicAttri.Item(psyId);
                if (tblInfo.object_type == 1) {
                    ret[tblInfo.attri_type - 1] = ret[tblInfo.attri_type - 1] + tblInfo.attri_value[psyInfos[i].level - 1]
                } else if (tblInfo.object_type == 2) {
                    ret[tblInfo.attri_type - 1] = ret[tblInfo.attri_type - 1] + tblInfo.attri_value[psyInfos[i].level - 1] / 100 * baseAttr[tblInfo.attri_type - 1]
                }
            }
            return ret;
        }

        public static HXHCalcCelBreakUpAttr(baseAttr: Array<number>, generalId: number, breakLevel: number) {
            let attrTbl = PlayerHunterSystem.GetBreakLevelAttr(generalId, breakLevel);
            let result = Helper.CreateGeneralAttrTbl();
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                result[i] = attrTbl[i];
            }
            return result;
        }

        /**
         * from db_equip.lua
         */
        public static GetLevelAttri(attrId: number, level: number) {
            let tbl = TableGeneralEquipAttri.Item(attrId);
            let attri = Table.Add(0, level, function (id) {
                return tbl.attri_add[id];
            });
            return attri;
        }

        public static GetStepAttri1(generalInfo: message.GeneralInfo, attrId: number | string, step: number) {
            let tbl = TableGeneralEquipAttri.Item(attrId);
            let [info] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(generalInfo);
            let attri_type = tbl.attri_type;
            let value = info[attri_type - 1];
            let attri = Table.Add(0, step, function (id) {
                return tbl.attri_add[id];
            });
            return value * (attri / 100);
        }

        /**
         * from db_equip.lua
         */
        public static GetBaseAttri(generalInfo: message.GeneralInfo, id: number | string, step: number, level: number) {

            let tbl = TableGeneralEquip.Item(id);
            let result = Helper.CreateGeneralAttrTbl();
            let percent = Helper.CreateGeneralAttrTbl();
            if (tbl == null) {
                return [result, percent];
            }

            let levelAttri = 0;
            for (let i = 0; i < level; i++) {
                levelAttri = PlayerHunterSystem.GetLevelAttri(tbl.main_attri, level);
            }

            let [stepAttri1, stepAttri2] = [0, 0];
            for (let i = 1; i <= step; i++) {
                stepAttri1 = PlayerHunterSystem.GetStepAttri1(generalInfo, tbl.add_attri_one, step);
                if (tbl.add_attri_two != null && tbl.add_attri_two != "") {
                    stepAttri2 = PlayerHunterSystem.GetStepAttri1(generalInfo, tbl.add_attri_two, step);
                }
            }

            let attriTbl = TableGeneralEquipAttri.Item(tbl.main_attri);
            let main_attri_type = attriTbl.attri_type;
            let add_attri1 = TableGeneralEquipAttri.Item(tbl.add_attri_one).attri_type;
            let add_attri2 = null;

            if (tbl.add_attri_two != null && tbl.add_attri_two != "") {
                add_attri2 = TableGeneralEquipAttri.Item(tbl.add_attri_two).attri_type;
            }

            if (add_attri2 == null) {
                if (main_attri_type == add_attri1) {
                    result[attriTbl.attri_type - 1] = levelAttri + stepAttri1 + stepAttri2;
                } else {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri1 - 1] = stepAttri1;
                }
            } else {
                if (main_attri_type == add_attri1 && main_attri_type == add_attri2) {
                    result[attriTbl.attri_type - 1] = levelAttri + stepAttri1 + stepAttri2;
                } else if (main_attri_type == add_attri1 && main_attri_type != add_attri2) {
                    result[main_attri_type - 1] = levelAttri + stepAttri1;
                    result[add_attri2 - 1] = stepAttri2;
                } else if (main_attri_type == add_attri2 && main_attri_type != add_attri1) {
                    result[main_attri_type - 1] = levelAttri + stepAttri2;
                    result[add_attri1 - 1] = stepAttri1;
                } else if (main_attri_type != add_attri2 && main_attri_type != add_attri1 && add_attri2 == add_attri1) {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri2 - 1] = stepAttri1 + stepAttri2;
                } else if (main_attri_type != add_attri2 && main_attri_type != add_attri1 && add_attri2 != add_attri1) {
                    result[main_attri_type - 1] = levelAttri;
                    result[add_attri1 - 1] = stepAttri1;
                    result[add_attri2 - 1] = stepAttri2;
                }
            }
            return [result, percent];
        }

        public static HXHCalcCelEquipAttr(generalInfo: message.GeneralInfo, baseAttr: number[], equipInfo: Array<message.EquipInfo>) {
            let ret = Helper.CreateGeneralAttrTbl();
            for (let i = 0; i < equipInfo.length; i++) {
                let v = equipInfo[i];
                let [value,] = PlayerHunterSystem.GetBaseAttri(generalInfo, v.equipId, v.step, v.level);
                for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                    if (value[i] && value[i] != 0) {
                        ret[i] += value[i];
                    }
                }
            }
            return ret;
        }

        /** 突破等级 */
        public static GetLevelByBreak(generalInfo: message.GeneralInfo): [number, number, number] {
            let [breakLevel1, breakLevel2, breakLevel3] = [0, 0, 0];

            for (let i = 0; i < 3; i++) {
                let skill = generalInfo.using_break_skill[i] ? generalInfo.using_break_skill[i] : 0;

                let [levelInfo,] = Table.FindR(generalInfo.break_skill, function (_k, _v) {
                    return _v.key == skill;
                })

                if (levelInfo != null) {
                    if (i == 0) {
                        breakLevel1 = levelInfo.value;
                    } else if (i == 1) {
                        breakLevel2 = levelInfo.value;
                    } else if (i == 2) {
                        breakLevel3 = levelInfo.value;
                    }
                }
            }

            return [breakLevel1, breakLevel2, breakLevel3];
        }

        /**
         * 猎人统一战力测试用计算
         * 
         * @param attrTbl 属性信息
         * @param generalInfo 武将信息
         * 
         * @description 自动技等级，手动技等级，被动技等级，觉醒技等级，突破技能1,2,3,攻击，暴击，暴击伤害，生命值，防御，暴击抵抗，速度，效果命中，效果抵抗，格挡率.
         */
        public static CalcHXHHeroPower(attrTbl: Array<number>, generalInfo: message.GeneralInfo): number {
            let power = 0;
            if (attrTbl == null) return power;
            let [skillLevel1, skillLevel2, initPassive] = [0, 0, 0];

            if (generalInfo.skills[0] != null) {
                skillLevel1 = generalInfo.skills[0].level;
            }
            if (generalInfo.skills[1] != null) {
                skillLevel2 = generalInfo.skills[1].level;
            }
            if (generalInfo.passives[0] != null) {
                initPassive = generalInfo.passives[0].level;
            }

            let [breakLevel1, breakLevel2, breakLevel3] = PlayerHunterSystem.GetLevelByBreak(generalInfo);

            let awakePassive = generalInfo.awakePassive.level;

            let equipInfo = PlayerHunterSystem.Table(generalInfo.general_id).equip_info;
            let equipId = equipInfo[equipInfo.length - 1];
            let [skillActivaLevel, equip_level] = [0, 0];
            if (equipId != 0) {
                let baseEquipInfo = TableGeneralEquip.Item(equipId);
                let skillLevel = baseEquipInfo.skillLevel;
                if (baseEquipInfo.skillActivaLevel.length > 0) {
                    skillActivaLevel = baseEquipInfo.skillActivaLevel[0];
                }
                for (let i = 0; i < generalInfo.equipInfo.length; i++) {
                    let v = generalInfo.equipInfo[i];
                    if (v.equipId == equipId && v.step >= skillActivaLevel) {
                        equip_level = skillLevel[v.step - 1];
                    }
                }
            }

            let general_hp = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_HP - 1]);
            let general_atk = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_ATK - 1]);
            let general_def = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_DEF - 1]);
            let atk_crit = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT - 1]);
            let crit_extra = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA - 1]);
            let crit_resistance = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS - 1]);
            let cd_speed = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_CD_SPEED - 1]);
            let skill_atk = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_HTV - 1]);
            let skill_def = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_EVA - 1]);
            let dodge_rate = Math.ceil(attrTbl[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE - 1]);

            power = CommonConfig.hunter_calc_battervalue(skillLevel1, skillLevel2, initPassive, awakePassive, breakLevel1, breakLevel2, breakLevel3, equip_level, general_atk, atk_crit, crit_extra, general_hp, general_def, crit_resistance, cd_speed, skill_atk, skill_def, dodge_rate, Game.PlayerAdviserSystem.adviser);
            return Math.ceil(power);
        }
        /**
         * 猎人 获得武将8种属性基础值(武将界面显示用)
         * 
         * @return 元祖 [属性信息， 战斗值]
         */
        public static HXHCalcGelBaseAttrToShow(generalInfo: message.GeneralInfo): [Array<number>, number] {
            let result = PlayerHunterSystem.HXHGetGelBaseAttrByArgument(generalInfo.general_id, generalInfo.level, generalInfo.star, generalInfo.step, generalInfo.partner);
            return [result, PlayerHunterSystem.CalcHXHHeroPower(result, generalInfo)];
        }

        /**  猎人 获得武将8种属性基础值(战斗用 ) */
        public static HXHCalcGelBaseAttrToBattle(generalInfo: message.GeneralInfo) {
            return PlayerHunterSystem.HXHGetGelBaseBattleAttrByArgument(generalInfo.general_id, generalInfo.level, generalInfo.star, generalInfo.step, generalInfo.partner)
        }

        public static HXHGetGelBaseBattleAttrByArgument(id: number, level: number, star: number, step: number, partner: Array<number>) {
            let result = Helper.CreateGeneralAttrTbl();
            if (id == null || level == null || star == null || step == null) {
                return result;
            }

            let starRatioTbl = PlayerHunterSystem.GetGelStarRatioTbl(id, star);
            let baseValueTbl = PlayerHunterSystem.GetGelBaseValueTbl(id);
            let stepValueTbl = PlayerHunterSystem.GetGelQualityValueTbl(id, step);
            let holeTbl = PlayerHunterSystem.GetGelHoleValueTbl(id, partner, step);
            // 计算附加具体数值
            for (let j = 0; j < TableEnum.EnumAttriReal.length; j++) {
                let i = TableEnum.EnumAttriReal[j]
                let value = (10 + level / 1.2) * starRatioTbl[i - 1] +
                    stepValueTbl[i - 1] +
                    holeTbl[i - 1] +
                    baseValueTbl[i - 1];
                result[i - 1] = value;
            }
            result.unshift(0);
            return result;
        }


        /**
        * 计算猎人属性
        * 
        * @param id 武将ID
        * @param level 等级
        * @param star 星级
        * @param step 阶级
        * @param partner 羁绊激活(1-4)
        */
        public static HXHGetGelBaseAttrByArgument(id: number, level: number, star: number, step: number, partner: Array<number>) {
            let result = Helper.CreateGeneralAttrTbl();
            if (id == null || level == null || star == null || step == null) {
                return result;
            }

            //    基础属性：包括等级、星级、进阶属性（1+2+3）
            //    基础属性：包括等级、星级、进阶属性（1+2+3
            //    1.等级、星级属性：等级*星级属性  （星级属性由Star表读取）
            //    2.进阶属性： 当前阶属性（由quality表读取） + 激活的孔所加总属性 （由hole表读取）
            //    3.武将基本属性（basegeneral表读取）

            let starRatioTbl = PlayerHunterSystem.GetGelStarRatioTbl(id, star);
            let baseValueTbl = PlayerHunterSystem.GetGelBaseValueTbl(id);
            let stepValueTbl = PlayerHunterSystem.GetGelQualityValueTbl(id, step);
            let holeTbl = PlayerHunterSystem.GetGelHoleValueTbl(id, partner, step);
            /**
             * 10种基础属性
             * 1-生命值, 2-攻击, 3-防御, 24-防御, 6-暴击率, 8-暴击率, 10-格挡率, 5-格挡率, 4-格挡率, 9-格挡率
             */
            for (let j = 0; j < TableEnum.EnumHunterAttriShow.length; j++) {
                let i = TableEnum.EnumHunterAttriShow[j] - 1;
                let value = (10 + level / 1.2) * starRatioTbl[i] + stepValueTbl[i] + holeTbl[i] + baseValueTbl[i];
                result[i] = value;
            }
            return result;
        }

        static Str_NameGr(generalId: number, generalStep: number): [string, number] {
            let gnr = Game.PlayerHunterSystem.queryHunter(generalId);
            let info = PlayerHunterSystem.Table(generalId);
            let step = (generalStep != null) ? generalStep : gnr.step;
            let strStep = TableGeneralStep.Item(step).name;

            let str_name = "";
            if (gnr.level > 0) {
                str_name = HelpUtil.textConfigFormat("%s Lv%d", strStep, gnr.level);
            } else {
                str_name = HelpUtil.textConfigFormat("%s", info.general_name);
            }
            let color_name = Helper.GetStepColor(step);

            return [str_name, color_name];
        }

        /** 查询是否拥有武将 */
        public static GetHasGeneral(id: number): boolean {
            let hunter = Game.PlayerHunterSystem.queryHunter(id);
            return id != 0 && hunter != null && hunter.level > 0;
        }

        /**
         * 出售武将（星级价格，养成消耗徽章价值，进阶花费）
         */
        public static SellGeneralPrice(generalId: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let starNum = CommonConfig.sell_general_money(hunterInfo.star);
            let holeNum = 0;
            let stepNum = 0;
            let generalInfo = PlayerHunterSystem.Table(generalId);

            for (let i = 0; i < hunterInfo.step; i++) {
                for (let k in generalInfo.quality_partner[i]) {
                    if (generalInfo.quality_partner[i].hasOwnProperty(k)) {
                        let v = generalInfo.quality_partner[i][k];
                        let holeInfo = TableGeneralHole.Item(v);
                        if (holeInfo != null) {
                            let partnerId = holeInfo.partner_id;
                            let activateNum = holeInfo.activate_num;
                            let partnerInfo = TableItemPartner.Item(partnerId);
                            holeNum += activateNum * partnerInfo.price;
                        }
                    }
                }
            }

            for (let i = 0; i < 4; i++) {
                let partnerLv = PlayerHunterSystem.GetPartnerLv(generalId, i);
                if (hunterInfo.step < partnerLv) {
                    // hole id
                    let partner_lv = hunterInfo.step + 1;
                    let hole_id = generalInfo.quality_partner[partner_lv][i];

                    // hole info
                    let hole_info = TableGeneralHole.Item(hole_id);
                    let hole_num = hole_info.activate_num;

                    // partner info
                    let partner_price = TableItemPartner.Item(hole_info.partner_id).price;

                    holeNum += partner_price * hole_num;
                }
            }

            // step 
            let stepTbl = TableGeneralStep.Table();
            for (let i = 0; i < hunterInfo.step; i++) {
                stepNum += stepTbl[i].consume_money;
            }

            return (starNum + holeNum + stepNum);
        }

        /**
         * 猎人 获得武将8种属性附加值(武将界面显示用) 卡片属性、缘分属性
         * @param generalInfo 猎人信息
         */
        public static HXHCalcGelOtherAttrToShow(generalInfo: message.GeneralInfo) {
            let generalId = generalInfo.general_id;
            let [baseAttr,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(generalInfo);
            let [cardAttr,] = PlayerHunterSystem.HXHCalcCelCardAttr(baseAttr, generalInfo.potatoInfo); // 正在改
            let awakenAttr = PlayerHunterSystem.HXHCalcAwakeAttrValue(baseAttr, generalId, generalInfo.awakePassive);
            let psyAttr = PlayerHunterSystem.HXHCalcCelPsychicAttr(baseAttr, generalId, generalInfo.psychicInfo);
            let breakAttr = PlayerHunterSystem.HXHCalcCelBreakUpAttr(baseAttr, generalId, generalInfo.break_level);
            let equipAttr = PlayerHunterSystem.HXHCalcCelEquipAttr(generalInfo, baseAttr, generalInfo.equipInfo);//已改
            let transAttr = PlayerHunterSystem.HXHCalcCelTranAttr(generalInfo)
            let skinAttr = PlayerHunterSystem.getSkinProperty(baseAttr, generalInfo);//皮肤属性加成
            let league = PlayerHunterSystem.getGelLeagueValueTbl(baseAttr, generalId);// 工会技能加成
            let ret = Helper.CreateGeneralAttrTbl();
            let attriArray = [...TableEnum.EnumHunterAttriShow]
            for (let j = 0; j < attriArray.length; j++) {
                let i = attriArray[j] - 1;
                let value = cardAttr[i] + awakenAttr[i] + psyAttr[i] + breakAttr[i] + equipAttr[i] + transAttr[i] + skinAttr[i] + league[i];
                ret[i] = value;
            }
            return ret;
        }

        /**
         * 查询npc
         * 
         * from db_other.lua
         */
        public static NpcDialog(npcId: number | string, talkId?: number) {
            let talkInfo = TableClientUiTalk.Item(npcId);
            var index = talkId ? talkId : Math.floor((Math.random() * talkInfo.dialog.length));
            var text = talkInfo.dialog[index];
            return text;
        }

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
        public static GetPassiveSkillDes(talendId: number, level?: number): [string, Array<number>] {
            let skillLevel = level ? level : 1;
            let talentInfo = TableGeneralTalent.Item(talendId);
            let prob = talentInfo.trigger_rate[1]; // 触发基础概率及升级参数
            let des = "";
            if (prob != 0) {
                des += Helper.StringFormat(TextsConfig.TextsConfig_Hunter.talent_des_trigger, talentInfo.trigger_rate[0] + prob * skillLevel)
            }

            let param = [];
            // 天赋效果
            let effectInfo = TableGeneralTalentEffect.Item(talentInfo.talent_effect[0]);
            if (effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2 ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON) {
                let buffId = effectInfo.effect_buffId;
                let buffInfo = TableSkillBuff.Item(buffId);
                let paramList = [];
                if (buffInfo.des_param2.length > 0) {
                    for (let i = 0; i < buffInfo.des_param2.length; i++) {
                        let v = buffInfo.des_param2[i];
                        let value = v[0] + skillLevel * v[1];
                        paramList.push(Number((value).toFixed(1)));
                    }
                } else {
                    for (let i = 0; i < buffInfo.des_param.length; i++) {
                        let v = buffInfo.des_param[i];
                        let value = v[0] + skillLevel * v[1];
                        paramList.push(Number((value).toFixed(1)));
                    }
                }
                des += Helper.StringFormat(buffInfo.skill_des, ...paramList);
                param = paramList.concat();
            } else {
                let paramList = [];
                for (let i = 0; i < talentInfo.talent_effect.length; i++) {
                    let v = talentInfo.talent_effect[i];
                    let effectTbl = TableGeneralTalentEffect.Item(v);
                    let value = 0;
                    if (effectTbl.effect_value2.length > 0) {
                        value = effectTbl.effect_value2[0] + skillLevel * effectTbl.effect_value2[1];
                    } else {
                        value = effectTbl.effect_value[0] + skillLevel * effectTbl.effect_value[1];
                    }
                    paramList.push(Number((value).toFixed(1)));
                }
                des += Helper.StringFormat(talentInfo.talent_describe, ...paramList);
                param = paramList.concat();
            }
            return [des, param];
        }

        public static GetPassiveSkillDesByType(talendId: number) {
            let info = TableGeneralTalent.Item(talendId);
            return info ? info.skill_des : "";
        }

        /**
         * 被动技能显示（装备用）
         * @param id 技能ID
         * @param level 技能等级
         * 
         * from db_skill.lua
         */
        public static GetPassiveSkillEquipDes(id: number, level = 1): [string, Array<number>] {
            let talentInfo = TableGeneralTalent.Item(id);
            if (talentInfo == null) {
                return ["", []];
            }

            let value = talentInfo.trigger_rate[0];
            let prob = talentInfo.trigger_rate[1];
            let des = "";
            if (prob != 0) {
                des += Helper.StringFormat(TextsConfig.TextsConfig_Hunter.talent_des_trigger, value + prob * level);
            }

            let paramList = [];
            let effectInfo = TableGeneralTalentEffect.Item(talentInfo.talent_effect[0]);
            if (effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2 ||
                effectInfo.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON) {
                let buffId = effectInfo.effect_buffId;
                let buffInfo = TableSkillBuff.Item(buffId);
                if (buffInfo.des_param2.length > 0) {
                    for (let i = 0; i < buffInfo.des_param2.length; i++) {
                        let v = buffInfo.des_param2[i];
                        let value = v[0] + level * v[1];
                        paramList.push(value);
                    }
                } else {
                    for (let i = 0; i < buffInfo.des_param.length; i++) {
                        let v = buffInfo.des_param[i];
                        let value = v[0] + level * v[1];
                        paramList.push(value);
                    }
                }

                des = buffInfo.skill_des;
            } else {
                for (let i = 0; i < talentInfo.talent_effect.length; i++) {
                    let v = talentInfo.talent_effect[i];
                    let effectTbl = TableGeneralTalentEffect.Item(v);
                    if (effectTbl.effect_value2.length > 0) {
                        let value = effectTbl.effect_value2[0] + level * effectTbl.effect_value2[1];
                        paramList.push(value);
                    } else {
                        let value = effectTbl.effect_value[0] + level * effectTbl.effect_value[1];
                        paramList.push(value);
                    }
                }
                des = talentInfo.talent_describe;
            }
            return [des, paramList];
        }

        /**
         * 获取主动技能升级描述信息
         * from db_skill.lua
         */
        public static GetActiveSkillUpgradeDes(skillId: number, level?: number): string {
            let skillLevel = level ? level : 1;
            let skillInfo = TableGeneralSkill.Item(skillId);
            // 升级描速
            let upgradeDes = Helper.StringFormat(skillInfo.upgrade_des, skillInfo.skill_hurt_ratio[0] + skillLevel * skillInfo.skill_hurt_ratio[1]);

            // 附加描述
            let talentDes = "";
            for (let i = 0; i < skillInfo.talent_des.length; i++) {
                let v = skillInfo.talent_des[i];
                let [str,] = PlayerHunterSystem.GetPassiveSkillDes(Number(v), skillLevel);
                talentDes += str;
            }

            // BUFF描述
            let buffDes = "";
            for (let i = 0; i < skillInfo.buff_des.length; i++) {
                let v = skillInfo.buff_des[i];
                let buffInfo = TableSkillBuff.Item(v);
                let paramList = [];
                if (buffInfo.des_param2.length > 0) { // 假技能描述参数1
                    for (let i = 0; i < buffInfo.des_param2.length; i++) {
                        let vv = buffInfo.des_param2[i];
                        let value = vv[0] + skillLevel * vv[1];
                        if (Object.keys(value.toString()).length > 10) {
                            paramList.push(value.toFixed(1));
                        } else {
                            paramList.push(value);
                        }
                    }
                } else { // 技能描述参数1
                    for (let i = 0; i < buffInfo.des_param.length; i++) {
                        let vv = buffInfo.des_param[i];
                        let value = vv[0] + skillLevel * vv[1];
                        if (Object.keys(value.toString()).length > 10) {
                            paramList.push(value.toFixed(1));
                        } else {
                            paramList.push(value);
                        }
                    }
                }
                buffDes += Helper.StringFormat(buffInfo.skill_des, ...paramList);
            }

            return upgradeDes + talentDes + buffDes;
        }

        /**
         * 获取主动技能描述信息
         * 
         * from db_skill.lua
         */
        public static GetActiveSkillDes(skill_id, level = 1) {
            let skillInfo = TableGeneralSkill.Item(skill_id);
            let des = Helper.StringFormat(skillInfo.des, skillInfo.skill_hurt_ratio[0] + level * skillInfo.skill_hurt_ratio[1]);

            let talentDes = "";
            for (let i = 0; i < skillInfo.talent_des.length; i++) {
                let v = skillInfo.talent_des[i];
                let [str,] = PlayerHunterSystem.GetPassiveSkillDes(Number(v), level);
                talentDes += str;
            }

            let buffDes = "";
            for (let i = 0; i < skillInfo.buff_des.length; i++) {
                let v = skillInfo.buff_des[i];
                let buffInfo = TableSkillBuff.Item(v);
                let paramList = [];
                if (buffInfo.des_param2.length != 0) {
                    for (let j = 0; j < buffInfo.des_param2.length; j++) {
                        let vv = buffInfo.des_param2[j];
                        let value = vv[0] + level * vv[1];
                        paramList.push(value);
                    }
                } else {
                    for (let j = 0; j < buffInfo.des_param.length; j++) {
                        let vv = buffInfo.des_param[j];
                        let value = vv[0] + level * vv[1];
                        paramList.push(value);
                    }
                }
                buffDes += Helper.StringFormat(buffInfo.skill_des, ...paramList);
            }
            return des + talentDes + buffDes;
        }

        /**
         * 被动技能
         * from db_skill.lua
         */
        public static GetTalentSkillLvList(talentId: number) {
            let ret = [];
            for (let i = 1; i <= CommonConfig.general_max_skill_level; i++) {
                ret.push(PlayerHunterSystem.GetPassiveSkillDes(talentId, i)[0]);
            }
            return ret;
        }

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
        public static GetSkillEachLvList(generalId: number, biographyShow?: boolean): Array<any> {

            let getNextLevel = function (info, id: number | string) {
                let skillId = Number(id);
                if (skillId != 0) {
                    let result = PlayerHunterSystem.GetActiveSkillUpgradeDes(skillId, Math.floor(skillId / 1000000));
                    info.upList.push(result);
                    return getNextLevel(info, TableGeneralSkill.Item(skillId).uplevel_Id);
                } else {
                    return info;
                }
            };

            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let skillIdNext = 1000000;
            let ret = [];
            for (let i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                let v = baseGeneralInfo.skill_ids[i];
                let skillId;
                let des = ""
                if (biographyShow) {
                    skillId = v;
                    des = PlayerHunterSystem.GetActiveSkillDes(skillId, 0);
                } else {
                    skillId = hunterInfo.skills[i].level * skillIdNext + v % skillIdNext;
                    des = PlayerHunterSystem.GetActiveSkillDes(skillId, hunterInfo.skills[i].level);
                }

                let upList: Array<string> = [];
                upList.push(PlayerHunterSystem.GetActiveSkillUpgradeDes(v, 1));
                let info = TableGeneralSkill.Item(v);
                let name = info.skill_name;

                let result = getNextLevel({
                    "des": des,
                    "name": name,
                    "upList": upList,
                    "info": info
                }, info.uplevel_Id);

                ret.push(result);
            }

            if (baseGeneralInfo.init_passive[0] != 0) {
                let talTbl = TableGeneralTalent.Item(baseGeneralInfo.init_passive[0]);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(talTbl.talent_id),
                    "info": talTbl
                });
            }

            if (baseGeneralInfo.awake_passive != 0) {
                let talTbl = TableGeneralTalent.Item(baseGeneralInfo.awake_passive);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(talTbl.talent_id),
                    "info": talTbl
                });
            }
            let transferTbl = TableGeneralTransfer.Item(generalId % CommonConfig.general_id_to_index_multiple);
            //（猎人有变身技 and  变身技等级不是0 ） 显示变身技 
            if (transferTbl.transfer_skill != 0 && hunterInfo.transfer_level != 0) {
                let talTbl = TableGeneralTalent.Item(transferTbl.transfer_skill);
                ret.push({
                    "des": talTbl.talent_type_des,
                    "name": talTbl.talent_name,
                    "upList": PlayerHunterSystem.GetTalentSkillLvList(transferTbl.transfer_skill),
                    "info": talTbl
                })
            }

            return ret;
        }

        /**
         * AttriAdd
         * @param id The hunter's ID.
         * @param level The array's index.
         * 
         * from db_skill.lua
         */
        public static AttriAdd(id: number, level: number): [Array<number>, Array<number>] {
            let generalId = id % CommonConfig.general_id_to_index_multiple;
            let awakeInfo = TableHunterAwake.Item(generalId);
            let result = Helper.CreateGeneralAttrTbl();
            // if (level == 0) { // 0级 不显示当前属性信息
            //     return [result, []];
            // }

            level -= 1; // almost all array has 5 element, level range is 1 - 5,
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                let v = awakeInfo[TableEnum.EnumGelAttribName[i]];
                if (v != null && v[level] != null) {
                    result[i] = v[level];
                }
            }

            let des = [];
            let attri = [];
            for (let i = 0; i < result.length; i++) {
                let v = result[i];
                if (v != 0) {
                    attri.push(v);
                    des.push(i);
                }
            }
            return [attri, des];
        }

        /**
         * SkillConsume
         * @param generalId The hunter's ID.
         * 
         * @returns Object {"general_id": aptitude}
         * from db_skill.lua
         */
        public static SkillConsume(generalId: number): Array<message.GeneralInfo | Object> {
            let aptitude = null;
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo.aptitude > 12) {
                aptitude = CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];
            }
            let result: message.GeneralInfo[] = [];
            let allHunterMap = Game.PlayerHunterSystem.allHuntersMap();
            for (let kk in allHunterMap) {
                if (allHunterMap.hasOwnProperty(kk)) {
                    let vv = allHunterMap[kk] as message.GeneralInfo;
                    if (vv != null &&
                        vv.general_id != generalId &&
                        vv.is_ware == false &&
                        vv.general_id % CommonConfig.general_id_to_index_multiple == generalId % CommonConfig.general_id_to_index_multiple) {
                        result.push(vv);
                    }
                }
            }

            let list: [Array<message.GeneralInfo>, Array<message.GeneralInfo>, Array<Object>] = [[], [], []];
            for (let i = 0; i < result.length; i++) {
                let v = result[i];
                let defenceTbl = PlayerHunterSystem.GeneralsIdInDefence();
                let isDefence = Table.FindF(defenceTbl, (_, _v) => {
                    return _v[0] == v.general_id;
                });
                if (isDefence) {
                    list[1].push(v);
                } else {
                    list[0].push(v);
                }
            }

            list[0].sort(PlayerHunterSystem.SkillSortGeneral);
            list[1].sort(PlayerHunterSystem.SkillSortGeneral);
            let count = null;
            if (aptitude != null) {
                count = PlayerItemSystem.Count(aptitude);
            }
            if (count != null && count != 0) {
                for (let i = 0; i < count; i++) {
                    if (baseGeneralInfo.aptitude > 12) {
                        list[2].push({ "general_id": aptitude });
                    }
                }
            }

            let ret = [];
            for (let i = 0; i < list.length; i++) {
                let v = list[i];
                for (let j = 0; j < v.length; j++) {
                    let vv = v[j];
                    ret.push(vv);
                }
            }
            return ret;
        }

        private static SkillSortGeneral(a: message.GeneralInfo, b: message.GeneralInfo): number {
            let gnrA = PlayerHunterSystem.Table(a.general_id);
            let gnrB = PlayerHunterSystem.Table(b.general_id);
            if (gnrA.is_open != gnrB.is_open) {
                if (gnrA.is_open == 0) return 1;
                if (gnrB.is_open == 0) return -1;
            }
            if (a.step == b.step) {
                if (a.star == b.star) {
                    if (gnrA.aptitude == gnrB.aptitude) {
                        if (a.battleValue == b.battleValue) { // descend
                            return PlayerHunterSystem.GetGeneralId(b.general_id) - PlayerHunterSystem.GetGeneralId(a.general_id);
                        } else {
                            return b.battleValue - a.battleValue;
                        }
                    } else {
                        return b.level - a.level;
                    }
                } else {
                    return b.star - a.star;
                }
            } else {
                return b.step - a.step;
            }
        }

        /**
         * 判断满足突破材料的猎人
         * 
         * @param level 等级
         * @param generalId 猎人ID
         * @param break1所需突破数
         * @param type0:任意猎人 1：同名猎人
         * @returns Array 所有满足条件的猎人信息数组
         */
        public static GetCanBreakHunter(level: number, generalId: number, break1?: number) {
            let breakInfo = PlayerHunterSystem.HunterBreak(level);
            let zero = Table.FindF(breakInfo.exchange_generals, function (_, v) {
                return v == 0;
            });
            let exchange_gnr = zero ? 0 : 1;

            let generalList: Array<message.GeneralInfo> = [];
            let allHunters = Game.PlayerHunterSystem.allHuntersMap();
            let vis = true;
            if (level == 4) {
                vis = false;
            }
            for (let kk in allHunters) {
                if (allHunters.hasOwnProperty(kk)) {
                    let vv = allHunters[kk];
                    if (vv != null &&
                        vv.general_id != generalId &&
                        vv.break_level >= break1 &&
                        vv.star >= level &&
                        vv.awakePassive.level >= breakInfo.exchange_awaken[0]) {
                        if (vis) {
                            let vis = Table.FindF(PlayerHunterSystem.breakSelectedGenerals1, (k, v) => {
                                return vv.general_id == v
                            })
                            if (!vis) {
                                generalList.push(vv);
                            }
                        } else if (!vis &&
                            vv.general_id % CommonConfig.general_id_to_index_multiple == generalId % CommonConfig.general_id_to_index_multiple) {
                            let vis = Table.FindF(PlayerHunterSystem.breakSelectedGenerals, (k, v) => {
                                return vv.general_id == v
                            })
                            if (!vis) {
                                generalList.push(vv);
                            }
                        }
                    }
                }
            }

            let list = [[], []];
            let defenceList = PlayerHunterSystem.GeneralsIdInDefence();
            for (let i = 0; i < generalList.length; i++) {
                let vv = generalList[i];
                let def = Table.FindF(defenceList, function (k, v) {
                    return v[0] == vv.general_id;
                });
                if (def) {
                    list[1].push(vv);
                } else {
                    list[0].push(vv);
                }
            }

            let ret: Array<message.GeneralInfo> = [];
            for (let i = 0; i < list.length; i++) {
                let v = list[i];
                for (let j = 0; j < v.length; j++) {
                    let vv = v[j];
                    if (vv != null) {
                        ret.push(vv);
                    }
                }
            }
            return ret;
        }


        /**
         * 属性加成
         * 
         * @param generalId 猎人ID
         * @param level 等级 1 - 3
         * 
         * @returns 元祖 [猎人属性数组， 猎人描述数组]
         */
        public static GetAttri(generalId: number, level: number): [Array<any>, Array<any>] {
            let general_id = generalId % CommonConfig.general_id_to_index_multiple;
            let tbl = PlayerHunterSystem.HunterBreakAttri(general_id);
            let result = Helper.CreateGeneralAttrTbl();
            // if (level < 0) level = 0;
            // if (level > 2) level = 2;
            let index = level - 1;
            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = tbl[TableEnum.EnumGelAttribName[i]];
                if (level <= 3) {
                    if (value != null && level != null && value[index] != null) {
                        result[i] = value[index];
                    }
                } else {
                    if (value != null && level != null && value[index] != null && value[index] != value[index - 1]) {
                        result[i] = value[index];
                    }
                }
            }
            let des = [];
            let attri = [];
            for (let i = 0; i < result.length; i++) {
                let v = result[i];
                if (v != 0) {
                    attri.push(v);
                    des.push(i);
                }
            }
            return [attri, des];
        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBItem(level: number) {
            return TableLevel.Item(level);
        }

        /**
         * 等级开启的功能
         * 
         * @description from db_level.lua
         */
        public static LevelDBFunOpen(level) {

        }
        // 判断功能是否开启
        public static checkFuncOpen(fun_item: TableFunctionOpen){
            if(fun_item) {
                let level = fun_item.id;
                //军师阵法特殊处理
                if (level == message.FunctionOpen.FUNCTION_OPEN_TYPE_ARTIFACT) {
                    return true;
                }
                if (level == message.FunctionOpen.FUNCTION_OPEN_TYPE_ADVISER_FORMATION) {
                    return true;
                }
                if (typeof (fun_item.condition) == "number" && fun_item.condition != 0 && Game.PlayerInfoSystem.BaseInfo != null && Game.PlayerInfoSystem.Level != null && Game.PlayerInfoSystem.Level >= fun_item.condition) {
                    return true;
                }
                if (typeof (fun_item.condition_instance) == "number" && fun_item.condition_instance != 0) {
                    return true;
                }
                return false;
            }
        }
        /**
         * 功能开启
         * 
         * @description from db_level.lua
         */
        public static LevelDBFunOpenTo(level: number, bool?: boolean) {
            let dbitem = TableFunctionOpen.Item(level);
            if (dbitem == null) {
                return false;
            }
            let bOpen = this.checkFuncOpen(dbitem);
            if (!bOpen) {
                if (bool)
                    toast_warning(dbitem.unopen_tip);
            }
            return bOpen;
        }

        /**
         * @description from db_level.lua
         */

        public static LevelDBOpenLeague(bTips: boolean) {
            let bOpen = Game.PlayerInfoSystem.LeagueId > 0;
            if (!bOpen && bTips) {
                toast_warning(TextsConfig.TextsConfig_Error.league_not_open);

            }
            return bOpen;

        }

        /**
         * 开启等级
         * 
         * @description from db_level.lua
         */
        public static LevelDBFunOpenLevel(funcType): TableFunctionOpen {

            return TableFunctionOpen.Item(funcType);
        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBFunOpenToPlayer(level, funcType, bShowTip) {

        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBOpenList() {

        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBFunOpenListInMaincity() {

        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBNextFastFormatOpenLevel() {

        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBGetOpen(fromId, itemId) {

        }

        /**
         * @description from db_level.lua
         */
        public static LevelDBFunOpenLeague(bTips: boolean) {
            let bOpen = Game.PlayerInfoSystem.BaseInfo.leagueId > 0;
            if (!bOpen && bTips) {
                toast_warning(TextsConfig.TextsConfig_Error.league_not_open);
            }
            return bOpen;
        }

        /**
         * 武将升级所需要的等级
         * 
         * @param currentStep 当前阶级
         * 
         * @returns 元祖 [等级描述字符创， 等级上限]
         */
        public static UpLevelNeedGrade(currentStep: number): [string, number] {
            let stepTbl = TableGeneralStep.Table();
            let stepInfo = TableGeneralStep.Item(currentStep);

            let step = "";
            let level = 1;
            for (let k in stepTbl) {
                if (stepTbl.hasOwnProperty(k)) {
                    let v = stepTbl[k];
                    if (v.max_level > stepInfo.max_level) {
                        step = Helper.GetLevelColorStr(v.name, v.general_quality);
                        level = v.max_level;
                        break;
                    }
                }
            }
            return [step, level];
        }

        /**
         * 获取最大等级 
         * @param generalId 武将ID
         */
        public static GetMaxLevel(generalId: number): number {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            let level = 0;
            for (let i = 0; i < hunterInfo.star - 1; i++) {
                level += baseGeneralInfo.up_star_add_skillLevel[i];
            }

            if (hunterInfo.break_level > 0) {
                for (let i = 1; i <= hunterInfo.break_level; i++) {
                    level += PlayerHunterSystem.HunterBreak(i).add_skillLevel;
                }
            }
            return level;
        }

        /**
         * 武将升星同星级武将材料
         * 
         * @param generalId 武将ID
         * @param type 排序类型值（品质，星级，等级) 默认按照等级排序
         * 
         * @returns Array 请过排序之后的武将ID数组
         */
        public static ChooseUpStarMeterial(generalId: number, type: number = TableEnum.Enum.HXHHunterEnum.Level) {
            let meterials = [];
            let defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            let allHunters = Game.PlayerHunterSystem.queryAllHunters();

            for (let k in allHunters) {
                if (allHunters.hasOwnProperty(k)) {
                    let v = allHunters[k];
                    if (v != null && v.level > 0 && v.is_ware == false) {
                        let findInDefence = Table.FindF(defenceGenerals, (_, _v) => {
                            return _v[0] == v.general_id;
                        })
                        let starGeneralInfo = Table.DeepCopy(v) as any;
                        starGeneralInfo.b_defence = (findInDefence != null) ? 1 : 0;
                        meterials.push(starGeneralInfo);
                    }
                }
            }

            meterials.sort(function (a, b) {
                let gnrA = PlayerHunterSystem.Table(a.general_id);
                let gnrB = PlayerHunterSystem.Table(b.general_id);
                let baseA = (a.general_id == generalId) ? 1 : 0;
                let baseB = (b.general_id == generalId) ? 1 : 0;
                if (type == TableEnum.Enum.HXHHunterEnum.Quality) {

                    if (a.star == b.star) {
                        if (a.b_defence == b.b_defence) {
                            if (baseA == baseB) {
                                if (a.awakePassive.level == b.awakePassive.level) {
                                    if (gnrA.aptitude == gnrB.aptitude) {
                                        if (a.level == b.level) { // descend
                                            return gnrB.general_id - gnrA.general_id;
                                        } else { // descend
                                            return b.level - a.level;
                                        }
                                    } else { // descend
                                        return gnrB.aptitude - gnrA.aptitude;
                                    }
                                } else { // descend
                                    return b.awakePassive.level - a.awakePassive.level;
                                }
                            } else { // descend
                                return baseB - baseA;
                            }
                        } else { // ascend
                            return a.b_defence - b.b_defence;
                        }
                    } else { // ascend
                        return b.star - a.star;
                    }

                } else if (type == TableEnum.Enum.HXHHunterEnum.Star) {

                    if (a.awakePassive.level == b.awakePassive.level) {
                        if (a.step == b.step) {
                            if (a.level == b.level) {
                                if (gnrA.aptitude == gnrB.aptitude) { // descend
                                    return gnrB.general_id - gnrA.general_id;
                                } else { // descend
                                    return gnrB.aptitude - gnrA.aptitude;
                                }
                            } else { // descend
                                return b.level - a.level;
                            }
                        } else { // descend
                            return b.step - a.step;
                        }
                    } else { // descend
                        return b.awakePassive.level - a.awakePassive.level;
                    }

                } else if (type == TableEnum.Enum.HXHHunterEnum.Level) {

                    if (a.star == b.star) {
                        if (a.b_defence == b.b_defence) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                if (a.level == b.level) {
                                    if (gnrA.aptitude == gnrB.aptitude) { // descend
                                        return gnrB.general_id - gnrA.general_id;
                                    } else { // descend
                                        return gnrB.aptitude - gnrA.aptitude;
                                    }
                                } else { // descend
                                    return b.level - a.level;
                                }
                            } else { // descend
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        } else { // ascend
                            return a.b_defence - b.b_defence;
                        }
                    } else { // descend
                        return b.star - a.star;
                    }

                }

            });

            let result: Array<number> = [];
            for (let i = 0; i < meterials.length; i++) {
                let v = meterials[i];
                result.push(v.general_id);
            }
            return result;
        }

        /**
         * 获得战斗武将15种属性
         * @param general 
         * @param info 武将信息
         * 
         * @returns [Array, Array] [属性信息数组(下标0-24)，天赋信息]
         */
        public static CalcBattleGelAttr(general: any, info: message.GeneralInfo) {

            let result = Helper.CreateGeneralAttrTbl();
            let roleInfo: message.GeneralInfo = null;
            if (info != null) {
                roleInfo = info;
            } else if (general != null) {
                roleInfo = general.roleInfo;
            }
            if (roleInfo == null) return [null, null];
            let generalId = roleInfo.general_id;

            let baseAttr = PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(roleInfo);//////
            baseAttr.shift();
            let [cardAttr, talentSet] = PlayerHunterSystem.HXHCalcCelCardAttr(baseAttr, roleInfo.potatoInfo);
            let awakeAttr = PlayerHunterSystem.HXHCalcAwakeAttrValue(baseAttr, generalId, roleInfo.awakePassive);
            let psyAttr = PlayerHunterSystem.HXHCalcCelPsychicAttr(baseAttr, generalId, roleInfo.psychicInfo);
            let breakAttr = PlayerHunterSystem.HXHCalcCelBreakUpAttr(baseAttr, generalId, roleInfo.break_level);
            let equipAttr = PlayerHunterSystem.HXHCalcCelEquipAttr(roleInfo, baseAttr, roleInfo.equipInfo);
            let transAttr = PlayerHunterSystem.HXHCalcCelTranAttr(roleInfo);
            // let skinAttr = PlayerHunterSystem.getSkinProperty(roleInfo);//皮肤属性加成
            psyAttr.push(0);
            for (let i = 0; i < TableEnum.EnumAttriReal.length; i++) {
                let j = TableEnum.EnumAttriReal[i] - 1;
                result[j + 1] = baseAttr[j] + cardAttr[j] + awakeAttr[j] + psyAttr[j] + breakAttr[j] + equipAttr[j] + transAttr[j];// + skinAttr[j];
            }

            return [result, talentSet];
        }

        public static HXHCalcCelTranAttr(generalInfo) {
            let ret = PlayerHunterSystem.createGeneralAttrTbl()
            let value = PlayerHunterSystem.getTranAttr(generalInfo)
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP - 1; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (value[i] != 0) {
                    ret[i] = ret[i] + value[i]
                }

            }
            return ret;
        }

        /**变身技面板属性 */
        public static getTranAttr(generalInfo) {
            let attrInfo = TableGeneralTransfer.Item(generalInfo.general_id % CommonConfig.general_id_to_index_multiple);
            let result = PlayerHunterSystem.createGeneralAttrTbl()
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP - 1; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                let value = attrInfo[TableEnum.EnumGelAttribName[i]]
                if (value[generalInfo.transfer_level - 1] != null && value[generalInfo.transfer_level - 1] != 0 && generalInfo.transfer_level != 0) {
                    result[i] = value[0];
                }
            }
            return result;
        }

        /**皮肤面板属性 */
        public static getSkinProperty(baseAttr, generalInfo) {
            let a = [];
            for (let k in TableItemFashion.Table()) {
                let v = TableItemFashion.Table()[k];
                a.push(v);
            }
            let attrInfo = Table.FindR(a, (k, v) => {
                return v.match_general == generalInfo.general_id % CommonConfig.general_id_to_index_multiple;
            })[0]
            let result = PlayerHunterSystem.createGeneralAttrTbl();
            if (attrInfo) {
                let isHas = PlayerHunterSystem.Table(generalInfo.general_id).fashion_id.indexOf(generalInfo.fashionId) >= 0;
                if (isHas && Game.PlayerItemSystem.itemCount(generalInfo.fashionId) > 0) {
                    for (let i = TableEnum.EnumGelAttrib.ATTR_HP - 1; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                        let value = attrInfo[TableEnum.EnumGelAttribName[i]]
                        if (value) {
                            result[i] = value;
                        }
                    }
                }
                // 添加属性值
                for (let i = 0; i < result.length; i++) {
                    if (result[i] != 0) {
                        // 判断属性是否为百分比加成或者直接加数值
                        if (Game.PlayerLeagueSystem.isSkillPercent(i + 1)) {// 皮肤的百分比加成属性和工会技能的一样
                            result[i] = baseAttr[i] * result[i] / 100;
                        }
                    }
                }
            }
            return result;
        }

        /**获取变身猎人列表 */
        public static getGeneralTransfer() {
            let data_list = [];
            for (const k in TableGeneralTransfer.Table()) {
                const v = TableGeneralTransfer.Table()[k];
                if (v.general_add != 0) {
                    data_list.push(v);
                }
            }
            return data_list;
        }

        public static createGeneralAttrTbl() {
            let result = []
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP - 1; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                result[i] = 0
            }
            return result;
        }

        /**
         * 猎人 获得武将附加額外屬性（勇於突破）
         * 
         * @param generalInfo 武将信息
         * 
         * @returns [Array, number] [属性信息， 战斗力值]
         */
        private static HXHCalcGelExternAttrToShow(generalInfo: message.GeneralInfo): [Array<number>, number] {
            let [result,] = PlayerHunterSystem.CalcBattleGelAttr(null, generalInfo);
            return [result, PlayerHunterSystem.CalcHXHHeroPower(result, generalInfo)]
        }

        /**
         * 突破等级
         * @param generalInfo 武将信息
         */
        public static GeneralBreakBattleValue(generalInfo: message.GeneralInfo): [number, number] {
            let tmp1 = Table.DeepCopy(generalInfo) as message.GeneralInfo;
            let tmp2 = Table.DeepCopy(generalInfo) as message.GeneralInfo;
            tmp1.break_level -= 1;
            let [, battleValue1] = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp1);
            let [, battleValue2] = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp2);
            let diff = battleValue2 - battleValue1;
            if (diff < 0) diff = -diff;
            return [generalInfo.battleValue - diff, generalInfo.battleValue];
        }

        public static generalBreakBattleValue2(generalInfo: message.GeneralInfo, breakSkillId: number) {
            let tmp1 = Table.DeepCopy(generalInfo) as message.GeneralInfo;
            let tmp2 = Table.DeepCopy(generalInfo) as message.GeneralInfo;

            let [skillKey, skill] = [null, null];
            for (let i = 0; i < tmp2.break_skill.length; i++) {
                let v = tmp2.break_skill[i];
                if (v.key == breakSkillId) {
                    skillKey = i;
                    skill = v.value;
                }
            }
            tmp2.break_skill[skillKey].value = skill - 1;

            let [, battleValue1] = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp1);
            let [, battleValue2] = PlayerHunterSystem.HXHCalcGelExternAttrToShow(tmp2);
            let diff = battleValue1 - battleValue2;
            return [generalInfo.battleValue - diff, generalInfo.battleValue];
        }

        /**
         * 获取满足突破技升级的猎人
         * 
         * @param id 表`table_break_skill_uplevel.json`内索引ID， 范围(100011 - 100743), 组成形式武将id*10 + 技能等级(1-3)
         * @param level  技能等级(1-3)
         * @param generalId 武将id
         * 
         * @return Array 经过排序的猎人列表
         */
        public static GetBreakUpSkillHunter(id, level, generalId): Array<message.GeneralInfo> {
            if (level > 0) {
                level -= 1;
            }

            let upLevelInfo = TableBreakSkillUplevel.Item(id);
            let generalIds = upLevelInfo.exchange_ids[level];
            let aptitudes = upLevelInfo.exchange_aptitude[level];
            let levels = upLevelInfo.exchange_level[level];
            let stars = upLevelInfo.exchange_star[level];
            let awakens = upLevelInfo.exchange_awaken[level];

            let generalList: Array<message.GeneralInfo> = [];
            let allHunters = Game.PlayerHunterSystem.allHuntersMap();
            for (let k in allHunters) {
                if (allHunters.hasOwnProperty(k)) {
                    let v = allHunters[k];
                    let aptitude = PlayerHunterSystem.Table(v.general_id).aptitude;
                    let condition1 = (v != null &&
                        v.general_id != generalId &&
                        generalIds[0] != 0 &&
                        v.general_id % CommonConfig.general_id_to_index_multiple == generalIds[0] && aptitude >= aptitudes[0] &&
                        v.level >= levels[0] &&
                        v.star >= stars[0] &&
                        v.awakePassive.level >= awakens[0]);
                    let condition2 = (v != null &&
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

            let defenceList = PlayerHunterSystem.GeneralsIdInDefence();
            let list1: Array<message.GeneralInfo> = [];
            let list2: Array<message.GeneralInfo> = [];
            for (let i = 0; i < generalList.length; i++) {
                let v = generalList[i];
                let find = Table.FindF(defenceList, (_, _v) => {
                    return _v[0] == v.general_id;
                });
                if (find) {
                    list2.push(v);
                } else {
                    list1.push(v);
                }
            }
            // 先按品阶由高到低排，然后星级，再后战力，再后等级，最后ID
            list1.sort((a: message.GeneralInfo, b: message.GeneralInfo) => {
                let generalA = PlayerHunterSystem.Table(a.general_id);
                let generalB = PlayerHunterSystem.Table(b.general_id);
                if (generalA.is_open != generalB.is_open) {
                    if (generalA.is_open == 0) return 1;
                    if (generalB.is_open == 0) return -1;
                }

                if (a.step == b.step) {
                    if (a.star == b.star) {
                        if (generalA.aptitude == generalB.aptitude) {
                            if (a.level == b.level) {
                                if (a.battleValue == b.battleValue) { // ascend
                                    return PlayerHunterSystem.GetGeneralId(a.general_id) - PlayerHunterSystem.GetGeneralId(b.general_id);
                                } else {
                                    return b.battleValue - a.battleValue;
                                }
                            } else {
                                return b.level - a.level;
                            }
                        } else {
                            return generalB.aptitude - generalA.aptitude;
                        }
                    } else {
                        return b.star - a.star;
                    }
                } else {
                    return b.step - a.step;
                }
            });

            let list = [];
            list.push(list1, list2);
            let ret: Array<message.GeneralInfo> = [];
            for (let i = 0; i < list.length; i++) {
                let v = list[i];
                for (let k in v) {
                    if (v.hasOwnProperty(k)) {
                        let vv = v[k];
                        ret.push(vv);
                    }
                }
            }
            return ret;
        }

        /**
         * 先按品阶由高到低排，然后星级，再后战力，再后等级，最后ID
         */
        public static SortGeneral(a: message.GeneralInfo, b: message.GeneralInfo) {
            let generalA = PlayerHunterSystem.Table(a.general_id);
            let generalB = PlayerHunterSystem.Table(b.general_id);
            if (generalA.is_open != generalB.is_open) {
                if (generalA.is_open == 0) return 1;
                if (generalB.is_open == 0) return -1;
            }

            if (a.step == b.step) {
                if (a.star == b.star) {
                    if (generalA.aptitude == generalB.aptitude) {
                        if (a.level == b.level) {
                            if (a.battleValue == b.battleValue) { // ascend
                                return PlayerHunterSystem.GetGeneralId(a.general_id) - PlayerHunterSystem.GetGeneralId(b.general_id);
                            } else {
                                return b.battleValue - a.battleValue;
                            }
                        } else {
                            return b.level - a.level;
                        }
                    } else {
                        return generalB.aptitude - generalA.aptitude;
                    }
                } else {
                    return b.star - a.star;
                }
            } else {
                return b.step - a.step;
            }
        }


        /**
         * 武将合成材料排序(武将，等级，星级，觉醒等级)
         * 
         * @param exceptIds 
         * @param conditions 合成条件数组 [id, level, star, awakePassiveLevel, aptitude]
         * @param exceptDefence 
         * @param defenceGenerals 防守阵容的猎人数组
         */
        public static GetComposeHunter(exceptIds = [], conditions: Array<number>, exceptDefence: boolean, defenceGenerals?): Array<message.GeneralInfo> {
            if (conditions.length == 0) return [];

            if (defenceGenerals == null) {
                defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            }

            let hunters = [];
            let allHunterMap = Game.PlayerHunterSystem.allHuntersMap();
            for (let k in allHunterMap) {
                if (allHunterMap.hasOwnProperty(k)) {
                    let v = allHunterMap[k];
                    if (v == null || v == undefined) {
                        continue;
                    }
                    let baseGeneralInfo = TableBaseGeneral.Item(Number(k) % CommonConfig.general_id_to_index_multiple);
                    // 基本条件判断
                    if (v.level > 0 && baseGeneralInfo.is_open == 1 && !v.is_ware) {
                        // 合成条件判断
                        if ((conditions[0] == 0 || PlayerHunterSystem.GetGeneralId(conditions[0]) == PlayerHunterSystem.GetGeneralId(v.general_id)) &&
                            conditions[1] <= v.level &&
                            conditions[2] <= v.star &&
                            conditions[3] <= v.awakePassive.level &&
                            (conditions[4] == 0 || baseGeneralInfo.aptitude == conditions[4])) {
                            // 搜索去除ID
                            let findExcept = Table.FindK(exceptIds, v.general_id);
                            if (findExcept == -1) {
                                let insertGeneralInfo = Table.DeepCopy(v) as any;
                                let findInDefence = Table.FindF(defenceGenerals, (_, _v) => {
                                    return _v[0] == v.general_id;
                                });
                                if (exceptDefence) {
                                    if (findInDefence == false) {
                                        insertGeneralInfo.b_defence = 0;
                                        hunters.push(insertGeneralInfo);
                                    }
                                } else {
                                    insertGeneralInfo.b_defence = findInDefence ? 1 : 0;
                                    hunters.push(insertGeneralInfo);
                                }
                            }
                        }
                    }
                }
            }

            hunters.sort((a, b) => {
                if (a.b_defence == b.b_defence) {
                    if (a.battleValue == b.battleValue) { // ascend
                        return a.general_id - b.general_id;
                    } else { // ascend
                        return a.battleValue - b.battleValue;
                    }
                } else { // ascend
                    return a.b_defence - b.b_defence;
                }
            });

            let result = [];
            for (let k in hunters) {
                if (hunters.hasOwnProperty(k)) {
                    let v = hunters[k];
                    result.push(v.general_id);
                }
            }

            return hunters;
        }

        /**
         * 获取武将头像边框图片
         * 
         * @param generalId 武将ID
         * 
         * @description db_compound.lua
         */
        public static GetGeneralFrame(generalId: number): string {
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo == null) {
                return "";
            }
            let aptitude = baseGeneralInfo.aptitude;
            let path = "";
            if (aptitude == 11) {
                path = UIConfig.UIConfig_Role.heroFrame[1]
            } else if (aptitude == 12) {
                path = UIConfig.UIConfig_Role.heroFrame[3]
            } else if (aptitude == 13) {
                path = UIConfig.UIConfig_Role.heroFrame[6]
            } else if (aptitude == 14) {
                path = UIConfig.UIConfig_Role.heroFrame[9]
            } else if (aptitude == 15) {
                path = UIConfig.UIConfig_Role.heroFrame[13]
            }
            return path;
        }

        /**
         * 合成索引
         * 
         * @param index 索引
         * @param defenceList 防守阵容猎人
         *
         * @description db_compound.lua
         */
        public static IndexTips(index: number, defenceList?): boolean {
            let compoundInfo = TableGeneralMake.Item(index);
            if (compoundInfo == null) return false;

            let composeInfo: Array<Array<number>> = [];
            for (let i = 0; i < compoundInfo.exchange_ids.length; i++) {
                let id = compoundInfo.exchange_ids[i];
                let level = compoundInfo.exchange_level[i];
                let star = compoundInfo.exchange_star[i];
                let awaken = compoundInfo.exchange_awaken[i];
                let aptitude = compoundInfo.exchange_aptitude[i];
                let info = [];
                info.push(id);
                info.push(level);
                info.push(star);
                info.push(awaken);
                info.push(aptitude);
                composeInfo.push(info);
            }
            composeInfo.sort((a: Array<number>, b: Array<number>) => {
                if (a[0] == b[0]) {
                    if (a[1] == b[1]) {
                        if (a[2] == b[2]) {
                            return a[3] - b[3];
                        } else {
                            return a[2] - b[2];
                        }
                    } else {
                        return a[1] - b[1];
                    }
                } else {
                    return a[0] - b[0];
                }
            });

            let storageTbl = [];
            for (let i = 0; i < composeInfo.length; i++) {
                let v = composeInfo[i];
                let composeTbl = PlayerHunterSystem.GetComposeHunter(storageTbl, v, true, defenceList);
                if (composeTbl[0] == null) {
                    return false;
                } else {
                    storageTbl.push(composeTbl[0]);
                }
            }
            return true;
        }

        /**
         * 是否有武将合成材料(武将，等级，星级，觉醒等级)
          * @param exceptIds
         * @param conditions 合成条件数组 [id, level, star, awakePassiveLevel, aptitude]
         * @param exceptDefence
         * @param defenceGenerals 防守阵容的猎人数组
         * 
         * @description db_compound.lua
         */
        public static haveCompose(exceptIds = [], conditions: Array<number>, exceptDefence: boolean, defenceGenerals?: Array<any>): boolean {
            if (defenceGenerals == null) {
                defenceGenerals = PlayerHunterSystem.GeneralsIdInDefence();
            }
            let allHunterMap = Game.PlayerHunterSystem.allHuntersMap();
            for (let k in allHunterMap) {
                if (allHunterMap.hasOwnProperty(k)) {
                    let v = allHunterMap[Number(k)];
                    if (v == null || v == undefined) {
                        continue;
                    }
                    let baseGeneralInfo = PlayerHunterSystem.Table(k);
                    // 基本条件判断
                    if (v.level > 0 && baseGeneralInfo.is_open == 1 && v.is_ware == false) {
                        // 合成条件判断
                        if ((conditions[0] == 0 || PlayerHunterSystem.GetGeneralId(conditions[0]) == PlayerHunterSystem.GetGeneralId(v.general_id)) &&
                            conditions[1] <= v.level &&
                            conditions[2] <= v.star &&
                            conditions[3] <= v.awakePassive.level &&
                            (conditions[4] == 0 || baseGeneralInfo.aptitude == conditions[4])) {
                            // 搜索去除ID
                            let findExcept = Table.FindK(exceptIds, v.general_id);
                            if (findExcept == -1) {
                                let findInDefence = Table.FindF(defenceGenerals, (_, _v) => {
                                    return _v[0] == v.general_id;
                                });
                                if (exceptDefence) {
                                    if (findInDefence == false) {
                                        return true;
                                    }
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        public static MapFightID(generalInfo: message.GeneralInfo): number {
            let generalId = generalInfo.general_id
            // uid -> id
            generalId = PlayerHunterSystem.GetGeneralId(generalId)

            if (!generalId) {
                return 0;
            }
            // let table_base = TableBaseGeneral.Table();
            // let table_mapRole = TableMapRole.Table();
            let mapRoleID = TableBaseGeneral.Item(generalId).general_roleId;
            let fashionInfo = TableItemFashion.Item(generalInfo.fashionId);
            let bFashionWear = generalInfo.fashionId != 0
            return (bFashionWear && fashionInfo != null) ? fashionInfo.fashion_roleId : mapRoleID
        }

        public static GetCurStepSkillPoint(step: number): number {
            let number = 0;
            let stepTable = TableGeneralStep.Table();
            for (let k in stepTable) {
                if (stepTable.hasOwnProperty(k)) {
                    let v = stepTable[k];
                    if (step >= v.general_step) {
                        number += v.add_skill;
                    }
                }
            }
            return number;
        }

        public static GetMaxStepSkillPoint(): number {
            let number = 0;
            let stepTable = TableGeneralStep.Table();
            for (let k in stepTable) {
                if (stepTable.hasOwnProperty(k)) {
                    let v = stepTable[k];
                    number += v.add_skill;
                }
            }
            return number;
        }

        public static GetHunterCardMap(generalId: number): { [key: number]: message.PotatoInfo } {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            if (hunterInfo == null) return null;
            let cardMap = {};
            if (hunterInfo == null) return cardMap;

            for (let i = 0; i < hunterInfo.potatoInfo.length; i++) {
                let v = hunterInfo.potatoInfo[i];
                cardMap[v.pos] = v;
            }
            return cardMap;
        }

        /** 
         * 装备可升品
         *
         * @param generalId The hunter's ID.
         * @param equipId The equip's ID.
         */
        public static equipCanUpStep(generalId: number, equipId: number): boolean {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let equipInfo = hunterInfo.equipInfo;
            let step = 0;
            let index = -1;
            for (let i = 0; i < equipInfo.length; i++) {
                let v = equipInfo[i];
                if (v.equipId == equipId) {
                    step = v.step;
                    // index = i;
                }
            }

            let baseEquipInfo = TableGeneralEquip.Item(equipId);
            let [goods1, goods2, count1] = [null, null, null];
            if (step != CommonConfig.general_equip_max_step) {
                let steps = baseEquipInfo.upstep_goods[step];
                goods1 = steps[0];
                goods2 = steps[1];
                count1 = baseEquipInfo.upstep_count[step][0];
            } else {
                let steps = baseEquipInfo.upstep_goods[step - 1];
                goods1 = steps[0];
                goods2 = steps[1];
                count1 = baseEquipInfo.upstep_count[step - 1][0];
            }

            let goods1Count = PlayerItemSystem.Count(goods1);
            let goods2Count = 0;
            let count2 = 0;
            if (goods2 != null) {
                goods2Count = PlayerItemSystem.Count(goods2)
                if (step == CommonConfig.general_equip_max_step) {
                    count2 = baseEquipInfo.upstep_count[step - 1][0];
                } else {
                    count2 = baseEquipInfo.upstep_count[step][1];
                }
            }
            let money = 0;
            if (step == CommonConfig.general_equip_max_step) {
                money = baseEquipInfo.upstep_money[step - 1];
            } else {
                money = baseEquipInfo.upstep_money[step];
            }

            let currentMoney = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);

            let flag = true;
            index = Table.FindK(equipInfo, equipId)
            if (index == 0) {
                if (hunterInfo.level >= CommonConfig.general_equip_one_openlevel) {
                    flag = true;
                } else {
                    flag = false;
                }
            } else if (index == 1) {
                if (hunterInfo.level >= CommonConfig.general_equip_two_openlevel) {
                    flag = true;
                } else {
                    flag = false;
                }
            }

            if (step < CommonConfig.general_equip_max_step &&
                count1 <= goods1Count &&
                count2 <= goods2Count &&
                currentMoney >= money &&
                flag) {
                return true;
            }
            return false;
        }

        /**
         * 装备可强化
         * 
         * @param generalId The hunter's ID.
         * @param equipId The equip's ID.
         */
        public static equipCanStrengthen(generalId: number, equipId: number): boolean {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let equipInfo = hunterInfo.equipInfo;
            let level = 0;
            let index = -1;
            for (let i = 0; i < equipInfo.length; i++) {
                let v = equipInfo[i];
                if (v.equipId == equipId) {
                    level = v.level;
                }
            }

            let baseEquipInfo = TableGeneralEquip.Item(equipId);
            let goods1 = 0, goods2 = 0, count1 = 0;
            if (level == CommonConfig.general_equip_max_level) {
                goods1 = baseEquipInfo.uplevel_goods[level - 1][0];
                goods2 = baseEquipInfo.uplevel_goods[level - 1][1];
                count1 = baseEquipInfo.uplevel_count[level - 1][0];
            } else {
                goods1 = baseEquipInfo.uplevel_goods[level][0];
                goods2 = baseEquipInfo.uplevel_goods[level][1];
                count1 = baseEquipInfo.uplevel_count[level][0];
            }

            let goodsCount1 = PlayerItemSystem.Count(goods1);

            let count2 = 0, goodsCount2 = 0;
            if (goods2 != null) {
                goodsCount2 = PlayerItemSystem.Count(goods2);
                if (level == CommonConfig.general_equip_max_level) {
                    count2 = baseEquipInfo.uplevel_count[level - 1][1];
                } else {
                    count2 = baseEquipInfo.uplevel_count[level][1];
                }
            }


            let money = 0;
            if (level == CommonConfig.general_equip_max_level) {
                money = baseEquipInfo.uplevel_money[level - 1];
            } else {
                money = baseEquipInfo.uplevel_money[level];
            }
            let currentMoney = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            let flag = true;
            index = Table.FindK(equipInfo, equipId);
            if (index == 0) {
                if (hunterInfo.level >= CommonConfig.general_equip_one_openlevel) {
                    flag = true;
                } else {
                    flag = false;
                }
            } else if (index == 1) {
                if (hunterInfo.level >= CommonConfig.general_equip_two_openlevel) {
                    flag = true;
                } else {
                    flag = false;
                }
            }

            if (level < CommonConfig.general_equip_max_level &&
                count1 <= goodsCount1 &&
                count2 <= goodsCount2 &&
                currentMoney >= money &&
                flag == true) {
                return true;
            }
            return false;
        }

        /**
         * 装备可激活
         * 
         * @param generalId The hunter's ID.
         * @param equipIds The equip ids, from `table_base_general.json` -> `equip_info`.
         * @param equipId The equip's ID.
         */
        public static equipCanActive(generalId: number, equipIds: Array<number>, equipId: number): boolean {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let have = Table.FindF(hunterInfo.equipInfo, (_, _v: message.EquipInfo) => {
                return _v.equipId == equipId;
            });

            let condition = false;
            if (equipId == equipIds[0]) {
                condition = hunterInfo.level >= CommonConfig.general_equip_one_openlevel;
            } else if (equipId == equipIds[1]) {
                condition = hunterInfo.level >= CommonConfig.general_equip_two_openlevel;
            }

            let baseEquipInfo = TableGeneralEquip.Item(equipId);
            let money = baseEquipInfo.compose_money;
            let currentMoney = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);

            return (condition && !have && money <= currentMoney);
        }

        /**
         * 装备可合成
         * 
         * @param generalId The hunter's ID.
         * @param equipIds The equip ids, from `table_base_general.json` -> `equip_info`.
         */
        public static equipCanCompound(generalId: number, equipIds: Array<number>): boolean {
            if (equipIds.length == 3 && equipIds[2] != 0) {
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
                let have = Table.FindF(hunterInfo.equipInfo, (_, _v: message.EquipInfo) => {
                    return _v.equipId == equipIds[2];
                });

                let baseEquipInfo = TableGeneralEquip.Item(equipIds[2]);
                let goods = Number(baseEquipInfo.compose_goods);
                let count = Number(baseEquipInfo.compose_count);
                let count1 = PlayerItemSystem.Count(goods);
                let baseGeneralInfo = PlayerHunterSystem.Table(generalId);

                return (!have &&
                    baseGeneralInfo.aptitude != 11 &&
                    hunterInfo.equipInfo[2] == null && // &&hunterInfo.equipInfo.length >= 3
                    count1 >= count);
            }
            return false;
        }


        public static equipGetStarNumber(step: number) {
            return Math.floor((step - 1) / 5 + 1);
        }

        public static equipGetLevelAttribute(attriId: number, level: number) {
            let info = TableGeneralEquipAttri.Item(attriId);
            let attri = Table.Add(0, level, (id) => {
                return info.attri_add[id];
            });
            return attri;
        }

        public static equipGetStepAttribute(attriId: number, step: number) {
            let info = TableGeneralEquipAttri.Item(attriId);
            let attri = Table.Add(0, step, (id) => {
                return info.attri_add[id];
            });
            return attri;
        }

        /** 获取猎人念力数据 */
        public static GetGeneralPsychicData(generalId: number, generalinfo?: message.GeneralInfo): { [key: string]: message.PsychicInfo | number } {
            let genTbl = PlayerHunterSystem.Table(generalId);
            let genInfo = generalinfo;
            if (genInfo == null) {
                genInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            }

            let data = [];
            if (genInfo.star >= 6 && genInfo.psychicInfo.length != 0) {
                data = genInfo.psychicInfo;
            } else {
                data = genTbl.psychic_unlock_six;
            }
            let ret = {};
            for (const kk in data) {
                const vv = data[kk];
                ret[kk] = vv;
            }
            return ret;
        }

        private static GetGeneralPsychicByPos(generalId: number, pos: number): message.PsychicInfo {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            for (let i = 0; i < hunterInfo.psychicInfo.length; i++) {
                let v = hunterInfo.psychicInfo[i];
                if (v.pos == pos) {
                    return v;
                }
            }
            return null;
        }

        public static GeneralPsychicHaveNext(generalId: number): boolean {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            // for (let i = 0; i < hunterInfo.psychicInfo.length; i++) {
            //     let v = hunterInfo.psychicInfo[i];
            //     if (v.psychicId_back != 0) {
            //         return true;
            //     }
            // }
            return true;  //???
        }

        public static getGeneralPsychicCurGroup(general_Id: number, generalInfo?: message.GeneralInfo) {
            let genInfo = null as message.GeneralInfo;
            let generalId = general_Id;
            if (generalInfo != null) {
                genInfo = generalInfo;
            } else {
                genInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            }
            if (generalId == null) {
                generalId = genInfo.general_id;
            }
            let _psychics = []
            let genTbl = PlayerHunterSystem.Table(generalId);
            for (const kk in genTbl.psychic_unlock_six) {
                const vv = genTbl.psychic_unlock_six[kk];
                _psychics[kk] = vv
            }

            let psyGroupMap = [];
            if (genInfo.psychicInfo.length != 0) {
                StringConfig_Table.general_psychic
                psyGroupMap[1] = Table.DeepCopy(TableGeneralPsychic.Item(Math.floor(_psychics[0] / 10000)));
                psyGroupMap[2] = Table.DeepCopy(TableGeneralPsychic.Item(Math.floor(_psychics[4] / 10000)));

                psyGroupMap[1]["psychic"] = Table.DeepCopy(genInfo.psychicInfo[0]);
                for (let i = 2; i <= 4; i++) {
                    if (psyGroupMap[1]["psychic"].level > genInfo.psychicInfo[i].level) {
                        psyGroupMap[1]["psychic"] = Table.DeepCopy(genInfo.psychicInfo[i]);
                    }
                }

                psyGroupMap[2]["psychic"] = Table.DeepCopy(genInfo.psychicInfo[4]);
                if (genInfo.psychicInfo[4].level > genInfo.psychicInfo[5].level) {
                    psyGroupMap[2]["psychic"] = Table.DeepCopy(genInfo.psychicInfo[5]);
                }
            } else {
                psyGroupMap[1] = 0;
                psyGroupMap[2] = 0;
            }
            return psyGroupMap;
        }

        public static getCanRefinePsychicHunter(generalId, selecteInfo, level) {
            let _ret = [];
            let _generalId = generalId;
            let _selecteInfo = selecteInfo;
            let _curLevel = level;
            let _consumeId = _selecteInfo.consume_general[_curLevel - 1];
            let _level = _selecteInfo.general_level[_curLevel - 1];
            let _star = _selecteInfo.general_star[_curLevel - 1];
            let _awaken = _selecteInfo.general_awaken[_curLevel - 1];
            let _bAny = yuan3(_consumeId == 0, true, false);

            let _grn_list = [];
            let _defance_list = [[], []];

            let hunters = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in hunters) {
                if (hunters.hasOwnProperty(k)) {
                    let v = hunters[k];
                    if (v.general_id != _generalId && v.level >= _level && v.star >= _star && v.awakePassive.level >= _awaken && (v.general_id % CommonConfig.general_id_to_index_multiple == _consumeId || _bAny)) {
                        _grn_list.push(v)
                    }
                }
            }
            let defencelist = this.GeneralsIdInDefence();
            for (let k in _grn_list) {
                if (_grn_list.hasOwnProperty(k)) {
                    let v = _grn_list[k];
                    let def = Table.FindR(defencelist, (k, _v) => {
                        return _v[0] == v.general_id;
                    })
                    for (let i = 0; i < def.length; i++) {
                        if (def[i] != null) {
                            v.defenceInfo = def;
                        } else {
                            v.defenceInfo = null;
                        }
                    }
                    if (def != null) {
                        _defance_list[1].push(v);
                    } else {
                        _defance_list[0].push(v);
                    }
                }
            }
            for (let k in _defance_list) {
                if (_defance_list.hasOwnProperty(k)) {
                    let v = _defance_list[k];
                    for (let kk in v) {
                        if (v.hasOwnProperty(kk)) {
                            let vv = v[kk];
                            _ret.push(vv);
                        }
                    }
                }
            }
            return _ret;
        }

        public static GetGeneralPsychicNextGroup(generalId: number, lockPos: Array<number>, generalInfo: message.GeneralInfo): [Array<number>, { [key: number]: Array<message.PsychicInfo> }] {
            let ret = [];
            let genInfo = null as message.GeneralInfo;;
            if (generalInfo != null) {
                genInfo = generalInfo;
            } else {
                genInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            }
            let psyInfo = genInfo.psychicInfo;

            let psyGroupMap: { [key: number]: Array<message.PsychicInfo> } = {};
            let psyGroupLockMap: { [key: number]: Array<message.PsychicInfo> } = {};
            let isRefresh = false;

            let next = function (map: { [key: number]: any }) {
                let length = 0;
                for (let k in map) {
                    if (map.hasOwnProperty(k)) {
                        length += 1;
                    }
                }
                return length > 0;
            }

            // 无锁定，已刷新
            if (isRefresh && next(psyGroupLockMap) == false) {
                for (let k in psyGroupMap) {
                    if (psyGroupMap.hasOwnProperty(k)) {
                        let v = psyGroupMap[k];
                        let num = TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                        }
                    }
                }
            }

            // 有锁定，已经刷新
            if (isRefresh && next(psyGroupLockMap) == true) {

                for (let k in psyGroupLockMap) {
                    if (psyGroupLockMap.hasOwnProperty(k)) {
                        let v = psyGroupLockMap[k];
                        let num = TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                            psyGroupLockMap[k] = [];
                            psyGroupMap[k] = [];
                        }
                    }
                }

                for (let k in psyGroupLockMap) {
                    if (psyGroupLockMap.hasOwnProperty(k)) {
                        let v = psyGroupLockMap[k];
                        let num = TableGeneralPsychic.Item(k).group_num;
                        let vv = psyGroupMap[k];
                        if (vv != null && (v.length + vv.length) >= num) {
                            ret.push(Number(k));
                            psyGroupMap[k] = [];
                        }
                    }
                }

                for (let k in psyGroupMap) {
                    if (psyGroupMap.hasOwnProperty(k)) {
                        let v = psyGroupMap[k];
                        let num = TableGeneralPsychic.Item(k).group_num;
                        if (v.length >= num) {
                            ret.push(Number(k));
                        }
                    }
                }
            }

            for (let i = 0; i < 3; i++) {
                if (ret[i] == null) {
                    ret[i] = 0;
                }
            }

            return [ret, psyGroupMap];
        }

        public static GetNextPsychicAttriChange(generalId: number) {
            let ret = {
                [1]: 0,
                [2]: 0,
                [4]: 0,
                [5]: 0,
                [8]: 0,
                [9]: 0
            }

            let retLast = {
                [1]: 0,
                [2]: 0,
                [4]: 0,
                [5]: 0,
                [8]: 0,
                [9]: 0
            }

            let calcAttri = function (type: number, value: number) {
                if (ret[type] == null) {
                    ret[type] = 0;
                }
                ret[type] += value;
            };

            let calcAttriLast = function (type: number, value: number) {
                if (retLast[type] == null) {
                    ret[type] = 0;
                }
                retLast[type] += value;
            }

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
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
        }

        public static GetPsychicGroupIllustrateData() {
            let ret: { [key: number]: Array<TableGeneralPsychic> } = {};
            let psychicTable = TableGeneralPsychic.Table();
            for (let k in psychicTable) {
                if (psychicTable.hasOwnProperty(k)) {
                    let v = psychicTable[k];
                    if (ret[v.group_num] == null) {
                        ret[v.group_num] = [];
                    }
                    ret[v.group_num].push(v);
                }
            }
            return ret;
        }

        public static GetPsychicGroupAttriType(id: number): [Array<number>, string] {
            let itemInfo = TableGeneralPsychic.Item(id);
            let retMap = {};
            for (let i = 0; i < itemInfo.rand_attri.length; i++) {
                let v = itemInfo.rand_attri[i];
                let attriInfo = TableGeneralPsychicAttri.Item(v);
                retMap[attriInfo.attri_type] = true;
            }
            let str = "";
            let ret: number[] = [];
            for (let k in retMap) {
                if (retMap.hasOwnProperty(k)) {
                    ret.push(Number(k));
                    str += " " + TextsConfig.TextsConfig_Hunter_psychic.attri_type[k];
                }
            }
            return [ret, str];
        }


        public static SpineID(info: message.GeneralInfo): [number, number, string] {

            let _get_spine = (generalId: number, fashionId: number): [number, number, string] => {
                let bFashionWear = (fashionId != null) && (fashionId != 0) && (fashionId != 1);
                let bFashionHave = true;
                // --此处暂不检查, 这个fashionId是否对应英雄的
                let bFashionSame = true
                let bFashion = bFashionWear && bFashionHave && bFashionSame;

                let fashionRoleId = 0;
                if (bFashion) fashionRoleId = TableItemFashion.Item(fashionId).fashion_roleId;

                let baseHunterInfo = PlayerHunterSystem.Table(generalId);
                let info_map = TableMapRole.Item(baseHunterInfo.general_roleId);

                let spine = (bFashion) ? TableMapRole.Item(fashionRoleId).body_spx_id : info_map.body_spx_id;
                let scale = (bFashion) ? TableMapRole.Item(fashionRoleId).spine_scale : info_map.spine_scale;
                let path = info_map.name_path;
                return [spine, scale, path];
            };
            return _get_spine(info.general_id, info.fashionId);
        }

        public static Activity_Hero() {
            // let SP_MIN = 1;
            // let SP_MAX = Table.tableLength(TableSpgeneralReward.Table());

            // let ret = [];
            // for (let i = SP_MIN - 1; i <= SP_MAX - 1; ++i) {
            //     ret[i] = TableSpgeneralReward.Item(i + 1);
            // }

            // return ret;

            let ret = [];
            for (var key in TableSpgeneralInformation.Table()) {
                if (TableSpgeneralInformation.Table().hasOwnProperty(key)) {
                    var element = TableSpgeneralInformation.Table()[key];
                    ret.push(element);
                }
            }

            return ret;
        }

        ///////////////////////////////////////////////////////////////////////////
        // 私有变量
        private mapHunters: { [id: number]: message.GeneralInfo } = {}; // 猎人（武将）列表
        private generals: Array<message.GeneralInfo> = []; // 猎人数组
        public static transformSel: number = 1;
        /**任意猎人突破选中的猎人材料 */
        public static breakSelectedGenerals: Array<number> = [];   //突破选中的猎人材料
        /**同名猎人突破选中的猎人材料 */
        public static breakSelectedGenerals1: Array<number> = [];   //突破选中的猎人材料
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_GENERALS_CHANGE, this.onGeneralsChange, this);

            Tips.InitTipHero();
        }

        public uninit() {
            this.mapHunters = {};
            this.generals = [];
        }

        public onGeneralsChange(ev: egret.Event) {
            let generals = <Array<message.GeneralInfo>>ev.data;
            for (let index = 0; index < generals.length; index++) {
                let curGeneralInfo = generals[index];
                let curGeneralID = curGeneralInfo.general_id;
                let bFind = false;

                for (let i = 0; i < this.generals.length; i++) {
                    let v = this.generals[i];
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
                if (curGeneralID > CommonConfig.general_id_to_index_multiple) {
                    let index = PlayerHunterSystem.GetGeneralId(curGeneralID);
                    //console.log("---- delete general id, index = ", index, "current general ID = ", curGeneralID);
                    delete this.mapHunters[index];
                }

                // 
                Tips.SetTipsOfHero(curGeneralID);
                Game.EventManager.event(HUNTER_REFRESH_TIP);
            }
            Game.PlayerCardSystem.setCardToHunterInfo();
        }

        // 查询玩家猎人信息
        public queryHunter(id: number): message.GeneralInfo {
            let hunter = this.mapHunters[id];
            if (hunter == null || hunter == undefined) return null;
            return hunter;
        }

        /**
         * 获取所有猎人列表
         */
        public queryAllHunters(): Array<message.GeneralInfo> {
            return this.generals;
        }

        /**
         * 删除猎人
         * @param generalId 猎人ID
         */
        public deleteHunterById(generalId: number) {

            if (generalId == undefined || generalId == null || generalId <= 0) return;

            let [_, index] = Table.FindR(this.generals, (_, _v) => {
                return _v.general_id == generalId;
            });
            if (index >= 0) {
                this.generals.splice(index, 1);
            }

            delete this.mapHunters[generalId];
        }

        public allHuntersMap() {
            return this.mapHunters;
        }


        public Table(generalId: number, transfer?: number) {
            // generalId = PlayerHunterSystem.GetGeneralId(generalId);
            // if (ckid(generalId)) {
            //     return null;
            // }
            // return TableBaseGeneral.Item(generalId);
            return PlayerHunterSystem.Table(generalId, transfer);
        }

        public HasIncreaseStar() {
            for (let [k, v] of HelpUtil.GetKV(this.mapHunters)) {
                if (v.level != 0 && v.star > this.Table(k).init_star) {
                    return false;
                }
            }
            return true;
        }

        public getSortGeneralByPower(): Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }> {
            let sort_data: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }> = [];
            for (let [k, v] of HelpUtil.GetKV(Game.PlayerHunterSystem.mapHunters)) {
                if (v.level > 0) {
                    let general = {
                        level: v.level,
                        star: v.star,
                        step: v.step,
                        battle: v.battleValue,
                        id: v.general_id,
                        hp: 1,
                        rage: 0,
                        maxHp: v.attri.general_hp,
                        isNew: true
                    } as { level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean };
                    sort_data.push(general);
                }
            }

            sort_data.sort((a, b) => {
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
        }

        public sceneHaloAndPetAttri(baseAttr: message.AttriInfo, petInfo: message.PetInfo[], haloId: number): Array<number> {
            let preAttr: message.AttriInfo = Table.DeepCopy(baseAttr);
            let attriResult: Array<number> = Helper.AttriConvertTbl(preAttr); // 从1开始 

            let haloAttriResult: Array<number> = Helper.CreateGeneralAttrTbl();
            let petStarAttriResult: Array<number> = Helper.CreateGeneralAttrTbl();
            let petStepAttriResult: Array<number> = Helper.CreateGeneralAttrTbl();
            let allAttrResult: Array<number> = Helper.CreateGeneralAttrTbl();// 从1开始

            // 光环属性
            if (haloId != null && haloId != 0 && PlayerVIPSystem.HaloItem(haloId) != null) {
                let haloTbl = PlayerVIPSystem.HaloItem(haloId);
                for (let [mk, mv] of HelpUtil.GetKV(haloTbl.add_type)) {
                    let addType = mv;
                    haloAttriResult[addType - 1] = attriResult[addType] * (haloTbl.add_crit[mk] / 100);
                }
            }

            for (let [k, v] of HelpUtil.GetKV(petInfo)) {
                let petTbl = PlayerAdviserSystem.PetBase(v.pet_id);
                if (petTbl != null) {
                    // 宠物升星增加属性
                    for (let i = 1; i <= TableEnum.EnumGelAttribName.length; i++) {
                        let typeName = TableEnum.EnumGelAttribName[i - 1];
                        if (petTbl[typeName] != null) {
                            for (let j = 1; j <= v.star; j++) {
                                if (i == TableEnum.EnumGelAttrib.ATTR_HP || i == TableEnum.EnumGelAttrib.ATTR_PHY_ATK || i == TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                                    petStarAttriResult[i - 1] = petStarAttriResult[i - 1] + attriResult[i] * petTbl[typeName][j - 1] / 100;
                                }
                                else {
                                    petStarAttriResult[i - 1] = petStarAttriResult[i - 1] + petTbl[typeName][j - 1];
                                }
                            }
                        }
                    }

                    // 宠物进化被动增加属性
                    for (let i = 1; i <= v.step + 1; i++) {
                        let skillId = petTbl.skill_island[i - 1];
                        if (skillId != null && skillId != 0) {
                            let skillTbl = PlayerAdviserSystem.petSkill(skillId);
                            if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
                                let attrKey = skillTbl.attri_add[0];
                                let attrValue = skillTbl.attri_add[1];
                                if (attrKey == TableEnum.EnumGelAttrib.ATTR_HP || attrKey == TableEnum.EnumGelAttrib.ATTR_PHY_ATK || attrKey == TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
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

            for (let i = 1; i <= TableEnum.EnumGelAttribName.length; i++) {
                allAttrResult[i] = attriResult[i] + haloAttriResult[i - 1] + petStarAttriResult[i - 1] + petStepAttriResult[i - 1];
            }
            return allAttrResult;
        }

        public getWonderlandGeneral(serverFormation: message.FormationInfo): [Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }>, boolean] {
            let sort_data: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }> = [];
            let cur_data: Array<number> = [];
            let baseGeneralTbl: Array<number> = [];
            let gCount = TableLevel.Item(Game.PlayerInfoSystem.BaseInfo.level).scene_formation;
            let allGen = Game.PlayerHunterSystem.getSortGeneralByPower();
            let isChange = false;
            let serverList: Array<number> = [];
            let clientList: Array<number> = [];
            let serverFormat = serverFormation;

            if (serverFormat != null) {
                for (let i = 0; i < serverFormat.generals.length; i++) {
                    let v = serverFormat.generals[i];
                    if (v != 0) {
                        serverList.push(v)
                    }
                }

                for (let i = 0; i < serverFormat.reserves.length; i++) {
                    let v = serverFormat.reserves[i];
                    serverList.push(v);
                }
            }

            for (let i = 0; i < allGen.length; i++) {
                let v = allGen[i];
                if (clientList.length < gCount && v.id != 0) {
                    if (!Table.VIn(baseGeneralTbl, PlayerHunterSystem.GetGeneralId(v.id))) {
                        baseGeneralTbl.push(PlayerHunterSystem.GetGeneralId(v.id));
                        clientList.push(v.id);
                    }
                }
            }

            let hasNewGeneral = () => {
                for (let i = 0; i < clientList.length; i++) {
                    let v = clientList[i];
                    if (!Table.VIn(serverList, v)) return true;
                }
            }

            if (serverList == null || serverList.length == 0 || serverList.length > gCount || hasNewGeneral()) {
                for (let i = 0; i < clientList.length; i++) {
                    let v = clientList[i];
                    cur_data.push(v);
                }
                isChange = true;
            }
            else {
                for (let i = 0; i < serverList.length; i++) {
                    let v = serverList[i];
                    cur_data.push(v);
                }
            }

            for (let [kk, vv] of HelpUtil.GetKV(cur_data)) {
                for (let [v, k] of HelpUtil.GetKV(Game.PlayerHunterSystem.mapHunters)) {
                    if (k.general_id == vv) {
                        let newGeneralInfo: message.GeneralInfo = Table.DeepCopy(k);
                        // 重新计算战斗力
                        let petInfo = Game.PlayerAdviserSystem.petInfo != null ? Game.PlayerAdviserSystem.petInfo : [];
                        let haloId = Game.PlayerInfoSystem.BaseInfo.haloId != 0 ? Game.PlayerInfoSystem.BaseInfo.haloId : 0;
                        let attriResult = Game.PlayerHunterSystem.sceneHaloAndPetAttri(newGeneralInfo.attri, petInfo, haloId)
                        newGeneralInfo.attri = Helper.tblConvertAttri(attriResult);

                        let newAttriResult = attriResult;
                        newAttriResult.splice(0, 1);
                        let newBbattleValue = PlayerHunterSystem.CalcHXHHeroPower(attriResult, newGeneralInfo);
                        newGeneralInfo.battleValue = newBbattleValue;

                        let general = {
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
                for (let i = 0; i < sort_data.length; i++) {
                    let v = sort_data[i];
                    if (v.id != serverList[i]) {
                        isChange = true;
                    }
                }
            }
            else {
                isChange = true;
            }

            return [sort_data, isChange];
        }

        /**--------------------------------------------------------- */

        //猎人变身
        public static hunterTransform(id) {
            // return TableGeneralTransfer.Item(id);
        }

        /**变身猎人第五个技能升级 */
        public static GeneralTransferSkillUp(generalId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralTransferSkillUpRequest();
                request.body.generalId = generalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralTransferSkillUpResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });

        }


        public static replaceGeneralID(generalId: number) {
            for (const kk in Game.PlayerHunterSystem.mapHunters) {
                const vv = Game.PlayerHunterSystem.mapHunters[kk];
                if (vv.general_id % CommonConfig.general_id_to_index_multiple == generalId % CommonConfig.general_id_to_index_multiple && !vv.is_ware) {
                    return vv.general_id;
                }
            }
        }

        public static getCanTransformHunter(info) {
            if (info) {
                let generalId = PlayerHunterSystem.replaceGeneralID(info.general_id);
                let transList = [];
                let defance_list = {
                    [1]: [],
                    [2]: []
                };
                for (const kk in Game.PlayerHunterSystem.mapHunters) {
                    const vv = Game.PlayerHunterSystem.mapHunters[kk];
                    if (vv.level >= info.general_level && vv.star >= info.general_star
                        && vv.general_id % CommonConfig.general_id_to_index_multiple == info.general_id % CommonConfig.general_id_to_index_multiple
                        && vv.transfer_level < 1) {
                        transList.push(vv);
                    }
                }

                //判断猎人是否在上阵状态
                let defencelist = PlayerHunterSystem.GeneralsIdInDefence();
                let ret = [];
                for (const kk in transList) {
                    const vv = transList[kk];
                    let listid = vv.general_id;
                    let def = Table.FindF(defencelist, function (k, v) {
                        return v[0] == listid;
                    })
                    if (def) {
                        defance_list[2].push(vv);
                    } else {
                        defance_list[1].push(vv);
                    }
                }
                for (const _ in defance_list) {
                    const k = defance_list[_];
                    for (const _ in k) {
                        const kk = k[_];
                        kk.staticGeneralId = info.general_id;
                        ret.push(kk);
                    }
                }
                return ret;
            }
        }


        ///////////////////////////////////////////////////////////////////////////
        // 发送网络请求

        /**
         * 出售猎人
         * @param generalIds 武将ID列表
         */
        public sellGeneral(generalIds: Array<number>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralSellRequest();
                request.body.general_ids = generalIds;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralSellResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });

        }

        /**
         * 猎人出库、入库
         * @param generalIds 物件ID
         * @param isInWare 是否入库, true放入仓库 false移除仓库
         */
        public generalWareHouse(generalIds: Array<number>, isInWare: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralWareHouseRequest();
                request.body.general_ids = generalIds;
                request.body.is_ware = isInWare;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralWareHouseResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });
        }

        /**
         * 使用武将技能
         * 
         * @param generalId 武将ID
         * @param skillId 技能ID
         * @param index 解锁该突破技对应的突破等级
         */
        public breakSkillUsing(generalId: number, skillId: number, index: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.UseBreakSkillRequest();
                request.body.generalId = generalId;
                request.body.skillId = skillId;
                request.body.index = index;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.UseBreakSkillResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });
        }

        /**
         * 猎人突破
         * 
         * @param generalId 武将DI
         * @param exchangeIds 突破武将ID集合
         */
        public generalBreak(generalId: number, exchangeIds: Array<number>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralBreakRequest();
                request.body.generalId = generalId;
                request.body.exchange_ids = exchangeIds;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralBreakResponse>resp;
                    if (response.header.result != 0) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    for (let i = 0; i < exchangeIds.length; i++) {
                        let v = exchangeIds[i];
                        this.deleteHunterById(v);
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        public requsteExperienceUpdate(generalId: number, goods: Array<message.GoodsInfo>): Promise<{}> {
            return new Promise((resolve, reject) => {
                /**发协议 */
                let request = new message.GeneralExpPropRequest();
                request.body.generalId = generalId;
                request.body.goods = goods;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    /**收协议 */
                    let response = <message.GeneralExpPropResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });
        }

        /**
         * 猎人升星
         * 
         * @param generalId 武将ID
         * @param itemId 物品id列表
         */
        public upStar(generalId: number, itemId: Array<number>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralUpStarRequest();
                request.body.generalId = generalId;
                request.body.itemId = itemId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralUpStarResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.header.result);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);

            });
        }

        // 激活徽章
        public activatePartner(generalId, pos): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PartnerActivateRequest();
                request.body.generalId = generalId
                request.body.pos = pos;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PartnerActivateResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    Tips.SetTipsOfHero(generalId, Tips.TAG.GENERAL_GRADE_STEP);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 进阶
        public upQuality(generalId) {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralUpQualityRequest();
                request.body.generalId = generalId
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralUpQualityResponse>resp;
                    if (response.header.result != 0) {
                        let msg = Game.ConfigManager.getAone2CodeReason(response.header.result);
                        if (response.header.result == 10304) {
                            reject(response.header.result);
                        } else {
                            reject(msg);
                        }
                        return;
                    }
                    resolve({});
                    Tips.SetTipsOfHero(generalId, Tips.TAG.GENERAL_GRADE);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 突破技能升级
         * 
         * @param generalId 武将ID
         * @param skillId 技能ID
         * @param index x阶 技能
         * @param consumeGeneralIds 消耗的武将ID列表
         */
        public breakSkillUpLevel(generalId: number, skillId: number, index: number, consumeGeneralIds: Array<number>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.BreakSkillUplevelRequest();
                request.body.generalId = generalId;
                request.body.skillId = skillId;
                request.body.index = index;
                request.body.consume_generalIds = consumeGeneralIds;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.BreakSkillUplevelResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 猎人合成
         * 
         * @param compoundIndex 合成索引
         * @param generalIds 合成猎人ID数组
         * 
         * @description 合成之后，自动把已经合成的猎人从本地删除
         */
        public generalCompound(compoundIndex: number, generalIds: Array<number>, cd: Function): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralComposeRequest();
                request.body.compose_index = compoundIndex + 1;
                request.body.general_ids = generalIds;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralComposeResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 删除猎人
                    for (let i = 0; i < generalIds.length; i++) {
                        let v = generalIds[i];
                        this.deleteHunterById(v);
                    }
                    resolve();

                    //弹出获得猎人界面
                    cd();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }


        /**
         * 技能重置
         * 
         * @param generalId 猎人ID
         */
        public skillReset(generalId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SkillResetRequest();
                request.body.generalId = generalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SkillResetResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 被动技能升级
         */
        public passiveUpLevel(generalId: number, pos = 1): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PassiveUpLevelRequest();
                request.body.generalId = generalId;
                request.body.pos = pos;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PassiveUpLevelResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 技能升级
         * @param generalId 猎人ID
         * @param pos 技能位置(1-3)
         */
        public skillUpLevel(generalId: number, pos: number, isQuick = false): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SkillUpLevelRequest();
                request.body.generalId = generalId;
                request.body.isQuick = isQuick;
                request.body.pos = pos;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SkillUpLevelResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        public generalAddSkill(generalId: number, goods: Array<message.GoodsInfo>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralAddSkillRequest();
                request.body.generalId = generalId;
                request.body.goods = goods;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralAddSkillResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * Lock or Unlock card.
         * @param generalId The hunter's ID.
         * @param lock Indicate lock or unlock.
         * @param pos The card's position(1-9).
         * @param index The potatoInfo.index.
         * 
         * @description if not install, the generalId and potatoPos are both 0, if install, the index is 0, and generalId are the cHostId, pos are the message.potatoInfo.pos
         */
        public potatoLock(generalId: number, lock: boolean, pos: number, index: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoLockRequest();
                request.body.generalId = generalId;
                request.body.is_lock = lock;
                request.body.potatoPos = pos;
                request.body.index = index;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoLockResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * Install card
         * @param generalId The hunter's ID.
         * @param index The potatoInfo.index.
         * @param pos The card's position(1-9).
         * @param replaceJade Should replace the jade, default is false.
         */
        public potatoWear(generalId: number, index: number, pos: number, replaceJade = false): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoWearRequest();
                request.body.generalId = generalId;
                request.body.index = index;
                request.body.potatoPos = pos;
                request.body.replaceJade = replaceJade;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoWearResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        public unLoadAllPotato(generaId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoUnloadAllRequest();
                request.body.generalId = generaId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoUnloadAllResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 武将合成装备请求
         * 
         * @param generalId 武将ID
         * @param type  通用1，2，专属3
         */
        public generalSelectEquip(generalId: number, type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralSelectEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralSelectEquipResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 武将装备升级请求
         * 
         * @param generalId 武将ID
         * @param type 通用1，2，专属3
         */
        public generalUpLevelEquip(generalId: number, type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralUplevelEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralUplevelEquipResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 武将装备升品请求
         * 
         * @param generalId 武将ID
         * @param type 通用1，2，专属3
         */
        public generalUpStepEquip(generalId: number, type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralUpstepEquipRequest();
                request.body.generalId = generalId;
                request.body.equip_type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralUpstepEquipResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 觉醒
         * 
         * @param generalId 武将ID
         * @param sameGeneralList 同名猎人id
         * @param dollNumber 玩偶数量
         * @param isStudy 是否觉醒
         * @param isUpLevel 是否技能升级
         */
        public awakenPassiveToDo(generalId: number, sameGeneralList: Array<number>, dollNumber: number, isStudy: boolean, isUpLevel: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.AwakenPassiveToDoRequest();
                request.body.generalId = generalId;
                request.body.general = sameGeneralList;
                request.body.doll_num = dollNumber;
                request.body.is_study = isStudy;
                request.body.is_upLevel = isUpLevel;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.AwakenPassiveToDoResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 快速购买请求
         * 
         * @param itemId 物品id
         * @param count  购买物品数量
         */
        public quickMall(itemId: number, count: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.QuickMallRequest();
                request.body.item_id = itemId;
                request.body.item_num = count;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QuickMallResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 武将念力激活请求
         * 
         * @param generalId 武将ID
         * @param isTeach   是否新手
         * @param page      念力方案
         */
        public psychicActivate(generalId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralPsychicActivateRequest();
                request.body.generalId = generalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralPsychicActivateResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 武将更换念力方案请求
         * 
         * @param generaId 武将id
         * @param index    方案索引
         */
        public generalPsychicUse(generaId: number, index: number): Promise<{}> {
            return new Promise((resolve, reject) => {
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
        }

        /**
         * 武将解锁新念力请求
         * 
         * @param generalId   武将id
         * @param unlockIndex 方案索引
         */
        public generalPsychicUnlock(generalId: number, unlockIndex: number): Promise<{}> {
            return new Promise((resolve, reject) => {
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
        }

        /**
         * 武将念力修炼请求
         * 
         * @param generalId  武将id
         * @param pos        锁定位子
         * @param page       念力方案
         */
        public generalPsychicRefresh(generalId: number, pos: number, consume_generalId: number[]): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralPsychicRefreshRequest();
                request.body.generalId = generalId;
                request.body.pos = pos;
                request.body.consume_generalId = consume_generalId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralPsychicRefreshResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            })
        }

        /**
         * 武将念力修炼确认请求
         * 
         * @param generalId 武将id
         * @param isReplace 是否替换
         * @param page      念力方案
         */
        public generalPsychicReplace(generalId: number, isReplace: boolean, page: number): Promise<{}> {
            return new Promise((resolve, reject) => {
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
        }

        public generalRecruit(soulId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let generalId = PlayerHunterSystem.SoulIdFindGeneral(soulId).general_id;
                let request = new message.GeneralRecruitRequest();
                request.body.generalId = generalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralRecruitResponse>resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    let callGeneralId = response.body.gameInfo.generals[0].general_id;
                    resolve(callGeneralId);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }
        //单个武将最大升星升级战力值
        public getLvAndStarFullValue(general_id) {
            let result = 0;
            result = this.getLvAndStarPower(general_id, CommonConfig.role_max_level, CommonConfig.general_max_star);
            return result;
        }
        //单个武将升星升级战力值
        public getLvAndStarPower(general_id, level, star) {
            let result = 0;
            let aptitude = PlayerHunterSystem.Table(general_id).aptitude;
            result = (250 + level * 250 * (1 + 0.5 * (star - 1))) * aptitude / 10;
            return result;
        }
        //羁绊卡和品阶提供的最大战力值
        public getPartnerFullPower(general_id) {
            let aptitude = PlayerHunterSystem.Table(general_id).aptitude;
            let result = this.partnerPower(aptitude, CommonConfig.general_max_quality, 4);
            return result;
        }
        //羁绊卡通用计算
        public partnerPower(aptitude, step, num) {
            let result = (36 * 5 * step ^ 2 + 290 * 5 * step + (36 * 5 * (step + 1) ^ 2 + 290 * 5 * (step + 1) - 36 * 5 * step ^ 2 - 290 * 5 * step) * 0.9 * num / 4) * aptitude / 10;
            return result;
        }
        public GetAttriByPotatos(potatos) {
            let generalValue = Helper.CreateGeneralAttrTbl();
            let generalPercent = Helper.CreateGeneralAttrTbl();
            let talentSet = [];
            let result = Helper.CreateGeneralAttrTbl();
            for (let i = 0; i < potatos.length; i++) {
                let [gEValue, gEPercent, pEValue, pEPercent, eTalent] = PlayerCardSystem.GetExtraAttriTbl(potatos[i]);
                gEValue = Helper.integrateAttri(gEValue);
                gEPercent = Helper.integrateAttri(gEPercent);
                pEValue = Helper.integrateAttri(pEValue);
                pEPercent = Helper.integrateAttri(pEPercent);

                let baseTbl1 = this.getBaseAttriTbl(potatos[i]);
                let baseTbl = Helper.integrateAttri(baseTbl1);
                for (let j = 0; j < TableEnum.EnumAttriReal.length; j++) {
                    let i = TableEnum.EnumAttriReal[j];
                    result[i] = result[i] + baseTbl[i] * (100 + pEPercent[i]) / 100 + pEValue[i];
                    generalValue[i] = generalValue[i] + gEValue[i];
                    generalPercent[i] = generalPercent[i] + gEPercent[i];
                }
                for (let i = 0; i < eTalent.length; i++) {
                    talentSet.push(eTalent[i]);
                }
            }
            return [result, generalValue, generalPercent, talentSet];
        }
        //基础属性
        public getBaseAttriTbl(potato) {
            return PlayerCardSystem.GetBaseAttri(potato.id, potato.star, potato.level);
        }
        //突破技能信息
        public GetBreakInfo(generalInfo) {
            function f(v, _v) {
                return _v.key == v;
            }
            let breakInfo = {};
            for (let k in generalInfo.using_break_skill) {
                let v = generalInfo.using_break_skill[k];
                if (v != 0) {
                    let [value,] = [null, null];
                    for (let i = 0; i < generalInfo.break_skill.length; i++) {
                        if (f(v, generalInfo.break_skill[i])) {
                            [value,] = [generalInfo.break_skill[i], i];
                        }
                    }
                    if (value != null) {
                        breakInfo[v] = value.value;
                    }
                }
            }
            return breakInfo;
        }

        public getSortGeneralFormat() {
            let sort_data = [];
            let hunter = Game.PlayerHunterSystem.queryAllHunters();
            for (let [k, v] of HelpUtil.GetKV(hunter)) {
                if (!v.is_ware) {
                    sort_data.push(v);
                }
            }
            sort_data.sort(PlayerHunterSystem.SortGeneral)

            return sort_data
        }

        public getSortGeneral() {
            let sort_data = [];
            let hunters = Game.PlayerHunterSystem.allHuntersMap();
            for (let [k, v] of HelpUtil.GetKV(HunterSkillInfoItem)) {
                if (v.level > 0) {
                    sort_data.push(v);
                }
            }
            sort_data.sort(PlayerHunterSystem.SortGeneral)

            return sort_data;
        }

        //新手查看第三章奖励是否领取
        public TeachCondition8009() {
            //图鉴中存在
            let LEIOULIID = 10031;
            let getLEIOULI = Table.VIn(Game.PlayerHunterHistorySystem.getGeneralHistoryIds, LEIOULIID);
            //奖励领取
            let canGetAward = false;
            let mobId = 100021 as any;
            let instances = Table.FindR(Game.PlayerInstanceSystem.mobInfos, (k, v) => {
                if (v.mobId == mobId) {
                    return true;
                }
            })
            if (instances != null && instances[0].star) {
                mobId = instances;
            }
            if (mobId instanceof Number || mobId[0].star == 0) {

            } else if (mobId[0].chestReward == false) {
                canGetAward = true;
            }

            return canGetAward && !getLEIOULI;
        }

        public huntervis: boolean = true;


        public getGeneralPsychicAttri(general_id: number) {
            let ret = [];
            let psyTbl = this.Table(general_id).psychic_unlock_six;
            for (let k in psyTbl) {
                if (psyTbl.hasOwnProperty(k)) {
                    let v = psyTbl[k];
                    ret[k] = this.InstancePsychicAttri(Number(v));
                }
            }
            return ret;
        }

        public InstancePsychicAttri(id) {
            if (ckid(id)) {
                return null;
            }
            return TableGeneralPsychicAttri.Item(id);
        }
    }

}