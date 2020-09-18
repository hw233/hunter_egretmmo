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
     * 卡片升星信息界面
     * created by Lian Lei
     * 2018.12.11
     */
    var CardUpStar = (function (_super) {
        __extends(CardUpStar, _super);
        function CardUpStar() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardUpStarSkin.exml";
            _this.init();
            return _this;
        }
        CardUpStar.prototype.init = function () {
            this.imgUpStarAtt.visible = false;
            this.imgMax.visible = false;
            this.imgUpStarAtt.visible = false;
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
        };
        CardUpStar.prototype.setInfo = function (info) {
            this.info = info;
            zj.Helper.SetStar(this.groupStar0, zj.CommonConfig.card_max_star, zj.UIConfig.UIConfig_General.hunter_juexing_dark_star, 1.1, 25);
            if (this.info.star < zj.CommonConfig.card_max_star) {
                this.setUi();
                this.groupYincang.visible = true;
                this.imgMax.visible = false;
            }
            else {
                this.groupYincang.visible = false;
                this.imgMax.visible = true;
                if (this.info.add_attri.length + 1 == 5 && this.info.star < 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[0], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
                }
                else if (this.info.add_attri.length == 5 && this.info.star >= 6) {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[0], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
                }
                else {
                    zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[1], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
                }
            }
        };
        CardUpStar.prototype.setUi = function () {
            zj.Helper.SetStar(this.groupStar0, zj.CommonConfig.card_max_star, zj.UIConfig.UIConfig_General.hunter_juexing_dark_star, 1.1, 25);
            this.labelCurrentLevelStar.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_star, this.info.star);
            this.labelNextLevelStar.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_star, this.info.star + 1);
            this.labelCurrentLevelAtt.text = zj.PlayerCardSystem.GetCardBaseAttri(this.info.id, this.info.star, this.info.level)[0][0].toString();
            this.labelNextAtt.text = zj.PlayerCardSystem.GetCardBaseAttri(this.info.id, this.info.star + 1, this.info.level)[0][0].toString();
            this.labelCurrentLevelAtt2.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level, zj.CommonConfig.card_star_max_level[this.info.star - 1]);
            this.labelNextAtt2.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_level, zj.CommonConfig.card_star_max_level[this.info.star]);
            var nextStar = this.info.star + 1;
            this.labelActivationAtt.text = zj.TextsConfig.TextsConfig_Common.nothing;
            this.imageSpriteAttType.visible = false;
            if (this.info.star == 5) {
                this.labelActivationAtt.text = zj.TextsConfig.TextsConfig_Hunter.conditionCan;
                this.imageSpriteAttType.visible = true;
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.info.add_attri); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (zj.CommonConfig.card_addattri_awake_star[kk] == nextStar) {
                    var addStr = zj.PlayerCardSystem.GetAddStr(this.info);
                    this.labelActivationAtt.text = addStr[kk][0];
                    this.imageSpriteAttType.visible = true;
                    break;
                }
            }
            this.groupYincang.visible = (this.info.level < zj.CommonConfig.card_star_max_level[this.info.star]);
            this.groupNodeUpStar.visible = (this.info.level >= zj.CommonConfig.card_star_max_level[this.info.star]);
            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[0], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
            }
            else if (this.info.add_attri.length == 5 && this.info.star >= 6) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[0], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
            }
            else {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, this.info.star + 1, zj.CommonConfig.card_max_star, 1, true, zj.UIConfig.UIConfig_General.hunter_juexing_star[1], zj.UIConfig.UIConfig_General.hunter_juexing_dark_star);
            }
            if (this.info.star == zj.CommonConfig.card_max_star) {
                this.imgMax.visible = true;
            }
            else {
                this.imgMax.visible = false;
            }
        };
        CardUpStar.prototype.onBtnHelp = function () {
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.loadBySmallType(202);
            });
        };
        return CardUpStar;
    }(zj.UI));
    zj.CardUpStar = CardUpStar;
    __reflect(CardUpStar.prototype, "zj.CardUpStar");
})(zj || (zj = {}));
//# sourceMappingURL=CardUpStar.js.map