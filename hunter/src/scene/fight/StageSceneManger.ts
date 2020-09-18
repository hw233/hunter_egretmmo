namespace zj {

    export class StageSceneManager {

        // 提供单例接口
        private static _instance: StageSceneManager;
        public static get Instance(): StageSceneManager {
            if (StageSceneManager._instance == null) {
                StageSceneManager._instance = new StageSceneManager();
                Gmgr.Instance.InitInfo();
            }
            return StageSceneManager._instance;
        }
        public curStage = null;     // 当前场景

        public temporaryScene;
        public ChangeScene(scene, changeCB?, thisObj?) {

            console.log("\n\nChangeScene: " + scene.prototype.__class__ + "\n\n");

            this.resetFight();
            Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
            this.curStage = scene;//TestScene
            this.ChangeSceneSync();
            Game.PlayerInfoSystem.playAnnouce = false;//关闭滚屏
        }
        // 不关闭loading界面
        public ChangeSceneLoading(scene, changeCB?, thisObj?) {
            this.resetFight();
            // Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
            this.curStage = scene;//TestScene
            this.ChangeSceneSync();
            Game.PlayerInfoSystem.playAnnouce = false;//关闭滚屏
        }
        public get gettemporaryScene() {
            return this.temporaryScene;
        }
        public ChangeSceneSync() {
            // if (window['AoneSDKPlatform'] && (platform instanceof window['AoneSDKPlatform'])) {
            //     UIManager.Stage.frameRate = 30;
            //     console.log("AoneSDKPlatform set frameRate is 30");
            // }
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB){
            //     UIManager.Stage.frameRate = 30;
            //     console.log("Web set frameRate is 30");
            // }
            // ConstantConfig_RoleBattle.DEFAULTFPS = UIManager.Stage.frameRate;
            this.curStage = newUI(this.curStage);
            this.curStage.show();
            for (let i = 0; i < 100; i++) {
                this.loadingCB(i);
            }
            this.transCB();
        }
        public newTemporaryScene() {
            this.temporaryScene = newUI(TemporaryScene);
            this.temporaryScene.show();
        }
        public GetCurScene(): any {
            return this.curStage;
        }
        public loadingCB(percent) {
            if (this.curStage != null) {
                this.curStage.OnLoading(percent);
            }
        }
        public transCB() {
            this.curStage.Init();
            this.curStage._isLoading = false;
        }
        public resetFight() {
            Gmgr.Instance.bPause = false;
            if (this.curStage) {
                this.curStage.OnExit();
                this.curStage.close();
                this.curStage = null;
                // Game.ObjectPool.destoryPool();
                dragonBonesPool.getInstance().destoryPool();
                // Game.PlayerBattleSystem.uninit();
            }
        }
        //清楚战斗场景以及战斗所有东西
        public clearScene() {
            Gmgr.Instance.bPause = false;
            if (this.curStage) {
                let isMainCity = this.curStage.isMainCity;
                // UIManager.Stage.frameRate = UIManager.InitFrameRate;
                Gmgr.Instance.setLayerId(TableEnum.TableEnumLayerId.LAYER_NONE);
                Game.PlayerBattleSystem.setFightState();
                // Game.SoundManager.playMusic("city_mp3", 0);
                this.curStage.OnExit();
                this.curStage.close();
                this.curStage = null;

                Game.ObjectPool.destoryPool();
                dragonBonesPool.getInstance().destoryPool();
                if (!isMainCity) {// 从主城跳到战斗场景，不能把战斗阵型清除
                    Game.PlayerBattleSystem.uninit();
                }
                if (this.temporaryScene) {
                    this.temporaryScene.close();
                    this.temporaryScene = null;
                }
                this.clear();
            }
            Game.PlayerInfoSystem.playAnnouce = true;//打开滚屏
        }
        public clear() {
            Util.destroyRes(FightLoading.getInstance().groupNameImage, false);
            // RES.destroyRes("BattleEnd_Win", false);
            // RES.destroyRes("CommonFormatePveMain", false);
            // RES.destroyRes("Fight_RoleMsg", false);
            if ('wx' in window && 'triggerGC' in window['wx']) window['wx']['triggerGC']();
            // for(let i = 0;i<Game.DragonBonesManager.dragonBonesName.length;i++){
            //     RES.destroyRes(Game.DragonBonesManager.dragonBonesName[i]);
            // }
            // Game.DragonBonesManager.dragonBonesName.length = 0;
            // dragonBones.BaseObject.clearPool();
        }
    }
}