namespace zj {
export class StageRpgObject extends StageObject{
	public constructor( node, order) {
		super();
		this.rootNode = node;
		this.nodeRoot = new eui.Group();
		this.rootNode.addChild(this.nodeRoot);
		this.curScene = StageSceneManager.Instance.GetCurScene();
		this.info = null;
		this.nodePos = new eui.Group();
		this.nodeRoot.addChild(this.nodePos);
		this.nodeNormal = new eui.Group();
		this.nodePos.addChild(this.nodeNormal);
		this.titleSpace = new eui.Group();
		this.nodePos.addChild(this.titleSpace);
		this.x = 0;
		this.y = 0;
		this.order = order;
		this.trans = 1;
		this.ePositionType = TableEnum.TablePositionType.POSITION_NONE;
	}
	public bloodBoardDes;
	public ttfDes;
	public map_x = 0;
	public map_y = 0;
	public sizeSpx = null;
	public sizeSpine = null;
	public sizePic = null;
	public anchorSpx = new egret.Point(0,0);
	public anchorPic = new egret.Point(0,0);
	public anchorSpine = new egret.Point(0,0);
	public ledIndex = -1;
	public commonLedAni = null;
	public bVisible = true;
	public bEnemy = false;
	public ePositionType;
	public scenePosInfo;
	public spxAni;
	public spineAni;
	public spritePic;
	public trans;
	public order;
	public x;
	public y;
	public titleSpace;
	public nodeNormal;
	public nodePos;
	public info;
	public curScene;
	public nodeRoot;
	public rootNode;

