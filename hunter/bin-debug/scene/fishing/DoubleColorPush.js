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
    //DoubleColorPush
    //yuqingchao
    var DoubleColorPush = (function (_super) {
        __extends(DoubleColorPush, _super);
        function DoubleColorPush() {
            var _this = _super.call(this) || this;
            _this.historyBetInfo = null;
            _this.skinName = "resource/skins/fishing/DoubleColorPushSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        DoubleColorPush.prototype.init = function () {
            this.AskForDoubleInfo();
        };
        DoubleColorPush.prototype.AskForDoubleInfo = function () {
            var _this = this;
            // this.setInfo();
            zj.Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit().then(function (data) {
                zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.bPushed = true;
                zj.Game.PlayerDoubleBallSystem.SaveLastDoubleInfo();
                var historyInfo = data.body.fruitInfo.historyLotteryFruit;
                var sortByValue = function (a, b) {
                    return a.creatTime - b.creatTime;
                };
                historyInfo.sort(sortByValue);
                _this.historyBetInfo = historyInfo[0];
                if (_this.historyBetInfo == null) {
                    return;
                }
                ;
                _this.setInfo();
            });
        };
        DoubleColorPush.prototype.setInfo = function () {
            var historyTbl = []; //上期开奖记录
            historyTbl.push(this.historyBetInfo.redFruit);
            this.historyBetInfo.blueFruit.sort(function (a, b) {
                return a - b;
            });
            for (var i = 0; i < this.historyBetInfo.blueFruit.length; i++) {
                historyTbl.push(this.historyBetInfo.blueFruit[i]);
            }
            ;
            var any = zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo;
            var lastTbl = zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo.split("&");
            lastTbl.sort(function (a, b) {
                return Number(a) - Number(b);
            });
            var lstTbl = []; //投注记录
            for (var i = 1; i < 6; i++) {
                lstTbl.push(Number(lastTbl[i]));
            }
            //Red
            this.arrA = new eui.ArrayCollection();
            for (var i = 0; i < historyTbl.length; i++) {
                this.arrA.addItem({
                    i: i,
                    id: historyTbl[i],
                    bPrize: false,
                });
            }
            this.lstA.dataProvider = this.arrA;
            this.lstA.itemRenderer = zj.DoubleColorPushItem;
            //Blue
            this.arrB = new eui.ArrayCollection();
            for (var i = 0; i < lstTbl.length; i++) {
                var bPrize = zj.Table.VIn(historyTbl, lstTbl[i]);
                this.arrB.addItem({
                    i: i,
                    id: lstTbl[i],
                    bPrize: bPrize
                });
            }
            this.lstB.dataProvider = this.arrB;
            this.lstB.itemRenderer = zj.DoubleColorPushItem;
            var bet_reward = zj.Game.PlayerDoubleBallSystem.betReward(lstTbl, historyTbl); //判断是否中奖
            this.lbMy.text = zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_result + zj.TextsConfig.TextsConfig_Hunter_DoubleColor.reward[bet_reward.length];
        };
        DoubleColorPush.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return DoubleColorPush;
    }(zj.Dialog));
    zj.DoubleColorPush = DoubleColorPush;
    __reflect(DoubleColorPush.prototype, "zj.DoubleColorPush");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorPush.js.map