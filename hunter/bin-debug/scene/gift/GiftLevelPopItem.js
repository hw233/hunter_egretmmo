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
    // 
    // lizhengqiang
    // 20190411
    var GiftLevelPopItem = (function (_super) {
        __extends(GiftLevelPopItem, _super);
        function GiftLevelPopItem() {
            var _this = _super.call(this) || this;
            _this._TOKEN = 20002;
            _this.setInfoOtherInfo = function () {
                if (_this.giftInfo.gift_form == 6) {
                    _this.setInfoOtherInfo1();
                }
                else if (_this.giftInfo.gift_form == 3) {
                    _this.setInfoOtherInfo2();
                }
            };
            _this.skinName = "resource/skins/gift/GiftLevelPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["GiftLevelPopItem"], null);
            _this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftGet, _this);
            _this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            return _this;
        }
        GiftLevelPopItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.dayInfo = this.data.dayInfo;
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.goodsInfo = null;
            this.setInfoOtherInfo();
            this.setInfoGoods();
        };
        GiftLevelPopItem.prototype.setInfoOtherInfo1 = function () {
            var _this = this;
            var level = Number(this.dayInfo.reward_level);
            var find = zj.Table.FindF(this.info["markIndex"], function (k, v) {
                return v == _this.dayInfo.index;
            });
            this.imgRed.visible = (!find && zj.Game.PlayerInfoSystem.BaseInfo.level >= level);
            this.lbNameType.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.level_gift_name, level);
            this.lbLevelGet.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.get_level, level));
            var image1 = zj.UIConfig.UIConfig_Gift.reach; // 达成
            var image2 = zj.UIConfig.UIConfig_Gift.get; // 领取
            if (!find && zj.Game.PlayerInfoSystem.BaseInfo.level >= level) {
                // 可领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = true;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = true;
                this.btnGiftGet.enabled = true;
            }
            else if (find) {
                // 已领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = true;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = true;
                this.btnGiftGet.enabled = false;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.level < level) {
                // 不可领
                this.imgShadow.visible = true;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = true;
                this.btnGiftGet.visible = false;
                this.btnGiftGet.enabled = false;
            }
        };
        GiftLevelPopItem.prototype.setInfoOtherInfo2 = function () {
            this.imgRed.visible = (this.info["dailyIndex"] == this.dayInfo.index && this.info["buy_times"] == 0);
            this.lbNameType.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.day, this.dayInfo.index - Number(this.giftInfo.daily_index) + 1);
            this.lbLevelGet.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.day_get, this.dayInfo.index - Number(this.giftInfo.daily_index) + 1));
            var image1 = zj.UIConfig.UIConfig_Gift.reach; // 达成
            var image2 = zj.UIConfig.UIConfig_Gift.get; // 领取
            if (this.info["dailyIndex"] < this.dayInfo.index) {
                // 不可领
                this.imgShadow.visible = true;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = true;
                this.btnGiftNo.enabled = false;
                this.btnGiftGet.visible = false;
            }
            else if (this.info["dailyIndex"] == this.dayInfo.index) {
                if (this.info["buy_times"] == 0) {
                    // 可领取
                    this.imgShadow.visible = false;
                    this.imgFrameClick.visible = true;
                    this.imgGet.visible = false;
                    this.btnGiftNo.visible = false;
                    this.btnGiftGet.visible = true;
                    this.btnGiftGet.enabled = true;
                }
                else {
                    // 已领取
                    this.imgShadow.visible = false;
                    this.imgFrameClick.visible = false;
                    this.imgGet.visible = true;
                    this.btnGiftNo.visible = false;
                    this.btnGiftGet.visible = false;
                    this.btnGiftGet.enabled = false;
                }
            }
            else if (this.info["dailyIndex"] > this.dayInfo.index) {
                // 已领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = true;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = false;
                this.btnGiftGet.enabled = false;
            }
        };
        GiftLevelPopItem.prototype.setInfoGoods = function () {
            var _this = this;
            var rewards = [];
            for (var i = 0; i < this.dayInfo.goods_id.length; i++) {
                var good = new message.GoodsInfo();
                good.goodsId = this.dayInfo.goods_id[i];
                good.count = this.dayInfo.goods_count[i];
                rewards.push(good);
            }
            var showOne = (rewards.length == 1 && this.giftInfo.gift_form == 6);
            this.lstRMB.visible = !showOne;
            this.groupOne.visible = showOne;
            if (showOne) {
                var k = zj.Table.FindR(rewards, function (kk, vv) {
                    return vv.goodsId == _this._TOKEN;
                });
                if (k[1] != null) {
                    var count = rewards[k[1]].count;
                    this.imgIcon.source = zj.cachekey("ui_iconresources_zuanshi1_png", this);
                    this.lbGemstoneNum.text = "x" + count;
                    this.goodsInfo = k[0];
                }
            }
            else {
                var arrCollection = new eui.ArrayCollection();
                for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                    var v = rewards_1[_i];
                    arrCollection.addItem(v);
                }
                this.lstRMB.dataProvider = arrCollection;
                this.lstRMB.itemRenderer = zj.GiftCommonAwardItem;
            }
        };
        GiftLevelPopItem.prototype.onBtnGiftGet = function () {
            var _this = this;
            this.btnGiftGet.enabled = false;
            if (this.giftInfo.gift_form == 6) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.dayInfo.index).then(function (msg) { _this.simulateCharge(msg); });
            }
            else if (this.giftInfo.gift_form == 3) {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (msg) { _this.simulateCharge(msg); });
            }
        };
        GiftLevelPopItem.prototype.simulateCharge = function (msg) {
            var _this = this;
            this.btnGiftGet.enabled = true;
            for (var _i = 0, _a = msg.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.index == this.info["index"]) {
                    this.info = zj.Table.DeepCopy(v);
                }
            }
            var info = this.info;
            if (msg.getGoods.length > 0) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.getGoods);
                    dialog.setCB(function () {
                        _this.data.father.updateItem(info);
                    });
                });
            }
        };
        GiftLevelPopItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return GiftLevelPopItem;
    }(eui.ItemRenderer));
    zj.GiftLevelPopItem = GiftLevelPopItem;
    __reflect(GiftLevelPopItem.prototype, "zj.GiftLevelPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelPopItem.js.map