namespace zj {
    // Game实例类
    // guoshanhe
    // 2018.11.5

    export class Game {
        // 基础支撑模块
        public static EventManager = new EventManager();
        public static ConfigManager = new ConfigManager();
        public static SoundManager = new SoundManager();
        public static LanguageManager = new LanguageManager();
        public static UIManager = new UIManager();
        public static DragonBonesManager = new DragonBonesManager();
        // public static DragonBonesResManager = new DragonBonesResManager();
        public static DragonBonesDataManager = new DragonBonesDataManager();
        public static AnimationManager = new AnimationManager();
        public static ParticleManager = new ParticleManager();
        // 各个system
        public static PlayerInfoSystem = new PlayerInfoSystem();
        public static PlayerItemSystem = new PlayerItemSystem();
        public static PlayerHunterSystem = new PlayerHunterSystem();
        public static PlayerCardSystem = new PlayerCardSystem();
        public static PlayerFormationSystem = new PlayerFormationSystem();
        public static PlayerGiftSystem = new PlayerGiftSystem();
        public static PlayerVIPSystem = new PlayerVIPSystem();
        public static PlayerHunterHistorySystem = new PlayerHunterHistorySystem();
        public static PlayerInstanceSystem = new PlayerInstanceSystem();
        public static PlayerLeagueSystem = new PlayerLeagueSystem();
        public static PlayerSkillSystem = new PlayerSkillSystem();
        public static PlayerTalentSystem = new PlayerTalentSystem();
        public static PlayerProgressesSystem = new PlayerProgressesSystem();
        public static PlayerMixUnitInfoSystem = new PlayerMixUnitInfoSystem();
        public static PlayerMissionSystem = new PlayerMissionSystem();
        public static PlayerWantedSystem = new PlayerWantedSystem();
        public static PlayerAdviserSystem = new PlayerAdviserSystem();
        public static PlayerArenaSystem = new PlayerArenaSystem();
        public static PlayerStageSystem = new PlayerStageSystem();
        public static PlayerMobSystem = new PlayerMobSystem();
        public static PlayerBattleSystem = new PlayerBattleSystem();
        public static PlayerTowerSystem = new PlayerTowerSystem();
        public static PlayerZorkSystem = new PlayerZorkSystem();
        public static PlayerFashionSystem = new PlayerFashionSystem();
        public static PlayerRelateSystem = new PlayerRelateSystem();
        public static PlayerSignSystem = new PlayerSignSystem();
        public static PlayerActivitySystem = new PlayerActivitySystem();
        public static PlayerLogingSystem = new PlayerLogingSystem();
        public static PlayerBuffSystem = new PlayerBuffSystem();
        public static TeachSystem = new TeachSystem();
        public static PlayerPaySystem = new PlayerPaySystem();
        public static PlayerMailSystem = new PlayerMailSystem();
        public static PlayerWonderLandSystem = new PlayerWonderLandSystem();
        public static PlayerUserSystem = new PlayerUserSystem();
        public static PlayerDoubleBallSystem = new PlayerDoubleBallSystem();
        public static PlayerChatDataSystem = new PlayerChatDataSystem();
        public static PlayerDarkSystem = new PlayerDarkSystem();
        public static PlayerBossSystem = new PlayerBossSystem();

        public static Controller = new Controller();
        public static AnnouceManger = new AnnouceManger();
        public static ObjectPool = new ObjectPool();
        public static RESGroupManager = new RESGroupManager();

        private static _isInitOK = false;

        public static IsInitOK() {
            return Game._isInitOK;
        }

