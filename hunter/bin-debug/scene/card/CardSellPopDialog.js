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
    // created by hhh in 2018/11/14
    /************** 卡片出售dialog ****************/
    var CardSellPopDialog = (function (_super) {
        __extends(CardSellPopDialog, _super);
        function CardSellPopDialog() {
            var _this = _super.call(this) || this;
            _this.selList = [
                false,
                false,
                false,
                false
            ];
            _this.groupCheckArr = [];
            _this.list = [];
            _this.totalMoney = 0;
            _this.skinName = "resource/skins/card/CardSellPopDialogSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        CardSellPopDialog.prototype.init = function () {
            this.labelSellConst.text = zj.LANG("出售获得：");
            this.labelConstSell1.text = zj.LANG("出售全部");
            this.labelConstSell2.text = zj.LANG("出售全部");
            this.labelConstSell3.text = zj.LANG("出售全部");
            this.labelConstSell4.text = zj.LANG("出售全部");
            this.labelConstStar1.text = zj.LANG("1星卡片");
            this.labelConstStar2.text = zj.LANG("2星卡片");
            this.labelConstStar3.text = zj.LANG("3星卡片");
            this.labelConstStar4.text = zj.LANG("4星卡片");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnSellWholeStar1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar1, this);
            this.btnSellWholeStar2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar2, this);
            this.btnSellWholeStar3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar3, this);
            this.btnSellWholeStar4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar4, this);
            this.btnBulkSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBulkSell, this);
            this.groupCheckArr = [
                this.groupCheck1,
                this.groupCheck2,
                this.groupCheck3,
                this.groupCheck4
            ];
        };
        CardSellPopDialog.prototype.loadSellPop = function (father) {
            this.father = father;
            this.freshUI();
        };
        CardSellPopDialog.prototype.freshUI = function () {
            for (var i = 0; i < 4; i++) {
                this.groupCheckArr[i].visible = this.selList[i];
            }
            this.list = [];
            var value = zj.PlayerCardSystem.GetAllSellCardIndexByStar(this.selList);
            for (var i = 0; i < value.length; i++) {
                if (i == value.length - 1) {
                    this.totalMoney = value[i];
                    break;
                }
                this.list[i] = value[i];
            }
            this.labelGetGold.text = this.totalMoney + "";
        };
        CardSellPopDialog.prototype.onBtnSelWholeStar1 = function () {
            this.selList[0] = !this.selList[0];
            this.freshUI();
        };
        CardSellPopDialog.prototype.onBtnSelWholeStar2 = function () {
            this.selList[1] = !this.selList[1];
            this.freshUI();
        };
        CardSellPopDialog.prototype.onBtnSelWholeStar3 = function () {
            this.selList[2] = !this.selList[2];
            this.freshUI();
        };
        CardSellPopDialog.prototype.onBtnSelWholeStar4 = function () {
            this.selList[3] = !this.selList[3];
            this.freshUI();
        };
        CardSellPopDialog.prototype.onBtnBulkSell = function () {
            var _this = this;
            if (this.list.length == 0) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.nothing_sell);
            }
            else {
                zj.Game.PlayerCardSystem.cardSell(this.list)
                    .then(function (value) {
                    _this.father.refreshCardList();
                    _this.close(zj.UI.HIDE_TO_TOP);
                })
                    .catch(function (reason) {
                });
            }
        };
        CardSellPopDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return CardSellPopDialog;
    }(zj.Dialog));
    zj.CardSellPopDialog = CardSellPopDialog;
    __reflect(CardSellPopDialog.prototype, "zj.CardSellPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardSellPopDialog.js.map