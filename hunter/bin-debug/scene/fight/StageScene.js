var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /** */
    var StageScene = (function (_super) {
        __extends(StageScene, _super);
        function StageScene() {
            var _this = _super.call(this) || this;
            _this.isMainCity = false; // 是否为主城
            _this.mapName = 0;
            _this.baseX = 0;
            _this.baseY = 0;
            _this._isScroll = false;
            _this.layerName = ["far2", "far1", "far", "mid2", "mid1", "group", "close"];
            _this.tableMapNodes = { far2: [], far1: [], far: [], mid2: [], mid1: [], group: [], close: [] };
            _this.tableMapWidth = { far2: 0, far1: 0, far: 0, mid2: 0, mid1: 0, group: 0, close: 0 };
            _this._isLoading = false;
            _this.boxArr = [];
            //地图移动速度倍数
            _this.speed = 1;
            _this.offsetX = 1;
            _this.timerNum = 0;
            _this.Ticktimer = 0;
            _this.init();
            return _this;
        }
        StageScene.prototype.init = function () {
            var _this = this;
            this.nodeContainer = null;
            this.nodeGround = null; // 包含地图层及root层
            this.nodeContainer = this.getNewGroup("nodeContainer");
            this.addChild(this.nodeContainer);
            this.nodeContainer.touchEnabled = true;
            this.nodeContainer.touchThrough = true;
            this.nodeGround = this.getNewGroup("nodeGround");
            this.nodeContainer.addChild(this.nodeGround);
            this.nodeMap = this.getNewGroup("nodeMap");
            this.nodeGround.addChild(this.nodeMap);
            this.nodeRoot = this.getNewGroup("nodeRoot");
            this.nodeGround.addChild(this.nodeRoot);
            this.nodeSimplex = this.getNewGroup("nodeSimplex");
            this.nodeGround.addChild(this.nodeSimplex);
            for (var i = 0; i < this.layerName.length; i++) {
                var _name = this.layerName[i];
                this["node_" + _name] = this.getNewGroup("node_" + _name);
                // this["node_" + _name].touchEnabled = false;
                // this["node_" + _name].touchChildren = false;
                // this["node_" + _name].cacheAsBitmap = true;
                this.addChildMapAndOther(this["node_" + _name], _name);
                this.boxArr.push(this["node_" + _name]);
                this.nodeMap.addChild(this["node_" + _name]);
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
                _this.stopMove();
            }, this);
        };
        StageScene.prototype.touchDown = function (touchs) {
            this.OnTouchDown(touchs);
        };
        StageScene.prototype.OnTouchDown = function (touchs) {
        };
        StageScene.prototype.OnTouchMove = function (touchs) {
        };
        StageScene.prototype.OnTouchUp = function (touchs) {
        };
        StageScene.prototype.addChildMapAndOther = function (node, name) {
            this[name + "_node_map"] = this.getNewGroup(name + "_node_map", false);
            this[name + "_node_other"] = this.getNewGroup(name + "_node_other", false);
            node.addChild(this[name + "_node_map"]);
            this.initMainCityNodes(node, name);
            node.addChild(this[name + "_node_other"]);
            //适用与滚动相关
            this[name + "_node_map_orgin"] = this.getNewGroup(name + "_node_map_orgin");
            this[name + "_node_map_copy"] = this.getNewGroup(name + "_node_map_copy");
            this[name + "_node_map_copy_1"] = this.getNewGroup(name + "_node_map_copy_1");
            this[name + "_node_map"].addChild(this[name + "_node_map_orgin"]);
            this[name + "_node_map"].addChild(this[name + "_node_map_copy"]);
            this[name + "_node_map"].addChild(this[name + "_node_map_copy_1"]);
            this.tableMapNodes[name].push(this[name + "_node_map_orgin"], this[name + "_node_map_copy"], this[name + "_node_map_copy_1"]);
        };
        StageScene.prototype.initMainCityNodes = function (node, name) {
            if (this.isMainCity) {
                // 动画层
                this[name + "_node_map_ani"] = this.getNewGroup(name + "_node_map_ani", false);
                node.addChild(this[name + "_node_map_ani"]);
                this.tableMapNodes[name].push(this[name + "_node_map_ani"]);
                // 建筑顶标
                this[name + "_node_map_title"] = this.getNewGroup(name + "_node_map_title");
                node.addChild(this[name + "_node_map_title"]);
                this.tableMapNodes[name].push(this[name + "_node_map_title"]);
            }
        };
        StageScene.prototype.getNewGroup = function (name, isTouchChild) {
            if (isTouchChild === void 0) { isTouchChild = true; }
            var group = new eui.Group();
            group.touchEnabled = false;
            group.touchChildren = isTouchChild;
            group.name = name;
            return group;
        };
        StageScene.prototype.loadJson = function (id) {
            this.resId = id;
            this.json = zj.Game.ConfigManager.getTable(id + ".json");
            //this.loadMapAssets();
            this.LoadNewMap(this.resId);
        };
        /**加载场景需要的所有资源图 */
        StageScene.prototype.loadMapAssets = function () {
            // let urlArr: string[] = [];
            // for (let i = 0; i < this.json["gameobjects"].length; i++) {
            // 	let mainTbl = this.json["gameobjects"][i];
            // 	for (let k = 0; k < mainTbl["gameobjects"].length; k++) {
            // 		let obj = mainTbl["gameobjects"][k];
            // 		for (let j = 0; j < obj["gameobjects"].length; j++) {
            // 			let data = obj["gameobjects"][j];
            // 			for (let l = 0; l < data["components"].length; l++) {
            // 				let fData = data["components"][l];
            // 				let fileData = fData.fileData;
            // 				let imgUrl = fileData.path;
            // 				let egretUrl = this.CocosUrlToEgretUrl(imgUrl);
            // 				if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
            // 					urlArr.push(egretUrl);
            // 				}
            // 			}
            // 		}
            // 	}
            // }
            // this._isLoading = false;
            // let groupName = "map";
            // if (!RES.createGroup(groupName, urlArr, true)) {
            // 	let str = LANG("创建资源组失败:") + groupName;
            // 	toast(str);
            // 	return;
            // }
            // RES.loadGroup(groupName, 10)
            // 	.then(() => {
            // 		this._isLoading = true;
            // 		this.LoadNewMap(this.resId);
            // 	})
            // 	.catch((error) => {
            // 		toast(error);
            // 	})
        };
        /**cocos场景配置坐标转换成Egret坐标 */
        StageScene.prototype.CocosUrlToEgretUrl = function (url) {
            var arrS = url.split(".");
            var sourceArr = arrS[0].split("/");
            var source = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        };
        /**开始解析JSON */
        StageScene.prototype.LoadNewMap = function (name) {
            this.res_id = zj.TableClientMapBg.Item(name).res_id;
            this.mapData = zj.TableClientMapBg.Item(name);
            this._isScroll = this.mapData.scroll == 0 ? false : true;
            this.mapWidth = this.json["CanvasSize"]._width;
            this.mapHeight = this.json["CanvasSize"]._height;
            this.tableObjByNames = {};
            // if(this.mapWidth < UIManager.StageWidth){
            // 	for(let i = 0;i<this.boxArr.length;i++){
            //this.boxArr[i].scaleX = UIManager.StageWidth/this.mapWidth;
            // 	}
            // }
            for (var i = 0; i < this.json["gameobjects"].length; i++) {
                //第一层
                var mainTbl = this.json["gameobjects"][i];
                this.doLoadGameobject(mainTbl, mainTbl["name"], this.layerName[i]);
            }
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 36 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                // this.mapMaxCritY = 8 * ConstantConfig_Common.BLOCK_WIDTH
                // this.MapBlockW = 43 * ConstantConfig_Common.BLOCK_WIDTH
                // this.MapBlockH = 8 * ConstantConfig_Common.BLOCK_WIDTH
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 36 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 12 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 16 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 12 * zj.ConstantConfig_Common.BLOCK_WIDTH;
            }
            this.loadExtra();
            this.startMove();
        };
        StageScene.prototype.doloadCompoent = function (object, component, node, key) {
            var _this = this;
            var x = object["x"];
            var y = 0;
            if (this.mapHeight > 900) {
                y = this.mapHeight - object["y"];
            }
            else {
                y = zj.UIManager.StageHeight - object["y"];
            }
            var scaleX = object["scalex"];
            var scaleY = object["scaley"];
            var comName = component["classname"];
            if (comName != null) {
                var fileData = component["fileData"];
                if (comName == "CCParticleSystemQuad") {
                }
                else if (comName == "CCSprite") {
                    //判断是否是spine动画
                    var str = fileData["path"];
                    if (str.indexOf("wu.png") != -1) {
                        //动画
                        // let aaa;
                    }
                    else {
                        var iName_1 = component["name"];
                        var url = fileData["path"];
                        var image_1 = new zj.MyImage();
                        image_1.source = zj.cachekey(this.CocosUrlToEgretUrl(fileData["path"]), this);
                        image_1.x = x;
                        image_1.y = y;
                        image_1.name = key;
                        image_1.tag = object;
                        image_1.scaleX = scaleX;
                        image_1.scaleY = scaleY;
                        image_1.addEventListener(egret.Event.COMPLETE, function (e) {
                            ///在图片的载入完成事件中获得图片的宽高。
                            var img = e.currentTarget;
                            //egret.log( "宽度:" + img.width,"高度:" + img.height);
                            img.anchorOffsetX = img.width / 2;
                            img.anchorOffsetY = img.height / 2;
                            if (img.tag["name"] == "main") {
                                _this.tableMapWidth[img.name] = img.width; // * 2 - 3;
                            }
                            if (iName_1 && iName_1 != "CCSprite") {
                                _this.tableObjByNames[iName_1] = image_1;
                            }
                            _this.loadMyImageComplete(iName_1);
                        }, this);
                        //image.scaleX = scaleX * 2
                        //image.scaleY = scaleY * 2;
                        node.addChild(image_1);
                    }
                }
                else if (comName == "CCTMXTiledMap") {
                }
            }
        };
        StageScene.prototype.doLoadGameobject = function (object, layerName, key) {
            if (object["gameobjects"].length > 0) {
                var mainName = layerName;
                for (var i = 0; i < object["gameobjects"].length; i++) {
                    var subObject = object["gameobjects"][i];
                    var tmpName = mainName;
                    var str = subObject["name"];
                    if (subObject["name"] != null && str.indexOf("node") != -1) {
                        tmpName = mainName + "_" + subObject["name"];
                    }
                    this.doLoadGameobject(subObject, tmpName, key);
                }
            }
            else {
                if (this[layerName] != null) {
                    var layer = this[key + "_node_map_orgin"];
                    var layerCopy = this[key + "_node_map_copy"];
                    var layerCopy1 = this[key + "_node_map_copy_1"];
                    for (var i = 0; i < object["components"].length; i++) {
                        this.doloadCompoent(object, object["components"][i], layer, key);
                        if (this._isScroll) {
                            this.doloadCompoent(object, object["components"][i], layerCopy, key);
                            this.doloadCompoent(object, object["components"][i], layerCopy1, key);
                        }
                    }
                }
            }
        };
        // 加载图片资源完成通知
        StageScene.prototype.loadMyImageComplete = function (name) { };
        StageScene.prototype.loadExtra = function () {
            for (var k in this.tableMapNodes) {
                var _nodeArr = this.tableMapNodes[k];
                var orgin = _nodeArr[0];
                var rect = zj.Set.getNodeRect(orgin);
                var _calc = rect.right - rect.left;
                var _ret = this.tableMapWidth[k];
                if (_ret == 0) {
                    this.tableMapWidth[k] = _calc; // * 2 - 3;
                }
                var _width = this.tableMapWidth[k];
                if (this._isScroll == false) {
                    continue;
                }
                if (_width <= 0) {
                    continue;
                }
                var x = orgin.x;
                var y = orgin.y;
                for (var i = 1; i < _nodeArr.length; i++) {
                    _nodeArr[i].x = Math.ceil(i * _width) - this.offsetX;
                    _nodeArr[i].y = 0; // UIManager.StageHeight - y;
                }
            }
            // if(this._isScroll != false ){
            // 	this.startMove();
            // }
        };
        // private timer: egret.Timer;
        StageScene.prototype.startMove = function () {
            this.stopMove();
            // this.Ticktimer = egret.getTimer();
            // if (!this.timer) {
            // 	let delay = 1000 / ConstantConfig_RoleBattle.DEFAULTFPS;
            // 	if (ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
            // 		delay = 20;
            // 	}
            // 	this.timer = new egret.Timer(delay, 0);
            // 	this.timer.addEventListener(egret.TimerEvent.TIMER, this.enterFrame, this);
            // }
            // this.timer.start();
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            // egret.Ticker.getInstance().register(this.UpdateFrame, this);
        };
        StageScene.prototype.stopMove = function () {
            // if (this.timer) {
            // 	this.timer.stop();
            // 	this.timer = null;
            // }
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            // egret.Ticker.getInstance().unregister(this.UpdateFrame, this);
        };
        StageScene.prototype.enterFrame = function () {
            // this.Update(1 / ConstantConfig_RoleBattle.DEFAULTFPS);
            this.timerNum = (egret.getTimer() - this.Ticktimer) / 1000;
            if (this.timerNum > 0.033) {
                this.timerNum = 0.033;
            }
            this.Update(this.timerNum);
            this.Ticktimer = egret.getTimer();
        };
        // private UpdateFrame(dt){
        // 	dt = dt > 34 ? 34 : dt;
        // 	this.Update(dt / 1000);
        // }
        StageScene.prototype.Update = function (tick) {
            this.Move();
        };
        StageScene.prototype.Move = function () {
            for (var k in this.tableMapNodes) {
                var offset = this.mapData[k + "_v"];
                var moveParamX = offset[0] * this.speed;
                var moveParamY = offset[1];
                var standard_width = this.tableMapWidth[k];
                this.setLayersPos(this.tableMapNodes[k], standard_width, moveParamX, moveParamY);
            }
        };
        StageScene.prototype.UpdateMap = function (base_x, base_y) {
            if (!this.mapData)
                return;
            this.baseX += base_x;
            this.baseY += base_y;
            for (var k in this.tableMapNodes) {
                var offset = this.mapData[k + "_v"];
                var moveParamX = offset[0] * this.speed;
                var moveParamY = offset[1];
                var standard_width = this.tableMapWidth[k];
                this.setLayersPos(this.tableMapNodes[k], standard_width, base_x * (1 + ((moveParamX - 1))), base_y * moveParamY);
            }
        };
        /**场景移动 以及拼接 */
        StageScene.prototype.setLayersPos = function (layers, width, move_x, move_y) {
            var len = layers.length;
            var min_index = 1;
            var max_index = 1;
            var minValue = 0;
            var maxValue = 0;
            for (var j = 0; j < len; j++) {
                var c = layers[j];
                var x = c.x;
                var y = c.y;
                if (x <= minValue) {
                    minValue = x;
                    min_index = j;
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
                    var min_layer = layers[min_index];
                    var start_x = min_layer.x;
                    var start_y = min_layer.y;
                    var tmp = Math.abs(start_x);
                    if (start_x < 0 && tmp > width) {
                        var now_x = layers[max_index].x;
                        var now_y = layers[max_index].y;
                        min_layer.x = now_x + width - this.offsetX;
                        min_layer.y = now_y;
                    }
                }
                if (move_x < 0) {
                    var max_layer = layers[max_index];
                    var start_max_x = max_layer.x;
                    var start_max_y = max_layer.y;
                    var tmpMax = Math.abs(start_max_x);
                    if (start_max_x > 0 && tmpMax > width) {
                        var now_x = layers[min_index].x;
                        var now_y = layers[min_index].y;
                        max_layer.x = now_x + width - this.offsetX;
                        max_layer.y = -now_y;
                    }
                }
            }
        };
        StageScene.prototype.OnLoading = function (percent) {
        };
        //释放所有东西
        StageScene.prototype.release = function () {
            this.stopMove();
            // if(this.timer){
            // 	this.timer.
            // }
            this.tableMapWidth = null;
            this.tableMapNodes = null;
            if (this.nodeContainer != null && this.nodeContainer.parent) {
                this.nodeContainer.parent.removeChild(this.nodeContainer);
            }
        };
        StageScene.prototype.closeSceneEffect = function () {
            //this.pauseAllSpines();
            //this.hideAllParticles();
        };
        /**战斗小地图 */
        StageScene.prototype.LoadMap = function (name) {
            var stage_data = {
                seq: {},
                layers: {},
            };
            this.mapName = name;
            this.mapLayerData = {};
            this.loadJson(name);
        };
        StageScene.prototype.loadMapId = function () {
        };
        StageScene.prototype.LoadMine = function () {
        };
        StageScene.prototype.LoadOpp = function () {
        };
        StageScene.prototype.InitOther = function () {
        };
        StageScene.prototype.openSceneEffect = function (bTag) {
            //this.resumePartSpines(bTag);
            //this.appearPartParticles();
        };
        return StageScene;
    }(zj.Scene));
    zj.StageScene = StageScene;
    __reflect(StageScene.prototype, "zj.StageScene");
})(zj || (zj = {}));
//# sourceMappingURL=StageScene.js.map