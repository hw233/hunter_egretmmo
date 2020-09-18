namespace zj {
    // 玩家物品系统
    // guoshanhe 创建于2018.11.13

    export class PlayerItemSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        // 通过物品ID获得物品类型
        static ItemType(id: number): message.EGoodsType {
            for (let i = message.EGoodsType.GOODS_TYPE_NONO + 1; i < message.EGoodsType.GOODS_TYPE_END; i++) {
                let item = TableItemBase.Item(i);
                if (item == null) {
                    continue
                };
                // if (i == message.EGoodsType.GOODS_TYPE_TALENT_BOOK) {
                //     continue
                // }; // 天赋书已作废
                if (i != message.EGoodsType.GOODS_TYPE_TALENT_BOOK && id >= item.min_id && id <= item.max_id) {
                    return i;
                }
            }
            return message.EGoodsType.GOODS_TYPE_NONO;
        }

        // 查询物品ID所属类型基本配置
        // 找不到返回null
        static ItemTypeConfig(id: number): TableItemBase {
            let type = PlayerItemSystem.ItemType(id);
            return TableItemBase.Item(type);
        }

        // 查询物品ID的配置项信息
        // 找不到返回null
        static ItemConfig(id: number): Object {
            let type = PlayerItemSystem.ItemType(id);
            switch (type) {
                case message.EGoodsType.GOODS_TYPE_GENERAL: // 武将
                    return TableItemGeneral.Item(id);
                case message.EGoodsType.GOODS_TYPE_RESOURCE: // 资源
                    return TableItemResource.Item(id);
                case message.EGoodsType.GOODS_TYPE_PROP: // 道具
                    return TableItemProp.Item(id);
                case message.EGoodsType.GOODS_TYPE_GENERAL_SOUL: // 武将魂
                    return TableItemGeneralSoul.Item(id);
                case message.EGoodsType.GOODS_TYPE_TALENT_BOOK: // 天赋书(作废)
                    return TableItemGeneralSoul.Item(id);
                case message.EGoodsType.GOODS_TYPE_PARTNER: // 羁绊卡
                    return TableItemPartner.Item(id);
                // case message.EGoodsType.GOODS_TYPE_PARTNER_SPLIT: // 预留表
                case message.EGoodsType.GOODS_TYPE_EQUIP_FORGE: // 预留表
                case message.EGoodsType.GOODS_TYPE_EQUIP_CARVE: // 预留表
                    return TableItemProp.Item(id);
                case message.EGoodsType.GOODS_TYPE_POTATO: // 宝物
                    return TableItemPotato.Item(id);
                case message.EGoodsType.GOODS_TYPE_COLLECT: // 活动道具
                    return TableItemCollect.Item(id);
                case message.EGoodsType.GOODS_TYPE_JADE: // 宝石
                case message.EGoodsType.GOODS_TYPE_CIMELIA: // 宝箱
                    return TableItemCimelia.Item(id);
                case message.EGoodsType.GOODS_TYPE_PIC: // 头像
                    return TableItemPic.Item(id);
                case message.EGoodsType.GOODS_TYPE_PIC_FRAME: // 头像框
                    return TableItemPicFrame.Item(id);
                case message.EGoodsType.GOODS_TYPE_TITLE: // 称号
                    return TableItemTitle.Item(id);
                case message.EGoodsType.GOODS_TYPE_SECRET: // 秘宝
                    return TableItemSecret.Item(id);
                case message.EGoodsType.GOODS_TYPE_FASHION: // 时装
                    return TableItemFashion.Item(id);
                case message.EGoodsType.GOODS_TYPE_TRANSEFER: // 礼盒
                    return TableItemTransfer.Item(id);
                case message.EGoodsType.GOODS_TYPE_CLIENT: // 客户端显示用道具
                    return TableItemClient.Item(id);
                default:
                    return null;
            }
        }

        // 查询物品是否可重叠
        static ItemIsOverlap(id: number): boolean {
            let item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null) return false;
            return !!item.is_overlap;
        }

        // 查询物品是否可出售
        static ItemIsSell(id: number): boolean {
            let item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null) return false;
            return !!item.is_sell;
        }

        // 查询物品的类别描述
        static ItemTypeDesc(id: number): string {
            let item = PlayerItemSystem.ItemTypeConfig(id);
            if (item == null) return "";
            for (let i = 0; i < item.client_min_id.length; i++) {
                if (id >= item.client_min_id[i] && id <= item.client_max_id[i]) return item.client_name[i];
            }
            return item.name;
        }

        // 查询物品图片资源key
        static ItemPath(id: number): string {
            let item = PlayerItemSystem.ItemConfig(id);
            if (item == null) return "";
            if (!item.hasOwnProperty("path")) return "";
            return item["path"];
        }

        // 查询物品品质等级
        static ItemQuality(id: number): number {
            let item = PlayerItemSystem.ItemConfig(id);
            if (item == null) return 0;
            if (!item.hasOwnProperty("quality")) return 0;
            return item["quality"];
        }

        // 查询物品外框
        static ItemFrame(id: number): string {
            let type = PlayerItemSystem.ItemType(id);
            let quality = PlayerItemSystem.ItemQuality(id);
            if (type == message.EGoodsType.GOODS_TYPE_GENERAL) { // 武将
                let aptitude: number = PlayerItemSystem.ItemConfig(id)["aptitude"];
                if (aptitude == 11) {
                    return UIConfig.UIConfig_Role.heroFrame[1];
                } else if (aptitude == 12) {
                    return UIConfig.UIConfig_Role.heroFrame[3];
                } else if (aptitude == 13) {
                    return UIConfig.UIConfig_Role.heroFrame[6];
                } else if (aptitude == 14) {
                    return UIConfig.UIConfig_Role.heroFrame[9];
                } else if (aptitude == 15) {
                    return UIConfig.UIConfig_Role.heroFrame[13];
                } else {
                    return UIConfig.UIConfig_Role.heroFrame[0];
                }
            } else if (type == message.EGoodsType.GOODS_TYPE_PARTNER) { // 羁绊卡
                return UIConfig.UIConfig_Role.itemFrame[quality];
            } else if (type == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) { // 武将信物
                return UIConfig.UIConfig_Soul[quality];
            } else if (TableEnum.Enum.PropCardPiece.indexOf(id) != -1) { // 卡片碎片
                return UIConfig.UIConfig_Soul[quality];
            } else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) { // 资源
                return UIConfig.UIConfig_Role.itemFrame[quality];
            } else if (type == message.EGoodsType.GOODS_TYPE_TRANSEFER) { // 礼盒
                return UIConfig.UIConfig_Role.itemFrame[quality];
            } else if (type == message.EGoodsType.GOODS_TYPE_CLIENT) { // 客户端用
                if (PlayerItemSystem.ItemConfig(id)["is_piece"] == 1) {
                    return PlayerItemSystem.ItemConfig(id)["frame"];
                } else {
                    return UIConfig.UIConfig_Role.itemFrame[quality];
                }
            } else if (TableEnum.Enum.PropAdviserPiece.indexOf(id) != -1) { // 神兵碎片
                return UIConfig.UIConfig_Soul[quality];
            } else if (Math.floor(id / 1000) == 37) {
                return UIConfig.UIConfig_Soul[quality];
            } else if (TableEnum.Enum.PropPotatoPiece.indexOf(id) != -1) { // 宝物碎片(万能徽章)
                return UIConfig.UIConfig_Role.itemFrame[quality];
            } else if (TableEnum.Enum.PropRole.indexOf(id) != -1) { // 人偶
                return UIConfig.UIConfig_Soul[quality];
            } else if (type == message.EGoodsType.GOODS_TYPE_POTATO) { // 卡片,特殊卡片处理
                if (PlayerItemSystem.ItemConfig(id)["rare_card"] != 0) {
                    return UIConfig.UIConfig_Role.item_rareCardFrame[PlayerItemSystem.ItemConfig(id)["rare_card"]];
                } else {
                    return UIConfig.UIConfig_Role.itemFrame[quality];
                }
            } else { // 普通物品
                return UIConfig.UIConfig_Role.itemFrame[quality];
            }
        }

        // 查询品质颜色
        static QualityColor(quality: number): number {
            if (quality <= 0) {
                return ConstantConfig_Common.Color.white
            } else if (quality <= 2) {
                return ConstantConfig_Common.Color.quality_green
            } else if (quality <= 5) {
                return ConstantConfig_Common.Color.quality_blue
            } else if (quality <= 8) {
                return ConstantConfig_Common.Color.quality_purple
            } else if (quality <= 12) {
                return ConstantConfig_Common.Color.quality_orange
            } else if (quality <= 16) {
                return ConstantConfig_Common.Color.quality_red
            } else if (quality <= 20) {
                return ConstantConfig_Common.Color.quality_gold
            } else {
                return ConstantConfig_Common.Color.quality_gold
            }
        }

        // 查询道具品质方框
        static QualityFrame(quality: number): string {
            let ret = UIConfig.UIConfig_Role.itemFrame[quality];
            if (ret == null || ret == undefined) return "";
            return ret;
        }

        //获取卡包所有id（以139开头的物品）
        static GetCardBag() {
            let cardbag = [];
            let tblCimelia = TableItemCimelia.Table();
            for (let k in tblCimelia) {
                if (Math.floor(tblCimelia[k].id / 1000) == 139)
                    cardbag.push(tblCimelia[k].id);
            }

            cardbag.sort((a, b) => {
                return b - a;
            });

            return cardbag;
        }

        // 排序用的取类型
        static Type2(id): number {
            return Math.floor((id / 10000));
        }
        // 物品表格
        static Table(id) {
            let t = PlayerItemSystem.ItemType(id);
            if (t == null) return null;
            if (t == message.EGoodsType.GOODS_TYPE_NONO) {
                console.log("item is a illegal type");
                console.log("item id is //> ", id);
                return null;
            }

            return this.ItemConfig(id);
        }
        // 物品数量
        static Count(id): number {
            if (id == 0 || Game.PlayerCardSystem.getGoodsById(id) == null) {
                return 0;
            } else if (id == 20002){
                return Game.PlayerInfoSystem.Token
            } else {
                return Game.PlayerCardSystem.getGoodsById(id).count;
            }
        }
        // 物品表格名称
        static TableName(id) {
            if (PlayerItemSystem.ItemType(id)) return null;

            let t = PlayerItemSystem.ItemType(id)
            if (t == message.EGoodsType.GOODS_TYPE_NONO) {
                console.log("item is a illegal type");
                console.log("item id is //> ", id);
                return null;
            }

            return this.ItemConfig(id);
        }
        // 物品表格索引对应的行
        static Item(id) {
            return PlayerItemSystem.ItemConfig(id);
            /*
            if (PlayerItemSystem.ItemConfig(id)) return null;
            let data = this.Table(id);
            let tableName = this.TableName(id);
            return data;
            //return Helper.dbii(data, id, tableName);
            */
        }

        //资源数量
        static Resource(id) {

            if (PlayerItemSystem.ItemType(id) != message.EGoodsType.GOODS_TYPE_RESOURCE) {
                return 0;
            } else {
                let item: any = PlayerItemSystem.Item(id);
                return Game.PlayerInfoSystem.BaseInfo[item.tag];
            }
        }

        static Str_Resoure(id) {
            let count = PlayerItemSystem.Resource(id);
            let str_count = "";
            let COUNT_WAN = 100000;
            let COUNT_WAN_DIV = 10000;
            let COUNT_QIAN_DIV = 1000;
            let COUNT_WAN_STR = TextsConfig.TextsConfig_Common.wan;

            if (count < COUNT_WAN) {
                str_count = Helper.StringFormat("%d", count);
            } else if (count % COUNT_WAN_DIV - count % COUNT_QIAN_DIV == 0) {
                str_count = Helper.StringFormat("%d%s", Math.floor(count / COUNT_WAN_DIV), COUNT_WAN_STR);
            } else {
                str_count = Helper.StringFormat("%s%s", (count / COUNT_WAN_DIV).toFixed(1), COUNT_WAN_STR);
            }

            return str_count;
        }

        //神秘物品
        static ItemMysteriousItem() {
            let _QUALITY = 4;
            let ret = {
                Frame: null,
                Clip: null,
                Info: {
                    name: null
                },
                Count: null
            };

            ret.Frame = UIConfig.UIConfig_Common.itemFrame[_QUALITY];
            ret.Clip = UIConfig.UIConfig_Common.item_unknow[_QUALITY];
            ret.Info.name = TextsConfig.TextsConfig_Wanted.goods;
            return ret;

        }

        //物品显示信息
        //itemId(number) 物品ID
        //show(number)  显示光效
        //count(num)     资源用的不同数量的资源显示不同的颜色框
        static Set(itemId: number, show?: number, count?: number) {
            if (itemId == TableEnum.Enum.MysteriousId) {
                return PlayerItemSystem.ItemMysteriousItem();
            }

            let itemSet = {
                // 默认
                Type: PlayerItemSystem.Type2(itemId),
                Info: PlayerItemSystem.Item(itemId),
                Path: PlayerItemSystem.ItemPath(itemId),
                Count: PlayerItemSystem.Count(itemId),
                TypeDes: PlayerItemSystem.ItemTypeDesc(itemId),
                Clip: UIConfig.UIConfig_Common.nothing,
                Frame: UIConfig.UIConfig_Common.nothing,
                Sel: UIConfig.UIConfig_Common.nothing,
                Mask: UIConfig.UIConfig_Common.nothing,
                Logo: UIConfig.UIConfig_Common.nothing,

                Red: null,
                Use: null,
                FruitID: null,
                QualityForFrame: null

            };
            let item: any = PlayerItemSystem.Item(itemId);
            itemSet.Red = item.red_tips != null && item.red_tips != 0;
            itemSet.Use = item.use_tips != null && item.use_tips != 0;
            itemSet.FruitID = item.fruit_id != null && item.fruit_id || "";
            itemSet.QualityForFrame = item.quality;

            // 武将
            if (itemSet.Type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                itemSet.Clip = PlayerHunterSystem.MapInstance(PlayerHunterSystem.Table(itemId).general_roleId).head_path;
                itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[0]
                let gnritem: any = PlayerItemSystem.ItemConfig(itemId);
                let gnr_aptitude = TableBaseGeneral.Item(itemId % CommonConfig.general_id_to_index_multiple).aptitude// gnritem.quality + 9;
                if (gnr_aptitude == 11) {
                    itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[1]
                }
                else if (gnr_aptitude == 12) {
                    itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[3]
                }
                else if (gnr_aptitude == 13) {
                    itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[6]
                }
                else if (gnr_aptitude == 14) {
                    itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[9]
                }
                else if (gnr_aptitude == 15) {
                    itemSet.Frame = UIConfig.UIConfig_Role.heroFrame[13]
                }
                itemSet.Count = 0;

            }

            // 羁绊卡
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_PARTNER) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality];
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul;
                itemSet.Mask = UIConfig.UIConfig_Role.mask.soul;
            }

            // 武将信物
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Soul[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul
            }

            // 卡片碎片
            else if (Table.VIn(TableEnum.Enum.PropCardPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Soul[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul
            }


            // 资源
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.normal
                itemSet.Mask = UIConfig.UIConfig_Role.mask.normal
                itemSet.Count = PlayerItemSystem.Resource(itemId)
            }

            // 礼盒
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_TRANSEFER) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.normal
                itemSet.Mask = UIConfig.UIConfig_Role.mask.normal
                itemSet.Count = PlayerItemSystem.Count(itemId)
                itemSet.Red = item.red_tips != null && item.red_tips != 0
            }

            // 客户端用
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                if (item.is_piece == 1) {
                    itemSet.Clip = item.path;
                    itemSet.Frame = item.frame
                }
                else {
                    itemSet.Clip = item.path;
                    itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                }
                itemSet.Sel = UIConfig.UIConfig_Role.sel.normal

                itemSet.Count = PlayerItemSystem.Count(itemId)

            }

            // 神兵碎片
            else if (Table.VIn(TableEnum.Enum.PropAdviserPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.pieceFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul

                itemSet.Mask = UIConfig.UIConfig_Role.mask.soul
            }

            // 装备碎片
            else if (Math.floor(itemId / 1000) == 37) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.pieceFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul

                itemSet.Mask = UIConfig.UIConfig_Role.mask.soul
            }

            // 宝物碎片(万能徽章)
            else if (Table.VIn(TableEnum.Enum.PropPotatoPiece, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul
            }

            //人偶
            else if (Table.VIn(TableEnum.Enum.PropRole, itemId)) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.pieceFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.soul
                itemSet.Mask = UIConfig.UIConfig_Role.mask.normal
            }

            // 卡片，特殊卡片处理
            else if (itemSet.Type == message.EGoodsType.GOODS_TYPE_POTATO) {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.normal
                itemSet.Mask = UIConfig.UIConfig_Role.mask.normal

                if (item.rare_card != 0) {
                    itemSet.Frame = UIConfig.UIConfig_Role.item_rareCardFrame[item.rare_card]
                }
            }

            // 普通物品
            else {
                itemSet.Clip = item.path;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[item.quality]
                itemSet.Sel = UIConfig.UIConfig_Role.sel.normal
                itemSet.Mask = UIConfig.UIConfig_Role.mask.normal
            }

            let _MAX_FRAME = 5;
            // frame for resource
            if (count != null && count > 0 && itemSet.Type == message.EGoodsType.GOODS_TYPE_RESOURCE && itemId < 20020) {
                let info: any = PlayerItemSystem.Item(itemId)
                //查表，不同数量资源，显示不同框
                let [_, frame] = Table.FindR(info.show_type, function (k, v) {
                    return count < v;
                })
                frame = frame != null ? (frame) : _MAX_FRAME;
                itemSet.Frame = UIConfig.UIConfig_Role.itemFrame[frame]
                itemSet.QualityForFrame = frame
            }

            return itemSet

        }

        static itemTableName = {
            [1]: "TableItemGeneral",
            [2]: "TableItemResource",
            [3]: "TableItemProp",
            [4]: "TableItemGeneralSoul",
            [6]: "TableItemPartner",
            [7]: "TableItemProp",
            [8]: "TableItemProp",
            [9]: "TableItemProp",
            [10]: "TableItemPotato",
            [11]: "TableItemCollect",
            [12]: "TableItemCimelia",
            [13]: "TableItemCimelia",
            [14]: "TableItemPic",
            [15]: "TableItemPicFrame",
            [16]: "TableItemTitle",
            [17]: "TableItemSecret",
            [18]: "TableItemFashion",
            [19]: "TableItemTransfer",
            [20]: "TableItemClient"
        };

        static PackageType(): { [key: string]: TableClientTypePackage } {
            return TableClientTypePackage.Table();
        }

        static GoodsForPackage(): { "id": number, "count": number, "quality": number }[][] {
            let ret = [];
            let typeData = PlayerItemSystem.PackageType();
            for (let i = 0; i < Object.keys(typeData).length; i++) {
                let goodsList = Game.PlayerItemSystem.goodsWithType(i + 1);
                ret.push(goodsList);
            }
            return ret;
        }

        // 获取资源种类 ID
        static UseOfResource(id): number {
            if (Math.floor(id / 10000) == message.EGoodsType.GOODS_TYPE_PROP) {
                let info = PlayerItemSystem.ItemConfig(id);
                if (info["money"] != "") {
                    return message.EResourceType.RESOURCE_MONEY;
                }
                else if (info["power"] != "") {
                    return message.EResourceType.RESOURCE_POWER;
                }
            }
        }

        /**
         * 列表数据补齐
         * @param count 总数
         * @param min 最小个数
         * @param row 列数
         * 
         * @description 防止不占满一屏幕感觉空
         */
        public static FixCount(count, min, row) {
            let fix = 0;
            if (count <= min) {
                fix = min - count;
            } else if (count % row > 0) {
                fix = row - (count % row);
            }
            return fix;
        }

        public static GetNormalPic(type: number): number[] {
            let arr = [];
            let tblPic = TableItemPic.Table();
            for (let k in tblPic) {
                if (tblPic[k].type == type) {
                    arr.push(k);
                }
            }

            return arr.sort();
        }


        /**高级头像 */
        public static GetHighPic() {
            let tbl = [];
            let picIds = [];
            let picTbl = TableItemPic.Table();
            let generalTbl = TableBaseGeneral.Table();
            for (let k in picTbl) {
                if (picTbl.hasOwnProperty(k)) {
                    let v = picTbl[k];
                    if (v.type == 2) {
                        tbl.push({ key: Number(k), value1: 0, value2: 0 })
                    }
                }
            }
            for (let k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    let v = tbl[k];
                    let find = Table.FindF(Game.PlayerWonderLandSystem.otherAttri.picIds, (k, value) => {
                        return value == v.key;
                    })
                    tbl[k].value1 = find ? 1 : 0;
                }
            }
            for (let k in generalTbl) {
                if (generalTbl.hasOwnProperty(k)) {
                    let v = generalTbl[k];
                    let vk = Table.FindR(tbl, (kk, vv) => {
                        return vv.key == v.pic_id;
                    })
                    if (vk[0] != null) {
                        tbl[vk[1]].value2 = v.aptitude;
                    }
                }
            }

            let sort = (a, b) => {
                if (a.value1 == b.value1) {
                    if (a.value2 == b.value2) {
                        return a.key - b.key
                    } else {
                        return b.value2 - a.value2
                    }
                } else {
                    return b.value1 - a.value1
                }

            }
            tbl.sort(sort);
            for (let k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    let v = tbl[k];
                    picIds.push(v.key);
                }
            }
            return picIds;
        }

        /**变身头像 */
        public static GetTransPic() {
            let tbl = [];
            let picTbl = TableItemPic.Table();
            for (let k in picTbl) {
                if (picTbl.hasOwnProperty(k)) {
                    let v = picTbl[k];
                    if (v.type == 4) {
                        tbl.push(k);
                    }
                }
            }
            tbl.sort(function (a, b) {
                return a - b;
            });
            return tbl;
        }

        public static Title(id: number): string {
            if (id == 0) {
                return TextsConfig.TextsConfig_Rank.pop_title_effects;
            }
            if (PlayerItemSystem.ItemType(id) == message.EGoodsType.GOODS_TYPE_TITLE) {
                return (PlayerItemSystem.Item(id) as any).name;
            }
            return TextsConfig.TextsConfig_Rank.pop_title_effects;
        }

        // 计算物品 NumID
        static GoodsNumID(goodsId: number): string {
            // 果实类
            if (TableClientTypePackage.Item(6)["itemId"].indexOf(goodsId) != -1) {
                return (goodsId % 100).toString();
            }
            // 其他
            return "";
        }

        // 物品遮罩
        static IsImgMask(goodsId: number): boolean {
            if (PlayerItemSystem.ItemType(goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL_SOUL
                || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }

            return false;
        }

        // 徽章遮罩
        static IsRectMask(goodsId: number): boolean {
            if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }

            return false;
        }

        static MergeItem(goods: Array<message.GoodsInfo>) {
            let ret: Array<message.GoodsInfo> = [];
            for (const v of goods) {
                let item: message.GoodsInfo = Table.FindR(ret, function (kk, vv) {
                    return v.goodsId == vv.goodsId;
                })[0];
                if (item) {
                    item.count = item.count + v.count;
                } else {
                    let tmp = new message.GoodsInfo();
                    tmp.goodsId = v.goodsId;
                    tmp.count = v.count;
                    tmp.index = 0;
                    tmp.showType = 0;
                    ret.push(tmp);
                }
            }
            return ret;
        }



        //获得仙境果子所有ID（以131开头的物品）
        public getWonderlandFruit() {
            let fruit = [];
            let tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let k in tbl_cimelia) {
                let v = tbl_cimelia[k];
                fruit.push(v.id);
            }
            fruit.sort((a, b) => {
                return a - b;
            });
            return fruit;
        }

        /**
         * 获取仙境果子所有id拥有的（以131开头的物品）
         * */
        public getWonderlandFruits() {
            let fruit = [];
            let tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let k in tbl_cimelia) {
                let v = tbl_cimelia[k];
                if (Game.PlayerItemSystem.mapGoodsInfo[v.id] != null) {
                    if (Table.VIn(TableEnum.Enum.FruitIds, v.id) && Game.PlayerItemSystem.mapGoodsInfo[v.id].count > 0) {
                        fruit.push(v.id);
                    }
                }
            }
            fruit.sort((a, b) => {
                return a - b;
            });
            return fruit;
        }

        //获取果子（以131开头的物品）按照type
        public getWonderlandFruitByType(type) {
            let fruit = this.getWonderlandFruit();
            let _type = type == null && 0 || type;
            let _fruit = [];
            if (type == -1) {
                for (let k in fruit) {
                    let v = fruit[k];
                    let goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = Game.PlayerItemSystem.mapGoodsInfo[v].count;
                    if (goods.count > 0) {
                        _fruit.push(goods);
                    }
                }
            } else {
                for (let k in fruit) {
                    let v = fruit[k];
                    let goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = Game.PlayerItemSystem.mapGoodsInfo[v].count;
                    if (Math.floor(v / 100) == 131 * 10 + _type && goods.count > 0) {
                        _fruit.push(goods);
                    }
                }
            }
            return _fruit;
        }

        ///////////////////////////////////////////////////////////////////////////
        // 私有变量

        public mapGoodsInfo: { [id: number]: message.GoodsInfo } = {}; // 物品信息


        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_GOODS_INFO_CHANGE, this.onGoodsInfoChange, this);
        }

        public uninit() {
            this.mapGoodsInfo = {};
        }

        private onGoodsInfoChange(ev: PlayerGoodsInfoChangeEvent) {
            for (let goods of ev.goodsInfo) {
                this.mapGoodsInfo[goods.goodsId] = goods;
            }
            for (let i = 0; i < ev.delGoods.length; i++) {
                delete this.mapGoodsInfo[ev.delGoods[i]];
            }

            this.setInfoMapinfo();
        }

        //设置资源映射到物品表
        public setInfoMapinfo() {
            let tblres = TableItemResource.Table();
            for (const k in tblres) {
                const v = tblres[k];
                let goods = new message.GoodsInfo();
                goods.goodsId = v.id;
                goods.count = Game.PlayerInfoSystem.BaseInfo[v.tag];
                this.mapGoodsInfo[v.id] = goods;
            }

        }

        // 查询物品信息
        public queryItem(id: number) {
            return this.mapGoodsInfo[id];
        }

        // 玩家拥有物品数量
        public itemCount(id: number): number {
            let item = this.mapGoodsInfo[id];
            if (item == null || item == undefined) return 0;
            return item.count;
        }

        // 获取背包物品列表
        public goodsWithType(index: number): { "id": number, "count": number, "quality": number }[] {
            let tmpList = [];
            let goodsList = [];
            let typeData = TableClientTypePackage.Item(index);

            // get item type
            if (typeData.itemType[0] != 0) {
                for (let typeId of typeData.itemType) {
                    let itemAll = egret.getDefinitionByName(PlayerItemSystem.itemTableName[typeId]).Table();
                    for (let key of Object.keys(itemAll)) {
                        tmpList.push(itemAll[key].id);
                    }
                }
            }

            // get item id
            if (typeData.itemId[0] != 0) {
                for (let id of typeData.itemId) {
                    tmpList.push(id);
                }
            }

            for (let i = 0; i < tmpList.length; i++) {
                if (!this.mapGoodsInfo.hasOwnProperty(tmpList[i])) continue;
                let quality = PlayerItemSystem.ItemQuality(tmpList[i]);
                let count = this.mapGoodsInfo[tmpList[i]]["count"];
                if (count == undefined) continue;
                tmpList[i] = {
                    "id": tmpList[i],
                    "count": count,
                    "quality": quality
                };
            }

            // 按品质排序
            tmpList.sort((a, b) => {
                return (a.quality == b.quality && a.id - b.id || b.quality - a.quality)
            });

            // 过滤
            for (let v of tmpList) {
                if (v.count > 0) goodsList.push(v);
            }

            return goodsList;
        }

        public TableAllItem(t) {
            if (ckid(t)) return null;
            return TableItemCimelia.Table();
        }

        public HasCardBag() {
            let h_cardBag = false;
            let tbl_cardBag = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let [k, v] of HelpUtil.GetKV(tbl_cardBag)) {
                if (Math.floor(v.id / 1000) == 139 && PlayerItemSystem.Count(v.id) > 0) {
                    return true;
                }
            }
            return h_cardBag;
        }

        public GetWonderlandFruit() {
            let fruit = [];
            let tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let [k, v] of HelpUtil.GetKV(tbl_cimelia)) {
                if (Table.VIn(TableEnum.Enum.FruitIds, v.id)) {
                    fruit.push(v.id);
                }
            }

            fruit.sort((a: number, b: number) => {
                return a - b;
            });

            return fruit;
        }

        public GetWonderlandFruitByType(type: number, exceptCount?) {
            let fruit = this.GetWonderlandFruit();
            let _type = type == null ? 0 : type;
            let _fruit = [];
            if (type == -1) {
                for (let [k, v] of HelpUtil.GetKV(fruit)) {
                    let goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = PlayerItemSystem.Count(v);
                    if (goods.count > 0 || exceptCount) {
                        _fruit.push(goods);
                    }
                }
            }
            else {
                for (let [k, v] of HelpUtil.GetKV(fruit)) {
                    let goods = new message.GoodsInfo();
                    goods.goodsId = v;
                    goods.count = PlayerItemSystem.Count(v);
                    if (Math.floor(v / 100) == 131 * 10 + _type && (goods.count > 0 || exceptCount)) {
                        _fruit.push(goods);
                    }
                }
            }
            return _fruit;
        }

        ///////////////////////////////////////////////////////////////////////////
        // 网络协议请求

        // 出售物品
        public sellGoods(goodses: [message.GoodsInfo]): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SellGoodsRequest();
                request.body.goodses = goodses;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SellGoodsResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false);
            });
        }

        // 使用道具
        public useProp(goodses: [message.GoodsInfo]): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.UsePropRequest();
                request.body.goodses = goodses;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.UsePropResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false);
            });
        }

        // 快速购买
        public quickMall(id: number, num: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.QuickMallRequest();
                request.body.item_id = id;
                request.body.item_num = num;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QuickMallResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false);
            });
        }

        /**获取魔域魔匣所有id（以136开头的物品） */
        public GetWonderlandDemon() {
            let demon = [];
            let tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let k in tbl_cimelia) {
                if (tbl_cimelia.hasOwnProperty(k)) {
                    let v = tbl_cimelia[k];
                    if (Math.floor(v.id / 1000) == 136) {
                        demon.push(v.id)
                    }
                }
            }
            demon.sort((a, b) => {
                return a - b;
            })
            return demon;
        }

        /**获取盗贼的宝藏cimelia表 */
        public GetWonderlandRogue() {
            let rogue = [];
            let tbl_cimelia = this.TableAllItem(message.EGoodsType.GOODS_TYPE_CIMELIA);
            for (let k in tbl_cimelia) {
                if (tbl_cimelia.hasOwnProperty(k)) {
                    let v = tbl_cimelia[k];
                    if (Table.VIn(TableEnum.Enum.Rogue, v.id)) {
                        rogue.push(v.id)
                    }
                }
            }
            rogue.sort((a, b) => {
                return a - b;
            })
            return rogue;
        }

    }
}