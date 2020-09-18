namespace zj {
	export class Dialog_InstanceArea extends Dialog {
		private groupCloud: eui.Group;

		private callBack: () => void;

		public constructor() {
			super();
			this.skinName = "resource/skins/teach/Dialog_InstanceAreaSkin.exml";
			this.groupCloud.visible = true;
		}

		public cloudAni(cb: () => void) {
			this.callBack = cb;
			egret.Tween.get(this.groupCloud).to({ x: 100, alpha: 1 }, 0).wait(200).to({ x: 650, alpha: 0 }, 3000).call(() => {
				egret.Tween.removeTweens(this.groupCloud)
				if (this.callBack) this.callBack();
			})
		}
	}
}