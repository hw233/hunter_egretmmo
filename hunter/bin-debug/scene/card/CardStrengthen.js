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
    /**
     * 卡片强化信息
     * created by Lian Lei
     * 2018.11.27
     */
    var CardStrengthen = (function (_super) {
        __extends(CardStrengthen, _super);
        function CardStrengthen() {
            var _this = _super.call(this) || this;
            _this.listAttriData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/card/CardStrengthenSkin.exml";
            _this.btnStrengthenFiveNum.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStrengthenFive, _this);
            _this.btnStrengthenUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStrengthenUp, _this);
            _this.btnGoBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoBreak, _this);
            _this.btnGoUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoUpStar, _this);
            return _this;
        }
        CardStrengthen.prototype.setInfo = function (info, cb) {
            this.cardInfo = info;
            this.callback = cb;
            this.refresh();
        };
        // 初始化(刷新)当前强化卡片信息
        CardStrengthen.prototype.refresh = function () {
            this.cardInfo = zj.PlayerCardSystem.RefreshCard(this.cardInfo);
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level);
            if (this.cardInfo.break_level != 0) {
                this.labelCurrentLevel.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_level_before, this.cardInfo.level, zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level));
            }
            else {
                this.labelCurrentLevel.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_level_before, this.cardInfo.level, zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1]));
            }
            this.labelCurrentAtt.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_attr_before, baseStr[0][0]));
            if (this.cardInfo.break_level != 0 && this.cardInfo.level + 1 > (zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level)) {
                this.labelNextLevel.textFlow = zj.Util.RichText("" + zj.TextsConfig.TextsConfig_Hunter.card_level_max);
                this.labelNextAtt.textFlow = zj.Util.RichText("" + zj.TextsConfig.TextsConfig_Hunter.card_level_attr_max);
            }
            else if (this.cardInfo.break_level != 0 && this.cardInfo.level + 1 <= (zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level)) {
                this.labelNextLevel.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_level_after, this.cardInfo.level + 1, zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level));
                this.labelNextAtt.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_attr_after, zj.PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level + 1)[0][0]));
            }
            else if (this.cardInfo.level + 1 > zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1]) {
                this.labelNextLevel.textFlow = zj.Util.RichText("" + (zj.TextsConfig.TextsConfig_Hunter.card_level_max));
                this.labelNextAtt.textFlow = zj.Util.RichText("" + (zj.TextsConfig.TextsConfig_Hunter.card_level_attr_max));
            }
            else {
                this.labelNextLevel.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_level_after, this.cardInfo.level + 1, zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1]));
                this.labelNextAtt.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level_attr_after, zj.PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level + 1)[0][0]));
            }
            var addStr = zj.PlayerCardSystem.GetAddStr(this.cardInfo);
            this.listAttriData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.cardInfo = this.cardInfo;
                itemData.width = this.scrollerAttri.width;
                itemData.addStrlength = addStr.length;
                itemData.type = 0;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.itemRenderer = zj.CardAttriItem;
            this.labelStrengthenNum.textFlow = zj.Util.RichText("" + zj.CommonConfig.potato_uplevel_comsume_money(this.cardInfo.star, this.cardInfo.level));
            var times = null;
            if (this.cardInfo.break_level != 0 && (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) <= 5) {
                times = zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level;
            }
            else if (this.cardInfo.break_level != 0 && (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level > 5)) {
                times = 5;
            }
            else {
                times = (zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level) > 5 ? 5 : (zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level);
            }
            this.bitmapStrengthenFiveTime.text = "" + times;
            this.labelStrengthenFiveNum.textFlow = zj.Util.RichText("" + (this.getCostMoney(this.cardInfo.star, this.cardInfo.level, times)));
            this.groupYinCang.visible = true;
            this.groupUpLevel.visible = (this.cardInfo.level < zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level ? true : false);
            this.groupUpStar.visible = (this.cardInfo.level >= zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] && this.cardInfo.level < zj.CommonConfig.card_star_max_level[5] ? true : false);
            this.groupBreak.visible = (this.cardInfo.level == zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level ? true : false);
            this.labelYinCang.text = zj.LANG("已强化至当前品质最大等级");
            this.labelYinCang1.text = zj.LANG("升星可增加等级上限");
            this.labelYinCang2.text = zj.LANG("已强化至当前品质最大等级");
            this.labelYinCang3.text = zj.LANG("突破可增加等级上限");
        };
        // 强化卡片所需金币
        CardStrengthen.prototype.getCostMoney = function (star, level, upLevel) {
            var sum = 0;
            for (var i = 0; i < upLevel; i++) {
                sum = sum + zj.CommonConfig.potato_uplevel_comsume_money(star, level + i);
            }
            return sum;
        };
        // 强化一次
        CardStrengthen.prototype.onBtnStrengthenUp = function () {
            var _this = this;
            zj.Game.PlayerCardSystem.potatoUplevel(this.cardInfo.index, 1, this.cardInfo.pos).then(function (value) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.uplevel_success);
                if (_this.callback) {
                    _this.callback(true, false);
                }
                _this.refresh();
            }).catch(function (reason) { });
        };
        // 强化五次
        CardStrengthen.prototype.onBtnStrengthenFive = function () {
            var _this = this;
            var times = null;
            if (this.cardInfo.break_level != 0 && (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) <= 5) {
                times = zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level;
            }
            else if (this.cardInfo.break_level != 0 && (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) > 5) {
                times = 5;
            }
            else {
                times = (zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level > 5 ? 5 : zj.CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level);
            }
            zj.Game.PlayerCardSystem.potatoUplevel(this.cardInfo.index, times, this.cardInfo.pos).then(function () {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.uplevel_success);
                if (_this.callback) {
                    _this.callback(true, false);
                }
                _this.refresh();
            });
        };
        // 前往升星
        CardStrengthen.prototype.onBtnGoUpStar = function () {
            var _this = this;
            if (this.cardInfo != null) {
                if (this.cardInfo.star < zj.CommonConfig.card_max_star) {
                    zj.loadUI(zj.CardUpStarNewDialog).then(function (dialog) {
                        dialog.setInfo(_this.cardInfo, function () {
                            if (_this.callback)
                                _this.callback(true, false);
                            _this.refresh();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_level_max);
                }
            }
        };
        // 前往突破
        CardStrengthen.prototype.onBtnGoBreak = function () {
            if (this.cardInfo.break_level < zj.CommonConfig.card_break_through_max_level && this.cardInfo.level >= zj.CommonConfig.card_star_max_level[5]) {
                if (this.callback) {
                    this.callback(true, true);
                }
            }
            else if (this.cardInfo.break_level == zj.CommonConfig.card_break_through_max_level) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.card_break_level_max);
            }
        };
        return CardStrengthen;
    }(zj.UI));
    zj.CardStrengthen = CardStrengthen;
    __reflect(CardStrengthen.prototype, "zj.CardStrengthen");
})(zj || (zj = {}));
//# sourceMappingURL=CardStrengthen.js.map