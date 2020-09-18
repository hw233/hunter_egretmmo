namespace zj {
	export class StageSceneInstance extends StageSceneFight {
		public constructor() {
			super();
			this.instanceId = 0;
			this.stageId = -1;
			this.stageNumMax = 0

			this.tablePosMonster = [[], [], [], []];
			this.tablePosIndex = [0, 0, 0, 0];
			this.tableServerPosId = [0, 0, 0, 0]

			this.bossPosIndex = -1
			this.bossId = -1
			this.enemyPosNum = 0
		}
		public tablePosMonster = [[], [], [], []];
		public stageId;
		public stageNumMax;
		public tablePosIndex;
		public tableServerPosId;
		public bossPosIndex;
		public enemyPosNum;
		public tableMonsterIdPos2;

		public loadMapId() {
			this.mapId = 1;
		}
		public loadStageId() {
			this.stageId = 1;
		}
		public initMap() {
			this.changeGround();
			this.loadMapId()
			this.LoadMap(this.mapId);
			//适配地图
			this.initCamera();
			//this.adaptScenePos(this.borderDis);
		}
		public clearStageInfo() {
			this.stageNumMax = 0;
			this.tablePosMonster = [[], [], [], []];
			this.tablePosIndex = [0, 0, 0, 0];
			this.tableServerPosId = [0, 0, 0, 0];

			this.bossPosIndex = -1;
			this.bossId = -1;
			this.enemyPosNum = 0;

			this.bBossAppear = false;
			this.bBossDead = false;
			this.bBossRemove = false;
			this.bossInstance = null;
		}
		public calcBossPosIndex() {
			function getBossPos(tbl, pos) {
				for (let i = 0; i < tbl.length; i++) {
					let v = tbl[i];
					let instance = Game.PlayerMobSystem.Instance(v);
					if (instance.role_type == TableEnum.TableEnumFromClassify.TYPE_BOSS) {
						return [pos, v];
					}
				}
				return [-1, -1];
			}
			for (let i = 0; i < this.tablePosMonster.length; i++) {
				let v = this.tablePosMonster[i]
				let [pos, id] = getBossPos(v, i);
				if (pos != -1) {
					return [i, id];
				}
			}
			return [-1, -1];
		}
		public calcEnemyPosNum() {
			let num = 0;
			for (let i = 0; i < this.tablePosMonster.length; i++) {
				let v = this.tablePosMonster[i];
				if (v != null && v.length != 0) {
					num = num + 1;
				}
			}
			return num;
		}
		public clearMonsterTalents() {
			Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_RIGHT] = [];
			Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_RIGHT] = [];
		}
		public initMonsterTalents() {
			for (let i = 0; i < this.tablePosMonster.length; i++) {
				let v = this.tablePosMonster[i];
				for (let j = 0; j < v.length; j++) {
					let v1 = v[j];
					if (v1 != 0) {
						let [_every, _personal] = Talentdb.createMobTalents(v1);
						Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_RIGHT].push(_every);
						Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_RIGHT][v1] = _personal;
					}
				}
			}
		}
		public openNextChapMonster() {
			this.tablePosMonster = [[], [], [], []];
			this.tablePosIndex = [0, 0, 0, 0];
			this.tableServerPosId = [0, 0, 0, 0];
			this.bossPosIndex = -1;
			this.bossId = -1;
			this.enemyPosNum = 0;
			this.loadStageId();
			let instance = Game.PlayerStageSystem.Instance(this.stageId);
			for (let i = 1; i < 5; i++) {
				this.tablePosMonster[i - 1] = Game.PlayerStageSystem.monsterIDs(instance["monster_pos" + i]);
			}
			this.clearMonsterTalents();
			this.initMonsterTalents();
			[this.bossPosIndex, this.bossId] = this.calcBossPosIndex();
			this.enemyPosNum = this.calcEnemyPosNum();
			this.stageMaxTime = instance.state_time * 1000;
			this.battleTime = this.stageMaxTime;
		}
		//[[一次加载4个怪]]
		public initMonster(bTag) {
			let test = [0, 1, 2, 3];
			this.loadStageId();
			let instance = Game.PlayerStageSystem.Instance(this.stageId);
			for (let i = 1; i < 5; i++) {
				this.tablePosMonster[i - 1] = Game.PlayerStageSystem.monsterIDs(instance["monster_pos" + i]);
			}
			this.initMonsterTalents();

			[this.bossPosIndex, this.bossId] = this.calcBossPosIndex();
			this.enemyPosNum = this.calcEnemyPosNum();
			this.stageMaxTime = instance.state_time * 1000;
			for (let i = 0; i < test.length; i++) {
				let pos = test[i];
				let monsterId = -1;
				let isBoss = false;
				let [serverId, isServerBoss] = this.getserverMonsterId(pos);
				if (serverId != -1) {
					monsterId = Number(serverId);
					isBoss = Boolean(isServerBoss);
				} else {
					let arr = this.getMonsterId(pos);
					monsterId = Number(arr[0]);
					isBoss = Boolean(arr[1]);
				}
				if (monsterId == -1) {
					continue;
				}
				let realPos = Table.Findev(this.tablePosMonster, monsterId);
				let monster = this._createLocalMonster(pos, monsterId, isBoss, bTag, false, realPos);
				this.searchMonsterInfo(monster);
				this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, monster, 1, false, null, null, null, true);
			}
		}
		public fillMonster(pos) {
			if (this.bBossDead == true) {
				return;
			}
			if (this.tableMonsterPosRecord[pos] == "empty") {
				return;
			}
			let [monsterId, isBoss] = this.getMonsterId(pos);
			if (monsterId == -1) {
				return false;
			}
			let realPos = Table.Findev(this.tablePosMonster, monsterId);
			let monster = this._createLocalMonster(pos, monsterId, isBoss, true, false, realPos);
			this.searchMonsterInfo(monster);
			monster.setVisible(true)
			monster.setPosX(960);
			monster.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
			let gType = 2;
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
				gType = 1;
			}
			this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, monster, gType, false, null, null, null, true);
			this.pushSqueue(monsterId, true);
			return true;
		}
		public takeMobsArmy() {
			this.replayBattleInfo.stageInfo = PlayerStageSystem.stageInfoTbl;
		}
		public preLoadBoss() {
			if (this.bBossAppear == true) {
				return;
			}
			if (isCanUseVec(this.tableMonsterIdPos2) == false) {
				return;
			}
		}
		public preLoadBossEffect() {

		}
		public getAdvanceMonId(pos) {
			let tmp = [[1, 2, 3], [2, 3, 0], [3, 1, 0], [2, 1, 0]];
			//pos位是否已经没有了
			if (this.is_empty(pos, pos) == false) {
				let id = this.tablePosMonster[pos][this.tablePosIndex[pos]];
				return [id, pos];
			} else {
				let real = tmp[pos];
				for (let i = 0; i < real.length; i++) {
					if (this.is_empty(i, pos) == false) {
						let id = this.tablePosMonster[i][this.tablePosIndex[i]];
						return [id, i];
					}
				}
			}
			return [-1, -1];
		}
		private is_empty(index, real) {
			if (isCanUseVec(this.tablePosMonster[index]) == false) {
				return true;
			}
			if (this.tablePosIndex[index] >= this.tablePosMonster[index].length) {
				return true;
			}
			let _id = this.tablePosMonster[index][this.tablePosIndex[index]];
			if (_id <= 0 || (_id == this.bossId && real != this.bossPosIndex)) {
				return true;
			}
			return false;
		}
		public getserverMonsterId(pos) {
			let id = -1;
			let isBoss = false;
			if (this.tableServerPosId[pos] != null && this.tableServerPosId[pos] != 0) {
				id = this.tableServerPosId[pos];
			}
			if (id != -1) {
				let instance = Game.PlayerMobSystem.Instance(id);
				isBoss = yuan3(instance.role_type == TableEnum.TableEnumFromClassify.TYPE_BOSS, true, false);
			}
			return [id, isBoss];
		}
		public getMonsterId(pos) {
			let isBoss = false;
			let [id, tag] = this.getAdvanceMonId(pos);
			if (id != -1) {
				this.tablePosIndex[tag] = this.tablePosIndex[tag] + 1;
				let instance = Game.PlayerMobSystem.Instance(id);
				isBoss = yuan3(instance.role_type == TableEnum.TableEnumFromClassify.TYPE_BOSS, true, false);
			}
			return [id, isBoss];
		}
		public doFightFilling(role) {
			if (role.bEnemy == false) {
				return true;
			} else if (role.bEnemy == true) {
				if (this.bBossDead == true) {
					return false;
				}
				return this.fillMonster(role.getTeamNum() + 1);
			}
		}
		public modifyMonster(general) {
			if (this.mainmenu != null) {
				this.mainmenu.NoticeMsgInfo(general);
			}
		}
		public isFinalStage() {
			return yuan3(this.monsterStage == this.stageNumMax, true, false);
		}
		public isAllMonsterAppear() {
			let tag = true;
			for (let k in this.tablePosMonster) {
				let v = this.tablePosMonster[k];
				if (v != null && v.length != 0) {
					if (isCanUseVec(v) == true && this.tablePosIndex[k] < v.length) {
						tag = false;
						break;
					}
				}
			}
			return tag;
		}
		public oppToBriefInfo() {
			//副本关卡必有boss
			this.replayBattleInfo.rightReplayInfo.roleInfo = Helper.instanceToBriefInfo(Gmgr.Instance.fightType, this.instanceId, Gmgr.Instance.pveBossinfo);
		}
		public procSenceAppear(tick) {
			this.procSenceAppear_1(tick);
		}
		public Update(tick) {
			super.Update(tick);
			this.procAi();
		}
		public procAi() {
			if ((this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty") || this.bBossDead == true) {
				this.staticFight();
			}
		}
	}
}