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
     * 场景地图基类（单机类型场景地图）
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapBase = (function (_super) {
        __extends(SceneMapBase, _super);
        function SceneMapBase() {
            var _this = _super.call(this) || this;
            _this.speed = 10; // 地图移动速度
            _this.mapWidth = 0; // 整个地图宽
            _this.mapHeight = 0; // 整个地图高
            _this.mapXMax = 0; // 地图移动最大X坐标
            _this.mapYMax = 0; // 地图移动最大Y坐标
            _this.mapX = 0; // 地图X坐标
            _this.mapY = 0; // 地图Y坐标
            _this.Npcs = [];
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            return _this;
        }
        SceneMapBase.prototype.show = function () {
        };
        SceneMapBase.prototype.initUI = function () {
            this.isMapMove = false;
            this.isTouchMap = false;
            this.isLockMap = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.mapMovePos = new egret.Point();
        };
        SceneMapBase.prototype.init = function (ui, param) {
            if (param === void 0) { param = null; }
            this.sceneUI = ui;
            this.initUI();
            // 遮挡单位列表
            this.unitList = [];
            // 初始化地图层
            this.initLayers();
        };
        // 初始化地图层级
        SceneMapBase.prototype.initLayers = function () {
            // 整个地图容器
            this.layerMap = new egret.DisplayObjectContainer();
            this.addChildAt(this.layerMap, 0);
            // 地图里的层列表
            this.layerList = [];
            for (var i = 0; i < zj.LAYER_TYPE.max; ++i) {
                var layer = new egret.DisplayObjectContainer();
                this.layerList[i] = layer;
                this.layerMap.addChild(layer);
            }
        };
        SceneMapBase.prototype.initPlayer = function () {
            // 初始化地图角色
        };
        SceneMapBase.prototype.onStart = function (anima) {
            if (this.sceneUI) {
                this.sceneUI.mapLoadFinish(anima);
            }
            else {
                egret.error("SceneMapBase - onStart - error: sceneUI is null");
            }
        };
        SceneMapBase.prototype.setLockMap = function (isLock) {
            this.isLockMap = isLock;
        };
        SceneMapBase.prototype.resize = function () {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            this.mapXMax = this.mapWidth - zj.UIManager.StageWidth;
            this.mapYMax = this.mapHeight - zj.UIManager.StageHeight;
            this.updateMapOut();
            this.layerMap.x = -this.mapX;
            this.layerMap.y = -this.mapY;
        };
        SceneMapBase.prototype.getMapX = function () {
            return this.mapX;
        };
        SceneMapBase.prototype.getMapY = function () {
            return this.mapY;
        };
        SceneMapBase.prototype.getMapWidth = function () {
            return this.mapWidth;
        };
        SceneMapBase.prototype.getMapHeight = function () {
            return this.mapHeight;
        };
        /**
         * 获取地图中心点
         */
        SceneMapBase.prototype.getMapCenterPos = function () {
            return [this.mapX + zj.UIManager.StageWidth / 2, this.mapY + zj.UIManager.StageHeight / 2];
        };
        /**
         * 通过点获得地图坐标
         */
        SceneMapBase.prototype.getMapPosToCenter = function (centerx, centery) {
            var mapX = centerx - zj.UIManager.StageWidth / 2;
            var mapY = centery - zj.UIManager.StageHeight / 2;
            mapX = mapX > this.mapXMax ? this.mapXMax : mapX;
            mapX = mapX < 0 ? 0 : mapX;
            mapY = mapY > this.mapYMax ? this.mapYMax : mapY;
            mapY = mapY < 0 ? 0 : mapY;
            return [mapX, mapY];
        };
        /**
         * 更新地图坐标(角色移动时调用,更新地图坐标跟随角色)
         * cx，cy： 地图中心点坐标
         * isUpdate: 是否马上更新坐标
         */
        SceneMapBase.prototype.updateMapPoint = function (cx, cy, isUpdate) {
            if (isUpdate === void 0) { isUpdate = true; }
            var _a = this.getMapPosToCenter(cx, cy), x = _a[0], y = _a[1];
            this.mapX = x;
            this.mapY = y;
            if (isUpdate) {
                this.layerMap.x = -this.mapX;
                this.layerMap.y = -this.mapY;
            }
        };
        /**
         * 检测地图是否出屏幕
         */
        SceneMapBase.prototype.updateMapOut = function () {
            this.mapX = this.mapX > this.mapXMax ? this.mapXMax : this.mapX;
            this.mapX = this.mapX < 0 ? 0 : this.mapX;
            this.mapY = this.mapY > this.mapYMax ? this.mapYMax : this.mapY;
            this.mapY = this.mapY < 0 ? 0 : this.mapY;
        };
        SceneMapBase.prototype.Update = function (tick) {
            if (this.player) {
                this.player.Update(tick);
            }
            if (this.Npcs && this.Npcs.length != 0) {
                for (var i = 0; i < this.Npcs.length; i++) {
                    if (this.Npcs[i]) {
                        this.Npcs[i].Update(tick);
                    }
                }
            }
            if (this.layerMap.x != -this.mapX || this.layerMap.y != -this.mapY) {
                var _a = zj.Util.moveObj(this.layerMap, this.speed, -this.mapX, -this.mapY), isFinish = _a[0], offx = _a[1], offy = _a[2];
                this.layerMap.x += offx;
                this.layerMap.y += offy;
            }
        };
        SceneMapBase.prototype.getLayer = function (type) {
            return this.layerList[type];
        };
        /**
         * 添加元素
         */
        SceneMapBase.prototype.addUnit = function (unit) {
            for (var i = 0; i < this.unitList.length; ++i) {
                if (unit.y < this.unitList[i].y) {
                    this.unitList.splice(i, 0, unit);
                    this.layerList[zj.LAYER_TYPE.unit].addChildAt(unit, i);
                    return;
                }
            }
            this.unitList.push(unit);
            this.layerList[zj.LAYER_TYPE.unit].addChild(unit);
        };
        /**
         * 删除元素
         */
        SceneMapBase.prototype.removeUnit = function (unit) {
            var idx = this.unitList.indexOf(unit);
            if (idx >= 0) {
                this.unitList.splice(idx, 1);
            }
            unit.parent.removeChild(unit);
        };
        SceneMapBase.prototype.refreshUnits = function () {
            var sort = function (a, b) {
                return a.y - b.y;
            };
            this.unitList.sort(sort);
            var layer = this.layerList[zj.LAYER_TYPE.unit];
            for (var i = 0; i < this.unitList.length; ++i) {
                layer.setChildIndex(this.unitList[i], i);
            }
        };
        SceneMapBase.prototype.updateUnitY = function (unit, offy) {
            var idx = this.unitList.indexOf(unit);
            if (idx >= 0) {
                var temp = null;
                var layer = this.layerList[zj.LAYER_TYPE.unit];
                if (offy > 0) {
                    for (var i = idx + 1; i < this.unitList.length; ++i) {
                        temp = this.unitList[i];
                        if (unit.y >= temp.y) {
                            layer.setChildIndex(unit, i);
                            this.unitList[i] = unit;
                            this.unitList[i - 1] = temp;
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    for (var i = idx - 1; i >= 0; --i) {
                        temp = this.unitList[i];
                        if (unit.y < temp.y) {
                            layer.setChildIndex(unit, i);
                            this.unitList[i] = unit;
                            this.unitList[i + 1] = temp;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        };
        SceneMapBase.prototype.setPlayerMove = function (x, y, isMapFollow) {
            if (isMapFollow === void 0) { isMapFollow = true; }
            if (this.player && !this.isBlockPos(x, y)) {
                this.player.setMove([zj.PoolManager.getInstance().getPoint(x, y)]);
                this.isMapPlayerFollow = isMapFollow;
            }
        };
        /**
         * 单位移动中调用
         */
        SceneMapBase.prototype.playerMove = function (unit, offx, offy) {
            if (offy != 0) {
                this.updateUnitY(unit, offy);
            }
        };
        /**
         * 单位移动完成调用
         */
        SceneMapBase.prototype.playerMoveFinish = function (unit) { };
        /**
         * 检测坐标是否有碰撞
         */
        SceneMapBase.prototype.isBlockPos = function (x, y) {
            return x < 0 || x > this.mapWidth || y < 0 || y > this.mapHeight;
        };
        /**
         * 地图被移出屏幕时调用
         */
        SceneMapBase.prototype.onRemoveFromStage = function () {
            if (this.player) {
                zj.dragonBonesPool.getInstance().dbArr.push(this.player.body);
                this.player = null;
            }
            for (var i = 0; i < this.Npcs.length; i++) {
                if (this.Npcs[i]) {
                    zj.dragonBonesPool.getInstance().dbArr.push(this.Npcs[i].body);
                    this.Npcs[i] = null;
                }
            }
            this.Npcs = null;
        };
        SceneMapBase.prototype.OnTouchBegan = function (touchs) {
            this.touchBegan(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y, touchs.stageX - zj.Game.UIManager.x - this.layerMap.x, touchs.stageY - zj.Game.UIManager.y - this.layerMap.y);
        };
        SceneMapBase.prototype.OnTouchMoved = function (touchs) {
            this.touchMoved(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
        };
        SceneMapBase.prototype.OnTouchEnded = function (touchs) {
            this.touchEnded(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y, touchs.stageX - zj.Game.UIManager.x - this.layerMap.x, touchs.stageY - zj.Game.UIManager.y - this.layerMap.y);
        };
        /**
         * 地图状态改为拖动
         */
        SceneMapBase.prototype.setMapMoveTouch = function () {
            this.isMapMove = true;
        };
        SceneMapBase.prototype.touchBegan = function (touchUIX, touchUIY, touchMapX, touchMapY) {
            if (this.isLockMap) {
                return;
            }
            this.isTouchMap = true;
            this.isMapMove = false;
            this.mapX = -this.layerMap.x;
            this.mapY = -this.layerMap.y;
            if (this.mapMovePos) {
                this.mapMovePos.setTo(touchUIX, touchUIY);
            }
        };
        SceneMapBase.prototype.touchMoved = function (touchUIX, touchUIY) {
            if (this.isLockMap) {
                return;
            }
            if (this.isTouchMap && this.mapMovePos) {
                if (this.isMapMove) {
                    this.updateMapDrag(touchUIX, touchUIY);
                }
                else if (zj.Util.pDisPoint(this.mapMovePos.x, this.mapMovePos.y, touchUIX, touchUIY) > 10) {
                    this.mapMovePos.setTo(touchUIX, touchUIY);
                    this.setMapMoveTouch();
                }
            }
        };
        SceneMapBase.prototype.touchEnded = function (touchUIX, touchUIY, touchMapX, touchMapY) {
            if (this.isLockMap) {
                return;
            }
            if (this.isTouchMap) {
                this.isTouchMap = false;
                if (!this.isMapMove) {
                    this.setPlayerMove(touchMapX, touchMapY);
                }
                if (this.isMapMove) {
                    this.isMapMove = false;
                    this.updateMapDrag(touchUIX, touchUIY);
                }
            }
        };
        SceneMapBase.prototype.updateMapDrag = function (x, y) {
            var offx = this.mapMovePos.x - x;
            var offy = this.mapMovePos.y - y;
            this.mapMovePos.setTo(x, y);
            this.mapDrag(offx, offy);
        };
        SceneMapBase.prototype.mapDrag = function (offx, offy) {
            this.mapX += offx;
            this.mapY += offy;
            if (offx > 0) {
                this.mapX = this.mapX > this.mapXMax ? this.mapXMax : this.mapX;
            }
            else {
                this.mapX = this.mapX < 0 ? 0 : this.mapX;
            }
            if (offy > 0) {
                this.mapY = this.mapY > this.mapYMax ? this.mapYMax : this.mapY;
            }
            else {
                this.mapY = this.mapY < 0 ? 0 : this.mapY;
            }
            this.layerMap.x = -this.mapX;
            this.layerMap.y = -this.mapY;
        };
        return SceneMapBase;
    }(zj.Scene));
    zj.SceneMapBase = SceneMapBase;
    __reflect(SceneMapBase.prototype, "zj.SceneMapBase");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapBase.js.map