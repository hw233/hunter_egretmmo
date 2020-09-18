var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var zj;
(function (zj) {
    // Game实例类
    // guoshanhe
    // 2018.11.5
    var Game = (function () {
        function Game() {
        }
        Game.IsInitOK = function () {
            return Game._isInitOK;
        };
        Game.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Game.EventManager.on(zj.GameEvent.TABLE_CONFIG_LOAD_OK, function () {
                                if (Game._isInitOK) {
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
                                zj.PushNotice.init();
                                console.log("game init ok");
                                Game._isInitOK = true;
                            }, this);
                            console.log("Game init start");
                            return [4 /*yield*/, Game.ConfigManager.init()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, zj.UIResource_init()];
                        case 2:
                            _a.sent();
                            console.log("ConfigManager init ok");
                            Game.UIManager.init();
                            console.log("UIManager init ok");
                            Game.SoundManager.init();
                            console.log("SoundManager init ok");
                            Game.LanguageManager.init();
                            console.log("LanguageManager init ok");
                            dragonBones.BaseObject.setMaxCount(null, 0);
                            zj.Tips.Init();
                            console.log("Tips init ok");
                            return [4 /*yield*/, Game.Controller.init()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // 清除数据（用于换账号重新登录等功能）
        Game.uninit = function () {
            Game.Controller.uninit();
            // 各系统
            zj.Tips.UnInit();
            Game.PlayerInfoSystem.uninit();
            Game.PlayerItemSystem.uninit();
            Game.PlayerHunterSystem.uninit();
            Game.PlayerCardSystem.uninit();
            Game.PlayerFormationSystem.uninit(); //阵型保存初始化
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
            zj.SceneManager.uninit();
        };
        // 基础支撑模块
        Game.EventManager = new zj.EventManager();
        Game.ConfigManager = new zj.ConfigManager();
        Game.SoundManager = new zj.SoundManager();
        Game.LanguageManager = new zj.LanguageManager();
        Game.UIManager = new zj.UIManager();
        Game.DragonBonesManager = new zj.DragonBonesManager();
        // public static DragonBonesResManager = new DragonBonesResManager();
        Game.DragonBonesDataManager = new zj.DragonBonesDataManager();
        Game.AnimationManager = new zj.AnimationManager();
        Game.ParticleManager = new zj.ParticleManager();
        // 各个system
        Game.PlayerInfoSystem = new zj.PlayerInfoSystem();
        Game.PlayerItemSystem = new zj.PlayerItemSystem();
        Game.PlayerHunterSystem = new zj.PlayerHunterSystem();
        Game.PlayerCardSystem = new zj.PlayerCardSystem();
        Game.PlayerFormationSystem = new zj.PlayerFormationSystem();
        Game.PlayerGiftSystem = new zj.PlayerGiftSystem();
        Game.PlayerVIPSystem = new zj.PlayerVIPSystem();
        Game.PlayerHunterHistorySystem = new zj.PlayerHunterHistorySystem();
        Game.PlayerInstanceSystem = new zj.PlayerInstanceSystem();
        Game.PlayerLeagueSystem = new zj.PlayerLeagueSystem();
        Game.PlayerSkillSystem = new zj.PlayerSkillSystem();
        Game.PlayerTalentSystem = new zj.PlayerTalentSystem();
        Game.PlayerProgressesSystem = new zj.PlayerProgressesSystem();
        Game.PlayerMixUnitInfoSystem = new zj.PlayerMixUnitInfoSystem();
        Game.PlayerMissionSystem = new zj.PlayerMissionSystem();
        Game.PlayerWantedSystem = new zj.PlayerWantedSystem();
        Game.PlayerAdviserSystem = new zj.PlayerAdviserSystem();
        Game.PlayerArenaSystem = new zj.PlayerArenaSystem();
        Game.PlayerStageSystem = new zj.PlayerStageSystem();
        Game.PlayerMobSystem = new zj.PlayerMobSystem();
        Game.PlayerBattleSystem = new zj.PlayerBattleSystem();
        Game.PlayerTowerSystem = new zj.PlayerTowerSystem();
        Game.PlayerZorkSystem = new zj.PlayerZorkSystem();
        Game.PlayerFashionSystem = new zj.PlayerFashionSystem();
        Game.PlayerRelateSystem = new zj.PlayerRelateSystem();
        Game.PlayerSignSystem = new zj.PlayerSignSystem();
        Game.PlayerActivitySystem = new zj.PlayerActivitySystem();
        Game.PlayerLogingSystem = new zj.PlayerLogingSystem();
        Game.PlayerBuffSystem = new zj.PlayerBuffSystem();
        Game.TeachSystem = new zj.TeachSystem();
        Game.PlayerPaySystem = new zj.PlayerPaySystem();
        Game.PlayerMailSystem = new zj.PlayerMailSystem();
        Game.PlayerWonderLandSystem = new zj.PlayerWonderLandSystem();
        Game.PlayerUserSystem = new zj.PlayerUserSystem();
        Game.PlayerDoubleBallSystem = new zj.PlayerDoubleBallSystem();
        Game.PlayerChatDataSystem = new zj.PlayerChatDataSystem();
        Game.PlayerDarkSystem = new zj.PlayerDarkSystem();
        Game.PlayerBossSystem = new zj.PlayerBossSystem();
        Game.Controller = new zj.Controller();
        Game.AnnouceManger = new zj.AnnouceManger();
        Game.ObjectPool = new zj.ObjectPool();
        Game.RESGroupManager = new zj.RESGroupManager();
        Game._isInitOK = false;
        return Game;
    }());
    zj.Game = Game;
    __reflect(Game.prototype, "zj.Game");
})(zj || (zj = {}));
//# sourceMappingURL=Game.js.map