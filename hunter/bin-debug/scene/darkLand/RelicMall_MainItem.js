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
    //RelicMall_MainItem
    //hexiaowei
    // 2019/03/08
    var RelicMall_MainItem = (function (_super) {
        __extends(RelicMall_MainItem, _super);
        function RelicMall_MainItem() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.skinName = "resource/skins/darkLand/RelicMall_MainItemSkin.exml";
            zj.cachekeys(zj.UIResource["RelicMall_MainItem"], null);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        //添加龙骨动画
        RelicMall_MainItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        RelicMall_MainItem.prototype.dataChanged = function () {
            this.imgSpriteSoldOut.visible = false;
            var itemSet = zj.PlayerItemSystem.Set(this.data.mallitem.goods_id, this.data.mallitem.show_type[0], this.data.mallitem.goods_count);
            if (this.data.mallitem.show_type[0] == 1) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            }
            var itemCount = this.data.mallitem.goods_count[0];
            //this.imgSpriteFrame.source= UIConfig.UIConfig_Role.itemFrame[PlayerItemSystem.ItemQuality(this.data.goods_id)];
            this.imgSpriteFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgSpriteLogo.source = zj.cachekey(itemSet.Logo, this);
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.mallitem.goods_id), this);
            if (this.isImgMask(this.data.mallitem.goods_id[0])) {
                this.imgMask.visible = true;
                this.imgSpriteIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(this.data.mallitem.goods_id[0])) {
                this.rectMask.visible = true;
                this.imgSpriteIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgSpriteIcon.mask = this.rectMaskCommon;
            }
            this.labelNum.text = itemCount;
            this.labelNameB.text = itemSet.Info.name;
            this.labelCostB.text = this.data.mallitem.original_price;
            this.labelBuyNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.mall_limit, this.data.mallitem.remain);
            this.imgSpriteCost.visible = this.data.mallitem.buy_limit <= zj.Game.PlayerInfoSystem.Level;
            var cost_path = zj.PlayerItemSystem.Item(this.data.mallitem.consume_type);
            this.imgSpriteCost.source = zj.cachekey(cost_path.icon, this);
            ;
            this.imgSpriteCostB.source = zj.cachekey(cost_path.icon, this);
            if (this.data.relicmallmain.getDiscount()) {
                this.setInfoDisOfLeague(this.data);
            }
            else {
                this.setInfoDisOfNormal(this.data);
            }
            this.setInfoRemain(this.data);
        };
        // 物品遮罩
        RelicMall_MainItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        // 徽章遮罩
        RelicMall_MainItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        RelicMall_MainItem.prototype.setInfoDisOfNormal = function (data) {
            if (data.mallitem.discount_price == data.mallitem.original_price) {
                this.imgSpriteDiscount.visible = false;
                this.labelDis.visible = false;
                this.setInfoDisOfCommon(1);
            }
            else {
                this.imgSpriteDiscount.visible = true;
                this.labelDis.visible = true;
                this.setInfoDisOfCommon(1);
            }
        };
        RelicMall_MainItem.prototype.setInfoDisOfLeague = function (data) {
            var m = zj.Game.PlayerLeagueSystem.BaseInfo.level;
            var discount = zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
            if (discount < 10) {
                this.imgSpriteDiscount.visible = true;
                this.labelDis.visible = true;
                this.setInfoDisOfCommon(discount / 10);
            }
            else {
                this.imgSpriteDiscount.visible = false;
                this.labelDis.visible = false;
                this.setInfoDisOfCommon(discount / 10);
            }
        };
        RelicMall_MainItem.prototype.setInfoDisOfCommon = function (dis) {
            var discount = dis * (this.data.mallitem.discount_price / this.data.mallitem.original_price);
            var str_dis = zj.Helper.StringFormat("%s%s", zj.Helper.MallDiscount(discount), zj.TextsConfig.TextsConfig_Mall.dis);
            this.labelDis.text = str_dis;
            if (this.data.mallitem.buy_limit > zj.Game.PlayerInfoSystem.Level) {
                this.labelCost.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.buy_limit, this.data.mallitem.buy_limit);
                this.labelCostB.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.buy_limit, this.data.mallitem.buy_limit);
                this.labelCost.x = this.labelCost.x - 35;
                this.labelCostB.x = this.labelCostB.x - 35;
            }
            else {
                var cost_price = this.data.mallitem.original_price * discount;
                var str_price = zj.Helper.StringFormat("%d", cost_price);
                var m = zj.PlayerItemSystem.Resource(this.data.mallitem.consume_type);
                var enough = zj.PlayerItemSystem.Resource(this.data.mallitem.consume_type) >= cost_price;
                this.labelCost.text = str_price;
                this.labelCostB.text = str_price;
                if (!enough) {
                    this.labelCost.textColor = zj.ConstantConfig_Common.Color.red;
                    this.labelCostB.textColor = zj.ConstantConfig_Common.Color.red;
                }
                else {
                    this.labelCost.textColor = zj.Helper.RGBToHex("r:88,g:40,b:0");
                    ;
                    this.labelCostB.textColor = zj.Helper.RGBToHex("r:88,g:40,b:0");
                    ;
                }
            }
        };
        RelicMall_MainItem.prototype.setInfoRemain = function (data) {
            if (data.mallitem.buy_limit > zj.Game.PlayerInfoSystem.Level) {
                this.imgSpriteShadow.visible = true;
                this.groupNodeA.visible = true;
                this.groupNodeB.visible = false;
            }
            else if (data.relicmallmain.getLimit()) {
                this.groupNodeA.visible = true;
                this.groupNodeB.visible = false;
                this.imgSpriteShadow.visible = false;
                this.imgSpriteSoldOut.visible = false;
            }
            else {
                var remain = data.relicmallmain.getMallRemain(data.mallitem.mall_id);
                this.groupNodeA.visible = false;
                this.groupNodeB.visible = true;
                this.labelBuyNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.mall_limit, remain);
                this.imgSpriteShadow.visible = remain == 0;
                this.imgSpriteSoldOut.visible = remain == 0;
                this.num = remain;
            }
        };
        return RelicMall_MainItem;
    }(eui.ItemRenderer));
    zj.RelicMall_MainItem = RelicMall_MainItem;
    __reflect(RelicMall_MainItem.prototype, "zj.RelicMall_MainItem");
    //子项数据源
    var RelicMall_MainItemData = (function () {
        function RelicMall_MainItemData() {
        }
        return RelicMall_MainItemData;
    }());
    zj.RelicMall_MainItemData = RelicMall_MainItemData;
    __reflect(RelicMall_MainItemData.prototype, "zj.RelicMall_MainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=RelicMall_MainItem.js.map