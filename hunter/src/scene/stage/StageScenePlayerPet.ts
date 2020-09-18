namespace zj {
export class StageScenePlayerPet extends StageScenePlayer{
	public constructor(node, order) {
		super(node, order);

		// 宠物相关
		this.petBody = null
		this.petScale = 0.4
		
		this.personStandTime = 0
		this.petWanderAngle = 0
		this.petWanderTime = 0
		this.petWanderStopTime = 0

		// show
		this.ttfName = null
		this.nameColor = null
		this.name = null

		this.aniUpOffsetX = 0
		this.aniUpOffsetY = 0

		// bool
		this.bInView = true
		this.bRevived = false
		this.bHidden = false

		this.petSpeed = 0.35
		this.gapW = 110
		this.gapH = 1
		this.turnW = 30

		this.lastFlip = null
		this.nowFlip = -1
		this.actionId = -1
		this.state = TableEnum.TableEnumBaseState.State_None;
		this.bCarryed = false
		this.speedRate = 0.95
	}
	public petSpeed;
	public gapW;
	public gapH;
	public turnW;
	public lastFlip;
	public nowFlip;
	public bCarryed;
	public speedRate;
	public petBody;
	public petScale;
	public personStandTime;
	public petWanderAngle;
	public petWanderTime;
	public petWanderStopTime;
	public a_speedX;
	public a_speedY;
	public a_time;
	public v_speedX;
	public v_speedY;
	public carryPetInfo;
	public nodePet;
	public maxSpeedX;
	public maxSpeedY;
	public currMoveSpeedX;
	public currMoveSpeedY;
	public master;
	public resetMoveData(){
		this.a_speedX = ConstantConfig_Rpg.PetMove.AX;
		this.a_speedY = ConstantConfig_Rpg.PetMove.AY;
		this.a_time = ConstantConfig_Rpg.PetMove.CONTINUE_TIME;
		this.v_speedX = ConstantConfig_Rpg.PetMove.VX;
		this.v_speedY = ConstantConfig_Rpg.PetMove.VY;
	}
	public release(){
		super.release();
		this.master = null;
		if(this.petBody){
			this.petBody.clearSpine();
			this.petBody = null;
		}
	}
	public createPlayerPet(master, x, y, dir){
		 // body
		this.setPetMaster( master )
		this.carryPetInfo = null;

		// 宠物层
		this.nodePet = new eui.Group();
		this.nodePos.addChild(this.nodePet)

		this.nodeDown = new eui.Group();
		this.nodePos.addChild(this.nodeDown)


		this.init()   

		this.setTitlePos(0, 0)
		//this.changeDir(dir)
		this.setFirstPetPos()
		this.procState(0)
		this.bInZone = true

		this.maxSpeedX = master.moveSpeedX || 0.35
		this.maxSpeedY = master.moveSpeedY
		this.currMoveSpeedX = 0
		this.currMoveSpeedY = 0
		this.resetMoveData();
	}
	public init(){
		this.getCarryPetInfo();
		this.parseInfo();
		this.loadPet();
		if(this.bCarryed){
			this.loadScale();
		}
		this.loadNameTitle();
	}
	//设置主人
	public setPetMaster( master ){
		this.master = master;
	}
	public spineId;
	//maproleId 和 宠物名字
	public parseInfo(){
		if(this.bCarryed){
			this.spineId = Adviserdb.GetPetEvolution(this.carryPetInfo.pet_id, this.carryPetInfo);
		}else{
			this.spineId = -1;
		}
		this.name = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_own,this.master.playerInfo.name)
	}
	//宠物形象
	public loadPet(){
		if(!this.bCarryed){
			this.nodePet.visible = false;
			this.nodeDown.visible = false;
			return
		}
		if(this.spineId == -1){
			return;
		}
		if(this.petBody){
			this.petBody.clearSpine();
			this.petBody = null;
		}
		this.nodePet.visible = true;
		this.nodeDown.visible = true;
		let item = TableClientAniSpineSource.Item(this.spineId);
		[this.petBody] = HunterSpineX(this.spineId, this.petScale,null,item.json);
		if(!this.petBody){
			[this.petBody] = HunterSpineX(0,this.petScale,null,MapSceneLoading.BlackRole);
			Game.DragonBonesManager.preloadDragonbone(StageSceneManager.Instance.temporaryScene,item.json)
			.then(()=>{
				if(this.petBody){
					this.petBody.clearSpine();
					this.petBody = null;
				}
				[this.petBody] = HunterSpineX(this.spineId,this.petScale,null,item.json);
				this.nodeNormal.addChild(this.petBody.spine);
				this.actionId = -1;
				this.petBody.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Stand);
				this.titlePos();
			})
			.catch((error)=>{

			});
		}
		this.petBody.ChangeAction(TableEnum.TableEnumPetOtherState.OtherState_Stand,item.json);
		this.nodePet.addChild(this.petBody.spine);
		
		this.loadSlots();
	}
	//是否被携带
	public getCarryPetInfo(){
		let petInfo = this.master.scenePosInfo.roleBase.petInfo;
		this.bCarryed = false
    	this.carryPetInfo = null;
		for(let k in petInfo){
			let v = petInfo[k];
			if(v.situtation == 1){
				this.carryPetInfo = v;
				this.bCarryed = true;
				return;
			}
		}
	}
	public resetPetBody( petInfo ){
		this.setCarryPetInfo(petInfo);
		this.getCarryPetInfo();
		this.parseInfo();
		this.loadPet();
		
		if(this.bCarryed){
			this.loadScale();
		}
		this.resetName();
    	this.setTitlePos(0, 0);
	}
	//宠物信息
	public setCarryPetInfo( petInfo ){
		this.carryPetInfo = petInfo;
	}
	public loadNameTitle(){
		this.ttfName = new eui.Label(this.name);
		this.ttfName.size = 20;
		this.ttfName.bold = true;

		let _color = this.getNameColor();
		this.nameColor = _color
		this.ttfName.textColor = _color;
		this.ttfName.anchorOffsetY = this.ttfName.height;
		this.nodePet.addChild(this.ttfName);
	}
	public resetName(){
		if(this.ttfName != null){
			this.ttfName.text = this.name;
		}
	}
	//宠物身高
	public loadScale(){
		let bone_up_x = this.petBody.spine.armature.getBone("buff_up").global.x;
        let bone_up_y = this.petBody.spine.armature.getBone("buff_up").global.y;

		this.bodyHeight = this.petScale * bone_up_y;
		this.aniUpOffsetY = this.bodyHeight + 10;

		this.bodyWidth = this.petScale * this.bodyWidth;
	}
	public Update(tick){
		if(!this.bCarryed){
			return;
		}

		this.updateZone();
		this.procState(tick);
		this.updatePetPos(tick);  
		// 设置宠物面向
		this.updatePetAspect(tick);
		this.flashOrder();
		this.updatePetSpineAction();
	}
	public updatePetSpineAction(){
		if((! this.bCarryed) ||
      this.master.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
      this.master.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk ||
      this.master.otherState == TableEnum.TableEnumOtherState.OtherState_Die || 
      this.master.otherState == TableEnum.TableEnumOtherState.OtherState_GetUp){
		  return;
	  }
	  if(this.state == TableEnum.TableEnumBaseState.State_None){
		  this.changeAction(TableEnum.TableEnumPetOtherState.OtherState_Stand);
	  }else if(this.state == TableEnum.TableEnumBaseState.State_Walk){
		  this.changeAction(TableEnum.TableEnumPetOtherState.OtherState_Run);
	  }
	}
	public procSpeed( tick ){
		let rt = tick * 1000;
		if(this.a_time > 0){
			let tmpAccTime = rt;
			this.a_time = this.a_time - rt;
			if(this.a_time < 0){
				tmpAccTime = tmpAccTime + this.a_time;
			}
			this.v_speedX = this.v_speedX + this.a_speedX * tmpAccTime;
        	this.v_speedY = this.v_speedY + this.a_speedY * tmpAccTime;
		}
		this.currMoveSpeedX = yuan3(this.v_speedX > this.maxSpeedX, this.maxSpeedX, this.v_speedX );
    	this.currMoveSpeedY = yuan3(this.v_speedY > this.maxSpeedY, this.maxSpeedY, this.v_speedY );
	}
	//宠物面向及走位
	public updatePetAspect(tick){
		if(this.master.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
		this.master.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk ||
		this.master.otherState == TableEnum.TableEnumOtherState.OtherState_StirUp || 
		this.master.otherState == TableEnum.TableEnumOtherState.OtherState_StirDown ||
		this.master.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown || 
		this.master.otherState == TableEnum.TableEnumOtherState.OtherState_GetUp){
			//基类操作
			this.updateOtherFightPos();
			return;
	  }
	  	this.procSpeed( tick );
    	this.changeAction();

		let masterSpeed = this.currMoveSpeedX
		let masterAddSpeed = this.master.faster_ratio || 1
		this.petSpeed = masterSpeed * masterAddSpeed * this.speedRate;

		let diff = Math.abs(this.moveDistance - this.master.moveDistance);
		let sp = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Left, -1, 1);
		let delay = sp * this.petSpeed * tick * 1000;
		let mapLength = this.curScene.mapWidth;
		let sp1 = yuan3(this.master.dir == TableEnum.TableEnumDir.Dir_Left, 1, -1);

		if(this.master.dir == TableEnum.TableEnumDir.Dir_Left){
			let diff_tmp = Math.abs(this.x - (this.master.x +this.gapW));
			if(this.dir == TableEnum.TableEnumDir.Dir_Left){
				if(this.master.x + this.gapW <= this.x){
					this.moveDistance = this.moveDistance - Math.abs(delay);
					if(Math.abs(this.moveDistance - this.master.moveDistance) < this.gapW){
						this.moveDistance = this.master.moveDistance + this.gapW;
					}
				}else{
					this.dir = TableEnum.TableEnumDir.Dir_Right;
					this.moveDistance = this.moveDistance + Math.abs(delay);
					if(this.x > this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.dir = TableEnum.TableEnumDir.Dir_Left
                    	this.moveDistance = this.master.moveDistance + this.gapW;
					}
				}
			}else if(this.dir == TableEnum.TableEnumDir.Dir_Right){
				if(this.master.x+this.gapW >= this.x){
					this.moveDistance = this.moveDistance + Math.abs(delay);
					if(this.x > this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.dir = TableEnum.TableEnumDir.Dir_Left;
                    	this.moveDistance = this.master.moveDistance + this.gapW;
					}
				}else{
					this.dir = TableEnum.TableEnumDir.Dir_Left;
					if(Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.moveDistance = this.moveDistance - Math.abs(delay);
					}
				}
			}
		}else if(this.master.dir == TableEnum.TableEnumDir.Dir_Right){
			if(this.dir == TableEnum.TableEnumDir.Dir_Right){
				if(this.master.x - this.gapW >= this.x){
					this.moveDistance = this.moveDistance + Math.abs(delay);
					if(Math.abs(this.moveDistance - this.master.moveDistance) < this.gapW){
						this.moveDistance = this.master.moveDistance - this.gapW;
					}
				}else{
					this.dir = TableEnum.TableEnumDir.Dir_Left;
					this.moveDistance = this.moveDistance - Math.abs(delay);
					if(this.x < this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.dir = TableEnum.TableEnumDir.Dir_Right;
						this.moveDistance = this.master.moveDistance - this.gapW;
					}
				}
			}else if(this.dir == TableEnum.TableEnumDir.Dir_Left){
				if(this.master.x-this.gapW <= this.x){
					this.moveDistance = this.moveDistance - Math.abs(delay);
					if(this.x < this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.dir = TableEnum.TableEnumDir.Dir_Right;
                    	this.moveDistance = this.master.moveDistance - this.gapW;
					}
				}else{
					this.dir = TableEnum.TableEnumDir.Dir_Right;
					if(Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW){
						this.moveDistance = this.moveDistance + Math.abs(delay);
					}
				}
			}
		}
		let dealyV = this.currMoveSpeedY * masterAddSpeed * tick * 1000;
		let diffV = Math.abs(this.y - (this.master.y + this.gapH ));
		if(this.master.verDistance + this.gapH < this.verDistance){
			this.verDistance = this.verDistance - Math.abs(dealyV);
			if(Math.abs(this.verDistance - this.master.verDistance) <= this.gapH){
				this.verDistance = this.master.verDistance + this.gapH;
			}
		}else if(this.master.verDistance + this.gapH > this.verDistance){
			this.verDistance = this.verDistance + Math.abs(dealyV);
			if(this.verDistance - this.master.verDistance >= this.gapH){
				this.verDistance = this.master.verDistance + this.gapH;
			}
		}
		let [screen_x, screen_y] = this.master.converPetPos(new egret.Point(this.moveDistance, this.verDistance));
		this.setPos(screen_x, screen_y);
		this.SetPetState();
	}
	public updateOtherFightPos(){
		this.setFightShowPos();
	}
	public changeOtherFightShowAtk(){
		this.state = TableEnum.TableEnumBaseState.State_None;
		this.dir = this.master.fp_dir;
		this.changeAction(TableEnum.TableEnumPetOtherState.OtherState_Skill);
		this.setFightShowPos();
	}
	public setFightShowPos(){
		let [x, y] = [0, 0];
		if(this.master.fp_dir == TableEnum.TableEnumDir.Dir_Left){
			x = this.master.fpX  + (this.master.fpMoveDistance - this.curScene.playerLeader.moveDistance) + this.gapW;
        	y = this.master.fpY + (this.master.fpVerDistance - this.curScene.playerLeader.verDistance) + this.gapH;
		}else if(this.master.fp_dir == TableEnum.TableEnumDir.Dir_Right){
			x = this.master.fpX  + (this.master.fpMoveDistance - this.curScene.playerLeader.moveDistance) - this.gapW;
        	y = this.master.fpY + (this.master.fpVerDistance - this.curScene.playerLeader.verDistance) + this.gapH;
		}
		this.setPos(x, y);
	}
	public changeOtherDie(){
		this.changeAction(TableEnum.TableEnumPetOtherState.OtherState_Cry);
	}
	public changeOtherGetUp(){
		this.changeAction(TableEnum.TableEnumPetOtherState.OtherState_Stand)
    	this.setFirstPetPos();
	}
	public procState( tick ){
		let tag;
		if(this.master.state == TableEnum.TableEnumBaseState.State_None){
			tag = this.procStateNone(tick);
		}else if(this.master.state == TableEnum.TableEnumBaseState.State_Walk){
			this.personStandTime = 0;
			this.petWanderTime = 0;
			this.petWanderStopTime = 0;
		}
	}
	public changeAction( actionId? ){
		let bFlipX = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Left, false, true);
		this.setFlipX(bFlipX);
		if(this.actionId == actionId || actionId == null){
			return;
		}
		this.actionId = actionId;
		if(this.actionId == TableEnum.TableEnumPetOtherState.OtherState_Run){
			this.resetMoveData();
		}
		if(this.petBody != null){
			this.petBody.ChangeAction(actionId);
		}
	}
	public setFlipX( flip ){
		if(this.petBody != null){
			let coefficient = flip && 1 || -1; 
			this.petBody.setScaleX(coefficient * this.petScale);
		}
	}
	public setFirstPetPos( ){
		this.dir = this.master.dir;
		let sp = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Left, 1, -1);
		this.moveDistance = this.master.moveDistance + sp * this.gapW
		this.verDistance = this.master.verDistance + this.gapH
		this.changeAction();
		this.setPos(this.master.getPosX() + sp * this.gapW, this.master.getPosY() + this.gapH);

		this.SetPetState()
	}
	public updatePetPos( tick ){

	}
	public updateZone(){

	}
	public flashOrder(){
		// if self.bInZone == true then        
		// 	if self.saveOrder ~= self.master.saveOrder then
		// 		self.saveOrder = self.master.saveOrder
		// 		--self.nodeRoot:setLocalZOrder(self.saveOrder)
		// 		self.nodeRoot:setLocalZOrder(self.saveOrder)
		// 	end        
    	// end
	}
	public getMapY(){
		return this.master.y - 1;
	}
	public procStateNone( tick ){

	}
	public SetPetState(){
		let diff = Math.abs(this.moveDistance - this.master.moveDistance);
		diff = Math.ceil(diff);
		if(diff>110){
			diff = 110;
		}
		if(diff == this.gapW && this.master.state != TableEnum.TableEnumBaseState.State_Walk){
			this.state = TableEnum.TableEnumBaseState.State_None;
		}else{
			this.state = TableEnum.TableEnumBaseState.State_Walk;
		}
	}
	public getNameColor(){
		if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND){
			return ConstantConfig_Common.Color.wonderland_color.leader_color;
		}else if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND){
			return ConstantConfig_Common.Color.wonderland_color.leader_color;
		}else if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS){
			return ConstantConfig_Common.Color.wonderland_color.leader_color;
		}
	}
	
}
}