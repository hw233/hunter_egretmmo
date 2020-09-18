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
    // created by hhh in 2018/11/8
    /************** 卡包界面 ****************/
    var CardBag = (function (_super) {
        __extends(CardBag, _super);
        function CardBag() {
            var _this = _super.call(this) || this;
            _this.curSel = 0;
            _this.lastSel = 0;
            _this.cardBagGoods = new Array();
            _this.listDataArr = new eui.ArrayCollection();
            _this.isFirstOpen = true;
            _this.isAniEnd = false;
            _this.itemList = [];
            _this.skinName = "resource/skins/card/CardBagSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupContent); // 因为是循环播放，需要特别处理
            }, null);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        CardBag.prototype.init = function () {
            this.btnOpenCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpenCard, this);
            this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);
            this.groupCard.visible = false;
            this.imageOpenCardBag.visible = false;
            this.setUI();
            this.aniPlay();
        };
        CardBag.prototype.aniPlay = function () {
            var _this = this;
            egret.Tween.get(this.groupContent, { loop: true })
                .to({ y: 7 }, 700, egret.Ease.sineOut)
                .to({ y: 0 }, 700, egret.Ease.sineIn);
            var squareMask = new egret.Shape();
            squareMask.graphics.beginFill(0xff0000);
            squareMask.graphics.drawRect(this.groupBgSpine.x, this.groupBgSpine.y, this.groupBgSpine.width, this.groupBgSpine.height - 4);
            squareMask.graphics.endFill();
            zj.Game.DragonBonesManager.playAnimation(this, "cardpart", "armatureName", null, 0)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupBgSpine.height;
                _this.containerGroup.addChild(squareMask);
                display.mask = squareMask;
                _this.groupBgSpine.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        CardBag.prototype.setUI = function () {
            this.cardBagGoods = zj.PlayerCardSystem.GetAllCardBag();
            var _a = zj.Table.FindR(this.cardBagGoods, function (_k, _v) {
                return _v.goodsId == 139001;
            }), _ = _a[0], key = _a[1];
            this._teachIndex = key == null ? 1 : key;
            this.setLeftList();
        };
        CardBag.prototype.setLeftList = function () {
            if (this.cardBagGoods.length != 0) {
                this.groupCard.visible = true;
                this.groupNoCard.visible = false;
                if (this.curSel >= this.cardBagGoods.length)
                    this.curSel = this.cardBagGoods.length - 1 >= 0 ? this.cardBagGoods.length - 1 : -1;
                this.listCardBag.itemRenderer = zj.CardBagItem;
                var cardBagArr = [];
                for (var i = 0; i < this.cardBagGoods.length + 1; i++) {
                    if (i == this.cardBagGoods.length) {
                        cardBagArr[i] = null;
                        break;
                    }
                    cardBagArr[i] = { index: i, info: this.cardBagGoods[i], ani: i == this.curSel };
                }
                this.listDataArr.source = cardBagArr;
                this.listCardBag.dataProvider = this.listDataArr;
                this.listCardBag.selectedIndex = this.curSel;
                this.lastSel = this.curSel;
                if (this.isFirstOpen) {
                    this.showCardUI(this.curSel);
                    this.isFirstOpen = false;
                }
                else {
                    this.showCardAni(this.curSel);
                }
            }
            else {
                this.listCardBag.itemRenderer = zj.CardBagItem;
                this.listCardBag.dataProvider = new eui.ArrayCollection([null]);
                this.groupCard.visible = false;
                this.groupNoCard.visible = true;
            }
            if (this.cardBagGoods.length != 0 && this.cardBagGoods != null) {
                var aa = this.cardBagGoods[this.curSel].goodsId;
                var index = this.getCardIndex(aa);
                this.scrollList(index);
            }
            else {
                return;
            }
        };
        CardBag.prototype.getCardIndex = function (id) {
            var index = -1;
            if (id == null || id == undefined || id == 0) {
                return index;
            }
            for (var i = 0; i < this.cardBagGoods.length; i++) {
                var data = this.cardBagGoods[i];
                if (data.goodsId != null && data.goodsId == id) {
                    index = i;
                }
            }
            return index;
        };
        CardBag.prototype.scrollList = function (selectedIndex) {
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            if (selectedIndex > 4) {
                var item = new zj.CardBagItem();
                var gap = 6;
                var scrollWidth = (item.height + gap) * selectedIndex;
                egret.Tween.get(this.listCardBag)
                    .to({ scrollV: scrollWidth }, 350, egret.Ease.backIn);
            }
        };
        CardBag.prototype.showCardUI = function (index) {
            this.groupCardUI.alpha = 0;
            this.imageCardBig.alpha = 0;
            this.showCardAni(index);
        };
        CardBag.prototype.showCardAni = function (index) {
            var _this = this;
            this.isAniEnd = false;
            egret.Tween.get(this.groupCardUI).to({ alpha: 1 }, 200);
            this.btnOpenCard.enabled = true;
            var beginX = this.imageCardBig.x;
            egret.Tween.get(this.imageCardBig)
                .to({ alpha: 0, x: beginX + 200 }, 500, egret.Ease.backIn)
                .to({ x: beginX - 200 })
                .call(function () { _this.setBigCard(index); })
                .to({ alpha: 1, x: beginX }, 400, egret.Ease.backOut)
                .call(function () { _this.isAniEnd = true; });
        };
        CardBag.prototype.setBigCard = function (index) {
            var itemId = this.cardBagGoods[index].goodsId;
            var itemInfo = zj.PlayerItemSystem.ItemConfig(itemId);
            this.imageCardBig.source = zj.cachekey(itemInfo.path_big, this);
            this.labelCardName.text = itemInfo.name;
            this.labelOpenTip.text = itemInfo.des;
        };
        CardBag.prototype.onCardSelChange = function () {
            if (this.isAniEnd == false)
                return;
            if (this.listCardBag.selectedIndex == this.cardBagGoods.length) {
                this.listCardBag.selectedIndex = this.curSel;
                return;
            }
            if (this.curSel == this.listCardBag.selectedIndex)
                return;
            this.curSel = this.listCardBag.selectedIndex;
            this.listDataArr.replaceItemAt({ index: this.lastSel, info: this.cardBagGoods[this.lastSel], ani: false }, this.lastSel);
            this.listDataArr.replaceItemAt({ index: this.curSel, info: this.cardBagGoods[this.curSel], ani: true }, this.curSel);
            this.lastSel = this.curSel;
            this.showCardAni(this.curSel);
        };
        CardBag.prototype.onBtnOpenCard = function () {
            var _this = this;
            if (this.isAniEnd == false)
                return;
            zj.Game.PlayerInfoSystem.playAnnouce = false;
            zj.Game.PlayerCardSystem.cardBagOpen(this.cardBagGoods[this.curSel].goodsId)
                .then(function (value) {
                _this.playBreakBag(value);
                if (_this.callBack) {
                    _this.callBack();
                }
            })
                .catch(function (reason) {
                zj.Game.PlayerInfoSystem.playAnnouce = true;
            });
        };
        CardBag.prototype.cb = function (cb) {
            this.callBack = cb;
        };
        CardBag.prototype.playBreakBag = function (cardInfos) {
            var _this = this;
            egret.Tween.get(this.groupCardUI).to({ alpha: 0 }, 200);
            this.btnOpenCard.enabled = false;
            zj.Game.DragonBonesManager.playAnimation(this, "cardopen", "armatureName", null, 1)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupBgSpine.height;
                _this.groupBgSpine.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "cardopen2", "armatureName", null, 1)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupSpine.height;
                _this.groupSpine.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            egret.Tween.get(this.imageCardBig)
                .to({ alpha: 0 }, 800)
                .wait(500)
                .call(function () {
                zj.loadUI(zj.CardBagPopDialog)
                    .then(function (dialog) {
                    dialog.playAni(cardInfos, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        CardBag.prototype.getItemList = function () {
            this.itemList = [];
            for (var i = 0; i < this.cardBagGoods.length + 1; i++) {
                var item = this.listCardBag.getElementAt(i);
                this.itemList.push(item);
            }
        };
        return CardBag;
    }(zj.CardBase));
    zj.CardBag = CardBag;
    __reflect(CardBag.prototype, "zj.CardBag");
})(zj || (zj = {}));
//# sourceMappingURL=CardBag.js.map