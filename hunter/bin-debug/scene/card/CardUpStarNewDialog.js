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
     * 升星界面Dialog
     * created by Lian Lei
     * 2018.12.03
     */
    var CardUpStarNewDialog = (function (_super) {
        __extends(CardUpStarNewDialog, _super);
        function CardUpStarNewDialog() {
            var _this = _super.call(this) || this;
            _this.metList = [];
            _this.listDataArr = new eui.ArrayCollection();
            _this.skinName = "resource/skins/card/CardUpStarNewDialogSkin.exml";
            _this.group.width = zj.UIManager.StageWidth;
            _this.group.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        CardUpStarNewDialog.prototype.isFullScreen = function () {
            return true;
        };
        CardUpStarNewDialog.prototype.setInfo = function (cardInfo, cb) {
            this.cardInfo = cardInfo;
            this.initCardInfo = cardInfo;
            this.callBack = cb;
            this.refreshInfo();
            this.setInfoAni();
        };
        CardUpStarNewDialog.prototype.init = function () {
            this.initCardInfo = null;
            this.upStar = false;
            this.imgEmpty.visible = false;
            this.sx = 0;
            this.sy = 0;
            this.groupYinCang.x = this.sx - 90;
            this.groupYinCang.y = this.sy;
            this.groupYinCang.alpha = 0;
            this.propTbl = [];
            this.metGeneralTbl = [0, 0, 0, 0, 0];
            this.initMeterialNode();
            this.btnCardSort.visible = false;
            this.groupYinCang.visible = false;
            this.groupStar.visible = true;
            this.listHeroes.itemRenderer = zj.CardUpStarNewItem;
            this.refreshGold();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.imgHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
            this.imgFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
            this.imgCardType.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
            this.imgNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
            this.labelLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
            this.listHeroes.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHeroesTap, this);
            this.btnAddStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStar, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
        };
        CardUpStarNewDialog.prototype.initBaseCard = function () {
            this.cardInfo = null;
            this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
            this.labelUpStarNum.text = "0";
            this.imgCardType.visible = false;
            this.imgHead.visible = false;
            this.imgFrame.visible = false;
            this.labelLevel.text = "";
            this.groupCurrencyStar.removeChildren();
            this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.itemFrame[0], this);
            for (var i = 0; i < this.metList.length; i++) {
                var v = this.metList[i];
                v.setInfo(i, this);
            }
            this.loadLeftList();
        };
        CardUpStarNewDialog.prototype.refreshGold = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
        };
        // 加载右侧升星材料
        CardUpStarNewDialog.prototype.initMeterialNode = function () {
            var _this = this;
            var cardUpStarNewItemB1 = new zj.CardUpStarNewItemB();
            this.groupAdd1.addChild(cardUpStarNewItemB1);
            this.metList.push(cardUpStarNewItemB1);
            cardUpStarNewItemB1.setInfo(0, this, function (index) {
                _this.onMaterialDeselected(index);
            });
            var cardUpStarNewItemB2 = new zj.CardUpStarNewItemB();
            this.groupAdd2.addChild(cardUpStarNewItemB2);
            this.metList.push(cardUpStarNewItemB2);
            cardUpStarNewItemB2.setInfo(1, this, function (index) {
                _this.onMaterialDeselected(index);
            });
            ;
            var cardUpStarNewItemB3 = new zj.CardUpStarNewItemB();
            this.groupAdd3.addChild(cardUpStarNewItemB3);
            this.metList.push(cardUpStarNewItemB3);
            cardUpStarNewItemB3.setInfo(2, this, function (index) {
                _this.onMaterialDeselected(index);
            });
            var cardUpStarNewItemB4 = new zj.CardUpStarNewItemB();
            this.groupAdd4.addChild(cardUpStarNewItemB4);
            this.metList.push(cardUpStarNewItemB4);
            cardUpStarNewItemB4.setInfo(3, this, function (index) {
                _this.onMaterialDeselected(index);
            });
            var cardUpStarNewItemB5 = new zj.CardUpStarNewItemB();
            this.groupAdd5.addChild(cardUpStarNewItemB5);
            this.metList.push(cardUpStarNewItemB5);
            cardUpStarNewItemB5.setInfo(4, this, function (index) {
                _this.onMaterialDeselected(index);
            });
        };
        // 左侧list列表取消选中回调函数
        CardUpStarNewDialog.prototype.onMaterialDeselected = function (index) {
            if (index <= 0 || index == null) {
                return;
            }
            var i = this.metGeneralTbl.indexOf(index);
            if (i >= 0) {
                // 刷新材料
                this.metGeneralTbl[i] = 0;
                this.metList[i].setFresh(this.metGeneralTbl[i]);
                // list 取消选中
                var itemIndex = -1;
                for (var i_1 = 0; i_1 < this.listDataArr.length; i_1++) {
                    var v = this.listDataArr.getItemAt(i_1);
                    if (v.cardInfo.index == index) {
                        itemIndex = i_1;
                        break;
                    }
                }
                if (itemIndex < 0) {
                    return;
                }
                var itemData = this.listDataArr.getItemAt(itemIndex);
                itemData.isSelected = false;
                this.listDataArr.replaceItemAt(itemData, itemIndex);
            }
        };
        // 右侧 0显示星星 -1显示锁 cardInfo显示卡片信息
        CardUpStarNewDialog.prototype.setMaterialInfo = function (card_info) {
            var _this = this;
            if (card_info == null || card_info == undefined) {
                var star = this.cardInfo.star;
                var pos = zj.CommonConfig.card_up_star_consume_cards[star - 1];
                for (var _i = 0, _a = zj.HelpUtil.GetKV(this.metGeneralTbl); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    if (pos == zj.CommonConfig.card_max_star) {
                        this.metGeneralTbl[k] = -1;
                    }
                    else {
                        if (k > pos - 1) {
                            this.metGeneralTbl[k] = -1;
                        }
                        else {
                            this.metGeneralTbl[k] = 0;
                        }
                    }
                }
                for (var i = 0; i < this.metList.length; i++) {
                    var v = this.metList[i];
                    v.setFresh(this.metGeneralTbl[i]);
                }
            }
            else {
                var findk = null;
                for (var i = 0; i < this.metGeneralTbl.length; i++) {
                    var index = this.metGeneralTbl[i];
                    if (index == card_info.index) {
                        findk = i;
                        break;
                    }
                }
                if (findk == null) {
                    var emptyk = null;
                    for (var _c = 0, _d = zj.HelpUtil.GetKV(this.metGeneralTbl); _c < _d.length; _c++) {
                        var _e = _d[_c], k = _e[0], v = _e[1];
                        if (v == 0) {
                            emptyk = k;
                            break;
                        }
                    }
                    if (emptyk != null) {
                        this.metGeneralTbl[emptyk] = card_info.index;
                    }
                    this.metList[emptyk].setInfo(emptyk, this, function (index) {
                        _this.onMaterialDeselected(card_info.index);
                    });
                    this.metList[emptyk].setFresh(card_info);
                }
                else {
                    this.metGeneralTbl[findk] = 0;
                    this.metList[findk].setFresh(0);
                }
            }
        };
        // 刷新列表
        CardUpStarNewDialog.prototype.refreshInfo = function () {
            this.loadLeftList();
            this.setRightCardInfo();
            this.setMaterialInfo();
            this.setCardAttributeInfo();
            this.refreshGold();
        };
        CardUpStarNewDialog.prototype.setInfoAni = function () {
            var _this = this;
            var bg = "ui_hunter_BackGroundCard_png";
            var bones = ["004_daoju01", "005tishi", "001_bg"];
            var paths = [this.groupHeroInfo, this.groupFrame, bg];
            for (var i = 1; i < zj.CommonConfig.card_max_star; i++) {
                bones.push("002_diban1" + i);
                paths.push(this["groupAdd" + i]);
            }
            this.groupAni.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "ui_zuheshengxing_eff", "armatureName", null, 0)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupAni.height;
                display.scaleX = 0.85;
                display.height = _this.groupAni.height;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var showChangeCard = zj.Tips.GetSaveBoolForGeneralUpStar();
            this.groupFrame.visible = !showChangeCard;
        };
        CardUpStarNewDialog.prototype.upStarAni = function () {
            var _this = this;
            var bg = "ui_hunter_BackGroundCard_png";
            var bones = ["004_daoju01", "005tishi", "bg"];
            var paths = [this.groupHeroInfo, this.groupFrame, bg];
            for (var i = 1; i < zj.CommonConfig.card_max_star; i++) {
                bones.push("002_diban1" + i);
                paths.push(this["groupAdd" + i]);
            }
            zj.Game.DragonBonesManager.playAnimation(this, "ui_zuheshengxing_eff", "armatureName", Number(this.initCardInfo.star - 1), 1)
                .then(function (display) {
                display.x = 0;
                display.y = _this.groupAni.height;
                display.scaleX = 0.85;
                display.height = _this.groupAni.height;
                _this.groupAni.addChild(display);
                var timeOut = egret.setTimeout(function () { zj.toast(zj.TextsConfig.TextsConfig_Hunter_Card.upstar_success); }, _this, 1500);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        // 加载卡片列表
        CardUpStarNewDialog.prototype.loadLeftList = function () {
            var showChangeCard = zj.Tips.GetSaveBoolForGeneralUpStar();
            this.groupFrame.visible = !showChangeCard;
            // this.groupFrame.visible = true;
            this.img5.visible = false;
            if (this.initCardInfo) {
                this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarMet;
            }
            this.propTbl = zj.PlayerCardSystem.GetAllCard(this.initCardInfo);
            var lcTbl = zj.Table.DeepCopy(this.propTbl);
            var fix = zj.PlayerItemSystem.FixCount(this.propTbl.length, 16, 4);
            for (var i = 0; i < fix; i++) {
                lcTbl.push(new message.PotatoInfo());
            }
            this.listDataArr.removeAll();
            var index = -1;
            for (var i = 0; i < lcTbl.length; i++) {
                var v = lcTbl[i];
                var itemData = new zj.CardUpStarNewItemData();
                itemData.cardInfo = v;
                itemData.father = this;
                if (this.cardInfo != null && this.cardInfo.index != 0 && itemData.cardInfo.index == this.cardInfo.index) {
                    itemData.isSelected = true;
                    index = i;
                }
                else {
                    itemData.isSelected = false;
                }
                this.listDataArr.addItem(itemData);
            }
            this.listHeroes.dataProvider = this.listDataArr;
            this.scrollList(index);
        };
        CardUpStarNewDialog.prototype.scrollList = function (selectedIndex) {
            if (selectedIndex < 0) {
                return;
            }
            if (this.listHeroes.scrollV != 0) {
                return;
            }
            var realRow = selectedIndex / 3.8;
            if (realRow < 3.8) {
                return;
            }
            var item = new zj.CardUpStarNewItem();
            if (realRow + 3.8 >= (this.listDataArr.length / 3.8)) {
                realRow = (this.listDataArr.length / 3.8) - 3.8;
            }
            else {
                realRow -= 2;
            }
            var scrolHeight = realRow * item.height;
            egret.Tween.get(this.listHeroes)
                .to({ scrollV: scrolHeight }, 350, egret.Ease.backIn);
        };
        // 升星信息
        CardUpStarNewDialog.prototype.setCardAttributeInfo = function () {
            var _this = this;
            this.groupAttInfo.visible = true;
            zj.loadUI(zj.CardUpStar)
                .then(function (dialog) {
                _this.cardUpStar = dialog;
                _this.groupAttInfo.addChild(_this.cardUpStar);
                _this.cardUpStar.setInfo(_this.cardInfo);
            });
        };
        // 右侧上方头像信息
        CardUpStarNewDialog.prototype.setRightCardInfo = function () {
            this.imgCardType.visible = true;
            this.imgHead.visible = true;
            this.imgFrame.visible = true;
            var tbl = zj.TableItemPotato.Item(this.cardInfo.id);
            var framePic = zj.PlayerCardSystem.GetItemFrame(this.cardInfo.id)[0];
            this.imgCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
            this.imgHead.source = zj.cachekey(tbl.path, this);
            this.imgFrame.source = zj.cachekey(framePic, this);
            this.labelLevel.text = this.cardInfo.level.toString();
            this.groupCurrencyStar.removeChildren();
            var addStr = zj.PlayerCardSystem.GetAddStr(this.cardInfo);
            if (addStr.length == 5) {
                zj.Helper.SetStar(this.groupCurrencyStar, this.cardInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 9);
            }
            else {
                zj.Helper.SetStar(this.groupCurrencyStar, this.cardInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 9);
            }
            var potatoInfo = zj.TableItemPotato.Item(this.cardInfo.id);
            var cost = potatoInfo.up_money[this.cardInfo.star - 1] || 0;
            this.labelUpStarNum.text = ("" + cost) || "" + 0;
        };
        // 关闭升星界面
        CardUpStarNewDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.callBack();
        };
        // 点击右侧上方卡片头像 
        CardUpStarNewDialog.prototype.onBtnHero = function () {
            if (this.cardInfo) {
                zj.Tips.SetSaveBoolForGeneralUpStar(true);
                this.groupFrame.visible = false;
                this.cardUpStar.groupYincang.visible = false;
                this.cardUpStar.groupStar.visible = false;
                this.cardUpStar.imgMax.visible = false;
                this.initBaseCard();
                this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
                this.cardUpStar.imgUpStarAtt.visible = true;
                this.imgEmpty.visible = true;
            }
        };
        // 左侧list列表点击
        CardUpStarNewDialog.prototype.onListHeroesTap = function (e) {
            var item = this.listHeroes.getElementAt(e.itemIndex);
            var data = this.listDataArr.getItemAt(e.itemIndex);
            if (this.cardInfo == null) {
                if (data.cardInfo == null) {
                    return;
                }
                else {
                    data.type = data.CurState.Base;
                    this.cardInfo = zj.Table.DeepCopy(data.cardInfo);
                    this.refreshInfo();
                    this.cardUpStar.imgUpStarAtt.visible = false;
                    this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarMet;
                }
            }
            else {
                if (data.cardInfo == null) {
                    return;
                }
                else if (this.cardInfo != null && this.cardInfo.index == data.cardInfo.index && this.cardInfo.pos == data.cardInfo.pos) {
                    this.initBaseCard();
                    this.cardUpStar.groupYincang.visible = false;
                    this.cardUpStar.groupStar.visible = false;
                    this.cardUpStar.imgMax.visible = false;
                    this.cardUpStar.imgUpStarAtt.visible = true;
                    this.imgEmpty.visible = true;
                    this.labelHunterTip.text = zj.TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
                }
                else if (data.type == data.CurState.BHost) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_be_hosted);
                    return;
                }
                else if (data.type == data.CurState.Lock) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_be_locked);
                    return;
                }
                else if (data.type == data.CurState.BFirst) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_be_first);
                    return;
                }
                else if (data.cardInfo.star == this.cardInfo.star) {
                    var h_empty = zj.Table.FindF(this.metGeneralTbl, function (_k, _v) {
                        return _v == 0;
                    });
                    if ((!h_empty) && (!data.isSelected)) {
                        zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_upstar_num_max);
                        return;
                    }
                    data.isSelected = !data.isSelected;
                    if (data.isSelected == true) {
                        data.type = data.CurState.Select;
                        this.cardUpStar.groupYincang.visible = true;
                        this.cardUpStar.groupStar.visible = true;
                    }
                    else {
                        data.type = data.CurState.NoSelect;
                    }
                    this.listDataArr.replaceItemAt(data, e.itemIndex);
                    this.setMaterialInfo(data.cardInfo);
                }
                else {
                    return;
                }
            }
        };
        CardUpStarNewDialog.prototype.onBtnAddStar = function () {
            this.addStarBefore();
        };
        CardUpStarNewDialog.prototype.addStarBefore = function () {
            // let met_tbl = [];
            // for (let [k, v] of HelpUtil.GetKV(this.metGeneralTbl)) {
            // 	if (v != -1 && v != 0 && v != null) {
            // 		met_tbl.push(v);
            // 	}
            // }
            // if (this.cardInfo == null) {
            // 	toast(TextsConfig.TextsConfig_Hunter.chooseUpStarCard);
            // 	return;
            // }
            // else if (Table.VIn(this.metGeneralTbl, 0)) {
            // 	toast(TextsConfig.TextsConfig_Adviser.goods);
            // 	return;
            // }
            // else if (met_tbl.length == 0) {
            // 	toast("<color>r:255,g:0,b:0</color><text>该卡片已经强化到最高等级</text>");
            // 	return;
            // }
            this.reqAddStar();
        };
        // 升星发协议
        CardUpStarNewDialog.prototype.reqAddStar = function () {
            var _this = this;
            var met_tbl = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.metGeneralTbl); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v != -1 && v != 0 && v != null) {
                    met_tbl.push(v);
                }
            }
            zj.Game.PlayerCardSystem.potatoAddStar(this.cardInfo, met_tbl)
                .then(function (value) {
                _this.upStar = true;
                var cardInfo = null;
                var general_cardInfo = null;
                if (value.gameInfo.potatos.length > 0) {
                    cardInfo = zj.Table.FindR(value.gameInfo.potatos, function (_k, _v) {
                        return _v.index == _this.cardInfo.index && _v.pos == _this.cardInfo.pos;
                    })[0];
                }
                if (value.gameInfo.generals.length > 0) {
                    general_cardInfo = zj.Table.FindR(value.gameInfo.generals[0].potatoInfo, function (_k, _v) {
                        return _v.index == _this.cardInfo.index && _v.pos == _this.cardInfo.pos;
                    })[0];
                }
                if (cardInfo != null) {
                    _this.cardInfo = zj.Table.DeepCopy(cardInfo);
                }
                else if (general_cardInfo != null) {
                    _this.cardInfo = general_cardInfo;
                }
                _this.initCardInfo = zj.Table.DeepCopy(_this.cardInfo);
                for (var _i = 0, _a = zj.HelpUtil.GetKV(met_tbl); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    if (v != -1 && v != 0 && v != null) {
                        zj.Game.PlayerCardSystem.deleteCardByIndex(v);
                    }
                }
                _this.refreshInfo();
                _this.upStarAni();
                _this.cardPosition(_this.cardInfo.index);
                if (_this.callBack) {
                    _this.callBack();
                }
            })
                .catch(function (reason) {
                // toast(reason);
            });
        };
        CardUpStarNewDialog.prototype.onBtnAddGold = function () {
            //toast("加金币功能未开启");
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                // dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.moneys));
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**
         * 升星之后卡片定位
         */
        CardUpStarNewDialog.prototype.cardPosition = function (id) {
            var item = new zj.CardUpStarNewItem();
            var gap = 6;
            var index = this.cardIndexFromId(id);
            var row = Math.floor(index / 4);
            var maxRow = Math.floor(this.listDataArr.length / 4);
            if (maxRow - row <= 4) {
                row = maxRow - 4;
            }
            var scrollerHeight = (item.height + gap) * row;
            egret.Tween.get(this.listHeroes)
                .to({ scrollV: scrollerHeight }, 350, egret.Ease.backIn);
        };
        CardUpStarNewDialog.prototype.cardIndexFromId = function (cardIndex) {
            var index = -1;
            if (cardIndex == null || cardIndex == 0) {
                return index;
            }
            for (var i = 0; i < this.listDataArr.length; i++) {
                var data = this.listDataArr.getItemAt(i);
                if (data.cardInfo.index == cardIndex) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        return CardUpStarNewDialog;
    }(zj.Dialog));
    zj.CardUpStarNewDialog = CardUpStarNewDialog;
    __reflect(CardUpStarNewDialog.prototype, "zj.CardUpStarNewDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CardUpStarNewDialog.js.map