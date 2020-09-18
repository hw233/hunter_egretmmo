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
     * @class 活动--现时兑换
     *
     * @author LianLei
     *
     * @date 2019-12-18
     */
    var ActivityAwardItemB = (function (_super) {
        __extends(ActivityAwardItemB, _super);
        function ActivityAwardItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityAwardItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityAwardItemB"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        ActivityAwardItemB.prototype.dataChanged = function () {
            var itemSet = zj.PlayerItemSystem.Set(this.data.info.goodsId, this.data.info.showType, this.data.info.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            if (this.data.index == 0) {
                var item01_get = zj.Game.PlayerItemSystem.itemCount(this.data.info.goodsId);
                var item01_getStr = "";
                var item01_num = this.data.info.count;
                if (item01_get > 100000) {
                    if (((item01_get / 1000) >>> 0) % 10 == 0) {
                        item01_getStr = ((item01_get / 10000) >>> 0) + "万";
                    }
                    else {
                        item01_getStr = (item01_get / 10000).toFixed(1) + "万";
                    }
                }
                else {
                    item01_getStr = item01_get.toString();
                }
                this.labelNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.get, item01_num, item01_getStr);
                if (item01_get < item01_num) {
                    this.labelNum.textColor = zj.ConstantConfig_Common.Color.red;
                }
                else {
                    this.labelNum.textColor = zj.ConstantConfig_Common.Color.green;
                }
            }
            else if (this.data.index == 1) {
                this.labelNum.text = this.data.info.count;
            }
            if (this.groupAni.getChildByName("ani") != null) {
                var ani = this.groupAni.getChildByName("ani");
                this.groupAni.removeChild(ani);
            }
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAni);
        };
        //添加龙骨动画
        ActivityAwardItemB.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes).then(function (display) {
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                display.name = "ani";
            });
        };
        ActivityAwardItemB.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ActivityAwardItemB;
    }(eui.ItemRenderer));
    zj.ActivityAwardItemB = ActivityAwardItemB;
    __reflect(ActivityAwardItemB.prototype, "zj.ActivityAwardItemB");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityAwardItemB.js.map