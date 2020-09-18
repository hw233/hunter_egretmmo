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
     * @date 2019-3-5
     *
     * @class 本服格斗场调整阵容
     */
    var CommonFormationPvpArena = (function (_super) {
        __extends(CommonFormationPvpArena, _super);
        function CommonFormationPvpArena() {
            var _this = _super.call(this) || this;
            // 底部数据data
            _this.listBottomData = new eui.ArrayCollection();
            // 上阵武将列表
            _this.generals = [];
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.moveGId = null;
            _this.moveIndex = 0;
            _this.groupPosRect = [];
            // 等级限制开启
            _this.Level = zj.Game.PlayerInfoSystem.Level;
            /**列表滑出去之后再回去不能滑动 */
            _this.vis = true;
            _this.skinName = "resource/skins/arena/CommonFormationPvpArenaSkin.exml";
            // this.groupUp.cacheAsBitmap = true;
            _this.scene = new zj.GoFightMap();
            _this.scene.LoadMap(17); //这里是不同功能的地图ID
            _this.addChildAt(_this.scene, 1);
            zj.Game.EventManager.on(zj.GameEvent.DELAY_EXECUTE, _this.ontouchBeginTime, _this);
            _this.init();
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnConfirimTean.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirimTean, _this);
            _this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
                _this.removeEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
                _this.close();
                _this.scene.close();
            }, _this);
            var a = zj.Game.PlayerFormationSystem.curFormations;
            var formation = new message.FormationInfo();
            for (var i = 0; i < a.length; i++) {
                if (a[i] != null) {
                    if (a[i].formationType == zj.Game.PlayerInstanceSystem.curInstanceType) {
                        formation = a[i];
                    }
                }
            }
            if (formation.generals.length == 0 || formation.generals == null) {
                for (var i = 0; i < 4; i++) {
                    formation.generals[i] = 0;
                    formation.supports[i] = 0;
                    formation.reserves[i] = 0;
                }
            }
            for (var i = 1; i <= 4; i++) {
                _this["imgUpLock" + i].source = zj.cachekey("ui_currencyicon_IconLock_png", _this);
            }
            for (var i = 0; i < 8; i++) {
                var posState = new zj.PosState();
                if (i < 4) {
                    if (formation.generals[i] != null && formation.generals[i] != 0) {
                        posState.generalId = formation.generals[i];
                        posState.state = 1;
                    }
                    _this.generals.push(posState);
                }
                else {
                    if (formation.supports[i - 4] != null && formation.generals[i - 4] != 0) {
                        posState.generalId = formation.supports[i - 4];
                        posState.state = 1;
                    }
                    _this.generals.push(posState);
                }
            }
            _this.drawUI();
            zj.Game.EventManager.on(zj.GameEvent.ON_MOVE, _this.onMove, _this);
            var _loop_1 = function (i) {
                this_1["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                }, this_1);
                //给上面group添加监听，当点击时将本group对应的ID信息置为0，然后重新刷新信息
                this_1["groupPos" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST, { id: zj.PlayerHunterSystem.Head(_this.generals[i].generalId) });
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.drawUI();
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
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                    _this.moveImg.source = zj.cachekey("wx_" + zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                }
                else {
                    _this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                }
                _this.moveImg.x = e.stageX - 95 / 2;
                _this.moveImg.y = e.stageY - 93 / 2;
                _this.moveGId = objectData.generalId;
                _this.moveIndex = objectData.index;
            }, _this);
            _this.addChild(_this.moveImg);
            return _this;
        }
        CommonFormationPvpArena.prototype.up = function () {
            this.vis = true;
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            this.moveImg.visible = false;
            this.moveImg.source = "";
        };
        CommonFormationPvpArena.prototype.isFullScreen = function () {
            return true;
        };
        /**
         * 关闭滑动bug
         */
        CommonFormationPvpArena.prototype.ontouchBeginTime = function (e) {
            if (e.data.isInLongPress == true) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            else {
                // this.onAddToStage();
            }
        };
        CommonFormationPvpArena.prototype.mouseMove = function (e) {
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
        CommonFormationPvpArena.prototype.mouseUp = function (e) {
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            zj.Game.EventManager.event(zj.GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
            this.moveImg.visible = false;
            this.moveImg.source = "";
            this.init();
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE);
        };
        /**刷新底部list信息 */
        CommonFormationPvpArena.prototype.init = function () {
            // 1-4号位置文字图片
            for (var i = 1; i <= 4; i++) {
                this["imgPos" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.formationPosWord[i - 1], this);
            }
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
        CommonFormationPvpArena.prototype.getSelectGenIds = function () {
            return this.generals;
        };
        CommonFormationPvpArena.prototype.onListHerosTap = function (e) {
            var _this = this;
            var index = e.itemIndex;
            if (this.general(e.item)) {
                return;
            }
            var point = this.listTableViewMine.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= zj.Game.UIManager.x;
            this.moveImg.x = point.x;
            this.moveImg.y = point.y;
            // this.imgpath = PlayerHunterSystem.Head(this.listBottomData[index].generalId);
            if (!e.item.isCanTouch) {
                return;
            }
            this.addGeneral(e.item.generalId);
            zj.Game.EventManager.on(zj.GameEvent.FORMATE_REFRESH_LIST, function (e) {
                _this.init();
                _this.moveImg.source = zj.cachekey(e.data.id, _this);
                if (e.data != null && e.data != undefined) {
                    _this.moveImg.visible = true;
                    var objectData = e.data;
                    egret.Tween.get(_this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300)
                        .call(function () {
                        _this.moveImg.visible = false;
                    });
                }
            }, this);
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
        };
        CommonFormationPvpArena.prototype.setInfo = function (cb) {
            this.callback = cb;
        };
        CommonFormationPvpArena.prototype.addGeneral = function (generalId) {
            for (var i = 0; i < 8; i++) {
                if (this.generals[i].grade == 1) {
                    if (i < 4) {
                        this["groupPos" + (i + 1)].visible = false;
                        this["imgUpLock" + (i + 1)].visible = true; // 锁头
                        this["imgUpYuan" + (i + 1)].visible = false; // 援助 
                    }
                    else {
                        this["groupPos" + (i + 1)].visible = false;
                        this["imgUpLock" + (i - 3)].visible = true; // 锁头
                        this["imgUpYuan" + (i - 3)].visible = false; // 援助 
                    }
                    this.generals[i].generalId == 0;
                }
                else if (this.generals[i].generalId == 0) {
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
                    this.drawUI();
                    var worldPointUp = this["group" + j].localToGlobal(this["groupPos" + (i + 1)].x, this["groupPos" + (i + 1)].y);
                    worldPointUp.x -= zj.Game.UIManager.x;
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST, { x: worldPointUp.x, y: worldPointUp.y, id: zj.PlayerHunterSystem.Head(generalId) });
                    this.init();
                    break;
                }
            }
        };
        CommonFormationPvpArena.prototype.drawUI = function () {
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
                this.guidance();
                if (i < 4) {
                    if (this.generals[i].grade == 1) {
                        this["groupPos" + (i + 1)].visible = false;
                        // this[`imgUpLock${i + 1}`].visible = true;// 锁头
                        // this[`imgUpYuan${i + 1}`].visible = false;// 援助
                        // this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                    }
                    else if (pS.generalId && pS.grade == 0) {
                        // this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
                        if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                            // this["imgDownIcon" + (i + 1)].source = cachekey("wx_" + iconPath, this);
                        }
                        else {
                            // this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
                            this["clearanceLock" + (i + 1)].visible = false;
                            this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
                        }
                        // this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
                        zj.Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);
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
                    if (this.generals[i].grade == 1) {
                        this["groupPos" + (i + 1)].visible = false;
                        this["imgUpLock" + (i - 3)].visible = true; // 锁头
                        this["imgUpYuan" + (i - 3)].visible = false; // 援助
                        // this["imgArrow" + (i - 3)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                    }
                    else if (pS.generalId && pS.grade == 0) {
                        this["imgDownFrame" + (i + 1)].source = zj.cachekey(framePath, this);
                        if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                            this["imgUpIcon" + ((i + 1) - 4)].source = zj.cachekey("wx_" + iconPath, this);
                        }
                        else {
                            this["imgUpIcon" + ((i + 1) - 4)].source = zj.cachekey(iconPath, this);
                        }
                        this["imgUpNum" + ((i + 1) - 4)].text = hunterInfo.level.toString();
                        this["groupPos" + (i + 1)].visible = true;
                    }
                    else {
                        this["imgDownFrame" + (i + 1)].source = zj.cachekey("ui_frame_FrameHunterAsh_png", this);
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
        CommonFormationPvpArena.prototype.onAddToStage = function () {
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
        CommonFormationPvpArena.prototype.onMove = function (e) {
            var objectData = e.data;
            // if (this.general(objectData)) {
            // 	return;
            // }
            for (var i = 0; i < 8; i++) {
                //组在面板上的位置x              //组在面板上的位置y
                if (this.groupPosRect[i].contains(objectData.x, objectData.y)) {
                    var pTarget = this.generals[i];
                    if (i < 4) {
                        if (this.generals[i].grade == 1) {
                            return;
                        }
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
                        if (this.generals[i].grade == 1) {
                            return;
                        }
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
                    this.drawUI();
                    this.guidance();
                    break;
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
            var _a, _b, _c, _d, _e, _f;
        };
        CommonFormationPvpArena.prototype.onBtnConfirimTean = function () {
            var _this = this;
            //深拷贝获取阵容信息
            var a = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.curFormations);
            var formation = new message.FormationInfo();
            for (var i = 0; i < a.length; i++) {
                if (a[i] != null) {
                    if (a[i].formationType == zj.Game.PlayerInstanceSystem.curInstanceType) {
                        if (a[i] instanceof message.FormationInfo) {
                            formation = a[i];
                        }
                    }
                }
            }
            if (formation.generals.length == 0) {
                formation.formationType = zj.Game.PlayerInstanceSystem.curInstanceType;
                zj.Game.PlayerFormationSystem.curFormations.push(formation);
            }
            //将获取的阵容信息重新赋值并发送协议
            formation.generals = [];
            formation.supports = [];
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    formation.generals[i] = this.generals[i].generalId;
                    // formation.formationIndex = this.generals[i].
                }
                else {
                    formation.supports[i - 4] = this.generals[i].generalId;
                }
            }
            zj.Game.PlayerArenaSystem.setFormation(formation)
                .then(function () {
                zj.toast_success(zj.TextsConfig.TextsConfig_Arena.formationSuc);
                //如果协议成功，将本地数据改变
                for (var i = 0; i < zj.Game.PlayerFormationSystem.curFormations.length; i++) {
                    if (zj.Game.PlayerFormationSystem.curFormations[i] != null) {
                        if (zj.Game.PlayerFormationSystem.curFormations[i].formationType == zj.Game.PlayerInstanceSystem.curInstanceType) {
                            zj.Game.PlayerFormationSystem.curFormations[i] = formation;
                        }
                    }
                }
                //执行回调，刷新本服格斗场主界面阵容信息
                _this.callback();
                _this.close(zj.UI.HIDE_TO_TOP);
            })
                .catch(function (toast) {
                // toast_success(toast) //TextsConfig.TextsConfig_Arena.formationSuc);
            });
        };
        CommonFormationPvpArena.prototype.onBtnClose = function () {
            var _this = this;
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Pk.DoYouGoOut, function () {
                egret.Tween.get(_this).wait(300).call(function () {
                    _this.close(zj.UI.HIDE_TO_TOP);
                });
            });
        };
        /**
         * 新手引导卡座等级开启限制
         */
        CommonFormationPvpArena.prototype.guidance = function () {
            for (var i = 5; i < 8; i++) {
                this.generals[i].grade = 1;
            }
            if (this.Level < 10) {
                this.restrict10.visible = true;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 1;
                this.generals[6].grade = 1;
                this.generals[7].grade = 1;
                this.generals[5].generalId = 0;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level == 10) {
                this.restrict10.visible = false;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level > 10 && this.Level < 20) {
                this.restrict10.visible = false;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 1;
                this.generals[7].grade = 1;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level == 20) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 1;
                this.generals[7].generalId = 0;
            }
            if (this.Level > 20 && this.Level < 30) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 1;
                this.generals[7].generalId = 0;
            }
            if (this.Level >= 30) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = false;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 0;
            }
        };
        CommonFormationPvpArena.prototype.general = function (objectData) {
            for (var i = 0; i < this.generals.length; i++) {
                if (objectData.generalId == this.generals[i].generalId) {
                    return true;
                }
            }
        };
        CommonFormationPvpArena.prototype.hunterFashionableDress = function (generalId, group) {
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
        return CommonFormationPvpArena;
    }(zj.Dialog));
    zj.CommonFormationPvpArena = CommonFormationPvpArena;
    __reflect(CommonFormationPvpArena.prototype, "zj.CommonFormationPvpArena");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormationPvpArena.js.map