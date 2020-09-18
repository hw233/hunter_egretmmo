namespace zj {
    // 福利-升级奖励
    // lizhengqiang
    // 20190323
    export class ActivitySpecialLevelUp extends UI {
        private lbCurrencyLevel: eui.Label;
        private lstAward: eui.List;
        public cb1;
        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialLevelUpSkin.exml";
        }

        public init() {
            this.lbCurrencyLevel.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.baselevel, Game.PlayerInfoSystem.BaseInfo.level));
            this.setList();
        }

        public cb(cb?) {
            if (cb) {
                this.cb1 = cb;
            } else {
                if (this.cb1) {
                    this.cb1();
                }
            }
        }

        public setList = () => {
            let tbl: Array<TableUplevelReward> = Game.PlayerMissionSystem.listSpecial();

            let arrCollection = new eui.ArrayCollection();
            for (let i = 0; i < tbl.length; i++) {
                let info = tbl[i].index < tbl.length ? tbl[tbl[i].index] : null;
                arrCollection.addItem(
                    {
                        info: info,
                        tbl: tbl[i],
                        father: this
                    }
                );
            }
            this.lstAward.dataProvider = arrCollection;
            this.lstAward.itemRenderer = ActivitySpecialLevelUpItem;
        }
    }
}