namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-29
	 * 
	 * @class 高手进阶玛琪篇
	 */
	export class ActivityNoviceHighNext extends noviceBase {
		// public imgNpc1: eui.Image;
		// public imgNpc2: eui.Image;
		// public btnClose: eui.Button;
		// public imgTitle: eui.Image;
		// public imgBar: eui.Image;
		// public imgBar1: eui.Image;
		// public labelCount: eui.BitmapLabel;
		// public listViewTag: eui.List;
		// public listViewItem: eui.List;
		// public btnGift: eui.Button;
		// public labelTime: eui.Label;
		// public labelTime1: eui.Label;
		// public labelTime2: eui.Label;
		// public labelTime3: eui.Label;
		// public imgbg: eui.Image;
		public constructor() {
			super();
			// this.skinName = "resource/skins/activity/ActivityNoviceHighNextSkin.exml";
			// this.init();
		}
		// public init() {
		// 	super.init();
		// 	this.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGift1, this);
		// 	this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
		// }

		// public setType(type: number) {
		// 	super.setType(type);
		// 	this.setResInfo();
		// }

		// public onBtnGift1() {
		// 	this.btnGift.scaleX = 1.1;
		// 	this.btnGift.scaleY = 1.1;
		// }
		// // /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
		// // public up() {
		// // 	this.btnGift.scaleX = 1;
		// // 	this.btnGift.scaleY = 1;
		// // 	if (this.commonDesSkillvis == true) {
		// // 		this.removeChild(this.commonDesSkill);
		// // 		this.commonDesSkillvis = false;
		// // 	}
		// // }

		// private setResInfo() {
		// 	if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI) {
		// 		this.imgNpc1.visible = true;
		// 		this.imgNpc2.visible = false;
		// 	} else if (this.noviceType == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI) {
		// 		this.imgNpc1.visible = false;
		// 		this.imgNpc2.visible = true;
		// 	}
		// 	this.imgTitle.source = cachekey(UIConfig.UIConfig_Novice[this.noviceType].title, this);
		// }

		// /**奖励详情 */
		// public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
		// 	super.awardParticulars(xy, cx, cy, info);
		// 	// this.commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
		// 	// this.addChild(this.commonDesSkill);
		// 	// this.commonDesSkillvis = true;
		// }
	}
}