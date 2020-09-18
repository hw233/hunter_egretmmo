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
    // 20190402
    var GiftTimePop = (function (_super) {
        __extends(GiftTimePop, _super);
        function GiftTimePop() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.cb = null;
            _this.change = false;
            _this.simulateCharge = function (gameInfo) {
                _this.btnGet.enabled = true;
                _this.change = true;
                if (gameInfo.getGoods.length > 0) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(gameInfo.getGoods);
                        dialog.setCB(_this.onBtnClose);
                    });
                }
            };
            _this.onBtnClose = function () {
                if (_this.father != null) {
                    _this.father.closeUp();
                }
                if (_this.cb != null) {
                    _this.cb();
                }
                _this.close(zj.UI.HIDE_TO_TOP);
            };
            _this.skinName = "resource/skins/gift/GiftTimePopSkin.exml";
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.lbTipClose); // 因为是循环播放，需要特别处理
                _this.giftInfo = null;
                _this.father = null;
            }, null);
            return _this;
        }
        GiftTimePop.prototype.setInfo = function (info, father, cb) {
            this.info = info;
            this.father = father;
            this.cb = cb;
            if (this.father != null) {
                this.father.openDown();
            }
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.setInfoItem();
            this.setInfoButton();
            egret.Tween.get(this.lbTipClose, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        GiftTimePop.prototype.setInfoItem = function () {
            var _this = this;
            var dailyInfo = zj.PlayerGiftSystem.Instance_days(this.info["dailyIndex"]);
            var tmp = zj.Table.FindR(dailyInfo.goods_id, function (k, v) {
                return v == message.EResourceType.RESOURCE_TOKEN;
            });
            this.lbPopName.text = dailyInfo.des;
            if (dailyInfo.goods_id.length == 1) {
                if (tmp[1] != null) {
                    var count = dailyInfo.goods_count[tmp[1]];
                    this.imgIcon.source = zj.cachekey("ui_iconresources_zuanshi1_png", this);
                    this.lbAwardNum.text = count.toString();
                    this.groupAni.removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                        _this.groupAni.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            else {
                this.groupOne.visible = false;
                var arrCollection = new eui.ArrayCollection();
                for (var i = 0; i < dailyInfo.goods_id.length; i++) {
                    var goodsInfo = new message.GoodsInfo();
                    goodsInfo.goodsId = dailyInfo.goods_id[i];
                    goodsInfo.showType = 1;
                    goodsInfo.count = dailyInfo.goods_count[i];
                    arrCollection.addItem(goodsInfo);
                }
                this.lstRMB.dataProvider = arrCollection;
                this.lstRMB.itemRenderer = zj.GiftCommonAwardItem;
            }
        };
        GiftTimePop.prototype.setInfoButton = function () {
            if (this.giftInfo.gift_form != 3) {
                var hasGet = Number(this.info["dailyIndex"]) - Number(this.giftInfo.daily_index) + Number(this.info["mark"]);
                var canGet = Number(this.giftInfo.daily_num) - hasGet;
                this.btnGet.enabled = (this.info["mark"] == 0);
                this.imgGet.visible = (this.info["mark"] != 0);
                this.lbAwardTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.can_get_and_has_get, canGet);
            }
            else {
                var hasGet = Number(this.info["dailyInfo"]) - Number(this.giftInfo.daily_index) + Number(this.info["buy_times"]);
                var canGet = Number(this.giftInfo.daily_num) - hasGet;
                this.btnGet.enabled = (this.info["mark"] == 0);
                this.imgGet.visible = (this.info["mark"] != 0);
                this.lbAwardTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.can_get_and_has_get, canGet);
            }
        };
        GiftTimePop.prototype.onBtnGet = function () {
            var _this = this;
            this.btnGet.enabled = false;
            if (this.giftInfo.gift_form != 3) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.info["dailyIndex"]).then(function (gameInfo) {
                    _this.simulateCharge(gameInfo);
                });
            }
            else {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                    _this.simulateCharge(gameInfo);
                });
            }
        };
        GiftTimePop.prototype.onClickClose = function (e) {
            var global = this.groupMain.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose();
            }
        };
        return GiftTimePop;
    }(zj.Dialog));
    zj.GiftTimePop = GiftTimePop;
    __reflect(GiftTimePop.prototype, "zj.GiftTimePop");
})(zj || (zj = {}));
//# sourceMappingURL=GiftTimePop.js.map