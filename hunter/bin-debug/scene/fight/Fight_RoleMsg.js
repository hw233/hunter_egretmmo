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
    var Fight_RoleMsg = (function (_super) {
        __extends(Fight_RoleMsg, _super);
        function Fight_RoleMsg() {
            var _this = _super.call(this) || this;
            _this.tableKey = [];
            _this.tableCdProgress = [];
            _this.tableTouch = [];
            _this.tableHead = [];
            _this.tableRagePos = [];
            _this.tableCdPos = [];
            _this.tableRageTouch = [];
            _this.tableRageNode = [];
            // public tableSupportLight = [];
            // public tableSupportMask = [];
            _this.tableNodeCdAni = [];
            _this.tableNodeSupportAni = [];
            _this.point = new egret.Point();
            _this.skinName = "resource/skins/fight/FightRoleMsgSkin.exml";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.tableRoles = _this.scene.getAllys();
            _this.tableKey = _this.scene.tablePosKey;
            _this.tableRoleYH = _this.scene.tableRoleYH;
            _this.tableRageProgress = [];
            _this.tableCdTip = {};
            _this.tableTeachRage = {};
            _this.tableTeach = {};
            _this.tableTeachAngry = {};
            _this.tableCdProgress = [];
            _this.tableCdLabel = [];
            _this.tableHpValue = {};
            _this.tableRageValue = {};
            _this.tableCdValue = {};
            _this.tableDeadSprite = [];
            _this.tableHunterDeadAni = [];
            _this.tableHunterCdAni = [];
            _this.tableHunterSupportAni = [];
            _this.tableHeadGLState = {};
            _this.selIndex = -1;
            _this.location = new egret.Point(0, 0);
            _this.load_id = -1;
            _this.load_step = 0;
            if (zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_REPLAY || zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                _this.speedMax = 3;
            }
            else {
                _this.speedMax = zj.Helper.getSpeedMaxIndex(zj.Game.PlayerInfoSystem.BaseInfo.level);
            }
            _this.speedActioning = false;
            _this.chatClickPop = false;
            _this.nodeChatClip = null;
            _this.LabelChat = null;
            _this.ChatClipWidth = 0;
            _this.LabelChatWidth = 0;
            _this.bHideLabel = false;
            _this.nChatTick = 0;
            _this.bChatActioning = false;
            _this.NodeAutoAni.touchEnabled = true;
            _this.NodeAutoAni.touchChildren = false;
            _this.NodeSpeedAni.touchEnabled = true;
            _this.NodeSpeedAni.touchChildren = false;
            zj.Gmgr.Instance.bakeSpeedIndex = zj.Gmgr.Instance.backupSpeedTbl[zj.Gmgr.Instance.fightType];
            return _this;
        }
        Fight_RoleMsg.prototype.OnExit = function () {
            this.tableTouch = [];
            this.tableBoard = {};
            this.tableHead = [];
            this.tableHeadNode = [];
            this.tableCdNode = [];
            this.tableRagePos = [];
            this.tableCdPos = [];
            this.tableCdLabel = [];
            this.tableRageTouch = [];
            this.tableRageProgress = [];
            this.tableCdTip = {};
            this.tableTeachRage = {};
            this.tableTeach = {};
            this.tableTeachAngry = {};
            this.tableCdProgress = [];
            this.tableHpValue = {};
            this.tableRageValue = {};
            this.tableCdValue = {};
            this.tableRageAni = {};
            this.tableDeadSprite = {};
            this.clearAni(this.tableHunterDeadAni);
            this.clearAni(this.tableHunterCdAni);
            this.clearAni(this.tableHunterSupportAni);
            this.tableHunterDeadAni = {};
            this.tableHunterCdAni = {};
            this.tableHunterDeadAni = {};
            egret.clearInterval(this.update);
            this.update = -1;
            egret.clearInterval(this.load_id);
            this.load_id = -1;
            this.scene = null;
            this.tableRoles = null;
            this.tableKey = null;
            if (this.speedAni) {
                this.speedAni.clearSpine();
                this.speedAni = null;
            }
            if (this.autoAni) {
                this.autoAni.clearSpine();
                this.autoAni = null;
            }
        };
        Fight_RoleMsg.prototype.clearAni = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                v.spx.clearSpine();
                v = null;
            }
            tbl = {};
        };
        //初始化ui
        Fight_RoleMsg.prototype.Init = function () {
            // this.visible=false;
            // this.handBox.cacheAsBitmap = true;
            // this.chat.cacheAsBitmap = true;
            // this.LayerTopLeft.cacheAsBitmap = true;
            this.ButtonPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonPause_CallBack, this);
            this.ButtonBuffShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonBuffShow_CallBack, this);
            this.NodeAutoAni.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonAuto_CallBack, this);
            this.NodeSpeedAni.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSpeed_CallBack, this);
            this.ButtonClickLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClickLeft_CallBack, this);
            //this.ButtonClickRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClickRight_CallBack, this);
            this.ButtonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSend_CallBack, this);
            zj.Game.EventManager.on(zj.GameEvent.COMBAT_CHAT, this.combatChat, this);
            this.tableTouch = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft];
            this.tableBoard = [this.SpriteBoardRightR, this.SpriteBoardRight, this.SpriteBoardMid, this.SpriteBoardLeft];
            this.tableHead = [this.SpriteHeadRightR, this.SpriteHeadRight, this.SpriteHeadMid, this.SpriteHeadLeft];
            // 战斗频死时的动画
            this.tableHeadNode = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft];
            this.tableRageNode = [this.BarAngryNodeRightR, this.BarAngryNodeRight, this.BarAngryNodeMid, this.BarAngryNodeLeft];
            this.tableCdNode = [this.BarCdNodeRightR, this.BarCdNodeRight, this.BarCdNodeMid, this.BarCdNodeLeft];
            this.tableRagePos = [this.SpriteBarAngryRightR, this.SpriteBarAngryRight, this.SpriteBarAngryMid, this.SpriteBarAngryLeft];
            this.tableCdPos = [this.SpriteCdTipRightR, this.SpriteCdTipRight, this.SpriteCdTipMid, this.SpriteCdTipLeft];
            this.tableCdBoard = [this.SpriteOrnSkillRightR, this.SpriteOrnSkillRight, this.SpriteOrnSkillMid, this.SpriteOrnSkillLeft];
            this.tableCdLabel = [this.LabelCdRightR, this.LabelCdRight, this.LabelCdMid, this.LabelCdLeft];
            // this.tableRageTouch = [this.RageTouchRightR, this.RageTouchRight, this.RageTouchMid, this.RageTouchLeft]
            this.tableSupportNode = [this.NodeSupportRightR, this.NodeSupportRight, this.NodeSupportMid, this.NodeSupportLeft];
            this.tableRageTouch = this.tableSupportNode;
            this.tableSupportHead = [this.SpriteSupportHeadRightR, this.SpriteSupportHeadRight, this.SpriteSupportHeadMid, this.SpriteSupportHeadLeft];
            // this.tableSupportLight = [this.SpriteSupportLIghtRightR, this.SpriteSupportLIghtRight, this.SpriteSupportLIghtMid, this.SpriteSupportLIghtLeft]
            // this.tableSupportMask = [this.SpriteSupportMaskRightR, this.SpriteSupportMaskRight, this.SpriteSupportMaskMid, this.SpriteSupportMaskLeft]
            // this.tableNodeCdAni = [this.NodeCdAniRightR, this.NodeCdAniRight, this.NodeCdAniMid, this.NodeCdAniLeft]
            this.tableNodeCdAni = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft];
            // this.tableNodeSupportAni = [this.NodeSupportAniRightR, this.NodeSupportAniRight, this.NodeSupportAniMid, this.NodeSupportAniLeft];
            this.tableNodeSupportAni = [this.BarAngryNodeRightR, this.BarAngryNodeRight, this.BarAngryNodeMid, this.BarAngryNodeLeft];
            this._buffShow = false;
            this._buffAniRun = false;
            if (this.tableRoleYH) {
                // this.tableRageNode.push(this.groupYH);
                // this.tableRagePos.push(this.SpriteBarAngry);
                this.groupYH.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonYH, this);
            }
            else {
                this.groupYH.visible = false;
            }
            // if (this.scene.bLockKey == false) {
            //this.EnableTouchEvent();
            // }
            this.ClearUi();
            this.loadBase();
            this.InitSupport();
            this.InitPause();
            this.update = egret.setInterval(this.Update, this, 0);
            //this.LoadChat();
            this.ButtonClickLeft_CallBack();
            this.doLoad();
            // Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE,ChatMessageNotice_Visit,this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
        };
        Fight_RoleMsg.prototype.doLoad = function () {
            this.load_id = egret.setInterval(this.doLoadStep, this, 250);
        };
        Fight_RoleMsg.prototype.doLoadStep = function () {
            if (this.load_step == -1) {
                return;
            }
            this.load_step++;
            if (this.load_step == 1) {
                this.InitAni();
            }
            else if (this.load_step == 2) {
                this.InitHead();
            }
            else if (this.load_step == 3) {
                this.LoadAutoAni();
                this.InitAuto();
                this.loadSpeed();
            }
            else if (this.load_step == 4) {
                egret.clearInterval(this.load_id);
                this.load_step = -1;
            }
        };
        Fight_RoleMsg.prototype.loadSpeed = function () {
        };
        Fight_RoleMsg.prototype.loadBase = function () {
            //计时
            this.scene.battleTime = this.scene.stageMaxTime;
            this.scene.bTimingOn = true;
            for (var i = 0; i < this.tableHead.length; i++) {
                var role = this.tableRoles[this.tableKey[i]];
                this.tableHead[i].width = 95;
                this.tableHead[i].height = 93;
                if (role != null) {
                    this.tableHead[i].visible = true;
                    if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                        this.tableHead[i].source = zj.cachekey("wx_" + role.battleHead, this);
                    }
                    else {
                        this.tableHead[i].source = zj.cachekey(role.battleHead, this);
                    }
                    //self.tableHeadGLState[role.roleId] = set.GetGLState( self.tableHead[i] )
                }
                else {
                    var generalId = this.scene.tableTimelyPos[i];
                    if (generalId != null) {
                        this.tableHead[i].visible = true;
                        if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                            this.tableHead[i].source = zj.cachekey("wx_" + zj.fromGeneral(zj.PlayerHunterSystem.GetGeneralId(generalId)).battle_head, this);
                        }
                        else {
                            this.tableHead[i].source = zj.cachekey(zj.fromGeneral(zj.PlayerHunterSystem.GetGeneralId(generalId)).battle_head, this);
                        }
                        // self.tableHeadGLState[generalId] = set.GetGLState( self.tableHead[i] )
                        zj.Helper.SetImageFilterColor(this.tableHead[i], "gray");
                    }
                }
            }
            for (var i = 0; i < this.tableCdPos.length; i++) {
                var role = this.tableRoles[this.tableKey[i]];
                if (role != null) {
                    this.tableCdTip[role.roleId] = this.tableCdPos[i];
                    this.tableTeachRage[role.roleId] = this.tableRageTouch[i];
                    this.tableTeach[role.roleId] = this.tableBoard[i];
                    this.tableTeachAngry[role.roleId] = this.tableRagePos[i];
                }
            }
            for (var i = 0; i < this.tableRagePos.length; i++) {
                var x = this.tableRagePos[i].x;
                var y = this.tableRagePos[i].y;
                this.tableRageNode[i].x = x;
                this.tableRageNode[i].y = y;
                this.tableRagePos[i].visible = false;
            }
            this.SpriteBarAngry.visible = false;
            for (var i = 0; i < this.tableCdPos.length; i++) {
                var x = this.tableCdPos[i].x;
                var y = this.tableCdPos[i].y;
                this.tableCdPos[i].x = x;
                this.tableCdPos[i].y = y;
                this.tableCdPos[i].visible = false;
            }
            for (var i = 0; i < this.tableHead.length; i++) {
                var x = this.tableHead[i].x;
                var y = this.tableHead[i].y;
                this.tableHead[i].x = x;
                this.tableHead[i].y = y;
            }
            // for (let i = 0; i < this.tableSupportLight.length; i++) {
            // 	this.tableSupportLight[i].visible = false;
            // }
            // for (let i = 0; i < this.tableSupportMask.length; i++) {
            // 	this.tableSupportMask[i].visible = false;
            // }
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_THIRD
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                var len = this.scene.curFormation.generals.length;
                var diff = 4 - len;
                if (diff > 0) {
                    // for (let i = 0; i < diff; i++) {
                    // 	this.tableLayers[i].visible = false;
                    // }
                }
            }
        };
        Fight_RoleMsg.prototype.ClearUi = function () {
            this.LayerAuto.visible = false;
            this.NodeRelic.visible = false;
            for (var i = 0; i < this.tableHead.length; i++) {
                this.tableHead[i].visible = false;
            }
            for (var i = 0; i < this.tableRageNode.length; i++) {
                this.tableRageNode[i].visible = false;
            }
            for (var i = 0; i < this.tableCdNode.length; i++) {
                this.tableCdNode[i].visible = false;
            }
            for (var i = 0; i < this.tableCdLabel.length; i++) {
                this.tableCdLabel[i].visible = false;
            }
        };
        Fight_RoleMsg.prototype.checkAndOpenAni = function (tbl, index, playOrnIndex) {
            if (!tbl[index].spx.spine.visible) {
                tbl[index].spx.setVisibleSpx(true);
                tbl[index].spx.stopAllActions();
                tbl[index].index = playOrnIndex;
                tbl[index].spx.ChangeAction(playOrnIndex);
            }
        };
        Fight_RoleMsg.prototype.checkAndCloseAni = function (tbl, index) {
            if (tbl[index].spx.spine.visible) {
                tbl[index].spx.stopAllActions();
                tbl[index].spx.setVisibleSpx(false);
            }
        };
        Fight_RoleMsg.prototype.createSpxInfo = function (name, tblAni, pos, playOrnIndex, playNextIndex) {
            var info = { spx: null, index: null };
            info.index = playOrnIndex;
            function animationEvent(e) {
                if (tblAni[pos].index == playOrnIndex) {
                    tblAni[pos].index = playNextIndex;
                    var spine = e.currentTarget;
                    this.actionId = playNextIndex;
                    var names = spine.armature._armatureData.animationNames;
                    for (var i = 0; i < names.length; i++) {
                        if (this.actionId == i) {
                            this.spineState = spine.animation.play(names[i], 0);
                            break;
                        }
                    }
                }
            }
            var spx = zj.HunterSpineX(1, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            info.spx = spx;
            spx.setVisibleSpx(false);
            spx.stopAllActions();
            spx.ChangeAction(info.index);
            spx.spine.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, animationEvent, this);
            return info;
        };
        Fight_RoleMsg.prototype.LoadAutoAni = function () {
            var body = zj.HunterSpineX(1011, 1, null, zj.TableClientAniSpxSource.Item(1011).name)[0];
            body.stopAllActions();
            body.ChangeAction(3);
            this.NodeSpeedAni.addChild(body.spine);
            body.spine.x = this.NodeSpeedAni.width / 2;
            body.spine.y = this.NodeSpeedAni.height / 2;
            this.speedAni = body;
            var body1 = zj.HunterSpineX(1011, 1, null, zj.TableClientAniSpxSource.Item(1011).name)[0];
            body1.stopAllActions();
            body1.ChangeAction(0);
            this.NodeAutoAni.addChild(body1.spine);
            body1.spine.x = this.NodeAutoAni.width / 2;
            body1.spine.y = this.NodeAutoAni.height / 2;
            this.autoAni = body1;
            zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
        };
        Fight_RoleMsg.prototype.InitAni = function () {
            var name = 1004;
            for (var i_1 = 0; i_1 < this.tableNodeCdAni.length; i_1++) {
                var key = this.tableKey[i_1];
                if (key == null) {
                    continue;
                }
                var role = this.tableRoles[key];
                if (role == null) {
                    continue;
                }
                var info_1 = this.createSpxInfo(name, this.tableHunterCdAni, role.eTeamNum + 1, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index + 1);
                var box = this.tableNodeCdAni[i_1];
                box.addChild(info_1.spx.spine);
                info_1.spx.spine.x = box.width / 2;
                info_1.spx.spine.y = box.height / 2;
                this.tableHunterCdAni[role.eTeamNum + 1] = info_1;
            }
            for (var i_2 = 0; i_2 < this.tableNodeSupportAni.length; i_2++) {
                var key = this.tableKey[i_2];
                if (key == null) {
                    continue;
                }
                var role = this.tableRoles[key];
                if (role == null) {
                    continue;
                }
                var info_2 = this.createSpxInfo(name, this.tableHunterSupportAni, role.eTeamNum + 1, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index + 1);
                this.tableNodeSupportAni[i_2].addChild(info_2.spx.spine);
                info_2.spx.spine.x = this.tableNodeSupportAni[i_2].width / 2;
                info_2.spx.spine.y = this.tableNodeSupportAni[i_2].height / 2;
                this.tableHunterSupportAni[role.eTeamNum + 1] = info_2;
            }
            var i = zj.FightHelper.FIGHT_ASSISTANCE_IDX;
            var info = this.createSpxInfo(name, this.tableHunterSupportAni, i, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index + 1);
            this.groupYH.addChild(info.spx.spine);
            info.spx.spine.x = this.groupYH.width / 2;
            info.spx.spine.y = this.groupYH.height / 2;
            this.tableHunterSupportAni[i] = info;
            for (var i_3 = 0; i_3 < this.tableHeadNode.length; i_3++) {
                var key = this.tableKey[i_3];
                if (key == null) {
                    continue;
                }
                var role = this.tableRoles[key];
                if (role == null) {
                    continue;
                }
                this.tableHpValue[key] = 0;
                var info_3 = this.createSpxInfo(name, this.tableHunterDeadAni, role.eTeamNum + 1, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index + 1);
                this.tableHeadNode[i_3].addChild(info_3.spx.spine);
                info_3.spx.spine.x = this.tableHeadNode[i_3].width / 2;
                info_3.spx.spine.y = this.tableHeadNode[i_3].height / 2;
                this.tableHunterDeadAni[role.eTeamNum + 1] = info_3;
            }
        };
        Fight_RoleMsg.prototype.InitSupport = function () {
            var generals = this.scene.curFormation.generals;
            var supports = this.scene.curFormation.supports;
            for (var i = 0; i < this.tableHeadNode.length; i++) {
                var general = null;
                var general_id = this.tableKey[i];
                if (general_id != null) {
                    general = this.tableRoles[general_id];
                }
                var support = null;
                var support_id = this.scene.tableAllySptKey[i];
                if (support_id != null) {
                    support = this.scene.tableAllySupports[support_id];
                }
                if (support == null) {
                    if (general != null) {
                        this.tableSupportNode[i].visible = true;
                        this.tableSupportHead[i].visible = false;
                    }
                    else {
                        this.tableSupportNode[i].visible = false;
                    }
                }
                else {
                    if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                        this.tableSupportHead[i].source = zj.cachekey("wx_" + support.supportHead, this);
                    }
                    else {
                        this.tableSupportHead[i].source = zj.cachekey(support.supportHead, this);
                    }
                    //this.tableHeadGLState[support.roleId] = set.GetGLState( self.tableSupportHead[i] );
                    var ret = this.scene.tableTimelyPos[i];
                    if (general == null && ret != null) {
                        zj.Helper.SetImageFilterColor(this.tableSupportHead[i], "gray");
                    }
                }
            }
            if (this.tableRoleYH) {
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                    this.SpriteSupport.source = zj.cachekey("wx_" + this.tableRoleYH.supportHead, this);
                }
                else {
                    this.SpriteSupport.source = zj.cachekey(this.tableRoleYH.supportHead, this);
                }
            }
        };
        Fight_RoleMsg.prototype.InitHead = function () {
            for (var i = 0; i < this.tableRageNode.length; i++) {
                var key = this.tableKey[i];
                if (key == null) {
                    continue;
                }
                var role = this.tableRoles[key];
                if (role == null) {
                    continue;
                }
                if (role.relySupportRole == null) {
                    continue;
                }
                var progress = new eui.Image(zj.UIConfig.UIConfig_BattleUi.roleBarAngryPng);
                var progressMask = zj.Util.getMaskImgBlack(75, 68);
                progress.alpha = 0.5;
                progress.mask = progressMask;
                this.tableRageNode[i].addChild(progressMask);
                this.tableRageNode[i].addChild(progress);
                this.tableRageNode[i].visible = true;
                this.tableRageProgress[role.eTeamNum + 1] = progressMask;
                var _tmp_rage = -1;
                this.tableRageValue[key] = _tmp_rage;
            }
            if (this.tableRoleYH) {
                var progressMask = zj.Util.getMaskImgBlack(75, 68);
                this.groupYH.addChild(progressMask);
                progressMask.x = this.SpriteBarAngry.x;
                progressMask.y = this.SpriteBarAngry.y;
                this.SpriteBarAngry.alpha = 0.5;
                this.SpriteBarAngry.mask = progressMask;
                this.SpriteBarAngryMask = progressMask;
                this.SpriteBarAngry.visible = true;
            }
            for (var i = 0; i < this.tableCdNode.length; i++) {
                var key = this.tableKey[i];
                if (key == null) {
                    continue;
                }
                var role = this.tableRoles[key];
                if (role == null) {
                    continue;
                }
                //this.tableCdProgress[role.eTeamNum+1] = "haha"
                var label = this.tableCdLabel[i];
                label.visible = false;
                this.tableCdLabel[role.eTeamNum + 1] = label;
                this.tableCdNode[i].visible = true;
            }
        };
        Fight_RoleMsg.prototype.Update = function (dt) {
            if (zj.Gmgr.Instance.bPause) {
                return;
            }
            if (this.scene.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_SETTLE) {
                return;
            }
            for (var k in this.tableRoles) {
                var v = this.tableRoles[k];
                if (v.bAlreadyDead) {
                    continue;
                }
                this.FreshDying(v);
                this.FreshRage(v);
                this.FreshCdLabel(v);
            }
            this.FreshYH();
            this.FreshTime();
            //this.UpdateChat(dt);
        };
        Fight_RoleMsg.prototype.FreshYH = function () {
            var general = this.tableRoleYH;
            if (!general || !this.SpriteBarAngryMask) {
                return;
            }
            var percent = general.getRage() / general.getMaxRage();
            this.SpriteBarAngryMask.y = this.SpriteBarAngry.y + 68 - 68 * percent;
            var index = zj.FightHelper.FIGHT_ASSISTANCE_IDX;
            if (percent >= 1) {
                this.SpriteBarAngryMask.y = this.SpriteBarAngry.y + 68;
                if (general.isPlaySkillUiLegeal() && !this.scene.isAllDie()) {
                    this.checkAndOpenAni(this.tableHunterSupportAni, index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index);
                    zj.Game.EventManager.event(zj.GameEvent.SKILL_CD_OK, { isOk: true });
                }
                else {
                    this.checkAndCloseAni(this.tableHunterSupportAni, index);
                }
            }
            else {
                this.checkAndCloseAni(this.tableHunterSupportAni, index);
            }
        };
        Fight_RoleMsg.prototype.FreshTime = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                return;
            }
            if (this.LabelBattleTime) {
                this.LabelBattleTime.text = zj.Helper.GetTimeStr1(this.scene.battleTime / 1000);
            }
        };
        Fight_RoleMsg.prototype.FreshRage = function (general) {
            if (general != null && general.relySupportRole != null) {
                if (this.tableRageValue[general.roleId] == null) {
                    return;
                }
                this.tableRageValue[general.roleId] = general.getRage();
                var _max_rage = general.getMaxRage();
                var percent = general.getRage() * 100 / _max_rage;
                this.tableRageProgress[general.eTeamNum + 1].y = 68 - (68 / 100) * percent;
                var index = general.eTeamNum + 1;
                if (percent >= 100) {
                    // if (this.tableSupportMask[index].visible) {
                    // 	this.tableSupportMask[index].visible = false;
                    // }
                    this.tableRageProgress[general.eTeamNum + 1].y = 68;
                    if (general.isPlaySkillUiLegeal()) {
                        this.checkAndOpenAni(this.tableHunterSupportAni, index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index);
                        zj.Game.EventManager.event(zj.GameEvent.SKILL_CD_OK, { isOk: true });
                    }
                    else {
                        this.checkAndCloseAni(this.tableHunterSupportAni, index);
                    }
                }
                else {
                    // if(!this.tableSupportMask[index].visible){
                    // 	this.tableSupportMask[index].visible = true;
                    // }
                    this.checkAndCloseAni(this.tableHunterSupportAni, index);
                }
            }
        };
        Fight_RoleMsg.prototype.FreshDying = function (general) {
            if (general != null) {
                if (this.tableHpValue[general.roleId] == null) {
                    return;
                }
                if (this.tableHpValue[general.roleId] != general.getHp()) {
                    this.tableHpValue[general.roleId] = general.getHp();
                }
                var index = general.eTeamNum + 1;
                var realPercet = general.getHp() / general.getMaxHp();
                if (realPercet <= zj.ConstantConfig_RoleBattle.DYING_SHOW_PERCENT) {
                    this.checkAndOpenAni(this.tableHunterDeadAni, index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index);
                }
                else {
                    this.checkAndCloseAni(this.tableHunterDeadAni, index);
                }
            }
        };
        Fight_RoleMsg.prototype.FreshCdLabel = function (general) {
            if (general != null && general.bDead == false) {
                if (this.tableHunterCdAni[general.eTeamNum + 1] == null) {
                    return;
                }
                var cd = zj.SkillCdMgr.Instance.getCurCd(general.getPressSkill());
                if (cd == null) {
                    return;
                }
                var cur = cd.getTime();
                var max = cd.getMaxTime();
                var label = this.tableCdLabel[general.eTeamNum + 1];
                if (label == null) {
                    return;
                }
                var value = Math.floor(cur / 1000) + 1;
                var beanNum = general.getCurBeanNum();
                if (cur == 0 || beanNum != 0) {
                    label.visible = false;
                }
                else {
                    if (this.tableCdValue[general.roleId] != value) {
                        label.visible = true;
                        label.text = value;
                        this.tableCdValue[general.roleId] = value;
                    }
                }
                var index = general.eTeamNum + 1;
                if (general.isHandleCdOk()) {
                    //this.tableCdProgress[index].visible=false;
                    this.tableCdBoard[index].visible = false;
                    if (general.isPlaySkillUiLegeal()) {
                        this.checkAndOpenAni(this.tableHunterCdAni, index, zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index);
                    }
                    else {
                        this.checkAndCloseAni(this.tableHunterCdAni, index);
                    }
                }
                else {
                    //this.tableCdProgress[index].visible=true;
                    this.tableCdBoard[index].visible = true;
                    var percent = 100;
                    if (max != 0) {
                        percent = 100 - cur * 100 / max;
                        // self.tableCdProgress[index]:setPercentage(percent);
                        this.checkAndCloseAni(this.tableHunterCdAni, index);
                    }
                }
            }
        };
        Fight_RoleMsg.prototype.OnTouchBegan = function (e) {
            if (this.scene.bBossPause) {
                return;
            }
            // if (Gmgr.Instance.bFightAuto) {
            // 	return;
            // }
            var x = e.stageX;
            var y = e.stageY;
            for (var i = 0; i < this.tableTouch.length; i++) {
                var v = this.tableTouch[i];
                if (zj.Helper.bInNodeRect(v, x, y)) {
                    this.selIndex = i;
                    this.location.setTo(x, y);
                    return;
                }
            }
            for (var i = 0; i < this.tableRageTouch.length; i++) {
                var v = this.tableRageTouch[i];
                if (zj.Helper.bInNodeRect(v, x, y)) {
                    this.selIndex = i;
                    this.location.setTo(x, y);
                    return;
                }
            }
        };
        Fight_RoleMsg.prototype.ButtonYH = function () {
            if (this.scene.bBossPause) {
                return;
            }
            if (zj.Gmgr.Instance.bFightAuto) {
                return;
            }
            if (this.tableRoleYH) {
                var general = this.tableRoleYH;
                if (general.getRage() < general.getMaxRage()) {
                    return;
                }
                if (!general.isPlaySkillLegeal()) {
                    return;
                }
                if (this.scene.checkAllEnemyDead()) {
                    return;
                }
                this.scene.dealYH(general);
            }
        };
        Fight_RoleMsg.prototype.TouchRage = function (general, k) {
            if (general != null && this.scene.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                if (general.relySupportRole == null || general.getRage() < general.relySupportRole.getSupportConsume()) {
                    return;
                }
                if (!general.isPlaySkillLegeal()) {
                    return;
                }
                if (!general.relySupportRole.isPlaySkillLegeal()) {
                    return;
                }
                if (this.scene.checkAllEnemyDead()) {
                    return;
                }
                this.scene.dealSupport(general);
                if (zj.Gmgr.Instance.isTeachBattleEnd()) {
                    zj.Teach.addTeaching();
                }
            }
        };
        Fight_RoleMsg.prototype.TouchPress = function (general, k) {
            if (general != null && this.scene.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                if (zj.Gmgr.Instance.isTeachBattleEnd()) {
                    if (this.scene.checkAllEnemyDead()) {
                        return;
                    }
                    if (general.playSkillAtk(0)) {
                        zj.Teach.addTeaching();
                    }
                }
                else {
                    if (!general.isPlaySkillLegeal()) {
                        return;
                    }
                    if (this.scene.checkAllEnemyDead()) {
                        return;
                    }
                    general.setNoticeTouchType(message.ESkillType.SKILL_TYPE_HANDLE);
                }
            }
        };
        Fight_RoleMsg.prototype.OnTouchMoved = function (x, y) {
            if (this.scene.bBossPause) {
                return;
            }
            if (zj.Gmgr.Instance.bFightAuto) {
                return;
            }
            for (var i = 0; i < this.tableRageTouch.length; i++) {
                var v = this.tableRageTouch[i];
                if (zj.Helper.bInNodeRect(v, x, y)) {
                    var general = this.tableRoles[this.tableKey[i]];
                    this.TouchRage(general, i);
                    return;
                }
            }
        };
        Fight_RoleMsg.prototype.OnTouchEnded = function (e) {
            if (this.selIndex >= 0) {
                var x = e.stageX;
                var y = e.stageY;
                for (var i = 0; i < this.tableTouch.length; i++) {
                    var v = this.tableTouch[i];
                    if (zj.Helper.bInNodeRect(v, x, y)) {
                        if (i == this.selIndex) {
                            var general = this.tableRoles[this.tableKey[i]];
                            this.TouchPress(general, i);
                        }
                    }
                }
                for (var i = 0; i < this.tableRageTouch.length; i++) {
                    var v = this.tableRageTouch[i];
                    if (zj.Helper.bInNodeRect(v, x, y)) {
                        if (i == this.selIndex) {
                            var general = this.tableRoles[this.tableKey[i]];
                            this.TouchRage(general, i);
                        }
                    }
                }
            }
            this.selIndex = -1;
            this.location.setTo(0, 0);
            if (this.buffView && this.buffView.scaleX != 0) {
                this.buffScale();
            }
        };
        Fight_RoleMsg.prototype.ButtonPause_CallBack = function () {
            this.scene.pauseAll();
            zj.loadUI(zj.Fight_Pop)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Fight_RoleMsg.prototype.ButtonBuffShow_CallBack = function () {
            var _this = this;
            if (!this.buffView) {
                zj.loadUI(zj.Fight_BuffView)
                    .then(function (dialog) {
                    _this.setView(dialog);
                    _this.buffScale();
                });
            }
            else {
                this.buffScale();
            }
        };
        Fight_RoleMsg.prototype.setView = function (dialog) {
            this.buffView = dialog;
            this.buffView.scaleX = this.buffView.scaleY = 0;
            this.addChild(this.buffView);
            this.buffView.y = this.ButtonBuffShow.y + this.ButtonBuffShow.height;
        };
        Fight_RoleMsg.prototype.buffScale = function () {
            var _this = this;
            egret.Tween.removeTweens(this.buffView);
            if (this.buffView.scaleX == 0) {
                this.buffView.visible = true;
                egret.Tween.get(this.buffView)
                    .to({ scaleX: 1, scaleY: 1 }, 300);
            }
            else {
                egret.Tween.get(this.buffView)
                    .to({ scaleX: 0, scaleY: 0 }, 300).call(function () {
                    _this.buffView.visible = false;
                });
            }
        };
        Fight_RoleMsg.prototype.ButtonAuto_CallBack = function () {
            if (this.scene.bHideAuto) {
                return;
            }
            if (this.scene.bLockAuto) {
                return;
            }
            if (zj.Gmgr.Instance.bContinueBattle && !zj.Gmgr.Instance.bStopContinueFromBattle) {
            }
            else {
                if (this.speedActioning) {
                    return;
                }
                if (zj.Gmgr.Instance.debugLocalFight) {
                    zj.Gmgr.Instance.bFightAuto = !zj.Gmgr.Instance.bFightAuto;
                    // Gmgr.Instance.bFightAuto = true;
                }
                else {
                    var tag = zj.yuan3(zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType], false, true);
                    zj.Gmgr.Instance.bFightAuto = tag;
                    // Gmgr.Instance.bFightAuto = true;
                    zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType] = zj.Gmgr.Instance.bFightAuto;
                }
                this.DealAutoButton();
                this.modifySpeedAni(zj.Gmgr.Instance.bakeSpeedIndex);
                zj.Teach.addTeaching();
            }
        };
        Fight_RoleMsg.prototype.ButtonSpeed_CallBack = function () {
            if (this.speedMax == 1 && zj.Gmgr.Instance.bakeSpeedIndex == 1) {
                var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Error.speed_next_open, zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[1]);
                zj.toast(_tmp);
                return;
            }
            if (this.speedMax == 2 && zj.Gmgr.Instance.bakeSpeedIndex == 2) {
                if (zj.Gmgr.Instance.firstTouchSpeed == false) {
                    zj.Gmgr.Instance.firstTouchSpeed = true;
                    var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Error.speed_max_open, zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[2], zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT_VIP[2]);
                    zj.toast(_tmp);
                    return;
                }
            }
            zj.Gmgr.Instance.bakeSpeedIndex = zj.Gmgr.Instance.bakeSpeedIndex + 1;
            if (zj.Gmgr.Instance.bakeSpeedIndex > this.speedMax) {
                zj.Gmgr.Instance.bakeSpeedIndex = 1.0;
            }
            this.modifySpeedAni(zj.Gmgr.Instance.bakeSpeedIndex);
            this.scene.modifySpeedData(zj.Gmgr.Instance.bakeSpeedIndex);
            this.scene.speedRecord(zj.Gmgr.Instance.bakeSpeedIndex);
            if (zj.Gmgr.Instance.debugLocalFight == false) {
                zj.Gmgr.Instance.backupSpeedTbl[zj.Gmgr.Instance.fightType] = zj.Gmgr.Instance.bakeSpeedIndex;
            }
            zj.Teach.addTeaching();
        };
        Fight_RoleMsg.prototype.onButtonClickLeft = function () {
        };
        Fight_RoleMsg.prototype.DealSpeedButton = function () {
            this.modifySpeedAni(zj.Gmgr.Instance.bakeSpeedIndex);
            this.scene.modifySpeedData(zj.Gmgr.Instance.bakeSpeedIndex);
        };
        Fight_RoleMsg.prototype.modifySpeedAni = function (speedIndex) {
            if (this.speedAni != null) {
                var aniTbl = [0, 2, 4, 6];
                var tmpValue = zj.yuan3(zj.Gmgr.Instance.bFightAuto, 1, 0);
                this.speedAni.stopAllActions();
                this.speedAni.ChangeAction(aniTbl[speedIndex] + tmpValue);
            }
        };
        Fight_RoleMsg.prototype.ButtonHelp_CallBack = function () {
            if (zj.Gmgr.Instance.bReplay) {
                if (this.scene != null) {
                    zj.Teach.addTeaching();
                    this.scene.startHelp();
                }
            }
        };
        Fight_RoleMsg.prototype.Pause = function () {
            for (var i = 0; i < this.tableCdProgress.length; i++) {
                var v = this.tableCdProgress[i];
                v.Pause();
            }
        };
        Fight_RoleMsg.prototype.resume = function () {
            for (var i = 0; i < this.tableCdProgress.length; i++) {
                var v = this.tableCdProgress[i];
                v.resume();
            }
        };
        Fight_RoleMsg.prototype.InitPause = function () {
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                if (zj.Game.TeachSystem.curPart == zj.teachBattle.teachPartId_1_1
                    || zj.Game.TeachSystem.curPart == zj.teachBattle.teachPartId_1_3
                    || zj.Game.TeachSystem.curPart == zj.teachBattle.teachPartId_1_5
                    || zj.Game.TeachSystem.curPart == zj.teachBattle.teachPartId_1_10) {
                    this.ButtonPause.touchEnabled = false;
                    this.ButtonPause.enabled = false;
                    this.ButtonSend.touchEnabled = false;
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                this.ButtonPause.touchEnabled = false;
                this.ButtonPause.enabled = false;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                this.ButtonPause.touchEnabled = false;
                this.ButtonPause.enabled = false;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                this.ButtonPause.touchEnabled = false;
                this.ButtonPause.enabled = false;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                this.SpriteClock.visible = false;
                this.LabelBattleTime.visible = false;
            }
        };
        Fight_RoleMsg.prototype.ForceLockPause = function () {
            // this.ButtonPause.touchEnabled = false;
        };
        Fight_RoleMsg.prototype.InitAuto = function () {
            if (this.scene.bHideAuto == false) {
                this.LayerAuto.visible = true;
                if (this.scene.bLockAuto == false) {
                    this.SpriteIconLock.visible = false;
                }
                this.SpriteBoardOpen.visible = false;
            }
            if (zj.Gmgr.Instance.bContinueBattle && !zj.Gmgr.Instance.bStopContinueFromBattle) {
                this.DealAutoButton(9);
            }
            else {
                this.DealAutoButton();
            }
            this.DealSpeedButton();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK && !zj.Gmgr.Instance.debugLocalFight) {
                // this.NodeAutoAni.enabled = false;
                this.NodeAutoAni.touchEnabled = false;
            }
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE && !zj.Gmgr.Instance.debugLocalFight) {
                // this.NodeAutoAni.enabled = false;
                this.NodeAutoAni.touchEnabled = false;
            }
            if (zj.Gmgr.Instance.bContinueBattle && !zj.Gmgr.Instance.bStopContinueFromBattle) {
                this.LabelSuccessionBattleNum.visible = false;
                this.LabelSuccessionBattleNum.text = zj.Gmgr.Instance.currContinueBattleSum + "/" + zj.Gmgr.Instance.maxContinueBattleSum;
            }
            else {
                this.LabelSuccessionBattleNum.visible = false;
            }
        };
        Fight_RoleMsg.prototype.DealAutoButton = function (index) {
            if (index != null) {
                if (this.autoAni != null) {
                    this.autoAni.stopAllActions();
                    this.autoAni.ChangeAction(index);
                }
            }
            else {
                if (this.NodeAutoAni != null) {
                    if (zj.Gmgr.Instance.bFightAuto == false) {
                        if (this.autoAni != null) {
                            this.autoAni.stopAllActions();
                            this.autoAni.ChangeAction(0);
                        }
                    }
                    else {
                        if (this.autoAni != null) {
                            this.autoAni.stopAllActions();
                            this.autoAni.ChangeAction(1);
                        }
                    }
                }
            }
        };
        Fight_RoleMsg.prototype.FreshReviveUi = function (role) {
            var num = role.eTeamNum + 1;
            this.tableCdNode[num].visible = true;
            this.tableCdLabel[num].visible = true;
            if (this.tableRageProgress[num] != null) {
                this.tableRageProgress[num].visible = true;
            }
        };
        Fight_RoleMsg.prototype.FreshDeadUi = function (role) {
            var num = role.eTeamNum + 1;
            //自身头像变灰
            if (this.tableHead[num] != null) {
                zj.Helper.SetImageFilterColor(this.tableHead[num], "gray");
            }
            //援护头像变灰
            if (this.tableSupportHead[num] != null) {
                zj.Helper.SetImageFilterColor(this.tableSupportHead[num], "gray");
            }
            // this.tableCdNode[num].visible = false;
            this.tableCdLabel[num].visible = false;
            if (this.tableRageProgress[num] != null) {
                this.tableRageProgress[num].visible = false;
            }
            if (this.tableHunterCdAni[num] != null) {
                this.tableHunterCdAni[num].spx.spine.visible = false;
            }
            if (this.tableHunterSupportAni[num] != null) {
                this.tableHunterSupportAni[num].spx.spine.visible = false;
            }
            if (this.tableHunterDeadAni[num] != null) {
                this.tableHunterDeadAni[num].spx.spine.visible = false;
            }
        };
        Fight_RoleMsg.prototype.FreshNewUi = function (role) {
            var num = role.eTeamNum + 1;
            this.tableHeadNode[num].visible = false;
            this.tableCdNode[num].visible = true;
            this.tableCdLabel[num].visible = true;
            this.tableHead[num].visible = true;
            this.tableHead[num].source = zj.cachekey(role.battleHead, this);
            this.tableHead[num].width = 95;
            this.tableHead[num].height = 93;
            this.tableHpValue[role.roleId] = 0;
            this.tableRageValue[role.roleId] = -1;
            this.tableCdValue[role.roleId] = -1;
            this.tableCdTip[role.roleId] = this.tableCdPos[num];
            this.tableTeachRage[role.roleId] = this.tableRageTouch[num];
            this.tableTeach[role.roleId] = this.tableBoard[num];
            //this.tableTeachAngry[role.roleId] = this.tableRagePos[i];
        };
        Fight_RoleMsg.prototype.GetCdTipPos = function (num, type) {
            var x = 0;
            var y = 0;
            if (num == 4) {
                var pos = zj.Helper.GetWolrdPoint(this.SpriteSupport, this.point);
                x = pos.x;
                y = pos.y;
            }
            else if (type == 1) {
                if (num >= 0 && num < 4) {
                    var pos = zj.Helper.GetWolrdPoint(this.tableHeadNode[num], this.point);
                    x = pos.x;
                    y = pos.y;
                }
            }
            else if (type == 2) {
                if (num >= 0 && num < 4) {
                    if (this.tableSupportNode[num] == null) {
                        x = 0;
                        y = 0;
                    }
                    else {
                        var pos = zj.Helper.GetWolrdPoint(this.tableSupportNode[num], this.point);
                        x = pos.x;
                        y = pos.y;
                    }
                }
            }
            return [x, y];
        };
        Fight_RoleMsg.prototype.TouchSkillUiEffect = function (general, index) {
        };
        Fight_RoleMsg.prototype.PushUi = function (ui, btn) {
            //按钮高亮
            // let _button = btn;
            // //界面加载
            // loadUI(HXH_HunterUserStrength)
            //     .then((dialog: HXH_HunterUserStrength) => {
            //         dialog.SetInfo();
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        };
        /**
         * 左边图标
         */
        Fight_RoleMsg.prototype.ButtonClickLeft_CallBack = function () {
            var _this = this;
            if (this.bChatActioning) {
                return;
            }
            this.ButtonClickLeft.enabled = false;
            var action = null;
            if (this.chatClickPop) {
                this.ButtonClickLeft.scaleX = -1;
                egret.Tween.get(this.NodeHave).to({ x: 0, y: 0 }, 500, egret.Ease.backOut).call(function () {
                    _this.call();
                });
            }
            else {
                this.ButtonClickLeft.scaleY = 1;
                egret.Tween.get(this.NodeHave).to({ x: -430, y: 0 }, 500, egret.Ease.backOut).call(function () {
                    _this.call();
                });
            }
            this.bChatActioning = true;
        };
        Fight_RoleMsg.prototype.call = function () {
            this.bChatActioning = false;
            this.ButtonClickLeft.enabled = true;
            this.chatClickPop = !this.chatClickPop;
            if (this.LabelChat != null && !this.bHideLabel) {
                this.LabelChat.visible = !this.chatClickPop;
            }
        };
        /**
         * 聊天界面
         */
        Fight_RoleMsg.prototype.ButtonSend_CallBack = function () {
            zj.loadUI(zj.Chat_Main).then(function (dialog) {
                dialog.show();
                dialog.inittypr(1);
            });
        };
        Fight_RoleMsg.prototype.combatChat = function (e) {
            this.chatClickPop = true;
            this.ButtonClickLeft_CallBack();
            this.LabelInfo.text = "【" + e.data.name + "】" + " " + JSON.parse(e.data.content)[0].content;
        };
        Fight_RoleMsg.prototype.LoadChat = function () {
            var x = this.SpriteChatClip.x;
            var y = this.SpriteChatClip.y;
            this.ChatClipWidth = this.SpriteChatClip.width;
            this.SpriteChatClip.visible = false;
            this.LabelInfo.visible = false;
            this.ButtonClickLeft.scaleX = -1;
        };
        Fight_RoleMsg.prototype.LoadChatInfo = function () {
        };
        Fight_RoleMsg.prototype.CloseAni = function () {
        };
        Fight_RoleMsg.prototype.SetRelicBox = function (step) {
            var maxStep = zj.TableInstanceRelic.Item(zj.Game.PlayerMissionSystem.fightExt + 1).max_step;
            this.NodeRelic.visible = true;
            if (step == 1) {
                for (var i = 0; i < maxStep; i++) {
                    var chestId = zj.TableInstanceRelic.Item(zj.Game.PlayerMissionSystem.fightExt + 1).open_chest[i];
                    var chestPic = zj.TableInstanceRelicChest.Item(chestId).path;
                    chestPic[1] = chestPic[0];
                    zj.Set.ButtonBackgroud(this["ButtonChestBox" + (i + 1)], chestPic[0], chestPic[0], chestPic[2]);
                    this["ButtonChestBox" + (i + 1)].enabled = false;
                }
                this.SpriteBoard.scaleX = this.SpriteBoard.scaleY = 1.1;
                var scale = zj.Device.screenWidth / 960 >= 1 && 1 || (zj.Device.screenWidth / 960);
                this.LayerTopLeft.scaleX = this.LayerTopLeft.scaleY = scale;
            }
            if (this["ButtonChestBox" + (step - 1)] != null) {
                this["ButtonChestBox" + (step - 1)].enabled = true;
            }
        };
        return Fight_RoleMsg;
    }(zj.UI));
    zj.Fight_RoleMsg = Fight_RoleMsg;
    __reflect(Fight_RoleMsg.prototype, "zj.Fight_RoleMsg");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_RoleMsg.js.map