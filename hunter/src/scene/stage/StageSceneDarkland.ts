namespace zj {
export class StageSceneDarkland extends StageSceneRpg{
	public constructor() {
		super();
		this.floor = 100;
		this.playersNum = 0

		this.playerLeader = null;    
		this.orderCnt = 1
		this.timer_tick = 0
	}
	public floor;
	public playersNum;
	public orderCnt;
	public timer_tick;
	public count;

	public OnLoading( percent ){
		super.OnLoading(percent);
		switch (percent){
            case 51:
                this.InitRes();
                break;
            case 71:
				this.initMapBlock();
                break;
            case 76:
                this.initMobs();
                break;
            case 81:
                this.initMember();
                break;
            case 86:
                this.proofLeaderPos(Game.PlayerWonderLandSystem.darkland.roleInfo["posInfo"].posItem);
        		this.bPosFinished = true;
                break;
            case 91:
				 this.mainMenu = newUI(DarkLandChoose);
				 this.mainMenu.show();
                break;
			case 96:
                // uicache.Add("Common_Annouce", null, true)
                break;
        }
	}
	public InitRes(){
		Gmgr.Instance.preLayerId = Gmgr.Instance.layerId;
		Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_DARKLAND);

		Gmgr.Instance.bInSceneFight = false; 
		this.mainMenu = null
		this.sceneType = Game.PlayerWonderLandSystem.darkland.roleInfo["posInfo"].posItem.sceneType
		this.count = 0

		// this.InitScene();
		let MapId = 41;
		this.LoadMap(MapId)

		this.initCellNode()
		this.initTmx()

		this.initLeader() 
		this.initLeaderPet()
		this.initTrees()  
		this.flashSceneLeaderColor()

		this.initBuilds(StringConfig_Table.darklandlandMap, Game.PlayerWonderLandSystem.darkland.darklandId);
	}
	public release(){
		super.release();
		CC_SAFE_DELETE(this.playerLeader)
	}
	public Init(){
		super.Init();
		Helper.PlaybgmByID ( 100001 );
		//更新时间差值
		this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
		Game.PlayerWonderLandSystem.loadingPosInfo = {};
		this.proofTime();
		Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS,this.SceneItemPosNotice_Visit,this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO,this.SceneItemPosInfoNotice_Visit,this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT,this.LeagueWarBattleResultNotice_Visit,this);
	}
	public SceneItemPosNotice_Visit(ev: egret.Event){
		let body = (<message.SceneItemPosNoticeRequest>ev.data).body;
		if (body == undefined || body == null) return;
		this.updateSimplePos( Game.PlayerWonderLandSystem.noticePosInfo );
        Game.PlayerWonderLandSystem.noticePosInfo = {};
	}
	public SceneItemPosInfoNotice_Visit(ev: egret.Event){
		let body = (<message.SceneItemPosInfoNoticeRequest>ev.data).body;
		if (body == undefined || body == null) return;
		if(this.playerLeader != null){
			if(Helper.getObjLen(Game.PlayerWonderLandSystem.loadingPosInfo) > 0){
				this.updateNoticePos( Game.PlayerWonderLandSystem.loadPosInfo )
                Game.PlayerWonderLandSystem.loadPosInfo = {}
			}
			this.updateNoticePos( Game.PlayerWonderLandSystem.timePosInfo );
            Game.PlayerWonderLandSystem.timePosInfo = {};
		}
	}
	public LeagueWarBattleResultNotice_Visit(ev: egret.Event){
		let body = (<message.BattleImitateResultNoticeRequest>ev.data).body;
		if (body == undefined || body == null) return;
		this.beAtkNoticeResult();
	}
	public initLeader(){
		let order = this.orderCnt;
		let leader = new StageSceneFightLeader(this.map, this.MapBlockH); 
		let x = 0
		let y = 0
		let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
		let dir = TableEnum.TableEnumDir.Dir_Right;

		leader.createWonderlandPlayer(scenePosInfo, this.floor, x, y, dir, x, y) 
		leader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo); 
		leader.dealSceneNotice(scenePosInfo);
		if(scenePosInfo.hpPre == 0){
			leader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
		}
		this.playerLeader = leader;
		this.orderCnt = this.orderCnt + 1;
	}
	public initLeaderPet(){
		let pet = new StageScenePlayerPet(this.map, this.MapBlockH);
		let x = -70
		let y = 0
		let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
		let dir = TableEnum.TableEnumDir.Dir_Right;

		pet.createPlayerPet(this.playerLeader, x, y, dir);
		this.playerLeaderPet = pet;    
		
		this.orderCnt = this.orderCnt + 1;

		this.playerLeader.setPlayerPet( pet );
	}
	public initTrees(){
		for(let k in Game.PlayerWonderLandSystem.scenePosInfo){
			let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
			if(v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION){
				continue;
			}
			this.addTree(v);
		}
	}
	public addTree( scenePosInfo ){
		if(scenePosInfo.posItem.sceneType != this.sceneType){
			return;
		}
		if(scenePosInfo.posItem.scene_x > this.mapWidth || scenePosInfo.posItem.scene_y > this.mapHeight){
			return;
		}
		let tbl = TableWonderlandTree.Table();
		let tree_id = scenePosInfo.buildId;
		let v = tbl[tree_id];
		if(v == null){
			return;
		}
		let key = scenePosInfo.roleBase.id;
		let posItem = (scenePosInfo as message.ScenePosInfo).posItem;
		let tree = new StageRpgTree(this.map, this.MapBlockH);
		tree.InitTree(v, scenePosInfo);
		this.tableTrees[key] = tree;
		return tree; 
	}
	public initMobs(){
		for(let k in Game.PlayerWonderLandSystem.scenePosInfo){
			let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
			if(v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS){
				continue;
			}
			if(this.tableMembers[v.roleBase.id] != null){
				continue;
			}
			this.addMob(v, null, null);
		}
	}
	public isModExist( t ){
		for(let k in t){
			let v = t[k];
			if(v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS){
				return true;
			}
		}
		return false;
	}
	public addMob(scenePosInfo, x, y){
		let order = this.orderCnt;
		let mob = new StageSceneFightMob(this.map, this.MapBlockH)
		let floor = 200
		let dir = TableEnum.TableEnumDir.Dir_Left

		let [map_x, map_y] = this.proofMobPos(scenePosInfo.posItem.scene_x, scenePosInfo.posItem.scene_y);
		let screen_x = map_x - (this.playerLeader.moveDistance - this.playerLeader.x);
		let screen_y = map_y - (this.playerLeader.verDistance - this.playerLeader.y);

		mob.createWonderlandMob(scenePosInfo,floor, screen_x, screen_y, dir, screen_x, screen_y)
		mob.setPos(screen_x, screen_y);

		this.tableMembers[scenePosInfo.roleBase.id] = mob;
		this.orderCnt = this.orderCnt + 1;
	}
	public addMember(scenePosInfo, x, y){
		let order = this.orderCnt
		let member = new StageSceneFightInLeauge(this.map, this.MapBlockH)
		let floor = 200
		let dir = TableEnum.TableEnumDir.Dir_Right;

		let screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x)
		let screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y)


		member.createWonderlandPlayer(scenePosInfo,floor, screen_x, screen_y, dir, screen_x, screen_y)
		member.dealSceneNotice(scenePosInfo)

		this.tableMembers[scenePosInfo.roleBase.id] = member

		this.orderCnt = this.orderCnt + 1


		this.addmemberPet( member )
	}
	public addmemberPet( member ){
		let carry = member.getCarryPet();
		if(carry){
			let pet = new StageScenePlayerPet(this.map, this.MapBlockH)   
			let x = -70
			let y = 0
			let dir = TableEnum.TableEnumDir.Dir_Right

			pet.createPlayerPet(member, x, y, dir)    
			this.tableMemberPets[member.scenePosInfo.roleBase.id] = pet  
		
			this.orderCnt = this.orderCnt + 1

			this.tableMembers[member.scenePosInfo.roleBase.id].setPlayerPet( pet );
		}
	}
	public initMember(){
		for(let k in Game.PlayerWonderLandSystem.scenePosInfo){
			let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
			if(v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_ROLE){
				continue;
			}
			if(v.roleBase.id == Game.PlayerInfoSystem.RoleID){
				continue;
			}
			if(this.tableMembers[v.roleBase.id] != null){
				continue;
			}
			this.addMember(v, null, null);
		}
	}
	public delMember( key_id ){
		if(this.tableMembers[key_id] != null){
			CC_SAFE_DELETE(this.tableMembers[key_id]);
        	CC_SAFE_DELETE(this.tableMemberPets[key_id]);
		}else if(this.cacheMembers[key_id] != null){
			CC_SAFE_DELETE(this.cacheMembers[key_id]);
			
		}
		delete this.tableMembers[key_id];
		delete this.tableMemberPets[key_id];
		delete this.cacheMembers[key_id];
		delete Game.PlayerWonderLandSystem.scenePosInfo[key_id];
	}
	public SetTreeBlock( tree ){
		let hor = (tree.map_x - tree.info.balk_rt[2]/1) / this.Block_Width
		let ver = tree.map_y / this.Block_Width
		let grid_w = tree.info.balk_rt[2] / this.Block_Width;
		let grid_h = tree.info.balk_rt[3] / this.Block_Width;
		for(let i = hor;i<hor+grid_w-1;i++){
			for(let j = ver;j<ver+grid_h-1;j++){
				i = Math.floor(i);
				j = Math.floor(j);
				let key = Helper.StringFormat("%d_%d",i,j);
				this.blocks[ key ].couldCross = false ;
			}
		}
	}
	public Update(tick){
		super.Update(tick);
		if(this.playerLeader != null){
			this.playerLeader.Update(tick);
        	this.updateLeaderDieUi();
		}
		if(this.playerLeaderPet != null){
			this.playerLeaderPet.Update(tick);
		}
		this.updateMember(tick);
		this.updateBuilds(tick);
		this.updateTrees(tick);
		this.updateNpcs(tick);

		this.updateTreeTrans(null);
		this.flashTree();
	}
	public updateMember(tick){
		for(let k in this.tableMembers){
			let v = this.tableMembers[k];
			if(v.bCanRemove == true){
				CC_SAFE_DELETE(v)
                v = null;
                delete this.tableMembers[k];                
                delete this.cacheMembers[k];
				continue;
			}
			v.Update(tick) 
            this.flashMemberColor(v);
		}
		for(let k in this.tableMemberPets){
			let v = this.tableMemberPets[k];
			if(v.master.bCanRemove == true){
				CC_SAFE_DELETE(v)
                v = null;
                delete this.tableMemberPets[k];
				continue;
			}
			v.Update(tick);
		}
	}
	public updateNoticePos( tbl ){
		if(tbl == null){
			return;
		}
		for(let k in tbl){
			let v = tbl[k];
			if(v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION){
				let key_id = v.roleBase.id;
				if(this.tableTrees[key_id] == null && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN )){
					let tree = this.addTree( v );
					if(tree != null){
						this.SetTreeBlock( tree );
						Astar.getInstance().clear_cached_paths();
					}
				}else if(this.tableTrees[key_id] != null){
					this.tableTrees[key_id].dealSceneNotice( v );
				}
			}else if(v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS){
				let key_id = v.roleBase.id;
				if(this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN )){
					this.tableMembers[key_id] = this.cacheMembers[key_id];
					delete this.cacheMembers[key_id];
					this.tableMembers[key_id].joinView();
					this.tableMembers[key_id].dealSceneNotice(v);
				}else if(this.tableMembers[key_id] == null && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == 		 message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN )){
					this.addMob(v, null, null);
				}else if((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) && ( ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE ))){
					if(!this.willDelMobs[key_id]){
						this.delMember(key_id);
					}
				}else if(this.tableMembers[key_id] != null && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && Helper.getObjLen(v.otherBase) == 0 )){
					this.tableMembers[key_id].leaveView();
					this.cacheMembers[key_id] = this.tableMembers[key_id];
					delete this.tableMembers[key_id];
				}else if(this.tableMembers[key_id] != null){
					//死亡和被动战斗
					let mobBattle = function(thisobj){
						if(thisobj.tableMembers[key_id].isVisible() == true 
                        && Helper.getObjLen(v.otherBase) != 0
                        && (( thisobj.tableMembers[ v.otherBase[0].id ] != null 
                        ) || v.otherBase[0].id == Game.PlayerInfoSystem.RoleID )){
							thisobj.tableMembers[key_id].dealSceneNotice(v)
                        	thisobj.memberNoticeResult(key_id, v.otherBase[0].id);
							return true;
						}
						return false;
					}
					if(v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD){
						if(mobBattle(this) == false){
							this.delMember(key_id);
						}else{
							this.willDelMobs[key_id] = true;
						}
					}else if(v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED){
						mobBattle(this);
					}else if(v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE){
						this.tableMembers[key_id].dealSceneNotice(v);
					}
				}else if(this.cacheMembers[key_id] != null){
					if(v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE){
						this.delMember(key_id);
					}
				}
			}else{
				if(v.roleBase.id == Game.PlayerInfoSystem.RoleID){
					if(v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE){
						if(this.playerLeader != null){
							this.playerLeader.dealSceneNotice( v );
						}
					}
				}else{
					let key_id = v.roleBase.id;
					if(this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null 
                    && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)){
						this.tableMembers[key_id] = this.cacheMembers[key_id];
						delete this.cacheMembers[key_id];
						this.tableMembers[key_id].joinView();
						this.tableMembers[key_id].dealSceneNotice(v);
					}else if(this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null 
                    && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN )){
						this.addMember(v, null, null);
					}else if((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) 
                    && ( v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE )){
						this.delMember(key_id);
					}else if(this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE){
						this.tableMembers[key_id].leaveView()
						this.cacheMembers[key_id] = this.tableMembers[key_id];
						delete this.tableMembers[key_id];
					}else if(this.tableMembers[key_id] != null){
						this.tableMembers[key_id].dealSceneNotice(v);
						if(this.tableMembers[key_id].bVisible == true && this.tableMembers[key_id].otherState == TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0){
							this.memberNoticeResult(key_id, v.otherBase[0].id);
						}
					}
				}
			}
		}
	}
	public updateBuilds(tick){
		for(let k in this.tableBuilds){
			let v = this.tableBuilds[k];
			if(v.isCanRemove() == true && v.buildHp <= 0){
				this.ClearBlock(v);
                CC_SAFE_DELETE(v);
                delete this.tableBuilds[k];
                continue;
			}
			v.Update(tick);
		}
	}
	public UpdateMap(base_x, base_y){
		let [moveX, moveY] = this.ComputeMapXY(base_x, base_y);
		super.UpdateMap(moveX, moveY);
	}
	public getUpNode(){
		return this.nodeUp;
	}
	public OnTouchDown(touchs:egret.TouchEvent){
		if(this.playerLeader != null){
			this.playerLeader.OnTouchDown(touchs);
		}
		this.dealWithNpcButton(0,[touchs.stageX,touchs.stageY]);
	}
	public OnTouchMove(touchs:egret.TouchEvent){
		if(this.playerLeader != null){
			this.playerLeader.OnTouchMove(touchs);
		}
		this.dealWithNpcButton(1,[touchs.stageX,touchs.stageY]);
	}
	public OnTouchUp(touchs:egret.TouchEvent){
		if(this.playerLeader != null){
			this.playerLeader.OnTouchUp(touchs);
		}
		this.dealWithNpcButton(2,[touchs.stageX,touchs.stageY]);
	}
	public dealWithNpcButton(tag, pos){

	}
	public getLeader(){
		return this.playerLeader;
	}
	public reqLeaderPos(x, y, successCB){
		if(x <= 0){
			x = 1;
		}
		let visit_func = function func (req: aone.AoneRequest, resp: aone.AoneResponse){
			let response = <message.SceneMoveResponse>resp;
			if (response.header.result != 0) {
				toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			if(successCB != null){
				successCB();
			}
			if(this.playerLeader){
				this.playerLeader.resetMoveNet();
			}
			if(response.body.roleInfo.length != 0){
				Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo[0];
				this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo);
				if(this.playerLeader.sceneHpPercent == 0){
					this.playerLeader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
				}
			}
		}
		let req = new message.SceneMoveRequest();
		req.body.scene_x = x;
		y = PlayerWonderLandSystem.MapHeight - y;
    	req.body.scene_y = y;
		Game.Controller.send(req, visit_func, null, this, true);
	}
	public updateLeaderDieUi(){
		if(this.playerLeader.otherState != TableEnum.TableEnumOtherState.OtherState_Die){
			return;
		}
		if(this.playerLeader.dieProtectTime <= 0){
			return;
		}
		if(this.isCanPushWarUi() == false){
			return;
		}
		if(this.mainMenu != null){
			this.mainMenu.SetDieTime(this.playerLeader.dieProtectTime);
		}
	}
	public collideObjectReq( other_id, successCB ){
		let visit_func = function func (req: aone.AoneRequest, resp: aone.AoneResponse){
			let response = <message.SceneCollideResponse>resp;
			if (response.header.result != 0) {
				toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				if(response.header.result == message.EC.XG_ROLE_NOT_FINDED){
					this.delMember(Gmgr.Instance.rpgObjectId);
				}
				return;
			}else{
				Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
    			Game.PlayerWonderLandSystem.darkland.getGoods = response.body.gameInfo.getGoods;
				Game.PlayerWonderLandSystem.battleResult(response);
				//弹出结算界面试试
				if(successCB != null){
					successCB();
				}
				this.atkNoticeResult();
			}
		}
		let req = new message.SceneCollideRequest();
		req.body.objectId = other_id;
		Gmgr.Instance.rpgObjectId = other_id;
		Game.Controller.send(req, visit_func, null, this, false);
	}
	public wonderlandCollectionReq( tree_id, successCB ){
		let visit_func = function func (req: aone.AoneRequest, resp: aone.AoneResponse){
			let response = <message.SceneCollectionResponse>resp;
			if (response.header.result != 0) {
				if(response.header.result == message.EC.XG_LACK_GOLDPLATE){
					// Player.BuyPlate();购买盘子提示
				}else{
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				}
				return;
			}else{
				Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
				if(successCB != null){
					successCB();
				}
				this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo);
			}
		}
		let req = new message.SceneCollectionRequest();
		req.body.treeId = tree_id;
		Game.Controller.send(req, visit_func, null, this, false);
	}
	public revivePersonReq( successCB ){
		let visit_func = function func (req: aone.AoneRequest, resp: aone.AoneResponse){
			let response = <message.SceneDeadCoolingResponse>resp;
			if (response.header.result == 0 || response.header.result == message.EC.XG_SCENE_OWNER_NOT_DEAD) {
				response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
				Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
				//弹出结算界面试试
				if(successCB != null){
					successCB();
				}
				if(this.playerLeader != null){
					this.playerLeader.path = null;
					this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.darkland.roleInfo);           
					this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem) 
					this.playerLeader.reSafe();
				}
			}else if(response.header.result == message.EC.XG_LACK_TOKEN){
				TipManager.ShowAddGemStone();
			}
		}
		let req = new message.SceneDeadCoolingRequest();
		Game.Controller.send(req, visit_func, null, this, false);
	}
	public updateSimplePos( tbl ){
		for(let k in tbl){
			let v = tbl[k];
			if(this.tableMembers[k] != null){
				this.tableMembers[k].dealSimpleMoveNotice(v);
			}
		}
	}
	public getEventThings(x, y){
		let t = [];
		let checkNeedMove = false;
		let leaderInSafe = Table.VIn(this.playerLeader.tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine)
		for(let k in this.tableBuilds){
			let v = this.tableBuilds[k];
			if(v.isCanBeAtk() == false){
				continue;
			}
			if(v.beInScope(x, y) == true){
				checkNeedMove = true;
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Building;
				info["data"] = v;
				t.push(info);
			}
		}
		for(let k in this.tableMapCells){
			let v = this.tableMapCells[k];
			if(v.info.build_type != 5){
				continue;
			}
			if(v.isCanBeTouch() == false){
				continue;
			}
			if(v.beInScope(x, y) == false){
				continue;
			}
			let [tree_x, tree_y] = v.getEventPos();
			if(this.playerLeader.isValidEventDis(tree_x, tree_y) == false){
				continue;
			}
			checkNeedMove = true;
			let info = {};
			info["type"] = TableEnum.Enum.LeagueWarTouchType.Npc;
			info["data"] = v;
			t.push(info);
		}
		for(let k in this.tableTrees){
			let v = this.tableTrees[k];
			if(v.beInScope(x, y) == false){
				continue;
			}
			let [tree_x, tree_y] = v.getEventPos();
			if(this.playerLeader.isValidEventDis(tree_x, tree_y) == false){
				continue;
			}
			if(!leaderInSafe){
				checkNeedMove = true;
			}
			let info = {};
			info["type"] = TableEnum.Enum.LeagueWarTouchType.Grass;
			info["data"] = v;
			t.push(info);
		}
		let tbl_move = [];
		for(let k in this.tableMembers){
			let v = this.tableMembers[k];
			if(v.beInScope(x, y) == false){
				continue;
			}
			if(v.otherState != TableEnum.TableEnumOtherState.OtherState_None){
				continue;
			}
			if(v.otherState != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS){
				if(!leaderInSafe){
					checkNeedMove = true;
				}
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Mob;
				info["data"] = v;
				t.push(info);
				continue;
			}
			tbl_move.push(k);
		}

		let still_len = t.length;
		let move_len = tbl_move.length;
		let real_person = Math.min(move_len, ConstantConfig_RoleBattle.OVERLAP_SELECT_MAX_NUM - still_len);
		let tbl_rand = [];
		while(true){
			if(tbl_rand.length >= real_person){
				break;
			}
			let rand = TsMtirand();
			let rand_value = rand % move_len + 1;
			let value = tbl_move[rand_value - 1];
			if(Table.VIn(tbl_rand, value) == false){
				tbl_rand.push(value);
				let info = {};
				let bMember = yuan3(this.tableMembers[value].getLegId() != 0 && this.tableMembers[value].getLegId() == this.playerLeader.getLegId(), true, false);
				info["type"] = Helper.getWonderlandPlayerType(this.playerLeader.getBattleMode(), bMember); 
				info["data"] = this.tableMembers[value];
				t.push(info);
				if((! leaderInSafe) && (! Table.VIn(this.tableMembers[value].tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine))){
					checkNeedMove = true;
				}
			}
		}
		t.sort((a, b) => {
            return a.type - b.type;
        });
		return t;
	}
	public checkEventThings(x, y){
		let t = this.getEventThings(x, y);
		return yuan3(t.length == 0, false, true);
	}
	public dealEventThings(x, y){
		let t = this.getEventThings(x, y);
		let doSomeThing = false;
		if(t.length > 1){
			// local ui = PushUI("League_WarSelectThings")
			// ui:SetInfo( t )
			// ui:SetFather(self)
			// ui:SetPressOutExit()

			loadUI(League_WarSelectThings).then((dialog: League_WarSelectThings) => {
				dialog.SetInfo( t );
				dialog.show();
				doSomeThing = true;
            });
			doSomeThing = true;
		}else if(t.length == 1){
			//安全区域检测
			let fightId = t[0].type == TableEnum.Enum.LeagueWarTouchType.Person && t[0].data.playerInfo.id || 0;
			let canDo = this.delSafeAreaCheck(t[0].type, fightId);
			if(!canDo){
				return doSomeThing;
			}
			if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Person){
				//碰撞人物
				this.collideObjectReq(t[0].data.playerInfo.id, null);
            	doSomeThing = true;
			}else if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Mob){
				//碰撞怪物 
				this.collideObjectReq(t[0].data.playerInfo.id, null);
            	doSomeThing = true;
			}else if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Building){
				//none
			}else if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Grass){
				//采集
				this.wonderlandCollectionReq(t[0].data.scenePosInfo.roleBase.id, null);
            	doSomeThing = true;
			}else if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Partner){
				this.pushPersonInterface(t[0].data.playerInfo);
            	doSomeThing = true;
			}else if(t[0].type == TableEnum.Enum.LeagueWarTouchType.Npc){
				//npc
				this.pushNpcUi(t[0].data.info);
            	doSomeThing = true;
			}
		}
		return doSomeThing;
	}
	//安全区操作检测
	public delSafeAreaCheck(touch_type, id){
		let canDo = true;
		let leaderInSafe = Table.VIn(this.playerLeader.tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine);
		if(touch_type == TableEnum.Enum.LeagueWarTouchType.Person){
			//碰撞人物
			if(leaderInSafe){
				canDo = false;
				// GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[0])
			}else{
				if(this.tableMembers[id] != null){
					let fightObjInSafe = Table.VIn(this.tableMembers[id].tiggerAreaEventTbl, TableEnum.Enum.PortNpc.SafeLine);
					if(fightObjInSafe){
						canDo = false;
						// GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[Enum.LeagueWarTouchType.Person])
					}
				}
			}
		}else if(touch_type == TableEnum.Enum.LeagueWarTouchType.Mob){
			//碰撞怪物
			if(leaderInSafe){
				canDo = false;
            	// GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[Enum.LeagueWarTouchType.Mob])
			}
		}
		return canDo;
	}
	public dealTriggerAreaThings(x, y, trigger_Tbl){
		let curTriggerTbl = trigger_Tbl || [];
		//安全区
		let [safeInfo] = Table.ObjFindRcall(this.tableNpcs, function (_k, _v) {
            return _v.info.build_id == TableEnum.Enum.PortNpc.SafeLine;
        },this);
		let aa = [];
		
		if(trigger_Tbl.indexOf(TableEnum.Enum.PortNpc.SafeLine) == -1){
			if(safeInfo != null && safeInfo.beInScope(x, y)){
				//进入安全区
				curTriggerTbl.push(TableEnum.Enum.PortNpc.SafeLine);
			}
		}else{
			if(trigger_Tbl.indexOf(TableEnum.Enum.PortNpc.SafeLine) != -1 && (safeInfo != null) && (safeInfo.beInScope(x, y) == false)){
				let safeKey = Table.FindK(trigger_Tbl, TableEnum.Enum.PortNpc.SafeLine);
				//离开安全区
				curTriggerTbl.splice(safeKey,1)
			}
		}
		return curTriggerTbl;
	}
	public pushNpcUi(info){
		if(info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Exchange){//兑换
			loadUI(ExchangeMainSence).then((scene: ExchangeMainSence) => {
                scene.show(UI.SHOW_FROM_TOP);
            });
        	// Teach.addTeaching();
		}else if(info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Mora){//祭祀
			loadUI(MoraMainScene).then((scene: MoraMainScene) => {
                scene.Init();
                scene.show(UI.SHOW_FROM_TOP);
            });
        	// Teach.addTeaching();
		}else if(info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Fish){//钓鱼
			loadUI(FishingMain).then((dialog: FishingMain) => {
				dialog.show(UI.SHOW_FROM_TOP);
			})
        	// Teach.addTeaching();
		}else if(info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Door){
			let LeaveWonderlandSceneReq = function Func(){
				let Response = function(req: aone.AoneRequest, resp: aone.AoneResponse){
					let response = <message.WonderlandLeaveResponse>resp;
					
					if(response.header.result == message.EC.SUCCESS){
						this.delMember(Game.PlayerInfoSystem.RoleID);
						let cb = function(){
							if(!Device.isReviewSwitch){
								// PushUI("HXH_Wonderland")//退出去走这里  目前有问题
							}
						}
						// StageSceneManager:ChangeScene(StageSceneCity, cb)
						StageSceneManager.Instance.clearScene();
					}else{
						toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					}
				}
				let req = new message.WonderlandLeaveRequest();
				Game.Controller.send(req, Response, null, this, false);
			}
			if(this.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die){
				toast(TextsConfig.TextsConfig_Wonderland.die_error_tips);        
            	return
			}
			if(this.isTouchUiEnabled() == false){
				toast(TextsConfig.TextsConfig_Wonderland.battle_error_tips);
				return
			}
			let [tag, code] = this.isCanLeaveScene();
			if(tag == true && !Device.isReviewSwitch){
				TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip,() =>{
					LeaveWonderlandSceneReq();
				});
			}else{
				if(TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")] != null){
					toast(TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")]);
				}
			}
		}else if(info.build_id == TableEnum.Enum.WonderlandPeaceNpc.DoubleColor){//双色球
			let Response = function(req: aone.AoneRequest, resp: aone.AoneResponse){
				let response = <message.GetLotteryFruitInfoResponse>resp;
				if(response.header.result == message.EC.SUCCESS){
					Game.PlayerDoubleBallSystem.my_id = Game.PlayerDoubleBallSystem.serverFruit( Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit );
					Game.PlayerDoubleBallSystem.public_id = Game.PlayerDoubleBallSystem.serverFruit( response.body.fruitInfo.dailyLotteryFruit.redFruit, response.body.fruitInfo.dailyLotteryFruit.blueFruit );
					loadUI(DoubleColorSence).then((scene: DoubleColorSence) => {
                		scene.show(UI.SHOW_FROM_TOP);
            		});
				}else{
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				}
			}
			let req = new message.GetLotteryFruitInfoRequest();
			Game.Controller.send(req, Response, null, this, false);
		}else{
			return;
		}
	}
	public pushPersonInterface( info ){
		// ui = PushUI("Wonderland_SelectPlayer")
		// ui:SetInfo( info )
		// ui:SetFather(self)
		// ui:SetPressOutExit()
	}
	public flashSceneLeaderColor(){
		let _path = Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
		let _color = ConstantConfig_Common.Color.wonderland_color.leader_color;
		this.playerLeader.flashTtfNameColor(_color);
		this.playerLeader.flashBarTexture(_path);
	}
	public flashTree(){
		for(let k in this.tableTrees){
			let v = this.tableTrees[k];
			let _tag = false;
			let _action = -1;
			let [x, y] = v.getEventPos();
			if(this.playerLeader.isValidEventDis(x, y) == true){
				_tag = true;
            	_action = TableEnum.Enum.LeagueWarTouchType.Grass;
			}
			if(v.fruitCnt <= 0){
				_action = -1;
			}
			let isPeace = TableWonderland.Item( Game.PlayerWonderLandSystem.darkland.darklandId ).is_battle == 0;
			let can_pick = Otherdb.inPeaceWonderlandNotPick(v.treeId);otherdb
			if(isPeace){
				if(!can_pick){
					_action = -1;
				}
			}
			v.flashTree(_tag, _action);
		}
	}
	public getDarklandMode(){
		let model = TableEnum.Enum.WonderlandType.WondType_Fight;
    	return model
	}
	public flashMemberColor( v ){
		if(v.bVisible == false){
			return;
		}
		if(v.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS){
			let _action = -1;
			if(this.playerLeader.isValidEventDis(v.x, v.y+v.bodyHeight/2) == true && v.isFightShowing() == false){
				_action = TableEnum.Enum.LeagueWarTouchType.Mob;
			}
			v.flashLedAni(_action);
		}else{
			let myMode =  this.playerLeader.getBattleMode();
			let otherMode = v.getBattleMode();
			let bMember = yuan3(v.getLegId() != 0 && v.getLegId() == this.playerLeader.getLegId(), true, false);
			let _action = Helper.getWonderlandPlayerType(myMode, bMember);
			let _path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
			let _color = ConstantConfig_Common.Color.wonderland_color.memeber_color;
			if(this.getDarklandMode() == TableEnum.Enum.WonderlandType.WondType_Fight){
				if(bMember){
					_path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
				}else{
					_path = UIConfig.UIConfig_LeagueWarScene.roleBloodFightBar;
				}
				if(_action == TableEnum.Enum.LeagueWarTouchType.Person){
					_color = ConstantConfig_Common.Color.wonderland_color.other_kill_color;
				}
			}
			if(v.otherState == TableEnum.TableEnumOtherState.OtherState_Die || this.playerLeader.isValidEventDis(v.x, v.y+v.bodyHeight/2) == false){
				_action = -1;
			}
			v.flashBarTexture(_path);
			v.flashTtfNameColor(_color);          
			v.flashLedAni( _action);
		}
	}
	public addCollectMenu(time, type){
		if(this.mainMenu != null){
			this.mainMenu.addControlPop(time, type);
		}
	}
	public deleteCollectMenu(){
		if(this.mainMenu){
			this.mainMenu.deleteControlPop();
		}
		
	}
	//发协议切换场景
	public DarklandEnter_Req(id){
		let DarklandEnter_Resp = function(req: aone.AoneRequest, resp: aone.AoneResponse){
			let response = <message.SceneEnterResponse>resp;	
			if(response.header.result == message.EC.SUCCESS){
				Game.PlayerDarkSystem.enterScene(response);
				Game.PlayerWonderLandSystem.darkland.mapBlockIndex = id;
            	StageSceneManager.Instance.ChangeScene(StageSceneDarkland);
            	Game.PlayerWonderLandSystem.darkland.darklandId  = id;
			}
			// Teach.addTeaching();
		}
		let req = new message.SceneEnterRequest();
		req.body.id = id;
    	Game.PlayerWonderLandSystem.willGoRpg();
		Game.Controller.send(req, DarklandEnter_Resp, null, this, false);
	}
	public OnExit(){
		this.release();
		if(this.mainMenu){
			this.mainMenu.close();
			this.mainMenu = null;
		}
		Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS,this.SceneItemPosNotice_Visit,this);
		Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO,this.SceneItemPosInfoNotice_Visit,this);
		Game.EventManager.off(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT,this.LeagueWarBattleResultNotice_Visit,this);
	}
}
}