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
    //双色果主界面
    //yuqingchao
    //2019.05.28
    var DoubleColorSence = (function (_super) {
        __extends(DoubleColorSence, _super);
        function DoubleColorSence() {
            var _this = _super.call(this) || this;
            _this.state = null;
            _this.enableBet = false;
            _this.timer = new egret.Timer(990, 0);
            _this.myItemArr = [];
            _this.publicItemArr = [];
            _this.skinName = "resource/skins/fishing/DoubleColorSenceSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            _this.btnAwardView.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAwardView, _this);
            _this.btnViewEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBnViewEnd, _this);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.upDate, _this);
            _this.timer.start();
            for (var i = 1; i < 6; i++) {
                _this["groupFruit1_" + i].removeChildren();
            }
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.init();
            return _this;
        }
        DoubleColorSence.prototype.init = function () {
            this.state = null;
            this.enableBet = false;
            this.preState = this.stage;
            this.setInfo();
            this.setInfoMyFruitList();
            this.setInfoPublicFruitList();
            this.upDate();
            //Teach
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_DoubleFruit) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_DoubleFruit);
            }
        };
        DoubleColorSence.prototype.setInfo = function () {
            var inTime = zj.Helper.FormatDaysTimeChs(zj.CommonConfig.double_fruit_bet_time[2]);
            var waitTime = zj.Helper.FormatDaysTimeChs(zj.CommonConfig.double_fruit_bet_time[0]);
            var runTime = zj.Helper.FormatDaysTimeChs(zj.CommonConfig.double_fruit_bet_time[1]);
            var str1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.start_time, inTime, waitTime);
            var str2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.run_time, runTime);
            this.lbTime.text = str1;
            this.lbOpenAwardTime.text = str2;
        };
        DoubleColorSence.prototype.upDate = function () {
            this.setInfoState();
            this.setInfoTime();
        };
        DoubleColorSence.prototype.setInfoState = function () {
            var cur = this.time(Date.parse(zj.Game.Controller.serverNow().toString()) / 1000);
            var sec = cur.h * 3600 + cur.m * 60 + cur.s;
            if (zj.CommonConfig.double_fruit_bet_time[2] <= sec && sec < zj.CommonConfig.double_fruit_bet_time[0]) {
                this.state = 0; //可投注
            }
            else if ((zj.CommonConfig.double_fruit_bet_time[0] - 86400) <= sec && sec < zj.CommonConfig.double_fruit_bet_time[1]) {
                this.state = 1; //不可投注，等待开奖（24点至早上7点）
            }
            else {
                this.state = 2; //不可投注，等待活动下期开始
            }
            if (this.state != this.preState) {
                this.preState = this.state;
                this.setInfoUI();
            }
        };
        DoubleColorSence.prototype.setInfoTime = function () {
            var cur = this.time(Date.parse(zj.Game.Controller.serverNow().toString()) / 1000);
            var sec = cur.h * 3600 + cur.m * 60 + cur.s;
            var time = null;
            var lastTime = null;
            if (this.state == 0) {
                lastTime = zj.Helper.FormatMsTime3(zj.CommonConfig.double_fruit_bet_time[1] + 86400 - sec);
                time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.next_run, lastTime);
            }
            else if (this.state == 1) {
                if (zj.CommonConfig.double_fruit_bet_time[1] > sec) {
                    lastTime = zj.Helper.FormatMsTime3(zj.CommonConfig.double_fruit_bet_time[1] - sec);
                }
                else {
                    lastTime = zj.Helper.FormatMsTime3(zj.CommonConfig.double_fruit_bet_time[1] + 24 * 3600 - sec);
                }
                time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.next_run, lastTime);
            }
            else if (this.state == 2) {
                var lastTime_1 = ((24 + 4) * 3600 - sec) % (24 * 3600);
                time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.next_turn, zj.Helper.FormatMsTime3(lastTime_1));
            }
            this.lbOpenAwardDay.text = time;
        };
        DoubleColorSence.prototype.setInfoButton = function () {
            var b_enbaled = false;
            if (this.state == 2 || this.state == 1) {
                b_enbaled = false;
            }
            else {
                b_enbaled = zj.Game.PlayerDoubleBallSystem.my_id[1] == 0;
            }
            this.btnOK.enabled = b_enbaled;
        };
        DoubleColorSence.prototype.setInfoUI = function () {
            this.setInfoButton();
            if (this.state == 0) {
                this.setInfoMyFruitList();
            }
            this.setInfoPublicFruitList();
        };
        DoubleColorSence.prototype.onAbovePop = function () {
            this.setInfoButton();
            this.setInfoPublicFruitList();
            this.setInfoMyFruitList();
        };
        DoubleColorSence.prototype.setInfoMyFruitList = function () {
            for (var i = 1; i < 6; i++) {
                var item = new zj.DoubleColorItem();
                this["groupFruit1_" + i].addChild(item);
                item.setInfo(i - 1, this, true, this.btnOK.enabled);
                this.myItemArr.push(item);
            }
        };
        DoubleColorSence.prototype.setInfoPublicFruitList = function () {
            var _this = this;
            for (var i = 1; i < 6; i++) {
                var item = new zj.DoubleColorItem();
                this["groupFruit2_" + i].addChild(item);
                item.setInfo(i - 1, this);
                this.publicItemArr.push(item);
            }
            if (this.state == 2) {
                var setPublicInfo_1 = function () {
                    var betReward = zj.Game.PlayerDoubleBallSystem.betReward(zj.Game.PlayerDoubleBallSystem.my_id, zj.Game.PlayerDoubleBallSystem.public_id);
                    if (zj.Game.PlayerDoubleBallSystem.my_id[0] == 0) {
                        _this.lbMy.text = zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + zj.TextsConfig.TextsConfig_Hunter_DoubleColor.not_in;
                    }
                    else {
                        _this.lbMy.text = zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + zj.TextsConfig.TextsConfig_Hunter_DoubleColor.reward[betReward.length];
                    }
                    var any = _this.myItemArr;
                    for (var i = 0; i < 5; i++) {
                        _this.myItemArr[i].upDate();
                        _this.publicItemArr[i].upDate();
                    }
                };
                if (zj.Game.PlayerDoubleBallSystem.public_id[0] == 0) {
                    zj.Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit()
                        .then(function (data) {
                        zj.Game.PlayerDoubleBallSystem.my_id = zj.Game.PlayerDoubleBallSystem.serverFruit(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
                        var idMy = zj.Game.PlayerDoubleBallSystem.my_id;
                        zj.Game.PlayerDoubleBallSystem.public_id = zj.Game.PlayerDoubleBallSystem.serverFruit(data.body.fruitInfo.dailyLotteryFruit.redFruit, data.body.fruitInfo.dailyLotteryFruit.blueFruit);
                        var idPublic = zj.Game.PlayerDoubleBallSystem.public_id;
                        setPublicInfo_1();
                    }).catch(function () {
                    });
                }
                else {
                    setPublicInfo_1();
                }
            }
            else if (this.state == 0) {
                this.lbMy.text = zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + zj.TextsConfig.TextsConfig_Hunter_DoubleColor.not_bet;
            }
            else if (this.state == 1) {
                this.lbMy.text = zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + zj.TextsConfig.TextsConfig_Hunter_DoubleColor.not_bet;
            }
        };
        //奖励预览
        DoubleColorSence.prototype.onBtnAwardView = function () {
            zj.loadUI(zj.DoubleColorViewAward)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //查询结果
        DoubleColorSence.prototype.onBnViewEnd = function () {
            zj.Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit()
                .then(function (data) {
                zj.Game.PlayerDoubleBallSystem.my_id = zj.Game.PlayerDoubleBallSystem.serverFruit(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
                zj.Game.PlayerDoubleBallSystem.public_id = zj.Game.PlayerDoubleBallSystem.serverFruit(data.body.fruitInfo.dailyLotteryFruit.redFruit, data.body.fruitInfo.dailyLotteryFruit.blueFruit);
                zj.loadUI(zj.DoubleColorViewEnd)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    var any = data.body.fruitInfo;
                    dialog.setInfo(data.body.fruitInfo.historyLotteryFruit);
                });
            });
        };
        //投注
        DoubleColorSence.prototype.onBtnOk = function () {
            var _this = this;
            if (zj.Game.PlayerDoubleBallSystem.canPour()) {
                zj.loadUI(zj.DoubleColorPop)
                    .then(function (dialog) {
                    dialog.init(_this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.not_enough);
            }
        };
        //时间戳转换为字符串格式
        DoubleColorSence.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        DoubleColorSence.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.timer.stop();
        };
        return DoubleColorSence;
    }(zj.Dialog));
    zj.DoubleColorSence = DoubleColorSence;
    __reflect(DoubleColorSence.prototype, "zj.DoubleColorSence");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorSence.js.map