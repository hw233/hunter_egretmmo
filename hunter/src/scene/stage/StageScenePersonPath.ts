namespace zj {
	export class StageScenePersonPath extends StageScenePlayer {
		public constructor(node, order) {
			super(node, order);
			this.scenePosInfo = null;
			this.fightRoleInfo = null;
			this.wonderlandRoleInfo = null;
			this.collideEffect = null;
			this.targetEndPoint = null;
			this.declareIds = {};
			this.objectIds = {};
			this.battleMode = -1;
			this.bWillFight = false;

			// fish
			this.bInFish = 0;
			this.fishCss = null;

			this.joinType = message.ESceneItemType.SCENE_ITEM_TYPE_ROLE;
			this.posState = message.ESceneItemState.SCENE_ITEM_STATE_JOIN;

			this.bombLeftTime = -1;
			this.attackLeftTime = -1;
			this.bossHurt = -1;

			this.killCombo = 0;
			this.killTime = 0;
		}
		public collideEffect;
		public wonderlandRoleInfo;
		public declareIds;
		public targetEndPoint;
		public objectIds;
		public fightRoleInfo;
		public battleMode;
		public joinType;
		public bombLeftTime;
		public attackLeftTime;
		public bossHurt;
		public killCombo;
		public killTime;

		public createPlayer(scenePosInfo, floor, x, y, dir, moveDis, verDis, ePosType, bEnemy) {
			super.createPlayer(scenePosInfo, floor, x, y, dir, moveDis, verDis);
			this.setPlayerInfo(scenePosInfo.roleBase);
			this.setPositionType(ePosType);
			this.setIsEnemy(bEnemy);
			// todo
			this.commonCreate(floor, x, y, dir, moveDis, verDis);
		}
		public createWonderlandPlayer(scenePosInfo, floor, x, y, dir, moveDis, verDis) {
			this.setScenePosInfo(scenePosInfo);
			this.setPlayerInfo(scenePosInfo.roleBase);

			// todo
			this.commonCreate(floor, x, y, dir, moveDis, verDis);
		}
		public createZorkPlayer(scenePosInfo, floor, x, y, dir, moveDis, verDis) {
			this.setScenePosInfo(scenePosInfo);
			this.setPlayerInfo(scenePosInfo.roleBase);

			// todo
			this.commonCreate(floor, x, y, dir, moveDis, verDis);
		}
		public init() {
			this.parseInfo()
			this.loadDB()
			this.loadNormalSpx()
			this.loadBody()
			//this.loadMagicSkill()

			this.loadLedAni()
			//this.loadStorageSpx()
			//this.loadCollideEffect()

			this.loadBloodBar()
			this.loadDesignation()
			this.loadAura()
			this.loadProgressBar()

			this.loadLvTitle()
			this.loadNameTitle()
			this.loadLeagueNameTitle()
			this.loadGroupNameTitle()

			this.loadSpeed()
			this.loadScale()
			this.loadFishAni()
			this.loadChannelAni()
			this.adjustAniPos()
		}
		public loadSpeed() {
			this.moveSpeedX = StageScenePlayer.SP_DEFAULT_X;
			this.moveSpeedY = StageScenePlayer.SP_DEFAULT_X * 0.8;
		}
		public goToWalk() {
			let pos = this.path.currentWayPoint();
			let [screen_x, screen_y] = this.converScreenPos(pos);
			let [dir, walkDir] = this.judgeDir(screen_x, screen_y);
			this.walkDir = walkDir;
			this.changeDir(dir);
			this.changeState(TableEnum.TableEnumBaseState.State_Walk);
			this.setActLoop(true);
			this.bRunAstar = true;
		}
		public endPath() {
			this.path = null;
			this.bRunAstar = false;
			this.saveDir = TableEnum.TableEnumDir.Dir_None;
			this.walkDir = TableEnum.EnumDepthDir.Dir_None;
			this.changeState(TableEnum.TableEnumBaseState.State_None);
			if (this.targetCB != null) {
				this.targetCB(this.targetCBThis);
				this.targetCBThis = null;
			}
		}
		public isCanPath(map_x, map_y) {
			//  map_y = map_y - 300;
			let i = Math.floor(map_x / this.curScene.Block_Width);
			let j = Math.floor(map_y / this.curScene.Block_Width);
			let key = Helper.StringFormat("%d_%d", i, j);
			if (this.curScene.blocks[key] != null && this.curScene.blocks[key].couldCross == true) {
				return true
			}
			return false;
		}
		public setScenePosInfo(scenePosInfo) {
			this.scenePosInfo = scenePosInfo;
		}
		public setFightRoleInfo(fightRoleInfo) {
			this.fightRoleInfo = fightRoleInfo;
		}
		public setWonderlandRoleInfo(wonderlandRoleInfo) {
			this.wonderlandRoleInfo = wonderlandRoleInfo;
		}
		public setTitlePos(x, y) {
			let [w0, w1, w2, w3, w4, w5, w6, w7] = [0, 0, 0, 0, 0, 0, 0, 0];
			let [h0, h1, h2, h3, h4, h5, h6, h7] = [0, 0, 0, 0, 0, 0, 0, 0];

			let _x = x + this.aniUpOffsetX;
			let _y = y - this.aniUpOffsetY;
			if (this.bloodBoard != null) {
				w0 = this.bloodBoard.width;
				h0 = this.bloodBoard.height;
				this.bloodBoard.x = _x;
				this.bloodBoard.y = _y;
				if (this.bloodBar != null) {
					this.bloodBar.x = _x - this.bloodBarWidth / 2;
					this.bloodBar.y = _y - 3;
				}
			}
			if (this.ttfName != null) {
				w1 = this.ttfName.width;
				h1 = this.ttfName.height;
			}
			_y = _y - h0 / 2 - h1 / 2;
			if (this.ttfLv != null) {
				w2 = this.ttfLv.width;
			}
			if (this.ttfName != null) {
				w3 = this.ttfName.width;
			}
			let dis = (w2 + w3 + ConstantConfig_LeagueHome.LV_NAME_X_OFFSET) / 2;
			if (this.ttfLv != null) {
				_y = _y - ConstantConfig_LeagueHome.BLOOD_NAME_Y_OFFSET;
				this.ttfLv.x = _x - dis;
				this.ttfLv.y = _y;
			}
			if (this.ttfName != null) {
				this.ttfName.x = this.ttfLv.x + this.ttfLv.width + 5;
				this.ttfName.y = this.ttfLv.y;
			}
			if (this.nameBoard != null) {
				let [t_x, t_y] = [this.ttfLv.x, this.ttfLv.y];
				this.nameBoard.x = _x;
				this.nameBoard.y = t_y;
			}
			if (this.ttfName != null) {
				w4 = this.ttfName.width;
				h4 = this.ttfName.height;
			}

			if (this.designation != null) {
				// (this.designation as eui.Image).source = "ui_title_titlebig_titlebig21_png";
				this.designation.x = _x;
				this.designation.y = _y - 36;
				_y -= 44;
			}

			_y = _y - h1 / 2 - h4 / 2;
			if (this.ttfLeagueName != null) {
				w5 = this.ttfLeagueName.width;
				h5 = 20;//this.ttfLeagueName.height;
			}
			if (this.leagueStar != null) {
				w5 = w5 + this.leagueStar.width * this.leagueStar.scaleX + 5;
				w5 = w5 + 5;
			}
			if (this.leagueStar != null) {
				_y = _y - ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET
				this.leagueStar.x = _x - w5/2;
				this.leagueStar.y = _y - 5;
			}
			if (this.ttfLeagueName != null) {
				_y = _y - ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
				this.ttfLeagueName.x = _x + w5/2 - this.ttfLeagueName.width;
				this.ttfLeagueName.y = _y;
			}
			if (this.ttfGroupName != null) {
				w6 = this.ttfGroupName.width;
				h6 = this.ttfGroupName.height;
			}
			_y = _y - h5 / 2 - h6 / 2;
			if (this.ttfGroupName != null) {
				_y = _y + ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
				this.ttfGroupName.x = _x;
				this.ttfGroupName.y = _y;
			}
			if (this.designation != null) {
				w7 = this.designation.width;
				h7 = this.designation.height;
			}
			_y = _y - h6 / 2 - h7 / 2;
			let _save_y = _y;
			_y = _save_y - h4 / 2 - h5 / 2;
			if (this.progressBoard) {
				_y = _y - ConstantConfig_LeagueHome.LEAGUE_PROGRESS_Y_OFFSET
				this.progressBoard.x = _x;
				this.progressBoard.y = _y;
			}
			if (this.progressBar) {
				let [t_x, t_y] = [this.x, this.y];
				this.progressBar.x = t_x - this.progressBarWidth / 2;
				this.progressBar.y = t_y;
			}
			_y = _save_y - h4 / 2 - ConstantConfig_Rpg.COMMON_LED_OFFSET_Y;
			if (this.commonLedAni != null) {
				this.commonLedAni.SetPosition(_x, _y);
			}
			if (this.collideEffect != null) {
				this.collideEffect.SetPosition(x, y);
			}
		}
		public changeFightShowAtk(dir, x, y, CB) {
			this.showNum = 0
			this.showFrame = 0
			//this.fightPosState = this.posState
			this.endFrozen()
			this.endProgress()
			this.changeDir(dir)
			this.setRoot(x, y)
			this.setRecPetFpPos(dir, x, y)
			//this.setLieRoot(x, y)
			this.changeState(TableEnum.TableEnumBaseState.State_None)
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_FightShowAtk);
			this.setShowCB(CB);
			this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
			this.showHpCurFrame = 0;
			if (this.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_LEADER) {
				if (this.sceneHpPercent > 0) {
					this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
				}
			}
		}
		public changeFightShowBeAtk(dir, x, y, CB) {
			this.showNum = 0
			this.showFrame = 20
			//this.fightPosState = this.posState
			this.endFrozen()
			this.endProgress()
			this.changeDir(dir)
			this.setRoot(x, y)
			this.setRecPetFpPos(dir, x, y)
			//this.setLieRoot(x, y)
			this.changeState(TableEnum.TableEnumBaseState.State_None)
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk);
			this.setShowCB(CB);
			this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
			this.showHpCurFrame = 0;
		}
		public dealSimpleMoveNotice(simple) {
			this.setPosState(simple.posState);
		}
		public dealSceneNotice(notice) {
			this.setScenePosInfo(notice)
			this.setPosState(notice.posItem.posState);
			this.setJoinType(notice.posItem.joinerType);
			// this.setScenePosState( notice.posItem.posState )
			// recovery_hp
			if (this.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
				this.setSceneHpPercent(notice.hpPre, notice.recovery_hp);
			} else {
				this.setSceneHpPercent(notice.hpPre, notice.hpPre);
			}
			this.setDieProtectTime(notice.deadProtectTime);
			this.setInvincibleTime(notice.invincibleTime);
			this.setFasterTime(notice.fasterTime);
			this.setFrozenTime(notice.frozenTime);
			this.setPlayerBuffInfo(notice);
			this.setControlBuild(notice.buildId);
			//this.setDeclardIds(notice.declareIds)
			//this.setObjectIds(notice.objectIds)
			this.setBattleMode(notice.battleMode);
			this.dealProgress();
			this.dealSceneBuff();
			this.dealRevive();
			this.dealDead();
		}
		public dealFightRoleInfo(message) {
			this.setFightRoleInfo(message)
			this.setPosState(message.posItem.posState)
			this.setJoinType(message.posItem.joinerType)
			//this.setScenePosState( message.posItem.posState )
			this.setSceneHpPercent(message.hpPre, message.hpPre)
			this.setDieProtectTime(message.deadProtectTime)
			this.setInvincibleTime(message.invincibleTime)
			this.setFasterTime(message.fasterTime)
			this.setFrozenTime(message.frozenTime)
			this.setPlayerBuffInfo(message);
			this.setControlBuild(message.buildId)
			this.setAddBloodLeftTime(message.addBloodLeftTime);
			this.setAddSpeedLeftTime(message.addSpeedLeftTime);
			this.dealProgress();
			this.dealSceneBuff();
			this.dealRevive();
			this.dealDead();
		}
		public setPlayerBuffInfo(notice) {

		}
		public dealRevive() {

		}
		public dealDead() {

		}
		public dealWonderlandRoleInfo(message) {
			this.setWonderlandRoleInfo(message);
			this.dealFightRoleInfo(message.posInfo);
			this.setBattleMode(message.posInfo.battleMode);
		}
		public dealLeaguewarRoleInfo(message) {
			this.dealFightRoleInfo(message.posInfo);
		}
		public dealZorkRoleInfo(message) {
			this.dealFightRoleInfo(message.posInfo);
			this.setBossHurt(message.bossHurt);
		}
		public dealSceneBuff() {
			if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MACHINE_FASTER) {
				this.addSceneBuff(TableEnum.Enum.SceneBuffType.Fast, this.fasterTime)
				this.dealTips(TableEnum.Enum.SceneBuffType.Fast, this.fasterTime / 1000);
			} else {
				if (this.fasterTime > 0) {
					this.addSceneBuff(TableEnum.Enum.SceneBuffType.Fast, this.fasterTime);
				}
			}
			if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MACHINE_ADDBLOOD) {
				this.addSceneBuff(TableEnum.Enum.SceneBuffType.RecoverBlood, -1);
				let last = this.lastHpPercent;
				if (last <= 1) {
					last = 1;
				}
				let cur = this.sceneHpPercent;
				if (cur <= 1) {
					cur = 1;
				}
				this.dealTips(TableEnum.Enum.SceneBuffType.RecoverBlood, Math.floor((cur - last)));
				if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_FRUIT_DOUBLE) {
					this.dealTips(TableEnum.Enum.SceneBuffType.CollectDouble, -1);
				}
				if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_FROZEN) {
					this.addSceneBuff(TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime);
					this.dealTips(TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime / 1000);
				}
				if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BOMB) {
					this.addSceneBuff(TableEnum.Enum.SceneBuffType.Bomb, -1);
					let last = this.lastHpPercent;
					if (last <= 1) {
						last = 1;
					}
					let cur = this.sceneHpPercent;
					if (cur <= 1) {
						cur = 1;
					}
					this.dealTips(TableEnum.Enum.SceneBuffType.Bomb, Math.floor((last - cur)));
				}
			}
		}
		public dealTips(type, num) {

		}
		public setBattleMode(mode) {
			this.battleMode = mode;
		}
		public setBossHurt(value) {
			this.bossHurt = value;
		}
		public setBombLeftTime(time) {
			//秒
			this.bombLeftTime = time * 1000;
		}
		public setAttackLeftTime(time) {
			//毫秒
			this.attackLeftTime = time;
		}
		public dealAtkBoss() {
			if (Gmgr.Instance.bInLoading == false) {
				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
					if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_ATTACKBOSS) {
						this.playSkill(this.scenePosInfo.kill_combo);
						this.setKillTime(this.scenePosInfo.kill_time);
					}
				}
			}
		}
		public setKillTime(killTime) {
			this.killTime = killTime;
		}
		public setDeclardIds(declareIds) {
			this.declareIds = {};
			for (let i = 0; i < declareIds.length; i++) {
				let key = declareIds[i].key;
				let value = declareIds[i].value;
				this.declareIds[key] = value * 1000;
			}
		}
		public setObjectIds(objectIds) {
			this.objectIds = {};
			for (let i = 0; i < objectIds.length; i++) {
				let key = objectIds[i].key;
				let value = objectIds[i].value;
				this.objectIds[key] = value * 1000;
			}
		}
		//宣战时间结束并且进入战斗阶段
		public isDeclareTimeEnd(key) {
			let tag = false;
			if (this.declareIds[key] != null && this.declareIds[key] <= 0) {
				tag = true;
			}
			if (this.objectIds[key] != null && this.objectIds[key] <= 0) {
				tag = true;
			}
			return tag;
		}
		//宣战关系是否成立
		public isDeclareRelation(key) {
			//检测自己是和平模式
			//已经宣战 或 对方是杀戮模式
			//检测自己是战斗模式
			let tag = false;
			if (this.declareIds[key] != null) {
				tag = true;
			}
			if (this.objectIds[key] != null) {
				tag = true;
			}
			return tag;
		}
		private pathWalkPos = new egret.Point();
		public updatePathWalk() {
			if (this.bRunAstar == false) {
				return;
			}
			if (this.path == null) {
				return;
			}
			let pos = this.path.currentWayPoint();
			let [screen_x, screen_y] = this.converScreenPos(pos);
			let [dir, walkDir] = this.judgeDir(screen_x, screen_y);
			if (walkDir != this.walkDir) {
				this.walkDir = walkDir;
			}
			let [map_x, map_y] = this.getMapPos();
			if (this.path.isArrivedCurrentPoint(this.pathWalkPos.setTo(map_x, map_y))) {
				this.path.goToNextWayPoint();
				if (this.path.finished() == true) {
					this.endPath();
				} else {
					this.goToWalk();
				}
			}
		}
		public getMapPos() {
			return [0, 0]
		}
		//获得战斗模式
		public getBattleMode() {
			return this.battleMode;
		}
		//获得联盟id
		public getLegId() {
			return this.playerInfo.leagueId;
		}
		//刷新人物颜色
		public flashTtfNameColor(color) {
			if (color != this.nameColor && this.ttfName != null) {
				this.nameColor = color;
				this.ttfName.textColor = color;
			}
		}
		public loadChannelAni() {
			if (Gmgr.Instance.layerId != TableEnumLayerId.LAYER_ZORKBOSS) {
				return;
			}
			this.channelCss = new eui.Group();
			this.nodeUp.addChild(this.channelCss);
			let ccitem = TableClientAniUi.Item(301002);
			let item = TableClientAniCssSource.Item(ccitem.css_id);
			this.channelCss.removeChildren();
			this.channelCss.visible = false;
			Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then((display) => {
				this.channelCss.addChild(display);
			});
		}
		public updateChannelAni() {
			if (Gmgr.Instance.layerId != TableEnumLayerId.LAYER_ZORKBOSS) {
				return;
			}
			if (this.channelCss != null) {
				if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_ATTACKBOSS) {
					if (this.channelCss.visible == false) {
						this.channelCss.visible = true;
					}
				} else {
					if (this.channelCss.visible == true) {
						this.channelCss.visible = false;
					}
				}
			}
		}
		public loadFishAni() {
			if (this.playerInfo.id != Game.PlayerInfoSystem.RoleID) {
				return;
			}
			this.fishCss = new eui.Group();
			this.nodeUp.addChild(this.fishCss);

			this.fishCss.visible = false;
		}
		public adjustAniPos() {
			if (this.fishCss != null) {
				if (this.designation != null) {
					this.fishCss.x = 0;
					this.fishCss.y = -this.aniUpOffsetY - 100 - 20;
				} else {
					this.fishCss.x = 0;
					this.fishCss.y = -this.aniUpOffsetY - 65;
				}
			}
			if (this.channelCss != null) {
				if (this.designation != null) {
					this.channelCss.x = 0;
					this.channelCss.y = -this.aniUpOffsetY - 100 - 20;
				} else {
					this.channelCss.x = 0;
					this.channelCss.y = -this.aniUpOffsetY - 65;
				}
			}
		}
		public procBattleTime(tick) {
			let rt = tick * 1000;
			for (let k in this.declareIds) {
				let v = this.declareIds[k];
				v = v - rt;
				if (v <= 0) {
					v = 0;
				}
			}
			for (let k in this.objectIds) {
				let v = this.objectIds[k];
				v = v - rt;
				if (v <= 0) {
					v = 0;
				}
			}
		}
		public Update(tick) {
			super.Update(tick);
			this.procHp();
			this.procDieProtect(tick);
			this.procFastTime(tick);
			this.procInvincibleTime(tick);
			this.procBattleTime(tick);
			this.updateFish(null);
			this.updateChannelAni();
			this.procEffects(null);
			this.procHitEffects(null);
		}
		public updateFish(args) {
			//有问题
			if (this.fishCss != null) {
				if (this.bInFish == 1) {
					//下杆中
					if (this.fishCss.visible == false) {
						this.fishCss.visible = true;
					}
					if (this.pre_fish_state != 1) {
						let ccitem = TableClientAniUi.Item(301000);
						let item = TableClientAniCssSource.Item(ccitem.css_id);
						this.fishCss.removeChildren();
						Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then((display) => {
							this.fishCss.addChild(display);
						});
					}
				} else if (this.bInFish == 2) {
					//可收杆
					if (this.fishCss.visible == false) {
						this.fishCss.visible = true;
					}
					if (this.pre_fish_state != 2) {
						let ccitem = TableClientAniUi.Item(301001);
						let item = TableClientAniCssSource.Item(ccitem.css_id);
						this.fishCss.removeChildren();
						Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then((display) => {
							this.fishCss.addChild(display);
						});
					}
				} else {
					//钓鱼无状态
					if (this.fishCss.visible == true) {
						this.fishCss.visible = false;
					}
					if (this.pre_fish_state != 2 || this.pre_fish_state != 1) {
						this.fishCss.removeChildren();
					}
				}
			}
		}
		public procHp() {
			if (this.bVisible == false) {
				return;
			}
			let hpP = 0;
			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
				if (this.showHpCurFrame >= this.showHpMaxFrame) {
					this.showHpCurFrame = this.showHpMaxFrame;
				}
				hpP = this.showHp - (this.showHp - this.sceneHpPercent) / this.showHpMaxFrame * this.showHpCurFrame;
				this.bWillFight = false;
			} else if (this.otherState != TableEnum.TableEnumOtherState.OtherState_Die) {
				if (this.bWillFight == true) {
					hpP = this.lastHpPercent;
				} else {
					if (this.sceneHpPercent < this.destHpPercent) {
						this.sceneHpPercent = this.sceneHpPercent + this.recoveryHpProgress;
						if (this.sceneHpPercent > this.destHpPercent) {
							this.sceneHpPercent = this.destHpPercent;
						}
						hpP = this.sceneHpPercent;
					} else {
						hpP = this.destHpPercent;
					}
				}
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				hpP = 0;
			}
			if (hpP != this.uiHp && this.bloodBar != null) {
				this.uiHp = hpP;
				this.bloodBar.width = this.bloodBarWidth * hpP / 100;
				this.bloodBar.height = this.bloodBarHeight;
			}
		}
		public resetMoveNet() {

		}
		private rectBeInScope: egret.Rectangle = new egret.Rectangle();
		private posBeInScope: egret.Point = new egret.Point();
		public beInScope(x, y) {
			let tag = false;
			let rect = this.rectBeInScope.setTo(this.x - this.bodyWidth / 2, this.y - this.bodyHeight, this.bodyWidth, this.bodyHeight);
			if (rect.containsPoint(this.posBeInScope.setTo(x, y))) {
				tag = true;
			}
			return tag;
		}
		public getBodyCenter() {
			let p = new egret.Point(this.x, this.y + this.bodyHeight / 2);
			return p;
		}
		private rectVisibleRt: egret.Rectangle = new egret.Rectangle();
		public getVisibleRt() {
			return this.rectVisibleRt.setTo(this.x - this.bodyWidth / 2, this.y, this.bodyWidth, this.bodyHeight);
		}
		public setJoinType(eType) {
			this.joinType = eType;
		}
		public getJoinType(eType) {
			return this.joinType;
		}
		public setPosState(eState) {
			this.posState = eState;
		}
		public getPosState() {
			return this.posState;
		}
		public procCurSkill(tick) {
			if (this.curSkill == null) {
				return true;
			}
			let tag = this.curSkill.getIsFinish();
			if (tag == true) {
				this.resetSkill();
				this.recoverOriginalState();
			} else {
				this.curSkill.update(tick);
			}
			return false;
		}
		public resetSkill() {
			this.curSkill = null
			this.curSkillIdx = TableEnum.TableEnumOperate.Operate_None;
		}
		public recoverOriginalState() {
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		}
		public procEffects(tick) {
			let i = 0;
			while (i < this.tableEffects.length) {
				let tEffect = this.tableEffects[i];
				let bFinish = tEffect.getIsFinish();
				if (bFinish == true) {
					CC_SAFE_DELETE(tEffect);
					this.tableEffects.splice(i, 1);
				} else {
					tEffect.update(tick);
					i = i + 1;
				}
			}
		}
		//处理命中特效	
		public procHitEffects(tick) {
			let i = 0;
			while (i < this.tableHits.length) {
				let tEffect = this.tableHits[i];
				let bFinish = tEffect.getIsFinish();
				if (bFinish == true) {
					CC_SAFE_DELETE(tEffect);
					this.tableHits.splice(i, 1);
				} else {
					tEffect.update(tick);
					i = i + 1;
				}
			}
		}
		public getEffectLayer(effect) {
			let follow = effect.getIsFollowRole();
			if (follow) {
				return this.nodeEffect;
			} else {
				let layerId = Gmgr.Instance.layerId;
				let scene = StageSceneManager.Instance.GetCurScene();
				return scene.getEffectLayer(this);
			}
		}
		public setCurSkill(index) {
			let tSkill = null;
			let tIndex = 0;
			if (index <= 0 || index > this.tableMagicSkills.length) {
				return false;
			}
			if (index == TableEnum.Enum.ZorkSkill.Attack && this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
				return false;
			}
			tIndex = index
			tSkill = this.tableMagicSkills[index];
			this.curSkillIdx = tIndex;
			this.curSkill = tSkill;

			return true;
		}
		public playSkill(index) {
			if (this.setCurSkill(index) == true) {
				//减豆
				this.skillFollow(index);
				return true
			}
			return false;
		}
		public skillFollow(index) {
			if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
				if (this.playerState != EnumPlayerState.PLAYER_STATE_BOSS) {
					this.changeDir(TableEnum.TableEnumDir.Dir_Right);
				}
			}
			if (index == TableEnum.Enum.ZorkSkill.Bomb) {
				let [tag, cd] = SkillCdMgr.Instance.isSkillExit(this.curSkill);
				this.reduceBean();
				if (cd != null && cd.isPause() == true) {
					cd.setIsPause(false);
					cd.openNext();
				}
			}
			this.changeState(TableEnum.TableEnumBaseState.State_None);
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Attack);
			this.curSkill.playRoleSkill();
		}
		public dealHitEffect(hitId, hitX, hitY) {
			//let hit = new SkillHit()
		}
		public dealHit(hitId) {
			if (hitId != -1) {
				let [x, y] = this.getHitPos();
				this.dealHitEffect(hitId, x, y);
			}
		}
		public dealHurtValue(aType, value) {
			let [numX, numY] = this.getHurtNumPos();
			if (aType == 0) {
				this.creatHurtNum2(numX, numY, value);
			} else if (aType == TableEnum.Enum.ZorkSkill.Bomb) {
				this.creatHurtNum3(numX, numY, value);
			} else if (aType == TableEnum.Enum.ZorkSkill.Attack) {
				this.creatHurtNum(numX, numY, value);
			}
		}
		public getHitPos() {
			let hitX = 0;
			let hitY = 0;
			function rand() {
				let r = TsMtirand() % 2;
				if (r == 0) {
					return -1;
				} else {
					return 1;
				}
			}
			hitX = this.x + this.hitEffectOffsetNorX + TsMtirand() % 30 * rand();
			hitY = this.y + this.hitEffectOffsetNorY + TsMtirand() % 30 * rand();
			return [hitX, hitY];
		}
		public addEffect(effect) {
			let follow = effect.getIsFollowRole();
			if (follow == true) {
				let tag = true //this.getIsEffectFollowMe(effect);
				if (tag != true) {
					this.tableEffects.push(effect);
				}
			} else {
				let layerId = Gmgr.Instance.layerId;
				let scene = StageSceneManager.Instance.GetCurScene();
				scene.addEffect(effect);
			}
		}
		//删除特效
		public clearEffects(force) {
			let i = 0;
			while (i < this.tableEffects.length) {
				let tEffect = this.tableEffects[i];
				if (force == true) {
					CC_SAFE_DELETE(tEffect);
					this.tableEffects.splice(i, 1);
				} else {
					i = i + 1;
				}
			}
		}
		public creatHurtNum(baseX, baseY, hurtV) {
			let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
			num.newSetData();
			num.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum1, hurtV, ConstantConfig_CommonBattle.shanghainum1.w, ConstantConfig_CommonBattle.shanghainum1.h, ConstantConfig_CommonBattle.shanghainum1.offset);
			num.setPosition(baseX, baseY);
			num.start();
		}
		public creatHurtNum2(baseX, baseY, hurtV) {
			let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
			num.newSetData();
			num.setNumberInfo(UIConfig.UIConfig_FightNumber.baojinum, hurtV, ConstantConfig_CommonBattle.baojinum.w, ConstantConfig_CommonBattle.baojinum.h, ConstantConfig_CommonBattle.baojinum.offset);
			num.setPosition(baseX, baseY);
			num.start();
		}
		public creatHurtNum3(baseX, baseY, hurtV) {
			let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
			num.newSetData();
			num.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum3, hurtV, ConstantConfig_CommonBattle.shanghainum3.w, ConstantConfig_CommonBattle.shanghainum3.h, ConstantConfig_CommonBattle.shanghainum3.offset)
			num.setPosition(baseX, baseY);
			num.start();
		}
		public getHurtNumPos() {
			let numX = 0;
			let numY = 0;

			function rand() {
				let r = TsMtirand() % 2;
				if (r == 0) {
					return -1;
				} else {
					return 1;
				}
			}
			numX = this.x + this.hurtNumOffsetNorX + TsMtirand() % 30 * rand();
			numY = this.y + this.hurtNumOffsetNorY + TsMtirand() % 30 * rand();
			return [numX, numY];
		}
		public isBeanMax() {
			return yuan3(this.curBeanNum == this.maxBeanNum, true, false);
		}
		public isBeanEmpty() {
			return yuan3(this.curBeanNum == 0, true, false);
		}
		public addBean() {
			if (this.curBeanNum < this.maxBeanNum) {
				this.curBeanNum = this.curBeanNum + 1;
			}
		}
		public reduceBean() {
			if (this.curBeanNum > 0) {
				this.curBeanNum = this.curBeanNum - 1;
			}
		}
		public setKillCombo(killCombo) {
			this.killCombo = killCombo;
		}
		public setCurBeanNum(num) {
			this.curBeanNum = num;
		}
		public getCurBeanNum() {
			return this.curBeanNum;
		}
		public handleTalentEffect_EntryTime() {
			return 0;
		}
		//获得人物炸弹技能
		public getPressSkill() {
			return this.tableMagicSkills[TableEnum.Enum.ZorkSkill.Bomb - 1];
		}
	}
}