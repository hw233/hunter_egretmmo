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
     * @author xing li wei
     *
     * @date 2019-3-29
     *
     * @class  挑战掉落物品界面
     */
    var CardBagPopItem = (function (_super) {
        __extends(CardBagPopItem, _super);
        function CardBagPopItem() {
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
            _this.cardstbl = [];
            _this.turnNode = [];
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.skinName = "resource/skins/card/CardBagPopItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            zj.cachekeys(zj.UIResource["CardBagPopItem"], null);
            _this.init();
            return _this;
        }
        CardBagPopItem.prototype.init = function () {
            this.labelConstRarity1.text = zj.LANG("稀有度：");
            this.labelConstRarity2.text = zj.LANG("稀有度：");
            this.labelConstRarity3.text = zj.LANG("稀有度：");
            this.btnGetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCard, this);
            // this.groupItemContent1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard1, this);
            // this.groupItemContent2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard2, this);
            // this.groupItemContent3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard3, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.btnSell1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell1, this);
            this.btnSell2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell2, this);
            this.btnSell3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell3, this);
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
            this.groupGetCard.alpha = 1;
            this.groupGetCard.scaleX = 0;
            this.groupGetCard.scaleY = 0;
            this.groupCardCenterX = this.groupCard2.x;
            this.groupSell1.visible = false;
            this.groupSell2.visible = false;
            this.groupSell3.visible = false;
            this.groupSell1.alpha = 0;
            this.groupSell2.alpha = 0;
            this.groupSell3.alpha = 0;
            this.btnSell1.touchEnabled = false;
            this.btnSell2.touchEnabled = false;
            this.btnSell3.touchEnabled = false;
            this.groupCardContent1.visible = false;
            this.groupCardContent2.visible = false;
            this.groupCardContent1.visible = false;
            this.imgSale1.visible = false;
            this.imgSale2.visible = false;
            this.imgSale3.visible = false;
            this.groupExtra.visible = false;
            this.imgItemIcon1.mask = this.imgItemFrame11;
            this.imgItemIcon2.mask = this.imgItemFrame22;
            this.imgItemIcon3.mask = this.imgItemFrame33;
            this.btnGetCard.alpha = 0;
            this.btnGetCard.touchEnabled = false;
        };
        CardBagPopItem.prototype.setCardInfo = function (info) {
            var _this = this;
            this.cardInfo = info;
            var goodsNum = info.length;
            if (goodsNum > 3) {
                goodsNum = 3;
            }
            var _loop_1 = function (i) {
                var goodsnum = info[i - 1];
                var goodsType = zj.PlayerItemSystem.ItemType(goodsnum.goodsId);
                if (goodsType == message.EGoodsType.GOODS_TYPE_POTATO) {
                    var _a = zj.Table.FindR(this_1.potatos, function (k, v) {
                        if (v.id == goodsnum.goodsId) {
                            return true;
                        }
                    }), v = _a[0], k = _a[1];
                    if (v != null) {
                        var curCard = v;
                        this_1.cardstbl[i] = v;
                        var curTbl = zj.TableItemPotato.Item(curCard.id);
                        var _b = zj.PlayerCardSystem.GetItemFrame(curCard.id), _ = _b[0], bigFramePic = _b[1];
                        this_1["labelCardId" + i].text = curTbl.num;
                        this_1["labelCardName" + i].text = curTbl.name;
                        this_1["labelLevel" + i].text = curTbl.level.toString();
                        this_1["imageIcon" + i].source = zj.cachekey(curTbl.paths, this_1);
                        this_1["imageCardType" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1], this_1);
                        this_1["labelCardInfo" + i].text = curTbl.des;
                        this_1["imageFrame" + i].source = zj.cachekey(bigFramePic, this_1);
                        this_1["imageGradeLevel" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[curTbl.rarity - 1], this_1);
                        if (curCard.add_attri.length + 1 == 5 && curCard.star < 6) {
                            zj.Helper.NodeStarByAlignLeft(this_1["groupStar" + i], curCard.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                        }
                        else if (curCard.add_attri.length == 5 && curCard.star >= 6) {
                            zj.Helper.NodeStarByAlignLeft(this_1["groupStar" + i], curCard.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star_next);
                        }
                        else {
                            zj.Helper.NodeStarByAlignLeft(this_1["groupStar" + i], curCard.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
                        }
                        this_1.turnNode[i - 1] = this_1["groupCardContent" + i];
                        this_1["groupSell" + i].visible = true;
                        egret.Tween.get(this_1["groupSell" + i]).wait(1000).to({ alpha: 1 }, 1000).call(function () {
                            _this.btnSell1.touchEnabled = true;
                            _this.btnSell2.touchEnabled = true;
                            _this.btnSell3.touchEnabled = true;
                        });
                        this_1["groupItemContent" + i].visible = false;
                        this_1["imageBack" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Potato.outside_frame.card, this_1);
                        this_1["LabelSellNum" + i].text = curTbl.price.toString();
                    }
                    else {
                        var itemSet = zj.PlayerItemSystem.Set(goodsnum.goodsId, null, goodsnum.count);
                        this_1["imgItemFrame" + i].source = zj.cachekey(itemSet.Frame, this_1);
                        this_1["imgItemFrame" + i + "" + i].source = zj.cachekey(itemSet.Frame, this_1);
                        this_1["imgItemIcon" + i].source = zj.cachekey(itemSet.Clip, this_1);
                        this_1["labelItemNum" + i].text = goodsnum.count.toString();
                        this_1["labelItemName" + i].text = itemSet.Info.name;
                        this_1.turnNode[i - 1] = this_1["groupItemContent" + i];
                        this_1["groupCardContent" + i].visible = false;
                        this_1["imageBack" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Potato.outside_frame.item, this_1);
                        this_1["imgSale" + i].visible = false;
                        this_1["btnSell" + i].visible = false;
                        this_1["LabelSellNum" + 1].visible = false;
                        this_1["imgIcon" + i].visible = false;
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.card_is_full);
                    }
                }
                else {
                    var itemSet = zj.PlayerItemSystem.Set(goodsnum.goodsId, null, goodsnum.count);
                    this_1["imgItemFrame" + i].source = zj.cachekey(itemSet.Frame, this_1);
                    this_1["imgItemFrame" + i + "" + i].source = zj.cachekey(itemSet.Frame, this_1);
                    this_1["imgItemIcon" + i].source = zj.cachekey(itemSet.Clip, this_1);
                    this_1["labelItemNum" + i].text = goodsnum.count.toString();
                    this_1["labelItemName" + i].text = itemSet.Info.name;
                    this_1["imgSale" + i].visible = false;
                    this_1["btnSell" + i].visible = false;
                    this_1["LabelSellNum" + i].visible = false;
                    this_1["imgIcon" + i].visible = false;
                    this_1.turnNode[i - 1] = this_1["groupItemContent" + i];
                    this_1["groupCardContent" + i].visible = false;
                    this_1["imageBack" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Potato.outside_frame.item, this_1);
                }
            };
            var this_1 = this;
            for (var i = 1; i <= goodsNum; i++) {
                _loop_1(i);
            }
            if (goodsNum == 2) {
                this.groupCard1.left = 150;
                this.groupCard2.right = 150;
                this.groupCard3.visible = false;
            }
            else if (goodsNum == 1) {
                this.groupCard1.left = 350;
                this.groupCard2.visible = false;
                this.groupCard3.visible = false;
            }
            for (var i = 0; i < this.turnNode.length; i++) {
                this.turnNode[i].visible = true;
            }
        };
        CardBagPopItem.prototype.playAni = function (transp, info, extraInfo, father, cb, potatos) {
            var _this = this;
            this.father = father;
            this.potatos = potatos;
            this.setCardInfo(info);
            this.CB = cb;
            var aniNameArr = [
                "kapai_baise",
                "kapai_zise",
                "kapai_chengse",
                "kapai_hongse"
            ];
            var cardMoveBy = function (index, node, posX) {
                var aniName = "kapai_baise";
                ;
                // let curCard = cardInfo[index];
                if ((index + 1) > info.length) {
                    return;
                }
                var curTbl = zj.TableItemPotato.Item(info[index].goodsId);
                if (curTbl == null || curTbl == undefined) {
                    aniName = "kapai_baise";
                }
                else {
                    if (curTbl.quality >= 3) {
                        // 3蓝 4紫 5橙 6红
                        aniName = aniNameArr[curTbl.quality - 3];
                    }
                }
                // Game.PlayerItemSystem.GetItemQuality()
                egret.Tween.get(node)
                    .to({ x: node.x + posX }, 200, egret.Ease.sineInOut)
                    .wait(300 * (index + 1))
                    .call(function () {
                    zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "000_chuxian", 1)
                        .then(function (display) {
                        display.scaleX = 1.2;
                        display.scaleY = 1.24;
                        display.x = _this.groupCardArr[index].width / 2;
                        display.y = _this.groupCardArr[index].height / 2 - 70;
                        _this.groupCardArr[index].addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    if (_this["groupItemContent" + (index + 1)].visible == false) {
                        zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "001_xunhuan_qian", 0)
                            .then(function (display) {
                            display.x = _this.groupCardArr[index].width / 2;
                            display.y = _this.groupCardArr[index].height / 2;
                            _this.groupCardArr[index].addChild(display);
                        })
                            .catch(function (reason) {
                            zj.toast(reason);
                        });
                    }
                    var curCard = info[index];
                    egret.Tween.get(node)
                        .wait(100)
                        .wait((22 / 60 + index * 3 / 60) * 100)
                        .call(function () {
                        zj.Game.DragonBonesManager.playAnimation(_this, aniName, "armatureName", "002_xunhuan_hou", 0)
                            .then(function (display) {
                            display.scaleX = 1.2;
                            display.scaleY = 1.2;
                            display.x = _this.groupCardAniFrontArr[index].width / 2;
                            display.y = _this.groupCardAniFrontArr[index].height / 2 - 70;
                            _this.groupCardAniFrontArr[index].addChild(display);
                        })
                            .catch(function (reason) {
                            zj.toast(reason);
                        });
                        _this.imageBackArr[index].visible = false;
                    });
                });
                zj.Game.PlayerInfoSystem.playAnnouce = true;
            };
            var _loop_2 = function (i) {
                zj.Game.DragonBonesManager.playAnimation(this_2, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0)
                    .then(function (display) {
                    display.x = _this["groupOrn" + i].width / 2;
                    display.y = _this["groupOrn" + i].height;
                    display.scaleX = 0.8;
                    display.scaleY = 0.8;
                    _this["groupOrn" + i].addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
            };
            var this_2 = this;
            for (var i = 1; i <= 3; i++) {
                _loop_2(i);
            }
            egret.Tween.get(this.groupGetCard)
                .to({ alpha: 1 }, 200)
                .to({ scaleX: 1, scaleY: 1, }, 200, egret.Ease.backOut)
                .call(function () {
                for (var i = 0; i < 3; i++) {
                    cardMoveBy(i, _this.groupCardArr[i], 0); //(i + 1) * 300 - 2 * 300
                }
            })
                .wait(600)
                .call(function () {
                _this.btnGetCard.visible = true;
                egret.Tween.get(_this.btnGetCard).to({ alpha: 1 }, 300).call(function () {
                    _this.btnGetCard.touchEnabled = true;
                    _this.groupCard11.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchGroupCard1, _this);
                    _this.groupCard22.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchGroupCard2, _this);
                    _this.groupCard33.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchGroupCard3, _this);
                });
            });
        };
        CardBagPopItem.prototype.SetContinueCB = function (cb) {
            this.CB = cb;
        };
        CardBagPopItem.prototype.onTouchGroupCard1 = function (e) {
            this.ShowTips(0, e);
        };
        CardBagPopItem.prototype.onTouchGroupCard2 = function (e) {
            this.ShowTips(1, e);
        };
        CardBagPopItem.prototype.onTouchGroupCard3 = function (e) {
            this.ShowTips(2, e);
        };
        CardBagPopItem.prototype.onBtnGetCard = function () {
            // this.father.setUI();
            if (this.CB) {
                this.CB();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        CardBagPopItem.prototype.ShowTips = function (index, e) {
            var _this = this;
            if (this.potatos != null && zj.PlayerItemSystem.ItemType(this.cardInfo[index].goodsId) == message.EGoodsType.GOODS_TYPE_POTATO) {
                var _a = zj.Table.FindR(this.potatos, function (_k, _v) {
                    if (_v.id == _this.cardInfo[index].goodsId) {
                        return true;
                    }
                }), v = _a[0], k = _a[1];
                if (v != null) {
                    zj.TipManager.ShowCard(v);
                }
                else {
                    var ui = this.getChildByName("UI");
                    if (ui) {
                        return;
                    }
                    var commonDesSkill = zj.TipManager.ShowProp(this.cardInfo[index], this, e.localY * 0.75, e.stageX, e.stageY);
                    commonDesSkill.name = "UI";
                    this.addChild(commonDesSkill);
                }
            }
            else {
                var ui = this.getChildByName("UI");
                if (ui) {
                    return;
                }
                var commonDesSkill = zj.TipManager.ShowProp(this.cardInfo[index], this, e.localY * 0.75, e.stageX, e.stageY);
                commonDesSkill.name = "UI";
                this.addChild(commonDesSkill);
            }
        };
        CardBagPopItem.prototype.up = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        CardBagPopItem.prototype.onBtnSell1 = function () {
            var thisOne = this;
            this.potatoSoldReq(1)
                .then(function () {
                zj.toast_success("出售成功");
                zj.Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
                thisOne.FreshCurrSell();
                thisOne.DelGetPotatoItem();
                thisOne.currindex = -1;
            })
                .catch(function () {
            });
        };
        CardBagPopItem.prototype.onBtnSell2 = function () {
            var thisOne = this;
            this.potatoSoldReq(2)
                .then(function () {
                zj.toast_success("出售成功");
                zj.Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
                thisOne.FreshCurrSell();
                thisOne.DelGetPotatoItem();
                thisOne.currindex = -1;
            })
                .catch(function () {
            });
        };
        CardBagPopItem.prototype.onBtnSell3 = function () {
            var thisOne = this;
            this.potatoSoldReq(3)
                .then(function () {
                zj.toast_success("出售成功");
                zj.Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
                thisOne.FreshCurrSell();
                thisOne.DelGetPotatoItem();
                thisOne.currindex = -1;
            })
                .catch(function () {
            });
        };
        CardBagPopItem.prototype.FreshCurrSell = function () {
            if (this["imgSale" + this.currindex] != null) {
                this["imgSale" + this.currindex].visible = true;
            }
            if (this["btnSell" + this.currindex] != null) {
                this["btnSell" + this.currindex].visible = false;
            }
            this.setPriceCisible(this.currindex, false);
        };
        CardBagPopItem.prototype.setPriceCisible = function (index, visible) {
            if (this["LabelSellNum" + index] != null) {
                this["LabelSellNum" + index].visible = visible;
            }
            if (this["imgIcon" + index] != null) {
                this["imgIcon" + index].visible = visible;
            }
        };
        CardBagPopItem.prototype.DelGetPotatoItem = function () {
            var index = -1;
            for (var k in this.scene.getItemInfo.items) {
                if (this.scene.getItemInfo.items.hasOwnProperty(k)) {
                    var v = this.scene.getItemInfo.items[k];
                    if (v.goodsId == this.cardstbl[this.currindex - 1].id) {
                        index = Number(k);
                        break;
                    }
                }
            }
            if (index != -1) {
                this.scene.getItemInfo.items.slice(index - 1);
            }
            index = -1;
            for (var k in zj.Game.PlayerBattleSystem.continueBattleDropItems) {
                if (zj.Game.PlayerBattleSystem.continueBattleDropItems.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerBattleSystem.continueBattleDropItems[k];
                    if (v.goodsId == this.cardstbl[this.currindex - 1].id) {
                        if (zj.PlayerItemSystem.ItemIsOverlap(v.goodsId)) {
                            v.count -= 1;
                            if (v.count <= 0) {
                                index = Number(k);
                            }
                        }
                        else {
                            index = Number(k);
                        }
                        break;
                    }
                }
            }
            if (index != -1) {
                zj.Game.PlayerBattleSystem.continueBattleDropItems.slice(index - 1);
            }
        };
        CardBagPopItem.prototype.potatoSoldReq = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PotatoSoldRequest();
                request.body.index = [_this.cardstbl[index].index];
                _this.currindex = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        return CardBagPopItem;
    }(zj.Dialog));
    zj.CardBagPopItem = CardBagPopItem;
    __reflect(CardBagPopItem.prototype, "zj.CardBagPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardBagPopItem.js.map