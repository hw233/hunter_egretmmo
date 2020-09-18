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
    //历史战绩-战斗记录
    //yuqingchao
    var LeagueUnionBattleHisRecordItem = (function (_super) {
        __extends(LeagueUnionBattleHisRecordItem, _super);
        function LeagueUnionBattleHisRecordItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionBattleHisRecordItem"], null);
            _this.btnView.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnView, _this);
            return _this;
        }
        LeagueUnionBattleHisRecordItem.prototype.dataChanged = function () {
            var info = this.data.value;
            var day = new Date(info.generate_time * 1000).getDay();
            var weekend = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            this.lbUnionTime.text = weekend[day]; //时间显示
            this.imgWin.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win[info.operate_result - 1], this); //比赛结果 图片
            this.lbUnionName.text = info.operater;
        };
        LeagueUnionBattleHisRecordItem.prototype.onBtnView = function () {
            egret.Tween.get(this.btnView).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
            zj.Game.PlayerLeagueSystem.leagueMatchBattleResult(this.data.value.operate_object)
                .then(function (cra) {
                zj.loadUI(zj.LeagueUnionDailySettlement)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.updatePanel(cra.body.battleResult);
                });
            });
        };
        return LeagueUnionBattleHisRecordItem;
    }(eui.ItemRenderer));
    zj.LeagueUnionBattleHisRecordItem = LeagueUnionBattleHisRecordItem;
    __reflect(LeagueUnionBattleHisRecordItem.prototype, "zj.LeagueUnionBattleHisRecordItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleHisRecordItem.js.map