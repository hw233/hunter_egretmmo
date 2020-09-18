namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-2-25
 * 
 * @class 查看猎人详情子项
 */
export class CommonPlayerHunterItem extends eui.ItemRenderer {
    // private imgBg: eui.Image;
    private groupAni: eui.Group;
    // private groupAll: eui.Group;
    private imgFame: eui.Image;
    private imgIcon: eui.Image;
    private labelLevel: eui.BitmapLabel;
    private groupStar: eui.Group;
    private imgBreak: eui.Image;
    private imgIconGrade: eui.Image;

    constructor() {
        super();

        this.skinName = "resource/skins/common/CommonPlayerHunterItemSkin.exml";
    }

    protected dataChanged() {
        this.updateView(this.data);
    }

    private updateView(data: CommonPlayerHunterItemData) {
        let framePath = UIConfig.UIConfig_Role.heroFrame[data.info.step];
        let iconPath = PlayerHunterSystem.Head(data.info.general_id);
        let baseHunterInfo = PlayerHunterSystem.Table(data.info.general_id % CommonConfig.general_id_to_index_multiple);
        let gradePath = UIConfig.UIConfig_General.hunter_grade[baseHunterInfo.aptitude];
        this.imgFame.source = cachekey(framePath, this);
        this.imgIcon.source = cachekey(iconPath, this);
        this.imgIconGrade.source = cachekey(gradePath, this);
        let breakPath = (data.info.break_level == 0) ? "" : UIConfig.UIConfig_Hunter_break.breaklevelIcon[data.info.break_level - 1];

        Helper.GetBreakLevelToPath(this.imgBreak, data.info.break_level);
        Helper.SetHeroAwakenStar(this.groupStar, data.info.star, data.info.awakePassive.level
        );
        this.labelLevel.text = data.info.level.toString();

        if (data.isSelected) {
            this.playAni();
        } else {
            let obj = this.groupAni.getChildByName("dzGF");
            if (obj) {
                this.groupAni.removeChild(obj);
            }
        }
    }

    private playAni() {
        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
            .then(display => {
                if (!this.groupAni.getChildByName("dzGF")) {
                    display.x = display.width / 2;
                    display.y = display.height / 2 - 5;
                    display.name = "dzGF";
                    this.groupAni.addChild(display);
                }
            })
            .catch(reason => {
                toast(reason);
            });
    }
}

export class CommonPlayerHunterItemData {
    info: message.GeneralInfo = null;
    isSelected: boolean = false;
}
}