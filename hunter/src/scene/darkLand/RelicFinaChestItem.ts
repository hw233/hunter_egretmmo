namespace zj {
//RelicFinaChestItem
//hexiaowei
// 2019/03/12
export class RelicFinaChestItem extends eui.ItemRenderer {

    private buttonOpen: eui.Button;
    private buttonNotGet: eui.Button;
    private groupTreasure: eui.Group;
    private imageChestBox: eui.Image;
    private imgBg: eui.Image;

    private chestId: number;
    private father: RelicFinaChest | Relic_BigEnd;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicFinaChestItemSkin.exml";
        cachekeys(<string[]>UIResource["RelicFinaChestItem"], null);
        this.buttonOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOpen, this);

    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.55;
                display.scaleY = 0.55;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {

        let chestTbl = PlayerDarkSystem.RelicInstanceChest(this.data.chest);
        this.father = this.data.father;
        let [canopen, bGet] = PlayerDarkSystem.CanOpenByChestId(this.data.chest);
        this.chestId = this.data.chest;
        this.buttonOpen.enabled = canopen;
        this.buttonOpen.visible = bGet;
        this.buttonNotGet.visible = !bGet;
        this.buttonNotGet.enabled = false;

        let path = Table.DeepCopy(chestTbl.path);
        if (!bGet) {
            path[0] = path[2];
            path[1] = path[2];
        } else if (!canopen) {
            path[0] = path[0];
            path[2] = path[1];
        } else {
            path[1] = path[0];
            path[2] = path[0];
            this.addAnimatoin("xiaojiesuan_heiandalu", "003_xiangzi", 0, this.groupTreasure);
        }
        this.imageChestBox.source = cachekey(path[0] , this) ;
        this.groupTreasure.visible = canopen;
        this.imageChestBox.visible = !canopen;

        if (this.data.father instanceof Relic_BigEnd) {
            this.imgBg.visible = false;
        }
    }

    private onButtonOpen() {
        let chestId = this.chestId;
        let exit = Table.FindF(Game.PlayerInstanceSystem.RelicChest, function (k, v) {
            return v.key == chestId;
        });
        if (this.father instanceof RelicFinaChest) {
            this.father as RelicFinaChest;
        }
        if (this.father instanceof Relic_BigEnd) {
            this.father as Relic_BigEnd;
        }
        if (exit) {
            loadUI(RelicOpenChest)
                .then((dialog: RelicOpenChest) => {
                    dialog.setChestId(this.chestId, this.father);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }
    }
}

//子项数据源
export class RelicFinaChestItemData {
    //数据源
    chest: number;

    father: RelicFinaChest | Relic_BigEnd;

}


}