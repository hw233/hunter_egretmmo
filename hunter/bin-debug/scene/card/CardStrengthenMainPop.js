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
    var CardStrengthenMainPop = (function (_super) {
        __extends(CardStrengthenMainPop, _super);
        function CardStrengthenMainPop() {
            var _this = _super.call(this) || this;
            _this.callBack = null;
            _this.thisObj = null;
            _this.skinName = "resource/skins/card/CardStrengthenMainPopSkin.exml";
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            _this.groupABRight.width = zj.UIManager.StageWidth;
            _this.groupABRight.height = zj.UIManager.StageHeight;
            _this.groupBack.width = zj.UIManager.StageWidth;
            _this.groupBack.height = zj.UIManager.StageHeight;
            _this.groupTmp.width = zj.UIManager.StageWidth;
            _this.groupTmp.height = zj.UIManager.StageHeight;
            return _this;
        }
        CardStrengthenMainPop.prototype.SetInfo = function (attriId, cur_card, info, growthValue, rangeResult, value, perShow, cb, thisObj) {
            this.callBack = cb;
            this.thisObj = thisObj;
            this.rangeResult = rangeResult;
            this.growthValue = growthValue;
            var bigFramePic = zj.PlayerCardSystem.GetItemFrame(cur_card.id)[1];
            this.labelTips.visible = false;
            this.labelTips1.visible = false;
            this.labelAttri1.visible = false;
            this.labelAttri2.visible = false;
            // 卡片信息
            this.imgFrame.source = zj.cachekey(bigFramePic, this);
            this.labelCardNum.text = info.num;
            this.labelCardName.text = info.name;
            this.imgCard.source = zj.cachekey(info.paths, this);
            this.imgCardType.source = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[info.type - 1];
            this.labelCardDetails.text = info.des;
            this.labelLevel.text = "LV" + cur_card.level;
            var addStr = zj.PlayerCardSystem.GetAddStr(cur_card);
            if (addStr.length == 5) {
                zj.Helper.SetStar(this.groupStar, cur_card.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 16);
            }
            else {
                zj.Helper.SetStar(this.groupStar, cur_card.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 16);
            }
            // 属性变化
            this.labelDes.text = zj.Game.PlayerCardSystem.attriInstance(attriId).des;
            if (rangeResult > zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                if (perShow == 1) {
                    if (growthValue == 0) {
                        this.labelAttri1.textFlow = zj.Util.RichText(value.toString());
                    }
                    else {
                        if (growthValue > zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, growthValue));
                        }
                        else {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, growthValue));
                        }
                    }
                    this.labelAttri2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, rangeResult));
                    var str = Math.abs(rangeResult - growthValue);
                    var str1 = str.toString();
                    var pos = str1.indexOf(".") + 3; // 获取小数点的位置
                    var count = str1.length - pos; // 获取小数点后的个数
                    var text = null;
                    if (count > 0 && pos != 0) {
                        text = Number(str.toFixed(1));
                    }
                    else {
                        text = Math.abs(rangeResult - growthValue);
                    }
                    if (rangeResult > growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
                    }
                    else if (rangeResult < growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
                    }
                }
                else {
                    if (growthValue == 0) {
                        this.labelAttri1.textFlow = zj.Util.RichText(value + "%");
                    }
                    else {
                        if (growthValue > zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, growthValue));
                        }
                        else {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, growthValue));
                        }
                    }
                    this.labelAttri2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, rangeResult));
                    var str = Math.abs(rangeResult - growthValue);
                    var str1 = str.toString();
                    var pos = str1.indexOf(".") + 3; // 获取小数点的位置
                    var count = str1.length - pos; // 获取小数点后的个数
                    var text = null;
                    if (count > 0 && pos != 0) {
                        text = Number(str.toFixed(1)) + "%";
                    }
                    else {
                        text = Math.abs(rangeResult - growthValue) + "%";
                    }
                    if (rangeResult > growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
                    }
                    else if (rangeResult < growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
                    }
                }
            }
            else {
                if (perShow == 1) {
                    if (growthValue == 0) {
                        this.labelAttri1.textFlow = zj.Util.RichText(value.toString());
                    }
                    else {
                        if (growthValue > zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, growthValue));
                        }
                        else {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, growthValue));
                        }
                    }
                    this.labelAttri2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, rangeResult));
                    var str = Math.abs(rangeResult - growthValue);
                    var str1 = str.toString();
                    var pos = str1.indexOf(".") + 3; // 获取小数点的位置
                    var count = str1.length - pos; // 获取小数点后的个数
                    var text = null;
                    if (count > 0 && pos != 0) {
                        text = Number(str.toFixed(1));
                    }
                    else {
                        text = Math.abs(rangeResult - growthValue);
                    }
                    if (rangeResult > growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
                    }
                    else if (rangeResult < growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
                    }
                }
                else {
                    if (growthValue == 0) {
                        this.labelAttri1.textFlow = zj.Util.RichText(value.toString() + "%");
                    }
                    else {
                        if (growthValue > zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, growthValue));
                        }
                        else {
                            this.labelAttri1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, growthValue));
                        }
                    }
                    this.labelAttri2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, rangeResult));
                    var str = Math.abs(rangeResult - growthValue);
                    var str1 = str.toString();
                    var pos = str1.indexOf(".") + 3; // 获取小数点的位置
                    var count = str1.length - pos; // 获取小数点后的个数
                    var text = null;
                    if (count > 0 && pos != 0) {
                        text = Number(str.toFixed(1)) + "%";
                    }
                    else {
                        text = Math.abs(rangeResult - growthValue) + "%";
                    }
                    if (rangeResult > growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
                    }
                    else if (rangeResult < growthValue) {
                        this.labelAttri3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
                    }
                }
            }
            this.SetAniInfo();
            this.SetAttriInfo();
        };
        CardStrengthenMainPop.prototype.SetAniInfo = function () {
            var _this = this;
            var dbName = "xilian_eff";
            var animationName = "001_kapai";
            var displays = [this.groupCard];
            var solts = ["000_kabei"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then(function (armatureDisplay) {
                // armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                // }, this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play(animationName, 1);
                armatureDisplay.x = _this.groupBack.explicitWidth / 2.2;
                armatureDisplay.y = _this.groupBack.explicitHeight / 2;
                armatureDisplay.scaleX = 2;
                armatureDisplay.scaleY = 2;
                _this.groupBack.addChild(armatureDisplay);
            }).catch(function (reason) {
                zj.toast_warning(reason);
            });
        };
        CardStrengthenMainPop.prototype.SetAttriInfo = function () {
            var _this = this;
            // ui_card_enchant_WordsResult_png
            var name = new eui.Image(zj.cachekey("ui_card_enchant_WordsResult_png", this));
            name.width = 225;
            name.height = 59;
            name.anchorOffsetX = name.width / 2;
            name.anchorOffsetY = name.height / 2;
            var dbName = "xilian_eff";
            var animationName = null;
            var displays = [this.labelDes, this.labelAttri1, this.labelAttri2, this.labelAttri3, name];
            var solts = ["001_xinxi1", "001_xilianqian", "001_xilianhou", "001_bianhua", "001_biaoti"];
            this.labelDes.anchorOffsetX = this.labelDes.width / 2;
            this.labelDes.anchorOffsetY = this.labelDes.height / 2;
            for (var i = 1; i <= 3; i++) {
                this["labelAttri" + i].anchorOffsetX = this["labelAttri" + i].width / 2;
                this["labelAttri" + i].anchorOffsetY = this["labelAttri" + i].height / 2;
            }
            if (this.rangeResult > this.growthValue) {
                animationName = "002_wenzi-1";
            }
            else if (this.rangeResult == this.growthValue) {
                animationName = "003_wenzi-2";
            }
            else {
                animationName = "004_wenzi-3";
            }
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then(function (armatureDisplay) {
                armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
                    _this.labelTips1.visible = true;
                    egret.Tween.get(_this.labelTips1, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
                    if (_this.rangeResult < _this.growthValue) {
                        _this.labelTips.visible = true;
                        _this.labelTips.text = zj.TextsConfig.TextsConfig_Hunter_Card.card_down;
                        _this.labelTips.anchorOffsetX = _this.labelTips.width / 2;
                        _this.labelTips.anchorOffsetY = _this.labelTips.height / 2;
                        _this.labelTips.x = zj.UIManager.StageWidth / 1.8 + armatureDisplay.width / 2;
                    }
                }, _this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play(animationName, 1);
                armatureDisplay.x = zj.UIManager.StageWidth / 1.8 + armatureDisplay.width / 2;
                armatureDisplay.y = _this.height / 2;
                armatureDisplay.scaleX = 2;
                armatureDisplay.scaleY = 2;
                _this.groupTmp.addChild(armatureDisplay);
            }).catch(function (reason) {
                zj.toast_warning(reason);
            });
        };
        CardStrengthenMainPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callBack != null) {
                this.callBack.call(this.thisObj);
            }
            this.callBack = null;
            this.thisObj = null;
        };
        return CardStrengthenMainPop;
    }(zj.Dialog));
    zj.CardStrengthenMainPop = CardStrengthenMainPop;
    __reflect(CardStrengthenMainPop.prototype, "zj.CardStrengthenMainPop");
})(zj || (zj = {}));
//# sourceMappingURL=CardStrengthenMainPop.js.map