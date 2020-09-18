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
    // 宝石收藏 -- 任务达人
    // wangshenzhuo
    // 20019/05/07
    var ActivityJewelCollectionMission = (function (_super) {
        __extends(ActivityJewelCollectionMission, _super);
        function ActivityJewelCollectionMission() {
            var _this = _super.call(this) || this;
            _this.actIndex = 0;
            _this.dailyIndex = 0;
            _this.finalIndex = 0;
            _this.skinName = "resource/skins/activity/ActivityJewelCollectionMissionSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            _this.buttonGetLeft1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonLeft1, _this);
            _this.buttonGetLeft2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonLeft2, _this);
            _this.Init();
            return _this;
        }
        ActivityJewelCollectionMission.prototype.Init = function () {
            this.actIndex = zj.PlayerJewelSystem.GetActivityIndex();
            this.SetInfo();
            this.imageFrame1.visible = false;
            this.imageFrame2.visible = false;
        };
        ActivityJewelCollectionMission.prototype.SetFather = function (father) {
            this.father = father;
        };
        ActivityJewelCollectionMission.prototype.SetInfo = function () {
            this.SetInfo_Daily();
            this.SetInfo_Final();
        };
        //每周任务
        ActivityJewelCollectionMission.prototype.SetInfo_Daily = function () {
            var id = zj.PlayerJewelSystem.GetJewelDailyMission(this.actIndex);
            var tbl = zj.Game.PlayerMissionSystem.itemMain(id);
            var index = zj.Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
            var _a = zj.Game.PlayerMissionSystem.itemComplete(index), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
            var itemSet = zj.PlayerItemSystem.Set(tbl.reward_goods[0][0], null, tbl.reward_goods[0][1]);
            this.dailyIndex = index;
            this.labelMission1.text = tbl.name; // 任务内容
            this.imageComplete1.visible = isOver; // 已完成
            this.imageFrame2.source = zj.cachekey(itemSet.Frame, this); // 奖励
            this.imageAward1.source = zj.cachekey(itemSet.Clip, this);
            this.labelTexrNum1.text = String(tbl.reward_goods[0][1]);
            this.labelDone1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.collection, isdo, todo); //完成度
            this.buttonGetLeft1.visible = !isOver; // 领取按钮
            this.buttonGetLeft1.enabled = (!isOver && isCanGet);
            this.imageGet1.visible = isOver; // 已领取
            this.imageExp1.mask = this.imageRect1;
            this.imageRect1.width = this.imageRect1.width * (isdo / todo);
        };
        //终极任务
        ActivityJewelCollectionMission.prototype.SetInfo_Final = function () {
            var id = zj.PlayerJewelSystem.GetJewelFinalMission(this.actIndex);
            var tbl = zj.Game.PlayerMissionSystem.itemMain(id);
            var index = zj.Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
            var _a = zj.Game.PlayerMissionSystem.itemComplete(index), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
            var itemSet = zj.PlayerItemSystem.Set(tbl.reward_goods[0][0], null, tbl.reward_goods[0][1]);
            this.finalIndex = index;
            this.labelMission2.text = tbl.name; // 任务内容
            this.imageComplete2.visible = isOver; // 已完成
            this.imageFrame2.source = zj.cachekey(itemSet.Frame, this); //奖励
            this.imageAward2.source = zj.cachekey(itemSet.Clip, this);
            this.labelTextNum2.text = String(tbl.reward_goods[0][1]);
            this.labelDone2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.degree_complete, isdo, todo); //完成度
            this.buttonGetLeft2.visible = !isOver;
            this.buttonGetLeft2.enabled = (!isOver && isCanGet);
            this.imageGet2.visible = isOver; //  已领取
            this.imageExp2.mask = this.imageRect2;
            this.imageRect2.width = this.imageRect2.width * (isdo / todo);
        };
        //每日任务领取
        ActivityJewelCollectionMission.prototype.onButtonLeft1 = function () {
            var _this = this;
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.dailyIndex];
            zj.PlayerJewelSystem.ReqReward(mission.type, mission.subType).then(function (data) {
                setTimeout(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.setCB(function () { _this.SetInfo(); });
                        dialog.show();
                    });
                }, 300);
            }).catch(function (reason) { });
        };
        //终极任务领取
        ActivityJewelCollectionMission.prototype.onButtonLeft2 = function () {
            var _this = this;
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.finalIndex];
            zj.PlayerJewelSystem.ReqReward(mission.type, mission.subType).then(function (data) {
                setTimeout(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.setCB(function () { _this.SetInfo(); });
                        dialog.show();
                    });
                }, 300);
            }).catch(function (reason) { });
        };
        //关闭按钮
        ActivityJewelCollectionMission.prototype.onBtnclose = function () {
            this.father.SetInfo();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityJewelCollectionMission;
    }(zj.Dialog));
    zj.ActivityJewelCollectionMission = ActivityJewelCollectionMission;
    __reflect(ActivityJewelCollectionMission.prototype, "zj.ActivityJewelCollectionMission");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityJewelCollectionMission.js.map