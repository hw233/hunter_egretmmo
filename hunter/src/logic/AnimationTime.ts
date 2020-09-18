namespace zj {
	/**
	 * MovieClip 时间类
	 * 翟伟利
	 * 2019.12.10
	 */
	export class AnimationTime extends AnimationBody {
		private timeMax: number;
		private timeMin: number;
		constructor() {
			super();
		}
		public setTime(timeMin: number, timeMax: number) {
			this.timeMin = timeMin;
			this.timeMax = timeMax;
		}
		public onPlay(num = 1) {
			this._movieClip.visible = false;
			egret.setTimeout(() => {
				super.onPlay(num);
			}, this, Util.randomValue(this.timeMin, this.timeMax));
		}
		protected onMovieFinish() {
			this._movieClip.visible = false;
			egret.setTimeout(this.checkPlay, this, Util.randomValue(this.timeMin, this.timeMax));
		}

		// public onRelease() {
		// 	this.isShow = false;
		// 	if (this.parent) {
		// 		this.parent.removeChild(this);
		// 	}
		// 	this.rotation = 0;
		// 	Game.AnimationManager.returnTime(this);
		// }
	}
}