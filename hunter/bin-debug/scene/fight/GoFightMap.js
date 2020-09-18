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
    var GoFightMap = (function (_super) {
        __extends(GoFightMap, _super);
        function GoFightMap() {
            var _this = _super.call(this) || this;
            _this.mapName = 0;
            _this.baseX = 0;
            _this.baseY = 0;
            _this._isScroll = false;
            _this.layerName = ["far2", "far1", "far", "mid2", "mid1", "group", "close"];
            _this.tableMapNodes = { far2: [], far1: [], far: [], mid2: [], mid1: [], group: [], close: [] };
            _this.tableMapWidth = { far2: 0, far1: 0, far: 0, mid2: 0, mid1: 0, group: 0, close: 0 };
            _this._isLoading = false;
            //地图移动速度倍数
            _this.speed = 1;
            _this.init();
            return _this;
        }
        GoFightMap.prototype.init = function () {
            var _this = this;
            this.nodeContainer = null;
            this.nodeGround = null; // 包含地图层及root层
            this.nodeContainer = new eui.Group();
            this.addChild(this.nodeContainer);
            this.nodeGround = new eui.Group();
            this.nodeContainer.addChild(this.nodeGround);
            this.nodeMap = new eui.Group();
            this.nodeGround.addChild(this.nodeMap);
            this.nodeRoot = new eui.Group();
            this.nodeGround.addChild(this.nodeRoot);
            this.nodeSimplex = new eui.Group();
            this.nodeGround.addChild(this.nodeSimplex);
            for (var i = 0; i < this.layerName.length; i++) {
                var _name = this.layerName[i];
                this["node_" + _name] = new eui.Group();
                this.addChildMapAndOther(this["node_" + _name], _name);
                this.nodeMap.addChild(this["node_" + _name]);
            }
            this.rect_back = zj.Util.getMaskImgBlack();
            this.rect_back.x = 0;
            this.rect_back.y = 0;
            this.rect_back.width = zj.UIManager.StageWidth;
            this.rect_back.height = zj.UIManager.StageHeight;
            this.rect_back.alpha = 0.5;
            this.addChild(this.rect_back);
            zj.UIManager.Stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.onStageResize();
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.enterFrame, _this);
            }, this);
        };
        GoFightMap.prototype.onStageResize = function () {
            this.rect_back.width = zj.UIManager.StageWidth;
            this.rect_back.height = zj.UIManager.StageHeight;
        };
        GoFightMap.prototype.clickHandler = function () {
            var _this = this;
            egret.clearTimeout(this.timeOut);
            this.stopMove();
            this.timeOut = egret.setTimeout(function () {
                _this.stopMove();
                egret.clearTimeout(_this.timeOut);
            }, this, 500);
            this.startMove();
        };
        GoFightMap.prototype.close = function () {
            zj.Util.destroyRes(this.groupName, false);
            zj.UIManager.Stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.stopMove();
        };
        GoFightMap.prototype.addChildMapAndOther = function (node, name) {
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
        };
        GoFightMap.prototype.loadJson = function (id) {
            this.resId = id;
            this._json = zj.Game.ConfigManager.getTable(id + ".json");
            this.loadMapAssets();
        };
        /**加载场景需要的所有资源图 */
        GoFightMap.prototype.loadMapAssets = function () {
            var _this = this;
            var urlArr = [];
            for (var i = 0; i < this._json["gameobjects"].length; i++) {
                var mainTbl = this._json["gameobjects"][i];
                for (var k = 0; k < mainTbl["gameobjects"].length; k++) {
                    var obj = mainTbl["gameobjects"][k];
                    for (var j = 0; j < obj["gameobjects"].length; j++) {
                        var data = obj["gameobjects"][j];
                        for (var l = 0; l < data["components"].length; l++) {
                            var fData = data["components"][l];
                            var fileData = fData.fileData;
                            var imgUrl = fileData.path;
                            var egretUrl = this.CocosUrlToEgretUrl(imgUrl);
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
                var str = zj.LANG("创建资源组失败:") + this.groupName;
                zj.toast(str);
                return;
            }
            zj.Game.RESGroupManager.loadGroup(this.groupName, 10)
                .then(function () {
                _this._isLoading = true;
                _this.LoadNewMap(_this.resId);
            })
                .catch(function (error) {
                zj.toast(error);
            });
        };
        /**cocos场景配置坐标转换成Egret坐标 */
        GoFightMap.prototype.CocosUrlToEgretUrl = function (url) {
            var arrS = url.split(".");
            var sourceArr = arrS[0].split("/");
            var source = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        };
        /**开始解析JSON */
        GoFightMap.prototype.LoadNewMap = function (name) {
            this.res_id = zj.TableClientMapBg.Item(name).res_id;
            this.mapData = zj.TableClientMapBg.Item(name);
            this._isScroll = this.mapData.scroll == 0 ? false : true;
            this.mapWidth = this._json["CanvasSize"]._width;
            this.mapHeight = this._json["CanvasSize"]._height;
            // if (!this._isScroll) {
            // 	if (this.mapWidth < UIManager.StageWidth) {
            // 		this.scaleX = this.mapWidth / UIManager.StageWidth;
            // 	}
            // }
            for (var i = 0; i < this._json["gameobjects"].length; i++) {
                //第一层
                var mainTbl = this._json["gameobjects"][i];
                this.doLoadGameobject(mainTbl, mainTbl["name"], this.layerName[i]);
            }
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 36 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 36 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 19 * zj.ConstantConfig_Common.BLOCK_WIDTH;
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                this.mapMinCritY = 0;
                this.mapMaxCritY = 7 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockW = 16 * zj.ConstantConfig_Common.BLOCK_WIDTH;
                this.MapBlockH = 7 * zj.ConstantConfig_Common.BLOCK_WIDTH;
            }
            this.loadExtra();
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
        };
        GoFightMap.prototype.doloadCompoent = function (object, component, node, key) {
            var _this = this;
            var x = object["x"];
            var y = zj.UIManager.StageHeight - object["y"];
            var scaleX = object["scalex"];
            var scaleY = object["scaley"];
            var comName = component["name"];
            if (comName != null) {
                var fileData = component["fileData"];
                if (comName == "CCParticleSystemQuad") {
                }
                else if (comName == "CCSprite") {
                    //判断是否是spine动画
                    var str = fileData["path"];
                    if (str.indexOf("wu.png") != -1) {
                        //动画
                    }
                    else {
                        var url = fileData["path"];
                        var image = new zj.MyImage();
                        image.source = zj.cachekey(this.CocosUrlToEgretUrl(fileData["path"]), this);
                        image.x = x;
                        image.y = y;
                        image.name = key;
                        image.tag = object;
                        image.scaleX = scaleX;
                        image.scaleY = scaleY;
                        image.addEventListener(egret.Event.COMPLETE, function (e) {
                            ///在图片的载入完成事件中获得图片的宽高。
                            var img = e.currentTarget;
                            //egret.log( "宽度:" + img.width,"高度:" + img.height);
                            img.anchorOffsetX = img.width / 2;
                            img.anchorOffsetY = img.height / 2;
                            if (img.tag["name"] == "main") {
                                _this.tableMapWidth[img.name] = img.width; // * 2 - 3;
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
        };
        GoFightMap.prototype.doLoadGameobject = function (object, layerName, key) {
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
        GoFightMap.prototype.loadExtra = function () {
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
                //let x =orgin.x;
                //let y =orgin.y;
                for (var i = 1; i < _nodeArr.length; i++) {
                    _nodeArr[i].x = Math.ceil(i * _width);
                    // _nodeArr[i].y = 0;//UIManager.StageHeight-y;
                }
            }
            if (this._isScroll != false) {
                this.startMove();
            }
            else {
                this.stopMove();
            }
        };
        GoFightMap.prototype.startMove = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        GoFightMap.prototype.stopMove = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        GoFightMap.prototype.enterFrame = function () {
            this.Move();
        };
        GoFightMap.prototype.Move = function () {
            this.UpdateMap(1, 0);
        };
        GoFightMap.prototype.UpdateMap = function (base_x, base_y) {
            if (!this.mapData)
                return;
            for (var k in this.tableMapNodes) {
                var offset = this.mapData[k + "_v"];
                var moveParamX = offset[0] * this.speed;
                var moveParamY = offset[1];
                var standard_width = this.tableMapWidth[k];
                this.setLayersPos(this.tableMapNodes[k], standard_width, base_x * (1 + ((moveParamX - 1) * zj.Device.screenWidth / 1100)), base_y * moveParamY);
            }
        };
        /**场景移动 以及拼接 */
        GoFightMap.prototype.setLayersPos = function (layers, width, move_x, move_y) {
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
                //c.y=500//y - move_y;
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
                        min_layer.x = now_x + width;
                        // min_layer.y=now_y;
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
                        max_layer.x = now_x - width;
                        // max_layer.y = now_y;
                    }
                }
            }
        };
        GoFightMap.prototype.LoadMap = function (name) {
            var stage_data = {
                seq: {},
                layers: {},
            };
            this.mapName = name;
            this.mapLayerData = {};
            this.loadJson(name);
        };
        return GoFightMap;
    }(zj.UI));
    zj.GoFightMap = GoFightMap;
    __reflect(GoFightMap.prototype, "zj.GoFightMap");
})(zj || (zj = {}));
//# sourceMappingURL=GoFightMap.js.map