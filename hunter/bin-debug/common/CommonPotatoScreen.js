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
    var CommonPotatoScreen = (function (_super) {
        __extends(CommonPotatoScreen, _super);
        function CommonPotatoScreen() {
            var _this = _super.call(this) || this;
            _this.screenTable = {};
            _this.screenMain = [];
            _this.screenAddition = [];
            _this.isShowAttribute = false;
            _this.isRemovedFromTapGesture = false;
            _this.skinName = "resource/skins/common/CommonPotatoScreenSkin.exml";
            _this.init();
            return _this;
        }
        CommonPotatoScreen.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnMain.addEventListener(tap, this.onBtnMain, this);
            this.btnAdd1.addEventListener(tap, this.onBtnAdd1, this);
            this.btnAdd2.addEventListener(tap, this.onBtnAdd2, this);
            this.btnAdd3.addEventListener(tap, this.onBtnAdd3, this);
            this.btnReset.addEventListener(tap, this.onBtnReset, this);
            this.btnConfirm.addEventListener(tap, this.onBtnConfirm, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);
            zj.Helper.SetButtonLabel(this.btnMain, "全部", 18);
            zj.Helper.SetButtonLabel(this.btnAdd1, "全部", 18);
            zj.Helper.SetButtonLabel(this.btnAdd2, "全部", 18);
            zj.Helper.SetButtonLabel(this.btnAdd3, "全部", 18);
            this.screenTable = zj.TableClientPotatoScreen.Table();
        };
        CommonPotatoScreen.prototype.setInfo = function (screenMain, screenAddition, callback) {
            this.callback = callback;
            this.screenMain = screenMain;
            this.screenAddition = screenAddition;
            this.refresh();
        };
        CommonPotatoScreen.prototype.refresh = function () {
            var _this = this;
            var getAttributeName = function (id) {
                if (id == 0) {
                    return zj.TextsConfig.TextsConfig_Potato.all;
                }
                else {
                    return _this.screenTable[id].name;
                }
            };
            this.btnMain.label = getAttributeName(this.screenMain[0]);
            for (var i = 0; i < this.screenAddition.length; i++) {
                var v = this.screenAddition[i];
                var btn = this["btnAdd" + (i + 1)];
                btn.label = getAttributeName(v);
            }
            ;
        };
        CommonPotatoScreen.prototype.onTapEnd = function (e) {
            var _this = this;
            var dialog = this.groupAll.getChildByName("common-potato-screen-attribute");
            if (dialog) {
                var global_1 = this.localToGlobal(this.groupAll.x, this.groupAll.y);
                global_1.x -= zj.Game.UIManager.x;
                var minX = global_1.x + dialog.x;
                var maxX = minX + dialog.width;
                var minY = global_1.y + dialog.y;
                var maxY = minY + dialog.height;
                var touchPoint = this.localToGlobal(e.stageX, e.stageY);
                touchPoint.x -= zj.Game.UIManager.x;
                if ((touchPoint.x >= minX && touchPoint.x <= maxX) && (touchPoint.y >= minY && touchPoint.y <= maxY)) {
                    return;
                }
                this.groupAll.removeChild(dialog);
                this.isShowAttribute = false;
                // fix bug: when click the button, first invoke the tap end listener, then response the click function.
                this.isRemovedFromTapGesture = true;
                egret.setTimeout(function () {
                    _this.isRemovedFromTapGesture = false;
                }, this, 100);
            }
        };
        CommonPotatoScreen.prototype.onBtnClose = function () {
            var _this = this;
            if (this.isShowAttribute == true) {
                this.removeAttributeView();
                return;
            }
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Hunter_Compound.closeNotSave, function () {
                if (_this.callback) {
                    _this.callback(_this.screenMain, _this.screenAddition);
                }
                egret.Tween.get(_this.groupAll).wait(500).call(function () {
                    _this.close(zj.UI.HIDE_TO_TOP);
                });
            });
        };
        CommonPotatoScreen.prototype.onBtnMain = function () {
            var _this = this;
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            zj.loadUI(zj.CommonPotatoScreenAttribute).then(function (dialog) { return _this.loadAttributeUI(dialog, 0); });
        };
        CommonPotatoScreen.prototype.onBtnAdd1 = function () {
            var _this = this;
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            zj.loadUI(zj.CommonPotatoScreenAttribute).then(function (dialog) { return _this.loadAttributeUI(dialog, 1); });
        };
        CommonPotatoScreen.prototype.onBtnAdd2 = function () {
            var _this = this;
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            if (this.isShowAttribute) {
                this.removeAttributeView();
                return;
            }
            zj.loadUI(zj.CommonPotatoScreenAttribute).then(function (dialog) { return _this.loadAttributeUI(dialog, 2); });
        };
        CommonPotatoScreen.prototype.onBtnAdd3 = function () {
            var _this = this;
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            if (this.isShowAttribute) {
                this.removeAttributeView();
                return;
            }
            zj.loadUI(zj.CommonPotatoScreenAttribute).then(function (dialog) { return _this.loadAttributeUI(dialog, 3); });
        };
        CommonPotatoScreen.prototype.loadAttributeUI = function (dialog, type) {
            var _this = this;
            this.isShowAttribute = true;
            var destX = this.groupAll.width * 0.5 - dialog.width * 0.5;
            var destY = 0;
            if (type == 0) {
                destY = this.groupMain.y + this.groupMain.height - 20;
            }
            else if (type == 1) {
                destY = this.groupAttribute.y + this.btnAdd1.y + this.btnAdd1.height + 10;
            }
            else if (type == 2 || type == 3) {
                dialog.anchorOffsetY = dialog.height;
                destY = this.groupAttribute.y + this["btnAdd" + type].y - 10;
            }
            else {
                throw new Error("type error.");
            }
            dialog.x = destX;
            dialog.y = destY;
            dialog.name = "common-potato-screen-attribute";
            if (type == 0) {
                dialog.setInfo(true, this.screenMain[0], function (id) {
                    _this.screenMain[0] = id;
                    _this.removeAttributeView(true);
                });
            }
            else if (type == 1) {
                dialog.setInfo(false, this.screenAddition[0], function (id) {
                    _this.screenAddition[0] = id;
                    _this.removeAttributeView(true);
                });
            }
            else if (type == 2) {
                dialog.setInfo(false, this.screenAddition[1], function (id) {
                    _this.screenAddition[1] = id;
                    _this.removeAttributeView(true);
                });
            }
            else if (type == 3) {
                dialog.setInfo(false, this.screenAddition[2], function (id) {
                    _this.screenAddition[2] = id;
                    _this.removeAttributeView(true);
                });
            }
            this.groupAll.addChild(dialog);
            var time = 120;
            egret.Tween.get(dialog).
                to({ scaleY: 0 }, 0).
                to({ scaleY: 1.05 }, time).
                to({ scaleY: 0.95 }, time).
                to({ scaleY: 1.0 }, time);
        };
        CommonPotatoScreen.prototype.removeAttributeView = function (refresh) {
            var dialog = this.groupAll.getChildByName("common-potato-screen-attribute");
            if (dialog) {
                this.groupAll.removeChild(dialog);
            }
            this.isShowAttribute = false;
            if (refresh)
                this.refresh();
        };
        CommonPotatoScreen.prototype.onBtnReset = function () {
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            if (this.isShowAttribute === true) {
                this.removeAttributeView();
                return;
            }
            this.screenMain = [0];
            this.screenAddition = [0, 0, 0];
            this.refresh();
        };
        CommonPotatoScreen.prototype.onBtnConfirm = function () {
            if (this.isRemovedFromTapGesture)
                return;
            this.isRemovedFromTapGesture = false;
            if (this.isShowAttribute === true) {
                this.removeAttributeView();
                return;
            }
            if (this.callback) {
                this.callback(this.screenMain, this.screenAddition);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        CommonPotatoScreen.ID = "CommonPotatoScreen";
        return CommonPotatoScreen;
    }(zj.Dialog));
    zj.CommonPotatoScreen = CommonPotatoScreen;
    __reflect(CommonPotatoScreen.prototype, "zj.CommonPotatoScreen");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPotatoScreen.js.map