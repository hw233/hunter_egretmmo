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
     *
     *  2019-5-29
     * @class 贪婪之岛 阵容  详情
     */
    var Wonderland_PropertyView = (function (_super) {
        __extends(Wonderland_PropertyView, _super);
        function Wonderland_PropertyView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/Wonderland_PropertyViewSkin.exml";
            _this.init();
            return _this;
        }
        Wonderland_PropertyView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.setLeftList();
            this.setRightList();
        };
        Wonderland_PropertyView.prototype.setLeftList = function () {
            var attriResult = zj.Helper.CreateGeneralAttrTbl();
            for (var k in zj.Game.PlayerAdviserSystem.petInfo) {
                if (zj.Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerAdviserSystem.petInfo[k];
                    var petTbl = zj.TableBasePet.Item(v.pet_id);
                    if (petTbl) {
                        for (var i = 0; i < zj.TableEnum.EnumGelAttribName.length; i++) {
                            var typeName = zj.TableEnum.EnumGelAttribName[i];
                            if (petTbl[typeName] != null) {
                                for (var j = 0; j < v.star; j++) {
                                    attriResult[i] = attriResult[i] + petTbl[typeName][j];
                                }
                            }
                        }
                        for (var i = 0; i < v.step + 1; i++) {
                            var skillId = petTbl.skill_island[i];
                            if (skillId != null && skillId != 0) {
                                var skillTbl = zj.TablePetSkill.Item(skillId);
                                if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
                                    var attrKey = skillTbl.attri_add[0];
                                    var attrValue = skillTbl.attri_add[1];
                                    attriResult[attrKey] = attriResult[attrKey] + attrValue;
                                }
                            }
                        }
                    }
                }
            }
            var otherSkillTbl = [];
            for (var i = message.PetSkillType.PET_SKILL_TYPE_ATTRI; i <= message.PetSkillType.PET_SKILL_TYPE_FUHUO; i++) {
                var curTbl = {
                    key: i + 1000,
                    value: 0
                };
                otherSkillTbl.push(curTbl);
            }
            for (var k in zj.Game.PlayerAdviserSystem.petInfo) {
                if (zj.Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerAdviserSystem.petInfo[k];
                    var petTbl = zj.TableBasePet.Item(v.pet_id);
                    if (petTbl) {
                        for (var kk in petTbl.skill_island) {
                            if (petTbl.skill_island.hasOwnProperty(kk)) {
                                var vv = petTbl.skill_island[kk];
                                if (vv != 0) {
                                    var skillTbl = zj.TablePetSkill.Item(vv);
                                    if (skillTbl.b_fight == 1 && skillTbl.type != message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
                                        if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_QIANG) {
                                            var value = otherSkillTbl[skillTbl.type].value + skillTbl.rand[1];
                                            if (value >= 100) {
                                                value = 100;
                                            }
                                            otherSkillTbl[skillTbl.type - 1].value = value;
                                        }
                                        else {
                                            otherSkillTbl[skillTbl.type - 1].value = otherSkillTbl[skillTbl.type - 1].value + Number(skillTbl.value);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var tbl = [];
            for (var k in attriResult) {
                if (attriResult.hasOwnProperty(k)) {
                    var v = attriResult[k];
                    var curTbl = {
                        key: k,
                        value: v
                    };
                    if (v != 0) {
                        tbl.push(curTbl);
                    }
                }
            }
            for (var k in otherSkillTbl) {
                if (otherSkillTbl.hasOwnProperty(k)) {
                    var v = otherSkillTbl[k];
                    if (v.value > 0) {
                        tbl.push(v);
                    }
                }
            }
            var array = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                var data = new zj.Wonderland_PropertyViewItemData();
                data.index = i;
                data.info = tbl[i];
                data.father = this;
                array.addItem(data);
            }
            this.listTableView.dataProvider = array;
            this.listTableView.itemRenderer = zj.Wonderland_PropertyViewItem;
        };
        Wonderland_PropertyView.prototype.setRightList = function () {
            var otherSkillTbl = [];
            for (var i = message.PetSkillType.PET_SKILL_TYPE_ATTRI; i <= message.PetSkillType.PET_SKILL_TYPE_FUHUO; i++) {
                var curTbl = {
                    key: i + 1000,
                    value: 0
                };
                otherSkillTbl.push(curTbl);
            }
            for (var k in zj.Game.PlayerAdviserSystem.petInfo) {
                if (zj.Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerAdviserSystem.petInfo[k];
                    var petTbl = zj.TableBasePet.Item(v.pet_id);
                    if (petTbl) {
                        for (var kk in petTbl.skill_island) {
                            if (petTbl.skill_island.hasOwnProperty(kk)) {
                                var vv = petTbl.skill_island[kk];
                                if (vv != 0 && (Number(kk) <= (v.step + 1))) {
                                    var skillTbl = zj.TablePetSkill.Item(vv);
                                    if (skillTbl.b_fight == 0) {
                                        if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_QIANG) {
                                            var value = otherSkillTbl[skillTbl.type].value + skillTbl.rand[0];
                                            if (value >= 100) {
                                                value = 100;
                                            }
                                            otherSkillTbl[skillTbl.type - 1].value = value;
                                        }
                                        else {
                                            otherSkillTbl[skillTbl.type - 1].value = otherSkillTbl[skillTbl.type - 1].value + Number(skillTbl.value);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var tbl = [];
            for (var k in otherSkillTbl) {
                if (otherSkillTbl.hasOwnProperty(k)) {
                    var v = otherSkillTbl[k];
                    if (v.value > 0) {
                        tbl.push(v);
                    }
                }
            }
            var array = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                var data = new zj.Wonderland_PropertyViewItemData();
                data.info = i;
                data.info = tbl[i];
                data.father = this;
                array.addItem(data);
            }
            this.listTableViewB.dataProvider = array;
            this.listTableViewB.itemRenderer = zj.Wonderland_PropertyViewItem;
        };
        Wonderland_PropertyView.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Wonderland_PropertyView;
    }(zj.Dialog));
    zj.Wonderland_PropertyView = Wonderland_PropertyView;
    __reflect(Wonderland_PropertyView.prototype, "zj.Wonderland_PropertyView");
})(zj || (zj = {}));
//# sourceMappingURL=Wonderland_PropertyView.js.map