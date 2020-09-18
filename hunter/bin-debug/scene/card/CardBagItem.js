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
    // created by hhh in 2018/11/13
    /************** 卡包item ****************/
    var CardBagItem = (function (_super) {
        __extends(CardBagItem, _super);
        function CardBagItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardBagItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardBagItem"], null);
            _this.init();
            return _this;
        }
        CardBagItem.prototype.init = function () {
            this.btnGetCardBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCardBag, this);
            this.imageAni.visible = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this);
        };
        CardBagItem.prototype.onBtnGetCardBag = function () {
            // loadUI(ConfirmOkDialog)
            // .then((dialog: ConfirmOkDialog) => {
            //     dialog.setInfo(TextsConfig.TextsConfig_Hunter_Card.card_bag_tips);
            //     dialog.show(UI.SHOW_FILL_OUT);
            // });
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Hunter_Card.card_bag_tips);
        };
        CardBagItem.prototype.playAni = function () {
            // this.imageAni.visible = true;
            var _this = this;
            // egret.Tween.get(this.imageAni, { loop: true })
            //     .to({ scaleX: 1.03, scaleY: 1.03 }, 800, egret.Ease.sineIn)
            //     .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.sineOut);
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", "003_xuanzhong_anniu3", 0)
                .then(function (display) {
                display.x = _this.groupAniSel.explicitWidth / 2;
                display.y = _this.groupAniSel.explicitHeight / 2;
                _this.groupAniSel.addChild(display);
                display.scaleX = 1;
                display.scaleY = 1;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        CardBagItem.prototype.dataChanged = function () {
            if (this.data == null) {
                this.btnGetCardBag.visible = true;
                this.btnSel.visible = false;
                this.groupCardLevel.visible = false;
                this.imageAni.visible = false;
            }
            else {
                this.btnGetCardBag.visible = false;
                this.btnSel.visible = true;
                this.groupCardLevel.visible = true;
                if (this.data.ani == true) {
                    this.groupAniSel.removeChildren();
                    this.playAni();
                }
                else {
                    this.imageAni.visible = false;
                    this.groupAniSel.removeChildren();
                }
                this.info = this.data.info;
                this.labelCardNum.text = this.info.count + "";
                var imagePath = zj.PlayerItemSystem.ItemConfig(this.info.goodsId).path;
                var btnSelImage = this.btnSel.getChildAt(0);
                btnSelImage.source = zj.cachekey(imagePath, this);
            }
        };
        return CardBagItem;
    }(eui.ItemRenderer));
    zj.CardBagItem = CardBagItem;
    __reflect(CardBagItem.prototype, "zj.CardBagItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardBagItem.js.map