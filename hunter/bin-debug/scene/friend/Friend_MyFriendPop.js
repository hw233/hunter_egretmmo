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
    //好友列表点击后的小界面
    //wangshenzhuo
    //2019/03/15
    var Friend_MyFriendPop = (function (_super) {
        __extends(Friend_MyFriendPop, _super);
        function Friend_MyFriendPop() {
            var _this = _super.call(this) || this;
            _this.battlelevel = 8; //开启单队切磋
            _this.battlelevels = 40; //开启三队切磋
            _this.skinName = "resource/skins/friend/Friend_MyFriendPopSkin.exml";
            _this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonCheck, _this);
            _this.buttonJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonJoin, _this);
            _this.buttonPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPrivate, _this);
            _this.buttonMail.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMail, _this);
            _this.buttonDelete.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonDelete, _this);
            _this.buttonOnePk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOnePk, _this);
            _this.buttonThreePk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnThreePk, _this);
            return _this;
        }
        Friend_MyFriendPop.prototype.SetInfo = function (info, father, index, x, y) {
            this.groupMain.scaleX = 0.1;
            this.groupMain.scaleY = 0.1;
            egret.Tween.get(this.groupMain).to({ scaleX: 1.2 }, 250).to({ scaleX: 1.1 }, 80).to({ scaleX: 1.2 }, 80);
            egret.Tween.get(this.groupMain).to({ scaleY: 1.2 }, 250).to({ scaleY: 1.1 }, 80).to({ scaleY: 1.2 }, 80);
            this.x = x;
            this.y = y - 175;
            this.father = father;
            this.info = info;
            this.index1 = index;
            if (zj.Game.Controller.lastLoginGroupID() != this.info.roleInfo.server_id && this.info.roleInfo.group_name != "") {
                // this.buttonJoin.visible = false;
                if (this.info.roleInfo.group_name != "") {
                    var sn = JSON.stringify(this.info.roleInfo.group_name);
                    this.name1 = sn.split("&")[1];
                }
                else {
                    this.name1 = this.info.roleInfo.group_name;
                }
            }
            //设置单队切磋是否显示
            if (this.info.roleInfo.level < this.battlelevel) {
                this.buttonOnePk.visible = false;
            }
            else {
                this.buttonOnePk.visible = true;
            }
            //设置三队切磋是否显示
            if (this.info.roleInfo.level < this.battlelevels) {
                this.buttonThreePk.visible = false;
            }
            else {
                this.buttonThreePk.visible = true;
            }
        };
        //查看详情
        Friend_MyFriendPop.prototype.onButtonCheck = function () {
            zj.Game.PlayerInfoSystem.queryRoleInfo(this.info.roleInfo.id, this.info.roleInfo.group_id).then(function (resp) {
                var name = "";
                if (resp.baseInfo.group_name != "") {
                    name = resp.baseInfo.group_name;
                    name = name.slice(name.indexOf(":") + 2, name.indexOf("&")) + "区" + name.slice(name.indexOf("&") + 1, name.indexOf("}") - 1);
                }
                else {
                    name = zj.TextsConfig.TextsConfig_Chat.serverSelf;
                }
                if (resp.generals.length == 0) {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Common.noHunter));
                }
                else {
                    // "Common_Player"
                    zj.loadUI(zj.CommonPlayer).then(function (dialog) {
                        dialog.setInfo(resp, name);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        zj.Game.EventManager.event(zj.GameEvent.FRIEND_TOPPOP_REMOVE);
                    });
                }
            });
            this.removeChildren();
        };
        Friend_MyFriendPop.prototype.UplistTable = function (ev) {
        };
        //加入公会
        Friend_MyFriendPop.prototype.onButtonJoin = function () {
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, true)) {
                var role = this.info.roleInfo.id;
                zj.TipManager.LeagueApply(this.info.roleInfo.leagueId);
            }
            this.removeChildren();
        };
        //删除好友
        Friend_MyFriendPop.prototype.onButtonDelete = function () {
            var _this = this;
            var confirmDes = zj.TextsConfig.TextsConfig_Friend.confirmDelete[this.father.relationMap[this.index1].type];
            zj.TipManager.ShowConfirmCancel(zj.Helper.StringFormat(confirmDes, this.father.relationMap[this.index1].roleInfo.name), function () { _this.RelationDelete_Req(); });
            this.removeChildren();
        };
        Friend_MyFriendPop.prototype.RelationDelete_Req = function () {
            var _this = this;
            this.RelationDelele_Visit()
                .then(function (data) {
                var relate = _this.father.relationMap[_this.index1];
                zj.PlayerRelateSystem.Delete(relate);
                setTimeout(function () {
                    _this.father.SetInfo();
                }, 500);
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        Friend_MyFriendPop.prototype.RelationDelele_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationDeleteRequest();
                request.body.type = _this.father.relationType;
                request.body.roleId = _this.info.roleInfo.id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
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
        Friend_MyFriendPop.prototype.onBtnMail = function () {
            // toast("发送信件");
            var info = new message.MailInfo();
            info.type = message.MailType.MAIL_TYPE_NORMAL;
            info.from_id = this.father.relationMap[this.index1].roleInfo.id;
            var roles = [];
            roles.push(this.info.roleInfo);
            info.roleBaseInfo = roles;
            zj.loadUI(zj.Common_Letter)
                .then(function (dailog) {
                dailog.show();
                dailog.setInfo(info);
            });
            this.removeChildren();
        };
        Friend_MyFriendPop.prototype.onBtnPrivate = function () {
            var _this = this;
            // toast("设为私聊");
            var role = this.father.relationMap[this.index1].roleInfo;
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: _this.info.roleInfo.group_id });
                dialog.show();
            });
        };
        Friend_MyFriendPop.prototype.onBtnOnePk = function () {
            // toast("单队切磋");
            var Formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
            var playerInfo = ["Lv." + this.info.roleInfo.level + " " + this.info.role_name, "groupStr", ":", this.info.pic, this.index1];
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE, true)) {
                zj.TipManager.PVPLadderBattle_Req(this.info.roleInfo.id, null, Formation, null, this.info.roleInfo, playerInfo, this);
            }
            this.removeChildren();
        };
        Friend_MyFriendPop.prototype.onBtnThreePk = function () {
            // toast("三队切磋");
            var playerInfo = ["Lv." + this.info.roleInfo.level + " " + this.info.roleInfo, "groupStr", ":", this.info.roleInfo.picId, this.index1];
            var Formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_THIRD)) {
                zj.TipManager.PVPLadderBattle_Req(this.info.roleInfo.id, null, Formation, null, this.info.roleInfo, playerInfo, this, this.index1);
            }
            this.removeChildren();
        };
        return Friend_MyFriendPop;
    }(zj.UI));
    zj.Friend_MyFriendPop = Friend_MyFriendPop;
    __reflect(Friend_MyFriendPop.prototype, "zj.Friend_MyFriendPop");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_MyFriendPop.js.map