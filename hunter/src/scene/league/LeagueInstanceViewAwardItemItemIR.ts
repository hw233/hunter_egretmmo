namespace zj {
// lizhengqiang
// 20190103
export class LeagueInstanceViewAwardItemItemIR extends eui.ItemRenderer {
    private imgBoard: eui.Image;
    private imgIcon: eui.Image;
    private lbLevel: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueInstanceViewAwardItemItemIRSkin.exml";
        cachekeys(<string[]>UIResource["LeagueInstanceViewAwardItemIR"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    }

    protected dataChanged() {
        let goodsId: number = this.data.goodsId;
        let count: number = this.data.count;
        let fa = this.data.father;

        this.imgBoard.source = cachekey(PlayerItemSystem.ItemFrame(goodsId), this);
        this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(goodsId), this);
        this.lbLevel.text = count.toString();
    }
    private touchBegin(e: egret.TouchEvent) {
        this.onChooseItemTap(this.data, e)
    }
    // 鼠标点击 掉落 材料说明
    private onChooseItemTap(data, e) {
        let type = PlayerItemSystem.ItemType(data.goodsId);
        let index = data.i;
        let index1 = data.j;
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
                if (index == "2" && index1 == "1") {
                    dialog.x = index * 260 - dialog.width / 2 + this.skin.width * 1.5;
                    dialog.y = itemY - dialog.height * 0.5
                }
                else {
                    dialog.x = index * 260 + index1 * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else dialog.y = itemY;
                }
                dialog.name = "Item-skill-common";
                dialog.setInfo(data.goodsId, data.count);
                data.father.addChild(dialog);
            });
        } else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
            loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                if (index == "2" && index1 == "1") {
                    dialog.x = index * 260 - dialog.width / 2 + this.skin.width * 1.5;
                    dialog.y = itemY - dialog.height * 0.5
                }
                else {
                    dialog.x = index * 260 + index1 * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else dialog.y = itemY;
                }
                dialog.name = "Item-skill-common";
                dialog.setInfo(data.goodsId, data.count);
                data.father.addChild(dialog);
            });
        }
        else {
            loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                if (index == "2" && index1 == "1") {
                    dialog.x = index * 260 - dialog.width / 2 + this.skin.width * 1.5;
                    dialog.y = itemY - dialog.height * 0.5
                }
                else {
                    dialog.x = index * 260 + index1 * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else dialog.y = itemY;
                }
                dialog.name = "Item-skill-common";
                dialog.init(data.goodsId, data.count);
                data.father.addChild(dialog);
            });
        }

    }
}
}