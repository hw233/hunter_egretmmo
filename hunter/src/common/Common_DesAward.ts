namespace zj {
// Common_DesAward
// wangshenzhuo
// 2019.05.13
export class Common_DesAward extends Dialog {

    public labelTip: eui.Label;
    public groupMain: eui.Group;
    public listViewAward: eui.List;
    public buttonClose: eui.Button;

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_DesAwardSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END , this.onRemoveAward , this);
    }

    public setInfoActivity(goods: Array<message.GoodsInfo>) {
        this.listViewAward.selectedIndex = 0; // 默认选中
        this.listViewAward.itemRenderer = Common_AwardItem;//
        this.selectedItem = new eui.ArrayCollection();
        for (const k in goods) {
            const v = goods[k];
            let data = new Common_AwardItemData();
            data.index = Number(k);
            data.goodInfo = v;
            data.father = this;
            data.typeIndex = 1;
            this.selectedItem.addItem(data);
        }

        this.listViewAward.dataProvider = this.selectedItem;
        this.selectedIndex = this.listViewAward.selectedIndex;
    }

    // 鼠标点击 物品详情
    public onChooseItemTap(isTouchBegin: boolean, data: Common_AwardItemData) {
        let _type = PlayerItemSystem.ItemType(data.goodInfo.goodsId);

        let dialog = this.groupMain.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.groupMain.removeChild(dialog);
        let posY : number = 80;
        let posX : number ;
        let index : number = data.index;

        posX = -75 + index*125;

        if (isTouchBegin) {
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                    dialog.x = posX;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goodInfo.goodsId,data.goodInfo.count);
                    this.groupMain.addChild(dialog);
                });
            }else
            if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                    dialog.x = posX  ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goodInfo.goodsId, data.goodInfo.count);
                    this.groupMain.addChild(dialog);
                });
            }else  if(_type == message.EGoodsType.GOODS_TYPE_RESOURCE){
                loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                    dialog.x = posX ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goodInfo.goodsId,data.goodInfo.count);
                    this.groupMain.addChild(dialog);
                });
            }
            else {
                loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                    dialog.x = posX ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.init(data.goodInfo.goodsId,data.goodInfo.count);
                    this.groupMain.addChild(dialog);
                });

            }
        }
    }

     //鼠标抬起，移除 物品详情
    private onRemoveAward() {
        let dialog = this.groupMain.getChildByName("Item-skill-common");
        if (dialog) this.groupMain.removeChild(dialog);
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }



}




}