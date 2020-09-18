namespace zj {
export class Fight_Replay extends UI{
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
	}
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public bTag = false;
	public update;
	public SpritFlag1:eui.Group;
	public SpritWord1:eui.Group;
	public SpritFlag2:eui.Group;
	public SpritWord2:eui.Group;
	public SpritFlag3:eui.Group;
	public SpritWord3:eui.Group;
	public Node_313:eui.Group;
	public tblFlags = [];
	public tblWords = [];
	public tblStates = [];
	public battleType;

	public Init(){
		// this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
		// this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
		// this.tblStates = [];
		// this.update = egret.setInterval(this.Update,this,0);
		// this.DealUi();
		// if(this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT
		// || this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
		// ){
		// 	this.saveSpriteState();
		// 	this.FreshFlag();
		// }else{
		// 	this.LayerContend
		// }
	}
}
}