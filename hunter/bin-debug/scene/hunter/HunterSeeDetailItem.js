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
    //HunterSeeDetailItem
    //wangshenzhuo
    // 2018/12/14
    var HunterSeeDetailItem = (function (_super) {
        __extends(HunterSeeDetailItem, _super);
        function HunterSeeDetailItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterSeeDetailItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterSeeDetailItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
            return _this;
        }
        /**数据源刷新被动执行 */
        HunterSeeDetailItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupNode);
            this.updateView(this.data);
            if (this.data.father != null) {
                this.scaleX = 0.8;
                this.scaleY = 0.8;
            }
            zj.setCache(this.groupNode);
        };
        /**更新视图 */
        HunterSeeDetailItem.prototype.updateView = function (data) {
            this.labelNum.visible = false;
            var type = data.index;
            var path = "";
            if (type == 3 || type == 2) {
                path = zj.TableGeneralTalent.Item(data.skillId).path;
            }
            else {
                path = zj.TableGeneralSkill.Item(data.skillId).path;
            }
            this.imgSpriteicon.source = zj.cachekey(path, this);
            data.imgSpriteicon = this.imgSpriteicon;
        };
        /**点击 */
        HunterSeeDetailItem.prototype.down = function () {
            if (this.data.father != null) {
                this.data.father.subitemClick(true, this.data);
            }
            else {
                this.data.fatherDetail.subitemClick(true, this.data);
            }
        };
        return HunterSeeDetailItem;
    }(eui.ItemRenderer));
    zj.HunterSeeDetailItem = HunterSeeDetailItem;
    __reflect(HunterSeeDetailItem.prototype, "zj.HunterSeeDetailItem");
    /** 子项数据源 */
    var HunterSeeDetailItemData = (function () {
        function HunterSeeDetailItemData() {
            /**英雄ID */
            this.generalId = null;
        }
        return HunterSeeDetailItemData;
    }());
    zj.HunterSeeDetailItemData = HunterSeeDetailItemData;
    __reflect(HunterSeeDetailItemData.prototype, "zj.HunterSeeDetailItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSeeDetailItem.js.map