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
     * @date 2018-12-3
     *
     * @class  详情卡片item
     */
    var Common_PlayerItemCard = (function (_super) {
        __extends(Common_PlayerItemCard, _super);
        function Common_PlayerItemCard() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_PlayerItemCardSkin.exml";
            return _this;
            // this.groupMain.cacheAsBitmap = true;
        }
        Common_PlayerItemCard.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Common_PlayerItemCard.prototype.updateView = function (data) {
            var unLock = (zj.Game.PlayerInfoSystem.Level >= data.cardLevel);
            this.groupLock.visible = !unLock;
            this.groupUnLock.visible = unLock;
            this.groupGetCard.visible = (data.cardInfo != null);
            this.groupDontGet.visible = (data.cardInfo == null);
            if (unLock) {
                if (data.cardInfo != null) {
                    this.uiType = zj.CardUIType.CARD;
                    this.setUICard(data);
                }
                else {
                    this.uiType = zj.CardUIType.NOCARD;
                    this.setUINoCard(data);
                }
            }
            else {
                this.uiType = zj.CardUIType.LOCK;
                this.setUILock(data);
            }
        };
        // set group un lock
        Common_PlayerItemCard.prototype.setUICard = function (data) {
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
        Common_PlayerItemCard.prototype.setUINoCard = function (data) {
            // this.imgRed.visible = PlayerCardSystem.GetHaveCardByType(data.cardType);
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBig.source = zj.cachekey(cardTypePath, this);
        };
        // set group lock
        Common_PlayerItemCard.prototype.setUILock = function (data) {
            this.labelLock.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_unlock, data.cardLevel);
            var cardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type[data.cardType - 1];
            this.imgTypeBigLock.source = zj.cachekey(cardTypePath, this);
        };
        return Common_PlayerItemCard;
    }(eui.ItemRenderer));
    zj.Common_PlayerItemCard = Common_PlayerItemCard;
    __reflect(Common_PlayerItemCard.prototype, "zj.Common_PlayerItemCard");
    var Common_PlayerItemCardData = (function () {
        function Common_PlayerItemCardData() {
            // /** 索引下标 */
            // index: number;
            /** The current hunter's potato's info, may be null. */
            this.cardInfo = null;
            this.father = null;
        }
        return Common_PlayerItemCardData;
    }());
    zj.Common_PlayerItemCardData = Common_PlayerItemCardData;
    __reflect(Common_PlayerItemCardData.prototype, "zj.Common_PlayerItemCardData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_PlayerItemCard.js.map