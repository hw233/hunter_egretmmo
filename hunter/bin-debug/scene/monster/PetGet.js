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
    //  念兽  PetGet
    //  wangshenzhuo
    //  2019/1/12
    var PetGet = (function (_super) {
        __extends(PetGet, _super);
        function PetGet() {
            var _this = _super.call(this) || this;
            _this.BASE_ID = 10000;
            _this.level_next = 0;
            _this.skill_level = 0;
            _this.skill_level_next = 0;
            _this.rewardCount = 0;
            _this.skinName = "resource/skins/monster/PetGetSkin.exml";
            _this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddPetSoul, _this);
            _this.btnStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStrength, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.updateInfo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.7;
            _this.imgMask.scaleY = 0.7;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = true;
            return _this;
        }
        PetGet.prototype.SetInfo = function (index, father, type) {
            this.index = index;
            this.father = father;
            this.types = type;
            //念兽升星
            if (type == 1) {
                if (this.index >= 11 && this.index != 13) {
                    this.btnGetAward.visible = true;
                    this.SetAttriInfo();
                    this.SetConsumeInfo();
                }
                else {
                    this.SetAttriInfo();
                    this.SetSkillInfo();
                    this.SetConsumeInfo();
                }
            }
            else {
                this.setPetConsumeInfo();
            }
            this.btnGetAward.visible = false;
            this.imgSpriteGetAward.visible = false;
            this.labelPetSkillName.visible = false;
        };
        PetGet.prototype.updateInfo = function () {
            //念兽升星
            if (this.types == 1) {
                this.SetConsumeInfo();
            }
            else {
                //宠物升星
                this.setPetConsumeInfo();
            }
        };
        // 念兽基础技--nianshou
        PetGet.prototype.SetAttriInfo = function () {
            var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
            if (zj.PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
                this.level_next = level;
                this.labelCurrentAtt3.visible = false;
            }
            else {
                this.level_next = level + 1;
                this.labelCurrentAtt3.visible = true;
            }
            var base_skill = zj.PlayerAdviserSystem.Instance(this.index).base_skill;
            var str_talent = zj.PlayerTalentSystem.Des(base_skill[0], level);
            var str_talent_next = zj.PlayerTalentSystem.DesNext(base_skill[0], level + 1);
            //当前基础技
            this.labelCurrentAtt1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.base_attri, str_talent));
            //下一技能
            this.labelCurrentAtt3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.base_attri, str_talent_next));
            var max = zj.PlayerAdviserSystem.AdviserLvdbMinLevel(this.index);
            var skill = zj.PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.index + level, this.index);
            this.labelPetStrengthLevel.visible = false;
            if (level >= max) {
                this.labelPetSkillNextAward.visible = false;
            }
            else {
                if (skill - level == 1) {
                    this.labelPetSkillNextAward.visible = true;
                    this.labelPetSkillNextAward.text = zj.TextsConfig.TextsConfig_Adviser.add_star_next;
                }
                else {
                    this.labelPetSkillNextAward.visible = false;
                }
            }
            var money_Des = zj.PlayerAdviserSystem.AdviserlvdbInstance(adviserId * 10000 + level).adviser_money;
            this.labelStrength.text = money_Des.toString();
        };
        //念兽 念力技
        PetGet.prototype.SetSkillInfo = function () {
            if (this.index < 10 || this.index == 13) {
                var skill_id = zj.PlayerAdviserSystem.Instance(this.index).skill_id;
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
                var max = zj.PlayerAdviserSystem.AdviserLvdbMinLevel(this.index);
                var skill = zj.PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.index + level, this.index);
                if (level == 1) {
                    this.skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                    this.skill_level_next = 0;
                }
                else {
                    this.skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                    this.skill_level_next = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level - 1).skill_level;
                }
                var base_skill = zj.PlayerAdviserSystem.Instance(this.index).base_skill;
                var str_talent_next = zj.PlayerTalentSystem.DesNext(base_skill[0], level + 1);
                var str_talent = zj.PlayerTalentSystem.Des(skill_id[0], this.skill_level);
                if (zj.PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
                    str_talent_next = null;
                    this.labelPetSkillNextAward.visible = false;
                }
                else {
                    str_talent_next = zj.PlayerTalentSystem.DesNext(skill_id[0], this.skill_level + 1);
                }
                //下一级念力技
                if (level < 26) {
                    if (skill - level != 1) {
                        this.labelCurrentAtt4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
                    }
                    else {
                        this.labelCurrentAtt4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent_next));
                    }
                }
                else {
                    if (level == 29) {
                        this.labelCurrentAtt4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent_next));
                    }
                    else {
                        this.labelCurrentAtt4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
                    }
                }
                this.labelCurrentAtt2.visible = true;
                //当前念力技
                this.labelCurrentAtt2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
            }
            else if (this.index == 10) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                this.labelPetSkillName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[1], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerLimit, zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerRatio);
            }
            else if (this.index == 11) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                this.labelPetSkillName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[2], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).wanted_money_addradio * 100 + "%", this.rewardCount);
                if (this.rewardCount != 0) {
                    //红点状态为显示
                }
            }
            else if (this.index == 12) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                this.labelPetSkillName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[3], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).challenge_gain_token[0] + "%", this.rewardCount);
                if (this.rewardCount != 0) {
                    //红点状态为显示
                }
            }
        };
        //念兽升星所需
        PetGet.prototype.SetConsumeInfo = function () {
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
            var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            //碎片
            var itemId = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
            var Cur = zj.PlayerItemSystem.Count(itemId);
            var Des = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).consume_count;
            //铜qian
            var money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var money_Des = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).adviser_money;
            var dat_tbl = zj.PlayerAdviserSystem.Instance(this.index);
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            this.imgSpriteBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.pieceFrame[zj.PlayerAdviserSystem.Instance(this.index).quality + 1], this);
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerAdviserSystem.Instance(this.index).head_path, this);
            this.imgSpriteIcon.mask = this.imgMask;
            if (Cur >= Des) {
                this.labelNeedFragement.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragment, Cur, Des));
                this.btnAddPetSoul.visible = false;
            }
            else {
                this.labelNeedFragement.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragments, Cur, Des));
                this.btnAddPetSoul.visible = true;
            }
            if (Cur >= Des && zj.PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level) == false && money >= money_Des) {
                this.imgSpriteTipStrength.visible = true;
            }
            else {
                this.imgSpriteTipStrength.visible = false;
            }
            if (zj.PlayerAdviserSystem.AdviserlvdbIsMax(this.index, level) == true) {
                this.groupPetUpLevel.visible = false;
                this.imgSpritePetLevelMax.visible = true;
                this.labelPetSkillNextAward.visible = false;
                this.labelCurrentAtt4.visible = false;
                this.imgSpritePetStarMax.visible = true;
            }
            else {
                this.groupPetUpLevel.visible = true;
                this.imgSpritePetLevelMax.visible = false;
                this.imgSpritePetStarMax.visible = false;
                this.labelCurrentAtt4.visible = true;
            }
        };
        //获取途径
        PetGet.prototype.ButtonAddPetSoul = function () {
            var itemId = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
        };
        PetGet.prototype.SetUpLevel = function () {
            var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
            if (level == 1) {
                this.skill_level_next = 0;
            }
            else {
                this.skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                this.skill_level_next = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level - 1).skill_level;
            }
            if (this.skill_level - 1 == this.skill_level_next) {
                // self.NodeAddAni:addChild(resdb.AniReminder( 5,UIConfig_Hunter.common_hint[5] ))
            }
        };
        // 念兽升星
        PetGet.prototype.onBtnStrength = function () {
            if (this.types == 1) {
                var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level;
                if (zj.PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
                    zj.toast(zj.TextsConfig.TextsConfig_Adviser.strengthMax);
                }
                else {
                    this.AdviserUpLevel_Visit();
                }
            }
            else {
                this.PetUpStar_Req();
            }
            this.father.CoinMoney();
        };
        PetGet.prototype.AdviserUpLevel_Visit = function () {
            var _this = this;
            //let data_net = Game.PlayerAdviserSystem.advisersMap[this.index];
            zj.PlayerAdviserSystem.AdviserUpLevel_Req(this.index)
                .then(function (data) {
                zj.loadUI(zj.PetUpStar)
                    .then(function (dialog) {
                    dialog.SetInfo(_this.index, _this, 1);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                _this.SetAttriInfo();
                _this.SetSkillInfo();
                _this.SetConsumeInfo();
                var adviserInfo = zj.PlayerAdviserSystem.GetTable();
                var adviserkey;
                for (var k in adviserInfo) {
                    var v = adviserInfo[k];
                    var adviserId = v.adviserId != undefined ? v.adviserId : v.adviser_id;
                    if (adviserId == _this.index) {
                        adviserkey = Number(k);
                    }
                }
                var location = zj.Helper.getObjLen(adviserInfo) * 110 - 470;
                if (adviserkey * 110 > location) {
                    _this.father.moveLocation = location;
                }
                else {
                    _this.father.moveLocation = adviserkey * 110;
                }
                _this.father.groupAdviser.removeChild(_this.father.petMainKeelAnimation);
                _this.father.inIt(_this.father.btnType);
            }).catch(function (reason) { });
        };
        PetGet.prototype.setPetConsumeInfo = function () {
            this.labelCurrentAtt2.visible = false;
            this.labelCurrentAtt4.visible = false;
            var star = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            var _a = zj.PlayerAdviserSystem.AttriAdd(this.index, star), attri1 = _a[0], title1 = _a[1];
            this.labelCurrentAtt1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1], attri1));
            if (star == zj.CommonConfig.pet_star_max) {
                this.labelCurrentAtt3.visible = false;
                this.imgSpritePetLevelMax.visible = true;
                this.groupPetUpLevel.visible = false;
                this.imgSpritePetStarMax.visible = true;
            }
            else {
                this.labelCurrentAtt3.visible = true;
                this.imgSpritePetLevelMax.visible = false;
                this.groupPetUpLevel.visible = true;
                this.imgSpritePetStarMax.visible = false;
                var _b = zj.PlayerAdviserSystem.AttriAdd(this.index, star + 1), attri2 = _b[0], title2 = _b[1];
                this.labelCurrentAtt3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_attri_Get[title2], attri2));
            }
            var petInfo = zj.PlayerAdviserSystem.PetBase(this.index);
            var pet_id = petInfo.pet_id;
            var itemId = petInfo.up_goods[star - 1][0];
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = petInfo.up_count[star - 1][0];
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            var money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var money_Des = petInfo.up_money[star - 1];
            this.labelStrength.text = money_Des.toString();
            this.imgSpriteBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.pieceFrame[petInfo.quality + 1], this);
            this.imgSpriteIcon.source = zj.cachekey(petInfo.frame_path, this);
            this.imgSpriteIcon.mask = this.imgMask;
            if (cur >= des) {
                this.labelNeedFragement.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
                this.btnAddPetSoul.visible = false;
            }
            else {
                this.labelNeedFragement.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragments, cur, des));
                this.btnAddPetSoul.visible = true;
            }
            var starMax = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            if (cur >= des && starMax != zj.CommonConfig.pet_star_max && money >= money_Des) {
                this.imgSpriteTipStrength.visible = true;
            }
            else {
                this.imgSpriteTipStrength.visible = false;
            }
        };
        PetGet.prototype.onBtnAddPetSoul = function () {
            var _this = this;
            var itemId;
            if (this.types == 1) {
                var Id = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
                itemId = Id;
            }
            else {
                var Id = zj.PlayerAdviserSystem.PetBase(this.index).compose_goods;
                itemId = Id;
            }
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //宠物升星
        PetGet.prototype.PetUpStar_Req = function () {
            var _this = this;
            zj.PlayerAdviserSystem.PetUpStar_Visit(this.index)
                .then(function (data) {
                zj.loadUI(zj.PetUpStar)
                    .then(function (dialog) {
                    dialog.SetInfo(_this.index, _this, 2);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                _this.setPetConsumeInfo();
                var petInfo = zj.PlayerAdviserSystem.SortPet();
                var petkey;
                for (var k in petInfo) {
                    var v = petInfo[k];
                    if (v.pet_id == _this.index) {
                        petkey = Number(k);
                    }
                }
                var location = zj.Helper.getObjLen(petInfo) * 110 - 470;
                if (petkey * 110 > location) {
                    _this.father.moveLocation = location;
                }
                else {
                    _this.father.moveLocation = petkey * 110;
                }
                _this.father.groupAdviser.removeChild(_this.father.petMainKeelAnimation);
                _this.father.inIt(_this.father.btnType);
            })
                .catch(function (reason) {
                zj.toast_warning(reason);
            });
        };
        return PetGet;
    }(zj.UI));
    zj.PetGet = PetGet;
    __reflect(PetGet.prototype, "zj.PetGet");
})(zj || (zj = {}));
//# sourceMappingURL=PetGet.js.map