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
    // created by hhh in 2018/11/15
    /************** 卡包部分 卡片获取界面 ****************/
    var CardBagPopDialog = (function (_super) {
        __extends(CardBagPopDialog, _super);
        function CardBagPopDialog() {
            var _this = _super.call(this) || this;
            _this.groupCardArr = [];
            _this.groupCardAniArr = [];
            _this.groupCardContentArr = [];
            _this.groupCardAniFrontArr = [];
            _this.groupCardAniBackArr = [];
            _this.groupStarArr = [];
            _this.labelCardIdArr = [];
            _this.labelCardNameArr = [];
            _this.labelLevelArr = [];
            _this.labelCardInfoArr = [];
            _this.imageIconArr = [];
            _this.imageCardTypeArr = [];
            _this.imageFrameArr = [];
            _this.imageGradeLevelArr = [];
            _this.imageBackArr = [];
            _this.skinName = "resource/skins/card/CardBagPopDialogSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        CardBagPopDialog.prototype.init = function () {
            this.labelConstRarity1.text = zj.LANG("稀有度：");
            this.labelConstRarity2.text = zj.LANG("稀有度：");
            this.labelConstRarity3.text = zj.LANG("稀有度：");
            this.btnGetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCard, this);
            // this.groupCard1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard1, this);
            // this.groupCard2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard2, this);
            // this.groupCard3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard3, this);
            egret.Tween.get(this.btnGetCard).to({ alpha: 0 });
            this.btnGetCard.enabled = false;
            this.groupCardArr = [
                this.groupCard1,
                this.groupCard2,
                this.groupCard3
            ];
            this.groupCardAniArr = [
                this.groupCardAni1,
                this.groupCardAni2,
                this.groupCardAni3
            ];
            this.groupCardContentArr = [
                this.groupCardContent1,
                this.groupCardContent2,
                this.groupCardContent3
            ];
            this.groupCardAniFrontArr = [
                this.groupCardAniFront1,
                this.groupCardAniFront2,
                this.groupCardAniFront3
            ];
            this.groupCardAniBackArr = [
                this.groupAniBack1,
                this.groupAniBack2,
                this.groupAniBack3
            ];
            this.groupStarArr = [
                this.groupStar1,
                this.groupStar2,
                this.groupStar3,
            ];
            this.labelCardIdArr = [
                this.labelCardId1,
                this.labelCardId2,
                this.labelCardId3
            ];
            this.labelCardNameArr = [
                this.labelCardName1,
                this.labelCardName2,
                this.labelCardName3
            ];
            this.labelLevelArr = [
                this.labelLevel1,
                this.labelLevel2,
                this.labelLevel3
            ];
            this.labelCardInfoArr = [
                this.labelCardInfo1,
                this.labelCardInfo2,
                this.labelCardInfo3
            ];
            this.imageIconArr = [
                this.imageIcon1,
                this.imageIcon2,
                this.imageIcon3
            ];
            this.imageCardTypeArr = [
                this.imageCardType1,
                this.imageCardType2,
                this.imageCardType3
            ];
            this.imageFrameArr = [
                this.imageFrame1,
                this.imageFrame2,
                this.imageFrame3
            ];
            this.imageGradeLevelArr = [
                this.imageGradeLevel1,
                this.imageGradeLevel2,
                this.imageGradeLevel3
            ];
            this.imageBackArr = [
                this.imageBack1,
                this.imageBack2,
                this.imageBack3
            ];
            this.groupCard1.touchEnabled = false;
            this.groupCard2.touchEnabled = false;
            this.groupCard3.touchEnabled = false;
            this.groupGetCard.alpha = 0;
            this.groupGetCard.scaleX = 0;
            this.groupGetCard.scaleY = 0;
            this.groupCardCenterX = this.groupCard2.x;
            for (var i = 0; i < 3; i++) {
                this.groupCardArr[i].x = this.groupCardCenterX;
                // this.groupCardAniArr[i].alpha = 0;
                this.groupCardContentArr[i].alpha = 0;
                this.groupCardContentArr[i].visible = false;
                // this.groupCardAniFrontArr[i].visible = false;
            }
        };
        CardBagPopDialog.prototype.setCardInfo = function (info) {
            this.cardInfo = info;
            for (var i = 0; i < 3; i++) {
                var curCard = info[i];
                var curTbl = zj.TableItemPotato.Item(curCard.id);
                var _a = zj.PlayerCardSystem.GetItemFrame(curCard.id), _ = _a[0], bigFramePic = _a[1], __ = _a[2];
                this.labelCardIdArr[i].text = curTbl.num;
                this.labelCardNameArr[i].text = curTbl.name;
                this.labelLevelArr[i].text = curCard.level + "";
                this.labelCardInfoArr[i].text = curTbl.des;
                var iconArrPath = curTbl.paths;
                var cardTypeArrPath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1];
                var frameArrPath = bigFramePic;
                var gradeLevelArrPath = zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[curTbl.rarity - 1];
                this.imageIconArr[i].source = zj.cachekey(iconArrPath, this);
                this.imageCardTypeArr[i].source = zj.cachekey(cardTypeArrPath, this);
                this.imageFrameArr[i].source = zj.cachekey(frameArrPath, this);
                this.imageGradeLevelArr[i].source = zj.cachekey(gradeLevelArrPath, this);
                if (curCard.add_attri.length + 1 == 5 && curCard.star < 6 || curCard.add_attri.length + 1 == 5 && curCard.star >= 6) {
                    zj.Helper.SetStar(this.groupStarArr[i], curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
                }
                else {
                    zj.Helper.SetStar(this.groupStarArr[i], curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
                }
            }
        };
        CardBagPopDialog.prototype.playAni = function (cardInfo, father) {
            var _this = this;
            var aniNameArr = [
                "kapai_baise",
                "kapai_zise",
                "kapai_chengse",
                "kapai_hongse"
            ];
            this.father = father;
            this.setCardInfo(cardInfo);
            var cardMoveBy = function (index, node, posX) {
                var curCard = cardInfo[index];
                var curTbl = zj.TableItemPotato.Item(curCard.id);
                var aniName = "kapai_baise";
                if (curTbl.quality >= 3) {
                    // 3蓝 4紫 5橙 6红
                    aniName = aniNameArr[curTbl.quality - 3];
                }
                egret.Tween.get(_this.groupCardAniBackArr[index])
                    .to({ x: node.x + posX }, 350, egret.Ease.sineInOut);
                egret.Tween.get(node)
                    .to({ x: node.x + posX }, 350, egret.Ease.sineInOut)
                    .wait(850 * (index + 1))
                    .call(function () {
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "000_chuxian", 1)
                        .then(function (display) {
                        display.scaleX = 1.2;
                        display.scaleY = 1.24;
                        display.x = _this.groupCardArr[index].width / 2;
                        display.y = _this.groupCardArr[index].height / 2 - 30;
                        _this.groupCardArr[index].addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "001_xunhuan_qian", 0)
                        .then(function (display) {
                        display.x = _this.groupCardAniFrontArr[index].width / 2;
                        display.y = _this.groupCardAniFrontArr[index].height / 2;
                        _this.groupCardAniFrontArr[index].addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    if (curTbl.quality >= 4) {
                        if (curTbl.quality >= 5) {
                            egret.Tween.get(node)
                                .to({ x: node.x - 2, y: node.y - 3 }, 30)
                                .to({ x: node.x + 3, y: node.y + 2 }, 50)
                                .to({ x: node.x + 3, y: node.y - 2 }, 30)
                                .to({ x: node.x - 4, y: node.y + 3 }, 50)
                                .to({ x: node.x + 2, y: node.y + 1 }, 40)
                                .to({ x: node.x - 3, y: node.y - 2 }, 50)
                                .to({ x: node.x + 2, y: node.y - 1 }, 30)
                                .to({ x: node.x - 1, y: node.y + 2 }, 50)
                                .to({ x: node.x + 2, y: node.y - 1 }, 30)
                                .to({ x: node.x - 2, y: node.y + 1 }, 20)
                                .to({ x: node.x - 1, y: node.y + 2 }, 30)
                                .to({ x: node.x + 1, y: node.y - 2 }, 20);
                        }
                    }
                })
                    .wait(800)
                    .wait((22 / 60 + index * 3 / 60) * 100)
                    .call(function () {
                    _this.groupCardContentArr[index].visible = true;
                    _this.groupCardContentArr[index].alpha = 1;
                    _this.imageBackArr[index].visible = false;
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "002_xunhuan_hou", 0)
                        .then(function (display) {
                        display.scaleX = 1.2;
                        display.scaleY = 1.2;
                        display.x = _this.groupCardAniBackArr[index].width / 2;
                        display.y = _this.groupCardAniBackArr[index].height / 2;
                        _this.groupCardAniBackArr[index].addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                });
                zj.Game.PlayerInfoSystem.playAnnouce = true;
            };
            egret.Tween.get(this.groupGetCard)
                .to({ alpha: 1 }, 450)
                .to({ scaleX: 1, scaleY: 1, }, 450, egret.Ease.backOut)
                .call(function () {
                for (var i = 0; i < 3; i++) {
                    cardMoveBy(i, _this.groupCardArr[i], (i + 1) * 300 - 2 * 305);
                }
            })
                .wait(3500)
                .call(function () {
                egret.Tween.get(_this.btnGetCard).to({ alpha: 1 }, 300).call(function () {
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
                _this.btnGetCard.enabled = true;
                _this.groupCard1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchGroupCard1, _this);
                _this.groupCard2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchGroupCard2, _this);
                _this.groupCard3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchGroupCard3, _this);
            });
        };
        CardBagPopDialog.prototype.onTouchGroupCard1 = function () {
            zj.TipManager.ShowCard(this.cardInfo[0]);
        };
        CardBagPopDialog.prototype.onTouchGroupCard2 = function () {
            zj.TipManager.ShowCard(this.cardInfo[1]);
        };
        CardBagPopDialog.prototype.onTouchGroupCard3 = function () {
            zj.TipManager.ShowCard(this.cardInfo[2]);
        };
        CardBagPopDialog.prototype.onBtnGetCard = function () {
            this.father.setUI();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return CardBagPopDialog;
    }(zj.Dialog));
    zj.CardBagPopDialog = CardBagPopDialog;
    __reflect(CardBagPopDialog.prototype, "zj.CardBagPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardBagPopDialog.js.map