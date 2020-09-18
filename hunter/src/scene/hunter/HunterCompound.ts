namespace zj {
    /**猎人合成
     *邢利伟
     *2018.12.19
     * @class HunterCompound
     */
    export class HunterCompound extends Dialog {
        private groupTeach3: eui.Group;
        private btnClose: eui.Button;
        private groupMax: eui.Group;
        private listGetHero: eui.List;
        private groupRight: eui.Group;
        private imgIcon: eui.Image;
        private imgHunterType: eui.Image;
        private imgHunterName: eui.Image;
        private imgFrame: eui.Image
        private groupStar: eui.Group;
        private labelLevel: eui.BitmapLabel;
        private imgGrade: eui.Image;
        private listMaterial: eui.List;
        private groupInfo: eui.Group;
        private groupStart: eui.Group;
        /**合成按钮 */
        private btnConpound: eui.Button;
        /**合成所需金币 */
        private lableConpoundMoney: eui.Label;
        private listSkill: eui.List;
        private groupMoney: eui.Group;
        private groupMoney1: eui.Group;
        private groupMoney2: eui.Group;
        private labelIntegrate: eui.Label;
        private btnAddGold: eui.Button;
        private labelToken: eui.Label;
        private btnAdddiamond: eui.Button;
        private groupLog: eui.Group;
        private labelAtt1: eui.Label;
        private labelAtt2: eui.Label;
        private labelAtt3: eui.Label;
        private labelAtt4: eui.Label;
        private shade: CommonShade;
        /**武将列表数据源 */
        private listGetHeroData: eui.ArrayCollection = new eui.ArrayCollection();
        /**武将合成材料列表数据源 */
        public listMaterialData: eui.ArrayCollection = new eui.ArrayCollection();
        /**详情数据源 */
        private listSkillData: eui.ArrayCollection = new eui.ArrayCollection();
        /**武将ID */
        private generalId: number;
        /** 上次选中猎人ID */
        private lastSelectedHunterId: number = 0;
        private selectInfo: TableGeneralMake;
        public composeTable = [];
        /**判断list是否被点击 */
        private isUp: boolean = false;
        private update: number;
        private array: Array<TableGeneralMake> = [];

        private cb;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCompoundSkin.exml";
            this.init();
        }

        private init() {
            this.loadLeftHunterInfoList();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnConpound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConpound, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
                egret.Tween.removeTweens(this);
            }, this);
            egret.Tween.get(this).wait(10).call(() => {
                this.Update();
            })
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
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

        public CB(cb) {
            this.cb = cb;
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
            this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        }


        /**加载左侧武将列表 */
        private loadLeftHunterInfoList() {

            let table = TableGeneralMake.Table();
            this.generalId = table[1].compose_id;
            for (let k in table) {
                if (table.hasOwnProperty(k)) {
                    let v = table[k];
                    this.array.push(v);
                }
            }
            let info: Array<TableGeneralMake> = Table.DeepCopy(this.array);
            let fix = PlayerItemSystem.FixCount(info.length, 15, 3);
            for (let i = 0; i < fix; i++) {
                let one = new TableGeneralMake();
                one.compose_id = 0;
                info.push(one);
            }
            this.listGetHeroData.removeAll();
            for (let i = 0; i < info.length; i++) {
                let v = info[i];
                let data = new HunterCompoundItemData();
                data.index = i;
                if (i == this.lastSelectedHunterId) {
                    data.isSelected = true;
                } else {
                    data.isSelected = false;
                }
                data.info = v;
                data.skill = v.compose_id;
                data.father = this;
                this.listGetHeroData.addItem(data);
            }
            this.listGetHero.dataProvider = this.listGetHeroData;
            this.listGetHero.itemRenderer = HunterCompoundItem;
            this.listGetHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickGetHeroList, this);

            this.setRightInfo();
        }

        /**列表点击 */
        private onClickGetHeroList(e?: eui.ItemTapEvent, vis?: boolean) {

            if (vis != true) {
                if (this.lastSelectedHunterId == e.itemIndex || e.itemIndex > this.array.length) {
                    return;
                }
            }

            this.composeTable = [];
            let lastData = this.listGetHeroData.getItemAt(this.lastSelectedHunterId) as HunterCompoundItemData;
            if (lastData) {
                lastData.isSelected = false;
                this.listGetHeroData.replaceItemAt(lastData, this.lastSelectedHunterId);
            }
            if (vis != true) {
                this.lastSelectedHunterId = e.itemIndex;
            }
            let data = this.listGetHeroData.getItemAt(this.lastSelectedHunterId) as HunterCompoundItemData;
            data.isSelected = true;
            this.listGetHeroData.replaceItemAt(data, this.lastSelectedHunterId);



            this.setRightInfo();
        }

        /**设置右侧信息 */
        private setRightInfo() {
            this.selectInfo = this.array[this.lastSelectedHunterId];
            this.generalId = this.selectInfo.compose_id;

            this.loadMaterialsInfo();
            this.lodeSkillInfo();
            this.refreshRightHunterInfo();
        }

        /**加载材料信息*/
        public loadMaterialsInfo() {
            this.listMaterialData.removeAll();
            for (let i = 0; i < this.selectInfo.exchange_ids.length; i++) {
                let data = new HunterCompoundItemRightData();
                data.index = i;
                data.composeId = this.selectInfo.compose_id;
                data.id = this.selectInfo.exchange_ids[i];
                data.level = this.selectInfo.exchange_level[i];
                data.star = this.selectInfo.exchange_star[i];
                data.awaken = this.selectInfo.exchange_awaken[i];
                data.aptitude = this.selectInfo.exchange_aptitude[i];
                data.father = this;
                this.listMaterialData.addItem(data);
            }
            this.listMaterial.dataProvider = this.listMaterialData;
            this.listMaterial.itemRenderer = HunterCompoundItemRight;
        }

        /**刷新右侧信息 */
        private refreshRightHunterInfo() {
            let generalId = this.generalId;
            /**获取武将信息 */
            let hunter = PlayerHunterSystem.Table(generalId);
            let pathHead = PlayerHunterSystem.Head(generalId);
            let pathAptitude = UIConfig.UIConfig_General.hunter_grade[hunter.aptitude];
            let star = hunter.init_star;
            let pathName = hunter.name_pic;

            //右上方武将信息刷新
            this.imgIcon.source = cachekey(pathHead, this);
            this.labelLevel.text = "1";
            Helper.SetHeroAwakenStar(this.groupStar, star, 0);
            Helper.SetHeroAwakenStar(this.groupStart, star, 0);
            this.imgGrade.source = cachekey(pathAptitude, this);
            this.imgHunterType.source = cachekey(UIConfig.UIConfig_General.hunter_type4[hunter.features], this);
            this.imgHunterName.source = cachekey(pathName, this);
            this.imgFrame.source = cachekey(PlayerHunterSystem.GetGeneralFrame(generalId), this);


            /**武将属性信息 */
            let hunterAttributeInfo: message.GeneralInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            hunterAttributeInfo = new message.GeneralInfo();
            hunterAttributeInfo.general_id = generalId;
            hunterAttributeInfo.star = PlayerHunterSystem.Table(generalId).init_star;
            hunterAttributeInfo.level = 1;
            hunterAttributeInfo.step = 0;
            hunterAttributeInfo.awakePassive.level = 0;

            /**属性信息赋值 */
            let [info,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterAttributeInfo);
            for (let i = 0; i < TableEnum.EnumHunterAttriShow3.length; i++) {
                let vv = TableEnum.EnumHunterAttriShow3[i];
                let str = String(Math.ceil(info[vv - 1]));
                let labelAttri = this.groupInfo.getChildByName(`labelAtt${Number(i) + 1}`) as eui.Label;
                labelAttri.text = String(str);
            }
            this.lableConpoundMoney.text = Set.NumberUnit3(this.selectInfo.consume);
        }

        /**加载技能信息*/
        private lodeSkillInfo() {
            let genTable = PlayerHunterSystem.Table(this.generalId);
            this.listSkillData.removeAll();
            for (let kk in genTable.skill_ids) {
                if (genTable.skill_ids.hasOwnProperty(kk)) {
                    let vv = genTable.skill_ids[kk];
                    let data = new HunterSeeDetailItemData();
                    data.index = Number(kk);
                    data.generalId = this.generalId;
                    data.skillId = vv;
                    data.father = this;
                    this.listSkillData.addItem(data);
                }
            }
            if (genTable.init_passive[0] != 0) {
                let data = new HunterSeeDetailItemData();
                data.index = 2;
                data.generalId = this.generalId;
                data.skillId = genTable.init_passive[0];
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (genTable.awake_passive != 0) {
                let data = new HunterSeeDetailItemData();
                data.index = 3;
                data.generalId = this.generalId;
                data.skillId = genTable.awake_passive;
                data.father = this;
                this.listSkillData.addItem(data);
            }
            this.listSkill.dataProvider = this.listSkillData;
            this.listSkill.itemRenderer = HunterSeeDetailItem;
        }

        /**关闭窗口 */
        private onBtnClose() {
            if (this.cb) this.cb();
            this.close(UI.HIDE_TO_TOP);
        }

        /**子项点击抬起调用的方法 */
        public subitemClick(isUp: boolean, data: HunterSeeDetailItemData) {
            let ui = this.getChildByName("UI");
            if (ui) {
                return;
            }
            loadUI(Common_DesSkill)
                .then((dialog: Common_DesSkill) => {
                    dialog.name = "UI";
                    dialog.x = this.groupMax.x + this.groupRight.x + 92 * data.index - dialog.width / 3 + 13;
                    dialog.y = this.groupMax.y + this.groupRight.y + 73;
                    if (data.index == 2 || data.index == 3) {
                        dialog.setInfoTalent(data.skillId, data.index);
                    } else {
                        dialog.setInfoSkill(data.skillId, data.index, 1);
                    }
                    this.addChild(dialog);
                })
        }

        /**抬起移除技能详情对话框 */
        private up() {
            let ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        }

        /**点击合成按钮 */
        private onBtnConpound() {
            /**判断数据是否为空 */
            let judgeInfo: boolean = true;

            for (let i = 0; i < this.composeTable.length; i++) {
                if (this.composeTable[i] == null) {
                    judgeInfo = false;
                }
            }
            if (this.selectInfo.exchange_ids.length != this.composeTable.length || judgeInfo == false) {
                toast_warning(TextsConfig.TextsConfig_Hunter_Compound.notEnough);
                return;
            }
            let msg = TextsConfig.TextsConfig_Hunter_Compound.confirmCompound;
            let thisOne = this;
            TipManager.ShowConfirmCancel(msg, () => {
                Game.PlayerHunterSystem.generalCompound(this.lastSelectedHunterId, this.composeTable, () => {
                    thisOne.onClickGetHeroList(null, true);
                    // toast("合成成功");
                    //加获得猎人的动画
                    //添加遮罩
                    if (thisOne.shade == null) {
                        thisOne.shade = new CommonShade();
                    }
                    thisOne.addChild(thisOne.shade);
                    for (let i = 0; i < thisOne.listMaterialData.length; i++) {
                        let a = thisOne.listMaterial.$children[i] as HunterCompoundItemRight;
                        a.donghua();
                    }
                    egret.Tween.get(thisOne).wait(400).call(() => {
                        Game.DragonBonesManager.playAnimation(thisOne, "ui_lieren_hecheng", "armatureName", "0001_guang2", 1)
                            .then(display => {
                                display.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                                    if (thisOne.shade != null) {
                                        thisOne.removeChild(thisOne.shade);
                                    }
                                    loadUI(TavernGetGeneral)
                                        .then((taverngetgeneral: TavernGetGeneral) => {
                                            taverngetgeneral.init(thisOne);
                                            taverngetgeneral.setInfo(TableGeneralMake.Table()[thisOne.lastSelectedHunterId + 1].compose_id, 1, 1, true);
                                            thisOne.addChild(taverngetgeneral);
                                        });
                                }, thisOne)
                                display.x = thisOne.groupLog.width / 2;
                                display.y = thisOne.groupLog.height / 2;
                                thisOne.groupLog.addChild(display);
                            })
                            .catch(reason => {
                                toast(reason);
                            });
                    })

                });
            });
        }

        private itemListMaterial: Array<HunterCompoundItemRight> = [];

        private getItemListMaterial() {
            this.itemListMaterial = [];
            for (let i = 0; i < this.selectInfo.exchange_ids.length; i++) {
                let item = this.listMaterial.getElementAt(i) as HunterCompoundItemRight;
                this.itemListMaterial.push(item);
            }
        }

    }

}