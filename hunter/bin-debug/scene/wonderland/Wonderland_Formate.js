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
     * @class 快速上阵
     *
     * @author LianLei
     *
     * 2019.05.27
     */
    var Wonderland_Formate = (function (_super) {
        __extends(Wonderland_Formate, _super);
        function Wonderland_Formate() {
            var _this = _super.call(this) || this;
            _this.listHeroData = new eui.ArrayCollection();
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.moveGId = null;
            _this.moveIndex = 0;
            _this.groupPosRect = [];
            _this.generals = [];
            _this.skinName = "resource/skins/wonderland/WonderLand_FormateSkin.exml";
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnOk, _this);
            _this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAuto, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPetHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPetHelp, _this);
            _this.btnChangerPet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChangePet, _this);
            _this.btnChangeHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChangeHunter, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTapRemoveTween, _this);
            _this.init();
            return _this;
        }
        Wonderland_Formate.prototype.isFullScreen = function () {
            return true;
        };
        Wonderland_Formate.prototype.addEvent = function () {
            var _this = this;
            this.scrollerHero.scrollPolicyV = eui.ScrollPolicy.OFF;
            this.scrollerHero.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this); // 拖动list上阵猎人图片
            zj.Game.EventManager.on(zj.GameEvent.DRAG_LOOSEN, this.ondragLoosen, this); // 拖动图片松开时触发
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this); // 在舞台上拖动移动
            // list列表猎人拖动数据
            zj.Game.EventManager.on(zj.GameEvent.MOUSE_BEGIN, function (e) {
                var objectData = e.data;
                if (objectData.generalId != 0) {
                    _this.moveImg.width = 95 * 0.8;
                    _this.moveImg.height = 93 * 0.8;
                    _this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                    _this.moveImg.visible = false;
                    _this.moveImg.x = e.stageX - 95 / 2;
                    _this.moveImg.y = e.stageY - 93 / 2;
                    _this.moveGId = objectData.generalId;
                    _this.moveIndex = objectData.index;
                }
            }, this);
            this.addChild(this.moveImg);
        };
        Wonderland_Formate.prototype.removeEvent = function () {
            var _this = this;
            this.scrollerHero.scrollPolicyV = eui.ScrollPolicy.ON;
            this.moveImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this); // 拖动list上阵猎人图片
            zj.Game.EventManager.off(zj.GameEvent.DRAG_LOOSEN, this.ondragLoosen, this); // 拖动图片松开时触发
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this); // 在舞台上拖动移动
            // list列表猎人拖动数据
            zj.Game.EventManager.off(zj.GameEvent.MOUSE_BEGIN, function (e) {
                var objectData = e.data;
                if (objectData.generalId != 0) {
                    _this.moveImg.width = 95 * 0.8;
                    _this.moveImg.height = 93 * 0.8;
                    _this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                    _this.moveImg.visible = false;
                    _this.moveImg.x = e.stageX - 95 / 2;
                    _this.moveImg.y = e.stageY - 93 / 2;
                    _this.moveGId = objectData.generalId;
                    _this.moveIndex = objectData.index;
                }
            }, this);
            this.removeChild(this.moveImg);
        };
        Wonderland_Formate.prototype.ondragLoosen = function () {
            // this.generals = [];
            for (var i = 0; i < this.listHeroData.length; i++) {
                this.onAddToStage(i);
            }
        };
        /**
         * 拖动list上阵猎人图片
         */
        Wonderland_Formate.prototype.mouseUp = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.DRAG_LOOSEN, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex });
            this.moveImg.visible = false;
            this.moveImg.source = "";
        };
        /**
         * 获取坐标
         */
        Wonderland_Formate.prototype.onAddToStage = function (i) {
            var item = this.listHero.getElementAt(i);
            if (item != undefined) {
                // this.generals.push(item.data.generalInfo);
                var worldPointUp = this.listHero.localToGlobal(item.x, item.y);
                worldPointUp.x -= zj.Game.UIManager.x;
                this.groupPosRect[i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, item.width, item.height);
                if (this.groupPosRect[i].contains(this.moveImg.x, this.moveImg.y) == true) {
                    // toast("" + i);
                    var index = i;
                    for (var k = 0; k < this.generals.length; k++) {
                        if (this.moveGId == this.generals[k].id) {
                            // let tmp = this.generals[k];
                            var tmp = this.generals[k];
                            if (this.generalList[index] == undefined)
                                return;
                            this.generals[k] = this.generalList[index];
                            this.generals[index] = tmp;
                            for (var q = 0; q < this.generals.length; q++) {
                                this.generalList[q] = this.generals[q];
                            }
                            this.refreshList();
                            return;
                        }
                    }
                }
            }
        };
        /**
         * 在舞台上拖动移动
         */
        Wonderland_Formate.prototype.mouseMove = function (e) {
            this.moveIndex = this.listHero.selectedIndex;
            this.moveImg.visible = false;
            this.moveImg.x = e.stageX - 95 / 2;
            this.moveImg.y = e.stageY - 93 / 2;
            var listWorld = this.groupRight.localToGlobal(this.scrollerHero.x - 45, this.scrollerHero.y);
            listWorld.x -= zj.Game.UIManager.x;
            var listRect = new egret.Rectangle(listWorld.x, listWorld.y, this.listHero.width + 45, this.listHero.height);
            if (listRect.contains(this.moveImg.x, this.moveImg.y) == true) {
                this.moveImg.visible = true;
            }
        };
        Wonderland_Formate.prototype.init = function () {
            this.btnChangerPet.visible = false;
            this.generalList = [];
            this.tmpChangeGen = null;
            this.tmpMoveIdx = null;
            this.tmpGenID = null;
            this.Load(message.EFormationType.FORMATION_TYPE_WONDERLAND, zj.Game.PlayerHunterSystem.getWonderlandGeneral);
            if (zj.Game.PlayerAdviserSystem.petInfo == null || zj.Game.PlayerAdviserSystem.petInfo.length == 0) {
                this.btnPetHelp.visible = false;
            }
        };
        Wonderland_Formate.prototype.Load = function (_type, funcGetGeneral) {
            this.serverFormat = zj.Game.PlayerFormationSystem.curFormations[_type - 1];
            if (this.serverFormat.generals[0] == 0) {
                this.serverFormat = zj.Game.PlayerFormationSystem.formatsServer[_type];
            }
            this.funcGetGeneral = funcGetGeneral;
            this.SetPlayerAni();
            this.InitList();
        };
        Wonderland_Formate.prototype.InitList = function () {
            this.generalList = this.funcGetGeneral(this.serverFormat)[0];
            this.isChange = this.funcGetGeneral(this.serverFormat)[1];
            this.generals = this.generalList;
            this.SetList();
            if (this.isChange) {
                this.popTips = false;
                this.SaveFormat();
            }
        };
        Wonderland_Formate.prototype.SetPlayerAni = function () {
            var _this = this;
            var groupX = 14;
            if (this.groupHaloFront == null) {
                this.groupHaloFront = new eui.Group();
                this.groupHaloBack = new eui.Group();
                this.groupAll.addChild(this.groupHaloBack);
                this.groupAll.addChild(this.groupHaloFront);
            }
            // 光环设置
            var haloTbl = zj.PlayerVIPSystem.HaloItem(zj.Game.PlayerInfoSystem.BaseInfo.haloId);
            if (haloTbl != null) {
                var auraCssIdFront = haloTbl.halo_front_aniId;
                var auraCssIdBack = haloTbl.halo_back_aniId;
                var getAinmationInfo = function (id) {
                    var aniUi = zj.TableClientAniUi.Item(id);
                    var cssSource = zj.TableClientAniCssSource.Item(aniUi.css_id);
                    return [cssSource.name + "_" + cssSource.number, aniUi.index];
                };
                var back1 = getAinmationInfo(auraCssIdBack);
                var front1 = getAinmationInfo(auraCssIdFront);
                // 光环龙骨
                if (auraCssIdFront != null) {
                    this.groupHaloFront.removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(function (display) {
                        display.x = _this.groupHaloFront.explicitWidth / 2;
                        display.y = _this.groupHaloFront.explicitHeight;
                        _this.groupHaloFront.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                if (auraCssIdBack != null) {
                    this.groupHaloBack.removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(function (display) {
                        display.x = _this.groupHaloBack.explicitWidth / 2;
                        display.y = _this.groupHaloBack.explicitHeight;
                        _this.groupHaloBack.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            this.mapRoleId = zj.PlayerVIPSystem.GetMapRoleInfo(zj.Game.PlayerInfoSystem.BaseInfo);
            var bodySpxId = zj.TableMapRole.Item(this.mapRoleId).body_spx_id;
            var scale = zj.TableMapRole.Item(this.mapRoleId).spine_scale;
            var dbName = zj.TableClientFightAniSpineSource.Item(bodySpxId).atlas;
            var animation = zj.TableClientFightAniSpineSource.Item(bodySpxId).ani_name;
            this.groupAddHero.removeChildren();
            // 猎人龙骨
            zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(function (display) {
                display.scaleX = scale;
                display.scaleY = scale;
                display.x = _this.groupAddHero.explicitWidth / 2;
                display.y = _this.groupAddHero.explicitHeight;
                _this.groupAddHero.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            // 宠物龙骨
            if (zj.Game.PlayerAdviserSystem.petInfo == null || zj.Game.PlayerAdviserSystem.petInfo.length == 0)
                return;
            var petInfo;
            for (var i = 0; i < zj.Game.PlayerAdviserSystem.petInfo.length; i++) {
                var v = zj.Game.PlayerAdviserSystem.petInfo[i];
                if (v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
                    petInfo = v;
                    break;
                }
            }
            if (petInfo != null) {
                this.groupAddPet.removeChildren();
                this.groupAddPet.visible = true;
                var petTbl = zj.PlayerAdviserSystem.PetBase(petInfo.pet_id);
                var spineId = zj.PlayerAdviserSystem.GetPetEvolution(petInfo.pet_id, petInfo);
                var spineMap = zj.TableClientAniSpineSource.Table();
                var spineName = spineMap[spineId].atlas;
                zj.Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", null, 0).then(function (display) {
                    display.x = _this.groupAddPet.explicitWidth / 2 - 40;
                    display.y = _this.groupAddPet.explicitHeight;
                    display.scaleX = 0.5;
                    display.scaleY = 0.5;
                    _this.groupAddPet.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                if (this.groupAddHero.x == groupX + 60)
                    return;
                this.groupAddHero.x = this.groupAddHero.x + 60;
                this.groupHaloFront.x = this.groupHaloFront.x + 60;
                this.groupHaloBack.x = this.groupHaloBack.x + 60;
            }
            else {
                this.groupAddPet.visible = false;
                this.groupAddHero.x = groupX;
                this.groupHaloFront.x = groupX;
                this.groupHaloBack.x = groupX;
            }
        };
        Wonderland_Formate.prototype.SetList = function () {
            this.type = null;
            this.listHeroData.removeAll();
            for (var i = 0; i < this.generalList.length; i++) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = i;
                itemData.generalInfo = this.generalList[i];
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.NORMAL;
                this.listHeroData.addItem(itemData);
            }
            for (var i = this.listHeroData.length; i < zj.PlayerVIPSystem.Item().scene_formation; i++) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = i;
                itemData.generalInfo = null;
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.LOCK;
                this.listHeroData.addItem(itemData);
            }
            if (zj.Game.PlayerVIPSystem.NextFastFormatOpenLevel() != -1) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = null;
                itemData.generalInfo = null;
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.LOCK;
                this.listHeroData.addItem(itemData);
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.generalList); _i < _a.length; _i++) {
                var _b = _a[_i], ik = _b[0], iv = _b[1];
                if (iv.isNew) {
                    this.listHero.selectedIndex = Number(ik);
                    break;
                }
            }
            this.listHero.itemRenderer = zj.League_WarBattleLineupItem;
            this.listHero.dataProvider = this.listHeroData;
            this.SetDragType(zj.TableEnum.Enum.LeagueWarDragType.OFF);
        };
        Wonderland_Formate.prototype.refreshList = function () {
            this.listHeroData.removeAll();
            for (var i = 0; i < this.generalList.length; i++) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = i;
                itemData.generalInfo = this.generalList[i];
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.NORMAL;
                this.listHeroData.addItem(itemData);
            }
            for (var i = this.listHeroData.length; i < zj.PlayerVIPSystem.Item().scene_formation; i++) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = i;
                itemData.generalInfo = null;
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.LOCK;
                this.listHeroData.addItem(itemData);
            }
            if (zj.Game.PlayerVIPSystem.NextFastFormatOpenLevel() != -1) {
                var itemData = new zj.League_WarBattleLineupItemData();
                itemData.father = this;
                itemData.index = null;
                itemData.generalInfo = null;
                itemData.itemType = zj.TableEnum.Enum.FastFormatItemType.LOCK;
                this.listHeroData.addItem(itemData);
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.generalList); _i < _a.length; _i++) {
                var _b = _a[_i], ik = _b[0], iv = _b[1];
                if (iv == undefined)
                    return;
                if (iv.isNew) {
                    this.listHero.selectedIndex = Number(ik);
                    break;
                }
            }
            this.listHero.itemRenderer = zj.League_WarBattleLineupItem;
            this.listHero.dataProvider = this.listHeroData;
        };
        Wonderland_Formate.prototype.SetDragType = function (type) {
            if (this.type == type)
                return;
            this.type = type;
            this.RunDragAni();
            for (var i = 0; i < this.listHeroData.length; i++) {
                var item = this.listHero.getElementAt(i);
                if (item == undefined)
                    continue;
                item.SetDragType(type);
            }
            this.imgLeftUp.visible = (type == zj.TableEnum.Enum.LeagueWarDragType.ON);
            this.imgLeftDown.visible = (type == zj.TableEnum.Enum.LeagueWarDragType.ON);
            this.imgRightUp.visible = (type == zj.TableEnum.Enum.LeagueWarDragType.ON);
            this.imgRightDown.visible = (type == zj.TableEnum.Enum.LeagueWarDragType.ON);
            this.btnAuto.enabled = (type == zj.TableEnum.Enum.LeagueWarDragType.OFF);
            if (type == zj.TableEnum.Enum.LeagueWarDragType.OFF) {
                zj.Set.ButtonBackgroud(this.btnOk, zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortOpen[1], this), zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortOpen[2], this), zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortOpen[3], this));
                this.labelTips.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_tips, (zj.PlayerVIPSystem.Item().scene_formation)));
            }
            else {
                zj.Set.ButtonBackgroud(this.btnOk, zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortClose[1], this), zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortClose[2], this), zj.cachekey(zj.UIConfig.UIConfig_Wonderland.sortClose[3], this));
                this.labelTips.text = zj.TextsConfig.TextConfig_League.war_fast_tips2;
            }
        };
        Wonderland_Formate.prototype.RunDragAni = function () {
            egret.Tween.removeTweens(this.imgLeftUp);
            egret.Tween.removeTweens(this.imgRightUp);
            egret.Tween.removeTweens(this.imgLeftDown);
            egret.Tween.removeTweens(this.imgRightDown);
            egret.Tween.get(this.imgLeftUp, { loop: true })
                .to({ x: 10, y: 10 }, 400, egret.Ease.sineOut)
                .to({ x: -10, y: -10 }, 400, egret.Ease.sineIn);
            egret.Tween.get(this.imgLeftDown, { loop: true })
                .to({ x: 10, y: -10 }, 400, egret.Ease.sineOut)
                .to({ x: -10, y: 10 }, 400, egret.Ease.sineIn);
            egret.Tween.get(this.imgRightUp, { loop: true })
                .to({ x: -10, y: 10 }, 400, egret.Ease.sineOut)
                .to({ x: 10, y: -10 }, 400, egret.Ease.sineIn);
            egret.Tween.get(this.imgRightDown, { loop: true })
                .to({ x: -10, y: -10 }, 400, egret.Ease.sineOut)
                .to({ x: 10, y: 10 }, 400, egret.Ease.sineIn);
        };
        Wonderland_Formate.prototype.SaveFormat = function () {
            var _this = this;
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
            zj.Game.PlayerWonderLandSystem.SetFormatReqOnly()
                .then(function (value) {
                _this.SetDragType(zj.TableEnum.Enum.LeagueWarDragType.OFF);
                if (_this.popTips) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.auto_format_success);
                    _this.popTips = false;
                }
            })
                .catch(function (reason) {
            });
        };
        Wonderland_Formate.prototype.SetFather = function (father) {
            this.father = father;
            this.InitPlayerInfo();
        };
        Wonderland_Formate.prototype.InitPlayerInfo = function () {
            this.subPower = 0;
            this.subMaxHp = 0;
            this.subCurHp = 0;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.generalList); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                this.subPower = this.subPower + v.battle;
                this.subMaxHp = this.subMaxHp + Number(v.maxHp);
                this.subCurHp = this.subCurHp + v.maxHp * v.hp;
            }
            var subCurHp = this.subMaxHp;
            if (this.father.scene != null) {
                subCurHp = this.father.scene.playerLeader.sceneHpPercent * this.subMaxHp / 100;
            }
            this.labelPlayerPower.text = zj.Set.NumberUnit3(this.subPower);
            this.labelHp.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_format_hp, zj.Set.NumberUnit3(Math.floor(subCurHp)), zj.Set.NumberUnit3(Math.floor(this.subMaxHp)));
            // let size_bar = getPercentSize(this.barSize, subCurHp / this.subMaxHp);
            // this.imgHpBar.width = this.barSize.width;
            this.imgHpBar.mask = this.imgHpBarMask;
            var size_bar = zj.getPercentSize(this.imgHpBarMask, subCurHp / this.subMaxHp);
            // size_bar.width = 100;
            this.imgHpBarMask.width = size_bar.width;
            // this.imgHpBar.width = this.imgHpBar.width - size_bar.width;
        };
        Wonderland_Formate.prototype.onBtnOk = function () {
            if (this.type == zj.TableEnum.Enum.LeagueWarDragType.OFF) {
                this.addEvent();
                this.SetDragType(zj.TableEnum.Enum.LeagueWarDragType.ON);
                // this.scrollerHero.enabled = false;
            }
            else {
                // this.scrollerHero.enabled = true;
                this.removeEvent();
                this.popTips = true;
                this.SaveFormat();
                this.SetDragType(zj.TableEnum.Enum.LeagueWarDragType.OFF);
            }
        };
        Wonderland_Formate.prototype.onBtnAuto = function () {
            var tempList = this.generalList;
            this.generalList = null;
            this.generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.generalList); _i < _a.length; _i++) {
                var _b = _a[_i], gk = _b[0], gv = _b[1];
                gv.isNew = false;
            }
            var is_eq = true;
            if (tempList.length == this.generalList.length) {
                for (var _c = 0, _d = zj.HelpUtil.GetKV(this.generalList); _c < _d.length; _c++) {
                    var _e = _d[_c], gk = _e[0], gv = _e[1];
                    if (tempList[Number(gk)].id != gv.id) {
                        is_eq = false;
                        break;
                    }
                }
            }
            else {
                is_eq = false;
            }
            if (!is_eq) {
                this.SetList();
                this.popTips = true;
                this.SaveFormat();
            }
            else {
                zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.auto_format_success);
            }
        };
        Wonderland_Formate.prototype.onBtnPetHelp = function () {
            zj.loadUI(zj.Wonderland_PropertyView)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Wonderland_Formate.prototype.onBtnChangeHunter = function () {
            var _this = this;
            zj.TipManager.ShowChangeIcon(function (picId) {
                _this.ReqModifyUserHeadBefore(picId);
            });
        };
        Wonderland_Formate.prototype.ReqModifyUserHeadBefore = function (headId) {
            var _this = this;
            if (headId != zj.Game.PlayerInfoSystem.BaseInfo.picId) {
                zj.Game.PlayerWonderLandSystem.ReqModifyUserInfo(headId, null, null, null)
                    .then(function (value) {
                    _this.SetPlayerAni();
                    if (_this.father != null && _this.father.SpriteHead != null) {
                        _this.father.SpriteHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), _this);
                    }
                })
                    .catch(function (reason) {
                });
            }
        };
        Wonderland_Formate.prototype.onBtnChangePet = function () {
            var _this = this;
            if (zj.Game.PlayerAdviserSystem.petInfo == null || zj.Game.PlayerAdviserSystem.petInfo.length == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_DarkLand.noPetCanSelect);
            }
            else {
                zj.TipManager.ShowChangePet(function (petInfo) {
                    _this.ReqModifyPet(petInfo);
                });
            }
        };
        Wonderland_Formate.prototype.ReqModifyPet = function (petInfo) {
            var _this = this;
            var prePetId = null;
            var curPetId = null;
            var prePetInfo;
            for (var i = 0; i < zj.Game.PlayerAdviserSystem.petInfo.length; i++) {
                var v = zj.Game.PlayerAdviserSystem.petInfo[i];
                if (v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
                    prePetInfo = v;
                    break;
                }
            }
            prePetId = prePetInfo != null ? prePetInfo.pet_id : null;
            if (petInfo != null) {
                curPetId = petInfo.pet_id;
                if (curPetId == prePetId) {
                    return;
                }
            }
            else {
                curPetId = prePetId;
            }
            if (prePetId != null || curPetId != null) {
                this.prePetId = prePetId;
                this.curPetId = curPetId;
                zj.Game.PlayerWonderLandSystem.ReqModifyCarryPet(curPetId)
                    .then(function (value) {
                    if (_this.prePetId != _this.curPetId && _this.prePetId != null) {
                        zj.Game.PlayerAdviserSystem.petMap[_this.prePetId].situtation = 0;
                        var key = void 0;
                        for (var i = 0; i < zj.Game.PlayerAdviserSystem.petInfo.length; i++) {
                            var v = zj.Game.PlayerAdviserSystem.petInfo[i];
                            if (v.pet_id == _this.prePetId) {
                                key = v.pet_id;
                                break;
                            }
                        }
                        if (key != null) {
                            zj.Game.PlayerAdviserSystem.petMap[key].situtation = 0;
                        }
                    }
                    _this.SetPlayerAni();
                })
                    .catch(function (reason) {
                });
            }
        };
        Wonderland_Formate.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.father.scene != null) {
                this.father.scene.playerLeader.resetBody(this.mapRoleId);
                if (this.father.scene.playerLeaderPet != null && zj.Game.PlayerAdviserSystem.petInfo != null && zj.Game.PlayerAdviserSystem.petInfo.length != 0) {
                    var petInfo = zj.Table.FindR(zj.Game.PlayerAdviserSystem.petInfo, function (_k, _v) {
                        return _v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION;
                    });
                    this.father.scene.playerLeaderPet.resetPetBody(petInfo);
                }
            }
            this.father.imgHead.source = (zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this));
        };
        Wonderland_Formate.prototype.onTapRemoveTween = function () {
            var item = this.listHero.getElementAt(this.listHero.selectedIndex);
            if (item == null || item == undefined)
                return;
            if (item.dragType == zj.TableEnum.Enum.LeagueWarDragType.ON)
                return;
            item.clearTouchTween();
        };
        return Wonderland_Formate;
    }(zj.Dialog));
    zj.Wonderland_Formate = Wonderland_Formate;
    __reflect(Wonderland_Formate.prototype, "zj.Wonderland_Formate");
})(zj || (zj = {}));
//# sourceMappingURL=Wonderland_Formate.js.map