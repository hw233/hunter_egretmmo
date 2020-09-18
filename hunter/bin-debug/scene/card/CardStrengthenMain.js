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
         * @class 卡片强化
         *
         * @author Lian Lei
         *
         * @date 2018.11.26
     */
    var CardStrengthenMain = (function (_super) {
        __extends(CardStrengthenMain, _super);
        function CardStrengthenMain() {
            var _this = _super.call(this) || this;
            _this.cardStrengthen = null;
            _this.listAttriData = new eui.ArrayCollection();
            _this.listGoodsData = new eui.ArrayCollection();
            _this.listAttriItemIndexBefore = 0;
            _this.listAttriSelected = 0;
            _this.listGoodsItemIndexBefore = 0;
            _this.skinName = "resource/skins/card/CardStrengthenMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStrengthen, _this);
            _this.btnEnchant.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEnchant, _this);
            _this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUp, _this);
            _this.listAttri.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeListAttri, _this);
            _this.listGoods.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeListGoods, _this);
            _this.init();
            return _this;
        }
        CardStrengthenMain.prototype.init = function () {
            this.buttonIndex = 1; // index = 1 强化按钮可点 念力按钮不可点 index = 2 相反
            this.groupStrengthen.visible = true;
            this.groupEnchant.visible = false;
            this.selGoodsIndex = 1;
            this.upAttriper = 1;
            this.setButtonState();
        };
        CardStrengthenMain.prototype.loadInfo = function (info, cb) {
            this.info = info;
            this.callBack = cb;
            this.refresh();
            this.AddUi();
        };
        // 刷新界面
        CardStrengthenMain.prototype.refresh = function () {
            this.info = zj.PlayerCardSystem.RefreshCard(this.info);
            this.SetCardUI();
        };
        // 设置卡片信息
        CardStrengthenMain.prototype.SetCardUI = function () {
            this.curCard = this.info;
            this.curTbl = zj.TableItemPotato.Item(this.curCard.id);
            var bigFramePic = zj.PlayerCardSystem.GetItemFrame(this.curCard.id)[1];
            this.labelCardName.text = (this.curTbl.name);
            this.LabelLevel.text = this.curCard.level.toString();
            this.imgCard.source = zj.cachekey(this.curTbl.paths, this);
            this.imgCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.labelCardDetails.text = (this.curTbl.des);
            this.labelCardNum.text = (this.curTbl.num);
            this.imgFrame.source = zj.cachekey(bigFramePic, this);
            // let str = PlayerItemSystem.UseOfResource(this.info.id);
            var str = zj.Game.PlayerInfoSystem.Coin.toString();
            this.labelGoldNum.text = "" + str;
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard);
            if (addStr.length == 5) {
                zj.Helper.SetStar(this.groupStar, this.curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 16);
            }
            else {
                zj.Helper.SetStar(this.groupStar, this.curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 16);
            }
        };
        // 选择要添加的卡片功能界面
        CardStrengthenMain.prototype.AddUi = function () {
            var _this = this;
            if (this.cardStrengthen == null) {
                this.cardStrengthen = zj.newUI(zj.CardStrengthen);
            }
            this.cardStrengthen.setInfo(this.info, function (isRefresh, isBreak) {
                if (isRefresh)
                    _this.refresh();
                if (_this.callBack)
                    _this.callBack(isRefresh, isBreak);
                if (isBreak)
                    _this.close(zj.UI.HIDE_TO_TOP);
            });
            this.groupNodeAdd.addChild(this.cardStrengthen);
            this.cardStrengthen.name = "cardStrengthen";
        };
        CardStrengthenMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            this.cardStrengthen = null;
        };
        //////////////////////////////////注入念力相关/////////////////////////////////
        /**设置按钮状态 */
        CardStrengthenMain.prototype.setButtonState = function () {
            this.btnStrengthen.enabled = this.buttonIndex == 2;
            this.btnEnchant.enabled = this.buttonIndex == 1;
        };
        /**强化 */
        CardStrengthenMain.prototype.onBtnStrengthen = function () {
            this.groupStrengthen.visible = true;
            this.groupEnchant.visible = false;
            this.buttonIndex = 1;
            this.setButtonState();
        };
        /**注入念力 */
        CardStrengthenMain.prototype.onBtnEnchant = function () {
            if (this.info.star == zj.CommonConfig.card_max_star && zj.TableItemPotato.Item(this.curCard.id).quality == 6) {
                this.groupStrengthen.visible = false;
                this.groupEnchant.visible = true;
                this.buttonIndex = 2;
                this.setEnchanInfo(1);
                this.setButtonState();
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Card.card_error);
            }
        };
        CardStrengthenMain.prototype.setEnchanInfo = function (index, selects) {
            this._sel = index; // 从1开始
            var attri_id = this.info.add_attri[this._sel - 1].attriId;
            var range = zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
            var range_result = this.info.add_attri[this._sel - 1].growthValue;
            var _type = 1;
            if (range_result <= range[0][1]) {
                _type = 1;
            }
            else {
                _type = 2;
            }
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard, range_result, _type);
            var money = zj.Game.PlayerCardSystem.attriInstance(attri_id).growth_money[this.selGoodsIndex - 1]; // 增幅消耗金币
            this.labelCost.text = money.toString();
            if (range[0][0] == 0) {
                this.imgCanNot.visible = true;
                this.groupHide.visible = false;
                this.btnUp.enabled = false;
            }
            else {
                this.imgCanNot.visible = false;
                this.groupHide.visible = true;
                if (selects != null) {
                    this.setRightSelectInfo(1);
                }
                else {
                    this.setRightSelectInfo(this.selGoodsIndex);
                }
                this.btnUp.enabled = true;
            }
            this.listAttriData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardStrengthenMainItemData();
                itemData.index = i;
                itemData.cardInfo = this.info;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.itemRenderer = zj.CardStrengthenMainItem;
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.selectedIndex = this.listAttriSelected;
        };
        CardStrengthenMain.prototype.setRightSelectInfo = function (index) {
            var perAttr = [
                message.AttriType.ATTRI_TYPE_SKILL_ATK,
                message.AttriType.ATTRI_TYPE_SKILL_DEF,
                message.AttriType.ATTRI_TYPE_ATK_CRIT,
                message.AttriType.ATTRI_TYPE_CRIT_EXTRA,
                message.AttriType.ATTRI_TYPE_CRIT_RESISTANCE,
                message.AttriType.ATTRI_TYPE_DODGE_RATE,
                message.AttriType.ATTRI_TYPE_HIT_RATE,
                message.AttriType.ATTRI_TYPE_IGNORE_PHYDEF
            ];
            this.selGoodsIndex = index;
            var attri_id = this.info.add_attri[this._sel - 1].attriId;
            var range = zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1];
            var range_growth = zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
            var value = this.info.add_attri[this._sel - 1].attriValue;
            var _type = 1;
            if (this.info.add_attri[this._sel - 1].growthValue <= range_growth[0][1]) {
                _type = 1;
            }
            else {
                _type = 2;
            }
            if (zj.Game.PlayerCardSystem.attriInstance(attri_id).object_type == "") {
                value = Math.abs(zj.PlayerTalentSystem.Des_Card_Value(zj.Game.PlayerCardSystem.attriInstance(attri_id).attri_type, this.info.add_attri[this._sel - 1].growthValue, _type, null));
            }
            // attri_type 随机属性类型  object_type 对象类型
            if (Number(zj.Game.PlayerCardSystem.attriInstance(attri_id).object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && zj.Table.FindK(perAttr, zj.Game.PlayerCardSystem.attriInstance(attri_id).attri_type) == -1) {
                this.upAttriper = 1;
                // 注入念力后属性值
                if (this.selGoodsIndex == 1) {
                    this.labelArea.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_next_a_per, value, range[0], range[1]));
                }
                else if (this.selGoodsIndex == 2) {
                    this.labelArea.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_next_b_per, value, range[0], range[1]));
                }
                // 注入念力前属性值
                if (this.info.add_attri[this._sel - 1].growthValue == 0) {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_up_add_per, value));
                }
                else if (this.info.add_attri[this._sel - 1].growthValue > zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth[0][1]) {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_before_b_per, value, this.info.add_attri[this._sel - 1].growthValue));
                }
                else {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_before_a_per, value, this.info.add_attri[this._sel - 1].growthValue));
                }
            }
            else {
                this.upAttriper = 2;
                // 注入念力后属性值
                if (this.selGoodsIndex == 1) {
                    this.labelArea.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_next_a, value, range[0], range[1]));
                }
                else if (this.selGoodsIndex == 2) {
                    this.labelArea.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_next_b, value, range[0], range[1]));
                }
                // 注入念力前属性值
                if (this.info.add_attri[this._sel - 1].growthValue == 0) {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_up_add, value));
                }
                else if (this.info.add_attri[this._sel - 1].growthValue > zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth[0][1]) {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_before_b, value, this.info.add_attri[this._sel - 1].growthValue));
                }
                else {
                    this.labelNow.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_add_before_a, value, this.info.add_attri[this._sel - 1].growthValue));
                }
            }
            this.labelDes.text = zj.Game.PlayerCardSystem.attriInstance(attri_id).des;
            var goods = zj.Game.PlayerCardSystem.attriInstance(attri_id).growth_consume; // 增幅消耗物品
            var count = zj.Game.PlayerCardSystem.attriInstance(attri_id).growth_count; // 增幅消耗数量
            // 添加注入方式Item
            this.listGoodsData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.HXH_HunterStrengMainAddItemData();
                itemData.id = i;
                itemData.goodsId = goods[i];
                itemData.count = count[i];
                this.listGoodsData.addItem(itemData);
            }
            this.listGoods.itemRenderer = zj.HXH_HunterStrengMainAddItem;
            this.listGoods.dataProvider = this.listGoodsData;
            this.listGoods.selectedIndex = this.listGoodsItemIndexBefore;
        };
        CardStrengthenMain.prototype.setFreshInfo = function () {
            if (this.callBack)
                this.callBack(true, false);
            this.setEnchanInfo(this._sel);
            this.setRightSelectInfo(this.selGoodsIndex);
        };
        CardStrengthenMain.prototype.onBtnUp = function () {
            var _this = this;
            var attri_id = this.info.add_attri[this._sel - 1].attriId;
            if (this.info.add_attri[this._sel - 1].growthValue >= zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1][1] && this.selGoodsIndex == 1) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Card.card_select_error);
            }
            else if (this.info.add_attri[this._sel - 1].growthValue >= zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1][1] && this.selGoodsIndex == 2) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Card.card_select_Max);
            }
            else {
                var self_1 = this;
                zj.Game.PlayerCardSystem.PotatoGrowthReqReq(this.info, this._sel, this.selGoodsIndex).then(function (msg) {
                    var attriId = self_1.info.add_attri[self_1._sel - 1].attriId;
                    var value = self_1.info.add_attri[self_1._sel - 1].attriValue;
                    var growthValue = self_1.info.add_attri[self_1._sel - 1].growthValue;
                    var range_growth = zj.Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
                    var _type = 1;
                    if (self_1.info.add_attri[self_1._sel - 1].growthValue <= range_growth[0][1]) {
                        _type = 1;
                    }
                    else {
                        _type = 2;
                    }
                    var HostIndex = 1;
                    if (zj.Game.PlayerCardSystem.attriInstance(attriId).object_type == "") {
                        value = Math.abs(zj.PlayerTalentSystem.Des_Card_Value(zj.Game.PlayerCardSystem.attriInstance(attriId).attri_type, self_1.info.add_attri[self_1._sel - 1].growthValue, _type, null));
                    }
                    var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(self_1.info.index).cHostId;
                    if (cHostId != null) {
                        for (var _i = 0, _a = zj.HelpUtil.GetKV(msg.gameInfo.generals[0].potatoInfo); _i < _a.length; _i++) {
                            var _b = _a[_i], kk = _b[0], vv = _b[1];
                            if (vv.id == self_1.info.id && vv.index == self_1.info.index) {
                                HostIndex = kk;
                            }
                        }
                        self_1.info.add_attri[self_1._sel - 1].growthValue = msg.gameInfo.generals[0].potatoInfo[HostIndex].add_attri[self_1._sel - 1].growthValue;
                    }
                    else {
                        self_1.info.add_attri[self_1._sel - 1].growthValue = msg.gameInfo.potatos[0].add_attri[self_1._sel - 1].growthValue;
                    }
                    zj.loadUI(zj.CardStrengthenMainPop).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.SetInfo(self_1.info.add_attri[self_1._sel - 1].attriId, self_1.curCard, zj.TableItemPotato.Item(self_1.curCard.id), growthValue, msg.rangeResult, value, self_1.upAttriper, self_1.setFreshInfo, _this);
                    });
                }).catch(function (reason) {
                    if (reason == message.EC.XG_LACK_MONEY) {
                        zj.TipManager.ShowAddMoney();
                    }
                });
            }
        };
        /**点击注入念力选择副属性List */
        CardStrengthenMain.prototype.onChangeListAttri = function (e) {
            if (this.listAttri.selectedIndex == this.listAttriItemIndexBefore)
                return;
            var item = this.listAttri.getElementAt(e.itemIndex);
            var data = this.listAttriData.getItemAt(e.itemIndex);
            this.setEnchanInfo((data.index + 1), 1);
            this.listAttri.selectedIndex = e.itemIndex;
            this.listGoods.selectedIndex = 0;
            this.listGoodsItemIndexBefore = 0;
            this.listAttriSelected = e.itemIndex;
            this.listAttriData.itemUpdated(this.listAttriData.source[e.itemIndex]);
            this.listAttriData.itemUpdated(this.listAttriData.source[this.listAttriItemIndexBefore]);
            this.listAttriItemIndexBefore = e.itemIndex;
            this.setFreshInfo();
        };
        /**点击注入方式List */
        CardStrengthenMain.prototype.onChangeListGoods = function (e) {
            if (this.listGoods.selectedIndex == this.listGoodsItemIndexBefore)
                return;
            var item = this.listGoods.getElementAt(e.itemIndex);
            var data = this.listGoodsData.getItemAt(e.itemIndex);
            this.setRightSelectInfo(data.id + 1);
            this.listGoods.selectedIndex = e.itemIndex;
            this.listGoodsData.itemUpdated(this.listGoodsData.source[e.itemIndex]);
            this.listGoodsData.itemUpdated(this.listGoodsData.source[this.listGoodsItemIndexBefore]);
            this.listGoodsItemIndexBefore = e.itemIndex;
            this.setFreshInfo();
        };
        return CardStrengthenMain;
    }(zj.Dialog));
    zj.CardStrengthenMain = CardStrengthenMain;
    __reflect(CardStrengthenMain.prototype, "zj.CardStrengthenMain");
})(zj || (zj = {}));
//# sourceMappingURL=CardStrengthenMain.js.map