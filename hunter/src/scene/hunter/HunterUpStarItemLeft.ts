namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-11
     * 
     * @class 猎人升星左侧猎人item
     */

    export enum HunterState {
        /** 主角 */
        Base = 1,

        /** 材料且选中 */
        Select = 2,

        /** 空项 */
        Empty = 3,

        /** 非材料 */
        NoUse = 4,

        /** 材料未选中  */
        NoSelect = 5,

        /** 星级相同但是，材料在防守阵容 */
        Defence = 6,

        /** 首次进入武将 */
        BFirst = 7
    }

    export class HunterUpStarItemLeft extends HunterBaseItem {
        private groupAll: eui.Group;
        private groupCache: eui.Group;
        private imgSelectedFrame: eui.Image;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private groupStar: eui.Group;
        private labelLevel: eui.BitmapLabel;
        private imgBreak: eui.Image;
        private imgGrade: eui.Image;
        private imgLock: eui.Image;
        private groupBingo: eui.Group;
        private imgShadow: eui.Image;
        private imgBingo: eui.Image;

        public type: HunterState = HunterState.Empty;
        public defenceType: number = 0;

        constructor() {
            super();

            this.skinName = "resource/skins/hunter/HunterUpStarItemLeftSkin.exml";
            cachekeys(<string[]>UIResource["HunterUpStarItemLeft"], null);
        }

        /** 长按 */
        public onLongPress(data: HunterUpStarItemLeftData) {
            if (data == null || data.generalId == 0 || data.generalId == null) return;

            this.isInLongPress = true;
            if (Game.PlayerHunterSystem.huntervis == true) {
                Game.PlayerHunterSystem.huntervis = false;
                loadUI(Common_ViewHeroDetail)
                    .then((dialog: Common_ViewHeroDetail) => {
                        dialog.setInfo(data.generalId, () => {
                            Game.PlayerHunterSystem.huntervis = true;
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        // 恢复按钮状态
        public resumeLongPressState() {
            this.isInLongPress = false;
        }

        protected dataChanged() {
            this.updateView(this.data);
        }

        private updateView(data: HunterUpStarItemLeftData) {
            closeCache(this.groupCache);
            this.initBase();
            this.setType(data);
            this.setItemInfo(data);
            // RES.addEventListener(egret.Event.COMPLETE, () => {
            setCache(this.groupCache);
            // }, this);
        }

        private initBase() {
            this.groupAll.visible = true;
            this.groupStar.removeChildren();

            this.imgSelectedFrame.visible = false;
            this.imgFrame.visible = true;

            this.groupBingo.visible = false;
            this.imgShadow.visible = true;
            this.imgBingo.visible = false;
            let path = UIConfig.UIConfig_Hunter.upStarColor[1];
            this.imgBingo.source = cachekey(path, this);

            this.imgLock.visible = false;
            this.type = HunterState.Empty;

            this.defenceType = 0;
        }

        private setType(data: HunterUpStarItemLeftData) {
            if (data.fatherGeneralId == 0 || data.fatherGeneralId == null) {
                if (data.generalId == 0 || data.generalId == null) {
                    this.type = HunterState.Empty;
                } else {
                    this.type = HunterState.NoSelect;
                }
            } else {
                if (data.generalId == 0 || data.generalId == null) {
                    this.type = HunterState.Empty;
                } else if (data.fatherGeneralId == data.generalId) {
                    this.type = HunterState.Base;
                } else if (Game.PlayerHunterSystem.queryHunter(data.generalId).star == Game.PlayerHunterSystem.queryHunter(data.fatherGeneralId).star) {
                    let defenceList = PlayerHunterSystem.GeneralsIdInDefence();
                    let [findv, index] = Table.FindR(defenceList, (_, _v) => {
                        return _v[0] == data.generalId;
                    });
                    if (index != null) { // 防守阵营
                        this.type = HunterState.Defence;
                        this.defenceType = findv[1];
                    } else { // 材料
                        this.type = (data.isSelected) ? HunterState.Select : HunterState.NoSelect;
                    }
                } else { // 非材料
                    this.type = HunterState.NoUse;
                }
            }
        }

        private setItemInfo(data: HunterUpStarItemLeftData) {

            if (data.generalId == 0 || data.generalId == null || data.generalId == undefined) {
                this.type = HunterState.Empty;
                this.groupAll.visible = false;
                return;
            }



            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);

            this.labelLevel.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);

            let framePath = PlayerHunterSystem.Frame(data.generalId);
            let iconPath = PlayerHunterSystem.Head(data.generalId);
            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.imgFrame.source = cachekey(framePath, this);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imgIcon.source = cachekey("wx_" + iconPath, this);
            } else {
                this.imgIcon.source = cachekey(iconPath, this);
            }
            this.imgGrade.source = cachekey(gradePath, this);

            if (this.type == HunterState.Base || this.type == HunterState.Select) {
                // show bingo
                this.groupBingo.visible = true;
                this.imgBingo.visible = true;
                this.imgShadow.visible = false;
                this.imgLock.visible = false;
                this.imgSelectedFrame.visible = true;
                this.imgFrame.visible = false;

                let path = "";
                if (this.type == HunterState.Base) {
                    path = UIConfig.UIConfig_Hunter.upStarColor[0];
                } else {
                    path = UIConfig.UIConfig_Hunter.upStarColor[1];
                }
                this.imgBingo.source = cachekey(path, this);

            } else if (this.type == HunterState.Empty || this.type == HunterState.NoSelect) {
                // all not show
                this.imgLock.visible = false;
                this.groupBingo.visible = false;
                this.imgBingo.visible = true;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;

            } else if (this.type == HunterState.NoUse) {
                // show shadow
                this.imgLock.visible = false;
                this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;

            } else if (this.type == HunterState.Defence || this.type == HunterState.BFirst) {
                // show shadow and lock
                this.imgLock.visible = true;
                this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
                this.imgSelectedFrame.visible = false;
                this.imgFrame.visible = true;
            }
        }

    }



    /** 数据类 */
    export class HunterUpStarItemLeftData {
        /** 当前武将ID */
        generalId: number;

        /** 父类武将ID */
        fatherGeneralId: number;

        /** 父类 */
        // father: HunterUpStar;

        /** 是否选中 */
        isSelected: boolean = false;
    }
}