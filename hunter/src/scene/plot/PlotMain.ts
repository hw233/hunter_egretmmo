namespace zj {
	/**
	 * 剧情
	 * zhaiweili
	 */
	export class PlotMain extends Dialog {
		private btnSkip: eui.Button;
		private imgBG: eui.Image;
		private groupPlot: eui.Group;
		private groupTouch: eui.Group;
		private plotPanel: PlotInfo;
		private items: TableClientTableStory[];
		private plotIdx: number
		private isAni: boolean;
		private isClose: boolean;

		private callback: Function;
		private thisObj: any = null;
		public constructor() {
			super();
			this.skinName = "resource/skins/plot/PlotMainSkin.exml";
		}

		public initData(items: TableClientTableStory[], callback: Function = null, thisObj: any = null) {
			this.isAni = false;
			this.isClose = false;
			this.items = items;
			this.callback = callback;
			this.thisObj = thisObj;
			this.plotIdx = 0;

			for (let i = 0; i < items.length; ++i) {
				let list = StoryDialog.getPlotCacheImg(items[i]);
				cachekeys(list, this);
			}
			this.plotPanel = newUI(PlotInfo);
			this.plotPanel.setOwner(this);
			this.groupPlot.addChild(this.plotPanel);
			this.addEvent();
			if (this.checkPlotStart()) {
				return true;
			}
			this.onClose();
			return false;
		}

		private checkPlotStart() {
			while (this.plotIdx < this.items.length) {
				if (this.items[this.plotIdx]) {
					if (this.plotPanel.setInfo(this.items[this.plotIdx])) {
						return true;
					}
					console.error("Plot main checkPlotStart error: " + this.items[this.plotIdx].id);
				} else {
					console.error("Plot main checkPlotStart null: " + this.plotIdx);
				}
				++this.plotIdx;
			}
			return false;
		}

		private addEvent() {
			this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
		}

		private clearEvent() {
			this.btnSkip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
			this.groupTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
		}

		// 显示对话框
		public showDialog(animation?: string) {
			this.isAni = true;
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.alpha = 0;
			Game.UIManager.GroupStory.addChild(this);
			let tw = egret.Tween.get(this)
				.to({ alpha: 1 }, 600)
				.wait(400)
				.call(() => {
					egret.Tween.removeTweens(this);
					this.plotPanel.onStart();
					this.isAni = false;
				});
		}

		// 关闭对话框
		public closeDialog(animation?: string) {
			if (this.parent) this.parent.removeChild(this);
			Game.UIManager.removeCacheResouce(this); // 移除UI缓存资源到待释放队列
			Game.UIManager.GroupStory.removeChildren();
			if (this.callback) {
				this.callback.call(this.thisObj);
				this.callback = null;
			}
		}

		public notifyPlotFinish() {
			if (++this.plotIdx < this.items.length) {
				this.isAni = true;
				egret.Tween.get(this.plotPanel)
					.to({ alpha: 0 }, 800)
					.wait(400)
					.call(() => {
						egret.Tween.removeTweens(this.plotPanel);
						this.isAni = false;
						if (this.checkPlotStart()) {
							this.plotPanel.alpha = 1;
							this.plotPanel.onStart();
							return true;
						}
						this.onClose();
					})
			} else {
				this.onClose();
			}
		}

		private onBtnContinue() {
			if (!this.isAni) {
				this.plotPanel.onContinue();
			}
		}

		private onBtnSkip() {
			if (!this.isAni) {
				this.onClose();
			}
		}
		private onClose() {
			if (!this.isClose) {
				console.log("-----------------------关闭剧情界面----------------------");
				this.isClose = true;
				this.clearEvent();
				this.isAni = true;
				egret.Tween.get(this)
					.to({ alpha: 0 }, 600)
					.call(() => {
						egret.Tween.removeTweens(this);
						this.closeDialog();
						Story.bFinish = false;
						Teach.DoOperateTeach();
						this.isAni = false;
					});
			}
		}
	}
}