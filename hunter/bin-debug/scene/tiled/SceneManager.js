var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * tiledMap 管理类
     * zhaiweili
     * 2019.10.24
     */
    var SceneManager = (function () {
        function SceneManager() {
            this.openMainCityCallback = [];
        }
        SceneManager.uninit = function () {
            SceneManager.initType = 0;
        };
        // 只有第一次进入城镇，loading与加载用同一个
        SceneManager.prototype.EnterMainCityLogin = function () {
            var scene = zj.Game.UIManager.topScene();
            zj.Game.UIManager.popAllUIs();
            zj.MapSceneLoading.getInstance().loadFightResLoading(SceneManager.cityMapId, function () {
                zj.StageSceneManager.Instance.ChangeSceneLoading(zj.StageSceneMainCity);
            }, this);
            scene.show();
            SceneManager.loginLoadingScene = scene;
        };
        // 进入城镇，单独的加载机制（重新创建场景）
        SceneManager.prototype.EnterMainCityNew = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            zj.MapSceneLoading.getInstance().loadFightRes(SceneManager.cityMapId, function () {
                zj.StageSceneManager.Instance.ChangeSceneLoading(zj.StageSceneMainCity);
                if (callback) {
                    _this.openMainCityCallback.push(callback);
                }
            }, this);
        };
        // 进入城镇后回调
        SceneManager.prototype.callbackMainCity = function () {
            while (this.openMainCityCallback.length > 0) {
                var callback = this.openMainCityCallback.shift();
                callback.call(null);
            }
        };
        // 主城断网后，重新进入主城
        SceneManager.prototype.ReEnterMainCityNew = function () {
            zj.Game.UIManager.popAllUIs();
            this.EnterMainCityNew();
        };
        // 处理服务器返回错误消息时的逻辑
        SceneManager.prototype.dealCodeError = function (code) {
            if (code == 10300) {
                SceneManager.instance.ReEnterMainCityNew();
            }
        };
        // 返回主城，用于有多个UI界面的时候
        SceneManager.prototype.EnterMainCityBack = function () {
            var uimanager = zj.Game.UIManager;
            uimanager.popAllDialogs(); // 清除所有dialog
            while (uimanager.sceneCount() > 0) {
                if (this.isMainCityScene()) {
                    return;
                }
                else {
                    if (uimanager.sceneCount() == 1) {
                        uimanager.popScene();
                        return;
                    }
                    uimanager.popScene();
                }
            }
        };
        // 检测战斗场景结束后，是否有其他场景，如果没有，则创建主场景
        SceneManager.prototype.checkFightOver = function () {
            var scene = zj.Game.UIManager.topScene();
            if (!scene) {
                this.EnterMainCityNew();
            }
        };
        /**
         * 进入副本 openType: 打开类型(在弹出UI时打开dialog),
         * 默认0-只打开地图,
         * 1-打开当前最高普通副本列表，
         * 2-打开当前最高挑战副本列表,
         * -1-打开openArea副本(普通)，
         * -2-打开openArea副本（挑战）
         */
        SceneManager.prototype.EnterAdventure = function (openType, openArea) {
            if (openType === void 0) { openType = 0; }
            if (openArea === void 0) { openArea = -1; }
            var topScene = zj.Game.UIManager.topScene();
            if (topScene instanceof zj.SceneMapTiledAdventureUI) {
                if (openType != 0) {
                    topScene.setOpenType(openType, openArea);
                    topScene.checkOpenType();
                }
            }
            else {
                zj.Game.EventManager.event(zj.GameEvent.OPEN_LOGING_SCENE);
                zj.loadUI(zj.SceneMapTiledAdventureUI, true)
                    .then(function (scene) {
                    zj.Game.EventManager.event(zj.GameEvent.LOGING_SCENE_PROGRESS, 1);
                    scene.onInit();
                    scene.setOpenType(openType, openArea);
                    scene.onLoadMap();
                });
            }
        };
        /**
         * 顶层UI是否为主城
         */
        SceneManager.prototype.isMainCityScene = function (ui) {
            if (ui === void 0) { ui = null; }
            if (!ui) {
                ui = zj.Game.UIManager.topScene();
            }
            // egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.MainCityScene"
            return ui instanceof zj.MainCityUI;
        };
        /**
         * 顶层UI是否为副本
         */
        SceneManager.prototype.isAdventureScene = function (ui) {
            if (ui === void 0) { ui = null; }
            if (!ui) {
                ui = zj.Game.UIManager.topScene();
            }
            return ui instanceof zj.SceneMapTiledAdventureUI;
        };
        /**
         * 进入世界大平原界面
         */
        SceneManager.prototype.EnterSceneZorkBoss = function () {
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, true)) {
                this.info = zj.TableWonderland.Item(3);
                this.SetFormatReqOnly();
                return true;
            }
            return false;
        };
        SceneManager.prototype.SetFormatReqOnly = function () {
            var req = new message.SetFormationRequest();
            var formation = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
            req.body.formations.push(formation);
            zj.Game.Controller.send(req, this.SetFormatOnly_Visit, null, this, false);
        };
        SceneManager.prototype.SetFormatOnly_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.WonderlandEnterReq();
        };
        SceneManager.prototype.WonderlandEnterReq = function () {
            var req = new message.WonderlandEnterRequest();
            // req.body.id = this.info.wonderland_id;
            req.body.id = SceneManager.teachId || this.info.wonderland_id;
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, this.WonderlandEnter_Visit, null, this, false);
        };
        SceneManager.prototype.WonderlandEnter_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
            zj.Game.PlayerWonderLandSystem.mapBlockIndex = this.info.block_index;
            zj.Game.PlayerWonderLandSystem.wonderlandId = SceneManager.teachId || this.info.wonderland_id;
            SceneManager.teachId = null;
            var MapId = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).map_id;
            zj.MapSceneLoading.getInstance().loadFightRes(MapId, this.wonderland, this);
            zj.Teach.addTeaching();
        };
        SceneManager.prototype.wonderland = function () {
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneWonderland);
        };
        SceneManager.loginLoadingScene = null;
        SceneManager.adventureOpenMax = 16; // 最大开启到16章，第17章不开放
        SceneManager.cityMapId = 98; // 主场景地图编号(唯一)
        SceneManager.mapIdAdventure = 99; // 副本场景地图编号(唯一)
        SceneManager.adventureClassStr = "zj.SceneMapTiledAdventureUI"; // 副本类名
        SceneManager.mainCityClassStr = "zj.MainCityUI"; // 主城类名
        SceneManager.instance = new SceneManager();
        SceneManager.scenePosInfo = null;
        return SceneManager;
    }());
    zj.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "zj.SceneManager");
    var TILEDMAP_KEY = (function () {
        function TILEDMAP_KEY() {
        }
        TILEDMAP_KEY.block = "block"; // 碰撞层
        TILEDMAP_KEY.objects = "objects"; // 对象层
        TILEDMAP_KEY.order = "order"; // 单位元素层
        TILEDMAP_KEY.cloud = "cloud"; // 云层
        TILEDMAP_KEY.born = "born"; // 出生点
        TILEDMAP_KEY.surface = "surface";
        // public static decorate: string = "decorate";
        TILEDMAP_KEY.box = "box"; // 出生点类型
        TILEDMAP_KEY.npc = "npc"; // NPC类型
        return TILEDMAP_KEY;
    }());
    zj.TILEDMAP_KEY = TILEDMAP_KEY;
    __reflect(TILEDMAP_KEY.prototype, "zj.TILEDMAP_KEY");
    var LAYER_TYPE;
    (function (LAYER_TYPE) {
        LAYER_TYPE[LAYER_TYPE["surface"] = 0] = "surface";
        LAYER_TYPE[LAYER_TYPE["unit"] = 1] = "unit";
        LAYER_TYPE[LAYER_TYPE["top"] = 2] = "top";
        LAYER_TYPE[LAYER_TYPE["sky"] = 3] = "sky";
        LAYER_TYPE[LAYER_TYPE["max"] = 4] = "max";
    })(LAYER_TYPE = zj.LAYER_TYPE || (zj.LAYER_TYPE = {}));
})(zj || (zj = {}));
//# sourceMappingURL=SceneManager.js.map