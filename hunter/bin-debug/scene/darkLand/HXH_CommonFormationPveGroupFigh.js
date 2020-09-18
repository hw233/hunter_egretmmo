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
     * wangshenzhuo
     * 2019/03/11
     * 飞龙营地上阵
     */
    var HXH_CommonFormationPveGroupFigh = (function (_super) {
        __extends(HXH_CommonFormationPveGroupFigh, _super);
        function HXH_CommonFormationPveGroupFigh() {
            var _this = _super.call(this) || this;
            _this.tmp_formation = [];
            _this.buttonIndex = 1;
            _this.formation = [];
            // 上阵武将列表
            _this.generals = [];
            // 上阵所有武将列表
            _this.generalss = [];
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.moveGId = null;
            _this.moveIndex = 0;
            _this.button = [];
            _this.buttonSelect = [];
            _this.imageSelect = [];
            _this.groupPosRect = [];
            _this.formats = [];
            _this.idType = 0;
            // 底部数据data
            _this.listBottomData = new eui.ArrayCollection();
            /**列表滑出去之后再回去不能滑动 */
            _this.vis = true;
            _this.skinName = "resource/skins/darkLand/HXH_CommonFormationPveGroupFightSkin.exml";
            _this.scene = new zj.GoFightMap();
            _this.scene.LoadMap(17); //这里是不同功能的地图ID
            _this.addChildAt(_this.scene, 0);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
            _this.buttonclose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonTeam1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam1, _this);
            _this.buttonTeam2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam2, _this);
            _this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.buttonConfirmTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonConfirmTeam, _this);
            _this.buttonSelect1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSelect1, _this);
            _this.buttonSelect2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSelect2, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            zj.Game.EventManager.on(zj.GameEvent.ON_MOVE, _this.onMove, _this);
            _this.init();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
                _this.removeEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
                _this.close();
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.loadDownListInfo();
            return _this;
        }
        HXH_CommonFormationPveGroupFigh.prototype.init = function () {
            var _this = this;
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
            for (var i = 0; i < 24; i++) {
                var posState = new zj.PosState();
                this.generalss.push(posState);
            }
            this.tmp_formation = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.formatsGroupFight);
            this.buttonIndex = 1;
            this.button = [
                this.buttonTeam1,
                this.buttonTeam2
            ];
            this.buttonSelect = [
                this.buttonSelect1,
                this.buttonSelect2,
            ];
            this.imageSelect = [
                this.imageBigonName1,
                this.imageBigonName2,
            ];
            this.SetInfoSelect();
        };
        HXH_CommonFormationPveGroupFigh.prototype.up = function () {
            this.vis = true;
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            this.moveImg.visible = false;
            this.moveImg.source = "";
        };
        HXH_CommonFormationPveGroupFigh.prototype.SetInfo = function (father) {
            this.father = father;
            this.formats = zj.Game.PlayerFormationSystem.formatsGroupFight;
            this.formation = zj.Table.DeepCopy(this.formats);
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
        HXH_CommonFormationPveGroupFigh.prototype.SetInfoSelect = function (num) {
            var index = this.GetFriendSelectIndex();
            var aa = this.formation;
            for (var k in this.buttonSelect) {
                var v = this.buttonSelect[k];
                v.touchEnabled = (Number(index) != Number(k));
            }
            for (var kk in this.imageSelect) {
                var vv = this.imageSelect[kk];
                vv.visible = (index == kk);
            }
        };
        HXH_CommonFormationPveGroupFigh.prototype.refreshInfo = function (id) {
            this.generals = [];
            for (var i = 0; i < 8; i++) {
                var posState = new zj.PosState();
                if (i < 4) {
                    var a = this.formation[id].generals[i];
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
        /**刷新全局信息 */
        HXH_CommonFormationPveGroupFigh.prototype.refreshOverallInfo = function () {
            this.drawUI();
            this.hunterInfo(this.idType);
            // this.loadDownListInfo();
        };
        /**装备猎人项刷新动画 */
        HXH_CommonFormationPveGroupFigh.prototype.cartoon = function () {
            var a = 400;
            for (var i = 1; i < 5; i++) {
                a -= 100;
                this["group" + i].alpha = 0;
                this["group" + i].scaleY = 1.1;
                this["group" + i].scaleX = 1.1;
                egret.Tween.get(this["group" + i]).wait(a).to({ alpha: 1 }, 10).to({ scaleX: 1, scaleY: 1 }, 200);
            }
        };
        /**刷新底部list信息 */
        HXH_CommonFormationPveGroupFigh.prototype.loadDownListInfo = function () {
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
            this.listMyHero.dataProvider = this.listBottomData;
            this.listMyHero.itemRenderer = zj.FormatChooseHeroItem;
            this.listMyHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            this.listMyHero.allowMultipleSelection = true;
        };
        HXH_CommonFormationPveGroupFigh.prototype.GetFriendSelectIndex = function () {
            var formation = zj.Game.PlayerFormationSystem.formatsGroupFight;
            this.formation = zj.Table.DeepCopy(formation);
            for (var k in formation) {
                var v = formation[k];
                if (v.adviserSkill == 1) {
                    return k;
                }
            }
            return 0;
        };
        HXH_CommonFormationPveGroupFigh.prototype.hunterInfo = function (id) {
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
            for (var i = 0; i < this.generals.length; i++) {
                if (i < 4) {
                    this.formation[id].generals[i] = this.generals[i].generalId;
                }
                else {
                    this.formation[id].supports[i - 4] = this.generals[i].generalId;
                }
            }
        };
        HXH_CommonFormationPveGroupFigh.prototype.onListHerosTap = function (e) {
            var _this = this;
            var index = e.itemIndex;
            if (this.general(e.item)) {
                return;
            }
            var point = this.listMyHero.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= zj.Game.UIManager.x;
            this.moveImg.x = point.x;
            this.moveImg.y = point.y;
            if (!e.item.isCanTouch) {
                return;
            }
            this.addGeneral(e.item.generalId);
            zj.Game.EventManager.on(zj.GameEvent.FORMATE_REFRESH_LIST, function (e) {
                _this.refreshOverallInfo();
                if (e.data == null || e.data == undefined) {
                    return;
                }
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
        };
        HXH_CommonFormationPveGroupFigh.prototype.addGeneral = function (generalId) {
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
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
                    break;
                }
            }
        };
        HXH_CommonFormationPveGroupFigh.prototype.getSelectGenIds = function () {
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
            return this.generalss;
        };
        HXH_CommonFormationPveGroupFigh.prototype.SetInfoButtonClick = function (index) {
            this.buttonIndex = index;
            if (index == 1) {
                this.onBtnTeam1();
            }
            else if (index == 2) {
                this.onBtnTeam2();
            }
        };
        //点击 “主队阵容”  按钮
        HXH_CommonFormationPveGroupFigh.prototype.onBtnTeam1 = function () {
            this.hunterInfo(this.idType);
            this.idType = 0;
            this.refreshInfo(0);
            this.buttonIndex = 1;
            this.buttonTeam1.touchEnabled = false;
            this.buttonTeam2.touchEnabled = true;
            zj.Set.ButtonBackgroud(this.buttonTeam1, "ui_groupfight_ButtonTeamNameSel_png");
            zj.Set.ButtonBackgroud(this.buttonTeam2, "ui_groupfight_ButtonTeamNameNor_png");
        };
        //点击 “二队阵容”  按钮
        HXH_CommonFormationPveGroupFigh.prototype.onBtnTeam2 = function () {
            this.hunterInfo(this.idType);
            this.idType = 1;
            this.refreshInfo(1);
            this.buttonIndex = 2;
            this.buttonTeam1.touchEnabled = true;
            this.buttonTeam2.touchEnabled = false;
            zj.Set.ButtonBackgroud(this.buttonTeam1, "ui_groupfight_ButtonTeamNameNor_png");
            zj.Set.ButtonBackgroud(this.buttonTeam2, "ui_groupfight_ButtonTeamNameSel_png");
        };
        //保存阵型
        HXH_CommonFormationPveGroupFigh.prototype.onButtonConfirmTeam = function () {
            var _this = this;
            var info = zj.Table.DeepCopy(this.formation);
            var errorId = this.JudgeCanBat();
            if (errorId == 0) {
                // for(const fk in this.formation){
                // 	const fv = this.formats[fk];
                // 	if (this.formats[fk].generals.length == 0) {
                // 		this.formats[fk].formationType = Game.PlayerInstanceSystem.curInstanceType;
                // 		Game.PlayerFormationSystem.formatsGroupFight = this.formats[fk];
                // 	}
                // }
                this.SetFormatReq(this.formation)
                    .then(function () {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Contend.formationSave);
                    //如果协议成功，将本地数据改变
                    zj.Game.PlayerFormationSystem.formatsGroupFight = info;
                    _this.close(zj.UI.HIDE_TO_TOP);
                    _this.scene.close();
                    _this.father.SetInfoMyFormate();
                })
                    .then(function () {
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_GroupFight.needGeneral2[errorId - 1]);
            }
        };
        //点击 关闭 按钮
        HXH_CommonFormationPveGroupFigh.prototype.onButtonClose = function () {
            var _this = this;
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Pk.DoYouGoOut, function () {
                egret.Tween.get(_this).wait(300).call(function () {
                    _this.scene.close();
                    _this.close(zj.UI.HIDE_TO_TOP);
                    zj.Game.PlayerFormationSystem.curFormationIndex = 1;
                    zj.Game.PlayerFormationSystem.formatsGroupFight = _this.tmp_formation;
                    // this.father.SetInfoMyFormate();
                });
            });
        };
        HXH_CommonFormationPveGroupFigh.prototype.onButtonSelect1 = function () {
            this.ReqSetSelect(1);
        };
        HXH_CommonFormationPveGroupFigh.prototype.onButtonSelect2 = function () {
            this.ReqSetSelect(2);
        };
        HXH_CommonFormationPveGroupFigh.prototype.ReqSetSelect = function (index) {
            var _this = this;
            var otherIndex = index == 1 && 2 || 1;
            var a = zj.Game.PlayerFormationSystem.formatsGroupFight;
            zj.Game.PlayerFormationSystem.formatsGroupFight[index - 1].adviserSkill = 1;
            zj.Game.PlayerFormationSystem.formatsGroupFight[otherIndex - 1].adviserSkill = 0;
            this.SetFormatReq(this.formation)
                .then(function () {
                zj.toast_success(zj.TextsConfig.TextsConfig_GroupFight.makeSuccess);
                _this.SetInfoSelect(2);
            })
                .then(function () {
            });
        };
        HXH_CommonFormationPveGroupFigh.prototype.mouseUp = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.ON_MOVE, { x: e.stageX - this.groupUp.x - this.groupMain.x - this.groupAllFather.x, y: e.stageY - this.groupUp.y - this.groupMain.y - this.groupAllFather.y, generalId: this.moveGId, index: this.moveIndex });
            this.moveImg.visible = false;
            this.moveImg.source = "";
            // this.loadDownListInfo();
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE);
        };
        //鼠标点击拖动人物
        HXH_CommonFormationPveGroupFigh.prototype.mouseMove = function (e) {
            this.moveImg.x = e.stageX - 95 / 2;
            this.moveImg.y = e.stageY - 93 / 2;
            if (this.moveImg.x > this.groupDown.x + this.groupMain.x && this.moveImg.x < this.groupDown.x + this.groupMain.x + this.groupDown.width && this.moveImg.y > this.groupDown.y + this.groupMain.y && this.moveImg.y < this.groupDown.y + this.groupMain.y + this.groupDown.height) {
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
        HXH_CommonFormationPveGroupFigh.prototype.JudgeCanBat = function () {
            var info = zj.Table.DeepCopy(this.formation);
            // this.SetFormatReq(this.formation);
            zj.Game.PlayerFormationSystem.formatsGroupFight = info;
            var bat1 = zj.Table.FindF(zj.Game.PlayerFormationSystem.formatsGroupFight[0].generals, function (k, v) {
                return v != 0;
            });
            var bat2 = zj.Table.FindF(zj.Game.PlayerFormationSystem.formatsGroupFight[1].generals, function (k, v) {
                return v != 0;
            });
            if (bat1 && bat2) {
                return 0;
            }
            else {
                if (this.buttonIndex == 1) {
                    if (bat1) {
                        return 2;
                    }
                    else {
                        return 1;
                    }
                }
                else {
                    if (bat2) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
            }
        };
        //保存阵容
        HXH_CommonFormationPveGroupFigh.prototype.SetFormatReq = function (formations) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetFormationRequest();
                request.body.formations = formations;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //
        HXH_CommonFormationPveGroupFigh.prototype.drawUI = function () {
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
                    if (hunterInfo == null) {
                        pS.generalId = 0;
                    }
                    baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                }
                if (i < 4) {
                    if (pS.generalId) {
                        // this["imgDownFrame" + (i + 1)].source = cachekey(framePath, this);
                        // this["imgDownIcon" + (i + 1)].source = cachekey(iconPath, this);
                        // this["imgDownNum" + (i + 1)].text = hunterInfo.level.toString();
                        // Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 1)], hunterInfo.star, hunterInfo.awakePassive.level);
                        this["groupPos" + (i + 1)].visible = true;
                        // this["imgArrow" + (i + 1)].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
                        this["clearanceLock" + (i + 1)].visible = false;
                        this.hunterFashionableDress(pS.generalId, this["grouphunter" + (i + 1)]);
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
        HXH_CommonFormationPveGroupFigh.prototype.onAddToStage = function () {
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
        HXH_CommonFormationPveGroupFigh.prototype.onMove = function (e) {
            var objectData = e.data;
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
                    this.refreshOverallInfo();
                    break;
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
            var _a, _b, _c, _d, _e, _f;
        };
        HXH_CommonFormationPveGroupFigh.prototype.general = function (objectData) {
            for (var i = 0; i < this.generalss.length; i++) {
                if (objectData.generalId == this.generalss[i].generalId) {
                    return true;
                }
            }
        };
        HXH_CommonFormationPveGroupFigh.prototype.hunterFashionableDress = function (generalId, group) {
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
        return HXH_CommonFormationPveGroupFigh;
    }(zj.Scene));
    zj.HXH_CommonFormationPveGroupFigh = HXH_CommonFormationPveGroupFigh;
    __reflect(HXH_CommonFormationPveGroupFigh.prototype, "zj.HXH_CommonFormationPveGroupFigh");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_CommonFormationPveGroupFigh.js.map