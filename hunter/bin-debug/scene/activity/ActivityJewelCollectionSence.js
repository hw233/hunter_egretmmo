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
    // wangshenzhuo
    // 2019.05.06
    // 宝石收藏
    var ActivityJewelCollectionSence = (function (_super) {
        __extends(ActivityJewelCollectionSence, _super);
        function ActivityJewelCollectionSence() {
            var _this = _super.call(this) || this;
            _this.actIndex = 0;
            _this.skinName = "resource/skins/activity/ActivityJewelCollectionSenceSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            _this.buttonMission.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMission, _this);
            _this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMall, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.imageTop); //因为是循环播放  特殊处理
            }, null);
            _this.Init();
            return _this;
        }
        ActivityJewelCollectionSence.prototype.Init = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", "000_diban1", 0)
                .then(function (display) {
                display.x = 55;
                display.y = display.height / 2 - 3;
                _this.groupBgAni.addChild(display);
            });
            egret.Tween.get(this.imageTop, { loop: true })
                .to({ y: 38.48 }, 0)
                .to({ y: 33 }, 1000)
                .to({ y: 38.48 }, 1000);
            // this.imageclip1.visible = false;
            // this.imageclip2.visible = false;
            this.labelNum1.visible = false;
            this.labelNum2.visible = false;
            this.SetInfo();
        };
        ActivityJewelCollectionSence.prototype.SetInfo = function () {
            this.actIndex = zj.PlayerJewelSystem.GetActivityIndex();
            this.TimeOrContent();
            this.Condition1();
            this.Condition2();
            this.Condition3();
            this.JewelExchange();
            this.tips();
        };
        // 活动时间和内容描述 
        ActivityJewelCollectionSence.prototype.TimeOrContent = function () {
            this.labelTime.text = zj.PlayerJewelSystem.GetActivityTime(this.actIndex);
            this.labelDes.text = zj.TextsConfig.TextsConfig_Activity.Jewel.activityContent;
            var missionType = zj.PlayerJewelSystem.GetMissionType(this.actIndex);
            if (missionType == zj.PlayerJewelSystemMission_Type.CARD) {
                this.imageMissionName1.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Card.text1, this);
                this.imageMissionPic1.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Card.img1, this);
                this.imageMissionName2.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Card.text2, this);
                this.imageMissionPic2.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Card.img2, this);
            }
            else if (missionType == zj.PlayerJewelSystemMission_Type.HUNTER) {
                this.imageMissionName1.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Hunter.text1, this);
                this.imageMissionPic1.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Hunter.img1, this);
                this.imageMissionName2.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Hunter.text2, this);
                this.imageMissionPic2.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Hunter.img2, this);
            }
            this.imageMissionName3.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Item.text1, this);
            this.imageMissionPic3.source = zj.cachekey(zj.UIConfig.UIConfig_Jewel.Item.img1, this);
        };
        //宝石获取途径(条件一)
        ActivityJewelCollectionSence.prototype.Condition1 = function () {
            var condition1 = zj.PlayerJewelSystem.GetCondition_1(this.actIndex);
            for (var i = 0; i < 3; i++) {
                this["labelMission1" + (i + 1)].text = condition1[i][0];
                this["labelGetJewel1" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.X, condition1[i][1]);
            }
        };
        //条件二
        ActivityJewelCollectionSence.prototype.Condition2 = function () {
            var condition2 = zj.PlayerJewelSystem.GetCondition_2(this.actIndex);
            for (var i = 0; i < 3; i++) {
                this["labelMission2" + (i + 1)].text = condition2[i][0];
                this["labelGetJewel2" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.X, condition2[i][1]);
            }
        };
        //条件三
        ActivityJewelCollectionSence.prototype.Condition3 = function () {
            var condition3 = zj.PlayerJewelSystem.GetCondition_3(this.actIndex);
            for (var i = 0; i < condition3.length; i++) {
                var itemSet = zj.PlayerItemSystem.Set(condition3[i][0]);
                this["imageFrame" + (i + 1)].source = zj.cachekey(itemSet.Frame, this);
                this["imageclip" + (i + 1)].source = zj.cachekey(itemSet.Clip, this);
                this["labelItemName" + (i + 1)].text = itemSet.Info["name"];
                this["labelGetJewel3" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.X, condition3[i][1]);
            }
        };
        //宝石兑换
        ActivityJewelCollectionSence.prototype.JewelExchange = function () {
            var tbl = zj.PlayerJewelSystem.JewelItem(this.actIndex);
            this.labelDailyJewelMax.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.jewel_limit, tbl.daily_limit);
            this.labelDailyJewel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.jewel_Daily, zj.Game.PlayerMissionSystem.missionActive.jewelToday, tbl.daily_limit);
            this.labelHaveJewel.text = zj.Game.PlayerMissionSystem.missionActive.jewelHave.toString();
        };
        //红点
        ActivityJewelCollectionSence.prototype.tips = function () {
            this.imageTipMission.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.Jewel, 1);
            this.imageTipMall.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.Jewel, 2);
        };
        //任务达人按钮
        ActivityJewelCollectionSence.prototype.onButtonMission = function () {
            var _this = this;
            zj.loadUI(zj.ActivityJewelCollectionMission)
                .then(function (dialog) {
                dialog.SetFather(_this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //宝石商店按钮
        ActivityJewelCollectionSence.prototype.onButtonMall = function () {
            var _this = this;
            zj.loadUI(zj.ActivityJewelCollectionMall)
                .then(function (dialog) {
                dialog.SetFather(_this);
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //关闭按钮
        ActivityJewelCollectionSence.prototype.onBtnclose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityJewelCollectionSence;
    }(zj.Scene));
    zj.ActivityJewelCollectionSence = ActivityJewelCollectionSence;
    __reflect(ActivityJewelCollectionSence.prototype, "zj.ActivityJewelCollectionSence");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityJewelCollectionSence.js.map