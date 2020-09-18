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
    //ActivityThemeGiftItem
    //yuqingchao
    //2019.03.23
    var ActivityThemeGiftItem = (function (_super) {
        __extends(ActivityThemeGiftItem, _super);
        function ActivityThemeGiftItem() {
            var _this = _super.call(this) || this;
            _this.alnum = 0;
            _this.skinName = "resource/skins/activity/ActivityThemeGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityThemeGiftItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.main = null;
            }, null);
            return _this;
        }
        ActivityThemeGiftItem.prototype.dataChanged = function () {
            this.info = this.data.info; //活动奖励信息
            this.i = this.data.i;
            this.main = this.data.main;
            this.activities = this.data.activities; //全部信息
            this.father = this.data.father;
            this.setInfoGoods();
            this.setInfoGet(this.activities);
        };
        ActivityThemeGiftItem.prototype.setInfoGoods = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.rewards.length; i++) {
                this.arrayCollection.addItem({
                    j: i,
                    i: this.i,
                    info: this.info.rewards[i],
                    main: this.main,
                });
            }
            this.lsstViewAward.dataProvider = this.arrayCollection;
            this.lsstViewAward.itemRenderer = zj.ActivityAwardItem;
        };
        ActivityThemeGiftItem.prototype.setInfoGet = function (activityInfo) {
            this.alnum = 0;
            this.lbTitle.text = "";
            for (var kk in activityInfo.kvInfos) {
                var vv = activityInfo.kvInfos[kk];
                if (vv.key == this.info.mission_type) {
                    this.alnum = vv.value;
                }
            }
            var start = this.father.saveStart;
            var starTime = 0;
            if (this.info.mission_type < message.ActivityMissionType.ACTIVITY_MISSION_TYPE_END) {
                if (this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN && start) {
                    this.lbTitle.text = zj.TextsConfig.TextsConfig_Activity.mission_login;
                }
                else if (this.info.mission_type == 37) {
                    if (this.alnum < this.info.mission_condition) {
                        starTime = 0;
                    }
                    else {
                        starTime = 1;
                    }
                    this.lbTitle.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.mission_type_text[this.info.mission_type], this.info.mission_condition)
                        + zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.mission_times, starTime, (this.info.mission_condition / this.info.mission_condition));
                }
                else {
                    this.lbTitle.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.mission_type_text[this.info.mission_type], this.info.mission_condition)
                        + zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.mission_times, this.alnum, this.info.mission_condition);
                }
                var beReward = zj.Table.FindK(activityInfo.rewardIndex, this.info.mission_type) != -1; //已领取
                //可领取
                var canGet = (this.alnum >= this.info.mission_condition || this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && !beReward && start;
                this.imgGet.visible = beReward;
                this.btnGet.visible = !beReward;
                this.btnGet.enabled = canGet;
                if ((this.alnum >= this.info.mission_condition || this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && start) {
                    this.lbTitle.textColor = 0x3CFF00;
                }
                else {
                    this.lbTitle.textColor = 0xFFFFFF;
                }
            }
        };
        ActivityThemeGiftItem.prototype.onBtnGet = function () {
            var _this = this;
            var type = this.activities.type;
            var index = this.activities.index;
            var rewardIndex = this.info.mission_type;
            zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then(function (resp) {
                var hasGeneral = false;
                var goods = null;
                for (var _i = 0, _a = resp.getGoods; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        hasGeneral = true;
                        goods = v;
                        break;
                    }
                }
                if (hasGeneral && goods != null) {
                    zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                        dialog.setInfo(goods.goodsId, 0, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.show();
                                dialog.init(resp.getGoods);
                                dialog.setCB(function () {
                                    _this.father.onLstView();
                                });
                            });
                        });
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods, null, true);
                        dialog.show();
                        dialog.setCB(function () {
                            _this.father.onLstView();
                            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                        });
                    });
                }
            });
        };
        return ActivityThemeGiftItem;
    }(eui.ItemRenderer));
    zj.ActivityThemeGiftItem = ActivityThemeGiftItem;
    __reflect(ActivityThemeGiftItem.prototype, "zj.ActivityThemeGiftItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityThemeGiftItem.js.map