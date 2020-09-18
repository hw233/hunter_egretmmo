var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 玩家卡片（宝物）系统
    // guoshanhe 创建于2018.11.13
    var PlayerCardSystem = (function () {
        function PlayerCardSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.mapCards = {}; // 卡片（宝物）列表
            this.mapGoods = {}; // 物品列表
            this.mapCardToHunter = {}; // 卡片所属武将
            this.potatoHistoryIds = []; // 卡片图鉴
            this.breakPotatoSel = []; // 卡片突破保存材料
            this.isCardChange = false;
            // 新卡片标识“新”
            this.newCardExceptEquip = {
                sysCardTime: 0,
                maxPocketIndex: 0,
            };
        }
        // 刷新最新获得卡片index
        PlayerCardSystem.RefreshNewCardIndex = function () {
            for (var _i = 0, _a = zj.Game.PlayerCardSystem.getAllPotatos(); _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                    zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = v.index;
                }
            }
        };
        PlayerCardSystem.GetAllCardNoHostSortByType = function () {
            var result = zj.Game.PlayerCardSystem.getAllPotatos();
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
                var aNew = a.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                var bNew = b.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardNoHostSortByStar = function () {
            var result = zj.Game.PlayerCardSystem.getAllPotatos();
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
                var aNew = a.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                var bNew = b.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardNoHostSortByLevel = function () {
            var result = zj.Game.PlayerCardSystem.getAllPotatos();
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (a == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
                var aNew = a.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
                var bNew = b.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex ? 1 : 0;
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardHasHostSortByType = function () {
            var result = [];
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                var curPotatos = allHunters[k].potatoInfo;
                for (var kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardHasHostSortByStar = function () {
            var result = [];
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                var curPotatos = allHunters[k].potatoInfo;
                for (var kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardHasHostSortByLevel = function () {
            var result = [];
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                var curPotatos = allHunters[k].potatoInfo;
                for (var kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetAllCardHasHostSortByHost = function () {
            var result = [];
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in allHunters) {
                if (allHunters[k] == null)
                    continue;
                var curPotatos = allHunters[k].potatoInfo;
                for (var kk in curPotatos) {
                    result.push(curPotatos[kk]);
                }
            }
            result.sort(function (a, b) {
                if (a == null || a.id == null)
                    return 0;
                else if (b == null || b.id == null)
                    return 1;
                var cHostIdA = zj.Game.PlayerCardSystem.getCardToHunterInfo(a.index).cHostId;
                var cHostIdB = zj.Game.PlayerCardSystem.getCardToHunterInfo(b.index).cHostId;
                var aInfo = zj.Game.PlayerHunterSystem.queryHunter(cHostIdA);
                var bInfo = zj.Game.PlayerHunterSystem.queryHunter(cHostIdB);
                if (aInfo.level == bInfo.level) {
                    if (aInfo.star == bInfo.star) {
                        if (aInfo.awakePassive.level == bInfo.awakePassive.level) {
                            if (zj.PlayerHunterSystem.Table(cHostIdA).aptitude == zj.PlayerHunterSystem.Table(cHostIdB).aptitude) {
                                if (cHostIdA == cHostIdB)
                                    return a.pos - b.pos;
                                else
                                    return cHostIdA - cHostIdB;
                            }
                            else {
                                return zj.PlayerHunterSystem.Table(cHostIdB).aptitude - zj.PlayerHunterSystem.Table(cHostIdA).aptitude;
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
                for (var i = result.length; i < 16; i++) {
                    result.push(null);
                }
            }
            return result;
        };
        PlayerCardSystem.GetCardMapById = function () {
            var map = {};
            var generals = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var kk in generals) {
                var vv = generals[kk];
                for (var pk in vv.potatoInfo) {
                    var pv = vv.potatoInfo[pk];
                    map[pv.id] = true;
                }
            }
            var potatos = zj.Game.PlayerCardSystem.getAllPotatos();
            for (var kk in potatos) {
                var vv = potatos[kk];
                if (vv == null)
                    continue;
                map[vv.id] = true;
            }
            return map;
        };
        PlayerCardSystem.GetAllCardByTypeForPokedex = function () {
            var ret = [];
            var sumNum = 0;
            var getNum = 0;
            var cardMap = PlayerCardSystem.GetCardMapById();
            for (var i = 0; i < 6; i++) {
                ret[i] = [];
            }
            ;
            var cardList = zj.TableItemPotato.Table();
            for (var k in cardList) {
                sumNum++;
                var card = cardList[k];
                var isGet = cardMap[card.id] || false;
                if (isGet)
                    getNum = getNum + 1;
                if (ret != null) {
                    ret[card.type - 1].push(card);
                }
            }
            for (var kk in ret) {
                ret[kk].sort(function (a, b) {
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
            var tmp = ret[1];
            ret[1] = ret[2];
            ret[2] = tmp;
            return [ret, sumNum, getNum];
        };
        PlayerCardSystem.GetAllCardByQualityForPokedex = function () {
            var ret = [];
            var sumNum = 0;
            var getNum = 0;
            var cardMap = PlayerCardSystem.GetCardMapById();
            for (var i = 0; i < 5; i++) {
                ret[i] = [];
            }
            ;
            var cardList = zj.TableItemPotato.Table();
            for (var k in cardList) {
                sumNum++;
                var card = cardList[k];
                var isGet = cardMap[card.id] || false;
                if (isGet)
                    getNum = getNum + 1;
                if (ret != null)
                    ret[6 - card.quality].push(card);
            }
            for (var kk in ret) {
                ret[kk].sort(function (a, b) {
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
        };
        /**
         return [smallPath, bigPath, outPath]
         */
        PlayerCardSystem.GetItemFrame = function (potatoId, potatoInfo) {
            var potatoTbl = zj.TableItemPotato.Item(potatoId);
            var smallPath = zj.UIConfig.UIConfig_Role.itemFrame[potatoTbl.quality];
            var bigPath = zj.UIConfig.UIConfig_Role.cardFrame[potatoTbl.quality];
            var outPath = zj.UIConfig.UIConfig_Role.cardFrameOut[potatoTbl.quality];
            if (potatoTbl.rare_card != 0) {
                smallPath = zj.UIConfig.UIConfig_Role.item_rareCardFrame[potatoTbl.rare_card];
                bigPath = zj.UIConfig.UIConfig_Role.cardRareFrame[potatoTbl.rare_card];
                outPath = zj.UIConfig.UIConfig_Role.cardRareFrameOut[potatoTbl.rare_card];
            }
            if (potatoInfo != null) {
                var tbl_1 = [];
                for (var i = 0; i < potatoInfo.add_attri.length; i++) {
                    var vv = potatoInfo.add_attri[i];
                    var attriInfo = zj.TablePotatoAttri.Item(vv.attriId);
                    var growthScore = null;
                    if (vv.growthValue > attriInfo.range_growth[0][1]) {
                        growthScore = attriInfo.growth_score[1];
                    }
                    else {
                        growthScore = attriInfo.growth_score[0];
                    }
                    tbl_1.push(growthScore);
                }
                var score = zj.Table.Add(0, potatoInfo.add_attri.length, function (id) {
                    return tbl_1[id];
                });
                var isOpen = zj.Table.FindF(potatoInfo.add_attri, function (_, v) {
                    return v.growthValue != 0;
                });
                if (score >= zj.CommonConfig.card_growth_score && isOpen) {
                    if (potatoTbl.rare_card != 0) {
                        smallPath = zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[5];
                        bigPath = zj.UIConfig.UIConfig_Role.cardRareFrame[1];
                        outPath = zj.UIConfig.UIConfig_Role.cardRareFrameOut[1];
                    }
                    else {
                        smallPath = zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[5];
                        bigPath = zj.UIConfig.UIConfig_Role.cardFrame[6];
                        outPath = zj.UIConfig.UIConfig_Role.cardFrameOut[6];
                    }
                }
            }
            return [smallPath, bigPath, outPath];
        };
        PlayerCardSystem.GetAllCardBag = function () {
            var ret = [];
            var listCardId = zj.PlayerItemSystem.GetCardBag();
            for (var k in listCardId) {
                var v = listCardId[k];
                if (zj.Game.PlayerCardSystem.mapGoods[v] && zj.Game.PlayerCardSystem.mapGoods[v].count != 0) {
                    var goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = zj.Game.PlayerCardSystem.mapGoods[v].count;
                    goods.index = 0;
                    goods.showType = 0;
                    ret.push(goods);
                }
            }
            return ret;
        };
        // 附加属性
        PlayerCardSystem.GetExtraAttriTbl = function (potato) {
            var generalValue = zj.Helper.CreateGeneralAttrTbl();
            var generalPercent = zj.Helper.CreateGeneralAttrTbl();
            var potatoValue = zj.Helper.CreateGeneralAttrTbl();
            var potatoPercent = zj.Helper.CreateGeneralAttrTbl();
            var talentSet = [];
            for (var i = 0; i < potato.add_attri.length; i++) {
                var extraInfo = potato.add_attri[i];
                var attriTbl = zj.TablePotatoAttri.Item(extraInfo.attriId);
                if (attriTbl != null) {
                    if (attriTbl.object_type == String(message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE)) {
                        generalValue[attriTbl.attri_type - 1] = generalValue[attriTbl.attri_type - 1] + extraInfo.attriValue + potato.add_attri[i].growthValue;
                    }
                    else if (attriTbl.object_type == String(message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE)) {
                        generalPercent[attriTbl.attri_type - 1] = generalPercent[attriTbl.attri_type - 1] + extraInfo.attriValue + potato.add_attri[i].growthValue;
                    }
                    else {
                        var info = {
                            "type": attriTbl.attri_type,
                            "growthValue": extraInfo.growthValue
                        };
                        talentSet.push(info);
                    }
                }
            }
            return [generalValue, generalPercent, potatoValue, potatoPercent, talentSet];
        };
        PlayerCardSystem.GetBaseAttri = function (id, star, level) {
            if (star === void 0) { star = 0; }
            if (level === void 0) { level = 0; }
            var tbl = null;
            if (typeof id === "string" || typeof id === "number") {
                tbl = zj.TableItemPotato.Item(id);
            }
            var result = zj.Helper.CreateGeneralAttrTbl();
            var percent = zj.Helper.CreateGeneralAttrTbl();
            if (tbl == null)
                return [result, percent];
            var baseAttri = tbl.attri_value;
            var starAttri = 0;
            for (var i = 0; i < star; i++) {
                starAttri += (tbl.attri_star[i] ? tbl.attri_star[i] : 0);
            }
            var levelAttri = 0;
            for (var i = 0; i < level; i++) {
                levelAttri += (tbl.attri_level[i] ? tbl.attri_level[i] : 0);
            }
            // 保留小数点后两位
            var levelAttri1 = String(levelAttri);
            var pointNum = levelAttri1.indexOf(".");
            if (pointNum != -1) {
                levelAttri = Number(levelAttri1.substr(0, pointNum + 3));
            }
            var index = tbl.attri_type - 1;
            var totalValue = baseAttri + starAttri + levelAttri;
            if (tbl.add_type == 1) {
                result[index] = totalValue;
            }
            else {
                percent[index] = totalValue;
                var str = totalValue.toString();
                var pos = str.indexOf(".") + 3; // 获取小数点的位置
                var count = str.length - pos; // 获取小数点后的个数
                if (count > 0 && pos != 0) {
                    percent[index] = Number(totalValue.toFixed(1));
                }
            }
            return [result, percent];
        };
        PlayerCardSystem.GetCardBaseAttri = function (id, star, level) {
            var _a = PlayerCardSystem.GetBaseAttri(id, star, level), attriTbl = _a[0], percentTbl = _a[1];
            var result = [];
            var resultNum = [];
            for (var i = 0; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (attriTbl[i] != 0) {
                    var a = attriTbl[i].toString();
                    if (Object.keys(a).length > 10) {
                        a = attriTbl[i].toFixed(1);
                    }
                    result.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.Attri[i], a));
                    resultNum.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.AttriNum[i], attriTbl[i]));
                }
                else if (percentTbl[i] != 0) {
                    var a = percentTbl[i].toString();
                    if (Object.keys(a).length > 10) {
                        a = percentTbl[i].toFixed(1);
                    }
                    result.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.Attri[i], a) + "%");
                    resultNum.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.AttriNum[i], percentTbl[i]) + "%");
                }
            }
            return [result, resultNum];
        };
        PlayerCardSystem.TableFindk = function (t, v) {
            for (var i in t) {
                if (t[i] == v) {
                    return i;
                }
            }
            return -1;
        };
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
        PlayerCardSystem.GetAttriStr = function (addInfo, rangAdd, _type) {
            var perAttr = [
                message.AttriType.ATTRI_TYPE_SKILL_ATK,
                message.AttriType.ATTRI_TYPE_SKILL_DEF,
                message.AttriType.ATTRI_TYPE_ATK_CRIT,
                message.AttriType.ATTRI_TYPE_CRIT_EXTRA,
                message.AttriType.ATTRI_TYPE_CRIT_RESISTANCE,
                message.AttriType.ATTRI_TYPE_DODGE_RATE,
                message.AttriType.ATTRI_TYPE_HIT_RATE,
                message.AttriType.ATTRI_TYPE_IGNORE_PHYDEF // 12 忽视物防
            ];
            var result = "";
            var valueStr = null;
            var attriTbl = zj.Game.PlayerCardSystem.attriInstance(addInfo.attriId);
            if (rangAdd != 0 && rangAdd != null) {
                if (_type == 1) {
                    if (Number(attriTbl.object_type) != message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE && (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && zj.Table.FindK(perAttr, attriTbl.attri_type) == -1)) {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_pur, Math.floor(addInfo.attriValue), rangAdd);
                    }
                    else {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_pur_per, Math.floor(addInfo.attriValue), rangAdd);
                    }
                }
                else {
                    if (Number(attriTbl.object_type) != message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE && (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && zj.Table.FindK(perAttr, attriTbl.attri_type) == -1)) {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_org, Math.floor(addInfo.attriValue), rangAdd);
                    }
                    else {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_org_per, Math.floor(addInfo.attriValue), rangAdd);
                    }
                }
            }
            else {
                valueStr = Math.floor(addInfo.attriValue);
            }
            if (addInfo.attriValue == 0)
                valueStr = "???";
            if (rangAdd == 0 || rangAdd == null) {
                if (attriTbl.object_type == "") {
                    result = zj.PlayerTalentSystem.Des_Card(attriTbl.attri_type, 1, rangAdd, _type)[0];
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_UNIL_RESIS) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.attri_unil_resis, valueStr);
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_IGNORE_RESIS) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.attri_ignore_resis, valueStr);
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE) {
                    if (zj.Table.FindK(perAttr, attriTbl.attri_type) == -1) {
                        result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], valueStr, zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                    else {
                        result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri_per, valueStr, zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri[Number(attriTbl.object_type) - 1], zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1], valueStr);
                }
                // else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_POTATO_VALUE) {}
            }
            else {
                if (attriTbl.object_type == "") {
                    result = zj.PlayerTalentSystem.Des_Card(attriTbl.attri_type, 1, rangAdd, _type)[0];
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_UNIL_RESIS) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.attri_unil_resis_color, valueStr);
                }
                else if (attriTbl.attri_type == message.AttriType.ATTRI_TYPE_IGNORE_RESIS) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.attri_ignore_resis_color, valueStr);
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE) {
                    if (zj.Table.FindK(perAttr, attriTbl.attri_type) == -1) {
                        result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri_color[Number(attriTbl.object_type) - 1], valueStr, zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                    else {
                        result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri_per_color, valueStr, zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1]);
                    }
                }
                else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_PRE) {
                    result = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.potato_attri_color[Number(attriTbl.object_type) - 1], zj.TextsConfig.TextsConfig_Potato.AttriStr[attriTbl.attri_type - 1], valueStr);
                }
                // else if (Number(attriTbl.object_type) == message.EPotatoAttriType.ATTRI_TYPE_POTATO_VALUE) {}
            }
            return result;
        };
        /**
         * 获取宝物附加属性描述
         *
         * @returns Array, each element is a tuple, the first element is description, the second is quality
         */
        PlayerCardSystem.GetAddStr = function (info, rangAdd, _type) {
            var result = [];
            for (var i = 0; i < info.add_attri.length; i++) {
                var vv = info.add_attri[i];
                var str = PlayerCardSystem.GetAttriStr(vv, rangAdd, _type);
                var attriTbl = zj.TablePotatoAttri.Item(vv.attriId);
                result.push([str, attriTbl.quality]);
            }
            if (info.star < 6) {
                result.push([zj.TextsConfig.TextsConfig_Potato.sixAttri, 1]);
            }
            return result;
        };
        PlayerCardSystem.GetAddStrNotGet = function (tbl, range) {
            var ret = [];
            var potatoTbl = tbl;
            var min = potatoTbl.add_count[0];
            var max = potatoTbl.add_count[1];
            if (min == max)
                ret.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.unidTipes, min));
            else
                ret.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.unidTipes, min + "~" + max));
            var appraise_add = tbl.appraise_add;
            if (appraise_add.length > 0 && appraise_add[0] != 0) {
                ret.push(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.unidAttriTips, appraise_add.length));
                for (var kk in appraise_add) {
                    var vv = appraise_add[kk];
                    var tmp = new message.PotatoAttriItem();
                    tmp.attriId = vv;
                    tmp.attriValue = 0;
                    // let tmp = {
                    //     attriId: vv,
                    //     attriValue: 0
                    // };
                    var str = PlayerCardSystem.GetAttriStr(tmp, range, null);
                    ret.push(str);
                }
            }
            return ret;
        };
        PlayerCardSystem.GetAllSellCardIndexByStar = function (sellStarType) {
            var ret = [];
            var money = 0;
            for (var k in zj.Game.PlayerCardSystem.getAllPotatos()) {
                var v = zj.Game.PlayerCardSystem.getAllPotatos()[k];
                if (v == null)
                    continue;
                if (sellStarType[v.star - 1] && !v.is_lock) {
                    var price = zj.TableItemPotato.Item(v.id).price;
                    for (var i = 0; i < v.level - 1; i++) {
                        price = price + zj.CommonConfig.potato_uplevel_comsume_money(zj.TableItemPotato.Item(v.id).quality, i) / 2;
                    }
                    money = money + price;
                    ret.push(v.index);
                }
            }
            ret.push(money);
            return ret;
        };
        PlayerCardSystem.DelCardByIndexTable = function (indexs) {
            for (var k in indexs) {
                zj.Game.PlayerCardSystem.deleteCardByIndex(indexs[k]);
            }
            for (var _i = 0, _a = zj.Game.PlayerHunterSystem.queryAllHunters(); _i < _a.length; _i++) {
                var v = _a[_i];
                zj.Tips.SetTipsOfHero(v.general_id);
            }
            zj.Tips.SetTipsOfAllHero();
        };
        PlayerCardSystem.RefreshCard = function (info) {
            var ret = null;
            var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
            if (cHostId != null && info.pos != 0) {
                var gen = zj.Game.PlayerHunterSystem.queryHunter(cHostId);
                for (var k in gen.potatoInfo) {
                    var v = gen.potatoInfo[k];
                    if (v.pos == info.pos) {
                        ret = v;
                        break;
                    }
                }
            }
            else {
                for (var k in zj.Game.PlayerCardSystem.getAllPotatos()) {
                    var v = zj.Game.PlayerCardSystem.getAllPotatos()[k];
                    if (v.index == info.index) {
                        ret = v;
                        break;
                    }
                }
            }
            return ret;
        };
        PlayerCardSystem.GetComposeTbl = function () {
            var potaotTbl = zj.TableItemPotato.Table();
            var composeTbl = [];
            for (var _i = 0, _a = zj.TableEnum.Enum.PropCardPiece; _i < _a.length; _i++) {
                var v = _a[_i];
                var pieceTbl = zj.PlayerItemSystem.ItemConfig(v);
                var tbl = {
                    product_id: pieceTbl.compose_cards[1],
                    need_ids: [v],
                    need_counts: [Number(pieceTbl.compose_counts)],
                    have_counts: [],
                    counts_per: [],
                    can_compose: 1,
                    randomCard: pieceTbl.compose_cards[0],
                    isSel: false
                };
                for (var kk in tbl.need_ids) {
                    var have_count = zj.PlayerItemSystem.Count(tbl.need_ids[kk]);
                    var per = have_count / tbl.need_counts[kk] >= 1 ? 1 : have_count / tbl.need_counts[kk];
                    tbl.have_counts.push(have_count);
                    tbl.counts_per.push(per);
                    if (tbl.can_compose && tbl.need_counts[kk] != null && have_count < tbl.need_counts[kk])
                        tbl.can_compose = 0;
                }
                composeTbl.push(tbl);
            }
            composeTbl.sort(function (a, b) {
                if (a.can_compose == b.can_compose)
                    if (a.randomCard == b.randomCard)
                        return a.product_id - b.product_id;
                    else
                        return a.randomCard - b.randomCard;
                else
                    return b.can_compose - a.can_compose;
            });
            return composeTbl;
        };
        // 获取所有卡片（包括武将身上）
        PlayerCardSystem.GetAllCard = function (info) {
            var all_card = [];
            var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
            if (cHostId != null && info.pos != 0) {
                var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(cHostId);
                if (generalInfo != null) {
                    var potatoInfos = generalInfo.potatoInfo;
                    for (var k in potatoInfos) {
                        var v = potatoInfos[k];
                        if (v.index == info.index && v.pos == info.pos)
                            all_card.push(v);
                    }
                }
            }
            var allPotatos = zj.Game.PlayerCardSystem.getAllPotatos();
            for (var k in allPotatos) {
                all_card.push(allPotatos[k]);
            }
            all_card.sort(function (a, b) {
                if (a == null)
                    return Number(false);
                else if (b == null)
                    return Number(true);
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
        };
        // 获取一定等级同名卡片（包含已装备） 参数：卡片信息，卡片id,卡片索引，卡片等级
        PlayerCardSystem.GetAllCardByName = function (info, potatoId, index, level) {
            var all_card = this.GetAllCard(info);
            var all_card_name = [];
            var all_card_sort = [];
            var allGenerals = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var k in allGenerals) {
                var potatoInfos = allGenerals[k].potatoInfo;
                for (var kk in potatoInfos) {
                    all_card.push(potatoInfos[kk]);
                }
            }
            for (var _i = 0, all_card_1 = all_card; _i < all_card_1.length; _i++) {
                var v = all_card_1[_i];
                if (v.id == potatoId && v.level >= level && v.index != index)
                    all_card_sort.push(v);
            }
            var list = [[], [], []];
            for (var _a = 0, all_card_sort_1 = all_card_sort; _a < all_card_sort_1.length; _a++) {
                var vv = all_card_sort_1[_a];
                if (vv.pos != 0)
                    list[1].push(vv);
                else if (vv.is_lock)
                    list[2].push(vv);
                else
                    list[0].push(vv);
            }
            list[0].sort(function (a, b) {
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
            list[1].sort(function (a, b) {
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
            list[2].sort(function (a, b) {
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
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
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var v = list_1[_b];
                for (var _c = 0, v_1 = v; _c < v_1.length; _c++) {
                    var vv = v_1[_c];
                    all_card_name.push(vv);
                }
            }
            return all_card_name;
        };
        /** 获取未装备的卡片 */
        PlayerCardSystem.GetHaveCardByType = function (type) {
            var allPotatos = zj.Game.PlayerCardSystem.getAllPotatos();
            for (var i = 0; i < allPotatos.length; i++) {
                var v = allPotatos[i];
                var potatoInfo = zj.TableItemPotato.Item(v.id);
                if (potatoInfo.type == type) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 获取未装备的卡片类型，属性
         *
         * @param type The card's type(1-6).
         * @param mainAttr Array, contain 1 element, main screen attribute id
         * @param addAttr Array, contain 3 elements, additon screen attribute id
         *
         * @returns Tuple
         */
        PlayerCardSystem.GetCardByTypeAndAttr = function (type, mainAttr, addAttr) {
            var result = [];
            for (var i = 0; i < 16; i++) {
                result.push({ "sort_index": i });
            }
            var mainIncludes = {};
            var addIncludes = {};
            var screenTbl = zj.TableClientPotatoScreen.Table();
            // main
            if (mainAttr[0] != 0) {
                for (var i = 0; i < mainAttr.length; i++) {
                    var v = mainAttr[i];
                    var includeIds = screenTbl[v].includeIds;
                    mainIncludes[i] = includeIds;
                }
            }
            // add
            for (var j = 0; j < addAttr.length; j++) {
                var v = addAttr[j];
                if (v != 0) {
                    var includeIds = screenTbl[v].includeIds;
                    addIncludes[j] = includeIds;
                }
            }
            var screenAttr = function (potatoInfo) {
                if (mainAttr.length > 0 && zj.Table.VIn(mainAttr, 0) == false) {
                    var mainConfirm = false;
                    for (var k in mainIncludes) {
                        if (mainIncludes.hasOwnProperty(k)) {
                            var v = mainIncludes[k];
                            if (zj.Table.VIn(v, potatoInfo.id)) {
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
                    var potatoAttriIds = zj.Table.Init(potatoInfo.add_attri.length, function (i) {
                        return potatoInfo.add_attri[i].attriId;
                    });
                    for (var k in addIncludes) {
                        if (addIncludes.hasOwnProperty(k)) {
                            var v = addIncludes[k];
                            var addConfirm = false;
                            for (var i = 0; i < potatoAttriIds.length; i++) {
                                var vv = potatoAttriIds[i];
                                if (zj.Table.VIn(v, vv)) {
                                    addConfirm = true;
                                    break;
                                }
                            }
                            if (addConfirm == false)
                                return false;
                        }
                    }
                }
                return true;
            };
            var count = 0;
            var allPotatoInfo = zj.Game.PlayerCardSystem.getAllPotatos();
            for (var i = 0; i < allPotatoInfo.length; i++) {
                var v = allPotatoInfo[i];
                var info = zj.TableItemPotato.Item(v.id);
                if (info.type == type && screenAttr(v) == true) {
                    if (result[count] == null) {
                        result.push(v);
                    }
                    else {
                        result[count] = v;
                    }
                    count += 1;
                }
            }
            result.push({ "is_button": true });
            var sortAscend = function (a, b) {
                if (a.id == null || a.id == undefined || b.id == null || b.id == undefined) {
                    if (a.id != b.id) {
                        if (a.id == null || a.id == undefined) {
                            return 1;
                        }
                        else if (b.id == null || b.id == undefined) {
                            return -1;
                        }
                    }
                    else {
                        if (a.is_button == true) {
                            return -1;
                        }
                        else if (b.is_button == true) {
                            return 1;
                        }
                    }
                    return b.sort_index - a.sort_index;
                }
                var tbla = zj.TableItemPotato.Item(a.id);
                var tblb = zj.TableItemPotato.Item(b.id);
                if (a.star == b.star) {
                    if (tbla.quality == tblb.quality) {
                        if (tbla.type == tblb.type) {
                            if (a.level == b.leve) {
                                return b.id - a.id;
                            }
                            else {
                                return b.level - a.leve;
                            }
                        }
                        else {
                            return tblb.type - tbla.type;
                        }
                    }
                    else {
                        return tblb.quality - tbla.quality;
                    }
                }
                else {
                    return b.star - a.star;
                }
            };
            result.sort(sortAscend);
            return result;
        };
        Object.defineProperty(PlayerCardSystem.prototype, "goodsMap", {
            get: function () {
                return this.mapGoods;
            },
            enumerable: true,
            configurable: true
        });
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerCardSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POTATOS_INFO_CHANGE, this.onPotatosInfoChage, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GOODS_INFO_CHANGE, this.onGoodsInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POTATO_HISTORY_IDS_CHANGE, this.onPotatoHistoryIdsChange, this);
        };
        PlayerCardSystem.prototype.uninit = function () {
            this.mapCards = {};
            this.mapGoods = {};
            this.mapCardToHunter = {};
            this.potatoHistoryIds = [];
            this.breakPotatoSel = [];
            this.newCardExceptEquip = {
                sysCardTime: 0,
                maxPocketIndex: 0,
            };
        };
        PlayerCardSystem.prototype.getIsCardChange = function () {
            return this.isCardChange;
        };
        PlayerCardSystem.prototype.setIsCardChange = function (change) {
            this.isCardChange = change;
        };
        PlayerCardSystem.prototype.onPotatosInfoChage = function (ev) {
            var potatos = ev.data;
            for (var i = 0; i < potatos.length; i++) {
                this.mapCards[potatos[i].index] = potatos[i];
            }
            this.isCardChange = true;
            if (this.newCardExceptEquip.sysCardTime == 0) {
                this.newCardExceptEquip.sysCardTime = this.newCardExceptEquip.sysCardTime + 1;
                for (var _i = 0, potatos_1 = potatos; _i < potatos_1.length; _i++) {
                    var v = potatos_1[_i];
                    if (v.index > this.newCardExceptEquip.maxPocketIndex) {
                        this.newCardExceptEquip.maxPocketIndex = v.index;
                    }
                }
            }
        };
        PlayerCardSystem.prototype.onPotatoHistoryIdsChange = function (ev) {
            this.potatoHistoryIds = ev.data;
        };
        PlayerCardSystem.prototype.onGoodsInfoChange = function (ev) {
            var tableItemBase = zj.TableItemBase.Table();
            for (var k in tableItemBase) {
                var itemBase = tableItemBase[k];
                var table = this.getTableByTableName(itemBase.table_name);
                for (var kk in table) {
                    var tableItem = table[kk];
                    if (!this.mapGoods.hasOwnProperty(tableItem.id)) {
                        var goods = new message.GoodsInfo();
                        goods.goodsId = tableItem.id;
                        goods.count = 0;
                        this.mapGoods[tableItem.id] = goods;
                    }
                }
            }
            for (var i = 0; i < ev.goodsInfo.length; i++) {
                this.mapGoods[ev.goodsInfo[i].goodsId] = ev.goodsInfo[i];
            }
            for (var i = 0; i < ev.delGoods.length; i++) {
                var goods = this.mapGoods[ev.delGoods[i]];
                if (goods)
                    goods.count = 0;
                // for (let k in this.mapGoods) {
                //     if (ev.delGoods[i] == this.mapGoods[k].goodsId) {
                //         this.mapGoods[k].count = 0;
                //         break;
                //     }
                // }
            }
        };
        PlayerCardSystem.prototype.deleteCardByIndex = function (index) {
            for (var k in this.mapCards) {
                if (this.mapCards[k].index == index) {
                    delete this.mapCards[k];
                    break;
                }
            }
        };
        PlayerCardSystem.prototype.getPotatoInfo = function (id) {
            return this.mapCards[id];
        };
        // 获取所有卡片（宝物）列表
        PlayerCardSystem.prototype.getAllPotatos = function () {
            var potatoInfo = [];
            for (var k in this.mapCards) {
                potatoInfo.push(this.mapCards[k]);
            }
            return potatoInfo;
        };
        PlayerCardSystem.prototype.getHunterCardMap = function (generalId) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var cardMap = {};
            for (var i = 0; i < hunterInfo.potatoInfo.length; i++) {
                var v = hunterInfo.potatoInfo[i];
                if (v)
                    cardMap[v.pos] = v;
            }
            return cardMap;
        };
        // 获取所有卡片图鉴
        PlayerCardSystem.prototype.getAllPotatoHistoryIds = function () {
            return this.potatoHistoryIds;
        };
        // 获取所有物品
        PlayerCardSystem.prototype.getGoodsById = function (id) {
            var good = null;
            for (var k in this.mapGoods) {
                if (this.mapGoods[k].goodsId == id) {
                    good = this.mapGoods[k];
                    break;
                }
            }
            return good;
        };
        // 为猎人身上的卡片添加字段
        PlayerCardSystem.prototype.setCardToHunterInfo = function () {
            var allHunters = zj.Game.PlayerHunterSystem.queryAllHunters();
            this.mapCardToHunter = {};
            for (var k in allHunters) {
                var hunter = allHunters[k];
                for (var kk in hunter.potatoInfo) {
                    var vv = hunter.potatoInfo[kk];
                    this.mapCardToHunter[vv.index] = {
                        "cStatus": zj.TableEnum.Enum.PotatoStatus.host,
                        "cHostId": hunter.general_id
                    };
                }
            }
        };
        /** 获取卡片绑定的猎人信息通过卡片index */
        PlayerCardSystem.prototype.getCardToHunterInfo = function (index) {
            var data = { "cStatus": null, "cHostId": null };
            for (var k in this.mapCardToHunter) {
                if (Number(k) == index) {
                    data = this.mapCardToHunter[k];
                    break;
                }
            }
            return data;
        };
        PlayerCardSystem.prototype.attriInstance = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.TablePotatoAttri.Item(id);
        };
        PlayerCardSystem.prototype.getTableByTableName = function (name) {
            var table;
            if (name == "table_item_general")
                table = zj.TableItemGeneral.Table();
            if (name == "table_item_resource")
                table = zj.TableItemResource.Table();
            if (name == "table_item_prop")
                table = zj.TableItemProp.Table();
            if (name == "table_item_general_soul")
                table = zj.TableItemGeneralSoul.Table();
            if (name == "table_item_partner")
                table = zj.TableItemPartner.Table();
            if (name == "table_item_partner_split")
                table = zj.TableItemPartnerSplit.Table();
            if (name == "table_item_equip_forge")
                table = zj.TableItemEquipForge.Table();
            if (name == "table_item_equip_carve")
                table = zj.TableItemEquipCarve.Table();
            if (name == "table_item_potato")
                table = zj.TableItemPotato.Table();
            if (name == "table_item_collect")
                table = zj.TableItemCollect.Table();
            if (name == "table_item_jade")
                table = zj.TableItemJade.Table();
            if (name == "table_item_cimelia")
                table = zj.TableItemCimelia.Table();
            if (name == "table_item_pic")
                table = zj.TableItemPic.Table();
            if (name == "table_item_pic_frame")
                table = zj.TableItemPicFrame.Table();
            if (name == "table_item_title")
                table = zj.TableItemTitle.Table();
            if (name == "table_item_secret")
                table = zj.TableItemSecret.Table();
            if (name == "table_item_fashion")
                table = zj.TableItemFashion.Table();
            if (name == "table_item_transfer")
                table = zj.TableItemTransfer.Table();
            if (name == "table_item_client")
                table = zj.TableItemClient.Table();
            return table;
        };
        PlayerCardSystem.prototype.initBreakPotatoSel = function () {
            this.breakPotatoSel = [];
        };
        PlayerCardSystem.prototype.getBreakPotatoSel = function () {
            return this.breakPotatoSel;
        };
        PlayerCardSystem.prototype.setBreakPotatoSel = function (breakPotatoIndex) {
            this.breakPotatoSel.push(breakPotatoIndex);
        };
        // 卡片（宝物）合成
        PlayerCardSystem.prototype.cardCompose = function (itemId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoComposeRequest();
                request.body.itemId = itemId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var gameInfo = response.body.gameInfo;
                    resolve(gameInfo.potatos);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 卡包 开卡
        PlayerCardSystem.prototype.cardBagOpen = function (bagId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CardBagOpenRequest();
                request.body.bag_id = bagId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var gameInfo = response.body.gameInfo;
                    resolve(gameInfo.potatos);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 卡片出售
        PlayerCardSystem.prototype.cardSell = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoSoldRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    PlayerCardSystem.DelCardByIndexTable(index);
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerCardSystem.prototype.potatoLock = function (index, generalId, potatoPos, lock) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoLockRequest();
                request.body.index = index;
                request.body.generalId = generalId;
                request.body.potatoPos = potatoPos;
                request.body.is_lock = lock;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 卡片突破
        PlayerCardSystem.prototype.potatoBreak = function (index, generalId, potatoPos, otherIndex) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoBreakthroughRequest();
                request.body.index = index;
                request.body.generalId = generalId;
                request.body.potatoPos = potatoPos;
                request.body.otherIndex = otherIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    for (var i = 0; i < otherIndex.length; i++) {
                        if (otherIndex[i] != -1 && otherIndex[i] != 0) {
                            _this.deleteCardByIndex(otherIndex[i]);
                        }
                    }
                    _this.initBreakPotatoSel();
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //卡片强化
        PlayerCardSystem.prototype.potatoUplevel = function (index, upLevel, potatoPos) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoUplevelRequest();
                request.body.index = index;
                request.body.upLevel = upLevel;
                request.body.potatoPos = potatoPos;
                var hostInfo = zj.Game.PlayerCardSystem.getCardToHunterInfo(index);
                var cHostId = hostInfo.cHostId;
                if (cHostId != null && potatoPos != 0) {
                    request.body.generalId = cHostId;
                    request.body.index = 0;
                }
                else {
                    request.body.generalId = 0;
                }
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //卡片升星
        PlayerCardSystem.prototype.potatoAddStar = function (cardInfo, met_tbl) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoBreakRequest();
                request.body.index = cardInfo.index;
                var hostInfo = zj.Game.PlayerCardSystem.getCardToHunterInfo(cardInfo.index);
                var cHostId = hostInfo.cHostId;
                if (cHostId != null && cardInfo.pos != 0) {
                    request.body.generalId = cHostId;
                    request.body.index = 0;
                }
                else {
                    request.body.generalId = 0;
                }
                request.body.potatoPos = cardInfo.pos;
                request.body.otherIndex = met_tbl;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var gameInfo = response.body.gameInfo;
                    resolve({ gameInfo: gameInfo });
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**
         * 注入念力
         * @param info 卡片信息
         * @param _sel
         * @param _selGoodsIndex
         */
        PlayerCardSystem.prototype.PotatoGrowthReqReq = function (info, _sel, _selGoodsIndex) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoGrowthRequest();
                request.body.index = info.index;
                var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(info.index).cHostId;
                if (cHostId != null) {
                    request.body.generalId = cHostId;
                }
                else {
                    request.body.generalId = 0;
                }
                request.body.potatoPos = info.pos;
                request.body.attriId = _sel;
                request.body.range = _selGoodsIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //根据等级获取开启的卡片
        PlayerCardSystem.prototype.cardOpenNum = function (generaId, level) {
            var num = 0;
            var cards = zj.PlayerHunterSystem.Table(generaId).card_level;
            for (var i = 0; i < cards.length; i++) {
                if (level >= cards[i]) {
                    num = num + 1;
                }
            }
            return num;
        };
        PlayerCardSystem.prototype.getCardNumber = function () {
            var count = 0;
            for (var kk in this.mapCards) {
                var vv = this.mapCards[kk];
                count = count + 1;
            }
            return count;
        };
        return PlayerCardSystem;
    }());
    zj.PlayerCardSystem = PlayerCardSystem;
    __reflect(PlayerCardSystem.prototype, "zj.PlayerCardSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerCardSystem.js.map