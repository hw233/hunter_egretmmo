var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // created by hhh in 2018/11/27
    var TipManager = (function () {
        function TipManager() {
        }
        TipManager.ShowCard = function (cardInfo) {
            zj.loadUI(zj.PlayerCardPopDialog)
                .then(function (dialog) {
                dialog.loadGet(cardInfo);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        TipManager.ShowCardNotGet = function (cardInfo, showPurple) {
            zj.loadUI(zj.PlayerCardPopDialog)
                .then(function (dialog) {
                dialog.loadNotGet(cardInfo, showPurple);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        /**
         * 显示确定和取消对话框
         *
         * @param msg 对话框信息
         * @param confirmCallback 确定回调
         * @param cancelCallback 取消回调
         */
        TipManager.ShowConfirmCancel = function (msg, confirmCallback, cancelCallback) {
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.setInfo(msg);
                dialog.setCB(confirmCallback, cancelCallback);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        /**
         * 连续战斗对话框
         * @param msg 对话框信息
         * @param confirmCallback 确定回调
         */
        TipManager.SuccessionBattlePopTip = function (msg1, msg2, msg3, confirmCallback) {
            zj.loadUI(zj.SuccessionBattlePopTip)
                .then(function (dialog) {
                dialog.setInfo(msg1, msg2, msg3);
                dialog.setCB(confirmCallback);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        TipManager.ShowResourcesInfo = function (node, uifather, types, cb, b_back) {
            if (typeof types === "number") {
                types = { types: types };
            }
            if (typeof cb === "function") {
                cb = { cb: cb };
            }
            else if (cb == null) {
                cb = {};
            }
            var item = uifather.AddSubWin("Common_OwnResource", "Start", node);
            item.SetFather(uifather);
            item.SetInfo(types, cb, b_back);
        };
        TipManager.RelationAdd = function (roleId, cb) {
            if (roleId != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                zj.Game.PlayerArenaSystem.relationAdd(roleId).then(function () {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.applySend);
                    if (cb != null)
                        cb();
                }).catch(function (reason) { });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.chat_self);
            }
        };
        TipManager.LeagueApply = function (leagueId, cb) {
            if (leagueId == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.no_league_to_join);
            }
            else if (zj.Game.PlayerInfoSystem.LeagueId == 0) {
                zj.Game.PlayerArenaSystem.leagueApply(leagueId).then(function () {
                    zj.toast_warning(zj.TextsConfig.TextConfig_League.applySend);
                    if (cb != null)
                        cb();
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.league_already);
            }
        };
        /**
         * 查看玩家详情
         * @param roleId 角色id
         * @param groupId 分区id
         * @param cb 回调函数
         */
        TipManager.ReqRoleInfo = function (roleId, groupId, cb) {
            zj.Game.PlayerInfoSystem.queryRoleInfo(roleId, groupId).then(function (msg) {
                if (msg.generals.length <= 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Common.noHunter);
                }
                else {
                    var name_1 = null;
                    if (zj.Game.Controller.groupOwnerID() != msg.baseInfo.server_id && msg.baseInfo.group_name != "") {
                        if (msg.baseInfo.group_name != "") {
                            // to do 
                            name_1 = msg.baseInfo.group_name;
                            name_1 = name_1.slice(name_1.indexOf(":") + 2, name_1.indexOf("&")) + "区" + name_1.slice(name_1.indexOf("&") + 1, name_1.indexOf("}") - 1);
                        }
                        else {
                            name_1 = zj.TextsConfig.TextsConfig_Chat.serverSelf;
                        }
                    }
                    else {
                        name_1 = zj.TextsConfig.TextsConfig_Chat.serverSelf;
                    }
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(msg, name_1, cb);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            });
        };
        TipManager.ShowGeneralDetails = function (info, cb) {
            zj.loadUI(zj.HeroDetailMain).then(function (dialog) {
                dialog.setInfo(info, cb);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**
         * @static 奖励详情页面  ShowTitle与这个方法合并了
         * @param {message.GoodsInfo} info 信息
         * @param {*} father 父类
         * @param {number} xy 子项点击位置相对于显示容器的 y 坐标
         * @param {number} cx 屏幕点击坐标 x
         * @param {number} cy 屏幕点击坐标 y
         * @returns
         * @memberof TipManager
         */
        TipManager.ShowProp = function (info, father, xy, cx, cy) {
            var commonDes = null;
            var type = zj.PlayerItemSystem.ItemType(info.goodsId);
            var isPiece = zj.Table.VIn(zj.TableEnum.Enum.PropCardPiece, info.goodsId) && !zj.Table.VIn(zj.TableEnum.Enum.PropCardPieceRandom, info.goodsId);
            if (isPiece) {
                commonDes = zj.newUI(zj.Common_PlayerCardPopB);
                commonDes.SetInfo(info.goodsId);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                commonDes.x = father.width / 2;
                commonDes.y = father.height / 2;
                return commonDes;
            }
            else if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                commonDes = zj.newUI(zj.CommonDesGeneral);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                }
                else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                    cx = zj.UIManager.StageWidth - commonDes.width / 2;
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                }
                else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                commonDes = zj.newUI(zj.Common_DesRes);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                }
                else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                    cx = zj.UIManager.StageWidth - commonDes.width / 2;
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                }
                else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;
            }
            else if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                commonDes = zj.newUI(zj.Common_DesRandom);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                }
                else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                    cx = zj.UIManager.StageWidth - commonDes.width / 2;
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                }
                else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;
            }
            else if (type == message.EGoodsType.GOODS_TYPE_TITLE) {
                commonDes = zj.newUI(zj.ArenaWholePop);
                commonDes.setInfo(info);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                }
                else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                    cx = zj.UIManager.StageWidth - commonDes.width / 2;
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                }
                else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 80;
                }
                return commonDes;
            }
            else if (type == message.EGoodsType.GOODS_TYPE_POTATO) {
                commonDes = zj.newUI(zj.Common_PlayerCardPop);
                commonDes.loadNotGet(zj.TableItemPotato.Item(info.goodsId));
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                commonDes.x = father.width / 2;
                commonDes.y = father.height / 2 + 26;
                // 添加背景
                var rect_back = zj.Util.getMaskImgBlack();
                rect_back.alpha = 0;
                rect_back.width = zj.UIManager.StageWidth;
                rect_back.height = zj.UIManager.StageHeight;
                egret.Tween.get(rect_back).to({ alpha: 0.4 }, 300, egret.Ease.sineIn);
                rect_back.name = "__rect_back";
                commonDes.addChildAt(rect_back, 0);
                return commonDes;
            }
            else {
                commonDes = zj.newUI(zj.Common_DesProp);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                }
                else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                    cx = zj.UIManager.StageWidth - commonDes.width / 2;
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                }
                else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;
            }
        };
        /**
        * @static 技能详情页面  ShowTitle与这个方法合并了
        * @param {message.GoodsInfo} info 技能ID
        * @param {*} father 父类
        * @param {number} xy 子项点击位置相对于显示容器的 y 坐标
        * @param {number} cx 屏幕点击坐标 x
        * @param {number} cy 屏幕点击坐标 y
        * @returns
        * @memberof TipManager
        */
        TipManager.ShowTalent = function (info, father, xy, cx, cy) {
            var commonDes = null;
            commonDes = zj.newUI(zj.CommonDesTalents);
            commonDes.setInfo(info);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            }
            else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                cx = zj.UIManager.StageWidth - commonDes.width / 2;
            }
            commonDes.x = cx;
            if (cy > father.height / 2) {
                commonDes.y = cy - xy - commonDes.height / 2;
            }
            else {
                commonDes.y = cy - xy + commonDes.height / 2 + 50;
            }
            return commonDes;
        };
        /**
     * 设置技能信息 （自动技能，手动技能）
     * @param skillId 技能ID
     * @param index 索引下标 0 - 1
     * @param level 技能等级
     */
        TipManager.ShowDesSkill = function (skillId, index, level, father, xy, cx, cy) {
            var commonDes = null;
            commonDes = zj.newUI(zj.Common_DesSkill);
            commonDes.setInfoSkill(skillId, index, level);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            }
            else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                cx = zj.UIManager.StageWidth - commonDes.width / 2;
            }
            commonDes.x = cx;
            commonDes.y = cy - xy + commonDes.height / 2 + 50;
            return commonDes;
        };
        /**
       * 设置技能信息 （被动技能，觉醒技能）
       * @param talentId 天赋表ID
       * @param generalId 武将ID
       * @param index 索引 （2-3）
       * @param level 技能等级
       */
        TipManager.ShowInfoLevelSkill = function (talentId, generalId, index, level, father, xy, cx, cy, biograyShow) {
            var commonDes = null;
            commonDes = zj.newUI(zj.Common_DesSkill);
            commonDes.setInfoLevelSkill(talentId, generalId, index, level, biograyShow);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            }
            else if (cx > zj.UIManager.StageWidth - commonDes.width / 2) {
                cx = zj.UIManager.StageWidth - commonDes.width / 2;
            }
            commonDes.x = cx;
            commonDes.y = cy - xy + commonDes.height / 2 + 50;
            return commonDes;
        };
        TipManager.PVPLadderBattle_Req = function (roleId, group_id, battle_type, name, info, type, playerInfo, father, i) {
            if (group_id == null) {
                group_id = 0;
            }
            TipManager.PVPLadderBattle_Resp(roleId, group_id, battle_type)
                .then(function (data) {
                var mm = null;
                var a = data.formations;
                if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_FIGHT) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Chat.battleing);
                }
                else if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.WonderLandChoose") {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Chat.worderland);
                }
                else if (battle_type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        zj.Game.EventManager.event(zj.GameEvent.FRIUNDS_ITEM, { formationsData: a, info: info });
                        dialog.setInfo(0);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                    zj.loadUI(zj.ArenaWholeEnemy)
                        .then(function (dialog) {
                        dialog.setInfo(info, data.formations, name, type, playerInfo);
                        dialog.EFormationType(message.EFormationType.FORMATION_TYPE_PVP_THIRD);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            })
                .catch(function (reason) { });
        };
        TipManager.PVPLadderBattle_Resp = function (roleId, group_id, battle_type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryRoleInfoRequest();
                request.body.roleId = roleId;
                request.body.group_id = group_id;
                request.body.battle_type = battle_type;
                zj.Gmgr.Instance.pkRoleId = roleId;
                zj.Gmgr.Instance.pkRoleGroupId = group_id;
                zj.Gmgr.Instance.pkBattleType = battle_type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // RoleInfoZip
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.roleInfo, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var info = new message.RoleInfoZip();
                    if (!info.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(info);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        TipManager.ShowBattleError = function (result, father, cb) {
            var ms = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Fight.errorTip, zj.Helper.GetErrorString(result));
            TipManager.ShowConfirm(ms, father, cb);
        };
        TipManager.ShowConfirm = function (message, uifather, confirmCB, zorder, stackkey, bfreezeRootAction) {
            var win = zj.loadUI(zj.CommonConfirm)
                .then(function (dialog) {
                dialog.setInfo(message, bfreezeRootAction);
                // dialog.setCB(Helper.cre);
                dialog.show(zj.UI.SHOW_FILL_OUT);
                // return dialog;
            });
        };
        TipManager.LevelUp = function (callBack) {
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 5) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_5); // Player_Level == 5;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 10) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_10); // Player_Level == 10;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 15) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_15); // Player_Level == 15;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 20) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_20); // Player_Level == 20;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 25) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_25); // Player_Level == 25;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == 30) {
                zj.RolePointTracker.track(zj.Buried_Point.PLAYER_LEVEL_30); // Player_Level == 30;
            }
            if (zj.Game.PlayerMissionSystem.FunOpen(zj.Game.PlayerInfoSystem.BaseInfo.level).length != 0) {
                zj.loadUI(zj.CommonLevelUp)
                    .then(function (dialog) {
                    if (callBack != null) {
                        dialog.setCB(function () {
                            callBack();
                        });
                    }
                    dialog.show();
                });
            }
            else {
                zj.loadUI(zj.CommonLevelUp2)
                    .then(function (dialog) {
                    if (callBack != null) {
                        dialog.setCB(function () {
                            callBack();
                        });
                    }
                    dialog.show();
                });
            }
        };
        TipManager.ShowAddGemStone = function () {
            TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
            });
        };
        TipManager.OneKeySell = function (tag, cb) {
            var resType = null;
            if (tag == zj.TableEnum.Enum.OneKeySell.MONEY) {
                resType = zj.TableEnum.Enum.PropMoney;
            }
            else if (tag == zj.TableEnum.Enum.OneKeySell.CRYSTAL) {
                resType = zj.TableEnum.Enum.PropCRYSTAL;
            }
            else if (tag == zj.TableEnum.Enum.OneKeySell.Qi) {
                resType = zj.TableEnum.Enum.PropQi;
            }
            else if (tag == zj.TableEnum.Enum.OneKeySell.Fruit) {
                resType = zj.Game.PlayerItemSystem.GetWonderlandFruit();
            }
            else if (tag == zj.TableEnum.Enum.OneKeySell.Demon) {
                resType = zj.Game.PlayerItemSystem.GetWonderlandDemon();
            }
            else if (tag == zj.TableEnum.Enum.OneKeySell.Rogue) {
                resType = zj.Game.PlayerItemSystem.GetWonderlandRogue();
            }
            else {
                // return toast_warning(TextsConfig.TextsConfig_Mall.error_sell)
            }
            var bPush = zj.Table.FindF(resType, function (k, v) {
                return zj.Game.PlayerCardSystem.goodsMap[v].count > 0;
            });
            if (bPush) {
                zj.loadUI(zj.CommonOneKeySell)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    scene.SetInfo(tag, cb);
                });
            }
        };
        /**贪婪之岛更换猎人形象 */
        TipManager.ShowChangeIcon = function (uiCB) {
            // loadUI(Wonderland_SelectedImage)
            //     .then((dialog: Wonderland_SelectedImage) => {
            //         dialog.setCB(uiCB);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            zj.loadUI(zj.Common_ChangeIcon)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setCB(function (head, frame) {
                    if (frame == false) {
                        if (head != 0) {
                            uiCB(head);
                        }
                    }
                });
                dialog.loadList(zj.TableEnum.TableIconListState.GENERAL);
            });
        };
        /**黑暗大陆换宠物 */
        TipManager.ShowChangePet = function (uiCB) {
            zj.loadUI(zj.DarkLand_SelectPet)
                .then(function (dialog) {
                dialog.setCB(uiCB);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        TipManager.ShowTipsAndGoVip = function (str, uiFather, enumVip, cb) {
            TipManager.ShowConfirmCancel(str, function () {
                TipManager.ShowCharge(uiFather, cb);
            });
        };
        TipManager.ShowCharge = function (uiFather, cb) {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
                scene.loadFrom(zj.TableEnum.Enum.HXHChargeType.Charge);
                scene.setCB(cb);
            });
        };
        /**获得资源 */
        TipManager.GetResource = function (text, id, multiple) {
            zj.Common_ShortMsg.promptBattleValue(text, id, multiple);
        };
        /**购买金币 */
        TipManager.ShowAddMoney = function () {
            TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.moneys, function () {
                zj.loadUI(zj.HelpGoldDialog).then(function (dialog) {
                    dialog.SetInfoList();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        TipManager.GetPsychicGroup = function (uiFather, groupInfo, uiCB) {
            zj.loadUI(zj.CommonGetPsychicGroup).then(function (dialog) {
                dialog.SetCB(uiCB);
                dialog.SetPsychicGroupInfo(groupInfo);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return TipManager;
    }());
    zj.TipManager = TipManager;
    __reflect(TipManager.prototype, "zj.TipManager");
})(zj || (zj = {}));
//# sourceMappingURL=TipManager.js.map