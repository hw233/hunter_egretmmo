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
    var StageScenePlayerPet = (function (_super) {
        __extends(StageScenePlayerPet, _super);
        function StageScenePlayerPet(node, order) {
            var _this = _super.call(this, node, order) || this;
            // 宠物相关
            _this.petBody = null;
            _this.petScale = 0.4;
            _this.personStandTime = 0;
            _this.petWanderAngle = 0;
            _this.petWanderTime = 0;
            _this.petWanderStopTime = 0;
            // show
            _this.ttfName = null;
            _this.nameColor = null;
            _this.name = null;
            _this.aniUpOffsetX = 0;
            _this.aniUpOffsetY = 0;
            // bool
            _this.bInView = true;
            _this.bRevived = false;
            _this.bHidden = false;
            _this.petSpeed = 0.35;
            _this.gapW = 110;
            _this.gapH = 1;
            _this.turnW = 30;
            _this.lastFlip = null;
            _this.nowFlip = -1;
            _this.actionId = -1;
            _this.state = zj.TableEnum.TableEnumBaseState.State_None;
            _this.bCarryed = false;
            _this.speedRate = 0.95;
            return _this;
        }
        StageScenePlayerPet.prototype.resetMoveData = function () {
            this.a_speedX = zj.ConstantConfig_Rpg.PetMove.AX;
            this.a_speedY = zj.ConstantConfig_Rpg.PetMove.AY;
            this.a_time = zj.ConstantConfig_Rpg.PetMove.CONTINUE_TIME;
            this.v_speedX = zj.ConstantConfig_Rpg.PetMove.VX;
            this.v_speedY = zj.ConstantConfig_Rpg.PetMove.VY;
        };
        StageScenePlayerPet.prototype.release = function () {
            _super.prototype.release.call(this);
            this.master = null;
            if (this.petBody) {
                this.petBody.clearSpine();
                this.petBody = null;
            }
        };
        StageScenePlayerPet.prototype.createPlayerPet = function (master, x, y, dir) {
            // body
            this.setPetMaster(master);
            this.carryPetInfo = null;
            // 宠物层
            this.nodePet = new eui.Group();
            this.nodePos.addChild(this.nodePet);
            this.nodeDown = new eui.Group();
            this.nodePos.addChild(this.nodeDown);
            this.init();
            this.setTitlePos(0, 0);
            //this.changeDir(dir)
            this.setFirstPetPos();
            this.procState(0);
            this.bInZone = true;
            this.maxSpeedX = master.moveSpeedX || 0.35;
            this.maxSpeedY = master.moveSpeedY;
            this.currMoveSpeedX = 0;
            this.currMoveSpeedY = 0;
            this.resetMoveData();
        };
        StageScenePlayerPet.prototype.init = function () {
            this.getCarryPetInfo();
            this.parseInfo();
            this.loadPet();
            if (this.bCarryed) {
                this.loadScale();
            }
            this.loadNameTitle();
        };
        //设置主人
        StageScenePlayerPet.prototype.setPetMaster = function (master) {
            this.master = master;
        };
        //maproleId 和 宠物名字
        StageScenePlayerPet.prototype.parseInfo = function () {
            if (this.bCarryed) {
                this.spineId = zj.Adviserdb.GetPetEvolution(this.carryPetInfo.pet_id, this.carryPetInfo);
            }
            else {
                this.spineId = -1;
            }
            this.name = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_own, this.master.playerInfo.name);
        };
        //宠物形象
        StageScenePlayerPet.prototype.loadPet = function () {
            var _this = this;
            if (!this.bCarryed) {
                this.nodePet.visible = false;
                this.nodeDown.visible = false;
                return;
            }
            if (this.spineId == -1) {
                return;
            }
            if (this.petBody) {
                this.petBody.clearSpine();
                this.petBody = null;
            }
            this.nodePet.visible = true;
            this.nodeDown.visible = true;
            var item = zj.TableClientAniSpineSource.Item(this.spineId);
            this.petBody = zj.HunterSpineX(this.spineId, this.petScale, null, item.json)[0];
            if (!this.petBody) {
                this.petBody = zj.HunterSpineX(0, this.petScale, null, zj.MapSceneLoading.BlackRole)[0];
                zj.Game.DragonBonesManager.preloadDragonbone(zj.StageSceneManager.Instance.temporaryScene, item.json)
                    .then(function () {
                    if (_this.petBody) {
                        _this.petBody.clearSpine();
                        _this.petBody = null;
                    }
                    _this.petBody = zj.HunterSpineX(_this.spineId, _this.petScale, null, item.json)[0];
                    _this.nodeNormal.addChild(_this.petBody.spine);
                    _this.actionId = -1;
                    _this.petBody.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
                    _this.titlePos();
                })
                    .catch(function (error) {
                });
            }
            this.petBody.ChangeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Stand, item.json);
            this.nodePet.addChild(this.petBody.spine);
            this.loadSlots();
        };
        //是否被携带
        StageScenePlayerPet.prototype.getCarryPetInfo = function () {
            var petInfo = this.master.scenePosInfo.roleBase.petInfo;
            this.bCarryed = false;
            this.carryPetInfo = null;
            for (var k in petInfo) {
                var v = petInfo[k];
                if (v.situtation == 1) {
                    this.carryPetInfo = v;
                    this.bCarryed = true;
                    return;
                }
            }
        };
        StageScenePlayerPet.prototype.resetPetBody = function (petInfo) {
            this.setCarryPetInfo(petInfo);
            this.getCarryPetInfo();
            this.parseInfo();
            this.loadPet();
            if (this.bCarryed) {
                this.loadScale();
            }
            this.resetName();
            this.setTitlePos(0, 0);
        };
        //宠物信息
        StageScenePlayerPet.prototype.setCarryPetInfo = function (petInfo) {
            this.carryPetInfo = petInfo;
        };
        StageScenePlayerPet.prototype.loadNameTitle = function () {
            this.ttfName = new eui.Label(this.name);
            this.ttfName.size = 20;
            this.ttfName.bold = true;
            var _color = this.getNameColor();
            this.nameColor = _color;
            this.ttfName.textColor = _color;
            this.ttfName.anchorOffsetY = this.ttfName.height;
            this.nodePet.addChild(this.ttfName);
        };
        StageScenePlayerPet.prototype.resetName = function () {
            if (this.ttfName != null) {
                this.ttfName.text = this.name;
            }
        };
        //宠物身高
        StageScenePlayerPet.prototype.loadScale = function () {
            var bone_up_x = this.petBody.spine.armature.getBone("buff_up").global.x;
            var bone_up_y = this.petBody.spine.armature.getBone("buff_up").global.y;
            this.bodyHeight = this.petScale * bone_up_y;
            this.aniUpOffsetY = this.bodyHeight + 10;
            this.bodyWidth = this.petScale * this.bodyWidth;
        };
        StageScenePlayerPet.prototype.Update = function (tick) {
            if (!this.bCarryed) {
                return;
            }
            this.updateZone();
            this.procState(tick);
            this.updatePetPos(tick);
            // 设置宠物面向
            this.updatePetAspect(tick);
            this.flashOrder();
            this.updatePetSpineAction();
        };
        StageScenePlayerPet.prototype.updatePetSpineAction = function () {
            if ((!this.bCarryed) ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                return;
            }
            if (this.state == zj.TableEnum.TableEnumBaseState.State_None) {
                this.changeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Stand);
            }
            else if (this.state == zj.TableEnum.TableEnumBaseState.State_Walk) {
                this.changeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Run);
            }
        };
        StageScenePlayerPet.prototype.procSpeed = function (tick) {
            var rt = tick * 1000;
            if (this.a_time > 0) {
                var tmpAccTime = rt;
                this.a_time = this.a_time - rt;
                if (this.a_time < 0) {
                    tmpAccTime = tmpAccTime + this.a_time;
                }
                this.v_speedX = this.v_speedX + this.a_speedX * tmpAccTime;
                this.v_speedY = this.v_speedY + this.a_speedY * tmpAccTime;
            }
            this.currMoveSpeedX = zj.yuan3(this.v_speedX > this.maxSpeedX, this.maxSpeedX, this.v_speedX);
            this.currMoveSpeedY = zj.yuan3(this.v_speedY > this.maxSpeedY, this.maxSpeedY, this.v_speedY);
        };
        //宠物面向及走位
        StageScenePlayerPet.prototype.updatePetAspect = function (tick) {
            if (this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirDown ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown ||
                this.master.otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                //基类操作
                this.updateOtherFightPos();
                return;
            }
            this.procSpeed(tick);
            this.changeAction();
            var masterSpeed = this.currMoveSpeedX;
            var masterAddSpeed = this.master.faster_ratio || 1;
            this.petSpeed = masterSpeed * masterAddSpeed * this.speedRate;
            var diff = Math.abs(this.moveDistance - this.master.moveDistance);
            var sp = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Left, -1, 1);
            var delay = sp * this.petSpeed * tick * 1000;
            var mapLength = this.curScene.mapWidth;
            var sp1 = zj.yuan3(this.master.dir == zj.TableEnum.TableEnumDir.Dir_Left, 1, -1);
            if (this.master.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                var diff_tmp = Math.abs(this.x - (this.master.x + this.gapW));
                if (this.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                    if (this.master.x + this.gapW <= this.x) {
                        this.moveDistance = this.moveDistance - Math.abs(delay);
                        if (Math.abs(this.moveDistance - this.master.moveDistance) < this.gapW) {
                            this.moveDistance = this.master.moveDistance + this.gapW;
                        }
                    }
                    else {
                        this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
                        this.moveDistance = this.moveDistance + Math.abs(delay);
                        if (this.x > this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.dir = zj.TableEnum.TableEnumDir.Dir_Left;
                            this.moveDistance = this.master.moveDistance + this.gapW;
                        }
                    }
                }
                else if (this.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                    if (this.master.x + this.gapW >= this.x) {
                        this.moveDistance = this.moveDistance + Math.abs(delay);
                        if (this.x > this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.dir = zj.TableEnum.TableEnumDir.Dir_Left;
                            this.moveDistance = this.master.moveDistance + this.gapW;
                        }
                    }
                    else {
                        this.dir = zj.TableEnum.TableEnumDir.Dir_Left;
                        if (Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.moveDistance = this.moveDistance - Math.abs(delay);
                        }
                    }
                }
            }
            else if (this.master.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                if (this.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                    if (this.master.x - this.gapW >= this.x) {
                        this.moveDistance = this.moveDistance + Math.abs(delay);
                        if (Math.abs(this.moveDistance - this.master.moveDistance) < this.gapW) {
                            this.moveDistance = this.master.moveDistance - this.gapW;
                        }
                    }
                    else {
                        this.dir = zj.TableEnum.TableEnumDir.Dir_Left;
                        this.moveDistance = this.moveDistance - Math.abs(delay);
                        if (this.x < this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
                            this.moveDistance = this.master.moveDistance - this.gapW;
                        }
                    }
                }
                else if (this.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                    if (this.master.x - this.gapW <= this.x) {
                        this.moveDistance = this.moveDistance - Math.abs(delay);
                        if (this.x < this.master.x && Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
                            this.moveDistance = this.master.moveDistance - this.gapW;
                        }
                    }
                    else {
                        this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
                        if (Math.abs(this.moveDistance - this.master.moveDistance) > this.gapW) {
                            this.moveDistance = this.moveDistance + Math.abs(delay);
                        }
                    }
                }
            }
            var dealyV = this.currMoveSpeedY * masterAddSpeed * tick * 1000;
            var diffV = Math.abs(this.y - (this.master.y + this.gapH));
            if (this.master.verDistance + this.gapH < this.verDistance) {
                this.verDistance = this.verDistance - Math.abs(dealyV);
                if (Math.abs(this.verDistance - this.master.verDistance) <= this.gapH) {
                    this.verDistance = this.master.verDistance + this.gapH;
                }
            }
            else if (this.master.verDistance + this.gapH > this.verDistance) {
                this.verDistance = this.verDistance + Math.abs(dealyV);
                if (this.verDistance - this.master.verDistance >= this.gapH) {
                    this.verDistance = this.master.verDistance + this.gapH;
                }
            }
            var _a = this.master.converPetPos(new egret.Point(this.moveDistance, this.verDistance)), screen_x = _a[0], screen_y = _a[1];
            this.setPos(screen_x, screen_y);
            this.SetPetState();
        };
        StageScenePlayerPet.prototype.updateOtherFightPos = function () {
            this.setFightShowPos();
        };
        StageScenePlayerPet.prototype.changeOtherFightShowAtk = function () {
            this.state = zj.TableEnum.TableEnumBaseState.State_None;
            this.dir = this.master.fp_dir;
            this.changeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Skill);
            this.setFightShowPos();
        };
        StageScenePlayerPet.prototype.setFightShowPos = function () {
            var _a = [0, 0], x = _a[0], y = _a[1];
            if (this.master.fp_dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                x = this.master.fpX + (this.master.fpMoveDistance - this.curScene.playerLeader.moveDistance) + this.gapW;
                y = this.master.fpY + (this.master.fpVerDistance - this.curScene.playerLeader.verDistance) + this.gapH;
            }
            else if (this.master.fp_dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                x = this.master.fpX + (this.master.fpMoveDistance - this.curScene.playerLeader.moveDistance) - this.gapW;
                y = this.master.fpY + (this.master.fpVerDistance - this.curScene.playerLeader.verDistance) + this.gapH;
            }
            this.setPos(x, y);
        };
        StageScenePlayerPet.prototype.changeOtherDie = function () {
            this.changeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Cry);
        };
        StageScenePlayerPet.prototype.changeOtherGetUp = function () {
            this.changeAction(zj.TableEnum.TableEnumPetOtherState.OtherState_Stand);
            this.setFirstPetPos();
        };
        StageScenePlayerPet.prototype.procState = function (tick) {
            var tag;
            if (this.master.state == zj.TableEnum.TableEnumBaseState.State_None) {
                tag = this.procStateNone(tick);
            }
            else if (this.master.state == zj.TableEnum.TableEnumBaseState.State_Walk) {
                this.personStandTime = 0;
                this.petWanderTime = 0;
                this.petWanderStopTime = 0;
            }
        };
        StageScenePlayerPet.prototype.changeAction = function (actionId) {
            var bFlipX = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Left, false, true);
            this.setFlipX(bFlipX);
            if (this.actionId == actionId || actionId == null) {
                return;
            }
            this.actionId = actionId;
            if (this.actionId == zj.TableEnum.TableEnumPetOtherState.OtherState_Run) {
                this.resetMoveData();
            }
            if (this.petBody != null) {
                this.petBody.ChangeAction(actionId);
            }
        };
        StageScenePlayerPet.prototype.setFlipX = function (flip) {
            if (this.petBody != null) {
                var coefficient = flip && 1 || -1;
                this.petBody.setScaleX(coefficient * this.petScale);
            }
        };
        StageScenePlayerPet.prototype.setFirstPetPos = function () {
            this.dir = this.master.dir;
            var sp = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Left, 1, -1);
            this.moveDistance = this.master.moveDistance + sp * this.gapW;
            this.verDistance = this.master.verDistance + this.gapH;
            this.changeAction();
            this.setPos(this.master.getPosX() + sp * this.gapW, this.master.getPosY() + this.gapH);
            this.SetPetState();
        };
        StageScenePlayerPet.prototype.updatePetPos = function (tick) {
        };
        StageScenePlayerPet.prototype.updateZone = function () {
        };
        StageScenePlayerPet.prototype.flashOrder = function () {
            // if self.bInZone == true then        
            // 	if self.saveOrder ~= self.master.saveOrder then
            // 		self.saveOrder = self.master.saveOrder
            // 		--self.nodeRoot:setLocalZOrder(self.saveOrder)
            // 		self.nodeRoot:setLocalZOrder(self.saveOrder)
            // 	end        
            // end
        };
        StageScenePlayerPet.prototype.getMapY = function () {
            return this.master.y - 1;
        };
        StageScenePlayerPet.prototype.procStateNone = function (tick) {
        };
        StageScenePlayerPet.prototype.SetPetState = function () {
            var diff = Math.abs(this.moveDistance - this.master.moveDistance);
            diff = Math.ceil(diff);
            if (diff > 110) {
                diff = 110;
            }
            if (diff == this.gapW && this.master.state != zj.TableEnum.TableEnumBaseState.State_Walk) {
                this.state = zj.TableEnum.TableEnumBaseState.State_None;
            }
            else {
                this.state = zj.TableEnum.TableEnumBaseState.State_Walk;
            }
        };
        StageScenePlayerPet.prototype.getNameColor = function () {
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
        return StageScenePlayerPet;
    }(zj.StageScenePlayer));
    zj.StageScenePlayerPet = StageScenePlayerPet;
    __reflect(StageScenePlayerPet.prototype, "zj.StageScenePlayerPet");
})(zj || (zj = {}));
//# sourceMappingURL=StageScenePlayerPet.js.map