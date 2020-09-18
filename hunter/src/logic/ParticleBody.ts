namespace zj {
	// 粒子对象类
	// zhaiweili
	// 2019.12.12

	export class ParticleBody extends UI {
		private res: string;
		private img: egret.Bitmap;
		private rotaSp: number;
		private moveSp: number;
		private faceMax: number;
		private faceMin: number;
		private faceCurr: number;
		public isFinish: boolean;
		private callFinish: Function;
		constructor() {
			super();
			this.width = 1;
			this.height = 1;
		}

		public init(res: string, xMin: number, xMax: number, yMin: number, yMax: number,
			moveSp: number, rotaSp: number, faceMin: number, faceMax: number, callFinish: Function) {
			this.visible = false;
			this.res = res;
			this.x = Util.randomValue(xMin, xMax);
			this.y = Util.randomValue(yMin, yMax);
			this.moveSp = moveSp;
			this.rotaSp = rotaSp;
			this.faceMin = faceMin;
			this.faceMax = faceMax;
			this.callFinish = callFinish;
			this.isFinish = false;
			RES.getResAsync(res, this.onLoadComplete, this);
		}

		private onLoadComplete() {
			let texture = RES.getRes(this.res);
			if(texture){
				if(!this.img){
					this.img = new egret.Bitmap(texture);
					this.img.scaleX = this.img.scaleY = 0.7;
				}
				this.img.anchorOffsetX = this.img.width / 2;
				this.img.anchorOffsetY = this.img.height / 2;
				this.addChild(this.img);
				this.setRun();
			} else {
				this.isFinish = true;
				this.visible = false;
				console.error("ParticleBody - load - error: " + this.res);
			}
		}

		private setRun() {
			this.faceCurr = Util.randomValue(this.faceMin, this.faceMax);
			this.visible = true;
		}

		public update(dt) {
			if (!this.isFinish && this.visible) {
				let disp = dt * this.moveSp;
				let offx = Util.getArcX(disp, this.faceCurr);
				let offy = Util.getArcY(disp, this.faceCurr);
				this.x += offx;
				this.y += offy;
				this.rotation += this.rotaSp;
				if(this.callFinish(this.x, this.y)){
					this.isFinish = true;
					this.visible = false;
				}
			}
		}

		public onRelease() {
			this.isFinish = true;
			this.visible = false;
			if(this.parent){
				this.parent.removeChild(this);
			}
			Game.ParticleManager.pool.push(this);
		}
	}
}