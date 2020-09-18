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
    //联盟战斗主角
    var StageSceneFightLeader = (function (_super) {
        __extends(StageSceneFightLeader, _super);
        function StageSceneFightLeader(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.tiggerAreaEventTbl = [];
            _this.locationDown = new egret.Point();
            _this.thisPos = new egret.Point();
            _this.mapPos = new egret.Point();
            _this.location = new egret.Point();
            _this.touchUpPos = new egret.Point();
            _this.setPlayerState(zj.EnumPlayerState.PLAYER_STATE_FIGHT_LEADER);
            _this.moveTouchId = -1;
            _this.moveTouchPoint = new egret.Point(0, 0);
            _this.doThingsTag = false;
            _this.netFrame = 0;
            _this.netMax = zj.ConstantConfig_RoleBattle.SYNC_POS_MAX_TIME;
            _this.moveNetFrame = 0;
            _this.moveNetMax = zj.ConstantConfig_RoleBattle.MOVE_NET_MAX_TIME;
            _this.bossNetFrame = 0;
            _this.bossNetMax = zj.ConstantConfig_RoleBattle.BOSS_SYNC_MAX_TIME;
            _this.bFightAuto = false;
            _this.bCommonAtk = false;
            _this.bBombAtk = false;
            _this.nCommonAtkFrame = 0;
            _this.nBombAtkFrame = 0;
            _this.tiggerAreaEventTbl = [];
            return _this;
        }
        StageSceneFightLeader.prototype.resetMoveNet = function () {
            this.netFrame = 0;
        };
        StageSceneFightLeader.prototype.setFightAuto = function (tag) {
            this.bFightAuto = tag;
        };
        StageSceneFightLeader.prototype.startFightAuto = function () {
            this.setFightAuto(true);
        };
        StageSceneFightLeader.prototype.endFightAuto = function () {
            if (this.targetCB != null) {
                this.targetCB = null;
            }
            this.setFightAuto(false);
            this.curScene.dealFightUi(false);
        };
        StageSceneFightLeader.prototype.procBombTime = function (tick) {
            var rt = tick * 1000;
            this.bombLeftTime = this.bombLeftTime - rt;
            if (this.bombLeftTime <= 0) {
                this.bombLeftTime = 0;
            }
        };
        StageSceneFightLeader.prototype.procAutoFight = function (tick) {
            var cb = function () {
                this.bBombAtk = false;
            };
            var cb1 = function () {
                this.bCommonAtk = false;
            };
            if (this.bFightAuto == false) {
                return;
            }
            var rt = tick * 1000;
            if (this.bBombAtk == false) {
                if (this.bombLeftTime <= 0 && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    this.bBombAtk = true;
                    this.curScene.reqLeaderAttack(zj.TableEnum.Enum.ZorkSkill.Bomb, cb, true);
                }
            }
            else {
                this.nBombAtkFrame = this.nBombAtkFrame + rt;
                if (this.nBombAtkFrame >= zj.ConstantConfig_ZorkBoss.boss_attack_delay_atk) {
                    this.nBombAtkFrame = 0;
                    this.bBombAtk = false;
                }
            }
            if (this.bCommonAtk == false) {
                this.attackLeftTime = this.attackLeftTime - rt;
                if (this.attackLeftTime <= 0 && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    this.bCommonAtk = true;
                    this.curScene.reqLeaderAttack(zj.TableEnum.Enum.ZorkSkill.Attack, cb1, false);
                }
            }
            else {
                this.nCommonAtkFrame = this.nCommonAtkFrame + rt;
                if (this.nCommonAtkFrame >= zj.ConstantConfig_ZorkBoss.boss_attack_delay_atk) {
                    this.nCommonAtkFrame = 0;
                    this.bCommonAtk = false;
                }
            }
        };
        StageSceneFightLeader.prototype.isAgreeEnter = function () {
            return true;
        };
        StageSceneFightLeader.prototype.dealTips = function (type, value) {
            if (type == zj.TableEnum.Enum.SceneBuffType.Frozen) {
                this.curScene.mainMenu.dealBuffTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buff_tips_frozen, value));
            }
            else if (type == zj.TableEnum.Enum.SceneBuffType.Bomb) {
                this.curScene.mainMenu.dealBuffTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buff_tips_bomb, value));
            }
            else if (type == zj.TableEnum.Enum.SceneBuffType.Fast) {
                this.curScene.mainMenu.dealBuffTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buff_tips_fast, 50));
            }
            else if (type == zj.TableEnum.Enum.SceneBuffType.RecoverBlood) {
                this.curScene.mainMenu.dealBuffTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buff_tips_recover, value));
            }
            else if (type == zj.TableEnum.Enum.SceneBuffType.CollectDouble) {
                this.curScene.mainMenu.dealBuffTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buff_tips_collectDouble, value));
            }
        };
        StageSceneFightLeader.prototype.savePreDis = function (moveDis, verDis) {
            this.preMoveDis = moveDis;
            this.preVerDis = verDis;
        };
        StageSceneFightLeader.prototype.isNoMoveing = function () {
            var tag = true;
            if (this.preMoveDis != this.moveDistance || this.preVerDis != this.verDistance) {
                tag = false;
            }
            return tag;
        };
        StageSceneFightLeader.prototype.procSyncPos = function (tick) {
            var rt = tick * 1000;
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    this.netFrame = this.netFrame + rt;
                    if (this.netFrame >= this.netMax) {
                        this.netFrame = 0;
                        this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
                    }
                }
            }
            else {
                if (this.bProgressing == false && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    this.netFrame = this.netFrame + rt;
                }
                if (this.bProgressing == false && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None && this.netFrame >= this.netMax) {
                    this.netFrame = 0;
                    this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
                }
            }
        };
        StageSceneFightLeader.prototype.isCanTouchGround = function (x, y) {
            var map_x = x + (this.moveDistance - this.x);
            var map_y = y + (this.verDistance - this.y);
            return this.isCanPath(map_x, map_y);
        };
        StageSceneFightLeader.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procCooling(tick);
            this.procSyncPos(tick);
            this.procMoveNet(tick);
            this.proTriggerArea();
        };
        StageSceneFightLeader.prototype.procMoveNet = function (tick) {
            var rt = tick * 1000;
            this.moveNetFrame = this.moveNetFrame + rt;
        };
        StageSceneFightLeader.prototype.proTriggerArea = function () {
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                var eventTbl = this.tiggerAreaEventTbl;
                this.tiggerAreaEventTbl = this.curScene.dealTriggerAreaThings(this.x, this.y, eventTbl);
            }
        };
        StageSceneFightLeader.prototype.OnTouchDown = function (touchs) {
            this.OnTouchDownPos(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
        };
        StageSceneFightLeader.prototype.OnTouchDownPos = function (stageX, stageY) {
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None && this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                return;
            }
            if ((this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].finish == false)) {
                return;
            }
            var b_break = this.endProgress();
            if (b_break == true) {
                this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
                return;
            }
            // let arr = [stageX, stageY];
            // let tableSize = arr.length;
            // for (let i = 0; i < tableSize; i += 2) {
            var location = this.locationDown.setTo(stageX, stageY);
            this.moveTouchId = 0; //touchs[3] 
            this.moveTouchPoint = location;
            var doSomeThing = false;
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS ||
                this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
                this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                if (this.isValidEventDis(location.x, location.y) == true) {
                    doSomeThing = this.curScene.checkEventThings(location.x, location.y);
                    this.doThingsTag = doSomeThing;
                }
            }
            if (doSomeThing == true) {
                var _a = this.convertMapPos(location), map_x = _a[0], map_y = _a[1];
                this.changeDir(this.getClickDir(new egret.Point(map_x, map_y)));
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            else {
                this.touchMove(location, true, false);
            }
            // }
        };
        StageSceneFightLeader.prototype.touchMove = function (location, tag, bTip) {
            var endAutoFightAtk = function () {
                //点击的时候立马置为正常状态
                if (this.bFightAuto == true) {
                    this.endFightAuto();
                }
                if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                }
            };
            var _a = this.convertMapPos(location), map_x = _a[0], map_y = _a[1];
            if (this.isCanTouchGround(location.x, location.y)) {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    endAutoFightAtk();
                }
                this.startStarPath(location.x, location.y, null);
                if (this.curScene.sceneType != message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.moveNetFrame >= this.moveNetMax || tag == true) {
                        this.moveNetFrame = 0;
                        this.curScene.reqLeaderPos(map_x, map_y, null);
                    }
                }
            }
            else {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    endAutoFightAtk();
                }
                var key = zj.Helper.findNearCrossBlock(this.thisPos.setTo(this.moveDistance, this.verDistance), this.mapPos.setTo(map_x, map_y), this.curScene.blocks, this.curScene.Block_Width);
                var pos = this.curScene.blocks[key].pos;
                var _b = this.converScreenPos(pos), screen_x = _b[0], screen_y = _b[1];
                this.startStarPath(screen_x, screen_y, null);
                if (this.curScene.sceneType != message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.moveNetFrame >= this.moveNetMax || tag == true) {
                        this.moveNetFrame = 0;
                        this.curScene.reqLeaderPos(pos.x, pos.y, null);
                    }
                }
            }
        };
        StageSceneFightLeader.prototype.OnTouchMove = function (touchs) {
            this.OnTouchMovePos(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
        };
        StageSceneFightLeader.prototype.OnTouchMovePos = function (stageX, stageY) {
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                return;
            }
            if (this.moveTouchId == 0) {
                var x = stageX;
                var y = stageY;
                this.location.setTo(x, y);
                this.touchMove(this.location, false, false);
                if (this.doThingsTag == true) {
                    if (Math.abs(x - this.moveTouchPoint.x) >= 20 || Math.abs(y - this.moveTouchPoint.y) >= 20) {
                        this.doThingsTag = false;
                    }
                }
            }
            return false;
        };
        StageSceneFightLeader.prototype.OnTouchUp = function (touchs) {
            this.OnTouchUpPos(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
        };
        StageSceneFightLeader.prototype.OnTouchUpPos = function (stageX, stageY) {
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                return;
            }
            var location = null;
            if (this.moveTouchId == 0) {
                var x = stageX;
                var y = stageY;
                var _a = this.convertMapPos(this.touchUpPos.setTo(x, y)), map_x = _a[0], map_y = _a[1];
                var _b = this.curScene.getEventThings(x, y), _ = _b[0], needMove = _b[1];
                if (this.isCanTouchGround(x, y)) {
                    this.curScene.reqLeaderPos(map_x, map_y, null);
                }
                if (this.doThingsTag == true) {
                    this.curScene.dealEventThings(this.moveTouchPoint.x, this.moveTouchPoint.y);
                }
                this.moveTouchPoint = null;
                this.moveTouchId = -1;
                this.doThingsTag = false;
            }
        };
        StageSceneFightLeader.prototype.startStarPath = function (end_x, end_y, cb, thisobj) {
            // if (end_x <= 0) {
            // 	end_x = 0;
            // }
            this.setTargetCB(cb, thisobj);
            var beginPos = new egret.Point(this.moveDistance, this.verDistance);
            var endPos = new egret.Point(end_x + (this.moveDistance - this.x), end_y + (this.verDistance - this.y));
            if (endPos.x < 0) {
                endPos.x = 0;
            }
            // let beginPos = new egret.Point(this.moveDistance,this.verDistance );
            // let endPos = new egret.Point(end_x+(this.moveDistance-this.x), end_y+(this.verDistance - this.y));
            var path = zj.PathFinder.calculate(beginPos, endPos, this.curScene.blocks, false, this.path);
            this.path = path;
            if (this.path != null) {
                this.targetEndPoint = endPos;
                this.goToWalk();
            }
        };
        StageSceneFightLeader.prototype.convertMapPos = function (screenPos) {
            var map_x = screenPos.x + (this.moveDistance - this.x);
            var map_y = screenPos.y + (this.verDistance - this.y);
            return [map_x, map_y];
        };
        StageSceneFightLeader.prototype.converScreenPos = function (pos) {
            var screen_x = pos.x - (this.moveDistance - this.x);
            var screen_y = pos.y - (this.verDistance - this.y);
            return [screen_x, screen_y];
        };
        StageSceneFightLeader.prototype.converPetPos = function (pos) {
            var pet_x = pos.x - (this.moveDistance - this.x);
            var pet_y = pos.y - (this.verDistance - this.y);
            return [pet_x, pet_y];
        };
        StageSceneFightLeader.prototype.getMapPos = function () {
            return [this.moveDistance, this.verDistance];
        };
        StageSceneFightLeader.prototype.getNameColor = function () {
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                return zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            }
            else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                return zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            }
            else if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                return zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            }
        };
        StageSceneFightLeader.prototype.setPos = function (x, y) {
            _super.prototype.setPos.call(this, x, y);
        };
        StageSceneFightLeader.prototype.getMapY = function () {
            return this.verDistance;
        };
        StageSceneFightLeader.prototype.dealRevive = function () {
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE) {
                this.path = null;
                if (this.bFightAuto == true) {
                    this.endFightAuto();
                }
                this.curScene.proofLeaderPos(this.scenePosInfo.posItem);
            }
        };
        StageSceneFightLeader.prototype.isValidEventDis = function (x, y) {
            var tag = false;
            var point = new egret.Point(x, y);
            var center = new egret.Point(this.x, this.y - this.bodyHeight / 2);
            if (zj.Helper.isPointInCircle(point, center, zj.ConstantConfig_Rpg.EVENT_VALID_CIRCLE_RAD) == true) {
                tag = true;
            }
            return tag;
        };
        StageSceneFightLeader.prototype.endFightShow = function () {
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            if (this.showCB != null) {
                this.showCB();
                this.showCB = null;
            }
        };
        StageSceneFightLeader.prototype.startControl = function () {
            this.curScene.addCollectMenu(this.controlMaxFrame, this.controlType);
        };
        StageSceneFightLeader.prototype.endControl = function () {
            this.curScene.deleteCollectMenu();
        };
        StageSceneFightLeader.prototype.leaveControl = function () {
        };
        StageSceneFightLeader.prototype.dealDead = function () {
            if (zj.Gmgr.Instance.bInLoading == true) {
                if (this.sceneHpPercent == 0) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                }
            }
            else {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
                        this.path = null;
                        this.bRunAstar = false;
                        this.saveDir = zj.TableEnum.TableEnumDir.Dir_None;
                        this.walkDir = zj.TableEnum.EnumDepthDir.Dir_None;
                        //this.changeOtherState(TableEnumOtherState.OtherState_FallDown)
                        this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                        this.stirSpeedX = 0.2;
                        this.showY = this.y;
                        this.changeDir(zj.TableEnum.TableEnumDir.Dir_Right);
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                        this.endFightAuto();
                    }
                }
            }
        };
        StageSceneFightLeader.prototype.dealHurt = function () {
            if (zj.Gmgr.Instance.bInLoading == false) {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BOSS_HURTED || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
                        if (this.scenePosInfo.evil_value != 0 && this.uiHp != this.sceneHpPercent) {
                            this.dealHit(8001);
                            this.dealHurtValue(0, this.scenePosInfo.evil_value);
                        }
                    }
                }
            }
        };
        StageSceneFightLeader.prototype.setPlayerPet = function (pet) {
            this.playerPet = pet;
        };
        return StageSceneFightLeader;
    }(zj.StageScenePersonPath));
    zj.StageSceneFightLeader = StageSceneFightLeader;
    __reflect(StageSceneFightLeader.prototype, "zj.StageSceneFightLeader");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightLeader.js.map