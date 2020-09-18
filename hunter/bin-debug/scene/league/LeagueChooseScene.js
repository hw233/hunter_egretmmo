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
    // 公会界面
    // lizhengqiang
    // 2018/12/11
    var LeagueChooseScene = (function (_super) {
        __extends(LeagueChooseScene, _super);
        function LeagueChooseScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueChooseSceneSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnJoin, _this);
            _this.btnBuild.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuild, _this);
            _this.btnRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRankingList, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_CHOOSE_CLOSE, _this.onBtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.init, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_CHOOSE_CLOSE, _this.onBtnClose, _this);
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.init, _this);
            }, null);
            return _this;
        }
        LeagueChooseScene.prototype.init = function () {
            this.lbGemstone.text = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        };
        // 购买代币
        LeagueChooseScene.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        // 加入公会
        LeagueChooseScene.prototype.onBtnJoin = function () {
            zj.loadUI(zj.LeagueBeforeJoinNew)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 创建公会
        LeagueChooseScene.prototype.onBtnBuild = function () {
            zj.loadUI(zj.LeagueBuildUnion)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 公会排行榜
        LeagueChooseScene.prototype.onBtnRankingList = function () {
            zj.loadUI(zj.LeagueRankingListNew)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        LeagueChooseScene.prototype.onBtnClose = function (data) {
            if (data === void 0) { data = { type: 0 }; }
            if (data.type == 1) {
                this.close();
            }
            else {
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        return LeagueChooseScene;
    }(zj.Scene));
    zj.LeagueChooseScene = LeagueChooseScene;
    __reflect(LeagueChooseScene.prototype, "zj.LeagueChooseScene");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueChooseScene.js.map