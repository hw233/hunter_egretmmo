namespace zj {
// HXH_HunterTransformSkillPop
// wangshenzhuo
// 2019-7-18
export class HunterTransformSkillPop extends Dialog {

    public buttonClose: eui.Button;
    public listViewDrop: eui.List;
    public buttonUse: eui.Button;
    public imageNone: eui.Image;


    private hunter_info = [];

    public general_id: number;
    public popLevel: number;
    public generalPopInfo = [];
    public father: HunterTransformDetailsItem;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformSkillPopSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonClose , this);
        this.buttonUse.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonUse , this);
    }

    public SetInfo(generalId, level, info, father) {
        this.general_id = generalId;
        this.popLevel = level;
        this.generalPopInfo = info;
        this.father = father;
        this.SetTransformInfo();
        PlayerHunterSystem.transformSel = 1;
    }

    private SetTransformInfo() {
        this.hunter_info = PlayerHunterSystem.getCanTransformHunter(this.generalPopInfo);
        if (this.hunter_info && this.hunter_info != null) {
            this.hunter_info.splice(0, 0, this.general_id);

            this.listViewDrop.itemRenderer = HunterTransformSkillPopItem;
            let listItem = new eui.ArrayCollection();
            for (let i = 0; i < this.hunter_info.length; i++) {
                let data = new HunterTransformSkillPopItemData();
                data.index = i + 1;
                data.info = this.hunter_info[i];
                data.level = this.popLevel;
                data.father = this;
                listItem.addItem(data);
            }
            this.listViewDrop.dataProvider = listItem;
        }
        if (this.hunter_info && this.hunter_info.length > 1) {
            this.imageNone.visible = false;
        }else{
            this.imageNone.visible = true;
        }
    }

    public onButtonUse() {
        this.close(UI.HIDE_TO_TOP);
        this.father.setConsume();
    }

    public onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
        PlayerHunterSystem.transformSel = 1;
    }

}
}