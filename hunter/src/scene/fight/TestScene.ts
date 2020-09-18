namespace zj {
	export class TestScene extends Scene{
		public constructor() {
			super();
			this.sceneSp = new egret.Sprite();
			this.addChild(this.sceneSp);

			this.sp = new egret.Sprite();
			this.sp.touchEnabled = true;
			this.sceneSp.addChild(this.sp);
			this.sp.graphics.beginFill(0xff0000,0.3);
			this.sp.graphics.drawRect(0,0,UIManager.StageWidth,UIManager.StageHeight);
			this.sp.graphics.endFill();
			this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);

			this.uiSp = new egret.Sprite();
			this.addChild(this.uiSp);

			this.count = egret.$hashCount;
        	this.tttt = egret.setInterval(this.timer,this,1000);

			let button:egret.Sprite = new egret.Sprite();
			button.touchEnabled = true;
			this.uiSp.addChild(button);
			button.graphics.beginFill(0x000000);
			button.graphics.drawRect(0,0,100,50);
			button.graphics.endFill();
			button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);
		}
		private closeHandler(){
			egret.clearInterval(this.tttt);
			StageSceneManager.Instance.clearScene();
		}
		private uiSp:egret.Sprite;
		private sceneSp:egret.Sprite;
		private tttt;
    	private count = 0;
		private timer(){
			let newCount = egret.$hashCount;
			let diff = newCount - this.count;
			this.count = newCount;
			console.log("！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"+diff);
			
		}
		private sp:egret.Sprite;
		private arr = [];
		private arrIndex = 0;
		private dbArr = [];
		public Init(){
			this.arr = FightLoading.getInstance().resArr;

		}
		public clickHandler(e:egret.TouchEvent){
			let [spx,] = HunterSpineX(1, 1, null, this.arr[this.arrIndex]);
			spx.ChangeAction(0);
			spx.SetPosition(e.localX,e.localY);
			this.sceneSp.addChild(spx.spine);
			this.dbArr.push(spx);
			this.arrIndex++;
			if(this.arrIndex >= this.arr.length){
				this.arrIndex = 0;
			}
		}
		public OnLoading(num){
			
		}
		public OnExit(){
			while(this.dbArr.length > 0){
				let spine = this.dbArr[0];
				clearSpine(spine.spine);
				this.dbArr.splice(0,1);
				spine.spine = null;
				spine = null;
			}
			this.dbArr.length = 0;
		}
	}
}