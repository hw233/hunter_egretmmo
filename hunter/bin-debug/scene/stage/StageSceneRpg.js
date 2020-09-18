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
    /**RPG类，继承场景类 */
    var StageSceneRpg = (function (_super) {
        __extends(StageSceneRpg, _super);
        function StageSceneRpg() {
            var _this = _super.call(this) || this;
            _this.bShake = false;
            _this.shakeId = 0;
            _this.shakeMaxFrame = 0;
            _this.shakeFrame = 0;
            _this.isShakePlusX = false;
            _this.isShakePlusY = false;
            _this.shakeOrignX = 0;
            _this.shakeOrignY = 0;
            _this.tableEffects = [];
            _this.cacheMembers = {};
            _this.bPosFinished = false;
            _this.map = null;
            // public mapBlockLayer:tiled.TMXLayer = null;
            // public spriteBlocks  = []
            _this.blocks = {};
            _this.tableMapCells = {};
            _this.tableNpcs = {};
            _this.tableBuilds = {};
            _this.tableMembers = {};
            _this.tableMemberPets = {};
            _this.tableTrees = {};
            _this.willDelMobs = {};
            _this.tableBosses = {};
            _this.screenMoveDistanceX = 0;
            _this.screenMoveDistanceY = 0;
            _this.ICONTYPE = { NORMAL: 1, HIGH: 2 };
            _this.loadSpxTbl();
            return _this;
        }
        StageSceneRpg.prototype.release = function () {
            zj.Game.EventManager.off(zj.GameEvent.LOOK_OTHER_PLAYER, this.checkPlayerVisible, this);
            _super.prototype.release.call(this);
            for (var k in this.cacheMembers) {
                var v = this.cacheMembers[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.cacheMembers = {};
            for (var k in this.tableMapCells) {
                var v = this.tableMapCells[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableMapCells = {};
            for (var k in this.tableNpcs) {
                var v = this.tableNpcs[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableNpcs = {};
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableBuilds = {};
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableMembers = {};
            for (var k in this.tableMemberPets) {
                var v = this.tableMemberPets[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableMemberPets = {};
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableTrees = {};
            this.tableTrees = {};
            this.willDelMobs = {};
            if (this.playerLeader) {
                this.playerLeader.release();
                this.playerLeader = null;
            }
            if (this.playerLeaderPet) {
                this.playerLeaderPet.release();
                this.playerLeaderPet = null;
            }
        };
        StageSceneRpg.prototype.Init = function () {
            zj.Gmgr.Instance.bWillGoRpg = false;
            zj.Game.EventManager.on(zj.GameEvent.LOOK_OTHER_PLAYER, this.checkPlayerVisible, this);
        };
        StageSceneRpg.prototype.checkPlayerVisible = function () {
            var isLook = zj.Game.PlayerInfoSystem.getIsLookOtherPlayer() && zj.Game.PlayerInfoSystem.IsAgreeEnter;
            for (var k in this.tableMembers) {
                this.tableMembers[k].setPlayerVisible(isLook);
            }
            for (var k in this.tableMemberPets) {
                this.tableMemberPets[k].setPlayerVisible(isLook);
            }
        };
        StageSceneRpg.prototype.Update = function (tick) {
            this.playerDepth();
        };
        StageSceneRpg.prototype.playerDepth = function () {
            var arr = [];
            if (this.playerLeader) {
                arr.push(this.playerLeader);
            }
            if (this.playerLeaderPet) {
                arr.push(this.playerLeaderPet);
            }
            for (var k in this.tableTrees) {
                if (this.tableTrees[k]) {
                    arr.push(this.tableTrees[k]);
                }
            }
            for (var k in this.tableMembers) {
                if (this.tableMembers[k]) {
                    arr.push(this.tableMembers[k]);
                }
            }
            for (var k in this.tableNpcs) {
                if (this.tableNpcs[k]) {
                    arr.push(this.tableNpcs[k]);
                }
            }
            for (var k in this.tableMemberPets) {
                if (this.tableMemberPets[k]) {
                    arr.push(this.tableMemberPets[k]);
                }
            }
            for (var k in this.tableBosses) {
                if (this.tableBosses[k]) {
                    arr.push(this.tableBosses[k]);
                }
            }
            arr.sort(function (a, b) {
                return a.y - b.y; //更改显示列表顺序
            });
            for (var i = 0; i < arr.length; i++) {
                // this.map.addChild(arr[i].nodeRoot);
                this.map.setChildIndex(arr[i].nodeRoot, i);
            }
        };
        StageSceneRpg.prototype.getEffectLayer = function (role) {
            return this.nodeUp;
        };
        StageSceneRpg.prototype.isCanPushWarUi = function () {
            //有问题
            var tag = true;
            // local mm = GetUIByName("League_WarPop")
            // if mm ~= nil then
            // 	tag = false
            // end
            // local nn = GetUIByName("League_WarDie")
            // if nn ~= nil then
            // 	tag = false
            // end
            // local xx = GetUIByName("League_WarEndPop")
            // if xx ~= nil then
            // 	tag = false
            // end
            return tag;
        };
        StageSceneRpg.prototype.atkNoticeResult = function () {
            var key = zj.Game.PlayerWonderLandSystem.resultInfo["rightRoleBase"].id;
            this.pushLeague_WarPop();
            if (this.tableMembers[key] != null) {
                this.startFight(this.playerLeader, this.tableMembers[key], true, this.mainMenu.BattleCB, null);
            }
        };
        StageSceneRpg.prototype.beAtkNoticeResult = function () {
            var key = zj.Game.PlayerWonderLandSystem.resultInfo["rightRoleBase"].id;
            this.pushLeague_WarPop();
            if (this.tableMembers[key] != null) {
                this.startFight(this.tableMembers[key], this.playerLeader, false, null, null);
            }
        };
        StageSceneRpg.prototype.pushLeague_WarPop = function () {
            zj.Device.fastBattleSwitch = zj.Device.GetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch);
            if (zj.Device.fastBattleSwitch == null)
                zj.Device.fastBattleSwitch = false;
            if (zj.Device.fastBattleSwitch) {
                if (this.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                    this.DarklandFastAward();
                }
                else {
                    this.WonderlandFastAward();
                }
                return;
            }
            if (this.mainMenu == null) {
                return;
            }
            //有问题
            // local mm = GetUIByName("HXH_PayMall") --若在充值界面则什么也不做
            // if mm ~= nil then
            // 	return
            // end
            // local xx = GetUIByName("HXH_ExchangeMain") --若在充值界面则什么也不做
            // if xx ~= nil then
            // 	return
            // end
            // local xx = GetUIByName("HXH_MoraMain") --若在充值界面则什么也不做
            // if xx ~= nil then
            // 	return
            // end
            // local xx = GetUIByName("HXH_FishingMain") --若在充值界面则什么也不做
            // if xx ~= nil then
            // 	return
            // end
            // local nn = GetUIByName("League_WarEndPop")--帮战结束不再结算
            // if nn ~= nil then
            // 	return
            // end
            // PopUIUntil(self.mainMenu:GetUIName())
            // PushUI("League_WarPop"):PlayLastReport()
            // GameCommon:EventLockUI(false)
            zj.loadUI(zj.LeagueWarPop)
                .then(function (dialog) {
                dialog.show();
                dialog.PlayLastReport();
            });
        };
        StageSceneRpg.prototype.WonderlandFastAward = function () {
            //有问题
            if (zj.Game.PlayerWonderLandSystem.resultInfo["battleType"] == message.EFormationType.FORMATION_TYPE_WONDERLAND) {
            }
        };
        StageSceneRpg.prototype.DarklandFastAward = function () {
            //有问题
        };
        StageSceneRpg.prototype.memberNoticeResult = function (left_key, right_key) {
            if (right_key == zj.Game.PlayerInfoSystem.RoleID) {
                return;
            }
            if (this.tableMembers[right_key] == null) {
                return;
            }
            this.startFight(this.tableMembers[left_key], this.tableMembers[right_key], false, null, null);
        };
        StageSceneRpg.prototype.startFight = function (left, right, datum, leftCB, rightCB) {
            var _a = left.getPos(), atk_x = _a[0], atk_y = _a[1];
            var atk_dir = left.getDir();
            var _b = right.getPos(), beAtk_x = _b[0], beAtk_y = _b[1];
            var beAtk_dir = right.getDir();
            //障碍物的问题后续再处理吧。
            if (datum == true) {
                if (atk_x >= beAtk_x) {
                    var tmp = atk_x;
                    atk_dir = zj.TableEnum.TableEnumDir.Dir_Left;
                    beAtk_x = tmp - 200;
                    beAtk_y = atk_y;
                    beAtk_dir = zj.TableEnum.TableEnumDir.Dir_Right;
                }
                if (atk_x < beAtk_x) {
                    var tmp = atk_x;
                    atk_dir = zj.TableEnum.TableEnumDir.Dir_Right;
                    beAtk_x = tmp + 200;
                    beAtk_y = atk_y;
                    beAtk_dir = zj.TableEnum.TableEnumDir.Dir_Left;
                }
            }
            else {
                if (beAtk_x >= atk_x) {
                    var tmp = beAtk_x;
                    beAtk_dir = zj.TableEnum.TableEnumDir.Dir_Left;
                    atk_x = tmp - 200;
                    atk_y = beAtk_y;
                    atk_dir = zj.TableEnum.TableEnumDir.Dir_Right;
                }
                if (beAtk_x < atk_x) {
                    var tmp = beAtk_x;
                    beAtk_dir = zj.TableEnum.TableEnumDir.Dir_Right;
                    atk_x = tmp + 200;
                    atk_y = beAtk_y;
                    atk_dir = zj.TableEnum.TableEnumDir.Dir_Left;
                }
            }
            left.changeFightShowAtk(atk_dir, atk_x, atk_y, leftCB);
            right.changeFightShowBeAtk(beAtk_dir, beAtk_x, beAtk_y, rightCB);
        };
        StageSceneRpg.prototype.proofLeaderPos = function (posItem) {
            if (this.playerLeader == null) {
                return;
            }
            var dir_x = zj.yuan3(posItem.scene_x - this.playerLeader.moveDistance > 0, 1, -1);
            var dir_y = zj.yuan3(posItem.scene_y - this.playerLeader.verDistance > 0, 1, -1);
            var dis_x = Math.abs(posItem.scene_x - this.playerLeader.moveDistance);
            var dis_y = Math.abs(posItem.scene_y - this.playerLeader.verDistance);
            // dis_y = 864
            function move_x(x, w, thisobj) {
                var a_div = x / w;
                var a_mod = x % w;
                for (var i = 1; i < a_div; i++) {
                    thisobj.playerLeader.moveMap(dir_x * w, 0);
                }
                return a_mod;
            }
            function move_y(y, h, thisobj) {
                var a_div = y / h;
                var a_mod = y % h;
                for (var i = 1; i < a_div; i++) {
                    thisobj.playerLeader.moveMap(0, dir_y * h);
                }
                return a_mod;
            }
            if (dis_x > zj.Device.screenWidth / 2) {
                var mod = move_x(dis_x - zj.Device.screenWidth / 2, zj.Device.screenWidth / 2, this);
                dis_x = zj.Device.screenWidth / 2 + mod;
            }
            var x_mod = move_x(dis_x, 320, this);
            this.playerLeader.moveMap(dir_x * x_mod, 0);
            if (dis_y > zj.Device.screenHeight / 10) {
                var mod = move_y(dis_y - zj.Device.screenHeight / 10, zj.Device.screenHeight / 10, this);
                dis_y = zj.Device.screenHeight / 10 + mod;
            }
            var y_mod = move_y(dis_y, 320, this);
            this.playerLeader.moveMap(0, dir_y * y_mod);
            this.playerLeader.setPos(this.playerLeader.x, this.playerLeader.y);
            if (this.playerLeaderPet != null) {
                this.playerLeaderPet.setFirstPetPos();
            }
        };
        StageSceneRpg.prototype.isCanLeaveScene = function () {
            var tag = true;
            var code = -1;
            if (this.playerLeader.bProgressing == true) {
                tag = false;
                //code = yuan3(this.sceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR, 1, 2);
            }
            else {
                if (this.playerLeader.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    tag = false;
                    code = 3;
                }
            }
            return [tag, code];
        };
        StageSceneRpg.prototype.proofTime = function () {
            // if (Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID]) {
            // 	// let date = new Date();
            // 	let difTime = egret.getTimer() - Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID]//date.getTime() - Game.PlayerWonderLandSystem.joinTimeInfo[Game.PlayerInfoSystem.RoleID];
            // 	if (difTime <= 0) {
            // 		difTime = 0;
            // 	}
            // 	let _tick = difTime / 1000;
            // 	this.playerLeader.Update(_tick);
            // }
            this.proofMemberTime();
        };
        StageSceneRpg.prototype.proofMemberTime = function () {
            // for (let k in this.tableMembers) {
            // 	let v = this.tableMembers[k];
            // 	if (Game.PlayerWonderLandSystem.joinTimeInfo[k] != null) {
            // 		let difTime = egret.getTimer() - Game.PlayerWonderLandSystem.joinTimeInfo[k];
            // 		if (difTime <= 0) {
            // 			difTime = 0;
            // 		}
            // 		let _tick = difTime / 1000;
            // 		v.Update(_tick);
            // 	}
            // }
        };
        StageSceneRpg.prototype.proofMobPos = function (map_x, map_y) {
            if (zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                var x = map_x;
                var y = map_y;
                var i = Math.floor((map_x - this.Block_Width) / this.Block_Width);
                var j = Math.floor((map_y - this.Block_Width) / this.Block_Width);
                var key = zj.Helper.StringFormat("%d_%d", i, j);
                if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
                    x = map_x - this.Block_Width;
                    y = map_y - this.Block_Width;
                }
                return [x, y];
            }
            else {
                var i = Math.floor(map_x / this.Block_Width);
                var j = Math.floor(map_y / this.Block_Width);
                var key_src = zj.Helper.StringFormat("%d_%d", i, j);
                if (this.blocks[key_src] != null && this.blocks[key_src].couldCross == true) {
                    return [map_x, map_y];
                }
                else {
                    // let x = map_x;
                    // let y = map_y;
                    // while (true) {
                    // 	let radio_x = getRandom(-2, 2);
                    // 	let radio_y = getRandom(-1, 1);
                    // 	x = map_x + radio_x * this.Block_Width;
                    // 	y = map_y + radio_y * this.Block_Width;
                    // 	let i = x / this.Block_Width;
                    // 	let j = y / this.Block_Width;
                    // 	let key = Helper.StringFormat("%d_%d", i, j);
                    // 	if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
                    // 		break;
                    // 	}
                    // }
                    // return [x, y];
                    return this.getInitPos(map_x, map_y);
                }
            }
        };
        StageSceneRpg.prototype.getInitPos = function (map_x, map_y) {
            map_y = Math.abs(map_y);
            var y = map_y;
            var n = Math.floor(map_x / this.Block_Width);
            for (var i = 1; i <= 22; ++i) {
                var p = Math.floor(y / this.Block_Width);
                var key = zj.Helper.StringFormat("%d_%d", n, p);
                if (this.blocks[key] != null && this.blocks[key].couldCross == true) {
                    return [map_x, y];
                }
                y += this.Block_Width;
            }
            return [map_x, map_y];
        };
        StageSceneRpg.prototype.preLoad1 = function () {
        };
        StageSceneRpg.prototype.preLoad2 = function () {
        };
        StageSceneRpg.prototype.preLoadSpxBody = function (tbl) {
        };
        StageSceneRpg.prototype.loadSpxTbl = function () {
            this.idMap = {};
            //主角
            var picIds_normal = zj.Game.PlayerWonderLandSystem.GetNormalPic(1);
            this.idMap[this.ICONTYPE.NORMAL] = picIds_normal;
            var picIds_high = zj.Game.PlayerWonderLandSystem.GetHighPic();
            //高级头像
            this.idMap[this.ICONTYPE.HIGH] = picIds_high;
        };
        StageSceneRpg.prototype.isTouchUiEnabled = function () {
            var tag = true;
            if (this.playerLeader == null || this.playerLeader.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                tag = false;
            }
            return tag;
        };
        StageSceneRpg.prototype.procEffects = function (tick) {
            var i = 0;
            while (i < this.tableEffects.length) {
                this.tableEffects[i].update(tick);
                i = i + 1;
            }
            i = 0;
            while (i < this.tableEffects.length) {
                var tEffect = this.tableEffects[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    this.tableEffects.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneRpg.prototype.addEffect = function (effect) {
            this.tableEffects.push(effect);
        };
        StageSceneRpg.prototype.clearAllEffects = function () {
            var i = 0;
            while (i < this.tableEffects.length) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
                this.tableEffects.splice(i, 1);
            }
        };
        StageSceneRpg.prototype.ComputeMapXY = function (base_x, base_y) {
            var maxMoveX = this.mapWidth - zj.Device.screenWidth;
            var maxMoveY = this.mapHeight - zj.Device.screenHeight;
            var minMoveX = 0;
            var minMoveY = 0;
            var moveX = 0;
            var moveY = 0;
            if (this.screenMoveDistanceX + base_x > maxMoveX) {
                moveX = maxMoveX - this.screenMoveDistanceX;
            }
            else if (this.screenMoveDistanceX + base_x < minMoveX) {
                moveX = minMoveX - this.screenMoveDistanceX;
            }
            else {
                moveX = base_x;
            }
            var b = this.screenMoveDistanceY;
            if (this.screenMoveDistanceY + base_y > maxMoveY) {
                moveY = maxMoveY - this.screenMoveDistanceY;
            }
            else if (this.screenMoveDistanceY + base_y < minMoveY) {
                moveY = minMoveY - this.screenMoveDistanceY;
            }
            else {
                moveY = base_y;
            }
            moveX = Math.floor(moveX * 100) / 100;
            moveY = Math.floor(moveY * 100) / 100;
            this.screenMoveDistanceX = this.screenMoveDistanceX + moveX;
            this.screenMoveDistanceY = this.screenMoveDistanceY + moveY;
            return [moveX, moveY];
        };
        StageSceneRpg.prototype.UpdateMap = function (moveX, moveY) {
            _super.prototype.UpdateMap.call(this, moveX, moveY);
            this.updateMapEffects(moveX, moveY);
            this.updateBlockChilden(moveX, moveY);
            this.updateMapBuildings(moveX, moveY);
            this.updateMapMember(moveX, moveY);
            this.updateMapTrees(moveX, moveY);
            this.updateMapCells(moveX, moveY);
            this.updataBox(moveX, moveY);
        };
        StageSceneRpg.prototype.updataBox = function (base_x, base_y) {
            this.box.x = this.box.x - base_x;
            this.box.y = this.box.y - base_y;
        };
        StageSceneRpg.prototype.updateMapEffects = function (base_x, base_y) {
            for (var i = 0; i < this.tableEffects.length; i++) {
                var v = this.tableEffects[i];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x, y - base_y);
            }
        };
        StageSceneRpg.prototype.startShake = function (id) {
            if (zj.GlobalBattleConfig.shake == false) {
                return;
            }
            this.nodeContainer.x = this.shakeOrignX;
            this.nodeContainer.y = this.shakeOrignY;
            function rand() {
                if (zj.TsMtirand() % 2 == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            this.bShake = true;
            this.shakeId = id;
            this.shakeFrame = 0;
            this.isShakePlusX = rand();
            this.isShakePlusY = rand();
            var tableShake = zj.TableClientSkillShake.Table();
            this.shakeMaxFrame = tableShake[this.shakeId].screen_shake_frame;
        };
        StageSceneRpg.prototype.updateShake = function (tick) {
            if (this.bShake == false) {
                return;
            }
            if (this.shakeFrame >= this.shakeMaxFrame) {
                this.bShake = false;
                this.shakeFrame = 0;
                this.shakeId = -1;
                this.nodeContainer.x = this.shakeOrignX;
                this.nodeContainer.y = this.shakeOrignY;
            }
            else {
                var tableShake = zj.TableClientSkillShake.Table();
                this.isShakePlusX = zj.turnBool(this.isShakePlusX);
                this.isShakePlusY = zj.turnBool(this.isShakePlusY);
                var randX = 0;
                var randY = 0;
                var maxX = tableShake[this.shakeId].range_x[1];
                var minX = tableShake[this.shakeId].range_x[0];
                var maxY = tableShake[this.shakeId].range_y[1];
                var minY = tableShake[this.shakeId].range_y[0];
                if (maxX == 0 && minX == 0) {
                    randX = 0;
                }
                else if (maxX == minX) {
                    randX = minX;
                }
                else {
                    randX = minX + zj.TsMtirand() % (maxX - minX);
                }
                if (randX > 10 || randX < 0) {
                    randX = 0;
                }
                if (maxY == 0 && minY == 0) {
                    randY = 0;
                }
                else if (maxY == minY) {
                    randY = minY;
                }
                else {
                    randY = minY + zj.TsMtirand() % (maxY - minY);
                }
                if (randY > 10 || randY < 0) {
                    randY = 0;
                }
                this.nodeContainer.x = this.shakeOrignX + zj.yuan3(this.isShakePlusX, randX, -randX);
                this.nodeContainer.y = this.shakeOrignY + zj.yuan3(this.isShakePlusY, randY, -randY);
                this.shakeFrame = this.shakeFrame + tick * 1000;
            }
        };
        StageSceneRpg.prototype.initTmx = function () {
            this.box = new eui.Group();
            this.nodeRole.addChild(this.box);
            var mapdata = zj.MapSceneLoading.getInstance().data;
            //当前地图整个地图格子数据
            var currmapdata = mapdata.attributes;
            var mapArr = [];
            for (var i = 0; i < mapdata.children.length; i++) {
                var currxml = mapdata.children[i];
                if (currxml.$name == "block") {
                    mapArr = currxml.children[0].children.concat();
                }
            }
            this.MapBlockW = parseInt(currmapdata.width) * parseInt(currmapdata.tilewidth);
            this.MapBlockH = parseInt(currmapdata.height) * parseInt(currmapdata.tilewidth);
            this.Block_Width = parseInt(currmapdata.tilewidth);
            var hor = this.MapBlockW / this.Block_Width;
            var ver = this.MapBlockH / this.Block_Width;
            /*初始化地图*/
            this.map = new egret.Sprite();
            this.map.name = "map";
            /*将地图添加到显示列表*/
            this.nodeRole.addChild(this.map);
            for (var i = 0; i < ver; i++) {
                for (var j = 0; j < hor; j++) {
                    var node = mapArr[0];
                    var block = {};
                    block["w"] = j;
                    block["h"] = i;
                    block["pos"] = new egret.Point((j) * this.Block_Width + this.Block_Width / 2, (i) * this.Block_Width + this.Block_Width / 2);
                    if (node.$gid == "1") {
                        block["couldCross"] = false;
                    }
                    else {
                        block["couldCross"] = true;
                    }
                    var key = zj.Helper.StringFormat("%d_%d", block["w"], block["h"]);
                    this.blocks[key] = block;
                    mapArr.splice(0, 1);
                }
            }
        };
        /**绘制地图格子数据 */
        StageSceneRpg.prototype.drawBox = function () {
            var hor = this.MapBlockW / this.Block_Width;
            var ver = this.MapBlockH / this.Block_Width;
            for (var i = 0; i < hor; i++) {
                for (var j = 0; j < ver; j++) {
                    var key = zj.Helper.StringFormat("%d_%d", i, j);
                    var sprite = this.blocks[i + "_" + j];
                    var block = {};
                    block["w"] = i;
                    block["h"] = j;
                    block["pos"] = new egret.Point((i) * this.Block_Width + this.Block_Width / 2, (j) * this.Block_Width + this.Block_Width / 2);
                    var leftCage = new egret.Sprite();
                    this.box.addChild(leftCage);
                    if (sprite.couldCross == true) {
                        leftCage.graphics.beginFill(0x00ff00, 0.1);
                    }
                    else {
                        leftCage.graphics.beginFill(0xff0000, 0.1);
                    }
                    leftCage.graphics.drawRect(0, 0, 80, 80);
                    leftCage.graphics.lineStyle(1, 0xffffff);
                    leftCage.graphics.lineTo(0, 0);
                    leftCage.graphics.lineTo(80, 0);
                    leftCage.graphics.lineTo(80, 80);
                    leftCage.graphics.lineTo(0, 80);
                    leftCage.graphics.lineTo(0, 0);
                    leftCage.graphics.endFill();
                    leftCage.x = block["pos"].x = i * 80;
                    leftCage.y = block["pos"].y = j * 80;
                    var leftTF = new egret.TextField;
                    leftTF.size = 20;
                    leftTF.textAlign = egret.HorizontalAlign.CENTER;
                    leftTF.textColor = 0xffffff;
                    leftTF.background = true;
                    leftTF.backgroundColor = 0xd71345;
                    leftTF.text = i + "," + j;
                    leftTF.touchEnabled = true;
                    leftCage.addChild(leftTF);
                }
            }
        };
        StageSceneRpg.prototype.loadTmxBlock = function () {
        };
        StageSceneRpg.prototype.updateBlockChilden = function (moveX, moveY) {
            // for(let i = 0;i<this.spriteBlocks.length;i++){
            // 	let child = this.spriteBlocks[i];
            // 	let x = child.x;
            // 	let y = child.y;
            // 	child.x = x-moveX;
            // 	child.y = y-moveY;
            // }
        };
        StageSceneRpg.prototype.initCellNode = function () {
            var layerName = ["far", "mid2", "mid1", "group", "close"];
            for (var k = 0; k < layerName.length; k++) {
                var v = layerName[k];
                if (v == "group") {
                    this[v + "_nodeRole"] = this.addChildEx(this[v + "_node_other"], new eui.Group());
                    this[v + "_nodeUp"] = this.addChildEx(this[v + "_node_other"], new eui.Group());
                    // this[v + "_nodeCheckButton"] = this.addChildEx(this[v + "_node_other"],new eui.Group());
                    this.nodeRole = this["group_nodeRole"];
                    this.nodeUp = this["group_nodeUp"];
                    // this.nodeCheckButton = this["group_nodeCheckButton"];
                }
            }
        };
        StageSceneRpg.prototype.addChildEx = function (node1, node2) {
            node1.addChild(node2);
            return node2;
        };
        StageSceneRpg.prototype.initBuilds = function (csvName, sceneId) {
            var tbl = zj.Game.ConfigManager.getTable(csvName + ".json"); //table_wonderland_map_block
            var _temp = [];
            for (var k in tbl) {
                var v = tbl[k];
                _temp.push(v);
            }
            _temp.sort(function (a, b) {
                return a.build_id - b.build_id;
            });
            for (var i = 0; i < _temp.length; i++) {
                var v = _temp[i];
                if (v.build_type == 5) {
                    var key = v.build_id;
                    var find = zj.Table.FindFCall(v.show_scene, function (key, value) {
                        return sceneId == value;
                    }, this);
                    if (find) {
                        var _cell = new zj.StageRpgNpc(this.map, this.MapBlockH);
                        if (_cell) {
                            _cell.InitNpc(v, null);
                            this.tableMapCells[key] = _cell;
                            this.tableNpcs[key] = _cell;
                        }
                    }
                }
            }
        };
        StageSceneRpg.prototype.initMapBlock = function () {
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                this.SetBlock(v);
            }
            for (var k in this.tableMapCells) {
                var v = this.tableMapCells[k];
                this.SetBlock(v);
            }
            for (var k in this.tableNpcs) {
                var v = this.tableNpcs[k];
                this.SetBlock(v);
            }
            //    this.drawBox();
        };
        StageSceneRpg.prototype.SetBlock = function (build) {
            var hor = (build.x + build.info.balk_rt[0]) / this.Block_Width;
            var ver = (build.y + build.info.balk_rt[1]) / this.Block_Width;
            ver = ver - 1;
            var grid_w = build.info.balk_rt[2] / this.Block_Width;
            var grid_h = build.info.balk_rt[3] / this.Block_Width;
            for (var i = hor; i <= hor + grid_w - 1; i++) {
                for (var j = ver; j <= ver + grid_h - 1; j++) {
                    i = Math.floor(i);
                    j = Math.floor(j);
                    var key = zj.Helper.StringFormat("%d_%d", i, j);
                    this.blocks[key].couldCross = false;
                }
            }
        };
        StageSceneRpg.prototype.ClearBlock = function (build) {
            var hor = (build.info.build_x + build.info.balk_rt[0]) / this.Block_Width;
            var ver = (zj.PlayerWonderLandSystem.MapHeight - build.info.build_y + build.info.balk_rt[1]) / this.Block_Width;
            var grid_w = build.info.balk_rt[2] / this.Block_Width;
            var grid_h = build.info.balk_rt[3] / this.Block_Width;
            for (var i = hor; i <= hor + grid_w - 1; i++) {
                for (var j = ver; j <= ver + grid_h - 1; j++) {
                    i = Math.floor(i);
                    j = Math.floor(j);
                    var key = zj.Helper.StringFormat("%d_%d", i, j);
                    this.blocks[key].couldCross = true;
                }
            }
            zj.Astar.getInstance().clear_cached_paths();
        };
        StageSceneRpg.prototype.SetTreeBlock = function (tree) {
            var hor = (tree.map_x - tree.info.balk_rt[2] / 1) / this.Block_Width;
            var ver = tree.map_y / this.Block_Width;
            var grid_w = tree.info.balk_rt[2] / this.Block_Width;
            var grid_h = tree.info.balk_rt[3] / this.Block_Width;
            for (var i = hor; i < hor + grid_w - 1; i++) {
                for (var j = ver; j < ver + grid_h - 1; j++) {
                    i = Math.floor(i);
                    j = Math.floor(j);
                    var key = zj.Helper.StringFormat("%d_%d", i, j);
                    this.blocks[key].couldCross = false;
                }
            }
        };
        StageSceneRpg.prototype.updateMapBuildings = function (base_x, base_y) {
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x, y - base_y);
            }
        };
        StageSceneRpg.prototype.updateMapMember = function (base_x, base_y) {
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x, y - base_y);
            }
        };
        StageSceneRpg.prototype.updateMapTrees = function (base_x, base_y) {
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x, y - base_y);
            }
        };
        StageSceneRpg.prototype.updateMapCells = function (base_x, base_y) {
            var layerName = ["far", "mid2", "mid1", "group", "close"];
            for (var k in this.tableMapCells) {
                var v = this.tableMapCells[k];
                var offset = this.mapData[layerName[v.info.block_cell] + "_v"];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x * offset[0], y - base_y * offset[1]);
            }
        };
        StageSceneRpg.prototype.updateTrees = function (tick) {
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                v.Update(tick);
            }
        };
        StageSceneRpg.prototype.updateNpcs = function (tick) {
            for (var k in this.tableNpcs) {
                var v = this.tableNpcs[k];
                v.Update(tick);
            }
        };
        StageSceneRpg.prototype.updateTreeTrans = function (tick) {
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                var tran = 1;
                if (v.isExitShelter(this.playerLeader.x, this.playerLeader.y) == true) {
                    tran = 1 * 0.6;
                }
                v.setTrans(tran);
            }
        };
        return StageSceneRpg;
    }(zj.StageScene));
    zj.StageSceneRpg = StageSceneRpg;
    __reflect(StageSceneRpg.prototype, "zj.StageSceneRpg");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneRpg.js.map