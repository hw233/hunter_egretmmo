var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerChatDataSystem = (function () {
        function PlayerChatDataSystem() {
            this.typeDict = (_a = {},
                _a["int8"] = "c",
                _a["uint8"] = "b",
                _a["int16"] = "h",
                _a["uint16"] = "H",
                _a["int32"] = "i",
                _a["uint32"] = "I",
                _a["int64"] = "l",
                _a["bool"] = "t",
                _a["float"] = "f",
                _a["double"] = "d",
                _a["string"] = "a",
                _a);
            this.chatRecordType = 0; // 聊天记录上次选择类型  
            // 整理信息
            this.chatInfos = []; // 聊天信息
            this.chatInfosMini = []; // 简易聊天信息
            this.chatInfosScene = []; // 联盟场景信息数据
            this.chatInfoTmp = []; //临时消息，客户端自己添加的
            this.chatInfoCnt = []; // [1]:world,[2]:ally,[3]:whisper,[4]wonderland
            this.chatShieldTbl = []; // 聊天屏蔽列表
            this.bAddChats = false; // 是否需要刷新主界面的聊天信息，针对ChatMessageNotice
            // 联盟战
            this.leagueWar = {
                bChatAdd: false,
                serverSceneId: 0,
                chatInfosMini: [],
            };
            this.chatInfo = {
                chat_channel_id: 1,
                channel_count: 0,
            };
            var _a;
        }
        PlayerChatDataSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.EnterChatReq, this); //  连接聊天服
            // 推送聊天消息
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
        };
        PlayerChatDataSystem.prototype.uninit = function () {
            this.chatInfos = []; // 聊天信息
            this.chatInfosMini = []; // 简易聊天信息
            this.chatInfosScene = []; // 联盟场景信息数据
            this.chatInfoTmp = []; //临时消息，客户端自己添加的
            this.chatInfoCnt = []; // [1]:world,[2]:ally,[3]:whisper,[4]wonderland
            this.chatShieldTbl = []; // 聊天屏蔽列表
            this.bAddChats = false; // 是否需要刷新主界面的聊天信息，针对ChatMessageNotice
        };
        /**
         * 推送聊天消息
         */
        PlayerChatDataSystem.prototype.ChatMessageNotice_Visit = function (msg, result) {
            msg = msg.data.body;
            for (var i = 0; i < msg.chatinfos.length; i++) {
                var chatInfo = msg.chatinfos[i];
                if (chatInfo.type != message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                    this.chatInfos.push(chatInfo);
                    zj.Game.EventManager.event(zj.GameEvent.CHAT_RESTART);
                }
            }
        };
        /**
         * 连接聊天服
         */
        PlayerChatDataSystem.prototype.EnterChatReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.EnterChatRequest();
                request.body.channel_id = 0;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    _this.ChatHistroyReqFirstTime();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         * 拉取历史记录
         */
        PlayerChatDataSystem.prototype.ChatHistroyReqFirstTime = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ChatHistroyRequest();
                request.body.type = 0;
                request.body.chat_id = 0;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.chats, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.ChatMessageChunk();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items);
                    zj.Game.PlayerChatDataSystem.chatInfos = [];
                    _this.ChatHistroyReqFirstTime_Visit(items);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerChatDataSystem.prototype.ChatHistroyReqFirstTime_Visit = function (msg) {
            if (msg.chats != null) {
                var infos = msg.chats;
                this.LoadServerData_ChatInfos(infos); // 存到内存Player中，随时调用
                // 聊天提示
                for (var i = 0; i < message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL; i++) {
                    this.chatInfoCnt[i] = 0;
                }
                //Tips.SetTipsOfId(Tips.TAG.CHAT);// 红点报错
                var cht = new message.ChatMessage();
                cht.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM;
                cht.content = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.enter_chat, (this.chatInfo.chat_channel_id));
                this.AddMiniChatInfo(cht);
                // let a = this.
                // if (this.chatInfosMini.length >= 5) {
                //     this.chatInfosMini.splice(0, 1);
                // }
                // this.chatInfosMini.push(cht);
                // 客户端模拟 服务器接收发送请求 不影响游戏功能
                // let req = new message.ChatMessageNoticeRequest();
                // let cht = new message.ChatMessage();
                // cht.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM;
                // let con = {
                //     [1]: [cht.type = 0, cht.content = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.enter_chat, (this.chatInfo.chat_channel_id))]
                // }
                // cht.content = JSON.stringify(con);
                // let bin = [];
                // to_bin(req, ChatMessageNotice, bin);// 客户端模拟收到了服务器的一个协议 
                // req.body.chatinfos = [cht];
                // let data = bin.concat();
                // this.DoNetSuccess(data, req.header.id, 0);// 模拟发了个协议 用来显示你已经入某某频道 这条消息服务器不会发
            }
        };
        PlayerChatDataSystem.prototype.create_msg = function (def) {
            var msg = [];
            var attribsDef = def["attribs"];
            if (attribsDef == null) {
                msg["def"] = def;
                return msg;
            }
            for (var i in attribsDef) {
                var attr = attribsDef[i];
                var attrName = attr[0];
                var attrType = attr[1];
                if (attr[3] == "repeat") {
                }
                else if (this.is_basic_attrib(attrType) == false) {
                    msg[attrName] = this.create_msg(this.get_attrib_def(def, attrType));
                }
                else if (attrType == "string") {
                    msg[attrName] = "";
                }
                else if (attrType == "bool") {
                    msg[attrName] = false;
                }
                else {
                    msg[attrName] = 0;
                }
            }
            msg["def"] = def;
            return msg;
        };
        PlayerChatDataSystem.prototype.is_basic_attrib = function (attrType) {
            return this.typeDict[attrType] != null;
        };
        PlayerChatDataSystem.prototype.get_attrib_def = function (def, attrType) {
            var attrDef = def[attrType];
            if (attrDef == null) {
                attrDef = [attrType];
            }
            return attrDef;
        };
        PlayerChatDataSystem.prototype.LoadServerData_ChatInfos = function (data) {
            // 数据调整，丢弃过多的聊天信息
            var cnt_cur = zj.Game.PlayerChatDataSystem.chatInfos.length;
            var cnt_add = 0;
            // 去除content_type为client_chat_role_6的信息 by leiye
            // 去除屏蔽的玩家
            var ik = 0;
            while (ik < data.length) {
                if (data[ik].content_type == "client_chat_role_6") {
                    data.splice(ik, 1);
                    //data.shift();
                }
                else {
                    ik = ik + 1;
                }
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                }
                else {
                    cnt_add = cnt_add + 1;
                }
            }
            if (cnt_cur + cnt_add > 100) {
                var cnt_dt = cnt_cur + cnt_add - 100;
                for (var i = 0; i < cnt_dt; i++) {
                    zj.Game.PlayerChatDataSystem.chatInfos.splice(i, 1);
                }
            }
            zj.Game.PlayerChatDataSystem.bAddChats = false;
            zj.Game.PlayerChatDataSystem.leagueWar.bChatAdd = false;
            zj.Game.PlayerWonderLandSystem.bChatAdd = false; // 贪婪之岛
            zj.Game.PlayerZorkSystem.zorkBoss.bChatAdd = false;
            zj.Game.PlayerZorkSystem.zork.bChatAdd = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                }
                else {
                    zj.Game.PlayerChatDataSystem.chatInfos.push(data[i]);
                    if (data[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_CHEST &&
                        data[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM) {
                        this.AddMiniChatInfo(data[i]);
                        this.bAddChats = true;
                    }
                    else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE) {
                        // 要区分场景id，看是否添加到mini界面
                        if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORK ||
                            zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS ||
                            zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_LEAGUE_FIGHT ||
                            zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND) {
                        }
                    }
                    if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD) {
                    }
                    else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL &&
                        data[i].receiver_id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                        this.chatInfoCnt[4] = this.chatInfoCnt[4] + 1;
                    }
                    else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM) {
                        if (data[i].show_uid == zj.Game.PlayerZorkSystem.zorkBoss.serverSceneId) {
                            this.AddZorkBossChatInfo(data[i]);
                            zj.Game.PlayerZorkSystem.zorkBoss.bChatAdd = true;
                        }
                        else if (data[i].uid == zj.Game.PlayerWonderLandSystem.serverSceneId) {
                            this.AddWonderlandChatInfo(data[i]);
                            zj.Game.PlayerWonderLandSystem.bChatAdd = true;
                        }
                        else if (data[i].uid == this.leagueWar.serverSceneId) {
                            this.AddLeagueWarChatInfo(data[i]);
                            this.leagueWar.bChatAdd = true;
                        }
                    }
                }
            }
            var a = zj.Game.PlayerChatDataSystem.chatInfos;
            zj.Game.EventManager.event(zj.GameEvent.CHAT_RESTART);
        };
        PlayerChatDataSystem.prototype.AddMiniChatInfo = function (info) {
            if (this.chatInfosMini.length >= 5) {
                this.chatInfosMini.splice(0, 1);
            }
            this.chatInfosMini.push(info);
        };
        // 世界boss
        PlayerChatDataSystem.prototype.AddZorkBossChatInfo = function (info) {
            if (zj.Game.PlayerZorkSystem.zorkBoss.chatInfosMini.length >= 5) {
                zj.Game.PlayerZorkSystem.zorkBoss.chatInfosMini.splice(0, 1);
            }
            zj.Game.PlayerZorkSystem.zorkBoss.chatInfosMini.push(info);
        };
        // 贪婪之岛
        PlayerChatDataSystem.prototype.AddWonderlandChatInfo = function (info) {
            if (zj.Game.PlayerWonderLandSystem.chatInfosMini.length >= 5) {
                zj.Game.PlayerWonderLandSystem.chatInfosMini.splice(0, 1);
            }
            zj.Game.PlayerWonderLandSystem.chatInfosMini.push(info);
        };
        PlayerChatDataSystem.prototype.AddLeagueWarChatInfo = function (info) {
            if (this.leagueWar.chatInfosMini.length >= 5) {
                this.leagueWar.chatInfosMini.splice(0, 1);
            }
            this.leagueWar.chatInfosMini.push(info);
        };
        /**
         * 输入
         */
        PlayerChatDataSystem.prototype.SendChat = function (_chatType, receiverId, content, group_id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SendChatRequest();
                request.body.type = _chatType + 1;
                if (zj.Device.isReviewSwitch && _chatType == message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS) {
                    request.body.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD;
                }
                request.body.receiverId = receiverId;
                request.body.content = content;
                request.body.show_type = 0;
                request.body.show_id = 0;
                request.body.battle_id = "";
                request.body.receiver_groupId = group_id;
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
        /**
         * 切换频道
         */
        PlayerChatDataSystem.prototype.SwitchingChannel = function (channelId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.EnterChatRequest();
                request.body.channel_id = channelId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                    zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id = response.body.channel_id;
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         * 角色数据
         */
        PlayerChatDataSystem.prototype.RoleDate = function (_leagueBase) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryRoleInfoRequest();
                request.body.roleId = _leagueBase.leaderId;
                request.body.group_id = zj.Device.gameserver.ID;
                request.body.battle_type = 0;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.roleInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         * (公会)申请加入
         */
        PlayerChatDataSystem.prototype.applyJoin = function (_leagueBase) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueApplyRequest();
                request.body.leagueid = _leagueBase.leagueId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // if (response.header.result == 10630) {
                        //     toast_warning("退出公会时间太短");
                        // } else {
                        //     reject(response.header.result);
                        //     return;
                        // }
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
        /**
         * 查询
         */
        PlayerChatDataSystem.prototype.guildQuery = function (_msgInfo) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryLeagueInfoRequest();
                request.body.leagueId = _msgInfo.leagueId;
                request.body.groupId = _msgInfo.group_id;
                request.body.roleId = _msgInfo.id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.info);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         * 工会1
         */
        PlayerChatDataSystem.prototype.organizationChat1 = function (_msgInfo) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryLeagueInfoRequest();
                request.body.leagueId = _msgInfo.sender_id;
                request.body.groupId = 0;
                request.body.roleId = zj.Game.PlayerInfoSystem.BaseInfo.id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.info);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         * 工会2
         */
        PlayerChatDataSystem.prototype.organizationChat2 = function (_msgInfo, cb) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryRoleInfoRequest();
                if (_msgInfo.sender_id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    if (_msgInfo.receiver_id == 0) {
                        return;
                    }
                    else {
                        request.body.roleId = _msgInfo.receiver_id;
                    }
                }
                else {
                    request.body.roleId = _msgInfo.sender_id;
                }
                if (cb) {
                    cb(request);
                }
                request.body.group_id = _msgInfo.sender_group_id;
                request.body.battle_type = 0;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
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
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerChatDataSystem.prototype.GetChatInfo = function (msgInfo, type) {
            if (msgInfo == null) {
                return;
            }
            var name = "";
            var title = "";
            name = msgInfo.sender_name;
            var content = this.ChatContent(msgInfo);
            if (content == null || content == undefined)
                content = "";
            if (msgInfo.content_type != "" && msgInfo.type != 4) {
                content = content;
                // if (msgInfo.content == "[]") {
                //     content = LanguageManager[msgInfo.content_type](); //msgInfo.content_type;
                // }
            }
            var str_msg = "";
            if (msgInfo.type == 5 ||
                (msgInfo.type == 3 && msgInfo.sender_id == 0) ||
                (msgInfo.type == 1 && msgInfo.sender_id == 0)) {
                name = zj.TextsConfig.TextsConfig_Chat.say_tag_1; // 系统消息
            }
            else if (msgInfo.type == 4) {
                if (msgInfo.sender_id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    name = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.say_tag_3, zj.TextsConfig.TextsConfig_Chat.say_you, msgInfo.receiver_name); // 你对谁说
                }
                else {
                    name = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.say_tag_3, msgInfo.sender_name, zj.TextsConfig.TextsConfig_Chat.say_you); // 谁对你说
                }
            }
            else if (msgInfo.type == 2 && msgInfo.show_type == 5) {
                title = zj.TextsConfig.TextsConfig_Chat.say_tag_5;
                name = msgInfo.sender_name; //  公会招募
            }
            else {
                if (msgInfo.show_type == 3 || msgInfo.show_type == 4) {
                    name = zj.TextsConfig.TextsConfig_Chat.battle_report; // 战报分享
                }
            }
            var str;
            if (msgInfo.type == 5) {
                return [title, name, content];
            }
            if (type == 1) {
                return [title, name, content];
            }
            else {
                if (name == zj.TextsConfig.TextsConfig_Chat.say_tag_1 || name == zj.TextsConfig.TextsConfig_Chat.battle_report) {
                    str = this.GetChatStr(title, name, content);
                }
                else {
                    if (title == "") {
                        //name = "【" + name + "】"
                        str = this.GetChatStr(title, name, content);
                    }
                    else {
                        //name = "【" + name + "】"
                        str = this.GetChatStr(title, name, content);
                    }
                }
                return str;
            }
        };
        PlayerChatDataSystem.prototype.GetChatStr = function (title, name, content) {
            // let strTitle = title;
            // let strName = name;
            // let strContent = content;
            // if (strTitle == "") {
            //     strTitle = "<text>" + strTitle + "</text>";
            // }
            // if (strName == "") {
            //     strName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.chat_msg, name);
            // }
            // if (strContent == "") {
            //     strContent = "<text>" + content + "</text>";
            // }
            // return [strTitle + strName + strContent];
            var strTitle = title;
            var strName = name;
            var strContent = content;
            if (name == zj.TextsConfig.TextsConfig_Chat.say_tag_1 || name == zj.TextsConfig.TextsConfig_Chat.battle_report) {
                strTitle = "<text>" + strTitle + "</text>";
                strContent = "<text>" + content + "</text>";
                return [strTitle + strName + strContent];
            }
            else {
                strTitle = "<text>" + strTitle + "</text>";
                strName = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Common.chat_msg, name);
                strContent = "<text>" + content + "</text>";
                return [strTitle + strName + strContent];
            }
        };
        /**
         * 查询数据
         */
        PlayerChatDataSystem.prototype.ChatContent = function (chatMsg) {
            var ret;
            var content;
            if (chatMsg.content_type == "") {
                if (chatMsg.type == 5) {
                    ret = chatMsg.content;
                }
                else {
                    try {
                        ret = JSON.parse(chatMsg.content);
                        if (ret.length != 0) {
                            ret = ret[0].content;
                        }
                    }
                    catch (error) {
                        ret = "";
                    }
                }
                return ret;
            }
            else {
                if (chatMsg.content != "") {
                    content = JSON.parse(chatMsg.content);
                }
            }
            var paramTbl = [];
            for (var i = 0; i < content.length; i++) {
                var cur_type = content[i].type;
                var cur_id = content[i].content;
                var cur_con = content[i].content;
                if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_NONO) {
                    paramTbl.push(cur_con);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GOODS) {
                    if (cur_id != 0) {
                        var name_1 = zj.PlayerItemSystem.Item(cur_id)["name"];
                        paramTbl.push(name_1);
                    }
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
                    var name_2 = zj.TableLanguage.Item(cur_id);
                    paramTbl.push(name_2);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND) {
                    var name_3 = zj.TableWonderland.Item(cur_id).wonderland_name;
                    paramTbl.push(name_3);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND_TREE) {
                    var name_4 = zj.TableWonderlandTree.Item(cur_id).tree_name;
                    paramTbl.push(name_4);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_ARTIFACT) {
                    var name_5 = zj.TableBaseArtifact.Item(cur_id).equip_name;
                    paramTbl.push(name_5);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GENERAL) {
                    var name_6 = null;
                    if (zj.PlayerHunterSystem.Table(cur_id)) {
                        name_6 = zj.TableBaseGeneral.Item(Number(cur_id)).general_name;
                    }
                    else {
                        name_6 = zj.TextsConfig.TextsConfig_Common.unknowGeneral;
                    }
                    paramTbl.push(name_6);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_FORMATION_COMPOSE) {
                    //local name = langdb.Instance(cur_id, _strategyCompo).compose_name
                    paramTbl.push(name);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE) {
                    var name_7 = zj.TableLeagueInstance.Item(cur_id).instance_name;
                    paramTbl.push(name_7);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GIFT) {
                    var name_8 = "";
                    if (zj.PlayerGiftSystem.Instance_item(cur_id) != null) {
                        name_8 = zj.PlayerGiftSystem.Instance_item(cur_id).name;
                    }
                    else if (zj.PlayerGiftSystem.Instance_newGiftItem(cur_id) != null) {
                        name_8 = zj.PlayerGiftSystem.Instance_newGiftItem(cur_id).name;
                    }
                    paramTbl.push(name_8);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GROUP) {
                    var name_9 = null;
                    paramTbl.push(name_9);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_SINGLECRAFT_SECTION) {
                    var name_10 = zj.TableSinglecraftScore.Item(cur_id).name;
                    paramTbl.push(name_10);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_ADVISER) {
                    var name_11 = zj.PlayerAdviserSystem.Instance(cur_id).adviser_name;
                    paramTbl.push(name_11);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_FRUIT) {
                    var name_12 = cur_id % 100;
                    paramTbl.push(name_12);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GIFT_BACK) {
                    var name_13 = zj.TextsConfig.TextsConfig_Activity.bigGift;
                    paramTbl.push(name_13);
                }
                else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_LEAGUEMATCH_SCORE) {
                    var name_14 = zj.TableLeagueMatchScore.Item(cur_id).name;
                    paramTbl.push(name_14);
                }
            }
            var funcName = chatMsg.content_type;
            if (zj.LanguageManager[funcName] != null) {
                if (paramTbl.length == 1) {
                    ret = zj.LanguageManager[funcName](paramTbl[0]);
                }
                else if (paramTbl.length == 2) {
                    ret = zj.LanguageManager[funcName](paramTbl[0], paramTbl[1]);
                }
                else if (paramTbl.length == 3) {
                    ret = zj.LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2]);
                }
                else if (paramTbl.length == 4) {
                    ret = zj.LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2], paramTbl[3]);
                }
                else if (paramTbl.length == 5) {
                    ret = zj.LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2], paramTbl[3], paramTbl[4]);
                }
                else {
                    // ret = LanguageManager[funcName]()["zhcn"];
                    ret = zj.LanguageManager[funcName]();
                    if (ret && ret["zhch"]) {
                        ret = ret["zhch"];
                    }
                }
            }
            return ret;
        };
        /**
         * 自动修正text宽高
         */
        PlayerChatDataSystem.prototype.getStrlineNum = function (info, width) {
            var lineNum = 1;
            var richStrArr = zj.Util.RichText(info);
            var richStr = "";
            for (var i = 0; i < richStrArr.length; i++) {
                richStr = richStr = richStrArr[i].text;
            }
            if (richStrArr.length >= 2) {
                if ((richStrArr[0].text.length + richStrArr[1].text.length + 1) > 48) {
                    return 2;
                }
                else {
                    var chineseNum = 0;
                    for (var i = 0; i < richStr.length; i++) {
                        if (richStr.charCodeAt(i) > 255 || richStr.charAt(i) == "）" || richStr.charAt(i) == "（")
                            chineseNum++;
                    }
                    lineNum = Math.ceil(((richStr.length - chineseNum) / 2 + chineseNum) / (width / 16));
                    return lineNum;
                }
            }
        };
        /**
         * 绘制区域
         */
        PlayerChatDataSystem.prototype.getDraw = function (rect, area, colour) {
            rect = new eui.Rect(area.width, area.height, colour);
            rect.alpha = 0.3;
            rect.x = area.x;
            rect.y = area.y;
            return rect;
            //this.addChild(this.rect);
        };
        return PlayerChatDataSystem;
    }());
    zj.PlayerChatDataSystem = PlayerChatDataSystem;
    __reflect(PlayerChatDataSystem.prototype, "zj.PlayerChatDataSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerChatDataSystem.js.map