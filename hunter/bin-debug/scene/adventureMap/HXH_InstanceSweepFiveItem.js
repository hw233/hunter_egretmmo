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
     * 扫荡Item(掉落物品)
     * created by Lian Lei
     * 2019.1.19
     */
    var HXH_InstanceSweepFiveItem = (function (_super) {
        __extends(HXH_InstanceSweepFiveItem, _super);
        function HXH_InstanceSweepFiveItem() {
            var _this = _super.call(this) || this;
            _this.listData = new eui.ArrayCollection();
            _this.timer = new egret.Timer(300, 0); // 创建一个计时器对象
            _this.i = 0;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveItemSkin.exml";
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.updateOne, _this);
            _this.timer.start();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                if (_this.timer) {
                    _this.timer.stop();
                    _this.timer = null;
                }
            }, null);
            zj.cachekeys(zj.UIResource["AwardSignItem"], null);
            return _this;
        }
        HXH_InstanceSweepFiveItem.prototype.dataChanged = function () {
            this.listMax = 0;
            this.i = 0;
            // this.father = null;
            this.listData.removeAll();
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
            }
            this.updataView(this.data);
        };
        HXH_InstanceSweepFiveItem.prototype.updataView = function (data) {
            this.id = data.index;
            this.father = data.father;
            this.listMax = data.father.sweepDrps[data.index].length;
            if ((data.index + 1) == (this.father.sweepDrps.length - 1)) {
                this.labelTitle.text = zj.TextsConfig.TextConfig_Instance.wipeExp;
            }
            else {
                this.labelTitle.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_Instance.wipeTitle, (data.index + 1));
            }
            this.labelTextNone.visible = false;
            if (this.listMax == 0) {
                this.labelTextNone.visible = true;
            }
            else {
                this.labelTextNone.visible = false;
            }
            if (this.father == null || this.father == undefined)
                return;
            if (this.father.listSize > 0) {
                // this.updateOne();
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
                this.timer.start();
            }
            else {
                this.loadList();
            }
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
            // this.timer.start();
        };
        HXH_InstanceSweepFiveItem.prototype.update111 = function () {
            if (this.father == null || this.father == undefined)
                return;
            if (this.father.listSize > 0) {
                this.updateOne();
            }
            else {
                this.loadList();
            }
        };
        HXH_InstanceSweepFiveItem.prototype.loadList = function () {
            this.listData.removeAll();
            for (var i = 0; i < this.listMax; i++) {
                var itemData = new zj.Common_ItemData();
                itemData.info = this.father.sweepDrps[this.data.index][i].goodsId;
                itemData.index = i;
                itemData.type = itemData.CurState.Sweep;
                itemData.father = this;
                this.listData.addItem(itemData);
            }
            this.list.dataProvider = this.listData;
            this.list.itemRenderer = zj.Common_Item;
            this.father.bNeedAdd = true;
        };
        HXH_InstanceSweepFiveItem.prototype.updateOne = function () {
            if ((this.listMax - this.i) > 0) {
                var itemData = new zj.Common_ItemData();
                if (this.father == null || this.father == undefined)
                    return;
                var temp = this.father.sweepDrps[this.data.index][this.i];
                itemData.info = temp.goodsId;
                itemData.index = this.i;
                itemData.type = itemData.CurState.Sweep;
                itemData.father = this;
                this.listData.addItem(itemData);
                this.list.dataProvider = this.listData;
                this.list.itemRenderer = zj.Common_Item;
                this.i += 1;
                if (this.listMax == this.i) {
                    this.i = 0;
                    this.timer.stop();
                    this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateOne, this);
                    this.father.bNeedAdd = true;
                }
            }
        };
        return HXH_InstanceSweepFiveItem;
    }(eui.ItemRenderer));
    zj.HXH_InstanceSweepFiveItem = HXH_InstanceSweepFiveItem;
    __reflect(HXH_InstanceSweepFiveItem.prototype, "zj.HXH_InstanceSweepFiveItem");
    var HXH_InstanceSweepFiveItemData = (function () {
        function HXH_InstanceSweepFiveItemData() {
        }
        return HXH_InstanceSweepFiveItemData;
    }());
    zj.HXH_InstanceSweepFiveItemData = HXH_InstanceSweepFiveItemData;
    __reflect(HXH_InstanceSweepFiveItemData.prototype, "zj.HXH_InstanceSweepFiveItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceSweepFiveItem.js.map