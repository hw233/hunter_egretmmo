namespace zj {
export class HXH_ChatItem extends eui.ItemRenderer {
    public tail: eui.Label;
    constructor() {
        super();
        this.skinName = "resource/skins/chat/HXH_ChatItemSkin.exml";
    }

    protected dataChanged() {
        this.Initsa();
    }

    public Initsa() {
        let color = ConstantConfig_Chat.contentColor[this.data.Data.type - 1];
        this.tail.textColor = Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());
        if (this.data.Data == 0 || this.data.Data == null || this.data.Data == undefined) {
            return;
        }
        let content;
        if (this.data.Data.content_type != "" || this.data.Data.show_type == 5) {
            content = Game.PlayerChatDataSystem.GetChatInfo(this.data.Data, 1);
            this.tail.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
        } else {
            content = Game.PlayerChatDataSystem.GetChatInfo(this.data.Data);
            let str = content[0];
            if(content[1]){
                str += content[1];
            }
            if(content[2]){
                str += content[2];
            }
            this.tail.textFlow = Util.RichText(HelpUtil.textConfigFormat(str));
        }
        if (this.data.Data.type == 2 && this.data.Data.type == 5) {
            this.tail.textColor = Helper.RGBToHex("r:79, g:191, b:89");
        } else if (this.data.Data.type == 4) {
            this.tail.textColor = Helper.RGBToHex("r:225, g:0, b:225");
        }
        if (this.data.Data.content_type == "" && this.data.Data.type == 5) {
            this.tail.textColor = 0XFF9E00;
        }

        this.tail.height = this.data.itemNum;
        this.height = this.data.itemNum;
        this.skin.height = this.data.itemNum;

        // let lineNum = Game.PlayerChatDataSystem.getStrlineNum(this.tail.text, 350);
        // if (lineNum == 1) {
        //     this.tail.height = this.tail.height + 20 * (lineNum - 1);
        //     this.height = this.tail.height + 20 * (lineNum - 1);
        //     this.skin.height = this.tail.height + 20 * (lineNum - 1);
        // } else {
        //     this.tail.height = this.tail.height + 20 * (lineNum - 1);
        //     this.height = this.tail.height + 20 * (lineNum - 1);
        //     this.skin.height = this.tail.height + 20 * (lineNum - 1);
        // }

        // 自动修正text宽高
        // let lineNum = Game.PlayerChatDataSystem.getStrlineNum(content[0], 370);
        // this.height = this.height + 20 * (lineNum - 1);
        // this.tail.height = this.height;
    }
}

export class FormatChatItem {
    public Data: number;
    public itemNum: number;
}



}