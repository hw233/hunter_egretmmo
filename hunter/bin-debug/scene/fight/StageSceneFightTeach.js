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
    /**战斗教学场景 */
    var StageSceneFightTeach = (function (_super) {
        __extends(StageSceneFightTeach, _super);
        function StageSceneFightTeach() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH);
            zj.Gmgr.Instance.setFightTalentType(zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.timerTickTeach = 0;
            _this.instanceId = 888;
            _this.teachEventIndex = 1;
            _this.bDialog = false;
            _this.bMp4 = false;
            _this.bEnd = false;
            _this.tableTeach = zj.TableClientStoryTeach.Table();
            return _this;
            // this.playMp4(1);
        }
        StageSceneFightTeach.prototype.adaptRoleY = function (y) {
            return Math.floor(y / (zj.Device.screenWidth / zj.Device.STANDARD_SCREEN_W));
        };
        StageSceneFightTeach.prototype.getV = function (tbl, pos) {
            for (var k in tbl) {
                var v = tbl[k];
                if (v.pos == pos + 1) {
                    return v;
                }
            }
            return null;
        };
        StageSceneFightTeach.prototype.loadExt = function () {
            this.openFirstStart();
        };
        StageSceneFightTeach.prototype.loadMapId = function () {
            this.mapId = zj.teachBattle.bgTeachId;
        };
        StageSceneFightTeach.prototype.loadSound = function () {
            zj.Helper.PlaybgmByID(100006);
        };
        StageSceneFightTeach.prototype.initRandSeed = function () {
            this.fightSeed = zj.teachBattle.teachSeed;
        };
        StageSceneFightTeach.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightTeach.prototype.initSection_Other = function () {
            //因为父类中instanceId设置的位置修改了（InitRes里面），所以此处需要再次设置一下
            this.instanceId = 888;
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightTeach.prototype.loadAuto = function () {
            zj.Gmgr.Instance.bFightAuto = false;
            this.bHideAuto = true;
            this.bLockAuto = false;
            this.bHideLimit = true;
            this.bLockKey = false;
        };
        StageSceneFightTeach.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT;
        };
        StageSceneFightTeach.prototype.initLeftGenerals = function () {
            this.initTeachGeneralTalents();
            for (var k in zj.teachBattle.teachLeftGeneral) {
                var v = zj.teachBattle.teachLeftGeneral[k];
                if (v.id != 0) {
                    var general = this._createTeachGel(v.pos, v.id);
                }
            }
        };
        StageSceneFightTeach.prototype._createTeachGel = function (pos, roleId) {
            var generalId = roleId;
            var aiId = -1;
            var coordinateIndex = pos;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[coordinateIndex - 1];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[coordinateIndex - 1]);
            y = zj.UIManager.StageHeight - y;
            var floor = y + zj.Gmgr.Instance.upY;
            var general;
            general = new zj.StagePersonLocal(this.getRoleLayer(false, pos), false);
            general.creatLocal(generalId, zj.TableEnum.TableCampType.CAMP_TYPE_MY, zj.TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState);
            general.creatEntryCd();
            general.setRage(99999);
            general.dealCutCdMin();
            general.setVisible(false);
            general.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            this.tableAllys[generalId] = general;
            return general;
        };
        StageSceneFightTeach.prototype.initTeachGeneralTalents = function () {
            for (var k in zj.teachBattle.teachLeftGeneral) {
                var v = zj.teachBattle.teachLeftGeneral[k];
                if (v.id != 0) {
                    var _a = zj.Talentdb.createTeachPersonTalent(zj.TableClientMonsterLocal.Item(v.id).talent_ids), _every = _a[0], _personal = _a[1];
                    zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT].push(_every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v.id] = _personal;
                }
            }
            for (var k in zj.teachBattle.teachLeftSupport) {
                var v = zj.teachBattle.teachLeftSupport[k];
                if (v.id != 0) {
                    var _b = zj.Talentdb.createTeachPersonTalent(zj.TableClientMonsterLocal.Item(v.id).talent_ids), _every = _b[0], _personal = _b[1];
                    zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT].push(_every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v.id] = _personal;
                }
            }
        };
        StageSceneFightTeach.prototype.initLeftSupports = function () {
            var queue = [0, 1, 2, 3];
            for (var i = 0; i < queue.length; i++) {
                var pos = queue[i];
                var v = this.getV(zj.teachBattle.teachLeftSupport, pos);
                if (v != null) {
                    var general = this._createMyLocalSupport(pos, v.id);
                    general.setRage(99999);
                    general.dealCutCdMin();
                    general.setVisible(false);
                    general.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                }
            }
        };
        StageSceneFightTeach.prototype._createOppTeachGel = function (pos, roleId, appearTag, isBoss) {
            var generalId = roleId;
            var aiId = -1;
            var coordinateIndex = pos;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[coordinateIndex];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Right_Mid_Y + zj.tableRightStanceY[coordinateIndex]);
            y = zj.UIManager.StageHeight - y;
            var floor = y + zj.Gmgr.Instance.upY;
            var general = null;
            general = new zj.StagePersonLocal(this.getRoleLayer(true, pos), false);
            general.creatLocal(generalId, zj.TableEnum.TableCampType.CAMP_TYPE_OTHER, zj.TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Left, true, 1.0, this.eStageState);
            general.creatEntryCd();
            general.setVisible(appearTag);
            general.setRage(99999);
            general.dealCutCdMin();
            general.setForceAi(true);
            general.setLocalBoss(isBoss);
            this.tableEnemys[generalId] = general;
            return general;
        };
        StageSceneFightTeach.prototype.initRightMonsters = function () {
            for (var k in zj.teachBattle.teachRightGeneral) {
                var v = zj.teachBattle.teachRightGeneral[k];
                if (v.id != 0) {
                    var monster = this._createOppTeachGel(2, v.id, true, v.isBoss);
                    monster.closeRoleDcUI();
                    monster.setInGut(true);
                    monster.setPos(v.coordinate.x, zj.adaptRoleY(zj.UIManager.StageHeight - v.coordinate.y));
                    monster.changeDir(v.dir, true);
                }
            }
        };
        StageSceneFightTeach.prototype.initRightSupports = function () {
        };
        StageSceneFightTeach.prototype.initSection_Mine = function () {
            this.initLeftGenerals();
            this.initLeftSupports();
        };
        StageSceneFightTeach.prototype.initSection_Opp = function () {
            this.initRightMonsters();
            this.initRightSupports();
        };
        StageSceneFightTeach.prototype.playGeneral = function (name, index, head) {
            var tbl = zj.teachBattle.teachLeftGeneral[name];
            if (tbl == null) {
                return;
            }
            var generalId = tbl.id;
            var general = this.tableAllys[generalId];
            if (general != null) {
                if (head == 1) {
                    this.helpRoleAniBegin(general);
                }
                general.playReplaySkill(index, 1);
            }
        };
        StageSceneFightTeach.prototype.playMonster = function (name, index, head) {
            var tbl = zj.teachBattle.teachRightGeneral[name];
            if (tbl == null) {
                return;
            }
            var monsterId = tbl.id;
            var monster = this.tableEnemys[monsterId];
            if (monster != null) {
                if (head == 1) {
                    this.oppHelpRoleAniBegin(monster);
                }
                monster.playReplaySkill(index, 1);
            }
        };
        StageSceneFightTeach.prototype.coverMonster = function (pos, name) {
            var v = zj.teachBattle.teachRightGeneral[name];
            var monster = this.tableEnemys[v.id];
            if (monster != null) {
                monster.setInGut(false);
                monster.openRoleDcUI();
                monster.setVisible(true);
                monster.setLocalBoss(v.isBoss);
                monster.changeDir(zj.TableEnum.TableEnumDir.Dir_Left, true);
                monster.setPosX(zj.Device.STANDARD_SCREEN_W);
                monster.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
                this.tableEnemyKey[pos] = v.id;
                var item = {};
                item["player"] = monster;
                item["force"] = true;
                this.tableCollision.push(item);
            }
        };
        StageSceneFightTeach.prototype.coverGeneral = function (pos, name) {
            var v = zj.teachBattle.teachLeftGeneral[name];
            var general = this.tableAllys[v.id];
            general.setVisible(true);
            general.setPosX(-50);
            general.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            this.tablePosKey[pos] = v.id;
            var item = {};
            item["player"] = general;
            item["force"] = false;
            this.tableCollision.push(item);
        };
        StageSceneFightTeach.prototype.appearLeftHelp = function (name) {
            var tbl = zj.teachBattle.teachLeftSupport[name];
            if (tbl == null) {
                return;
            }
            var generalId = tbl.id;
            var general = this.tableAllySupports[generalId];
            if (general != null) {
                var tmp = this.tableAllys[this.tablePosKey[tbl.pos]];
                if (tmp != null) {
                    tmp.setRelySupportRole(general);
                    general.setSenderRole(tmp);
                    this.dealSupport(general.senderRole);
                }
            }
        };
        StageSceneFightTeach.prototype.appearRightHelp = function (name) {
            var tbl = zj.teachBattle.teachRightSupport[name];
            if (tbl == null) {
                return;
            }
            var generalId = tbl.id;
            var general = this.tableEnemySupports[generalId];
            if (general != null) {
                this.dealOppSupport(general.senderRole);
            }
        };
        StageSceneFightTeach.prototype.leaveGeneral = function (name) {
            var generalId = zj.teachBattle.teachLeftGeneral[name].id;
            var general = this.tableAllys[generalId];
            if (general != null) {
                general.changeDir(zj.TableEnum.TableEnumDir.Dir_Left, true);
                general.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            }
        };
        StageSceneFightTeach.prototype.leaveMonster = function (name) {
            var monsterId = zj.teachBattle.teachRightGeneral[name].id;
            var monster = this.tableEnemys[monsterId];
            if (monster != null) {
                monster.changeDir(zj.TableEnum.TableEnumDir.Dir_Right, true);
                monster.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            }
        };
        StageSceneFightTeach.prototype.monsterGoFightPos = function (name) {
            var monsterId = zj.teachBattle.teachRightGeneral[name].id;
            var monster = this.tableEnemys[monsterId];
            if (monster != null) {
                monster.setGoGutPosTag(true);
                monster.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
                if (monster.x > monster.teamOriginalX) {
                    monster.changeDir(zj.TableEnum.TableEnumDir.Dir_Left, true);
                }
                else if (monster.x < monster.teamOriginalX) {
                    monster.changeDir(zj.TableEnum.TableEnumDir.Dir_Right, true);
                }
            }
        };
        StageSceneFightTeach.prototype.roleTransform = function (name) {
            var info = zj.teachBattle.teachLeftGeneral[name];
            if (info != null) {
                var key = this.tablePosKey[info.pos];
                var src = this.tableAllys[key];
                if (src != null) {
                    src.setVisible(false);
                    src.playLight();
                    this.cleanCollision(src);
                }
                var general = this.tableAllys[info.id];
                if (general != null) {
                    general.setVisible(true);
                    general.backHoming();
                    this.tablePosKey[info.pos] = info.id;
                    var item = {};
                    item["player"] = general;
                    item["force"] = false;
                    this.tableCollision.push(item);
                }
            }
        };
        StageSceneFightTeach.prototype.monsterGutEnd = function (monster) {
            monster.setInGut(false);
            monster.openRoleDcUI();
            //this.tableEnemys[generalId] = monster;
            //this.tableEnemyKey[pos] = monster.roleId;//这里有问题
            var item = {};
            item["player"] = monster;
            item["force"] = true;
            this.tableCollision.push(item);
        };
        StageSceneFightTeach.prototype.Update = function (tick) {
            if (zj.Gmgr.Instance.bDisconnectNet) {
                return;
            }
            _super.prototype.Update.call(this, tick);
            if (this.bMp4 == true) {
                return;
            }
            if (this.bDialog == true) {
                this.updateDialog(tick);
                return;
            }
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.timerTickTeach = this.timerTickTeach + cheatDt;
            this.updateFightTeach(cheatDt);
        };
        StageSceneFightTeach.prototype.updateDialog = function (tick) {
            zj.Story.update(zj.teachBattle.teachPart, this.teachEventIndex);
            if (zj.Story.isFinish()) {
                zj.Story.bFinish = false;
                this.bDialog = false;
                this.teachEventIndex = this.teachEventIndex + 1;
                if (zj.Gmgr.Instance.bPause == true) {
                    this.resumeAll();
                }
            }
        };
        StageSceneFightTeach.prototype.updateFightTeach = function (tick) {
            this.procTeachEvent(tick);
        };
        StageSceneFightTeach.prototype.procTeachEvent = function (tick) {
            var time = this.timerTickTeach * 1000;
            var len = zj.Helper.getObjLen(this.tableTeach);
            while (this.teachEventIndex <= len) {
                var i = this.teachEventIndex;
                while (i <= len) {
                    var info = this.tableTeach[i];
                    if (time >= info.time) {
                        if (info.event == zj.teachBattle.enumEvent.Event_Cover) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Left) {
                                this.coverGeneral(info.coverPos, info.role);
                            }
                            else if (info.pos == zj.teachBattle.enumPos.Pos_Right) {
                                this.coverMonster(info.coverPos, info.role);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Play_Skill) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Left) {
                                this.playGeneral(info.role, info.skillIndex, info.rolehead);
                            }
                            else if (info.pos == zj.teachBattle.enumPos.Pos_Right) {
                                this.playMonster(info.role, info.skillIndex, info.rolehead);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Leave) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Left) {
                                this.leaveGeneral(info.role);
                            }
                            else if (info.pos == zj.teachBattle.enumPos.Pos_Right) {
                                this.leaveMonster(info.role);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_GoPos) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Right) {
                                this.monsterGoFightPos(info.role);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Change) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Left) {
                                this.roleTransform(info.role);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Help) {
                            if (info.pos == zj.teachBattle.enumPos.Pos_Left) {
                                this.appearLeftHelp(info.role);
                            }
                            else if (info.pos == zj.teachBattle.enumPos.Pos_Right) {
                                this.appearRightHelp(info.role);
                            }
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Dialog) {
                            this.bDialog = true;
                            break;
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_Mp4) {
                            this.playMp4(2);
                        }
                        else if (info.event == zj.teachBattle.enumEvent.Event_End) {
                            this.bEnd = true;
                            zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                            //开始进入主城
                            //PushUI("Dialog_Story")
                        }
                    }
                    else {
                        break;
                    }
                    i = i + 1;
                }
                this.teachEventIndex = i;
                break;
            }
        };
        StageSceneFightTeach.prototype.playMp4 = function (index) {
            this.bMp4 = true;
            // let ui = PushUI("Common_Animation");
            // ui:LoadAni(index);
            // if(index == 1){
            // 	ui.rootNode:setOpacity(255)
            // }
            // loadUI(Common_Animation)
            //     .then((dialog: Common_Animation) => {
            //         dialog.LoadAni(index);
            //         dialog.show();
            //     });
        };
        return StageSceneFightTeach;
    }(zj.StageSceneFight));
    zj.StageSceneFightTeach = StageSceneFightTeach;
    __reflect(StageSceneFightTeach.prototype, "zj.StageSceneFightTeach");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightTeach.js.map