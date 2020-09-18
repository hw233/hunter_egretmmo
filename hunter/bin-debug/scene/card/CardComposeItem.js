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
    // created by hhh in 2018/11/14
    /************** 碎片item ****************/
    var CardComposeItem = (function (_super) {
        __extends(CardComposeItem, _super);
        function CardComposeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardComposeItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardComposeItem"], null);
            return _this;
        }
        CardComposeItem.prototype.dataChanged = function () {
            var _this = this;
            var info = this.data;
            this.groupAll.visible = info.product_id != null;
            if (info.product_id != null) {
                if (info.randomCard == 0) {
                    var tbl = zj.TableItemPotato.Item(info.product_id);
                    this.imageCardType.visible = true;
                    var framePic = zj.PlayerCardSystem.GetItemFrame(info.product_id)[0];
                    this.labelCardName.text = tbl.name;
                    this.imageCardPic.source = zj.cachekey(tbl.path, this);
                    this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
                    this.imageFrame.source = zj.cachekey(framePic, this);
                    zj.Helper.SetStar(this.groupStar, tbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 1, 10);
                }
                else {
                    var cardInfo = zj.PlayerItemSystem.ItemConfig(info.need_ids[0]);
                    this.imageCardType.visible = false;
                    var framePic = zj.UIConfig.UIConfig_Role.itemFrame[cardInfo.compose_quality];
                    this.labelCardName.text = cardInfo.compose_name;
                    this.imageCardPic.source = zj.cachekey(cardInfo.path, this);
                    this.imageFrame.source = zj.cachekey(framePic, this);
                    if (cardInfo.compose_purple != "")
                        zj.Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 1, 10);
                    else
                        zj.Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), zj.UIConfig.UIConfig_Hunter_Card.card_star, 1, 10);
                }
                this.labelLevel.text = "1";
                this.labelCardChipNum.text = info.have_counts[0] + "/" + info.need_counts[0];
                this.imageExpBar.percentWidth = info.counts_per[0] * 100;
                this.groupAni.visible = (info.can_compose == 1);
                if (info.can_compose == 1) {
                    this.groupAni.removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this, "ui_kehecheng", "armatureName", null, 0)
                        .then(function (display) {
                        display.x = _this.groupAni.width / 2;
                        display.y = _this.groupAni.height / 2 - 10;
                        _this.groupAni.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                // if (info.isSel) {
                //     this.groupSelAni.removeChildren();
                //     this.imgSel .visible = false;
                //     Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", "002_xuanzhong_anniu2", 0)
                //         .then(display => {
                //             display.x = this.groupSelAni.width / 2;
                //             display.y = this.groupSelAni.height / 2;
                //             this.groupSelAni.addChild(display);
                //             display.rotation = 90;
                //             display.scaleX = 0.85;
                //             display.scaleY = 1.3;
                //         })
                //         .catch(reason => {
                //             toast(reason);
                //         });
                // }
                // else {
                //     this.groupSelAni.removeChildren();
                //     this.imgSel.visible = true;
                // }
            }
        };
        return CardComposeItem;
    }(eui.ItemRenderer));
    zj.CardComposeItem = CardComposeItem;
    __reflect(CardComposeItem.prototype, "zj.CardComposeItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardComposeItem.js.map