namespace zj {

	/**
	 * 副本界面-关卡跑图
	 * zhaiweili
	 * 2019.11.7
	 */
	export class SceneMapNodeBase extends SceneMapBase {
		private resId;
		public json;//当前地图Json文件9.json
		
		public layerName = ["far2", "far1", "far", "mid2", "mid1", "group", "close"];
		public tableMapNodes = { far2: [], far1: [], far: [], mid2: [], mid1: [], group: [], close: [] };
		public tableMapWidth = { far2: 0, far1: 0, far: 0, mid2: 0, mid1: 0, group: 0, close: 0 };
		private offsetX = 1;
		public _isScroll: boolean = false
		
		public mapMinCritY;
		public mapMaxCritY;
		public MapBlockW;
		public MapBlockH;

		public constructor() {
			super();
		}
		public init(ui: SceneMapUIBase, param: any = null) {
			super.init(ui, param);
			// for (let i = 0; i < this.layerList.length; ++i) {
			// 	this.layerMap.removeChild(this.layerList[i]);
			// }
			// this.resId = param;
			// this.loadJson(this.resId);
			this.mapWidth = 2500;
			this.mapHeight = 800;

			// RES.getResAsync("img_7_group_png", ()=>{
				let img = new eui.Image();
				img.source = "img_7_group_png";
				img.width = this.mapWidth;
				img.height = this.mapHeight;
				this.layerMap.addChild(img);

				this.onStart(UI.SHOW_FILL_OUT);
			// }, this);

			
		}

