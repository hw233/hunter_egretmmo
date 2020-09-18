namespace zj {
//HXH_HunterTransformChooseItem
// wangshenzhuo
// 2019-07-17
export class HunterTransformChooseItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public imageFrameHunter: eui.Image;
    public imageHunterIcon: eui.Image;
    public imageHunterBottom: eui.Image;
    public buttonView: eui.Button;
    public imageTipView: eui.Image;
    public imageType1: eui.Image;
    public imageGrade: eui.Image;
    public imageType: eui.Image;
    public imageHunterName: eui.Image;

    public info;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformChooseItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterTransformChooseItem"], null);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMain, this);
    }

    protected dataChanged() {
        this.info = this.data.info;
        let baseInfo = Game.PlayerHunterSystem.Table(this.info.general_id);
        let picTbl = TableBaseGeneral.Table();
        let picRoleInfo = PlayerHunterSystem.MapInstance(this.info.transfer_role);
        if (baseInfo.aptitude) {
            this.imageGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude], this);
            this.imageType1.source = cachekey(UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
            this.imageType.source = cachekey(UIConfig.UIConfig_General.hunter_type2[baseInfo.features], this);
        }
        this.imageFrameHunter.source = cachekey(this.info.transfer_floor, this);
        this.imageHunterBottom.source = cachekey(this.info.transfer_board, this);
        this.imageHunterName.source = cachekey(this.info.name_pic, this);
        this.imageHunterIcon.source = cachekey(picRoleInfo.half_path, this);
        this.SetTipsShow();
    }

    private SetTipsShow() {
        let isEnough1: boolean = false;
        let isEnough2: boolean = false;
        let canTrans_list = PlayerHunterSystem.getCanTransformHunter(this.info);
        if (canTrans_list.length > 0) {
            let transformTab = TableGeneralTransfer.Table();
            for (let i = 0; i < 2; i++) {
                let itemSetCount = PlayerItemSystem.Count(transformTab[this.info.general_id].consume_goods[i][0]);
                let needCount = transformTab[this.info.general_id].consume_goods[i][1];
                if (itemSetCount >= needCount) {
                    if (i == 0) {
                        isEnough1 = true;
                    } else {
                        isEnough2 = true;
                    }
                }
                if (isEnough1 && isEnough2) {
                    this.imageTipView.visible = true;
                } else {
                    this.imageTipView.visible = false;
                }
            }
        } else {
            this.imageTipView.visible = false;
        }
    }

    private onGroupMain() {
        loadUI(HunterTransformDetailsItem)
            .then((scene: HunterTransformDetailsItem) => {
                scene.SetInfo(this.info);
                scene.show(UI.SHOW_FROM_TOP);
            });
    }

}


//子项数据源
export class HunterTransformChooseItemData {
    //数据源
    info: any;
    father: HunterTransformChoose;


}


}