	public release(){
		if(this.spritePic){
			this.spritePic.clearSpine();
            this.spritePic = null;
		}
		if(this.spineAni && this.spineAni instanceof eui.Image){
			this.spineAni.parent.removeChild(this.spineAni);
            this.spineAni = null;
		}else if(this.spineAni){
			this.spineAni.clearSpine();
            this.spineAni = null;
		}
		if(this.spxAni){
			this.spxAni.clearSpine();
            this.spxAni = null;
		}
		if(this.commonLedAni){
			this.commonLedAni.clearSpine();
            this.commonLedAni = null;
		}
	}
	public Update( tick ){
		 this.updateZone();
	}
	public setPos(x, y){
		this.x = x;
		this.y = y;
		this.nodePos.x = x;
		this.nodePos.y = y;
	}
	public setLoadPos(x, y){
		// if(this.spritePic != null){
		// 	this.spritePic.SetPosition(x,y);
		// }
		// if(this.spineAni != null){
		// 	this.spineAni.SetPosition(x,y);
		// }
		// if(this.spxAni != null){
		// 	this.spxAni.SetPosition(x,y);
		// }
	}
	public setRoot(x, y){
		this.setPos(x, y);
		this.setLoadPos(0, 0);
	}
	public setScenePosInfo(info){
		this.scenePosInfo = info;
	}
	public setVisible( tag ){
		this.bVisible = tag;
		this.setPicVisible( tag );
	}
	public setPicVisible( tag ){
		if(this.spritePic != null){
			this.spritePic.visible = tag;
		}
		if(this.spineAni != null){
			this.spineAni.visible = tag;
		}
		if(this.spxAni != null){
			this.spxAni.visible = tag;
		}
	}
	public getVisible(){
		return this.bVisible;
	}
	public getPos(){
		return [this.x, this.y];
	}
	public setPositionType( eType ){
		this.ePositionType = eType;
	}
	public setIsEnemy( tag ){
		this.bEnemy = tag;
	}
	public setTrans( trans ){
		if(this.trans == trans){
			return;
		}
		this.trans = trans;
		if(this.spritePic != null){
			this.spritePic.alpha = trans;
		}
	}
	public LoadPicWithPath(path, anchor, bMirror){
		let build = new eui.Image(cachekey(path, this));
		// build.anchorOffsetX = anchor;
		// build.x = this.info.build_x;
		// build.y = this.info.build_y;
		// build.scaleX = bMirror;
		build.addEventListener(egret.Event.COMPLETE, (e) => {
			///在图片的载入完成事件中获得图片的宽高。
			let img: eui.Image = e.currentTarget;
			img.anchorOffsetY = img.height;
		}, this);
		this.nodeNormal.addChild(build);
		return build;
	}
	public LoadPic(path, anchor, bMirror, plist){

	}
	public LoadFruitAni(index, anchor, bMirror){
		let item = TableClientAniUi.Item(index);
		let tableAni = TableClientAniCssSource.Item(item.css_id);

        let [ani] = HunterSpineX(index,1,null,tableAni.name);
		ani.ChangeAction(item.index);

		//ani.SetPosition(this.x,this.y);
		this.nodeNormal.addChild(ani.spine);
		return ani
	}
	public LoadSpine(info, anchor, scale, bMirror){
		let item = TableClientAniSpineSource.Item(info.spine_id);
		let [spine] = HunterSpineX(info.spine_id,scale || 1.0,null,item.json);
		spine.ChangeAnimation(item.ani_name);
		spine.setFlipX(bMirror);
		this.nodeNormal.addChild(spine.spine);
		return spine;
	}
	public LoadGeneral(info, anchor, scale, bMirror){
		let [spine] = HunterSpineX(info.spine_id);
		spine.SetScale(scale);
		spine.setFlipX(bMirror);
		//spine.SetPosition(this.x,PlayerWonderLandSystem.MapHeight - this.y);
		spine.ChangeAction(1);
		this.nodeNormal.addChild(spine.spine);
		return spine;
	}
	public LoadSpx(info, anchor){

	}
	public loadLedAni(){
		[this.commonLedAni] = HunterSpineX(-1,1,null,TableClientAniCssSource.Item(UIConfig.UIConfig_RpgScene.ledEffect.jsonId).name);
		this.commonLedAni.SetScale(0.8);
		this.commonLedAni.setVisibleSpx(false);
		this.nodeNormal.addChild(this.commonLedAni.spine);
	}
	public flashLedAni( action ){
		if(this.commonLedAni == null){
			return;
		}
		if(action == -1){
			this.ledIndex = -1;
			this.commonLedAni.setVisibleSpx(false);
		}else{
			this.commonLedAni.setVisibleSpx(true);
			if(action != this.ledIndex){
				this.ledIndex = action;
				this.commonLedAni.stopAllActions();
				if(this.ttfDes != null){
					let [t_x, t_y] = [this.ttfDes.x,this.ttfDes.y];
					let t_h = this.bloodBoardDes.height;
					this.commonLedAni.SetPosition(t_x, t_y - t_h/2 - ConstantConfig_Rpg.COMMON_LED_OFFSET_Y);
				}
				this.commonLedAni.ChangeAction( UIConfig.UIConfig_RpgScene.ledEffect.actionIds[ action ]);
			}
		}
	}
	public updateZone(){
		if(this.spritePic != null && this.sizePic == null){
			this.sizePic = {width:this.spritePic.width,height:this.spritePic.height};
		}
		if(this.spineAni != null && this.sizeSpine == null){
			this.sizeSpine = {width:this.spineAni.width,height:this.spineAni.height};
			this.setRoot(this.x,this.y);
		}
		if(this.spxAni != null && this.sizeSpx == null){
			this.sizeSpx = {width:this.spxAni.width,height:this.spxAni.height};
			this.setRoot(this.x,this.y);
		}
		let tag = false;
		if(this.sizePic != null){
			if(this.x + (1-this.anchorPic.x) * this.sizePic.width  >= 0 && this.y + (1-this.anchorPic.y) * this.sizePic.height >= 0 && 
            this.x - this.anchorPic.x * this.sizePic.width <= UIManager.StageWidth && this.y - this.anchorPic.y * this.sizePic.height <= Device.screenHeight){
				tag = true;
			}
		}
		if(this.sizeSpine != null){
			if(this.x + (1-this.anchorSpine.x) * this.sizeSpine.width  >= 0 && this.y + (1-this.anchorSpine.y) * this.sizeSpine.height >= 0 && 
            this.x - this.anchorSpine.x * this.sizeSpine.width <= UIManager.StageWidth && this.y - this.anchorSpine.y * this.sizeSpine.height <= Device.screenHeight){
				tag = true;
			}
		}
		if(tag == false && this.bVisible == true){
			this.visible = false;
		}else if(tag == true && this.bVisible == false){
			this.visible = true;
		}
	}
}
}