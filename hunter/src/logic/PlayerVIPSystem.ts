namespace zj {
    // VIP系统
    // hexiaowei 创建于2019.01.02

    export class PlayerVIPSystem {
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        public static Level(vipLv?) {
            let lv = vipLv != null ? vipLv : Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            return TableLicence.Item(lv);
        }

        public static LowLevel(vipLv?) {
            let lv = vipLv != null ? vipLv : Game.PlayerInfoSystem.BaseInfo.vipLevel;
            return TableVipinfo.Item(lv);
        }

        public static LowItem() {
            if (ckid(Game.PlayerInfoSystem.BaseInfo.vipLevel)) return null;
            return TableVipinfo.Item(Game.PlayerInfoSystem.BaseInfo.vipLevel);
        }

        public static WealItem(id) {
            if (ckid(id)) return null;
            return Game.ConfigManager.getTable(StringConfig_Table.vipWeal + ".json")[id];
        }
        public static LowWealItem(id) {
            if (ckid(id)) return null;
            return TableVipWeal.Item(id)//  Game.ConfigManager.getTable(StringConfig_Table.LowVipWeal + ".json")[id];
        }

        public static Item(level?: number) {
            if (level == null) {
                level = Game.PlayerInfoSystem.BaseInfo.level;
            }

            if (ckid(level)) return null;
            return TableLevel.Item(level);
        }

        public static ItemNew(): TableLicence {
            return TableLicence.Item(Game.PlayerInfoSystem.BaseInfo.licenceLevel);
        }

        public static StrVip(level: number) {
            let vipInfo = PlayerVIPSystem.Level(level);
            let strVip = [];
            let treeInfo = PlayerVIPSystem.TreeGet(level);
            {//探索任务数量
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[9]];
                if (count != 0) {
                    let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[14], count);
                    strVip.push(str);
                }
            }
            {//猜拳
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[3]];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[62], count);
                strVip.push(str);
            }
            {//好友、仇人数量上限
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[4]];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[60], count);
                strVip.push(str);
            }
            {//好友领体力
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[5]];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[64], count);
                strVip.push(str);
            }
            {//招财次数
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[6]];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[66], count);
                strVip.push(str);
            }
            {//招财暴击率
                let crit = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[7]];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[53], crit[0][0], crit[0][crit[0].length - 1]);
                strVip.push(str);
            }
            {//XX之树产量提升至X倍
                let crit = vipInfo[TextsConfig.TextsConfig_Vip.vip_tag[8]];
                let str = null;
                if (treeInfo[0].length == 1) {
                    let name = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[67], name, treeInfo[1][0]);
                } else if (treeInfo[0].length == 2) {
                    let name1 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    let name2 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[68], name1, treeInfo[1][0], name2, treeInfo[1][1]);
                } else if (treeInfo[0].length == 3) {
                    let name1 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    let name2 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    let name3 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][2]];
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[69], name1, treeInfo[1][0], name2, treeInfo[1][1], name3, treeInfo[1][2]);
                } else if (treeInfo[0].length == 4) {
                    let name1 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    let name2 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    let name3 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][2]];
                    let name4 = TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][3]];
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.vip_string[70], name1, treeInfo[1][0], name2, treeInfo[1][1], name3, treeInfo[1][2], name4, treeInfo[1][3]);
                }
                if (str != null) {
                    strVip.push(str);
                }
            }
            return strVip;
        }

        private static TreeGet(level: number) {
            let list = [[], []];
            let vipInfo = TableLicence.Table();
            let treeInfo1 = vipInfo[level - 1].tree_cirt;
            let treeInfo2 = vipInfo[level].tree_cirt;
            for (var kk in treeInfo1) {
                if (treeInfo1.hasOwnProperty(kk)) {
                    var vv = treeInfo1[kk];
                    for (var k in treeInfo2) {
                        if (treeInfo2.hasOwnProperty(k)) {
                            var v = treeInfo2[k];
                            if (kk == k && vv[1] != v[1]) {
                                list[0].push(k);
                                list[1].push(v[1]);
                            }
                        }
                    }
                }
            }
            return list;
        }

        public static GetMaxLevel() {
            return TableVipinfo.Table()[Object.keys(TableVipinfo.Table()).length - 1].level;
        }

        //至尊星耀特权
        public static DesVip(level) {
            let vipInfo = PlayerVIPSystem.LowLevel(level);
            let strVip = [];

            //特殊奖励
            if (vipInfo.text1[0] != 0) {
                for (let k in vipInfo.text1) {
                    let v = vipInfo.text1[k];
                    if (v != 501 && v != 515 && v != 516 && v != 517) {
                        strVip.push(TextsConfig.TextsConfig_Vip.vip_string[v]);
                    }
                }
            }
            //特殊权利
            if (vipInfo.text2[0] != 0) {
                for (let k in vipInfo.text2) {
                    let v = vipInfo.text2[k];
                    if (v != 501 && (v < 502 && v > 514) && v != 515 && v != 516 && v != 517 && v != 518) {
                        strVip.push(TextsConfig.TextsConfig_Vip.vip_string[v]);
                    }
                }
            }
            //购买体力次数
            {
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_title[13]];
                let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_des[13], count);
                strVip.push(str);
            }
            //探索任务数量
            {
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_title[14]];
                if (count != 0) {
                    let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_des[14], count);
                    strVip.push(str);
                }
            }
            //免费重新猜拳
            {
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_title[7]];
                let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_des[7], count);
                strVip.push(str);
            }
            //猎人仓库容量
            {
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_title[9]];
                let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_des[9], count);
                strVip.push(str);
            }
            //跨服战可购买次数
            {
                let count = vipInfo[TextsConfig.TextsConfig_Vip.vip_title[11]];
                let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_des[11], count);
                strVip.push(str);
            }
            //结尾
            if (level > 0) {
                let strTail = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.lowvip_tail, level - 1);
                strVip.push(strTail);
            }


            return strVip;
        }

        public static HaloItem(haloId) {
            return TableHalo.Item(haloId);// StringConfig_Table.vipHalo
        }

        public static GetFashionInfo(id) {
            return TableItemFashion.Item(id);
        }

        public static GetMapRoleInfo(info) {
            let picTable = TableItemPic.Table();  // StringConfig_Table.itemHead
            let picMapRoleId = null;
            if (picTable[info["picId"]]) {
                picMapRoleId = picTable[info["picId"]].mapRole_id;
            }

            let fashionMapRoleInfo = null;
            if (info["fashionId"] != 0) {
                fashionMapRoleInfo = PlayerVIPSystem.GetFashionInfo(info["fashionId"]);
            }

            let fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return picMapRoleId || fashionMapRoleId;
        }
        public static League_FishingRefresh() {
            let level = Game.PlayerVIPSystem.Find_Open_Level("fishing_refresh");
            return Helper.StringFormat(TextsConfig.TextConfig_League.fish_vip_refresh, level);
        }

        ///////////////////////////////////////////////////////////////////////////
        // 变量
        private vipInfo_: message.LicenceInfo = null; //  Vip类型
        public lastPower: number = 0; // 上次体力刷新时间

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_LICENCE_INFO_CHANGE, this.onLicenceInfoChange, this);
        }

        public uninit() {
            this.vipInfo_ = null;
        }

        private onLicenceInfoChange(ev: egret.Event) {
            let licence = <message.LicenceInfo>ev.data;
            this.vipInfo = licence;
        }
        //查找开启等级
        public Find_Open_Level(tag) {
            let infos = Game.ConfigManager.getTable(StringConfig_Table.vip + ".json");
            let level = 0;
            for (let i = 0; i < Object.keys(infos).length; i++) {
                if (infos[i][tag] > 0)
                    level = infos[i].level;
            }
            return level;
        }

        public set vipInfo(v: message.LicenceInfo) {
            this.vipInfo_ = v;
        }

        public get vipInfo(): message.LicenceInfo {
            return this.vipInfo_;
        }

        public NextFastFormatOpenLevel() {
            for (let i = Game.PlayerInfoSystem.BaseInfo.level + 1; i <= CommonConfig.role_max_level; i++) {
                if (PlayerVIPSystem.Item(i).scene_formation > PlayerVIPSystem.Item().scene_formation) {
                    return i;
                }
            }
            return -1;
        }

        public lowVipBuyWealReward(weal_level: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LowVipBuyWealRequest();
                request.body.weal_level = weal_level;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LowVipBuyWealResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        console.log(response);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        public bigVipReward(starLevel: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.BigVipRewardRequest();
                request.body.star_level = starLevel;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.BigVipRewardResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        public setHalo(haloId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SetHaloRequest();
                request.body.halo_id = haloId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SetHaloResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        public modifyRolePic(picId: number, picFrame: number, titleId: number, viceTitleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.ModifyRolePicRequest();
                request.body.picId = picId;
                request.body.picFrame = picFrame;
                request.body.titleId = titleId;
                request.body.viceTitleId = viceTitleId;


                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.ModifyRolePicResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

    }
}