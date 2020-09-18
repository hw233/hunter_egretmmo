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
     * 副本界面-关卡跑图ui
     * zhaiweili
     * 2019.11.7
     */
    var SceneMapAreaUI = (function (_super) {
        __extends(SceneMapAreaUI, _super);
        function SceneMapAreaUI() {
            return _super.call(this) || this;
        }
        /**
         * 为dialog添加UI皮肤(UI皮肤在tiledMap地图上层)
         */
        SceneMapAreaUI.prototype.onSkinName = function () {
            this.skinName = "resource/skins/adventure/AdventureMapRunSkin.exml";
        };
        SceneMapAreaUI.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchClose, this);
        };
        SceneMapAreaUI.prototype.onLoadMap = function () {
            // let curMobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
            // Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID = this.curMobInfo.mobId;
            // Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curChapterID = Game.PlayerInstanceSystem.Chapter(this.curMobInfo.mobId).chapter_id;
            // Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curAreaID = this.father.getZoneIndex();
            // Game.PlayerInstanceSystem.MobsInfo_Req(this.instanceId)
            // 	.then((value: {}) => {
            // 		Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            // 		this.id = this.instanceId;
            // 		Game.PlayerFormationSystem.blowGuide = this.instanceId;
            // 		loadUI(CommonFormatePveMain)
            // 			.then((dialog: CommonFormatePveMain) => {
            // 				dialog.show(UI.SHOW_FROM_TOP);
            // 				dialog.setInfo(this.id);
            // 			});
            // 	})
            // 	.catch((reason) => {
            // 		// toast(Helper.GetErrorString(reason));
            // 	});
            // let instanceId = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
            var mobID = this.currData.area_normal[0];
            var chapterId = zj.TableChapterNormal.Table()[mobID].chapter_pack[0];
            var mapId = zj.TableInstance.Table()[chapterId].battle_bg;
            this.sceneMap = zj.newUI(zj.SceneMapNodeBase);
            this.sceneMap.init(this, mapId);
            this.addChildAt(this.sceneMap, 0);
        };
        SceneMapAreaUI.prototype.setData = function (data) {
            this.currData = data;
        };
        SceneMapAreaUI.prototype.OnTouchClose = function () {
            this.close();
        };
        return SceneMapAreaUI;
    }(zj.SceneMapUIBase));
    zj.SceneMapAreaUI = SceneMapAreaUI;
    __reflect(SceneMapAreaUI.prototype, "zj.SceneMapAreaUI");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapAreaUI.js.map