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
    // created by hhh in 2018/11/6
    /************** card主界面 ****************/
    var CardMainScene = (function (_super) {
        __extends(CardMainScene, _super);
        function CardMainScene() {
            var _this = _super.call(this) || this;
            _this.addUIs = [null, null, null, null];
            _this.rightButtons = [];
            _this.rightButtonSps = [];
            _this.curUI = 0;
            _this.lastUI = 1;
            _this.skinName = "resource/skins/card/CardMainSceneSkin.exml";
            _this.init();
            return _this;
        }
        CardMainScene.prototype.init = function () {
            var _this = this;
            this.rightButtons = [
                this.btnCard,
                this.btnCardBag,
                this.btnCardCompose,
                this.btnCardPokedex
            ];
            this.rightButtonSps = [
                this.btnCardSp,
                this.btnCardBagSp,
                this.btnCardComposeSp,
                this.btnCardPokedexSp
            ];
            this.btnCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCard, this);
            this.btnCardBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardBag, this);
            this.btnCardCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardPokedex, this);
            this.btnCardPokedex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardCompose, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            this.Update();
            this.initUI();
            this.setTips();
            this.refreshGold();
        };
        CardMainScene.prototype.Update = function () {
            this.setTips();
            this.refreshGold();
        };
        CardMainScene.prototype.refreshGold = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
        };
        CardMainScene.prototype.initUI = function () {
            this.selectUI(1);
        };
        CardMainScene.prototype.selectUI = function (index) {
            this.curUI = index;
            var curIndex = index - 1;
            this.setRightButtons(curIndex);
            if (this.addUIs[curIndex] == null) {
                this.addSubCardUI(curIndex);
            }
            else {
                this.setSubCardUISelected(curIndex);
            }
            this.lastUI = this.curUI;
        };
        CardMainScene.prototype.addSubCardUI = function (type) {
            var _this = this;
            if (type == 0) {
                zj.loadUI(zj.CardInfo)
                    .then(function (cardInfo) {
                    cardInfo.verticalCenter = 0;
                    _this.groupCenter.addChild(cardInfo);
                    cardInfo.name = "cardInfo";
                    cardInfo.alpha = 0;
                    _this.addUIs[type] = cardInfo;
                    _this.setSubCardUISelected(type);
                });
            }
            else if (type == 1) {
                zj.loadUI(zj.CardBag)
                    .then(function (cardBag) {
                    cardBag.verticalCenter = 0;
                    _this.groupCenter.addChild(cardBag);
                    cardBag.name = "cardBag";
                    cardBag.alpha = 0;
                    cardBag.cb(_this.callback);
                    _this.addUIs[type] = cardBag;
                    _this.setSubCardUISelected(type);
                });
            }
            else if (type == 2) {
                zj.loadUI(zj.CardCompose)
                    .then(function (cardCompose) {
                    cardCompose.verticalCenter = 0;
                    _this.groupCenter.addChild(cardCompose);
                    cardCompose.name = "cardCompose";
                    cardCompose.alpha = 0;
                    _this.addUIs[type] = cardCompose;
                    _this.setSubCardUISelected(type);
                });
            }
            else if (type == 3) {
                zj.loadUI(zj.CardPokedex)
                    .then(function (cardPokedex) {
                    cardPokedex.verticalCenter = 0;
                    _this.groupCenter.addChild(cardPokedex);
                    cardPokedex.name = "cardPokedex";
                    cardPokedex.alpha = 0;
                    _this.addUIs[type] = cardPokedex;
                    _this.setSubCardUISelected(type);
                });
            }
        };
        CardMainScene.prototype.setSubCardUISelected = function (index) {
            for (var i = 0; i < this.addUIs.length; i++) {
                if (this.addUIs[i] != null) {
                    this.addUIs[i].setSelect(i == index);
                }
            }
        };
        CardMainScene.prototype.setRightButtons = function (index) {
            var _this = this;
            for (var i = 0; i < this.rightButtons.length; i++) {
                this.rightButtons[i].enabled = (this.curUI != i + 1);
            }
            var _loop_1 = function (j) {
                if (this_1.curUI == j + 1) {
                    var initX = this_1.rightButtonSps[j].x;
                    egret.Tween.get(this_1.rightButtonSps[j])
                        .call(function () { _this.rightButtonSps[j].visible = true; })
                        .to({ x: initX + 50 }, 0)
                        .to({ x: initX + 5 }, 200, egret.Ease.backInOut);
                }
                else if (this_1.lastUI != null && this_1.lastUI == j + 1) {
                    var initX = this_1.rightButtonSps[j].x;
                    egret.Tween.get(this_1.rightButtonSps[j])
                        .to({ x: initX + 45 }, 200, egret.Ease.backInOut)
                        .call(function () { _this.rightButtonSps[j].visible = false; })
                        .to({ x: initX - 5 }, 0);
                }
            };
            var this_1 = this;
            for (var j = 0; j < this.rightButtonSps.length; j++) {
                _loop_1(j);
            }
        };
        CardMainScene.prototype.onBtnCard = function () {
            this.selectUI(1);
        };
        /**
         * 打开卡包
         *
         * @param cb 回调函数， 获得卡片之后，执行回调函数
         */
        CardMainScene.prototype.onBtnCardBag = function (cb) {
            this.callback = cb;
            this.selectUI(2);
        };
        CardMainScene.prototype.onBtnCardPokedex = function () {
            this.selectUI(3);
        };
        CardMainScene.prototype.onBtnCardCompose = function () {
            this.selectUI(4);
        };
        CardMainScene.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        CardMainScene.prototype.onBtnAddGold = function () {
            //toast("加金币功能未开启");
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                // dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.moneys));
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        CardMainScene.prototype.setTips = function () {
            this.imageCardBagTips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.POTATO, 1);
            this.imageCardComposeTips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.POTATO, 3);
        };
        /**
         * 卡片模块(外部调用)
         * @param type 类型 0卡片 1卡包 2碎片 3图鉴
         */
        CardMainScene.prototype.addUI = function (type) {
            this.addSubCardUI(type);
        };
        return CardMainScene;
    }(zj.Scene));
    zj.CardMainScene = CardMainScene;
    __reflect(CardMainScene.prototype, "zj.CardMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=CardMainScene.js.map