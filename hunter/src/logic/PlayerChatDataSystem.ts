namespace zj {
export class PlayerChatDataSystem {
    typeDict = {
        ["int8"]: "c",
        ["uint8"]: "b",
        ["int16"]: "h",
        ["uint16"]: "H",
        ["int32"]: "i",
        ["uint32"]: "I",
        ["int64"]: "l",
        ["bool"]: "t",
        ["float"]: "f",
        ["double"]: "d",
        ["string"]: "a",
    }
    public chatRecordType = 0;// 聊天记录上次选择类型  

    // 整理信息
    public chatInfos = [];// 聊天信息
    public chatInfosMini = [];// 简易聊天信息
    public chatInfosScene = [];// 联盟场景信息数据
    public chatInfoTmp = [];//临时消息，客户端自己添加的
    public chatInfoCnt = [];// [1]:world,[2]:ally,[3]:whisper,[4]wonderland
    public chatShieldTbl = [];// 聊天屏蔽列表
    public bAddChats = false;// 是否需要刷新主界面的聊天信息，针对ChatMessageNotice

    // 联盟战
    leagueWar = {
        bChatAdd: false,// 是否有新的联盟战系统信息
        serverSceneId: 0,// 场景id
        chatInfosMini: [], // 简易聊天信息
    }

    chatInfo = {
        chat_channel_id: 1,
        channel_count: 0,
    }

    public init() {
        Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.EnterChatReq, this);//  连接聊天服
        // 推送聊天消息
        Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
    }

    public uninit() {
        this.chatInfos = [];// 聊天信息
        this.chatInfosMini = [];// 简易聊天信息
        this.chatInfosScene = [];// 联盟场景信息数据
        this.chatInfoTmp = [];//临时消息，客户端自己添加的
        this.chatInfoCnt = [];// [1]:world,[2]:ally,[3]:whisper,[4]wonderland
        this.chatShieldTbl = [];// 聊天屏蔽列表
        this.bAddChats = false;// 是否需要刷新主界面的聊天信息，针对ChatMessageNotice
    }

    /**
     * 推送聊天消息
     */
    public ChatMessageNotice_Visit(msg, result) {
        msg = msg.data.body;
        for (let i = 0; i < msg.chatinfos.length; i++) {
            let chatInfo = msg.chatinfos[i];
            if (chatInfo.type != message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                this.chatInfos.push(chatInfo);
                Game.EventManager.event(GameEvent.CHAT_RESTART);
            }
        }
    }

    /**
     * 连接聊天服
     */
    public EnterChatReq() {
        return new Promise((resolve, reject) => {
            let request = new message.EnterChatRequest();
            request.body.channel_id = 0;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.EnterChatResponse>resp;
                if (response.header.result != 0) {
                    // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                this.ChatHistroyReqFirstTime();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * 拉取历史记录
     */
    public ChatHistroyReqFirstTime() {
        return new Promise((resolve, reject) => {
            let request = new message.ChatHistroyRequest();
            request.body.type = 0;
            request.body.chat_id = 0;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.ChatHistroyResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                let para = {}
                para["index"] = 4
                let inflate = new Zlib.Inflate(response.body.chats, para);
                let plain = inflate.decompress();
                let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                let items = new message.ChatMessageChunk()
                if (!items.parse_bytes(decoder)) {
                    toast(LANG("游戏数据解析失败"));
                    return;
                }
                resolve(items);
                Game.PlayerChatDataSystem.chatInfos = [];
                this.ChatHistroyReqFirstTime_Visit(items);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public ChatHistroyReqFirstTime_Visit(msg) {
        if (msg.chats != null) {
            let infos = msg.chats;
            this.LoadServerData_ChatInfos(infos);// 存到内存Player中，随时调用
            // 聊天提示
            for (let i = 0; i < message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL; i++) {
                this.chatInfoCnt[i] = 0;
            }
            //Tips.SetTipsOfId(Tips.TAG.CHAT);// 红点报错

            let cht = new message.ChatMessage();
            cht.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM;
            cht.content = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.enter_chat, (this.chatInfo.chat_channel_id));
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
    }

    public create_msg(def) {
        let msg = [];
        let attribsDef = def["attribs"];
        if (attribsDef == null) {
            msg["def"] = def;
            return msg;
        }
        for (let i in attribsDef) {
            let attr = attribsDef[i];
            let attrName = attr[0];
            let attrType = attr[1];
            if (attr[3] == "repeat") {

            } else if (this.is_basic_attrib(attrType) == false) {
                msg[attrName] = this.create_msg(this.get_attrib_def(def, attrType));
            } else if (attrType == "string") {
                msg[attrName] = "";
            } else if (attrType == "bool") {
                msg[attrName] = false;
            } else {
                msg[attrName] = 0;
            }
        }
        msg["def"] = def;
        return msg;
    }

    public is_basic_attrib(attrType) {
        return this.typeDict[attrType] != null;
    }

    public get_attrib_def(def, attrType) {
        let attrDef = def[attrType];
        if (attrDef == null) {
            attrDef = [attrType];
        }
        return attrDef;
    }

    public LoadServerData_ChatInfos(data) {
        // 数据调整，丢弃过多的聊天信息
        let cnt_cur = Game.PlayerChatDataSystem.chatInfos.length;
        let cnt_add = 0;
        // 去除content_type为client_chat_role_6的信息 by leiye
        // 去除屏蔽的玩家
        let ik = 0;
        while (ik < data.length) {
            if (data[ik].content_type == "client_chat_role_6") {// ||Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, data[ik].sender_id) != -1       
                data.splice(ik, 1);
                //data.shift();
            } else {
                ik = ik + 1;
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {

            } else {
                cnt_add = cnt_add + 1;
            }
        }
        if (cnt_cur + cnt_add > 100) {
            let cnt_dt = cnt_cur + cnt_add - 100;
            for (let i = 0; i < cnt_dt; i++) {
                Game.PlayerChatDataSystem.chatInfos.splice(i, 1);
            }
        }

        Game.PlayerChatDataSystem.bAddChats = false;
        Game.PlayerChatDataSystem.leagueWar.bChatAdd = false;
        Game.PlayerWonderLandSystem.bChatAdd = false;          // 贪婪之岛
        Game.PlayerZorkSystem.zorkBoss.bChatAdd = false;
        Game.PlayerZorkSystem.zork.bChatAdd = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {

            } else {
                Game.PlayerChatDataSystem.chatInfos.push(data[i]);
                if (data[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_CHEST &&
                    data[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM) {
                    this.AddMiniChatInfo(data[i]);
                    this.bAddChats = true;
                } else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE) {
                    // 要区分场景id，看是否添加到mini界面
                    if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORK ||
                        Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORKBOSS ||
                        Gmgr.Instance.layerId == TableEnumLayerId.LAYER_LEAGUE_FIGHT ||
                        Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND) {

                    }
                }

                if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD) {

                } else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL &&
                    data[i].receiver_id == Game.PlayerInfoSystem.BaseInfo.id) {
                    this.chatInfoCnt[4] = this.chatInfoCnt[4] + 1;
                } else if (data[i].type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM) {
                    if (data[i].show_uid == Game.PlayerZorkSystem.zorkBoss.serverSceneId) {// 世界boss
                        this.AddZorkBossChatInfo(data[i]);
                        Game.PlayerZorkSystem.zorkBoss.bChatAdd = true;
                    } else if (data[i].uid == Game.PlayerWonderLandSystem.serverSceneId) {// 贪婪之岛
                        this.AddWonderlandChatInfo(data[i]);
                        Game.PlayerWonderLandSystem.bChatAdd = true;
                    } else if (data[i].uid == this.leagueWar.serverSceneId) {
                        this.AddLeagueWarChatInfo(data[i])
                        this.leagueWar.bChatAdd = true;
                    }
                }
            }
        }
        let a = Game.PlayerChatDataSystem.chatInfos;
        Game.EventManager.event(GameEvent.CHAT_RESTART);
    }

    public AddMiniChatInfo(info) {
        if (this.chatInfosMini.length >= 5) {
            this.chatInfosMini.splice(0, 1);
        }
        this.chatInfosMini.push(info);
    }

    // 世界boss
    public AddZorkBossChatInfo(info) {
        if (Game.PlayerZorkSystem.zorkBoss.chatInfosMini.length >= 5) {
            Game.PlayerZorkSystem.zorkBoss.chatInfosMini.splice(0, 1);
        }
        Game.PlayerZorkSystem.zorkBoss.chatInfosMini.push(info);
    }

    // 贪婪之岛
    public AddWonderlandChatInfo(info) {
        if (Game.PlayerWonderLandSystem.chatInfosMini.length >= 5) {
            Game.PlayerWonderLandSystem.chatInfosMini.splice(0, 1);
        }
        Game.PlayerWonderLandSystem.chatInfosMini.push(info);
    }

    public AddLeagueWarChatInfo(info) {
        if (this.leagueWar.chatInfosMini.length >= 5) {
            this.leagueWar.chatInfosMini.splice(0, 1);
        }
        this.leagueWar.chatInfosMini.push(info);
    }

    /**
     * 输入
     */
    public SendChat(_chatType: number, receiverId: number, content: string, group_id: number) {
        return new Promise((resolve, reject) => {
            let request = new message.SendChatRequest();
            request.body.type = _chatType + 1;
            if (Device.isReviewSwitch && _chatType == message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS) {
                request.body.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD;
            }
            request.body.receiverId = receiverId;
            request.body.content = content;
            request.body.show_type = 0;
            request.body.show_id = 0;
            request.body.battle_id = "";
            request.body.receiver_groupId = group_id;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SendChatResponse>resp;
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

    /**
     * 切换频道
     */
    public SwitchingChannel(channelId: any) {
        return new Promise((resolve, reject) => {
            let request = new message.EnterChatRequest();
            request.body.channel_id = channelId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.EnterChatResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body);
                Game.PlayerChatDataSystem.chatInfo.chat_channel_id = response.body.channel_id;

            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * 角色数据
     */
    public RoleDate(_leagueBase: any) {
        return new Promise((resolve, reject) => {
            let request = new message.QueryRoleInfoRequest();
            request.body.roleId = _leagueBase.leaderId;
            request.body.group_id = Device.gameserver.ID;
            request.body.battle_type = 0;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.QueryRoleInfoResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.roleInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * (公会)申请加入
     */
    public applyJoin(_leagueBase: any) {
        return new Promise((resolve, reject) => {
            let request = new message.LeagueApplyRequest();
            request.body.leagueid = _leagueBase.leagueId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.LeagueApplyResponse>resp;
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
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * 查询
     */
    public guildQuery(_msgInfo: any) {
        return new Promise((resolve, reject) => {
            let request = new message.QueryLeagueInfoRequest();
            request.body.leagueId = _msgInfo.leagueId;
            request.body.groupId = _msgInfo.group_id;
            request.body.roleId = _msgInfo.id;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.QueryLeagueInfoResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.info);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * 工会1
     */
    public organizationChat1(_msgInfo: any) {
        return new Promise((resolve, reject) => {
            let request = new message.QueryLeagueInfoRequest();
            request.body.leagueId = _msgInfo.sender_id;
            request.body.groupId = 0;
            request.body.roleId = Game.PlayerInfoSystem.BaseInfo.id;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.QueryLeagueInfoResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.info);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    /**
     * 工会2
     */
    public organizationChat2(_msgInfo: any, cb) {
        return new Promise((resolve, reject) => {
            let request = new message.QueryRoleInfoRequest();
            if (_msgInfo.sender_id == Game.PlayerInfoSystem.BaseInfo.id) {
                if (_msgInfo.receiver_id == 0) {
                    return;
                } else {
                    request.body.roleId = _msgInfo.receiver_id;
                }
            } else {
                request.body.roleId = _msgInfo.sender_id;
            }
            if(cb){
                cb(request)
            }
            request.body.group_id = _msgInfo.sender_group_id;
            request.body.battle_type = 0;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.QueryRoleInfoResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

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
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public GetChatInfo(msgInfo, type?) {
        if (msgInfo == null) {
            return;
        }
        let name = "";
        let title = "";
        name = msgInfo.sender_name;
        let content = this.ChatContent(msgInfo);
        if(content == null || content == undefined) content = "";
        if (msgInfo.content_type != "" && msgInfo.type != 4) {
            content = content;
            // if (msgInfo.content == "[]") {
            //     content = LanguageManager[msgInfo.content_type](); //msgInfo.content_type;
            // }
        }
        let str_msg = "";
        if (msgInfo.type == 5 ||
            (msgInfo.type == 3 && msgInfo.sender_id == 0) ||
            (msgInfo.type == 1 && msgInfo.sender_id == 0)) {
            name = TextsConfig.TextsConfig_Chat.say_tag_1;// 系统消息
        } else if (msgInfo.type == 4) {
            if (msgInfo.sender_id == Game.PlayerInfoSystem.BaseInfo.id) {
                name = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.say_tag_3,
                    TextsConfig.TextsConfig_Chat.say_you, msgInfo.receiver_name);// 你对谁说
            } else {
                name = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.say_tag_3,
                    msgInfo.sender_name, TextsConfig.TextsConfig_Chat.say_you)// 谁对你说
            }
        } else if (msgInfo.type == 2 && msgInfo.show_type == 5) {
            title = TextsConfig.TextsConfig_Chat.say_tag_5;
            name = msgInfo.sender_name;//  公会招募
        } else {
            if (msgInfo.show_type == 3 || msgInfo.show_type == 4) {
                name = TextsConfig.TextsConfig_Chat.battle_report;// 战报分享
            }
        }

        let str;
        if(msgInfo.type == 5) {
            return [title, name, content];
        }
        if (type == 1) {
            return [title, name, content];
        } else {
            if (name == TextsConfig.TextsConfig_Chat.say_tag_1 || name == TextsConfig.TextsConfig_Chat.battle_report) {
                str = this.GetChatStr(title, name, content);
            } else {
                if (title == "") {
                    //name = "【" + name + "】"
                    str = this.GetChatStr(title, name, content);
                } else {
                    //name = "【" + name + "】"
                    str = this.GetChatStr(title, name, content);
                }
            }
            return str;
        }
    }

    public GetChatStr(title, name, content) {
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

        let strTitle = title;
        let strName = name;
        let strContent = content;
        if (name == TextsConfig.TextsConfig_Chat.say_tag_1 || name == TextsConfig.TextsConfig_Chat.battle_report) {
            strTitle = "<text>" + strTitle + "</text>";
            strContent = "<text>" + content + "</text>";
            return [strTitle + strName + strContent];
        } else {
            strTitle = "<text>" + strTitle + "</text>";
            strName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.chat_msg, name);
            strContent = "<text>" + content + "</text>";
            return [strTitle + strName + strContent];
        }
    }

    /**
     * 查询数据
     */
    public ChatContent(chatMsg) {
        let ret;
        let content;
        if (chatMsg.content_type == "") {
            if (chatMsg.type == 5) {
                ret = chatMsg.content;
            } else {
               try {
                    ret = JSON.parse(chatMsg.content);
                    if(ret.length != 0) {
                        ret = ret[0].content;
                    }
                } catch (error) {
                    ret = "";
                }
            }        
            return ret;
        } else {
            if (chatMsg.content != "") {
                    content = JSON.parse(chatMsg.content);
            }
        }
        let paramTbl = [];
        for (let i = 0; i < content.length; i++) {
            let cur_type = content[i].type;
            let cur_id = content[i].content;
            let cur_con = content[i].content;
            if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_NONO) {// 未知类型(按正常文本处理)
                paramTbl.push(cur_con);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GOODS) {// 物品
                if (cur_id != 0) {
                    let name = PlayerItemSystem.Item(cur_id)["name"];
                    paramTbl.push(name);
                }
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {// 怪物
                let name = TableLanguage.Item(cur_id);
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND) {// 仙境
                let name = TableWonderland.Item(cur_id).wonderland_name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND_TREE) {// 仙境建筑
                let name = TableWonderlandTree.Item(cur_id).tree_name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_ARTIFACT) {// 神兵
                let name = TableBaseArtifact.Item(cur_id).equip_name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GENERAL) {// 武将
                let name = null;
                if (PlayerHunterSystem.Table(cur_id)) {
                    name = TableBaseGeneral.Item(Number(cur_id)).general_name;
                } else {
                    name = TextsConfig.TextsConfig_Common.unknowGeneral;
                }
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_FORMATION_COMPOSE) {// 阵型组合-- 没有这张表
                //local name = langdb.Instance(cur_id, _strategyCompo).compose_name
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE) {// 帮会副本
                let name = TableLeagueInstance.Item(cur_id).instance_name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GIFT) {// RMB礼包
                let name = "";
                if (PlayerGiftSystem.Instance_item(cur_id) != null) {
                    name = PlayerGiftSystem.Instance_item(cur_id).name;
                } else if (PlayerGiftSystem.Instance_newGiftItem(cur_id) != null) {
                    name = PlayerGiftSystem.Instance_newGiftItem(cur_id).name;
                }
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GROUP) {// 区服--有问题
                let name = null;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_SINGLECRAFT_SECTION) {// 跨服战段位           
                let name = TableSinglecraftScore.Item(cur_id).name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_ADVISER) {// 念兽
                let name = PlayerAdviserSystem.Instance(cur_id).adviser_name;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_FRUIT) {// 双色果
                let name = cur_id % 100;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_GIFT_BACK) {// 大佬购买礼包联盟成员反馈
                let name = TextsConfig.TextsConfig_Activity.bigGift;
                paramTbl.push(name);
            } else if (cur_type == message.ETextArgType.TEXT_ARG_TYPE_LEAGUEMATCH_SCORE) {// 联赛段位
                let name = TableLeagueMatchScore.Item(cur_id).name;
                paramTbl.push(name);
            }
        }

        let funcName = chatMsg.content_type;
        if (LanguageManager[funcName] != null) {
            if (paramTbl.length == 1) {
                ret = LanguageManager[funcName](paramTbl[0]);
            } else if (paramTbl.length == 2) {
                ret = LanguageManager[funcName](paramTbl[0], paramTbl[1]);
            } else if (paramTbl.length == 3) {
                ret = LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2]);
            } else if (paramTbl.length == 4) {
                ret = LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2], paramTbl[3]);
            } else if (paramTbl.length == 5) {
                ret = LanguageManager[funcName](paramTbl[0], paramTbl[1], paramTbl[2], paramTbl[3], paramTbl[4]);
            } else {
                // ret = LanguageManager[funcName]()["zhcn"];
                ret = LanguageManager[funcName]();
                if(ret && ret["zhch"]){
                    ret = ret["zhch"];
                }
            }
        }
        return ret;
    }

    /**
     * 自动修正text宽高
     */
    public getStrlineNum(info: string, width: number, ) {
        let lineNum = 1;
        let richStrArr = Util.RichText(info);
        let richStr = "";
        for (let i = 0; i < richStrArr.length; i++) {
            richStr = richStr = richStrArr[i].text;
        }
        if (richStrArr.length >= 2) {
            if ((richStrArr[0].text.length + richStrArr[1].text.length + 1) > 48) {
                return 2;
            } else {
                let chineseNum = 0;
                for (let i = 0; i < richStr.length; i++) {
                    if (richStr.charCodeAt(i) > 255 || richStr.charAt(i) == "）" || richStr.charAt(i) == "（")
                        chineseNum++;
                }
                lineNum = Math.ceil(((richStr.length - chineseNum) / 2 + chineseNum) / (width / 16));
                return lineNum;
            }
        }

    }

    /**
     * 绘制区域
     */
    public getDraw(rect, area, colour) {
        rect = new eui.Rect(area.width, area.height, colour);
        rect.alpha = 0.3;
        rect.x = area.x;
        rect.y = area.y;
        return rect;
        //this.addChild(this.rect);
    }

}

}