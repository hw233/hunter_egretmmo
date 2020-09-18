namespace zj {
//  wangshenzhuo
//  2019-7-16
//  HXH_HunterTransformChoose
export class HunterTransformChoose extends Scene {

    public imageTipChoose: eui.Image;
    public buttonClose: eui.Button;
    public labelDes: eui.Label;
    public listViewItem: eui.List;

    private data_list = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformChooseSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
    }

    public setInfo() {
        let hunter_list = TableGeneralTransfer.Table();
        this.data_list = [];
        let item_list = [];
        for (const k in hunter_list) {
            const v = hunter_list[k];
            if (v.general_add != 0) {
                this.data_list.push(v);
            }
        }
        this.SetList();
    }

    public SetList() {
        this.listViewItem.itemRenderer = HunterTransformChooseItem;
        let listItem = new eui.ArrayCollection();

        for (let i = 0; i < this.data_list.length; i++) {
            let data = new HunterTransformChooseItemData();
            data.info = this.data_list[i];
            data.father = this;
            listItem.addItem(data);
        }
        this.listViewItem.dataProvider = listItem;
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}