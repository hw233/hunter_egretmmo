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
     * 扫荡Item(基础收益)
     * created by Lian Lei
     * 2019.1.21
     */
    var HXH_InstanceSweepFiveItemB = (function (_super) {
        __extends(HXH_InstanceSweepFiveItemB, _super);
        function HXH_InstanceSweepFiveItemB() {
            var _this = _super.call(this) || this;
            _this.totalTick = 0;
            _this.listIdx = 1;
            _this.listData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveItemBSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_InstanceSweepFiveItemB"], null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            setTimeout(function () { _this.update(); }, 500);
            var money = zj.Game.PlayerInfoSystem.BaseInfo.money - zj.Game.PlayerInfoSystem.baseInfo_pre.money;
            _this.setInfo(0, money);
            return _this;
        }
        HXH_InstanceSweepFiveItemB.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_InstanceSweepFiveItemB.prototype.updateView = function (data) {
            this.id = data.index;
            this.father = data.father;
            this.listMax = this.father.sweepDrps[data.index].length;
            if (zj.Device.isReviewSwitch) {
                this.imgCopper.y = 32;
                this.imgCopper.width = 40;
                this.imgCopper.height = 40;
            }
            this.imgCopper.visible = true;
            this.labelCopper.visible = true;
            this.imgExp.visible = true;
            this.labelExp.visible = true;
            var money = zj.Game.PlayerInfoSystem.BaseInfo.money - zj.Game.PlayerInfoSystem.baseInfo_pre.money;
            var exp = 0;
            if (data.father.sweepDrps[data.index][0] != null && data.father.sweepDrps[data.index][0].count != null) {
                exp = data.father.sweepDrps[data.index][0].count;
            }
            // this.labelCopper.text = "+" + money;
            if (zj.Game.PlayerInfoSystem.BaseInfo.level == zj.CommonConfig.role_max_level) {
                this.labelExp.text = zj.TextsConfig.TextsConfig_Common.expMax;
            }
            else {
                this.labelExp.text = "+" + exp;
            }
            // this.setInfo(0, money);
        };
        HXH_InstanceSweepFiveItemB.prototype.setInfo = function (oldValue, newValue) {
            this.oldValue = oldValue;
            this.newValue = newValue;
            this.labelCopper.text = "+" + this.oldValue;
        };
        HXH_InstanceSweepFiveItemB.prototype.update = function () {
            var _this = this;
            if (0 % 10 != this.newValue % 10) {
                this.oldValue++;
                if (this.oldValue % 10 > 9) {
                    this.oldValue % 10 === 0;
                }
            }
            else if (this.oldValue % 100 != this.newValue % 100) {
                this.oldValue += 10;
                if (this.oldValue % 10 > 9) {
                    this.oldValue % 10 === 0;
                }
            }
            else if (this.oldValue % 1000 != this.newValue % 1000) {
                this.oldValue += 100;
                if (this.oldValue % 100 > 9) {
                    this.oldValue % 100 === 0;
                }
            }
            else if (this.oldValue % 10000 != this.newValue % 10000) {
                this.oldValue += 1000;
                if (this.oldValue % 1000 > 9) {
                    this.oldValue % 1000 === 0;
                }
            }
            else if (this.oldValue % 100000 != this.newValue % 100000) {
                this.oldValue += 10000;
                if (this.oldValue % 10000 > 9) {
                    this.oldValue % 10000 === 0;
                }
            }
            else if (this.oldValue % 1000000 != this.newValue % 1000000) {
                this.oldValue += 100000;
                if (this.oldValue % 100000 > 9) {
                    this.oldValue % 100000 === 0;
                }
            }
            else if (this.oldValue == this.newValue) {
                this.labelCopper.text = "+" + this.oldValue;
                return; // 不再继续调用
            }
            this.labelCopper.text = "+" + this.oldValue;
            setTimeout(function () { _this.update(); }, 33);
        };
        return HXH_InstanceSweepFiveItemB;
    }(eui.ItemRenderer));
    zj.HXH_InstanceSweepFiveItemB = HXH_InstanceSweepFiveItemB;
    __reflect(HXH_InstanceSweepFiveItemB.prototype, "zj.HXH_InstanceSweepFiveItemB");
    var HXH_InstanceSweepFiveItemBData = (function () {
        function HXH_InstanceSweepFiveItemBData() {
        }
        return HXH_InstanceSweepFiveItemBData;
    }());
    zj.HXH_InstanceSweepFiveItemBData = HXH_InstanceSweepFiveItemBData;
    __reflect(HXH_InstanceSweepFiveItemBData.prototype, "zj.HXH_InstanceSweepFiveItemBData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceSweepFiveItemB.js.map