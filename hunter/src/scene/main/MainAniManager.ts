namespace zj {
	export class MainAniManager {
		private static carPosList: egret.Point[][] =
		[[new egret.Point(2236, 440), new egret.Point(1946, 310), new egret.Point(1850, 278), new egret.Point(1776, 256)],
		[new egret.Point(2158, 445), new egret.Point(1930, 323), new egret.Point(1855, 290), new egret.Point(1771, 264)],
		[new egret.Point(1581, 265), new egret.Point(1508, 285), new egret.Point(1466, 306), new egret.Point(1416, 346)],
		[new egret.Point(1581, 267), new egret.Point(1544, 277), new egret.Point(1487, 304), new egret.Point(1434, 346)]];
		private static cardScales: number[][] = [[1, 0.3], [1, 0.2], [0.3, 1], [0.3, 1]];
		public scene: StageSceneMainCity;
		private moveList: MoveBody[];
		private flashList: LightBody[];
		private screenList: ScreenBody[];

		private carImgs: egret.DisplayObject[];
		private carList: CarBody[];

		public constructor(scene: StageSceneMainCity) {
			this.scene = scene;
			this.moveList = [];
			this.flashList = [];
			this.screenList = [];
			this.carImgs = [];
		}
		public addImgFlash(img: eui.Image) {
			let data = img.name.split(",");
			let body = new FlashBody();
			body.display = img;
			if (data) {
				if (data[0])
					body.timeMin = Number(data[0]);
				if (data[1])
					body.timeMax = Number(data[1]);
				if (data[2])
					body.alphaMax = Number(data[2]);
				if (data[3])
					body.timeShow = Number(data[3]);
			}
			this.flashList.push(body)
			body.reset();
		}
		public addImgLight(img: eui.Image) {
			let body = new LightBody();
			body.display = img;
			this.flashList.push(body);
			body.reset();
		}
		public addImgMove(img: eui.Image) {
			let data = -4;
			if (img.name.length > 0) {
				data = Number(img.name);
			}
			let body = new MoveBody();
			body.display = img;
			body.sp = data;
			body.minX = 90;
			body.maxX = this.scene.mapWidth;
			this.moveList.push(body)
		}
		public addCloud(img: eui.Image) {
			this.addImgMove(img);
		}
		public addDove(ani: AnimationBody) {// 鸽子
			let body = new ScreenBody();
			body.scene = this.scene;
			body.display = ani;
			body.sp = -6;
			body.checkMin = 1078;
			body.checkMax = 2324;
			this.screenList.push(body);
		}
		public addCar(img: eui.Image) {
			img.visible = false;
			this.carImgs.push(img);
		}
		public initCar() {
			if (this.carImgs.length == 4) {
				let body1 = new CarBody();
				body1.display = [this.carImgs[0], this.carImgs[1]];
				body1.posList = [MainAniManager.carPosList[0], MainAniManager.carPosList[1]];
				body1.scaleList = [MainAniManager.cardScales[0], MainAniManager.cardScales[1]];
				body1.sp = [Number(this.carImgs[0].name), Number(this.carImgs[1].name)];
				body1.init();

				let body2 = new CarBody();
				body2.display = [this.carImgs[2], this.carImgs[3]];
				body2.posList = [MainAniManager.carPosList[2], MainAniManager.carPosList[3]];
				body2.scaleList = [MainAniManager.cardScales[2], MainAniManager.cardScales[3]];
				body2.sp = [Number(this.carImgs[2].name), Number(this.carImgs[3].name)];
				body2.init();
				this.carList = [body1, body2];
			}
		}
		public Update(tick) {
			let mapLeft = this.scene.getScreenLeft();
			let mapRight = this.scene.getScreenRight();
			for (let i = 0; i < this.moveList.length; ++i) {
				this.moveList[i].update(tick);
			}
			for (let i = 0; i < this.flashList.length; ++i) {
				this.flashList[i].update(tick);
			}
			for (let i = 0; i < this.screenList.length; ++i) {
				this.screenList[i].update(tick, mapLeft, mapRight);
			}
			for (let i = 0; i < this.carList.length; ++i) {
				this.carList[i].update(tick);
			}
		}
		public onEntryTopScene() {
			for (let i = 0; i < this.flashList.length; ++i) {
				this.flashList[i].reset();
			}
		}

		public onLeaveTopScene() {
			for (let i = 0; i < this.flashList.length; ++i) {
				this.flashList[i].onClose();
			}
		}

		public onRelease() {
		}
	}
	/** 主界面汽车单位 */
	export class CarBody {
		public display: egret.DisplayObject[];
		public posList: egret.Point[][];
		public scaleList: number[][];
		public sp: number[];
		public carIdx: number;
		public stepIdx: number;
		private state: number;// 状态：0-等待，1-运行
		private dispAll: number[];
		private dispMove: number;
		private waitTimeMin: number;
		private waitTimeMax: number;
		private waitTimeCurr: number;
		public init() {
			this.waitTimeMin = 2000;
			this.waitTimeMax = 6000;
			for (let i = 0; i < this.display.length; ++i) {
				this.display[i].visible = false;
			}
			this.dispAll = [];
			for (let i = 0; i < this.posList.length; ++i) {
				this.dispAll[i] = 0;
				for (let j = 1; j < this.posList[i].length; ++j) {
					this.dispAll[i] += Util.pDisPoint(this.posList[i][j - 1].x, this.posList[i][j - 1].y, this.posList[i][j].x, this.posList[i][j].y);
				}
			}
			this.carIdx = 0;
			this.setWait();
		}

		private setWait() {
			this.dispMove = 0;
			this.state = 0;
			this.stepIdx = 0;
			this.waitTimeCurr = Util.randomValue(this.waitTimeMin, this.waitTimeMax) / 1000;
		}

		private runFinish() {
			this.carIdx = (this.carIdx + 1) % this.display.length;
			this.setWait();
		}

		private getCar() {
			return this.display[this.carIdx];
		}

		public update(dt) {
			if (this.state == 0) {
				this.waitTimeCurr -= dt;
				if (this.waitTimeCurr <= 0) {
					let car = this.getCar();
					car.x = this.posList[this.carIdx][0].x;
					car.y = this.posList[this.carIdx][0].y;
					car.scaleX = car.scaleY = this.scaleList[this.carIdx][0];
					car.visible = true;
					this.stepIdx = 1;
					this.state = 1;
				}
			} else {
				let car = this.getCar();
				let endP = this.posList[this.carIdx][this.stepIdx];
				let tsp = this.sp[this.carIdx] * dt;
				let [isFinish, offx, offy] = Util.moveObj(car, tsp, endP.x, endP.y);
				car.x += offx;
				car.y += offy;
				this.dispMove += tsp;
				let scales = this.scaleList[this.carIdx];
				car.scaleX = car.scaleY = scales[0] + (scales[1] - scales[0]) * (this.dispMove / this.dispAll[this.carIdx]);
				if (isFinish) {
					if (this.stepIdx < this.posList[this.carIdx].length - 1) {
						++this.stepIdx;
					} else {
						car.visible = false;
						this.runFinish();
					}
				}
			}
		}
	}
	/** 与屏幕位置有逻辑的运行单位 */
	export class ScreenBody {
		public scene: StageSceneMainCity;
		public display: egret.DisplayObject;
		public sp: number;
		public checkMin: number;
		public checkMax: number;

		public update(dt, mapLeft: number, mapRight: number) {
			this.display.x += this.sp * dt;
			if (this.sp < 0) {
				if (this.display.x + this.display.width < this.checkMin && this.isOutScreen(mapLeft, mapRight)) {
					this.display.x = Math.max(mapRight, this.checkMax) + 20;
				}
			} else {
				if (this.display.x > this.checkMax && this.isOutScreen(mapLeft, mapRight)) {
					this.display.x = Math.min(mapLeft, this.checkMin) - this.display.width - 20;
				}
			}
		}

		private isOutScreen(mapLeft: number, mapRight: number) {
			return this.display.x + this.display.width < mapLeft
				|| this.display.x > mapRight;
		}
	}
	/** 移动单位 */
	export class MoveBody {
		public display: egret.DisplayObject;
		public sp: number;
		public minX: number;
		public maxX: number;

		public update(dt) {
			this.display.x += this.sp * dt;
			if (this.sp < 0) {
				if (this.display.x + this.display.width < this.minX) {
					this.display.x = this.maxX;
				}
			} else {
				if (this.display.x > this.maxX) {
					this.display.x = this.minX - this.display.width;
				}
			}
		}
	}
	/** 闪烁单位基类单位（此为阳光类，阳光闪烁逻辑） */
	export class LightBody {
		public display: egret.DisplayObject;
		public timeCurr: number;// 单位：秒
		public state: number;// 状态：0-等待状态，1-闪烁状态

		public reset() {
			this.display.visible = false;
			this.timeCurr = 4;
			this.state = 0;
		}
		public setFlash() {
			this.state = 1;
			this.display.alpha = 0;
			this.display.visible = true;
			egret.Tween.get(this.display)
				.to({ alpha: 0.3 }, 1200)
				.wait(1000)
				.to({ alpha: 0.2 }, 400)
				.wait(800)
				.to({ alpha: 0.4 }, 1200)
				.wait(3000)
				.to({ alpha: 0 }, 3000)
				.call(() => {
					this.onClose();
				});
		}
		public onClose() {
			egret.Tween.removeTweens(this.display);
			this.reset();
		}
		public update(dt) {
			if (this.state == 0) {
				this.timeCurr -= dt;
				if (this.timeCurr <= 0) {
					this.setFlash();
				}
			}
		}
	}
	/** 闪烁子类 */
	export class FlashBody extends LightBody{
		public timeMin: number = 2000;
		public timeMax: number = 10000;
		public alphaMax: number = 1;
		public timeShow: number = 1000;
		public timeOpen: number = 800;
		public timeClose: number = 800;
		public reset() {
			super.reset();
			this.timeCurr = Util.randomValue(this.timeMin, this.timeMax) / 1000;
		}

		public setFlash() {
			this.state = 1;
			this.display.alpha = 0;
			this.display.visible = true;
			egret.Tween.get(this.display)
				.to({ alpha: this.alphaMax }, this.timeOpen)
				.wait(this.timeShow)
				.to({ alpha: 0 }, this.timeClose)
				.call(() => {
					this.onClose();
				});
		}
	}
}