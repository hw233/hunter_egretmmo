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
    /**
     * 副本界面-关卡跑图
     * zhaiweili
     * 2019.11.7
     */
    var SceneMapNodeBase = (function (_super) {
        __extends(SceneMapNodeBase, _super);
        function SceneMapNodeBase() {
            var _this = _super.call(this) || this;
            _this.layerName = ["far2", "far1", "far", "mid2", "mid1", "group", "close"];
            _this.tableMapNodes = { far2: [], far1: [], far: [], mid2: [], mid1: [], group: [], close: [] };
            _this.tableMapWidth = { far2: 0, far1: 0, far: 0, mid2: 0, mid1: 0, group: 0, close: 0 };
            _this.offsetX = 1;
            _this._isScroll = false;
            return _this;
        }
        SceneMapNodeBase.prototype.init = function (ui, param) {
            if (param === void 0) { param = null; }
            _super.prototype.init.call(this, ui, param);
            // for (let i = 0; i < this.layerList.length; ++i) {
            // 	this.layerMap.removeChild(this.layerList[i]);
            // }
            // this.resId = param;
            // this.loadJson(this.resId);
            this.mapWidth = 2500;
            this.mapHeight = 800;
            // RES.getResAsync("img_7_group_png", ()=>{
            var img = new eui.Image();
            img.source = "img_7_group_png";
            img.width = this.mapWidth;
            img.height = this.mapHeight;
            this.layerMap.addChild(img);
            this.onStart(zj.UI.SHOW_FILL_OUT);
            // }, this);
        };
        SceneMapNodeBase.prototype.loadJson = function (id) {
            this.json = zj.Game.ConfigManager.getTable(id + ".json");
            //this.loadMapAssets();
            this.initNewMap();
            this.LoadNewMap(this.resId);
        };
        SceneMapNodeBase.prototype.initNewMap = function () {
            for (var i = 0; i < this.layerName.length; i++) {
                var _name = this.layerName[i];
                this["node_" + _name] = new eui.Group();
                this["node_" + _name].touchEnabled = false;
                this["node_" + _name].touchChildren = false;
                // this["node_" + _name].cacheAsBitmap = true;
                this.addChildMapAndOther(this["node_" + _name], _name);
                this.layerMap.addChild(this["node_" + _name]);
            }
        };
        SceneMapNodeBase.prototype.addChildMapAndOther = function (node, name) {
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
        /**开始解析JSON */
        SceneMapNodeBase.prototype.LoadNewMap = function (name) {
            var mapData = zj.TableClientMapBg.Item(name);
            this._isScroll = mapData.scroll == 0 ? false : true;
            this.mapWidth = this.json["CanvasSize"]._width;
            this.mapHeight = this.json["CanvasSize"]._height;
            // if(this.mapWidth < UIManager.StageWidth){
            // 	for(let i = 0;i<this.boxArr.length;i++){
            //this.boxArr[i].scaleX = UIManager.StageWidth/this.mapWidth;
            // }
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
            // this.startMove();
        };
        SceneMapNodeBase.prototype.doLoadGameobject = function (object, layerName, key) {
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
        SceneMapNodeBase.prototype.doloadCompoent = function (object, component, node, key) {
            var _this = this;
            var x = object["x"];
            var y = zj.UIManager.StageHeight - object["y"];
            var scaleX = object["scalex"];
            var scaleY = object["scaley"];
            var comName = component["name"];
            if (comName != null) {
                if (comName == "CCSprite") {
                    var fileData = component["fileData"];
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
        };
        /**cocos场景配置坐标转换成Egret坐标 */
        SceneMapNodeBase.prototype.CocosUrlToEgretUrl = function (url) {
            var arrS = url.split(".");
            var sourceArr = arrS[0].split("/");
            var source = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        };
        SceneMapNodeBase.prototype.loadExtra = function () {
            for (var k in this.tableMapNodes) {
                var _nodeArr = this.tableMapNodes[k];
                var orgin = _nodeArr[0];
                var rect = zj.Set.getNodeRect(orgin);
                var _calc = rect.right - rect.left;
                var _ret = this.tableMapWidth[k];
                if (_ret == 0) {
                    this.tableMapWidth[k] = _calc; // * 2 - 3;
                }
                if (this._isScroll == false) {
                    continue;
                }
                var _width = this.tableMapWidth[k];
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
        /**场景移动 以及拼接 */
        SceneMapNodeBase.prototype.setLayersPos = function (layers, width, move_x, move_y) {
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
        return SceneMapNodeBase;
    }(zj.SceneMapBase));
    zj.SceneMapNodeBase = SceneMapNodeBase;
    __reflect(SceneMapNodeBase.prototype, "zj.SceneMapNodeBase");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapNodeBase.js.map