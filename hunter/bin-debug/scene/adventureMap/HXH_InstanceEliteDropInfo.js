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
     * 冒险---挑战列表掉落弹窗
     * created by Lian Lei
     * 2019.1.25
     */
    var HXH_InstanceEliteDropInfo = (function (_super) {
        __extends(HXH_InstanceEliteDropInfo, _super);
        function HXH_InstanceEliteDropInfo() {
            var _this = _super.call(this) || this;
            _this.listData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceEliteDropInfoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            return _this;
        }
        HXH_InstanceEliteDropInfo.prototype.setInfo = function (index) {
            // let goodsId: Array<string> = Game.PlayerInstanceSystem.EliteInstance(index).elite_drop_des;
            // let goods = [];
            // for (let i = 0; i < goodsId.length; i++) {
            // 	let v: string = goodsId[i];
            // 	// v.split("&");
            // 	let vv: Array<string> = v.split("&");
            // 	goods.push({
            // 		goodsId: parseInt(vv[0]),
            // 		des: vv[1],
            // 	});
            // }
            var goods = [];
            var instances = zj.Game.PlayerInstanceSystem.EliteInstance(index).chapter_pack;
            for (var i = 0; i < instances.length; i++) {
                var instance = zj.TableInstance.Item(instances[i]);
                if (instance) {
                    var randItems = instance.rand_items;
                    for (var j = 0; j < randItems.length; ++j) {
                        var randItem = zj.TableRandItem.Item(randItems[j]);
                        if (randItem) {
                            var goodids = randItem.item_ids;
                            for (var n = 0; n < goodids.length; ++n) {
                                if (goods.indexOf(goodids[n]) == -1) {
                                    goods.push(goodids[n]);
                                }
                            }
                        }
                    }
                }
            }
            this.listData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.HXH_InstanceEliteDropInfoItemData();
                itemData.index = i;
                itemData.goodsId = goods[i];
                itemData.des = "";
                itemData.father = this;
                this.listData.addItem(itemData);
            }
            this.listDrop.dataProvider = this.listData;
            this.listDrop.itemRenderer = zj.HXH_InstanceEliteDropInfoItem;
        };
        HXH_InstanceEliteDropInfo.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_InstanceEliteDropInfo.prototype.onRemoveDialog = function () {
            var dialog = this.getChildByName("Drop");
            if (dialog)
                this.removeChild(dialog);
        };
        return HXH_InstanceEliteDropInfo;
    }(zj.Dialog));
    zj.HXH_InstanceEliteDropInfo = HXH_InstanceEliteDropInfo;
    __reflect(HXH_InstanceEliteDropInfo.prototype, "zj.HXH_InstanceEliteDropInfo");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceEliteDropInfo.js.map