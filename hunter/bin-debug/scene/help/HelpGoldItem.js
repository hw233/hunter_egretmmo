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
    // HelpGoldItem
    // wang shen zhuo
    // 2019/1/3
    var HelpGoldItem = (function (_super) {
        __extends(HelpGoldItem, _super);
        function HelpGoldItem() {
            var _this = _super.call(this) || this;
            _this.timewait = 0;
            _this.timemove = 0;
            _this.skinName = "resource/skins/help/GoldItemSkin.exml";
            zj.cachekeys(zj.UIResource["HelpGoldItem"], null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        HelpGoldItem.prototype.dataChanged = function () {
            var _this = this;
            this.SetInfo(this.data.id, this.data.father);
            if (this.data.condition)
                egret.Tween.get(this.groupItem)
                    .call(function () { _this.data.condition = false; })
                    .to({ x: -265 }, 100)
                    .to({ x: 0 }, 300, egret.Ease.quadIn);
        };
        HelpGoldItem.prototype.SetInfo = function (id, father) {
            this.id = id;
            this.father = father;
            this.SetInfoMoney();
        };
        HelpGoldItem.prototype.SetInfoMoney = function () {
            var money = zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List[this.id];
            var multiple = money.multiple;
            this.labelAward.text = zj.Set.NumberUnit3(money.money);
            if (multiple < 3) {
                this.labelNum.font = zj.UIConfig.UIConfig_Money.nameFont[1];
                this.labelNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
            else if (multiple >= 3 && multiple <= 4) {
                this.labelNum.font = zj.UIConfig.UIConfig_Money.nameFont[2];
                this.labelNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
            else if (multiple >= 5 && multiple <= 7) {
                this.labelNum.font = zj.UIConfig.UIConfig_Money.nameFont[3];
                this.labelNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
            else if (multiple >= 8 && multiple <= 10) {
                this.labelNum.font = zj.UIConfig.UIConfig_Money.nameFont[4];
                this.labelNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
            else {
                this.labelNum.font = zj.UIConfig.UIConfig_Money.nameFont[5];
                this.labelNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
        };
        return HelpGoldItem;
    }(eui.ItemRenderer));
    zj.HelpGoldItem = HelpGoldItem;
    __reflect(HelpGoldItem.prototype, "zj.HelpGoldItem");
    //子项数据源
    var HelpGoldItemData = (function () {
        function HelpGoldItemData() {
        }
        return HelpGoldItemData;
    }());
    zj.HelpGoldItemData = HelpGoldItemData;
    __reflect(HelpGoldItemData.prototype, "zj.HelpGoldItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HelpGoldItem.js.map