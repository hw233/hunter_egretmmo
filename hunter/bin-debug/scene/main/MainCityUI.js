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
    // 改版主城容器
    // 翟伟利
    // 2019.11.7
    var MainCityUI = (function (_super) {
        __extends(MainCityUI, _super);
        function MainCityUI() {
            var _this = _super.call(this) || this;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            return _this;
        }
        MainCityUI.prototype.onStageResize = function () {
            if (this.sceneUI) {
                this.sceneUI.width = zj.UIManager.StageWidth;
                this.sceneUI.height = zj.UIManager.StageHeight;
            }
        };
        MainCityUI.prototype.setMap = function (sceneMap) {
            this.sceneMap = sceneMap;
            this.addChildAt(this.sceneMap, 0);
            this.temporaryScene = zj.StageSceneManager.Instance.gettemporaryScene;
        };
        MainCityUI.prototype.setUI = function (sceneUI) {
            this.sceneUI = sceneUI;
            sceneUI.width = zj.UIManager.StageWidth;
            sceneUI.height = zj.UIManager.StageHeight;
            sceneUI.setOwnerScene(this);
            this.addChild(this.sceneUI);
        };
        MainCityUI.prototype.onWalkStart = function () {
            this.sceneMap.onWalkStart();
        };
        MainCityUI.prototype.onWalkEnd = function () {
            this.sceneMap.onWalkEnd();
        };
        // 场景进入栈顶
        MainCityUI.prototype.onEntryTopScene = function () {
            if (this.sceneMap && this.sceneUI) {
                if (this.sceneMap) {
                    this.sceneMap.onEntryTopScene();
                }
                if (this.sceneUI) {
                    this.sceneUI.onEntryTopDialog();
                }
            }
            else {
                _super.prototype.close.call(this);
            }
        };
        // 场景离开栈顶
        MainCityUI.prototype.onLeaveTopScene = function () {
            if (this.sceneMap) {
                this.sceneMap.onLeaveTopScene();
            }
            if (this.sceneUI) {
                this.sceneUI.onLeaveTopDialog();
            }
        };
        /**
         * 开门进入副本
         */
        MainCityUI.prototype.EnterAdventure = function () {
            zj.Game.PlayerWonderLandSystem.WonderlandLeave().then(function () {
                zj.StageSceneManager.Instance.GetCurScene().delMember(zj.Game.PlayerInfoSystem.BaseInfo.id);
                zj.StageSceneManager.Instance.clearScene();
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                zj.SceneManager.instance.EnterAdventure();
            }).catch(function () {
            });
        };
        MainCityUI.prototype.show = function (animation) {
            _super.prototype.show.call(this);
            zj.SceneManager.instance.callbackMainCity();
        };
        // 关闭场景
        MainCityUI.prototype.close = function (animation) {
            // super.close();
            var isTop = zj.Game.UIManager.topScene() == this;
            if (isTop) {
                _super.prototype.close.call(this);
                zj.Game.UIManager.removeScene(this.temporaryScene);
            }
            else {
                var sceneName = egret.getQualifiedClassName(this);
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
                zj.Game.UIManager.removeScene(this);
                zj.Game.EventManager.event(zj.GameEvent.CLOSE_SCENE, { typeName: sceneName });
                zj.Game.UIManager.removeScene(this.temporaryScene);
            }
            if (this.sceneUI) {
                if (this.sceneUI.parent) {
                    this.removeChild(this.sceneUI);
                }
                this.sceneUI = null;
            }
            if (this.sceneMap) {
                this.sceneMap.release();
                if (this.sceneMap.parent) {
                    this.removeChild(this.sceneMap);
                }
                this.sceneMap = null;
            }
        };
        return MainCityUI;
    }(zj.Scene));
    zj.MainCityUI = MainCityUI;
    __reflect(MainCityUI.prototype, "zj.MainCityUI");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityUI.js.map