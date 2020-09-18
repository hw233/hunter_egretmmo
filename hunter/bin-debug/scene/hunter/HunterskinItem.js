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
     * xingliwei
     * 2019.12.1
     * @class 皮肤属性子项
     */
    var HunterskinItem = (function (_super) {
        __extends(HunterskinItem, _super);
        function HunterskinItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterskinItemSkin.exml";
            return _this;
        }
        HunterskinItem.prototype.dataChanged = function () {
            var data = this.data;
            var info = data.info;
            this.imgProperty.source = this.scour();
            var index = this.data.index + 1;
            var value = info;
            if (value[0] == "cd_speed") {
                this.labelPlayerInfo.text = zj.TextsConfig.TextsConfig_Artifact.attrDes[value[0]] + "+" + value[1];
            }
            else {
                this.labelPlayerInfo.text = zj.TextsConfig.TextsConfig_Artifact.attrDes[value[0]] + "+" + value[1] + "%";
            }
        };
        HunterskinItem.prototype.scour = function () {
            var attrDes = {
                general_hp: "ui_hunter_collection_blood_png",
                general_atk: "ui_hunter_collection_atk_png",
                general_def: "ui_hunter_collection_def_png",
                skill_atk: "ui_hunter_collection_xiaoguomingzhong_png",
                skill_def: "ui_hunter_collection_xiaoguodikang_png",
                atk_crit: "ui_hunter_collection_hit_png",
                skill_crit: "技能暴击",
                crit_extra: "ui_hunter_collection_baojishanghai_png",
                crit_resistance: "ui_hunter_collection_baojidikang_png",
                dodge_rate: "ui_hunter_collection_gedang_png",
                hit_rate: "ui_hunter_collection_hushigedang_png",
                ignore_phyDef: "ui_hunter_collection_hushifangyu_png",
                ignore_magicDef: "忽视魔防",
                final_extra: "终伤附加",
                final_reduce: "终伤减免",
                rage_reduce: "怒气减免",
                general_atk_all: "攻击",
                general_def_all: "防御",
                all_crit: "ui_hunter_collection_baoji_png",
                ignore_def_all: "ui_hunter_collection_hushifangyu_png",
                universal_resistance: "异常抵抗",
                ignore_resistance: "忽视异常抵抗",
                float_resistance: "浮空抵抗",
                cd_speed: "ui_hunter_collection_sudu_png"
            };
            return zj.cachekey(attrDes[this.data.info[0]], this);
        };
        return HunterskinItem;
    }(eui.ItemRenderer));
    zj.HunterskinItem = HunterskinItem;
    __reflect(HunterskinItem.prototype, "zj.HunterskinItem");
    var HunterskinItemData = (function () {
        function HunterskinItemData() {
        }
        return HunterskinItemData;
    }());
    zj.HunterskinItemData = HunterskinItemData;
    __reflect(HunterskinItemData.prototype, "zj.HunterskinItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterskinItem.js.map