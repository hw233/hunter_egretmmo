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
     * @class 通行证主界面任务UI
     *
     * @author LianLei
     *
     * @date 2019-11-19
     */
    var HXH_BattlePassMission = (function (_super) {
        __extends(HXH_BattlePassMission, _super);
        function HXH_BattlePassMission() {
            var _this = _super.call(this) || this;
            _this.listMissionData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassMissionSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.closeUI, _this);
            zj.Game.EventManager.on(zj.GameEvent.UPDATE_BATTLEPASS_MISSION, _this.SetInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_PERMITLEVEL_CHANGE, _this.SetInfo, _this);
            return _this;
        }
        HXH_BattlePassMission.prototype.SetInfo = function (ev) {
            this.scrollerMission.stopAnimation();
            this.scrollerMission.viewport.scrollV = 0;
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
                this.imgTipPass.source = zj.cachekey(zj.UIConfig.UIConfig_BattlePass.lowPass, this);
            }
            else {
                this.imgTipPass.source = zj.cachekey(zj.UIConfig.UIConfig_BattlePass.highPass, this);
            }
            this.labelLv.text = ev.data == null ? zj.Game.PlayerInfoSystem.BaseInfo.permitLevel.toString() : ev.data.toString();
            var tblInfo;
            var type;
            switch (zj.HXH_BattlePass.missionIndex) {
                case 1:
                    tblInfo = zj.TablePermitMission.Table();
                    type = 1;
                    this.labelRefresh.text = "每天四点刷新";
                    break;
                case 2:
                    tblInfo = zj.Game.PlayerMissionSystem.GetBattlePassWeekMission();
                    type = 2;
                    this.labelRefresh.text = "每周一四点刷新";
                    break;
                case 3:
                    tblInfo = zj.Game.PlayerMissionSystem.GetBattlePassMonthMission();
                    type = 3;
                    this.labelRefresh.text = "每月一号四点刷新";
                    break;
            }
            this.listMissionData.removeAll();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tblInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                var itemData = new zj.HXH_BattlePassMissionItemData();
                itemData.id = Number(k);
                itemData.info = v;
                itemData.type = type;
                this.listMissionData.addItem(itemData);
            }
            this.listMission.dataProvider = this.listMissionData;
            this.listMission.itemRenderer = zj.HXH_BattlePassMissionItem;
        };
        HXH_BattlePassMission.prototype.closeUI = function () {
            this.close();
        };
        return HXH_BattlePassMission;
    }(zj.UI));
    zj.HXH_BattlePassMission = HXH_BattlePassMission;
    __reflect(HXH_BattlePassMission.prototype, "zj.HXH_BattlePassMission");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassMission.js.map