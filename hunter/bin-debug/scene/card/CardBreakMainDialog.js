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
    // created by hhh in 2018/12/10
    /************** 卡片部分 突破界面 ****************/
    var CardBreakMainDialog = (function (_super) {
        __extends(CardBreakMainDialog, _super);
        function CardBreakMainDialog() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.curCard = null;
            _this.curTbl = null;
            _this.skinName = "resource/skins/card/CardBreakMainDialogSkin.exml";
            _this.init();
            return _this;
        }
        CardBreakMainDialog.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBreak, this);
            this.groupItemCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemCard, this);
            this.groupMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMeterials, this);
            this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchImageIconMeterialsBegin, this);
            this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchImageIconMeterialsEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchImageIconMeterialsEnd, this);
            zj.Game.PlayerCardSystem.initBreakPotatoSel();
        };
        CardBreakMainDialog.prototype.loadInfo = function (info, cb, cb2) {
            this.info = info;
            this.callBack = cb;
            this.cb = cb2;
            this.setCardUI();
            this.setCardBreak();
        };
        // 设置左侧ui
        CardBreakMainDialog.prototype.setCardUI = function () {
            this.curCard = this.info;
            this.curTbl = zj.TableItemPotato.Item(this.curCard.id);
            var _a = zj.PlayerCardSystem.GetItemFrame(this.curCard.id), _ = _a[0], bigFramePic = _a[1], __ = _a[2];
            this.labelCardNum.text = this.curTbl.num;
            this.labelCardName.text = this.curTbl.name;
            this.labelCardDetails.text = this.curTbl.des;
            this.labelLevel.text = this.curCard.level + "";
            var str = zj.Game.PlayerInfoSystem.Coin.toString();
            this.labelGoldNum.text = zj.LANG("拥有数量：") + str;
            var imageCardPath = this.curTbl.paths;
            var imageCardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1];
            var imageFramePath = bigFramePic;
            this.imageCard.source = zj.cachekey(imageCardPath, this);
            this.imageCardType.source = zj.cachekey(imageCardTypePath, this);
            this.imageFrame.source = zj.cachekey(imageFramePath, this);
            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 18);
            else
                zj.Helper.SetStar(this.groupStar, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 18);
        };
        // 设置右侧ui
        CardBreakMainDialog.prototype.setCardBreak = function () {
            this.labelLevelMax.visible = false;
            var framePic = zj.PlayerCardSystem.GetItemFrame(this.info.id)[0];
            var tbl = zj.TableItemPotato.Item(this.info.id);
            if (this.info.break_level == zj.CommonConfig.card_break_through_max_level) {
                this.groupMax.visible = true;
                this.groupUse.visible = false;
                var imageFrameMaxPath = framePic;
                var imageCardTypeMaxPath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
                var imageIconMaxPath = tbl.path;
                this.imageFrameMax.source = zj.cachekey(imageFrameMaxPath, this);
                this.imageCardTypeMax.source = zj.cachekey(imageCardTypeMaxPath, this);
                this.imageIconMax.source = zj.cachekey(imageIconMaxPath, this);
                if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                    zj.Helper.SetStar(this.groupStarMax, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
                else
                    zj.Helper.SetStar(this.groupStarMax, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);
                this.labelMaxLevel.text = zj.LANG("等级上限：") + (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.info.break_level);
            }
            else {
                this.groupMax.visible = false;
                this.groupUse.visible = true;
                var imageIconBeforePath = tbl.path;
                var imageFrameBeforePath = framePic;
                var imageCardTypeBeforePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
                this.imageIconBefore.source = zj.cachekey(imageIconBeforePath, this);
                this.imageFrameBefore.source = zj.cachekey(imageFrameBeforePath, this);
                this.imageCardTypeBefore.source = zj.cachekey(imageCardTypeBeforePath, this);
                this.labelLevelBefore.text = this.info.level + "";
                var imageIconAfterPath = tbl.path;
                var imageFrameAfterPath = framePic;
                var imageCardTypeAfterPath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
                this.imageIconAfter.source = zj.cachekey(imageIconAfterPath, this);
                this.imageFrameAfter.source = zj.cachekey(imageFrameAfterPath, this);
                this.imageCardTypeAfter.source = zj.cachekey(imageCardTypeAfterPath, this);
                this.labelLevelAfter.text = this.info.level + "";
                this.labelCurrentLevel.text = zj.LANG("等级上限：") + (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.info.break_level);
                this.labelNextLevel.text = zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * (this.info.break_level + 1) + "";
                var potatoBreakItem = zj.TablePotatoBreak.Item(this.info.break_level + 1);
                this.labelBreakNum.text = potatoBreakItem.consume + "";
                if (potatoBreakItem.exchange_count == 0) {
                    this.groupCard.visible = false;
                    this.groupItem.x = 126;
                }
                else {
                    this.groupCard.visible = true;
                    this.groupItem.x = 66;
                }
                var id = potatoBreakItem.exchange_prop[0];
                var count1 = zj.PlayerItemSystem.Count(id);
                var count11 = potatoBreakItem.exchange_prop[1];
                if (count1 > count11) {
                    this.imageAddMeterials.visible = false;
                    this.groupMeterials.touchEnabled = false;
                }
                else {
                    this.imageAddMeterials.visible = true;
                    this.groupMeterials.touchEnabled = true;
                }
                this.desPropId = id;
                this.desPropCount = count11;
                this.labelNumMeterials.text = count1 + "/" + count11;
                var itemInfo = zj.PlayerItemSystem.ItemConfig(id);
                var imageIconMeterialsPath = zj.PlayerItemSystem.ItemPath(id);
                var imageFrameMeterialsPath = zj.UIConfig.UIConfig_Role.itemFrame[itemInfo.quality];
                var imageCardBreakTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
                this.imageIconMeterials.source = zj.cachekey(imageIconMeterialsPath, this);
                this.imageFrameMeterials.source = zj.cachekey(imageFrameMeterialsPath, this);
                this.imageCardBreakType.source = zj.cachekey(imageCardBreakTypePath, this);
                var num = potatoBreakItem.exchange_count;
                var count2 = zj.Game.PlayerCardSystem.getBreakPotatoSel().length;
                var count22 = num;
                this.labelNumCard.text = count2 + "/" + count22;
                this.imageShadow.visible = count2 < num;
                this.imageIconCard.source = zj.cachekey(tbl.path, this);
                this.imageFrameCard.source = zj.cachekey(framePic, this);
                if (potatoBreakItem.exchange_level == 0) {
                    this.labelLevelItemCard.visible = false;
                }
                else {
                    this.labelLevelItemCard.visible = true;
                    this.labelLevelItemCard.text = potatoBreakItem.exchange_level + "";
                }
                if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                    zj.Helper.SetStar(this.groupStarBefore, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
                else
                    zj.Helper.SetStar(this.groupStarBefore, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);
                if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
                    zj.Helper.SetStar(this.groupStarAfter, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 12);
                else
                    zj.Helper.SetStar(this.groupStarAfter, this.info.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 12);
            }
        };
        CardBreakMainDialog.prototype.onBtnBreak = function () {
            var _this = this;
            var list = [];
            var tbl = zj.PlayerCardSystem.GetAllCardByName(this.info, this.info.id, this.info.index, zj.TablePotatoBreak.Item(this.info.break_level + 1).exchange_level);
            var index = this.info.index;
            var generalId = 0;
            var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(this.info.index).cHostId;
            if (cHostId != null && this.info.pos != 0) {
                generalId = cHostId;
                index = 0;
            }
            for (var kk in zj.Game.PlayerCardSystem.getBreakPotatoSel()) {
                var vv = zj.Game.PlayerCardSystem.getBreakPotatoSel()[kk];
                for (var k in tbl) {
                    if (Number(k) == vv)
                        list.push(tbl[k].index);
                }
            }
            zj.Game.PlayerCardSystem.potatoBreak(index, generalId, this.info.pos, list)
                .then(function (value) {
                _this.info = zj.PlayerCardSystem.RefreshCard(_this.info);
                _this.setCardBreak();
                _this.setCardUI();
                if (_this.callBack) {
                    _this.callBack(); // 调用回调函数刷新列表
                }
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.break_success);
            })
                .catch(function (reason) {
            });
        };
        CardBreakMainDialog.prototype.onTouchItemCard = function () {
            var _this = this;
            zj.loadUI(zj.CardBreakSelectDialog)
                .then(function (dialog) {
                dialog.setInfo(_this.info.id, _this.info.index, _this.info.break_level + 1, _this.info, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        CardBreakMainDialog.prototype.onTouchMeterials = function () {
            var _this = this;
            var goodId = zj.TablePotatoBreak.Item(this.info.break_level + 1).exchange_prop[0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(goodId, _this, function () {
                    _this.onBtnClose();
                    if (_this.cb) {
                        _this.cb();
                    }
                });
            });
        };
        CardBreakMainDialog.prototype.onTouchImageIconMeterialsBegin = function () {
            var _this = this;
            zj.loadUI(zj.Common_DesProp)
                .then(function (desProp) {
                desProp.verticalCenter = true;
                desProp.setInfo(_this.desPropId, _this.desPropCount);
                _this.groupMetarialDes.addChild(desProp);
            });
        };
        CardBreakMainDialog.prototype.onTouchImageIconMeterialsEnd = function () {
            this.groupMetarialDes.removeChildren();
        };
        CardBreakMainDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return CardBreakMainDialog;
    }(zj.Dialog));
    zj.CardBreakMainDialog = CardBreakMainDialog;
    __reflect(CardBreakMainDialog.prototype, "zj.CardBreakMainDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardBreakMainDialog.js.map