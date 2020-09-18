namespace zj {
// 形象变换item
// lizhengiang
// 20190316
export class FashionMainItemIR extends eui.ItemRenderer {
    private groupCache: eui.Group;
    private imgBoard: eui.Image;
    private groupAll: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private groupAni: eui.Group;
    private imgIconRed: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/fashion/FashionMainItemIRSkin.exml";
        cachekeys(<string[]>UIResource["FashionMainItemIR"], null);

        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(display => {
            display.scaleX = 1.05;
            display.scaleY = 1.05;
            display.name = "ani";
            this.groupAni.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
    }

    protected dataChanged() {
        closeCache(this.groupCache);
        this.groupAni.visible = false;
        this.groupAll.visible = false;
        let info: TableBaseGeneral = this.data;
        if (!info) {
            return;
        }
        this.groupAll.visible = true;
        let itemSet = PlayerItemSystem.Set(info.general_id);
        this.imgFrame.source = cachekey(itemSet.Frame, this);
        this.imgIcon.source = cachekey(itemSet.Clip, this);

        let tips: boolean = PlayerFashionSystem.GetHunterFashionTips(info.general_id);
        this.imgIconRed.visible = tips;

        this.groupAni.visible = this.selected;
        setCache(this.groupCache);
    }
}
}