namespace zj {
    // lizhengqiang
    // 20190112
    export class Common_ChangeIconNoneIR extends eui.ItemRenderer {

        private lbTitle: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/Common_ChangeIconNoneIRSkin.exml";
            cachekeys(<string[]>UIResource["Common_ChangeIconNoneIR"], null);
        }

        protected dataChanged() {
            let iconType: number = this.data.iconType;
            let titleType: number = this.data.titleType;

            if (iconType == TableEnum.TableIconListState.GENERAL) {
                this.setInfoGENRAL(titleType);
            } else if (iconType == TableEnum.TableIconListState.LEAGUE) {
                this.setInfoLEAGUE(titleType);
            }
        }

        private setInfoGENRAL(titleType: number) {
            this.lbTitle.text = TextsConfig.TextsConfig_User.name_none[titleType - 1];
        }

        private setInfoLEAGUE(titleType: number) {
            this.lbTitle.text = TextsConfig.TextsConfig_User.name_none_league[titleType - 1];
        }
    }
}