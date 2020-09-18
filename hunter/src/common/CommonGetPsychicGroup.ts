namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-7-20
	 * 
	 * @class 猎人念力激活念力时弹得小弹窗
	 */
	export class CommonGetPsychicGroup extends Dialog {
		private imgBG: eui.Image;
		private imgTitle: eui.Image;
		private listViewProp: eui.List;
		private labelClose: eui.Label;
		private groupItem: eui.Group;
		private cb: Function;

		public constructor() {
			super();
			this.skinName = "resource/skins/common/CommonGetPsychicGroupSkin.exml";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		}

		public SetCB(uiCB) {
			this.cb = uiCB;
		};

		public SetPsychicGroupInfo(groupInfo) {
			this.imgTitle.source = UIConfig.UIConfig_Psychic.groupUp[groupInfo.length];
			if (groupInfo instanceof Array) {
				for (let i = 1; i < groupInfo.length; i++) {
					let item = newUI(HunterPsychicGroupItem) as HunterPsychicGroupItem;
					item.x = i * 135;
					this.groupItem.addChild(item);
					this.groupItem.width = i * 135;
					item.SetInfo(i, groupInfo[i], this, false, false);
				}
			} else {
				let item = newUI(HunterPsychicGroupItem) as HunterPsychicGroupItem;
				this.groupItem.addChild(item);
				item.SetInfo(0, groupInfo, this, false, false);
			}
		}

		private onBtnClose() {
			if (this.cb) {
				this.cb();
			}
			this.close(UI.HIDE_TO_TOP);
		}
	}
}