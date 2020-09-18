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
     */
    var HunterCardMainItem = (function (_super) {
        __extends(HunterCardMainItem, _super);
        function HunterCardMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCardMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterCardMainItem"], null);
            // this.cacheAsBitmap = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, _this);
            return _this;
        }
        HunterCardMainItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterCardMainItem.prototype.updateView = function (data) {
            var unLock = (zj.Game.PlayerInfoSystem.Level >= data.cardLevel);
            this.groupLock.visible = !unLock;
            this.groupUnLock.visible = unLock;
            this.groupGetCard.visible = (data.cardInfo != null);
            this.groupDontGet.visible = (data.cardInfo == null);
            if (unLock) {
                if (data.cardInfo != null) {
                    this.uiType = CardUIType.CARD;
                    this.setUICard(data);
                }
                else {
                    this.uiType = CardUIType.NOCARD;
                    this.setUINoCard(data);
                }
            }
            else {
                this.uiType = CardUIType.LOCK;
                this.setUILock(data);
            }
        };
        // set group un lock
        HunterCardMainItem.prototype.setUICard = function (data) {
            var potatoInfo = zj.TableItemPotato.Item(data.cardInfo.id);
            this.labelName.text = potatoInfo.name;
            this.labelNumber.text = potatoInfo.num;
            this.labelLevel.text = data.cardInfo.level.toString();
            var cardPath = potatoInfo.paths;
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[potatoInfo.type - 1];
            var _a = zj.PlayerCardSystem.GetItemFrame(potatoInfo.id), framePath = _a[2];
            this.imgCard.source = zj.cachekey(cardPath, this);
            this.imgCardType.source = zj.cachekey(cardTypePath, this);
            this.imgCardBoard.source = zj.cachekey(framePath, this);
            if (data.cardInfo.add_attri.length + 1 == 5 && data.cardInfo.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else if (data.cardInfo.add_attri.length == 5 && data.cardInfo.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, data.cardInfo.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            }
        };
        // set group dont get card
        HunterCardMainItem.prototype.setUINoCard = function (data) {
            this.imgRed.visible = zj.PlayerCardSystem.GetHaveCardByType(data.cardType);
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBig.source = zj.cachekey(cardTypePath, this);
        };
        // set group lock
        HunterCardMainItem.prototype.setUILock = function (data) {
            this.labelLock.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_unlock, data.cardLevel);
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBigLock.source = zj.cachekey(cardTypePath, this);
        };
        return HunterCardMainItem;
    }(eui.ItemRenderer));
    zj.HunterCardMainItem = HunterCardMainItem;
    __reflect(HunterCardMainItem.prototype, "zj.HunterCardMainItem");
    var CardUIType;
    (function (CardUIType) {
        CardUIType[CardUIType["LOCK"] = 0] = "LOCK";
        CardUIType[CardUIType["NOCARD"] = 1] = "NOCARD";
        CardUIType[CardUIType["CARD"] = 2] = "CARD";
    })(CardUIType = zj.CardUIType || (zj.CardUIType = {}));
    var HunterCardMainItemData = (function () {
        function HunterCardMainItemData() {
            /** The current hunter's potato's info, may be null. */
            this.cardInfo = null;
            this.father = null;
        }
        return HunterCardMainItemData;
    }());
    zj.HunterCardMainItemData = HunterCardMainItemData;
    __reflect(HunterCardMainItemData.prototype, "zj.HunterCardMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardMainItem.js.map