namespace zj {
export class StageRpgTree extends StageRpgObject{
	public constructor(node, order) {
		super(node, order);
	}
	public bloodBoardName = null;
    public bloodBoardDes = null;
    public ttfName:eui.Label = null;
    public ttfDes:eui.Label = null;

    public fruitCnt = -1;
    public matureTime = -1;
    public uiCnt = -1;
    public bMature = false;

    public bTagVisible = null; 
    
    public ripeAni = null;
    public ripeIndex = -1;
    public bInWater = false;
	public showTimeLine = -1;
	public unkonwnTime = false;
	public freshPeace;

	public release(){
		super.release();
		if(this.ripeAni){
			this.ripeAni.clearSpine();
            this.ripeAni = null;
		}
		if(this.ttfName){
			this.titleSpace.removeChild(this.ttfName);
		}
		if(this.ttfDes){
			this.titleSpace.removeChild(this.ttfDes);
		}
		if(this.bloodBoardName){
			this.titleSpace.removeChild(this.bloodBoardName);
		}
		if(this.bloodBoardName){
			this.titleSpace.removeChild(this.bloodBoardDes);
		}
	}
	public InitTree( info, scenePosInfo ){
		this.info = info
		this.dealSceneNotice(scenePosInfo)
		this.LoadData()
		this.LoadView()
		this.loadOther()
		this.flashTree(false, -1);
		this.setRoot(this.x, this.y);
	}
	public loadNameTitle(){
		let board = new eui.Image(UIConfig.UIConfig_LeagueWarScene.sceneTreeBoardName);
		board.anchorOffsetX = 158/2;
		board.anchorOffsetY = 27/2;
		this.bloodBoardName = board;
		this.titleSpace.addChild(this.bloodBoardName);

		this.ttfName = new eui.Label(this.info.tree_name);
		this.ttfName.size = 20;
		this.ttfName.bold = true;
		this.ttfName.textColor = ConstantConfig_Wonderland.tree_quality_color[this.info.quality - 1];
		this.ttfName.anchorOffsetX = this.ttfName.width/2;
		this.ttfName.anchorOffsetY = this.ttfName.height/2;
		this.titleSpace.addChild(this.ttfName);
	}
	public loadDesTitle(){
		let board = new eui.Image(UIConfig.UIConfig_LeagueWarScene.sceneTreeBoardDes);
		board.anchorOffsetX = 158/2;
		board.anchorOffsetY = 27/2;
		this.bloodBoardDes = board;
		this.titleSpace.addChild(this.bloodBoardDes);
		this.loadDes();
	}
	public loadDes(){
		let isTime = TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
		if(isTime){
			this.loadTreeCnt();
			return;
		}
		if(this.bMature == true){
			this.loadTreeCnt();
		}else{
			if(this.showTimeLine == -1){
				this.loadTime();
			}else{
				if(this.matureTime <= this.showTimeLine * 1000){
					this.loadTime();
				}else{
					this.loadUnknownTime();
				}
			}
		}
	}
	public flashTree( tag, action ){
		if(this.bTagVisible != tag){
			this.bTagVisible = tag;
			this.setTagVisible(tag);
		}
		this.flashLedAni( action );
	}
	public setTagVisible( tag ){
		//类型为4不显示数量
		this.ttfName.visible = tag;
		this.ttfDes.visible = tag && (this.info.fruit_type != 4);
		this.bloodBoardName.visible = tag;
		this.bloodBoardDes.visible = tag && (this.info.fruit_type != 4);
	}
	public loadTreeCnt(){
		let isTime = TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
		let can_pick = Otherdb.inPeaceWonderlandNotPick(this.info.tree_id);
		let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, this.fruitCnt);
		let color = ConstantConfig_Common.Color.yellow;
		if(isTime){
			if(can_pick){
				_tmp = TextsConfig.TextsConfig_Wonderland.fruit_can_pick;
			}else{
				_tmp = Otherdb.inPeaceWonderlandLastTime();
				color = ConstantConfig_Common.Color.red;
			}
		}
		if(this.ttfDes != null){
			this.ttfDes.text = _tmp;
			this.ttfDes.textColor = color;
			this.ttfDes.anchorOffsetX = this.ttfDes.width/2;
			this.ttfDes.anchorOffsetY = this.ttfDes.height/2;
		}else{
			this.ttfDes = new eui.Label();
			this.ttfDes.size = 20;
			this.ttfDes.bold = true;
			this.ttfDes.textColor = color;
			this.ttfDes.anchorOffsetX = this.ttfDes.width/2;
			this.ttfDes.anchorOffsetY = this.ttfDes.height/2;
			this.titleSpace.addChild(this.ttfDes);
		}
	}
	public loadTime(){
		this.unkonwnTime = false;
		let _str = Helper.FormatMsTime3(this.matureTime/1000);
    	let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
		if(!this.ttfDes){
			this.ttfDes = new eui.Label();
			this.ttfDes.size = 20;
			this.ttfDes.bold = true;
			this.ttfDes.text = _tmp;
			this.ttfDes.textColor = ConstantConfig_Common.Color.red;
			this.ttfDes.anchorOffsetX = this.ttfDes.width/2;
			this.ttfDes.anchorOffsetY = this.ttfDes.height/2;
			this.titleSpace.addChild(this.ttfDes);
		}
		this.ttfDes.visible = false;
	}
	public loadUnknownTime(){
		this.unkonwnTime = true;
		if(!this.ttfDes){
			this.ttfDes = new eui.Label();
			this.ttfDes.size = 20;
			this.ttfDes.bold = true;
			this.ttfDes.text = TextsConfig.TextsConfig_Wonderland.fruit_unknown_time_lable;
			this.ttfDes.textColor = ConstantConfig_Common.Color.red;
			this.ttfDes.anchorOffsetX = this.ttfDes.width/2;
			this.ttfDes.anchorOffsetY = this.ttfDes.height/2;
			this.titleSpace.addChild(this.ttfDes);
		}
		this.ttfDes.visible = false;
	}
	public loadRipeAni(){
		//成熟果实
		[this.ripeAni] = HunterSpineX(null,1,null,TableClientAniCssSource.Item(UIConfig.UIConfig_Wonderland.ripeEffect.jsonId).name);
		this.ripeAni.setVisibleSpx(false);
		this.nodeNormal.addChild(this.ripeAni.spine);

	}
	public procRipeAni(){
		this.ripeAni.setVisibleSpx(false);
	}
	public setLoadPos(x, y){
		super.setLoadPos( x, y);

		if(this.ripeAni != null){
			this.ripeAni.SetPosition(x,y);
		}
		if(this.ttfName != null){
			let [t_x, t_y] = [x, y - this.info.tag_y];
			this.ttfName.x = t_x;
			this.ttfName.y = t_y;
			this.bloodBoardName.x = t_x;
			this.bloodBoardName.y = t_y;
		}
		if(this.ttfDes != null){
			let [t_x, t_y] = [this.ttfName.x,this.ttfName.y];
			let t_h = this.bloodBoardName.height;
			let [_x, _y] = [t_x, t_y - t_h - ConstantConfig_Wonderland.TREE_DES_NAME_OFFSET_Y];
			this.bloodBoardDes.x = _x;
			this.bloodBoardDes.y = _y;
			this.ttfDes.x = _x;
			this.ttfDes.y = _y;
		}
		if(this.commonLedAni != null && this.commonLedAni.isVisible() == true){
			let [t_x, t_y] = [this.ttfDes.x,this.ttfDes.y];
			let t_h = this.bloodBoardDes.height;
			this.commonLedAni.SetPosition(t_x, t_y - t_h/2 - ConstantConfig_Rpg.COMMON_LED_OFFSET_Y);
		}
	}
	public LoadData(){
		this.scenePosInfo.posItem.scene_y = this.curScene.mapHeight - (this.scenePosInfo.posItem.scene_y);
		this.bMature = yuan3(this.fruitCnt > 0, true, false);
		let x = Math.floor(this.scenePosInfo.posItem.scene_x/ConstantConfig_Common.BLOCK_WIDTH) * ConstantConfig_Common.BLOCK_WIDTH + ConstantConfig_Common.BLOCK_WIDTH/2;
    	let y = Math.floor(this.scenePosInfo.posItem.scene_y/ConstantConfig_Common.BLOCK_WIDTH) * ConstantConfig_Common.BLOCK_WIDTH;
		this.map_x = x;
		this.map_y = y;
		let beInWater = Helper.beInWonderlandWater( new egret.Point(this.map_x, this.map_y));
		let screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x)
		let screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y)
		this.x = screen_x;
		this.y = screen_y;

		this.showTimeLine = this.info.time_show;
	}
	public LoadView(){
		let isTime = TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
		let can_pick = Otherdb.inPeaceWonderlandNotPick(this.info.tree_id);

		let path = yuan3(this.bMature, this.info.mature_path, this.info.immature_img);
		if(isTime){
			path = yuan3(can_pick, this.info.mature_path, this.info.immature_img);
			if(this.freshPeace == null || this.freshPeace != can_pick){
				this.freshPeace = can_pick;
			}else {
				return;
			}
		}
		this.spritePic = this.LoadFruitAni(path,this.anchorPic, yuan3(this.info.is_mirror == 0, false, true));
		this.sizePic = {width:this.spritePic.spine.width,height:this.spritePic.spine.height};
	}
	public loadOther(){
		//self.nodeRoot:setLocalZOrder( math.floor(((self.order - self.map_y))) )  -- /80
		this.loadNameTitle();   
		this.loadDesTitle();
		this.loadLedAni();
		this.loadRipeAni();
	}
	public Update( tick ){
		super.Update(tick);
		this.procMatureTime(tick);
		this.procForm();
		this.procRipeAni();
	}
	public procMatureTime( tick ){
		let rt = tick * 1000;
		if(this.bMature == false){
			this.matureTime = this.matureTime - rt;
			if(this.matureTime <= 0){
				this.matureTime = 0;
			}
			if(this.ttfDes.visible == true && this.unkonwnTime == false){
				this.ttfDes.textColor = ConstantConfig_Common.Color.red;
				let _str = Helper.FormatMsTime3(this.matureTime/1000);
				let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
				this.ttfDes.text = _tmp;
				this.ttfDes.anchorOffsetX = this.ttfDes.width/2;
				this.ttfDes.anchorOffsetY = this.ttfDes.height/2;
			}
		}
	}
	public falshPic(){
		this.LoadView();
		this.loadDes();
		this.setRoot(this.x, this.y);
	}
	public procForm(){
		let isTime = TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
		if(isTime){
			this.falshPic();
		}
		if(this.bMature == true && this.fruitCnt <= 0){
			this.bMature = false;
			this.falshPic();
		}
		if(this.bMature == false && this.fruitCnt > 0){
			this.bMature = true;
			this.falshPic();
		}
		if(this.bMature == false){
			if(this.showTimeLine != -1){
				if(this.unkonwnTime == false && this.matureTime > this.showTimeLine * 1000){
					this.loadUnknownTime();
					this.setRoot(this.x, this.y);
				}else if(this.unkonwnTime == true && this.matureTime <= this.showTimeLine * 1000){
					this.loadTime();
					this.setRoot(this.x, this.y);
				}
			}
		}
		if(this.uiCnt != this.fruitCnt){
			this.uiCnt = this.fruitCnt;
			this.loadDes();
			this.setTagVisible(this.bTagVisible);  
			this.setRoot(this.x, this.y);
		}
	}
	public setFruitCnt( cnt ){
		this.fruitCnt = cnt;
	}
	public setMatureTime( time ){
		this.matureTime = time * 1000;
	}
	public dealSceneNotice( notice ){
		this.setScenePosInfo( notice );
		this.setFruitCnt(this.scenePosInfo.battleProtectTime);
		this.setMatureTime(this.scenePosInfo.deadProtectTime);
	}
	public beInScope(x, y){
		let screen_x = x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
		let screen_y = y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);

		let yy = this.y;//this.curScene.mapHeight = 
		let tag = false;
		 let rect:egret.Rectangle = new egret.Rectangle();
		// rect.x = this.x - this.info.balk_rt[2]/2 + this.info.balk_rt[0];
		// rect.y = yy - this.info.balk_rt[1];
		// rect.width = this.info.balk_rt[2];
		// rect.height = this.info.balk_rt[3];
		// if(rect.containsPoint(new egret.Point(x,y)) == true){
		// 	tag = true;
		// }
		rect.x = this.x - this.info.touch_rt[2]/2 + this.info.touch_rt[0];
		rect.y = yy - this.info.touch_rt[1];
		rect.y = rect.y - this.info.touch_rt[2];
		rect.width = this.info.touch_rt[2] + Math.abs(this.info.touch_rt[0])*2;
		rect.height = this.info.touch_rt[3];
		if(rect.containsPoint(new egret.Point(x,y)) == true){
			tag = true;
		}
		return tag;
	}
	public getEventPos(){
		return [this.x, this.y - this.sizePic.height/2];
	}
	public getVisibleRt(){
		let rt = new egret.Rectangle(this.x-this.sizePic.width/2, this.y, this.sizePic.width, this.sizePic.height);
    	return rt;
	}
	public isExitShelter(x, y){
		if(x > this.x + this.info.shelter_pos[0] - this.info.shelter_pos[2]/2 && x < this.x + this.info.shelter_pos[0] + this.info.shelter_pos[2]/2 && y > this.y + this.info.shelter_pos[3]){
			return true;
		}
	}
}
}