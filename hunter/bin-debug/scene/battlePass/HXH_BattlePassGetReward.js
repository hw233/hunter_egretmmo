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
     * @class 通行证解锁X级大奖UI(已升级通行证)
     *
     * @author LianLei
     *
     * @date 2019-11-22
     */
    var HXH_BattlePassGetReward = (function (_super) {
        __extends(HXH_BattlePassGetReward, _super);
        function HXH_BattlePassGetReward() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassGetRewardSkin.exml";
            _this.groupCache.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            _this.btnToGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        HXH_BattlePassGetReward.prototype.setInfo = function (level) {
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
            this.goodId = rewardList[level - 1].pay_reward[0];
            this.count = rewardList[level - 1].pay_reward[1];
            var itemSet = zj.PlayerItemSystem.Set(this.goodId);
            this.labelLevel.text = level.toString();
            this.labelName.text = itemSet.Info.name;
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
        };
        HXH_BattlePassGetReward.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.goodId;
            goodsInfo.count = this.count;
            var show = zj.TipManager.ShowProp(goodsInfo, this, e.localY * 0.75, e.stageX, e.stageY);
            show.name = "goods";
            this.addChild(show);
        };
        HXH_BattlePassGetReward.prototype.removeShow = function () {
            var show = this.getChildByName("goods");
            if (show)
                this.removeChild(show);
        };
        HXH_BattlePassGetReward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HXH_BattlePassGetReward;
    }(zj.Dialog));
    zj.HXH_BattlePassGetReward = HXH_BattlePassGetReward;
    __reflect(HXH_BattlePassGetReward.prototype, "zj.HXH_BattlePassGetReward");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassGetReward.js.map