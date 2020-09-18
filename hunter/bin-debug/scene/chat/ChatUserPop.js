var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    var BATTLELEVEL = 8;
    var BATTLELEVELS = 40;
    var ChatUserPop = (function (_super) {
        __extends(ChatUserPop, _super);
        function ChatUserPop() {
            var _this = _super.call(this) || this;
            _this.personage = 0;
            _this.type = 0;
            _this.skinName = "resource/skins/chat/ChatUserPopSkin.exml";
            _this.init();
            _this.monitorEvent();
            return _this;
        }
        ChatUserPop.prototype.init = function () {
            this.personage = 1;
            this.closeWindow.visible = true;
        };
        /**
         * 初始化
         */
        ChatUserPop.prototype.setMsgInfo = function (msg, msgInfos, id) {
            // 查看详情的信息
            this.msgInfo = msg.baseInfo;
            this.msg = msg;
            // 分区名字
            this.senderGroupName = msg.baseInfo.group_name;
            // 聊天协议返回的信息
            this.msgInfos = msgInfos;
            this.imgBoard.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(msg.baseInfo.picFrameId), this);
            this.groupLeagueInfo.visible = Number(this.msgInfo.leagueId) != 0;
            if (id != this.msgInfo.server_id && this.senderGroupName != "") {
                this.btnJoin.visible = false;
                if (this.senderGroupName != "") {
                    var sn = zj.Set.DecodeJson(this.senderGroupName);
                    var splitList = sn.split("&");
                    this.splitList = sn.split("&");
                    this.labelServerName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, splitList[0], splitList[1]);
                    this._name = sn.split("&")[1];
                }
                else {
                    this.labelServerName.text = this.senderGroupName;
                    this._name = this.senderGroupName;
                }
            }
            else if ((id == this.msgInfo.server_id && msgInfos.receiver_id == 0) || this.senderGroupName == "") {
                this.labelServerName.text = zj.TextsConfig.TextsConfig_Chat.serverSelf;
                this._name = zj.TextsConfig.TextsConfig_Chat.serverSelf;
            }
            else {
                this.labelServerName.visible = false;
            }
            var titleName = zj.TableItemTitle.Item(this.msgInfo.titleId).name;
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.msgInfo.picId), this);
            this.labelPlayerName.text = this.msgInfo.name;
            if (this.msgInfo.leagueName != "") {
                this.labelLeagueName.text = this.msgInfo.leagueName;
            }
            else {
                this.labelLeagueName.text = zj.TextsConfig.TextsConfig_Rank.ally_no;
            }
            this.labelTitleName.text = titleName;
            if (!zj.Device.isReviewSwitch) {
                // 设置单队切磋是否显示
                if (this.msgInfo.level < BATTLELEVEL) {
                    this.btnOnePk.visible = false;
                }
                else {
                    this.btnOnePk.visible = true;
                }
            }
            // 设置三队切磋是否显示
            if (this.msgInfo.level < BATTLELEVELS) {
                this.btnThreePk.visible = false;
            }
            else {
                this.btnThreePk.visible = true;
            }
            this.btnHide.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
            this.btnShow.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
            zj.Game.PlayerRelateSystem.serverName = this._name;
        };
        /**
         * 监听事件
         */
        ChatUserPop.prototype.monitorEvent = function () {
            if (!zj.Device.isReviewSwitch) {
                this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this); // 加为好友
                this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this); // 查看详情
                this.btnHide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHide, this); // 屏蔽此人聊天
                this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJoin, this); // 加入公会 
                this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOnePk, this); // 单队切磋
                this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this); // 设为私聊
                this.btnShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this); // 显示此人聊天
                this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnThreePk, this); // 三队切磋
                this.groupLeagueInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeagueInfo, this); // 查看工会详细信息
                this.closeWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseWindow, this); // 关闭界面		
            }
            else {
                this.groupLeagueInfo.visible = false;
                this.btnAdd.visible = false;
                this.btnThreePk.visible = false;
                this.btnJoin.visible = false;
                this.btnCheck.visible = false;
                this.btnOnePk.visible = false;
                this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this); // 设为私聊
                this.btnHide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHide, this); // 屏蔽此人聊天
                this.closeWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseWindow, this); // 关闭界面		
            }
        };
        /**
         * 屏蔽此人聊天
         */
        ChatUserPop.prototype.onBtnHide = function () {
            zj.Game.PlayerChatDataSystem.chatShieldTbl.push(this.msgInfo.id);
            this.btnHide.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
            this.btnShow.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
        };
        /**
         * 显示此人聊天
         */
        ChatUserPop.prototype.onBtnShow = function () {
            for (var i = 0; i < zj.Game.PlayerChatDataSystem.chatShieldTbl.length; i++) {
                var v = zj.Game.PlayerChatDataSystem.chatShieldTbl[i];
                if (v == this.msgInfo.id) {
                    zj.Game.PlayerChatDataSystem.chatShieldTbl.splice(i, 1);
                }
            }
            this.btnHide.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
            this.btnShow.visible = (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
        };
        /**
         * 单队切磋
         */
        ChatUserPop.prototype.onBtnOnePk = function () {
            var Formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ONEBATTEL, true)) {
                zj.TipManager.PVPLadderBattle_Req(this.msgInfo.id, this.msgInfo.group_id, Formation, this._name, this.msgInfo, null, this);
            }
        };
        /**
         * 三队切磋
         */
        ChatUserPop.prototype.onBtnThreePk = function () {
            var Formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.THREEBATLEE, true)) {
                this.type = 100;
                zj.TipManager.PVPLadderBattle_Req(this.msgInfo.id, this.msgInfo.group_id, Formation, this._name, this.msgInfo, this.type, null, this);
            }
        };
        /**
         * 设为私聊
         */
        ChatUserPop.prototype.onBtnPrivate = function () {
            this.onCloseWindow();
            zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: this.msgInfos.sender_id, name: this.msgInfos.sender_name, group_id: this.msgInfo.group_id, type: this.personage });
        };
        /**
         * 查看详情
         */
        ChatUserPop.prototype.onBtnCheck = function () {
            var _this = this;
            if (this.msg == null || this.msg.generals.length == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Common.noHunter);
            }
            else {
                if (this.msg.baseInfo.server_id != this.msgInfo.server_id && this.senderGroupName != "") {
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(_this.msg, _this.splitList);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(_this.msg, _this.labelServerName.text);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        /**
         * 加为好友
         */
        ChatUserPop.prototype.onBtnAdd = function () {
            var _this = this;
            zj.TipManager.RelationAdd(this.msgInfo.id, function () {
                _this.alpha = 0;
                _this.close(zj.UI.HIDE_TRAIL_OFF);
            });
        };
        /**
         * 加入公会
         */
        ChatUserPop.prototype.onBtnJoin = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE, true)) {
                zj.TipManager.LeagueApply(this.msgInfo.leagueId);
            }
        };
        /**
         * 查看工会详细信息
         */
        ChatUserPop.prototype.onBtnLeagueInfo = function () {
            var _this = this;
            var sameServer = ((this.msg.baseInfo.server_id == this.msgInfo.server_id && this.msgInfos.receiver_id == 0) || this.senderGroupName == "");
            zj.Game.PlayerChatDataSystem.guildQuery(this.msgInfo)
                .then(function (msg) {
                var cb = function () {
                    _this.groupAdaptBoard.visible = true;
                };
                if (msg.length != 0) {
                    _this.groupAdaptBoard.visible = false;
                    zj.loadUI(zj.LeagueJoinMini)
                        .then(function (dialog) {
                        dialog.SetInfo(msg[0], sameServer);
                        dialog.SetCB(cb);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            })
                .catch(function () {
            });
        };
        /**
         * 关闭
         */
        ChatUserPop.prototype.onCloseWindow = function () {
            this.close();
        };
        return ChatUserPop;
    }(zj.Dialog));
    zj.ChatUserPop = ChatUserPop;
    __reflect(ChatUserPop.prototype, "zj.ChatUserPop");
})(zj || (zj = {}));
//# sourceMappingURL=ChatUserPop.js.map