namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-7
 */
export class HunterAwakenSelectDialogItem extends eui.ItemRenderer {
    private groupAll: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private groupStar: eui.Group;
    private labelLevel: eui.BitmapLabel;
    private imgBingo: eui.Image;
    private groupLock: eui.Group;
    private imgLock: eui.Image;
    private btnGet: eui.Button;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterAwakenSelectDialogItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterAwakenSelectDialogItem"], null);
    }

    protected dataChanged() {
        this.updateView(this.data);
    }

    private updateView(data: HunterAwakenSelectDialogItemData) {
        this.groupLock.visible = false;

        if (typeof data.info === "number") {
            if (data.info == -1) {
                let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);
                if (baseGeneralInfo.aptitude == 13) {
                    Set.ButtonBackgroud(this.btnGet, UIConfig.UIConfig_Hunter.wanou[0], UIConfig.UIConfig_Hunter.wanou[1], UIConfig.UIConfig_Hunter.wanou[1])
                }
            }
            this.btnGet.visible = (data.info != 0);
            this.groupAll.visible = false;
            return;
        }
        this.groupAll.visible = true;
        this.imgBingo.visible = data.isSelected;

        let defenceTbl = PlayerHunterSystem.GeneralsIdInDefence();
        let isDefence = Table.FindF(defenceTbl, (_, _v) => {
            return _v[0] == (data.info as any).general_id;
        });
        this.groupLock.visible = isDefence;

        let framePath, headPath;
        if (data.info instanceof message.GeneralInfo) {
            framePath = PlayerHunterSystem.Frame(data.info.general_id);
            headPath = PlayerHunterSystem.Head(data.info.general_id);

            this.groupStar.visible = true;
            this.labelLevel.visible = true;
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.info.general_id);
            this.labelLevel.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
        } else if (data.info instanceof Object) {
            let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);
            let itemId = CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];

            framePath = PlayerItemSystem.ItemFrame(itemId);
            headPath = PlayerItemSystem.ItemPath(itemId);

            this.groupStar.visible = false;
            this.labelLevel.visible = false;
        } else {
            throw Error("data info type error");
        }

        this.imgFrame.source = cachekey(framePath, this);
        this.imgIcon.source = cachekey(headPath, this);
    }
}

export class HunterAwakenSelectDialogItemData {
    index: number;

    /**
     * message.GeneralInfo 同名猎人
     * Object: {"general_id": aptitude} 替身玩偶
     * 0: 自动补威
     * -1: 获取按钮
     */
    info: message.GeneralInfo | Object | number;

    isSelected: boolean = false;

    generalId: number;

    consume: number;
}
}