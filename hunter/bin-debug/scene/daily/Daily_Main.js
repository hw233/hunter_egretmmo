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
    var INDEX;
    (function (INDEX) {
        /**日常 */
        INDEX[INDEX["LIVE"] = 0] = "LIVE";
        /**成就 */
        INDEX[INDEX["Main"] = 1] = "Main";
        /**主线 */
        INDEX[INDEX["Task"] = 2] = "Task";
    })(INDEX || (INDEX = {}));
    /**
     * 日常主界面
     * created by Lian lei
     * 2019.03.12
     */
    var Daily_Main = (function (_super) {
        __extends(Daily_Main, _super);
        function Daily_Main() {
            var _this = _super.call(this) || this;
            _this.buttons = [];
            _this.imgTipsArr = [];
            // private timer: egret.Timer = new egret.Timer(1000, 0);
            _this.missionType = null;
            _this.saveWeek = null; // 服务器星期几
            _this.ACTIVE_COUNT = 5; // 活跃度(5段)
            _this.mission = [];
            _this.listViewLiveData = new eui.ArrayCollection();
            ////////////////////Task ///////////////////////
            ///////////////////Achieve//////////////////////
            _this.listViewAchieveData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/daily/Daily_MainSkin.exml";
            /////////////////////////common////////////////////////////
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnTagLive.name = "" + INDEX.LIVE;
            _this.btnTagTask.name = "" + INDEX.Task;
            _this.btnTagAchieve.name = "" + INDEX.Main;
            _this.btnTagLive.touchEnabled = _this.btnTagTask.touchEnabled = _this.btnTagAchieve.touchEnabled = true;
            _this.btnTagLive.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRadio, _this);
            _this.btnTagTask.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRadio, _this);
            _this.btnTagAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRadio, _this);
            // this.btnTagLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagLive, this);
            // this.btnTagTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagTask, this);
            // this.btnTagAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagAchieve, this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            _this.timer = egret.setInterval(_this.update, _this, 1000);
            //////////////////////////Daily_Live//////////////////////////
            _this.groupLight1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet1, _this);
            _this.groupLight2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet2, _this);
            _this.groupLight3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet3, _this);
            _this.groupLight4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet4, _this);
            _this.groupLight5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet5, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.timer);
            }, _this);
            _this.init();
            return _this;
            // this._JumpByInstance = this.isInstanceMain();
            // this.groupCache1.cacheAsBitmap = true;
            // this.groupCache2.cacheAsBitmap = true;
        }
        Daily_Main.prototype.hideBackGround = function () {
            this.imageBackground.visible = false;
        };
        Daily_Main.prototype.isFullScreen = function () {
            return this.imageBackground.visible;
        };
        Daily_Main.prototype.isInstanceMain = function (isInstanceMain) {
            if (isInstanceMain == null) {
                this._JumpByInstance = isInstanceMain;
                return false;
            }
            this._JumpByInstance = isInstanceMain;
            return isInstanceMain;
        };
        Daily_Main.prototype.init = function () {
            this.buttons.push(this.btnTagLive, this.btnTagAchieve, this.btnTagTask);
            this.imgTipsArr.push(this.imgNode1, this.imgNode2, this.imgNode3);
            this.setInfoType(INDEX.LIVE);
            // this.setSelectType();
            if (true) {
                this.btnTagTask.visible = false;
                this.imgNode2.visible = false;
            }
            if (this.missionType == INDEX.LIVE) {
                this.mission = [];
                var tbl = zj.TableMissionActive.Table();
                for (var i = 1; i <= this.ACTIVE_COUNT; i++) {
                    this["labelTag" + i].text = tbl[i].score.toString();
                    this["imgBag" + i].source = zj.cachekey(tbl[i].path, this);
                    this["imgGet" + i].visible = false;
                }
                this.imgDone.visible = false;
            }
            else if (this.missionType == INDEX.Main) {
                this.mission = [];
            }
            else if (this.missionType == INDEX.Task) {
            }
            this.update();
        };
        ////////////////////////////////Daily_Main///////////////////////////////////////////
        Daily_Main.prototype.initUI = function (index) {
            if (index == INDEX.LIVE) {
                this.groupLive.visible = true;
                this.groupTask.visible = false;
                this.groupAchieve.visible = false;
            }
            else if (index == INDEX.Main) {
                this.groupLive.visible = false;
                this.groupTask.visible = false;
                this.groupAchieve.visible = true;
            }
            else if (index == INDEX.Task) {
                this.groupTask.visible = true;
                this.groupLive.visible = false;
                this.groupAchieve.visible = false;
            }
        };
        Daily_Main.prototype.update = function () {
            this.setInfoTips();
            this.setInfoUpdate();
        };
        Daily_Main.prototype.setInfoTips = function () {
            var bTips11 = zj.Tips.GetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_GIFT);
            var bTips12 = zj.Tips.GetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_ACTIVE);
            this.imgNode1.visible = bTips11 || bTips12;
            var bTips2 = zj.Tips.GetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_ACHIEVE);
            var bTips3 = zj.Tips.GetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_ACHIEVE);
            this.imgNode3.visible = bTips3;
        };
        Daily_Main.prototype.setInfoUpdate = function () {
            var _this = this;
            if (this.saveWeek == null && this.saveWeek != zj.Game.PlayerMissionSystem.curServerWeek) {
                zj.Game.PlayerMissionSystem.ReqMission()
                    .then(function (value) {
                    _this.setInfo();
                })
                    .catch(function (reason) {
                    zj.toast_warning(zj.Helper.GetErrorString(reason));
                });
            }
            this.saveWeek = zj.Game.PlayerMissionSystem.curServerWeek;
        };
        Daily_Main.prototype.setInfoType = function (index) {
            this.missionType = index;
            this.setSelectType();
            this.setSelectInfo();
            // Teach.addTeaching();
        };
        Daily_Main.prototype.setSelectType = function () {
            for (var i = 0; i < this.buttons.length; i++) {
                var btn = this.buttons[i];
                btn.source = i == this.missionType ? "ui_license_ButtonHunterStarOpneSel_png" : "ui_license_ButtonHunterStarOpneNor_png";
            }
            // for (let i = 0; i < this.buttons.length; i++) {
            // 	let btn: eui.Button = this.buttons[i];
            // 	btn.enabled = (i != this.missionType);
            // }
            // for (let i = 0; i < this.buttons.length; i++) {
            // 	this.buttons[i].selected = i == this.missionType;
            // }
        };
        Daily_Main.prototype.setSelectInfo = function () {
            this.initUI(this.missionType);
            // v.setSelect(i == this.missionType);
            // this.setSelect(this.missionType);
        };
        ////////////////////////Daily_Live  Daily_Task  Daily_Achieve//////////////////////////
        Daily_Main.prototype.setInfo = function () {
            if (this.missionType == INDEX.LIVE) {
                this.setInfoActive();
                this.setInfoMission();
                this.setInfoComplete();
                this.groupViewGirl.visible = true;
            }
            else if (this.missionType == INDEX.Main) {
                this.setInfoMission();
                this.groupViewGirl.visible = false;
            }
            else if (this.missionType == INDEX.Task) {
            }
        };
        Daily_Main.prototype.setInfoActive = function () {
            var _this = this;
            var score = zj.Game.PlayerMissionSystem.missionActive.activeScore;
            var index = zj.Game.PlayerMissionSystem.missionActive.activeIndex;
            var tbl = zj.TableMissionActive.Table();
            var count = zj.Table.tableLength(tbl);
            var max = tbl[count].score;
            var percent = zj.yuan3(score > max, 1, score / max);
            this.labelCount.text = zj.TextsConfig.TextsConfig_Daily.has + score + "/" + max;
            if (611 * score / max < 611) {
                this.imgBar.width = 611 * score / max;
            }
            else {
                this.imgBar.width = 611;
            }
            for (var i = 0; i < index.length; i++) {
                var v = index[i];
                this["imgGet" + v].visible = true;
            }
            var _loop_1 = function (i) {
                var v = i + 1;
                if (percent * count >= v) {
                    if (!this_1["imgGet" + v].visible && this_1["groupLight" + v].numChildren == 0) {
                        zj.Game.DragonBonesManager.playAnimation(this_1, "ui_tongyong_lingqu", "armatureName", null, 0)
                            .then(function (display) {
                            display.x = _this["groupLight" + v].explicitWidth / 2 + 5;
                            display.y = _this["groupLight" + v].explicitHeight / 2 + 20;
                            _this["groupLight" + v].addChild(display);
                            display.scaleX = 1;
                            display.scaleY = 1;
                        })
                            .catch(function (reason) {
                            zj.toast(reason);
                        });
                    }
                    else if (this_1["imgGet" + v].visible && this_1["groupLight" + v].numChildren > 0) {
                        this_1["groupLight" + v].visible = false;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.ACTIVE_COUNT; i++) {
                _loop_1(i);
            }
        };
        Daily_Main.prototype.setInfoMission = function (index) {
            if (index != null) {
                this.missionType = index;
            }
            if (this.missionType == INDEX.LIVE) {
                this.mission = zj.Game.PlayerMissionSystem.listForLive();
                this.listViewLiveData.removeAll();
                for (var i = 0; i < this.mission.length; i++) {
                    var itemData = new zj.Daily_LiveItemData();
                    itemData.index = this.mission[i];
                    itemData.missionType = this.missionType;
                    itemData._JumpByInstance = this._JumpByInstance;
                    itemData.father = this;
                    this.listViewLiveData.addItem(itemData);
                }
                this.listViewLive.dataProvider = this.listViewLiveData;
                this.listViewLive.itemRenderer = zj.Daily_LiveItem;
            }
            else if (this.missionType == INDEX.Main) {
                this.mission = zj.Game.PlayerMissionSystem.listForAchieve();
                this.listViewAchieveData.removeAll();
                for (var i = 0; i < this.mission.length; i++) {
                    var itemData = new zj.Daily_AchieveItemData();
                    itemData.indexId = Number(this.mission[i]);
                    itemData.father = this;
                    this.listViewAchieveData.addItem(itemData);
                }
                this.listViewAchieve.dataProvider = this.listViewAchieveData;
                this.listViewAchieve.itemRenderer = zj.Daily_AchieveItem;
            }
            else if (this.missionType == INDEX.Task) {
            }
        };
        /**活跃度满后播放龙骨 */
        Daily_Main.prototype.setInfoComplete = function () {
            var _this = this;
            var ani = this.groupViewGirl.getChildByName("npc_bisiji");
            if (zj.Game.PlayerMissionSystem.tableLength(this.mission) == 0) {
                zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", "armatureName", null, 0)
                    .then(function (display) {
                    // display.x = this.groupViewGirl.x;
                    // display.y = this.groupViewGirl.y + this.groupViewGirl.height;
                    display.x = 0;
                    display.y = _this.groupViewGirl.explicitHeight;
                    display.name = "npc_bisiji";
                    if (ani == null) {
                        _this.groupViewGirl.addChild(display);
                    }
                    display.scaleX = 0.7;
                    display.scaleY = 0.7;
                    display.touchEnabled = false;
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
                this.imgDone.visible = true;
            }
        };
        Daily_Main.prototype.onBtnGet1 = function () {
            this.onBtnGet(1);
        };
        Daily_Main.prototype.onBtnGet2 = function () {
            this.onBtnGet(2);
        };
        Daily_Main.prototype.onBtnGet3 = function () {
            this.onBtnGet(3);
        };
        Daily_Main.prototype.onBtnGet4 = function () {
            this.onBtnGet(4);
        };
        Daily_Main.prototype.onBtnGet5 = function () {
            this.onBtnGet(5);
        };
        Daily_Main.prototype.onBtnGet = function (index) {
            var score = zj.Game.PlayerMissionSystem.missionActive.activeScore;
            var tbl = zj.TableMissionActive.Table();
            var newThis = this;
            var bGet = zj.Table.FindF(zj.Game.PlayerMissionSystem.missionActive.activeIndex, function (key, val) {
                return val == index;
            });
            if (score < tbl[index].score || (score >= tbl[index].score && bGet)) {
                zj.loadUI(zj.Daily_AwardPop)
                    .then(function (dialog) {
                    dialog.setInfoActive(index);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (score >= tbl[index].score && !bGet) {
                this.indexSend = index;
                zj.Game.PlayerMissionSystem.ReqActive(index)
                    .then(function (value) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(value.body.gameInfo.getGoods);
                        dialog.setCB(function () {
                            newThis.setInfoActive();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                })
                    .catch(function (reason) {
                    zj.toast_warning(zj.Helper.GetErrorString(reason));
                });
            }
        };
        /**第二天刷新 */
        Daily_Main.prototype.ReqNextDay = function () {
            var _this = this;
            zj.Game.PlayerMissionSystem.ReqMission()
                .then(function (value) {
                _this.setInfo();
            })
                .catch(function (reason) {
                zj.toast_warning(zj.Helper.GetErrorString(reason));
            });
        };
        /////////////////////////////////Common////////////////////////////////////////
        Daily_Main.prototype.onBtnRadio = function (e) {
            var type = parseInt(e.currentTarget.name);
            this.setInfoType(type);
            this.setInfo();
        };
        // private onBtnTagLive() {
        // 	this.setInfoType(INDEX.LIVE);
        // 	this.setInfo();
        // }
        // private onBtnTagAchieve() {
        // 	this.setInfoType(INDEX.Main);
        // 	this.setInfo();
        // }
        // private onBtnTagTask() {
        // 	this.setInfoType(INDEX.Task);
        // 	this.setInfo();
        // }
        Daily_Main.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
            if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.HXH_BattlePass")
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
        };
        Daily_Main.prototype.onRemoveDialog = function () {
            var dialog = this.groupAddDialog.getChildByName("award");
            if (dialog)
                this.groupAddDialog.removeChild(dialog);
        };
        return Daily_Main;
    }(zj.Dialog));
    zj.Daily_Main = Daily_Main;
    __reflect(Daily_Main.prototype, "zj.Daily_Main");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_Main.js.map