		private loadJson(id) {
			this.json = Game.ConfigManager.getTable(id + ".json");
			//this.loadMapAssets();
			this.initNewMap();
			this.LoadNewMap(this.resId);
		}
		private initNewMap(){
			for (let i = 0; i < this.layerName.length; i++) {
				let _name = this.layerName[i];
				this["node_" + _name] = new eui.Group();
				this["node_" + _name].touchEnabled = false;
				this["node_" + _name].touchChildren = false;
				// this["node_" + _name].cacheAsBitmap = true;
				this.addChildMapAndOther(this["node_" + _name], _name);
				this.layerMap.addChild(this["node_" + _name]);
			}
		}
		private addChildMapAndOther(node: eui.Group, name: string) {
			this[name + "_node_map"] = new eui.Group();
			this[name + "_node_other"] = new eui.Group();
			node.addChild(this[name + "_node_map"]);
			node.addChild(this[name + "_node_other"]);

			//适用与滚动相关
			this[name + "_node_map_orgin"] = new eui.Group();
			this[name + "_node_map_copy"] = new eui.Group();
			this[name + "_node_map_copy_1"] = new eui.Group();
			this[name + "_node_map"].addChild(this[name + "_node_map_orgin"]);
			this[name + "_node_map"].addChild(this[name + "_node_map_copy"]);
			this[name + "_node_map"].addChild(this[name + "_node_map_copy_1"]);
			this.tableMapNodes[name].push(this[name + "_node_map_orgin"], this[name + "_node_map_copy"], this[name + "_node_map_copy_1"]);
		}
		/**开始解析JSON */
		private LoadNewMap(name) {
			let mapData = TableClientMapBg.Item(name);
			this._isScroll = mapData.scroll == 0 ? false : true;
			this.mapWidth = this.json["CanvasSize"]._width;
			this.mapHeight = this.json["CanvasSize"]._height;
			// if(this.mapWidth < UIManager.StageWidth){
			// 	for(let i = 0;i<this.boxArr.length;i++){
					//this.boxArr[i].scaleX = UIManager.StageWidth/this.mapWidth;
				// }
			// }
			

			for (let i = 0; i < this.json["gameobjects"].length; i++) {
				//第一层
				let mainTbl = this.json["gameobjects"][i];
				this.doLoadGameobject(mainTbl, mainTbl["name"], this.layerName[i]);
			}
			if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND) {
				this.mapMinCritY = 0
				this.mapMaxCritY = 19 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockW = 36 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockH = 19 * ConstantConfig_Common.BLOCK_WIDTH
			}
			else if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_DARKLAND) {
				this.mapMinCritY = 0
				this.mapMaxCritY = 19 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockW = 36 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockH = 19 * ConstantConfig_Common.BLOCK_WIDTH
			}
			else if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORKBOSS) {
				this.mapMinCritY = 0
				this.mapMaxCritY = 7 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockW = 16 * ConstantConfig_Common.BLOCK_WIDTH
				this.MapBlockH = 7 * ConstantConfig_Common.BLOCK_WIDTH
			}
			this.loadExtra();
			// this.startMove();
		}
		private doLoadGameobject(object, layerName, key) {
			if (object["gameobjects"].length > 0) {
				let mainName = layerName;
				for (let i = 0; i < object["gameobjects"].length; i++) {
					let subObject = object["gameobjects"][i];
					let tmpName = mainName;
					let str: string = subObject["name"];
					if (subObject["name"] != null && str.indexOf("node") != -1) {
						tmpName = mainName + "_" + subObject["name"];
					}
					this.doLoadGameobject(subObject, tmpName, key);
				}
			}
			else {
				if (this[layerName] != null) {
					let layer = this[key + "_node_map_orgin"];
					let layerCopy = this[key + "_node_map_copy"];
					let layerCopy1 = this[key + "_node_map_copy_1"];
					for (let i = 0; i < object["components"].length; i++) {
						this.doloadCompoent(object, object["components"][i], layer, key);
						if (this._isScroll) {
							this.doloadCompoent(object, object["components"][i], layerCopy, key);
							this.doloadCompoent(object, object["components"][i], layerCopy1, key);
						}
					}
				}
			}
		}
		private doloadCompoent(object, component, node, key) {
			let x = object["x"];
			let y = UIManager.StageHeight - object["y"];

			let scaleX = object["scalex"];
			let scaleY = object["scaley"];
			let comName = component["name"];
			if (comName != null) {
				if (comName == "CCSprite") {
						let fileData = component["fileData"];
						let url: string = fileData["path"];
						let image = new MyImage();
						image.source = cachekey(this.CocosUrlToEgretUrl(fileData["path"]), this);
						image.x = x;
						image.y = y;
						image.name = key;
						image.tag = object;
						image.scaleX = scaleX;
						image.scaleY = scaleY;
						image.addEventListener(egret.Event.COMPLETE, (e) => {
							///在图片的载入完成事件中获得图片的宽高。
							let img: MyImage = e.currentTarget;
							//egret.log( "宽度:" + img.width,"高度:" + img.height);
							img.anchorOffsetX = img.width / 2;
							img.anchorOffsetY = img.height / 2;
							if (img.tag["name"] == "main") {
								this.tableMapWidth[img.name] = img.width// * 2 - 3;
							}
						}, this);

						//image.scaleX = scaleX * 2
						//image.scaleY = scaleY * 2;
						node.addChild(image);
				}
			}
		}
		/**cocos场景配置坐标转换成Egret坐标 */
		public CocosUrlToEgretUrl(url: string) {
			let arrS: string[] = url.split(".");
			let sourceArr: string[] = arrS[0].split("/");
			let source: string = sourceArr[sourceArr.length - 1];
			return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
		}
		private loadExtra() {
			for (let k in this.tableMapNodes) {
				let _nodeArr = this.tableMapNodes[k];
				let orgin: eui.Group = _nodeArr[0];
				let rect = Set.getNodeRect(orgin);
				let _calc = rect.right - rect.left;
				let _ret = this.tableMapWidth[k];
				if (_ret == 0) {
					this.tableMapWidth[k] = _calc// * 2 - 3;
				}
				if (this._isScroll == false) {
					continue;
				}
				let _width = this.tableMapWidth[k];
				if (_width <= 0) {
					continue;
				}
				let x = orgin.x;
				let y = orgin.y;
				for (let i = 1; i < _nodeArr.length; i++) {
					_nodeArr[i].x = Math.ceil(i * _width) - this.offsetX;
					_nodeArr[i].y = 0// UIManager.StageHeight - y;
				}

			}
			// if(this._isScroll != false ){
			// 	this.startMove();
			// }
		}

		/**场景移动 以及拼接 */
		private setLayersPos(layers, width, move_x, move_y) {
			let len = layers.length;
			let min_index = 1;
			let max_index = 1;
			let minValue = 0;
			let maxValue = 0;
			for (let j = 0; j < len; j++) {
				let c = layers[j];
				let x = c.x;
				let y = c.y;
				if (x <= minValue) {
					minValue = x
					min_index = j
				}
				if (x >= maxValue) {
					maxValue = x;
					max_index = j;
				}
				c.x = x - move_x;
				c.y = y - move_y;
			}
			if (this._isScroll == false) {
				return;
			}
			//循环拼接
			if (len > 0) {
				if (move_x > 0) {
					let min_layer = layers[min_index];
					let start_x = min_layer.x;
					let start_y = min_layer.y;
					let tmp = Math.abs(start_x);
					if (start_x < 0 && tmp > width) {
						let now_x = layers[max_index].x;
						let now_y = layers[max_index].y;
						min_layer.x = now_x + width - this.offsetX;
						min_layer.y = now_y;
					}
				}
				if (move_x < 0) {
					let max_layer = layers[max_index];
					let start_max_x = max_layer.x;
					let start_max_y = max_layer.y;
					let tmpMax = Math.abs(start_max_x);
					if (start_max_x > 0 && tmpMax > width) {
						let now_x = layers[min_index].x;
						let now_y = layers[min_index].y;
						max_layer.x = now_x + width - this.offsetX;
						max_layer.y = - now_y;
					}
				}
			}
		}
	}
}