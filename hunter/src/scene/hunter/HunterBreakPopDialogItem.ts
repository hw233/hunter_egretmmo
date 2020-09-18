namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-7
     * 
     * @class 猎人突破添加技能Item
     */
    export class HunterBreakPopDialogItem extends eui.ItemRenderer {
        private groupNo: eui.Group;
        private labelNoMet: eui.Label;
        private labelMaterialsTip: eui.Label;
        private groupHave: eui.Group;
        private labelMaterialPower: eui.Label;
        private labelMaterialNumber: eui.Label;
        private imgBingoSelect: eui.Image;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private labelNumber: eui.Label;
        private imgGrade: eui.Image;
        private groupStar: eui.Group;
        private imgShadow: eui.Image;
        private imgLock: eui.Image;
        private imgBreak: eui.Image;
        public defenceType: number;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakPopDialogItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterBreakPopDialogItem"], null);
        }

        protected dataChanged() {
            this.updataView(this.data);
        }

        private updataView(data: HunterBreakPopDialogItemData) {
            // 在防守阵容的猎人
            let defenceList = PlayerHunterSystem.GeneralsIdInDefence();
            let defenceInfo = Table.FindR(defenceList, (_, v) => {
                return v[0] == data.generalId;
            });

            // 上锁
            if (defenceInfo != null &&
                defenceInfo[0] != null &&
                defenceInfo[1] != null &&
                data.index != 0) {
                this.imgShadow.visible = true;
                this.imgLock.visible = true;
                this.defenceType = defenceInfo[1];
            } else {
                this.imgShadow.visible = false;
                this.imgLock.visible = false;
                this.defenceType = 0;
            }

            // 隐藏或者显示
            this.groupHave.visible = (data.index != 0);
            this.groupNo.visible = (data.index == 0);

            // 通用设置
            if (data.index != 0 && data.index != null) {
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
                if (hunterInfo == null) return;

                // 设置战斗力提示
                this.labelMaterialPower.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.battleValue, Set.NumberUnit3(hunterInfo.battleValue));
                // 设置数量
                this.labelMaterialNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.cardNum, hunterInfo.potatoInfo.length);

                // 设置选中
                this.imgBingoSelect.visible = data.isSelected;

                // 设置边框
                let framePath = PlayerHunterSystem.Frame(data.generalId);
                this.imgFrame.source = cachekey(framePath, this);
            }

            if (data.type == HunterBreakPopDialogType.HunterBreak) {
                this.updateHunterBreakInfo(data);
            } else if (data.type == HunterBreakPopDialogType.SkillUpLevel) {
                this.updateSkillUpLevelInfo(data);
            } else if (data.type == HunterBreakPopDialogType.HunterCompound) {
                this.updateHunterCompoundInfo(data);
            }
        }

        // 更新猎人突破
        private updateHunterBreakInfo(data: HunterBreakPopDialogItemData) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
            let breakInfo = PlayerHunterSystem.HunterBreak(data.breakLevel);
            let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);
            if (hunterInfo == null || breakInfo == null || baseGeneralInfo == null) return;

            if (data.index == 0) {
                // 设置材料满足提示
                if (data.father.type1 == 0) {
                    this.labelNoMet.text = TextsConfig.TextsConfig_Hunter_Break.noMet;
                } else {
                    this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.hunterMet, baseGeneralInfo.general_name);
                }
                // 设置材料满足条件
                let level = breakInfo.exchange_level[0];
                let star = breakInfo.exchange_star[0];
                let awaken = breakInfo.exchange_awaken[0];
                if (data.father.type1 == 0) {
                    this.labelMaterialsTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.needConditionNoAwake, breakInfo.exchange_star[breakInfo.exchange_star.length - 1], breakInfo.exchange_break[breakInfo.exchange_break.length - 1]);
                } else {
                    this.labelMaterialsTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.needCondition, breakInfo.exchange_star[0], breakInfo.exchange_break[0]);
                }
                // this.imgGrade.visible = false
                // this.imgBreak.visible = false;
            }

            // 设置头像信息
            let headPath = PlayerHunterSystem.Head(data.generalId);
            let aptitudePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            if (data.father.type1 == 0 && data.index === 0) {
                headPath = UIConfig.UIConfig_General.hunter_donnot_know;
                this.imgGrade.visible = false;
            } else {
                this.imgGrade.visible = true;
            }
            this.imgIcon.source = cachekey(headPath, this);
            this.imgGrade.source = cachekey(aptitudePath, this);

            let star = breakInfo.exchange_star[0];
            if (data.index == 0) {
                this.labelNumber.text = String(breakInfo.exchange_level[0]);
                if (data.father.type1 == 0) {
                    Helper.SetHeroAwakenStar(this.groupStar, breakInfo.exchange_star[breakInfo.exchange_star.length - 1], breakInfo.exchange_awaken[0]);
                } else {
                    Helper.SetHeroAwakenStar(this.groupStar, star, breakInfo.exchange_awaken[0]);
                }
            } else {
                this.labelNumber.text = String(hunterInfo.level);
                Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            }
            Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            // this.imgBreak.visible = false;
        }

        // 更新技能升级
        private updateSkillUpLevelInfo(data: HunterBreakPopDialogItemData) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);

            let upLevelInfo = TableBreakSkillUplevel.Item(data.id);
            let exchangeAptitude = upLevelInfo.exchange_aptitude[data.skillLevel - 1][0];
            let exchangeLevel = upLevelInfo.exchange_level[data.skillLevel - 1][0];
            let exchangeStar = upLevelInfo.exchange_star[data.skillLevel - 1][0];
            let exchangeAwaken = upLevelInfo.exchange_star[data.skillLevel - 1][0];
            let exchangeId = upLevelInfo.exchange_ids[data.skillLevel - 1][0];

            if (data.index == 0) {
                // 设置材料满足提示
                if (exchangeAptitude == 0) {
                    this.labelNoMet.text = TextsConfig.TextsConfig_Hunter_Break.noMet;
                } else {
                    let grade = TextsConfig.TextsConfig_Hunter_Compound.hunter_grade[exchangeAptitude];
                    this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.noMet2, grade);
                }
                // 设置材料满足条件
                if (exchangeAwaken == 0) {
                    let materialTipString = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.needConditionNoAwake, exchangeLevel, exchangeStar);
                    this.labelMaterialsTip.textFlow = Util.RichText(materialTipString);
                } else {
                    let materialTipString = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.needCondition, exchangeLevel, exchangeStar, exchangeAwaken);
                    this.labelMaterialsTip.textFlow = Util.RichText(materialTipString);
                }
            }

            // 设置头像信息
            let headPath = PlayerHunterSystem.Head(data.generalId);
            if (data.index == 0 && exchangeId == 0) {
                headPath = UIConfig.UIConfig_General.hunter_donnot_know;
            }
            let gradePath = "";
            if (data.index == 0) {
                this.imgGrade.visible = (exchangeAptitude != 0);
                gradePath = UIConfig.UIConfig_General.hunter_grade[exchangeAptitude];

                // set yellow color star
                Helper.SetHeroAwakenStar(this.groupStar, exchangeStar, exchangeLevel - 1);
                this.labelNumber.text = exchangeLevel.toString();
            } else {
                this.imgGrade.visible = true;
                gradePath = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.generalId).aptitude];

                Helper.SetHeroAwakenStar(this.groupStar, exchangeStar, hunterInfo.awakePassive.level);
                this.labelNumber.text = hunterInfo.level.toString();
            }

            this.imgIcon.source = cachekey(headPath, this);
            this.imgGrade.source = cachekey(gradePath, this);
        }

        /** 猎人合成 */
        private updateHunterCompoundInfo(data: HunterBreakPopDialogItemData) {
            // 设置头像信息
            let pathHead = "";
            let pathAptitude = "";
            if (data.generalId == data.father.selectInfos[0]) {

                let hunterInfo = new message.GeneralInfo;
                let hunter = data.father.selectInfos;
                hunterInfo.general_id = hunter[0];
                hunterInfo.star = hunter[2];
                hunterInfo.level = hunter[1];
                hunterInfo.awakePassive = hunter[3];


                if (data.generalId == 0) {
                    pathHead = UIConfig.UIConfig_General.hunter_donnot_know;
                    pathAptitude = UIConfig.UIConfig_General.hunter_grade[data.father.selectInfos[4]];
                } else {
                    pathHead = PlayerHunterSystem.Head(data.generalId);
                    pathAptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.generalId).aptitude];
                }

                this.labelNumber.text = String(hunterInfo.level);

                let condition = data.father.selectInfos
                let level = condition[1];
                let star = condition[2];
                let awaken = condition[3];
                let strAwaken = Helper.GetNumCH(awaken);
                if (data.father.type == HunterBreakPopDialogType.HunterCompound) {
                    let gen = { star: Number, level: Number };
                    gen.star = data.father.selectInfos[2];
                    gen.level = data.father.selectInfos[3];
                    Helper.SetHeroAwakenStar(this.groupStar, gen.star, gen.level);
                }

                if (awaken == 0) {
                    this.labelMaterialsTip.text = Helper.StringFormat("条件:%s级;%s星", level, star);
                } else {
                    this.labelMaterialsTip.text = Helper.StringFormat("条件:%s级;%s星;%s次觉醒", level, star, strAwaken);
                }
                let grade = null;
                Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
                if (data.index == 0) {
                    if (data.generalId == 0) {
                        grade = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.hunter_grade[data.father.selectInfos[4]]);
                        this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.noMet, grade);
                    } else {
                        this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.hunterMet, PlayerHunterSystem.Table(hunterInfo.general_id).general_name);
                    }
                }
            } else {
                pathHead = PlayerHunterSystem.Head(data.generalId);
                pathAptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.generalId).aptitude];

                let general = Game.PlayerHunterSystem.queryHunter(data.generalId);
                this.labelNumber.text = String(general.level);

                Helper.SetHeroAwakenStar(this.groupStar, general.star, general.awakePassive.level);
                Helper.GetBreakLevelToPath(this.imgBreak, general.break_level);

                let battleValue = general.battleValue;
                let cardNum = general.potatoInfo.length;
                this.labelMaterialPower.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.battleValue, Set.NumberUnit3(battleValue));
                this.labelMaterialNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.cardNum, cardNum);
            }

            this.imgGrade.source = cachekey(pathAptitude, this);
            this.imgIcon.source = cachekey(pathHead, this);
        }
    }

    export class HunterBreakPopDialogItemData {
        /** 武将ID */
        generalId: number;

        /** 索引， 第一个特殊处理 */
        index: number;

        /** 突破等级 -- 突破升级界面 */
        breakLevel: number = null;

        /** 技能等级 -- 技能升级界面 */
        skillLevel: number = null;

        /** 显示猎人总数  */
        // length: number;

        /** 是否选中 */
        isSelected: boolean = false;

        /** 查表ID -- 技能升级界面 */
        id: number = null;

        /** 类型 */
        type: HunterBreakPopDialogType = 0;

        father: HunterBreakPopDialog = null;
    }
}