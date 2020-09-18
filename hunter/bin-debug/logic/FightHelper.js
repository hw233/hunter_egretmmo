var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var FightHelper = (function () {
        function FightHelper() {
        }
        FightHelper.getSpineRect = function (spine, name) {
            var pz = name + "_pz";
            var pzSlot = spine.armature.getSlot(pz);
            if (!pzSlot || pzSlot.display == null) {
                this.rc.x = 0;
                this.rc.y = 0;
                this.rc.width = 0;
                this.rc.height = 0;
                return this.rc;
            }
            var rootScaleX = 1; //root上不能有信息 现在这个没用了，就默认1
            var rootScaleY = 1;
            var rootParent;
            var rootRotation = 0;
            rootParent = pzSlot.parent;
            for (var i = 0; i < 10; i++) {
                if (rootParent) {
                    if (rootParent.name == "fuji") {
                        rootScaleX = rootParent.global.scaleX;
                        rootScaleY = rootParent.global.scaleY;
                        rootRotation = rootParent.global.rotation * (180 / Math.PI);
                    }
                    rootParent = rootParent.parent;
                    if (rootParent && rootParent.name == "root") {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            var angBone = pzSlot.parent.global.rotation * (180 / Math.PI);
            var angSlot = pzSlot.global.rotation * (180 / Math.PI);
            if (angBone > 0 && angBone <= 10) {
                angBone = 0;
            }
            if (angSlot < 0 && angSlot >= -10) {
                angSlot = 0;
            }
            var radioX = 0;
            var radioY = 0;
            var pzSlotdisplayW = pzSlot.display.width;
            var pzSlotdisplayH = pzSlot.display.height;
            var pzSlotglobalScaleX = pzSlot.global.scaleX;
            var pzSlotglobalScaleY = pzSlot.global.scaleY;
            var parentglobalScaleX = pzSlot.parent.global.scaleX;
            var parentglobalScaleY = pzSlot.parent.global.scaleY;
            rootRotation = rootRotation >= 0 ? Math.floor(rootRotation) : Math.ceil(rootRotation);
            if (rootRotation > 0) {
                angBone = rootRotation;
            }
            angBone = angBone >= 0 ? Math.floor(angBone) : Math.ceil(angBone);
            angSlot = angSlot >= 0 ? Math.floor(angSlot) : Math.ceil(angSlot);
            if ((angBone + angSlot + rootRotation) % 180 != 0) {
                _a = [pzSlot.display.height, pzSlot.display.width], pzSlotdisplayW = _a[0], pzSlotdisplayH = _a[1];
                _b = [pzSlot.global.scaleY, pzSlot.global.scaleX], pzSlotglobalScaleX = _b[0], pzSlotglobalScaleY = _b[1];
                _c = [pzSlot.parent.global.scaleY, pzSlot.parent.global.scaleX], parentglobalScaleX = _c[0], parentglobalScaleY = _c[1];
                _d = [rootScaleY, rootScaleX], rootScaleX = _d[0], rootScaleY = _d[1];
            }
            var standX = pzSlot.parent.global.x;
            var standY = pzSlot.parent.global.y;
            switch (angBone) {
                case 0:
                    radioX = standX + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
                case 90:
                    // standX = pzSlot.parent.global.y * -1;
                    // standY = pzSlot.parent.global.x * -1;
                    radioX = standX - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case -90:
                    // standX = pzSlot.parent.global.y //+ pzSlot.parent.global.y;
                    // standY = pzSlot.parent.global.x //+ pzSlot.parent.global.x;
                    radioX = standX + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case 180:
                    radioX = standX - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
            }
            var worldPoint = spine.armature.display.localToGlobal(radioX, radioY, this.pzPoint);
            worldPoint.x -= zj.Game.UIManager.x;
            this.rc.width = pzSlotdisplayW * pzSlotglobalScaleX * parentglobalScaleX * rootScaleX; //这两句是龙骨里面最终的大小
            this.rc.height = pzSlotdisplayH * pzSlotglobalScaleY * parentglobalScaleY * rootScaleY;
            this.rc.width = this.rc.width * spine.scaleY; // * StageSceneManager.Instance.GetCurScene().uiScale;
            this.rc.height = this.rc.height * spine.scaleY; // * StageSceneManager.Instance.GetCurScene().uiScaleY;//这两句是龙骨到游戏里最终的大小
            this.rc.x = worldPoint.x - this.rc.width / 2;
            this.rc.y = worldPoint.y - this.rc.height / 2;
            return this.rc;
            var _a, _b, _c, _d;
        };
        FightHelper.FIGHT_ASSISTANCE_IDX = 4;
        FightHelper.FIGHT_ASSISTANCE = 102; // 援护
        FightHelper.rc = new egret.Rectangle();
        FightHelper.pzPoint = new egret.Point();
        return FightHelper;
    }());
    zj.FightHelper = FightHelper;
    __reflect(FightHelper.prototype, "zj.FightHelper");
    // 战斗辅助类
    // Lilou
    // 2018-12-10
    // 辅助函数
    function adjustIndex(index) {
        return index - 1;
    }
    zj.adjustIndex = adjustIndex;
    function CC_SAFE_DELETE(instance) {
        if (instance != null) {
            instance.release();
            instance = null;
        }
    }
    zj.CC_SAFE_DELETE = CC_SAFE_DELETE;
    function isCanUseVec(t) {
        if (t == null)
            return false;
        var s = t.length;
        if (s == 0)
            return false;
        if (s == 1 && s[0] == -1)
            return false;
        return true;
    }
    zj.isCanUseVec = isCanUseVec;
    function booln(num) {
        return num > 0;
    }
    zj.booln = booln;
    function yuan3(condition, param1, param2) {
        if (condition == true) {
            return param1;
        }
        else
            return param2;
    }
    zj.yuan3 = yuan3;
    function getBoolean(number) {
        return number > 0 ? true : false;
    }
    zj.getBoolean = getBoolean;
    function turnBool(b) {
        return b != true;
    }
    zj.turnBool = turnBool;
    function createAiSpeedRoleInfo(id, bEnemy, bSupport, speed, pressCd, _bSupport, pos) {
        var info = { id: id, bEnemy: bEnemy, bSupport: bSupport, speed: speed, ext: 0 * 100000 + speed * 1000 + (5 - pos) * 10 + yuan3(bEnemy == false, 1, 0) };
        info.id = id;
        info.bEnemy = bEnemy;
        info.bSupport = bSupport;
        info.speed = speed;
        var tmp = 0;
        if (pressCd != null) {
            //tmp =  math.abs( pressCd.overflow/1000 )     
        }
        // + yuan3(bSupport == true, 4, 2)
        return info;
    }
    zj.createAiSpeedRoleInfo = createAiSpeedRoleInfo;
    function isPointInCircle(point, center, r) {
        var tag = false;
        var px1 = point.x;
        var py1 = point.y;
        var px2 = center.x;
        var py2 = center.y;
        var x = px1 - px2;
        var y = py1 - py2;
        var xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (xie <= r) {
            tag = true;
        }
        return tag;
    }
    zj.isPointInCircle = isPointInCircle;
    function getSpineIsCollision(left, right) {
        // let aa = right.getRect();
        // let bb = left.getRect();
        //console.log("leftname:"+left.name+"left:x"+bb.x,"left:y"+bb.y,"left:width"+bb.width,"left:height"+bb.height);
        //console.log("rightname:"+right.name+"right:x"+aa.x,"right:y"+aa.y,"right:width"+aa.width,"right:height"+aa.height);
        var boo = left.getRect().intersects(right.getRect());
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ______"+boo);
        return boo;
    }
    zj.getSpineIsCollision = getSpineIsCollision;
    function adaptRoleY(y) {
        // body
        var ww = zj.UIManager.StageWidth;
        var aa = y / (zj.UIManager.StageWidth / 960);
        return Math.floor(y / (960 / 960));
    }
    zj.adaptRoleY = adaptRoleY;
    function fromGeneral(id, transferLevel) {
        // if (ckid(id)) {
        //     return null;
        // }
        // let mpr = PlayerHunterSystem.Table(id);
        // if (ckid(mpr)) {
        //     return null;
        // }
        // let mprID = mpr.general_roleId;
        // if (ckid(mprID)) {
        //     return null;
        // }
        // return TableMapRole.Item(mprID);
        if (ckid(id))
            return null;
        var gnd = zj.Game.PlayerHunterSystem.queryHunter(id);
        var mpr = zj.Game.PlayerHunterSystem.Table(id, transferLevel || (gnd != null && gnd.transfer_level));
        if (ckid(mpr))
            return null;
        // let mprID = (transferLevel != null || gnd != null) ? mpr.transfer_role : mpr.general_roleId;
        var mprID = (transferLevel != null || gnd != null) && mpr.transfer_role || mpr.general_roleId;
        if (ckid(mprID))
            return null;
        return zj.TableMapRole.Item(mprID);
    }
    zj.fromGeneral = fromGeneral;
    function getPercentSize(size, percent) {
        return { width: size.width * percent, height: size.height };
    }
    zj.getPercentSize = getPercentSize;
    // 兼容cocos动画的接口类
    var Spx = (function () {
        function Spx() {
            this.bInit = false;
            this.name = "";
            this.spine = null;
            this.bLoop = true;
            this.actionId = 0;
            this.scale = 1;
            this.rc = new egret.Rectangle();
            this.pzPoint = new egret.Point();
        }
        Spx.prototype.attachDisplay = function (display) {
            this.spine = display;
        };
        Spx.prototype.setVisibleSpx = function (bVisible) {
            this.spine.visible = bVisible;
        };
        Spx.prototype.getPositionX = function () {
            return this.spine.x;
        };
        Spx.prototype.getPositionY = function () {
            return this.spine.y;
        };
        Spx.prototype.SetPosition = function (x, y) {
            this.spine.x = x;
            this.spine.y = y;
        };
        //设置混合模式
        Spx.prototype.setBlendAdditive = function (blend) {
            if (blend) {
                this.spine.blendMode = egret.BlendMode.ADD;
            }
            else {
                this.spine.blendMode = "";
            }
        };
        Spx.prototype.isVisible = function () {
            return this.spine.visible;
        };
        Spx.prototype.setSpeedScale = function (playSpeed) {
            this.spine.animation.timeScale = playSpeed;
        };
        Spx.prototype.setScaleX = function (scaleX) {
            this.spine.scaleX = scaleX;
        };
        Spx.prototype.setFlipX = function (bFlip) {
            this.isScale = bFlip;
            var scalex = this.scale;
            this.spine.scaleX = (bFlip ? -scalex : scalex);
        };
        /***是否循环 */
        Spx.prototype.SetLoop = function (bLoop) {
            this.bLoop = bLoop;
        };
        Spx.prototype.setOpacity = function (trans) {
            this.spine.alpha = trans;
        };
        Spx.prototype.stopAllActions = function () {
            this.spine.animation.stop();
        };
        Spx.prototype.clearSpine = function () {
            if (this.spine && this.spine.parent) {
                this.spine.parent.removeChild(this.spine);
                this.spine.animation.reset();
                this.stopAllActions();
                // this.spine.armature.dispose();
                // this.spine.dbClear();
                //this.spine.dispose(true);
                // this.spine = null;
            }
            zj.dragonBonesPool.getInstance().returnItem(this.name, this);
        };
        Spx.prototype.ChangeAction = function (spxActionId) {
            this.actionId = spxActionId;
            var names = this.spine.animation.animationNames;
            for (var i = 0; i < names.length; i++) {
                if (this.actionId == i) {
                    this.playerName = names[i];
                    this.spineState = this.spine.animation.play(names[i], this.bLoop ? 0 : 1);
                    // egret.setTimeout(() => { this.spine.animation.play(names[i], 0); }, this, 1000);
                    break;
                }
            }
        };
        /**播放指定名字动画 */
        Spx.prototype.ChangeAnimation = function (name) {
            var names = this.spine.animation.animationNames;
            for (var i = 0; i < names.length; i++) {
                if (names[i] == name) {
                    this.actionId = i;
                    this.playerName = names[i];
                    this.spineState = this.spine.animation.play(this.playerName, this.bLoop ? 0 : 1);
                    // egret.setTimeout(() => { this.spine.animation.play(this.playerName, 0) }, this, 1000);
                }
            }
        };
        Spx.prototype.GetCurFrm = function () {
            if (this.spineState.animationData) {
                return this.spineState.animationData.frameCount * (this.spineState.currentTime / this.spineState.totalTime);
            }
            else {
                return 0;
            }
        };
        // 是否帧变化
        Spx.prototype.isLoopChange = function () {
            return this.bLoop;
        };
        Spx.prototype.UpdataAni = function (tick) {
            //
        };
        Spx.prototype.Stop = function () {
            this.spine.animation.stop();
        };
        Spx.prototype.SetAutoUpdate = function (bUpdate) {
            //
        };
        Spx.prototype.GetPosX = function () {
            return this.spine.x;
        };
        Spx.prototype.GetPosY = function () {
            return this.spine.y;
        };
        Spx.prototype.IsActEnd = function () {
            return this.spine.animation.isCompleted;
        };
        Spx.prototype.resume = function () {
            //
            if (this.spineState) {
                this.spineState.play();
            }
        };
        Spx.prototype.Pause = function () {
            //
            if (this.spineState) {
                this.spineState.stop();
            }
        };
        Spx.prototype.setRotation = function (rotation) {
            this.spine.rotation = rotation;
        };
        Spx.prototype.init = function () {
            if (this.spine) {
                this.lastFrame = -1;
            }
        };
        Spx.prototype.getRect = function () {
            var pz = this.name + "_pz";
            var pzSlot = this.spine.armature.getSlot(pz);
            if (!pzSlot || pzSlot.display == null) {
                this.rc.x = 0;
                this.rc.y = 0;
                this.rc.width = 0;
                this.rc.height = 0;
                return this.rc;
            }
            var rootScaleX = 1; //root上不能有信息 现在这个没用了，就默认1
            var rootScaleY = 1;
            var rootParent;
            var rootRotation = 0;
            rootParent = pzSlot.parent;
            for (var i = 0; i < 10; i++) {
                if (rootParent) {
                    if (rootParent.name == "fuji") {
                        rootScaleX = rootParent.global.scaleX;
                        rootScaleY = rootParent.global.scaleY;
                        rootRotation = rootParent.global.rotation * (180 / Math.PI);
                    }
                    rootParent = rootParent.parent;
                    if (rootParent && rootParent.name == "root") {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            var angBone = pzSlot.parent.global.rotation * (180 / Math.PI);
            var angSlot = pzSlot.global.rotation * (180 / Math.PI);
            if (angBone > 0 && angBone <= 10) {
                angBone = 0;
            }
            if (angSlot < 0 && angSlot >= -10) {
                angSlot = 0;
            }
            var radioX = 0;
            var radioY = 0;
            var pzSlotdisplayW = pzSlot.display.width;
            var pzSlotdisplayH = pzSlot.display.height;
            var pzSlotglobalScaleX = pzSlot.global.scaleX;
            var pzSlotglobalScaleY = pzSlot.global.scaleY;
            var parentglobalScaleX = pzSlot.parent.global.scaleX;
            var parentglobalScaleY = pzSlot.parent.global.scaleY;
            rootRotation = rootRotation >= 0 ? Math.floor(rootRotation) : Math.ceil(rootRotation);
            if (rootRotation > 0) {
                angBone = rootRotation;
            }
            angBone = angBone >= 0 ? Math.floor(angBone) : Math.ceil(angBone);
            angSlot = angSlot >= 0 ? Math.floor(angSlot) : Math.ceil(angSlot);
            if ((angBone + angSlot + rootRotation) % 180 != 0) {
                _a = [pzSlot.display.height, pzSlot.display.width], pzSlotdisplayW = _a[0], pzSlotdisplayH = _a[1];
                _b = [pzSlot.global.scaleY, pzSlot.global.scaleX], pzSlotglobalScaleX = _b[0], pzSlotglobalScaleY = _b[1];
                _c = [pzSlot.parent.global.scaleY, pzSlot.parent.global.scaleX], parentglobalScaleX = _c[0], parentglobalScaleY = _c[1];
                _d = [rootScaleY, rootScaleX], rootScaleX = _d[0], rootScaleY = _d[1];
            }
            var standX = pzSlot.parent.global.x;
            var standY = pzSlot.parent.global.y;
            switch (angBone) {
                case 0:
                    radioX = standX + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
                case 90:
                    // standX = pzSlot.parent.global.y * -1;
                    // standY = pzSlot.parent.global.x * -1;
                    radioX = standX - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case -90:
                    // standX = pzSlot.parent.global.y //+ pzSlot.parent.global.y;
                    // standY = pzSlot.parent.global.x //+ pzSlot.parent.global.x;
                    radioX = standX + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case 180:
                    radioX = standX - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
            }
            var worldPoint = this.spine.armature.display.localToGlobal(radioX, radioY, this.pzPoint);
            worldPoint.x -= zj.Game.UIManager.x;
            this.rc.width = pzSlotdisplayW * pzSlotglobalScaleX * parentglobalScaleX * rootScaleX; //这两句是龙骨里面最终的大小
            this.rc.height = pzSlotdisplayH * pzSlotglobalScaleY * parentglobalScaleY * rootScaleY;
            this.rc.width = this.rc.width * this.spine.scaleY; // * StageSceneManager.Instance.GetCurScene().uiScale;
            this.rc.height = this.rc.height * this.spine.scaleY; // * StageSceneManager.Instance.GetCurScene().uiScaleY;//这两句是龙骨到游戏里最终的大小
            this.rc.x = worldPoint.x - this.rc.width / 2;
            this.rc.y = worldPoint.y - this.rc.height / 2;
            return this.rc;
            var _a, _b, _c, _d;
        };
        // public getRect() {
        //     let temp = this.spine.animation.getStates()[0];
        //     let timeDis = 1 / temp.animationData.frameCount;// 每帧间隔时间
        //     let currTime = temp.currentTime;// 骨骼动画当前已播放的时间
        //     let frameIdx = Math.floor(currTime / timeDis);// 动画当前播放的帧索引
        //     if(frameIdx == this.lastFrame){
        //         return this.rc;
        //     } 
        //     else if(frameIdx - this.lastFrame > 1){// 如果跳帧，则检测前N帧的碰撞
        //         this.rc = FightHelper.getSpineRect(this.spine, this.name);
        //         for(let i = this.lastFrame + 1; i < frameIdx; ++i){
        //             temp.currentTime = (i + 0.5) * timeDis;
        //             this.spine.armature.advanceTime(0);
        //             this.updateRect(this.rc, FightHelper.getSpineRect(this.spine, this.name));
        //         }
        //         temp.currentTime = currTime;
        //         this.spine.armature.advanceTime(0);
        //         this.lastFrame = frameIdx;
        //         return this.rc;
        //     }
        //     this.lastFrame = frameIdx;
        //     let rect = FightHelper.getSpineRect(this.spine, this.name);
        //     this.rc.setTo(rect.x,rect.y,rect.width,rect.height);
        //     return this.rc;
        // }
        Spx.prototype.updateRect = function (rectMy, rect) {
            if (rect.width != 0 && rect.height != 0) {
                if (rectMy.width != 0 && rectMy.height != 0) {
                    rectMy.left = Math.min(rectMy.left, rect.left);
                    rectMy.top = Math.min(rectMy.top, rect.top);
                    rectMy.right = Math.max(rectMy.right, rect.right);
                    rectMy.bottom = Math.max(rectMy.bottom, rect.bottom);
                }
                else {
                    rectMy.setTo(rect.x, rect.y, rect.width, rect.height);
                }
            }
        };
        Spx.prototype.SetScale = function (scale) {
            this.scale = scale;
            this.spine.scaleX = this.scale;
            this.spine.scaleY = this.scale;
            this.setFlipX(this.isScale);
        };
        return Spx;
    }());
    zj.Spx = Spx;
    __reflect(Spx.prototype, "zj.Spx");
    // 返回spine
    function HunterSpineX(spineId, scale, armatureName, spineName, isPool, ui) {
        if (scale === void 0) { scale = 1; }
        if (isPool === void 0) { isPool = true; }
        if (ui === void 0) { ui = null; }
        var spineTable = zj.TableClientFightAniSpineSource.Item(spineId);
        var dbName = "";
        if (spineTable && spineName == null) {
            dbName = spineTable.json;
        }
        else {
            dbName = spineName;
        }
        // if (dbName == "gw_019_shoushuishou") {
        //     let aaaa;
        // }
        var spx;
        var order = 0;
        if (isPool) {
            spx = zj.dragonBonesPool.getInstance().getTypeItem(dbName);
        }
        if (!spx) {
            var scene = ui ? ui : zj.StageSceneManager.Instance.gettemporaryScene;
            var armatureDisplay = zj.Game.DragonBonesManager.getArmatureDisplaySync(scene, dbName, armatureName);
            if (armatureDisplay) {
                spx = new Spx();
                if (isPool) {
                    zj.dragonBonesPool.getInstance().dbArr.push(spx);
                }
                spx.spineScaleX = armatureDisplay.scaleX;
                spx.spineScaleY = armatureDisplay.scaleY;
                armatureDisplay.scaleX *= scale;
                armatureDisplay.scaleY *= scale;
                spx.scale = armatureDisplay.scaleY;
                spx.spine = armatureDisplay;
                spx.name = dbName;
                if (spineTable) {
                    order = spineTable.order;
                }
                spx.init();
            }
            else {
                // for (let i = 0; i < FightLoading.getInstance().resArr.length; i++) {
                //     if (FightLoading.getInstance().resArr[i] == dbName) {
                //         console.log("战斗预加载加载到了，一定是加载到了！！！！！！");
                //     }
                // }
                // console.log(FightLoading.getInstance().resArr);
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(贪婪之岛的不算)战斗资源没被加载到，这里这里:" + dbName);
            }
        }
        else {
            if (zj.DragonBonesManager.isScale2(dbName)) {
                spx.spine.scaleX = 2;
                spx.spine.scaleY = 2;
            }
            else {
                spx.spine.scaleX = 1;
                spx.spine.scaleY = 1;
            }
            //  if (dbName == "jg_zhaomu" || dbName == "baowu_eff" || dbName == "cj_ysg_eff" || dbName == "gonghuifuben" || dbName == "guanghuan_eff_2" ||
            //     dbName == "mapcloud" || dbName == "tupo_eff" || dbName == "ui_lieren_jinjie" || dbName == "wishspine" || dbName == "bianshen_eff" ||
            //     dbName == "cao_guanghezuoyong_eff" || dbName == "cj_ysg_eff" || dbName == "huo_dazibaoyan_eff" || dbName == "lei_cichang-leidun_eff" ||
            //     dbName == "lei_shiwanfute_eff" || dbName == "wj_000_palisitong2_eff" || dbName == "wj_005_saci_eff" || dbName == "wj_048_heixiaojie_eff" ||
            //     dbName == "wj_050_hongka_eff" || dbName == "wj_052_leiya_eff" || dbName == "wj_053_jin_eff" || dbName == "wj_053_wanghou_eff" ||
            //     dbName == "wj_054_nanijia_eff" || dbName == "wj_054_sikai_eff" || dbName == "yihou_heidong" || dbName == "youling_qiyizhiguang_eff" ||
            //     dbName == "ys_suolian2_eff") {
            //     spx.spine.scaleX = 2;
            //     spx.spine.scaleY = 2;
            // }
            spx.setVisibleSpx(true);
            spx.spine.scaleX *= scale;
            spx.spine.scaleY *= scale;
            spx.scale = spx.spine.scaleY;
        }
        return [spx, order];
    }
    zj.HunterSpineX = HunterSpineX;
    function TsMtirand() {
        var num;
        // if(Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH){
        //     num = Random(Gmgr.Instance.seed);//新手特殊的随机算法种子初始值13
        // }else{
        //     let Range = 4294967295;
        //     let Rand = Math.random();
        //     num = Math.round(Rand * Range); //四舍五入
        // }
        var Range = 4294967295;
        var Rand = Math.random();
        num = Math.round(Rand * Range); //四舍五入
        return num;
    }
    zj.TsMtirand = TsMtirand;
    //seed 随机种子
    function Random(seed) {
        var k = seed;
        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        k ^= k >>> 24;
        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        var h = (97 ^ 4);
        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
        h ^= h >>> 13;
        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        h ^= h >>> 15;
        zj.Gmgr.Instance.seed = seed += 1;
        return (h >>> 0) & 0x7fffffff;
    }
    zj.Random = Random;
    function ckid(id) {
        return (id == null || id == -1);
    }
    zj.ckid = ckid;
})(zj || (zj = {}));
//# sourceMappingURL=FightHelper.js.map