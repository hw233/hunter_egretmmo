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
     * @class The already install card dialog.
     */
    var HunterCardPopDialog = (function (_super) {
        __extends(HunterCardPopDialog, _super);
        function HunterCardPopDialog() {
            var _this = _super.call(this) || this;
            _this.listAttributeData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/hunter/HunterCardPopDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            var tap = egret.TouchEvent.TOUCH_TAP;
            _this.btnClose.addEventListener(tap, _this.onBtnClose, _this);
            _this.btnCardLock.addEventListener(tap, _this.onBtnLock, _this);
            _this.btnCardUnlock.addEventListener(tap, _this.onBtnUnLock, _this);
            _this.btnStrengthen.addEventListener(tap, _this.onBtnStrengthen, _this);
            _this.btnBreak.addEventListener(tap, _this.onBtnBreak, _this);
            _this.btnUpStar.addEventListener(tap, _this.onBtnUpStar, _this);
            _this.btnUnLoad.addEventListener(tap, _this.onBtnUnLoad, _this);
            _this.btnReplace.addEventListener(tap, _this.onBtnReplace, _this);
            return _this;
        }
        /**
         * Set info.
         *
         * @param generalId The hunter's ID.
         * @param pos       The card's position(1-9).
         * @param callback  The callback Function.
         */
        HunterCardPopDialog.prototype.setInfo = function (generalId, cardType, pos, battleValue, callback) {
            this.generalId = generalId;
            this.cardType = cardType;
            this.position = pos;
            this.battleValue = battleValue;
            this.callback = callback;
            this.refresh();
        };
        HunterCardPopDialog.prototype.refresh = function () {
            var cardMap = zj.PlayerHunterSystem.GetHunterCardMap(this.generalId);
            this.cardInfo = cardMap[this.position];
            if (this.cardInfo == null || this.cardInfo == undefined) {
                throw Error("card info is null.");
            }
            var basePotatoInfo = zj.TableItemPotato.Item(this.cardInfo.id);
            var _a = zj.PlayerCardSystem.GetItemFrame(this.cardInfo.id, this.cardInfo), bigFrame = _a[1];
            var cardPath = basePotatoInfo.paths;
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[basePotatoInfo.type - 1];
            var gradePath = zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[basePotatoInfo.rarity - 1];
            this.imgFrame.source = zj.cachekey(bigFrame, this);
            this.imgCard.source = zj.cachekey(cardPath, this);
            this.imgCardType.source = zj.cachekey(cardTypePath, this);
            this.imgGrade.source = zj.cachekey(gradePath, this);
            this.labelCardNum.text = basePotatoInfo.num.toString();
            this.labelCardName.text = basePotatoInfo.name;
            this.labelCardDetails.text = basePotatoInfo.des;
            if (this.cardInfo.break_level <= 0) {
                this.labelCardLevel.text = this.cardInfo.level.toString() + "/" + zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1].toString();
            }
            else {
                this.labelCardLevel.text = this.cardInfo.level.toString() + "/" + (zj.CommonConfig.card_star_max_level[5] + 2 * this.cardInfo.break_level).toString();
            }
            if (this.cardInfo.add_attri.length == 4 && this.cardInfo.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else if (this.cardInfo.add_attri.length == 5 && this.cardInfo.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            }
            this.btnCardLock.visible = this.cardInfo.is_lock;
            this.btnCardUnlock.visible = !this.cardInfo.is_lock;
            this.btnUpStar.visible = (this.cardInfo.star != zj.CommonConfig.card_max_star);
            this.btnBreak.visible = !this.btnUpStar.visible;
            this.setAttributeList();
        };
        HunterCardPopDialog.prototype.setAttributeList = function () {
            // let basePotatoInfo = TableItemPotato.Item(this.cardInfo.id);
            var baseAttributeString = zj.PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level)[0];
            this.labelAttriMain.text = baseAttributeString[0];
            var addAtr = zj.PlayerCardSystem.GetAddStr(this.cardInfo);
            this.listAttributeData.removeAll();
            for (var i = 0; i < addAtr.length; i++) {
                var v = addAtr[i];
                var data = new zj.HunterCardAttriItemData();
                data.index = i;
                data.description = v[0];
                data.cardInfo = this.cardInfo;
                data.fatherArray = addAtr.length;
                this.listAttributeData.addItem(data);
            }
            this.listAttribute.dataProvider = this.listAttributeData;
            this.listAttribute.itemRenderer = zj.HunterCardAttriItem;
        };
        HunterCardPopDialog.prototype.onBtnLock = function () {
            this.sendLockRequest(false);
        };
        HunterCardPopDialog.prototype.onBtnUnLock = function () {
            this.sendLockRequest(true);
        };
        HunterCardPopDialog.prototype.sendLockRequest = function (lock) {
            var _this = this;
            var info = zj.Game.PlayerCardSystem.getCardToHunterInfo(this.cardInfo.index);
            if (info == null) {
                throw Error("card info is null");
            }
            zj.Game.PlayerHunterSystem.potatoLock(info.cHostId, lock, this.cardInfo.pos, 0).then(function () {
                if (lock) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_lock_tips);
                }
                else {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_unlock_tips);
                }
                _this.refresh();
            });
        };
        HunterCardPopDialog.prototype.onBtnStrengthen = function () {
            var _this = this;
            zj.Teach.addTeaching();
            if (this.cardInfo != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPLEVEL, true)) {
                zj.loadUI(zj.CardStrengthenMain).then(function (dialog) {
                    dialog.loadInfo(_this.cardInfo, function (isRefresh, isBreak) {
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
            }
        };
        HunterCardPopDialog.prototype.onBtnBreak = function () {
            var _this = this;
            zj.loadUI(zj.CardBreakMainDialog).then(function (dialog) {
                dialog.loadInfo(_this.cardInfo, function () {
                    _this.refresh();
                }, function () {
                    _this.onBtnClose();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardPopDialog.prototype.onBtnUpStar = function () {
            var _this = this;
            zj.Teach.addTeaching();
            if (this.cardInfo != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPSTAR, true)) {
                zj.loadUI(zj.CardUpStarNewDialog).then(function (dialog) {
                    dialog.setInfo(_this.cardInfo, function () {
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        HunterCardPopDialog.prototype.onBtnUnLoad = function () {
            var _this = this;
            if (this.cardInfo != null && this.cardInfo.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = this.cardInfo.index;
            }
            zj.Game.PlayerHunterSystem.potatoWear(this.generalId, 0, this.position, false).then(function () {
                if (_this.callback) {
                    _this.callback();
                }
                _this.close(zj.UI.HIDE_TO_TOP);
            });
        };
        HunterCardPopDialog.prototype.onBtnReplace = function () {
            var _this = this;
            zj.loadUI(zj.HunterCardReplaceDialog).then(function (dialog) {
                dialog.setInfo(_this.generalId, _this.cardType, _this.position, _this.cardInfo, function () {
                    if (_this.callback) {
                        _this.callback();
                    }
                    _this.refresh();
                }, function () {
                    _this.onBtnClose();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardPopDialog.prototype.onBtnClose = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.battleValue > this.battleValue) {
                zj.CommonTipBmfont.promptBattleValue(this.battleValue, hunterInfo.battleValue);
            }
            if (this.callback) {
                this.callback();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterCardPopDialog;
    }(zj.Dialog));
    zj.HunterCardPopDialog = HunterCardPopDialog;
    __reflect(HunterCardPopDialog.prototype, "zj.HunterCardPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardPopDialog.js.map