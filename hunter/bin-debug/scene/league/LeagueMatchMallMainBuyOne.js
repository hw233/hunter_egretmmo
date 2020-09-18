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
    //购买
    //yuqingchao
    //2019.02.19
    var LeagueMatchMallMainBuyOne = (function (_super) {
        __extends(LeagueMatchMallMainBuyOne, _super);
        function LeagueMatchMallMainBuyOne() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMatchMallMainBuyOneSkin.exml";
            _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
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
        LeagueMatchMallMainBuyOne.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.mallid = info.mall_id;
            this.setInfoMall();
        };
        //添加龙骨动画
        LeagueMatchMallMainBuyOne.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        LeagueMatchMallMainBuyOne.prototype.setInfoMall = function () {
            var id = this.info.goods_id[0];
            var count = this.info.goods_count[0];
            var itemSet = zj.PlayerItemSystem.Set(id, this.info.show_type[0], count);
            var itemCount = this.info.goods_count[1];
            var item = zj.PlayerItemSystem.Item(this.info.consume_type);
            var itemIcon = item.icon;
            var own_count = zj.Game.PlayerItemSystem.itemCount(this.info.goods_id[0]);
            var str_count = zj.Helper.StringFormat("%s%d", zj.TextsConfig.TextsConfig_Mall.buy_count, own_count);
            var str_cost = this.info.discount_price;
            this.imgSpriteFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.goods_id[0]), this);
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            this.labelName.text = itemSet.Info.name;
            this.labelOwn.text = str_count;
            this.LabelNum.text = count.toString();
            this.labelInfo.textFlow = zj.Util.RichText(itemSet.Info.des + "");
            this.imgSpriteCost.source = zj.cachekey(itemIcon, this);
            if (this.father.getDiscount()) {
                var discount = zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
                this.nowPrice = this.info.original_price * discount / 10;
                this.labelCost.text = (this.info.original_price * discount / 10).toString();
            }
            else {
                this.nowPrice = this.info.discount_price;
                this.labelCost.text = (this.info.discount_price).toString();
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
        LeagueMatchMallMainBuyOne.prototype.isImgMask = function (goodsId) {
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
        LeagueMatchMallMainBuyOne.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        //购买
        LeagueMatchMallMainBuyOne.prototype.onBtnBuy = function () {
            var nowGold = zj.Game.PlayerInfoSystem.Coin;
            if (this.nowPrice > nowGold) {
                zj.loadUI(zj.ConfirmCancelDialog)
                    .then(function (dialog) {
                    dialog.setInfo(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Money.moneys));
                    dialog.setCB(function () {
                        zj.loadUI(zj.HelpGoldDialog)
                            .then(function (dialog) {
                            dialog.SetInfoList();
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                        });
                    });
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            }
            else {
                this.father.buy(this.mallid, 1);
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE);
            }
        };
        LeagueMatchMallMainBuyOne.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueMatchMallMainBuyOne;
    }(zj.Dialog));
    zj.LeagueMatchMallMainBuyOne = LeagueMatchMallMainBuyOne;
    __reflect(LeagueMatchMallMainBuyOne.prototype, "zj.LeagueMatchMallMainBuyOne");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchMallMainBuyOne.js.map