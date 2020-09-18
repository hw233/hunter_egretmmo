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
    //工会管理List点击后的小界面(id = 普通会员)
    //yuqingchao
    //2018.12.24
    var LeagueMemberPopNormal = (function (_super) {
        __extends(LeagueMemberPopNormal, _super);
        function LeagueMemberPopNormal() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.skinName = "resource/skins/league/LeagueMemberPopNormalSkin.exml";
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnCheck, _this);
            _this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnFriend, _this);
            _this.btnMail.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnMail, _this);
            _this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnPrivate, _this);
            _this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnOnePk, _this);
            _this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnThreePk, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueMemberPopNormal.prototype.init = function (x, y, num, father) {
            this.groupMain.scaleX = 0.1;
            this.groupMain.scaleY = 0.1;
            egret.Tween.get(this.groupMain).to({ scaleX: 1.2 }, 250).to({ scaleX: 1.1 }, 80).to({ scaleX: 1.2 }, 80);
            egret.Tween.get(this.groupMain).to({ scaleY: 1.2 }, 250).to({ scaleY: 1.1 }, 80).to({ scaleY: 1.2 }, 80);
            this.x = x;
            this.y = y - 175;
            this.index = num;
            this.memberInfo = zj.Game.PlayerLeagueSystem.Members[num];
            this.father = father;
            this.setInfo();
        };
        LeagueMemberPopNormal.prototype.setInfo = function () {
            this.btnOnePk.visible = true;
            this.btnThreePk.visible = true;
            if (this.memberInfo.monarchbase.level < 8) {
                this.btnOnePk.visible = false;
            }
            if (this.memberInfo.monarchbase.level < 40) {
                this.btnThreePk.visible = false;
            }
        };
        LeagueMemberPopNormal.prototype.onBtnCheck = function () {
            var _this = this;
            // toast("查看详情");
            zj.Game.PlayerInfoSystem.queryRoleInfo(this.memberInfo.monarchbase.id, this.memberInfo.monarchbase.group_id).then(function (resp) {
                var name = "";
                if (resp.baseInfo.group_name != "") {
                    name = resp.baseInfo.group_name;
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
                        _this.father.removeChild(_this);
                    });
                }
            });
        };
        LeagueMemberPopNormal.prototype.onBtnFriend = function () {
            var _this = this;
            // toast("加为好友");
            var roleId = this.memberInfo.monarchbase.id;
            if (roleId != zj.Game.PlayerLeagueSystem.Member.monarchbase.id) {
                zj.Game.PlayerLeagueSystem.relationAdd(message.ERelationType.RELATION_TYPE_FRIEND, roleId).then(function () {
                    _this.father.removeChild(_this);
                    zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Friend.applySend));
                });
            }
            else {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.chat_self));
            }
        };
        LeagueMemberPopNormal.prototype.onBtnMail = function () {
            var _this = this;
            // toast("发送信件");
            var info = new message.MailInfo();
            info.type = message.MailType.MAIL_TYPE_NORMAL;
            info.from_id = this.memberInfo.monarchbase.id;
            info.roleBaseInfo = [this.memberInfo.monarchbase];
            zj.loadUI(zj.Common_Letter)
                .then(function (dailog) {
                dailog.show();
                dailog.setInfo(info);
                _this.father.removeChild(_this);
            });
        };
        LeagueMemberPopNormal.prototype.onBtnPrivate = function () {
            var _this = this;
            // toast("设为私聊");
            var role = this.memberInfo.monarchbase;
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: null });
                dialog.show();
                _this.father.removeChild(_this);
            });
        };
        LeagueMemberPopNormal.prototype.onBtnOnePk = function () {
            // toast("单队切磋");
            var a = this.memberInfo;
            var formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
            var playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE, true)) {
                zj.TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
            }
        };
        LeagueMemberPopNormal.prototype.onBtnThreePk = function () {
            // toast("三队切磋");
            var a = this.memberInfo;
            var formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            var playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_THIRD)) {
                zj.TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
            }
        };
        return LeagueMemberPopNormal;
    }(zj.UI));
    zj.LeagueMemberPopNormal = LeagueMemberPopNormal;
    __reflect(LeagueMemberPopNormal.prototype, "zj.LeagueMemberPopNormal");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMemberPopNormal.js.map