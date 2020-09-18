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
    //PetMainScene
    //hexiaowei
    //2019/01/11
    var PetMainScene = (function (_super) {
        __extends(PetMainScene, _super);
        function PetMainScene() {
            var _this = _super.call(this) || this;
            _this.itemIndex = 0;
            _this.btnType = 1;
            //列表下拉移动位置
            _this.moveLocation = 0;
            _this.info = [];
            _this.index = 0;
            _this.ui = [
                "PetDontGet",
                "PetDontGetB",
                "PetGet"
            ];
            _this.itemList = [];
            _this.skinName = "resource/skins/monster/PetMainSceneSkin.exml";
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.listAdviser.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.AddHeroesPokedexInfo, _this);
            _this.imgSpriteIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupSkill1, _this);
            _this.imgSpriteIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupSkill2, _this);
            _this.btnDes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDes, _this);
            _this.btnDes.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDes1, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDes1, _this);
            _this.BtnMonster.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMonster, _this);
            _this.btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPet, _this);
            _this.btnDes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDes, _this);
            _this.btnDes.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDes1, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDes1, _this);
            _this.btnRest.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRest, _this);
            _this.btnControl.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnControl1, _this);
            _this.btnControl.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnControl, _this);
            _this.btnControlShow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnControlShow1, _this);
            _this.btnControlShow.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnControlShow, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.CoinMoney, _this);
            _this.PetGet = new zj.PetGet();
            _this.groupProperty1.addChild(_this.PetGet);
            _this.DontGet = new zj.PetDontGet();
            _this.groupProperty.addChild(_this.DontGet);
            _this.DontGet.name = "DontGet";
            _this.DontGetB = new zj.PetDontGetB();
            _this.groupProperty2.addChild(_this.DontGetB);
            _this.petdes = new zj.Common_PetDes();
            _this.groupMessage.addChild(_this.petdes);
            _this.petdes.visible = false;
            _this.despettalent = new zj.Common_DesPetTalent();
            _this.groupSkillMessage.addChild(_this.despettalent);
            _this.despettalent.visible = false;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.PetDontGet" });
            return _this;
        }
        //金币
        PetMainScene.prototype.CoinMoney = function () {
            var token = zj.Game.PlayerInfoSystem.Coin;
            if (token > 100000) {
                this.labelGold.text = (token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelGold.text = token.toString();
            }
        };
        //跳转加金币页面
        PetMainScene.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        //龙骨动画念兽
        PetMainScene.prototype.addAnimatoin = function (dbName, scale, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
                .then(function (display) {
                display.x = _this.groupAdviser.width / 2;
                display.y = _this.groupAdviser.height + 10;
                display.scaleX = scale;
                display.scaleY = scale;
                _this.groupAdviser.removeChildren();
                _this.groupAdviser.addChild(display);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //龙骨动画宠物
        PetMainScene.prototype.addAnimatoinPet = function (dbName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
                .then(function (display) {
                display.x = _this.groupAdviser.width / 2;
                display.y = _this.groupAdviser.height / 1.2;
                _this.groupAdviser.removeChildren();
                _this.groupAdviser.addChild(display);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        PetMainScene.prototype.inIt = function (btnType) {
            this.btnType = btnType;
            //this.btnType = 2;
            if (this.btnType == 1) {
                this.BtnMonster.visible = false;
                this.imagePet.visible = false;
                this.imageMonster.visible = true;
                this.imgred1.visible = true;
                this.imgred2.visible = false;
                this.btnPet.visible = true;
                this.imgTabulate.visible = false;
                this.imgTabulate1.visible = true;
                this.groupPetState.visible = false;
                this.groupPreview.visible = false;
                this.groupSkill1.visible = false;
                this.groupSkill2.visible = false;
                this.labelGetNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.LabelGetName, zj.Game.PlayerAdviserSystem.adviser.length, zj.Helper.getObjLen(zj.TableBaseAdviser.Table()));
            }
            else {
                this.BtnMonster.visible = true;
                this.imagePet.visible = true;
                this.imageMonster.visible = false;
                this.imgred1.visible = false;
                this.imgred2.visible = true;
                this.btnPet.visible = false;
                this.imgTabulate.visible = true;
                this.imgTabulate1.visible = false;
                this.groupPetState.visible = true;
                this.groupPreview.visible = true;
                this.groupSkill1.visible = true;
                this.groupSkill2.visible = true;
                this.labelGetNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_get_num, zj.Game.PlayerAdviserSystem.petInfo.length, zj.Helper.getObjLen(zj.PlayerAdviserSystem.SortPet()));
            }
            //this.groupAdviser.removeChildren();
            //this.dontget();
            this.setInfo();
            this.CoinMoney();
            this.dontget();
        };
        //宠物、念兽属性刷新
        PetMainScene.prototype.dontget = function () {
            var adviser_id = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            if (this.btnType == 1) {
                if (zj.PlayerAdviserSystem.Have(this.index)) {
                    this.PetGet.SetInfo(adviser_id, this, this.btnType);
                    this.groupProperty.visible = false;
                    this.groupProperty2.visible = false;
                    this.groupProperty1.visible = true;
                }
                else {
                    this.DontGet.SetInfo(adviser_id, this, this.btnType);
                    this.groupProperty1.visible = false;
                    this.groupProperty2.visible = false;
                    this.groupProperty.visible = true;
                }
            }
            else {
                if (zj.PlayerAdviserSystem.GetPet(this.index)) {
                    this.PetGet.SetInfo(adviser_id, this, this.btnType);
                    this.groupProperty.visible = false;
                    this.groupProperty1.visible = true;
                    this.groupProperty2.visible = false;
                }
                else {
                    this.DontGetB.SetInfo(adviser_id, this, this.btnType);
                    this.groupProperty1.visible = false;
                    this.groupProperty2.visible = true;
                    this.groupProperty.visible = false;
                }
            }
        };
        PetMainScene.prototype.setInfo = function () {
            this.imgred1.visible = (this.btnType != 1 && (zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_GET) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_UP) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_AWARD)));
            this.imgred2.visible = (this.btnType != 2 && (zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_GET) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_UPSTAR) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_STEP)));
            var info;
            if (this.btnType == 1) {
                info = zj.PlayerAdviserSystem.GetTable();
                this.imgred1.visible = false;
                this.imgred2.visible = (zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_GET) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_UPSTAR) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_STEP));
            }
            else {
                info = zj.PlayerAdviserSystem.SortPet();
                this.imgred1.visible = (zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_GET) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_UP) || zj.Tips.GetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_AWARD));
                this.imgred2.visible = false;
            }
            //this.listAdviser.selectedIndex = this.itemIndex; // 默认选中
            this.listAdviser.itemRenderer = zj.PetInfoItem;
            this.arrCollectionItem = new eui.ArrayCollection();
            for (var i = 0; i < info.length; i++) {
                this.arrCollectionItem.addItem(info[i]);
                var adviserId = info[i].adviserId != undefined ? info[i].adviserId : info[i].adviser_id;
                var petId = info[i].pet_id;
                if (adviserId == this.index) {
                    this.listAdviser.selectedIndex = i;
                    this.itemIndex = this.listAdviser.selectedIndex;
                }
                else if (petId == this.index) {
                    this.listAdviser.selectedIndex = i;
                    this.itemIndex = this.listAdviser.selectedIndex;
                }
                else {
                    this.listAdviser.selectedIndex = this.itemIndex; // 默认选中
                    this.itemIndex = this.listAdviser.selectedIndex;
                }
            }
            this.listAdviser.dataProvider = this.arrCollectionItem;
            //this.itemIndex=this.listAdviser.selectedIndex;
            this.scrollerInfo.viewport = this.listAdviser;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
            this.setIconInfo();
        };
        //列表点击
        PetMainScene.prototype.AddHeroesPokedexInfo = function (e) {
            if (this.itemIndex != this.listAdviser.selectedIndex) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listAdviser.selectedIndex]);
                this.itemIndex = this.listAdviser.selectedIndex;
            }
            else {
                return;
            }
            this.groupAdviser.removeChildren();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.setIconInfo();
            this.dontget();
            this.CoinMoney();
        };
        //念兽、宠物详情
        PetMainScene.prototype.setIconInfo = function () {
            //this.addAnimatoin("beastjokerspine");
            if (this.btnType == 1) {
                this.info = zj.PlayerAdviserSystem.GetTable();
                if (this.info.length == 0) {
                    this.index = 0;
                }
                else {
                    this.index = this.info[this.itemIndex].adviserId != undefined ? this.info[this.itemIndex].adviserId : this.info[this.itemIndex].adviser_id;
                }
                var infoItem = zj.PlayerAdviserSystem.Instance(this.index);
                // let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id);
                // var strs = new Array()
                // strs = aniSpine.json.split("/");
                // let animationPracticalUrl = strs[strs.length - 1].split(".")[0];
                // this.addAnimatoin(animationPracticalUrl);
                var aniSpine = zj.TableClientAniSpineSource.Item(infoItem.spine_id);
                this.addAnimatoin(aniSpine.json, infoItem.spine_scale);
                var quality = infoItem.quality;
                var name_1 = infoItem.adviser_name;
                var quality1 = infoItem.quality + 10;
                this.imgSpriteIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.Grade[quality1], this);
                this.imgSpritePetName.source = zj.cachekey(infoItem.name_down_path, this);
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                PetMainScene.GetNodeStarByPet(this.groupSceneStar, 5, 5, 1, level, 0);
            }
            else {
                this.info = zj.PlayerAdviserSystem.SortPet();
                if (this.info.length == 0) {
                    this.index = 0;
                }
                else {
                    this.index = this.info[this.itemIndex].pet_id;
                }
                var infoItem = zj.PlayerAdviserSystem.PetBase(this.index);
                var isHave = zj.PlayerAdviserSystem.GetPet(this.index);
                this.btnControl.visible = !isHave;
                this.btnControlShow.visible = isHave;
                this.groupPetState.visible = isHave;
                //this.groupPreview.visible = isHave;
                this.groupSkill1.visible = isHave;
                this.groupSkill2.visible = isHave;
                var steps = 0;
                if (zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
                    steps = 0;
                }
                else if (zj.Game.PlayerAdviserSystem.petMap[this.index].step >= zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
                    && zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
                    steps = 1;
                }
                else {
                    steps = 2;
                }
                var path1 = zj.UIConfig.UIConfig_Adviser.pet_battle_state.stopNor;
                var path2 = zj.UIConfig.UIConfig_Adviser.pet_battle_state.stopSel;
                var path3 = zj.UIConfig.UIConfig_Adviser.pet_battle_state.battleNor;
                var path4 = zj.UIConfig.UIConfig_Adviser.pet_battle_state.battleSel;
                if (zj.Game.PlayerAdviserSystem.petMap[this.index].situtation == 1) {
                    for (var k in zj.Game.PlayerAdviserSystem.petMap) {
                        var v = zj.Game.PlayerAdviserSystem.petMap[k];
                        if (v.pet_id != this.index) {
                            v.situtation = 0;
                        }
                    }
                }
                if (zj.Game.PlayerAdviserSystem.petMap[this.index].situtation == 1) {
                    zj.Set.ButtonBackgroud(this.btnRest, path1, path2, path2);
                    this.labelBattle.text = zj.TextsConfig.TextsConfig_Adviser.pet_battle;
                }
                else if (zj.Game.PlayerAdviserSystem.petMap[this.index].situtation == 0) {
                    zj.Set.ButtonBackgroud(this.btnRest, path3, path4, path4);
                    this.labelBattle.text = zj.TextsConfig.TextsConfig_Adviser.pet_stop;
                }
                var aniSpine = zj.TableClientAniSpineSource.Item(infoItem.spine_id[steps]);
                this.addAnimatoinPet(aniSpine.json);
                this.imgSpriteIcon.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(this.index).skill_Icon[1], this);
                this.imgSpriteIcon1.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(this.index).skill_Icon[2], this);
                var quality = infoItem.quality;
                var quality1 = infoItem.quality + 10;
                this.imgSpriteIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.Grade[quality1], this);
                this.imgSpritePetName.source = zj.cachekey(infoItem.name_down_path, this);
                var level = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
                PetMainScene.GetNodeStarByPet(this.groupSceneStar, 5, 5, 1, level, 0);
                var step = 0;
                if (zj.Game.PlayerAdviserSystem.petMap[this.index].step == zj.CommonConfig.pet_step_max) {
                    step = zj.Game.PlayerAdviserSystem.petMap[this.index].step - 1;
                }
                else {
                    step = zj.Game.PlayerAdviserSystem.petMap[this.index].step;
                }
                var curStar = 0;
                if (step <= zj.CommonConfig.pet_step_max) {
                    curStar = zj.PlayerAdviserSystem.PetBase(this.index).evo_star_req[step];
                }
                var goods = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume[step];
                var count = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume_good[step][0];
                var itemSet1 = zj.PlayerItemSystem.Set(goods[0]);
                var Cur1 = zj.PlayerItemSystem.Count(goods[0]);
                var money = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume_money[step];
                var moneyDes = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                this.imgSpriteRedPoint.visible = (zj.Game.PlayerAdviserSystem.petMap[this.index].step != zj.CommonConfig.pet_step_max && step <= zj.CommonConfig.pet_step_max && zj.Game.PlayerAdviserSystem.petMap[this.index].star >= curStar && Cur1 >= count && moneyDes >= money);
            }
        };
        //宠物天赋技能
        PetMainScene.prototype.onGroupSkill1 = function () {
            var star = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            var step = zj.Game.PlayerAdviserSystem.petMap[this.index].step;
            this.despettalent.Load(this.index, star, step, 0);
            this.despettalent.visible = true;
        };
        PetMainScene.prototype.onGroupSkill2 = function () {
            var star = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            var step = zj.Game.PlayerAdviserSystem.petMap[this.index].step;
            this.despettalent.Load(this.index, star, step, 1);
            this.despettalent.visible = true;
        };
        //隐藏宠物天赋技能
        PetMainScene.prototype.onGroupSkill = function () {
            this.despettalent.visible = false;
        };
        //返回主界面
        PetMainScene.prototype.onBtnReturn = function () {
            var _this = this;
            // this.anchorOffsetX = this.groupPetMain.width/2;
            // this.anchorOffsetY = this.groupPetMain.height;
            egret.Tween.get(this)
                .to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backIn)
                .call(function () {
                _this.close();
            });
        };
        //念兽按钮
        PetMainScene.prototype.onBtnMonster = function () {
            //this.btnType = 1;
            this.groupAdviser.removeChildren();
            this.index = zj.PlayerAdviserSystem.GetTable()[0].adviserId != undefined ? zj.PlayerAdviserSystem.GetTable()[0].adviserId : zj.PlayerAdviserSystem.GetTable()[0].adviser_id;
            this.itemIndex = 0;
            this.moveLocation = 0;
            this.inIt(1);
            this.dontget();
        };
        //宠物按钮
        PetMainScene.prototype.onBtnPet = function () {
            //this.btnType = 2;
            this.groupAdviser.removeChildren();
            this.index = zj.PlayerAdviserSystem.SortPet()[0].pet_id;
            this.itemIndex = 0;
            this.moveLocation = 0;
            this.inIt(2);
            this.dontget();
        };
        //宠物信息
        PetMainScene.prototype.onBtnDes = function () {
            this.btnDes.scaleX = 1.05;
            this.btnDes.scaleY = 1.05;
            if (this.btnType == 1) {
                var des = zj.PlayerAdviserSystem.Instance(this.index).des;
                this.petdes.Load(des);
            }
            else {
                var des = zj.PlayerAdviserSystem.PetBase(this.index).des;
                this.petdes.Load(des);
            }
            this.petdes.visible = true;
        };
        //移除宠物信息/技能
        PetMainScene.prototype.onBtnDes1 = function () {
            this.petdes.visible = false;
            this.despettalent.visible = false;
            this.btnDes.scaleX = 1;
            this.btnDes.scaleY = 1;
            this.btnControlShow.scaleX = 1;
            this.btnControlShow.scaleY = 1;
            this.btnControl.scaleX = 1;
            this.btnControl.scaleY = 1;
        };
        //宠物休息、跟随
        PetMainScene.prototype.onBtnRest = function () {
            var _this = this;
            zj.PlayerAdviserSystem.PetBattle_Visit(this.index)
                .then(function () {
                _this.groupAdviser.removeChildren();
                _this.inIt(_this.btnType);
                if (zj.Game.PlayerAdviserSystem.petMap[_this.index].situtation == 1) {
                    zj.toast(zj.TextsConfig.TextsConfig_Adviser.pet_battle_success);
                }
                else if (zj.Game.PlayerAdviserSystem.petMap[_this.index].situtation == 0) {
                    zj.toast(zj.TextsConfig.TextsConfig_Adviser.pet_stop_success);
                }
            })
                .catch(function (reason) {
                zj.toast_warning(reason);
            });
        };
        PetMainScene.prototype.onBtnControl1 = function () {
            this.btnControl.scaleX = 1.05;
            this.btnControl.scaleY = 1.05;
        };
        //宠物预览
        PetMainScene.prototype.onBtnControl = function () {
            var _this = this;
            zj.loadUI(zj.PetEvolutioView)
                .then(function (petEvolutioView) {
                petEvolutioView.setInfo(_this.index, _this);
                petEvolutioView.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PetMainScene.prototype.onBtnControlShow1 = function () {
            this.btnControlShow.scaleX = 1.05;
            this.btnControlShow.scaleY = 1.05;
        };
        //宠物进化
        PetMainScene.prototype.onBtnControlShow = function () {
            var _this = this;
            if (zj.Game.PlayerAdviserSystem.petMap[this.index].step == zj.CommonConfig.pet_step_max) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Adviser.max_step);
            }
            else {
                zj.loadUI(zj.PetEvolution)
                    .then(function (PetEvolution) {
                    PetEvolution.setInfo(_this.index, _this);
                    PetEvolution.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        //居中对齐星星 （主界面念兽）
        PetMainScene.GetNodeStarByPet = function (nodeMid, star, maxStar, scale, level, angle) {
            nodeMid.removeChildren();
            var nodeStar = [];
            var path;
            maxStar = maxStar = 0 ? maxStar : zj.CommonConfig.general_max_star;
            star = (maxStar < star) ? maxStar : star;
            var gap = nodeMid.width / (maxStar - 1);
            var centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height);
            var posList = zj.Helper.GetLinePosition(centerPos.x, -centerPos.y, 55, star, angle);
            for (var i = 0; i < star; i++) {
                var flag1 = 5;
                var flag2 = 6;
                if (level > 0 && level < 6) {
                    if (i < level) {
                        path = "ui_hunter_UpStar" + "1" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "0" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 6 && level < 11) {
                    if (i < level - flag1) {
                        path = "ui_hunter_UpStar" + "2" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "1" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 11 && level < 16) {
                    if (i < level - flag1 * 2) {
                        path = "ui_hunter_UpStar" + "3" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "2" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 16 && level < 21) {
                    if (i < level - flag1 * 3) {
                        path = "ui_hunter_UpStar" + "4" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "3" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 21 && level < 26) {
                    if (i < level - flag1 * 4) {
                        path = "ui_hunter_UpStar" + "5" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "4" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 26 && level < 31) {
                    if (i < level - flag1 * 5) {
                        path = "ui_hunter_UpStar" + "6" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "5" + "_" + "2" + "_png";
                    }
                }
                else if (level >= 31 && level <= 35) {
                    if (i < level - flag1 * 6) {
                        path = "ui_hunter_UpStar" + "7" + "_" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_UpStar" + "6" + "_" + "2" + "_png";
                    }
                }
                else {
                    path = "ui_hunter_UpStar" + "0" + "_" + "2" + "_png";
                }
                var img = new eui.Image();
                img.source = zj.cachekey(path, nodeMid);
                img.x = posList[i].x;
                img.y = posList[i].y;
                img.anchorOffsetX = 0.5;
                img.anchorOffsetY = 0.5;
                nodeMid.addChild(img);
                nodeStar.push(img);
            }
            return nodeStar;
        };
        PetMainScene.prototype.getItemList = function () {
            this.itemList = [];
            var info;
            if (this.btnType == 1) {
                info = zj.PlayerAdviserSystem.GetTable();
            }
            else {
                info = zj.PlayerAdviserSystem.SortPet();
            }
            for (var i = 0; i < info.length; i++) {
                var item = this.listAdviser.getElementAt(i);
                this.itemList.push(item);
            }
        };
        PetMainScene.prototype.onEntryTopScene = function () {
            if (this.index == 2 && zj.Game.PlayerAdviserSystem.petInfo != null && zj.Game.PlayerAdviserSystem.petInfo.length != 0) {
                if (zj.Teach.isDone(zj.teachBattle.teachPartID_PETINTRODUCE) == false) {
                    zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_PETINTRODUCE);
                }
            }
        };
        return PetMainScene;
    }(zj.Scene));
    zj.PetMainScene = PetMainScene;
    __reflect(PetMainScene.prototype, "zj.PetMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=PetMainScene.js.map