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
    //HXH_HunterTransformDetailsItemItemRight
    // wangshenzhuo
    // 2019-07-17
    var HunterTransformDetailsItemItemRight = (function (_super) {
        __extends(HunterTransformDetailsItemItemRight, _super);
        function HunterTransformDetailsItemItemRight() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemItemRightSkin.exml";
            zj.cachekeys(zj.UIResource["HunterTransformDetailsItemItemRight"], null);
            return _this;
        }
        HunterTransformDetailsItemItemRight.prototype.dataChanged = function () {
            if (this.data) {
                var skillInfo = zj.TableGeneralTalent.Item(this.data.general_id);
                var iconPath = zj.TableGeneralTalent.Item(this.data.transfer_skill).path;
                this.imageIcon2.source = zj.cachekey(iconPath, this);
                this.labelPlayerDes.text = zj.TableGeneralTalent.Item(this.data.transfer_skill).skill_des;
                this.labelSkillName.text = zj.TableGeneralTalent.Item(this.data.transfer_skill).talent_name;
                for (var i = 0; i < 5; i++) {
                    this["imageStar" + (i + 1)].visible = false;
                }
                this.imageLvNum.visible = false;
            }
        };
        return HunterTransformDetailsItemItemRight;
    }(eui.ItemRenderer));
    zj.HunterTransformDetailsItemItemRight = HunterTransformDetailsItemItemRight;
    __reflect(HunterTransformDetailsItemItemRight.prototype, "zj.HunterTransformDetailsItemItemRight");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformDetailsItemItemRight.js.map