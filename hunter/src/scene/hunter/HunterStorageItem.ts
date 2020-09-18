namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-11-30
     * 
     * @class 猎人出售界面Item
     */

    export class HunterStorageItem extends HunterBaseItem {
        private groupMain: eui.Group;
        private spriteFrame: eui.Image;
        private spriteIcon: eui.Image;
        private spriteLock: eui.Image;
        private nodeStar: eui.Group;
        private spriteBreak: eui.Image;
        private spriteGrade: eui.Image;
        private labelLevel: eui.Label;
        private nodeBingo: eui.Group;
        private spriteShadow: eui.Image;
        private spriteBingo: eui.Image;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterStorageItemSkin.exml";
            // this.groupMain.cacheAsBitmap = true;
        }

        protected onLongPress(data: HunterBaseItemData) {
            if (data.isLongPress == false) {
                return;
            }

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


        protected dataChanged() {
            closeCache(this.groupMain);
            this.updateView(this.data);
            setCache(this.groupMain);
        }

        private updateView(data: HunterBaseItemData) {
            let generalId = data.generalId;
            let isFixCount = (data == null || generalId == null || generalId == 0);

            this.spriteLock.visible = false;
            this.spriteBreak.visible = false;
            this.nodeBingo.visible = false;
            this.spriteFrame.visible = !isFixCount;
            this.spriteIcon.visible = !isFixCount;
            this.nodeStar.visible = !isFixCount;
            this.spriteGrade.visible = !isFixCount;
            this.labelLevel.visible = !isFixCount;
            if (isFixCount) {
                return;
            }

            let frame_path = PlayerHunterSystem.Frame(generalId);
            let head_path = PlayerHunterSystem.Head(generalId);
            let aptitude_path = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(generalId).aptitude];

            this.spriteFrame.source = cachekey(frame_path, this);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.spriteIcon.source = cachekey("wx_" + head_path, this);
            } else {
                this.spriteIcon.source = cachekey(head_path, this);
            }
            this.spriteGrade.source = cachekey(aptitude_path, this);


            let general = Game.PlayerHunterSystem.queryHunter(generalId);
            this.labelLevel.text = String(general.level);

            Helper.SetHeroAwakenStar(this.nodeStar, general.star, general.awakePassive.level);
            Helper.GetBreakLevelToPath(this.spriteBreak, general.break_level);

            this.nodeBingo.visible = data.isSelected;
        }

        // 恢复按钮状态
        public resumeLongPressState() {
            this.isInLongPress = false;
        }
    }
}