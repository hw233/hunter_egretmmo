namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-12-28
 */
export class HunterCardPopItem extends eui.ItemRenderer {
    private imgCardGet: eui.Image;
    private groupAll: eui.Group;
    private groupAnimation: eui.Group;
    private imgFrame: eui.Image;
    private imgCard: eui.Image;
    private imgCardType: eui.Image;
    private groupStar: eui.Group;
    private imgHunterType: eui.Image;
    private labelCardName: eui.Label;
    private imgNew: eui.Image;
    private imgLock: eui.Image;
    private labelLevel: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterCardPopItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterCardPopItem"], null);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, ()=>{
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
        }, null);
    }

    protected dataChanged() {
        closeCache(this.groupAll);
        this.updateView(this.data);
        setCache(this.groupAll);
    }

    private updateView(data: HunterCardPopItemData) {
        if ((data.info instanceof message.PotatoInfo) == false) {
            this.imgCardGet.visible = (data.info.is_button == true);
            this.groupAll.visible = false;
            return;
        }

        let info = data.info as message.PotatoInfo;
        this.imgCardGet.visible = false;
        this.groupAll.visible = true;
        if (info.id == null || info.id == undefined) return;


        this.imgNew.visible = false;
        this.imgHunterType.visible = false;

        let tableInfo = TableItemPotato.Item(info.id);
        this.labelCardName.text = tableInfo.name;
        this.labelLevel.text = info.level.toString();

        let typePath = UIConfig.UIConfig_Hunter_Card.card_type_right[tableInfo.type - 1];
        let cardPath = tableInfo.path;
        // let a = PlayerCardSystem.GetItemFrame(info.id, info);
        let [framePath, ,] = PlayerCardSystem.GetItemFrame(info.id, info);

        this.imgCardType.source = cachekey(typePath,this);
        this.imgCard.source = cachekey(cardPath,this);
        this.imgFrame.source = cachekey(framePath,this);

        this.imgLock.visible = info.is_lock;

        if (info.add_attri.length == 4 && info.star < 6) {
            Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else if (info.add_attri.length == 5 && info.star >= 6) {
            Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
        } else {
            Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
        }

        this.playSelectedAnimation(data.isSelected);
    }

    private playSelectedAnimation(play: boolean) {
        this.groupAnimation.removeChildren();
        if (!play) return;

        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
            .then(display => {
                display.x = this.groupAnimation.width / 2;
                display.y = this.groupAnimation.height / 2 - 2;
                this.groupAnimation.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }
}

export class HunterCardPopItemData {

    /** type may be message.PotatoInfo or {"sort_index": 0 - 15} or {"is_button": true} */
    info: any;

    cardType: number;

    isSelected: boolean = false;
}
}