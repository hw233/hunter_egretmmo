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
    //  念兽  PetDontGet
    //  wangshenzhuo
    //  2019/1/11
    var PetDontGet = (function (_super) {
        __extends(PetDontGet, _super);
        function PetDontGet() {
            var _this = _super.call(this) || this;
            _this.BASE_ID = 10000;
            _this.skinName = "resource/skins/monster/PetDontGetSkin.exml";
            _this.btnAddFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddFragment, _this);
            _this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddPetSoul, _this);
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
        PetDontGet.prototype.SetInfo = function (index, father, btnType) {
            this.btnType = btnType;
            this.index = index;
            this.father = father;
            this.SetAttriInfo();
            this.SetSkillInfo();
            this.SetConsumeInfo();
        };
        PetDontGet.prototype.updateInfo = function () {
            if (this.btnType == 1) {
                this.SetConsumeInfo();
            }
        };
        //基础技
        PetDontGet.prototype.SetAttriInfo = function () {
            var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            var level_next = level + 1;
            // let skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
            var base_skill = zj.PlayerAdviserSystem.Instance(this.index).base_skill;
            var str_talent = zj.PlayerTalentSystem.Des(base_skill[0], level);
            //基础技
            this.labelCurrentAtt1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.base_attri, str_talent));
            this.labelNextAtt1.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Adviser.des1);
        };
        //念力技
        PetDontGet.prototype.SetSkillInfo = function () {
            if (this.index < 10 || this.index == 13) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
                var skill_id = zj.PlayerAdviserSystem.Instance(this.index).skill_id;
                var skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                var str_talent = zj.PlayerTalentSystem.Des(skill_id[0], skill_level);
                this.labelPetSkillName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
                this.labelPetSkillCurrentAward.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Adviser.des2);
            }
            else if (this.index == 10) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
                this.labelPetSkillName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[1], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerLimit, zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerRatio));
            }
            else if (this.index == 11) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
                this.labelPetSkillName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[5], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).wanted_money_addradio * 100 + "%", zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[1], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[3]));
            }
            else if (this.index == 12) {
                var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
                this.labelPetSkillName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.adviser_attri[6], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).challenge_gain_token[1] + "%", zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[1], zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[3]));
            }
        };
        //召唤所需
        PetDontGet.prototype.SetConsumeInfo = function () {
            var PetName = zj.PlayerAdviserSystem.Instance(this.index).adviser_name;
            var itemId = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
            var Cur = zj.PlayerItemSystem.Count(itemId);
            var Des = zj.PlayerAdviserSystem.Instance(this.index).compose_count;
            var dat_tbl = zj.PlayerAdviserSystem.Instance(this.index);
            if (Cur >= Des && zj.PlayerAdviserSystem.Have(this.index) == false) {
                this.imgSpriteTipAdd.visible = true;
                this.labelNeedFragment.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragment, Cur, Des));
                this.btnAddPetSoul.visible = false;
            }
            else {
                this.imgSpriteTipAdd.visible = false;
                this.labelNeedFragment.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.needFragments, Cur, Des));
                this.btnAddPetSoul.visible = true;
            }
            this.imgSpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.pieceFrame[zj.PlayerAdviserSystem.Instance(this.index).quality + 1], this);
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerAdviserSystem.Instance(this.index).head_path, this);
            this.imgSpriteIcon.mask = this.imgMask;
            //this.imgSpriteIcon.texture = UIConfig.UIConfig_Role.pieceFrame[];
            // let clip = (UIConfig.UIConfig_Adviser.petIcons[this.index] ,UIConfig.UIConfig_Role.mask.soul);
            // this.node
        };
        //跳转 “获取途径 ” 界面
        PetDontGet.prototype.onBtnAddPetSoul = function () {
            var _this = this;
            var itemId = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //召唤
        PetDontGet.prototype.onBtnAddFragment = function () {
            var itemId = zj.PlayerAdviserSystem.Instance(this.index).compose_goods;
            var Cur = zj.PlayerItemSystem.Count(itemId);
            var Des = zj.PlayerAdviserSystem.Instance(this.index).compose_count;
            if (Cur >= Des && zj.PlayerAdviserSystem.Have(this.index) == false) {
                this.AdviserCompose_Visit();
            }
            else {
                zj.toast(zj.TextsConfig.TextsConfig_Adviser.goods);
            }
        };
        PetDontGet.prototype.AdviserCompose_Visit = function () {
            var _this = this;
            var data_net = zj.Game.PlayerAdviserSystem.advisersMap[this.index];
            zj.PlayerAdviserSystem.ReqSummon(data_net.adviserId).then(function (data) {
                zj.loadUI(zj.PetPop)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.SetInfo(_this.index);
                });
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
                if (_this.father.petMainKeelAnimation.parent) {
                    _this.father.groupAdviser.removeChild(_this.father.petMainKeelAnimation);
                }
                _this.father.inIt(_this.father.btnType);
            });
        };
        return PetDontGet;
    }(zj.UI));
    zj.PetDontGet = PetDontGet;
    __reflect(PetDontGet.prototype, "zj.PetDontGet");
})(zj || (zj = {}));
//# sourceMappingURL=PetDontGet.js.map