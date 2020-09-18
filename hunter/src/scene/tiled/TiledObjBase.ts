namespace zj {
	/**
	 * tiledMap object 数据对象(有碰撞和遮挡关系)
	 * zhaiweili
	 * 2019.10.24
	 */
	export class TiledObjBase extends egret.DisplayObjectContainer {
		public dict;
		public constructor(dict) {
			super();
			this.dict = dict;
			this.initInfo(dict);
		}

		protected initInfo(dict){
			// dict["name"]
			// dict["type"]
		}

		public setPosByTile(tileX: number, tileY: number, tileW: number, tileH: number){
			this.setPos((tileX + 0.5) * tileW, (tileY + 0.5) * tileH);
		}

		public setPos(x: number, y: number){
			this.x = x;
			this.y = y;
		}
	}
}