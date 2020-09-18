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
    var StageSceneMainCity = (function (_super) {
        __extends(StageSceneMainCity, _super);
        function StageSceneMainCity() {
            var _this = _super.call(this) || this;
            _this.sendX = -1;
            _this.sendY = -1;
            _this.playerLeader = null;
            _this.orderCnt = 1;
            _this.mapMovePos = new egret.Point();
            _this.mapOffX = 0;
            _this.mapMoveType = 0;
            _this.isMapAniMove = false;
            _this.isGoToDoor = false;
            _this.isInDoor = false;
            _this.mapLockTurn = false;
            return _this;
            // mainUI = MainCityPanel;
        }
        StageSceneMainCity.prototype.init = function () {
            this.isMainCity = true;
            _super.prototype.init.call(this);
        };
        StageSceneMainCity.prototype.show = function () { };
        StageSceneMainCity.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.isIntoMapComp = false;
            this.isSceneExit = false;
            zj.Gmgr.Instance.preLayerId = zj.Gmgr.Instance.layerId;
            zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_WONDERLAND);
            zj.Gmgr.Instance.bInSceneFight = false;
            this.mainMenu = null;
            this.aniManager = new zj.MainAniManager(this);
            this.checkMapType();
        };
        StageSceneMainCity.prototype.isInMap = function () {
            return true;
        };
        StageSceneMainCity.prototype.checkMapType = function () {
            if (this.isInMap()) {
                this.SetFormatReq();
            }
            else {
                this.checkTeach();
            }
        };
        StageSceneMainCity.prototype.checkTeach = function () {
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_LOGING_SCENE);
            _super.prototype.show.call(this);
        };
        StageSceneMainCity.prototype.initList = function () {
            var generalList;
            var serverFormat = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            var generalIdList = [];
            var serverFormatTogether = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(serverFormat.generals); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                serverFormatTogether.push(v);
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(serverFormat.reserves); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                serverFormatTogether.push(v);
            }
            var hasServerFormat = zj.Table.FindF(serverFormatTogether, function (k, v) {
                var haveSame = false;
                for (var _i = 0, _a = zj.HelpUtil.GetKV(serverFormat.generals); _i < _a.length; _i++) {
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
                for (var i = 0; i < serverFormat.generals.length; i++) {
                    var v = serverFormat.generals[i];
                    if (v != 0) {
                        generalIdList.push(v);
                    }
                }
                for (var i = 0; i < serverFormat.reserves.length; i++) {
                    var v = serverFormat.reserves[i];
                    if (v != 0) {
                        generalIdList.push(v);
                    }
                }
                generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(serverFormat)[0];
            }
            else {
                generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
            }
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
            zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];
            for (var _f = 0, _g = zj.HelpUtil.GetKV(generalList); _f < _g.length; _f++) {
                var _h = _g[_f], k = _h[0], v = _h[1];
                if (Number(k) < 4) {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
                }
                else {
                    zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
                }
            }
        };
        StageSceneMainCity.prototype.SetFormatReq = function () {
            var _this = this;
            this.initList();
            var req = new message.SetFormationRequest();
            var formation = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
            req.body.formations.push(formation);
            zj.Game.Controller.send(req, function (req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.mapEnterReq();
            }, null, this, false);
        };
        StageSceneMainCity.prototype.mapEnterReq = function () {
            var req = new message.WonderlandEnterRequest();
            req.body.id = 2;
            // req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, this.mapEnterResp, null, this, false);
        };
        StageSceneMainCity.prototype.mapEnterResp = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerWonderLandSystem.OpenMainCity(response);
            zj.Game.PlayerWonderLandSystem.wonderlandId = 0;
            this.intoScene();
            this.mainMenu = zj.newUI(zj.MainCitySceneNew);
            this.mainMenu.init();
            var _ownerScene = zj.newUI(zj.MainCityUI);
            _ownerScene.setMap(this);
            _ownerScene.setUI(this.mainMenu);
            this.ownerScene = _ownerScene;
            _ownerScene.show();
            this.initTouchTitles();
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_LOGING_SCENE);
            this.isIntoMapComp = true;
            if (zj.SceneManager.loginLoadingScene) {
                zj.Game.UIManager.removeScene(zj.SceneManager.loginLoadingScene);
                zj.SceneManager.loginLoadingScene = null;
            }
            // super.show();// 先添加地图Scene，再添加UI Scene
            // this.mainMenu.show();
        };
        // // 重新进入地图（新手玩家完成任务后，需重新拉取地图玩家）
        // private reMapEnterReq(){
        // 	let req = new message.WonderlandEnterRequest();
        // 	req.body.id = 2;
        // 	// req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
        // 	Game.PlayerWonderLandSystem.willGoRpg();
        // 	Game.Controller.send(req, this.reMapEnterResp, null, this, false);
        // }
        // private reMapEnterResp(req: aone.AoneRequest, resp: aone.AoneResponse){
        // 	let response = <message.WonderlandEnterResponse>resp;
        // 	if (response.header.result != 0) {
        // 		toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
        // 		return;
        // 	}
        // 	Game.PlayerWonderLandSystem.OpenMainCity(response);
        // 	Game.PlayerWonderLandSystem.wonderlandId = 0;
        // 	this.resetScene();
        // }
        StageSceneMainCity.prototype.intoScene = function () {
            this.InitRes();
            this.initMapBlock();
            var posItem = zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem;
            if (zj.SceneManager.initType == 1) {
                zj.SceneManager.initType = 0;
                posItem.scene_x = StageSceneMainCity.checkDoorPos - zj.Util.randomValue(20, 100); // TODO 服务器传的坐标
                posItem.scene_y = zj.Util.randomValue(440, 560);
                this.getPlayerLeader().changeDir(zj.TableEnum.TableEnumDir.Dir_Left);
            }
            else if (zj.SceneManager.initType == 2) {
                zj.SceneManager.initType = 0;
                posItem.scene_x = StageSceneMainCity.checkDoorPosLeft + zj.Util.randomValue(20, 100);
                posItem.scene_y = zj.Util.randomValue(430, 550);
            }
            else {
                posItem.scene_x = 1570 + zj.Util.randomValue(-50, 50); //280;// TODO 服务器传的坐标
                posItem.scene_y = 450 + zj.Util.randomValue(-10, 80);
            }
            this.proofLeaderPos(posItem);
            this.reqLeaderPos(this.playerLeader.moveDistance, this.playerLeader.verDistance, null);
            this.bPosFinished = true;
            this.initMobs();
            this.initMember();
            // Helper.PlaybgmByID(100001);
            zj.Game.SoundManager.playMusic("city_mp3", 0);
            zj.Game.EventManager.on(zj.GameEvent.RESET_PLAYER_AVATA, this.resetPlayerAvata, this);
            zj.Game.EventManager.on(zj.GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LICENCELEVEL_CHANGE, this.updateLicenceLevel, this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_SCENE, this.closeScene, this);
            // Game.EventManager.on(GameEvent.MAIN_CITY_MEMBER_LIST, this.reMapEnterReq, this);
            //更新时间差值
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
            this.proofTime();
            zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
        };
        StageSceneMainCity.prototype.resetScene = function () {
            for (var key in this.tableMembers) {
                var role = this.tableMembers[key];
                this.delMember(role.getPlayerId());
            }
            this.initMobs();
            this.initMember();
            if (this.playerLeader) {
                this.reqLeaderPos(this.playerLeader.moveDistance, this.playerLeader.verDistance, null);
            }
        };
        StageSceneMainCity.prototype.LoadMap = function (name) {
            this.isDoorAni = false;
            _super.prototype.LoadMap.call(this, name);
        };
        StageSceneMainCity.prototype.InitRes = function () {
            this.sceneType = zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem.sceneType;
            // let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
            this.LoadMap(zj.SceneManager.cityMapId);
            this.initCellNode();
            this.initTmx();
            this.initLeader();
            this.initLeaderPet();
            this.initBuilds(zj.StringConfig_Table.wonderlandMap, zj.SceneManager.cityMapId);
            this.flashSceneLeaderColor();
        };
        StageSceneMainCity.prototype.initBuilds = function (csvName, sceneId) {
            _super.prototype.initBuilds.call(this, zj.StringConfig_Table.wonderlandMap, zj.SceneManager.cityMapId);
            // 主城NPC头顶只有文字，不显示黑底儿(特殊处理)
            var list = this.tableNpcs;
            for (var key in list) {
                var npc = list[key];
                npc.back1.visible = false;
                if (npc.labelOpen) {
                    npc.labelOpen.size = 16;
                    npc.labelOpen.y = npc.back1.y + 44;
                    npc.labelOpen.x = npc.info.name_pos[0] - npc.labelOpen.textWidth / 2;
                }
            }
        };
        StageSceneMainCity.prototype.closeScene = function (ev) {
            if ("zj.LeagueHomeScene" == ev.data.typeName) {
                this.updateLeague();
            }
        };
        StageSceneMainCity.prototype.updateLeague = function () {
            if (this.playerLeader && this.playerLeader.playerInfo) {
                if (this.playerLeader.playerInfo.leagueId != zj.Game.PlayerInfoSystem.LeagueId) {
                    this.playerLeader.playerInfo.leagueId = zj.Game.PlayerInfoSystem.LeagueId;
                    this.playerLeader.playerInfo.leagueName = zj.Game.PlayerInfoSystem.leagueName;
                    this.playerLeader.reloadLeagueNameTitle();
                }
            }
        };
        StageSceneMainCity.prototype.updateLicenceLevel = function () {
            if (this.playerLeader) {
                this.playerLeader.playerInfo.licenceLevel = zj.Game.PlayerInfoSystem.LecenceLevel;
                this.playerLeader.loadDesignation();
            }
        };
        StageSceneMainCity.prototype.updateServerLine = function () {
            this.resetScene();
        };
        StageSceneMainCity.prototype.initTouchTitles = function () {
            var touchUI = zj.newUI(zj.MainCityTouchs);
            var touchTitles = touchUI.initTitles(this);
            this.mainMenu.initTouchTitle(touchTitles);
            this.banner = touchUI.getBanner(this);
            this.mainMenu.initBanner(this.banner);
            if (this.aniManager) {
                this.initImgClouds(touchUI.initMainAnis(zj.MainCityTouchs.key_img_cloud));
                this.initAnis(touchUI.initMainAnis(zj.MainCityTouchs.key_ani));
                this.initImgFlashs(touchUI.initMainAnis(zj.MainCityTouchs.key_img_flash));
                this.initImgCar(touchUI.initMainAnis(zj.MainCityTouchs.key_img_car));
                this.initImgMoves(touchUI.initMainAnis(zj.MainCityTouchs.key_img_move));
                this.initImgStatic(touchUI.initMainAnis(zj.MainCityTouchs.key_img_static));
                this.initDragon(touchUI.initMainAnis(zj.MainCityTouchs.key_dragon));
                this.initImgLight(touchUI.initMainAnis(zj.MainCityTouchs.key_img_light));
            }
        };
        StageSceneMainCity.prototype.initImgLight = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                    zj.Util.setBlendMode(img);
                    this.aniManager.addImgLight(img);
                }
            }
        };
        StageSceneMainCity.prototype.initDragon = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                this.addDragon(group, data[1]);
            }
        };
        StageSceneMainCity.prototype.addDragon = function (group, data) {
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this.ownerScene, data.name)
                .then(function (display) {
                display.x = data.x;
                display.y = data.y;
                display.scaleX = data.scaleX;
                display.scaleY = data.scaleY;
                zj.setDragonBonesRemove(display);
                group.addChild(display);
                var names = display.animation.animationNames;
                display.animation.play(names[0]);
            });
        };
        StageSceneMainCity.prototype.initImgCar = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                    this.aniManager.addCar(img);
                }
            }
            this.aniManager.initCar();
        };
        StageSceneMainCity.prototype.initImgStatic = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                }
            }
        };
        StageSceneMainCity.prototype.initImgClouds = function (items) {
            if (!items || !this.aniManager) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                    this.aniManager.addCloud(img);
                }
            }
        };
        StageSceneMainCity.prototype.initImgMoves = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                    this.aniManager.addImgMove(img);
                }
            }
        };
        StageSceneMainCity.prototype.initImgFlashs = function (items) {
            if (!items) {
                return;
            }
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var group = this[data[0] + layerExt];
                var img = data[1];
                if (group && img) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    group.addChild(img);
                    this.aniManager.addImgFlash(img);
                }
            }
        };
        StageSceneMainCity.prototype.initAnis = function (items) {
            if (!items) {
                return;
            }
            this.aniList = [];
            var layerExt = "_node_map_ani";
            for (var i = 0; i < items.length; ++i) {
                var data = items[i];
                var res = StageSceneMainCity.ani_names[i];
                var ani = null;
                if (i == 1 || i == 7) {
                    ani = zj.Game.AnimationManager.createTime(res, 2000, 8000);
                }
                else {
                    ani = zj.Game.AnimationManager.create(res);
                }
                if (ani) {
                    ani.x = data[1].x;
                    ani.y = data[1].y;
                    // ani.setBlendMode();
                    var group = this[data[0] + layerExt];
                    group.addChild(ani);
                    ani.onPlay();
                    this.aniList.push(ani);
                    if (i == 4) {
                        this.aniManager.addDove(ani);
                    }
                }
            }
        };
        StageSceneMainCity.prototype.initLeader = function () {
            var order = this.orderCnt;
            var leader = new zj.StageSceneCityLeader(this.map, this.MapBlockH);
            var x = 0;
            var y = 0;
            var scenePosInfo = zj.SceneManager.scenePosInfo;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                scenePosInfo.roleBase.name = zj.TextsConfig.TextsConfig_Common.nameDefault;
            }
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            leader.createWonderlandPlayer(scenePosInfo, 100, x, y, dir, x, y);
            leader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
            leader.dealSceneNotice(scenePosInfo);
            if (scenePosInfo.hpPre == 0) {
                leader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            this.playerLeader = leader;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneMainCity.prototype.initLeaderPet = function () {
            var pet = new zj.StageScenePlayerPet(this.map, this.MapBlockH);
            var x = -70;
            var y = 0;
            var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            pet.createPlayerPet(this.playerLeader, x, y, dir);
            this.playerLeaderPet = pet;
            this.orderCnt = this.orderCnt + 1;
            this.playerLeader.setPlayerPet(pet);
        };
        StageSceneMainCity.prototype.getPlayerLeader = function () {
            return this.playerLeader;
        };
        StageSceneMainCity.prototype.onEntryTopScene = function () {
            _super.prototype.onEntryTopScene.call(this);
            this.updateUIStates();
            this.reloadSpx();
            // this.resetPlayerAvata();
            this.aniManager.onEntryTopScene();
        };
        StageSceneMainCity.prototype.onLeaveTopScene = function () {
            _super.prototype.onLeaveTopScene.call(this);
            this.aniManager.onLeaveTopScene();
        };
        StageSceneMainCity.prototype.reloadSpx = function () {
            var list = this.tableMembers;
            for (var id in list) {
                var role = list[id];
                role.loadBody();
            }
            // let listpet = this.tableMemberPets;
            // for (let id in listpet) {
            // 	let pet = listpet[id] as StageScenePlayer;
            // 	pet.loadBody();
            // }
        };
        StageSceneMainCity.prototype.updateUIStates = function () {
            if (this.playerLeader) {
                this.playerLeader.name = zj.Game.PlayerInfoSystem.RoleName;
                this.playerLeader.ttfName.text = "Lv" + zj.Game.PlayerInfoSystem.Level + " " + this.playerLeader.name;
                // this.playerLeader.ttfLv.text = "Lv" + Game.PlayerInfoSystem.Level;
                if (zj.SceneManager.scenePosInfo && zj.Game.PlayerInfoSystem.BaseInfo.haloId != zj.SceneManager.scenePosInfo.roleBase.haloId) {
                    zj.SceneManager.scenePosInfo.roleBase.haloId = zj.Game.PlayerInfoSystem.BaseInfo.haloId;
                    this.playerLeader.playerInfo.haloId = zj.Game.PlayerInfoSystem.BaseInfo.haloId;
                    this.getPlayerLeader().loadAura();
                }
            }
        };
        StageSceneMainCity.prototype.resetPlayerAvata = function () {
            if (zj.SceneManager.scenePosInfo.roleBase.picId != zj.Game.PlayerInfoSystem.BaseInfo.picId) {
                // || SceneManager.scenePosInfo.roleBase.fashionId != Game.PlayerInfoSystem.BaseInfo.fashionId) {
                zj.SceneManager.scenePosInfo.roleBase.picId = zj.Game.PlayerInfoSystem.BaseInfo.picId;
                // SceneManager.scenePosInfo.roleBase.fashionId = Game.PlayerInfoSystem.BaseInfo.fashionId;
                var id = zj.PlayerVIPSystem.GetMapRoleInfo(zj.Game.PlayerInfoSystem.BaseInfo);
                zj.Gmgr.Instance.preLayerId = zj.Gmgr.Instance.layerId;
                zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_WONDERLAND);
                zj.Gmgr.Instance.bInSceneFight = false;
                this.getPlayerLeader().resetBody(id);
            }
        };
        StageSceneMainCity.prototype.loadMyImageComplete = function (name) {
            if (name.indexOf("men") != -1) {
                var men1 = this.tableObjByNames["men1"];
                var men2 = this.tableObjByNames["men2"];
                if (men1 && men2) {
                    var w1 = men1.width / 2;
                    var h1 = men1.height / 2;
                    var w2 = men2.width / 2;
                    var h2 = men2.height / 2;
                    var mleft = men1.x - w1;
                    var mtop = men2.y - h2;
                    var mright = men2.x + w2;
                    var mbottom = men2.y + h2;
                    var mrect = zj.Util.getMaskImgBlack(mright - mleft, mbottom - mtop);
                    mrect.x = mleft;
                    mrect.y = mtop;
                    men1.parent.addChild(mrect);
                    men1.mask = mrect;
                    mrect = zj.Util.getMaskImgBlack(mright - mleft, mbottom - mtop);
                    mrect.x = mleft;
                    mrect.y = mtop;
                    men2.parent.addChild(mrect);
                    men2.mask = mrect;
                    this.isDoorAni = true;
                }
            }
        };
        StageSceneMainCity.prototype.startDoorAni = function () {
            var _this = this;
            if (this.isDoorAni) {
                var men1_1 = this.tableObjByNames["men1"];
                var men2_1 = this.tableObjByNames["men2"];
                var x1 = men1_1.x;
                var y1 = men1_1.y;
                var w1 = men1_1.width;
                var x2 = men2_1.x;
                var y2 = men2_1.y;
                var w2 = men2_1.width;
                // 左侧小门动画
                var tw1 = egret.Tween.get(men1_1);
                var dis1 = -14;
                var scale1 = 0.88;
                tw1.to({ x: x1 - w1 * scale1, y: y1 + dis1, scaleX: scale1, scaleY: scale1 }, 600);
                tw1.call(function () {
                    egret.Tween.removeTweens(men1_1);
                }, this);
                // 右侧大门动画
                var scale2 = 1.12;
                var dis2 = 15;
                var tw2 = egret.Tween.get(men2_1);
                tw2.to({ x: x2 + w2 * scale1, y: y2 + dis2, scaleX: scale2, scaleY: scale2 }, 600);
                tw2.call(function () {
                    egret.Tween.removeTweens(men2_1);
                    _this.ownerScene.EnterAdventure();
                }, this);
            }
            else {
                this.ownerScene.EnterAdventure();
            }
        };
        StageSceneMainCity.prototype.flashSceneLeaderColor = function () {
            var _path = zj.Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
            var _color = zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            this.playerLeader.flashTtfNameColor(_color);
            this.playerLeader.flashBarTexture(_path);
        };
        StageSceneMainCity.prototype.initMobs = function () {
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    continue;
                }
                if (this.tableMembers[v.roleBase.id] != null) {
                    continue;
                }
                this.addMob(v, null, null);
            }
        };
        StageSceneMainCity.prototype.addMob = function (scenePosInfo, x, y) {
            // if (!scenePosInfo.roleBase.agree_enter) {
            // 	return;
            // }
            var order = this.orderCnt;
            var mob = new zj.StageSceneFightMob(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Left;
            var _a = this.proofMobPos(scenePosInfo.posItem.scene_x, scenePosInfo.posItem.scene_y), map_x = _a[0], map_y = _a[1];
            var screen_x = map_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = map_y - (this.playerLeader.verDistance - this.playerLeader.y);
            mob.createWonderlandMob(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            mob.setPos(screen_x, screen_y);
            this.tableMembers[scenePosInfo.roleBase.id] = mob;
            this.orderCnt = this.orderCnt + 1;
            this.willDelMobs[scenePosInfo.roleBase.id] = false;
        };
        StageSceneMainCity.prototype.initMember = function () {
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
                    continue;
                }
                if (v.roleBase.id == zj.Game.PlayerInfoSystem.RoleID) {
                    continue;
                }
                if (this.tableMembers[v.roleBase.id] != null) {
                    continue;
                }
                this.addMember(v, null, null);
            }
        };
        StageSceneMainCity.prototype.addMember = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var member = new zj.StageSceneFightInLeauge(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            var screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y);
            //scenePosInfo.roleBase.picId = 140001
            member.createWonderlandPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            member.dealSceneNotice(scenePosInfo);
            this.tableMembers[scenePosInfo.roleBase.id] = member;
            this.orderCnt = this.orderCnt + 1;
            this.addmemberPet(member);
        };
        StageSceneMainCity.prototype.addmemberPet = function (member) {
            var carry = member.getCarryPet();
            if (carry) {
                var pet = new zj.StageScenePlayerPet(this.map, this.MapBlockH);
                var x = -70;
                var y = 0;
                var dir = zj.TableEnum.TableEnumDir.Dir_Right;
                pet.createPlayerPet(member, x, y, dir);
                this.tableMemberPets[member.scenePosInfo.roleBase.id] = pet;
                this.orderCnt = this.orderCnt + 1;
                this.tableMembers[member.scenePosInfo.roleBase.id].setPlayerPet(pet);
            }
        };
        StageSceneMainCity.prototype.delMember = function (key_id) {
            if (this.tableMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.tableMembers[key_id]);
                zj.CC_SAFE_DELETE(this.tableMemberPets[key_id]);
            }
            else if (this.cacheMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.cacheMembers[key_id]);
            }
            delete this.tableMembers[key_id];
            delete this.tableMemberPets[key_id];
            delete this.cacheMembers[key_id];
            delete zj.Game.PlayerWonderLandSystem.scenePosInfo[key_id];
        };
        StageSceneMainCity.prototype.mobBattle = function (v, key_id) {
            if (this.tableMembers[key_id].isVisible() == true
                && v.otherBase.length != 0
                && ((this.tableMembers[v.otherBase[0].id] != null) || v.otherBase[0].id == zj.Game.PlayerInfoSystem.RoleID)) {
                this.tableMembers[key_id].dealSceneNotice(v);
                this.memberNoticeResult(key_id, v.otherBase[0].id);
                return true;
            }
            return false;
        };
        StageSceneMainCity.prototype.updateNoticePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                // if (v.roleBase.agree_enter) {
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
                    var key_id = v.roleBase.id;
                    if (this.tableTrees[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        // let tree = this.addTree(v);
                        // if (tree != null) {
                        // 	this.SetTreeBlock(tree);
                        // 	Astar.getInstance().clear_cached_paths();
                        // }
                    }
                    else if (this.tableTrees[key_id] != null) {
                        this.tableTrees[key_id].dealSceneNotice(v);
                    }
                }
                else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    var key_id = v.roleBase.id;
                    if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.tableMembers[key_id] = this.cacheMembers[key_id];
                        delete this.cacheMembers[key_id];
                        this.tableMembers[key_id].joinView();
                        this.tableMembers[key_id].dealSceneNotice(v);
                    }
                    else if (this.tableMembers[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.addMob(v, null, null);
                    }
                    else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) && ((v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE))) {
                        if (!this.willDelMobs[key_id]) {
                            this.delMember(key_id);
                        }
                    }
                    else if (this.tableMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && v.otherBase.length == 0)) {
                        this.tableMembers[key_id].leaveView();
                        this.cacheMembers[key_id] = this.tableMembers[key_id];
                        delete this.tableMembers[key_id];
                    }
                    else if (this.tableMembers[key_id] != null) {
                        //死亡和被动战斗
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
                            if (!this.mobBattle(v, key_id)) {
                                this.delMember(key_id);
                            }
                            else {
                                this.willDelMobs[key_id] = true;
                            }
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED) {
                            this.mobBattle(v, key_id);
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
                            this.tableMembers[key_id].dealSceneNotice(v);
                        }
                    }
                    else if (this.cacheMembers[key_id] != null) {
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            this.delMember(key_id);
                        }
                    }
                }
                else {
                    if (v.roleBase.id == zj.Game.PlayerInfoSystem.RoleID) {
                        if (v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            if (this.playerLeader != null) {
                                this.playerLeader.dealSceneNotice(v);
                            }
                        }
                    }
                    else {
                        var key_id = v.roleBase.id;
                        if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this.tableMembers[key_id] = this.cacheMembers[key_id];
                            delete this.cacheMembers[key_id];
                            this.tableMembers[key_id].joinView();
                            this.tableMembers[key_id].dealSceneNotice(v);
                        }
                        else if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE
                                || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this.addMember(v, null, null);
                        }
                        else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null)
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
                            this.delMember(key_id);
                        }
                        else if (this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
                            this.tableMembers[key_id].leaveView();
                            this.cacheMembers[key_id] = this.tableMembers[key_id];
                            delete this.tableMembers[key_id];
                        }
                        else if (this.tableMembers[key_id] != null) {
                            this.tableMembers[key_id].dealSceneNotice(v);
                            if (this.tableMembers[key_id].bVisible == true && this.tableMembers[key_id].otherState == zj.TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0) {
                                this.memberNoticeResult(key_id, v.otherBase[0].id);
                            }
                        }
                    }
                }
                // }
            }
        };
        StageSceneMainCity.prototype.SceneItemPosNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.updateSimplePos(zj.Game.PlayerWonderLandSystem.noticePosInfo);
            zj.Game.PlayerWonderLandSystem.noticePosInfo = {};
        };
        StageSceneMainCity.prototype.SceneItemPosInfoNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            if (zj.Helper.getObjLen(zj.Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
                this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
                zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            }
            // Game.PlayerWonderLandSystem.timePosInfo
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.timePosInfo);
            zj.Game.PlayerWonderLandSystem.timePosInfo = {};
        };
        StageSceneMainCity.prototype.LeagueWarBattleResultNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.beAtkNoticeResult();
        };
        StageSceneMainCity.prototype.updateSimplePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (this.tableMembers[k] != null) {
                    this.tableMembers[k].dealSimpleMoveNotice(v);
                }
            }
        };
        StageSceneMainCity.prototype.updateMember = function (tick) {
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v.bCanRemove) {
                    zj.CC_SAFE_DELETE(v);
                    delete this.tableMembers[k];
                    delete this.cacheMembers[k];
                    v = null;
                    continue;
                }
                v.Update(tick);
                // this.flashMemberColor(v);
            }
            for (var k in this.tableMemberPets) {
                var v = this.tableMemberPets[k];
                if (v.master.bCanRemove == true) {
                    zj.CC_SAFE_DELETE(v);
                    delete this.tableMemberPets[k];
                    v = null;
                    continue;
                }
                v.Update(tick);
            }
        };
        StageSceneMainCity.prototype.Update = function (tick) {
            if (!this.isIntoMapComp) {
                return;
            }
            this.updateMember(tick);
            if (!this.ownerScene.visible) {
                return;
            }
            if (this.playerLeader != null) {
                this.playerLeader.Update(tick);
            }
            if (this.playerLeaderPet != null) {
                this.playerLeaderPet.Update(tick);
            }
            _super.prototype.Update.call(this, tick);
            if (this.aniManager) {
                this.aniManager.Update(tick);
            }
            if (this.banner) {
                this.banner.Update(tick);
            }
            // this.updateBuilds(tick);
            // this.updateTrees(tick);
            this.updateNpcs(tick);
            // this.updateTreeTrans(null);
            // this.flashTree();
            //教学
            // Teach.checkTeachId();
            // Teach.proOperateTeach();
            this.updateTeachBuild(tick);
            this.updateMapFollow(tick);
            // 用方向键控制角色移动
            this.updatePlayerWalk(tick);
            this.checkGoToAdventurn();
        };
        StageSceneMainCity.prototype.updateTeachBuild = function (tick) {
            if (this.isTeachBuild) {
                if (this.teachBuildX == 0) {
                    this.onTeachBuildFinish();
                }
                else {
                    var off = tick * 1000;
                    var dis = Math.abs(this.teachBuildX);
                    off = off > dis ? dis : off;
                    if (this.teachBuildX < 0) {
                        off = -off;
                    }
                    this.teachBuildX -= off;
                    this.onMoveMap(off);
                }
            }
        };
        StageSceneMainCity.prototype.playerMoveToPos = function (player, tox, toy) {
            var arc = 180 - zj.Util.angleTo360(player.moveDistance, player.verDistance, tox, toy);
            var disp = zj.Util.pDisPoint(player.moveDistance, player.verDistance, tox, toy);
            var moveDisp = player.moveMapWalk(arc);
            if (moveDisp >= disp) {
                return true;
            }
            return false;
        };
        /**
         * 检测是否进入右侧门
         */
        StageSceneMainCity.prototype.checkGoToAdventurn = function () {
            var player = this.getPlayerLeader();
            if (this.isLeaveDoor) {
                if (this.playerMoveToPos(player, this.doorX, this.doorY)) {
                    player.onWalkEnd();
                    this.isInDoor = false;
                    this.isGoToDoor = false;
                    this.isLeaveDoor = false;
                }
            }
            else if (this.isGoToDoor) {
                if (!this.isInDoor) {
                    if (this.playerMoveToPos(player, this.doorX, this.doorY)) {
                        if (this.doorType == 0) {
                            this.isInDoor = true;
                            player.changeState(zj.TableEnum.TableEnumBaseState.State_None);
                            this.startDoorAni();
                        }
                        else {
                            if (zj.SceneManager.instance.EnterSceneZorkBoss()) {
                                player.changeState(zj.TableEnum.TableEnumBaseState.State_None);
                                this.isInDoor = true;
                            }
                            else {
                                this.doorX = StageSceneMainCity.checkDoorPosLeft + zj.Util.randomValue(20, 100);
                                this.doorY = zj.Util.randomValue(420, 550);
                                this.isLeaveDoor = true;
                            }
                        }
                    }
                }
            }
            else if (player.moveDistance >= StageSceneMainCity.checkDoorPos) {
                // if ((this.mainMenu as MainCitySceneNew).isTouchWalk()) {
                this.onWalkEnd();
                // }
                this.doorX = StageSceneMainCity.advDoorX + zj.Util.randomValue(-30, 30);
                this.doorY = StageSceneMainCity.advDoorY + zj.Util.randomValue(-10, 10);
                player.changeState(zj.TableEnum.TableEnumBaseState.State_Walk);
                this.doorType = 0;
                this.isLeaveDoor = false;
                this.isGoToDoor = true;
            }
            else if (player.moveDistance <= StageSceneMainCity.checkDoorPosLeft) {
                // if ((this.mainMenu as MainCitySceneNew).isTouchWalk()) {
                this.onWalkEnd();
                // }
                this.doorX = StageSceneMainCity.leftDoorX + zj.Util.randomValue(-30, 30);
                this.doorY = StageSceneMainCity.leftDoorY + zj.Util.randomValue(-10, 10);
                player.changeState(zj.TableEnum.TableEnumBaseState.State_Walk);
                this.doorType = 1;
                this.currGroupType = this.touchGroupType = -1;
                this.isLeaveDoor = false;
                this.isGoToDoor = true;
            }
        };
        StageSceneMainCity.prototype.updatePlayerWalk = function (tick) {
            if (!this.isGoToDoor && !this.isMapAniMove && this.mainMenu.isTouchWalk()) {
                if (this.mapOffX != 0) {
                    this.mapMovePos.setTo(-1, -1);
                    this.isMapAniMove = true;
                }
                else {
                    var arc = this.mainMenu.getWalkArc();
                    this.playerLeader.moveMapWalk(arc);
                }
            }
        };
        StageSceneMainCity.prototype.onWalkStart = function () {
            this.currGroupType = -1;
            this.playerLeader.onWalkStart();
        };
        StageSceneMainCity.prototype.onWalkEnd = function () {
            this.playerLeader.onWalkEnd();
        };
        StageSceneMainCity.prototype.updateMapFollow = function (tick) {
            if (this.isMapAniMove) {
                if (this.mapOffX == 0) {
                    this.isMapAniMove = false;
                    this.setMove(this.mapMovePos.x, this.mapMovePos.y);
                }
                else {
                    var offx = tick * 2400;
                    if (this.mapOffX > 0) {
                        offx = offx > this.mapOffX ? this.mapOffX : offx;
                    }
                    else {
                        offx = -offx;
                        offx = offx < this.mapOffX ? this.mapOffX : offx;
                    }
                    // this.map.x -= offx;
                    this.getPlayerLeader().setOffX(-offx);
                    _super.prototype.UpdateMap.call(this, offx, 0);
                    this.mapMovePos.x -= offx;
                    this.mapOffX -= offx;
                }
            }
            else {
                if (this.currGroupType >= 0 && this.playerLeader.state == zj.TableEnum.TableEnumBaseState.State_None) {
                    var type = this.currGroupType;
                    this.currGroupType = -1;
                    this.touchGroupType = -1;
                    this.mainMenu.toJump(type);
                }
            }
        };
        //安全区操作检测
        StageSceneMainCity.prototype.delSafeAreaCheck = function (touch_type, id) {
            return true;
        };
        StageSceneMainCity.prototype.dealTriggerAreaThings = function (x, y, trigger_Tbl) {
            return [];
        };
        StageSceneMainCity.prototype.reqLeaderPos = function (x, y, successCB) {
            // if (!Game.PlayerInfoSystem.IsAgreeEnter) {
            // 	if (successCB) {
            // 		successCB();
            // 	}
            // 	if (this.playerLeader) {
            // 		this.playerLeader.resetMoveNet();
            // 	}
            // 	return;
            // }
            if (x <= 0) {
                x = 1;
            }
            if (Math.abs(x - this.sendX) < 6 && Math.abs(y - this.sendY) < 6) {
                return;
            }
            // 移动数据同步
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    zj.SceneManager.instance.ReEnterMainCityNew();
                    return;
                }
                if (successCB != null) {
                    successCB();
                }
                if (this.playerLeader) {
                    this.playerLeader.resetMoveNet();
                }
                if (response.body.roleInfo.length != 0) {
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo[0];
                    this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
                    if (this.playerLeader.sceneHpPercent == 0) {
                        this.playerLeader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                    }
                }
            };
            this.sendX = x;
            this.sendY = y;
            var req = new message.WonderlandMoveRequest();
            req.body.scene_x = x;
            y = zj.PlayerWonderLandSystem.MapHeight - y;
            req.body.scene_y = y;
            zj.Game.Controller.send(req, visit_func, null, this, true);
        };
        StageSceneMainCity.prototype.getEventThings = function (x, y) {
            var t = [];
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                if (v.isCanBeAtk() == false) {
                    continue;
                }
                if (v.beInScope(x, y) == true) {
                    var info = {};
                    info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Building;
                    info["data"] = v;
                    t.push(info);
                }
            }
            for (var k in this.tableMapCells) {
                var v = this.tableMapCells[k];
                if (v.info.build_type != 5) {
                    continue;
                }
                if (v.isCanBeTouch() == false) {
                    continue;
                }
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                var _a = v.getEventPos(), tree_x = _a[0], tree_y = _a[1];
                if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
                    continue;
                }
                var info = {};
                info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Npc;
                info["data"] = v;
                t.push(info);
            }
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                var _b = v.getEventPos(), tree_x = _b[0], tree_y = _b[1];
                if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
                    continue;
                }
                var info = {};
                info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Grass;
                info["data"] = v;
                t.push(info);
            }
            var tbl_move = [];
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    continue;
                }
                if (v.otherState != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    var info = {};
                    info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Mob;
                    info["data"] = v;
                    t.push(info);
                    continue;
                }
                tbl_move.push(k);
            }
            var still_len = t.length;
            var move_len = tbl_move.length;
            var real_person = Math.min(move_len, zj.ConstantConfig_RoleBattle.OVERLAP_SELECT_MAX_NUM - still_len);
            var tbl_rand = [];
            while (true) {
                if (tbl_rand.length >= real_person) {
                    break;
                }
                var rand = zj.TsMtirand();
                var rand_value = rand % move_len + 1;
                var value = tbl_move[rand_value - 1];
                if (zj.Table.VIn(tbl_rand, value) == false) {
                    tbl_rand.push(value);
                    var info = {};
                    var bMember = zj.yuan3(this.tableMembers[value].getLegId() != 0 && this.tableMembers[value].getLegId() == this.playerLeader.getLegId(), true, false);
                    info["type"] = zj.Helper.getWonderlandPlayerType(this.playerLeader.getBattleMode(), bMember);
                    info["data"] = this.tableMembers[value];
                    t.push(info);
                }
            }
            t.sort(function (a, b) {
                return a.type - b.type;
            });
            return t;
        };
        StageSceneMainCity.prototype.checkEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            return zj.yuan3(t.length == 0, false, true);
        };
        StageSceneMainCity.prototype.dealEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            var doSomeThing = false;
            if (t.length > 1) {
                // loadUI(League_WarSelectThings).then((dialog: League_WarSelectThings) => {
                // 	dialog.SetInfo(t);
                // 	dialog.show();
                // 	doSomeThing = true;
                // });
            }
            else if (t.length == 1) {
                if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                    //碰撞人物
                    // this.collideObjectReq(t[0].data.playerInfo.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Mob) {
                    //碰撞怪物 
                    // this.collideObjectReq(t[0].data.playerInfo.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Building) {
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Grass) {
                    //采集
                    // this.wonderlandCollectionReq(t[0].data.scenePosInfo.roleBase.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                    // this.pushPersonInterface(t[0].data.playerInfo);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Npc) {
                    //采集
                    this.pushNpcUi(t[0].data.info);
                    doSomeThing = true;
                }
            }
            return doSomeThing;
        };
        StageSceneMainCity.prototype.pushNpcUi = function (info) {
            if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {
                if (zj.PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
                    zj.loadUI(zj.WorkSendMain).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        StageSceneMainCity.prototype.getScreenLeft = function () {
            if (this.playerLeader) {
                return this.playerLeader.moveDistance - this.playerLeader.x;
            }
            return 0;
        };
        StageSceneMainCity.prototype.getScreenRight = function () {
            return this.getScreenLeft() + zj.UIManager.StageWidth;
        };
        StageSceneMainCity.prototype.print = function () {
            // let type: message.FunctionOpen = message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3;
            // console.log("moveDistance: " + (this.playerLeader as StageSceneCityLeader).moveDistance);
            // this.setTeachBuild(type, null, null);
        };
        /**
         * 设置新手引导指定地图移动到某个建筑
         */
        StageSceneMainCity.prototype.setTeachBuild = function (type, callback, objThis) {
            this.teachBuildFun = callback;
            this.teachThisObj = objThis;
            var item = this.ownerScene.sceneUI.getTouchTitle(type);
            this.teachBuildX = -(zj.MainCityTouchTitle.movePosList[type][0] - Math.max(this.playerLeader.moveDistance, zj.UIManager.StageWidth / 2));
            this.ownerScene.sceneUI.clearActivity();
            this.isTeachBuild = true;
        };
        /**
         * 新手引导指定建筑移动完成
         */
        StageSceneMainCity.prototype.onTeachBuildFinish = function () {
            this.isTeachBuild = false;
            this.ownerScene.sceneUI.openActivity();
            if (this.teachBuildFun) {
                this.teachBuildFun.call(this.teachThisObj);
            }
        };
        StageSceneMainCity.prototype.isLockMap = function () {
            return this.mapLockTurn || this.isLeaveDoor || this.isGoToDoor || !this.isIntoMapComp || this.isMapAniMove || this.isGoToDoor || this.isTeachBuild;
        };
        StageSceneMainCity.prototype.isTouchUI = function () {
            if (this.banner && this.banner.isTouchDown) {
                return true;
            }
            return false;
        };
        StageSceneMainCity.prototype.checkMoveUI = function (touchs) {
            if (this.banner && this.banner.isTouchDown) {
                this.banner.OnTouchMoved(touchs);
                return true;
            }
            return false;
        };
        StageSceneMainCity.prototype.clearTouchUI = function (touchs) {
            if (this.banner) {
                this.banner.setTouchEnded(touchs);
            }
        };
        StageSceneMainCity.prototype.OnTouchDown = function (touchs) {
            if (this.isLockMap()) {
                return;
            }
            if (this.isTouchUI()) {
                return;
            }
            this.mapMoveType = 0;
            this.mapMovePos.setTo(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
            this.isCanMoveMap = true;
            if (this.currGroupType != -1) {
                this.touchGroupType = this.currGroupType = -1;
            }
        };
        StageSceneMainCity.prototype.OnTouchMove = function (touchs) {
            // if (this.playerLeader != null) {
            // 	this.playerLeader.OnTouchMove(touchs);
            // }
            if (this.checkMoveUI(touchs)) {
                return;
            }
            if (this.isLockMap()) {
                return;
            }
            if (!this.isCanMoveMap) {
                return;
            }
            var stageX = touchs.stageX - zj.Game.UIManager.x;
            switch (this.mapMoveType) {
                case 0:
                    if (Math.abs(stageX - this.mapMovePos.x) > 20) {
                        this.mapMoveType = 1;
                        this.touchGroupType = -1;
                    }
                    break;
                case 1:
                    if (!this.playerLeader.isStateWalk()) {
                        var offx = stageX - this.mapMovePos.x;
                        this.onMoveMap(offx);
                    }
                    this.mapMovePos.setTo(stageX, touchs.stageY - zj.Game.UIManager.y);
                    break;
            }
        };
        StageSceneMainCity.prototype.onMoveMap = function (offx) {
            var newBaseX = this.baseX - offx;
            if (newBaseX < 0) {
                offx = this.baseX;
            }
            else if (newBaseX > this.mapWidth - zj.UIManager.StageWidth) {
                offx = -((this.mapWidth - zj.UIManager.StageWidth) - this.baseX);
            }
            if (offx != 0) {
                this.mapOffX += offx;
                // this.map.x += offx;
                this.getPlayerLeader().setOffX(offx);
                _super.prototype.UpdateMap.call(this, -offx, 0);
            }
        };
        StageSceneMainCity.prototype.OnTouchUp = function (touchs) {
            this.clearTouchUI(touchs);
            if (this.isLockMap()) {
                return;
            }
            if (!this.isCanMoveMap) {
                return;
            }
            this.isCanMoveMap = false;
            if (this.playerLeader != null) {
                switch (this.mapMoveType) {
                    case 0:
                        this.mapMovePos.setTo(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
                        this.isMapAniMove = true;
                        break;
                    case 1:
                        break;
                }
            }
        };
        StageSceneMainCity.prototype.onTouchGroup = function (item, touchType) {
            if (this.isLeaveDoor || this.isGoToDoor) {
                return;
            }
            if (touchType == 0) {
                this.touchGroupType = item.type;
                this.currGroupType = -1;
            }
            else if (touchType == 1) {
                if (this.touchGroupType == item.type) {
                    this.currGroupType = this.touchGroupType;
                    var pos = zj.MainCityTouchTitle.movePosList[this.currGroupType];
                    if (pos) {
                        var random = item.getTouchRandom();
                        this.mapMovePos.setTo(pos[0] + zj.Util.randomValue(-random, random) - this.playerLeader.moveDistance + this.playerLeader.x, pos[1]);
                        this.isMapAniMove = true;
                    }
                    else {
                        egret.error("move pos is null: " + this.currGroupType);
                    }
                }
                else {
                    this.currGroupType = this.touchGroupType = -1;
                }
            }
        };
        StageSceneMainCity.prototype.setMove = function (x, y) {
            if (y > 0) {
                this.getPlayerLeader().OnTouchDownPos(x, y);
                this.getPlayerLeader().OnTouchUpPos(x, y);
            }
        };
        StageSceneMainCity.prototype.onReleaseAni = function () {
            if (this.aniList) {
                for (var i = 0; i < this.aniList.length; ++i) {
                    this.aniList[i].onRelease();
                    this.aniList[i] = null;
                }
                this.aniList = null;
            }
        };
        StageSceneMainCity.prototype.release = function () {
            _super.prototype.release.call(this);
            this.onReleaseAni();
            this.isSceneExit = true;
            this.playerLeaderPet = null;
            if (this.aniManager) {
                this.aniManager.onRelease();
                this.aniManager = null;
            }
            if (this.banner) {
                if (this.banner.parent) {
                    this.banner.parent.removeChild(this.banner);
                }
                this.banner = null;
            }
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.RESET_PLAYER_AVATA, this.resetPlayerAvata, this);
            zj.Game.EventManager.off(zj.GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
            // Game.EventManager.off(GameEvent.MAIN_CITY_MEMBER_LIST, this.reMapEnterReq, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_LICENCELEVEL_CHANGE, this.updateLicenceLevel, this);
            zj.Game.EventManager.off(zj.GameEvent.CLOSE_SCENE, this.closeScene, this);
        };
        StageSceneMainCity.prototype.close = function () { };
        StageSceneMainCity.prototype.OnExit = function () {
            if (this.ownerScene) {
                this.ownerScene.close();
                this.ownerScene = null;
            }
        };
        StageSceneMainCity.ani_names = [
            "main_ani_door",
            "main_ani_car",
            "main_ani_smoke1",
            "main_ani_smoke2",
            "main_ani_dove",
            "main_ani_wave",
            "main_ani_fountain",
            "main_ani_shop",
            "main_ani_screen_large",
            "main_ani_screen_lit_a",
            "main_ani_screen_lit_b",
            "main_ani_screen_lit_c",
            "main_ani_screen_lit_d",
            "main_ani_screen_lit_e",
            "main_ani_pub" //14酒馆
        ];
        StageSceneMainCity.checkDoorPos = 3040; // 副本大门检测线（X值）
        StageSceneMainCity.advDoorX = 3200; // 进入副本大门的固定坐标
        StageSceneMainCity.advDoorY = 500;
        StageSceneMainCity.checkDoorPosLeft = 448; // 贪婪之岛检测线
        StageSceneMainCity.leftDoorX = 258; // 进入贪婪之岛的固定坐标
        StageSceneMainCity.leftDoorY = 413;
        return StageSceneMainCity;
    }(zj.StageSceneRpg));
    zj.StageSceneMainCity = StageSceneMainCity;
    __reflect(StageSceneMainCity.prototype, "zj.StageSceneMainCity");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneMainCity.js.map