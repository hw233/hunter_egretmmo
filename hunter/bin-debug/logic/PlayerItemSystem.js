var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 玩家物品系统
    // guoshanhe 创建于2018.11.13
    var PlayerItemSystem = (function () {
        function PlayerItemSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.mapGoodsInfo = {}; // 物品信息
        }
        // 通过物品ID获得物品类型
        PlayerItemSystem.ItemType = function (id) {
            for (var i = message.EGoodsType.GOODS_TYPE_NONO + 1; i < message.EGoodsType.GOODS_TYPE_END; i++) {
                var item = zj.TableItemBase.Item(i);
                if (item == null) {
                    continue;
                }
                ;
                // if (i == message.EGoodsType.GOODS_TYPE_TALENT_BOOK) {
                //     continue
                // }; // 天赋书已作废
                if (i != message.EGoodsType.GOODS_TYPE_TALENT_BOOK && id >= item.min_id && id <= item.max_id) {
                    return i;
                }
            }
            return message.EGoodsType.GOODS_TYPE_NONO;
        };
        // 查询物品ID所属类型基本配置
        // 找不到返回null
        PlayerItemSystem.ItemTypeConfig = function (id) {
            var type = PlayerItemSystem.ItemType(id);
            return zj.TableItemBase.Item(type);
        };
        // 查询物品ID的配置项信息
        // 找不到返回null
        PlayerItemSystem.ItemConfig = function (id) {
            var type = PlayerItemSystem.ItemType(id);
            switch (type) {
                case message.EGoodsType.GOODS_TYPE_GENERAL:// 武将
                    return zj.TableItemGeneral.Item(id);
                case message.EGoodsType.GOODS_TYPE_RESOURCE:// 资源
                    return zj.TableItemResource.Item(id);
                case message.EGoodsType.GOODS_TYPE_PROP:// 道具
                    return zj.TableItemProp.Item(id);
                case message.EGoodsType.GOODS_TYPE_GENERAL_SOUL:// 武将魂
                    return zj.TableItemGeneralSoul.Item(id);
                case message.EGoodsType.GOODS_TYPE_TALENT_BOOK:// 天赋书(作废)
                    return zj.TableItemGeneralSoul.Item(id);
                case message.EGoodsType.GOODS_TYPE_PARTNER:// 羁绊卡
                    return zj.TableItemPartner.Item(id);
                // case message.EGoodsType.GOODS_TYPE_PARTNER_SPLIT: // 预留表
                case message.EGoodsType.GOODS_TYPE_EQUIP_FORGE: // 预留表
                case message.EGoodsType.GOODS_TYPE_EQUIP_CARVE:// 预留表
                    return zj.TableItemProp.Item(id);
                case message.EGoodsType.GOODS_TYPE_POTATO:// 宝物
                    return zj.TableItemPotato.Item(id);
                case message.EGoodsType.GOODS_TYPE_COLLECT:// 活动道具
                    return zj.TableItemCollect.Item(id);
                case message.EGoodsType.GOODS_TYPE_JADE: // 宝石
                case message.EGoodsType.GOODS_TYPE_CIMELIA:// 宝箱
                    return zj.TableItemCimelia.Item(id);
                case message.EGoodsType.GOODS_TYPE_PIC:// 头像
                    return zj.TableItemPic.Item(id);
                case message.EGoodsType.GOODS_TYPE_PIC_FRAME:// 头像框
                    return zj.TableItemPicFrame.Item(id);
                case message.EGoodsType.GOODS_TYPE_TITLE:// 称号
                    return zj.TableItemTitle.Item(id);
                case message.EGoodsType.GOODS_TYPE_SECRET:// 秘宝
                    return zj.TableItemSecret.Item(id);
                case message.EGoodsType.GOODS_TYPE_FASHION:// 时装
                    return zj.TableItemFashion.Item(id);
                case message.EGoodsType.GOODS_TYPE_TRANSEFER:// 礼盒
                    return zj.TableItemTransfer.Item(id);
                case message.EGoodsType.GOODS_TYPE_CLIENT:// 客户端显示用道具
                    return zj.TableItemClient.Item(id);
                default:
                    return null;
            }
        };
        // 查询物品是否可重叠
        PlayerItemSystem.ItemIsOverlap = function (id) {
            var item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null)
                return false;
            return !!item.is_overlap;
        };
        // 查询物品是否可出售
        PlayerItemSystem.ItemIsSell = function (id) {
            var item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null)
                return false;
            return !!item.is_sell;
        };
        // 查询物品的类别描述
        PlayerItemSystem.ItemTypeDesc = function (id) {
            var item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null)
                return "";
            for (var i = 0; i < item.client_min_id.length; i++) {
                if (id >= item.client_min_id[i] && id <= item.client_max_id[i])
                    return item.client_name[i];
            }
            return item.name;
        };
        // 查询物品图片资源key
        PlayerItemSystem.ItemPath = function (id) {
            var item = PlayerItemSystem.ItemConfig(id);
            if (item == null)
                return "";
            if (!item.hasOwnProperty("path"))
                return "";
            return item["path"];
        };
        // 查询物品品质等级
        PlayerItemSystem.ItemQuality = function (id) {
            var item = PlayerItemSystem.ItemConfig(id);
            if (item == null)
                return 0;
            if (!item.hasOwnProperty("quality"))
                return 0;
            return item["quality"];
        };
        // 查询物品外框
        PlayerItemSystem.ItemFrame = function (id) {
            var type = PlayerItemSystem.ItemType(id);
            var quality = PlayerItemSystem.ItemQuality(id);
            if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                var aptitude = PlayerItemSystem.ItemConfig(id)["aptitude"];
                if (aptitude == 11) {
                    return zj.UIConfig.UIConfig_Role.heroFrame[1];
                }
                else if (aptitude == 12) {
                    return zj.UIConfig.UIConfig_Role.heroFrame[3];
                }
                else if (aptitude == 13) {
                    return zj.UIConfig.UIConfig_Role.heroFrame[6];
                }
                else if (aptitude == 14) {
                    return zj.UIConfig.UIConfig_Role.heroFrame[9];
                }
                else if (aptitude == 15) {
                    return zj.UIConfig.UIConfig_Role.heroFrame[13];
                }
                else {
                    return zj.UIConfig.UIConfig_Role.heroFrame[0];
                }
            }
            else if (type == message.EGoodsType.GOODS_TYPE_PARTNER) {
                return zj.UIConfig.UIConfig_Role.itemFrame[quality];
            }
            else if (type == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) {
                return zj.UIConfig.UIConfig_Soul[quality];
            }
            else if (zj.TableEnum.Enum.PropCardPiece.indexOf(id) != -1) {
                return zj.UIConfig.UIConfig_Soul[quality];
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                return zj.UIConfig.UIConfig_Role.itemFrame[quality];
            }
            else if (type == message.EGoodsType.GOODS_TYPE_TRANSEFER) {
                return zj.UIConfig.UIConfig_Role.itemFrame[quality];
            }
            else if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                if (PlayerItemSystem.ItemConfig(id)["is_piece"] == 1) {
                    return PlayerItemSystem.ItemConfig(id)["frame"];
                }
                else {
                    return zj.UIConfig.UIConfig_Role.itemFrame[quality];
                }
            }
            else if (zj.TableEnum.Enum.PropAdviserPiece.indexOf(id) != -1) {
                return zj.UIConfig.UIConfig_Soul[quality];
            }
            else if (Math.floor(id / 1000) == 37) {
                return zj.UIConfig.UIConfig_Soul[quality];
            }
            else if (zj.TableEnum.Enum.PropPotatoPiece.indexOf(id) != -1) {
                return zj.UIConfig.UIConfig_Role.itemFrame[quality];
            }
            else if (zj.TableEnum.Enum.PropRole.indexOf(id) != -1) {
                return zj.UIConfig.UIConfig_Soul[quality];
            }
            else if (type == message.EGoodsType.GOODS_TYPE_POTATO) {
                if (PlayerItemSystem.ItemConfig(id)["rare_card"] != 0) {
                    return zj.UIConfig.UIConfig_Role.item_rareCardFrame[PlayerItemSystem.ItemConfig(id)["rare_card"]];
                }
                else {
                    return zj.UIConfig.UIConfig_Role.itemFrame[quality];
                }
            }
            else {
                return zj.UIConfig.UIConfig_Role.itemFrame[quality];
            }
        };
        // 查询品质颜色
        PlayerItemSystem.QualityColor = function (quality) {
            if (quality <= 0) {
                return zj.ConstantConfig_Common.Color.white;
            }
            else if (quality <= 2) {
                return zj.ConstantConfig_Common.Color.quality_green;
            }
            else if (quality <= 5) {
                return zj.ConstantConfig_Common.Color.quality_blue;
            }
            else if (quality <= 8) {
                return zj.ConstantConfig_Common.Color.quality_purple;
            }
            else if (quality <= 12) {
                return zj.ConstantConfig_Common.Color.quality_orange;
            }
            else if (quality <= 16) {
                return zj.ConstantConfig_Common.Color.quality_red;
            }
            else if (quality <= 20) {
                return zj.ConstantConfig_Common.Color.quality_gold;
            }
            else {
                return zj.ConstantConfig_Common.Color.quality_gold;
            }
        };
        // 查询道具品质方框
        PlayerItemSystem.QualityFrame = function (quality) {
            var ret = zj.UIConfig.UIConfig_Role.itemFrame[quality];
            if (ret == null || ret == undefined)
                return "";
            return ret;
        };
        //获取卡包所有id（以139开头的物品）
        PlayerItemSystem.GetCardBag = function () {
            var cardbag = [];
            var tblCimelia = zj.TableItemCimelia.Table();
            for (var k in tblCimelia) {
                if (Math.floor(tblCimelia[k].id / 1000) == 139)
                    cardbag.push(tblCimelia[k].id);
            }
            cardbag.sort(function (a, b) {
                return b - a;
            });
            return cardbag;
        };
        // 排序用的取类型
        PlayerItemSystem.Type2 = function (id) {
            return Math.floor((id / 10000));
        };
        // 物品表格
        PlayerItemSystem.Table = function (id) {
            var t = PlayerItemSystem.ItemType(id);
            if (t == null)
                return null;
            if (t == message.EGoodsType.GOODS_TYPE_NONO) {
                console.log("item is a illegal type");
                console.log("item id is //> ", id);
                return null;
            }
            return this.ItemConfig(id);
        };
        // 物品数量
        PlayerItemSystem.Count = function (id) {
            if (id == 0 || zj.Game.PlayerCardSystem.getGoodsById(id) == null) {
                return 0;
            }
            else if (id == 20002) {
                return zj.Game.PlayerInfoSystem.Token;
            }
            else {
                return zj.Game.PlayerCardSystem.getGoodsById(id).count;
            }
        };
        // 物品表格名称
        PlayerItemSystem.TableName = function (id) {
            if (PlayerItemSystem.ItemType(id))
                return null;
            var t = PlayerItemSystem.ItemType(id);
            if (t == message.EGoodsType.GOODS_TYPE_NONO) {
                console.log("item is a illegal type");
                console.log("item id is //> ", id);
                return null;
            }
            return this.ItemConfig(id);
        };
        // 物品表格索引对应的行
        PlayerItemSystem.Item = function (id) {
            return PlayerItemSystem.ItemConfig(id);
            /*
            if (PlayerItemSystem.ItemConfig(id)) return null;
            let data = this.Table(id);
            let tableName = this.TableName(id);
            return data;
            //return Helper.dbii(data, id, tableName);
            */
        };
        //资源数量
        PlayerItemSystem.Resource = function (id) {
            if (PlayerItemSystem.ItemType(id) != message.EGoodsType.GOODS_TYPE_RESOURCE) {
                return 0;
            }
            else {
                var item = PlayerItemSystem.Item(id);
                return zj.Game.PlayerInfoSystem.BaseInfo[item.tag];
            }
        };
        PlayerItemSystem.Str_Resoure = function (id) {
            var count = PlayerItemSystem.Resource(id);
            var str_count = "";
            var COUNT_WAN = 100000;
            var COUNT_WAN_DIV = 10000;
            var COUNT_QIAN_DIV = 1000;
            var COUNT_WAN_STR = zj.TextsConfig.TextsConfig_Common.wan;
            if (count < COUNT_WAN) {
                str_count = zj.Helper.StringFormat("%d", count);
            }
            else if (count % COUNT_WAN_DIV - count % COUNT_QIAN_DIV == 0) {
                str_count = zj.Helper.StringFormat("%d%s", Math.floor(count / COUNT_WAN_DIV), COUNT_WAN_STR);
            }
            else {
                str_count = zj.Helper.StringFormat("%s%s", (count / COUNT_WAN_DIV).toFixed(1), COUNT_WAN_STR);
            }
            return str_count;
        };
        //神秘物品
        PlayerItemSystem.ItemMysteriousItem = function () {
            var _QUALITY = 4;
            var ret = {
                Frame: null,
                Clip: null,
                Info: {
                    name: null
                },
                Count: null
            };
            ret.Frame = zj.UIConfig.UIConfig_Common.itemFrame[_QUALITY];
            ret.Clip = zj.UIConfig.UIConfig_Common.item_unknow[_QUALITY];
            ret.Info.name = zj.TextsConfig.TextsConfig_Wanted.goods;
            return ret;
        };
        //物品显示信息
        //itemId(number) 物品ID
        //show(number)  显示光效
        //count(num)     资源用的不同数量的资源显示不同的颜色框
        PlayerItemSystem.Set = function (itemId, show, count) {
            if (itemId == zj.TableEnum.Enum.MysteriousId) {
                return PlayerItemSystem.ItemMysteriousItem();
            }
            var itemSet = {
                // 默认
                Type: PlayerItemSystem.Type2(itemId),
                Info: PlayerItemSystem.Item(itemId),
                Path: PlayerItemSystem.ItemPath(itemId),
                Count: PlayerItemSystem.Count(itemId),
                TypeDes: PlayerItemSystem.ItemTypeDesc(itemId),
                Clip: zj.UIConfig.UIConfig_Common.nothing,
                Frame: zj.UIConfig.UIConfig_Common.nothing,
                Sel: zj.UIConfig.UIConfig_Common.nothing,
                Mask: zj.UIConfig.UIConfig_Common.nothing,
                Logo: zj.UIConfig.UIConfig_Common.nothing,
                Red: null,
                Use: null,
                FruitID: null,
                QualityForFrame: null
            };
            var item = PlayerItemSystem.Item(itemId);
            itemSet.Red = item.red_tips != null && item.red_tips != 0;
            itemSet.Use = item.use_tips != null && item.use_tips != 0;
            itemSet.FruitID = item.fruit_id != null && item.fruit_id || "";
            itemSet.QualityForFrame = item.quality;
            // 武将
            if (itemSet.Type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                itemSet.Clip = zj.PlayerHunterSystem.MapInstance(zj.PlayerHunterSystem.Table(itemId).general_roleId).head_path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[0];
                var gnritem = PlayerItemSystem.ItemConfig(itemId);
                var gnr_aptitude = zj.TableBaseGeneral.Item(itemId % zj.CommonConfig.general_id_to_index_multiple).aptitude; // gnritem.quality + 9;
                if (gnr_aptitude == 11) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[1];
                }
                else if (gnr_aptitude == 12) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[3];
                }
                else if (gnr_aptitude == 13) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[6];
                }
                else if (gnr_aptitude == 14) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[9];
                }
                else if (gnr_aptitude == 15) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.heroFrame[13];
                }
                itemSet.Count = 0;
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_PARTNER) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.soul;
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Soul[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
            }
            else if (zj.Table.VIn(zj.TableEnum.Enum.PropCardPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Soul[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.normal;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.normal;
                itemSet.Count = PlayerItemSystem.Resource(itemId);
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_TRANSEFER) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.normal;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.normal;
                itemSet.Count = PlayerItemSystem.Count(itemId);
                itemSet.Red = item.red_tips != null && item.red_tips != 0;
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                if (item.is_piece == 1) {
                    itemSet.Clip = item.path;
                    itemSet.Frame = item.frame;
                }
                else {
                    itemSet.Clip = item.path;
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                }
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.normal;
                itemSet.Count = PlayerItemSystem.Count(itemId);
            }
            else if (zj.Table.VIn(zj.TableEnum.Enum.PropAdviserPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.pieceFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.soul;
            }
            else if (Math.floor(itemId / 1000) == 37) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.pieceFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.soul;
            }
            else if (zj.Table.VIn(zj.TableEnum.Enum.PropPotatoPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
            }
            else if (zj.Table.VIn(zj.TableEnum.Enum.PropRole, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.pieceFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.soul;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.normal;
            }
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_POTATO) {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.normal;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.normal;
                if (item.rare_card != 0) {
                    itemSet.Frame = zj.UIConfig.UIConfig_Role.item_rareCardFrame[item.rare_card];
                }
            }
            else {
                itemSet.Clip = item.path;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = zj.UIConfig.UIConfig_Role.sel.normal;
                itemSet.Mask = zj.UIConfig.UIConfig_Role.mask.normal;
            }
            var _MAX_FRAME = 5;
            // frame for resource
            if (count != null && count > 0 && itemSet.Type == message.EGoodsType.GOODS_TYPE_RESOURCE && itemId < 20020) {
                var info = PlayerItemSystem.Item(itemId);
                //查表，不同数量资源，显示不同框
                var _a = zj.Table.FindR(info.show_type, function (k, v) {
                    return count < v;
                }), _ = _a[0], frame = _a[1];
                frame = frame != null ? (frame) : _MAX_FRAME;
                itemSet.Frame = zj.UIConfig.UIConfig_Role.itemFrame[frame];
                itemSet.QualityForFrame = frame;
            }
            return itemSet;
        };
        PlayerItemSystem.PackageType = function () {
            return zj.TableClientTypePackage.Table();
        };
        PlayerItemSystem.GoodsForPackage = function () {
            var ret = [];
            var typeData = PlayerItemSystem.PackageType();
            for (var i = 0; i < Object.keys(typeData).length; i++) {
                var goodsList = zj.Game.PlayerItemSystem.goodsWithType(i + 1);
                ret.push(goodsList);
            }
            return ret;
        };
        // 获取资源种类 ID
        PlayerItemSystem.UseOfResource = function (id) {
            if (Math.floor(id / 10000) == message.EGoodsType.GOODS_TYPE_PROP) {
                var info = PlayerItemSystem.ItemConfig(id);
                if (info["money"] != "") {
                    return message.EResourceType.RESOURCE_MONEY;
                }
                else if (info["power"] != "") {
                    return message.EResourceType.RESOURCE_POWER;
                }
            }
        };
        /**
         * 列表数据补齐
         * @param count 总数
         * @param min 最小个数
         * @param row 列数
         *
         * @description 防止不占满一屏幕感觉空
         */
        PlayerItemSystem.FixCount = function (count, min, row) {
            var fix = 0;
            if (count <= min) {
                fix = min - count;
            }
            else if (count % row > 0) {
                fix = row - (count % row);
            }
            return fix;
        };
        PlayerItemSystem.GetNormalPic = function (type) {
            var arr = [];
            var tblPic = zj.TableItemPic.Table();
            for (var k in tblPic) {
                if (tblPic[k].type == type) {
                    arr.push(k);
                }
            }
            return arr.sort();
        };
        /**高级头像 */
        PlayerItemSystem.GetHighPic = function () {
            var tbl = [];
            var picIds = [];
            var picTbl = zj.TableItemPic.Table();
            var generalTbl = zj.TableBaseGeneral.Table();
            for (var k in picTbl) {
                if (picTbl.hasOwnProperty(k)) {
                    var v = picTbl[k];
                    if (v.type == 2) {
                        tbl.push({ key: Number(k), value1: 0, value2: 0 });
                    }
                }
            }
            var _loop_1 = function (k) {
                if (tbl.hasOwnProperty(k)) {
                    var v_1 = tbl[k];
                    var find = zj.Table.FindF(zj.Game.PlayerWonderLandSystem.otherAttri.picIds, function (k, value) {
                        return value == v_1.key;
                    });
                    tbl[k].value1 = find ? 1 : 0;
                }
            };
            for (var k in tbl) {
                _loop_1(k);
            }
            var _loop_2 = function (k) {
                if (generalTbl.hasOwnProperty(k)) {
                    var v_2 = generalTbl[k];
                    var vk = zj.Table.FindR(tbl, function (kk, vv) {
                        return vv.key == v_2.pic_id;
                    });
                    if (vk[0] != null) {
                        tbl[vk[1]].value2 = v_2.aptitude;
                    }
                }
            };
            for (var k in generalTbl) {
                _loop_2(k);
            }
            var sort = function (a, b) {
                if (a.value1 == b.value1) {
                    if (a.value2 == b.value2) {
                        return a.key - b.key;
                    }
                    else {
                        return b.value2 - a.value2;
                    }
                }
                else {
                    return b.value1 - a.value1;
                }
            };
            tbl.sort(sort);
            for (var k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    var v = tbl[k];
                    picIds.push(v.key);
                }
            }
            return picIds;
        };
        /**变身头像 */
        PlayerItemSystem.GetTransPic = function () {
            var tbl = [];
            var picTbl = zj.TableItemPic.Table();
            for (var k in picTbl) {
                if (picTbl.hasOwnProperty(k)) {
                    var v = picTbl[k];
                    if (v.type == 4) {
                        tbl.push(k);
                    }
                }
            }
            tbl.sort(function (a, b) {
                return a - b;
            });
            return tbl;
        };
        PlayerItemSystem.Title = function (id) {
            if (id == 0) {
                return zj.TextsConfig.TextsConfig_Rank.pop_title_effects;
            }
            if (PlayerItemSystem.ItemType(id) == message.EGoodsType.GOODS_TYPE_TITLE) {
                return PlayerItemSystem.Item(id).name;
            }
            return zj.TextsConfig.TextsConfig_Rank.pop_title_effects;
        };
        // 计算物品 NumID
        PlayerItemSystem.GoodsNumID = function (goodsId) {
            // 果实类
            if (zj.TableClientTypePackage.Item(6)["itemId"].indexOf(goodsId) != -1) {
                return (goodsId % 100).toString();
            }
            // 其他
            return "";
        };
        // 物品遮罩
        PlayerItemSystem.IsImgMask = function (goodsId) {
            if (PlayerItemSystem.ItemType(goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        // 徽章遮罩
        PlayerItemSystem.IsRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        PlayerItemSystem.MergeItem = function (goods) {
            var ret = [];
            var _loop_3 = function (v) {
                var item = zj.Table.FindR(ret, function (kk, vv) {
                    return v.goodsId == vv.goodsId;
                })[0];
                if (item) {
                    item.count = item.count + v.count;
                }
                else {
                    var tmp = new message.GoodsInfo();
                    tmp.goodsId = v.goodsId;
                    tmp.count = v.count;
                    tmp.index = 0;
                    tmp.showType = 0;
                    ret.push(tmp);
                }
            };
            for (var _i = 0, goods_1 = goods; _i < goods_1.length; _i++) {
                var v = goods_1[_i];
                _loop_3(v);
            }
            return ret;
        };
        //获得仙境果子所有ID（以131开头的物品）
        PlayerItemSystem.prototype.getWonderlandFruit = function () {
            var fruit = [];
            var tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var k in tbl_cimelia) {
                var v = tbl_cimelia[k];
                fruit.push(v.id);
            }
            fruit.sort(function (a, b) {
                return a - b;
            });
            return fruit;
        };
        /**
         * 获取仙境果子所有id拥有的（以131开头的物品）
         * */
        PlayerItemSystem.prototype.getWonderlandFruits = function () {
            var fruit = [];
            var tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var k in tbl_cimelia) {
                var v = tbl_cimelia[k];
                if (zj.Game.PlayerItemSystem.mapGoodsInfo[v.id] != null) {
                    if (zj.Table.VIn(zj.TableEnum.Enum.FruitIds, v.id) && zj.Game.PlayerItemSystem.mapGoodsInfo[v.id].count > 0) {
                        fruit.push(v.id);
                    }
                }
            }
            fruit.sort(function (a, b) {
                return a - b;
            });
            return fruit;
        };
        //获取果子（以131开头的物品）按照type
        PlayerItemSystem.prototype.getWonderlandFruitByType = function (type) {
            var fruit = this.getWonderlandFruit();
            var _type = type == null && 0 || type;
            var _fruit = [];
            if (type == -1) {
                for (var k in fruit) {
                    var v = fruit[k];
                    var goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = zj.Game.PlayerItemSystem.mapGoodsInfo[v].count;
                    if (goods.count > 0) {
                        _fruit.push(goods);
                    }
                }
            }
            else {
                for (var k in fruit) {
                    var v = fruit[k];
                    var goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = zj.Game.PlayerItemSystem.mapGoodsInfo[v].count;
                    if (Math.floor(v / 100) == 131 * 10 + _type && goods.count > 0) {
                        _fruit.push(goods);
                    }
                }
            }
            return _fruit;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerItemSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GOODS_INFO_CHANGE, this.onGoodsInfoChange, this);
        };
        PlayerItemSystem.prototype.uninit = function () {
            this.mapGoodsInfo = {};
        };
        PlayerItemSystem.prototype.onGoodsInfoChange = function (ev) {
            for (var _i = 0, _a = ev.goodsInfo; _i < _a.length; _i++) {
                var goods = _a[_i];
                this.mapGoodsInfo[goods.goodsId] = goods;
            }
            for (var i = 0; i < ev.delGoods.length; i++) {
                delete this.mapGoodsInfo[ev.delGoods[i]];
            }
            this.setInfoMapinfo();
        };
        //设置资源映射到物品表
        PlayerItemSystem.prototype.setInfoMapinfo = function () {
            var tblres = zj.TableItemResource.Table();
            for (var k in tblres) {
                var v = tblres[k];
                var goods = new message.GoodsInfo();
                goods.goodsId = v.id;
                goods.count = zj.Game.PlayerInfoSystem.BaseInfo[v.tag];
                this.mapGoodsInfo[v.id] = goods;
            }
        };
        // 查询物品信息
        PlayerItemSystem.prototype.queryItem = function (id) {
            return this.mapGoodsInfo[id];
        };
        // 玩家拥有物品数量
        PlayerItemSystem.prototype.itemCount = function (id) {
            var item = this.mapGoodsInfo[id];
            if (item == null || item == undefined)
                return 0;
            return item.count;
        };
        // 获取背包物品列表
        PlayerItemSystem.prototype.goodsWithType = function (index) {
            var tmpList = [];
            var goodsList = [];
            var typeData = zj.TableClientTypePackage.Item(index);
            // get item type
            if (typeData.itemType[0] != 0) {
                for (var _i = 0, _a = typeData.itemType; _i < _a.length; _i++) {
                    var typeId = _a[_i];
                    var itemAll = egret.getDefinitionByName(PlayerItemSystem.itemTableName[typeId]).Table();
                    for (var _b = 0, _c = Object.keys(itemAll); _b < _c.length; _b++) {
                        var key = _c[_b];
                        tmpList.push(itemAll[key].id);
                    }
                }
            }
            // get item id
            if (typeData.itemId[0] != 0) {
                for (var _d = 0, _e = typeData.itemId; _d < _e.length; _d++) {
                    var id = _e[_d];
                    tmpList.push(id);
                }
            }
            for (var i = 0; i < tmpList.length; i++) {
                if (!this.mapGoodsInfo.hasOwnProperty(tmpList[i]))
                    continue;
                var quality = PlayerItemSystem.ItemQuality(tmpList[i]);
                var count = this.mapGoodsInfo[tmpList[i]]["count"];
                if (count == undefined)
                    continue;
                tmpList[i] = {
                    "id": tmpList[i],
                    "count": count,
                    "quality": quality
                };
            }
            // 按品质排序
            tmpList.sort(function (a, b) {
                return (a.quality == b.quality && a.id - b.id || b.quality - a.quality);
            });
            // 过滤
            for (var _f = 0, tmpList_1 = tmpList; _f < tmpList_1.length; _f++) {
                var v = tmpList_1[_f];
                if (v.count > 0)
                    goodsList.push(v);
            }
            return goodsList;
        };
        PlayerItemSystem.prototype.TableAllItem = function (t) {
            if (zj.ckid(t))
                return null;
            return zj.TableItemCimelia.Table();
        };
        PlayerItemSystem.prototype.HasCardBag = function () {
            var h_cardBag = false;
            var tbl_cardBag = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl_cardBag); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (Math.floor(v.id / 1000) == 139 && PlayerItemSystem.Count(v.id) > 0) {
                    return true;
                }
            }
            return h_cardBag;
        };
        PlayerItemSystem.prototype.GetWonderlandFruit = function () {
            var fruit = [];
            var tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl_cimelia); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (zj.Table.VIn(zj.TableEnum.Enum.FruitIds, v.id)) {
                    fruit.push(v.id);
                }
            }
            fruit.sort(function (a, b) {
                return a - b;
            });
            return fruit;
        };
        PlayerItemSystem.prototype.GetWonderlandFruitByType = function (type, exceptCount) {
            var fruit = this.GetWonderlandFruit();
            var _type = type == null ? 0 : type;
            var _fruit = [];
            if (type == -1) {
                for (var _i = 0, _a = zj.HelpUtil.GetKV(fruit); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    var goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = PlayerItemSystem.Count(v);
                    if (goods.count > 0 || exceptCount) {
                        _fruit.push(goods);
                    }
                }
            }
            else {
                for (var _c = 0, _d = zj.HelpUtil.GetKV(fruit); _c < _d.length; _c++) {
                    var _e = _d[_c], k = _e[0], v = _e[1];
                    var goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = PlayerItemSystem.Count(v);
                    if (Math.floor(v / 100) == 131 * 10 + _type && (goods.count > 0 || exceptCount)) {
                        _fruit.push(goods);
                    }
                }
            }
            return _fruit;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 网络协议请求
        // 出售物品
        PlayerItemSystem.prototype.sellGoods = function (goodses) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SellGoodsRequest();
                request.body.goodses = goodses;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        // 使用道具
        PlayerItemSystem.prototype.useProp = function (goodses) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UsePropRequest();
                request.body.goodses = goodses;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        // 快速购买
        PlayerItemSystem.prototype.quickMall = function (id, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QuickMallRequest();
                request.body.item_id = id;
                request.body.item_num = num;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        /**获取魔域魔匣所有id（以136开头的物品） */
        PlayerItemSystem.prototype.GetWonderlandDemon = function () {
            var demon = [];
            var tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var k in tbl_cimelia) {
                if (tbl_cimelia.hasOwnProperty(k)) {
                    var v = tbl_cimelia[k];
                    if (Math.floor(v.id / 1000) == 136) {
                        demon.push(v.id);
                    }
                }
            }
            demon.sort(function (a, b) {
                return a - b;
            });
            return demon;
        };
        /**获取盗贼的宝藏cimelia表 */
        PlayerItemSystem.prototype.GetWonderlandRogue = function () {
            var rogue = [];
            var tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (var k in tbl_cimelia) {
                if (tbl_cimelia.hasOwnProperty(k)) {
                    var v = tbl_cimelia[k];
                    if (zj.Table.VIn(zj.TableEnum.Enum.Rogue, v.id)) {
                        rogue.push(v.id);
                    }
                }
            }
            rogue.sort(function (a, b) {
                return a - b;
            });
            return rogue;
        };
        PlayerItemSystem.itemTableName = (_a = {},
            _a[1] = "TableItemGeneral",
            _a[2] = "TableItemResource",
            _a[3] = "TableItemProp",
            _a[4] = "TableItemGeneralSoul",
            _a[6] = "TableItemPartner",
            _a[7] = "TableItemProp",
            _a[8] = "TableItemProp",
            _a[9] = "TableItemProp",
            _a[10] = "TableItemPotato",
            _a[11] = "TableItemCollect",
            _a[12] = "TableItemCimelia",
            _a[13] = "TableItemCimelia",
            _a[14] = "TableItemPic",
            _a[15] = "TableItemPicFrame",
            _a[16] = "TableItemTitle",
            _a[17] = "TableItemSecret",
            _a[18] = "TableItemFashion",
            _a[19] = "TableItemTransfer",
            _a[20] = "TableItemClient",
            _a);
        return PlayerItemSystem;
    }());
    zj.PlayerItemSystem = PlayerItemSystem;
    __reflect(PlayerItemSystem.prototype, "zj.PlayerItemSystem");
    var _a;
})(zj || (zj = {}));
//# sourceMappingURL=PlayerItemSystem.js.map