        public static async init() {
            Game.EventManager.on(GameEvent.TABLE_CONFIG_LOAD_OK, () => {
                if(Game._isInitOK){
                    return;
                }
                console.log("Game receive event TABLE_CONFIG_LOAD_OK");
                Game.PlayerInfoSystem.init();
                Game.PlayerItemSystem.init();
                Game.PlayerHunterSystem.init();
                Game.PlayerCardSystem.init();
                Game.PlayerFormationSystem.init();
                Game.PlayerGiftSystem.init();
                Game.PlayerVIPSystem.init();
                Game.PlayerHunterHistorySystem.init();
                Game.PlayerInstanceSystem.init();
                Game.PlayerLeagueSystem.init();
                Game.PlayerSkillSystem.init();
                Game.PlayerTalentSystem.init();
                Game.PlayerProgressesSystem.init();
                Game.PlayerMixUnitInfoSystem.init();
                Game.PlayerMissionSystem.init();
                Game.PlayerWantedSystem.init();
                Game.PlayerAdviserSystem.init();
                Game.PlayerArenaSystem.init();
                Game.PlayerBattleSystem.init();
                Game.PlayerTowerSystem.init();
                Game.PlayerZorkSystem.init();
                Game.PlayerFashionSystem.init();
                Game.PlayerRelateSystem.init();
                Game.PlayerSignSystem.init();
                Game.PlayerActivitySystem.init();
                Game.PlayerLogingSystem.init();
                Game.PlayerBuffSystem.init();
                Game.PlayerMailSystem.init();
                Game.PlayerWonderLandSystem.init();
                Game.PlayerUserSystem.init();
                Game.PlayerChatDataSystem.init();
                Game.PlayerDoubleBallSystem.init();
                Game.PlayerPaySystem.init();
                console.log("PlayerPaySystem init ok");
                Game.AnnouceManger.init();
                Game.RESGroupManager.init();
                PushNotice.init();
                console.log("game init ok");
                Game._isInitOK = true;
            }, this);

            console.log("Game init start");
            await Game.ConfigManager.init();
            await UIResource_init();
            console.log("ConfigManager init ok");
            Game.UIManager.init();
            console.log("UIManager init ok");
            Game.SoundManager.init();
            console.log("SoundManager init ok");
            Game.LanguageManager.init();
            console.log("LanguageManager init ok");
            dragonBones.BaseObject.setMaxCount(null, 0);
            Tips.Init();
            console.log("Tips init ok");

            await Game.Controller.init();
        }

        // 清除数据（用于换账号重新登录等功能）
        public static uninit() {
            Game.Controller.uninit();

            // 各系统
            Tips.UnInit();
            Game.PlayerInfoSystem.uninit();
            Game.PlayerItemSystem.uninit();
            Game.PlayerHunterSystem.uninit();
            Game.PlayerCardSystem.uninit();
            Game.PlayerFormationSystem.uninit();//阵型保存初始化
            Game.PlayerGiftSystem.uninit();
            Game.PlayerVIPSystem.uninit();
            Game.PlayerHunterHistorySystem.uninit();
            Game.PlayerInstanceSystem.uninit();
            Game.PlayerLeagueSystem.uninit();
            Game.PlayerSkillSystem.uninit();
            Game.PlayerTalentSystem.uninit();
            Game.PlayerProgressesSystem.uninit();
            Game.PlayerMixUnitInfoSystem.uninit();
            Game.PlayerMissionSystem.uninit();
            Game.PlayerWantedSystem.uninit();
            Game.PlayerAdviserSystem.uninit();
            Game.PlayerArenaSystem.uninit();
            Game.PlayerBattleSystem.uninit();
            Game.PlayerTowerSystem.uninit();
            Game.PlayerZorkSystem.uninit();
            Game.PlayerFashionSystem.uninit();
            Game.PlayerRelateSystem.uninit();
            Game.PlayerSignSystem.uninit();
            Game.PlayerActivitySystem.uninit();
            Game.PlayerLogingSystem.uninit();
            Game.PlayerBuffSystem.uninit();
            Game.PlayerMailSystem.uninit();
            Game.PlayerWonderLandSystem.uninit();
            Game.TeachSystem.uninit();
            Game.PlayerPaySystem.uninit();
            Game.PlayerChatDataSystem.uninit();
            Game.PlayerStageSystem.unInit();
            Game.RESGroupManager.unInit();
            Game.PlayerBossSystem.uninit();
            SceneManager.uninit();
        }
    }
}