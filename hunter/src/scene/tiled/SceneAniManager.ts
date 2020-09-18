namespace zj {
	export class SceneAniManager {
		private scene: SceneMapTiledAdventure;
		private floatList: FloatBody[];
		private aniList: AnimationBody[];
		private dove: AdventDove;
		public constructor(scene: SceneMapTiledAdventure) {
			this.scene = scene;
			this.floatList = [];
		}

		public init() {
			this.initImgFloat(this.scene);
			this.initWave(this.scene);
			this.initDove(this.scene);
			this.initSnowflake(this.scene);
		}
		/** 海浪 */
		private initWave(stage: SceneMapTiledAdventure) {
			let layer = stage.getLayer(LAYER_TYPE.surface);
			let res = "imgWave";
			let aniName = "advent_ani_wave";
			let idx = 0;
			this.aniList = [];
			while (stage[res + idx]) {
				let img = stage[res + idx] as eui.Image;
				let ani = Game.AnimationManager.createTime(aniName, 100, 600);
				if (ani) {
					ani.x = img.x;
					ani.y = img.y;
					ani.rotation = img.rotation;
					layer.addChild(ani);
					ani.onPlay();
					this.aniList.push(ani);
				}
				img.parent.removeChild(img);
				++idx;
			}
		}

		/** 浮动单位 */
		private initImgFloat(stage: SceneMapTiledAdventure) {
			let res = "imgFloat";
			let idx = 0;
			while (stage[res + idx]) {
				let body = new FloatBody();
				body.init(stage[res + idx]);
				this.floatList.push(body);
				++idx;
			}
		}

		/** 鸽子 */
		private initDove(stage: SceneMapTiledAdventure) {
			let layer = stage.getLayer(LAYER_TYPE.top);
			this.dove = new AdventDove();
			this.dove.init(stage, layer);
			layer.addChild(this.dove.dislay);
		}

		/** 雪花 */
		private initSnowflake(stage: SceneMapTiledAdventure) {
			// let layer = stage.getLayer(LAYER_TYPE.surface);
		}

		public onEntryScene() {
			if (this.aniList) {
				let layer = this.scene.getLayer(LAYER_TYPE.surface);
				for (let i = 0; i < this.aniList.length; ++i) {
					if (!this.dove.dislay.parent) {
						layer.addChild(this.aniList[i]);
					}
				}
			}
			if (this.dove && this.dove.dislay) {
				let layer = this.scene.getLayer(LAYER_TYPE.top);
				if (!this.dove.dislay.parent) {
					layer.addChild(this.dove.dislay);
				}
			}
		}
		public onLeaveScene() {
			if (this.aniList) {
				let layer = this.scene.getLayer(LAYER_TYPE.surface);
				for (let i = 0; i < this.aniList.length; ++i) {
					if (this.aniList[i].parent) {
						layer.removeChild(this.aniList[i]);
					}
				}
			}
			if (this.dove && this.dove.dislay && this.dove.dislay.parent) {
				let layer = this.scene.getLayer(LAYER_TYPE.top);
				layer.removeChild(this.dove.dislay);
			}
		}

		public Update(dt) {
			if (this.floatList) {
				for (let i = 0; i < this.floatList.length; ++i) {
					this.floatList[i].update(dt);
				}
			}
			if (this.dove) {
				this.dove.update(dt);
			}
		}
		public release() {
			if (this.aniList) {
				for (let i = 0; i < this.aniList.length; ++i) {
					this.aniList[i].onRelease();
					this.aniList[i] = null;
				}
				this.aniList = null;
			}
			if (this.dove) {
				this.dove.onRelease();
				this.dove = null;
			}
		}
	}
	/** 副本地图鸽子 */
	export class AdventDove {
		private scene: SceneMapTiledAdventure;
		public dislay: AnimationBody;
		public timeWait: number;// 等待时间，单位：秒
		public offx: number;
		public offy: number;
		public state: number;// 0-等待，1-飞行
		public init(scene: SceneMapTiledAdventure, layer: egret.DisplayObjectContainer) {
			this.scene = scene;
			this.dislay = Game.AnimationManager.create("advent_ani_dove");
			this.offx = 30;// 向右飞
			this.offy = -this.offx * 0.71;// 向上飞
			layer.addChild(this.dislay);
			this.dislay.onPlay();
			this.stop();
		}

		private stop() {
			this.dislay.visible = false;
			this.timeWait = Util.randomValue(1, 3);
			this.state = 0;
		}

		private setFlyStart() {
			let minX = this.scene.getMapX() - 100;
			let maxX = minX + UIManager.StageWidth + 100;
			let x = Util.randomValue(minX, maxX) + this.scene.getMapX();
			let y = this.scene.getMapY() + UIManager.StageHeight + 100;
			this.dislay.x = x;
			this.dislay.y = y;
			this.dislay.visible = true;
			this.state = 1;
		}

		public update(dt) {
			if (this.state == 0) {
				this.timeWait -= dt;
				if (this.timeWait <= 0) {
					this.setFlyStart();
				}
			} else {
				this.dislay.x += this.offx * dt;
				this.dislay.y += this.offy * dt;
				if (this.dislay.y + 100 < this.scene.getMapY()) {
					this.stop();
				}
			}
		}

		public onRelease() {
			this.dislay.onRelease();
			this.dislay = null;
		}
	}
	/** 浮动对象 */
	export class FloatBody {
		public display: egret.DisplayObject;
		public min: number;
		public max: number;
		public sp: number;

		public init(img: eui.Image) {
			this.display = img;
			this.min = img.y - 20;
			this.max = img.y + 20;
			this.sp = Util.randomValue(6, 8);
			this.display.y = Util.randomValue(this.min, this.max);
			this.sp = Util.randomValue(0, 100) < 50 ? -this.sp : this.sp;
		}

		public update(dt) {
			this.display.y += this.sp * dt;
			if (this.display.y >= this.max || this.display.y <= this.min) {
				this.sp = -this.sp;
			}
		}
	}
}