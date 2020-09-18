namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-5-6
	 * 
	 * @class 赏金猎人特训
	 */
	export class ActivityWeekMissionThree extends weekActBase {
		public SpriteTitle: eui.Image;
		public SpriteNpc: eui.Image;
		public SpriteTitleGift: eui.Image;
		public NodeFreeAward: eui.Group;
		public LabelFreeAwardNum: eui.BitmapLabel;
		public ButtonGetFree: eui.Button;
		public SpriteFreeAwardTips: eui.Image;
		public TableViewTag: eui.List;
		public TableViewItem: eui.List;
		public ButtonClose: eui.Button;
		public labelTime: eui.Label;
		public labelTime1: eui.Label;
		public labelTime2: eui.Label;
		public labelTime3: eui.Label;
		public imgbg: eui.Image;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityWeekMissionThreeSkin.exml"
		}
		public SetType(index: number) {
			this.SpriteTitleGift.visible = false;
			this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClose, this);
			this.ButtonGetFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGetFree, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			super.SetType(index);
		}
	}
}