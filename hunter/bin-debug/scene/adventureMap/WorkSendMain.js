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
     * @class 工作派遣
     *
     * @author LianLei
     *
     * @date 2019-11-08
     */
    var WorkSendMain = (function (_super) {
        __extends(WorkSendMain, _super);
        function WorkSendMain() {
            var _this = _super.call(this) || this;
            _this.workInfo = [];
            _this.listWorkData = new eui.ArrayCollection();
            _this.infoArr = []; // 只有没领取或者没开始的任务
            _this.timer = new egret.Timer(1000, 0);
            _this.workNum = 0;
            _this.canGetArr = [];
            _this.indexArr = []; // 开始的任务id
            _this.skinName = "resource/skins/adventureMap/WorkSendMainSkin.exml";
            _this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFresh, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.update, _this);
            _this.timer.start();
            zj.Game.EventManager.on(zj.GameEvent.RERESH_WORKLOCK_STATE, _this.freshLockState, _this);
            zj.Game.EventManager.on(zj.GameEvent.WORK_END_REFRESH, _this.reFreshWork, _this);
            zj.Game.EventManager.on(zj.GameEvent.WORK_SEND_START, _this.startWork, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.updateRes, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.updateRes, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateRes, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_VIPLEVEL_CHANGE, _this.reFreshWork, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LICENCELEVEL_CHANGE, _this.reFreshWork, _this);
            _this.init();
            return _this;
        }
        WorkSendMain.prototype.init = function () {
            this.workInfo = [];
            this.workNum = zj.CommonConfig.init_search_count + zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.VipLevel).search_count + zj.TableLicence.Item(zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel).search_count;
            for (var i = 0; i < zj.Game.PlayerInstanceSystem.InstanceInfo.searchInfo.length; i++) {
                if (zj.Game.PlayerInstanceSystem.InstanceInfo.searchInfo[i].order_id <= this.workNum)
                    this.workInfo.push(zj.Game.PlayerInstanceSystem.InstanceInfo.searchInfo[i]);
            }
            this.workInfo.sort(function (a, b) { return b.index - a.index; });
            this.infoArr = []; // 没开始和没有领取的任务
            for (var i = 0; i < this.workInfo.length; i++) {
                if (!this.workInfo[i].is_reward)
                    this.infoArr.push(this.workInfo[i]);
            }
            this.indexArr = []; // 已开始的任务Id
            for (var i = 0; i < this.infoArr.length; i++) {
                var time = zj.Game.Controller.curServerTime - this.infoArr[i].start_time;
                var remainTime = this.infoArr[i].time - time;
                if (this.infoArr[i].start_time != 0 && !this.infoArr[i].is_reward && remainTime > 0)
                    this.indexArr.push(this.infoArr[i].id);
            }
            this.canGetArr = [];
            for (var i = 0; i < this.workInfo.length; i++) {
                if (this.workInfo[i].start_time == 0)
                    continue;
                var time = zj.Game.Controller.curServerTime - this.workInfo[i].start_time;
                var remainTime = this.workInfo[i].time - time;
                if (!this.workInfo[i].is_reward && remainTime <= 0) {
                    this.canGetArr.push(this.workInfo[i]);
                }
            }
            this.arrSort();
            this.setInfoList();
            this.setUI();
            this.updateRes();
        };
        WorkSendMain.prototype.arrSort = function () {
            var self = this;
            var startArr = []; // 已经开始的任务信息
            for (var i = 0; i < this.indexArr.length; i++) {
                for (var j = 0; j < this.infoArr.length; j++) {
                    if (this.indexArr[i] == this.infoArr[j].id) {
                        startArr.push(this.infoArr[j]);
                        break;
                    }
                }
            }
            this.infoArr = this.infoArr.filter(function (v) { return !(startArr.indexOf(v) > -1); }).concat(startArr.filter(function (v) { return !(self.infoArr.indexOf(v) > -1); })); // 求补集
            this.infoArr = this.infoArr.filter(function (v) { return !(self.canGetArr.indexOf(v) > -1); }).concat(self.canGetArr.filter(function (v) { return !(self.infoArr.indexOf(v) > -1); })); // 求补集
            for (var i = 0; i < startArr.length; i++) {
                if (this.infoArr.indexOf(startArr[i]) == -1 && this.canGetArr.indexOf(startArr[i]) == -1)
                    this.infoArr.push(startArr[i]);
            }
            for (var i = 0; i < this.canGetArr.length; i++) {
                if (this.infoArr.indexOf(this.canGetArr[i]) == -1)
                    this.infoArr.push(this.canGetArr[i]);
            }
        };
        WorkSendMain.prototype.update = function () {
            for (var i = 0; i < this.indexArr.length; i++) {
                for (var j = 0; j < this.infoArr.length; j++) {
                    if (this.indexArr[i] == this.infoArr[j].id) {
                        this.listWorkData.replaceItemAt(this.listWorkData.source[j], j);
                        var time = zj.Game.Controller.curServerTime - this.infoArr[j].start_time;
                        var remainTime = this.infoArr[j].time - time - 1;
                        if (remainTime <= 0) {
                            this.indexArr.splice(i, 1);
                            if (this.canGetArr.indexOf(this.infoArr[j]) == -1)
                                this.canGetArr.push(this.infoArr[j]);
                            this.init();
                        }
                        break;
                    }
                }
            }
        };
        WorkSendMain.prototype.startWork = function (ev) {
            var self = this;
            zj.Game.PlayerInstanceSystem.LockSearchingReq(ev.data, true).then(function (value) {
                if (self.indexArr.indexOf(ev.data.index) == -1)
                    self.indexArr.push(ev.data);
                self.init();
            });
        };
        WorkSendMain.prototype.setInfoList = function () {
            this.listWorkData.removeAll();
            for (var i = 0; i < this.infoArr.length; i++) {
                var itemData = new zj.WorkSendMainItemData();
                itemData.workInfo = this.infoArr[i];
                itemData.index = i;
                itemData.islock = this.infoArr[i].is_lock;
                this.listWorkData.addItem(itemData);
            }
            this.listWork.dataProvider = this.listWorkData;
            this.listWork.itemRenderer = zj.WorkSendMainItem;
        };
        WorkSendMain.prototype.setUI = function () {
            var remainWorkNum = 0; // 剩余任务数量
            var refreshNum = 0;
            for (var i = 0; i < this.workInfo.length; i++) {
                if (this.workInfo[i].start_time == 0 && !this.workInfo[i].is_reward)
                    remainWorkNum++;
                if (this.workInfo[i].start_time == 0 && this.workInfo[i].is_lock == false && !this.workInfo[i].is_reward)
                    refreshNum++;
            }
            this.labelWorkNum.text = remainWorkNum + "/" + this.workNum;
            var finishCount = 0;
            for (var i = 0; i < this.workInfo.length; i++) {
                if (this.workInfo[i].is_reward == true)
                    finishCount++;
            }
            this.labelEnd.visible = finishCount == this.workInfo.length;
            this.groupFresh.visible = !(remainWorkNum == 0);
            this.labelRefreshNum.text = (10 * refreshNum).toString();
        };
        WorkSendMain.prototype.reFreshWork = function () {
            this.init();
        };
        WorkSendMain.prototype.onBtnFresh = function () {
            var self = this;
            var arr = [];
            for (var i = 0; i < this.infoArr.length; i++) {
                if (this.infoArr[i].is_lock || this.infoArr[i].start_time != 0)
                    continue;
                arr.push(this.infoArr[i].id);
            }
            if (arr.length == 0) {
                zj.toast_warning("无可刷新任务！");
                return;
            }
            zj.Game.PlayerInstanceSystem.RefreshSearchingReq(arr).then(function (value) {
                self.reFreshWork();
            });
        };
        WorkSendMain.prototype.freshLockState = function (ev) {
            var self = this;
            zj.Game.PlayerInstanceSystem.LockSearchingReq(ev.data.id, ev.data.islock).then(function (value) {
                self.reFreshWork();
                var data = self.listWorkData.getItemAt(ev.data.index);
                self.listWorkData.replaceItemAt(data, ev.data.index);
            });
        };
        WorkSendMain.prototype.onBtnClose = function () {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.update, this);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        WorkSendMain.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        WorkSendMain.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        WorkSendMain.prototype.updateRes = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.lbStrength.text = str_energy;
        };
        WorkSendMain.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog).then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        WorkSendMain.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene).then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        WorkSendMain.prototype.onBtnAddStrength = function () {
            zj.loadUI(zj.HXH_HunterUserStrength).then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return WorkSendMain;
    }(zj.Scene));
    zj.WorkSendMain = WorkSendMain;
    __reflect(WorkSendMain.prototype, "zj.WorkSendMain");
})(zj || (zj = {}));
//# sourceMappingURL=WorkSendMain.js.map