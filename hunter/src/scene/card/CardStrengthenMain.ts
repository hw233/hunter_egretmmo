namespace zj {
    /**
         * @class 卡片强化
         * 
         * @author Lian Lei
         * 
         * @date 2018.11.26
     */

    export class CardStrengthenMain extends Dialog {

        private groupTeach: eui.Group;
        private labelGoldNum: eui.Label;
        private groupStrengthen: eui.Group;
        private imgFrame: eui.Image;
        private labelCardNum: eui.Label;
        private labelCardName: eui.Label;
        private imgCard: eui.Image;
        private imgCardType: eui.Image;
        private labelCardDetails: eui.Label;
        private groupNodeAdd: eui.Group;
        private groupStar: eui.Group;
        private LabelLevel: eui.BitmapLabel;
        private groupEnchant: eui.Group;
        private listAttri: eui.List;
        private groupHide: eui.Group;
        private labelDes: eui.Label;
        private labelArea: eui.Label;
        private labelNow: eui.Label;
        private listGoods: eui.List;
        private btnUp: eui.Button;
        private labelCost: eui.Label;
        private imgCanNot: eui.Image;
        private btnStrengthen: eui.Button;
        private btnEnchant: eui.Button;
        private btnClose: eui.Button;

        private info: message.PotatoInfo;
        private curCard: message.PotatoInfo;
        private callBack: (isRefresh: boolean, isBreak: boolean) => void;
        private curTbl: TableItemPotato;
        private cardStrengthen: CardStrengthen = null;
        private buttonIndex: number; // 按钮状态
        private selGoodsIndex: number;
        private upAttriper: number;
        private _sel: number;
        private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();
        private listGoodsData: eui.ArrayCollection = new eui.ArrayCollection();

        public constructor() {
            super();
            this.skinName = "resource/skins/card/CardStrengthenMainSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnStrengthen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrengthen, this);
            this.btnEnchant.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnchant, this);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUp, this);
            this.listAttri.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeListAttri, this);
            this.listGoods.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeListGoods, this);

            this.init();
        }

        private init() {
            this.buttonIndex = 1; // index = 1 强化按钮可点 念力按钮不可点 index = 2 相反
            this.groupStrengthen.visible = true;
            this.groupEnchant.visible = false;

            this.selGoodsIndex = 1;
            this.upAttriper = 1;

            this.setButtonState();
        }

        public loadInfo(info: message.PotatoInfo, cb: (isRefresh: boolean, isBreak: boolean) => void) {
            this.info = info;
            this.callBack = cb;

            this.refresh();
            this.AddUi();
        }

        // 刷新界面
        private refresh() {
            this.info = PlayerCardSystem.RefreshCard(this.info);
            this.SetCardUI();
        }

        // 设置卡片信息
        private SetCardUI() {
            this.curCard = this.info;
            this.curTbl = TableItemPotato.Item(this.curCard.id);
            let bigFramePic = PlayerCardSystem.GetItemFrame(this.curCard.id)[1];

            this.labelCardName.text = (this.curTbl.name);
            this.LabelLevel.text = this.curCard.level.toString();
            this.imgCard.source = cachekey(this.curTbl.paths, this);
            this.imgCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.labelCardDetails.text = (this.curTbl.des);
            this.labelCardNum.text = (this.curTbl.num);
            this.imgFrame.source = cachekey(bigFramePic, this);

            // let str = PlayerItemSystem.UseOfResource(this.info.id);
            let str = Game.PlayerInfoSystem.Coin.toString();
            this.labelGoldNum.text = "" + str;

            let addStr = PlayerCardSystem.GetAddStr(this.curCard);
            if (addStr.length == 5) {
                Helper.SetStar(this.groupStar, this.curCard.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 16);
            }
            else {
                Helper.SetStar(this.groupStar, this.curCard.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 16);
            }

        }

        // 选择要添加的卡片功能界面
        private AddUi() {
            if (this.cardStrengthen == null) {
                this.cardStrengthen = newUI(CardStrengthen) as CardStrengthen;
            }

            this.cardStrengthen.setInfo(this.info, (isRefresh: boolean, isBreak: boolean) => {
                if (isRefresh) this.refresh();

                if (this.callBack) this.callBack(isRefresh, isBreak);

                if (isBreak) this.close(UI.HIDE_TO_TOP);
            });
            this.groupNodeAdd.addChild(this.cardStrengthen);
            this.cardStrengthen.name = "cardStrengthen";
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
            this.cardStrengthen = null;
        }

        //////////////////////////////////注入念力相关/////////////////////////////////

        /**设置按钮状态 */
        private setButtonState() {
            this.btnStrengthen.enabled = this.buttonIndex == 2;
            this.btnEnchant.enabled = this.buttonIndex == 1;
        }

        /**强化 */
        private onBtnStrengthen() {
            this.groupStrengthen.visible = true;
            this.groupEnchant.visible = false;
            this.buttonIndex = 1;
            this.setButtonState();
        }

        /**注入念力 */
        private onBtnEnchant() {
            if (this.info.star == CommonConfig.card_max_star && TableItemPotato.Item(this.curCard.id).quality == 6) {
                this.groupStrengthen.visible = false;
                this.groupEnchant.visible = true;
                this.buttonIndex = 2;
                this.setEnchanInfo(1);
                this.setButtonState();
            }
            else {
                toast_warning(TextsConfig.TextsConfig_Hunter_Card.card_error);
            }
        }

        private setEnchanInfo(index: number, selects?) {
            this._sel = index; // 从1开始
            let attri_id = this.info.add_attri[this._sel - 1].attriId;
            let range = Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
            let range_result = this.info.add_attri[this._sel - 1].growthValue;
            let _type = 1;
            if (range_result <= range[0][1]) {
                _type = 1;
            }
            else {
                _type = 2;
            }
            let addStr = PlayerCardSystem.GetAddStr(this.curCard, range_result, _type);
            let money = Game.PlayerCardSystem.attriInstance(attri_id).growth_money[this.selGoodsIndex - 1]; // 增幅消耗金币
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
            for (let i = 0; i < addStr.length; i++) {
                let itemData = new CardStrengthenMainItemData();
                itemData.index = i;
                itemData.cardInfo = this.info;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.itemRenderer = CardStrengthenMainItem;
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.selectedIndex = this.listAttriSelected;
        }

        private setRightSelectInfo(index: number) {
            let perAttr = [
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
            let attri_id = this.info.add_attri[this._sel - 1].attriId;
            let range = Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1];

            let range_growth = Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
            let value = this.info.add_attri[this._sel - 1].attriValue;
            let _type = 1;
            if (this.info.add_attri[this._sel - 1].growthValue <= range_growth[0][1]) {
                _type = 1;
            }
            else {
                _type = 2;
            }
            if (Game.PlayerCardSystem.attriInstance(attri_id).object_type == "") {
                value = Math.abs(PlayerTalentSystem.Des_Card_Value(Game.PlayerCardSystem.attriInstance(attri_id).attri_type, this.info.add_attri[this._sel - 1].growthValue, _type, null));
            }

            // attri_type 随机属性类型  object_type 对象类型
            if (Number(Game.PlayerCardSystem.attriInstance(attri_id).object_type) == message.EPotatoAttriType.ATTRI_TYPE_GENERAL_VALUE && Table.FindK(perAttr, Game.PlayerCardSystem.attriInstance(attri_id).attri_type) == -1) {
                this.upAttriper = 1;
                // 注入念力后属性值
                if (this.selGoodsIndex == 1) {
                    this.labelArea.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_next_a_per, value, range[0], range[1]));
                }
                else if (this.selGoodsIndex == 2) {
                    this.labelArea.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_next_b_per, value, range[0], range[1]));
                }

                // 注入念力前属性值
                if (this.info.add_attri[this._sel - 1].growthValue == 0) {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_up_add_per, value));
                }
                else if (this.info.add_attri[this._sel - 1].growthValue > Game.PlayerCardSystem.attriInstance(attri_id).range_growth[0][1]) {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_before_b_per, value, this.info.add_attri[this._sel - 1].growthValue));
                }
                else {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_before_a_per, value, this.info.add_attri[this._sel - 1].growthValue));
                }
            }
            else {
                this.upAttriper = 2;
                // 注入念力后属性值
                if (this.selGoodsIndex == 1) {
                    this.labelArea.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_next_a, value, range[0], range[1]));
                }
                else if (this.selGoodsIndex == 2) {
                    this.labelArea.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_next_b, value, range[0], range[1]));
                }

                // 注入念力前属性值
                if (this.info.add_attri[this._sel - 1].growthValue == 0) {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_up_add, value));
                }
                else if (this.info.add_attri[this._sel - 1].growthValue > Game.PlayerCardSystem.attriInstance(attri_id).range_growth[0][1]) {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_before_b, value, this.info.add_attri[this._sel - 1].growthValue));
                }
                else {
                    this.labelNow.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_add_before_a, value, this.info.add_attri[this._sel - 1].growthValue));
                }
            }
            this.labelDes.text = Game.PlayerCardSystem.attriInstance(attri_id).des;

            let goods = Game.PlayerCardSystem.attriInstance(attri_id).growth_consume; // 增幅消耗物品
            let count = Game.PlayerCardSystem.attriInstance(attri_id).growth_count;// 增幅消耗数量

            // 添加注入方式Item
            this.listGoodsData.removeAll();
            for (let i = 0; i < goods.length; i++) {
                let itemData = new HXH_HunterStrengMainAddItemData();
                itemData.id = i;
                itemData.goodsId = goods[i];
                itemData.count = count[i];
                this.listGoodsData.addItem(itemData);
            }
            this.listGoods.itemRenderer = HXH_HunterStrengMainAddItem;
            this.listGoods.dataProvider = this.listGoodsData;
            this.listGoods.selectedIndex = this.listGoodsItemIndexBefore;
        }

        private setFreshInfo() {
            if (this.callBack) this.callBack(true, false);
            this.setEnchanInfo(this._sel);
            this.setRightSelectInfo(this.selGoodsIndex);
        }

        private onBtnUp() {
            let attri_id = this.info.add_attri[this._sel - 1].attriId;
            if (this.info.add_attri[this._sel - 1].growthValue >= Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1][1] && this.selGoodsIndex == 1) {
                toast_warning(TextsConfig.TextsConfig_Hunter_Card.card_select_error);
            }
            else if (this.info.add_attri[this._sel - 1].growthValue >= Game.PlayerCardSystem.attriInstance(attri_id).range_growth[this.selGoodsIndex - 1][1] && this.selGoodsIndex == 2) {
                toast_warning(TextsConfig.TextsConfig_Hunter_Card.card_select_Max);
            }
            else {
                let self = this;
                Game.PlayerCardSystem.PotatoGrowthReqReq(this.info, this._sel, this.selGoodsIndex).then((msg: message.PotatoGrowthRespBody) => {
                    let attriId = self.info.add_attri[self._sel - 1].attriId;
                    let value = self.info.add_attri[self._sel - 1].attriValue;
                    let growthValue = self.info.add_attri[self._sel - 1].growthValue;
                    let range_growth = Game.PlayerCardSystem.attriInstance(attri_id).range_growth; // 增幅范围
                    let _type = 1;
                    if (self.info.add_attri[self._sel - 1].growthValue <= range_growth[0][1]) {
                        _type = 1;
                    }
                    else {
                        _type = 2;
                    }
                    let HostIndex = 1;
                    if (Game.PlayerCardSystem.attriInstance(attriId).object_type == "") {
                        value = Math.abs(PlayerTalentSystem.Des_Card_Value(Game.PlayerCardSystem.attriInstance(attriId).attri_type, self.info.add_attri[self._sel - 1].growthValue, _type, null));
                    }

                    let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(self.info.index).cHostId;
                    if (cHostId != null) {
                        for (let [kk, vv] of HelpUtil.GetKV(msg.gameInfo.generals[0].potatoInfo)) {
                            if (vv.id == self.info.id && vv.index == self.info.index) {
                                HostIndex = kk;
                            }
                        }
                        self.info.add_attri[self._sel - 1].growthValue = msg.gameInfo.generals[0].potatoInfo[HostIndex].add_attri[self._sel - 1].growthValue;
                    }
                    else {
                        self.info.add_attri[self._sel - 1].growthValue = msg.gameInfo.potatos[0].add_attri[self._sel - 1].growthValue;
                    }

                    loadUI(CardStrengthenMainPop).then((dialog: CardStrengthenMainPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.SetInfo(self.info.add_attri[self._sel - 1].attriId, self.curCard, TableItemPotato.Item(self.curCard.id), growthValue, msg.rangeResult, value, self.upAttriper, self.setFreshInfo, this);
                    });

                }).catch((reason) => {
                    if (reason == message.EC.XG_LACK_MONEY) {
                        TipManager.ShowAddMoney();
                    }
                });
            }
        }

        private listAttriItemIndexBefore: number = 0;

        private listAttriSelected: number = 0;

        /**点击注入念力选择副属性List */
        private onChangeListAttri(e: eui.ItemTapEvent) {
            if (this.listAttri.selectedIndex == this.listAttriItemIndexBefore) return;

            let item = this.listAttri.getElementAt(e.itemIndex) as CardStrengthenMainItem;
            let data = this.listAttriData.getItemAt(e.itemIndex) as CardStrengthenMainItemData;

            this.setEnchanInfo((data.index + 1), 1);
            this.listAttri.selectedIndex = e.itemIndex;
            this.listGoods.selectedIndex = 0;
            this.listGoodsItemIndexBefore = 0;
            this.listAttriSelected = e.itemIndex;

            this.listAttriData.itemUpdated(this.listAttriData.source[e.itemIndex]);
            this.listAttriData.itemUpdated(this.listAttriData.source[this.listAttriItemIndexBefore]);

            this.listAttriItemIndexBefore = e.itemIndex;

            this.setFreshInfo();
        }

        private listGoodsItemIndexBefore: number = 0;

        /**点击注入方式List */
        private onChangeListGoods(e: eui.ItemTapEvent) {
            if (this.listGoods.selectedIndex == this.listGoodsItemIndexBefore) return;

            let item = this.listGoods.getElementAt(e.itemIndex) as HXH_HunterStrengMainAddItem;
            let data = this.listGoodsData.getItemAt(e.itemIndex) as HXH_HunterStrengMainAddItemData;

            this.setRightSelectInfo(data.id + 1);
            this.listGoods.selectedIndex = e.itemIndex;

            this.listGoodsData.itemUpdated(this.listGoodsData.source[e.itemIndex]);
            this.listGoodsData.itemUpdated(this.listGoodsData.source[this.listGoodsItemIndexBefore]);

            this.listGoodsItemIndexBefore = e.itemIndex;

            this.setFreshInfo();
        }
    }

}