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
    // HXH_HunterTransformSkillPop
    // wangshenzhuo
    // 2019-7-18
    var HunterTransformSkillPop = (function (_super) {
        __extends(HunterTransformSkillPop, _super);
        function HunterTransformSkillPop() {
            var _this = _super.call(this) || this;
            _this.hunter_info = [];
            _this.generalPopInfo = [];
            _this.skinName = "resource/skins/storyHunter/HunterTransformSkillPopSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonUse, _this);
            return _this;
        }
        HunterTransformSkillPop.prototype.SetInfo = function (generalId, level, info, father) {
            this.general_id = generalId;
            this.popLevel = level;
            this.generalPopInfo = info;
            this.father = father;
            this.SetTransformInfo();
            zj.PlayerHunterSystem.transformSel = 1;
        };
        HunterTransformSkillPop.prototype.SetTransformInfo = function () {
            this.hunter_info = zj.PlayerHunterSystem.getCanTransformHunter(this.generalPopInfo);
            if (this.hunter_info && this.hunter_info != null) {
                this.hunter_info.splice(0, 0, this.general_id);
                this.listViewDrop.itemRenderer = zj.HunterTransformSkillPopItem;
                var listItem = new eui.ArrayCollection();
                for (var i = 0; i < this.hunter_info.length; i++) {
                    var data = new zj.HunterTransformSkillPopItemData();
                    data.index = i + 1;
                    data.info = this.hunter_info[i];
                    data.level = this.popLevel;
                    data.father = this;
                    listItem.addItem(data);
                }
                this.listViewDrop.dataProvider = listItem;
            }
            if (this.hunter_info && this.hunter_info.length > 1) {
                this.imageNone.visible = false;
            }
            else {
                this.imageNone.visible = true;
            }
        };
        HunterTransformSkillPop.prototype.onButtonUse = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.father.setConsume();
        };
        HunterTransformSkillPop.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            zj.PlayerHunterSystem.transformSel = 1;
        };
        return HunterTransformSkillPop;
    }(zj.Dialog));
    zj.HunterTransformSkillPop = HunterTransformSkillPop;
    __reflect(HunterTransformSkillPop.prototype, "zj.HunterTransformSkillPop");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformSkillPop.js.map