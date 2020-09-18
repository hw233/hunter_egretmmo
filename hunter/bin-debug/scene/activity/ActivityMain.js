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
    //活动主界面
    //yuqingchao
    //2019.03.23
    var ActivityMain = (function (_super) {
        __extends(ActivityMain, _super);
        function ActivityMain() {
            var _this = _super.call(this) || this;
            _this.selectTransferId = 100213;
            _this.dataList = [];
            _this.moveLocation = 0; //列表下拉移动位置
            _this.index = null;
            _this.ui = {
                "1": zj.newUI(zj.ActivityStarSever),
                "2": zj.newUI(zj.ActivityChargeActivity),
                "3": zj.newUI(zj.ActivityTopUpActivity),
                "6": zj.newUI(zj.ActivityExchangeActivity),
                "7": zj.newUI(zj.ActivityConsumptionActivity),
                "8": zj.newUI(zj.ActivityUplevelActivity),
                "15": zj.newUI(zj.ActivityThemeGift),
                "18": zj.newUI(zj.ActivityDoubleMouthCard),
                "19": zj.newUI(zj.ActivityDoubleTaver),
                "22": zj.newUI(zj.Activity_ActivityBoss),
                "28": zj.newUI(zj.Activity_InstanceRank),
                "29": zj.newUI(zj.Activity_redPackage),
                "30": zj.newUI(zj.ActivityDoublGemstone),
            };
            _this.isCollectUI = false; // 是否为前往收集活动UI
            _this.openDown = function () {
                egret.Tween.get(_this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
            };
            _this.closeUp = function () {
                egret.Tween.get(_this.groupMain).to({ scaleX: 1, scaleY: 1 }, 200);
            };
            _this.skinName = "resource/skins/activity/ActivityMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            _this.lstViewType.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLstViewType, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            zj.Game.EventManager.on(zj.GameEvent.ACTIVITY_TYPE_UPDATE, _this.updateTips, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                zj.Game.EventManager.off(zj.GameEvent.ACTIVITY_TYPE_UPDATE, _this.updateTips, _this);
                egret.Tween.removeTweens(_this.imgActivity);
                if (_this.timer)
                    _this.timer.stop();
                for (var k in _this.ui) {
                    var v = _this.ui[k];
                    v.close();
                }
                ;
                _this.ui = {};
            }, null);
            _this.init();
            return _this;
        }
        ActivityMain.prototype.init = function (id) {
            var _this = this;
            this.groupBgAni.removeChildren();
            this.lstViewType.selectedIndex = 0;
            this.setSort();
            this.setInit();
            this.setInfo();
            this.SetInfoSwitch();
            this.id = this.dataList[this.lstViewType.selectedIndex];
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(function (display) {
                _this.groupBgAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            egret.Tween.get(this.imgActivity, { loop: true })
                .to({ y: 36 }, 500)
                .to({ y: 40 }, 1000)
                .to({ y: 38 }, 500);
            if (this.id != "double token") {
                if (this.id != null) {
                    this.ui[this.id.type].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
                    this.getItemUi(this.lstViewType.selectedIndex);
                    if (this.dataList[this.lstViewType.selectedIndex].type == 19) {
                        this.ui[this.id.type].init();
                    }
                }
            }
            else {
                this.getItemUi(this.lstViewType.selectedIndex);
            }
            if (id != null) {
                var index = void 0;
                for (var i = 0; i < this.dataList.length; i++) {
                    if (id == this.dataList[i].type) {
                        index = i;
                        this.lstViewType.selectedIndex = i;
                    }
                }
                if (index == null || index == undefined) {
                    zj.toast_warning("活动暂未开启");
                    return;
                }
                this.ui[id].setInfo(this.dataList[index], this);
                this.join(id);
                return;
            }
            this.join();
            zj.Tips.tips_25_set(false);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.ACTIVITY);
        };
        ActivityMain.prototype.updateTips = function () {
            zj.Tips.SetTipsOfAllActivity();
            zj.Tips.tips_25_set(false);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.ACTIVITY);
        };
        ActivityMain.prototype.setSort = function () {
            var _this = this;
            var sortByValue = function (a, b) {
                var itemA = _this.getLoginTime(a.openTime, a.closeTime);
                var itemB = _this.getLoginTime(b.openTime, b.closeTime);
                if (a.topTime == b.topTime) {
                    if (itemA == itemB) {
                        if (a.type == b.type) {
                            return b.index - a.index;
                        }
                        else {
                            return b.type - a.type;
                        }
                    }
                    else {
                        return itemB - itemA;
                    }
                }
                else {
                    return b.topTime - a.topTime;
                }
            };
            zj.Game.PlayerActivitySystem.Activities.sort(sortByValue);
        };
        ActivityMain.prototype.setInit = function (down) {
            var _this = this;
            this.dataList = zj.PlayerActivitySystem.GetActivityUI();
            var findcollect = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                var arr = v.collectItems;
                return v.type == message.ActivityType.ACT_TYPE_COLLECT && v.collectItems.length != 0;
            })[0];
            if (findcollect != null) {
                var collectClientData = zj.Table.DeepCopy(findcollect);
                collectClientData.bClient = true;
                this.dataList.push(collectClientData); //搜集兑换
            }
            this.dataList.push("double token");
            for (var k in this.dataList) {
                var v = this.dataList[k];
                this.dataList[k].quality = 1;
                if (v.type == null) {
                    if (v[0] == "gift bag") {
                        if (!zj.Tips.tips_useTime_get(zj.Tips.SAVE.GIFT_BAG_ACTIVITY)) {
                            this.dataList[k].quality = 0;
                        }
                        else {
                            this.dataList[k].quality = 3;
                        }
                    }
                    else if (v[0] == "double token") {
                        if (!zj.Tips.tips_useTime_get(zj.Tips.SAVE.DOUBLE_TOKEN_ACTIVITY)) {
                            this.dataList[k].quality = 0;
                        }
                        else {
                            this.dataList[k].quality = 3;
                        }
                    }
                    else {
                        if (v.topTime != null && v.topTime != 0) {
                            this.dataList[k].quality = 4;
                        }
                    }
                }
            }
            var sortByValue = function (a, b) {
                //活动排序 topTime > 客户端活动有红点 > 其他服务器活动 >  客户端活动没红点
                var itemA = _this.getLoginTime(a.openTime, a.closeTime);
                var itemB = _this.getLoginTime(b.openTime, b.closeTime);
                a.topTime = a.topTime == null && 0 || a.topTime;
                b.topTime = b.topTime == null && 0 || b.topTime;
                if (a.quality == b.quality) {
                    if (a.topTime == b.topTime) {
                        if (itemA > 0 && itemB > 0)
                            return itemB - itemA;
                        else {
                            return itemA - itemB;
                        }
                    }
                    else {
                        return b.topTime - a.topTime;
                    }
                }
                else {
                    return b.quality - a.quality;
                }
            };
            this.dataList.sort(sortByValue);
            if (down == true) {
                this.onLstViewType();
            }
        };
        ActivityMain.prototype.getItemUi = function (index) {
            var info = this.dataList[index];
            var ui = null;
            if (info.type == null) {
                if (info == "gift bag") {
                }
                else if (info == "double token") {
                    //双倍钻石
                    this.groupJoin.addChild(this.ui[30]);
                    this.ui[30].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
                }
            }
            else if (info.type == message.ActivityType.ACT_TYPE_COLLECT && info.bClient) {
                this.groupJoin.removeChildren();
                this.ui["drop"] = new zj.ActivityDrop();
                this.ui["drop"].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
                this.groupJoin.addChild(this.ui["drop"]);
                this.isCollectUI = true;
            }
        };
        ActivityMain.prototype.setInfo = function () {
            this.setInfoType();
        };
        ActivityMain.prototype.setInfoType = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var k in this.dataList) {
                var v = this.dataList[k];
                this.arrayCollection.addItem({
                    k: k,
                    info: v
                });
            }
            this.lstViewType.dataProvider = this.arrayCollection;
            this.lstViewType.itemRenderer = zj.ActivityMainItem;
            this.scrollerInfo.viewport = this.lstViewType;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        ActivityMain.prototype.SetInfoSwitch = function (num) {
            if (num == null || num == undefined) {
                for (var k in this.dataList) {
                    var v = this.dataList[k];
                    this.index = Number(k);
                }
            }
            else {
                this.index = num;
            }
            var dList = this.dataList;
            var id = this.index;
            var activity_index = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.index == dList[id].index && v.type == dList[id].type;
            })[1];
            if (activity_index != null) {
            }
            if (this.dataList[this.index].type != null && this.dataList[this.index].bClient != true) {
                //已经开启,点击后，红点消失
                if (zj.Game.Controller.curServerTime > 0
                    && zj.Game.PlayerActivitySystem.Activities[activity_index].openTime <= zj.Game.Controller.curServerTime
                    && zj.Game.PlayerActivitySystem.Activities[activity_index].closeTime > zj.Game.Controller.curServerTime) {
                    //设置红点被点击
                    var a = this.dataList[this.index].type;
                    var b = this.dataList[this.index].index;
                    zj.Tips.tips_activity_set(this.dataList[this.index].type, this.dataList[this.index].index);
                    //设置活动红点
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.ACTIVITY);
                }
            }
            else {
                if (this.dataList[this.index] == "double token") {
                    //双倍钻石红点
                    zj.Tips.tips_useTime_set(zj.Tips.SAVE.DOUBLE_TOKEN_ACTIVITY);
                }
                else if (this.dataList[this.index].bClient == true && this.dataList[this.index].type == message.ActivityType.ACT_TYPE_COLLECT) {
                    var tip_index = this.dataList[this.index].openTime;
                    zj.Tips.tips_oneday_set(tip_index, true);
                }
            }
        };
        ActivityMain.prototype.getLoginTime = function (open, close) {
            open = open == null && zj.Game.PlayerInstanceSystem.curServerTime || open;
            close = close == null && zj.Game.PlayerInstanceSystem.curServerTime || close;
            var start = open - zj.Game.PlayerInstanceSystem.curServerTime;
            var stop = close - zj.Game.PlayerInstanceSystem.curServerTime;
            var str, color = null;
            if (start > 0)
                return -start;
            else
                return stop;
        };
        ActivityMain.prototype.onLstViewType = function (id) {
            // this.setInit();
            this.isCollectUI = false;
            this.scrollerInfo.viewport = this.lstViewType;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.setInfoType();
            this.id = this.dataList[this.lstViewType.selectedIndex];
            this.join();
            this.SetInfoSwitch(this.lstViewType.selectedIndex);
            if (this.id != "double token") {
                if (this.id != null) {
                    this.ui[this.id.type].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
                    this.getItemUi(this.lstViewType.selectedIndex);
                    if (this.dataList[this.lstViewType.selectedIndex].type == 19) {
                        this.ui[this.id.type].init();
                    }
                }
            }
            else {
                this.getItemUi(this.lstViewType.selectedIndex);
            }
            this.updateTips();
        };
        ActivityMain.prototype.join = function (id) {
            if (this.isCollectUI)
                return;
            this.groupJoin.removeChildren();
            if (this.id == "double token") {
                this.groupJoin.addChild(this.ui[30]);
            }
            if (this.ui[this.id.type] == null) {
                return;
            }
            if (id != null) {
                this.groupJoin.addChild(this.ui[id]);
                return;
            }
            this.groupJoin.addChild(this.ui[this.id.type]);
        };
        ActivityMain.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        ActivityMain.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() >= 1)
                return;
            var ui = this.getChildByName("details");
            if (ui) {
                return;
            }
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        ActivityMain.prototype.onBtnclose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityMain;
    }(zj.Scene));
    zj.ActivityMain = ActivityMain;
    __reflect(ActivityMain.prototype, "zj.ActivityMain");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityMain.js.map