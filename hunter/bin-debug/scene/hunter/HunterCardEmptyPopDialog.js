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
     * @date 2018-12-28
     *
     * @class The uninstall card dialog.
     */
    var HunterCardEmptyPopDialog = (function (_super) {
        __extends(HunterCardEmptyPopDialog, _super);
        function HunterCardEmptyPopDialog() {
            var _this = _super.call(this) || this;
            _this.listCardBagData = new eui.ArrayCollection();
            _this.listAttributeData = new eui.ArrayCollection();
            /** The main attribute id for screen. */
            _this.screenMain = [0];
            /** The addition attribute id for screen */
            _this.screenAddition = [0, 0, 0];
            /** The unique id for card. */
            _this.currentSelectedIndex = null;
            _this.isEnd = false;
            _this.itemList = [];
            _this.skinName = "resource/skins/hunter/HunterCardEmptyPopDialogSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.init();
            return _this;
        }
        HunterCardEmptyPopDialog.prototype.init = function () {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            this.groupRight.visible = false;
            this.groupLeft.visible = true;
            this.groupLeft.x = (this.width - this.groupLeft.width) * 0.5;
            this.groupLeft.y = (this.height - this.groupLeft.height) * 0.5;
            this.btnLeftClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnRightClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnScreen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnScreen, this);
            this.btnCardLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLock, this);
            this.btnCardUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnLock, this);
            this.btnStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrengthen, this);
            this.btnBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBreak, this);
            this.btnUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpStar, this);
            this.btnInstall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInstall, this);
        };
        /**
         * Set info.
         *
         * @param generalId The hunter's ID.
         * @param cardType  The card's Type(1-6).
         * @param pos       The card's position(1-9).
         * @param callback  The callback Function.
         */
        HunterCardEmptyPopDialog.prototype.setInfo = function (generalId, cardType, pos, callback, cb) {
            // 添加背景
            var rect_back = new eui.Rect();
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            rect_back.name = "__rect_back";
            this.addChildAt(rect_back, 0);
            rect_back.width = zj.UIManager.StageWidth;
            rect_back.height = zj.UIManager.StageHeight * 1.5;
            rect_back.x = 0;
            rect_back.y = -zj.UIManager.StageHeight * 0.5;
            this.y = -zj.UIManager.StageHeight;
            egret.Tween.get(this).to({ y: 0 }, 300, egret.Ease.backOut).call(function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            });
            this.generalId = generalId;
            this.cardType = cardType;
            this.position = pos;
            this.callback = callback;
            this.cb = cb;
            this.refresh();
            zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.HunterCardEmptyPopDialog" });
        };
        HunterCardEmptyPopDialog.prototype.refresh = function () {
            var namePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_title[this.cardType - 1];
            this.imgCardTypeName.source = zj.cachekey(namePath, this);
            this.loadCardBagList();
            // fix bug: lock or unlock success, refresh the right ui
            if (this.currentSelectedIndex != null) {
                this.setRightUI();
            }
        };
        HunterCardEmptyPopDialog.prototype.loadCardBagList = function () {
            var cardList = zj.PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);
            this.listCardBagData.removeAll();
            for (var i = 0; i < cardList.length; i++) {
                var v = cardList[i];
                var data = new zj.HunterCardPopItemData();
                data.info = v;
                data.cardType = this.cardType;
                if (this.currentSelectedIndex != null && v instanceof message.PotatoInfo) {
                    data.isSelected = (this.currentSelectedIndex == v.index);
                }
                this.listCardBagData.addItem(data);
            }
            this.listCardBag.dataProvider = this.listCardBagData;
            this.listCardBag.itemRenderer = zj.HunterCardPopItem;
            this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
        };
        HunterCardEmptyPopDialog.prototype.onCardListTap = function (e) {
            var data = this.listCardBagData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            var thisOne = this;
            if ((data.info instanceof message.PotatoInfo) == false) {
                zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                    // set item id
                    var goodsId = zj.TableEnum.Enum.CardTypeDropId[thisOne.cardType - 1];
                    dialog.setInfo(goodsId, thisOne, function () {
                        thisOne.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                return;
            }
            data.isSelected = true;
            this.listCardBagData.replaceItemAt(data, e.itemIndex);
            if (this.currentSelectedIndex != e.itemIndex) {
                var _a = this.getSelectedCard(), lastIndex = _a[0], lastData = _a[1];
                if (lastIndex != null && lastData != null) {
                    lastData.isSelected = false;
                    this.listCardBagData.replaceItemAt(lastData, lastIndex);
                }
            }
            if (this.currentSelectedIndex == null) {
                this.showAnimation();
            }
            this.currentSelectedIndex = data.info.index;
            this.setRightUI();
            if (zj.Game.TeachSystem.curPart == 8006 || zj.Game.TeachSystem.curPart == 8022)
                zj.Teach.addTeaching();
        };
        HunterCardEmptyPopDialog.prototype.getSelectedCard = function () {
            var index = null;
            var selectedData = null;
            for (var i = 0; i < this.listCardBagData.length; i++) {
                var data = this.listCardBagData.getItemAt(i);
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
        HunterCardEmptyPopDialog.prototype.showAnimation = function () {
            var _this = this;
            var centerX = this.width * 0.5;
            var centerY = this.height * 0.5;
            var space = 0;
            var leftDestX = centerX - this.groupLeft.width - space;
            egret.Tween.get(this.groupLeft).
                to({ x: leftDestX }, 500, egret.Ease.backInOut).
                call(function () {
                _this.groupRight.visible = true;
                var rightDestX = centerX + space;
                var rightDestY = centerY - _this.groupRight.height * 0.5;
                _this.groupRight.x = rightDestX;
                _this.groupRight.y = 0 - _this.groupRight.height;
                egret.Tween.get(_this.groupRight).to({ y: rightDestY }, 350, egret.Ease.sineOut).call(function () {
                    _this.isEnd = true;
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
            });
        };
        HunterCardEmptyPopDialog.prototype.hideAnimation = function () {
            var _this = this;
            if (this.groupRight.visible == false)
                return;
            var centerX = this.width * 0.5;
            var space = 0;
            var leftDestX = centerX - this.groupLeft.width * 0.5;
            var rightDestX = centerX + space;
            var rightDestY = 0 - this.groupRight.height * 0.5;
            egret.Tween.get(this.groupRight).call(function () {
                _this.groupRight.x = rightDestX;
                _this.groupRight.y = rightDestY;
                _this.groupRight.visible = false;
                _this.currentSelectedIndex = null;
                egret.Tween.get(_this.groupLeft).to({ x: leftDestX }, 200);
            });
        };
        HunterCardEmptyPopDialog.prototype.setRightUI = function () {
            var _a = this.getSelectedCard(), data = _a[1];
            if (data.info instanceof message.PotatoInfo) {
                var potatoInfo = zj.TableItemPotato.Item(data.info.id);
                if (potatoInfo == null) {
                    zj.toast_warning("potato info is null");
                    return;
                }
                var _b = zj.PlayerCardSystem.GetItemFrame(data.info.id, data.info), framePath = _b[1];
                var cardPath = potatoInfo.paths;
                var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[potatoInfo.type - 1];
                var gradePath = zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[potatoInfo.rarity - 1];
                this.imgFrame.source = zj.cachekey(framePath, this);
                this.imgCard.source = zj.cachekey(cardPath, this);
                this.imgCardType.source = zj.cachekey(cardTypePath, this);
                this.imgGrade.source = zj.cachekey(gradePath, this);
                this.labelCardNum.text = potatoInfo.num.toString();
                this.labelCardName.text = potatoInfo.name;
                this.labelCardDetails.text = potatoInfo.des;
                this.btnCardLock.visible = data.info.is_lock;
                this.btnCardUnlock.visible = !data.info.is_lock;
                if (data.info.add_attri.length == 4 && data.info.star < 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                }
                else if (data.info.add_attri.length == 5 && data.info.star >= 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                }
                else {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, data.info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
                }
                if (data.info.break_level <= 0) {
                    this.labelCardLevel.text = data.info.level.toString() + "/" + zj.CommonConfig.card_star_max_level[data.info.star - 1].toString();
                }
                else {
                    this.labelCardLevel.text = data.info.level.toString() + "/" + (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * data.info.break_level).toString();
                }
                this.btnUpStar.visible = (data.info.star != zj.CommonConfig.card_max_star);
                this.btnBreak.visible = !this.btnUpStar.visible;
                this.setAttributeList();
            }
            else {
                throw Error("type error");
            }
        };
        HunterCardEmptyPopDialog.prototype.setAttributeList = function () {
            var _a = this.getSelectedCard(), data = _a[1];
            var info = data.info;
            var baseAttribute = zj.PlayerCardSystem.GetCardBaseAttri(info.id, info.star, info.level)[0];
            this.labelAttriMain.text = baseAttribute[0];
            var addAtr = zj.PlayerCardSystem.GetAddStr(info);
            this.listAttributeData.removeAll();
            for (var i = 0; i < addAtr.length; i++) {
                var v = addAtr[i];
                var data_1 = new zj.HunterCardAttriItemData();
                data_1.index = i;
                data_1.description = v[0];
                data_1.fatherArray = addAtr.length;
                data_1.cardInfo = info;
                this.listAttributeData.addItem(data_1);
            }
            this.listAttribute.dataProvider = this.listAttributeData;
            this.listAttribute.itemRenderer = zj.HunterCardAttriItem;
        };
        HunterCardEmptyPopDialog.prototype.onBtnScreen = function () {
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
                        if (v != 0) {
                            changed = true;
                            break;
                        }
                    }
                    _this.screenAddition = selectedAddition;
                    if (changed) {
                        _this.hideAnimation();
                    }
                    _this.loadCardBagList();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardEmptyPopDialog.prototype.onBtnStrengthen = function () {
            var _this = this;
            zj.loadUI(zj.CardStrengthenMain).then(function (dialog) {
                var _a = _this.getSelectedCard(), data = _a[1];
                if (data == null) {
                    throw Error("potato info is null");
                }
                var info = data.info;
                dialog.loadInfo(info, function (isRefresh, isBreak) {
                    if (isRefresh) {
                        _this.refresh();
                    }
                    if (isBreak) {
                        egret.setTimeout(function () {
                            _this.onBtnBreak();
                        }, _this, 500);
                    }
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardEmptyPopDialog.prototype.onBtnBreak = function () {
            var _this = this;
            zj.loadUI(zj.CardBreakMainDialog).then(function (dialog) {
                var _a = _this.getSelectedCard(), data = _a[1];
                if (data == null) {
                    throw Error("potato info is null");
                }
                var info = data.info;
                dialog.loadInfo(info, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardEmptyPopDialog.prototype.onBtnUpStar = function () {
            var _this = this;
            zj.loadUI(zj.CardUpStarNewDialog).then(function (dialog) {
                var _a = _this.getSelectedCard(), data = _a[1];
                if (data == null) {
                    throw Error("potato info is null");
                }
                var info = data.info;
                dialog.setInfo(info, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardEmptyPopDialog.prototype.onBtnInstall = function () {
            var _this = this;
            var _a = this.getSelectedCard(), data = _a[1];
            if (data == null) {
                throw Error("potato info is null");
            }
            var info = data.info;
            zj.Game.PlayerHunterSystem.potatoWear(this.generalId, info.index, this.position, false).then(function () {
                zj.Game.PlayerCardSystem.deleteCardByIndex(info.index);
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30055));
                _this.close(zj.UI.HIDE_TO_TOP);
                if (_this.callback) {
                    _this.callback(true);
                }
            });
            if (zj.Teach.m_bOpenTeach && zj.Game.TeachSystem.curPart == 8006) {
                // Teach.addTeaching();
            }
        };
        HunterCardEmptyPopDialog.prototype.onBtnLock = function () {
            this.sendLockRequest(false);
        };
        HunterCardEmptyPopDialog.prototype.onBtnUnLock = function () {
            this.sendLockRequest(true);
        };
        HunterCardEmptyPopDialog.prototype.sendLockRequest = function (lock) {
            var _this = this;
            var _a = this.getSelectedCard(), data = _a[1];
            if (data == null) {
                throw Error("potato info is null");
            }
            var info = data.info;
            zj.Game.PlayerHunterSystem.potatoLock(0, lock, 0, info.index).
                then(function () {
                if (lock) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_lock_tips);
                }
                else {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_unlock_tips);
                }
                _this.refresh();
            });
        };
        HunterCardEmptyPopDialog.prototype.onBtnClose = function () {
            var _this = this;
            var rect_back = this.getChildByName("__rect_back");
            if (rect_back && rect_back.parent)
                rect_back.parent.removeChild(rect_back);
            egret.Tween.get(this).to({ y: -zj.UIManager.StageHeight }, 500, egret.Ease.backIn).call(function () {
                _this.cb();
            });
        };
        HunterCardEmptyPopDialog.prototype.getItemList = function () {
            this.itemList = [];
            var cardList = zj.PlayerCardSystem.GetCardByTypeAndAttr(this.cardType, this.screenMain, this.screenAddition);
            for (var i = 0; i < cardList.length; i++) {
                var item = this.listCardBag.getElementAt(i);
                this.itemList.push(item);
            }
        };
        return HunterCardEmptyPopDialog;
    }(zj.UI));
    zj.HunterCardEmptyPopDialog = HunterCardEmptyPopDialog;
    __reflect(HunterCardEmptyPopDialog.prototype, "zj.HunterCardEmptyPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardEmptyPopDialog.js.map