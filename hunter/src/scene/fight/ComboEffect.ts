namespace zj {
export class ComboEffect {
	
	public constructor(node) {
		this.node = node;
		this.loadBoardPic();
		this.loadWordPic();
		this.loadNumPic();
	}
	private node;
	private x = 0;
	private y = 0;
	private boardX = 0
    private boardY = 0
    private wordX = 0
    private wordY = 0
    private numX = 0
    private numY = 0

    private curPicIndex = 1

    private callBack:Function = null
    private spriteBg = null
    private spriteWord = null
    private spriteNum:BitmapText = null

    private count = 0
    private comboFrame = 0  
    private totalTick = 0
    private boardMaxCnt = ConstantConfig_CommonNum.comboBgEffect.num
    private wordMaxCnt =  ConstantConfig_CommonNum.comboWordEffect.num
    private numMaxCnt = ConstantConfig_CommonNum.comboNumEffect.num;

	public loadBoardPic(){
		let bg = new eui.Image("ui_battle_BoardAttakBuff_png");
		bg.visible=false;
		this.spriteBg = bg;
	}
	public loadWordPic(){
		let word = new eui.Image("ui_battle_WordsAttakBuff_png");
		word.visible=false;
		this.spriteWord = word;
	}
	public setVisible(boo){
		this.node.visible=boo;
	}
	public loadNumPic(){
		let num = new BitmapText();
		num.setData("fight_number_lianjinum_png","+0123456789");
		num.visible=false;
		this.spriteNum = num;
	}
	private thisObj;
	public setCallBack( fun ,thisObj){
		this.thisObj = thisObj;
		this.callBack = fun;
	}
	public resetNum( num ){
		this.comboFrame = 0
    	this.count = 0
    	this.totalTick = 0;
		let arr = Helper.getComboLv(this.curPicIndex, num);
		let _tag = arr[0];
		let _index = arr[1];
		if(_tag == true){
			this.curPicIndex = Number(_index);
			let tableCombo = TableClientFightCombo.Table();
			if(this.callBack != null){
				this.callBack.call(this.thisObj,tableCombo[this.curPicIndex]);
			}
		}
		this.spriteBg.visible=true;
		this.spriteWord.visible=true;
		this.spriteNum.visible=true;
		this.spriteNum.setText = "+"+num;
		let sec = 1/ConstantConfig_RoleBattle.DEFAULTFPS;
    	this.update( sec );
	}
	public clear(){
		this.spriteBg.visible=false;
		this.spriteWord.visible=false;
		this.spriteNum.visible=false;
	}
	public release(){
		this.node.removeChild(this.spriteBg);
    	this.node.removeChild(this.spriteWord);
    	this.node.removeChild(this.spriteNum);
		this.node = null;
		this.thisObj = null;
		this.callBack = null;
	}
	public setPosition( x, y ){
		this.x = x
		this.y = y   

		this.boardX = this.x
		this.boardY = this.y

		this.wordX = this.x
		this.wordY = this.y

		this.numX = this.x
		this.numY = this.y
	}
	public addToLayer(){
		this.node.addChild(this.spriteBg);
    	this.node.addChild(this.spriteWord);
    	this.node.addChild(this.spriteNum);
	}
	public update( tick ){
		if(this.totalTick >= ConstantConfig_RoleBattle.COMBO_TIME){
			return true;
		}
		let rt = tick * 1000;
		this.comboFrame = this.comboFrame + rt;
		this.totalTick = this.totalTick + rt;
		if(this.comboFrame >= 33.3){
			this.updateLayer()
        	this.comboFrame = this.comboFrame - 33.3;
			this.count = this.count + 1
		}
		return false;
	}
	public updateLayer(){
		let index = this.count + 1;
		function freshSriteData( p, stand_x, stand_y, tbl, index ){
			let [param1, param2, param3, param4, param5] = [tbl.tblX[index], tbl.tblY[index], tbl.tblOpacity[index], tbl.tblScaleX[index], tbl.tblScaleY[index]];
			if(p != null){
				p.scaleX=param4;
				p.scaleY=param5;
				p.alpha=param3;
				p.x=stand_x+param1;
				p.y=stand_y-param2;
			}
		}
		if(this.count < this.boardMaxCnt){
			freshSriteData(this.spriteBg, this.boardX, this.boardY, ConstantConfig_CommonNum.comboBgEffect, index );
		}
		if(this.count < this.numMaxCnt){
			freshSriteData(this.spriteNum, this.numX+30, this.numY, ConstantConfig_CommonNum.comboNumEffect, index );
		}
		if(this.count < this.wordMaxCnt){
			freshSriteData(this.spriteWord, this.spriteNum.x+this.spriteNum.width - 35, this.wordY+5, ConstantConfig_CommonNum.comboWordEffect, index );
		}
	}
	public isTeach(){
		if(this.totalTick <= 300){
			if((ConstantConfig_RoleBattle.COMBO_SPC_FRAME - this.totalTick) / ConstantConfig_RoleBattle.COMBO_SPC_FRAME * 0.5 <= 0.2){
				return true;
			}
		}
		return false;
	}
}
}