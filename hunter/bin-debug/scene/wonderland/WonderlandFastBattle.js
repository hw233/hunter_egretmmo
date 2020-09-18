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
     * @author xingliwei
     *
     * @date 2019-5-20
     *
     * @class 贪婪之岛战报
     */
    var WonderlandFastBattle = (function (_super) {
        __extends(WonderlandFastBattle, _super);
        function WonderlandFastBattle() {
            var _this = _super.call(this) || this;
            _this.Type = 0;
            _this.resultList = [];
            _this.skinName = "resource/skins/wonderland/WonderlandFastBattleSkin.exml";
            _this.init();
            var fastBattleSwitch = zj.Device.GetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch);
            if (fastBattleSwitch == null) {
                zj.Device.fastBattleSwitch = false;
            }
            else {
                zj.Device.fastBattleSwitch = fastBattleSwitch;
            }
            _this.btnTurn.addEventListener(eui.UIEvent.CHANGE, _this.onBtnTurn, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        WonderlandFastBattle.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.loadinfo, this);
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND) {
                this.Type = message.ESceneType.SCENE_TYPE_WONDERLAND;
                this.resultList = zj.Game.PlayerWonderLandSystem.resultList;
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND) {
                this.Type = message.ESceneType.SCENE_TYPE_WONDERLAND;
                this.resultList = zj.Game.PlayerWonderLandSystem.resultList;
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_LEAGUE_FIGHT) {
                // this.Type = message.ESceneType.SCENE_TYPE_LEAGUE_WAR
                this.resultList = zj.Game.PlayerWonderLandSystem.resultList;
            }
            this.InitList();
            this.SetButtonTurn();
        };
        WonderlandFastBattle.prototype.loadinfo = function (ev) {
            this.picId = ev.data;
        };
        WonderlandFastBattle.prototype.InitList = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.resultList.length; i++) {
                var data = new zj.WonderlandFastBattleItemData();
                data.index = i;
                data.info = this.resultList[i];
                array.addItem(data);
            }
            this.listTable.dataProvider = array;
            this.listTable.itemRenderer = zj.WonderlandFastBattleItem;
        };
        WonderlandFastBattle.prototype.onBtnTurn = function (e) {
            var btn = e.target;
            zj.Device.fastBattleSwitch = !zj.Device.fastBattleSwitch;
            zj.Device.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch, zj.Device.fastBattleSwitch);
        };
        WonderlandFastBattle.prototype.SetButtonTurn = function () {
            this.btnTurn.selected = !zj.Device.GetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch);
            var selected = zj.Device.GetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch);
            if (selected == null) {
                zj.Device.fastBattleSwitch = false;
            }
            else {
                zj.Device.fastBattleSwitch = selected;
            }
        };
        WonderlandFastBattle.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return WonderlandFastBattle;
    }(zj.Dialog));
    zj.WonderlandFastBattle = WonderlandFastBattle;
    __reflect(WonderlandFastBattle.prototype, "zj.WonderlandFastBattle");
})(zj || (zj = {}));
//# sourceMappingURL=WonderlandFastBattle.js.map