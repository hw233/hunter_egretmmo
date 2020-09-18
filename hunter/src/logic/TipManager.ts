namespace zj {
    // created by hhh in 2018/11/27

    export class TipManager {

        public static ShowCard(cardInfo) {
            loadUI(PlayerCardPopDialog)
                .then((dialog: PlayerCardPopDialog) => {
                    dialog.loadGet(cardInfo);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        public static ShowCardNotGet(cardInfo, showPurple?) {
            loadUI(PlayerCardPopDialog)
                .then((dialog: PlayerCardPopDialog) => {
                    dialog.loadNotGet(cardInfo, showPurple);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        /**
         * 显示确定和取消对话框
         * 
         * @param msg 对话框信息
         * @param confirmCallback 确定回调
         * @param cancelCallback 取消回调
         */
        public static ShowConfirmCancel(msg: string, confirmCallback?: () => void, cancelCallback?: () => void) {
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.setInfo(msg);
                    dialog.setCB(confirmCallback, cancelCallback);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }
        /**
         * 连续战斗对话框
         * @param msg 对话框信息
         * @param confirmCallback 确定回调
         */
        public static SuccessionBattlePopTip(msg1?: string, msg2?: string, msg3?: string, confirmCallback?: () => void) {
            loadUI(SuccessionBattlePopTip)
                .then((dialog: SuccessionBattlePopTip) => {
                    dialog.setInfo(msg1, msg2, msg3);
                    dialog.setCB(confirmCallback);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }
        public static ShowResourcesInfo(node, uifather, types, cb, b_back) {
            if (typeof types === "number") {
                types = { types };
            }
            if (typeof cb === "function") {
                cb = { cb };
            } else if (cb == null) {
                cb = {};
            }
            let item = uifather.AddSubWin("Common_OwnResource", "Start", node);
            item.SetFather(uifather);
            item.SetInfo(types, cb, b_back);
        }

        public static RelationAdd(roleId: number, cb?: Function) {
            if (roleId != Game.PlayerInfoSystem.BaseInfo.id) {
                Game.PlayerArenaSystem.relationAdd(roleId).then(() => {
                    toast_success(TextsConfig.TextsConfig_Friend.applySend);
                    if (cb != null) cb();
                }).catch(reason => { });
            } else {
                toast_warning(TextsConfig.TextsConfig_Error.chat_self);
            }
        }

        public static LeagueApply(leagueId: number, cb?: Function) {
            if (leagueId == 0) {
                toast_warning(TextsConfig.TextsConfig_Error.no_league_to_join);
            } else if (Game.PlayerInfoSystem.LeagueId == 0) {
                Game.PlayerArenaSystem.leagueApply(leagueId).then(() => {
                    toast_warning(TextsConfig.TextConfig_League.applySend);
                    if (cb != null) cb();
                })
            } else {
                toast_warning(TextsConfig.TextsConfig_Error.league_already);
            }
        }

        /**
         * 查看玩家详情
         * @param roleId 角色id
         * @param groupId 分区id
         * @param cb 回调函数
         */
        public static ReqRoleInfo(roleId: number, groupId: number, cb?: Function) {
            Game.PlayerInfoSystem.queryRoleInfo(roleId, groupId).then((msg: message.RoleInfoZip) => {
                if (msg.generals.length <= 0) {
                    toast_warning(TextsConfig.TextsConfig_Common.noHunter);
                } else {

                    let name = null;
                    if (Game.Controller.groupOwnerID() != msg.baseInfo.server_id && msg.baseInfo.group_name != "") {
                        if (msg.baseInfo.group_name != "") {
                            // to do 
                            name = msg.baseInfo.group_name;
                            name = name.slice(name.indexOf(":") + 2, name.indexOf("&")) + "区" + name.slice(name.indexOf("&") + 1, name.indexOf("}") - 1);
                        } else {
                            name = TextsConfig.TextsConfig_Chat.serverSelf;
                        }
                    } else {
                        name = TextsConfig.TextsConfig_Chat.serverSelf;
                    }

                    loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
                        dialog.setInfo(msg, name, cb);

                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                }

            });
        }


        public static ShowGeneralDetails(info: message.GeneralInfo, cb?: Function) {
            loadUI(HeroDetailMain).then((dialog: HeroDetailMain) => {
                dialog.setInfo(info, cb);
                dialog.show(UI.SHOW_FROM_TOP);
            })
        }

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
        public static ShowProp(info: message.GoodsInfo, father, xy: number, cx: number, cy: number) {
            let commonDes:
                Common_PlayerCardPopB |
                CommonDesGeneral |
                Common_DesRes |
                Common_DesProp |
                ArenaWholePop |
                Common_DesRandom |
                Common_PlayerCardPop
                = null;
            let type = PlayerItemSystem.ItemType(info.goodsId);
            let isPiece = Table.VIn(TableEnum.Enum.PropCardPiece, info.goodsId) && !Table.VIn(TableEnum.Enum.PropCardPieceRandom, info.goodsId);
            if (isPiece) {
                commonDes = <Common_PlayerCardPopB>newUI(Common_PlayerCardPopB);
                commonDes.SetInfo(info.goodsId);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                commonDes.x = father.width / 2;
                commonDes.y = father.height / 2;
                return commonDes;

            } else if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                commonDes = <CommonDesGeneral>newUI(CommonDesGeneral);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                    cx = UIManager.StageWidth - commonDes.width / 2
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                } else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;

            } else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                commonDes = <Common_DesRes>newUI(Common_DesRes);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                    cx = UIManager.StageWidth - commonDes.width / 2
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                } else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;

            } else if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                commonDes = <Common_DesRandom>newUI(Common_DesRandom);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                    cx = UIManager.StageWidth - commonDes.width / 2
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                } else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;

            } else if (type == message.EGoodsType.GOODS_TYPE_TITLE) {
                commonDes = <ArenaWholePop>newUI(ArenaWholePop);
                commonDes.setInfo(info);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                    cx = UIManager.StageWidth - commonDes.width / 2
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                } else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 80;
                }
                return commonDes;
            } else if (type == message.EGoodsType.GOODS_TYPE_POTATO) {
                commonDes = <Common_PlayerCardPop>newUI(Common_PlayerCardPop);
                commonDes.loadNotGet(TableItemPotato.Item(info.goodsId));
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                commonDes.x = father.width / 2;
                commonDes.y = father.height / 2 + 26;
                // 添加背景
                let rect_back = Util.getMaskImgBlack();
                rect_back.alpha = 0;
                rect_back.width = UIManager.StageWidth;
                rect_back.height = UIManager.StageHeight;
                egret.Tween.get(rect_back).to({ alpha: 0.4 }, 300, egret.Ease.sineIn);
                rect_back.name = "__rect_back";
                commonDes.addChildAt(rect_back, 0);
                return commonDes;
            } else {
                commonDes = <Common_DesProp>newUI(Common_DesProp);
                commonDes.setInfo(info.goodsId, info.count);
                commonDes.anchorOffsetX = commonDes.width / 2;
                commonDes.anchorOffsetY = commonDes.height / 2;
                if (cx < commonDes.width / 2) {
                    cx = commonDes.width / 2;
                } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                    cx = UIManager.StageWidth - commonDes.width / 2
                }
                commonDes.x = cx;
                if (cy > father.height / 2) {
                    commonDes.y = cy - xy - commonDes.height / 2;
                } else {
                    commonDes.y = cy - xy + commonDes.height / 2 + 50;
                }
                return commonDes;
            }

        }

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
        public static ShowTalent(info: number, father, xy: number, cx: number, cy: number) {
            let commonDes:
                CommonDesTalents
                = null;

            commonDes = <CommonDesTalents>newUI(CommonDesTalents);
            commonDes.setInfo(info);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                cx = UIManager.StageWidth - commonDes.width / 2
            }
            commonDes.x = cx;
            if (cy > father.height / 2) {
                commonDes.y = cy - xy - commonDes.height / 2;
            } else {
                commonDes.y = cy - xy + commonDes.height / 2 + 50;
            }
            return commonDes;
        }

        /**
     * 设置技能信息 （自动技能，手动技能）
     * @param skillId 技能ID
     * @param index 索引下标 0 - 1
     * @param level 技能等级
     */
        public static ShowDesSkill(skillId: number, index: number, level: number, father, xy: number, cx: number, cy: number) {
            let commonDes:
                Common_DesSkill
                = null;

            commonDes = <Common_DesSkill>newUI(Common_DesSkill);
            commonDes.setInfoSkill(skillId, index, level);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                cx = UIManager.StageWidth - commonDes.width / 2
            }
            commonDes.x = cx;
            commonDes.y = cy - xy + commonDes.height / 2 + 50;
            return commonDes;
        }

        /**
       * 设置技能信息 （被动技能，觉醒技能）
       * @param talentId 天赋表ID
       * @param generalId 武将ID
       * @param index 索引 （2-3）
       * @param level 技能等级
       */
        public static ShowInfoLevelSkill(talentId: number, generalId: number, index: number, level: number, father, xy: number, cx: number, cy: number, biograyShow: boolean) {
            let commonDes:
                Common_DesSkill
                = null;

            commonDes = <Common_DesSkill>newUI(Common_DesSkill);
            commonDes.setInfoLevelSkill(talentId, generalId, index, level, biograyShow);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            if (cx < commonDes.width / 2) {
                cx = commonDes.width / 2;
            } else if (cx > UIManager.StageWidth - commonDes.width / 2) {
                cx = UIManager.StageWidth - commonDes.width / 2
            }
            commonDes.x = cx;
            commonDes.y = cy - xy + commonDes.height / 2 + 50;
            return commonDes;
        }

        public static PVPLadderBattle_Req(roleId, group_id, battle_type, name, info, type, playerInfo?, father?, i?: number) {
            if (group_id == null) {
                group_id = 0;
            }

            TipManager.PVPLadderBattle_Resp(roleId, group_id, battle_type)
                .then((data: message.RoleInfoZip) => {
                    let mm = null;
                    let a = data.formations
                    if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_FIGHT) {
                        toast_warning(TextsConfig.TextsConfig_Chat.battleing);
                    } else if (egret.getQualifiedClassName(Game.UIManager.topDialog()) == "zj.WonderLandChoose") {
                        toast_warning(TextsConfig.TextsConfig_Chat.worderland);
                    } else if (battle_type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
                        loadUI(CommonFormatePveMain)
                            .then((dialog: CommonFormatePveMain) => {
                                Game.EventManager.event(GameEvent.FRIUNDS_ITEM, { formationsData: a, info: info });
                                dialog.setInfo(0);
                                dialog.show(UI.SHOW_FROM_TOP);
                            });
                    } else {
                        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                        loadUI(ArenaWholeEnemy)
                            .then((dialog: ArenaWholeEnemy) => {
                                dialog.setInfo(info, data.formations, name, type, playerInfo);
                                dialog.EFormationType(message.EFormationType.FORMATION_TYPE_PVP_THIRD);
                                dialog.show(UI.SHOW_FROM_TOP);
                            });
                    }

                })
                .catch(reason => { });
        }
        public static PVPLadderBattle_Resp(roleId, group_id, battle_type) {
            return new Promise((resolve, reject) => {
                let request = new message.QueryRoleInfoRequest();
                request.body.roleId = roleId;
                request.body.group_id = group_id;
                request.body.battle_type = battle_type;
                Gmgr.Instance.pkRoleId = roleId;
                Gmgr.Instance.pkRoleGroupId = group_id;
                Gmgr.Instance.pkBattleType = battle_type;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QueryRoleInfoResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // RoleInfoZip
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.roleInfo, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let info = new message.RoleInfoZip()
                    if (!info.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return;
                    }

                    resolve(info);
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static ShowBattleError(result, father, cb) {
            let ms = Helper.StringFormat(TextsConfig.TextsConfig_Fight.errorTip, Helper.GetErrorString(result));
            TipManager.ShowConfirm(ms, father, cb);
        }

        public static ShowConfirm(message?, uifather?, confirmCB?, zorder?, stackkey?, bfreezeRootAction?) {
            let win = loadUI(CommonConfirm)
                .then((dialog: CommonConfirm) => {
                    dialog.setInfo(message, bfreezeRootAction);
                    // dialog.setCB(Helper.cre);
                    dialog.show(UI.SHOW_FILL_OUT);
                    // return dialog;
                });
        }

        public static LevelUp(callBack?: () => void) {
            if (Game.PlayerInfoSystem.BaseInfo.level == 5) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_5); // Player_Level == 5;
            }
            if (Game.PlayerInfoSystem.BaseInfo.level == 10) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_10); // Player_Level == 10;
            }
            if (Game.PlayerInfoSystem.BaseInfo.level == 15) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_15); // Player_Level == 15;
            }
            if (Game.PlayerInfoSystem.BaseInfo.level == 20) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_20); // Player_Level == 20;
            }
            if (Game.PlayerInfoSystem.BaseInfo.level == 25) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_25); // Player_Level == 25;
            }
            if (Game.PlayerInfoSystem.BaseInfo.level == 30) {
                RolePointTracker.track(Buried_Point.PLAYER_LEVEL_30); // Player_Level == 30;
            }
            if (Game.PlayerMissionSystem.FunOpen(Game.PlayerInfoSystem.BaseInfo.level).length != 0) {
                loadUI(CommonLevelUp)
                    .then((dialog: CommonLevelUp) => {
                        if (callBack != null) {
                            dialog.setCB(() => {
                                callBack();
                            });
                        }
                        dialog.show();
                    });
            }
            else {
                loadUI(CommonLevelUp2)
                    .then((dialog: CommonLevelUp2) => {
                        if (callBack != null) {
                            dialog.setCB(() => {
                                callBack();
                            });
                        }
                        dialog.show();
                    });
            }
        }

        public static ShowAddGemStone() {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init(false);
                    });
            });
        }

        public static OneKeySell(tag, cb) {
            let resType = null

            if (tag == TableEnum.Enum.OneKeySell.MONEY) {
                resType = TableEnum.Enum.PropMoney;
            } else if (tag == TableEnum.Enum.OneKeySell.CRYSTAL) {
                resType = TableEnum.Enum.PropCRYSTAL;
            } else if (tag == TableEnum.Enum.OneKeySell.Qi) {
                resType = TableEnum.Enum.PropQi;
            } else if (tag == TableEnum.Enum.OneKeySell.Fruit) {
                resType = Game.PlayerItemSystem.GetWonderlandFruit();
            } else if (tag == TableEnum.Enum.OneKeySell.Demon) {
                resType = Game.PlayerItemSystem.GetWonderlandDemon()
            } else if (tag == TableEnum.Enum.OneKeySell.Rogue) {
                resType = Game.PlayerItemSystem.GetWonderlandRogue()
            } else {
                // return toast_warning(TextsConfig.TextsConfig_Mall.error_sell)
            }
            let bPush = Table.FindF(resType, (k, v) => {
                return Game.PlayerCardSystem.goodsMap[v].count > 0;
            });
            if (bPush) {
                loadUI(CommonOneKeySell)
                    .then((scene: CommonOneKeySell) => {
                        scene.show(UI.SHOW_FILL_OUT);
                        scene.SetInfo(tag, cb)
                    });
            }
        }

        /**贪婪之岛更换猎人形象 */
        public static ShowChangeIcon(uiCB: (id: number) => void) {
            // loadUI(Wonderland_SelectedImage)
            //     .then((dialog: Wonderland_SelectedImage) => {
            //         dialog.setCB(uiCB);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            loadUI(Common_ChangeIcon)
                .then((dialog: Common_ChangeIcon) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setCB((head, frame) => {
                        if (frame == false) {
                            if (head != 0) {
                                uiCB(head);
                            }
                        }
                    });
                    dialog.loadList(TableEnum.TableIconListState.GENERAL);
                });
        }

        /**黑暗大陆换宠物 */
        public static ShowChangePet(uiCB: (petInfo: message.PetInfo) => void) {
            loadUI(DarkLand_SelectPet)
                .then((dialog: DarkLand_SelectPet) => {
                    dialog.setCB(uiCB);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        public static ShowTipsAndGoVip(str, uiFather, enumVip?, cb?) {
            TipManager.ShowConfirmCancel(str, () => {
                TipManager.ShowCharge(uiFather, cb);
            });
        }

        public static ShowCharge(uiFather, cb) {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                    scene.loadFrom(TableEnum.Enum.HXHChargeType.Charge);
                    scene.setCB(cb);
                });
        }
        /**获得资源 */
        public static GetResource(text, id, multiple) {
            Common_ShortMsg.promptBattleValue(text, id, multiple);
        }

        /**购买金币 */
        static ShowAddMoney() {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.moneys, () => {
                loadUI(HelpGoldDialog).then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            });
        }

        public static GetPsychicGroup(uiFather, groupInfo, uiCB) {
            loadUI(CommonGetPsychicGroup).then((dialog: CommonGetPsychicGroup) => {
                dialog.SetCB(uiCB);
                dialog.SetPsychicGroupInfo(groupInfo);
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }
    }
}