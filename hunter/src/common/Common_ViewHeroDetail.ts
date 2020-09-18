namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-1
     * 
     * @class 长按显示英雄详细介绍
     */
    export class Common_ViewHeroDetail extends Dialog {
        private generalId: number;
        private btnClose: eui.Button;
        private labelName: eui.Label;
        private labelPower: eui.Label;
        private middleNode: eui.Group;
        private hunterList: eui.List;
        private cardList: eui.List;
        private nodeLeft: eui.Group;
        private cardListData: eui.ArrayCollection = new eui.ArrayCollection();
        private cb: Function;
        private rightNode: eui.Group;
        private backdrop: eui.Image;
        constructor() {
            super();

            this.skinName = "resource/skins/common/Common_ViewHeroDetailSkin.exml";
            // this.middleNode.cacheAsBitmap = true;
            this.init();
            if (Device.isReviewSwitch) {
                this.rightNode.visible = false;
                this.backdrop.width = 430;
                this.btnClose.x = 380;
            }
        }

        private init() {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeSkill, this);

            this.hunterList.itemRenderer = Common_ViewHeroDetailItem;
            this.cardList.itemRenderer = Common_PlayerItemCard;
            this.cardList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                if (this.cb) {
                    this.cb();
                }
            }, this);
        }

        public setInfo(generalId: number, cb) {
            this.generalId = generalId;
            this.setLabelInfo();
            this.setSkillInfo();
            this.setCardInfo();
            this.cb = cb;
        }

        private setLabelInfo() {
            let tableInfo = PlayerHunterSystem.Table(this.generalId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);

            let level = hunterInfo.level;
            let name = tableInfo.general_name;
            // let step = PlayerHunterSystem.GetStep(this.generalId).name;
            this.labelName.textColor = Helper.GetStepColor(hunterInfo.step);
            this.labelName.text = "Lv." + String(level) + " " + name;//+ step;

            this.labelPower.text = Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_result_power, Set.NumberUnit3(hunterInfo.battleValue));

            let [info] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfo);
            for (let i = 0; i < TableEnum.EnumHunterAttriShow.length; i++) {
                let v = TableEnum.EnumHunterAttriShow[i];
                let str = String(Math.ceil(info[v - 1]));
                if (i > 3) {
                    str += "%";
                }
                let label = this.middleNode.getChildByName(`labelCurrentAttribute` + String(i + 1)) as eui.Label;
                label.text = TextsConfig.TextsConfig_HeroMain.attr[v] + ": " + str;
            }

            let attriInfo = PlayerHunterSystem.HXHCalcGelOtherAttrToShow(hunterInfo);
            for (let i = 0; i < TableEnum.EnumHunterAttriShow.length; i++) {
                let v = TableEnum.EnumHunterAttriShow[i];
                let str = "+" + String(Math.ceil(attriInfo[v - 1]));
                if (i > 3) {
                    str += "%";
                }
                let label = this.middleNode.getChildByName(`labelNextAttribute` + String(i + 1)) as eui.Label;
                label.text = str;
            }

            let path = "ui_hunter_OrnLine_png";
            for (let i = 1; i <= 4; i++) {
                (this[`labelLine${i}`] as eui.Image).source = cachekey(path, this);
            }
        }

        private setSkillInfo() {
            let tableInfo = PlayerHunterSystem.Table(this.generalId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) {
                toast(String(this.generalId) + "is null")
                return;
            }

            let collectionData = new eui.ArrayCollection();
            // 自动技、手动技
            for (let i = 0; i < tableInfo.skill_ids.length; i++) {
                let v = tableInfo.skill_ids[i];
                let data = new Common_ViewHeroDetailItemData();
                data.index = i;
                data.skillId = v;
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }
            // 被动技
            if (tableInfo.init_passive[0] != 0) {
                let data = new Common_ViewHeroDetailItemData();
                data.index = 3;
                data.skillId = tableInfo.init_passive[0];
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }
            // 主动技
            if (tableInfo.awake_passive != 0) {
                let data = new Common_ViewHeroDetailItemData();
                data.index = 4;
                data.skillId = tableInfo.awake_passive;
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }

            this.hunterList.dataProvider = collectionData;

        }

        public showSkill(data: Common_ViewHeroDetailItemData, index: number, level: number, cx) {
            loadUI(Common_DesSkill).then((desSkill: Common_DesSkill) => {
                // 1. adjust coordinate
                desSkill.y = this.nodeLeft.height - this.hunterList.height - desSkill.height;
                let itemWidth = this.hunterList.width / 4;
                cx = this.hunterList.parent.x + itemWidth * (index + 0.5) - desSkill.width * 0.5;
                if (cx < 0) {
                    cx = 0;
                }
                desSkill.x = cx;
                // 2. set data
                if (data.index == 3 || data.index == 4) {
                    // this.desSkill.setInfoLevelSkill(data.skillId, data.generalId, data.index, level);
                    desSkill.setInfoTalent(data.skillId, data.index - 1);
                } else {
                    desSkill.setInfoSkill(data.skillId, data.index, level);
                }

                // 3. add to node
                desSkill.name = "CommonViewHeroDetailDesSkill";
                this.nodeLeft.addChild(desSkill);
            });
        }

        private removeSkill() {
            let obj = this.nodeLeft.getChildByName("CommonViewHeroDetailDesSkill");
            if (obj) this.nodeLeft.removeChild(obj);
        }

        private setCardInfo() {
            // the following code snippet is same as the HunterCardMainItem.ts
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            let cardMap = PlayerHunterSystem.GetHunterCardMap(this.generalId);

            this.cardListData.removeAll();
            for (let i = 0; i < 9; i++) {
                let data = new Common_PlayerItemCardData();
                data.generalId = this.generalId;
                data.cardType = baseGeneralInfo.card_type[i];
                data.cardLevel = baseGeneralInfo.card_level[i];
                data.cardInfo = cardMap[i + 1];
                data.father = this;
                this.cardListData.addItem(data);
            }
            this.cardList.dataProvider = this.cardListData;
        }

        private onCardListTap(e: eui.ItemTapEvent) {
            let data = this.cardListData.getItemAt(e.itemIndex) as Common_PlayerItemCardData;
            if (!data) return;
            if (data.cardInfo == undefined || data.cardInfo == null) {
                return;
            }
            loadUI(PlayerCardPopDialog)
                .then((dialog: PlayerCardPopDialog) => {
                    dialog.loadGet(data.cardInfo);
                    dialog.show();
                });
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
            // loadUI(CommonFormatePveMain)
            //     .then((dialog: CommonFormatePveMain) => {
            //         //dialog.show(UI.SHOW_FROM_TOP);
            //         dialog.onAddToStage();
            //         dialog.setInfo(1);
            //     });
        }
    }

}