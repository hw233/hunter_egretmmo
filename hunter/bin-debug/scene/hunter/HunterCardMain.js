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
     * @description The car ui in hunter module.
     */
    var HunterCardMain = (function (_super) {
        __extends(HunterCardMain, _super);
        function HunterCardMain() {
            var _this = _super.call(this) || this;
            _this.listCardData = new eui.ArrayCollection();
            _this.itemList = [];
            _this.skinName = "resource/skins/hunter/HunterCardMainSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBag, _this);
            _this.btnUnLoad.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onUnLoad, _this);
            _this.update = egret.setInterval(_this.setTips, _this, 1000);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, _this);
            _this.setTips();
            return _this;
        }
        HunterCardMain.prototype.reloadGeneral = function () {
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var cardMap = zj.PlayerHunterSystem.GetHunterCardMap(this.generalId);
            this.listCardData.removeAll();
            for (var i = 0; i < 9; i++) {
                var data = new zj.HunterCardMainItemData();
                data.generalId = this.generalId;
                data.cardType = baseGeneralInfo.card_type[i];
                data.cardLevel = baseGeneralInfo.card_level[i];
                data.cardInfo = cardMap[i + 1];
                data.father = this;
                this.listCardData.addItem(data);
            }
            this.listCard.dataProvider = this.listCardData;
            this.listCard.itemRenderer = zj.HunterCardMainItem;
            this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListCardTap, this);
            this.btnUnLoad.visible = (zj.Table.LengthDisorder(cardMap) > 0);
        };
        HunterCardMain.prototype.onListCardTap = function (e) {
            var _this = this;
            var item = this.listCard.getElementAt(e.itemIndex);
            if (item == null || item == undefined)
                return;
            var data = this.listCardData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            if (item.uiType == zj.CardUIType.NOCARD) {
                if (zj.Game.TeachSystem.curPart == 8006 || zj.Game.TeachSystem.curPart == 8022)
                    zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                zj.loadUI(zj.HunterCardEmptyPopDialog).
                    then(function (dialog) {
                    dialog.setInfo(_this.generalId, data.cardType, e.itemIndex + 1, function (isInstallSuccess) {
                        if (isInstallSuccess) {
                            egret.setTimeout(function () {
                                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId);
                                if (hunterInfo.battleValue > _this.father.battleValue) {
                                    zj.CommonTipBmfont.promptBattleValue(_this.father.battleValue, hunterInfo.battleValue);
                                    _this.father.onSubUIEvent(zj.HunterSubUIEvent.Refresh);
                                }
                            }, _this, 500);
                        }
                        _this.reloadGeneral();
                    }, function () {
                        _this.reloadGeneral();
                        _this.father.removeChild(dialog);
                    });
                    dialog.name = "hunterCardEmptyPopDialog";
                    _this.father.addChild(dialog);
                    if (zj.Game.TeachSystem.curPart == 8006 || zj.Game.TeachSystem.curPart == 8022)
                        zj.Teach.addTeaching();
                }).
                    catch(function () {
                    zj.toast(zj.LANG("加载失败"));
                });
            }
            else if (item.uiType == zj.CardUIType.CARD) {
                zj.loadUI(zj.HunterCardPopDialog).
                    then(function (dialog) {
                    dialog.setInfo(_this.generalId, data.cardType, e.itemIndex + 1, _this.father.battleValue, function () {
                        _this.reloadGeneral();
                        _this.father.onSubUIEvent(zj.HunterSubUIEvent.Refresh);
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                }).
                    catch(function () {
                    zj.toast(zj.LANG("加载失败"));
                });
            }
            else {
                // to do 
            }
        };
        HunterCardMain.prototype.onBtnBag = function () {
            var _this = this;
            zj.loadUI(zj.CardMainScene)
                .then(function (scene) {
                scene.onBtnCardBag(function () {
                    _this.reloadGeneral();
                });
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCardMain.prototype.onUnLoad = function () {
            var _this = this;
            var unload = function () {
                for (var _i = 0, _a = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId).potatoInfo; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                        zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = v.index;
                    }
                }
                zj.Game.PlayerHunterSystem.unLoadAllPotato(_this.generalId).
                    then(function () {
                    egret.setTimeout(function () {
                        zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.unloadSuccessful);
                    }, _this, 500);
                    _this.reloadGeneral();
                });
            };
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Hunter_Card.confirmUnloadCard, function () {
                unload();
            });
        };
        HunterCardMain.prototype.getItemList = function () {
            this.itemList = [];
            for (var i = 0; i < 9; i++) {
                var item = this.listCard.getElementAt(i);
                this.itemList.push(item);
            }
        };
        HunterCardMain.prototype.setTips = function () {
            this.imgRedDot.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.POTATO);
        };
        return HunterCardMain;
    }(zj.HunterSubUI));
    zj.HunterCardMain = HunterCardMain;
    __reflect(HunterCardMain.prototype, "zj.HunterCardMain");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardMain.js.map