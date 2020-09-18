namespace zj {
// wang shen zhuo
// HXH_MoraMainEndLoseItem
// 2019.05.24
export class MoraMainEndLoseItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public imageBoard: eui.Image;
    public imageIcon: eui.Image;
    public imageWinOrLose: eui.Image;
    public imagePlayer: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainEndLoseItemSkin.exml";
        cachekeys(<string[]>UIResource["MoraMainEndLoseItem"], null);
        this.groupMain.x = 350;
        this.groupMain.visible = false;
    }

    protected dataChanged() {
        closeCache(this.groupMain);
        this.SetItemInfo(this.data.index, this.data.mora, this.data.isshow, this.data.good);
        this.SetInfoTween(this.data.index, this.data.isTween);
        setCache(this.groupMain);
    }
    public SetItemInfo(index, mora, win, hero) {
        let path_head = PlayerHunterSystem.Head(hero);
        this.imageIcon.source = cachekey(path_head, this);
        this.imagePlayer.source = cachekey(UIConfig.UIConfig_WonderRunes.MoraSmallIcon[mora], this);
        if (win) {
            this.imageWinOrLose.source = cachekey(UIConfig.UIConfig_WonderRunes.winOrLose[1], this);
        } else {
            this.imageWinOrLose.source = cachekey(UIConfig.UIConfig_WonderRunes.winOrLose[2], this);
        }
    }

    public SetInfoTween(index, isTween) {
        if (isTween) {
            egret.Tween.get(this.groupMain).wait(index * 210)
                .to({visible : true} , 0)
                .to({ x: 350 }, 0)
                .to({ x: 0 }, 200, egret.Ease.sineInOut);
                
        } else {
            this.groupMain.x = 0;
            this.groupMain.visible = true;
        }

    }
}

export class MoraMainEndLoseItemData {
    father: any;
    good: any;
    index: number;
    isshow: boolean;
    mora: number;
    isTween: boolean = false;
}
}