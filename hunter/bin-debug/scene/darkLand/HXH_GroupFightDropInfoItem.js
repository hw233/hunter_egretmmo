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
    // HXH_GroupFightDropInfoItem
    // wangshenzhuo
    // 2019/03/06
    var HXH_GroupFightDropInfoItem = (function (_super) {
        __extends(HXH_GroupFightDropInfoItem, _super);
        function HXH_GroupFightDropInfoItem() {
            var _this = _super.call(this) || this;
            _this.getlist = [];
            _this.dropIndex = 0;
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightDropInfoItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_GroupFightDropInfoItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            _this.groupFrist.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        HXH_GroupFightDropInfoItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFrist);
            this.labelCurrentLayerNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.hard, this.data.id % 10000);
            var tbl = zj.PlayerTowerSystem.Item(this.data.id);
            this.listDorpItem.selectedIndex = 0; // 默认选中
            this.listDorpItem.itemRenderer = zj.SkyAreanDropInfoItemAward; //
            this.dropItem = new eui.ArrayCollection();
            for (var i = 0; i < this.data.reward.length; i++) {
                var data = new zj.SkyAreanDropInfoItemAwardData();
                data.index = i;
                data.father = this;
                data.reward_good_count = this.data.reward[i].count;
                data.reward_good_id = this.data.reward[i].goodsId;
                data.reward_good_show_type = this.data.reward[i].showType;
                this.dropItem.addItem(data);
            }
            this.listDorpItem.dataProvider = this.dropItem;
            this.dropIndex = this.listDorpItem.selectedIndex;
            var itemSet = zj.PlayerItemSystem.Set(this.data.first.goodsId, 1, this.data.first.count);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelItemNum.text = zj.Set.NumberUnit2(this.data.first.count);
            zj.setCache(this.groupCache);
        };
        HXH_GroupFightDropInfoItem.prototype.onShowGoodProperty = function (e) {
            var goodsi = new message.GoodsInfo();
            goodsi.goodsId = this.data.first.goodsId;
            goodsi.count = this.data.first.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsi, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        HXH_GroupFightDropInfoItem.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        //添加龙骨动画
        HXH_GroupFightDropInfoItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.width / 2;
                //display.y =this.height*0.25;
                display.y = group.height / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HXH_GroupFightDropInfoItem;
    }(eui.ItemRenderer));
    zj.HXH_GroupFightDropInfoItem = HXH_GroupFightDropInfoItem;
    __reflect(HXH_GroupFightDropInfoItem.prototype, "zj.HXH_GroupFightDropInfoItem");
    //子项数据源
    var HXH_GroupFightDropInfoItemData = (function () {
        function HXH_GroupFightDropInfoItemData() {
        }
        return HXH_GroupFightDropInfoItemData;
    }());
    zj.HXH_GroupFightDropInfoItemData = HXH_GroupFightDropInfoItemData;
    __reflect(HXH_GroupFightDropInfoItemData.prototype, "zj.HXH_GroupFightDropInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightDropInfoItem.js.map