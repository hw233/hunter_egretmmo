namespace zj {
    /**猎人合成
     * 
     *邢利伟
     *
     *2018.12.19
     *
     * @class HunterHeroeUpCompound
     * @extends {eui.ItemRenderer}
     */

    const enum HunterCompoundType {
        /**有材料已选择 */
        MetSelect = 1,
        /**有材料未选择 */
        MetNoSelect = 2,
        /**空项 */
        Empty = 2,
        /**无材料 */
        NoMaterials = 3
    }

    export class HunterCompoundItemRight extends eui.ItemRenderer {
        private groupIcon: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private labelLevel: eui.BitmapLabel;
        private imgBreak: eui.Image;
        private imgGrade: eui.Image;
        private groupStar: eui.Group;
        private imgShadow: eui.Image;
        private imgBingo: eui.Image;
        private imgLock: eui.Image;
        private groupFather: eui.Group;
        private group: eui.Group;
        /**类型 */
        private type: HunterCompoundType;
        /**武将ID */
        private generalId: number = 0;
        /**选中的英雄 */
        public breakSelectedGenerals = [];
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCompoundItemRightSkin.exml";
            this.init();
            cachekeys(<string[]>UIResource["HunterCompoundItemRight"], null);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        /**初始化 */
        private init() {
            this.groupIcon.visible = true;
            this.imgLock.visible = false;
            this.imgShadow.visible = true;
            this.imgGrade.visible = true;
            this.type = HunterCompoundType.Empty;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this)
        }

        /**数据源刷新被动执行 */
        protected dataChanged() {
            closeCache(this.groupFather);
            this.setType(this.data);
            this.updateViews(this.data);
            setCache(this.groupFather);
        }

        /**设置类型 */
        private setType(data: HunterCompoundItemRightData) {
            let bSelect = this.data.father.composeTable[data.index] != null;
            /**是否有武将合成材料(武将，等级，星级，觉醒等级) */
            let canSelect = false;
            let selectInfos = [];
            if (data.composeId != -1) {
                selectInfos[0] = data.id;
                selectInfos[1] = data.level;
                selectInfos[2] = data.star;
                selectInfos[3] = data.awaken;
                selectInfos[4] = data.aptitude;
            }
            canSelect = PlayerHunterSystem.haveCompose(this.data.father.composeTable, selectInfos, true, PlayerHunterSystem.GeneralsIdInDefence());

            if (data.composeId == -1) {
                this.type = HunterCompoundType.Empty;
            } else if (bSelect) {
                this.type = HunterCompoundType.MetSelect;
            } else if (canSelect) {
                this.type = HunterCompoundType.MetNoSelect;
            } else {
                this.type = HunterCompoundType.NoMaterials;
            }
        }

        /**更新视图 */
        private updateViews(data: HunterCompoundItemRightData) {
            egret.Tween.get(this.groupFather).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
            if (data.composeId == -1) {
                this.groupIcon.visible = false;
                this.imgLock.visible = true;
                return;
            }
            let hunterInfo: message.GeneralInfo; //= Game.PlayerHunterSystem.queryHunter(data.composeId);
            if (this.generalId == 0 || this.generalId == null) {
                if (this.data.father.composeTable[data.index] != null) {
                    this.generalId = this.data.father.composeTable[data.index];
                } else if (data.id != 0) {
                    this.generalId = data.id;
                } else {
                    this.generalId = 0;
                }
            }

            if (this.generalId < CommonConfig.general_id_to_index_multiple) {
                hunterInfo = new message.GeneralInfo();
                hunterInfo.star = data.star;
                hunterInfo.level = data.level;
                hunterInfo.step = 1;
                hunterInfo.awakePassive.level = data.awaken;
            } else {
                hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            }

            let pathHead = null;
            let pathAptitude = "";
            if (this.generalId == 0) {
                pathHead = UIConfig.UIConfig_General.hunter_donnot_know;
                pathAptitude = UIConfig.UIConfig_General.hunter_grade[data.aptitude];
                this.imgGrade.source = cachekey(pathAptitude, this);
            } else {
                pathHead = PlayerHunterSystem.Head(this.generalId);
                pathAptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(this.generalId).aptitude];
                this.imgGrade.source = cachekey(pathAptitude, this);
            }

            this.imgIcon.source = cachekey(pathHead, this);
            this.labelLevel.text = String(hunterInfo.level);
            Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);

            this.imgLock.visible = false;
            if (this.type == HunterCompoundType.NoMaterials) {
                //无材料，显示普通框，遮罩，无对号
                this.imgShadow.visible = true;
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.selFrame[0], this);
                this.imgBingo.visible = false;
            } else if (this.type == HunterCompoundType.MetNoSelect) {
                //未选择，显示普通框，无遮罩，无对号
                this.imgShadow.visible = false;
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.selFrame[0], this);
                this.imgBingo.visible = false;
            } else if (this.type == HunterCompoundType.MetSelect) {
                //已选择，显示特殊框，无遮罩，有对号
                this.imgShadow.visible = false;
                this.imgFrame.source = UIConfig.UIConfig_Role.selFrame[1];
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.selFrame[1], this);
                this.imgBingo.visible = true;
            }
            this.generalId = 0;
        }


        private onTouchTap() {
            loadUI(HunterBreakPopDialog)
                .then((dialog: HunterBreakPopDialog) => {
                    let data: HunterCompoundItemRightData = this.data;
                    dialog.setHunterCompoundInfo(data, () => {
                        // if (isClose) {
                        //     this.data.father.composeTable[data.index] = [];
                        // } else {
                        if (this.data.father.composeTable.length > 0) {
                            this.generalId = this.data.father.composeTable[data.index];
                        }
                        data.father.listMaterialData.refresh();
                        // this.setType(data);
                        // this.updateViews(data);

                        // }
                        // egret.Tween.get(this).wait(1000).call(() => { data.father.load(); });
                    }, this);
                    Game.UIManager.pushDialog(dialog, UI.SHOW_FROM_TOP);
                });
        }

        /**合成时出现的龙骨动画 */
        public donghua() {
            Game.DragonBonesManager.playAnimation(this, "ui_lieren_hecheng", "armatureName", "0000_guang1", 1)
                .then(display => {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, () => {

                    }, this)
                    display.x = this.group.width / 2;
                    display.y = this.group.height / 2;
                    this.group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }


    export class HunterCompoundItemRightData {
        /**在父类list中的索引 */
        index: number;

        /**武将id  */
        composeId: number;

        /**父类 */
        father: HunterCompound;

        /**武将ID */
        id: number

        /**武将等级 */
        level: number

        /**武将星星 */
        star: number;

        /** */
        awaken: number;

        /*能力*/
        aptitude: number;
    }
}