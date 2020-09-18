namespace zj {
//HunterSeeDetailItem
//wangshenzhuo
// 2018/12/14
export class HunterSeeDetailItem extends eui.ItemRenderer {
    private groupNode: eui.Group;
    private imgSpriteicon: eui.Image;
    private labelNum: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterSeeDetailItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterSeeDetailItem"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
    }

    /**数据源刷新被动执行 */
    protected dataChanged() {
        closeCache(this.groupNode);
        this.updateView(this.data);
        if (this.data.father != null) {
            this.scaleX = 0.8;
            this.scaleY = 0.8;
        }
        setCache(this.groupNode);
    }

    /**更新视图 */
    private updateView(data: HunterSeeDetailItemData) {
        this.labelNum.visible = false;
        let type = data.index;

        let path = "";
        if (type == 3 || type == 2) {
            path = TableGeneralTalent.Item(data.skillId).path
        } else {
            path = TableGeneralSkill.Item(data.skillId).path
        }
        this.imgSpriteicon.source = cachekey(path, this);

        data.imgSpriteicon = this.imgSpriteicon;
    }

    /**点击 */
    private down() {
        if (this.data.father != null) {
            this.data.father.subitemClick(true, this.data);
        } else {
            this.data.fatherDetail.subitemClick(true, this.data);
        }

    }
}

/** 子项数据源 */
export class HunterSeeDetailItemData {
    /**父类list排名ID*/
    index: number;

    /**英雄ID */
    generalId: number = null;

    /**技能ID*/
    skillId: number;

    /**父类 */
    fatherDetail: HunterSeeDetail;

    /**另一个父类 */
    father: HunterCompound;

    /**图片 */
    imgSpriteicon;
}
}