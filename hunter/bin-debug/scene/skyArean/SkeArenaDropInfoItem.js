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
    //SkeArenaDropInfoItem
    //hexiaowei
    // 2019/02/14
    var SkeArenaDropInfoItem = (function (_super) {
        __extends(SkeArenaDropInfoItem, _super);
        function SkeArenaDropInfoItem() {
            var _this = _super.call(this) || this;
            _this.dropIndex = 0;
            _this.skinName = "resource/skins/skyArean/SkeArenaDropInfoItemSkin.exml";
            zj.cachekeys(zj.UIResource["SkeArenaDropInfoItem"], null);
            _this.imageIcon.mask = _this.rectMask;
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            _this.groupFirstKill.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        //添加龙骨动画
        SkeArenaDropInfoItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        SkeArenaDropInfoItem.prototype.dataChanged = function () {
            this.groupFirst.removeChildren();
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirst);
            this.labelCurrentLayerNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.floor, this.data.dropInfo.id % 10000);
            var tbl = zj.PlayerTowerSystem.Item(this.data.dropInfo.id);
            var goods = [];
            var count = [];
            var show_type = [];
            for (var k in tbl.reward_good_id) {
                var v = tbl.reward_good_id[k];
                var poledex = {
                    goodsId: null,
                };
                poledex.goodsId = v;
                goods.push(poledex);
            }
            for (var k in tbl.reward_good_count) {
                var v = tbl.reward_good_count[k];
                var poledex = {
                    count: null,
                };
                poledex.count = v;
                count.push(poledex);
            }
            for (var k in tbl.reward_good_show_type) {
                var v = tbl.reward_good_show_type[k];
                var poledex = {
                    show_type: null,
                };
                poledex.show_type = v;
                show_type.push(poledex);
            }
            this.listDorpItem.selectedIndex = 0; // 默认选中
            this.listDorpItem.itemRenderer = zj.SkyAreanDropInfoItemAward; //
            this.dropItem = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.SkyAreanDropInfoItemAwardData();
                data.index = i;
                data.father = this;
                data.reward_good_count = count[i].count;
                data.reward_good_id = goods[i].goodsId;
                data.reward_good_show_type = show_type[i].show_type;
                this.dropItem.addItem(data);
            }
            this.listDorpItem.dataProvider = this.dropItem;
            this.dropIndex = this.listDorpItem.selectedIndex;
            var itemSet = zj.PlayerItemSystem.Set(this.data.dropInfo.first_reward[0][0], 1, this.data.dropInfo.first_reward[0][1]);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelItemNum.text = this.data.dropInfo.first_reward[0][1];
        };
        SkeArenaDropInfoItem.prototype.onShowGoodProperty = function (e) {
            var goodsi = new message.GoodsInfo();
            goodsi.goodsId = this.data.dropInfo.first_reward[0][0];
            goodsi.count = this.data.dropInfo.first_reward[0][1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsi, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        SkeArenaDropInfoItem.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        return SkeArenaDropInfoItem;
    }(eui.ItemRenderer));
    zj.SkeArenaDropInfoItem = SkeArenaDropInfoItem;
    __reflect(SkeArenaDropInfoItem.prototype, "zj.SkeArenaDropInfoItem");
    //子项数据源
    var SkeArenaDropInfoItemData = (function () {
        function SkeArenaDropInfoItemData() {
        }
        return SkeArenaDropInfoItemData;
    }());
    zj.SkeArenaDropInfoItemData = SkeArenaDropInfoItemData;
    __reflect(SkeArenaDropInfoItemData.prototype, "zj.SkeArenaDropInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=SkeArenaDropInfoItem.js.map