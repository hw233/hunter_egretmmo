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
    var StageScenePersonPath = (function (_super) {
        __extends(StageScenePersonPath, _super);
        function StageScenePersonPath(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.pathWalkPos = new egret.Point();
            _this.rectBeInScope = new egret.Rectangle();
            _this.posBeInScope = new egret.Point();
            _this.rectVisibleRt = new egret.Rectangle();
            _this.scenePosInfo = null;
            _this.fightRoleInfo = null;
            _this.wonderlandRoleInfo = null;
            _this.collideEffect = null;
            _this.targetEndPoint = null;
            _this.declareIds = {};
            _this.objectIds = {};
            _this.battleMode = -1;
            _this.bWillFight = false;
            // fish
            _this.bInFish = 0;
            _this.fishCss = null;
            _this.joinType = message.ESceneItemType.SCENE_ITEM_TYPE_ROLE;
            _this.posState = message.ESceneItemState.SCENE_ITEM_STATE_JOIN;
            _this.bombLeftTime = -1;
            _this.attackLeftTime = -1;
            _this.bossHurt = -1;
            _this.killCombo = 0;
            _this.killTime = 0;
            return _this;
        }
        StageScenePersonPath.prototype.createPlayer = function (scenePosInfo, floor, x, y, dir, moveDis, verDis, ePosType, bEnemy) {
            _super.prototype.createPlayer.call(this, scenePosInfo, floor, x, y, dir, moveDis, verDis);
            this.setPlayerInfo(scenePosInfo.roleBase);
            this.setPositionType(ePosType);
            this.setIsEnemy(bEnemy);
            // todo
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageScenePersonPath.prototype.createWonderlandPlayer = function (scenePosInfo, floor, x, y, dir, moveDis, verDis) {
            this.setScenePosInfo(scenePosInfo);
            this.setPlayerInfo(scenePosInfo.roleBase);
            // todo
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageScenePersonPath.prototype.createZorkPlayer = function (scenePosInfo, floor, x, y, dir, moveDis, verDis) {
            this.setScenePosInfo(scenePosInfo);
            this.setPlayerInfo(scenePosInfo.roleBase);
            // todo
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageScenePersonPath.prototype.init = function () {
            this.parseInfo();
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            //this.loadMagicSkill()
            this.loadLedAni();
            //this.loadStorageSpx()
            //this.loadCollideEffect()
            this.loadBloodBar();
            this.loadDesignation();
            this.loadAura();
            this.loadProgressBar();
            this.loadLvTitle();
            this.loadNameTitle();
            this.loadLeagueNameTitle();
            this.loadGroupNameTitle();
            this.loadSpeed();
            this.loadScale();
            this.loadFishAni();
            this.loadChannelAni();
            this.adjustAniPos();
        };
        StageScenePersonPath.prototype.loadSpeed = function () {
            this.moveSpeedX = zj.StageScenePlayer.SP_DEFAULT_X;
            this.moveSpeedY = zj.StageScenePlayer.SP_DEFAULT_X * 0.8;
        };
        StageScenePersonPath.prototype.goToWalk = function () {
            var pos = this.path.currentWayPoint();
            var _a = this.converScreenPos(pos), screen_x = _a[0], screen_y = _a[1];
            var _b = this.judgeDir(screen_x, screen_y), dir = _b[0], walkDir = _b[1];
            this.walkDir = walkDir;
            this.changeDir(dir);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_Walk);
            this.setActLoop(true);
            this.bRunAstar = true;
        };
        StageScenePersonPath.prototype.endPath = function () {
            this.path = null;
            this.bRunAstar = false;
            this.saveDir = zj.TableEnum.TableEnumDir.Dir_None;
            this.walkDir = zj.TableEnum.EnumDepthDir.Dir_None;
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            if (this.targetCB != null) {
                this.targetCB(this.targetCBThis);
                this.targetCBThis = null;
            }
        };
        StageScenePersonPath.prototype.isCanPath = function (map_x, map_y) {
            //  map_y = map_y - 300;
            var i = Math.floor(map_x / this.curScene.Block_Width);
            var j = Math.floor(map_y / this.curScene.Block_Width);
            var key = zj.Helper.StringFormat("%d_%d", i, j);
            if (this.curScene.blocks[key] != null && this.curScene.blocks[key].couldCross == true) {
                return true;
            }
            return false;
        };
        StageScenePersonPath.prototype.setScenePosInfo = function (scenePosInfo) {
            this.scenePosInfo = scenePosInfo;
        };
        StageScenePersonPath.prototype.setFightRoleInfo = function (fightRoleInfo) {
            this.fightRoleInfo = fightRoleInfo;
        };
        StageScenePersonPath.prototype.setWonderlandRoleInfo = function (wonderlandRoleInfo) {
            this.wonderlandRoleInfo = wonderlandRoleInfo;
        };
        StageScenePersonPath.prototype.setTitlePos = function (x, y) {
            var _a = [0, 0, 0, 0, 0, 0, 0, 0], w0 = _a[0], w1 = _a[1], w2 = _a[2], w3 = _a[3], w4 = _a[4], w5 = _a[5], w6 = _a[6], w7 = _a[7];
            var _b = [0, 0, 0, 0, 0, 0, 0, 0], h0 = _b[0], h1 = _b[1], h2 = _b[2], h3 = _b[3], h4 = _b[4], h5 = _b[5], h6 = _b[6], h7 = _b[7];
            var _x = x + this.aniUpOffsetX;
            var _y = y - this.aniUpOffsetY;
            if (this.bloodBoard != null) {
                w0 = this.bloodBoard.width;
                h0 = this.bloodBoard.height;
                this.bloodBoard.x = _x;
                this.bloodBoard.y = _y;
                if (this.bloodBar != null) {
                    this.bloodBar.x = _x - this.bloodBarWidth / 2;
                    this.bloodBar.y = _y - 3;
                }
            }
            if (this.ttfName != null) {
                w1 = this.ttfName.width;
                h1 = this.ttfName.height;
            }
            _y = _y - h0 / 2 - h1 / 2;
            if (this.ttfLv != null) {
                w2 = this.ttfLv.width;
            }
            if (this.ttfName != null) {
                w3 = this.ttfName.width;
            }
            var dis = (w2 + w3 + zj.ConstantConfig_LeagueHome.LV_NAME_X_OFFSET) / 2;
            if (this.ttfLv != null) {
                _y = _y - zj.ConstantConfig_LeagueHome.BLOOD_NAME_Y_OFFSET;
                this.ttfLv.x = _x - dis;
                this.ttfLv.y = _y;
            }
            if (this.ttfName != null) {
                this.ttfName.x = this.ttfLv.x + this.ttfLv.width + 5;
                this.ttfName.y = this.ttfLv.y;
            }
            if (this.nameBoard != null) {
                var _c = [this.ttfLv.x, this.ttfLv.y], t_x = _c[0], t_y = _c[1];
                this.nameBoard.x = _x;
                this.nameBoard.y = t_y;
            }
            if (this.ttfName != null) {
                w4 = this.ttfName.width;
                h4 = this.ttfName.height;
            }
            if (this.designation != null) {
                // (this.designation as eui.Image).source = "ui_title_titlebig_titlebig21_png";
                this.designation.x = _x;
                this.designation.y = _y - 36;
                _y -= 44;
            }
            _y = _y - h1 / 2 - h4 / 2;
            if (this.ttfLeagueName != null) {
                w5 = this.ttfLeagueName.width;
                h5 = 20; //this.ttfLeagueName.height;
            }
            if (this.leagueStar != null) {
                w5 = w5 + this.leagueStar.width * this.leagueStar.scaleX + 5;
                w5 = w5 + 5;
            }
            if (this.leagueStar != null) {
                _y = _y - zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.leagueStar.x = _x - w5 / 2;
                this.leagueStar.y = _y - 5;
            }
            if (this.ttfLeagueName != null) {
                _y = _y - zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.ttfLeagueName.x = _x + w5 / 2 - this.ttfLeagueName.width;
                this.ttfLeagueName.y = _y;
            }
            if (this.ttfGroupName != null) {
                w6 = this.ttfGroupName.width;
                h6 = this.ttfGroupName.height;
            }
            _y = _y - h5 / 2 - h6 / 2;
            if (this.ttfGroupName != null) {
                _y = _y + zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.ttfGroupName.x = _x;
                this.ttfGroupName.y = _y;
            }
            if (this.designation != null) {
                w7 = this.designation.width;
                h7 = this.designation.height;
            }
            _y = _y - h6 / 2 - h7 / 2;
            var _save_y = _y;
            _y = _save_y - h4 / 2 - h5 / 2;
            if (this.progressBoard) {
                _y = _y - zj.ConstantConfig_LeagueHome.LEAGUE_PROGRESS_Y_OFFSET;
                this.progressBoard.x = _x;
                this.progressBoard.y = _y;
            }
            if (this.progressBar) {
                var _d = [this.x, this.y], t_x = _d[0], t_y = _d[1];
                this.progressBar.x = t_x - this.progressBarWidth / 2;
                this.progressBar.y = t_y;
            }
            _y = _save_y - h4 / 2 - zj.ConstantConfig_Rpg.COMMON_LED_OFFSET_Y;
            if (this.commonLedAni != null) {
                this.commonLedAni.SetPosition(_x, _y);
            }
            if (this.collideEffect != null) {
                this.collideEffect.SetPosition(x, y);
            }
        };
        StageScenePersonPath.prototype.changeFightShowAtk = function (dir, x, y, CB) {
            this.showNum = 0;
            this.showFrame = 0;
            //this.fightPosState = this.posState
            this.endFrozen();
            this.endProgress();
            this.changeDir(dir);
            this.setRoot(x, y);
            this.setRecPetFpPos(dir, x, y);
            //this.setLieRoot(x, y)
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk);
            this.setShowCB(CB);
            this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
            this.showHpCurFrame = 0;
            if (this.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_LEADER) {
                if (this.sceneHpPercent > 0) {
                    this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
                }
            }
        };
        StageScenePersonPath.prototype.changeFightShowBeAtk = function (dir, x, y, CB) {
            this.showNum = 0;
            this.showFrame = 20;
            //this.fightPosState = this.posState
            this.endFrozen();
            this.endProgress();
            this.changeDir(dir);
            this.setRoot(x, y);
            this.setRecPetFpPos(dir, x, y);
            //this.setLieRoot(x, y)
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk);
            this.setShowCB(CB);
            this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
            this.showHpCurFrame = 0;
        };
        StageScenePersonPath.prototype.dealSimpleMoveNotice = function (simple) {
            this.setPosState(simple.posState);
        };
        StageScenePersonPath.prototype.dealSceneNotice = function (notice) {
            this.setScenePosInfo(notice);
            this.setPosState(notice.posItem.posState);
            this.setJoinType(notice.posItem.joinerType);
            // this.setScenePosState( notice.posItem.posState )
            // recovery_hp
            if (this.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
                this.setSceneHpPercent(notice.hpPre, notice.recovery_hp);
            }
            else {
                this.setSceneHpPercent(notice.hpPre, notice.hpPre);
            }
            this.setDieProtectTime(notice.deadProtectTime);
            this.setInvincibleTime(notice.invincibleTime);
            this.setFasterTime(notice.fasterTime);
            this.setFrozenTime(notice.frozenTime);
            this.setPlayerBuffInfo(notice);
            this.setControlBuild(notice.buildId);
            //this.setDeclardIds(notice.declareIds)
            //this.setObjectIds(notice.objectIds)
            this.setBattleMode(notice.battleMode);
            this.dealProgress();
            this.dealSceneBuff();
            this.dealRevive();
            this.dealDead();
        };
        StageScenePersonPath.prototype.dealFightRoleInfo = function (message) {
            this.setFightRoleInfo(message);
            this.setPosState(message.posItem.posState);
            this.setJoinType(message.posItem.joinerType);
            //this.setScenePosState( message.posItem.posState )
            this.setSceneHpPercent(message.hpPre, message.hpPre);
            this.setDieProtectTime(message.deadProtectTime);
            this.setInvincibleTime(message.invincibleTime);
            this.setFasterTime(message.fasterTime);
            this.setFrozenTime(message.frozenTime);
            this.setPlayerBuffInfo(message);
            this.setControlBuild(message.buildId);
            this.setAddBloodLeftTime(message.addBloodLeftTime);
            this.setAddSpeedLeftTime(message.addSpeedLeftTime);
            this.dealProgress();
            this.dealSceneBuff();
            this.dealRevive();
            this.dealDead();
        };
        StageScenePersonPath.prototype.setPlayerBuffInfo = function (notice) {
        };
        StageScenePersonPath.prototype.dealRevive = function () {
        };
        StageScenePersonPath.prototype.dealDead = function () {
        };
        StageScenePersonPath.prototype.dealWonderlandRoleInfo = function (message) {
            this.setWonderlandRoleInfo(message);
            this.dealFightRoleInfo(message.posInfo);
            this.setBattleMode(message.posInfo.battleMode);
        };
        StageScenePersonPath.prototype.dealLeaguewarRoleInfo = function (message) {
            this.dealFightRoleInfo(message.posInfo);
        };
        StageScenePersonPath.prototype.dealZorkRoleInfo = function (message) {
            this.dealFightRoleInfo(message.posInfo);
            this.setBossHurt(message.bossHurt);
        };
        StageScenePersonPath.prototype.dealSceneBuff = function () {
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MACHINE_FASTER) {
                this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Fast, this.fasterTime);
                this.dealTips(zj.TableEnum.Enum.SceneBuffType.Fast, this.fasterTime / 1000);
            }
            else {
                if (this.fasterTime > 0) {
                    this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Fast, this.fasterTime);
                }
            }
            if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_MACHINE_ADDBLOOD) {
                this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.RecoverBlood, -1);
                var last = this.lastHpPercent;
                if (last <= 1) {
                    last = 1;
                }
                var cur = this.sceneHpPercent;
                if (cur <= 1) {
                    cur = 1;
                }
                this.dealTips(zj.TableEnum.Enum.SceneBuffType.RecoverBlood, Math.floor((cur - last)));
                if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_FRUIT_DOUBLE) {
                    this.dealTips(zj.TableEnum.Enum.SceneBuffType.CollectDouble, -1);
                }
                if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_FROZEN) {
                    this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime);
                    this.dealTips(zj.TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime / 1000);
                }
                if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BOMB) {
                    this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Bomb, -1);
                    var last_1 = this.lastHpPercent;
                    if (last_1 <= 1) {
                        last_1 = 1;
                    }
                    var cur_1 = this.sceneHpPercent;
                    if (cur_1 <= 1) {
                        cur_1 = 1;
                    }
                    this.dealTips(zj.TableEnum.Enum.SceneBuffType.Bomb, Math.floor((last_1 - cur_1)));
                }
            }
        };
        StageScenePersonPath.prototype.dealTips = function (type, num) {
        };
        StageScenePersonPath.prototype.setBattleMode = function (mode) {
            this.battleMode = mode;
        };
        StageScenePersonPath.prototype.setBossHurt = function (value) {
            this.bossHurt = value;
        };
        StageScenePersonPath.prototype.setBombLeftTime = function (time) {
            //秒
            this.bombLeftTime = time * 1000;
        };
        StageScenePersonPath.prototype.setAttackLeftTime = function (time) {
            //毫秒
            this.attackLeftTime = time;
        };
        StageScenePersonPath.prototype.dealAtkBoss = function () {
            if (zj.Gmgr.Instance.bInLoading == false) {
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                    if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_ATTACKBOSS) {
                        this.playSkill(this.scenePosInfo.kill_combo);
                        this.setKillTime(this.scenePosInfo.kill_time);
                    }
                }
            }
        };
        StageScenePersonPath.prototype.setKillTime = function (killTime) {
            this.killTime = killTime;
        };
        StageScenePersonPath.prototype.setDeclardIds = function (declareIds) {
            this.declareIds = {};
            for (var i = 0; i < declareIds.length; i++) {
                var key = declareIds[i].key;
                var value = declareIds[i].value;
                this.declareIds[key] = value * 1000;
            }
        };
        StageScenePersonPath.prototype.setObjectIds = function (objectIds) {
            this.objectIds = {};
            for (var i = 0; i < objectIds.length; i++) {
                var key = objectIds[i].key;
                var value = objectIds[i].value;
                this.objectIds[key] = value * 1000;
            }
        };
        //宣战时间结束并且进入战斗阶段
        StageScenePersonPath.prototype.isDeclareTimeEnd = function (key) {
            var tag = false;
            if (this.declareIds[key] != null && this.declareIds[key] <= 0) {
                tag = true;
            }
            if (this.objectIds[key] != null && this.objectIds[key] <= 0) {
                tag = true;
            }
            return tag;
        };
        //宣战关系是否成立
        StageScenePersonPath.prototype.isDeclareRelation = function (key) {
            //检测自己是和平模式
            //已经宣战 或 对方是杀戮模式
            //检测自己是战斗模式
            var tag = false;
            if (this.declareIds[key] != null) {
                tag = true;
            }
            if (this.objectIds[key] != null) {
                tag = true;
            }
            return tag;
        };
        StageScenePersonPath.prototype.updatePathWalk = function () {
            if (this.bRunAstar == false) {
                return;
            }
            if (this.path == null) {
                return;
            }
            var pos = this.path.currentWayPoint();
            var _a = this.converScreenPos(pos), screen_x = _a[0], screen_y = _a[1];
            var _b = this.judgeDir(screen_x, screen_y), dir = _b[0], walkDir = _b[1];
            if (walkDir != this.walkDir) {
                this.walkDir = walkDir;
            }
            var _c = this.getMapPos(), map_x = _c[0], map_y = _c[1];
            if (this.path.isArrivedCurrentPoint(this.pathWalkPos.setTo(map_x, map_y))) {
                this.path.goToNextWayPoint();
                if (this.path.finished() == true) {
                    this.endPath();
                }
                else {
                    this.goToWalk();
                }
            }
        };
        StageScenePersonPath.prototype.getMapPos = function () {
            return [0, 0];
        };
        //获得战斗模式
        StageScenePersonPath.prototype.getBattleMode = function () {
            return this.battleMode;
        };
        //获得联盟id
        StageScenePersonPath.prototype.getLegId = function () {
            return this.playerInfo.leagueId;
        };
        //刷新人物颜色
        StageScenePersonPath.prototype.flashTtfNameColor = function (color) {
            if (color != this.nameColor && this.ttfName != null) {
                this.nameColor = color;
                this.ttfName.textColor = color;
            }
        };
        StageScenePersonPath.prototype.loadChannelAni = function () {
            var _this = this;
            if (zj.Gmgr.Instance.layerId != zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                return;
            }
            this.channelCss = new eui.Group();
            this.nodeUp.addChild(this.channelCss);
            var ccitem = zj.TableClientAniUi.Item(301002);
            var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
            this.channelCss.removeChildren();
            this.channelCss.visible = false;
            zj.Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then(function (display) {
                _this.channelCss.addChild(display);
            });
        };
        StageScenePersonPath.prototype.updateChannelAni = function () {
            if (zj.Gmgr.Instance.layerId != zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                return;
            }
            if (this.channelCss != null) {
                if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_ATTACKBOSS) {
                    if (this.channelCss.visible == false) {
                        this.channelCss.visible = true;
                    }
                }
                else {
                    if (this.channelCss.visible == true) {
                        this.channelCss.visible = false;
                    }
                }
            }
        };
        StageScenePersonPath.prototype.loadFishAni = function () {
            if (this.playerInfo.id != zj.Game.PlayerInfoSystem.RoleID) {
                return;
            }
            this.fishCss = new eui.Group();
            this.nodeUp.addChild(this.fishCss);
            this.fishCss.visible = false;
        };
        StageScenePersonPath.prototype.adjustAniPos = function () {
            if (this.fishCss != null) {
                if (this.designation != null) {
                    this.fishCss.x = 0;
                    this.fishCss.y = -this.aniUpOffsetY - 100 - 20;
                }
                else {
                    this.fishCss.x = 0;
                    this.fishCss.y = -this.aniUpOffsetY - 65;
                }
            }
            if (this.channelCss != null) {
                if (this.designation != null) {
                    this.channelCss.x = 0;
                    this.channelCss.y = -this.aniUpOffsetY - 100 - 20;
                }
                else {
                    this.channelCss.x = 0;
                    this.channelCss.y = -this.aniUpOffsetY - 65;
                }
            }
        };
        StageScenePersonPath.prototype.procBattleTime = function (tick) {
            var rt = tick * 1000;
            for (var k in this.declareIds) {
                var v = this.declareIds[k];
                v = v - rt;
                if (v <= 0) {
                    v = 0;
                }
            }
            for (var k in this.objectIds) {
                var v = this.objectIds[k];
                v = v - rt;
                if (v <= 0) {
                    v = 0;
                }
            }
        };
        StageScenePersonPath.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procHp();
            this.procDieProtect(tick);
            this.procFastTime(tick);
            this.procInvincibleTime(tick);
            this.procBattleTime(tick);
            this.updateFish(null);
            this.updateChannelAni();
            this.procEffects(null);
            this.procHitEffects(null);
        };
        StageScenePersonPath.prototype.updateFish = function (args) {
            var _this = this;
            //有问题
            if (this.fishCss != null) {
                if (this.bInFish == 1) {
                    //下杆中
                    if (this.fishCss.visible == false) {
                        this.fishCss.visible = true;
                    }
                    if (this.pre_fish_state != 1) {
                        var ccitem = zj.TableClientAniUi.Item(301000);
                        var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                        this.fishCss.removeChildren();
                        zj.Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then(function (display) {
                            _this.fishCss.addChild(display);
                        });
                    }
                }
                else if (this.bInFish == 2) {
                    //可收杆
                    if (this.fishCss.visible == false) {
                        this.fishCss.visible = true;
                    }
                    if (this.pre_fish_state != 2) {
                        var ccitem = zj.TableClientAniUi.Item(301001);
                        var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                        this.fishCss.removeChildren();
                        zj.Game.DragonBonesManager.playAnimation(this, item.name, null, ccitem.index, 0).then(function (display) {
                            _this.fishCss.addChild(display);
                        });
                    }
                }
                else {
                    //钓鱼无状态
                    if (this.fishCss.visible == true) {
                        this.fishCss.visible = false;
                    }
                    if (this.pre_fish_state != 2 || this.pre_fish_state != 1) {
                        this.fishCss.removeChildren();
                    }
                }
            }
        };
        StageScenePersonPath.prototype.procHp = function () {
            if (this.bVisible == false) {
                return;
            }
            var hpP = 0;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                if (this.showHpCurFrame >= this.showHpMaxFrame) {
                    this.showHpCurFrame = this.showHpMaxFrame;
                }
                hpP = this.showHp - (this.showHp - this.sceneHpPercent) / this.showHpMaxFrame * this.showHpCurFrame;
                this.bWillFight = false;
            }
            else if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                if (this.bWillFight == true) {
                    hpP = this.lastHpPercent;
                }
                else {
                    if (this.sceneHpPercent < this.destHpPercent) {
                        this.sceneHpPercent = this.sceneHpPercent + this.recoveryHpProgress;
                        if (this.sceneHpPercent > this.destHpPercent) {
                            this.sceneHpPercent = this.destHpPercent;
                        }
                        hpP = this.sceneHpPercent;
                    }
                    else {
                        hpP = this.destHpPercent;
                    }
                }
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                hpP = 0;
            }
            if (hpP != this.uiHp && this.bloodBar != null) {
                this.uiHp = hpP;
                this.bloodBar.width = this.bloodBarWidth * hpP / 100;
                this.bloodBar.height = this.bloodBarHeight;
            }
        };
        StageScenePersonPath.prototype.resetMoveNet = function () {
        };
        StageScenePersonPath.prototype.beInScope = function (x, y) {
            var tag = false;
            var rect = this.rectBeInScope.setTo(this.x - this.bodyWidth / 2, this.y - this.bodyHeight, this.bodyWidth, this.bodyHeight);
            if (rect.containsPoint(this.posBeInScope.setTo(x, y))) {
                tag = true;
            }
            return tag;
        };
        StageScenePersonPath.prototype.getBodyCenter = function () {
            var p = new egret.Point(this.x, this.y + this.bodyHeight / 2);
            return p;
        };
        StageScenePersonPath.prototype.getVisibleRt = function () {
            return this.rectVisibleRt.setTo(this.x - this.bodyWidth / 2, this.y, this.bodyWidth, this.bodyHeight);
        };
        StageScenePersonPath.prototype.setJoinType = function (eType) {
            this.joinType = eType;
        };
        StageScenePersonPath.prototype.getJoinType = function (eType) {
            return this.joinType;
        };
        StageScenePersonPath.prototype.setPosState = function (eState) {
            this.posState = eState;
        };
        StageScenePersonPath.prototype.getPosState = function () {
            return this.posState;
        };
        StageScenePersonPath.prototype.procCurSkill = function (tick) {
            if (this.curSkill == null) {
                return true;
            }
            var tag = this.curSkill.getIsFinish();
            if (tag == true) {
                this.resetSkill();
                this.recoverOriginalState();
            }
            else {
                this.curSkill.update(tick);
            }
            return false;
        };
        StageScenePersonPath.prototype.resetSkill = function () {
            this.curSkill = null;
            this.curSkillIdx = zj.TableEnum.TableEnumOperate.Operate_None;
        };
        StageScenePersonPath.prototype.recoverOriginalState = function () {
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
        };
        StageScenePersonPath.prototype.procEffects = function (tick) {
            var i = 0;
            while (i < this.tableEffects.length) {
                var tEffect = this.tableEffects[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    this.tableEffects.splice(i, 1);
                }
                else {
                    tEffect.update(tick);
                    i = i + 1;
                }
            }
        };
        //处理命中特效	
        StageScenePersonPath.prototype.procHitEffects = function (tick) {
            var i = 0;
            while (i < this.tableHits.length) {
                var tEffect = this.tableHits[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    this.tableHits.splice(i, 1);
                }
                else {
                    tEffect.update(tick);
                    i = i + 1;
                }
            }
        };
        StageScenePersonPath.prototype.getEffectLayer = function (effect) {
            var follow = effect.getIsFollowRole();
            if (follow) {
                return this.nodeEffect;
            }
            else {
                var layerId = zj.Gmgr.Instance.layerId;
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                return scene.getEffectLayer(this);
            }
        };
        StageScenePersonPath.prototype.setCurSkill = function (index) {
            var tSkill = null;
            var tIndex = 0;
            if (index <= 0 || index > this.tableMagicSkills.length) {
                return false;
            }
            if (index == zj.TableEnum.Enum.ZorkSkill.Attack && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                return false;
            }
            tIndex = index;
            tSkill = this.tableMagicSkills[index];
            this.curSkillIdx = tIndex;
            this.curSkill = tSkill;
            return true;
        };
        StageScenePersonPath.prototype.playSkill = function (index) {
            if (this.setCurSkill(index) == true) {
                //减豆
                this.skillFollow(index);
                return true;
            }
            return false;
        };
        StageScenePersonPath.prototype.skillFollow = function (index) {
            if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_BOSS) {
                if (this.playerState != zj.EnumPlayerState.PLAYER_STATE_BOSS) {
                    this.changeDir(zj.TableEnum.TableEnumDir.Dir_Right);
                }
            }
            if (index == zj.TableEnum.Enum.ZorkSkill.Bomb) {
                var _a = zj.SkillCdMgr.Instance.isSkillExit(this.curSkill), tag = _a[0], cd = _a[1];
                this.reduceBean();
                if (cd != null && cd.isPause() == true) {
                    cd.setIsPause(false);
                    cd.openNext();
                }
            }
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Attack);
            this.curSkill.playRoleSkill();
        };
        StageScenePersonPath.prototype.dealHitEffect = function (hitId, hitX, hitY) {
            //let hit = new SkillHit()
        };
        StageScenePersonPath.prototype.dealHit = function (hitId) {
            if (hitId != -1) {
                var _a = this.getHitPos(), x = _a[0], y = _a[1];
                this.dealHitEffect(hitId, x, y);
            }
        };
        StageScenePersonPath.prototype.dealHurtValue = function (aType, value) {
            var _a = this.getHurtNumPos(), numX = _a[0], numY = _a[1];
            if (aType == 0) {
                this.creatHurtNum2(numX, numY, value);
            }
            else if (aType == zj.TableEnum.Enum.ZorkSkill.Bomb) {
                this.creatHurtNum3(numX, numY, value);
            }
            else if (aType == zj.TableEnum.Enum.ZorkSkill.Attack) {
                this.creatHurtNum(numX, numY, value);
            }
        };
        StageScenePersonPath.prototype.getHitPos = function () {
            var hitX = 0;
            var hitY = 0;
            function rand() {
                var r = zj.TsMtirand() % 2;
                if (r == 0) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            hitX = this.x + this.hitEffectOffsetNorX + zj.TsMtirand() % 30 * rand();
            hitY = this.y + this.hitEffectOffsetNorY + zj.TsMtirand() % 30 * rand();
            return [hitX, hitY];
        };
        StageScenePersonPath.prototype.addEffect = function (effect) {
            var follow = effect.getIsFollowRole();
            if (follow == true) {
                var tag = true; //this.getIsEffectFollowMe(effect);
                if (tag != true) {
                    this.tableEffects.push(effect);
                }
            }
            else {
                var layerId = zj.Gmgr.Instance.layerId;
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                scene.addEffect(effect);
            }
        };
        //删除特效
        StageScenePersonPath.prototype.clearEffects = function (force) {
            var i = 0;
            while (i < this.tableEffects.length) {
                var tEffect = this.tableEffects[i];
                if (force == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    this.tableEffects.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageScenePersonPath.prototype.creatHurtNum = function (baseX, baseY, hurtV) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.shanghainum1, hurtV, zj.ConstantConfig_CommonBattle.shanghainum1.w, zj.ConstantConfig_CommonBattle.shanghainum1.h, zj.ConstantConfig_CommonBattle.shanghainum1.offset);
            num.setPosition(baseX, baseY);
            num.start();
        };
        StageScenePersonPath.prototype.creatHurtNum2 = function (baseX, baseY, hurtV) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.baojinum, hurtV, zj.ConstantConfig_CommonBattle.baojinum.w, zj.ConstantConfig_CommonBattle.baojinum.h, zj.ConstantConfig_CommonBattle.baojinum.offset);
            num.setPosition(baseX, baseY);
            num.start();
        };
        StageScenePersonPath.prototype.creatHurtNum3 = function (baseX, baseY, hurtV) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.shanghainum3, hurtV, zj.ConstantConfig_CommonBattle.shanghainum3.w, zj.ConstantConfig_CommonBattle.shanghainum3.h, zj.ConstantConfig_CommonBattle.shanghainum3.offset);
            num.setPosition(baseX, baseY);
            num.start();
        };
        StageScenePersonPath.prototype.getHurtNumPos = function () {
            var numX = 0;
            var numY = 0;
            function rand() {
                var r = zj.TsMtirand() % 2;
                if (r == 0) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            numX = this.x + this.hurtNumOffsetNorX + zj.TsMtirand() % 30 * rand();
            numY = this.y + this.hurtNumOffsetNorY + zj.TsMtirand() % 30 * rand();
            return [numX, numY];
        };
        StageScenePersonPath.prototype.isBeanMax = function () {
            return zj.yuan3(this.curBeanNum == this.maxBeanNum, true, false);
        };
        StageScenePersonPath.prototype.isBeanEmpty = function () {
            return zj.yuan3(this.curBeanNum == 0, true, false);
        };
        StageScenePersonPath.prototype.addBean = function () {
            if (this.curBeanNum < this.maxBeanNum) {
                this.curBeanNum = this.curBeanNum + 1;
            }
        };
        StageScenePersonPath.prototype.reduceBean = function () {
            if (this.curBeanNum > 0) {
                this.curBeanNum = this.curBeanNum - 1;
            }
        };
        StageScenePersonPath.prototype.setKillCombo = function (killCombo) {
            this.killCombo = killCombo;
        };
        StageScenePersonPath.prototype.setCurBeanNum = function (num) {
            this.curBeanNum = num;
        };
        StageScenePersonPath.prototype.getCurBeanNum = function () {
            return this.curBeanNum;
        };
        StageScenePersonPath.prototype.handleTalentEffect_EntryTime = function () {
            return 0;
        };
        //获得人物炸弹技能
        StageScenePersonPath.prototype.getPressSkill = function () {
            return this.tableMagicSkills[zj.TableEnum.Enum.ZorkSkill.Bomb - 1];
        };
        return StageScenePersonPath;
    }(zj.StageScenePlayer));
    zj.StageScenePersonPath = StageScenePersonPath;
    __reflect(StageScenePersonPath.prototype, "zj.StageScenePersonPath");
})(zj || (zj = {}));
//# sourceMappingURL=StageScenePersonPath.js.map