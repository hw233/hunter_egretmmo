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
    // 时间赛跑
    // wangshenzhou
    // 2019.05.10
    var ActivityTimeRaceMain = (function (_super) {
        __extends(ActivityTimeRaceMain, _super);
        function ActivityTimeRaceMain() {
            var _this = _super.call(this) || this;
            _this.ArrayImg = [];
            _this.TotlePointNum = 21;
            _this.ALL_CORE_TBL = [1, 5, 9, 13, 17, 21];
            _this.progressTbl = [];
            _this.saveAwardState = [];
            _this.awardInfos = [];
            _this.lastCore = 0;
            _this.disAllCirle = [];
            _this.listDaysIndex = 0;
            _this.listMissionIndex = 0;
            _this.skinName = "resource/skins/activity/ActivityTimeRaceMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            //创建一个计时器对象
            _this.timer = new egret.Timer(999, 0);
            //注册事件侦听器
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.update, _this);
            _this.groupButton1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.SetInfoClickAward1, _this);
            _this.groupButton2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.SetInfoClickAward2, _this);
            _this.groupButton3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.SetInfoClickAward3, _this);
            _this.groupButton4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.SetInfoClickAward4, _this);
            _this.groupButton5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.SetInfoClickAward5, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.timer.start();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.init();
            return _this;
        }
        ActivityTimeRaceMain.prototype.init = function () {
            var _this = this;
            this.imageReck.width = 0;
            this.imageReck.alpha = 0.0001;
            this.groupImg.visible = false;
            this.ArrayImg = [
                this.img2,
                this.img3,
                this.img4,
                this.img6,
                this.img7,
                this.img8,
                this.img10,
                this.img11,
                this.img12,
                this.img14,
                this.img15,
                this.img16,
                this.img18,
                this.img19,
                this.img20,
            ];
            this.update();
            this.LoadPicSpine();
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", "000_diban1", 0)
                .then(function (display) {
                display.x = 20;
                display.y = display.height / 2 - 3;
                _this.groupBgAni.addChild(display);
            });
            // 当前活动轮数
            this.curActivityTurn = zj.PlayerRaceSystem.GetActivityIndex();
            this.progressTbl = [];
            this.saveAwardState = [];
            this.allKM = zj.PlayerRaceSystem.GetAllKM();
            this.SetALlCoresInfo();
            this.SetBigPointTbl();
            //设置奖励可领取
            this.InitAwardGetHide();
            this.lastCore = 0;
            this.runAni = true;
            this.smallImg();
            // this.SetInfoAward();
            this.SetInfoMsg();
            egret.Tween.get(this.imgName, { loop: true })
                .to({ y: 47.48 }, 0)
                .to({ y: 43 }, 1000)
                .to({ y: 47.48 }, 1000);
        };
        ActivityTimeRaceMain.prototype.Imagemask = function () {
            this.allKM = zj.PlayerRaceSystem.GetAllKM();
            var widthnum = this.imageReck.width;
            this.imageReck.width = 50 + (780 - 52) * (this.allKM / 100);
            var time = (this.imageReck.width / 50) * 60;
            if (this.imageReck.width < 52) {
                this.imageReck.width = 52;
                widthnum = 52;
            }
            egret.Tween.get(this.imageReck)
                .to({ width: widthnum }, 0)
                .to({ width: this.imageReck.width }, time);
            this.groupImg.visible = true;
            this.groupImg.mask = this.imageReck;
            var playernum = this.groupManImage.x;
            if (this.groupManImage.x < 34) {
                this.groupManImage.x = 34;
                playernum = 34;
            }
            else {
                egret.Tween.get(this.groupManImage)
                    .to({ x: playernum }, 0)
                    .to({ x: this.imageReck.width - 20 }, time);
            }
        };
        ActivityTimeRaceMain.prototype.smallImg = function () {
            var _this = this;
            for (var k in this.ArrayImg) {
                var v = this.ArrayImg[k];
                v.visible = false;
            }
            setTimeout(function () {
                for (var k in _this.ArrayImg) {
                    var v = _this.ArrayImg[k];
                    egret.Tween.get(v).wait(Number(k) * 50)
                        .to({ alpha: 0 }, 0)
                        .to({ visible: true }, 20)
                        .to({ alpha: 1 }, 80);
                }
            }, 500);
            setTimeout(function () {
                _this.EnterUIAni();
                _this.Imagemask();
            }, 1500);
        };
        ActivityTimeRaceMain.prototype.LoadPicSpine = function () {
            var _this = this;
            this.lbDoneNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.kilometre, 0);
            var picId = zj.Game.PlayerInfoSystem.BaseInfo.picId;
            var mapRole_id = zj.TableItemPic.Item(picId).mapRole_id;
            var bodySpxtbl = zj.TableMapRole.Item(mapRole_id);
            if (bodySpxtbl != null) {
                var bodySpxId = bodySpxtbl.body_spx_id;
                var bodyScale_1 = bodySpxtbl.spine_scale;
                var spineTable = zj.TableClientFightAniSpineSource.Item(bodySpxId);
                var ani_dbName = spineTable.json;
                zj.Game.DragonBonesManager.playAnimation(this, ani_dbName, "armatureName", 2, 0)
                    .then(function (display) {
                    display.x = _this.groupManImage.width / 2;
                    display.y = _this.groupManImage.height;
                    display.scaleX = bodyScale_1 * 0.35;
                    display.scaleY = bodyScale_1 * 0.35;
                    _this.groupManImage.addChild(display);
                });
            }
        };
        //获取点对应积分
        ActivityTimeRaceMain.prototype.SetALlCoresInfo = function () {
            this.awardTbl = zj.PlayerRaceSystem.RewardItem(this.curActivityTurn);
            this.awardCores = this.awardTbl.zone_km;
            this.awardTodayIndex = zj.PlayerRaceSystem.GetActivityDays(this.curActivityTurn);
            //奖励信息
            this.awardInfos = [];
            for (var i = 0; i < this.awardTbl.zone_reward_goods.length; i++) {
                this.awardInfos[i] = [];
                for (var j = 0; j < this.awardTbl.zone_reward_goods[i].length; j++) {
                    var goods = new message.GoodsInfo();
                    goods.goodsId = this.awardTbl.zone_reward_goods[i][j];
                    goods.count = this.awardTbl.zone_reward_count[i][j];
                    goods.showType = 1;
                    this.awardInfos[i].push(goods);
                }
            }
        };
        ActivityTimeRaceMain.prototype.SetInfoClickAward1 = function () {
            this.SetInfoClickAward(0);
        };
        ActivityTimeRaceMain.prototype.SetInfoClickAward2 = function () {
            this.SetInfoClickAward(1);
        };
        ActivityTimeRaceMain.prototype.SetInfoClickAward3 = function () {
            this.SetInfoClickAward(2);
        };
        ActivityTimeRaceMain.prototype.SetInfoClickAward4 = function () {
            this.SetInfoClickAward(3);
        };
        ActivityTimeRaceMain.prototype.SetInfoClickAward5 = function () {
            this.SetInfoClickAward(4);
        };
        //设置奖励按钮点击
        ActivityTimeRaceMain.prototype.SetInfoClickAward = function (i) {
            var _this = this;
            // for (let i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
            if (this.saveAwardState[i] == 0 || this.saveAwardState[i] == null) {
                //不可领取
                zj.loadUI(zj.Common_DesAward)
                    .then(function (dialog) {
                    dialog.setInfoActivity(_this.awardInfos[i]);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (this.saveAwardState[i] == 1) {
                //可领取
                this.ReqGetMissionReward(i);
            }
            else if (this.saveAwardState[i] == 2) {
                //已领取
                return;
            }
            // }
        };
        //查看阶段奖励状态
        ActivityTimeRaceMain.prototype.SetInfoAward = function () {
            this.saveAwardState = [];
            var thisthen = this;
            var _loop_1 = function (i) {
                //0 不可领取 1 可领取 2 已领取
                if (thisthen.allKM >= thisthen.bigPointPos[thisthen.ALL_CORE_TBL[i + 1]]) {
                    var hasGet = zj.Table.FindF(zj.Game.PlayerMissionSystem.missionActive.raceRewards, function (k, v) {
                        return v == (i + 1);
                    });
                    if (hasGet) {
                        //已领取
                        thisthen.saveAwardState[i] = 2;
                        thisthen["imgItemGet" + (i + 1)].visible = true;
                        thisthen["imgItemGet" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.canGet[2], this_1);
                        if (i == (thisthen.ALL_CORE_TBL.length - 1)) {
                            thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[1], this_1);
                        }
                        else {
                            thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[1], this_1);
                        }
                    }
                    else {
                        //可领取
                        thisthen.saveAwardState[i] = 1;
                        thisthen["imgItemGet" + (i + 1)].visible = true;
                        thisthen["imgItemGet" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.canGet[1], this_1);
                        if (i == (thisthen.ALL_CORE_TBL.length - 1)) {
                            thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this_1);
                        }
                        else {
                            thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this_1);
                        }
                    }
                }
                else {
                    //不可领取
                    thisthen.saveAwardState[i] = 0;
                    thisthen["imgItemGet" + (i + 1)].visible = false;
                    if (i == (thisthen.ALL_CORE_TBL.length - 2)) {
                        thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this_1);
                    }
                    else {
                        thisthen["imgItemIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this_1);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < thisthen.ALL_CORE_TBL.length - 1; i++) {
                _loop_1(i);
            }
        };
        //计算所需积分对应进展
        ActivityTimeRaceMain.prototype.GetProgressByCore = function (core) {
            var preBigPos = 1;
            var nextBigPos = this.TotlePointNum;
            var num = 1;
            for (var k in this.bigPointPos) {
                var v = this.bigPointPos[k];
                if ((core >= v) && this.bigPointPos[preBigPos] <= v) {
                    preBigPos = Number(k);
                }
                if ((core < v) && (v < this.bigPointPos[nextBigPos])) {
                    nextBigPos = Number(k);
                }
            }
            if (preBigPos == nextBigPos) {
                if (core >= this.bigPointPos[this.ALL_CORE_TBL[this.ALL_CORE_TBL.length]] + 5) {
                    return [this.ALL_CORE_TBL[this.ALL_CORE_TBL.length], 100];
                }
                else {
                    preBigPos = this.ALL_CORE_TBL[this.ALL_CORE_TBL.length - 1];
                }
            }
            var minusPointsNum = (this.bigPointPos[nextBigPos] - this.bigPointPos[preBigPos]) / (nextBigPos - preBigPos);
            var get1 = Math.floor((core - this.bigPointPos[preBigPos]) / minusPointsNum);
            var get2 = ((core - this.bigPointPos[preBigPos]) / minusPointsNum) - get1;
            var allNum = preBigPos + get1;
            var per = get2 * 100;
            return [allNum, per];
        };
        //圆点progress动态, 人物随圈移动动态
        ActivityTimeRaceMain.prototype.CircleMoveAni = function (core1, core2) {
            var _a = this.GetProgressByCore(core1), beginPoint = _a[0], beginPer = _a[1];
            var _b = this.GetProgressByCore(core2 + 5), endPoint = _b[0], endPer = _b[1];
            beginPoint = beginPoint >= this.TotlePointNum && this.TotlePointNum || beginPoint;
            endPoint = endPoint >= this.TotlePointNum && this.TotlePointNum || endPoint;
            var DelayTime = 0.07;
            var beginUseTime = (100 - beginPer) / 100 * DelayTime;
            var endUseTime = endPer / 100 * DelayTime;
            if (beginPoint == endPoint && this.TotlePointNum == endPoint) {
                this.runAni = false;
            }
            for (var i = beginPoint; i < endPoint; i++) {
                var delayTime = (i - beginPoint - 1) * DelayTime + beginUseTime;
                delayTime = (delayTime < 0) && 0 || delayTime;
                var useTime = DelayTime;
                if (i == beginPoint) {
                    useTime = beginUseTime;
                }
                else if (i == endPoint) {
                    useTime = endUseTime;
                }
                // 	//圆点动态
                // 	let per = (i == endPoint) && endPer || 100;
                // 	let [_, bigNum] = Table.FindR(this.ALL_CORE_TBL, function (k, v) {
                // 		return v == i;
                // 	})
                // 	if ((bigNum != null) && (per >= 50)) {
                // 		this["lbNum" + (bigNum + 1)].textColor = Helper.RGBToHex("r:113,g:61,b:6")
                // 	}
                // 	if ((bigNum != null) && (bigNum != 1)) {
                // 		this.SetBoxStateByIndex();
                // 	}
                // if (i == endPoint) {
                // 	this.runAni = false;
                // 	this.lastCore = core2;
                // }
            }
            this.SetBoxStateByIndex();
            this.lbDoneNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.kilometre, this.allKM);
        };
        ActivityTimeRaceMain.prototype.EnterUIAni = function () {
            var delayTime = 20;
            for (var i = 0; i < this.ALL_CORE_TBL[this.ALL_CORE_TBL.length - 1]; i++) {
                this.CircleMoveAni(this.lastCore, this.allKM);
            }
        };
        ActivityTimeRaceMain.prototype.SetBoxStateByIndex = function () {
            var _loop_2 = function (i) {
                var index = i + 1;
                var thisthis = this_2;
                if (thisthis.allKM >= thisthis.bigPointPos[thisthis.ALL_CORE_TBL[index]]) {
                    var hasGet = zj.Table.FindF(zj.Game.PlayerMissionSystem.missionActive.raceRewards, function (k, v) {
                        return v == (index);
                    });
                    if (hasGet) {
                        //已领取
                        thisthis.saveAwardState[index - 1] = 2;
                        thisthis["imgItemGet" + index].visible = true;
                        thisthis["imgItemGet" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.canGet[2], this_2);
                        if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
                            thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[1], this_2);
                        }
                        else {
                            thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[1], this_2);
                        }
                    }
                    else {
                        //可领取
                        thisthis.saveAwardState[index - 1] = 1;
                        thisthis["imgItemGet" + index].visible = true;
                        thisthis["imgItemGet" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.canGet[1], this_2);
                        if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
                            thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this_2);
                        }
                        else {
                            thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this_2);
                        }
                    }
                }
                else {
                    //不可领取
                    thisthis.saveAwardState[index - 1] = 0;
                    thisthis["imgItemGet" + index].visible = false;
                    if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
                        thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this_2);
                    }
                    else {
                        thisthis["imgItemIcon" + index].source = zj.cachekey(zj.UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this_2);
                    }
                }
            };
            var this_2 = this;
            // 0 不可领取 1 可领取 2 已领取
            for (var i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
                _loop_2(i);
            }
        };
        ActivityTimeRaceMain.prototype.SetBigPointTbl = function () {
            //位置队形分数
            var coreTbl = this.awardCores;
            this.bigPointPos = [];
            //所有点代表距离
            this.disAllCirle = [];
            for (var k in this.ALL_CORE_TBL) {
                var v = this.ALL_CORE_TBL[k];
                if (Number(k) == 0) {
                    this.bigPointPos[v] = 0;
                    this.disAllCirle[v] = 0;
                }
                else {
                    this.bigPointPos[v] = coreTbl[Number(k) - 1];
                    this.disAllCirle[v] = coreTbl[Number(k) - 1];
                }
                this["lbNum" + (Number(k) + 1)].text = this.bigPointPos[v];
                var left = v;
                var right = this.ALL_CORE_TBL[Number(k) + 1];
                if (right == null) {
                    return;
                }
                var num = right - left;
                var leftNum = coreTbl[Number(k) - 1] || 0;
                var rightNum = coreTbl[k];
                var disDiffAve = (rightNum - leftNum) / num;
                for (var i = left + 1; i < right; i++) {
                    var value = (i - left) * disDiffAve + this.disAllCirle[v];
                    this.disAllCirle[i] = value;
                }
            }
        };
        ActivityTimeRaceMain.prototype.ButtonCloseAndGo = function (mainType, subType) {
            var _this = this;
            var missionGo = function () {
                var call = zj.Game.PlayerMissionSystem.getMission(mainType, subType);
                _this.onButtonClose(null, function () {
                    call();
                });
            };
            missionGo();
        };
        ActivityTimeRaceMain.prototype.InitAwardGetHide = function () {
            for (var i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
                this["imgItemGet" + (i + 1)].visible = false;
            }
        };
        ActivityTimeRaceMain.prototype.SetInfo = function () {
            //设置公里数
            this.SetInfoRaceDis();
        };
        ActivityTimeRaceMain.prototype.SetInfoMsg = function () {
            this.SetDaysList();
            this.SetMissionList();
            this.SetInfo();
        };
        //目前完成距离
        ActivityTimeRaceMain.prototype.SetInfoRaceDis = function () {
            this.lbTotalNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.kilometre, this.allKM);
        };
        //倒计时
        ActivityTimeRaceMain.prototype.update = function () {
            var time = zj.PlayerRaceSystem.GetLastTime(this.curActivityTurn);
            this.lbTime.text = time;
        };
        //设置天数列表
        ActivityTimeRaceMain.prototype.SetDaysList = function () {
            this.lstViewDays.selectedIndex = -1; // 默认选中
            this.lstViewDays.itemRenderer = zj.ActivityTimeRaseDaysItem; //
            this.listDaysItem = new eui.ArrayCollection();
            for (var i = 0; i < this.awardTbl.day_num; i++) {
                var data = new zj.ActivityTimeRaseDaysItemData();
                data.index = i + 1;
                data.father = this;
                this.listDaysItem.addItem(data);
            }
            this.lstViewDays.dataProvider = this.listDaysItem;
            this.listDaysIndex = this.lstViewDays.selectedIndex;
        };
        //设置任务列表
        ActivityTimeRaceMain.prototype.SetMissionList = function () {
            var missionTbls = zj.PlayerRaceSystem.SortActivityMission(this.curActivityTurn, this.awardTodayIndex);
            this.lstMission.itemRenderer = zj.ActivityTimeRaceMissionItem; //
            this.listMissionItem = new eui.ArrayCollection();
            for (var i = 0; i < missionTbls.length; i++) {
                var data = new zj.ActivityTimeRaceMissionItemData();
                data.index = i;
                data.info = missionTbls[i];
                data.father = this;
                this.listMissionItem.addItem(data);
            }
            this.lstMission.dataProvider = this.listMissionItem;
            this.listMissionIndex = this.lstMission.selectedIndex;
        };
        ActivityTimeRaceMain.prototype.ReqGetMissionReward = function (index) {
            var _this = this;
            zj.PlayerRaceSystem.ReqGetMissionReward_Visit(index + 1).then(function (data) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(data.body.gameInfo.getGoods);
                    dialog.setCB(function () { _this.SetInfoAward(); });
                    dialog.show();
                });
            }).catch(function (reason) { });
        };
        //鼠标抬起，移除 物品详情
        ActivityTimeRaceMain.prototype.onRemoveAward = function () {
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
        };
        ActivityTimeRaceMain.prototype.onButtonClose = function (a, cb) {
            this.timer.stop();
            this.timer.reset();
            if (cb != null) {
                cb();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityTimeRaceMain.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() != 0) {
                return;
            }
            var a = ev.data;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        ActivityTimeRaceMain.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        return ActivityTimeRaceMain;
    }(zj.Scene));
    zj.ActivityTimeRaceMain = ActivityTimeRaceMain;
    __reflect(ActivityTimeRaceMain.prototype, "zj.ActivityTimeRaceMain");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTimeRaceMain.js.map