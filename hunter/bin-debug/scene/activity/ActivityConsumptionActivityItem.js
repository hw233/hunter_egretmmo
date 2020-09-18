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
    //累计消耗Item
    //yuqingchao
    //2019.04.01
    var ActivityConsumptionActivityItem = (function (_super) {
        __extends(ActivityConsumptionActivityItem, _super);
        function ActivityConsumptionActivityItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.skinName = "resource/skins/activity/ActivityConsumptionActivityItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityConsumptionActivityItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
                _this.main = null;
            }, null);
            return _this;
        }
        ActivityConsumptionActivityItem.prototype.dataChanged = function () {
            this.index = this.data.i - 1;
            this.info = this.data.info;
            this.father = this.data.father;
            this.main = this.data.main;
            this.reward = this.data.info.rewardZone[this.index];
            this.setInfoText();
            this.setInfoGoods();
            this.setInfoGet();
        };
        ActivityConsumptionActivityItem.prototype.setInfoText = function () {
            var strCount = zj.HelpUtil.textConfigFormat(this.father.saveInfo.acount, this.reward);
            this.lbInfo.textFlow = zj.Util.RichText(strCount);
        };
        ActivityConsumptionActivityItem.prototype.setInfoGoods = function () {
            this.arrayCollection = new eui.ArrayCollection();
            var arr = this.info.rewards;
            for (var i = 0; i < this.info.rewards[this.index].goodsInfo.length; i++) {
                this.arrayCollection.addItem({
                    i: this.index,
                    j: i,
                    info: this.info.rewards[this.index].goodsInfo[i],
                    main: this.main,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityAwardItem;
        };
        ActivityConsumptionActivityItem.prototype.setInfoGet = function () {
            var bStart = this.father.getInfoStart();
            var bIsGet = zj.Table.VIn(this.info.rewardIndex, this.data.i);
            var bNotGet = this.info.itemCount >= this.reward && !bIsGet && bStart;
            this.btnGet.enabled = bNotGet;
            this.btnGet.visible = !bIsGet;
            this.imgGet.visible = bIsGet;
        };
        ActivityConsumptionActivityItem.prototype.onBtnGet = function () {
            var _this = this;
            var type = this.info.type;
            var index = this.info.index;
            var rewardIndex = this.data.i;
            zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then(function (resp) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(resp.getGoods);
                    dialog.show();
                    dialog.setCB(function () {
                        _this.data.father.onLstView();
                        zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                    });
                });
            });
        };
        return ActivityConsumptionActivityItem;
    }(eui.ItemRenderer));
    zj.ActivityConsumptionActivityItem = ActivityConsumptionActivityItem;
    __reflect(ActivityConsumptionActivityItem.prototype, "zj.ActivityConsumptionActivityItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityConsumptionActivityItem.js.map