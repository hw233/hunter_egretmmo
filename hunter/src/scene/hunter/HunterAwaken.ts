namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-1-5
     * 
     * @class hunter awaken.
     */
    export class HunterAwaken extends HunterSubUI {
        public groupMain: eui.Group;
        private groupHunter: eui.Group;
        private imgCurrentFrame: eui.Image;
        private imgCurrentIcon: eui.Image;
        private labelCurrentLevel: eui.BitmapLabel;
        private groupCurrentStar: eui.Group;
        private imgAwakenTime: eui.Image;
        private imgNextFrame: eui.Image;
        private imgNextIcon: eui.Image;
        private labelNextLevel: eui.BitmapLabel;
        private groupNextStar: eui.Group;
        private imgAwakenSkillIcon: eui.Image;
        private labelAwakenSkillLevel: eui.BitmapLabel;
        private labelInfoAwakenSkill: eui.Label;
        private groupUpLevel: eui.Group;
        private groupGetMaterial: eui.Group;
        private labelMaterialNumber: eui.Label;
        private imgMaterialAdd: eui.Image;
        private imgMaterialIcon: eui.Image;
        private groupSkillFragment: eui.Group;
        private labelSkillNumber: eui.Label;
        private imgSkillIcon: eui.Image;
        private btnAwaken: eui.Button;
        private groupAwakenMax: eui.Group;
        private imgAwakenFrame: eui.Image;
        private imgAwakenIcon: eui.Image;
        private labelAwakenLevel: eui.BitmapLabel;
        private groupAwakenStar: eui.Group;
        private groupAwakenSkillInfo: eui.Group;
        private imgAwakenSkillFrame: eui.Image;
        private groupAwakenSkillInfo1: eui.Group;
        private consumeNumber: number;
        private selectedHunterId: Array<number> = [];
        private selectedDollIndex: Array<number> = [];
        private skillInfoList: any[] = [];
        private itemId: number;
        private touchBeginPoint: egret.Point = new egret.Point(0, 0);

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterAwakenSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            // this.groupMain.cacheAsBitmap = true;
            this.groupGetMaterial.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMaterial, this);
            this.groupSkillFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkill, this);
            this.btnAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAwake, this);

            this.groupAwakenSkillInfo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                this.touchBeginPoint.x = e.stageX;
                this.touchBeginPoint.y = e.stageY;
                this.onHideAwakenSkillInfo();
                this.onShowAwakenSkillInfo();
            }, this);
            this.groupAwakenSkillInfo.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
                // let maxX = this.touchBeginPoint.x + this.groupAwakenSkillInfo.width;
                // let minX = this.touchBeginPoint.x - this.groupAwakenSkillInfo.width;
                // let maxY = this.touchBeginPoint.y + this.groupAwakenSkillInfo.height;
                // let minY = this.touchBeginPoint.y - this.groupAwakenSkillInfo.height;
                // if (e.stageX > maxX || e.stageX < minX) {
                //     if (e.stageY > maxY || e.stageY < minY) {
                //         this.touchBeginPoint.x = 0;
                //         this.touchBeginPoint.y = 0;
                if (Math.abs(this.touchBeginPoint.x - e.stageX) > 10) {
                    this.onHideAwakenSkillInfo();
                }
                // }
                // }
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onHideAwakenSkillInfo, this);
        }

        protected reloadGeneral() {

            this.skillInfoList = PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            if (this.skillInfoList.length < 4) {
                toast_warning(TextsConfig.TextsConfig_Hunter.noawaken);
                this.father.onSubUIEvent(HunterSubUIEvent.UnableAwaken);
                return;
            }

            this.selectedDollIndex = [];
            this.selectedHunterId = [];

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.awakePassive.level < 5) {
                this.groupHunter.visible = true;
                this.groupUpLevel.visible = true;
                this.groupAwakenMax.visible = !this.groupUpLevel.visible;

                this.setHunterInfo();
                this.setAttributeInfo();
                this.setConsumeInfo();
            } else {
                this.groupHunter.visible = false;
                this.groupUpLevel.visible = false;
                this.groupAwakenMax.visible = !this.groupUpLevel.visible;

                this.setAwakenMaxInfo();
            }

            if (Teach.isDone(teachBattle.teachPartID_Awake) == false) {
                Teach.CheckAndSetTeach(teachBattle.teachPartID_Awake);
            }

        }

        private setHunterInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let framePath = PlayerHunterSystem.Frame(this.generalId);
            let headPath = PlayerHunterSystem.Head(this.generalId);
            let time = UIConfig.UIConfig_Hunter.awakenTime[hunterInfo.awakePassive.level];;

            this.imgCurrentFrame.source = cachekey(framePath, this);
            this.imgCurrentIcon.source = cachekey(headPath, this);
            this.imgNextFrame.source = cachekey(framePath, this);
            this.imgNextIcon.source = cachekey(headPath, this);
            this.imgAwakenTime.source = cachekey(time, this);
            this.imgAwakenSkillFrame.source = cachekey("ui_frame_FrameSkillAwaken5_png", this);

            this.labelCurrentLevel.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupCurrentStar, hunterInfo.star, hunterInfo.awakePassive.level);

            this.labelNextLevel.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupNextStar, hunterInfo.star, hunterInfo.awakePassive.level + 1);
        }

        private setAttributeInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;
            let [attriCurrent, desCurrent] = PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level);
            let [attriNext, desNext] = PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level + 1);
            let [attri3,] = PlayerHunterSystem.AttriAdd(this.generalId, 3);
            let [attri5, des5] = PlayerHunterSystem.AttriAdd(this.generalId, 5);

            for (let i = 1; i <= 3; i++) {
                let imgArrowLeft = this[`imgArrowLeft${i}`] as eui.Image;
                let imgArrowUp = this[`imgArrowUp${i}`] as eui.Image;
                let labelAtt = this[`labelAtt${i}`] as eui.Label;
                let labelAttAdd = this[`labelAttAdd${i}`] as eui.Label;
                let labelAttAddNext = this[`labelAttAddNext${i}`] as eui.Label;

                if (hunterInfo.awakePassive.level == 0) {
                    imgArrowLeft.visible = false;
                    imgArrowUp.visible = false;
                    labelAttAdd.visible = false;

                    if (i == 1) {
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desNext[0]], attriNext[0]);
                        labelAttAddNext.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.unlock);
                    } else {
                        labelAtt.textColor = Helper.RGBToHex("r:120,g:120,b:120");
                        if (i == 2) {
                            labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri3[i - 1]);
                        } else {
                            labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        }

                        let str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1);
                        labelAttAddNext.textFlow = Util.RichText(str);
                    }
                } else if (hunterInfo.awakePassive.level == 1) {
                    imgArrowLeft.visible = (i < 2);
                    imgArrowUp.visible = (i < 2);
                    labelAttAdd.visible = (i < 2);

                    if (i == 1) {
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[0].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    } else {
                        labelAtt.textColor = Helper.RGBToHex("r:120,g:120,b:120");
                        if (i == 2) {
                            labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri3[i - 1]);
                        } else {
                            labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);
                        }

                        labelAttAddNext.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                } else if (hunterInfo.awakePassive.level == 2) {
                    imgArrowLeft.visible = (i < 2);
                    imgArrowUp.visible = (i < 2);
                    labelAttAdd.visible = (i < 2);

                    if (i == 1) {
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[0].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    } else if (i == 2) {
                        labelAtt.textColor = Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desNext[i - 1]], attriNext[i - 1]);

                        labelAttAddNext.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.unlock);
                    } else {
                        labelAtt.textColor = Helper.RGBToHex("r:120,g:120,b:120");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);

                        labelAttAddNext.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                } else if (hunterInfo.awakePassive.level == 3) {
                    imgArrowLeft.visible = (i <= 2);
                    imgArrowUp.visible = (i <= 2);
                    labelAttAdd.visible = (i <= 2);

                    if (i == 1) {
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    } else if (i == 2) {
                        labelAtt.textColor = Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[i - 1]], attriCurrent[i - 1]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[i - 1] - attriCurrent[i - 1]).toString() + "%";
                    } else {
                        labelAtt.textColor = Helper.RGBToHex("r:120,g:120,b:120");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);

                        labelAttAddNext.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.lock, 2 * i - 1));
                    }
                } else if (hunterInfo.awakePassive.level == 4) {
                    imgArrowLeft.visible = (i <= 2);
                    imgArrowUp.visible = (i <= 2);
                    labelAttAdd.visible = (i <= 2);

                    if (i == 1) {
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[0]], attriCurrent[0]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[0] - attriCurrent[0]).toString() + "%";
                    } else if (i == 2) {
                        labelAtt.textColor = Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[desCurrent[i - 1]], attriCurrent[i - 1]);
                        labelAttAddNext.textFlow = Util.RichText(attriNext[i - 1].toString() + "%");
                        labelAttAdd.text = (attriNext[i - 1] - attriCurrent[i - 1]).toString() + "%";
                    } else {
                        labelAtt.textColor = Helper.RGBToHex("r:0,g:0,b:0");
                        labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des5[i - 1]], attri5[i - 1]);

                        labelAttAddNext.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.unlock);
                    }
                }
            }

            let baseGeneral = PlayerHunterSystem.Table(this.generalId);
            let baseTalent = TableGeneralTalent.Item(baseGeneral.awake_passive);

            this.labelInfoAwakenSkill.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.unlock1, baseTalent.talent_name, hunterInfo.awakePassive.level + 1));
            let skillIconPath = baseTalent.path;
            this.imgAwakenSkillIcon.source = cachekey(baseTalent.path, this);
            this.labelAwakenSkillLevel.text = (hunterInfo.awakePassive.level + 1).toString();
        }

        private setConsumeInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let lastSkillInfo = this.skillInfoList[3];

            let itemId = 0;
            if (hunterInfo.awakePassive.level >= 5) {
                itemId = this.skillInfoList[3].info.uplevel_consume[hunterInfo.awakePassive.level - 1][0];
            } else {
                itemId = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level][0];
            }
            let itemSet = PlayerItemSystem.Set(itemId) as any;

            this.imgMaterialIcon.source = cachekey(itemSet.Path, this);
            this.itemId = itemSet.Info.id;

            let count = itemSet.Count;
            let materialNumber = 0;
            if (hunterInfo.awakePassive.level >= 5) {
                materialNumber = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level - 1][1];
                this.consumeNumber = lastSkillInfo.info.uplevel_generals[hunterInfo.awakePassive.level - 1];
            } else {
                materialNumber = lastSkillInfo.info.uplevel_consume[hunterInfo.awakePassive.level][1];
                this.consumeNumber = lastSkillInfo.info.uplevel_generals[hunterInfo.awakePassive.level];
            }
            this.labelMaterialNumber.text = Helper.StringFormat("%d/%d", count, materialNumber);
            Set.LabelNumberGreenAndRed(this.labelMaterialNumber, count, materialNumber);
            this.imgMaterialAdd.visible = (count < materialNumber);

            let length = this.selectedHunterId.length + this.selectedDollIndex.length;
            this.labelSkillNumber.text = Helper.StringFormat("%d/%d", length, this.consumeNumber);
            Set.LabelNumberGreenAndRed(this.labelSkillNumber, length, this.consumeNumber);
            this.imgSkillIcon.source = cachekey(PlayerHunterSystem.Head(this.generalId), this);
        }

        private setAwakenMaxInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);

            this.labelAwakenLevel.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupAwakenStar, hunterInfo.star, hunterInfo.awakePassive.level);

            let [attri, des] = PlayerHunterSystem.AttriAdd(this.generalId, hunterInfo.awakePassive.level);
            for (let i = 1; i <= 3; i++) {
                let imgArrowLeft = this[`imgArrowLeft${i}`] as eui.Image;
                let imgArrowUp = this[`imgArrowUp${i}`] as eui.Image;
                let labelAtt = this[`labelAtt${i}`] as eui.Label;
                let labelAttAdd = this[`labelAttAdd${i}`] as eui.Label;
                let labelAttAddNext = this[`labelAttAddNext${i}`] as eui.Label;
                imgArrowLeft.visible = false;
                imgArrowUp.visible = false;
                labelAttAdd.visible = false;
                labelAtt.textColor = Helper.RGBToHex("r:0,g:0,b:0");
                labelAtt.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.Attri1[des[i - 1]], attri[i - 1]);
                labelAttAddNext.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.final);
            }

            let baseGeneral = PlayerHunterSystem.Table(this.generalId);
            let baseTalent = TableGeneralTalent.Item(baseGeneral.awake_passive);

            this.labelInfoAwakenSkill.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.unlock2, baseTalent.talent_name, hunterInfo.awakePassive.level));

            let framePath = PlayerHunterSystem.Frame(this.generalId);
            let headPath = PlayerHunterSystem.Head(this.generalId);
            let skillIconPath = baseTalent.path;
            this.imgAwakenFrame.source = cachekey(framePath, this);
            this.imgAwakenIcon.source = cachekey(headPath, this);
            this.imgAwakenSkillIcon.source = cachekey(skillIconPath, this);

            this.labelAwakenSkillLevel.text = hunterInfo.awakePassive.level.toString();
        }

        private onShowAwakenSkillInfo() {
            loadUI(Common_DesSkill).then((dialog: Common_DesSkill) => {
                let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                let level = hunterInfo.awakePassive.level + 1;
                if (hunterInfo.awakePassive.level == 5) {
                    level -= 1;
                }
                dialog.setInfoLevelSkill(baseGeneralInfo.awake_passive, this.generalId, 3, level);
                dialog.name = "groupAwakenSkillInfoDialog";

                let x = (this.groupAwakenSkillInfo.width - dialog.width) * 0.5;
                let y = 0 - dialog.height;
                dialog.x = x;
                dialog.y = y;
                this.groupAwakenSkillInfo1.addChild(dialog);
            });
        }

        private onHideAwakenSkillInfo() {
            let dialog = this.groupAwakenSkillInfo1.getChildByName("groupAwakenSkillInfoDialog");
            if (dialog) this.groupAwakenSkillInfo1.removeChild(dialog);
        }

        // 获取觉醒石
        private onBtnMaterial() {
            let tbl = TableItemProp.Table();
            let have = Table.FindF(tbl, (_, v: TableItemProp) => {
                return this.itemId == v.id && v.client_transfer[0] != 0 && v.client_transfer[1] != null;
            });

            if (have) {
                loadUI(CommonOutExchangeDialog).then((dialog: CommonOutExchangeDialog) => {
                    dialog.setInfo(this.itemId, () => {
                        this.reloadGeneral();
                    });

                    dialog.show(UI.SHOW_FROM_TOP);
                });
            } else {
                loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(this.itemId, this, () => {
                        this.reloadGeneral();
                    });

                    dialog.show(UI.SHOW_FROM_TOP);
                });
            }
        }

        // 选择觉醒材料
        private onBtnSkill() {
            loadUI(HunterAwakenSelectDialog).then((dialog: HunterAwakenSelectDialog) => {

                dialog.setInfo(this.generalId, this.consumeNumber, Table.DeepCopy(this.selectedHunterId), Table.DeepCopy(this.selectedDollIndex), (hunterIds: number[], dollIndex: number[]) => {
                    this.selectedHunterId = [];
                    this.selectedHunterId = hunterIds;

                    this.selectedDollIndex = [];
                    this.selectedDollIndex = dollIndex;

                    this.setConsumeInfo();
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private onBtnAwake() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;
            let isStudy = true;
            let isUpLevel = false;
            if (hunterInfo.awakePassive.level != 0) {
                isStudy = false;
                isUpLevel = true;
            }

            let baseGeneral = PlayerHunterSystem.Table(this.generalId);
            let hunterList = [];
            for (let i = 0; i < this.selectedHunterId.length; i++) {
                let v = this.selectedHunterId[i];
                let consumeList = PlayerHunterSystem.SkillConsume(this.generalId);
                for (let i = 0; i < consumeList.length; i++) {
                    let vv = consumeList[i];
                    if (vv instanceof message.GeneralInfo) {
                        if (v == vv.general_id && vv.general_id != CommonConfig.same_aptitude_doll[baseGeneral.aptitude - 13]) {
                            hunterList.push(vv.general_id);
                        }
                    }
                }
            }

            Game.PlayerHunterSystem.awakenPassiveToDo(this.generalId, hunterList, this.selectedDollIndex.length, isStudy, isUpLevel).then(() => {
                for (let i = 0; i < hunterList.length; i++) {
                    let v = hunterList[i];
                    Game.PlayerHunterSystem.deleteHunterById(v);
                }

                this.selectedDollIndex = [];
                this.selectedHunterId = [];
                this.reloadGeneral();

                loadUI(HunterAwakenSuccess).then((successDialog: HunterAwakenSuccess) => {
                    successDialog.setInfo(this.generalId, () => {
                    });
                    successDialog.show();
                    Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);
                });

                this.father.onSubUIEvent(HunterSubUIEvent.Refresh);
            }).catch(() => {

            });
        }
    }
}