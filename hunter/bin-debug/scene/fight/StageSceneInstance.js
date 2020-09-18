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
    var StageSceneInstance = (function (_super) {
        __extends(StageSceneInstance, _super);
        function StageSceneInstance() {
            var _this = _super.call(this) || this;
            _this.tablePosMonster = [[], [], [], []];
            _this.instanceId = 0;
            _this.stageId = -1;
            _this.stageNumMax = 0;
            _this.tablePosMonster = [[], [], [], []];
            _this.tablePosIndex = [0, 0, 0, 0];
            _this.tableServerPosId = [0, 0, 0, 0];
            _this.bossPosIndex = -1;
            _this.bossId = -1;
            _this.enemyPosNum = 0;
            return _this;
        }
        StageSceneInstance.prototype.loadMapId = function () {
            this.mapId = 1;
        };
        StageSceneInstance.prototype.loadStageId = function () {
            this.stageId = 1;
        };
        StageSceneInstance.prototype.initMap = function () {
            this.changeGround();
            this.loadMapId();
            this.LoadMap(this.mapId);
            //适配地图
            this.initCamera();
            //this.adaptScenePos(this.borderDis);
        };
        StageSceneInstance.prototype.clearStageInfo = function () {
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
        };
        StageSceneInstance.prototype.calcBossPosIndex = function () {
            function getBossPos(tbl, pos) {
                for (var i = 0; i < tbl.length; i++) {
                    var v = tbl[i];
                    var instance = zj.Game.PlayerMobSystem.Instance(v);
                    if (instance.role_type == zj.TableEnum.TableEnumFromClassify.TYPE_BOSS) {
                        return [pos, v];
                    }
                }
                return [-1, -1];
            }
            for (var i = 0; i < this.tablePosMonster.length; i++) {
                var v = this.tablePosMonster[i];
                var _a = getBossPos(v, i), pos = _a[0], id = _a[1];
                if (pos != -1) {
                    return [i, id];
                }
            }
            return [-1, -1];
        };
        StageSceneInstance.prototype.calcEnemyPosNum = function () {
            var num = 0;
            for (var i = 0; i < this.tablePosMonster.length; i++) {
                var v = this.tablePosMonster[i];
                if (v != null && v.length != 0) {
                    num = num + 1;
                }
            }
            return num;
        };
        StageSceneInstance.prototype.clearMonsterTalents = function () {
            zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [];
            zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [];
        };
        StageSceneInstance.prototype.initMonsterTalents = function () {
            for (var i = 0; i < this.tablePosMonster.length; i++) {
                var v = this.tablePosMonster[i];
                for (var j = 0; j < v.length; j++) {
                    var v1 = v[j];
                    if (v1 != 0) {
                        var _a = zj.Talentdb.createMobTalents(v1), _every = _a[0], _personal = _a[1];
                        zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT].push(_every);
                        zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT][v1] = _personal;
                    }
                }
            }
        };
        StageSceneInstance.prototype.openNextChapMonster = function () {
            this.tablePosMonster = [[], [], [], []];
            this.tablePosIndex = [0, 0, 0, 0];
            this.tableServerPosId = [0, 0, 0, 0];
            this.bossPosIndex = -1;
            this.bossId = -1;
            this.enemyPosNum = 0;
            this.loadStageId();
            var instance = zj.Game.PlayerStageSystem.Instance(this.stageId);
            for (var i = 1; i < 5; i++) {
                this.tablePosMonster[i - 1] = zj.Game.PlayerStageSystem.monsterIDs(instance["monster_pos" + i]);
            }
            this.clearMonsterTalents();
            this.initMonsterTalents();
            _a = this.calcBossPosIndex(), this.bossPosIndex = _a[0], this.bossId = _a[1];
            this.enemyPosNum = this.calcEnemyPosNum();
            this.stageMaxTime = instance.state_time * 1000;
            this.battleTime = this.stageMaxTime;
            var _a;
        };
        //[[一次加载4个怪]]
        StageSceneInstance.prototype.initMonster = function (bTag) {
            var test = [0, 1, 2, 3];
            this.loadStageId();
            var instance = zj.Game.PlayerStageSystem.Instance(this.stageId);
            for (var i = 1; i < 5; i++) {
                this.tablePosMonster[i - 1] = zj.Game.PlayerStageSystem.monsterIDs(instance["monster_pos" + i]);
            }
            this.initMonsterTalents();
            _a = this.calcBossPosIndex(), this.bossPosIndex = _a[0], this.bossId = _a[1];
            this.enemyPosNum = this.calcEnemyPosNum();
            this.stageMaxTime = instance.state_time * 1000;
            for (var i = 0; i < test.length; i++) {
                var pos = test[i];
                var monsterId = -1;
                var isBoss = false;
                var _b = this.getserverMonsterId(pos), serverId = _b[0], isServerBoss = _b[1];
                if (serverId != -1) {
                    monsterId = Number(serverId);
                    isBoss = Boolean(isServerBoss);
                }
                else {
                    var arr = this.getMonsterId(pos);
                    monsterId = Number(arr[0]);
                    isBoss = Boolean(arr[1]);
                }
                if (monsterId == -1) {
                    continue;
                }
                var realPos = zj.Table.Findev(this.tablePosMonster, monsterId);
                var monster = this._createLocalMonster(pos, monsterId, isBoss, bTag, false, realPos);
                this.searchMonsterInfo(monster);
                this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, monster, 1, false, null, null, null, true);
            }
            var _a;
        };
        StageSceneInstance.prototype.fillMonster = function (pos) {
            if (this.bBossDead == true) {
                return;
            }
            if (this.tableMonsterPosRecord[pos] == "empty") {
                return;
            }
            var _a = this.getMonsterId(pos), monsterId = _a[0], isBoss = _a[1];
            if (monsterId == -1) {
                return false;
            }
            var realPos = zj.Table.Findev(this.tablePosMonster, monsterId);
            var monster = this._createLocalMonster(pos, monsterId, isBoss, true, false, realPos);
            this.searchMonsterInfo(monster);
            monster.setVisible(true);
            monster.setPosX(960);
            monster.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            var gType = 2;
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                gType = 1;
            }
            this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, monster, gType, false, null, null, null, true);
            this.pushSqueue(monsterId, true);
            return true;
        };
        StageSceneInstance.prototype.takeMobsArmy = function () {
            this.replayBattleInfo.stageInfo = zj.PlayerStageSystem.stageInfoTbl;
        };
        StageSceneInstance.prototype.preLoadBoss = function () {
            if (this.bBossAppear == true) {
                return;
            }
            if (zj.isCanUseVec(this.tableMonsterIdPos2) == false) {
                return;
            }
        };
        StageSceneInstance.prototype.preLoadBossEffect = function () {
        };
        StageSceneInstance.prototype.getAdvanceMonId = function (pos) {
            var tmp = [[1, 2, 3], [2, 3, 0], [3, 1, 0], [2, 1, 0]];
            //pos位是否已经没有了
            if (this.is_empty(pos, pos) == false) {
                var id = this.tablePosMonster[pos][this.tablePosIndex[pos]];
                return [id, pos];
            }
            else {
                var real = tmp[pos];
                for (var i = 0; i < real.length; i++) {
                    if (this.is_empty(i, pos) == false) {
                        var id = this.tablePosMonster[i][this.tablePosIndex[i]];
                        return [id, i];
                    }
                }
            }
            return [-1, -1];
        };
        StageSceneInstance.prototype.is_empty = function (index, real) {
            if (zj.isCanUseVec(this.tablePosMonster[index]) == false) {
                return true;
            }
            if (this.tablePosIndex[index] >= this.tablePosMonster[index].length) {
                return true;
            }
            var _id = this.tablePosMonster[index][this.tablePosIndex[index]];
            if (_id <= 0 || (_id == this.bossId && real != this.bossPosIndex)) {
                return true;
            }
            return false;
        };
        StageSceneInstance.prototype.getserverMonsterId = function (pos) {
            var id = -1;
            var isBoss = false;
            if (this.tableServerPosId[pos] != null && this.tableServerPosId[pos] != 0) {
                id = this.tableServerPosId[pos];
            }
            if (id != -1) {
                var instance = zj.Game.PlayerMobSystem.Instance(id);
                isBoss = zj.yuan3(instance.role_type == zj.TableEnum.TableEnumFromClassify.TYPE_BOSS, true, false);
            }
            return [id, isBoss];
        };
        StageSceneInstance.prototype.getMonsterId = function (pos) {
            var isBoss = false;
            var _a = this.getAdvanceMonId(pos), id = _a[0], tag = _a[1];
            if (id != -1) {
                this.tablePosIndex[tag] = this.tablePosIndex[tag] + 1;
                var instance = zj.Game.PlayerMobSystem.Instance(id);
                isBoss = zj.yuan3(instance.role_type == zj.TableEnum.TableEnumFromClassify.TYPE_BOSS, true, false);
            }
            return [id, isBoss];
        };
        StageSceneInstance.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return true;
            }
            else if (role.bEnemy == true) {
                if (this.bBossDead == true) {
                    return false;
                }
                return this.fillMonster(role.getTeamNum() + 1);
            }
        };
        StageSceneInstance.prototype.modifyMonster = function (general) {
            if (this.mainmenu != null) {
                this.mainmenu.NoticeMsgInfo(general);
            }
        };
        StageSceneInstance.prototype.isFinalStage = function () {
            return zj.yuan3(this.monsterStage == this.stageNumMax, true, false);
        };
        StageSceneInstance.prototype.isAllMonsterAppear = function () {
            var tag = true;
            for (var k in this.tablePosMonster) {
                var v = this.tablePosMonster[k];
                if (v != null && v.length != 0) {
                    if (zj.isCanUseVec(v) == true && this.tablePosIndex[k] < v.length) {
                        tag = false;
                        break;
                    }
                }
            }
            return tag;
        };
        StageSceneInstance.prototype.oppToBriefInfo = function () {
            //副本关卡必有boss
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Helper.instanceToBriefInfo(zj.Gmgr.Instance.fightType, this.instanceId, zj.Gmgr.Instance.pveBossinfo);
        };
        StageSceneInstance.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_1(tick);
        };
        StageSceneInstance.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procAi();
        };
        StageSceneInstance.prototype.procAi = function () {
            if ((this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty") || this.bBossDead == true) {
                this.staticFight();
            }
        };
        return StageSceneInstance;
    }(zj.StageSceneFight));
    zj.StageSceneInstance = StageSceneInstance;
    __reflect(StageSceneInstance.prototype, "zj.StageSceneInstance");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneInstance.js.map