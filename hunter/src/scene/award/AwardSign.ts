namespace zj {
    // 福利-签到
    // lizhengqiang
    // 20190320
    export class AwardSign extends UI {
        private lstViewDay: eui.List;
        public constructor() {
            super();
            this.skinName = "resource/skins/award/AwardSignSkin.exml";
        }

        public init() {
            this.setInfo();
        }

        private setInfo() {
            let arrCollection = new eui.ArrayCollection();
            for (let i = 1; i <= 30; i++) {
                arrCollection.addItem(i);
            }
            this.lstViewDay.dataProvider = arrCollection;
            this.lstViewDay.itemRenderer = AwardSignItem;
        }
    }
}