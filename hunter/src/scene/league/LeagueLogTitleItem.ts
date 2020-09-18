namespace zj {
//公会日志中的日期
//yuqingchao
//2018.12.27
export class LeagueLogTitleItem extends eui.ItemRenderer{
	private lbDate:eui.Label;		//日期显示
	private father:LeagueLog;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueLogTitleItemSkin.exml"
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);
	}
	public init(father:LeagueLog){
		this.father = father;
	}
	protected dataChanged() {
		let timeTbl = this.data.timeTblnew;
		let des = "";
		//日期显示的格式
		if(timeTbl.M >= 10){
			if(timeTbl.D >= 10) des = "%d-%d-%d";
			else des = "%d-%d-"+"0"+"%d";
		}
		else{
			if(timeTbl.D >= 10) des = "%d-"+"0"+"%d-%d";
			else des = "%d-"+"0"+"%d-"+"0"+"%d";
		}
		this.lbDate.text = HelpUtil.textConfigFormat(des,timeTbl.Y,timeTbl.M,timeTbl.D);
	}
}
}