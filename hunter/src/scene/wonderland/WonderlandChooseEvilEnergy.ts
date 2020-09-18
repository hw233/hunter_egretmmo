namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-17
 * 
 * @class 贪婪之岛罪恶值详情介绍
 */
export class WonderlandChooseEvilEnergy extends UI {
	public imgFrame: eui.Image;
	public label5: eui.Label;
	public label2: eui.Label;
	public label0: eui.Label;
	public label1: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/WonderlandChooseEvilEnergySkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.close();
		}, this);
	}
}
}