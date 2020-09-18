var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // VIP系统
    // hexiaowei 创建于2019.01.02
    var PlayerVIPSystem = (function () {
        function PlayerVIPSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.vipInfo_ = null; //  Vip类型
            this.lastPower = 0; // 上次体力刷新时间
        }
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        PlayerVIPSystem.Level = function (vipLv) {
            var lv = vipLv != null ? vipLv : zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            return zj.TableLicence.Item(lv);
        };
        PlayerVIPSystem.LowLevel = function (vipLv) {
            var lv = vipLv != null ? vipLv : zj.Game.PlayerInfoSystem.BaseInfo.vipLevel;
            return zj.TableVipinfo.Item(lv);
        };
        PlayerVIPSystem.LowItem = function () {
            if (zj.ckid(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel))
                return null;
            return zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel);
        };
        PlayerVIPSystem.WealItem = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.Game.ConfigManager.getTable(zj.StringConfig_Table.vipWeal + ".json")[id];
        };
        PlayerVIPSystem.LowWealItem = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.TableVipWeal.Item(id); //  Game.ConfigManager.getTable(StringConfig_Table.LowVipWeal + ".json")[id];
        };
        PlayerVIPSystem.Item = function (level) {
            if (level == null) {
                level = zj.Game.PlayerInfoSystem.BaseInfo.level;
            }
            if (zj.ckid(level))
                return null;
            return zj.TableLevel.Item(level);
        };
        PlayerVIPSystem.ItemNew = function () {
            return zj.TableLicence.Item(zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel);
        };
        PlayerVIPSystem.StrVip = function (level) {
            var vipInfo = PlayerVIPSystem.Level(level);
            var strVip = [];
            var treeInfo = PlayerVIPSystem.TreeGet(level);
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[9]];
                if (count != 0) {
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[14], count);
                    strVip.push(str);
                }
            }
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[3]];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[62], count);
                strVip.push(str);
            }
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[4]];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[60], count);
                strVip.push(str);
            }
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[5]];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[64], count);
                strVip.push(str);
            }
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[6]];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[66], count);
                strVip.push(str);
            }
            {
                var crit = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[7]];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[53], crit[0][0], crit[0][crit[0].length - 1]);
                strVip.push(str);
            }
            {
                var crit = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_tag[8]];
                var str = null;
                if (treeInfo[0].length == 1) {
                    var name_1 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[67], name_1, treeInfo[1][0]);
                }
                else if (treeInfo[0].length == 2) {
                    var name1 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    var name2 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[68], name1, treeInfo[1][0], name2, treeInfo[1][1]);
                }
                else if (treeInfo[0].length == 3) {
                    var name1 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    var name2 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    var name3 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][2]];
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[69], name1, treeInfo[1][0], name2, treeInfo[1][1], name3, treeInfo[1][2]);
                }
                else if (treeInfo[0].length == 4) {
                    var name1 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][0]];
                    var name2 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][1]];
                    var name3 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][2]];
                    var name4 = zj.TextsConfig.TextsConfig_Vip.vip_tree_name[treeInfo[0][3]];
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.vip_string[70], name1, treeInfo[1][0], name2, treeInfo[1][1], name3, treeInfo[1][2], name4, treeInfo[1][3]);
                }
                if (str != null) {
                    strVip.push(str);
                }
            }
            return strVip;
        };
        PlayerVIPSystem.TreeGet = function (level) {
            var list = [[], []];
            var vipInfo = zj.TableLicence.Table();
            var treeInfo1 = vipInfo[level - 1].tree_cirt;
            var treeInfo2 = vipInfo[level].tree_cirt;
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
        };
        PlayerVIPSystem.GetMaxLevel = function () {
            return zj.TableVipinfo.Table()[Object.keys(zj.TableVipinfo.Table()).length - 1].level;
        };
        //至尊星耀特权
        PlayerVIPSystem.DesVip = function (level) {
            var vipInfo = PlayerVIPSystem.LowLevel(level);
            var strVip = [];
            //特殊奖励
            if (vipInfo.text1[0] != 0) {
                for (var k in vipInfo.text1) {
                    var v = vipInfo.text1[k];
                    if (v != 501 && v != 515 && v != 516 && v != 517) {
                        strVip.push(zj.TextsConfig.TextsConfig_Vip.vip_string[v]);
                    }
                }
            }
            //特殊权利
            if (vipInfo.text2[0] != 0) {
                for (var k in vipInfo.text2) {
                    var v = vipInfo.text2[k];
                    if (v != 501 && (v < 502 && v > 514) && v != 515 && v != 516 && v != 517 && v != 518) {
                        strVip.push(zj.TextsConfig.TextsConfig_Vip.vip_string[v]);
                    }
                }
            }
            //购买体力次数
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_title[13]];
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_des[13], count);
                strVip.push(str);
            }
            //探索任务数量
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_title[14]];
                if (count != 0) {
                    var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_des[14], count);
                    strVip.push(str);
                }
            }
            //免费重新猜拳
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_title[7]];
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_des[7], count);
                strVip.push(str);
            }
            //猎人仓库容量
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_title[9]];
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_des[9], count);
                strVip.push(str);
            }
            //跨服战可购买次数
            {
                var count = vipInfo[zj.TextsConfig.TextsConfig_Vip.vip_title[11]];
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_des[11], count);
                strVip.push(str);
            }
            //结尾
            if (level > 0) {
                var strTail = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.lowvip_tail, level - 1);
                strVip.push(strTail);
            }
            return strVip;
        };
        PlayerVIPSystem.HaloItem = function (haloId) {
            return zj.TableHalo.Item(haloId); // StringConfig_Table.vipHalo
        };
        PlayerVIPSystem.GetFashionInfo = function (id) {
            return zj.TableItemFashion.Item(id);
        };
        PlayerVIPSystem.GetMapRoleInfo = function (info) {
            var picTable = zj.TableItemPic.Table(); // StringConfig_Table.itemHead
            var picMapRoleId = null;
            if (picTable[info["picId"]]) {
                picMapRoleId = picTable[info["picId"]].mapRole_id;
            }
            var fashionMapRoleInfo = null;
            if (info["fashionId"] != 0) {
                fashionMapRoleInfo = PlayerVIPSystem.GetFashionInfo(info["fashionId"]);
            }
            var fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return picMapRoleId || fashionMapRoleId;
        };
        PlayerVIPSystem.League_FishingRefresh = function () {
            var level = zj.Game.PlayerVIPSystem.Find_Open_Level("fishing_refresh");
            return zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_vip_refresh, level);
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerVIPSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LICENCE_INFO_CHANGE, this.onLicenceInfoChange, this);
        };
        PlayerVIPSystem.prototype.uninit = function () {
            this.vipInfo_ = null;
        };
        PlayerVIPSystem.prototype.onLicenceInfoChange = function (ev) {
            var licence = ev.data;
            this.vipInfo = licence;
        };
        //查找开启等级
        PlayerVIPSystem.prototype.Find_Open_Level = function (tag) {
            var infos = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.vip + ".json");
            var level = 0;
            for (var i = 0; i < Object.keys(infos).length; i++) {
                if (infos[i][tag] > 0)
                    level = infos[i].level;
            }
            return level;
        };
        Object.defineProperty(PlayerVIPSystem.prototype, "vipInfo", {
            get: function () {
                return this.vipInfo_;
            },
            set: function (v) {
                this.vipInfo_ = v;
            },
            enumerable: true,
            configurable: true
        });
        PlayerVIPSystem.prototype.NextFastFormatOpenLevel = function () {
            for (var i = zj.Game.PlayerInfoSystem.BaseInfo.level + 1; i <= zj.CommonConfig.role_max_level; i++) {
                if (PlayerVIPSystem.Item(i).scene_formation > PlayerVIPSystem.Item().scene_formation) {
                    return i;
                }
            }
            return -1;
        };
        PlayerVIPSystem.prototype.lowVipBuyWealReward = function (weal_level) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LowVipBuyWealRequest();
                request.body.weal_level = weal_level;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        console.log(response);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerVIPSystem.prototype.bigVipReward = function (starLevel) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BigVipRewardRequest();
                request.body.star_level = starLevel;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerVIPSystem.prototype.setHalo = function (haloId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetHaloRequest();
                request.body.halo_id = haloId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerVIPSystem.prototype.modifyRolePic = function (picId, picFrame, titleId, viceTitleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ModifyRolePicRequest();
                request.body.picId = picId;
                request.body.picFrame = picFrame;
                request.body.titleId = titleId;
                request.body.viceTitleId = viceTitleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerVIPSystem;
    }());
    zj.PlayerVIPSystem = PlayerVIPSystem;
    __reflect(PlayerVIPSystem.prototype, "zj.PlayerVIPSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerVIPSystem.js.map