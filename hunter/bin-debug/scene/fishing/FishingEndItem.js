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
    //FishingEndItem
    //yuqingchao
    //2019.05.18
    var FishingEndItem = (function (_super) {
        __extends(FishingEndItem, _super);
        function FishingEndItem() {
            var _this = _super.call(this) || this;
            _this.id = null;
            _this.skinName = "resource/skins/fishing/FishingEndItemSkin.exml";
            zj.cachekeys(zj.UIResource["FishingEndItem"], null);
            zj.Game.EventManager.on(zj.GameEvent.FISHING_ENDITEM, _this.setDouble, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.FISHING_ENDITEM, _this.setDouble, _this);
            }, null);
            _this.goods = _this.goods;
            return _this;
        }
        FishingEndItem.prototype.dataChanged = function () {
            var _this = this;
            this.goods = this.data.info;
            this.id = this.data.id;
            var fish = this.fishInstance(this.goods.index);
            this.imgLable.source = zj.cachekey(fish.image_title, this);
            this.imgFish.source = zj.cachekey(fish.fish_image, this);
            this.groupItem.visible = false;
            if (this.data.double) {
                setTimeout(function () {
                    _this.imgLable.visible = false;
                    _this.imgFish.visible = false;
                    _this.playAni();
                }, 1000);
            }
            else {
                this.setGoods(this.data.double);
            }
            this.lbNum.visible = false;
        };
        FishingEndItem.prototype.setGoods = function (double) {
            this.imgLable.visible = false;
            this.groupItem.visible = true;
            this.imgFish.visible = false;
            this.itemSet = zj.PlayerItemSystem.Set(this.goods.goodsId);
            this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.itemFrame[this.goods.index], this);
            this.imgClid.source = zj.cachekey(this.itemSet.Clip, this);
            if (double == false) {
                this.imgDouble.visible = true;
                var itemSet = zj.PlayerItemSystem.Set(this.goods.goodsId);
                this.lbName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_giftAndNumDouble, itemSet.Info.name, this.goods.count * 2));
            }
            else {
                this.imgDouble.visible = false;
                this.lbName.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_giftAndNum, this.itemSet.Info.name, this.goods.count);
            }
        };
        FishingEndItem.prototype.fishInstance = function (id) {
            if (zj.ckid(this.id)) {
                return null;
            }
            ;
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueFish + ".json");
            return tbl[id];
        };
        FishingEndItem.prototype.playAni = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "tlzd_buyu_eff", null, "000_buyu", 1)
                .then(function (display) {
                _this.groupAni.removeChildren();
                _this.groupAni.addChild(display);
                _this.setGoods();
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        FishingEndItem.prototype.setDouble = function () {
            this.imgDouble.visible = true;
            var itemSet = zj.PlayerItemSystem.Set(this.goods.goodsId);
            this.lbName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_giftAndNumDouble, itemSet.Info.name, this.goods.count * 2));
        };
        return FishingEndItem;
    }(eui.ItemRenderer));
    zj.FishingEndItem = FishingEndItem;
    __reflect(FishingEndItem.prototype, "zj.FishingEndItem");
})(zj || (zj = {}));
//# sourceMappingURL=FishingEndItem.js.map