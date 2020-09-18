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
    //公会日志
    //yuqingchao
    //2018.11.29
    var LeagueLog = (function (_super) {
        __extends(LeagueLog, _super);
        function LeagueLog() {
            var _this = _super.call(this) || this;
            _this.recordDay = 0;
            _this.skinName = "resource/skins/league/LeagueLogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueLog.prototype.init = function (type, msg, father) {
            this.recordDay = 0;
            this.father = father;
            this.imgTop.source = zj.cachekey(zj.UIConfig.UIConfig_League.logTypeTitle[type - 1], this);
            this.loadList(type, msg);
        };
        LeagueLog.prototype.onBtnClose = function () {
            var _this = this;
            this.close(zj.UI.HIDE_TO_TOP);
            //判断父类是不是LeagueMain
            if (this.father instanceof zj.LeagueMain) {
                egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300).call(function () { _this.father.groupMain.touchChildren = true; });
            }
        };
        //时间戳转换为字符串格式
        LeagueLog.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        LeagueLog.prototype.loadList = function (type, records) {
            this.lstItem.itemRendererFunction = this.logItemRendererFunction;
            var arr = new eui.ArrayCollection();
            var tblLog = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.log + ".json");
            var count = 1;
            records.sort(function (a, b) {
                if (a.generate_time == b.generate_time)
                    return a.type - b.type;
                return b.generate_time - a.generate_time;
            });
            for (var i = 0; i < records.length; i++) {
                if (tblLog[records[i].type] != null && type == tblLog[records[i].type]["type"]) {
                    var recordDay = records[i].generate_time;
                    var timeTblnew = this.time(recordDay);
                    var timeTblold = this.time(this.recordDay);
                    if (count == 1 || timeTblnew.Y != timeTblold.Y || timeTblnew.M != timeTblold.M || timeTblnew.D != timeTblold.D) {
                        arr.addItem({
                            itemNum: 1,
                            records: records[i],
                            timeTblnew: timeTblnew
                        });
                        this.lstItem.dataProvider = arr;
                        this.recordDay = recordDay;
                    }
                    arr.addItem({
                        i: i,
                        itemNum: 2,
                        records: records[i],
                        timeTblnew: timeTblnew
                    });
                    this.lstItem.dataProvider = arr;
                    count = count + 1;
                }
            }
        };
        // 根据type返回scroller加载的item
        LeagueLog.prototype.logItemRendererFunction = function (item) {
            if (item.itemNum == 1) {
                return zj.LeagueLogTitleItem;
            }
            else if (item.itemNum == 2) {
                return zj.LeagueLogContentItem;
            }
            return null;
        };
        return LeagueLog;
    }(zj.Dialog));
    zj.LeagueLog = LeagueLog;
    __reflect(LeagueLog.prototype, "zj.LeagueLog");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueLog.js.map