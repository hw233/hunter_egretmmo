namespace zj {
	export class ToastUI extends eui.Component {
		private group: eui.Group;
		private imgBG: eui.Image;
		private label: eui.Label;
		public constructor(str: string) {
			super();
			this.skinName = "resource/skins/common/ToastUISkin.exml";
			this.width = 688;
			this.height = 65;
			this.touchEnabled = false;
			this.touchChildren = false;
			this.label.textFlow = Util.RichText(str);
			this.imgBG.x = -this.width / 2;
			this.label.x = this.width / 2;
		}

		public onStart() {
			egret.Tween.get(this.imgBG)
				.to({ x: 0 }, 200, egret.Ease.sineOut)
				.call(() => {
					egret.Tween.removeTweens(this.imgBG);
				});
			egret.Tween.get(this.label)
				.to({ x: 0 }, 200, egret.Ease.sineOut)
				.call(() => {
					egret.Tween.removeTweens(this.label);
				});

			egret.Tween.get(this.group)
				.wait(2000)
				.to({ y: -100, alpha: 0 }, 500, egret.Ease.circIn)
				.call(() => {
					egret.Tween.removeTweens(this.group);
					this.close();
				});
		}

		public close() {
			if (this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}