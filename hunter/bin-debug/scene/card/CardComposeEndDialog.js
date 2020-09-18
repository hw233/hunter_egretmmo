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
    /************** 合成部分子界面 ****************/
    var CardComposeEndDialog = (function (_super) {
        __extends(CardComposeEndDialog, _super);
        function CardComposeEndDialog() {
            var _this = _super.call(this) || this;
            _this.listAttriData = new eui.ArrayCollection();
            _this.addStr = [];
            _this.aniNameArr = [
                "kapai_baise",
                "kapai_zise",
                "kapai_chengse",
                "kapai_hongse"
            ];
            _this.skinName = "resource/skins/card/CardComposeEndDialogSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        CardComposeEndDialog.prototype.init = function () {
            this.labelMainAttriConst.text = zj.LANG("主属性：");
            this.labelDeputyAttriConst.text = zj.LANG("副属性：");
            this.labelRealConst.text = zj.LANG("稀有度：");
            this.groupCardContent.alpha = 0;
            this.groupCardContent.visible = false;
            this.groupCardInfo.visible = false;
            this.labelMainAttribute.visible = false;
            this.imageBackBoard.visible = false;
            this.bAniEnd = false;
            this.posInfoX = zj.UIManager.StageWidth / 2 - this.groupCardInfo.width / 2;
            this.posConX = zj.UIManager.StageWidth / 2 - this.groupCardContent.width / 2;
            this.posMainX = this.labelMainAttribute.x;
            this.posMainY = this.labelMainAttribute.y;
            this.posBackX = this.imageCardBack.x;
            this.posBackY = this.imageCardBack.y;
            this.posBoardX = this.imageBackBoard.x;
            this.posBoardY = this.imageBackBoard.y;
            this.labelEnd.text = zj.TextsConfig.TextsConfig_Activity.skipAni;
        };
        CardComposeEndDialog.prototype.setCardInfo = function (info) {
            var curCard = info;
            var curTbl = zj.TableItemPotato.Item(curCard.id);
            var bigFramePic = zj.PlayerCardSystem.GetItemFrame(curCard.id)[1];
            this.labelCardNum.text = curTbl.num;
            this.labelCardName.text = curTbl.name;
            this.labelLevel.text = curCard.level + "";
            this.labelCardDetails.text = curTbl.des;
            this.imageIcon.source = zj.cachekey(curTbl.paths, this);
            this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1], this);
            this.imageCardFrame.source = zj.cachekey(bigFramePic, this);
            if (curCard.add_attri.length + 1 == 5 && curCard.star < 6 || curCard.add_attri.length == 5 && curCard.star >= 6)
                zj.Helper.SetStar(this.groupStar, curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 14);
            else
                zj.Helper.SetStar(this.groupStar, curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 14);
        };
        CardComposeEndDialog.prototype.setCardAttri = function (info) {
            var curCard = info;
            this.curTbl = zj.TableItemPotato.Item(curCard.id);
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, curCard.star, curCard.level)[0];
            this.labelMainAttribute.text = baseStr[0];
            this.addStr = zj.PlayerCardSystem.GetAddStr(curCard);
            this.listAttriData.removeAll();
            for (var i = 0; i < this.addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = this.addStr[i];
                itemData.cardInfo = this.info;
                itemData.width = this.scroAttribute.width;
                itemData.addStrlength = this.addStr.length;
                itemData.type = 0;
                itemData.isHideBG = true;
                this.listAttriData.addItem(itemData);
            }
            this.listAttribute.dataProvider = this.listAttriData;
            this.listAttribute.itemRenderer = zj.CardAttriItem;
        };
        CardComposeEndDialog.prototype.playAni = function (cardInfo, father) {
            var _this = this;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);
            this.info = cardInfo;
            this.father = father;
            this.setCardInfo(cardInfo);
            this.setCardAttri(cardInfo);
            zj.Game.DragonBonesManager.playAnimation(this, "cardopen", "armatureName", null, 1)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupSpineAni.height;
                _this.groupSpineAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "cardopen2", "armatureName", null, 1)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupSpineAni2.height;
                _this.groupSpineAni2.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var centerPosX = this.groupAll.x;
            var centerPosY = this.groupAll.y;
            var gap = 0;
            var cardMoveBy = function (index, node, posX) {
                var curCard = cardInfo;
                var curTbl = zj.TableItemPotato.Item(curCard.id);
                var aniName = "kapai_baise";
                if (curTbl.quality >= 3) {
                    // 3蓝 4紫 5橙 6红
                    aniName = _this.aniNameArr[curTbl.quality - 3];
                }
                egret.Tween.get(node)
                    .to({ x: node.x + posX }, 250, egret.Ease.sineInOut)
                    .call(function () {
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "000_chuxian", 1)
                        .then(function (display) {
                        display.scaleX = 1.2;
                        display.scaleY = 1.24;
                        display.x = _this.groupCardAni.width / 2;
                        display.y = _this.groupCardAni.height / 2;
                        _this.groupCardAni.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "001_xunhuan_qian", 0)
                        .then(function (display) {
                        display.x = _this.groupCardAniFront.width / 2;
                        display.y = _this.groupCardAniFront.height / 2;
                        _this.groupCardAniFront.addChild(display);
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
                                .to({ x: node.x - 1, y: node.y + 2 }, 20)
                                .to({ x: node.x + 1, y: node.y - 2 }, 20);
                        }
                    }
                })
                    .wait(800)
                    .wait(22 / 60 * 100)
                    .call(function () {
                    _this.groupCardContent.visible = true;
                    _this.groupCardContent.alpha = 1;
                    _this.imageCardBack.visible = false;
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "002_xunhuan_hou", 0)
                        .then(function (display) {
                        display.scaleX = 1.2;
                        display.scaleY = 1.2;
                        display.x = _this.groupCardBackAni.width / 2;
                        display.y = _this.groupCardBackAni.height / 2;
                        _this.groupCardBackAni.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                });
            };
            egret.Tween.get(this.imageBackBoard)
                .to({ x: this.posBoardX - zj.UIManager.StageWidth }, 0)
                .wait(1420)
                .call(function () { _this.imageBackBoard.visible = true; })
                .to({ x: this.posBoardX }, 300);
            egret.Tween.get(this.imageCardBack)
                .wait(1620)
                .call(function () { _this.imageCardBack.visible = true; })
                .wait(500)
                .call(function () {
                egret.Tween.get(_this.groupCard)
                    .to({ alpha: 1 }, 300)
                    .to({ scaleX: 1 }, 500, egret.Ease.backOut)
                    .call(function () {
                    cardMoveBy(1, _this.groupCard, 0);
                })
                    .wait(1500)
                    .call(function () {
                    _this.setInfoAttriAni();
                });
            });
            zj.Game.PlayerInfoSystem.playAnnouce = true;
        };
        CardComposeEndDialog.prototype.setInfoAttriAni = function () {
            var _this = this;
            var moveTime = 350;
            var moveTime2 = 90;
            egret.Tween.get(this.groupCardInfo)
                .call(function () { _this.groupCardInfo.visible = true; })
                .to({ x: this.posInfoX + 130 }, moveTime)
                .call(function () {
                egret.Tween.get(_this.labelMainAttribute)
                    .to({ x: _this.posMainX + 100 }, 0)
                    .call(function () { _this.labelMainAttribute.visible = true; })
                    .to({ x: _this.posMainX }, moveTime2);
                for (var i = 0; i < _this.addStr.length; i++) {
                    _this.listAttriData.replaceItemAt({ stopAni: false, isVisible: true, type: 3, colorWhite: true, index: i, info: _this.addStr[i], star: _this.curTbl.star, length: _this.addStr.length, width: _this.scroAttribute.width }, i);
                }
                _this.bAniEnd = true;
                _this.labelEnd.text = zj.TextsConfig.TextsConfig_Activity.closeUI;
            });
            egret.Tween.get(this.groupCardContent)
                .to({ x: this.posConX - 130 }, moveTime);
            egret.Tween.get(this.groupCardBackAni)
                .to({ x: this.posConX - 130 }, moveTime);
        };
        CardComposeEndDialog.prototype.onTouchDialog = function () {
            var _this = this;
            if (this.bAniEnd) {
                this.father.setUI();
                this.close();
            }
            else {
                this.bAniEnd = true;
                this.labelEnd.text = zj.TextsConfig.TextsConfig_Activity.closeUI;
                this.groupSpineAni.visible = false;
                this.groupSpineAni2.visible = false;
                egret.Tween.pauseTweens(this.groupCard);
                egret.Tween.pauseTweens(this.groupCardInfo);
                egret.Tween.pauseTweens(this.labelMainAttribute);
                egret.Tween.pauseTweens(this.imageCardBack);
                egret.Tween.pauseTweens(this.groupCardContent);
                egret.Tween.pauseTweens(this.imageBackBoard);
                egret.Tween.pauseTweens(this.groupCardBackAni);
                for (var i = 0; i < this.addStr.length; i++) {
                    this.listAttriData.replaceItemAt({ stopAni: true, isVisible: true, type: 3, colorWhite: true, index: i, info: this.addStr[i], star: this.curTbl.star, length: this.addStr.length, width: this.scroAttribute.width }, i);
                }
                this.imageBackBoard.visible = true;
                this.imageCardBack.visible = false;
                this.groupCardContent.visible = true;
                this.groupCardContent.alpha = 1;
                this.groupCardInfo.visible = true;
                this.imageBackBoard.x = this.posBoardX;
                this.imageBackBoard.y = this.posBoardY;
                this.labelMainAttribute.visible = true;
                this.labelMainAttribute.x = this.posMainX;
                this.labelMainAttribute.y = this.posMainY;
                this.groupCardInfo.x = this.posInfoX + 130;
                this.groupCardContent.x = this.posConX - 130;
                this.groupCardBackAni.x = this.posConX - 130;
                var aniName = "kapai_baise";
                if (this.curTbl.quality >= 3) {
                    aniName = this.aniNameArr[this.curTbl.quality - 3];
                }
                zj.Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "002_xunhuan_hou", 0)
                    .then(function (display) {
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    display.x = _this.groupCardBackAni.width / 2;
                    display.y = _this.groupCardBackAni.height / 2;
                    _this.groupCardBackAni.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        return CardComposeEndDialog;
    }(zj.Dialog));
    zj.CardComposeEndDialog = CardComposeEndDialog;
    __reflect(CardComposeEndDialog.prototype, "zj.CardComposeEndDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardComposeEndDialog.js.map