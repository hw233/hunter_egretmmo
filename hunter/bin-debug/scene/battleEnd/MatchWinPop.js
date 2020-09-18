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
    /**
     * @author xing li wei
     *
     * @date 2019-5-10
     *
     * @class 公会战斗结算界面弹出的战斗结果详情界面
     */
    var MatchWinPop = (function (_super) {
        __extends(MatchWinPop, _super);
        function MatchWinPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/MatchWinPopSkin.exml";
            _this.init();
            return _this;
        }
        MatchWinPop.prototype.init = function () {
            var _this = this;
            this.btnClose.visible = false;
            egret.Tween.get(this).wait(1000).call(function () {
                _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                _this.btnClose.visible = true;
            });
            // egret.Tween.get(this.TextClose, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
            var split = function (str, delimiter) {
                if (str == null || str == "" || delimiter == null) {
                    return null;
                }
                var result = [];
                // for (var k in Gmgr.Instance.matchEnemyName ) {
                // 	if ([str+delimiter]..hasOwnProperty(k)) {
                // 		var element = [str+delimiter].[k];
                // 	}
                // }
            };
            for (var i = 1; i <= 5; i++) {
                this["group" + i].alpha = 0;
                egret.Tween.get(this["group" + i]).to({ alpha: 1 }, 300 * i);
            }
            this.bg1.mask = this.bg1bg;
            this.bg2.mask = this.bg2bg;
            var name = zj.Gmgr.Instance.matchEnemyName.split("&")[0];
            var index = zj.Gmgr.Instance.matchHard || 101;
            var enemyName = name || zj.TextsConfig.TextsConfig_Match.no;
            var preScore = zj.Gmgr.Instance.matchMyScore || 0;
            var preStar = zj.Gmgr.Instance.preStar || 0;
            var bAdd = zj.Game.PlayerBattleSystem.multiResultInfo.battleStar > preStar;
            this.LabelOpen.visible = bAdd;
            var addScore = 0;
            if (bAdd) {
                if (preStar == 0) {
                    addScore = zj.CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][zj.Game.PlayerBattleSystem.multiResultInfo.battleStar - 1];
                }
                else {
                    addScore = zj.CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][zj.Game.PlayerBattleSystem.multiResultInfo.battleStar - 1] - zj.CommonConfig.league_match_fortress_star_socre[Math.floor(index / 100) - 1][preStar - 1];
                }
            }
            var maxScore = zj.PlayerLeagueSystem.GetMaxScore();
            var per2 = (maxScore - preScore - addScore) / maxScore >= 1 && 1 || (maxScore - preScore - addScore) / maxScore;
            var per1 = (maxScore - preScore) / maxScore >= 1 && 1 || (maxScore - preScore) / maxScore;
            var pos = Math.floor(index / 100);
            this.Label1.text = enemyName;
            this.Label2.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Match.flyName[pos - 1]);
            this.Label3.text = addScore.toString();
            this.Label4.text = (maxScore - preScore - addScore) + "/" + maxScore;
            for (var i = 1; i <= 3; i++) {
                if (i <= zj.Game.PlayerBattleSystem.multiResultInfo.battleStar) {
                    this["SpriteStar" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else {
                    this["SpriteStar" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[1], this);
                }
            }
            this.bg1bg.width = 320 * per1;
            this.bg2bg.width = 320 * per2;
        };
        MatchWinPop.prototype.onBtnClose = function () {
            // egret.Tween.removeTweens(this.TextClose);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.close();
        };
        return MatchWinPop;
    }(zj.Dialog));
    zj.MatchWinPop = MatchWinPop;
    __reflect(MatchWinPop.prototype, "zj.MatchWinPop");
})(zj || (zj = {}));
//# sourceMappingURL=MatchWinPop.js.map