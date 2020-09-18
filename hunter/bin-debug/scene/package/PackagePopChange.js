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
    // 背包-物品转化
    // lizhengqiang
    // 2018/11/16
    var PackagePopChange = (function (_super) {
        __extends(PackagePopChange, _super);
        function PackagePopChange() {
            var _this = _super.call(this) || this;
            _this.itemId = 0;
            _this.composeId = 0;
            _this.count = 1;
            _this.max = 0;
            _this.MAXNUM = 999;
            _this.skinName = "resource/skins/package/PackagePopChangeSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSub, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnSubBegin, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnSubEnd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnAddBegin, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAddEnd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMax, _this);
            _this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChange, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer != null) {
                    _this.timer.stop();
                    _this.timer = null;
                }
                ;
            }, null);
            return _this;
        }
        PackagePopChange.prototype.init = function (father) {
            this.father = father;
            this.itemId = this.father.itemId;
            this.setInfoConvert();
            this.setInfoCount();
            this.timer = new egret.Timer(170, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        };
        PackagePopChange.prototype.setInfoConvert = function () {
            for (var _i = 0, _a = Object.keys(zj.TableQuickMall.Table()); _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.TableQuickMall.Item(v).consume_type == this.itemId) {
                    this.composeId = zj.TableQuickMall.Item(v).item_id;
                }
            }
            var count1 = zj.Game.PlayerItemSystem.itemCount(this.itemId);
            var count11 = zj.TableQuickMall.Item(this.composeId).consume_num;
            // 被转化物品
            var config1 = zj.PlayerItemSystem.ItemConfig(this.itemId);
            this.imgFrameL.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.itemId), this);
            this.imgIconL.source = zj.cachekey(config1["path"], this);
            this.lbNameL.text = config1["name"];
            this.lbNumL.text = count1 + "/" + count11;
            zj.Set.LabelNumberGreenAndRed(this.lbNumL, count1, count11);
            // 转化物品
            var config2 = zj.PlayerItemSystem.ItemConfig(this.composeId);
            this.imgFrameR.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.composeId), this);
            this.imgIconR.source = zj.cachekey(config2["path"], this);
            this.lbNameR.text = config2["name"];
            this.lbNumR.text = "x1";
            this.max = Math.floor(count1 / count11) > this.MAXNUM ? this.MAXNUM : Math.floor(count1 / count11);
            if (this.max < 1)
                this.max = 1;
            if (this.max > 100) {
                this.max = 100;
            }
        };
        PackagePopChange.prototype.setInfoCount = function () {
            this.lbCount.text = this.count.toString();
        };
        PackagePopChange.prototype.onTimer = function () {
            if (this.btnSub.currentState == "down")
                this.onBtnSub();
            if (this.btnAdd.currentState == "down")
                this.onBtnAdd();
        };
        PackagePopChange.prototype.onBtnSub = function () {
            if (this.count > 1) {
                this.count = this.count - 1;
                this.setInfoCount();
            }
        };
        PackagePopChange.prototype.onBtnSubBegin = function () {
            this.timer.start();
        };
        PackagePopChange.prototype.onBtnSubEnd = function () {
            this.timer.stop();
        };
        PackagePopChange.prototype.onBtnAdd = function () {
            if (this.count < this.max) {
                this.count = this.count + 1;
                this.setInfoCount();
            }
        };
        PackagePopChange.prototype.onBtnAddBegin = function () {
            this.timer.start();
        };
        PackagePopChange.prototype.onBtnAddEnd = function () {
            this.timer.stop();
        };
        PackagePopChange.prototype.onBtnMax = function () {
            this.count = this.max;
            this.setInfoCount();
        };
        PackagePopChange.prototype.onBtnChange = function () {
            var _this = this;
            zj.Game.PlayerItemSystem.quickMall(this.composeId, this.count).then(function (resp) {
                _this.father.update();
                _this.onBtnClose();
                setTimeout(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                    });
                }, 500);
            });
        };
        PackagePopChange.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
        };
        return PackagePopChange;
    }(zj.Dialog));
    zj.PackagePopChange = PackagePopChange;
    __reflect(PackagePopChange.prototype, "zj.PackagePopChange");
})(zj || (zj = {}));
//# sourceMappingURL=PackagePopChange.js.map