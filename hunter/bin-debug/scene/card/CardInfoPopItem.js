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
    /************** 猎人及卡片部分item ****************/
    var CardInfoPopItem = (function (_super) {
        __extends(CardInfoPopItem, _super);
        function CardInfoPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardInfoPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardInfoPopItem"], null);
            _this.init();
            return _this;
        }
        CardInfoPopItem.prototype.init = function () {
            this.btnCardGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardGet, this);
            this.labelCardName.anchorOffsetX = this.labelCardName.width / 2;
        };
        CardInfoPopItem.prototype.dataChanged = function () {
            var _this = this;
            zj.closeCache(this.groupCache);
            this.cardType = this.data.cardType;
            this.hostShowType = this.data.hostShowType;
            this.info = this.data.cardInfo;
            this.btnCardGet.visible = true;
            this.groupAll.visible = true;
            if (this.info == null) {
                this.btnCardGet.visible = false;
                this.groupAll.visible = false;
                return;
            }
            this.imgNew.visible = false;
            if (this.data.ani == true) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                    .then(function (display) {
                    if (!_this.groupAniSel.getChildByName("dzGF")) {
                        display.x = _this.groupAniSel.explicitWidth / 2;
                        display.y = _this.groupAniSel.explicitHeight / 2;
                        display.name = "dzGF";
                        _this.groupAniSel.addChild(display);
                    }
                    else {
                        display.animation.stop();
                        display.animation.reset();
                        display.armature.dispose();
                        display.dbClear();
                        display.dispose(true);
                    }
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            else {
                var obj = this.groupAniSel.getChildByName("dzGF");
                if (obj) {
                    this.groupAniSel.removeChild(obj);
                }
            }
            this.groupAll.visible = this.groupAniSel.visible = (this.info.id != null);
            this.btnCardGet.visible = (this.info.id == null);
            if (this.info.id != null) {
                var tbl = zj.TableItemPotato.Item(this.info.id);
                if (this.cardType == 1 || (this.cardType == 2 && this.hostShowType == 2)) {
                    this.labelCardName.text = tbl.name;
                    this.labelCardName.textColor = 0x000000;
                    this.imageHunterType.visible = false;
                    this.labelCardName.x = this.width / 2;
                }
                else {
                    var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(this.info.index).cHostId;
                    if (cHostId != null && this.info.pos != 0)
                        this.imageHunterType.visible = true;
                    this.labelCardName.text = zj.PlayerHunterSystem.Table(cHostId).general_name;
                    this.labelCardName.textColor = 0xffffff;
                    this.labelCardName.x = this.width / 2 + 10;
                }
                this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
                this.imageCard.source = zj.cachekey(tbl.path, this);
                var _a = zj.PlayerCardSystem.GetItemFrame(this.info.id), framePic = _a[0], _ = _a[1], __ = _a[2];
                this.imageFrame.source = zj.cachekey(framePic, this);
                this.labelLevel.text = this.info.level + "";
                this.imageLock.visible = this.info.is_lock;
                if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6) {
                    zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 10, this);
                }
                else {
                    zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 10, this);
                }
            }
            if (this.cardType == 1) {
                this.imgNew.visible = this.info.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex;
                if (this.info.index > zj.Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                    zj.Game.PlayerCardSystem.setIsCardChange(false);
                }
            }
            zj.setCache(this.groupCache);
        };
        CardInfoPopItem.prototype.onBtnCardGet = function () {
            var clientId = zj.TableEnum.Enum.CardTypeDropId[this.cardType - 1];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return CardInfoPopItem;
    }(eui.ItemRenderer));
    zj.CardInfoPopItem = CardInfoPopItem;
    __reflect(CardInfoPopItem.prototype, "zj.CardInfoPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardInfoPopItem.js.map