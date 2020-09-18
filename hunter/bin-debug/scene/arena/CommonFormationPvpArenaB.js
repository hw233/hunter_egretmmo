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
    /**
     * @author xing li wei
     *
     * @date 2019-3-8
     *
     * @class 跨服格斗场阵容
     */
    var CommonFormationPvpArenaB = (function (_super) {
        __extends(CommonFormationPvpArenaB, _super);
        function CommonFormationPvpArenaB() {
            var _this = _super.call(this) || this;
            // 底部数据data
            _this.listBottomData = new eui.ArrayCollection();
            // 上阵武将列表
            _this.generals = [];
            // 上阵所有武将列表
            _this.generalss = [];
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.moveGId = null;
            _this.moveIndex = 0;
            _this.groupPosRect = [];
            _this.formation = [];
            _this.idType = 0;
            _this.vis = true;
            _this.skinName = "resource/skins/arena/CommonFormationPvpArenaBSkin.exml";
            _this.scene = new zj.GoFightMap();
            _this.scene.LoadMap(17); //这里是不同功能的地图ID
            _this.addChildAt(_this.scene, 0);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                _this.scene.close();
            }, null);
            _this.init();
            return _this;
        }
        CommonFormationPvpArenaB.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnConfirimTean.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirimTean, this);
            this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.btnTeam1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam1, this);
            this.btnTeam2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam2, this);
            this.btnTeam3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTeam3, this);
            zj.Game.EventManager.on(zj.GameEvent.ON_MOVE, this.onMove, this);
            var _loop_1 = function (i) {
                this_1["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                }, this_1);
                //给上面group添加监听，当点击时将本group对应的ID信息置为0，然后重新刷新信息
                this_1["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST);
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
            zj.Game.EventManager.on(zj.GameEvent.MOUSE_BEGIN, function (e) {
                var objectData = e.data;
                _this.moveImg.width = 95;
                _this.moveImg.height = 93;
                _this.moveImg.visible = false;
                _this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                _this.moveImg.x = e.stageX - 95 / 2;
                _this.moveImg.y = e.stageY - 93 / 2;
                _this.moveGId = objectData.generalId;
                _this.moveIndex = objectData.index;
            }, this);
            this.addChild(this.moveImg);
            this.loadDownListInfo();
            for (var i = 0; i < 24; i++) {
                var posState = new zj.PosState();
                this.generalss.push(posState);
            }
            // 1-4号位置文字图片
            for (var i = 1; i <= 4; i++) {
                this["imgPos" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.formationPosWord[i - 1], this);
            }
        };
        CommonFormationPvpArenaB.prototype.isFullScreen = function () {
            return true;
        };
        CommonFormationPvpArenaB.prototype.up = function () {
            this.vis = true;
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            this.moveImg.visible = false;
            this.moveImg.source = "";
        };
        CommonFormationPvpArenaB.prototype.setInfo = function (father, cb) {
            this.callback = cb;
            this.father = father;
            this.formation = zj.Table.DeepCopy(this.father.formats);
            for (var i = 0; i < this.formation.length; i++) {
                for (var j = 0; j < 8; j++) {
                    if (j < 4) {
                        this.generalss[i * 8 + j].generalId = this.formation[i].generals[j];
                    }
                    else {
                        this.generalss[i * 8 + j].generalId = this.formation[i].supports[j - 4];
                    }
                }
            }
            this.refreshInfo(0);
        };
        CommonFormationPvpArenaB.prototype.refreshInfo = function (id) {
            this.generals = [];
            for (var i = 0; i < 8; i++) {
                var posState = new zj.PosState();
                if (i < 4) {
                    if (this.formation[id].generals[i] != null && this.formation[id].generals[i] != 0) {
                        posState.generalId = this.formation[id].generals[i];
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                }
                else {
                    if (this.formation[id].supports[i - 4] != null && this.formation[id].generals[i - 4] != 0) {
                        posState.generalId = this.formation[id].supports[i - 4];
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                }
            }
            this.cartoon();
            this.refreshOverallInfo();
        };
        CommonFormationPvpArenaB.prototype.hunterInfo = function (id) {
            if (id == 0) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (id == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (id == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            for (var i = 0; i < this.generals.length; i++) {
                if (i < 4) {
                    this.formation[id].generals[i] = this.generals[i].generalId;
                }
                else {
                    this.formation[id].supports[i - 4] = this.generals[i].generalId;
                }
            }
        };
        CommonFormationPvpArenaB.prototype.onBtnTeam1 = function () {
            this.hunterInfo(this.idType);
            this.idType = 0;
            this.refreshInfo(0);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnTeam1, "ui_arena_ButtonNumTeamBigSel_png");
        };
        CommonFormationPvpArenaB.prototype.onBtnTeam2 = function () {
            this.hunterInfo(this.idType);
            this.idType = 1;
            this.refreshInfo(1);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnTeam2, "ui_arena_ButtonNumTeamBigSel_png");
        };
        CommonFormationPvpArenaB.prototype.onBtnTeam3 = function () {
            this.hunterInfo(this.idType);
            this.idType = 2;
            this.refreshInfo(2);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnTeam3, "ui_arena_ButtonNumTeamBigSel_png");
        };
        /**将所有按钮颜色变暗 */
        CommonFormationPvpArenaB.prototype.btnColour = function () {
            zj.Set.ButtonBackgroud(this.btnTeam1, "ui_arena_ButtonNumTeamBigNor_png");
            zj.Set.ButtonBackgroud(this.btnTeam2, "ui_arena_ButtonNumTeamBigNor_png");
            zj.Set.ButtonBackgroud(this.btnTeam3, "ui_arena_ButtonNumTeamBigNor_png");
        };
        CommonFormationPvpArenaB.prototype.getSelectGenIds = function () {
            if (this.idType == 0) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (this.idType == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (this.idType == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            return this.generalss;
        };
        CommonFormationPvpArenaB.prototype.mouseUp = function (e) {
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            zj.Game.EventManager.event(zj.GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
            this.moveImg.visible = false;
            this.moveImg.source = "";
            this.init();
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE);
        };
        /**刷新全局信息 */
        CommonFormationPvpArenaB.prototype.refreshOverallInfo = function () {
            this.drawUI();
            this.hunterInfo(this.idType);
            // this.loadDownListInfo();
            this.loadlistInfo();
        };
        /**装备猎人项刷新动画 */
        CommonFormationPvpArenaB.prototype.cartoon = function () {
            var a = 400;
            for (var i = 1; i < 5; i++) {
                a -= 100;
                this["group" + i].alpha = 0;
                this["group" + i].scaleY = 1.1;
                this["group" + i].scaleX = 1.1;
                egret.Tween.get(this["group" + i]).wait(a).to({ alpha: 1 }, 10).to({ scaleX: 1, scaleY: 1 }, 200);
            }
        };
        CommonFormationPvpArenaB.prototype.loadlistInfo = function () {
            for (var i = 0; i < 3; i++) {
                this.loadList(i + 1);
                var curNumR = 0;
                var maxNumR = 0;
                for (var j = 0; j < 4; j++) {
                    if (this.generalss[i * 8 + j] != null && this.generalss[i * 8 + j].generalId != 0) {
                        curNumR += 1;
                    }
                    maxNumR += 1;
                }
                this["lbHunterNum" + (i + 1)].text = curNumR + "/" + maxNumR;
            }
        };
        CommonFormationPvpArenaB.prototype.loadList = function (index) {
            if (!this["lstTeam" + index])
                return;
            var a;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < 4; i++) {
                a = this.generalss[(index - 1) * 8 + i] != null ? this.generalss[(index - 1) * 8 + i].generalId : this.formation[index - 1].generals[i];
                arrCollection.addItem({
                    generalId: a
                });
            }
            this["lstTeam" + index].itemRenderer = zj.CommonTeamAddHunterItem;
            this["lstTeam" + index].dataProvider = arrCollection;
        };
        /**刷新底部list信息 */
        CommonFormationPvpArenaB.prototype.loadDownListInfo = function () {
            var hunterList = zj.PlayerHunterSystem.GetHunterList();
            this.listBottomData.removeAll();
            for (var i = 0; i < hunterList.length; i++) {
                var v = hunterList[i];
                var data = new zj.FormatChooseHeroData();
                data.father = this;
                data.generalId = v;
                data.isCanTouch = true;
                this.listBottomData.addItem(data);
            }
            this.listTableViewMine.dataProvider = this.listBottomData;
            this.listTableViewMine.itemRenderer = zj.FormatChooseHeroItem;
            this.listTableViewMine.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            this.listTableViewMine.allowMultipleSelection = true;
        };
        CommonFormationPvpArenaB.prototype.onListHerosTap = function (e) {
            var _this = this;
            var index = e.itemIndex;
            if (this.general(e.item)) {
                return;
            }
            var point = this.listTableViewMine.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= zj.Game.UIManager.x;
            this.moveImg.x = point.x;
            this.moveImg.y = point.y;
            if (!e.item.isCanTouch) {
                return;
            }
            this.addGeneral(e.item.generalId);
            zj.Game.EventManager.on(zj.GameEvent.FORMATE_REFRESH_LIST, function (e) {
                _this.refreshOverallInfo();
                if (e.data != null && e.data != undefined) {
                    _this.moveImg.visible = true;
                    _this.moveImg.source = zj.cachekey(e.data.id, _this);
                    var objectData = e.data;
                    egret.Tween.get(_this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300)
                        .call(function () {
                        _this.moveImg.visible = false;
                    });
                }
                else {
                    _this.moveImg.visible = false;
                    _this.moveImg.source = "";
                }
            }, this);
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
        };
        CommonFormationPvpArenaB.prototype.mouseMove = function (e) {
            this.moveImg.x = e.stageX - 95 / 2;
            this.moveImg.y = e.stageY - 93 / 2;
            if (this.moveImg.x > this.groupDown.x && this.moveImg.x < this.groupDown.x + this.groupDown.width && this.moveImg.y > this.groupDown.y && this.moveImg.y < this.groupDown.y + this.groupDown.height) {
                this.moveImg.visible = false;
                if (this.vis == true) {
                    this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                }
            }
            else {
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                this.moveImg.visible = true;
                this.vis = false;
            }
        };
        CommonFormationPvpArenaB.prototype.addGeneral = function (generalId) {
            for (var i = 0; i < 8; i++) {
                if (this.generals[i].generalId == 0) {
                    this.generals[i].generalId = generalId;
                    if (i < 4) {
                        if (this.generals[i + 4].state == 0) {
                            this.generals[i + 4].state = 1;
                        }
                    }
                    var j = i + 1;
                    if (i + 1 > 4) {
                        j = i + 1 - 4;
                    }
                    var worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
                    worldPointUp.x -= zj.Game.UIManager.x;
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST, { x: worldPointUp.x, y: worldPointUp.y, id: zj.PlayerHunterSystem.Head(generalId) });
                    this.refreshOverallInfo();
                    break;
                }
            }
        };
        CommonFormationPvpArenaB.prototype.drawUI = function () {
            for (var i = 0; i < 8; i++) {
                var pS = this.generals[i];
                var framePath = null;
                var iconPath = null;
                var hunterInfo = null;
                var baseGeneralInfo = null;
                if (pS.generalId != 0) {
                    framePath = zj.PlayerHunterSystem.Frame(pS.generalId);
                    iconPath = zj.PlayerHunterSystem.Head(pS.generalId);
                    hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId);
                    baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                }
                if (i < 4) {
                    if (pS.generalId) {
                        // this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
                        // this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
                        // this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
                        // Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);
                        this["clearanceLock" + (i + 1)].visible = false;
                        this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
                        this["groupPos" + (i + 1)].visible = true;
                        // this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
                    }
                    else {
                        this["clearanceLock" + (i + 1)].visible = true;
                        this["groupPos" + (i + 1)].visible = false;
                        // this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                    }
                }
                else {
                    if (pS.generalId) {
                        this["imgUpIcon" + ((i + 1) - 4)].source = zj.cachekey(iconPath, this);
                        this["imgUpNum" + ((i + 1) - 4)].text = hunterInfo.level.toString();
                        this["groupPos" + (i + 1)].visible = true;
                    }
                    else {
                        this["groupPos" + (i + 1)].visible = false;
                        if (pS.state == 0) {
                            this["imgUpLock" + ((i + 1) - 4)].visible = true;
                            this["imgUpYuan" + ((i + 1) - 4)].visible = false;
                        }
                        else {
                            this["imgUpLock" + ((i + 1) - 4)].visible = false;
                            this["imgUpYuan" + ((i + 1) - 4)].visible = true;
                        }
                    }
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE);
        };
        /**获取放人物位置的相对位置 */
        CommonFormationPvpArenaB.prototype.onAddToStage = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.addChild(this.moveImg);
            for (var i = 0; i < 8; i++) {
                var j = i + 1;
                if (i + 1 > 4) {
                    j = i + 1 - 4;
                }
                var worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
                worldPointUp.x -= zj.Game.UIManager.x;
                this.groupPosRect[i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this["groupPos" + j].width, this["groupPos" + j].height);
            }
        };
        /**拖动图片松开时 */
        CommonFormationPvpArenaB.prototype.onMove = function (e) {
            var objectData = e.data;
            // if (this.general(objectData)) {
            // 	return;
            // }
            for (var i = 0; i < 8; i++) {
                //组在面板上的位置x              //组在面板上的位置y
                if (this.groupPosRect[i].contains(objectData.x, objectData.y)) {
                    var pTarget = this.generals[i];
                    if (i < 4) {
                        if (objectData.index == -1) {
                            pTarget.generalId = objectData.generalId;
                        }
                        else {
                            if (objectData.index < 4) {
                                _a = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _a[0], this.generals[objectData.index].generalId = _a[1];
                                _b = [this.generals[objectData.index + 4].generalId, this.generals[i + 4].generalId], this.generals[i + 4].generalId = _b[0], this.generals[objectData.index + 4].generalId = _b[1];
                                _c = [this.generals[objectData.index + 4].state, this.generals[i + 4].state], this.generals[i + 4].state = _c[0], this.generals[objectData.index + 4].state = _c[1];
                            }
                            else {
                                _d = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _d[0], this.generals[objectData.index].generalId = _d[1];
                            }
                        }
                        if (this.generals[i + 4].state == 0) {
                            this.generals[i + 4].state = 1;
                        }
                    }
                    else {
                        if (pTarget.state != 0 && !(i == objectData.index + 4 && pTarget.state == 1 && pTarget.generalId == 0)) {
                            if (objectData.index == -1) {
                                pTarget.generalId = objectData.generalId;
                            }
                            else {
                                _e = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _e[0], this.generals[objectData.index].generalId = _e[1];
                                if (objectData.index < 4) {
                                    if (this.generals[objectData.index].generalId == 0) {
                                        this.generals[objectData.index + 4].generalId = 0;
                                        this.generals[objectData.index + 4].state = 0;
                                    }
                                }
                                else {
                                    _f = [this.generals[objectData.index].state, pTarget.state], pTarget.state = _f[0], this.generals[objectData.index].state = _f[1];
                                }
                            }
                        }
                    }
                    // this.drawUI();
                    // this.hunterInfo(this.idType);
                    this.refreshOverallInfo();
                    break;
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
            var _a, _b, _c, _d, _e, _f;
        };
        CommonFormationPvpArenaB.prototype.onBtnConfirimTean = function () {
            var _this = this;
            var info = zj.Table.DeepCopy(this.formation);
            zj.Game.PlayerLeagueSystem.setFormation(this.formation)
                .then(function () {
                zj.toast_success(zj.TextsConfig.TextsConfig_Arena.formationSuc);
                //如果协议成功，将本地数据改变
                zj.Game.PlayerFormationSystem.formatsSingleDefine = info;
                _this.callback();
                _this.close(zj.UI.HIDE_TO_TOP);
            })
                .then(function () {
            });
        };
        CommonFormationPvpArenaB.prototype.onBtnClose = function () {
            var _this = this;
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Pk.DoYouGoOut, function () {
                egret.Tween.get(_this).wait(300).call(function () {
                    _this.close(zj.UI.HIDE_TO_TOP);
                });
            });
        };
        CommonFormationPvpArenaB.prototype.general = function (objectData) {
            for (var i = 0; i < this.generalss.length; i++) {
                if (objectData.generalId == this.generalss[i].generalId) {
                    return true;
                }
            }
        };
        CommonFormationPvpArenaB.prototype.hunterFashionableDress = function (generalId, group) {
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var mapRoleId = null;
            if (generalInfo.fashionId != 0) {
                mapRoleId = zj.PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId).fashion_roleId;
            }
            else {
                mapRoleId = zj.PlayerHunterSystem.Table(zj.PlayerHunterSystem.GetGeneralId(generalId)).general_roleId;
            }
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var scale = zj.TableMapRole.Item(mapRoleId).spine_scale;
            var body = zj.TableClientFightAniSpineSource.Item(bodySpxId).json;
            zj.Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                .then(function (display) {
                group.removeChildren();
                display.scaleX = scale * 0.9;
                display.scaleY = scale * 0.9;
                display.name = "fashion";
                group.addChild(display);
            });
        };
        return CommonFormationPvpArenaB;
    }(zj.Dialog));
    zj.CommonFormationPvpArenaB = CommonFormationPvpArenaB;
    __reflect(CommonFormationPvpArenaB.prototype, "zj.CommonFormationPvpArenaB");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormationPvpArenaB.js.map