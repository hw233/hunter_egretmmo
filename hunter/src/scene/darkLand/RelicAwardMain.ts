namespace zj {
//RelicMain (遗迹探索)奖励预览
//hexiaowei
// 2019/03/06
export class RelicAwardMain extends Dialog {

    private listTableView1: eui.List;
    private listTableView2: eui.List;
    private buttonClose: eui.Button;
    private imageTitle: eui.Image;
    private imageDropDes: eui.Image;
    private groupMain: eui.Group;
    private groupOne: eui.Group;
    private groupTwo: eui.Group;

    private relicId: number;
    private relicTbl: TableInstanceRelic;

    private selectedItem1: eui.ArrayCollection;
    private selectedIndex1: number = 0;

    private selectedItem2: eui.ArrayCollection;
    private selectedIndex2: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicAwardMainSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);

        this.groupOne.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroup1, this);
        this.groupOne.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);

        this.groupTwo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroup2, this);
        this.groupOne.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
    }

    public setRelicId(relicId) {
        this.relicId = relicId;
        this.relicTbl = PlayerDarkSystem.RelicInstance(relicId);

        this.imageTitle.source = cachekey(UIConfig.UIConfig_DarkLand.relicDropTitle[relicId - 1], this);
        this.imageDropDes.source = cachekey(UIConfig.UIConfig_DarkLand.relicDropDes[relicId - 1], this);

        this.setList();
    }

    private setList() {

        let awardTbl1 = PlayerDarkSystem.GetRelicAwardByType(this.relicId, 1);
        let maxNum = this.relicTbl.max_step;

        this.listTableView1.selectedIndex = 0; // 默认选中
        this.listTableView1.itemRenderer = RelicAwardMainItem;//
        this.selectedItem1 = new eui.ArrayCollection();
        for (const k in awardTbl1) {
            const v = awardTbl1[k];
            let data = new RelicAwardMainItemData();
            data.index = Number(k);
            data.tableAward = v;
            data.bool = false;
            data.father = this;
            data.listtype = 1;
            this.selectedItem1.addItem(data);
        }

        this.listTableView1.dataProvider = this.selectedItem1;
        this.selectedIndex1 = this.listTableView1.selectedIndex;

        let awardTbl2 = PlayerDarkSystem.GetRelicAwardByType(this.relicId, 2);

        this.listTableView2.selectedIndex = 0; // 默认选中
        this.listTableView2.itemRenderer = RelicAwardMainItem;//
        this.selectedItem2 = new eui.ArrayCollection();
        for (const k in awardTbl2) {
            const v = awardTbl2[k];
            let data = new RelicAwardMainItemData();
            data.index = Number(k);
            data.tableAward = v;
            data.bool = true;
            data.father = this;
            data.listtype = 2;
            this.selectedItem2.addItem(data);
        }

        this.listTableView2.dataProvider = this.selectedItem2;
        this.selectedIndex2 = this.listTableView2.selectedIndex;
    }

    public onDropInfoItemTap(isTouchBegin: boolean, data: RelicAwardMainItemData) {
        // let _type ;
        // let a = data;
        let _type = PlayerItemSystem.ItemType(data.tableAward.goodsId);
        let dialog = this.groupMain.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.groupMain.removeChild(dialog);

        let distance: number = 0;
        let highttype: number = 0;
        distance = 80 * data.index;

        let goodsId = data.tableAward.goodsId;
        let count = data.tableAward.count;
        if (data.listtype == 1) {
            highttype = 95;
        } else if (data.listtype == 2) {
            highttype = 15;
        } else {
            highttype = -40;

        }

        if (isTouchBegin) {
            if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                    dialog.x = distance;
                    dialog.y = highttype;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(goodsId, count);
                    this.groupMain.addChild(dialog);
                });
            } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                    dialog.x = distance;
                    dialog.y = highttype;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(goodsId, count);
                    this.groupMain.addChild(dialog);
                });
            }
            else {
                loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                    dialog.x = distance;
                    dialog.y = highttype;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(goodsId, count);
                    this.groupMain.addChild(dialog);
                });

            }
        }
    }

    private onGroup1() {
        this.onGroupBegin(1);
    }

    private onGroup2() {
        this.onGroupBegin(2);
    }

    private onGroupBegin(num) {
        let dialogs = this.groupMain.getChildByName("Item-group-common") as Common_DesRes;
        if (dialogs) this.groupMain.removeChild(dialogs);
        let goodsId = 0;
        let count;
        let distance: number = 0;
        let highttype: number = 0;
        if (num == 1) {
            goodsId = 20008;
            count = 0;
            distance = 0;
            highttype = -120;
        } else {
            goodsId = 20001;
            count = 0;
            distance = 80;
            highttype = -120;
        }

        loadUI(Common_DesRes).then((dialogs: Common_DesRes) => {
            dialogs.x = distance;
            dialogs.y = highttype;
            dialogs.name = "Item-group-common";
            dialogs.setInfo(goodsId, count);
            this.groupMain.addChild(dialogs);
        });
    }

    //鼠标抬起，移除通关奖励材料说明
    private onRemoveAward() {
        let dialog = this.groupMain.getChildByName("Item-skill-common");
        if (dialog) this.groupMain.removeChild(dialog);

        let dialogs = this.groupMain.getChildByName("Item-group-common");
        if (dialogs) this.groupMain.removeChild(dialogs);
    }

    private onButtonClose() {
        this.close();
    }


}

}