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
    // created by hhh in 2018/12/12
    /************** 卡片部分 突破界面 ****************/
    var CardBreakSelectItem = (function (_super) {
        __extends(CardBreakSelectItem, _super);
        function CardBreakSelectItem() {
            var _this = _super.call(this) || this;
            _this.tbl = [];
            _this.focus = false;
            _this.touchX = 0;
            _this.touchY = 0;
            _this.timeOut = 0;
            _this.skinName = "resource/skins/card/CardBreakSelectItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            zj.cachekeys(zj.UIResource["CardBreakSelectItem"], null);
            _this.init();
            return _this;
        }
        CardBreakSelectItem.prototype.init = function () {
            this.groupClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupClick, this);
            this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupLongClickBegin, this);
            this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchGroupLongClickMove, this);
            this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchGroupLongClickEnd, this);
            this.focus = false;
        };
        CardBreakSelectItem.prototype.dataChanged = function () {
            this.father = this.data.father;
            this.index = this.data.index;
            this.info = this.data.info;
            this.breakLevel = this.data.breakLevel;
            this.tbl = this.data.infos;
            var tbl = zj.TableItemPotato.Item(this.info.id);
            var framePic = zj.PlayerCardSystem.GetItemFrame(this.info.id)[0];
            var imgFramePath = framePic;
            var imgCardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
            var imgIconPath = tbl.path;
            this.imageFrame.source = zj.cachekey(imgFramePath, this);
            this.imageCardType.source = zj.cachekey(imgCardTypePath, this);
            this.imageIcon.source = zj.cachekey(imgIconPath, this);
            this.labelLevel.text = this.info.level + "";
            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            else
                zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            var isSel = false;
            for (var k in zj.Game.PlayerCardSystem.getBreakPotatoSel()) {
                if (this.index == zj.Game.PlayerCardSystem.getBreakPotatoSel()[k]) {
                    isSel = true;
                    break;
                }
            }
            var lock = false;
            for (var k in this.tbl) {
                if (this.tbl[k].index == this.info.index && (this.tbl[k].pos != 0 || this.tbl[k].is_lock)) {
                    lock = true;
                    break;
                }
            }
            this.imageBingo.visible = isSel;
            this.imageShadow.visible = lock;
            this.imageLock.visible = lock;
        };
        CardBreakSelectItem.prototype.onTouchGroupLongClickBegin = function (e) {
            var _this = this;
            this.touchX = e.stageX;
            this.touchY = e.stageY;
            this.timeOut = egret.setTimeout(function () { zj.TipManager.ShowCard(_this.info); }, this, 1000);
        };
        CardBreakSelectItem.prototype.onTouchGroupLongClickMove = function (e) {
            if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
                return;
            egret.clearTimeout(this.timeOut);
            this.onTouchGroupClick();
        };
        CardBreakSelectItem.prototype.onTouchGroupLongClickEnd = function () {
            egret.clearTimeout(this.timeOut);
            this.onTouchGroupClick();
        };
        CardBreakSelectItem.prototype.onTouchGroupClick = function () {
            var info = zj.TablePotatoBreak.Item(this.breakLevel);
            var gnrNum = info.exchange_count;
            var hava = false;
            for (var k in zj.Game.PlayerCardSystem.getBreakPotatoSel()) {
                if (zj.Game.PlayerCardSystem.getBreakPotatoSel()[k] == this.index) {
                    hava = true;
                    break;
                }
            }
            var host = false;
            for (var k in this.tbl) {
                if (this.tbl[k].index == this.info.index && this.tbl[k].pos != 0) {
                    host = true;
                    break;
                }
            }
            var lock = false;
            for (var k in this.tbl) {
                if (this.tbl[k].index == this.info.index && this.tbl[k].is_lock) {
                    lock = true;
                    break;
                }
            }
            if (host) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.card_be_break);
                return;
            }
            else if (lock) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.card_be_lock);
                return;
            }
            else if (zj.Game.PlayerCardSystem.getBreakPotatoSel().length >= gnrNum && !this.focus && !hava) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                return;
            }
            else if (!this.focus && (!hava || zj.Game.PlayerCardSystem.getBreakPotatoSel().length == 0)) {
                this.focus = !this.focus;
                zj.Game.PlayerCardSystem.setBreakPotatoSel(this.index);
                this.imageBingo.visible = this.focus;
            }
            else if (this.focus) {
                var findK = -1;
                for (var i = 0; i < zj.Game.PlayerCardSystem.getBreakPotatoSel().length; i++) {
                    if (this.index == zj.Game.PlayerCardSystem.getBreakPotatoSel()[i]) {
                        findK = i;
                        break;
                    }
                }
                if (findK != -1) {
                    zj.Game.PlayerCardSystem.getBreakPotatoSel().splice(findK, 1);
                    this.imageBingo.visible = !this.focus;
                }
                else {
                    this.imageBingo.visible = this.focus;
                }
                this.focus = !this.focus;
            }
            else if (!this.focus && hava) {
                this.focus = !this.focus;
                for (var i = 0; i < zj.Game.PlayerCardSystem.getBreakPotatoSel().length; i++) {
                    if (this.index == zj.Game.PlayerCardSystem.getBreakPotatoSel()[i]) {
                        zj.Game.PlayerCardSystem.getBreakPotatoSel().splice(i, 1);
                        this.imageBingo.visible = !this.focus;
                    }
                }
            }
            this.father.setConsume();
        };
        return CardBreakSelectItem;
    }(eui.ItemRenderer));
    zj.CardBreakSelectItem = CardBreakSelectItem;
    __reflect(CardBreakSelectItem.prototype, "zj.CardBreakSelectItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardBreakSelectItem.js.map