var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var AiBrain = (function () {
        function AiBrain(role, id) {
            this.role = role;
            this.id = id;
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
        }
        AiBrain.prototype.resetData = function () {
        };
        AiBrain.prototype.release = function () {
            this.role = null;
            this.fightScene = null;
        };
        AiBrain.prototype.startHelp = function () {
            this.fightScene.startHelp(this.role.senderRole);
        };
        AiBrain.prototype.startOppHelp = function () {
            this.fightScene.startOppHelp(this.role.senderRole);
        };
        AiBrain.prototype.dealHelp = function () {
            var time = 0;
            if (this.role.bEnemy == false) {
                time = this.fightScene.leftAiCd;
            }
            else if (this.role.bEnemy == true) {
                time = this.fightScene.rightAiCd;
            }
            var aiType = this.role.tableSkillAi[message.ESkillType.SKILL_TYPE_HANDLE].aiType;
            if (aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_NORMAL) {
                if (this.fightScene.beInPvp() == false) {
                    if (time == 0) {
                        this.startHelp();
                    }
                }
                else {
                    if (time == 0) {
                        if (this.role.bEnemy == false) {
                            this.startHelp();
                        }
                        else {
                            this.startOppHelp();
                        }
                    }
                }
            }
            else if (aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
                if (this.fightScene.beInPvp() == false) {
                    if (this.fightScene.bBossAppear == true) {
                        if (this.fightScene.isBossAiTagFun() == true) {
                            this.startHelp();
                        }
                    }
                }
                else {
                    if (this.role.bEnemy == false) {
                        if (this.fightScene.beOppAiCanBreak(false) == true) {
                            this.startHelp();
                        }
                    }
                    else {
                        if (this.fightScene.beOppAiCanBreak(true) == true) {
                            this.startOppHelp();
                        }
                    }
                }
            }
            else if (aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_RECOVER) {
                if (this.fightScene.beInPvp() == false) {
                    if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {
                        this.startHelp();
                    }
                }
                else {
                    if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {
                        if (this.role.bEnemy == false) {
                            this.startHelp();
                        }
                        else {
                            this.startOppHelp();
                        }
                    }
                }
            }
            if (this.fightScene.beInPvp() == false) {
                if (this.fightScene.getAverageHp(this.fightScene.tableAllys) <= zj.ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
                    this.startHelp();
                }
            }
            else {
                if (this.role.bEnemy == false) {
                    if (this.fightScene.getAverageHp(this.fightScene.tableAllys) <= zj.ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
                        this.startHelp();
                    }
                }
                else {
                    if (this.fightScene.getAverageHp(this.fightScene.tableEnemys) <= zj.ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
                        this.startOppHelp();
                    }
                }
            }
        };
        AiBrain.prototype.updateHelp = function () {
            if (this.role.senderRole == null) {
                return;
            }
            if (this.role.senderRole.getRage() < this.role.getSupportConsume()) {
                return;
            }
            if (!this.role.senderRole.isPlaySkillLegeal()) {
                return;
            }
            if (this.role.bPauseBlack) {
                return;
            }
            if (this.fightScene.checkOppAnyReady(this.role.bEnemy) == false) {
                return;
            }
            this.dealHelp();
        };
        AiBrain.prototype.updateAll = function () {
            var tableContainer = [];
            if (this.fightScene.checkOppAnyReady(this.role.bEnemy) == false) {
                return;
            }
            if (this.role.bPauseBlack) {
                return;
            }
            var time = 0;
            if (this.role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                if (this.role.bEnemy == false) {
                    time = this.fightScene.leftAiCd;
                }
                else if (this.role.bEnemy == true) {
                    time = this.fightScene.rightAiCd;
                }
            }
            for (var i = message.ESkillType.SKILL_TYPE_DEATH; i > message.ESkillType.SKILL_TYPE_COMMON; i--) {
                if (i == message.ESkillType.SKILL_TYPE_COMMON) {
                    continue;
                }
                if (this.role.tableSkillAi[i] == null) {
                    continue;
                }
                if (this.role.bDead == false && this.role.bMomentDead == false && this.role.getIsOnFloor() == true) {
                    if (this.role.tableSkillAi[i].aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_NORMAL) {
                        if (time > 0) {
                            continue;
                        }
                    }
                    else if (this.role.tableSkillAi[i].aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
                        if (this.fightScene.beOppAiCanBreak(this.role.bEnemy) == true) {
                        }
                        else {
                            if (time > 0) {
                                continue;
                            }
                        }
                    }
                    else if (this.role.tableSkillAi[i].aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_RECOVER) {
                        if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {
                        }
                        else {
                            continue;
                        }
                    }
                    this.role.getAccordSkill(tableContainer, i);
                }
            }
            if (tableContainer.length > 0) {
                var a = tableContainer[0];
                if (this.role.playSkill(a.skillType, a.index) == true) {
                    if (this.role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                        var scene = zj.StageSceneManager.Instance.GetCurScene();
                        if (this.role.bEnemy == false) {
                            if (a.skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
                                scene.dealSkillUi(this.role);
                            }
                            else if (a.skillType == message.ESkillType.SKILL_TYPE_DEATH) {
                                scene.dealDeathUi(this.role);
                            }
                        }
                    }
                }
            }
        };
        AiBrain.prototype.update = function (tick) {
            if (zj.GlobalBattleConfig.ai == false) {
                return;
            }
            //召唤怪应该单独走另一套ai
            if (this.role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                this.updateAll();
            }
            else {
                if (this.role.bEnemy == true) {
                    if (this.role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                        this.updateHelp();
                    }
                    else {
                        this.updateAll();
                    }
                }
                else {
                    if (zj.Gmgr.Instance.bFightAuto == true) {
                        if (this.role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                            this.updateHelp();
                        }
                        else {
                            this.updateAll();
                        }
                    }
                }
            }
        };
        return AiBrain;
    }());
    zj.AiBrain = AiBrain;
    __reflect(AiBrain.prototype, "zj.AiBrain");
})(zj || (zj = {}));
//# sourceMappingURL=AiBrain.js.map