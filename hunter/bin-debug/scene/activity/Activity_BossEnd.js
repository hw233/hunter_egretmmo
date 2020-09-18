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
     * @class 年兽BOSS 活动结束
     *
     * @author Yu Qingchao
     *
     * 2019.07.20
     */
    var Activity_BossEnd = (function (_super) {
        __extends(Activity_BossEnd, _super);
        function Activity_BossEnd() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_BossEndSkin.exml";
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            return _this;
        }
        Activity_BossEnd.prototype.init = function () {
            this.UpdateRank();
        };
        Activity_BossEnd.prototype.SetInfoItem = function (info) {
            var rank = 0;
            if (info.rank == 0) {
                this.lbRank.text = zj.TextsConfig.TextsConfig_Activity.Rank_Charge.out;
            }
            else {
                this.lbRank.text = info.rank;
            }
            this.lbPoints.text = info.score;
            var rewardList = [];
            var tbl = zj.Game.PlayerBossSystem.GetBossRankGoodsTbl();
            for (var kk in tbl) {
                var vv = tbl[kk];
                if (info.rank > vv.rankZone[0] && info.rank <= vv.rankZone[1])
                    rewardList = vv.goodsInfo;
            }
            this.arrHit = new eui.ArrayCollection();
            for (var i = 0; i < rewardList.length; i++) {
                this.arrHit.addItem({
                    info: rewardList[i],
                    bln: true,
                });
            }
            this.lstHit.dataProvider = this.arrHit;
            this.lstHit.itemRenderer = zj.Activity_BossMainAwardItem;
        };
        /**更新个人积分 */
        Activity_BossEnd.prototype.UpdateRank = function () {
            var _this = this;
            zj.Game.PlayerBossSystem.darklandBossScoreRank().then(function (msg) {
                _this.SetInfoItem(msg.body.self_rank);
            }).catch(function (reason) { });
        };
        /**退出场景 */
        Activity_BossEnd.prototype.onBtnReturn = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            //关闭活动BOSS Map
            zj.Game.PlayerBossSystem.closeActivityBoss();
        };
        return Activity_BossEnd;
    }(zj.Dialog));
    zj.Activity_BossEnd = Activity_BossEnd;
    __reflect(Activity_BossEnd.prototype, "zj.Activity_BossEnd");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossEnd.js.map