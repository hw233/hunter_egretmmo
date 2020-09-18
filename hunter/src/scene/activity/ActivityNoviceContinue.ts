namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-4-26
	 * 
	 * @class 强者之路
	 */
	export class ActivityNoviceContinue extends noviceBase {
		public imgbg: eui.Image;
		public constructor() {
			super();
			// this.skinName = "resource/skins/activity/ActivityNoviceContinueSkin.exml";

			// this.init();
		}
		public init() {
			// super.init();
			// this.addEventListener(egret.TouchEvent.TOUCH_END, super.up, this);
		}

		/**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
		public up() {
			// this.btnGift.scaleX = 1;
			// this.btnGift.scaleY = 1;
			// let dialogDrop = this.getChildByName("UI");
			// if (dialogDrop) {
			// 	this.removeChild(dialogDrop);
			// }
		}
	}
}