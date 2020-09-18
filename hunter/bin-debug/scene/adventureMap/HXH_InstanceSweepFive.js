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
    var HXH_InstanceSweepFive = (function (_super) {
        __extends(HXH_InstanceSweepFive, _super);
        function HXH_InstanceSweepFive() {
            var _this = _super.call(this) || this;
            _this.listSize = 0;
            _this.bNeedAdd = true;
            _this.timer = new egret.Timer(1000, 0); // 创建一个计时器对象
            _this.sweepOrg = [];
            _this.sweepDrps = [];
            _this.listData = new eui.ArrayCollection();
            _this.i = 0;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveSkin.exml";
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.updateList, _this);
            _this.timer.start();
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            _this.listData.removeAll();
            return _this;
        }
        HXH_InstanceSweepFive.prototype.setSweepGoods = function (sweeps, exps) {
            this.sweepOrg = sweeps;
            this.sweepDrps = [];
            for (var i = 0; i < sweeps.length; i++) {
                this.sweepDrps[i] = [];
                var goodsInfo = sweeps[i].goodsInfo;
                for (var j = 0; j < goodsInfo.length; j++) {
                    var good = goodsInfo[j];
                    this.sweepDrps[i].push(good);
                }
            }
            var tblExp = []; // 临时table 用于存储经验物品
            var tblBasic = []; // 存储基础奖励 经验
            for (var i = 0; i < exps.length; i++) {
                var good = exps[i];
                if (zj.PlayerItemSystem.ItemType(good.goodsId) == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    tblBasic.push(good);
                }
                else {
                    tblExp.push(good);
                }
            }
            this.sweepDrps.push(tblExp); // 经验补偿
            this.sweepDrps.push(tblBasic); // 基础收益
            this.listSize = this.sweepDrps.length - 1;
        };
        HXH_InstanceSweepFive.prototype.deleteFun = function () {
            var levelUp = zj.Game.PlayerInfoSystem.BaseInfo.level > zj.Game.PlayerInfoSystem.baseInfo_pre.level;
            this.father.FreshInfo();
        };
        HXH_InstanceSweepFive.prototype.onBtnGet = function () {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateList, this);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level > zj.Game.PlayerInfoSystem.baseInfo_pre.level) {
                egret.Tween.get(this).wait(200).call(function () {
                    zj.TipManager.LevelUp();
                });
            }
            if (this.callBack) {
                this.callBack();
            }
            // this.father.FreshInfo();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_InstanceSweepFive.prototype.loadList = function () {
            if (this.listSize > 0) {
                if (this.bNeedAdd == true) {
                    this.listData.removeAll();
                    for (var i = 0; i < this.sweepDrps.length - 1; i++) {
                        var itemData = new zj.HXH_InstanceSweepFiveItemData();
                        itemData.index = i;
                        itemData.father = this;
                        this.listData.addItem(itemData);
                        this.bNeedAdd = false;
                        this.listSize = this.listSize - 1;
                        if (this.listSize == 0) {
                            itemData = new zj.HXH_InstanceSweepFiveItemBData();
                            itemData.index = i;
                            itemData.father = this;
                            this.listData.addItem(itemData);
                            this.bNeedAdd = false;
                        }
                    }
                    this.list.dataProvider = this.listData;
                    this.list.itemRendererFunction = this.listItemRenderer;
                }
            }
        };
        HXH_InstanceSweepFive.prototype.listItemRenderer = function (data) {
            if (data instanceof zj.HXH_InstanceSweepFiveItemData) {
                return zj.HXH_InstanceSweepFiveItem;
            }
            else {
                return zj.HXH_InstanceSweepFiveItemB;
            }
        };
        HXH_InstanceSweepFive.prototype.updateList = function () {
            if (this.listSize >= 0) {
                if (this.bNeedAdd == true) {
                    if (this.listSize > 0) {
                        var itemData = new zj.HXH_InstanceSweepFiveItemData();
                        itemData.index = this.i;
                        itemData.father = this;
                        this.listData.addItem(itemData);
                        this.bNeedAdd = false;
                        this.listSize = this.listSize - 1;
                        this.i += 1;
                        if (this.i >= 3) {
                            // this.scroller.viewport.scrollV += 160;
                            this.list.scrollV += 160;
                        }
                    }
                    else if (this.listSize == 0) {
                        var itemData = new zj.HXH_InstanceSweepFiveItemBData();
                        itemData.index = this.i;
                        itemData.father = this;
                        this.listData.addItem(itemData);
                        this.bNeedAdd = false;
                        this.listSize = this.listSize - 1;
                        // this.scroller.viewport.scrollV += 75;
                        this.list.scrollV += 75;
                    }
                    this.list.dataProvider = this.listData;
                    this.list.itemRendererFunction = this.listItemRenderer;
                }
            }
            // this.scroller.viewport = this.list;
            // this.scroller.validateNow();
            if (this.listSize < 0) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateList, this);
            }
            this.scroller.touchEnabled = this.listSize <= 0;
        };
        HXH_InstanceSweepFive.prototype.setWantedSweepGoods = function (goods) {
            this.isWanted = true;
            // egret.clearTimeout(this.timer);
            for (var _i = 0, _a = zj.HelpUtil.GetKV(goods); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
            }
        };
        HXH_InstanceSweepFive.prototype.onRemoveDialog = function () {
            var dialog = this.getChildByName("DropOrAward");
            if (dialog)
                this.removeChild(dialog);
        };
        HXH_InstanceSweepFive.prototype.setCB = function (cb) {
            this.callBack = cb;
        };
        return HXH_InstanceSweepFive;
    }(zj.Dialog));
    zj.HXH_InstanceSweepFive = HXH_InstanceSweepFive;
    __reflect(HXH_InstanceSweepFive.prototype, "zj.HXH_InstanceSweepFive");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceSweepFive.js.map