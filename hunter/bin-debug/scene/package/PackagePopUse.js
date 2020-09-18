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
    // 背包-物品使用-常规
    // lizhengqiang
    // 2018/11/13
    var PackagePopUse = (function (_super) {
        __extends(PackagePopUse, _super);
        function PackagePopUse() {
            var _this = _super.call(this) || this;
            _this.itemId = 0;
            _this.price = 0;
            _this.power = 0;
            _this.count = 1;
            _this.max = 0;
            _this.MAX_CIMELIA = 100;
            _this.skinName = "resource/skins/package/PackagePopUseSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSub, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnSubBegin, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnSubEnd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAddBegin, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAddEnd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMax, _this);
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer != null) {
                    _this.timer.stop();
                    _this.timer = null;
                }
                ;
            }, null);
            return _this;
        }
        PackagePopUse.prototype.init = function (father) {
            this.father = father;
            this.itemId = this.father.itemId;
            this.setInfoProp();
            this.setInfoCount();
            this.timer = new egret.Timer(170, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        };
        PackagePopUse.prototype.setInfoProp = function () {
            var config = zj.PlayerItemSystem.ItemConfig(this.itemId);
            this.price = config["price"];
            this.power = config["power"];
            this.max = zj.Game.PlayerItemSystem.itemCount(this.itemId);
            if (zj.PlayerItemSystem.ItemType(this.itemId) == message.EGoodsType.GOODS_TYPE_CIMELIA) {
                if (this.max > this.MAX_CIMELIA) {
                    this.max = this.MAX_CIMELIA;
                }
            }
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.itemId), this);
            this.imgIcon.source = zj.cachekey(config["path"], this);
            this.lbName.text = config["name"];
            this.lbType.text = zj.PlayerItemSystem.ItemTypeDesc(this.itemId);
            this.lbNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Package.has, this.max);
            this.lbIncome.text = config["price"].toString();
            // 遮罩
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.imgIcon.mask = null;
            if (zj.PlayerItemSystem.IsImgMask(this.itemId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(this.itemId)) {
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
        };
        PackagePopUse.prototype.setInfoCount = function () {
            var type = zj.PlayerItemSystem.ItemType(this.itemId);
            var config = zj.PlayerItemSystem.ItemConfig(this.itemId);
            if (type == message.EGoodsType.GOODS_TYPE_PROP) {
                var resType = zj.PlayerItemSystem.UseOfResource(this.itemId);
                this.imgCost.visible = true;
                this.imgCost.source = zj.cachekey(zj.PlayerItemSystem.ItemConfig(resType)["path"], this);
                if (resType == message.EResourceType.RESOURCE_MONEY) {
                    this.lbIncome.text = (config["price"] * this.count).toString();
                }
                else if (resType == message.EResourceType.RESOURCE_POWER) {
                    this.lbIncome.text = (config["power"] * this.count).toString();
                }
            }
            else if (type == message.EGoodsType.GOODS_TYPE_CIMELIA || type == message.EGoodsType.GOODS_TYPE_SECRET) {
                this.imgCost.visible = false;
                this.lbIncome.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Package.sell_rand, this.count);
            }
            this.lbCount.text = this.count.toString();
        };
        PackagePopUse.prototype.onTimer = function () {
            if (this.btnSub.currentState == "down")
                this.onBtnSub();
            if (this.btnAdd.currentState == "down")
                this.onBtnAdd();
        };
        PackagePopUse.prototype.onBtnSub = function () {
            if (this.count > 1) {
                this.count = this.count - 1;
                this.setInfoCount();
            }
        };
        PackagePopUse.prototype.onBtnSubBegin = function () {
            this.timer.start();
        };
        PackagePopUse.prototype.onBtnSubEnd = function () {
            this.timer.stop();
        };
        PackagePopUse.prototype.onBtnAdd = function () {
            if (this.count < this.max) {
                this.count = this.count + 1;
                this.setInfoCount();
            }
        };
        PackagePopUse.prototype.onBtnAddBegin = function () {
            this.timer.start();
        };
        PackagePopUse.prototype.onBtnAddEnd = function () {
            this.timer.stop();
        };
        PackagePopUse.prototype.onBtnMax = function () {
            this.count = this.max;
            this.setInfoCount();
        };
        PackagePopUse.prototype.onBtnUse = function () {
            var _this = this;
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.count = this.count;
            goodsInfo.goodsId = this.itemId;
            goodsInfo.index = 0;
            goodsInfo.showType = 0;
            zj.Game.PlayerItemSystem.useProp([goodsInfo]).then(function (resp) {
                _this.father.update();
                _this.onBtnClose();
                var type = Math.floor(_this.itemId / 10000);
                if (type == message.EGoodsType.GOODS_TYPE_PROP) {
                    var text = "+" + _this.count * (_this.power ? _this.power : _this.price);
                    var source = zj.PlayerItemSystem.ItemConfig(zj.PlayerItemSystem.UseOfResource(_this.itemId))["path"];
                    zj.Game.EventManager.event(zj.GameEvent.SHOW_COMMON_MESSAGE, { source: source, text: text });
                }
                else if (type == message.EGoodsType.GOODS_TYPE_CIMELIA || type == message.EGoodsType.GOODS_TYPE_SECRET) {
                    setTimeout(function () {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(resp.getGoods);
                            dialog.show();
                        });
                    }, 500);
                }
            });
        };
        PackagePopUse.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
        };
        return PackagePopUse;
    }(zj.Dialog));
    zj.PackagePopUse = PackagePopUse;
    __reflect(PackagePopUse.prototype, "zj.PackagePopUse");
})(zj || (zj = {}));
//# sourceMappingURL=PackagePopUse.js.map