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
    //历史战绩
    //YUQINGCHAO
    var LeagueUnionBattleHisRecord = (function (_super) {
        __extends(LeagueUnionBattleHisRecord, _super);
        function LeagueUnionBattleHisRecord() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordSkin.exml";
            _this.btnBattleRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBattleRecord, _this);
            _this.btnContributionRanking.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnContrbutionRanking, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.onBtnBattleRecord();
            return _this;
        }
        LeagueUnionBattleHisRecord.prototype.onBtnBattleRecord = function () {
            var _this = this;
            //战斗记录  默认
            this.btnBattleRecord.currentState = "down";
            this.btnContributionRanking.currentState = "up";
            this.groupRecord.visible = true;
            this.groupRanking.visible = false;
            zj.Game.PlayerLeagueSystem.leagueMatchFortressRecord(true, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_HISTORY, 0)
                .then(function (arr) {
                _this.loadList(arr);
            });
        };
        LeagueUnionBattleHisRecord.prototype.onBtnContrbutionRanking = function () {
            var _this = this;
            //贡献排名
            this.btnBattleRecord.currentState = "up";
            this.btnContributionRanking.currentState = "down";
            this.groupRecord.visible = false;
            this.groupRanking.visible = true;
            zj.Game.PlayerLeagueSystem.leagueMemberStatic()
                .then(function (arr) {
                _this.loadList1(arr);
            });
        };
        /*************************战斗记录**************************/
        LeagueUnionBattleHisRecord.prototype.loadList = function (arr) {
            arr.sort(function (a, b) {
                return a.generate_time - b.generate_time;
            });
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < arr.length; i++) {
                this.arrayCollection.addItem({
                    value: arr[i],
                });
            }
            this.lstView.itemRenderer = zj.LeagueUnionBattleHisRecordItem;
            this.lstView.dataProvider = this.arrayCollection;
        };
        /*************************贡献排名**************************/
        LeagueUnionBattleHisRecord.prototype.loadList1 = function (arr) {
            arr.sort(function (a, b) {
                return b.weekMatchBattleScore - a.weekMatchBattleScore;
            });
            this.arrayCollection1 = new eui.ArrayCollection();
            for (var i = 0; i < arr.length; i++) {
                this.arrayCollection1.addItem({
                    info: arr[i],
                    id: i + 1
                });
            }
            this.lstView1.itemRenderer = zj.LeagueUnionBattleHisRecordItem1;
            this.lstView1.dataProvider = this.arrayCollection1;
        };
        LeagueUnionBattleHisRecord.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueUnionBattleHisRecord;
    }(zj.Dialog));
    zj.LeagueUnionBattleHisRecord = LeagueUnionBattleHisRecord;
    __reflect(LeagueUnionBattleHisRecord.prototype, "zj.LeagueUnionBattleHisRecord");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleHisRecord.js.map