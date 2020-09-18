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
    //公会BOSS-庆功宴
    //yuqingchao
    //2019.03.11
    var LeagueBossCelebrate = (function (_super) {
        __extends(LeagueBossCelebrate, _super);
        function LeagueBossCelebrate() {
            var _this = _super.call(this) || this;
            _this.process = null;
            _this.type = [zj.TableEnum.Enum.League_CelebrateType.NORMAL, zj.TableEnum.Enum.League_CelebrateType.ADD];
            _this.skinName = "resource/skins/league/LeagueBossCelebrateSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.upDate, _this);
            _this.timer.start();
            _this.process = zj.Table.FindR(zj.Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
                    return true;
                }
            })[0];
            _this.initList();
            return _this;
        }
        LeagueBossCelebrate.prototype.upDate = function () {
            this.setTimeDes();
            if (this.process && this.process.leftTime * 1000 - egret.getTimer() <= 0) {
                if (this.timer)
                    this.timer.stop;
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        LeagueBossCelebrate.prototype.setTimeDes = function () {
            var time = this.process.leftTime - Math.floor(egret.getTimer() / 1000);
            this.lbTime.text = zj.Helper.GetTimeStr(time <= 0 ? 0 : time, false);
        };
        LeagueBossCelebrate.prototype.tableLength = function (table) {
            var len = 0;
            for (var k in table) {
                len++;
            }
            return len;
        };
        LeagueBossCelebrate.prototype.initList = function () {
            this.arrayCollection = new eui.ArrayCollection();
            var num = this.tableLength(zj.TableEnum.Enum.League_CelebrateType);
            var tip = 0;
            for (var i = 0; i < this.tableLength(zj.TableEnum.Enum.League_CelebrateType); i++) {
                this.arrayCollection.addItem({
                    i: i,
                    type: i + 1,
                    num: tip++,
                    father: this
                });
            }
            this.lstFood.dataProvider = this.arrayCollection;
            this.lstFood.itemRenderer = zj.LeagueBossCelebrateFood;
        };
        LeagueBossCelebrate.prototype.showCommonMessgae = function (ev) {
            var _this = this;
            setTimeout(function () {
                var ui = zj.newUI(zj.CommonMessage);
                _this.addChild(ui);
                ui.init(ev.data.source, ev.data.text, 0.5, 0.7, false);
            }, 300);
        };
        LeagueBossCelebrate.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.timer.stop();
        };
        return LeagueBossCelebrate;
    }(zj.Dialog));
    zj.LeagueBossCelebrate = LeagueBossCelebrate;
    __reflect(LeagueBossCelebrate.prototype, "zj.LeagueBossCelebrate");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossCelebrate.js.map