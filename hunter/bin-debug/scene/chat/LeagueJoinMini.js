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
    var LeagueJoinMini = (function (_super) {
        __extends(LeagueJoinMini, _super);
        function LeagueJoinMini() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/LeagueJoinMiniSkin.exml";
            _this.init();
            _this.monitorEvent();
            return _this;
        }
        LeagueJoinMini.prototype.init = function () {
            this.JoinGuild.visible = true;
        };
        LeagueJoinMini.prototype.monitorEvent = function () {
            this.ButtonApplication.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonApplication, this); // 申请加入
            this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClose, this); // 关闭
        };
        LeagueJoinMini.prototype.SetInfo = function (leagueBase, sameServer) {
            this._leagueBase = leagueBase;
            this._sameServer = sameServer;
            this.SetOtherInfo();
            this.SetButtonState();
        };
        LeagueJoinMini.prototype.SetOtherInfo = function () {
            if (this._leagueBase.leagueId == 0) {
                return;
            }
            var leagueName = this._leagueBase.name;
            var leagueLv = this._leagueBase.level;
            this.TextUnionName.text = leagueName;
            var tblHead = zj.TableItemPic.Table();
            var notice = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.introduceDes, this._leagueBase.introduce);
            this.TextNotice.text = notice;
            this.SpriteHead.source = tblHead[this._leagueBase.picId].path;
            this.TextUnionLevel.text = leagueLv;
            this.TextUnionLeader.text = this._leagueBase.leaderName;
            this.TextUnionNum.text = zj.Helper.StringFormat("%s/%s", this._leagueBase.curNum, zj.TableLevel.Item(this._leagueBase.level).league_people);
            var limit2 = null;
            if (this._leagueBase.join_level <= 1) {
                limit2 = zj.TextsConfig.TextConfig_League.limitLevelNone;
            }
            else {
                limit2 = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.limitLevel, this._leagueBase.join_level);
            }
            this.TextUnionLimit.text = limit2;
            // 帮会积分星级
            if (this._leagueBase.leagueName != "" && this._leagueBase.match_score != null) {
                var leagueStarPath = zj.PlayerLeagueSystem.GetSegment(this._leagueBase.match_score)[2];
                this.SpriteUnionRank.source = leagueStarPath;
            }
            else {
                this.SpriteUnionRank.visible = false;
            }
        };
        LeagueJoinMini.prototype.SetButtonState = function () {
            var bInLeague = zj.Game.PlayerInfoSystem.BaseInfo.leagueId == 0 && this._sameServer;
            this.ButtonApplication.enabled = bInLeague;
        };
        LeagueJoinMini.prototype.SetCB = function (cb) {
            this.callBack = cb;
        };
        /**
         * 申请加入
         */
        LeagueJoinMini.prototype.onButtonApplication = function () {
            var _this = this;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE, true)) {
                var visit_func_1 = function (host, msg, result) {
                    if (result == 0) {
                        zj.toast_success(zj.TextsConfig.TextConfig_League.applySend);
                        _this.SetButtonState();
                    }
                };
                if (this._leagueBase.leagueId == 0) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Error.no_league_to_join);
                }
                else if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId == 0) {
                    zj.Game.PlayerChatDataSystem.applyJoin(this._leagueBase)
                        .then(function (msg) {
                        visit_func_1;
                    });
                }
                else {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Error.league_already);
                }
            }
            this.onButtonClose();
        };
        /**
         * 获取角色数据
         */
        LeagueJoinMini.prototype.ReqRoleInfo = function () {
            var _this = this;
            zj.Game.PlayerChatDataSystem.RoleDate(this._leagueBase)
                .then(function (msg) {
                _this.ManagePop(msg);
            });
        };
        LeagueJoinMini.prototype.ManagePop = function (msg) {
            if (msg.baseInfo.id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                return;
            }
            var pop = new zj.Chat_UserPopB();
            pop.name = "Chat_UserPopB";
            pop.setMsgInfo(msg);
            this.addChild(pop);
        };
        LeagueJoinMini.prototype.onButtonClose = function () {
            if (this.callBack) {
                this.callBack();
            }
            this.close();
        };
        return LeagueJoinMini;
    }(zj.Dialog));
    zj.LeagueJoinMini = LeagueJoinMini;
    __reflect(LeagueJoinMini.prototype, "zj.LeagueJoinMini");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueJoinMini.js.map