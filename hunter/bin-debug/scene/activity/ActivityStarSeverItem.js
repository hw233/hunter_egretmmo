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
    //周末登陆活动Item
    //yuqingchao
    //2019.03.23
    var ActivityStarSeverItem = (function (_super) {
        __extends(ActivityStarSeverItem, _super);
        function ActivityStarSeverItem() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.skinName = "resource/skins/activity/ActivityStarSeverItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityStarSeverItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.main = null;
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityStarSeverItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.main = this.data.main;
            this.activities = this.data.activities;
            this.i = this.data.i;
            this.father = this.data.father;
            this.imgDay.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.day[this.i + 1], this);
            this.setInfoGoods();
            this.setInfoGet();
        };
        ActivityStarSeverItem.prototype.setInfoGoods = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.length; i++) {
                this.arrayCollection.addItem({
                    j: i,
                    i: this.data.i,
                    info: this.info[i],
                    main: this.main
                });
            }
            this.lstAward.dataProvider = this.arrayCollection;
            this.lstAward.itemRenderer = zj.ActivityAwardItem;
        };
        ActivityStarSeverItem.prototype.setInfoGet = function () {
            var _a = this.father.getInfoToday(), today = _a[0], isGet = _a[1];
            var bStart = this.father.getInfoStart();
            var bNotGet = this.i + 1 == today && !isGet && bStart;
            var bIsGet = this.i + 1 < today || (this.i + 1 == today && isGet);
            this.btnGet.enabled = bNotGet;
            this.btnGet.visible = !bIsGet;
            this.imgGet.visible = bIsGet;
        };
        ActivityStarSeverItem.prototype.onBtnGet = function () {
            var _this = this;
            var _a = this.father.getInfoToday(), today = _a[0], isGet = _a[1];
            var bStart = this.father.getInfoStart();
            if (bStart && this.i + 1 == today && !isGet) {
                var type = this.activities.type;
                var index = this.activities.index;
                var rewardIndex = this.data.i;
                zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, true).then(function (resp) {
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
            }
        };
        return ActivityStarSeverItem;
    }(eui.ItemRenderer));
    zj.ActivityStarSeverItem = ActivityStarSeverItem;
    __reflect(ActivityStarSeverItem.prototype, "zj.ActivityStarSeverItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityStarSeverItem.js.map