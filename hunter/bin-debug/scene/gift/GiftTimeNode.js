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
    var GiftTimeNode = (function (_super) {
        __extends(GiftTimeNode, _super);
        function GiftTimeNode() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.cb = null;
            _this.CB = null;
            _this.info = null;
            _this.onBtnClose = function (isPop) {
                if (isPop === void 0) { isPop = true; }
                if (_this.cb != null) {
                    _this.cb();
                }
                if (_this.CB != null) {
                    _this.CB();
                }
                if (isPop && _this.father && _this.father.popItem) {
                    _this.father.popItem(_this.info["index"]);
                }
                else {
                    if (_this.father && _this.father.closeUp) {
                        _this.father.closeUp();
                    }
                }
                _this.close(zj.UI.HIDE_TO_TOP);
            };
            _this.skinName = "resource/skins/gift/GiftTimeNodeSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                _this.father = null;
            }, null);
            return _this;
        }
        GiftTimeNode.prototype.setInfo = function (info, father, cb, isActivity) {
            if (isActivity === void 0) { isActivity = false; }
            this.info = info;
            this.father = father;
            this.cb = cb;
            if (this.father && this.father.openDown) {
                this.father.openDown();
            }
            var ui;
            if (info["gift_index"] == 100208) {
                // "HXH_GiftNewFresh"
                this.lbTipClose.visible = false;
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            }
            else if (info["gift_index"] == 100209) {
                // "HXH_GiftNew"
            }
            else {
                // "HXH_GiftTime"
                ui = new zj.GiftTime();
            }
            this.groupAddGift.removeChildren();
            this.groupAddGift.addChild(ui);
            ui.setInfo(false, info, this, isActivity);
        };
        GiftTimeNode.prototype.setCB = function (CB) {
            this.CB = CB;
        };
        GiftTimeNode.prototype.onClickClose = function (e) {
            var global = this.groupAddGift.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupAddGift.width, this.groupAddGift.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose(false);
            }
        };
        GiftTimeNode.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftTimeNode.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return GiftTimeNode;
    }(zj.Dialog));
    zj.GiftTimeNode = GiftTimeNode;
    __reflect(GiftTimeNode.prototype, "zj.GiftTimeNode");
})(zj || (zj = {}));
//# sourceMappingURL=GiftTimeNode.js.map