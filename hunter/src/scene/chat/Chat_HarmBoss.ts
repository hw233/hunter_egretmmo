namespace zj {
export class Chat_HarmBoss extends eui.ItemRenderer {
    public tail: eui.Label;
    constructor() {
        super();
        this.skinName = "resource/skins/chat/Chat_HarmBossSkin.exml";
    }

    protected dataChanged() {
        this.Initsa();
    }

    public Initsa() {
        let content = Game.PlayerChatDataSystem.GetChatInfo(this.data, 1);
        this.tail.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[2]));
    }
}




}