namespace zj {
export class StageSceneFightBoss extends StageSceneFightInLeauge{
	public constructor(node, order) {
		super(node, order);
		this.setPlayerState( EnumPlayerState.PLAYER_STATE_BOSS )

		this.ttfSkillName = null;
		this.innerFoot = null;
		this.outerFoot = null;

		this.storageNormalIcon = null;
		this.storageFrame = null;
		this.storageBeginValue = 0;
		this.storageMaxValue = 0;
		this.storageCurValue = 0;
		this.storageProgress = null;
		this.bStorageBarPlay = false;
		this.barPercent = 0;
	}
	public ttfSkillName;
	public innerFoot;
	public outerFoot;
	public storageNormalIcon;
	public storageFrame;
	public storageBeginValue;
	public storageMaxValue;
	public storageCurValue;
	public storageProgress;
	public bStorageBarPlay;
	public barPercent;
	public tableTouchRt = [];

	public release(){
		super.release();
	}
	public createZorkBoss( scenePosInfo, floor, x, y, dir, moveDis, verDis ){
		this.setPlayerInfo( scenePosInfo.roleBase );
		this.commonCreate( floor, x, y, dir, moveDis, verDis );
		this.dealSceneNotice(scenePosInfo);
	}
	public createActivityBoss(scenePosInfo, floor, x, y, dir, moveDis, verDis) {
		this.setPlayerInfo(scenePosInfo);
		this.commonCreate(floor, x, y, dir, moveDis, verDis)
	}
	public init(){
		this.parseInfo();
		this.loadDB();
		this.loadNormalSpx();
		this.loadBody();   
		this.loadNameBoard();
		this.loadLvTitle();
		this.loadNameTitle(); 
		this.loadSpeed();
		this.loadScale();
		this.loadTouchRt();
	}
	public loadTouchRt(){
		this.tableTouchRt = [];
		this.tableTouchRt.push(new egret.Rectangle(-50, 0, 100, 300));
	}
	public loadNormalSpx(){
		this.scale = 1;
		this.uiScale = this.scale * 1.1;
	}
	public Update(tick){
		super.Update(tick);
	}
	public parseInfo(){
		this.mapRoleId = this.playerInfo.picId;
		if(TableLanguage.Item(this.playerInfo.name)){
			let lang = Game.LanguageManager.getLang();
			this.name = TableLanguage.Item(this.playerInfo.name)[lang];
		}
	}
	public getMaxHp(){
		return this.scenePosInfo.roleBase.battleValue;
	}
	public getCurHp(){
		return yuan3(this.otherState == TableEnum.TableEnumOtherState.OtherState_Die, 0, this.scenePosInfo.hpPre);
	}
	public procHp(){
		if(this.bVisible == false){
			return;
		}
		let hpP = this.scenePosInfo.hpPre * 100 / this.scenePosInfo.roleBase.battleValue;
		if(hpP != this.uiHp && this.bloodBar != null){
			this.uiHp = hpP;
			this.bloodBar.width = this.bloodBarWidth*hpP/100;
		}
	}
	public getNameColor(){
		return ConstantConfig_Common.Color.red;
	}
	public loadNameBoard(){
		let pic = new eui.Image(UIConfig.UIConfig_LeagueWarScene.sceneNameBoard);
		pic.anchorOffsetX = 158/2;
		pic.anchorOffsetY = 27/2;
		pic.scaleX = pic.scaleY = 1.5;
		this.nameBoard = pic;
		this.titleSpace.addChild(this.nameBoard);
	}
	public loadNameTitle(){
		this.cacheName = this.name;
		this.ttfName = new eui.Label("Lv"+ this.playerInfo.level + " " + this.name);
		let _color = this.getNameColor();
		this.nameColor = _color;
		this.ttfName.textColor = _color;
		// this.ttfName.anchorOffsetX = this.ttfName.width/2;
		this.ttfName.anchorOffsetY = this.ttfName.height/2;
		this.titleSpace.addChild(this.ttfName);
	}
	public loadLvTitle(){
		this.cacheLv = this.playerInfo.level;
		let _text = "";//"Lv"+ this.playerInfo.level;
		this.ttfLv = new eui.Label(_text);
		this.ttfLv.textColor = ConstantConfig_Common.Color.white;
		this.ttfLv.anchorOffsetY = this.ttfLv.height/2;
		this.titleSpace.addChild(this.ttfLv)
	}
	public updateZone(){
		let tag = false;
		if(this.x + this.bodyWidth/2 >= 0 && this.y + this.bodyHeight >= 0 && this.x - this.bodyWidth/2 <= UIManager.StageWidth && this.y <= UIManager.StageHeight){
			tag = true;
		}
		this.bInZone = tag;
		if(this.bHidden == true){
			return;
		}
		if(tag == false && this.bVisible == true){
			this.setVisible(false);
		}else if(tag == true && this.bVisible == false && this.curScene.prepareTime <= 0){
			this.setVisible(true);
		}
	}
	public getTouchRt(){
		let rt = [];
		for(let i = 0;i<this.tableTouchRt.length;i++){
			if(this.dir == TableEnum.TableEnumDir.Dir_Left){
				let tmp = new egret.Rectangle(this.x - this.tableTouchRt[i].x - this.tableTouchRt[i].width, this.y - this.tableTouchRt[i].y - this.tableTouchRt[i].height, this.tableTouchRt[i].width, this.tableTouchRt[i].height);
				rt.push(tmp);
			}else if(this.dir == TableEnum.TableEnumDir.Dir_Right){
				let tmp = new egret.Rectangle(this.x + this.tableTouchRt[i].x, this.y - this.tableTouchRt[i].y - this.tableTouchRt[i].height, this.tableTouchRt[i].width, this.tableTouchRt[i].height);
				rt.push(tmp);
			}
		}
		return rt;
	}
	public OnTouchDown(touch:egret.TouchEvent){
		// if(this.otherState != TableEnum.TableEnumOtherState.OtherState_None){
		// 	return;
		// }
		let touchs = [touch.stageX - Game.UIManager.x,touch.stageY];
		let tableSize = touchs.length;
		let touchRt = this.getTouchRt();
		let point = new egret.Point(touchs[0],touchs[1]);
		for(let i = 0;i<touchRt.length;i++){
			if(touchRt[i].containsPoint(point)){
				return true;
			}
		}
		return false;
	}
}
}