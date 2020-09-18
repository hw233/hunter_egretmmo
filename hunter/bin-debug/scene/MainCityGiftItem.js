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
    // HXH_MainCityGiftItem
    // lizhengiang
    // 20190415
    var MainCityGiftItem = (function (_super) {
        __extends(MainCityGiftItem, _super);
        function MainCityGiftItem() {
            var _this = _super.call(this) || this;
            _this.SelectTransferId = 100213;
            _this.JingXi1 = 900001; // 惊喜礼包A
            _this.JingXi2 = 900002; // 惊喜礼包B
            _this.FirstQuality = 1000001; // 猎人品质（一次）
            _this.EveryQuality = 500001; // 猎人品质（每次）
            _this.TIMESHOW = 10; //10天以内显示倒计时
            _this.index = null;
            _this.refresh = 0;
            _this.skinName = "resource/skins/MainCityGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["MainCityGiftItem"], null);
            _this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickItem, _this);
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_huodongguang_eff", "armatureName", null, 0).then(function (display) {
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(_this, "shenmishangdian_eff", "armatureName", null, 0).then(function (display) {
                _this.groupGift.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            return _this;
        }
        MainCityGiftItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.info = this.data.info;
            this.refresh = 0;
            if (zj.Game.UIManager.topScene() instanceof zj.MainCityUI && this.info["name"] == "doubleGift" && !zj.Teach.isDone(zj.teachBattle.teachPartID_GiftBag) && zj.Teach.isDone(zj.teachBattle.teachPartID_First_Charge)) {
                var ui = zj.Game.UIManager.topScene();
                if (ui instanceof zj.MainCityUI) {
                    if (ui.sceneUI.isGetVip() || !zj.Game.TeachSystem.isShowGetVip) {
                        this.showGift({ data: { curPart: zj.teachBattle.teachPartID_GiftBag } });
                    }
                }
            }
            else {
                if (this.info["name"] == "doubleGift" && !zj.Teach.isDone(zj.teachBattle.teachPartID_GiftBag) && zj.Teach.isDone(zj.teachBattle.teachPartID_First_Charge)) {
                    zj.Game.EventManager.off(zj.GameEvent.START_NEW_TEACHING, this.showGift, this);
                    zj.Game.EventManager.on(zj.GameEvent.START_NEW_TEACHING, this.showGift, this);
                }
            }
            this.setInfo();
        };
        MainCityGiftItem.prototype.showGift = function (e) {
            var _this = this;
            if (e.data.curPart == zj.teachBattle.teachPartID_GiftBag) {
                zj.Game.TeachSystem.curPart == zj.teachBattle.teachPartID_GiftBag;
                zj.Teach.teachingNow = true;
                zj.Game.EventManager.off(zj.GameEvent.START_NEW_TEACHING, this.showGift, this);
                zj.loadUI(zj.GiftTimeUC)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    var giftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                        return v.index == _this.info["index"];
                    })[0];
                    scene.setInfo(true, giftInfo, _this.data.father);
                    scene.setCB2(function () { _this.data.father.setInfoGiftList(); });
                });
                zj.Teach.removeMask();
                zj.Teach.SaveTeachPart(null, zj.teachBattle.teachPartID_GiftBag);
                zj.Teach.SaveTeachPartLocal(zj.teachBattle.teachPartID_GiftBag);
                zj.Teach.EndCurPart(false);
            }
        };
        MainCityGiftItem.prototype.setInfo = function () {
            var _this = this;
            this.groupGift.visible = false;
            this.imgIcon.visible = true;
            if (this.info["name"] == "secretMall") {
                this.imgIcon.visible = false;
                this.imgTip.visible = false;
                this.groupGift.visible = true;
            }
            else if (this.info["name"] == "seven") {
                this.imgIcon.source = zj.cachekey("ui_mainui_ButtonMainPreterentailNor_png", this);
                this.lbTime.visible = false;
                this.imgBoard.visible = false;
            }
            else if (this.info["name"] == "doubleGift") {
                var giftInfo = zj.PlayerGiftSystem.Instance_index(this.info["cityIndex"]);
                this.imgIcon.source = zj.cachekey(giftInfo.pic, this);
            }
            else if (this.info["name"] == "pushingGift") {
                var giftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.index == _this.info["index"];
                })[0];
                if (giftInfo.gift_index == 1100001) {
                    this.imgIcon.source = zj.cachekey("ui_mall_icon_button_chengkabutton_png", this);
                }
                else if (giftInfo.gift_index == 1100002) {
                    this.imgIcon.source = zj.cachekey("ui_mall_icon_button_hongkabutton_png", this);
                }
                else {
                    var paths = ["ui_mall_icon_button_xianshibutton_png", "ui_mall_icon_button_chaozhibutton_png"];
                    var picIndex = 1 - this.index % 2;
                    this.imgIcon.source = zj.cachekey(paths[picIndex], this);
                    this.lbTime.visible = false;
                    this.imgBoard.visible = false;
                }
            }
            else if (this.info["name"] == "monthGift") {
                var newGiftInfo = zj.PlayerGiftSystem.Instance_newGiftIndex(this.info["refrence"]);
                this.imgIcon.source = zj.cachekey(newGiftInfo.pic, this);
            }
            else if (this.info["name"] == "otherGift") {
                var giftTbl = zj.PlayerGiftSystem.Instance_item(this.info["giftId"]);
                this.imgIcon.source = zj.cachekey(giftTbl.city_path, this);
                this.lbTime.visible = false;
                this.imgBoard.visible = false;
            }
            this.update();
        };
        MainCityGiftItem.prototype.update = function () {
            var _this = this;
            if (this.info["name"] == "secretMall") {
                var activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                    return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
                })[0];
                if (activityInfo == null) {
                    return;
                }
                // 开启时间
                var lastTime = activityInfo.closeTime - zj.Game.Controller.curServerTime;
                var show = (lastTime <= 3600 * 24 * this.TIMESHOW && lastTime > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;
                var strEnd = zj.PlayerGiftSystem.upToTime3(lastTime);
                this.lbTime.textFlow = zj.Util.RichText(strEnd);
            }
            else if (this.info["name"] == "seven") {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SEVEN, zj.Tips.TAG.SEVEN_Gift);
                this.imgTip.visible = (zj.Tips.GetTipsOfId(zj.Tips.TAG.SEVEN, zj.Tips.TAG.SEVEN_Reward) || zj.Tips.GetTipsOfId(zj.Tips.TAG.SEVEN, zj.Tips.TAG.SEVEN_Gift));
            }
            else if (this.info["name"] == "monthGift") {
                var refrenceTbl = zj.PlayerGiftSystem.AllGiftByRefrence(this.info["refrence"]);
                if (refrenceTbl[0] == null) {
                    this.imgBoard.visible = false;
                    this.lbTime.visible = false;
                }
                var _a = [refrenceTbl[0].open_time, refrenceTbl[0].duration], openTime = _a[0], durantion = _a[1];
                var currentMonthDays = function () {
                    var cur = zj.Game.Controller.serverNow();
                    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    var year = cur.getFullYear();
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        days[1] = 29;
                    }
                    return days[cur.getMonth()];
                };
                var current = zj.Game.Controller.serverNow();
                var currentDays = currentMonthDays();
                var currentDaysSecconds = currentDays * 86400;
                var lastTime = 0;
                if (openTime + durantion >= currentDaysSecconds) {
                    lastTime = currentDaysSecconds - current.getDate() * 86400 - current.getHours() * 3600 - current.getMinutes() * 60 - current.getSeconds();
                }
                else {
                    lastTime = openTime + durantion - (current.getDate() - 1) * 86400 - current.getHours() * 3600 - current.getMinutes() * 60 - current.getSeconds();
                }
                var show = (lastTime <= 3600 * 24 * this.TIMESHOW && lastTime > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;
                var strEnd = zj.PlayerGiftSystem.upToTime3(lastTime);
                this.lbTime.textFlow = zj.Util.RichText(strEnd);
            }
            else if (this.info["name"] == "doubleGift" || this.info["name"] == "pushingGift" || this.info["name"] == "otherGift") {
                if (this.info["end_time"] == 0) {
                    return;
                }
                var strEnd = zj.PlayerGiftSystem.upToTime3(Number(this.info["end_time"]) - zj.Game.Controller.curServerTime);
                this.lbTime.textFlow = zj.Util.RichText(strEnd);
                var show = ((Number(this.info["end_time"]) - zj.Game.Controller.curServerTime) <= 3600 * 24 * this.TIMESHOW && (Number(this.info["end_time"]) - zj.Game.Controller.curServerTime) > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;
                if (this.refresh == 0 && this.info["end_time"] != 0 && Number(this.info["end_time"]) <= zj.Game.Controller.curServerTime) {
                    this.refresh = 1;
                    zj.Game.PlayerGiftSystem.getNewGift().then(function (gameInfo) {
                        if (gameInfo.giftInfos.length > 0) {
                            _this.data.father.setInfoGiftList();
                        }
                    });
                }
            }
        };
        MainCityGiftItem.prototype.onClickItem = function () {
            var _this = this;
            if (this.info["name"] == "secretMall") {
                // HXH_PublicGift
                // 神秘商店
                zj.loadUI(zj.PublicGift)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                });
            }
            else if (this.info["name"] == "seven") {
                // Activity_HappySeven
                // 七日奖
                zj.loadUI(zj.ActivityHappySeven)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    // scene.init();
                });
            }
            else if (this.info["name"] == "doubleGift") {
                // HXH_GiftTimeUC
                // 新手礼包
                zj.loadUI(zj.GiftTimeUC)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    var giftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                        return v.index == _this.info["index"];
                    })[0];
                    scene.setInfo(true, giftInfo, _this.data.father);
                    scene.setCB2(function () { _this.data.father.setInfoGiftList(); });
                });
            }
            else if (this.info["name"] == "pushingGift") {
                // HXH_NewPushingGift
                zj.loadUI(zj.HXH_NewPushingGift)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.SetInfo(_this.info.index, function () { _this.data.father.setInfoGiftList(); });
                });
            }
            else if (this.info["name"] == "monthGift") {
                // HXH_GiftMonthList
                var index_1 = this.info.refrence;
                zj.loadUI(zj.HXH_GiftMonthList)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.SetInfo(index_1, function () { _this.data.father.setInfoGiftList(); });
                });
            }
            else if (this.info["name"] == "otherGift") {
                if (this.info["giftId"] == this.SelectTransferId) {
                    // Activity_Main
                    zj.loadUI(zj.ActivityMain)
                        .then(function (scene) {
                        scene.init(18);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (this.info["giftId"] == this.JingXi1 || this.info["giftId"] == this.JingXi2) {
                    // Activity_TimeGiftFirstPopM
                    // 惊喜包
                    zj.loadUI(zj.Activity_TimeGiftFirstPopM)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.setInfo(_this.info["index"], function () { _this.data.father.setInfoGiftList(); });
                    });
                }
                else if (this.info["giftId"] == this.FirstQuality) {
                    // Activity_TimeGiftFirstPopN
                    // 人偶礼包
                    zj.loadUI(zj.Activity_TimeGiftFirstPopN)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.setInfo(_this.info["index"], function () { _this.data.father.setInfoGiftList(); });
                    });
                }
                else if (this.info["giftId"] == this.EveryQuality) {
                    // Activity_TimeGiftFirstPopL
                    // 高级觉醒礼包
                    zj.loadUI(zj.Activity_TimeGiftFirstPopL)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.setInfo(_this.info["index"], function () { _this.data.father.setInfoGiftList(); });
                    });
                }
            }
        };
        return MainCityGiftItem;
    }(eui.ItemRenderer));
    zj.MainCityGiftItem = MainCityGiftItem;
    __reflect(MainCityGiftItem.prototype, "zj.MainCityGiftItem");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityGiftItem.js.map