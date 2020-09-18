namespace zj {
// HXH_StoryInstanceMainItem
// wangshenzhuo
// 2019-07-18
export class StoryInstanceMainItem extends eui.ItemRenderer {

    public buttonInstance: eui.Button;
    public imageState: eui.Image;
    public labelTime: eui.Label;
    public imageSelect: eui.Image;


    public cur_table: TableActivityBattle;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceMainItemSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceMainItem"], null);
    }

    protected dataChanged() {

        if (this.selected) {
            this.imageSelect.visible = true;
        } else {
            this.imageSelect.visible = false;
        }
        let index = this.data.index;
        let info = this.data.info;
        let time = info.openTime - info.closeTime;
        this.labelTime.text = Helper.activityTime(info.openTime, info.closeTime).toString();

        let curTime = Game.Controller.serverNow();
        let curServerTime = Date.parse(curTime.toString()) / 1000;
        if(curServerTime < info.openTime) {
            this.imageState.source = cachekey(UIConfig.UIConfig_Activity.StoryTimePath[1] , this);
        }else if(curServerTime >= info.openTime && curServerTime < info.closeTime) {
            this.imageState.source = cachekey(UIConfig.UIConfig_Activity.StoryTimePath[2] , this);
        }else if(curServerTime >= info.closeTime && curServerTime < info.stopTime) {
            this.imageState.source = cachekey(UIConfig.UIConfig_Activity.StoryTimePath[3] , this);
        }

        this.cur_table = TableActivityBattle.Item(info.buffValue);
        Set.ButtonBackgroud(this.buttonInstance , this.cur_table.instance_button[0].toString());
    }
}


//子项数据源
export class StoryInstanceMainItemData {
    //数据源
    info: any;
    index: number;
    father: StoryInstanceMainScene;


}


}