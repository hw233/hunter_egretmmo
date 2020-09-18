namespace zj {
	export class AiBrain {
		public role;
		public id;
		public fightScene;
		public constructor(role, id) {
			this.role = role;
			this.id = id;
			this.fightScene = StageSceneManager.Instance.GetCurScene();
		}
		public resetData() {

		}
		public release() {
			this.role = null;
			this.fightScene = null;
		}
		protected startHelp(){
			this.fightScene.startHelp(this.role.senderRole);
		}
		protected startOppHelp(){
			this.fightScene.startOppHelp(this.role.senderRole);
		}
		protected dealHelp() {
			let time = 0;
			if (this.role.bEnemy == false) {
				time = this.fightScene.leftAiCd;
			} else if (this.role.bEnemy == true) {
				time = this.fightScene.rightAiCd;
			}
			let aiType = this.role.tableSkillAi[message.ESkillType.SKILL_TYPE_HANDLE].aiType;
			if (aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_NORMAL) {
				if (this.fightScene.beInPvp() == false) {
					if (time == 0) {
						this.startHelp();
					}
				} else {
					if (time == 0) {
						if (this.role.bEnemy == false) {
							this.startHelp();
						} else {
							this.startOppHelp();
						}
					}
				}
			} else if (aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
				if (this.fightScene.beInPvp() == false) {
					if (this.fightScene.bBossAppear == true) {
						if (this.fightScene.isBossAiTagFun() == true) {
							this.startHelp();
						}
					}
				} else {
					if (this.role.bEnemy == false) {
						if (this.fightScene.beOppAiCanBreak(false) == true) {
							this.startHelp();
						}
					} else {
						if (this.fightScene.beOppAiCanBreak(true) == true) {
							this.startOppHelp();
						}
					}
				}
			} else if (aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_RECOVER) {
				if (this.fightScene.beInPvp() == false) {
					if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {
						this.startHelp();
					}
				} else {
					if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {
						if (this.role.bEnemy == false) {
							this.startHelp();
						} else {
							this.startOppHelp();
						}
					}
				}
			}
			if (this.fightScene.beInPvp() == false) {
				if (this.fightScene.getAverageHp(this.fightScene.tableAllys) <= ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
					this.startHelp();
				}
			} else {
				if (this.role.bEnemy == false) {
					if (this.fightScene.getAverageHp(this.fightScene.tableAllys) <= ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
						this.startHelp();
					}
				} else {
					if (this.fightScene.getAverageHp(this.fightScene.tableEnemys) <= ConstantConfig_RoleBattle.AI_HELP_RECOVER_POINT) {
						this.startOppHelp();
					}
				}
			}
		}
		public updateHelp() {
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
		}
		public updateAll() {
			let tableContainer = [];
			if (this.fightScene.checkOppAnyReady(this.role.bEnemy) == false) {
				return;
			}
			if (this.role.bPauseBlack) {
				return;
			}
			let time = 0;
			if (this.role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
				if (this.role.bEnemy == false) {
					time = this.fightScene.leftAiCd;
				} else if (this.role.bEnemy == true) {
					time = this.fightScene.rightAiCd;
				}
			}
			for (let i = message.ESkillType.SKILL_TYPE_DEATH; i > message.ESkillType.SKILL_TYPE_COMMON; i--) {
				if (i == message.ESkillType.SKILL_TYPE_COMMON) {
					continue;
				}
				if (this.role.tableSkillAi[i] == null) {
					continue;
				}
				if (this.role.bDead == false && this.role.bMomentDead == false && this.role.getIsOnFloor() == true) {
					if (this.role.tableSkillAi[i].aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_NORMAL) {
						if (time > 0) {
							continue;
						}
					} else if (this.role.tableSkillAi[i].aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
						if (this.fightScene.beOppAiCanBreak(this.role.bEnemy) == true) {

						} else {
							if (time > 0) {
								continue;
							}
						}
					} else if (this.role.tableSkillAi[i].aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_RECOVER) {
						if (this.fightScene.beMyAiCanRecover(this.role, this.role.bEnemy) == true) {

						} else {
							continue;
						}
					}
					this.role.getAccordSkill(tableContainer, i);
				}
			}
			if (tableContainer.length > 0) {
				let a = tableContainer[0];
				if (this.role.playSkill(a.skillType, a.index) == true) {
					if (this.role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
						let scene = StageSceneManager.Instance.GetCurScene();
						if (this.role.bEnemy == false) {
							if (a.skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
								scene.dealSkillUi(this.role);
							} else if (a.skillType == message.ESkillType.SKILL_TYPE_DEATH) {
								scene.dealDeathUi(this.role);
							}
						}
					}
				}
			}
		}
		public update(tick) {
			if (GlobalBattleConfig.ai == false) {
				return;
			}
			//召唤怪应该单独走另一套ai
			if (this.role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
				this.updateAll();
			} else {
				if (this.role.bEnemy == true) {
					if (this.role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
						this.updateHelp();
					} else {
						this.updateAll();
					}
				} else {
					if (Gmgr.Instance.bFightAuto == true) {
						if (this.role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
							this.updateHelp();
						} else {
							this.updateAll();
						}
					}
				}
			}
		}
	}
}