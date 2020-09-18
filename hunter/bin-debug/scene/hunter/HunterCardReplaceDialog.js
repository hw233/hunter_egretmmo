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
     * @author chen xi
     *
     * @date 2018-1-4
     */
    var HunterCardReplaceDialog = (function (_super) {
        __extends(HunterCardReplaceDialog, _super);
        function HunterCardReplaceDialog() {
            var _this = _super.call(this) || this;
            _this.listCardData = new eui.ArrayCollection();
            _this.listEquipAttributeData = new eui.ArrayCollection();
            _this.listReplaceAttributeData = new eui.ArrayCollection();
            /** The main attribute id for screen. */
            _this.screenMain = [0];
            /** The addition attribute id for screen */
            _this.screenAddition = [0, 0, 0];
            _this.cardInfo = null;
            _this.selectedCardInfo = null;
            _this.skinName = "resource/skins/hunter/HunterCardReplaceDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        HunterCardReplaceDialog.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnCloseCard.addEventListener(tap, this.onBtnClose, this);
            this.btnScreen.addEventListener(tap, this.onBtnScreen, this);
            this.btnReplace.addEventListener(tap, this.onBtnReplace, this);
            this.hideAnimation();
        };
        /**
         * 设置基本信息
         *
         * @param callback 替换成功，调用该回调函数
         */
        HunterCardReplaceDialog.prototype.setInfo = function (generalId, cardType, position, info, callback, cb) {
            this.generalId = generalId;
            this.cardType = cardType;
            this.position = position;
            this.cardInfo = info;
            this.callback = callback;
            this.cb = cb;
            this.refresh();
        };
        HunterCardReplaceDialog.prototype.refresh = function () {
            this.loadCardList();
            this.setCurrenCardInfo();
        };
        HunterCardReplaceDialog.prototype.loadCardList = function () {
            var cardList = zj.PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);
            this.listCardData.removeAll();
            for (var i = 0; i < cardList.length; i++) {
                var v = cardList[i];
                var data = new zj.HunterCardPopItemData();
                data.info = v;
                data.cardType = this.cardType;
                if (this.currentSelectedIndex != null && v instanceof message.PotatoInfo) {
                    data.isSelected = (this.currentSelectedIndex == v.index);
                }
                this.listCardData.addItem(data);
            }
            this.listCard.dataProvider = this.listCardData;
            this.listCard.itemRenderer = zj.HunterCardPopItem;
            this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
        };
        HunterCardReplaceDialog.prototype.onCardListTap = function (e) {
            var _this = this;
            var data = this.listCardData.getItemAt(e.itemIndex);
            if ((data.info instanceof message.PotatoInfo) == false) {
                zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                    // set item id
                    var goodsId = zj.TableEnum.Enum.CardTypeDropId[_this.cardType - 1];
                    dialog.setInfo(goodsId, _this, function () {
                        _this.refresh();
                        _this.onBtnClose();
                        if (_this.cb) {
                            _this.cb();
                        }
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                return;
            }
            data.isSelected = true;
            this.listCardData.replaceItemAt(data, e.itemIndex);
            if (this.currentSelectedIndex != e.itemIndex) {
                var _a = this.getSelectedCard(), lastIndex = _a[0], lastData = _a[1];
                if (lastIndex != null && lastData != null) {
                    lastData.isSelected = false;
                    this.listCardData.replaceItemAt(lastData, lastIndex);
                }
            }
            if (this.currentSelectedIndex == null) {
                this.showAnimation();
            }
            this.currentSelectedIndex = data.info.index;
            this.setReplaceCardInfo(data.info);
        };
        HunterCardReplaceDialog.prototype.getSelectedCard = function () {
            var index = null;
            var selectedData = null;
            for (var i = 0; i < this.listCardData.length; i++) {
                var data = this.listCardData.getItemAt(i);
                if (data.info instanceof message.PotatoInfo) {
                    if (data.info.index == this.currentSelectedIndex) {
                        index = i;
                        selectedData = data;
                        break;
                    }
                }
            }
            return [index, selectedData];
        };
        HunterCardReplaceDialog.prototype.setCurrenCardInfo = function () {
            var basePotatoInfo = zj.TableItemPotato.Item(this.cardInfo.id);
            var _a = zj.PlayerCardSystem.GetItemFrame(this.cardInfo.id, this.cardInfo), framePath = _a[1];
            var cardPath = basePotatoInfo.paths;
            var typePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
            this.imgEquipFrame.source = zj.cachekey(framePath, this);
            this.imgEquipCard.source = zj.cachekey(cardPath, this);
            this.imgEquipCardType.source = zj.cachekey(typePath, this);
            this.labelEquipCardName.text = basePotatoInfo.name;
            this.labelEquipCardNumber.text = basePotatoInfo.num.toString();
            this.labelEquipLevel.text = this.cardInfo.level.toString();
            this.labelEquipCardDetails.text = basePotatoInfo.des;
            if (this.cardInfo.add_attri.length == 4 && this.cardInfo.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else if (this.cardInfo.add_attri.length == 5 && this.cardInfo.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupEquipStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            }
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(basePotatoInfo.id, this.cardInfo.star, this.cardInfo.level)[0];
            this.labelEquipAttribute.text = baseStr[0];
            var addAtr = zj.PlayerCardSystem.GetAddStr(this.cardInfo);
            this.listEquipAttributeData.removeAll();
            for (var i = 0; i < addAtr.length; i++) {
                var v = addAtr[i];
                var data = new zj.HunterCardAttriItemData();
                data.index = i;
                data.description = v[0];
                data.cardInfo = this.cardInfo;
                data.fatherArray = addAtr.length;
                this.listEquipAttributeData.addItem(data);
            }
            this.listEquipAttribute.dataProvider = this.listEquipAttributeData;
            this.listEquipAttribute.itemRenderer = zj.HunterCardReplaceItem;
        };
        HunterCardReplaceDialog.prototype.setReplaceCardInfo = function (info) {
            this.selectedCardInfo = info;
            var basePotatoInfo = zj.TableItemPotato.Item(info.id);
            var _a = zj.PlayerCardSystem.GetItemFrame(info.id, info), framePath = _a[1];
            var cardPath = basePotatoInfo.paths;
            var typePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
            this.imgReplaceFrame.source = zj.cachekey(framePath, this);
            this.imgReplaceCard.source = zj.cachekey(cardPath, this);
            this.imgReplaceCardType.source = zj.cachekey(typePath, this);
            this.labelReplaceCardName.text = basePotatoInfo.name;
            this.labelReplaceCardNumber.text = basePotatoInfo.num.toString();
            this.labelReplaceLevel.text = info.level.toString();
            this.labelReplaceCardDetails.text = basePotatoInfo.des;
            if (info.add_attri.length == 4 && info.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else if (info.add_attri.length == 5 && info.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupReplaceStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            }
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(basePotatoInfo.id, info.star, info.level)[0];
            this.labelReplaceAttribute.text = baseStr[0];
            var addAtr = zj.PlayerCardSystem.GetAddStr(info);
            this.listReplaceAttributeData.removeAll();
            for (var i = 0; i < addAtr.length; i++) {
                var v = addAtr[i];
                var data = new zj.HunterCardAttriItemData();
                data.description = v[0];
                data.index = i;
                data.cardInfo = info;
                data.fatherArray = addAtr.length;
                this.listReplaceAttributeData.addItem(data);
            }
            this.listReplaceAttribute.dataProvider = this.listReplaceAttributeData;
            this.listReplaceAttribute.itemRenderer = zj.HunterCardReplaceItem;
        };
        HunterCardReplaceDialog.prototype.showAnimation = function () {
            var _this = this;
            if (this.groupReplace.visible == true)
                return;
            egret.Tween.get(this.groupEquipe).to({ y: 0 }, 500, egret.Ease.backInOut);
            var groupButtonY = this.groupRight.height - this.groupButton.height;
            egret.Tween.get(this.groupButton).to({ y: groupButtonY }, 500, egret.Ease.backInOut);
            egret.Tween.get(this.groupReplace).
                wait(500).
                call(function () {
                _this.groupReplace.x = _this.groupReplace.width;
                _this.groupReplace.y = _this.groupEquipe.height;
            }).
                to({ visible: true }, 0).
                to({ x: 0 }, 500, egret.Ease.sineOut);
        };
        HunterCardReplaceDialog.prototype.hideAnimation = function () {
            this.groupReplace.visible = false;
            var totalHeight = this.groupEquipe.height + this.groupButton.height;
            var equipY = this.groupRight.height * 0.5 - totalHeight * 0.5;
            this.groupEquipe.y = equipY;
            this.groupButton.y = equipY + this.groupEquipe.height;
        };
        HunterCardReplaceDialog.prototype.onBtnScreen = function () {
            var _this = this;
            zj.loadUI(zj.CommonPotatoScreen).then(function (dialog) {
                dialog.setInfo(_this.screenMain, _this.screenAddition, function (selectedMain, selectedAddition) {
                    var changed = false;
                    if (selectedMain[0] != _this.screenMain[0]) {
                        changed = true;
                    }
                    _this.screenMain = selectedMain;
                    for (var i = 0; i < selectedAddition.length; i++) {
                        var v = selectedAddition[i];
                        if (v == _this.screenAddition[i]) {
                            changed = true;
                            break;
                        }
                    }
                    _this.screenAddition = selectedAddition;
                    if (changed) {
                        _this.currentSelectedIndex = null;
                        _this.selectedCardInfo = null;
                        _this.hideAnimation();
                    }
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardReplaceDialog.prototype.onBtnReplace = function () {
            var _this = this;
            if (this.selectedCardInfo == null) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter.not_choose_card);
                return;
            }
            zj.Game.PlayerHunterSystem.potatoWear(this.generalId, this.selectedCardInfo.index, this.position, false).
                then(function () {
                zj.Game.PlayerCardSystem.deleteCardByIndex(_this.selectedCardInfo.index);
                if (_this.callback) {
                    _this.callback();
                }
                _this.onBtnClose();
            });
        };
        HunterCardReplaceDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterCardReplaceDialog;
    }(zj.Dialog));
    zj.HunterCardReplaceDialog = HunterCardReplaceDialog;
    __reflect(HunterCardReplaceDialog.prototype, "zj.HunterCardReplaceDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardReplaceDialog.js.map