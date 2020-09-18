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
    //PetEvolution
    //wangshenzhuo
    //2019/01/19
    var PetEvolution = (function (_super) {
        __extends(PetEvolution, _super);
        function PetEvolution() {
            var _this = _super.call(this) || this;
            _this.max_step = zj.CommonConfig.pet_step_max;
            _this.skinName = "resource/skins/monster/PetEvolutionSkin.exml";
            _this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            _this.btnEvolution.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEvolution, _this);
            _this.btnSpriteAddCost1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddCost1, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        //龙骨动画宠物
        PetEvolution.prototype.addAnimatoinPet = function (groupAdviser, scale, dbName, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
                .then(function (display) {
                display.x = groupAdviser.width / 2;
                display.y = groupAdviser.height / 1.2;
                display.scaleX = scale;
                display.scaleY = scale;
                groupAdviser.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        PetEvolution.prototype.setInfo = function (index, father) {
            this.index = index;
            this.father = father;
            this.SetInfoSkill();
            this.showAnimatitinPet();
        };
        //显示宠物进化龙骨
        PetEvolution.prototype.showAnimatitinPet = function () {
            var petInfo = zj.PlayerAdviserSystem.PetBase(this.index);
            var spine1 = petInfo.spine_id[0];
            var aniSpine1 = zj.TableClientAniSpineSource.Item(spine1);
            this.addAnimatoinPet(this.groupNodePet1, 0.7, aniSpine1.json);
            var spine2 = petInfo.spine_id[1];
            var aniSpine2 = zj.TableClientAniSpineSource.Item(spine2);
            this.addAnimatoinPet(this.groupNodePet2, 0.8, aniSpine2.json);
            var spine3 = petInfo.spine_id[2];
            var aniSpine3 = zj.TableClientAniSpineSource.Item(spine3);
            this.addAnimatoinPet(this.groupNodePet3, 0.7, aniSpine3.json);
            this.lableUnLock1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[0]));
            this.lableUnLock2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[1]));
            this.lableUnLock3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[2]));
        };
        PetEvolution.prototype.SetInfoSkill = function () {
            var evolution = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
                evolution = 1;
            }
            else if (zj.Game.PlayerAdviserSystem.petMap[this.index].step >= zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
                && zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
                evolution = 2;
            }
            else {
                evolution = 3;
            }
            if (evolution == 1) {
                this.lableUnLock1.visible = false;
                this.imgSpriteNow1.visible = true;
                this.lableUnLock2.visible = true;
                this.imgSpriteNow2.visible = false;
                this.lableUnLock3.visible = true;
                this.imgSpriteNow3.visible = false;
            }
            else if (evolution == 2) {
                this.lableUnLock1.visible = false;
                this.imgSpriteNow1.visible = false;
                this.lableUnLock2.visible = false;
                this.imgSpriteNow2.visible = true;
                this.lableUnLock3.visible = true;
                this.imgSpriteNow3.visible = false;
            }
            else {
                this.lableUnLock1.visible = false;
                this.imgSpriteNow1.visible = false;
                this.lableUnLock2.visible = false;
                this.imgSpriteNow2.visible = false;
                this.lableUnLock3.visible = false;
                this.imgSpriteNow3.visible = true;
            }
            //进阶消耗
            var step = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.index].step >= zj.CommonConfig.pet_step_max) {
                step = zj.Game.PlayerAdviserSystem.petMap[this.index].step - 1;
            }
            else {
                step = zj.Game.PlayerAdviserSystem.petMap[this.index].step;
            }
            this.labelEvolutionNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_lock_stpe, step + 1);
            this.imgSpriteIconCost1.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(this.index).skill_Icon[1], this);
            this.labelNum.visible = false;
            var talentId = zj.PlayerAdviserSystem.PetBase(this.index).skill_normal[step + 1];
            var skillId = zj.PlayerAdviserSystem.PetBase(this.index).skill_island[step + 1];
            this.labelTalent.textFlow = zj.Util.RichText(zj.PlayerTalentSystem.Des(talentId, 0));
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
            this.labelTalent2.textFlow = zj.Util.RichText(des);
            var goods = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume[step];
            var count = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume_good[step];
            var itemSet1 = zj.PlayerItemSystem.ItemPath(goods[0]);
            var Cur1 = zj.PlayerItemSystem.Count(goods[0]);
            var str_count1 = zj.Helper.StringFormat("%d/%d", Cur1, count[0]);
            this.imgSpriteIconCost1.source = zj.cachekey(itemSet1, this);
            this.labelNumCost1.text = str_count1;
            this.labelNum.text = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume_money[step].toString();
            var star = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            var step1 = zj.Game.PlayerAdviserSystem.petMap[this.index].step;
            var curStar = 0;
            if (step1 < zj.CommonConfig.pet_step_max) {
                curStar = zj.PlayerAdviserSystem.PetBase(this.index).evo_star_req[step1];
            }
            else {
                curStar = zj.CommonConfig.pet_step_max;
            }
            var level = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            PetEvolution.GetNodeStarByAlignmentsPet(this.groupNodePetStar, 5, 5, 0.8, level, null);
            if (star < curStar) {
                this.btnEvolution.visible = false;
                this.labelNum.visible = false;
                this.groupLock.visible = true;
            }
            else {
                this.btnEvolution.visible = true;
                this.labelNum.visible = true;
                this.groupLock.visible = false;
            }
        };
        PetEvolution.prototype.onBtnclose = function () {
            if (this.father.petMainKeelAnimation.parent) {
                this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
            }
            this.father.inIt(this.father.btnType);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        PetEvolution.prototype.onBtnEvolution = function () {
            this.PetEvolution_Visit();
        };
        PetEvolution.prototype.onBtnAddCost1 = function () {
            var _this = this;
            var itemId = zj.PlayerAdviserSystem.PetBase(this.index).evo_consume[zj.Game.PlayerAdviserSystem.petMap[this.index].step][0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PetEvolution.prototype.PetEvolution_Visit = function () {
            var _this = this;
            var data_net = zj.Game.PlayerAdviserSystem.petMap[this.index];
            zj.PlayerAdviserSystem.PetEvolution_Req(data_net.pet_id).then(function (data) {
                if (zj.Game.PlayerAdviserSystem.petMap[_this.index].step == _this.max_step) {
                    _this.onBtnclose();
                    zj.loadUI(zj.PetUpStar)
                        .then(function (dialog) {
                        dialog.SetInfo(_this.index, _this, 3);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    _this.SetInfoSkill();
                    if (_this.father.petMainKeelAnimation.parent) {
                        _this.father.groupAdviser.removeChild(_this.father.petMainKeelAnimation);
                    }
                    _this.father.inIt(_this.father.btnType);
                }
                else {
                    zj.loadUI(zj.PetUpStar)
                        .then(function (dialog) {
                        dialog.SetInfo(_this.index, _this, 3);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    _this.SetInfoSkill();
                }
            });
        };
        //居中对齐星星(宠物进化页面)
        PetEvolution.GetNodeStarByAlignmentsPet = function (nodeMid, star, maxStar, scale, level, angle) {
            var nodeStar = [];
            var path;
            maxStar = maxStar != 0 ? maxStar : zj.CommonConfig.general_max_star;
            star = (maxStar < star) ? maxStar : star;
            var gap = nodeMid.width / (maxStar - 1);
            var centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height / 2);
            var posList = zj.Helper.GetLinePosition(centerPos.x, -centerPos.y, gap, star, angle);
            level = level + 1;
            for (var i = 0; i < star; i++) {
                if (level > 0 && level < 6) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
                }
                else if (level >= 6 && level < 11) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
                }
                else if (level >= 11 && level < 16) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
                }
                else if (level >= 16 && level < 21) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
                }
                else if (level >= 21 && level < 26) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
                }
                else if (level >= 26 && level < 30) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
                }
                else if (level >= 30 && level <= 35) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "7" + "_png";
                }
                var img = new eui.Image();
                img.source = zj.cachekey(path, nodeMid);
                img.x = posList[i].x + i * 5;
                img.verticalCenter = 0;
                //img.y = posList[i].y; 
                img.anchorOffsetX = 0.5;
                img.anchorOffsetY = 0.5;
                img.scaleX = scale;
                img.scaleY = scale;
                nodeMid.addChild(img);
                nodeStar.push(img);
            }
            return nodeStar;
        };
        return PetEvolution;
    }(zj.Dialog));
    zj.PetEvolution = PetEvolution;
    __reflect(PetEvolution.prototype, "zj.PetEvolution");
})(zj || (zj = {}));
//# sourceMappingURL=PetEvolution.js.map