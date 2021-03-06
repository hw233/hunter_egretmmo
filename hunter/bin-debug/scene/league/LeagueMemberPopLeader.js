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
    //工会管理List点击后的小界面(id = 盟主)
    //yuqingchao
    //2018.12.24
    var LeagueMemberPopLeader = (function (_super) {
        __extends(LeagueMemberPopLeader, _super);
        function LeagueMemberPopLeader() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.kick = function () {
                zj.Game.PlayerLeagueSystem.leagueKickOut(_this.memberInfo.monarchbase.id).then(function () {
                    _this.father.scrollerInfo.viewport = _this.father.lstItem;
                    _this.father.scrollerInfo.validateNow();
                    _this.father.moveLocation = _this.father.scrollerInfo.viewport.scrollV;
                    _this.father.removeChild(_this);
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                });
            };
            _this.skinName = "resource/skins/league/LeagueMemberPopLeaderSkin.exml";
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnCheck, _this);
            _this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnFriend, _this);
            _this.btnMail.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnMail, _this);
            _this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnPrivate, _this);
            _this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnThreePk, _this);
            _this.btnElevate.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnElevate, _this);
            _this.btnElevate1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnElevate1, _this);
            _this.btnAbdicate.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAbdicate, _this);
            _this.btnKick.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnKick, _this);
            _this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnOnePk, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        LeagueMemberPopLeader.prototype.init = function (x, y, num, father) {
            this.father = father;
            this.groupMain.scaleX = 0.1;
            this.groupMain.scaleY = 0.1;
            egret.Tween.get(this.groupMain).to({ scaleX: 1.1 }, 250).to({ scaleX: 1 }, 80).to({ scaleX: 1.1 }, 80);
            egret.Tween.get(this.groupMain).to({ scaleY: 1.1 }, 250).to({ scaleY: 1 }, 80).to({ scaleY: 1.1 }, 80);
            this.x = x;
            this.y = y - 175;
            this.index = num;
            this.memberInfo = zj.Game.PlayerLeagueSystem.Members[num];
            this.setInfo();
            if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
                this.btnElevate1.visible = true;
                this.btnElevate.visible = false;
            }
            if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                this.btnElevate1.visible = false;
                this.btnElevate.visible = true;
            }
        };
        LeagueMemberPopLeader.prototype.setInfo = function () {
            this.btnOnePk.visible = true;
            this.btnThreePk.visible = true;
            if (this.memberInfo.monarchbase.level < 8) {
                this.btnOnePk.visible = false;
            }
            if (this.memberInfo.monarchbase.level < 40) {
                this.btnThreePk.visible = false;
            }
        };
        LeagueMemberPopLeader.prototype.onBtnCheck = function () {
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
        LeagueMemberPopLeader.prototype.onBtnFriend = function () {
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
        LeagueMemberPopLeader.prototype.onBtnMail = function () {
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
        LeagueMemberPopLeader.prototype.onBtnPrivate = function () {
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
        LeagueMemberPopLeader.prototype.onBtnOnePk = function () {
            // toast("单队切磋");
            var formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
            var playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE, true)) {
                zj.TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
            }
        };
        LeagueMemberPopLeader.prototype.onBtnThreePk = function () {
            // toast("三队切磋");
            var formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            var playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_THIRD)) {
                zj.TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
            }
        };
        LeagueMemberPopLeader.prototype.onBtnElevate = function () {
            var _this = this;
            // toast("升为副会长");
            if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
                zj.toast(zj.LANG(zj.TextsConfig.TextConfig_League.elder_already));
            }
            else {
                zj.Game.PlayerLeagueSystem.leagueOfficial(this.memberInfo.monarchbase.id, message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER).then(function () {
                    _this.father.removeChild(_this);
                    _this.father.scrollerInfo.viewport = _this.father.lstItem;
                    _this.father.scrollerInfo.validateNow();
                    _this.father.moveLocation = _this.father.scrollerInfo.viewport.scrollV;
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                });
            }
        };
        LeagueMemberPopLeader.prototype.onBtnElevate1 = function () {
            var _this = this;
            // toast("罢免副会长");
            if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                zj.toast(zj.LANG(zj.TextsConfig.TextConfig_League.elder_notyet));
            }
            else {
                zj.Game.PlayerLeagueSystem.leagueOfficial(this.memberInfo.monarchbase.id, message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL).then(function () {
                    _this.father.removeChild(_this);
                    _this.father.scrollerInfo.viewport = _this.father.lstItem;
                    _this.father.scrollerInfo.validateNow();
                    _this.father.moveLocation = _this.father.scrollerInfo.viewport.scrollV;
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                });
            }
        };
        LeagueMemberPopLeader.prototype.onBtnAbdicate = function () {
            var _this = this;
            // toast("禅让会长");
            zj.Game.PlayerLeagueSystem.leagueTransfer(this.memberInfo.monarchbase.id).then(function () {
                _this.father.removeChild(_this);
                _this.father.scrollerInfo.viewport = _this.father.lstItem;
                _this.father.scrollerInfo.validateNow();
                _this.father.moveLocation = _this.father.scrollerInfo.viewport.scrollV;
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
            });
        };
        LeagueMemberPopLeader.prototype.onBtnKick = function () {
            var _this = this;
            // toast("踢出公会");
            zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.kick, _this.memberInfo.monarchbase.name));
                dialog.setCB(_this.kick);
            });
        };
        return LeagueMemberPopLeader;
    }(zj.UI));
    zj.LeagueMemberPopLeader = LeagueMemberPopLeader;
    __reflect(LeagueMemberPopLeader.prototype, "zj.LeagueMemberPopLeader");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMemberPopLeader.js.map