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
    //战功商店Item
    //yuqingchao
    //2019.01.26
    var LeagueMatchMallMainItem = (function (_super) {
        __extends(LeagueMatchMallMainItem, _super);
        function LeagueMatchMallMainItem() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.animatoin = false;
            _this.skinName = "resource/skins/league/LeagueMatchMallMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchMallMainItem"], null);
            _this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnItem, _this);
            _this.groupShadow.visible = false;
            _this.imgDiscount.visible = false;
            _this.lbDis.visible = false;
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
        LeagueMatchMallMainItem.prototype.onBtnItem = function () {
        };
        //龙骨动画
        LeagueMatchMallMainItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            this.animatoin = true;
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
        LeagueMatchMallMainItem.prototype.dataChanged = function () {
            var mall = this.data.malldata;
            var itemSet = zj.PlayerItemSystem.Set(mall.goods_id[0], mall.show_type[0], mall.goods_count[0]);
            if (mall.show_type[0] == 1 && this.animatoin == false) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            }
            this.imgFrame.source = zj.cachekey(zj.cachekey(itemSet.Frame, this), this);
            this.imgLogo.source = zj.cachekey(zj.cachekey(itemSet.Logo, this), this);
            this.lbName.text = itemSet.Info.name;
            this.lbBuyNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Mall.mall_limit, mall.remain);
            this.lbNum.text = mall.goods_count[0];
            this.lbCost.text = mall.discount_price;
            this.imgIcon.source = zj.cachekey(zj.cachekey(zj.PlayerItemSystem.ItemPath(mall.goods_id), this), this);
            if (this.isImgMask(mall.goods_id[0])) {
                this.imgMask.visible = true;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = false;
                this.imgIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(mall.goods_id[0])) {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            if (Number(mall.remain) <= 0) {
                this.groupShadow.visible = true;
                this.btnItem.currentState = "down";
            }
            else {
                this.groupShadow.visible = false;
                this.btnItem.currentState = "";
            }
        };
        // 物品遮罩
        LeagueMatchMallMainItem.prototype.isImgMask = function (goodsId) {
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
        LeagueMatchMallMainItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        return LeagueMatchMallMainItem;
    }(eui.ItemRenderer));
    zj.LeagueMatchMallMainItem = LeagueMatchMallMainItem;
    __reflect(LeagueMatchMallMainItem.prototype, "zj.LeagueMatchMallMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchMallMainItem.js.map