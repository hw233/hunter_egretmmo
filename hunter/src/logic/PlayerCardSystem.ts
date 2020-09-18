namespace zj {
    // 玩家卡片（宝物）系统
    // guoshanhe 创建于2018.11.13

    export class PlayerCardSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        // 刷新最新获得卡片index
        public static RefreshNewCardIndex() {
            for (let v of Game.PlayerCardSystem.getAllPotatos()) {
                if (v.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                    Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = v.index;
                }
            }
        }

        public static GetAllCardNoHostSortByType(): Array<message.PotatoInfo> {
            let result = Game.PlayerCardSystem.getAllPotatos();

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;

                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);

                let aNew = a.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                let bNew = b.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;

                if (aNew == bNew) {
                    if (tbla != null && tblb != null) {
                        if (tbla.type == tblb.type) {
                            if (tbla.quality == tblb.quality) {
                                if (a.star == b.star) {
                                    if (a.level == b.level)
                                        return b.id - a.id;
                                    else
                                        return b.level - a.level;
                                }
                                else {
                                    return b.star - a.star;
                                }
                            }
                            else {
                                return tblb.quality - tbla.quality;
                            }
                        }
                        else {
                            return tblb.type - tbla.type;
                        }
                    }
                }
                else {
                    return bNew - aNew;
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardNoHostSortByStar(): Array<message.PotatoInfo> {
            let result = Game.PlayerCardSystem.getAllPotatos();

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);

                let aNew = a.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                let bNew = b.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;

                if (aNew == bNew) {
                    if (tbla != null && tblb != null) {
                        if (a.star == b.star) {
                            if (tbla.quality == tblb.quality) {
                                if (a.level == b.level) {
                                    if (tbla.type == tblb.type)
                                        return b.id - a.id;
                                    else
                                        return tblb.type - tbla.type;
                                }
                                else {
                                    return b.level - a.level;
                                }
                            }
                            else {
                                return tblb.quality - tbla.quality;
                            }
                        }
                        else {
                            return b.star - a.star;
                        }
                    }
                }
                else {
                    return bNew - aNew;
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardNoHostSortByLevel(): Array<message.PotatoInfo> {
            let result = Game.PlayerCardSystem.getAllPotatos();

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (a == null || b.id == null)
                    return 1;
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);

                let aNew = a.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                let bNew = b.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                if (aNew == bNew) {
                    if (tbla != null && tblb != null) {
                        if (a.level == b.level) {
                            if (tbla.quality == tblb.quality) {
                                if (a.star == b.star) {
                                    if (tbla.type == tblb.type)
                                        return b.id - a.id;
                                    else
                                        return tblb.type - tbla.type;
                                }
                                else {
                                    return b.star - a.star;
                                }
                            }
                            else {
                                return tblb.quality - tbla.quality;
                            }
                        }
                        else {
                            return b.level - a.level;
                        }
                    }
                }
                else {
                    return bNew - aNew;
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardHasHostSortByType(): Array<message.PotatoInfo> {
            let result = [];

            let allHunters = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                let curPotatos = allHunters[k].potatoInfo;
                for (let kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (tbla != null && tblb != null) {
                    if (tbla.type == tblb.type) {
                        if (tbla.quality == tblb.quality) {
                            if (a.star == b.star) {
                                if (a.level == b.level)
                                    return b.id - a.id;
                                else
                                    return b.level - a.level;
                            }
                            else {
                                return b.star - a.star;
                            }
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return tblb.type - tbla.type;
                    }
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardHasHostSortByStar(): Array<message.PotatoInfo> {
            let result = [];

            let allHunters = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                let curPotatos = allHunters[k].potatoInfo;
                for (let kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (tbla != null && tblb != null) {
                    if (a.star == b.star) {
                        if (tbla.quality == tblb.quality) {
                            if (tbla.type == tblb.type) {
                                if (a.level == b.level)
                                    return b.id - a.id;
                                else
                                    return b.level - a.level;
                            }
                            else
                                return tblb.type - tbla.type;
                        }
                        else
                            return tblb.quality - tbla.quality;
                    }
                    else {
                        return b.star - a.star;
                    }
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardHasHostSortByLevel(): Array<message.PotatoInfo> {
            let result = [];

            let allHunters = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                let curPotatos = allHunters[k].potatoInfo;
                for (let kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (tbla != null && tblb != null) {
                    if (a.level == b.level) {
                        if (tbla.quality == tblb.quality) {
                            if (a.star == b.star) {
                                if (tbla.type == tblb.type)
                                    return b.id - a.id;
                                else
                                    return tblb.type - tbla.type;
                            }
                            else {
                                return b.star - a.star;
                            }
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetAllCardHasHostSortByHost(): Array<message.PotatoInfo> {
            let result = [];

            let allHunters = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                let curPotatos = allHunters[k].potatoInfo;
                for (let kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }

            result.sort((a, b) => {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;

                let cHostIdA = Game.PlayerCardSystem.getCardToHunterInfo(a.index).cHostId;
                let cHostIdB = Game.PlayerCardSystem.getCardToHunterInfo(b.index).cHostId;
                let aInfo = Game.PlayerHunterSystem.queryHunter(cHostIdA);
                let bInfo = Game.PlayerHunterSystem.queryHunter(cHostIdB);
                if (aInfo.level == bInfo.level) {
                    if (aInfo.star == bInfo.star) {
                        if (aInfo.awakePassive.level == bInfo.awakePassive.level) {
                            if (PlayerHunterSystem.Table(cHostIdA).aptitude == PlayerHunterSystem.Table(cHostIdB).aptitude) {
                                if (cHostIdA == cHostIdB)
                                    return a.pos - b.pos;
                                else
                                    return cHostIdA - cHostIdB;
                            }
                            else {
                                return PlayerHunterSystem.Table(cHostIdB).aptitude - PlayerHunterSystem.Table(cHostIdA).aptitude;
                            }
                        }
                        else {
                            return bInfo.awakePassive.level - aInfo.awakePassive.level;
                        }
                    }
                    else {
                        return bInfo.star - aInfo.star;
                    }
                }
                else {
                    return bInfo.level - aInfo.level;
                }
            });

            if (result.length < 16) {
                for (let i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }

            return result;
        }

        public static GetCardMapById() {
            let map = {};

            let generals = Game.PlayerHunterSystem.queryAllHunters();
            for (let kk in generals) {
                let vv = generals[kk];
                for (let pk in vv.potatoInfo) {
                    let pv = vv.potatoInfo[pk];
                    map[pv.id] = true;
                }
            }

            let potatos = Game.PlayerCardSystem.getAllPotatos();
            for (let kk in potatos) {
                let vv = potatos[kk];
                if (vv == null) continue;
                map[vv.id] = true;
            }

            return map;
        }

        public static GetAllCardByTypeForPokedex() {
            let ret = [];
            let sumNum = 0;
            let getNum = 0;

            let cardMap = PlayerCardSystem.GetCardMapById();

            for (let i = 0; i < 6; i++) {
                ret[i] = [];
            };

            let cardList = TableItemPotato.Table();
            for (let k in cardList) {
                sumNum++;
                let card = cardList[k];
                let isGet = cardMap[card.id] || false;
                if (isGet)
                    getNum = getNum + 1;

                if (ret != null) {
                    ret[card.type - 1].push(card);
                }
            }

            for (let kk in ret) {
                ret[kk].sort((a, b) => {
                    if (a.rare_card == b.rare_card) {
                        if (a.star == b.star)
                            return b.id - a.id;
                        else
                            return b.star - a.star;
                    }
                    else {
                        return b.rare_card - a.rare_card;
                    }
                });
            }

            let tmp = ret[1];
            ret[1] = ret[2];
            ret[2] = tmp;

            return [ret, sumNum, getNum];
        }

        public static GetAllCardByQualityForPokedex() {
            let ret = [];
            let sumNum = 0;
            let getNum = 0;

            let cardMap = PlayerCardSystem.GetCardMapById();

            for (let i = 0; i < 5; i++) {
                ret[i] = [];
            };

            let cardList = TableItemPotato.Table();
            for (let k in cardList) {
                sumNum++;
                let card = cardList[k];
                let isGet = cardMap[card.id] || false;
                if (isGet)
                    getNum = getNum + 1;

                if (ret != null)
                    ret[6 - card.quality].push(card);
            }

            for (let kk in ret) {
                ret[kk].sort((a, b) => {
                    if (a.rare_card == b.rare_card) {
                        if (a.star == b.star)
                            return b.id - a.id;
                        else
                            return b.star - a.star;
                    }
                    else {
                        return b.rare_card - a.rare_card;
                    }
                });
            }

            return [ret, sumNum, getNum];
        }

        /**
         return [smallPath, bigPath, outPath]
         */
        public static GetItemFrame(potatoId: number, potatoInfo?: message.PotatoInfo): [string, string, string] {

            let potatoTbl = TableItemPotato.Item(potatoId);
            let smallPath = UIConfig.UIConfig_Role.itemFrame[potatoTbl.quality];
            let bigPath = UIConfig.UIConfig_Role.cardFrame[potatoTbl.quality];
            let outPath = UIConfig.UIConfig_Role.cardFrameOut[potatoTbl.quality];
            if (potatoTbl.rare_card != 0) {
                smallPath = UIConfig.UIConfig_Role.item_rareCardFrame[potatoTbl.rare_card];
                bigPath = UIConfig.UIConfig_Role.cardRareFrame[potatoTbl.rare_card];
                outPath = UIConfig.UIConfig_Role.cardRareFrameOut[potatoTbl.rare_card];
            }

            if (potatoInfo != null) {

                let tbl: number[] = [];
                for (let i = 0; i < potatoInfo.add_attri.length; i++) {
                    let vv = potatoInfo.add_attri[i];
                    let attriInfo = TablePotatoAttri.Item(vv.attriId);
                    let growthScore = null;
                    if (vv.growthValue > attriInfo.range_growth[0][1]) {
                        growthScore = attriInfo.growth_score[1];
                    } else {
                        growthScore = attriInfo.growth_score[0];
                    }
                    tbl.push(growthScore);
                }

                let score = Table.Add(0, potatoInfo.add_attri.length, (id) => {
                    return tbl[id];
                });

                let isOpen = Table.FindF(potatoInfo.add_attri, (_, v: message.PotatoAttriItem) => {
                    return v.growthValue != 0;
                });

                if (score >= CommonConfig.card_growth_score && isOpen) {
                    if (potatoTbl.rare_card != 0) {
                        smallPath = UIConfig.UIConfig_Hunter_Equip.itemFrame[5]
                        bigPath = UIConfig.UIConfig_Role.cardRareFrame[1]
                        outPath = UIConfig.UIConfig_Role.cardRareFrameOut[1]
                    } else {
                        smallPath = UIConfig.UIConfig_Hunter_Equip.itemFrame[5]
                        bigPath = UIConfig.UIConfig_Role.cardFrame[6]
                        outPath = UIConfig.UIConfig_Role.cardFrameOut[6]
                    }
                }
            }
            return [smallPath, bigPath, outPath];
        }

        public static GetAllCardBag() {
            let ret: Array<message.GoodsInfo> = [];
            let listCardId = PlayerItemSystem.GetCardBag();
            for (let k in listCardId) {
                let v = listCardId[k];
                if (Game.PlayerCardSystem.mapGoods[v] && Game.PlayerCardSystem.mapGoods[v].count != 0) {
                    let goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = Game.PlayerCardSystem.mapGoods[v].count;
                    goods.index = 0;
                    goods.showType = 0;
                    ret.push(goods);
                }
            }

            return ret;
        }

        // 附加属性
        public static GetExtraAttriTbl(potato: message.PotatoInfo) {
            let generalValue = Helper.CreateGeneralAttrTbl();
            let generalPercent = Helper.CreateGeneralAttrTbl();
            let potatoValue = Helper.CreateGeneralAttrTbl();
            let potatoPercent = Helper.CreateGeneralAttrTbl();

            let talentSet = [];
            for (let i = 0; i < potato.add_attri.length; i++) {
                let extraInfo = potato.add_attri[i];
                let attriTbl = TablePotatoAttri.Item(extraInfo.attriId);
                if (attriTbl != null) {
                    if (attriTbl.object_type == String(message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE)) {
                        generalValue[attriTbl.attri_type - 1] = generalValue[attriTbl.attri_type - 1] + extraInfo.attriValue + potato.add_attri[i].growthValue;
                    } else if (attriTbl.object_type == String(message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE)) {
                        generalPercent[attriTbl.attri_type - 1] = generalPercent[attriTbl.attri_type - 1] + extraInfo.attriValue + potato.add_attri[i].growthValue;
                    } else {
                        let info = {
                            "type": attriTbl.attri_type,// "type": attriTbl.attri_type - 1
                            "growthValue": extraInfo.growthValue
                        };
                        talentSet.push(info);
                    }
                }
            }

            return [generalValue, generalPercent, potatoValue, potatoPercent, talentSet];
        }

        public static GetBaseAttri(id: number, star: number = 0, level: number = 0) {
            let tbl: TableItemPotato = null;
            if (typeof id === "string" || typeof id === "number") {
                tbl = TableItemPotato.Item(id);
            }

            let result = Helper.CreateGeneralAttrTbl();
            let percent = Helper.CreateGeneralAttrTbl();

            if (tbl == null) return [result, percent];

            let baseAttri = tbl.attri_value;
            let starAttri = 0;
            for (let i = 0; i < star; i++) {
                starAttri += (tbl.attri_star[i] ? tbl.attri_star[i] : 0);
            }
            let levelAttri = 0;
            for (let i = 0; i < level; i++) {
                levelAttri += (tbl.attri_level[i] ? tbl.attri_level[i] : 0);
            }

            // 保留小数点后两位
            let levelAttri1 = String(levelAttri);
            let pointNum: number = levelAttri1.indexOf(".");
            if (pointNum != -1) {
                levelAttri = Number(levelAttri1.substr(0, pointNum + 3));

            }
            let index = tbl.attri_type - 1;
            let totalValue = baseAttri + starAttri + levelAttri;
            if (tbl.add_type == 1) {
                result[index] = totalValue;
            } else {
                percent[index] = totalValue;
                let str = totalValue.toString();
                let pos = str.indexOf(".") + 3; // 获取小数点的位置
                let count = str.length - pos; // 获取小数点后的个数
                if (count > 0 && pos != 0) {
                    percent[index] = Number(totalValue.toFixed(1));
                }
            }

            return [result, percent];
        }

        public static GetCardBaseAttri(id: number, star: number, level: number): [Array<string>, Array<string>] {
            let [attriTbl, percentTbl] = PlayerCardSystem.GetBaseAttri(id, star, level);
            let result = [];
            let resultNum = [];

            for (let i = 0; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (attriTbl[i] != 0) {
                    let a = attriTbl[i].toString();
                    if (Object.keys(a).length > 10) {
                        a = attriTbl[i].toFixed(1);
                    }
                    result.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.Attri[i], a));
                    resultNum.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.AttriNum[i], attriTbl[i]));
                } else if (percentTbl[i] != 0) {
                    let a = percentTbl[i].toString();
                    if (Object.keys(a).length > 10) {
                        a = percentTbl[i].toFixed(1);
                    }
                    result.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.Attri[i], a) + "%");
                    resultNum.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.AttriNum[i], percentTbl[i]) + "%");
                }
            }

            return [result, resultNum];
        }

        public static TableFindk(t, v) {
            for (var i in t) {
                if (t[i] == v) {
                    return i
                }
            }
            return -1
        }

        // public static GetAttriStr(addInfo: message.PotatoAttriItem) {
        //     let attriTbl = TablePotatoAttri.Item(addInfo.attriId);
        //     let valueStr = String(Math.floor(addInfo.attriValue));
        //     if (addInfo.attriValue == 0) valueStr = "???";

        //     let result = "";
        //     if (attriTbl.object_type == "") {
        //         result = PlayerTalentSystem.Des(attriTbl.attri_type, 1);
        //     } else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_UNIL_RESIS) {
        //         result = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Potato.attri_unil_resis, valueStr);
        //     } else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_IGNORE_RESIS) {
        //         result = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Potato.attri_ignore_resis, valueStr);
        //     } else if (attriTbl.object_type == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE.toString()) {
        //         let perAttr = [
        //             message.AttriType.ATTRI_TYPE_SKILL_ATK, // 4 加魔功（念力命中）
        //             message.AttriType.ATTRI_TYPE_SKILL_DEF, // 5 加魔防（念力抵抗）
        //             message.AttriType.ATTRI_TYPE_ATK_CRIT, // 6 加物理暴击（念力暴击）
        //             message.AttriType.ATTRI_TYPE_CRIT_EXTRA, // 8 暴伤加成（念力暴伤
        //             message.AttriType.ATTRI_TYPE_CRIT_RESISTANCE, // 9 暴击抵抗
        //             message.AttriType.ATTRI_TYPE_DODGE_RATE, // 10 躲闪
        //             message.AttriType.ATTRI_TYPE_HIT_RATE, // 11 命中
        //             message.AttriType.ATTRI_TYPE_IGNORE_PHYDEF // 12 忽视物防
        //         ];
        //         // to do? index should subtract 1 
        //         let attriStr = TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1];
        //         if (/*PlayerCardSystem.TableFindk(perAttr, attriTbl.attri_type + 1*/Table.FindK(perAttr, attriTbl.attri_type) == -1) { // `attri_type` 
        //             result = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], valueStr, attriStr);
        //         } else {
        //             result = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Potato.potato_attri_per, valueStr, attriStr);
        //         }
        //     } else if (attriTbl.object_type == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE.toString()) {
        //         // to do? index should subtract 1 
        //         let attriStr = TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1];
        //         result = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], attriStr, valueStr);
        //     } else {
        //         console.error("attri_table error" + addInfo.attriId);
        //     }

        //     return result;
        // }

        public static GetAttriStr(addInfo: message.PotatoAttriItem, rangAdd: number, _type: number): string {
            let perAttr = [
                message.AttriType.ATTRI_TYPE_SKILL_ATK, // 4 加魔功（念力命中）
                message.AttriType.ATTRI_TYPE_SKILL_DEF, // 5 加魔防（念力抵抗）
                message.AttriType.ATTRI_TYPE_ATK_CRIT, // 6 加物理暴击（念力暴击）
                message.AttriType.ATTRI_TYPE_CRIT_EXTRA, // 8 暴伤加成（念力暴伤
                message.AttriType.ATTRI_TYPE_CRIT_RESISTANCE, // 9 暴击抵抗
                message.AttriType.ATTRI_TYPE_DODGE_RATE, // 10 躲闪
                message.AttriType.ATTRI_TYPE_HIT_RATE, // 11 命中
                message.AttriType.ATTRI_TYPE_IGNORE_PHYDEF // 12 忽视物防
            ];
            let result = "";
            let valueStr = null;
            let attriTbl = Game.PlayerCardSystem.attriInstance(addInfo.attriId);

            if (rangAdd != 0 && rangAdd != null) {
                if (_type == 1) {
                    if (Number(attriTbl.object_type) != message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE && (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && Table.FindK(perAttr, attriTbl.attri_type) == -1)) {
                        valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_pur, Math.floor(addInfo.attriValue), rangAdd);
                    }
                    else {
                        valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_pur_per, Math.floor(addInfo.attriValue), rangAdd);
                    }
                }
                else {
                    if (Number(attriTbl.object_type) != message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE && (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && Table.FindK(perAttr, attriTbl.attri_type) == -1)) {
                        valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_org, Math.floor(addInfo.attriValue), rangAdd);
                    }
                    else {
                        valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_org_per, Math.floor(addInfo.attriValue), rangAdd);
                    }
                }
            }
            else {
                valueStr = Math.floor(addInfo.attriValue);
            }

            if (addInfo.attriValue == 0) valueStr = "???";

            if (rangAdd == 0 || rangAdd == null) {
                if (attriTbl.object_type == "") {
                    result = PlayerTalentSystem.Des_Card(attriTbl.attri_type, 1, rangAdd, _type)[0];
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_UNIL_RESIS) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.attri_unil_resis, valueStr);
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_IGNORE_RESIS) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.attri_ignore_resis, valueStr);
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE) {
                    if (Table.FindK(perAttr, attriTbl.attri_type) == -1) {
                        result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], valueStr, TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                    else {
                        result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri_per, valueStr, TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1], valueStr);
                }
                // else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_POTATO_VALUE) {}
            }
            else {
                if (attriTbl.object_type == "") {
                    result = PlayerTalentSystem.Des_Card(attriTbl.attri_type, 1, rangAdd, _type)[0];
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_UNIL_RESIS) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.attri_unil_resis_color, valueStr);
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_IGNORE_RESIS) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.attri_ignore_resis_color, valueStr);
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE) {
                    if (Table.FindK(perAttr, attriTbl.attri_type) == -1) {
                        result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri_color[Number(attriTbl.object_type) - 1], valueStr, TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                    else {
                        result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri_per_color, valueStr, TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE) {
                    result = Helper.StringFormat(TextsConfig.TextsConfig_Potato.potato_attri_color[Number(attriTbl.object_type) - 1], TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1], valueStr);
                }
                // else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_POTATO_VALUE) {}
            }
            return result;
        }


        /**
         * 获取宝物附加属性描述
         * 
         * @returns Array, each element is a tuple, the first element is description, the second is quality
         */
        public static GetAddStr(info: message.PotatoInfo, rangAdd?: number, _type?: number): Array<[string, number]> {
            let result: Array<[string, number]> = [];
            for (let i = 0; i < info.add_attri.length; i++) {
                let vv = info.add_attri[i];
                let str = PlayerCardSystem.GetAttriStr(vv, rangAdd, _type);
                let attriTbl = TablePotatoAttri.Item(vv.attriId);
                result.push([str, attriTbl.quality]);
            }
            if (info.star < 6) {
                result.push([TextsConfig.TextsConfig_Potato.sixAttri, 1]);
            }
            return result;
        }

        public static GetAddStrNotGet(tbl: TableItemPotato, range?: number) {
            let ret = [];
            let potatoTbl = tbl;
            let min = potatoTbl.add_count[0];
            let max = potatoTbl.add_count[1];
            if (min == max)
                ret.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.unidTipes, min));
            else
                ret.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.unidTipes, min + "~" + max));

            let appraise_add = tbl.appraise_add;
            if (appraise_add.length > 0 && appraise_add[0] != 0) {
                ret.push(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.unidAttriTips, appraise_add.length));
                for (let kk in appraise_add) {
                    let vv = appraise_add[kk];
                    let tmp = new message.PotatoAttriItem();
                    tmp.attriId = vv;
                    tmp.attriValue = 0;
                    // let tmp = {
                    //     attriId: vv,
                    //     attriValue: 0
                    // };
                    let str = PlayerCardSystem.GetAttriStr(tmp, range, null);
                    ret.push(str);
                }
            }

            return ret;
        }

        public static GetAllSellCardIndexByStar(sellStarType: Array<boolean>) {
            let ret = [];
            let money = 0;

            for (let k in Game.PlayerCardSystem.getAllPotatos()) {
                let v = Game.PlayerCardSystem.getAllPotatos()[k];
                if (v == null) continue;
                if (sellStarType[v.star - 1] && !v.is_lock) {
                    let price = TableItemPotato.Item(v.id).price;
                    for (let i = 0; i < v.level - 1; i++) {
                        price = price + CommonConfig.potato_uplevel_comsume_money(TableItemPotato.Item(v.id).quality, i) / 2;
                    }
                    money = money + price;
                    ret.push(v.index);
                }
            }

            ret.push(money);

            return ret;
        }

        public static DelCardByIndexTable(indexs: Array<number>) {
            for (let k in indexs) {
                Game.PlayerCardSystem.deleteCardByIndex(indexs[k]);
            }

            for (let v of Game.PlayerHunterSystem.queryAllHunters()) {
                Tips.SetTipsOfHero(v.general_id);
            }

            Tips.SetTipsOfAllHero();
        }

        public static RefreshCard(info: message.PotatoInfo): message.PotatoInfo {
            let ret = null;
            let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
            if (cHostId != null && info.pos != 0) {
                let gen = Game.PlayerHunterSystem.queryHunter(cHostId);
                for (let k in gen.potatoInfo) {
                    let v = gen.potatoInfo[k];
                    if (v.pos == info.pos) {
                        ret = v;
                        break;
                    }
                }
            } else {
                for (let k in Game.PlayerCardSystem.getAllPotatos()) {
                    let v = Game.PlayerCardSystem.getAllPotatos()[k];
                    if (v.index == info.index) {
                        ret = v;
                        break;
                    }
                }
            }

            return ret;
        }

        public static GetComposeTbl() {
            let potaotTbl = TableItemPotato.Table();
            let composeTbl: Array<{ product_id: number, need_ids: Array<number>, need_counts: Array<number>, have_counts: Array<number>, counts_per: Array<number>, can_compose: number, randomCard: number, isSel: boolean }> = [];
            for (let v of TableEnum.Enum.PropCardPiece) {
                let pieceTbl: TableItemProp = <TableItemProp>PlayerItemSystem.ItemConfig(v);
                let tbl = {
                    product_id: pieceTbl.compose_cards[1],
                    need_ids: [v],
                    need_counts: [Number(pieceTbl.compose_counts)],
                    have_counts: [],
                    counts_per: [],
                    can_compose: 1,
                    randomCard: pieceTbl.compose_cards[0],
                    isSel: false
                }

                for (let kk in tbl.need_ids) {
                    let have_count = PlayerItemSystem.Count(tbl.need_ids[kk]);
                    let per = have_count / tbl.need_counts[kk] >= 1 ? 1 : have_count / tbl.need_counts[kk];
                    tbl.have_counts.push(have_count);
                    tbl.counts_per.push(per);
                    if (tbl.can_compose && tbl.need_counts[kk] != null && have_count < tbl.need_counts[kk])
                        tbl.can_compose = 0;
                }

                composeTbl.push(tbl);
            }

            composeTbl.sort((a, b) => {
                if (a.can_compose == b.can_compose)
                    if (a.randomCard == b.randomCard)
                        return a.product_id - b.product_id;
                    else
                        return a.randomCard - b.randomCard;
                else
                    return b.can_compose - a.can_compose;
            });

            return composeTbl;
        }

        // 获取所有卡片（包括武将身上）

        public static GetAllCard(info) {
            let all_card = [];
            let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
            if (cHostId != null && info.pos != 0) {
                let generalInfo: message.GeneralInfo = Game.PlayerHunterSystem.queryHunter(cHostId);
                if (generalInfo != null) {
                    let potatoInfos: Array<message.PotatoInfo> = generalInfo.potatoInfo;
                    for (let k in potatoInfos) {
                        let v = potatoInfos[k];
                        if (v.index == info.index && v.pos == info.pos)
                            all_card.push(v);
                    }
                }
            }

            let allPotatos = Game.PlayerCardSystem.getAllPotatos();
            for (let k in allPotatos) {
                all_card.push(allPotatos[k]);
            }

            all_card.sort((a, b) => {
                if (a == null)
                    return Number(false);
                else if (b == null)
                    return Number(true);
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (a.level == b.level) {
                        if (tbla.quality == tblb.quality) {
                            if (tbla.type == tblb.type)
                                return b.id - a.id;
                            else
                                return tblb.type - tbla.type;
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.star - a.star;
                }
            });

            return all_card;
        }

        // 获取一定等级同名卡片（包含已装备） 参数：卡片信息，卡片id,卡片索引，卡片等级
        public static GetAllCardByName(info: message.PotatoInfo, potatoId: number, index: number, level: number) {
            let all_card = this.GetAllCard(info);
            let all_card_name: Array<message.PotatoInfo> = [];
            let all_card_sort = [];

            let allGenerals = Game.PlayerHunterSystem.queryAllHunters();
            for (let k in allGenerals) {
                let potatoInfos = allGenerals[k].potatoInfo;
                for (let kk in potatoInfos) {
                    all_card.push(potatoInfos[kk]);
                }
            }

            for (let v of all_card) {
                if (v.id == potatoId && v.level >= level && v.index != index)
                    all_card_sort.push(v);
            }

            let list = [[], [], []];
            for (let vv of all_card_sort) {
                if (vv.pos != 0)
                    list[1].push(vv);
                else if (vv.is_lock)
                    list[2].push(vv);
                else
                    list[0].push(vv);
            }

            list[0].sort((a, b) => {
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (a.level == b.level) {
                        if (tbla.quality == tblb.quality) {
                            if (tbla.type == tblb.type)
                                return b.id - a.id;
                            else
                                return tblb.type - tbla.type;
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.star - a.star;
                }
            });

            list[1].sort((a, b) => {
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (a.level == b.level) {
                        if (tbla.quality == tblb.quality) {
                            if (tbla.type == tblb.type)
                                return b.id - a.id;
                            else
                                return tblb.type - tbla.type;
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.star - a.star;
                }
            });

            list[2].sort((a, b) => {
                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (a.level == b.level) {
                        if (tbla.quality == tblb.quality) {
                            if (tbla.type == tblb.type)
                                return b.id - a.id;
                            else
                                return tblb.type - tbla.type;
                        }
                        else {
                            return tblb.quality - tbla.quality;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return b.star - a.star;
                }
            });


            for (let v of list) {
                for (let vv of v) {
                    all_card_name.push(vv);
                }
            }

            return all_card_name;
        }

        /** 获取未装备的卡片 */
        public static GetHaveCardByType(type: number): boolean {
            let allPotatos = Game.PlayerCardSystem.getAllPotatos();
            for (let i = 0; i < allPotatos.length; i++) {
                let v = allPotatos[i];
                let potatoInfo = TableItemPotato.Item(v.id);
                if (potatoInfo.type == type) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 获取未装备的卡片类型，属性
         * 
         * @param type The card's type(1-6).
         * @param mainAttr Array, contain 1 element, main screen attribute id
         * @param addAttr Array, contain 3 elements, additon screen attribute id
         * 
         * @returns Tuple
         */
        public static GetCardByTypeAndAttr(type: number, mainAttr: Array<number>, addAttr: Array<number>) {
            let result = [];
            for (let i = 0; i < 16; i++) {
                result.push({ "sort_index": i });
            }

            let mainIncludes = {};
            let addIncludes = {};
            let screenTbl = TableClientPotatoScreen.Table();

            // main
            if (mainAttr[0] != 0) {
                for (let i = 0; i < mainAttr.length; i++) {
                    let v = mainAttr[i];
                    let includeIds = screenTbl[v].includeIds;
                    mainIncludes[i] = includeIds;
                }
            }

            // add
            for (let j = 0; j < addAttr.length; j++) {
                let v = addAttr[j];
                if (v != 0) {
                    let includeIds = screenTbl[v].includeIds;
                    addIncludes[j] = includeIds;
                }
            }

            let screenAttr = function (potatoInfo: message.PotatoInfo): boolean {
                if (mainAttr.length > 0 && Table.VIn(mainAttr, 0) == false) {
                    let mainConfirm = false;
                    for (let k in mainIncludes) {
                        if (mainIncludes.hasOwnProperty(k)) {
                            let v = mainIncludes[k];
                            if (Table.VIn(v, potatoInfo.id)) {
                                mainConfirm = true;
                                break;
                            }
                        }
                    }

                    if (mainConfirm == false) {
                        return false;
                    }
                }

                if (!(addAttr.length == 1 && addAttr[0] == 0)) {
                    let potatoAttriIds = Table.Init(potatoInfo.add_attri.length, (i) => {
                        return potatoInfo.add_attri[i].attriId;
                    });
                    for (let k in addIncludes) {
                        if (addIncludes.hasOwnProperty(k)) {
                            let v = addIncludes[k];
                            let addConfirm = false;
                            for (let i = 0; i < potatoAttriIds.length; i++) {
                                let vv = potatoAttriIds[i];
                                if (Table.VIn(v, vv)) {
                                    addConfirm = true;
                                    break;
                                }
                            }
                            if (addConfirm == false) return false;
                        }
                    }

                }
                return true;
            }

            let count = 0;
            let allPotatoInfo = Game.PlayerCardSystem.getAllPotatos();
            for (let i = 0; i < allPotatoInfo.length; i++) {
                let v = allPotatoInfo[i];
                let info = TableItemPotato.Item(v.id);
                if (info.type == type && screenAttr(v) == true) {
                    if (result[count] == null) {
                        result.push(v);
                    } else {
                        result[count] = v;
                    }
                    count += 1;
                }
            }
            result.push({ "is_button": true })

            let sortAscend = function (a, b) {
                if (a.id == null || a.id == undefined || b.id == null || b.id == undefined) {
                    if (a.id != b.id) {
                        if (a.id == null || a.id == undefined) {
                            return 1;
                        } else if (b.id == null || b.id == undefined) {
                            return -1;
                        }
                    } else {
                        if (a.is_button == true) {
                            return -1;
                        } else if (b.is_button == true) {
                            return 1;
                        }
                    }
                    return b.sort_index - a.sort_index;
                }

                let tbla = TableItemPotato.Item(a.id);
                let tblb = TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (tbla.quality == tblb.quality) {
                        if (tbla.type == tblb.type) {
                            if (a.level == b.leve) {
                                return b.id - a.id;
                            } else {
                                return b.level - a.leve;
                            }
                        } else {
                            return tblb.type - tbla.type;
                        }
                    } else {
                        return tblb.quality - tbla.quality;
                    }
                } else {
                    return b.star - a.star;
                }
            };

            result.sort(sortAscend);

            return result;
        }







        ///////////////////////////////////////////////////////////////////////////
        // 私有变量
        private mapCards: { [index: number]: message.PotatoInfo } = {}; // 卡片（宝物）列表
        private mapGoods: { [id: number]: message.GoodsInfo } = {};   // 物品列表
        private mapCardToHunter: { [index: number]: { "cStatus": number, "cHostId": number } } = {}; // 卡片所属武将
        private potatoHistoryIds: Array<number> = [];  // 卡片图鉴
        private breakPotatoSel: Array<number> = []; // 卡片突破保存材料

        private isCardChange: boolean = false;

        // 新卡片标识“新”
        public newCardExceptEquip = {
            sysCardTime: 0,           // 同步协议次数
            maxPocketIndex: 0,        // 背包中最大index
        };

        public get goodsMap() {
            return this.mapGoods;
        }

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_POTATOS_INFO_CHANGE, this.onPotatosInfoChage, this);
            Game.EventManager.on(GameEvent.PLAYER_GOODS_INFO_CHANGE, this.onGoodsInfoChange, this);
            Game.EventManager.on(GameEvent.PLAYER_POTATO_HISTORY_IDS_CHANGE, this.onPotatoHistoryIdsChange, this);
        }

        public uninit() {
            this.mapCards = {};
            this.mapGoods = {};
            this.mapCardToHunter = {};
            this.potatoHistoryIds = [];
            this.breakPotatoSel = [];

            this.newCardExceptEquip = {
                sysCardTime: 0,           // 同步协议次数
                maxPocketIndex: 0,        // 背包中最大index
            }
        }

        public getIsCardChange() {
            return this.isCardChange;
        }

        public setIsCardChange(change: boolean) {
            this.isCardChange = change;
        }

        private onPotatosInfoChage(ev: egret.Event) {
            let potatos = <Array<message.PotatoInfo>>ev.data;

            for (let i = 0; i < potatos.length; i++) {
                this.mapCards[potatos[i].index] = potatos[i];
            }

            this.isCardChange = true;

            if (this.newCardExceptEquip.sysCardTime == 0) {
                this.newCardExceptEquip.sysCardTime = this.newCardExceptEquip.sysCardTime + 1;
                for (let v of potatos) {
                    if (v.index > this.newCardExceptEquip.maxPocketIndex) {
                        this.newCardExceptEquip.maxPocketIndex = v.index;
                    }
                }
            }
        }

        private onPotatoHistoryIdsChange(ev: egret.Event) {
            this.potatoHistoryIds = <Array<number>>ev.data;
        }

        private onGoodsInfoChange(ev: PlayerGoodsInfoChangeEvent) {
            let tableItemBase = TableItemBase.Table();
            for (let k in tableItemBase) {
                let itemBase = tableItemBase[k];
                let table = this.getTableByTableName(itemBase.table_name);
                for (let kk in table) {
                    let tableItem = table[kk];
                    if (!this.mapGoods.hasOwnProperty(tableItem.id)) {
                        let goods = new message.GoodsInfo();
                        goods.goodsId = tableItem.id;
                        goods.count = 0;
                        this.mapGoods[tableItem.id] = goods;
                    }
                }
            }

            for (let i = 0; i < ev.goodsInfo.length; i++) {
                this.mapGoods[ev.goodsInfo[i].goodsId] = ev.goodsInfo[i];
            }
            for (let i = 0; i < ev.delGoods.length; i++) {
                let goods = this.mapGoods[ev.delGoods[i]];
                if (goods) goods.count = 0;
                // for (let k in this.mapGoods) {
                //     if (ev.delGoods[i] == this.mapGoods[k].goodsId) {
                //         this.mapGoods[k].count = 0;
                //         break;
                //     }
                // }
            }
        }

        public deleteCardByIndex(index: number) {
            for (let k in this.mapCards) {
                if (this.mapCards[k].index == index) {
                    delete this.mapCards[k];
                    break;
                }
            }
        }

        public getPotatoInfo(id: number) {
            return this.mapCards[id];
        }

        // 获取所有卡片（宝物）列表
        public getAllPotatos(): Array<message.PotatoInfo> {
            let potatoInfo: Array<message.PotatoInfo> = [];
            for (let k in this.mapCards) {
                potatoInfo.push(this.mapCards[k]);
            }

            return potatoInfo;
        }

        public getHunterCardMap(generalId: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let cardMap: { [k: number]: message.PotatoInfo } = {};
            for (let i = 0; i < hunterInfo.potatoInfo.length; i++) {
                let v = hunterInfo.potatoInfo[i];
                if (v) cardMap[v.pos] = v;
            }
            return cardMap;
        }

        // 获取所有卡片图鉴
        public getAllPotatoHistoryIds() {
            return this.potatoHistoryIds;
        }

        // 获取所有物品
        public getGoodsById(id: number): message.GoodsInfo {
            let good: message.GoodsInfo = null;
            for (let k in this.mapGoods) {
                if (this.mapGoods[k].goodsId == id) {
                    good = this.mapGoods[k];
                    break;
                }
            }
            return good;
        }

        // 为猎人身上的卡片添加字段
        public setCardToHunterInfo() {
            let allHunters = Game.PlayerHunterSystem.queryAllHunters();
            this.mapCardToHunter = {};
            for (let k in allHunters) {
                let hunter = allHunters[k];
                for (let kk in hunter.potatoInfo) {
                    let vv = hunter.potatoInfo[kk];
                    this.mapCardToHunter[vv.index] = {
                        "cStatus": TableEnum.Enum.PotatoStatus.host,
                        "cHostId": hunter.general_id
                    };
                }
            }
        }

        /** 获取卡片绑定的猎人信息通过卡片index */
        public getCardToHunterInfo(index: number) {
            let data: { "cStatus": number, "cHostId": number } = { "cStatus": null, "cHostId": null };
            for (let k in this.mapCardToHunter) {
                if (Number(k) == index) {
                    data = this.mapCardToHunter[k];
                    break;
                }
            }

            return data;
        }

        public attriInstance(id: number) {
            if (ckid(id)) return null;
            return TablePotatoAttri.Item(id);
        }

        public getTableByTableName(name) {
            let table;
            if (name == "table_item_general")
                table = TableItemGeneral.Table();
            if (name == "table_item_resource")
                table = TableItemResource.Table();
            if (name == "table_item_prop")
                table = TableItemProp.Table();
            if (name == "table_item_general_soul")
                table = TableItemGeneralSoul.Table();
            if (name == "table_item_partner")
                table = TableItemPartner.Table();
            if (name == "table_item_partner_split")
                table = TableItemPartnerSplit.Table();
            if (name == "table_item_equip_forge")
                table = TableItemEquipForge.Table();
            if (name == "table_item_equip_carve")
                table = TableItemEquipCarve.Table();
            if (name == "table_item_potato")
                table = TableItemPotato.Table();
            if (name == "table_item_collect")
                table = TableItemCollect.Table();
            if (name == "table_item_jade")
                table = TableItemJade.Table();
            if (name == "table_item_cimelia")
                table = TableItemCimelia.Table();
            if (name == "table_item_pic")
                table = TableItemPic.Table();
            if (name == "table_item_pic_frame")
                table = TableItemPicFrame.Table();
            if (name == "table_item_title")
                table = TableItemTitle.Table();
            if (name == "table_item_secret")
                table = TableItemSecret.Table();
            if (name == "table_item_fashion")
                table = TableItemFashion.Table();
            if (name == "table_item_transfer")
                table = TableItemTransfer.Table();
            if (name == "table_item_client")
                table = TableItemClient.Table();

            return table;
        }

        public initBreakPotatoSel() {
            this.breakPotatoSel = [];
        }

        public getBreakPotatoSel() {
            return this.breakPotatoSel;
        }

        public setBreakPotatoSel(breakPotatoIndex: number) {
            this.breakPotatoSel.push(breakPotatoIndex);
        }

        // 卡片（宝物）合成
        public cardCompose(itemId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoComposeRequest();
                request.body.itemId = itemId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoComposeResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    let gameInfo = response.body.gameInfo;
                    resolve(gameInfo.potatos);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 卡包 开卡
        public cardBagOpen(bagId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CardBagOpenRequest();
                request.body.bag_id = bagId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CardBagOpenResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    let gameInfo = response.body.gameInfo;
                    resolve(gameInfo.potatos);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 卡片出售
        public cardSell(index: Array<number>) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoSoldRequest();
                request.body.index = index;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoSoldResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    PlayerCardSystem.DelCardByIndexTable(index);

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public potatoLock(index, generalId, potatoPos, lock) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoLockRequest();
                request.body.index = index;
                request.body.generalId = generalId;
                request.body.potatoPos = potatoPos;
                request.body.is_lock = lock;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoLockResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 卡片突破
        public potatoBreak(index, generalId, potatoPos, otherIndex) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoBreakthroughRequest();
                request.body.index = index;
                request.body.generalId = generalId;
                request.body.potatoPos = potatoPos;
                request.body.otherIndex = otherIndex;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoBreakthroughResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    for (let i = 0; i < otherIndex.length; i++) {
                        if (otherIndex[i] != -1 && otherIndex[i] != 0) {
                            this.deleteCardByIndex(otherIndex[i]);
                        }
                    }
                    this.initBreakPotatoSel();

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        //卡片强化
        public potatoUplevel(index: number, upLevel: number, potatoPos: number) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoUplevelRequest();
                request.body.index = index;
                request.body.upLevel = upLevel;
                request.body.potatoPos = potatoPos;

                let hostInfo = Game.PlayerCardSystem.getCardToHunterInfo(index);
                let cHostId = hostInfo.cHostId;

                if (cHostId != null && potatoPos != 0) {
                    request.body.generalId = cHostId;
                    request.body.index = 0;
                }
                else {
                    request.body.generalId = 0;
                }

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoUplevelResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        //卡片升星
        public potatoAddStar(cardInfo: message.PotatoInfo, met_tbl) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoBreakRequest();
                request.body.index = cardInfo.index;

                let hostInfo = Game.PlayerCardSystem.getCardToHunterInfo(cardInfo.index);
                let cHostId = hostInfo.cHostId;

                if (cHostId != null && cardInfo.pos != 0) {
                    request.body.generalId = cHostId;
                    request.body.index = 0;
                }
                else {
                    request.body.generalId = 0;
                }

                request.body.potatoPos = cardInfo.pos;
                request.body.otherIndex = met_tbl;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoBreakResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    let gameInfo = response.body.gameInfo;
                    resolve({ gameInfo });
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 注入念力
         * @param info 卡片信息
         * @param _sel 
         * @param _selGoodsIndex
         */
        public PotatoGrowthReqReq(info: message.PotatoInfo, _sel: number, _selGoodsIndex: number) {
            return new Promise((resolve, reject) => {
                let request = new message.PotatoGrowthRequest();
                request.body.index = info.index;

                let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
                if (cHostId != null) {
                    request.body.generalId = cHostId;
                }
                else {
                    request.body.generalId = 0;
                }

                request.body.potatoPos = info.pos;
                request.body.attriId = _sel;
                request.body.range = _selGoodsIndex;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.PotatoGrowthResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

        //根据等级获取开启的卡片
        public cardOpenNum(generaId, level) {
            let num = 0;
            let cards = PlayerHunterSystem.Table(generaId).card_level;
            for (let i = 0; i < cards.length; i++) {
                if (level >= cards[i]) {
                    num = num + 1;
                }
            }
            return num;
        }

        public getCardNumber() {
            let count = 0;
            for (let kk in this.mapCards) {
                let vv = this.mapCards[kk];
                count = count + 1;
            }
            return count;
        }
    }
}