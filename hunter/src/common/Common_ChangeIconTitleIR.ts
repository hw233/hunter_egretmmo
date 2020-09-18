namespace zj {
    // lizhengqiang
    // 20190112
    export class Common_ChangeIconTitleIR extends eui.ItemRenderer {

        private lbTitle: eui.Label;
        private lbInfo: eui.Label;
        private groupAll: eui.Group;
        private groupTexts: eui.Group;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/Common_ChangeIconTitleIRSkin.exml";
            cachekeys(<string[]>UIResource["Common_ChangeIconTitleIR"], null);
        }

        protected dataChanged() {
            let iconType: number = this.data.iconType;
            let titleType: number = this.data.titleType;
            if (this.data.changeWidth) {
                this.groupTexts.x = 142;
                this.lbInfo.x = 172;
            }

            if (iconType == TableEnum.TableIconListState.GENERAL) {
                this.setInfoGENRAL(titleType);
            } else if (iconType == TableEnum.TableIconListState.LEAGUE) {
                this.setInfoLEAGUE(titleType);
            } else if (iconType == 3) {
                this.SetInfoFrame(titleType);
            }
        }

        private setInfoGENRAL(titleType: number) {
            this.lbTitle.text = TextsConfig.TextsConfig_User.name[titleType - 1];
            this.lbInfo.text = TextsConfig.TextsConfig_User.name_info[titleType - 1];
        }

        private SetInfoFrame(titleType: number) {
            this.lbTitle.text = TextsConfig.TextsConfig_User.name_frame[titleType - 1];
            this.lbInfo.text = TextsConfig.TextsConfig_User.name_frame_info[titleType - 1];
        }

        private setInfoLEAGUE(titleType: number) {
            this.lbTitle.text = TextsConfig.TextsConfig_User.name_league[titleType - 1];
            this.lbInfo.text = TextsConfig.TextsConfig_User.name_league_info[titleType - 1];
        }
    }
}