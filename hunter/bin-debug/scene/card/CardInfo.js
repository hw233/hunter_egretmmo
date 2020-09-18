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
    // created by hhh in 2018/11/7
    /************** 卡片界面 ****************/
    var CARD_TYPE;
    (function (CARD_TYPE) {
        CARD_TYPE[CARD_TYPE["UnInstall"] = 1] = "UnInstall";
        CARD_TYPE[CARD_TYPE["Host"] = 2] = "Host";
    })(CARD_TYPE = zj.CARD_TYPE || (zj.CARD_TYPE = {}));
    var CardInfo = (function (_super) {
        __extends(CardInfo, _super);
        function CardInfo() {
            var _this = _super.call(this) || this;
            _this.cardType = CARD_TYPE.UnInstall;
            _this.sortType = 1;
            _this.sortTypeHost = 1;
            _this.sortOpen = false;
            _this.curSel = 0;
            _this.lastSel = 0;
            _this.cardList = [];
            _this.cardCount = 0;
            _this.curSelHost = 0;
            _this.lastSelHost = 0;
            _this.cardListHost = [];
            _this.cardCountHost = 0;
            _this.hostShowType = 1;
            _this.listDataArr = new eui.ArrayCollection();
            _this.listDataArrHost = new eui.ArrayCollection();
            _this.listAttriData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/card/CardInfoSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        CardInfo.prototype.init = function () {
            this.labelAttriMainConst.text = zj.LANG("主属性：");
            this.labelRealConst.text = zj.LANG("稀有度：");
            this.labelStarConst.text = zj.LANG("星级：");
            this.labelLevelConst.text = zj.LANG("等级：");
            this.labelUserConst.text = zj.LANG("使用者：");
            this.groupSortWidth = this.groupSort.width;
            this.groupSortHeight = this.groupSort.height;
            this.groupSortX = this.groupSort.x;
            this.groupSortY = this.groupSort.y;
            this.groupSort.scaleY = 0.2;
            this.groupSort.y = this.groupSortY - 30;
            this.groupSort.visible = false;
            this.btnUnuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnuse, this);
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
            this.btnSelectedName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelectedName, this);
            this.btnShowUser.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShowUser, this);
            this.btnCardBulkSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardBulkSell, this);
            this.btnCardSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardSort, this);
            this.btnCardTypeSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardTypeSort, this);
            this.btnCardStarSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardStarSort, this);
            this.btnCardLevelSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardLevelSort, this);
            this.btnCardHunterSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardHunterSort, this);
            this.btnCardStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardStrengthen, this);
            this.btnCardUseStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardUseStrengthen, this);
            this.btnCardBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardBreak, this);
            this.btnCardUseBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardUseBreak, this);
            this.btnCardUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardUpStar, this);
            this.btnCardUseUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardUseUpStar, this);
            this.btnCardUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardUnlock, this);
            this.btnCardLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardLock, this);
            this.btnCardSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardSell, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
            this.listCardBagUnuse.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardBagChange, this);
            this.listCardBagUse.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardBagChange, this);
            this.sortType = zj.Tips.GetSaveTimeForCardSort(2);
            this.sortTypeHost = zj.Tips.GetSaveTimeForCardHostSort(1);
            this.setTypeState();
        };
        // 根据未安装/已安装来显示对应ui
        CardInfo.prototype.setTypeState = function () {
            this.btnUnuse.enabled = (this.cardType != CARD_TYPE.UnInstall);
            this.btnUse.enabled = (this.cardType != CARD_TYPE.Host);
            this.scroCardBagUnuse.visible = (this.cardType == CARD_TYPE.UnInstall);
            this.scroCardBagUse.visible = (this.cardType == CARD_TYPE.Host);
            if (this.hostShowType == 1) {
                this.btnSelectedName.visible = true;
                this.btnShowUser.visible = false;
            }
            else if (this.hostShowType == 2) {
                this.btnSelectedName.visible = false;
                this.btnShowUser.visible = true;
            }
            this.btnCardBulkSell.visible = (this.cardType == CARD_TYPE.UnInstall);
            this.btnSelectedName.visible = (this.cardType == CARD_TYPE.Host);
            this.btnShowUser.visible = (this.cardType == CARD_TYPE.Host);
            this.groupUnuseType.visible = (this.cardType == CARD_TYPE.UnInstall);
            this.groupUseType.visible = (this.cardType == CARD_TYPE.Host);
            this.btnCardHunterSort.visible = (this.cardType == CARD_TYPE.Host);
            if (this.cardType == CARD_TYPE.UnInstall) {
                this.imageYincangBoard.scaleY = 1.2;
                this.groupSort.setContentSize(this.groupSortWidth, this.groupSortHeight);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.imageYincangBoard.scaleY = 1.5;
                this.groupSort.setContentSize(this.groupSortWidth, this.groupSortHeight * 1.5);
            }
        };
        // 加载卡片列表
        CardInfo.prototype.loadCardList = function () {
            this.closeSortAni();
            this.curCard = null;
            if (this.cardType == CARD_TYPE.UnInstall) {
                if (zj.Game.PlayerCardSystem.getIsCardChange() == false) {
                    zj.PlayerCardSystem.RefreshNewCardIndex();
                }
                this.curSel = 0;
                this.lastSel = 0;
                this.cardList = this.sortFunc();
                this.cardCount = 0;
                for (var k in this.cardList) {
                    if (this.cardList[k] != null)
                        this.cardCount++;
                }
                this.imageNodeCard.visible = (this.cardCount == 0);
                this.groupRight.visible = (this.cardCount != 0);
                this.listCardBagUnuse.itemRenderer = zj.CardInfoPopItem;
                var collection = [];
                for (var i = 0; i < this.cardList.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[i], ani: i == 0 };
                }
                this.listDataArr.source = collection;
                this.listCardBagUnuse.dataProvider = this.listDataArr;
                this.listCardBagUnuse.selectedIndex = this.curSel;
                this.labelCardInfoNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCount, zj.CommonConfig.potapo_max_number);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.curSelHost = 0;
                this.lastSelHost = 0;
                this.cardListHost = this.sortFunc();
                this.cardCountHost = 0;
                for (var k in this.cardListHost) {
                    if (this.cardListHost[k] != null)
                        this.cardCountHost++;
                }
                this.imageNodeCard.visible = (this.cardCountHost == 0);
                this.groupRight.visible = (this.cardCountHost != 0);
                this.listCardBagUse.itemRenderer = zj.CardInfoPopItem;
                var collection = [];
                for (var i = 0; i < this.cardListHost.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[i], ani: i == 0 };
                }
                this.listDataArrHost.source = collection;
                this.listCardBagUse.dataProvider = this.listDataArrHost;
                this.listCardBagUse.selectedIndex = this.curSelHost;
                this.labelCardInfoNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCountHost, zj.CommonConfig.potapo_max_number);
            }
            this.setRightUI();
        };
        // 刷新卡片列表
        CardInfo.prototype.refreshCardList = function () {
            this.curCard = null;
            if (this.cardType == CARD_TYPE.UnInstall) {
                if (zj.Game.PlayerCardSystem.getIsCardChange() == false) {
                    zj.PlayerCardSystem.RefreshNewCardIndex();
                }
                if (this.cardList[0] == null || this.cardList[0].id == null)
                    return;
                var cardIndex = null;
                if (this.curSel < this.cardList.length)
                    cardIndex = this.cardList[this.curSel].index;
                this.curSel = 0;
                this.cardList = this.sortFunc();
                this.cardCount = 0;
                for (var k in this.cardList) {
                    if (this.cardList[k] != null)
                        this.cardCount++;
                }
                if (cardIndex != null) {
                    for (var k in this.cardList) {
                        var v = this.cardList[k];
                        if (v != null && v.index == cardIndex)
                            this.curSel = Number(k);
                    }
                }
                this.imageNodeCard.visible = (this.cardCount == 0);
                this.groupRight.visible = (this.cardCount != 0);
                if (this.cardCount == 0)
                    this.curSel = -1;
                this.listCardBagUnuse.itemRenderer = zj.CardInfoPopItem;
                var collection = [];
                for (var i = 0; i < this.cardList.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[i], ani: i == this.curSel };
                }
                this.listDataArr.source = collection;
                this.listCardBagUnuse.dataProvider = this.listDataArr;
                this.listCardBagUnuse.selectedIndex = this.curSel;
                this.lastSel = this.curSel;
                this.labelCardInfoNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCount, zj.CommonConfig.potapo_max_number);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.cardListHost[0] == null || this.cardListHost[0].id == null)
                    return;
                var cardIndex = null;
                if (this.curSel < this.cardList.length)
                    cardIndex = this.cardListHost[this.curSelHost].index;
                this.curSelHost = 0;
                this.cardListHost = this.sortFunc();
                this.cardCountHost = 0;
                for (var k in this.cardListHost) {
                    if (this.cardListHost[k] != null)
                        this.cardCountHost++;
                }
                if (cardIndex != null) {
                    for (var k in this.cardListHost) {
                        var v = this.cardListHost[k];
                        if (v != null && v.index == cardIndex)
                            this.curSelHost = Number(k);
                    }
                }
                this.imageNodeCard.visible = (this.cardCountHost == 0);
                this.groupRight.visible = (this.cardCountHost != 0);
                if (this.cardCountHost == 0)
                    this.curSelHost = -1;
                this.listCardBagUse.itemRenderer = zj.CardInfoPopItem;
                var collection = [];
                for (var i = 0; i < this.cardListHost.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[i], ani: i == this.curSelHost };
                }
                this.listDataArrHost.source = collection;
                this.listCardBagUse.dataProvider = this.listDataArrHost;
                this.listCardBagUse.selectedIndex = this.curSelHost;
                this.lastSelHost = this.curSelHost;
                this.labelCardInfoNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCountHost, zj.CommonConfig.potapo_max_number);
            }
            this.scrollList();
            this.setRightUI();
        };
        CardInfo.prototype.scrollList = function () {
            var item = new zj.CardInfoPopItem();
            if (this.cardType == CARD_TYPE.UnInstall) {
                var extraHeight = 0;
                var index = this.lastSel;
                var row = Math.floor(index / 4);
                var maxRow = Math.floor(this.listDataArr.length / 4);
                if (maxRow == row)
                    extraHeight = 50;
                if (maxRow - row <= 3) {
                    row = maxRow - 3;
                }
                var gap = this.listCardBagUnuse.layout.verticalGap;
                var scrollHeight = (item.height + gap) * row + extraHeight;
                egret.Tween.get(this.listCardBagUnuse)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                var extraHeight = 0;
                var index = this.lastSelHost;
                var row = Math.floor(index / 4);
                var maxRow = Math.floor(this.listDataArrHost.length / 4);
                if (maxRow == row)
                    extraHeight = 50;
                if (maxRow - row <= 3) {
                    row = maxRow - 3;
                }
                var gap = this.listCardBagUse.layout.verticalGap;
                var scrollHeight = (item.height + gap) * row + extraHeight;
                egret.Tween.get(this.listCardBagUse)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
        };
        // 卡片排序
        CardInfo.prototype.sortFunc = function () {
            if (this.cardType == CARD_TYPE.UnInstall) {
                if (this.sortType == 1)
                    return zj.PlayerCardSystem.GetAllCardNoHostSortByType();
                else if (this.sortType == 2)
                    return zj.PlayerCardSystem.GetAllCardNoHostSortByStar();
                else if (this.sortType == 3)
                    return zj.PlayerCardSystem.GetAllCardNoHostSortByLevel();
                else
                    return [];
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.sortTypeHost == 1)
                    return zj.PlayerCardSystem.GetAllCardHasHostSortByType();
                else if (this.sortTypeHost == 2)
                    return zj.PlayerCardSystem.GetAllCardHasHostSortByStar();
                else if (this.sortTypeHost == 3)
                    return zj.PlayerCardSystem.GetAllCardHasHostSortByLevel();
                else if (this.sortTypeHost == 4)
                    return zj.PlayerCardSystem.GetAllCardHasHostSortByHost();
                else
                    return [];
            }
        };
        // 点击卡片列表item改变选中框位置
        CardInfo.prototype.onCardBagChange = function () {
            this.closeSortAni();
            if (this.cardType == CARD_TYPE.UnInstall) {
                this.curSel = this.listCardBagUnuse.selectedIndex;
                this.listDataArr.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[this.lastSel], "ani": false }, this.lastSel);
                this.listDataArr.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[this.curSel], "ani": true }, this.curSel);
                this.lastSel = this.curSel;
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.curSelHost = this.listCardBagUse.selectedIndex;
                this.listDataArrHost.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[this.lastSelHost], "ani": false }, this.lastSelHost);
                this.listDataArrHost.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[this.curSelHost], "ani": true }, this.curSelHost);
                this.lastSelHost = this.curSelHost;
            }
            this.setRightUI();
        };
        // 设置选中的卡片右侧显示卡片内容
        CardInfo.prototype.setRightUI = function () {
            if (this.cardType == CARD_TYPE.UnInstall) {
                this.curCard = this.cardList[this.curSel];
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.curCard = this.cardListHost[this.curSelHost];
            }
            if (this.curCard == null)
                return;
            this.curTbl = zj.TableItemPotato.Item(this.curCard.id);
            var _a = zj.PlayerCardSystem.GetItemFrame(this.curCard.id), _ = _a[0], bigFramePic = _a[1], __ = _a[2];
            if (this.cardType == CARD_TYPE.UnInstall) {
                if (this.curCard.star == zj.CommonConfig.card_max_star) {
                    this.btnCardUpStar.visible = false;
                    this.btnCardBreak.visible = true;
                }
                else {
                    this.btnCardUpStar.visible = true;
                    this.btnCardBreak.visible = false;
                }
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.curCard.star == zj.CommonConfig.card_max_star) {
                    this.btnCardUseBreak.visible = true;
                    this.btnCardUseUpStar.visible = false;
                }
                else {
                    this.btnCardUseBreak.visible = false;
                    this.btnCardUseUpStar.visible = true;
                }
            }
            this.labelCardNum.text = this.curTbl.num;
            this.labelCardName.text = this.curTbl.name;
            this.labelCardDetails.text = this.curTbl.des;
            this.imageCard.source = zj.cachekey(this.curTbl.paths, this);
            this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.imageFrame.source = zj.cachekey(bigFramePic, this);
            this.btnCardLock.visible = this.curCard.is_lock;
            this.btnCardUnlock.visible = !this.curCard.is_lock;
            if (this.curCard.break_level <= 0) {
                this.labelLevel.text = this.curCard.level + "/" + zj.CommonConfig.card_star_max_level[this.curCard.star - 1];
            }
            else {
                this.labelLevel.text = this.curCard.level + "/" + (zj.CommonConfig.card_star_max_level[5] + zj.CommonConfig.card_break_add_max_level * this.curCard.break_level);
            }
            var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(this.curCard.index).cHostId;
            if (cHostId != null && this.curCard.pos != 0) {
                this.labelUseName.text = zj.PlayerHunterSystem.Table(cHostId).general_name;
                this.labelUseName.size = 18;
            }
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard);
            if (addStr.length == 5) {
                zj.Helper.SetStar(this.groupStar, this.curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            }
            else {
                zj.Helper.SetStar(this.groupStar, this.curCard.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }
            this.imageGradeLevel.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);
            this.setAttriUI();
        };
        // 设置选中的卡片右侧显示属性内容
        CardInfo.prototype.setAttriUI = function () {
            var _a = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curCard.star, this.curCard.level), baseStr = _a[0], _ = _a[1];
            this.labelAttriMain.text = baseStr[0];
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard);
            this.listAttriData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.cardInfo = this.curCard;
                itemData.width = this.scroAttri.width;
                itemData.addStrlength = addStr.length;
                itemData.type = 0;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.itemRenderer = zj.CardAttriItem;
        };
        // 刷新当前选中的卡片
        CardInfo.prototype.refreshCurCard = function () {
            if (this.cardType == CARD_TYPE.UnInstall) {
                this.cardList = this.sortFunc();
                this.cardCount = this.cardList.length;
                this.setRightUI();
                this.listCardBagUnuse.selectedIndex = this.curSel;
                this.listDataArr.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[this.curSel], "ani": true }, this.curSel);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.cardListHost = this.sortFunc();
                this.cardCountHost = this.cardListHost.length;
                this.setRightUI();
                this.listCardBagUse.selectedIndex = this.curSelHost;
                this.listDataArrHost.replaceItemAt({ cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[this.curSelHost], "ani": true }, this.curSelHost);
            }
        };
        CardInfo.prototype.onBtnUnuse = function () {
            this.cardType = CARD_TYPE.UnInstall;
            this.closeSortAni();
            this.groupSort.visible = false;
            this.setTypeState();
            this.loadCardList();
        };
        CardInfo.prototype.onBtnUse = function () {
            this.cardType = CARD_TYPE.Host;
            this.closeSortAni();
            this.groupSort.visible = false;
            this.setTypeState();
            this.loadCardList();
        };
        CardInfo.prototype.onBtnSelectedName = function () {
            this.closeSortAni();
            this.hostShowType = (this.hostShowType == 1 ? 2 : 1);
            this.btnSelectedName.visible = false;
            this.btnShowUser.visible = true;
            this.refreshCardList();
        };
        CardInfo.prototype.onBtnShowUser = function () {
            this.closeSortAni();
            this.hostShowType = (this.hostShowType == 1 ? 2 : 1);
            this.btnSelectedName.visible = true;
            this.btnShowUser.visible = false;
            this.refreshCardList();
        };
        CardInfo.prototype.onBtnCardBulkSell = function () {
            var _this = this;
            this.closeSortAni();
            zj.loadUI(zj.CardSellPopDialog)
                .then(function (dialog) {
                dialog.loadSellPop(_this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        CardInfo.prototype.sortAniOpen = function () {
            var _this = this;
            egret.Tween.get(this.groupSort)
                .call(function () { _this.groupSort.visible = true; })
                .to({ x: this.groupSortX, y: this.groupSortY }, 45, egret.Ease.backOut)
                .to({ scaleY: 1 }, 500, egret.Ease.backOut);
        };
        CardInfo.prototype.sortAniClose = function () {
            var _this = this;
            egret.Tween.get(this.groupSort)
                .to({ x: this.groupSortX, y: this.groupSortY }, 300, egret.Ease.backIn)
                .to({ scaleY: 0.2 }, 400, egret.Ease.backIn)
                .call(function () { _this.groupSort.visible = false; });
        };
        CardInfo.prototype.onBtnCardSort = function () {
            if (this.sortOpen == true) {
                this.sortAniClose();
            }
            else {
                this.sortAniOpen();
            }
            this.sortOpen = !this.sortOpen;
        };
        CardInfo.prototype.onBtnCardTypeSort = function () {
            this.sortType = 1;
            this.sortTypeHost = 1;
            zj.Tips.SetSaveTimeForCardSort(1);
            zj.Tips.SetSaveTimeForCardHostSort(1);
            this.refreshCardList();
            this.onBtnCardSort();
        };
        CardInfo.prototype.onBtnCardStarSort = function () {
            this.sortType = 2;
            this.sortTypeHost = 2;
            zj.Tips.SetSaveTimeForCardSort(2);
            zj.Tips.SetSaveTimeForCardHostSort(2);
            this.refreshCardList();
            this.onBtnCardSort();
        };
        CardInfo.prototype.onBtnCardLevelSort = function () {
            this.sortType = 3;
            this.sortTypeHost = 3;
            zj.Tips.SetSaveTimeForCardSort(3);
            zj.Tips.SetSaveTimeForCardHostSort(3);
            this.refreshCardList();
            this.onBtnCardSort();
        };
        CardInfo.prototype.onBtnCardHunterSort = function () {
            this.sortTypeHost = 4;
            zj.Tips.SetSaveTimeForCardHostSort(4);
            this.refreshCardList();
            this.onBtnCardSort();
        };
        CardInfo.prototype.onBtnCardStrengthen = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPLEVEL, true)) {
                zj.loadUI(zj.CardStrengthenMain)
                    .then(function (dialog) {
                    dialog.loadInfo(_this.curCard, function (isRefresh, isBreak) {
                        if (isRefresh) {
                            _this.refreshCardList();
                        }
                        if (isBreak) {
                            var timer = egret.setTimeout(function () { _this.onBtnCardBreak(); }, _this, 1000);
                            // this.onBtnCardBreak();
                        }
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.onBtnCardUseStrengthen = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPLEVEL, true)) {
                zj.loadUI(zj.CardStrengthenMain)
                    .then(function (dialog) {
                    dialog.loadInfo(_this.curCard, function (isRefresh, isBreak) {
                        if (isRefresh) {
                            _this.refreshCardList();
                        }
                        if (isBreak) {
                            var timer = egret.setTimeout(function () { _this.onBtnCardBreak(); }, _this, 1000);
                            // this.onBtnCardBreak();
                        }
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.onBtnCardBreak = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null) {
                zj.loadUI(zj.CardBreakMainDialog)
                    .then(function (dialog) {
                    dialog.loadInfo(_this.curCard, function () {
                        _this.refreshCardList();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.onBtnCardUseBreak = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null) {
                zj.loadUI(zj.CardBreakMainDialog)
                    .then(function (dialog) {
                    dialog.loadInfo(_this.curCard, function () {
                        _this.refreshCardList();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.onBtnCardUpStar = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPSTAR, true)) {
                zj.loadUI(zj.CardUpStarNewDialog)
                    .then(function (dialog) {
                    dialog.setInfo(_this.curCard, function () {
                        _this.refreshCardList();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.onBtnCardUseUpStar = function () {
            var _this = this;
            this.closeSortAni();
            if (this.curCard != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO_UPSTAR, true)) {
                zj.loadUI(zj.CardUpStarNewDialog)
                    .then(function (dialog) {
                    dialog.setInfo(_this.curCard, function () {
                        _this.refreshCardList();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        CardInfo.prototype.potatoLockReq = function (lock) {
            var _this = this;
            var index = this.curCard.index;
            var generalId = 0;
            var potatoPos = 0;
            var cHostId = zj.Game.PlayerCardSystem.getCardToHunterInfo(this.curCard.index).cHostId;
            if (cHostId != null && this.curCard.pos != 0) {
                generalId = cHostId;
                index = 0;
                potatoPos = this.curCard.pos;
            }
            zj.Game.PlayerCardSystem.potatoLock(index, generalId, potatoPos, lock)
                .then(function (value) {
                _this.curCard = zj.PlayerCardSystem.RefreshCard(_this.curCard);
                _this.refreshCurCard();
                if (_this.curCard.is_lock)
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_lock_tips);
                else
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter.card_unlock_tips);
                _this.btnCardLock.visible = _this.curCard.is_lock;
                _this.btnCardUnlock.visible = !_this.curCard.is_lock;
            })
                .catch(function (reason) {
            });
        };
        CardInfo.prototype.onBtnCardLock = function () {
            this.closeSortAni();
            this.potatoLockReq(false);
        };
        CardInfo.prototype.onBtnCardUnlock = function () {
            this.closeSortAni();
            this.potatoLockReq(true);
        };
        CardInfo.prototype.onBtnCardSell = function () {
            var _this = this;
            this.closeSortAni();
            var price = this.curTbl.price;
            for (var i = 0; i < this.curCard.level - 1; i++) {
                price = price + zj.CommonConfig.potato_uplevel_comsume_money(this.curTbl.quality, i) / 2;
            }
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.setInfo(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.sell_tips, price));
                dialog.setCB(function () {
                    zj.Game.PlayerCardSystem.cardSell([_this.curCard.index])
                        .then(function (value) {
                        if (_this.curSel != 0)
                            _this.curSel = _this.curSel - 1;
                        _this.refreshCardList();
                    })
                        .catch(function (reason) {
                    });
                });
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        CardInfo.prototype.onBtnHelp = function () {
            this.closeSortAni();
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.loadBySmallType(201);
            });
        };
        CardInfo.prototype.closeSortAni = function () {
            if (this.sortOpen) {
                this.sortAniClose();
                this.sortOpen = false;
            }
        };
        return CardInfo;
    }(zj.CardBase));
    zj.CardInfo = CardInfo;
    __reflect(CardInfo.prototype, "zj.CardInfo");
})(zj || (zj = {}));
//# sourceMappingURL=CardInfo.js.map