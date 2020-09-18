namespace zj {
    // created by hhh in 2018/11/7

    /************** 卡片界面 ****************/

    export enum CARD_TYPE {
        UnInstall = 1,
        Host = 2,
    }

    export class CardInfo extends CardBase {
        public cardType: CARD_TYPE = CARD_TYPE.UnInstall;

        private groupRight: eui.Group;
        private groupUnuseType: eui.Group;
        private groupUseType: eui.Group;
        private groupSort: eui.Group;
        private groupStar: eui.Group;

        private scroCardBagUse: eui.Scroller;
        private scroCardBagUnuse: eui.Scroller;
        private scroAttri: eui.Scroller;
        private listAttri: eui.List;
        private listCardBagUse: eui.List;
        private listCardBagUnuse: eui.List;

        private btnUse: eui.Button;
        private btnUnuse: eui.Button;
        private btnCardBulkSell: eui.Button;
        private btnSelectedName: eui.Button;
        private btnShowUser: eui.Button;
        private btnCardSort: eui.Button;
        private btnCardTypeSort: eui.Button;
        private btnCardStarSort: eui.Button;
        private btnCardLevelSort: eui.Button;
        private btnCardHunterSort: eui.Button;
        private btnCardStrengthen: eui.Button;
        private btnCardUseStrengthen: eui.Button;
        private btnCardBreak: eui.Button;
        private btnCardUseBreak: eui.Button;
        private btnCardUpStar: eui.Button;
        private btnCardUseUpStar: eui.Button;
        private btnCardUnlock: eui.Button;
        private btnCardLock: eui.Button;
        private btnCardSell: eui.Button;
        private btnHelp: eui.Button;

        private imageYincangBoard: eui.Image;
        private imageNodeCard: eui.Image;
        private imageCard: eui.Image;
        private imageCardType: eui.Image;
        private imageFrame: eui.Image;
        private imageGradeLevel: eui.Image;

        private labelCardName: eui.Label;
        private labelCardNum: eui.Label;
        private labelCardDetails: eui.Label;
        private labelLevel: eui.Label;
        private labelAttriMainConst: eui.Label;
        private labelAttriMain: eui.Label;
        private labelRealConst: eui.Label;
        private labelStarConst: eui.Label;
        private labelLevelConst: eui.Label;
        private labelUserConst: eui.Label;
        private labelUseName: eui.Label;
        private labelCardInfoNum: eui.Label;

        private groupSortWidth: number;
        private groupSortHeight: number;
        private groupSortX: number;
        private groupSortY: number;
        private sortType: number = 1;
        private sortTypeHost: number = 1;
        private sortOpen: boolean = false;

        private curSel: number = 0;
        private lastSel: number = 0;
        private cardList: Array<message.PotatoInfo> = [];
        private cardCount: number = 0;

        private curSelHost: number = 0;
        private lastSelHost: number = 0;
        private cardListHost = [];
        private cardCountHost: number = 0;

        private hostShowType: number = 1;

        private curCard: message.PotatoInfo;
        private curTbl: TableItemPotato;

        private listDataArr: eui.ArrayCollection = new eui.ArrayCollection();
        private listDataArrHost: eui.ArrayCollection = new eui.ArrayCollection();

        public constructor() {
            super();

            this.skinName = "resource/skins/card/CardInfoSkin.exml";

            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;

            this.init();
        }

        private init() {
            this.labelAttriMainConst.text = LANG("主属性：");
            this.labelRealConst.text = LANG("稀有度：");
            this.labelStarConst.text = LANG("星级：");
            this.labelLevelConst.text = LANG("等级：");
            this.labelUserConst.text = LANG("使用者：");

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

            this.sortType = Tips.GetSaveTimeForCardSort(2);
            this.sortTypeHost = Tips.GetSaveTimeForCardHostSort(1);

            this.setTypeState();
        }

        // 根据未安装/已安装来显示对应ui
        private setTypeState() {
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
        }

        // 加载卡片列表
        public loadCardList() {
            this.closeSortAni();

            this.curCard = null;

            if (this.cardType == CARD_TYPE.UnInstall) {
                if (Game.PlayerCardSystem.getIsCardChange() == false) {
                    PlayerCardSystem.RefreshNewCardIndex();
                }

                this.curSel = 0;
                this.lastSel = 0;
                this.cardList = this.sortFunc();
                this.cardCount = 0;
                for (let k in this.cardList) {
                    if (this.cardList[k] != null)
                        this.cardCount++;
                }

                this.imageNodeCard.visible = (this.cardCount == 0);
                this.groupRight.visible = (this.cardCount != 0);

                this.listCardBagUnuse.itemRenderer = CardInfoPopItem;
                let collection = [];
                for (let i = 0; i < this.cardList.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[i], ani: i == 0 };
                }
                this.listDataArr.source = collection;
                this.listCardBagUnuse.dataProvider = this.listDataArr;
                this.listCardBagUnuse.selectedIndex = this.curSel;

                this.labelCardInfoNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCount, CommonConfig.potapo_max_number);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.curSelHost = 0;
                this.lastSelHost = 0;
                this.cardListHost = this.sortFunc();
                this.cardCountHost = 0;
                for (let k in this.cardListHost) {
                    if (this.cardListHost[k] != null)
                        this.cardCountHost++;
                }

                this.imageNodeCard.visible = (this.cardCountHost == 0);
                this.groupRight.visible = (this.cardCountHost != 0);

                this.listCardBagUse.itemRenderer = CardInfoPopItem;
                let collection = [];
                for (let i = 0; i < this.cardListHost.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[i], ani: i == 0 };
                }
                this.listDataArrHost.source = collection;
                this.listCardBagUse.dataProvider = this.listDataArrHost;
                this.listCardBagUse.selectedIndex = this.curSelHost;

                this.labelCardInfoNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCountHost, CommonConfig.potapo_max_number);
            }

            this.setRightUI();
        }

        // 刷新卡片列表
        public refreshCardList() {
            this.curCard = null;

            if (this.cardType == CARD_TYPE.UnInstall) {
                if (Game.PlayerCardSystem.getIsCardChange() == false) {
                    PlayerCardSystem.RefreshNewCardIndex();
                }

                if (this.cardList[0] == null || this.cardList[0].id == null)
                    return;
                let cardIndex = null;
                if (this.curSel < this.cardList.length)
                    cardIndex = this.cardList[this.curSel].index;
                this.curSel = 0;
                this.cardList = this.sortFunc();
                this.cardCount = 0;
                for (let k in this.cardList) {
                    if (this.cardList[k] != null)
                        this.cardCount++;
                }

                if (cardIndex != null) {
                    for (let k in this.cardList) {
                        let v = this.cardList[k];
                        if (v != null && v.index == cardIndex)
                            this.curSel = Number(k);
                    }
                }

                this.imageNodeCard.visible = (this.cardCount == 0);
                this.groupRight.visible = (this.cardCount != 0);

                if (this.cardCount == 0)
                    this.curSel = -1;

                this.listCardBagUnuse.itemRenderer = CardInfoPopItem;
                let collection = [];
                for (let i = 0; i < this.cardList.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardList[i], ani: i == this.curSel };
                }
                this.listDataArr.source = collection;
                this.listCardBagUnuse.dataProvider = this.listDataArr;
                this.listCardBagUnuse.selectedIndex = this.curSel;
                this.lastSel = this.curSel;

                this.labelCardInfoNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCount, CommonConfig.potapo_max_number);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.cardListHost[0] == null || this.cardListHost[0].id == null)
                    return;

                let cardIndex = null;
                if (this.curSel < this.cardList.length)
                    cardIndex = this.cardListHost[this.curSelHost].index;
                this.curSelHost = 0;
                this.cardListHost = this.sortFunc();
                this.cardCountHost = 0;
                for (let k in this.cardListHost) {
                    if (this.cardListHost[k] != null)
                        this.cardCountHost++;
                }

                if (cardIndex != null) {
                    for (let k in this.cardListHost) {
                        let v = this.cardListHost[k];
                        if (v != null && v.index == cardIndex)
                            this.curSelHost = Number(k);
                    }
                }

                this.imageNodeCard.visible = (this.cardCountHost == 0);
                this.groupRight.visible = (this.cardCountHost != 0);

                if (this.cardCountHost == 0)
                    this.curSelHost = -1;

                this.listCardBagUse.itemRenderer = CardInfoPopItem;
                let collection = [];
                for (let i = 0; i < this.cardListHost.length; i++) {
                    collection[i] = { cardType: this.cardType, hostShowType: this.hostShowType, cardInfo: this.cardListHost[i], ani: i == this.curSelHost };
                }
                this.listDataArrHost.source = collection;
                this.listCardBagUse.dataProvider = this.listDataArrHost;
                this.listCardBagUse.selectedIndex = this.curSelHost;
                this.lastSelHost = this.curSelHost;

                this.labelCardInfoNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_info_num, this.cardCountHost, CommonConfig.potapo_max_number);
            }

            this.scrollList();
            this.setRightUI();
        }

        private scrollList() {
            let item = new CardInfoPopItem();
            if (this.cardType == CARD_TYPE.UnInstall) {
                let extraHeight = 0;
                let index = this.lastSel;
                let row = Math.floor(index / 4);
                let maxRow = Math.floor(this.listDataArr.length / 4);
                if (maxRow == row) extraHeight = 50;
                if (maxRow - row <= 3) {
                    row = maxRow - 3;
                }
                let gap = (this.listCardBagUnuse.layout as eui.TileLayout).verticalGap;
                let scrollHeight = (item.height + gap) * row + extraHeight;

                egret.Tween.get(this.listCardBagUnuse)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
            else if (this.cardType == CARD_TYPE.Host) {
                let extraHeight = 0;
                let index = this.lastSelHost;
                let row = Math.floor(index / 4);
                let maxRow = Math.floor(this.listDataArrHost.length / 4);
                if (maxRow == row) extraHeight = 50;
                if (maxRow - row <= 3) {
                    row = maxRow - 3;
                }
                let gap = (this.listCardBagUse.layout as eui.TileLayout).verticalGap;
                let scrollHeight = (item.height + gap) * row + extraHeight;

                egret.Tween.get(this.listCardBagUse)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
        }

        // 卡片排序
        private sortFunc() {
            if (this.cardType == CARD_TYPE.UnInstall) {
                if (this.sortType == 1)
                    return PlayerCardSystem.GetAllCardNoHostSortByType();
                else if (this.sortType == 2)
                    return PlayerCardSystem.GetAllCardNoHostSortByStar();
                else if (this.sortType == 3)
                    return PlayerCardSystem.GetAllCardNoHostSortByLevel();
                else
                    return [];
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.sortTypeHost == 1)
                    return PlayerCardSystem.GetAllCardHasHostSortByType();
                else if (this.sortTypeHost == 2)
                    return PlayerCardSystem.GetAllCardHasHostSortByStar();
                else if (this.sortTypeHost == 3)
                    return PlayerCardSystem.GetAllCardHasHostSortByLevel();
                else if (this.sortTypeHost == 4)
                    return PlayerCardSystem.GetAllCardHasHostSortByHost();
                else
                    return [];
            }
        }

        // 点击卡片列表item改变选中框位置
        private onCardBagChange() {
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
        }

        // 设置选中的卡片右侧显示卡片内容
        private setRightUI() {
            if (this.cardType == CARD_TYPE.UnInstall) {
                this.curCard = this.cardList[this.curSel];
            }
            else if (this.cardType == CARD_TYPE.Host) {
                this.curCard = this.cardListHost[this.curSelHost];
            }

            if (this.curCard == null)
                return;

            this.curTbl = TableItemPotato.Item(this.curCard.id);

            let [_, bigFramePic, __] = PlayerCardSystem.GetItemFrame(this.curCard.id);

            if (this.cardType == CARD_TYPE.UnInstall) {
                if (this.curCard.star == CommonConfig.card_max_star) {
                    this.btnCardUpStar.visible = false;
                    this.btnCardBreak.visible = true;
                }
                else {
                    this.btnCardUpStar.visible = true;
                    this.btnCardBreak.visible = false;
                }
            }
            else if (this.cardType == CARD_TYPE.Host) {
                if (this.curCard.star == CommonConfig.card_max_star) {
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

            this.imageCard.source = cachekey(this.curTbl.paths, this);
            this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.imageFrame.source = cachekey(bigFramePic, this);

            this.btnCardLock.visible = this.curCard.is_lock;
            this.btnCardUnlock.visible = !this.curCard.is_lock;

            if (this.curCard.break_level <= 0) {
                this.labelLevel.text = this.curCard.level + "/" + CommonConfig.card_star_max_level[this.curCard.star - 1];
            }
            else {
                this.labelLevel.text = this.curCard.level + "/" + (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.curCard.break_level);
            }

            let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(this.curCard.index).cHostId;
            if (cHostId != null && this.curCard.pos != 0) {
                this.labelUseName.text = PlayerHunterSystem.Table(cHostId).general_name;
                this.labelUseName.size = 18;
            }

            let addStr = PlayerCardSystem.GetAddStr(this.curCard);
            if (addStr.length == 5) {
                Helper.SetStar(this.groupStar, this.curCard.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            }
            else {
                Helper.SetStar(this.groupStar, this.curCard.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }

            this.imageGradeLevel.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);

            this.setAttriUI();
        }

        private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();
        // 设置选中的卡片右侧显示属性内容
        private setAttriUI() {
            let [baseStr, _] = PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curCard.star, this.curCard.level);
            this.labelAttriMain.text = baseStr[0];
            let addStr = PlayerCardSystem.GetAddStr(this.curCard);

            this.listAttriData.removeAll();
            for (let i = 0; i < addStr.length; i++) {
                let itemData = new CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.cardInfo = this.curCard;
                itemData.width = this.scroAttri.width;
                itemData.addStrlength = addStr.length;
                itemData.type = 0;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.itemRenderer = CardAttriItem;
        }

        // 刷新当前选中的卡片
        public refreshCurCard() {
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
        }

        private onBtnUnuse() {
            this.cardType = CARD_TYPE.UnInstall;

            this.closeSortAni();

            this.groupSort.visible = false;

            this.setTypeState();
            this.loadCardList();
        }

        private onBtnUse() {
            this.cardType = CARD_TYPE.Host;

            this.closeSortAni();

            this.groupSort.visible = false;

            this.setTypeState();
            this.loadCardList();
        }

        private onBtnSelectedName() {
            this.closeSortAni();

            this.hostShowType = (this.hostShowType == 1 ? 2 : 1);
            this.btnSelectedName.visible = false;
            this.btnShowUser.visible = true;

            this.refreshCardList();
        }

        private onBtnShowUser() {
            this.closeSortAni();

            this.hostShowType = (this.hostShowType == 1 ? 2 : 1);
            this.btnSelectedName.visible = true;
            this.btnShowUser.visible = false;

            this.refreshCardList();
        }

        private onBtnCardBulkSell() {
            this.closeSortAni();

            loadUI(CardSellPopDialog)
                .then((dialog: CardSellPopDialog) => {
                    dialog.loadSellPop(this);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private sortAniOpen() {
            egret.Tween.get(this.groupSort)
                .call(() => { this.groupSort.visible = true; })
                .to({ x: this.groupSortX, y: this.groupSortY }, 45, egret.Ease.backOut)
                .to({ scaleY: 1 }, 500, egret.Ease.backOut);
        }

        private sortAniClose() {
            egret.Tween.get(this.groupSort)
                .to({ x: this.groupSortX, y: this.groupSortY }, 300, egret.Ease.backIn)
                .to({ scaleY: 0.2 }, 400, egret.Ease.backIn)
                .call(() => { this.groupSort.visible = false; });
        }

        private onBtnCardSort() {
            if (this.sortOpen == true) {
                this.sortAniClose();
            }
            else {
                this.sortAniOpen();
            }

            this.sortOpen = !this.sortOpen;
        }

        private onBtnCardTypeSort() {
            this.sortType = 1;
            this.sortTypeHost = 1;

            Tips.SetSaveTimeForCardSort(1);
            Tips.SetSaveTimeForCardHostSort(1);

            this.refreshCardList();
            this.onBtnCardSort();
        }

        private onBtnCardStarSort() {
            this.sortType = 2;
            this.sortTypeHost = 2;

            Tips.SetSaveTimeForCardSort(2);
            Tips.SetSaveTimeForCardHostSort(2);

            this.refreshCardList();
            this.onBtnCardSort();
        }

        private onBtnCardLevelSort() {
            this.sortType = 3;
            this.sortTypeHost = 3;

            Tips.SetSaveTimeForCardSort(3);
            Tips.SetSaveTimeForCardHostSort(3);

            this.refreshCardList();
            this.onBtnCardSort();
        }

        private onBtnCardHunterSort() {
            this.sortTypeHost = 4;

            Tips.SetSaveTimeForCardHostSort(4);

            this.refreshCardList();
            this.onBtnCardSort();
        }

        private onBtnCardStrengthen() {
            this.closeSortAni();

            if (this.curCard != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPLEVEL, true)) {
                loadUI(CardStrengthenMain)
                    .then((dialog: CardStrengthenMain) => {
                        dialog.loadInfo(this.curCard, (isRefresh: boolean, isBreak: boolean) => {
                            if (isRefresh) {
                                this.refreshCardList();
                            }

                            if (isBreak) {
                                let timer = egret.setTimeout(() => { this.onBtnCardBreak() }, this, 1000);
                                // this.onBtnCardBreak();
                            }
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private onBtnCardUseStrengthen() {
            this.closeSortAni();

            if (this.curCard != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPLEVEL, true)) {
                loadUI(CardStrengthenMain)
                    .then((dialog: CardStrengthenMain) => {
                        dialog.loadInfo(this.curCard, (isRefresh: boolean, isBreak: boolean) => {
                            if (isRefresh) {
                                this.refreshCardList();
                            }

                            if (isBreak) {
                                let timer = egret.setTimeout(() => { this.onBtnCardBreak() }, this, 1000);
                                // this.onBtnCardBreak();
                            }
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        public onBtnCardBreak() {
            this.closeSortAni();

            if (this.curCard != null) {
                loadUI(CardBreakMainDialog)
                    .then((dialog: CardBreakMainDialog) => {
                        dialog.loadInfo(this.curCard, () => {
                            this.refreshCardList();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private onBtnCardUseBreak() {
            this.closeSortAni();

            if (this.curCard != null) {
                loadUI(CardBreakMainDialog)
                    .then((dialog: CardBreakMainDialog) => {
                        dialog.loadInfo(this.curCard, () => {
                            this.refreshCardList();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        public onBtnCardUpStar() {
            this.closeSortAni();

            if (this.curCard != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPSTAR, true)) {
                loadUI(CardUpStarNewDialog)
                    .then((dialog: CardUpStarNewDialog) => {
                        dialog.setInfo(this.curCard, () => {
                            this.refreshCardList();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private onBtnCardUseUpStar() {
            this.closeSortAni();

            if (this.curCard != null && PlayerMissionSystem.FunOpenTo(FUNC.POTATO_UPSTAR, true)) {
                loadUI(CardUpStarNewDialog)
                    .then((dialog: CardUpStarNewDialog) => {
                        dialog.setInfo(this.curCard, () => {
                            this.refreshCardList();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private potatoLockReq(lock: boolean) {
            let index = this.curCard.index;
            let generalId = 0;
            let potatoPos = 0;

            let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(this.curCard.index).cHostId;
            if (cHostId != null && this.curCard.pos != 0) {
                generalId = cHostId;
                index = 0;
                potatoPos = this.curCard.pos;
            }

            Game.PlayerCardSystem.potatoLock(index, generalId, potatoPos, lock)
                .then((value: {}) => {
                    this.curCard = PlayerCardSystem.RefreshCard(this.curCard);
                    this.refreshCurCard();
                    if (this.curCard.is_lock)
                        toast(TextsConfig.TextsConfig_Hunter.card_lock_tips);
                    else
                        toast(TextsConfig.TextsConfig_Hunter.card_unlock_tips);

                    this.btnCardLock.visible = this.curCard.is_lock;
                    this.btnCardUnlock.visible = !this.curCard.is_lock;
                })
                .catch((reason) => {
                })
        }

        private onBtnCardLock() {
            this.closeSortAni();

            this.potatoLockReq(false);
        }

        private onBtnCardUnlock() {
            this.closeSortAni();

            this.potatoLockReq(true);
        }

        private onBtnCardSell() {
            this.closeSortAni();

            let price = this.curTbl.price;
            for (let i = 0; i < this.curCard.level - 1; i++) {
                price = price + CommonConfig.potato_uplevel_comsume_money(this.curTbl.quality, i) / 2;
            }

            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.sell_tips, price));
                    dialog.setCB(() => {
                        Game.PlayerCardSystem.cardSell([this.curCard.index])
                            .then((value: {}) => {
                                if (this.curSel != 0)
                                    this.curSel = this.curSel - 1;

                                this.refreshCardList();
                            })
                            .catch((reason) => {
                            })
                    });
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnHelp() {
            this.closeSortAni();

            loadUI(HelpDialog)
                .then((dialog: HelpDialog) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                    dialog.loadBySmallType(201);
                });
        }

        private closeSortAni() {
            if (this.sortOpen) {
                this.sortAniClose();
                this.sortOpen = false;
            }
        }
    }

}