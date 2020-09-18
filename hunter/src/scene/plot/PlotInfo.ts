namespace zj {
	/**
	 * 剧情
	 * zhaiweili
	 */
	export class PlotInfo extends UI {
		public static time_show: number = 800;// 剧情图片出现的动画时间
		public static time_wait: number = 2200;// 剧情出现后的等待时间
		private owner: PlotMain;
		private item: TableClientTableStory;
		private stepMax: number;
		private stepIdx: number;
		private stepState: number;// 0-出现状态，1-等待状态
		private imgBacks: eui.Image[];
		private imgTalks: eui.Image[];
		private currImgBack: eui.Image;
		private currImgTalk: eui.Image;
		public constructor() {
			super();
		}

		public setOwner(owner: PlotMain){
			this.owner = owner;
		}

		public setInfo(item: TableClientTableStory) {
			if(item){
				this.item = item;
				this.stepIdx = 0;
				this.stepState = 0;
				this.skinName = "resource/skins/plot/PlotSkin" + item.content + ".exml";
				return this.parseItem();
			}
			return false;
		}

		private parseItem(): boolean{
			this.imgBacks = [];
			this.imgTalks = [];
			let idx = 0;
			let isHas = true;
			while(isHas){
				let backId = "img_back_" + idx;
				let talkId = "img_talk_" + idx;
				if(this[backId]){
					this.imgBacks[idx] = this[backId];
				}
				if(this[talkId]){
					this.imgTalks[idx] = this[talkId];
				}
				if(this.imgBacks[idx] || this.imgTalks[idx]){
					++idx;
					this.stepMax = idx;
				} else {
					isHas = false;
				}
			}
			if(this.stepMax > 0){
				this.onInit();
				return true;
			}
			return false;
		}

		private onInit(){
			this.stepIdx = 0;
			this.stepState = 0;
			for(let i = 0; i < this.stepMax; ++i){
				this.setImgInit(this.imgBacks[i], this.imgTalks[i]);
			}
		}

		private setImgInit(imgBack: eui.Image, imgTalk: eui.Image){
			if(imgBack){
				imgBack.visible = false;
				imgBack.alpha = 0;
			}
			if(imgTalk){
				imgTalk.visible = false;
				imgTalk.alpha = 0;
			}
		}

		private setImgAni(imgBack: eui.Image, imgTalk: eui.Image){
			if(imgBack){
				imgBack.visible = true;
				imgBack.alpha = 0;
				let twb = egret.Tween.get(imgBack)
				.to({alpha: 1}, PlotInfo.time_show)
				.call(()=>{
					egret.Tween.removeTweens(imgBack);
					this.setImgWait();
				});
			}
			if(imgTalk){
				imgTalk.visible = true;
				imgTalk.alpha = 0;
				let twt = egret.Tween.get(imgTalk)
				.to({alpha: 1}, PlotInfo.time_show)
				.call(()=>{
					egret.Tween.removeTweens(imgTalk);
					if(!imgBack){
						this.setImgWait();
					}
				});
			}
			this.currImgBack = imgBack;
			this.currImgTalk = imgTalk;
		}

		private setImgShow(imgBack: eui.Image, imgTalk: eui.Image){
			if(imgBack){
				egret.Tween.removeTweens(imgBack);
				imgBack.alpha = 1;
			}
			if(imgTalk){
				egret.Tween.removeTweens(imgTalk);
				imgTalk.alpha = 1;
			}
			this.setImgWait();
		}

		private setImgWait(){
			let waitTime = this.stepIdx >= this.stepMax - 1 ? PlotInfo.time_wait * 1.5 : PlotInfo.time_wait;
			let tw = egret.Tween.get(this)
			.wait(waitTime)
			.call(()=>{
				this.setClearWait();
			});
			this.stepState = 1;
		}

		private setClearWait(){
			egret.Tween.removeTweens(this)
			this.next();
		}

		public onStart(){
			this.stepIdx = 0;
			this.onPlayStep();
		}

		public onPlayStep(){
			this.setImgAni(this.imgBacks[this.stepIdx], this.imgTalks[this.stepIdx]);
			this.stepState = 0;
		}

		public onContinue(){
			switch(this.stepState){
				case 0:
					this.setImgShow(this.currImgBack, this.currImgTalk);
					break;
				case 1:
					this.setClearWait();
					if(this.stepIdx < this.stepMax){
						this.setImgShow(this.currImgBack, this.currImgTalk);
					}
					break;
			}
		}
		public next(){
			if(this.stepIdx < this.stepMax - 1){
				++this.stepIdx;
				this.onPlayStep();
			} else {
				this.owner.notifyPlotFinish();
			}
		}
	}
}