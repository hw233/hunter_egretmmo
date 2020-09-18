namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-11
     * 
     * @class 猎人升星右侧材料信息item
     */
    export class HunterUpStarItemRight extends UI {
        private imgStar: eui.Image;
        private imgEmpty: eui.Image;
        private groupIcon: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private groupStar: eui.Group;
        private labelLevel: eui.BitmapLabel;
        private imgBreak: eui.Image;
        private imgGrade: eui.Image;
        private imgLock: eui.Image;

        private index: number = null;
        private generalId: number = null;
        private cb: (index: number, deselecteID: number) => void;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterUpStarItemRightSkin.exml";
            cachekeys(<string[]>UIResource["HunterUpStarItemRight"], null);
            this.init();
        }

        private init() {
            this.imgStar.visible = false;
            this.imgEmpty.visible = false;
            this.groupIcon.visible = false;
            this.imgLock.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        private onTap() {
            if (this.generalId > 0 && this.cb != null) {
                this.cb(this.index, this.generalId);
            }
        }

        /**
         * 初始化基本信息
         * 
         * @param index 下标索引
         * 
         * @description 材料取消选中时需要初始化信息
         */
        public initBaseInfo(index: number) {
            this.index = index;

            this.imgEmpty.visible = true;
            this.imgLock.visible = false;
            this.groupIcon.visible = false;
            this.imgStar.visible = false;
        }

        /**
         * 设置基本信息
         * @param index 界面刷新
         * @param cb 回调函数
         */
        public setInfo(index: number, cb: (index: number, deselecteID: number) => void) {
            this.index = index;
            this.cb = cb;
        }

        /**
         * 界面刷新
         * @param id -1 上锁； 0 清空；其他，显示基本信息
         */
        public refresh(id: number, generalId: number) {
            this.generalId = id;

            if (id == -1) {
                // lock
                this.groupIcon.visible = false;
                this.imgLock.visible = true;
                this.imgStar.visible = false;
                this.imgEmpty.visible = false;
            } else if (id == 0) {
                // empty
                this.imgStar.visible = true;
                this.imgEmpty.visible = false;
                this.imgLock.visible = false;
                this.groupIcon.visible = false;

                if (generalId == 0 || generalId == null) {
                    this.imgStar.visible = false;
                } else {
                    this.imgStar.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_upstar_bottom[Game.PlayerHunterSystem.queryHunter(generalId).star - 1], this);
                }
            } else {
                // generalId
                this.groupIcon.visible = true;
                this.imgLock.visible = false;
                this.imgStar.visible = false;
                this.imgEmpty.visible = false;

                let hunterInfo = Game.PlayerHunterSystem.queryHunter(id);
                this.labelLevel.text = hunterInfo.level.toString();
                let aptitude = PlayerHunterSystem.Table(id).aptitude;

                let framePath = PlayerHunterSystem.Frame(id);
                let headPath = PlayerHunterSystem.Head(id);
                let gradePath = UIConfig.UIConfig_General.hunter_grade[aptitude];

                this.imgFrame.source = cachekey(framePath, this);
                if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                    this.imgIcon.source = cachekey("wx_" + headPath, this);
                } else {
                    this.imgIcon.source = cachekey(headPath, this);
                }
                this.imgGrade.source = cachekey(gradePath, this);

                Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);

                Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            }

        }

    }
}