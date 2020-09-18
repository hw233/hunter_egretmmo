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
    var HunterCardPopItem = (function (_super) {
        __extends(HunterCardPopItem, _super);
        function HunterCardPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCardPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterCardPopItem"], null);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, null);
            return _this;
        }
        HunterCardPopItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupAll);
            this.updateView(this.data);
            zj.setCache(this.groupAll);
        };
        HunterCardPopItem.prototype.updateView = function (data) {
            if ((data.info instanceof message.PotatoInfo) == false) {
                this.imgCardGet.visible = (data.info.is_button == true);
                this.groupAll.visible = false;
                return;
            }
            var info = data.info;
            this.imgCardGet.visible = false;
            this.groupAll.visible = true;
            if (info.id == null || info.id == undefined)
                return;
            this.imgNew.visible = false;
            this.imgHunterType.visible = false;
            var tableInfo = zj.TableItemPotato.Item(info.id);
            this.labelCardName.text = tableInfo.name;
            this.labelLevel.text = info.level.toString();
            var typePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tableInfo.type - 1];
            var cardPath = tableInfo.path;
            // let a = PlayerCardSystem.GetItemFrame(info.id, info);
            var _a = zj.PlayerCardSystem.GetItemFrame(info.id, info), framePath = _a[0];
            this.imgCardType.source = zj.cachekey(typePath, this);
            this.imgCard.source = zj.cachekey(cardPath, this);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgLock.visible = info.is_lock;
            if (info.add_attri.length == 4 && info.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else if (info.add_attri.length == 5 && info.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, info.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            }
            this.playSelectedAnimation(data.isSelected);
        };
        HunterCardPopItem.prototype.playSelectedAnimation = function (play) {
            var _this = this;
            this.groupAnimation.removeChildren();
            if (!play)
                return;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupAnimation.width / 2;
                display.y = _this.groupAnimation.height / 2 - 2;
                _this.groupAnimation.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HunterCardPopItem;
    }(eui.ItemRenderer));
    zj.HunterCardPopItem = HunterCardPopItem;
    __reflect(HunterCardPopItem.prototype, "zj.HunterCardPopItem");
    var HunterCardPopItemData = (function () {
        function HunterCardPopItemData() {
            this.isSelected = false;
        }
        return HunterCardPopItemData;
    }());
    zj.HunterCardPopItemData = HunterCardPopItemData;
    __reflect(HunterCardPopItemData.prototype, "zj.HunterCardPopItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCardPopItem.js.map