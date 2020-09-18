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
     * @class 年兽BOSS()
     *
     * @author Yu Qingchao
     *
     * 2019.08.02
     */
    var Activity_ActivityBoss = (function (_super) {
        __extends(Activity_ActivityBoss, _super);
        function Activity_ActivityBoss() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_ActivityBossSkin.exml";
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            return _this;
        }
        //时间戳转换为字符串格式
        Activity_ActivityBoss.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        Activity_ActivityBoss.prototype.setInfo = function (info, father) {
            this.lbTextInfo.text = info.des;
            var strOpen = this.time(info.openTime);
            var timeOpen;
            if (strOpen.m < 10) {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
            }
            else {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
            }
            var strClose = this.time(info.closeTime);
            var timeClose;
            if (strClose.m < 10) {
                timeClose = strClose.Y + "-" + strClose.M + "-" + strClose.D + "  " + strClose.h + ":" + "0" + strClose.m;
            }
            else {
                timeClose = strClose.Y + "-" + strClose.M + "-" + strClose.D + "  " + strClose.h + ":" + strClose.m;
            }
            this.lbTime.text = timeOpen;
            this.lbTimeStop.text = timeClose;
        };
        Activity_ActivityBoss.prototype.onBtnGo = function () {
            var GoActivityBoss = function () {
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ACTIVITYBOSS, true)) {
                    zj.Game.PlayerBossSystem.darklandBossScoreRank().then(function () {
                        zj.loadUI(zj.Activity_BossMainPop)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            };
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], time = _a[1];
            if (!bOpen) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.battleNotStart);
            }
            else {
                GoActivityBoss();
            }
        };
        return Activity_ActivityBoss;
    }(zj.UI));
    zj.Activity_ActivityBoss = Activity_ActivityBoss;
    __reflect(Activity_ActivityBoss.prototype, "zj.Activity_ActivityBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_ActivityBoss.js.map