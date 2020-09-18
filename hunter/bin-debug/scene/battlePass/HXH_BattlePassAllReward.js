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
     * @class 通行证大奖一览
     *
     * @author LianLei
     *
     * @date 2019-11-20
     */
    var HXH_BattlePassAllReward = (function (_super) {
        __extends(HXH_BattlePassAllReward, _super);
        function HXH_BattlePassAllReward() {
            var _this = _super.call(this) || this;
            _this.listAwardTopData = new eui.ArrayCollection();
            _this.listAwardBottomData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassAllRewardSkin.exml";
            _this.btnLvUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLvUp, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.setInfo();
            return _this;
        }
        HXH_BattlePassAllReward.prototype.setInfo = function () {
            var rewardList = [];
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tblInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.season == season && v.id % 10 == 0 && v.free_reward[0] != null) {
                    rewardList.push(v);
                }
            }
            rewardList.sort(function (a, b) { return a.level - b.level; });
            this.listAwardTopData.removeAll();
            this.listAwardBottomData.removeAll();
            for (var i = 0; i < rewardList.length; i++) {
                this.listAwardTopData.addItem({ goodsId: rewardList[i].free_reward[0], count: rewardList[i].free_reward[1] });
                this.listAwardBottomData.addItem({ goodsId: rewardList[i].pay_reward[0], count: rewardList[i].pay_reward[1] });
            }
            this.listAwardTop.dataProvider = this.listAwardTopData;
            this.listAwardTop.itemRenderer = zj.HXH_BattlePassAllRewardItem;
            this.listAwardBottom.dataProvider = this.listAwardBottomData;
            this.listAwardBottom.itemRenderer = zj.HXH_BattlePassAllRewardItem;
            this.btnLvUp.visible = zj.Game.PlayerInfoSystem.BaseInfo.permitPay < 1;
        };
        HXH_BattlePassAllReward.prototype.onBtnLvUp = function () {
            this.close();
            zj.loadUI(zj.HXH_BattlePassPay).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassAllReward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_BattlePassAllReward.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        HXH_BattlePassAllReward.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return HXH_BattlePassAllReward;
    }(zj.Dialog));
    zj.HXH_BattlePassAllReward = HXH_BattlePassAllReward;
    __reflect(HXH_BattlePassAllReward.prototype, "zj.HXH_BattlePassAllReward");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassAllReward.js.map