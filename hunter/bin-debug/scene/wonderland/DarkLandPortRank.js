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
     * @author xingliwei
     *
     * @date 2019-6-17
     *
     * @class 贪婪之岛港口积分排行
     */
    var DarkLandPortRank = (function (_super) {
        __extends(DarkLandPortRank, _super);
        function DarkLandPortRank() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/DarkLandPortRankSkin.exml";
            _this.init();
            return _this;
        }
        DarkLandPortRank.prototype.init = function () {
            var _this = this;
            this.ReqRank();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            this.update = egret.setInterval(this.Update, this, 999);
            this.Update();
        };
        /**获取排行信息 */
        DarkLandPortRank.prototype.ReqRank = function () {
            var _this = this;
            zj.Game.PlayerWonderLandSystem.SceneQueryScoreRank(true)
                .then(function (msg) {
                _this.rankInfo = msg.ranks;
                _this.myRankInfo = msg.self_rank;
                _this.SetInfoMy();
                _this.SetInfoAll();
            }).catch(function () {
            });
        };
        /**底部倒计时刷新 */
        DarkLandPortRank.prototype.Update = function () {
            var _a = zj.PlayerDarkSystem.PortOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var str_time = zj.Set.timeLeaveSec(lastTime);
            if (!bOpen) {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, str_time);
                this.labelLast.textFlow = zj.Util.RichText(str_time);
            }
            else {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, str_time);
                this.labelLast.textFlow = zj.Util.RichText(str_time);
            }
        };
        /**设置页面基本信息 */
        DarkLandPortRank.prototype.SetInfoMy = function () {
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.myRankInfo.rank);
            this.labelName.text = this.myRankInfo.roleName;
            this.labelServer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(this.myRankInfo.groupName, "&", false), zj.singLecraft.decodeGroupName(this.myRankInfo.groupName, "&", true));
            this.labelValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.score, this.myRankInfo.score);
            if (this.myRankInfo.rank == 0 || this.myRankInfo.score < zj.CommonConfig.darkland_rank_base_score) {
                this.labelLevel.text = (zj.TextsConfig.TextsConfig_WonderlandBoss.disAttend);
            }
            else if (this.myRankInfo.rank > 100) {
                this.labelLevel.text = ("100+");
            }
        };
        /**加载list */
        DarkLandPortRank.prototype.SetInfoAll = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.rankInfo.length; i++) {
                var data = new zj.DarkLandPortRankItemData();
                data.father = this;
                data.index = i;
                data.info = this.rankInfo[i];
                array.addItem(data);
            }
            this.listViewRank.dataProvider = array;
            this.listViewRank.itemRenderer = zj.DarkLandPortRankItem;
        };
        DarkLandPortRank.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return DarkLandPortRank;
    }(zj.Dialog));
    zj.DarkLandPortRank = DarkLandPortRank;
    __reflect(DarkLandPortRank.prototype, "zj.DarkLandPortRank");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandPortRank.js.map