namespace zj {
	/**
	 * 地图中的区域（非tiledMap地图中的碰撞检测用）
	 * zhaiweili
	 * 2019.10.24
	 */
	export class MapRect {
		public posLUp: egret.Point;// 左上点
		public posRUp: egret.Point;// 右上点
		public posRDown: egret.Point;// 右下点
		public posLDown: egret.Point;// 左下点
		public rotation: number;
		public rect: egret.Rectangle;

		public left: number;
		public top: number;
		public right: number;
		public bottom: number;

		public constructor(x: number, y: number, w: number, h: number, rotation: number = 0) {
			this.setTo(x, y, w, h, rotation);
		}

		public setTo(rx: number, ry: number, rw: number, rh: number, rotation: number = 0): MapRect {
			this.posLUp = new egret.Point(rx, ry);

			let [x, y] = Util.getPosByRadiiAndAngle(rx, ry, rotation, rw);
			this.posRUp = new egret.Point(x, y);

			[x, y] = Util.getPosByRadiiAndAngle(rx, ry, rotation + 90, rh);
			this.posLDown = new egret.Point(x, y);

			this.posRDown = new egret.Point(
				this.posRUp.x + this.posLDown.x - rx,
				this.posRUp.y + this.posLDown.y - ry);

			this.left = Math.min(this.posLUp.x, this.posRUp.x, this.posRDown.x, this.posLDown.x);
			this.right = Math.max(this.posLUp.x, this.posRUp.x, this.posRDown.x, this.posLDown.x);
			this.top = Math.min(this.posLUp.y, this.posRUp.y, this.posRDown.y, this.posLDown.y);
			this.bottom = Math.max(this.posLUp.y, this.posRUp.y, this.posRDown.y, this.posLDown.y);
			return this;
		}
		/**
		 * 检测点是否在区域内
		 */
		public isInPoint(x: number, y: number): boolean{
			let jUp = Util.getAngle(x, y, this.posLUp.x, this.posLUp.y, this.posRUp.x, this.posRUp.y);
			let jRight = Util.getAngle(x, y, this.posRDown.x, this.posRDown.y, this.posRUp.x, this.posRUp.y);
			let jDown = Util.getAngle(x, y, this.posLDown.x, this.posLDown.y, this.posRDown.x, this.posRDown.y);
			let jLeft = Util.getAngle(x, y, this.posLUp.x, this.posLUp.y, this.posLDown.x, this.posLDown.y);
			return Math.round(jUp + jRight + jDown + jLeft) == 360;
		}
	}
}