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
     * 移动角色类
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapPlayer = (function (_super) {
        __extends(SceneMapPlayer, _super);
        function SceneMapPlayer(owner) {
            var _this = _super.call(this) || this;
            _this.owner = owner;
            _this.toPosList = [];
            _this.loadSlots();
            return _this;
        }
        SceneMapPlayer.prototype.setSceneInfo = function (scenePosInfo, dir) {
            if (dir === void 0) { dir = zj.TableEnum.TableEnumDir.Dir_Right; }
            this.speed = 6;
            this.lastDir = dir;
            this.setPlayerInfo(scenePosInfo.roleBase);
            this.loadBody();
            this.loadAura();
        };
        SceneMapPlayer.prototype.setPlayerInfo = function (playerInfo) {
            this.playerInfo = playerInfo;
            this.name = this.playerInfo.name;
            this.mapRoleId = zj.PlayerVIPSystem.GetMapRoleInfo(this.playerInfo);
        };
        SceneMapPlayer.prototype.loadBody = function () {
            var _this = this;
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            var bodySpxId = zj.TableMapRole.Item(this.mapRoleId).body_spx_id;
            if (bodySpxId != -1) {
                var bodyUI = this.owner.sceneUI;
                var scale_1 = 0.4;
                var spineTable_1 = zj.TableClientFightAniSpineSource.Item(bodySpxId);
                zj.Game.DragonBonesManager.getArmatureDisplayAsync(bodyUI, spineTable_1.json)
                    .then(function (armatureDisplay) {
                    var spx = new zj.Spx();
                    spx.spineScaleX = armatureDisplay.scaleX;
                    spx.spineScaleY = armatureDisplay.scaleY;
                    armatureDisplay.scaleX *= scale_1;
                    armatureDisplay.scaleY *= scale_1;
                    spx.scale = armatureDisplay.scaleY;
                    spx.spine = armatureDisplay;
                    spx.name = spineTable_1.json;
                    zj.setDragonBonesRemove(armatureDisplay);
                    spx.init();
                    _this.body = spx;
                    _this.addChild(_this.body.spine);
                    _this.actionId = -1;
                    _this.changeAction(zj.TableEnum.TableEnumBaseState.State_None, zj.TableEnum.TableEnumDir.Dir_Right);
                });
                // [this.body] = HunterSpineX(bodySpxId, scale, null, null, false, bodyUI);
                // if (this.body) {
                // 	this.addChild(this.body.spine);
                // 	this.actionId = -1;
                // 	this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
                // } else {
                // 	[this.body] = HunterSpineX(0, scale, null, MapSceneLoading.BlackRole, false, bodyUI);
                // 	let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);
                // 	Game.DragonBonesManager.preloadDragonbone(bodyUI, spineTable.json)
                // 		.then(() => {
                // 			if (this.body) {
                // 				this.body.clearSpine();
                // 				this.body = null;
                // 			}
                // 			[this.body] = HunterSpineX(bodySpxId, scale, null, null, false, bodyUI);
                // 			this.addChild(this.body.spine);
                // 			this.actionId = -1;
                // 			this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
                // 		});
                // }
            }
        };
        //脚底光环
        SceneMapPlayer.prototype.loadAura = function () {
            var _this = this;
            if (this.auraBack) {
                this.auraBack.parent.removeChild(this.auraBack);
                this.auraBack = null;
            }
            if (this.auraFront) {
                this.auraFront.parent.removeChild(this.auraFront);
                this.auraFront = null;
            }
            if (this.playerInfo == null || this.playerInfo.haloId == null) {
                return;
            }
            //光环 是否生效
            if (this.playerInfo.haloId == 0 || !zj.TableHalo.Item(this.playerInfo.haloId)) {
                return;
            }
            var scale = 0.8;
            var haloTbl = zj.TableHalo.Item(this.playerInfo.haloId);
            var auraCssIdFront = haloTbl.halo_front_aniId;
            var auraCssIdBack = haloTbl.halo_back_aniId;
            if (auraCssIdFront != null) {
                var ccitem = zj.TableClientAniUi.Item(auraCssIdFront);
                var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                var name_1 = item.name + "_" + item.number;
                zj.Game.DragonBonesManager.playAnimation(this, name_1, null, ccitem.index, 0).then(function (display) {
                    display.scaleX *= scale;
                    display.scaleY *= scale;
                    _this.addChildAt(display, 1);
                    _this.auraFront = display;
                });
            }
            if (auraCssIdBack != null) {
                var ccitem = zj.TableClientAniUi.Item(auraCssIdBack);
                var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                var name_2 = item.name + "_" + item.number;
                zj.Game.DragonBonesManager.playAnimation(this, name_2, null, ccitem.index, 0).then(function (display) {
                    display.scaleX *= scale;
                    display.scaleY *= scale;
                    _this.addChildAt(display, 0);
                    _this.auraBack = display;
                });
            }
        };
        SceneMapPlayer.prototype.setPos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        SceneMapPlayer.prototype.setMove = function (posList) {
            this.stopMove();
            this.toPosList = posList;
            var dir = posList[0].x > this.x ? zj.TableEnum.TableEnumDir.Dir_Right : zj.TableEnum.TableEnumDir.Dir_Left;
            this.changeAction(zj.TableEnum.TableEnumBaseState.State_Walk, dir);
        };
        SceneMapPlayer.prototype.stopMove = function () {
            this.setStand();
            while (this.toPosList.length > 0) {
                zj.PoolManager.getInstance().addPoint(this.toPosList.shift());
            }
        };
        SceneMapPlayer.prototype.setStand = function () {
            this.changeAction(zj.TableEnum.TableEnumBaseState.State_None, this.lastDir);
        };
        //脚底黑圈
        SceneMapPlayer.prototype.loadSlots = function () {
            if (this.shadow == null) {
                this.shadow = new eui.Image(zj.UIConfig.UIConfig_CommonBattle.common_shadow);
                this.addChild(this.shadow);
                this.shadow.x = -55;
                this.shadow.y = -10;
            }
        };
        SceneMapPlayer.prototype.changeAction = function (actionId, dir) {
            if (this.actionId == actionId && this.lastDir == dir) {
                return;
            }
            this.actionId = actionId;
            this.lastDir = dir;
            if (this.body != null) {
                var bFlipX = zj.yuan3(dir == zj.TableEnum.TableEnumDir.Dir_Right, false, true);
                this.body.setFlipX(bFlipX);
                this.body.SetLoop(true);
                this.body.ChangeAction(actionId);
            }
        };
        SceneMapPlayer.prototype.Update = function (dt) {
            switch (this.actionId) {
                case zj.TableEnum.TableEnumBaseState.State_Walk:
                    this.onMove();
                    break;
            }
        };
        SceneMapPlayer.prototype.onMoveRun = function (offx, offy) {
            if (this.owner) {
                this.owner.playerMove(this, offx, offy);
            }
        };
        SceneMapPlayer.prototype.onMoveFinish = function () {
            this.setStand();
            if (this.owner) {
                this.owner.playerMoveFinish(this);
            }
        };
        SceneMapPlayer.prototype.onMove = function () {
            var pos = this.toPosList[0];
            if (this.move(pos.x, pos.y)) {
                zj.PoolManager.getInstance().addPoint(this.toPosList.shift());
                if (this.toPosList.length == 0) {
                    this.onMoveFinish();
                }
                else if (this.toPosList[0].x != this.x) {
                    var dir = this.toPosList[0].x > this.x ? zj.TableEnum.TableEnumDir.Dir_Right : zj.TableEnum.TableEnumDir.Dir_Left;
                    this.changeAction(zj.TableEnum.TableEnumBaseState.State_Walk, dir);
                }
            }
        };
        SceneMapPlayer.prototype.move = function (tox, toy) {
            var _a = zj.Util.moveObj(this, this.speed, tox, toy), isFinish = _a[0], offx = _a[1], offy = _a[2];
            if (!this.checkBlock(this.x + offx, this.y + offy)) {
                this.x += offx;
                this.y += offy;
                this.onMoveRun(offx, offy);
            }
            return isFinish;
        };
        SceneMapPlayer.prototype.checkBlock = function (nx, ny) {
            return false;
        };
        return SceneMapPlayer;
    }(egret.DisplayObjectContainer));
    zj.SceneMapPlayer = SceneMapPlayer;
    __reflect(SceneMapPlayer.prototype, "zj.SceneMapPlayer");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapPlayer.js.map