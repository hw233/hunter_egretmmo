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
     * @class 通行证解锁X级大奖UI(未升级通行证)
     *
     * @author LianLei
     *
     * @date 2019-11-22
     */
    var HXH_BattlePassGetGood = (function (_super) {
        __extends(HXH_BattlePassGetGood, _super);
        function HXH_BattlePassGetGood() {
            var _this = _super.call(this) || this;
            _this.listItemData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassGetGoodSkin.exml";
            _this.btnLvUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLvUp, _this);
            _this.groupCache.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        HXH_BattlePassGetGood.prototype.setInfo = function (level) {
            var rewardList = [];
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            for (var key in tblInfo) {
                if (tblInfo.hasOwnProperty(key)) {
                    var element = tblInfo[key];
                    if (element.season == season)
                        rewardList.push(element);
                }
            }
            rewardList.sort(function (a, b) { return a.level - b.level; });
            var list = [];
            for (var key in rewardList) {
                if (rewardList.hasOwnProperty(key)) {
                    var element = rewardList[key];
                    if (element.level <= level)
                        list.push(element);
                }
            }
            list.sort(function (a, b) { return a.level - b.level; });
            this.listItemData.removeAll();
            for (var i = 0; i < list.length; i++) {
                this.listItemData.addItem({ goodsId: list[i].pay_reward[0], count: list[i].pay_reward[1] });
            }
            this.listItem.dataProvider = this.listItemData;
            this.listItem.itemRenderer = zj.HXH_BattlePassAllRewardItem;
            this.goodId = rewardList[level - 1].pay_reward[0];
            this.count = rewardList[level - 1].pay_reward[1];
            var itemSet = zj.PlayerItemSystem.Set(this.goodId);
            if (this.goodId == 0) {
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.labelCount.text = "";
            }
            else {
                this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.goodId), this);
                this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.goodId), this);
                this.labelCount.text = this.count.toString();
            }
            this.btnLvUp.visible = zj.Game.PlayerInfoSystem.BaseInfo.permitPay != 1;
            egret.Tween.get(this.labelDetail, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
        };
        HXH_BattlePassGetGood.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.goodId;
            goodsInfo.count = this.count;
            var show = zj.TipManager.ShowProp(goodsInfo, this, e.localY * 0.75, e.stageX, e.stageY);
            show.name = "goods";
            this.addChild(show);
        };
        HXH_BattlePassGetGood.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "goods";
            this.addChild(show);
        };
        HXH_BattlePassGetGood.prototype.removeShow = function () {
            var show = this.getChildByName("goods");
            if (show)
                this.removeChild(show);
        };
        HXH_BattlePassGetGood.prototype.onBtnLvUp = function () {
            this.close();
            zj.loadUI(zj.HXH_BattlePassPay).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassGetGood.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HXH_BattlePassGetGood;
    }(zj.Dialog));
    zj.HXH_BattlePassGetGood = HXH_BattlePassGetGood;
    __reflect(HXH_BattlePassGetGood.prototype, "zj.HXH_BattlePassGetGood");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassGetGood.js.map