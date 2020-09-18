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
    // 公会-创建公会
    // lizhengqiang
    // 20181213
    var LeagueBuildUnion = (function (_super) {
        __extends(LeagueBuildUnion, _super);
        function LeagueBuildUnion() {
            var _this = _super.call(this) || this;
            _this.addStone = function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                });
            };
            _this.skinName = "resource/skins/league/LeagueBuildUnionSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            _this.init();
            return _this;
        }
        LeagueBuildUnion.prototype.init = function () {
            this.lbProp.text = zj.CommonConfig.league_create_coins.toString();
            this.txtName.skinName = "resource/skins/common/TextInputSkin.exml";
            this.txtName.textDisplay.textColor = 0x411A03;
            this.txtName.promptDisplay.textColor = 0x411A03;
            this.txtName.promptDisplay.size = 16;
            this.txtName.inputType = egret.TextFieldType.INPUT;
            this.txtName.prompt = zj.TextsConfig.TextConfig_Input.createLeagueName;
        };
        LeagueBuildUnion.prototype.onBtnConfirm = function () {
            var _this = this;
            var leagueName = this.txtName.text;
            if (leagueName == "") {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.createNameNone));
                return;
            }
            zj.Game.PlayerLeagueSystem.leagueCreate(leagueName).then(function () {
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    _this.onBtnClose();
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_CHOOSE_CLOSE);
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function (result) {
                if (result == message.EC.XG_LACK_TOKEN) {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextsConfig_Money.demstone);
                        dialog.setCB(_this.addStone);
                    });
                }
                else if (result == message.EC.XG_LEAGUE_QUIT_TIME_TOO_SHORT) {
                    if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime > 0) {
                        var strTime = zj.Helper.FormatMsTime(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime);
                        var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.build_league_next, strTime);
                        zj.toast_warning(zj.LANG(str));
                    }
                }
                else {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                }
            });
        };
        LeagueBuildUnion.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueBuildUnion;
    }(zj.Dialog));
    zj.LeagueBuildUnion = LeagueBuildUnion;
    __reflect(LeagueBuildUnion.prototype, "zj.LeagueBuildUnion");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBuildUnion.js.map