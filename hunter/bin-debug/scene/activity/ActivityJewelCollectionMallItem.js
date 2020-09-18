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
    // wang shen zhuo
    // 宝石收藏---宝石商店--item
    // 2019.05.07
    var ActivityJewelCollectionMallItem = (function (_super) {
        __extends(ActivityJewelCollectionMallItem, _super);
        function ActivityJewelCollectionMallItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityJewelCollectionMallItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityJewelCollectionMallItem"], null);
            _this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_END, _this.onButtonChange, _this);
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
        ActivityJewelCollectionMallItem.prototype.dataChanged = function () {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.info = this.data.info;
            this.father = this.data.father;
            var itemSet = zj.PlayerItemSystem.Set(this.data.info.itemID, null, this.data.info.itemCount);
            //名称
            this.labelItemName.text = itemSet.Info["name"];
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageClip.source = zj.cachekey(itemSet.Clip, this);
            this.imageBg.source = zj.cachekey("ui_acitivity_random_BoardExchangeAward_png", this);
            this.labelNum.text = this.data.info.itemCount;
            // 剩余次数
            // 颜色
            var leftTimes = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.g_lastTimes, this.data.info.leftTimes, this.data.info.totalTimes);
            if (this.data.info.isDailyRefresh) {
                leftTimes = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.g_todayLastTimes, this.data.info.leftTimes, this.data.info.totalTimes);
                if (this.data.info.leftTimes == 0) {
                    leftTimes = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.r_todayLastTimes, this.data.info.leftTimes, this.data.info.totalTimes);
                }
            }
            else {
                if (this.data.info.leftTimes == 0) {
                    leftTimes = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.r_lastTimes, this.data.info.leftTimes, this.data.info.totalTimes);
                }
            }
            this.labelChangeNum.textFlow = zj.Util.RichText(leftTimes);
            //消耗
            this.labelChangeCore.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.con_jewel, this.data.info.consume);
            //可兑换判定
            var enabled = false;
            if (zj.Game.PlayerMissionSystem.missionActive.jewelHave >= this.data.info.consume && this.data.info.leftTimes != 0) {
                enabled = true;
            }
            this.buttonChange.enabled = enabled;
            if (this.isImgMask(this.data.info.itemID)) {
                this.imgMask.visible = true;
                this.imageClip.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageClip.mask = this.rectMaskCommon;
            }
        };
        // 兑换按钮
        ActivityJewelCollectionMallItem.prototype.onButtonChange = function () {
            var fathers = this.father;
            var infos = this.info;
            zj.loadUI(zj.ActivityJewelCollectionMallExchange)
                .then(function (dialog) {
                dialog.SetFather(fathers);
                dialog.SetInfo(infos);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 物品遮罩
        ActivityJewelCollectionMallItem.prototype.isImgMask = function (goodsId) {
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
        return ActivityJewelCollectionMallItem;
    }(eui.ItemRenderer));
    zj.ActivityJewelCollectionMallItem = ActivityJewelCollectionMallItem;
    __reflect(ActivityJewelCollectionMallItem.prototype, "zj.ActivityJewelCollectionMallItem");
    var ActivityJewelCollectionMallItemData = (function () {
        function ActivityJewelCollectionMallItemData() {
        }
        return ActivityJewelCollectionMallItemData;
    }());
    zj.ActivityJewelCollectionMallItemData = ActivityJewelCollectionMallItemData;
    __reflect(ActivityJewelCollectionMallItemData.prototype, "zj.ActivityJewelCollectionMallItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityJewelCollectionMallItem.js.map