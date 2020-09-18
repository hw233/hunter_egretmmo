namespace zj {
export class StageSceneFightInLeauge extends StageScenePersonPath{
	public constructor(node, order) {
		super(node, order);
		this.setPlayerState( EnumPlayerState.PLAYER_STATE_FIGHT_OTHER )
		this.checkNode = null;
		this.button = null;
		this.menuCB = null;

		this.save_end_x = 0;
		this.save_end_y = 0;

		this.tiggerAreaEventTbl = [];
	}
	public checkNode;
	public button;
	public menuCB;
	public save_end_x;
	public save_end_y;
	public tiggerAreaEventTbl = [];

	public release(){
		super.release();
		if(this.checkNode != null){
			this.checkNode.removeChild(this.button);
       		this.button = null
		}
	}
	public startControl(){
		if(this.progressBoard && this.progressBar){
			this.progressBoard.visible = true;
    		this.progressBar.visible = true;
		}
	}
	public endControl(){
		if(this.progressBoard && this.progressBar){
			this.progressBoard.visible = false;
			this.progressBar.visible = false;
		}
	}
	public leaveControl(){
		if(this.bProgressing && this.progressBoard && this.progressBar){
			this.progressBoard.visible = false;
    		this.progressBar.visible = false;
		}
	}
	public Update(tick){
		super.Update(tick);
		this.procProgress(tick)
    	this.proTriggerArea();
	}
	public showCheckButton( open ){
		if(this.bVisible == false){
			return;
		}
		this.button.visible = open;
		if(this.ttfName != null && this.ttfName.visible == true){
			let color = yuan3(open == true, ConstantConfig_Common.Color.league_color.high_name_color, this.getNameColor());
			this.ttfName.textColor = color;
		}
	}
	public proTriggerArea(){
		if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
      this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND){
		  let eventTbl = this.tiggerAreaEventTbl;
		  this.tiggerAreaEventTbl = this.curScene.dealTriggerAreaThings(this.x, this.y, eventTbl);
	  }
	}
	public setMenuCB( cb ){
		this.menuCB = cb;
	}
	public getTargetPos(){
		let [tmp_x, tmp_y] = this.converScreenPos(this.targetPos);
		return [tmp_x, tmp_y];
	}
	public startStarPath(end_x, end_y, cb){
		if(this.otherState != TableEnum.TableEnumOtherState.OtherState_None){
			return;
		}
		if(this.isCanPath(end_x, end_y) == false){
			return;
		}
		if(Math.abs(this.save_end_x - end_x) <= 5 && Math.abs(this.save_end_y - end_y) <= 5){
			return;
		}
		this.save_end_x = end_x;
    	this.save_end_y = end_y;
		if(Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND ||
      Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORKBOSS){
		  this.startTarget(end_x, end_y, cb);
	  }else if(Gmgr.Instance.layerId == TableEnumLayerId.LAYER_LEAGUE_FIGHT ||
      Gmgr.Instance.layerId == TableEnumLayerId.LAYER_DARKLAND){
		  let screen_x = this.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
          let screen_y = this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);   

          this.setTargetCB(cb);
		  let beginPos = new egret.Point(screen_x, screen_y);
          let endPos = new egret.Point(end_x , end_y);
		  let path = PathFinder.calculate(beginPos, endPos, this.curScene.blocks, false, this.path);
		  this.path = path;
		  if(this.path != null){
			  this.targetEndPoint = endPos
              this.goToWalk();
		  }
	  }
	}
	public dealSimpleMoveNotice( simple ){
		super.dealSimpleMoveNotice(simple );
		if(this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE){
			if(this.curScene.bPosFinished == true){
				if(Gmgr.Instance.bInLoading == true){
					let [screen_x, screen_y] = this.converScreenPos(new egret.Point(simple.scene_x, simple.scene_y));
					this.setPos(screen_x, screen_y);
				}else{
					this.startStarPath(simple.scene_x, simple.scene_y,null);
				}
			}
		}
	}
	public dealSceneNotice( notice ){
		super.dealSceneNotice(notice );
		if(this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE){
			//异常处理
			if(this.otherState == TableEnum.TableEnumOtherState.OtherState_Die && notice.hpPre != 0){
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
			if(this.curScene.bPosFinished == true){
				if(Gmgr.Instance.bInLoading == true){
					let [screen_x, screen_y] = this.converScreenPos(new egret.Point(notice.posItem.scene_x, notice.posItem.scene_y));
                	this.setPos(screen_x, screen_y);
				}else{
					this.startStarPath(notice.posItem.scene_x, notice.posItem.scene_y,null);
				}
			}
		}else if(this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN){
			let [screen_x, screen_y] = this.converScreenPos(new egret.Point(notice.posItem.scene_x, notice.posItem.scene_y))
        	this.setPos(screen_x, screen_y);
		}
	}
	public dealRevive(){
		if(this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE && this.curScene.playerLeader != null){
			this.path = null;
			let [screen_x, screen_y] = this.converScreenPos(new egret.Point(this.scenePosInfo.posItem.scene_x, this.scenePosInfo.posItem.scene_y))
        	this.setPos(screen_x, screen_y);
		}
	}
	public dealDead(){
		if(Gmgr.Instance.bInLoading == false){
			if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS){
				if(this.sceneHpPercent == 0){
					this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_FallDown);
                	this.targetCB = null;
				}
			}else{
				if(this.bVisible == false){
					if(this.sceneHpPercent == 0){
						this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
					}
				}else{
					if(this.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE 
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN 
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE){
						if(this.sceneHpPercent == 0){
							this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
						}
					}
				}
			}
		}else{
			if(this.sceneHpPercent == 0){
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
			}
		}
	}
	public endFightShow(){
		this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		let [screen_x, screen_y] = this.converScreenPos(new egret.Point(this.scenePosInfo.posItem.scene_x, this.scenePosInfo.posItem.scene_y));
		this.setPos(screen_x, screen_y);
		if(this.showCB != null){
			this.showCB();
			this.showCB = null;
		}
	}
	public setPos( x, y ){
		super.setPos(x, y);
	}
	public getMapY(){
		return this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
	}
	public getNameColor(){
		if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND){
			return ConstantConfig_Common.Color.wonderland_color.memeber_color;
		}else if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND){
			return ConstantConfig_Common.Color.wonderland_color.memeber_color;
		}else if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS){
			return ConstantConfig_Common.Color.wonderland_color.memeber_color;
		}
	}
	public converScreenPos(pos){
		let screen_x = pos.x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
		let screen_y = pos.y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
		return [screen_x, screen_y];
	}
	public converPetPos(pos){
		let pet_x = pos.x - (this.moveDistance - this.x);
		let pet_y = pos.y - (this.verDistance - this.y);
		return [pet_x, pet_y];
	}
	public getMapPos(){
		let map_x = this.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
		let map_y = this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
		return [map_x, map_y];
	}
	public convertMapPos( screenPos ){
		let map_x = screenPos.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
		let map_y = screenPos.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
		return[ map_x, map_y];
	}
	public getCarryPet(){
		//当前是否携带宠物
		if(this.scenePosInfo.roleBase.petInfo == null){
			return false;
		}
		let carry = Table.FindFCall(this.scenePosInfo.roleBase.petInfo, function (_k, _v) {
				return _v.situtation == 1;
		},this);
		return carry;
	}
	public setPlayerPet( pet ){
		this.playerPet = pet;
	}
	public joinView(){
		this.bInView = true;

		if(this.bHidden == true){
			return;
		}
		this.setObjectVisible( true );
		let petJoinView = function (thisobj){
			thisobj.playerPet.bInView = true;
			if(thisobj.playerPet.bHidden == true){
				return;
			}
			thisobj.playerPet.setObjectVisible( true );
		}
		if(this.playerPet == null){
			let carry = this.getCarryPet();
			if(carry){
				this.curScene.addmemberPet(this);
			}
		}else{
			petJoinView(this);
		}
	}
	public leaveView(){
		this.bInView = false;
		this.setObjectVisible( false );
		if(this.commonLedAni != null){
			this.commonLedAni.setVisibleSpx(false);
		}
		this.leaveControl();
    	this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		if(this.playerPet != null){
			this.playerPet.bInView = false;
        	this.playerPet.setObjectVisible( false );
		}
	}
}
}