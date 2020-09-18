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
     * 主线任务弹窗
     * created by Lian Lei
     * 2019.03.20
     */
    var HXH_GrowUp = (function (_super) {
        __extends(HXH_GrowUp, _super);
        function HXH_GrowUp() {
            var _this = _super.call(this) || this;
            _this.listViewAttachData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/daily/HXH_GrowUpSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            _this.setInfo();
            return _this;
        }
        /**
         * 任务数据 任务表
         */
        HXH_GrowUp.prototype.setInfo = function () {
            this.mission = zj.Game.PlayerMissionSystem.listForTask();
            this.mTable = zj.Game.PlayerMissionSystem.itemMain(this.mission.missionId);
            var mIndex = zj.Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);
            zj.Device.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.main_mission_first, false);
            this.setTitle(this.mTable.name);
            var tb = zj.Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
            this.setState(tb);
            this.setDes(this.mTable.description);
            this.setReward(this.mTable.reward_goods);
        };
        /**标题 */
        HXH_GrowUp.prototype.setTitle = function (str) {
            this.labelMission.text = str;
        };
        /**状态 */
        HXH_GrowUp.prototype.setState = function (tb) {
            var finish = tb.finish;
            this.imgGet.visible = finish;
            this.btnGo.visible = finish;
            this.btnGo.visible = !finish;
            var str = "(" + tb.isDo + "/" + tb.toDo + ")";
            if (finish) {
                str = zj.TextsConfig.TextsConfig_Mission.completed;
                zj.Device.SetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.main_mission_over_view, this.mission.missionId);
            }
            this.labelState.text = str;
        };
        /**描述 */
        HXH_GrowUp.prototype.setDes = function (str) {
            this.labelDes.text = str;
        };
        /**奖励 */
        HXH_GrowUp.prototype.setReward = function (rewards) {
            var goods = [];
            for (var i = 0; i < rewards.length; i++) {
                goods.push([]);
            }
            for (var i = 0; i < rewards.length; i++) {
                var v = rewards[i];
                if (goods.length == 1) {
                    goods[i].push(v[0], v[1]);
                }
                else {
                    for (var j = 0; j < rewards[i].length; j++) {
                        goods[i].push(v[j]);
                    }
                }
            }
            this.listViewAttachData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.Mail_AttachItemData();
                itemData.goodsId = goods[i][0];
                itemData.count = goods[i][1];
                this.listViewAttachData.addItem(itemData);
            }
            this.listViewAttach.dataProvider = this.listViewAttachData;
            this.listViewAttach.itemRenderer = zj.Mail_AttachItem;
        };
        /**领取奖励 */
        HXH_GrowUp.prototype.onBtnGet = function () {
            var _this = this;
            this.btnGet.enabled = false;
            zj.Game.PlayerMissionSystem.ReqReward(this.mission.type, this.mission.subType)
                .then(function (value) {
                _this.close(zj.UI.HIDE_TRAIL_OFF);
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(value.body.gameInfo.getGoods);
                    dialog.setCB(function () {
                        zj.loadUI(HXH_GrowUp)
                            .then(function (dialogB) {
                            dialogB.show(zj.UI.SHOW_FILL_OUT);
                        });
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) {
                zj.toast_warning(reason);
            });
            zj.Game.EventManager.event(zj.GameEvent.REFRESH_MAINCITY_BUBBLE);
        };
        /**跳转 */
        HXH_GrowUp.prototype.onBtnGo = function () {
            this.btnGo.enabled = false;
            this.close(zj.UI.HIDE_TRAIL_OFF);
            if (this.mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES) {
                zj.Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)(this.mTable.condition);
            }
            else {
                zj.Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)();
            }
        };
        HXH_GrowUp.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.REFRESH_MAINCITY_BUBBLE);
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        return HXH_GrowUp;
    }(zj.Dialog));
    zj.HXH_GrowUp = HXH_GrowUp;
    __reflect(HXH_GrowUp.prototype, "zj.HXH_GrowUp");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GrowUp.js.map