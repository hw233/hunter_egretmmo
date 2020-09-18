namespace zj {
/**猎人合成
 * 
 *邢利伟
 *
 *2018.12.19
 */
export class HunterCompoundItem extends eui.ItemRenderer {
    private groupAni: eui.Group;
    private groupAll: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelLevel: eui.BitmapLabel;
    private groupStar: eui.Group;
    private imgGrade: eui.Image;
    private imgRedDot: eui.Image;
    public constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterCompoundItemSkin.exml";
        this.imgRedDot.visible = false;
        cachekeys(<string[]>UIResource["HunterCompoundItem"], null);
    }

    /**数据源刷新被动执行 */
    protected dataChanged() {
        closeCache(this.groupAll);
        this.updateViews(this.data);
        this.setInfoTipe(this.data);
        setCache(this.groupAll);
    }

    /**更新视图 */
    private updateViews(data: HunterCompoundItemData) {
        if (data.info.compose_id == 0) {
            this.groupAll.visible = false;
            return;
        }
        let pathHead = PlayerHunterSystem.Head(data.info.compose_id);
        let pathAptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.info.compose_id).aptitude];
        let star = PlayerHunterSystem.Table(data.info.compose_id).init_star;
        this.imgIcon.source = cachekey(pathHead, this);
        this.labelLevel.text = "1";

        Helper.SetHeroAwakenStar(this.groupStar, star, 0);
        this.imgGrade.source = cachekey(pathAptitude,this);
        this.imgFrame.source = cachekey(PlayerHunterSystem.GetGeneralFrame(data.info.compose_id),this);

        if (data.isSelected) {
            this.playAni();
        } else {
            this.groupAni.removeChildren();
            // let obj = this.groupAni.getChildByName("dzGF");
            // if (obj) {
            //     this.groupAni.removeChild(obj);
            // }
        }
    }

    private setInfoTipe(data: HunterCompoundItemData) {
        if (data.info.compose_id == 0) {
            this.imgRedDot.visible = false;
            return;
        }
        let bTips = PlayerHunterSystem.IndexTips(data.index);
        this.imgRedDot.visible = bTips;
    }

    /**选中框*/
    protected playAni() {
        let group = this.groupAni;
        let obj = group.getChildByName("dzGF");
        if(!obj){
            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(display => {
                    display.x = group.width / 2 - 1;
                    display.y = group.height / 2 - 2;
                    display.name = "dzGF";
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }
}


export class HunterCompoundItemData {
    /**在父类list中的索引 */
    index: number;

    /**武将合成类 */
    info: TableGeneralMake;

    /**父类 */
    father: HunterCompound;

    /**技能ID */
    skill: number;

    /**是否选中 */
    isSelected: boolean;
}
}