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
     * @author xingliwei
     *
     * @time 2019-7-30
     *
     * @class 猎人念力组合效果长按详情界面
     */
    var CommonDesPsychicGroup = (function (_super) {
        __extends(CommonDesPsychicGroup, _super);
        function CommonDesPsychicGroup() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonDesPsychicGroupSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.close(); }, _this);
            return _this;
        }
        CommonDesPsychicGroup.prototype.SetInfo = function (groupInfo) {
            this.setPsychicGroupInfo(groupInfo);
            this.setListDes();
        };
        CommonDesPsychicGroup.prototype.setPsychicGroupInfo = function (groupInfo) {
            this.info = groupInfo;
            this.imgIcon.source = this.info.path;
            this.labelName.text = this.info.name;
            this.labelType.text = (zj.TextsConfig.TextsConfig_HeroMain.level + this.info.psychic.level);
        };
        CommonDesPsychicGroup.prototype.setListDes = function () {
            var talentData = zj.TableGeneralTalent.Item(this.info.group_talent);
            var effectData = zj.TableGeneralTalentEffect.Item(talentData.talent_type * 100 + 1);
            var array = new eui.ArrayCollection();
            for (var i = 0; i < talentData.max_level; i++) {
                var data = new zj.CommonDesPsychicGroupItemData;
                var value = 0;
                var bGetEffect = true;
                if (effectData.effect_value2 && effectData.effect_value2.length > 0) {
                    value = effectData.effect_value2[0] + effectData.effect_value2[1] * (i + 1);
                }
                else {
                    value = effectData.effect_value[0] + effectData.effect_value[1] * (i + 1);
                }
                var describeStr = zj.Helper.StringFormat(talentData.talent_describe, value);
                if ((i + 1) == this.info.psychic.level) {
                    describeStr = describeStr + zj.TextsConfig.TextsConfig_Hunter_psychic.curAttriEffect;
                }
                else if ((i + 1) > this.info.psychic.level) {
                    bGetEffect = false;
                }
                data.bGetEffect = bGetEffect;
                data.describeStr = describeStr;
                array.addItem(data);
            }
            this.listDes.dataProvider = array;
            this.listDes.itemRenderer = zj.CommonDesPsychicGroupItem;
        };
        return CommonDesPsychicGroup;
    }(zj.UI));
    zj.CommonDesPsychicGroup = CommonDesPsychicGroup;
    __reflect(CommonDesPsychicGroup.prototype, "zj.CommonDesPsychicGroup");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesPsychicGroup.js.map