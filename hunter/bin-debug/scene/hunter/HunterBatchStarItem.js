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
      * @date 2019-11-4
      *
      * @class 猎人批量升星Item
      */
    var HunterBatchStarItem = (function (_super) {
        __extends(HunterBatchStarItem, _super);
        function HunterBatchStarItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterBatchStarItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterBatchStarItem"], null);
            return _this;
        }
        HunterBatchStarItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.info.general_id == 0) {
                this.groupAll.visible = false;
            }
            else {
                this.groupAll.visible = true;
                var framePath = zj.PlayerHunterSystem.Frame(data.info.general_id);
                var iconPath = zj.PlayerHunterSystem.Head(data.info.general_id);
                this.imgFame.source = zj.cachekey(framePath, this);
                this.imgIcon.source = zj.cachekey(iconPath, this);
                var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.info.general_id);
                var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
                this.imgIconGrade.source = zj.cachekey(gradePath, this);
                zj.Helper.SetHeroAwakenStar(this.groupStar, data.info.star, data.info.awakePassive.level);
                this.labelLevel.text = data.info.level.toString();
            }
            if (data.vis == false) {
                this.imgduigou.visible = false;
            }
        };
        return HunterBatchStarItem;
    }(eui.ItemRenderer));
    zj.HunterBatchStarItem = HunterBatchStarItem;
    __reflect(HunterBatchStarItem.prototype, "zj.HunterBatchStarItem");
    var HunterBatchStarItemData = (function () {
        function HunterBatchStarItemData() {
            this.vis = true;
        }
        return HunterBatchStarItemData;
    }());
    zj.HunterBatchStarItemData = HunterBatchStarItemData;
    __reflect(HunterBatchStarItemData.prototype, "zj.HunterBatchStarItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBatchStarItem.js.map