namespace zj {
    /** 
     * @author lilou
     * 
     * @date 2018-11-14
     * 
     * @class 猎人英雄Item
     */
    export class HunterHeroItem extends eui.ItemRenderer {
        private imgBg: eui.Image;
        private groupAni: eui.Group;
        private groupAll: eui.Group;
        private imgFame: eui.Image;
        private imgIcon: eui.Image;
        private labelLevel: eui.BitmapLabel;
        private groupStar: eui.Group;
        private imgWait: eui.Image;
        private imgRedDot: eui.Image;
        private imgBreak: eui.Image;
        private imgIconGrade: eui.Image;
        private imgRecruit: eui.Image;
        private progress: ProgressBar = null;

        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterHeroItemSkin.exml";

            let back = "ui_hunter_BoardBurHunterSoul_png";
            let progress = "ui_hunter_BurHunterSoulA_png";
            this.progress = new ProgressBar(back, progress);
            // this.groupAll.cacheAsBitmap = true;
            this.progress.left = 10;
            this.progress.right = 10;
            this.progress.bottom = 10;
            this.progress.height = 20;
            this.groupAll.addChild(this.progress);
            cachekeys(<string[]>UIResource["HunterHeroItem"], null);
        }

        protected dataChanged() {
            closeCache(this.groupAll);
            Game.EventManager.on(GameEvent.SET_HUNTER_ITEM, (ev: egret.Event) => {
                if (PlayerHunterSystem.GetGeneralId(ev.data.generalId) == PlayerHunterSystem.GetGeneralId(this.data.generalId)) {
                    this.dataChanged()
                }
            }, this);

            let itemData: HeroItemData = <HeroItemData>this.data;
            if (itemData == null || itemData == undefined) return;

            let removeAnimation = () => {
                let obj = this.groupAni.getChildByName("dzGF");
                if (obj) {
                    this.groupAni.removeChild(obj);
                }

                let obj1 = this.groupAni.getChildByName("000_zhaohuan");
                if (obj1) this.groupAni.removeChild(obj1);
            }

            if (itemData.type == HeroItemTypeEnum.Hunter) {
                if (itemData.generalId == null || itemData.generalId == 0) {
                    removeAnimation();
                    this.groupAll.visible = false;
                    return;
                }
            } else if (itemData.type == HeroItemTypeEnum.Fragment) {
                if (itemData.soulId == null || itemData.soulId == 0) {
                    removeAnimation();
                    this.groupAll.visible = false;
                    return;
                }
            }
            this.imgBg.visible = (itemData.type != HeroItemTypeEnum.HeroBottom);
            this.groupAll.visible = true;
            this.imgRedDot.visible = false;
            this.imgWait.visible = false;
            this.imgRecruit.visible = false;

            // 碎片隐藏
            this.groupStar.visible = (itemData.type != HeroItemTypeEnum.Fragment);
            this.labelLevel.visible = (itemData.type != HeroItemTypeEnum.Fragment);
            this.imgBreak.visible = (itemData.type != HeroItemTypeEnum.Fragment);
            this.imgIconGrade.visible = (itemData.type != HeroItemTypeEnum.Fragment);

            // 碎片显示
            this.progress.visible = (itemData.type == HeroItemTypeEnum.Fragment);

            if (itemData.type == HeroItemTypeEnum.Hunter) {
                this.setHunterInfo(itemData);
            } else if (itemData.type == HeroItemTypeEnum.Fragment) {
                this.setSoulInfo(itemData);
            } else if (itemData.type == HeroItemTypeEnum.HeroBottom) {
                this.setHunterInfo(itemData);
            }

            // add/remove selected animation
            if (itemData.isSelected) {
                this.playAni();
                console.log(this.data.generalId);
            } else {
                removeAnimation();
            }

            setCache(this.groupAll);
        }

        private setHunterInfo(data: HeroItemData) {
            if (data.generalId == 0 || data.generalId == null) return;

            if (Game.PlayerFormationSystem.checkGeneralInFormat(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, data.generalId)) {
                this.imgRedDot.visible = Tips.GetTipsOfHero(data.generalId) || Tips.GetTipsOfHero(data.generalId, Tips.TAG.GENERAL_UPLEVEL);
            }

            let hunter = Game.PlayerHunterSystem.queryHunter(data.generalId);
            if (hunter == null) return;
            let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);

