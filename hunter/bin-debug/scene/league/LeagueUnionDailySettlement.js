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
    //公会战查看详情
    //yuqingchao
    var LeagueUnionDailySettlement = (function (_super) {
        __extends(LeagueUnionDailySettlement, _super);
        function LeagueUnionDailySettlement() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionDailySettlementSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionDailySettlement"], null);
            _this.btnEnsure.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEnsure, _this);
            _this.init();
            return _this;
        }
        LeagueUnionDailySettlement.prototype.init = function () {
            var dayStr = zj.PlayerLeagueSystem.GetLastSettleData();
            zj.Tips.SetSaveUnionBattlePushRecord(Number(dayStr));
        };
        LeagueUnionDailySettlement.prototype.updatePanel = function (battleResult) {
            var _this = this;
            var isWin = battleResult.result == 1;
            this.lbNameLeft.text = zj.Game.PlayerLeagueSystem.BaseInfo.name; //公会名称（me）
            this.lbNameRight.text = battleResult.opponent_name; //公会名称（敌）
            var scoreL = "";
            var scoreR = "";
            var scoreLeft = battleResult.self_score_changge;
            var scoreRight = battleResult.opponent_score_changge;
            if (battleResult.result == 1) {
                scoreL = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[1], scoreLeft);
                scoreR = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[2], scoreRight);
            }
            else {
                scoreL = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[2], scoreLeft);
                scoreR = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[1], scoreRight);
            }
            //天梯分
            this.lbLeft.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[0], battleResult.self_old_score, scoreL));
            this.lbRight.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.settlement[0], battleResult.opponent_old_score, scoreR));
            //判断是否轮空
            var isEmpty = battleResult.opponent_old_score == 0 && battleResult.opponent_score_changge == 0;
            // 详细积分
            var scoreInfoFilterLeft = [{}, {}, {}, {}, {}];
            if (battleResult.self_star != "") {
                var scoreInfoLeft = battleResult.self_star.split("|");
                for (var i = 0; i < scoreInfoLeft.length; i++) {
                    var v = scoreInfoLeft[i].split("&");
                    if (v != null && v.length >= 2) {
                        scoreInfoFilterLeft[i][Math.floor(Number(v[0]) / 100)] = Number(v[1]);
                    }
                }
            }
            scoreInfoFilterLeft = this.transToScore(scoreInfoFilterLeft);
            var scoreInfoFilterRight = [{}, {}, {}, {}, {}];
            if (battleResult.opponent_star != "") {
                var scoreInfoRight = battleResult.opponent_star.split("|");
                for (var i = 0; i < scoreInfoRight.length; i++) {
                    var v = scoreInfoRight[i].split("&");
                    if (v != null && v.length >= 2) {
                        scoreInfoFilterRight[i][Math.floor(Number(v[0]) / 100)] = Number(v[1]);
                    }
                }
            }
            scoreInfoFilterRight = this.transToScore(scoreInfoFilterRight);
            var scoreTotalLeft = 0;
            var scoreTotalRight = 0;
            var add = function (t) {
                var count = 0;
                for (var i = 0; i < t.length; i++) {
                    count = count + t[i];
                }
                return count;
            };
            //我方剩余分数  总分数   -  对方获得分数
            var set = function (index) {
                var ll = 0;
                if (scoreInfoFilterLeft[index - 1] == zj.CommonConfig.league_match_fortress_team_num[index - 1]) {
                    ll = ll + zj.CommonConfig.league_match_fortress_extra_socre[index];
                }
                else {
                    ll = zj.PlayerLeagueSystem.GetMaxScore(index) - ll;
                }
                scoreTotalLeft = scoreTotalLeft + ll;
                switch (index) {
                    case 1:
                        _this.lbCon1Left.text = ll.toString();
                        break;
                    case 2:
                        _this.lbCon2Left.text = ll.toString();
                        break;
                    case 3:
                        _this.lbCon3Left.text = ll.toString();
                        break;
                    case 4:
                        _this.lbCon4Left.text = ll.toString();
                        break;
                    case 5:
                        _this.lbCon5Left.text = ll.toString();
                        break;
                }
                var rr = 0;
                if (scoreInfoFilterRight[index - 1] == zj.CommonConfig.league_match_fortress_team_num[index - 1]) {
                    rr = rr + zj.CommonConfig.league_match_fortress_extra_socre[index];
                }
                rr = zj.PlayerLeagueSystem.GetMaxScore(index) - rr;
                //判断轮空
                if (isEmpty) {
                    rr = 0;
                }
                scoreTotalRight = scoreTotalRight + rr;
                switch (index) {
                    case 1:
                        _this.lbCon1Right.text = rr.toString();
                        break;
                    case 2:
                        _this.lbCon2Right.text = rr.toString();
                        break;
                    case 3:
                        _this.lbCon3Right.text = rr.toString();
                        break;
                    case 4:
                        _this.lbCon4Right.text = rr.toString();
                        break;
                    case 5:
                        _this.lbCon5Right.text = rr.toString();
                        break;
                }
            };
            for (var i = 1; i <= scoreInfoFilterLeft.length; i++) {
                set(i);
            }
            if (isEmpty) {
                scoreTotalRight = 0;
            }
            this.lbScoreTotalLeft.text = scoreTotalLeft.toString();
            this.lbScoreTotalRight.text = scoreTotalRight.toString();
            //战斗结果图片
            if (isEmpty) {
                this.imgWinLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Union.battle_evaluation[3], this); //轮空显示小胜
            }
            var scoreDiff = scoreTotalLeft - scoreTotalRight;
            var iswin = false;
            if (battleResult.result == 1) {
                iswin = true;
            }
            var resultIndex = zj.CommonConfig.league_match_score_change1(iswin, battleResult.self_old_score, Math.abs(scoreDiff));
            var evaTex = zj.UIConfig.UIConfig_Union.battle_evaluation[Number(resultIndex[1])];
            this.imgWinLogo.source = zj.cachekey(evaTex, this);
            this.imgSegLogoLeft.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(battleResult.self_old_score)[2], this);
            this.imgSegLeft.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(battleResult.self_old_score)[3], this);
            this.imgSegLogoRight.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(battleResult.opponent_old_score)[2], this);
            this.imgSegRight.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(battleResult.opponent_old_score)[3], this);
            this.imgSegLeft.visible = false;
            this.imgSegRight.visible = false;
        };
        LeagueUnionDailySettlement.prototype.onBtnEnsure = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        LeagueUnionDailySettlement.prototype.transToScore = function (score_data) {
            var tb = [[], [], [], [], []];
            for (var i = 0; i < score_data.length; i++) {
                var t = score_data[i];
                for (var j = 0; j < t.length; j++) {
                    tb[i][j].text = zj.CommonConfig.league_match_fortress_extra_socre[i][j];
                }
            }
            return tb;
        };
        return LeagueUnionDailySettlement;
    }(zj.Dialog));
    zj.LeagueUnionDailySettlement = LeagueUnionDailySettlement;
    __reflect(LeagueUnionDailySettlement.prototype, "zj.LeagueUnionDailySettlement");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionDailySettlement.js.map