namespace zj {
/**战斗教学场景 */
export class StageSceneFightTeach extends StageSceneFight{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH);
		Gmgr.Instance.setFightTalentType(TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH);
		this.battleType = Gmgr.Instance.fightType;
		this.timerTickTeach = 0;
		this.instanceId = 888;
		this.teachEventIndex = 1;
		this.bDialog = false;
		this.bMp4 = false;
		this.bEnd = false;
		this.tableTeach = TableClientStoryTeach.Table();
		// this.playMp4(1);
	}
	public timerTickTeach;
	public teachEventIndex;
	public bDialog;
	public bMp4;
	public bEnd;
	public tableTeach;
	public adaptRoleY(y){
		return Math.floor(y / (Device.screenWidth/Device.STANDARD_SCREEN_W));
	}
	public getV(tbl, pos){
		for(let k in tbl){
			let v = tbl[k];
			if(v.pos == pos+1){
				return v;
			}
		}
		return null;
	}
	public loadExt(){
     	this.openFirstStart();
	}
	public loadMapId(){
		this.mapId = teachBattle.bgTeachId;
	}
	public loadSound(){
		Helper.PlaybgmByID ( 100006 );
	}
	public initRandSeed(){
		this.fightSeed = teachBattle.teachSeed;
	}
	public initMap(){
		this.loadMapId();            
    	this.LoadMap(this.mapId);
	}
	public initSection_Other(){
		//因为父类中instanceId设置的位置修改了（InitRes里面），所以此处需要再次设置一下
		this.instanceId = 888;
		this.initMap();
    	this.initFightNumber();
	}
	public loadAuto(){
		Gmgr.Instance.bFightAuto = false;
		this.bHideAuto = true;
		this.bLockAuto = false;
		this.bHideLimit = true;  
		this.bLockKey = false;
	}
	public Init(){
		super.Init();
		this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT;
	}
	public initLeftGenerals(){
		this.initTeachGeneralTalents();

		for(let k in teachBattle.teachLeftGeneral){
			let v = teachBattle.teachLeftGeneral[k];
			if(v.id != 0){
				let general = this._createTeachGel(v.pos, v.id);
			}
		}
	}
	public _createTeachGel(pos, roleId){
		let generalId = roleId;
		let aiId = -1;
		let coordinateIndex = pos;
		let teamIndex = pos-1;

		let x = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex-1];
		let y = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex-1]);
		 y = UIManager.StageHeight - y;   
    	let floor = y + Gmgr.Instance.upY;

		let general;
		general = new StagePersonLocal(this.getRoleLayer(false,pos), false);
		general.creatLocal(generalId,TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex,floor, x, y, TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState);
		general.creatEntryCd();

		general.setRage(99999);
		general.dealCutCdMin();
		general.setVisible(false);
		general.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		this.tableAllys[generalId] = general;
		return general;
	}
	public initTeachGeneralTalents(){
		for(let k in teachBattle.teachLeftGeneral){
			let v = teachBattle.teachLeftGeneral[k];
			if(v.id != 0){
				let [_every, _personal] =  Talentdb.createTeachPersonTalent(TableClientMonsterLocal.Item(v.id).talent_ids);
				Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT].push(_every);
				Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v.id] = _personal;
			}
		}
		for(let k in teachBattle.teachLeftSupport){
			let v = teachBattle.teachLeftSupport[k];
			if(v.id != 0){
				let [_every, _personal] =  Talentdb.createTeachPersonTalent(TableClientMonsterLocal.Item(v.id).talent_ids);
				Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT].push(_every);
				Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v.id] = _personal;
			}
		}
	}
	public initLeftSupports(){
		let queue = [0,1,2,3];
		for(let i = 0;i<queue.length;i++){
			let pos = queue[i];
			let v = this.getV(teachBattle.teachLeftSupport, pos);
			if(v != null){
				let general = this._createMyLocalSupport(pos, v.id);
				general.setRage(99999)
				general.dealCutCdMin()
				general.setVisible(false)
				general.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
		}
	}
	public _createOppTeachGel(pos, roleId, appearTag, isBoss){
		let generalId = roleId;  
		let aiId = -1;
		let coordinateIndex = pos;
		let teamIndex = pos-1;

		let x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[coordinateIndex]
		let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[coordinateIndex]);
		 y = UIManager.StageHeight - y;       
		let floor = y + Gmgr.Instance.upY;

		let general = null;
		general = new StagePersonLocal(this.getRoleLayer(true,pos), false);
		general.creatLocal(generalId,TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, teamIndex,floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, 1.0, this.eStageState)
		general.creatEntryCd() 
		general.setVisible(appearTag)      
		general.setRage(99999)
		general.dealCutCdMin()
		general.setForceAi(true)
		general.setLocalBoss(isBoss); 
		this.tableEnemys[generalId] = general;
		return general
	}
	public initRightMonsters(){
		for(let k in teachBattle.teachRightGeneral){
			let v = teachBattle.teachRightGeneral[k];
			if(v.id != 0){
				let monster = this._createOppTeachGel(2, v.id, true, v.isBoss);
				monster.closeRoleDcUI() 
				monster.setInGut(true)     
				monster.setPos(v.coordinate.x, adaptRoleY(UIManager.StageHeight - v.coordinate.y));
				monster.changeDir(v.dir, true);
			}
		}
	}
	public initRightSupports(){

	}
	public initSection_Mine(){
		this.initLeftGenerals();
		this.initLeftSupports();
	}
	public initSection_Opp(){
		this.initRightMonsters();
		this.initRightSupports();
	}
	public playGeneral(name, index, head){
		let tbl = teachBattle.teachLeftGeneral[name];
		if(tbl == null){
			return;
		}
		let generalId = tbl.id;
		let general = this.tableAllys[generalId];
		if(general != null){
			if(head == 1){
				this.helpRoleAniBegin(general);
			}
			general.playReplaySkill(index, 1);
		}
	}
	public playMonster(name, index, head){
		let tbl = teachBattle.teachRightGeneral[name];
		if(tbl == null){
			return;
		}
		let monsterId = tbl.id;
		let monster = this.tableEnemys[monsterId];
		if(monster != null){
			if(head == 1){
				this.oppHelpRoleAniBegin(monster);
			}
			monster.playReplaySkill(index, 1);
		}
	}
	public coverMonster(pos, name){
		let v = teachBattle.teachRightGeneral[name];
		let monster = this.tableEnemys[v.id];
		if(monster != null){
			monster.setInGut(false)
			monster.openRoleDcUI()
			monster.setVisible(true)
			monster.setLocalBoss(v.isBoss)
			monster.changeDir(TableEnum.TableEnumDir.Dir_Left, true) 
			monster.setPosX(Device.STANDARD_SCREEN_W) 
			monster.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
			this.tableEnemyKey[pos] = v.id;
			let item = {};
			item["player"] = monster;
        	item["force"] = true;
			this.tableCollision.push(item);
		}
	}
	public coverGeneral(pos, name){
		let v = teachBattle.teachLeftGeneral[name];
		let general = this.tableAllys[v.id];
		general.setVisible(true);
		general.setPosX(-50);
		general.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
		this.tablePosKey[pos] = v.id;
		let item = {};
		item["player"] = general;
		item["force"] = false;
		this.tableCollision.push(item);
	}
	public appearLeftHelp(name){
		let tbl = teachBattle.teachLeftSupport[name];
		if(tbl == null){
			return;
		}
		let generalId = tbl.id;
		let general = this.tableAllySupports[generalId];
		if(general != null){
			let tmp = this.tableAllys[ this.tablePosKey[tbl.pos] ];
			if(tmp != null){
				tmp.setRelySupportRole(general);
				general.setSenderRole( tmp );
				this.dealSupport(general.senderRole);
			}
		}
	}
	public appearRightHelp(name){
		let tbl = teachBattle.teachRightSupport[name];
		if(tbl == null){
			return;
		}
		let generalId = tbl.id;
		let general = this.tableEnemySupports[generalId];
		if(general != null){
			this.dealOppSupport(general.senderRole);
		}
	}
	public leaveGeneral(name){
		let generalId = teachBattle.teachLeftGeneral[name].id;
		let general = this.tableAllys[generalId];
		if(general != null){
			general.changeDir(TableEnum.TableEnumDir.Dir_Left, true);
        	general.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
		}
	}
	public leaveMonster(name){
		let monsterId = teachBattle.teachRightGeneral[name].id;
		let monster = this.tableEnemys[monsterId];
		if(monster != null){
			monster.changeDir(TableEnum.TableEnumDir.Dir_Right, true);
        	monster.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
		}
	}
	public monsterGoFightPos(name){
		let monsterId = teachBattle.teachRightGeneral[name].id;
		let monster = this.tableEnemys[monsterId];
		if(monster != null){
			monster.setGoGutPosTag(true);
        	monster.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
			if(monster.x > monster.teamOriginalX){
				monster.changeDir(TableEnum.TableEnumDir.Dir_Left, true);
			}else if(monster.x < monster.teamOriginalX){
				monster.changeDir(TableEnum.TableEnumDir.Dir_Right, true);
			}
		}
	}
	public roleTransform(name){
		let info = teachBattle.teachLeftGeneral[name];
		if(info != null){
			let key = this.tablePosKey[ info.pos ];
			let src = this.tableAllys[key];
			if(src != null){
				src.setVisible(false); 
            	src.playLight();
            	this.cleanCollision(src);
			}
			let general = this.tableAllys[info.id];
			if(general != null){
				general.setVisible(true)
				general.backHoming()        
				this.tablePosKey[ info.pos ] = info.id;
				let item = {};
				item["player"] = general;
				item["force"] = false;
				this.tableCollision.push(item);

			}
		}
	}
	public monsterGutEnd( monster ){
		monster.setInGut(false);
		monster.openRoleDcUI();
		//this.tableEnemys[generalId] = monster;
		//this.tableEnemyKey[pos] = monster.roleId;//这里有问题
		let item = {};
		item["player"] = monster;
		item["force"] = true;
		this.tableCollision.push(item);
	}
	public Update(tick){
		if(Gmgr.Instance.bDisconnectNet){
			return;
		}
		super.Update(tick);
		if(this.bMp4 == true){
			return;
		}
		if(this.bDialog == true){
			this.updateDialog(tick);
			return;
		}
		if(Gmgr.Instance.bPause == true){
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.timerTickTeach = this.timerTickTeach + cheatDt;
		this.updateFightTeach(cheatDt);
	}
	public updateDialog(tick){
		Story.update(teachBattle.teachPart, this.teachEventIndex);
		if(Story.isFinish()){
			Story.bFinish = false;
			this.bDialog = false;
			this.teachEventIndex = this.teachEventIndex + 1;
			if(Gmgr.Instance.bPause == true){
				this.resumeAll();
			}
		}
	}
	public updateFightTeach(tick){
		this.procTeachEvent(tick);
	}
	public procTeachEvent(tick){
		let time = this.timerTickTeach*1000;
		let len = Helper.getObjLen(this.tableTeach);
		while (this.teachEventIndex <= len){
			let i = this.teachEventIndex;
			while(i <= len){
				let info = this.tableTeach[i];
				if(time >= info.time){
					if(info.event == teachBattle.enumEvent.Event_Cover){
						if(info.pos == teachBattle.enumPos.Pos_Left){
							this.coverGeneral(info.coverPos, info.role);
						}else if(info.pos == teachBattle.enumPos.Pos_Right){
							this.coverMonster(info.coverPos, info.role);
						}
					}else if(info.event == teachBattle.enumEvent.Event_Play_Skill){
						if(info.pos == teachBattle.enumPos.Pos_Left){
							this.playGeneral(info.role, info.skillIndex, info.rolehead);
						}else if(info.pos == teachBattle.enumPos.Pos_Right){
							this.playMonster(info.role, info.skillIndex, info.rolehead);
						}
					}else if(info.event == teachBattle.enumEvent.Event_Leave){
						if(info.pos == teachBattle.enumPos.Pos_Left){
							this.leaveGeneral(info.role);
						}else if(info.pos == teachBattle.enumPos.Pos_Right){
							this.leaveMonster(info.role);
						}
					}else if(info.event == teachBattle.enumEvent.Event_GoPos){
						if(info.pos == teachBattle.enumPos.Pos_Right){
							this.monsterGoFightPos(info.role);
						}
					}else if(info.event == teachBattle.enumEvent.Event_Change){
						if(info.pos == teachBattle.enumPos.Pos_Left){
							this.roleTransform(info.role);
						}
					}else if(info.event == teachBattle.enumEvent.Event_Help){
						if(info.pos == teachBattle.enumPos.Pos_Left){
							this.appearLeftHelp(info.role);
						}else if(info.pos == teachBattle.enumPos.Pos_Right){
							this.appearRightHelp(info.role);
						}
					}else if(info.event == teachBattle.enumEvent.Event_Dialog){
						this.bDialog = true;
						break;
					}else if(info.event == teachBattle.enumEvent.Event_Mp4){
						this.playMp4(2);
					}else if(info.event == teachBattle.enumEvent.Event_End){
						this.bEnd = true;
						Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
						//开始进入主城
						//PushUI("Dialog_Story")
					}
				}else{
					break;
				}
				i = i + 1;
			}
			this.teachEventIndex = i;
			break
		}
	}
	public playMp4( index ){
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
	}
}
}