            let framePath = PlayerHunterSystem.Frame(data.generalId);
            let headPath = PlayerHunterSystem.Head(data.generalId);
            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.imgFame.source = cachekey(framePath, this);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imgIcon.source = cachekey("wx_" + headPath, this);
            } else {
                this.imgIcon.source = cachekey(headPath, this);
            }
            Helper.SetImageFilterColor(this.imgIcon);

            this.labelLevel.text = String(hunter.level);

            Helper.SetHeroAwakenStar(this.groupStar, hunter.star, hunter.awakePassive.level);
            Helper.GetBreakLevelToPath(this.imgBreak, hunter.break_level);
            this.imgIconGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(data.generalId).aptitude], this);
            // this.labelLevel.visible = (baseGeneralInfo.is_open != 0);
            // this.imgWait.visible = (baseGeneralInfo.is_open == 0);
        }

        private setSoulInfo(data: HeroItemData) {
            if (data.soulId == 0 || data.soulId == null) return;

            let generalId = PlayerHunterSystem.SoulIdFindGeneral(data.soulId).general_id;
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);

            let framePath = "ui_frame_FrameHunterAsh_png";
            let headPath = PlayerHunterSystem.Head(generalId);
            this.imgFame.source = cachekey(framePath, this);
            if (Device.isReviewSwitch && Util.isWxMiniGame) {
                this.imgIcon.source = cachekey("wx_" + headPath, this);
            } else {
                this.imgIcon.source = cachekey(headPath, this);
            }

            let [count, enough, percent] = PlayerHunterSystem.SoulCount(data.soulId);
            this.progress.setProgress(count, enough);

            let removeAnimation = () => {
                let obj = this.groupAni.getChildByName("000_zhaohuan");
                if (obj) this.groupAni.removeChild(obj);
            }
            removeAnimation();

            let canEquip = (percent >= 1 && baseGeneralInfo.is_open == 1);
            this.imgRecruit.visible = canEquip;
            if (canEquip) {
                Game.DragonBonesManager.playAnimation(this, "ui_lieren_kezhaohuan", null, "000_zhaohuan", 0)
                    .then((display: dragonBones.EgretArmatureDisplay) => {
                        if (!this.groupAni.getChildByName("000_zhaohuan")) {
                            display.name = "000_zhaohuan";
                            this.groupAni.addChild(display);
                        }
                        else {
                            display.animation.stop();
                            display.animation.reset();
                            display.armature.dispose();
                            display.dbClear();
                            display.dispose(true);
                        }
                    });
            }

            if (canEquip) {
                Helper.SetImageFilterColor(this.imgIcon, null);
            } else {
                if (baseGeneralInfo.is_open != 1) {
                    Helper.SetImageFilterColor(this.imgIcon, 'cool');
                } else {
                    Helper.SetImageFilterColor(this.imgIcon, 'gray');
                }
            }

        }

        private playAni() {
            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(display => {
                    if (!this.groupAni.getChildByName("dzGF")) {
                        display.name = "dzGF";
                        this.groupAni.addChild(display);
                    }
                    else {
                        display.animation.stop();
                        display.animation.reset();
                        display.armature.dispose();
                        display.dbClear();
                        display.dispose(true);
                    }
                })
                .catch(reason => {
                    toast(reason);
                });

        }
    }

    /** item 类型 */
    export const enum HeroItemTypeEnum {
        /** 猎人 */
        Hunter = 0,
        /** 碎片 */
        Fragment = 1,
        /** 英雄界面底部 */
        HeroBottom = 2
    }

    /** 列表数据类  */
    export class HeroItemData {
        type: HeroItemTypeEnum = HeroItemTypeEnum.Hunter;

        /** 武将ID */
        generalId: number = null;

        /** 碎片ID */
        soulId: number = null;

        isSelected: boolean = false;
    }


    /** 自定义进度条界面 */
    export class ProgressBar extends UI {
        private imgBackground: eui.Image;
        private imgProgress: eui.Image;
        private label: eui.Label;
        constructor(backgroundSource: string, progressSource: string) {
            super();

            this.imgBackground = new eui.Image();
            this.imgBackground.left = 0;
            this.imgBackground.right = 0;
            this.imgBackground.top = 0;
            this.imgBackground.bottom = 0;

            this.imgBackground.source = cachekey(backgroundSource, this);

            this.addChild(this.imgBackground);
            this.imgBackground.scale9Grid = new egret.Rectangle(this.width * 0.5 - 1, this.height * 0.5 - 1, this.width * 0.5 - 1, this.height * 0.5 - 1);

            this.imgProgress = new eui.Image();
            this.imgProgress.left = 0;
            this.imgProgress.width = 0;
            this.imgProgress.top = 0;
            this.imgProgress.bottom = 0;
            this.imgProgress.source = cachekey(progressSource, this);
            this.addChild(this.imgProgress);
            this.imgProgress.scale9Grid = new egret.Rectangle(this.width * 0.5 - 1, this.height * 0.5 - 1, this.width * 0.5 - 1, this.height * 0.5 - 1);


            this.init();
        }

        private init() {
            this.label = new eui.Label();
            this.label.left = 0;
            this.label.right = 0;
            this.label.top = 0;
            this.label.bottom = 0;
            this.label.textAlign = egret.HorizontalAlign.CENTER;
            this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.label.size = 14;
            this.label.text = "0/0";
            this.addChild(this.label);
        }

        public setProgress(current: number, enough: number) {
            if (enough < 0) return;

            if (current < 0) {
                current = 0;
            }

            let percent = (current / enough) >= 1 ? 1 : (current / enough);
            this.imgProgress.width = this.width * percent;
            this.label.text = current.toString() + "/" + enough.toString();
        }

        public getCurrentProgress(): number {
            if (this.label == null || this.label == undefined) return 0;
            let text = this.label.text;
            let current = text.split('/')[0];
            return Number(current);
        }
    }
}