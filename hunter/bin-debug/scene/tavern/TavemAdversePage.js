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
    //Tavern Page
    //hexiaowei
    //2018/11/09
    var TavemAdversePage = (function (_super) {
        __extends(TavemAdversePage, _super);
        function TavemAdversePage() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavemAdversePageSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.updateTime();
            _this.beerTblInfo = zj.PlayerGiftSystem.Instance_item(100202);
            _this.beerGiftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100202;
            });
            _this.setInfoGiftNum();
            zj.Tips.tips_oneday_set(zj.Tips.SAVE.TAVERN_ACTIVITY, true);
            return _this;
        }
        TavemAdversePage.prototype.init = function (tavern) {
            this.tavern = tavern;
        };
        //活动剩余时间
        TavemAdversePage.prototype.updateTime = function () {
            /*
            let beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfo, function (k, v) {
                            return v.gift_index == 100202
                        });
                let date = Game.Controller.serverNow();
                let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                let serverTime: number = humanDate.getTime() / 1000 - 8 * 60 * 60;
                let beerTblInfo = PlayerGiftSystem.Instance_item(100202)
                let timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
            */
            var timenew = zj.Game.PlayerProgressesSystem.progressMap[1013].leftTime - (7 * 86400 - zj.CommonConfig.activity_lottery_survival_time);
            if (timenew <= 0) {
                timenew = 0;
            }
            var unixTimestamp = this.timeShow(timenew);
            this.labelTime.textFlow = zj.Util.RichText(unixTimestamp);
        };
        //时间转为天、时、分
        TavemAdversePage.prototype.timeShow = function (ms) {
            var str = "";
            var day = Math.floor(ms / 86400);
            var hour = Math.floor((ms % 86400) / 3600);
            var min = Math.floor(((ms % 86400) % 3600) / 60);
            if (day == 0) {
                if (hour == 0) {
                    if (min == 0) {
                        str = zj.TextsConfig.TextsConfig_Convert.upToStock[4];
                    }
                    else {
                        str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[3], min);
                    }
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[2], hour, min);
                }
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.upToStock[1], day, hour, min);
            }
            return str;
        };
        //剩余可购买礼包的数量
        TavemAdversePage.prototype.setInfoGiftNum = function () {
            var str = "";
            if (this.beerGiftInfo[0] != null) {
                var time1 = this.beerTblInfo.buy_times - this.beerGiftInfo[0].buy_times;
                var time2 = this.beerTblInfo.buy_times;
                if (time1 <= 0) {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.beerGiftLast, 255, 38, 0, time1, time2);
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.beerGiftLast, 60, 255, 0, time1, time2);
                }
            }
            else {
                var time1 = 0;
                var time2 = this.beerTblInfo.buy_times;
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.beerGiftLast, 255, 38, 0, time1, time2);
            }
            this.labelGiftNum.textFlow = zj.Util.RichText(str);
        };
        TavemAdversePage.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
            //this.tavern.removeChild(this);
        };
        return TavemAdversePage;
    }(zj.Dialog));
    zj.TavemAdversePage = TavemAdversePage;
    __reflect(TavemAdversePage.prototype, "zj.TavemAdversePage");
})(zj || (zj = {}));
//# sourceMappingURL=TavemAdversePage.js.map