namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-1-3
     */
    export class HunterCardAttriItem extends eui.ItemRenderer {
        private labelAttri: eui.Label;
        private imgBack: eui.Image;
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCardAttriItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterCardAttriItem"], null);
        }

        protected dataChanged() {
            this.updateView(this.data);
            this.width = this.data.width;
        }

        private updateView(data: HunterCardAttriItemData) {
            this.imgBack.source = cachekey("ui_hunter_card_CardAttriBack_png", this);
            let range_growth;
            if (data.index != data.fatherArray - 1) {
                range_growth = TablePotatoAttri.Item(data.cardInfo.add_attri[data.index].attriId).range_growth;
            }
            let str = null;
            let type = 1;
            this.labelAttri.textColor = 0x000000;
            if (data.index != data.fatherArray - 1 && range_growth[0][0] == 0) {
                str = Helper.StringFormat(PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0]);
            } else if (data.index != data.fatherArray - 1 && range_growth.length != 0) {
                if (data.cardInfo.add_attri[data.index].growthValue <= range_growth[0][1]) {
                    type = 1;
                } else {
                    type = 2;
                }
                str = Helper.StringFormat(PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0]);

            } else if (data.index == data.fatherArray - 1) {
                str = Helper.StringFormat(data.description);
            }
            let star = data.cardInfo.star;
            let growthValue = null;
            if (star == 6) {
                let range = TablePotatoAttri.Item(data.cardInfo.add_attri[data.index].attriId).range_growth;
                let type_ = 1;
                if (range[0][0] != 0) {
                    growthValue = data.cardInfo.add_attri[data.index].growthValue;
                    if (growthValue <= range[0][1]) {
                        type_ = 1;
                    } else {
                        type_ = 2;
                    }
                    str = Helper.StringFormat(PlayerCardSystem.GetAddStr(data.cardInfo, growthValue, type_)[data.index][0]);
                    this.labelAttri.textColor = 0x1E1E1E;
                }
            } else if (CommonConfig.card_addattri_awake_star[data.index] <= star && (data.index != data.fatherArray - 1 || star == 6)) {
            } else if (data.index == data.fatherArray - 1) {
                this.labelAttri.textColor = 0x787878;
            } else {
                str = data.description + Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_star_act, Helper.GetNumCH(CommonConfig.card_addattri_awake_star[data.index].toString()));
                this.labelAttri.textColor = 0x787878;
            }
            this.labelAttri.textFlow = Util.RichText(str);
            egret.setTimeout(this.aaaaa, this, 5);
        }
        public aaaaa() {
            let lineNum = this.getStrlineNum(this.data.description, this.data.width);
            this.skin.height = this.skin.height + 16 * (lineNum - 1);
            this.height = this.height + 16 * (lineNum - 1);
            this.imgBack.height = this.height;
        }

        private getStrlineNum(info: string, width: number) {
            let lineNum = 1;
            let richStrArr = Util.RichText(info);
            let richStr = "";
            for (let i = 0; i < richStrArr.length; i++) {
                richStr = richStr = richStrArr[i].text;
            }
            let chineseNum = 0;
            for (let i = 0; i < richStr.length; i++) {
                if (richStr.charCodeAt(i) > 255 || richStr.charAt(i) == "）" || richStr.charAt(i) == "（")
                    chineseNum++;
            }
            lineNum = Math.ceil(((richStr.length - chineseNum) / 2 + chineseNum) / (width / 16));
            return lineNum;
        }
    }

    export class HunterCardAttriItemData {

        description: string;

        cardInfo: message.PotatoInfo;

        width: number;

        index: number;

        fatherArray: number;
    }
}