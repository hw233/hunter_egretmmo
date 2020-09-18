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
     * @class 猎人故事副本结算
     *
     * @author LianLei
     *
     * @date 2019.07.31
     */
    var BattleEnd_WinStoryInstance = (function (_super) {
        __extends(BattleEnd_WinStoryInstance, _super);
        function BattleEnd_WinStoryInstance() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinStoryInstanceSkin.exml";
            _this.ui_name = "BattleEnd_WinStoryInstance";
            _this.bRankCome = false;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            return _this;
        }
        BattleEnd_WinStoryInstance.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        BattleEnd_WinStoryInstance.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.SetFormationInfos();
        };
        BattleEnd_WinStoryInstance.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateStory();
        };
        BattleEnd_WinStoryInstance.prototype.onButtonGoOn = function () {
            zj.StageSceneManager.Instance.clearScene();
            this.close();
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.StoryInstanceMainScene).then(function (scene) {
                    scene.Init();
                    scene.SelAndOpen();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        BattleEnd_WinStoryInstance.prototype.UpdateStory = function () {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_WinStoryInstance.prototype.FadeInGet = function () {
        };
        BattleEnd_WinStoryInstance.prototype.SetFormationInfos = function () {
            var getDes = zj.otherdb.ActivityBattleGetInstanceStarDes(zj.PlayerActivitySystem.activityBattleCurPos);
            for (var i = 1; i <= getDes.length; i++) {
                this["labelMission" + i].text = getDes[i - 1].toString();
            }
            var activityInfo = zj.otherdb.getActivityByTypeAndIndex(message.ActivityType.ACT_TYPE_INSTANCE_BATTLE, zj.Game.PlayerInstanceSystem.activityBattleIndex);
            var curStarInfo = zj.otherdb.ActivityBattleGetCurStarById(activityInfo, zj.PlayerActivitySystem.activityBattleCurPos);
            for (var i = 1; i <= 3; i++) {
                if (zj.Table.FindK(curStarInfo, i) == -1) {
                    this["imgMission" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryCheckPath[2], this);
                    this["labelMission" + i].textColor = zj.Helper.RGBToHex("r:170,g:170,b:170");
                }
                else {
                    this["imgMission" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryCheckPath[1], this);
                    this["labelMission" + i].textColor = zj.Helper.RGBToHex("r:0,g:249,b:0");
                }
            }
            this.LabelInstanceName.text = zj.TableActivityBattleInstance.Item(zj.PlayerActivitySystem.activityBattleCurPos).name;
        };
        return BattleEnd_WinStoryInstance;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinStoryInstance = BattleEnd_WinStoryInstance;
    __reflect(BattleEnd_WinStoryInstance.prototype, "zj.BattleEnd_WinStoryInstance");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinStoryInstance.js.map