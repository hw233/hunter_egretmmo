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
    // lizhengqiang
    // 20181213
    var LeagueBeforeJoinItemNewIR = (function (_super) {
        __extends(LeagueBeforeJoinItemNewIR, _super);
        function LeagueBeforeJoinItemNewIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBeforeJoinNewItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueBeforeJoinItemNewIR"], null);
            _this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnJoin, _this);
            _this.lbLeaderName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLbLeaderName, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueBeforeJoinItemNewIR.prototype.dataChanged = function () {
            this.father = this.data.father;
            var leagueBase = this.data.leagueBase;
            if (leagueBase.leagueId == 0)
                return;
            // 公会名称
            this.lbLeagueName.text = leagueBase.name;
            // 等级
            this.lbLeagueLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.levelDes, leagueBase.level);
            // 人数
            this.lbMemberNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberDesRank, leagueBase.curNum, zj.TableLevel.Item(leagueBase.level).league_people);
            this.lbMemberNum.textColor = zj.ConstantConfig_Common.Color.black;
            if (leagueBase.curNum >= zj.TableLevel.Item(leagueBase.level).league_people) {
                this.lbMemberNum.textColor = zj.ConstantConfig_Common.Color.red;
            }
            // 段位
            var starPath = zj.PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4];
            if (starPath != "") {
                this.imgStar.source = zj.cachekey(starPath, this);
            }
            else {
                this.imgStar.visible = false;
            }
            // 会长
            this.lbLeaderName.text = leagueBase.leaderName;
            // 限制
            if (leagueBase.join_condition == 1 && leagueBase.join_level == 0) {
                this.lbLimit.text = zj.TextsConfig.TextConfig_League.limitNone;
            }
            else if (leagueBase.join_condition == 2 || leagueBase.join_condition == 3) {
                this.lbLimit.text = zj.TextsConfig.TextConfig_League.limitCondition[leagueBase.join_condition - 1];
                if (leagueBase.join_condition == 3) {
                    this.lbLimit.textColor = zj.ConstantConfig_Common.Color.red;
                }
            }
            else {
                this.lbLimit.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.limitDes, leagueBase.join_level);
                if (leagueBase.join_level > zj.Game.PlayerInfoSystem.Level) {
                    this.lbLimit.textColor = zj.ConstantConfig_Common.Color.red;
                }
            }
        };
        LeagueBeforeJoinItemNewIR.prototype.onBtnJoin = function () {
            var _this = this;
            zj.Game.PlayerProgressesSystem.checkProcess([message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE]).then(function () {
                zj.Game.PlayerLeagueSystem.leagueApply(_this.data.leagueBase.leagueId).then(function (resp) {
                    if (resp["status"] == 0) {
                        zj.loadUI(zj.LeagueHomeScene)
                            .then(function (scene) {
                            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_BEFORE_JOIN_CLOSE);
                            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_CHOOSE_CLOSE);
                            scene.init();
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                    else if (resp["status"] == 1) {
                        _this.btnJoin.touchEnabled = false;
                        _this.btnJoin.currentState = "disabled";
                        zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.applySend));
                    }
                }).catch(function (result) {
                    if (result == message.EC.XG_LEAGUE_QUIT_TIME_TOO_SHORT) {
                        if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime > 0) {
                            var strTime = zj.Helper.FormatMsTime(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime);
                            var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.join_league_next, strTime);
                            zj.toast_warning(str);
                        }
                    }
                    else {
                        zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                    }
                });
            });
        };
        LeagueBeforeJoinItemNewIR.prototype.onLbLeaderName = function () {
            var _this = this;
            // toast("会长信息");
            zj.Game.PlayerInfoSystem.queryRoleInfo(this.data.leagueBase.leaderId, zj.Game.Controller.lastLoginGroupID()).then(function (msg) {
                if (msg.baseInfo.id == zj.Game.PlayerInfoSystem.BaseInfo.id)
                    return;
                // "Chat_UserPopB"
                var point = _this.lbLeaderName.localToGlobal();
                point.x -= zj.Game.UIManager.x;
                _this.father.managePop(msg, point);
            });
        };
        return LeagueBeforeJoinItemNewIR;
    }(eui.ItemRenderer));
    zj.LeagueBeforeJoinItemNewIR = LeagueBeforeJoinItemNewIR;
    __reflect(LeagueBeforeJoinItemNewIR.prototype, "zj.LeagueBeforeJoinItemNewIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBeforeJoinNewItemIR.js.map