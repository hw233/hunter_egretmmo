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
    // created by hhh in 2018/12/11
    /************** 卡片部分 突破界面 ****************/
    var CardBreakSelectDialog = (function (_super) {
        __extends(CardBreakSelectDialog, _super);
        function CardBreakSelectDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardBreakSelectDialogSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        CardBreakSelectDialog.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnSelectedOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelectedOk, this);
        };
        CardBreakSelectDialog.prototype.setInfo = function (id, index, breaklevel, info, father) {
            this.potatoId = id;
            this.index = index;
            this.breakLevel = breaklevel;
            this.info = info;
            this.father = father;
            this.setInfoList();
            this.setConsume();
            var name = zj.TableItemPotato.Item(this.potatoId).name;
            var level = zj.TablePotatoBreak.Item(this.breakLevel).exchange_level;
            if (level == 0)
                this.labelTip.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_break_rand, name));
            else
                this.labelTip.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_break_tips, level, name));
        };
        CardBreakSelectDialog.prototype.setInfoList = function () {
            var level = zj.TablePotatoBreak.Item(this.breakLevel).exchange_level;
            var tbl = zj.PlayerCardSystem.GetAllCardByName(this.info, this.potatoId, this.index, level);
            this.consume = zj.TablePotatoBreak.Item(this.breakLevel).exchange_count;
            this.listMetarials.itemRenderer = zj.CardBreakSelectItem;
            var collection = [];
            for (var i = 0; i < tbl.length; i++) {
                collection[i] = { index: i, info: tbl[i], breakLevel: this.breakLevel, infos: tbl, father: this };
            }
            this.listMetarials.dataProvider = new eui.ArrayCollection(collection);
        };
        CardBreakSelectDialog.prototype.setConsume = function () {
            var len = zj.Game.PlayerCardSystem.getBreakPotatoSel().length;
            if (len != this.consume)
                this.labelSelectedNum.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.awaken_select, len, this.consume));
            else
                this.labelSelectedNum.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.awaken_select_next, len, this.consume));
        };
        CardBreakSelectDialog.prototype.onBtnSelectedOk = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.father.setCardBreak();
        };
        CardBreakSelectDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            zj.Game.PlayerCardSystem.initBreakPotatoSel();
            this.father.setCardBreak();
        };
        return CardBreakSelectDialog;
    }(zj.Dialog));
    zj.CardBreakSelectDialog = CardBreakSelectDialog;
    __reflect(CardBreakSelectDialog.prototype, "zj.CardBreakSelectDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardBreakSelectDialog.js.map