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
    //HeroesPokedexScene
    //hexiaowei
    // 2018/12/05
    var HeroesPokedexInfo = (function (_super) {
        __extends(HeroesPokedexInfo, _super);
        function HeroesPokedexInfo() {
            var _this = _super.call(this) || this;
            _this.labelArray = [1, 2, 3, 24, 9, 6, 8, 23, 4, 5];
            _this.itemIndex = 0;
            _this.skillArray = [];
            _this.skinName = "resource/skins/archive/HeroesPokedexInfoSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.groupNode1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode1Begin, _this);
            _this.groupNode1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGroupNode1Tap, _this);
            _this.groupNode2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode2Begin, _this);
            _this.groupNode2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGroupNode2Tap, _this);
            _this.groupNode3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode3Begin, _this);
            _this.groupNode3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGroupNode3Tap, _this);
            _this.groupNode4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode4Begin, _this);
            _this.groupNode4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGroupNode4Tap, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroupRemove, _this);
            _this.btnHaveHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonHaveHunter, _this);
            _this.btnViewComment.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnViewComment, _this);
            _this.dommondesskill = new zj.Common_DesSkill();
            _this.addChild(_this.dommondesskill);
            _this.dommondesskill.visible = false;
            _this.groupLayer.scaleX = 0;
            _this.groupLayer.scaleY = 0;
            _this.rectBg.visible = true;
            _this.rectBg.fillAlpha = 0;
            egret.Tween.get(_this.rectBg).to({ fillAlpha: 0.3 }, 500, egret.Ease.backOut).call(function () {
            });
            egret.Tween.get(_this.groupLayer).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
            return _this;
        }
        HeroesPokedexInfo.prototype.init = function (father) {
            this._father = father;
        };
        HeroesPokedexInfo.prototype.Load = function (data) {
            zj.UIConfig.UIConfig_CommonBattle.formulaP2 = 125;
            this.info = data;
            this.generalid = data.generalId;
            var mapRoleIns = zj.PlayerHunterSystem.MapInstance(zj.PlayerHunterSystem.Table(data.generalId).general_roleId);
            var generalIns = zj.PlayerHunterSystem.Table(data.generalId);
            this.imgSpriteHunterHalf.source = zj.cachekey(mapRoleIns.half_path, this);
            if (data.isHave != true) {
                zj.Helper.SetImageFilterColor(this.imgSpriteHunterHalf, "black");
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgSpriteHunterHalf);
            }
            this.imgSpriteHunterName.source = zj.cachekey(generalIns.name_pic, this);
            this.imgSpriteHunterDpt.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pokedex.dpt2[zj.PlayerHunterSystem.Table(data.generalId).type], this);
            this.labelHunterInfo.text = generalIns.des;
            this.imgSpriteHunterGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.generalId).aptitude], this);
            this.imgSpriteHunterAttType.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type2[zj.PlayerHunterSystem.Table(data.generalId).features], this);
            var info = data.generalInfo;
            info.step = 0;
            var result = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(info);
            this.SetAttri(result);
            this.SetSkillList();
        };
        HeroesPokedexInfo.prototype.SetAttri = function (result) {
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                for (var k in this.labelArray) {
                    if (i == this.labelArray[k]) {
                        //this[`labelTitle${i}`].text=TextsConfig.TextsConfig_Potato.AttriStr[i];
                        this["labelTitle" + i].text = zj.TextsConfig.TextsConfig_Potato.AttriStr[i - 1];
                        if (i == zj.TableEnum.EnumGelAttrib.ATTR_HP || i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK ||
                            i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF || i == zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED ||
                            i == zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS) {
                            this["labelAttri" + i].text = Math.ceil(result[i]).toString();
                            ;
                        }
                        else {
                            this["labelAttri" + i].text = zj.HelpUtil.textConfigFormat(zj.StringConfig_Common.percent, Math.ceil(result[i]));
                        }
                    }
                    else {
                        continue;
                    }
                }
            }
        };
        HeroesPokedexInfo.prototype.SetSkillList = function () {
            var genTbl = zj.PlayerHunterSystem.Table(this.generalid);
            this.groupNode1.visible = false;
            this.groupNode2.visible = false;
            this.groupNode3.visible = false;
            this.groupNode4.visible = false;
            for (var i = 0; i < genTbl.skill_ids.length; i++) {
                this["groupNode" + (i + 1)].visible = true;
                this["imgSpriteIcon" + (i + 1)].source = zj.cachekey(zj.TableGeneralSkill.Item(genTbl.skill_ids[i]).path, this);
            }
            if (genTbl.init_passive[0] != 0) {
                this.groupNode3.visible = true;
                this.imgSpriteIcon3.source = zj.cachekey(zj.TableGeneralTalent.Item(genTbl.init_passive[0]).path, this);
            }
            if (genTbl.awake_passive != 0) {
                this.groupNode4.visible = true;
                this.imgSpriteIcon4.source = zj.cachekey(zj.TableGeneralTalent.Item(genTbl.awake_passive).path, this);
            }
        };
        HeroesPokedexInfo.prototype.onBtnGroupRemove = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode1Begin = function () {
            this.dommondesskill.visible = true;
            var genTbl = zj.PlayerHunterSystem.Table(this.generalid);
            this.dommondesskill.x = this.width * 0.2;
            this.dommondesskill.y = this.height * 0.35;
            this.dommondesskill.setInfoSkill(genTbl.skill_ids[0], 0, 1);
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode1Tap = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode2Begin = function () {
            this.dommondesskill.visible = true;
            var genTbl = zj.PlayerHunterSystem.Table(this.generalid);
            this.dommondesskill.x = this.width * 0.30;
            this.dommondesskill.y = this.height * 0.35;
            this.dommondesskill.setInfoSkill(genTbl.skill_ids[1], 1, 1);
            this.dommondesskill.visible = true;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode2Tap = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode3Begin = function () {
            this.dommondesskill.visible = true;
            var genTbl = zj.PlayerHunterSystem.Table(this.generalid);
            this.dommondesskill.x = this.width * 0.35;
            this.dommondesskill.y = this.height * 0.35;
            this.dommondesskill.setInfoTalent(genTbl.init_passive[0], 2);
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode3Tap = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode4Begin = function () {
            this.dommondesskill.visible = true;
            var genTbl = zj.PlayerHunterSystem.Table(this.generalid);
            this.dommondesskill.x = this.width * 0.4;
            this.dommondesskill.y = this.height * 0.35;
            this.dommondesskill.setInfoTalent(genTbl.awake_passive, 3);
        };
        HeroesPokedexInfo.prototype.onBtnGroupNode4Tap = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.onBtnGroupNodeEnd = function () {
            this.dommondesskill.visible = false;
        };
        HeroesPokedexInfo.prototype.LoadShow = function (generalId) {
            // UIOpenAndDown(self)
        };
        HeroesPokedexInfo.prototype.onBtnViewComment = function () {
            zj.toast_warning("查看评论暂未开启！");
        };
        HeroesPokedexInfo.prototype.onButtonClose = function () {
            var _this = this;
            egret.Tween.get(this.rectBg).to({ fillAlpha: 0 }, 100, egret.Ease.backOut).call(function () {
            });
            egret.Tween.get(this.groupLayer).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.backInOut).call(function () {
                _this.rectBg.visible = false;
                _this.close();
            });
        };
        HeroesPokedexInfo.prototype.onButtonHaveHunter = function () {
            var _this = this;
            var id = this.generalid % zj.CommonConfig.general_id_to_index_multiple;
            var soulId = zj.TableBaseGeneral.Item(id).general_soul;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(soulId, _this, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return HeroesPokedexInfo;
    }(zj.UI));
    zj.HeroesPokedexInfo = HeroesPokedexInfo;
    __reflect(HeroesPokedexInfo.prototype, "zj.HeroesPokedexInfo");
})(zj || (zj = {}));
//# sourceMappingURL=HeroesPokedexInfo.js.map