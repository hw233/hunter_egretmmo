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
    //公会状态
    //yuqingchao
    //2019.02.27
    var LeagueUnionStatus = (function (_super) {
        __extends(LeagueUnionStatus, _super);
        function LeagueUnionStatus() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionStatusSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnMemberInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMemberInfo, _this);
            _this.btnDefensiveStatus.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDefensiveStatus, _this);
            _this.onBtnMemberInfo();
            return _this;
        }
        //玩家信息	默认
        LeagueUnionStatus.prototype.onBtnMemberInfo = function () {
            var _this = this;
            this.btnMemberInfo.currentState = "down";
            this.btnDefensiveStatus.currentState = "up";
            this.group0.visible = true;
            this.group1.visible = false;
            zj.Game.PlayerLeagueSystem.leagueMemberStatic()
                .then(function (arr) {
                _this.loadList(arr);
            });
        };
        //防守状态
        LeagueUnionStatus.prototype.onBtnDefensiveStatus = function () {
            var _this = this;
            this.btnDefensiveStatus.currentState = "down";
            this.btnMemberInfo.currentState = "up";
            this.group0.visible = false;
            this.group1.visible = true;
            zj.Game.PlayerLeagueSystem.leagueMatchOpponentFortress(zj.Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo.leagueId, 0, true)
                .then(function (resp) {
                var enemyInfoTB = {};
                var enemyinfo = resp.matchInfo.fortressStar;
                for (var _i = 0, enemyinfo_1 = enemyinfo; _i < enemyinfo_1.length; _i++) {
                    var v = enemyinfo_1[_i];
                    enemyInfoTB[v.key] = v.value;
                }
                var selfInfoTB = [[], [], [], [], []];
                var selfInfo = resp.selfInfo.leagueFortress;
                for (var _a = 0, selfInfo_1 = selfInfo; _a < selfInfo_1.length; _a++) {
                    var v = selfInfo_1[_a];
                    var temp = v;
                    temp["isBreak"] = (enemyInfoTB[v.index] != null);
                    selfInfoTB[v.type - 1].push(temp);
                }
                for (var i = selfInfoTB.length - 1; i > 0; i--) {
                    if (selfInfoTB[i] == null) {
                        selfInfoTB[i].splice(i, 1);
                    }
                }
                _this.loadList1(selfInfoTB);
            });
        };
        LeagueUnionStatus.prototype.loadList = function (arr) {
            arr.sort(function (a, b) {
                return b.dailyMatchBattleScore - a.dailyMatchBattleScore;
            });
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < arr.length; i++) {
                this.arrayCollection.addItem({
                    info: arr[i],
                    id: i + 1
                });
            }
            this.lstView0.dataProvider = this.arrayCollection;
            this.lstView0.itemRenderer = zj.LeagueUnionStatusItem;
        };
        LeagueUnionStatus.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        LeagueUnionStatus.prototype.loadList1 = function (selfInfoTB) {
            this.arrayCollection1 = new eui.ArrayCollection();
            for (var i = 0; i < selfInfoTB.length; i++) {
                var height = selfInfoTB[i].length * 65;
                this.arrayCollection1.addItem({
                    i: i,
                    info: selfInfoTB[i],
                    height: height
                });
            }
            this.lstView1.dataProvider = this.arrayCollection1;
            this.lstView1.itemRenderer = zj.LeagueUnionStatusItemB;
        };
        return LeagueUnionStatus;
    }(zj.Dialog));
    zj.LeagueUnionStatus = LeagueUnionStatus;
    __reflect(LeagueUnionStatus.prototype, "zj.LeagueUnionStatus");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionStatus.js.map