var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var StageSceneManager = (function () {
        function StageSceneManager() {
            this.curStage = null; // 当前场景
        }
        Object.defineProperty(StageSceneManager, "Instance", {
            get: function () {
                if (StageSceneManager._instance == null) {
                    StageSceneManager._instance = new StageSceneManager();
                    zj.Gmgr.Instance.InitInfo();
                }
                return StageSceneManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        StageSceneManager.prototype.ChangeScene = function (scene, changeCB, thisObj) {
            console.log("\n\nChangeScene: " + scene.prototype.__class__ + "\n\n");
            this.resetFight();
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_LOGING_SCENE);
            this.curStage = scene; //TestScene
            this.ChangeSceneSync();
            zj.Game.PlayerInfoSystem.playAnnouce = false; //关闭滚屏
        };
        // 不关闭loading界面
        StageSceneManager.prototype.ChangeSceneLoading = function (scene, changeCB, thisObj) {
            this.resetFight();
            // Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
            this.curStage = scene; //TestScene
            this.ChangeSceneSync();
            zj.Game.PlayerInfoSystem.playAnnouce = false; //关闭滚屏
        };
        Object.defineProperty(StageSceneManager.prototype, "gettemporaryScene", {
            get: function () {
                return this.temporaryScene;
            },
            enumerable: true,
            configurable: true
        });
        StageSceneManager.prototype.ChangeSceneSync = function () {
            // if (window['AoneSDKPlatform'] && (platform instanceof window['AoneSDKPlatform'])) {
            //     UIManager.Stage.frameRate = 30;
            //     console.log("AoneSDKPlatform set frameRate is 30");
            // }
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB){
            //     UIManager.Stage.frameRate = 30;
            //     console.log("Web set frameRate is 30");
            // }
            // ConstantConfig_RoleBattle.DEFAULTFPS = UIManager.Stage.frameRate;
            this.curStage = zj.newUI(this.curStage);
            this.curStage.show();
            for (var i = 0; i < 100; i++) {
                this.loadingCB(i);
            }
            this.transCB();
        };
        StageSceneManager.prototype.newTemporaryScene = function () {
            this.temporaryScene = zj.newUI(zj.TemporaryScene);
            this.temporaryScene.show();
        };
        StageSceneManager.prototype.GetCurScene = function () {
            return this.curStage;
        };
        StageSceneManager.prototype.loadingCB = function (percent) {
            if (this.curStage != null) {
                this.curStage.OnLoading(percent);
            }
        };
        StageSceneManager.prototype.transCB = function () {
            this.curStage.Init();
            this.curStage._isLoading = false;
        };
        StageSceneManager.prototype.resetFight = function () {
            zj.Gmgr.Instance.bPause = false;
            if (this.curStage) {
                this.curStage.OnExit();
                this.curStage.close();
                this.curStage = null;
                // Game.ObjectPool.destoryPool();
                zj.dragonBonesPool.getInstance().destoryPool();
                // Game.PlayerBattleSystem.uninit();
            }
        };
        //清楚战斗场景以及战斗所有东西
        StageSceneManager.prototype.clearScene = function () {
            zj.Gmgr.Instance.bPause = false;
            if (this.curStage) {
                var isMainCity = this.curStage.isMainCity;
                // UIManager.Stage.frameRate = UIManager.InitFrameRate;
                zj.Gmgr.Instance.setLayerId(zj.TableEnum.TableEnumLayerId.LAYER_NONE);
                zj.Game.PlayerBattleSystem.setFightState();
                // Game.SoundManager.playMusic("city_mp3", 0);
                this.curStage.OnExit();
                this.curStage.close();
                this.curStage = null;
                zj.Game.ObjectPool.destoryPool();
                zj.dragonBonesPool.getInstance().destoryPool();
                if (!isMainCity) {
                    zj.Game.PlayerBattleSystem.uninit();
                }
                if (this.temporaryScene) {
                    this.temporaryScene.close();
                    this.temporaryScene = null;
                }
                this.clear();
            }
            zj.Game.PlayerInfoSystem.playAnnouce = true; //打开滚屏
        };
        StageSceneManager.prototype.clear = function () {
            zj.Util.destroyRes(zj.FightLoading.getInstance().groupNameImage, false);
            // RES.destroyRes("BattleEnd_Win", false);
            // RES.destroyRes("CommonFormatePveMain", false);
            // RES.destroyRes("Fight_RoleMsg", false);
            if ('wx' in window && 'triggerGC' in window['wx'])
                window['wx']['triggerGC']();
            // for(let i = 0;i<Game.DragonBonesManager.dragonBonesName.length;i++){
            //     RES.destroyRes(Game.DragonBonesManager.dragonBonesName[i]);
            // }
            // Game.DragonBonesManager.dragonBonesName.length = 0;
            // dragonBones.BaseObject.clearPool();
        };
        return StageSceneManager;
    }());
    zj.StageSceneManager = StageSceneManager;
    __reflect(StageSceneManager.prototype, "zj.StageSceneManager");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneManger.js.map