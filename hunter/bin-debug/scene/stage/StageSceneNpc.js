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
     * 移动Npc类
     * xingliwei
     * 2020.1.6
     */
    var SceneSceneNpc = (function (_super) {
        __extends(SceneSceneNpc, _super);
        function SceneSceneNpc(owner, info) {
            var _this = _super.call(this) || this;
            _this.index = 1;
            //计时用
            _this.n = 0;
            _this.n1 = (60 * 2 + (Math.random() * 5 * 500));
            _this.pid = Math.max(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            _this.owner = owner;
            _this.playerInfo = info;
            _this.index = info.key;
            _this.toPosList = [];
            _this.width = 80;
            _this.height = 110;
            _this.loadSlots();
            var a = new eui.Rect(_this.width, _this.height);
            a.alpha = 0.001;
            _this.addChild(a);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.TouchTap, _this);
            var pid = Math.max(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            pid = Math.floor(zj.Util.randomValue(Math.max(pid - 3, 1), Math.min(pid, 14)));
            var xy = zj.SceneManager.adventurePos = new egret.Point(_this.owner.adventureList[pid].bornX, _this.owner.adventureList[pid].bornY);
            _this.setMove([zj.PoolManager.getInstance().getPoint(xy.x, xy.y)]);
            return _this;
        }
        SceneSceneNpc.prototype.TouchTap = function () {
            var _this = this;
            this.ReqGetMobsInfo(this.index).then(function () {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.index);
                });
            });
        };
        SceneSceneNpc.prototype.setSceneInfo = function () {
            this.speed = 4;
            this.setPlayerInfo();
            this.loadBody();
        };
        SceneSceneNpc.prototype.setPlayerInfo = function () {
            var labelTime = new eui.Label();
            labelTime.text = zj.TableActivityRandInstance.Item(this.playerInfo.key).name;
            labelTime.width = 180;
            labelTime.size = 16;
            labelTime.stroke = 1;
            labelTime.y = 20;
            labelTime.textColor = 0xFFCF00;
            labelTime.textAlign = "center";
            labelTime.anchorOffsetX = labelTime.width / 2;
            labelTime.x = this.width / 2;
            this.addChild(labelTime);
            this.labelTime = new eui.Label();
            this.labelTime.text = "1:11:35";
            this.labelTime.width = 180;
            this.labelTime.size = 16;
            this.labelTime.textColor = 0xff0000;
            this.labelTime.stroke = 1;
            this.labelTime.textAlign = "center";
            this.labelTime.anchorOffsetX = this.labelTime.width / 2;
            this.labelTime.x = this.width / 2;
            this.addChild(this.labelTime);
        };
        SceneSceneNpc.prototype.loadBody = function () {
            var _this = this;
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            var bodyUI = this.owner.sceneUI;
            var scale = 0.4;
            var spineTable = zj.TableClientFightAniSpineSource.Item(1131);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(bodyUI, spineTable.json)
                .then(function (armatureDisplay) {
                var spx = new zj.Spx();
                spx.spineScaleX = armatureDisplay.scaleX;
                spx.spineScaleY = armatureDisplay.scaleY;
                armatureDisplay.scaleX *= scale * 0.8;
                armatureDisplay.scaleY *= scale * 0.8;
                spx.scale = armatureDisplay.scaleY;
                spx.spine = armatureDisplay;
                spx.name = spineTable.json;
                zj.setDragonBonesRemove(armatureDisplay);
                spx.init();
                _this.body = spx;
                spx.spine.y = _this.height;
                spx.spine.x = 40;
                _this.addChild(_this.body.spine);
                _this.actionId = -1;
                _this.changeAction(zj.TableEnum.TableEnumBaseState.State_None, zj.TableEnum.TableEnumDir.Dir_Right);
            });
        };
        SceneSceneNpc.prototype.setPos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        SceneSceneNpc.prototype.setMove = function (posList) {
            this.stopMove();
            this.toPosList = posList;
            var dir = posList[0].x > this.x ? zj.TableEnum.TableEnumDir.Dir_Right : zj.TableEnum.TableEnumDir.Dir_Left;
            this.changeAction(zj.TableEnum.TableEnumBaseState.State_Walk, dir);
        };
        SceneSceneNpc.prototype.stopMove = function () {
            this.setStand();
            while (this.toPosList.length > 0) {
                zj.PoolManager.getInstance().addPoint(this.toPosList.shift());
            }
        };
        SceneSceneNpc.prototype.setStand = function () {
            this.changeAction(zj.TableEnum.TableEnumBaseState.State_None, this.lastDir);
        };
        //脚底黑圈
        SceneSceneNpc.prototype.loadSlots = function () {
            if (this.shadow == null) {
                this.shadow = new eui.Image(zj.UIConfig.UIConfig_CommonBattle.common_shadow);
                this.addChild(this.shadow);
                this.shadow.x = -55;
                this.shadow.y = -10;
            }
        };
        SceneSceneNpc.prototype.changeAction = function (actionId, dir) {
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
        SceneSceneNpc.prototype.Update = function (dt) {
            var _this = this;
            // this.n++;
            var info = zj.Table.FindR(zj.Game.PlayerInstanceSystem.InstanceInfo.activityRandMobs, function (k, v) {
                return v.key == _this.playerInfo.key;
            });
            if (!info[0]) {
                this.close1();
            }
            var infotime = this.playerInfo.value - Math.floor(egret.getTimer() / 1000);
            var hour = Math.floor(infotime / 3600 % 24);
            var min = Math.floor(infotime / 60 % 60).toString();
            if (Number(min) < 10) {
                min = "0" + min;
            }
            var miao = Math.floor(infotime % 60).toString();
            if (Number(miao) < 10) {
                miao = "0" + miao;
            }
            this.labelTime.text = hour + ":" + min + ":" + miao;
            // if (this.n > this.n1) {
            //     this.n = 0;
            //     this.n1 = (60 * 2 + (Math.random() * 5 * 500));
            //     this.pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            //     this.pid = Math.floor(Util.randomValue(Math.max(this.pid - 3, 1), Math.min(this.pid, 14)));
            //     let xy = SceneManager.adventurePos = new egret.Point(this.owner.adventureList[this.pid].bornX, this.owner.adventureList[this.pid].bornY);
            //     this.setMove([PoolManager.getInstance().getPoint(xy.x, xy.y)]);
            //     this.onMove();
            // }
        };
        SceneSceneNpc.prototype.ReqGetMobsInfo = function (wantedId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                request.body.mobsId = wantedId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        SceneSceneNpc.prototype.onMoveRun = function (offx, offy) {
            // if (this.owner) {
            //     this.owner.playerMove(this, offx, offy);
            // }
        };
        SceneSceneNpc.prototype.onMoveFinish = function () {
            this.setStand();
            // if (this.owner) {
            //     this.owner.playerMoveFinish(this);
            // }
        };
        SceneSceneNpc.prototype.close1 = function () {
            var _this = this;
            var info = zj.Table.FindR(this.owner.Npcs, function (k, v) {
                return v.playerInfo.key == _this.playerInfo.key;
            });
            this.owner.Npcs.splice(info[1], 1);
            this.owner.removeUnit(this);
            zj.dragonBonesPool.getInstance().dbArr.push(this.body);
        };
        SceneSceneNpc.prototype.onMove = function () {
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
        SceneSceneNpc.prototype.move = function (tox, toy) {
            var _a = zj.Util.moveObj(this, this.speed, tox, toy), isFinish = _a[0], offx = _a[1], offy = _a[2];
            if (!this.checkBlock(this.x + offx, this.y + offy)) {
                this.x += offx;
                this.y += offy;
                this.onMoveRun(offx, offy);
            }
            return isFinish;
        };
        SceneSceneNpc.prototype.checkBlock = function (nx, ny) {
            return false;
        };
        return SceneSceneNpc;
    }(egret.DisplayObjectContainer));
    zj.SceneSceneNpc = SceneSceneNpc;
    __reflect(SceneSceneNpc.prototype, "zj.SceneSceneNpc");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneNpc.js.map