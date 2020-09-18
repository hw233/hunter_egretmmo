namespace zj {
//yuqingchao
export class LeagueUnionRewarPreviewItemItem extends eui.ItemRenderer {

    private imgBoard: eui.Image;	//头像框
    private imgIcon: eui.Image;		//头像
    private lbNum: eui.Label;		//奖励数量

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemItemSkin.exml";
        cachekeys(<string[]>UIResource["LeagueUnionRewarPreviewItemItem"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    }
    private touchBegin(e: egret.TouchEvent) {
        this.onChooseItemTap(this.data, e);
    }
    protected dataChanged() {
        let id = this.data.i;
        let reward = this.data.reward;
        let j = this.data.j;
        let tbScore = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchScore + ".json");
        let showType: number;
        if (PlayerItemSystem.ItemType(reward[j][0]) == message.EGoodsType.GOODS_TYPE_TITLE) showType = 1
        this.imgBoard.source = cachekey(PlayerItemSystem.Set(reward[j][0], showType, reward[j][1]).Frame, this);
        this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(reward[j][0]), this);

        if (reward[j][1] >= 100000) {
            this.lbNum.text = "x" + (reward[j][1] / 10000) + "万";
        } else {
            this.lbNum.text = "x" + reward[j][1];
        }
    }
    // 鼠标点击 掉落 材料说明
    public onChooseItemTap(data, e) {
        let num = data.j;
        let reward = data.reward;
        let id = data.i;
        let type = PlayerItemSystem.ItemType(reward[num][0]);
        let index = data.j;
        let itemY: number;
        let count: number = 0;
        if (e.stageY >= data.father.height / 2) {
            itemY = e.stageY - e.localY;
            count = 1;
        }
        else {
            itemY = e.stageY + this.skin.height - e.localY;
        }
        let dialog = this.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.removeChild(dialog);


        if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
            loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                dialog.x = 270 + index * 80;
                if (count == 1) {
                    dialog.y = itemY - dialog.height;
                }
                else dialog.y = itemY;
                dialog.name = "Item-skill-common";
                dialog.setInfo(reward[num][0], reward[num][1]);
                data.father.addChild(dialog);
            });
        } else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
            loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                dialog.x = 270 + index * 80;
                if (count == 1) {
                    dialog.y = itemY - dialog.height;
                }
                else dialog.y = itemY;
                dialog.name = "Item-skill-common";
                dialog.setInfo(reward[num][0], reward[num][1]);
                data.father.addChild(dialog);
            });
        }
        else {
            loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                dialog.x = 270 + index * 80;
                if (count == 1) {
                    dialog.y = itemY - dialog.height;
                }
                else dialog.y = itemY;
                dialog.name = "Item-skill-common";
                dialog.init(reward[num][0], reward[num][1]);
                data.father.addChild(dialog);
            });
        }

    }
}

}