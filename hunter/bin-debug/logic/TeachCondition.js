var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var TeachCondition = (function () {
        function TeachCondition() {
        }
        TeachCondition.condition = function (id) {
            var condition;
            switch (id) {
                case 1:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008;
                    break;
                case 2:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100015;
                    break;
                case 3:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100029;
                    break;
                case 4:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100043;
                    break;
                case 5:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100057;
                    break;
                case 6:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100071;
                    break;
                case 7:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100085;
                    break;
                case 8:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100099;
                    break;
                case 9:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100113;
                    break;
                case 10:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100001 && zj.Game.PlayerInstanceSystem.CheckAvailable(100001);
                    break;
                case 11:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100001 && zj.Game.PlayerInstanceSystem.CheckAvailable(100002);
                    break;
                case 12:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100002 && zj.Game.PlayerInstanceSystem.CheckAvailable(100002);
                    break;
                case 13:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100003 && zj.Game.PlayerInstanceSystem.CheckAvailable(100003);
                    break;
                case 14:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100005 && zj.Game.PlayerInstanceSystem.CheckAvailable(100005);
                    break;
                case 15:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SKILL) && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100005;
                    break;
                case 16:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100007 && zj.Game.PlayerInstanceSystem.CheckAvailable(100007);
                    break;
                case 17:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100008 && zj.Game.PlayerInstanceSystem.CheckAvailable(100007);
                    break;
                case 18:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100010 && zj.Game.PlayerInstanceSystem.CheckAvailable(100009);
                    break;
                case 19:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100014 && zj.Game.PlayerInstanceSystem.CheckAvailable(100013);
                    break;
                case 20:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100029 && zj.Game.PlayerInstanceSystem.CheckAvailable(100028);
                    break;
                case 21:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100015 && zj.Game.PlayerInstanceSystem.CheckAvailable(100014);
                    break;
                case 22:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO) && zj.Game.PlayerItemSystem.HasCardBag() && egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.mainCityClassStr;
                    break;
                case 23:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100015 && zj.Game.PlayerInstanceSystem.CheckAvailable(100014) && !zj.Game.PlayerInstanceSystem.isJumpToInstance;
                    break;
                case 24:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LICENSE) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 25:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100022 && zj.Game.PlayerInstanceSystem.CheckAvailable(100021) && !zj.Game.PlayerInstanceSystem.isJumpToInstance && zj.Game.PlayerHunterSystem.TeachCondition8009();
                    break;
                case 26:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100043 && zj.Game.PlayerInstanceSystem.CheckAvailable(100042);
                    break;
                case 27:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA);
                    break;
                case 28:
                    condition = -1;
                    break;
                case 29:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE);
                    break;
                case 30:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND2);
                    break;
                case 31:
                    condition = -1;
                    break;
                case 32:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND3);
                    break;
                case 33:
                    condition = -1;
                    break;
                case 34:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.TOWER) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 35:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 36:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST) && zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.PlayerWantedSystem.GetLimitLevel(4) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 37:
                    condition = -1;
                    break;
                case 38:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.EQUIP) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 39:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 40:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.GROUPFIGHT);
                    break;
                case 41:
                    condition = -1;
                    break;
                case 42:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 888;
                    break;
                case 43:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 100001;
                    break;
                case 44:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 100002;
                    break;
                case 45:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnumLayerId.LAYER_WONDERLAND && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND2) && zj.Game.PlayerWonderLandSystem.wonderlandId == 1;
                    break;
                case 46:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnumLayerId.LAYER_WONDERLAND && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND3) && zj.Game.PlayerWonderLandSystem.wonderlandId == 4;
                    break;
                case 47:
                    condition = -1;
                    break;
                case 48:
                    condition = -1;
                    break;
                case 49:
                    // condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && PlayerItemSystem.Count(40008) >= PlayerHunterSystem.Table(10008).soul_count;
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008 && zj.Teach.isDone(3014);
                    // condition = -1;
                    break;
                case 50:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.Game.PlayerMissionSystem.TeachCanExam() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LICENSE) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 51:
                    condition = zj.Teach.isDone(zj.teachBattle.teachPartID_League_Main) == false && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE) && egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueHomeScene";
                    break;
                case 52:
                    condition = zj.SceneManager.instance.isMainCityScene() && (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 53:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND && (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && (zj.PlayerAdviserSystem.Haves() != false);
                    break;
                case 54:
                    condition = zj.SceneManager.instance.isMainCityScene() && zj.Game.UIManager.topDialog() == null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.COMPOUND) && zj.Game.TeachSystem.battleEndOpenTeach == true;
                    break;
                case 55:
                    condition = -1;
                    break;
                case 56:
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnumLayerId.LAYER_CITY && zj.Game.PlayerMissionSystem.TeachGetLicense() && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LICENSE);
                    break;
                case 57:
                    condition = -1;
                    break;
                case 58:
                    condition = -1;
                    break;
                case 59:
                    condition = -1;
                    break;
                case 60:
                    condition = -1;
                    break;
                case 61:
                    condition = -1;
                    break;
                case 62:
                    condition = -1;
                    // condition = egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonFormatePveMain" && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008 && Game.PlayerInstanceSystem.CheckAvailable(100007);
                    break;
                case 63:
                    var fightUi = zj.StageSceneManager.Instance.GetCurScene();
                    var stage = void 0;
                    if (fightUi != null) {
                        stage = fightUi['eStageState'];
                    }
                    else {
                        stage = null;
                    }
                    condition = zj.Gmgr.Instance.getLayerId() == zj.TableEnumLayerId.LAYER_FIGHT && zj.Helper.getSpeedMaxIndex(zj.Game.PlayerInfoSystem.BaseInfo.level) == 3 && zj.Game.UIManager.topDialog() == null && stage == zj.TableEnum.TableStageState.STAGE_STATE_1ST;
                    break;
            }
            return condition;
        };
        TeachCondition.nodeID = null;
        return TeachCondition;
    }());
    zj.TeachCondition = TeachCondition;
    __reflect(TeachCondition.prototype, "zj.TeachCondition");
})(zj || (zj = {}));
//# sourceMappingURL=TeachCondition.js.map