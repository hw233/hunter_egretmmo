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
    //钓鱼--开奖一览
    //yuqingchao
    //2019.05.15
    var FishingAwardView = (function (_super) {
        __extends(FishingAwardView, _super);
        function FishingAwardView() {
            var _this = _super.call(this) || this;
            _this.curType = null;
            _this.goodsArr = [];
            _this.skinName = "resource/skins/fishing/FishingAwardViewSkin.exml";
            _this.lstTypeItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstTypeItem, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.init();
            return _this;
        }
        FishingAwardView.prototype.init = function () {
            this.curType = zj.TableEnum.Enum.LeagueFishType.White;
            this.lstTypeItem.selectedIndex = 0;
            this.initButtonList();
            this.initList();
        };
        FishingAwardView.prototype.initButtonList = function () {
            this.fishTable = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueFish + ".json");
            this.arrLstTypeItem = new eui.ArrayCollection();
            for (var i = 0; i < Object.keys(this.fishTable).length; i++) {
                this.arrLstTypeItem.addItem({
                    info: this.fishTable[i + 1],
                    id: i,
                    father: this
                });
            }
            this.lstTypeItem.dataProvider = this.arrLstTypeItem;
            this.lstTypeItem.itemRenderer = zj.FishingAwardViewTypeItem;
            var index = this.fishTable[this.lstTypeItem.selectedIndex + 1].rand_items[0];
            this.itemTable = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.randItem + ".json")[index];
            this.goodsArr.splice(0, this.goodsArr.length);
            for (var i = 0; i < this.itemTable.item_ids.length; i++) {
                var goods = new message.GoodsInfo();
                goods.goodsId = this.itemTable.item_ids[i];
                goods.count = this.itemTable.item_count[i];
                this.goodsArr.push(goods);
            }
        };
        FishingAwardView.prototype.initList = function () {
            this.arrLstItem = new eui.ArrayCollection();
            this.arrLstItem.removeAll();
            for (var i = 0; i < 14; i++) {
                this.arrLstItem.addItem({
                    info: this.goodsArr[i],
                    id: i,
                    father: this
                });
            }
            this.lstItem.dataProvider = this.arrLstItem;
            this.lstItem.itemRenderer = zj.FishingAwardViewItem;
        };
        FishingAwardView.prototype.onLstTypeItem = function (e) {
            this.lstTypeItem.selectedIndex = e.itemIndex;
            this.initButtonList();
            this.initList();
        };
        FishingAwardView.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        FishingAwardView.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        FishingAwardView.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return FishingAwardView;
    }(zj.Dialog));
    zj.FishingAwardView = FishingAwardView;
    __reflect(FishingAwardView.prototype, "zj.FishingAwardView");
})(zj || (zj = {}));
//# sourceMappingURL=FishingAwardView.js.map