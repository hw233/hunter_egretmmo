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
     * @author chen xi
     *
     * @date 2018-11-22
     *
     * @class 猎人升级Item
     */
    var HunterUpLevelItem = (function (_super) {
        __extends(HunterUpLevelItem, _super);
        function HunterUpLevelItem() {
            var _this = _super.call(this) || this;
            _this.touchBeginTime = 0;
            _this.touchTimeInterval = 1000; // 长按间隔1秒
            _this.skinName = "resource/skins/hunter/HunterUpLevelItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterUpLevelItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.touchBeginTime = egret.setTimeout(_this.onLongPress, _this, _this.touchTimeInterval);
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function () {
                egret.clearTimeout(_this.touchBeginTime);
                _this.data.father.visStart = false;
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                egret.clearTimeout(_this.touchBeginTime);
                _this.data.father.visStart = false;
            }, _this);
            return _this;
        }
        /** 长按延时响应的方法 */
        HunterUpLevelItem.prototype.onLongPress = function () {
            this.data.father.visStart = true;
            this.data.father.visOver = true;
            this.data.father.popItem = this;
            this.data.father.itemId = this.data.index;
        };
        /** 修改数据源被动执行*/
        HunterUpLevelItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        /**返回道具图片对象 */
        HunterUpLevelItem.prototype.getSpriteIcon = function () {
            return this.spriteIcon;
        };
        /**更新视图 */
        HunterUpLevelItem.prototype.updateView = function (data) {
            this.spriteIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(data.iconId), this);
            this.labelNum.text = "" + zj.Game.PlayerItemSystem.itemCount(data.iconId);
            if (zj.Game.PlayerItemSystem.itemCount(data.iconId) <= 0) {
                this.spriteMake.visible = true;
                this.btnAdd.visible = true;
            }
            var stringExperience = zj.Helper.StringFormat("EXP+%d", zj.TableItemProp.Item(data.iconId).general_exp);
            this.labelExp.text = stringExperience;
            this.labelName.text = zj.PlayerItemSystem.ItemConfig(data.iconId)["name"];
            var itemSet = zj.PlayerItemSystem.Set(data.iconId);
            this.spriteFrame.source = zj.cachekey(itemSet.Frame, this);
        };
        HunterUpLevelItem.prototype.setInfoUsed = function (used) {
            var str_used;
            str_used = used > 0 ? "x" + used : "x" + "0";
            this.labelUsed.text = str_used;
        };
        return HunterUpLevelItem;
    }(eui.ItemRenderer));
    zj.HunterUpLevelItem = HunterUpLevelItem;
    __reflect(HunterUpLevelItem.prototype, "zj.HunterUpLevelItem");
    /**子项数据源 */
    var HunterUpLevelItemData = (function () {
        function HunterUpLevelItemData() {
            /**道具图片ID */
            this.iconId = null;
        }
        return HunterUpLevelItemData;
    }());
    zj.HunterUpLevelItemData = HunterUpLevelItemData;
    __reflect(HunterUpLevelItemData.prototype, "zj.HunterUpLevelItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpLevelItem.js.map