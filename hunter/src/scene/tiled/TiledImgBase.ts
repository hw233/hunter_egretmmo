namespace zj {
	/**
	 * tiledMap 图片对象类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class TiledImgBase extends egret.DisplayObjectContainer {
		public tileX: number;
		public tileY: number;
		public gid: number;
		public tileSet: tiled.TMXTileset;
		public constructor(gid: number, tileX: number, tileY: number, tileW: number, tileH: number, tileSet: tiled.TMXTileset) {
			super();
			this.gid = gid;
			this.tileX = tileX;
			this.tileY = tileY;
			this.tileSet = tileSet;
			this.x = tileX * tileW;
			this.y = (tileY + 1) * tileH;

			this.width = tileSet.tilewidth;
			this.height = tileSet.tileheight;
			this.anchorOffsetY = this.height;

			let idx = gid - tileSet.firstgid;
			let ix = idx % tileSet.horizontalTileCount;
			let iy = Math.floor(idx / tileSet.horizontalTileCount);
			let img = new eui.Image();
			img.source = tileSet.image.source;
			img.x = -ix * tileSet.tilewidth;
			img.y = -iy * tileSet.tileheight;
			this.addChild(img);
			this.mask = new egret.Rectangle(tileSet.tilewidth, tileSet.tileheight);
		}
	}
}