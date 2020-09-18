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
    //SkyAreanDropInfoItemAward
    //hexiaowei
    // 2019/02/14
    var SkyAreanDropInfoItemAward = (function (_super) {
        __extends(SkyAreanDropInfoItemAward, _super);
        function SkyAreanDropInfoItemAward() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/skyArean/SkyAreanDropInfoItemAwardSkin.exml";
            zj.cachekeys(zj.UIResource["SkyAreanDropInfoItemAward"], null);
            _this.groupSum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
            // this.groupSum.cacheAsBitmap = true;
        }
        //添加龙骨动画
        SkyAreanDropInfoItemAward.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        SkyAreanDropInfoItemAward.prototype.dataChanged = function () {
            zj.closeCache(this.groupSum);
            // this.imageIcon.mask = this.rectMask;
            this.groupAnimas.removeChildren();
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimas);
            var itemSet = zj.PlayerItemSystem.Set(this.data.reward_good_id, this.data.reward_good_show_type, this.data.reward_good_count);
            this.imageBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelAwardNum.text = zj.Set.NumberUnit2(this.data.reward_good_count);
            zj.setCache(this.groupSum);
        };
        SkyAreanDropInfoItemAward.prototype.isRectMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 20) {
                return true;
            }
            return false;
        };
        SkyAreanDropInfoItemAward.prototype.onShowGoodProperty = function (e) {
            var good = new message.GoodsInfo();
            good.goodsId = this.data.reward_good_id;
            good.count = this.data.reward_good_count;
            good.showType = this.data.reward_good_show_type;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: good, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return SkyAreanDropInfoItemAward;
    }(eui.ItemRenderer));
    zj.SkyAreanDropInfoItemAward = SkyAreanDropInfoItemAward;
    __reflect(SkyAreanDropInfoItemAward.prototype, "zj.SkyAreanDropInfoItemAward");
    //子项数据源
    var SkyAreanDropInfoItemAwardData = (function () {
        function SkyAreanDropInfoItemAwardData() {
        }
        return SkyAreanDropInfoItemAwardData;
    }());
    zj.SkyAreanDropInfoItemAwardData = SkyAreanDropInfoItemAwardData;
    __reflect(SkyAreanDropInfoItemAwardData.prototype, "zj.SkyAreanDropInfoItemAwardData");
})(zj || (zj = {}));
//# sourceMappingURL=SkyAreanDropInfoItemAward.js.map