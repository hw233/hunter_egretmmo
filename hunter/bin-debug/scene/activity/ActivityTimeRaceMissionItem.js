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
    // wang shen zhuo
    // Activity_TimeRaseDaysItem
    // 2019.05.11   
    var ActivityTimeRaceMissionItem = (function (_super) {
        __extends(ActivityTimeRaceMissionItem, _super);
        function ActivityTimeRaceMissionItem() {
            var _this = _super.call(this) || this;
            _this.listDaysIndex = 0;
            _this.skinName = "resource/skins/activity/ActivityTimeRaceMissionItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityTimeRaceMissionItem"], null);
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGo, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonReward, _this);
            return _this;
        }
        ActivityTimeRaceMissionItem.prototype.dataChanged = function () {
            this.imgIcon.source = zj.cachekey("ui_acitivity_timerace_IconRace_png", this);
            this.index = this.data.index;
            this.missions = this.data.info;
            this.father = this.data.father;
            this.InitBase();
            this.SetInfoUI();
        };
        ActivityTimeRaceMissionItem.prototype.InitBase = function () {
            this.btnGo.visible = false;
            this.imageDone.visible = false;
            this.btnReward.visible = false;
            this.btnReward.enabled = true;
            this.btnCharge.visible = false;
            this.groupLock.visible = false;
        };
        ActivityTimeRaceMissionItem.prototype.SetInfoUI = function () {
            var moveMetre = this.missions.info.race_km;
            var desStr = this.missions.des;
            var openStr = this.missions.openStr;
            var bOpen = this.missions.bOpen;
            var bShowGo = !(this.missions.info.mission_type == message.MissionSubType.MISSION_SUB_TYPE_ADD_CHARGE);
            var rewardTbl = [];
            for (var k in this.missions.info.reward_goods) {
                var v = this.missions.info.reward_goods[k];
                var goods = new message.GoodsInfo();
                goods.goodsId = v[0];
                goods.count = v[1];
                rewardTbl.push(goods);
            }
            if (bOpen) {
                if (this.missions.state == 0) {
                    //已领取
                    this.imageDone.visible = true;
                    this.btnReward.visible = false;
                    this.btnReward.enabled = false;
                }
                else if (this.missions.state == 1) {
                    //不可领取
                    this.btnGo.visible = bShowGo;
                }
                else if (this.missions.state == 2) {
                    this.btnReward.visible = true;
                }
            }
            else {
                this.groupLock.visible = true;
            }
            this.lbRaceNum.text = moveMetre;
            this.lbMissionDes.textFlow = zj.Util.RichText(desStr);
            this.lbLevel.text = openStr;
            this.listViewAward.selectedIndex = -1; // 默认选中
            this.listViewAward.itemRenderer = zj.SkyAreanDropInfoItemAward; //
            this.listDaysItem = new eui.ArrayCollection();
            for (var i = 0; i < rewardTbl.length; i++) {
                var data = new zj.SkyAreanDropInfoItemAwardData();
                data.index = i;
                data.isshow = 1;
                data.father = this;
                data.reward_good_count = rewardTbl[i].count;
                data.reward_good_id = rewardTbl[i].goodsId;
                data.reward_good_show_type = rewardTbl[i].show_type;
                this.listDaysItem.addItem(data);
            }
            this.listViewAward.dataProvider = this.listDaysItem;
            this.listDaysIndex = this.listViewAward.selectedIndex;
        };
        ActivityTimeRaceMissionItem.prototype.onButtonGo = function () {
            this.btnGo.enabled = false;
            this.father.ButtonCloseAndGo(1, this.missions.info.sub_type);
        };
        ActivityTimeRaceMissionItem.prototype.onButtonReward = function () {
            // if(this.father.runAni == false) {
            this.ReqReward();
            // }
        };
        ActivityTimeRaceMissionItem.prototype.ReqReward = function () {
            var _this = this;
            var sub_type = this.missions.info.sub_type;
            zj.PlayerRaceSystem.ReqReward_Visit(sub_type).then(function (data) {
                setTimeout(function () {
                    _this.father.allKM = zj.PlayerRaceSystem.GetAllKM();
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                        dialog.setCB(function () { _this.SetInfoGet(); });
                    });
                }, 500);
            }).catch(function (reason) { });
        };
        ActivityTimeRaceMissionItem.prototype.SetInfoGet = function () {
            var _this = this;
            var levelUp = function () {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level > zj.Game.PlayerInfoSystem.baseInfo_pre.level) {
                    zj.TipManager.LevelUp();
                    zj.Game.PlayerInfoSystem.baseInfo_pre = zj.Game.PlayerInfoSystem.BaseInfo;
                }
            };
            var cb = function () {
                _this.father.allKM = zj.PlayerRaceSystem.GetAllKM();
                _this.father.SetALlCoresInfo();
                _this.father.SetDaysList();
                _this.father.SetInfo();
                _this.father.SetMissionList();
                _this.father.CircleMoveAni(_this.father.lastCore, _this.father.allKM);
                _this.father.Imagemask();
            };
            egret.Tween.get(this.groupContent)
                .to({ x: 0 }, 0)
                .to({ y: 0 }, 0)
                .to({ x: 1000 }, 200);
            setTimeout(function () {
                levelUp();
                cb();
            }, 600);
        };
        return ActivityTimeRaceMissionItem;
    }(eui.ItemRenderer));
    zj.ActivityTimeRaceMissionItem = ActivityTimeRaceMissionItem;
    __reflect(ActivityTimeRaceMissionItem.prototype, "zj.ActivityTimeRaceMissionItem");
    var ActivityTimeRaceMissionItemData = (function () {
        function ActivityTimeRaceMissionItemData() {
        }
        return ActivityTimeRaceMissionItemData;
    }());
    zj.ActivityTimeRaceMissionItemData = ActivityTimeRaceMissionItemData;
    __reflect(ActivityTimeRaceMissionItemData.prototype, "zj.ActivityTimeRaceMissionItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTimeRaceMissionItem.js.map