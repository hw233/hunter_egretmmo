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
    // PetUpStar
    // hexiaowei
    // 2019/1/12
    var PetUpStar = (function (_super) {
        __extends(PetUpStar, _super);
        function PetUpStar() {
            var _this = _super.call(this) || this;
            _this.BASE_ID = 10000;
            _this.pop_time = 0;
            _this.id = 0;
            _this.skinName = "resource/skins/monster/PetUpStarSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            //this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            _this.pop_time = 0;
            _this.groupProperty.visible = false;
            _this.groupEvolve.visible = false;
            return _this;
        }
        PetUpStar.prototype.SetInfo = function (id, father, types) {
            this.id = id;
            this.father = father;
            this.ani_end = false;
            if (types == 1) {
                //念兽升星
                this.SetInfoHero();
            }
            else if (types == 2) {
                //宠物升星
                this.setInfoPet();
            }
            else {
                //宠物进化
                this.setInfoPetEvolution();
            }
            //  this.SetInfoAni();
        };
        //念兽升星
        PetUpStar.prototype.SetInfoHero = function () {
            var _this = this;
            this.addAnimatoin("ui_zhizhao_shengxing", 1);
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.id].level;
            var skill_id = zj.PlayerAdviserSystem.Instance(this.id).skill_id;
            var skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.id * this.BASE_ID + level).skill_level;
            var base_skill = zj.PlayerAdviserSystem.Instance(this.id).base_skill;
            var max = zj.PlayerAdviserSystem.AdviserLvdbMinLevel(this.id);
            var skill = zj.PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.id + level, this.id);
            //基础技
            var str_talent1 = zj.PlayerTalentSystem.Des(base_skill[0], level);
            //念力技
            var str_talent2 = zj.PlayerTalentSystem.Des(skill_id[0], skill_level);
            this.labelAttName1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.attri_star[1], str_talent1));
            this.labelAttCurrency1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.attri_star[2], str_talent2));
            this.imgSpriteHunter.source = zj.cachekey(zj.PlayerAdviserSystem.Instance(this.id).name_down_path, this);
            this.imgSpriteHunterType.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.Grade[zj.PlayerAdviserSystem.Instance(this.id).quality + 10], this);
            if (level < 26 && skill - level == 5) {
                this.labelTip.text = zj.TextsConfig.TextsConfig_Adviser.add_star_next;
            }
            else {
                this.labelTip.visible = false;
            }
            zj.PetMainScene.GetNodeStarByPet(this.groupNodeStar, 5, 5, 1, level, 0);
            zj.PetMainScene.GetNodeStarByPet(this.groupNodeStar2, 5, 5, 1, level - 1, 0);
            var id = zj.PlayerAdviserSystem.Instance(this.id).spine_id;
            var aniSpine = zj.TableClientAniSpineSource.Item(id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine.json, null)
                .then(function (display) {
                display.x = _this.groupHunter.width / 2;
                display.y = _this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                zj.setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                _this.groupHunter.addChild(display);
                display.animation.play(null, 0);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        PetUpStar.prototype.addAnimatoin = function (dbName, type, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            var displays = [this.groupHunter, this.groupHunterName, this.groupBackground, this.groupNodeStar];
            var solts = ["002_juese", "003_mingzi", "000_juexing_bg", "002_xingxing01"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_zhizhao_shengxing", null, displays, solts)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this.groupProperty.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                    if (armatureDisplay.parent) {
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, _this);
                var c = zj.UIManager.StageWidth;
                var d = zj.UIManager.StageHeight;
                var e = 0;
                if (d > 640) {
                    e = (d - 30) / 640;
                }
                else {
                    e = 1;
                }
                armatureDisplay.animation.play("000_nianshou_shengxing", 1);
                _this.groupUpStar.x = c * 0.48;
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                _this.groupWhole.addChild(armatureDisplay);
                var slotuser = armatureDisplay.armature.getBone("002_juese");
                //slotuser.offset.x -= 20;
                var slot = armatureDisplay.armature.getBone("003_mingzi");
                slot.offset.scaleX = 0.8 * e;
                slot.offset.scaleY = 0.8 * e;
                var slotxing = armatureDisplay.armature.getBone("002_xingxing01");
                slotxing.offset.scaleX = 0.6 * e;
                slotxing.offset.scaleY = 0.6 * e;
                slotxing.offset.y += 80;
                slotxing.offset.x -= 20;
            });
        };
        //宠物升星
        PetUpStar.prototype.setInfoPet = function () {
            var _this = this;
            var petmap = zj.Game.PlayerAdviserSystem.petMap[this.id];
            var level = petmap.star;
            this.imgSpriteHunter.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(this.id).name_down_path, this);
            this.labelTip.visible = false;
            if (petmap.star % 5 == 0) {
                this.labelLock.visible = true;
                this.labelLock.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.unlock_root, petmap.star / 5));
            }
            else {
                this.labelLock.visible = false;
            }
            var step = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.id].step < zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[1]) {
                step = 0;
            }
            else if (zj.Game.PlayerAdviserSystem.petMap[this.id].step >= zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[1]
                && zj.Game.PlayerAdviserSystem.petMap[this.id].step < zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[2]) {
                step = 1;
            }
            else {
                step = 2;
            }
            var _a = zj.PlayerAdviserSystem.AttriAdd(this.id, level), attri1 = _a[0], title1 = _a[1];
            this.labelAttName1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1], attri1));
            this.labelAttCurrency1.visible = false;
            zj.PetMainScene.GetNodeStarByPet(this.groupNodeStar, 5, 5, 1, level, 0);
            zj.PetMainScene.GetNodeStarByPet(this.groupNodeStar2, 5, 5, 1, level - 1, 0);
            var id = zj.PlayerAdviserSystem.PetBase(this.id).spine_id[step];
            var aniSpine = zj.TableClientAniSpineSource.Item(id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine.json, null)
                .then(function (display) {
                display.x = _this.groupHunter.width / 2;
                display.y = _this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                zj.setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                _this.groupHunter.addChild(display);
                display.animation.play(null, 0);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            this.addAnimatoinPet("ui_chongwu_juexing_eff", 1);
        };
        PetUpStar.prototype.addAnimatoinPet = function (dbName, type, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            var displays = [this.groupHunter, this.groupNodeStar];
            var solts = ["002_juese", "002_xingxing01"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_chongwu_juexing_eff", null, displays, solts)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this.groupProperty.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                    if (armatureDisplay.parent) {
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, _this);
                var c = zj.UIManager.StageWidth;
                var d = zj.UIManager.StageHeight;
                var e = 0;
                if (d > 640) {
                    e = (d - 30) / 640;
                }
                else {
                    e = 1;
                }
                _this.groupUpStar.x = c * 0.48;
                armatureDisplay.animation.play("000_shengxing", 1);
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                _this.groupWhole.addChild(armatureDisplay);
                var slotjuese = armatureDisplay.armature.getBone("002_juese");
                slotjuese.offset.y -= 35;
                var slotxing = armatureDisplay.armature.getBone("002_xingxing01");
                slotxing.offset.scaleX = 0.6 * e;
                slotxing.offset.scaleY = 0.6 * e;
            });
        };
        // 宠物进化
        PetUpStar.prototype.setInfoPetEvolution = function () {
            var _this = this;
            var talentId = zj.PlayerAdviserSystem.PetBase(this.id).skill_normal[zj.Game.PlayerAdviserSystem.petMap[this.id].step];
            this.labelTalent1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.PlayerTalentSystem.Des(talentId, 1)));
            var skillId = zj.PlayerAdviserSystem.PetBase(this.id).skill_island[zj.Game.PlayerAdviserSystem.petMap[this.id].step];
            var attri = null;
            var str = null;
            var des = null;
            if (zj.TablePetSkill.Item(skillId).type != 1) {
                if (zj.TablePetSkill.Item(skillId).type == 2) {
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(skillId).type], zj.TablePetSkill.Item(skillId).rand[0]);
                }
                else {
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(skillId).type], zj.TablePetSkill.Item(skillId).value);
                }
            }
            else {
                attri = zj.TablePetSkill.Item(skillId).attri_add;
                str = zj.TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
                des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.darkland, str, attri[1]);
            }
            this.labelTalent2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(des));
            var step = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.id].step < zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[1]) {
                step = 0;
            }
            else if (zj.Game.PlayerAdviserSystem.petMap[this.id].step >= zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[1]
                && zj.Game.PlayerAdviserSystem.petMap[this.id].step < zj.PlayerAdviserSystem.PetBase(this.id).unlock_step[2]) {
                step = 1;
            }
            else {
                step = 2;
            }
            var id = zj.PlayerAdviserSystem.PetBase(this.id).spine_id[step];
            var aniSpine = zj.TableClientAniSpineSource.Item(id).json;
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine, null)
                .then(function (display) {
                display.x = _this.groupHunter.width / 2;
                display.y = _this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                zj.setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                _this.groupHunter.addChild(display);
                display.animation.play(null, 0);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            this.addAnimatoinPetEvolution("ui_chongwu_juexing_eff", 1, step);
        };
        PetUpStar.prototype.addAnimatoinPetEvolution = function (dbName, type, step, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            var stepnew;
            if (step == 0) {
                stepnew = "step1";
            }
            else if (step == 1) {
                stepnew = "step2";
            }
            else {
                stepnew = "step3";
            }
            var imgsource = zj.UIConfig.UIConfig_Adviser.pet_unlock_step[stepnew];
            this.imgPetType.source = zj.cachekey(imgsource, this);
            var image1 = new eui.Image(imgsource);
            image1.anchorOffsetX = 50;
            image1.anchorOffsetY = 14;
            var displays = [this.groupHunter, image1];
            var solts = ["002_juese", "002_xingxing01"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_chongwu_juexing_eff", null, displays, solts)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this.groupEvolve.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                    if (armatureDisplay.parent) {
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, _this);
                var c = zj.UIManager.StageWidth;
                var d = zj.UIManager.StageHeight;
                _this.groupUpStar.x = c * 0.48;
                var e = 0;
                if (d > 640) {
                    e = (d - 30) / 640;
                }
                else {
                    e = 1;
                }
                armatureDisplay.animation.play("000_shengxing", 1);
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                _this.groupWhole.addChild(armatureDisplay);
                var slotimg = armatureDisplay.armature.getBone("002_juese");
                slotimg.offset.y -= 35;
            });
        };
        PetUpStar.prototype.onBtnClose = function () {
            this.close();
            if (this.petMainKeelAnimation) {
                this.petMainKeelAnimation.animation.stop();
                this.petMainKeelAnimation.animation.reset();
                this.petMainKeelAnimation.armature.dispose();
                this.petMainKeelAnimation.dbClear();
                this.petMainKeelAnimation.dispose(true);
                this.petMainKeelAnimation.parent.removeChild(this.petMainKeelAnimation);
            }
        };
        return PetUpStar;
    }(zj.Dialog));
    zj.PetUpStar = PetUpStar;
    __reflect(PetUpStar.prototype, "zj.PetUpStar");
})(zj || (zj = {}));
//# sourceMappingURL=PetUpStar.js.map