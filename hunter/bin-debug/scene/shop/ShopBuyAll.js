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
    //shop  ShopBuyAll
    //wangshenzhuo
    //2018/12/26
    var ShopBuyAll = (function (_super) {
        __extends(ShopBuyAll, _super);
        function ShopBuyAll() {
            var _this = _super.call(this) || this;
            //最小
            _this.Min_Count = 1;
            //最大
            _this.Max_Count = 100;
            _this.mallid = 0;
            _this.num = 0;
            _this.skinName = "resource/skins/shop/ShopBuyAllSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
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
            _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonSub, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonAdd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonMax, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonBuy, _this);
            return _this;
        }
        ShopBuyAll.prototype.init = function () {
            this.count = 1;
            this.imgSpriteLogo.visible = false;
        };
        ShopBuyAll.prototype.setInfo = function (info, father) {
            // this.num = num;
            this.info = info;
            this.father = father;
            this.SetInfoMall();
            this.mallid = info.mall_id;
            //龙骨
        };
        ShopBuyAll.prototype.SetInfoMall = function () {
            var id = this.info.goods_id[0];
            var show = this.info.show_type[0];
            var count = this.info.goods_count[0];
            var itemSet = zj.PlayerItemSystem.Set(id, this.info.show_type[0], count);
            var own_count = zj.PlayerItemSystem.Count(this.info.goods_id[0]);
            var itemIcon = zj.PlayerItemSystem.Item(this.info.consume_type);
            var str_count = zj.Helper.StringFormat("%s%d", zj.TextsConfig.TextsConfig_Mall.buy_count, own_count);
            // let str_cost = this.father.labelCost;
            if (this.father.getDiscount()) {
                var discount = zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
                this.save_cost = this.info.original_price * discount / 10;
            }
            else {
                this.save_cost = this.info.discount_price;
            }
            this.Max_Count = this.info.remain;
            this.imgSpriteFrame.source = zj.cachekey(itemSet.Frame, this);
            // this.imgSpriteLogo.source = cachekey(itemSet.Logo , this) ;
            this.tableName.text = itemSet.Info.name;
            this.LableTextNum.text = count;
            this.tableOwn.text = str_count;
            this.lableTextInfo.textFlow = zj.Util.RichText(itemSet.Info.des + "");
            this.labelTextCost2.text = this.save_cost;
            this.imgSpriteCost2.source = zj.cachekey(itemIcon.icon, this);
            this.labelTextCount.text = this.count;
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.goods_id[0]), this);
            if (this.father.itemIndex != 0) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            }
            if (this.isImgMask(this.info.goods_id[0])) {
                this.imgMask.visible = true;
                this.imgSpriteIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(this.info.goods_id[0])) {
                this.rectMask.visible = true;
                this.imgSpriteIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgSpriteIcon.mask = this.rectMaskCommon;
            }
        };
        // 物品遮罩
        ShopBuyAll.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        // 徽章遮罩
        ShopBuyAll.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        ShopBuyAll.prototype.SetInfoCount = function () {
            this.labelTextCount.text = this.count;
            this.labelTextCost2.text = (this.save_cost * this.count).toString();
        };
        ShopBuyAll.prototype.ButtonSub = function () {
            this.count = this.count - 1;
            if (this.count <= this.Min_Count) {
                this.count = this.Min_Count;
            }
            this.SetInfoCount();
        };
        //添加按钮
        ShopBuyAll.prototype.ButtonAdd = function () {
            var money = this.father.nowMoney;
            var num = (money / this.save_cost);
            if (num <= 1) {
                this.count = this.Min_Count;
            }
            else {
                this.count = this.count + 1;
            }
            if (this.count >= this.Max_Count) {
                this.count = this.Max_Count;
            }
            this.SetInfoCount();
        };
        //添加龙骨动画
        ShopBuyAll.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
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
        ShopBuyAll.prototype.ButtonMax = function () {
            var money = this.father.nowMoney;
            var num = Math.floor(money / this.save_cost);
            if (num <= 0) {
                this.count = this.Min_Count;
            }
            else if (num < this.Max_Count) {
                this.count = num;
            }
            else if (num > this.Max_Count) {
                this.count = this.Max_Count;
            }
            this.SetInfoCount();
        };
        ShopBuyAll.prototype.ButtonBuy = function () {
            var nowGold = zj.Game.PlayerInfoSystem.Coin.toString();
            if (this.save_cost > nowGold && this.father.itemIndex == 0) {
                zj.loadUI(zj.ConfirmCancelDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            }
            else {
                this.father.buy(this.mallid, this.count);
            }
        };
        ShopBuyAll.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ShopBuyAll;
    }(zj.Dialog));
    zj.ShopBuyAll = ShopBuyAll;
    __reflect(ShopBuyAll.prototype, "zj.ShopBuyAll");
})(zj || (zj = {}));
//# sourceMappingURL=ShopBuyAll.js.map