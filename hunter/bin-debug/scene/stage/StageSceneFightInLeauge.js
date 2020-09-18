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
    var StageSceneFightInLeauge = (function (_super) {
        __extends(StageSceneFightInLeauge, _super);
        function StageSceneFightInLeauge(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.tiggerAreaEventTbl = [];
            _this.setPlayerState(zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER);
            _this.checkNode = null;
            _this.button = null;
            _this.menuCB = null;
            _this.save_end_x = 0;
            _this.save_end_y = 0;
            _this.tiggerAreaEventTbl = [];
            return _this;
        }
        StageSceneFightInLeauge.prototype.release = function () {
            _super.prototype.release.call(this);
            if (this.checkNode != null) {
                this.checkNode.removeChild(this.button);
                this.button = null;
            }
        };
        StageSceneFightInLeauge.prototype.startControl = function () {
            if (this.progressBoard && this.progressBar) {
                this.progressBoard.visible = true;
                this.progressBar.visible = true;
            }
        };
        StageSceneFightInLeauge.prototype.endControl = function () {
            if (this.progressBoard && this.progressBar) {
                this.progressBoard.visible = false;
                this.progressBar.visible = false;
            }
        };
        StageSceneFightInLeauge.prototype.leaveControl = function () {
            if (this.bProgressing && this.progressBoard && this.progressBar) {
                this.progressBoard.visible = false;
                this.progressBar.visible = false;
            }
        };
        StageSceneFightInLeauge.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procProgress(tick);
            this.proTriggerArea();
        };
        StageSceneFightInLeauge.prototype.showCheckButton = function (open) {
            if (this.bVisible == false) {
                return;
            }
            this.button.visible = open;
            if (this.ttfName != null && this.ttfName.visible == true) {
                var color = zj.yuan3(open == true, zj.ConstantConfig_Common.Color.league_color.high_name_color, this.getNameColor());
                this.ttfName.textColor = color;
            }
        };
        StageSceneFightInLeauge.prototype.proTriggerArea = function () {
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
                this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                var eventTbl = this.tiggerAreaEventTbl;
                this.tiggerAreaEventTbl = this.curScene.dealTriggerAreaThings(this.x, this.y, eventTbl);
            }
        };
        StageSceneFightInLeauge.prototype.setMenuCB = function (cb) {
            this.menuCB = cb;
        };
        StageSceneFightInLeauge.prototype.getTargetPos = function () {
            var _a = this.converScreenPos(this.targetPos), tmp_x = _a[0], tmp_y = _a[1];
            return [tmp_x, tmp_y];
        };
        StageSceneFightInLeauge.prototype.startStarPath = function (end_x, end_y, cb) {
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                return;
            }
            if (this.isCanPath(end_x, end_y) == false) {
                return;
            }
            if (Math.abs(this.save_end_x - end_x) <= 5 && Math.abs(this.save_end_y - end_y) <= 5) {
                return;
            }
            this.save_end_x = end_x;
            this.save_end_y = end_y;
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND ||
                zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                this.startTarget(end_x, end_y, cb);
            }
            else if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_LEAGUE_FIGHT ||
                zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND) {
                var screen_x = this.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
                var screen_y = this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
                this.setTargetCB(cb);
                var beginPos = new egret.Point(screen_x, screen_y);
                var endPos = new egret.Point(end_x, end_y);
                var path = zj.PathFinder.calculate(beginPos, endPos, this.curScene.blocks, false, this.path);
                this.path = path;
                if (this.path != null) {
                    this.targetEndPoint = endPos;
                    this.goToWalk();
                }
            }
        };
        StageSceneFightInLeauge.prototype.dealSimpleMoveNotice = function (simple) {
            _super.prototype.dealSimpleMoveNotice.call(this, simple);
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
                if (this.curScene.bPosFinished == true) {
                    if (zj.Gmgr.Instance.bInLoading == true) {
                        var _a = this.converScreenPos(new egret.Point(simple.scene_x, simple.scene_y)), screen_x = _a[0], screen_y = _a[1];
                        this.setPos(screen_x, screen_y);
                    }
                    else {
                        this.startStarPath(simple.scene_x, simple.scene_y, null);
                    }
                }
            }
        };
        StageSceneFightInLeauge.prototype.dealSceneNotice = function (notice) {
            _super.prototype.dealSceneNotice.call(this, notice);
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
                //异常处理
                if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die && notice.hpPre != 0) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                }
                if (this.curScene.bPosFinished == true) {
                    if (zj.Gmgr.Instance.bInLoading == true) {
                        var _a = this.converScreenPos(new egret.Point(notice.posItem.scene_x, notice.posItem.scene_y)), screen_x = _a[0], screen_y = _a[1];
                        this.setPos(screen_x, screen_y);
                    }
                    else {
                        this.startStarPath(notice.posItem.scene_x, notice.posItem.scene_y, null);
                    }
                }
            }
            else if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN) {
                var _b = this.converScreenPos(new egret.Point(notice.posItem.scene_x, notice.posItem.scene_y)), screen_x = _b[0], screen_y = _b[1];
                this.setPos(screen_x, screen_y);
            }
        };
        StageSceneFightInLeauge.prototype.dealRevive = function () {
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE && this.curScene.playerLeader != null) {
                this.path = null;
                var _a = this.converScreenPos(new egret.Point(this.scenePosInfo.posItem.scene_x, this.scenePosInfo.posItem.scene_y)), screen_x = _a[0], screen_y = _a[1];
                this.setPos(screen_x, screen_y);
            }
        };
        StageSceneFightInLeauge.prototype.dealDead = function () {
            if (zj.Gmgr.Instance.bInLoading == false) {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.sceneHpPercent == 0) {
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_FallDown);
                        this.targetCB = null;
                    }
                }
                else {
                    if (this.bVisible == false) {
                        if (this.sceneHpPercent == 0) {
                            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                        }
                    }
                    else {
                        if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO
                            || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE
                            || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN
                            || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN
                            || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
                            if (this.sceneHpPercent == 0) {
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                            }
                        }
                    }
                }
            }
            else {
                if (this.sceneHpPercent == 0) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                }
            }
        };
        StageSceneFightInLeauge.prototype.endFightShow = function () {
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            var _a = this.converScreenPos(new egret.Point(this.scenePosInfo.posItem.scene_x, this.scenePosInfo.posItem.scene_y)), screen_x = _a[0], screen_y = _a[1];
            this.setPos(screen_x, screen_y);
            if (this.showCB != null) {
                this.showCB();
                this.showCB = null;
            }
        };
        StageSceneFightInLeauge.prototype.setPos = function (x, y) {
            _super.prototype.setPos.call(this, x, y);
        };
        StageSceneFightInLeauge.prototype.getMapY = function () {
            return this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
        };
        StageSceneFightInLeauge.prototype.getNameColor = function () {
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                return zj.ConstantConfig_Common.Color.wonderland_color.memeber_color;
            }
            else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                return zj.ConstantConfig_Common.Color.wonderland_color.memeber_color;
            }
            else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                return zj.ConstantConfig_Common.Color.wonderland_color.memeber_color;
            }
        };
        StageSceneFightInLeauge.prototype.converScreenPos = function (pos) {
            var screen_x = pos.x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var screen_y = pos.y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            return [screen_x, screen_y];
        };
        StageSceneFightInLeauge.prototype.converPetPos = function (pos) {
            var pet_x = pos.x - (this.moveDistance - this.x);
            var pet_y = pos.y - (this.verDistance - this.y);
            return [pet_x, pet_y];
        };
        StageSceneFightInLeauge.prototype.getMapPos = function () {
            var map_x = this.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var map_y = this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            return [map_x, map_y];
        };
        StageSceneFightInLeauge.prototype.convertMapPos = function (screenPos) {
            var map_x = screenPos.x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var map_y = screenPos.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            return [map_x, map_y];
        };
        StageSceneFightInLeauge.prototype.getCarryPet = function () {
            //当前是否携带宠物
            if (this.scenePosInfo.roleBase.petInfo == null) {
                return false;
            }
            var carry = zj.Table.FindFCall(this.scenePosInfo.roleBase.petInfo, function (_k, _v) {
                return _v.situtation == 1;
            }, this);
            return carry;
        };
        StageSceneFightInLeauge.prototype.setPlayerPet = function (pet) {
            this.playerPet = pet;
        };
        StageSceneFightInLeauge.prototype.joinView = function () {
            this.bInView = true;
            if (this.bHidden == true) {
                return;
            }
            this.setObjectVisible(true);
            var petJoinView = function (thisobj) {
                thisobj.playerPet.bInView = true;
                if (thisobj.playerPet.bHidden == true) {
                    return;
                }
                thisobj.playerPet.setObjectVisible(true);
            };
            if (this.playerPet == null) {
                var carry = this.getCarryPet();
                if (carry) {
                    this.curScene.addmemberPet(this);
                }
            }
            else {
                petJoinView(this);
            }
        };
        StageSceneFightInLeauge.prototype.leaveView = function () {
            this.bInView = false;
            this.setObjectVisible(false);
            if (this.commonLedAni != null) {
                this.commonLedAni.setVisibleSpx(false);
            }
            this.leaveControl();
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            if (this.playerPet != null) {
                this.playerPet.bInView = false;
                this.playerPet.setObjectVisible(false);
            }
        };
        return StageSceneFightInLeauge;
    }(zj.StageScenePersonPath));
    zj.StageSceneFightInLeauge = StageSceneFightInLeauge;
    __reflect(StageSceneFightInLeauge.prototype, "zj.StageSceneFightInLeauge");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightInLeauge.js.map