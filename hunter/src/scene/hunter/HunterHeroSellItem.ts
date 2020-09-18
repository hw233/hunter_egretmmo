namespace zj {
    /**
     * @augments chen xi
     * 
     * @date 2018-11-27
     * 
     * @class  猎人出售Item
     */

    export class HunterHeroSellItem extends HunterBaseItem {
        private groupMian: eui.Group;
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
        private CurState = {
            Select: 1,// -- 选中
            Empty: 2, //-- 空项
            NoSelect: 3, //-- 未选中 
            Defence: 4, //-- 材料在防守阵容
        }
        private type = this.CurState.Empty;
        private defenceType: number = 0;
        private long: boolean = false;
        private sel: boolean = false;
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterHeroSellItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterHeroSellItem"], null);
            // this.groupMian.cacheAsBitmap = true;
        }

        public onLongPress(data: HunterBaseItemData) {
            if (data.isLongPress == false) {
                return;
            }
            if (data.generalId == 0 || data.generalId == null) {
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

        // 恢复按钮状态
        public resumeLongPressState() {
            this.isInLongPress = false;
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
            if (isFixCount) return;

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
            // if (data.isLongPress) {
            //     this.nodeBingo.visible = data.isSelected;
            // } else {
            //     this.nodeBingo.visible = false;
            // }
            this.setInfoItem(data);

        }

        public ButtonClick() {
            if (this.long) {
                this.long = false;
                return;
            }
            if (this.type == this.CurState.Defence) {
                let str = TextsConfig.TextsConfig_Hunter.sell_defence_general;
                if (this.defenceType == 1) {
                    str = TextsConfig.TextsConfig_Hunter.sell_defence_general1;
                } else if (this.defenceType == 2) {
                    str = TextsConfig.TextsConfig_Hunter.sell_defence_general2;
                } else if (this.defenceType == 3) {
                    str = TextsConfig.TextsConfig_Hunter.sell_defence_general3;
                } else if (this.defenceType == 4) {
                    str = TextsConfig.TextsConfig_Hunter.sell_defence_general4;
                }
                toast_warning(str);
                return true;
            } else if (this.type == this.CurState.Empty) {
                return false;
            } else if (this.type == this.CurState.NoSelect) {
                let sellLast = Game.PlayerHunterSystem.queryAllHunters().length > this.data.father.sellHunterArray.length + 1;
                let sellFull = this.data.father.sellHunterArray.length >= 16;
                if (sellFull) {
                    toast_warning(TextsConfig.TextsConfig_Hunter.sell_max);
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return true;
                } else if (!sellLast) {
                    toast_warning(TextsConfig.TextsConfig_Hunter.sell_last_general);
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return true;
                } else {
                    this.sel = true;
                    this.type = this.CurState.Select;
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return false;
                }
            } else if (this.type == this.CurState.Select) {
                this.sel = false;
                this.type = this.CurState.NoSelect;
                this.nodeBingo.visible = this.sel;
                this.spriteBingo.visible = this.sel;
                return false;
            }
        }

        protected dataChanged() {
            closeCache(this.groupMian);
            this.updateView(this.data);
            setCache(this.groupMian);
        }

        private setInfoItem(data: HunterBaseItemData) {
            if (data.generalId == null || data.generalId == 0) {
                // this.
                return;
            }

            let bInSell = Table.FindF(data.father.sellHunterArray, (_k, _v) => {
                return _v == data.generalId
            })

            let [bInDefencev, bInDefencek] = Table.FindR(PlayerHunterSystem.GeneralsIdInDefence(), (_k, _v) => {
                return _v[0] == data.generalId
            })
            if (data.generalId == null || data.generalId == 0) {
                this.type = this.CurState.Empty
            } else if (data.isSelected) {
                this.type = this.CurState.Select;
            } else if (bInDefencek != null) {
                this.type = this.CurState.Defence
                this.defenceType = bInDefencev[1]
            } else {
                this.type = this.CurState.NoSelect;
            }

            if (this.type == this.CurState.Select) {
                this.nodeBingo.visible = (true)
                this.spriteBingo.visible = (true)
                this.spriteShadow.visible = (true)
                this.spriteLock.visible = (false)
            } else if (this.type == this.CurState.Empty || this.type == this.CurState.NoSelect) {
                this.spriteLock.visible = (false)
                this.nodeBingo.visible = (false)
                this.spriteBingo.visible = (true)
                this.spriteShadow.visible = (true)
            } else if (this.type == this.CurState.Defence) {
                this.spriteLock.visible = (true)
                this.nodeBingo.visible = (true)
                this.spriteBingo.visible = (false)
                this.spriteShadow.visible = (true)
            }
        }

        // 方法废弃， item如果滚动到scrollver之外，无法获取item
        // // 外部手动调用刷新 item 点击事件
        // public onTap() {
        //     if (this.data == null || this.data.generalId == 0) {
        //         return;
        //     }
        //     this.updateView(this.data);
        //     console.log("--- on tap, index = ", this.itemIndex, " selected = ", this.data.selected);
        // }
    }
}