namespace zj {
	/**
	 * 对象池管理类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class PoolManager {
		private readonly key_point: string = "point";
		private readonly key_mapRect: string = "mapRect";
		private static instance: PoolManager;
		private datas: any;
		// private pointList: egret.Point[];
		// private rectList: MapRect[];
		private constructor() {
			// this.pointList = [];
			// this.rectList = [];
			this.datas = {};
			this.datas[this.key_point] = [];
			this.datas[this.key_mapRect] = [];
		}
		public static getInstance(): PoolManager {
			if (!PoolManager.instance) {
				PoolManager.instance = new PoolManager();
			}
			return PoolManager.instance;
		}

		public getPoint(x: number = 0, y: number = 0): egret.Point {
			let list = this.datas[this.key_point];
			if (list.length > 0) {
				return list.shift().setTo(x, y);
			}
			return new egret.Point(x, y);
		}

		public addPoint(pos: egret.Point) {
			this.datas[this.key_point].push(pos);
		}

		public getMapRect(x: number, y: number, w: number, h: number, rotation: number = 0): MapRect {
			let list = this.datas[this.key_mapRect];
			if (list.length > 0) {
				return list.shift().setTo(x, y, w, h, rotation);
			}
			return new MapRect(x, y, w, h, rotation);
		}

		public addMapRect(rect: MapRect) {
			this.datas[this.key_mapRect].push(rect);
		}

		public getObj(key: string, classz:any){
			let list = this.datas[key];
			if(list && list.length > 0){
				return list.shift();
			}
			return new classz();
		}

		public addObj(key: string, item:any){
			if(!this.datas[key]){
				this.datas[key] = [];
			}
			this.datas[key].push(item);
		}
	}
}