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
    var StageScenePlayer = (function (_super) {
        __extends(StageScenePlayer, _super);
        function StageScenePlayer(node, order) {
            var _this = _super.call(this) || this;
            _this.tablePlayerBuffs = [];
            _this.tableMagicSkills = [];
            _this.tableEffects = [];
            _this.tableHits = [];
            _this.frameKv = (_a = {}, _a[1] = 12, _a[2] = 33, _a[3] = 55, _a[7] = -30, _a[8] = -25, _a[9] = -20, _a[10] = -13, _a[11] = -9, _a[12] = -3, _a);
            _this.rootNode = node;
            _this.nodeRoot = new eui.Group();
            _this.rootNode.addChild(_this.nodeRoot);
            _this.nodePos = new eui.Group();
            _this.nodeRoot.addChild(_this.nodePos);
            _this.nodeSpecial = new eui.Group();
            _this.nodeRoot.addChild(_this.nodeSpecial);
            _this.order = order;
            _this.saveOrder = order;
            _this.curScene = zj.StageSceneManager.Instance.GetCurScene();
            // 人物底层
            _this.nodeDown = new eui.Group();
            _this.nodePos.addChild(_this.nodeDown);
            // 人物基础   
            _this.nodeNormal = new eui.Group();
            _this.nodePos.addChild(_this.nodeNormal);
            // 标题
            _this.titleSpace = new eui.Group();
            _this.nodePos.addChild(_this.titleSpace);
            // 人物上层ui
            _this.nodeUp = new eui.Group();
            _this.nodePos.addChild(_this.nodeUp);
            // 上层layer
            _this.nodeEffect = new eui.Group();
            _this.nodePos.addChild(_this.nodeEffect);
            // 击打光效
            _this.nodeHit = new eui.Group();
            _this.nodeRoot.addChild(_this.nodeHit);
            //人物信息相关
            _this.playerState = zj.EnumPlayerState.PLAYER_STATE_NONE;
            _this.memberInfo = null;
            _this.playerInfo = null;
            _this.mapRoleId = 0;
            _this.name = null;
            _this.ePosition = zj.TableEnum.TablePositionType.POSITION_NONE;
            _this.bEnemy = false;
            _this.x = 0;
            _this.y = 0;
            _this.fp_dir = zj.TableEnum.TableEnumDir.Dir_None;
            _this.fpX = 0;
            _this.fpY = 0;
            _this.scale = 1.0;
            _this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
            _this.walkDir = zj.TableEnum.EnumDepthDir.Dir_None;
            _this.saveDir = zj.TableEnum.TableEnumDir.Dir_None;
            _this.state = zj.TableEnum.TableEnumBaseState.State_None;
            _this.otherState = zj.TableEnum.TableEnumOtherState.OtherState_None;
            _this.actionId = -1;
            _this.actionLastId = -1;
            _this.trans = 1;
            _this.targetPos = { x: 0, y: 0 };
            _this.moveDistance = 0;
            _this.verDistance = 0;
            _this.preMoveDis = 0;
            _this.preVerDis = 0;
            _this.path = null;
            _this.aniUpOffsetX = 0;
            _this.aniUpOffsetY = 0;
            _this.bodyWidth = 0;
            _this.bodyHeight = 0;
            // skill
            _this.tableMagicSkillIds = [];
            _this.tableMagicSkills = [];
            _this.tableEffects = [];
            _this.tableHits = [];
            _this.curSkill = null;
            _this.curSkillIdx = -1;
            // 动画相关
            _this.body = null;
            _this.bodySpxId = -1;
            _this.resafeParticleEffects = null; // 复活粒子特效
            _this.nameBoard = null;
            _this.ttfName = null;
            _this.nameColor = null;
            _this.ttfOffical = null;
            _this.ttfLv = null;
            _this.bloodBoard = null;
            _this.designation = null;
            _this.auraFront = null;
            _this.auraBack = null;
            _this.bloodBar = null;
            _this.leagueBoard = null;
            _this.ttfLeagueName = null;
            _this.ttfGroupName = null;
            _this.leagueStar = null;
            _this.progressBoard = null;
            _this.progressBar = null;
            // bool
            _this.bVisible = false;
            _this.bActLoop = false;
            _this.bBodyActEnd = false;
            _this.bRunTarget = false;
            _this.bRunAstar = false;
            _this.bInZone = false;
            _this.bInView = true;
            _this.bRevived = false;
            _this.bHidden = false;
            // talker
            _this.spriteTalk = null;
            _this.ttfTalk = null;
            _this.talkRect = null;
            _this.bTalkStay = false;
            _this.talkStayMax = zj.Helper.getRandom2(zj.ConstantConfig_LeagueHome.LEAGUE_CHAT_STAY_TIME, zj.ConstantConfig_LeagueHome.LEAGUE_CHAT_STAY_TIME * 2);
            _this.talkStayTime = 0;
            _this.talkTextTbl = {};
            _this.tableSceneBuffs = {};
            // fish
            _this.bInFish = 0;
            _this.fishCss = null;
            //led
            _this.commonLedAni = null;
            _this.ledIndex = -1;
            // fun
            _this.targetCB = null;
            _this.showCB = null;
            _this.endCB = null;
            _this.dieCB = null;
            // fight show
            _this.showFrame = 0;
            _this.showNum = 0;
            _this.showY = 0;
            _this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
            _this.showHpCurFrame = 0;
            _this.showHpRecord = 0;
            // scene notice data    
            _this.sceneHpPercent = 100;
            _this.lastHpPercent = 100;
            _this.destHpPercent = 100;
            _this.showHp = 100;
            _this.uiHp = -1;
            _this.recoveryHpProgress = 0;
            _this.dieProtectTime = 0;
            _this.dieStayMs = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_DIE_STAY_MS;
            _this.fasterTime = 0;
            _this.addBloodLeftTime = 0;
            _this.addSpeedLeftTime = 0;
            _this.invincibleTime = 0;
            _this.frozenTime = 0;
            // control build
            _this.bProgressing = false;
            _this.controlBuildId = 0;
            _this.controlFrame = 0;
            // league title
            _this.cacheOfficialId = null;
            _this.cacheName = null;
            _this.cacheLv = null;
            _this.officalFrame = 0;
            // zork skill    
            _this.maxBeanNum = 1;
            _this.curBeanNum = _this.maxBeanNum;
            // sound
            _this.press_sound_path = null;
            _this.kill_sound_path = null;
            // storage 
            _this.storageSpx = null;
            // buff 
            _this.tablePlayerBuffs = [];
            return _this;
            var _a;
        }
        StageScenePlayer.prototype.loadLedAni = function () {
            this.commonLedAni = zj.HunterSpineX(null, 1, null, zj.TableClientAniCssSource.Item(zj.UIConfig.UIConfig_RpgScene.ledEffect.jsonId).name)[0];
            this.commonLedAni.setVisibleSpx(false);
            this.nodeEffect.addChild(this.commonLedAni.spine);
        };
        StageScenePlayer.prototype.flashLedAni = function (action) {
            if (this.commonLedAni == null) {
                return;
            }
            if (action == -1) {
                this.ledIndex = -1;
                this.commonLedAni.setVisibleSpx(false);
            }
            else {
                this.commonLedAni.setVisibleSpx(true);
                if (action != this.ledIndex) {
                    this.ledIndex = action;
                    this.commonLedAni.stopAllActions();
                    this.commonLedAni.ChangeAction(zj.UIConfig.UIConfig_RpgScene.ledEffect.actionIds[action]);
                }
            }
        };
        StageScenePlayer.prototype.release = function () {
            var i = 0;
            while (i < this.tableEffects.length) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
                i = i + 1;
            }
            this.tableEffects = [];
            i = 0;
            while (i < this.tableHits.length) {
                zj.CC_SAFE_DELETE(this.tableHits[i]);
                i = i + 1;
            }
            this.tableHits = [];
            var nodeFun = function (body) {
                if (body && body.parent) {
                    body.parent.removeChild(body);
                }
            };
            if (this.fishCss) {
                this.fishCss.removeChildren();
            }
            if (this.channelCss) {
                this.channelCss.removeChildren();
            }
            if (this.auraBack && this.auraBack.parent) {
                this.auraBack.parent.removeChild(this.auraBack);
            }
            if (this.auraFront && this.auraBack.parent) {
                this.auraBack.parent.removeChild(this.auraFront);
            }
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            nodeFun(this.auraFront);
            nodeFun(this.auraBack);
            nodeFun(this.nameBoard);
            nodeFun(this.ttfName);
            nodeFun(this.ttfOffical);
            nodeFun(this.ttfLv);
            nodeFun(this.bloodBoard);
            nodeFun(this.designation);
            nodeFun(this.bloodBar);
            nodeFun(this.leagueBoard);
            nodeFun(this.ttfLeagueName);
            nodeFun(this.ttfGroupName);
            nodeFun(this.leagueStar);
            if (this.commonLedAni != null) {
                this.nodeEffect.removeChild(this.commonLedAni.spine);
                this.commonLedAni = null;
            }
            if (this.resafeParticleEffects != null) {
                this.nodeEffect.removeChild(this.resafeParticleEffects);
                this.resafeParticleEffects = null;
            }
            if (this.storageSpx != null) {
                this.storageSpx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
                this.nodeEffect.removeChild(this.storageSpx);
                this.storageSpx = null;
            }
            this.nodeRoot.removeChild(this.nodePos);
            this.nodeRoot.removeChild(this.nodeSpecial);
            this.nodeRoot.removeChild(this.nodeHit);
            this.rootNode.removeChild(this.nodeRoot);
        };
        StageScenePlayer.prototype.createPlayer = function (memberInfo, floor, x, y, dir, moveDis, verDis, ePosType, bEnemy) {
            this.setMemberInfo(memberInfo);
            this.setPlayerInfo(memberInfo.monarchbase);
            // todo
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageScenePlayer.prototype.createZorkPlayer = function (baseInfo, floor, x, y, dir, moveDis, verDis) {
            this.setPlayerInfo(baseInfo);
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageScenePlayer.prototype.commonCreate = function (floor, x, y, dir, moveDis, verDis) {
            this.init();
            this.changeScale();
            this.setFloor(floor);
            this.setRoot(x, y);
            this.setMoveDistance(moveDis);
            this.setVerDistance(verDis);
            this.changeDir(dir);
            this.setActLoop(true);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.procState(0);
        };
        StageScenePlayer.prototype.parseInfo = function () {
            var tbl = zj.TableItemPic.Table();
            this.mapRoleId = this.playerInfo.picId;
            this.mapRoleId = zj.PlayerVIPSystem.GetMapRoleInfo(this.playerInfo) || this.mapRoleId;
            this.name = this.playerInfo.name;
        };
        StageScenePlayer.prototype.init = function () {
            this.parseInfo();
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            this.loadDesignation();
            this.loadAura();
            this.loadNameTitle();
            this.loadSpeed();
            this.loadScale();
        };
        StageScenePlayer.prototype.initSpecial = function () {
            this.parseInfo();
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            this.loadDesignation();
            this.loadAura();
            this.loadLvTitle();
            this.loadNameTitle();
            this.loadLeagueNameTitle();
            this.loadSpeed();
            this.loadScale();
        };
        StageScenePlayer.prototype.resetBody = function (mapRoleId) {
            this.mapRoleId = mapRoleId;
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            this.loadScale();
            this.adjustAniPos();
            this.changeScale();
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.actionLastId = -1;
            this.procState(0);
            this.setRoot(this.x, this.y);
        };
        StageScenePlayer.prototype.adjustAniPos = function () {
        };
        StageScenePlayer.prototype.loadBody = function () {
            var _this = this;
            // [this.body] = HunterSpineX(0,this.scale,null,MapSceneLoading.BlackRole);
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            var scle = this.scale;
            this.bodySpxId = zj.TableMapRole.Item(this.mapRoleId).body_spx_id;
            if (this.bodySpxId != -1) {
                this.body = zj.HunterSpineX(this.bodySpxId, scle)[0];
                if (!this.body) {
                    this.body = zj.HunterSpineX(0, scle, null, zj.MapSceneLoading.BlackRole)[0];
                    var spineTable = zj.TableClientFightAniSpineSource.Item(this.bodySpxId);
                    zj.Game.DragonBonesManager.preloadDragonbone(zj.StageSceneManager.Instance.temporaryScene, spineTable.json)
                        .then(function () {
                        if (_this.body) {
                            _this.body.clearSpine();
                            _this.body = null;
                        }
                        _this.body = zj.HunterSpineX(_this.bodySpxId, scle)[0];
                        _this.nodeNormal.addChildAt(_this.body.spine, 2);
                        _this.actionId = -1;
                        _this.body.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
                        _this.titlePos();
                    })
                        .catch(function (error) {
                    });
                }
                this.nodeNormal.addChildAt(this.body.spine, 2);
                this.body.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
            }
            this.loadSlots();
        };
        StageScenePlayer.prototype.titlePos = function () {
            this.loadScale();
            this.setTitlePos(0, 0);
            this.adjustAniPos();
        };
        StageScenePlayer.prototype.updateSpineX = function (tick) {
            if (this.body != null) {
                this.body.UpdataAni(tick);
            }
        };
        StageScenePlayer.prototype.updateEndBody = function () {
            if (this.bBodyActEnd == true) {
                return;
            }
            if (this.body.IsActEnd()) {
                this.bBodyActEnd = true;
            }
        };
        //脚底黑圈
        StageScenePlayer.prototype.loadSlots = function () {
            if (this.shadow == null) {
                this.shadow = new eui.Image(zj.UIConfig.UIConfig_CommonBattle.common_shadow);
                this.nodeDown.addChild(this.shadow);
                this.shadow.x = -55;
                this.shadow.y = -10;
            }
        };
        StageScenePlayer.prototype.addSceneBuff = function (type, time) {
        };
        StageScenePlayer.prototype.updateSceneBuff = function (tick) {
            //let rt = tick * 1000;
            //for(let k in this.tableSceneBuffs)
        };
        StageScenePlayer.prototype.loadDB = function () {
            var instance = zj.TableMapRole.Item(this.mapRoleId);
            this.profession = instance.model_profession;
            this.aniUpOffsetX = instance.role_title_pos[0];
            this.aniUpOffsetY = instance.role_title_pos[1];
            this.bodyWidth = instance.body_size[0];
            this.bodyHeight = instance.body_size[1];
            this.hurtNumOffsetNorX = instance.hurt_num_offset_nor[0];
            this.hurtNumOffsetNorY = instance.hurt_num_offset_nor[1];
            this.hurtNumOffsetSpeX = instance.hurt_num_offset_spe[0];
            this.hurtNumOffsetSpeY = instance.hurt_num_offset_spe[1];
            this.hitEffectOffsetNorX = instance.hit_effect_offset_nor[0];
            this.hitEffectOffsetNorY = instance.hit_effect_offset_nor[1];
            this.hitEffectOffsetSpeX = instance.hit_effect_offset_spe[0];
            this.hitEffectOffsetSpeY = instance.hit_effect_offset_spe[1];
            this.roleAniOffsetNorUpX = instance.role_ani_offset_nor_up[0];
            this.roleAniOffsetNorUpY = instance.role_ani_offset_nor_up[1];
            this.roleAniOffsetSpeUpX = instance.role_ani_offset_spe_up[0];
            this.roleAniOffsetSpeUpY = instance.role_ani_offset_spe_up[1];
            this.offsetNorMidX = instance.offset_nor_mid[0];
            this.offsetNorMidY = instance.offset_nor_mid[1];
            this.tableMagicSkillIds = instance.xj_skill_id;
            var tableSound = zj.TableClientSoundResource.Table();
            var sound_id = instance.press_xuli_effect_sound;
            if (sound_id != -1) {
                this.press_sound_path = tableSound[sound_id].sound_path;
            }
            sound_id = instance.kill_xuli_effect_sound;
            if (sound_id != -1) {
                this.kill_sound_path = tableSound[sound_id].sound_path;
            }
        };
        StageScenePlayer.prototype.setMapRoleId = function (mapRoleId) {
            // if(TableMapRole.Item(mapRoleId) == null){
            // }
            this.mapRoleId = mapRoleId;
        };
        StageScenePlayer.prototype.loadNormalSpx = function () {
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND || zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND || zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS) {
                this.scale = zj.TableMapRole.Item(this.mapRoleId).body_scale;
                this.uiScale = this.scale * 1.1;
            }
            else {
                this.scale = 1.0;
                this.uiScale = 1.0;
            }
        };
        StageScenePlayer.prototype.loadSpeed = function () {
            this.moveSpeedX = StageScenePlayer.SP_DEFAULT_X; //0.35//common.league_scene_move_speed_x;
            this.moveSpeedY = StageScenePlayer.SP_DEFAULT_Y; //0.15//common.league_scene_move_speed_y;
        };
        StageScenePlayer.prototype.loadScale = function () {
            var bone_up_x = this.body.spine.armature.getBone("buff_up").global.x;
            var bone_up_y = this.body.spine.armature.getBone("buff_up").global.y;
            if (bone_up_y < 0) {
                bone_up_y = Math.abs(bone_up_y);
            }
            this.bodyHeight = this.uiScale * bone_up_y;
            this.aniUpOffsetY = this.bodyHeight + 10;
            this.bodyWidth = this.uiScale * this.bodyWidth;
        };
        StageScenePlayer.prototype.loadBloodBarBoard = function () {
            if (this.hpProgressVisible()) {
                var board = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.roleBloodBoard);
                board.anchorOffsetX = 77 / 2;
                board.anchorOffsetY = 6 / 2;
                this.bloodBoard = board;
                this.titleSpace.addChild(this.bloodBoard);
            }
        };
        StageScenePlayer.prototype.loadBloodBarProgress = function (path) {
            var _this = this;
            if (this.hpProgressVisible()) {
                var bar = new eui.Image(path);
                bar.addEventListener(egret.Event.COMPLETE, function (e) {
                    ///在图片的载入完成事件中获得图片的宽高。
                    var img = e.currentTarget;
                    //egret.log( "宽度:" + img.width,"高度:" + img.height);
                    _this.bloodBarWidth = img.width;
                    _this.bloodBarHeight = img.height;
                    // img.anchorOffsetY = img.height / 2;
                }, this);
                this.barPath = path;
                this.bloodBar = bar;
                this.titleSpace.addChild(this.bloodBar);
            }
        };
        StageScenePlayer.prototype.loadBloodBar = function () {
            this.loadBloodBarBoard();
            this.loadBloodBarProgress(zj.yuan3(this.bEnemy == false, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar));
        };
        //头顶称号ui_wonderland_BurHunterBlood_png
        StageScenePlayer.prototype.loadDesignation = function () {
            var _this = this;
            if (this.playerInfo == null) {
                return;
            }
            // else if (this.playerInfo.titleId == null) {
            // 	return;
            // }
            var pathPic = null;
            var pathBG = "";
            var scale = 0.8;
            // 暂时无称号逻辑，称号显示执照的N星猎人图标
            // let titleId = this.playerInfo.titleId;
            // if(titleId){// 称号图片
            // 	let table = TableItemTitle.Item(this.playerInfo.titleId);
            // 	pathPic = table ? table.logo : null;
            // }
            if (!pathPic) {
                var licencelevel = this.playerInfo.licenceLevel;
                pathPic = "ui_license_examination_WordsTitle" + licencelevel + "_png";
                if (licencelevel == 0) {
                    pathBG = ""; //UIConfig.UIConfig_Task.board[2];
                    pathPic = "ui_title_titlebig_titlebig1_png";
                    scale = 1;
                }
                else if (licencelevel > zj.CommonConfig.licence_max_level) {
                    pathBG = zj.UIConfig.UIConfig_Task.board[3];
                }
                else {
                    pathBG = zj.UIConfig.UIConfig_Task.board[1];
                }
            }
            // let table = TableItemTitle.Item(this.playerInfo.titleId);
            // let path = table ? table.logo : null;
            // if (path == "" || path == null) {
            // 	return;
            // }
            // 如果玩家猎人星级为0，则显示新手猎人
            if (!this.designation) {
                this.designation = new eui.Group();
                this.designation.width = 160;
                this.designation.height = 62;
                this.designation.anchorOffsetX = this.designation.width / 2;
                this.designation.anchorOffsetY = this.designation.height / 2;
            }
            if (!this.titleBG) {
                this.titleBG = new eui.Image(); // 称号底图
                this.titleBG.horizontalCenter = "0";
                this.titleBG.verticalCenter = "0";
                this.designation.addChild(this.titleBG);
            }
            this.titleBG.source = pathBG;
            if (!this.titlePic) {
                this.titlePic = new eui.Image();
                this.titlePic.addEventListener(egret.Event.COMPLETE, function (e) {
                    _this.setTitlePos(0, 0);
                }, this);
                this.titlePic.horizontalCenter = "0";
                this.titlePic.verticalCenter = "0";
                this.designation.addChild(this.titlePic);
            }
            this.titlePic.scaleX = this.titlePic.scaleY = scale;
            this.titlePic.source = pathPic;
            // let designation = new eui.Image(pathPic);
            // designation.addEventListener(egret.Event.COMPLETE, (e) => {
            // 	///在图片的载入完成事件中获得图片的宽高。
            // 	let img: eui.Image = e.currentTarget;
            // 	//egret.log( "宽度:" + img.width,"高度:" + img.height);
            // 	img.anchorOffsetX = img.width / 2;
            // 	img.anchorOffsetY = img.height / 2;
            // 	this.setTitlePos(0, 0);
            // }, this);
            // this.designation = designation;
            this.titleSpace.addChild(this.designation);
        };
        //脚底光环
        StageScenePlayer.prototype.loadAura = function () {
            var _this = this;
            if (this.auraBack) {
                this.nodeNormal.removeChild(this.auraBack);
                this.auraBack = null;
            }
            if (this.auraFront) {
                this.nodeNormal.removeChild(this.auraFront);
                this.auraFront = null;
            }
            if (this.playerInfo == null || this.playerInfo.haloId == null) {
                return;
            }
            //光环 是否生效
            if ((this.curScene.sceneType != message.ESceneType.SCENE_TYPE_WONDERLAND && this.curScene.sceneType != message.ESceneType.SCENE_TYPE_DARKLAND) ||
                this.playerInfo.haloId == 0 || !zj.TableHalo.Item(this.playerInfo.haloId)) {
                return;
            }
            var haloTbl = zj.TableHalo.Item(this.playerInfo.haloId);
            var auraCssIdFront = haloTbl.halo_front_aniId;
            var auraCssIdBack = haloTbl.halo_back_aniId;
            if (auraCssIdFront != null) {
                var ccitem = zj.TableClientAniUi.Item(auraCssIdFront);
                var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                var name_1 = item.name + "_" + item.number;
                zj.Game.DragonBonesManager.playAnimation(this, name_1, null, ccitem.index, 0).then(function (display) {
                    _this.auraFront = display;
                    _this.nodeNormal.addChildAt(_this.auraFront, 1);
                });
            }
            if (auraCssIdBack != null) {
                var ccitem = zj.TableClientAniUi.Item(auraCssIdBack);
                var item = zj.TableClientAniCssSource.Item(ccitem.css_id);
                var name_2 = item.name + "_" + item.number;
                zj.Game.DragonBonesManager.playAnimation(this, name_2, null, ccitem.index, 0).then(function (display) {
                    _this.auraBack = display;
                    _this.nodeNormal.addChildAt(_this.auraBack, 0);
                });
            }
        };
        StageScenePlayer.prototype.flashBarTexture = function (path) {
            if (this.barPath != path && this.bloodBar != null) {
                this.barPath = path;
                var rt = { width: this.bloodBar.width, height: this.bloodBar.height };
                this.bloodBar.source = path;
                this.bloodBar.width = rt.width;
                this.bloodBar.height = rt.height;
            }
        };
        StageScenePlayer.prototype.loadProgressBar = function () {
            if (this.hpProgressVisible()) {
                var board = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.roleProgressBoard);
                board.anchorOffsetX = 77 / 2;
                board.anchorOffsetY = 6 / 2;
                board.visible = false;
                this.progressBoard = board;
                this.titleSpace.addChild(this.progressBoard);
                var bar = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.roleBuildProgressBar);
                bar.anchorOffsetX = 77 / 2;
                bar.anchorOffsetY = 6 / 2;
                bar.visible = false;
                this.progressBarWidth = bar.width;
                this.progressBarHeight = bar.height;
                this.progressBar = bar;
                this.titleSpace.addChild(this.progressBar);
            }
        };
        StageScenePlayer.prototype.hpProgressVisible = function () {
            return !this.curScene.isMainCity;
        };
        StageScenePlayer.prototype.loadNameBoard = function () {
            var pic = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.sceneNameBoard);
            pic.anchorOffsetX = 158 / 2;
            pic.anchorOffsetY = 27 / 2;
            this.nameBoard = pic;
            this.titleSpace.addChild(this.nameBoard);
        };
        StageScenePlayer.prototype.loadNameTitle = function () {
            this.cacheName = this.name;
            this.ttfName = new eui.Label("Lv" + this.playerInfo.level + " " + this.name);
            this.ttfName.size = 20;
            this.ttfName.bold = true;
            var _color = this.getNameColor();
            this.nameColor = _color;
            this.ttfName.textColor = _color;
            this.ttfName.anchorOffsetY = this.ttfName.height / 2;
            this.titleSpace.addChild(this.ttfName);
            this.setNameStroke(this.ttfName);
        };
        StageScenePlayer.prototype.getNameColor = function () {
            return 0x000000;
        };
        StageScenePlayer.prototype.setNameStroke = function (lbName) {
            lbName.strokeColor = zj.ConstantConfig_Common.Color.wonderland_color.stroke;
            lbName.stroke = 1;
        };
        StageScenePlayer.prototype.loadLvTitle = function () {
            this.cacheLv = this.playerInfo.level;
            var _text = ""; //Lv" + this.playerInfo.level;
            this.ttfLv = new eui.Label(_text);
            this.ttfLv.size = 20;
            this.ttfLv.bold = true;
            this.ttfLv.textColor = this.getNameColor(); //ConstantConfig_Common.Color.white;
            this.ttfLv.anchorOffsetY = this.ttfLv.height / 2;
            this.titleSpace.addChild(this.ttfLv);
            this.setNameStroke(this.ttfLv);
        };
        StageScenePlayer.prototype.loadLeagueBoard = function () {
            var path = null;
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND || zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_DARKLAND) {
                path = zj.UIConfig.UIConfig_LeagueWarScene.sceneNameBoard;
            }
            else {
                path = zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, "", ""); //UIConfig.UIConfig_LeagueWarScene.leftLeagueNameBoard
            }
            var board = new eui.Image(path);
            board.addEventListener(egret.Event.COMPLETE, function (e) {
                ///在图片的载入完成事件中获得图片的宽高。
                var img = e.currentTarget;
                //egret.log( "宽度:" + img.width,"高度:" + img.height);
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
            }, this);
            this.leagueBoard = board;
            this.titleSpace.addChild(this.leagueBoard);
        };
        StageScenePlayer.prototype.getttfLeagueName = function () {
            var ttfLeagueName = new eui.Label(this.playerInfo.leagueName);
            ttfLeagueName.size = 20;
            ttfLeagueName.bold = true;
            ttfLeagueName.textColor = zj.ConstantConfig_Common.Color.rpg_color.league_title_color;
            ttfLeagueName.anchorOffsetY = ttfLeagueName.height / 2;
            this.setNameStroke(ttfLeagueName);
            return ttfLeagueName;
        };
        StageScenePlayer.prototype.reloadLeagueNameTitle = function () {
            var _this = this;
            if (this.ttfLeagueName) {
                if (this.ttfLeagueName.parent) {
                    this.ttfLeagueName.parent.removeChild(this.ttfLeagueName);
                }
                this.ttfLeagueName = null;
            }
            if (this.leagueStar) {
                if (this.leagueStar.parent) {
                    this.leagueStar.parent.removeChild(this.leagueStar);
                }
                this.leagueStar = null;
            }
            if (this.playerInfo.leagueId == 0) {
                return;
            }
            this.ttfLeagueName = this.getttfLeagueName();
            this.titleSpace.addChild(this.ttfLeagueName);
            egret.setTimeout(function () {
                _this.setTitlePos(0, 0);
            }, this, 50);
        };
        StageScenePlayer.prototype.loadLeagueNameTitle = function () {
            if (this.playerInfo.leagueId == 0) {
                return;
            }
            this.ttfLeagueName = this.getttfLeagueName();
            this.titleSpace.addChild(this.ttfLeagueName);
            if (this.playerInfo.matchScore == null) {
                return;
            }
            var starPath = zj.Helper.GetSegmentStar(this.playerInfo.matchScore, null);
            if (starPath == null) {
                return;
            }
            var leagueStar = new eui.Image(starPath);
            leagueStar.addEventListener(egret.Event.COMPLETE, function (e) {
                ///在图片的载入完成事件中获得图片的宽高。
                var img = e.currentTarget;
                //egret.log( "宽度:" + img.width,"高度:" + img.height);
                img.anchorOffsetX = img.width;
                img.anchorOffsetY = img.height / 2;
            }, this);
            leagueStar.scaleX = leagueStar.scaleY = 0.45;
            this.leagueStar = leagueStar;
            this.titleSpace.addChild(this.leagueStar);
        };
        StageScenePlayer.prototype.loadGroupNameTitle = function () {
            if (this.playerInfo.group_name == "" || this.curScene.sceneType != message.ESceneType.SCENE_TYPE_DARKLAND) {
                return;
            }
            var groupStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(this.playerInfo.group_name, "&", false), zj.singLecraft.decodeGroupName(this.playerInfo.group_name, "&", true));
            this.ttfGroupName = new eui.Label(groupStr);
            this.ttfGroupName.size = 20;
            this.ttfGroupName.bold = true;
            this.ttfGroupName.textColor = zj.ConstantConfig_Common.Color.rpg_color.league_title_color;
            this.ttfGroupName.anchorOffsetX = this.ttfGroupName.width / 2;
            this.ttfGroupName.anchorOffsetY = this.ttfGroupName.height / 2;
            this.titleSpace.addChild(this.ttfGroupName);
        };
        StageScenePlayer.prototype.loadLeagueTitle = function (id) {
            if (this.memberInfo == null) {
                return;
            }
            var officalId = this.memberInfo.officialId;
            this.cacheOfficialId = officalId;
            this.ttfOffical = null;
            if (officalId <= message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL || officalId >= message.ELeagueOfficial.LEAGUE_OFFICIAL_END) {
                return;
            }
            this.ttfOffical = new eui.Label(zj.TextsConfig.TextConfig_League.officalName[officalId]);
            this.ttfOffical.size = 20;
            this.ttfOffical.bold = true;
            this.ttfOffical.textColor = zj.ConstantConfig_Common.Color.league_color.offical_color[officalId];
            this.ttfOffical.anchorOffsetY = this.ttfOffical.height / 2;
            this.titleSpace.addChild(this.ttfOffical);
        };
        StageScenePlayer.prototype.loadStorageSpx = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_xuli;
            var armature = zj.HunterSpineX(name, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            armature.setVisibleSpx(false);
            this.nodeEffect.addChild(armature.spine);
            armature.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
            this.storageSpx = armature;
        };
        StageScenePlayer.prototype.animationTimeEvent = function () {
            this.storageSpx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
            this.storageSpx.clearSpine();
            this.storageSpx = null;
        };
        StageScenePlayer.prototype.Update = function (tick) {
            this.updateZone();
            this.updateSpineX(tick);
            this.updateEndBody();
            this.procPlayerBuff(tick);
            this.procState(tick);
            // //this.procResafeEffect();
            // this.updateSceneBuff(tick);
        };
        StageScenePlayer.prototype.endWillFight = function () {
            this.bWillFight = false;
        };
        StageScenePlayer.prototype.setSceneHpPercent = function (hpPercent, recoveryHp) {
            this.lastHpPercent = this.sceneHpPercent;
            //this.sceneHpPercent = hpPercent * 100;
            this.sceneHpPercent = recoveryHp * 100;
            this.destHpPercent = hpPercent * 100;
            this.recoveryHpProgress = (hpPercent - recoveryHp) * 100 / 20;
            if (zj.Gmgr.Instance.bInLoading == false) {
                if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLE
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD
                    || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                    this.showHp = this.lastHpPercent;
                    this.bWillFight = true;
                    if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLE) {
                        if (this.sceneHpPercent > 0) {
                            this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
                        }
                        else {
                            this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
                        }
                    }
                    else if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                        this.showHpMaxFrame = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
                    }
                }
                else {
                    this.bWillFight = false;
                    this.showHp = this.sceneHpPercent;
                }
            }
        };
        StageScenePlayer.prototype.setInvincibleTime = function (time) {
            this.invincibleTime = time * 1000;
        };
        StageScenePlayer.prototype.setDieProtectTime = function (time) {
            this.dieProtectTime = time * 1000;
        };
        StageScenePlayer.prototype.setFasterTime = function (time) {
            this.fasterTime = time * 1000;
        };
        StageScenePlayer.prototype.setFrozenTime = function (time) {
            this.frozenTime = time * 1000;
        };
        StageScenePlayer.prototype.setAddBloodLeftTime = function (time) {
            this.addBloodLeftTime = time * 1000;
        };
        StageScenePlayer.prototype.setAddSpeedLeftTime = function (time) {
            this.addSpeedLeftTime = time * 1000;
        };
        StageScenePlayer.prototype.setControlBuild = function (buildId) {
            this.controlBuildId = buildId;
        };
        //复活动画
        StageScenePlayer.prototype.createDeadCss = function (x, y, cb) {
        };
        StageScenePlayer.prototype.reSafe = function () {
            var tmp = function () {
            };
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_GetUp);
            this.createDeadCss(this.x, this.y, tmp);
        };
        StageScenePlayer.prototype.isFightShowing = function () {
            var tag = true;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                tag = false;
            }
            return tag;
        };
        StageScenePlayer.prototype.procPlayerBuff = function (tick) {
            var i = 0;
            while (i < this.tablePlayerBuffs.length) {
                var tBuff = this.tablePlayerBuffs[i];
                var bFinish = tBuff.getIsFinish();
                if (bFinish == true) {
                    this.deleteBuff(i);
                }
                else {
                    tBuff.update(tick);
                    i = i + 1;
                }
            }
        };
        StageScenePlayer.prototype.newBuff = function (buff_type, buff_time, buff_value) {
            //生成此类buff
        };
        StageScenePlayer.prototype.deleteBuff = function (index) {
        };
        StageScenePlayer.prototype.procOtherCurve = function (tick) {
            return false;
        };
        StageScenePlayer.prototype.procState = function (tick) {
            var tag;
            if (this.state == zj.TableEnum.TableEnumBaseState.State_None) {
                tag = this.procStateNone(tick);
            }
            else if (this.state == zj.TableEnum.TableEnumBaseState.State_Walk) {
                this.updateTargetWalk();
                this.updatePathWalk();
                tag = this.procStateWalk(tick);
            }
            this.procActId();
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Appear) {
                this.procOtherNone(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Curve) {
                this.procOtherAppear(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Curve) {
                this.procOtherCurve(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt) {
                this.procOtherHurt(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp) {
                this.procOtherStirUp(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirDown) {
                this.procOtherStirDown(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                this.procOtherFallDown(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                this.procOtherDie(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                this.procOtherGetUp(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk) {
                this.procOtherFightShow(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                this.procOtherFightShow(tick);
            }
            else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                this.procCurSkill(tick);
            }
            this.procActId();
        };
        StageScenePlayer.prototype.procCurSkill = function (tick) {
        };
        StageScenePlayer.prototype.procStateNone = function (tick) {
            false;
        };
        StageScenePlayer.prototype.procStateWalk = function (tick) {
            var rt = 0.03 * 1000; //tick * 1000;
            var ratio_x = 0;
            var ratio_y = 0;
            if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Left_Up) {
                ratio_x = -1;
                ratio_y = -1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Left_Down) {
                ratio_x = -1;
                ratio_y = 1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Right_Up) {
                ratio_x = 1;
                ratio_y = -1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Right_Down) {
                ratio_x = 1;
                ratio_y = 1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Down) {
                ratio_y = 1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Up) {
                ratio_y = -1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Left) {
                ratio_x = -1;
            }
            else if (this.walkDir == zj.TableEnum.EnumDepthDir.Dir_Right) {
                ratio_x = 1;
            }
            var bseSpeed = 1; //基本速度
            var auraSpeed = 0; // 光环加成速度
            var fastSpeed = zj.yuan3(this.fasterTime > 0, zj.ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - bseSpeed, 0);
            if ((this.playerInfo.haloId != null) && (this.playerInfo.haloId != 0 && zj.PlayerVIPSystem.HaloItem(this.playerInfo.haloId) != null) &&
                (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND || this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND)) {
                auraSpeed = zj.PlayerVIPSystem.HaloItem(this.playerInfo.haloId).scene_speed_add;
            }
            var totalSpeed = bseSpeed + auraSpeed + fastSpeed;
            this.faster_ratio = totalSpeed;
            this.moveMap(this.moveSpeedX * ratio_x * rt * this.faster_ratio, this.moveSpeedY * ratio_y * rt * this.faster_ratio);
            this.setPos(this.x, this.y);
            return false;
        };
        StageScenePlayer.prototype.procOtherNone = function (tick) {
        };
        StageScenePlayer.prototype.procOtherStirUp = function (tick) {
            var rt = tick * 1000;
            var distance = 0;
            distance = this.stirUpSpeed * rt;
            this.moveMap(0, distance);
            this.stirUpSpeed = this.stirUpSpeed - zj.ConstantConfig_RoleBattle.GRAVITY * rt;
            if (this.stirUpSpeed <= 0) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirDown);
                this.stirUpSpeed = 0;
            }
            this.setPosY(this.y);
            if (this.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                distance = -this.stirSpeedX * rt;
            }
            else {
                distance = this.stirSpeedX * rt;
            }
            this.moveMap(distance, 0);
            this.setPosX(this.x);
            return false;
        };
        StageScenePlayer.prototype.procOtherStirDown = function (tick) {
            var rt = tick * 1000;
            var distance = 0;
            distance = this.stirUpSpeed * rt;
            this.moveMap(0, -distance);
            if (parseInt(this.y) >= parseInt(this.showY)) {
                this.y = this.showY;
                this.stirUpSpeed = this.stirUpSpeed * zj.ConstantConfig_RoleBattle.STIR_UP_RATIO_SPEC;
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_FallDown);
                this.setPosY(this.y);
                return true;
            }
            this.setPosY(this.y);
            this.stirUpSpeed = this.stirUpSpeed + zj.ConstantConfig_RoleBattle.GRAVITY * rt;
            if (this.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                distance = -this.stirSpeedX * rt;
            }
            else {
                distance = this.stirSpeedX * rt;
            }
            this.moveMap(distance, 0);
            this.setPosX(this.x);
            return false;
        };
        StageScenePlayer.prototype.procOtherFallDown = function (tick) {
            var rt = tick * 1000;
            var distance = 0;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            return false;
        };
        StageScenePlayer.prototype.procOtherDie = function (tick) {
            if (this.body == null) {
                return true;
            }
            var bEnd = this.isBodyActEnd();
            if (bEnd == true) {
                if (this.dieCB != null) {
                    this.dieCB();
                    this.dieCB = null;
                }
            }
            return false;
        };
        StageScenePlayer.prototype.procDieProtect = function (tick) {
            var rt = tick * 1000;
            if (this.dieProtectTime != 0) {
                this.dieProtectTime = this.dieProtectTime - rt;
                if (this.dieProtectTime <= 0) {
                    this.dieProtectTime = 0;
                }
            }
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die && this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_GetUp);
            }
        };
        StageScenePlayer.prototype.procFastTime = function (tick) {
            var rt = tick * 1000;
            this.fasterTime = this.fasterTime - rt;
            if (this.fasterTime <= 0) {
                this.fasterTime = 0;
            }
        };
        StageScenePlayer.prototype.procFrozenTime = function (tick) {
            var rt = tick * 1000;
            this.frozenTime = this.frozenTime - rt;
            if (this.frozenTime <= 0) {
                this.frozenTime = 0;
            }
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None && this.frozenTime > 0 && (this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen] == null || (this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].finish == true))) {
                this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime);
            }
        };
        StageScenePlayer.prototype.endFrozen = function () {
            if ((this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].finish == false)) {
                this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].continueTime = 0;
                this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].finish = true;
                this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Frozen].spx.setVisible(false);
            }
        };
        StageScenePlayer.prototype.procInvincibleTime = function (tick) {
            var rt = tick * 1000;
            this.invincibleTime = this.invincibleTime - rt;
            if (this.invincibleTime <= 0) {
                this.invincibleTime = 0;
            }
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Die && this.dieProtectTime <= 0 && this.invincibleTime > 0 && (this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Invincible] == null || (this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Invincible] != null && this.tableSceneBuffs[zj.TableEnum.Enum.SceneBuffType.Invincible].finish == true))) {
                this.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.Invincible, this.invincibleTime);
            }
        };
        StageScenePlayer.prototype.procCooling = function (tick) {
            var rt = tick * 1000;
            this.addBloodLeftTime = this.addBloodLeftTime - rt;
            if (this.addBloodLeftTime <= 0) {
                this.addBloodLeftTime = 0;
            }
            this.addSpeedLeftTime = this.addSpeedLeftTime - rt;
            if (this.addSpeedLeftTime <= 0) {
                this.addSpeedLeftTime = 0;
            }
        };
        StageScenePlayer.prototype.dealProgress = function () {
            if (this.controlBuildId > 0 && this.bProgressing == false) {
                this.bProgressing = true;
                this.controlFrame = 0;
                //if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR){
                if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND || this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                    if (this.curScene.tableTrees[this.controlBuildId] != null) {
                        var preTime = this.curScene.tableTrees[this.controlBuildId].info.collection_time * 1000;
                        var reduceTime = zj.Adviserdb.PassiveGrassTime(this.scenePosInfo.roleBase.petInfo) * 1000;
                        var actualTime = (preTime - reduceTime) > 0 && (preTime - reduceTime) || 0;
                        this.controlMaxFrame = actualTime - 500;
                    }
                    else {
                        this.controlMaxFrame = zj.ConstantConfig_RoleBattle.CONTROL_BUILD_MAX_TIME;
                    }
                    this.controlType = zj.TableEnum.Enum.RpgControlType.Tree;
                    if (this.progressBar != null) {
                        this.progressBar.source = zj.UIConfig.UIConfig_LeagueWarScene.roleCollectProgressBar;
                    }
                }
                this.startControl();
                this.resetMoveNet();
            }
            if (this.bProgressing == true && this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            if (this.bProgressing == true && this.controlBuildId == 0) {
                this.endProgress();
            }
        };
        StageScenePlayer.prototype.startControl = function () {
        };
        StageScenePlayer.prototype.resetMoveNet = function () {
        };
        StageScenePlayer.prototype.endProgress = function () {
            var b_break = false;
            if (this.bProgressing == true) {
                this.bProgressing = false;
                this.endControl();
                b_break = true;
            }
            return b_break;
        };
        StageScenePlayer.prototype.endControl = function () {
        };
        StageScenePlayer.prototype.procProgress = function (tick) {
            if (this.bProgressing == true) {
                var rt = tick * 1000;
                this.controlFrame = this.controlFrame + rt;
                if (this.controlFrame >= this.controlMaxFrame) {
                    this.controlFrame = this.controlFrame - this.controlMaxFrame;
                    if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
                        this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                        this.endProgress();
                    }
                }
                if (this.progressBar) {
                    this.progressBar.width = this.controlFrame * this.progressBarWidth / this.controlMaxFrame;
                    this.progressBar.height = this.progressBarHeight;
                }
            }
        };
        StageScenePlayer.prototype.procOtherAppear = function (tick) {
            var rt = tick * 1000;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageScenePlayer.prototype.procOtherHurt = function (tick) {
            var rt = tick * 1000;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageScenePlayer.prototype.procOtherGetUp = function (tick) {
            if (this.body == null) {
                return true;
            }
            var bEnd = this.isBodyActEnd();
            if (bEnd == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageScenePlayer.prototype.endFightShow = function () {
        };
        StageScenePlayer.prototype.procOtherFightShow = function (tick) {
            //攻击者置为0
            //被打者置为20
            if (this.showFrame >= 38) {
                this.showFrame = 0;
                this.showNum = this.showNum + 1;
            }
            var _a = this.getPos(), x = _a[0], y = _a[1];
            if (this.showFrame == 0) {
                this.changeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
            }
            else if (this.showFrame == 6) {
                this.changeAction(zj.TableEnum.TableEnumBaseState.State_None);
            }
            else if (this.showFrame == 15) {
                var max = zj.yuan3(this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk && Math.floor(this.sceneHpPercent) > 0, zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1, zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM);
                if (this.showNum >= max) {
                    if (this.sceneHpPercent > 0) {
                        this.endFightShow();
                    }
                }
            }
            else if (this.showFrame == 23) {
                this.changeAction(zj.TableEnum.TableEnumOtherState.OtherState_Hurt);
            }
            else if (this.showFrame == 24) {
                this.showHpCurFrame = this.showHpCurFrame + 1;
                var max = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
                if (this.showNum >= max) {
                    if (this.sceneHpPercent <= 0) {
                        this.showY = this.y;
                        this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                        this.stirSpeedX = 0;
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                        if (this.showCB != null) {
                            this.showCB();
                            this.showCB = null;
                        }
                        if (this.endCB != null) {
                            this.endCB();
                            this.endCB = null;
                        }
                    }
                }
            }
            else if (this.showFrame == 31) {
                this.changeAction(zj.TableEnum.TableEnumBaseState.State_None);
            }
            else {
                if (this.frameKv[this.showFrame] != null) {
                    var dis = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Right, this.frameKv[this.showFrame], -1 * this.frameKv[this.showFrame]);
                    this.setPosX(x + dis);
                }
            }
            this.showFrame = this.showFrame + 1;
        };
        StageScenePlayer.prototype.isSelf = function () {
            if (this.playerInfo && this.playerInfo.id) {
                return this.playerInfo.id == zj.Game.PlayerInfoSystem.RoleID;
            }
            return false;
        };
        StageScenePlayer.prototype.isAgreeEnter = function () {
            return this.playerInfo && this.playerInfo.agree_enter;
        };
        StageScenePlayer.prototype.setPlayerVisible = function (visible) {
            this.nodeRoot.visible = visible && this.isAgreeEnter();
        };
        StageScenePlayer.prototype.isStateWalk = function () {
            return this.state == zj.TableEnum.TableEnumBaseState.State_Walk;
        };
        StageScenePlayer.prototype.changeState = function (state) {
            if (this.state != state) {
                this.state = state;
            }
            if (state == zj.TableEnum.TableEnumBaseState.State_None) {
                var aaa = void 0;
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        StageScenePlayer.prototype.changeOtherState = function (otherState) {
            if (this.otherState == otherState) {
                return;
            }
            if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                this.changeOtherNone();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Run) {
                this.changeOtherRun();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Appear) {
                this.changeOtherAppear();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Curve) {
                this.changeOtherCurve();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt) {
                this.changeOtherHurt();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp) {
                this.changeOtherStirUp();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirDown) {
                this.changeOtherStirDown();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                this.changeOtherFallDown();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                this.changeOtherDie();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                this.changeOtherGetUp();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk) {
                this.changeOtherFightShowAtk();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                this.changeOtherFightShowBeAtk();
            }
            this.otherState = otherState;
        };
        StageScenePlayer.prototype.changeOtherGetUp = function () {
            this.setActLoop(false);
            if (this.playerPet != null) {
                this.playerPet.changeOtherGetUp();
            }
        };
        StageScenePlayer.prototype.changeOtherNone = function () {
        };
        StageScenePlayer.prototype.changeOtherRun = function () {
            this.setActLoop(true);
        };
        StageScenePlayer.prototype.changeOtherAppear = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherHurt = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherCurve = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherStirUp = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherStirDown = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherFallDown = function () {
            this.setActLoop(false);
        };
        StageScenePlayer.prototype.changeOtherDie = function () {
            this.dieStayMs = zj.ConstantConfig_RoleBattle.FIGHT_SCENE_DIE_STAY_MS;
            this.setActLoop(false);
            if (this.playerPet != null) {
                this.playerPet.changeOtherDie();
            }
        };
        StageScenePlayer.prototype.changeOtherFightShowAtk = function () {
            if (this.playerPet != null) {
                this.playerPet.changeOtherFightShowAtk();
            }
        };
        StageScenePlayer.prototype.changeOtherFightShowBeAtk = function () {
            if (this.playerPet != null) {
                this.playerPet.changeOtherFightShowAtk();
            }
        };
        StageScenePlayer.prototype.updateTargetWalk = function () {
            if (this.bRunTarget == false) {
                return;
            }
            var _a = this.getTargetPos(), tmp_x = _a[0], tmp_y = _a[1];
            var _b = this.judgeDir(tmp_x, tmp_y), dir = _b[0], walkDir = _b[1];
            if (dir != this.dir) {
                this.changeDir(dir);
            }
            this.walkDir = walkDir;
            _c = this.getTargetPos(), tmp_x = _c[0], tmp_y = _c[1];
            if (Math.abs(tmp_x - this.x) <= zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) <= zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                this.bRunTarget = false;
                this.saveDir = zj.TableEnum.TableEnumDir.Dir_None;
                this.walkDir = zj.TableEnum.EnumDepthDir.Dir_None;
                this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
                if (this.targetCB != null) {
                    this.targetCB();
                }
            }
            var _c;
        };
        StageScenePlayer.prototype.getTargetPos = function () {
            return [0, 0];
        };
        StageScenePlayer.prototype.updatePathWalk = function () {
        };
        StageScenePlayer.prototype.procActId = function () {
            var actId = this.actionId;
            if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                    actId = this.actionId;
                }
                else {
                    actId = this.otherState;
                }
            }
            else {
                actId = this.state;
            }
            this.changeAction(actId);
        };
        StageScenePlayer.prototype.changeDir = function (dir) {
            this.dir = dir;
        };
        StageScenePlayer.prototype.changeScale = function () {
            if (this.body != null) {
                this.body.SetScale(this.scale);
            }
        };
        StageScenePlayer.prototype.getClickDir = function (point) {
            var dir = this.dir;
            if (point != null) {
                var _a = this.converScreenPos(point), screen_x = _a[0], screen_y = _a[1];
                if (screen_x > this.x) {
                    dir = zj.TableEnum.TableEnumDir.Dir_Right;
                }
                else if (screen_x < this.x) {
                    dir = zj.TableEnum.TableEnumDir.Dir_Left;
                }
            }
            return dir;
        };
        StageScenePlayer.prototype.converScreenPos = function (point) {
            return [0, 0];
        };
        //设置方向
        StageScenePlayer.prototype.judgeDir = function (x, y) {
            var dir = this.dir;
            var walk_dir = this.walkDir;
            var tmp_x = x;
            var tmp_y = y;
            if ((tmp_x <= this.x && tmp_y >= this.y) && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //左下
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Left_Down;
                dir = zj.TableEnum.TableEnumDir.Dir_Left;
            }
            else if ((tmp_x <= this.x && tmp_y <= this.y) && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //左上
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Left_Up;
                dir = zj.TableEnum.TableEnumDir.Dir_Left;
            }
            else if ((tmp_x > this.x && tmp_y >= this.y) && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //右下
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Right_Down;
                dir = zj.TableEnum.TableEnumDir.Dir_Right;
            }
            else if ((tmp_x > this.x && tmp_y <= this.y) && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //右上
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Right_Up;
                dir = zj.TableEnum.TableEnumDir.Dir_Right;
            }
            else if (tmp_x <= this.x && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X) {
                //左
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Left;
                dir = zj.TableEnum.TableEnumDir.Dir_Left;
            }
            else if (tmp_x > this.x && Math.abs(tmp_x - this.x) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X) {
                //右
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Right;
                dir = zj.TableEnum.TableEnumDir.Dir_Right;
            }
            else if (tmp_y >= this.y && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //下
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Down;
            }
            else if (tmp_y < this.y && Math.abs(tmp_y - this.y) > zj.ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
                //上
                walk_dir = zj.TableEnum.EnumDepthDir.Dir_Up;
            }
            return [dir, walk_dir];
        };
        StageScenePlayer.prototype.moveMap = function (x, y) {
            var w = zj.UIManager.StageWidth;
            var h = zj.UIManager.StageHeight;
            var HalfScreenWidth = zj.UIManager.StageWidth / 2;
            var HalfScreenHeight = zj.UIManager.StageHeight / zj.ConstantConfig_RoleBattle.VERTICAL_SPLIT_SCREEN * 2;
            var OtherScreenHeight = zj.UIManager.StageHeight - HalfScreenHeight;
            var mapLength = this.curScene.mapWidth;
            var mapHeight = this.curScene.mapHeight;
            if (this.playerState == zj.EnumPlayerState.PLAYER_STATE_LEADER || this.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_LEADER || this.playerState == zj.EnumPlayerState.PLAYER_STATE_ZORK_LEADER) {
                var adaptX = zj.Gmgr.Instance.offsetX + zj.ConstantConfig_RoleBattle.MOVE_DIS_OFFSET_LEADER;
                if (x > 0) {
                    if (this.moveDistance >= 0 && this.moveDistance < HalfScreenWidth) {
                        if (mapLength > w && this.moveDistance + x > HalfScreenWidth) {
                            this.curScene.UpdateMap(this.moveDistance + x - HalfScreenWidth, 0);
                            this.x = this.x + (HalfScreenWidth - this.moveDistance);
                        }
                        else {
                            this.x = this.x + x;
                        }
                    }
                    else if (this.moveDistance >= HalfScreenWidth && this.moveDistance < mapLength - HalfScreenWidth) {
                        if (this.moveDistance + x > mapLength - HalfScreenWidth) {
                            this.curScene.UpdateMap(mapLength - HalfScreenWidth - this.moveDistance, 0);
                            this.x = this.x + this.moveDistance + x - (mapLength - HalfScreenWidth);
                        }
                        else {
                            this.curScene.UpdateMap(x, 0);
                        }
                    }
                    else if (this.moveDistance >= mapLength - HalfScreenWidth) {
                        this.x = this.x + x;
                        if (this.x >= w - adaptX) {
                            this.x = w - adaptX;
                        }
                    }
                }
                else if (x < 0) {
                    if (this.moveDistance > 0 && this.moveDistance < HalfScreenWidth) {
                        this.x = this.x + x;
                        if (this.x <= adaptX) {
                            this.x = adaptX;
                        }
                    }
                    else if (this.moveDistance >= HalfScreenWidth && this.moveDistance <= mapLength - HalfScreenWidth) {
                        if (this.moveDistance + x < HalfScreenWidth) {
                            this.curScene.UpdateMap(-(this.moveDistance - HalfScreenWidth), 0);
                            this.x = this.x - (HalfScreenWidth - (this.moveDistance + x));
                        }
                        else {
                            this.curScene.UpdateMap(x, 0);
                        }
                    }
                    else if (this.moveDistance > mapLength - HalfScreenWidth && this.moveDistance <= mapLength) {
                        if (mapLength > w && this.moveDistance + x < mapLength - HalfScreenWidth) {
                            this.curScene.UpdateMap(-(mapLength - HalfScreenWidth - (this.moveDistance + x)), 0);
                            this.x = this.x - (this.moveDistance - (mapLength - HalfScreenWidth));
                        }
                        else {
                            this.x = this.x + x;
                        }
                    }
                }
                this.moveDistance = this.moveDistance + x;
                if (this.moveDistance <= adaptX) {
                    this.moveDistance = adaptX;
                }
                else if (this.moveDistance >= mapLength - adaptX) {
                    this.moveDistance = mapLength - adaptX;
                }
            }
            else {
                this.x = this.x + x;
            }
            if (this.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_LEADER || this.playerState == zj.EnumPlayerState.PLAYER_STATE_ZORK_LEADER) {
                var adaptY = zj.Gmgr.Instance.offsety + zj.ConstantConfig_RoleBattle.VER_DIS_OFFSET_LEADER;
                if (y > 0) {
                    if (this.verDistance + y >= this.curScene.mapMaxCritY - adaptY) {
                        y = this.curScene.mapMaxCritY - adaptY - this.verDistance;
                    }
                    if (this.verDistance >= 0 && this.verDistance < HalfScreenHeight) {
                        if (mapHeight > h && this.verDistance + y > HalfScreenHeight) {
                            this.curScene.UpdateMap(0, this.verDistance + y - HalfScreenHeight);
                            this.y = this.y + (HalfScreenHeight - this.verDistance);
                        }
                        else {
                            this.y = this.y + y;
                        }
                    }
                    else if (this.verDistance >= HalfScreenHeight && this.verDistance < mapHeight - OtherScreenHeight) {
                        if (this.verDistance + y > mapHeight - OtherScreenHeight) {
                            this.curScene.UpdateMap(0, mapHeight - OtherScreenHeight - this.verDistance);
                            this.y = this.y + this.verDistance + y - (mapHeight - OtherScreenHeight);
                        }
                        else {
                            this.curScene.UpdateMap(0, y);
                        }
                    }
                    else if (this.verDistance >= mapHeight - OtherScreenHeight) {
                        this.y = this.y + y;
                        if (this.y >= h - adaptY) {
                            this.y = h - adaptY;
                        }
                    }
                }
                else if (y < 0) {
                    if (this.verDistance + y <= this.curScene.mapMinCritY - adaptY) {
                        y = this.curScene.mapMinCritY - adaptY - this.verDistance;
                    }
                    if (this.verDistance > 0 && this.verDistance < HalfScreenHeight) {
                        this.y = this.y + y;
                        if (this.y <= adaptY) {
                            this.y = adaptY;
                        }
                    }
                    else if (this.verDistance >= HalfScreenHeight && this.verDistance <= mapHeight - OtherScreenHeight) {
                        if (this.verDistance + y < HalfScreenHeight) {
                            this.curScene.UpdateMap(0, -(this.verDistance - HalfScreenHeight));
                            this.y = this.y - (HalfScreenHeight - (this.verDistance + y));
                        }
                        else {
                            this.curScene.UpdateMap(0, y);
                        }
                    }
                    else if (this.verDistance > mapHeight - OtherScreenHeight && this.verDistance <= mapHeight) {
                        if (mapHeight > h && this.verDistance + y < mapHeight - OtherScreenHeight) {
                            this.curScene.UpdateMap(0, -(mapHeight - OtherScreenHeight - (this.verDistance + y)));
                            this.y = this.y - (this.verDistance - (mapHeight - OtherScreenHeight));
                        }
                        else {
                            this.y = this.y + y;
                        }
                    }
                }
                this.verDistance = this.verDistance + y;
            }
            else if (this.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER || this.playerState == zj.EnumPlayerState.PLAYER_STATE_ZORK_OTHER) {
                this.y = this.y + y;
                if (this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y) >= this.curScene.mapMaxCritY) {
                    this.y = this.curScene.mapMaxCritY - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
                }
                if (this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y) <= this.curScene.mapMinCritY) {
                    this.y = this.curScene.mapMinCritY - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
                }
            }
            else {
                //y值的移动不会影响地图的移动
                this.y = this.y + y;
                if (this.y >= this.curScene.mapMaxCritY) {
                    this.y = this.curScene.mapMaxCritY;
                }
                else if (this.y <= this.curScene.mapMinCritY) {
                    this.y = this.curScene.mapMinCritY;
                }
                this.verDistance = this.y;
            }
        };
        StageScenePlayer.prototype.startTarget = function (x, y, cb) {
            this.setTargetCB(cb);
            this.setTargetPos(x, y);
            var _a = this.judgeDir(x, y), dir = _a[0], walkDir = _a[1];
            this.walkDir = walkDir;
            this.changeDir(dir);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_Walk);
            this.setActLoop(true);
            this.bRunTarget = true;
        };
        StageScenePlayer.prototype.changeScaleX = function (scaleX) {
            if (this.body != null) {
                this.body.setScaleX(scaleX);
            }
        };
        StageScenePlayer.prototype.changeAction = function (actionId) {
            if (this.actionId == actionId && this.lastDir == this.dir) {
                return;
            }
            if (this.playerState == zj.EnumPlayerState.PLAYER_STATE_BOSS) {
            }
            this.actionId = actionId;
            this.lastDir = this.dir;
            if (this.actionId < zj.ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                this.actionLastId = actionId + this.dir;
            }
            if (this.body != null) {
                this.bBodyActEnd = false;
                var bFlipX = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Right, false, true);
                this.setFlipX(bFlipX);
                this.body.SetLoop(this.bActLoop);
                this.body.ChangeAction(actionId);
            }
        };
        StageScenePlayer.prototype.setPlayerState = function (playerState) {
            this.playerState = playerState;
        };
        StageScenePlayer.prototype.setMemberInfo = function (memberInfo) {
            this.memberInfo = memberInfo;
        };
        StageScenePlayer.prototype.setPlayerInfo = function (playerInfo) {
            this.playerInfo = playerInfo;
            if (!this.isSelf()) {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                if (scene.isMainCity) {
                    this.setPlayerVisible(zj.Game.PlayerInfoSystem.getIsLookOtherPlayer() && zj.Game.PlayerInfoSystem.IsAgreeEnter);
                }
                else {
                    this.setPlayerVisible(true);
                }
            }
        };
        StageScenePlayer.prototype.setPositionType = function (eType) {
            this.ePosition = eType;
        };
        StageScenePlayer.prototype.setIsEnemy = function (tag) {
            this.bEnemy = tag;
        };
        StageScenePlayer.prototype.joinView = function () {
            this.bInView = true;
            if (this.bHidden == true) {
                return;
            }
            this.setObjectVisible(true);
        };
        StageScenePlayer.prototype.leaveView = function () {
            this.bInView = false;
            this.setObjectVisible(false);
            if (this.commonLedAni != null) {
                this.commonLedAni.setVisibleSpx(false);
            }
            this.leaveControl();
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
        };
        StageScenePlayer.prototype.leaveControl = function () {
        };
        //设置是否翻转
        StageScenePlayer.prototype.setFlipX = function (flip) {
            if (this.body != null) {
                this.body.setFlipX(flip);
            }
        };
        StageScenePlayer.prototype.setObjectVisible = function (tag) {
            if (this.nodePos != null) {
                this.nodePos.visible = tag;
                console.log("**************************************************:" + tag);
            }
        };
        StageScenePlayer.prototype.setVisible = function (tag) {
            this.bVisible = tag;
            this.setObjectVisible(tag);
        };
        StageScenePlayer.prototype.setHidden = function (tag) {
            this.bHidden = tag;
            this.setObjectVisible(tag);
        };
        StageScenePlayer.prototype.updateZone = function () {
            var tag = false;
            if (this.x + this.bodyWidth / 2 >= 0 && this.y + this.bodyHeight >= 0 && this.x - this.bodyWidth / 2 <= zj.UIManager.StageWidth && this.y <= zj.UIManager.StageHeight) {
                tag = true;
            }
            this.bInZone = tag;
            if (this.bHidden == true) {
                return;
            }
            if (tag == false && this.bVisible == true) {
                this.setVisible(false);
            }
            else if (tag == true && this.bVisible == false) {
                this.setVisible(true);
            }
        };
        StageScenePlayer.prototype.setTrans = function (trans) {
            if (this.trans == trans) {
                return;
            }
            this.trans = trans;
            if (this.body != null) {
                this.body.setOpacity(trans);
            }
        };
        StageScenePlayer.prototype.setActLoop = function (bLoop) {
            this.bActLoop = bLoop;
        };
        StageScenePlayer.prototype.setFloor = function (h) {
            this.floor = h;
        };
        StageScenePlayer.prototype.setPosX = function (x) {
            this.setPos(x, this.y);
        };
        StageScenePlayer.prototype.setPosY = function (y) {
            this.setPos(this.x, this.y);
        };
        StageScenePlayer.prototype.setPos = function (x, y) {
            // y = UIManager.StageHeight - Math.abs(UIManager.StageHeight - y);
            this.x = x;
            this.y = y;
            this.nodePos.x = x;
            this.nodePos.y = y;
        };
        StageScenePlayer.prototype.setOffX = function (offx) {
            this.setPosX(this.x + offx);
        };
        StageScenePlayer.prototype.setRecPetFpPos = function (dir, x, y) {
            this.fp_dir = dir;
            this.fpX = x;
            this.fpY = y;
            this.fpMoveDistance = this.curScene.playerLeader.moveDistance;
            this.fpVerDistance = this.curScene.playerLeader.verDistance;
        };
        StageScenePlayer.prototype.setRoot = function (x, y) {
            this.setPos(x, y);
            this.setBodyPos(0, 0);
            this.setTitlePos(0, 0);
        };
        StageScenePlayer.prototype.setTargetPos = function (x, y) {
            this.targetPos = new egret.Point(x, y);
        };
        StageScenePlayer.prototype.setBodyPos = function (x, y) {
            if (this.body != null) {
                this.body.SetPosition(x, y);
            }
            if (this.auraFront != null && this.body != null) {
                // this.auraBack:setZOrder(0)
                // this.body:setZOrder(1)
                // this.auraFront:setZOrder(2)
            }
        };
        StageScenePlayer.prototype.setTitlePos = function (x, y) {
            var w1 = 0;
            var w2 = 0;
            var w3 = 0;
            var w4 = 0;
            var _x = x + this.aniUpOffsetX;
            var _y = y + this.aniUpOffsetY;
            if (this.ttfName != null) {
                w1 = this.ttfName.width;
            }
            if (this.ttfOffical != null) {
                w2 = this.ttfOffical.width;
            }
            var dis = (w1 + w2 + zj.ConstantConfig_LeagueHome.OFFICAL_NAME_X_OFFSET) / 2;
            if (this.ttfName != null) {
                this.ttfName.x = _x - dis;
                this.ttfName.y = _y;
            }
            if (this.designation != null) {
                this.designation.x = _x;
                this.designation.y = _y - 40;
            }
            if (this.ttfOffical != null) {
                var _a = [this.ttfName.x, this.ttfName.y], t_x = _a[0], t_y = _a[1];
                this.ttfOffical.x = t_x + w1 + zj.ConstantConfig_LeagueHome.OFFICAL_NAME_X_OFFSET;
                this.ttfOffical.y = t_y;
            }
        };
        StageScenePlayer.prototype.setSpecialTitlePos = function (x, y) {
            var _a = [0, 0, 0, 0, 0, 0, 0, 0], w0 = _a[0], w1 = _a[1], w2 = _a[2], w3 = _a[3], w4 = _a[4], w5 = _a[5], w6 = _a[6], w7 = _a[7];
            var _b = [0, 0, 0, 0, 0, 0, 0, 0], h0 = _b[0], h1 = _b[1], h2 = _b[2], h3 = _b[3], h4 = _b[4], h5 = _b[5], h6 = _b[6], h7 = _b[7];
            var _x = x + this.aniUpOffsetX;
            var _y = y + this.aniUpOffsetY;
            if (this.ttfName != null) {
                w1 = this.ttfName.width;
                h1 = this.ttfName.height;
            }
            _y = _y + h0 / 2 + h1 / 2;
            if (this.ttfLv != null) {
                w2 = this.ttfLv.width;
            }
            if (this.ttfName != null) {
                w3 = this.ttfName.width;
            }
            var dis = (w2 + w3 + zj.ConstantConfig_LeagueHome.LV_NAME_X_OFFSET) / 2;
            if (this.ttfLv != null) {
                _y = _y + zj.ConstantConfig_LeagueHome.BLOOD_NAME_Y_OFFSET;
                this.ttfLv.x = _x - dis;
                this.ttfLv.y = _y;
            }
            if (this.ttfName != null) {
                var _c = [this.ttfLv.x, this.ttfLv.y], t_x = _c[0], t_y = _c[1];
                this.ttfName.x = t_x + w2 + zj.ConstantConfig_LeagueHome.LV_NAME_X_OFFSET;
                this.ttfName.y = t_y;
            }
            if (this.ttfName != null) {
                w4 = this.ttfName.width;
                h4 = this.ttfName.height;
            }
            _y = _y + h1 / 2 + h4 / 2;
            if (this.ttfLeagueName != null) {
                w4 = this.ttfLeagueName.width;
                h4 = this.ttfLeagueName.height;
            }
            if (this.leagueStar != null) {
                w5 = w5 + this.leagueStar.width * this.leagueStar.scaleX + 5;
            }
            if (this.leagueStar != null) {
                _y = _y + zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.leagueStar.x = x - w5 / 2;
                this.leagueStar.y = _y + 5;
            }
            if (this.ttfLeagueName != null) {
                _y = _y + zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.ttfLeagueName.x = _x + w5 / 2 - this.ttfLeagueName.width;
                this.ttfLeagueName.y = _y;
            }
            _y = _y + h5 / 2 + h6 / 2;
            if (this.ttfGroupName != null) {
                w6 = this.ttfGroupName.width;
                h6 = this.ttfGroupName.height;
            }
            if (this.ttfGroupName != null) {
                _y = _y + zj.ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
                this.ttfGroupName.x = _x;
                this.ttfGroupName.y = _y;
            }
            if (this.designation != null) {
                w7 = this.designation.width;
                h7 = this.designation.height;
            }
            _y = _y + h6 / 2 + h7 / 2;
            if (this.designation != null) {
                this.designation.x = _x;
                this.designation.y = _y;
            }
        };
        StageScenePlayer.prototype.setMoveDistance = function (dis) {
            this.moveDistance = dis;
        };
        StageScenePlayer.prototype.setVerDistance = function (dis) {
            this.verDistance = dis;
        };
        StageScenePlayer.prototype.setTargetCB = function (CB, thispbj) {
            this.targetCB = CB;
            this.targetCBThis = thispbj;
        };
        StageScenePlayer.prototype.setShowCB = function (CB) {
            this.showCB = CB;
        };
        StageScenePlayer.prototype.setEndCB = function (CB) {
            this.endCB = CB;
        };
        StageScenePlayer.prototype.setDieCB = function (CB) {
            this.dieCB = CB;
        };
        StageScenePlayer.prototype.setCanRemove = function () {
            this.bCanRemove = true;
        };
        StageScenePlayer.prototype.getPlayerId = function () {
            return this.playerInfo.id;
        };
        StageScenePlayer.prototype.getPos = function () {
            return [this.x, this.y];
        };
        StageScenePlayer.prototype.getPosX = function () {
            return this.x;
        };
        StageScenePlayer.prototype.getPosY = function () {
            return this.y;
        };
        StageScenePlayer.prototype.getDir = function () {
            return this.dir;
        };
        StageScenePlayer.prototype.getMoveDistance = function () {
            return this.moveDistance;
        };
        StageScenePlayer.prototype.getPlayActionSpeed = function () {
            return 1;
        };
        StageScenePlayer.prototype.getBodySpx = function () {
            return this.body;
        };
        StageScenePlayer.prototype.getScale = function () {
            return this.scale;
        };
        StageScenePlayer.prototype.getBuffNode = function (pos) {
            var bone = null;
            if (pos == "up") {
                bone = this.body.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattle.commonArtUpName);
            }
            else if (pos == "mid") {
                bone = this.body.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattle.commonArtBuffName);
            }
            return bone.getDisplay();
        };
        StageScenePlayer.prototype.isBodyActEnd = function () {
            return this.bBodyActEnd;
        };
        StageScenePlayer.prototype.isRunTarget = function () {
            return this.bRunTarget;
        };
        StageScenePlayer.prototype.isShowAtk = function () {
            var tag = false;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                tag = true;
            }
            return tag;
        };
        StageScenePlayer.prototype.isVisible = function () {
            return this.bVisible;
        };
        StageScenePlayer.prototype.OnTouchDown = function (touchs) {
        };
        StageScenePlayer.prototype.OnTouchMove = function (touchs) {
        };
        StageScenePlayer.prototype.OnTouchUp = function (touchs) {
        };
        StageScenePlayer.SP_DEFAULT_X = 0.24; //0.28;//0.35;//0.21;
        StageScenePlayer.SP_DEFAULT_Y = 0.10; //0.12;//0.15;//0.09;
        return StageScenePlayer;
    }(zj.StageObject));
    zj.StageScenePlayer = StageScenePlayer;
    __reflect(StageScenePlayer.prototype, "zj.StageScenePlayer");
})(zj || (zj = {}));
//# sourceMappingURL=StageScenePlayer.js.map