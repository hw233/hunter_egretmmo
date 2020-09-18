namespace zj {
	export class AdventureOpenAni extends UI {
		private group: eui.Group;
		private lbName: eui.Label;
		private imgFontMask: eui.Image;
		private imgIcon: eui.Image;

		private callback;
		private thisobj;
		public constructor() {
			super();
			this.skinName = "resource/skins/adventure/AdventureOpenAniSkin.exml";
			this.width = 320;
			this.height = 116;
		}

		public startAni(type: number, data: TableInstanceArea, callback, thisobj){
			this.callback = callback;
			this.thisobj = thisobj;
			this.lbName.text =  data.area_id + "." + data.area_name;
			this.imgFontMask.visible = false;
			this.imgIcon.visible = false;
			this.currentState = "open" + type;
			this.group.scaleX = this.group.scaleY = 0;
			// 整体放大
			let time = 500;
			let tw = egret.Tween.get(this.group);
			Game.SoundManager.playEffect(SoundManager.SoundOpen(30069), 500);
			tw.to({scaleX: 1, scaleY: 1}, 1 * time, egret.Ease.backOut);
			tw.wait(200);
			tw.call(this.aniFinish1, this);
		}

		private aniFinish1(){
			egret.Tween.removeTweens(this.group);
			// new图标放大
			this.imgIcon.scaleX = this.imgIcon.scaleY = 0;
			this.imgIcon.visible = true;
			let tw = egret.Tween.get(this.imgIcon);
			let time = 300;
			tw.to({scaleX: 1.3, scaleY: 1.3}, 1 * time);
			tw.to({scaleX: 0.7, scaleY: 0.7}, 0.6 * time);
			tw.to({scaleX: 1.1, scaleY: 1.1}, 0.4 * time);
			tw.to({scaleX: 1, scaleY: 1}, 0.1 * time);
			tw.wait(200);
			tw.call(this.aniFinish2, this);
		}

		private aniFinish2(){
			egret.Tween.removeTweens(this.imgIcon);
			// new mission文字闪烁
			this.imgFontMask.alpha = 0;
			this.imgFontMask.visible = true;
			let tw = egret.Tween.get(this.imgFontMask);
			tw.to({alpha: 1}, 300);
			tw.wait(300);
			tw.to({alpha: 0}, 400);
			tw.wait(600);
			tw.call(this.aniFinishAll, this);
		}

		private aniFinishAll(){
			egret.Tween.removeTweens(this.imgFontMask);
			this.close();
			if(this.callback && this.thisobj){
				this.callback.call(this.thisobj);
			}
		}

	}
}