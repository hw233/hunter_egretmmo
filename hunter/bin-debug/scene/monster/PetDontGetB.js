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
    //PetDontGetB
    //hexiaowei  
    //2019/01/16
    var PetDontGetB = (function (_super) {
        __extends(PetDontGetB, _super);
        function PetDontGetB() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.skinName = "resource/skins/monster/PetDontGetBSkin.exml";
            _this.btnAddFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddFragment, _this);
            _this.imgSkillIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onSkillIcon, _this);
            _this.imgSkillIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onSkillIcon1, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeSkill, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.updateInfo, _this);
            _this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAddPetSoul, _this);
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
            _this.despettalent = new zj.Common_DesPetTalent();
            _this.addChild(_this.despettalent);
            _this.despettalent.visible = false;
            return _this;
        }
        PetDontGetB.prototype.SetInfo = function (index, father, btnType) {
            this.index = index;
            this.father = father;
            this.btnType = btnType;
            this.setConsumeInfo();
        };
        PetDontGetB.prototype.updateInfo = function () {
            if (this.btnType == 2) {
                this.setConsumeInfo();
            }
        };
        PetDontGetB.prototype.setConsumeInfo = function () {
            var petInfo = zj.PlayerAdviserSystem.PetBase(this.index);
            var itemId = petInfo.compose_goods;
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = petInfo.compose_count;
            var itemSet = zj.PlayerItemSystem.Set(itemId);
            if (cur > des && zj.PlayerAdviserSystem.GetPet(this.index) == false) {
                this.imgSpriteTipAdd.visible = true;
                this.labelNeedFragment.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
                this.btnAddPetSoul.visible = false;
            }
            else {
                this.imgSpriteTipAdd.visible = false;
                this.labelNeedFragment.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
                this.btnAddPetSoul.visible = true;
            }
            this.imgSpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.pieceFrame[petInfo.quality + 1], this);
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(this.index).frame_path, this);
            this.imgSpriteIcon.mask = this.imgMask;
            var _a = zj.PlayerAdviserSystem.AttriAdd(this.index, 1), attri1 = _a[0], title1 = _a[1];
            var _b = zj.PlayerAdviserSystem.AttriAdd(this.index, zj.CommonConfig.pet_star_max), attri2 = _b[0], title2 = _b[1];
            this.labelCurrentAtt1.textFlow = zj.Util.RichText(zj.Helper.StringFormat((zj.TextsConfig.TextsConfig_Adviser.pet_start + zj.TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1]), attri1));
            this.labelPetSkillName.textFlow = zj.Util.RichText(zj.Helper.StringFormat((zj.TextsConfig.TextsConfig_Adviser.pet_Max + zj.TextsConfig.TextsConfig_Adviser.pet_attri_dont[title2]), attri2));
            this.imgSkillIcon.source = zj.cachekey(petInfo.skill_Icon[1], this);
            this.imgSkillIcon1.source = zj.cachekey(petInfo.skill_Icon[2], this);
        };
        //宠物天赋
        PetDontGetB.prototype.onSkillIcon = function () {
            this.father.onGroupSkill1();
        };
        PetDontGetB.prototype.onSkillIcon1 = function () {
            this.father.onGroupSkill2();
        };
        PetDontGetB.prototype.removeSkill = function () {
            this.father.onGroupSkill();
        };
        //跳转 “获取途径 ” 界面
        PetDontGetB.prototype.onBtnAddPetSoul = function () {
            var _this = this;
            var star = zj.Game.PlayerAdviserSystem.petMap[this.index].star;
            var itemId = zj.PlayerAdviserSystem.PetBase(this.index).up_goods[star][0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //召唤
        PetDontGetB.prototype.onBtnAddFragment = function () {
            var _this = this;
            var itemId = zj.PlayerAdviserSystem.PetBase(this.index).compose_goods;
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = zj.PlayerAdviserSystem.PetBase(this.index).compose_count;
            if (cur >= des && zj.PlayerAdviserSystem.GetPet(this.index) == false) {
                zj.PlayerAdviserSystem.PetGet_Req(this.index)
                    .then(function (data) {
                    zj.loadUI(zj.PetPop)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.SetInfoPet(_this.index);
                    });
                    //列表下拉位置
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
                    if (_this.father.petMainKeelAnimation.parent) {
                        _this.father.groupAdviser.removeChild(_this.father.petMainKeelAnimation);
                    }
                    _this.father.inIt(_this.father.btnType);
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Adviser.goods);
            }
        };
        return PetDontGetB;
    }(zj.UI));
    zj.PetDontGetB = PetDontGetB;
    __reflect(PetDontGetB.prototype, "zj.PetDontGetB");
})(zj || (zj = {}));
//# sourceMappingURL=PetDontGetB.js.map