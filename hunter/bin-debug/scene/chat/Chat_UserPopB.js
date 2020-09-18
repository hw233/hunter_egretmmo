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
    // 
    // lizhengqiang
    // 20190312
    var Chat_UserPopB = (function (_super) {
        __extends(Chat_UserPopB, _super);
        function Chat_UserPopB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/Chat_UserPopBSkin.exml";
            _this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPrivate, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCheck, _this);
            _this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnJoin, _this);
            return _this;
        }
        Chat_UserPopB.prototype.setMsgInfo = function (info, infos, index) {
            if (infos === void 0) { infos = null; }
            if (index === void 0) { index = null; }
            this.info = info.baseInfo;
            this.infos = infos;
            this.index = index;
            this.msg = info;
            if (infos == null) {
                this.isCommon = true;
                this.btnJoin.visible = false;
            }
            else {
                this.isCommon = false;
                this.groupName = infos.role_info.group_name;
            }
            this.imgBoard.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.picFrameId), this);
            if (!this.isCommon && zj.Game.Controller.lastLoginGroupID() != this.infos.role_info.server_id && this.groupName != "") {
                this.btnJoin.visible = false;
                if (this.groupName != "") {
                    var split = function (str) {
                        if (str.indexOf("{") == -1)
                            return ["", ""];
                        var json = JSON.parse(str);
                        var arr = json["zhcn"].split("&");
                        if (arr.length >= 2)
                            return arr;
                        return ["", ""];
                    };
                    this.splitList = split(this.groupName);
                    this.lbServerName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, this.splitList[0], this.splitList[1]);
                    this.name1 = this.splitList[1];
                }
                else {
                    this.lbServerName.text = this.groupName;
                    this.name1 = this.info.group_name;
                }
            }
            else if (this.isCommon || zj.Game.Controller.lastLoginGroupID() == this.infos.role_info.server_id || this.groupName == "") {
                this.lbServerName.text = zj.TextsConfig.TextsConfig_Chat.serverSelf;
                this.name1 = zj.TextsConfig.TextsConfig_Chat.serverSelf;
            }
            var titleName = zj.TableItemTitle.Item(this.info.titleId).name;
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.picId), this);
            this.lbPlayerName.text = this.info.name;
            if (this.info.leagueName != "") {
                this.lbLeagueName.text = this.info.leagueName;
            }
            else {
                this.lbLeagueName.text = zj.TextsConfig.TextsConfig_Rank.ally_no;
            }
            this.lbTitleName.text = titleName;
            if (this.info.leagueName != "" && this.info.matchScore != 0) {
                var imgLeagueStar = new eui.Image(zj.PlayerLeagueSystem.GetSegment(this.info.matchScore)[4]);
                imgLeagueStar.x = this.lbLeagueName.x + this.lbLeagueName.width + 5;
                imgLeagueStar.y = this.lbLeagueName.y - 5;
                this.groupAdaptBoard.addChild(imgLeagueStar);
            }
        };
        Chat_UserPopB.prototype.onBtnPrivate = function () {
            var _this = this;
            // toast("设为私聊");
            if (this.info.id != null) {
                if (this.isCommon) {
                    zj.loadUI(zj.Chat_Main)
                        .then(function (dialog) {
                        zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: _this.info.id, name: _this.info.name, group_id: zj.Device.gameserver.ID });
                        dialog.show();
                        _this.close();
                    });
                }
                else {
                    zj.loadUI(zj.Chat_Main)
                        .then(function (dialog) {
                        zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: _this.info.id, name: _this.info.name, group_id: _this.infos.role_info.group_id });
                        dialog.show();
                        _this.close();
                    });
                }
            }
        };
        // 加为好友
        Chat_UserPopB.prototype.onBtnAdd = function () {
            var _this = this;
            zj.TipManager.RelationAdd(this.info.id, function () { _this.close(); });
        };
        // 查看详情
        Chat_UserPopB.prototype.onBtnCheck = function () {
            var _this = this;
            if (this.msg.generals == null || this.msg.generals.length == 0) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Common.noHunter));
            }
            else {
                if (!this.isCommon && zj.Game.Controller.lastLoginGroupID() != this.infos.role_info.server_id && this.groupName != "") {
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(_this.msg, _this.splitList);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        _this.close();
                    });
                }
                else {
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(_this.msg, _this.name1);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        _this.close();
                    });
                }
            }
        };
        // 加入公会
        Chat_UserPopB.prototype.onBtnJoin = function () {
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, true)) {
                zj.TipManager.LeagueApply(this.info.leagueId);
            }
        };
        return Chat_UserPopB;
    }(zj.UI));
    zj.Chat_UserPopB = Chat_UserPopB;
    __reflect(Chat_UserPopB.prototype, "zj.Chat_UserPopB");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_UserPopB.js.map