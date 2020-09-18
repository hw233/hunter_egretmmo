namespace zj {
	/**
	 * 有 tiledMap 的单机地图基类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapTiledBase extends SceneMapBase {
		
		protected tileW: number;// 地图块宽
		protected tileH: number;// 地图块高
		protected tileCountW: number;// 地图块数横向
		protected tileCountH: number;// 地图块数纵向
		protected tiledMap: tiled.TMXTilemap = null;// tiledMap 地图对象
		protected blocks: number[][];// 地图碰撞点-1无碰撞
		protected blockAstar: number[][];// 用于AStar检测用，复制于blocks

		public constructor() {
			super();
		}
		public init(ui:SceneMapUIBase, param: any = null) {
			super.init(ui);
			// 资源是否为zip压缩包
			let isZip: boolean = false;
			TiledDataManager.getInstance().getMapData(param, isZip)
				.then(([data, tiledMap])=>{
					this.initTiledMap(data, tiledMap);
					egret.setTimeout(() => {
						this.onStart();
					}, this, 500);
				});
			// let tileMapId = param;
			// let path = tileMapId + (isZip ? "_zip" : "_tmx");
			// let mapUrl = "resource/config/map/" + tileMapId + "/" + path;
			// RES.getResAsync(path, (_date: any, url: string) => {
			// 	if (isZip) {
			// 		this.loadZipData(path)
			// 			.then((txt) => {
			// 				this.initTiledMap(txt, mapUrl);
			// 			});
			// 	} else {
			// 		this.initTiledMap(_date, mapUrl);
			// 	}
			// 	egret.setTimeout(() => {
			// 		this.onStart();
			// 	}, this, 500);
			// }, this);
		}

		private initTiledMap(data: egret.XML, tiledMap: tiled.TMXTilemap) {
			this.tileW = Number(data["$tilewidth"]);
			this.tileH = Number(data["$tileheight"]);
			this.tileCountW = Number(data["$width"]);
			this.tileCountH = Number(data["$height"]);
			this.mapWidth = this.tileCountW * this.tileW;
			this.mapHeight = this.tileCountH * this.tileH;
			this.mapXMax = this.mapWidth - UIManager.StageWidth;
			this.mapYMax = this.mapHeight - UIManager.StageHeight;
			this.tiledMap = tiledMap;
			this.parseMap();
			this.layerMap.mask = new egret.Rectangle(0, 0, this.mapWidth, this.mapHeight);
		}
		/**
		 * 解析地图
		 */
		protected parseMap() {
			let maps = this.tiledMap.getLayers();
			for (let i = 0; i < maps.length; ++i) {
				let v: tiled.TMXLayer = maps[i];
				this.initLayer(v);
			}
		}
		/**
		 * 初始化地图层数据（供子类覆盖用）
		 * 返回值： 1-隐藏tiledMap本层（visible = false）; 2-删除本层；其他-本层可见
		 */
		protected initLayer(layer: tiled.TMXLayer) {
		}

		protected setPlayerMove(x: number, y: number, isMapFollow = true) {
			if (this.player && !this.isBlockPos(x, y)) {
				// 点击角色脚下的图块，则不移动
				if (Math.floor(x / this.tileW) == Math.floor(this.player.x / this.tileW)
					&& Math.floor(y / this.tileH) == Math.floor(this.player.y / this.tileH)) {
					this.playerMoveFinish(this.player);
					return;
				}
				// 点击的图块不是阻挡块，则寻路
				let posList = TiledAstar.getPath(this.player.x, this.player.y, x, y, this.tileW, this.tileH, this.getBlockAstar());
				if (posList) {
					this.player.setMove(posList);
					this.isMapPlayerFollow = isMapFollow;
				}
			}
		}

		public getBlockAstar(): number[][] {
			for (let i = this.blocks.length - 1; i >= 0; --i) {
				for (let j = this.blocks[i].length - 1; j >= 0; --j) {
					if (this.isBlockTiledIdx(i, j)) {
						this.blockAstar[i][j] = 1;
					} else {
						this.blockAstar[i][j] = 0;
					}
				}
			}
			return this.blockAstar;
		}
		/**
		 * 以坐标检测地图块是否有碰撞
		 */
		protected isBlockPos(x: number, y: number): boolean {
			if(super.isBlockPos(x, y)){
				return true;
			}
			let idxw = Math.floor(x / this.tileW);
			let idxh = Math.floor(y / this.tileH);
			return this.isBlockTiledIdx(idxw, idxh);
		}
		/**
		 * 以地图块索引检测是否有碰撞
		 */
		protected isBlockTiledIdx(idxw: number, idxh: number): boolean{
			if(this.blocks){
				return this.blocks[idxw][idxh] >= 0;
			}
			return false;
		}
		/**
		 * 通过zip包解析地图数据资源
		 */
		private loadZipData(url: string): Promise<any> {
			return new Promise((resolve, reject) => {
				RES.getResAsync(url, (data: any, key: string) => {
					JSZip.loadAsync(data).then((zipdata) => {
						zipdata.forEach((path, file) => {
							file.async('text').then(txt => {
								resolve(txt);
								return;
							})
						});
					}).catch((e) => {
						console.log("tileAdventure - loadZipData fail(" + url + "):" + JSON.stringify(e));
						reject();
					});
				}, this);
			});
		}
	}
}