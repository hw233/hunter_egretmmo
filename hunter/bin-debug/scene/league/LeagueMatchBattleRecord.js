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
    var LeagueMatchBattleRecord = (function (_super) {
        __extends(LeagueMatchBattleRecord, _super);
        function LeagueMatchBattleRecord() {
            var _this = _super.call(this) || this;
            _this.stateInfo = {};
            _this.leagueId = 0;
            _this.skinName = "resource/skins/league/LeagueMatchBattleRecordSkin.exml";
            _this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn1, _this);
            _this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn2, _this);
            _this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn3, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.state = 1 /* Attack */;
            _this.onBtn1();
            return _this;
        }
        LeagueMatchBattleRecord.prototype.setInfo = function (leagueId) {
            this.leagueId = leagueId;
        };
        //攻击记录	默认
        LeagueMatchBattleRecord.prototype.onBtn1 = function () {
            var _this = this;
            this.btn1.currentState = "down";
            this.btn2.currentState = "up";
            this.btn3.currentState = "up";
            this.group1.visible = true;
            this.group2.visible = false;
            this.group3.visible = false;
            zj.Game.PlayerLeagueSystem.leagueMatchFortressRecord(true, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_BATTLE, this.leagueId)
                .then(function (arr) {
                var tbl = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var v = arr_1[_i];
                    var splitTbl = v.operate_object.split("&");
                    var curTbl = {
                        index: v.operater,
                        leftInfo: [],
                        rightInfo: [],
                        leftResult: [true, 0],
                        rightResult: [false, 0],
                        time: v.generate_time
                    };
                    for (var i = 0; i < 6; i++) {
                        if (i <= 2) {
                            curTbl.leftInfo.push(splitTbl[i]);
                        }
                        else {
                            curTbl.rightInfo.push(splitTbl[i]);
                        }
                    }
                    if ((v.operate_result) == 0) {
                        curTbl.leftResult = [false, 0];
                        curTbl.rightResult = [true, 0];
                    }
                    if ((v.operate_result) != 0) {
                        curTbl.leftResult = [true, v.operate_result];
                        curTbl.rightResult = [false, 0];
                    }
                    tbl.push(curTbl);
                }
                tbl.sort(function (a, b) {
                    return b.time - a.time;
                });
                _this.loadList(tbl);
            });
        };
        //防守记录
        LeagueMatchBattleRecord.prototype.onBtn2 = function () {
            var _this = this;
            this.btn1.currentState = "up";
            this.btn2.currentState = "down";
            this.btn3.currentState = "up";
            this.group1.visible = false;
            this.group2.visible = true;
            this.group3.visible = false;
            zj.Game.PlayerLeagueSystem.leagueMatchFortressRecord(false, message.LeagueRecordType.LEAGUE_RECORD_TYPE_MATCH_BATTLE, this.leagueId)
                .then(function (arr) {
                var tbl = [];
                for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
                    var v = arr_2[_i];
                    var splitTbl = v.operate_object.split("&");
                    var curTbl = {
                        index: v.operater,
                        leftInfo: [],
                        rightInfo: [],
                        leftResult: [false, 0],
                        rightResult: [true, 0],
                        time: v.generate_time
                    };
                    for (var i = 0; i < 6; i++) {
                        if (i <= 2) {
                            curTbl.rightInfo.push(splitTbl[i]);
                        }
                        else {
                            curTbl.leftInfo.push(splitTbl[i]);
                        }
                    }
                    if ((v.operate_result) == 0) {
                        curTbl.leftResult = [true, 0];
                        curTbl.rightResult = [false, 0];
                    }
                    else {
                        curTbl.leftResult = [false, 0];
                        curTbl.rightResult = [true, v.operate_result];
                    }
                    tbl.push(curTbl);
                }
                tbl.sort(function (a, b) {
                    return b.time - a.time;
                });
                _this.loadList1(tbl);
            });
        };
        //贡献排名
        LeagueMatchBattleRecord.prototype.onBtn3 = function () {
            var _this = this;
            this.btn1.currentState = "up";
            this.btn2.currentState = "up";
            this.btn3.currentState = "down";
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = true;
            zj.Game.PlayerLeagueSystem.leagueMemberStatic()
                .then(function (arr) {
                _this.loadList2(arr);
            });
        };
        /********************攻击记录*********************/
        LeagueMatchBattleRecord.prototype.loadList = function (tbl) {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                this.arrayCollection.addItem({
                    info: tbl[i]
                });
            }
            this.lstRank.dataProvider = this.arrayCollection;
            this.lstRank.itemRenderer = zj.LeagueMatchBattleRecordItem;
        };
        /********************防守记录*********************/
        LeagueMatchBattleRecord.prototype.loadList1 = function (tbl) {
            this.arrayCollection1 = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                this.arrayCollection1.addItem({
                    info: tbl[i]
                });
            }
            this.lstRank1.dataProvider = this.arrayCollection1;
            this.lstRank1.itemRenderer = zj.LeagueMatchBattleRecordItem;
        };
        /********************贡献排名*******************/
        LeagueMatchBattleRecord.prototype.loadList2 = function (arr) {
            arr.sort(function (a, b) {
                return b.dailyMatchBattleScore - a.dailyMatchBattleScore;
            });
            this.arrayCollection2 = new eui.ArrayCollection();
            for (var i = 0; i < arr.length; i++) {
                this.arrayCollection2.addItem({
                    id: i + 1,
                    info: arr[i]
                });
            }
            this.lstRank2.dataProvider = this.arrayCollection2;
            this.lstRank2.itemRenderer = zj.LeagueMatchBattleRecordItemB;
        };
        LeagueMatchBattleRecord.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueMatchBattleRecord;
    }(zj.Dialog));
    zj.LeagueMatchBattleRecord = LeagueMatchBattleRecord;
    __reflect(LeagueMatchBattleRecord.prototype, "zj.LeagueMatchBattleRecord");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchBattleRecord.js.map