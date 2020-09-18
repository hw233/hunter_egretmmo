namespace zj {
	export class GoFightMap extends UI {
		public constructor() {
			super();
			this.init();
		}
		private mapMinCritY;
		private mapMaxCritY;
		private MapBlockW;
		private MapBlockH;
		public mapWidth: number;
		public mapHeight: number;
		public mapName = 0;

		private baseX: number = 0;
		private baseY: number = 0;

		private mapData: TableClientMapBg;

		private _isScroll: boolean = false

		private _json;//当前地图Json文件9.json
		public weekTime;

		private layerName = ["far2", "far1", "far", "mid2", "mid1", "group", "close"];
		private tableMapNodes = { far2: [], far1: [], far: [], mid2: [], mid1: [], group: [], close: [] };
		private tableMapWidth = { far2: 0, far1: 0, far: 0, mid2: 0, mid1: 0, group: 0, close: 0 };

		public nodeMap: eui.Group;
		public nodeContainer: eui.Group;
		public nodeGround: eui.Group;
		public nodeRoot: eui.Group;
		public nodeSimplex: eui.Group;
		public _isLoading: boolean = false;
		public mapLayerData;

		private rect_back: eui.Image;

		public bossId;
		private init() {
			this.nodeContainer = null
			this.nodeGround = null // 包含地图层及root层
			this.nodeContainer = new eui.Group();
			this.addChild(this.nodeContainer);

			this.nodeGround = new eui.Group();
			this.nodeContainer.addChild(this.nodeGround);

			this.nodeMap = new eui.Group();
			this.nodeGround.addChild(this.nodeMap);

			this.nodeRoot = new eui.Group();
			this.nodeGround.addChild(this.nodeRoot)

			this.nodeSimplex = new eui.Group();
			this.nodeGround.addChild(this.nodeSimplex);


			for (let i = 0; i < this.layerName.length; i++) {
				let _name = this.layerName[i];
				this["node_" + _name] = new eui.Group();
				this.addChildMapAndOther(this["node_" + _name], _name);
				this.nodeMap.addChild(this["node_" + _name]);
			}
			this.rect_back = Util.getMaskImgBlack();
			this.rect_back.x = 0;
			this.rect_back.y = 0;
			this.rect_back.width = UIManager.StageWidth;
			this.rect_back.height = UIManager.StageHeight;
			this.rect_back.alpha = 0.5;
			this.addChild(this.rect_back);
			UIManager.Stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
			this.onStageResize();
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
			}, this);
		}
		public onStageResize() {
			this.rect_back.width = UIManager.StageWidth;
			this.rect_back.height = UIManager.StageHeight;
		}
		private timeOut: number;
		private clickHandler() {
			egret.clearTimeout(this.timeOut);
			this.stopMove();
			this.timeOut = egret.setTimeout(() => {
				this.stopMove();
				egret.clearTimeout(this.timeOut);
			}, this, 500);

			this.startMove();
		}
		public close() {
			Util.destroyRes(this.groupName, false);
			UIManager.Stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
			this.stopMove();
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
		private groupName;
		private resId;
		private loadJson(id) {
			this.resId = id;
			this._json = Game.ConfigManager.getTable(id + ".json");
			this.loadMapAssets();
		}
		/**加载场景需要的所有资源图 */
		private loadMapAssets() {
			let urlArr: string[] = [];
			for (let i = 0; i < this._json["gameobjects"].length; i++) {
				let mainTbl = this._json["gameobjects"][i];
				for (let k = 0; k < mainTbl["gameobjects"].length; k++) {
					let obj = mainTbl["gameobjects"][k];
					for (let j = 0; j < obj["gameobjects"].length; j++) {
						let data = obj["gameobjects"][j];
						for (let l = 0; l < data["components"].length; l++) {
							let fData = data["components"][l];
							let fileData = fData.fileData;
							let imgUrl = fileData.path;
							let egretUrl = this.CocosUrlToEgretUrl(imgUrl);
							if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
								urlArr.push(egretUrl);
							}
						}
					}
				}
			}
			this._isLoading = false;
			this.groupName = "FightMap" + egret.getTimer();
			if (!RES.createGroup(this.groupName, urlArr, true)) {
				let str = LANG("创建资源组失败:") + this.groupName;
				toast(str);
				return;
			}
			Game.RESGroupManager.loadGroup(this.groupName, 10)
				.then(() => {
					this._isLoading = true;
					this.LoadNewMap(this.resId);
				})
				.catch((error) => {
					toast(error);
				})
		}
		/**cocos场景配置坐标转换成Egret坐标 */
		private CocosUrlToEgretUrl(url: string) {
			let arrS: string[] = url.split(".");
			let sourceArr: string[] = arrS[0].split("/");
			let source: string = sourceArr[sourceArr.length - 1];
			return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
		}
		//地图移动速度倍数
		private speed: number = 1;
		private res_id;
		/**开始解析JSON */
		private LoadNewMap(name) {
			this.res_id = TableClientMapBg.Item(name).res_id;
			this.mapData = TableClientMapBg.Item(name);
			this._isScroll = this.mapData.scroll == 0 ? false : true;
			this.mapWidth = this._json["CanvasSize"]._width;
			this.mapHeight = this._json["CanvasSize"]._height;
			// if (!this._isScroll) {
			// 	if (this.mapWidth < UIManager.StageWidth) {
			// 		this.scaleX = this.mapWidth / UIManager.StageWidth;
			// 	}
			// }

			for (let i = 0; i < this._json["gameobjects"].length; i++) {
				//第一层
				let mainTbl = this._json["gameobjects"][i];
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
			this.UpdateMap((this.mapWidth - UIManager.StageWidth) / 2, 0);
		}
		private doloadCompoent(object, component, node, key) {
			let x = object["x"];
			let y = UIManager.StageHeight - object["y"];
			let scaleX = object["scalex"];
			let scaleY = object["scaley"];
			let comName = component["name"];
			if (comName != null) {
				let fileData = component["fileData"];
				if (comName == "CCParticleSystemQuad") {

				}
				else if (comName == "CCSprite") {
					//判断是否是spine动画
					let str: string = fileData["path"]
					if (str.indexOf("wu.png") != -1) {
						//动画
					}
					else {
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
				else if (comName == "CCTMXTiledMap") {

				}
			}
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
				let _width = this.tableMapWidth[k];
				if (this._isScroll == false) {
					continue;
				}
				if (_width <= 0) {
					continue;
				}
				//let x =orgin.x;
				//let y =orgin.y;
				for (let i = 1; i < _nodeArr.length; i++) {
					_nodeArr[i].x = Math.ceil(i * _width);
					// _nodeArr[i].y = 0;//UIManager.StageHeight-y;
				}

			}
			if (this._isScroll != false) {
				this.startMove();
			} else {
				this.stopMove();
			}
		}
		public startMove() {
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		}
		public stopMove() {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		}
		private enterFrame() {
			this.Move();
		}

		public Move() {
			this.UpdateMap(1, 0);
		}
		public UpdateMap(base_x, base_y) {
			if (!this.mapData) return;
			for (let k in this.tableMapNodes) {
				let offset = this.mapData[k + "_v"];
				let moveParamX = offset[0] * this.speed;
				let moveParamY = offset[1];
				let standard_width = this.tableMapWidth[k];
				this.setLayersPos(this.tableMapNodes[k], standard_width, base_x * (1 + ((moveParamX - 1) * Device.screenWidth / 1100)), base_y * moveParamY);
			}
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
				//c.y=500//y - move_y;
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
						min_layer.x = now_x + width;
						// min_layer.y=now_y;
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
						max_layer.x = now_x - width;
						// max_layer.y = now_y;
					}
				}
			}
		}
		public LoadMap(name) {
			let stage_data = {
				seq: {},
				layers: {},
			}
			this.mapName = name
			this.mapLayerData = {};
			this.loadJson(name);
		}
	}
}