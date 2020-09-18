namespace zj {
	/**
	 * @author 翟伟利
	 * @date 2019-12-26
	 * @class 音乐测试类
	 */
	export class TestSound extends Dialog{
		private group: eui.Group;
		private btnClose: eui.Button;
		private tuochLabel: eui.Label;
		private labelCurr: eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/skins/test/TestSoundSkin.exml";
		}

		public onInit(){
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				this.close(UI.HIDE_TO_TOP);
			}, this);
			let files = RES["config"].config.fileSystem["fsData"];
			let i = 1;
			for(let key in files){
				let obj = files[key];
				if(obj.type == "sound"){
					let label = new eui.Label();
					label.size = 24;
					label.text = i + ": " + obj.name + ": " + obj.url;
					label.name = obj.name;
					label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLabel, this);
					this.group.addChild(label);
					++i;
				}
			}
		}

		private onTouchLabel(e: egret.TouchEvent){
			if(this.tuochLabel){
				this.tuochLabel.textColor = 0xffffff;
				this.tuochLabel = null;
			}
			this.tuochLabel = e.target;
			this.tuochLabel.textColor = 0xFF00;
			let sound = this.tuochLabel.name;
			console.log(sound);
			Game.SoundManager.playMusic(sound, 1);
			this.labelCurr.text = sound;
		}
	}
}