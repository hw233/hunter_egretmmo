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
    // 公会招募
    // lizhengqiang
    // 20190220
    var LeagueRecruit = (function (_super) {
        __extends(LeagueRecruit, _super);
        function LeagueRecruit() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueRecruitSkin.exml";
            _this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCancel, _this);
            _this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.init();
            return _this;
        }
        LeagueRecruit.prototype.init = function () {
            this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
            this.textContent.textDisplay.textColor = 0xB19782;
            this.textContent.promptDisplay.textColor = 0xB19782;
            this.textContent.promptDisplay.size = 16;
            this.textContent.inputType = egret.TextFieldType.INPUT;
            this.textContent.prompt = zj.TextsConfig.TextConfig_Input.commonLong;
            this.textContent.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.recruit.defaultStr, zj.Game.PlayerLeagueSystem.BaseInfo.name);
            if (zj.Game.PlayerLeagueSystem.BaseInfo.recruitInfo != "") {
                this.textContent.text = zj.Game.PlayerLeagueSystem.BaseInfo.recruitInfo;
            }
            this.lbCost.text = "x" + zj.CommonConfig.league_recruit_contribute;
            this.updateInfo();
            this.timer = new egret.Timer(990, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateInfo, this);
            this.timer.start();
            if (zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all - zj.CommonConfig.league_recruit_contribute < 0) {
                this.lbCost.textColor = zj.Helper.RGBToHex("r:255,g:38,b:0");
            }
        };
        LeagueRecruit.prototype.updateInfo = function () {
            var recruitTime = 300;
            var lastTime = Math.ceil(zj.Game.PlayerLeagueSystem.recruitTime + recruitTime - zj.Game.Controller.curServerTime);
            var canPublish = (zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all - zj.CommonConfig.league_recruit_contribute >= 0) && (lastTime <= 0);
            this.btnOK.touchEnabled = canPublish;
            this.btnOK.currentState = (canPublish == true ? "up" : "disabled");
            this.lbChangeTime.visible = (lastTime > 0);
            this.lbChangeTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.recruit.noTime, lastTime);
        };
        LeagueRecruit.prototype.onBtnOK = function () {
            if (this.textContent.text.length == 0) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.recruit.none));
                return;
            }
            zj.Game.PlayerLeagueSystem.leagueRecruitInfo(this.textContent.text).then(function () {
                zj.Game.PlayerLeagueSystem.recruitTime = zj.Game.Controller.curServerTime;
                zj.toast(zj.LANG(zj.TextsConfig.TextConfig_League.recruit.success));
            }).catch(function (reason) { });
            // 聊天
            zj.Game.EventManager.event(zj.GameEvent.GUILD_LOUNCH);
            this.close();
        };
        LeagueRecruit.prototype.onBtnCancel = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueRecruit;
    }(zj.Dialog));
    zj.LeagueRecruit = LeagueRecruit;
    __reflect(LeagueRecruit.prototype, "zj.LeagueRecruit");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueRecruit.js.map