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
    var WORK_QUALITY = (_a = {},
        _a[1] = ["ui_instance_search_IconWrodsCard1_png", "ui_instance_search_board_renwu_1_png"],
        _a[2] = ["ui_instance_search_IconWrodsCard1_png", "ui_instance_search_board_renwu_1_png"],
        _a[3] = ["ui_instance_search_IconWrodsCard2_png", "ui_instance_search_board_renwu_2_png"],
        _a[4] = ["ui_instance_search_IconWrodsCard2_png", "ui_instance_search_board_renwu_2_png"],
        _a[5] = ["ui_instance_search_IconWrodsCard3_png", "ui_instance_search_board_renwu_3_png"],
        _a[6] = ["ui_instance_search_IconWrodsCard3_png", "ui_instance_search_board_renwu_3_png"],
        _a[7] = ["ui_instance_search_IconWrodsCard4_png", "ui_instance_search_board_renwu_4_png"],
        _a[8] = ["ui_instance_search_IconWrodsCard4_png", "ui_instance_search_board_renwu_4_png"],
        _a[9] = ["ui_instance_search_IconWrodsCard5_png", "ui_instance_search_board_renwu_5_png"],
        _a[10] = ["ui_instance_search_IconWrodsCard5_png", "ui_instance_search_board_renwu_5_png"] // 红
    ,
        _a);
    /**
     * @class 工作派遣Item
     *
     * @author LianLei
     *
     * @date 2019-11-08
     */
    var WorkSendMainItem = (function (_super) {
        __extends(WorkSendMainItem, _super);
        function WorkSendMainItem() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.condition = {};
            _this.skinName = "resource/skins/adventureMap/WorkSendMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["WorkSendMainItem"], null);
            _this.btnLock.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLock, _this);
            _this.btnUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnLock, _this);
            _this.btnGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetAward, _this);
            _this.btnChooleHero.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChooleHero, _this);
            _this.btnSpeedFinish.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSpeedFinish, _this);
            return _this;
        }
        WorkSendMainItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        WorkSendMainItem.prototype.updateView = function (data) {
            if (data.workInfo == null)
                return;
            this.workInfo = data.workInfo;
            this.imgBoard.source = zj.cachekey(WORK_QUALITY[data.workInfo.index][1], this);
            this.imgQuality.source = zj.cachekey(WORK_QUALITY[data.workInfo.index][0], this);
            this.labelDes.text = zj.TableWorkSend.Item(data.workInfo.des_id).work_des;
            this.listAwardData.removeAll();
            for (var i = 0; i < data.workInfo.goodInfos.length; i++) {
                var itemData = new zj.WorkSendAwardItemData();
                itemData.goodsInfo = data.workInfo.goodInfos[i];
                this.listAwardData.addItem(itemData);
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.WorkSendAwardItem;
            this.btnGetAward.visible = false;
            this.btnLock.visible = !data.islock;
            this.btnUnlock.visible = data.islock;
            this.btnChooleHero.visible = true;
            this.groupSpeedFinish.visible = false;
            this.groupProgress.visible = false;
            this.setConditionPos();
            if (this.workInfo.start_time != 0)
                this.setWorkStartUI();
        };
        WorkSendMainItem.prototype.setWorkStartUI = function () {
            this.time = zj.Game.Controller.curServerTime - this.workInfo.start_time;
            this.remainTime = this.workInfo.time - this.time;
            var percent = (this.workInfo.time - this.remainTime) / this.workInfo.time;
            var num = zj.CommonConfig.speed_search_comsume_token(this.remainTime);
            this.labelCostJewel.text = num.toString();
            if (this.remainTime <= 0) {
                this.btnGetAward.visible = true;
                this.btnChooleHero.visible = false;
                this.groupSpeedFinish.visible = false;
                this.groupProgress.visible = true;
                this.imgProgressBar.width = 122;
                this.labelProgress.text = "完成";
            }
            else {
                if (this.remainTime > this.workInfo.time)
                    this.remainTime = this.workInfo.time;
                this.btnGetAward.visible = false;
                this.btnChooleHero.visible = false;
                this.groupSpeedFinish.visible = true;
                this.groupProgress.visible = true;
                this.imgProgressBar.width = 122 * percent;
                this.labelProgress.text = zj.Helper.GetTimeStr(this.remainTime, false);
            }
        };
        WorkSendMainItem.prototype.setConditionPos = function () {
            this.condition = {};
            for (var i_1 = 1; i_1 <= 4; i_1++)
                this["imgCondition" + i_1].visible = false;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.workInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (k == "general_aptitude" && v != 0)
                    this.condition["GENERAL_APTITUDE"] = v;
                if (k == "general_star" && v != 0)
                    this.condition["GENERAL_STAR"] = v;
                if (k == "general_type" && v.length != 0) {
                    for (var i_2 = 0; i_2 < v.length; i_2++)
                        this.condition["GENERAL_TYPE" + (i_2 + 1)] = v[i_2];
                }
            }
            var conditions = Object.keys(this.condition);
            var i = 1;
            for (var _c = 0, conditions_1 = conditions; _c < conditions_1.length; _c++) {
                var key = conditions_1[_c];
                this["imgCondition" + i].visible = true;
                this["imgCondition" + i].source = zj.cachekey(this.workInfo.start_time == 0 ? zj[key][this.condition[key]][0] : zj[key][this.condition[key]][1], this);
                i++;
            }
        };
        WorkSendMainItem.prototype.onBtnLock = function () {
            zj.Game.EventManager.event(zj.GameEvent.RERESH_WORKLOCK_STATE, { islock: true, id: this.workInfo.id, index: this.data.index });
            this.btnLock.visible = this.data.islock;
            this.btnUnlock.visible = !this.data.islock;
        };
        WorkSendMainItem.prototype.onBtnUnLock = function () {
            if (this.workInfo.start_time != 0) {
                zj.toast_warning("工作状态不可解锁！");
                return;
            }
            zj.Game.EventManager.event(zj.GameEvent.RERESH_WORKLOCK_STATE, { islock: false, id: this.workInfo.id, index: this.data.index });
            this.btnLock.visible = this.data.islock;
            this.btnUnlock.visible = !this.data.islock;
        };
        WorkSendMainItem.prototype.onBtnGetAward = function () {
            var self = this;
            zj.Game.PlayerInstanceSystem.RewardSearchingReq(this.workInfo.id).then(function (value) {
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.init(value.body.gameInfo.getGoods);
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.setCB(function () { zj.Game.EventManager.event(zj.GameEvent.WORK_END_REFRESH); });
                });
            });
        };
        WorkSendMainItem.prototype.onBtnChooleHero = function () {
            var _this = this;
            zj.loadUI(zj.WorkSend_SelectHero).then(function (dialog) {
                dialog.init(_this.data.workInfo, _this.itemIndex);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        WorkSendMainItem.prototype.onBtnSpeedFinish = function () {
            var self = this;
            zj.Game.PlayerInstanceSystem.SpeedSearchingReqBody(this.workInfo.id).then(function (value) {
                zj.Game.EventManager.event(zj.GameEvent.WORK_END_REFRESH);
            });
        };
        return WorkSendMainItem;
    }(eui.ItemRenderer));
    zj.WorkSendMainItem = WorkSendMainItem;
    __reflect(WorkSendMainItem.prototype, "zj.WorkSendMainItem");
    var WorkSendMainItemData = (function () {
        function WorkSendMainItemData() {
        }
        return WorkSendMainItemData;
    }());
    zj.WorkSendMainItemData = WorkSendMainItemData;
    __reflect(WorkSendMainItemData.prototype, "zj.WorkSendMainItemData");
    var _a;
})(zj || (zj = {}));
//# sourceMappingURL=WorkSendMainItem.js.map