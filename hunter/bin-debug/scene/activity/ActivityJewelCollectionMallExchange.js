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
    // 宝石收藏 -- 宝石商店 -- 宝石兑换
    // wangshenzhuo
    // 20019/05/07
    var ActivityJewelCollectionMallExchange = (function (_super) {
        __extends(ActivityJewelCollectionMallExchange, _super);
        function ActivityJewelCollectionMallExchange() {
            var _this = _super.call(this) || this;
            _this.MIN_COUNT = 1;
            _this.MAX_COUNT = 100;
            _this.count = 0;
            _this.maxCount = 0;
            _this.skinName = "resource/skins/activity/ActivityJewelCollectionMallExchangeSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSub, _this);
            _this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAdd, _this);
            _this.buttonMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMax, _this);
            _this.buttonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonBuy, _this);
            _this.count = 1;
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ActivityJewelCollectionMallExchange.prototype.SetInfo = function (info) {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.info = info;
            //最大可兑换数量
            this.maxCount = Math.min(Math.floor(zj.Game.PlayerMissionSystem.missionActive.jewelHave / info.consume), info.leftTimes);
            var itemSet = zj.PlayerItemSystem.Set(info.itemID, null, info.itemCount);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelTextNum.text = info.itemCount;
            this.labelTextName.text = itemSet.Info["name"];
            this.labelTextType.text = itemSet["TypeDes"];
            this.labelTextOwn.text = zj.Helper.StringFormat("%s%d", zj.TextsConfig.TextsConfig_Mall.buy_count, itemSet["Count"]); //拥有数量
            this.SetInfoCount();
            if (this.isImgMask(info.itemID)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        ActivityJewelCollectionMallExchange.prototype.SetInfoCount = function () {
            this.labelTextCount.text = this.count.toString();
            this.labelTextCost2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.con_jewel, (this.info.consume * this.count));
        };
        // 物品遮罩
        ActivityJewelCollectionMallExchange.prototype.isImgMask = function (goodsId) {
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
        //  按钮 -
        ActivityJewelCollectionMallExchange.prototype.onButtonSub = function () {
            this.count = this.count - 1;
            if (this.count <= 1) {
                this.count = 1;
            }
            this.SetInfoCount();
        };
        // 按钮 +
        ActivityJewelCollectionMallExchange.prototype.onButtonAdd = function () {
            if (this.count < this.maxCount) {
                this.count = this.count + 1;
                this.SetInfoCount();
            }
            else {
                return;
            }
        };
        // 按钮  最大
        ActivityJewelCollectionMallExchange.prototype.onButtonMax = function () {
            this.count = this.maxCount;
            this.SetInfoCount();
        };
        // 按钮  确认兑换
        ActivityJewelCollectionMallExchange.prototype.onButtonBuy = function () {
            var _this = this;
            if (this.count <= this.maxCount) {
                zj.PlayerJewelSystem.MissionJewelExchangeReq(this.info.itemIndex + 1, this.count).then(function (data) {
                    _this.onButtonClose();
                    _this.father.SetInfo();
                    setTimeout(function () {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(function () { _this.father.SetInfo(); });
                        }).catch(function (reason) { });
                    }, 500);
                });
            }
        };
        ActivityJewelCollectionMallExchange.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityJewelCollectionMallExchange.prototype.SetFather = function (father) {
            this.father = father;
        };
        return ActivityJewelCollectionMallExchange;
    }(zj.Dialog));
    zj.ActivityJewelCollectionMallExchange = ActivityJewelCollectionMallExchange;
    __reflect(ActivityJewelCollectionMallExchange.prototype, "zj.ActivityJewelCollectionMallExchange");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityJewelCollectionMallExchange.js.map