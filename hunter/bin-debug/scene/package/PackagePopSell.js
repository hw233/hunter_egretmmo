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
    // 背包-物品出售
    // lizhengqiang
    // 2018/11/13
    var PackagePopSell = (function (_super) {
        __extends(PackagePopSell, _super);
        function PackagePopSell() {
            var _this = _super.call(this) || this;
            _this.itemId = 0;
            _this.price = 0;
            _this.count = 1;
            _this.max = 0;
            _this.skinName = "resource/skins/package/PackagePopSellSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSub, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnSubBegin, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnSubEnd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAddBegin, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAddEnd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMax, _this);
            _this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSell, _this);
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
        PackagePopSell.prototype.init = function (father) {
            this.father = father;
            this.itemId = this.father.itemId;
            this.setInfoProp();
            this.setInfoCount();
            this.timer = new egret.Timer(170, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        };
        PackagePopSell.prototype.setInfoProp = function () {
            var config = zj.PlayerItemSystem.ItemConfig(this.itemId);
            this.price = config["price"];
            this.max = zj.Game.PlayerItemSystem.itemCount(this.itemId);
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
        PackagePopSell.prototype.setInfoCount = function () {
            this.lbCount.text = this.count.toString();
            this.lbIncome.text = (this.count * this.price).toString();
        };
        PackagePopSell.prototype.onTimer = function () {
            if (this.btnSub.currentState == "down")
                this.onBtnSub();
            if (this.btnAdd.currentState == "down")
                this.onBtnAdd();
        };
        PackagePopSell.prototype.onBtnSub = function () {
            if (this.count > 1) {
                this.count = this.count - 1;
                this.setInfoCount();
            }
        };
        PackagePopSell.prototype.onBtnSubBegin = function () {
            this.timer.start();
        };
        PackagePopSell.prototype.onBtnSubEnd = function () {
            this.timer.stop();
        };
        PackagePopSell.prototype.onBtnAdd = function () {
            if (this.count < this.max) {
                this.count = this.count + 1;
                this.setInfoCount();
            }
        };
        PackagePopSell.prototype.onBtnAddBegin = function () {
            this.timer.start();
        };
        PackagePopSell.prototype.onBtnAddEnd = function () {
            this.timer.stop();
        };
        PackagePopSell.prototype.onBtnMax = function () {
            this.count = this.max;
            this.setInfoCount();
        };
        PackagePopSell.prototype.onBtnSell = function () {
            var _this = this;
            this.onBtnClose();
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.count = this.count;
            goodsInfo.goodsId = this.itemId;
            goodsInfo.index = 0;
            goodsInfo.showType = 0;
            zj.Game.PlayerItemSystem.sellGoods([goodsInfo]).then(function () {
                _this.father.update();
                zj.Game.EventManager.event(zj.GameEvent.SHOW_COMMON_MESSAGE, { source: "ui_iconresources_jinbi3_png", text: "+" + _this.count * _this.price });
            });
        };
        PackagePopSell.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
        };
        return PackagePopSell;
    }(zj.Dialog));
    zj.PackagePopSell = PackagePopSell;
    __reflect(PackagePopSell.prototype, "zj.PackagePopSell");
})(zj || (zj = {}));
//# sourceMappingURL=PackagePopSell.js.map