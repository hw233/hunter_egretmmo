namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-23
     * 
     * @class 猎人技能
     */
    export class HunterSkill extends HunterSubUI {
        public groupMain: eui.Group;
        private scrollerSkill: eui.Scroller;
        private listSkill: eui.List;
        private groupTeach1: eui.Group;
        private btnHelp: eui.Button;
        private labelName: eui.Label;
        private labelLevel: eui.Label;
        private labelSkillType: eui.Label;
        private labelSkillInfo: eui.Label;
        private scroller: eui.Scroller;
        private listLevelInfo: eui.List;
        private groupTeach: eui.Group;
        private groupUpLevel: eui.Group;
        private btnRefreshSkill: eui.Button;
        private labelSkillPoint: eui.Label;
        private btnAddSkillPoint: eui.Button;
        private btnUpLevel: eui.Button;
        private groupAwakenMax: eui.Group;
        private imgAwakenSkillTip: eui.Image;
        private btnGoAwaken: eui.Button;
        private groupTransform: eui.Group;
        private btnTransform: eui.Button;
        private imgConsume: eui.Image;
        private imgTransFormMax: eui.Image;
        private groupCost1: eui.Group;
        private imgFrameMeterials: eui.Image;
        private imgiconMeterials: eui.Image;
        private imgAddSkillMeterials: eui.Image;
        private labelNumMeterials: eui.Label;
        private groupCost2: eui.Group;
        private imgAdd: eui.Image;
        private imgFrameSkillFrag: eui.Image;
        private imgIconSkillFrag: eui.Image;
        private imgMakeSkillFragment: eui.Image;
        private imgAddSkillFragMent: eui.Image;
        private labelNumSkillFrag: eui.Label;

        private listSkillData: eui.ArrayCollection = new eui.ArrayCollection();
        private listLevelInfoData: eui.ArrayCollection = new eui.ArrayCollection();
        private lastSelectedSkillIndex: number = null;
        private skillInfoList;
        private lastSkillIndex: number;
        public subitem: HunterSkillItem;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterSkillSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this);
            }, this)
            this.init();
            if (Device.isReviewSwitch) {
                this.btnHelp.visible = false;
            }
        }

        private init() {
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
            this.btnRefreshSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRefreshSkill, this);
            this.btnAddSkillPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddSkillPoint, this);
            this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpLevel, this);
            this.btnGoAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoAwaken, this);
            this.btnTransform.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTransform, this);
            this.groupCost1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtngroupCost1, this);
        }

        protected reloadGeneral() {
            if (this.generalId == null || this.generalId == 0) return;

            if (this.lastSelectedSkillIndex == null) {
                this.lastSelectedSkillIndex = 0;
            }
            this.lastSkillIndex = this.lastSelectedSkillIndex;
            this.loadSkillList();
            this.loadLevelInfoList();
            this.father.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            egret.Tween.get(this).wait(200).call(() => {
                this.SelectSkill(this.lastSelectedSkillIndex, true);
            });
        }

        private FreshGeneral(smooth: boolean) {
            this.listSkillData.removeAll();
            this.skillInfoList = PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            this.loadSkillList();
            egret.Tween.get(this).wait(200).call(() => {
                this.SelectSkill(this.lastSelectedSkillIndex, smooth);
            })

        }

        public SelectSkill(index: number, smooth?: boolean) {
            this.lastSelectedSkillIndex = index;
            if (this.listSkillData.length == 1) {
                if (this.lastSkillIndex >= 2 || this.lastSelectedSkillIndex >= 3) {
                    this.lastSkillIndex = 1;
                    this.lastSelectedSkillIndex = 1;
                }
            }

            let data = this.listSkillData.getItemAt(this.lastSelectedSkillIndex) as HunterSkillItemData;
            this.listSkillData.replaceItemAt(data, this.lastSelectedSkillIndex);
            if (this.subitem != null) {
                this.subitem.SetSelect(true);
            }
            if (this.subitem != null && this.lastSkillIndex != null && this.lastSkillIndex != this.lastSelectedSkillIndex) {
                this.subitem.SetSelect(false);
            }
            this.lastSkillIndex = this.lastSelectedSkillIndex;
            this.loadLevelInfoList();
            this.loadSkillList();
        }

        private loadSkillList() {
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            this.listSkillData.removeAll();
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            //table_general_transfer 猎人变身表
            let transferTbl = TableGeneralTransfer.Item(this.generalId % CommonConfig.general_id_to_index_multiple);

            if (hunterInfo.transfer_level != 0 && transferTbl.transfer_skill != 0) {
                this.scrollerSkill.scaleX = 0.8;
                this.scrollerSkill.scaleY = 0.8;
                this.scrollerSkill.width = 600;
            } else {
                this.scrollerSkill.scaleX = 1;
                this.scrollerSkill.scaleY = 1;
                this.scrollerSkill.width = 500;
            }

            for (let i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                let v = baseGeneralInfo.skill_ids[i];
                let data = new HunterSkillItemData();
                data.index = i;
                data.generalId = this.generalId;
                data.skillId = v;
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (baseGeneralInfo.init_passive.length > 0 && baseGeneralInfo.init_passive[0] != 0) { // 被动技能
                let data = new HunterSkillItemData();
                data.index = 2;
                data.generalId = this.generalId;
                data.skillId = baseGeneralInfo.init_passive[0];
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (baseGeneralInfo.awake_passive != 0) { // 觉醒技能
                let data = new HunterSkillItemData();
                data.index = 3;
                data.generalId = this.generalId;
                data.skillId = baseGeneralInfo.awake_passive;
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (hunterInfo.transfer_level != 0 && transferTbl.transfer_skill != 0) {
                let data = new HunterSkillItemData();
                data.index = 4;
                data.generalId = this.generalId;
                data.skillId = transferTbl.transfer_skill;
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (this.lastSelectedSkillIndex >= this.listSkillData.length) {
                this.lastSelectedSkillIndex = 0;
            }
            let data = this.listSkillData.getItemAt(this.lastSelectedSkillIndex) as HunterSkillItemData;
            data.isSelected = true;
            this.listSkillData.replaceItemAt(data, this.lastSelectedSkillIndex);

            this.listSkill.dataProvider = this.listSkillData;
            this.listSkill.itemRenderer = HunterSkillItem;
            this.listSkill.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSkillListTap, this);
        }

        private onSkillListTap(e: eui.ItemTapEvent) {
            Game.SoundManager.playEffect("ui_dianji_anniu_mp3");
            if (e.itemIndex == this.lastSelectedSkillIndex) return;

            this.listLevelInfo.scrollV = 0;
            let lastData = this.listSkillData.getItemAt(this.lastSelectedSkillIndex) as HunterSkillItemData;
            if (lastData) {
                lastData.isSelected = false;
                this.listSkillData.replaceItemAt(lastData, this.lastSelectedSkillIndex);
            }

            let data = this.listSkillData.getItemAt(e.itemIndex) as HunterSkillItemData;
            data.isSelected = !data.isSelected;
            this.listSkillData.replaceItemAt(data, e.itemIndex);

            this.lastSelectedSkillIndex = e.itemIndex;

            this.loadLevelInfoList();
            this.scroller.viewport.contentHeight = 0;
        }

        private loadLevelInfoList() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;
            let transferTbl = TableGeneralTransfer.Item(this.generalId % CommonConfig.general_id_to_index_multiple);
            let currentSkilllLevel = 0;
            let skillType = "";
            if (this.lastSelectedSkillIndex == 2) { // 被动技
                currentSkilllLevel = hunterInfo.passives[0].level;
                skillType = TextsConfig.TextsConfig_Hunter.passive_skill;
            } else if (this.lastSelectedSkillIndex == 3) { // 觉醒技
                currentSkilllLevel = hunterInfo.awakePassive.level;
                skillType = TextsConfig.TextsConfig_Hunter.pledge_skill;
            } else if (this.lastSelectedSkillIndex == 0) { // 自动技
                currentSkilllLevel = hunterInfo.skills[this.lastSelectedSkillIndex].level;
                skillType = TextsConfig.TextsConfig_Hunter.auto_skill;
            } else if (this.lastSelectedSkillIndex == 4) { // 变身技
                currentSkilllLevel = hunterInfo.transfer_level;
                skillType = TextsConfig.TextsConfig_Hunter.change_skill
            } else { // 手动技
                currentSkilllLevel = hunterInfo.skills[this.lastSelectedSkillIndex].level;
                skillType = TextsConfig.TextsConfig_Hunter.active_skill;
            }
            // if (currentSkilllLevel != 0) {
            //     this.labelLevel.text = "Lv " + currentSkilllLevel.toString();   
            // } else {
            //     this.labelLevel.text = "";
            // }
            this.labelSkillType.text = skillType;

            this.skillInfoList = PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            let name = this.skillInfoList[this.lastSelectedSkillIndex].name;
            if (currentSkilllLevel != 0) {
                name += "   Lv " + currentSkilllLevel.toString();
            }
            this.labelName.text = name;

            this.labelSkillInfo.textFlow = Util.RichText(this.skillInfoList[this.lastSelectedSkillIndex].des);

            let list = [];
            if (this.lastSelectedSkillIndex == 3) {
                for (let i = 0; i < (this.skillInfoList[this.lastSelectedSkillIndex].upList).length; i++) {
                    let v = this.skillInfoList[this.lastSelectedSkillIndex].upList[i];
                    if (i <= 4) {
                        list.push(v);
                    }
                }
            } else if (this.lastSelectedSkillIndex == 4) {
                for (let i = 0; i < (this.skillInfoList[this.lastSelectedSkillIndex].upList).length; i++) {
                    let v = this.skillInfoList[this.lastSelectedSkillIndex].upList[i];
                    if (i < CommonConfig.general_max_transfer_level) {
                        list.push(v);
                    }
                }
            } else {
                list = Table.DeepCopy(this.skillInfoList[this.lastSelectedSkillIndex].upList);
            }
            let maxLevel = 0;
            if (this.lastSelectedSkillIndex == 3 || this.lastSelectedSkillIndex == 4) {
                maxLevel = list.length;
            } else {
                maxLevel = PlayerHunterSystem.GetMaxLevel(this.generalId);
            }

            this.listLevelInfoData.removeAll();
            for (let i = 0; i < maxLevel; i++) {
                let data = new HunterSkillInfoItemData();
                data.level = i + 1;
                data.generalId = this.generalId;
                data.info = list[i];
                data.isFade = (currentSkilllLevel > i);
                this.listLevelInfoData.addItem(data);
            }
            if ((maxLevel) < list.length) {
                let data = new HunterSkillInfoItemData();
                if (Game.PlayerHunterSystem.queryHunter(this.generalId).star == CommonConfig.general_max_star) {
                    data.vis = true;
                } else {
                    data.vis = false;
                }
                this.listLevelInfoData.addItem(data);
            }
            this.listLevelInfo.dataProvider = this.listLevelInfoData;
            this.listLevelInfo.itemRenderer = HunterSkillInfoItem;

            let focIndex = 1;
            if (currentSkilllLevel > 2) {
                this.listLevelInfo.selectedIndex = 1;
            }

            this.groupUpLevel.visible = (this.lastSelectedSkillIndex != 3);
            this.groupAwakenMax.visible = (this.lastSelectedSkillIndex == 3);
            this.groupTransform.visible = (this.lastSelectedSkillIndex == 4);
            if (this.lastSelectedSkillIndex == 3) {
                let path = "";
                if (hunterInfo.awakePassive.level == 0) {
                    path = UIConfig.UIConfig_Hunter.awakenSkill[0];
                } else {
                    this.btnGoAwaken.visible = (hunterInfo.awakePassive.level != 5);
                    if (hunterInfo.awakePassive.level == 5) {
                        this.imgAwakenSkillTip.horizontalCenter = 0;
                        path = UIConfig.UIConfig_Hunter.awakenSkill[2];
                    } else {
                        this.imgAwakenSkillTip.horizontalCenter = NaN;
                        this.imgAwakenSkillTip.left = 20;
                        path = UIConfig.UIConfig_Hunter.awakenSkill[1];
                    }
                }
                this.imgAwakenSkillTip.source = cachekey(path, this);
            } else if (this.lastSelectedSkillIndex == 4) {
                this.groupUpLevel.visible = false;
                this.groupAwakenMax.visible = false;
                if (hunterInfo.transfer_level != CommonConfig.general_max_transfer_level) {
                    this.imgTransFormMax.visible = false;
                    this.groupCost2.visible = true;
                    this.groupCost1.visible = true;
                    this.btnTransform.visible = true;
                    this.imgConsume.visible = true;

                    let itemSet1 = PlayerItemSystem.Set(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]) as any;
                    this.labelNumMeterials.text = (PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]) + "/" + transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0])
                    Set.LabelNumberGreenAndRed(this.labelNumMeterials, PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]), transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0])
                    this.imgiconMeterials.source = itemSet1.Path;
                    this.imgAddSkillMeterials.visible = (PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]) < transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0])
                    if (transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1] != null) {
                        this.groupCost2.visible = true;
                        this.groupCost1.x = 80;
                        let itemSet2 = PlayerItemSystem.Set(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]) as any;
                        this.labelNumSkillFrag.text = (PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]) + "/" + transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][1])
                        Set.LabelNumberGreenAndRed(this.labelNumSkillFrag, PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]), transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0])
                        this.imgIconSkillFrag.source = itemSet2.Path;
                        this.imgAddSkillFragMent.visible = (PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]) < transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0])

                    } else {
                        this.groupCost2.visible = false;
                        this.groupCost1.x = 140;
                    }
                } else {
                    this.imgTransFormMax.visible = (true)
                    this.groupCost2.visible = (false)
                    this.groupCost1.visible = (false)
                    this.btnTransform.visible = (false)
                    this.imgConsume.visible = (false)
                }
            } else {
                this.labelSkillPoint.text = hunterInfo.skill_num.toString();
                Set.LabelNumberGreenAndRed(this.labelSkillPoint, hunterInfo.skill_num, 1);
            }
        }


        public onItemTap(isTouchBegin: boolean, data: HunterSkillItemData) {
            let dialog = this.groupMain.getChildByName("hunter-skill-description") as Common_DesSkill;
            if (dialog) this.groupMain.removeChild(dialog);

            if (isTouchBegin) {
                loadUI(Common_DesSkill).then((dialog: Common_DesSkill) => {
                    let item = this.listSkill.getElementAt(data.index) as HunterSkillItem;
                    if (item) {
                        dialog.x = this.listSkill.parent.x + item.x + item.width * 0.5 - dialog.width * 0.5;
                        dialog.y = this.listSkill.parent.y + item.y + item.height;
                    }
                    dialog.name = "hunter-skill-description";
                    let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                    if (data.index == 2 || data.index == 3) {
                        dialog.setInfoLevelSkill(data.skillId, this.generalId, data.index);
                    } else {
                        dialog.setInfoSkill(data.skillId, data.index, hunterInfo.skills[data.index].level);
                    }
                    this.groupMain.addChild(dialog);
                });
            }
        }

        /**抬起移除技能详情对话框 */
        private up() {
            let dialog = this.groupMain.getChildByName("hunter-skill-description") as Common_DesSkill;
            if (dialog) this.groupMain.removeChild(dialog);
        }

        private onBtnHelp() {
            loadUI(HelpDialog)
                .then((dialog: HelpDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.loadBySmallType(305);
                });
        }

        private onBtnRefreshSkill() {
            let msg = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_recycle_tips, CommonConfig.general_reset_skill_token);

            TipManager.ShowConfirmCancel(msg, () => {
                Game.PlayerHunterSystem.skillReset(this.generalId)
                    .then(() => {
                        toast(Helper.convertStringWithColor(TextsConfig.TextsConfig_Hunter.recycle_success, "green"));
                        this.reloadGeneral();
                    }).catch(() => {

                    });
            });
        }

        private onBtnAddSkillPoint() {
            if (this.lastSelectedSkillIndex == 3) return;

            loadUI(HunterSkillAddDialog).then((dialog: HunterSkillAddDialog) => {
                dialog.setInfo(this.generalId, () => {
                    this.reloadGeneral();
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private onBtnUpLevel() {
            if (this.lastSelectedSkillIndex == 2) {
                Game.PlayerHunterSystem.passiveUpLevel(this.generalId).then(() => {
                    this.onSkillUpLevelSuccess();
                }).catch(() => {

                });
            } else {
                Game.PlayerHunterSystem.skillUpLevel(this.generalId, this.lastSelectedSkillIndex + 1).then(() => {
                    this.onSkillUpLevelSuccess();
                }).catch(() => {

                });
            }
        }

        private onSkillUpLevelSuccess() {
            let currentBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            if (currentBattleValue > this.father.battleValue) {

                CommonTipBmfont.promptBattleValue(this.father.battleValue, currentBattleValue);

                this.father.battleValue = currentBattleValue;

            }
            this.reloadGeneral();
        }

        private onBtnGoAwaken() {
            this.father.onSubUIEvent(HunterSubUIEvent.GoAwaken);
        }
        private itemList: Array<HunterSkillItem> = [];
        private getItemList() {
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            for (let i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                let item = this.listSkill.getElementAt(i) as HunterSkillItem;
                this.itemList.push(item);
            }
        }

        private onBtnTransform() {
            PlayerHunterSystem.GeneralTransferSkillUp(this.generalId).then(() => {
                let transferTbl = TableGeneralTransfer.Item(this.generalId % CommonConfig.general_id_to_index_multiple);
                let transfer_level = Game.PlayerHunterSystem.queryHunter(this.generalId).transfer_level;
                loadUI(HunterTransUpLevelPop).then((dialog: HunterTransUpLevelPop) => {
                    dialog.SetInfo(transferTbl.transfer_skill, transfer_level, this, () => {

                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                })
            }).catch(() => {

            })
        }

        private onBtngroupCost1() {
            let genInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let transferTbl = TableGeneralTransfer.Item(this.generalId % CommonConfig.general_id_to_index_multiple);
            let goodId = transferTbl.uplevel_consume[genInfo.transfer_level - 1][0];
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(goodId, this, () => {

                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

    }

}