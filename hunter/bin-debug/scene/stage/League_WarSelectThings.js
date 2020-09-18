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
     */
    var League_WarSelectThings = (function (_super) {
        __extends(League_WarSelectThings, _super);
        function League_WarSelectThings() {
            var _this = _super.call(this) || this;
            _this.things = [];
            _this.TableViewListData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/fight/League_WarSelectThingsSkin.exml";
            _this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        League_WarSelectThings.prototype.SetInfo = function (things) {
            this.things = things;
            this.LoadList(things);
        };
        League_WarSelectThings.prototype.LoadList = function (things) {
            this.TableViewListData.removeAll();
            for (var i = 0; i < things.length; i++) {
                var itemData = new zj.League_WarSelectThingItemData();
                itemData.index = i;
                itemData.thing = this.things[i];
                itemData.father = this;
                this.TableViewListData.addItem(itemData);
            }
            this.TableViewList.dataProvider = this.TableViewListData;
            this.TableViewList.itemRenderer = zj.League_WarSelectThingItem;
        };
        League_WarSelectThings.prototype.onBtnClose = function () {
            this.close();
        };
        return League_WarSelectThings;
    }(zj.Dialog));
    zj.League_WarSelectThings = League_WarSelectThings;
    __reflect(League_WarSelectThings.prototype, "zj.League_WarSelectThings");
})(zj || (zj = {}));
//# sourceMappingURL=League_WarSelectThings.js.map