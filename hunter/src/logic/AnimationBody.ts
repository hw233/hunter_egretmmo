namespace zj {
	/**
	 * MovieClip 基类
	 * 翟伟利
	 * 2019.12.10
	 */
	export class AnimationBody extends egret.DisplayObjectContainer {

		constructor() {
			super()
			this._mcFactory = new egret.MovieClipDataFactory();
			this._movieClip = new egret.MovieClip();
			this._movieClip.addEventListener(egret.Event.COMPLETE, this.onMovieFinish, this);
		}

		protected _mcFactory: egret.MovieClipDataFactory;
		protected _movieClip: egret.MovieClip;
		protected _resName: string;//当前的资源名
		protected _actionName: string;// 当前的动画名
		protected _frame: string;//当前的播放的动作名
		protected _playNum: number;// 播放的次数

		private loadJsonCount: number;
		private loadPngCount: number;

		private isAutoRemove: boolean;// 播放完成后，是否自动删除
		private finishCallback: Function;// 播放完成后回调
		private finishThisObj: any;

		private isCompont: boolean;// 是否加载资源完成
		protected isShow: boolean;// 当前是否显示
		private isPlay: boolean;// 是否已开始播放

		setRes(res: string, actionName: string = null, isAutoRemove: boolean = false) {
			this.isPlay = false;
			this._playNum = 1;
			this._actionName = actionName;
			this._frame = "1";
			this.isAutoRemove = isAutoRemove;
			this.isShow = true;
			this.rotation = 0;
			this.onLoadHandler(res);
		}

		protected onLoadHandler(res: string) {
			if (this._resName != res) {
				this._resName = res;
				this.isCompont = false;
				this.loadJsonCount = 0;
				this.loadPngCount = 0;
				this.finishCallback = null;
				this.finishThisObj = null;
				this.removeChildren();
				this.onLoadComplete();
			}
		}
		//加载完成处理
		protected onLoadComplete(): void {
			var resJson: string = this._resName + "_json";
			var _animJson = RES.getRes(resJson);
			if (!_animJson) {
				if (this.loadJsonCount > 2) {
					console.error("AnimatioinBody - onLoadComplete - error：res - json：" + resJson);
					return;
				}
				++this.loadJsonCount;
				RES.getResAsync(resJson, this.onLoadComplete, this);
				return;
			}
			var resPng: string = this._resName + "_png";
			var _animTexture: egret.Texture = RES.getRes(resPng);
			if (!_animTexture) {
				if (this.loadPngCount > 2) {
					console.error("模型动画资源出错 Animatioin - onLoadComplete - error：res - texture：" + resPng);
					return;
				}
				++this.loadPngCount;
				RES.getResAsync(resPng, this.onLoadComplete, this);
				return;
			}
			this.isCompont = true;
			this.initMovieClip(_animJson, _animTexture);
		}
		protected initMovieClip(_animJson, _animTexture) {
			if (this._mcFactory) {
				this._mcFactory.clearCache();
			}
			this._mcFactory.mcDataSet = _animJson;
			this._mcFactory.texture = _animTexture;
			let acName = this._actionName ? this._actionName : this._resName;
			this._movieClip.movieClipData = this._mcFactory.generateMovieClipData(acName);
			if (!this._movieClip.parent) {
				this.addChild(this._movieClip);
			}
			this.checkPlay();
		}
		public setAutoRemove(isAutoRemove: boolean) {
			this.isAutoRemove = isAutoRemove;
		}
		public setBlendMode(type: string = egret.BlendMode.ADD){
			Util.setBlendMode(this._movieClip, type);
		}
		public setFinishCallback(func: Function, thisObj: any) {
			this.finishCallback = func;
			this.finishThisObj = thisObj;
		}
		public onPlayFrame(frame, num = -1) {
			this._frame = frame ? frame : "1";
			this.onPlay(num);
		}
		public onPlay(num = -1) {
			this._playNum = num;
			this.isPlay = true;
			this.checkPlay();
		}

		protected checkPlay() {
			if (this.isCompont && this.isShow && this.isPlay) {
				if (!this._movieClip || !this._movieClip.parent) {
					return;
				}
				try {
					this._movieClip.visible = true;
					this._movieClip.gotoAndPlay(this._frame, this._playNum);
				} catch (e) {
					console.error("AnimationBody - checkPlay - error：res：" + this._resName + " -> " + this._frame);
				}
			}
		}

		protected onMovieFinish() {
			if (this.isAutoRemove) {
				this.onRelease();
			}
			if (this.finishCallback) {
				this.finishCallback.call(this.finishThisObj);
				this.finishCallback = null;
				this.finishThisObj = null;
			}
		}

		public onRelease() {
			this.isShow = false;
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.rotation = 0;
			this.x = this.y = 0;
			Game.AnimationManager.return(this);
		}
	}
}