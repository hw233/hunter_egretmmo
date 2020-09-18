namespace zj {
//  wangshenzhuo
//  2019-7-19
//  HXH_StoryInstanceMall
export class StoryInstanceMall extends Dialog {

    public imageBG: eui.Image;
    public imageRole: eui.Image;
    public groupTalk: eui.Group;
    public imageBoardTalk: eui.Image;
    public LabelTalk: eui.Label;
    public buttonClose: eui.Button;
    public imageIcon: eui.Image;
    public labelHaveNum: eui.Label;
    public listInstance: eui.List;

    public activityInfo;
    public cur_table: TableActivityBattle;
    public listItem: eui.ArrayCollection;

    private Times: egret.Timer;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceMallSkin.exml";
        this.Times = new egret.Timer(999, 0);
        this.Times.start();
        this.Times.addEventListener(egret.TimerEvent.TIMER, this.updateTime, this);
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.Times.stop();
        }, null);
        this.addEventListener(egret.TouchEvent.TOUCH_END , this.removeShow , this)
    }

    public Load(Info) {
        this.activityInfo = otherdb.getActivityByTypeAndIndex(Info.type, Info.index);
        this.cur_table = TableActivityBattle.Item(this.activityInfo.buffValue);

        this.imageBG.source = cachekey(this.cur_table.instance_bg, this);
        this.imageRole.source = cachekey(this.cur_table.instance_half, this);

        this.listInstance.itemRenderer = StoryInstanceMallItem;
        this.listItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.exchange_get_goods.length; i++) {
            let data = new StoryInstanceMallItemData();
            data.info = this.cur_table;
            data.father = this;
            data.index = i;
            this.listItem.addItem(data);
        }
        this.listInstance.dataProvider = this.listItem;

        this.imageIcon.source = cachekey(PlayerItemSystem.ItemPath(this.cur_table.act_coin), this);
        let posX = this.groupTalk.x;
        let posY = this.groupTalk.y;
        egret.Tween.get(this.groupTalk, { loop: true })
            .to({ y: posY }, 0)
            .to({ y: posY + 5 }, 1000)
            .to({ y: posY - 10 }, 2000)
            .to({ y: posY }, 1000);

        this.updateTime();
    }

    private updateTime() {
        this.labelHaveNum.text = this.activityInfo.daysIndex;
    }

    public onAwardInfo() {
        for (let i = 0; i < this.listItem.length; i++) {
            let tmp = this.listItem.source[i];
            if (i != this.listInstance.selectedIndex) {
                this.listItem.replaceItemAt(tmp, i);
            } else {
                this.listItem.replaceItemAt(tmp, i);
            }
        }
    }

    //长按详情
    private showGoodsProperty(ev: egret.Event) {
        let a = Game.UIManager.sceneCount();
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "GoodsTouch";
        this.addChild(show);
    }

    // 长按抬起
    private removeShow() {
        let show = this.getChildByName("GoodsTouch");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonClose() {
        this.Times.stop();
        this.close(UI.HIDE_TO_TOP);
    }

}
}