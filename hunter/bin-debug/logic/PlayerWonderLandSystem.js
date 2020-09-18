var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     *
     * @date 2019-5-21
     *
     * @class 贪婪之岛系统
     */
    var PlayerWonderLandSystem = (function () {
        function PlayerWonderLandSystem() {
            //港口
            this.darkland = {
                inDarkland: false,
                mapBlockIndex: -1,
                darklandId: -1,
                roleInfo: {},
                chatInfosMini: {},
                bChatAdd: false,
                getGoods: [],
                resultList: [],
                serverSceneId: 0,
                mobsDebuffTips: false,
                channelId: 0,
                cityId: 0,
                cityServerInfo: [],
                freshChannelTime: 0,
            };
            this.loadPosInfo = {};
            this.scenePosInfo = {};
            this.timePosInfo = {};
            this.loadingPosInfo = {};
            this.resultInfo = null;
            this.noticePosInfo = {};
            this.joinTimeInfo = {};
            this.inWonderland = false;
            this.mapBlockIndex = -1;
            this.wonderlandId = -1;
            this.chatInfosMini = [];
            this.bChatAdd = false;
            this.getGoods = [];
            this.resultList = [];
            this.serverSceneId = 0;
            this.mobsDebuffTips = false;
            this.cityServerInfo = [];
            this.darklandId = -1;
        }
        PlayerWonderLandSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_ROLE_OTHER_ATTRI_CHANGE, this.dateFun, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.posInfo, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.loadRpgPos, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.imitate, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_WONDERLAND_ROLE_INFO, this.roleInfoInfo, this);
        };
        PlayerWonderLandSystem.prototype.uninit = function () {
            this.loadPosInfo = {};
            this.joinTime = 0;
            this.scenePosInfo = {};
            this.timePosInfo = {};
            this.loadingPosInfo = {};
            this.resultInfo = null;
            this.noticePosInfo = {};
            this.joinTimeInfo = {};
            this.inWonderland = false;
            this.mapBlockIndex = -1;
            this.wonderlandId = -1;
            this.darklandId = -1;
            this.roleInfo;
            this.chatInfosMini = [];
            this.bChatAdd = false;
            this.getGoods = [];
            this.resultList = [];
            this.serverSceneId = 0;
            this.mobsDebuffTips = false;
            this.otherAttri = null;
        };
        PlayerWonderLandSystem.prototype.dateFun = function (ev) {
            this.otherAttri = ev.data;
        };
        PlayerWonderLandSystem.prototype.GetNormalPic = function (type) {
            //普通头像
            var tbl = [];
            var picTbl = zj.TableItemPic.Table();
            for (var k in picTbl) {
                var v = picTbl[k];
                if (v.type == type) {
                    tbl.push(k);
                }
            }
            tbl.sort(function (a, b) {
                return a - b;
            });
            return tbl;
        };
        PlayerWonderLandSystem.prototype.GetHighPic = function () {
            //高级头像
            var tbl = [];
            var picIds = [];
            var picTbl = zj.TableItemPic.Table();
            var generalTbl = zj.TableBaseGeneral.Table();
            for (var k in picTbl) {
                var v = picTbl[k];
                if (v.type == 2) {
                    tbl.push({ ket: k, value1: 0, value2: 0 });
                }
            }
            var _loop_1 = function (i) {
                var v = tbl[i];
                var find = zj.Table.FindF(this_1.otherAttri.picIds, function (key, value) {
                    return value == v.key;
                });
                tbl[i].value1 = find && 1 || 0;
            };
            var this_1 = this;
            for (var i = 0; i < tbl.length; i++) {
                _loop_1(i);
            }
            var _loop_2 = function (k) {
                var v = generalTbl[k];
                var _a = zj.Table.FindR(tbl, function (kk, vv) {
                    return vv.key == v.pic_id;
                }), _v = _a[0], _k = _a[1];
                if (_v != null) {
                    tbl[_k].value2 = v.aptitude;
                }
            };
            for (var k in generalTbl) {
                _loop_2(k);
            }
            function sort(a, b) {
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
            }
            tbl.sort(sort);
            for (var i = 0; i < tbl.length; i++) {
                var v = tbl[i];
                if (v) {
                    picIds.push(v.key);
                }
            }
            return picIds;
        };
        PlayerWonderLandSystem.prototype.willGoRpg = function () {
            zj.Gmgr.Instance.bWillGoRpg = true;
            this.scenePosInfo = {};
            this.loadingPosInfo = {};
            this.joinTimeInfo = {};
        };
        /** 根据索引，返回对应语言的描述*/
        PlayerWonderLandSystem.prototype.Des = function (id) {
            var suffix = zj.Device.languageInfo;
            var ret = zj.TableLanguage.Item(id);
            if (ret == null) {
                console.log("language id ===" + id + "  is not found");
            }
            return ret[suffix];
        };
        PlayerWonderLandSystem.prototype.WonderlandEnterReqBody = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandEnterRequest();
                request.body.id = 2;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        PlayerWonderLandSystem.prototype.SetFormatReqOnly = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetFormationRequest();
                var formation = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
                formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
                request.body.formations.push(formation);
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerWonderLandSystem.prototype.ReqModifyUserInfo = function (headId, frameId, title1Id, title2Id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ModifyRolePicRequest();
                request.body.picId = headId != null ? headId : zj.Game.PlayerInfoSystem.BaseInfo.picId;
                request.body.picFrame = frameId != null ? frameId : zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
                request.body.titleId = title1Id != null ? title1Id : zj.Game.PlayerInfoSystem.BaseInfo.titleId;
                request.body.viceTitleId = title2Id != null ? title2Id : zj.Game.PlayerInfoSystem.BaseInfo.viceTitleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerWonderLandSystem.prototype.ReqModifyCarryPet = function (petId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PetPlayingRequest();
                request.body.pet_id = petId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //进入仙境场景回复
        PlayerWonderLandSystem.prototype.OpenwonderlandScene = function (response) {
            PlayerWonderLandSystem.MapHeight = 1500;
            response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
            this.roleInfo = response.body.roleInfo;
            this.loadRpgScenePos(response.body.posInfos);
            this.inWonderland = true;
            this.serverSceneId = response.body.sceneId;
        };
        PlayerWonderLandSystem.prototype.OpenMainCity = function (response) {
            PlayerWonderLandSystem.MapHeight = 640; //1500;//960
            response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
            this.roleInfo = response.body.roleInfo;
            this.loadRpgScenePos(response.body.posInfos);
            // this.inWonderland = true;
            this.serverSceneId = response.body.sceneId;
        };
        PlayerWonderLandSystem.prototype.changeLine = function (response) {
            PlayerWonderLandSystem.MapHeight = 640; //1500;//960
            response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
            this.roleInfo = response.body.roleInfo;
            this.loadRpgScenePos(response.body.posInfos);
            this.serverSceneId = response.body.sceneId;
        };
        PlayerWonderLandSystem.prototype.loadRpgScenePos = function (info) {
            for (var i = 0; i < info.length; i++) {
                var key = info[i].roleBase.id;
                // if (Gmgr.Instance.bWillGoRpg == true) {
                // this.joinTimeInfo[key] = getMS()
                // }
                this.scenePosInfo[key] = info[i];
            }
            zj.SceneManager.scenePosInfo = this.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
        };
        /**关闭大草原或安多尼拔发协议 */
        PlayerWonderLandSystem.prototype.WonderlandLeave = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandLeaveRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**购买能量胶囊发协议 */
        PlayerWonderLandSystem.prototype.BuyPlate = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyPlateRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false, false);
            });
        };
        /**贪婪之岛大草原加速协议 */
        PlayerWonderLandSystem.prototype.WonderlandFaster = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandFasterRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛港口加速协议 */
        PlayerWonderLandSystem.prototype.SceneFaster = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneFasterRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛大草原加血协议 */
        PlayerWonderLandSystem.prototype.WonderlandAddBlood = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandAddBloodRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛港口加血协议 */
        PlayerWonderLandSystem.prototype.SceneAddBlood = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneAddBloodRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛大草原清除罪恶值 */
        PlayerWonderLandSystem.prototype.WonderlandClearEvil = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandClearEvilRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛 */
        PlayerWonderLandSystem.prototype.WonderlandBattleMode = function (tmpMode) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.WonderlandBattleModeRequest();
                request.body.battleMode = tmpMode;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛港口积分排名 */
        PlayerWonderLandSystem.prototype.SceneQueryScoreRank = function (get_all) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneQueryScoreRankRequest();
                request.body.get_all = get_all;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false, true);
            });
        };
        /**贪婪之岛港口退出 */
        PlayerWonderLandSystem.prototype.SceneLeave = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneLeaveRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛切换分线 */
        PlayerWonderLandSystem.prototype.SceneChangeBranchInfo = function (selectChannelId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneChangeBranchInfoRequest();
                request.body.scene = selectChannelId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /**贪婪之岛拉取分线列表 */
        PlayerWonderLandSystem.prototype.SceneGetBranchInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneGetBranchInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        PlayerWonderLandSystem.prototype.posInfo = function (e) {
            var msg = e.data;
            this.loadRpgTimePos(msg.body.posInfos);
        };
        PlayerWonderLandSystem.prototype.loadRpgTimePos = function (info) {
            for (var i = 0; i < info.length; i++) {
                var data = info[i];
                data.posItem.scene_y = PlayerWonderLandSystem.MapHeight - data.posItem.scene_y;
                var key = data.roleBase.id;
                if (zj.Gmgr.Instance.bWillGoRpg == true) {
                    this.loadingPosInfo[key] = data;
                    var date = new Date();
                    this.joinTimeInfo[key] = date.getTime();
                }
                else {
                    this.timePosInfo[key] = data;
                }
                this.scenePosInfo[key] = data;
            }
        };
        PlayerWonderLandSystem.prototype.loadRpgPos = function (e) {
            var msg = e.data;
            this.loadRpgPosNotice(msg.body.posInfos);
        };
        PlayerWonderLandSystem.prototype.loadRpgPosNotice = function (info) {
            for (var i = 0; i < info.length; i++) {
                var key = info[i].joiner_id;
                var data = info[i];
                data.scene_y = PlayerWonderLandSystem.MapHeight - data.scene_y;
                this.noticePosInfo[key] = data;
            }
        };
        PlayerWonderLandSystem.prototype.imitate = function (e) {
            var msg = e.data;
            this.battleResult(msg);
        };
        PlayerWonderLandSystem.prototype.roleInfoInfo = function (e) {
            var msg = e.data;
            zj.Game.PlayerWonderLandSystem.roleInfo = msg.body.roleInfo;
        };
        PlayerWonderLandSystem.prototype.battleResult = function (data) {
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(data.body.battleResult, para);
            var plain = inflate.decompress();
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var resultInfo = new message.BattleImitateResult();
            if (!resultInfo.parse_bytes(decoder)) {
                zj.toast(zj.LANG("游戏数据解析失败"));
                return;
            }
            this.resultInfo = resultInfo;
            //战报存储
            if (resultInfo.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                if (zj.Game.PlayerWonderLandSystem.resultList.length < 10) {
                    try {
                        resultInfo["goods"] = data.body.gameInfo.goodsInfo;
                    }
                    catch (error) {
                        resultInfo["goods"] = data.body.goodsInfo[0];
                    }
                    // resultInfo["goods"] = data.body.gameInfo.goodsInfo;
                    zj.Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
                }
                else {
                    try {
                        resultInfo["goods"] = data.body.gameInfo.goodsInfo;
                    }
                    catch (error) {
                        resultInfo["goods"] = data.body.goodsInfo[0];
                    }
                    zj.Game.PlayerWonderLandSystem.resultList = [];
                    zj.Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
                }
            }
            else if (resultInfo.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                if (zj.Game.PlayerWonderLandSystem.resultList.length < 10) {
                    try {
                        resultInfo["goods"] = data.body.gameInfo.goodsInfo;
                    }
                    catch (error) {
                        resultInfo["goods"] = data.body.goodsInfo[0];
                    }
                    zj.Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
                }
                else {
                    try {
                        resultInfo["goods"] = data.body.gameInfo.goodsInfo;
                    }
                    catch (error) {
                        resultInfo["goods"] = data.body.goodsInfo[0];
                    }
                    zj.Game.PlayerWonderLandSystem.resultList = [];
                    zj.Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
                }
            }
        };
        /**大草原退出场景 */
        PlayerWonderLandSystem.prototype.prairieClose = function (callback, thisObj) {
            zj.Game.PlayerWonderLandSystem.WonderlandLeave().then(function () {
                zj.StageSceneManager.Instance.GetCurScene().delMember(zj.Game.PlayerInfoSystem.BaseInfo.id);
                zj.StageSceneManager.Instance.clearScene();
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                callback.call(thisObj);
            }).catch(function () {
            });
        };
        /**港口退出 */
        PlayerWonderLandSystem.prototype.havenClose = function () {
            zj.Game.PlayerWonderLandSystem.SceneLeave()
                .then(function () {
                zj.StageSceneManager.Instance.GetCurScene().delMember(zj.Game.PlayerInfoSystem.BaseInfo.id);
                zj.Game.PlayerWonderLandSystem.darkland.inDarkland = false;
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                zj.Game.PlayerWonderLandSystem.darkland.serverSceneId = -1;
                // StageSceneManager.Instance.clearScene();
                zj.SceneManager.instance.EnterSceneZorkBoss();
            }).catch(function (result) {
            });
        };
        /**港口清除罪恶值 */
        PlayerWonderLandSystem.prototype.SceneClearEvil = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SceneClearEvilRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        PlayerWonderLandSystem.MapHeight = 1500;
        return PlayerWonderLandSystem;
    }());
    zj.PlayerWonderLandSystem = PlayerWonderLandSystem;
    __reflect(PlayerWonderLandSystem.prototype, "zj.PlayerWonderLandSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerWonderLandSystem.js.map