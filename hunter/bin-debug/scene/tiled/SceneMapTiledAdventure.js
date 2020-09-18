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
     * tiledMap 副本大地图
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapTiledAdventure = (function (_super) {
        __extends(SceneMapTiledAdventure, _super);
        function SceneMapTiledAdventure() {
            var _this = _super.call(this) || this;
            _this.maxArea = -1; // 当前地图开启的最大小岛id
            _this.maxChapter = -1; // 当前地图开启的最大章节id
            _this.maxMob = -1; // 当前最大关卡bossid
            _this.skinName = "resource/skins/adventure/TiledSceneAdventureSkin.exml";
            return _this;
        }
        // 初始化地图层级
        SceneMapTiledAdventure.prototype.initLayers = function () {
            // 地图里的层列表
            this.layerList = [this["groupSurface"], this["groupUnit"], this["groupTop"], this["groupSky"]];
            var advCount = 20; // Game.PlayerMissionSystem.tableLength(TableInstanceArea.Table());
            this.adventureList = [];
            this.clouds = [this["cloud0"]];
            for (var i = 1; i <= advCount; ++i) {
                this.adventureList[i] = this["adv" + i];
                this.adventureList[i].setInfo(this, i);
                this.unitList.push(this.adventureList[i]);
                this.clouds[i] = this["cloud" + i];
            }
        };
        // 场景进入栈顶
        SceneMapTiledAdventure.prototype.onEntryTopScene = function () {
            _super.prototype.onEntryTopScene.call(this);
            this.initAdventure();
            if (this.aniManager) {
                this.aniManager.onEntryScene();
            }
        };
        // 显示场景
        SceneMapTiledAdventure.prototype.onLeaveTopScene = function () {
            _super.prototype.onLeaveTopScene.call(this);
            zj.SceneManager.adventurePos.setTo(this.player.x, this.player.y);
            if (this.aniManager) {
                this.aniManager.onLeaveScene();
            }
        };
        SceneMapTiledAdventure.prototype.parseMap = function () {
            _super.prototype.parseMap.call(this);
            this.tiledMap = null;
            this.initPlayer();
            this.initNpc();
            this.initAdventure();
            this.initCloud();
            this.aniManager = new zj.SceneAniManager(this);
            this.aniManager.init();
            this.refreshUnits();
        };
        SceneMapTiledAdventure.prototype.getInitPos = function () {
            if (!zj.SceneManager.adventurePos) {
                var pid = Math.max(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
                // pid = Util.randomValue(Math.max(pid - 3, 1), Math.min(pid + 1, 14));
                zj.SceneManager.adventurePos = new egret.Point(this.adventureList[pid].bornX, this.adventureList[pid].bornY);
            }
            return zj.SceneManager.adventurePos;
        };
        SceneMapTiledAdventure.prototype.getInitPos1 = function () {
            var pid = Math.max(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            pid = Math.max(Math.floor(zj.Util.randomValue(Math.max(pid - 6, 1), Math.min(pid, 14))), 1);
            var a = new egret.Point(this.adventureList[pid].bornX, this.adventureList[pid].bornY);
            return a;
        };
        SceneMapTiledAdventure.prototype.checkBlock = function () {
            var data = this.getBlockAstar();
            var x = Math.floor(this.player.x / this.tileW);
            var y = Math.floor(this.player.y / this.tileH);
            return data[x][y] == 1;
        };
        SceneMapTiledAdventure.prototype.initNpc = function () {
            var info = zj.Game.PlayerInstanceSystem.InstanceInfo.activityRandMobs;
            for (var i = 0; i < info.length; i++) {
                var Npc = new zj.SceneSceneNpc(this, info[i]);
                Npc.setSceneInfo();
                var pos = this.getInitPos1();
                Npc.setPos(pos.x, pos.y);
                this.addUnit(Npc);
                this.updateMapPoint(Npc.x, Npc.y);
                this.Npcs.push(Npc);
            }
        };
        SceneMapTiledAdventure.prototype.initPlayer = function () {
            this.player = new zj.SceneMapPlayer(this);
            var scenePosInfo = zj.SceneManager.scenePosInfo; //Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            this.player.setSceneInfo(scenePosInfo);
            var pos = this.getInitPos();
            this.player.setPos(pos.x, pos.y);
            this.addUnit(this.player);
            this.updateMapPoint(this.player.x, this.player.y);
        };
        SceneMapTiledAdventure.prototype.initLayer = function (v) {
            var lName = v.name;
            // if (lName.indexOf(TILEDMAP_KEY.surface) >= 0) {
            // } else 
            if (lName.indexOf(zj.TILEDMAP_KEY.block) >= 0) {
                this.initBlock(v);
            }
            else if (lName.indexOf(zj.TILEDMAP_KEY.objects) >= 0) {
                this.initObjects(v);
            }
        };
        SceneMapTiledAdventure.prototype.initBlock = function (layer) {
            this.blocks = [];
            this.blockAstar = [];
            var layerData = layer.layerData;
            var rows = layerData.length;
            var cols = layerData[0].length;
            var temp = null;
            var result = [];
            for (var i = 0; i < rows; ++i) {
                this.blocks[i] = [];
                this.blockAstar[i] = [];
                for (var j = 0; j < cols; ++j) {
                    temp = layerData[i][j];
                    if (temp) {
                        this.addBlock(temp.tileX, temp.tileY, Number(temp.gid - temp.tileset.firstgid));
                    }
                    else {
                        this.addBlock(i, j, -1);
                    }
                }
            }
        };
        SceneMapTiledAdventure.prototype.initObjects = function (layer) {
            var layerData = layer.layerData;
            var ab = this.tiledMap.getObjects()[0];
            var objects = ab["_childrens"];
            var len = objects.length;
            for (var i = 0; i < len; i++) {
                var dict = objects[i].attributes;
                switch (dict["name"]) {
                    case zj.TILEDMAP_KEY.born:
                        var idx = Number(dict["type"]);
                        var item = this.adventureList[idx];
                        if (item) {
                            item.setBorn(Math.floor(Number(dict["x"]) + this.tileW / 2), Math.floor(Number(dict["y"]) + this.tileH / 2));
                        }
                        break;
                }
            }
        };
        SceneMapTiledAdventure.prototype.addBlock = function (tileX, tileY, type) {
            this.blocks[tileX][tileY] = type;
        };
        SceneMapTiledAdventure.prototype.addBlockRect = function (rect) {
            var leftIdx = Math.max(0, Math.floor(rect.left / this.tileW));
            var upIdx = Math.max(0, Math.floor(rect.top / this.tileH));
            var rightIdx = Math.min(this.tileCountW, Math.floor(rect.right / this.tileW) + 1);
            var bottomIdx = Math.min(this.tileCountH, Math.floor(rect.bottom / this.tileH) + 1);
            var x;
            var y;
            var tx = this.tileW;
            var ty = this.tileH;
            for (var i = upIdx; i < bottomIdx; ++i) {
                for (var j = leftIdx; j < rightIdx; ++j) {
                    x = (j + 0.5) * tx;
                    y = (i + 0.5) * ty;
                    if (rect.isInPoint(x, y)) {
                        this.addBlock(j, i, 0);
                    }
                }
            }
        };
        SceneMapTiledAdventure.prototype.setCurrAdventure = function (adven) {
            this.clearCurrAdventure();
            this.currAdventure = adven;
            if (adven) {
                this.currAdventure.setTouch();
            }
        };
        SceneMapTiledAdventure.prototype.clearCurrAdventure = function () {
            if (this.currAdventure) {
                this.currAdventure.clearTouch();
                this.currAdventure = null;
            }
        };
        SceneMapTiledAdventure.prototype.onTouchAdventure = function () {
            this.setPlayerMove(this.currAdventure.bornX, this.currAdventure.bornY);
        };
        /**
         * 单位移动中调用
         */
        SceneMapTiledAdventure.prototype.playerMove = function (unit, offx, offy) {
            _super.prototype.playerMove.call(this, unit, offx, offy);
            if (this.isMapPlayerFollow) {
                this.updateMapPoint(unit.x, unit.y, false);
            }
        };
        /**
         * 单位移动结束
         */
        SceneMapTiledAdventure.prototype.playerMoveFinish = function (unit) {
            if (this.currAdventure && unit == this.player) {
                this.sceneUI.showAdventureInfo(this.currAdventure.data);
            }
        };
        /**
         * 检测是否有碰撞
         * 下一关的区域也可以走
         */
        SceneMapTiledAdventure.prototype.isBlockTiledIdx = function (idxw, idxh) {
            var type = this.blocks[idxw][idxh];
            if (type == 0 || type > zj.SceneManager.adventureOpenMax) {
                return true;
            }
            if (type > 0) {
                return !this.isOpen(type - 1);
            }
            return false;
        };
        /**
         * 地图状态改为拖动
         */
        SceneMapTiledAdventure.prototype.setMapMoveTouch = function () {
            _super.prototype.setMapMoveTouch.call(this);
            // this.player.setStand();// 地图拖动时角色停止移动
        };
        SceneMapTiledAdventure.prototype.getMaxAreaId = function () {
            return zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            // return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
        };
        SceneMapTiledAdventure.prototype.getMaxEliteId = function () {
            return zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
            // return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID;
        };
        SceneMapTiledAdventure.prototype.initAdventure = function () {
            var maxId = this.getMaxAreaId();
            var maxEliteId = this.getMaxEliteId();
            var datas = zj.TableInstanceArea.Table(); // 表，一共20个小岛
            var list = this.adventureList;
            var temp = null;
            for (var id in list) {
                temp = list[id];
                if (datas[id] && temp.id <= zj.SceneManager.adventureOpenMax) {
                    temp.setData(datas[id]);
                    temp.setMaxArea(maxId);
                    temp.setMaxElite(maxEliteId);
                }
                else {
                    temp.visible = false;
                }
            }
        };
        SceneMapTiledAdventure.prototype.initCloud = function () {
            var maxId = this.getMaxAreaId();
            var datas = zj.TableInstanceArea.Table(); // 表，一共20个小岛
            var temp = null;
            for (var id in datas) {
                temp = datas[id];
                if (temp.area_id <= maxId + 1 && temp.area_id <= zj.SceneManager.adventureOpenMax) {
                    this.clouds[id].visible = false;
                }
                else {
                    this.clouds[id].visible = true;
                }
            }
        };
        /**
         * 移动地图到指定小岛
         * areaId： 小岛id
         */
        SceneMapTiledAdventure.prototype.moveMapToArea = function (areaId, callback, thisObj) {
            var _this = this;
            var adv = this.adventureList[areaId];
            if (adv) {
                var self_1 = this;
                var _a = this.getMapPosToCenter(adv.x, adv.y), x = _a[0], y = _a[1];
                this.mapX = x;
                this.mapY = y;
                var tw = egret.Tween.get(this.layerMap);
                tw.to({ x: -x, y: -y }, 400);
                tw.call(function () {
                    egret.Tween.removeTweens(_this.layerMap);
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, self_1);
            }
        };
        SceneMapTiledAdventure.prototype.openAnimaFinish = function () {
            this.isOpenAniRun = false;
            // if (Teach.m_bOpenTeach && !Teach.isDone(8005)) Teach.SetTeachPart(8005);
            zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
        };
        SceneMapTiledAdventure.prototype.openAnimation = function (openArea, openElit) {
            this.isOpenAniRun = openArea || openElit;
            this.isMapPlayerFollow = false;
            if (openArea) {
                if (openElit) {
                    this.openAniArea(this.openAniElit, this);
                }
                else {
                    this.openAniArea(this.openAnimaFinish, this);
                }
            }
            else if (openElit) {
                this.openAniElit();
            }
        };
        SceneMapTiledAdventure.prototype.openAniArea = function (callback, objThis) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (objThis === void 0) { objThis = null; }
            this.sceneUI.setCanTouch(false);
            var maxId = this.getMaxAreaId();
            var adv = this.adventureList[maxId];
            if (adv) {
                var self_2 = this;
                this.moveMapToArea(maxId, function () {
                    self_2.startAni(adv, 1, function () {
                        _this.sceneUI.setCanTouch(true);
                        if (callback && objThis) {
                            callback.call(objThis);
                        }
                    }, self_2);
                }, this);
            }
            var nextMobId = maxId + 1;
            var max = Math.min(zj.SceneManager.adventureOpenMax + 1, this.clouds.length);
            if (nextMobId < max) {
                var cloud_1 = this.clouds[nextMobId];
                var adv_1 = this.adventureList[nextMobId];
                if (cloud_1 && cloud_1.visible && adv_1) {
                    var tw = egret.Tween.get(cloud_1);
                    tw.to({ alpha: 0 }, 400);
                    tw.call(function () {
                        egret.Tween.removeTweens(cloud_1);
                        cloud_1.visible = false;
                        adv_1.setMaxArea(maxId);
                    }, this);
                }
            }
        };
        SceneMapTiledAdventure.prototype.openAniElit = function () {
            var _this = this;
            this.sceneUI.setCanTouch(false);
            var maxEliteId = this.getMaxEliteId();
            // 关闭上一个小岛的图标
            if (maxEliteId > 1) {
                var advLast = this.adventureList[maxEliteId - 1];
                if (advLast) {
                    advLast.setMaxElite(maxEliteId);
                }
            }
            // 开启新小岛的图标
            var adv = this.adventureList[maxEliteId];
            if (adv) {
                var self_3 = this;
                this.moveMapToArea(maxEliteId, function () {
                    self_3.startAni(adv, 2, function () {
                        adv.setMaxElite(maxEliteId);
                        _this.sceneUI.setCanTouch(true);
                        _this.openAnimaFinish();
                    }, self_3);
                }, this);
            }
        };
        SceneMapTiledAdventure.prototype.startAni = function (adv, type, callback, thisobj) {
            var x = adv.getAniX();
            var y = adv.getAniY();
            var ui = zj.newUI(zj.AdventureOpenAni);
            ui.x = x - ui.width / 2;
            ui.y = y - ui.height / 2;
            this.layerList[zj.LAYER_TYPE.top].addChild(ui);
            ui.startAni(type, adv.data, callback, thisobj);
        };
        SceneMapTiledAdventure.prototype.isOpen = function (idx) {
            return this.sceneUI.isOpen(idx);
        };
        /**
         * 地图被移出屏幕时调用
         */
        SceneMapTiledAdventure.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            if (this.aniManager) {
                this.aniManager.release();
                this.aniManager = null;
            }
        };
        /**
         * 获取副本对象
         */
        SceneMapTiledAdventure.prototype.getTouchAdventure = function (x, y) {
            var list = this.adventureList;
            for (var i = list.length - 1; i >= 0; --i) {
                if (list[i] && this.isOpen(list[i].id) && list[i].isTouch(x, y)) {
                    return list[i];
                }
            }
            return null;
        };
        /**
         * id:小岛id（从1开始）
         */
        SceneMapTiledAdventure.prototype.getAdventureById = function (id) {
            return this.adventureList[id];
        };
        SceneMapTiledAdventure.prototype.touchBegan = function (touchUIX, touchUIY, touchMapX, touchMapY) {
            this.clearCurrAdventure();
            this.isMapPlayerFollow = false;
            var adven = this.getTouchAdventure(touchMapX, touchMapY);
            if (adven) {
                this.setCurrAdventure(adven);
            }
            _super.prototype.touchBegan.call(this, touchUIX, touchUIY, touchMapX, touchMapY);
        };
        SceneMapTiledAdventure.prototype.touchMoved = function (touchUIX, touchUIY) {
            if (this.currAdventure) {
                return;
            }
            _super.prototype.touchMoved.call(this, touchUIX, touchUIY);
        };
        SceneMapTiledAdventure.prototype.touchEnded = function (touchUIX, touchUIY, touchMapX, touchMapY) {
            if (this.currAdventure) {
                var adven = this.getTouchAdventure(touchMapX, touchMapY);
                if (this.currAdventure == adven) {
                    this.currAdventure.clearTouch();
                    this.onTouchAdventure();
                }
                else {
                    this.clearCurrAdventure();
                }
                return;
            }
            _super.prototype.touchEnded.call(this, touchUIX, touchUIY, touchMapX, touchMapY);
        };
        SceneMapTiledAdventure.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (this.aniManager) {
                this.aniManager.Update(tick);
            }
        };
        return SceneMapTiledAdventure;
    }(zj.SceneMapTiledBase));
    zj.SceneMapTiledAdventure = SceneMapTiledAdventure;
    __reflect(SceneMapTiledAdventure.prototype, "zj.SceneMapTiledAdventure");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapTiledAdventure.js.map