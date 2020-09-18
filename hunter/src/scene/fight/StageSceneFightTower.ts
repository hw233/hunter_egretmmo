namespace zj {
	/**爬塔副本场景类 */
	export class StageSceneFightTower extends StageSceneInstance {
		public constructor() {
			super();
			Gmgr.Instance.setFightType(Game.PlayerInstanceSystem.curInstanceType);
			Gmgr.Instance.setFightTalentType(Game.PlayerInstanceSystem.curInstanceType);
			this.battleType = Gmgr.Instance.fightType;
		}
		public formationType;
		public initSection_Other() {
			this.initStage();
			this.initMap();
			this.initFightNumber();
		}
		public initSection_Mine() {
			this.formationType = Game.PlayerInstanceSystem.curInstanceType;
			this.initAdviser();
			this.saveLeftGeneralInfos()
			this.initGenerals(false)
			this.initSupports()
			this.nGeneralCount = this.getBeforeGelCount();
		}
		public initSection_Opp() {
			this.initMonster(true);
		}
		public loadAuto() {
			if (Gmgr.Instance.bContinueBattle) {
				Gmgr.Instance.bFightAuto = true;
				this.bHideAuto = false;
				this.bLockAuto = false;
				this.bHideLimit = true;
			} else {
				Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
				this.bHideAuto = false;
				if (PlayerMissionSystem.FunOpenTo(FUNC.AUTO)) {
					this.bLockAuto = false;
					this.bHideLimit = true;
				} else {
					this.bLockAuto = true;
					this.bHideLimit = false;
				}
			}
			this.bLockKey = false;
		}
		public Init() {
			super.Init();
			this.InitOther();
		}
		public initStage() {
			let date = Game.PlayerTowerSystem.towerInfo;
			// this.instanceId = Game.PlayerInstanceSystem.curInstanceType == message.EInstanceType.TOWER &&  date.towerCur || date.high_tower_cur;
			this.instanceId = date.towerCur;
			Gmgr.Instance.towerCell = this.instanceId;
		}
		public initMap() {
			this.loadMapId();
			this.LoadMap(this.mapId);
		}
		public InitOther() {
			this.UpdateMap((this.mapWidth - UIManager.StageWidth) / 2, 0);
			this.InitBattleSqueue();
		}
		public GetTowerTable() {
			return TableTower.Table();
		}
		public loadMapId() {
			let tableTower = this.GetTowerTable();
			this.mapId = tableTower[this.instanceId].battle_bg;
		}
		public loadStageId() {
			let tableTower = this.GetTowerTable();
			let towerPack = null;
			// if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
			// 	towerPack = tableTower[this.instanceId].tower_pack[Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2];
			// } else {
			// 	// towerPack = tableTower[this.instanceId].tower_pack[Game.PlayerInstanceSystem.InstanceInfo.high_monsterTowerIndex%2];
			// }
			towerPack = tableTower[this.instanceId].tower_pack[Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2];
			let tbl = [towerPack];
			this.stageNumMax = tbl.length;
			this.stageId = tbl[this.monsterStage - 1];
		}
		public procSenceAppear(tick) {
			this.procSenceAppear_3(tick);
		}
		public Update(tick) {
			super.Update(tick);
			if (Gmgr.Instance.bPause == true) {
				return;
			}
			let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
			this.updateTower(cheatDt);
		}
		public updateTower(tick) {
			if (this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) { return }

			if (this.isWin() == true) {
				this.goBalance();
			} else if (this.isTimeUp() == true) {
				this.goFightTimeUp();
			} else if (this.isLoseGoBalance() == true) {
				this.goBalance();
			}
		}
		public doFightFilling(role) {
			if (role.bEnemy == false) {
				return this.fillMyGeneral(role.getTeamNum() + 1);
			} else if (role.bEnemy == true) {
				if (this.bBossDead == true || this.isWeekSteping == true || this.checkAllFriendDead() == true) {
					return false;
				}
				return this.fillMonster(role.getTeamNum() + 1);
			}
		}
		public isWin() {
			let bTag = false;
			if (this.isFinalStage() == true && this.bBossRemove == true) {
				this.nFinalCnt = this.getFinalGelCount();
				bTag = true;
			}
			return bTag;
		}
		public isLose() {
			let bTag = false;
			if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
				bTag = true;
			}
			return bTag;
		}
		public isLoseGoBalance() {
			let bTag = false;
			if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
				bTag = true;
			}
			return bTag;
		}
	}
}