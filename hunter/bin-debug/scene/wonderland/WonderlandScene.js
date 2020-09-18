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
    // 贪婪之岛 HXH_Wonderland
    // 20190314
    // lizhengqiang
    var WonderlandScene = (function (_super) {
        __extends(WonderlandScene, _super);
        function WonderlandScene() {
            var _this = _super.call(this) || this;
            _this.stageType = {
                peace: 2,
                pk: 3,
                gamble: 0,
                port: 1,
                boss: 0,
                replica: 0,
            };
            _this.board = [];
            _this.lock = [];
            _this.tips = [];
            _this.skinName = "resource/skins/wonderland/WonderlandSceneSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_WONDERLAND);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            return _this;
        }
        WonderlandScene.prototype.init = function () {
            var _this = this;
            this.adaptScene();
            this.groupAnimation.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "island", "armatureName", null, 0)
                .then(function (display) {
                display.x = 100;
                display.y = zj.UIManager.StageHeight;
                _this.groupAnimation.addChildAt(display, 1);
            });
            for (var i = 1; i <= 6; i++) {
                this["imgBoardName" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this["onClick" + i + "_1"], this);
                this["imgBoardName" + i].addEventListener(egret.TouchEvent.TOUCH_END, this["onClick" + i + "_2"], this);
                this["imgBoardName" + i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this["onClick" + i + "_3"], this);
                for (var j = 1; j <= 5; j++) {
                    this["rectClick" + i + "_" + j].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this["onClick" + i + "_1"], this);
                    this["rectClick" + i + "_" + j].addEventListener(egret.TouchEvent.TOUCH_END, this["onClick" + i + "_2"], this);
                    this["rectClick" + i + "_" + j].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this["onClick" + i + "_3"], this);
                }
                this["imgLine" + i].alpha = 0;
            }
            this.serverFormat = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            this.setInfo();
            this.initList();
            this.updateBossInfo();
            this.updatePortInfo();
            this.updateFishInfo();
            this.timer = new egret.Timer(990, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                _this.updateBossInfo();
                _this.updatePortInfo();
                _this.updateFishInfo();
                _this.adaptScene();
            }, this);
            this.timer.start();
            this.CheckTeach();
        };
        WonderlandScene.prototype.initList = function () {
            var _this = this;
            this.generalIdList = [];
            var serverFormatTogether = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.serverFormat.generals); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                serverFormatTogether.push(v);
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(this.serverFormat.reserves); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                serverFormatTogether.push(v);
            }
            var hasServerFormat = zj.Table.FindF(serverFormatTogether, function (k, v) {
                var haveSame = false;
                for (var _i = 0, _a = zj.HelpUtil.GetKV(_this.serverFormat.generals); _i < _a.length; _i++) {
                    var _b = _a[_i], kk = _b[0], vv = _b[1];
                    if (vv != 0 && vv != v && zj.PlayerHunterSystem.GetGeneralId(v)) {
                        haveSame = true;
                    }
                }
                if (v != 0 && !haveSame) {
                    return true;
                }
                return false;
            });
            if (hasServerFormat) {
                for (var i = 0; i < this.serverFormat.generals.length; i++) {
                    var v = this.serverFormat.generals[i];
                    if (v != 0) {
                        this.generalIdList.push(v);
                    }
                }
                for (var i = 0; i < this.serverFormat.reserves.length; i++) {
                    var v = this.serverFormat.reserves[i];
                    if (v != 0) {
                        this.generalIdList.push(v);
                    }
                }
                this.generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[0];
                this.isChange = zj.Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[1];
            }
            else {
                this.generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
                this.isChange = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null)[1];
            }
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];
            for (var _f = 0, _g = zj.HelpUtil.GetKV(this.generalList); _f < _g.length; _f++) {
                var _h = _g[_f], k = _h[0], v = _h[1];
                if (Number(k) < 4) {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
                }
                else {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
                }
            }
        };
        WonderlandScene.prototype.adaptScene = function () {
            var scaleX = zj.UIManager.StageWidth - 1344 > 0 ? zj.UIManager.StageWidth / 1344 : 1;
            var scaleY = zj.UIManager.StageHeight - 640 > 0 ? zj.UIManager.StageHeight / 640 : 1;
            this.groupMap.scaleX = scaleX;
            this.groupMap.scaleY = scaleY;
        };
        WonderlandScene.prototype.setInfo = function () {
            for (var i = 0; i < 6; i++) {
                this["imgName" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.name[i], this);
            }
            // 安多尼拔
            var peaceInfo = zj.TableWonderland.Item(this.stageType.peace);
            var open1 = (zj.Game.PlayerInfoSystem.BaseInfo.level >= peaceInfo.mix_level && zj.Game.PlayerInfoSystem.BaseInfo.level <= peaceInfo.max_level);
            this.imgLock1.visible = !open1;
            if (open1) {
                this.imgType1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[1], this);
                this.imgBoardName1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imgType1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
                this.imgBoardName1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imgTip1.visible = (zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.RUNES) ||
                zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FISH) ||
                zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.DOUBLE));
            this.imgDone.visible = false;
            // 杜力亚司
            var open3 = true;
            this.imgLock3.visible = !open3;
            if (open3) {
                this.imgType3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[6], this);
                this.imgBoardName3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imgType3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
                this.imgBoardName3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imgTip3.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FASHION);
            // 寿富拉比
            var open6 = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, false);
            this.groupTime6.visible = open6;
            this.imgLock6.visible = !open6;
            this.imgType6.visible = open6;
            this.lbLevel6.visible = !open6;
            this.lbLevel6.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS).condition);
            if (open6) {
                this.imgType6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[4], this);
                this.imgBoardName6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imgType6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
                this.imgBoardName6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
                this.lbEndTime6.visible = false;
            }
            this.imgTip6.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.ZORK_BOSS);
            // 港口
            var open4 = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, false);
            this.groupTime4.visible = open4;
            this.imgLock4.visible = !open4;
            this.imgType4.visible = open4;
            this.lbLevel4.visible = !open4;
            this.lbLevel4.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND).condition);
            if (open4) {
                this.imgType4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[7], this);
                this.imgBoardName4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imgType4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
                this.imgBoardName4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
                this.lbEndTime4.visible = false;
            }
            this.imgTip4.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.PORT);
            // 山贼老巢
            var open5 = false;
            this.imgLock5.visible = !open5;
            this.imgType5.visible = true;
            this.lbLevel5.visible = false;
            this.imgBoardName5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            this.imgType5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
            this.imgTip5.visible = false;
            // 大草原
            var fightInfo = zj.TableWonderland.Item(this.stageType.pk);
            var open2 = (zj.Game.PlayerInfoSystem.BaseInfo.level >= fightInfo.mix_level && zj.Game.PlayerInfoSystem.BaseInfo.level <= fightInfo.max_level);
            this.imgLock2.visible = !open2;
            this.lbLevel2.visible = !open2;
            this.lbLevel2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, fightInfo.mix_level);
            if (open2) {
                this.imgType2.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[3], this);
                this.imgBoardName2.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imgType2.visible = false;
                this.imgBoardName2.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imgTip2.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FIGHT);
            for (var i = 1; i <= 6; i++) {
                var board = this["imgLock" + i].visible;
                var tips = this["imgTip" + i].visible;
                var lock = this["imgLock" + i].visible;
                this.board.push(board);
                this.tips.push(tips);
                this.lock.push(lock);
            }
        };
        WonderlandScene.prototype.updateBossInfo = function () {
            this.imgTip3.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FASHION);
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
            if (progress != null) {
                if (this.bossState != progress.info) {
                    this.bossState = progress.info;
                    this.imgTip6.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.ZORK_BOSS);
                }
                if (progress.leftTime == 0) {
                    zj.Game.PlayerZorkSystem.bossInfo();
                }
            }
            zj.Game.PlayerZorkSystem.bossInfo().then(function () { });
            var strTime = progress.leftTime; //- Math.floor(egret.getTimer() / 1000);
            var strTimeText = zj.Helper.GetTimeStr(strTime > 0 ? strTime : 0, false);
            if (this.bossState == 0) {
                this.lbEndTime6.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTimeText));
            }
            else {
                this.lbEndTime6.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTimeText));
            }
        };
        WonderlandScene.prototype.updatePortInfo = function () {
            var _a = zj.PlayerDarkSystem.PortOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var strTime = zj.Set.timeLeaveSec(lastTime);
            if (!bOpen) {
                this.lbEndTime4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTime));
            }
            else {
                this.lbEndTime4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTime));
            }
        };
        WonderlandScene.prototype.updateFishInfo = function () {
            if (!this.imgDone.visible && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0 && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) <= 0) {
                this.imgDone.visible = true;
            }
            else if (this.imgDone.visible && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                this.imgDone.visible = false;
            }
        };
        WonderlandScene.prototype.SetFormatReqOnly = function () {
            if (zj.Device.isReviewSwitch) {
                this.aa();
            }
            var req = new message.SetFormationRequest();
            var formation = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
            req.body.formations.push(formation);
            zj.Game.Controller.send(req, this.SetFormatOnly_Visit, null, this, false);
        };
        WonderlandScene.prototype.SetFormatOnly_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.WonderlandEnterReq();
        };
        WonderlandScene.prototype.WonderlandEnterReq = function () {
            var req = new message.WonderlandEnterRequest();
            req.body.id = this.teachId == null ? this.info.wonderland_id : this.teachId;
            // req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, this.WonderlandEnter_Visit, null, this, false);
        };
        WonderlandScene.prototype.WonderlandEnter_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
            zj.Game.PlayerWonderLandSystem.mapBlockIndex = this.info.block_index;
            zj.Game.PlayerWonderLandSystem.wonderlandId = this.teachId == null ? this.info.wonderland_id : this.teachId;
            this.teachId = null;
            // Game.PlayerWonderLandSystem.wonderlandId = this.info.wonderland_id//this.teachId || this.info.wonderland_id
            var MapId = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).map_id;
            zj.MapSceneLoading.getInstance().loadFightRes(MapId, this.wonderland, this);
            zj.Teach.addTeaching();
        };
        WonderlandScene.prototype.wonderland = function () {
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneWonderland);
        };
        // 安多尼拔   和平仙境
        WonderlandScene.prototype.onClick1_1 = function () {
            this.onClick(1, 1);
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_2, true)) {
                this.info = zj.TableWonderland.Item(this.stageType.peace);
                this.SetFormatReqOnly();
            }
        };
        WonderlandScene.prototype.onClick1_2 = function () {
            this.onClick(1, 2);
        };
        WonderlandScene.prototype.onClick1_3 = function () {
            this.onClick(1, 2);
        };
        // 大草原
        WonderlandScene.prototype.onClick2_1 = function () {
            // this.onClick(2, 1);
            // loadUI(WonderLandChoose)
            //     .then((dialog: WonderLandChoose) => {
            //         dialog.show();
            //     });
        };
        WonderlandScene.prototype.onClick2_2 = function () {
            this.onClick(2, 2);
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, true)) {
                this.info = zj.TableWonderland.Item(this.stageType.pk);
                this.SetFormatReqOnly();
            }
        };
        WonderlandScene.prototype.onClick2_3 = function () {
            this.onClick(2, 2);
        };
        // 杜力亚司
        WonderlandScene.prototype.onClick3_1 = function () {
            this.onClick(3, 1);
        };
        WonderlandScene.prototype.onClick3_2 = function () {
            this.onClick(3, 2);
            // "HXH_FashionMain"
            zj.loadUI(zj.FashionMain)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init();
            });
        };
        WonderlandScene.prototype.onClick3_3 = function () {
            this.onClick(3, 2);
        };
        // 港口
        WonderlandScene.prototype.onClick4_1 = function () {
            this.onClick(4, 1);
        };
        WonderlandScene.prototype.onClick4_2 = function () {
            this.onClick(4, 2);
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, true)) {
                zj.loadUI(zj.DarkLandPortMainSence)
                    .then(function (Scene) {
                    Scene.Init();
                    Scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        WonderlandScene.prototype.onClick4_3 = function () {
            this.onClick(4, 2);
        };
        // 山贼老巢
        WonderlandScene.prototype.onClick5_1 = function () {
            this.onClick(5, 1);
        };
        WonderlandScene.prototype.onClick5_2 = function () {
            this.onClick(5, 2);
            zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.wait));
        };
        WonderlandScene.prototype.onClick5_3 = function () {
            this.onClick(5, 2);
        };
        // 寿富拉比
        WonderlandScene.prototype.onClick6_1 = function () {
            this.onClick(6, 1);
        };
        WonderlandScene.prototype.onClick6_2 = function () {
            this.onClick(6, 2);
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, true)) {
                zj.Game.PlayerZorkSystem.bossInfo().then(function () {
                    zj.loadUI(zj.ZorkBossMainPop)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
        };
        WonderlandScene.prototype.onClick6_3 = function () {
            this.onClick(6, 2);
        };
        WonderlandScene.prototype.onClick = function (index, type) {
            if (index < 1 || index > 6)
                return;
            if (type == 1) {
                this["groupZone" + index].scaleX = 1.2;
                this["groupZone" + index].scaleY = 1.2;
                this["imgLine" + index].alpha = 1;
            }
            else if (type == 2) {
                this["groupZone" + index].scaleX = 1;
                this["groupZone" + index].scaleY = 1;
                this["imgLine" + index].alpha = 0;
            }
        };
        WonderlandScene.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        WonderlandScene.prototype.SetTeachOpen = function () {
            for (var i = 1; i <= 6; i++) {
                this["imgLock" + i].visible = false;
                this["imgBoardName" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
                this["imgTip" + i].visible = false;
            }
        };
        WonderlandScene.prototype.SetTeachClose = function () {
            for (var i = 1; i <= 6; i++) {
                var pathIndex = this.board[i - 1] ? 2 : 1;
                this["imgLock" + i].visible = this.lock[i];
                this["imgBoardName" + i].source = (zj.UIConfig.UIConfig_Wonderland.board[pathIndex]);
                this["imgTip" + i].visible = (this.tips[i]);
            }
        };
        WonderlandScene.prototype.CheckTeach = function () {
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_ENTER_1) == true) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_WONDER_NPC);
            }
        };
        WonderlandScene.prototype.SetTeach = function (id) {
            if (id == null)
                return;
            this.teachId = id;
            var name = null;
            if (id == 1) {
                // 和平仙境
                name = "groupZone1";
            }
            else if (id == 4) {
                // 杀戮仙境 进入新手仙境
                name = "groupZone2";
            }
            else if (id == 5) {
                // 杀戮仙境 进入新手仙境
                name = "groupZone5";
            }
            return name;
        };
        WonderlandScene.prototype.aa = function () {
            this.serverFormat = zj.Game.PlayerFormationSystem.curFormations[12];
            if (this.serverFormat.generals[0] == 0) {
                this.serverFormat = zj.Game.PlayerFormationSystem.formatsServer[13];
            }
            this.generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[0];
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.generalList); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (Number(k) < 4) {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
                }
                else {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
                }
            }
        };
        return WonderlandScene;
    }(zj.Scene));
    zj.WonderlandScene = WonderlandScene;
    __reflect(WonderlandScene.prototype, "zj.WonderlandScene");
})(zj || (zj = {}));
//# sourceMappingURL=WonderlandScene.js.map