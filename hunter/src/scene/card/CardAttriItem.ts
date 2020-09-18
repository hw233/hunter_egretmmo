namespace zj {
    /**
     * @class 卡片显示文字Item
     * 
     * @author hao hui hui
     * 
     * @date 2018.11.21
     * 
     * @description modified by Lian Lei
     * 
     * @date 2019.07.20
     */

    export class CardAttriItem extends eui.ItemRenderer {
        private groupAttri: eui.Group;
        private imageBack: eui.Image;
        private labelAttri: eui.Label;

        private oldData = null;

        public constructor() {
            super();

            this.skinName = "resource/skins/card/CardAttriItemSkin.exml";
            cachekeys(<string[]>UIResource["CardAttriItem"], null);
        }

        protected dataChanged() {
            if (this.oldData == this.data)
                return;
            this.updateView(this.data);
        }

        private updateView(data: CardAttriItemData) {
            if (data.type == 0 || data.type == null) {
                let range_growth: Array<Array<number>>;
                if ((data.index + 1) != data.addStrlength) {
                    range_growth = Game.PlayerCardSystem.attriInstance(data.cardInfo.add_attri[data.index].attriId).range_growth;
                }

                let str = null;
                let _type = 1;

                if ((data.index + 1) != data.addStrlength && range_growth[0][0] == 0) {
                    str = PlayerCardSystem.GetAddStr(data.cardInfo)[data.index][0];
                }
                else if ((data.index + 1) != data.addStrlength && range_growth.length != 0) {
                    if (data.cardInfo.add_attri[data.index].growthValue <= range_growth[0][1]) {
                        _type = 1;
                    }
                    else {
                        _type = 2;
                    }
                    str = PlayerCardSystem.GetAddStr(data.cardInfo, data.cardInfo.add_attri[data.index].growthValue, 1)[data.index][0];
                }
                else if ((data.index + 1) == data.addStrlength) {
                    str = data.info[0];
                }

                let star = data.cardInfo.star;
                let growthValue = null;

                if (star == 6) {
                    let range = Game.PlayerCardSystem.attriInstance(data.cardInfo.add_attri[data.index].attriId).range_growth;
                    let _type = 1;
                    if (range[0][0] != 0) {
                        growthValue = data.cardInfo.add_attri[data.index].growthValue;
                        if (growthValue <= range[0][1]) {
                            _type = 1;
                        }
                        else {
                            _type = 2;
                        }
                    }
                    str = PlayerCardSystem.GetAddStr(data.cardInfo, growthValue, _type)[data.index][0];
                    let labelColor = Helper.RGBToHex("r:30,g:30,b:30")
                    this.labelAttri.textColor = labelColor;
                }
                else if (CommonConfig.card_addattri_awake_star[data.index] <= star && ((data.index + 1) != data.addStrlength || star == 6)) {
                    let labelColor = Helper.RGBToHex("r:30,g:30,b:30")
                    this.labelAttri.textColor = labelColor;
                }
                else if ((data.index + 1) == data.addStrlength) {
                    let labelColor = Helper.RGBToHex("r:120,g:120,b:120")
                    this.labelAttri.textColor = labelColor;
                }
                else {
                    let labelColor = Helper.RGBToHex("r:120,g:120,b:120")
                    this.labelAttri.textColor = labelColor;
                    str = data.info[0] + Helper.StringFormat(TextsConfig.TextsConfig_Hunter.card_star_act, (Helper.GetNumCH(CommonConfig.card_addattri_awake_star[data.index].toString())));
                }

                this.labelAttri.width = data.width;
                this.imageBack.width = data.width;
                this.groupAttri.width = data.width;
                this.width = data.width;
                this.labelAttri.textFlow = Util.RichText(str);
                this.imageBack.height = this.labelAttri.textHeight + 4;
                this.groupAttri.height = this.labelAttri.textHeight + 4;
                this.height = this.labelAttri.textHeight + 4;

                if (data.isHideBG) {
                    let labelColor = Helper.RGBToHex("r:255,g:255,b:255")
                    this.imageBack.visible = false;
                    this.labelAttri.textColor = labelColor;
                    if (data.index + 1 == data.addStrlength) {
                        this.labelAttri.textColor = Helper.RGBToHex("r:120,g:120,b:120");
                    }
                }
            }
            else if (data.type == 1) {
                this.SetInfoNotGet(data.index, data.info, data.width)
            }
        }

        private SetInfoNotGet(index, info, width) {
            let str = info;
            this.labelAttri.width = width;
            this.imageBack.width = width;
            this.groupAttri.width = width;
            this.width = width;
            this.labelAttri.textFlow = Util.RichText(str);
            this.imageBack.visible = (index + 1) > 2;
            this.imageBack.height = this.labelAttri.textHeight + 4;
            this.groupAttri.height = this.labelAttri.textHeight + 4;
            this.height = this.labelAttri.textHeight + 4;

            let labelColor = Helper.RGBToHex("r:255,g:255,b:255")
            if (this.data.isHideBG) {
                this.imageBack.visible = false;
                this.labelAttri.textColor = labelColor;
            }
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

    export class CardAttriItemData {
        index: number;
        info;
        cardInfo: message.PotatoInfo;
        width: number;
        addStrlength: number
        type: number;
        isHideBG: boolean = false;
    }
}