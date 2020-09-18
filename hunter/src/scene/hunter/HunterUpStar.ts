namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-11
     * 
     * @class 猎人升星
     */
    export class HunterUpStar extends Dialog {

        private btnReturn: eui.Button;
        private groupLeft: eui.Group;
        private labelHunterTip: eui.Label;
        private listHeros: eui.List;
        private groupRight: eui.Group;
        private imgHunterUpStarTip: eui.Image;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private groupCurrentStar: eui.Group;
        private labelLevel: eui.Label;
        private groupMaterial: eui.Group;
        private groupNextStar: eui.Group;
        private imgUpStar: eui.Image;
        private groupAttribute: eui.Group;
        private btnAddStar: eui.Button;
        private labelUpStarNumber: eui.Label;
        private groupMoney: eui.Group;
        private groupMoney1: eui.Group;
        private groupMoney2: eui.Group;
        private labelIntegrate: eui.Label;
        private btnAddGold: eui.Button;
        private labelToken: eui.Label;
        private btnAdddiamond: eui.Button;
        private rectAddStar: eui.Rect;
        private scrollerHero: eui.Scroller;
        private btnBatchStar: eui.Button;

        private callback: (type?: string) => void = null;
        /** 武将ID */
        private generalId: number = null;
        /** 初始武将ID */
        private firstGeneralId: number = null;
        private listHerosData: eui.ArrayCollection = new eui.ArrayCollection();
        /** 材料列表 */
        private materialList: Array<HunterUpStarItemRight> = [];
        /** 材料武将ID列表 */
        private materialGeneralIdList: Array<number> = [];
        private isUpStarSuccess: boolean = true;
        private battleValue: number;
        private update: number;
        private propTbl;
        public indexTbl = [];
        private gold: eui.Image;
        private jewel: eui.Image;
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterUpStarSkin.exml";

            this.init();
            if (Device.isReviewSwitch) {
                this.btnAddGold.visible = false;

                this.gold.width = 40;
                this.gold.height = 40;

                this.jewel.width = 40;
                this.jewel.height = 40;

                this.btnAdddiamond.width = 30;
                this.btnAdddiamond.height = 30;
                this.btnAdddiamond.y = 7;
            }
        }

        private init() {
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;

            let leftX = this.width * 0.5 + 40 - this.groupLeft.width;
            this.groupLeft.x = (leftX > 0) ? leftX : 0;
            let rightX = this.width * 0.5 + 80;
            if (rightX + this.groupRight.width >= this.width) {
                this.groupRight.x = this.width - this.groupRight.width;
            } else {
                this.groupRight.x = rightX;
            }

            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnReturn.addEventListener(tap, this.onBtnReturn, this);
            this.btnAddStar.addEventListener(tap, this.onBtnAddStar, this);
            this.imgIcon.addEventListener(tap, this.onIconTap, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.Update, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.Update, this);
            this.Update();
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnBatchStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBatchStar, this);
            for (let i = 0; i < 6; i++) {
                this.materialGeneralIdList.push(0);
            }

            this.listHeros.allowMultipleSelection = true;
            this.listHeros.itemRenderer = HunterUpStarItemLeft;
            this.listHeros.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            this.isUpStarSuccess = false;
            this.loadMaterials();
        }
        public isFullScreen() {
            return true;
        }
        private onBtnAddGold() {
            loadUI(HelpGoldDialog)
                .then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            // toast_success("加钻石功能未开启");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        private Update() {
            //钻石数量
            if (Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            } else {
                this.labelIntegrate.text = Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            } else {
                this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            //this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        }

        /** 加载升星材料 */
        private loadMaterials() {
            for (let i = 0; i < CommonConfig.general_max_star - 1; i++) {
                let item = new HunterUpStarItemRight();

                let gaps = (this.groupMaterial.width - item.width * 5) / 6;
                item.y = (this.groupMaterial.height - item.height) * 0.5;
                item.x = item.width * i + gaps * (i + 1);

                // 设置回调
                item.setInfo(i, (index: number, deselectedId: number) => {
                    this.onMaterialDeselected(index, deselectedId);
                });

                this.groupMaterial.addChild(item);
                this.materialList.push(item);
            }
        }

        /**
         * 初始化基本信息
         * 
         * @description 左侧Base item 取消选中 是调用
         */
        private initBaseGeneral() {
            this.generalId = 0;

            this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarHunter;
            this.labelHunterTip.textColor = Helper.RGBToHex("r:255,g:255,b:255");

            this.labelUpStarNumber.text = "  0";

            this.imgFrame.visible = false;
            this.imgIcon.visible = false;
            this.labelLevel.text = "";
            this.groupCurrentStar.removeChildren();

            this.setNextStarInfo();

            for (let i = 0; i < this.materialList.length; i++) {
                let v = this.materialList[i];
                v.initBaseInfo(i);
            }

            this.showUpStarImage();
            this.groupAttribute.visible = false;

            this.loadList(false);
        }

        public setInfo(id: number, battleValue: number, cb: (type?: string) => void) {
            this.generalId = id;
            this.firstGeneralId = id;
            this.battleValue = battleValue;
            this.callback = cb;

            this.refreshInfo();
        }

        private refreshInfo(focus = true) {
            let generalInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.battleValue = generalInfo.battleValue;

            this.setHeroInfo();
            this.setMaterialLock();
            this.setAttributeInfo();
            this.loadList(focus);
        }

        // 设置英雄信息
        private setHeroInfo() {
            let generalInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);

            // set left group
            this.labelHunterTip.textColor = Helper.GetStepColor(generalInfo.step);
            this.labelHunterTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.starHunter, generalInfo.star, baseGeneralInfo.general_name);

            // set right group
            this.imgFrame.visible = true;
            this.imgIcon.visible = true;
            let framePath = PlayerHunterSystem.Frame(this.generalId);
            let headPath = PlayerHunterSystem.Head(this.generalId);
            this.imgFrame.source = cachekey(framePath, this);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imgIcon.source = cachekey("wx_" + headPath, this);
            } else {
                this.imgIcon.source = cachekey(headPath, this);
            }

            Helper.SetHeroAwakenStar(this.groupCurrentStar, generalInfo.star, generalInfo.awakePassive.level);
            this.labelLevel.text = generalInfo.level.toString();

            let showChangeGeneral = Tips.GetSaveBoolForGeneralUpStar();
            this.imgHunterUpStarTip.visible = !showChangeGeneral;

            // 设置星星显示
            this.setNextStarInfo();

            let cost = baseGeneralInfo.up_star_money[generalInfo.star - 1];
            // 新手处理
            if (cost == null || cost == undefined) {
                cost = 0;
            }
            this.labelUpStarNumber.text = Set.NumberUnit2(cost);
        }

        // 设置右侧属性信息
        private setAttributeInfo() {
            if (this.generalId == null || this.generalId == 0) return;

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            // let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);

            if (hunterInfo.star == CommonConfig.general_max_star || this.hunterMaxStar(this.generalId, hunterInfo.star) == true) { // 已满级
                this.showUpStarImage(false, true);
                this.groupAttribute.visible = false;
            } else { // 未满级
                this.showUpStarImage(true);
                this.groupAttribute.visible = true;
            }
            this.groupAttribute.removeChildren();

            let [attr1, battleValue1] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(Table.DeepCopy(hunterInfo));
            let nextHunterInfo = Table.DeepCopy(hunterInfo);
            nextHunterInfo.star += 1;
            let [attr2, battleValue2] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(nextHunterInfo);

            // sort as descend
            let attriShow = [...TableEnum.EnumHunterAttriShow2];
            let attriArray = attriShow.sort((a: number, b: number) => {
                return b - a;
            });
            for (let i = 0; i <= attriArray.length; i++) {
                let v = attriArray[i];
                let item = new HunterUpStarAttributeItem();
                let name: string, value: string, nextValue: string;

                if (i == attriArray.length) { // battle value at the last item
                    name = Helper.StringFormat("%s", TextsConfig.TextsConfig_Hunter.battleValue);
                    value = Helper.StringFormat("%s", Set.NumberUnit3(Number(battleValue1)));
                    nextValue = Helper.StringFormat("%s", Set.NumberUnit3(Number(battleValue2)));
                } else {
                    name = Helper.StringFormat("%s", TextsConfig.TextsConfig_HeroMain.attr[v]);
                    value = Helper.StringFormat("+%s", Math.ceil(attr1[v - 1]));
                    nextValue = Helper.StringFormat("+%s", Math.ceil(attr2[v - 1]));

                    if (v == TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || v == TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA) {
                        value += "%";
                        nextValue += "%";
                    }
                }

                item.x = 0;
                item.y = (item.height) * i;

                item.setInfo(name, value, nextValue);
                this.groupAttribute.addChild(item);
            }
            let uplevel = TableBaseGeneral.Item(this.generalId % CommonConfig.general_id_to_index_multiple).up_star_add_skillLevel[hunterInfo.star - 1];
            if (uplevel != 0) {
                let item = new HunterUpStarAttributeItem();
                let name: string, value: string, nextValue: string;
                name = TextsConfig.TextsConfig_Hunter.level_max
                value = Helper.StringFormat("          " + TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId))
                nextValue = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId) + uplevel)
                item.setInfo(name, value, nextValue);
                item.x = 0;
                item.y = item.height * (attriArray.length + 1);
                this.groupAttribute.addChild(item);
            }
        }

        /** 设置猎人列表 */
        private loadList(focus?: boolean) {
            this.propTbl = PlayerHunterSystem.ChooseUpStarMeterial(this.firstGeneralId);
            let localTbl: Array<number> = Table.DeepCopy(this.propTbl);
            let fix = PlayerItemSystem.FixCount(this.propTbl.length, 25, 5);
            for (let i = 0; i < fix; i++) {
                localTbl.push(0);
            }

            this.listHerosData.removeAll();

            let index = -1;
            for (let i = 0; i < localTbl.length; i++) {
                let v = localTbl[i];
                let itemData = new HunterUpStarItemLeftData();
                itemData.generalId = v;
                itemData.fatherGeneralId = this.generalId;
                if (this.generalId != 0 && this.generalId != null && v == this.generalId) {
                    itemData.isSelected = true;
                    index = i;
                } else {
                    itemData.isSelected = false;
                }

                // itemData.father = this;
                this.listHerosData.addItem(itemData);
            }
            this.listHeros.dataProvider = this.listHerosData;

            if (focus == true) {
                this.scrollList(index);
            }
        }

        private scrollList(selectedIndex: number) {
            if (selectedIndex < 0) return;
            let row = Math.floor(selectedIndex / 5);
            let gap = 3;
            let item = new HunterUpStarItemLeft();
            let maxRow = Math.floor(this.listHerosData.length / 5);
            if (maxRow - row <= 5) {
                row = maxRow - 5;
            }

            let scrolHeight = (item.height + gap) * row;
            egret.Tween.get(this.listHeros)
                .to({ scrollV: scrolHeight }, 350, egret.Ease.backIn);
        }

        private onListHerosTap(e: eui.ItemTapEvent) {
            let data = this.listHerosData.getItemAt(e.itemIndex) as HunterUpStarItemLeftData;
            let item = this.listHeros.getElementAt(e.itemIndex) as HunterUpStarItemLeft;

            if (data == null || item == null) return;

            if (item.isInLongPress == true) {
                item.resumeLongPressState();
                return;
            }

            if (data.fatherGeneralId == 0 || data.fatherGeneralId == null) {
                if (data.generalId == 0 || data.generalId == null) {
                    return;
                } else {
                    // first tap regard as the base item
                    // to be base general
                    this.generalId = data.generalId;
                    this.refreshInfo(false);
                    return;
                }
            } else {
                if (data.generalId == 0 || data.generalId == null) {
                    return;
                }
                if (data.fatherGeneralId == data.generalId) {
                    // item base deselected
                    // unload base general
                    this.initBaseGeneral();
                } else if (item.type == HunterState.Defence) {
                    let msg = TextsConfig.TextsConfig_Hunter.defence_general;
                    if (item.defenceType == 1) {
                        msg = TextsConfig.TextsConfig_Hunter.defence_general1;
                    } else if (item.defenceType == 2) {
                        msg = TextsConfig.TextsConfig_Hunter.defence_general2;
                    } else if (item.defenceType == 3) {
                        msg = TextsConfig.TextsConfig_Hunter.defence_general3;
                    } else if (item.defenceType == 4) {
                        msg = TextsConfig.TextsConfig_Hunter.defence_general4;
                    }
                    toast_warning(msg);
                    return;
                } else if (item.type == HunterState.BFirst) {
                    toast_warning(TextsConfig.TextsConfig_Hunter.hunter_be_first);
                } else if (Game.PlayerHunterSystem.queryHunter(data.generalId).star == Game.PlayerHunterSystem.queryHunter(data.fatherGeneralId).star) {

                    // judge material is full or not
                    let full = Table.FindF(this.materialGeneralIdList, (_, _v) => {
                        return _v == 0;
                    });
                    if (full == false && data.isSelected == false) {
                        toast_warning(TextsConfig.TextsConfig_Hunter.general_upstar_num_max);
                        return;
                    }

                    data.isSelected = !data.isSelected;
                    this.listHerosData.replaceItemAt(data, e.itemIndex);

                    this.setMaterialLock(data.generalId);
                }
            }
        }

        /** 设置下一级别显示的星星 */
        private setNextStarInfo() {
            this.groupNextStar.visible = true;
            // 取消选中，只显示暗星
            let star = 0;
            let level = 0;
            if (this.generalId != null && this.generalId != 0) {
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                star = hunterInfo.star + 1;
                level = hunterInfo.awakePassive.level + 1;
            }


            Helper.NodeStarByAlignLeft(this.groupNextStar, star, CommonConfig.general_max_star, null, true, UIConfig.UIConfig_Role.heroAwakenStar[level]);
        }

        /**
         * 设置材料锁
         * 
         * @param generalId 武将ID
         * 
         * @description 子类材料选中或者取消选中
         */
        private setMaterialLock(generalId?: number) {

            if (generalId == null || generalId == undefined) {
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                let star = hunterInfo.star;
                let copyGeneralIdList = this.materialGeneralIdList.concat(); // 数组浅拷贝
                for (let i = 0; i < copyGeneralIdList.length; i++) {
                    if (this.hunterMaxStar(this.generalId, star) == true) {
                        this.materialGeneralIdList[i] = -1;
                    } else {
                        let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
                        let pos = baseGeneralInfo.up_star_soul[star - 1];
                        if (pos == null || pos == undefined) {
                            this.materialGeneralIdList[i] = -1;
                        } else {
                            if (pos == CommonConfig.general_max_star) {
                                this.materialGeneralIdList[i] = -1;
                            } else {
                                // 设置是否上锁
                                this.materialGeneralIdList[i] = ((i + 1) > pos) ? -1 : 0;
                            }
                        }
                    }
                }

                // 刷新材料项
                for (let i = 0; i < this.materialList.length; i++) {
                    let v = this.materialList[i];
                    v.refresh(this.materialGeneralIdList[i], this.generalId);
                }

            } else {
                // 判断材料列表 是否已经选中，选中则需要取消选中，反之选中
                let [_, index] = Table.FindR(this.materialGeneralIdList, (_, _v) => {
                    return _v == generalId;
                });
                if (index == null) {
                    let emptyIndex = null;
                    for (let i = 0; i < this.materialGeneralIdList.length; i++) {
                        let v = this.materialGeneralIdList[i];
                        if (v == 0) {
                            emptyIndex = i;
                            break;
                        }
                    }
                    if (emptyIndex != null) {
                        // selected material
                        this.materialGeneralIdList[emptyIndex] = generalId;
                        this.materialList[emptyIndex].refresh(generalId, this.generalId);
                    }
                } else {
                    // deselected material
                    this.materialGeneralIdList[index] = 0;
                    this.materialList[index].refresh(0, this.generalId);
                }
            }
        }

        /** 猎人是否满级 */
        private hunterMaxStar(generalId, star): boolean {
            let mushrooms = [10057, 10058, 10059, 10074]; // 5星蘑菇不升级
            let ret = (star >= 5) && (Table.VIn(mushrooms, PlayerHunterSystem.GetGeneralId(generalId)) == true || PlayerHunterSystem.Table(generalId).aptitude == 11);
            return ret;
        }

        /**
         * 材料取消选中的点击事件
         * @param index 索引
         * @param id 武将ID
         */
        private onMaterialDeselected(index: number, id: number) {
            if (id <= 0 || id == null) {
                return;
            }

            let i = this.materialGeneralIdList.indexOf(id);
            if (i >= 0) {
                // 刷新材料
                this.materialGeneralIdList[i] = 0;
                this.materialList[i].refresh(0, this.generalId);

                // list 取消选中
                let itemIndex = -1;
                for (let i = 0; i < this.listHerosData.length; i++) {
                    let v = this.listHerosData.getItemAt(i) as HunterUpStarItemLeftData;
                    if (v.generalId == id) {
                        itemIndex = i;
                        break;
                    }
                }

                if (itemIndex < 0) {
                    return;
                }

                let itemData = this.listHerosData.getItemAt(itemIndex) as HunterUpStarItemLeftData;
                itemData.isSelected = false;
                this.listHerosData.replaceItemAt(itemData, itemIndex);
            }
        }

        /** 点击头像 */
        private onIconTap() {
            if (this.generalId != null && this.generalId != 0) {
                Tips.SetSaveBoolForGeneralUpStar(true);
                this.imgHunterUpStarTip.visible = false;
                this.initBaseGeneral();
            }
        }

        /**
         * 升星图片
         * @param hide 是否隐藏
         * @param isMax 是否满级
         */
        private showUpStarImage(hide: boolean = false, isMax: boolean = false) {
            this.imgUpStar.visible = !hide;
            let max = "ui_hunter_WordsTipUpStarMax_png";
            let attri = "ui_hunter_WordsTipUpStarAtt_png";
            this.imgUpStar.source = (isMax) ? cachekey(max, this) : cachekey(attri, this);
        }

        private onBtnReturn() {
            if (this.isUpStarSuccess == true) {
                if (this.callback) {
                    this.callback();
                }
            }
            this.close(UI.HIDE_TO_TOP);
        }

        /** 点击升星 */
        private onBtnAddStar() {
            if (this.generalId == 0 || this.generalId == null) {
                toast_warning(TextsConfig.TextsConfig_Hunter.chooseUpStarHunter);
                return;
            }

            if (Table.VIn(this.materialGeneralIdList, 0)) {
                toast_warning(TextsConfig.TextsConfig_Convert.not_enough);
                return;
            }

            let overA = Table.FindF(this.materialGeneralIdList, (_, _v) => {
                if (_v != -1 && _v != 0) {
                    return (PlayerHunterSystem.Table(_v).aptitude == 13);
                }
                return false;
            });
            let overS = Table.FindF(this.materialGeneralIdList, (_, _v) => {
                if (_v != -1 && _v != 0) {
                    return (PlayerHunterSystem.Table(_v).aptitude == 14);
                }
                return false;
            });

            if (overA == true) {
                let msg = TextsConfig.TextsConfig_HeroMain.AddStar_OverA;
                TipManager.ShowConfirmCancel(msg, () => {
                    egret.setTimeout(() => {
                        this.requestUpStar();
                    }, this, 500);
                });
            } else if (overS == true) {
                let msg = TextsConfig.TextsConfig_HeroMain.AddStar_OverS;
                TipManager.ShowConfirmCancel(msg, () => {
                    egret.setTimeout(() => {
                        this.requestUpStar();
                    }, this, 500);
                });
            } else {
                this.requestUpStar();
            }
        }

        private requestUpStar() {
            let materials = [];
            for (let i = 0; i < this.materialGeneralIdList.length; i++) {
                let v = this.materialGeneralIdList[i];
                if (v != null && v != -1 && v != 0) {
                    materials.push(v);
                }
            }

            let p = Game.PlayerHunterSystem.upStar(this.generalId, materials);
            p.then((code: number) => {

                if (code == 0) {
                    for (let i = 0; i < this.materialGeneralIdList.length; i++) {
                        let v = this.materialGeneralIdList[i];
                        Game.PlayerHunterSystem.deleteHunterById(v);
                    }

                    this.setInfoAddStar();
                } else if (code == message.EC.XG_LACK_MONEY) {

                    loadUI(HelpGoldDialog)
                        .then((dialog: HelpGoldDialog) => {
                            dialog.SetInfoList();
                            dialog.show(UI.SHOW_FILL_OUT);
                        });
                }
            });
        }

        private setInfoAddStar() {
            Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);

            loadUI(HunterUpStarSuccess)
                .then((dialog: HunterUpStarSuccess) => {
                    dialog.setInfo(this.generalId, this.closeUpStarSuccessDialog, this);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private closeUpStarSuccessDialog() {
            this.isUpStarSuccess = true;
            egret.setTimeout(() => {
                this.promptBattleValue(() => {
                    this.refreshInfo();
                });
            }, this, 450);
        }

        private promptBattleValue(cb: Function) {
            // 当前武将战斗力
            let oldValue = this.battleValue;
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;

            CommonTipBmfont.promptBattleValue(oldValue, newValue);

            if (cb) cb();

        }

        public TeachFindMet() {
            this.indexTbl = [];
            for (let k in this.propTbl) {
                if (this.propTbl.hasOwnProperty(k)) {
                    let v = this.propTbl[k];
                    if (PlayerHunterSystem.GetGeneralId(v) == 10058) {
                        this.indexTbl.push(Number(k));
                        if (this.indexTbl.length >= 3) {
                            return;
                        }
                    }
                }
            }
        }

        private itemList: Array<HunterUpStarItemLeft> = [];

        private getItemList() {
            this.itemList = [];
            for (let i = 0; i < PlayerHunterSystem.ChooseUpStarMeterial(this.firstGeneralId).length; i++) {
                let item = this.listHeros.getElementAt(i) as HunterUpStarItemLeft;
                this.itemList.push(item);
            }
        }

        private onBtnBatchStar() {
            loadUI(HunterBatchStar).then((dialog: HunterBatchStar) => {
                dialog.cb(() => {
                    this.isUpStarSuccess = true;
                    if (this.generalId != 0) {
                        this.refreshInfo();
                    }
                    if (Game.PlayerHunterSystem.queryHunter(this.firstGeneralId)) {
                        this.loadList();
                    } else {
                        this.firstGeneralId = 0;
                        this.loadList();
                    }
                }, this.generalId)
                dialog.show(UI.SHOW_FROM_TOP);
            })
        }
    }
}