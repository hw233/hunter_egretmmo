namespace zj {
	/**
	 * tiledMap 地图数据管理类
	 * zhaiweili
	 * 2019.12.16
	 */
	export class TiledDataManager {
		private static instance: TiledDataManager = null;
		private tiledMapDatas;
		private constructor() {
			this.tiledMapDatas = {};
		}

		public static getInstance(){
			if(!this.instance){
				this.instance = new TiledDataManager();
			}
			return this.instance;
		}

		public getMapData(tileMapId, isZip?: boolean){
			return new Promise((resolve, reject) => {
				let result = this.tiledMapDatas[tileMapId];
				if(result){
					resolve(result);
					return;
				}
				let path = tileMapId + (isZip ? "_zip" : "_tmx");
				let mapUrl = "resource/config/map/" + tileMapId + "/" + path;
				RES.getResAsync(path, (_date: any, url: string) => {
					if (isZip) {
						this.loadZipData(path)
							.then((txt) => {
								this.tiledMapDatas[tileMapId] = this.initMapData(txt, mapUrl);
								resolve(this.tiledMapDatas[tileMapId]);
							});
					} else {
						this.tiledMapDatas[tileMapId] = this.initMapData(_date, mapUrl);
						resolve(this.tiledMapDatas[tileMapId]);
					}
				}, this);
			});
		}

		private initMapData(_date, url){
			var data: egret.XML = egret.XML.parse(_date);
			let tileW = Number(data["$tilewidth"]);
			let tileH = Number(data["$tileheight"]);
			let tileCountW = Number(data["$width"]);
			let tileCountH = Number(data["$height"]);
			let mapWidth = tileCountW * tileW;
			let mapHeight = tileCountH * tileH;
			let tiledMap = new tiled.TMXTilemap(mapWidth, mapHeight, data, url);
			return [data, tiledMap];
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
						console.log("TiledDataManager - loadZipData fail(" + url + "):" + JSON.stringify(e));
						reject();
					});
				}, this);
			});
		}
	}
}