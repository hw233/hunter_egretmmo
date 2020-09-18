namespace zj {
	export class TeachCondition {
		public static nodeID = null;
		public static condition(id: number) {
			let condition;
			switch (id) {
				case 1:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008;
					break;
				case 2:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100015;
					break;
				case 3:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100029;
					break;
				case 4:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100043;
					break;
				case 5:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100057;
					break;
				case 6:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100071;
					break;
				case 7:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100085;
					break;
				case 8:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100099;
					break;
				case 9:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100113;
					break;
				case 10:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100001 && Game.PlayerInstanceSystem.CheckAvailable(100001);
					break;
				case 11:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100001 && Game.PlayerInstanceSystem.CheckAvailable(100002);
					break;
				case 12:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100002 && Game.PlayerInstanceSystem.CheckAvailable(100002);
					break;
				case 13:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100003 && Game.PlayerInstanceSystem.CheckAvailable(100003);
					break;
				case 14:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100005 && Game.PlayerInstanceSystem.CheckAvailable(100005);
					break;
				case 15:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && PlayerMissionSystem.FunOpenTo(FUNC.SKILL) && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100005;
					break;
				case 16:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100007 && Game.PlayerInstanceSystem.CheckAvailable(100007);
					break;
				case 17:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100008 && Game.PlayerInstanceSystem.CheckAvailable(100007);
					break;
				case 18:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100010 && Game.PlayerInstanceSystem.CheckAvailable(100009);
					break;
				case 19:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100014 && Game.PlayerInstanceSystem.CheckAvailable(100013);
					break;
				case 20:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100029 && Game.PlayerInstanceSystem.CheckAvailable(100028);
					break;
				case 21:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100015 && Game.PlayerInstanceSystem.CheckAvailable(100014)
					break;
				case 22:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && PlayerMissionSystem.FunOpenTo(FUNC.POTATO) && Game.PlayerItemSystem.HasCardBag() && egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.mainCityClassStr;
					break;
				case 23:
					condition = SceneManager.instance.isMainCityScene() && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100015 && Game.PlayerInstanceSystem.CheckAvailable(100014) && !Game.PlayerInstanceSystem.isJumpToInstance;
					break;
				case 24:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.LICENSE) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 25:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100022 && Game.PlayerInstanceSystem.CheckAvailable(100021) && !Game.PlayerInstanceSystem.isJumpToInstance && Game.PlayerHunterSystem.TeachCondition8009();
					break;
				case 26:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= 100043 && Game.PlayerInstanceSystem.CheckAvailable(100042);
					break;
				case 27:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.ARENA);
					break;
				case 28:
					condition = -1;
					break;
				case 29:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE);
					break;
				case 30:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND2);
					break;
				case 31:
					condition = -1;
					break;
				case 32:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND3);
					break;
				case 33:
					condition = -1;
					break;
				case 34:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.TOWER) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 35:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.ARREST) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 36:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.ARREST) && Game.PlayerInfoSystem.BaseInfo.level >= PlayerWantedSystem.GetLimitLevel(4) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 37:
					condition = -1;
					break;
				case 38:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.EQUIP) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 39:
					condition = SceneManager.instance.isMainCityScene() && PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 40:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && PlayerMissionSystem.FunOpenTo(FUNC.GROUPFIGHT);
					break;
				case 41:
					condition = -1;
					break;
				case 42:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 888;
					break;
				case 43:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 100001;
					break;
				case 44:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_FIGHT && this.nodeID == 100002;
					break;
				case 45:
					condition = Gmgr.Instance.getLayerId() == TableEnumLayerId.LAYER_WONDERLAND && PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND2) && Game.PlayerWonderLandSystem.wonderlandId == 1;
					break;
				case 46:
					condition = Gmgr.Instance.getLayerId() == TableEnumLayerId.LAYER_WONDERLAND && PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND3) && Game.PlayerWonderLandSystem.wonderlandId == 4;
					break;
				case 47:
					condition = -1;
					break;
				case 48:
					condition = -1;
					break;
				case 49:
					// condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && PlayerItemSystem.Count(40008) >= PlayerHunterSystem.Table(10008).soul_count;
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008 && Teach.isDone(3014)
					// condition = -1;
					break;
				case 50:
					condition = SceneManager.instance.isMainCityScene() && Game.PlayerMissionSystem.TeachCanExam() && PlayerMissionSystem.FunOpenTo(FUNC.LICENSE) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 51:
					condition = Teach.isDone(teachBattle.teachPartID_League_Main) == false && PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE) && egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueHomeScene";
					break;
				case 52:
					condition = SceneManager.instance.isMainCityScene() && (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 53:
					condition = Gmgr.Instance.getLayerId() == TableEnum.TableEnumLayerId.LAYER_WONDERLAND && (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && (PlayerAdviserSystem.Haves() != false);
					break;
				case 54:
					condition = SceneManager.instance.isMainCityScene() && zj.Game.UIManager.topDialog() == null && PlayerMissionSystem.FunOpenTo(FUNC.COMPOUND) && Game.TeachSystem.battleEndOpenTeach == true;
					break;
				case 55:
					condition = -1;
					break;
				case 56:
					condition = Gmgr.Instance.getLayerId() == TableEnumLayerId.LAYER_CITY && Game.PlayerMissionSystem.TeachGetLicense() && PlayerMissionSystem.FunOpenTo(FUNC.LICENSE);
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
					let fightUi: any = StageSceneManager.Instance.GetCurScene();
					let stage;
					if (fightUi != null) {
						stage = fightUi['eStageState'];
					}
					else {
						stage = null;
					}
					condition = Gmgr.Instance.getLayerId() == TableEnumLayerId.LAYER_FIGHT && Helper.getSpeedMaxIndex(Game.PlayerInfoSystem.BaseInfo.level) == 3 && zj.Game.UIManager.topDialog() == null && stage == TableEnum.TableStageState.STAGE_STATE_1ST;
					break;
			}
			return condition;
		}
	}
}